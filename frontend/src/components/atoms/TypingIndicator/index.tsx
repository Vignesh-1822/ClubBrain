export default function TypingIndicator() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2xl border border-violet-200 bg-white px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span key={i} className="dot h-2 w-2 rounded-full bg-violet-400" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  )
}
