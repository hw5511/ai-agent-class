// The launch banner each CLI really prints: Claude Code's block mascot, Antigravity's rainbow pixel
// "A", Codex's rounded box. Brand colours live here only (they are the products' own colours).
import type { Vendor } from "@/content/schema"

const CLAUDE_ORANGE = "#D97757"

// Sampled cell by cell from a real Antigravity CLI capture (slidekit2/public/slides/shots/agy_실행_화면.png).
const AGY: (string | null)[][] = [
  [null, null, null, null, null, "#f2922e", "#f07236", null, null, null, null, null],
  [null, null, null, null, "#dbb131", "#f6912e", "#f37337", "#f0583b", null, null, null, null],
  [null, null, null, "#9ec345", "#b5b43e", "#e2993d", "#f67a34", "#f86a35", "#ef5442", null, null, null],
  [null, null, null, "#86c64e", "#75b45e", "#cc954d", "#ef7947", "#e16652", "#e14f59", null, null, null],
  [null, null, "#7cc251", "#71c25c", "#5ca98f", "#5c91b3", "#8373b0", "#746fc3", "#995da8", "#9c5b97", null, null],
  [null, null, "#80c654", "#54b881", "#4097de", null, null, "#4a7ee4", "#706ece", "#8f64b4", null, null],
  [null, null, "#61c37d", "#43aeab", null, null, null, null, "#4a80ea", "#6c73d8", null, null],
  [null, "#61c3a0", "#61bfa8", "#44abc4", null, null, null, null, "#4384f2", "#5b79e4", "#5b79e4", null],
  [null, "#6dc694", "#62bad5", "#47a8dc", null, null, null, null, "#3d89fb", "#4a81f0", "#6579e1", null],
  [null, "#6bc7a3", "#64b6f6", null, null, null, null, null, null, "#3886fb", "#4881f4", null],
  ["#67b9f4", "#64b6f6", null, null, null, null, null, null, null, null, "#3883f9", "#3d85fc"],
]

// Claude Code's mascot is glyph art: quadrant blocks on the terminal grid.
const Q: Record<string, number[]> = { " ": [0, 0, 0, 0], "█": [1, 1, 1, 1], "▐": [0, 1, 0, 1], "▌": [1, 0, 1, 0], "▛": [1, 1, 1, 0], "▜": [1, 1, 0, 1], "▝": [0, 1, 0, 0], "▘": [1, 0, 0, 0] }
const MASCOT = [" ▐▛███▜▌ ", "▝▜█████▛▘", "  ▘▘ ▝▝  "]

const home = (p?: string) => (p ?? "~").replace(/^[A-Za-z]:\\Users\\[^\\]+/, "~")

export function VendorBanner({ vendor, cwd }: { vendor: Vendor; cwd?: string }) {
  if (vendor === "claude") {
    return (
      <div className="flex items-center gap-5">
        <svg viewBox="0 0 18 6" className="h-[106px] w-[114px] shrink-0" shapeRendering="crispEdges" preserveAspectRatio="none">
          {MASCOT.flatMap((line, r) => Array.from(line).flatMap((ch, c) => (Q[ch] ?? Q[" "]).map((on, k) => (on ? <rect key={`${r}${c}${k}`} x={c * 2 + (k % 2)} y={r * 2 + (k >= 2 ? 1 : 0)} width={1.02} height={1.02} fill={CLAUDE_ORANGE} /> : null))))}
        </svg>
        <div className="flex min-w-0 flex-col">
          <span className="truncate"><b>Claude Code</b> <span className="text-[#8b9095]">v2.1.273</span></span>
          <span className="truncate text-[#8b9095]">Sonnet 5 · Claude Pro</span>
          <span className="truncate text-[#8b9095]">{home(cwd)}</span>
        </div>
      </div>
    )
  }
  if (vendor === "antigravity") {
    return (
      <div className="flex items-center gap-6">
        <svg viewBox="0 0 12 11" className="h-[128px] w-[140px] shrink-0" shapeRendering="crispEdges">
          {AGY.flatMap((row, r) => row.map((c, x) => (c ? <rect key={`${r}-${x}`} x={x} y={r} width={1.02} height={1.02} fill={c} /> : null)))}
        </svg>
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-bold text-[#4f9dff]">Antigravity CLI 1.2.7</span>
          <span className="truncate">student@gmail.com</span>
          <span className="truncate">Gemini 3.8 Flash (High)</span>
          <span className="truncate">{home(cwd)}</span>
        </div>
      </div>
    )
  }
  if (vendor === "codex") {
    return (
      <div className="flex flex-col rounded-md border border-[#4a4f54] px-5 py-3">
        <span className="truncate"><b>&gt;_ OpenAI Codex</b> <span className="text-[#8b9095]">(v0.154.0)</span></span>
        <span className="truncate"><span className="text-[#8b9095]">model:     </span>gpt-5.6-sol medium</span>
        <span className="truncate"><span className="text-[#8b9095]">directory: </span>{home(cwd)}</span>
      </div>
    )
  }
  return null
}
