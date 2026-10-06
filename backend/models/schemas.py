from typing import List, Optional

from pydantic import BaseModel, Field


class Memory(BaseModel):
    id: str
    text: str
    category: str = "lesson"
    source: str = ""
    created_at: str = ""


class DetectedMemory(BaseModel):
    text: str
    category: str


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


class HealthResponse(BaseModel):
    status: str
    memory_backend: str
    llm: str


class SeedResponse(BaseModel):
    count: int
