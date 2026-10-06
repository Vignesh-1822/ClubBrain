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
      className="group mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-panel-2 py-1 pl-1 pr-3 text-[12px] transition hover:bg-panel-3"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lemon/15 text-lemon">
        <Brain size={11} strokeWidth={2.4} />
      </span>
      <span className="font-semibold text-white">
        {count} {count === 1 ? 'memory' : 'memories'} retrieved
      </span>
      <span className="text-muted">·</span>
      <span className="text-lemon/90 group-hover:text-lemon">Why do you know this?</span>
      <ChevronRight size={13} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-lemon" />
    </button>
  )
}
