import { useState } from 'react'
import Sidebar, { type Tab } from '../components/organisms/Sidebar'
import ChatView from '../components/organisms/ChatView'
import MemoryBrowser from '../components/organisms/MemoryBrowser'
import type { DetectedStatus } from '../types'

export default function Home() {
  const [tab, setTab] = useState<Tab>('chat')
  const [persona, setPersona] = useState('Vignesh')
  // Lives here so Save/Dismiss state survives switching between Chat and Memory tabs.
  const [detectedStatuses, setDetectedStatuses] = useState<Record<string, DetectedStatus>>({})
  const handleDetectedStatus = (id: string, status: DetectedStatus) =>
    setDetectedStatuses((prev) => ({ ...prev, [id]: status }))
  const handlePersona = (name: string) => {
    setPersona(name)
    setTab('chat')
  }
  return (
    <div className="flex h-screen bg-[#f7f7f8] font-sans text-slate-900">
      <Sidebar tab={tab} onTab={setTab} persona={persona} onPersona={handlePersona} />
      <main className="min-w-0 flex-1">
        {tab === 'chat' ? (
          <ChatView persona={persona} detectedStatuses={detectedStatuses} onDetectedStatusChange={handleDetectedStatus} />
        ) : (
          <MemoryBrowser />
        )}
      </main>
    </div>
  )
}
