// A 1920x1080 stage scaled to fit its container. Templates are written in stage pixels; the stage
// scales as a whole, so the slide looks the same on a laptop, a projector or fullscreen.
import { useLayoutEffect, useRef, useState } from "react"
import type { Slide } from "@/content/schema"
import { SlideBody } from "./templates"

const W = 1920
const H = 1080

export function SlideStage({ slide, eyebrow }: { slide: Slide; eyebrow: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => setScale(Math.min(el.clientWidth / W, el.clientHeight / H))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const legacy = slide.template === "image"
  return (
    <div ref={box} className="relative flex size-full items-center justify-center overflow-hidden">
      <div className="shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5" style={{ width: W * scale, height: H * scale }}>
        <div className="origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
          {legacy ? (
            <SlideBody slide={slide} />
          ) : (
            <div className="flex size-full flex-col gap-10 px-[120px] pt-[60px] pb-[64px]">
              <header className="flex flex-col gap-3">
                <span className="font-term text-[24px] tracking-[0.12em] text-[#7c8288]"><span className="text-slide-accent">● </span>{eyebrow}</span>
                <h1 className="font-display text-[68px] leading-[1.1] font-bold tracking-[-0.02em] break-keep text-balance text-[#101113]">{slide.title}</h1>
              </header>
              <main className="min-h-0 flex-1"><SlideBody slide={slide} /></main>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
