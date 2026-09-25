// The Claude desktop app (Claude for Windows) and claude.ai/code in the browser, drawn from real captures
// (E:/wi-data/projects/ai-agent-class/s8-captures). ClaudeAppWindow draws the whole desktop window (OS title
// bar + body); ClaudeAppBody draws just the body for use inside a Chrome tab (schema.ts WebPage "claude").
import { ArrowLeftIcon, ArrowRightIcon, MailIcon, MinusIcon, PanelLeftIcon, SquareIcon, XIcon } from "lucide-react"
import type { ClaudeAppView } from "@/content/schema-claude"
import { NumberBadge } from "@/components/slide/NumberBadge"
import { cn } from "@/lib/utils"
import { Asterisk } from "./claude/util"
import { ClaudeSidebarView } from "./claude/Sidebar"
import { ChatCodeToggle, SessionActions, SessionHeaderBar } from "./claude/TopRow"
import { Greeting, StatsCard } from "./claude/Home"
import { Composer } from "./claude/Composer"
import { Message } from "./claude/Session"
import { MenuView, DialogView, GithubPopoverView } from "./claude/Overlays"
import { CustomizeView } from "./claude/Customize"

function WindowButtons() {
  return (
    <span className="flex shrink-0 items-center gap-5 text-[#3a3a38]">
      <MinusIcon className="size-4" />
      <SquareIcon className="size-3.5" />
      <XIcon className="size-4" />
    </span>
  )
}

// ---- splash / login (no sidebar, no composer) ------------------------------------------------------

function Splash({ v }: { v: ClaudeAppView }) {
  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-6 bg-[#faf9f5]">
      <Asterisk size={72} />
      <div className="text-center">
        <div className="font-display text-[36px] text-[#1a1a19]">
          Claude <span className="italic">for</span> Windows
        </div>
        <div className="mt-2 font-body text-[20px] text-neutral-400">Claude와 대화하는 가장 빠른 방법</div>
      </div>
      {v.startBadge !== undefined ? (
        <span className="relative mt-10 w-[320px] rounded-xl bg-[#1a1a19] py-3.5 text-center font-body text-[19px] font-medium text-white">
          시작하기
          {v.startBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={v.startBadge} size="sm" /></span> : null}
        </span>
      ) : null}
      {v.cookieBanner ? (
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-[#2a2a28] p-6 text-white">
          <div className="font-body text-[19px] font-semibold">쿠키 설정</div>
          <div className="font-body text-[17px] leading-relaxed text-white/80">
            당사는 서비스 제공 및 개선, 사이트 사용 분석을 위해 쿠키를 사용하며, 동의하시는 경우 맞춤형 서비스 제공 및 마케팅에도
            활용합니다. 쿠키 정책은 <span className="underline">여기</span>에서 확인하실 수 있습니다.
          </div>
          <div className="flex gap-3">
            <span className="relative flex-1 rounded-lg border border-white/30 py-2.5 text-center font-body text-[17px]">
              사용자 지정
              {v.cookieBanner.customizeBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={v.cookieBanner.customizeBadge} size="sm" /></span> : null}
            </span>
            <span className="relative flex-1 rounded-lg border border-white/30 py-2.5 text-center font-body text-[17px]">
              거부
              {v.cookieBanner.rejectBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={v.cookieBanner.rejectBadge} size="sm" /></span> : null}
            </span>
            <span className="relative flex-1 rounded-lg bg-white py-2.5 text-center font-body text-[17px] font-medium text-[#1a1a19]">
              동의
              {v.cookieBanner.agreeBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={v.cookieBanner.agreeBadge} size="sm" /></span> : null}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Login({ v }: { v: ClaudeAppView }) {
  const l = v.login
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col items-center gap-10 bg-[#faf9f5] pt-24">
      <div className="font-display text-[34px] text-[#1a1a19]">로그인</div>
      <div className="flex w-[420px] flex-col gap-3 rounded-2xl border border-neutral-200 p-4">
        <span className="relative flex items-center justify-center gap-2 rounded-xl border border-neutral-200 py-3 font-body text-[18px] text-[#1a1a19]">
          <span className="flex size-5 items-center justify-center rounded-full bg-[#4285f4] font-display text-[13px] font-bold text-white">G</span>
          Google로 계속하기
          {l?.googleBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={l.googleBadge} size="sm" /></span> : null}
        </span>
        <div className="text-center font-body text-[16px] text-neutral-400">또는</div>
        <span className="relative flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 font-body text-[18px] text-neutral-400">
          <MailIcon className="size-4" />
          이메일을 입력하세요
          {l?.emailBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={l.emailBadge} size="sm" /></span> : null}
        </span>
        <span className="relative rounded-xl bg-[#1a1a19] py-3 text-center font-body text-[18px] font-medium text-white">
          이메일로 계속하기
          {l?.continueBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={l.continueBadge} size="sm" /></span> : null}
        </span>
      </div>
    </div>
  )
}

// ---- home / session content (right of the sidebar) -------------------------------------------------

function MainContent({ v }: { v: ClaudeAppView }) {
  // The mascot only shows up on home screens in the captures (desk_07..16, web_code_desktop) — never on a
  // session screen (desk_17..19, cs_08..10). `v.mascot` set explicitly (true or false) always wins.
  const mascot = v.mascot ?? v.screen === "home"
  if (v.screen === "customize" && v.customize) return <CustomizeView c={v.customize} />
  if (v.screen === "session" && v.session) {
    // Anchor the transcript to the bottom (newest message visible, clipped at the top) like the real app
    // scrolled to the end, unless the slide asks to keep the top of the conversation visible instead. A
    // `flex-col-reverse` column with the messages reversed lays the newest message at the bottom and lets any
    // overflow clip off the top, with no scroll-position measurement needed for a static render.
    const anchorTop = v.session.anchorTop
    const messages = anchorTop ? v.session.messages : [...v.session.messages].reverse()
    return (
      <div className="flex h-full min-h-0 flex-1 flex-col px-10 py-6">
        <div className={cn("flex min-h-0 flex-1 gap-1 overflow-hidden", anchorTop ? "flex-col" : "flex-col-reverse")}>
          {messages.map((m, i) => <Message key={i} m={m} />)}
        </div>
        <Composer env={undefined} prBar={v.session.prBar} input={v.input} bottomBar={v.bottomBar} mascot={mascot} menu={v.menu} />
      </div>
    )
  }
  if (v.screen === "home" && v.home)
    return (
      <div className="flex h-full min-h-0 flex-1 flex-col px-10 py-6">
        <div className="min-h-0 flex-1 overflow-y-auto pt-2">
          <Greeting h={v.home} />
          {v.home.stats ? <StatsCard s={v.home.stats} /> : null}
        </div>
        <Composer env={v.env} input={v.input} bottomBar={v.bottomBar} mascot={mascot} menu={v.menu} />
      </div>
    )
  return <div className="flex-1" />
}

// The top row inside the content column: the collapsed sidebar toggle (always) plus, when there is one, the
// session header / chat-code toggle and the session's right-side actions.
function ContentTopRow({ v, showToggleIcon }: { v: ClaudeAppView; showToggleIcon: boolean }) {
  const showMiddleRight = v.screen === "home" || v.screen === "session"
  return (
    <div className="flex h-14 shrink-0 items-center gap-4 px-4">
      {showToggleIcon ? (
        <span className="relative shrink-0 text-neutral-500">
          <PanelLeftIcon className="size-5" />
          {v.titleBar?.sidebarBadge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={v.titleBar.sidebarBadge} size="sm" /></span> : null}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        {/* home: claude.ai/code in the browser shows no chat/code toggle row at all — only the sidebar-toggle
            icon on the page background (web_code_desktop.png). The desktop window's own title bar draws the
            toggle separately (ClaudeAppWindow). */}
        {v.screen === "session" && v.session ? <SessionHeaderBar h={v.session.header} /> : null}
      </div>
      {showMiddleRight && v.screen === "session" && v.session?.header.actions ? <SessionActions actions={v.session.header.actions} /> : null}
    </div>
  )
}

// ---- exported entry points --------------------------------------------------------------------------

/** claude.ai/code inside a Chrome tab: no OS chrome, sidebar collapsed to its toggle icon unless `sidebar`
 *  is supplied (web_code_desktop.png / cs_*.png / connectors.png all show it collapsed). */
export function ClaudeAppBody({ v }: { v: ClaudeAppView }) {
  if (v.screen === "splash") return <Splash v={v} />
  if (v.screen === "login") return <Login v={v} />
  // mode / folder / slash / slash-filtered anchor to their own trigger element inside Composer/EnvRow now;
  // only model / plus still use the older content-column-relative overlay here.
  const topMenu = v.menu && (v.menu.kind === "model" || v.menu.kind === "plus") ? v.menu : undefined
  const trusting = v.dialog?.kind === "trust"
  return (
    <div className="flex h-full min-h-0 w-full bg-[#faf9f5] font-body">
      <div className={cn("flex min-h-0 flex-1", trusting && "blur-[4px]")}>
        {v.sidebar ? <ClaudeSidebarView s={v.sidebar} /> : null}
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          <ContentTopRow v={v} showToggleIcon />
          <MainContent v={v} />
          {topMenu ? <MenuView m={topMenu} /> : null}
          {v.githubPopover ? <GithubPopoverView p={v.githubPopover} /> : null}
        </div>
      </div>
      {v.dialog ? <DialogView d={v.dialog} /> : null}
    </div>
  )
}

/** The full Claude for Windows desktop window: OS title bar (≡ / sidebar toggle / back / forward / the
 *  chat-code toggle or session header / "새로운 기능" / window buttons) wrapping the same body. */
export function ClaudeAppWindow({ v }: { v: ClaudeAppView }) {
  const chrome = v.screen !== "splash" && v.screen !== "login"
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-[#faf9f5] font-body shadow-[0_18px_40px_rgba(16,17,19,0.16)]">
      <div className="flex h-14 shrink-0 items-center gap-4 px-4">
        <span className="relative shrink-0 text-[#3a3a38]">
          <span className="flex flex-col gap-[3px]">
            <span className="h-[2px] w-5 bg-current" /><span className="h-[2px] w-5 bg-current" /><span className="h-[2px] w-5 bg-current" />
          </span>
        </span>
        {chrome ? (
          <>
            <span className="relative shrink-0 text-neutral-500">
              <PanelLeftIcon className="size-5" />
              {v.titleBar?.sidebarBadge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={v.titleBar.sidebarBadge} size="sm" /></span> : null}
            </span>
            <span className="relative shrink-0 text-neutral-500">
              <ArrowLeftIcon className="size-5" />
              {v.titleBar?.backBadge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={v.titleBar.backBadge} size="sm" /></span> : null}
            </span>
            <span className="relative shrink-0 text-neutral-300">
              <ArrowRightIcon className="size-5" />
              {v.titleBar?.forwardBadge ? <span className="absolute -top-3 -right-3 z-10"><NumberBadge n={v.titleBar.forwardBadge} size="sm" /></span> : null}
            </span>
            <div className="min-w-0 flex-1">
              {v.screen === "session" && v.session ? <SessionHeaderBar h={v.session.header} /> : v.screen === "home" ? <ChatCodeToggle active={v.titleBar?.toggle} badge={v.titleBar?.toggleBadge} /> : null}
            </div>
            {v.screen === "session" && v.session?.header.actions ? <SessionActions actions={v.session.header.actions} /> : null}
          </>
        ) : (
          <div className="min-w-0 flex-1" />
        )}
        {chrome && v.screen === "home" ? (
          <span className="relative shrink-0 font-body text-[17px] text-[#3a6cc9]">
            새로운 기능
            {v.titleBar?.newFeatureBadge ? <span className="absolute -top-4 -right-4 z-10"><NumberBadge n={v.titleBar.newFeatureBadge} size="sm" /></span> : null}
          </span>
        ) : null}
        <WindowButtons />
      </div>

      <div className="relative min-h-0 flex-1">
        {v.screen === "splash" ? (
          <Splash v={v} />
        ) : v.screen === "login" ? (
          <Login v={v} />
        ) : (
          <div className={cn("flex h-full min-h-0", v.dialog?.kind === "trust" && "blur-[4px]")}>
            {v.sidebar ? <ClaudeSidebarView s={v.sidebar} /> : null}
            <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
              <MainContent v={v} />
              {v.menu && (v.menu.kind === "model" || v.menu.kind === "plus") ? <MenuView m={v.menu} /> : null}
              {v.githubPopover ? <GithubPopoverView p={v.githubPopover} /> : null}
            </div>
          </div>
        )}
        {v.dialog ? <DialogView d={v.dialog} /> : null}
      </div>
    </div>
  )
}
