import Avatar from '../Avatar'
import BubbleTail from '../BubbleTail'
import { BOT_NAME } from '../../../lib/persona'

export default function TypingIndicator() {
  return (
    <div className="flex animate-msg-in items-end gap-2 pt-2">
      <Avatar name={BOT_NAME} size="sm" />
      <div className="flex flex-col items-start">
        <span className="mb-1 ml-3 text-[11px] font-medium text-violet-600">ClubBrain is searching memory…</span>
        <div className="relative flex items-center gap-1 rounded-[20px] bg-bubble-brain px-4 py-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 animate-typing rounded-full bg-violet-400"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
          <BubbleTail side="left" colorClass="text-bubble-brain" />
        </div>
      </div>
    </div>
  )
}
