import { useLayoutEffect, useRef, useState } from "react"
import type { Screen } from "@/content/schema"
import { VSCodeMock } from "@/components/mock/VSCodeMock"
import { AgentTerminal } from "@/components/mock/AgentTerminal"
import { BrowserMock, ChatMock, FileMock } from "@/components/mock/WebMocks"
import { AgentViewMock } from "@/components/mock/AgentViewMock"
import { OfficeMock } from "@/components/mock/OfficeMock"
import { ClaudeAppBody, ClaudeAppWindow } from "@/components/mock/s8/ClaudeApp"
import { SitePageBody } from "@/components/mock/s8/SitePages"
import { PhoneMock } from "@/components/mock/s8/Phone"
import { ChromeFrame } from "@/components/mock/s8/ChromeFrame"
import { Pinned } from "@/components/mock/s8/Pins"
import { NumberBadge } from "./NumberBadge"
import { asset } from "@/lib/utils"

// One switch from screen data to mockup. New screen kinds are added here and in the schema only.
export function ScreenView({ screen }: { screen: Screen }) {
  if (screen.kind === "vscode") return <VSCodeMock s={screen} />
  if (screen.kind === "chat") return <ChatMock s={screen} />
  if (screen.kind === "browser") return <BrowserMock s={screen} />
  if (screen.kind === "file") return <FileMock s={screen} />
  if (screen.kind === "agentview") return <AgentViewMock s={screen} />
  if (screen.kind === "office") return <OfficeMock s={screen} />
  if (screen.kind === "desktop") return <Pinned pins={screen.pins}><ClaudeAppWindow v={screen.view} /></Pinned>
  if (screen.kind === "phone") return <Pinned pins={screen.pins}><PhoneMock v={screen.view} /></Pinned>
  if (screen.kind === "web") {
    const p = screen.page
    return (
      <Pinned pins={screen.pins}>
        <ChromeFrame s={screen}>
          {p.type === "image" ? (
            <img src={asset(p.src)} alt="" className="size-full object-cover object-top" />
          ) : p.type === "claude" ? (
            <ClaudeAppBody v={p} />
          ) : (
            <SitePageBody p={p} />
          )}
        </ChromeFrame>
      </Pinned>
    )
  }
  if (screen.kind === "video")
    return (
      <div className="flex h-full min-h-0 items-center justify-center">
        <video
          src={asset(screen.src)}
          poster={screen.poster ? asset(screen.poster) : undefined}
          controls
          playsInline
          loop={screen.loop}
          preload="metadata"
          className="size-full object-contain drop-shadow-[0_12px_28px_rgba(16,17,19,0.14)]"
        />
      </div>
    )
  if (screen.kind === "terminal")
    return (
      <div className="h-full min-h-0 overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(16,17,19,0.16)]">
        <AgentTerminal t={screen.terminal} />
      </div>
    )
  if (!screen.badges?.length)
    return (
      <div className="flex h-full min-h-0 items-center justify-center">
        <img src={asset(screen.src)} alt="" className="size-full object-contain drop-shadow-[0_12px_28px_rgba(16,17,19,0.14)]" />
      </div>
    )
  return <BadgedShot src={screen.src} badges={screen.badges} />
}

// A capture with numbered badges: the picture is scaled to fit its box (up or down, keeping its ratio) and the
// badges are placed in percent of the picture, so they stay on the item at any size.
function BadgedShot({ src, badges }: { src: string; badges: { n: number; x: number; y: number }[] }) {
  const box = useRef<HTMLDivElement>(null)
  const [nat, setNat] = useState<[number, number] | null>(null)
  const [size, setSize] = useState<[number, number]>([0, 0])
  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => setSize([el.clientWidth, el.clientHeight])
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  let w = 0, h = 0
  if (nat && size[0] && size[1]) {
    const k = Math.min(size[0] / nat[0], size[1] / nat[1])
    w = nat[0] * k
    h = nat[1] * k
  }
  return (
    <div ref={box} className="flex h-full min-h-0 w-full items-center justify-center">
      <div className="relative shrink-0" style={nat ? { width: w, height: h } : undefined}>
        <img src={asset(src)} alt="" onLoad={(e) => setNat([e.currentTarget.naturalWidth, e.currentTarget.naturalHeight])} className={nat ? "size-full drop-shadow-[0_12px_28px_rgba(16,17,19,0.14)]" : "max-h-full max-w-full"} />
        {nat &&
          badges.map((b, i) => (
            <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-white" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
              <NumberBadge n={b.n} />
            </span>
          ))}
      </div>
    </div>
  )
}
