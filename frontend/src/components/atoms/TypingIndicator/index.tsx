import Avatar from '../Avatar'
import AiTag from '../AiTag'
import { BOT_NAME } from '../../../lib/persona'

export default function TypingIndicator() {
  return (
    <div className="flex animate-msg-in gap-3 pt-4">
      <Avatar name={BOT_NAME} size="md" online />
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-white">
          {BOT_NAME} <AiTag />
          <span className="text-[12px] font-normal text-muted">is searching club memory…</span>
        </p>
        <div className="mt-1.5 flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 animate-typing rounded-full bg-lemon" style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
