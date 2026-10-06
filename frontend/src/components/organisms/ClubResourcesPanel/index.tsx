import { ChevronRight } from 'lucide-react'
import { useMemories } from '../../../hooks'
import { CATEGORY_META, RESOURCE_CATEGORIES, getCategoryIcon } from '../../../lib/category'
import type { Category } from '../../../types'

/** Compact shortcuts into Club Memory, filtered by resource type. */
export default function ClubResourcesPanel({ onOpen }: { onOpen: (category: Category) => void }) {
  const { data: memories = [] } = useMemories('', 'all')
  const countFor = (c: Category) => memories.filter((m) => m.category === c).length

  return (
    <section className="rounded-[20px] bg-panel p-3">
      <h2 className="px-1 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">Quick access</h2>
      <div className="space-y-0.5">
        {RESOURCE_CATEGORIES.map((c) => {
          const meta = CATEGORY_META[c]
          const Icon = getCategoryIcon(c)
          return (
            <button
              key={c}
              onClick={() => onOpen(c)}
              className="group flex items-center gap-2 w-full rounded-xl px-1.5 py-1 text-left transition hover:bg-panel-2"
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ${meta.tile}`}>
                <Icon size={12} strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1 truncate text-[12.5px] text-white/85">{meta.plural}</span>
              <span className="text-[11px] tabular-nums text-muted group-hover:hidden">{countFor(c)}</span>
              <ChevronRight size={12} className="hidden text-lemon group-hover:block" />
            </button>
          )
        })}
      </div>
    </section>
  )
}
