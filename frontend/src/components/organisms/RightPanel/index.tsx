import { Phone, Pin, Users, Video } from 'lucide-react'
import IconCircleButton from '../../atoms/IconCircleButton'
import PersonaSwitcher from '../../molecules/PersonaSwitcher'
import LiveMemoryPanel from '../LiveMemoryPanel'

interface Props {
  persona: string
  onPersona: (name: string) => void
  onOpenMemory: () => void
}

export default function RightPanel({ persona, onPersona, onOpenMemory }: Props) {
  return (
    <aside className="hidden w-[320px] shrink-0 flex-col gap-4 overflow-y-auto xl:flex">
      <div className="flex items-center justify-between rounded-[28px] bg-panel px-5 py-4">
        <IconCircleButton icon={Phone} label="Start call" active />
        <IconCircleButton icon={Video} label="Video" />
        <IconCircleButton icon={Pin} label="Pinned" />
        <IconCircleButton icon={Users} label="Members" />
      </div>
      <section className="rounded-[28px] bg-panel p-5">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-[22px] font-bold text-white">Members</h2>
          <span className="text-[12px] text-muted">Tap to speak as</span>
        </div>
        <PersonaSwitcher persona={persona} onChange={onPersona} />
      </section>
      <LiveMemoryPanel onOpen={onOpenMemory} />
    </aside>
  )
}
