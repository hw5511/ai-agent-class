// Agent terminal mock, laid out the way every agent TUI is: vendor banner at the top, conversation in
// the middle (newest line kept in view), input box docked to the bottom. Pure flex; no coordinates.
// A line with `badge` gets a numbered badge in the left gutter of that very row.
import type { Terminal } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { VendorBanner } from "./VendorBanner"
import { cn } from "@/lib/utils"

export function AgentTerminal({ t, className }: { t: Terminal; className?: string }) {
  const shell = t.vendor === "shell"
  const hasBadges = t.turns.some((x) => x.badge) || !!t.input?.badge
  return (
    <div className={cn("flex h-full min-h-0 flex-col bg-[#0c0d0e] font-term leading-[1.6] text-[#e8eaec]", shell ? "text-[26px]" : "text-[22px]", className)}>
      <div className={cn("flex min-h-0 flex-1 flex-col gap-5 overflow-hidden px-5 pt-4", hasBadges && "pl-2")}>
        {!shell && <Row gutter={hasBadges}><VendorBanner vendor={t.vendor} cwd={t.cwd} /></Row>}
        <div className={cn("flex min-h-0 flex-1 flex-col gap-4 overflow-hidden pb-2", !shell && "justify-end")}>
          {t.turns.map((turn, i) => (
            <Row key={i} gutter={hasBadges} badge={turn.badge}>
              {shell ? (
                <span>
                  <span className="text-[#767c81]">PS {t.cwd ?? "C:\\"}&gt; </span>
                  {turn.text}
                </span>
              ) : (
                <span className={cn("flex gap-3", turn.role === "user" && "text-[#8b9095]")}>
                  <span className="shrink-0">{turn.role === "user" ? ">" : "●"}</span>
                  <span className={cn("break-keep [overflow-wrap:anywhere]", turn.role === "tool" && "font-bold")}>{turn.text}</span>
                </span>
              )}
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
