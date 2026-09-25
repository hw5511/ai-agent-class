// Claude Code on the web, phone view (390x844 design capture: web_code_mobile.png, web_code_mobile_sidebar.png;
// the session view composes elements also seen in cs_10_working.png / dk_cloud_sync.png at mobile width).
export type PhoneView = PhoneHomeView | PhoneSidebarView | PhoneSessionView

/** The blue "리포지토리에서 작업하기 위한 두 단계" card: shown on the home screen and above the sidebar footer. */
export interface PhoneRepoPopover {
  badge?: number // badge on the popover's × close corner
  connectBadge?: number // badge on the white "GitHub 연결" button
}

/** The home / composer screen: greeting, GitHub-connect popover, repo chips, input. */
export interface PhoneHomeView {
  screen: "home" // discriminant
  greeting: string // e.g. "수강생님, 다음 일정은 무엇인가요?" (no real student names)
  sidebarBadge?: number // badge on the top-left sidebar icon
  popover?: PhoneRepoPopover // omit to hide the blue popover card
  chipsBadge?: number // badge on the "Default" / "+ 저장소 선택..." chip row
  input?: { placeholder?: string; badge?: number } // default placeholder "작업을 설명하거나 질문하세요"
  modelBadge?: number // badge on the bottom "Opus 5.5 · 중간" row
}

/** One session-group heading in the sidebar's 최근 항목 list (e.g. "cafe-landing"), with its session rows. */
export interface PhoneSidebarGroup {
  title: string // group heading text (a chevron is drawn after it)
  rows: { label: string; active?: boolean; badge?: number }[] // one row per session, a branch icon before the label
}

/** The slide-out sidebar (× closes it): search, quick actions, recent sessions, account footer. */
export interface PhoneSidebarView {
  screen: "sidebar" // discriminant
  closeBadge?: number // badge on the × close icon
  newBadge?: number // badge on the highlighted "+ 새로 생성" row
  groups?: PhoneSidebarGroup[] // recent sessions grouped by project; omit for the empty "세션이 없습니다" state
  recentBadge?: number // badge on the "최근 항목" row's search/filter icons
  popover?: PhoneRepoPopover // the same GitHub-connect card, shown above the footer
  account: string // footer account line, e.g. "수강생 · Pro" (no real names)
  accountBadge?: number // badge on the account footer row
}

/** One line of a session thread: a user bubble or an assistant paragraph. */
export interface PhoneMessage {
  role: "user" | "assistant" // user = right-aligned grey bubble; assistant = plain left-aligned text
  text: string // inline markup: **bold** and `code chip`
  toolLine?: string // dim "실행됨 명령 1개, 사용함 도구 3개 >" line under an assistant answer
  badge?: number // badge on this message
}

/** The purple merged-PR bar above the input, e.g. "#2  cafe-landing  claude/…  병합됨". */
export interface PhonePR {
  number: string // "#2"
  repo: string // "cafe-landing"
  branch: string // "claude/compassionate-euler-y3nvgu"
  status: string // "병합됨"
  badge?: number
}

/** An open session thread: top bar, messages, optional PR bar, input. */
export interface PhoneSessionView {
  screen: "session" // discriminant
  title: string // session title next to the top-bar chevron, e.g. "프로젝트 현황 파악"
  tag: string // small pill under/at the title, e.g. "Default · cafe-landing"
  sidebarBadge?: number // badge on the top-left sidebar icon
  messages: PhoneMessage[]
  pr?: PhonePR // the purple merged-PR bar, omit when there is none yet
  input?: { placeholder?: string; badge?: number }
  modelBadge?: number // badge on the bottom "Opus 5.5 · 중간" row
}
