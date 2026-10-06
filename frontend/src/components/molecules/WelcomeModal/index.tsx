import { ArrowRight, BookOpen, CalendarDays, Presentation, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Persona } from '../../../types'
import Avatar from '../../atoms/Avatar'
import BrandMark from '../../atoms/BrandMark'
import NewTag from '../../atoms/NewTag'

interface Props {
  member: Persona
  onContinue: () => void
  onClose: () => void
}

const PERKS = [
  { icon: BookOpen, text: 'Learn what the club has done' },
  { icon: CalendarDays, text: 'Plan events with past lessons' },
  { icon: Presentation, text: 'Prep sponsor pitches that worked' },
]

/** Login-style welcome for a newly joined member. */
export default function WelcomeModal({ member, onContinue, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        className="relative w-full max-w-[380px] animate-pop-in rounded-[20px] bg-panel p-6 shadow-2xl ring-1 ring-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition hover:bg-panel-2 hover:text-white"
        >
          <X size={15} />
        </button>
        <BrandMark size={40} />
        <h2 id="welcome-title" className="mt-4 text-[19px] font-bold tracking-tight text-white">
          Welcome to UW AI Club
        </h2>
        <p className="mt-1 text-[13px] leading-relaxed text-white/60">
          ClubBrain remembers everything the club has learned, so you can get up to speed on day one.
        </p>
        <ul className="mt-4 space-y-2">
          {PERKS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5 text-[12.5px] text-white/80">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lemon/10 text-lemon">
                <Icon size={12} strokeWidth={2.2} />
              </span>
              {text}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-2.5 rounded-2xl bg-panel-2 p-2.5">
          <Avatar name={member.name} size="md" />
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-white">
              {member.name} <NewTag />
            </span>
            <span className="block text-[11px] text-muted">{member.role}</span>
          </span>
        </div>
        <button
          onClick={onContinue}
          autoFocus
          className="mt-3 flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-lemon text-[13px] font-semibold text-black transition hover:brightness-105 active:scale-[0.98]"
        >
          Continue as {member.name} ({member.role})
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}
