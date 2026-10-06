import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  label: string
  active?: boolean
  size?: 'md' | 'lg'
  iconClassName?: string
  /** flat = sits on the black page, raised = sits on a panel */
  tone?: 'raised' | 'flat'
}

export default function IconCircleButton({ icon: Icon, label, active = false, size = 'lg', tone = 'raised', iconClassName = '', className = '', ...rest }: Props) {
  const box = size === 'lg' ? 'h-14 w-14' : 'h-11 w-11'
  const idle = tone === 'flat' ? 'bg-panel text-white/90 hover:bg-panel-2' : 'bg-panel-2 text-white/90 hover:bg-panel-3'
  const look = active ? 'bg-lemon text-black hover:brightness-105' : idle
  return (
    <button
      aria-label={label}
      title={label}
      className={`flex shrink-0 items-center justify-center rounded-full transition active:scale-95 disabled:opacity-60 ${box} ${look} ${className}`}
      {...rest}
    >
      <Icon size={size === 'lg' ? 22 : 19} strokeWidth={1.9} className={iconClassName} />
    </button>
  )
}
