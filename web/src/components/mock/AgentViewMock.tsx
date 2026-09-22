// Claude Code's full-screen Agent View (kind "agentview"): a dark, full-screen list of sessions by
// state (Working / Completed ...), with an input box docked to the bottom for starting a new one.
// Same palette/fonts as AgentTerminal; content starts at the top, input+footer stay at the bottom.
import type { AgentViewScreen } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

export function AgentViewMock({ s }: { s: AgentViewScreen }) {
  const hasBadges =
    !!s.countsBadge ||
    !!s.noticeBadge ||
    !!s.input?.badge ||
    s.groups.some((g) => g.rows.some((r) => r.badge))

  return (
    <div className="h-full min-h-0 overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(16,17,19,0.16)]">
      <div className={cn("flex h-full min-h-0 flex-col gap-4 bg-[#0c0d0e] px-8 py-6 font-term text-[30px] leading-[1.5] text-[#e8eaec]", hasBadges && "pl-3")}>
        <Row gutter={hasBadges}>
          <div className="flex items-center gap-2">
            <span className="text-[#d97757]">✻</span>
            {s.version ? <span className="font-bold">{s.version}</span> : null}
          </div>
        </Row>
        {s.model ? (
          <Row gutter={hasBadges}>
            <span className="text-[#767c81]">{s.model}</span>
          </Row>
        ) : null}

        <Row gutter={hasBadges} badge={s.countsBadge}>
          <span>{s.counts}</span>
        </Row>

        {s.notice ? (
          <Row gutter={hasBadges} badge={s.noticeBadge}>
            <span className="break-keep text-[#767c81] [overflow-wrap:anywhere]">{s.notice}</span>
          </Row>
        ) : null}

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden pt-2">
          {s.groups.map((g, gi) => (
            <div key={gi} className="flex min-h-0 flex-col gap-1">
              <Row gutter={hasBadges}>
                <span className="font-bold text-[#e8eaec]">{g.title}</span>
              </Row>
              {g.rows.map((r, ri) => {
                const icon = r.icon ?? "✶"
                return (
                  <Row key={ri} gutter={hasBadges} badge={r.badge}>
                    <div className={cn("flex min-w-0 items-center gap-3 rounded px-1", r.selected && "bg-[#1d2022]")}>
                      <span className={cn("w-5 shrink-0", r.selected ? "text-[#d97757]" : "text-transparent")}>❯</span>
                      <span className={cn("w-5 shrink-0", icon === "✻" ? "text-[#5f9e6b]" : "text-[#d97757]")}>{icon}</span>
                      <span className={cn("shrink-0 whitespace-nowrap", r.selected && "font-bold")}>{r.name}</span>
                      {r.desc ? (
                        <span className="min-w-0 flex-1 truncate text-[#767c81]">{r.desc}</span>
                      ) : (
                        <span className="min-w-0 flex-1" />
                      )}
                      {r.time ? <span className="shrink-0 whitespace-nowrap text-[#767c81]">{r.time}</span> : null}
                    </div>
                  </Row>
                )
              })}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1 pt-2">
          <Row gutter={hasBadges} badge={s.input?.badge}>
            <div className="flex items-center gap-3 rounded-md border border-[#3a3d40] px-4 py-2">
              <span className="text-[#767c81]">&gt;</span>
              {s.input?.text ? (
                <span className="truncate">{s.input.text}</span>
              ) : (
                <span className="truncate text-[#5b5e61]">{s.input?.placeholder ?? ""}</span>
              )}
            </div>
          </Row>
          {s.footer ? (
            <Row gutter={hasBadges}>
              <span className="text-[24px] text-[#767c81]">{s.footer}</span>
            </Row>
          ) : null}
        </div>
      </div>
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
