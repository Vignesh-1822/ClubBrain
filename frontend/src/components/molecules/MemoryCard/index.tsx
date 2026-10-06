import { formatDate, formatRelative, getCategoryIcon, getCategoryMeta } from '../../../lib/category'
import type { Memory } from '../../../types'

interface Props {
  memory: Memory
  compact?: boolean
  animation?: 'pop' | 'glow' | 'none'
  isNew?: boolean
  index?: number
}

const ANIMATION_CLASS = { pop: 'animate-pop-in', glow: 'animate-memory-in', none: '' } as const

export default function MemoryCard({ memory, compact = false, animation = 'pop', isNew = false, index }: Props) {
  const meta = getCategoryMeta(memory.category)
  const Icon = getCategoryIcon(memory.category)
  const isWarning = memory.category === 'warning'
  return (
    <article
      className={`group relative overflow-hidden bg-panel-2 transition hover:bg-panel-3 ${
        compact ? 'rounded-[18px] p-3' : 'rounded-[24px] p-5'
      } ${ANIMATION_CLASS[animation]}`}
      style={index !== undefined && animation === 'pop' ? { animationDelay: `${Math.min(index, 10) * 30}ms` } : undefined}
    >
      {isWarning && <span className="absolute inset-y-0 left-0 w-1 bg-rose-400" />}
      <div className="flex items-center gap-2.5">
        <span className={`flex shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${meta.tile} ${compact ? 'h-7 w-7' : 'h-9 w-9'}`}>
          <Icon size={compact ? 13 : 16} strokeWidth={2.2} />
        </span>
        <span className={`text-[12px] font-semibold ${meta.text}`}>{meta.label}</span>
        {isNew && <span className="rounded-full bg-lemon px-1.5 py-px text-[10px] font-bold text-black">New</span>}
        <time className="ml-auto text-[11px] text-muted" title={formatDate(memory.created_at)}>
          {formatRelative(memory.created_at)}
        </time>
      </div>
      <p className={`leading-relaxed text-white/90 ${compact ? 'mt-2 text-[13px]' : 'mt-3 text-[14px]'}`}>{memory.text}</p>
      <p className="mt-2.5 flex items-center gap-1.5 truncate text-[11px] text-muted">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
        {memory.source}
      </p>
    </article>
  )
}
