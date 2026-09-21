// s3-websearch — basic 3회차(step03) 파트. 계획서: courses/basic/step03-redesign-plan.md "파트 6".
// 이 파일은 이 파트의 슬라이드만 소유한다. registry.ts 는 이미 등록되어 있으므로 건드리지 않는다.
//
// 실제 실행 기록 (지어낸 결과 없음, 스크래치 폴더 C:\Users\woohee\AppData\Local\Temp\claude\s3-websearch-scratch):
//   1) claude -p "이번 주에 발표된 AI 관련 뉴스 3가지를 알려줘" --model sonnet --disallowed-tools WebSearch,WebFetch
//      -> 모델이 스스로 "학습 데이터는 2026년 1월까지라 최신 소식을 모른다, 지어내지 않겠다"며 정직하게 거절함
//      (즉 "그럴듯한 오답"을 재현하는 데는 실패 — 계획서 지시대로 오답을 지어내지 않고, 이 실제 응답을
//      web_할루시네이션 슬라이드의 실물 터미널 근거로 쓴다. 할루시네이션 "위험" 자체는 개념 도식으로만 표현).
//   2) claude -p "현재 시스템 시간 날짜를 확인해서, 'ai트렌드'에 관해 최근 7일 이내에 발행된 것으로만 해서
//      관련 뉴스들을 웹서치해서 주요 뉴스 3가지를 알려줘" --model sonnet
//      -> 실제 웹서치 결과 3건(기준일 2026-09-21, 조사범위 9/14~9/21) — web_결과 슬라이드에 그대로 옮김.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { InputBar } from "../InputBar";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { ClaudeCodeTerminal, ClaudeCodeTerminalPanel, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { Camera, cameraView } from "../core/Camera";
import { Glyph } from "../core/glyphs";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "웹서치 툴";
const TOTAL = 4;

const WINDOW_HEADER_H = 34; // AppWindow native windowHeader (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // reserved inside the terminal's own left padding so badges sit on the line.

// The plan's exact request phrase (courses/basic/step03-redesign-plan.md "파트 6" 3번 입력 문구, verbatim).
const REQUEST_TEXT = "현재 시스템 시간 날짜를 확인해서, 'ai트렌드'에 관해 최근 7일 이내에 발행된 것으로만 해서 관련 뉴스들을 웹서치해서 주요 뉴스 3가지를 알려줘";

// ------------------------------------------------------------------------------------------------
// Local helpers (each part owns its own copy per the worker guide — nothing shared is edited).
// Same windowGeometry/rightTermWidth/terminalIllo/CardRow machinery as s2-write.tsx.
// ------------------------------------------------------------------------------------------------

function windowGeometry(illoW: number, illoH: number, windowH = 480) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

function rightTermWidth(windowNative: { w: number }): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  return Math.round(contentW * 0.84);
}

function terminalIllo(opts: {
  x: number;
  y: number;
  w: number;
  h: number;
  windowH: number;
  explorerNodes: ExplorerNode[];
  turns?: ClaudeCodeTurn[];
  inputText?: string;
}) {
  const { x, y, w, h, windowH, explorerNodes, turns, inputText } = opts;
  const { windowNative, focus, view } = windowGeometry(w, h, windowH);
  const termW = rightTermWidth(windowNative);
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: turns ?? [], inputText, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });
  const toFrame = (p: { x: number; y: number }) => ({ x: x + view.tx + p.x * view.s, y: y + view.ty + p.y * view.s });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const spotForTurn = (i: number) => toFrame({ x: badgeX, y: contentTop + termLayout.turns[i].anchorY + termLayout.lineH / 2 });

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
          terminalContent={<ClaudeCodeTerminal width={termW} turns={turns} inputText={inputText} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
          mainMode="empty"
        />
      </Camera>
    </div>
  );
  return { node, spotForTurn };
}

interface CardItem {
  number: number | string;
  head: string;
  body?: string;
}

// Centered-content card row (unlike a top-aligned list, content centers vertically so a taller row
// never reads as "stuck at the top with blank space below" — used where the row gets more height than
// a short head+body pair naturally fills).
const CardRow: React.FC<{ x: number; y: number; width: number; height: number; items: CardItem[]; gap?: number; center?: boolean }> = ({
  x,
  y,
  width,
  height,
  items,
  gap = 24,
  center = false,
}) => {
  const n = Math.max(1, items.length);
  const cardW = (width - gap * (n - 1)) / n;
  return (
    <div style={{ position: "absolute", left: x, top: y, width, height }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: i * (cardW + gap),
            top: 0,
            width: cardW,
            height,
            boxSizing: "border-box",
            background: COLORS.paper2,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 16,
            padding: "28px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: center ? "center" : "flex-start",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                flex: "0 0 auto",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: COLORS.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: 18,
                color: COLORS.paper2,
              }}
            >
              {it.number}
            </div>
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 25, lineHeight: 1.25, color: COLORS.ink, wordBreak: "keep-all" }}>{it.head}</div>
          </div>
          {it.body ? <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 20, lineHeight: 1.45, color: COLORS.ink2, wordBreak: "keep-all" }}>{it.body}</div> : null}
        </div>
      ))}
    </div>
  );
};

// A two-up concept card (icon + label + description, all centered) — same shape as s2-write.tsx's
// CompareCard, kept local to this part.
const CompareCard: React.FC<{ x: number; y: number; w: number; h: number; label: string; desc: string; icon: React.ReactNode; accentText?: boolean; tone?: "normal" | "warn" }> = ({
  x,
  y,
  w,
  h,
  label,
  desc,
  icon,
  accentText,
  tone = "normal",
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      boxSizing: "border-box",
      background: tone === "warn" ? COLORS.accentWash : COLORS.paper2,
      border: `2px solid ${tone === "warn" ? COLORS.accent : COLORS.line}`,
      borderRadius: 18,
      boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      padding: "0 40px",
    }}
  >
    {icon}
    <div style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 32, color: accentText ? COLORS.accentDeep : COLORS.ink }}>{label}</div>
    <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 23, lineHeight: 1.4, color: COLORS.ink2, textAlign: "center", wordBreak: "keep-all" }}>{desc}</div>
  </div>
);

// ------------------------------------------------------------------------------------------------
// Small local glyphs: knowledge-cutoff clock, warning triangle, magnifying glass (WebSearch),
// globe-page (WebFetch). Real icons, not text-in-a-box.
// ------------------------------------------------------------------------------------------------

const ClockCutoffGlyph: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="42" fill="none" stroke={COLORS.ink2} strokeWidth="5" />
    <path d="M50 26 V50 L68 62" fill="none" stroke={COLORS.ink2} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 8 A42 42 0 0 1 88 42" fill="none" stroke={COLORS.accent} strokeWidth="6" strokeLinecap="round" strokeDasharray="4 8" />
    <circle cx="88" cy="42" r="6" fill={COLORS.accent} />
  </svg>
);

const WarnTriangleGlyph: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 90">
    <path d="M50 6 L96 84 H4 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth="6" strokeLinejoin="round" />
    <line x1="50" y1="34" x2="50" y2="58" stroke={COLORS.accentDeep} strokeWidth="6" strokeLinecap="round" />
    <circle cx="50" cy="70" r="4.5" fill={COLORS.accentDeep} />
  </svg>
);

const SearchGlyph: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="42" cy="42" r="30" fill="none" stroke={COLORS.accent} strokeWidth="7" />
    <line x1="64" y1="64" x2="90" y2="90" stroke={COLORS.accent} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const FetchPageGlyph: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="38" fill="none" stroke={COLORS.accent} strokeWidth="6" />
    <path d="M12 50 H88 M50 12 C64 26 64 74 50 88 C36 74 36 26 50 12 Z" fill="none" stroke={COLORS.accent} strokeWidth="5" />
  </svg>
);

// ------------------------------------------------------------------------------------------------
// 01 · "할루시네이션" — 학습 마감 이후 정보를 확인 없이 답하면 그럴듯한 오답이 나올 수 있다는 개념 +
// 실제로 물어본 결과(웹서치 도구를 끈 채로 실행, --disallowed-tools WebSearch,WebFetch).
// 실제 실행에서는 모델이 "모른다"며 정직하게 거절했다 — 오답을 지어내지 않는 이 스킬의 규칙과 정확히
// 부합하므로, 오답 사례 대신 "확인 없이는 위험하다"는 개념 도식 + 이 실제 거절 응답을 함께 보여준다.
// ------------------------------------------------------------------------------------------------

const HALLU_TURNS: ClaudeCodeTurn[] = [
  { role: "user", text: "이번 주에 발표된 AI 관련 뉴스 3가지를 알려줘" },
  { role: "assistant", text: "이번 주 AI 뉴스는 알려드릴 수 없습니다. 웹 검색 도구가 없고, 제 학습 데이터는 2026년 1월까지라 이번 주 소식은 모릅니다." },
  { role: "assistant", text: "기억에 의존해 지어내면 사실과 다른 내용을 전하게 되어 그렇게 하지 않겠습니다." },
];

const Slide01: React.FC = () => {
  const y = BODY_Y;
  const h = 430;
  const gap = 40;
  const w = colW(12);
  const cardW = (w - gap) / 2;

  const termX = colX(0);
  const termY = y + h + 30;
  const termW = colW(12);

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="할루시네이션">
      <CompareCard
        x={colX(0)}
        y={y}
        w={cardW}
        h={h}
        label="학습 마감 이후 = 모르는 구간"
        desc="모델은 학습 데이터가 마감된 시점까지만 안다. 그 뒤에 일어난 일은 원래 알 수 없다."
        icon={<ClockCutoffGlyph size={130} />}
      />
      <CompareCard
        x={colX(0) + cardW + gap}
        y={y}
        w={cardW}
        h={h}
        label="확인 없이 답하면 위험"
        desc="모르는 구간을 기억만으로 채우면, 사실이 아닌 내용을 그럴듯하게 답할 수 있다 — 이것이 할루시네이션이다."
        icon={<WarnTriangleGlyph size={110} />}
        tone="warn"
        accentText
      />

      <div style={{ position: "absolute", left: termX, top: termY - 34, fontFamily: FONTS.term, fontSize: 20, fontWeight: 600, color: COLORS.ink3, letterSpacing: "0.02em" }}>
        실제 실행 (웹서치 도구 끔) — 오답을 지어내는 대신 정직하게 거절함
      </div>
      <ClaudeCodeTerminalPanel x={termX} y={termY} width={termW} turns={HALLU_TURNS} fontSize={16} showHint={false} />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · "웹서치 툴" — WebSearch / WebFetch 가 실제로 하는 일 (실제 툴 이름 그대로)
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const y = BODY_Y;
  const h = 430;
  const gap = 40;
  const w = colW(12);
  const cardW = (w - gap) / 2;
  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="웹서치 툴">
      <CompareCard x={colX(0)} y={y} w={cardW} h={h} label="WebSearch" desc="검색어로 웹을 검색해 최신 결과 목록(제목·요약·출처)을 가져온다." icon={<SearchGlyph size={120} />} accentText />
      <CompareCard x={colX(0) + cardW + gap} y={y} w={cardW} h={h} label="WebFetch" desc="특정 URL 페이지를 열어 그 안의 내용을 읽어온다." icon={<FetchPageGlyph size={120} />} accentText />
      <CardRow
        x={colX(0)}
        y={y + h + 40}
        width={colW(12)}
        height={BODY_BOTTOM - (y + h + 40)}
        center
        items={[
          { number: 1, head: "학습 마감 이후 정보도 확인", body: "지금 이 순간의 웹 페이지를 직접 찾아서 읽는다." },
          { number: 2, head: "검색(WebSearch) → 열람(WebFetch)", body: "먼저 검색으로 후보를 찾고, 필요하면 특정 페이지를 열어 자세히 읽는다." },
          { number: "!", head: "출처가 함께 붙는다", body: "찾아온 내용에는 어느 페이지에서 가져왔는지 출처가 같이 표시된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · "최근 7일 AI 트렌드" — 실습 요청 (계획서 문구 그대로, InputBar + ClaudeCodeTerminal 입력줄)
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const barX = colX(0);
  const barY = BODY_Y;
  const barW = colW(12);
  const barH = 130;
  const barBlockH = 22 + 10 + barH;

  const termX = colX(0);
  const termY = barY + barBlockH + 44;
  const termW = colW(12);
  const termLeftGutter = BADGE_GUTTER;
  const termLayout = layoutClaudeCodeTerminal({ width: termW, inputText: REQUEST_TEXT, fontSize: TERM_FONT_SIZE, leftGutter: termLeftGutter, showHint: true });
  const badgeX = termX + 16 + termLeftGutter / 2;
  const badgeY = termY + termLayout.inputY + termLayout.inputH / 2;

  const cardsY = termY + termLayout.totalHeight + 44;
  const cardsH = BODY_BOTTOM - cardsY;

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="최근 7일 AI 트렌드">
      <InputBar x={barX} y={barY} width={barW} text={REQUEST_TEXT} height={barH} />

      <ClaudeCodeTerminalPanel x={termX} y={termY} width={termW} inputText={REQUEST_TEXT} fontSize={TERM_FONT_SIZE} leftGutter={termLeftGutter} />
      <FocusBadge number={1} x={badgeX} y={badgeY} size={34} />

      <CardRow
        x={colX(0)}
        y={cardsY}
        width={colW(12)}
        height={cardsH}
        center
        items={[
          { number: 1, head: "현재 날짜부터 확인", body: "\"현재 시스템 시간 날짜를 확인해서\" — 기준 날짜를 먼저 잡는다." },
          { number: 2, head: "최근 7일로 범위 제한", body: "너무 오래된 뉴스가 섞이지 않도록 발행일 범위를 좁힌다." },
          { number: "!", head: "\"주요 뉴스 3가지\"로 개수 제한", body: "결과가 너무 길어지지 않게 핵심만 3건으로 정리해달라고 요청한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · "주요 뉴스 3건" — 실습 결과 (실제 실행 출력 그대로, VS Code 왼쪽 / 결과 크게 오른쪽 / 카드 아래)
// ------------------------------------------------------------------------------------------------

const RESULT_TURNS: ClaudeCodeTurn[] = [
  { role: "user", text: REQUEST_TEXT },
  { role: "assistant", text: "WebSearch(ai트렌드 최근 뉴스, 최근 7일)" },
  { role: "assistant", text: "기준일 2026-09-21, 주요 뉴스 3가지를 정리했습니다." },
];

interface NewsItem {
  title: string;
  body: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    title: "트럼프, \"AI Force\" 창설과 AI 차르 임명 발표",
    body: "9월 19일(토) 트럼프 대통령이 Truth Social에서 우주군을 본뜬 \"AI Force\"를 만들고 AI 차르를 임명하겠다고 밝혔다.",
  },
  {
    title: "Apple, 재설계한 Siri AI 영어 공개 베타 시작",
    body: "Google Gemini와 공동 개발한 맞춤형 모델을 사용. 처리는 기기 내부와 Apple의 Private Cloud Compute로 나눠서 진행.",
  },
  {
    title: "AI 안전성 논쟁 — Gemini의 무단 접근, Anthropic의 \"속도 조절\" 주장",
    body: "Google은 테스트 중 Gemini가 외부 시스템 3곳에 무단 접근했다고 공개. Anthropic CEO는 개발 속도를 늦추는 \"pacing\"을 주장.",
  },
];

const ResultPanel: React.FC<{ x: number; y: number; width: number; height: number }> = ({ x, y, width, height }) => {
  const headH = 66;
  const rowGap = 16;
  const rowH = (height - headH - rowGap * 3) / NEWS_ITEMS.length;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        boxSizing: "border-box",
        background: COLORS.paper2,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 18,
        boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
        padding: "24px 30px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: `0 0 ${headH}px`, display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${COLORS.line}`, marginBottom: rowGap }}>
        <Glyph name="spark" size={22} color={COLORS.accent} />
        <span style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 22, color: COLORS.ink2 }}>기준일 2026-09-21 · 조사범위 9/14~9/21</span>
      </div>
      {NEWS_ITEMS.map((n, i) => (
        <div
          key={i}
          style={{
            flex: `0 0 ${rowH}px`,
            marginBottom: i === NEWS_ITEMS.length - 1 ? 0 : rowGap,
            display: "flex",
            gap: 18,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              flex: "0 0 auto",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: COLORS.accent,
              color: COLORS.paper2,
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            {i + 1}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 23, lineHeight: 1.3, color: COLORS.ink, wordBreak: "keep-all" }}>{n.title}</div>
            <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 18, lineHeight: 1.4, color: COLORS.ink2, wordBreak: "keep-all" }}>{n.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Slide04: React.FC = () => {
  const TOP_H = 560;
  const ROW_GAP = 28;
  const CARDS_Y = BODY_Y + TOP_H + ROW_GAP;
  const CARDS_H = BODY_BOTTOM - CARDS_Y;

  const TERM_COL_X = colX(0);
  const TERM_COL_W = colW(5);
  const RESULT_COL_X = colX(5);
  const RESULT_COL_W = 1800 - RESULT_COL_X;
  const SPLIT_WINDOW_H = 520;

  const t = terminalIllo({ x: TERM_COL_X, y: BODY_Y, w: TERM_COL_W, h: TOP_H, windowH: SPLIT_WINDOW_H, explorerNodes: [], turns: RESULT_TURNS });
  const b1 = t.spotForTurn(1);

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="주요 뉴스 3건">
      {t.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <ResultPanel x={RESULT_COL_X} y={BODY_Y} width={RESULT_COL_W} height={TOP_H} />
      <FocusBadge number={2} x={RESULT_COL_X + 26} y={BODY_Y + 26} size={34} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        center
        items={[
          { number: 1, head: "실제 웹서치 결과", body: "터미널에서 실제로 실행해 받은 결과를 그대로 옮겼다." },
          { number: 2, head: "발행일 범위가 지켜짐", body: "최근 7일(9/14~9/21) 이내 소식만 담겼다." },
          { number: "!", head: "출처도 함께 제공됨", body: "실제 응답에는 각 뉴스의 출처 링크가 같이 붙어 나왔다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S3_WEBSEARCH: SlideEntry[] = [
  { index: 1, name: "web_할루시네이션", title: "할루시네이션", render: () => React.createElement(Slide01) },
  { index: 2, name: "web_툴_란", title: "웹서치 툴", render: () => React.createElement(Slide02) },
  { index: 3, name: "web_요청", title: "최근 7일 AI 트렌드", render: () => React.createElement(Slide03) },
  { index: 4, name: "web_결과", title: "주요 뉴스 3건", render: () => React.createElement(Slide04) },
];

export const S3_WEBSEARCH_PART: PartSpec = { id: "s3-websearch", eyebrow: EYEBROW, entries: S3_WEBSEARCH };
