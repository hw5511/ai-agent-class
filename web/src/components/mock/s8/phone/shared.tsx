// Shared pieces of the phone mock: the numbered badge (counter-scaled so it always renders at true
// size no matter how far the 390x844 screen layer itself is scaled down/up to fit its frame), the
// blue "리포지토리에서 작업하기 위한 두 단계" GitHub-connect popover, and the orange pixel mascot.
import { SettingsIcon, XIcon } from "lucide-react"
import type { PhoneRepoPopover } from "@/content/schema-phone"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

/** A badge anchored to a corner of its `relative` parent, counter-scaled to stay full size. */
export function PhoneBadge({ n, scale, className }: { n: number; scale: number; className?: string }) {
  return (
    <span className={cn("absolute z-40 rounded-full ring-2 ring-white", className)} style={{ transform: `scale(${scale > 0 ? 1 / scale : 1})` }}>
      <NumberBadge n={n} size="sm" />
    </span>
  )
}

export function RepoPopover({ p, scale }: { p: PhoneRepoPopover; scale: number }) {
  return (
    <div className="relative w-full rounded-2xl bg-[#2a78d6] px-4 pt-3.5 pb-3 shadow-[0_10px_24px_rgba(20,60,120,0.35)]">
      {p.badge ? <PhoneBadge n={p.badge} scale={scale} className="-top-3 -right-3" /> : null}
      <div className="flex items-start gap-2">
        <span className="flex-1 font-body text-[14.5px] font-semibold leading-snug text-white">리포지토리에서 작업하기 위한 두 단계</span>
        <XIcon className="mt-0.5 size-4 shrink-0 text-white/70" />
      </div>
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 size-[16px] shrink-0 rounded-full border-2 border-white/70" />
          <div className="min-w-0">
            <div className="font-body text-[13.5px] font-semibold text-white">GitHub 계정 연결</div>
            <div className="mt-0.5 font-body text-[12px] leading-snug text-white/75">GitHub에서 사용자가 누구인지 Claude에게 알려줍니다.</div>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 size-[16px] shrink-0 rounded-full border-2 border-white/70" />
          <div className="min-w-0">
            <div className="font-body text-[13.5px] font-semibold text-white">Claude GitHub App 설치</div>
            <div className="mt-0.5 font-body text-[12px] leading-snug text-white/75">선택한 저장소에서 Claude가 작업할 수 있도록 합니다.</div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2.5">
        <SettingsIcon className="size-4 text-white/80" />
        <span className="relative shrink-0 rounded-full bg-white px-3.5 py-[7px] font-body text-[12.5px] font-semibold text-[#1a1a1a]">
          {p.connectBadge ? <PhoneBadge n={p.connectBadge} scale={scale} className="-top-3 -right-3" /> : null}
          GitHub 연결
        </span>
      </div>
    </div>
  )
}

// 7x8 pixel grid: 0 empty, 1 orange body, 2 black eye. Matches the mascot cropped from web_code_mobile.png.
const MASCOT_GRID = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 2, 1, 2, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
]

export function PixelMascot({ size = 6 }: { size?: number }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(7, ${size}px)`, gridTemplateRows: `repeat(8, ${size}px)` }}>
      {MASCOT_GRID.flatMap((row, ri) =>
        row.map((cell, ci) => (
          <span
            key={`${ri}-${ci}`}
            style={{ background: cell === 1 ? "#d97757" : cell === 2 ? "#1a1a1a" : "transparent" }}
          />
        )),
      )}
    </div>
  )
}
