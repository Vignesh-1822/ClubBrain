import uuid
from datetime import datetime, timezone
from typing import List

from models.schemas import DetectedMemory, Message
from services import llm_service, memory_service

_history: List[Message] = []

QUESTION_STARTS = (
    "what", "who", "when", "where", "which", "how", "should", "any",
    "tell", "show", "list", "help", "give", "prepare", "can",
)


def _is_question(content: str) -> bool:
    t = content.strip().lower()
    first = t.split(" ")[0] if t else ""
    return t.endswith("?") or first.strip(",.") in QUESTION_STARTS or "clubbrain" in t or "what should i know" in t


def _new_message(sender: str, content: str) -> Message:
    return Message(
        id=str(uuid.uuid4()),
        sender=sender,
        content=content,
        timestamp=datetime.now(timezone.utc).isoformat(),
    )


def get_history() -> List[Message]:
    return _history


def reset_history() -> None:
    _history.clear()


def welcome(member: str, role: str) -> List[Message]:
    memories = memory_service.retrieve("club overview top events sponsors")
    bot = _new_message("ClubBrain", llm_service.welcome_text(member, role, memories))
    bot.retrieved_memories = memories
    _history.append(bot)
    return [bot]


def handle_chat(sender: str, content: str) -> List[Message]:
    user_msg = _new_message(sender, content)
    new_messages = [user_msg]
    if _is_question(content):
        memories = memory_service.retrieve(content)
        bot = _new_message("ClubBrain", llm_service.answer(content, memories))
        bot.retrieved_memories = memories
        new_messages.append(bot)
    else:
        detected = llm_service.detect_memory(sender, content)
        if detected:
            saved = memory_service.add_memory(detected["text"], detected["category"], f"Club chat — {sender}")
            user_msg.detected_memory = DetectedMemory(
                text=saved.text, category=saved.category, saved=True, memory_id=saved.id
            )
    _history.extend(new_messages)
    return new_messages
