// Claude Office add-in panel (right side, ~420px). Modelled on the real pane: white surface, thin
// border, header with a chevron + close, messages, and a bottom input card with the mode/model row.
import { ChevronDownIcon, XIcon, PlusIcon, HandIcon, ChevronsRightIcon, ClockIcon, MicIcon, CheckIcon } from "lucide-react"
import type { OfficePanel } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

export function PanelView({ p }: { p: OfficePanel }) {
  const mode = p.mode ?? "ask"
  return (
    <div className="relative flex h-full w-[480px] shrink-0 flex-col border-l border-neutral-200 bg-white">
      {p.badge ? <span className="absolute top-1.5 left-1.5 z-20"><NumberBadge n={p.badge} size="sm" /></span> : null}

      <div className={cn("flex h-12 shrink-0 items-center gap-2 border-b border-neutral-200 px-4 font-display text-[22px] font-semibold text-[#1a1a1a]", p.badge && "pl-12")}>
        <span className="flex-1">Claude</span>
        <ChevronDownIcon className="size-5 text-neutral-400" />
        <XIcon className="size-5 text-neutral-400" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-4 py-4">
        {p.messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" && "justify-end")}>
            {m.role === "user" ? (
              <div className="max-w-[85%] rounded-xl bg-neutral-100 px-3.5 py-2 font-body text-[22px] leading-snug text-[#2b2b2b] break-keep">
                {m.text}
              </div>
            ) : (
              <div className="flex max-w-[95%] flex-col gap-1.5">
                <div className="font-body text-[22px] leading-snug text-[#2b2b2b] break-keep">{m.text}</div>
                {m.steps?.map((st, si) => (
                  <div key={si} className="flex items-center gap-1.5 font-body text-[18px] text-neutral-400">
                    <CheckIcon className="size-4 shrink-0" />
                    <span className="truncate">{st}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative m-3 mt-0 shrink-0 rounded-xl border border-neutral-200 px-3 py-2.5">
        {p.menu && (
          <div className="absolute bottom-[calc(100%+8px)] left-3 z-20 w-[240px] rounded-lg border border-neutral-200 bg-white py-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.14)]">
            <div className="flex items-center gap-2 px-3 py-2 font-body text-[17px] text-[#1a1a1a]">
              <HandIcon className="size-4 shrink-0" />
              <span className="flex-1">Ask before edits</span>
              {mode === "ask" && <CheckIcon className="size-4 shrink-0 text-[#1273c4]" />}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 font-body text-[17px] text-[#1a1a1a]">
              <ChevronsRightIcon className="size-4 shrink-0" />
              <span className="flex-1">Accept all edits</span>
              {mode === "accept" && <CheckIcon className="size-4 shrink-0 text-[#1273c4]" />}
            </div>
          </div>
        )}
        <div className="mb-2 truncate font-body text-[19px] text-neutral-400">{p.input || "Ask Claude..."}</div>
        <div className="flex items-center gap-3 text-neutral-400">
          <PlusIcon className="size-5 shrink-0" />
          <span className={cn("flex size-7 shrink-0 items-center justify-center rounded", mode === "accept" && "bg-[#1273c4] text-white")}>
            {mode === "accept" ? <ChevronsRightIcon className="size-5" /> : <HandIcon className="size-5" />}
          </span>
          <ClockIcon className="size-5 shrink-0 text-[#1273c4]" />
          <span className="flex flex-1 items-center gap-1 truncate font-body text-[18px] text-[#1a1a1a]">
            {p.model ?? "Sonnet 5"} <ChevronDownIcon className="size-3.5 shrink-0" />
          </span>
          <MicIcon className="size-5 shrink-0" />
        </div>
      </div>
    </div>
  )
}
