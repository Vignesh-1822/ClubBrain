# ClubBrain · Backend

FastAPI service that captures club knowledge into [Mem0](https://mem0.ai) and answers questions from it.

## Run

```bash
python -m venv venv
venv/bin/pip install -r requirements.txt
cp .env.example .env   # MEM0_API_KEY + OPENAI_API_KEY (or ANTHROPIC_API_KEY)
venv/bin/uvicorn main:app --port 8001
curl -X POST "http://localhost:8001/api/seed?reset=true"   # seed 37 demo memories
```

Interactive docs: http://localhost:8001/docs

## Layout

| Path | Responsibility |
|---|---|
| `main.py` | App, CORS, loads `.env` |
| `routers/api.py` | `/api/*` route definitions only |
| `services/memory_service.py` | Mem0 `MemoryClient` (club-scoped `user_id`), hybrid retrieval, seeding, local fallback |
| `services/chat_service.py` | Routes questions to retrieval + answer, other messages to memory extraction |
| `services/llm_service.py` | OpenAI / Anthropic calls: extract memory, grounded answer, welcome text (heuristic fallback) |
| `services/seed_data.py` | Fictional UW AI Club demo memories |
| `models/schemas.py` | Pydantic request/response models |

See the [root README](../README.md) for the API reference and architecture.
