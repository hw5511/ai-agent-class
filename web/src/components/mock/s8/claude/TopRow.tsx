// The app's single content top row: the chat/code toggle pill (home) or the session header (session), plus
// the session's right-side action icons. Shared between ClaudeAppWindow (where it sits inside the OS title
// bar) and ClaudeAppBody (where it is the whole top row, next to the collapsed sidebar toggle).
import { ChevronDownIcon, Code2Icon, CloudIcon, FileTextIcon, GlobeIcon, MessageSquareIcon, MonitorIcon, MoreHorizontalIcon, PlusIcon, Share2Icon, SquareTerminalIcon } from "lucide-react"
import type { ClaudeSessionHeader } from "@/content/schema-claude"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

export function ChatCodeToggle({ active = "code", badge }: { active?: "chat" | "code"; badge?: number }) {
  return (
    <span className="relative inline-flex items-center gap-1 rounded-lg bg-[#efece4] p-1">
      <span className={cn("flex size-7 items-center justify-center rounded-md", active === "chat" && "bg-white shadow-sm")}>
        <MessageSquareIcon className="size-4 text-neutral-600" />
      </span>
      <span className={cn("flex size-7 items-center justify-center rounded-md", active === "code" && "bg-white shadow-sm")}>
        <Code2Icon className="size-4 text-neutral-600" />
      </span>
      {badge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={badge} size="sm" /></span> : null}
    </span>
  )
}

export function SessionHeaderBar({ h }: { h: ClaudeSessionHeader }) {
  return (
    <span className="flex min-w-0 items-center gap-2 font-body text-[19px] text-[#2a2a28]">
      <span className="relative flex size-6 shrink-0 items-center justify-center rounded border border-neutral-300 text-neutral-500">
        {h.icon === "cloud" ? <CloudIcon className="size-3.5" /> : <MonitorIcon className="size-3.5" />}
      </span>
      <span className="relative min-w-0 truncate font-medium">
        {h.title}
        {h.titleBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={h.titleBadge} size="sm" /></span> : null}
      </span>
      <ChevronDownIcon className="size-4 shrink-0 text-neutral-400" />
      {h.tag ? (
        <span className="relative shrink-0 rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-[15px] text-neutral-500">
          {h.tag}
          {h.tagBadge ? <span className="absolute -top-4 -right-3 z-10"><NumberBadge n={h.tagBadge} size="sm" /></span> : null}
        </span>
      ) : null}
    </span>
  )
}

const ACTION_ICON = { terminal: SquareTerminalIcon, plus: PlusIcon, globe: GlobeIcon, more: MoreHorizontalIcon, addPage: FileTextIcon, share: Share2Icon }

export function SessionActions({ actions }: { actions: NonNullable<ClaudeSessionHeader["actions"]> }) {
  return (
    <span className="flex shrink-0 items-center gap-5 text-neutral-600">
      {actions.map((a, i) => {
        const Icon = ACTION_ICON[a.icon]
        return (
          <span key={i} className="relative flex items-center justify-center">
            <Icon className="size-5" />
            {a.badge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={a.badge} size="sm" /></span> : null}
          </span>
        )
      })}
    </span>
  )
}
