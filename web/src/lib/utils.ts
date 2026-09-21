export { cn } from "cn"

// Content JSON writes public files as root paths ("/illustrations/x.svg"). The site is served under
// a sub-path on GitHub Pages (/ai-agent-class/), so every such path goes through BASE_URL here.
export function asset(p: string | undefined): string | undefined {
  if (!p || !p.startsWith("/") || p.startsWith("//")) return p
  return import.meta.env.BASE_URL + p.slice(1)
}
