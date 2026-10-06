import { CalendarDays, Handshake, Lightbulb, ThumbsUp, TriangleAlert, User, Zap, type LucideIcon } from 'lucide-react'
import type { Category, CategoryMeta } from '../types'

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  decision: { label: 'Decision', plural: 'Decisions', text: 'text-blue-600', tile: 'bg-blue-50 text-blue-600 ring-blue-100', dot: 'bg-blue-500', chip: 'bg-blue-600 text-white ring-blue-600' },
  lesson: { label: 'Lesson', plural: 'Lessons', text: 'text-amber-600', tile: 'bg-amber-50 text-amber-600 ring-amber-100', dot: 'bg-amber-500', chip: 'bg-amber-500 text-white ring-amber-500' },
  person: { label: 'Person', plural: 'People', text: 'text-fuchsia-600', tile: 'bg-fuchsia-50 text-fuchsia-600 ring-fuchsia-100', dot: 'bg-fuchsia-500', chip: 'bg-fuchsia-600 text-white ring-fuchsia-600' },
  sponsor: { label: 'Sponsor', plural: 'Sponsors', text: 'text-emerald-600', tile: 'bg-emerald-50 text-emerald-600 ring-emerald-100', dot: 'bg-emerald-500', chip: 'bg-emerald-600 text-white ring-emerald-600' },
  event: { label: 'Event', plural: 'Events', text: 'text-sky-600', tile: 'bg-sky-50 text-sky-600 ring-sky-100', dot: 'bg-sky-500', chip: 'bg-sky-600 text-white ring-sky-600' },
  preference: { label: 'Preference', plural: 'Preferences', text: 'text-teal-600', tile: 'bg-teal-50 text-teal-600 ring-teal-100', dot: 'bg-teal-500', chip: 'bg-teal-600 text-white ring-teal-600' },
  warning: { label: 'Warning', plural: 'Warnings', text: 'text-rose-600', tile: 'bg-rose-50 text-rose-600 ring-rose-100', dot: 'bg-rose-500', chip: 'bg-rose-600 text-white ring-rose-600' },
}

export const CATEGORY_ICON: Record<Category, LucideIcon> = {
  decision: Zap,
  lesson: Lightbulb,
  person: User,
  sponsor: Handshake,
  event: CalendarDays,
  preference: ThumbsUp,
  warning: TriangleAlert,
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
