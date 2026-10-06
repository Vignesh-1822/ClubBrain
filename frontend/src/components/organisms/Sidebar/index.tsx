import { Brain, Loader2, MessagesSquare, Sparkles, type LucideIcon } from 'lucide-react'
import { useHealth, useMemories, useSeed } from '../../../hooks'
import BrandMark from '../../atoms/BrandMark'
import PersonaSwitcher from '../../molecules/PersonaSwitcher'

export type Tab = 'chat' | 'memory'

interface Props {
  tab: Tab
  onTab: (t: Tab) => void
  persona: string
  onPersona: (name: string) => void
}

export default function Sidebar({ tab, onTab, persona, onPersona }: Props) {
  const { data: health } = useHealth()
  const { data: memories } = useMemories('', 'all')
  const seed = useSeed()
  const isMem0 = health?.memory_backend === 'mem0'
  const nav: { id: Tab; label: string; icon: LucideIcon; count?: number }[] = [
    { id: 'chat', label: 'Club Chat', icon: MessagesSquare },
    { id: 'memory', label: 'Club Memory', icon: Brain, count: memories?.length },
  ]

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200/80 bg-[#f4f4f5] px-3 py-4">
      <div className="flex items-center gap-2.5 px-2">
        <BrandMark size={30} />
        <div className="min-w-0">
          <h1 className="text-[15px] font-semibold leading-tight tracking-tight text-slate-900">ClubBrain</h1>
          <p className="truncate text-[11px] leading-tight text-slate-500">UW AI Club</p>
        </div>
      </div>
      <p className="mt-3 px-2 text-[11px] leading-snug text-slate-400">
        People graduate.
        <br />
        <span className="font-medium text-slate-600">Knowledge shouldn’t.</span>
      </p>

      <nav className="mt-5 space-y-0.5">
        {nav.map((n) => {
          const active = tab === n.id
          const Icon = n.icon
          return (
            <button
              key={n.id}
              onClick={() => onTab(n.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium transition ${
                active ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Icon size={15} strokeWidth={2.1} className={active ? 'text-violet-600' : 'text-slate-400'} />
              {n.label}
              {n.count !== undefined && (
                <span className="ml-auto rounded-md bg-slate-200/70 px-1.5 text-[11px] tabular-nums text-slate-500">{n.count}</span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="my-5 h-px bg-slate-200/80" />
      <PersonaSwitcher persona={persona} onChange={onPersona} />

      <div className="mt-auto space-y-2.5">
        <button
          onClick={() => seed.mutate()}
          disabled={seed.isPending}
          className="group flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-violet-200 hover:text-violet-700 disabled:opacity-60"
        >
          {seed.isPending ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Sparkles size={13} className="text-violet-500 transition group-hover:rotate-12" />
          )}
          {seed.isPending ? 'Loading…' : seed.isSuccess ? `Loaded ${seed.data.count} memories` : 'Load demo memories'}
        </button>
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
          <span className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold ${isMem0 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'}`}>
            M
          </span>
          <span className="text-[11px] font-medium text-slate-600">{isMem0 ? 'Powered by Mem0' : 'Local fallback'}</span>
          <span className={`ml-auto h-1.5 w-1.5 rounded-full ${isMem0 ? 'bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]' : 'bg-slate-300'}`} />
        </div>
      </div>
    </aside>
  )
}
