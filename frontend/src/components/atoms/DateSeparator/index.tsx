export default function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex justify-center py-3">
      <span className="rounded-full bg-panel-3 px-4 py-1.5 text-[13px] font-medium text-white/90">{label}</span>
    </div>
  )
}
