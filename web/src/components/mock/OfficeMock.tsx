// Microsoft Office window (Excel / Word / PowerPoint), light Windows theme: title bar in the app
// colour, ribbon (tabs + one grouped button row), the app's document area, an optional Claude add-in
// panel on the right, and an optional centred dialog.
import { AlertTriangleIcon } from "lucide-react"
import type { OfficeScreen } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { APP_COLOR, APP_LETTER, RibbonRow, RibbonTabs } from "./office/ribbon"
import { ExcelView } from "./office/ExcelView"
import { WordView } from "./office/WordView"
import { PptView } from "./office/PptView"
import { PanelView } from "./office/PanelView"

export function OfficeMock({ s }: { s: OfficeScreen }) {
  const color = APP_COLOR[s.app]
  const tab = s.tab ?? "홈"

  return (
    <div className="relative flex h-full min-h-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_18px_40px_rgba(16,17,19,0.16)]">
      <div className="flex min-w-0 flex-1 flex-col">
        {/* title bar */}
        <div className="flex h-11 shrink-0 items-center gap-3 px-4 font-display text-[16px] text-white" style={{ background: color }}>
          <span className="flex size-6 shrink-0 items-center justify-center rounded-[4px] bg-white/20 font-display text-[14px] font-extrabold">
            {APP_LETTER[s.app]}
          </span>
          <span className="min-w-0 flex-1 truncate text-center font-medium">{s.file}</span>
          <span className="flex shrink-0 items-center gap-5 text-white/85">
            <span className="text-[15px]">—</span>
            <span className="text-[13px]">▢</span>
            <span className="text-[15px]">✕</span>
          </span>
        </div>

        <RibbonTabs app={s.app} active={tab} />
        <RibbonRow app={s.app} mark={tab === "홈" ? s.ribbonMark : undefined} />

        {/* document area */}
        {s.app === "excel" && s.excel && <ExcelView e={s.excel} selected={s.excel.selected} zoom={s.zoom ?? 1} />}
        {s.app === "word" && s.word && <WordView pages={s.word.pages} />}
        {s.app === "powerpoint" && s.powerpoint && <PptView slides={s.powerpoint.slides} current={s.powerpoint.current} />}

        <div className="flex h-5 shrink-0 items-center justify-end bg-[#f3f3f3] px-4 font-body text-[11px] text-neutral-400">
          {s.app === "excel" ? null : "100%"}
        </div>
      </div>

      {s.panel && <PanelView p={s.panel} />}

      {s.dialog && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/35">
          <div className="flex w-[720px] flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 font-display text-[26px] font-bold text-[#1a1a1a]">
              <span className="min-w-0 flex-1 truncate">{s.dialog.title}</span>
              {s.dialog.badge ? <NumberBadge n={s.dialog.badge} size="sm" /> : null}
            </div>
            <div className="flex items-start gap-4 px-6 py-6">
              <AlertTriangleIcon className="mt-0.5 size-8 shrink-0 text-[#c43e1c]" />
              <span className="font-body text-[22px] leading-snug text-[#3b3b3b] break-keep">{s.dialog.text}</span>
            </div>
            <div className="flex justify-end border-t border-neutral-200 px-6 py-4">
              <span className="rounded px-6 py-2 font-body text-[20px] font-semibold text-white" style={{ background: color }}>
                {s.dialog.button ?? "확인"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
