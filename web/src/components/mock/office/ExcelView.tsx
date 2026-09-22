import { ChevronDownIcon, FunctionSquareIcon } from "lucide-react"
import type { OfficeExcel } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

const ROW_H = 30
const ROW_NUM_W = 44
const DEFAULT_COL_W = 100

// Right-aligns anything that reads as a number: digits, ₩/%/,/. and a leading -.
function looksNumeric(t: string) {
  return /\d/.test(t) && /^[\s\d,.\-₩%$]+$/.test(t)
}

const STYLE_CLASS: Record<string, string> = {
  title: "text-[19px] font-bold text-[#1a1a1a]",
  sub: "text-[13px] text-neutral-500",
  head: "text-[14px] font-bold text-white",
  total: "text-[14px] font-bold text-[#1a1a1a]",
  note: "text-[12px] italic text-neutral-500",
  blank: "",
}

export function ExcelView({ e, selected, zoom = 1 }: { e: OfficeExcel; selected?: string; zoom?: number }) {
  const cols = e.cols
  const selCol = selected?.match(/[A-Z]+/)?.[0]
  const selRow = selected?.match(/\d+/)?.[0]

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      {/* name box + fx + formula bar */}
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-neutral-200 px-2 font-term text-[14px] text-[#2b2b2b]">
        <span className="flex h-6 w-[76px] shrink-0 items-center justify-between rounded-sm border border-neutral-300 px-2">
          {e.name ?? selected ?? "A1"}
          <ChevronDownIcon className="size-3 text-neutral-400" />
        </span>
        <span className="mx-1 h-5 w-px bg-neutral-200" />
        <FunctionSquareIcon className="size-4 shrink-0 text-[#107c41]" />
        <span className="min-w-0 flex-1 truncate italic">{e.formula ?? ""}</span>
        {e.formulaBadge ? <NumberBadge n={e.formulaBadge} size="sm" /> : null}
      </div>

      {/* grid, zoomable */}
      <div className="min-h-0 flex-1 overflow-hidden">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: `${100 / zoom}%` }}>
          <table className="border-collapse select-none" style={{ tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: ROW_NUM_W }} />
              {cols.map((c, i) => <col key={i} style={{ width: c.width ?? DEFAULT_COL_W }} />)}
            </colgroup>
            <thead>
              <tr style={{ height: ROW_H }}>
                <th className="border border-[#e1e1e1] bg-[#f3f3f3]" />
                {cols.map((c) => (
                  <th
                    key={c.label}
                    className={cn(
                      "border border-[#e1e1e1] bg-[#f3f3f3] font-body text-[13px] font-normal text-[#3b3b3b]",
                      c.label === selCol && "bg-[#c6e0c6] font-bold text-[#0f6b37]",
                    )}
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {e.rows.map((row, ri) => {
                const style = row.style ?? "blank"
                const isTotal = style === "total"
                const isHead = style === "head"
                return (
                  <tr key={ri} style={{ height: ROW_H }} className={isHead ? "bg-black" : undefined}>
                    <td
                      className={cn(
                        "relative border border-[#e1e1e1] bg-[#f3f3f3] text-center font-body text-[13px] text-[#3b3b3b]",
                        String(ri + 1) === selRow && "bg-[#c6e0c6] font-bold text-[#0f6b37]",
                      )}
                    >
                      {ri + 1}
                      {/* absolute + centred over the cell: marks the row without growing it (a fixed
                          row height must survive a badge taller than the row) */}
                      {row.badge ? (
                        <span className="absolute inset-0 z-10 flex items-center justify-center bg-[#f3f3f3]">
                          <NumberBadge n={row.badge} size="sm" />
                        </span>
                      ) : null}
                    </td>
                    {cols.map((c, ci) => {
                      const text = row.cells[ci] ?? ""
                      const addr = `${c.label}${ri + 1}`
                      const isSel = addr === selected
                      return (
                        <td
                          key={ci}
                          className={cn(
                            "truncate overflow-hidden border border-[#e1e1e1] px-1.5 font-body whitespace-nowrap",
                            STYLE_CLASS[style],
                            isHead && "bg-black",
                            looksNumeric(text) ? "text-right" : "text-left",
                            isTotal && ci === 0 && "border-t-4 border-t-double border-t-[#1a1a1a]",
                          )}
                          style={isSel ? { outline: "2px solid #107c41", outlineOffset: -2, position: "relative", zIndex: 1 } : undefined}
                        >
                          {text}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* sheet tabs + status bar */}
      <div className="flex h-8 shrink-0 items-center gap-0.5 border-t border-neutral-200 bg-[#f3f3f3] px-2 font-body text-[13px] text-[#3b3b3b]">
        {(e.sheets ?? ["Sheet1"]).map((sh, i) => (
          <span key={sh} className={cn("rounded-t px-3 py-1", i === 0 && "bg-white font-semibold text-[#107c41]")}>{sh}</span>
        ))}
      </div>
      <div className="flex h-6 shrink-0 items-center justify-end bg-[#107c41] px-4 font-body text-[11px] text-white">
        준비
      </div>
    </div>
  )
}
