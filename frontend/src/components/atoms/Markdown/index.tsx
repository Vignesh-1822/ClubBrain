import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const heading = 'mb-1 mt-3 text-[13.5px] font-semibold text-white first:mt-0'

const COMPONENTS: Components = {
  p: ({ children }) => <p className="my-1.5 first:mt-0 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic text-white/90">{children}</em>,
  h1: ({ children }) => <h3 className={heading}>{children}</h3>,
  h2: ({ children }) => <h3 className={heading}>{children}</h3>,
  h3: ({ children }) => <h4 className={heading}>{children}</h4>,
  h4: ({ children }) => <h4 className={heading}>{children}</h4>,
  ul: ({ children }) => <ul className="my-1.5 list-disc space-y-1 pl-5 marker:text-lemon/70">{children}</ul>,
  ol: ({ children }) => <ol className="my-1.5 list-decimal space-y-1 pl-5 marker:text-white/45">{children}</ol>,
  li: ({ children }) => <li className="pl-0.5">{children}</li>,
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-lemon underline decoration-lemon/40 underline-offset-2 hover:decoration-lemon">
      {children}
    </a>
  ),
  blockquote: ({ children }) => <blockquote className="my-2 border-l-2 border-lemon/50 pl-3 text-white/70">{children}</blockquote>,
  hr: () => <hr className="my-3 border-white/10" />,
  code: ({ children }) => <code className="rounded-md bg-panel-3 px-1 py-px font-mono text-[12px] text-white/90">{children}</code>,
  pre: ({ children }) => <pre className="my-2 overflow-x-auto rounded-xl bg-panel-3 p-3 text-[12px] [&_code]:bg-transparent [&_code]:p-0">{children}</pre>,
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full border-collapse text-left text-[12.5px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-panel-2 text-white">{children}</thead>,
  th: ({ children }) => <th className="whitespace-nowrap border-b border-white/10 px-3 py-1.5 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-t border-white/5 px-3 py-1.5 align-top text-white/80">{children}</td>,
}

/** Renders ClubBrain answers (GFM Markdown) at the chat type scale. */
export default function Markdown({ content }: { content: string }) {
  return (
    <div className="text-[13.5px] leading-relaxed text-white/85">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={COMPONENTS}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
