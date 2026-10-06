import { Brain, LayoutGrid, Search, X } from 'lucide-react'
import { useDebounced, useMemories } from '../../../hooks'
import { CATEGORY_META, FILTER_CATEGORIES, getCategoryIcon } from '../../../lib/category'
import type { Category, MemoryFilter } from '../../../types'
import MemoryCard from '../../molecules/MemoryCard'

interface Props {
  query: string
  onQuery: (q: string) => void
  filter: MemoryFilter
  onFilter: (filter: MemoryFilter) => void
}

export default function MemoryBrowser({ query, onQuery, filter, onFilter }: Props) {
  const debounced = useDebounced(query, 300)
  const { data: memories = [], isFetching, isLoading } = useMemories(debounced, filter)
  const { data: all = [] } = useMemories('', 'all')
  const countFor = (c: Category) => all.filter((m) => m.category === c).length

  const chipBase = 'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition'
  const idleChip = 'bg-panel-2 text-white/80 hover:bg-panel-3 hover:text-white'

  return (
    <section className="min-h-0 flex-1 overflow-y-auto rounded-[20px] bg-panel px-5 py-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-1.5 text-[12px] font-medium text-lemon">
            <Brain size={13} strokeWidth={2.4} /> Club resources
          </p>
          <p className="mt-1 text-[13px] text-white/65">Events, sponsors, alumni, pitches and lessons — everything UW AI Club has learned.</p>
        </div>
        <div className="hidden rounded-2xl bg-panel-2 px-4 py-2.5 text-right sm:block">
          <p className="text-[20px] font-bold tabular-nums leading-none text-white">{all.length}</p>
          <p className="mt-1 text-[11px] text-muted">memories stored</p>
        </div>
      </div>

      <div className="mt-4 flex h-11 items-center gap-2.5 rounded-full bg-panel-3 px-4 transition focus-within:ring-2 focus-within:ring-lemon/30">
        <Search size={16} className="text-white/75" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Ask the club’s memory… e.g. “catering”, “Google”, “venue”"
          className="flex-1 bg-transparent text-[13.5px] text-white outline-none placeholder:text-muted"
        />
        {isFetching && query && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-lemon/20 border-t-lemon" />}
        {query && (
          <button onClick={() => onQuery('')} aria-label="Clear search" className="text-muted hover:text-white">
            <X size={15} />
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <button onClick={() => onFilter('all')} className={`${chipBase} ${filter === 'all' ? 'bg-lemon text-black' : idleChip}`}>
          <LayoutGrid size={12} strokeWidth={2.4} />
          All
          <span className={`tabular-nums ${filter === 'all' ? 'text-black/60' : 'text-muted'}`}>{all.length}</span>
        </button>
        {FILTER_CATEGORIES.map((c) => {
          const meta = CATEGORY_META[c]
          const Icon = getCategoryIcon(c)
          const active = filter === c
          return (
            <button key={c} onClick={() => onFilter(c)} className={`${chipBase} ${active ? meta.chip : idleChip}`}>
              <Icon size={12} strokeWidth={2.4} className={active ? '' : meta.text} />
              {meta.plural}
              <span className={`tabular-nums ${active ? 'text-black/60' : 'text-muted'}`}>{countFor(c)}</span>
            </button>
          )
        })}
      </div>

      {isLoading ? (
        <div className="mt-12 flex justify-center" aria-label="Loading memories">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-lemon/20 border-t-lemon" />
        </div>
      ) : memories.length === 0 ? (
        <div className="mt-12 flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-panel-2 text-lemon">
            <Brain size={19} />
          </span>
          <p className="mt-3 text-[13.5px] font-medium text-white">
            {debounced || filter !== 'all' ? 'No memories match your search' : 'No memories yet'}
          </p>
          <p className="mt-1 max-w-sm text-[12px] text-muted">
            {debounced || filter !== 'all' ? 'Try a different keyword or category.' : 'ClubBrain will surface important knowledge from your conversations.'}
          </p>
        </div>
      ) : (
        <div className="mt-4 grid gap-2.5 md:grid-cols-2 2xl:grid-cols-3">
          {memories.map((m, i) => <MemoryCard key={m.id} memory={m} index={i} />)}
        </div>
      )}
    </section>
  )
}
