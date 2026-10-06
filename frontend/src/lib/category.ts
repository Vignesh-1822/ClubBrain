import type { Category } from '../types'

export const CATEGORY_META: Record<Category, { icon: string; label: string; classes: string }> = {
  decision: { icon: '⚡', label: 'Decision', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
  lesson: { icon: '💡', label: 'Lesson', classes: 'bg-amber-50 text-amber-700 border-amber-200' },
  person: { icon: '👤', label: 'Person', classes: 'bg-purple-50 text-purple-700 border-purple-200' },
  sponsor: { icon: '🤝', label: 'Sponsor', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  event: { icon: '📅', label: 'Event', classes: 'bg-sky-50 text-sky-700 border-sky-200' },
  preference: { icon: '🟢', label: 'Preference', classes: 'bg-green-50 text-green-700 border-green-200' },
  warning: { icon: '⚠', label: 'Warning', classes: 'bg-red-50 text-red-700 border-red-200' },
}

export const formatTime = (iso: string): string => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export const formatDate = (iso: string): string => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
}
