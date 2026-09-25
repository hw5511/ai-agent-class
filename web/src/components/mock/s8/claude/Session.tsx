// The session transcript: user bubbles (right, light-grey pill) and assistant answers (left, plain text),
// built from typed blocks (notice / ran / paragraph / heading / code / lists / the trailing asterisk).
import { ChevronRightIcon, CopyIcon, RotateCcwIcon, Volume2Icon } from "lucide-react"
import type { ClaudeBlock, ClaudeMessage } from "@/content/schema-claude"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { Asterisk, inline } from "./util"

function CodeBlock({ b }: { b: Extract<ClaudeBlock, { t: "code" }> }) {
  return (
    <div className="relative my-2 rounded-xl border border-neutral-200 bg-[#f7f5ef] px-4 py-3 font-mono text-[17px] leading-relaxed text-[#2a2a28]">
      <CopyIcon className="absolute top-3 right-3 size-4 text-neutral-400" />
      {b.badge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={b.badge} size="sm" /></span> : null}
      {b.lines.map((line, i) => {
        const [code, note] = line.split("←") // "<-" comment convention, e.g. "CLAUDE.md   <- role and rules"
        return (
          <div key={i} className="whitespace-pre">
            {code}
            {note !== undefined ? <span className="text-neutral-400">{"←"}{note}</span> : null}
          </div>
        )
      })}
    </div>
  )
}

function Block({ b }: { b: ClaudeBlock }) {
  if (b.t === "notice")
    return (
      <div className="my-2">
        <div className="font-body text-[20px] font-semibold text-[#1a1a19]">{b.headline}</div>
        <div className="font-body text-[19px] leading-relaxed text-neutral-500">{b.body}</div>
        {b.link ? <div className="font-body text-[19px] text-[#3a6cc9] underline">{b.link}</div> : null}
      </div>
    )
  if (b.t === "ran")
    return (
      <div className="my-2 flex items-center font-body text-[18px] text-neutral-400">
        {/* badge anchors to this label+chevron pill itself (not the full-width row), so it never sits off
            the row's right end or gets clipped by the transcript's overflow-hidden box */}
        <span className="relative inline-flex items-center gap-1">
          {b.label}
          <ChevronRightIcon className="size-4" />
          {b.badge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={b.badge} size="sm" /></span> : null}
        </span>
      </div>
    )
  if (b.t === "p") return <div className="my-2 font-body text-[20px] leading-relaxed text-[#2a2a28]">{inline(b.text)}</div>
  if (b.t === "h") return <div className="mt-4 mb-1 font-display text-[22px] font-bold text-[#1a1a19]">{b.text}</div>
  if (b.t === "code") return <CodeBlock b={b} />
  if (b.t === "ul")
    return (
      <ul className="my-2 list-disc space-y-1 pl-6 font-body text-[20px] leading-relaxed text-[#2a2a28]">
        {b.items.map((it, i) => <li key={i}>{inline(it)}</li>)}
      </ul>
    )
  if (b.t === "ol")
    return (
      <ol className="my-2 list-decimal space-y-1 pl-6 font-body text-[20px] leading-relaxed text-[#2a2a28]">
        {b.items.map((it, i) => <li key={i}>{inline(it)}</li>)}
      </ol>
    )
  return <div className="my-3"><Asterisk size={26} /></div> // "asterisk"
}

export function Message({ m }: { m: ClaudeMessage }) {
  if (m.role === "user")
    return (
      <div className="flex justify-end">
        <div className="relative max-w-[70%] rounded-2xl bg-[#efece4] px-4 py-2.5 font-body text-[20px] text-[#1a1a19]">
          {m.text}
          {m.badge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={m.badge} size="sm" /></span> : null}
        </div>
      </div>
    )
  return (
    <div className="relative">
      {/* the answer's own badge anchors to its top-right corner (not the left edge — the transcript column's
          overflow-hidden clips anything that pokes out past its left boundary) */}
      {m.badge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={m.badge} size="sm" /></span> : null}
      {(m.blocks ?? []).map((b, i) => <Block key={i} b={b} />)}
      {m.meta ? (
        <div className="mt-2 flex items-center gap-4 text-neutral-400">
          <span className="relative inline-flex items-center gap-4">
            <CopyIcon className="size-4" />
            <RotateCcwIcon className="size-4" />
            <Volume2Icon className="size-4" />
            {m.meta.time ? <span className="font-body text-[15px]">{m.meta.time}</span> : null}
            {m.meta.badge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={m.meta.badge} size="sm" /></span> : null}
          </span>
        </div>
      ) : null}
    </div>
  )
}
