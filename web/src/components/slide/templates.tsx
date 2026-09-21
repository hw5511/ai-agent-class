// Slide templates. Each reads only its own fields from ./schema and lays them out with flex inside the
// frame's body, so nothing is positioned by hand. The screen is the hero (3 parts of the width); notes
// take 1 part and use the smaller type steps.
import type { CompareSlide, ConceptSlide, ImageSlide, Note, OverviewSlide, ScreenNotesSlide, Slide } from "@/content/schema"
import { NumberBadge } from "./NumberBadge"
import { ScreenView } from "./ScreenView"
import { cn } from "@/lib/utils"

export function SlideBody({ slide }: { slide: Slide }) {
  switch (slide.template) {
    case "image":
      return <ImageT s={slide} />
    case "screen-notes":
      return <ScreenNotesT s={slide} />
    case "compare":
      return <CompareT s={slide} />
    case "concept":
      return <ConceptT s={slide} />
    case "overview":
      return <OverviewT s={slide} />
  }
}

function Notes({ notes }: { notes: Note[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-12 pt-2">
      {notes.map((n, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <NumberBadge n={n.n} />
            <span className="font-display text-[30px] leading-tight font-bold break-keep text-balance text-[#101113]">{n.head}</span>
          </div>
          {n.body && <p className="font-body text-[22px] leading-[1.55] break-keep text-pretty text-[#43474b]">{n.body}</p>}
        </div>
      ))}
    </div>
  )
}

function ImageT({ s }: { s: ImageSlide }) {
  return <img src={s.src} alt={s.title} className="size-full object-contain" />
}

function ScreenNotesT({ s }: { s: ScreenNotesSlide }) {
  return (
    <div className="flex h-full min-h-0 gap-14">
      <div className="min-w-0 flex-[3]"><ScreenView screen={s.screen} /></div>
      <div className="min-w-0 flex-[1]"><Notes notes={s.notes} /></div>
    </div>
  )
}

function CompareT({ s }: { s: CompareSlide }) {
  return (
    <div className="flex h-full min-h-0 gap-12">
      {[s.left, s.right].map((side, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col gap-4">
          <span className="font-display text-[28px] font-bold text-[#101113]">{side.label}</span>
          <div className="min-h-0 flex-1"><ScreenView screen={side.screen} /></div>
          <p className="font-body text-[22px] break-keep text-pretty text-[#43474b]">{side.caption}</p>
        </div>
      ))}
    </div>
  )
}

function ConceptT({ s }: { s: ConceptSlide }) {
  return (
    <div className="flex h-full min-h-0 gap-14">
      <div className="flex min-w-0 flex-[3] items-center justify-center rounded-2xl border-2 border-dashed border-[#d5d2cc] font-display text-[26px] text-[#7c8288]">
        일러스트 라이브러리 · {s.illustration}
      </div>
      <div className="min-w-0 flex-[1]"><Notes notes={s.notes} /></div>
    </div>
  )
}

function OverviewT({ s }: { s: OverviewSlide }) {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      {s.items.map((it, i) => (
        <div key={i} className={cn("flex items-center gap-6 rounded-xl px-8 py-6", it.current ? "bg-[#e8f2fb]" : "bg-[#f6f6f4]")}>
          <NumberBadge n={i + 1} />
          <span className="flex-1 font-display text-[34px] font-bold text-[#101113]">{it.label}</span>
          {it.meta && <span className="font-term text-[24px] text-[#7c8288]">{it.meta}</span>}
        </div>
      ))}
    </div>
  )
}
