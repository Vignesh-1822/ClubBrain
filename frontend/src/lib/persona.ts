import type { Persona } from '../types'

export const BOT_NAME = 'ClubBrain'

export const PERSONAS: Persona[] = [
  { name: 'Maya', role: 'President', isAdmin: true },
  { name: 'Alex', role: 'Sponsorship' },
  { name: 'Sarah', role: 'Events' },
  { name: 'Vignesh', role: 'Engineering' },
]

const AVATAR_GRADIENTS: Record<string, string> = {
  Maya: 'from-rose-400 to-orange-400',
  Alex: 'from-emerald-400 to-teal-500',
  Sarah: 'from-sky-400 to-blue-500',
  Vignesh: 'from-amber-400 to-orange-500',
}

const FALLBACK_GRADIENTS = ['from-slate-400 to-slate-500', 'from-pink-400 to-rose-500', 'from-lime-400 to-green-500', 'from-cyan-400 to-sky-500']

export const avatarGradient = (name: string): string =>
  AVATAR_GRADIENTS[name] ?? FALLBACK_GRADIENTS[name.length % FALLBACK_GRADIENTS.length]

export const BRAIN_BG = 'bg-lemon text-black'
