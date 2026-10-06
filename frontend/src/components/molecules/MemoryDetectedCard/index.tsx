import { Brain, Check, X } from 'lucide-react'
import { useSaveMemory } from '../../../hooks'
import type { DetectedStatus, Message } from '../../../types'
import CategoryBadge from '../../atoms/CategoryBadge'

interface Props {
  message: Message
  status: DetectedStatus
  onStatusChange: (status: DetectedStatus) => void
}

export default function MemoryDetectedCard({ message, status, onStatusChange: setStatus }: Props) {
  const save = useSaveMemory()
  const detected = message.detected_memory
  if (!detected || status === 'dismissed') return null

  if (status === 'saved') {
    return (
      <p className="mt-1.5 inline-flex animate-pop-in items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
        <Check size={12} strokeWidth={2.6} />
        Saved to Club Memory
      </p>
    )
  }

  const handleSave = () => {
    save.mutate(
      { text: detected.text, category: detected.category, source: `Club chat — ${message.sender}` },
      { onSuccess: () => setStatus('saved') },
    )
  }

  return (
    <div className="mt-2 w-full max-w-sm animate-pop-in overflow-hidden rounded-2xl border border-amber-200/80 bg-white text-left shadow-[0_8px_24px_-12px_rgba(217,119,6,0.35)]">
      <div className="flex items-center gap-2 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50/40 px-3.5 py-2">
        <span className="relative flex h-5 w-5 items-center justify-center rounded-md bg-amber-500 text-white">
          <Brain size={12} strokeWidth={2.4} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-ping rounded-full bg-amber-400" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">Memory detected</span>
        <span className="ml-auto"><CategoryBadge category={detected.category} /></span>
      </div>
      <div className="px-3.5 py-3">
        <p className="text-[13px] leading-relaxed text-slate-800">{detected.text}</p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleSave}
            disabled={save.isPending}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98] disabled:opacity-60"
          >
            <Check size={13} strokeWidth={2.5} />
            {save.isPending ? 'Saving…' : 'Save to Club Memory'}
          </button>
          <button
            onClick={() => setStatus('dismissed')}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={13} />
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
