// Slide templates. The slide area shows visuals only (CEO 2026-09-21): screens, tables, diagrams,
// illustrations and a keyword title. Explanations live in slide.notes and render in the right panel
// (NotesPanel), numbered to match the badges drawn on the visual. Everything is flex; no coordinates.
import type { CompareSlide, IllustrationSlide, ImageSlide, OverviewSlide, ScreenSlide, Slide, TableSlide } from "@/content/schema"
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

function TableT({ s }: { s: TableSlide }) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center">
      <table className="w-full border-collapse font-display text-[34px]">
        <thead>
          <tr className="border-b-2 border-[#101113]">
            {s.columns.map((c, i) => (
              <th key={i} className={cn("px-8 py-6 text-left font-bold text-[#101113]", i > 0 && "text-center")}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {s.rows.map((r, ri) => (
            <tr key={ri} className={cn("border-b border-[#d5d2cc]", r.highlight && "bg-[#e8f2fb]")}>
              {r.cells.map((c, ci) => (
                <td key={ci} className={cn("px-8 py-6 break-keep text-[#43474b]", ci === 0 ? "font-term font-bold text-[#101113]" : "text-center")}>{c}</td>
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
    <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-[#d5d2cc] font-display text-[30px] text-[#7c8288]">
      일러스트 라이브러리 · {s.illustration}
    </div>
  )
}

function OverviewT({ s }: { s: OverviewSlide }) {
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      {s.items.map((it, i) => (
        <div key={i} className={cn("flex items-center gap-8 rounded-2xl px-10 py-7", it.current ? "bg-[#e8f2fb]" : "bg-[#f6f6f4]")}>
          <NumberBadge n={i + 1} />
          <span className="flex-1 font-display text-[40px] font-bold text-[#101113]">{it.label}</span>
          {it.meta && <span className="font-term text-[28px] text-[#7c8288]">{it.meta}</span>}
        </div>
      ))}
    </div>
  )
}
