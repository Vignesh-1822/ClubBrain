import { Paperclip, SendHorizontal, Smile } from 'lucide-react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useMessages, useSendChat } from '../../../hooks'
import { BOT_NAME, PERSONAS, SUGGESTED_QUESTIONS } from '../../../lib/persona'
import type { JoinEvent, Message, MemoryTrace, MessageGrouping } from '../../../types'
import DateSeparator from '../../atoms/DateSeparator'
import TypingIndicator from '../../atoms/TypingIndicator'
import MessageRow from '../../molecules/MessageRow'
import SuggestedQuestions from '../../molecules/SuggestedQuestions'
import SystemLine from '../../molecules/SystemLine'
import MemoryTracePanel from '../MemoryTracePanel'

const GROUP_WINDOW_MS = 5 * 60 * 1000

const sameGroup = (a: Message | undefined, b: Message | undefined): boolean => {
  if (!a || !b || a.sender !== b.sender) return false
  if (a.detected_memory || (a.retrieved_memories?.length ?? 0) > 0) return false
  const gap = Math.abs(new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  return Number.isNaN(gap) || gap < GROUP_WINDOW_MS
}

const groupingFor = (messages: Message[], index: number, breakBefore: boolean): MessageGrouping => ({
  isFirstInGroup: breakBefore || !sameGroup(messages[index - 1], messages[index]),
  isLastInGroup: !sameGroup(messages[index], messages[index + 1]),
})

interface Props {
  persona: string
  joinEvent: JoinEvent | null
  welcomePending: boolean
  welcomeFailed: boolean
}

export default function ChatView({ persona, joinEvent, welcomePending, welcomeFailed }: Props) {
  const { data: messages = [] } = useMessages()
  const send = useSendChat()
  const [draft, setDraft] = useState('')
  const [trace, setTrace] = useState<MemoryTrace | null>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const busy = send.isPending || welcomePending


  const sendContent = (raw: string) => {
    const content = raw.trim()
    if (!content || busy) return
    send.mutate({ sender: persona, content })
  }

  const handleSend = () => {
    if (!draft.trim() || busy) return
    sendContent(draft)
    setDraft('')
  }

  const handleShowTrace = (message: Message) => {
    const index = messages.findIndex((m) => m.id === message.id)
    const question = [...messages.slice(0, index)].reverse().find((m) => m.sender !== BOT_NAME)
    setTrace({ question: question?.content ?? null, answer: message.content, memories: message.retrieved_memories })
  }

  const role = PERSONAS.find((p) => p.name === persona)?.role
  const canSend = !busy && draft.trim().length > 0
  const last = messages[messages.length - 1]
  const asked = new Set(messages.filter((m) => m.sender !== BOT_NAME).map((m) => m.content.trim().toLowerCase()))
  const suggestions = SUGGESTED_QUESTIONS.filter((q) => !asked.has(q.prompt.toLowerCase()))
  const showSuggestions = !busy && (!last || last.sender === BOT_NAME)
  // Re-scroll after layout settles (the suggestion row changes the scroll area's height).
  useEffect(() => {
    const frame = requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }))
    return () => cancelAnimationFrame(frame)
  }, [messages.length, busy, joinEvent, showSuggestions])

  const joinIndex = joinEvent ? messages.findIndex((m) => m.id === joinEvent.afterMessageId) : -2

  const joinLine = joinEvent && (
    <SystemLine time={joinEvent.time}>
      <span className="font-semibold text-white">{joinEvent.name}</span> joined UW AI Club
      <span className="ml-1.5 rounded-full bg-lemon px-1.5 py-px text-[9.5px] font-bold uppercase tracking-wide text-black">New member</span>
    </SystemLine>
  )

  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[20px] bg-panel">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-3 pt-3">
        <DateSeparator label="Today" />
        <SystemLine time="9:00 AM">
          <span className="font-semibold text-white">Maya</span> added <span className="font-semibold text-white">Sarah</span> (2026 President)
        </SystemLine>
        <SystemLine time="9:01 AM">
          <span className="font-semibold text-white">ClubBrain</span> joined · remembering decisions, lessons &amp; warnings
        </SystemLine>
        {joinEvent && joinEvent.afterMessageId === null && joinLine}
        {messages.map((m, i) => (
          <Fragment key={m.id}>
            <MessageRow
              message={m}
              isMine={m.sender === persona}
              grouping={groupingFor(messages, i, joinIndex >= 0 && i === joinIndex + 1)}
              onShowTrace={handleShowTrace}
            />
            {i === joinIndex && <div className="pt-3">{joinLine}</div>}
          </Fragment>
        ))}
        {joinEvent && joinEvent.afterMessageId !== null && joinIndex === -1 && joinLine}
        {busy && <TypingIndicator />}
        {send.isError && <p className="mt-3 text-center text-[12px] text-rose-400">Failed to send. Is the backend running?</p>}
        {welcomeFailed && <p className="mt-3 text-center text-[12px] text-rose-400">ClubBrain couldn’t send a welcome — the backend may be restarting.</p>}
        <div ref={endRef} />
      </div>

      <div className="space-y-2.5 px-4 pb-4 pt-1.5">
        {showSuggestions && <SuggestedQuestions questions={suggestions} disabled={busy} onPick={sendContent} />}
        <div className="flex h-12 items-center gap-2.5 rounded-full bg-panel-3 pl-5 pr-1.5 transition focus-within:ring-2 focus-within:ring-lemon/30">
          <Paperclip size={17} className="shrink-0 text-white/70" strokeWidth={1.8} />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Write a message as ${persona}${role ? ` (${role})` : ''}…`}
            className="min-w-0 flex-1 bg-transparent text-[13.5px] text-white outline-none placeholder:text-muted"
          />
          <Smile size={17} className="shrink-0 text-white/70" strokeWidth={1.8} />
          <button
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Send message"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition active:scale-95 ${
              canSend ? 'bg-lemon text-black hover:brightness-105' : 'text-white/70'
            }`}
          >
            <SendHorizontal size={17} strokeWidth={1.9} />
          </button>
        </div>
      </div>
      {trace && <MemoryTracePanel trace={trace} onClose={() => setTrace(null)} />}
    </section>
  )
}
