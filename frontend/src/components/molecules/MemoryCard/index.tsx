import { formatDate } from '../../../lib/category'
import type { Memory } from '../../../types'
import CategoryBadge from '../../atoms/CategoryBadge'

export default function MemoryCard({ memory, compact = false }: { memory: Memory; compact?: boolean }) {
  const isWarning = memory.category === 'warning'
  return (
    <div className={`rounded-xl border bg-white p-3 shadow-sm ${isWarning ? 'border-red-200' : 'border-slate-200'}`}>
      <CategoryBadge category={memory.category} />
      <p className={`mt-2 text-slate-800 ${compact ? 'text-xs' : 'text-sm'}`}>{memory.text}</p>
      <p className="mt-2 text-[11px] text-slate-400">
        {memory.source} · {formatDate(memory.created_at)}
      </p>
    </div>
  )
}
