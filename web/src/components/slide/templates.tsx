// Slide templates. The slide area shows visuals only (CEO 2026-09-21): screens, tables, diagrams,
// illustrations and a keyword title. Explanations live in slide.notes and render in the right panel
// (NotesPanel), numbered to match the badges drawn on the visual. Everything is flex; no coordinates.
import type { CompareSlide, IllustrationSlide, ImageSlide, OverviewSlide, PartCoverSlide, ScreenSlide, Slide, TableSlide } from "@/content/schema"
import { NumberBadge } from "./NumberBadge"
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

function IllustrationT({ s }: { s: IllustrationSlide }) {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 font-display text-[30px] text-[#7c8288]">
      일러스트 라이브러리 · {s.illustration}
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
      <div className="flex flex-wrap gap-4">
        {s.slideTitles.map((t, i) => (
          <span key={i} className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white py-3 pr-7 pl-4 font-display text-[26px] text-[#43474b]">
            <span className="font-num text-[22px] text-[#9a9ea3]">{String(i + 1).padStart(2, "0")}</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
