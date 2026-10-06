import { Brain, Database, MessageSquareText, Sparkles, X, type LucideIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useHealth } from '../../../hooks'
import type { MemoryTrace } from '../../../types'
import MemoryCard from '../../molecules/MemoryCard'

interface Step {
  icon: LucideIcon
  title: string
  detail: string | null
  tone: string
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
  const backend = health?.memory_backend === 'mem0' ? 'Mem0' : 'Mem0 (local fallback)'
  const steps: Step[] = [
    { icon: MessageSquareText, title: 'Your question', detail: trace.question, tone: 'bg-blue-50 text-blue-600 ring-blue-100' },
    { icon: Database, title: `${backend} semantic search`, detail: 'Searched the club’s long-term memory', tone: 'bg-slate-100 text-slate-600 ring-slate-200' },
    { icon: Brain, title: `${count} relevant ${count === 1 ? 'memory' : 'memories'}`, detail: 'Ranked by relevance and injected as context', tone: 'bg-violet-50 text-violet-600 ring-violet-100' },
    { icon: Sparkles, title: 'Grounded answer', detail: trace.answer, tone: 'bg-fuchsia-50 text-fuchsia-600 ring-fuchsia-100' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in justify-end bg-slate-900/20 backdrop-blur-[2px]" onClick={onClose}>
      <aside
        className="flex h-full w-full max-w-md animate-slide-in flex-col border-l border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/25">
            <Brain size={16} strokeWidth={2.3} />
          </span>
          <div>
            <h2 className="text-[14px] font-semibold text-slate-900">Memory Trace</h2>
            <p className="text-[11px] text-slate-500">How ClubBrain knew this</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close memory trace"
            className="ml-auto rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <ol className="relative">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLast = i === steps.length - 1
              return (
                <li key={step.title} className="relative flex animate-pop-in gap-3 pb-5" style={{ animationDelay: `${80 + i * 90}ms` }}>
                  {!isLast && (
                    <span className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-slate-300 to-slate-200" />
                  )}
                  <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${step.tone}`}>
                    <Icon size={15} strokeWidth={2.2} />
                  </span>
                  <div className="min-w-0 pt-1">
                    <p className="text-[13px] font-semibold text-slate-900">{step.title}</p>
                    {step.detail && (
                      <p className={`mt-0.5 text-[12px] leading-relaxed text-slate-500 ${isLast ? 'line-clamp-3' : 'line-clamp-2'} ${i === 0 ? 'italic text-slate-600' : ''}`}>
                        {i === 0 ? `“${step.detail}”` : step.detail}
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="mb-3 mt-1 flex items-center gap-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Sources</h3>
            <span className="h-px flex-1 bg-slate-100" />
            <span className="text-[11px] tabular-nums text-slate-400">{count}</span>
          </div>
          <div className="space-y-2.5">
            {trace.memories.map((m, i) => (
              <div key={m.id} className="relative">
                <span className="absolute -left-2 top-3 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white ring-2 ring-white">
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
