// s3-chrome — basic 3회차 (step03) 파트. 계획서: courses/basic/step03-redesign-plan.md "파트 7 — s3-chrome".
// 이 파일은 이 파트의 슬라이드만 소유한다. registry.ts 는 이미 등록되어 있으므로 건드리지 않는다.
//
// 14장 중 4장(웹서치_한계/란/재시작/flag)은 개념·절차 목업, 나머지 10장은 실제 캡처가 있어야 진짜처럼 보이는
// 화면(크롬 웹스토어, 설치된 확장, /chrome 패널, 챌린지, Gmail 등)이라 CapturePendingBox 자리표시자로 둔다
// (CEO 지시, README 참조). 각 자리표시자 슬라이드 위에 TODO-CAPTURE 주석으로 정확한 캡처 대상을 적어둔다.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { AppWindow } from "../core/AppWindow";
import { Camera, cameraView } from "../core/Camera";
import { Glyph } from "../core/glyphs";
import { COLORS, FONTS, TERM_THEME } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "CLAUDE IN CHROME";
const TOTAL = 14;

// ------------------------------------------------------------------------------------------------
// Local helpers (each part owns its own copy — see src/README.md worker guide).
// ------------------------------------------------------------------------------------------------

const WINDOW_HEADER_H = 34; // AppWindow native title bar height (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // reserved inside the terminal so badges never cover its text.
const TERM_WINDOW_H = 620;
const LINE_H = Math.round(TERM_FONT_SIZE * 1.6); // same metric ClaudeCodeTerminal itself uses internally.
const PAD_H = 16;
const PAD_V = 10;

const CWD = "C:\\Users\\student\\에이전트1";

function windowGeometry(illoW: number, illoH: number, windowH = TERM_WINDOW_H) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

function rightTermWidth(windowNative: { w: number }): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  return Math.round(contentW * 0.84);
}

const EMPTY_EXPLORER: ExplorerNode[] = [{ name: "(비어 있음)", kind: "file", depth: 0 }];

// Plain terminal-style text lines (no live-turn API) for a raw prompt/echo sequence — same pattern
// s1-claude-login.tsx uses for onboarding screens that happen before/around the chat UI.
interface RawLine {
  text: string;
  tone?: "text" | "strong" | "dim";
  prefix?: string;
}

const toneColor = (tone: RawLine["tone"]): string => {
  if (tone === "strong") return TERM_THEME.dark.strong;
  if (tone === "dim") return TERM_THEME.dark.dim;
  return TERM_THEME.dark.text;
};

const RawTerminalBlock: React.FC<{ width: number; lines: RawLine[] }> = ({ width, lines }) => (
  <div style={{ position: "relative", width, boxSizing: "border-box", padding: `${PAD_V}px ${PAD_H}px ${PAD_V}px ${PAD_H + BADGE_GUTTER}px`, fontFamily: FONTS.term, fontSize: TERM_FONT_SIZE }}>
    {lines.map((ln, i) => (
      <div key={i} style={{ height: LINE_H, lineHeight: `${LINE_H}px`, whiteSpace: "pre", color: toneColor(ln.tone) }}>
        {ln.prefix ? <span style={{ color: TERM_THEME.dark.dim }}>{ln.prefix}</span> : null}
        {ln.text}
      </div>
    ))}
  </div>
);

const rawLineCenterY = (i: number) => PAD_V + i * LINE_H + LINE_H / 2;

// Dashed control line + small filled cursor arrow — draws "an agent reaching in and clicking", reused by
// slide 02's concept diagram. Points from (x0,y0) toward (x1,y1); the arrowhead sits at the end point.
const ControlLine: React.FC<{ x0: number; y0: number; x1: number; y1: number }> = ({ x0, y0, x1, y1 }) => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.max(1, Math.hypot(dx, dy));
  const ux = dx / len;
  const uy = dy / len;
  const headLen = 22;
  const bx = x1 - ux * headLen;
  const by = y1 - uy * headLen;
  const left = Math.min(x0, x1) - 30;
  const top = Math.min(y0, y1) - 30;
  const w = Math.abs(x1 - x0) + 60;
  const h = Math.abs(y1 - y0) + 60;
  return (
    <svg style={{ position: "absolute", left, top, width: w, height: h, overflow: "visible" }}>
      <path d={`M${x0 - left} ${y0 - top} L${bx - left} ${by - top}`} fill="none" stroke={COLORS.accent} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
      <path
        d={`M${x1 - left} ${y1 - top} L${bx - left - uy * 10} ${by - top + ux * 10} L${bx - left + uy * 10} ${by - top - ux * 10} Z`}
        fill={COLORS.accent}
      />
    </svg>
  );
};

// The "CapturePendingBox" placeholder every real-capture slide (3,4,5,8,9,10,11,12,13,14) uses: a
// dashed-border box in the body slot standing in for a screenshot that has not been taken yet, with a
// one-line note of exactly what state to capture (see TODO-CAPTURE comment above each slide for the URL).
const CapturePendingBox: React.FC<{ x: number; y: number; width: number; height: number; note: string }> = ({ x, y, width, height, note }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      boxSizing: "border-box",
      borderRadius: 22,
      border: `3px dashed ${COLORS.line}`,
      background: COLORS.paper2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 22,
      padding: 40,
    }}
  >
    <div
      style={{
        width: 84,
        height: 84,
        borderRadius: 20,
        background: COLORS.accentWash,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Glyph name="scan" size={40} color={COLORS.accentDeep} strokeWidth={2.2} />
    </div>
    <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.ink3, letterSpacing: "0.02em" }}>캡처 대기</div>
    <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 24, color: COLORS.ink2, textAlign: "center", wordBreak: "keep-all", maxWidth: width - 160 }}>{note}</div>
  </div>
);

// ------------------------------------------------------------------------------------------------
// 01 · chrome_웹서치_한계 — "웹서치가 못 보는 것" (개념 목업)
// 좌: 웹서치가 읽는 정적 텍스트가 로그인 벽에서 멈춘다 / 우: 브라우저 조작은 그 벽을 직접 클릭해 넘어간다.
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const gridX = colX(0);
  const gridY = BODY_Y;
  const gridW = colW(12);
  const gap = 60;
  const cardW = (gridW - gap) / 2;
  const cardH = BODY_H - 90;
  const leftX = gridX;
  const rightX = gridX + cardW + gap;

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="웹서치가 못 보는 것">
      {/* 좌: 웹서치 — 정적 텍스트 목록이 로그인 벽에서 멈춘다 */}
      <div style={{ position: "absolute", left: leftX, top: gridY, width: cardW, height: cardH, borderRadius: 22, overflow: "hidden", border: `1px solid ${COLORS.line}`, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <div style={{ height: 56, background: COLORS.paper2, borderBottom: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", padding: "0 28px", fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.ink2 }}>
          웹서치 결과
        </div>
        <div style={{ height: cardH - 56, background: COLORS.paper2, padding: "36px 40px", display: "flex", flexDirection: "column", gap: 22 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ width: `${72 - i * 8}%`, height: 16, borderRadius: 4, background: COLORS.line }} />
              <div style={{ width: `${58 - i * 6}%`, height: 12, borderRadius: 4, background: COLORS.paper }} />
            </div>
          ))}
          <div style={{ flex: "1 1 0", minHeight: 0, marginTop: 8, borderRadius: 16, background: COLORS.paper, border: `1px dashed ${COLORS.line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <Glyph name="lock" size={40} color={COLORS.ink3} strokeWidth={2.2} />
            <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 24, color: COLORS.ink3 }}>로그인 필요 — 여기서 멈춘다</span>
          </div>
        </div>
      </div>

      {/* 우: 브라우저 조작 — 실제로 클릭해서 벽을 넘는다 */}
      <div style={{ position: "absolute", left: rightX, top: gridY, width: cardW, height: cardH, borderRadius: 22, overflow: "hidden", border: `1px solid ${COLORS.line}`, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <div style={{ height: 56, background: COLORS.paper2, borderBottom: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", padding: "0 28px", fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.accentDeep }}>
          브라우저 조작
        </div>
        <div style={{ position: "relative", height: cardH - 56, background: COLORS.paper2, padding: "36px 40px", display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ width: "60%", height: 16, borderRadius: 4, background: COLORS.line }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 18, color: COLORS.ink3 }}>이메일</div>
            <div style={{ height: 44, borderRadius: 10, border: `2px solid ${COLORS.accent}`, background: COLORS.accentWash, display: "flex", alignItems: "center", padding: "0 16px", fontFamily: FONTS.term, fontSize: 18, color: COLORS.ink }}>student@example.com</div>
          </div>
          <div
            style={{
              alignSelf: "flex-start",
              marginTop: 12,
              padding: "14px 34px",
              borderRadius: 12,
              background: COLORS.accent,
              color: COLORS.paper2,
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            로그인
          </div>
          <div style={{ position: "absolute", right: 96, bottom: 96, width: 30, height: 30 }}>
            <svg width={30} height={30} viewBox="0 0 24 24">
              <path d="M4 3 L20 11 L12.5 12.5 L11 20 Z" fill={COLORS.accentDeep} stroke={COLORS.paper2} strokeWidth={1.5} strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <FocusBadge number={1} x={leftX + cardW - 6} y={gridY + 6} />
      <FocusBadge number={2} x={rightX + cardW - 6} y={gridY + 6} />

      <AnnotationColumn
        x={gridX}
        y={gridY + cardH + 30}
        width={gridW}
        height={BODY_BOTTOM - (gridY + cardH + 30)}
        items={[
          { number: 1, head: "웹서치 = 정적 텍스트", body: "로그인 뒤 화면·동적으로 그려지는 페이지는 읽지 못하고 벽 앞에서 멈춘다." },
          { number: 2, head: "브라우저 조작 = 직접 클릭", body: "Claude in Chrome 은 진짜 브라우저를 눌러서 로그인 벽 너머까지 들어간다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · chrome_란 — "브라우저를 쥔 AI" (개념 목업)
// 기능 나열 금지 — Claude 가 브라우저를 직접 쥐고 탭을 열고 클릭한다는 그림 하나로.
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const rowY = BODY_Y + 40;
  const agentR = 130;
  const agentCx = colX(0) + agentR + 20;
  const agentCy = rowY + 260;

  const browserX = colX(4);
  const browserY = rowY;
  const browserW = colW(8);
  const browserH = 520;

  const tabW = 220;
  const tabGap = 14;
  const clickTabIndex = 1;
  const clickX = browserX + 30 + clickTabIndex * (tabW + tabGap) + tabW / 2;
  const clickY = browserY + WINDOW_HEADER_H + 24;

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="브라우저를 쥔 AI">
      {/* Claude 아이콘 */}
      <div
        style={{
          position: "absolute",
          left: agentCx - agentR,
          top: agentCy - agentR,
          width: agentR * 2,
          height: agentR * 2,
          borderRadius: "50%",
          background: COLORS.accentWash,
          border: `3px solid ${COLORS.accent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ width: 66, height: 66, borderRadius: 16, background: COLORS.paper2, border: `3px solid ${COLORS.accentDeep}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.accentDeep }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.accentDeep }} />
          </div>
        </div>
        <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 24, color: COLORS.accentDeep }}>Claude</span>
      </div>

      {/* 브라우저 목업 (탭 여러 개 + 클릭 지점) */}
      <div style={{ position: "absolute", left: browserX, top: browserY, width: browserW, height: browserH, borderRadius: 18, overflow: "hidden", boxShadow: "0 18px 40px rgba(16,17,19,0.12)" }}>
        <AppWindow width={browserW} height={browserH} os="mac" theme="light" title="Chrome" enter="none" float={false}>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ height: 48, flex: "0 0 48px", display: "flex", alignItems: "flex-end", gap: tabGap, padding: `0 30px`, background: COLORS.paper }}>
              {["claude.ai", "gmail.com", "chrome://…"].map((t, i) => (
                <div
                  key={t}
                  style={{
                    width: tabW,
                    height: 38,
                    borderRadius: "10px 10px 0 0",
                    background: i === clickTabIndex ? COLORS.paper2 : COLORS.line,
                    border: i === clickTabIndex ? `2px solid ${COLORS.accent}` : "none",
                    borderBottom: "none",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
                    fontFamily: FONTS.term,
                    fontSize: 15,
                    color: i === clickTabIndex ? COLORS.accentDeep : COLORS.ink3,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
            <div style={{ flex: "1 1 0", minHeight: 0, background: COLORS.paper2, padding: "44px 52px", display: "flex", flexDirection: "column", gap: 26 }}>
              <div style={{ width: "50%", height: 20, borderRadius: 5, background: COLORS.line }} />
              <div style={{ width: "72%", height: 14, borderRadius: 4, background: COLORS.paper }} />
              <div style={{ width: "64%", height: 14, borderRadius: 4, background: COLORS.paper }} />
              <div style={{ marginTop: 10, alignSelf: "flex-start", padding: "14px 30px", borderRadius: 10, background: COLORS.accentWash, border: `2px solid ${COLORS.accent}`, fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: COLORS.accentDeep }}>
                다음 단계
              </div>
            </div>
          </div>
        </AppWindow>
      </div>

      <ControlLine x0={agentCx + agentR} y0={agentCy} x1={clickX} y1={clickY} />
      <div style={{ position: "absolute", left: clickX - 12, top: clickY - 6, width: 24, height: 24 }}>
        <svg width={24} height={24} viewBox="0 0 24 24">
          <path d="M4 3 L20 11 L12.5 12.5 L11 20 Z" fill={COLORS.accent} stroke={COLORS.paper2} strokeWidth={1.6} strokeLinejoin="round" />
        </svg>
      </div>

      <AnnotationColumn
        x={colX(0)}
        y={agentCy + agentR + 40}
        width={colW(4)}
        height={BODY_BOTTOM - (agentCy + agentR + 40)}
        items={[
          { number: 1, head: "직접 브라우저를 쥔다", body: "화면을 읽는 게 아니라 진짜 크롬 창을 열고 조작한다." },
          { number: 2, head: "탭을 열고 클릭한다", body: "탭 전환·클릭·입력·스크롤을 사람처럼 직접 실행한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · chrome_소개_페이지 — "Add to Chrome" (실제 캡처 필요)
// ------------------------------------------------------------------------------------------------
// TODO-CAPTURE: https://claude.com/claude-in-chrome (Add to Chrome 버튼 보이게)

const Slide03: React.FC = () => {
  const boxX = colX(0);
  const boxW = colW(8);
  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="Add to Chrome">
      <CapturePendingBox x={boxX} y={BODY_Y} width={boxW} height={BODY_H} note="claude.com/claude-in-chrome — Add to Chrome 버튼이 보이는 화면" />
      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "소개 페이지 접속", body: "claude.com/claude-in-chrome 에서 확장의 역할을 확인한다." },
          { number: 2, head: "Add to Chrome 버튼", body: "이 버튼이 크롬 웹스토어 설치 페이지로 이어진다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · chrome_웹스토어 — "확장 설치" (실제 캡처 필요)
// ------------------------------------------------------------------------------------------------
// TODO-CAPTURE: https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn

const Slide04: React.FC = () => {
  const boxX = colX(0);
  const boxW = colW(8);
  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="확장 설치">
      <CapturePendingBox x={boxX} y={BODY_Y} width={boxW} height={BODY_H} note="크롬 웹스토어 Claude 확장 페이지(fcoeoabgfenejglbffodgkkbkcdhcgfn) — 설치 버튼이 보이는 화면" />
      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "크롬 웹스토어 진입", body: "Add to Chrome 을 누르면 이 페이지로 온다." },
          { number: 2, head: "Chrome에 추가", body: "버튼을 누르고 확인 팝업까지 승인해야 설치가 끝난다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · chrome_로그인 — "확장에서 클로드 로그인" (실제 캡처 필요)
// ------------------------------------------------------------------------------------------------
// TODO-CAPTURE: 설치된 확장 팝업의 클로드 로그인 화면

const Slide05: React.FC = () => {
  const boxX = colX(0);
  const boxW = colW(8);
  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="확장에서 클로드 로그인">
      <CapturePendingBox x={boxX} y={BODY_Y} width={boxW} height={BODY_H} note="설치된 확장 아이콘을 누른 팝업 — 클로드 계정 로그인 화면" />
      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "확장 아이콘 클릭", body: "설치 후 툴바의 Claude 아이콘을 누르면 팝업이 뜬다." },
          { number: 2, head: "계정으로 로그인", body: "Claude Code 와 같은 계정으로 로그인해야 연결된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · chrome_재시작 — "크롬 전부 껐다 켜기" (개념 목업, 3스텝)
// ------------------------------------------------------------------------------------------------

interface RestartStep {
  n: number;
  head: string;
  body: string;
}
const RESTART_STEPS: RestartStep[] = [
  { n: 1, head: "여러 창이 열려 있음", body: "설치 직후에는 기존 크롬 창들이 그대로 떠 있다." },
  { n: 2, head: "작업 표시줄에서 완전 종료", body: "창을 닫는 것만으로는 부족하다 — 트레이 아이콘에서 완전히 끝낸다." },
  { n: 3, head: "크롬 다시 실행", body: "새로 켜야 방금 설치한 확장이 반영된다." },
];

const MiniBrowserStack: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: i * 14,
          top: i * 14,
          width: size - 28,
          height: (size - 28) * 0.7,
          borderRadius: 10,
          background: COLORS.paper2,
          border: `2px solid ${COLORS.line}`,
          boxShadow: "0 8px 18px rgba(16,17,19,0.10)",
        }}
      >
        <div style={{ height: 14, borderRadius: "8px 8px 0 0", background: COLORS.paper, borderBottom: `1px solid ${COLORS.line}` }} />
      </div>
    ))}
  </div>
);

const Slide06: React.FC = () => {
  const gridX = colX(0);
  const gridY = BODY_Y + 20;
  const gridW = colW(12);
  const cardW = 420;
  const arrowW = (gridW - cardW * 3) / 2;
  const cardH = 400;
  const iconY = gridY + 40;

  const centers = [gridX + cardW / 2, gridX + cardW + arrowW + cardW / 2, gridX + cardW * 2 + arrowW * 2 + cardW / 2];

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="크롬 전부 껐다 켜기">
      {RESTART_STEPS.map((s, i) => {
        const x = gridX + i * (cardW + arrowW);
        return (
          <div
            key={s.n}
            style={{
              position: "absolute",
              left: x,
              top: gridY,
              width: cardW,
              height: cardH,
              boxSizing: "border-box",
              background: COLORS.paper2,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 20,
              boxShadow: "0 14px 30px rgba(16,17,19,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 28,
            }}
          >
            {i === 0 ? (
              <MiniBrowserStack size={200} />
            ) : i === 1 ? (
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: COLORS.paper,
                  border: `3px solid ${COLORS.ink3}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Glyph name="x" size={64} color={COLORS.ink2} strokeWidth={3} />
              </div>
            ) : (
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: COLORS.accentWash,
                  border: `3px solid ${COLORS.accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Glyph name="refresh" size={64} color={COLORS.accentDeep} strokeWidth={3} />
              </div>
            )}
          </div>
        );
      })}

      {[0, 1].map((i) => {
        const ax = gridX + cardW + i * (cardW + arrowW) - arrowW;
        return (
          <svg key={i} style={{ position: "absolute", left: ax, top: gridY + cardH / 2 - 20, width: arrowW, height: 40 }} viewBox={`0 0 ${arrowW} 40`}>
            <path d={`M0 20 H${arrowW - 22}`} fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" />
            <path d={`M${arrowW - 28} 8 L${arrowW - 4} 20 L${arrowW - 28} 32`} fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      })}

      {centers.map((cx, i) => (
        <FocusBadge key={i} number={i + 1} x={cx} y={iconY + 6} size={36} />
      ))}

      <AnnotationColumn
        x={gridX}
        y={gridY + cardH + 30}
        width={gridW}
        height={BODY_BOTTOM - (gridY + cardH + 30)}
        items={RESTART_STEPS.map((s) => ({ number: s.n, head: s.head, body: s.body }))}
        gap={24}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · chrome_flag — "--chrome 플래그" (목업, 3스텝: Ctrl+C 두 번 -> 위쪽 방향키로 직전 명령 -> --chrome 추가)
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(9);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const lines: RawLine[] = [
    { prefix: `PS ${CWD}> `, text: "^C", tone: "dim" },
    { text: "^C", tone: "dim" },
    { prefix: `PS ${CWD}> `, text: "claude --dangerously-skip-permissions", tone: "text" },
    { prefix: `PS ${CWD}> `, text: "claude --dangerously-skip-permissions --chrome", tone: "strong" },
  ];

  const content = <RawTerminalBlock width={termW} lines={lines} />;

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + PAD_H + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + (rawLineCenterY(0) + rawLineCenterY(1)) / 2 });
  const b2 = toFrame({ x: badgeX, y: contentTop + rawLineCenterY(2) });
  const b3 = toFrame({ x: badgeX, y: contentTop + rawLineCenterY(3) });

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="--chrome 플래그">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={EMPTY_EXPLORER} layout="right" terminalWidth={termW} showTerminal terminalContent={content} mainMode="empty" />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <FocusBadge number={3} x={b3.x} y={b3.y} size={34} />

      <AnnotationColumn
        x={colX(9)}
        y={illoY}
        width={colW(3)}
        height={illoH}
        items={[
          { number: 1, head: "Ctrl+C 두 번", body: "claude 세션을 완전히 종료한다." },
          { number: 2, head: "위쪽 방향키", body: "직전 명령 claude --dangerously-skip-permissions 를 그대로 불러온다." },
          { number: 3, head: "--chrome 붙이고 실행", body: "뒤에 --chrome 을 붙여 크롬 확장과 연결된 세션으로 켠다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · chrome_패널 — "/chrome · Status: Enabled" (실제 캡처 필요)
// ------------------------------------------------------------------------------------------------
// TODO-CAPTURE: 확장이 연결된 환경에서 /chrome 패널 (Status: Enabled / Extension: Installed / Browser / Select browser… 4행)

const Slide08: React.FC = () => {
  const boxX = colX(0);
  const boxW = colW(8);
  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="/chrome · Status: Enabled">
      <CapturePendingBox x={boxX} y={BODY_Y} width={boxW} height={BODY_H} note="확장 연결된 환경에서 /chrome 패널 — Status: Enabled / Extension: Installed / Browser / Select browser… 4행" />
      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "/chrome 명령", body: "--chrome 으로 켠 세션에서 /chrome 을 입력해 연결 상태를 본다." },
          { number: 2, head: "Status: Enabled 확인", body: "Enabled 로 나와야 확장이 실제로 붙은 것이다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 09 · chrome_실습1 — "설치 확인 페이지 접속" (실제 캡처 필요)
// ------------------------------------------------------------------------------------------------
// TODO-CAPTURE: https://claude.ai/chrome/installed 접속 결과

const Slide09: React.FC = () => {
  const boxX = colX(0);
  const boxW = colW(8);
  return (
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="설치 확인 페이지 접속">
      <CapturePendingBox x={boxX} y={BODY_Y} width={boxW} height={BODY_H} note="claude.ai/chrome/installed 접속 결과 화면" />
      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "설치 확인 페이지", body: "claude.ai/chrome/installed 로 확장이 붙었는지 확인한다." },
          { number: 2, head: "챌린지 목록 등장", body: "이 페이지 아래에 실습용 챌린지가 이어진다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 10 · chrome_탭그룹 — "claude 탭 그룹" (실제 캡처 필요)
// ------------------------------------------------------------------------------------------------
// TODO-CAPTURE: 주황/초록 claude 탭 그룹이 잡힌 크롬 탭바

const Slide10: React.FC = () => {
  const boxX = colX(0);
  const boxW = colW(8);
  return (
    <SlideFrame index={10} total={TOTAL} eyebrow={EYEBROW} title="claude 탭 그룹">
      <CapturePendingBox x={boxX} y={BODY_Y} width={boxW} height={BODY_H} note="Claude 가 연 탭들이 색깔 있는 claude 탭 그룹으로 묶인 크롬 탭바" />
      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "탭 그룹으로 구분", body: "Claude 가 직접 연 탭은 색깔 있는 탭 그룹으로 묶여 눈에 띈다." },
          { number: 2, head: "무슨 탭인지 한눈에", body: "여러 탭을 열어도 어떤 게 자동으로 열린 건지 바로 구분된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 11 · chrome_챌린지2 — "챌린지 2번" (실제 캡처 필요)
// ------------------------------------------------------------------------------------------------
// TODO-CAPTURE: claude.ai/chrome/installed 페이지의 챌린지 2번 진행/성공 화면

const Slide11: React.FC = () => {
  const boxX = colX(0);
  const boxW = colW(8);
  return (
    <SlideFrame index={11} total={TOTAL} eyebrow={EYEBROW} title="챌린지 2번">
      <CapturePendingBox x={boxX} y={BODY_Y} width={boxW} height={BODY_H} note="설치 확인 페이지의 챌린지 2번 진행/성공 화면" />
      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "챌린지 2번 실행", body: "설치 확인 페이지가 안내하는 두 번째 실습을 그대로 따라 한다." },
          { number: 2, head: "성공 표시 확인", body: "완료되면 성공 표시가 뜬다 — 그걸로 확장이 실제로 동작함을 확인한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 12 · chrome_챌린지3 — "챌린지 3번" (실제 캡처 필요)
// ------------------------------------------------------------------------------------------------
// TODO-CAPTURE: claude.ai/chrome/installed 페이지의 챌린지 3번 진행/성공 화면

const Slide12: React.FC = () => {
  const boxX = colX(0);
  const boxW = colW(8);
  return (
    <SlideFrame index={12} total={TOTAL} eyebrow={EYEBROW} title="챌린지 3번">
      <CapturePendingBox x={boxX} y={BODY_Y} width={boxW} height={BODY_H} note="설치 확인 페이지의 챌린지 3번 진행/성공 화면" />
      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "챌린지 3번 실행", body: "세 번째 실습까지 마쳐 조작 범위를 넓혀 확인한다." },
          { number: 2, head: "성공 표시 확인", body: "완료 표시로 실습이 끝났음을 확인한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 13 · chrome_gmail_접속 — "Gmail 접속" (실제 캡처 필요)
// ------------------------------------------------------------------------------------------------
// TODO-CAPTURE: Gmail 편지쓰기 화면

const Slide13: React.FC = () => {
  const boxX = colX(0);
  const boxW = colW(8);
  return (
    <SlideFrame index={13} total={TOTAL} eyebrow={EYEBROW} title="Gmail 접속">
      <CapturePendingBox x={boxX} y={BODY_Y} width={boxW} height={BODY_H} note="Gmail 편지쓰기 화면 — Claude 가 직접 연 상태" />
      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "실제 서비스로 확장", body: "설치 확인 페이지를 넘어 진짜 쓰는 서비스(Gmail)로 넘어간다." },
          { number: 2, head: "편지쓰기 화면 열기", body: "Claude 가 직접 Gmail 을 열고 편지쓰기 창까지 띄운다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 14 · chrome_gmail_발송 — "나에게 보내기 발송" (실제 캡처 필요)
// ------------------------------------------------------------------------------------------------
// TODO-CAPTURE: '나에게 보내기' 발송 완료 화면

const Slide14: React.FC = () => {
  const boxX = colX(0);
  const boxW = colW(8);
  return (
    <SlideFrame index={14} total={TOTAL} eyebrow={EYEBROW} title="나에게 보내기 발송">
      <CapturePendingBox x={boxX} y={BODY_Y} width={boxW} height={BODY_H} note="'나에게 보내기' 메일 발송 완료 화면" />
      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "직접 입력하고 전송", body: "받는 사람·제목·본문을 채우고 보내기 버튼까지 직접 누른다." },
          { number: 2, head: "발송 완료 확인", body: "받은편지함에서 실제로 도착했는지 확인하면 실습이 끝난다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S3_CHROME: SlideEntry[] = [
  { index: 1, name: "chrome_웹서치_한계", title: "웹서치가 못 보는 것", render: () => <Slide01 /> },
  { index: 2, name: "chrome_란", title: "브라우저를 쥔 AI", render: () => <Slide02 /> },
  { index: 3, name: "chrome_소개_페이지", title: "Add to Chrome", render: () => <Slide03 /> },
  { index: 4, name: "chrome_웹스토어", title: "확장 설치", render: () => <Slide04 /> },
  { index: 5, name: "chrome_로그인", title: "확장에서 클로드 로그인", render: () => <Slide05 /> },
  { index: 6, name: "chrome_재시작", title: "크롬 전부 껐다 켜기", render: () => <Slide06 /> },
  { index: 7, name: "chrome_flag", title: "--chrome 플래그", render: () => <Slide07 /> },
  { index: 8, name: "chrome_패널", title: "/chrome · Status: Enabled", render: () => <Slide08 /> },
  { index: 9, name: "chrome_실습1", title: "설치 확인 페이지 접속", render: () => <Slide09 /> },
  { index: 10, name: "chrome_탭그룹", title: "claude 탭 그룹", render: () => <Slide10 /> },
  { index: 11, name: "chrome_챌린지2", title: "챌린지 2번", render: () => <Slide11 /> },
  { index: 12, name: "chrome_챌린지3", title: "챌린지 3번", render: () => <Slide12 /> },
  { index: 13, name: "chrome_gmail_접속", title: "Gmail 접속", render: () => <Slide13 /> },
  { index: 14, name: "chrome_gmail_발송", title: "나에게 보내기 발송", render: () => <Slide14 /> },
];

export const S3_CHROME_PART: PartSpec = { id: "s3-chrome", eyebrow: EYEBROW, entries: S3_CHROME };
