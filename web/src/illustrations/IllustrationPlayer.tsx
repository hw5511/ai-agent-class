// Plays a library illustration live and on loop inside its box (the ax-site rule: illustrations never
// sit still). A requestAnimationFrame clock at 30 fps feeds ./motion's FrameContext; the canvas is
// scaled to fit the box. No Remotion.
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { FrameContext } from "./motion"
import { ILLUSTRATIONS } from "./registry"

const FPS = 30

export function IllustrationPlayer({ id, props, seconds = 12 }: { id: string; props?: Record<string, unknown>; seconds?: number }) {
  const illo = ILLUSTRATIONS[id]
  const frames = Math.round(seconds * FPS)
  const [frame, setFrame] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      setFrame(Math.floor(((now - t0) / 1000) * FPS) % frames)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [frames])

  useLayoutEffect(() => {
    const el = box.current
    if (!el || !illo) return
    const fit = () => setScale(Math.min(el.clientWidth / illo.canvas.w, el.clientHeight / illo.canvas.h))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [illo])

  if (!illo) {
    return (
      <div className="flex size-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 font-display text-[30px] text-[#7c8288]">
        일러스트 라이브러리 · {id}
      </div>
    )
  }
  const { Component, canvas } = illo
  return (
    <div ref={box} className="flex size-full items-center justify-center overflow-hidden">
      <div style={{ width: canvas.w * scale, height: canvas.h * scale }}>
        <div className="origin-top-left" style={{ width: canvas.w, height: canvas.h, transform: `scale(${scale})` }}>
          <FrameContext.Provider value={frame}>
            <Component budget={frames} {...props} />
          </FrameContext.Provider>
        </div>
      </div>
    </div>
  )
}
