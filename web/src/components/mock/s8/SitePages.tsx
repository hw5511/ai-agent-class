// One switch from SitePage data to its mock body (rendered inside ChromeFrame, below the toolbar). Each page
// type has its own component under ./site/, drawn from a real capture (E:/wi-data/projects/ai-agent-class/s8-captures).
import type { SitePage } from "@/content/schema-site"
import { GithubSignup } from "./site/GithubSignup"
import { GoogleChooser } from "./site/GoogleChooser"
import { GithubDevice } from "./site/GithubDevice"
import { GithubDashboard } from "./site/GithubDashboard"
import { GithubRepo } from "./site/GithubRepo"
import { GithubTrending } from "./site/GithubTrending"
import { GithubApp } from "./site/GithubApp"
import { ClaudeOpenApp } from "./site/ClaudeOpenApp"
import { ClaudeDownload } from "./site/ClaudeDownload"

export function SitePageBody({ p }: { p: SitePage }) {
  if (p.type === "github-signup") return <GithubSignup p={p} />
  if (p.type === "google-chooser") return <GoogleChooser p={p} />
  if (p.type === "github-device") return <GithubDevice p={p} />
  if (p.type === "github-dashboard") return <GithubDashboard p={p} />
  if (p.type === "github-repo") return <GithubRepo p={p} />
  if (p.type === "github-trending") return <GithubTrending p={p} />
  if (p.type === "github-app") return <GithubApp p={p} />
  if (p.type === "claude-open-app") return <ClaudeOpenApp p={p} />
  return <ClaudeDownload p={p} />
}
