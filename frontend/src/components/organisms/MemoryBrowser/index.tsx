import { Brain, LayoutGrid, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useDebounced, useMemories } from '../../../hooks'
import { CATEGORY_META, getCategoryIcon } from '../../../lib/category'
import type { Category } from '../../../types'
import MemoryCard from '../../molecules/MemoryCard'

type Filter = Category | 'all'
const CATEGORIES = Object.keys(CATEGORY_META) as Category[]

export default function MemoryBrowser() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const debounced = useDebounced(query, 300)
  const { data: memories = [], isFetching } = useMemories(debounced, filter)
  const { data: all = [] } = useMemories('', 'all')
  const countFor = (c: Category) => all.filter((m) => m.category === c).length

  const chipBase = 'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset transition'
  const idleChip = 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50 hover:text-slate-900'

  return (
    <div className="h-full overflow-y-auto bg-[#f7f7f8]">
      <div className="mx-auto max-w-6xl px-8 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-violet-600">
              <Brain size={13} strokeWidth={2.4} /> Institutional memory
            </p>
            <h2 className="mt-1 text-[28px] font-semibold tracking-tight text-slate-900">Club Memory</h2>
            <p className="mt-1 text-sm text-slate-500">Everything UW AI Club has learned — searchable, forever.</p>
          </div>
          <div className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-right shadow-sm sm:block">
            <p className="text-[22px] font-semibold tabular-nums leading-none text-slate-900">{all.length}</p>
            <p className="mt-1 text-[11px] text-slate-500">memories stored</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-500/10">
          <Search size={17} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask the club’s memory… e.g. “catering”, “Google”, “venue”"
            className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-slate-400"
          />
          {isFetching && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-violet-200 border-t-violet-500" />}
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear search" className="rounded-md p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
              <X size={15} />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`${chipBase} ${filter === 'all' ? 'bg-slate-900 text-white ring-slate-900' : idleChip}`}
          >
            <LayoutGrid size={12} strokeWidth={2.4} />
            All
            <span className={`tabular-nums ${filter === 'all' ? 'text-white/60' : 'text-slate-400'}`}>{all.length}</span>
          </button>
          {CATEGORIES.map((c) => {
            const meta = CATEGORY_META[c]
            const Icon = getCategoryIcon(c)
            const active = filter === c
            return (
              <button key={c} onClick={() => setFilter(c)} className={`${chipBase} ${active ? meta.chip : idleChip}`}>
                <Icon size={12} strokeWidth={2.4} className={active ? '' : meta.text} />
                {meta.plural}
                <span className={`tabular-nums ${active ? 'text-white/70' : 'text-slate-400'}`}>{countFor(c)}</span>
              </button>
            )
          })}
        </div>

        {memories.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-500 shadow-sm ring-1 ring-slate-200">
              <Brain size={22} />
            </span>
            <p className="mt-4 text-sm font-medium text-slate-700">
              {debounced || filter !== 'all' ? 'No memories match your search' : 'No memories yet'}
            </p>
            <p className="mt-1 max-w-sm text-[13px] text-slate-500">
              {debounced || filter !== 'all'
                ? 'Try a different keyword or category.'
                : 'ClubBrain will surface important knowledge from your conversations.'}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {memories.map((m, i) => <MemoryCard key={m.id} memory={m} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
