// An open session thread (mobile composition of cs_10_working.png / dk_cloud_sync.png): top bar with
// the sidebar icon, cloud icon, session title and its project tag; the message thread (user bubbles,
// assistant paragraphs, a dim tool-use line); the orange asterisk; the purple merged-PR bar; the input.
import { AsteriskIcon, ChevronDownIcon, ChevronRightIcon, CloudIcon, CornerDownLeftIcon, GitPullRequestIcon, PanelLeftIcon, PlusIcon, XIcon } from "lucide-react"
import type { PhoneSessionView } from "@/content/schema-phone"
import { cn } from "@/lib/utils"
import { PhoneBadge } from "./shared"
import { RichText } from "./RichText"

export function PhoneSession({ v, scale }: { v: PhoneSessionView; scale: number }) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="relative flex h-12 shrink-0 items-center gap-2 border-b border-neutral-100 px-3">
        <PanelLeftIcon className="size-[19px] shrink-0 text-[#3a3a38]" strokeWidth={1.75} />
        {v.sidebarBadge ? <PhoneBadge n={v.sidebarBadge} scale={scale} className="-top-2 left-4" /> : null}
        <CloudIcon className="size-[15px] shrink-0 text-neutral-400" />
        <span className="flex min-w-0 flex-1 items-center gap-1 font-body text-[13.5px] font-medium text-[#1a1a1a]">
          <span className="truncate">{v.title}</span>
          <ChevronDownIcon className="size-3.5 shrink-0 text-neutral-400" />
        </span>
        <span className="shrink-0 truncate rounded-full bg-neutral-100 px-2.5 py-1 font-body text-[11px] text-neutral-500" style={{ maxWidth: 110 }}>
          {v.tag}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 py-4 font-body text-[13px] leading-relaxed text-[#2b2b2b]">
        {v.messages.map((m, i) => (
          <div key={i} className={cn("relative flex", m.role === "user" && "justify-end")}>
            {m.role === "user" ? (
              <div className="max-w-[85%] rounded-2xl bg-neutral-100 px-3.5 py-2.5 text-[#1f1f1f] break-keep">
                <RichText text={m.text} />
              </div>
            ) : (
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="break-keep"><RichText text={m.text} /></div>
                {m.toolLine ? (
                  <div className="flex items-center gap-1 font-body text-[12px] text-neutral-400">
                    {m.toolLine} <ChevronRightIcon className="size-3" />
                  </div>
                ) : null}
              </div>
            )}
            {m.badge ? <PhoneBadge n={m.badge} scale={scale} className="-top-2 right-1" /> : null}
          </div>
        ))}
        {v.pr ? <AsteriskIcon className="size-4 shrink-0 text-[#d97757]" strokeWidth={2.5} /> : null}
      </div>

      {v.pr ? (
        <div className="relative mx-3 mb-2 flex shrink-0 items-center gap-2 rounded-xl bg-[#efe9fb] px-3 py-2.5 font-body text-[12px]">
          <GitPullRequestIcon className="size-[14px] shrink-0 text-[#6d4bb8]" />
          <span className="shrink-0 font-medium text-[#3a2a66]">{v.pr.number}</span>
          <span className="shrink-0 truncate text-[#3a2a66]">{v.pr.repo}</span>
          <span className="min-w-0 flex-1 truncate rounded bg-white/60 px-1.5 py-0.5 font-mono text-[10.5px] text-[#4a3a7a]">{v.pr.branch}</span>
          <span className="shrink-0 font-medium text-[#6d4bb8]">{v.pr.status}</span>
          <XIcon className="size-3.5 shrink-0 text-[#6d4bb8]/70" />
          {v.pr.badge ? <PhoneBadge n={v.pr.badge} scale={scale} className="-top-3 -right-2" /> : null}
        </div>
      ) : null}

      <div className="relative mx-3 mb-2 flex shrink-0 items-center gap-2 rounded-2xl border border-neutral-200 px-4 py-3.5">
        <span className="flex-1 font-body text-[14px] text-neutral-400">{v.input?.placeholder ?? "메시지를 입력하세요"}</span>
        <CornerDownLeftIcon className="size-4 shrink-0 text-neutral-300" />
        {v.input?.badge ? <PhoneBadge n={v.input.badge} scale={scale} className="-top-3 -right-3" /> : null}
      </div>

      <div className="relative mx-3 mb-4 flex shrink-0 items-center justify-between font-body text-[12.5px] text-neutral-500">
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
