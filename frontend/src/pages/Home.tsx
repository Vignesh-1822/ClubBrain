import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import ChatView from '../components/organisms/ChatView'
import CommunityRail from '../components/organisms/CommunityRail'
import ConversationList from '../components/organisms/ConversationList'
import MemoryBrowser from '../components/organisms/MemoryBrowser'
import RightPanel from '../components/organisms/RightPanel'
import TopBar from '../components/organisms/TopBar'
import WelcomeModal from '../components/molecules/WelcomeModal'
import { useResetChat, useWelcome } from '../hooks'
import { DEFAULT_PERSONA, NEW_MEMBER } from '../lib/persona'
import type { Category, JoinEvent, MemoryFilter, Message, Tab } from '../types'

const nowLabel = (): string => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

export default function Home() {
  const qc = useQueryClient()
  const welcome = useWelcome()
  const reset = useResetChat()
  const [tab, setTab] = useState<Tab>('chat')
  const [persona, setPersona] = useState(DEFAULT_PERSONA)
  const [memoryQuery, setMemoryQuery] = useState('')
  const [memoryFilter, setMemoryFilter] = useState<MemoryFilter>('all')
  const [joinEvent, setJoinEvent] = useState<JoinEvent | null>(null)
  const [welcomeOpen, setWelcomeOpen] = useState(false)
  /** Bumped on reset to remount the chat and drop its local state (draft, trace). */
  const [chatKey, setChatKey] = useState(0)

  const handleJoin = () => {
    setWelcomeOpen(false)
    setPersona(NEW_MEMBER.name)
    setTab('chat')
    const messages = qc.getQueryData<Message[]>(['messages']) ?? []
    setJoinEvent({ name: NEW_MEMBER.name, afterMessageId: messages[messages.length - 1]?.id ?? null, time: nowLabel() })
    welcome.mutate({ member: NEW_MEMBER.name, role: NEW_MEMBER.role })
  }

  const handlePersona = (name: string) => {
    if (name === NEW_MEMBER.name && !joinEvent) {
      setWelcomeOpen(true)
      return
    }
    setPersona(name)
    setTab('chat')
  }
  const handleQuery = (q: string) => {
    setMemoryQuery(q)
    if (q) setTab('memory')
  }
  const handleOpenResource = (category: Category) => {
    setMemoryFilter(category)
    setTab('memory')
  }
  const handleReset = () => {
    reset.mutate(undefined, {
      onSettled: () => {
        welcome.reset()
        setPersona(DEFAULT_PERSONA)
        setJoinEvent(null)
        setWelcomeOpen(false)
        setMemoryQuery('')
        setMemoryFilter('all')
        setTab('chat')
        setChatKey((k) => k + 1)
      },
    })
  }

  return (
    <div className="flex h-screen gap-3 overflow-hidden bg-black p-3 font-sans text-white">
      <CommunityRail onHome={() => setTab('chat')} />
      <ConversationList tab={tab} onTab={setTab} onOpenResource={handleOpenResource} />
      <main className="flex min-w-0 flex-1 flex-col">
        <TopBar
          title={tab === 'chat' ? 'UW AI Club' : 'Club Memory'}
          persona={persona}
          query={memoryQuery}
          onQuery={handleQuery}
          showJoin={!joinEvent}
          onJoin={() => setWelcomeOpen(true)}
          onReset={handleReset}
          resetting={reset.isPending}
        />
        {tab === 'chat' ? (
          <ChatView
            key={chatKey}
            persona={persona}
            joinEvent={joinEvent}
            welcomePending={welcome.isPending}
            welcomeFailed={welcome.isError}
          />
        ) : (
          <MemoryBrowser query={memoryQuery} onQuery={setMemoryQuery} filter={memoryFilter} onFilter={setMemoryFilter} />
        )}
      </main>
      <RightPanel persona={persona} onPersona={handlePersona} onOpenMemory={() => setTab('memory')} />
      {welcomeOpen && <WelcomeModal member={NEW_MEMBER} onContinue={handleJoin} onClose={() => setWelcomeOpen(false)} />}
    </div>
  )
}
