// s1-claude-login — basic 1회차 슬라이드 48~57 (10장). Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step01/*.svg) into this renderer. Content facts come from those SVGs'
// own text nodes and from courses/basic/step01.json (slides index 47/48..56 in that file's `slides`
// array — this part's JSON entries all use goal/topics/action, no shared components were touched).
//
// Every screen where `claude` is actually running reuses ../ClaudeCodeTerminal (never hand-drawn), the
// same badge-gutter math as ../specs/step02-sample.tsx (`layoutClaudeCodeTerminal` + `BADGE_GUTTER`).
// A few onboarding steps (theme pick, login-method pick, terminal-input pick, trust prompt) happen
// BEFORE the chat UI exists, so ClaudeCodeTerminal's turn/welcome API can't draw them — those reuse the
// same dark terminal palette (`TERM_THEME.dark`, a design token, not a hardcoded color) as plain text
// laid out inside the same VSCodeScreen terminal panel (a supported use of `terminalContent`, not a
// hand-drawn terminal window). Slides 02-10 below (all except slide 01) instead show the real
// screenshot the shipped deck embedded (public/slides/shots/, extracted from the shipped SVGs) — the
// worker who first rebuilt this part couldn't read those images and hand-drew mocks instead; the CEO
// asked for the real screenshots back (see fitShot()/ShotFrame below).
import React from "react";
import { staticFile, Img } from "remotion";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal } from "../ClaudeCodeTerminal";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS, RADIUS, TERM_THEME } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "CLAUDE CODE 세팅";
const TOTAL = 10;

const WINDOW_HEADER_H = 34; // AppWindow native title bar height (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // reserved inside the terminal so badges never cover its text.
const TERM_WINDOW_H = 620;
const LINE_H = Math.round(TERM_FONT_SIZE * 1.6); // same metric ClaudeCodeTerminal itself uses internally.
const PAD_H = 16; // matches ClaudeCodeTerminal's own left/right inset (its PAD_H, not exported).
const PAD_V = 10; // matches ClaudeCodeTerminal's own top inset (its PAD_V, not exported).

// Every shipped step01 claude_* slide uses this same student path (see claude_실행.svg:
// "PS C:\Users\student\에이전트1> claude --version").
const CWD = "C:\\Users\\student\\에이전트1"; // C:\Users\student\에이전트1

// Same helpers ../specs/step02-sample.tsx uses — an 8-col camera-zoomed VS Code screen + 4-col annotation.
function windowGeometry(illoW: number, illoH: number, windowH = TERM_WINDOW_H) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

function rightTermWidth(windowNative: { w: number }, mainMode: "empty" | "editor" = "empty"): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  return Math.round(contentW * (mainMode === "empty" ? 0.84 : 0.62));
}

const EMPTY_EXPLORER: ExplorerNode[] = [{ name: "(비어 있음)", kind: "file", depth: 0 }];

// ------------------------------------------------------------------------------------------------
// Plain terminal-style text lines drawn inside a VSCodeScreen terminal panel, for onboarding screens
// that happen before the chat UI exists (theme pick, login pick, trust prompt, security notice) — same
// palette token (TERM_THEME.dark) ClaudeCodeTerminal itself is built on, not a new hardcoded color.
// ------------------------------------------------------------------------------------------------
interface RawLine {
  text: string;
  tone?: "text" | "strong" | "dim" | "accent";
  prefix?: string; // e.g. "PS <cwd>> " or "❯ " (selected-row pointer)
  bold?: boolean;
}

const toneColor = (tone: RawLine["tone"]): string => {
  if (tone === "strong") return TERM_THEME.dark.strong;
  if (tone === "dim") return TERM_THEME.dark.dim;
  if (tone === "accent") return COLORS.accent;
  return TERM_THEME.dark.text;
};

const RawTerminalBlock: React.FC<{ width: number; lines: RawLine[]; gapBefore?: number[] }> = ({ width, lines }) => (
  <div style={{ position: "relative", width, boxSizing: "border-box", padding: `${PAD_V}px ${PAD_H}px ${PAD_V}px ${PAD_H + BADGE_GUTTER}px`, fontFamily: FONTS.term, fontSize: TERM_FONT_SIZE }}>
    {lines.map((ln, i) => (
      <div key={i} style={{ height: LINE_H, lineHeight: `${LINE_H}px`, whiteSpace: "pre", color: toneColor(ln.tone), fontWeight: ln.bold ? 700 : 400 }}>
        {ln.prefix ? <span style={{ color: TERM_THEME.dark.dim }}>{ln.prefix}</span> : null}
        {ln.text}
      </div>
    ))}
  </div>
);

// Absolute y (inside the panel) of raw line index i, given how many lines came before this block.
const rawLineCenterY = (i: number) => PAD_V + i * LINE_H + LINE_H / 2;

// ------------------------------------------------------------------------------------------------
// Real-screenshot slides (02-09 below): the shipped deck embedded an actual terminal/browser
// screenshot here (see public/slides/shots/_manifest.json) and the worker who rebuilt this part
// couldn't read the image, so they hand-drew a mock instead. The CEO reviewed the comparison and
// asked for the real screenshots back. fitShot() contains natW x natH into the standard 8-col body
// slot (colX(0)/colW(9), BODY_Y..BODY_BOTTOM), centered, preserving aspect ratio.
// ------------------------------------------------------------------------------------------------
interface ShotRect { x: number; y: number; w: number; h: number }

function fitShot(natW: number, natH: number): ShotRect {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const scale = Math.min(boxW / natW, boxH / natH);
  const w = Math.round(natW * scale);
  const h = Math.round(natH * scale);
  const x = boxX + Math.round((boxW - w) / 2);
  const y = boxY + Math.round((boxH - h) / 2);
  return { x, y, w, h };
}

// Badge anchor for a fraction-of-image-height row: sits in the middle of whatever slack fitShot()
// left on the left side (a real margin when the image is height-limited, or the image's own left
// edge — half in/half out over its own quiet background column — when it fills the box width with
// no slack). Either way the badge never lands on text, per the FocusBadge placement rule.
function shotBadgeAnchor(r: ShotRect, yFrac: number) {
  const gap = r.x - colX(0);
  return { x: r.x - gap / 2, y: r.y + Math.round(r.h * yFrac) };
}

const ShotFrame: React.FC<{ src: string; rect: ShotRect }> = ({ src, rect }) => (
  <div
    style={{
      position: "absolute",
      left: rect.x,
      top: rect.y,
      width: rect.w,
      height: rect.h,
      borderRadius: RADIUS.outer,
      border: `1px solid ${COLORS.line}`,
      boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
      overflow: "hidden",
      background: COLORS.void2,
    }}
  >
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
  </div>
);

// ------------------------------------------------------------------------------------------------
// 01 · Claude Code 실행  (shipped slide "claude_실행", JSON slides[47])
// ------------------------------------------------------------------------------------------------
const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(9);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const RAW_H = PAD_V + LINE_H * 2 + Math.round(LINE_H * 0.5); // version-check block height (matches launch-line spacing).
  const termProps = { width: termW, showLaunch: true, launchPath: CWD, showWelcome: true, cwd: CWD, placeholder: "무엇을 도와드릴까요?", fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER };
  const L = layoutClaudeCodeTerminal(termProps);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + PAD_H + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + rawLineCenterY(1) });
  const b2 = toFrame({ x: badgeX, y: contentTop + RAW_H + (L.launchY ?? 0) + L.lineH / 2 });

  const content = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <RawTerminalBlock width={termW} lines={[{ prefix: `PS ${CWD}> `, text: "claude --version" }, { text: "2.1.278 (Claude Code)", tone: "strong" }]} />
      <ClaudeCodeTerminal {...termProps} />
    </div>
  );

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="Claude Code 실행">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={EMPTY_EXPLORER} layout="right" terminalWidth={termW} showTerminal terminalContent={content} mainMode="empty" />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "버전 확인", body: "claude --version 으로 설치된 버전을 확인한다. 설치와 PATH 등록은 agy 가 이미 끝냈다." },
          { number: 2, head: "claude 실행", body: "claude 를 입력하면 대화형 CLI 가 시작된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · 터미널 테마 선택  (shipped slide "claude_터미널_모양_선택")
// ------------------------------------------------------------------------------------------------
const SHOT_THEME_SRC = staticFile("slides/shots/claude_터미널_모양_선택.png");
const SHOT_THEME_W = 755;
const SHOT_THEME_H = 653;

const Slide02: React.FC = () => {
  const illoY = BODY_Y;
  const illoH = BODY_H;
  const r = fitShot(SHOT_THEME_W, SHOT_THEME_H);
  // "Choose the text style..." heading and the checked "❯ 2. Dark mode ✓" row, read off the real shot.
  const b1 = shotBadgeAnchor(r, 0.51);
  const b2 = shotBadgeAnchor(r, 0.616);

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="Claude Code 터미널 모양 선택">
      <ShotFrame src={SHOT_THEME_SRC} rect={r} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "Dark / Light 중 선택", body: "목록에서 읽기 편한 터미널 색상 모양을 고른다." },
          { number: 2, head: "방향키 + Enter", body: "화살표로 이동한 뒤 Enter 를 누르면 확정된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · 로그인 방식 선택  (shipped slide "claude_로그인_방식_선택")
// ------------------------------------------------------------------------------------------------
const SHOT_LOGIN_METHOD_SRC = staticFile("slides/shots/claude_로그인_방식_선택.png");
const SHOT_LOGIN_METHOD_W = 763;
const SHOT_LOGIN_METHOD_H = 461;

const Slide03: React.FC = () => {
  const illoY = BODY_Y;
  const illoH = BODY_H;
  const r = fitShot(SHOT_LOGIN_METHOD_W, SHOT_LOGIN_METHOD_H);
  const b1 = shotBadgeAnchor(r, 0.673); // "Select login method:"
  const b2 = shotBadgeAnchor(r, 0.748); // "❯ 1. Claude account with subscription ..."

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="Claude Code 로그인 방식 선택">
      <ShotFrame src={SHOT_LOGIN_METHOD_SRC} rect={r} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "계정 유형 확인", body: "Claude Pro / Team / Console 중 사용하는 유형을 확인한다." },
          { number: 2, head: "해당 방식 선택", body: "해당 항목을 고르고 Enter 를 누른다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · 브라우저에서 계정 권한 확인  (shipped slide "claude_브라우저_권한_확인")
// The shipped SVG for this one slide draws a standalone browser window ("claude.ai · 계정 연결 요청"),
// not VS Code — approval genuinely happens in the OS browser. Uses AppWindow the same way
// ../specs/step02-write.tsx's BrowserResultWindow does for its Chrome-style result screens.
// ------------------------------------------------------------------------------------------------
const SHOT_BROWSER_PERM_SRC = staticFile("slides/shots/claude_브라우저_권한_확인.png");
const SHOT_BROWSER_PERM_W = 584;
const SHOT_BROWSER_PERM_H = 732;

const Slide04: React.FC = () => {
  const illoY = BODY_Y;
  const illoH = BODY_H;
  const r = fitShot(SHOT_BROWSER_PERM_W, SHOT_BROWSER_PERM_H);
  const b1 = shotBadgeAnchor(r, 0.291); // consent heading ("...연결을 요청했습니다")
  const b2 = shotBadgeAnchor(r, 0.844); // the black confirm button

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="브라우저에서 계정 권한 확인">
      <ShotFrame src={SHOT_BROWSER_PERM_SRC} rect={r} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={40} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "요청 권한 확인", body: "요청 권한을 읽고 본인이 승인할 때만 허용한다." },
          { number: 2, head: "버튼 누르면 연결 완료", body: "Authorize 버튼을 누르면 계정 연결이 완료된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · 로그인 완료  (shipped slide "claude_로그인_완료")
// ------------------------------------------------------------------------------------------------
const SHOT_LOGIN_DONE_SRC = staticFile("slides/shots/claude_로그인_완료.png");
const SHOT_LOGIN_DONE_W = 757;
const SHOT_LOGIN_DONE_H = 384;

const Slide05: React.FC = () => {
  const illoY = BODY_Y;
  const illoH = BODY_H;
  const r = fitShot(SHOT_LOGIN_DONE_W, SHOT_LOGIN_DONE_H);
  // Real shot orders the two lines "Logged in as ..." then "Login successful..." (opposite of the
  // old mock) — badges follow the real order: b1 = the success line, b2 = the account line.
  const b1 = shotBadgeAnchor(r, 0.872); // "Login successful. Press Enter to continue..."
  const b2 = shotBadgeAnchor(r, 0.807); // "Logged in as ..."

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="Claude Code 로그인 완료">
      <ShotFrame src={SHOT_LOGIN_DONE_SRC} rect={r} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "로그인 성공 메시지", body: "Login successful 메시지가 보이면 계정 연결이 끝난 것이다." },
          { number: 2, head: "계정 이메일 확인", body: "연결된 이메일만 확인하고 Enter 로 넘어간다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · 보안 안내  (shipped slide "claude_보안_안내")
// ------------------------------------------------------------------------------------------------
const SHOT_SECURITY_SRC = staticFile("slides/shots/claude_보안_안내.png");
const SHOT_SECURITY_W = 753;
const SHOT_SECURITY_H = 497;

const Slide06: React.FC = () => {
  const illoY = BODY_Y;
  const illoH = BODY_H;
  const r = fitShot(SHOT_SECURITY_W, SHOT_SECURITY_H);
  const b1 = shotBadgeAnchor(r, 0.658); // "1. Claude can make mistakes."
  const b2 = shotBadgeAnchor(r, 0.728); // "...especially when running code."
  const b3 = shotBadgeAnchor(r, 0.823); // "2. Due to prompt injection risks, only use it with code you trust."

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="Claude Code 보안 안내">
      <ShotFrame src={SHOT_SECURITY_SRC} rect={r} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <FocusBadge number={3} x={b3.x} y={b3.y} size={34} />

      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "실행 권한 안내", body: "파일 수정과 명령 실행 권한을 가진다는 사실을 먼저 읽는다." },
          { number: 2, head: "검토 후 사용", body: "AI 의 제안과 변경 내용을 검토하고 신뢰하는 프로젝트에서만 쓴다." },
          { number: 3, head: "인젝션 · 실수 주의", body: "프롬프트 인젝션이나 실수 가능성에 항상 주의한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · 터미널 입력 설정  (shipped slide "claude_터미널_입력_설정")
// ------------------------------------------------------------------------------------------------
const SHOT_TERM_INPUT_SRC = staticFile("slides/shots/claude_터미널_입력_설정.png");
const SHOT_TERM_INPUT_W = 761;
const SHOT_TERM_INPUT_H = 475;

const Slide07: React.FC = () => {
  const illoY = BODY_Y;
  const illoH = BODY_H;
  const r = fitShot(SHOT_TERM_INPUT_W, SHOT_TERM_INPUT_H);
  const b1 = shotBadgeAnchor(r, 0.632); // "❯ 1. Yes, use recommended settings"
  const b2 = shotBadgeAnchor(r, 0.735); // "Enter to confirm · Esc to skip"

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="Claude Code 터미널 입력 설정">
      <ShotFrame src={SHOT_TERM_INPUT_SRC} rect={r} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "권장 설정 확인", body: "화면에 표시된 추천 값을 그대로 사용해도 된다." },
          { number: 2, head: "필요하면 나중에 변경", body: "지금 넘어가도 나중에 다시 설정할 수 있다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · 작업 폴더 신뢰 확인  (shipped slide "claude_작업_폴더_신뢰")
// ------------------------------------------------------------------------------------------------
const SHOT_TRUST_SRC = staticFile("slides/shots/claude_작업_폴더_신뢰.png");
const SHOT_TRUST_W = 765;
const SHOT_TRUST_H = 329;

const Slide08: React.FC = () => {
  const illoY = BODY_Y;
  const illoH = BODY_H;
  const r = fitShot(SHOT_TRUST_W, SHOT_TRUST_H);
  const b1 = shotBadgeAnchor(r, 0.252); // the workspace path line
  const b2 = shotBadgeAnchor(r, 0.784); // "❯ Yes, I trust this folder"

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="Claude 실습 폴더 신뢰 확인">
      <ShotFrame src={SHOT_TRUST_SRC} rect={r} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "작업 폴더 경로 확인", body: "표시된 경로가 실습 폴더(에이전트1)가 맞는지 확인한다." },
          { number: 2, head: "신뢰 허용 선택", body: "Yes 를 선택해야 편집과 명령 실행 권한이 열린다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 09 · Claude Code 실행 화면  (shipped slide "claude_실행_화면")
// Header line text ("Claude Code v2.1.270" / "Opus 5 (1M context) with medium effort · Claude Max") is
// the real product text captured in the screenshot itself (public/slides/shots/claude_실행_화면.png).
// ------------------------------------------------------------------------------------------------
const SHOT_RUN_SRC = staticFile("slides/shots/claude_실행_화면.png");
const SHOT_RUN_W = 760;
const SHOT_RUN_H = 425;

const Slide09: React.FC = () => {
  const illoY = BODY_Y;
  const illoH = BODY_H;
  const r = fitShot(SHOT_RUN_W, SHOT_RUN_H);
  const b1 = shotBadgeAnchor(r, 0.106); // "Opus 5 (1M context) with medium effort · Claude Max"
  const b2 = shotBadgeAnchor(r, 0.146); // "~\\Downloads" (cwd)
  const b3 = shotBadgeAnchor(r, 0.544); // "> /model sonnet" input line

  return (
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="Claude Code 실행 화면">
      <ShotFrame src={SHOT_RUN_SRC} rect={r} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={30} />
      <FocusBadge number={3} x={b3.x} y={b3.y} size={34} />

      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "모델 · 버전 정보 확인", body: "켜져있는 모델과 Claude Code 버전이 상단에 표시된다." },
          { number: 2, head: "현재 작업 경로 확인", body: "cwd 라인에 현재 폴더 경로가 표시된다." },
          { number: 3, head: "대화형 입력창 위치", body: "화면 맨 아래 입력창에서 자연어로 요청한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 10 · 대화 전에 기본 세팅 두 가지  (shipped slide "claude_기본_세팅")
// Real screenshot, extracted into public/slides/shots/claude_기본_세팅.png (see
// public/slides/shots/_manifest.json) — already used a real screenshot before this pass, just fixed
// to point at the extracted shots/ copy instead of a since-removed slides/claude/ path.
// ------------------------------------------------------------------------------------------------
const SHOT_MODEL_IDE = staticFile("slides/shots/claude_기본_세팅.png");
const SHOT_W = 664;
const SHOT_H = 460;

const Slide10: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(9);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const panelH = windowNative.h - contentTop;

  // The image keeps its own aspect ratio inside the panel (contain, top-aligned) with a left gutter
  // reserved for the badges — same BADGE_GUTTER convention as every other slide in this file.
  const shotW = termW - PAD_H * 2 - BADGE_GUTTER;
  const shotH = Math.round((shotW * SHOT_H) / SHOT_W);
  const shotX = paneLeft + PAD_H + BADGE_GUTTER;
  const shotY = contentTop + PAD_V;
  // Estimated fraction-of-image-height for the two called-out lines (real screenshot: "/model sonnet"
  // sits just under the changelog note; "2. None" sits in the Select IDE list near the bottom).
  const modelLineFrac = 0.335;
  const noneLineFrac = 0.665;
  const b1 = toFrame({ x: shotX - BADGE_GUTTER / 2, y: shotY + shotH * modelLineFrac });
  const b2 = toFrame({ x: shotX - BADGE_GUTTER / 2, y: shotY + shotH * noneLineFrac });

  const content = (
    <div style={{ position: "relative", width: termW, height: panelH, boxSizing: "border-box" }}>
      <div style={{ position: "absolute", left: PAD_H + BADGE_GUTTER, top: PAD_V, width: shotW, height: shotH, borderRadius: 6, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,0.35)" }}>
        <Img src={SHOT_MODEL_IDE} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  );

  return (
    <SlideFrame index={10} total={TOTAL} eyebrow={EYEBROW} title="대화 전에 기본 세팅 두 가지">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={EMPTY_EXPLORER} layout="right" terminalWidth={termW} showTerminal terminalContent={content} mainMode="empty" />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "① 모델 정하기", body: "/model sonnet — 실습에는 Sonnet 이면 충분하다." },
          { number: 2, head: "② 연동 끄기", body: "/ide 로 Select IDE 목록을 띄우고 2. None 을 고른다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S1_CLAUDE_LOGIN: SlideEntry[] = [
  { index: 1, name: "claude_실행", title: "Claude Code 실행", render: () => React.createElement(Slide01) },
  { index: 2, name: "claude_터미널_모양_선택", title: "Claude Code 터미널 모양 선택", render: () => React.createElement(Slide02) },
  { index: 3, name: "claude_로그인_방식_선택", title: "Claude Code 로그인 방식 선택", render: () => React.createElement(Slide03) },
  { index: 4, name: "claude_브라우저_권한_확인", title: "브라우저에서 계정 권한 확인", render: () => React.createElement(Slide04) },
  { index: 5, name: "claude_로그인_완료", title: "Claude Code 로그인 완료", render: () => React.createElement(Slide05) },
  { index: 6, name: "claude_보안_안내", title: "Claude Code 보안 안내", render: () => React.createElement(Slide06) },
  { index: 7, name: "claude_터미널_입력_설정", title: "Claude Code 터미널 입력 설정", render: () => React.createElement(Slide07) },
  { index: 8, name: "claude_작업_폴더_신뢰", title: "Claude 실습 폴더 신뢰 확인", render: () => React.createElement(Slide08) },
  { index: 9, name: "claude_실행_화면", title: "Claude Code 실행 화면", render: () => React.createElement(Slide09) },
  { index: 10, name: "claude_기본_세팅", title: "대화 전에 기본 세팅 두 가지", render: () => React.createElement(Slide10) },
];

export const S1_CLAUDE_LOGIN_PART: PartSpec = { id: "s1-claude-login", eyebrow: EYEBROW, entries: S1_CLAUDE_LOGIN };
