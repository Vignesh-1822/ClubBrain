import type { Persona, SuggestedQuestion } from '../types'

export const BOT_NAME = 'ClubBrain'

export const PERSONAS: Persona[] = [
  { name: 'Maya', role: 'President', isAdmin: true },
  { name: 'Alex', role: 'Sponsorship' },
  { name: 'Sarah', role: 'Events' },
  { name: 'Vignesh', role: 'Engineering' },
  { name: 'Rahul', role: 'New member', isNew: true },
]

export const NEW_MEMBER: Persona = PERSONAS[PERSONAS.length - 1]
export const DEFAULT_PERSONA = 'Vignesh'

/** Starter chips: short label shown, full question sent (so ClubBrain treats it as a question). */
export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { label: "Top 5 events we've run", prompt: "What are the top 5 events we've run?" },
  { label: 'Who are our top sponsors?', prompt: 'Who are our top sponsors?' },
  { label: 'Alumni who can help with sponsors', prompt: 'Which alumni can help with sponsors?' },
  { label: 'Past pitches that won sponsorship', prompt: 'What past pitches won sponsorship?' },
  { label: 'Help me prepare a sponsor pitch', prompt: 'Help me prepare a sponsor pitch' },
  { label: 'What should I avoid when planning?', prompt: 'What should I avoid when planning?' },
]

const AVATAR_GRADIENTS: Record<string, string> = {
  Maya: 'from-rose-400 to-orange-400',
  Alex: 'from-emerald-400 to-teal-500',
  Sarah: 'from-sky-400 to-blue-500',
  Vignesh: 'from-amber-400 to-orange-500',
  Rahul: 'from-lime-300 to-emerald-500',
}

const FALLBACK_GRADIENTS = ['from-slate-400 to-slate-500', 'from-pink-400 to-rose-500', 'from-lime-400 to-green-500', 'from-cyan-400 to-sky-500']

export const avatarGradient = (name: string): string =>
  AVATAR_GRADIENTS[name] ?? FALLBACK_GRADIENTS[name.length % FALLBACK_GRADIENTS.length]

export const BRAIN_BG = 'bg-lemon text-black'
