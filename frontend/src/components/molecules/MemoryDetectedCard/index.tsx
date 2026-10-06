import { useState } from 'react'
import { useSaveMemory } from '../../../hooks'
import type { Message } from '../../../types'
import CategoryBadge from '../../atoms/CategoryBadge'

type Status = 'idle' | 'saved' | 'dismissed'

export default function MemoryDetectedCard({ message }: { message: Message }) {
  const [status, setStatus] = useState<Status>('idle')
  const save = useSaveMemory()
  const detected = message.detected_memory
  if (!detected || status === 'dismissed') return null

  if (status === 'saved') {
    return <p className="mt-1 text-xs font-medium text-green-600">✓ Saved to Club Memory</p>
  }

  const handleSave = () => {
    save.mutate(
      { text: detected.text, category: detected.category, source: `Club chat — ${message.sender}` },
      { onSuccess: () => setStatus('saved') },
    )
  }

  return (
    <div className="mt-2 max-w-sm rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-left shadow-sm">
      <p className="text-[11px] font-bold tracking-wide text-yellow-700">🧠 MEMORY DETECTED</p>
      <p className="mt-1 text-sm text-slate-800">{detected.text}</p>
      <div className="mt-2"><CategoryBadge category={detected.category} /></div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={handleSave}
          disabled={save.isPending}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {save.isPending ? 'Saving…' : 'Save to Club Memory'}
        </button>
        <button
          onClick={() => setStatus('dismissed')}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
