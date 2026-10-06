import { Brain } from 'lucide-react'

export default function BrandMark({ size = 56 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-lemon text-black shadow-[0_0_0_6px_rgba(238,242,155,0.08)]"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Brain size={Math.round(size * 0.5)} strokeWidth={2.3} />
    </div>
  )
}
