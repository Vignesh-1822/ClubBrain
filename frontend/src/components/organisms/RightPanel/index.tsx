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
    <aside className="hidden w-[272px] shrink-0 flex-col gap-3 overflow-y-auto xl:flex">
      <div className="flex items-center justify-between rounded-[20px] bg-panel px-4 py-3">
        <IconCircleButton icon={Phone} label="Start call" active />
        <IconCircleButton icon={Video} label="Video" />
        <IconCircleButton icon={Pin} label="Pinned" />
        <IconCircleButton icon={Users} label="Members" />
      </div>
      <section className="rounded-[20px] bg-panel p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-[15px] font-bold text-white">Members</h2>
          <span className="text-[11px] text-muted">Tap to speak as</span>
        </div>
        <PersonaSwitcher persona={persona} onChange={onPersona} />
      </section>
      <LiveMemoryPanel onOpen={onOpenMemory} />
    </aside>
  )
}
