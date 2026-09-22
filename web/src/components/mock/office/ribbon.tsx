// Shared Office ribbon: tab row + one grouped button row for the active tab. Only the "홈" tab draws
// real groups (that's the tab every lesson screenshot lives on); other tabs draw as plain labels.
import type { ComponentType } from "react"
import {
  ClipboardIcon,
  ScissorsIcon,
  PaintbrushIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
  WrapTextIcon,
  PercentIcon,
  HashIcon,
  PaletteIcon,
  TableIcon,
  PlusIcon,
  MinusIcon,
  FilterIcon,
  ArrowDownAZIcon,
  SearchIcon,
  PuzzleIcon,
  ImageIcon,
  ShapesIcon,
  ChartColumnIcon,
  LinkIcon,
  TypeIcon,
  ListIcon,
  FileTextIcon,
  LayoutIcon,
  SparklesIcon,
  PlayIcon,
  MonitorPlayIcon,
} from "lucide-react"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

export type OfficeApp = "excel" | "word" | "powerpoint"

export const APP_COLOR: Record<OfficeApp, string> = {
  excel: "#107c41",
  word: "#185abd",
  powerpoint: "#c43e1c",
}

export const APP_LETTER: Record<OfficeApp, string> = { excel: "X", word: "W", powerpoint: "P" }

const ACCENT = "#1273c4"

const TABS: Record<OfficeApp, string[]> = {
  excel: ["파일", "홈", "삽입", "페이지 레이아웃", "수식", "데이터", "검토", "보기", "도움말"],
  word: ["파일", "홈", "삽입", "디자인", "레이아웃", "참조", "편지", "검토", "보기", "도움말"],
  powerpoint: ["파일", "홈", "삽입", "디자인", "전환", "애니메이션", "슬라이드 쇼", "검토", "보기", "도움말"],
}

interface RibbonBtn {
  icon: ComponentType<{ className?: string }>
  label?: string
}
interface RibbonGroup {
  label: string
  btns: RibbonBtn[]
}

const GROUPS: Record<OfficeApp, RibbonGroup[]> = {
  excel: [
    { label: "붙여넣기", btns: [{ icon: ClipboardIcon }, { icon: ScissorsIcon }, { icon: PaintbrushIcon }] },
    { label: "글꼴", btns: [{ icon: BoldIcon }, { icon: ItalicIcon }, { icon: UnderlineIcon }, { icon: PaletteIcon }] },
    { label: "맞춤", btns: [{ icon: AlignLeftIcon }, { icon: AlignCenterIcon }, { icon: AlignJustifyIcon }, { icon: WrapTextIcon }] },
    { label: "표시 형식", btns: [{ icon: PercentIcon }, { icon: HashIcon }] },
    { label: "조건부 서식", btns: [{ icon: TableIcon }, { icon: PaletteIcon }] },
    { label: "셀", btns: [{ icon: PlusIcon }, { icon: MinusIcon }] },
    { label: "편집", btns: [{ icon: FilterIcon }, { icon: ArrowDownAZIcon }, { icon: SearchIcon }] },
    { label: "추가 기능", btns: [{ icon: PuzzleIcon }] },
  ],
  word: [
    { label: "클립보드", btns: [{ icon: ClipboardIcon }, { icon: ScissorsIcon }, { icon: PaintbrushIcon }] },
    { label: "글꼴", btns: [{ icon: BoldIcon }, { icon: ItalicIcon }, { icon: UnderlineIcon }, { icon: PaletteIcon }] },
    { label: "단락", btns: [{ icon: AlignLeftIcon }, { icon: AlignCenterIcon }, { icon: AlignJustifyIcon }, { icon: ListIcon }] },
    { label: "스타일", btns: [{ icon: TypeIcon }, { icon: FileTextIcon }] },
    { label: "편집", btns: [{ icon: SearchIcon }, { icon: ArrowDownAZIcon }] },
    { label: "추가 기능", btns: [{ icon: PuzzleIcon }] },
  ],
  powerpoint: [
    { label: "클립보드", btns: [{ icon: ClipboardIcon }, { icon: ScissorsIcon }, { icon: PaintbrushIcon }] },
    { label: "슬라이드", btns: [{ icon: LayoutIcon }, { icon: PlusIcon }] },
    { label: "글꼴", btns: [{ icon: BoldIcon }, { icon: ItalicIcon }, { icon: UnderlineIcon }] },
    { label: "단락", btns: [{ icon: AlignLeftIcon }, { icon: AlignCenterIcon }, { icon: ListIcon }] },
    { label: "그리기", btns: [{ icon: ShapesIcon }, { icon: ImageIcon }, { icon: ChartColumnIcon }] },
    { label: "편집", btns: [{ icon: SearchIcon }, { icon: LinkIcon }] },
    { label: "추가 기능", btns: [{ icon: PuzzleIcon }] },
  ],
}

export function RibbonTabs({ app, active }: { app: OfficeApp; active: string }) {
  const color = APP_COLOR[app]
  return (
    <div className="flex h-9 shrink-0 items-center gap-5 border-b border-neutral-200 bg-white px-4 font-display text-[15px] text-[#3b3b3b]">
      {TABS[app].map((t) => (
        <span
          key={t}
          className={cn("relative py-1.5", t === active && "font-semibold")}
          style={t === active ? { color } : undefined}
        >
          {t}
          {t === active && <span className="absolute right-0 -bottom-[1px] left-0 h-[3px]" style={{ background: color }} />}
        </span>
      ))}
    </div>
  )
}

export function RibbonRow({ app, mark }: { app: OfficeApp; mark?: { label: string; badge?: number } }) {
  const groups = GROUPS[app]
  return (
    <div className="flex h-[84px] shrink-0 items-stretch gap-0 border-b border-neutral-200 bg-[#fafafa] px-3 py-1.5">
      {groups.map((g, gi) => {
        const marked = mark?.label === g.label
        return (
          <div key={g.label} className="flex items-center">
            <div className="flex h-full flex-col items-center justify-between px-2.5">
              <div className="flex flex-1 flex-wrap items-center justify-center gap-1.5 content-center">
                {g.btns.map((b, i) => {
                  const Icon = b.icon
                  const soleMark = marked && g.btns.length === 1
                  return (
                    <span
                      key={i}
                      className={cn(
                        "relative flex size-[26px] items-center justify-center rounded text-[#444]",
                        soleMark && "outline outline-[3px] outline-[#1273c4]",
                      )}
                    >
                      <Icon className="size-[17px]" />
                      {soleMark && mark?.badge ? (
                        <span className="absolute -top-[22px] -right-[22px] z-10"><NumberBadge n={mark.badge} size="sm" /></span>
                      ) : null}
                    </span>
                  )
                })}
              </div>
              <span className={cn("mt-1 truncate text-[12px] leading-tight text-[#5a5a5a]", marked && "font-bold")} style={marked ? { color: ACCENT } : undefined}>
                {g.label}
              </span>
            </div>
            {gi < groups.length - 1 && <span className="mx-1 my-2 w-px self-stretch bg-neutral-200" />}
          </div>
        )
      })}
    </div>
  )
}

export { SparklesIcon, PlayIcon, MonitorPlayIcon }
