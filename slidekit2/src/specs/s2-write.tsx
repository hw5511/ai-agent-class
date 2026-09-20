// s2-write — basic 2회차 슬라이드 47~60 (14장), rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step02/write_*.svg + courses/basic/step02.json) into this renderer.
//
// Reference: specs/step02-write.tsx (CEO-approved 2026-09-18, "write 파트 좋아 좋아") is THE pattern for
// result slides here — VS Code + ClaudeCodeTerminal on the left, the real result large on the right, and
// annotation cards laid out horizontally underneath (never squeezed into a narrow column). This file
// reuses that same terminalIllo / CardRow / BrowserResultWindow / NativeAppResultWindow /
// MarkdownPreviewWindow / CalculatorMock / TetrisV1Board machinery locally (each part owns its own copy,
// per the worker guide — nothing shared is edited). It differs from step02-write.tsx in two ways the
// shipped deck itself makes: (1) every practice item here gets its own "~란" concept slide, request slide
// and result slide (the shipped deck's own split, e.g. write_svg_란 / write_svg_요청 / write_svg_결과),
// and (2) file names follow the shipped deck's own facts exactly (자기소개.md, 자전거_강아지.svg —
// not the English names step02-write.tsx used for the same practice run).
//
// CEO standing rules honored here (src/README.md direction log):
//   - Mac tkinter note (write_계산기_요청) is a ready-to-paste Claude prompt, never a reference URL —
//     reused verbatim from step02-write.tsx's approved Slide04 card, which already encodes this rule.
//   - Results come from the real practice run: calculator/tetris visuals reuse step02-write.tsx's
//     CalculatorMock / TetrisV1Board (built from the real calculator_layout.json / tetris_v1_layout.json)
//     instead of the shipped SVG's own invented button grid (÷×−+ generic calculator) — the shipped SVG
//     predates the "actually run it" rule, so its calculator drawing is exactly the kind of hand-guessed
//     mock that rule replaced.
//   - "Show, do not box": the shipped write_html_란 svg was a 3-box+arrow explainer (banned pattern) —
//     rebuilt here as a real code panel -> a browser glyph -> an actual thumbnail of the real poster
//     screenshot, connected with the shared Glyph "arrow-right" (a real icon, not a text box).
import React from "react";
import { staticFile, Img } from "remotion";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { AppWindow, type WindowOs } from "../core/AppWindow";
import { Camera, cameraView } from "../core/Camera";
import { Glyph } from "../core/glyphs";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "WRITE 툴";
const TOTAL = 14;

const WINDOW_HEADER_H = 34; // AppWindow native windowHeader (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // reserved inside the terminal's own left padding so badges sit on the line.

// ------------------------------------------------------------------------------------------------
// Two-row body layout (step02-write.tsx pattern): top row = terminal (left) + result (right, as large
// as possible); bottom row = annotation cards laid out horizontally. Local to this part only.
// ------------------------------------------------------------------------------------------------
const ROW_GAP = 28;
const TOP_H = 512;
const CARDS_Y = BODY_Y + TOP_H + ROW_GAP; // 790
const CARDS_H = BODY_BOTTOM - CARDS_Y; // 210

const TERM_COL_X = colX(0);
const TERM_COL_W = colW(5);
const RESULT_COL_X = colX(5);
const RESULT_COL_W = 1800 - RESULT_COL_X;
const SPLIT_WINDOW_H = 480;

function windowGeometry(illoW: number, illoH: number, windowH = 480) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

function rightTermWidth(windowNative: { w: number }): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  return Math.round(contentW * 0.84);
}

// Real files created in this practice run, in creation order (shipped deck's own file names —
// write_md_결과.svg / write_svg_결과.svg name them 자기소개.md / 자전거_강아지.svg explicitly).
const ALL_FILES = ["자기소개.md", "자전거_강아지.svg", "poster.html", "calculator.py", "tetris.py"];

function explorerUpTo(n: number): ExplorerNode[] {
  return ALL_FILES.slice(0, n).map((name, i) => ({ name, kind: "file", depth: 0, state: i === n - 1 ? "new" : "normal" }));
}

// A right-layout VS Code + Claude Code terminal illo, reusable at any x/y/w/h. Returns the element plus
// a badge-spot getter so each slide can pin a FocusBadge on the exact turn/input line it calls out.
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
// Horizontal bottom card row (CEO 2026-09-18: cards move under the screens, laid out side by side).
// ------------------------------------------------------------------------------------------------
interface CardItem {
  number: number | string;
  head: string;
  body?: string;
  code?: string;
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
// Result window chrome — Chrome-style for html/svg, a native Windows/dark titlebar for tkinter,
// a VS Code-style markdown-preview tab for the .md result. (step02-write.tsx pattern.)
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

// Real screenshots (write_practice/shots/*.png, already copied into public/slides/write/).
const SHOT_SELF_INTRO = staticFile("slides/write/self_intro.png");
const SHOT_DOG = staticFile("slides/write/dog.png");
const SHOT_POSTER = staticFile("slides/write/poster.png");

const ShotFill: React.FC<{ src: string; bg?: string }> = ({ src, bg = COLORS.paper2 }) => (
  <div style={{ width: "100%", height: "100%", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
  </div>
);

// ------------------------------------------------------------------------------------------------
// tkinter mocks — CalculatorMock (real calculator_layout.json button grid) and TetrisV1Board (real
// tetris_v1_layout.json, the plain "before Edit" board — this deck's write_테트리스 slide is the
// same simple board the shipped SVG draws: a bare grid + "점수: 0", no sidebar/start button yet).
// Both are step02-write.tsx's own local copies (this part owns its own, per the worker guide).
// ------------------------------------------------------------------------------------------------
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

const TET_COLORS_V1 = { I: "#00bcd4", O: "#ffeb3b", T: "#9c27b0", S: "#4caf50", Z: "#f44336", J: "#3f51b5", L: "#ff9800" };
const TETRIS_COLS = 10;
const TETRIS_ROWS = 20;
const TETRIS_SETTLED: Array<{ c: number; r: number; k: keyof typeof TET_COLORS_V1 }> = [
  { c: 2, r: 19, k: "L" }, { c: 3, r: 19, k: "L" }, { c: 4, r: 19, k: "L" }, { c: 2, r: 18, k: "L" },
  { c: 5, r: 19, k: "O" }, { c: 6, r: 19, k: "O" }, { c: 5, r: 18, k: "O" }, { c: 6, r: 18, k: "O" },
  { c: 7, r: 19, k: "J" }, { c: 7, r: 18, k: "J" }, { c: 8, r: 18, k: "J" }, { c: 8, r: 17, k: "J" },
  { c: 0, r: 19, k: "S" }, { c: 1, r: 19, k: "S" }, { c: 0, r: 18, k: "T" }, { c: 1, r: 17, k: "T" },
];
const TETRIS_FALLING: Array<{ c: number; r: number; k: keyof typeof TET_COLORS_V1 }> = [
  { c: 4, r: 1, k: "I" }, { c: 4, r: 2, k: "I" }, { c: 4, r: 3, k: "I" }, { c: 4, r: 4, k: "I" },
];

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

// ------------------------------------------------------------------------------------------------
// Non-result-slide helpers: CompareCard (two-up concept comparison, e.g. Read vs Write, 지금까지 vs
// 이번엔), FileGlyphBig + overlay icons, a dark CodeWindow for showing raw code/text side by side, and
// the pixel-vs-vector illustration for "svg가 뭔가요?".
// ------------------------------------------------------------------------------------------------

const FileGlyphBig: React.FC<{ size: number; tone: string }> = ({ size, tone }) => (
  <svg width={size} height={size} viewBox="0 0 46 46" style={{ display: "block" }}>
    <path d="M6 3 H26 L38 15 V42 C38 43.1 37.1 44 36 44 H6 C4.9 44 4 43.1 4 42 V5 C4 3.9 4.9 3 6 3 Z" fill="#ffffff" stroke={tone} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M26 3 V15 H38" fill="none" stroke={tone} strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
);

const IconBadgeOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: 54, top: 54, width: 32, height: 32, borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
    {children}
  </div>
);

const PlusOverlay: React.FC = () => (
  <IconBadgeOverlay>
    <svg width={16} height={16} viewBox="0 0 24 24">
      <path d="M12 5 V19 M5 12 H19" fill="none" stroke="#ffffff" strokeWidth={3.2} strokeLinecap="round" />
    </svg>
  </IconBadgeOverlay>
);

const EyeOverlay: React.FC = () => (
  <IconBadgeOverlay>
    <svg width={17} height={17} viewBox="0 0 24 24">
      <path d="M2 12C4.5 7 8 4.5 12 4.5S19.5 7 22 12C19.5 17 16 19.5 12 19.5S4.5 17 2 12Z" fill="none" stroke="#ffffff" strokeWidth={1.8} strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#ffffff" strokeWidth={1.8} />
    </svg>
  </IconBadgeOverlay>
);

const CompareCard: React.FC<{ x: number; y: number; w: number; h: number; label: string; desc: string; icon: React.ReactNode; accentText?: boolean }> = ({ x, y, w, h, label, desc, icon, accentText }) => (
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
    <div style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 34, color: accentText ? COLORS.accentDeep : COLORS.ink }}>{label}</div>
    <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 24, lineHeight: 1.4, color: COLORS.ink2, textAlign: "center", wordBreak: "keep-all" }}>{desc}</div>
  </div>
);

// A dark, D2Coding code/text panel — used for both the shown-verbatim source (svg/html snippets, plain
// .txt content) and the "structure appears" .md view (heading/bullet lines styled differently, still
// the raw characters, never a parsed HTML render — this is what the shipped svg itself shows).
interface CodeLine {
  text: string;
  tone?: "heading" | "bullet" | "normal" | "dim";
}

const CodeWindow: React.FC<{ x: number; y: number; width: number; height: number; title: string; lines: CodeLine[] }> = ({ x, y, width, height, title, lines }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      boxSizing: "border-box",
      borderRadius: 14,
      overflow: "hidden",
      background: "#1f2937",
      boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div style={{ flex: "0 0 40px", display: "flex", alignItems: "center", padding: "0 20px", borderBottom: "1px solid #374151" }}>
      <span style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 17, color: "#cbd5e1" }}>{title}</span>
    </div>
    <div style={{ flex: "1 1 0", minHeight: 0, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
      {lines.map((l, i) => {
        const isHeading = l.tone === "heading";
        const isBullet = l.tone === "bullet";
        const isDim = l.tone === "dim";
        return (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            {isBullet ? <span style={{ color: COLORS.accent, fontFamily: FONTS.term, fontSize: 22, fontWeight: 700 }}>&#8226;</span> : null}
            <span
              style={{
                fontFamily: FONTS.term,
                fontWeight: isHeading ? 800 : 500,
                fontSize: isHeading ? 30 : 20,
                color: isDim ? "#6b7280" : isHeading ? "#ffffff" : "#cfd2d4",
                whiteSpace: "pre-wrap",
                wordBreak: "keep-all",
              }}
            >
              {l.text}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

// Pixel-photo vs clean-vector illustration for "svg가 뭔가요?" — a circle drawn two ways: coarse
// squares (jpg/png, "점을 찍어 표현") vs a smooth path (svg, "좌표와 도형").
const PixelCircle: React.FC<{ size: number }> = ({ size }) => {
  const grid = 10;
  const cell = size / grid;
  const cx = grid / 2 - 0.5;
  const cy = grid / 2 - 0.5;
  const r = grid / 2 - 0.6;
  const cells: Array<{ cxi: number; cyi: number }> = [];
  for (let yy = 0; yy < grid; yy++) {
    for (let xx = 0; xx < grid; xx++) {
      if (Math.hypot(xx - cx, yy - cy) <= r) cells.push({ cxi: xx, cyi: yy });
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {cells.map((c, i) => (
        <rect key={i} x={c.cxi * cell} y={c.cyi * cell} width={cell} height={cell} fill={COLORS.ink3} stroke={COLORS.paper2} strokeWidth={1} />
      ))}
    </svg>
  );
};

const VectorCircleRect: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 120 90">
    <circle cx="60" cy="34" r="26" fill="none" stroke={COLORS.accent} strokeWidth={3} />
    <rect x="24" y="64" width="72" height="18" rx="4" fill="none" stroke={COLORS.accent} strokeWidth={3} />
  </svg>
);

// Simple browser-window glyph (rounded rect + 3 top dots) for the html_란 flow — a real icon, not a
// text-in-a-box explainer.
const BrowserGlyph: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 0.78} viewBox="0 0 64 50">
    <rect x="1.5" y="1.5" width="61" height="47" rx="7" fill="#ffffff" stroke={COLORS.ink2} strokeWidth="2" />
    <line x1="1.5" y1="14" x2="62.5" y2="14" stroke={COLORS.ink2} strokeWidth="2" />
    <circle cx="10" cy="7.5" r="2.4" fill={COLORS.ink3} />
    <circle cx="19" cy="7.5" r="2.4" fill={COLORS.ink3} />
    <circle cx="28" cy="7.5" r="2.4" fill={COLORS.ink3} />
  </svg>
);

// ------------------------------------------------------------------------------------------------
// 01 · "Write 툴이란?" — Read(review) vs Write(new) + 3-step "이렇게 동작합니다" flow
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const y = BODY_Y;
  const h = TOP_H;
  const gap = 40;
  const w = colW(12);
  const cardW = (w - gap) / 2;
  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="Write 툴">
      <CompareCard
        x={colX(0)}
        y={y}
        w={cardW}
        h={h}
        label="Read"
        desc="파일 열람·확인"
        icon={
          <div style={{ position: "relative", width: 88, height: 88 }}>
            <FileGlyphBig size={88} tone={COLORS.ink2} />
            <EyeOverlay />
          </div>
        }
      />
      <CompareCard
        x={colX(0) + cardW + gap}
        y={y}
        w={cardW}
        h={h}
        label="Write"
        desc="새 파일 생성"
        icon={
          <div style={{ position: "relative", width: 88, height: 88 }}>
            <FileGlyphBig size={88} tone={COLORS.ink2} />
            <PlusOverlay />
          </div>
        }
        accentText
      />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "말로 지시", body: "\"~파일을 만들어줘\"" },
          { number: 2, head: "Claude가 파일 작성", body: "Write 툴을 호출합니다." },
          { number: 3, head: "폴더에 파일이 생김", body: "탐색기에 바로 보입니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · "md 파일이 뭔가요?" — 메모장(.txt) 줄글 vs 마크다운(.md) 기호 구조
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const y = BODY_Y;
  const h = TOP_H;
  const gap = 40;
  const w = colW(12);
  const panelW = (w - gap) / 2;
  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="마크다운 파일">
      <CodeWindow
        x={colX(0)}
        y={y}
        width={panelW}
        height={h}
        title="회의노트.txt — 메모장"
        lines={[
          { text: "오늘 회의 정리", tone: "normal" },
          { text: "매출 12% 증가", tone: "normal" },
          { text: "신제품 5월 출시", tone: "normal" },
        ]}
      />
      <CodeWindow
        x={colX(0) + panelW + gap}
        y={y}
        width={panelW}
        height={h}
        title="회의노트.md"
        lines={[
          { text: "# 오늘 회의 정리", tone: "heading" },
          { text: "- 매출 12% 증가", tone: "bullet" },
          { text: "- 신제품 5월 출시", tone: "bullet" },
        ]}
      />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "메모장 (.txt) = 줄글", body: "제목·목록 구분이 파일 안에 없습니다." },
          { number: 2, head: "마크다운 (.md) = 기호 구조", body: "#은 제목, -은 목록 — 구조를 기호로 표시합니다." },
          { number: "!", head: "이 기호 규칙이 \"마크다운 문법\"", body: "# 하나 = 큰 제목, - 하나 = 목록 항목이라는 뜻입니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · "자기소개서 만들기" — 실습 1 요청
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const t = terminalIllo({ x: illoX, y: BODY_Y, w: illoW, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(0), inputText: "간단한 너의 자기소개서를 md 파일로 현재 폴더에 작성해줘" });
  const b1 = t.spotForInput();

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="자기소개서 만들기">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "요청을 한 줄로 입력", body: "터미널 입력창에 요청을 한 줄로 적습니다." },
          { number: 2, head: "\"현재 폴더\" = agent1", body: "지금 VS Code로 열어놓은 agent1 폴더를 뜻합니다." },
          { number: "!", head: "Enter를 누르면 실행", body: "Claude가 파일을 만듭니다 — 결과는 다음 슬라이드에서 확인합니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · "파일이 생겼습니다" — 실습 1 결과 (자기소개.md)
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "간단한 너의 자기소개서를 md 파일로 현재 폴더에 작성해줘" },
    { role: "assistant", text: "Write(자기소개.md)" },
    { role: "assistant", text: "자기소개서를 만들었어용용!" },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(1), turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="파일이 생겼습니다">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <MarkdownPreviewWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} fileName="자기소개.md">
        <ShotFill src={SHOT_SELF_INTRO} bg="#181818" />
      </MarkdownPreviewWindow>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "Write 툴이 파일 생성", body: "탐색기에 자기소개.md 파일이 새로 나타납니다." },
          { number: 2, head: "이름·말투가 그대로 반영", body: "CLAUDE.md로 정한 이름과 말투(~요→~용용)가 그대로 담깁니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · "svg가 뭔가요?" — 사진(픽셀) vs 벡터(좌표·도형)
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const y = BODY_Y;
  const h = TOP_H;
  const gap = 40;
  const w = colW(12);
  const cardW = (w - gap) / 2;
  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="SVG 벡터 그림">
      <CompareCard x={colX(0)} y={y} w={cardW} h={h} label="사진 (jpg · png)" desc="점(픽셀)을 촘촘히 찍어 그림을 표현합니다. 확대하면 점이 흐려지고 깨집니다." icon={<PixelCircle size={110} />} />
      <CompareCard x={colX(0) + cardW + gap} y={y} w={cardW} h={h} label="벡터 그림 (svg)" desc="좌표와 도형을 적어둔 코드라 아무리 키워도 안 깨집니다." icon={<VectorCircleRect size={140} />} accentText />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "사진 = 점을 찍어 표현", body: "확대하면 점이 흐려지고 그림이 깨집니다." },
          { number: 2, head: "벡터 = 좌표와 도형", body: "circle·rect 같은 도형 코드로 그림을 그립니다." },
          { number: "!", head: "이 슬라이드도 사실 svg", body: "지금 보고 있는 강의 슬라이드들도 전부 svg 파일로 그려져 있습니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · "강아지 그리기" — 실습 2 요청
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const t = terminalIllo({ x: illoX, y: BODY_Y, w: illoW, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(1), inputText: "자전거 타는 강아지를 svg 코드로 만들어줘" });
  const b1 = t.spotForInput();

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="강아지 그리기">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "그림 대신 코드로 요청", body: "svg 코드로 그림을 그려달라고 요청합니다." },
          { number: 2, head: "그림 파일이 아니라 코드", body: "jpg가 아니라 좌표·도형으로 된 코드(svg)가 만들어집니다." },
          { number: "!", head: "다음 슬라이드에서 확인", body: "실제로 그려진 모습을 다음 슬라이드에서 봅니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · "코드가 그림이 됩니다" — 실습 2 결과 (자전거_강아지.svg)
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "자전거 타는 강아지를 svg 코드로 만들어줘" },
    { role: "assistant", text: "Write(자전거_강아지.svg)" },
    { role: "assistant", text: "자전거 타는 강아지 그림을 완성했습니다." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(2), turns });
  const b1 = t.spotForTurn(0);

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="코드가 그림이 됩니다">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <BrowserResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="자전거_강아지.svg">
        <ShotFill src={SHOT_DOG} />
      </BrowserResultWindow>
      <FocusBadge number={2} x={RESULT_COL_X + RESULT_COL_W / 2} y={BODY_Y + WINDOW_HEADER_H + (TOP_H - WINDOW_HEADER_H) / 2} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "svg 코드 몇 줄이 그림으로", body: "circle·rect 같은 도형 코드가 그대로 그림이 됩니다." },
          { number: 2, head: "브라우저가 그려서 보여줌", body: "svg 코드를 브라우저가 읽어서 화면에 그립니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · "html이 뭔가요?" — html 파일 작성 -> 크롬으로 열기 -> 웹페이지로 보임 (real UI, not boxes+arrows)
// ------------------------------------------------------------------------------------------------

const Slide08: React.FC = () => {
  const y = BODY_Y;
  const h = TOP_H;
  const w = colW(12);
  const arrowW = 64;
  const panelW = (w - arrowW * 2 - 48) / 3;
  const p1x = colX(0);
  const a1x = p1x + panelW + 8;
  const p2x = a1x + arrowW + 8;
  const a2x = p2x + panelW + 8;
  const p3x = a2x + arrowW + 8;

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="HTML 구조">
      <CodeWindow
        x={p1x}
        y={y}
        width={panelW}
        height={h}
        title="poster.html 작성"
        lines={[
          { text: "<h1>강아지 자전거 포스터</h1>", tone: "normal" },
          { text: "<img src=\"자전거_강아지.svg\">", tone: "dim" },
        ]}
      />
      <div style={{ position: "absolute", left: a1x, top: y + h / 2 - 20, width: arrowW, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Glyph name="arrow-right" size={40} color={COLORS.ink3} />
      </div>
      <CompareCard x={p2x} y={y} w={panelW} h={h} label="크롬으로 열기" desc="더블클릭 또는 실행." icon={<BrowserGlyph size={100} />} accentText />
      <div style={{ position: "absolute", left: a2x, top: y + h / 2 - 20, width: arrowW, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Glyph name="arrow-right" size={40} color={COLORS.ink3} />
      </div>
      <BrowserResultWindow x={p3x} y={y} width={panelW} height={h} title="poster.html — Chrome">
        <ShotFill src={SHOT_POSTER} />
      </BrowserResultWindow>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "html = 웹페이지를 적어두는 코드", body: "파일 자체는 글자로 된 코드입니다." },
          { number: "!", head: "여는 도구에 따라 다른 모습", body: "메모장으로 열면 글자 코드, 크롬으로 열면 우리가 아는 웹페이지 모습입니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 09 · "포스터 만들기" — 실습 3 요청
// ------------------------------------------------------------------------------------------------

const Slide09: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const t = terminalIllo({ x: illoX, y: BODY_Y, w: illoW, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(2), inputText: "그 강아지를 가지고 html로 간단한 포스터를 만들어서 크롬으로 열어줘" });
  const b1 = t.spotForInput();

  return (
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="포스터 만들기">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "\"그 강아지\" = 방금 만든 그림", body: "앞에서 만든 자전거_강아지.svg를 가리킵니다." },
          { number: 2, head: "있는 그림을 재료로 재사용", body: "방금 만든 svg 그림을 새로 그리지 않고 그대로 가져다 씁니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 10 · "크롬이 열립니다" — 실습 3 결과 (poster.html)
// ------------------------------------------------------------------------------------------------

const Slide10: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "그 강아지를 가지고 html로 간단한 포스터를 만들어서 크롬으로 열어줘" },
    { role: "assistant", text: "Write(poster.html)" },
    { role: "assistant", text: "Bash(start poster.html)" },
    { role: "assistant", text: "포스터가 열렸어용용!" },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(3), turns });
  const b1 = t.spotForTurn(0);

  return (
    <SlideFrame index={10} total={TOTAL} eyebrow={EYEBROW} title="크롬이 열립니다">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <BrowserResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="poster.html — Chrome">
        <ShotFill src={SHOT_POSTER} />
      </BrowserResultWindow>
      <FocusBadge number={2} x={RESULT_COL_X + RESULT_COL_W / 2} y={BODY_Y + WINDOW_HEADER_H + (TOP_H - WINDOW_HEADER_H) / 2} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "Bash로 자동 실행까지", body: "파일을 만들고 나서 Bash 툴로 크롬까지 자동으로 열었습니다." },
          { number: 2, head: "만든 그림을 포스터 소재로", body: "직접 그린 자전거 강아지 svg가 포스터 안에 그대로 들어갑니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 11 · "이번엔 프로그램" — 문서·그림·웹페이지 -> 눌러서 실행하는 프로그램, 새 도구 = Python + tkinter
// ------------------------------------------------------------------------------------------------

const AppWindowGlyph: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 64 52">
    <rect x="2" y="2" width="60" height="48" rx="6" fill="#ffffff" stroke={COLORS.accent} strokeWidth={3.5} />
    <line x1="2" y1="16" x2="62" y2="16" stroke={COLORS.accent} strokeWidth={3.5} />
  </svg>
);

const Slide11: React.FC = () => {
  const y = BODY_Y;
  const h = TOP_H;
  const gap = 40;
  const w = colW(12);
  const cardW = (w - gap) / 2;
  return (
    <SlideFrame index={11} total={TOTAL} eyebrow={EYEBROW} title="이번엔 프로그램">
      <CompareCard x={colX(0)} y={y} w={cardW} h={h} label="지금까지" desc="문서(md) · 그림(svg) · 웹페이지(html)" icon={<FileGlyphBig size={88} tone={COLORS.ink2} />} />
      <CompareCard x={colX(0) + cardW + gap} y={y} w={cardW} h={h} label="이번엔" desc="눌러서 실행하는 프로그램" icon={<AppWindowGlyph size={100} />} accentText />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "언어 — 파이썬 (Python)", body: "프로그램을 만들 때 쓰는 프로그래밍 언어입니다." },
          { number: 2, head: "도구 — tkinter", body: "파이썬으로 창이 뜨는 프로그램을 만들 때 쓰는 도구입니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 12 · "계산기 만들기" — 실습 4 요청 (Windows 그대로 vs macOS는 버전 확인 프롬프트 먼저)
// Mac tkinter 오류 대비: 링크가 아니라 Claude에게 보낼 프롬프트를 그대로 준다 (CEO 2026-09-18 표준 규칙).
// ------------------------------------------------------------------------------------------------

const Slide12: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const topH12 = TOP_H - 60;
  const cardsY12 = BODY_Y + topH12 + ROW_GAP;
  const cardsH12 = BODY_BOTTOM - cardsY12;
  const t = terminalIllo({ x: illoX, y: BODY_Y, w: illoW, h: topH12, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(3), inputText: "파이썬과 tkinter를 설치해서 간단한 계산기 프로그램 만들어줘" });
  const b1 = t.spotForInput();

  return (
    <SlideFrame index={12} total={TOTAL} eyebrow={EYEBROW} title="계산기 만들기">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <CardRow
        x={colX(0)}
        y={cardsY12}
        width={colW(12)}
        height={cardsH12}
        items={[
          { number: 1, head: "Windows는 그대로 입력", body: "설치부터 실행까지 한 번에 진행됩니다. 추가로 할 일이 없습니다." },
          {
            number: 2,
            head: "macOS 미실행 시 대응",
            body: "Claude에게 이렇게 보내세요:",
            code: "맥북에서 tkinter 창이 제대로 안 떠. python3 --version 으로 파이썬 버전을 확인하고, 그 버전에 맞는 python-tk 를 brew 로 설치한 다음(예: brew install python-tk@3.12) 계산기를 다시 실행해줘",
          },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 13 · "창이 뜹니다" — 실습 4 결과 (calculator.py)
// ------------------------------------------------------------------------------------------------

const Slide13: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "파이썬과 tkinter를 설치해서 간단한 계산기 프로그램 만들어줘" },
    { role: "assistant", text: "Write(calculator.py)" },
    { role: "assistant", text: "Bash(python calculator.py)" },
    { role: "assistant", text: "계산기 창이 열렸습니다." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(4), turns });
  const b1 = t.spotForTurn(0);

  return (
    <SlideFrame index={13} total={TOTAL} eyebrow={EYEBROW} title="창이 뜹니다">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="계산기">
        <CalculatorMock width={RESULT_COL_W} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <FocusBadge number={2} x={RESULT_COL_X + 40} y={BODY_Y + WINDOW_HEADER_H + 40} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "생성부터 실행까지 한 번에", body: "Write로 파일을 만들고 Bash로 바로 실행합니다." },
          { number: 2, head: "진짜 눌러지는 프로그램", body: "마우스로 눌러서 실제로 계산할 수 있는 프로그램입니다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 14 · "같은 방식으로 테트리스" — 실습 5 요청+결과 (tetris.py, 같은 SVG 안에서 함께 보여줌)
// ------------------------------------------------------------------------------------------------

const Slide14: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "같은 방식으로 간단한 테트리스 만들어줘" },
    { role: "assistant", text: "Write(tetris.py)" },
    { role: "assistant", text: "Bash(python tetris.py)" },
    { role: "assistant", text: "테트리스 창이 열렸습니다." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: explorerUpTo(5), turns });
  const b1 = t.spotForTurn(0);

  return (
    <SlideFrame index={14} total={TOTAL} eyebrow={EYEBROW} title="같은 방식으로 테트리스">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="테트리스" theme="dark">
        <TetrisV1Board width={RESULT_COL_W} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <FocusBadge number={2} x={RESULT_COL_X + RESULT_COL_W * 0.32} y={BODY_Y + TOP_H / 2} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "같은 방식으로 또 요청", body: "\"같은 방식으로\"라고만 해도 새 프로그램을 또 만들어줍니다." },
          { number: 2, head: "게임도 코드로 제작 가능", body: "파이썬 파일 하나로 테트리스도 바로 실행됩니다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S2_WRITE: SlideEntry[] = [
  { index: 1, name: "write_툴_이란", title: "Write 툴", render: () => React.createElement(Slide01) },
  { index: 2, name: "write_md_란", title: "마크다운 파일", render: () => React.createElement(Slide02) },
  { index: 3, name: "write_md_요청", title: "자기소개서 만들기", render: () => React.createElement(Slide03) },
  { index: 4, name: "write_md_결과", title: "파일이 생겼습니다", render: () => React.createElement(Slide04) },
  { index: 5, name: "write_svg_란", title: "SVG 벡터 그림", render: () => React.createElement(Slide05) },
  { index: 6, name: "write_svg_요청", title: "강아지 그리기", render: () => React.createElement(Slide06) },
  { index: 7, name: "write_svg_결과", title: "코드가 그림이 됩니다", render: () => React.createElement(Slide07) },
  { index: 8, name: "write_html_란", title: "HTML 구조", render: () => React.createElement(Slide08) },
  { index: 9, name: "write_html_요청", title: "포스터 만들기", render: () => React.createElement(Slide09) },
  { index: 10, name: "write_html_결과", title: "크롬이 열립니다", render: () => React.createElement(Slide10) },
  { index: 11, name: "write_python_란", title: "이번엔 프로그램", render: () => React.createElement(Slide11) },
  { index: 12, name: "write_계산기_요청", title: "계산기 만들기", render: () => React.createElement(Slide12) },
  { index: 13, name: "write_계산기_결과", title: "창이 뜹니다", render: () => React.createElement(Slide13) },
  { index: 14, name: "write_테트리스", title: "같은 방식으로 테트리스", render: () => React.createElement(Slide14) },
];

export const S2_WRITE_PART: PartSpec = { id: "s2-write", eyebrow: EYEBROW, entries: S2_WRITE };
