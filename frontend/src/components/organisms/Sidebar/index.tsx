import { useHealth, useSeed } from '../../../hooks'

export type Tab = 'chat' | 'memory'

export default function Sidebar({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const { data: health } = useHealth()
  const seed = useSeed()
  const isMem0 = health?.memory_backend === 'mem0'
  const nav: { id: Tab; label: string }[] = [
    { id: 'chat', label: '💬 Club Chat' },
    { id: 'memory', label: '🧠 Club Memory' },
  ]
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white p-4">
      <h1 className="text-lg font-bold">🧠 ClubBrain</h1>
      <p className="text-xs text-slate-500">UW AI Club</p>
      <nav className="mt-6 space-y-1">
        {nav.map((n) => (
          <button
            key={n.id}
            onClick={() => onTab(n.id)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${tab === n.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            {n.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto space-y-3">
        <button
          onClick={() => seed.mutate()}
          disabled={seed.isPending}
          className="w-full rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-xs font-medium text-yellow-800 hover:bg-yellow-100 disabled:opacity-60"
        >
          {seed.isPending ? 'Loading…' : seed.isSuccess ? `Loaded ${seed.data.count} memories` : 'Load demo memories'}
        </button>
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${isMem0 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
          {isMem0 ? '● Powered by Mem0' : '● local fallback'}
        </span>
      </div>
    </aside>
  )
}
