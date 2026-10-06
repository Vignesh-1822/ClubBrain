import { Search } from 'lucide-react'
import { useState } from 'react'
import { useDebounced, useMemories } from '../../../hooks'
import type { Category } from '../../../types'
import MemoryCard from '../../molecules/MemoryCard'

type Filter = Category | 'all'
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'decision', label: 'Decisions' },
  { id: 'lesson', label: 'Lessons' },
  { id: 'person', label: 'People' },
  { id: 'sponsor', label: 'Sponsors' },
  { id: 'event', label: 'Events' },
  { id: 'warning', label: 'Warnings' },
]

export default function MemoryBrowser() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const debounced = useDebounced(query, 300)
  const { data: memories = [] } = useMemories(debounced, filter)

  return (
    <div className="h-full overflow-y-auto p-8">
      <h2 className="text-2xl font-bold">🧠 Club Memory — Everything your organization has learned.</h2>
      <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2">
        <Search size={16} className="text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search memories…"
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${filter === f.id ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-100'}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {memories.length === 0 ? (
        <p className="mt-10 text-center text-sm text-slate-500">
          No memories yet. ClubBrain will surface important knowledge from your conversations.
        </p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {memories.map((m) => <MemoryCard key={m.id} memory={m} />)}
        </div>
      )}
    </div>
  )
}
