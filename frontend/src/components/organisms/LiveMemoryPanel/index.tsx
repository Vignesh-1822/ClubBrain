import { Brain, Loader2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useMemories, useSeed } from '../../../hooks'
import MemoryCard from '../../molecules/MemoryCard'

export default function LiveMemoryPanel({ onOpen }: { onOpen: () => void }) {
  const { data } = useMemories('', 'all', 3000)
  const seed = useSeed()
  const latest = [...(data ?? [])].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 12)
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
    <section className="flex min-h-[240px] flex-1 flex-col rounded-[20px] bg-panel p-4">
      <div className="flex items-center gap-2">
        <button onClick={onOpen} className="text-[15px] font-bold text-white transition hover:text-lemon">Club Memory</button>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-lemon/10 px-2 py-0.5 text-[10.5px] font-semibold text-lemon">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lemon opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lemon" />
          </span>
          Live · {data?.length ?? 0}
        </span>
      </div>
      <div className="-mx-1 mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto px-1">
        {latest.length === 0 && (
          <div className="flex flex-col items-center px-4 py-6 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-panel-2 text-lemon">
              <Brain size={19} />
            </span>
            <p className="mt-3 text-[13px] font-medium text-white">No memories yet</p>
            <p className="mt-1 text-[12px] text-muted">Knowledge from the chat appears here in real time.</p>
            <button
              onClick={() => seed.mutate()}
              disabled={seed.isPending}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-lemon px-4 py-2 text-[13px] font-semibold text-black transition hover:brightness-105 disabled:opacity-60"
            >
              {seed.isPending ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              Load demo memories
            </button>
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
    </section>
  )
}
