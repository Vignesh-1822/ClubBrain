import { Brain } from 'lucide-react'
import { useHealth, useMessages } from '../../../hooks'
import type { Category, ConversationPreview, Tab } from '../../../types'
import ConnectedSources from '../../molecules/ConnectedSources'
import ConversationCard from '../../molecules/ConversationCard'
import ClubResourcesPanel from '../ClubResourcesPanel'

const PREVIEW_CHATS: ConversationPreview[] = [
  { id: 'sponsorship', name: 'Sponsorship', initials: 'SP', preview: 'Alex: Google said maybe for spring…' },
  { id: 'events', name: 'Events team', initials: 'EV', preview: 'Sarah: Venue shortlist is up' },
  { id: 'exec', name: 'Exec board', initials: 'EX', preview: 'Maya: Budget review Thursday' },
]

/** Strips Markdown markers so previews read as plain text. */
const plain = (text: string): string => text.replace(/[#*_`>|]/g, '').replace(/\s+/g, ' ').trim()

interface Props {
  tab: Tab
  onTab: (tab: Tab) => void
  onOpenResource: (category: Category) => void
}

export default function ConversationList({ tab, onTab, onOpenResource }: Props) {
  const { data: messages = [] } = useMessages()
  const { data: health } = useHealth()
  const last = messages[messages.length - 1]
  const generalPreview = last ? `${last.sender}: ${plain(last.content)}` : 'ClubBrain is listening…'
  return (
    <aside className="hidden w-[236px] shrink-0 flex-col gap-2 overflow-y-auto lg:flex">
      <ConversationCard
        title="Club Memory"
        preview="Club resources"
        icon={Brain}
        active={tab === 'memory'}
        onClick={() => onTab('memory')}
      />
      <ClubResourcesPanel onOpen={onOpenResource} />
      <p className="px-3 pt-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">Conversations</p>
      <ConversationCard
        title="UW AI Club · General"
        preview={generalPreview}
        initials="AI"
        online
        active={tab === 'chat'}
        onClick={() => onTab('chat')}
      />
      {PREVIEW_CHATS.map((c) => (
        <ConversationCard key={c.id} title={c.name} preview={c.preview} initials={c.initials} />
      ))}
      <section className="mt-auto rounded-[20px] bg-panel p-4">
        <h2 className="mb-1.5 text-[14px] font-bold text-white">Connected sources</h2>
        <ConnectedSources isMem0={health?.memory_backend === 'mem0'} />
      </section>
    </aside>
  )
}
