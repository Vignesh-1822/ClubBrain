import { formatTime } from '../../../lib/category'
import { BOT_NAME } from '../../../lib/persona'
import type { Message, MessageGrouping } from '../../../types'
import AiTag from '../../atoms/AiTag'
import Avatar from '../../atoms/Avatar'
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
    <div className={`flex animate-msg-in gap-4 ${isFirstInGroup ? 'pt-5' : 'pt-1'}`}>
      <div className="w-10 shrink-0">{isFirstInGroup && <Avatar name={message.sender} size="lg" online />}</div>
      <div className="min-w-0 flex-1">
        {isFirstInGroup && (
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-semibold text-white">{message.sender}</span>
            {isBot && <AiTag />}
            {isMine && <span className="text-[12px] font-medium text-lemon">You</span>}
            <span className="ml-auto text-[13px] text-muted">{formatTime(message.timestamp)}</span>
          </div>
        )}
        <p className={`whitespace-pre-wrap text-[15px] leading-relaxed text-white/85 ${isFirstInGroup ? 'mt-1' : ''}`}>
          {renderContent(message.content)}
        </p>
        {isBot && memories.length > 0 && (
          <MemoryCitationPill memories={memories} onClick={() => onShowTrace(message)} />
        )}
        {message.detected_memory && <MemoryDetectedCard detected={message.detected_memory} />}
      </div>
    </div>
  )
}
