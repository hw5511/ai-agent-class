// Loads every course from JSON at build time. Two sources, one shape (./schema):
//   1. the existing decks in ../../courses/<course>/stepNN.json — adapted to image slides with their
//      action boxes normalised, so all 390 slides show up in the new viewer on day one
//   2. native sessions in ./sessions/<course>/stepNN.json — already written in the new schema; when one
//      exists it replaces the legacy session of the same number
import type { ActionBox, ActionItem, Course, CourseId, Part, Session, Site, Slide } from "./schema"

type LegacyAction = {
  label?: string
  copy?: string
  url?: string
  type?: string
  path?: string
  download?: { href: string; text: string }
  items?: { link?: { href: string; text: string }; copy?: string; desc?: string }[]
}
type LegacySlide = { imagePath: string; action?: LegacyAction | null }
type LegacySession = Omit<Session, "parts"> & { slides: LegacySlide[]; parts?: { title: string; from: number; to: number }[] }
type LegacyMeta = { label: string; title: string }

const legacy = import.meta.glob<LegacySession>("../../../courses/*/step*.json", { eager: true, import: "default" })
const metas = import.meta.glob<LegacyMeta>("../../../courses/*/_meta.json", { eager: true, import: "default" })
const native = import.meta.glob<Session>("./sessions/*/step*.json", { eager: true, import: "default" })

const COURSE_ORDER: CourseId[] = ["basic", "advanced", "automation"]

function normaliseAction(a: LegacyAction | null | undefined): ActionBox | undefined {
  if (!a) return undefined
  const items: ActionItem[] = []
  if (a.copy) items.push({ kind: "copy", value: a.copy })
  if (a.download) items.push({ kind: "download", href: a.download.href, text: a.download.text })
  if (a.type === "link" && a.url) items.push({ kind: "link", href: a.url, text: a.label ?? a.url })
  if (a.type === "download-folder" && a.path) items.push({ kind: "download", href: `/${a.path}`, text: a.label ?? "다운로드" })
  for (const it of a.items ?? []) {
    if (it.link) items.push({ kind: "link", href: it.link.href, text: it.link.text, desc: it.desc })
    else if (it.copy) items.push({ kind: "copy", value: it.copy, desc: it.desc })
  }
  return items.length ? { label: a.label ?? "실습", items } : undefined
}

function adaptLegacy(course: CourseId, s: LegacySession): Session {
  const slides: Slide[] = s.slides.map((sl, i) => ({
    id: `${course}-${s.step}-${i + 1}`,
    title: sl.imagePath.split("/").pop()!.replace(/\.(png|svg)$/, "").replace(/_/g, " "),
    template: "image",
    src: `/${sl.imagePath}`,
    action: normaliseAction(sl.action),
  }))
  const ranges = s.parts?.length ? s.parts : [{ title: s.title, from: 1, to: slides.length }]
  const parts: Part[] = ranges.map((p, i) => ({ id: `p${i + 1}`, title: p.title, slides: slides.slice(p.from - 1, p.to) }))
  return { step: s.step, title: s.title, hours: s.hours, goal: s.goal, topics: s.topics ?? [], practice: s.practice ?? "", parts }
}

export function loadSite(): Site {
  const courses: Course[] = COURSE_ORDER.map((id) => {
    const meta = Object.entries(metas).find(([p]) => p.includes(`/courses/${id}/`))?.[1]
    const sessions = Object.entries(legacy)
      .filter(([p]) => p.includes(`/courses/${id}/`))
      .map(([, s]) => adaptLegacy(id, s))
    for (const [p, s] of Object.entries(native)) {
      if (!p.includes(`/sessions/${id}/`)) continue
      const at = sessions.findIndex((x) => x.step === s.step)
      if (at >= 0) sessions[at] = s
      else sessions.push(s)
    }
    sessions.sort((a, b) => a.step - b.step)
    return { id, label: meta?.label ?? id, title: meta?.title ?? id, sessions }
  })
  return { title: "AI 에이전트 수업", courses }
}

export const flatSlides = (s: Session) => s.parts.flatMap((p) => p.slides.map((slide) => ({ part: p, slide })))
