// Overlays drawn on top of the current screen: an open dropdown menu, the trust / folder-picker dialog, and
// the blue GitHub-connect popover. At most one of these is present on a given view.
import { CheckIcon, ChevronRightIcon, FolderIcon, PaperclipIcon, PlugIcon, PlugZapIcon, SlashSquareIcon } from "lucide-react"
import type { ClaudeDialog, ClaudeGithubPopover, ClaudeMenu, ClaudeMenuItem } from "@/content/schema-claude"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

const ITEM_ICON = { attach: PaperclipIcon, slash: SlashSquareIcon, connector: PlugZapIcon, plugin: PlugIcon }

function Item({ it }: { it: ClaudeMenuItem }) {
  const Icon = it.icon ? ITEM_ICON[it.icon] : undefined
  return (
    <div className={cn("relative flex items-center gap-3 rounded-lg px-3 py-2", it.active && "bg-[#f0eee7]")}>
      {Icon ? <Icon className="size-[18px] shrink-0 text-neutral-500" /> : null}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 font-body text-[19px] text-[#1a1a19]">
          {it.bold ? <><span className="font-semibold">{it.bold}</span>{it.label.slice(it.bold.length)}</> : it.label}
          {it.tag ? <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[13px] text-neutral-500">{it.tag}</span> : null}
        </div>
        {it.desc ? <div className="font-body text-[15px] text-neutral-400">{it.desc}</div> : null}
      </div>
      {it.check ? <CheckIcon className="size-4 shrink-0 text-[#3a6cc9]" /> : null}
      {it.chevron ? <ChevronRightIcon className="size-4 shrink-0 text-neutral-400" /> : null}
      {it.shortcut ? <span className="shrink-0 font-body text-[15px] text-neutral-400">{it.shortcut}</span> : null}
      {it.badge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={it.badge} size="sm" /></span> : null}
    </div>
  )
}

// mode / folder / slash / slash-filtered anchor to their real trigger element (the composer's mode label, the
// folder chip, the input box) — MenuView is rendered as a child of that trigger by Composer.tsx, positioned
// with `bottom-full left-0` so it opens upward, left-aligned with the button, regardless of that button's own
// width. model / plus have no reported anchoring defect and keep the older content-column-relative anchor.
const ANCHOR: Record<ClaudeMenu["kind"], string> = {
  mode: "bottom-full left-0 mb-2 w-[320px]",
  model: "right-4 bottom-14 w-[190px]",
  plus: "left-4 bottom-14 w-[280px]",
  folder: "bottom-full left-0 mb-2 w-[190px]",
  slash: "bottom-full left-0 mb-2 w-[300px]",
  "slash-filtered": "bottom-full left-0 mb-2 w-[370px]",
}

// The real slash list is a narrow, tall popup that scrolls (desk_18/19): ~15 rows visible with a thin
// scrollbar and the next row faded at the bottom edge. Only turn this on once there are enough rows that it
// would actually overflow — the short filtered list (desk_19) shows no scrollbar at all.
const SLASH_LIST_MAX_HEIGHT = 610

export function MenuView({ m }: { m: ClaudeMenu }) {
  const isSlash = m.kind === "slash" || m.kind === "slash-filtered"
  const scrolls = isSlash && m.items.length > 10
  return (
    <div className={cn("absolute z-30 flex flex-col rounded-xl border border-neutral-200 bg-white py-2 shadow-[0_18px_40px_rgba(16,17,19,0.2)]", ANCHOR[m.kind])}>
      {m.title ? <div className="px-3 pb-1 font-body text-[15px] text-neutral-400">{m.title}</div> : null}
      {isSlash ? (
        <div className="relative">
          <div className="overflow-hidden px-1" style={scrolls ? { maxHeight: SLASH_LIST_MAX_HEIGHT } : undefined}>
            {m.items.map((it, i) => <Item key={i} it={it} />)}
          </div>
          {scrolls ? (
            <>
              <div className="pointer-events-none absolute inset-x-1 bottom-0 h-6 bg-gradient-to-t from-white to-transparent" />
              <div className="pointer-events-none absolute top-1 right-1 bottom-1 w-[3px] rounded-full bg-neutral-200">
                <div className="h-2/5 w-full rounded-full bg-neutral-400" />
              </div>
            </>
          ) : null}
        </div>
      ) : (
        m.items.map((it, i) => <Item key={i} it={it} />)
      )}
      {m.footer ? (
        <div className="relative mt-1 flex items-center justify-between border-t border-neutral-100 px-3 pt-2 font-body text-[18px] text-[#c4453a]">
          <span>{m.footer.label}</span>
          <span className="font-medium">{m.footer.value}</span>
          {m.footer.badge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={m.footer.badge} size="sm" /></span> : null}
        </div>
      ) : null}
      {m.tooltip ? (
        <div className="absolute top-2 left-full ml-3 rounded-md bg-[#2a2a28] px-3 py-1.5 font-body text-[15px] whitespace-nowrap text-white shadow-lg">
          {m.tooltip}
        </div>
      ) : null}
    </div>
  )
}

export function DialogView({ d }: { d: ClaudeDialog }) {
  if (d.kind === "trust")
    // The app behind this dialog is blurred and dimmed (desk_14). The blur itself is applied by the caller
    // (ClaudeApp.tsx blurs the sidebar+content it wraps whenever this dialog is up, via a plain CSS `filter`
    // rather than `backdrop-filter`, since some capture pipelines don't composite backdrop-filter); this layer
    // only adds the light grey veil on top of that blurred content.
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#efece4]/60">
        <div className="w-[560px] rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
          <div className="font-display text-[22px] font-bold text-[#1a1a19]">이 워크스페이스를 신뢰하시겠습니까?</div>
          <div className="mt-2 font-body text-[18px] leading-relaxed text-[#3a3a38]">
            Claude Code가 이 폴더의 파일을 읽거나, 쓰거나, 실행할 수 있습니다. 이 작업 공간을 신뢰하는 경우에만 계속하세요.
          </div>
          <div className="mt-3 font-mono text-[17px] text-[#1a1a19]">{d.path}</div>
          <div className="mt-1 font-body text-[16px] text-neutral-400">
            자세한 내용은 <span className="text-[#3a6cc9] underline">보안 가이드</span>를 참조하세요.
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <span className="relative rounded-lg border border-neutral-300 px-4 py-2 font-body text-[17px] text-[#1a1a19]">
              취소
              {d.cancelBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={d.cancelBadge} size="sm" /></span> : null}
            </span>
            <span className="relative rounded-lg bg-[#1a1a19] px-4 py-2 font-body text-[17px] font-medium text-white">
              작업 공간 신뢰
              {d.confirmBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={d.confirmBadge} size="sm" /></span> : null}
            </span>
          </div>
        </div>
      </div>
    )

  const p = d.picker
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/25">
      <div className="flex h-[420px] w-[700px] flex-col overflow-hidden rounded-lg border border-neutral-300 bg-white text-[#1a1a19] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-neutral-200 bg-[#f3f3f3] px-3 font-body text-[15px]">
          <FolderIcon className="size-4 text-[#f2c265]" />
          {p?.title ?? "로컬 세션용 폴더 선택"}
        </div>
        <div className="flex h-10 shrink-0 items-center gap-1 border-b border-neutral-200 px-3 font-body text-[15px] text-neutral-600">
          {(p?.crumbs ?? ["student"]).map((c, i) => (
            <span key={i} className="flex items-center gap-1">{i > 0 ? <ChevronRightIcon className="size-3" /> : null}{c}</span>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-4 content-start gap-4 overflow-y-auto p-4">
          {(p?.folders ?? ["Documents", "Desktop", "Downloads"]).map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-1 font-body text-[14px] text-[#1a1a19]">
              <FolderIcon className="size-9 fill-[#f2c265] text-[#e3ac3a]" />
              <span className="max-w-full truncate">{f}</span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-3 border-t border-neutral-200 px-3 py-2">
          <span className="font-body text-[14px] text-neutral-600">폴더:</span>
          <div className="h-7 flex-1 rounded border border-neutral-300 px-2 font-body text-[14px] leading-7">{p?.selected}</div>
          <span className="relative rounded border border-neutral-300 bg-[#f3f3f3] px-4 py-1 font-body text-[14px]">
            폴더 선택
            {p?.selectBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={p.selectBadge} size="sm" /></span> : null}
          </span>
          <span className="relative rounded border border-neutral-300 bg-[#f3f3f3] px-4 py-1 font-body text-[14px]">
            취소
            {p?.cancelBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={p.cancelBadge} size="sm" /></span> : null}
          </span>
        </div>
      </div>
    </div>
  )
}

export function GithubPopoverView({ p }: { p: ClaudeGithubPopover }) {
  return (
    <div className="absolute bottom-16 left-1/2 z-30 w-[420px] -translate-x-1/2 rounded-xl bg-[#2b7bd6] p-4 text-white shadow-[0_18px_40px_rgba(16,17,19,0.25)]">
      <div className="relative flex items-center justify-between font-body text-[18px] font-semibold">
        {p.title}
        <span className="relative">
          &#10005;
          {p.closeBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={p.closeBadge} size="sm" /></span> : null}
        </span>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {p.steps.map((s, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-1 size-3.5 shrink-0 rounded-full border-2 border-white/70" />
            <div>
              <div className="font-body text-[17px] font-semibold">{s.title}</div>
              <div className="font-body text-[15px] leading-snug text-white/85">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-3">
        <span className="relative text-white/80">
          &#9881;
          {p.settingsBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={p.settingsBadge} size="sm" /></span> : null}
        </span>
        <span className="relative rounded-lg bg-white px-3 py-1.5 font-body text-[16px] font-semibold text-[#2b7bd6]">
          {p.buttonText}
          {p.buttonBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={p.buttonBadge} size="sm" /></span> : null}
        </span>
      </div>
    </div>
  )
}
