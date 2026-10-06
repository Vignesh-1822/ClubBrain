import { Paperclip, SendHorizontal, Smile } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useMessages, useSendChat } from '../../../hooks'
import { BOT_NAME, PERSONAS } from '../../../lib/persona'
import type { Message, MemoryTrace, MessageGrouping } from '../../../types'
import DateSeparator from '../../atoms/DateSeparator'
import TypingIndicator from '../../atoms/TypingIndicator'
import MessageRow from '../../molecules/MessageRow'
import SystemLine from '../../molecules/SystemLine'
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

export default function ChatView({ persona }: { persona: string }) {
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
  const canSend = !send.isPending && draft.trim().length > 0

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] bg-panel">
      <div className="min-h-0 flex-1 overflow-y-auto px-7 pb-4 pt-4">
        <DateSeparator label="Today" />
        <SystemLine time="9:00 AM">
          <span className="font-semibold text-white">Maya</span> added <span className="font-semibold text-white">Sarah</span> (2026 President)
        </SystemLine>
        <SystemLine time="9:01 AM">
          <span className="font-semibold text-white">ClubBrain</span> joined · remembering decisions, lessons &amp; warnings
        </SystemLine>
        {messages.map((m, i) => (
          <MessageRow
            key={m.id}
            message={m}
            isMine={m.sender === persona}
            grouping={groupingFor(messages, i)}
            onShowTrace={handleShowTrace}
          />
        ))}
        {send.isPending && <TypingIndicator />}
        {send.isError && <p className="mt-4 text-center text-[13px] text-rose-400">Failed to send. Is the backend running?</p>}
        <div ref={endRef} />
      </div>

      <div className="px-6 pb-6 pt-2">
        <div className="flex h-16 items-center gap-3 rounded-full bg-panel-3 pl-6 pr-2.5 transition focus-within:ring-2 focus-within:ring-lemon/30">
          <Paperclip size={21} className="shrink-0 text-white/80" strokeWidth={1.8} />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Write a message as ${persona}${role ? ` (${role})` : ''}…`}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-muted"
          />
          <Smile size={21} className="shrink-0 text-white/80" strokeWidth={1.8} />
          <button
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Send message"
            className={`flex h-11 w-11 items-center justify-center rounded-full transition active:scale-95 ${
              canSend ? 'bg-lemon text-black hover:brightness-105' : 'text-white/80'
            }`}
          >
            <SendHorizontal size={21} strokeWidth={1.9} />
          </button>
        </div>
      </div>
      {trace && <MemoryTracePanel trace={trace} onClose={() => setTrace(null)} />}
    </section>
  )
}
