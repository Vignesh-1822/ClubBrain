import { useState } from 'react'
import ChatView from '../components/organisms/ChatView'
import CommunityRail from '../components/organisms/CommunityRail'
import ConversationList from '../components/organisms/ConversationList'
import MemoryBrowser from '../components/organisms/MemoryBrowser'
import RightPanel from '../components/organisms/RightPanel'
import TopBar from '../components/organisms/TopBar'
import type { Tab } from '../types'

export default function Home() {
  const [tab, setTab] = useState<Tab>('chat')
  const [persona, setPersona] = useState('Vignesh')
  const [memoryQuery, setMemoryQuery] = useState('')

  const handlePersona = (name: string) => {
    setPersona(name)
    setTab('chat')
  }
  const handleQuery = (q: string) => {
    setMemoryQuery(q)
    if (q) setTab('memory')
  }

  return (
    <div className="flex h-screen gap-4 overflow-hidden bg-black p-4 font-sans text-white">
      <CommunityRail onHome={() => setTab('chat')} />
      <ConversationList tab={tab} onTab={setTab} />
      <main className="flex min-w-0 flex-1 flex-col">
        <TopBar
          title={tab === 'chat' ? 'UW AI Club' : 'Club Memory'}
          persona={persona}
          query={memoryQuery}
          onQuery={handleQuery}
        />
        {tab === 'chat' ? <ChatView persona={persona} /> : <MemoryBrowser query={memoryQuery} onQuery={setMemoryQuery} />}
      </main>
      <RightPanel persona={persona} onPersona={handlePersona} onOpenMemory={() => setTab('memory')} />
    </div>
  )
}
