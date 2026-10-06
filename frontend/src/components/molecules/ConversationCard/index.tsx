import type { LucideIcon } from 'lucide-react'

interface Props {
  title: string
  preview: string
  initials?: string
  icon?: LucideIcon
  active?: boolean
  online?: boolean
  onClick?: () => void
}

export default function ConversationCard({ title, preview, initials, icon: Icon, active = false, online = false, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3.5 rounded-[22px] px-4 py-3 text-left transition ${
        active ? 'bg-panel-3' : 'bg-panel hover:bg-panel-2'
      }`}
    >
      <span className="relative shrink-0">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full text-[15px] font-semibold ${
            active ? 'bg-lemon text-black' : 'bg-panel-3 text-white/90'
          }`}
        >
          {Icon ? <Icon size={20} strokeWidth={2} /> : initials}
        </span>
        {online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-lemon ring-[2.5px] ring-panel" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-white">{title}</span>
        <span className="mt-0.5 block truncate text-[13px] text-white/60">{preview}</span>
      </span>
    </button>
  )
}
