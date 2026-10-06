import os
import re
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from models.schemas import Memory

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


def add_memory(text: str, category: str, source: str) -> Memory:
    memory = Memory(id=str(uuid.uuid4()), text=text, category=category, source=source, created_at=_now())
    if _mem0_ok:
        try:
            resp = _client.add(
                [{"role": "user", "content": text}],
                user_id=CLUB_ID,
                metadata={"category": category, "source": source},
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


def search(query: str, limit: int = 6) -> List[Memory]:
    if _mem0_ok:
        try:
            return _normalize(_client.search(query, filters={"user_id": CLUB_ID}, top_k=limit))
        except Exception:
            pass
    return _local_search(query, limit)


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


SEED_MEMORIES = [
    ("warning", "Avoid Memorial Union for events over 150 people — the 2025 hackathon (~287 attendees) had severe registration congestion."),
    ("sponsor", "Google sponsorship outreach should begin 6–8 weeks before the hackathon."),
    ("person", "Alex handled the Google sponsorship relationship last year."),
    ("person", "Sarah handled venue coordination and the 2025 outdoor event permit."),
    ("event", "Green Leaf Catering was reliable at the 2024 and 2025 events."),
    ("warning", "Spice Kitchen arrived about 90 minutes late at a 2025 event."),
    ("lesson", "Only announce sponsors after contracts are signed."),
    ("lesson", "Large events need multiple registration lines."),
]


SEED_THRESHOLD = 8


def seed() -> int:
    """Idempotent: skip seeding when the club already has enough memories."""
    existing = len(get_all())
    if existing >= SEED_THRESHOLD:
        return existing
    for category, text in SEED_MEMORIES:
        add_memory(text, category, "Demo seed")
    return len(SEED_MEMORIES)
