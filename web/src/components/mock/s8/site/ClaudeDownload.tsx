// claude.com/download — download.png: header, breadcrumb, "Download Claude" hero, Desktop / Mobile cards.
// "Latest news" popup left out per spec.
import { ChevronDownIcon, MonitorIcon } from "lucide-react"
import type { ClaudeDownloadPage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset } from "@/lib/utils"

const NAV = ["Product", "Developers", "Enterprise", "Resources", "Pricing"]

export function ClaudeDownload({ p }: { p: ClaudeDownloadPage }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#faf9f5] font-body text-[#1a1a1a]">
      <div className="flex h-16 shrink-0 items-center gap-7 border-b border-neutral-200 px-8">
        <span className="flex items-center gap-2 font-display text-[22px] font-serif">
          <img src={asset("/logos/claude.svg")} alt="" className="size-6" style={{ filter: "invert(52%) sepia(61%) saturate(640%) hue-rotate(335deg) brightness(92%)" }} /> Claude
        </span>
        {NAV.map((n) => (
          <span key={n} className="flex items-center gap-1 text-[15px] text-neutral-700">{n} <ChevronDownIcon className="size-3.5" /></span>
        ))}
        <span className="ml-auto text-[15px] text-neutral-700">Login</span>
        <span className="rounded-full border border-neutral-300 px-4 py-1.5 text-[14px]">Contact sales</span>
        <span className="rounded-full bg-black px-4 py-1.5 text-[14px] font-semibold text-white">Try Claude</span>
      </div>

      <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-8 py-3 text-[15px]">
        <span className="text-[#0969da]">Download</span>
        <span className="flex items-center gap-1 text-neutral-600">Explore here <ChevronDownIcon className="size-3.5" /></span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center gap-6 overflow-hidden px-8 py-8">
        <h1 className="font-display text-[52px] font-normal" style={{ fontFamily: "Georgia, serif" }}>Download Claude</h1>
        <p className="text-[19px] text-neutral-600">Think, hand off tasks, and code, all in one place.</p>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="flex items-center gap-2 rounded-full bg-black px-6 py-3 font-display text-[16px] font-semibold text-white">
              <MonitorIcon className="size-4" /> Download for Windows
            </button>
            {p.windowsBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.windowsBadge} size="sm" /></span> : null}
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 font-display text-[16px] font-medium">
              <MonitorIcon className="size-4" /> Windows (arm64)
            </button>
            {p.armBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.armBadge} size="sm" /></span> : null}
          </div>
        </div>

        <div className="mt-4 grid w-full grid-cols-[220px_1fr_1fr] gap-8">
          <div className="flex flex-col gap-2">
            <div className="font-display text-[26px] font-normal" style={{ fontFamily: "Georgia, serif" }}>Get started</div>
            <div className="text-[16px] text-neutral-600">Access all of Claude on desktop and mobile.</div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white px-7 py-6">
            <div className="font-display text-[24px] font-normal" style={{ fontFamily: "Georgia, serif" }}>Desktop</div>
            <div className="mb-1 text-[15px] text-neutral-600">All of Claude, in one app. Works with your files and apps to get things done.</div>
            {p.desktop.map((d, i) => (
              <div key={i} className="relative flex items-center justify-between border-t border-neutral-100 pt-3 text-[16px]">
                <span>{d.os}</span>
                <span className="rounded-md border border-neutral-300 px-4 py-1.5 text-[14px] font-medium">{d.note ?? "Download"}</span>
                {d.badge ? <span className="absolute -right-3 -top-3"><NumberBadge n={d.badge} size="sm" /></span> : null}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white px-7 py-6">
            <div className="font-display text-[24px] font-normal" style={{ fontFamily: "Georgia, serif" }}>Mobile</div>
            <div className="mb-1 text-[15px] text-neutral-600">Take Claude anywhere. Pair with the desktop app.</div>
            {p.mobile.map((m, i) => (
              <div key={i} className="relative flex items-center justify-between border-t border-neutral-100 pt-3 text-[16px]">
                <span>{m.os}</span>
                <span className="rounded-md border border-neutral-300 px-4 py-1.5 text-[14px] font-medium">Download</span>
                {m.badge ? <span className="absolute -right-3 -top-3"><NumberBadge n={m.badge} size="sm" /></span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
