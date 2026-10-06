import { Brain, Gamepad2, Hash, Mail, MessageCircle, type LucideIcon } from 'lucide-react'
import type { ConnectedSource } from '../../../types'

const SOURCES: (ConnectedSource & { icon: LucideIcon })[] = [
  { name: 'ClubBrain chat', connected: true, tile: 'bg-lemon text-black', icon: Brain },
  { name: 'WhatsApp', connected: false, tile: 'bg-emerald-400/10 text-emerald-300', icon: MessageCircle },
  { name: 'Discord', connected: false, tile: 'bg-indigo-400/10 text-indigo-300', icon: Gamepad2 },
  { name: 'Slack', connected: false, tile: 'bg-fuchsia-400/10 text-fuchsia-300', icon: Hash },
  { name: 'Gmail', connected: false, tile: 'bg-rose-400/10 text-rose-300', icon: Mail },
]

export default function ConnectedSources({ isMem0 }: { isMem0: boolean }) {
  return (
    <div>
      <ul className="space-y-0.5">
        {SOURCES.map(({ name, connected, tile, icon: Icon }) => (
          <li key={name} className="flex items-center gap-2.5 py-[3px]">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full ${tile}`}>
              <Icon size={12} strokeWidth={2.1} />
            </span>
            <span className={`text-[12.5px] ${connected ? 'font-medium text-white' : 'text-white/70'}`}>{name}</span>
            {connected ? (
              <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-lemon">
                <span className="h-1.5 w-1.5 rounded-full bg-lemon shadow-[0_0_0_3px_rgba(238,242,155,0.15)]" />
                Connected
              </span>
            ) : (
              <span className="ml-auto rounded-full bg-panel-3 px-2 py-px text-[10px] text-muted">Coming soon</span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-2 flex items-center gap-2 border-t border-white/5 pt-2 text-[10.5px] text-muted">
        <span className={`h-1.5 w-1.5 rounded-full ${isMem0 ? 'bg-lemon' : 'bg-white/30'}`} />
        {isMem0 ? 'Powered by Mem0' : 'Local memory'}
      </p>
    </div>
  )
}
