import { Brain, ChevronRight } from 'lucide-react'
import type { Memory } from '../../../types'

interface Props {
  memories: Memory[]
  onClick: () => void
}

/** "Sources" chip under a ClubBrain answer that opens the Memory Trace. */
export default function MemoryCitationPill({ memories, onClick }: Props) {
  const count = memories.length
  return (
    <button
      onClick={onClick}
      className="group mt-3 inline-flex items-center gap-2 rounded-full bg-panel-2 py-1.5 pl-1.5 pr-3.5 text-[13px] transition hover:bg-panel-3"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lemon/15 text-lemon">
        <Brain size={13} strokeWidth={2.4} />
      </span>
      <span className="font-semibold text-white">
        {count} {count === 1 ? 'memory' : 'memories'} retrieved
      </span>
      <span className="text-muted">·</span>
      <span className="text-lemon/90 group-hover:text-lemon">Why do you know this?</span>
      <ChevronRight size={14} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-lemon" />
    </button>
  )
}
