// github.com/signup — gh_01_signup.png: black left panel (included features + mascot blob) + white sign-up form.
import { CheckIcon, ChevronUpIcon } from "lucide-react"
import type { GithubSignupPage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset } from "@/lib/utils"

const FEATURES = [
  { title: "Access to GitHub Copilot", desc: "Increase your productivity and accelerate software development." },
  { title: "Unlimited repositories", desc: "Collaborate securely on public and private projects." },
  { title: "Integrated code reviews", desc: "Boost code quality with built-in review tools." },
  { title: "Automated workflows", desc: "Save time with CI/CD integrations and GitHub Actions." },
  { title: "Community support", desc: "Connect with developers worldwide for instant feedback and insights." },
]

export function GithubSignup({ p }: { p: GithubSignupPage }) {
  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden bg-white font-body">
      {/* left: black panel */}
      <div className="relative flex w-[42%] shrink-0 flex-col gap-6 overflow-hidden bg-black px-14 py-10 text-white">
        <h1 className="font-display text-[42px] font-extrabold leading-[1.15]">Create your free account</h1>
        <p className="text-[19px] leading-snug text-neutral-300">Explore GitHub&apos;s core features for individuals and organizations.</p>
        <div className="flex items-center gap-2 font-display text-[19px] font-semibold">
          See what&apos;s included <ChevronUpIcon className="size-5" />
        </div>
        <ul className="flex flex-col gap-3.5">
          {FEATURES.map((f) => (
            <li key={f.title} className="flex gap-3">
              <CheckIcon className="mt-1 size-5 shrink-0 text-white" />
              <div>
                <div className="font-display text-[18px] font-bold leading-tight">{f.title}</div>
                <div className="text-[16px] leading-snug text-neutral-300">{f.desc}</div>
              </div>
            </li>
          ))}
        </ul>
        {/* mascot blob */}
        <div className="pointer-events-none absolute -bottom-16 left-10 size-[220px] rounded-[45%_55%_60%_40%/55%_45%_55%_45%] bg-gradient-to-br from-fuchsia-500 to-purple-600 opacity-90" />
        <div className="pointer-events-none absolute -bottom-6 left-24 size-6 rounded-full bg-white" />
        <div className="pointer-events-none absolute -bottom-2 left-36 size-3 rounded-full bg-white/70" />
      </div>

      {/* right: form */}
      <div className="relative flex min-w-0 flex-1 flex-col gap-4 overflow-hidden px-16 py-8">
        <div className="absolute right-14 top-8 text-[17px] text-neutral-500">
          <span className="font-semibold text-[#0969da]">Sign in →</span>
        </div>
        <h2 className="mb-1 font-display text-[28px] font-bold text-[#1f2328]">Sign up for GitHub</h2>

        <button className="relative flex h-12 items-center justify-center gap-3 rounded-md border border-neutral-300 font-display text-[17px] font-medium text-[#1f2328]">
          <img src={asset("/logos/google.svg")} alt="" className="size-5" /> Continue with Google
          {p.googleBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.googleBadge} size="sm" /></span> : null}
        </button>
        <button className="relative flex h-12 items-center justify-center gap-3 rounded-md border border-neutral-300 font-display text-[17px] font-medium text-[#1f2328]">
          <img src={asset("/logos/apple.svg")} alt="" className="size-5" /> Continue with Apple
          {p.appleBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.appleBadge} size="sm" /></span> : null}
        </button>

        <div className="my-1 flex items-center gap-4 text-[15px] text-neutral-400">
          <span className="h-px flex-1 bg-neutral-200" /> or <span className="h-px flex-1 bg-neutral-200" />
        </div>

        <label className="relative flex flex-col gap-1">
          <span className="font-display text-[16px] font-semibold text-[#1f2328]">Email<sup className="text-[#cf222e]">*</sup></span>
          <span className="flex h-11 items-center rounded-md border border-neutral-300 px-3 text-[16px] text-neutral-400">Email</span>
          {p.emailBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.emailBadge} size="sm" /></span> : null}
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-display text-[16px] font-semibold text-[#1f2328]">Password<sup className="text-[#cf222e]">*</sup></span>
          <span className="flex h-11 items-center rounded-md border border-neutral-300 px-3 text-[16px] text-neutral-400">Password</span>
        </label>

        <label className="relative flex flex-col gap-1">
          <span className="font-display text-[16px] font-semibold text-[#1f2328]">Username<sup className="text-[#cf222e]">*</sup></span>
          <span className="flex h-11 items-center rounded-md border border-neutral-300 px-3 text-[16px] text-neutral-400">Username</span>
          {p.usernameBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.usernameBadge} size="sm" /></span> : null}
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-display text-[16px] font-semibold text-[#1f2328]">Your Country/Region<sup className="text-[#cf222e]">*</sup></span>
          <span className="flex h-11 items-center justify-between rounded-md border border-neutral-300 px-3 text-[16px] text-[#1f2328]">
            Korea, South <span className="text-neutral-400">⌄</span>
          </span>
        </label>

        <button className="relative mt-1 flex h-12 items-center justify-center gap-2 rounded-md bg-[#1f883d] font-display text-[18px] font-semibold text-white">
          Create account →
          {p.createBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.createBadge} size="sm" /></span> : null}
        </button>
      </div>
    </div>
  )
}
