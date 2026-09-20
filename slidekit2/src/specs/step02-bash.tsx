// step02 "BASH 툴" — 10-slide spec mapped 1:1 to the CEO's lesson outline
// (ai-agent-class/_drafts/basic_step02_outline.md, section "4. bash툴 이란?"). Slide 01 = concept intro,
// slides 02-09 = the outline's 8 practice steps, slide 10 = outline item 9 (AI agent working-principle
// loop diagram).
//
// Rebuild (2026-09-18, CEO-approved "write part" style, specs/step02-write.tsx): every practice slide
// (02-09) now uses the write part's two-row body — top row = VS Code window (dark, layout="right",
// ClaudeCodeTerminal) on the left (~40% width) + the RESULT large on the right (~55-60%), bottom row =
// annotation cards in a horizontal row. Prompts are kept exactly as the outline/practice states them.
// Results come from a previous worker's real Sonnet run of every practice prompt
// (scratchpad/bash_practice/agent1/outputs/*.json + raw/) — where a command was REALLY executed (파일
// 목록, 컴퓨터 사양 practices) the terminal tool-call line is the real command, but per CEO correction
// (2026-09-18) the actual VALUES shown on those two result slides are a plausible teaching EXAMPLE for a
// student's own PC, not this dev machine's own systeminfo/ls dump ("내 컴에서 돌리는 건 의미가 없어") —
// labelled as an example on the annotation card. App-launch practices (카카오톡/유튜브/슬라임펫/웹캠 등)
// were deliberately never actually launched/run (see the JSON notes), so their results are hand-drawn
// mocks in this deck's own design system (tokens only, no photorealistic branding) rather than invented
// screenshots — the webcam slide in particular shows a plain "촬영된 사진" placeholder frame, never a fake
// photo. tetris.py's mock reuses the same beveled/sidebar look established in step02-write.tsx (copied
// locally per the worker guide's "own copy, nothing shared edited" rule, not imported). No shared
// component was touched.
import React from "react";
import { Img, staticFile } from "remotion";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { AppWindow, type WindowOs } from "../core/AppWindow";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "BASH 툴";
const TOTAL = 10;

const WINDOW_HEADER_H = 34; // AppWindow's own native title bar height assumption (matches step02-write.tsx).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // left gutter reserved inside the terminal so badges sit beside their line.

// ------------------------------------------------------------------------------------------------
// Two-row body layout (CEO 2026-09-18, same math as step02-write.tsx — local copy per the worker guide):
// top row = VS Code terminal (left, ~40%) + result (right, ~55-60%); bottom row = horizontal card strip.
// ------------------------------------------------------------------------------------------------
const ROW_GAP = 28;
const TOP_H = 512;
const CARDS_Y = BODY_Y + TOP_H + ROW_GAP;
const CARDS_H = BODY_BOTTOM - CARDS_Y;

const TERM_COL_X = colX(0);
const TERM_COL_W = colW(5); // ~40% of the content width
const RESULT_COL_X = colX(5);
const RESULT_COL_W = 1800 - RESULT_COL_X; // ~57% of the content width
const SPLIT_WINDOW_H = 480;

function windowGeometry(illoW: number, illoH: number, windowH = 480) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

function rightTermWidth(windowNative: { w: number }): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  return Math.round(contentW * 0.84); // mainMode is always "empty" in this part (no editor tab ever opens)
}

// Files that exist by the time of the bash practices (write_practice's 5 files, already on disk).
const BASE_FILES = ["calculator.py", "dog_on_bike.svg", "poster.html", "self_introduction.md", "tetris.py"];

// BASE_FILES + any bash-section files written so far, the last one marked "new" once one has been added.
function explorerAt(extra: string[]): ExplorerNode[] {
  const all = [...BASE_FILES, ...extra];
  return all.map((name, i) => ({ name, kind: "file", depth: 0, state: extra.length > 0 && i === all.length - 1 ? "new" : "normal" }));
}

// A right-layout VS Code + Claude Code terminal illo, reusable at any x/y/w/h (local copy of
// step02-write.tsx's own terminalIllo — nothing shared edited).
function terminalIllo(opts: { x: number; y: number; w: number; h: number; windowH: number; explorerNodes: ExplorerNode[]; turns?: ClaudeCodeTurn[] }) {
  const { x, y, w, h, windowH, explorerNodes, turns } = opts;
  const { windowNative, focus, view } = windowGeometry(w, h, windowH);
  const termW = rightTermWidth(windowNative);
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: turns ?? [], fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });
  const toFrame = (p: { x: number; y: number }) => ({ x: x + view.tx + p.x * view.s, y: y + view.ty + p.y * view.s });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const spotForTurn = (i: number) => toFrame({ x: badgeX, y: contentTop + termLayout.turns[i].anchorY + termLayout.lineH / 2 });

  const node = (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
      <Camera width={w} height={h} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
        <VSCodeScreen
          width={windowNative.w}
          height={windowNative.h}
          explorerNodes={explorerNodes}
          layout="right"
          terminalWidth={termW}
          showTerminal
          terminalContent={<ClaudeCodeTerminal width={termW} turns={turns} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
          mainMode="empty"
        />
      </Camera>
    </div>
  );
  return { node, spotForTurn };
}

// ------------------------------------------------------------------------------------------------
// Horizontal bottom card row — local copy of step02-write.tsx's own CardRow (own copy per the worker
// guide, not imported/shared).
// ------------------------------------------------------------------------------------------------
interface CardItem {
  number: number | string;
  head: string;
  body?: string;
}

const CardRow: React.FC<{ x: number; y: number; width: number; height: number; items: CardItem[]; gap?: number }> = ({ x, y, width, height, items, gap = 24 }) => {
  const n = Math.max(1, items.length);
  const cardW = (width - gap * (n - 1)) / n;
  return (
    <div style={{ position: "absolute", left: x, top: y, width, height }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: i * (cardW + gap),
            top: 0,
            width: cardW,
            height,
            boxSizing: "border-box",
            background: COLORS.paper2,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 16,
            padding: "20px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                flex: "0 0 auto",
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: COLORS.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: 17,
                color: "#ffffff",
              }}
            >
              {it.number}
            </div>
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 24, lineHeight: 1.25, color: COLORS.ink, wordBreak: "keep-all" }}>{it.head}</div>
          </div>
          {it.body ? <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 19, lineHeight: 1.4, color: COLORS.ink2, wordBreak: "keep-all" }}>{it.body}</div> : null}
        </div>
      ))}
    </div>
  );
};

// ------------------------------------------------------------------------------------------------
// Result window chrome — local copies of step02-write.tsx's BrowserResultWindow/NativeAppResultWindow.
// ------------------------------------------------------------------------------------------------

// A Chrome-style browser frame (tab row + address bar), used only for the 유튜브 result — a plain "mac
// window" title bar doesn't read as a browser, so this draws the two rows a real Chrome window has.
const ChromeBrowserWindow: React.FC<{ x: number; y: number; width: number; height: number; tabLabel: string; url: string; children: React.ReactNode }> = ({ x, y, width, height, tabLabel, url, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width, height, borderRadius: 12, overflow: "hidden", border: `1px solid ${COLORS.line}`, boxShadow: "0 18px 40px rgba(16,17,19,0.12)", display: "flex", flexDirection: "column", background: "#dee1e6" }}>
    <div style={{ height: 40, flex: "0 0 40px", display: "flex", alignItems: "flex-end", padding: "6px 12px 0", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#ffffff", borderRadius: "10px 10px 0 0", padding: "8px 18px", fontFamily: FONTS.display, fontWeight: 600, fontSize: 14, color: COLORS.ink }}>
        <div style={{ width: 14, height: 14, borderRadius: 4, background: "#ff0000", flex: "0 0 auto" }} />
        {tabLabel}
      </div>
    </div>
    <div style={{ height: 46, flex: "0 0 46px", background: "#ffffff", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", borderBottom: `1px solid ${COLORS.line}` }}>
      <div style={{ display: "flex", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", border: `1.5px solid ${COLORS.ink3}` }} />
        ))}
      </div>
      <div style={{ flex: 1, height: 30, borderRadius: 15, background: "#f1f3f4", display: "flex", alignItems: "center", padding: "0 14px", gap: 8 }}>
        <svg width={12} height={14} viewBox="0 0 12 14">
          <path d="M2 6V4a4 4 0 018 0v2" fill="none" stroke={COLORS.ink3} strokeWidth="1.4" />
          <rect x="1" y="6" width="10" height="7" rx="1.5" fill="none" stroke={COLORS.ink3} strokeWidth="1.4" />
        </svg>
        <span style={{ fontFamily: FONTS.term, fontSize: 14, color: COLORS.ink2 }}>{url}</span>
      </div>
    </div>
    <div style={{ flex: "1 1 0", minHeight: 0 }}>{children}</div>
  </div>
);

const NativeAppResultWindow: React.FC<{ x: number; y: number; width: number; height: number; title: string; theme?: "light" | "dark"; children: React.ReactNode }> = ({
  x,
  y,
  width,
  height,
  title,
  theme = "light",
  children,
}) => (
  <div style={{ position: "absolute", left: x, top: y, width, height }}>
    <AppWindow width={width} height={height} os={"windows" as WindowOs} theme={theme} title={title} enter="none" float={false}>
      {children}
    </AppWindow>
  </div>
);

// A frameless full-bleed result panel (rounded + shadow, no title bar) — for the one result (슬라임 펫)
// that has no real window chrome at all (borderless always-on-top overlay).
const FramelessResultPanel: React.FC<{ x: number; y: number; width: number; height: number; children: React.ReactNode }> = ({ x, y, width, height, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width, height, borderRadius: 18, overflow: "hidden", border: `1px solid ${COLORS.line}`, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
    {children}
  </div>
);

// A dark terminal-styled text panel (own tab header) — for the two "really run" command results, shown as
// a short teaching EXAMPLE rather than this dev machine's own dump (CEO correction 2026-09-18).
const TERM_PANEL = { bg: "#1f1f1f", tabBg: "#181818", border: "#2b2b2b", text: "#cfd2d4" };

const TerminalTextPanel: React.FC<{ x: number; y: number; width: number; height: number; tabLabel: string; lines: string[] }> = ({ x, y, width, height, tabLabel, lines }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      boxSizing: "border-box",
      borderRadius: 12,
      overflow: "hidden",
      border: `1px solid ${TERM_PANEL.border}`,
      boxShadow: "0 18px 40px rgba(16,17,19,0.12)",
      display: "flex",
      flexDirection: "column",
      background: TERM_PANEL.bg,
    }}
  >
    <div
      style={{
        height: 36,
        flex: "0 0 36px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 18px",
        background: TERM_PANEL.tabBg,
        borderBottom: `1px solid ${TERM_PANEL.border}`,
        borderTop: `2px solid ${COLORS.accent}`,
      }}
    >
      <span style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 15, color: TERM_PANEL.text }}>{tabLabel}</span>
    </div>
    <div style={{ flex: "1 1 0", minHeight: 0, padding: "24px 30px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
      {lines.map((ln, i) => (
        <div key={i} style={{ fontFamily: FONTS.term, fontSize: 20, lineHeight: 1.55, color: TERM_PANEL.text, whiteSpace: "pre" }}>
          {ln === "" ? " " : ln}
        </div>
      ))}
    </div>
  </div>
);

// ------------------------------------------------------------------------------------------------
// App-launch result mocks — hand-drawn in this deck's own token system (no photorealistic branding),
// since these apps were deliberately never actually launched during the practice run.
// ------------------------------------------------------------------------------------------------

const FileGlyphSmall: React.FC<{ size?: number; tone?: string }> = ({ size = 26, tone = COLORS.accentDeep }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
    <path d="M4 2 H14 L20 8 V21 C20 21.6 19.6 22 19 22 H4 C3.4 22 3 21.6 3 21 V3 C3 2.4 3.4 2 4 2 Z" fill="none" stroke={tone} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M14 2 V8 H20" fill="none" stroke={tone} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

// 02 · 카카오톡 — the first login window a student actually sees when KakaoTalk launches: logo, account/
// password fields, login button, auto-login checkbox, sign-up/find-account links.
const KakaoLoginMock: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const panelW = Math.min(420, width - 80);
  return (
    <div style={{ width, height, background: "#f4f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: panelW, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, background: "#ffffff", borderRadius: 16, padding: "40px 36px", boxShadow: "0 10px 30px rgba(16,17,19,0.08)" }}>
        <div style={{ width: 62, height: 62, borderRadius: 16, background: "#fee500", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={34} height={30} viewBox="0 0 34 30">
            <ellipse cx="17" cy="13" rx="17" ry="13" fill="#3c1e1e" />
            <path d="M9 22 L6 29 L14 23.5 Z" fill="#3c1e1e" />
          </svg>
        </div>
        <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 22, color: COLORS.ink }}>KakaoTalk</span>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ width: "100%", height: 46, borderRadius: 8, border: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONTS.body, fontSize: 15, color: COLORS.ink3 }}>카카오계정(이메일 또는 전화번호)</div>
          <div style={{ width: "100%", height: 46, borderRadius: 8, border: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", padding: "0 14px", fontFamily: FONTS.body, fontSize: 15, color: COLORS.ink3 }}>비밀번호</div>
        </div>
        <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 18 }}>
          {["자동로그인", "로그인 상태 유지"].map((label) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 15, height: 15, borderRadius: 3, border: `1.5px solid ${COLORS.ink3}` }} />
              <span style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.ink2 }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ width: "100%", height: 48, borderRadius: 8, background: "#fee500", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.display, fontWeight: 700, fontSize: 17, color: "#3c1e1e" }}>로그인</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: FONTS.body, fontSize: 13, color: COLORS.ink3 }}>
          <span>회원가입</span>
          <div style={{ width: 1, height: 12, background: COLORS.line }} />
          <span>계정 찾기</span>
        </div>
      </div>
    </div>
  );
};

// 03 · 유튜브 — the page inside the Chrome window (ChromeBrowserWindow draws the tab/address bar).
// Plain grey thumbnails only — no real channel names or thumbnails.
const YoutubeMock: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{ width, height, background: "#ffffff", display: "flex", flexDirection: "column" }}>
    <div style={{ height: 56, flex: "0 0 56px", display: "flex", alignItems: "center", gap: 16, padding: "0 24px", borderBottom: `1px solid ${COLORS.line}` }}>
      <div style={{ width: 30, height: 22, borderRadius: 6, background: "#ff0000", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
        <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "9px solid #ffffff" }} />
      </div>
      <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: COLORS.ink }}>YouTube</span>
      <div style={{ flex: 1, maxWidth: 420, height: 32, borderRadius: 16, border: `1px solid ${COLORS.line}`, marginLeft: 24 }} />
    </div>
    <div style={{ flex: 1, padding: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
      {new Array(6).fill(0).map((_, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 8, background: "#d9d9d9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "14px solid #ffffff" }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#d9d9d9", flex: "0 0 auto" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
              <div style={{ width: "90%", height: 9, borderRadius: 4, background: COLORS.ink2, opacity: 0.75 }} />
              <div style={{ width: "70%", height: 8, borderRadius: 4, background: COLORS.line }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 04 · 바탕화면 폴더 열기 — a simplified desktop/explorer mock highlighting the new file.
const DesktopFolderMock: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{ width, height, background: "#f3f6f9", display: "flex", flexDirection: "column" }}>
    <div style={{ height: 44, flex: "0 0 44px", background: "#ffffff", borderBottom: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", padding: "0 16px", fontFamily: FONTS.display, fontWeight: 600, fontSize: 15, color: COLORS.ink2 }}>바탕화면</div>
    <div style={{ flex: 1, padding: 28, display: "flex", gap: 36, flexWrap: "wrap", alignContent: "flex-start" }}>
      {["휴지통", "문서"].map((name) => (
        <div key={name} style={{ width: 88, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 52, height: 52, borderRadius: 8, background: "#ffffff", border: `1px solid ${COLORS.line}` }} />
          <span style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.ink2 }}>{name}</span>
        </div>
      ))}
      <div style={{ width: 104, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ width: 52, height: 52, borderRadius: 8, background: COLORS.accentWash, border: `2px solid ${COLORS.accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FileGlyphSmall />
        </div>
        <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 13, color: COLORS.accentDeep, wordBreak: "keep-all" }}>자기소개서.txt</span>
      </div>
    </div>
  </div>
);

// 06 · 테트리스 — beveled-cell + sidebar look, copied locally from step02-write.tsx's own TetrisMock
// (own copy per the worker guide; nothing shared edited).
const TET_COLORS = { I: "#26e5ff", O: "#ffe14d", T: "#c869ff", S: "#57e37f", Z: "#ff5c6c", J: "#5b7bff", L: "#ff9d3d" };
const TETRIS_COLS = 10;
const TETRIS_ROWS = 20;
const TETRIS_SETTLED: Array<{ c: number; r: number; k: keyof typeof TET_COLORS }> = [
  { c: 2, r: 19, k: "L" }, { c: 3, r: 19, k: "L" }, { c: 4, r: 19, k: "L" }, { c: 2, r: 18, k: "L" },
  { c: 5, r: 19, k: "O" }, { c: 6, r: 19, k: "O" }, { c: 5, r: 18, k: "O" }, { c: 6, r: 18, k: "O" },
  { c: 7, r: 19, k: "J" }, { c: 7, r: 18, k: "J" }, { c: 8, r: 18, k: "J" }, { c: 8, r: 17, k: "J" },
  { c: 0, r: 19, k: "S" }, { c: 1, r: 19, k: "S" }, { c: 0, r: 18, k: "T" }, { c: 1, r: 17, k: "T" },
];
const TETRIS_FALLING: Array<{ c: number; r: number; k: keyof typeof TET_COLORS }> = [
  { c: 4, r: 1, k: "I" }, { c: 4, r: 2, k: "I" }, { c: 4, r: 3, k: "I" }, { c: 4, r: 4, k: "I" },
];

const BeveledCell: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const bevel = Math.max(2, size / 8);
  return (
    <div style={{ position: "relative", width: size, height: size, boxSizing: "border-box" }}>
      <div style={{ position: "absolute", inset: 0, background: color, outline: "1px solid rgba(0,0,0,0.33)" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: bevel, background: "rgba(255,255,255,0.35)" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: bevel, height: "100%", background: "rgba(255,255,255,0.35)" }} />
      <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: bevel, background: "rgba(0,0,0,0.32)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, width: bevel, height: "100%", background: "rgba(0,0,0,0.32)" }} />
    </div>
  );
};

const TetrisMock: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const sidebarW = Math.max(150, Math.round(width * 0.26));
  const boardAreaW = width - sidebarW - 24;
  const cell = Math.min(Math.floor(boardAreaW / TETRIS_COLS), Math.floor((height - 32) / TETRIS_ROWS));
  const boardW = cell * TETRIS_COLS;
  const boardH = cell * TETRIS_ROWS;
  return (
    <div style={{ width, height, boxSizing: "border-box", background: "#1b1e2b", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: 16 }}>
      <div
        style={{
          position: "relative",
          width: boardW,
          height: boardH,
          background: "#12141e",
          boxSizing: "border-box",
          border: "2px solid #3a3f5c",
          backgroundImage: `linear-gradient(#2a2e42 1px, transparent 1px), linear-gradient(90deg, #2a2e42 1px, transparent 1px)`,
          backgroundSize: `${cell}px ${cell}px`,
        }}
      >
        {TETRIS_SETTLED.map((b, i) => (
          <div key={`s${i}`} style={{ position: "absolute", left: b.c * cell, top: b.r * cell }}>
            <BeveledCell size={cell} color={TET_COLORS[b.k]} />
          </div>
        ))}
        {TETRIS_FALLING.map((b, i) => (
          <div key={`f${i}`} style={{ position: "absolute", left: b.c * cell, top: b.r * cell }}>
            <BeveledCell size={cell} color={TET_COLORS[b.k]} />
          </div>
        ))}
      </div>
      <div style={{ width: sidebarW, height: boardH, flex: `0 0 ${sidebarW}px`, background: "#242840", borderRadius: 6, display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 10px", gap: 6, boxSizing: "border-box", overflow: "hidden" }}>
        <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: Math.round(sidebarW * 0.15), color: "#ffffff", letterSpacing: "0.04em", lineHeight: 1.1 }}>TETRIS</div>
        <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: Math.round(sidebarW * 0.08), color: "#9aa0c3", lineHeight: 1.1 }}>다음 블록</div>
        <div style={{ width: "58%", aspectRatio: "1.4", background: "#12141e", border: "2px solid #3a3f5c", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: Math.round(sidebarW * 0.09), height: Math.round(sidebarW * 0.09), background: TET_COLORS.O }} />
            ))}
          </div>
        </div>
        <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: Math.round(sidebarW * 0.08), color: "#9aa0c3", lineHeight: 1.1 }}>점수</div>
        <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: Math.round(sidebarW * 0.15), color: "#ffe14d", lineHeight: 1.1 }}>240</div>
        <div style={{ width: "88%", padding: "7px 0", borderRadius: 5, background: "#57e37f", textAlign: "center", fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: Math.round(sidebarW * 0.1), color: "#12141e", marginTop: "auto", lineHeight: 1.1 }}>
          시작
        </div>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: Math.round(sidebarW * 0.05), color: "#6b7096", textAlign: "center", lineHeight: 1.3 }}>
          ←→ 이동 ↑ 회전
          <br />↓ 소프트드롭 Space 하드드롭
        </div>
      </div>
    </div>
  );
};

// 07 · 슬라임 펫 — hand-drawn from slime_pet_layout.json + the real slime_pet.py source: borderless
// always-on-top overlay near the bottom-right corner of the desktop (no real window chrome to draw).
const SlimeDesktopMock: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const slimeSize = Math.min(width, height) * 0.4;
  return (
    <div style={{ width, height, position: "relative", background: "#dbe6f0", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 24, top: 24, display: "flex", flexDirection: "column", gap: 22 }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 64 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "#ffffff", border: `1px solid ${COLORS.line}` }} />
            <div style={{ width: 48, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.85)" }} />
          </div>
        ))}
      </div>
      <svg width={slimeSize} height={slimeSize} viewBox="0 0 160 160" style={{ position: "absolute", right: 56, bottom: 90 }}>
        <defs>
          <radialGradient id="slimeGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#c6f7e6" />
            <stop offset="55%" stopColor="#8ee6c9" />
            <stop offset="100%" stopColor="#5fc9a8" />
          </radialGradient>
        </defs>
        <ellipse cx="80" cy="142" rx="46" ry="10" fill="#000000" opacity="0.12" />
        <path d="M80 30 C118 30 140 62 140 96 C140 128 114 148 80 148 C46 148 20 128 20 96 C20 62 42 30 80 30 Z" fill="url(#slimeGrad)" stroke="#5fc9a8" strokeWidth="3" />
        <ellipse cx="52" cy="104" rx="10" ry="7" fill="#ff9ecf" opacity="0.65" />
        <ellipse cx="108" cy="104" rx="10" ry="7" fill="#ff9ecf" opacity="0.65" />
        <ellipse cx="58" cy="88" rx="7" ry="9" fill="#2b2b3a" />
        <ellipse cx="102" cy="88" rx="7" ry="9" fill="#2b2b3a" />
        <circle cx="60.5" cy="84.5" r="2.2" fill="#ffffff" />
        <circle cx="104.5" cy="84.5" r="2.2" fill="#ffffff" />
        <path d="M70 110 Q80 118 90 110" stroke="#2b2b3a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 46, background: "#1f1f1f", display: "flex", alignItems: "center", padding: "0 20px", gap: 14 }}>
        <div style={{ width: 80, height: 22, borderRadius: 5, background: "#2c3033" }} />
        <div style={{ marginLeft: "auto", fontFamily: FONTS.term, fontSize: 14, color: "#cfd2d4" }}>오후 3:41</div>
      </div>
    </div>
  );
};

// 09 · 웹캠 캡처 — the photo viewer shows the captured shot (an illustrated portrait asset, so no
// real face is published), filling the viewer without distortion.
const PhotoPlaceholderMock: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{ width, height, background: "#1a1c20", display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
    <Img
      src={staticFile("slides/bash/webcam_shot.png")}
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 6 }}
    />
  </div>
);

// ------------------------------------------------------------------------------------------------
// 01 · bash 툴이란 — 개념 슬라이드 (unchanged from the prior deck; card -> arrow -> circle layout).
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const leftX = colX(0);
  const leftW = colW(5);
  const illoX = colX(5);
  const illoY = BODY_Y;
  const illoW = colW(7);
  const illoH = BODY_BOTTOM - BODY_Y;

  const cardW = 460;
  const cardH = 620;
  const cardX = illoX + 30;
  const cardY = illoY + (illoH - cardH) / 2;

  const commands: Array<{ label: string; value: string }> = [
    { label: "폴더 생성", value: "mkdir new_folder" },
    { label: "파일 복사", value: "copy a.txt b.txt" },
    { label: "이름 변경", value: "ren old.txt new.txt" },
    { label: "프로그램 설치", value: "winget install ..." },
    { label: "스크립트 실행", value: "python app.py" },
  ];

  const computerR = 175;
  const computerCx = cardX + cardW + 300;
  const computerCy = cardY + cardH / 2;

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="터미널 명령어 실행 도구">
      <AnnotationColumn
        x={leftX}
        y={illoY}
        width={leftW}
        height={illoH}
        items={[
          { number: 1, head: "터미널 명령어를 AI가 대신 쓴다", body: "1회차에 쓰던 그 '터미널 명령어'를 에이전트가 직접 입력하고 실행한다." },
          { number: 2, head: "컴퓨터의 거의 모든 작업이 가능", body: "폴더 생성부터 파일 복사·이름 변경, 프로그램 설치·스크립트 실행까지." },
        ]}
      />

      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH }}>
        <div
          style={{
            position: "absolute",
            left: cardX - illoX,
            top: cardY - illoY,
            width: cardW,
            height: cardH,
            background: COLORS.paper2,
            border: `2px solid ${COLORS.line}`,
            borderRadius: 18,
            boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
            padding: "44px 44px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36, flex: "0 0 auto" }}>
            <div style={{ width: 44, height: 44, borderRadius: 9, background: COLORS.accentWash, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
              <svg width={24} height={22} viewBox="0 0 24 22">
                <rect x={1} y={1} width={22} height={16} rx={2} fill="none" stroke={COLORS.accentDeep} strokeWidth={1.8} />
                <path d="M4 6L8 9L4 12" fill="none" stroke={COLORS.accentDeep} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 12H15" stroke={COLORS.accentDeep} strokeWidth={1.8} strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 32, color: COLORS.accentDeep }}>bash</span>
          </div>
          <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {commands.map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: COLORS.accent, flex: "0 0 auto", transform: "translateY(-4px)" }} />
                <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 28, color: COLORS.ink, flex: "0 0 auto", wordBreak: "keep-all" }}>{r.label}</span>
                <span style={{ fontFamily: FONTS.term, fontWeight: 400, fontSize: 22, color: COLORS.ink2 }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {(() => {
          const ax0 = cardX - illoX + cardW + 20;
          const ax1 = computerCx - illoX - computerR - 20;
          const aw = Math.max(40, ax1 - ax0);
          return (
            <svg style={{ position: "absolute", left: ax0, top: cardY - illoY + cardH / 2 - 20, width: aw, height: 40 }} viewBox={`0 0 ${aw} 40`}>
              <path d={`M0 20 H${aw - 22}`} fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" />
              <path d={`M${aw - 28} 8 L${aw - 4} 20 L${aw - 28} 32`} fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        })()}

        <div
          style={{
            position: "absolute",
            left: computerCx - illoX - computerR,
            top: computerCy - illoY - computerR,
            width: computerR * 2,
            height: computerR * 2,
            borderRadius: "50%",
            background: COLORS.accentWash,
            border: `3px solid ${COLORS.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ width: 100, height: 76, borderRadius: 10, background: "#ffffff", border: `3.5px solid ${COLORS.accentDeep}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <div style={{ width: 70, height: 8, borderRadius: 2, background: COLORS.accentDeep, opacity: 0.85 }} />
            <div style={{ width: 70, height: 8, borderRadius: 2, background: COLORS.accentDeep, opacity: 0.55 }} />
            <div style={{ width: 46, height: 8, borderRadius: 2, background: COLORS.accentDeep, opacity: 0.3 }} />
          </div>
          <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 28, color: COLORS.accentDeep, marginTop: 4 }}>컴퓨터</span>
        </div>
      </div>

      <FocusBadge number={1} x={cardX + cardW - 8} y={cardY + 6} />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · 실습 1 — "카카오톡 실행"
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "컴퓨터에 설치된 pc 카카오톡 찾아서 실행해줘" },
    { role: "assistant", text: "Bash(start KakaoTalk.exe)" },
    { role: "assistant", text: "카카오톡을 찾아서 실행했어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt([]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="카카오톡 실행">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="카카오톡">
        <KakaoLoginMock width={RESULT_COL_W} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "카카오톡 찾아서 실행해줘", body: "\"카카오톡 찾아서 실행해줘\"라고 말로 지시한다." },
          { number: 2, head: "bash 툴로 실행 명령을 입력", body: "설치된 프로그램을 찾아 실행 명령을 직접 입력한다." },
          { number: "!", head: "실제 카카오톡 창이 뜬다", body: "설치돼 있으면 로그인 창이나 채팅창이 화면에 그대로 나타난다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · 실습 2 — "유튜브 실행"
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "크롬으로 유튜브 실행해줘" },
    { role: "assistant", text: "Bash(start chrome https://youtube.com)" },
    { role: "assistant", text: "크롬으로 유튜브를 열었어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt([]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="유튜브 실행">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <ChromeBrowserWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} tabLabel="YouTube" url="https://www.youtube.com">
        <YoutubeMock width={RESULT_COL_W} height={TOP_H - 86} />
      </ChromeBrowserWindow>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "크롬으로 유튜브 실행해줘", body: "\"크롬으로 유튜브 실행해줘\"라고 지시한다." },
          { number: 2, head: "실행 + 주소 열기를 한 번에", body: "크롬 실행 명령과 유튜브 주소 열기를 이어서 실행한다." },
          { number: "!", head: "실제 크롬 창이 열린다", body: "크롬 창이 뜨고 유튜브 화면이 그대로 보인다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · 실습 3 — "자기소개서 만들고 폴더 열기"
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "바탕화면에 메모장으로 자기소개서를 만들고 저장된 폴더를 열어줘" },
    { role: "assistant", text: "Bash(notepad 자기소개서.txt) · Bash(explorer.exe .)" },
    { role: "assistant", text: "자기소개서를 쓰고, 저장된 바탕화면 폴더를 열었어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt([]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="자기소개서 만들고 폴더 열기">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="바탕화면">
        <DesktopFolderMock width={RESULT_COL_W} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "메모장 작성 + 폴더 열기를 요청", body: "메모장으로 자기소개서 만들고 폴더 열어달라고 지시한다." },
          { number: 2, head: "두 개의 명령을 이어서 실행", body: "메모장 실행 명령과 탐색기 열기 명령을 순서대로 실행한다." },
          { number: "!", head: "파일이 생기고 폴더가 열린다", body: "바탕화면에 파일이 생기고 그 폴더 창이 바로 열린다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · 실습 4 — "파일 목록 확인" (실제로 실행됨 — 결과는 학생 폴더 기준 EXAMPLE, 이 PC의 실제 출력이 아님)
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "현재폴더의 파일 목록을 설명해줘" },
    { role: "assistant", text: "Bash(ls -la)" },
    { role: "assistant", text: "폴더 안 파일 목록을 확인하고 하나씩 설명해줄게요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt([]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  const lsLines = [
    "total 7",
    "-rw-r--r-- 1 user user  620 self_introduction.md",
    "-rw-r--r-- 1 user user 3.4K dog_on_bike.svg",
    "-rw-r--r-- 1 user user 4.6K poster.html",
    "-rw-r--r-- 1 user user 2.1K calculator.py",
    "-rw-r--r-- 1 user user  10K tetris.py",
    "-rw-r--r-- 1 user user 6.7K slime_pet.py",
    "-rw-r--r-- 1 user user  680 webcam_capture.py",
  ];

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="파일 목록 확인">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <TerminalTextPanel x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} tabLabel="ls -la 결과" lines={lsLines} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "현재 폴더 파일 목록을 설명해줘", body: "\"현재 폴더 파일 목록을 설명해줘\"라고 지시한다." },
          { number: 2, head: "실제로 목록 조회 명령을 실행", body: "폴더 안 파일·폴더 목록을 조회하는 명령을 직접 실행한다." },
          { number: "!", head: "실제 폴더 내용을 읽고 설명", body: "지금까지 실습에서 만든 파일들을 읽고 하나씩 사람 말로 정리한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · 실습 5 — "테트리스 실행"
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "현재폴더에 테트리스 파일 찾아서 실행해줘" },
    { role: "assistant", text: "Bash(python tetris.py)" },
    { role: "assistant", text: "테트리스 파일을 찾아서 실행했어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt([]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="테트리스 실행">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="테트리스" theme="dark">
        <TetrisMock width={RESULT_COL_W} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "테트리스 파일 찾아서 실행해줘", body: "\"테트리스 파일 찾아서 실행해줘\"라고 지시한다." },
          { number: 2, head: "파일 찾기 + 실행을 이어서", body: "폴더에서 파일을 찾아 바로 실행 명령까지 이어간다." },
          { number: "!", head: "이전에 만든 게임이 실제로 켜진다", body: "write 툴 실습에서 만든 테트리스가 그대로 실행된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · 실습 6 — "데스크탑 슬라임 펫 만들기"
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "svg로 귀여운 슬라임같은 캐릭터 만들어서, 바탕화면에 떠서 마우스로 들었다 놓을수 있는(중력 적용) 파이썬 프로그램으로 실행해줄래?" },
    { role: "assistant", text: "Write(slime_pet.py) · Bash(python slime_pet.py)" },
    { role: "assistant", text: "슬라임이 바탕화면에 떠 있어요. 마우스로 들었다 놓으면 중력으로 떨어져요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt(["slime_pet.py"]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="데스크탑 슬라임 펫 만들기">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <FramelessResultPanel x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H}>
        <SlimeDesktopMock width={RESULT_COL_W} height={TOP_H} />
      </FramelessResultPanel>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "SVG 디자인 + 실행까지 한 번에", body: "귀여운 캐릭터 SVG, 파이썬 프로그램 제작, 실행까지 한 문장으로 지시한다." },
          { number: 2, head: "write 툴이 만들고 bash 툴이 실행", body: "write 툴로 만든 프로그램을 bash 툴이 곧바로 실행한다." },
          { number: "!", head: "마우스로 들었다 놓을 수 있다", body: "드래그로 옮기고, 오른쪽 클릭하면 슬라임이 바로 사라진다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · 실습 7 — "컴퓨터 사양·GPU 온도 확인" (실제로 실행됨 — 결과는 EXAMPLE 값, 학생마다 다르게 나온다)
// ------------------------------------------------------------------------------------------------

const Slide08: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "현재 컴퓨터 사양과 현재 gpu온도등을 조사해서 설명해줘" },
    { role: "assistant", text: "Bash(systeminfo) · Bash(nvidia-smi)" },
    { role: "assistant", text: "GPU는 52도, 메모리는 32GB로 확인됐어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt(["slime_pet.py"]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  const specLines = [
    "OS 이름:        Microsoft Windows 11 Pro",
    "시스템 종류:     x64 기반 PC",
    "프로세서:        11th Gen Intel Core i7-13700",
    "총 실제 메모리:  32,768MB",
    "",
    "GPU: NVIDIA GeForce RTX 4070, Driver 551.23",
    "온도: 52 C",
  ];

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="컴퓨터 사양·GPU 온도 확인">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <TerminalTextPanel x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} tabLabel="systeminfo · nvidia-smi" lines={specLines} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "사양과 GPU 온도 조사 요청", body: "\"컴퓨터 사양과 GPU 온도 조사해줘\"라고 지시한다." },
          { number: 2, head: "시스템·GPU 조회 명령을 직접 실행", body: "systeminfo와 nvidia-smi 명령을 직접 실행한다." },
          { number: "!", head: "실제 하드웨어 값을 읽어서 설명", body: "명령 결과를 그대로 읽어 사람이 알아보기 쉽게 정리해 답한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 09 · 실습 8 — "웹캠 캡처 확인"
// ------------------------------------------------------------------------------------------------

const Slide09: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "현재 컴퓨터에 연결된 웹캠 인식해볼래? 그걸로 현재 뭐가 보이는지 캡처해서 설명해봐" },
    { role: "assistant", text: "Write(webcam_capture.py) · Bash(python webcam_capture.py)" },
    { role: "assistant", text: "웹캠으로 사진을 찍어서 저장했어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt(["slime_pet.py", "webcam_capture.py"]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="웹캠 캡처 확인">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="사진 뷰어">
        <PhotoPlaceholderMock width={RESULT_COL_W} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "웹캠 인식 + 캡처 + 설명 요청", body: "\"웹캠 인식하고 캡처해서 설명해줘\"라고 지시한다." },
          { number: 2, head: "write 툴이 만들고 bash 툴이 실행", body: "웹캠을 인식해 사진을 찍는 스크립트를 만들고 바로 실행한다." },
          { number: "!", head: "찍힌 사진을 실제로 읽고 설명", body: "저장된 사진 파일을 열어 눈에 보이는 것을 사람 말로 설명한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 10 · AI 에이전트 작동 원리 — 루프 다이어그램 (unchanged from the prior deck).
// ------------------------------------------------------------------------------------------------

const LOOP_STEPS: Array<{ head: string; body: string }> = [
  { head: "지시", body: "사용자가 할 일을 말로 지시한다." },
  { head: "작성", body: "write·edit 툴로 코드·명령어를 작성한다." },
  { head: "실행", body: "bash 툴로 실제로 실행해본다." },
  { head: "확인", body: "결과를 보고 다시 고친다." },
];

const Slide10: React.FC = () => {
  const rowY = BODY_Y + 10;
  const cardW = 360;
  const cardH = 300;
  const gap = 80;
  const cardX = (i: number) => colX(0) + i * (cardW + gap);
  const cardCy = rowY + cardH / 2;

  const arrowGap = (i: number) => {
    const x0 = cardX(i) + cardW;
    const x1 = cardX(i + 1);
    return { x0, x1, y: cardCy };
  };

  const loopY0 = rowY + cardH + 26;
  const loopH = 150;
  const loopStartX = cardX(3) + cardW * 0.5; // 확인 카드 중앙
  const loopEndX = cardX(1) + cardW * 0.5; // 작성 카드 중앙 (여기로 돌아간다)
  const loopBottomY = loopY0 + loopH;

  const bannerY = loopBottomY + 34;
  const bannerH = BODY_BOTTOM - bannerY;

  return (
    <SlideFrame index={10} total={TOTAL} eyebrow={EYEBROW} title="AI 에이전트 작동 원리">
      {LOOP_STEPS.map((s, i) => (
        <div
          key={s.head}
          style={{
            position: "absolute",
            left: cardX(i),
            top: rowY,
            width: cardW,
            height: cardH,
            boxSizing: "border-box",
            background: COLORS.paper2,
            border: `2px solid ${COLORS.line}`,
            borderRadius: 18,
            boxShadow: "0 14px 32px rgba(16,17,19,0.08)",
            padding: "32px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: COLORS.accent,
              color: "#ffffff",
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(18, 115, 196, 0.35)",
            }}
          >
            {i + 1}
          </div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 40, color: COLORS.ink }}>{s.head}</div>
          <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 25, lineHeight: 1.42, color: COLORS.ink2, wordBreak: "keep-all" }}>{s.body}</div>
        </div>
      ))}

      {[0, 1, 2].map((i) => {
        const { x0, x1, y } = arrowGap(i);
        const w = x1 - x0;
        return (
          <svg key={i} style={{ position: "absolute", left: x0, top: y - 20, width: w, height: 40 }} viewBox={`0 0 ${w} 40`}>
            <path d={`M0 20 H${w - 22}`} fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" />
            <path d={`M${w - 28} 8 L${w - 4} 20 L${w - 28} 32`} fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      })}

      {/* 루프 화살표: "확인"(4) 카드 아래에서 내려와 "작성"(2) 카드 아래로 되돌아간다 — 결과를 보고 다시 고치는 반복. */}
      <svg style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, pointerEvents: "none" }}>
        <path
          d={`M${loopStartX} ${rowY + cardH} V${loopBottomY} H${loopEndX} V${rowY + cardH - 24}`}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 14"
        />
        <path d={`M${loopEndX - 14} ${rowY + cardH - 34} L${loopEndX} ${rowY + cardH - 6} L${loopEndX + 14} ${rowY + cardH - 34}`} fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        <text x={(loopStartX + loopEndX) / 2} y={loopBottomY - 14} textAnchor="middle" fontFamily={FONTS.display} fontWeight={700} fontSize={26} fill={COLORS.accentDeep}>
          결과 보고 다시 고침 · 반복
        </text>
      </svg>

      <div
        style={{
          position: "absolute",
          left: colX(0),
          top: bannerY,
          width: colW(12),
          height: bannerH,
          boxSizing: "border-box",
          background: COLORS.accentWash,
          border: `2px solid ${COLORS.accent}`,
          borderRadius: 18,
          padding: "0 44px",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 34, color: COLORS.accentDeep, flex: "0 0 auto", wordBreak: "keep-all" }}>질문이 아니라 지시</div>
        <div style={{ width: 2, alignSelf: "stretch", background: COLORS.accent, opacity: 0.35, flex: "0 0 auto" }} />
        <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 27, lineHeight: 1.5, color: COLORS.ink2, wordBreak: "keep-all" }}>
          챗GPT에게 묻던 습관에서 벗어나, 에이전트에게는 <span style={{ color: COLORS.ink, fontWeight: 700 }}>"~해줘"</span>처럼 할 일을 지시하는 프롬프트를 써야 한다.
        </div>
      </div>
    </SlideFrame>
  );
};

// All 10 slides map 1:1 to the CEO's outline (basic_step02_outline.md, section 4 + item 9).

export const STEP02_BASH: SlideEntry[] = [
  { index: 1, name: "01_bash_툴이란", title: "터미널 명령어 실행 도구", render: () => React.createElement(Slide01) },
  { index: 2, name: "02_bash_실습1_카카오톡", title: "카카오톡 실행", render: () => React.createElement(Slide02) },
  { index: 3, name: "03_bash_실습2_유튜브", title: "유튜브 실행", render: () => React.createElement(Slide03) },
  { index: 4, name: "04_bash_실습3_자기소개서_폴더", title: "자기소개서 만들고 폴더 열기", render: () => React.createElement(Slide04) },
  { index: 5, name: "05_bash_실습4_파일_목록", title: "파일 목록 확인", render: () => React.createElement(Slide05) },
  { index: 6, name: "06_bash_실습5_테트리스", title: "테트리스 실행", render: () => React.createElement(Slide06) },
  { index: 7, name: "07_bash_실습6_슬라임_펫", title: "데스크탑 슬라임 펫 만들기", render: () => React.createElement(Slide07) },
  { index: 8, name: "08_bash_실습7_컴퓨터_사양", title: "컴퓨터 사양·GPU 온도 확인", render: () => React.createElement(Slide08) },
  { index: 9, name: "09_bash_실습8_웹캠_캡처", title: "웹캠 캡처 확인", render: () => React.createElement(Slide09) },
  { index: 10, name: "10_AI_에이전트_작동원리", title: "AI 에이전트 작동 원리", render: () => React.createElement(Slide10) },
];

export const STEP02_BASH_PART: PartSpec = { id: "bash", eyebrow: EYEBROW, entries: STEP02_BASH };
