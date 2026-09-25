// Shared bits for the Claude app mock: the orange asterisk mark, the pixel-art mascot, and the inline
// **bold** / `code chip` text renderer used by every paragraph-like block.
import { Fragment } from "react"
import { cn } from "@/lib/utils"

const ORANGE = "#d97757"

/** The 10-blade orange asterisk (Claude's mark): the splash logo, the greeting bullet, the "thinking" mark
 *  left after an answer. Drawn as ten thin rotated bars so no raster asset or emoji is needed. */
export function Asterisk({ size = 28 }: { size?: number }) {
  const blades = Array.from({ length: 10 }, (_, i) => i * 18)
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="shrink-0">
      {blades.map((deg) => (
        <rect key={deg} x={47} y={6} width={6} height={40} rx={3} fill={ORANGE} transform={`rotate(${deg} 50 50)`} />
      ))}
    </svg>
  )
}

/** The small orange pixel-art robot that sits just above-right of the composer input in every capture. */
export function Mascot({ size = 34 }: { size?: number }) {
  // 8x8 grid; 1 = filled pixel. A simple blocky robot silhouette (head + body + legs).
  const grid = [
    "00111100",
    "01111110",
    "01111110",
    "11111111",
    "01111110",
    "01111110",
    "01000010",
    "01000010",
  ]
  const cell = size / 8
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      {grid.flatMap((row, y) =>
        [...row].map((c, x) => (c === "1" ? <rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill={ORANGE} /> : null)),
      )}
    </svg>
  )
}

const CODE_CHIP = "rounded bg-[#f2ece5] border border-[#e6dcd0] px-1.5 py-px font-mono text-[0.86em] text-[#a8442b]"

/** Renders text with inline `**bold**` and `` `code` `` spans — the convention every Claude answer block
 *  (and PhoneMessage.text in schema-phone.ts) uses. */
export function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter((p) => p !== "")
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-semibold text-[#1a1a19]">{part.slice(2, -2)}</strong>
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i} className={CODE_CHIP}>{part.slice(1, -1)}</code>
    return <Fragment key={i}>{part}</Fragment>
  })
}

export function cx(...a: (string | false | undefined)[]) {
  return cn(...a)
}
