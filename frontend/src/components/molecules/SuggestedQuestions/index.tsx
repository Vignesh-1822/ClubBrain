import { Sparkles } from 'lucide-react'
import type { SuggestedQuestion } from '../../../types'

interface Props {
  questions: SuggestedQuestion[]
  disabled?: boolean
  onPick: (question: string) => void
}

/** One-tap starter questions shown after a ClubBrain reply. */
export default function SuggestedQuestions({ questions, disabled = false, onPick }: Props) {
  if (questions.length === 0) return null
  return (
    <div className="flex animate-fade-in flex-wrap items-center gap-1.5">
      <span className="mr-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-muted">
        <Sparkles size={11} className="text-lemon" /> Try asking
      </span>
      {questions.map((q) => (
        <button
          key={q.label}
          onClick={() => onPick(q.prompt)}
          title={q.prompt}
          disabled={disabled}
          className="rounded-full bg-panel-2 px-2.5 py-1 text-[12px] text-white/85 ring-1 ring-inset ring-white/5 transition hover:bg-lemon hover:text-black hover:ring-lemon disabled:pointer-events-none disabled:opacity-50"
        >
          {q.label}
        </button>
      ))}
    </div>
  )
}
