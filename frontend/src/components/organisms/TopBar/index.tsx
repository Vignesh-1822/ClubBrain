import { Bell, Loader2, Search, Sparkles, X } from 'lucide-react'
import { useSeed } from '../../../hooks'
import Avatar from '../../atoms/Avatar'
import IconCircleButton from '../../atoms/IconCircleButton'

interface Props {
  title: string
  persona: string
  query: string
  onQuery: (q: string) => void
}

export default function TopBar({ title, persona, query, onQuery }: Props) {
  const seed = useSeed()
  const seedLabel = seed.isSuccess ? `Loaded ${seed.data.count} demo memories` : 'Load demo memories'
  return (
    <header className="flex items-center gap-4 pb-4 pt-1">
      <h1 className="shrink-0 text-[40px] font-bold leading-none tracking-tight text-white">{title}</h1>
      <label className="ml-auto flex h-14 min-w-[150px] max-w-[340px] flex-1 items-center gap-3 rounded-full bg-panel px-5 transition focus-within:ring-2 focus-within:ring-lemon/40">
        <Search size={20} className="shrink-0 text-white/80" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search club memory"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-muted"
        />
        {query && (
          <button onClick={() => onQuery('')} aria-label="Clear search" className="text-muted hover:text-white">
            <X size={16} />
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
      />
      <IconCircleButton icon={Bell} label="Notifications" tone="flat" />
      <Avatar name={persona} size="xl" online />
    </header>
  )
}
