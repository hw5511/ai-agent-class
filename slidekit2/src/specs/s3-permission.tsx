// s3-permission — basic 3회차 (step03) 파트. 계획서: courses/basic/step03-redesign-plan.md
// 이 파일은 이 파트의 슬라이드만 소유한다. registry.ts 는 이미 등록되어 있으므로 건드리지 않는다.
//
// 화면 문구 정본 = tools/step03-cli-facts.md (2.1.273 바이너리에서 실측). 이 파일의 verbatim 표기는
// 전부 그 문서의 절 번호를 주석으로 단다. 문서에 NOT FOUND 로 적힌 문구(예: 합성 푸터
// "⏵⏵ accept edits on (shift+tab to cycle)", bypass 기동 배너)는 여전히 지어내지 않는다. 단 Bash/
// PowerShell deny 거부의 빨간 문구는 이후 다른 작업자가 실제 `claude -p` 재현 실행으로 얻어냈고
// (permission_denied 이벤트 verbatim, s3-settings.tsx:603 DENY_MESSAGE 와 동일 문자열), 05번
// 슬라이드는 그 실측 문구를 그대로 쓴다 — 더 이상 캡처 대기 자리표시자가 아니다.
//
// 🔴 사실 정정 (다른 세션 지시, 2026-09-21 — 계획서 원안을 덮어씀):
//   1) 슬라이드 1 = Shift+Tab **4단** 순환 그대로(manual/accept edits/plan/auto) + "순환은 4단, bypass 는
//      실행 옵션으로 따로 들어간다" 한 줄 추가.
//   2) 슬라이드 2 표 = **5행**(manual/accept edits/plan/auto/bypass permissions) x 4열(read/write/edit/
//      bash). bypass 행은 Shift+Tab 순환 밖임을 표에서 드러낸다.
//   3) `don't ask` 모드는 완전히 뺀다(출하 도움말에 없는 비공개 내부 모드, 각주도 없음).
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { InputBar } from "../InputBar";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W } from "../VSCodeScreen";
import { ClaudeCodeTerminal, ClaudeCodeTerminalPanel, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS, TERM_THEME, WINDOW_THEME } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "권한 모드";
const TOTAL = 12;

const WINDOW_HEADER_H = 34; // AppWindow native title bar height (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // reserved inside the terminal so badges never cover its text.

// ------------------------------------------------------------------------------------------------
// Local helpers (each part owns its own copy per the worker guide — same math as s3-settings.tsx).
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

interface CardItem {
  number: number | string;
  head: string;
  body?: string;
}
const CardRow: React.FC<{ x: number; y: number; width: number; height: number; items: CardItem[]; gap?: number }> = ({ x, y, width, height, items, gap = 24 }) => {
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
            padding: "20px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                flex: "0 0 auto",
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: COLORS.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: 17,
                color: COLORS.paper2,
              }}
            >
              {it.number}
            </div>
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 24, lineHeight: 1.24, color: COLORS.ink, wordBreak: "keep-all" }}>{it.head}</div>
          </div>
          {it.body ? <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 19, lineHeight: 1.42, color: COLORS.ink2, wordBreak: "keep-all" }}>{it.body}</div> : null}
        </div>
      ))}
    </div>
  );
};

// A verbatim mode-indicator chip — the ONLY on-screen "mode text" this file ever draws, matching
// exactly the lowercase `indicator` strings from step03-cli-facts.md §1 (never the composite
// "⏵⏵ ... (shift+tab to cycle)" footer string, which is NOT FOUND in the binary).
const ModeChip: React.FC<{ text: string; tone?: "ink" | "accent" }> = ({ text, tone = "ink" }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "5px 14px",
      borderRadius: 999,
      background: tone === "accent" ? COLORS.accentWash : COLORS.paper,
      border: `1px solid ${tone === "accent" ? COLORS.accent : COLORS.line}`,
      fontFamily: FONTS.term,
      fontWeight: 600,
      fontSize: 20,
      color: tone === "accent" ? COLORS.accentDeep : COLORS.ink2,
    }}
  >
    {text}
  </span>
);

// Command/URL "액션박스" — a copy-styled monospace card for a command the student should paste
// verbatim. Local to this part (no shared ActionBox component exists in this renderer yet).
const ActionBox: React.FC<{ x: number; y: number; width: number; command: string; label?: string }> = ({ x, y, width, command, label = "그대로 복사" }) => (
  <div style={{ position: "absolute", left: x, top: y, width }}>
    <div style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 20, color: COLORS.accentDeep, marginBottom: 10 }}>{label}</div>
    <div
      style={{
        width,
        boxSizing: "border-box",
        borderRadius: 12,
        background: COLORS.void2,
        border: `1px solid ${COLORS.accent}`,
        padding: "22px 28px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        boxShadow: "0 14px 30px rgba(16,17,19,0.18)",
      }}
    >
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: COLORS.accent, flex: "0 0 auto" }} />
      <span style={{ fontFamily: FONTS.term, fontWeight: 600, fontSize: 27, color: TERM_THEME.dark.strong, whiteSpace: "pre" }}>{command}</span>
    </div>
  </div>
);

const CWD = "C:\\agent1";

// ==================================================================================================
// 01 · perm_shift_tab — "Shift+Tab 모드 순환"
// 사실표 §1: 인앱 도움말이 설명하는 4단 순환(default/accept edits/plan/auto)만 그린다. bypass 는
// external:"bypassPermissions" 로 존재하지만 도움말의 순환 목록엔 없다 — 뒤 슬라이드(7~10)에서 별도로
// 다룬다. indicator 문자열은 §1 verbatim("manual mode"/"accept edits"/"plan mode"/"auto mode"), 설명은
// 도움말 4줄("default — ask before every edit" 등)을 한국어로 옮긴 것.
// ==================================================================================================
const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(7);
  const illoH = 560;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, 560);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const termProps = { width: termW, showLaunch: true, launchPath: CWD, placeholder: "여기서 Shift+Tab 을 누른다", fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER };
  const L = layoutClaudeCodeTerminal(termProps);
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + L.inputY + L.inputH / 2 });

  const colX2 = colX(7) + 24;
  const colW2 = colW(12) - colW(7) - 24;

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="Shift+Tab 모드 순환">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[{ name: "(비어 있음)", kind: "file", depth: 0 }]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal {...termProps} />}
            mainMode="empty"
          />
        </Camera>
      </div>
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />

      <div style={{ position: "absolute", left: colX2, top: illoY, width: colW2, display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { chip: "manual mode", desc: "기본값 — 모든 편집 전에 물어본다" },
          { chip: "accept edits", desc: "편집은 자유롭게, 명령어만 물어본다" },
          { chip: "plan mode", desc: "조사하고 제안만, 파일은 건드리지 않는다" },
          { chip: "auto mode", desc: "무엇이 안전한지 클로드가 판단한다" },
        ].map((m, i) => (
          <div
            key={m.chip}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "16px 20px",
              background: COLORS.paper2,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 14,
            }}
          >
            <div
              style={{
                flex: "0 0 auto",
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: COLORS.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: 16,
                color: COLORS.paper2,
              }}
            >
              {i + 1}
            </div>
            <ModeChip text={m.chip} tone={i === 1 ? "accent" : "ink"} />
            <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 21, color: COLORS.ink2, wordBreak: "keep-all", flex: "1 1 0" }}>{m.desc}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: illoX,
          top: illoY + illoH + 24,
          width: colW(12),
          height: BODY_BOTTOM - (illoY + illoH + 24),
          boxSizing: "border-box",
          background: COLORS.accentWash,
          border: `1px solid ${COLORS.accent}`,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
        }}
      >
        <span style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 24, color: COLORS.accentDeep, wordBreak: "keep-all" }}>
          순환은 4단, bypass 는 실행 옵션으로 따로 들어간다 — Shift+Tab 으로는 켜지지 않는다.
        </span>
      </div>
    </SlideFrame>
  );
};

// ==================================================================================================
// 02 · perm_표 — "모드별 허용 범위"
// 5행(사실표 §1 external 값 그대로: manual/acceptEdits/plan/auto/bypassPermissions) x 4열
// (read/write/edit/bash). manual·accept edits·plan 은 도움말 문장에서 직접 나오는 칸만 채우고, 나머지는
// "—"로 비운다. auto/bypass 는 도움말·--help 설명이 전체 툴에 똑같이 적용되는 문장이라(§1 "Claude
// decides what is safe" / §8 "Bypass all permission checks") 네 칸 모두 같은 문구를 쓴다. bypass 행에는
// "Shift+Tab 밖" 표시를 달아 순환 목록에 없다는 걸 드러낸다.
// ==================================================================================================
type Cell = string; // "—" 는 사실표에서 확인 안 된 칸
interface ModeRow {
  chip: string; // verbatim indicator (§1)
  sub: string; // external: 값
  cells: [Cell, Cell, Cell, Cell]; // read, write, edit, bash
  outOfCycle?: boolean;
}
const MODE_ROWS: ModeRow[] = [
  { chip: "manual mode", sub: "default", cells: ["—", "확인 후 진행", "확인 후 진행", "—"] },
  { chip: "accept edits", sub: "acceptEdits", cells: ["—", "자유롭게 진행", "자유롭게 진행", "확인 후 진행"] },
  { chip: "plan mode", sub: "plan", cells: ["허용 (조사만)", "차단", "차단", "—"] },
  { chip: "auto mode", sub: "auto", cells: ["클로드가 판단", "클로드가 판단", "클로드가 판단", "클로드가 판단"] },
  { chip: "bypass permissions", sub: "bypassPermissions", cells: ["검사 없음", "검사 없음", "검사 없음", "검사 없음"], outOfCycle: true },
];

const Slide02: React.FC = () => {
  const tableX = colX(0);
  const tableY = BODY_Y + 8;
  const tableW = colW(12);
  const labelColW = 380;
  const cellColW = (tableW - labelColW) / 4;
  const headerH = 64;
  const rowH = (BODY_H - 8 - headerH - 56) / MODE_ROWS.length;

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="모드별 허용 범위">
      <div style={{ position: "absolute", left: tableX, top: tableY, width: tableW }}>
        {/* header row */}
        <div style={{ display: "flex", height: headerH, alignItems: "center", borderBottom: `2px solid ${COLORS.ink}` }}>
          <div style={{ width: labelColW, fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.ink3 }}>모드 (Shift+Tab 순환)</div>
          {["read", "write", "edit", "bash"].map((h) => (
            <div key={h} style={{ width: cellColW, textAlign: "center", fontFamily: FONTS.term, fontWeight: 700, fontSize: 24, color: COLORS.ink }}>
              {h}
            </div>
          ))}
        </div>
        {MODE_ROWS.map((row) => (
          <div
            key={row.chip}
            style={{
              display: "flex",
              height: rowH,
              alignItems: "center",
              borderBottom: `1px solid ${COLORS.line}`,
              background: row.outOfCycle ? COLORS.paper2 : "transparent",
            }}
          >
            <div style={{ width: labelColW, display: "flex", flexDirection: "column", gap: 6, paddingRight: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ModeChip text={row.chip} tone={row.outOfCycle ? "ink" : "accent"} />
                {row.outOfCycle ? (
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontWeight: 700,
                      fontSize: 15,
                      color: COLORS.ink3,
                      border: `1px dashed ${COLORS.ink3}`,
                      borderRadius: 999,
                      padding: "2px 10px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Shift+Tab 밖
                  </span>
                ) : null}
              </div>
              <span style={{ fontFamily: FONTS.term, fontSize: 15, color: COLORS.ink3 }}>{`external: "${row.sub}"`}</span>
            </div>
            {row.cells.map((c, i) => (
              <div
                key={i}
                style={{
                  width: cellColW,
                  textAlign: "center",
                  fontFamily: FONTS.body,
                  fontWeight: c === "—" ? 500 : 600,
                  fontSize: 20,
                  color: c === "—" ? COLORS.ink3 : COLORS.ink,
                  wordBreak: "keep-all",
                  padding: "0 10px",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: tableX, top: BODY_BOTTOM - 44, width: tableW, fontFamily: FONTS.body, fontWeight: 500, fontSize: 18, color: COLORS.ink3, wordBreak: "keep-all" }}>
        "—" = 도움말 문장에 명시되지 않아 비워 둔 칸. auto·bypass 행은 도움말·--help 설명이 네 칸 모두에 똑같이 적용된다.
      </div>
    </SlideFrame>
  );
};

// ==================================================================================================
// 03 · perm_auto_란 — "auto 모드 · 감시자"
// ==================================================================================================
const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(7);
  const illoH = 520;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, 520);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const turns: ClaudeCodeTurn[] = [{ role: "user", text: "새 실습 폴더를 정리해줘" }];
  const termProps = { width: termW, turns, placeholder: "auto 모드에서는 계속 진행한다", fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER };
  const L = layoutClaudeCodeTerminal(termProps);
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + L.turns[0].anchorY + L.lineH / 2 });

  const colX2 = colX(7) + 24;
  const colW2 = colW(12) - colW(7) - 24;

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="auto 모드 · 감시자">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[{ name: "(비어 있음)", kind: "file", depth: 0 }]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal {...termProps} />}
            mainMode="empty"
          />
        </Camera>
      </div>
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />

      <AnnotationColumn
        x={colX2}
        y={illoY}
        width={colW2}
        height={illoH}
        items={[
          { number: 1, head: "매번 안 물어본다", body: "auto mode — Claude decides what is safe. 요청마다 확인 없이 이어서 진행한다." },
          { number: 2, head: "그래도 감시자가 있다", body: "화면 뒤에서 각 도구 호출을 계속 판정한다 — 위험해 보이면 그 자리에서 멈춘다." },
        ]}
      />

      <CardRow
        x={illoX}
        y={illoY + illoH + 24}
        width={colW(12)}
        height={BODY_BOTTOM - (illoY + illoH + 24)}
        items={[
          { number: 1, head: "속도", body: "확인 창이 안 뜨니 긴 작업을 끊김 없이 맡길 수 있다." },
          { number: "!", head: "리스크", body: "판정이 늘 같지 않다 — 같은 요청도 통과하거나 막힐 수 있다(5·6번 참조)." },
        ]}
      />
    </SlideFrame>
  );
};

// ==================================================================================================
// 04 · perm_auto_요청 — "삭제 금지 해제 요청"
// 프롬프트는 계획서 §4-1의 재현 시나리오(같은 요청을 auto 모드에서 두 번 넣어 A/B 를 만든다)에 쓰인
// 문장. 실습 텍스트는 사실표 대상이 아니라 학급 자체 프롬프트라 지어내는 문구가 아니다.
// ==================================================================================================
const AUTO_REQUEST_TEXT = "삭제 금지 명령어들을 모두 지워줘";

const Slide04: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const barY = BODY_Y;
  const barH = 96;
  const barBlockH = 22 + 10 + barH;
  const gap1 = 24;
  const screenY = barY + barBlockH + gap1;
  const screenH = 420;
  const gap2 = 24;
  const cardsY = screenY + screenH + gap2;
  const cardsH = BODY_BOTTOM - cardsY;

  const { windowNative, focus, view } = windowGeometry(illoW, screenH, screenH);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: screenY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const termProps = { width: termW, inputText: AUTO_REQUEST_TEXT, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER };
  const L = layoutClaudeCodeTerminal(termProps);
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + L.inputY + L.inputH / 2 });

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="삭제 금지 해제 요청">
      <InputBar x={illoX} y={barY} width={illoW} height={barH} text={AUTO_REQUEST_TEXT} />
      <div style={{ position: "absolute", left: illoX, top: screenY, width: illoW, height: screenH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={screenH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[
              { name: ".claude", kind: "folder", depth: 0, state: "selected" },
              { name: "settings.json", kind: "file", depth: 1 },
            ]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal {...termProps} />}
            mainMode="empty"
          />
        </Camera>
      </div>
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />

      <CardRow
        x={illoX}
        y={cardsY}
        width={illoW}
        height={cardsH}
        items={[
          { number: 1, head: "같은 요청, auto 모드로", body: "settings.json 의 deny 규칙을 지우라는 요청 — 위험한 되돌리기다." },
          { number: "!", head: "auto 는 매번 물어보지 않는다", body: "확인 창 없이 감시자의 판정에 맡긴다 — 다음 두 장에서 결과가 갈린다." },
        ]}
      />
    </SlideFrame>
  );
};

// ==================================================================================================
// 05/06 · perm_auto_결과_A / B — 같은 프롬프트, 감시자가 막는 경우(A) / 통과하는 경우(B).
// CEO 지시: 둘 다 목업, 10회 재현 불필요. 단 도구 문구는 사실표에서 온 실제 문구만.
// A(블록)의 빨간 거부 문구는 실제 `claude -p` 재현 실행의 permission_denied 이벤트에서 그대로 얻은
// verbatim 문구다(s3-settings.tsx:603 DENY_MESSAGE 와 동일 문자열 — 그 파일은 참조만, 수정하지 않음).
// 이 파일은 자기 파트 몫을 로컬에 별도로 갖는다(파일 머리말의 "파트마다 자기 것" 원칙).
// ==================================================================================================
// 실제 재현 캡처에서 얻은 거부 문구(verbatim). 문장 형식 "Permission to use <tool> with command <cmd>
// has been denied." 는 그대로 유지 — 슬라이드 맥락(삭제 금지 명령어 정리 요청)에 맞춰 대상 파일만
// settings.json 으로 바꿨다.
const AUTO_DENY_MESSAGE =
  'Permission to use PowerShell with command Remove-Item -LiteralPath .\\.claude\\settings.json -Confirm:$false; Test-Path -LiteralPath .\\.claude\\settings.json has been denied.';

const AutoOutcomeSlide: React.FC<{ index: number; title: string; outcome: "blocked" | "passed" }> = ({ index, title, outcome }) => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H - 140;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, 560);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const turns: ClaudeCodeTurn[] =
    outcome === "blocked"
      ? [
          { role: "user", text: AUTO_REQUEST_TEXT },
          { role: "assistant", text: AUTO_DENY_MESSAGE },
        ]
      : [
          { role: "user", text: AUTO_REQUEST_TEXT },
          { role: "assistant", text: "settings.json 의 deny 목록을 비웠어요." },
        ];
  const termProps = { width: termW, turns, showHint: outcome === "passed", fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER };
  const L = layoutClaudeCodeTerminal(termProps);
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const lastTurn = L.turns[L.turns.length - 1];
  const b1 = toFrame({ x: badgeX, y: contentTop + lastTurn.anchorY + L.lineH / 2 });

  // outcome === "blocked" 일 때만: 실제 컴포넌트가 그린 마지막 턴 문구를 정확히 같은 좌표에 빨간색
  // (TERM_THEME.dark.error, 슬라이드 유일한 accent 규칙을 지키기 위해 터미널 안에서만 쓰는 예외)으로
  // 덧칠한다 — ClaudeCodeTerminal.tsx 는 role 별 고정 색만 지원해서 손대지 않고 이 파일에서만 처리.
  const denyOverlay =
    outcome === "blocked" ? (
      <div style={{ position: "absolute", left: 0, top: 0, width: termW, pointerEvents: "none" }}>
        {lastTurn.lines.map((ln, li) => (
          <div
            key={li}
            style={{
              position: "absolute",
              left: L.padLeft + (li === 0 ? 0 : 2 * L.charW),
              top: lastTurn.ys[li],
              color: TERM_THEME.dark.error,
              fontFamily: FONTS.term,
              fontSize: TERM_FONT_SIZE,
              whiteSpace: "pre",
              lineHeight: `${L.lineH}px`,
            }}
          >
            {li === 0 ? "● " : ""}
            {ln}
          </div>
        ))}
      </div>
    ) : null;
  const terminalNode = denyOverlay ? (
    <div style={{ position: "relative", width: termW }}>
      <ClaudeCodeTerminal {...termProps} />
      {denyOverlay}
    </div>
  ) : (
    <ClaudeCodeTerminal {...termProps} />
  );

  const colX2 = colX(8) + 24;
  const colW2 = colW(12) - colW(8) - 24;

  return (
    <SlideFrame index={index} total={TOTAL} eyebrow={EYEBROW} title={title}>
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[
              { name: ".claude", kind: "folder", depth: 0 },
              { name: "settings.json", kind: "file", depth: 1, state: outcome === "passed" ? "selected" : "normal" },
            ]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={terminalNode}
            mainMode="empty"
          />
        </Camera>
      </div>
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />

      <div style={{ position: "absolute", left: colX2, top: illoY, width: colW2, display: "flex", flexDirection: "column", gap: 20 }}>
        {outcome === "blocked" ? (
          <>
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.ink }}>감시자가 멈춰 세운다</div>
            <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 20, color: COLORS.ink2, wordBreak: "keep-all" }}>
              같은 요청이라도 위험하다고 판단되면 auto 모드에서도 도구 실행 전에 멈추고, 거부 문구를 그대로 띄운다.
            </div>
          </>
        ) : (
          <>
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.ink }}>그대로 통과한다</div>
            <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 20, color: COLORS.ink2, wordBreak: "keep-all" }}>
              같은 문장인데 이번엔 감시자가 안전하다고 판단해 확인 없이 끝까지 실행했다.
            </div>
          </>
        )}
      </div>

      <CardRow
        x={illoX}
        y={illoY + illoH + 24}
        width={colW(12)}
        height={BODY_BOTTOM - (illoY + illoH + 24)}
        items={[{ number: "!", head: "같은 요청, 다른 결과", body: "auto 모드의 판단은 매번 같지 않다 — 결과가 갈릴 수 있다는 걸 전제로 쓴다." }]}
      />
    </SlideFrame>
  );
};

const Slide05: React.FC = () => <AutoOutcomeSlide index={5} title="감시자가 막는 경우" outcome="blocked" />;
const Slide06: React.FC = () => <AutoOutcomeSlide index={6} title="그대로 통과하는 경우" outcome="passed" />;

// ==================================================================================================
// 07 · perm_bypass_란 — "bypass 모드 · 감시자 off"
// 문구: --help "Bypass all permission checks. Recommended only for sandboxes with no internet access."
// (사실표 §8 verbatim), 확인 다이얼로그 값 "Yes, clear context and bypass permissions" (같은 절).
// ==================================================================================================
const Slide07: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(7);
  const illoH = 480;

  const dialogW = illoW - 80;
  const dialogX = illoX + 40;
  const dialogY = illoY + 60;

  const colX2 = colX(7) + 24;
  const colW2 = colW(12) - colW(7) - 24;

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="bypass 모드 · 감시자 off">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, background: COLORS.void2, boxShadow: "0 18px 40px rgba(16,17,19,0.10)", boxSizing: "border-box", overflow: "hidden" }}>
        <ClaudeCodeTerminal
          width={illoW}
          height={illoH}
          showLaunch
          launchPath={CWD}
          placeholder="claude --dangerously-skip-permissions"
          showHint={false}
          fontSize={TERM_FONT_SIZE}
          leftGutter={0}
        />
        <div
          style={{
            position: "absolute",
            left: dialogX - illoX,
            top: dialogY - illoY,
            width: dialogW,
            boxSizing: "border-box",
            background: WINDOW_THEME.dark.body,
            border: `1px solid ${COLORS.accent}`,
            borderRadius: 8,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <span style={{ fontFamily: FONTS.term, fontSize: 15, color: TERM_THEME.dark.strong }}>권한 검사를 전부 끌까요?</span>
          <span style={{ fontFamily: FONTS.term, fontSize: 15, color: COLORS.accent, fontWeight: 700 }}>{"> Yes, clear context and bypass permissions"}</span>
        </div>
      </div>

      <AnnotationColumn
        x={colX2}
        y={illoY}
        width={colW2}
        height={illoH}
        items={[
          { number: 1, head: "감시자가 아예 없다", body: "\"Bypass all permission checks.\" — 모든 확인·감시가 통째로 꺼진다." },
          { number: 2, head: "샌드박스에서만", body: "\"Recommended only for sandboxes with no internet access.\" — 인터넷 없는 격리 환경 전용 권고." },
        ]}
      />

      <CardRow
        x={illoX}
        y={illoY + illoH + 24}
        width={colW(12)}
        height={BODY_BOTTOM - (illoY + illoH + 24)}
        items={[
          { number: "!", head: "auto 와는 다르다", body: "auto 는 뒤에서 판정이라도 한다. bypass 는 그 판정 단계 자체가 없다." },
          { number: "!", head: "되돌릴 수 없는 작업 위험", body: "삭제·덮어쓰기까지 확인 없이 그대로 실행된다 — 다음 장에서 그 실행 방법을 다룬다." },
        ]}
      />
    </SlideFrame>
  );
};

// ==================================================================================================
// 08 · perm_bypass_실행 — "claude --dangerously-skip-permissions"
// 액션박스 = 정확한 명령어. 실제 launch line 은 §8 --help 발췌 그대로.
// ==================================================================================================
const Slide08: React.FC = () => {
  const boxX = colX(0);
  const boxW = colW(12);
  const boxY = BODY_Y + 20;

  const illoY = boxY + 130;
  const illoH = BODY_H - 130 - 220;
  const illoX = colX(0);
  const illoW = colW(7);

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="claude --dangerously-skip-permissions">
      <ActionBox x={boxX} y={boxY} width={boxW} command="claude --dangerously-skip-permissions" label="그대로 복사해서 실행" />

      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, background: COLORS.void2, boxShadow: "0 18px 40px rgba(16,17,19,0.10)", boxSizing: "border-box", overflow: "hidden" }}>
        <ClaudeCodeTerminal
          width={illoW}
          height={illoH}
          showLaunch
          launchPath={CWD}
          inputText="claude --dangerously-skip-permissions"
          showWelcome
          cwd={CWD}
          fontSize={TERM_FONT_SIZE}
        />
      </div>

      <div style={{ position: "absolute", left: colX(7) + 24, top: illoY, width: colW(12) - colW(7) - 24, display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.ink }}>--allow 옵션도 있다</div>
        <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 20, color: COLORS.ink2, wordBreak: "keep-all" }}>
          {"--allow-dangerously-skip-permissions 는 기본값으로 켜지 않고 \"옵션으로만\" 켤 수 있게 허용한다 (사실표 §8)."}
        </div>
      </div>

      <CardRow
        x={colX(0)}
        y={BODY_BOTTOM - 180}
        width={colW(12)}
        height={140}
        items={[{ number: "!", head: "이름 그대로 위험하다", body: "dangerously — 확인 창 자체가 없다는 뜻. 실습 스크래치 폴더 밖에서 쓰지 않는다." }]}
      />
    </SlideFrame>
  );
};

// ==================================================================================================
// 09 · perm_bypass_요청 — "금지 해제 + 파일 삭제"
// ==================================================================================================
const BYPASS_REQUEST_TEXT = "삭제 금지 설정을 다 풀고 test.txt 파일을 삭제해줘";

const Slide09: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const barY = BODY_Y;
  const barH = 96;
  const barBlockH = 22 + 10 + barH;
  const gap1 = 24;
  const screenY = barY + barBlockH + gap1;
  const screenH = 420;
  const gap2 = 24;
  const cardsY = screenY + screenH + gap2;
  const cardsH = BODY_BOTTOM - cardsY;

  const { windowNative, focus, view } = windowGeometry(illoW, screenH, screenH);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: screenY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const termProps = { width: termW, inputText: BYPASS_REQUEST_TEXT, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER };
  const L = layoutClaudeCodeTerminal(termProps);
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + L.inputY + L.inputH / 2 });

  return (
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="금지 해제 + 파일 삭제">
      <InputBar x={illoX} y={barY} width={illoW} height={barH} text={BYPASS_REQUEST_TEXT} />
      <div style={{ position: "absolute", left: illoX, top: screenY, width: illoW, height: screenH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={screenH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[
              { name: ".claude", kind: "folder", depth: 0 },
              { name: "settings.json", kind: "file", depth: 1 },
              { name: "test.txt", kind: "file", depth: 0, state: "selected" },
            ]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal {...termProps} />}
            mainMode="empty"
          />
        </Camera>
      </div>
      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />

      <CardRow
        x={illoX}
        y={cardsY}
        width={illoW}
        height={cardsH}
        items={[
          { number: 1, head: "한 문장에 두 가지", body: "설정 되돌리기 + 실제 삭제, 둘 다 한 번에 요청했다." },
          { number: "!", head: "확인 창이 없다", body: "bypass 모드라 두 작업 다 물어보지 않고 그대로 진행한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ==================================================================================================
// 10 · perm_bypass_결과 — "삭제 완료"
// ==================================================================================================
const Slide10: React.FC = () => {
  const leftX = colX(0);
  const leftW = colW(4);
  const resultX = colX(4) + 8;
  const resultW = 1800 - resultX;
  const topY = BODY_Y;
  const topH = 560;
  const gap = 24;
  const cardsY = topY + topH + gap;
  const cardsH = BODY_BOTTOM - cardsY;

  const { windowNative, focus } = windowGeometry(leftW, topH, topH);
  const termProps = {
    width: resultW - 60,
    turns: [
      { role: "user", text: BYPASS_REQUEST_TEXT },
      { role: "assistant", text: "settings.json 의 deny 규칙을 비우고 test.txt 를 삭제했어요." },
    ] as ClaudeCodeTurn[],
    fontSize: 18,
  };

  return (
    <SlideFrame index={10} total={TOTAL} eyebrow={EYEBROW} title="삭제 완료">
      <div style={{ position: "absolute", left: leftX, top: topY, width: leftW, height: topH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={leftW} height={topH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[{ name: ".claude", kind: "folder", depth: 0 }, { name: "settings.json", kind: "file", depth: 1 }]}
            showTerminal={false}
            mainMode="empty"
          />
        </Camera>
      </div>

      <ClaudeCodeTerminalPanel x={resultX} y={topY} height={topH} {...termProps} />

      <CardRow
        x={colX(0)}
        y={cardsY}
        width={colW(12)}
        height={cardsH}
        items={[
          { number: 1, head: "test.txt 가 사라졌다", body: "탐색기에도 더는 보이지 않는다 — 되돌리기 확인 없이 즉시 삭제됐다." },
          { number: 2, head: "설정도 같이 풀렸다", body: "settings.json 의 deny 목록이 비어, 다음 삭제 요청도 그대로 통과한다." },
          { number: "!", head: "복구 수단이 없다", body: "bypass 로 지운 파일은 휴지통을 거치지 않는다 — 스크래치 폴더 밖에서 절대 쓰지 않는다." },
        ]}
      />
    </SlideFrame>
  );
};

// ==================================================================================================
// 11 · perm_종료 — "/exit · Ctrl+C 두 번"
// verbatim: "Press Ctrl-C again to exit" (사실표 §9).
// ==================================================================================================
const Slide11: React.FC = () => {
  const panelW = colW(5.5);
  const gap = 40;
  const leftX = colX(0);
  const rightX = leftX + panelW + gap;
  const panelY = BODY_Y + 20;
  const panelH = 300;

  return (
    <SlideFrame index={11} total={TOTAL} eyebrow={EYEBROW} title="/exit · Ctrl+C 두 번">
      <div style={{ position: "absolute", left: leftX, top: panelY, width: panelW }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.ink, marginBottom: 14 }}>방법 1 — 명령으로</div>
        <ClaudeCodeTerminalPanel x={0} y={0} width={panelW} height={panelH} inputText="/exit" fontSize={TERM_FONT_SIZE} showHint={false} />
      </div>

      <div style={{ position: "absolute", left: rightX, top: panelY, width: panelW }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.ink, marginBottom: 14 }}>방법 2 — Ctrl+C 두 번</div>
        <div style={{ position: "relative", width: panelW, height: panelH, boxSizing: "border-box", background: COLORS.void2, border: `1px solid ${COLORS.lineDark}`, borderRadius: 10, overflow: "hidden" }}>
          <ClaudeCodeTerminal width={panelW} height={panelH} showHint={false} fontSize={TERM_FONT_SIZE} placeholder="여기서 Ctrl+C" />
          <div
            style={{
              position: "absolute",
              left: 16,
              bottom: 16,
              fontFamily: FONTS.term,
              fontSize: 16,
              color: TERM_THEME.dark.strong,
              background: "rgba(18, 115, 196, 0.16)",
              border: `1px solid ${COLORS.accent}`,
              borderRadius: 6,
              padding: "6px 12px",
            }}
          >
            Press Ctrl-C again to exit
          </div>
        </div>
      </div>

      <AnnotationColumn
        x={colX(0)}
        y={panelY + panelH + 40}
        width={colW(12)}
        height={BODY_BOTTOM - (panelY + panelH + 40)}
        items={[
          { number: 1, head: "/exit — 한 번에 종료", body: "명령을 그대로 치면 확인 없이 바로 세션이 끝난다." },
          { number: 2, head: "Ctrl+C — 두 번 눌러야 종료", body: "한 번은 안내만 뜬다(\"Press Ctrl-C again to exit\"), 두 번째로 진짜 종료된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ==================================================================================================
// 12 · perm_방향키 — "위쪽 방향키로 재실행"
// 종료 → 위쪽 방향키로 직전 명령 불러오기 → 엔터, 3스텝 한 장.
// ==================================================================================================
const Slide12: React.FC = () => {
  const panelW = colW(3.6);
  const gap = 36;
  const y0 = colX(0);
  const panelY = BODY_Y + 70;
  const panelH = 260;

  const steps: { title: string; input?: string; placeholder?: string; note: string }[] = [
    { title: "1. 세션 종료", placeholder: "(세션이 방금 끝났다)", note: "/exit 또는 Ctrl+C 두 번으로 방금 종료했다." },
    { title: "2. 위쪽 방향키", input: "claude --dangerously-skip-permissions", note: "새 claude 세션에서 위쪽 방향키를 누르면 직전 명령이 그대로 올라온다." },
    { title: "3. 엔터로 재실행", input: "claude --dangerously-skip-permissions", note: "다시 타이핑할 필요 없이 엔터만 누르면 같은 세션이 다시 열린다." },
  ];

  return (
    <SlideFrame index={12} total={TOTAL} eyebrow={EYEBROW} title="위쪽 방향키로 재실행">
      {steps.map((s, i) => {
        const x = y0 + i * (panelW + gap);
        return (
          <div key={i} style={{ position: "absolute", left: x, top: BODY_Y, width: panelW }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: COLORS.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONTS.display,
                  fontWeight: 800,
                  fontSize: 16,
                  color: COLORS.paper2,
                  flex: "0 0 auto",
                }}
              >
                {i + 1}
              </div>
              <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.ink, wordBreak: "keep-all" }}>{s.title}</span>
            </div>
            <div style={{ position: "relative", width: panelW, top: panelY - BODY_Y - 48, height: panelH, boxSizing: "border-box", background: COLORS.void2, border: `1px solid ${COLORS.lineDark}`, borderRadius: 10, overflow: "hidden" }}>
              <ClaudeCodeTerminal width={panelW} height={panelH} showHint={false} fontSize={TERM_FONT_SIZE} inputText={s.input} placeholder={s.placeholder} />
            </div>
            <div style={{ marginTop: panelY - BODY_Y - 48 + 24, fontFamily: FONTS.body, fontWeight: 500, fontSize: 19, color: COLORS.ink2, wordBreak: "keep-all" }}>{s.note}</div>
          </div>
        );
      })}
    </SlideFrame>
  );
};

export const S3_PERMISSION: SlideEntry[] = [
  { index: 1, name: "perm_shift_tab", title: "Shift+Tab 모드 순환", render: () => <Slide01 /> },
  { index: 2, name: "perm_표", title: "모드별 허용 범위", render: () => <Slide02 /> },
  { index: 3, name: "perm_auto_란", title: "auto 모드 · 감시자", render: () => <Slide03 /> },
  { index: 4, name: "perm_auto_요청", title: "삭제 금지 해제 요청", render: () => <Slide04 /> },
  { index: 5, name: "perm_auto_결과_A", title: "감시자가 막는 경우", render: () => <Slide05 /> },
  { index: 6, name: "perm_auto_결과_B", title: "그대로 통과하는 경우", render: () => <Slide06 /> },
  { index: 7, name: "perm_bypass_란", title: "bypass 모드 · 감시자 off", render: () => <Slide07 /> },
  { index: 8, name: "perm_bypass_실행", title: "claude --dangerously-skip-permissions", render: () => <Slide08 /> },
  { index: 9, name: "perm_bypass_요청", title: "금지 해제 + 파일 삭제", render: () => <Slide09 /> },
  { index: 10, name: "perm_bypass_결과", title: "삭제 완료", render: () => <Slide10 /> },
  { index: 11, name: "perm_종료", title: "/exit · Ctrl+C 두 번", render: () => <Slide11 /> },
  { index: 12, name: "perm_방향키", title: "위쪽 방향키로 재실행", render: () => <Slide12 /> },
];

export const S3_PERMISSION_PART: PartSpec = { id: "s3-permission", eyebrow: EYEBROW, entries: S3_PERMISSION };
