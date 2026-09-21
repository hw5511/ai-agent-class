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
  summary?: string // one line: what this part is for — shown on the part cover's right panel
  slides: Slide[]
}

// ---- slides: one template per slide, each template has its own fields -------------------------

// Rule (CEO 2026-09-21): the slide area carries VISUALS only — screenshot, mockup, diagram, table,
// illustration — with a short keyword title. Explanations never go on the slide: they go in `notes`,
// which the right-hand panel shows next to the slide. Numbered badges on the visual match note numbers.
export type Slide =
  | ImageSlide
  | ScreenSlide
  | CompareSlide
  | TableSlide
  | IllustrationSlide
  | OverviewSlide
  | PartCoverSlide
  | CardsSlide
  | FlowSlide
  | StackSlide

interface SlideBase {
  id: string
  title: string // keyword noun phrase, the only sentence-like text on the slide
  notes?: Note[] // shown in the right panel, not on the slide
  action?: ActionBox
}

/** Legacy: an already-rendered picture (PNG/SVG). Every slide from the old decks starts here. */
export interface ImageSlide extends SlideBase {
  template: "image"
  src: string
}

/** One product screen (mockup or real capture), as large as the slide allows. */
export interface ScreenSlide extends SlideBase {
  template: "screen"
  screen: Screen
}

/** Two states side by side, a short label over each. */
export interface CompareSlide extends SlideBase {
  template: "compare"
  left: { label: string; screen: Screen }
  right: { label: string; screen: Screen }
}

/** A table: short cells only (keywords, commands, yes/no). */
export interface TableSlide extends SlideBase {
  template: "table"
  columns: string[]
  rows: { cells: string[]; highlight?: boolean }[]
}

/** Side-by-side visual cards: a product, tool or option each, with its logo and/or a picture of it. */
export interface CardsSlide extends SlideBase {
  template: "cards"
  cards: {
    label: string
    logo?: string // /logos/<name>.svg (monochrome brand mark) or /brand/<x>.png (full-colour wordmark)
    image?: string // a real screenshot or picture of the thing
    tags?: string[] // 1-3 short keywords
    badge?: number
    highlight?: boolean
  }[]
}

/** A process as boxes and arrows; `loop` draws the return arrow from the last step to the first. */
export interface FlowSlide extends SlideBase {
  template: "flow"
  steps: { label: string; sub?: string; logo?: string; badge?: number }[]
  loop?: boolean
}

/** Screens stacked top to bottom with an arrow between each, optionally inside one labelled frame
 *  (e.g. "에이전트 프로그램" wrapping a rule file, a chat and the terminal it drives). */
export interface StackSlide extends SlideBase {
  template: "stack"
  frame?: string
  items: { screen: Screen; grow?: boolean }[]
}

/** A diagram or illustration from the illustration library. */
export interface IllustrationSlide extends SlideBase {
  template: "illustration"
  illustration: string // a static vector file in public/illustrations/, e.g. /illustrations/agent-loop.svg
}

/** Generated, never written in JSON: the viewer puts one in front of every part of a multi-part session. */
export interface PartCoverSlide extends SlideBase {
  template: "part-cover"
  partIndex: number // 0-based
  parts: { title: string; count: number }[] // the whole session's table of contents
  slideTitles: string[] // what this part covers
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

export type Screen = VSCodeScreen | ShotScreen | TerminalScreen | ChatScreen | BrowserScreen | FileScreen

/** A small file card: a tab with the file name and a few lines; `mark` highlights a substring. */
export interface FileScreen {
  kind: "file"
  name: string
  lines: string[]
  mark?: string
  badge?: number
}

/** A chat-assistant window (ChatGPT, Claude.ai, Gemini) — the "ask and copy" way of working. */
export interface ChatScreen {
  kind: "chat"
  app: string // window title, e.g. "ChatGPT"
  logo?: string
  messages: {
    role: "user" | "assistant"
    text?: string
    code?: string // shown as a dark code block inside the answer
    mark?: string // a line shown highlighted under the answer (e.g. the detected command{...})
    markLabel?: string // small tag next to the mark (e.g. "자동 감지")
    badge?: number
  }[]
}

/** A browser window: a search results page or a simple page with a heading and lines. */
export interface BrowserScreen {
  kind: "browser"
  url: string
  results?: { site: string; title: string; snippet?: string; badge?: number }[]
  page?: { heading: string; lines?: string[]; button?: string }
}

export interface VSCodeMenuItem {
  label: string // "-" draws a separator
  shortcut?: string
  active?: boolean // highlighted; an active item with `sub` opens its submenu
  badge?: number
  sub?: VSCodeMenuItem[]
}

export interface VSCodeScreen {
  kind: "vscode"
  folder: string // explorer root, e.g. "에이전트1"
  files: { name: string; depth?: number; folder?: boolean; active?: boolean; editing?: boolean; badge?: number }[]
  editor?: { file: string; lines: string[]; badge?: number }
  terminal: Terminal
  terminalAt?: "right" | "bottom" // default right
  noTerminal?: boolean
  terminalTabBadge?: number // badge on the "터미널" tab
  chatPanel?: { closeBadge?: number } // VS Code's chat panel on the right (with its X)
  menu?: { at: "file" | "terminal-tab"; items: VSCodeMenuItem[] } // an open menu
  dialog?: { title: string; path?: string; folders: { name: string; selected?: boolean }[]; button: string; badge?: number } // folder picker
  sidebar?: "explorer" | "extensions"
  activityBadge?: number // badge on the extensions icon in the activity bar
  extensions?: {
    query: string
    queryBadge?: number
    items: { name: string; publisher: string; desc: string; icon?: "pdf"; installs?: string; badge?: number }[]
  }
  noSidebar?: boolean // hide the explorer column (activity bar stays)
  preview?: { file: string; md: string[]; badge?: number } // VS Code's Markdown preview next to the editor
  editorNotice?: { file: string; text: string } // editor tab that cannot show the file (a PDF without the extension)
  toast?: { text: string; buttons: { label: string; primary?: boolean; badge?: number }[] } // bottom-right notification
  explorerAction?: { icon: "newFile" | "newFolder"; badge?: number } // the icons on the explorer header
  keycap?: { keys: string[]; badge?: number } // a shortcut drawn over the window, e.g. ["Ctrl", "J"]
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
  prompt?: string // shell only: replaces the "PS <cwd>>" prompt, e.g. "student@MacBook ~ %" on macOS
  /** conversation, oldest first; `badge` pins a numbered badge next to that line */
  turns: { role: "user" | "assistant" | "tool"; text: string; badge?: number }[]
  usage?: { label: string; pct: number; resets: string; badge?: number }[] // /usage bar gauges after the turns
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
