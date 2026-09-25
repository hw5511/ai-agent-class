// The bottom composer shared by home and session: the env-chip row (or the PR bar, in a session) sits above
// the input box; the mascot floats above-right of it; the +/mic/mode/model/effort row sits below.
import { CornerDownLeftIcon, FolderIcon, FolderPlusIcon, GiftIcon, GitPullRequestIcon, LaptopIcon, MicIcon, PlusIcon, XIcon } from "lucide-react"
import type { ClaudeBottomBar, ClaudeChip, ClaudeEnv, ClaudeMenu, ClaudePrBar } from "@/content/schema-claude"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { Mascot } from "./util"
import { MenuView } from "./Overlays"

// A chip is `relative` already (for its own badge), so the folder menu (desk_12) can anchor to it directly:
// it opens upward, left-aligned with this exact chip, whatever its label width.
function Chip({ c, menu }: { c: ClaudeChip; menu?: ClaudeMenu }) {
  const Icon = c.icon === "local" ? LaptopIcon : c.icon === "cloud" ? undefined : c.icon === "plus" ? PlusIcon : FolderIcon
  return (
    <span className="relative flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-body text-[16px] text-[#3a3a38]">
      {c.icon === "cloud" ? <span className="text-[15px]">&#9729;</span> : Icon ? <Icon className="size-3.5 text-neutral-500" /> : null}
      {c.label}
      {c.badge ? <span className="absolute -top-9 right-0 z-10"><NumberBadge n={c.badge} size="sm" /></span> : null}
      {menu ? <MenuView m={menu} /> : null}
    </span>
  )
}

function EnvRow({ env, menu, bannerMascot }: { env: ClaudeEnv; menu?: ClaudeMenu; bannerMascot?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {env.chips.map((c, i) => <Chip key={i} c={c} menu={menu?.kind === "folder" && c.icon === "folder" ? menu : undefined} />)}
        {env.addFolderBadge !== undefined ? (
          <span className="relative flex size-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500">
            <FolderPlusIcon className="size-4" />
            {env.addFolderBadge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={env.addFolderBadge} size="sm" /></span> : null}
          </span>
        ) : null}
      </div>
      {env.creditBanner ? (
        <div className="relative">
          {/* the mascot sits above whichever composer row is topmost — the credit banner when it's shown,
              the input box otherwise (Composer below handles the no-banner case) */}
          {bannerMascot ? <div className="absolute -top-9 right-2 z-10"><Mascot /></div> : null}
          <div className="relative flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5">
            <GiftIcon className="size-4 shrink-0 text-neutral-500" />
            <span className="min-w-0 flex-1 font-body text-[16px] text-[#3a3a38]">{env.creditBanner.text}</span>
            {env.creditBanner.buttonText ? (
              <span className="relative shrink-0 rounded-lg bg-[#1a1a19] px-3 py-1.5 font-body text-[15px] font-medium text-white">
                {env.creditBanner.buttonText}
                {env.creditBanner.buttonBadge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={env.creditBanner.buttonBadge} size="sm" /></span> : null}
              </span>
            ) : null}
            <span className="relative shrink-0 text-neutral-400">
              <XIcon className="size-4" />
              {env.creditBanner.closeBadge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={env.creditBanner.closeBadge} size="sm" /></span> : null}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function PrBarView({ pr }: { pr: ClaudePrBar }) {
  return (
    <div className="relative flex items-center gap-3 rounded-xl bg-[#efe9fb] px-4 py-3 font-body text-[17px] text-[#4a3a7a]">
      <GitPullRequestIcon className="size-5 shrink-0" />
      <span className="font-semibold">{pr.number}</span>
      <span>{pr.repo}</span>
      <span className="min-w-0 flex-1 truncate text-[#6a5a9a]">{pr.branch}</span>
      <span className="shrink-0 font-medium">{pr.status}</span>
      <span className="relative shrink-0">
        <XIcon className="size-4" />
        {pr.closeBadge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={pr.closeBadge} size="sm" /></span> : null}
      </span>
      {pr.badge ? <span className="absolute -top-4 -left-2 z-10"><NumberBadge n={pr.badge} size="sm" /></span> : null}
    </div>
  )
}

export function Composer({
  env,
  prBar,
  input,
  bottomBar,
  mascot,
  menu,
}: {
  env?: ClaudeEnv
  prBar?: ClaudePrBar
  input?: { text?: string; placeholder?: string; badge?: number }
  bottomBar?: ClaudeBottomBar
  mascot?: boolean
  menu?: ClaudeMenu // an open mode / folder / slash / slash-filtered menu, anchored to its real trigger below
}) {
  // The mascot anchors to whichever composer row renders on top: the credit banner when the env row shows
  // one, otherwise the input box below (desk_07 vs the credit-banner captures).
  const bannerMascot = mascot !== false && !!env?.creditBanner
  return (
    <div className="mt-4 shrink-0">
      {prBar ? <div className="mb-2"><PrBarView pr={prBar} /></div> : env ? <div className="mb-2"><EnvRow env={env} menu={menu} bannerMascot={bannerMascot} /></div> : null}
      <div className="relative">
        {mascot !== false && !bannerMascot ? (
          <div className="absolute -top-9 right-2 z-10"><Mascot /></div>
        ) : null}
        <div className="relative rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-[0_2px_10px_rgba(16,17,19,0.05)]">
        <div className="relative flex items-center font-body text-[20px] text-neutral-400">
          <span className={input?.text ? "min-w-0 flex-1 truncate text-[#1f1f1f]" : "min-w-0 flex-1 truncate"}>{input?.text || input?.placeholder || "작업을 설명하거나 질문하세요"}</span>
          <CornerDownLeftIcon className="size-4 shrink-0" />
          {input?.badge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={input.badge} size="sm" /></span> : null}
        </div>
        {bottomBar ? (
          <div className="mt-3 flex items-center justify-between font-body text-[16px] text-neutral-500">
            <span className="flex items-center gap-4">
              <span className="relative"><PlusIcon className="size-5" />{bottomBar.plusBadge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={bottomBar.plusBadge} size="sm" /></span> : null}</span>
              <span className="relative"><MicIcon className="size-5" />{bottomBar.micBadge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={bottomBar.micBadge} size="sm" /></span> : null}</span>
              <span className="relative rounded-md px-1.5 py-0.5">
                {bottomBar.mode}
                {bottomBar.modeBadge ? <span className="absolute -top-4 -right-3 z-10"><NumberBadge n={bottomBar.modeBadge} size="sm" /></span> : null}
                {menu?.kind === "mode" ? <MenuView m={menu} /> : null}
              </span>
            </span>
            <span className="flex items-center gap-4">
              <span className="relative">{bottomBar.model}{bottomBar.modelBadge ? <span className="absolute -top-4 -right-3 z-10"><NumberBadge n={bottomBar.modelBadge} size="sm" /></span> : null}</span>
              <span className="relative">{bottomBar.effort}{bottomBar.effortBadge ? <span className="absolute -top-4 -right-3 z-10"><NumberBadge n={bottomBar.effortBadge} size="sm" /></span> : null}</span>
              <span className={`size-4 rounded-full border-2 ${bottomBar.busy ? "border-neutral-300 border-t-neutral-500 animate-spin" : "border-neutral-300"}`} />
            </span>
          </div>
        ) : null}
        {menu?.kind === "slash" || menu?.kind === "slash-filtered" ? <MenuView m={menu} /> : null}
        </div>
      </div>
    </div>
  )
}
