import Avatar from '../Avatar'
import AiTag from '../AiTag'
import { BOT_NAME } from '../../../lib/persona'

export default function TypingIndicator() {
  return (
    <div className="flex animate-msg-in gap-4 pt-5">
      <Avatar name={BOT_NAME} size="lg" online />
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[15px] font-semibold text-white">
          {BOT_NAME} <AiTag />
          <span className="text-[13px] font-normal text-muted">is searching club memory…</span>
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 animate-typing rounded-full bg-lemon" style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
