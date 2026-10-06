import json
import os
import re
from typing import Dict, List, Optional

from models.schemas import Memory

CATEGORIES = ["decision", "lesson", "person", "sponsor", "event", "preference", "warning"]


def provider() -> str:
    if os.getenv("ANTHROPIC_API_KEY"):
        return "anthropic"
    if os.getenv("OPENAI_API_KEY"):
        return "openai"
    return "heuristic"


def _complete(system: str, user: str) -> str:
    if provider() == "anthropic":
        import anthropic

        client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        resp = client.messages.create(
            model="claude-sonnet-5-5",
            max_tokens=400,
            system=system,
            messages=[{"role": "user", "content": user}],
        )
        return "".join(b.text for b in resp.content if getattr(b, "text", None))
    import openai

    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": system}, {"role": "user", "content": user}],
    )
    return resp.choices[0].message.content or ""


KEYWORDS = ["last year", "decided", "avoid", "handled", "sponsor", "venue", "catering", "late", "crowded"]


def _guess_category(text: str) -> str:
    t = text.lower()
    if "sponsor" in t:
        return "sponsor"
    if any(k in t for k in ["avoid", "late", "crowded", "congestion"]):
        return "warning"
    if "handled" in t:
        return "person"
    if "decided" in t:
        return "decision"
    if any(k in t for k in ["venue", "catering"]):
        return "event"
    return "lesson"


def _is_question(text: str) -> bool:
    return text.strip().endswith("?")


def _heuristic_detect(content: str) -> Optional[Dict[str, str]]:
    t = content.lower()
    if _is_question(content):
        return None
    if re.search(r"\d", t) or any(k in t for k in KEYWORDS):
        return {"text": content, "category": _guess_category(content)}
    return None


def detect_memory(sender: str, content: str) -> Optional[Dict[str, str]]:
    if provider() == "heuristic":
        return _heuristic_detect(content)
    system = (
        "You extract durable organizational knowledge for a student club (decisions, lessons, "
        "people/responsibilities, sponsors, events, preferences, warnings). Respond with strict JSON only: "
        '{"memory": null} if nothing durable, else {"memory": {"text": "<concise rewrite>", "category": "<one of '
        + ", ".join(CATEGORIES)
        + '>"}}'
    )
    try:
        raw = _complete(system, f"Sender: {sender}\nMessage: {content}")
        match = re.search(r"\{.*\}", raw, re.S)
        data = json.loads(match.group(0)) if match else {}
        mem = data.get("memory")
        if mem and mem.get("text"):
            cat = mem.get("category", "lesson")
            return {"text": mem["text"], "category": cat if cat in CATEGORIES else "lesson"}
        return None
    except Exception:
        return _heuristic_detect(content)


def answer(question: str, memories: List[Memory]) -> str:
    if not memories:
        return "I don't have any memories about that yet. Save some club knowledge and ask again!"
    fallback = "Based on your club's previous experience:\n" + "\n".join(f"• {m.text}" for m in memories)
    if provider() == "heuristic":
        return fallback
    system = (
        "You are ClubBrain, a friendly club memory assistant. Answer using ONLY the provided memories. "
        "Be concise (<=90 words) and use emoji bullets (⚠ 🤝 💡 👤)."
    )
    mem_text = "\n".join(f"- [{m.category}] {m.text}" for m in memories)
    try:
        return _complete(system, f"Memories:\n{mem_text}\n\nQuestion: {question}").strip() or fallback
    except Exception:
        return fallback
