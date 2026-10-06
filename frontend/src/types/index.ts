export type Category =
  | 'decision'
  | 'lesson'
  | 'person'
  | 'sponsor'
  | 'event'
  | 'preference'
  | 'warning'
  | 'alumni'
  | 'pitch'
  | 'rule'

export type MemoryFilter = Category | 'all'

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
  /** Backend auto-saves durable knowledge; missing is treated as saved. */
  saved?: boolean
  memory_id?: string
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

export interface WelcomeRequest {
  member: string
  role: string
}

export interface ResetResponse {
  status?: string
}

export interface NewMemory {
  text: string
  category: Category
  source: string
}

export interface Persona {
  name: string
  role: string
  isAdmin?: boolean
  /** Newly joined member — shows a "New" tag */
  isNew?: boolean
}

/** Local record of the new-member join moment, used to place the system line. */
export interface JoinEvent {
  name: string
  /** id of the last message present when the member joined (null = before all messages) */
  afterMessageId: string | null
  time: string
}

export interface CategoryMeta {
  label: string
  plural: string
  /** text color for labels */
  text: string
  /** soft icon tile background + icon color */
  tile: string
  /** solid dot / accent bar color */
  dot: string
  /** active filter chip classes */
  chip: string
}

export interface MemoryTrace {
  question: string | null
  answer: string
  memories: Memory[]
}

export interface MessageGrouping {
  isFirstInGroup: boolean
  isLastInGroup: boolean
}


export type Tab = 'chat' | 'memory'

export interface Community {
  id: string
  label: string
  active?: boolean
}

export interface ConversationPreview {
  id: string
  name: string
  preview: string
  initials: string
}

export interface ConnectedSource {
  name: string
  connected: boolean
  /** lucide icon tile classes */
  tile: string
}

export interface SuggestedQuestion {
  /** Short chip text */
  label: string
  /** Full question sent to the chat */
  prompt: string
}
