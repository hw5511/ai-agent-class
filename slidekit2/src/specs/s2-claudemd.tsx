// s2-claudemd — basic 2회차 슬라이드 15~26 (12장). Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step02/*.svg) into this renderer.
//
// Content source: assets/basic/step02/CLAUDE_md_*.svg (exact wording/commands) +
// courses/basic/step02.json slide entries 15..26 (goal/topics/practice/action).
//
// Reuse notes (per brief): slides 02/03 are the CEO-approved rebuilds already shipped in
// step02-sample.tsx ("세션 시작 시 자동 로드" / ".claude 숨김 폴더 위치") — copied here verbatim
// (only index/eyebrow/total renumbered to this part's own 12-slide count). Slides 01/05/06/07/08/09/10
// reuse the practice-flow slides already built and approved in step02-claudemd.tsx (7-slide cut),
// which map 1:1 onto this part's original 12-slide breakdown. Slides 04/11/12 are new (no existing
// rebuilt reference) and are built from the shipped SVG content directly, tokens-only, no boxes-with-
// arrows filler.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { InputBar } from "../InputBar";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { ClaudeCodeTerminal, ClaudeCodeTerminalPanel, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "CLAUDE.MD";
const TOTAL = 12;

const WINDOW_HEADER_H = 34; // AppWindow's own native title bar height (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // reserved inside the terminal so badges never cover its text.
const TERM_WINDOW_H = 620;

// ------------------------------------------------------------------------------------------------
// Shared local helpers (same math as step02-claudemd.tsx / step02-sample.tsx — each part owns its own
// copy per the worker guide, nothing shared is edited).
// ------------------------------------------------------------------------------------------------

function windowGeometry(illoW: number, illoH: number, windowH = 480) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

function rightTermWidth(windowNative: { w: number }, mainMode: "empty" | "editor" = "empty"): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  return Math.round(contentW * (mainMode === "empty" ? 0.84 : 0.62));
}

// ------------------------------------------------------------------------------------------------
// 01 · CLAUDE_md_란 — "CLAUDE.md 상시 지시서" (step02-claudemd.tsx Slide01, unchanged content)
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
  const rows: Array<{ label: string; value: string }> = [
    { label: "이름", value: "'ㅇㅇ'" },
    { label: "역할", value: "'ai 에이전트 수업 도우미'" },
    { label: "말투", value: "'~용용'" },
    { label: "규칙", value: "'답변은 짧게'" },
  ];

  const agentR = 175;
  const agentCx = cardX + cardW + 300;
  const agentCy = cardY + cardH / 2;

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="CLAUDE.md 상시 지시서">
      <AnnotationColumn
        x={leftX}
        y={illoY}
        width={leftW}
        height={illoH}
        items={[
          { number: 1, head: "매번 말하지 않아도 되는 상시 지시서", body: "대화를 시작할 때마다 에이전트가 먼저 읽는다." },
          { number: 2, head: "이름·역할·말투 부여", body: "에이전트의 정체성을 정한다." },
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
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40, flex: "0 0 auto" }}>
            <div style={{ width: 44, height: 44, borderRadius: 9, background: COLORS.accentWash, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
              <svg width={22} height={26} viewBox="0 0 22 26">
                <path
                  d="M2 1.6C2 1 2.5 0.6 3.1 0.6H14L20 6.6V24.4C20 25 19.5 25.4 18.9 25.4H3.1C2.5 25.4 2 25 2 24.4Z"
                  fill="none"
                  stroke={COLORS.accentDeep}
                  strokeWidth={1.8}
                  strokeLinejoin="round"
                />
                <path d="M14 0.6V5.6C14 6.2 14.5 6.6 15 6.6H20" fill="none" stroke={COLORS.accentDeep} strokeWidth={1.8} strokeLinejoin="round" />
                <path d="M6 13H16M6 17H16M6 21H12" stroke={COLORS.accentDeep} strokeWidth={1.6} strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 32, color: COLORS.accentDeep }}>CLAUDE.md</span>
          </div>
          <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {rows.map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: COLORS.accent, flex: "0 0 auto", transform: "translateY(-4px)" }} />
                <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 32, color: COLORS.ink, flex: "0 0 auto" }}>{r.label}</span>
                <span style={{ fontFamily: FONTS.term, fontWeight: 400, fontSize: 26, color: COLORS.ink2, wordBreak: "keep-all" }}>{r.value}</span>
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
// 02 · CLAUDE_md_언제_읽히나 — "세션 시작 시 자동 로드" (step02-sample.tsx Slide02, CEO-approved rebuild
// of shipped slide 16 "언제 읽히나" — old title banned; kept verbatim here per brief).
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "너는 누구니?" },
    { role: "assistant", text: "저는 ㅇㅇ이에요용. ai 에이전트 수업 도우미용." },
  ];
  const termProps = {
    width: termW,
    showLaunch: true,
    showWelcome: true,
    turns,
    fontSize: TERM_FONT_SIZE,
    leftGutter: BADGE_GUTTER,
  };
  const L = layoutClaudeCodeTerminal(termProps);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const b2 = toFrame({ x: badgeX, y: contentTop + (L.launchY ?? 0) + L.lineH / 2 });
  const b3 = toFrame({ x: badgeX, y: contentTop + L.turns[1].anchorY + L.lineH / 2 });

  const nodes: ExplorerNode[] = [
    { name: ".claude", kind: "folder", depth: 0 },
    { name: "CLAUDE.md", kind: "file", depth: 1 },
  ];

  const explorerRowY = WINDOW_HEADER_H + 36 + 30 + 15;
  const b1 = toFrame({ x: ACTIVITY_W + SIDEBAR_W - 26, y: explorerRowY });

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="세션 시작 시 자동 로드">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal {...termProps} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <FocusBadge number={3} x={b3.x} y={b3.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "파일 위치 유지", body: "agent1/.claude/CLAUDE.md 를 만들어 두기만 한다." },
          { number: 2, head: "claude 재실행", body: '"CLAUDE.md 읽어" 라고 시키지 않는다.' },
          { number: 3, head: "답변 변화", body: "이름·역할·말투가 파일 그대로 나온다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · CLAUDE_md_어디에 — ".claude 숨김 폴더 위치" (step02-sample.tsx Slide03, CEO-approved rebuild of
// shipped slide 17 "어디에 두나" — old title banned; kept verbatim here per brief).
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const terminalLines = [
    { type: "input" as const, text: "dir" },
    { type: "output" as const, text: "자기소개서.txt" },
    { type: "input" as const, text: "dir -Force" },
    { type: "output" as const, text: ".claude" },
    { type: "output" as const, text: "자기소개서.txt" },
  ];

  const nodes: ExplorerNode[] = [
    { name: ".claude", kind: "folder", depth: 0, state: "selected" },
    { name: "CLAUDE.md", kind: "file", depth: 1 },
    { name: "자기소개서.txt", kind: "file", depth: 0 },
  ];

  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH;
  const badgeX = ACTIVITY_W + SIDEBAR_W - 26;
  const b1 = toFrame({ x: badgeX, y: treeTop + rowH * 0.5 });
  const b2 = toFrame({ x: badgeX, y: treeTop + rowH * 1.5 });

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title=".claude 숨김 폴더 위치">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalLines={terminalLines}
            mainMode="empty"
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
          { number: 1, head: "이름 앞의 점(.)", body: "점으로 시작하는 폴더는 기본으로 숨겨진다. dir 에는 안 보이고 dir -Force 에만 보인다." },
          { number: 2, head: "그 안에 CLAUDE.md", body: "agent1/.claude/CLAUDE.md — 작업 폴더 바로 아래에 둔다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · CLAUDE_md_무엇을 — "이름·역할·말투·규칙 네 가지" (new — shipped SVG had 4 tinted cards; rebuilt
// tokens-only with the one blue accent, same 4 facts: 이름 / 역할 / 말투 / 하지 말 것).
// ------------------------------------------------------------------------------------------------

const WHAT_CARDS: Array<{ n: number; label: string; example: string; note: string }> = [
  { n: 1, label: "이름", example: "예: 'ㅇㅇ' 처럼 부를 이름 하나", note: "정체성의 첫 조각" },
  { n: 2, label: "역할", example: "예: 'ai 에이전트 수업 도우미'", note: "역할 규정" },
  { n: 3, label: "말투", example: "예: 문장 끝마다 '~요' 를 '~용용' 으로", note: "규칙으로 고정하는 말투" },
  { n: 4, label: "하지 말 것", example: "예: 모르면 추측하지 말고 되묻기", note: "실수를 줄이는 경계" },
];

const Slide04: React.FC = () => {
  const gridX = colX(0);
  const gridY = BODY_Y;
  const gridW = colW(12);
  const gap = 32;
  const cardW = (gridW - gap) / 2;
  const cardH = 220;
  const noteY = gridY + cardH * 2 + gap + 40;

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="이름·역할·말투·규칙 네 가지">
      {WHAT_CARDS.map((c, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = gridX + col * (cardW + gap);
        const y = gridY + row * (cardH + gap);
        return (
          <div
            key={c.n}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: cardW,
              height: cardH,
              boxSizing: "border-box",
              background: COLORS.paper2,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 14px 30px rgba(16,17,19,0.08)",
            }}
          >
            <div style={{ height: 8, background: COLORS.accent }} />
            <div style={{ padding: "24px 34px", display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: COLORS.accentDeep, letterSpacing: "0.04em" }}>{`①②③④`[c.n - 1]} {c.label}</span>
              <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 34, color: COLORS.ink }}>{c.label}</span>
              <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 20, color: COLORS.ink2, wordBreak: "keep-all" }}>{c.example}</span>
              <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 20, color: COLORS.ink2, wordBreak: "keep-all" }}>{c.note}</span>
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: gridX,
          top: noteY,
          width: gridW,
          height: BODY_BOTTOM - noteY,
          boxSizing: "border-box",
          background: COLORS.paper2,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
        }}
      >
        <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 22, color: COLORS.ink2, wordBreak: "keep-all" }}>
          이 네 가지는 예시 — 이름·역할·말투는 자유롭게 바꾼다.
        </span>
      </div>
      <FocusBadge number={1} x={gridX + cardW - 20} y={gridY + 20} size={30} />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · CLAUDE_md_실습_전_질문 — "기본 상태 확인" (step02-claudemd.tsx Slide02, unchanged content)
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "너는 누구니?" },
    { role: "assistant", text: "안녕하세요! 저는 Claude Code예요. Anthropic이 만든 AI 코딩 어시스턴트예요." },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, showLaunch: true, showWelcome: true, turns, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const userSpot = { x: badgeX, y: contentTop + termLayout.turns[0].anchorY + termLayout.lineH / 2 };
  const assistantSpot = { x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 };
  const b1 = toFrame(userSpot);
  const b2 = toFrame(assistantSpot);

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="기본 상태 확인">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[{ name: "(비어 있음)", kind: "file", depth: 0 }]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} showLaunch showWelcome turns={turns} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
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
          { number: 1, head: "'너는 누구니?' 질문", body: "CLAUDE.md 가 아직 없을 때 어떻게 답하는지 확인한다." },
          { number: 2, head: "기본 정체성 답변", body: "'Claude Code, Anthropic이 만든 AI 어시스턴트' 라고 답한다." },
          { number: "!", head: "이 답을 기억해두기", body: "잠시 후 CLAUDE.md 를 만들고 나면 답이 어떻게 바뀌는지 비교한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · CLAUDE_md_폴더_만들기 — ".claude 폴더 만들기" (step02-claudemd.tsx Slide03, unchanged content)
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_BOTTOM - BODY_Y;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const termW = rightTermWidth(windowNative);

  const explorerNodes: ExplorerNode[] = [{ name: ".claude", kind: "folder", depth: 0, editingValue: ".claude" }];

  const newFolderIconCenter = { x: 249, y: 78 };
  const newFolderIconBadge = { x: newFolderIconCenter.x + 19, y: newFolderIconCenter.y - 19 };
  const inlineInputNative = { x: 158, y: 104 };
  const toFrame = (p: { x: number; y: number }) => ({
    x: illoX + view.tx + p.x * view.s,
    y: illoY + view.ty + p.y * view.s,
  });
  const b1 = toFrame(newFolderIconBadge);
  const b2 = toFrame(inlineInputNative);

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title=".claude 폴더 만들기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            explorerHeaderHot="newFolder"
            layout="right"
            terminalWidth={termW}
            showTerminal
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={40} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={1267}
        y={illoY}
        width={533}
        height={illoH}
        items={[
          { number: 1, head: "New Folder 아이콘 클릭", body: "탐색기의 agent1 폴더에 마우스를 올리면 아이콘 4개가 뜬다." },
          { number: 2, head: "이름 .claude 입력 후 Enter", body: "새 폴더 이름 칸에 .claude 를 입력하고 Enter 를 누른다." },
          { number: "!", head: "점(.)까지 포함한 이름", body: "맨 앞의 점(.)을 빼먹으면 안 된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · CLAUDE_md_파일_만들기 — "CLAUDE.md 파일 만들기" (step02-claudemd.tsx Slide04, unchanged content)
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const termW = rightTermWidth(windowNative);

  const explorerNodes: ExplorerNode[] = [
    { name: ".claude", kind: "folder", depth: 0, state: "selected" },
    { name: "CLAUDE.md", kind: "file", depth: 1, editingValue: "CLAUDE.md" },
  ];

  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const newFileIconCenter = { x: 224, y: 78 };
  const newFileIconBadge = { x: newFileIconCenter.x + 19, y: newFileIconCenter.y - 19 };
  const inlineInputNative = { x: 192, y: 134 };
  const b1 = toFrame(newFileIconBadge);
  const b2 = toFrame(inlineInputNative);

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="CLAUDE.md 파일 만들기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            explorerHeaderHot="newFile"
            layout="right"
            terminalWidth={termW}
            showTerminal
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={40} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={1267}
        y={illoY}
        width={533}
        height={illoH}
        items={[
          { number: 1, head: "New File 아이콘 클릭", body: ".claude 폴더를 선택한 채 새 파일 아이콘을 누른다." },
          { number: 2, head: "이름 CLAUDE.md 입력 후 Enter", body: "대문자로 정확히 CLAUDE.md 라고 입력한다." },
          { number: "!", head: ".claude 폴더 안에 만들기", body: "agent1 바로 아래가 아니라 .claude 안이어야 한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · CLAUDE_md_내용_작성 — "CLAUDE.md 내용 작성" (step02-claudemd.tsx Slide05, unchanged content)
// ------------------------------------------------------------------------------------------------

const CONTENT_TEXT = "너의 이름은 'ㅇㅇ'이야, 너의 역할은 'ai 에이전트 수업 도우미'야. 말끝마다 '~요'를 '~용용'으로 붙여서 답변해";
const CONTENT_LINES = ["너의 이름은 'ㅇㅇ'이야, 너의 역할은 'ai 에이전트 수업 도우미'야.", "말끝마다 '~요'를 '~용용'으로 붙여서 답변해"];

const Slide08: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(8);

  const barY = BODY_Y;
  const barH = 112;
  const barBlockH = 22 + 10 + barH;
  const gap = 24;
  const screenY = barY + barBlockH + gap;
  const screenH = BODY_BOTTOM - screenY;

  const windowH = 420;
  const native = { w: Math.round(windowH * (illoW / screenH)), h: windowH };

  const focus = { x: 0, y: 0, w: native.w, h: native.h };
  const view = cameraView({ w: illoW, h: screenH }, native, focus);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: screenY + view.ty + p.y * view.s });

  const dirtyDot = toFrame({ x: 450, y: 51 });
  const firstLine = toFrame({ x: 355, y: 100 });

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="CLAUDE.md 내용 작성">
      <InputBar x={illoX} y={barY} width={illoW} height={barH} text={CONTENT_TEXT} />

      <div style={{ position: "absolute", left: illoX, top: screenY, width: illoW, height: screenH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={screenH} native={native} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={native.w}
            height={native.h}
            explorerNodes={[
              { name: ".claude", kind: "folder", depth: 0 },
              { name: "CLAUDE.md", kind: "file", depth: 1, state: "selected" },
            ]}
            showTerminal={false}
            mainMode="editor"
            editorTab={{ name: "CLAUDE.md", dirty: true, lines: CONTENT_LINES }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={firstLine.x} y={firstLine.y} size={34} />
      <FocusBadge number={2} x={dirtyDot.x} y={dirtyDot.y} size={30} />

      <AnnotationColumn
        x={1267}
        y={BODY_Y}
        width={533}
        height={BODY_BOTTOM - BODY_Y}
        items={[
          { number: 1, head: "이름·역할·말투 세 가지 적기", body: "이름을 정하고, 역할과 말투 규칙까지 문장으로 적는다." },
          { number: 2, head: "저장까지 눌러야 반영", body: "Ctrl(Cmd) + S 로 저장하지 않으면 그대로 비어 있다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 09 · CLAUDE_md_clear — "/clear 새 대화" (step02-claudemd.tsx Slide06, unchanged content)
// ------------------------------------------------------------------------------------------------

const Slide09: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const priorTurns: ClaudeCodeTurn[] = [
    { role: "user", text: "너는 누구니?" },
    { role: "assistant", text: "안녕하세요! 저는 Claude Code예요. Anthropic이 만든 AI 코딩 어시스턴트예요." },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: priorTurns, inputText: "/clear", fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const inputSpot = { x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 };
  const b1 = toFrame(inputSpot);

  return (
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="/clear 새 대화">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[
              { name: ".claude", kind: "folder", depth: 0 },
              { name: "CLAUDE.md", kind: "file", depth: 1, state: "selected" },
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
          { number: 1, head: "/clear", body: "지금 채팅방을 나가고 새 채팅방으로 가기" },
          {
            number: "!",
            head: "대화 기록 초기화 · CLAUDE.md 재로딩",
            body: "Enter 를 누르면 대화 기록이 지워지고 새 대화가 시작된다. CLAUDE.md 는 새 대화가 시작될 때 읽힌다.",
          },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 10 · CLAUDE_md_실습_후_질문 — "바뀐 답 확인" (step02-claudemd.tsx Slide07, unchanged content)
// ------------------------------------------------------------------------------------------------

const Slide10: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "너는 누구니?" },
    { role: "assistant", text: "저는 ㅇㅇ이에용용, ai 에이전트 수업 도우미에용용" },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, showWelcome: true, turns, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const userSpot = { x: badgeX, y: contentTop + termLayout.turns[0].anchorY + termLayout.lineH / 2 };
  const assistantSpot = { x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 };
  const b1 = toFrame(userSpot);
  const b2 = toFrame(assistantSpot);

  return (
    <SlideFrame index={10} total={TOTAL} eyebrow={EYEBROW} title="바뀐 답 확인">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[
              { name: ".claude", kind: "folder", depth: 0 },
              { name: "CLAUDE.md", kind: "file", depth: 1, state: "selected" },
            ]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} showWelcome turns={turns} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
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
          { number: 1, head: "같은 질문을 다시 하기", body: "\"너는 누구니?\" 라고 다시 물어본다." },
          { number: 2, head: "달라진 답 확인", body: "이름·역할·말투가 CLAUDE.md 그대로 반영됐다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 11 · CLAUDE_md_비교 — "질문 전후 답변 비교" (new — shipped SVG showed two static terminal cards side by
// side, "CLAUDE.md 전" vs "CLAUDE.md 후". Rebuilt with the shared ClaudeCodeTerminalPanel so both sides
// are the same real terminal mock, not a hand-drawn code block.)
// ------------------------------------------------------------------------------------------------

const Slide11: React.FC = () => {
  const gap = 40;
  const colWidth = (colW(12) - gap) / 2;
  const beforeX = colX(0);
  const afterX = beforeX + colWidth + gap;
  const panelY = BODY_Y + 70;
  const panelH = 420;

  const beforeTurns: ClaudeCodeTurn[] = [
    { role: "user", text: "너는 누구니?" },
    { role: "assistant", text: "안녕하세요! 저는 Claude Code예요. Anthropic이 만든 AI 코딩 어시스턴트예요." },
  ];
  const afterTurns: ClaudeCodeTurn[] = [
    { role: "user", text: "너는 누구니?" },
    { role: "assistant", text: "저는 ㅇㅇ이에용용, ai 에이전트 수업 도우미에용용" },
  ];

  return (
    <SlideFrame index={11} total={TOTAL} eyebrow={EYEBROW} title="질문 전후 답변 비교">
      <div style={{ position: "absolute", left: beforeX, top: BODY_Y, width: colWidth, fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.ink2 }}>CLAUDE.md 전</div>
      <div style={{ position: "absolute", left: afterX, top: BODY_Y, width: colWidth, fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.accentDeep }}>CLAUDE.md 후</div>

      <ClaudeCodeTerminalPanel x={beforeX} y={panelY} width={colWidth} height={panelH} turns={beforeTurns} fontSize={18} />
      <ClaudeCodeTerminalPanel x={afterX} y={panelY} width={colWidth} height={panelH} turns={afterTurns} fontSize={18} />

      <FocusBadge number={1} x={beforeX + colWidth - 24} y={panelY + 24} size={30} />
      <FocusBadge number={2} x={afterX + colWidth - 24} y={panelY + 24} size={30} />

      <AnnotationColumn
        x={colX(0)}
        y={panelY + panelH + 40}
        width={colW(12)}
        height={BODY_BOTTOM - (panelY + panelH + 40)}
        items={[
          { number: 1, head: "같은 질문, 다른 답", body: "\"너는 누구니?\" 라는 같은 질문에 답이 완전히 달라졌다." },
          { number: 2, head: "바뀐 것은 파일 하나뿐", body: "코드를 고친 적은 없다 — .claude/CLAUDE.md 하나만 만들었다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 12 · CLAUDE_md_정리 — "CLAUDE.md 정리" (new — shipped SVG had a green checklist + quote + "다음 시간"
// box; rebuilt tokens-only with a blue accent checklist card.)
// ------------------------------------------------------------------------------------------------

const CHECK_ITEMS: Array<{ tag: string; body: string }> = [
  { tag: "작성", body: "agent1/.claude/CLAUDE.md 에 이름·역할·말투를 적었다" },
  { tag: "로드", body: "세션이 시작될 때 자동으로 읽혔다" },
  { tag: "반영", body: "/clear 로 새 대화방을 열자 답변이 바뀌었다" },
];

const Slide12: React.FC = () => {
  const x = colX(0);
  const w = colW(12);
  const listY = BODY_Y;
  const rowH = 76;
  const rowGap = 14;
  const quoteY = listY + CHECK_ITEMS.length * (rowH + rowGap) + 20;
  const quoteH = 90;
  const nextY = quoteY + quoteH + 28;
  const nextH = BODY_BOTTOM - nextY;

  return (
    <SlideFrame index={12} total={TOTAL} eyebrow={EYEBROW} title="CLAUDE.md 정리">
      {CHECK_ITEMS.map((it, i) => (
        <div
          key={it.tag}
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
            }}
          >
            <svg width={20} height={16} viewBox="0 0 20 16">
              <path d="M2 8 L7.5 13.5 L18 2" fill="none" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 22, color: COLORS.accentDeep, flex: "0 0 auto" }}>{it.tag}</span>
          <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 24, color: COLORS.ink, wordBreak: "keep-all" }}>{it.body}</span>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: x,
          top: quoteY,
          width: w,
          height: quoteH,
          boxSizing: "border-box",
          background: COLORS.accentWash,
          border: `1px solid ${COLORS.accent}`,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
        }}
      >
        <span style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 24, color: COLORS.accentDeep, wordBreak: "keep-all" }}>
          말 한마디 한마디로 지시하는 대신, 파일 하나로 "항상 그런 존재" 를 만든 것이다.
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: x,
          top: nextY,
          width: w,
          height: nextH,
          boxSizing: "border-box",
          background: COLORS.paper2,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8,
          padding: "0 32px",
        }}
      >
        <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.ink }}>다음 시간</span>
        <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 22, color: COLORS.ink2, wordBreak: "keep-all" }}>
          에이전트가 프로젝트 파일을 직접 읽는 Read 툴을 다룬다.
        </span>
      </div>
    </SlideFrame>
  );
};

export const S2_CLAUDEMD: SlideEntry[] = [
  { index: 1, name: "CLAUDE_md_란", title: "CLAUDE.md 상시 지시서", render: () => React.createElement(Slide01) },
  { index: 2, name: "CLAUDE_md_언제_읽히나", title: "세션 시작 시 자동 로드", render: () => React.createElement(Slide02) },
  { index: 3, name: "CLAUDE_md_어디에", title: ".claude 숨김 폴더 위치", render: () => React.createElement(Slide03) },
  { index: 4, name: "CLAUDE_md_무엇을", title: "이름·역할·말투·규칙 네 가지", render: () => React.createElement(Slide04) },
  { index: 5, name: "CLAUDE_md_실습_전_질문", title: "기본 상태 확인", render: () => React.createElement(Slide05) },
  { index: 6, name: "CLAUDE_md_폴더_만들기", title: ".claude 폴더 만들기", render: () => React.createElement(Slide06) },
  { index: 7, name: "CLAUDE_md_파일_만들기", title: "CLAUDE.md 파일 만들기", render: () => React.createElement(Slide07) },
  { index: 8, name: "CLAUDE_md_내용_작성", title: "CLAUDE.md 내용 작성", render: () => React.createElement(Slide08) },
  { index: 9, name: "CLAUDE_md_clear", title: "/clear 새 대화", render: () => React.createElement(Slide09) },
  { index: 10, name: "CLAUDE_md_실습_후_질문", title: "바뀐 답 확인", render: () => React.createElement(Slide10) },
  { index: 11, name: "CLAUDE_md_비교", title: "질문 전후 답변 비교", render: () => React.createElement(Slide11) },
  { index: 12, name: "CLAUDE_md_정리", title: "CLAUDE.md 정리", render: () => React.createElement(Slide12) },
];

export const S2_CLAUDEMD_PART: PartSpec = { id: "s2-claudemd", eyebrow: EYEBROW, entries: S2_CLAUDEMD };
