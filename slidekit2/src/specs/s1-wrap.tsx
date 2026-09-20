// s1-wrap — basic 1회차 슬라이드 66~67 (2장), rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step01/세_에이전트_결과_비교.svg, Step1_완료.svg) and
// courses/basic/step01.json parts[10] "마무리". The shipped pair drew tinted comparison/checklist cards
// with no picture — exactly the "boxes instead of showing" pattern the CEO threw out. Both are rebuilt
// here as a real VS Code Explorer screen (the actual 에이전트1/introduce folder each of the three CLIs
// wrote into) + the shared AnnotationColumn for the comparison/checklist text.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { Camera, cameraView } from "../core/Camera";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "1회차 마무리";
const TOTAL = 2;

const TERM_WINDOW_H = 620;
const WINDOW_HEADER_H = 34;

function windowGeometry(illoW: number, illoH: number, windowH = 480) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

// ------------------------------------------------------------------------------------------------
// 01 · 세_에이전트_결과_비교  (shipped slide 66) — 에이전트1/introduce now holds all three CLIs' output
// files (gemini.txt · gpt.txt · claude.txt — courses/basic/step01.json). gemini.txt's content is the one
// this class actually generated and verified earlier in the deck; gpt.txt/claude.txt bodies are never
// shown here since no shipped source gives their literal text (plan hard rule: never invent content) —
// the editor shows the file that *is* known, and the Explorer tree shows all three sitting side by side.
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const nodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0 },
    { name: "claude.txt", kind: "file", depth: 1 },
    { name: "gemini.txt", kind: "file", depth: 1, state: "selected" },
    { name: "gpt.txt", kind: "file", depth: 1 },
  ];

  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH * 2; // introduce root row + claude.txt row, then gemini.txt row
  const badgeExplorerX = ACTIVITY_W + SIDEBAR_W - 26;
  const bExplorer = toFrame({ x: badgeExplorerX, y: treeTop + rowH * 0.5 });

  const editorPaneRight = windowNative.w;
  const bTab = toFrame({ x: editorPaneRight - 24, y: WINDOW_HEADER_H + 17 });

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="세 에이전트의 결과 비교">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="bottom"
            showTerminal={false}
            mainMode="editor"
            editorTab={{
              name: "gemini.txt",
              lines: ["# 자기소개서 (경로 이동 완료)", "안녕하세요!", "저는 Antigravity입니다.", "작업 폴더의 파일을 읽고 수정할 수 있습니다."],
            }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={bExplorer.x} y={bExplorer.y} size={34} />
      <FocusBadge number={2} x={bTab.x} y={bTab.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "한 폴더에 나란히 남은 세 결과", body: "에이전트1/introduce 안의 gemini.txt · gpt.txt · claude.txt 를 나란히 연다." },
          { number: 2, head: "문체·길이·설명 방식 비교", body: "같은 프롬프트에 대한 답이 도구마다 어떻게 다른지 읽어본다." },
          { number: 3, head: "실행 권한을 묻는 방식", body: "파일을 만들거나 옮길 때 확인을 구하는 방식도 도구마다 다르다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · Step1_완료  (shipped slide 67) — the same folder, one last time, standing in for the 4 checklist
// items in courses/basic/step01.json parts[10] / slide topics.
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const nodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0, state: "selected" },
    { name: "claude.txt", kind: "file", depth: 1 },
    { name: "gemini.txt", kind: "file", depth: 1 },
    { name: "gpt.txt", kind: "file", depth: 1 },
  ];

  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH * 0.5;
  const badgeExplorerX = ACTIVITY_W + SIDEBAR_W - 26;
  const bExplorer = toFrame({ x: badgeExplorerX, y: treeTop });

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="Step 1 완료">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={nodes} layout="bottom" showTerminal={false} mainMode="empty" />
        </Camera>
      </div>

      <FocusBadge number={1} x={bExplorer.x} y={bExplorer.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "VS Code 터미널 제어 숙달", body: "Ctrl + J 로 열고, 우측 패널로 옮기고, Ctrl + C 로 빠져나왔다." },
          { number: 2, head: "3대 CLI 설치·로그인 완료", body: "Antigravity · Codex · Claude Code 를 모두 설치하고 로그인했다." },
          { number: 3, head: "공통 4단계 실습 완료", body: "파일 생성 → 확인 → 폴더 생성 → 이동, 세 도구 모두 같은 순서로 해봤다." },
          { number: 4, head: "터미널 상태 구분 능력 확보", body: "일반 터미널과 AI CLI 입력창을 헷갈리지 않는다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S1_WRAP: SlideEntry[] = [
  { index: 1, name: "세_에이전트_결과_비교", title: "세 에이전트의 결과 비교", render: () => React.createElement(Slide01) },
  { index: 2, name: "Step1_완료", title: "Step 1 완료", render: () => React.createElement(Slide02) },
];

export const S1_WRAP_PART: PartSpec = { id: "s1-wrap", eyebrow: EYEBROW, entries: S1_WRAP };
