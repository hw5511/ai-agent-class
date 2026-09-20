// s1-agy-login — basic 1회차 슬라이드 20~23 (4장). Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step01/agy_Google_*.svg, agy_브라우저_인증.svg, agy_인증_코드_입력.svg —
// step01.json slides 20~23) into this renderer.
//
// The shipped slides for this part embed a REAL SCREENSHOT (base64 PNG inside the SVG) of the actual
// Antigravity CLI login flow. An earlier pass here could not read that embedded image and hand-drew a
// mockup terminal/browser instead. The CEO reviewed the rebuilt deck side-by-side with the shipped one
// and called that out: a redrawn approximation of a real screen is worse than the real thing, so the
// mockup is gone — these four slides now show the actual extracted screenshots
// (public/slides/shots/agy_*.png, sized per public/slides/shots/_manifest.json) scaled into the 8-col
// body area with the deck's own frame (1px border, RADIUS.outer, soft shadow), never a fake window
// chrome drawn around them (the screenshots already show their own real UI). Annotation copy is kept
// exactly as this file already had it (traced to step01.json goal/topics), only the illustration and
// its FocusBadge coordinates changed. The auth code is real inside the screenshot (it is a one-time,
// already-consumed code from the shipped capture), never a fabricated stand-in.
import React from "react";
import { staticFile, Img } from "remotion";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { COLORS, RADIUS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "ANTIGRAVITY 로그인";
const TOTAL = 4;

// ---- shared screenshot-frame math (this file only; same convention as s1-agy-install.tsx /
// s1-agy-setup.tsx) --------------------------------------------------------------------------------
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
// 01 · "Google 로그인 방식 선택" (shipped agy_Google_로그인_선택 — step01.json slide 20)
// Screenshot: dark CLI screen — Antigravity welcome + "Select login method:" with
// "> 1. Google OAuth" already selected, footer "↑/↓ Navigate · enter Select". Both rows are short and
// left-aligned, so each badge sits in the blank background to the right of its own row — never on the
// row's own text.
// ------------------------------------------------------------------------------------------------
const SHOT_LOGIN_SELECT = staticFile("slides/shots/agy_Google_로그인_선택.png");
const SHOT_LOGIN_SELECT_W = 669;
const SHOT_LOGIN_SELECT_H = 484;

const Slide01: React.FC = () => {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const rect = fitRect(boxX, boxY, boxW, boxH, SHOT_LOGIN_SELECT_W, SHOT_LOGIN_SELECT_H);
  const b1 = { x: rect.x + rect.w * 0.58, y: rect.y + rect.h * 0.355 }; // right of "1. Google OAuth" row
  const b2 = { x: rect.x + rect.w * 0.58, y: rect.y + rect.h * 0.455 }; // right of "enter Select" footer

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="Google 로그인 방식 선택">
      <ShotFrame src={SHOT_LOGIN_SELECT} rect={rect} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={boxY}
        width={colW(3)}
        height={boxH}
        items={[
          { number: 1, head: "로그인 방법 목록에서 Google 선택", body: "로그인 방법 목록이 뜨면 Google OAuth 를 고른다." },
          { number: 2, head: "브라우저 자동 실행", body: "여기부터는 터미널이 아니라 브라우저 화면에서 진행된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · "Google 계정 선택" (shipped agy_Google_계정_선택 — step01.json slide 21)
// Screenshot: plain accounts.google.com page — "계정을 선택하세요." heading + a
// "Google Antigravity(으)로 이동" link. This capture is the page just before the account tile list
// renders, so there is no account row to pin the badge on; it is pinned beside the link text instead
// (the closest real, visible next-step element) — flagged in the report for a render check.
// ------------------------------------------------------------------------------------------------
const SHOT_ACCOUNT_PICK = staticFile("slides/shots/agy_Google_계정_선택.png");
const SHOT_ACCOUNT_PICK_W = 630;
const SHOT_ACCOUNT_PICK_H = 484;

const Slide02: React.FC = () => {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const rect = fitRect(boxX, boxY, boxW, boxH, SHOT_ACCOUNT_PICK_W, SHOT_ACCOUNT_PICK_H);
  const b1 = { x: rect.x + rect.w * 0.62, y: rect.y + rect.h * 0.62 }; // right of the "...으로 이동" link

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="Google 계정 선택">
      <ShotFrame src={SHOT_ACCOUNT_PICK} rect={rect} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={boxY}
        width={colW(3)}
        height={boxH}
        items={[
          { number: 1, head: "본인 Google 계정 클릭", body: "브라우저가 자동으로 열리면 실습에 쓸 계정을 선택한다." },
          { number: "!", head: "권한 요청 내용 확인", body: "Antigravity 가 요청하는 접근 권한을 확인하고 진행한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · "브라우저에서 Google 인증" (shipped agy_브라우저_인증 — step01.json slide 22)
// Screenshot: "Paste this code into your application to complete authentication:" card with the real
// one-time code box and a "Copy to Clipboard" button, on a confetti background. This image is
// height-bound with generous side margins (~112px each), so both badges sit in that real blank slide
// margin just outside the frame's right edge, at the height of the element they call out.
// ------------------------------------------------------------------------------------------------
const SHOT_BROWSER_AUTH = staticFile("slides/shots/agy_브라우저_인증.png");
const SHOT_BROWSER_AUTH_W = 570;
const SHOT_BROWSER_AUTH_H = 484;

const Slide03: React.FC = () => {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const rect = fitRect(boxX, boxY, boxW, boxH, SHOT_BROWSER_AUTH_W, SHOT_BROWSER_AUTH_H);
  const b1 = { x: rect.x + rect.w + 30, y: rect.y + rect.h * 0.45 }; // level with the code box
  const b2 = { x: rect.x + rect.w + 30, y: rect.y + rect.h * 0.565 }; // level with "Copy to Clipboard"

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="브라우저에서 Google 인증">
      <ShotFrame src={SHOT_BROWSER_AUTH} rect={rect} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={36} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={30} />
      <AnnotationColumn
        x={colX(9)}
        y={boxY}
        width={colW(3)}
        height={boxH}
        items={[
          { number: 1, head: "인증 완료 화면의 코드", body: "로그인과 권한 승인이 끝나면 일회용 인증 코드가 뜬다. 코드는 사람마다 다르다." },
          { number: 2, head: "코드를 클립보드에 복사", body: "복사 버튼을 눌러 코드를 복사하고 터미널로 돌아갈 준비를 한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · "인증 코드를 터미널에 입력" (shipped agy_인증_코드_입력 — step01.json slide 23)
// Screenshot: dark terminal — the OAuth URL, "Click here to authenticate", and (already pasted) the
// one-time code on its own input line, cursor at the end. The frame nearly fills the whole box (almost
// no outer margin), but the pasted-code line leaves a tall blank gap below it before the footer, so
// both badges sit there, never over the code or the URL text.
// ------------------------------------------------------------------------------------------------
const SHOT_CODE_PASTE = staticFile("slides/shots/agy_인증_코드_입력.png");
const SHOT_CODE_PASTE_W = 721;
const SHOT_CODE_PASTE_H = 484;

const Slide04: React.FC = () => {
  const boxX = colX(0);
  const boxY = BODY_Y;
  const boxW = colW(9);
  const boxH = BODY_H;
  const rect = fitRect(boxX, boxY, boxW, boxH, SHOT_CODE_PASTE_W, SHOT_CODE_PASTE_H);
  const b1 = { x: rect.x + rect.w * 0.06, y: rect.y + rect.h * 0.72 }; // just under the pasted code line
  const b2 = { x: rect.x + rect.w * 0.06, y: rect.y + rect.h * 0.84 }; // further down, still in the blank gap

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="인증 코드를 터미널에 입력">
      <ShotFrame src={SHOT_CODE_PASTE} rect={rect} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <AnnotationColumn
        x={colX(9)}
        y={boxY}
        width={colW(3)}
        height={boxH}
        items={[
          { number: 1, head: "복사한 코드를 붙여넣기", body: "터미널 입력창에 복사한 코드를 붙여넣고 Enter 를 누른다." },
          { number: 2, head: "로그인 성공 메시지 확인", body: "성공 메시지가 뜨면 로그인이 끝난 것이다." },
          { number: "!", head: "인증 코드는 노출 금지", body: "실제 화면의 인증 코드는 캡처하거나 공유하지 않는다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S1_AGY_LOGIN: SlideEntry[] = [
  { index: 1, name: "agy_Google_로그인_선택", title: "Google 로그인 방식 선택", render: () => React.createElement(Slide01) },
  { index: 2, name: "agy_Google_계정_선택", title: "Google 계정 선택", render: () => React.createElement(Slide02) },
  { index: 3, name: "agy_브라우저_인증", title: "브라우저에서 Google 인증", render: () => React.createElement(Slide03) },
  { index: 4, name: "agy_인증_코드_입력", title: "인증 코드를 터미널에 입력", render: () => React.createElement(Slide04) },
];

export const S1_AGY_LOGIN_PART: PartSpec = { id: "s1-agy-login", eyebrow: EYEBROW, entries: S1_AGY_LOGIN };
