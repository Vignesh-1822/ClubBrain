export default function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex justify-center py-2">
      <span className="rounded-full bg-panel-3 px-3 py-1 text-[11.5px] font-medium text-white/90">{label}</span>
    </div>
  )
}
