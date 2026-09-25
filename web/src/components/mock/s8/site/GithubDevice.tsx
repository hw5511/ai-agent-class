// github.com/sessions/verified-device — gh_03.png: "Device verification" email code card + trouble box.
import { MailIcon } from "lucide-react"
import type { GithubDevicePage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"

export function GithubDevice({ p }: { p: GithubDevicePage }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center overflow-hidden bg-white px-10 pt-14 font-body text-[#1f2328]">
      <h1 className="mb-8 font-display text-[34px] font-normal">Device verification</h1>

      <div className="flex w-[560px] max-w-full flex-col items-center gap-4 rounded-xl border border-neutral-200 px-10 py-8">
        <MailIcon className="size-9 text-neutral-500" strokeWidth={1.5} />
        <div className="font-display text-[26px] font-bold">Email</div>
        <p className="text-center text-[18px] leading-snug text-neutral-600">
          We just sent your authentication code via email to <span className="font-medium text-[#1f2328]">{p.maskedEmail}</span>.
          {p.expires ? <> The code will expire at {p.expires}.</> : null}
        </p>
        <div className="mt-2 w-full text-[17px] font-medium">Device Verification Code</div>
        <div className="relative w-full">
          <div className="flex h-12 w-full items-center rounded-md border-2 border-[#0969da] px-4 text-[19px] tracking-widest text-neutral-400">XXXXXX</div>
          {p.codeBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.codeBadge} size="sm" /></span> : null}
        </div>
        <div className="relative w-full">
          <button className="flex h-12 w-full items-center justify-center rounded-md bg-[#1f883d] font-display text-[18px] font-semibold text-white">Verify</button>
          {p.verifyBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.verifyBadge} size="sm" /></span> : null}
        </div>
      </div>

      <div className="mt-6 w-[560px] max-w-full rounded-xl border border-neutral-200 px-8 py-6">
        <div className="mb-2 font-display text-[19px] font-bold">Having trouble verifying via email?</div>
        <ul className="list-disc pl-5 text-[17px] leading-snug text-[#0969da]">
          <li>Re-send the authentication code</li>
          <li>Try GitHub Mobile for simplified device verification</li>
        </ul>
      </div>

      <p className="mt-6 w-[560px] max-w-full text-center text-[16px] leading-snug text-neutral-600">
        If you&apos;d like to require verification on every sign in, consider enabling <span className="text-[#0969da]">two-factor authentication</span> on your
        account.
      </p>

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
