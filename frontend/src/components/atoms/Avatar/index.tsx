import { Brain } from 'lucide-react'
import { BOT_NAME, BRAIN_BG, avatarGradient } from '../../../lib/persona'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE_CLASSES: Record<Size, { box: string; text: string; icon: number; dot: string }> = {
  xs: { box: 'h-5 w-5', text: 'text-[9px]', icon: 11, dot: 'h-1.5 w-1.5' },
  sm: { box: 'h-7 w-7', text: 'text-[11px]', icon: 14, dot: 'h-2 w-2' },
  md: { box: 'h-8 w-8', text: 'text-[12px]', icon: 15, dot: 'h-2 w-2' },
  lg: { box: 'h-9 w-9', text: 'text-[13px]', icon: 17, dot: 'h-2.5 w-2.5' },
  xl: { box: 'h-10 w-10', text: 'text-[14px]', icon: 19, dot: 'h-2.5 w-2.5' },
}

interface Props {
  name: string
  size?: Size
  online?: boolean
  className?: string
}

export default function Avatar({ name, size = 'md', online = false, className = '' }: Props) {
  const s = SIZE_CLASSES[size]
  const isBot = name === BOT_NAME
  const look = isBot ? BRAIN_BG : `bg-gradient-to-br text-white ${avatarGradient(name)}`
  return (
    <span className={`relative inline-flex shrink-0 ${className}`} aria-hidden>
      <span className={`flex select-none items-center justify-center rounded-full font-semibold ${s.box} ${s.text} ${look}`}>
        {isBot ? <Brain size={s.icon} strokeWidth={2.2} /> : name.charAt(0).toUpperCase()}
      </span>
      {online && (
        <span className={`absolute bottom-0 right-0 rounded-full bg-lemon ring-2 ring-panel ${s.dot}`} />
      )}
    </span>
  )
}
