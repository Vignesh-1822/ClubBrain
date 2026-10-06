import { Check } from 'lucide-react'
import { PERSONAS } from '../../../lib/persona'
import Avatar from '../../atoms/Avatar'

interface Props {
  persona: string
  onChange: (name: string) => void
}

export default function PersonaSwitcher({ persona, onChange }: Props) {
  return (
    <div>
      <p className="px-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">Speaking as</p>
      <div className="mt-1.5 space-y-0.5">
        {PERSONAS.map((p) => {
          const active = p.name === persona
          return (
            <button
              key={p.name}
              onClick={() => onChange(p.name)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition ${
                active ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'hover:bg-slate-200/50'
              }`}
            >
              <Avatar name={p.name} size="sm" />
              <span className="min-w-0 flex-1">
                <span className={`block text-[13px] leading-tight ${active ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>{p.name}</span>
                <span className="block text-[11px] leading-tight text-slate-400">{p.role}</span>
              </span>
              {active && <Check size={14} className="text-imessage" strokeWidth={2.6} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
