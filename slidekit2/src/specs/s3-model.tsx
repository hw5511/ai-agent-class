// s3-model — basic 3회차 (step03) 파트. 계획서: courses/basic/step03-redesign-plan.md
// 이 파일은 이 파트의 슬라이드만 소유한다. registry.ts 는 이미 등록되어 있으므로 건드리지 않는다.
//
// 화면 문구 출처: tools/step03-cli-facts.md §5 (/model 카탈로그). 행 템플릿(체크 표시·"(recommended)"
// 접미사가 어떻게 붙는지)은 NOT FOUND 라서 지어내지 않고, 이름 + 한 줄 설명만 verbatim 으로 수수하게
// 나열한다. Fable 5 는 설명 문구가 확인되지 않아 이름만 싣는다(카드에서 그 사실 자체를 짚는다).
// 2번 슬라이드(스펙트럼)는 구체적 가격·배수를 지어내지 않고 "왼쪽 = 빠르고 저렴 / 오른쪽 = 똑똑하지만
// 같은 시간에 구독 사용량을 더 소모"라는 방향만 도식화한다.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W } from "../VSCodeScreen";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS, TERM_THEME } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "/MODEL";
const TOTAL = 2;

const WINDOW_HEADER_H = 34; // AppWindow native title bar height (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane tab-bar height.

// ------------------------------------------------------------------------------------------------
// Local helpers (same math as s2-write.tsx / s3-config.tsx — each part owns its own copy).
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

// ------------------------------------------------------------------------------------------------
// 01 · model_선택_화면 — "/model 선택 화면"
// 사실표: row 템플릿 NOT FOUND → 체크마크/강조 없이 이름+설명 줄만 수수하게 나열 (지어내지 않음).
// ------------------------------------------------------------------------------------------------
interface ModelRow {
  id: string;
  name: string;
  desc?: string; // NOT FOUND for fable — left undefined, never invented
}

const MODEL_ROWS: ModelRow[] = [
  { id: "claude-opus-5", name: "Opus 5", desc: "For complex tasks" },
  { id: "claude-sonnet-5", name: "Sonnet 5", desc: "Most efficient for everyday tasks" },
  { id: "claude-haiku-4-5-20251001", name: "Haiku 4.5", desc: "Fastest for quick answers" },
  { id: "claude-fable-5-1", name: "Fable 5" },
];

const MODEL_ROW_H = 92;

const ModelPanel: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const listH = MODEL_ROWS.length * MODEL_ROW_H;
  const topPad = Math.max(14, (height - listH) / 2);
  return (
    <div style={{ position: "relative", width, height, boxSizing: "border-box", fontFamily: FONTS.term, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 18, top: 10, color: TERM_THEME.dark.dim, fontSize: 15 }}>
        <span style={{ color: TERM_THEME.dark.dim }}>{"> "}</span>/model
      </div>
      <div style={{ position: "absolute", left: 0, top: topPad, width, display: "flex", flexDirection: "column" }}>
        {MODEL_ROWS.map((m) => (
          <div key={m.id} style={{ height: MODEL_ROW_H, boxSizing: "border-box", padding: "10px 22px", borderBottom: `1px solid ${TERM_THEME.dark.box}`, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ color: TERM_THEME.dark.dim, fontSize: 16 }}>{"•"}</span>
              <span style={{ color: TERM_THEME.dark.strong, fontWeight: 700, fontSize: 19 }}>{m.name}</span>
              {m.desc ? (
                <>
                  <span style={{ color: TERM_THEME.dark.dim }}>{"—"}</span>
                  <span style={{ color: TERM_THEME.dark.text, fontSize: 17 }}>{m.desc}</span>
                </>
              ) : null}
            </div>
            <div style={{ paddingLeft: 26, color: TERM_THEME.dark.dim, fontSize: 14 }}>{m.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(9);
  const { windowNative, focus, view } = windowGeometry(illoW, BODY_H, 620);
  const termW = rightTermWidth(windowNative);
  const contentH = windowNative.h - WINDOW_HEADER_H - TERM_TAB_H;
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: BODY_Y + view.ty + p.y * view.s });
  const paneLeft = windowNative.w - termW;
  const listH = MODEL_ROWS.length * MODEL_ROW_H;
  const topPad = Math.max(14, (contentH - listH) / 2);
  const spotForRow = (i: number) => toFrame({ x: paneLeft + termW / 2, y: WINDOW_HEADER_H + TERM_TAB_H + topPad + i * MODEL_ROW_H + MODEL_ROW_H / 2 });

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="/model 선택 화면">
      <div style={{ position: "absolute", left: illoX, top: BODY_Y, width: illoW, height: BODY_H, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={BODY_H} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} layout="right" terminalWidth={termW} showTerminal terminalContent={<ModelPanel width={termW} height={contentH} />} mainMode="empty" />
        </Camera>
      </div>
      {MODEL_ROWS.map((_, i) => {
        const b = spotForRow(i);
        return <FocusBadge key={i} number={i + 1} x={b.x - termW * 0.36} y={b.y} size={30} />;
      })}
      <AnnotationColumn
        x={colX(9)}
        y={BODY_Y}
        width={colW(3)}
        height={BODY_H}
        items={[
          { number: 1, head: "Opus 5", body: "For complex tasks — 복잡한 작업에 적합." },
          { number: 2, head: "Sonnet 5", body: "Most efficient for everyday tasks — 일상 작업에 가장 효율적." },
          { number: 3, head: "Haiku 4.5", body: "Fastest for quick answers — 빠른 답변에 최적." },
          { number: 4, head: "Fable 5", body: "설명 문구가 아직 확인되지 않아 이름만 표시했다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · model_스펙트럼 — "haiku → sonnet → opus → fable" 좌우 축 도식 (배수·가격 지어내지 않음)
// ------------------------------------------------------------------------------------------------
interface SpectrumNode {
  id: string;
  name: string;
  r: number; // node circle radius — visually increasing = "더 똑똑함", not a real metric
}

const SPECTRUM: SpectrumNode[] = [
  { id: "claude-haiku-4-5-20251001", name: "Haiku 4.5", r: 26 },
  { id: "claude-sonnet-5", name: "Sonnet 5", r: 34 },
  { id: "claude-opus-5", name: "Opus 5", r: 42 },
  { id: "claude-fable-5-1", name: "Fable 5", r: 50 },
];

const Slide02: React.FC = () => {
  const x = colX(0);
  const w = colW(12);
  const axisY = BODY_Y + 190;
  const padX = 90;
  const trackW = w - padX * 2;
  const n = SPECTRUM.length;
  const maxR = SPECTRUM[SPECTRUM.length - 1].r;

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="haiku → sonnet → opus → fable">
      <svg width={w} height={420} style={{ position: "absolute", left: x, top: axisY - maxR - 90, overflow: "visible" }}>
        <defs>
          <linearGradient id="s3-model-axis" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.18} />
            <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0.9} />
          </linearGradient>
        </defs>
        <line x1={padX} y1={maxR + 90} x2={w - padX} y2={maxR + 90} stroke="url(#s3-model-axis)" strokeWidth={6} strokeLinecap="round" />
        <polygon points={`${w - padX},${maxR + 90 - 9} ${w - padX + 18},${maxR + 90} ${w - padX},${maxR + 90 + 9}`} fill={COLORS.accent} />

        {SPECTRUM.map((m, i) => {
          const cx = padX + (trackW * (i + 0.5)) / n;
          const cy = maxR + 90;
          return (
            <g key={m.id}>
              <circle cx={cx} cy={cy} r={m.r} fill={COLORS.paper2} stroke={COLORS.accent} strokeWidth={3} />
              <circle cx={cx} cy={cy} r={m.r - 10} fill={COLORS.accentWash} />
              <text x={cx} y={cy + 6} textAnchor="middle" fontFamily={FONTS.display} fontWeight={800} fontSize={16} fill={COLORS.accentDeep}>
                {i + 1}
              </text>
              <text x={cx} y={cy - m.r - 20} textAnchor="middle" fontFamily={FONTS.display} fontWeight={800} fontSize={24} fill={COLORS.ink}>
                {m.name}
              </text>
            </g>
          );
        })}
      </svg>

      <div style={{ position: "absolute", left: x, top: axisY + 190, width: (w - 40) / 2, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 34, color: COLORS.ink }}>{"← 왼쪽: 빠르고 저렴"}</div>
        <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 24, lineHeight: 1.5, color: COLORS.ink2, wordBreak: "keep-all" }}>
          성능은 상대적으로 낮지만 응답이 빠르고, 같은 시간에 구독 사용량을 덜 쓴다.
        </div>
      </div>
      <div style={{ position: "absolute", left: x + (w - 40) / 2 + 40, top: axisY + 190, width: (w - 40) / 2, display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-end", textAlign: "right" }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 34, color: COLORS.accentDeep }}>{"오른쪽: 더 똑똑함 →"}</div>
        <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 24, lineHeight: 1.5, color: COLORS.ink2, wordBreak: "keep-all" }}>
          더 복잡한 작업을 더 잘 해내지만, 같은 시간에 구독 사용량을 더 많이 쓴다.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: x,
          top: axisY + 400,
          width: w,
          boxSizing: "border-box",
          background: COLORS.paper2,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 14,
          padding: "34px 40px",
          fontFamily: FONTS.body,
          fontWeight: 600,
          fontSize: 24,
          lineHeight: 1.5,
          color: COLORS.ink3,
          wordBreak: "keep-all",
        }}
      >
        구체적인 가격·배수는 여기서 다루지 않는다 — 방향(왼쪽↔오른쪽)만 기억하면 된다.
      </div>
    </SlideFrame>
  );
};

export const S3_MODEL: SlideEntry[] = [
  { index: 1, name: "model_선택_화면", title: "/model 선택 화면", render: () => React.createElement(Slide01) },
  { index: 2, name: "model_스펙트럼", title: "haiku → sonnet → opus → fable", render: () => React.createElement(Slide02) },
];

export const S3_MODEL_PART: PartSpec = { id: "s3-model", eyebrow: EYEBROW, entries: S3_MODEL };
