// The "사용자 지정" page: 스킬 / 커넥터 / 플러그인 tabs, a search + add row, a table of connectors, and the
// "Claude Directory용 빌드" box at the bottom (connectors.png).
import { ArrowUpRightIcon, CheckIcon, ChevronDownIcon, PlusIcon, SearchIcon } from "lucide-react"
import type { ClaudeCustomize } from "@/content/schema-claude"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset, cn } from "@/lib/utils"

export function CustomizeView({ c }: { c: ClaudeCustomize }) {
  const subTab = c.subTab ?? "내 항목"
  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto px-10 py-8">
      <div className="font-display text-[28px] font-bold text-[#1a1a19]">사용자 지정</div>

      <div className="mt-5 flex items-center gap-6 font-body text-[19px] text-neutral-500">
        {(["스킬", "커넥터", "플러그인"] as const).map((t) => (
          <span key={t} className={cn(t === c.tab && "rounded-md bg-[#efece4] px-3 py-1.5 font-medium text-[#1a1a19]")}>{t}</span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex gap-1 rounded-lg bg-[#efece4] p-1 font-body text-[16px] text-neutral-500">
          {(["내 항목", "탐색"] as const).map((t) => (
            <span key={t} className={cn("rounded-md px-3 py-1", t === subTab && "bg-white font-medium text-[#1a1a19] shadow-sm")}>{t}</span>
          ))}
        </div>
        <div className="flex h-9 min-w-[220px] items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-neutral-400">
          <SearchIcon className="size-4" />
          <span className="font-body text-[16px]">{c.searchPlaceholder ?? "커넥터 검색"}</span>
        </div>
        <span className="relative ml-auto flex items-center gap-1 rounded-lg bg-[#1a1a19] px-4 py-2 font-body text-[16px] font-medium text-white">
          <PlusIcon className="size-4" />추가<ChevronDownIcon className="size-4" />
          {c.addBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={c.addBadge} size="sm" /></span> : null}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_120px_100px] border-b border-neutral-200 pb-2 font-body text-[16px] text-neutral-400">
        <span>커넥터</span><span>유형</span><span>상태</span>
      </div>
      {c.rows.map((r, i) => (
        <div key={i} className="relative grid grid-cols-[1fr_120px_100px] items-center border-b border-neutral-100 py-3">
          <span className="flex items-center gap-3 font-body text-[19px] text-[#1a1a19]">
            {r.logo ? (
              <img src={asset(`/logos/${r.logo}.svg`)} alt="" className="size-6" />
            ) : (
              <span className="size-6 rounded border border-dashed border-neutral-300" />
            )}
            {r.label}
          </span>
          <span className="flex items-center gap-2 font-body text-[16px] text-neutral-500">
            {r.type}
            {r.tag ? <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[13px]">{r.tag}</span> : null}
          </span>
          {r.connected ? (
            <CheckIcon className="size-5 text-neutral-500" />
          ) : (
            <span className="w-fit rounded-lg border border-neutral-300 px-3 py-1 font-body text-[16px]">연결</span>
          )}
          {r.badge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={r.badge} size="sm" /></span> : null}
        </div>
      ))}

      <div className="mt-6 flex items-center justify-between rounded-xl bg-[#efece4] px-6 py-5">
        <div>
          <div className="font-body text-[19px] font-semibold text-[#1a1a19]">Claude Directory용 빌드</div>
          <div className="font-body text-[16px] text-neutral-500">커넥터 또는 플러그인을 등록하고 Claude를 사용하는 모든 사람에게 다가가세요.</div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="relative flex items-center gap-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 font-body text-[16px]">
            개발자 문서<ArrowUpRightIcon className="size-4" />
            {c.docsBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={c.docsBadge} size="sm" /></span> : null}
          </span>
          <span className="relative rounded-lg bg-[#1a1a19] px-4 py-2 font-body text-[16px] font-medium text-white">
            디렉토리에 제출
            {c.directoryBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={c.directoryBadge} size="sm" /></span> : null}
          </span>
        </div>
      </div>
    </div>
  )
}
