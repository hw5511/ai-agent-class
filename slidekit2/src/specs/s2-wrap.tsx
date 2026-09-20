// s2-wrap — basic 2회차 슬라이드 82~86 (5장), "동작 원리" — 2회차 마무리. Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step02/wrap_*.svg) into this renderer.
//
// CEO note followed here: the wrap section explains how an agent actually works (지시 → 작성 → 실행 →
// 확인, repeat until it works). That loop is drawn as a real vector diagram — boxes connected by solid
// arrows, a curved dashed loop-back arrow, tokens-only — not a row of tinted cards. Every other slide
// carries an actual UI mockup (ClaudeCodeTerminal / InputBar) rather than boxes-with-text alone. No
// green/red/amber anywhere; the one chromatic accent is blue (COLORS.accent).
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { InputBar } from "../InputBar";
import { ClaudeCodeTerminalPanel } from "../ClaudeCodeTerminal";
import { Glyph } from "../core/glyphs";
import { COLORS, FONTS, RADIUS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H, BODY_BOTTOM } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "동작 원리";
const TOTAL = 5;

// ------------------------------------------------------------------------------------------------
// Small shared pieces
// ------------------------------------------------------------------------------------------------

// A tool icon drawn in ink/accent only (no per-tool hue — the deck's one chromatic accent stays blue
// everywhere; tools are told apart by icon shape + label, not color-coding).
type ToolIconName = "read" | "write" | "edit" | "bash";

const ToolIcon: React.FC<{ name: ToolIconName; size: number; color: string }> = ({ name, size, color }) => {
  const sw = Math.max(1.6, size * 0.09);
  if (name === "read") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="12" height="18" rx="1.6" stroke={color} strokeWidth={sw} />
        <line x1="7.5" y1="8" x2="14" y2="8" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <line x1="7.5" y1="12" x2="14" y2="12" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <circle cx="16.5" cy="16.5" r="3.6" stroke={color} strokeWidth={sw} />
        <line x1="19" y1="19" x2="21.5" y2="21.5" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "write") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M5 3.4C5 3 5.3 2.7 5.7 2.7H13L18 7.7V20.3C18 20.7 17.7 21 17.3 21H5.7C5.3 21 5 20.7 5 20.3Z" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M13 2.7V7.4C13 7.6 13.2 7.7 13.4 7.7H18" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
        <line x1="8" y1="15.5" x2="9.5" y2="17" stroke={color} strokeWidth={sw} strokeLinecap="round" />
        <path d="M9.5 17L15 11.5C15.6 10.9 16.5 10.9 17.1 11.5C17.7 12.1 17.7 13 17.1 13.6L11.6 19.1L8 20L9.5 17Z" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "edit") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 17.5L15 6.5C15.8 5.7 17.1 5.7 17.9 6.5L18.5 7.1C19.3 7.9 19.3 9.2 18.5 10L7.5 21H4V17.5Z" stroke={color} strokeWidth={sw} strokeLinejoin="round" />
        <line x1="13.5" y1="8" x2="17" y2="11.5" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="4" width="19" height="16" rx="1.8" stroke={color} strokeWidth={sw} />
      <path d="M6 9.5L9.5 12L6 14.5" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <line x1="11.5" y1="15" x2="16" y2="15" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
};

// ------------------------------------------------------------------------------------------------
// 01 · 오늘 한 것 (Read·Write·Edit·Bash 로 실제로 한 일)
// ------------------------------------------------------------------------------------------------

interface ToolCard {
  icon: ToolIconName;
  label: string;
  verb: string;
  lines: string[];
}

const TOOL_CARDS: ToolCard[] = [
  { icon: "read", label: "Read 툴", verb: "읽기", lines: ["정체불명 파일 8개 열람", "파일 내용 파악", "내용에 맞는 이름으로 정리"] },
  { icon: "write", label: "Write 툴", verb: "만들기", lines: ["자기소개서 md · 강아지 그림 svg", "html 포스터 · tkinter 계산기", "테트리스 게임까지 새로 제작"] },
  { icon: "edit", label: "Edit 툴", verb: "고치기", lines: ["테트리스 실행 후 개선", "포스터 색상 변경·재확인"] },
  { icon: "bash", label: "Bash 툴", verb: "실행", lines: ["카카오톡 · 유튜브 실행", "파일 목록 설명 · 시스템 정보 조회", "테트리스 실행 · 바탕화면 슬라임 위젯", "웹캠으로 사진 캡처"] },
];

const Slide01: React.FC = () => {
  const gap = 28;
  const cardW = (colW(12) - gap) / 2;
  const cardH = (BODY_H - gap) / 2;
  const positions = [
    { x: colX(0), y: BODY_Y },
    { x: colX(0) + cardW + gap, y: BODY_Y },
    { x: colX(0), y: BODY_Y + cardH + gap },
    { x: colX(0) + cardW + gap, y: BODY_Y + cardH + gap },
  ];

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="오늘 한 것">
      {TOOL_CARDS.map((card, i) => (
        <div
          key={card.label}
          style={{
            position: "absolute",
            left: positions[i].x,
            top: positions[i].y,
            width: cardW,
            height: cardH,
            boxSizing: "border-box",
            background: COLORS.paper2,
            border: `1px solid ${COLORS.line}`,
            borderRadius: RADIUS.base,
            padding: "26px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, flex: "0 0 auto", borderRadius: RADIUS.inner, background: COLORS.accentWash, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ToolIcon name={card.icon} size={28} color={COLORS.accentDeep} />
            </div>
            <div>
              <div style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 20, color: COLORS.accentDeep, letterSpacing: "0.02em" }}>{card.label}</div>
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 32, color: COLORS.ink }}>{card.verb}</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
            {card.lines.map((ln) => (
              <div key={ln} style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 22, color: COLORS.ink2, wordBreak: "keep-all" }}>
                {ln}
              </div>
            ))}
          </div>
        </div>
      ))}
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · 에이전트 동작 루프 (지시 → 작성 → 실행 → 확인, 안 되면 다시 — 될 때까지 반복)
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const stepW = colW(3) - 14;
  const stepH = 210;
  const stepY = BODY_Y + 90;
  const gap = (colW(12) - stepW * 4) / 3;
  const xs = [0, 1, 2, 3].map((i) => colX(0) + i * (stepW + gap));

  const steps: { title: string; sub: string; tone: "neutral" | "accent" }[] = [
    { title: "사용자 지시", sub: "만들 것을 말로 지시", tone: "neutral" },
    { title: "작성", sub: "Write · Edit 로 코드/명령 작성", tone: "accent" },
    { title: "실행", sub: "Bash 로 직접 실행", tone: "accent" },
    { title: "확인", sub: "Read 로 결과 확인", tone: "accent" },
  ];

  const cy = stepY + stepH / 2;
  const loopY = BODY_Y + 12;
  const loopStartX = xs[3] + stepW / 2;
  const loopEndX = xs[1] + stepW / 2;
  const loopId = "wrap-loop-arrow";

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="에이전트 동작 루프">
      <svg width={colW(12)} height={BODY_H} style={{ position: "absolute", left: colX(0), top: BODY_Y, overflow: "visible" }}>
        <defs>
          <marker id={loopId} markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
            <path d="M0 0L8 5L0 10Z" fill={COLORS.accentDeep} />
          </marker>
        </defs>
        {/* forward arrows between the three linear steps */}
        {[0, 1, 2].map((i) => {
          const x1 = xs[i] + stepW - colX(0);
          const x2 = xs[i + 1] - colX(0);
          const y = cy - BODY_Y;
          return <line key={i} x1={x1 + 4} y1={y} x2={x2 - 10} y2={y} stroke={COLORS.ink3} strokeWidth={3} strokeLinecap="round" markerEnd={`url(#${loopId})`} />;
        })}
        {/* curved dashed loop-back: 확인 top -> over the top -> down into 작성 top */}
        <path
          d={`M ${loopStartX - colX(0)} ${stepY - BODY_Y} C ${loopStartX - colX(0)} ${loopY - BODY_Y - 40}, ${loopEndX - colX(0)} ${loopY - BODY_Y - 40}, ${loopEndX - colX(0)} ${stepY - BODY_Y}`}
          fill="none"
          stroke={COLORS.accentDeep}
          strokeWidth={3.4}
          strokeDasharray="9 8"
          strokeLinecap="round"
          markerEnd={`url(#${loopId})`}
        />
        <text x={(loopStartX + loopEndX) / 2 - colX(0)} y={loopY - BODY_Y - 52} textAnchor="middle" fontFamily={FONTS.display} fontWeight={700} fontSize={22} fill={COLORS.accentDeep}>
          안 되면 다시 고쳐서 — 될 때까지 반복
        </text>
      </svg>

      {steps.map((s, i) => (
        <div
          key={s.title}
          style={{
            position: "absolute",
            left: xs[i],
            top: stepY,
            width: stepW,
            height: stepH,
            boxSizing: "border-box",
            borderRadius: RADIUS.base,
            background: s.tone === "accent" ? COLORS.accentWash : COLORS.paper2,
            border: `1.5px solid ${s.tone === "accent" ? COLORS.accent : COLORS.line}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 30, color: s.tone === "accent" ? COLORS.accentDeep : COLORS.ink2 }}>{s.title}</div>
          <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 20, color: s.tone === "accent" ? COLORS.accentDeep : COLORS.ink2, wordBreak: "keep-all" }}>{s.sub}</div>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: colX(0),
          top: BODY_BOTTOM - 150,
          width: colW(12),
          height: 110,
          boxSizing: "border-box",
          borderRadius: RADIUS.base,
          background: COLORS.accentWash,
          border: `1.5px solid ${COLORS.accent}`,
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "0 36px",
        }}
      >
        <div style={{ width: 44, height: 44, flex: "0 0 auto", borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Glyph name="refresh" size={22} color="#ffffff" strokeWidth={2.6} />
        </div>
        <div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 22, color: COLORS.accentDeep }}>핵심</div>
          <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 22, color: COLORS.accentDeep, wordBreak: "keep-all" }}>
            ChatGPT 와 달리, 멈춰있지 않고 안 되면 다시 고치는 것을 답이 나올 때까지 스스로 반복한다.
          </div>
        </div>
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · ChatGPT 와 무엇이 다른가 (같은 질문, 다른 결과)
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const colWidth = (colW(12) - 40) / 2;
  const leftX = colX(0);
  const rightX = leftX + colWidth + 40;
  const panelY = BODY_Y;
  const panelH = 560;

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="ChatGPT 와 무엇이 다른가">
      {/* left: a plain chat-bubble mockup — question in, explanation-only text back */}
      <div style={{ position: "absolute", left: leftX, top: panelY, width: colWidth, height: panelH, borderRadius: RADIUS.outer, background: COLORS.paper2, border: `1px solid ${COLORS.line}`, boxShadow: "0 18px 40px rgba(16,17,19,0.08)", overflow: "hidden" }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 24px", borderBottom: `1px solid ${COLORS.line}`, fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.ink2 }}>ChatGPT</div>
        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ alignSelf: "flex-end", maxWidth: "82%", background: COLORS.accentWash, borderRadius: 14, padding: "14px 20px", fontFamily: FONTS.body, fontWeight: 600, fontSize: 22, color: COLORS.accentDeep, wordBreak: "keep-all" }}>
            "테트리스 어떻게 만들어?"
          </div>
          <div style={{ alignSelf: "flex-start", maxWidth: "88%", background: COLORS.paper, borderRadius: 14, padding: "16px 20px", fontFamily: FONTS.body, fontWeight: 500, fontSize: 20, color: COLORS.ink2, wordBreak: "keep-all", lineHeight: 1.6 }}>
            설명과 예시 코드만 돌아온다. 실행은 내가 직접 해야 하고, 복사·붙여넣기가 필요하다.
          </div>
        </div>
        <div style={{ position: "absolute", left: 28, bottom: 24, fontFamily: FONTS.body, fontWeight: 500, fontSize: 18, color: COLORS.ink3 }}>글로만 답변</div>
      </div>

      {/* right: the real ClaudeCodeTerminal mockup — same request, but it makes + runs it */}
      <div style={{ position: "absolute", left: rightX, top: panelY, width: colWidth, height: panelH, borderRadius: RADIUS.outer, background: COLORS.paper2, border: `1px solid ${COLORS.line}`, boxShadow: "0 18px 40px rgba(16,17,19,0.08)", overflow: "hidden" }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 24px", borderBottom: `1px solid ${COLORS.line}`, fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.accentDeep }}>AI 에이전트</div>
        <div style={{ position: "relative", padding: 20 }}>
          <ClaudeCodeTerminalPanel
            x={0}
            y={0}
            width={colWidth - 40}
            turns={[
              { role: "user", text: "테트리스 만들어서 실행해줘" },
              { role: "assistant", text: "파일을 만들고 Bash 로 바로 실행할게요." },
            ]}
            fontSize={18}
            showHint={false}
          />
        </div>
        <div style={{ position: "absolute", left: 28, bottom: 24, fontFamily: FONTS.body, fontWeight: 500, fontSize: 18, color: COLORS.ink3 }}>실물 결과 남음</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: colX(0),
          top: BODY_BOTTOM - 96,
          width: colW(12),
          height: 66,
          boxSizing: "border-box",
          borderRadius: RADIUS.base,
          background: COLORS.accentWash,
          border: `1.5px solid ${COLORS.accent}`,
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          gap: 16,
        }}
      >
        <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: COLORS.accentDeep }}>오늘의 증거</span>
        <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 20, color: COLORS.accentDeep, wordBreak: "keep-all" }}>
          테트리스 게임과 바탕화면 슬라임 위젯이 실제로 내 컴퓨터에 남았다.
        </span>
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · '질문'이 아니라 '지시' (프롬프트를 쓰는 법이 달라진다)
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const barW = colW(12);
  const chipGap = 24;
  const chipW = (colW(12) - chipGap * 3) / 4;
  const chipY = BODY_Y + 300;
  const chipH = 200;

  const chips: { n: string; head: string; body: string; example: string }[] = [
    { n: "①", head: "무엇을", body: "만들 대상을 구체적으로", example: "테트리스" },
    { n: "②", head: "어떤 형태로", body: "결과물 형태 지정", example: "파이썬으로" },
    { n: "③", head: "어디에", body: "저장 위치 지정", example: "현재 폴더에" },
    { n: "④", head: "그다음 무엇을", body: "다음 행동을 이어 지시", example: "실행까지" },
  ];

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="'질문' 아닌 '지시'">
      <InputBar x={colX(0)} y={BODY_Y} width={barW} height={90} label="질문하는 습관 — 설명만 돌아온다" text={'"테트리스는 어떻게 만들어?"'} focused={false} />
      <InputBar x={colX(0)} y={BODY_Y + 130} width={barW} height={90} label="지시하는 프롬프트 — 결과물이 남는다" text={'"테트리스를 파이썬으로 만들어서 실행해줘"'} focused />

      {chips.map((c, i) => (
        <div
          key={c.head}
          style={{
            position: "absolute",
            left: colX(0) + i * (chipW + chipGap),
            top: chipY,
            width: chipW,
            height: chipH,
            boxSizing: "border-box",
            borderRadius: RADIUS.base,
            background: COLORS.paper2,
            border: `1px solid ${COLORS.line}`,
            borderTop: `5px solid ${COLORS.accent}`,
            padding: "22px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 18, color: COLORS.accentDeep }}>{`${c.n} ${c.head}`}</div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 26, color: COLORS.ink }}>{c.example}</div>
          <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 18, color: COLORS.ink2, wordBreak: "keep-all" }}>{c.body}</div>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: colX(0),
          top: BODY_BOTTOM - 64,
          width: colW(12),
          fontFamily: FONTS.body,
          fontWeight: 500,
          fontSize: 20,
          color: COLORS.ink3,
          wordBreak: "keep-all",
        }}
      >
        오늘 쓴 프롬프트 "강아지 포스터를 html 로 현재 폴더에 만들어 크롬으로 열어줘" 도 이 순서였다.
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · 2회차 마무리 (오늘 얻은 것 + 다음 시간 예고)
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const checklist: { head: string; body: string }[] = [
    { head: "정체성", body: "CLAUDE.md 로 이름·역할·말투를 부여했다." },
    { head: "네 툴", body: "Read · Write · Edit · Bash — 읽기·만들기·고치기·실행." },
    { head: "실물 확인", body: "지시하면 결과가 파일과 화면으로 실제 남았다." },
  ];
  const rowH = 92;
  const rowGap = 18;

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="2회차 마무리">
      {checklist.map((it, i) => (
        <div
          key={it.head}
          style={{
            position: "absolute",
            left: colX(0),
            top: BODY_Y + i * (rowH + rowGap),
            width: colW(12),
            height: rowH,
            boxSizing: "border-box",
            borderRadius: RADIUS.base,
            background: COLORS.paper2,
            border: `1px solid ${COLORS.line}`,
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "0 32px",
          }}
        >
          <div style={{ width: 52, height: 52, flex: "0 0 auto", borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Glyph name="check" size={26} color="#ffffff" strokeWidth={3} />
          </div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 26, color: COLORS.ink, flex: "0 0 160px" }}>{it.head}</div>
          <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 24, color: COLORS.ink2, wordBreak: "keep-all" }}>{it.body}</div>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: colX(0),
          top: BODY_Y + 3 * (rowH + rowGap) + 24,
          width: colW(12),
          borderRadius: RADIUS.base,
          background: COLORS.void2,
          border: `1px solid ${COLORS.lineDark}`,
          padding: "26px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 20, color: "#e8eaec" }}>
          <span style={{ color: COLORS.accent }}>{"❯ "}</span>다음 시간 — Claude Code 환경 설정과 기본 명령어
        </div>
        <div style={{ fontFamily: FONTS.term, fontWeight: 400, fontSize: 18, color: "#cfd2d4" }}>권한 모드와 욜로 모드 · 개인정보 보안 설정 · settings.json</div>
        <div style={{ fontFamily: FONTS.term, fontWeight: 400, fontSize: 18, color: "#cfd2d4" }}>자주 쓰는 슬래시 명령어 · 웹 검색 툴</div>
      </div>
    </SlideFrame>
  );
};

export const S2_WRAP: SlideEntry[] = [
  { index: 1, name: "wrap_오늘_한_것", title: "오늘 한 것", render: () => React.createElement(Slide01) },
  { index: 2, name: "wrap_동작_원리", title: "에이전트 동작 루프", render: () => React.createElement(Slide02) },
  { index: 3, name: "wrap_챗gpt와_다르다", title: "ChatGPT 와 무엇이 다른가", render: () => React.createElement(Slide03) },
  { index: 4, name: "wrap_질문에서_지시로", title: "'질문' 아닌 '지시'", render: () => React.createElement(Slide04) },
  { index: 5, name: "wrap_마무리", title: "2회차 마무리", render: () => React.createElement(Slide05) },
];

export const S2_WRAP_PART: PartSpec = { id: "s2-wrap", eyebrow: EYEBROW, entries: S2_WRAP };
