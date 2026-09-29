export { cn } from "cn"

// Content JSON writes public files as root paths ("/illustrations/x.svg"). The site is served under
// a sub-path on GitHub Pages (/ai-agent-class/), so every such path goes through BASE_URL here.
export function asset(p: string | undefined): string | undefined {
  if (!p || !p.startsWith("/") || p.startsWith("//")) return p
  return import.meta.env.BASE_URL + p.slice(1)
}

// A bare domain with no scheme, e.g. "claude.ai/directory" or "www.x.com" (first path segment contains
// a dot and looks like a hostname). Deliberately does not match a relative asset path ("assets/..."),
// whose first segment has no dot, nor a URL that already has a scheme ("https://...", "mailto:...").
const BARE_HOST_RE = /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/|$)/i

// Action-panel link/download href: an existing scheme or a root path pass through asset() as before;
// a bare domain (no scheme) gets "https://" prepended so it opens the real site, not a class-site path
// (issue #57: "claude.ai/directory" rendered as <a href="claude.ai/directory">, a relative link).
export function actionHref(href: string): string {
  if (href.startsWith("/")) return asset(href) ?? href
  if (BARE_HOST_RE.test(href)) return `https://${href}`
  return href
}
