// Web pages drawn inside the Chrome frame (ChromeFrame.tsx wraps these): GitHub, Google sign-in,
// claude.com/download. Every mock is drawn from a real capture in E:/wi-data/projects/ai-agent-class/s8-captures.
// Personal data (names, real emails, real repo owners) never appears here — use placeholders such as
// 수강생 / student@gmail.com / student/cafe-landing, or public data (microsoft/markitdown, real trending repos).

export type SitePage =
  | GithubSignupPage
  | GoogleChooserPage
  | GithubDevicePage
  | GithubDeviceCodePage
  | GithubDashboardPage
  | GithubRepoPage
  | GithubTrendingPage
  | GithubSearchPage
  | GithubAppPage
  | GithubAppInstallPage
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

/** github.com/login/device, logged in: GitHub mark, "Device Activation", 8-digit code split 4-4, green Continue. */
export interface GithubDeviceCodePage {
  type: "github-device-code"
  code: string // 8 chars as "XXXX-XXXX", e.g. "A1B2-C3D4" — split into the two 4-box groups
  codeBadge?: number // the 8 code boxes
  continueBadge?: number // green "Continue" button
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
  zoom?: number // CSS zoom on the mock's root, e.g. 1.35 — enlarges a real-pixel-size mock so it reads from the back of the room
  owner: string
  name: string
  nameBadge?: number // badges the owner/name heading
  forks: string // "13.8k", or "0" for a brand-new repo
  stars: string // "187k", or "0" for a brand-new repo
  tabs: { label: string; count?: number; active?: boolean; badge?: number }[]
  branch: string // "main"
  branchesCount: number
  tagsCount: number
  lastCommit: { author: string; message: string; sha: string; when: string; badge?: number }
  files: { name: string; folder?: boolean; message: string; when: string; badge?: number }[]
  // Omit for a brand-new repo with no README yet: renders GitHub's "Add a README" empty state instead.
  readme?: { file?: string; heading: string; lines: string[]; badge?: number } // file default "README.md"
  readmeBadge?: number // badges the "Add a README" empty-state box (only used when readme is absent)
  about: {
    desc?: string // omit for a brand-new repo: renders "No description, website, or topics provided."
    topics: string[] // may be empty
    license?: string // omit to hide the license row (no license file yet)
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

/** github.com/search?q=...&type=repositories: filter column + repo result rows. */
export interface GithubSearchPage {
  type: "github-search"
  query: string // the text shown in the search box, e.g. "pdf to markdown"
  resultCount: string // "6.6k results", shown next to the Repositories filter
  searchBadge?: number // the search box
  results: {
    owner: string
    name: string
    desc: string
    lang?: string
    langColor?: string
    stars: string
    updated: string // "4 days ago"
    badge?: number // that row
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

/** github.com/apps/<name>/installations/new: repository access picker + green Install button. */
export interface GithubAppInstallPage {
  type: "github-app-install"
  appName: string // "Claude"
  repos: string[] // selected repository chips, e.g. ["student/cafe-landing"]
  permissions: string[] // permission summary lines
  selectionBadge?: number // "Only select repositories" radio + the repo chip
  installBadge?: number // green "Install" button
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
