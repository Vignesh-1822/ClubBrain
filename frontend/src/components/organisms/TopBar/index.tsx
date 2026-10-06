import { Bell, Loader2, RotateCcw, Search, Sparkles, UserPlus, X } from 'lucide-react'
import { useSeed } from '../../../hooks'
import Avatar from '../../atoms/Avatar'
import IconCircleButton from '../../atoms/IconCircleButton'

interface Props {
  title: string
  persona: string
  query: string
  onQuery: (q: string) => void
  showJoin: boolean
  onJoin: () => void
  onReset: () => void
  resetting: boolean
}

export default function TopBar({ title, persona, query, onQuery, showJoin, onJoin, onReset, resetting }: Props) {
  const seed = useSeed()
  const seedLabel = seed.isSuccess ? `Loaded ${seed.data.count} demo memories` : 'Load demo memories'
  return (
    <header className="flex items-center gap-2.5 pb-3">
      <h1 className="shrink-0 text-[26px] font-bold leading-none tracking-tight text-white">{title}</h1>
      {showJoin && (
        <button
          onClick={onJoin}
          className="ml-2 inline-flex h-8 shrink-0 animate-pop-in items-center gap-1.5 rounded-full bg-lemon px-3.5 text-[12.5px] font-semibold text-black shadow-[0_0_0_4px_rgba(238,242,155,0.12)] transition hover:brightness-105 active:scale-95"
        >
          <UserPlus size={14} strokeWidth={2.2} />
          Join as new member
        </button>
      )}
      <label className="ml-auto flex h-10 min-w-[120px] max-w-[260px] flex-1 items-center gap-2 rounded-full bg-panel px-4 transition focus-within:ring-2 focus-within:ring-lemon/40">
        <Search size={15} className="shrink-0 text-white/75" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search club memory"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-muted"
        />
        {query && (
          <button onClick={() => onQuery('')} aria-label="Clear search" className="text-muted hover:text-white">
            <X size={14} />
          </button>
        )}
      </label>
      <IconCircleButton
        icon={seed.isPending ? Loader2 : Sparkles}
        iconClassName={seed.isPending ? 'animate-spin' : seed.isSuccess ? 'text-lemon' : ''}
        label={seedLabel}
        onClick={() => seed.mutate()}
        disabled={seed.isPending}
        tone="flat"
        tooltip
      />
      <IconCircleButton
        icon={resetting ? Loader2 : RotateCcw}
        iconClassName={resetting ? 'animate-spin' : ''}
        label="Reset demo"
        onClick={onReset}
        disabled={resetting}
        tone="flat"
        tooltip
      />
      <IconCircleButton icon={Bell} label="Notifications" tone="flat" tooltip />
      <Avatar name={persona} size="lg" online className="ml-1" />
    </header>
  )
}
