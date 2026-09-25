// github.com dashboard, logged in — gh_04.png: header, left "Top repositories", Home + Copilot ask box + Feed,
// right "Latest from our changelog".
import { BellIcon, BugIcon, BotIcon, FileCodeIcon, GitBranchIcon, GitPullRequestIcon, ListIcon, PlusIcon, SearchIcon, StarIcon, LayoutGridIcon } from "lucide-react"
import type { GithubDashboardPage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset } from "@/lib/utils"

const CHIPS = [
  { label: "Debug", icon: BugIcon },
  { label: "Agent", icon: BotIcon },
  { label: "Create issue", icon: ListIcon },
  { label: "Write code", icon: FileCodeIcon },
  { label: "Git", icon: GitBranchIcon },
  { label: "Pull requests", icon: GitPullRequestIcon },
]

export function GithubDashboard({ p }: { p: GithubDashboardPage }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white font-body text-[#1f2328]">
      {/* header */}
      <div className="flex h-16 shrink-0 items-center gap-5 border-b border-neutral-200 px-6">
        <ListIcon className="size-6 text-neutral-600" />
        <img src={asset("/logos/github.svg")} alt="" className="size-8" />
        <span className="font-display text-[19px] font-semibold">Dashboard</span>
        <div className="ml-6 flex h-9 w-[300px] items-center gap-2 rounded-md border border-neutral-300 px-3 text-[16px] text-neutral-400">
          <SearchIcon className="size-4" /> Type <kbd className="rounded border border-neutral-300 px-1 text-[13px]">/</kbd> to search
        </div>
        <span className="ml-auto flex items-center gap-5 text-neutral-600">
          <LayoutGridIcon className="size-5" />
          <PlusIcon className="size-5" />
          <BellIcon className="size-5" />
          <GitPullRequestIcon className="size-5" />
          <span className="flex size-8 items-center justify-center rounded-full bg-purple-600 font-display text-[14px] font-bold text-white">S</span>
        </span>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* left sidebar */}
        <div className="flex w-[340px] shrink-0 flex-col gap-3 border-r border-neutral-200 px-5 py-5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-display text-[17px] font-semibold">Top repositories</span>
            <span className="relative flex h-7 shrink-0 items-center gap-1 rounded-md bg-[#1f883d] px-2.5 font-display text-[13px] font-semibold text-white">
              <PlusIcon className="size-3.5" /> New
              {/* offset well clear of the button — its badge is bigger than the button itself, so a small
                  -3/-3 offset used elsewhere would still cover the "w" in "New" */}
              {p.newBadge ? <span className="absolute -right-7 -top-4"><NumberBadge n={p.newBadge} size="sm" /></span> : null}
            </span>
          </div>
          <div className="flex h-9 items-center rounded-md border border-neutral-300 px-3 text-[15px] text-neutral-400">Find a repository...</div>
          {p.repos.map((r, i) => (
            <div key={i} className="relative flex items-center gap-2 text-[16px] text-[#0969da]">
              <span className="flex size-6 items-center justify-center rounded-full bg-neutral-200 text-[11px]">◱</span>
              {r.name}
              {r.badge ? <span className="absolute -right-3 -top-3"><NumberBadge n={r.badge} size="sm" /></span> : null}
            </div>
          ))}
        </div>

        {/* middle */}
        <div className="flex min-w-0 flex-1 flex-col gap-5 overflow-hidden px-8 py-6">
          <h1 className="font-display text-[26px] font-semibold">Home</h1>
          <div className="relative flex flex-col gap-4 rounded-xl border border-neutral-200 px-5 py-4">
            <div className="text-[17px] text-neutral-400">Ask anything or type @ to add context</div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex h-9 items-center gap-1 rounded-md border border-neutral-300 px-3 text-[15px] font-medium">Ask ⌄</span>
              <span className="flex h-9 items-center gap-1 rounded-md border border-neutral-300 px-3 text-[15px]">All repositories ⌄</span>
              <span className="flex size-9 items-center justify-center rounded-md border border-neutral-300 text-neutral-500">+</span>
              {CHIPS.map((c) => (
                <span key={c.label} className="flex h-9 items-center gap-1.5 rounded-md border border-neutral-300 px-3 text-[15px]">
                  <c.icon className="size-4" /> {c.label}
                </span>
              ))}
            </div>
            {p.askBoxBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.askBoxBadge} size="sm" /></span> : null}
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-neutral-200 px-5 py-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#da7756]">
              <img src={asset("/logos/claude.svg")} alt="" className="size-5 brightness-0 invert" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 font-display text-[16px] font-semibold">
                The GitHub Copilot app <span className="rounded-full border border-[#1f883d] px-2 text-[12px] text-[#1f883d]">New</span>
              </div>
              <div className="text-[14px] text-neutral-500">An agent-driven desktop experience built natively on GitHub.</div>
            </div>
            <span className="shrink-0 rounded-md border border-neutral-300 px-3 py-1.5 text-[14px] font-medium">Download for Windows ⌄</span>
          </div>

          <div className="font-display text-[19px] font-semibold">Feed</div>
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
            <div className="text-[15px] text-neutral-500">Trending repositories</div>
            {p.trending.map((r, i) => (
              <div key={i} className="relative flex flex-col gap-1.5 rounded-xl border border-neutral-200 px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[17px] font-semibold text-[#0969da]">{r.owner}/{r.name}</span>
                  <span className="flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-1 text-[14px]"><StarIcon className="size-3.5" /> Star</span>
                </div>
                <div className="text-[15px] text-neutral-600">{r.desc}</div>
                <div className="flex items-center gap-4 text-[14px] text-neutral-500">
                  <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: r.langColor }} />{r.lang}</span>
                  <span className="flex items-center gap-1"><StarIcon className="size-3.5" />{r.stars}</span>
                </div>
                {r.badge ? <span className="absolute -right-4 -top-4"><NumberBadge n={r.badge} size="sm" /></span> : null}
              </div>
            ))}
          </div>
        </div>

        {/* right column */}
        <div className="w-[300px] shrink-0 border-l border-neutral-200 px-6 py-6">
          <div className="mb-3 font-display text-[17px] font-semibold">Latest from our changelog</div>
          <div className="flex flex-col gap-4">
            {p.changelog.map((c, i) => (
              <div key={i} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-neutral-400" />
                <div>
                  <div className="text-[13px] text-neutral-500">{c.time}</div>
                  <div className="text-[15px] leading-snug text-[#0969da]">{c.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
