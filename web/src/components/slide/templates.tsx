// Slide templates. The slide area shows visuals only (CEO 2026-09-21): screens, tables, diagrams,
// illustrations and a keyword title. Explanations live in slide.notes and render in the right panel
// (NotesPanel), numbered to match the badges drawn on the visual. Everything is flex; no coordinates.
import type { StackSlide, CardsSlide, CompareSlide, FlowSlide, IllustrationSlide, ImageSlide, OverviewSlide, PartCoverSlide, ScreenSlide, Slide, TableSlide } from "@/content/schema"
import { NumberBadge } from "./NumberBadge"
import { Mark } from "./Mark"
import { ScreenView } from "./ScreenView"
import { cn } from "@/lib/utils"

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
  }
}

function ImageT({ s }: { s: ImageSlide }) {
  return <img src={s.src} alt={s.title} className="size-full object-contain" />
}

function ScreenT({ s }: { s: ScreenSlide }) {
  return <div className="h-full min-h-0"><ScreenView screen={s.screen} /></div>
}

function CompareT({ s }: { s: CompareSlide }) {
  return (
    <div className="flex h-full min-h-0 gap-12">
      {[s.left, s.right].map((side, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col gap-5">
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

// Type steps down as rows grow so a long table (a /config list) still fits the body; my-auto centres a
// short table without pushing a tall one above the frame.
function TableT({ s }: { s: TableSlide }) {
  const n = s.rows.length
  const size = n <= 5 ? "text-[34px] [&_td]:py-6 [&_th]:py-6" : n <= 8 ? "text-[28px] [&_td]:py-4 [&_th]:py-4" : n <= 12 ? "text-[22px] [&_td]:py-2.5 [&_th]:py-3" : "text-[18px] [&_td]:py-1.5 [&_th]:py-2"
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <table className={cn("my-auto w-full border-collapse font-display", size)}>
        <thead>
          <tr className="border-b-2 border-[#101113]">
            {s.columns.map((c, i) => (
              <th key={i} className={cn("px-8 text-left font-bold text-[#101113]", i > 0 && "text-center")}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {s.rows.map((r, ri) => (
            <tr key={ri} className={cn("border-b border-neutral-200", r.highlight && "outline-2 -outline-offset-2 outline-slide-accent")}>
              {r.cells.map((c, ci) => (
                <td key={ci} className={cn("px-8 break-keep text-[#43474b]", ci === 0 ? "font-term font-bold text-[#101113]" : "text-center")}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
      <img src={s.illustration} alt={s.title} className="h-full max-h-full w-auto max-w-full object-contain" />
    </div>
  )
}

function OverviewT({ s }: { s: OverviewSlide }) {
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      {s.items.map((it, i) => (
        <div key={i} className={cn("flex items-center gap-8 rounded-2xl border bg-white px-10 py-7", it.current ? "border-2 border-slide-accent" : "border-neutral-200")}>
          <NumberBadge n={i + 1} />
          <span className="flex-1 font-display text-[40px] font-bold text-[#101113]">{it.label}</span>
          {it.meta && <span className="font-term text-[28px] text-[#7c8288]">{it.meta}</span>}
        </div>
      ))}
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
// Cards with pictures fill the body height; icon-only cards are a compact centred group (icon, label,
// tags stacked) so a tall card never leaves an empty gap between icon and label.
function CardsT({ s }: { s: CardsSlide }) {
  const withImages = s.cards.some((c) => c.image)
  return (
    <div className="flex h-full min-h-0 items-center">
    <div className={cn("flex w-full min-h-0 items-stretch gap-8", withImages && "h-full")}>
      {s.cards.map((c, i) => (
        <div
          key={i}
          className={cn(
            "relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border bg-white",
            !withImages && "items-center justify-center gap-8 px-8 py-16 text-center",
            c.highlight ? "border-2 border-slide-accent" : "border-neutral-200",
          )}
        >
          {c.badge ? <span className="absolute top-5 right-5 z-10"><NumberBadge n={c.badge} /></span> : null}
          {c.logo && (
            <div className={cn("flex shrink-0 items-center justify-center", withImages ? "h-28 px-8" : "")}>
              <Mark src={c.logo} px={withImages ? 56 : 120} />
            </div>
          )}
          {c.image && (
            <div className="min-h-0 flex-1 border-y border-neutral-200 bg-white">
              <img src={c.image} alt="" className="size-full object-cover object-top" />
            </div>
          )}
          <div className={cn("flex shrink-0 flex-col gap-3", withImages ? "px-8 py-6" : "items-center")}>
            <span className="font-display text-[36px] font-bold text-[#101113] break-keep">{c.label}</span>
            {c.tags?.length ? (
              <div className={cn("flex flex-wrap gap-2", !withImages && "justify-center")}>
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

// Boxes and arrows. With `loop`, a return arrow runs under the row from the last step back to the first.
function FlowT({ s }: { s: FlowSlide }) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center gap-10">
      <div className="flex items-stretch">
        {s.steps.map((st, i) => (
          <div key={i} className="flex flex-1 items-center">
            <div className="relative flex min-h-[220px] flex-1 flex-col items-center justify-center gap-4 rounded-3xl border-2 border-neutral-200 bg-white px-6 py-8 text-center">
              {st.badge ? <span className="absolute -top-5"><NumberBadge n={st.badge} /></span> : null}
              {st.logo && <Mark src={st.logo} px={72} />}
              <span className="font-display text-[40px] font-bold text-[#101113] break-keep">{st.label}</span>
              {st.sub && <span className="font-body text-[22px] text-[#7c8288] break-keep">{st.sub}</span>}
            </div>
            {i < s.steps.length - 1 && (
              <svg viewBox="0 0 60 24" className="mx-3 h-8 w-16 shrink-0 text-slide-accent">
                <path d="M2 12h50m-10-9 10 9-10 9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
      {s.loop && (
        <div className="relative mx-[6%] h-16">
          <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="absolute inset-0 size-full text-slide-accent">
            <path d="M985 0 V40 Q985 55 970 55 H30 Q15 55 15 40 V0" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="10 8" vectorEffect="non-scaling-stroke" />
          </svg>
          <svg viewBox="0 0 20 16" className="absolute -top-1 left-[calc(1.5%-10px)] h-4 w-5 text-slide-accent"><path d="M10 0 20 16H0Z" fill="currentColor" /></svg>
        </div>
      )}
    </div>
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
              <path d="M12 2v32m-9-9 9 9 9-9" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
  if (!s.frame) return body
  return (
    <div className="relative h-full min-h-0 rounded-3xl border-2 border-slide-accent px-8 pt-10 pb-8">
      <span className="absolute -top-5 left-8 rounded-full bg-slide-accent px-5 py-1.5 font-display text-[22px] font-bold text-white">{s.frame}</span>
      {body}
    </div>
  )
}
