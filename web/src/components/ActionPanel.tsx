import { useState } from "react"
import { CheckIcon, CopyIcon, DownloadIcon, LinkIcon } from "lucide-react"
import type { ActionBox, ActionItem } from "@/content/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// The action box: what the student does with this slide. Rendered from slide.action only.
export function ActionPanel({ action }: { action?: ActionBox }) {
  if (!action) return null
  return (
    <section className="flex flex-col gap-3">
      <span className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">액션</span>
      <Card size="sm" className="ring-slide-accent/30">
        <CardHeader>
          <CardTitle className="text-base">{action.label}</CardTitle>
          <CardDescription>이 슬라이드에서 바로 쓰는 것</CardDescription>
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
              void navigator.clipboard?.writeText(it.value)
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
