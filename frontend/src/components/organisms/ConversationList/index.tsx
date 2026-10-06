import { Brain } from 'lucide-react'
import { useHealth, useMemories, useMessages } from '../../../hooks'
import type { ConversationPreview, Tab } from '../../../types'
import ConnectedSources from '../../molecules/ConnectedSources'
import ConversationCard from '../../molecules/ConversationCard'

const PREVIEW_CHATS: ConversationPreview[] = [
  { id: 'sponsorship', name: 'Sponsorship', initials: 'SP', preview: 'Alex: Google said maybe for spring…' },
  { id: 'events', name: 'Events team', initials: 'EV', preview: 'Sarah: Venue shortlist is up' },
  { id: 'exec', name: 'Exec board', initials: 'EX', preview: 'Maya: Budget review Thursday' },
]

interface Props {
  tab: Tab
  onTab: (tab: Tab) => void
}

export default function ConversationList({ tab, onTab }: Props) {
  const { data: messages = [] } = useMessages()
  const { data: memories = [] } = useMemories('', 'all')
  const { data: health } = useHealth()
  const last = messages[messages.length - 1]
  const generalPreview = last ? `${last.sender}: ${last.content}` : 'ClubBrain is listening…'
  return (
    <aside className="hidden w-[272px] shrink-0 flex-col gap-3 overflow-y-auto lg:flex">
      <ConversationCard
        title="Club Memory"
        preview={`${memories.length} memories · searchable forever`}
        icon={Brain}
        active={tab === 'memory'}
        onClick={() => onTab('memory')}
      />
      <p className="px-4 pt-2 text-[12px] font-medium uppercase tracking-wider text-muted">Conversations</p>
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
      <section className="mt-auto rounded-[28px] bg-panel p-5">
        <h2 className="mb-2 text-[20px] font-bold text-white">Connected sources</h2>
        <ConnectedSources isMem0={health?.memory_backend === 'mem0'} />
      </section>
    </aside>
  )
}
