// s3-config — basic 3회차 (step03) 파트. 계획서: courses/basic/step03-redesign-plan.md
// 이 파일은 이 파트의 슬라이드만 소유한다. registry.ts 는 이미 등록되어 있으므로 건드리지 않는다.
//
// 화면 문구 출처: tools/step03-cli-facts.md (2.1.273 바이너리에서 뽑은 사실표) — 이 파일에서 verbatim 으로
// 옮긴 것은 전부 그 문서의 2절(/config 행)·3절(/status 행)·4절(/usage 라벨) 인용이다. NOT FOUND 로 적힌
// 것(예: /login 화면 문구)은 지어내지 않고 CapturePendingBox 자리표시자로 남긴다(status_login).
// /status 의 Organization·Email 은 계정별 값이라 실제 CEO 계정 대신 더미(Example Org / student@example.com)
// 로 채우고 "예시" 배지를 붙였다. /usage 의 숫자·퍼센트는 전부 비워 두었다(지어내지 않음).
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { Camera, cameraView } from "../core/Camera";
import { Glyph } from "../core/glyphs";
import { COLORS, FONTS, RADIUS, TERM_THEME } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "/CONFIG";
const TOTAL = 6;

const WINDOW_HEADER_H = 34; // AppWindow native title bar height (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane tab-bar height.

// ------------------------------------------------------------------------------------------------
// Local helpers (same math as s2-write.tsx / s3-settings.tsx — each part owns its own copy).
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

// Local horizontal card row (s2-write.tsx CardRow pattern, copied per the worker guide).
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
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 24, lineHeight: 1.25, color: COLORS.ink, wordBreak: "keep-all" }}>{it.head}</div>
          </div>
          {it.body ? <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 19, lineHeight: 1.4, color: COLORS.ink2, wordBreak: "keep-all" }}>{it.body}</div> : null}
        </div>
      ))}
    </div>
  );
};

// Standard 9+3 split for the one capture-pending slide (s1-claude-login.tsx / s3-account.tsx pattern).
const CAP_X = colX(0);
const CAP_W = colW(9);
const ANNO9_X = colX(9);
const ANNO9_W = colW(3);

// ------------------------------------------------------------------------------------------------
// CapturePendingBox — local copy of s3-account.tsx's placeholder for a screen whose real text/UI is
// NOT FOUND in tools/step03-cli-facts.md (here: the /login account-picker screen, item 9's own note).
// ------------------------------------------------------------------------------------------------
const CameraGlyph: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 8.4C3 7.6 3.6 7 4.4 7H8L9.4 5H14.6L16 7H19.6C20.4 7 21 7.6 21 8.4V17.6C21 18.4 20.4 19 19.6 19H4.4C3.6 19 3 18.4 3 17.6Z" stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
    <circle cx="12" cy="13" r="4" stroke={color} strokeWidth={1.7} />
    <circle cx="17.3" cy="9.7" r="0.9" fill={color} />
  </svg>
);

const CapturePendingBox: React.FC<{ x: number; y: number; width: number; height: number; url: string; capture: string }> = ({ x, y, width, height, url, capture }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      boxSizing: "border-box",
      border: `2.5px dashed ${COLORS.line}`,
      borderRadius: RADIUS.outer,
      background: COLORS.paper2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 26,
      padding: "40px 56px",
    }}
  >
    <div style={{ width: 92, height: 92, borderRadius: "50%", background: COLORS.accentWash, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CameraGlyph size={44} color={COLORS.accentDeep} />
    </div>
    <div
      style={{
        fontFamily: FONTS.term,
        fontWeight: 600,
        fontSize: 22,
        color: COLORS.accentDeep,
        background: COLORS.accentWash,
        border: `1px solid ${COLORS.accent}`,
        borderRadius: RADIUS.inner,
        padding: "9px 22px",
        wordBreak: "break-all",
        textAlign: "center",
        maxWidth: "92%",
      }}
    >
      {url}
    </div>
    <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 27, color: COLORS.ink2, textAlign: "center", wordBreak: "keep-all", maxWidth: "88%" }}>{capture}</div>
    <div style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 19, color: COLORS.ink3, letterSpacing: "0.14em" }}>CAPTURE PENDING</div>
  </div>
);

// ------------------------------------------------------------------------------------------------
// RowListPanel — a dark, D2Coding label/value list mocking what appears inside the VS Code integrated
// terminal after /config, /status or /usage (Ink TUI screens — not the turn-based ClaudeCodeTerminal
// conversation, so this local panel plugs into VSCodeScreen's own terminalContent slot exactly the way
// s3-settings.tsx's raw terminalLines plug into the same slot for /clear and the permission-denied text
// — the shared VS Code + terminal chrome stays the one source of "what a Claude Code screen looks like").
// Rows beyond the panel height clip naturally (overflow hidden) — the real "위에서부터 잘린" effect the
// plan calls for when a panel has more rows than fit — and a bottom fade + down-chevron signal there is
// more to scroll to.
// ------------------------------------------------------------------------------------------------
interface PanelRow {
  id: string;
  label: React.ReactNode;
  value?: string;
  badge?: string;
  hint?: string; // verbatim optionsHint text shown under a highlighted row, like the real panel does
  highlight?: boolean;
  editing?: string; // shows an accent input box with this text (+ caret) instead of the value
}

const ROW_H = 34;
const HINT_H = 24;

function layoutRowsAt(rows: PanelRow[], topPad: number) {
  let acc = topPad;
  return rows.map((r) => {
    const h = ROW_H + (r.hint ? HINT_H : 0);
    const top = acc;
    acc += h;
    return { top, h, center: top + ROW_H / 2 };
  });
}

function rowListLayout(rows: PanelRow[], height: number, center: boolean) {
  const raw = layoutRowsAt(rows, 0);
  const listH = (raw.length ? raw[raw.length - 1].top + raw[raw.length - 1].h : 0) + 12;
  const clipped = listH > height;
  const topPad = center && !clipped ? Math.max(6, (height - listH) / 2) : 6;
  return { rowsLayout: layoutRowsAt(rows, topPad), clipped };
}

const RowListPanel: React.FC<{ width: number; height: number; rows: PanelRow[]; fontSize?: number; center?: boolean }> = ({ width, height, rows, fontSize = 15, center = false }) => {
  const { rowsLayout, clipped } = rowListLayout(rows, height, center);
  return (
    <div style={{ position: "relative", width, height, overflow: "hidden", fontFamily: FONTS.term, fontSize, boxSizing: "border-box" }}>
      {rows.map((r, i) => {
        const { top, h } = rowsLayout[i];
        return (
          <div
            key={r.id}
            style={{
              position: "absolute",
              left: 0,
              top,
              width,
              height: h,
              boxSizing: "border-box",
              borderLeft: r.highlight ? `3px solid ${COLORS.accent}` : "3px solid transparent",
              background: r.highlight ? "rgba(18, 115, 196, 0.14)" : "transparent",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "0 18px",
            }}
          >
            <div style={{ height: ROW_H, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <span style={{ color: r.highlight ? TERM_THEME.dark.strong : TERM_THEME.dark.text, fontWeight: r.highlight ? 700 : 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.label}</span>
              <span style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 8 }}>
                {r.badge ? (
                  <span style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: Math.round(fontSize * 0.68), color: COLORS.accent, border: `1px solid ${COLORS.accent}`, borderRadius: 999, padding: "1px 9px", background: "rgba(18, 115, 196, 0.14)" }}>
                    {r.badge}
                  </span>
                ) : null}
                {r.editing !== undefined ? (
                  <span style={{ display: "inline-flex", alignItems: "center", background: TERM_THEME.dark.ground, border: `1px solid ${COLORS.accent}`, borderRadius: 4, padding: "3px 10px", boxShadow: "0 0 0 3px rgba(18, 115, 196, 0.28)" }}>
                    <span style={{ color: TERM_THEME.dark.strong }}>{r.editing}</span>
                    <span style={{ display: "inline-block", width: 2, height: Math.round(fontSize * 1.1), background: TERM_THEME.dark.caret, marginLeft: 3 }} />
                  </span>
                ) : (
                  <span style={{ color: r.value ? TERM_THEME.dark.args : TERM_THEME.dark.dim }}>{r.value ?? "—"}</span>
                )}
              </span>
            </div>
            {r.hint ? (
              <div style={{ height: HINT_H, display: "flex", alignItems: "center", fontFamily: FONTS.body, fontStyle: "italic", fontWeight: 500, fontSize: Math.round(fontSize * 0.78), color: TERM_THEME.dark.dim, wordBreak: "break-word" }}>
                {r.hint}
              </div>
            ) : null}
          </div>
        );
      })}
      {clipped ? (
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 46, background: `linear-gradient(to bottom, transparent, ${COLORS.void2})`, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4 }}>
          <Glyph name="down" size={16} color={TERM_THEME.dark.dim} />
        </div>
      ) : null}
    </div>
  );
};

// A VSCodeScreen (right-layout) with a RowListPanel as its terminal content — the shared frame for every
// /config · /status · /usage slide in this part. Returns spotForRow(i) for FocusBadge placement.
function panelIllo(opts: { x: number; y: number; w: number; h: number; windowH: number; rows: PanelRow[]; explorerNodes?: ExplorerNode[]; center?: boolean }) {
  const { x, y, w, h, windowH, rows, explorerNodes = [], center = false } = opts;
  const { windowNative, focus, view } = windowGeometry(w, h, windowH);
  const termW = rightTermWidth(windowNative);
  const contentH = windowNative.h - WINDOW_HEADER_H - TERM_TAB_H;
  const toFrame = (p: { x: number; y: number }) => ({ x: x + view.tx + p.x * view.s, y: y + view.ty + p.y * view.s });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const { rowsLayout, clipped } = rowListLayout(rows, contentH, center);
  const spotForRow = (i: number) => toFrame({ x: paneLeft + 20, y: contentTop + rowsLayout[i].center });
  const spotForScrollHint = () => toFrame({ x: paneLeft + termW / 2, y: contentTop + contentH - 16 });

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
          terminalContent={<RowListPanel width={termW} height={contentH} rows={rows} center={center} />}
          mainMode="empty"
        />
      </Camera>
    </div>
  );
  return { node, spotForRow, spotForScrollHint, clipped };
}

// ------------------------------------------------------------------------------------------------
// Row data — verbatim label strings, sheet order (tools/step03-cli-facts.md §2, the /config row array).
// ------------------------------------------------------------------------------------------------
const LEFT_ARROW_LABEL = (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
    <Glyph name="left" size={13} color={TERM_THEME.dark.dim} />
    <span>opens agents</span>
  </span>
);

const CONFIG_ROWS: PanelRow[] = [
  { id: "autoUpdatesChannel", label: "Auto-update channel" },
  { id: "theme", label: "Theme" },
  { id: "notifChannel", label: "Notifications" },
  { id: "inputNeededNotifEnabled", label: "Push when actions required" },
  { id: "agentPushNotifEnabled", label: "Push when Claude decides" },
  { id: "outputStyle", label: "Output style" },
  { id: "defaultView", label: "Default view" },
  { id: "language", label: "Language", value: "Default (English)" },
  { id: "editor", label: "Editor mode" },
  { id: "askUserQuestionTimeout", label: "Question auto-continue timeout" },
  { id: "modelProposedGoals", label: "Claude-proposed goals" },
  { id: "externalEditorContext", label: "Show last response in external editor" },
  { id: "prStatus", label: "Show PR status footer" },
  { id: "model", label: "Model", value: "Default (recommended)" },
  { id: "diffTool", label: "Diff tool" },
  { id: "autoConnectIde", label: "Auto-connect to IDE (external terminal)" },
  { id: "useAutoModeDuringPlan", label: "Use auto mode during plan" },
  { id: "gitignore", label: "Respect .gitignore in file picker" },
  { id: "copyFullResponse", label: "Skip the /copy picker" },
  { id: "copyOnSelect", label: "Copy on select" },
  { id: "autoScroll", label: "Auto-scroll" },
  { id: "agentsView", label: "Agents view" },
  { id: "defaultToAgentsView", label: "Open agents view by default" },
  { id: "leftArrowOpensAgents", label: LEFT_ARROW_LABEL },
  { id: "recap", label: "Session recap" },
];
const LANGUAGE_ROW_INDEX = CONFIG_ROWS.findIndex((r) => r.id === "language");

// Full-width split for the 4 "screen on top, cards below" slides (s2-write.tsx TOP_H/CARDS_Y pattern).
const TOP_H = 512;
const ROW_GAP = 28;
const CARDS_Y = BODY_Y + TOP_H + ROW_GAP; // 790
const CARDS_H = BODY_BOTTOM - CARDS_Y; // 210
const SPLIT_WINDOW_H = 480;

// ------------------------------------------------------------------------------------------------
// 01 · config_란 — "/config"
// ------------------------------------------------------------------------------------------------
const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const p = panelIllo({ x: illoX, y: BODY_Y, w: illoW, h: TOP_H, windowH: SPLIT_WINDOW_H, rows: CONFIG_ROWS });
  const b1 = p.spotForRow(0);
  const b2 = p.spotForScrollHint();

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="/config">
      {p.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      {p.clipped ? <FocusBadge number={2} x={b2.x} y={b2.y} size={30} /> : null}
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "/config 로 진입", body: "터미널에 /config 라고 입력하면 이 설정 패널이 뜬다." },
          { number: 2, head: "스크롤해서 더 보기", body: "한 화면에 다 안 들어가서 아래로 내려야 나머지 항목이 보인다." },
          { number: "!", head: "테마·알림·모델처럼 자주 바꾸는 항목", body: "전부 이 패널 안에 모여 있다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · config_항목표 — "설정 항목 한눈에" (CEO 지시: 기존 (1/2)·(2/2) 두 장을 한 장 표로 합친다)
// ------------------------------------------------------------------------------------------------
interface SpecRow {
  id: string;
  label: string;
  kind: string; // Korean gloss of the sheet's type field (managedEnum/enum -> 선택, boolean -> ON/OFF)
  value?: string; // only a confirmed literal value — everything else stays blank
}

const SPEC_ROWS: SpecRow[] = CONFIG_ROWS.map((r) => {
  const kindById: Record<string, string> = {
    autoUpdatesChannel: "선택",
    theme: "선택",
    notifChannel: "선택",
    inputNeededNotifEnabled: "ON/OFF",
    agentPushNotifEnabled: "ON/OFF",
    outputStyle: "선택",
    defaultView: "선택",
    language: "선택",
    editor: "선택",
    askUserQuestionTimeout: "선택",
    modelProposedGoals: "선택",
    externalEditorContext: "ON/OFF",
    prStatus: "ON/OFF",
    model: "선택",
    diffTool: "선택",
    autoConnectIde: "ON/OFF",
    useAutoModeDuringPlan: "ON/OFF",
    gitignore: "ON/OFF",
    copyFullResponse: "ON/OFF",
    copyOnSelect: "ON/OFF",
    autoScroll: "ON/OFF",
    agentsView: "선택",
    defaultToAgentsView: "ON/OFF",
    leftArrowOpensAgents: "ON/OFF",
    recap: "ON/OFF",
  };
  const labelText: Record<string, string> = { leftArrowOpensAgents: "← opens agents" };
  return { id: r.id, label: labelText[r.id] ?? (r.label as string), kind: kindById[r.id], value: r.value };
});

const SpecTable: React.FC<{ x: number; y: number; width: number; height: number; rows: SpecRow[] }> = ({ x, y, width, height, rows }) => {
  const headerH = 56;
  const rowH = (height - headerH) / rows.length;
  return (
    <div style={{ position: "absolute", left: x, top: y, width, height, boxSizing: "border-box", background: COLORS.paper2, border: `1px solid ${COLORS.line}`, borderRadius: RADIUS.base, overflow: "hidden" }}>
      <div style={{ height: headerH, boxSizing: "border-box", display: "flex", alignItems: "center", padding: "0 24px", gap: 16, background: COLORS.ink }}>
        <span style={{ flex: "1 1 auto", fontFamily: FONTS.display, fontWeight: 800, fontSize: 18, color: COLORS.paper2 }}>설정 항목</span>
        <span style={{ flex: "0 0 92px", fontFamily: FONTS.display, fontWeight: 700, fontSize: 15, color: COLORS.paper2, textAlign: "center" }}>종류</span>
        <span style={{ flex: "0 0 200px", fontFamily: FONTS.term, fontWeight: 700, fontSize: 15, color: COLORS.paper2, textAlign: "right" }}>값</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.id}
          style={{
            height: rowH,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            gap: 16,
            borderBottom: i < rows.length - 1 ? `1px solid ${COLORS.line}` : "none",
            background: i % 2 === 1 ? COLORS.paper : COLORS.paper2,
          }}
        >
          <span style={{ flex: "1 1 auto", fontFamily: FONTS.body, fontWeight: 600, fontSize: 16, color: COLORS.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.label}</span>
          <span style={{ flex: "0 0 92px", fontFamily: FONTS.body, fontWeight: 600, fontSize: 13, color: COLORS.ink3, textAlign: "center" }}>{r.kind}</span>
          <span style={{ flex: "0 0 200px", fontFamily: FONTS.term, fontWeight: 600, fontSize: 14, color: r.value ? COLORS.accentDeep : COLORS.ink3, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {r.value ?? "—"}
          </span>
        </div>
      ))}
    </div>
  );
};

const Slide02: React.FC = () => {
  const half = Math.ceil(SPEC_ROWS.length / 2);
  const left = SPEC_ROWS.slice(0, half);
  const right = SPEC_ROWS.slice(half);
  const gap = 32;
  const colWpx = (colW(12) - gap) / 2;
  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="설정 항목 한눈에">
      <SpecTable x={colX(0)} y={BODY_Y} width={colWpx} height={BODY_H} rows={left} />
      <SpecTable x={colX(0) + colWpx + gap} y={BODY_Y} width={colWpx} height={BODY_H} rows={right} />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · config_language — "Language 한국어" (optionsHint verbatim, 입력 순간을 목업으로)
// ------------------------------------------------------------------------------------------------
const LANGUAGE_HINT = "Any language name or ISO code (e.g. 'ja'); use 'default' for English.";

const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const rows: PanelRow[] = CONFIG_ROWS.map((r, i) => (i === LANGUAGE_ROW_INDEX ? { ...r, value: undefined, editing: "한국어", highlight: true, hint: LANGUAGE_HINT } : r));
  const p = panelIllo({ x: illoX, y: BODY_Y, w: illoW, h: TOP_H, windowH: SPLIT_WINDOW_H, rows });
  const b1 = p.spotForRow(LANGUAGE_ROW_INDEX);

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="Language 한국어">
      {p.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "Language 항목에 직접 입력", body: "언어 이름 그대로(예: 한국어) 또는 ISO 코드로 입력한다." },
          { number: 2, head: "패널이 보여주는 원문 안내", body: LANGUAGE_HINT },
          { number: "!", head: "아무것도 안 바꾸면", body: "Default (English) 로 그대로 남는다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · status_실습 — "/status · Organization 확인"
// Organization/Email 은 계정별 값 — 실제 CEO 계정 대신 더미 + "예시" 배지로 눈에 띄게 가린다.
// ------------------------------------------------------------------------------------------------
const STATUS_ROWS: PanelRow[] = [
  { id: "version", label: "Version", value: "2.1.273 (Claude Code)" },
  { id: "sessionName", label: "Session name", value: "/rename to add a name" },
  { id: "cwd", label: "cwd", value: "C:\\agent1" },
  { id: "organization", label: "Organization", value: "Example Org", badge: "예시", highlight: true },
  { id: "email", label: "Email", value: "student@example.com", badge: "예시" },
];

const Slide04: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const p = panelIllo({ x: illoX, y: BODY_Y, w: illoW, h: TOP_H, windowH: SPLIT_WINDOW_H, rows: STATUS_ROWS, center: true });
  const orgIndex = STATUS_ROWS.findIndex((r) => r.id === "organization");
  const b1 = p.spotForRow(orgIndex);

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="/status · Organization 확인">
      {p.node}
      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      <CardRow
        x={colX(0)}
        y={CARDS_Y}
        width={colW(12)}
        height={CARDS_H}
        items={[
          { number: 1, head: "/status 로 확인", body: "터미널에 /status 라고 입력하면 계정 정보가 나온다." },
          { number: 2, head: "Organization 행", body: "지금 로그인된 조직 계정 이름이 여기 나온다." },
          { number: "!", head: "이메일·조직명은 예시로 대체", body: "실제 화면엔 로그인 계정 값이 나오지만, 슬라이드에는 더미 값을 넣고 '예시' 배지로 표시했다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · status_login — "/login 으로 본인 계정" (실제 화면 문구 NOT FOUND — 캡처 대기)
// TODO-CAPTURE: Claude Code 세션 안에서 /login 실행 → 계정 선택 화면 전체
// ------------------------------------------------------------------------------------------------
const Slide05: React.FC = () => (
  <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="/login 으로 본인 계정">
    <CapturePendingBox x={CAP_X} y={BODY_Y} width={CAP_W} height={BODY_H} url="Claude Code 안에서 /login 실행" capture="계정 선택 화면 전체" />
    <AnnotationColumn
      x={ANNO9_X}
      y={BODY_Y}
      width={ANNO9_W}
      height={BODY_H}
      items={[
        { number: 1, head: "/login 명령", body: "터미널에 /login 이라고 입력하면 계정 선택 화면이 뜬다." },
        { number: 2, head: "본인 계정으로 로그인", body: "여러 계정을 오갈 때 이 화면에서 바꿔 들어간다." },
        { number: 3, head: "실제 화면 확보 전", body: "이 화면의 정확한 문구가 아직 없어 자리표시자로 남겨둔다." },
      ]}
    />
  </SlideFrame>
);

// ------------------------------------------------------------------------------------------------
// 06 · usage_실습 — "/usage · 터미널 사용량" (라벨만 verbatim, 숫자/퍼센트는 전부 비움)
// ------------------------------------------------------------------------------------------------
const USAGE_ROWS: PanelRow[] = [
  { id: "session", label: "Current session" },
  { id: "weekAll", label: "Current week (all models)" },
  { id: "weekSonnet", label: "Current week (Sonnet only)" },
  { id: "spendLimit", label: "Spend limit" },
];

const Slide06: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(8);
  const p = panelIllo({ x: illoX, y: BODY_Y, w: illoW, h: BODY_H, windowH: 640, rows: USAGE_ROWS, center: true });
  const badgeLabels: Array<number | string> = [1, 2, 3, "!"];
  const badges = USAGE_ROWS.map((_, i) => p.spotForRow(i));

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="/usage · 터미널 사용량">
      {p.node}
      {badges.map((b, i) => (
        <FocusBadge key={i} number={badgeLabels[i]} x={b.x} y={b.y} size={30} />
      ))}
      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "Current session", body: "지금 진행 중인 5시간 세션 동안 쓴 양." },
          { number: 2, head: "Current week (all models)", body: "이번 주 전체 모델 사용량 합계." },
          { number: 3, head: "Current week (Sonnet only)", body: "이번 주 Sonnet 모델만 따로 집계." },
          { number: "!", head: "Spend limit", body: "지출 한도를 설정해둔 계정에서만 표시된다 — 숫자는 계정마다 달라 슬라이드엔 넣지 않는다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S3_CONFIG: SlideEntry[] = [
  { index: 1, name: "config_란", title: "/config", render: () => React.createElement(Slide01) },
  { index: 2, name: "config_항목표", title: "설정 항목 한눈에", render: () => React.createElement(Slide02) },
  { index: 3, name: "config_language", title: "Language 한국어", render: () => React.createElement(Slide03) },
  { index: 4, name: "status_실습", title: "/status · Organization 확인", render: () => React.createElement(Slide04) },
  { index: 5, name: "status_login", title: "/login 으로 본인 계정", render: () => React.createElement(Slide05) },
  { index: 6, name: "usage_실습", title: "/usage · 터미널 사용량", render: () => React.createElement(Slide06) },
];

export const S3_CONFIG_PART: PartSpec = { id: "s3-config", eyebrow: EYEBROW, entries: S3_CONFIG };
