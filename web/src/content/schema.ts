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
  sections?: { title: string; count: number }[] // detailed table of contents shown on the part cover instead of every slide title
  cover?: false // no generated cover and not counted in the covers' table of contents (a session opener)
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
  | LifecycleSlide

interface SlideBase {
  id: string
  title: string // keyword noun phrase, the only sentence-like text on the slide
  notes?: Note[] // shown in the right panel, not on the slide
  action?: ActionBox
  // Author-only marker, never rendered: this slide shows a plausible mockup that should be replaced by a real
  // rehearsal capture later (e.g. "real terminal result of the Notion tool-list prompt").
  replaceWithCapture?: string
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
  ratio?: [number, number] // relative widths of left and right, default [1, 1]
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

/** Claude Code hooks lifecycle, drawn left to right: session start -> [each turn: turn start -> [agentic
 *  loop, with a return arrow] -> turn end, with a return arrow] -> session end, plus a row of events that
 *  fire on their own. Node labels are exact hook event names (code.claude.com/docs/en/hooks). */
export interface LifecycleSlide extends SlideBase {
  template: "lifecycle"
  start: LifecycleNode[] // once per session, before the first turn: SessionStart
  turnStart: LifecycleNode[] // each turn, before the loop: UserPromptSubmit
  loop: LifecycleNode[] // the agentic loop: PreToolUse, PermissionRequest, [tool], PostToolUse ...
  turnEnd: LifecycleNode[] // each turn, after the loop: Stop
  end: LifecycleNode[] // once, at exit: SessionEnd
  side?: LifecycleNode[] // events that fire on their own (Notification, PreCompact ...), a thin row under the diagram
  turnLabel?: string // default "매 턴"
  loopLabel?: string // default "도구 루프"
  sideLabel?: string // default "따로 발생"
}

export interface LifecycleNode {
  label: string // exact event name, or "[도구 실행]" for the tool step
  sub?: string // one short keyword under the name
  badge?: number
  highlight?: boolean // accent border (the event a slide is about)
  muted?: boolean // grey, for rarely used events
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
  sections?: { title: string; count: number }[]
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

export type Screen = VSCodeScreen | ShotScreen | VideoScreen | TerminalScreen | ChatScreen | BrowserScreen | FileScreen | AgentViewScreen | OfficeScreen

/** Claude Code's full-screen Agent View (/background, or the left arrow): whole sessions listed by state. */
export interface AgentViewScreen {
  kind: "agentview"
  version?: string // "Claude Code v2.1.278"
  model?: string // "Sonnet 5 · ~\agent1"
  counts: string // "0 awaiting input · 1 working · 1 completed"
  countsBadge?: number
  notice?: string // dim line, e.g. "Your conversation moved to the background — enter opens it · ..."
  noticeBadge?: number
  groups: {
    title: string // "Working" / "Completed"
    rows: { icon?: string; name: string; desc?: string; time?: string; selected?: boolean; badge?: number }[] // icon "✶" working, "✻" done
  }[]
  input?: { text?: string; placeholder?: string; badge?: number } // "describe a task for a new session"
  footer?: string // "⏵⏵ bypass permissions · enter to return · space to r…"
}

/** Microsoft Office desktop window (Excel / Word / PowerPoint) with the Claude add-in panel on the right. */
export interface OfficeScreen {
  kind: "office"
  app: "excel" | "word" | "powerpoint"
  file: string // title bar file name, e.g. "매출보고서.xlsx"
  tab?: string // active ribbon tab, default "홈"
  ribbonMark?: { label: string; badge?: number } // one ribbon button drawn highlighted, e.g. "추가 기능"
  excel?: OfficeExcel
  word?: { pages: OfficeWordPage[] } // pages side by side (cover, TOC, body ...)
  powerpoint?: { slides: OfficePptSlide[]; current: number } // current = 1-based slide on the canvas
  panel?: OfficePanel // Claude add-in on the right; omit for no panel
  dialog?: { title: string; text: string; button?: string; badge?: number } // modal over the window (e.g. load error)
  zoom?: number // >1 enlarges the document area (a close-up of a formula), default 1
  // a right-click context menu drawn over the document area; x/y = percent of the whole window (0-100)
  contextMenu?: { x: number; y: number; items: OfficeContextMenuItem[]; badge?: number }
}

export interface OfficeContextMenuItem {
  label: string // "-" draws a separator
  active?: boolean // highlighted row (the item being pointed at / changed)
  badge?: number
}

export interface OfficeExcel {
  name?: string // name box, e.g. "F8"
  formula?: string // formula bar text, e.g. "=VLOOKUP(B8,$H$5:$J$10,2,FALSE)"
  formulaBadge?: number
  cols: { label: string; width?: number }[] // column headers A, B, C ...; width in px at zoom 1 (default 120)
  rows: { cells: string[]; style?: "title" | "sub" | "head" | "total" | "note" | "blank"; badge?: number }[] // row 1 = rows[0]
  selected?: string // highlighted cell address, e.g. "F8"
  sheets?: string[] // sheet tabs, first one active
}

export interface OfficeWordPage {
  header?: string
  footer?: string
  badge?: number
  blocks: {
    t: "title" | "subtitle" | "h1" | "h2" | "p" | "toc" | "table" | "meta" | "rule" | "space" | "placeholder"
    text?: string // toc: "1. 개요 ........ 3" style lines are split on "|" into label | page
    rows?: string[][] // table only, first row = header
  }[]
}

export interface OfficePptSlide {
  title: string
  sub?: string
  layout?: "title" | "bullets" | "cards" | "table" | "timeline" | "closing"
  items?: string[] // bullets / card labels / timeline points ("date label", e.g. "3/27 진해군항제 시작") / table rows ("a|b|c"); closing: items[0] is the thank-you line
  badge?: number
  accent?: string // hex override for this slide's accent color, default the deck accent (#c43e1c)
  date?: string // title layout only: small date/presenter line under the subtitle
}

export interface OfficePanel {
  model?: string // "Sonnet 5"
  mode?: "ask" | "accept" // hand icon state: Ask before edits / Accept all edits
  messages: { role: "user" | "assistant"; text: string; steps?: string[] }[] // steps = dim tool lines under an answer
  input?: string // placeholder or typed text, default "Ask Claude..."
  menu?: boolean // show the Ask before edits / Accept all edits menu open
  badge?: number
}

/** A small file card: a tab with the file name and a few lines; `mark` highlights a substring. */
export interface FileScreen {
  kind: "file"
  name: string
  lines: string[]
  mark?: string
  badge?: number
  large?: boolean // bigger type, centred in the slide (a file card that is the whole visual)
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
    file?: { name: string; size?: string } // an attached file card (e.g. a .md the assistant made or the user uploads)
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
  imageEditor?: { file: string; src: string; meta?: string; badge?: number } // VS Code image viewer tab showing a real picture
  toast?: { text: string; buttons: { label: string; primary?: boolean; badge?: number }[] } // bottom-right notification
  explorerAction?: { icon: "newFile" | "newFolder"; badge?: number } // the icons on the explorer header
  keycap?: { keys: string[]; times?: number; badge?: number } // a shortcut drawn over the window, e.g. ["Ctrl", "J"]
}

export interface TerminalScreen {
  kind: "terminal"
  terminal: Terminal
}

export interface ShotScreen {
  kind: "shot"
  src: string // real capture
  // numbered badges pinned on the picture; x / y in percent of the image (0-100), e.g. the menu item to click
  badges?: { n: number; x: number; y: number }[]
}

// A real recording played in the slide's preview area (e.g. the mp4 the student's own render produced).
// Used only where the result IS a video; a still capture stays a ShotScreen.
export interface VideoScreen {
  kind: "video"
  src: string // mp4 in public/, e.g. "/video/ball_adventure.mp4"
  poster?: string // still frame shown before play, in public/
  loop?: boolean
}

export type Vendor = "claude" | "antigravity" | "codex" | "shell"

/** one coloured run of the terminal status footer; no `c` means the footer red */
export interface FooterSeg {
  t: string
  c?: "red" | "sky" | "dim"
}

export interface Terminal {
  vendor: Vendor
  cwd?: string
  prompt?: string // shell only: replaces the "PS <cwd>>" prompt, e.g. "student@MacBook ~ %" on macOS
  /** conversation, oldest first; `badge` pins a numbered badge next to that line */
  turns: { role: "user" | "assistant" | "tool"; text: string; badge?: number; mark?: string }[] // mark = substring drawn as drag-selected text
  usage?: { label: string; pct: number; resets: string; badge?: number }[] // /usage bar gauges after the turns
  // a slash-command panel drawn under a rule line (e.g. /chrome); each row is segments with an optional colour
  panel?: { title: string; tone?: "danger"; rows: { seg: { t: string; c?: "green" | "dim" | "accent" | "bold" | "tab" | "red" }[]; badge?: number }[] }
  // /resume session picker: optional search box, the folder it lists, sessions newest first
  picker?: { title?: string; search?: boolean; folder?: string; folderBadge?: number; items: { name: string; meta: string; selected?: boolean; badge?: number }[] }
  sessionTag?: { name: string; badge?: number } // session name shown as a light-blue tag on the input box
  // status line under the input box, e.g. "bypass permissions on".
  // `text` alone renders all red (the legacy look). Real Claude Code colours the parts
  // differently, so `seg` spells the parts out: "red" = the permission mode, "sky" = a live
  // resource count like "1 shell", "dim" = a keyboard hint. `text` stays as the plain-text
  // source of truth (search, diffs) and must equal the segments joined; `seg` wins when present.
  footer?: { text: string; seg?: FooterSeg[]; badge?: number }
  input?: { text?: string; placeholder?: string; badge?: number }
  fit?: boolean // scale the whole terminal so the content fills the window (no dark gap, nothing cut)
  // a titled divider right above the input box, e.g. "진해군항제 심층조사(하위 에이전트 수합)" inside a subagent
  rule?: { text: string; badge?: number }
  // background agent list under the footer (the "← for agents" view): main, general-purpose (+2), tree rows
  agents?: {
    hint?: string // dim line above the list, e.g. "Enter to view · x to stop"
    rows: {
      name: string // "main" / "general-purpose"
      count?: number // nested agents, drawn "(+2)"
      label?: string // task description, cut with an ellipsis when long
      meta?: string // right side, e.g. "19s · ↓ 63.7k tokens"
      tree?: "├" | "└" // child row of the row above
      active?: boolean // ● instead of ◯ (the one you are looking at)
      selected?: boolean // ❯ cursor
      badge?: number
    }[]
    more?: string // "↓ 1 more"
    badge?: number
  }
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
