import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { Memory } from '../../../types'
import MemoryCard from '../../molecules/MemoryCard'

export default function MemoryTracePanel({ memories, onClose }: { memories: Memory[]; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const steps = ['Your question', 'Mem0 search', `${memories.length} relevant memories`, 'Answer']
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30" onClick={onClose}>
      <aside className="slide-in h-full w-full max-w-md overflow-y-auto bg-slate-50 p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wide text-violet-700">MEMORY TRACE</h2>
          <button onClick={onClose} aria-label="Close memory trace" className="rounded-lg p-1 hover:bg-slate-200"><X size={18} /></button>
        </div>
        <ol className="mt-4 space-y-1">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-col items-start">
              <span className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium">{s}</span>
              {i < steps.length - 1 && <span className="ml-4 text-slate-400">↓</span>}
            </li>
          ))}
        </ol>
        <div className="mt-5 space-y-3">
          {memories.map((m) => <MemoryCard key={m.id} memory={m} />)}
        </div>
      </aside>
    </div>
  )
}
