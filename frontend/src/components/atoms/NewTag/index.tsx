export default function NewTag({ label = 'New' }: { label?: string }) {
  return (
    <span className="rounded-full bg-lemon px-1.5 py-px text-[9.5px] font-bold uppercase tracking-wide text-black">{label}</span>
  )
}
