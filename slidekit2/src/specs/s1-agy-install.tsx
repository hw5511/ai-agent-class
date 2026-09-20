// s1-agy-install — basic 1회차 슬라이드 16~19 (4장). Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step01/*.svg, courses/basic/step01.json slides 16~19) into this renderer.
// Facts (commands, error text, checklist output, the macOS `echo ... >> ~/.zshrc` line) come verbatim
// from step01.json's `action`/`topics` fields and the shipped SVG text — nothing here is invented.
import React from "react";
import { staticFile, Img } from "remotion";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode, type TerminalPaneLine } from "../VSCodeScreen";
import { AppWindow, windowHeaderHeight, type WindowOs } from "../core/AppWindow";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS, RADIUS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

// ---- screenshot-frame math for slides 01/02 below (real screenshots, no fake window chrome — same
// convention as s1-agy-login.tsx / s1-agy-setup.tsx) -----------------------------------------------
interface ShotRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Fit natW x natH inside the box, preserving aspect ratio, centered (CSS object-fit: contain math).
function fitShotRect(boxX: number, boxY: number, boxW: number, boxH: number, natW: number, natH: number): ShotRect {
  const scale = Math.min(boxW / natW, boxH / natH);
  const w = natW * scale;
  const h = natH * scale;
  return { x: boxX + (boxW - w) / 2, y: boxY + (boxH - h) / 2, w, h };
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
      overflow: "hidden",
      boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
    }}
  >
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
  </div>
);

const EYEBROW = "ANTIGRAVITY 설치";
const TOTAL = 4;

const WINDOW_HEADER_H = 34; // AppWindow native title bar height (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_WINDOW_H = 620;

// ---- shared math for the two VSCodeScreen+terminalLines slides (01, 04) --------------------------
function windowGeometry(illoW: number, illoH: number, windowH = TERM_WINDOW_H) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}
function rightTermWidth(windowNative: { w: number }): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  return Math.round(contentW * 0.84);
}
// VSCodeScreen's own TerminalPane content metrics (fontSize 15, lineHeight 1.5, gap 4, padding "10px 16px")
// -- not exposed as a layout helper (that only exists for ClaudeCodeTerminal), so this is the local copy
// needed to pin a badge on a specific terminalLines row without covering its text.
const TERM_PAD_V = 10;
const TERM_LINE_H = 22.5;
const TERM_LINE_GAP = 4;
const TERM_STEP = TERM_LINE_H + TERM_LINE_GAP;
const termLineCenterY = (i: number): number => TERM_PAD_V + i * TERM_STEP + TERM_LINE_H / 2;

const EMPTY_EXPLORER: ExplorerNode[] = [{ name: "(비어 있음)", kind: "file", depth: 0 }];

function terminalIllo(opts: { x: number; y: number; w: number; h: number; lines: TerminalPaneLine[] }) {
  const { x, y, w, h, lines } = opts;
  const { windowNative, focus, view } = windowGeometry(w, h);
  const termW = rightTermWidth(windowNative);
  const toFrame = (p: { x: number; y: number }) => ({ x: x + view.tx + p.x * view.s, y: y + view.ty + p.y * view.s });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  // Right edge of the terminal pane -- keeps the badge off the "PS ...>" prefix / line text entirely
  // (README hard rule: a badge never covers text), matching step02-sample's explorer-edge pattern.
  const badgeX = paneLeft + termW - 26;
  const spotForLine = (i: number) => toFrame({ x: badgeX, y: contentTop + termLineCenterY(i) });
  const node = (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
      <Camera width={w} height={h} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
        <VSCodeScreen
          width={windowNative.w}
          height={windowNative.h}
          explorerNodes={EMPTY_EXPLORER}
          layout="right"
          terminalWidth={termW}
          showTerminal
          terminalLines={lines}
          mainMode="empty"
        />
      </Camera>
    </div>
  );
  return { node, spotForLine };
}

// ------------------------------------------------------------------------------------------------
// 01 · "Antigravity CLI 설치" (shipped agy_설치 — step01.json slide 16)
// The shipped slide embeds a REAL SCREENSHOT of the actual install run. An earlier pass here could
// not read that embedded image and hand-drew a terminal mockup instead (fake TerminalPaneLine[] via
// VSCodeScreen). The CEO reviewed the rebuilt deck against the shipped one and called that out — a
// redrawn approximation is worse than the real thing — so the mockup is gone: this now shows the
// actual extracted screenshot (public/slides/shots/agy_설치.png, 998x485 per _manifest.json), framed
// with the deck's own border/shadow (no fake window chrome — the screenshot already shows the real
// PowerShell window's own content). The frame is width-bound (998x485 is wider than the 8-col box),
// so it letterboxes top/bottom — real blank slide margin, not screenshot pixels — and both badges
// sit there: the typed install command is the first line at the very top of the screenshot, and the
// "binary placed / not in PATH" note is the last block at the very bottom.
// ------------------------------------------------------------------------------------------------

const SHOT_INSTALL = staticFile("slides/shots/agy_설치.png");
const SHOT_INSTALL_W = 998;
const SHOT_INSTALL_H = 485;

const Slide01: React.FC = () => {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const rect = fitShotRect(boxX, boxY, boxW, boxH, SHOT_INSTALL_W, SHOT_INSTALL_H);
  const b1 = { x: rect.x + rect.w * 0.12, y: rect.y - 24 }; // top margin, level with the typed install command
  const b2 = { x: rect.x + rect.w * 0.14, y: rect.y + rect.h + 24 }; // bottom margin, level with the "not in PATH" note

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="Antigravity CLI 설치">
      <ShotFrame src={SHOT_INSTALL} rect={rect} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={boxY}
        width={colW(3)}
        height={boxH}
        items={[
          { number: 1, head: "설치 스크립트 한 줄 실행", body: "Windows 는 irm ... | iex, macOS 는 curl ... | bash 한 줄로 설치한다." },
          { number: 2, head: "PATH 미반영", body: "설치가 끝나도 지금 열어 둔 터미널이 새 경로를 바로 못 찾을 수 있다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · "agy 명령어 인식 오류" (shipped agy_PATH_오류, 원래 제목 "agy 명령을 찾을 수 없을 때" —
// AI 말투 완화 위해 키워드 명사구로 다시 씀. step01.json slide 17.)
// Same swap as slide 01 — real screenshot (public/slides/shots/agy_PATH_오류.png, 998x485), no fake
// window chrome. The typed command and the error text both sit in the top ~30% of this screenshot, so
// both badges live in the blank top margin above the frame, offset in x so they don't overlap each
// other.
// ------------------------------------------------------------------------------------------------

const SHOT_PATH_ERROR = staticFile("slides/shots/agy_PATH_오류.png");
const SHOT_PATH_ERROR_W = 998;
const SHOT_PATH_ERROR_H = 485;

const Slide02: React.FC = () => {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const rect = fitShotRect(boxX, boxY, boxW, boxH, SHOT_PATH_ERROR_W, SHOT_PATH_ERROR_H);
  const b1 = { x: rect.x + rect.w * 0.1, y: rect.y - 24 }; // top margin, level with the typed command
  const b2 = { x: rect.x + rect.w * 0.46, y: rect.y - 24 }; // top margin, level with the error block

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="agy 명령어 인식 오류">
      <ShotFrame src={SHOT_PATH_ERROR} rect={rect} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={boxY}
        width={colW(3)}
        height={boxH}
        items={[
          { number: 1, head: "agy --version 으로 확인", body: "설치 직후 새 명령이 이 터미널에서 바로 인식되는지 확인한다." },
          { number: 2, head: "'agy' 인식 오류", body: "VS Code 는 켜질 때의 PATH 를 그대로 쓰기 때문에 방금 설치한 경로를 모른다." },
          { number: "!", head: "해결은 다음 슬라이드", body: "명령어로 PATH 를 만지지 않는다 — VS Code 를 완전히 껐다 켠다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · "PATH 등록하기" (shipped agy_PATH_등록, OS 별 분기 — step01.json slide 18)
// Windows: 액션박스 스크립트가 자동으로 찾아 등록. macOS: 스크립트를 쓰지 않고, agy 설치가 끝나며
// 찍어준 Run: 줄(export PATH ... >> ~/.zshrc)을 그대로 복사해 붙여넣는다 (CEO 2026-09-18 standing rule).
// ------------------------------------------------------------------------------------------------

interface PanelLine {
  text: string;
  tone?: "text" | "dim" | "accent";
}

const PANEL_PAD_TOP = 18;
const PANEL_LINE_STEP = 30;
const PANEL_LINE_H = 24;

const TermPanelBody: React.FC<{ width: number; height: number; lines: PanelLine[] }> = ({ width, height, lines }) => (
  <div style={{ width, height, boxSizing: "border-box", background: COLORS.void2, padding: `${PANEL_PAD_TOP}px 22px`, display: "flex", flexDirection: "column", gap: PANEL_LINE_STEP - PANEL_LINE_H, fontFamily: FONTS.term, fontSize: 16, overflow: "hidden" }}>
    {lines.map((l, i) => (
      <div key={i} style={{ height: PANEL_LINE_H, lineHeight: `${PANEL_LINE_H}px`, whiteSpace: "pre", color: l.tone === "accent" ? COLORS.accent : l.tone === "dim" ? "#767c81" : "#e8eaec" }}>
        {l.text}
      </div>
    ))}
  </div>
);

const TerminalPanelWindow: React.FC<{ x: number; y: number; width: number; height: number; os: WindowOs; title: string; lines: PanelLine[] }> = ({ x, y, width, height, os, title, lines }) => (
  <div style={{ position: "absolute", left: x, top: y, width, height }}>
    <AppWindow width={width} height={height} os={os} theme="dark" title={title} enter="none" float={false}>
      <TermPanelBody width={width} height={height - windowHeaderHeight(width, height)} lines={lines} />
    </AppWindow>
  </div>
);

const Slide03: React.FC = () => {
  const leftX = colX(0);
  const leftW = colW(9);
  const gap = 24;
  const winH = 330;
  const macY = BODY_Y + winH + gap;
  const macH = BODY_H - winH - gap;
  const headerH = windowHeaderHeight(leftW, winH);

  const winLines: PanelLine[] = [
    { text: "────────────────────────────────", tone: "dim" },
    { text: "[v] agy      사용 가능!  1.2.5", tone: "accent" },
    { text: "[ ] codex    아직 설치되지 않았습니다", tone: "dim" },
    { text: "[ ] claude   아직 설치되지 않았습니다", tone: "dim" },
    { text: "────────────────────────────────", tone: "dim" },
    { text: "1/3 확인됨.", tone: "text" },
  ];
  const macLines: PanelLine[] = [
    { text: '$ echo \'export PATH="$HOME/.local/bin:$PATH"\' >> ~/.zshrc', tone: "text" },
    { text: "$ source ~/.zshrc", tone: "dim" },
    { text: "$ agy --version", tone: "dim" },
    { text: "agy 1.2.5", tone: "accent" },
  ];

  const b1 = { x: leftX + leftW - 26, y: BODY_Y + headerH + PANEL_PAD_TOP + 1 * PANEL_LINE_STEP + PANEL_LINE_H / 2 };
  const macHeaderH = windowHeaderHeight(leftW, macH);
  const b2 = { x: leftX + leftW - 26, y: macY + macHeaderH + PANEL_PAD_TOP + 0 * PANEL_LINE_STEP + PANEL_LINE_H / 2 };

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="PATH 등록하기">
      <TerminalPanelWindow x={leftX} y={BODY_Y} width={leftW} height={winH} os="windows" title="PowerShell — 액션박스 스크립트 실행 결과" lines={winLines} />
      <TerminalPanelWindow x={leftX} y={macY} width={leftW} height={macH} os="mac" title="zsh — Terminal" lines={macLines} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={BODY_Y}
        width={colW(3)}
        height={BODY_H}
        items={[
          { number: 1, head: "Windows — 스크립트가 자동 등록", body: "액션박스 스크립트를 붙여넣으면 agy 위치를 찾아 PATH 에 자동으로 등록한다." },
          { number: 2, head: "macOS — 설치가 알려준 줄 그대로", body: "agy 설치가 끝나며 찍어준 Run: 줄을 그대로 복사해 붙여넣는다. 화면에 뜬 경로는 사람마다 다르다." },
          { number: "!", head: "지금은 agy 만 확인", body: "codex 와 claude 는 곧 설치한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · "VS Code 재실행 후 Antigravity 실행" (shipped agy_PATH_반영_및_실행 — step01.json slide 19)
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(9);
  const illoH = BODY_H;
  const lines: TerminalPaneLine[] = [
    { type: "input", text: "agy --version" },
    { type: "success", text: "agy 1.2.5" },
    { type: "input", text: "agy --dangerously-skip-permissions" },
    { type: "output", text: "확인 없이 파일·명령을 실행하는 모드입니다." },
  ];
  const t = terminalIllo({ x: illoX, y: illoY, w: illoW, h: illoH, lines });
  const b1 = t.spotForLine(0);
  const b2 = t.spotForLine(2);

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="VS Code 재실행 후 Antigravity 실행">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "agy --version 으로 재확인", body: "VS Code 를 완전히 껐다 켠 뒤 새 터미널에서 버전이 찍히는지 본다." },
          { number: 2, head: "--dangerously-skip-permissions 로 실행", body: "확인 없이 파일·명령을 실행하는 모드 — 이어서 설치까지 agy 에게 맡기기 위해 쓴다." },
          { number: "!", head: "버전 미출력 시", body: "창 ✕ 닫기나 Reload Window 로는 안 된다 — File > Exit 로 완전히 종료했다가 다시 연다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S1_AGY_INSTALL: SlideEntry[] = [
  { index: 1, name: "agy_설치", title: "Antigravity CLI 설치", render: () => React.createElement(Slide01) },
  { index: 2, name: "agy_PATH_오류", title: "agy 명령어 인식 오류", render: () => React.createElement(Slide02) },
  { index: 3, name: "agy_PATH_등록", title: "PATH 등록하기", render: () => React.createElement(Slide03) },
  { index: 4, name: "agy_PATH_반영_및_실행", title: "VS Code 재실행 후 Antigravity 실행", render: () => React.createElement(Slide04) },
];

export const S1_AGY_INSTALL_PART: PartSpec = { id: "s1-agy-install", eyebrow: EYEBROW, entries: S1_AGY_INSTALL };
