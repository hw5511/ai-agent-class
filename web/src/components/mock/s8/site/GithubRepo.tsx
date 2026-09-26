// A GitHub repo page (Code tab) — gh_repo_markitdown.png. Black nav (logged out) or a plain avatar (logged in),
// owner/name, tabs, branch/Code row, file table, README, right About + Releases.
import { BookOpenIcon, ChevronDownIcon, EyeIcon, FileIcon, FolderIcon, GitBranchIcon, ScaleIcon, StarIcon, TagIcon } from "lucide-react"
import type { GithubRepoPage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset } from "@/lib/utils"

const NAV = ["Platform", "Solutions", "Resources", "Open Source", "Enterprise", "Pricing"]

export function GithubRepo({ p }: { p: GithubRepoPage }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white font-body text-[#1f2328]">
      {/* nav */}
      <div className="flex h-14 shrink-0 items-center gap-6 bg-black px-6 text-white">
        <img src={asset("/logos/github.svg")} alt="" className="size-7 invert" />
        {!p.loggedIn &&
          NAV.map((n) => (
            <span key={n} className="flex items-center gap-1 font-display text-[15px] font-medium">
              {n} <ChevronDownIcon className="size-3.5" />
            </span>
          ))}
        <span className="ml-auto flex h-8 w-[220px] items-center rounded-md bg-white/10 px-3 text-[14px] text-neutral-300">Search</span>
        {p.loggedIn ? (
          <span className="flex size-8 items-center justify-center rounded-full bg-purple-600 font-display text-[13px] font-bold">S</span>
        ) : (
          <>
            <span className="font-display text-[15px] font-medium">Sign in</span>
            <span className="rounded-md bg-white px-3 py-1.5 font-display text-[14px] font-semibold text-black">Sign up</span>
          </>
        )}
      </div>

      {/* header */}
      <div className="flex shrink-0 items-center gap-2 border-b border-neutral-200 px-8 pt-5 pb-3">
        <BookOpenIcon className="size-5 text-neutral-500" />
        <span className="relative flex items-center gap-2">
          <span className="font-display text-[22px] text-[#0969da]">{p.owner}</span>
          <span className="text-[22px] text-neutral-400">/</span>
          <span className="font-display text-[22px] font-bold text-[#0969da]">{p.name}</span>
          {p.nameBadge ? <span className="absolute -right-6 -top-3"><NumberBadge n={p.nameBadge} size="sm" /></span> : null}
        </span>
        <span className="ml-1 rounded-full border border-neutral-300 px-2.5 py-0.5 text-[13px] text-neutral-500">Public</span>
        <div className="ml-auto flex items-center gap-2 text-[14px]">
          <span className="flex h-8 items-center gap-1.5 rounded-md border border-neutral-300 px-3">👁 Notifications</span>
          <span className="flex h-8 items-center gap-1.5 rounded-md border border-neutral-300 px-3">Fork <b>{p.forks}</b></span>
          <span className="relative flex h-8 items-center gap-1.5 rounded-md border border-neutral-300 px-3">
            <StarIcon className="size-3.5" /> Star <b>{p.stars}</b>
            {p.starBadge ? <span className="absolute -right-7 -top-4"><NumberBadge n={p.starBadge} size="sm" /></span> : null}
          </span>
        </div>
      </div>

      {/* tabs */}
      <div className="flex shrink-0 gap-6 border-b border-neutral-200 px-8 text-[15px] text-neutral-600">
        {p.tabs.map((t, i) => (
          <span key={i} className={`relative flex items-center gap-1.5 py-3 ${t.active ? "border-b-2 border-[#fd8c73] font-semibold text-[#1f2328]" : ""}`}>
            {t.label} {t.count != null ? <span className="rounded-full bg-neutral-100 px-1.5 text-[12px]">{t.count}</span> : null}
            {t.badge ? <span className="absolute -right-3 -top-3"><NumberBadge n={t.badge} size="sm" /></span> : null}
          </span>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 gap-6 overflow-hidden px-8 py-4">
        <div className="flex min-w-0 flex-[2.6] flex-col gap-3 overflow-hidden">
          <div className="flex items-center gap-2 text-[14px]">
            <span className="flex h-8 items-center gap-1.5 rounded-md border border-neutral-300 px-3"><GitBranchIcon className="size-4" />{p.branch} ⌄</span>
            <span className="text-neutral-500">{p.branchesCount} Branches</span>
            <span className="flex items-center gap-1 text-neutral-500"><TagIcon className="size-3.5" />{p.tagsCount} Tags</span>
            <span className="ml-auto flex h-8 items-center rounded-md border border-neutral-300 px-3 text-neutral-500">Go to file</span>
            <span className="relative flex h-8 items-center gap-1 rounded-md bg-[#1f883d] px-3 font-semibold text-white">
              {"<> "}Code ⌄
              {p.codeBadge ? <span className="absolute -right-3 -top-3"><NumberBadge n={p.codeBadge} size="sm" /></span> : null}
            </span>
          </div>

          <div className="relative flex items-center gap-2 rounded-t-md border border-b-0 border-neutral-200 bg-neutral-50 px-4 py-2 text-[14px]">
            <span className="size-6 rounded-full bg-neutral-300" /> <b>{p.lastCommit.author}</b>
            <span className="truncate text-neutral-600">{p.lastCommit.message}</span>
            <span className="ml-auto shrink-0 text-neutral-500">{p.lastCommit.sha} · {p.lastCommit.when}</span>
            {p.lastCommit.badge ? <span className="absolute -right-3 -top-3"><NumberBadge n={p.lastCommit.badge} size="sm" /></span> : null}
          </div>
          <div className="flex flex-col overflow-hidden rounded-b-md border border-neutral-200 text-[14px]">
            {p.files.map((f, i) => (
              <div key={i} className="relative flex items-center gap-2 border-t border-neutral-100 px-4 py-2 first:border-t-0">
                {f.folder ? <FolderIcon className="size-4 fill-neutral-400 text-neutral-400" /> : <FileIcon className="size-4 text-neutral-400" />}
                <span className="text-[#0969da]">{f.name}</span>
                <span className="min-w-0 flex-1 truncate text-neutral-500">{f.message}</span>
                <span className="shrink-0 text-neutral-400">{f.when}</span>
                {f.badge ? <span className="absolute -right-3 -top-3"><NumberBadge n={f.badge} size="sm" /></span> : null}
              </div>
            ))}
          </div>

          {p.readme ? (
            <div className="relative flex flex-1 flex-col overflow-hidden rounded-md border border-neutral-200">
              <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 text-[14px] text-neutral-700">
                <BookOpenIcon className="size-4" /> {p.readme.file ?? "README.md"}
              </div>
              <div className="flex flex-col gap-2 px-6 py-5">
                <div className="font-display text-[22px] font-bold">{p.readme.heading}</div>
                {p.readme.lines.map((l, i) => (
                  <div key={i} className="text-[15px] leading-snug text-neutral-700">{l}</div>
                ))}
              </div>
              {p.readme.badge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.readme.badge} size="sm" /></span> : null}
            </div>
          ) : (
            <div className="relative flex flex-1 flex-col items-center justify-center gap-3 rounded-md border border-neutral-200 px-6 py-8 text-center">
              <div className="font-display text-[17px] font-semibold text-[#1f2328]">Add a README</div>
              <div className="max-w-[420px] text-[14px] leading-snug text-neutral-500">
                Help people interested in this repository understand your project by adding a README.
              </div>
              <span className="rounded-md bg-[#1f883d] px-3 py-1.5 font-display text-[14px] font-semibold text-white">Add a README</span>
              {p.readmeBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.readmeBadge} size="sm" /></span> : null}
            </div>
          )}
        </div>

        <div className="w-[300px] shrink-0 overflow-hidden">
          <div className="relative flex flex-col gap-3 border-b border-neutral-200 pb-4">
            <div className="flex items-center justify-between font-display text-[17px] font-semibold">
              About
              {p.about.badge ? <span className="absolute -right-2 -top-2"><NumberBadge n={p.about.badge} size="sm" /></span> : null}
            </div>
            <div className="text-[15px] leading-snug text-neutral-500">
              {p.about.desc ?? "No description, website, or topics provided."}
            </div>
            <div className="flex flex-wrap gap-2">
              {p.about.topics.map((t) => (
                <span key={t} className="rounded-full bg-[#ddf4ff] px-3 py-1 text-[13px] text-[#0969da]">{t}</span>
              ))}
            </div>
            <div className="flex flex-col gap-1.5 text-[14px] text-neutral-600">
              <span className="flex items-center gap-2"><BookOpenIcon className="size-4" /> Readme</span>
              {p.about.license ? (
                <span className="flex items-center gap-2"><ScaleIcon className="size-4" /> {p.about.license} license</span>
              ) : null}
              <span className="flex items-center gap-2"><StarIcon className="size-4" /> {p.about.stars} stars</span>
              <span className="flex items-center gap-2"><EyeIcon className="size-4" /> {p.about.watching} watching</span>
              <span className="flex items-center gap-2"><GitBranchIcon className="size-4" /> {p.about.forks} forks</span>
            </div>
          </div>
          {p.releases ? (
            <div className="flex flex-col gap-1.5 py-4 text-[14px]">
              <div className="font-display text-[16px] font-semibold">Releases <span className="rounded-full bg-neutral-100 px-1.5 text-[12px]">{p.releases.count}</span></div>
              <div className="flex items-center gap-2">
                <TagIcon className="size-4 text-[#1f883d]" /> <b>{p.releases.version}</b>
                {p.releases.latest ? <span className="rounded-full bg-[#ddf4ff] px-2 text-[12px] text-[#0969da]">Latest</span> : null}
              </div>
              <div className="pl-6 text-neutral-500">{p.releases.when}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
