// Viewer shell: sidebar = course -> session -> table of contents (parts); main = slide stage + the
// session/slide info and the action box. Everything comes from loadSite(); the URL hash keeps the old
// "#basic/3/10" form so existing links keep working.
import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { loadSite, flatSlides } from "@/content/load"
import type { CourseId } from "@/content/schema"
import { SlideStage } from "@/components/slide/SlideStage"
import { ActionPanel } from "@/components/ActionPanel"
import { NotesPanel } from "@/components/NotesPanel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const site = loadSite()

type Pos = { course: CourseId; step: number; slide: number }

function readHash(): Pos {
  const [c, s, n] = location.hash.replace(/^#/, "").split("/")
  const course = (site.courses.find((x) => x.id === c)?.id ?? "basic") as CourseId
  const num = (v: string | undefined, d: number) => (v !== undefined && v !== "" && Number.isFinite(Number(v)) ? Number(v) : d)
  return { course, step: num(s, 1), slide: num(n, 1) }
}

export default function App() {
  const [pos, setPos] = useState<Pos>(readHash)
  useEffect(() => {
    const on = () => setPos(readHash())
    addEventListener("hashchange", on)
    return () => removeEventListener("hashchange", on)
  }, [])

  const course = site.courses.find((c) => c.id === pos.course)!
  const session = course.sessions.find((s) => s.step === pos.step) ?? course.sessions[0]
  const slides = useMemo(() => flatSlides(session), [session])
  const idx = Math.min(Math.max(pos.slide, 1), slides.length) - 1
  const cur = slides[idx]
  const go = (p: Partial<Pos>) => {
    const n = { ...pos, ...p }
    location.hash = `${n.course}/${n.step}/${n.slide}`
  }

  // Past the last slide of a session goes to the next session's first slide; before the first slide
  // goes to the previous session's last slide (CEO 2026-09-22).
  const si = course.sessions.findIndex((s) => s.step === session.step)
  const next = () => {
    if (idx + 1 < slides.length) return go({ slide: idx + 2 })
    const ns = course.sessions[si + 1]
    if (ns) go({ step: ns.step, slide: 1 })
  }
  const prev = () => {
    if (idx > 0) return go({ slide: idx })
    const ps = course.sessions[si - 1]
    if (ps) go({ step: ps.step, slide: flatSlides(ps).length })
  }

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") next()
      if (e.key === "ArrowLeft" || e.key === "PageUp") prev()
    }
    addEventListener("keydown", on)
    return () => removeEventListener("keydown", on)
  })

  // Sessions whose part list is unfolded. The session being viewed opens by itself; clicking the
  // open session's row folds it again (CEO 2026-09-22).
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set([session.step]))
  useEffect(() => {
    setExpanded((e) => (e.has(session.step) ? e : new Set(e).add(session.step)))
  }, [session.step])
  const toggle = (step: number) =>
    setExpanded((e) => {
      const n = new Set(e)
      if (n.has(step)) n.delete(step)
      else n.add(step)
      return n
    })
  const partStart = (s: typeof session, partId: string) => flatSlides(s).findIndex((x) => x.part.id === partId) + 1
  const inPart = slides.filter((x) => x.part.id === cur?.part.id)
  const posInPart = inPart.findIndex((x) => x.slide.id === cur?.slide.id) + 1

  return (
    <SidebarProvider style={{ "--sidebar-width": "19rem" } as React.CSSProperties}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex flex-col gap-2 px-2 pt-2">
            <span className="font-display text-base font-bold">{site.title}</span>
            <div className="flex gap-1">
              {site.courses.map((c) => (
                <Button key={c.id} size="sm" variant={c.id === course.id ? "default" : "ghost"} onClick={() => go({ course: c.id, step: c.sessions[0]?.step ?? 1, slide: 1 })}>
                  {c.id}
                </Button>
              ))}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{course.title}</SidebarGroupLabel>
            <SidebarMenu className="gap-1">
              {course.sessions.map((s) => {
                const open = s.step === session.step
                const unfolded = expanded.has(s.step) && s.parts.length > 1
                return (
                  <SidebarMenuItem key={s.step}>
                    {/* Session row: full title wraps instead of being cut; the open session gets an accent number chip.
                        Clicking another session goes there; clicking the one already open folds/unfolds its parts. */}
                    <SidebarMenuButton
                      isActive={open}
                      aria-expanded={unfolded}
                      onClick={() => (open ? toggle(s.step) : go({ step: s.step, slide: 1 }))}
                      className={cn("h-auto items-start gap-3 py-2 [&>span:last-child]:whitespace-normal", open && "bg-slide-accent/8 data-active:bg-slide-accent/8")}
                    >
                      <span
                        className={cn(
                          "mt-px flex h-5 w-7 shrink-0 items-center justify-center rounded font-num text-[11px] font-semibold tabular-nums",
                          open ? "bg-slide-accent text-white" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {String(s.step).padStart(2, "0")}
                      </span>
                      <span className={cn("min-w-0 flex-1 text-[14px] leading-5 break-keep", open ? "font-semibold text-foreground" : "text-foreground/80")}>{s.title}</span>
                      {s.parts.length > 1 && (
                        <span
                          role="button"
                          aria-label={unfolded ? "목차 접기" : "목차 펼치기"}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggle(s.step)
                          }}
                          className="-mr-1 flex size-5 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-black/5 hover:text-foreground"
                        >
                          <ChevronDownIcon className={cn("size-4 transition-transform duration-200", !unfolded && "-rotate-90")} />
                        </span>
                      )}
                    </SidebarMenuButton>
                    {s.parts.length > 1 && (
                      // Parts fold with a height animation (grid 0fr <-> 1fr) so the list slides open instead of popping.
                      <div className={cn("grid transition-[grid-template-rows] duration-200 ease-out", unfolded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                        <div className="overflow-hidden">
                          <SidebarMenuSub className="mx-0 mt-1 mb-2 ml-[22px] gap-0.5 border-l-2 border-slide-accent/20 py-0.5 pr-0 pl-2">
                            {s.parts.map((p, pi) => {
                              const here = open && p.id === cur?.part.id
                              return (
                                <SidebarMenuSubItem key={p.id}>
                                  <SidebarMenuSubButton
                                    isActive={here}
                                    tabIndex={unfolded ? 0 : -1}
                                    onClick={() => go({ step: s.step, slide: partStart(s, p.id) })}
                                    className={cn(
                                      "relative h-auto items-start gap-2 py-1.5 text-[13px] leading-[18px]",
                                      here ? "bg-slide-accent/10 font-semibold text-slide-accent data-active:bg-slide-accent/10 data-active:text-slide-accent" : "text-muted-foreground hover:text-foreground",
                                    )}
                                  >
                                    {here && <span className="absolute top-1.5 bottom-1.5 -left-[12px] w-[2px] rounded bg-slide-accent" />}
                                    <span className="w-4 shrink-0 font-num text-[11px] leading-[18px] tabular-nums opacity-70">{pi + 1}</span>
                                    <span className="min-w-0 flex-1 break-keep">{p.title}</span>
                                    <span className="shrink-0 font-num text-[10px] leading-[18px] tabular-nums opacity-50">{p.slides.length}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              )
                            })}
                          </SidebarMenuSub>
                        </div>
                      </div>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="relative flex h-svh min-w-0 flex-col overflow-hidden">
        {/* No top header (CEO 2026-09-22): only the sidebar toggle floats over the slide's corner, and the
            session/part/slide counter moved to the bottom of the right panel, so the slide gets the full height. */}
        <SidebarTrigger className="absolute top-2 left-2 z-20 size-8 rounded-md border bg-background/85 shadow-sm backdrop-blur hover:bg-background" />

        <div className="flex min-h-0 flex-1">
          <div className="min-w-0 flex-1 bg-white px-3 py-2">
            {cur && <SlideStage slide={cur.slide} eyebrow={`${cur.part.title.toUpperCase()} · ${String(posInPart).padStart(2, "0")}/${String(inPart.length).padStart(2, "0")}`} />}
          </div>
          <aside className="flex w-[280px] shrink-0 flex-col border-l bg-background">
            <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 py-5">
              <ActionPanel action={cur?.slide.action} />
              {/* Slide explanation only; the session goal/practice blocks were dropped (CEO 2026-09-22). */}
              <NotesPanel notes={cur?.slide.notes} />
            </div>
            {/* Where-am-I + paging, pinned under the panel's scroll area. */}
            <footer className="flex shrink-0 flex-col gap-2.5 border-t bg-muted/30 px-4 py-3">
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="shrink-0">{String(session.step).padStart(2, "0")}회차</Badge>
                  <span className="truncate text-[13px] font-medium" title={session.title}>{session.title}</span>
                </div>
                <span className="truncate text-xs text-muted-foreground" title={cur?.part.title}>{cur?.part.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-num text-sm tabular-nums text-muted-foreground">{idx + 1} / {slides.length}</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <Button size="icon-sm" variant="outline" onClick={() => prev()} aria-label="이전"><ChevronLeftIcon /></Button>
                  <Button size="icon-sm" variant="outline" onClick={() => next()} aria-label="다음"><ChevronRightIcon /></Button>
                </div>
              </div>
            </footer>
          </aside>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
