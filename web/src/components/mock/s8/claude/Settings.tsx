// The "설정" (Settings) window: a fixed left nav (identical on every settings page, so hard-coded here like
// the other fixed chrome in ClaudeApp.tsx) and one section of toggle rows on the right
// (desktop-settings.png reference: claude.ai/settings/claude-code, which the desktop app renders the same way).
import { SearchIcon, XIcon } from "lucide-react"
import type { ClaudeSettings } from "@/content/schema-claude"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

const NAV_TOP = ["일반", "계정", "개인정보보호", "결제", "사용량", "기능", "메모리", "디자인 시스템", "Claude Code", "Chrome용 Cla..."]
const NAV_DESKTOP = ["시스템", "확장 프로그램", "개발자"]
const NAV_CUSTOM = ["스킬", "커넥터", "플러그인"]

function NavItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div className={cn("rounded-lg px-3 py-2 font-body text-[18px] text-[#3a3a38]", active && "bg-[#efece4] font-medium text-[#1a1a19]")}>
      {label}
    </div>
  )
}

export function SettingsView({ s }: { s: ClaudeSettings }) {
  return (
    <div className="flex h-full min-h-0 w-full bg-white font-body">
      <div className="flex w-[290px] shrink-0 flex-col gap-1 border-r border-neutral-200 bg-[#faf9f5] p-3">
        <div className="mb-2 flex h-9 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-neutral-400">
          <SearchIcon className="size-4" /><span className="font-body text-[17px]">검색</span>
        </div>
        <div className="px-3 pb-1 font-body text-[16px] font-medium text-neutral-400">설정</div>
        {NAV_TOP.map((n) => <NavItem key={n} label={n} active={n === s.navActive} />)}
        <div className="mt-4 px-3 pb-1 font-body text-[16px] font-medium text-neutral-400">데스크톱 앱</div>
        {NAV_DESKTOP.map((n) => <NavItem key={n} label={n} active={n === s.navActive} />)}
        <div className="mt-4 px-3 pb-1 font-body text-[16px] font-medium text-neutral-400">사용자 지정</div>
        {NAV_CUSTOM.map((n) => <NavItem key={n} label={n} active={n === s.navActive} />)}
      </div>

      <div className="relative min-h-0 flex-1 overflow-y-auto px-10 py-8">
        <XIcon className="absolute top-6 right-8 size-5 text-neutral-400" />
        <div className="font-display text-[24px] font-bold text-[#1a1a19]">{s.section}</div>
        <div className="mt-4 flex flex-col">
          {s.rows.map((r, i) => (
            <div key={i} className={cn("relative flex items-start gap-6 py-5", i > 0 && "border-t border-neutral-100")}>
              <div className="min-w-0 flex-1">
                <div className="font-body text-[19px] font-medium text-[#1a1a19]">{r.title}</div>
                <div className="mt-1 max-w-[640px] font-body text-[16px] leading-relaxed text-neutral-500">
                  {r.desc}{r.link ? <> <span className="text-[#3a6cc9] underline">{r.link}</span></> : null}
                </div>
              </div>
              <span className={cn("relative mt-1 flex h-6 w-11 shrink-0 items-center rounded-full px-0.5", r.on ? "justify-end bg-[#3a6cc9]" : "justify-start bg-neutral-300")}>
                <span className="size-5 rounded-full bg-white shadow" />
                {r.badge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={r.badge} size="sm" /></span> : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
