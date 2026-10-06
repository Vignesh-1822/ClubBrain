import type { ChatRequest, ChatResponse, Category, HealthStatus, Memory, Message, NewMemory } from '../types'

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return (await res.json()) as T
}

export const getHealth = () => request<HealthStatus>('/api/health')
export const getMessages = () => request<Message[]>('/api/messages')
export const postChat = (body: ChatRequest) =>
  request<ChatResponse>('/api/chat', { method: 'POST', body: JSON.stringify(body) })
export const postMemory = (body: NewMemory) =>
  request<Memory>('/api/memories', { method: 'POST', body: JSON.stringify(body) })
export const getMemories = (q: string, category: Category | 'all') => {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (category !== 'all') params.set('category', category)
  return request<Memory[]>(`/api/memories?${params.toString()}`)
}
export const seedMemories = () => request<{ count: number }>('/api/seed', { method: 'POST' })
