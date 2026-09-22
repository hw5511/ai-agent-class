import type { OfficePptSlide } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

const ACCENT = "#c43e1c"
const PINK = "#f4b6c2"

/** A small five-petal cherry blossom (used a few times per branch). */
function Blossom({ cx, cy, r = 10 }: { cx: number; cy: number; r?: number }) {
  const petals = [0, 72, 144, 216, 288]
  return (
    <g>
      {petals.map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const px = cx + Math.cos(rad) * r
        const py = cy + Math.sin(rad) * r
        return <circle key={i} cx={px} cy={py} r={r * 0.82} fill={PINK} opacity={0.92} />
      })}
      <circle cx={cx} cy={cy} r={r * 0.5} fill="#fff" />
      <circle cx={cx} cy={cy} r={r * 0.22} fill={ACCENT} />
    </g>
  )
}

/** Stylised cherry-blossom branch: black ink strokes + soft-pink blossoms, cover decoration. */
function CherryBranch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden>
      <path d="M8 212 C68 160 92 128 132 68 C148 42 168 22 214 8" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M78 142 C98 122 108 106 120 90" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M112 96 C127 82 135 72 147 58" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <Blossom cx={132} cy={68} r={13} />
      <Blossom cx={98} cy={128} r={9} />
      <Blossom cx={150} cy={44} r={11} />
      <Blossom cx={178} cy={28} r={8} />
      <Blossom cx={62} cy={168} r={7} />
    </svg>
  )
}

function Bullets({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="flex flex-1 flex-col justify-center gap-5 px-16">
      {items.slice(0, 6).map((it, i) => (
        <li key={i} className="flex items-center gap-4 font-body text-[26px] leading-snug text-[#2b2b2b] break-keep">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 font-display text-[14px] font-bold"
            style={{ borderColor: accent, color: accent }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0 truncate">{it}</span>
        </li>
      ))}
    </ul>
  )
}

function Cards({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div className="flex flex-1 items-center justify-center gap-6 px-10">
      {items.slice(0, 4).map((it, i) => (
        <div
          key={i}
          className="flex h-[72%] flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-3 text-center"
        >
          <span
            className="flex size-14 shrink-0 items-center justify-center rounded-full font-display text-[20px] font-bold text-white"
            style={{ background: accent }}
          >
            {i + 1}
          </span>
          <span className="line-clamp-3 font-body text-[18px] font-semibold leading-snug text-[#2b2b2b] break-keep">{it}</span>
        </div>
      ))}
    </div>
  )
}

function TableLayout({ items, accent }: { items: string[]; accent: string }) {
  const rows = items.map((r) => r.split("|"))
  return (
    <table className="mx-auto w-[88%] table-fixed border-collapse overflow-hidden rounded-md font-body text-[22px]">
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri} style={ri > 0 && ri % 2 === 0 ? { background: "#f6f6f6" } : undefined}>
            {r.map((c, ci) => (
              <td
                key={ci}
                className={cn(
                  "truncate overflow-hidden px-4 py-3 text-center",
                  ri === 0 ? "font-bold text-white" : "border-b border-neutral-200 text-[#2b2b2b]",
                )}
                style={ri === 0 ? { background: accent } : undefined}
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

function Timeline({ items, accent }: { items: string[]; accent: string }) {
  const parsed = items.slice(0, 6).map((it) => {
    const m = it.match(/^(\S+)\s+(.*)$/)
    return m ? { date: m[1], label: m[2] } : { date: "", label: it }
  })
  return (
    <div className="relative flex flex-1 items-start px-14 pt-12">
      <div className="absolute top-[58px] right-14 left-14 h-0.5 bg-neutral-200" />
      <div className="flex w-full justify-between">
        {parsed.map((p, i) => (
          <div key={i} className="flex w-[22%] flex-col items-center gap-2 text-center">
            <span className="font-display text-[15px] font-bold" style={{ color: accent }}>
              {p.date}
            </span>
            <span className="size-3.5 shrink-0 rounded-full ring-4 ring-white" style={{ background: accent }} />
            <span className="line-clamp-2 font-body text-[15px] text-[#2b2b2b] break-keep">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** The slide's visual content, laid out on a fixed 960x540 logical canvas (scaled by SlideFrame). */
function SlideArt({ s }: { s: OfficePptSlide }) {
  const layout = s.layout ?? "bullets"
  const accent = s.accent ?? ACCENT

  if (layout === "title")
    return (
      <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-white px-20">
        <CherryBranch className="pointer-events-none absolute -top-16 -right-16 h-[300px] w-[300px] opacity-95" />
        <CherryBranch className="pointer-events-none absolute -bottom-20 -left-16 h-[220px] w-[220px] rotate-180 opacity-45" />
        <div className="relative z-10 flex flex-col gap-5">
          <span className="h-1 w-24 bg-[#1a1a1a]" />
          <span className="font-display text-[68px] leading-[1.1] font-bold text-[#1a1a1a] break-keep">{s.title}</span>
          {s.sub && <span className="font-body text-[28px] text-neutral-500 break-keep">{s.sub}</span>}
          {s.date && <span className="mt-8 font-body text-[17px] tracking-wide text-neutral-400 break-keep">{s.date}</span>}
        </div>
      </div>
    )

  if (layout === "closing")
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden bg-[#1a1a1a] px-10 text-center">
        <CherryBranch className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 opacity-25" />
        <CherryBranch className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rotate-180 opacity-15" />
        <span className="relative z-10 font-display text-[58px] font-bold text-white break-keep">{s.items?.[0] ?? s.title}</span>
        {s.sub && <span className="relative z-10 font-body text-[20px] text-neutral-300 break-keep">{s.sub}</span>}
        <span className="relative z-10 mt-2 h-1 w-20" style={{ background: accent }} />
      </div>
    )

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white">
      <div className="shrink-0 px-16 pt-14 pb-4">
        <span className="font-display text-[38px] font-bold text-[#1a1a1a] break-keep">{s.title}</span>
        <div className="mt-3 h-[3px] w-16" style={{ background: accent }} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pb-10">
        {layout === "bullets" && <Bullets items={s.items ?? []} accent={accent} />}
        {layout === "cards" && <Cards items={s.items ?? []} accent={accent} />}
        {layout === "table" && (
          <div className="flex flex-1 items-center">
            <TableLayout items={s.items ?? []} accent={accent} />
          </div>
        )}
        {layout === "timeline" && <Timeline items={s.items ?? []} accent={accent} />}
      </div>
    </div>
  )
}

/** Renders a slide's art on a fixed 960x540 logical canvas, scaled via SVG to fill its parent box
 *  at any size — used identically for the big canvas and the thumbnail rail, so thumbnails always
 *  show the real design instead of a blank/near-empty preview. */
function SlideFrame({ s }: { s: OfficePptSlide }) {
  return (
    <svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
      <foreignObject x={0} y={0} width={960} height={540}>
        <div style={{ width: 960, height: 540 }} className="overflow-hidden">
          <SlideArt s={s} />
        </div>
      </foreignObject>
    </svg>
  )
}

function Thumb({ n }: { n: OfficePptSlide }) {
  return (
    <div className="aspect-video w-full overflow-hidden bg-white">
      <SlideFrame s={n} />
    </div>
  )
}

function Canvas({ s }: { s: OfficePptSlide }) {
  return (
    <div className="h-full w-full min-h-0 flex-1 overflow-hidden">
      <SlideFrame s={s} />
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
            <div
              className={cn(
                "relative min-w-0 flex-1 overflow-visible rounded-[2px]",
                i + 1 === current ? "outline outline-2" : "outline outline-1 outline-neutral-200",
              )}
              style={i + 1 === current ? { outlineColor: ACCENT } : undefined}
            >
              {sl.badge ? (
                <span className="absolute -top-2 -left-2 z-10">
                  <NumberBadge n={sl.badge} size="sm" />
                </span>
              ) : null}
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
