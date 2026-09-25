// The home / composer screen (web_code_mobile.png): sidebar icon, greeting, the GitHub-connect
// popover, repo chips, the orange pixel mascot, the input box, and the model/mode footer row.
import { AsteriskIcon, CloudIcon, CornerDownLeftIcon, PanelLeftIcon, PlusIcon } from "lucide-react"
import type { PhoneHomeView } from "@/content/schema-phone"
import { PhoneBadge, PixelMascot, RepoPopover } from "./shared"

export function PhoneHome({ v, scale }: { v: PhoneHomeView; scale: number }) {
  return (
    <div className="flex h-full w-full flex-col bg-white px-4 pt-5 pb-5">
      <div className="relative shrink-0 self-start">
        <PanelLeftIcon className="size-[22px] text-[#3a3a38]" strokeWidth={1.75} />
        {v.sidebarBadge ? <PhoneBadge n={v.sidebarBadge} scale={scale} className="-top-3 -right-3" /> : null}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <AsteriskIcon className="size-[18px] shrink-0 text-[#d97757]" strokeWidth={2.5} />
        <span className="font-body text-[16px] text-[#1f1f1e]">{v.greeting}</span>
      </div>

      <div className="min-h-0 flex-1" />

      <div className="relative">
        {v.popover ? <RepoPopover p={v.popover} scale={scale} /> : null}

        <div className="relative mt-2.5 flex items-center gap-2">
          <span className="relative flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-[7px] font-body text-[13px] text-[#3a3a38]">
            <CloudIcon className="size-[14px]" /> Default
          </span>
          <span className="relative flex flex-1 items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-[7px] font-body text-[13px] text-[#3a3a38]">
            <PlusIcon className="size-[14px]" /> 저장소 선택…
          </span>
          {v.chipsBadge ? <PhoneBadge n={v.chipsBadge} scale={scale} className="-top-3 left-16" /> : null}

          <span className="pointer-events-none absolute top-0 right-0">
            <PixelMascot />
          </span>
        </div>
      </div>

      <div className="relative mt-2.5 flex items-center gap-2 rounded-2xl border border-neutral-200 px-4 py-3.5">
        <span className="flex-1 font-body text-[14px] text-neutral-400">{v.input?.placeholder ?? "작업을 설명하거나 질문하세요"}</span>
        <CornerDownLeftIcon className="size-4 shrink-0 text-neutral-300" />
        {v.input?.badge ? <PhoneBadge n={v.input.badge} scale={scale} className="-top-3 -right-3" /> : null}
      </div>

      <div className="relative mt-2 flex items-center justify-between font-body text-[12.5px] text-neutral-500">
        <span className="flex items-center gap-1"><PlusIcon className="size-[14px]" /> 자동</span>
        <span className="flex items-center gap-2.5">
          <span>Opus 5.5</span>
          <span>중간</span>
          <span className="size-[14px] rounded-full border border-neutral-300" />
        </span>
        {v.modelBadge ? <PhoneBadge n={v.modelBadge} scale={scale} className="-top-3 right-0" /> : null}
      </div>
    </div>
  )
}
