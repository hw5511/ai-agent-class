// github.com/login/device, logged in: GitHub mark, "Device Activation", 8-digit code split 4-4, green Continue.
import type { GithubDeviceCodePage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset } from "@/lib/utils"

export function GithubDeviceCode({ p }: { p: GithubDeviceCodePage }) {
  const digits = p.code.replace("-", "").split("")

  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center overflow-hidden bg-white px-10 pt-16 font-body text-[#1f2328]">
      <img src={asset("/logos/github.svg")} alt="" className="mb-6 size-10" />
      <h1 className="mb-2 font-display text-[28px] font-normal">Device Activation</h1>
      <p className="mb-9 text-[17px] text-neutral-600">Enter the code displayed on your device</p>

      <div className="relative mb-10 flex items-center gap-2">
        <div className="flex gap-1.5">
          {digits.slice(0, 4).map((d, i) => (
            <div key={i} className="flex size-14 items-center justify-center rounded-md border-2 border-neutral-300 font-display text-[26px] font-semibold">
              {d}
            </div>
          ))}
        </div>
        <span className="text-[22px] text-neutral-400">-</span>
        <div className="flex gap-1.5">
          {digits.slice(4, 8).map((d, i) => (
            <div key={i} className="flex size-14 items-center justify-center rounded-md border-2 border-neutral-300 font-display text-[26px] font-semibold">
              {d}
            </div>
          ))}
        </div>
        {p.codeBadge ? <span className="absolute -right-8 -top-6"><NumberBadge n={p.codeBadge} size="sm" /></span> : null}
      </div>

      <div className="relative">
        <button className="flex h-12 w-[240px] items-center justify-center rounded-md bg-[#1f883d] font-display text-[18px] font-semibold text-white">
          Continue
        </button>
        {p.continueBadge ? <span className="absolute -right-8 -top-6"><NumberBadge n={p.continueBadge} size="sm" /></span> : null}
      </div>

      <div className="mt-auto flex w-full items-center justify-center gap-8 border-t border-neutral-100 py-4 text-[15px] text-neutral-500">
        <span>Terms</span>
        <span>Privacy</span>
        <span>Security</span>
        <span>Docs</span>
        <span>Contact GitHub Support</span>
        <span>Manage cookies</span>
      </div>
    </div>
  )
}
