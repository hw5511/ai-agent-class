import { useState } from "react"
import { CheckIcon, CopyIcon, DownloadIcon, LinkIcon } from "lucide-react"
import type { ActionBox, ActionItem } from "@/content/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// navigator.clipboard only exists on https/localhost; the class site is served over plain http on the
// office IP, so fall back to a hidden textarea + execCommand("copy") there.
function copyText(text: string): boolean {
  if (window.isSecureContext && navigator.clipboard) {
    void navigator.clipboard.writeText(text)
    return true
  }
  const ta = document.createElement("textarea")
  ta.value = text
  ta.setAttribute("readonly", "")
  ta.style.position = "fixed"
  ta.style.opacity = "0"
  document.body.appendChild(ta)
  ta.select()
  let ok = false
  try {
    ok = document.execCommand("copy")
  } catch {
    ok = false
  }
  document.body.removeChild(ta)
  return ok
}

// The action box: what the student does with this slide. Rendered from slide.action only.
export function ActionPanel({ action }: { action?: ActionBox }) {
  if (!action) return null
  return (
    <section className="flex flex-col gap-3">
      <Card size="sm" className="ring-slide-accent/30">
        <CardHeader>
          <CardTitle className="text-base">{action.label}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {action.items.map((it, i) => (
            <Item key={i} it={it} />
          ))}
        </CardContent>
      </Card>
    </section>
  )
}

function Item({ it }: { it: ActionItem }) {
  const [done, setDone] = useState(false)
  if (it.kind === "copy") {
    return (
      <div className="flex flex-col gap-1">
        {it.desc && <span className="text-sm text-muted-foreground">{it.desc}</span>}
        <div className="flex items-center gap-2 rounded-md bg-muted p-2">
          <code className="min-w-0 flex-1 truncate font-term text-sm" title={it.value}>{it.value}</code>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (!copyText(it.value)) return
              setDone(true)
              setTimeout(() => setDone(false), 1500)
            }}
          >
            {done ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
            {done ? "복사됨" : "복사"}
          </Button>
        </div>
      </div>
    )
  }
  const Icon = it.kind === "download" ? DownloadIcon : LinkIcon
  return (
    <Button variant="outline" className="min-w-0 justify-start" render={<a href={it.href} target="_blank" rel="noopener" title={it.href} />}>
      <Icon data-icon="inline-start" />
      <span className="min-w-0 truncate">{it.desc ? `${it.desc} — ` : ""}{it.text}</span>
    </Button>
  )
}
