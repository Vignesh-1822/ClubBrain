import { Brain } from 'lucide-react'
import { BOT_NAME, BRAIN_GRADIENT, avatarGradient } from '../../../lib/persona'

type Size = 'xs' | 'sm' | 'md' | 'lg'

const SIZE_CLASSES: Record<Size, { box: string; text: string; icon: number }> = {
  xs: { box: 'h-5 w-5', text: 'text-[9px]', icon: 11 },
  sm: { box: 'h-7 w-7', text: 'text-[11px]', icon: 14 },
  md: { box: 'h-8 w-8', text: 'text-xs', icon: 16 },
  lg: { box: 'h-10 w-10', text: 'text-sm', icon: 20 },
}

interface Props {
  name: string
  size?: Size
  className?: string
}

export default function Avatar({ name, size = 'md', className = '' }: Props) {
  const s = SIZE_CLASSES[size]
  const isBot = name === BOT_NAME
  const gradient = isBot ? BRAIN_GRADIENT : `bg-gradient-to-br ${avatarGradient(name)}`
  return (
    <div
      className={`flex shrink-0 select-none items-center justify-center rounded-full font-semibold text-white shadow-sm ring-1 ring-black/5 ${s.box} ${s.text} ${gradient} ${className}`}
      aria-hidden
    >
      {isBot ? <Brain size={s.icon} strokeWidth={2.2} /> : name.charAt(0).toUpperCase()}
    </div>
  )
}
