import { Plus } from 'lucide-react'
import type { Community } from '../../../types'
import BrandMark from '../../atoms/BrandMark'

const COMMUNITIES: Community[] = [
  { id: 'uwai', label: 'UW AI', active: true },
  { id: 'acm', label: 'ACM' },
  { id: 'swe', label: 'SWE' },
  { id: 'hack', label: 'Hack' },
]

export default function CommunityRail({ onHome }: { onHome: () => void }) {
  return (
    <nav className="flex w-[88px] shrink-0 flex-col items-center gap-4 rounded-[28px] bg-panel py-5">
      <button onClick={onHome} aria-label="ClubBrain home" title="ClubBrain">
        <BrandMark size={56} />
      </button>
      <div className="mt-6 flex flex-col items-center gap-4">
        {COMMUNITIES.map((c) => (
          <button
            key={c.id}
            onClick={c.active ? onHome : undefined}
            title={c.active ? 'UW AI Club' : `${c.label} (preview)`}
            className={`flex h-14 w-14 items-center justify-center rounded-full text-[13px] font-medium transition ${
              c.active
                ? 'bg-lemon font-semibold text-black'
                : 'bg-panel-2 text-white/85 hover:bg-panel-3'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <button
        aria-label="Add community"
        title="Add community"
        className="mt-auto flex h-14 w-14 items-center justify-center rounded-full bg-lemon text-black transition hover:brightness-105 active:scale-95"
      >
        <Plus size={26} strokeWidth={1.8} />
      </button>
    </nav>
  )
}
