// s1-codex — basic 1회차 슬라이드 39~47 (9장). Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step01/*.svg) into this renderer. Every VS Code screen here runs the
// Codex CLI in the terminal panel: layout="right" + VSCodeScreen's own `terminalLines` (never
// ClaudeCodeTerminal, which is Claude-specific — its welcome box literally says "Welcome to Claude
// Code!"). Facts/commands/outputs are copied from the shipped SVGs and cross-checked against
// courses/basic/step01.json (slides 39-47, part "Codex 시작과 실습"). Practice file is gpt.txt.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode, type TerminalPaneLine, type EditorTabSpec } from "../VSCodeScreen";
import { Camera, cameraView } from "../core/Camera";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "CODEX";
const TOTAL = 9;

// ---- shared geometry (same math as specs/step02-sample.tsx: 8-col VS Code screen + 4-col annotations,
// camera-zoomed native window, badges placed at explorer/terminal edges so they never cover text). ----
const WINDOW_HEADER_H = 34; // AppWindow native title bar height
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height
const TERM_WINDOW_H = 620;
const TERM_FONT_SIZE = 15; // matches TerminalPane's fixed line font size
const LINE_ROW_H = TERM_FONT_SIZE * 1.5;
const LINE_GAP = 4;
const LINE_PITCH = LINE_ROW_H + LINE_GAP;
const LINE_PAD_TOP = 10;
const EXPLORER_ROW_H = 30;
const EXPLORER_TREE_TOP = WINDOW_HEADER_H + 36 + EXPLORER_ROW_H; // header row + the root row

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

// Vertical center (native px) of terminal line `i`, counting from the top of the TerminalPane's own
// content area (below its 30px tab strip).
function termLineY(i: number): number {
  return WINDOW_HEADER_H + TERM_TAB_H + LINE_PAD_TOP + i * LINE_PITCH + LINE_ROW_H / 2;
}

// Vertical center (native px) of explorer tree row `i` (0-based, first row under the root).
function explorerRowY(i: number): number {
  return EXPLORER_TREE_TOP + EXPLORER_ROW_H * (i + 0.5);
}

const GPT_TXT_LINES_FULL = [
  "# 자기소개서",
  "안녕하세요!",
  "저는 Codex입니다.",
  "작업 폴더의 파일을 읽고, 요청에 따라",
  "파일을 만들거나 수정할 수 있습니다.",
];
const GPT_TXT_LINES_SHORT = ["# 자기소개서", "안녕하세요! 저는 Codex입니다.", "작업 폴더의 파일을 읽고 수정할 수 있습니다."];
const GPT_TXT_LINES_MOVED = ["# 자기소개서 (경로 이동 완료)", "안녕하세요!", "저는 Codex입니다.", "작업 폴더의 파일을 읽고 수정할 수 있습니다."];

// Common scaffold: 8-col VS Code screen (camera-zoomed) + 4-col AnnotationColumn on the right.
function CodexScreenSlide(props: {
  index: number;
  title: string;
  explorerNodes: ExplorerNode[];
  terminalLines: TerminalPaneLine[];
  mainMode?: "empty" | "editor";
  editorTab?: EditorTabSpec;
  badges: { number: number; x: number; y: number }[];
  items: { number: number; head: string; body?: string }[];
}) {
  const { index, title, explorerNodes, terminalLines, mainMode = "empty", editorTab, badges, items } = props;
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative, mainMode);

  return (
    <SlideFrame index={index} total={TOTAL} eyebrow={EYEBROW} title={title}>
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalLines={terminalLines}
            mainMode={mainMode}
            editorTab={editorTab}
          />
        </Camera>
      </div>

      {badges.map((b) => {
        const p = toFrame(b);
        return <FocusBadge key={b.number} number={b.number} x={p.x} y={p.y} size={34} />;
      })}

      <AnnotationColumn x={colX(8)} y={illoY} width={colW(4)} height={illoH} items={items} />
    </SlideFrame>
  );
}

// ------------------------------------------------------------------------------------------------
// 1 · Codex 설치 확인 및 실행 (shipped: codex_설치_확인_및_실행.svg)
// ------------------------------------------------------------------------------------------------
const Slide01: React.FC = () => {
  const windowNative0 = windowGeometry(colW(8), BODY_H).windowNative;
  const badgeX = windowNative0.w - 26;
  return CodexScreenSlide({
    index: 1,
    title: "Codex 설치 확인 및 실행",
    explorerNodes: [{ name: "(비어 있음)", kind: "file", depth: 0 }],
    terminalLines: [
      { type: "input", text: "codex --version" },
      { type: "output", text: "codex-cli 0.154.0" },
      { type: "input", text: "codex" },
      { type: "success", text: "Codex CLI가 시작되었습니다." },
      { type: "output", text: "무엇을 도와드릴까요?" },
    ],
    badges: [
      { number: 1, x: badgeX, y: termLineY(0) },
      { number: 2, x: badgeX, y: termLineY(2) },
    ],
    items: [
      { number: 1, head: "버전 확인", body: "codex --version 으로 설치를 확인한다." },
      { number: 2, head: "codex 실행", body: "codex 를 입력해 CLI 를 시작한다. 설치와 PATH 등록은 agy 가 이미 끝냈다." },
    ],
  });
};

// ------------------------------------------------------------------------------------------------
// 2 · Codex 로그인 및 실행 화면 (shipped: codex_로그인_및_실행_화면.svg)
// ------------------------------------------------------------------------------------------------
const Slide02: React.FC = () => {
  const windowNative0 = windowGeometry(colW(8), BODY_H).windowNative;
  const badgeX = windowNative0.w - 26;
  return CodexScreenSlide({
    index: 2,
    title: "Codex 로그인 및 실행 화면",
    explorerNodes: [{ name: "(비어 있음)", kind: "file", depth: 0 }],
    terminalLines: [
      { type: "output", text: "ChatGPT 계정으로 로그인" },
      { type: "success", text: "브라우저 인증 완료" },
      { type: "output", text: "작업 폴더: agent1" },
      { type: "output", text: "무엇을 도와드릴까요?" },
    ],
    badges: [
      { number: 1, x: badgeX, y: termLineY(1) },
      { number: 2, x: badgeX, y: termLineY(2) },
    ],
    items: [
      { number: 1, head: "브라우저 로그인 완료", body: "ChatGPT 계정 인증을 마치면 CLI 화면으로 돌아온다." },
      { number: 2, head: "실행 화면과 작업 폴더 확인", body: "현재 작업 폴더가 agent1 인지 확인한다." },
    ],
  });
};

// ------------------------------------------------------------------------------------------------
// 3 · 첫 대화: 너는 누구니? (shipped: codex_첫_대화_자기소개.svg)
// ------------------------------------------------------------------------------------------------
const Slide03: React.FC = () => {
  const windowNative0 = windowGeometry(colW(8), BODY_H).windowNative;
  const badgeX = windowNative0.w - 26;
  return CodexScreenSlide({
    index: 3,
    title: "첫 대화: 자기소개 확인",
    explorerNodes: [{ name: "(비어 있음)", kind: "file", depth: 0 }],
    terminalLines: [
      { type: "input", text: "너는 누구니?" },
      { type: "output", text: "안녕하세요, Codex입니다." },
      { type: "output", text: "현재 작업 폴더를 기준으로 파일을 읽고" },
      { type: "output", text: "쓰거나 명령을 실행할 수 있습니다." },
    ],
    badges: [
      { number: 1, x: badgeX, y: termLineY(0) },
      { number: 2, x: badgeX, y: termLineY(1) },
    ],
    items: [
      { number: 1, head: "질문 입력", body: "입력창에 '너는 누구니?' 를 입력한다." },
      { number: 2, head: "자기소개 응답 확인", body: "Codex 가 자신의 역할과 할 수 있는 일을 설명한다." },
    ],
  });
};

// ------------------------------------------------------------------------------------------------
// 4 · 자기소개서 파일 만들기 (shipped: codex_자기소개서_생성.svg)
// ------------------------------------------------------------------------------------------------
const Slide04: React.FC = () => {
  const windowNative0 = windowGeometry(colW(8), BODY_H).windowNative;
  const badgeX = windowNative0.w - 26;
  const explorerBadgeX = ACTIVITY_W + SIDEBAR_W - 26;
  return CodexScreenSlide({
    index: 4,
    title: "자기소개서 파일 만들기",
    mainMode: "editor",
    editorTab: { name: "gpt.txt", lines: GPT_TXT_LINES_FULL },
    explorerNodes: [{ name: "gpt.txt", kind: "file", depth: 0, state: "new" }],
    terminalLines: [
      { type: "input", text: "현재 폴더에 'gpt.txt'를 만들어줘." },
      { type: "input", text: "네가 누구이고 무엇을 할 수 있는지 간단히 작성해줘." },
      { type: "success", text: "gpt.txt 파일을 만들었습니다." },
      { type: "output", text: "탐색기에 파일이 추가되고 편집기에서" },
      { type: "output", text: "내용이 열렸습니다." },
    ],
    badges: [
      { number: 1, x: explorerBadgeX, y: explorerRowY(0) },
      { number: 2, x: badgeX, y: termLineY(0) },
    ],
    items: [
      { number: 1, head: "모델 이름으로 파일명", body: "Codex 는 GPT 모델이라 gpt.txt 로 짓는다. 이름이 다르니 세 결과가 한 폴더에 나란히 남는다." },
      { number: 2, head: "자연어 한 줄로 생성 요청", body: "만들 파일과 담을 내용을 한 문장으로 요청한다." },
    ],
  });
};

// ------------------------------------------------------------------------------------------------
// 5 · VS Code에서 파일 확인 (shipped: codex_파일_생성_확인.svg)
// ------------------------------------------------------------------------------------------------
const Slide05: React.FC = () => {
  const windowNative0 = windowGeometry(colW(8), BODY_H).windowNative;
  const editorW = windowNative0.w - ACTIVITY_W - SIDEBAR_W - rightTermWidth(windowNative0, "editor");
  const explorerBadgeX = ACTIVITY_W + SIDEBAR_W - 26;
  const editorBadgeX = ACTIVITY_W + SIDEBAR_W + editorW - 20;
  const editorTabY = WINDOW_HEADER_H + 17;
  return CodexScreenSlide({
    index: 5,
    title: "VS Code에서 파일 확인",
    mainMode: "editor",
    editorTab: { name: "gpt.txt", lines: GPT_TXT_LINES_FULL },
    explorerNodes: [{ name: "gpt.txt", kind: "file", depth: 0, state: "selected" }],
    terminalLines: [
      { type: "success", text: "완료했습니다. gpt.txt를 생성했습니다." },
      { type: "output", text: "왼쪽 탐색기에서 파일을 선택해 내용을" },
      { type: "output", text: "확인할 수 있습니다." },
    ],
    badges: [
      { number: 1, x: explorerBadgeX, y: explorerRowY(0) },
      { number: 2, x: editorBadgeX, y: editorTabY },
    ],
    items: [
      { number: 1, head: "탐색기에서 파일 선택", body: "gpt.txt 를 클릭해 파일을 연다." },
      { number: 2, head: "편집기에서 내용 확인", body: "파일 이름과 저장 위치가 요청과 같은지 직접 확인한다." },
    ],
  });
};

// ------------------------------------------------------------------------------------------------
// 6 · introduce 폴더 만들기 (shipped: codex_introduce_폴더_생성.svg)
// ------------------------------------------------------------------------------------------------
const Slide06: React.FC = () => {
  const windowNative0 = windowGeometry(colW(8), BODY_H).windowNative;
  const badgeX = windowNative0.w - 26;
  const explorerBadgeX = ACTIVITY_W + SIDEBAR_W - 26;
  return CodexScreenSlide({
    index: 6,
    title: "introduce 폴더 만들기",
    mainMode: "editor",
    editorTab: { name: "gpt.txt", lines: GPT_TXT_LINES_SHORT },
    explorerNodes: [
      { name: "introduce", kind: "folder", depth: 0, state: "new" },
      { name: "gpt.txt", kind: "file", depth: 0 },
    ],
    terminalLines: [
      { type: "input", text: "현재 폴더에 'introduce' 폴더를 만들어줘." },
      { type: "success", text: "'introduce' 폴더를 생성했습니다." },
      { type: "output", text: "탐색기에서 새로 만들어진 폴더를" },
      { type: "output", text: "확인할 수 있습니다." },
    ],
    badges: [
      { number: 1, x: badgeX, y: termLineY(0) },
      { number: 2, x: explorerBadgeX, y: explorerRowY(0) },
    ],
    items: [
      { number: 1, head: "폴더 생성 요청", body: "현재 폴더에 introduce 폴더를 만들어 달라고 요청한다." },
      { number: 2, head: "이미 있으면 그대로 진행", body: "앞선 에이전트가 이미 만들어 뒀다면 '이미 있습니다' 라고 답하고 넘어간다." },
    ],
  });
};

// ------------------------------------------------------------------------------------------------
// 7 · 자기소개서를 폴더로 옮기기 (shipped: codex_자기소개서_이동.svg)
// ------------------------------------------------------------------------------------------------
const Slide07: React.FC = () => {
  const windowNative0 = windowGeometry(colW(8), BODY_H).windowNative;
  const badgeX = windowNative0.w - 26;
  const explorerBadgeX = ACTIVITY_W + SIDEBAR_W - 26;
  return CodexScreenSlide({
    index: 7,
    title: "자기소개서를 폴더로 옮기기",
    mainMode: "editor",
    editorTab: { name: "introduce/gpt.txt", lines: GPT_TXT_LINES_MOVED },
    explorerNodes: [
      { name: "introduce", kind: "folder", depth: 0 },
      { name: "gpt.txt", kind: "file", depth: 1, state: "selected" },
    ],
    terminalLines: [
      { type: "input", text: "'gpt.txt'를 'introduce' 폴더로 옮겨줘." },
      { type: "success", text: "파일을 introduce 폴더로 이동했습니다." },
      { type: "output", text: "introduce\\gpt.txt 로 이동 완료." },
    ],
    badges: [
      { number: 1, x: badgeX, y: termLineY(0) },
      { number: 2, x: explorerBadgeX, y: explorerRowY(1) },
    ],
    items: [
      { number: 1, head: "파일 이동 요청", body: "자연어로 파일을 다른 폴더로 옮겨 달라고 지시한다." },
      { number: 2, head: "이동 경로 확인", body: "introduce\\gpt.txt 로 옮겨졌는지, 원래 자리에 파일이 남지 않았는지 확인한다." },
    ],
  });
};

// ------------------------------------------------------------------------------------------------
// 8 · 최종 폴더 구조 확인 (shipped: codex_최종_폴더_구조.svg)
// ------------------------------------------------------------------------------------------------
const Slide08: React.FC = () => {
  const windowNative0 = windowGeometry(colW(8), BODY_H).windowNative;
  const badgeX = windowNative0.w - 26;
  const explorerBadgeX = ACTIVITY_W + SIDEBAR_W - 26;
  return CodexScreenSlide({
    index: 8,
    title: "최종 폴더 구조 확인",
    explorerNodes: [
      { name: "introduce", kind: "folder", depth: 0 },
      { name: "gpt.txt", kind: "file", depth: 1, state: "selected" },
    ],
    terminalLines: [
      { type: "success", text: "실습을 마쳤습니다. 파일과 폴더 구조가" },
      { type: "output", text: "요청한 대로입니다." },
      { type: "output", text: "introduce\\gpt.txt" },
      { type: "output", text: "다음 단계: Ctrl + C로 Codex CLI 종료" },
    ],
    badges: [
      { number: 1, x: explorerBadgeX, y: explorerRowY(1) },
      { number: 2, x: badgeX, y: termLineY(0) },
    ],
    items: [
      { number: 1, head: "최종 경로 확인", body: "introduce\\gpt.txt 위치에 파일이 있는지 확인한다." },
      { number: 2, head: "완료 메시지만 보지 않기", body: "완료 응답과 함께 최종 파일 위치도 직접 확인한다." },
    ],
  });
};

// ------------------------------------------------------------------------------------------------
// 9 · Ctrl + C로 Codex 종료 (shipped: codex_Ctrl_C_종료.svg)
// ------------------------------------------------------------------------------------------------
const Slide09: React.FC = () => {
  const windowNative0 = windowGeometry(colW(8), BODY_H).windowNative;
  const badgeX = windowNative0.w - 26;
  return CodexScreenSlide({
    index: 9,
    title: "Ctrl + C로 Codex 종료",
    explorerNodes: [
      { name: "introduce", kind: "folder", depth: 0 },
      { name: "gpt.txt", kind: "file", depth: 1 },
    ],
    terminalLines: [
      { type: "output", text: "무엇을 도와드릴까요? [입력 대기]" },
      { type: "success", text: "^C" },
      { type: "output", text: "Codex CLI 세션을 정상 종료하고" },
      { type: "output", text: "일반 터미널로 복귀합니다." },
    ],
    badges: [
      { number: 1, x: badgeX, y: termLineY(1) },
      { number: 2, x: badgeX, y: termLineY(2) },
    ],
    items: [
      { number: 1, head: "Ctrl + C 입력", body: "Codex 입력 대기 화면에서 Ctrl + C 를 누른다." },
      { number: 2, head: "일반 터미널로 복귀", body: "Codex CLI 세션이 종료되고 평소 PowerShell 프롬프트로 돌아온다." },
    ],
  });
};

export const S1_CODEX: SlideEntry[] = [
  { index: 1, name: "codex_설치_확인_및_실행", title: "Codex 설치 확인 및 실행", render: () => React.createElement(Slide01) },
  { index: 2, name: "codex_로그인_및_실행_화면", title: "Codex 로그인 및 실행 화면", render: () => React.createElement(Slide02) },
  { index: 3, name: "codex_첫_대화_자기소개", title: "첫 대화: 자기소개 확인", render: () => React.createElement(Slide03) },
  { index: 4, name: "codex_자기소개서_생성", title: "자기소개서 파일 만들기", render: () => React.createElement(Slide04) },
  { index: 5, name: "codex_파일_생성_확인", title: "VS Code에서 파일 확인", render: () => React.createElement(Slide05) },
  { index: 6, name: "codex_introduce_폴더_생성", title: "introduce 폴더 만들기", render: () => React.createElement(Slide06) },
  { index: 7, name: "codex_자기소개서_이동", title: "자기소개서를 폴더로 옮기기", render: () => React.createElement(Slide07) },
  { index: 8, name: "codex_최종_폴더_구조", title: "최종 폴더 구조 확인", render: () => React.createElement(Slide08) },
  { index: 9, name: "codex_Ctrl_C_종료", title: "Ctrl + C로 Codex 종료", render: () => React.createElement(Slide09) },
];

export const S1_CODEX_PART: PartSpec = { id: "s1-codex", eyebrow: EYEBROW, entries: S1_CODEX };
