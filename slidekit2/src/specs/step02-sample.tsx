// step02 "재렌더 샘플" — three slides that already exist in the SHIPPED 86-slide step02 deck
// (assets/basic/step02/*.svg, built by the old tools/slidekit.py at 1280x720), rebuilt here in this
// renderer so the CEO can compare old vs new side by side before the whole deck is migrated.
//
// The three were picked because each one carries a different CEO complaint from 2026-09-20:
//   01  <- shipped slide 09 "claude 실행"        : the agent UI was hand-drawn, no real welcome box
//   02  <- shipped slide 16 "언제 읽히나"         : boxes+arrows only, no picture; AI-voice title
//   03  <- shipped slide 17 "어디에 두나"         : AI-voice title, mockup too small to read
//
// Titles are rewritten as keyword noun phrases (specs/types.ts rule: "no question/fragment"), which is
// exactly the "'언제 읽히나' 같은 ㅈ같은 ai 말투" the CEO called out.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode, type TerminalPaneLine } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { Camera, cameraView } from "../core/Camera";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "재렌더 샘플";
const TOTAL = 3;

const WINDOW_HEADER_H = 34; // AppWindow's native title bar height (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15;
const BADGE_GUTTER = 44; // reserved inside the terminal so badges never cover its text.
const TERM_WINDOW_H = 620;

// Same helpers the claudemd part uses — an 8-col camera-zoomed VS Code screen + a 4-col annotation column.
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
// 01 · claude 실행 화면  (shipped slide 09)
// Old slide drew the terminal by hand: a bare prompt line, a fake cyan "Claude Code v2.1.274" line and
// nothing else. The real CLI opens with the orange-bordered welcome box, so the shared ClaudeCodeTerminal
// draws that instead, and the three things a student must recognise get numbered badges.
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const termProps = {
    width: termW,
    showLaunch: true,
    showWelcome: true,
    placeholder: "무엇을 도와드릴까요?",
    fontSize: TERM_FONT_SIZE,
    leftGutter: BADGE_GUTTER,
  };
  const L = layoutClaudeCodeTerminal(termProps);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + (L.launchY ?? 0) + L.lineH / 2 });
  const b2 = toFrame({ x: badgeX, y: contentTop + (L.welcomeY ?? 0) + (L.welcomeH ?? 0) / 2 });
  const b3 = toFrame({ x: badgeX, y: contentTop + L.inputY + L.inputH / 2 });

  const nodes: ExplorerNode[] = [{ name: "(비어 있음)", kind: "file", depth: 0 }];

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="claude 실행 화면">
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
          { number: 1, head: "터미널에 claude 입력", body: "작업 폴더가 agent1 인지 확인하고 Enter 를 누른다." },
          { number: 2, head: "주황색 시작 상자", body: "이 상자가 보이면 Claude Code 가 제대로 켜진 것이다." },
          { number: 3, head: "입력칸이 나타난다", body: "여기부터 사람 말로 지시를 적는다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · 세션 시작 시 자동 로드  (shipped slide 16 "언제 읽히나")
// Old slide was three tinted boxes with arrows ("새 대화 시작" -> "CLAUDE.md 자동 로드" -> "그 규칙대로
// 답변") plus a blue "기억할 것" note box, and no picture at all. Here the same fact is SHOWN: the
// explorer has the file, the student asks the same question as before, and the answer comes back in the
// persona the file defines — without anyone telling Claude to read it.
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

  // The explorer row the first badge points at (row 2 of the tree area, under the root header row).
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
          { number: 1, head: "파일은 폴더에 그대로 둔다", body: "agent1/.claude/CLAUDE.md 를 만들어 두기만 한다." },
          { number: 2, head: "claude 를 새로 켠다", body: '"CLAUDE.md 읽어" 라고 시키지 않는다.' },
          { number: 3, head: "답이 이미 달라져 있다", body: "이름·역할·말투가 파일 그대로 나온다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · .claude 숨김 폴더 위치  (shipped slide 17 "어디에 두나")
// Old slide had the right idea (a VS Code explorer) but the window was drawn at 1280x720 scale, so the
// tree was a few px tall and the "hidden folder" point was made by a sentence typed INTO the terminal
// as if it were output. Here the camera zooms the Explorer pane to real reading size and the terminal
// shows a real `dir` / `dir -Force` pair, which is what actually proves the folder is hidden.
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  // `dir` hides it, `dir -Force` shows it — this pair is what actually proves the folder is hidden,
  // instead of the old slide's sentence typed into the terminal as if it were output.
  const terminalLines: TerminalPaneLine[] = [
    { type: "input", text: "dir" },
    { type: "output", text: "자기소개서.txt" },
    { type: "input", text: "dir -Force" },
    { type: "output", text: ".claude" },
    { type: "output", text: "자기소개서.txt" },
  ];

  const nodes: ExplorerNode[] = [
    { name: ".claude", kind: "folder", depth: 0, state: "selected" },
    { name: "CLAUDE.md", kind: "file", depth: 1 },
    { name: "자기소개서.txt", kind: "file", depth: 0 },
  ];

  // Badges sit at the RIGHT edge of the Explorer pane, never on top of a row's text
  // (src/README.md: "A badge never covers text, digits or a button label").
  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH; // header row + the AGENT1 root row
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

export const STEP02_SAMPLE: SlideEntry[] = [
  { index: 1, name: "01_claude_실행_화면", title: "claude 실행 화면", render: () => React.createElement(Slide01) },
  { index: 2, name: "02_세션_시작_자동_로드", title: "세션 시작 시 자동 로드", render: () => React.createElement(Slide02) },
  { index: 3, name: "03_claude_숨김_폴더_위치", title: ".claude 숨김 폴더 위치", render: () => React.createElement(Slide03) },
];

export const STEP02_SAMPLE_PART: PartSpec = { id: "sample", eyebrow: EYEBROW, entries: STEP02_SAMPLE };
