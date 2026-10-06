import { Brain, Database, MessageSquareText, Sparkles, X, type LucideIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useHealth } from '../../../hooks'
import type { MemoryTrace } from '../../../types'
import MemoryCard from '../../molecules/MemoryCard'

interface Step {
  icon: LucideIcon
  title: string
  detail: string | null
}

export default function MemoryTracePanel({ trace, onClose }: { trace: MemoryTrace; onClose: () => void }) {
  const { data: health } = useHealth()
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const count = trace.memories.length
  const backend = health?.memory_backend === 'mem0' ? 'Mem0' : 'Local memory'
  const steps: Step[] = [
    { icon: MessageSquareText, title: 'Question', detail: trace.question },
    { icon: Database, title: `${backend} semantic search`, detail: 'Searched the club’s long-term memory' },
    { icon: Brain, title: `${count} relevant ${count === 1 ? 'memory' : 'memories'}`, detail: 'Ranked by relevance and injected as context' },
    { icon: Sparkles, title: 'Grounded answer', detail: trace.answer },
  ]

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in justify-end bg-black/60 p-4 backdrop-blur-[2px]" onClick={onClose}>
      <aside
        className="flex h-full w-full max-w-md animate-slide-in flex-col overflow-hidden rounded-[28px] bg-panel shadow-2xl ring-1 ring-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-6 pb-3 pt-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lemon text-black">
            <Brain size={20} strokeWidth={2.2} />
          </span>
          <div>
            <h2 className="text-[20px] font-bold text-white">Memory Trace</h2>
            <p className="text-[12px] text-muted">How ClubBrain knew this</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close memory trace"
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-panel-2 text-white/80 transition hover:bg-panel-3 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-3">
          <ol className="relative">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLast = i === steps.length - 1
              return (
                <li key={step.title} className="relative flex animate-pop-in gap-3.5 pb-5" style={{ animationDelay: `${80 + i * 90}ms` }}>
                  {!isLast && <span className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-0.5 rounded-full bg-lemon/50" />}
                  <span
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      isLast ? 'bg-lemon text-black' : 'bg-panel-2 text-lemon'
                    }`}
                  >
                    <Icon size={17} strokeWidth={2.1} />
                  </span>
                  <div className="min-w-0 pt-1.5">
                    <p className="text-[14px] font-semibold text-white">{step.title}</p>
                    {step.detail && (
                      <p className={`mt-0.5 text-[13px] leading-relaxed text-white/60 ${isLast ? 'line-clamp-3' : 'line-clamp-2'} ${i === 0 ? 'italic text-white/80' : ''}`}>
                        {i === 0 ? `“${step.detail}”` : step.detail}
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="mb-3 mt-1 flex items-center gap-2">
            <h3 className="text-[12px] font-semibold uppercase tracking-wider text-muted">Sources</h3>
            <span className="h-px flex-1 bg-white/5" />
            <span className="text-[12px] tabular-nums text-muted">{count}</span>
          </div>
          <div className="space-y-2.5">
            {trace.memories.map((m, i) => (
              <div key={m.id} className="relative">
                <span className="absolute -left-1.5 top-3 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-lemon text-[10px] font-bold text-black ring-2 ring-panel">
                  {i + 1}
                </span>
                <MemoryCard memory={m} index={i} />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
