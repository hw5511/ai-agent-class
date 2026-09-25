// claude.ai/login/popup-google-auth — g_after3.png: grey "Claude 앱에서 로그인 완료하기" page with the Chrome
// protocol dialog ("Claude을(를) 여시겠습니까?") over the top, sitting near the top of the page (y 110-370
// of a 1038px capture) while the dimmed page content underneath sits lower (wordmark ~y460, heading ~y555,
// two grey lines ~y595-620, black "Claude 열기" button ~y680) so all of it stays visible under the dialog.
// Cookie box left out per spec.
import type { ClaudeOpenAppPage } from "@/content/schema-site"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { asset } from "@/lib/utils"

export function ClaudeOpenApp({ p }: { p: ClaudeOpenAppPage }) {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-col items-center overflow-hidden bg-[#666660] font-body">
      <div className="mt-[43%] flex flex-col items-center">
        <div className="mb-6 flex items-center gap-2">
          <img src={asset("/logos/claude.svg")} alt="" className="size-6 brightness-0 invert" />
          <span className="font-display text-[19px] font-serif text-white">Claude</span>
        </div>
        <h1 className="mb-2 font-display text-[22px] font-semibold text-white">Claude 앱에서 로그인 완료하기</h1>
        <p className="mb-6 max-w-[480px] text-center text-[15px] leading-snug text-neutral-300">
          Claude가 자동으로 열립니다. 열리지 않으면 Claude 열기를 선택하세요. 앱이 열리면 이 창을 닫아도 됩니다.
        </p>
        <div className="relative">
          <button className="rounded-md bg-white px-6 py-3 font-display text-[17px] font-semibold text-black">Claude 열기</button>
          {p.openBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.openBadge} size="sm" /></span> : null}
        </div>
      </div>

      {/* protocol dialog */}
      <div className="absolute left-1/2 top-[10%] w-[620px] -translate-x-1/2 rounded-2xl border border-[#c8dcb8] bg-[#f3f8ee] px-9 py-7 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
        <div className="mb-3 font-display text-[22px] font-semibold text-[#1a1a1a]">Claude을(를) 여시겠습니까?</div>
        <div className="mb-4 text-[16px] text-neutral-700">https://claude.ai에서 이 애플리케이션을 열려고 합니다.</div>
        <label className="mb-6 flex items-center gap-2 text-[15px] text-neutral-700">
          <span className="size-4 rounded-sm border border-neutral-400" /> 항상 claude.ai에서 연결된 앱에 있는 이 유형의 링크를 열도록 허용
        </label>
        <div className="flex justify-end gap-3">
          <div className="relative">
            <button className="rounded-full bg-[#cfe8b8] px-6 py-2.5 font-display text-[16px] font-semibold text-[#1a3c0f]">Claude 열기</button>
            {p.dialogOpenBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.dialogOpenBadge} size="sm" /></span> : null}
          </div>
          <div className="relative">
            <button className="rounded-full bg-[#2f5a2a] px-6 py-2.5 font-display text-[16px] font-semibold text-white">취소</button>
            {p.dialogCancelBadge ? <span className="absolute -right-4 -top-4"><NumberBadge n={p.dialogCancelBadge} size="sm" /></span> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
