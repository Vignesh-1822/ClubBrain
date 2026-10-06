interface Props {
  side: 'left' | 'right'
  colorClass: string
}

/** iMessage-style curved tail, anchored to the bottom corner of a bubble. */
export default function BubbleTail({ side, colorClass }: Props) {
  const position = side === 'right' ? '-right-[5px]' : '-left-[5px] -scale-x-100'
  return (
    <svg
      viewBox="0 0 16 20"
      className={`pointer-events-none absolute bottom-0 h-5 w-4 ${position} ${colorClass}`}
      aria-hidden
    >
      <path d="M0 0 H5 C5 9 8 15 15.5 19.6 C10 20.6 4.5 19.4 0 16 Z" fill="currentColor" />
    </svg>
  )
}
