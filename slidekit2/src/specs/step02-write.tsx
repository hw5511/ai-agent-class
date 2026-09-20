// step02 "WRITE · EDIT 툴" — 9-slide mockup spec, mapped 1:1 to the CEO's lesson outline
// (ai-agent-class/_drafts/basic_step02_outline.md, section "3. write 툴 실습"). The outline has no
// "write 툴이란" definition item (unlike read/bash), so this deck starts straight at 실습 1. Every slide
// where Claude is launched or answers reuses ../ClaudeCodeTerminal (tool-call lines like "● Write(...)" /
// "● Update(...)" inside consecutive assistant turns, matching a real Claude Code session).
//
// CEO feedback (2026-09-18): show what a real Claude Code run actually produced, not a hand-guessed mock
// -- so a real Sonnet session ran every practice prompt in write_practice/agent1 and its outputs (files +
// Chrome screenshots) are the source of truth here. Layout also flipped per the CEO's ask: top row =
// terminal (left, ~half width) + the RESULT full-size (right, as large as the space allows, framed like a
// real window: Chrome for html/svg, a native Windows app titlebar for tkinter, a VS Code markdown preview
// for .md); bottom row = the annotation cards laid out horizontally instead of a right-side column.
// Real screenshots (self_intro.png / dog.png / poster.png / poster_green.png, copied from
// write_practice/shots/) live in public/slides/write/ and are loaded with staticFile+Img. The tkinter
// mocks (calculator, tetris, tetris-edit) are still hand-drawn SVG/React, now built faithfully from the
// real calculator_layout.json / tetris_layout.json / tetris_v1_layout.json (real window title, real grid,
// real colors, real button labels/order, real board size) instead of a generic placeholder. No shared
// component was touched to build any of this -- everything new lives entirely in this file.
import React from "react";
import { staticFile, Img } from "remotion";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { AppWindow, type WindowOs } from "../core/AppWindow";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "WRITE · EDIT 툴";
const TOTAL = 9;

const WINDOW_HEADER_H = 34; // AppWindow native windowHeader (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // reserved inside the terminal's own left padding so badges sit on the line, not floating in the editor column.
const TERM_WINDOW_H = 620; // full-height terminal slides (01 has no result split; 09 stays full-height).

// ------------------------------------------------------------------------------------------------
// New two-row body layout (CEO 2026-09-18): top row = terminal (left) + result (right, as large as
// possible); bottom row = annotation cards laid out horizontally. Local to this part only.
// ------------------------------------------------------------------------------------------------
const ROW_GAP = 28;
const TOP_H = 512; // terminal + result row height
const CARDS_Y = BODY_Y + TOP_H + ROW_GAP; // 790
const CARDS_H = BODY_BOTTOM - CARDS_Y; // 210

const TERM_COL_X = colX(0);
const TERM_COL_W = colW(5); // "roughly half" width for the VS Code window
const RESULT_COL_X = colX(5); // starts right after the terminal column's own gutter
const RESULT_COL_W = 1800 - RESULT_COL_X; // fills the rest of the content area -- as large as the space allows
const SPLIT_WINDOW_H = 480; // native window height feeding the top-half Camera zoom.

// ------------------------------------------------------------------------------------------------
// Shared helpers (local copies of step02-claudemd's own windowGeometry/rightTermWidth math — this
// part owns its own copy per the worker guide, nothing shared is edited).
// ------------------------------------------------------------------------------------------------

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

// Real files the practice session actually created, in creation order (write_practice/agent1).
const ALL_FILES = ["self_introduction.md", "dog_on_bike.svg", "poster.html", "calculator.py", "tetris.py"];

// Cumulative file list up to (and including) the nth file created so far, last one marked "new".
function explorerUpTo(n: number): ExplorerNode[] {
  return ALL_FILES.slice(0, n).map((name, i) => ({ name, kind: "file", depth: 0, state: i === n - 1 ? "new" : "normal" }));
}

// A right-layout VS Code + Claude Code terminal illo, reusable at any x/y/w/h. Returns the element plus
// a badge-spot getter so each slide can pin a FocusBadge on the exact turn line it calls out.
function terminalIllo(opts: {
  x: number;
  y: number;
  w: number;
  h: number;
  windowH: number;
  explorerNodes: ExplorerNode[];
  turns?: ClaudeCodeTurn[];
  inputText?: string;
}) {
  const { x, y, w, h, windowH, explorerNodes, turns, inputText } = opts;
  const { windowNative, focus, view } = windowGeometry(w, h, windowH);
  const termW = rightTermWidth(windowNative);
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: turns ?? [], inputText, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });
  const toFrame = (p: { x: number; y: number }) => ({ x: x + view.tx + p.x * view.s, y: y + view.ty + p.y * view.s });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const spotForTurn = (i: number) => toFrame({ x: badgeX, y: contentTop + termLayout.turns[i].anchorY + termLayout.lineH / 2 });
  const spotForInput = () => toFrame({ x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 });

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
          terminalContent={<ClaudeCodeTerminal width={termW} turns={turns} inputText={inputText} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
          mainMode="empty"
        />
      </Camera>
    </div>
  );
  return { node, spotForTurn, spotForInput };
}

// ------------------------------------------------------------------------------------------------
// Horizontal bottom card row (CEO 2026-09-18: cards move under the screens, laid out side by side,
// 2-3 per row) -- local re-implementation of AnnotationColumn's card look, just laid out horizontally
// and sized for a shorter, wider strip. Not exported, not shared.
// ------------------------------------------------------------------------------------------------
interface CardItem {
  number: number | string;
  head: string;
  body?: string;
  code?: string; // optional monospace quoted prompt block shown under body
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
          {it.code ? (
            <div
              style={{
                flex: "1 1 0",
                minHeight: 0,
                background: COLORS.paper,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 10,
                padding: "12px 16px",
                fontFamily: FONTS.term,
                fontWeight: 500,
                fontSize: 16,
                lineHeight: 1.45,
                color: COLORS.ink,
                whiteSpace: "pre-wrap",
                overflow: "hidden",
              }}
            >
              {it.code}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

// ------------------------------------------------------------------------------------------------
// Result window chrome — three variants per the CEO's ask: Chrome-style for html/svg, a native Windows
// app titlebar for tkinter programs, and a VS Code-style markdown-preview tab for the .md result.
// ------------------------------------------------------------------------------------------------

const BrowserResultWindow: React.FC<{ x: number; y: number; width: number; height: number; title: string; children: React.ReactNode }> = ({ x, y, width, height, title, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width, height }}>
    <AppWindow width={width} height={height} os="mac" theme="light" title={title} enter="none" float={false}>
      {children}
    </AppWindow>
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

const VSCODE_PREVIEW_DARK = { bg: "#1f1f1f", tabBg: "#181818", border: "#2b2b2b", text: "#cccccc" };

const MarkdownPreviewWindow: React.FC<{ x: number; y: number; width: number; height: number; fileName: string; children: React.ReactNode }> = ({ x, y, width, height, fileName, children }) => (
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
      border: `1px solid ${VSCODE_PREVIEW_DARK.border}`,
      boxShadow: "0 18px 40px rgba(16,17,19,0.12)",
      display: "flex",
      flexDirection: "column",
      background: VSCODE_PREVIEW_DARK.bg,
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
        background: VSCODE_PREVIEW_DARK.tabBg,
        borderBottom: `1px solid ${VSCODE_PREVIEW_DARK.border}`,
        borderTop: `2px solid ${COLORS.accent}`,
      }}
    >
      <span style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 15, color: VSCODE_PREVIEW_DARK.text }}>{`미리보기: ${fileName}`}</span>
    </div>
    <div style={{ flex: "1 1 0", minHeight: 0 }}>{children}</div>
  </div>
);

// Real screenshots (write_practice/shots/*.png, copied verbatim into public/slides/write/).
const SHOT_SELF_INTRO = staticFile("slides/write/self_intro.png");
const SHOT_DOG = staticFile("slides/write/dog.png");
const SHOT_POSTER = staticFile("slides/write/poster.png");
const SHOT_POSTER_GREEN = staticFile("slides/write/poster_green.png");

const ShotFill: React.FC<{ src: string; bg?: string }> = ({ src, bg = "#ffffff" }) => (
  <div style={{ width: "100%", height: "100%", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
  </div>
);

// ------------------------------------------------------------------------------------------------
// tkinter mocks — hand-drawn from the real layout JSONs (calculator_layout.json / tetris_layout.json /
// tetris_v1_layout.json produced by the real practice session), not a generic placeholder.
// ------------------------------------------------------------------------------------------------

// calculator.py: pure default ttk theme, 4x6 grid, row0 = display, real button labels/order.
const CALC_ROWS: string[][] = [
  ["C", "(", ")", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
];
const CALC_LAST_ROW: Array<{ label: string; span: number }> = [
  { label: "0", span: 1 },
  { label: ".", span: 1 },
  { label: "=", span: 2 },
];

const CalculatorMock: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const panelW = Math.min(360, width - 100);
  const panelH = Math.min(height - 40, 440);
  const displayH = Math.round(panelH * 0.2);
  const gridH = panelH - displayH;
  const cellH = gridH / 6;
  return (
    <div style={{ width, height, boxSizing: "border-box", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: panelW, height: panelH, background: "#f0f0f0", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            height: displayH,
            flex: `0 0 ${displayH}px`,
            background: "#ffffff",
            border: "1px solid #adadad",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 14px",
            fontFamily: "Arial, sans-serif",
            fontWeight: 400,
            fontSize: Math.round(displayH * 0.44),
            color: "#101113",
          }}
        >
          128
        </div>
        {CALC_ROWS.map((row, ri) => (
          <div key={ri} style={{ height: cellH, flex: `0 0 ${cellH}px`, display: "flex" }}>
            {row.map((label, ci) => (
              <div
                key={ci}
                style={{
                  flex: "1 1 0",
                  margin: 1,
                  background: "#e1e1e1",
                  border: "1px solid #adadad",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: Math.round(cellH * 0.4),
                  color: "#101113",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        ))}
        <div style={{ height: cellH, flex: `0 0 ${cellH}px`, display: "flex" }}>
          {CALC_LAST_ROW.map((b, i) => (
            <div
              key={i}
              style={{
                flex: `${b.span} 1 0`,
                margin: 1,
                background: "#e1e1e1",
                border: "1px solid #adadad",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
                fontWeight: 400,
                fontSize: Math.round(cellH * 0.4),
                color: "#101113",
              }}
            >
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Tetromino colors (tetris_layout.json colors_hex).
const TET_COLORS = { I: "#26e5ff", O: "#ffe14d", T: "#c869ff", S: "#57e37f", Z: "#ff5c6c", J: "#5b7bff", L: "#ff9d3d" };
// v1 (flat) colors — tetris_v1_layout.json.
const TET_COLORS_V1 = { I: "#00bcd4", O: "#ffeb3b", T: "#9c27b0", S: "#4caf50", Z: "#f44336", J: "#3f51b5", L: "#ff9800" };

const TETRIS_COLS = 10;
const TETRIS_ROWS = 20;
// A few settled pieces + one falling piece near the top, so the board reads as "a game in progress".
const TETRIS_SETTLED: Array<{ c: number; r: number; k: keyof typeof TET_COLORS }> = [
  { c: 2, r: 19, k: "L" }, { c: 3, r: 19, k: "L" }, { c: 4, r: 19, k: "L" }, { c: 2, r: 18, k: "L" },
  { c: 5, r: 19, k: "O" }, { c: 6, r: 19, k: "O" }, { c: 5, r: 18, k: "O" }, { c: 6, r: 18, k: "O" },
  { c: 7, r: 19, k: "J" }, { c: 7, r: 18, k: "J" }, { c: 8, r: 18, k: "J" }, { c: 8, r: 17, k: "J" },
  { c: 0, r: 19, k: "S" }, { c: 1, r: 19, k: "S" }, { c: 0, r: 18, k: "T" }, { c: 1, r: 17, k: "T" },
];
const TETRIS_FALLING: Array<{ c: number; r: number; k: keyof typeof TET_COLORS }> = [
  { c: 4, r: 1, k: "I" }, { c: 4, r: 2, k: "I" }, { c: 4, r: 3, k: "I" }, { c: 4, r: 4, k: "I" },
];

// v1 board is smaller in every way (24px cell vs 32px, flat blocks, no sidebar) -- used only for the
// small "before" thumbnail on slide 07.
const TetrisCellV1: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <div style={{ width: size, height: size, boxSizing: "border-box", background: color, border: "1px solid #111111" }} />
);

const TetrisV1Board: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const cell = Math.min(Math.floor(width / TETRIS_COLS), Math.floor((height - 34) / TETRIS_ROWS));
  const boardW = cell * TETRIS_COLS;
  const boardH = cell * TETRIS_ROWS;
  return (
    <div style={{ width, height, boxSizing: "border-box", background: "#111111", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <div style={{ position: "relative", width: boardW, height: boardH, background: "#111111" }}>
        {TETRIS_SETTLED.map((b, i) => (
          <div key={`s${i}`} style={{ position: "absolute", left: b.c * cell, top: b.r * cell }}>
            <TetrisCellV1 size={cell} color={TET_COLORS_V1[b.k]} />
          </div>
        ))}
        {TETRIS_FALLING.map((b, i) => (
          <div key={`f${i}`} style={{ position: "absolute", left: b.c * cell, top: b.r * cell }}>
            <TetrisCellV1 size={cell} color={TET_COLORS_V1[b.k]} />
          </div>
        ))}
      </div>
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: Math.round(cell * 0.55), color: "#ffffff" }}>점수: 0</div>
    </div>
  );
};

// v2 (edited) board: 3D-beveled cells (draw_cell bevel per tetris_layout.json), sidebar with score/next
// preview/start button, dark theme.
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

// ------------------------------------------------------------------------------------------------
// 01 · 실습 1 — "자기소개서 md 파일 작성" ('간단한 너의 자기소개서를 md파일로 현재폴더에 작성해줘')
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "간단한 너의 자기소개서를 md파일로 현재폴더에 작성해줘" },
    { role: "assistant", text: "Write(self_introduction.md)" },
    { role: "assistant", text: "현재 폴더에 self_introduction.md 파일을 작성했습니다." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(1), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="자기소개서 md 파일 작성">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <MarkdownPreviewWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} fileName="self_introduction.md">
        <ShotFill src={SHOT_SELF_INTRO} bg="#181818" />
      </MarkdownPreviewWindow>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "자기소개서를 md 파일로 요청", body: "현재 폴더에 자기소개서 파일을 만들어달라고 요청한다." },
          { number: 2, head: "메모장과 비슷하지만 서식이 있다", body: "마크다운(.md)은 제목·목록 같은 서식을 쓰는 텍스트 파일이다." },
          { number: "!", head: "확장자는 .md", body: "만들어진 파일 이름은 self_introduction.md 다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · 실습 2 — "자전거 타는 강아지 SVG" ('자전거 타는 강아지를 svg코드로 만들어줘')
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "자전거 타는 강아지를 svg코드로 만들어줘" },
    { role: "assistant", text: "Write(dog_on_bike.svg)" },
    { role: "assistant", text: "현재 폴더에 dog_on_bike.svg 파일로 자전거 타는 강아지 그림을 만들었습니다." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(2), turns });
  const b1 = t.spotForTurn(0);

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="자전거 타는 강아지 SVG">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <BrowserResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="dog_on_bike.svg">
        <ShotFill src={SHOT_DOG} />
      </BrowserResultWindow>
      <FocusBadge number={2} x={RESULT_COL_X + RESULT_COL_W / 2} y={BODY_Y + WINDOW_HEADER_H + (TOP_H - WINDOW_HEADER_H) / 2} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "자전거 타는 강아지를 SVG로 요청", body: "그림을 그려달라는 대신 SVG 코드로 만들어달라고 요청한다." },
          { number: 2, head: "SVG는 도형으로 그리는 벡터 이미지", body: "점·선·원 같은 도형과 좌표로 그림을 그리는 코드다." },
          { number: "!", head: "확대해도 깨지지 않는다", body: "좌표로 그리기 때문에 아무리 키워도 화질이 그대로다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · 실습 3 — "HTML 포스터 만들어 크롬으로 열기" ('그 강아지를 가지고 html로 간단한 포스터를 만들어서 크롬으로 열어줘')
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "그 강아지를 가지고 html로 간단한 포스터를 만들어서 크롬으로 열어줘" },
    { role: "assistant", text: "Write(poster.html)" },
    { role: "assistant", text: "현재 폴더에 poster.html 파일로 강아지 SVG를 넣은 포스터를 만들었습니다." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(3), turns });
  const b1 = t.spotForTurn(0);

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="HTML 포스터 만들어 크롬으로 열기">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <BrowserResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="poster.html — Chrome">
        <ShotFill src={SHOT_POSTER} bg="#bcd7f2" />
      </BrowserResultWindow>
      <FocusBadge number={2} x={RESULT_COL_X + RESULT_COL_W / 2} y={BODY_Y + WINDOW_HEADER_H + (TOP_H - WINDOW_HEADER_H) / 2} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "포스터를 만들어서 크롬으로 열기", body: "html 포스터를 만들고 바로 크롬으로 열어달라고 요청한다." },
          { number: 2, head: "HTML은 브라우저에서 여는 웹 코드", body: "코드를 작성하고 브라우저에서 열면 그대로 화면에 나타난다." },
          { number: "!", head: "결과를 바로 눈으로 확인", body: "만든 포스터를 크롬 창에서 바로 확인한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · 실습 4 — "tkinter 계산기 만들기" ('파이썬과 tkinter를 설치해서 간단한 계산기 프로그램 만들어줘')
// 맥북 tkinter 오류 캐베어트 + 링크 (basic_step02_outline.md 항목 4)
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "파이썬과 tkinter를 설치해서 간단한 계산기 프로그램 만들어줘" },
    { role: "assistant", text: "Write(calculator.py)" },
    { role: "assistant", text: "현재 폴더에 calculator.py 파일로 tkinter 계산기를 만들었습니다." },
  ];
  // Bottom row needs extra height for the Mac-fix card's quoted prompt block, so this slide only
  // trims its own top row a bit and gives the freed space to the card row (CARDS_Y/CARDS_H stay
  // untouched globally -- other slides are unaffected).
  const topH4 = TOP_H - 60;
  const cardsY4 = BODY_Y + topH4 + ROW_GAP;
  const cardsH4 = BODY_BOTTOM - cardsY4;
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: topH4, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(4), turns });
  const b1 = t.spotForTurn(0);

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="tkinter 계산기 만들기">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={topH4} title="계산기">
        <CalculatorMock width={RESULT_COL_W} height={topH4 - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <FocusBadge number={2} x={RESULT_COL_X + 40} y={BODY_Y + WINDOW_HEADER_H + 40} size={36} />
      <CardRow
        x={colX(0)}
        y={cardsY4}
        width={colW(12)}
        height={cardsH4}
        items={[
          { number: 1, head: "설치까지 포함해서 요청", body: "파이썬과 tkinter 설치부터 계산기 실행까지 한 번에 요청한다." },
          {
            number: 2,
            head: "맥북에서 창이 안 뜨면",
            body: "Claude에게 이렇게 보내세요:",
            code: "맥북에서 tkinter 창이 제대로 안 떠. python3 --version 으로 파이썬 버전을 확인하고, 그 버전에 맞는 python-tk 를 brew 로 설치한 다음(예: brew install python-tk@3.12) 계산기를 다시 실행해줘",
          },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · 실습 5 — "테트리스 만들기" ('같은방식으로 간단한 테트리스 만들어줘')
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "같은방식으로 간단한 테트리스 만들어줘" },
    { role: "assistant", text: "Write(tetris.py)" },
    { role: "assistant", text: "현재 폴더에 tetris.py 파일로 간단한 테트리스를 만들었습니다." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(5), turns });
  const b1 = t.spotForTurn(0);

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="테트리스 만들기">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="테트리스" theme="dark">
        <TetrisMock width={RESULT_COL_W} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <FocusBadge number={2} x={RESULT_COL_X + RESULT_COL_W * 0.32} y={BODY_Y + TOP_H / 2} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "같은 방식으로 또 요청하기", body: "\"같은 방식으로\"라고만 해도 새 프로그램을 또 만들어준다." },
          { number: 2, head: "게임도 코드로 만들 수 있다", body: "계산기처럼 파이썬 파일 하나로 테트리스도 바로 실행된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · "Edit 툴이란?" — Write(새로 쓰기) vs Edit(부분만 고치기) 비교
// ------------------------------------------------------------------------------------------------

const FileGlyphBig: React.FC<{ size: number; tone: string }> = ({ size, tone }) => (
  <svg width={size} height={size} viewBox="0 0 46 46" style={{ display: "block" }}>
    <path d="M6 3 H26 L38 15 V42 C38 43.1 37.1 44 36 44 H6 C4.9 44 4 43.1 4 42 V5 C4 3.9 4.9 3 6 3 Z" fill="#ffffff" stroke={tone} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M26 3 V15 H38" fill="none" stroke={tone} strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
);

const CompareCard: React.FC<{ x: number; y: number; w: number; h: number; label: string; desc: string; icon: React.ReactNode }> = ({ x, y, w, h, label, desc, icon }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      boxSizing: "border-box",
      background: COLORS.paper2,
      border: `2px solid ${COLORS.line}`,
      borderRadius: 18,
      boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      padding: "0 40px",
    }}
  >
    {icon}
    <div style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 40, color: COLORS.accentDeep }}>{label}</div>
    <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 26, lineHeight: 1.4, color: COLORS.ink2, textAlign: "center", wordBreak: "keep-all" }}>{desc}</div>
  </div>
);

const Slide06: React.FC = () => {
  const illoY = BODY_Y;
  const illoH = TOP_H;
  const leftX = colX(0);
  const leftW = colW(12);
  const gap = 40;
  const cardW = (leftW - gap) / 2;
  const cardH = illoH;
  const writeX = leftX;
  const editX = leftX + cardW + gap;
  const contentH = 88 + 20 + 48 + 20 + 73;
  const iconTop = (cardH - contentH) / 2;
  const badgeYInCard = iconTop + 54 + 16;
  const badgeXOffset = 26;

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="Edit 툴이란?">
      <CompareCard
        x={writeX}
        y={illoY}
        w={cardW}
        h={cardH}
        label="Write"
        desc="새 파일을 처음부터 통째로 쓴다."
        icon={
          <div style={{ position: "relative", width: 88, height: 88 }}>
            <FileGlyphBig size={88} tone={COLORS.ink2} />
            <div style={{ position: "absolute", left: 54, top: 54, width: 32, height: 32, borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={16} height={16} viewBox="0 0 24 24">
                <path d="M12 5 V19 M5 12 H19" fill="none" stroke="#ffffff" strokeWidth={3.2} strokeLinecap="round" />
              </svg>
            </div>
          </div>
        }
      />
      <CompareCard
        x={editX}
        y={illoY}
        w={cardW}
        h={cardH}
        label="Edit"
        desc="이미 있는 파일에서 필요한 부분만 고친다."
        icon={
          <div style={{ position: "relative", width: 88, height: 88 }}>
            <FileGlyphBig size={88} tone={COLORS.ink2} />
            <div style={{ position: "absolute", left: 54, top: 54, width: 32, height: 32, borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={17} height={17} viewBox="0 0 24 24">
                <path d="M4 20 L4.8 15.6 L16.2 4.2 C17 3.4 18.3 3.4 19.1 4.2 L19.8 4.9 C20.6 5.7 20.6 7 19.8 7.8 L8.4 19.2 Z M14.5 6 L18 9.5" fill="none" stroke="#ffffff" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        }
      />
      <FocusBadge number={1} x={writeX + cardW / 2 + badgeXOffset} y={illoY + badgeYInCard} size={30} />
      <FocusBadge number={2} x={editX + cardW / 2 + badgeXOffset} y={illoY + badgeYInCard} size={30} />

      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "Write = 새로 쓰기", body: "파일 전체를 처음부터 만든다." },
          { number: 2, head: "Edit = 부분 고치기", body: "바뀐 부분만 바꿔서 빠르고 안전하다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · edit 실습 1 — "테트리스 꾸미기" (시작버튼 추가 · 블록 입체감 · 화면 확대, 세련되게)
// before(tetris_v1, small) / after(tetris, large) side by side inside the result column so the
// improvement reads clearly at a glance.
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "테트리스에 시작버튼을 추가하고, 블록을 좀더 입체적이게 만들어주고, 화면을 좀더 키워서 전체적으로 세련되게 디자인해줘" },
    { role: "assistant", text: "Update(tetris.py)" },
    { role: "assistant", text: "tetris.py를 업데이트했습니다: 시작 버튼과 사이드 패널 추가, 블록 베벨 효과, 셀 확대." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(5), turns });
  const b1 = t.spotForTurn(0);

  const beforeW = Math.round(RESULT_COL_W * 0.28);
  const afterW = RESULT_COL_W - beforeW - 20;
  const afterX = RESULT_COL_X + beforeW + 20;

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="테트리스 꾸미기">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={beforeW} height={TOP_H} title="tetris_v1.py" theme="dark">
        <TetrisV1Board width={beforeW} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <NativeAppResultWindow x={afterX} y={BODY_Y} width={afterW} height={TOP_H} title="tetris.py" theme="dark">
        <TetrisMock width={afterW} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <FocusBadge number={2} x={afterX + afterW * 0.3} y={BODY_Y + TOP_H / 2} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "요청한 개선 사항 세 가지", body: "시작 버튼 추가, 블록 입체감, 화면 확대까지 한 문장으로 요청한다." },
          { number: 2, head: "Edit 툴로 부분만 수정", body: "전체를 새로 쓰지 않고 tetris.py 일부만 고쳤다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · edit 실습 2 — "포스터 초록 테마로 변경" ('강아지 포스터에서 색상을 초록색 테마로 바꾸고 크롬으로 열어줘')
// ------------------------------------------------------------------------------------------------

const Slide08: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "강아지 포스터에서 색상을 초록색 테마로 바꾸고 크롬으로 열어줘" },
    { role: "assistant", text: "Update(poster.html)" },
    { role: "assistant", text: "초록색 테마로 poster_green.html 파일을 새로 저장했습니다." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(3), turns });
  const b1 = t.spotForTurn(0);

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="포스터 초록 테마로 변경">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <BrowserResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="poster_green.html — Chrome">
        <ShotFill src={SHOT_POSTER_GREEN} bg="#bfe3c4" />
      </BrowserResultWindow>
      <FocusBadge number={2} x={RESULT_COL_X + RESULT_COL_W / 2} y={BODY_Y + WINDOW_HEADER_H + (TOP_H - WINDOW_HEADER_H) / 2} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "색상만 바꿔달라고 요청", body: "만들어둔 강아지 포스터의 색상을 초록색으로 바꿔달라고 한다." },
          { number: 2, head: "Edit 툴은 부분만 바꾼다", body: "포스터 구조는 그대로 두고 색상 값만 초록색으로 고쳤다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 09 · "/clear 새 대화" — write/edit 실습을 마치고 새 대화로 넘어가기
// ------------------------------------------------------------------------------------------------

const Slide09: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const priorTurns: ClaudeCodeTurn[] = [{ role: "assistant", text: "초록색 테마로 poster_green.html 파일을 새로 저장했습니다." }];
  const t = terminalIllo({ x: illoX, y: BODY_Y, w: illoW, h: TOP_H, windowH: TERM_WINDOW_H, explorerNodes: explorerUpTo(5), turns: priorTurns, inputText: "/clear" });
  const b1 = t.spotForInput();

  return (
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="/clear 새 대화">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "/clear", body: "지금 채팅방을 나가고 새 채팅방으로 가기" },
          { number: "!", head: "만든 파일은 폴더에 그대로 남는다", body: "실습에서 만든 파일 5개가 agent1 폴더에 그대로 남는다." },
        ]}
      />
    </SlideFrame>
  );
};

export const STEP02_WRITE: SlideEntry[] = [
  { index: 1, name: "01_write_자기소개서_md", title: "자기소개서 md 파일 작성", render: () => React.createElement(Slide01) },
  { index: 2, name: "02_write_강아지_svg", title: "자전거 타는 강아지 SVG", render: () => React.createElement(Slide02) },
  { index: 3, name: "03_write_html_포스터", title: "HTML 포스터 만들어 크롬으로 열기", render: () => React.createElement(Slide03) },
  { index: 4, name: "04_write_계산기_tkinter", title: "tkinter 계산기 만들기", render: () => React.createElement(Slide04) },
  { index: 5, name: "05_write_테트리스", title: "테트리스 만들기", render: () => React.createElement(Slide05) },
  { index: 6, name: "06_edit_툴이란", title: "Edit 툴이란?", render: () => React.createElement(Slide06) },
  { index: 7, name: "07_edit_테트리스_개선", title: "테트리스 꾸미기", render: () => React.createElement(Slide07) },
  { index: 8, name: "08_edit_포스터_초록테마", title: "포스터 초록 테마로 변경", render: () => React.createElement(Slide08) },
  { index: 9, name: "09_write_edit_clear", title: "/clear 새 대화", render: () => React.createElement(Slide09) },
];

export const STEP02_WRITE_PART: PartSpec = { id: "write", eyebrow: EYEBROW, entries: STEP02_WRITE };
