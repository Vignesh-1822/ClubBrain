import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

export default function SystemLine({ children, time }: { children: ReactNode; time: string }) {
  return (
    <div className="flex items-center gap-4 py-2 text-[15px] text-white/80">
      <ArrowRight size={20} className="w-10 shrink-0 text-white/80" strokeWidth={1.8} />
      <p className="min-w-0 flex-1">{children}</p>
      <span className="text-[13px] text-muted">{time}</span>
    </div>
  )
}
