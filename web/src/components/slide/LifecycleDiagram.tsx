// Claude Code hooks lifecycle, drawn left to right (CEO 2026-09-22): session start -> a labelled turn
// frame (turn start -> a labelled loop frame with a dashed return arrow under it -> turn end, plus a
// return arrow over the top back to turn start) -> session end, with a row of side events under it.
// Boxes take their natural width (event names never wrap) and the whole diagram is centred; flex only.
import { useLayoutEffect, useRef, useState } from "react"
import type { LifecycleNode, LifecycleSlide } from "@/content/schema"
import { NumberBadge } from "./NumberBadge"
import { cn } from "@/lib/utils"

function Node({ node }: { node: LifecycleNode }) {
  const badge = node.badge ? (
    <span className="absolute -top-5 left-1/2 z-10 -translate-x-1/2">
      <NumberBadge n={node.badge} size="sm" />
    </span>
  ) : null
  if (node.label.startsWith("[")) {
    return (
      <div className="relative flex shrink-0 items-center">
        {badge}
        <span className="rounded-full bg-[#101113] px-7 py-5 font-display text-[26px] font-bold whitespace-nowrap text-white">{node.label.replace(/^\[|\]$/g, "")}</span>
      </div>
    )
  }
  return (
    <div
      className={cn(
        "relative flex h-[150px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border-2 bg-white px-5 text-center",
        node.highlight ? "border-[3px] border-slide-accent" : node.muted ? "border-dashed border-neutral-300" : "border-neutral-300",
      )}
    >
      {badge}
      <span className={cn("font-term text-[26px] font-bold whitespace-nowrap", node.muted ? "text-neutral-400" : "text-[#101113]")}>{node.label}</span>
      {node.sub && <span className="font-body text-[17px] whitespace-nowrap text-[#7c8288]">{node.sub}</span>}
    </div>
  )
}

function Group({ nodes }: { nodes: LifecycleNode[] }) {
  return (
    <div className="flex shrink-0 flex-col items-stretch gap-3">
      {nodes.map((n, i) => (
        <Node key={i} node={n} />
      ))}
    </div>
  )
}

// Session-level events (SessionStart / SessionEnd): a compact pill row above and below the turn frame.
function Pills({ nodes }: { nodes: LifecycleNode[] }) {
  return (
    <div className="flex items-center gap-4">
      {nodes.map((n, i) => (
        <span key={i} className={cn("relative flex items-center gap-3 rounded-full border-2 bg-white px-7 py-3", n.highlight ? "border-slide-accent" : "border-neutral-300")}>
          {n.badge ? <span className="absolute -top-5 left-1/2 -translate-x-1/2"><NumberBadge n={n.badge} size="sm" /></span> : null}
          <span className="font-term text-[26px] font-bold text-[#101113]">{n.label}</span>
          {n.sub && <span className="font-body text-[20px] text-[#7c8288]">{n.sub}</span>}
        </span>
      ))}
    </div>
  )
}

function DownArrow() {
  return (
    <svg viewBox="0 0 24 40" className="h-9 w-6 shrink-0 text-slide-accent">
      <path d="M12 2v32m-9-9 9 9 9-9" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Arrow({ small }: { small?: boolean }) {
  return (
    <svg viewBox="0 0 60 24" className={cn("shrink-0 text-slide-accent", small ? "h-5 w-7" : "h-6 w-10")}>
      <path d="M2 12h50m-10-9 10 9-10 9" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// A dashed U-shaped return arrow spanning its container: `under` opens upward below a row (arrowhead on the
// left end pointing up), otherwise it opens downward above a row (arrowhead on the left end pointing down).
function ReturnArrow({ under, label, tone }: { under?: boolean; label?: string; tone: "accent" | "grey" }) {
  const d = under ? "M985 0 V22 Q985 38 969 38 H31 Q15 38 15 22 V0" : "M985 40 V18 Q985 2 969 2 H31 Q15 2 15 18 V40"
  return (
    <div className={cn("relative h-10 w-full shrink-0", tone === "accent" ? "text-slide-accent" : "text-neutral-400")}>
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="9 7" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg viewBox="0 0 20 16" className={cn("absolute left-[1.5%] h-4 w-5 -translate-x-1/2", under ? "-top-1.5" : "-bottom-1.5 rotate-180")}>
        <path d="M10 0 20 16H0Z" fill="currentColor" />
      </svg>
      {label && (
        <span className={cn("absolute left-1/2 -translate-x-1/2 bg-white px-3 font-body text-[18px] whitespace-nowrap", under ? "top-[18px]" : "-top-3")}>{label}</span>
      )}
    </div>
  )
}

function Tag({ children, solid }: { children: React.ReactNode; solid?: boolean }) {
  return (
    <span
      className={cn(
        "absolute -top-5 left-6 rounded-full px-4 py-1 font-display text-[18px] font-bold whitespace-nowrap",
        solid ? "bg-slide-accent text-white" : "border-2 border-neutral-300 bg-white text-[#43474b]",
      )}
    >
      {children}
    </span>
  )
}

export function LifecycleDiagram({ s }: { s: LifecycleSlide }) {
  const turnLabel = s.turnLabel ?? "매 턴"
  const loopLabel = s.loopLabel ?? "도구 루프"
  const sideLabel = s.sideLabel ?? "따로 발생"
  // The diagram is laid out at its natural size, then scaled as a whole to fill the slide body.
  const box = useRef<HTMLDivElement>(null)
  const art = useRef<HTMLDivElement>(null)
  const [k, setK] = useState(1)
  useLayoutEffect(() => {
    const fit = () => {
      const b = box.current, a = art.current
      if (!b || !a || !a.offsetWidth) return
      setK(Math.min(1.6, (b.clientWidth - 8) / a.offsetWidth, (b.clientHeight - 8) / a.offsetHeight))
    }
    fit()
    const ro = new ResizeObserver(fit)
    if (box.current) ro.observe(box.current)
    return () => ro.disconnect()
  }, [s])
  return (
    <div ref={box} className="flex h-full min-h-0 items-center justify-center overflow-hidden">
    <div ref={art} className="flex shrink-0 flex-col items-center gap-10 pt-6" style={{ transform: `scale(${k})` }}>
      <div className="flex flex-col items-center gap-3">
        <Pills nodes={s.start} />
        <DownArrow />
        {/* each turn */}
        <div className="relative flex flex-col rounded-[28px] border-[3px] border-slide-accent px-6 pt-6 pb-8">
          <Tag solid>{turnLabel}</Tag>
          <div className="px-8"><ReturnArrow label="다음 프롬프트" tone="grey" /></div>
          <div className="mt-4 flex items-center gap-2">
            <Group nodes={s.turnStart} />
            <Arrow />
            {/* the agentic loop */}
            <div className="relative flex flex-col rounded-2xl border-2 border-dashed border-neutral-300 px-5 pt-8 pb-3">
              <Tag>{loopLabel}</Tag>
              <div className="flex items-center gap-1.5">
                {s.loop.map((n, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Node node={n} />
                    {i < s.loop.length - 1 && <Arrow small />}
                  </div>
                ))}
              </div>
              <div className="mt-2 px-10"><ReturnArrow under tone="accent" /></div>
            </div>
            <Arrow />
            <Group nodes={s.turnEnd} />
          </div>
        </div>
        <DownArrow />
        <Pills nodes={s.end} />
      </div>
      {s.side?.length ? (
        <div className="flex max-w-full flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border-2 border-dashed border-neutral-300 px-5 py-2 font-display text-[20px] font-bold text-[#7c8288]">{sideLabel}</span>
          {s.side.map((n, i) => (
            <span
              key={i}
              className={cn(
                "relative rounded-full border-2 px-5 py-2 font-term text-[20px] whitespace-nowrap",
                n.highlight ? "border-slide-accent text-slide-accent" : n.muted ? "border-neutral-200 text-neutral-400" : "border-neutral-300 text-[#43474b]",
              )}
            >
              {n.badge ? <span className="absolute -top-5 left-1/2 -translate-x-1/2"><NumberBadge n={n.badge} size="sm" /></span> : null}
              {n.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
    </div>
  )
}
