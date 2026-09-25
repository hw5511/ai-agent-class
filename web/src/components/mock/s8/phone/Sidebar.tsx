// The slide-out sidebar (web_code_mobile_sidebar.png), with the session-groups composition also seen
// in dk_cloud_sync.png: search, quick actions, recent sessions (empty state or grouped sessions), the
// GitHub-connect popover, the "Try Claude 태그" row, and the account footer.
import {
  Blocks,
  ChevronDownIcon,
  Code2Icon,
  GitBranchIcon,
  MessageSquareIcon,
  PackageIcon,
  PlusIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  SunIcon,
  XIcon,
} from "lucide-react"
import type { PhoneSidebarView } from "@/content/schema-phone"
import { cn } from "@/lib/utils"
import { PhoneBadge, RepoPopover } from "./shared"

export function PhoneSidebar({ v, scale }: { v: PhoneSidebarView; scale: number }) {
  return (
    <div className="flex h-full w-full flex-col bg-white px-3.5 pt-4">
      <div className="relative flex shrink-0 items-center gap-2 px-1 pb-1">
        <XIcon className="size-5 text-[#3a3a38]" />
        {v.closeBadge ? <PhoneBadge n={v.closeBadge} scale={scale} className="-top-2 left-3" /> : null}
        <span className="flex-1 font-display text-[20px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "Georgia, 'Noto Serif KR', serif" }}>
          Claude Code
        </span>
        <span className="flex items-center gap-0.5 rounded-full bg-neutral-100 p-1">
          <span className="flex size-7 items-center justify-center rounded-full text-neutral-400"><MessageSquareIcon className="size-4" /></span>
          <span className="flex size-7 items-center justify-center rounded-full bg-white shadow-sm text-[#1a1a1a]"><Code2Icon className="size-4" /></span>
        </span>
      </div>

      <div className="mt-3 flex shrink-0 items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 font-body text-[13.5px] text-neutral-400">
        <SearchIcon className="size-4" /> 검색
      </div>

      <div className="relative mt-3 flex shrink-0 items-center gap-2 rounded-xl bg-neutral-100 px-3 py-2.5 font-body text-[14px] font-medium text-[#1a1a1a]">
        <PlusIcon className="size-4" /> 새로 생성
        {v.newBadge ? <PhoneBadge n={v.newBadge} scale={scale} className="-top-3 -right-2" /> : null}
      </div>
      <div className="flex shrink-0 items-center gap-2 px-3 py-2.5 font-body text-[14px] text-[#1a1a1a]"><Blocks className="size-4 text-neutral-500" /> Artifacts</div>
      <div className="flex shrink-0 items-center gap-2 px-3 py-2.5 font-body text-[14px] text-[#1a1a1a]"><PackageIcon className="size-4 text-neutral-500" /> 사용자 지정</div>
      <div className="flex shrink-0 items-center gap-2 px-3 py-2.5 font-body text-[14px] text-[#1a1a1a]"><ChevronDownIcon className="size-4 text-neutral-500" /> 더보기</div>

      <div className="relative mt-3 flex shrink-0 items-center justify-between px-1">
        <span className="font-body text-[12.5px] text-neutral-400">최근 항목</span>
        <span className="flex items-center gap-3 text-neutral-400">
          <SearchIcon className="size-4" />
          <SlidersHorizontalIcon className="size-4" />
        </span>
        {v.recentBadge ? <PhoneBadge n={v.recentBadge} scale={scale} className="-top-3 right-0" /> : null}
      </div>

      {v.groups?.length ? (
        <div className="mt-1 flex min-h-0 flex-1 flex-col overflow-hidden">
          {v.groups.map((g, gi) => (
            <div key={gi} className="mt-2 shrink-0">
              <div className="flex items-center gap-1 px-1 font-body text-[12.5px] font-medium text-neutral-500">
                {g.title} <ChevronDownIcon className="size-3" />
              </div>
              {g.rows.map((r, ri) => (
                <div
                  key={ri}
                  className={cn("relative mt-1 flex items-center gap-2 rounded-lg px-2 py-2 font-body text-[13.5px] text-[#1a1a1a]", r.active && "bg-neutral-100")}
                >
                  <GitBranchIcon className="size-3.5 shrink-0 text-neutral-400" />
                  <span className="min-w-0 flex-1 truncate">{r.label}</span>
                  {r.badge ? <PhoneBadge n={r.badge} scale={scale} className="-top-2 -right-2" /> : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex shrink-0 flex-col items-center gap-1 text-center font-body text-[13px]">
          <span className="text-neutral-400">현재 필터와 일치하는 세션이 없습니다</span>
          <span className="text-[#2a78d6]">모든 세션 보기</span>
        </div>
      )}

      <div className="min-h-0 flex-1" />

      {v.popover ? (
        <div className="shrink-0 pb-2">
          <RepoPopover p={v.popover} scale={scale} />
        </div>
      ) : null}

      <div className="flex shrink-0 items-center justify-between border-t border-neutral-200 py-2.5 font-body text-[13px]">
        <span className="flex items-center gap-1.5 text-[#3a3a38]"><SparklesIcon className="size-4 text-[#2a78d6]" /> Try Claude 태그</span>
        <span className="flex items-center gap-2">
          <span className="text-[#2a78d6]">설정</span>
          <XIcon className="size-3.5 text-neutral-400" />
        </span>
      </div>

      <div className="relative flex shrink-0 items-center gap-2 border-t border-neutral-200 py-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#3a3a38] font-body text-[11px] font-semibold text-white">
          {v.account.slice(0, 1)}
        </span>
        <span className="min-w-0 flex-1 truncate font-body text-[13.5px] text-[#1a1a1a]">{v.account}</span>
        <ChevronDownIcon className="size-3.5 shrink-0 text-neutral-400" />
        <SunIcon className="size-4 shrink-0 text-neutral-400" />
        {v.accountBadge ? <PhoneBadge n={v.accountBadge} scale={scale} className="-top-2 left-8" /> : null}
      </div>
    </div>
  )
}
