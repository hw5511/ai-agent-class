// Inline markup for phone message text: **bold** and `code chip`, nothing else (matches the plain
// assistant paragraphs seen in the captures — no headings, no links).
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter((p) => p !== "")
  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} className="font-semibold text-[#1a1a1a]">{p.slice(2, -2)}</strong>
        if (p.startsWith("`") && p.endsWith("`"))
          return (
            <code key={i} className="rounded bg-[#f0efed] px-[3px] py-px font-mono text-[10px] text-[#b3492b]">
              {p.slice(1, -1)}
            </code>
          )
        return <span key={i}>{p}</span>
      })}
    </span>
  )
}
