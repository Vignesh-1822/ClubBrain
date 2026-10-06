export type Category = 'decision' | 'lesson' | 'person' | 'sponsor' | 'event' | 'preference' | 'warning'

export interface Memory {
  id: string
  text: string
  category: Category
  source: string
  created_at: string
}

export interface DetectedMemory {
  text: string
  category: Category
}

export interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  retrieved_memories: Memory[]
  detected_memory: DetectedMemory | null
}

export interface HealthStatus {
  status: string
  memory_backend: 'mem0' | 'local'
  llm: string
}

export interface ChatRequest {
  sender: string
  content: string
}

export interface ChatResponse {
  messages: Message[]
}

export interface NewMemory {
  text: string
  category: Category
  source: string
}

export interface Persona {
  name: string
  role: string
}

export type DetectedStatus = 'idle' | 'saved' | 'dismissed'
