from typing import List, Optional

from fastapi import APIRouter

from models.schemas import (
    ChatRequest,
    ChatResponse,
    HealthResponse,
    Memory,
    MemoryCreate,
    Message,
    SeedResponse,
)
from services import chat_service, llm_service, memory_service

router = APIRouter(prefix="/api")


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", memory_backend=memory_service.backend_name(), llm=llm_service.provider())


@router.get("/messages", response_model=List[Message])
def messages() -> List[Message]:
    return chat_service.get_history()


@router.post("/chat", response_model=ChatResponse)
def chat(body: ChatRequest) -> ChatResponse:
    return ChatResponse(messages=chat_service.handle_chat(body.sender, body.content))


@router.post("/memories", response_model=Memory)
def create_memory(body: MemoryCreate) -> Memory:
    return memory_service.add_memory(body.text, body.category, body.source)


@router.get("/memories", response_model=List[Memory])
def list_memories(q: Optional[str] = None, category: Optional[str] = None) -> List[Memory]:
    return memory_service.list_memories(q or None, category or None)


@router.post("/seed", response_model=SeedResponse)
def seed() -> SeedResponse:
    return SeedResponse(count=memory_service.seed())
