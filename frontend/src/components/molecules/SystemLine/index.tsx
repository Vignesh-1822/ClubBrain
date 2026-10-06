import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

export default function SystemLine({ children, time }: { children: ReactNode; time: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5 text-[13px] text-white/75">
      <ArrowRight size={15} className="w-8 shrink-0 text-white/80" strokeWidth={1.8} />
      <p className="min-w-0 flex-1">{children}</p>
      <span className="text-[11.5px] text-muted">{time}</span>
    </div>
  )
}
