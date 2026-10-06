import { Brain } from 'lucide-react'
import { useState } from 'react'
import { useMemories } from '../../../hooks'
import MemoryCard from '../../molecules/MemoryCard'

export default function LiveMemoryPanel() {
  const { data } = useMemories('', 'all', 3000)
  const latest = [...(data ?? [])]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 12)
  // id -> time it first appeared (0 = present on initial load). Only later arrivals glow.
  const [arrivals, setArrivals] = useState<Map<string, number> | null>(null)
  if (data && (arrivals === null || data.some((m) => !arrivals.has(m.id)))) {
    const next = new Map(arrivals ?? [])
    const now = Date.now()
    data.forEach((m) => {
      if (!next.has(m.id)) next.set(m.id, arrivals === null ? 0 : now)
    })
    setArrivals(next)
  }
  const arrivedAt = (id: string): number => arrivals?.get(id) ?? 0

  return (
    <aside className="hidden w-[320px] shrink-0 flex-col border-l border-slate-200/80 bg-[#fafafa] xl:flex">
      <div className="border-b border-slate-200/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <Brain size={15} className="text-violet-600" strokeWidth={2.3} />
          <h3 className="text-[13px] font-semibold text-slate-900">Club Memory</h3>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-inset ring-emerald-200">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-slate-500">
          <span className="font-semibold tabular-nums text-slate-700">{data?.length ?? 0}</span> memories · newest first
        </p>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {latest.length === 0 && (
          <div className="mt-8 flex flex-col items-center px-6 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-500 ring-1 ring-violet-100">
              <Brain size={18} />
            </span>
            <p className="mt-3 text-xs font-medium text-slate-600">No memories yet</p>
            <p className="mt-1 text-[11px] text-slate-400">Important knowledge from the chat will appear here in real time.</p>
          </div>
        )}
        {latest.map((m, i) => (
          <MemoryCard
            key={m.id}
            memory={m}
            compact
            animation={arrivedAt(m.id) > 0 ? 'glow' : 'pop'}
            isNew={Date.now() - arrivedAt(m.id) < 12000}
            index={i}
          />
        ))}
      </div>
    </aside>
  )
}
