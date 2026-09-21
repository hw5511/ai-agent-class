// s1-agent — basic 1회차 슬라이드 1~6 (6장), "AI 에이전트 이해".
// Rebuilt from the shipped deck (ai-agent-class/assets/basic/step01/*.svg) + courses/basic/step01.json.
// These are concept/orientation slides — no VS Code mockup here except where the source itself shows one.
// Every slide is a real vector drawing (loop diagram, browser/chat mockups, tool-use pipeline, radial
// concept map, plan card) built from tokens, per src/README.md's "show, do not box" rule — except
// slides 02 and 07, which show real screenshots the shipped deck embedded (public/slides/shots/,
// see _manifest.json) instead of a hand-drawn mock, per the CEO's real-screenshot review.
import React from "react";
import { staticFile, Img } from "remotion";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { COLORS, FONTS, RADIUS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "AI 에이전트";
const TOTAL = 6;

// ------------------------------------------------------------------------------------------------
// Small local helpers shared across this file's slides only (no other spec file touched).
// ------------------------------------------------------------------------------------------------

// A single-line SVG arrow between two frame-absolute points (straight).
const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string; width?: number }> = ({
  x1,
  y1,
  x2,
  y2,
  color = COLORS.accent,
  width = 4,
}) => {
  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);
  const w = Math.max(Math.abs(x2 - x1), 1);
  const h = Math.max(Math.abs(y2 - y1), 1);
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const back = 16;
  const bx = x2 - Math.cos(ang) * back;
  const by = y2 - Math.sin(ang) * back;
  const perp = ang + Math.PI / 2;
  const s = 7;
  const a1 = { x: bx + Math.cos(perp) * s, y: by + Math.sin(perp) * s };
  const a2 = { x: bx - Math.cos(perp) * s, y: by - Math.sin(perp) * s };
  return (
    <svg style={{ position: "absolute", left, top, width: w, height: h, overflow: "visible" }} viewBox={`0 0 ${w} ${h}`}>
      <line x1={x1 - left} y1={y1 - top} x2={bx - left} y2={by - top} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon
        points={`${x2 - left},${y2 - top} ${a1.x - left},${a1.y - top} ${a2.x - left},${a2.y - top}`}
        fill={color}
      />
    </svg>
  );
};

// A round mono-glyph "step" node used by the SEE-THINK-PLAN-DO-FIX loop (slide 1).
const LoopNode: React.FC<{ cx: number; cy: number; r: number; label: string }> = ({ cx, cy, r, label }) => (
  <div
    style={{
      position: "absolute",
      left: cx - r,
      top: cy - r,
      width: r * 2,
      height: r * 2,
      borderRadius: "50%",
      background: COLORS.accentWash,
      border: `3px solid ${COLORS.accent}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <span style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: r * 0.34, color: COLORS.accentDeep, letterSpacing: "0.02em" }}>{label}</span>
  </div>
);

// A generic browser chrome (tab + address bar), local copy of step02-bash.tsx's ChromeBrowserWindow
// pattern — used for the "웹 검색" and "AI 채팅" mockups (slides 3/4), never a real product screen.
const BrowserWindow: React.FC<{ x: number; y: number; width: number; height: number; tabLabel: string; url: string; children: React.ReactNode }> = ({
  x,
  y,
  width,
  height,
  tabLabel,
  url,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      borderRadius: 14,
      overflow: "hidden",
      border: `1px solid ${COLORS.line}`,
      boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
      display: "flex",
      flexDirection: "column",
      background: COLORS.paper2,
    }}
  >
    <div style={{ height: 40, flex: "0 0 40px", display: "flex", alignItems: "center", gap: 10, padding: "0 18px", borderBottom: `1px solid ${COLORS.line}`, background: COLORS.paper }}>
      <div style={{ display: "flex", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", border: `1.5px solid ${COLORS.ink3}` }} />
        ))}
      </div>
      <span style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 16, color: COLORS.ink2 }}>{tabLabel}</span>
    </div>
    <div style={{ height: 44, flex: "0 0 44px", display: "flex", alignItems: "center", padding: "0 16px", borderBottom: `1px solid ${COLORS.line}` }}>
      <div style={{ flex: 1, height: 28, borderRadius: 14, background: COLORS.paper, display: "flex", alignItems: "center", padding: "0 14px" }}>
        <span style={{ fontFamily: FONTS.term, fontSize: 15, color: COLORS.ink3 }}>{url}</span>
      </div>
    </div>
    <div style={{ flex: "1 1 0", minHeight: 0, position: "relative" }}>{children}</div>
  </div>
);

// A small dark generic "AI CLI" prompt panel — a hypothetical agent program, NOT Claude Code, so this is
// hand-drawn rather than the shared ClaudeCodeTerminal (README rule only binds real Claude Code screens).
const MiniTerminal: React.FC<{ x: number; y: number; width: number; height: number; lines: Array<{ text: string; tone?: "dim" | "text" | "accent" }> }> = ({
  x,
  y,
  width,
  height,
  lines,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      borderRadius: 12,
      background: COLORS.void2,
      border: `1px solid ${COLORS.lineDark}`,
      boxSizing: "border-box",
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      overflow: "hidden",
    }}
  >
    {lines.map((l, i) => (
      <div
        key={i}
        style={{
          fontFamily: FONTS.term,
          fontSize: 20,
          lineHeight: 1.4,
          color: l.tone === "accent" ? "#6cc0ff" : l.tone === "dim" ? "#767c81" : "#e8eaec",
          wordBreak: "keep-all",
        }}
      >
        {l.text}
      </div>
    ))}
  </div>
);

// ------------------------------------------------------------------------------------------------
// 1 · AI_에이전트란 — SEE-THINK-PLAN-DO-FIX 동작 루프
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(7);
  const rightX = colX(7);
  const rightW = colW(5);

  const labels = ["SEE", "THINK", "PLAN", "DO", "FIX"];
  const r = 68;
  const marginX = 90;
  const usable = illoW - marginX * 2;
  const step = usable / (labels.length - 1);
  const loopY = BODY_Y + 150;
  const nodeX = (i: number) => illoX + marginX + step * i;

  // Curved "반복" return arrow from the last node back to the first, drawn beneath the row.
  const loopTop = loopY + r + 26;
  const loopBottom = loopTop + 70;
  const loopLeft = nodeX(0);
  const loopRight = nodeX(labels.length - 1);

  const quoteY = loopBottom + 60;
  const quoteH = BODY_BOTTOM - quoteY;

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="AI에이전트란?">
      {labels.map((label, i) => (
        <React.Fragment key={label}>
          <LoopNode cx={nodeX(i)} cy={loopY} r={r} label={label} />
          {i < labels.length - 1 ? <Arrow x1={nodeX(i) + r} y1={loopY} x2={nodeX(i + 1) - r} y2={loopY} /> : null}
        </React.Fragment>
      ))}

      {/* return-to-start loop, drawn as one continuous curved path under the row */}
      <svg style={{ position: "absolute", left: loopLeft, top: loopY, width: loopRight - loopLeft, height: loopBottom - loopY + 4, overflow: "visible" }} viewBox={`0 0 ${loopRight - loopLeft} ${loopBottom - loopY + 4}`}>
        <path
          d={`M ${loopRight - loopLeft} ${r + 6} C ${loopRight - loopLeft} ${loopBottom - loopY}, 0 ${loopBottom - loopY}, 0 ${r + 6}`}
          fill="none"
          stroke={COLORS.ink3}
          strokeWidth={3}
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
        <polygon points={`0,${r - 6} -9,${r + 12} 9,${r + 12}`} fill={COLORS.ink3} />
      </svg>
      <div style={{ position: "absolute", left: (loopLeft + loopRight) / 2 - 60, top: loopTop + 18, width: 120, textAlign: "center", fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.ink3 }}>
        반복
      </div>

      <div
        style={{
          position: "absolute",
          left: illoX,
          top: quoteY,
          width: illoW,
          height: quoteH,
          borderRadius: RADIUS.base,
          background: COLORS.paper2,
          border: `1px solid ${COLORS.line}`,
          boxSizing: "border-box",
          padding: "30px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div style={{ fontFamily: FONTS.term, fontWeight: 500, fontSize: 26, color: COLORS.ink, wordBreak: "keep-all" }}>
          &ldquo;매출 자료를 분석해서 매주 월요일 오전 9시에 보고서를 만들어 이메일로 보내줘&rdquo;
        </div>
        <div style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 24, color: COLORS.accentDeep, wordBreak: "keep-all" }}>
          → AI 에이전트는 이 한 문장으로 전 과정을 자동 실행합니다
        </div>
      </div>

      <AnnotationColumn
        x={rightX}
        y={BODY_Y}
        width={rightW}
        height={BODY_H}
        items={[
          { number: 1, head: "환경 인식", body: "파일, 웹, API 등 외부 환경을 스스로 탐색하고 정보를 수집" },
          { number: 2, head: "자율 판단", body: "수집한 정보를 바탕으로 다음 행동을 스스로 결정" },
          { number: 3, head: "도구 활용", body: "코드 실행, 파일 편집, 외부 서비스 호출 등 실제 작업을 수행" },
          { number: 4, head: "반복 학습", body: "결과를 확인하고 부족하면 스스로 수정하며 목표를 달성할 때까지 반복" },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 2 · AI_에이전트_현황 — 3대 CLI 에이전트 비교
// ------------------------------------------------------------------------------------------------

// Real logo + real screenshot per CLI (shipped deck embedded actual product screenshots here; the
// worker who first rebuilt this slide couldn't read them and hand-drew a "fake terminal chrome +
// monogram" mock instead — replaced with the real pair per public/slides/shots/_manifest.json).
const CliColumn: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  logoSrc: string;
  logoNatW: number;
  logoNatH: number;
  shotSrc: string;
  name: string;
  by: string;
  feature: string;
}> = ({ x, y, width, height, logoSrc, logoNatW, logoNatH, shotSrc, name, by, feature }) => {
  const logoH = 40;
  const logoW = Math.round((logoH * logoNatW) / logoNatH);
  const shotW = width - 48;
  const shotH = 300;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: RADIUS.outer,
        border: `1px solid ${COLORS.line}`,
        boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
        background: COLORS.paper2,
        boxSizing: "border-box",
        padding: "24px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div style={{ height: logoH, width: logoW, flex: "0 0 auto" }}>
        <Img src={logoSrc} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ width: shotW, height: shotH, borderRadius: RADIUS.inner, border: `1px solid ${COLORS.line}`, overflow: "hidden", background: COLORS.void2, flex: "0 0 auto" }}>
        <Img src={shotSrc} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 28, color: COLORS.ink }}>{name}</div>
        <div style={{ fontFamily: FONTS.term, fontWeight: 500, fontSize: 16, color: COLORS.ink3, marginTop: 2 }}>by {by}</div>
      </div>
      <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 19, color: COLORS.ink2, textAlign: "center", wordBreak: "keep-all", lineHeight: 1.4 }}>{feature}</div>
    </div>
  );
};

const Slide02: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const cardW = (illoW - 40 * 2) / 3;
  const cardH = 540;
  const cardY = BODY_Y + 20;

  const cards = [
    {
      name: "GPT CLI (Codex)",
      by: "OpenAI",
      feature: "코드 생성 · 파일 편집 특화",
      logoSrc: staticFile("slides/shots/AI_에이전트_현황_2.png"),
      logoNatW: 519,
      logoNatH: 150,
      shotSrc: staticFile("slides/shots/AI_에이전트_현황_1.png"),
    },
    {
      name: "Claude Code",
      by: "Anthropic",
      feature: "파일 편집 · CLAUDE.md 메모리 특화",
      logoSrc: staticFile("slides/shots/AI_에이전트_현황_4.png"),
      logoNatW: 960,
      logoNatH: 207,
      shotSrc: staticFile("slides/shots/AI_에이전트_현황_3.png"),
    },
    {
      name: "Antigravity CLI",
      by: "Google",
      feature: "웹 검색 · Google 생태계 연동 (구 Gemini CLI)",
      logoSrc: staticFile("slides/shots/AI_에이전트_현황_6.png"),
      logoNatW: 1171,
      logoNatH: 280,
      shotSrc: staticFile("slides/shots/AI_에이전트_현황_5.png"),
    },
  ];

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="3대 CLI 에이전트 비교">
      {cards.map((c, i) => (
        <CliColumn key={c.name} x={illoX + i * (cardW + 40)} y={cardY} width={cardW} height={cardH} {...c} />
      ))}
      <div
        style={{
          position: "absolute",
          left: illoX,
          top: cardY + cardH + 40,
          width: illoW,
          textAlign: "center",
          fontFamily: FONTS.body,
          fontWeight: 600,
          fontSize: 28,
          color: COLORS.ink2,
          wordBreak: "keep-all",
        }}
      >
        이번 강의에서 세 에이전트를 모두 설치하고, 동일한 명령어로 응답 방식의 차이를 직접 비교합니다
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 3 · 에이전트_동작_방식_① — 웹 검색으로 명령어 찾기
// ------------------------------------------------------------------------------------------------

const SearchResultRow: React.FC<{ y: number; width: number; site: string; title: string; body: string }> = ({ y, width, site, title, body }) => (
  <div style={{ position: "absolute", left: 24, top: y, width: width - 48, display: "flex", flexDirection: "column", gap: 4 }}>
    <div style={{ fontFamily: FONTS.term, fontSize: 14, color: "#3c8c40" }}>{site}</div>
    <div style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 19, color: "#1a0dab" }}>{title}</div>
    <div style={{ fontFamily: FONTS.body, fontSize: 15, color: COLORS.ink2, lineHeight: 1.4, wordBreak: "keep-all" }}>{body}</div>
  </div>
);

const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const browserH = 560;
  const browserY = BODY_Y + 10;

  const cmdY = browserY + browserH + 50;
  const cmdH = BODY_BOTTOM - cmdY;

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="웹 검색으로 명령어 찾기">
      <BrowserWindow x={illoX} y={browserY} width={illoW} height={browserH} tabLabel="컴퓨터 예약종료 명령어 - 검색" url="google.com/search?q=컴퓨터+예약종료+명령어">
        <SearchResultRow y={24} width={illoW} site="blog.naver.com › TechTip › 윈도우" title="윈도우 예약종료 명령어 shutdown 사용법 완벽 정리" body="30분 예약은 shutdown -s -t 1800 을 입력하세요." />
        <SearchResultRow y={140} width={illoW} site="itbeginner.tistory.com › windows › shutdown" title="컴퓨터 자동 종료 예약하는 방법 (cmd 명령어)" body="cmd 창을 열고 shutdown /s /t 초를 입력합니다. 취소하려면 shutdown /a 를 입력합니다." />
        <SearchResultRow y={256} width={illoW} site="devblog.example.com › cmd-tips › shutdown" title="shutdown 명령어 옵션 정리 (/s /t /a /r)" body="/s 종료, /r 재시작, /t 시간(초), /a 예약 취소. 예시와 함께 알아봅니다." />
        <FocusBadge number={1} x={illoW - 40} y={100} size={40} />
      </BrowserWindow>

      <Arrow x1={illoX + illoW / 2} y1={browserY + browserH + 8} x2={illoX + illoW / 2} y2={cmdY - 8} />

      <MiniTerminal
        x={illoX}
        y={cmdY}
        width={illoW}
        height={cmdH}
        lines={[
          { text: "C:\\Users\\student> shutdown -s -t 1800", tone: "text" },
          { text: "// 검색 결과에서 찾은 명령어를 사람이 직접 복사해 붙여넣고 실행", tone: "dim" },
        ]}
      />
      <FocusBadge number={2} x={illoX + illoW - 40} y={cmdY + 30} size={40} />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 4 · 에이전트_동작_방식_② — AI 채팅에 질문하고 직접 실행
// ------------------------------------------------------------------------------------------------

const ChatBubble: React.FC<{ y: number; width: number; from: "user" | "ai"; text: string }> = ({ y, width, from, text }) => (
  <div style={{ position: "absolute", left: 24, top: y, width: width - 48, display: "flex", justifyContent: from === "user" ? "flex-end" : "flex-start" }}>
    <div
      style={{
        maxWidth: "78%",
        background: from === "user" ? COLORS.accent : "#f1f1f1",
        color: from === "user" ? "#ffffff" : COLORS.ink,
        borderRadius: 16,
        padding: "14px 20px",
        fontFamily: FONTS.body,
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 1.4,
        wordBreak: "keep-all",
      }}
    >
      {text}
    </div>
  </div>
);

const Slide04: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const browserH = 560;
  const browserY = BODY_Y + 10;

  const cmdY = browserY + browserH + 50;
  const cmdH = BODY_BOTTOM - cmdY;

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="AI 채팅 질문 → 직접 실행">
      <BrowserWindow x={illoX} y={browserY} width={illoW} height={browserH} tabLabel="ChatGPT" url="chatgpt.com">
        <ChatBubble y={24} width={illoW} from="user" text="컴퓨터 30분 뒤에 예약종료하는 명령어 알려줄래?" />
        <ChatBubble
          y={100}
          width={illoW}
          from="ai"
          text={"물론이죠! shutdown -s -t 1800 을 명령 프롬프트(cmd)에 입력하면 30분 후 자동 종료됩니다. 취소하려면 shutdown -a 를 입력하세요."}
        />
        <FocusBadge number={1} x={illoW - 40} y={220} size={40} />
      </BrowserWindow>

      <Arrow x1={illoX + illoW / 2} y1={browserY + browserH + 8} x2={illoX + illoW / 2} y2={cmdY - 8} />

      <MiniTerminal
        x={illoX}
        y={cmdY}
        width={illoW}
        height={cmdH}
        lines={[
          { text: "C:\\Users\\student> shutdown -s -t 1800", tone: "text" },
          { text: "// AI가 알려준 명령어를 여전히 사람이 직접 복사해 실행", tone: "dim" },
        ]}
      />
      <FocusBadge number={2} x={illoX + illoW - 40} y={cmdY + 30} size={40} />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 5 · 에이전트_동작_방식_③ — 명령 자동 감지·실행 방식
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);

  const promptW = colW(4);
  const promptX = illoX;
  const promptY = BODY_Y + 10;
  const promptH = 200;

  const chatX = illoX;
  const chatW = illoW;
  const chatY = promptY + promptH + 40;
  const chatH = 300;

  const termY = chatY + chatH + 40;
  const termH = BODY_BOTTOM - termY;

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="명령 자동 감지·실행 방식">
      <div
        style={{
          position: "absolute",
          left: promptX,
          top: promptY,
          width: promptW,
          height: promptH,
          borderRadius: RADIUS.base,
          background: COLORS.paper2,
          border: `1px solid ${COLORS.line}`,
          boxSizing: "border-box",
          padding: "20px 26px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 18, color: COLORS.accentDeep }}>system.md — 출력 규칙</div>
        <div style={{ fontFamily: FONTS.term, fontSize: 18, color: COLORS.ink, lineHeight: 1.5, wordBreak: "keep-all" }}>
          명령어를 실행할 때는 반드시 <span style={{ color: COLORS.accentDeep, fontWeight: 700 }}>command{"{명령어}"}</span> 형식으로만 출력하시오.
        </div>
      </div>

      <BrowserWindow x={chatX} y={chatY} width={chatW} height={chatH} tabLabel="ChatGPT" url="chatgpt.com">
        <ChatBubble y={18} width={chatW} from="user" text="30분 뒤에 컴퓨터 종료 예약해줘" />
        <ChatBubble y={92} width={chatW} from="ai" text={"command{shutdown -s -t 1800}"} />
        <div style={{ position: "absolute", right: 24, top: 92, fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, color: COLORS.accentDeep }}>
          command{"{}"} 패턴 자동 감지!
        </div>
        <FocusBadge number={1} x={chatW - 40} y={92} size={40} />
      </BrowserWindow>

      <Arrow x1={illoX + illoW / 2} y1={chatY + chatH + 8} x2={illoX + illoW / 2} y2={termY - 8} />

      <MiniTerminal
        x={illoX}
        y={termY}
        width={illoW}
        height={termH}
        lines={[
          { text: "C:\\Users\\woohee> shutdown -s -t 1800", tone: "accent" },
          { text: "// 에이전트 프로그램이 command{} 를 감지해 직접 실행 — 사람 손을 거치지 않는다", tone: "dim" },
        ]}
      />
      <FocusBadge number={2} x={illoX + illoW - 40} y={termY + 30} size={40} />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 6 · 어떤_AI로_진행하나요 — 이 강의의 기준: Claude Pro 플랜
// ------------------------------------------------------------------------------------------------

const Slide08: React.FC = () => {
  const leftX = colX(0);
  const leftW = colW(7);
  const rightX = colX(7);
  const rightW = colW(5);

  const cardW = leftW;
  const cardH = BODY_H;
  const cardY = BODY_Y;

  const rows: Array<{ label: string; value: string }> = [
    { label: "가격", value: "월 약 $20 (한화 약 3만원)" },
    { label: "세션", value: "5시간 단위로 사용 한도 초기화" },
    { label: "포함 기능", value: "Claude Code, Artifacts, Projects" },
    { label: "모델", value: "최신 Claude 모델 (Sonnet / Opus) 우선 사용" },
  ];

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="이 강의의 기준 — Claude Pro 플랜">
      <div
        style={{
          position: "absolute",
          left: leftX,
          top: cardY,
          width: cardW,
          height: cardH,
          background: COLORS.paper2,
          border: `2px solid ${COLORS.line}`,
          borderRadius: 18,
          boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
          padding: "52px 56px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: 9, background: COLORS.accentWash, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: FONTS.term, fontWeight: 800, fontSize: 24, color: COLORS.accentDeep }}>Pro</span>
          </div>
          <span style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 38, color: COLORS.accentDeep }}>Claude Pro 플랜</span>
        </div>
        <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", gap: 16 }}>
          {rows.map((r) => (
            <div
              key={r.label}
              style={{
                flex: "1 1 0",
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "0 28px",
                background: COLORS.paper,
                border: `1.5px solid ${COLORS.line}`,
                borderRadius: 12,
              }}
            >
              <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 32, color: COLORS.ink, flex: "0 0 150px" }}>{r.label}</span>
              <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 28, color: COLORS.ink2, wordBreak: "keep-all" }}>{r.value}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, fontFamily: FONTS.body, fontWeight: 500, fontSize: 23, color: COLORS.ink3, wordBreak: "keep-all" }}>
          * 무료 플랜도 기본 실습 가능 (사용량 제한 있음)
        </div>
      </div>

      <AnnotationColumn
        x={rightX}
        y={BODY_Y}
        width={rightW}
        height={BODY_H}
        items={[
          { number: 1, head: "매일 사용 한도 체크", body: "꾸준히 활용하는 습관을 만든다. 한도 초과 시 5시간 뒤 자동 초기화." },
          { number: 2, head: "자기 분야에 적용", body: "예: '경쟁사 분석 보고서를 에이전트로 자동화' — 무엇이든 내 직무에 적용하는 연습이 핵심." },
          { number: 3, head: "AI 전문가가 되는 공식", body: "매일 사용 + 꾸준한 질문 + 내 분야에 적용 = 6개월 안에 팀 내 AI 전문가" },
        ]}
      />
    </SlideFrame>
  );
};

export const S1_AGENT: SlideEntry[] = [
  { index: 1, name: "AI_에이전트란", title: "AI에이전트란?", render: () => React.createElement(Slide01) },
  { index: 2, name: "AI_에이전트_현황", title: "3대 CLI 에이전트 비교", render: () => React.createElement(Slide02) },
  { index: 3, name: "에이전트_동작_방식_①", title: "웹 검색으로 명령어 찾기", render: () => React.createElement(Slide03) },
  { index: 4, name: "에이전트_동작_방식_②", title: "AI 채팅 질문 → 직접 실행", render: () => React.createElement(Slide04) },
  { index: 5, name: "에이전트_동작_방식_③", title: "명령 자동 감지·실행 방식", render: () => React.createElement(Slide05) },
  { index: 6, name: "어떤_AI로_진행하나요", title: "이 강의의 기준 — Claude Pro 플랜", render: () => React.createElement(Slide08) },
];

export const S1_AGENT_PART: PartSpec = { id: "s1-agent", eyebrow: EYEBROW, entries: S1_AGENT };
