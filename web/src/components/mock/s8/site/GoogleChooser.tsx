// accounts.google.com account chooser — gh_02_google.png (GitHub), g_login.png / g_again.png (Claude).
import type { GoogleChooserPage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset } from "@/lib/utils"

const APP_LABEL: Record<GoogleChooserPage["app"], string> = { github: "GitHub", claude: "Claude" }

function AppMark({ app }: { app: GoogleChooserPage["app"] }) {
  if (app === "github")
    return (
      <span className="flex size-14 items-center justify-center rounded-full bg-black">
        <img src={asset("/logos/github.svg")} alt="" className="size-8 invert" />
      </span>
    )
  return (
    <span className="flex size-14 items-center justify-center rounded-xl bg-[#da7756]">
      <img src={asset("/logos/claude.svg")} alt="" className="size-8 brightness-0 invert" />
    </span>
  )
}

export function GoogleChooser({ p }: { p: GoogleChooserPage }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center overflow-hidden bg-[#f0f4f9] px-10 py-10 font-body">
      <div className="flex w-[900px] max-w-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3 border-b border-neutral-100 px-10 py-6">
          <img src={asset("/logos/google.svg")} alt="" className="size-6" />
          <span className="text-[19px] text-[#1f1f1f]">Google 계정으로 로그인</span>
        </div>
        <div className="flex gap-10 px-10 py-8">
          <div className="flex w-[280px] shrink-0 flex-col gap-3">
            <AppMark app={p.app} />
            <div className="font-display text-[30px] font-normal text-[#1f1f1f]">계정을 선택하세요.</div>
            <div className="text-[17px] text-[#0b57d0]">{APP_LABEL[p.app]}(으)로 이동</div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            {p.accounts.map((a, i) => (
              <div key={i} className="relative flex items-center gap-4 border-b border-neutral-100 py-4 last:border-0">
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full font-display text-[16px] font-medium text-white"
                  style={{ background: a.color ?? "#1a73e8" }}
                >
                  {a.initial}
                </span>
                <div className="min-w-0">
                  <div className="truncate font-display text-[18px] font-medium text-[#1f1f1f]">{a.name}</div>
                  <div className="truncate text-[16px] text-neutral-500">{a.email}</div>
                </div>
                {a.badge ? <span className="absolute -right-4 -top-3"><NumberBadge n={a.badge} size="sm" /></span> : null}
              </div>
            ))}
            <div className="relative flex items-center gap-4 py-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-500">◌</span>
              <div className="text-[18px] text-[#1f1f1f]">다른 계정 사용</div>
              {p.otherAccountBadge ? <span className="absolute -right-4 -top-3"><NumberBadge n={p.otherAccountBadge} size="sm" /></span> : null}
            </div>
          </div>
        </div>
        <div className="px-10 pb-8 text-[15px] leading-snug text-neutral-500">
          앱을 사용하기 전에 {APP_LABEL[p.app]}의 <span className="text-[#0b57d0]">개인정보처리방침</span> 및{" "}
          <span className="text-[#0b57d0]">서비스 약관</span>을 검토하세요.
        </div>
      </div>
      <div className="mt-8 flex w-[900px] max-w-full items-center justify-between text-[15px] text-neutral-500">
        <span>한국어 ⌄</span>
        <span className="flex gap-8">
          <span>도움말</span>
          <span>개인정보처리방침</span>
          <span>약관</span>
        </span>
      </div>
    </div>
  )
}
