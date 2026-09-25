// github.com/apps/<name> — gh_app_claude.png: black nav, app avatar + name, description, developer panel.
import { ChevronDownIcon, ExternalLinkIcon, FlagIcon } from "lucide-react"
import type { GithubAppPage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset } from "@/lib/utils"

const NAV = ["Platform", "Solutions", "Resources", "Open Source", "Enterprise", "Pricing"]

export function GithubApp({ p }: { p: GithubAppPage }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white font-body text-[#1f2328]">
      <div className="flex h-14 shrink-0 items-center gap-6 bg-black px-6 text-white">
        <img src={asset("/logos/github.svg")} alt="" className="size-7 invert" />
        {NAV.map((n) => (
          <span key={n} className="flex items-center gap-1 font-display text-[15px] font-medium">
            {n} <ChevronDownIcon className="size-3.5" />
          </span>
        ))}
        <span className="ml-auto flex h-8 w-[220px] items-center rounded-md bg-white/10 px-3 text-[14px] text-neutral-300">Search</span>
        <span className="font-display text-[15px] font-medium">Sign in</span>
        <span className="rounded-md bg-white px-3 py-1.5 font-display text-[14px] font-semibold text-black">Sign up</span>
      </div>

      <div className="flex shrink-0 gap-14 overflow-hidden px-14 py-10">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-full bg-[#da7756]">
              <img src={asset("/logos/claude.svg")} alt="" className="size-9 brightness-0 invert" />
            </span>
            <div>
              <div className="relative font-display text-[30px] font-semibold">
                {p.name}
                {p.nameBadge ? <span className="absolute -right-6 -top-3"><NumberBadge n={p.nameBadge} size="sm" /></span> : null}
              </div>
              <div className="text-[16px] text-neutral-500">GitHub App</div>
            </div>
          </div>
          {p.desc.map((d, i) => (
            <p key={i} className="text-[18px] leading-relaxed text-[#1f2328]">{d}</p>
          ))}
        </div>

        <div className="w-[280px] shrink-0 text-[15px]">
          <div className="mb-2 text-neutral-500">Developer</div>
          <div className="mb-1 flex items-center gap-1.5 text-[#0969da]">
            <span className="flex size-4 items-center justify-center rounded-full bg-black text-[9px] text-white">A</span> {p.developer}
          </div>
          {p.website ? (
            <div className="mb-4 flex items-center gap-1.5 text-[#0969da]">
              <ExternalLinkIcon className="size-4" /> Website
            </div>
          ) : null}
          <div className="mb-4 leading-snug text-neutral-500">
            {p.name} is provided by a third-party and is governed by separate terms of service, privacy policy, and support documentation.
          </div>
          <div className="flex items-center gap-1.5 text-[#0969da]">
            <FlagIcon className="size-4" /> Report abuse
          </div>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-5 gap-y-2 bg-white px-6 py-6 text-[13px] text-neutral-500">
        <img src={asset("/logos/github.svg")} alt="" className="size-5 opacity-70" />
        <span>© 2026 GitHub, Inc.</span>
        <span>Terms</span>
        <span>Privacy</span>
        <span>Security</span>
        <span>Status</span>
        <span>Community</span>
        <span>Docs</span>
        <span>Contact</span>
        <span>Manage cookies</span>
        <span>Do not share my personal information</span>
      </div>

      <div className="min-h-0 flex-1 bg-white" />
    </div>
  )
}
