// github.com/trending — gh_trending.png: black nav + sub nav, hero, filters, repo rows.
import { ChevronDownIcon, GitForkIcon, StarIcon } from "lucide-react"
import type { GithubTrendingPage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset } from "@/lib/utils"

const SUBNAV = ["Explore", "Topics", "Trending", "Collections", "Events", "GitHub Sponsors"]

export function GithubTrending({ p }: { p: GithubTrendingPage }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white font-body text-[#1f2328]">
      <div className="flex h-14 shrink-0 items-center gap-6 bg-black px-6 text-white">
        <img src={asset("/logos/github.svg")} alt="" className="size-7 invert" />
        <span className="ml-auto flex h-8 w-[220px] items-center rounded-md bg-white/10 px-3 text-[14px] text-neutral-300">Search</span>
        <span className="font-display text-[15px] font-medium">Sign in</span>
        <span className="rounded-md bg-white px-3 py-1.5 font-display text-[14px] font-semibold text-black">Sign up</span>
      </div>
      <div className="flex h-11 shrink-0 items-center gap-6 border-b border-neutral-200 px-6 text-[15px] text-neutral-600">
        {SUBNAV.map((n) => (
          <span key={n} className={n === "Trending" ? "border-b-2 border-[#fd8c73] py-3 font-semibold text-[#1f2328]" : ""}>{n}</span>
        ))}
      </div>

      <div className="flex shrink-0 flex-col items-center gap-1 bg-[#f6f8fa] px-6 py-6">
        <h1 className="font-display text-[30px] font-bold">Trending</h1>
        <div className="text-[16px] text-neutral-600">See what the GitHub community is most excited about today.</div>
      </div>

      {/* no overflow-hidden here (only the repo list below needs it, to clip scrolled rows) — this outer box's
          own edge sat flush against the filter row's top, clipping the "Date range" badge's outward offset */}
      <div className="mx-6 mt-5 flex min-h-0 flex-1 flex-col rounded-t-md border border-neutral-200">
        <div className="relative flex shrink-0 items-center justify-between rounded-t-md border-b border-neutral-200 bg-white px-5 py-3">
          <div className="flex gap-2">
            <span className="rounded-full bg-[#0969da] px-4 py-1.5 text-[14px] font-semibold text-white">Repositories</span>
            <span className="rounded-full border border-neutral-300 px-4 py-1.5 text-[14px]">Developers</span>
          </div>
          <div className="flex gap-4 text-[14px] text-neutral-600">
            <span className="flex items-center gap-1">Spoken Language: <b>Any</b> <ChevronDownIcon className="size-3.5" /></span>
            <span className="flex items-center gap-1">Language: <b>Any</b> <ChevronDownIcon className="size-3.5" /></span>
            <span className="flex items-center gap-1">Date range: <b>Today</b> <ChevronDownIcon className="size-3.5" /></span>
          </div>
          {p.filterBadge ? <span className="absolute -right-3 -top-3"><NumberBadge n={p.filterBadge} size="sm" /></span> : null}
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {p.repos.map((r, i) => (
            <div key={i} className="relative flex flex-col gap-2 border-b border-neutral-100 px-5 py-4 last:border-0">
              <div className="flex items-center gap-2 font-display text-[19px] text-[#0969da]">
                {r.owner} / <b>{r.name}</b>
              </div>
              <div className="text-[15px] text-neutral-700">{r.desc}</div>
              <div className="flex items-center gap-4 text-[14px] text-neutral-500">
                {r.lang ? (
                  <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: r.langColor }} />{r.lang}</span>
                ) : null}
                <span className="flex items-center gap-1"><StarIcon className="size-3.5" />{r.stars}</span>
                <span className="flex items-center gap-1"><GitForkIcon className="size-3.5" />{r.forks}</span>
                <span>Built by <span className="ml-1 inline-flex -space-x-1.5 align-middle">{[0, 1, 2, 3].map((k) => <span key={k} className="size-5 rounded-full border border-white bg-neutral-300" />)}</span></span>
              </div>
              <div className="absolute right-5 top-4 flex items-center gap-2 text-[14px]">
                <span className="text-neutral-500">{r.today}</span>
                {r.sponsor ? <span className="rounded-md border border-pink-300 px-3 py-1 text-pink-600">♥ Sponsor</span> : null}
                <span className="relative flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-1">
                  <StarIcon className="size-3.5" /> Star
                  {r.badge ? <span className="absolute -right-7 -top-4"><NumberBadge n={r.badge} size="sm" /></span> : null}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
