// Slide templates. The slide area shows visuals only (CEO 2026-09-21): screens, tables, diagrams,
// illustrations and a keyword title. Explanations live in slide.notes and render in the right panel
// (NotesPanel), numbered to match the badges drawn on the visual. Everything is flex; no coordinates.
import type { StackSlide, CardsSlide, CompareSlide, FlowSlide, IllustrationSlide, ImageSlide, OverviewSlide, PartCoverSlide, ScreenSlide, Slide, TableSlide } from "@/content/schema"
import { NumberBadge } from "./NumberBadge"
import { Mark } from "./Mark"
import { ScreenView } from "./ScreenView"
import { LifecycleDiagram } from "./LifecycleDiagram"
import { asset, cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function SlideBody({ slide }: { slide: Slide }) {
  switch (slide.template) {
    case "image":
      return <ImageT s={slide} />
    case "screen":
      return <ScreenT s={slide} />
    case "compare":
      return <CompareT s={slide} />
    case "table":
      return <TableT s={slide} />
    case "illustration":
      return <IllustrationT s={slide} />
    case "overview":
      return <OverviewT s={slide} />
    case "part-cover":
      return <PartCoverT s={slide} />
    case "cards":
      return <CardsT s={slide} />
    case "flow":
      return <FlowT s={slide} />
    case "stack":
      return <StackT s={slide} />
    case "lifecycle":
      return <LifecycleDiagram s={slide} />
  }
}

function ImageT({ s }: { s: ImageSlide }) {
  return <img src={asset(s.src)} alt={s.title} className="size-full object-contain" />
}

function ScreenT({ s }: { s: ScreenSlide }) {
  return <div className="h-full min-h-0"><ScreenView screen={s.screen} /></div>
}

function CompareT({ s }: { s: CompareSlide }) {
  return (
    <div className="flex h-full min-h-0 gap-12">
      {[s.left, s.right].map((side, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col gap-5" style={s.ratio ? { flexGrow: s.ratio[i] } : undefined}>
          <div className="flex items-center gap-4">
            {s.notes?.length ? <NumberBadge n={i + 1} /> : null}
            <span className="font-display text-[32px] font-bold text-[#101113]">{side.label}</span>
          </div>
          <div className="min-h-0 flex-1"><ScreenView screen={side.screen} /></div>
        </div>
      ))}
    </div>
  )
}

// Restrained editorial table: left-aligned throughout, muted header over a 2px ink rule, hairline rows,
// a highlighted row marked by a thin accent bar instead of an outline. Row height and type size step
// down as rows grow so a long table (a /config list) still fits the body; 9+ rows keep the old compact
// sizing (min 20px) since a fixed row height would no longer read as generous. Anchored to the body's
// bottom edge (DESIGN.md principle 3), not vertically centred.
const isPositiveCell = (v: string) => ["가능", "접근 가능", "있음", "O", "예"].includes(v.trim())
const isNegativeCell = (v: string) => ["불가", "접근 불가", "없음", "안 됨", "X", "아니오"].includes(v.trim())
// A command / file name: one ASCII token, no spaces, that starts with "/" or "-" or contains "." or "_".
const isTermCell = (v: string) => {
  const s = v.trim()
  if (!s || /\s/.test(s) || !/^[\x00-\x7F]+$/.test(s)) return false
  return s.startsWith("/") || s.startsWith("-") || s.includes(".") || s.includes("_")
}

// Concept templates share one vertical composition (DESIGN.md principle 3): the block sits in the lower
// part of the body on an optical line, free space split 3:1 above/below, with a bottom margin at least
// the side margin so it never "falls to the floor".
function Lower({ children, tight }: { children: ReactNode; tight?: boolean }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="min-h-0 flex-[3]" />
      <div className="shrink-0">{children}</div>
      <div className={cn("flex-[1]", tight ? "min-h-0" : "min-h-[64px]")} />
    </div>
  )
}

// Step numbers on cards and flows: flat mono numerals in the accent colour, like the agenda and PART
// covers. When a slide carries badges (numbers the notes refer to) only badged items show a number, and
// it is the badge number; otherwise every item shows its position.
function Numeral({ n }: { n?: number | "!" }) {
  if (n === undefined) return <span />
  return <span className="font-num text-[30px] font-medium tracking-[0.04em] text-slide-accent">{n === "!" ? "!" : String(n).padStart(2, "0")}</span>
}

function TableT({ s }: { s: TableSlide }) {
  const n = s.rows.length
  const cols = s.columns.length
  const firstW = cols >= 4 ? 34 : cols === 3 ? 40 : cols === 2 ? 50 : 100 / Math.max(cols, 1)
  const restW = cols > 1 ? (100 - firstW) / (cols - 1) : 0
  const compact = n > 8
  const rowH = n <= 3 ? 140 : n <= 5 ? 120 : n <= 8 ? 92 : undefined
  const firstSize = n <= 3 ? 38 : n <= 5 ? 34 : n <= 8 ? 28 : n <= 12 ? 22 : 20
  const valueSize = n <= 3 ? 32 : n <= 5 ? 28 : n <= 8 ? 26 : n <= 12 ? 22 : 20
  const cellPy = compact ? (n <= 12 ? "py-2.5" : "py-1.5") : undefined
  return (
    <Lower tight={compact}>
      <table className="w-full table-fixed border-collapse font-display">
        <colgroup>
          <col style={{ width: `${firstW}%` }} />
          {s.columns.slice(1).map((_, i) => <col key={i} style={{ width: `${restW}%` }} />)}
        </colgroup>
        <thead>
          <tr className="border-b-2 border-[#101113]" style={{ height: 80 }}>
            {s.columns.map((c, i) => (
              <th key={i} className={cn("align-middle text-left font-semibold text-[28px] text-[#7c8288]", i === 0 ? "pl-8" : "px-6", cellPy)}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {s.rows.map((r, ri) => (
            <tr key={ri} className="border-b border-[#e3e5e8]" style={rowH ? { height: rowH } : undefined}>
              {r.cells.map((c, ci) => {
                if (ci === 0) {
                  const term = isTermCell(c)
                  return (
                    <td
                      key={ci}
                      className={cn("relative align-middle pl-8 break-keep font-bold", term ? "font-term" : "font-display", r.highlight ? "text-slide-accent" : "text-[#101113]", cellPy)}
                      style={{ fontSize: firstSize }}
                    >
                      {r.highlight ? <span className="absolute inset-y-0 left-0 w-[6px] bg-slide-accent" /> : null}
                      {c}
                    </td>
                  )
                }
                const positive = isPositiveCell(c)
                const negative = isNegativeCell(c)
                return (
                  <td
                    key={ci}
                    className={cn("align-middle px-6 text-left break-keep", positive ? "font-semibold text-[#101113]" : negative ? "text-[#a3a8ad]" : "text-[#43474b]", cellPy)}
                    style={{ fontSize: valueSize }}
                  >
                    {positive ? <span className="mr-[14px] inline-block size-[12px] shrink-0 rounded-full bg-slide-accent align-middle" /> : null}
                    {c}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Lower>
  )
}

// A static vector illustration, centred in the body. No animation in the lecture slides (CEO 2026-09-21).
function IllustrationT({ s }: { s: IllustrationSlide }) {
  if (!s.illustration.startsWith("/")) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 font-display text-[30px] text-[#7c8288]">
        일러스트 자리 · {s.illustration}
      </div>
    )
  }
  return (
    <div className="flex h-full min-h-0 items-center justify-center">
      <img src={asset(s.illustration)} alt={s.title} className="h-full max-h-full w-auto max-w-full object-contain" />
    </div>
  )
}

// The session agenda (and any short outline). One component for every step: rows carry a PART-style
// number, the title and, when the item has a slide count, a bar sized by that count so the long parts
// read as long. Up to six rows sit in one column; more split into two columns filled top-down, so an
// 11+ part session still fits under the title without shrinking the type to nothing.
const countOf = (it: OverviewSlide["items"][number]) => it.count ?? (it.meta ? Number(/^(\d+)장$/.exec(it.meta)?.[1]) || undefined : undefined)

function OverviewT({ s }: { s: OverviewSlide }) {
  const n = s.items.length
  const cols = n > 6 ? 2 : 1
  const rows = Math.ceil(n / cols)
  const max = Math.max(1, ...s.items.map((it) => countOf(it) ?? 0))
  const big = cols === 1
  const tight = rows > 5
  // Rows share the body height up to a comfortable row size, so a short agenda does not float in white.
  const rowMax = rows <= 4 ? 150 : rows === 5 ? 140 : 125
  return (
    <div className="flex h-full min-h-0 flex-col justify-center">
      <div className={cn("grid min-h-0 grid-flow-col border-t-2 border-[#101113]", big ? "gap-x-0" : "gap-x-16")} style={{ height: `min(100%, ${rows * rowMax}px)`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`, gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {s.items.map((it, i) => {
          const c = countOf(it)
          return (
            <div key={i} className={cn("flex min-w-0 items-center border-b border-neutral-200", big ? "gap-10" : "gap-7", it.current && "border-b-2 border-b-slide-accent")}>
              <span className={cn("w-[1.6em] shrink-0 font-num font-medium text-slide-accent", big ? "pl-2 text-[36px]" : "pl-1 text-[30px]")}>{String(i + 1).padStart(2, "0")}</span>
              <span className={cn("min-w-0 flex-1 truncate font-display font-bold tracking-[-0.01em]", it.current ? "text-slide-accent" : "text-[#101113]", big ? "text-[46px]" : tight ? "text-[36px]" : "text-[40px]")}>{it.label}</span>
              {c !== undefined ? (
                <span className={cn("flex shrink-0 items-center", big ? "gap-6" : "gap-4")}>
                  <span className={cn("h-2.5 overflow-hidden rounded-full bg-neutral-100", big ? "w-[280px]" : "w-[150px]")}>
                    <span className="block h-full rounded-full bg-slide-accent" style={{ width: `${Math.max(6, (c / max) * 100)}%` }} />
                  </span>
                  <span className={cn("w-[2.6em] text-right font-num text-[#7c8288]", big ? "text-[30px]" : "text-[24px]")}>{c}<span className="font-display">장</span></span>
                </span>
              ) : it.meta ? (
                <span className={cn("shrink-0 font-num text-[#7c8288]", big ? "text-[30px]" : "text-[24px]")}>{it.meta}</span>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Full-bleed part opener: the session's table of contents as a strip (this part highlighted), the part
// number and title large, and the slides it covers as short chips. No explanatory text.
export function PartCoverT({ s }: { s: PartCoverSlide }) {
  return (
    <div className="flex size-full flex-col bg-white px-[120px] py-[90px]">
      <div className="flex gap-3">
        {s.parts.map((p, i) => (
          <div key={i} className="flex min-w-0 flex-1 flex-col gap-3">
            <div className={cn("h-2 rounded-full", i < s.partIndex ? "bg-neutral-400" : i === s.partIndex ? "bg-slide-accent" : "bg-neutral-200")} />
            <span className={cn("truncate font-display text-[18px]", i === s.partIndex ? "font-bold text-[#101113]" : "text-[#9a9ea3]")}>{p.title}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-6">
        <span className="font-num text-[40px] font-medium tracking-[0.1em] text-slide-accent">PART {String(s.partIndex + 1).padStart(2, "0")}</span>
        <h1 className="font-display text-[120px] leading-[1.05] font-bold tracking-[-0.03em] break-keep text-balance text-[#101113]">{s.title}</h1>
      </div>
      {s.sections?.length ? (
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {s.sections.map((sec, i) => (
            <div key={i} className="flex items-center gap-5 border-b border-neutral-200 pb-4">
              <span className="font-num text-[26px] font-medium text-slide-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1 truncate font-display text-[32px] font-bold text-[#101113]">{sec.title}</span>
              <span className="font-num text-[24px] text-[#9a9ea3]">{sec.count}</span>
            </div>
          ))}
        </div>
      ) : s.slideTitles.length <= 12 ? (
      <div className="flex flex-wrap gap-4">
        {s.slideTitles.map((t, i) => (
          <span key={i} className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white py-3 pr-7 pl-4 font-display text-[26px] text-[#43474b]">
            <span className="font-num text-[22px] text-[#9a9ea3]">{String(i + 1).padStart(2, "0")}</span>
            {t}
          </span>
        ))}
      </div>
      ) : null}
    </div>
  )
}

// Visual cards: each thing shown by its logo and/or a real picture, with a label and short tags.
// Cards with pictures fill the body height (unchanged). Icon-only cards are editorial columns: a 2px
// ink rule opens each one, a badge/mark row sits under it, then a fixed gap before the large label and
// its tag line - no boxes, no chips. The row is anchored to the bottom of the body (DESIGN.md
// principle 3: deliberate whitespace, not a small group centred in empty space).
function CardsT({ s }: { s: CardsSlide }) {
  const withImages = s.cards.some((c) => c.image)
  if (!withImages) return <CardsIconOnlyT s={s} />
  return (
    <div className="flex h-full min-h-0 items-center">
    <div className="flex h-full w-full min-h-0 items-stretch gap-8">
      {s.cards.map((c, i) => (
        <div
          key={i}
          className={cn(
            "relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border bg-white",
            c.highlight ? "border-2 border-slide-accent" : "border-neutral-200",
          )}
        >
          {c.badge ? <span className="absolute top-5 right-5 z-10"><NumberBadge n={c.badge} /></span> : null}
          {c.logo && (
            <div className="flex h-28 shrink-0 items-center justify-center px-8">
              <Mark src={c.logo} px={56} />
            </div>
          )}
          {c.image && (
            <div className="min-h-0 flex-1 border-y border-neutral-200 bg-white">
              <img src={asset(c.image)} alt="" className="size-full object-cover object-top" />
            </div>
          )}
          <div className="flex shrink-0 flex-col gap-3 px-8 py-6">
            <span className="font-display text-[36px] font-bold text-[#101113] break-keep">{c.label}</span>
            {c.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t, ti) => (
                  <span key={ti} className="rounded-full border border-neutral-200 px-4 py-1.5 font-body text-[22px] break-keep text-[#43474b]">{t}</span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

function CardsIconOnlyT({ s }: { s: CardsSlide }) {
  const n = s.cards.length
  const cols = n <= 4 ? n : 3
  const anyBadge = s.cards.some((c) => c.badge)
  return (
    <Lower>
      <div className="grid w-full" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, columnGap: 48, rowGap: 56 }}>
        {s.cards.map((c, i) => {
          const brandLogo = c.logo && !c.logo.startsWith("icon:") ? c.logo : undefined
          return (
            <div key={i} className="flex min-w-0 flex-col">
              {/* fixed 4px rule area so every column's content starts at the same y */}
              <div style={{ height: 4 }}>
                {c.highlight ? <div className="h-full bg-slide-accent" /> : <div style={{ height: 2 }} className="bg-[#101113]" />}
              </div>
              <div className="flex items-center justify-between" style={{ height: 56, marginTop: 28 }}>
                <Numeral n={anyBadge ? c.badge : i + 1} />
                {brandLogo ? <Mark src={brandLogo} px={48} /> : null}
              </div>
              <span
                className={cn(
                  "font-display font-bold leading-[1.05] tracking-[-0.02em] break-keep",
                  c.highlight ? "text-slide-accent" : "text-[#101113]",
                )}
                style={{ fontSize: 60, marginTop: 24 }}
              >
                {c.label}
              </span>
              {c.tags?.length ? (
                <span className="break-keep font-display text-[28px] text-[#43474b]" style={{ marginTop: 16 }}>
                  {c.tags.join(" · ")}
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
    </Lower>
  )
}

const isAscii = (v: string) => /^[\x00-\x7F]+$/.test(v.trim())

// A continuous timeline: one 2px ink rule spanning the body width, ending in a solid arrowhead. Steps sit
// as equal columns under the line, each anchored by an accent dot at its left edge. `loop` draws a thin
// accent return line under the columns, from the last step's left edge back to the first, arrow pointing
// left. No boxes, no chips - type, rules and dots only (DESIGN.md principle 4).
function FlowT({ s }: { s: FlowSlide }) {
  const n = s.steps.length
  const labelSize = n >= 5 ? 42 : 48
  const cols = { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, columnGap: 48 }
  const anyBadge = s.steps.some((st) => st.badge)
  return (
    <Lower>
      <div className="relative" style={{ height: 16 }}>
        <div className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-[#101113]" style={{ right: 14 }} />
        <svg width={12} height={16} viewBox="0 0 12 16" className="absolute top-1/2 right-0 -translate-y-1/2">
          <path d="M0 0 L12 8 L0 16 Z" fill="#101113" />
        </svg>
        <div className="absolute inset-0 grid" style={cols}>
          {s.steps.map((_, i) => (
            <div key={i} className="relative">
              <span
                className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-slide-accent"
                style={{ width: 16, height: 16 }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="grid" style={{ ...cols, marginTop: 32 }}>
        {s.steps.map((st, i) => {
          const brandLogo = st.logo && !st.logo.startsWith("icon:") ? st.logo : undefined
          return (
            <div key={i} className="flex min-w-0 flex-col">
              <div className="flex items-center justify-between" style={{ height: 56 }}>
                <Numeral n={anyBadge ? st.badge : i + 1} />
                {brandLogo ? <Mark src={brandLogo} px={48} /> : null}
              </div>
              <span
                className="font-display leading-[1.1] font-bold break-keep text-[#101113]"
                style={{ fontSize: labelSize, marginTop: 36 }}
              >
                {st.label}
              </span>
              {st.sub ? (
                <span
                  className={cn("break-keep text-[28px] text-[#7c8288]", isAscii(st.sub) ? "font-term" : "font-display")}
                  style={{ marginTop: 14 }}
                >
                  {st.sub}
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
      {s.loop && n > 1 && (
        <div className="grid" style={{ ...cols, marginTop: 48 }}>
          <div className="relative" style={{ gridColumn: `1 / ${n}`, height: 24 }}>
            <span className="absolute -top-9 right-0 font-display text-[24px] font-semibold text-slide-accent">반복</span>
            <div className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-slide-accent" style={{ left: 14, right: 0 }} />
            <svg width={12} height={16} viewBox="0 0 12 16" className="absolute top-1/2 left-0 -translate-y-1/2">
              <path d="M12 0 L0 8 L12 16 Z" fill="currentColor" className="text-slide-accent" />
            </svg>
          </div>
        </div>
      )}
    </Lower>
  )
}

// Screens top to bottom with a down arrow between them; `frame` wraps them in one labelled thin-bordered
// box (the program that owns the whole pipeline).
function StackT({ s }: { s: StackSlide }) {
  const body = (
    <div className="flex h-full min-h-0 flex-col">
      {s.items.map((it, i) => (
        <div key={i} className={cn("flex min-h-0 flex-col", it.grow ? "flex-1" : "shrink-0")}>
          <div className={cn("min-h-0", it.grow && "flex-1")}><ScreenView screen={it.screen} /></div>
          {i < s.items.length - 1 && (
            <svg viewBox="0 0 24 40" className="mx-auto my-2 h-10 w-6 shrink-0 text-slide-accent">
              <path d="M12 2v32m-9-9 9 9 9-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
  if (!s.frame) return body
  return (
    <div className="flex h-full min-h-0 flex-col gap-5">
      <div className="shrink-0 border-t-2 border-[#101113] pt-3 font-display text-[26px] font-semibold text-slide-accent">{s.frame}</div>
      <div className="min-h-0 flex-1">{body}</div>
    </div>
  )
}
