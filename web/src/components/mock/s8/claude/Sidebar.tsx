// The expanded left sidebar (desk_07 onward): search, the four fixed action rows, "최근 항목" (empty state or
// session groups), and the account footer. Rendered only when the view supplies `sidebar` data; otherwise the
// caller draws just the collapsed toggle icon (matching the web captures).
import { ChevronDownIcon, FolderPlusIcon, GitBranchIcon, PlusIcon, SearchIcon, SlidersHorizontalIcon, SquareLibraryIcon, WalletCardsIcon } from "lucide-react"
import type { ClaudeSidebar } from "@/content/schema-claude"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

function Row({ children, active, badge }: { children: React.ReactNode; active?: boolean; badge?: number }) {
  return (
    <div className={cn("relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 font-body text-[20px] text-[#3a3a38]", active && "bg-[#f0eee7] font-medium")}>
      {children}
      {badge ? <span className="absolute -top-3 -right-2 z-10"><NumberBadge n={badge} size="sm" /></span> : null}
    </div>
  )
}

export function ClaudeSidebarView({ s }: { s: ClaudeSidebar }) {
  return (
    <div className="flex h-full w-[290px] shrink-0 flex-col border-r border-neutral-200 bg-[#faf9f5] px-3 py-3">
      <Row badge={s.searchBadge}>
        <div className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-neutral-400">
          <SearchIcon className="size-4" />
          <span>검색</span>
        </div>
      </Row>

      <div className="mt-1 flex flex-col gap-0.5">
        <Row badge={s.newBadge}><PlusIcon className="size-[18px] text-neutral-500" />새로 생성</Row>
        <Row badge={s.artifactsBadge}><SquareLibraryIcon className="size-[18px] text-neutral-500" />Artifacts</Row>
        <Row badge={s.customizeBadge}><WalletCardsIcon className="size-[18px] text-neutral-500" />사용자 지정</Row>
        <Row badge={s.moreBadge}><ChevronDownIcon className="size-[18px] text-neutral-500" />더보기</Row>
      </div>

      <div className="mt-4 flex items-center justify-between px-2.5">
        <span className="font-body text-[16px] text-neutral-400">최근 항목</span>
        <span className="relative">
          <SlidersHorizontalIcon className="size-4 rotate-90 text-neutral-400" />
          {s.recentFilterBadge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={s.recentFilterBadge} size="sm" /></span> : null}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {!s.groups?.length ? (
          <div className="mt-3 flex flex-col items-center gap-1 px-2 text-center font-body text-[16px] text-neutral-400">
            <span>현재 필터와 일치하는 세션이 없습니다</span>
            <span className="text-[#3a6cc9]">모든 세션 보기</span>
          </div>
        ) : (
          <div className="mt-1 flex flex-col gap-3">
            {s.groups.map((g, i) => (
              <div key={i}>
                <div className="relative flex items-center gap-1 px-2.5 py-1 font-body text-[17px] font-medium text-[#2a2a28]">
                  <span>{g.title}</span>
                  {g.collapsible ? <ChevronDownIcon className="size-4 text-neutral-500" /> : null}
                  {g.addBadge ? <span className="absolute -top-3 right-6 z-10"><NumberBadge n={g.addBadge} size="sm" /></span> : null}
                  <PlusIcon className="ml-auto size-4 text-neutral-400" />
                </div>
                {g.rows.map((r, j) => (
                  <Row key={j} active={r.active} badge={r.badge}>
                    {r.icon === "branch" ? (
                      <GitBranchIcon className="size-4 shrink-0 text-neutral-500" />
                    ) : r.icon === "dot" ? (
                      <span className="flex size-4 shrink-0 items-center justify-center"><span className="size-1.5 rounded-full bg-neutral-500" /></span>
                    ) : (
                      <span className="size-4 shrink-0" />
                    )}
                    <span className="min-w-0 flex-1 truncate">{r.label}</span>
                  </Row>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative mt-2 flex items-center gap-2 border-t border-neutral-200 px-2 pt-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#3a3a38] font-display text-[13px] font-bold text-white">
          {s.account.slice(0, 1)}
        </span>
        <span className="min-w-0 flex-1 truncate font-body text-[17px] text-[#3a3a38]">{s.account}</span>
        <ChevronDownIcon className="size-4 shrink-0 text-neutral-400" />
        <FolderPlusIcon className="size-4 shrink-0 text-neutral-400" />
        {s.accountBadge ? <span className="absolute -top-3 left-8 z-10"><NumberBadge n={s.accountBadge} size="sm" /></span> : null}
      </div>
    </div>
  )
}
