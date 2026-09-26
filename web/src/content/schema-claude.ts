// Claude desktop app (Claude for Windows) and claude.ai/code in the browser: they share one body, drawn from
// real captures (E:/wi-data/projects/ai-agent-class/s8-captures). ClaudeAppWindow draws the whole desktop
// window (title bar + body); ClaudeAppBody draws just the body, used inside a Chrome tab for the web captures
// (there the sidebar is collapsed to its toggle icon, matching web_code_desktop.png / cs_*.png / connectors.png).
// Fixed chrome text that is identical in every capture (splash copy, "새로 생성", "Artifacts", ...) is hard-coded
// in ClaudeApp.tsx; everything else (greetings, session content, account name, folder names) comes from here.
export interface ClaudeAppView {
  screen: "splash" | "login" | "home" | "session" | "customize" | "settings" // which body this view renders

  // ---- title bar (ClaudeAppWindow only; the browser's own chrome covers this for the web captures) ----
  titleBar?: ClaudeTitleBar

  // ---- splash (desk_01_login.png cookie banner state, desk_02.png "시작하기" state) ----
  cookieBanner?: { customizeBadge?: number; rejectBadge?: number; agreeBadge?: number } // dark "쿠키 설정" banner
  startBadge?: number // the "시작하기" button (shown when there is no cookie banner)

  // ---- login (desk_03.png) ----
  login?: { googleBadge?: number; emailBadge?: number; continueBadge?: number }

  // ---- sidebar (home / session / customize): present = drawn expanded; absent = just the toggle icon,
  // matching the web captures where the app is embedded in a Chrome tab ----
  sidebar?: ClaudeSidebar

  // ---- home (desk_07 - desk_16) ----
  home?: ClaudeHome

  // ---- session (desk_17 - desk_19, cs_08 - cs_10, dk_cloud_sync.png) ----
  session?: ClaudeSession

  // ---- env row: local-folder / cloud-repo chips + credit banner, home screen only, above the input ----
  env?: ClaudeEnv

  // ---- shared bottom composer (home + session): input box and the +/mic/mode/model/effort row ----
  input?: { text?: string; placeholder?: string; badge?: number } // default placeholder "작업을 설명하거나 질문하세요"
  bottomBar?: ClaudeBottomBar
  mascot?: boolean // the small orange pixel-art mascot above the input; default = screen === "home" (captures
  // show it only on home screens, never on session screens) — set explicitly to override that default

  // ---- overlays: at most one open at a time, drawn on top of whatever screen is behind it ----
  menu?: ClaudeMenu // an open mode / model / plus / folder / slash dropdown
  dialog?: ClaudeDialog // the trust dialog or the native Windows folder picker
  githubPopover?: ClaudeGithubPopover // the blue "리포지토리에서 작업하기 위한 두 단계" card (web_code_desktop.png)

  // ---- customize (사용자 지정) page (connectors.png) ----
  customize?: ClaudeCustomize

  // ---- settings (설정 > Claude Code) page, e.g. desktop-settings.png reference ----
  settings?: ClaudeSettings
}

/** Desktop window chrome: ≡ / sidebar toggle / back / forward on the left, a chat-code toggle in the middle
 *  (home only), "새로운 기능" + the — ▢ ✕ buttons on the right (always the same, so not drawn from data). */
export interface ClaudeTitleBar {
  sidebarBadge?: number
  backBadge?: number
  forwardBadge?: number
  toggle?: "chat" | "code" // which half of the chat/code pill is active; default "code"
  toggleBadge?: number
  newFeatureBadge?: number // the "새로운 기능" link, top right
}

/** The left sidebar: search, the four fixed action rows, then either the empty "최근 항목" state or session
 *  groups, then the account footer. */
export interface ClaudeSidebar {
  searchBadge?: number
  newBadge?: number // "새로 생성"
  artifactsBadge?: number
  customizeBadge?: number
  moreBadge?: number // "더보기"
  recentFilterBadge?: number // the small filter icon next to "최근 항목"
  groups?: ClaudeSidebarGroup[] // omit for the empty "현재 필터와 일치하는 세션이 없습니다" state (desk_07/08)
  account: string // footer account line, e.g. "수강생 · Pro" — no real names
  accountBadge?: number
}

/** One project heading in "최근 항목" (e.g. "에이전트1", "cafe-landing") with its session rows underneath. */
export interface ClaudeSidebarGroup {
  title: string
  collapsible?: boolean // draws a ⌄ after the title (a cloud repo group, e.g. "cafe-landing")
  addBadge?: number // the small "+" icon on the group heading
  rows: { icon?: "local" | "branch" | "dot"; label: string; active?: boolean; badge?: number }[]
}

/** Home screen: the greeting, the usage-stats card, and (further down, once the app has been used) nothing
 *  else — the folder/credit/input row lives in `env` / `input` / `bottomBar` since a session screen needs
 *  the composer too. */
export interface ClaudeHome {
  greeting: string // e.g. "수강생님, 다음 일정은 무엇인가요?" — no real student names
  greetingBadge?: number
  stats?: ClaudeStats
}

/** The usage-stats card under the greeting. `skeleton` draws the six grey loading blocks (desk_07/08); once
 *  loaded, `metrics` fills them and `heatmap` draws the activity grid below (desk_14 blurred / desk_15-19). */
export interface ClaudeStats {
  tabs?: string[] // default ["개요", "모델"]
  activeTab?: string // default tabs[0]
  ranges?: string[] // default ["전체", "30일", "7d"]
  activeRange?: string // default ranges[0]
  skeleton?: boolean
  metrics?: { label: string; value: string }[] // six cells, e.g. { label: "세션", value: "11,959" }
  heatmap?: boolean // draw the activity grid (desk_15 onward)
  caption?: string // e.g. "The Lord of the Rings보다 약 570배 더 많은 토큰을 사용했습니다."
  badge?: number
}

/** The row of chips above the input (local folder or cloud repo) plus the credit banner, home screen only. */
export interface ClaudeEnv {
  chips: ClaudeChip[]
  addFolderBadge?: number // the small add-folder icon after the chips (desk_15 onward)
  creditBanner?: { text: string; buttonText?: string; buttonBadge?: number; closeBadge?: number }
  repoPicker?: ClaudeRepoPicker // an open dropdown anchored to the "+ 저장소 선택..." chip, listing the student's repos
}

/** The repo-select dropdown opened from the env row's repo chip: a search box then a list of the student's
 *  GitHub repos, one checked/selected. */
export interface ClaudeRepoPicker {
  query?: string // typed filter text shown in the search box, e.g. "cafe"
  repos: { name: string; selected?: boolean; badge?: number }[]
}

export interface ClaudeChip {
  icon?: "local" | "folder" | "cloud" | "plus"
  label: string // e.g. "로컬", "폴더 없음", "에이전트1", "Default", "+ 저장소 선택..."
  badge?: number
}

/** The composer's bottom row: attach / mic / mode label on the left, model / effort / status circle on the right. */
export interface ClaudeBottomBar {
  plusBadge?: number
  micBadge?: number
  mode: string // current mode label, e.g. "자동", "수동"
  modeBadge?: number
  model: string // e.g. "Opus 5.5"
  modelBadge?: number
  effort: string // e.g. "중간"
  effortBadge?: number
  busy?: boolean // the status circle spins (a request is in flight), e.g. desk_17 onward
}

/** A session thread: header, message list, and (cloud sessions only) the merged-PR bar above the input. */
export interface ClaudeSession {
  header: ClaudeSessionHeader
  messages: ClaudeMessage[]
  prBar?: ClaudePrBar
  anchorTop?: boolean // default false: when the transcript is taller than the box, keep the newest message
  // visible (anchored to the bottom, clipped at the top) like the real app scrolled to the end. Set true to
  // keep the top of the conversation visible instead (clipped at the bottom) — for slides that must show the
  // start of an answer.
}

export interface ClaudeSessionHeader {
  icon?: "local" | "cloud" // a small monitor icon for a local session, a cloud icon for a claude.ai/code one
  title: string // e.g. "폴더 구조 설명", "프로젝트 현황 파악"
  titleBadge?: number
  tag?: string // the pill after the ⌄, e.g. "에이전트1", "Default · cafe-landing"
  tagBadge?: number
  actions?: { icon: "terminal" | "plus" | "globe" | "more" | "addPage" | "share"; badge?: number }[]
}

export interface ClaudeMessage {
  role: "user" | "assistant"
  badge?: number
  text?: string // user bubble text (right-aligned, light grey pill)
  blocks?: ClaudeBlock[] // assistant answer, top to bottom
  meta?: { time?: string; badge?: number } // the small icon row + timestamp under a finished answer
}

/** One piece of an assistant answer. `p` / `h` / `ul` / `li` text supports inline `**bold**` and `` `code` ``
 *  spans (rendered as a light chip), same convention as PhoneMessage.text in schema-phone.ts. */
export type ClaudeBlock =
  | { t: "notice"; headline: string; body: string; link?: string } // the grey system note + doc link (desk_17)
  | { t: "ran"; label: string; badge?: number } // the dim "실행됨 명령 2개 >" / "실행됨 명령 1개, 사용함 도구 3개 >" line
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "code"; lines: string[]; badge?: number } // a code block with the copy icon top right
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "asterisk" } // the orange asterisk shown alone once the answer ends

/** The purple merged/open PR bar above the input in a cloud session (cs_10_working.png). */
export interface ClaudePrBar {
  number: string // "#2"
  repo: string // "cafe-landing"
  branch: string // "claude/compassionate-euler-y3nvgu"
  status: string // "병합됨"
  badge?: number
  closeBadge?: number
}

/** An open dropdown: mode / model / plus / folder / slash-command list / filtered slash list. */
export interface ClaudeMenu {
  kind: "mode" | "model" | "plus" | "folder" | "slash" | "slash-filtered"
  title?: string // small grey heading, e.g. "모드"
  items: ClaudeMenuItem[]
  footer?: { label: string; value: string; badge?: number } // the "권한 무시 / 활성화" row under the mode menu
  search?: string // the typed filter shown in the input, e.g. "/card" (slash-filtered)
  tooltip?: string // a small dark tooltip drawn over the transcript (desk_19)
}

export interface ClaudeMenuItem {
  label: string
  desc?: string // second, smaller line under the label (mode/model items)
  tag?: string // small pill after the label, e.g. "기본값"
  shortcut?: string // right-aligned hint, e.g. "1", "Ctrl+U"
  check?: boolean // a check mark on the right (the selected mode/model)
  chevron?: boolean // a > on the right (opens a submenu: 커넥터, 플러그인)
  icon?: "attach" | "slash" | "connector" | "plugin" // left icon (plus menu only)
  active?: boolean // highlighted row (the filtered match under the cursor)
  bold?: string // a bold-highlighted prefix of `label` (the typed filter, e.g. "card" in "cardnews")
  badge?: number
}

/** The trust dialog (desk_14) or the native Windows 11 "로컬 세션용 폴더 선택" picker (desk_13), both drawn
 *  over the current (blurred, for the trust dialog) app screen. */
export interface ClaudeDialog {
  kind: "trust" | "folder-picker"
  path?: string // trust only: the folder path, e.g. "C:\\Users\\student\\Desktop\\에이전트1"
  cancelBadge?: number
  confirmBadge?: number // "작업 공간 신뢰"
  picker?: {
    title?: string // default "로컬 세션용 폴더 선택"
    crumbs?: string[] // address-bar breadcrumb, e.g. ["student"]
    folders?: string[] // folder names in the grid — no personal folder names (.aws, .claude_tokens, ...)
    selected?: string // text in the "폴더:" field
    selectBadge?: number
    cancelBadge?: number
  }
}

/** The blue "리포지토리에서 작업하기 위한 두 단계" popover (web_code_desktop.png), shown above the input once a
 *  cloud session has no repo selected yet. */
export interface ClaudeGithubPopover {
  title: string // "리포지토리에서 작업하기 위한 두 단계"
  steps: { title: string; desc: string }[]
  buttonText: string // "GitHub 연결"
  buttonBadge?: number
  closeBadge?: number
  settingsBadge?: number
}

/** The "사용자 지정" page: 스킬 / 커넥터 / 플러그인 tabs, a search + add row, and a table of rows. */
export interface ClaudeCustomize {
  tab: "스킬" | "커넥터" | "플러그인"
  subTab?: "내 항목" | "탐색" // default "내 항목"
  searchPlaceholder?: string // default "커넥터 검색"
  addBadge?: number // "+ 추가" button
  rows: ClaudeCustomizeRow[]
  directoryBadge?: number // "디렉토리에 제출" button
  docsBadge?: number // "개발자 문서" link
}

/** The "설정" (Settings) window: a fixed left nav (드로잉 hard-coded in the component, same on every page)
 *  and one section of toggle rows on the right, e.g. "로컬 세션" / "권한 무시 허용" (desktop-settings.png
 *  reference, from claude.ai/settings/claude-code — the desktop app renders the same UI). */
export interface ClaudeSettings {
  navActive: string // which left-nav label is highlighted, e.g. "Claude Code"
  section: string // section heading above the rows, e.g. "로컬 세션"
  rows: ClaudeSettingsRow[]
}

export interface ClaudeSettingsRow {
  title: string // e.g. "권한 무시 허용"
  desc: string // the grey explanation line under the title
  link?: string // an underlined link at the end of desc, e.g. "안전한 사용을 위한 모범 사례 보기"
  on: boolean // toggle state
  badge?: number
}

export interface ClaudeCustomizeRow {
  logo?: string // /logos/<name>.svg, e.g. "gmail", "googlecalendar", "googledrive", "notion", "github"
  label: string // e.g. "Gmail", "GitHub 통합"
  type?: string // e.g. "웹"
  tag?: string // small pill next to the type, e.g. "사용자 지정" (a custom connector, no logo)
  connected?: boolean // a check mark; false draws a "연결" button instead
  badge?: number
}
