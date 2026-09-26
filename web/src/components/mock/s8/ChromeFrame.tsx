// Chrome on Windows, as in the step 8 captures (gh_01_signup.png, cs_08_answer.png): a light-blue tab strip with
// the tabs and the window buttons, then a white toolbar with back / forward / reload, the rounded address field
// and the star + profile icons. The page fills the rest.
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, MinusIcon, PlusIcon, RotateCwIcon, SquareIcon, StarIcon, UserCircleIcon, XIcon, GlobeIcon, SlidersHorizontalIcon } from "lucide-react"
import type { WebScreen, WebTabIcon } from "@/content/schema"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset, cn } from "@/lib/utils"

function TabIcon({ icon }: { icon?: WebTabIcon }) {
  if (icon === "claude") return <img src={asset("/logos/claude.svg")} alt="" className="size-[18px]" style={{ filter: "invert(52%) sepia(61%) saturate(640%) hue-rotate(335deg) brightness(92%)" }} />
  if (icon === "github") return <img src={asset("/logos/github.svg")} alt="" className="size-[18px]" />
  if (icon === "google") return <img src={asset("/logos/google.svg")} alt="" className="size-[18px]" />
  if (icon === "gmail") return <img src={asset("/logos/gmail.svg")} alt="" className="size-[18px]" />
  return <GlobeIcon className="size-[18px] text-neutral-500" />
}

// Underlines each `marks[].text` substring of `url` with a 3px accent rule and drops its badge just
// below, by splitting the url into plain/marked spans (no pixel guessing — the badge's left offset
// comes from normal inline text flow, not a computed pixel value). The badges render below the address
// bar, overlapping the top edge of the page area beneath it, so nothing above (the toolbar / url pill)
// may clip them — callers must keep those ancestors overflow-visible and stacked above the page.
function UrlWithMarks({ url, marks }: { url: string; marks: { text: string; badge: number }[] }) {
  const found = marks
    .map((m) => ({ ...m, idx: url.indexOf(m.text) }))
    .filter((m) => m.idx >= 0)
    .sort((a, b) => a.idx - b.idx)
  const segs: { text: string; badge?: number }[] = []
  let cursor = 0
  for (const m of found) {
    if (m.idx > cursor) segs.push({ text: url.slice(cursor, m.idx) })
    segs.push({ text: url.slice(m.idx, m.idx + m.text.length), badge: m.badge })
    cursor = m.idx + m.text.length
  }
  if (cursor < url.length) segs.push({ text: url.slice(cursor) })
  return (
    <span className="inline-flex items-center whitespace-nowrap">
      {segs.map((seg, i) =>
        seg.badge ? (
          <span key={i} className="relative inline-block border-b-[3px] border-[#1273c4]">
            {seg.text}
            <span className="absolute left-0 top-full z-30 mt-1"><NumberBadge n={seg.badge} size="sm" /></span>
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </span>
  )
}

export function ChromeFrame({ s, children }: { s: WebScreen; children: React.ReactNode }) {
  const tabs = s.tabs ?? [{ title: s.url.split("/")[0], active: true }]
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-[0_18px_40px_rgba(16,17,19,0.16)]">
      {/* tab strip */}
      <div className="flex h-12 shrink-0 items-end gap-1 bg-[#d3e3fd] pr-2 pl-2">
        <span className="mb-2 flex size-8 items-center justify-center rounded-lg bg-white/60"><ChevronDownIcon className="size-4 text-neutral-700" /></span>
        {tabs.map((t, i) => (
          <div
            key={i}
            className={cn(
              "flex h-10 w-[300px] min-w-0 items-center gap-3 rounded-t-xl px-4 font-body text-[17px] text-[#1f1f1f]",
              t.active ? "bg-white" : "",
            )}
          >
            <TabIcon icon={t.icon} />
            <span className="min-w-0 flex-1 truncate">{t.title}</span>
            <XIcon className="size-4 shrink-0 text-neutral-600" />
          </div>
        ))}
        <PlusIcon className="mb-3 ml-2 size-5 text-neutral-700" />
        <span className="mb-3 ml-auto flex items-center gap-8 pr-3 text-neutral-700">
          <MinusIcon className="size-5" />
          <SquareIcon className="size-4" />
          <XIcon className="size-5" />
        </span>
      </div>
      {/* toolbar — relative + z-20 so its content (including urlMarks badges, which hang below it) always
          paints above the page area, and overflow-visible throughout so those badges are never clipped */}
      <div className="relative z-20 flex h-14 shrink-0 items-center gap-5 overflow-visible border-b border-neutral-200 bg-white px-4 text-neutral-700">
        <ArrowLeftIcon className="size-6" />
        <ArrowRightIcon className="size-6 text-neutral-400" />
        <RotateCwIcon className="size-5" />
        <div className="relative z-20 flex h-10 min-w-0 flex-1 items-center gap-3 overflow-visible rounded-full bg-[#e9eef6] px-4 font-body text-[19px] text-[#1f1f1f]">
          <SlidersHorizontalIcon className="size-4 shrink-0 text-neutral-600" />
          <span className={cn("min-w-0 flex-1", s.urlMarks?.length ? "overflow-visible" : "truncate")}>
            {s.urlMarks?.length ? <UrlWithMarks url={s.url} marks={s.urlMarks} /> : s.url}
          </span>
          <StarIcon className="size-5 shrink-0 text-neutral-600" />
          {s.urlBadge ? <span className="absolute -top-3 left-[40%] z-10"><NumberBadge n={s.urlBadge} size="sm" /></span> : null}
        </div>
        <UserCircleIcon className="size-7 text-neutral-600" />
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {s.zoom && s.zoom !== 1 ? (
          <div
            className="h-full w-full"
            style={{ zoom: s.zoom, width: `${100 / s.zoom}%`, height: `${100 / s.zoom}%` }}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
