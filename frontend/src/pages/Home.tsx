import { useState } from 'react'
import Sidebar, { type Tab } from '../components/organisms/Sidebar'
import ChatView from '../components/organisms/ChatView'
import MemoryBrowser from '../components/organisms/MemoryBrowser'

export default function Home() {
  const [tab, setTab] = useState<Tab>('chat')
  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Sidebar tab={tab} onTab={setTab} />
      <main className="min-w-0 flex-1">{tab === 'chat' ? <ChatView /> : <MemoryBrowser />}</main>
    </div>
  )
}
