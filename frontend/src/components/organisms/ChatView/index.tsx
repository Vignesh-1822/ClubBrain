import { Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useMessages, useSendChat } from '../../../hooks'
import type { DetectedStatus, Memory, Persona } from '../../../types'
import MessageBubble from '../../molecules/MessageBubble'
import TypingIndicator from '../../atoms/TypingIndicator'
import MemoryTracePanel from '../MemoryTracePanel'
import LiveMemoryPanel from '../LiveMemoryPanel'

const PERSONAS: Persona[] = [
  { name: 'Maya', role: 'President' },
  { name: 'Alex', role: 'Sponsorship' },
  { name: 'Sarah', role: 'Events' },
  { name: 'Vignesh', role: 'Engineering' },
]

export default function ChatView() {
  const { data: messages = [] } = useMessages()
  const send = useSendChat()
  const [persona, setPersona] = useState('Vignesh')
  const [draft, setDraft] = useState('')
  const [trace, setTrace] = useState<Memory[] | null>(null)
  const [detectedStatuses, setDetectedStatuses] = useState<Record<string, DetectedStatus>>({})

  const handleDetectedStatus = (id: string, status: DetectedStatus) =>
    setDetectedStatuses((prev) => ({ ...prev, [id]: status }))
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, send.isPending])

  const handleSend = () => {
    const content = draft.trim()
    if (!content || send.isPending) return
    send.mutate({ sender: persona, content })
    setDraft('')
  }

  return (
    <div className="flex h-full min-w-0 flex-1">
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
          <h2 className="text-sm font-semibold">UW AI Club · 18 members</h2>
          <label className="flex items-center gap-2 text-xs text-slate-500">
            You are:
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900"
            >
              {PERSONAS.map((p) => (
                <option key={p.name} value={p.name}>{p.name} — {p.role}</option>
              ))}
            </select>
          </label>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              isMine={m.sender === persona}
              onShowTrace={setTrace}
              detectedStatus={detectedStatuses[m.id] ?? 'idle'}
              onDetectedStatusChange={handleDetectedStatus}
            />
          ))}
          {send.isPending && <TypingIndicator />}
          {send.isError && <p className="text-xs text-red-500">Failed to send. Is the backend running?</p>}
          <div ref={endRef} />
        </div>
        <div className="flex gap-2 border-t border-slate-200 bg-white p-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message as ${persona}…`}
            className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={send.isPending || !draft.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </section>
      <LiveMemoryPanel />
      {trace && <MemoryTracePanel memories={trace} onClose={() => setTrace(null)} />}
    </div>
  )
}
