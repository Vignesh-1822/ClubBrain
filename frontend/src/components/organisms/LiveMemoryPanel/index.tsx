import { useMemories } from '../../../hooks'
import MemoryCard from '../../molecules/MemoryCard'

export default function LiveMemoryPanel() {
  const { data } = useMemories('', 'all', 3000)
  const latest = [...(data ?? [])]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 12)
  return (
    <aside className="hidden w-80 shrink-0 flex-col border-l border-slate-200 bg-white xl:flex">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold">🧠 Club Memory</h3>
        <p className="text-xs text-slate-500">Live · {data?.length ?? 0} memories · newest first</p>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {latest.length === 0 && <p className="text-xs text-slate-400">No memories yet.</p>}
        {latest.map((m) => <MemoryCard key={m.id} memory={m} compact />)}
      </div>
    </aside>
  )
}
