// github.com/search?q=...&type=repositories — gh-search.png reference: black nav, filter column, result rows.
import { ChevronDownIcon, StarIcon } from "lucide-react"
import type { GithubSearchPage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset } from "@/lib/utils"

const NAV = ["Platform", "Solutions", "Resources", "Open Source", "Enterprise", "Pricing"]

export function GithubSearch({ p }: { p: GithubSearchPage }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white font-body text-[#1f2328]">
      <div className="flex h-14 shrink-0 items-center gap-6 bg-black px-6 text-white">
        <img src={asset("/logos/github.svg")} alt="" className="size-7 invert" />
        {NAV.map((n) => (
          <span key={n} className="flex items-center gap-1 font-display text-[15px] font-medium">
            {n} <ChevronDownIcon className="size-3.5" />
          </span>
        ))}
        <span className="ml-auto font-display text-[15px] font-medium">Sign in</span>
        <span className="rounded-md bg-white px-3 py-1.5 font-display text-[14px] font-semibold text-black">Sign up</span>
      </div>

      <div className="flex min-h-0 flex-1 gap-6 overflow-hidden px-8 py-6">
        <div className="w-[190px] shrink-0 text-[15px]">
          <div className="mb-3 font-display text-[16px] font-semibold">Filter by</div>
          <div className="flex items-center justify-between rounded-md bg-[#ddf4ff] px-2.5 py-1.5 font-semibold text-[#0969da]">
            Repositories <span className="text-[13px] font-normal text-neutral-500">{p.resultCount}</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden">
          <div className="relative">
            <div className="flex h-11 w-full items-center rounded-md border-2 border-[#0969da] px-4 text-[16px]">{p.query}</div>
            {p.searchBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.searchBadge} size="sm" /></span> : null}
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
            {p.results.map((r, i) => (
              <div key={i} className="relative flex flex-col gap-1.5 border-b border-neutral-100 pb-4 last:border-0">
                <div className="font-display text-[18px] text-[#0969da]">
                  {r.owner}/<b>{r.name}</b>
                </div>
                <div className="text-[15px] text-neutral-700">{r.desc}</div>
                <div className="flex items-center gap-4 text-[14px] text-neutral-500">
                  {r.lang ? (
                    <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: r.langColor }} />{r.lang}</span>
                  ) : null}
                  <span className="flex items-center gap-1"><StarIcon className="size-3.5" />{r.stars}</span>
                  <span>Updated {r.updated}</span>
                </div>
                {r.badge ? <span className="absolute -right-4 -top-2"><NumberBadge n={r.badge} size="sm" /></span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
