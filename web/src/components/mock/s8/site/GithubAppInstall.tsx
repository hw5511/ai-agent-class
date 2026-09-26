// github.com/apps/<name>/installations/new — install page: repository access picker + green Install button.
import { CheckIcon } from "lucide-react"
import type { GithubAppInstallPage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset } from "@/lib/utils"

export function GithubAppInstall({ p }: { p: GithubAppInstallPage }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center overflow-hidden bg-white px-10 pt-12 font-body text-[#1f2328]">
      <img src={asset("/logos/github.svg")} alt="" className="mb-4 size-9" />
      <h1 className="mb-1 font-display text-[26px] font-normal">Install {p.appName}</h1>
      <p className="mb-6 text-[16px] text-neutral-600">for these repositories:</p>

      <div className="w-[540px] max-w-full rounded-xl border border-neutral-200 px-8 py-6">
        <label className="mb-3 flex items-center gap-3 text-[16px] text-neutral-500">
          <span className="flex size-5 items-center justify-center rounded-full border-2 border-neutral-300" />
          All repositories
        </label>
        <label className="relative mb-4 flex items-center gap-3 text-[16px] font-semibold">
          <span className="flex size-5 items-center justify-center rounded-full border-[6px] border-[#0969da]" />
          Only select repositories
          {p.selectionBadge ? <span className="absolute -right-8 -top-3"><NumberBadge n={p.selectionBadge} size="sm" /></span> : null}
        </label>

        <div className="flex flex-wrap gap-2 rounded-md border border-neutral-200 px-3 py-2.5">
          {p.repos.map((r) => (
            <span key={r} className="flex items-center gap-1.5 rounded-md bg-[#ddf4ff] px-2.5 py-1 text-[14px] text-[#0969da]">
              {r} <span className="text-neutral-400">×</span>
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2 text-[14px] text-neutral-600">
          {p.permissions.map((perm, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-neutral-400" /> {perm}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-6">
        <button className="flex h-12 w-[240px] items-center justify-center rounded-md bg-[#1f883d] font-display text-[18px] font-semibold text-white">
          Install
        </button>
        {p.installBadge ? <span className="absolute -right-8 -top-6"><NumberBadge n={p.installBadge} size="sm" /></span> : null}
      </div>
    </div>
  )
}
