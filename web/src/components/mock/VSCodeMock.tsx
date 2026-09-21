// Dark VS Code window: title bar (+ optional menu bar), activity bar, explorer or extensions sidebar,
// optional editor, terminal panel on the right or at the bottom (or a chat panel), plus the UI moments a
// lesson points at: an open menu, the folder picker dialog, the explorer's new-file/new-folder icons and
// a pressed shortcut. Columns are flex children, so the window fills whatever box the template gives it.
import {
  BlocksIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  FilePlusIcon,
  FilesIcon,
  FolderIcon,
  FolderPlusIcon,
  MessageSquareIcon,
  RefreshCwIcon,
  SearchIcon,
  XIcon,
  ChevronsDownUpIcon,
  DownloadIcon,
  ImageIcon,
  InfoIcon,
  SettingsIcon,
} from "lucide-react"
import type { VSCodeMenuItem, VSCodeScreen } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { AgentTerminal } from "./AgentTerminal"
import { cn } from "@/lib/utils"

// The red "PDF" tile vscode-pdf ships as its icon; small size doubles as the explorer file icon.
function PdfIcon({ px }: { px: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[18%] bg-[#e5252a] font-display font-extrabold text-white"
      style={{ width: px, height: px, fontSize: px * 0.34 }}
    >
      PDF
    </span>
  )
}

function FileTypeIcon({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toLowerCase()
  if (ext === "pdf") return <PdfIcon px={20} />
  if (ext === "jpg" || ext === "png" || ext === "jpeg") return <ImageIcon className="size-5 shrink-0 text-[#b180d7]" />
  if (ext === "md") return <InfoIcon className="size-5 shrink-0 text-[#519aba]" />
  return <FileIcon className="size-5 shrink-0" />
}

// Minimal Markdown preview: "# " / "## " headings, "- " list items, **bold**; enough to show what the
// symbols turn into.
function bold(s: string) {
  return s.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") ? <b key={i} className="font-bold text-white">{part.slice(2, -2)}</b> : <span key={i}>{part}</span>,
  )
}

function MdPreview({ md }: { md: string[] }) {
  return (
    <div className="flex flex-col gap-3 px-8 py-6 font-body text-[21px] leading-[1.5] text-[#d4d4d4]">
      {md.map((ln, i) => {
        if (ln.startsWith("# ")) return <h1 key={i} className="border-b border-[#454545] pb-2 font-display text-[36px] font-bold text-white">{bold(ln.slice(2))}</h1>
        if (ln.startsWith("## ")) return <h2 key={i} className="mt-2 font-display text-[27px] font-bold text-white">{bold(ln.slice(3))}</h2>
        if (ln.startsWith("- ")) return <div key={i} className="flex gap-3 pl-3"><span className="text-[#9d9d9d]">•</span><span>{bold(ln.slice(2))}</span></div>
        return <p key={i}>{bold(ln)}</p>
      })}
    </div>
  )
}

const MENU_BAR = ["파일", "편집", "선택 영역", "보기", "이동", "실행", "터미널", "도움말"]

function Menu({ items, className }: { items: VSCodeMenuItem[]; className?: string }) {
  return (
    <div className={cn("absolute z-20 flex w-[300px] flex-col rounded-lg border border-[#454545] bg-[#252526] py-2 font-display text-[19px] text-[#cccccc] shadow-[0_10px_30px_rgba(0,0,0,0.5)]", className)}>
      {items.map((it, i) =>
        it.label === "-" ? (
          <div key={i} className="my-1.5 h-px bg-[#454545]" />
        ) : (
          <div key={i} className="relative">
            <div className={cn("mx-2 flex items-center gap-3 rounded px-4 py-1.5", it.active && "bg-[#04395e] text-white")}>
              <span className="flex-1">{it.label}</span>
              {it.shortcut && <span className="font-term text-[16px] text-[#9d9d9d]">{it.shortcut}</span>}
              {it.sub && <ChevronRightIcon className="size-5" />}
              {it.badge ? <NumberBadge n={it.badge} size="sm" /> : null}
            </div>
            {it.sub && it.active && <Menu items={it.sub} className="top-0 left-[290px] w-[200px]" />}
          </div>
        ),
      )}
    </div>
  )
}

export function VSCodeMock({ s }: { s: VSCodeScreen }) {
  const bottom = s.terminalAt === "bottom"
  const showTerm = !s.noTerminal && !s.preview
  const ext = s.sidebar === "extensions"

  const terminal = showTerm && (
    <div className={cn("relative flex min-w-0 flex-col", bottom ? "h-[45%] shrink-0 border-t border-[#2b2b2b]" : s.editor ? "flex-[1.4]" : "flex-1")}>
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-[#2b2b2b] bg-[#181818] px-4">
        <span className="border-b-2 border-slide-accent pb-1 font-display text-[16px] font-bold text-[#e8e8e8]">터미널</span>
        {s.terminalTabBadge ? <NumberBadge n={s.terminalTabBadge} size="sm" /> : null}
      </div>
      {s.menu?.at === "terminal-tab" && <Menu items={s.menu.items} className="top-12 left-6" />}
      <AgentTerminal t={s.terminal} className="flex-1" />
    </div>
  )

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-[#181818] shadow-[0_18px_40px_rgba(16,17,19,0.16)]">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#2b2b2b] bg-[#1f1f1f] px-5 font-display text-[18px] text-[#cccccc]">
        {s.menu?.at === "file" ? (
          <span className="flex gap-1">
            {MENU_BAR.map((m, i) => (
              <span key={m} className={cn("rounded px-3 py-0.5", i === 0 && "bg-[#3a3a3a] text-white")}>{m}</span>
            ))}
          </span>
        ) : (
          <span>{s.folder} — Visual Studio Code</span>
        )}
        <span className="flex gap-6 text-[#8b8b8b]"><span>—</span><span>□</span><span>✕</span></span>
      </div>
      {s.menu?.at === "file" && <Menu items={s.menu.items} className="top-12 left-4" />}

      <div className="flex min-h-0 flex-1">
        <div className="flex w-14 shrink-0 flex-col items-center gap-6 border-r border-[#2b2b2b] bg-[#181818] pt-4 text-[#858585]">
          <FilesIcon className={cn("size-7", !ext && "text-[#d7d7d7]")} />
          <SearchIcon className="size-7" />
          <span className="relative">
            <BlocksIcon className={cn("size-7", ext && "text-[#d7d7d7]")} />
            {s.activityBadge ? <span className="absolute -top-3 left-6"><NumberBadge n={s.activityBadge} size="sm" /></span> : null}
          </span>
        </div>

        {s.noSidebar ? null : ext ? (
          <div className="flex w-[420px] shrink-0 flex-col gap-3 border-r border-[#2b2b2b] bg-[#181818] px-3 pt-3 font-display text-[18px] text-[#cccccc]">
            <span className="px-1 text-[15px] font-semibold tracking-wide text-[#9d9d9d]">EXTENSIONS: MARKETPLACE</span>
            <div className="flex items-center gap-2 rounded border border-slide-accent bg-[#1f1f1f] px-3 py-1.5">
              <span className="flex-1 font-term text-[17px]">{s.extensions?.query}</span>
              {s.extensions?.queryBadge ? <NumberBadge n={s.extensions.queryBadge} size="sm" /> : null}
            </div>
            {s.extensions?.items.map((x, i) => (
              <div key={i} className={cn("flex gap-3 rounded px-2 py-2.5", i === 0 && "bg-[#04395e]")}>
                {x.icon === "pdf" ? <PdfIcon px={52} /> : <span className="size-[52px] shrink-0 rounded-[18%] bg-[#3a3a3a]" />}
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="flex items-center gap-2">
                    <span className="min-w-0 flex-1 truncate font-bold text-white">{x.name}</span>
                    {x.installs && <span className="flex shrink-0 items-center gap-1 text-[14px] text-[#9d9d9d]"><DownloadIcon className="size-4" />{x.installs}</span>}
                  </span>
                  <span className="truncate text-[15px] text-[#bbbbbb]">{x.desc}</span>
                  <span className="flex items-center gap-2">
                    <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-[#9d9d9d]">{x.publisher}</span>
                    <span className="rounded-sm bg-slide-accent px-2.5 py-0.5 text-[14px] font-bold text-white">Install</span>
                    {x.badge ? <NumberBadge n={x.badge} size="sm" /> : <SettingsIcon className="size-4 text-[#858585]" />}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={cn("flex shrink-0 flex-col gap-1 border-r border-[#2b2b2b] bg-[#181818] px-3 pt-3 font-display text-[19px] text-[#cccccc]", s.explorerAction ? "w-[380px]" : "w-[340px]")}>
            <span className="px-1 text-[15px] font-semibold tracking-wide text-[#9d9d9d]">EXPLORER</span>
            <span className="flex items-center gap-1 font-bold">
              <ChevronDownIcon className="size-5 shrink-0" />
              <span className="min-w-0 flex-1 truncate">{s.folder.toUpperCase()}</span>
              {s.explorerAction && (
                <span className="flex items-center gap-1.5 text-[#bbbbbb]">
                  {[
                    ["newFile", FilePlusIcon],
                    ["newFolder", FolderPlusIcon],
                    ["refresh", RefreshCwIcon],
                    ["collapse", ChevronsDownUpIcon],
                  ].map(([k, Icon]) => {
                    const I = Icon as typeof FileIcon
                    const on = s.explorerAction?.icon === k
                    return <I key={k as string} className={cn("size-7", on && "rounded bg-slide-accent p-1 text-white")} />
                  })}
                  {s.explorerAction.badge ? <NumberBadge n={s.explorerAction.badge} size="sm" /> : null}
                </span>
              )}
            </span>
            {s.files.length === 0 && <span className="pl-7 text-[#8b8b8b]">(비어 있음)</span>}
            {s.files.map((f) => (
              <span
                key={f.name}
                className={cn("flex items-center gap-2 rounded py-0.5 pr-1", f.active && "bg-[#04395e]", f.editing && "outline-2 outline-slide-accent")}
                style={{ paddingLeft: 28 + (f.depth ?? 0) * 18 }}
              >
                {f.folder ? <FolderIcon className="size-5 shrink-0" /> : <FileTypeIcon name={f.name} />}
                <span className="min-w-0 flex-1 truncate">{f.name}</span>
                {f.badge ? <NumberBadge n={f.badge} size="sm" /> : null}
              </span>
            ))}
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1">
            {s.editor && (
              <div className="relative flex min-w-0 flex-1 flex-col border-r border-[#2b2b2b] bg-[#1f1f1f]">
                <div className="flex h-11 shrink-0 items-center gap-2 border-b border-[#2b2b2b] px-4 font-display text-[18px] text-[#e8e8e8]">
                  <FileTypeIcon name={s.editor.file} /><span className="flex-1">{s.editor.file}</span>
                  {s.editor.badge ? <NumberBadge n={s.editor.badge} size="sm" /> : null}
                </div>
                <div className="flex flex-col gap-2 p-4 font-term text-[20px] leading-[1.5] text-[#d4d4d4]">
                  {s.editor.lines.map((ln, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="w-6 shrink-0 text-right text-[#6e7681]">{i + 1}</span>
                      <span className="min-w-0 whitespace-pre-wrap break-keep [overflow-wrap:anywhere]">{ln}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {s.preview && (
              <div className="relative flex min-w-0 flex-1 flex-col bg-[#1f1f1f]">
                <div className="flex h-11 shrink-0 items-center gap-2 border-b border-[#2b2b2b] px-4 font-display text-[18px] text-[#e8e8e8]">
                  <span className="flex-1">미리 보기 {s.preview.file}</span>
                  {s.preview.badge ? <NumberBadge n={s.preview.badge} size="sm" /> : null}
                </div>
                <MdPreview md={s.preview.md} />
              </div>
            )}
            {s.editorNotice && (
              <div className="flex min-w-0 flex-[1.2] flex-col border-r border-[#2b2b2b] bg-[#1f1f1f]">
                <div className="flex h-11 shrink-0 items-center gap-2 border-b border-[#2b2b2b] px-4 font-display text-[18px] text-[#e8e8e8]">
                  <FileTypeIcon name={s.editorNotice.file} />{s.editorNotice.file}
                </div>
                <div className="flex flex-1 items-center justify-center px-10 text-center font-body text-[19px] break-keep text-[#9d9d9d]">{s.editorNotice.text}</div>
              </div>
            )}
            {!s.editor && !s.editorNotice && !s.preview && (bottom || !showTerm) && <div className="flex-1 bg-[#1f1f1f]" />}
            {s.chatPanel ? (
              <div className="flex w-[40%] shrink-0 flex-col border-l border-[#2b2b2b] bg-[#181818]">
                <div className="flex h-11 items-center gap-3 border-b border-[#2b2b2b] px-4 font-display text-[16px] font-bold text-[#e8e8e8]">
                  <MessageSquareIcon className="size-5" />
                  <span className="flex-1">채팅</span>
                  <XIcon className="size-6 rounded bg-[#3a3a3a] p-0.5 text-white" />
                  {s.chatPanel.closeBadge ? <NumberBadge n={s.chatPanel.closeBadge} size="sm" /> : null}
                </div>
                <div className="flex flex-1 items-center justify-center font-body text-[20px] text-[#8b8b8b]">무엇을 도와드릴까요?</div>
              </div>
            ) : (
              !bottom && terminal
            )}
          </div>
          {bottom && terminal}
        </div>
      </div>

      {s.dialog && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40">
          <div className="flex w-[62%] flex-col overflow-hidden rounded-xl border border-[#d5d5d5] bg-white font-display text-[20px] text-[#1f1f1f] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="flex h-12 items-center border-b border-[#e5e5e5] px-5 font-semibold">{s.dialog.title}</div>
            {s.dialog.path && <div className="border-b border-[#e5e5e5] px-5 py-2 font-term text-[17px] text-[#555]">{s.dialog.path}</div>}
            <div className="flex flex-col gap-1 px-5 py-4">
              {s.dialog.folders.map((f) => (
                <div key={f.name} className={cn("flex items-center gap-3 rounded px-3 py-2", f.selected && "bg-[#e8f2fb] font-bold text-slide-accent")}>
                  <FolderIcon className="size-6 shrink-0 fill-[#f4c542] text-[#e0a800]" />
                  {f.name}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-[#e5e5e5] px-5 py-3">
              <span className="rounded border border-[#d5d5d5] px-5 py-1.5 text-[18px]">취소</span>
              <span className="rounded bg-slide-accent px-5 py-1.5 text-[18px] font-bold text-white">{s.dialog.button}</span>
              {s.dialog.badge ? <NumberBadge n={s.dialog.badge} size="sm" /> : null}
            </div>
          </div>
        </div>
      )}

      {s.toast && (
        <div className="absolute right-6 bottom-6 z-30 flex w-[560px] flex-col gap-4 rounded-lg border border-[#454545] bg-[#252526] p-5 font-display text-[18px] text-[#cccccc] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex gap-3">
            <InfoIcon className="mt-0.5 size-6 shrink-0 text-[#3794ff]" />
            <span className="flex-1 break-keep">{s.toast.text}</span>
            <XIcon className="size-5 shrink-0 text-[#9d9d9d]" />
          </div>
          <div className="flex items-center justify-end gap-3">
            {s.toast.buttons.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className={cn("rounded-sm px-4 py-1 text-[16px]", b.primary ? "bg-slide-accent font-bold text-white" : "bg-[#3a3d41] text-[#e8e8e8]")}>{b.label}</span>
                {b.badge ? <NumberBadge n={b.badge} size="sm" /> : null}
              </span>
            ))}
          </div>
        </div>
      )}

      {s.keycap && (
        <div className="absolute bottom-6 left-24 z-30 flex items-center gap-3">
          {s.keycap.keys.map((k, i) => (
            <span key={i} className="flex items-center gap-3">
              {i > 0 && <span className="font-display text-[28px] font-bold text-white">+</span>}
              <span className="rounded-xl border-2 border-b-[5px] border-white bg-[#2b2b2b] px-5 py-2 font-display text-[28px] font-bold text-white">{k}</span>
            </span>
          ))}
          {s.keycap.times ? <span className="font-display text-[30px] font-bold text-white">× {s.keycap.times}</span> : null}
          {s.keycap.badge ? <NumberBadge n={s.keycap.badge} /> : null}
        </div>
      )}
    </div>
  )
}
