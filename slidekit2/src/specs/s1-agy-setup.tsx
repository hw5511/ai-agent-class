// s1-agy-setup — basic 1회차 슬라이드 24~28 (5장). Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step01/agy_테마_선택.svg, agy_데이터_사용_설정.svg, agy_초기_설정_완료.svg,
// agy_작업_폴더_신뢰.svg, agy_실행_화면.svg — step01.json slides 24~28) into this renderer.
//
// The shipped slides for this part embed a REAL SCREENSHOT (base64 PNG inside the SVG) of the actual
// Antigravity CLI setup flow. An earlier pass here could not read that embedded image and hand-drew a
// terminal-mockup approximation instead. The CEO reviewed the rebuilt deck side-by-side with the
// shipped one and called that out: a redrawn approximation of a real screen is worse than the real
// thing, so the mockup is gone — all five slides now show the actual extracted screenshots
// (public/slides/shots/agy_*.png, sized per public/slides/shots/_manifest.json) scaled into the 8-col
// body area with the deck's own frame (1px border, RADIUS.outer, soft shadow), never a fake window
// chrome drawn around them (the screenshots already show their own real UI). Annotation copy is kept
// exactly as this file already had it (traced to step01.json goal/topics/action), only the
// illustration and its FocusBadge coordinates changed.
import React from "react";
import { staticFile, Img } from "remotion";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { COLORS, RADIUS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "ANTIGRAVITY 설정";
const TOTAL = 5;

// ---- shared screenshot-frame math (this file only; same convention as s1-agy-install.tsx /
// s1-agy-login.tsx) --------------------------------------------------------------------------------
interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Fit natW x natH inside the box, preserving aspect ratio, centered (CSS object-fit: contain math).
function fitRect(boxX: number, boxY: number, boxW: number, boxH: number, natW: number, natH: number): Rect {
  const scale = Math.min(boxW / natW, boxH / natH);
  const w = natW * scale;
  const h = natH * scale;
  return { x: boxX + (boxW - w) / 2, y: boxY + (boxH - h) / 2, w, h };
}

const ShotFrame: React.FC<{ src: string; rect: Rect }> = ({ src, rect }) => (
  <div
    style={{
      position: "absolute",
      left: rect.x,
      top: rect.y,
      width: rect.w,
      height: rect.h,
      borderRadius: RADIUS.outer,
      border: `1px solid ${COLORS.line}`,
      overflow: "hidden",
      boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
    }}
  >
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
  </div>
);

// ------------------------------------------------------------------------------------------------
// 01 · "Antigravity 화면 테마 선택" (shipped agy_테마_선택 — step01.json slide 24)
// Screenshot: welcome screen with a "Choose your color scheme:" list on the left ("terminal" selected)
// and a live theme-preview chat transcript on the right. The list text stops well before the preview
// panel starts, leaving a real blank vertical gutter between them — the badge sits there.
// ------------------------------------------------------------------------------------------------
const SHOT_THEME = staticFile("slides/shots/agy_테마_선택.png");
const SHOT_THEME_W = 600;
const SHOT_THEME_H = 484;

const Slide01: React.FC = () => {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const rect = fitRect(boxX, boxY, boxW, boxH, SHOT_THEME_W, SHOT_THEME_H);
  const b1 = { x: rect.x + rect.w * 0.38, y: rect.y + rect.h * 0.27 }; // gutter between the list and the preview panel

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="Antigravity 화면 테마 선택">
      <ShotFrame src={SHOT_THEME} rect={rect} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={boxY}
        width={colW(3)}
        height={boxH}
        items={[
          { number: 1, head: "방향키로 테마 목록 이동", body: "위아래 화살표로 읽기 편한 테마를 고른다." },
          { number: "!", head: "Enter 로 확정", body: "원하는 테마에서 Enter 를 누르면 다음 화면으로 넘어간다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · "약관 및 데이터 사용 설정" (shipped agy_데이터_사용_설정 — step01.json slide 25)
// 여기서 누를 키: Enter(체크 상태 변경) / ↓(아래 버튼 줄로 이동). 마우스로는 못 누른다.
// Screenshot: Terms of Service & Data Use screen — the selected checkbox line ("> [x] Yes, I agree
// ...") stops well short of the frame's right edge, and the [Previous] / [Done] button row has a real
// blank gap between the two buttons. Both badges sit in those blank spots, never on the button labels
// or the checkbox text.
// ------------------------------------------------------------------------------------------------
const SHOT_DATA_USE = staticFile("slides/shots/agy_데이터_사용_설정.png");
const SHOT_DATA_USE_W = 664;
const SHOT_DATA_USE_H = 484;

const Slide02: React.FC = () => {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const rect = fitRect(boxX, boxY, boxW, boxH, SHOT_DATA_USE_W, SHOT_DATA_USE_H);
  const b1 = { x: rect.x + rect.w * 0.85, y: rect.y + rect.h * 0.48 }; // right of the selected checkbox row
  const b2 = { x: rect.x + rect.w * 0.32, y: rect.y + rect.h * 0.83 }; // gap between [Previous] and [Done]

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="약관 및 데이터 사용 설정">
      <ShotFrame src={SHOT_DATA_USE} rect={rect} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={boxY}
        width={colW(3)}
        height={boxH}
        items={[
          { number: 1, head: "Enter — 체크 상태 바꾸기", body: "체크 줄에서 Enter 를 누르면 데이터 사용 동의 상태가 바뀐다." },
          { number: 2, head: "↓ — 버튼 줄로 내려가기", body: "체크 상태를 정했으면 방향키 ↓ 로 [Previous] [Done] 줄로 내려간다." },
          { number: "!", head: "마우스 입력 불가", body: "이 화면은 방향키로만 움직인다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · "Antigravity 초기 설정 완료" (shipped agy_초기_설정_완료 — step01.json slide 26)
// 버튼 줄에서 → 로 [Previous]→Done, Enter 로 확정 → 대화 화면 진입. 정리하면 ↓ → Enter.
// Screenshot: same Terms screen, one step later — selection has moved to "Done" (highlighted green).
// Badge 1 sits just right of the "Done" label; badge 2 sits beside the footer's "enter Confirm" text,
// since that keypress is what actually leads into the chat screen (no chat screen appears in this
// frame to point at directly).
// ------------------------------------------------------------------------------------------------
const SHOT_SETUP_DONE = staticFile("slides/shots/agy_초기_설정_완료.png");
const SHOT_SETUP_DONE_W = 685;
const SHOT_SETUP_DONE_H = 484;

const Slide03: React.FC = () => {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const rect = fitRect(boxX, boxY, boxW, boxH, SHOT_SETUP_DONE_W, SHOT_SETUP_DONE_H);
  const b1 = { x: rect.x + rect.w * 0.55, y: rect.y + rect.h * 0.83 }; // right of the highlighted "Done" button
  const b2 = { x: rect.x + rect.w * 0.55, y: rect.y + rect.h * 0.915 }; // right of "enter Confirm" in the footer

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="Antigravity 초기 설정 완료">
      <ShotFrame src={SHOT_SETUP_DONE} rect={rect} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={boxY}
        width={colW(3)}
        height={boxH}
        items={[
          { number: 1, head: "→ 로 Done 으로 이동, Enter 로 확정", body: "버튼 줄에서 → 를 눌러 [Previous] 에서 Done 으로 옮기고 Enter 를 누른다." },
          { number: 2, head: "대화 화면으로 진입", body: "Enter 를 누르면 초기 설정이 끝나고 메인 화면으로 넘어간다." },
          { number: "!", head: "정리하면 ↓ → Enter", body: "앞 화면부터 순서대로 하면 ↓ 그다음 → 그다음 Enter 다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · "실습 폴더 신뢰 확인" (shipped agy_작업_폴더_신뢰 — step01.json slide 27)
// Screenshot: dark "Do you trust the contents of this project?" prompt. Both called-out lines (the
// workspace path, and the selected "Yes, I trust this folder" row) are short and left-aligned, with a
// wide blank area to the right of each — the badges sit there.
// ------------------------------------------------------------------------------------------------
const SHOT_TRUST = staticFile("slides/shots/agy_작업_폴더_신뢰.png");
const SHOT_TRUST_W = 657;
const SHOT_TRUST_H = 484;

const Slide04: React.FC = () => {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const rect = fitRect(boxX, boxY, boxW, boxH, SHOT_TRUST_W, SHOT_TRUST_H);
  const b1 = { x: rect.x + rect.w * 0.55, y: rect.y + rect.h * 0.08 }; // right of the workspace path line
  const b2 = { x: rect.x + rect.w * 0.55, y: rect.y + rect.h * 0.265 }; // right of "Yes, I trust this folder"

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="실습 폴더 신뢰 확인">
      <ShotFrame src={SHOT_TRUST} rect={rect} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={boxY}
        width={colW(3)}
        height={boxH}
        items={[
          { number: 1, head: "작업 폴더 경로 확인", body: "지금 열려 있는 에이전트1 경로가 맞는지 본다." },
          { number: 2, head: "Trust folder 선택", body: "신뢰해야 에이전트에게 파일 읽기·수정 권한이 생긴다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · "Antigravity CLI 실행 화면" (shipped agy_실행_화면 — step01.json slide 28)
// Screenshot: fresh session header (account email, model, cwd) over an otherwise empty chat screen with
// just an input line. All three called-out lines are short, so the first two badges sit to the right of
// their own line's text, and the third sits in the large blank gap just below the empty input row.
// ------------------------------------------------------------------------------------------------
const SHOT_RUNNING = staticFile("slides/shots/agy_실행_화면.png");
const SHOT_RUNNING_W = 747;
const SHOT_RUNNING_H = 484;

const Slide05: React.FC = () => {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const rect = fitRect(boxX, boxY, boxW, boxH, SHOT_RUNNING_W, SHOT_RUNNING_H);
  const b1 = { x: rect.x + rect.w * 0.55, y: rect.y + rect.h * 0.065 }; // right of the account email line
  const b2 = { x: rect.x + rect.w * 0.55, y: rect.y + rect.h * 0.135 }; // right of the "~/Downloads" line
  const b3 = { x: rect.x + rect.w * 0.15, y: rect.y + rect.h * 0.24 }; // blank gap just under the input row

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="Antigravity CLI 실행 화면">
      <ShotFrame src={SHOT_RUNNING} rect={rect} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <FocusBadge number={3} x={b3.x} y={b3.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={boxY}
        width={colW(3)}
        height={boxH}
        items={[
          { number: 1, head: "계정 표시", body: "상단에 로그인된 내 계정 이메일이 보인다." },
          { number: 2, head: "현재 작업 폴더 확인", body: "에이전트1 이 맞는지 확인한다." },
          { number: 3, head: "입력창 — 자연어로 요청", body: "여기부터 사람 말로 지시를 적는다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S1_AGY_SETUP: SlideEntry[] = [
  { index: 1, name: "agy_테마_선택", title: "Antigravity 화면 테마 선택", render: () => React.createElement(Slide01) },
  { index: 2, name: "agy_데이터_사용_설정", title: "약관 및 데이터 사용 설정", render: () => React.createElement(Slide02) },
  { index: 3, name: "agy_초기_설정_완료", title: "Antigravity 초기 설정 완료", render: () => React.createElement(Slide03) },
  { index: 4, name: "agy_작업_폴더_신뢰", title: "실습 폴더 신뢰 확인", render: () => React.createElement(Slide04) },
  { index: 5, name: "agy_실행_화면", title: "Antigravity CLI 실행 화면", render: () => React.createElement(Slide05) },
];

export const S1_AGY_SETUP_PART: PartSpec = { id: "s1-agy-setup", eyebrow: EYEBROW, entries: S1_AGY_SETUP };
