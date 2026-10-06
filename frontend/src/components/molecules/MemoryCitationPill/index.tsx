import { ChevronRight } from 'lucide-react'
import { getCategoryIcon, getCategoryMeta } from '../../../lib/category'
import type { Memory } from '../../../types'

interface Props {
  memories: Memory[]
  onClick: () => void
}

/** Perplexity-style "sources" chip under a ClubBrain answer. */
export default function MemoryCitationPill({ memories, onClick }: Props) {
  const count = memories.length
  const categories = [...new Set(memories.map((m) => m.category))].slice(0, 3)
  return (
    <button
      onClick={onClick}
      className="group mt-1.5 inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white py-1 pl-1 pr-2.5 text-[12px] shadow-sm transition hover:border-violet-300 hover:shadow-md hover:shadow-violet-500/10"
    >
      <span className="flex -space-x-1">
        {categories.map((c) => {
          const Icon = getCategoryIcon(c)
          return (
            <span key={c} className={`flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white ${getCategoryMeta(c).tile}`}>
              <Icon size={10} strokeWidth={2.5} />
            </span>
          )
        })}
      </span>
      <span className="font-semibold text-violet-700">
        {count} {count === 1 ? 'memory' : 'memories'} retrieved
      </span>
      <span className="text-slate-300">·</span>
      <span className="text-slate-500 group-hover:text-slate-700">Why do you know this?</span>
      <ChevronRight size={13} className="text-slate-400 transition group-hover:translate-x-0.5" />
    </button>
  )
}
