import type { OfficePptSlide } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

const ACCENT = "#c43e1c"

function Thumb({ n }: { n: OfficePptSlide }) {
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-1 overflow-hidden bg-white px-2 text-center">
      <span className="line-clamp-2 font-display text-[7px] font-bold text-[#1a1a1a] break-keep">{n.title}</span>
    </div>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-1 flex-col justify-center gap-3 px-4">
      {items.slice(0, 6).map((it, i) => (
        <li key={i} className="flex items-start gap-3 font-body text-[22px] leading-snug text-[#2b2b2b] break-keep">
          <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: ACCENT }} />
          <span className="min-w-0 truncate">{it}</span>
        </li>
      ))}
    </ul>
  )
}

function Cards({ items }: { items: string[] }) {
  return (
    <div className="flex flex-1 items-center justify-center gap-4 px-4">
      {items.slice(0, 4).map((it, i) => (
        <div key={i} className="flex h-[70%] flex-1 flex-col items-center justify-center gap-2 rounded-lg border-2 border-[#1a1a1a] px-3 text-center">
          <span className="font-display text-[13px] font-bold" style={{ color: ACCENT }}>{i + 1}</span>
          <span className="truncate font-body text-[15px] font-semibold text-[#2b2b2b] break-keep">{it}</span>
        </div>
      ))}
    </div>
  )
}

function TableLayout({ items }: { items: string[] }) {
  const rows = items.map((r) => r.split("|"))
  return (
    <table className="mx-auto w-[85%] table-fixed border-collapse font-body text-[20px]">
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri}>
            {r.map((c, ci) => (
              <td
                key={ci}
                className={cn("truncate overflow-hidden border border-neutral-300 px-3 py-2 text-center", ri === 0 && "text-white font-bold")}
                style={ri === 0 ? { background: ACCENT } : undefined}
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

function Timeline({ items }: { items: string[] }) {
  return (
    <div className="relative flex flex-1 items-center px-8">
      <div className="absolute top-1/2 right-8 left-8 h-0.5 bg-neutral-300" />
      <div className="flex w-full justify-between">
        {items.slice(0, 6).map((it, i) => (
          <div key={i} className="flex w-[16%] flex-col items-center gap-2">
            <span className="size-3 shrink-0 rounded-full" style={{ background: ACCENT }} />
            <span className="line-clamp-2 text-center font-body text-[13px] text-[#2b2b2b] break-keep">{it}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Canvas({ s }: { s: OfficePptSlide }) {
  const layout = s.layout ?? "bullets"
  if (layout === "title" || layout === "closing")
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-10 text-center">
        <span className="font-display text-[42px] font-bold text-[#1a1a1a] break-keep">{s.title}</span>
        {s.sub && <span className="font-body text-[20px] text-neutral-500 break-keep">{s.sub}</span>}
        {layout === "closing" && <span className="mt-4 h-1 w-16" style={{ background: ACCENT }} />}
      </div>
    )
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 px-10 pt-8 pb-2">
        <span className="font-display text-[34px] font-bold text-[#1a1a1a] break-keep">{s.title}</span>
        <div className="mt-2 h-[3px] w-14" style={{ background: ACCENT }} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pb-6">
        {layout === "bullets" && <Bullets items={s.items ?? []} />}
        {layout === "cards" && <Cards items={s.items ?? []} />}
        {layout === "table" && <div className="flex flex-1 items-center"><TableLayout items={s.items ?? []} /></div>}
        {layout === "timeline" && <Timeline items={s.items ?? []} />}
      </div>
    </div>
  )
}

export function PptView({ slides, current }: { slides: OfficePptSlide[]; current: number }) {
  const cur = slides[Math.max(0, Math.min(slides.length, current) - 1)] ?? slides[0]
  return (
    <div className="flex min-h-0 flex-1 bg-[#f3f3f3]">
      <div className="flex w-[132px] shrink-0 flex-col gap-2 overflow-hidden border-r border-neutral-200 px-2 py-3">
        {slides.map((sl, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-4 shrink-0 text-right font-body text-[11px] text-neutral-400">{i + 1}</span>
            <div className={cn("relative min-w-0 flex-1 overflow-visible rounded-[2px]", i + 1 === current ? "outline outline-2" : "outline outline-1 outline-neutral-200")} style={i + 1 === current ? { outlineColor: ACCENT } : undefined}>
              {sl.badge ? <span className="absolute -top-2 -left-2 z-10"><NumberBadge n={sl.badge} size="sm" /></span> : null}
              <Thumb n={sl} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden bg-[#d9d9d9] px-6 py-6">
        <div className="flex aspect-video w-full max-h-full flex-col overflow-hidden bg-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]">
          <Canvas s={cur} />
        </div>
      </div>
    </div>
  )
}
