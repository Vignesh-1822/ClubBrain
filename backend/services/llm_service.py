import json
import os
import re
from typing import Dict, List, Optional

from models.schemas import ALLOWED_CATEGORIES, Memory

ANTHROPIC_MODELS = ["claude-sonnet-5-5", "claude-sonnet-4-5"]
CATEGORIES = ALLOWED_CATEGORIES


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
        resp = None
        for model in ANTHROPIC_MODELS:
            try:
                resp = client.messages.create(
                    model=model,
                    max_tokens=500,
                    system=system,
                    messages=[{"role": "user", "content": user}],
                )
                break
            except anthropic.NotFoundError:
                continue
        if resp is None:
            raise RuntimeError("No Anthropic model available")
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
    if any(k in t for k in ["avoid", "late", "crowded", "congestion", "never paid"]):
        return "warning"
    if any(k in t for k in ["alumni", "alumna", "grad"]):
        return "alumni"
    if "pitch" in t:
        return "pitch"
    if any(k in t for k in ["rule", "must", "required", "verification"]):
        return "rule"
    if "sponsor" in t:
        return "sponsor"
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
        "people/responsibilities, sponsors, events, preferences, warnings, alumni, sponsor pitches, club rules). "
        "Capture useful resources (sponsors, top alumni, event feedback), what did NOT work (areas to avoid), and club "
        "rules (sponsor approval and signed agreements, attendee verification, valid sponsorships). Rewrite the message into a clean, "
        "self-contained, durable memory in third person with no chat filler, keeping key facts and numbers, e.g. "
        "\"Avoid Memorial Union for events over 150 people — 2025 hackathon (~287 attendees) had registration congestion.\" "
        "Respond with strict JSON only: "
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
    fallback = "Based on your club's previous experience:\n" + "\n".join(f"- {m.text}" for m in memories)
    if provider() == "heuristic":
        return fallback
    system = (
        "You are ClubBrain, a friendly memory assistant for a student club. Answer using ONLY the provided "
        "memories; never invent facts, names or numbers. If the memories do not cover something, say so briefly. "
        "Reply in concise Markdown: short bullet lists, **bold** key numbers and names, optional short headings, "
        "and a small table only for a 'top events' style question. Maximum 180 words. "
        "If asked to help prepare a sponsor pitch, produce a pitch outline with these sections: Opening hook with "
        "club stats; Past wins; Sponsor tiers; Alumni intros to request; Risks and rules to respect."
    )
    mem_text = "\n".join(f"- [{m.category}] {m.text}" for m in memories)
    try:
        return _complete(system, f"Memories:\n{mem_text}\n\nQuestion: {question}").strip() or fallback
    except Exception:
        return fallback


def welcome_text(member: str, role: str, memories: List[Memory]) -> str:
    fallback = (
        f"Welcome to the club, **{member}**! I'm ClubBrain, the club's shared memory.\n\n"
        "Ask me about our top events, sponsors, alumni, past pitches, club rules, or what to avoid when planning."
    )
    if provider() == "heuristic" or not memories:
        return fallback
    system = (
        "You are ClubBrain, the memory assistant of a student club. Write a warm welcome in Markdown for a new "
        "member: greet them by name and role, summarize the club in exactly 2 short lines grounded ONLY in the "
        "provided memories (bold key numbers), then give 3 bullet suggestions of what they can ask (top events, "
        "sponsors and alumni, what to avoid when planning). Maximum 90 words."
    )
    mem_text = "\n".join(f"- [{m.category}] {m.text}" for m in memories)
    try:
        return _complete(system, f"New member: {member} (role: {role})\nMemories:\n{mem_text}").strip() or fallback
    except Exception:
        return fallback
