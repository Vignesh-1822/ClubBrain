from typing import List, Optional

from pydantic import BaseModel, Field, field_validator


ALLOWED_CATEGORIES = [
    "decision",
    "lesson",
    "person",
    "sponsor",
    "event",
    "preference",
    "warning",
    "alumni",
    "pitch",
    "rule",
]


class Memory(BaseModel):
    id: str
    text: str
    category: str = "lesson"
    source: str = ""
    created_at: str = ""
    event: str = ""
    year: str = ""


class SeedItem(BaseModel):
    category: str
    text: str
    source: str
    event: str = ""
    year: str = ""


class DetectedMemory(BaseModel):
    text: str
    category: str
    saved: bool = True
    memory_id: Optional[str] = None


class Message(BaseModel):
    id: str
    sender: str
    content: str
    timestamp: str
    retrieved_memories: List[Memory] = Field(default_factory=list)
    detected_memory: Optional[DetectedMemory] = None


class ChatRequest(BaseModel):
    sender: str
    content: str


class ChatResponse(BaseModel):
    messages: List[Message]


class MemoryCreate(BaseModel):
    text: str
    category: str = "lesson"
    source: str = "Chat"

    @field_validator("category")
    @classmethod
    def _valid_category(cls, value: str) -> str:
        return value if value in ALLOWED_CATEGORIES else "lesson"


class HealthResponse(BaseModel):
    status: str
    memory_backend: str
    llm: str


class SeedResponse(BaseModel):
    count: int


class WelcomeRequest(BaseModel):
    member: str
    role: str = "New member"


class ResetChatResponse(BaseModel):
    ok: bool
