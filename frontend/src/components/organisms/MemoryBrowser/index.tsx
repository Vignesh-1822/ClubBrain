import { Brain, LayoutGrid, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useDebounced, useMemories } from '../../../hooks'
import { CATEGORY_META, getCategoryIcon } from '../../../lib/category'
import type { Category } from '../../../types'
import MemoryCard from '../../molecules/MemoryCard'

type Filter = Category | 'all'
const CATEGORIES = Object.keys(CATEGORY_META) as Category[]

interface Props {
  query: string
  onQuery: (q: string) => void
}

export default function MemoryBrowser({ query, onQuery }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const debounced = useDebounced(query, 300)
  const { data: memories = [], isFetching } = useMemories(debounced, filter)
  const { data: all = [] } = useMemories('', 'all')
  const countFor = (c: Category) => all.filter((m) => m.category === c).length

  const chipBase = 'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition'
  const idleChip = 'bg-panel-2 text-white/80 hover:bg-panel-3 hover:text-white'

  return (
    <section className="min-h-0 flex-1 overflow-y-auto rounded-[28px] bg-panel px-7 py-7">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-1.5 text-[13px] font-medium text-lemon">
            <Brain size={14} strokeWidth={2.4} /> Institutional memory
          </p>
          <p className="mt-1 text-[15px] text-white/70">Everything UW AI Club has learned — searchable, forever.</p>
        </div>
        <div className="hidden rounded-[22px] bg-panel-2 px-5 py-3 text-right sm:block">
          <p className="text-[26px] font-bold tabular-nums leading-none text-white">{all.length}</p>
          <p className="mt-1 text-[12px] text-muted">memories stored</p>
        </div>
      </div>

      <div className="mt-6 flex h-14 items-center gap-3 rounded-full bg-panel-3 px-5 transition focus-within:ring-2 focus-within:ring-lemon/30">
        <Search size={19} className="text-white/80" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Ask the club’s memory… e.g. “catering”, “Google”, “venue”"
          className="flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-muted"
        />
        {isFetching && query && <span className="h-4 w-4 animate-spin rounded-full border-2 border-lemon/20 border-t-lemon" />}
        {query && (
          <button onClick={() => onQuery('')} aria-label="Clear search" className="text-muted hover:text-white">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')} className={`${chipBase} ${filter === 'all' ? 'bg-lemon text-black' : idleChip}`}>
          <LayoutGrid size={13} strokeWidth={2.4} />
          All
          <span className={`tabular-nums ${filter === 'all' ? 'text-black/60' : 'text-muted'}`}>{all.length}</span>
        </button>
        {CATEGORIES.map((c) => {
          const meta = CATEGORY_META[c]
          const Icon = getCategoryIcon(c)
          const active = filter === c
          return (
            <button key={c} onClick={() => setFilter(c)} className={`${chipBase} ${active ? meta.chip : idleChip}`}>
              <Icon size={13} strokeWidth={2.4} className={active ? '' : meta.text} />
              {meta.plural}
              <span className={`tabular-nums ${active ? 'text-black/60' : 'text-muted'}`}>{countFor(c)}</span>
            </button>
          )
        })}
      </div>

      {memories.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-panel-2 text-lemon">
            <Brain size={24} />
          </span>
          <p className="mt-4 text-[15px] font-medium text-white">
            {debounced || filter !== 'all' ? 'No memories match your search' : 'No memories yet'}
          </p>
          <p className="mt-1 max-w-sm text-[13px] text-muted">
            {debounced || filter !== 'all' ? 'Try a different keyword or category.' : 'ClubBrain will surface important knowledge from your conversations.'}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
          {memories.map((m, i) => <MemoryCard key={m.id} memory={m} index={i} />)}
        </div>
      )}
    </section>
  )
}
