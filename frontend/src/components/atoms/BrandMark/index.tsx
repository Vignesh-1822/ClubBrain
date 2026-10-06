import { Brain } from 'lucide-react'
import { BRAIN_GRADIENT } from '../../../lib/persona'

export default function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-[10px] text-white shadow-md shadow-violet-500/25 ring-1 ring-white/20 ${BRAIN_GRADIENT}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Brain size={Math.round(size * 0.55)} strokeWidth={2.2} />
      <span className="absolute inset-0 rounded-[10px] bg-gradient-to-b from-white/25 to-transparent" />
    </div>
  )
}
