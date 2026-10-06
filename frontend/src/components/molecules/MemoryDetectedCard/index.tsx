import { Brain, Check } from 'lucide-react'
import type { DetectedMemory } from '../../../types'
import CategoryBadge from '../../atoms/CategoryBadge'

/** Shown under a message whose knowledge ClubBrain auto-saved to club memory. */
export default function MemoryDetectedCard({ detected }: { detected: DetectedMemory }) {
  if (detected.saved === false) return null
  return (
    <div className="relative mt-3 max-w-xl animate-pop-in overflow-hidden rounded-2xl bg-panel-2 py-3 pl-5 pr-4">
      <span className="absolute inset-y-0 left-0 w-1 bg-lemon" />
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lemon text-black">
          <Brain size={13} strokeWidth={2.4} />
        </span>
        <span className="text-[13px] font-semibold text-lemon">Saved to Club Memory</span>
        <span className="flex h-4 w-4 animate-pop-in items-center justify-center rounded-full bg-lemon/15 text-lemon" style={{ animationDelay: '250ms' }}>
          <Check size={11} strokeWidth={3} />
        </span>
        <span className="ml-auto"><CategoryBadge category={detected.category} /></span>
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-white/85">{detected.text}</p>
    </div>
  )
}
