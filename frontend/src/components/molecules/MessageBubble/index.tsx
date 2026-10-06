import { formatTime } from '../../../lib/category'
import type { Message } from '../../../types'
import MemoryDetectedCard from '../MemoryDetectedCard'

interface Props {
  message: Message
  isMine: boolean
  onShowTrace: (memories: Message['retrieved_memories']) => void
}

export default function MessageBubble({ message, isMine, onShowTrace }: Props) {
  const isBot = message.sender === 'ClubBrain'
  const count = message.retrieved_memories?.length ?? 0

  if (isMine) {
    return (
      <div className="flex flex-col items-end">
        <div className="max-w-[75%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-2 text-sm text-white">{message.content}</div>
        <span className="mt-0.5 text-[10px] text-slate-400">{formatTime(message.timestamp)}</span>
        <MemoryDetectedCard message={message} />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${isBot ? 'bg-violet-100' : 'bg-slate-300 text-slate-700'}`}>
        {isBot ? '🤖' : message.sender.charAt(0)}
      </div>
      <div className="flex max-w-[75%] flex-col items-start">
        <span className="mb-0.5 text-[11px] font-medium text-slate-500">
          {isBot ? '🤖 ClubBrain' : message.sender}
        </span>
        <div className={`whitespace-pre-wrap rounded-2xl rounded-tl-md px-4 py-2 text-sm ${isBot ? 'border border-violet-200 bg-white shadow-sm' : 'bg-slate-200 text-slate-900'}`}>
          {message.content}
        </div>
        {isBot && count > 0 && (
          <button
            onClick={() => onShowTrace(message.retrieved_memories)}
            className="mt-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 hover:bg-violet-100"
          >
            🧠 {count} {count === 1 ? 'memory' : 'memories'} retrieved · Why do you know this?
          </button>
        )}
        <span className="mt-0.5 text-[10px] text-slate-400">{formatTime(message.timestamp)}</span>
        <MemoryDetectedCard message={message} />
      </div>
    </div>
  )
}
