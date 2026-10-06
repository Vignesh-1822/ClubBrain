import os
import re
import time
import uuid
from datetime import datetime, timezone
from concurrent.futures import ThreadPoolExecutor
from typing import Any, Dict, List, Optional

from models.schemas import Memory
from services.seed_data import SEED_ITEMS

CLUB_ID = "uw-ai-club"

_client: Any = None
_mem0_ok = False
_local: List[Memory] = []


def _init() -> None:
    global _client, _mem0_ok
    key = os.getenv("MEM0_API_KEY")
    if not key:
        return
    try:
        from mem0 import MemoryClient

        _client = MemoryClient(api_key=key)
        _mem0_ok = True
    except Exception:
        _client = None
        _mem0_ok = False


_init()


def backend_name() -> str:
    return "mem0" if _mem0_ok else "local"


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _normalize(raw: Any) -> List[Memory]:
    items = raw.get("results", []) if isinstance(raw, dict) else (raw or [])
    out: List[Memory] = []
    for item in items:
        if not isinstance(item, dict):
            continue
        meta: Dict[str, Any] = item.get("metadata") or {}
        out.append(
            Memory(
                id=str(item.get("id", uuid.uuid4())),
                text=item.get("memory") or item.get("text") or "",
                category=str(meta.get("category", "lesson")),
                source=str(meta.get("source", "")),
                created_at=str(item.get("created_at") or ""),
                event=str(meta.get("event", "")),
                year=str(meta.get("year", "")),
            )
        )
    return out


def _words(text: str) -> set:
    return {w for w in re.findall(r"[a-z0-9]+", text.lower()) if len(w) > 2}


def _local_search(query: str, limit: int) -> List[Memory]:
    q = _words(query)
    scored = [(len(q & _words(m.text)), m) for m in _local]
    scored = [s for s in scored if s[0] > 0]
    scored.sort(key=lambda s: -s[0])
    return [m for _, m in scored[:limit]]


def add_memory(text: str, category: str, source: str, event: str = "", year: str = "") -> Memory:
    memory = Memory(
        id=str(uuid.uuid4()), text=text, category=category, source=source, created_at=_now(), event=event, year=year
    )
    metadata = {"category": category, "source": source}
    if event:
        metadata["event"] = event
    if year:
        metadata["year"] = year
    if _mem0_ok:
        try:
            resp = _client.add(
                [{"role": "user", "content": text}],
                user_id=CLUB_ID,
                metadata=metadata,
                infer=False,
            )
            results = resp.get("results", []) if isinstance(resp, dict) else []
            if results and results[0].get("id"):
                memory.id = str(results[0]["id"])
            return memory
        except Exception:
            pass
    _local.append(memory)
    return memory


def search(query: str, limit: int = 10) -> List[Memory]:
    if _mem0_ok:
        try:
            return _normalize(_client.search(query, filters={"user_id": CLUB_ID}, top_k=limit))
        except Exception:
            pass
    return _local_search(query, limit)


# Query keywords that signal which memory categories matter; semantic search alone under-retrieves lists.
CATEGORY_HINTS = [
    ("event", r"\bevents\b|\borganized\b"),
    ("sponsor", r"\bsponsors?\b|\bsponsorships?\b"),
    ("alumni", r"\balumni\b|\balum\b|\bintros?\b"),
    ("pitch", r"\bpitch(es)?\b|\bpresentations?\b"),
    ("warning", r"\bavoid\b|\bmistakes?\b|\bnot work\b|\bwarnings?\b"),
    ("rule", r"\brules?\b|\bpolic(y|ies)\b|\bverif\w*\b"),
]
MAX_PER_CATEGORY = 6


def retrieve(query: str, limit: int = 10) -> List[Memory]:
    """Hybrid retrieval: category-hinted memories first, then semantic matches, de-duplicated."""
    semantic = search(query, limit)
    wanted = [cat for cat, pattern in CATEGORY_HINTS if re.search(pattern, query.lower())]
    if not wanted:
        return semantic
    pool = get_all()
    if "pitch" in wanted:  # a pitch outline also needs the rules and risks to respect
        wanted += [cat for cat in ("event", "alumni", "rule") if cat not in wanted]
    buckets = [[m for m in pool if m.category == cat][:MAX_PER_CATEGORY] for cat in wanted]
    hinted: List[Memory] = []
    for rank in range(MAX_PER_CATEGORY):  # round-robin so every wanted category is represented
        hinted.extend(bucket[rank] for bucket in buckets if rank < len(bucket))
    merged: List[Memory] = []
    seen = set()
    for memory in hinted + semantic:
        if memory.id not in seen:
            seen.add(memory.id)
            merged.append(memory)
    return merged[:limit]


def get_all() -> List[Memory]:
    if _mem0_ok:
        try:
            return _normalize(_client.get_all(filters={"user_id": CLUB_ID}, page_size=100))
        except Exception:
            pass
    return list(_local)


def list_memories(q: Optional[str], category: Optional[str]) -> List[Memory]:
    memories = search(q) if q else get_all()
    if category:
        memories = [m for m in memories if m.category == category]
    return memories


def reset_all() -> None:
    """Delete every club memory (Mem0 and the local fallback)."""
    _local.clear()
    if _mem0_ok:
        try:
            _client.delete_all(user_id=CLUB_ID)
        except Exception:
            return
        # Mem0 deletes asynchronously; wait until empty so the delete cannot wipe freshly seeded memories.
        for _ in range(30):
            if not get_all():
                return
            time.sleep(1)


def seed(reset: bool = False) -> int:
    """Seed the club's demo memories. With reset=True, wipe existing memories first."""
    existing = len(get_all())
    if reset:
        reset_all()
    elif existing >= len(SEED_ITEMS):
        return existing
    with ThreadPoolExecutor(max_workers=8) as pool:
        list(
            pool.map(
                lambda item: add_memory(item.text, item.category, item.source, item.event, item.year),
                SEED_ITEMS,
            )
        )
    return len(SEED_ITEMS)
