import { formatTime } from '../../../lib/category'
import { BOT_NAME } from '../../../lib/persona'
import type { DetectedStatus, Message, MessageGrouping } from '../../../types'
import Avatar from '../../atoms/Avatar'
import BubbleTail from '../../atoms/BubbleTail'
import MemoryCitationPill from '../MemoryCitationPill'
import MemoryDetectedCard from '../MemoryDetectedCard'

interface Props {
  message: Message
  isMine: boolean
  grouping: MessageGrouping
  onShowTrace: (message: Message) => void
  detectedStatus: DetectedStatus
  onDetectedStatusChange: (id: string, status: DetectedStatus) => void
}

export default function MessageBubble({ message, isMine, grouping, onShowTrace, detectedStatus, onDetectedStatusChange }: Props) {
  const { isFirstInGroup, isLastInGroup } = grouping
  const isBot = message.sender === BOT_NAME
  const memories = message.retrieved_memories ?? []
  const spacing = isFirstInGroup ? 'pt-3' : 'pt-0.5'

  const detectedCard = (
    <MemoryDetectedCard
      message={message}
      status={detectedStatus}
      onStatusChange={(status) => onDetectedStatusChange(message.id, status)}
    />
  )
  const timestamp = isLastInGroup && (
    <span className="mt-1 px-2 text-[10px] font-medium text-slate-400">{formatTime(message.timestamp)}</span>
  )

  if (isMine) {
    return (
      <div className={`flex animate-msg-in flex-col items-end ${spacing}`}>
        <div
          className={`relative max-w-[72%] whitespace-pre-wrap rounded-[20px] bg-imessage px-3.5 py-2 text-[14px] leading-snug text-white ${
            isLastInGroup ? 'rounded-br-[6px]' : ''
          }`}
        >
          {message.content}
          {isLastInGroup && <BubbleTail side="right" colorClass="text-imessage" />}
        </div>
        {timestamp}
        {detectedCard}
      </div>
    )
  }

  const bubbleColor = isBot ? 'bg-bubble-brain text-slate-800' : 'bg-bubble-gray text-slate-900'
  const tailColor = isBot ? 'text-bubble-brain' : 'text-bubble-gray'

  return (
    <div className={`flex animate-msg-in items-end gap-2 ${spacing}`}>
      <div className="w-7 shrink-0 self-start" style={{ marginTop: isFirstInGroup ? 18 : 0 }}>
        {isFirstInGroup && <Avatar name={message.sender} size="sm" />}
      </div>
      <div className="flex min-w-0 max-w-[72%] flex-col items-start">
        {isFirstInGroup && (
          <span className={`mb-1 ml-3 flex items-center gap-1.5 text-[11px] font-medium ${isBot ? 'text-violet-600' : 'text-slate-500'}`}>
            {message.sender}
            {isBot && (
              <span className="rounded bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-1 py-px text-[9px] font-bold uppercase tracking-wider text-white">
                AI
              </span>
            )}
          </span>
        )}
        <div
          className={`relative whitespace-pre-wrap rounded-[20px] px-3.5 py-2 text-[14px] leading-relaxed ${bubbleColor} ${
            isLastInGroup ? 'rounded-bl-[6px]' : ''
          }`}
        >
          {message.content}
          {isLastInGroup && <BubbleTail side="left" colorClass={tailColor} />}
        </div>
        {isBot && memories.length > 0 && (
          <MemoryCitationPill memories={memories} onClick={() => onShowTrace(message)} />
        )}
        {timestamp}
        {detectedCard}
      </div>
    </div>
  )
}
