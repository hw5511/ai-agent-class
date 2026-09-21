// Content schema: the whole site is data. Site -> Course -> Session -> Part (table of contents)
// -> Slide (one template + that template's fields) -> ActionBox. Add or edit JSON and the viewer,
// sidebar, slide rendering and action box all follow; no page code changes per lesson.

export type CourseId = "basic" | "advanced" | "automation"

export interface Site {
  title: string
  courses: Course[]
}

export interface Course {
  id: CourseId
  label: string // "Basic · 8 Sessions"
  title: string // "AI 에이전트 기초 과정"
  sessions: Session[]
}

export interface Session {
  step: number
  title: string
  hours: string
  goal: string
  topics: string[]
  practice: string
  parts: Part[] // table of contents; slides live inside parts
}

export interface Part {
  id: string
  title: string // "개발 환경 준비"
  slides: Slide[]
}

// ---- slides: one template per slide, each template has its own fields -------------------------

export type Slide =
  | ImageSlide
  | ScreenNotesSlide
  | CompareSlide
  | ConceptSlide
  | OverviewSlide

interface SlideBase {
  id: string
  title: string // keyword noun phrase
  action?: ActionBox
}

/** Legacy: an already-rendered picture (PNG/SVG). Every slide from the old decks starts here. */
export interface ImageSlide extends SlideBase {
  template: "image"
  src: string
}

/** A product screen (the hero) + up to 3 numbered notes on the right. */
export interface ScreenNotesSlide extends SlideBase {
  template: "screen-notes"
  screen: Screen
  notes: Note[]
}

/** Two states side by side, one caption line under each. */
export interface CompareSlide extends SlideBase {
  template: "compare"
  left: { label: string; screen: Screen; caption: string }
  right: { label: string; screen: Screen; caption: string }
}

/** A concept explained with a picture from the illustration library + notes. */
export interface ConceptSlide extends SlideBase {
  template: "concept"
  illustration: string // id in the illustration library
  notes: Note[]
}

/** Part opener / session outline. */
export interface OverviewSlide extends SlideBase {
  template: "overview"
  items: { label: string; meta?: string; current?: boolean }[]
}

export interface Note {
  n: number | "!" // "!" = a tip, drawn outlined
  head: string
  body?: string
}

// ---- screens: the mockups a slide can show ------------------------------------------------------

export type Screen = VSCodeScreen | ShotScreen | TerminalScreen

export interface VSCodeScreen {
  kind: "vscode"
  folder: string // explorer root, e.g. "에이전트1"
  files: { name: string; depth?: number; folder?: boolean; active?: boolean; badge?: number }[]
  editor?: { file: string; lines: string[]; badge?: number }
  terminal: Terminal
}

export interface TerminalScreen {
  kind: "terminal"
  terminal: Terminal
}

export interface ShotScreen {
  kind: "shot"
  src: string // real capture
}

export type Vendor = "claude" | "antigravity" | "codex" | "shell"

export interface Terminal {
  vendor: Vendor
  cwd?: string
  /** conversation, oldest first; `badge` pins a numbered badge next to that line */
  turns: { role: "user" | "assistant" | "tool"; text: string; badge?: number }[]
  input?: { text?: string; placeholder?: string; badge?: number }
}

// ---- action box: what the student does with this slide ------------------------------------------

export interface ActionBox {
  label: string
  items: ActionItem[]
}

export type ActionItem =
  | { kind: "copy"; value: string; desc?: string }
  | { kind: "link"; href: string; text: string; desc?: string }
  | { kind: "download"; href: string; text: string; desc?: string }
