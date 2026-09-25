// The home screen's greeting and usage-stats card (desk_07 - desk_16). The card starts as six grey skeleton
// blocks (`skeleton: true`) and, once loaded, shows the metrics grid, the activity heatmap and the caption.
import { NumberBadge } from "@/components/slide/NumberBadge"
import type { ClaudeHome } from "@/content/schema-claude"
import { cn } from "@/lib/utils"
import { Asterisk } from "./util"

// desk_15: a 26-column x 7-row grid of small rounded squares (~18px with ~4px gaps at capture scale), sized
// to fill the card's width exactly (an inline `gridTemplateColumns` rather than a Tailwind arbitrary class, so
// the column count is exact regardless of how a given render pipeline handles CSS grid). Fewer/bigger columns
// made the old grid run wider than its card; 26 narrow columns keeps the whole thing inside the card's padding.
const HEATMAP_COLS = 26
const HEATMAP_ROWS = 7

function Heatmap() {
  // A deterministic filled/empty pattern, close enough to the capture's activity grid — decorative only.
  const seed = [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1]
  return (
    <div className="mt-3 grid gap-1" style={{ gridTemplateColumns: `repeat(${HEATMAP_COLS}, minmax(0, 1fr))` }}>
      {Array.from({ length: HEATMAP_ROWS * HEATMAP_COLS }, (_, i) => {
        const row = Math.floor(i / HEATMAP_COLS)
        const col = i % HEATMAP_COLS
        const on = seed[(col + row * 5) % seed.length] === 1
        const dark = on && (row + col) % 9 === 0
        return <span key={i} className={cn("aspect-square rounded-[2px]", on ? (dark ? "bg-[#3a6cc9]" : "bg-[#8fb3e8]") : "bg-neutral-200")} />
      })}
    </div>
  )
}

export function StatsCard({ s }: { s: NonNullable<ClaudeHome["stats"]> }) {
  const tabs = s.tabs ?? ["개요", "모델"]
  const activeTab = s.activeTab ?? tabs[0]
  const ranges = s.ranges ?? ["전체", "30일", "7d"]
  const activeRange = s.activeRange ?? ranges[0]
  return (
    <div className="relative mt-8 max-w-[58%] rounded-2xl bg-[#efece4] p-5">
      {s.badge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={s.badge} size="sm" /></span> : null}
      <div className="flex items-center justify-between">
        <span className="flex gap-5 font-body text-[17px] text-neutral-500">
          {tabs.map((t) => (
            <span key={t} className={cn(t === activeTab && "font-semibold text-[#2a2a28]")}>{t}</span>
          ))}
        </span>
        <span className="flex gap-1 font-body text-[15px] text-neutral-500">
          {ranges.map((r) => (
            <span key={r} className={cn("rounded-md px-2 py-1", r === activeRange && "bg-white font-medium text-[#2a2a28] shadow-sm")}>{r}</span>
          ))}
        </span>
      </div>

      {s.skeleton || !s.metrics ? (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {Array.from({ length: 5 }, (_, i) => <div key={i} className="h-[52px] rounded-lg bg-neutral-300/60" />)}
          <div className="col-span-3 h-[130px] rounded-lg bg-neutral-300/60" />
          <div className="col-span-3 h-3 w-1/3 rounded-full bg-neutral-300/60" />
        </div>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {s.metrics.map((m, i) => (
              <div key={i} className="rounded-lg bg-white px-4 py-2.5">
                <div className="font-body text-[15px] text-neutral-500">{m.label}</div>
                <div className="font-display text-[24px] font-bold text-[#1a1a19]">{m.value}</div>
              </div>
            ))}
          </div>
          {s.heatmap ? <Heatmap /> : null}
          {s.caption ? <div className="mt-3 font-body text-[16px] text-neutral-500">{s.caption}</div> : null}
        </>
      )}
    </div>
  )
}

export function Greeting({ h }: { h: ClaudeHome }) {
  return (
    <div className="relative flex items-center gap-3 font-display text-[30px] text-[#1a1a19]">
      <Asterisk size={30} />
      <span>{h.greeting}</span>
      {h.greetingBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={h.greetingBadge} size="sm" /></span> : null}
    </div>
  )
}
