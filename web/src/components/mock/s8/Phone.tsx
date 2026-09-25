// A modern phone frame (rounded black bezel, camera island) showing Claude Code on the web in mobile
// view. The screen content is laid out at the capture's fixed 390x844 design size and scaled to fit
// the frame via a CSS transform, so it looks the same at any slide size. Numbered badges are drawn by
// each screen component, counter-scaled so they always render at full size (see phone/shared.tsx).
import { useLayoutEffect, useRef, useState } from "react"
import type { PhoneView } from "@/content/schema-phone"
import { PhoneHome } from "./phone/Home"
import { PhoneSidebar } from "./phone/Sidebar"
import { PhoneSession } from "./phone/Session"

const DESIGN_W = 390
const DESIGN_H = 844

export function PhoneMock({ v }: { v: PhoneView }) {
  const screenRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useLayoutEffect(() => {
    const el = screenRef.current
    if (!el) return
    const fit = () => setScale(el.clientHeight / DESIGN_H)
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center">
      <div className="relative h-full max-w-full" style={{ aspectRatio: `${DESIGN_W} / ${DESIGN_H}` }}>
        {/* bezel */}
        <div className="absolute inset-0 rounded-[48px] bg-neutral-900 shadow-[0_18px_40px_rgba(16,17,19,0.28)]" />
        {/* camera island */}
        <div className="absolute top-[10px] left-1/2 z-10 h-[16px] w-[56px] -translate-x-1/2 rounded-full bg-black" />
        {/* screen */}
        <div ref={screenRef} className="absolute inset-[13px] overflow-hidden rounded-[36px] bg-white">
          {scale > 0 && (
            <div className="absolute top-0 left-0 origin-top-left" style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})` }}>
              {v.screen === "home" && <PhoneHome v={v} scale={scale} />}
              {v.screen === "sidebar" && <PhoneSidebar v={v} scale={scale} />}
              {v.screen === "session" && <PhoneSession v={v} scale={scale} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
