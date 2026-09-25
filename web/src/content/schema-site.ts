// Web pages drawn inside the Chrome frame (ChromeFrame.tsx wraps these): GitHub, Google sign-in,
// claude.com/download. Every mock is drawn from a real capture in E:/wi-data/projects/ai-agent-class/s8-captures.
// Personal data (names, real emails, real repo owners) never appears here — use placeholders such as
// 수강생 / student@gmail.com / student/cafe-landing, or public data (microsoft/markitdown, real trending repos).

export type SitePage =
  | GithubSignupPage
  | GoogleChooserPage
  | GithubDevicePage
  | GithubDashboardPage
  | GithubRepoPage
  | GithubTrendingPage
  | GithubAppPage
  | ClaudeOpenAppPage
  | ClaudeDownloadPage

/** github.com/signup: black left panel (included features) + right sign-up form. */
export interface GithubSignupPage {
  type: "github-signup"
  googleBadge?: number // "Continue with Google" button
  appleBadge?: number // "Continue with Apple" button
  emailBadge?: number // Email field
  usernameBadge?: number // Username field
  createBadge?: number // green "Create account" button
}

/** accounts.google.com account chooser, reused for GitHub's and Claude's "계정을 선택하세요" step. */
export interface GoogleChooserPage {
  type: "google-chooser"
  app: "github" | "claude" // which app logo/name the card shows ("GitHub(으)로 이동" / "Claude(으)로 이동")
  accounts: { initial: string; name: string; email: string; color?: string; badge?: number }[] // avatar rows, from data
  otherAccountBadge?: number // "다른 계정 사용" row
}

/** github.com/sessions/verified-device: email code card + trouble box. */
export interface GithubDevicePage {
  type: "github-device"
  maskedEmail: string // e.g. "s***********@gmail.com" — never a real address
  expires?: string // e.g. "11:26AM KST"
  codeBadge?: number // the XXXXXX code input
  verifyBadge?: number // green Verify button
}

/** github.com dashboard (logged in): left "Top repositories", Home with Copilot ask box, Feed, right changelog. */
export interface GithubDashboardPage {
  type: "github-dashboard"
  repos: { name: string; badge?: number }[] // "Top repositories" rows, e.g. [{ name: "student/cafe-landing" }]
  newBadge?: number // green "New" button
  askBoxBadge?: number // the "Ask anything..." Copilot box
  changelog: { time: string; title: string }[] // "Latest from our changelog" items
  trending: { owner: string; name: string; desc: string; lang: string; langColor: string; stars: string; badge?: number }[] // Feed trending cards
}

/** A GitHub repo page (Code tab), logged out or logged in. */
export interface GithubRepoPage {
  type: "github-repo"
  loggedIn?: boolean // true: user avatar in the black nav; default/false: Sign in / Sign up
  owner: string
  name: string
  forks: string // "13.8k"
  stars: string // "187k"
  tabs: { label: string; count?: number; active?: boolean; badge?: number }[]
  branch: string // "main"
  branchesCount: number
  tagsCount: number
  lastCommit: { author: string; message: string; sha: string; when: string }
  files: { name: string; folder?: boolean; message: string; when: string; badge?: number }[]
  readme: { heading: string; lines: string[]; badge?: number }
  about: {
    desc: string
    topics: string[]
    license: string
    stars: string
    watching: string
    forks: string
    badge?: number
  }
  releases?: { version: string; latest?: boolean; when: string; count: number }
  codeBadge?: number // green "Code" button
  starBadge?: number // "Star" button in the header row
}

/** github.com/trending: repo rows with language, stars today, and Star buttons. */
export interface GithubTrendingPage {
  type: "github-trending"
  filterBadge?: number // the Spoken Language / Language / Date range filter row
  repos: {
    owner: string
    name: string
    desc: string
    lang?: string
    langColor?: string
    stars: string
    forks: string
    today: string // "347 stars today"
    sponsor?: boolean
    badge?: number // that row's Star button
  }[]
}

/** github.com/apps/<name>: a GitHub App's public page (used for the Claude app). */
export interface GithubAppPage {
  type: "github-app"
  name: string // "Claude"
  developer: string // "anthropics"
  website?: string
  desc: string[] // paragraphs
  nameBadge?: number
}

/** claude.ai/login/popup-google-auth: grey "Claude 앱에서 로그인 완료하기" page, with the Chrome protocol dialog on top. */
export interface ClaudeOpenAppPage {
  type: "claude-open-app"
  openBadge?: number // the page's own black "Claude 열기" button
  dialogOpenBadge?: number // the dialog's green "Claude 열기" button
  dialogCancelBadge?: number // the dialog's "취소" button
}

/** claude.com/download: header, hero, Get started, Desktop / Mobile download cards. */
export interface ClaudeDownloadPage {
  type: "claude-download"
  windowsBadge?: number // black "Download for Windows" button
  armBadge?: number // "Windows (arm64)" button next to it
  desktop: { os: string; note?: string; badge?: number }[] // macOS / Windows / Windows (arm 64) / Linux rows
  mobile: { os: string; badge?: number }[] // iOS / Android rows
}
