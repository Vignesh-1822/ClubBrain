import uuid
from datetime import datetime, timezone
from typing import List

from models.schemas import DetectedMemory, Message
from services import llm_service, memory_service

_history: List[Message] = []

QUESTION_STARTS = ("what", "who", "when", "where", "which", "how", "should", "any")


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


def handle_chat(sender: str, content: str) -> List[Message]:
    user_msg = _new_message(sender, content)
    new_messages = [user_msg]
    if _is_question(content):
        memories = memory_service.search(content)
        bot = _new_message("ClubBrain", llm_service.answer(content, memories))
        bot.retrieved_memories = memories
        new_messages.append(bot)
    else:
        detected = llm_service.detect_memory(sender, content)
        if detected:
            user_msg.detected_memory = DetectedMemory(**detected)
    _history.extend(new_messages)
    return new_messages
