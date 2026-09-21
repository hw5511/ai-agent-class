// Agent terminal mock, laid out the way every agent TUI is: vendor banner at the top, conversation in
// the middle (newest line kept in view), input box docked to the bottom. Pure flex; no coordinates.
// A line with `badge` gets a numbered badge in the left gutter of that very row.
import type { Terminal } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { VendorBanner } from "./VendorBanner"
import { cn } from "@/lib/utils"

// "{{today}}" in a line becomes the viewer's local date (YYYY-MM-DD), so an answer that reports the
// current date always shows the day the page is opened (CEO 2026-09-22 easter egg).
function live(text: string) {
  if (!text.includes("{{today}}")) return text
  const d = new Date()
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  return text.replaceAll("{{today}}", today)
}

export function AgentTerminal({ t, className }: { t: Terminal; className?: string }) {
  const shell = t.vendor === "shell"
  const hasBadges = t.turns.some((x) => x.badge) || !!t.input?.badge || !!t.usage?.some((u) => u.badge) || !!t.panel?.rows.some((r) => r.badge)
  return (
    <div className={cn("flex h-full min-h-0 flex-col bg-[#0c0d0e] font-term leading-[1.6] text-[#e8eaec]", shell ? "text-[26px]" : "text-[22px]", className)}>
      <div className={cn("flex min-h-0 flex-1 flex-col gap-5 overflow-hidden px-5 pt-4", hasBadges && "pl-2")}>
        {!shell && <Row gutter={hasBadges}><VendorBanner vendor={t.vendor} cwd={t.cwd} /></Row>}
        <div className={cn("flex min-h-0 flex-1 flex-col gap-4 overflow-hidden pb-2", !shell && "justify-end")}>
          {t.turns.map((turn, i) => (
            <Row key={i} gutter={hasBadges} badge={turn.badge}>
              {shell ? (
                turn.role === "user" ? (
                  <span className="break-all">
                    <span className="text-[#767c81]">{t.prompt ? `${t.prompt} ` : `PS ${t.cwd ?? "C:\\"}> `}</span>
                    {live(turn.text)}
                  </span>
                ) : (
                  <span className={cn("break-all", turn.role === "tool" ? "rounded bg-[#1d3a57] px-1 font-bold text-[#cfe6ff]" : "text-[#b8bcc0]")}>{live(turn.text)}</span>
                )
              ) : (
                <span className={cn("flex gap-3", turn.role === "user" && "text-[#8b9095]")}>
                  <span className="shrink-0">{turn.role === "user" ? ">" : "●"}</span>
                  <span className={cn("break-keep [overflow-wrap:anywhere]", turn.role === "tool" && "font-bold")}>{live(turn.text)}</span>
                </span>
              )}
            </Row>
          ))}
          {t.panel && (
            <div className="flex flex-col gap-1 border-t border-[#3a3d40] pt-3 text-[19px]">
              <Row gutter={hasBadges}><span className="font-bold text-[#e8eaec]">{t.panel.title}</span></Row>
              {t.panel.rows.map((r, i) => (
                <Row key={`p${i}`} gutter={hasBadges} badge={r.badge}>
                  <span className="whitespace-pre-wrap">
                    {r.seg.map((g, j) => (
                      <span key={j} className={cn(
                        g.c === "green" && "font-bold text-[#4ec27a]",
                        g.c === "dim" && "text-[#767c81]",
                        g.c === "accent" && "text-[#d97757]",
                        g.c === "bold" && "font-bold",
                        !g.c && "text-[#b8bcc0]",
                      )}>{g.t}</span>
                    ))}
                    {r.seg.length === 0 ? " " : null}
                  </span>
                </Row>
              ))}
            </div>
          )}
          {t.usage?.map((u, i) => (
            <Row key={`u${i}`} gutter={hasBadges} badge={u.badge}>
              <div className="flex flex-col gap-1.5 pl-6">
                <span className="font-bold text-[#e8eaec]">{u.label}</span>
                <span className="flex items-center gap-4">
                  <span className="relative h-5 w-[420px] max-w-[60%] shrink-0 overflow-hidden rounded-sm bg-[#2a2d30]">
                    <span className="absolute inset-y-0 left-0 bg-[#d97757]" style={{ width: `${u.pct}%` }} />
                  </span>
                  <span className="text-[#b8bcc0]">{u.pct}% used</span>
                </span>
                <span className="text-[18px] text-[#767c81]">Resets {u.resets}</span>
              </div>
            </Row>
          ))}
        </div>
      </div>
      {!shell && (
        <div className={cn("flex flex-col gap-1 px-5 pb-4", hasBadges && "pl-2")}>
          <Row gutter={hasBadges} badge={t.input?.badge}>
            <div className="flex items-center gap-3 rounded-md border border-[#3a3d40] px-4 py-2">
              <span className="text-[#767c81]">&gt;</span>
              {t.input?.text ? <span>{t.input.text}<span className="ml-0.5 inline-block h-6 w-3 translate-y-1 bg-[#cfd2d4]" /></span> : <span className="text-[#5b5e61]">{t.input?.placeholder ?? ""}</span>}
            </div>
          </Row>
          <Row gutter={hasBadges}>
            <span className="text-[18px] text-[#5b5e61]">? for shortcuts</span>
          </Row>
        </div>
      )}
    </div>
  )
}

function Row({ gutter, badge, children }: { gutter: boolean; badge?: number; children: React.ReactNode }) {
  if (!gutter) return <div className="min-w-0">{children}</div>
  return (
    <div className="flex min-w-0 items-start gap-2">
      <div className="flex w-11 shrink-0 justify-center pt-0.5">{badge ? <NumberBadge n={badge} size="sm" /> : null}</div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
