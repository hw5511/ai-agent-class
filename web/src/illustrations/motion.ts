// The four motion primitives the illustration library uses, without Remotion. Vite aliases the module
// name "remotion" to this file, so the ported components run unchanged: useCurrentFrame, interpolate,
// interpolateColors, Easing. Semantics follow Remotion's (per-segment easing, clamp/extend extrapolation).
import { createContext, useContext } from "react"

export const FrameContext = createContext(0)
export const useCurrentFrame = () => useContext(FrameContext)

type Extrapolate = "clamp" | "extend" | "identity"
type Opts = { extrapolateLeft?: Extrapolate; extrapolateRight?: Extrapolate; easing?: (t: number) => number }

export function interpolate(input: number, inRange: readonly number[], outRange: readonly number[], opts: Opts = {}): number {
  const { extrapolateLeft = "extend", extrapolateRight = "extend", easing = (t: number) => t } = opts
  const n = inRange.length
  let i = 1
  while (i < n - 1 && input > inRange[i]) i++
  const [a, b] = [inRange[i - 1], inRange[i]]
  const [c, d] = [outRange[i - 1], outRange[i]]
  let x = input
  if (x < inRange[0]) {
    if (extrapolateLeft === "clamp") return outRange[0]
    if (extrapolateLeft === "identity") return x
  }
  if (x > inRange[n - 1]) {
    if (extrapolateRight === "clamp") return outRange[n - 1]
    if (extrapolateRight === "identity") return x
  }
  if (b === a) return c
  let t = (x - a) / (b - a)
  if (t >= 0 && t <= 1) t = easing(t)
  x = c + (d - c) * t
  return x
}

// ---- easing (same curves as Remotion / React Native Animated) ----------------------------------
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t
  const sy = (t: number) => ((ay * t + by) * t + cy) * t
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  return (x: number) => {
    let t = x
    for (let k = 0; k < 8; k++) {
      const e = sx(t) - x
      const de = dx(t)
      if (Math.abs(e) < 1e-6 || Math.abs(de) < 1e-6) break
      t -= e / de
    }
    t = Math.min(1, Math.max(0, t))
    return sy(t)
  }
}

const bounce = (t: number) => {
  if (t < 1 / 2.75) return 7.5625 * t * t
  if (t < 2 / 2.75) { const u = t - 1.5 / 2.75; return 7.5625 * u * u + 0.75 }
  if (t < 2.5 / 2.75) { const u = t - 2.25 / 2.75; return 7.5625 * u * u + 0.9375 }
  const u = t - 2.625 / 2.75
  return 7.5625 * u * u + 0.984375
}

type E = (t: number) => number
export const Easing = {
  linear: (t: number) => t,
  ease: bezier(0.42, 0, 1, 1),
  quad: (t: number) => t * t,
  cubic: (t: number) => t * t * t,
  sin: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  circle: (t: number) => 1 - Math.sqrt(1 - t * t),
  exp: (t: number) => Math.pow(2, 10 * (t - 1)),
  bounce,
  back: (s = 1.70158) => (t: number) => t * t * ((s + 1) * t - s),
  elastic: (b = 1) => (t: number) => 1 - Math.pow(Math.cos((t * Math.PI) / 2), 3) * Math.cos(t * b * Math.PI),
  poly: (n: number) => (t: number) => Math.pow(t, n),
  bezier,
  in: (f: E) => f,
  out: (f: E) => (t: number) => 1 - f(1 - t),
  inOut: (f: E) => (t: number) => (t < 0.5 ? f(t * 2) / 2 : 1 - f((1 - t) * 2) / 2),
}

// ---- colours ------------------------------------------------------------------------------------
function parse(c: string): [number, number, number, number] {
  const s = c.trim()
  if (s.startsWith("#")) {
    let h = s.slice(1)
    if (h.length === 3 || h.length === 4) h = [...h].map((x) => x + x).join("")
    const v = parseInt(h, 16)
    return h.length === 8 ? [(v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, (v & 255) / 255] : [(v >> 16) & 255, (v >> 8) & 255, v & 255, 1]
  }
  const m = s.match(/rgba?\(([^)]+)\)/)
  if (m) {
    const p = m[1].split(",").map((x) => parseFloat(x))
    return [p[0], p[1], p[2], p[3] ?? 1]
  }
  return [0, 0, 0, 1]
}

export function interpolateColors(input: number, inRange: readonly number[], colors: readonly string[]): string {
  const cs = colors.map(parse)
  const ch = (k: number) => interpolate(input, inRange, cs.map((c) => c[k]), { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  return `rgba(${Math.round(ch(0))}, ${Math.round(ch(1))}, ${Math.round(ch(2))}, ${ch(3).toFixed(3)})`
}
