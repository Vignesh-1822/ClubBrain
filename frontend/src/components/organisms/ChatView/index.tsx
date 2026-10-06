import { ArrowUp, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useMessages, useSendChat } from '../../../hooks'
import { BOT_NAME, PERSONAS } from '../../../lib/persona'
import type { DetectedStatus, Message, MemoryTrace, MessageGrouping } from '../../../types'
import Avatar from '../../atoms/Avatar'
import TypingIndicator from '../../atoms/TypingIndicator'
import MessageBubble from '../../molecules/MessageBubble'
import LiveMemoryPanel from '../LiveMemoryPanel'
import MemoryTracePanel from '../MemoryTracePanel'

const GROUP_WINDOW_MS = 5 * 60 * 1000

const sameGroup = (a: Message | undefined, b: Message | undefined): boolean => {
  if (!a || !b || a.sender !== b.sender) return false
  if (a.detected_memory || (a.retrieved_memories?.length ?? 0) > 0) return false
  const gap = Math.abs(new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  return Number.isNaN(gap) || gap < GROUP_WINDOW_MS
}

const groupingFor = (messages: Message[], index: number): MessageGrouping => ({
  isFirstInGroup: !sameGroup(messages[index - 1], messages[index]),
  isLastInGroup: !sameGroup(messages[index], messages[index + 1]),
})

interface Props {
  persona: string
  detectedStatuses: Record<string, DetectedStatus>
  onDetectedStatusChange: (id: string, status: DetectedStatus) => void
}

export default function ChatView({ persona, detectedStatuses, onDetectedStatusChange }: Props) {
  const { data: messages = [] } = useMessages()
  const send = useSendChat()
  const [draft, setDraft] = useState('')
  const [trace, setTrace] = useState<MemoryTrace | null>(null)
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

  const handleShowTrace = (message: Message) => {
    const index = messages.findIndex((m) => m.id === message.id)
    const question = [...messages.slice(0, index)].reverse().find((m) => m.sender !== BOT_NAME)
    setTrace({ question: question?.content ?? null, answer: message.content, memories: message.retrieved_memories })
  }

  const role = PERSONAS.find((p) => p.name === persona)?.role

  return (
    <div className="flex h-full min-w-0 flex-1">
      <section className="relative flex min-w-0 flex-1 flex-col bg-white">
        <header className="absolute inset-x-0 top-0 z-10 flex items-center gap-3 border-b border-slate-200/70 bg-white/75 px-5 py-2.5 backdrop-blur-xl backdrop-saturate-150">
          <div className="flex -space-x-2">
            {[BOT_NAME, ...PERSONAS.map((p) => p.name)].map((name) => (
              <Avatar key={name} name={name} size="sm" className="ring-2 ring-white" />
            ))}
          </div>
          <div className="min-w-0">
            <h2 className="text-[14px] font-semibold leading-tight text-slate-900">UW AI Club</h2>
            <p className="flex items-center gap-1.5 text-[11px] leading-tight text-slate-500">
              18 members
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1 text-violet-600">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
                </span>
                ClubBrain is listening
              </span>
            </p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-5 pb-4 pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="pb-2 pt-4 text-center text-[11px] font-medium text-slate-400">
              <span className="font-semibold text-slate-500">UW AI Club</span> · Today
            </p>
            {messages.map((m, i) => (
              <MessageBubble
                key={m.id}
                message={m}
                isMine={m.sender === persona}
                grouping={groupingFor(messages, i)}
                onShowTrace={handleShowTrace}
                detectedStatus={detectedStatuses[m.id] ?? 'idle'}
                onDetectedStatusChange={onDetectedStatusChange}
              />
            ))}
            {send.isPending && <TypingIndicator />}
            {send.isError && (
              <p className="mt-3 text-center text-xs text-rose-500">Failed to send. Is the backend running?</p>
            )}
            <div ref={endRef} />
          </div>
        </div>

        <div className="border-t border-slate-100 bg-white px-5 pb-4 pt-3">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/60 py-1 pl-1.5 pr-1 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition focus-within:border-imessage/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-imessage/10">
              <Avatar name={persona} size="sm" />
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`iMessage as ${persona}${role ? ` (${role})` : ''}`}
                className="min-w-0 flex-1 bg-transparent px-1 text-[14px] text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                onClick={handleSend}
                disabled={send.isPending || !draft.trim()}
                aria-label="Send message"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-imessage text-white shadow-sm transition hover:brightness-110 active:scale-95 disabled:bg-slate-300 disabled:shadow-none"
              >
                <ArrowUp size={17} strokeWidth={2.6} />
              </button>
            </div>
            <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <Sparkles size={11} className="text-violet-400" />
              ClubBrain detects decisions, lessons and warnings — and answers from club memory.
            </p>
          </div>
        </div>
      </section>
      <LiveMemoryPanel />
      {trace && <MemoryTracePanel trace={trace} onClose={() => setTrace(null)} />}
    </div>
  )
}
