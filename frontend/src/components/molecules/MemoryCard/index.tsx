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
        compact ? 'rounded-2xl p-2.5' : 'rounded-[18px] p-4'
      } ${ANIMATION_CLASS[animation]}`}
      style={index !== undefined && animation === 'pop' ? { animationDelay: `${Math.min(index, 10) * 30}ms` } : undefined}
    >
      {isWarning && <span className="absolute inset-y-0 left-0 w-1 bg-rose-400" />}
      <div className="flex items-center gap-2">
        <span className={`flex shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ${meta.tile} ${compact ? 'h-6 w-6' : 'h-7 w-7'}`}>
          <Icon size={compact ? 12 : 14} strokeWidth={2.2} />
        </span>
        <span className={`text-[11.5px] font-semibold ${meta.text}`}>{meta.label}</span>
        {isNew && <span className="rounded-full bg-lemon px-1.5 py-px text-[9.5px] font-bold text-black">New</span>}
        <time className="ml-auto text-[10.5px] text-muted" title={formatDate(memory.created_at)}>
          {formatRelative(memory.created_at)}
        </time>
      </div>
      <p className={`leading-relaxed text-white/90 ${compact ? 'mt-1.5 text-[12px]' : 'mt-2.5 text-[13px]'}`}>{memory.text}</p>
      <p className="mt-2 flex items-center gap-1.5 truncate text-[10.5px] text-muted">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
        {memory.source}
      </p>
    </article>
  )
}
