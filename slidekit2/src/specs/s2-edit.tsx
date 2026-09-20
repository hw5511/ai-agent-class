// s2-edit — basic 2회차 슬라이드 61~67 (7장). Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step02/edit_*.svg) into this renderer.
//
// Content source: assets/basic/step02/edit_*.svg (exact wording/commands) + courses/basic/step02.json
// slide entries for edit_* (goal/topics/practice/action).
//
// This part continues the SAME agent1 practice session as the write part (테트리스/포스터 files already
// exist from write). Per the CEO direction log (step02 README, 2026-09-18): result slides use a real
// Claude Code run's tool-call output (Read/Edit lines), the actual before/after result shown large on the
// right (real screenshots for html, a hand-drawn-from-layout mock for the tkinter tetris game), and
// annotation cards laid out horizontally below — the same layout step02-write.tsx already built and had
// approved for its own 07/08 "edit 실습" slides. Per the worker guide ("nothing shared is edited"), the
// needed pieces (terminal+VSCodeScreen illo helper, card row, result window chrome, the tetris mock) are
// local copies in this file, not imports from another spec file.
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

const EYEBROW = "EDIT 툴";
const TOTAL = 7;

const WINDOW_HEADER_H = 34; // AppWindow native windowHeader (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // reserved inside the terminal's own left padding so badges sit on the line.

// ------------------------------------------------------------------------------------------------
// Two-row body layout (same math as step02-write.tsx's own local copy): top row = terminal (left) +
// result (right, as large as possible); bottom row = annotation cards laid out horizontally.
// ------------------------------------------------------------------------------------------------
const ROW_GAP = 28;
const TOP_H = 512;
const CARDS_Y = BODY_Y + TOP_H + ROW_GAP;
const CARDS_H = BODY_BOTTOM - CARDS_Y;

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

// Files already sitting in agent1 from the write part's own practice session, in creation order.
const ALL_FILES = ["self_introduction.md", "dog_on_bike.svg", "poster.html", "calculator.py", "tetris.py"];
const EXPLORER_ALL: ExplorerNode[] = ALL_FILES.map((name) => ({ name, kind: "file", depth: 0 }));

function terminalIllo(opts: { x: number; y: number; w: number; h: number; windowH: number; explorerNodes: ExplorerNode[]; turns?: ClaudeCodeTurn[]; inputText?: string }) {
  const { x, y, w, h, windowH, explorerNodes, turns, inputText } = opts;
  const { windowNative, focus, view } = windowGeometry(w, h, windowH);
  const termW = rightTermWidth(windowNative);
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: turns ?? [], inputText, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });
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
          terminalContent={<ClaudeCodeTerminal width={termW} turns={turns} inputText={inputText} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
          mainMode="empty"
        />
      </Camera>
    </div>
  );
  return { node, spotForTurn };
}

// ------------------------------------------------------------------------------------------------
// Horizontal bottom card row — local copy of step02-write.tsx's own CardRow (annotation cards laid out
// side by side instead of stacked, per the CEO's 2026-09-18 layout direction).
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
// Result window chrome — same two variants step02-write.tsx uses: a Chrome-style window for html, a
// native Windows app titlebar for the tkinter tetris game.
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

// Real screenshots already published for the write part (write_practice/shots/*.png -> public/slides/write/).
const SHOT_POSTER = staticFile("slides/write/poster.png");
const SHOT_POSTER_GREEN = staticFile("slides/write/poster_green.png");

const ShotFill: React.FC<{ src: string; bg?: string }> = ({ src, bg = "#ffffff" }) => (
  <div style={{ width: "100%", height: "100%", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
  </div>
);

// ------------------------------------------------------------------------------------------------
// tetris.py mock — same tetromino layout/colors as step02-write.tsx's own local copy (tetris_layout.json
// / tetris_v1_layout.json from the real practice session), hand-drawn since it is a native tkinter window.
// ------------------------------------------------------------------------------------------------

const TET_COLORS = { I: "#26e5ff", O: "#ffe14d", T: "#c869ff", S: "#57e37f", Z: "#ff5c6c", J: "#5b7bff", L: "#ff9d3d" };
const TET_COLORS_V1 = { I: "#00bcd4", O: "#ffeb3b", T: "#9c27b0", S: "#4caf50", Z: "#f44336", J: "#3f51b5", L: "#ff9800" };

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
// Shared compare-card look for slide 01 (Write vs Edit) — local, not imported from step02-write.tsx.
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

// ------------------------------------------------------------------------------------------------
// 01 · edit_툴_이란 — "Write와 Edit 차이" (shipped SVG "고치는 방법이 다릅니다": WRITE/EDIT 카드 비교 +
// 3단계 진행: 파일 읽기 → 고칠 부분 찾기 → 그 부분만 교체)
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const illoY = BODY_Y;
  const cardH = 360;
  const leftX = colX(0);
  const leftW = colW(12);
  const gap = 40;
  const cardW = (leftW - gap) / 2;
  const writeX = leftX;
  const editX = leftX + cardW + gap;

  const stepsY = illoY + cardH + 40;
  const stepsH = BODY_BOTTOM - stepsY;
  const stepGap = 24;
  const stepW = (leftW - stepGap * 2) / 3;
  const steps = [
    { label: "파일 읽기", desc: "먼저 지금 내용을 확인한다." },
    { label: "고칠 부분 찾기", desc: "바뀌어야 할 곳만 짚어낸다." },
    { label: "그 부분만 교체", desc: "나머지는 그대로 둔다." },
  ];

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="Write와 Edit 차이">
      <CompareCard
        x={writeX}
        y={illoY}
        w={cardW}
        h={cardH}
        label="Write"
        desc="새로 쓰거나 통째로 덮어쓴다. 파일이 없으면 새로 만들고, 있으면 전체를 다시 쓴다."
        icon={
          <div style={{ position: "relative", width: 76, height: 76 }}>
            <FileGlyphBig size={76} tone={COLORS.ink2} />
            <div style={{ position: "absolute", left: 46, top: 46, width: 28, height: 28, borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={14} height={14} viewBox="0 0 24 24">
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
        desc="필요한 부분만 고친다. 파일이 이미 있어야 하고, 달라지는 부분 말고는 그대로 남는다."
        icon={
          <div style={{ position: "relative", width: 76, height: 76 }}>
            <FileGlyphBig size={76} tone={COLORS.ink2} />
            <div style={{ position: "absolute", left: 46, top: 46, width: 28, height: 28, borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={15} height={15} viewBox="0 0 24 24">
                <path d="M4 20 L4.8 15.6 L16.2 4.2 C17 3.4 18.3 3.4 19.1 4.2 L19.8 4.9 C20.6 5.7 20.6 7 19.8 7.8 L8.4 19.2 Z M14.5 6 L18 9.5" fill="none" stroke="#ffffff" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        }
      />
      <FocusBadge number={1} x={writeX + cardW - 24} y={illoY + 24} size={30} />
      <FocusBadge number={2} x={editX + cardW - 24} y={illoY + 24} size={30} />

      {steps.map((s, i) => (
        <div
          key={s.label}
          style={{
            position: "absolute",
            left: leftX + i * (stepW + stepGap),
            top: stepsY,
            width: stepW,
            height: stepsH,
            boxSizing: "border-box",
            background: COLORS.accentWash,
            border: `1px solid ${COLORS.accent}`,
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "0 20px",
          }}
        >
          <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 26, color: COLORS.accentDeep }}>{`${i + 1}. ${s.label}`}</span>
          <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 19, color: COLORS.accentDeep, textAlign: "center", wordBreak: "keep-all" }}>{s.desc}</span>
        </div>
      ))}
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · edit_왜_중요한가 — "만들고 보고 고치기 반복" (shipped SVG: 한 번에 완벽한 결과는 안 나온다 →
// 만들고 → 보고 → 고치고 를 반복한다. 3단계 순환 루프로 표현.)
// ------------------------------------------------------------------------------------------------

const LOOP_STEPS = [
  { label: "만들고", desc: "Write 로 처음 결과물을 만든다." },
  { label: "보고", desc: "결과를 직접 확인한다." },
  { label: "고치고", desc: "Edit 로 필요한 부분만 다듬는다." },
];

const Slide02: React.FC = () => {
  const cx = colX(0) + colW(12) / 2;
  const cy = BODY_Y + 300;
  const r = 260;
  const nodeR = 130;

  const nodePos = (i: number) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="만들고 보고 고치기 반복">
      <svg style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, pointerEvents: "none" }}>
        {[0, 1, 2].map((i) => {
          const a = nodePos(i);
          const b = nodePos((i + 1) % 3);
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ux = dx / dist;
          const uy = dy / dist;
          const startX = a.x + ux * (nodeR + 6);
          const startY = a.y + uy * (nodeR + 6);
          const endX = b.x - ux * (nodeR + 26);
          const endY = b.y - uy * (nodeR + 26);
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
          const nx = -uy;
          const ny = ux;
          const bow = 46;
          const ctrlX = midX + nx * bow;
          const ctrlY = midY + ny * bow;
          const angle = (Math.atan2(endY - ctrlY, endX - ctrlX) * 180) / Math.PI;
          return (
            <g key={i}>
              <path d={`M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`} fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" />
              <path d="M -16 -10 L 6 0 L -16 10 Z" fill={COLORS.accent} transform={`translate(${endX}, ${endY}) rotate(${angle})`} />
            </g>
          );
        })}
      </svg>

      {LOOP_STEPS.map((s, i) => {
        const p = nodePos(i);
        return (
          <div
            key={s.label}
            style={{
              position: "absolute",
              left: p.x - nodeR,
              top: p.y - nodeR,
              width: nodeR * 2,
              height: nodeR * 2,
              borderRadius: "50%",
              background: COLORS.accentWash,
              border: `3px solid ${COLORS.accent}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxSizing: "border-box",
              padding: "0 24px",
            }}
          >
            <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 36, color: COLORS.accentDeep }}>{`${i + 1}. ${s.label}`}</span>
            <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 19, color: COLORS.accentDeep, textAlign: "center", wordBreak: "keep-all" }}>{s.desc}</span>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: colX(0),
          top: BODY_BOTTOM - 90,
          width: colW(12),
          height: 90,
          boxSizing: "border-box",
          background: COLORS.paper2,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
        }}
      >
        <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 24, color: COLORS.ink2, wordBreak: "keep-all" }}>
          한 번에 완벽한 결과는 나오지 않는다 — 이 세 단계를 반복하며 완성해 간다.
        </span>
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · edit_테트리스_요청 — "테트리스 개선 요청" ('테트리스에 시작 버튼을 추가하고, 블록을 좀 더
// 입체적이게 만들고, 화면을 좀 더 키워서 전체적으로 세련되게 디자인해줘')
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [{ role: "user", text: "테트리스에 시작 버튼을 추가하고, 블록을 좀 더 입체적이게 만들고, 화면을 좀 더 키워서 전체적으로 세련되게 디자인해줘" }];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: EXPLORER_ALL, turns });
  const b1 = t.spotForTurn(0);

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="테트리스 개선 요청">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="tetris.py" theme="dark">
        <TetrisV1Board width={RESULT_COL_W} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <FocusBadge number={2} x={RESULT_COL_X + RESULT_COL_W * 0.3} y={BODY_Y + TOP_H / 2} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "시작 버튼 추가", body: "지금은 버튼 없이 바로 시작하는 상태다." },
          { number: 2, head: "블록 입체화", body: "지금은 밋밋한 사각형 블록이다." },
          { number: 3, head: "화면 확대 및 정리", body: "한 문장에 여러 요청을 담아도 순서대로 처리한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · edit_테트리스_진행 — "Read Edit 작업 로그" (shipped SVG: Read(tetris.py) → Edit(tetris.py) x3,
// 파일 전체가 아니라 달라지는 부분만 표시된다.)
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "assistant", text: "Read(tetris.py)" },
    { role: "assistant", text: "Edit(tetris.py) — 시작 버튼 추가" },
    { role: "assistant", text: "Edit(tetris.py) — 블록 베벨 효과" },
    { role: "assistant", text: "Edit(tetris.py) — 셀 크기 확대" },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: EXPLORER_ALL, turns });
  const b1 = t.spotForTurn(0);
  const b2 = t.spotForTurn(1);

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="Read Edit 작업 로그">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} title="tetris.py" theme="dark">
        <TetrisMock width={RESULT_COL_W} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "Read 로 내용 확인", body: "고치기 전에 파일 내용부터 확인한다." },
          { number: 2, head: "Edit 를 여러 번 나눠 적용", body: "요청 세 가지가 각각 다른 Edit 호출로 처리된다." },
          { number: "!", head: "파일 전체 재작성 없음", body: "바뀌는 줄만 추가·삭제로 표시된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · edit_테트리스_결과 — "테트리스 개선 전후" (shipped SVG: 이전(버튼 없음·밋밋한 사각형·작은 화면)
// vs 이후(시작 버튼·입체 블록·커진 화면), before/after 나란히 비교)
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [{ role: "assistant", text: "tetris.py를 업데이트했습니다: 시작 버튼과 사이드 패널 추가, 블록 베벨 효과, 셀 확대." }];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: EXPLORER_ALL, turns });

  const beforeW = Math.round(RESULT_COL_W * 0.28);
  const afterW = RESULT_COL_W - beforeW - 20;
  const afterX = RESULT_COL_X + beforeW + 20;

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="테트리스 개선 전후">
      {t.node}
      <NativeAppResultWindow x={RESULT_COL_X} y={BODY_Y} width={beforeW} height={TOP_H} title="이전" theme="dark">
        <TetrisV1Board width={beforeW} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <NativeAppResultWindow x={afterX} y={BODY_Y} width={afterW} height={TOP_H} title="이후" theme="dark">
        <TetrisMock width={afterW} height={TOP_H - WINDOW_HEADER_H} />
      </NativeAppResultWindow>
      <FocusBadge number={1} x={RESULT_COL_X + beforeW - 20} y={BODY_Y + 20} size={30} />
      <FocusBadge number={2} x={afterX + afterW - 20} y={BODY_Y + 20} size={30} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "이전 — 버튼 없음·밋밋한 사각형·작은 화면", body: "tetris.py 의 원래 모습이다." },
          { number: 2, head: "이후 — 시작 버튼·입체 블록·커진 화면", body: "같은 테트리스인데 달라진 부분이 한눈에 보인다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · edit_포스터_요청 — "포스터 초록 테마 변경" ('강아지 포스터에서 색상을 초록색 테마로 바꾸고
// 크롬으로 열어줘', 이전/이후 크롬 화면 비교)
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => {
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "강아지 포스터에서 색상을 초록색 테마로 바꾸고 크롬으로 열어줘" },
    { role: "assistant", text: "Update(poster.html)" },
    { role: "assistant", text: "초록색 테마로 poster_green.html 파일을 새로 저장했습니다." },
  ];
  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: EXPLORER_ALL, turns });
  const b1 = t.spotForTurn(0);

  const beforeW = Math.round(RESULT_COL_W * 0.48);
  const afterW = RESULT_COL_W - beforeW - 20;
  const afterX = RESULT_COL_X + beforeW + 20;

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="포스터 초록 테마 변경">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <BrowserResultWindow x={RESULT_COL_X} y={BODY_Y} width={beforeW} height={TOP_H} title="poster.html">
        <ShotFill src={SHOT_POSTER} bg="#bcd7f2" />
      </BrowserResultWindow>
      <BrowserResultWindow x={afterX} y={BODY_Y} width={afterW} height={TOP_H} title="poster_green.html">
        <ShotFill src={SHOT_POSTER_GREEN} bg="#bfe3c4" />
      </BrowserResultWindow>
      <FocusBadge number={2} x={afterX + afterW / 2} y={BODY_Y + WINDOW_HEADER_H + (TOP_H - WINDOW_HEADER_H) / 2} size={36} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "색상만 바꿔달라고 요청", body: "새로 만드는 게 아니라 있던 포스터 파일을 고치는 것이다." },
          { number: 2, head: "구조는 그대로, 색상만 초록으로", body: "poster.html 의 색상 코드만 바뀌고 나머지는 그대로다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · edit_정리 — "Edit 툴 정리" (shipped SVG: 4개 체크 항목 + /clear 로 다음 실습으로)
// ------------------------------------------------------------------------------------------------

const SUMMARY_ITEMS = [
  "Write 는 새로 만들기, Edit 는 있는 것 고치기",
  "고칠 부분만 바뀌고 나머지는 그대로",
  "만들고 → 보고 → 고치고 반복",
  "코드 몰라도 말로 수정 가능",
];

const Slide07: React.FC = () => {
  const x = colX(0);
  const w = colW(12);
  const listY = BODY_Y;
  const rowH = 82;
  const rowGap = 16;
  const clearY = listY + SUMMARY_ITEMS.length * (rowH + rowGap) + 20;
  const clearH = BODY_BOTTOM - clearY;

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="Edit 툴 정리">
      {SUMMARY_ITEMS.map((line, i) => (
        <div
          key={line}
          style={{
            position: "absolute",
            left: x,
            top: listY + i * (rowH + rowGap),
            width: w,
            height: rowH,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "0 32px",
            background: COLORS.paper2,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 14,
          }}
        >
          <div
            style={{
              flex: "0 0 auto",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: COLORS.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: 19,
              color: "#ffffff",
            }}
          >
            {i + 1}
          </div>
          <span style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 25, color: COLORS.ink, wordBreak: "keep-all" }}>{line}</span>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: x,
          top: clearY,
          width: w,
          height: clearH,
          boxSizing: "border-box",
          background: COLORS.accentWash,
          border: `1px solid ${COLORS.accent}`,
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8,
          padding: "0 32px",
        }}
      >
        <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.accentDeep }}>/clear 로 정리하고 다음 실습으로</span>
        <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 22, color: COLORS.accentDeep, wordBreak: "keep-all" }}>
          /clear 는 지금 채팅방을 나가고 새 채팅방으로 가는 것이다.
        </span>
      </div>
    </SlideFrame>
  );
};

export const S2_EDIT: SlideEntry[] = [
  { index: 1, name: "edit_툴_이란", title: "Write와 Edit 차이", render: () => React.createElement(Slide01) },
  { index: 2, name: "edit_왜_중요한가", title: "만들고 보고 고치기 반복", render: () => React.createElement(Slide02) },
  { index: 3, name: "edit_테트리스_요청", title: "테트리스 개선 요청", render: () => React.createElement(Slide03) },
  { index: 4, name: "edit_테트리스_진행", title: "Read Edit 작업 로그", render: () => React.createElement(Slide04) },
  { index: 5, name: "edit_테트리스_결과", title: "테트리스 개선 전후", render: () => React.createElement(Slide05) },
  { index: 6, name: "edit_포스터_요청", title: "포스터 초록 테마 변경", render: () => React.createElement(Slide06) },
  { index: 7, name: "edit_정리", title: "Edit 툴 정리", render: () => React.createElement(Slide07) },
];

export const S2_EDIT_PART: PartSpec = { id: "s2-edit", eyebrow: EYEBROW, entries: S2_EDIT };
