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
  /** Show a styled hover tooltip below the button instead of the native title. */
  tooltip?: boolean
}

export default function IconCircleButton({
  icon: Icon,
  label,
  active = false,
  size = 'lg',
  tone = 'raised',
  tooltip = false,
  iconClassName = '',
  className = '',
  ...rest
}: Props) {
  const box = size === 'lg' ? 'h-10 w-10' : 'h-9 w-9'
  const idle = tone === 'flat' ? 'bg-panel text-white/90 hover:bg-panel-2' : 'bg-panel-2 text-white/90 hover:bg-panel-3'
  const look = active ? 'bg-lemon text-black hover:brightness-105' : idle
  return (
    <button
      aria-label={label}
      title={tooltip ? undefined : label}
      className={`group/icb relative flex shrink-0 items-center justify-center rounded-full transition active:scale-95 disabled:opacity-60 ${box} ${look} ${className}`}
      {...rest}
    >
      <Icon size={size === 'lg' ? 17 : 16} strokeWidth={1.9} className={iconClassName} />
      {tooltip && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-40 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-panel-3 px-2.5 py-1 text-[11.5px] font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition group-hover/icb:opacity-100"
        >
          {label}
        </span>
      )}
    </button>
  )
}
