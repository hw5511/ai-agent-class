// step02 "CLAUDE.md" — 7-slide mockup spec, mapped 1:1 to the CEO's lesson outline
// (ai-agent-class/_drafts/basic_step02_outline.md, section "2. CLAUDE.md란?"). 2026-09-17 rework: the
// deck was cut from 12 slides to these 7 practice steps (removed: 자동 로드, 위치, 네 가지 항목, 전후
// 비교, 정리— none of those are steps in the outline). Every slide where Claude is launched or answers
// now uses the shared ../ClaudeCodeTerminal mock instead of a hand-drawn terminal.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { InputBar } from "../InputBar";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "CLAUDE.MD";
const TOTAL = 7;

const WINDOW_HEADER_H = 34; // NATIVE.windowHeader (../core/native.ts) — AppWindow's own native title bar height.
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.

// ------------------------------------------------------------------------------------------------
// 01 · CLAUDE_md_란 — "CLAUDE.md 상시 지시서" (unchanged from the original 12-slide deck)
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
          { number: 2, head: "이름·역할·말투·규칙을 준다", body: "에이전트의 정체성을 정한다." },
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
// Shared L21-style helper: an 8-col VSCodeScreen (camera-zoomed) + a 4-col AnnotationColumn.
// ------------------------------------------------------------------------------------------------

function windowGeometry(illoW: number, illoH: number, windowH = 480) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

// Right-layout terminal panel width, sized proportionally to THIS slide's own (smaller than full
// VSCODE_NATIVE) native window — a fixed constant (VSCodeScreen's own TERM_SIDE_W, sized for the full
// 1440-wide canvas) overflowed these ~800px-wide custom native windows and got clipped by the window's
// own border (2026-09-17 render review: terminal text ran off the right edge).
//
// 2026-09-18 render review (defect 1): at 62% the empty editor column (no file open on every right-layout
// slide in this deck) was a big dead dark strip while the terminal text was cramped. Real VS Code with
// "panel position: right" and no editor group open gives the panel most of the window width, so when
// mainMode is "empty" the terminal now takes 84% of the remaining content width — just enough editor
// sliver left to still read as "a panel beside an editor", not a hidden editor.
function rightTermWidth(windowNative: { w: number }, mainMode: "empty" | "editor" = "empty"): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  const frac = mainMode === "empty" ? 0.84 : 0.62;
  return Math.round(contentW * frac);
}

// Badge gutter reserved inside the terminal's own left padding (ClaudeCodeTerminal's `leftGutter` prop)
// so FocusBadges sit immediately left of the line they mark, INSIDE the terminal panel, instead of
// floating in the far-off empty editor column (2026-09-18 render review, defect 4).
const BADGE_GUTTER = 44;

// Terminal-focused slides (02/06/07) need more native pixel budget than the plain explorer/editor
// slides (03/04) to fit both a legible terminal panel AND a visible editor sliver — a taller native
// window at the same illo-box aspect ratio gives that budget (see windowGeometry's windowH param).
const TERM_WINDOW_H = 620;

// ------------------------------------------------------------------------------------------------
// 02 · 실습 1 — "기본 상태 확인" (claude 실행 상태에서 '너는 누구니?' → 기본 정체성 그대로 답변)
// panel position = right (the class's own VS Code setting from here on, per the CEO's outline item 1).
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
    { role: "assistant", text: "안녕하세요! 저는 Claude Code예요. Anthropic이 만든 AI 코딩 어시스턴트예요." },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, showLaunch: true, showWelcome: true, turns, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2; // inside the terminal's own reserved left gutter
  const userSpot = { x: badgeX, y: contentTop + termLayout.turns[0].anchorY + termLayout.lineH / 2 };
  const assistantSpot = { x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 };
  const b1 = toFrame(userSpot);
  const b2 = toFrame(assistantSpot);

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="기본 상태 확인">
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
          { number: 1, head: "먼저 '너는 누구니?' 라고 물어본다", body: "CLAUDE.md 가 아직 없을 때 어떻게 답하는지 확인한다." },
          { number: 2, head: "기본 정체성 그대로 답한다", body: "'Claude Code, Anthropic이 만든 AI 어시스턴트' 라고 답한다." },
          { number: "!", head: "이 답을 기억해두기", body: "잠시 후 CLAUDE.md 를 만들고 나면 답이 어떻게 바뀌는지 비교한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · 실습 2 — ".claude 폴더 만들기" (원본 12-슬라이드 덱의 06 그대로, 번호만 변경 + 패널 위치 right)
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
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
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title=".claude 폴더 만들기">
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
// 04 · 실습 3 — "CLAUDE.md 파일 만들기" (원본 07 그대로, 번호만 변경 + 패널 위치 right)
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
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
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="CLAUDE.md 파일 만들기">
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
// 05 · 실습 4 — "CLAUDE.md 내용 작성" (CEO 지정 문구 그대로, InputBar 위 + 에디터 화면 아래 + 주석 4 cols)
// ------------------------------------------------------------------------------------------------

const CONTENT_TEXT = "너의 이름은 'ㅇㅇ'이야, 너의 역할은 'ai 에이전트 수업 도우미'야. 말끝마다 '~요'를 '~용용'으로 붙여서 답변해";
const CONTENT_LINES = ["너의 이름은 'ㅇㅇ'이야, 너의 역할은 'ai 에이전트 수업 도우미'야.", "말끝마다 '~요'를 '~용용'으로 붙여서 답변해"];

const Slide05: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(8);

  const barY = BODY_Y;
  const barH = 112; // 2 lines at fontSize 28 (the full CEO sentence no longer fits on one line at this width)
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
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="CLAUDE.md 내용 작성">
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
// 06 · 실습 5 — "/clear 새 대화" (/clear 를 입력창에 입력한 상태 — 아직 Enter 전, 입력창 자체를 보여준다)
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => {
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
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2; // inside the terminal's own reserved left gutter
  const inputSpot = { x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 };
  const b1 = toFrame(inputSpot);

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="/clear 새 대화">
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
// 07 · 실습 6 — "바뀐 답 확인" (/clear 로 연 새 대화방 — 같은 질문에 CLAUDE.md 가 반영된 답)
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => {
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
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2; // inside the terminal's own reserved left gutter
  const userSpot = { x: badgeX, y: contentTop + termLayout.turns[0].anchorY + termLayout.lineH / 2 };
  const assistantSpot = { x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 };
  const b1 = toFrame(userSpot);
  const b2 = toFrame(assistantSpot);

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="바뀐 답 확인">
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

// All 7 slides map 1:1 to the CEO's outline (basic_step02_outline.md, section 2).

export const STEP02_CLAUDEMD: SlideEntry[] = [
  { index: 1, name: "01_CLAUDE_md_란", title: "CLAUDE.md 상시 지시서", render: () => React.createElement(Slide01) },
  { index: 2, name: "02_CLAUDE_md_실습1_기본_상태", title: "기본 상태 확인", render: () => React.createElement(Slide02) },
  { index: 3, name: "03_CLAUDE_md_실습2_폴더_만들기", title: ".claude 폴더 만들기", render: () => React.createElement(Slide03) },
  { index: 4, name: "04_CLAUDE_md_실습3_파일_만들기", title: "CLAUDE.md 파일 만들기", render: () => React.createElement(Slide04) },
  { index: 5, name: "05_CLAUDE_md_실습4_내용_작성", title: "CLAUDE.md 내용 작성", render: () => React.createElement(Slide05) },
  { index: 6, name: "06_CLAUDE_md_실습5_clear", title: "/clear 새 대화", render: () => React.createElement(Slide06) },
  { index: 7, name: "07_CLAUDE_md_실습6_바뀐_답", title: "바뀐 답 확인", render: () => React.createElement(Slide07) },
];

export const STEP02_CLAUDEMD_PART: PartSpec = { id: "claudemd", eyebrow: EYEBROW, entries: STEP02_CLAUDEMD };
