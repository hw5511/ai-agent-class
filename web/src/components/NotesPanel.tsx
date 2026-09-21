import type { Note } from "@/content/schema"
import { cn } from "@/lib/utils"

// The explanation for the slide on screen. Numbers match the badges drawn on the slide's visual.
export function NotesPanel({ notes }: { notes?: Note[] }) {
  if (!notes?.length) return null
  return (
    <section className="flex flex-col gap-3">
      <span className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">설명</span>
      <ol className="flex flex-col gap-4">
        {notes.map((n, i) => (
          <li key={i} className="flex gap-3">
            <span
              className={cn(
                "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full font-num text-xs font-semibold",
                n.n === "!" ? "border-2 border-slide-accent text-slide-accent" : "bg-slide-accent text-white",
              )}
            >
              {n.n}
            </span>
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-[15px] leading-6 font-semibold break-keep text-foreground">{n.head}</span>
              {n.body && <p className="text-sm leading-6 break-keep text-muted-foreground">{n.body}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
