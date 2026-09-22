import type { OfficeWordPage } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

// Pages zoomed in so the text reads on a projector: each page fills the height and is cut at the bottom
// like a zoomed Word window; up to three sit side by side, never overflowing (clipped).

function Block({ b }: { b: OfficeWordPage["blocks"][number] }) {
  if (b.t === "title") return <div className="mb-1 font-display text-[44px] leading-tight font-bold text-[#1a1a1a] break-keep">{b.text}</div>
  if (b.t === "subtitle") return <div className="mb-4 font-body text-[22px] text-neutral-500 break-keep">{b.text}</div>
  if (b.t === "h1") return <div className="mt-3 mb-1 border-b border-neutral-300 pb-1.5 font-display text-[30px] font-bold text-[#1a1a1a] break-keep">{b.text}</div>
  if (b.t === "h2") return <div className="mt-2 mb-1 font-display text-[25px] font-bold text-[#1a1a1a] break-keep">{b.text}</div>
  if (b.t === "p") return <div className="mb-2 font-body text-[21px] leading-[1.6] text-[#3b3b3b] break-keep">{b.text}</div>
  if (b.t === "meta") return <div className="mb-1 font-body text-[18px] text-neutral-500">{b.text}</div>
  if (b.t === "rule") return <div className="my-2 h-px bg-neutral-300" />
  if (b.t === "space") return <div className="h-4" />
  if (b.t === "placeholder")
    return (
      <span className="mb-1 inline-block rounded bg-neutral-100 mr-1.5 px-2 py-0.5 font-body text-[20px] text-neutral-500">
        {b.text?.startsWith("[") ? b.text : `[${b.text}]`}
      </span>
    )
  if (b.t === "toc") {
    const [label, page] = (b.text ?? "").split("|")
    return (
      <div className="mb-2 flex items-baseline gap-1.5 font-body text-[21px] text-[#3b3b3b]">
        <span className="shrink-0 truncate">{label}</span>
        <span className="min-w-0 flex-1 overflow-hidden border-b border-dotted border-neutral-400 translate-y-[-2px]" />
        <span className="shrink-0">{page}</span>
      </div>
    )
  }
  if (b.t === "table" && b.rows) {
    return (
      <table className="mb-2 w-full table-fixed border-collapse font-body text-[19px]">
        <tbody>
          {b.rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td
                  key={ci}
                  className={cn(
                    "truncate overflow-hidden border border-neutral-300 px-2 py-1.5",
                    ri === 0 && "bg-black font-bold text-white",
                  )}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return null
}

function Page({ p }: { p: OfficeWordPage }) {
  return (
    <div
      className="relative flex h-full min-w-0 max-w-[640px] flex-1 flex-col overflow-hidden bg-white shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
    >
      {p.badge ? <span className="absolute top-3 right-3 z-10"><NumberBadge n={p.badge} /></span> : null}
      {p.header && (
        <div className="shrink-0 border-b border-neutral-200 px-8 pt-5 pb-2.5 font-body text-[17px] text-neutral-400">{p.header}</div>
      )}
      <div className="min-h-0 flex-1 overflow-hidden px-8 py-6">
        {p.blocks.map((b, i) => <Block key={i} b={b} />)}
      </div>
      {p.footer && (
        <div className="shrink-0 border-t border-neutral-200 px-8 pt-2.5 pb-5 text-center font-body text-[17px] text-neutral-400">{p.footer}</div>
      )}
    </div>
  )
}

export function WordView({ pages }: { pages: OfficeWordPage[] }) {
  return (
    <div className="flex min-h-0 flex-1 items-stretch justify-center gap-5 overflow-hidden bg-[#e8e8e8] px-6 py-5">
      {pages.slice(0, 3).map((p, i) => <Page key={i} p={p} />)}
    </div>
  )
}
