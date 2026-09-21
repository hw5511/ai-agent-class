// Dark VS Code window: title bar, activity bar, explorer, optional editor, terminal panel on the right.
// Columns are flex children, so the window fills whatever box the template gives it.
import { FileIcon, FilesIcon, FolderIcon, SearchIcon, BlocksIcon, ChevronDownIcon } from "lucide-react"
import type { VSCodeScreen } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { AgentTerminal } from "./AgentTerminal"
import { cn } from "@/lib/utils"

export function VSCodeMock({ s }: { s: VSCodeScreen }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-[#181818] shadow-[0_18px_40px_rgba(16,17,19,0.16)]">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#2b2b2b] bg-[#1f1f1f] px-5 font-display text-[18px] text-[#cccccc]">
        <span>{s.folder} — Visual Studio Code</span>
        <span className="flex gap-6 text-[#8b8b8b]"><span>—</span><span>□</span><span>✕</span></span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex w-14 shrink-0 flex-col items-center gap-6 border-r border-[#2b2b2b] bg-[#181818] pt-4 text-[#858585]">
          <FilesIcon className="size-7 text-[#d7d7d7]" />
          <SearchIcon className="size-7" />
          <BlocksIcon className="size-7" />
        </div>
        <div className="flex w-[220px] shrink-0 flex-col gap-1 border-r border-[#2b2b2b] bg-[#181818] px-3 pt-3 font-display text-[19px] text-[#cccccc]">
          <span className="px-1 text-[15px] font-semibold tracking-wide text-[#9d9d9d]">EXPLORER</span>
          <span className="flex items-center gap-1 font-bold"><ChevronDownIcon className="size-5" />{s.folder.toUpperCase()}</span>
          {s.files.length === 0 && <span className="pl-7 text-[#8b8b8b]">(비어 있음)</span>}
          {s.files.map((f) => (
            <span key={f.name} className={cn("flex items-center gap-2 rounded py-0.5 pr-1", f.active && "bg-[#04395e]")} style={{ paddingLeft: 28 + (f.depth ?? 0) * 18 }}>
              {f.folder ? <FolderIcon className="size-5 shrink-0" /> : <FileIcon className="size-5 shrink-0" />}
              <span className="min-w-0 flex-1 truncate">{f.name}</span>
              {f.badge ? <NumberBadge n={f.badge} size="sm" /> : null}
            </span>
          ))}
        </div>
        {s.editor && (
          <div className="flex min-w-0 flex-[1] flex-col border-r border-[#2b2b2b] bg-[#1f1f1f]">
            <div className="flex h-11 shrink-0 items-center gap-2 border-b border-[#2b2b2b] px-4 font-display text-[18px] text-[#e8e8e8]">
              <FileIcon className="size-5 text-slide-accent" />{s.editor.file}
            </div>
            <div className="flex flex-col gap-2 p-4 font-term text-[20px] leading-[1.5] text-[#d4d4d4]">
              {s.editor.lines.map((ln, i) => (
                <div key={i} className="flex gap-4">
                  <span className="w-6 shrink-0 text-right text-[#6e7681]">{i + 1}</span>
                  <span className="min-w-0 break-keep [overflow-wrap:anywhere]">{ln}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={cn("flex min-w-0 flex-col", s.editor ? "flex-[1.4]" : "flex-1")}>
          <div className="flex h-11 shrink-0 items-center border-b border-[#2b2b2b] bg-[#181818] px-4">
            <span className="border-b-2 border-slide-accent pb-1 font-display text-[16px] font-bold text-[#e8e8e8]">터미널</span>
          </div>
          <AgentTerminal t={s.terminal} className="flex-1" />
        </div>
      </div>
    </div>
  )
}
