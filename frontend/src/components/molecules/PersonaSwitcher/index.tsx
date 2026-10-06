import { BOT_NAME, PERSONAS } from '../../../lib/persona'
import AiTag from '../../atoms/AiTag'
import Avatar from '../../atoms/Avatar'
import NewTag from '../../atoms/NewTag'

interface Props {
  persona: string
  onChange: (name: string) => void
}

/** "Members" list that doubles as the speaking-as switcher. */
export default function PersonaSwitcher({ persona, onChange }: Props) {
  return (
    <ul className="space-y-px">
      {PERSONAS.map((p) => {
        const active = p.name === persona
        return (
          <li key={p.name}>
            <button
              onClick={() => onChange(p.name)}
              title={`Speak as ${p.name}`}
              className={`flex w-full items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition ${active ? 'bg-panel-2' : 'hover:bg-panel-2/60'}`}
            >
              <Avatar
                name={p.name}
                size="sm"
                online
                className={`rounded-full ${active ? 'ring-2 ring-lemon ring-offset-2 ring-offset-panel' : ''}`}
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 truncate text-[13px] text-white">
                  {p.name}
                  {p.isNew && <NewTag />}
                  {active && <span className="text-[11px] font-semibold text-lemon">You</span>}
                </span>
                <span className="block truncate text-[11px] text-muted">
                  {p.role}
                  {p.isNew && ' · joined today'}
                </span>
              </span>
              {p.isAdmin && <span className="text-[11.5px] text-white/70">Admin</span>}
            </button>
          </li>
        )
      })}
      <li className="flex items-center gap-2.5 px-2 py-1.5">
        <Avatar name={BOT_NAME} size="sm" online />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-[13px] text-white">{BOT_NAME} <AiTag /></span>
          <span className="block text-[11px] text-muted">Club memory</span>
        </span>
      </li>
    </ul>
  )
}
