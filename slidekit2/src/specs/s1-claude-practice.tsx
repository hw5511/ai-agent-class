// s1-claude-practice — basic 1회차 슬라이드 58~65 (8장). Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step01/*.svg) into this renderer. Content facts come from those SVGs'
// own text nodes and from courses/basic/step01.json (slides index 57..64 in that file's `slides`
// array). Every screen where `claude` is running reuses ../ClaudeCodeTerminal — turns/tool-call lines
// exactly as the shipped SVGs show them (e.g. "Write(claude.txt)" / "Bash(mkdir introduce)" as
// consecutive assistant turns, matching real Claude Code tool-call display) — with the same
// badge-gutter math ../specs/step02-sample.tsx and ../specs/step02-write.tsx use
// (`layoutClaudeCodeTerminal` + `BADGE_GUTTER`). The one screen where Claude Code is NOT running
// (slide 8, back to a plain PowerShell prompt) uses VSCodeScreen's own built-in `terminalLines`
// instead — the same "not Claude" pattern ../specs/step02-sample.tsx slide 03 uses for its `dir` /
// `dir -Force` pair.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode, type TerminalPaneLine, type EditorTabSpec } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "CLAUDE CODE 실습"; // CLAUDE CODE 실습
const TOTAL = 8;

const WINDOW_HEADER_H = 34;
const TERM_TAB_H = 30;
const TERM_FONT_SIZE = 15;
const BADGE_GUTTER = 44;
const TERM_WINDOW_H = 620;

const CWD = "C:\\Users\\student\\에이전트1"; // C:\Users\student\에이전트1

function windowGeometry(illoW: number, illoH: number, windowH = TERM_WINDOW_H) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

function rightTermWidth(windowNative: { w: number }, mainMode: "empty" | "editor" = "empty"): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  return Math.round(contentW * (mainMode === "empty" ? 0.84 : 0.62));
}

// claude.txt content the whole practice run shares (real text from the shipped SVGs' editor preview),
// with only the first line changing once the file is moved (claude_자기소개서_이동.svg: "(이동 완료)").
const CLAUDE_TXT_LINES_INITIAL = [
  "# 자기소개서", // # 자기소개서
  "안녕하세요! 저는 Claude Code입니다.",
  "프로젝트 전반을 이해하고 대규모 리팩터링 및",
  "문서 작성을 주도할 수 있습니다.",
];
const CLAUDE_TXT_LINES_MOVED = [
  "# 자기소개서 (이동 완료)", // # 자기소개서 (이동 완료)
  ...CLAUDE_TXT_LINES_INITIAL.slice(1),
];

// A right-layout VS Code + Claude Code terminal illo, local to this part (own copy of the
// step02-sample.tsx / step02-write.tsx helper pattern — no shared file touched).
function terminalIllo(opts: {
  x: number;
  y: number;
  w: number;
  h: number;
  explorerNodes: ExplorerNode[];
  turns?: ClaudeCodeTurn[];
  inputText?: string;
  placeholder?: string;
  mainMode?: "empty" | "editor";
  editorTab?: EditorTabSpec;
}) {
  const { x, y, w, h, explorerNodes, turns, inputText, placeholder, mainMode = "empty", editorTab } = opts;
  const { windowNative, focus, view } = windowGeometry(w, h);
  const termW = rightTermWidth(windowNative, mainMode);
  const termProps = { width: termW, turns: turns ?? [], inputText, placeholder, cwd: CWD, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER };
  const termLayout = layoutClaudeCodeTerminal(termProps);
  const toFrame = (p: { x: number; y: number }) => ({ x: x + view.tx + p.x * view.s, y: y + view.ty + p.y * view.s });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const spotForTurn = (i: number) => toFrame({ x: badgeX, y: contentTop + termLayout.turns[i].anchorY + termLayout.lineH / 2 });
  const spotForInput = () => toFrame({ x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 });
  // Badge spot at the RIGHT edge of the Explorer pane, on the row at 0-based tree index `rowIdx`
  // (header row + root row precede the tree rows) — same trick step02-sample.tsx slide 03 uses.
  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH;
  const spotForExplorerRow = (rowIdx: number) => toFrame({ x: ACTIVITY_W + SIDEBAR_W - 26, y: treeTop + rowH * (rowIdx + 0.5) });

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
          terminalContent={<ClaudeCodeTerminal {...termProps} />}
          mainMode={mainMode}
          editorTab={editorTab}
        />
      </Camera>
    </div>
  );
  return { node, spotForTurn, spotForInput, spotForExplorerRow };
}

const illoBox = () => ({ x: colX(0), y: BODY_Y, w: colW(8), h: BODY_H });

// ------------------------------------------------------------------------------------------------
// 01 · 첫 대화 — 너는 누구니  (shipped slide "claude_첫_대화_자기소개")
// Title dropped the trailing "?" from the shipped SVG title (a quoted user prompt used as the slide
// name, not a rhetorical question about the slide's content) to stay clear of the "no question-title"
// rule; the prompt itself keeps its "?" inside the terminal turn, since that is the literal thing typed.
// ------------------------------------------------------------------------------------------------
const Slide01: React.FC = () => {
  const { x, y, w, h } = illoBox();
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "너는 누구니?" },
    { role: "assistant", text: "저는 Claude Code입니다. 파일을 읽고 쓰고 터미널 명령까지 실행할 수 있는 AI 코딩 에이전트예요." },
  ];
  const { node, spotForTurn } = terminalIllo({ x, y, w, h, explorerNodes: [{ name: "(비어 있음)", kind: "file", depth: 0 }], turns, placeholder: "메시지를 입력하세요..." });
  const b1 = spotForTurn(0);
  const b2 = spotForTurn(1);

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="첫 대화 — 자기소개 확인">
      {node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(8)}
        y={y}
        width={colW(4)}
        height={h}
        items={[
          { number: 1, head: "질문 입력", body: "입력창에 '너는 누구니?'라고 적고 Enter 를 누른다." },
          { number: 2, head: "자기소개 확인", body: "Claude Code 가 자신의 역할과 특징을 설명한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · 자기소개서 파일 만들기  (shipped slide "claude_자기소개서_생성")
// ------------------------------------------------------------------------------------------------
const Slide02: React.FC = () => {
  const { x, y, w, h } = illoBox();
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "현재 폴더에 'claude.txt'를 만들어줘." },
    { role: "user", text: "네가 누구이고 무엇을 할 수 있는지 간단히 작성해줘." },
    { role: "assistant", text: "Write(claude.txt)" },
    { role: "assistant", text: "✔ claude.txt 파일을 만들었습니다." },
  ];
  const explorerNodes: ExplorerNode[] = [{ name: "claude.txt", kind: "file", depth: 0, state: "new" }];
  const editorTab: EditorTabSpec = { name: "claude.txt", lines: CLAUDE_TXT_LINES_INITIAL };
  const { node, spotForTurn } = terminalIllo({ x, y, w, h, explorerNodes, turns, mainMode: "editor", editorTab, placeholder: "메시지를 입력하세요..." });
  const b1 = spotForTurn(0);
  const b2 = spotForTurn(2);

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="자기소개서 파일 만들기">
      {node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(8)}
        y={y}
        width={colW(4)}
        height={h}
        items={[
          { number: 1, head: "파일 이름과 내용 요청", body: "파일 이름은 모델 이름을 따라 claude.txt 로 짓는다." },
          { number: 2, head: "Write 도구 실행", body: "Claude Code 가 파일을 생성하고 완료를 알린다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · 탐색기에서 파일 확인하기  (shipped slide "claude_파일_생성_확인")
// ------------------------------------------------------------------------------------------------
const Slide03: React.FC = () => {
  const { x, y, w, h } = illoBox();
  const turns: ClaudeCodeTurn[] = [
    { role: "assistant", text: "Write(claude.txt)" },
    { role: "assistant", text: "✔ 완료했습니다. claude.txt 를 생성했습니다." },
    { role: "assistant", text: "왼쪽 탐색기에서 파일을 선택해 내용을 확인할 수 있습니다." },
  ];
  const explorerNodes: ExplorerNode[] = [{ name: "claude.txt", kind: "file", depth: 0, state: "selected" }];
  const editorTab: EditorTabSpec = { name: "claude.txt", lines: CLAUDE_TXT_LINES_INITIAL };
  const { node, spotForTurn, spotForExplorerRow } = terminalIllo({ x, y, w, h, explorerNodes, turns, mainMode: "editor", editorTab, placeholder: "메시지를 입력하세요..." });
  const b1 = spotForExplorerRow(0);
  const b2 = spotForTurn(1);

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="탐색기에서 파일 확인하기">
      {node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(8)}
        y={y}
        width={colW(4)}
        height={h}
        items={[
          { number: 1, head: "탐색기에 생성됨", body: "에이전트1 폴더에 claude.txt 가 실제로 생겼는지 확인한다." },
          { number: 2, head: "내용 열람", body: "응답만 보지 말고 편집기에서 실제 내용도 확인한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · introduce 폴더 만들기  (shipped slide "claude_introduce_폴더_생성")
// ------------------------------------------------------------------------------------------------
const Slide04: React.FC = () => {
  const { x, y, w, h } = illoBox();
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "'introduce' 폴더를 만들어줘." },
    { role: "assistant", text: "Bash(mkdir introduce)" },
    { role: "assistant", text: "✔ 'introduce' 폴더를 생성했습니다." },
  ];
  const explorerNodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0, state: "new" },
    { name: "claude.txt", kind: "file", depth: 0 },
  ];
  const editorTab: EditorTabSpec = { name: "claude.txt", lines: CLAUDE_TXT_LINES_INITIAL };
  const { node, spotForTurn } = terminalIllo({ x, y, w, h, explorerNodes, turns, mainMode: "editor", editorTab, placeholder: "메시지를 입력하세요..." });
  const b1 = spotForTurn(0);
  const b2 = spotForTurn(2);

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="introduce 폴더 만들기">
      {node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(8)}
        y={y}
        width={colW(4)}
        height={h}
        items={[
          { number: 1, head: "폴더 생성 요청", body: "현재 폴더에 introduce 폴더를 만들어달라고 요청한다." },
          { number: 2, head: "있으면 그대로 진행", body: "이미 있다면 에이전트가 '이미 있습니다'라고 답하고 넘어간다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · 자기소개서를 폴더로 옥기기  (shipped slide "claude_자기소개서_이동")
// ------------------------------------------------------------------------------------------------
const Slide05: React.FC = () => {
  const { x, y, w, h } = illoBox();
  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "'claude.txt'를 'introduce' 폴더로 옥겨줘." },
    { role: "assistant", text: "Bash(mv claude.txt introduce/)" },
    { role: "assistant", text: "✔ 파일을 introduce 폴더로 이동했습니다. introduce\\claude.txt 로 이동 완료." },
  ];
  const explorerNodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0, state: "selected" },
    { name: "claude.txt", kind: "file", depth: 1, state: "new" },
  ];
  const editorTab: EditorTabSpec = { name: "claude.txt", lines: CLAUDE_TXT_LINES_MOVED };
  const { node, spotForTurn } = terminalIllo({ x, y, w, h, explorerNodes, turns, mainMode: "editor", editorTab, placeholder: "메시지를 입력하세요..." });
  const b1 = spotForTurn(0);
  const b2 = spotForTurn(2);

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="자기소개서를 폴더로 옥기기">
      {node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(8)}
        y={y}
        width={colW(4)}
        height={h}
        items={[
          { number: 1, head: "이동 지시", body: "자연어로 파일 이동을 요청한다." },
          { number: 2, head: "새 경로 확인", body: "introduce\\claude.txt 로 이동됐는지 확인한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · 최종 폴더 구조 확인  (shipped slide "claude_최종_폴더_구조")
// The final introduce/claude.txt tree is shown by the Explorer pane's own nested rows, not a
// hand-drawn ASCII tree — the shipped SVG drew the same fact as an ASCII tree text block, but this
// renderer's Explorer pane already IS that tree, drawn for real.
// ------------------------------------------------------------------------------------------------
const Slide06: React.FC = () => {
  const { x, y, w, h } = illoBox();
  const turns: ClaudeCodeTurn[] = [
    { role: "assistant", text: "✔ 실습을 마쳤습니다. 파일과 폴더 구조가 완성되었습니다." },
    { role: "assistant", text: "에이전트1 > introduce > claude.txt" },
  ];
  const explorerNodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0, state: "selected" },
    { name: "claude.txt", kind: "file", depth: 1 },
  ];
  const editorTab: EditorTabSpec = { name: "claude.txt", lines: CLAUDE_TXT_LINES_MOVED };
  const { node, spotForTurn, spotForExplorerRow } = terminalIllo({ x, y, w, h, explorerNodes, turns, mainMode: "editor", editorTab, placeholder: "메시지를 입력하세요..." });
  const b1 = spotForExplorerRow(1);
  const b2 = spotForTurn(0);

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="최종 폴더 구조 확인">
      {node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(8)}
        y={y}
        width={colW(4)}
        height={h}
        items={[
          { number: 1, head: "introduce 안 claude.txt", body: "introduce 폴더 안에 claude.txt 가 추가됐는지 확인한다." },
          { number: 2, head: "완료 메시지 확인", body: "앞 에이전트의 파일과 나란히 쌎인다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · Ctrl + C 로 CLI 종료  (shipped slide "claude_Ctrl_C_종료")
// A small local key-cap chip (rounded token-only boxes, not a hardcoded color) shows the physical key
// combo next to the idle input box — a concrete UI element, not an explainer box.
// ------------------------------------------------------------------------------------------------
const KeyCap: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 34, height: 30, padding: "0 8px", borderRadius: 6, border: `1px solid ${COLORS.line}`, background: COLORS.paper2, fontFamily: FONTS.term, fontWeight: 600, fontSize: 15, color: COLORS.ink }}>
    {label}
  </div>
);

const Slide07: React.FC = () => {
  const { x, y, w, h } = illoBox();
  const { windowNative, focus, view } = windowGeometry(w, h);
  const termW = rightTermWidth(windowNative, "empty");
  const termProps = { width: termW, placeholder: "무엇을 도와드릴까요? [입력 대기]", cwd: CWD, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER };
  const layout = layoutClaudeCodeTerminal(termProps);
  const toFrame = (p: { x: number; y: number }) => ({ x: x + view.tx + p.x * view.s, y: y + view.ty + p.y * view.s });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + layout.inputY + layout.inputH / 2 });
  const keyChipFrame = toFrame({ x: paneLeft + termW - 120, y: contentTop + layout.inputY + layout.inputH + 34 });
  const b2 = { x: keyChipFrame.x + 40 * view.s, y: keyChipFrame.y };

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="Ctrl + C 로 CLI 종료">
      <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={w} height={h} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={[{ name: "introduce", kind: "folder", depth: 0 }, { name: "claude.txt", kind: "file", depth: 1 }]} layout="right" terminalWidth={termW} showTerminal terminalContent={<ClaudeCodeTerminal {...termProps} />} mainMode="empty" />
        </Camera>
      </div>
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <div style={{ position: "absolute", left: keyChipFrame.x, top: keyChipFrame.y, display: "flex", alignItems: "center", gap: 8 }}>
        <KeyCap label="Ctrl" />
        <span style={{ fontFamily: FONTS.term, color: COLORS.ink2, fontSize: 16 }}>+</span>
        <KeyCap label="C" />
      </div>
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(8)}
        y={y}
        width={colW(4)}
        height={h}
        items={[
          { number: 1, head: "입력 대기 상태", body: "빈 입력창에서 Ctrl + C 를 누른다." },
          { number: 2, head: "세션 종료", body: "^C 가 표시되며 대화형 세션이 끝난다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · 일반 터미널 복귀 확인  (shipped slide "claude_일반_터미널_복귀")
// Claude Code is NOT running here — a plain PowerShell prompt — so this uses VSCodeScreen's own
// built-in terminalLines instead of ClaudeCodeTerminal (the shared component is for screens where
// Claude Code IS running; this one is explicitly the opposite).
// ------------------------------------------------------------------------------------------------
const Slide08: React.FC = () => {
  const { x, y, w, h } = illoBox();
  const { windowNative, focus, view } = windowGeometry(w, h);
  const termW = rightTermWidth(windowNative, "empty");
  const lines: TerminalPaneLine[] = [
    { type: "output", text: "✔ 일반 터미널 프롬프트로 완전히 복귀했습니다." },
    { type: "output", text: "3대 AI CLI(Antigravity, Codex, Claude Code) 실습이 모두 완료되었습니다!" },
    { type: "input", text: "" },
  ];
  const toFrame = (p: { x: number; y: number }) => ({ x: x + view.tx + p.x * view.s, y: y + view.ty + p.y * view.s });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const rowH = 15 * 1.5 + 4; // VSCodeScreen TerminalPane: fontSize 15, lineHeight 1.5, gap 4 (own constants).
  const b1 = toFrame({ x: paneLeft + 16, y: contentTop + 10 + rowH * 2.5 });
  const b2 = toFrame({ x: paneLeft + 16, y: contentTop + 10 + rowH * 0.5 });

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="일반 터미널 복귀 확인">
      <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={w} height={h} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={[{ name: "introduce", kind: "folder", depth: 0 }, { name: "claude.txt", kind: "file", depth: 1 }]} layout="right" terminalWidth={termW} showTerminal terminalLines={lines} mainMode="empty" />
        </Camera>
      </div>
      <FocusBadge number={1} x={b2.x} y={b2.y} size={34} />
      <FocusBadge number={2} x={b1.x} y={b1.y} size={34} />
      <AnnotationColumn
        x={colX(8)}
        y={y}
        width={colW(4)}
        height={h}
        items={[
          { number: 1, head: "PowerShell 프롬프트 확인", body: "PS ...\\에이전트1> 만 보이면 정상 종료된 것이다." },
          { number: 2, head: "3대 CLI 실습 완료", body: "Antigravity · Codex · Claude Code 실습을 모두 마쳤다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S1_CLAUDE_PRACTICE: SlideEntry[] = [
  { index: 1, name: "claude_첫_대화_자기소개", title: "첫 대화 — 자기소개 확인", render: () => React.createElement(Slide01) },
  { index: 2, name: "claude_자기소개서_생성", title: "자기소개서 파일 만들기", render: () => React.createElement(Slide02) },
  { index: 3, name: "claude_파일_생성_확인", title: "탐색기에서 파일 확인하기", render: () => React.createElement(Slide03) },
  { index: 4, name: "claude_introduce_폴더_생성", title: "introduce 폴더 만들기", render: () => React.createElement(Slide04) },
  { index: 5, name: "claude_자기소개서_이동", title: "자기소개서를 폴더로 옥기기", render: () => React.createElement(Slide05) },
  { index: 6, name: "claude_최종_폴더_구조", title: "최종 폴더 구조 확인", render: () => React.createElement(Slide06) },
  { index: 7, name: "claude_Ctrl_C_종료", title: "Ctrl + C 로 CLI 종료", render: () => React.createElement(Slide07) },
  { index: 8, name: "claude_일반_터미널_복귀", title: "일반 터미널 복귀 확인", render: () => React.createElement(Slide08) },
];

export const S1_CLAUDE_PRACTICE_PART: PartSpec = { id: "s1-claude-practice", eyebrow: EYEBROW, entries: S1_CLAUDE_PRACTICE };
