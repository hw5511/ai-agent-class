// step02 "READ 툴" — 10-slide spec, mapped 1:1 to the CEO's lesson outline
// (ai-agent-class/_drafts/basic_step02_outline.md, section "3. read툴 이란?"). Slide 01 = the "read 툴
//이란?" explainer (mirrors step02-claudemd.tsx Slide01's "card + arrow + agent" layout, with file icons
// instead of the CLAUDE.md card). Slides 02-10 = 실습 1-7 in the outline's own order; outline item 6 ("위에
// 4번처럼 순차적으로 슬라이드 분할") is split into two sequential slides exactly as instructed, mirroring
// items 4/5's own drag-drop -> answer-check-and-rename pair. Every slide where Claude runs reuses the
// shared ../ClaudeCodeTerminal mock (dark VS Code, panel position = right, per the class's own setting).
import React from "react";
import { staticFile } from "remotion";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { Camera, cameraView } from "../core/Camera";
import { FileIcon } from "../core/glyphs";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "READ 툴";
const TOTAL = 10;

const WINDOW_HEADER_H = 34; // NATIVE.windowHeader (../core/native.ts) — AppWindow's own native title bar height.
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.

// ExplorerPane's own row metrics (VSCodeScreen.tsx module-local consts, not exported — mirrored here the
// same way step02-claudemd.tsx mirrors WINDOW_HEADER_H/TERM_TAB_H) so badges can land on a specific
// explorer row's text without covering it.
const EXPLORER_TITLE_H = 26; // "EXPLORER" label row
const EXPLORER_ROOT_ROW_H = 36; // VSCodeScreen HEADER_ROW_H
const EXPLORER_ROW_H = 30; // VSCodeScreen ROW_H

// Targets the row's own icon (not the filename text) so the badge never covers a letter regardless of
// name length — matches how the New Folder/New File icon badges in step02-claudemd.tsx point at a
// specific icon glyph, not text. 2026-09-18 render review (defect A): this originally omitted
// WINDOW_HEADER_H (the AppWindow native title bar the whole VSCodeScreen renders inside) from `y`, which
// landed every badge one row too high — visually on the row ABOVE the intended one (e.g. on "AGENT1"
// instead of the first child row).
function explorerRowCenter(depth: number, index: number, iconInset = 6): { x: number; y: number } {
  return {
    x: ACTIVITY_W + 12 + depth * 16 + iconInset,
    y: WINDOW_HEADER_H + EXPLORER_TITLE_H + EXPLORER_ROOT_ROW_H + index * EXPLORER_ROW_H + EXPLORER_ROW_H / 2,
  };
}

// ------------------------------------------------------------------------------------------------
// Shared helpers (mirrors step02-claudemd.tsx's own copies — each part file owns its own, see
// specs/README.md: workers never need to touch another part's file).
// ------------------------------------------------------------------------------------------------

function windowGeometry(illoW: number, illoH: number, windowH = 480) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

// 2026-09-18 Yuki review (defect A, this pass): the CEO asked for the real photo shown "in the middle" —
// at the old editorImage frac (0.7, sidebarWidth=SIDEBAR_W) the editor column was only ~178px, so the
// photo rendered ~160px wide. Slides 07/08 now pass a narrower Explorer (READ_IMG_SIDEBAR_W, via
// VSCodeScreen's new sidebarWidth prop) AND a smaller terminal frac to free up editor-column width;
// `sidebarWidth` param lets this helper's contentW math track that override (default stays SIDEBAR_W so
// every other call site is unaffected).
function rightTermWidth(windowNative: { w: number }, mainMode: "empty" | "editor" | "editorImage" = "empty", sidebarWidth: number = SIDEBAR_W): number {
  const contentW = windowNative.w - ACTIVITY_W - sidebarWidth;
  // "editorImage" still keeps the terminal wider than "editor" (0.56 vs 0.62) because the live input line
  // is a single non-wrapping box — @IMG_20260309_134502.jpg's own filename is longer than the .txt slides'
  // — but far less than the old 0.7 now that the ask text was dropped from the live input (see Slide07).
  const frac = mainMode === "empty" ? 0.84 : mainMode === "editorImage" ? 0.56 : 0.62;
  return Math.round(contentW * frac);
}

// Narrower Explorer for slides 07/08 only (CEO 2026-09-18: real photo needs a wider editor column; the
// Explorer can afford to give some of it up). Verified against the longest row name in these two slides,
// "IMG_20260309_134502.jpg" (24 ASCII chars @ fontSize 13 ~= 175-185px) + its icon/indent/padding — kept
// with margin so ExplorerPane's new ellipsis safety (VSCodeScreen.tsx) never actually has to trigger.
const READ_IMG_SIDEBAR_W = 245;

const BADGE_GUTTER = 44;
const TERM_WINDOW_H = 620;

// ClaudeCodeTerminal's own left inset before any line content: PAD_H(16, module-local const in
// ../ClaudeCodeTerminal.tsx, not exported) + leftGutter (BADGE_GUTTER here) — mirrors how this file
// already mirrors other ClaudeCodeTerminal/VSCodeScreen module-local metrics (see EXPLORER_ROW_H etc.
// above). Used below to land the drag cue's arrival point ON the live input box's own left edge (the
// "> " prompt glyph), not just outside the terminal panel.
const TERM_PAD_H = 16;

// 2026-09-18 Yuki review (defect B): the drag cue used to stop just outside the terminal panel's left
// border, reading as "dropped into empty space above the photo/editor" instead of showing the real
// drag-into-the-chat motion. `paneLeft` = windowNative.w - termW (the terminal panel's native left edge).
function dragEndAtInput(paneLeft: number, inputCenterY: number): { x: number; y: number } {
  return { x: paneLeft + TERM_PAD_H + BADGE_GUTTER + 8, y: inputCenterY };
}

// Real practice photo (CEO 2026-09-18 feedback: show the actual image, not a placeholder) — copied from
// ai-agent-class/assets/basic/step02/practice/_tmp/IMG_20260309_134502.jpg (also the file inside
// read_practice.zip's practice_files/) into this deck's public/slides/read/.
const PRACTICE_PHOTO = staticFile("slides/read/IMG_20260309_134502.jpg");

// Real excerpt from practice_files/doc_230928_v3.txt (inside read_practice.zip) — short, faithful lines
// for the editor-tab preview on slides 05-06 (CEO feedback: show real file content, not filler).
const DOC_EXCERPT_LINES = ["2026년 3월 9일 회의록", "", "참석자: 이팀장, 박대리, 김주임, 최인턴", "", "안건 1. Q1 실적 검토", "- 매출 12% 증가"];

// ------------------------------------------------------------------------------------------------
// Drag cue (CEO 2026-09-18 feedback: "드래그하는 마우스의 선도 보여주고") — a curved dashed accent line
// from the dragged explorer row to a spot just outside the terminal's left edge (never inside the
// terminal's own text/input area, so it never covers readable text), plus a mouse-pointer icon at the
// arrival end. Local to this file only (spec README: shared components live in ../*.tsx, not here).
// ------------------------------------------------------------------------------------------------

const MouseCursorIcon: React.FC<{ x: number; y: number; size?: number }> = ({ x, y, size = 30 }) => (
  <svg
    style={{ position: "absolute", left: x - size * 0.08, top: y - size * 0.05, width: size, height: size * 1.375, filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))" }}
    viewBox="0 0 16 22"
  >
    <path d="M1 1 L1 18.4 L5.2 14.6 L8 20.9 L10.5 19.7 L7.7 13.5 L13.4 13.5 Z" fill="#ffffff" stroke="#14161a" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

// `start`/`end`/`controlY` all in absolute frame px (1920x1080, same space as FocusBadge x/y). The curve
// bows toward `controlY` (pass a y near the top of the editor pane, clear of any centered image/text) so
// it reads as "dragged up and over" rather than cutting straight across the middle of the screen.
const DragCue: React.FC<{ start: { x: number; y: number }; end: { x: number; y: number }; controlY: number }> = ({ start, end, controlY }) => {
  const ctrlX = (start.x + end.x) / 2;
  return (
    <>
      <svg style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, pointerEvents: "none" }} viewBox="0 0 1920 1080">
        <path
          d={`M ${start.x} ${start.y} Q ${ctrlX} ${controlY} ${end.x} ${end.y}`}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={3.5}
          strokeDasharray="3 12"
          strokeLinecap="round"
          opacity={0.85}
        />
        <circle cx={start.x} cy={start.y} r={7} fill={COLORS.accent} stroke="#ffffff" strokeWidth={2} />
      </svg>
      <MouseCursorIcon x={end.x} y={end.y} />
    </>
  );
};

// ------------------------------------------------------------------------------------------------
// 01 · READ_툴_란 — "파일을 대신 읽어주는 도구" (같은 카드+화살표+에이전트 구도, CLAUDE.md 카드 대신 파일 아이콘)
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const leftX = colX(0);
  const leftW = colW(5);
  const illoX = colX(5);
  const illoY = BODY_Y;
  const illoW = colW(7);
  const illoH = BODY_BOTTOM - BODY_Y;

  const cardW = 460;
  const cardH = 660;
  const cardX = illoX + 30;
  const cardY = illoY + (illoH - cardH) / 2;

  const rows: Array<{ kind: "doc" | "photo" | "zip"; name: string }> = [
    { kind: "doc", name: "doc_230928_v3.txt" },
    { kind: "photo", name: "IMG_20260309_134502.jpg" },
    { kind: "zip", name: "read_practice.zip" },
  ];

  const agentR = 175;
  const agentCx = cardX + cardW + 300;
  const agentCy = cardY + cardH / 2;

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="파일을 대신 읽어주는 도구">
      <AnnotationColumn
        x={leftX}
        y={illoY}
        width={leftW}
        height={illoH}
        items={[
          { number: 1, head: "파일을 열어서 내용을 읽는 도구", body: "텍스트, 문서, 이미지 등 다양한 파일을 연다." },
          { number: 2, head: "내용을 정리해서 알려준다", body: "사람이 하나씩 열어보지 않아도 무슨 내용인지 파악한다." },
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
            padding: "44px 40px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40, flex: "0 0 auto" }}>
            <div style={{ width: 44, height: 44, borderRadius: 9, background: COLORS.accentWash, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
              <svg width={22} height={22} viewBox="0 0 24 24">
                <path d="M4 4 H14 L20 10 V20 H4 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={1.8} strokeLinejoin="round" />
                <path d="M14 4 V10 H20" fill="none" stroke={COLORS.accentDeep} strokeWidth={1.8} strokeLinejoin="round" />
                <path d="M2 8 L2 22 L18 22" fill="none" stroke={COLORS.accentDeep} strokeWidth={1.6} strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 28, color: COLORS.accentDeep }}>practice_files</span>
          </div>
          <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {rows.map((r) => (
              <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <FileIcon kind={r.kind} size={54} />
                <span style={{ fontFamily: FONTS.term, fontWeight: 500, fontSize: 24, color: COLORS.ink, wordBreak: "keep-all" }}>{r.name}</span>
              </div>
            ))}
          </div>
        </div>

        {(() => {
          const ax0 = cardX - illoX + cardW + 20;
          const ax1 = agentCx - illoX - agentR - 20;
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
            left: agentCx - illoX - agentR,
            top: agentCy - illoY - agentR,
            width: agentR * 2,
            height: agentR * 2,
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
          <div style={{ width: 84, height: 84, borderRadius: 20, background: "#ffffff", border: `3.5px solid ${COLORS.accentDeep}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 13, height: 13, borderRadius: "50%", background: COLORS.accentDeep }} />
              <div style={{ width: 13, height: 13, borderRadius: "50%", background: COLORS.accentDeep }} />
            </div>
          </div>
          <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 30, color: COLORS.accentDeep, marginTop: 4 }}>에이전트</span>
        </div>
      </div>

      <FocusBadge number={1} x={cardX + cardW - 8} y={cardY + 6} />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · 실습 1 — "read_practice.zip 다운로드" (agent1 폴더에 압축파일이 새로 도착한 상태)
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const termW = rightTermWidth(windowNative);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = [{ name: "read_practice.zip", kind: "file", depth: 0, state: "new" }];
  const b1 = toFrame(explorerRowCenter(0, 0));

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="read_practice.zip 다운로드">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={explorerNodes} layout="right" terminalWidth={termW} showTerminal mainMode="empty" />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "read_practice.zip 다운로드", body: "수업 자료를 내려받아 agent1 폴더 안에 넣어둔다." },
          { number: "!", head: "아직 압축을 풀지 않은 상태", body: "zip 파일 그대로 agent1 폴더 맨 위에 놓여 있다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · 실습 2 — "압축 풀고 practice_files 펼치기"
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const termW = rightTermWidth(windowNative);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = [
    { name: "practice_files", kind: "folder", depth: 0, state: "selected" },
    { name: "doc_230928_v3.txt", kind: "file", depth: 1 },
    { name: "IMG_20260309_134502.jpg", kind: "file", depth: 1 },
    { name: "report_scan.pdf", kind: "file", depth: 1 },
    { name: "memo.txt", kind: "file", depth: 1 },
    { name: "read_practice.zip", kind: "file", depth: 0 },
  ];
  const b1 = toFrame(explorerRowCenter(0, 0));
  const b2 = toFrame(explorerRowCenter(1, 1));

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="압축 풀고 폴더 펼치기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={explorerNodes} layout="right" terminalWidth={termW} showTerminal mainMode="empty" />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={30} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "압축 풀기", body: "read_practice.zip 을 우클릭해서 압축을 푼다." },
          { number: 2, head: "practice_files 폴더 펼치기", body: "생긴 폴더를 눌러서 안의 파일들을 펼쳐 본다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · 실습 3 — "파일 하나씩 확인 + PDF 확장 설치" (pdf 파일 클릭 시 vscode-pdf 설치 알림)
// ------------------------------------------------------------------------------------------------

const InstallToast: React.FC<{ x: number; y: number; width: number }> = ({ x, y, width }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      boxSizing: "border-box",
      background: "#252526",
      border: "1px solid #3a3d40",
      borderRadius: 8,
      padding: "18px 20px",
      boxShadow: "0 14px 30px rgba(0,0,0,0.45)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}
  >
    <span style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 18, lineHeight: 1.4, color: "#e8eaec", wordBreak: "keep-all" }}>
      이 파일을 열려면 'vscode-pdf' 확장이 필요합니다. 설치할까요?
    </span>
    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
      <div style={{ padding: "6px 14px", borderRadius: 5, background: "transparent", border: "1px solid #4a4d50", color: "#cccccc", fontFamily: FONTS.display, fontWeight: 600, fontSize: 15 }}>취소</div>
      <div style={{ padding: "6px 14px", borderRadius: 5, background: COLORS.accent, color: "#ffffff", fontFamily: FONTS.display, fontWeight: 700, fontSize: 15 }}>Install</div>
    </div>
  </div>
);

const Slide04: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const termW = rightTermWidth(windowNative);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = [
    { name: "practice_files", kind: "folder", depth: 0 },
    { name: "doc_230928_v3.txt", kind: "file", depth: 1 },
    { name: "IMG_20260309_134502.jpg", kind: "file", depth: 1 },
    { name: "report_scan.pdf", kind: "file", depth: 1, state: "selected" },
    { name: "memo.txt", kind: "file", depth: 1 },
  ];
  const b1 = toFrame(explorerRowCenter(1, 3));

  // Toast sits at the illustration box's own bottom-right, in frame-absolute px (drawn on top of the
  // Camera'd screen, like InputBar/AnnotationColumn on other slides — not inside the native transform).
  const toastW = 400;
  const toastX = illoX + illoW - toastW - 28;
  const toastY = illoY + illoH - 150;
  // Badge pinned at the toast card's own corner (same convention as Slide01's card-corner badge) —
  // 2026-09-18 render review (defect B): a badge centered on the small "Install" button's text covered
  // half the label; the card corner reads just as clearly as "this alert -> step 2" without touching text.
  const installBadge = { x: toastX + toastW - 8, y: toastY + 6 };

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="파일 하나씩 확인하기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={explorerNodes} layout="right" terminalWidth={termW} showTerminal mainMode="empty" />
        </Camera>
      </div>

      <InstallToast x={toastX} y={toastY} width={toastW} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      <FocusBadge number={2} x={installBadge.x} y={installBadge.y} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "파일을 하나씩 클릭해서 확인", body: "practice_files 안의 파일을 순서대로 열어본다." },
          { number: 2, head: "PDF 확장 설치 알림 → Install", body: "pdf 파일을 열면 뜨는 vscode-pdf 설치 알림에서 Install 을 누른다." },
          { number: "!", head: "알림을 놓쳤다면 확장 아이콘에서 검색", body: "왼쪽 네모 4개 아이콘(Extensions)에서 vscode-pdf 를 찾아 설치한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · 실습 4-1 — "txt 파일 드래그 + 분석 요청" (outline 4)
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative, "editor");

  const explorerNodes: ExplorerNode[] = [
    { name: "practice_files", kind: "folder", depth: 0 },
    { name: "doc_230928_v3.txt", kind: "file", depth: 1, state: "selected" },
    { name: "IMG_20260309_134502.jpg", kind: "file", depth: 1 },
    { name: "report_scan.pdf", kind: "file", depth: 1 },
    { name: "memo.txt", kind: "file", depth: 1 },
  ];
  // No folder prefix on the @path (2026-09-18 render review, defect C): ClaudeCodeTerminal's input line
  // does not wrap (a real terminal input doesn't either) — the full "@practice_files/doc_230928_v3.txt ..."
  // ran past the panel's right edge and got clipped. The short form still reads as "a file got dropped in".
  // 2026-09-18 render review round 2: even the short "@doc_230928_v3.txt 이 파일을 읽고 분석해줘" clipped
  // once the editor-tab doc preview narrowed the terminal panel — trimmed the ask itself to "분석해줘"
  // (the @path stays, which is the actual teaching point: it auto-filled from the drag).
  const inputText = "@doc_230928_v3.txt 분석해줘";
  const termLayout = layoutClaudeCodeTerminal({ width: termW, inputText, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const inputSpot = { x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 };
  const b1 = toFrame(explorerRowCenter(1, 1));
  const b2 = toFrame(inputSpot);

  // Drag cue (CEO 2026-09-18): the dragged row's right edge -> a spot just outside the terminal panel's
  // left border, bowing up near the editor pane's top so it never crosses the doc excerpt text or badges.
  const dragStart = toFrame({ x: ACTIVITY_W + SIDEBAR_W - 16, y: explorerRowCenter(1, 1).y });
  const dragEnd = toFrame(dragEndAtInput(paneLeft, contentTop + termLayout.inputY + termLayout.inputH / 2));
  const dragControlY = toFrame({ x: 0, y: WINDOW_HEADER_H + 40 }).y;

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="파일을 드래그해서 분석 요청">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} inputText={inputText} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="editor"
            editorTab={{ name: "doc_230928_v3.txt", lines: DOC_EXCERPT_LINES }}
          />
        </Camera>
      </div>

      <DragCue start={dragStart} end={dragEnd} controlY={dragControlY} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "탐색기에서 파일을 드래그", body: "doc_230928_v3.txt 를 오른쪽 클로드 창으로 끌어놓는다." },
          { number: 2, head: "'분석해줘' 입력", body: "드래그하면 파일 경로가 자동으로 입력창에 들어가고, 뒤에 요청만 적으면 된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · 실습 4-2 — "답변 확인 + 파일명 변경 요청" (outline 5, 4번의 결과 확인 및 후속 요청)
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative, "editor");

  const priorTurns: ClaudeCodeTurn[] = [
    { role: "user", text: "@doc_230928_v3.txt 이 파일을 읽고 분석해줘" },
    { role: "assistant", text: "2023년 9월 28일 작성된 회의록으로, 다음 분기 예산안 논의 내용을 담고 있어요." },
  ];
  // Short live-input form (2026-09-18 render review round 2 — see Slide05's own note): the longer
  // sentence clipped once the editor-tab doc preview narrowed the terminal panel. Matches the
  // AnnotationColumn's own quoted phrase below.
  const inputText = "파일명을 바꿔줘";
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: priorTurns, inputText, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const answerSpot = { x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 };
  const inputSpot = { x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 };
  const b1 = toFrame(answerSpot);
  const b2 = toFrame(inputSpot);

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="답변 확인 후 파일명 변경 요청">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[
              { name: "practice_files", kind: "folder", depth: 0 },
              { name: "doc_230928_v3.txt", kind: "file", depth: 1, state: "selected" },
            ]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} turns={priorTurns} inputText={inputText} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="editor"
            editorTab={{ name: "doc_230928_v3.txt", lines: DOC_EXCERPT_LINES }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "답변이 실제 파일과 맞는지 확인", body: "분석한 내용이 진짜 파일 내용과 일치하는지 본다." },
          { number: 2, head: "'파일명을 바꿔줘' 라고 요청", body: "내용에 맞게 알아보기 쉬운 이름으로 바꿔달라고 한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · 실습 5-1 — "이미지 드래그 + 분석 요청" (outline 6, 전반부 — 4번처럼 순차 분할)
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative, "editorImage", READ_IMG_SIDEBAR_W);

  const explorerNodes: ExplorerNode[] = [
    { name: "practice_files", kind: "folder", depth: 0 },
    { name: "doc_230928_v3.txt", kind: "file", depth: 1 },
    { name: "IMG_20260309_134502.jpg", kind: "file", depth: 1, state: "selected" },
    { name: "report_scan.pdf", kind: "file", depth: 1 },
    { name: "memo.txt", kind: "file", depth: 1 },
  ];
  // 2026-09-18 Yuki review (defect A): dropped the trailing "분석해줘" ask from the LIVE input line (the
  // one line ClaudeCodeTerminal does NOT wrap) so the terminal panel can shrink and the editor column can
  // grow to show the real photo at a useful size — the auto-filled @path is the actual teaching point
  // here (see AnnotationColumn item 2 below for the "request" half of the story).
  const inputText = "@IMG_20260309_134502.jpg";
  const termLayout = layoutClaudeCodeTerminal({ width: termW, inputText, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const inputSpot = { x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 };
  const b1 = toFrame(explorerRowCenter(1, 2));
  const b2 = toFrame(inputSpot);

  // Drag cue (see Slide05) — row 07's own explorer row, dragStart's x uses this slide's own (narrower)
  // sidebar width, and dragEnd now lands on the terminal input box itself (defect B).
  const dragStart = toFrame({ x: ACTIVITY_W + READ_IMG_SIDEBAR_W - 16, y: explorerRowCenter(1, 2).y });
  const dragEnd = toFrame(dragEndAtInput(paneLeft, contentTop + termLayout.inputY + termLayout.inputH / 2));
  const dragControlY = toFrame({ x: 0, y: WINDOW_HEADER_H + 40 }).y;

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="이미지도 드래그해서 분석 요청">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            sidebarWidth={READ_IMG_SIDEBAR_W}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} inputText={inputText} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="editor"
            editorTab={{ name: "IMG_20260309_134502.jpg", image: PRACTICE_PHOTO }}
          />
        </Camera>
      </div>

      <DragCue start={dragStart} end={dragEnd} controlY={dragControlY} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "이번엔 이미지 파일을 드래그", body: "IMG_20260309_134502.jpg 를 클로드 창으로 끌어놓는다." },
          { number: 2, head: "마찬가지로 분석 요청", body: "이미지도 파일처럼 드래그해서 분석을 요청할 수 있다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · 실습 5-2 — "이미지 설명 확인 + 파일명 변경 요청" (outline 6, 후반부)
// ------------------------------------------------------------------------------------------------

const Slide08: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative, "editorImage", READ_IMG_SIDEBAR_W);

  // Description matches the real photo now shown in the editor (2026-09-18: swapped the placeholder
  // "노을 지는 바닷가" text for what IMG_20260309_134502.jpg actually shows — red onion halves + herbs on
  // a wooden cutting board — since slide07/08 now open the real file instead of an empty editor).
  const priorTurns: ClaudeCodeTurn[] = [
    { role: "user", text: "@IMG_20260309_134502.jpg 이 이미지도 분석해줘" },
    { role: "assistant", text: "도마 위에 자른 적양파와 허브를 올려둔 요리 재료 사진이에요. 통후추도 흩어져 있어요." },
  ];
  // Short live-input form (2026-09-18 render review round 2 — see Slide05's own note): matches the
  // AnnotationColumn's own "파일명도 바꿔달라고 요청" phrasing below.
  const inputText = "파일명도 바꿔줘";
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: priorTurns, inputText, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const answerSpot = { x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 };
  const inputSpot = { x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 };
  const b1 = toFrame(answerSpot);
  const b2 = toFrame(inputSpot);

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="이미지 설명 확인 후 파일명 변경">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            sidebarWidth={READ_IMG_SIDEBAR_W}
            explorerNodes={[
              { name: "practice_files", kind: "folder", depth: 0 },
              { name: "IMG_20260309_134502.jpg", kind: "file", depth: 1, state: "selected" },
            ]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} turns={priorTurns} inputText={inputText} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="editor"
            editorTab={{ name: "IMG_20260309_134502.jpg", image: PRACTICE_PHOTO }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "이미지 설명이 실제 사진과 맞는지 확인", body: "설명한 내용이 사진 속 모습과 일치하는지 본다." },
          { number: 2, head: "파일명도 바꿔달라고 요청", body: "이번에도 알아보기 쉬운 이름으로 바꿔달라고 한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 09 · 실습 6 — "폴더 통째로 드래그 + 나머지 파일명 변경" (outline 7)
// ------------------------------------------------------------------------------------------------

const Slide09: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const explorerNodes: ExplorerNode[] = [
    { name: "practice_files", kind: "folder", depth: 0, state: "selected" },
    { name: "doc_230928_v3.txt", kind: "file", depth: 1 },
    { name: "IMG_20260309_134502.jpg", kind: "file", depth: 1 },
    { name: "report_scan.pdf", kind: "file", depth: 1 },
    { name: "memo.txt", kind: "file", depth: 1 },
  ];
  // Outline's own wording, no restated folder name (2026-09-18 render review, defect C — see Slide05):
  // the folder is already shown selected in the explorer, so the input line doesn't need to repeat it.
  const inputText = "나머지 파일들도 모두 읽고 파일명 바꿔줘";
  const termLayout = layoutClaudeCodeTerminal({ width: termW, inputText, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const inputSpot = { x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 };
  const b1 = toFrame(explorerRowCenter(0, 0));
  const b2 = toFrame(inputSpot);

  // Drag cue (see Slide05) — dragging the folder row itself this time.
  const dragStart = toFrame({ x: ACTIVITY_W + SIDEBAR_W - 16, y: explorerRowCenter(0, 0).y });
  const dragEnd = toFrame(dragEndAtInput(paneLeft, contentTop + termLayout.inputY + termLayout.inputH / 2));
  const dragControlY = toFrame({ x: 0, y: WINDOW_HEADER_H + 40 }).y;

  return (
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="폴더 전체를 한 번에 처리">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} inputText={inputText} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <DragCue start={dragStart} end={dragEnd} controlY={dragControlY} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "practice_files 폴더 통째로 드래그", body: "폴더 전체를 클로드 창에 끌어놓는다." },
          { number: 2, head: "'나머지 파일들도 모두 읽고 바꿔줘'", body: "폴더 안 남은 파일을 한 번에 처리해달라고 요청한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 10 · 실습 7 — "/clear" (outline 8, 다 하면 새 대화방으로)
// ------------------------------------------------------------------------------------------------

const Slide10: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const priorTurns: ClaudeCodeTurn[] = [
    { role: "user", text: "나머지 파일들도 모두 읽고 파일명 바꿔줘" },
    { role: "assistant", text: "report_scan.pdf, memo.txt 도 내용에 맞게 이름을 바꿨어요." },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: priorTurns, inputText: "/clear", fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const inputSpot = { x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 };
  const b1 = toFrame(inputSpot);

  return (
    <SlideFrame index={10} total={TOTAL} eyebrow={EYEBROW} title="/clear 로 실습 마무리">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[
              { name: "practice_files", kind: "folder", depth: 0 },
              { name: "doc_230928_v3.txt", kind: "file", depth: 1 },
            ]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} turns={priorTurns} inputText="/clear" fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={36} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "/clear", body: "read 툴 실습이 끝나면 새 대화방으로 이동한다." },
          { number: "!", head: "다음은 write 툴 실습", body: "새 대화에서 이어서 write 툴을 배운다." },
        ]}
      />
    </SlideFrame>
  );
};

// All 10 slides map 1:1 to the CEO's outline (basic_step02_outline.md, section 3): slide 1 = "read툴 이란?",
// slides 2-10 = 실습 1-7 (실습 6 은 지시대로 두 슬라이드로 분할).

export const STEP02_READ: SlideEntry[] = [
  { index: 1, name: "01_READ_툴_란", title: "파일을 대신 읽어주는 도구", render: () => React.createElement(Slide01) },
  { index: 2, name: "02_READ_실습1_다운로드", title: "read_practice.zip 다운로드", render: () => React.createElement(Slide02) },
  { index: 3, name: "03_READ_실습2_압축풀기", title: "압축 풀고 폴더 펼치기", render: () => React.createElement(Slide03) },
  { index: 4, name: "04_READ_실습3_파일확인", title: "파일 하나씩 확인하기", render: () => React.createElement(Slide04) },
  { index: 5, name: "05_READ_실습4a_txt_드래그", title: "파일을 드래그해서 분석 요청", render: () => React.createElement(Slide05) },
  { index: 6, name: "06_READ_실습4b_txt_이름변경", title: "답변 확인 후 파일명 변경 요청", render: () => React.createElement(Slide06) },
  { index: 7, name: "07_READ_실습5a_이미지_드래그", title: "이미지도 드래그해서 분석 요청", render: () => React.createElement(Slide07) },
  { index: 8, name: "08_READ_실습5b_이미지_이름변경", title: "이미지 설명 확인 후 파일명 변경", render: () => React.createElement(Slide08) },
  { index: 9, name: "09_READ_실습6_폴더전체", title: "폴더 전체를 한 번에 처리", render: () => React.createElement(Slide09) },
  { index: 10, name: "10_READ_실습7_clear", title: "/clear 로 실습 마무리", render: () => React.createElement(Slide10) },
];

export const STEP02_READ_PART: PartSpec = { id: "read", eyebrow: EYEBROW, entries: STEP02_READ };
