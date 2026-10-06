import { formatTime } from '../../../lib/category'
import { BOT_NAME } from '../../../lib/persona'
import type { Message, MessageGrouping } from '../../../types'
import AiTag from '../../atoms/AiTag'
import Avatar from '../../atoms/Avatar'
import Markdown from '../../atoms/Markdown'
import MemoryCitationPill from '../MemoryCitationPill'
import MemoryDetectedCard from '../MemoryDetectedCard'

interface Props {
  message: Message
  isMine: boolean
  grouping: MessageGrouping
  onShowTrace: (message: Message) => void
}

/** Highlights @mentions in the accent color. */
const renderContent = (content: string) =>
  content.split(/(@\w+)/g).map((part, i) =>
    part.startsWith('@') ? <span key={i} className="text-lemon">{part}</span> : part,
  )

export default function MessageRow({ message, isMine, grouping, onShowTrace }: Props) {
  const isBot = message.sender === BOT_NAME
  const memories = message.retrieved_memories ?? []
  const { isFirstInGroup } = grouping
  return (
    <div className={`flex animate-msg-in gap-3 ${isFirstInGroup ? 'pt-4' : 'pt-0.5'}`}>
      <div className="w-8 shrink-0">{isFirstInGroup && <Avatar name={message.sender} size="md" online />}</div>
      <div className="min-w-0 flex-1">
        {isFirstInGroup && (
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-white">{message.sender}</span>
            {isBot && <AiTag />}
            {isMine && <span className="text-[11px] font-medium text-lemon">You</span>}
            <span className="ml-auto text-[11.5px] text-muted">{formatTime(message.timestamp)}</span>
          </div>
        )}
        <div className={`max-w-[68ch] ${isFirstInGroup ? 'mt-0.5' : ''}`}>
          {isBot ? (
            <Markdown content={message.content} />
          ) : (
            <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-white/85">{renderContent(message.content)}</p>
          )}
        </div>
        {isBot && memories.length > 0 && (
          <MemoryCitationPill memories={memories} onClick={() => onShowTrace(message)} />
        )}
        {message.detected_memory && <MemoryDetectedCard detected={message.detected_memory} />}
      </div>
    </div>
  )
}
