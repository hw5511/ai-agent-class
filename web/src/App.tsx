// Viewer shell: sidebar = course -> session -> table of contents (parts); main = slide stage + the
// session/slide info and the action box. Everything comes from loadSite(); the URL hash keeps the old
// "#basic/3/10" form so existing links keep working.
import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { loadSite, flatSlides } from "@/content/load"
import type { CourseId } from "@/content/schema"
import { SlideStage } from "@/components/slide/SlideStage"
import { ActionPanel } from "@/components/ActionPanel"
import { NotesPanel } from "@/components/NotesPanel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Kbd } from "@/components/ui/kbd"
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

function PanelLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">{children}</span>
}

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

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") go({ slide: Math.min(idx + 2, slides.length) })
      if (e.key === "ArrowLeft" || e.key === "PageUp") go({ slide: Math.max(idx, 1) })
    }
    addEventListener("keydown", on)
    return () => removeEventListener("keydown", on)
  })

  const partStart = (partId: string) => slides.findIndex((x) => x.part.id === partId) + 1
  const inPart = slides.filter((x) => x.part.id === cur?.part.id)
  const posInPart = inPart.findIndex((x) => x.slide.id === cur?.slide.id) + 1

  return (
    <SidebarProvider>
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
            <SidebarMenu>
              {course.sessions.map((s) => (
                <SidebarMenuItem key={s.step}>
                  <SidebarMenuButton isActive={s.step === session.step} onClick={() => go({ step: s.step, slide: 1 })}>
                    <span className={cn("w-6 shrink-0 font-num text-[12px] font-medium tabular-nums tracking-wide", s.step === session.step ? "text-slide-accent" : "text-muted-foreground")}>{String(s.step).padStart(2, "0")}</span>
                    <span className="truncate">{s.title}</span>
                  </SidebarMenuButton>
                  {s.step === session.step && s.parts.length > 1 && (
                    <SidebarMenuSub>
                      {s.parts.map((p) => (
                        <SidebarMenuSubItem key={p.id}>
                          <SidebarMenuSubButton isActive={p.id === cur?.part.id} onClick={() => go({ slide: partStart(p.id) })}>
                            <span className="truncate">{p.title}</span>
                            <span className="ml-auto font-num text-[11px] tabular-nums text-muted-foreground">{p.slides.length}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="flex h-svh min-w-0 flex-col overflow-hidden">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <Badge variant="secondary">{String(session.step).padStart(2, "0")}회차</Badge>
          <span className="truncate text-sm font-medium">{session.title}</span>
          <span className="truncate text-sm text-muted-foreground">· {cur?.part.title}</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="font-num text-sm tabular-nums text-muted-foreground">{idx + 1} / {slides.length}</span>
            <Button size="icon-sm" variant="outline" onClick={() => go({ slide: Math.max(idx, 1) })} aria-label="이전"><ChevronLeftIcon /></Button>
            <Button size="icon-sm" variant="outline" onClick={() => go({ slide: Math.min(idx + 2, slides.length) })} aria-label="다음"><ChevronRightIcon /></Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <div className="min-w-0 flex-1 bg-neutral-200/70 p-5">
            {cur && <SlideStage slide={cur.slide} eyebrow={`${cur.part.title.toUpperCase()} · ${String(posInPart).padStart(2, "0")}/${String(inPart.length).padStart(2, "0")}`} />}
          </div>
          <aside className="flex w-[340px] shrink-0 flex-col gap-6 overflow-y-auto border-l bg-background px-5 py-6">
            <NotesPanel notes={cur?.slide.notes} />
            <ActionPanel action={cur?.slide.action} />
            <section className="flex flex-col gap-4">
              <PanelLabel>회차 정보</PanelLabel>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold text-foreground">목표</h3>
                <p className="text-sm leading-6 break-keep text-muted-foreground">{session.goal}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold text-foreground">실습</h3>
                <p className="text-sm leading-6 break-keep text-muted-foreground">{session.practice}</p>
              </div>
            </section>
            <Separator />
            <section className="flex flex-col gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Kbd>←</Kbd><Kbd>→</Kbd> 슬라이드 이동</div>
              <div>템플릿 <code className="font-num text-foreground">{cur?.slide.template}</code></div>
            </section>
          </aside>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
