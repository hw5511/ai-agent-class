// Light product mocks: a chat assistant window and a browser page. White surfaces, thin borders,
// numbered badges pinned to the message / result they belong to.
import { GlobeIcon, SearchIcon } from "lucide-react"
import type { BrowserScreen, ChatScreen } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"

function Window({ title, logo, children }: { title: string; logo?: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_18px_40px_rgba(16,17,19,0.10)]">
      <div className="flex h-14 shrink-0 items-center gap-4 border-b border-neutral-200 px-6">
        <span className="flex gap-2">
          {[0, 1, 2].map((i) => <span key={i} className="size-3.5 rounded-full border-2 border-neutral-300" />)}
        </span>
        {logo && <img src={logo} alt="" className="h-6 w-auto opacity-80" />}
        <span className="font-display text-[22px] font-semibold text-[#43474b]">{title}</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

export function ChatMock({ s }: { s: ChatScreen }) {
  return (
    <Window title={s.app} logo={s.logo}>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-6 overflow-hidden px-10 py-8">
        {s.messages.map((m, i) => (
          <div key={i} className={cn("flex items-start gap-4", m.role === "user" ? "flex-row-reverse" : "")}>
            {m.badge ? <NumberBadge n={m.badge} /> : <span className="size-11 shrink-0" />}
            <div
              className={cn(
                "max-w-[78%] rounded-3xl px-7 py-5 font-body text-[26px] leading-[1.5] break-keep",
                m.role === "user" ? "bg-slide-accent text-white" : "border border-neutral-200 bg-white text-[#101113]",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-10 mb-8 rounded-full border border-neutral-200 px-7 py-4 font-body text-[22px] text-neutral-400">메시지 보내기</div>
    </Window>
  )
}

export function BrowserMock({ s }: { s: BrowserScreen }) {
  return (
    <Window title={s.url.replace(/^https?:\/\//, "").split("/")[0]}>
      <div className="flex h-16 shrink-0 items-center gap-4 border-b border-neutral-200 px-6">
        <div className="flex h-11 flex-1 items-center gap-3 rounded-full border border-neutral-200 px-5 font-term text-[20px] text-[#43474b]">
          {s.results ? <SearchIcon className="size-5 text-neutral-400" /> : <GlobeIcon className="size-5 text-neutral-400" />}
          <span className="truncate">{s.url}</span>
        </div>
      </div>
      {s.results && (
        <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-hidden px-12 py-10">
          {s.results.map((r, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="font-body text-[19px] text-neutral-500">{r.site}</span>
                <span className="font-display text-[30px] font-semibold text-[#1a0dab] break-keep">{r.title}</span>
                {r.snippet && <span className="font-body text-[21px] leading-[1.5] text-[#43474b] break-keep">{r.snippet}</span>}
              </div>
              {r.badge ? <NumberBadge n={r.badge} /> : null}
            </div>
          ))}
        </div>
      )}
      {s.page && (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-12">
          <span className="font-display text-[48px] font-bold text-[#101113] break-keep text-balance text-center">{s.page.heading}</span>
          {s.page.lines?.map((l, i) => <span key={i} className="font-body text-[24px] text-[#43474b] break-keep">{l}</span>)}
          {s.page.button && <span className="rounded-full bg-slide-accent px-10 py-4 font-display text-[26px] font-bold text-white">{s.page.button}</span>}
        </div>
      )}
    </Window>
  )
}
