// s2-bash — basic 2회차 슬라이드 68~81 (14장). Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step02/*.svg) into this renderer, following the CEO-approved
// step02-bash.tsx / step02-write.tsx layout style (VS Code + ClaudeCodeTerminal left, real result
// window right, annotation card row below). Facts (prompts, commands, file names, results) are taken
// verbatim from assets/basic/step02/bash_*.svg and courses/basic/step02.json — nothing invented.
// This file only reuses shared components (SlideFrame/FocusBadge/AnnotationColumn/VSCodeScreen/
// ClaudeCodeTerminal/InputBar/core tokens+grid) and keeps its own local copies of layout helpers and
// hand-drawn mocks (no shared component edited, per the worker guide).
import React from "react";
import { Img, staticFile } from "remotion";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { InputBar } from "../InputBar";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { AppWindow, type WindowOs } from "../core/AppWindow";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "BASH 툴";
const TOTAL = 14;

const WINDOW_HEADER_H = 34; // AppWindow's own native title bar height assumption (matches step02-write.tsx).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // left gutter reserved inside the terminal so badges sit beside their line.

// ------------------------------------------------------------------------------------------------
// Two-row body layout (same math as step02-bash.tsx — local copy, nothing shared edited):
// top row = VS Code terminal (left, ~40%) + result (right, ~57%); bottom row = horizontal card strip.
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

// Files that exist on disk by the time of the bash practices — the write-tool practice's own results,
// exactly as bash_파일_목록.svg lists them ("자기소개서.txt 강아지.svg 포스터.html 계산기.html
// 테트리스.html practice_files/").
const BASE_FILES = ["자기소개서.txt", "강아지.svg", "포스터.html", "계산기.html", "테트리스.html"];

// BASE_FILES + any bash-section files written so far, the last one marked "new" once one has been added.
function explorerAt(extra: string[]): ExplorerNode[] {
  const all = [...BASE_FILES, ...extra, "practice_files"];
  return all.map((name, i) => ({
    name,
    kind: name === "practice_files" ? "folder" : "file",
    depth: 0,
    state: extra.length > 0 && i === all.length - 2 ? "new" : "normal",
  }));
}

// A right-layout VS Code + Claude Code terminal illo, reusable at any x/y/w/h (local copy of
// step02-bash.tsx's own terminalIllo — nothing shared edited).
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
// Horizontal bottom card row — local copy of step02-bash.tsx's own CardRow.
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
// Result window chrome — local copies of step02-bash.tsx's own window wrappers.
// ------------------------------------------------------------------------------------------------

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

const FramelessResultPanel: React.FC<{ x: number; y: number; width: number; height: number; children: React.ReactNode }> = ({ x, y, width, height, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width, height, borderRadius: 18, overflow: "hidden", border: `1px solid ${COLORS.line}`, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
    {children}
  </div>
);

// A dark terminal-styled text panel (own tab header) — for the "really run" command results (dir / 시스템
// 정보), a short teaching EXAMPLE rather than a live dump.
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
        <div key={i} style={{ fontFamily: FONTS.term, fontSize: 19, lineHeight: 1.55, color: TERM_PANEL.text, whiteSpace: "pre" }}>
          {ln === "" ? " " : ln}
        </div>
      ))}
    </div>
  </div>
);

// ------------------------------------------------------------------------------------------------
// App-launch result mocks — hand-drawn in this deck's own token system, since these apps were
// deliberately never actually launched during the practice run.
// ------------------------------------------------------------------------------------------------

const FileGlyphSmall: React.FC<{ size?: number; tone?: string }> = ({ size = 26, tone = COLORS.accentDeep }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
    <path d="M4 2 H14 L20 8 V21 C20 21.6 19.6 22 19 22 H4 C3.4 22 3 21.6 3 21 V3 C3 2.4 3.4 2 4 2 Z" fill="none" stroke={tone} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M14 2 V8 H20" fill="none" stroke={tone} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

// 카카오톡 — the first login window a student actually sees when KakaoTalk launches.
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

// 유튜브 — the page inside the Chrome window (ChromeBrowserWindow draws the tab/address bar).
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

// 바탕화면 폴더 열기 — a simplified desktop/explorer mock highlighting the new file.
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
        <span style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.ink3 }}>방금 저장됨</span>
      </div>
    </div>
  </div>
);

// 테트리스.html — beveled-cell board, opened as a real web page in the browser (per bash_테트리스_실행.svg
// the file is .html, opened by the "기본 브라우저" — not a native python window).
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

// Sidebar shows only the two fields the shipped SVG actually states (SCORE 000000 / LEVEL 1) — no
// invented "다음 블록"/시작 button text.
const TetrisMock: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const sidebarW = Math.max(140, Math.round(width * 0.22));
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
      <div style={{ width: sidebarW, height: boardH, flex: `0 0 ${sidebarW}px`, background: "#242840", borderRadius: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 10px", gap: 10, boxSizing: "border-box", overflow: "hidden" }}>
        <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: Math.round(sidebarW * 0.16), color: "#ffffff", letterSpacing: "0.04em", lineHeight: 1.1 }}>TETRIS</div>
        <div style={{ width: "72%", height: 1, background: "#3a3f5c", margin: "6px 0" }} />
        <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: Math.round(sidebarW * 0.09), color: "#9aa0c3", lineHeight: 1.1 }}>SCORE</div>
        <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: Math.round(sidebarW * 0.15), color: "#ffe14d", lineHeight: 1.1 }}>000000</div>
        <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: Math.round(sidebarW * 0.09), color: "#9aa0c3", lineHeight: 1.1, marginTop: 8 }}>LEVEL</div>
        <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: Math.round(sidebarW * 0.15), color: "#57e37f", lineHeight: 1.1 }}>1</div>
      </div>
    </div>
  );
};

// 슬라임 펫 — hand-drawn from the shipped SVG's own facts: borderless overlay near the bottom-right
// corner, a drag path showing the pick-up-and-drop gravity interaction, and the right-click menu
// ("슬라임 정보" / "종료") the SVG calls out.
function slimeGeometry(width: number, height: number) {
  const size = Math.min(width, height) * 0.4;
  const left = width - 56 - size;
  const top = height - 90 - size;
  return { size, left, top, cx: left + size * 0.5, cy: top + size * 0.62 };
}

const SlimeDesktopMock: React.FC<{ width: number; height: number; showMenu?: boolean; showDrag?: boolean }> = ({ width, height, showMenu, showDrag }) => {
  const { size: slimeSize, left: slimeLeft, top: slimeTop, cx, cy } = slimeGeometry(width, height);
  return (
    <div style={{ width, height, position: "relative", background: "#dbe6f0", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 24, top: 24, display: "flex", flexDirection: "column", gap: 22 }}>
        {["문서", "사진"].map((label) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 64 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "#ffffff", border: `1px solid ${COLORS.line}` }} />
            <span style={{ fontFamily: FONTS.body, fontSize: 12, color: COLORS.ink2, textShadow: "0 1px 2px rgba(255,255,255,0.7)" }}>{label}</span>
          </div>
        ))}
      </div>

      {showDrag ? (
        <svg style={{ position: "absolute", left: 0, top: 0, width, height }}>
          <path d={`M${cx - slimeSize * 0.55} ${cy - slimeSize * 0.9} Q${cx - slimeSize * 0.3} ${cy - slimeSize * 0.5} ${cx} ${cy}`} fill="none" stroke={COLORS.accent} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
          <circle cx={cx - slimeSize * 0.55} cy={cy - slimeSize * 0.9} r={9} fill="#ffffff" stroke={COLORS.accent} strokeWidth={3} />
        </svg>
      ) : null}

      <svg width={slimeSize} height={slimeSize} viewBox="0 0 160 160" style={{ position: "absolute", left: slimeLeft, top: slimeTop }}>
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

      {showMenu ? (
        <div style={{ position: "absolute", left: slimeLeft - 176, top: slimeTop + slimeSize * 0.3, width: 168, borderRadius: 10, background: "#ffffff", border: `1px solid ${COLORS.line}`, boxShadow: "0 10px 24px rgba(16,17,19,0.16)", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", fontFamily: FONTS.body, fontSize: 15, color: COLORS.ink2, borderBottom: `1px solid ${COLORS.line}` }}>슬라임 정보</div>
          <div style={{ padding: "12px 16px", fontFamily: FONTS.body, fontWeight: 700, fontSize: 15, color: COLORS.accentDeep, background: COLORS.accentWash }}>종료</div>
        </div>
      ) : null}

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 46, background: "#1f1f1f", display: "flex", alignItems: "center", padding: "0 20px", gap: 14 }}>
        <div style={{ width: 80, height: 22, borderRadius: 5, background: "#2c3033" }} />
        <div style={{ marginLeft: "auto", fontFamily: FONTS.term, fontSize: 14, color: "#cfd2d4" }}>오후 3:41</div>
      </div>
    </div>
  );
};

// 웹캠 캡처 — the photo viewer shows the captured shot (staticFile, per the module's existing asset).
const PhotoPlaceholderMock: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div style={{ width, height, background: "#1a1c20", display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
    <Img src={staticFile("slides/bash/webcam_shot.png")} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 6 }} />
  </div>
);

// Small icon glyphs for the category grid on slide 01 (tokens only).
const IconFolder: React.FC<{ size?: number; tone?: string }> = ({ size = 30, tone = COLORS.accentDeep }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M3 6c0-.6.4-1 1-1h5l2 2h9c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V6z" fill="none" stroke={tone} strokeWidth={1.7} strokeLinejoin="round" />
  </svg>
);
const IconPlay: React.FC<{ size?: number; tone?: string }> = ({ size = 30, tone = COLORS.accentDeep }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="none" stroke={tone} strokeWidth={1.7} />
    <path d="M10 8l6 4-6 4V8z" fill={tone} />
  </svg>
);
const IconDownload: React.FC<{ size?: number; tone?: string }> = ({ size = 30, tone = COLORS.accentDeep }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 3v11" stroke={tone} strokeWidth={1.7} strokeLinecap="round" />
    <path d="M7 10l5 5 5-5" fill="none" stroke={tone} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 20h16" stroke={tone} strokeWidth={1.7} strokeLinecap="round" />
  </svg>
);
const IconGauge: React.FC<{ size?: number; tone?: string }> = ({ size = 30, tone = COLORS.accentDeep }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M4 18a8 8 0 1116 0" fill="none" stroke={tone} strokeWidth={1.7} strokeLinecap="round" />
    <path d="M12 18l4-6" stroke={tone} strokeWidth={1.7} strokeLinecap="round" />
    <circle cx="12" cy="18" r="1.4" fill={tone} />
  </svg>
);

// ------------------------------------------------------------------------------------------------
// 01 · bash 툴이란 — 개념 슬라이드 (facts: bash_툴_이란.svg + step02.json goal/topics).
// ------------------------------------------------------------------------------------------------

const CATEGORY_CARDS: Array<{ code: string; title: string; desc: string; icon: React.FC<{ size?: number; tone?: string }> }> = [
  { code: "FILE", title: "파일·폴더", desc: "폴더 생성, 파일 복사·이름 변경", icon: IconFolder },
  { code: "RUN", title: "프로그램 실행", desc: "설치된 프로그램 실행", icon: IconPlay },
  { code: "INSTALL", title: "프로그램 설치", desc: "설치 후 바로 실행", icon: IconDownload },
  { code: "CHECK", title: "시스템 조회", desc: "사양·상태 확인", icon: IconGauge },
];

const Slide01: React.FC = () => {
  const leftX = colX(0);
  const leftW = colW(5);
  const illoX = colX(5);
  const illoY = BODY_Y;
  const illoW = colW(7);
  const illoH = BODY_BOTTOM - BODY_Y;
  const gap = 28;
  const cellW = (illoW - gap) / 2;
  const cellH = (illoH - gap) / 2;

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="터미널 명령어 실행 도구">
      <AnnotationColumn
        x={leftX}
        y={illoY}
        width={leftW}
        height={illoH}
        items={[
          { number: 1, head: "터미널 명령어를 Claude가 대신 씀", body: "1회차에 손으로 치던 터미널 명령어를, 이제 Claude가 대신 칩니다." },
          { number: 2, head: "1회차와 다른 점", body: "그때는 검은 화면에 직접 명령어를 쳤지만, 이제는 말로 시키면 Claude가 대신 칩니다." },
        ]}
      />
      {CATEGORY_CARDS.map((c, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const Icon = c.icon;
        return (
          <div
            key={c.code}
            style={{
              position: "absolute",
              left: illoX + col * (cellW + gap),
              top: illoY + row * (cellH + gap),
              width: cellW,
              height: cellH,
              boxSizing: "border-box",
              background: COLORS.paper2,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 18,
              boxShadow: "0 14px 32px rgba(16,17,19,0.08)",
              padding: "30px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: COLORS.accentWash, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                <Icon size={28} />
              </div>
              <span style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 20, color: COLORS.accentDeep, letterSpacing: "0.04em" }}>{c.code}</span>
            </div>
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 30, color: COLORS.ink, wordBreak: "keep-all" }}>{c.title}</div>
            <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 21, lineHeight: 1.4, color: COLORS.ink2, wordBreak: "keep-all" }}>{c.desc}</div>
          </div>
        );
      })}
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · bash가 왜 핵심인가 — Read/Write/Edit는 파일 안, Bash는 컴퓨터 자체 (facts: bash_왜_핵심인가.svg).
// ------------------------------------------------------------------------------------------------

const FILE_TOOLS: Array<{ code: string; head: string; body: string }> = [
  { code: "R", head: "Read — 읽기", body: "파일을 열어 읽습니다" },
  { code: "W", head: "Write — 만들기", body: "새 파일을 만듭니다" },
  { code: "E", head: "Edit — 고치기", body: "파일 내용을 고칩니다" },
];

const Slide02: React.FC = () => {
  const leftX = colX(0);
  const leftW = colW(5);
  const rightX = colX(6);
  const rightW = colW(6);
  const topH = 560;
  const bannerY = BODY_Y + topH + 28;
  const bannerH = BODY_BOTTOM - bannerY;
  const labelH = 56;

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="컴퓨터 자체를 다루는 툴">
      <div style={{ position: "absolute", left: leftX, top: BODY_Y, width: leftW, fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.ink2 }}>파일 안에서 하는 일</div>
      <AnnotationColumn x={leftX} y={BODY_Y + labelH} width={leftW} height={topH - labelH} items={FILE_TOOLS.map((t) => ({ number: t.code, head: t.head, body: t.body }))} />

      <div style={{ position: "absolute", left: rightX, top: BODY_Y, width: rightW, fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.accentDeep }}>그리고 · 컴퓨터 자체에서 하는 일</div>
      <div
        style={{
          position: "absolute",
          left: rightX,
          top: BODY_Y + labelH,
          width: rightW,
          height: topH - labelH,
          boxSizing: "border-box",
          background: COLORS.accentWash,
          border: `2px solid ${COLORS.accent}`,
          borderRadius: 18,
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
            <span style={{ fontFamily: FONTS.term, fontWeight: 800, fontSize: 24, color: "#ffffff" }}>{"$"}</span>
          </div>
          <span style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 40, color: COLORS.accentDeep }}>Bash</span>
        </div>
        <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 25, lineHeight: 1.5, color: COLORS.ink, wordBreak: "keep-all" }}>
          파일 안이 아니라, 컴퓨터 자체를 다룹니다. 프로그램을 설치하고, 실행하고, 시스템 상태를 확인합니다.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: colX(0),
          top: bannerY,
          width: colW(12),
          height: bannerH,
          boxSizing: "border-box",
          background: COLORS.paper2,
          border: `2px solid ${COLORS.line}`,
          borderRadius: 18,
          padding: "0 44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 30, color: COLORS.ink, textAlign: "center", wordBreak: "keep-all" }}>
          그래서 에이전트가 <span style={{ color: COLORS.accentDeep, fontWeight: 800 }}>'대화하는 AI'</span>에서 <span style={{ color: COLORS.accentDeep, fontWeight: 800 }}>'일하는 AI'</span>가 됩니다
        </div>
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · 카카오톡 실행 (facts: bash_카카오톡.svg / step02.json practice+action).
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "컴퓨터에 설치된 PC 카카오톡 찾아서 실행해줘" },
    { role: "assistant", text: "Bash(설치된 프로그램 목록에서 카카오톡 검색 → KakaoTalk.exe 실행)" },
    { role: "assistant", text: "카카오톡을 찾아서 실행했어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt([]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="카카오톡 실행">
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
          { number: 1, head: "설치된 프로그램 실행", body: "\"컴퓨터에 설치된 PC 카카오톡 찾아서 실행해줘\"라고 지시한다." },
          { number: 2, head: "찾아서 켜는 두 단계", body: "설치된 프로그램 목록에서 찾은 뒤 바로 실행 명령을 입력한다." },
          { number: "!", head: "기존 프로그램 실행", body: "새로 만든 게 아니라, 컴퓨터에 이미 깔려 있던 프로그램을 찾아서 켰다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · 브라우저 열기 — 유튜브 실행 (facts: bash_유튜브.svg / step02.json).
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "크롬으로 유튜브 실행해줘" },
    { role: "assistant", text: "Bash(크롬 실행 → https://www.youtube.com 접속)" },
    { role: "assistant", text: "크롬으로 유튜브를 열었어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt([]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="브라우저로 사이트 열기">
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
          { number: 1, head: "크롬으로 유튜브 실행 요청", body: "설치된 크롬을 실행해서 유튜브까지 띄우게 시킨다." },
          { number: 2, head: "실행 + 접속을 한 번에", body: "프로그램 실행 명령과 웹사이트 접속 명령이 이어서 실행된다." },
          { number: "!", head: "두 단계 완료", body: "크롬 창이 뜨고 유튜브 화면이 그대로 보인다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · 만들고, 그 폴더까지 열어주기 — 자기소개서 (facts: bash_메모장_자기소개서.svg / step02.json).
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "바탕화면에 메모장으로 자기소개서를 만들고 저장된 폴더를 열어줘" },
    { role: "assistant", text: "Bash(메모장으로 자기소개서.txt 작성 → 바탕화면 폴더 열기)" },
    { role: "assistant", text: "자기소개서를 쓰고, 저장된 바탕화면 폴더를 열었어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt([]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="만들고 폴더까지 열어주기">
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
          { number: 1, head: "작성 + 폴더 열기를 한 번에 요청", body: "메모장으로 자기소개서 만들고 폴더까지 열어달라고 지시한다." },
          { number: 2, head: "두 가지 일이 한 번에", body: "자기소개서.txt 작성과 바탕화면 폴더 열기가 순서대로 처리된다." },
          { number: "!", head: "여러 단계도 순서대로 다 처리", body: "요청 하나에 여러 단계가 들어 있어도 Claude는 순서대로 다 처리한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · 지금 폴더에 뭐가 있지 — 파일 목록 (facts: bash_파일_목록.svg / step02.json).
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "현재 폴더의 파일 목록을 설명해줘" },
    { role: "assistant", text: "Bash(dir)" },
    { role: "assistant", text: "6개 항목을 찾았어요. 지금까지 만든 게 다 있고, practice_files 폴더도 그대로 있어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt([]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  const dirLines = ["C:\\agent1 디렉터리", "", "자기소개서.txt", "강아지.svg", "포스터.html", "계산기.html", "테트리스.html", "practice_files  <DIR>"];

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="파일 목록 확인">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <TerminalTextPanel x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} tabLabel="dir 결과" lines={dirLines} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "폴더 안을 조회하고 설명 요청", body: "\"현재 폴더의 파일 목록을 설명해줘\"라고 지시한다." },
          { number: 2, head: "Bash로 실제 목록을 조회", body: "폴더 안 파일·폴더 목록을 조회하는 명령을 직접 실행한다." },
          { number: "!", head: "목록을 사람 말로 풀어서 설명", body: "목록만 던지지 않고, 무엇인지 하나씩 풀어서 설명해준다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · 만든 걸 찾아서 실행 — 테트리스.html (facts: bash_테트리스_실행.svg / step02.json).
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "현재 폴더에 테트리스 파일 찾아서 실행해줘" },
    { role: "assistant", text: "Bash(dir *테트리스*)" },
    { role: "assistant", text: "테트리스.html을 찾아서 기본 브라우저로 열었어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt([]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="만든 파일 찾아서 실행">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <ChromeBrowserWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} tabLabel="테트리스" url="C:\agent1\테트리스.html">
        <TetrisMock width={RESULT_COL_W} height={TOP_H - 86} />
      </ChromeBrowserWindow>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "테트리스 파일 찾기·실행 요청", body: "찾는 것과 실행하는 것을 한 줄로 함께 지시한다." },
          { number: 2, head: "찾기 → 실행, 한 번에", body: "dir로 파일을 찾고, 찾은 파일을 바로 실행한다." },
          { number: "!", head: "브라우저에서 실행 확인", body: "write 실습에서 만든 테트리스.html이 기본 브라우저로 그대로 실행된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · 바탕화면 위젯 만들기 — 슬라임 요청 (facts: bash_슬라임_요청.svg / step02.json).
// ------------------------------------------------------------------------------------------------

const SLIME_REQUEST_PROMPT =
  "svg로 귀여운 슬라임 같은 캐릭터를 간단하게 디자인해서, 바탕화면에 떠서 마우스로 들었다 놓을 수 있는(중력 적용) 프로그램을 파이썬으로 만들어서 실행해줄래? 슬라임 우클릭 또는 트레이 아이콘에 \"종료\" 메뉴를 넣어줘";

const SLIME_REQUEST_PARTS: CardItem[] = [
  { number: 1, head: "캐릭터 디자인", body: "SVG로 그린 귀여운 슬라임 모양" },
  { number: 2, head: "바탕화면에 표시", body: "다른 창 위에 항상 떠 있음" },
  { number: 3, head: "마우스로 집기", body: "클릭한 채 끌 수 있음" },
  { number: 4, head: "중력 적용", body: "놓으면 아래로 툭 떨어짐" },
  { number: 5, head: "종료 메뉴", body: "우클릭 또는 트레이에서 종료" },
];

const Slide08: React.FC = () => {
  const inputY = BODY_Y;
  const inputH = 168;
  const inputVisualBottom = inputY + 42 + inputH;
  const cardsY = inputVisualBottom + 26;
  const cardsH = 300;
  const bannerY = cardsY + cardsH + 26;
  const bannerH = BODY_BOTTOM - bannerY;

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="바탕화면 위젯 만들기">
      <InputBar x={colX(0)} y={inputY} width={colW(12)} height={inputH} text={SLIME_REQUEST_PROMPT} label="학생이 입력하는 프롬프트 (조금 깁니다)" />
      <div style={{ position: "absolute", left: colX(0), top: cardsY - 40, fontFamily: FONTS.display, fontWeight: 700, fontSize: 24, color: COLORS.ink2 }}>이 한 줄에 담긴 요소 다섯 가지</div>
      <CardRow x={colX(0)} y={cardsY} width={colW(12)} height={cardsH} items={SLIME_REQUEST_PARTS} />
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
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 28, color: COLORS.ink, textAlign: "center", wordBreak: "keep-all" }}>
          요청 하나가 <span style={{ color: COLORS.accentDeep, fontWeight: 800 }}>디자인·코딩·실행까지 전부</span>를 담고 있습니다
        </div>
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 09 · 바탕화면에 살아있습니다 — 슬라임 결과 (facts: bash_슬라임_결과.svg).
// ------------------------------------------------------------------------------------------------

const Slide09: React.FC = () => {
  const leftX = colX(0);
  const leftW = colW(4);
  const rightX = colX(4);
  const rightW = 1800 - rightX;
  const illoH = BODY_BOTTOM - BODY_Y;
  const { cx, cy } = slimeGeometry(rightW, illoH);
  const slimeAbsX = rightX + cx;
  const slimeAbsY = BODY_Y + cy;
  const dragAbsX = rightX + cx - 0.55 * Math.min(rightW, illoH) * 0.4;
  const dragAbsY = BODY_Y + cy - 0.9 * Math.min(rightW, illoH) * 0.4;
  const menuAbsX = slimeAbsX - 90;
  const menuAbsY = slimeAbsY + 20;

  return (
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="바탕화면 위젯 동작 확인">
      <AnnotationColumn
        x={leftX}
        y={BODY_Y}
        width={leftW}
        height={illoH}
        items={[
          { number: 1, head: "클릭한 채 끌어 올리면", body: "슬라임이 손을 따라옵니다." },
          { number: 2, head: "놓으면 중력으로 툭!", body: "붙잡았던 손을 놓으면 아래로 떨어집니다." },
          { number: 3, head: "우클릭 메뉴에서도 종료", body: "슬라임을 우클릭하면 메뉴에서 바로 종료됩니다." },
        ]}
      />
      <FramelessResultPanel x={rightX} y={BODY_Y} width={rightW} height={illoH}>
        <SlimeDesktopMock width={rightW} height={illoH} showDrag showMenu />
      </FramelessResultPanel>
      <FocusBadge number={1} x={dragAbsX} y={dragAbsY} size={36} />
      <FocusBadge number={2} x={slimeAbsX} y={slimeAbsY} size={36} />
      <FocusBadge number={3} x={menuAbsX} y={menuAbsY} size={36} />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 10 · 내 컴퓨터를 조사시키기 — 시스템 정보 (facts: bash_시스템_정보.svg / step02.json).
// ------------------------------------------------------------------------------------------------

const Slide10: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "현재 컴퓨터 사양과 현재 GPU 온도 등을 조사해서 설명해줘" },
    { role: "assistant", text: "Bash(시스템 정보 조회)" },
    { role: "assistant", text: "CPU·메모리·GPU 정보를 확인했습니다." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt([]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  const specLines = ["CPU         ○○○○○○ (모델명)", "메모리       ○○ GB", "GPU         ○○○○○○", "GPU 온도     ○○ °C", "", "# 실제 사양·온도는 컴퓨터마다 다릅니다"];

  return (
    <SlideFrame index={10} total={TOTAL} eyebrow={EYEBROW} title="컴퓨터 사양·GPU 온도 확인">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <TerminalTextPanel x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} tabLabel="시스템 정보 조회" lines={specLines} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "사양과 GPU 온도 조사 요청", body: "\"컴퓨터 사양과 GPU 온도를 조사해서 설명해줘\"라고 지시한다." },
          { number: 2, head: "시스템 정보 조회 명령을 실행", body: "CPU·메모리·GPU 정보를 확인하는 명령을 직접 실행한다." },
          { number: "!", head: "컴퓨터마다 다른 결과", body: "실제 사양·온도는 컴퓨터마다 다르며, 화면의 값은 예시 형태다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 11 · 카메라로 지금을 봅니다 — 웹캠 (facts: bash_웹캠.svg / step02.json). Uses the module's real
// webcam capture asset via staticFile, per this part's standing instruction.
// ------------------------------------------------------------------------------------------------

const Slide11: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "현재 컴퓨터에 연결된 웹캠 인식해볼래? 그걸로 지금 뭐가 보이는지 캡처해서 설명해봐" },
    { role: "assistant", text: "Bash(웹캠 인식 → 사진 촬영 → capture.jpg 저장)" },
    { role: "assistant", text: "Read(capture.jpg)로 지금 보이는 걸 확인했어요." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerAt(["capture.jpg"]), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={11} total={TOTAL} eyebrow={EYEBROW} title="웹캠으로 촬영 후 설명">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="사진 뷰어 · capture.jpg">
        <PhotoPlaceholderMock width={RESULT_COL_W} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "웹캠 인식 + 캡처 + 설명 요청", body: "웹캠을 인식해서 캡처하고 설명해달라고 지시한다." },
          { number: 2, head: "Bash로 찍고, Read로 봄", body: "Bash로 사진을 찍어 저장하고, Read로 그 사진을 연다." },
          { number: "!", head: "한 가지 일에 두 개의 툴", body: "찍는 것과 보는 것을 위해 두 개의 툴이 이어졌다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 12 · 툴은 혼자 쓰이지 않습니다 — 네 가지 툴의 조합 (facts: bash_툴_조합.svg).
// ------------------------------------------------------------------------------------------------

const FOUR_TOOLS: Array<{ code: string; head: string; body: string }> = [
  { code: "READ", head: "Read — 읽기", body: "파일 안의 내용을 직접 열어봅니다" },
  { code: "WRITE", head: "Write — 만들기", body: "새 파일을 만들어냅니다" },
  { code: "EDIT", head: "Edit — 고치기", body: "기존 파일 내용을 바꿔 넣습니다" },
  { code: "BASH", head: "Bash — 실행하기", body: "컴퓨터에서 명령을 실행합니다" },
];

const FLOW_STEPS = ["먼저 읽고", "새로 만들고", "고치고", "실행"];

const Slide12: React.FC = () => {
  const topY = BODY_Y;
  const topH = 340;
  const gap = 26;
  const cardW = (colW(12) - gap * 3) / 4;
  const flowY = topY + topH + 30;
  const flowH = BODY_BOTTOM - flowY;
  const badgeSize = 76;
  const flowIconY = flowY + 20;
  const flowLabelY = flowIconY + badgeSize + 16;

  return (
    <SlideFrame index={12} total={TOTAL} eyebrow={EYEBROW} title="네 가지 툴의 조합">
      {FOUR_TOOLS.map((t, i) => (
        <div
          key={t.code}
          style={{
            position: "absolute",
            left: colX(0) + i * (cardW + gap),
            top: topY,
            width: cardW,
            height: topH,
            boxSizing: "border-box",
            background: COLORS.paper2,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 18,
            boxShadow: "0 14px 32px rgba(16,17,19,0.08)",
            padding: "28px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <span style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 17, color: COLORS.accentDeep, letterSpacing: "0.06em" }}>{t.code}</span>
          <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.ink, wordBreak: "keep-all" }}>{t.head}</span>
          <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 20, lineHeight: 1.4, color: COLORS.ink2, wordBreak: "keep-all" }}>{t.body}</span>
        </div>
      ))}

      <div style={{ position: "absolute", left: colX(0), top: flowY, width: colW(12), height: flowH, boxSizing: "border-box", background: COLORS.accentWash, border: `2px solid ${COLORS.accent}`, borderRadius: 18 }}>
        <div style={{ position: "absolute", left: 40, top: 18, fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.accentDeep }}>
          예 — 한 번의 작업이 네 툴을 모두 거칠 수도 있습니다
        </div>
        {FLOW_STEPS.map((label, i) => {
          const cx = colW(12) / (FLOW_STEPS.length * 2) + i * (colW(12) / FLOW_STEPS.length);
          return (
            <React.Fragment key={label}>
              <div
                style={{
                  position: "absolute",
                  left: cx - badgeSize / 2,
                  top: flowIconY - topY,
                  width: badgeSize,
                  height: badgeSize,
                  borderRadius: "50%",
                  background: COLORS.accent,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONTS.display,
                  fontWeight: 800,
                  fontSize: 26,
                  boxShadow: "0 6px 16px rgba(18, 115, 196, 0.35)",
                }}
              >
                {i + 1}
              </div>
              <div style={{ position: "absolute", left: cx - 90, top: flowLabelY - topY, width: 180, textAlign: "center", fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.ink }}>{label}</div>
              {i < FLOW_STEPS.length - 1 ? (
                <svg style={{ position: "absolute", left: cx + badgeSize / 2 + 10, top: flowIconY - topY + badgeSize / 2 - 12, width: colW(12) / FLOW_STEPS.length - badgeSize - 20, height: 24 }} viewBox={`0 0 ${colW(12) / FLOW_STEPS.length - badgeSize - 20} 24`}>
                  <path d={`M0 12 H${colW(12) / FLOW_STEPS.length - badgeSize - 34}`} fill="none" stroke={COLORS.accent} strokeWidth={4} strokeLinecap="round" />
                  <path d={`M${colW(12) / FLOW_STEPS.length - badgeSize - 38} 4 L${colW(12) / FLOW_STEPS.length - badgeSize - 22} 12 L${colW(12) / FLOW_STEPS.length - badgeSize - 38} 20`} fill="none" stroke={COLORS.accent} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </React.Fragment>
          );
        })}
        <div style={{ position: "absolute", left: 40, right: 40, bottom: 18, fontFamily: FONTS.body, fontWeight: 500, fontSize: 21, color: COLORS.ink2, wordBreak: "keep-all" }}>
          오늘 배운 네 가지 — 상황에 맞게 알아서 골라 이어 씁니다
        </div>
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 13 · AI가 쓰는 명령어들 — 주요 명령어 (facts: bash_주요_명령어.svg).
// ------------------------------------------------------------------------------------------------

const COMMAND_ROWS: Array<{ label: string; value: string }> = [
  { label: "목록 보기", value: "ls / dir" },
  { label: "폴더 이동", value: "cd" },
  { label: "폴더 만들기", value: "mkdir" },
  { label: "파일 복사", value: "copy / cp" },
  { label: "이름 바꾸기 · 이동", value: "move / mv" },
  { label: "실행하기", value: "start / open, python" },
];

const Slide13: React.FC = () => {
  const cardY = BODY_Y;
  const cardH = 580;
  const bannerY = cardY + cardH + 24;
  const bannerH = BODY_BOTTOM - bannerY;

  return (
    <SlideFrame index={13} total={TOTAL} eyebrow={EYEBROW} title="AI가 쓰는 대표 명령어">
      <div
        style={{
          position: "absolute",
          left: colX(0),
          top: cardY,
          width: colW(12),
          height: cardH,
          boxSizing: "border-box",
          background: COLORS.paper2,
          border: `2px solid ${COLORS.line}`,
          borderRadius: 18,
          boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
          padding: "40px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {COMMAND_ROWS.map((r) => (
          <div key={r.label} style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: COLORS.accent, flex: "0 0 auto", transform: "translateY(-4px)" }} />
            <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 30, color: COLORS.ink, flex: "0 0 260px", wordBreak: "keep-all" }}>{r.label}</span>
            <span style={{ fontFamily: FONTS.term, fontWeight: 500, fontSize: 26, color: COLORS.accentDeep }}>{r.value}</span>
          </div>
        ))}
      </div>
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
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 26, color: COLORS.ink, textAlign: "center", wordBreak: "keep-all" }}>
          외울 필요는 없습니다 — 알아두면 Claude가 뭘 하는지 읽힙니다
        </div>
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 14 · Bash 툴 정리 (facts: bash_정리.svg / step02.json practice+action "/clear").
// ------------------------------------------------------------------------------------------------

const SUMMARY_ITEMS: Array<{ head: string; body: string }> = [
  { head: "명령 실행", body: "터미널 명령어를 AI가 대신 씁니다" },
  { head: "컴퓨터 전체", body: "파일 안이 아니라 컴퓨터 자체를 다룹니다" },
  { head: "설치·실행·조회", body: "새 프로그램 설치부터 시스템 조회까지" },
  { head: "툴 연결", body: "다른 툴과 이어져 하나의 일을 해냅니다" },
];

const CheckIcon: React.FC = () => (
  <svg width={30} height={30} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="none" stroke={COLORS.accent} strokeWidth={1.8} />
    <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke={COLORS.accent} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Slide14: React.FC = () => {
  const gridY = BODY_Y;
  const gridH = 420;
  const gap = 26;
  const cellW = (colW(12) - gap) / 2;
  const cellH = (gridH - gap) / 2;
  const inputY = gridY + gridH + 26;
  const inputH = 74;
  const inputVisualBottom = inputY + 42 + inputH;
  const bannerY = inputVisualBottom + 26;
  const bannerH = BODY_BOTTOM - bannerY;

  return (
    <SlideFrame index={14} total={TOTAL} eyebrow={EYEBROW} title="Bash 툴 정리">
      {SUMMARY_ITEMS.map((it, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        return (
          <div
            key={it.head}
            style={{
              position: "absolute",
              left: colX(0) + col * (cellW + gap),
              top: gridY + row * (cellH + gap),
              width: cellW,
              height: cellH,
              boxSizing: "border-box",
              background: COLORS.paper2,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 18,
              padding: "26px 32px",
              display: "flex",
              alignItems: "center",
              gap: 22,
            }}
          >
            <CheckIcon />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 28, color: COLORS.ink, wordBreak: "keep-all" }}>{it.head}</span>
              <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 21, lineHeight: 1.4, color: COLORS.ink2, wordBreak: "keep-all" }}>{it.body}</span>
            </div>
          </div>
        );
      })}
      <InputBar x={colX(0)} y={inputY} width={colW(6)} height={inputH} text="/clear" label="오늘 실습을 마쳤다면" />
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
        }}
      >
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 28, color: COLORS.ink, wordBreak: "keep-all" }}>
          <span style={{ color: COLORS.accentDeep, fontWeight: 800 }}>컴퓨터를 직접 다루는 힘</span> — 오늘 배운 것 중 가장 강력한 툴입니다
        </div>
      </div>
    </SlideFrame>
  );
};

export const S2_BASH: SlideEntry[] = [
  { index: 1, name: "bash_툴_이란", title: "터미널 명령어 실행 도구", render: () => React.createElement(Slide01) },
  { index: 2, name: "bash_왜_핵심인가", title: "컴퓨터 자체를 다루는 툴", render: () => React.createElement(Slide02) },
  { index: 3, name: "bash_카카오톡", title: "카카오톡 실행", render: () => React.createElement(Slide03) },
  { index: 4, name: "bash_유튜브", title: "브라우저로 사이트 열기", render: () => React.createElement(Slide04) },
  { index: 5, name: "bash_메모장_자기소개서", title: "만들고 폴더까지 열어주기", render: () => React.createElement(Slide05) },
  { index: 6, name: "bash_파일_목록", title: "파일 목록 확인", render: () => React.createElement(Slide06) },
  { index: 7, name: "bash_테트리스_실행", title: "만든 파일 찾아서 실행", render: () => React.createElement(Slide07) },
  { index: 8, name: "bash_슬라임_요청", title: "바탕화면 위젯 만들기", render: () => React.createElement(Slide08) },
  { index: 9, name: "bash_슬라임_결과", title: "바탕화면 위젯 동작 확인", render: () => React.createElement(Slide09) },
  { index: 10, name: "bash_시스템_정보", title: "컴퓨터 사양·GPU 온도 확인", render: () => React.createElement(Slide10) },
  { index: 11, name: "bash_웹캠", title: "웹캠으로 촬영 후 설명", render: () => React.createElement(Slide11) },
  { index: 12, name: "bash_툴_조합", title: "네 가지 툴의 조합", render: () => React.createElement(Slide12) },
  { index: 13, name: "bash_주요_명령어", title: "AI가 쓰는 대표 명령어", render: () => React.createElement(Slide13) },
  { index: 14, name: "bash_정리", title: "Bash 툴 정리", render: () => React.createElement(Slide14) },
];

export const S2_BASH_PART: PartSpec = { id: "s2-bash", eyebrow: EYEBROW, entries: S2_BASH };
