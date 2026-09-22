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

// Draws `mark` inside `text` as drag-selected text (blue selection background).
function Marked({ text, mark }: { text: string; mark?: string }) {
  const s = live(text)
  const i = mark ? s.indexOf(mark) : -1
  if (!mark || i < 0) return <>{s}</>
  return (
    <>
      {s.slice(0, i)}
      <span className="bg-[#264f78] text-white outline outline-2 outline-[#3b82f6]">{mark}</span>
      {s.slice(i + mark.length)}
    </>
  )
}

export function AgentTerminal({ t, className }: { t: Terminal; className?: string }) {
  const shell = t.vendor === "shell"
  const hasBadges = t.turns.some((x) => x.badge) || !!t.input?.badge || !!t.usage?.some((u) => u.badge) || !!t.panel?.rows.some((r) => r.badge) || !!t.picker?.folderBadge || !!t.picker?.items.some((x) => x.badge) || !!t.sessionTag?.badge || !!t.footer?.badge || !!t.rule?.badge || !!t.agents?.badge || !!t.agents?.rows.some((r) => r.badge)
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
                    <Marked text={turn.text} mark={turn.mark} />
                  </span>
                ) : (
                  <span className={cn("break-all", turn.role === "tool" ? "rounded bg-[#1d3a57] px-1 font-bold text-[#cfe6ff]" : "text-[#b8bcc0]")}><Marked text={turn.text} mark={turn.mark} /></span>
                )
              ) : (
                (() => {
                  // A line that already carries its own TUI glyph (● ✻ ⎿ ├ └) is drawn as written, without a
                  // second "●" in front; ⎿/├/└ continuation lines are indented under the line above.
                  const own = turn.role !== "user" && /^\s*[●✻✶※⎿├└│]/.test(turn.text)
                  const cont = own && /^\s*[⎿├└│]/.test(turn.text)
                  const text = own ? turn.text.replace(/^\s*● /, "") : turn.text
                  return (
                    <span className={cn("flex gap-3", turn.role === "user" && "text-[#8b9095]", cont && "pl-8 text-[#8b9095]")}>
                      {own && !cont ? <span className="shrink-0">{/^\s*●/.test(turn.text) ? "●" : ""}</span> : null}
                      {!own ? <span className="shrink-0">{turn.role === "user" ? ">" : "●"}</span> : null}
                      <span className={cn("break-keep [overflow-wrap:anywhere]", turn.role === "tool" && "font-bold", own && /^\s*[✻✶※]/.test(turn.text) && "text-[#767c81]")}><Marked text={text} mark={turn.mark} /></span>
                    </span>
                  )
                })()
              )}
            </Row>
          ))}
          {t.panel && (
            <div className={cn("flex flex-col gap-1 text-[19px]", t.panel.tone === "danger" ? "rounded-md border-2 border-[#e5534b] px-2 py-3" : "border-t border-[#3a3d40] pt-3")}>
              {t.panel.title ? <Row gutter={hasBadges}><span className="font-bold text-[#e8eaec]">{t.panel.title}</span></Row> : null}
              {t.panel.rows.map((r, i) => (
                <Row key={`p${i}`} gutter={hasBadges} badge={r.badge}>
                  <span className="whitespace-pre-wrap">
                    {r.seg.map((g, j) => (
                      <span key={j} className={cn(
                        g.c === "green" && "font-bold text-[#4ec27a]",
                        g.c === "dim" && "text-[#767c81]",
                        g.c === "accent" && "text-[#d97757]",
                        g.c === "bold" && "font-bold",
                        g.c === "red" && "font-bold text-[#ff6b61]",
                        g.c === "tab" && "rounded bg-[#e8eaec] px-1.5 font-bold text-[#0c0d0e]",
                        !g.c && "text-[#b8bcc0]",
                      )}>{g.t}</span>
                    ))}
                    {r.seg.length === 0 ? " " : null}
                  </span>
                </Row>
              ))}
            </div>
          )}
          {t.picker && (
            <div className="flex flex-col gap-2 border-t border-[#3a3d40] pt-3 text-[19px]">
              {t.picker.title ? <Row gutter={hasBadges}><span className="font-bold text-[#d97757]">{t.picker.title}</span></Row> : null}
              {t.picker.search ? (
                <Row gutter={hasBadges}>
                  <div className="rounded-lg border border-[#5b5e61] px-3 py-1 text-[#767c81]">⌕ Search…</div>
                </Row>
              ) : null}
              {t.picker.folder ? <Row gutter={hasBadges} badge={t.picker.folderBadge}><span className="pl-2 text-[#8b9095]">{t.picker.folder}</span></Row> : null}
              {t.picker.items.map((x, i) => (
                <Row key={`k${i}`} gutter={hasBadges} badge={x.badge}>
                  <div className="flex gap-2">
                    <span className={cn("w-5 shrink-0", x.selected ? "text-[#d97757]" : "text-transparent")}>❯</span>
                    <div className="flex min-w-0 flex-col">
                      <span className={cn("break-keep [overflow-wrap:anywhere]", x.selected ? "font-bold text-[#d97757]" : "text-[#e8eaec]")}>{x.name}</span>
                      <span className="text-[17px] text-[#767c81]">{x.meta}</span>
                    </div>
                  </div>
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
          {t.rule && (
            <Row gutter={hasBadges} badge={t.rule.badge}>
              <div className="flex items-center whitespace-nowrap text-[#5b5e61]">
                <span>{"─── "}</span>
                <span className="font-bold text-[#b8bcc0]">{t.rule.text}</span>
                <span>{" "}</span>
                <span className="ml-1 h-0 flex-1 border-t border-[#5b5e61]" />
              </div>
            </Row>
          )}
          <Row gutter={hasBadges} badge={t.input?.badge}>
            <div className="relative flex items-center gap-3 rounded-md border border-[#3a3d40] px-4 py-2">
              {t.sessionTag ? (
                <span className="absolute -top-4 right-4 flex items-center gap-2">
                  <span className="rounded bg-[#8fd0ff] px-2 text-[17px] font-bold leading-7 text-[#0c2a40]">{t.sessionTag.name}</span>
                  {t.sessionTag.badge ? <NumberBadge n={t.sessionTag.badge} size="sm" /> : null}
                </span>
              ) : null}
              <span className="text-[#767c81]">&gt;</span>
              {t.input?.text ? <span>{t.input.text}<span className="ml-0.5 inline-block h-6 w-3 translate-y-1 bg-[#cfd2d4]" /></span> : <span className="text-[#5b5e61]">{t.input?.placeholder ?? ""}</span>}
            </div>
          </Row>
          <Row gutter={hasBadges} badge={t.footer?.badge}>
            {t.footer ? <span className="text-[18px] text-[#e5657a]">{t.footer.text}</span> : <span className="text-[18px] text-[#5b5e61]">? for shortcuts</span>}
          </Row>
          {t.agents && (
            <div className="mt-1 flex flex-col gap-0.5 text-[19px]">
              {t.agents.hint || t.agents.badge ? (
                <Row gutter={hasBadges} badge={t.agents.badge}>
                  <span className="text-[#767c81]">{t.agents.hint}</span>
                </Row>
              ) : null}
              {t.agents.rows.map((r, i) => (
                <Row key={`ag${i}`} gutter={hasBadges} badge={r.badge}>
                  <div className="flex items-center gap-1">
                    <span className="w-[2ch] shrink-0 text-[#d97757]">{r.selected ? "❯" : ""}</span>
                    {r.tree ? <span className="ml-[1.5ch] shrink-0 pr-1 text-[#5b5e61]">{r.tree}</span> : null}
                    <span className={cn("shrink-0", r.active ? "text-[#e8eaec]" : "text-[#767c81]")}>{r.active ? "●" : "◯"}</span>
                    <span className={cn("ml-1 shrink-0", r.selected ? "font-bold text-[#e8eaec]" : "text-[#b8bcc0]")}>
                      {r.name}
                      {r.count ? ` (+${r.count})` : ""}
                    </span>
                    {r.label ? <span className="ml-2 min-w-0 flex-1 truncate text-[#8b9095]">{r.label}</span> : <span className="min-w-0 flex-1" />}
                    {r.meta ? <span className="ml-2 shrink-0 whitespace-nowrap text-[#767c81]">{r.meta}</span> : null}
                  </div>
                </Row>
              ))}
              {t.agents.more ? (
                <Row gutter={hasBadges}>
                  <span className="text-[#767c81]">{t.agents.more}</span>
                </Row>
              ) : null}
            </div>
          )}
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
