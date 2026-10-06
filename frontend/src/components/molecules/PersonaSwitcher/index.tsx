import { BOT_NAME, PERSONAS } from '../../../lib/persona'
import Avatar from '../../atoms/Avatar'
import AiTag from '../../atoms/AiTag'

interface Props {
  persona: string
  onChange: (name: string) => void
}

/** "Members" list that doubles as the speaking-as switcher. */
export default function PersonaSwitcher({ persona, onChange }: Props) {
  return (
    <ul className="space-y-0.5">
      {PERSONAS.map((p) => {
        const active = p.name === persona
        return (
          <li key={p.name}>
            <button
              onClick={() => onChange(p.name)}
              title={`Speak as ${p.name}`}
              className={`flex w-full items-center gap-3.5 rounded-2xl px-2 py-1.5 text-left transition ${active ? 'bg-panel-2' : 'hover:bg-panel-2/60'}`}
            >
              <Avatar
                name={p.name}
                size="lg"
                online
                className={`rounded-full ${active ? 'ring-2 ring-lemon ring-offset-2 ring-offset-panel' : ''}`}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] text-white">
                  {p.name}
                  {active && <span className="ml-2 text-[12px] font-semibold text-lemon">You</span>}
                </span>
                <span className="block text-[12px] text-muted">{p.role}</span>
              </span>
              {p.isAdmin && <span className="text-[13px] text-white/80">Admin</span>}
            </button>
          </li>
        )
      })}
      <li className="flex items-center gap-3.5 px-2 py-1.5">
        <Avatar name={BOT_NAME} size="lg" online />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 text-[15px] text-white">{BOT_NAME} <AiTag /></span>
          <span className="block text-[12px] text-muted">Club memory</span>
        </span>
      </li>
    </ul>
  )
}
