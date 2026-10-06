import {
  CalendarDays,
  GraduationCap,
  Handshake,
  Lightbulb,
  Presentation,
  ShieldCheck,
  ThumbsUp,
  TriangleAlert,
  User,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { Category, CategoryMeta } from '../types'

const CHIP_ACTIVE = 'bg-lemon text-black ring-lemon'

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  decision: { label: 'Decision', plural: 'Decisions', text: 'text-sky-300', tile: 'bg-sky-400/10 text-sky-300 ring-sky-400/20', dot: 'bg-sky-400', chip: CHIP_ACTIVE },
  lesson: { label: 'Lesson', plural: 'Lessons', text: 'text-amber-300', tile: 'bg-amber-400/10 text-amber-300 ring-amber-400/20', dot: 'bg-amber-400', chip: CHIP_ACTIVE },
  person: { label: 'Person', plural: 'People', text: 'text-fuchsia-300', tile: 'bg-fuchsia-400/10 text-fuchsia-300 ring-fuchsia-400/20', dot: 'bg-fuchsia-400', chip: CHIP_ACTIVE },
  sponsor: { label: 'Sponsor', plural: 'Sponsors', text: 'text-emerald-300', tile: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20', dot: 'bg-emerald-400', chip: CHIP_ACTIVE },
  event: { label: 'Event', plural: 'Events', text: 'text-violet-300', tile: 'bg-violet-400/10 text-violet-300 ring-violet-400/20', dot: 'bg-violet-400', chip: CHIP_ACTIVE },
  preference: { label: 'Preference', plural: 'Preferences', text: 'text-teal-300', tile: 'bg-teal-400/10 text-teal-300 ring-teal-400/20', dot: 'bg-teal-400', chip: CHIP_ACTIVE },
  warning: { label: 'Avoid', plural: 'Avoid', text: 'text-rose-300', tile: 'bg-rose-400/10 text-rose-300 ring-rose-400/20', dot: 'bg-rose-400', chip: CHIP_ACTIVE },
  alumni: { label: 'Alumni', plural: 'Alumni', text: 'text-indigo-300', tile: 'bg-indigo-400/10 text-indigo-300 ring-indigo-400/20', dot: 'bg-indigo-400', chip: CHIP_ACTIVE },
  pitch: { label: 'Pitch', plural: 'Pitches', text: 'text-orange-300', tile: 'bg-orange-400/10 text-orange-300 ring-orange-400/20', dot: 'bg-orange-400', chip: CHIP_ACTIVE },
  rule: { label: 'Rule', plural: 'Rules', text: 'text-cyan-300', tile: 'bg-cyan-400/10 text-cyan-300 ring-cyan-400/20', dot: 'bg-cyan-400', chip: CHIP_ACTIVE },
}

/** Club Memory filter chips, in display order (after "All"). */
export const FILTER_CATEGORIES: Category[] = ['event', 'sponsor', 'alumni', 'pitch', 'rule', 'warning', 'lesson', 'decision', 'person']

/** Quick-access "Club resources" shortcuts in the left column. */
export const RESOURCE_CATEGORIES: Category[] = ['sponsor', 'alumni', 'pitch', 'warning']

export const CATEGORY_ICON: Record<Category, LucideIcon> = {
  decision: Zap,
  lesson: Lightbulb,
  person: User,
  sponsor: Handshake,
  event: CalendarDays,
  preference: ThumbsUp,
  warning: TriangleAlert,
  alumni: GraduationCap,
  pitch: Presentation,
  rule: ShieldCheck,
}

export const getCategoryMeta = (category: Category): CategoryMeta => CATEGORY_META[category] ?? CATEGORY_META.lesson
export const getCategoryIcon = (category: Category): LucideIcon => CATEGORY_ICON[category] ?? Lightbulb

export const formatTime = (iso: string): string => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export const formatDate = (iso: string): string => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
}

export const formatRelative = (iso: string): string => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const seconds = Math.round((Date.now() - d.getTime()) / 1000)
  if (seconds < 45) return 'just now'
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 7) return `${days}d ago`
  return formatDate(iso)
}
