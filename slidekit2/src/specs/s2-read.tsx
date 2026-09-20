// s2-read — basic 2회차 슬라이드 27~46 (20장). Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step02/*.svg + courses/basic/step02.json) into this renderer, following the
// CEO-approved reference `specs/step02-read.tsx` (10-slide condensed version of the same lesson). This
// file expands the same ground into 20 slides at 1:1 granularity with the shipped deck's own file names.
// Real practice files (read_practice.zip -> practice_files/) are 8 real files, not the reference's
// 4-file placeholder set — see courses/basic/step02.json entries read_실습자료_받기..read_결과_전체 and
// assets/basic/step02/read_폴더_펼치기.svg / read_결과_전체.svg for the exact real names.
import React from "react";
import { staticFile } from "remotion";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { AppWindow } from "../core/AppWindow";
import { Camera, cameraView } from "../core/Camera";
import { FileIcon } from "../core/glyphs";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "READ 툴";
const TOTAL = 20;

const WINDOW_HEADER_H = 34; // NATIVE.windowHeader — AppWindow's own native title bar height.
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.

// ExplorerPane's own row metrics (VSCodeScreen.tsx module-local consts, not exported — mirrored the same
// way step02-read.tsx mirrors them) so badges can land on a specific explorer row's text without covering it.
const EXPLORER_TITLE_H = 26; // "EXPLORER" label row
const EXPLORER_ROOT_ROW_H = 36; // VSCodeScreen HEADER_ROW_H
const EXPLORER_ROW_H = 30; // VSCodeScreen ROW_H

function explorerRowCenter(depth: number, index: number, iconInset = 6): { x: number; y: number } {
  return {
    x: ACTIVITY_W + 12 + depth * 16 + iconInset,
    y: WINDOW_HEADER_H + EXPLORER_TITLE_H + EXPLORER_ROOT_ROW_H + index * EXPLORER_ROW_H + EXPLORER_ROW_H / 2,
  };
}

// ------------------------------------------------------------------------------------------------
// Shared helpers (this part owns its own copies, per specs/README.md — mirrors step02-read.tsx / step02-write.tsx).
// ------------------------------------------------------------------------------------------------

function windowGeometry(illoW: number, illoH: number, windowH = 480) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

function rightTermWidth(windowNative: { w: number }, mainMode: "empty" | "editor" | "editorImage" = "empty", sidebarWidth: number = SIDEBAR_W): number {
  const contentW = windowNative.w - ACTIVITY_W - sidebarWidth;
  const frac = mainMode === "empty" ? 0.84 : mainMode === "editorImage" ? 0.56 : 0.62;
  return Math.round(contentW * frac);
}

// Narrower Explorer for the real-photo slides (13/14/15) — same reasoning as step02-read.tsx's
// READ_IMG_SIDEBAR_W: the editor column needs to be wide enough to show IMG_20260309_134502.jpg large.
const READ_IMG_SIDEBAR_W = 245;

const BADGE_GUTTER = 44;
const TERM_WINDOW_H = 620;
const TERM_PAD_H = 16;

function dragEndAtInput(paneLeft: number, inputCenterY: number): { x: number; y: number } {
  return { x: paneLeft + TERM_PAD_H + BADGE_GUTTER + 8, y: inputCenterY };
}

// Real practice photo (already copied into public/slides/read/ — see slidekit2/README direction log).
const PRACTICE_PHOTO = staticFile("slides/read/IMG_20260309_134502.jpg");

// Real excerpt from practice_files/doc_230928_v3.txt, matching read_파일_열어보기.svg's own editor preview.
const DOC_EXCERPT_LINES = [
  "2026년 3월 9일 회의록",
  "",
  "참석자: 이팀장, 박대리, 김주임, 최인턴",
  "",
  "안건 1. Q1 실적 검토",
  "- 전월 대비 매출 12% 증가",
  "- 반품률 3.2% (목표치 초과, 원인 분석 필요)",
];

// The real 8 practice files (read_practice.zip -> practice_files/), in the shipped deck's own order
// (read_폴더_펼치기.svg / read_파일_열어보기.svg). KakaoTalk names truncate in a narrow Explorer exactly
// like the shipped screenshot ("KakaoTalk_20260312…") — ExplorerPane already ellipsizes long names itself.
const PRACTICE_FILES = [
  "doc_230928_v3.txt",
  "temp_1104.txt",
  "report_final_v2.pdf",
  "KakaoTalk_20260312_175159585.jpg",
  "KakaoTalk_20260312_175159586.jpg",
  "KakaoTalk_20260312_175159587.jpg",
  "IMG_20260309_134502.jpg",
  "IMG_20260311_092341.jpg",
];

// Real renamed results (read_결과_전체.svg) — Read had to actually understand each file to name it this way.
const RENAMED_FILES: Array<{ from: string; to: string }> = [
  { from: "doc_230928_v3.txt", to: "2026-03-09_Q1실적_회의록.txt" },
  { from: "temp_1104.txt", to: "업무메모_거래처_경비정산.txt" },
  { from: "report_final_v2.pdf", to: "2026_1분기_영업실적_보고서.pdf" },
  { from: "IMG_20260309_134502.jpg", to: "요리재료_적양파_도마.jpg" },
  { from: "IMG_20260311_092341.jpg", to: "풍경_여름_계곡_숲.jpg" },
  { from: "KakaoTalk_20260312_175159585.jpg", to: "청첩장_김민준_이지은_2026-05-16.jpg" },
  { from: "KakaoTalk_20260312_175159586.jpg", to: "동물_코요테_설원.jpg" },
  { from: "KakaoTalk_20260312_175159587.jpg", to: "풍경_폭포_계곡.jpg" },
];

function practiceExplorer(opts: { selected?: string; renamed?: string[] } = {}): ExplorerNode[] {
  const { selected, renamed = [] } = opts;
  return [
    { name: "practice_files", kind: "folder", depth: 0 },
    ...PRACTICE_FILES.map((name) => {
      const isRenamed = renamed.includes(name);
      const display = isRenamed ? RENAMED_FILES.find((r) => r.from === name)?.to ?? name : name;
      return { name: display, kind: "file" as const, depth: 1, state: (name === selected ? "selected" : isRenamed ? "new" : "normal") as ExplorerNode["state"] };
    }),
  ];
}

// ------------------------------------------------------------------------------------------------
// Drag cue (mirrors step02-read.tsx's own DragCue/MouseCursorIcon — local to this file only).
// ------------------------------------------------------------------------------------------------

const MouseCursorIcon: React.FC<{ x: number; y: number; size?: number }> = ({ x, y, size = 30 }) => (
  <svg
    style={{ position: "absolute", left: x - size * 0.08, top: y - size * 0.05, width: size, height: size * 1.375, filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))" }}
    viewBox="0 0 16 22"
  >
    <path d="M1 1 L1 18.4 L5.2 14.6 L8 20.9 L10.5 19.7 L7.7 13.5 L13.4 13.5 Z" fill="#ffffff" stroke="#14161a" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const DragCue: React.FC<{ start: { x: number; y: number }; end: { x: number; y: number }; controlY: number }> = ({ start, end, controlY }) => {
  const ctrlX = (start.x + end.x) / 2;
  return (
    <>
      <svg style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, pointerEvents: "none" }} viewBox="0 0 1920 1080">
        <path
          d={`M ${start.x} ${start.y} Q ${ctrlX} ${controlY} ${end.x} ${end.y}`}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={3.5}
          strokeDasharray="3 12"
          strokeLinecap="round"
          opacity={0.85}
        />
        <circle cx={start.x} cy={start.y} r={7} fill={COLORS.accent} stroke="#ffffff" strokeWidth={2} />
      </svg>
      <MouseCursorIcon x={end.x} y={end.y} />
    </>
  );
};

// A basic-8-col illustration + right 4-col AnnotationColumn slot pair, matching every step02-read.tsx slide.
function bodySlot() {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const annoX = colX(8);
  const annoW = colW(4);
  return { illoX, illoY, illoW, illoH, annoX, annoW };
}

// ------------------------------------------------------------------------------------------------
// 01 · Read 툴이란? — "파일을 대신 읽어주는 도구" (courses/basic/step02.json: 내 컴퓨터의 파일을 직접 열어
// 읽는다 / 복사·붙여넣기가 필요 없다). Card+화살표+에이전트 구도, read_툴_이란.svg의 "세 단계"를 카드 3행으로.
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();

  const cardW = 460;
  const cardH = 620;
  const cardX = illoX + 30;
  const cardY = illoY + (illoH - cardH) / 2;

  const rows: Array<{ kind: "doc" | "photo" | "zip"; name: string }> = [
    { kind: "doc", name: "doc_230928_v3.txt" },
    { kind: "photo", name: "IMG_20260309_134502.jpg" },
    { kind: "doc", name: "report_final_v2.pdf" },
  ];

  const agentR = 175;
  const agentCx = cardX + cardW + 300;
  const agentCy = cardY + cardH / 2;

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="파일 읽기 도구">
      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "내 컴퓨터 파일 직접 열람", body: "경로나 이름만 알려주면 Claude가 직접 파일을 연다." },
          { number: 2, head: "복사·붙여넣기 불필요", body: "지금까지는 내용을 복사해 채팅창에 붙여넣어야 했다." },
        ]}
      />

      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH }}>
        <div
          style={{
            position: "absolute",
            left: cardX - illoX,
            top: cardY - illoY,
            width: cardW,
            height: cardH,
            background: COLORS.paper2,
            border: `2px solid ${COLORS.line}`,
            borderRadius: 18,
            boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
            padding: "44px 40px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40, flex: "0 0 auto" }}>
            <div style={{ width: 44, height: 44, borderRadius: 9, background: COLORS.accentWash, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
              <svg width={22} height={22} viewBox="0 0 24 24">
                <path d="M4 4 H14 L20 10 V20 H4 Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={1.8} strokeLinejoin="round" />
                <path d="M14 4 V10 H20" fill="none" stroke={COLORS.accentDeep} strokeWidth={1.8} strokeLinejoin="round" />
                <path d="M2 8 L2 22 L18 22" fill="none" stroke={COLORS.accentDeep} strokeWidth={1.6} strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontFamily: FONTS.term, fontWeight: 700, fontSize: 28, color: COLORS.accentDeep }}>practice_files</span>
          </div>
          <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {rows.map((r) => (
              <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <FileIcon kind={r.kind} size={54} />
                <span style={{ fontFamily: FONTS.term, fontWeight: 500, fontSize: 22, color: COLORS.ink, wordBreak: "keep-all" }}>{r.name}</span>
              </div>
            ))}
          </div>
        </div>

        {(() => {
          const ax0 = cardX - illoX + cardW + 20;
          const ax1 = agentCx - illoX - agentR - 20;
          const aw = Math.max(40, ax1 - ax0);
          return (
            <svg style={{ position: "absolute", left: ax0, top: cardY - illoY + cardH / 2 - 20, width: aw, height: 40 }} viewBox={`0 0 ${aw} 40`}>
              <path d={`M0 20 H${aw - 22}`} fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" />
              <path d={`M${aw - 28} 8 L${aw - 4} 20 L${aw - 28} 32`} fill="none" stroke={COLORS.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        })()}

        <div
          style={{
            position: "absolute",
            left: agentCx - illoX - agentR,
            top: agentCy - illoY - agentR,
            width: agentR * 2,
            height: agentR * 2,
            borderRadius: "50%",
            background: COLORS.accentWash,
            border: `3px solid ${COLORS.accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ width: 84, height: 84, borderRadius: 20, background: "#ffffff", border: `3.5px solid ${COLORS.accentDeep}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 13, height: 13, borderRadius: "50%", background: COLORS.accentDeep }} />
              <div style={{ width: 13, height: 13, borderRadius: "50%", background: COLORS.accentDeep }} />
            </div>
          </div>
          <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 30, color: COLORS.accentDeep, marginTop: 4 }}>에이전트</span>
        </div>
      </div>

      <FocusBadge number={1} x={cardX + cardW - 8} y={cardY + 6} />
      <FocusBadge number={2} x={agentCx} y={agentCy + agentR - 20} />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · 읽을 수 있는 파일 종류 — 텍스트 / 이미지 / PDF (courses/basic/step02.json read_읽을_수_있는_것)
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const gap = 40;
  const cardW = (illoW - gap * 2) / 3;
  const cardH = illoH;

  const kinds: Array<{ kind: "doc" | "photo" | "zip"; label: string; ext: string; desc: string }> = [
    { kind: "doc", label: "텍스트", ext: ".txt · .md · .py · .html", desc: "텍스트 파일 전체 지원" },
    { kind: "photo", label: "이미지", ext: ".jpg · .png · .gif · .webp", desc: "이미지 직접 보기" },
    { kind: "doc", label: "PDF", ext: "최대 100페이지 · 20MB", desc: "페이지 단위 읽기" },
  ];

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="읽을 수 있는 파일 종류">
      {kinds.map((k, i) => (
        <div
          key={k.label}
          style={{
            position: "absolute",
            left: illoX + i * (cardW + gap),
            top: illoY,
            width: cardW,
            height: cardH,
            boxSizing: "border-box",
            background: COLORS.paper2,
            border: `2px solid ${COLORS.line}`,
            borderRadius: 18,
            boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            padding: "0 30px",
          }}
        >
          <FileIcon kind={k.kind} size={100} />
          <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 38, color: COLORS.accentDeep }}>{k.label}</div>
          <div style={{ fontFamily: FONTS.term, fontWeight: 500, fontSize: 22, color: COLORS.ink2, textAlign: "center", wordBreak: "keep-all" }}>{k.ext}</div>
          <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 24, color: COLORS.ink, textAlign: "center", wordBreak: "keep-all" }}>{k.desc}</div>
        </div>
      ))}
      <FocusBadge number={2} x={illoX + cardW + gap + cardW / 2} y={illoY + 60} size={34} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "세 가지 형식 모두 지원", body: "텍스트 · 이미지 · PDF, 파일 형식을 가리지 않는다." },
          { number: 2, head: "이미지를 '본다'는 게 핵심", body: "파일명이 아니라 실제 그림 내용을 이해한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · 실습 자료 받기 — read_practice.zip 다운로드 (read_실습자료_받기.svg / json action.download)
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const termW = rightTermWidth(windowNative);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = [{ name: "read_practice.zip", kind: "file", depth: 0, state: "new" }];
  const b1 = toFrame(explorerRowCenter(0, 0));

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="실습 자료 받기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={explorerNodes} layout="right" terminalWidth={termW} showTerminal mainMode="empty" />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "read_practice.zip 다운로드", body: "실습 페이지 맨 아래 '실습 자료 다운로드' 버튼을 누른다." },
          { number: "!", head: "agent1 폴더에 저장", body: "오늘 실습 내내 이 폴더 한 곳만 쓴다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · 압축 풀기 — zip 을 풀어 practice_files 폴더를 만든다 (read_압축_풀기.svg)
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const termW = rightTermWidth(windowNative);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = [
    { name: "practice_files", kind: "folder", depth: 0, state: "new" },
    { name: "read_practice.zip", kind: "file", depth: 0 },
  ];
  const b1 = toFrame(explorerRowCenter(0, 0));

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="압축 풀기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={explorerNodes} layout="right" terminalWidth={termW} showTerminal mainMode="empty" />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "Windows: 우클릭 → 압축 풀기", body: "read_practice.zip 우클릭 후 '압축 풀기'(또는 '모두 압축 해제')." },
          { number: "!", head: "macOS: 더블클릭 한 번", body: "더블클릭하면 자동으로 압축이 풀린다 — 별도 메뉴 없음." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · 폴더 펼치기 — practice_files 안 파일 8개 확인 (read_폴더_펼치기.svg)
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const termW = rightTermWidth(windowNative);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = [{ name: "practice_files", kind: "folder", depth: 0, state: "selected" }, ...PRACTICE_FILES.map((name) => ({ name, kind: "file" as const, depth: 1 }))];
  const b1 = toFrame(explorerRowCenter(0, 0));

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="폴더 펼치기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={explorerNodes} layout="right" terminalWidth={termW} showTerminal mainMode="empty" />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "practice_files 폴더 펼치기", body: "안에 파일이 8개 들어 있다." },
          { number: "!", head: "파일명만으로는 파악 불가", body: "이름만 보고는 무슨 내용인지 짐작이 안 된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · 파일 하나씩 열어보기 — doc_230928_v3.txt 를 눌러 실제 내용 확인 (read_파일_열어보기.svg)
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const termW = rightTermWidth(windowNative, "editor");
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = practiceExplorer({ selected: "doc_230928_v3.txt" });
  const b1 = toFrame(explorerRowCenter(1, 0));

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="파일 하나씩 열어보기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            mainMode="editor"
            editorTab={{ name: "doc_230928_v3.txt", lines: DOC_EXCERPT_LINES }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "클릭 시 편집기에 표시", body: "doc_230928_v3.txt 는 사실 회의록이었다." },
          { number: "!", head: "하나씩 열기엔 비효율", body: "다음 실습부터는 Claude에게 맡긴다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · PDF 확장 설치 안내 — report_final_v2.pdf 클릭 시 뜨는 vscode-pdf 설치 알림 (read_pdf_확장설치.svg)
// ------------------------------------------------------------------------------------------------

const InstallToast: React.FC<{ x: number; y: number; width: number }> = ({ x, y, width }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      boxSizing: "border-box",
      background: "#252526",
      border: "1px solid #3a3d40",
      borderRadius: 8,
      padding: "18px 20px",
      boxShadow: "0 14px 30px rgba(0,0,0,0.45)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}
  >
    <span style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 18, lineHeight: 1.4, color: "#e8eaec", wordBreak: "keep-all" }}>
      이 파일 형식은 미리 볼 수 없습니다. 'vscode-pdf' 확장이 필요합니다. 설치할까요?
    </span>
    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
      <div style={{ padding: "6px 14px", borderRadius: 5, background: "transparent", border: "1px solid #4a4d50", color: "#cccccc", fontFamily: FONTS.display, fontWeight: 600, fontSize: 15 }}>나중에</div>
      <div style={{ padding: "6px 14px", borderRadius: 5, background: COLORS.accent, color: "#ffffff", fontFamily: FONTS.display, fontWeight: 700, fontSize: 15 }}>Install</div>
    </div>
  </div>
);

const Slide07: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const termW = rightTermWidth(windowNative);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = practiceExplorer({ selected: "report_final_v2.pdf" });
  const b1 = toFrame(explorerRowCenter(1, 2));

  const toastW = 420;
  const toastX = illoX + illoW - toastW - 28;
  const toastY = illoY + illoH - 160;
  const installBadge = { x: toastX + toastW - 8, y: toastY + 6 };

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="PDF 확장 설치 안내">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={explorerNodes} layout="right" terminalWidth={termW} showTerminal mainMode="empty" />
        </Camera>
      </div>

      <InstallToast x={toastX} y={toastY} width={toastW} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      <FocusBadge number={2} x={installBadge.x} y={installBadge.y} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "report_final_v2.pdf 를 클릭", body: "PDF 를 열면 확장 설치 안내가 뜬다." },
          { number: 2, head: "Install 클릭", body: "잠시 후 PDF 미리보기를 볼 수 있게 된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · PDF 확장 수동 설치 — 알림을 닫았을 때 확장 아이콘 → 검색 → Install (read_pdf_확장_수동설치.svg)
// ------------------------------------------------------------------------------------------------

const ExtensionsMock: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => {
  const sidebarW = 300;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)", overflow: "hidden" }}>
      <AppWindow width={w} height={h} os="windows" theme="dark" title="에이전트1 — Visual Studio Code" native enter="none" float={false}>
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "#1f1f1f" }}>
          <div style={{ width: ACTIVITY_W, flex: `0 0 ${ACTIVITY_W}px`, background: "#181818", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10, gap: 14 }}>
            <div style={{ width: 4, height: 26, borderRadius: 2, background: COLORS.accent, position: "absolute", left: 0, marginTop: 44 }} />
            <svg width={18} height={18} viewBox="0 0 24 24"><path d="M4 8 L4 4 L14 4 M20 16 L20 20 L10 20" fill="none" stroke="#8a8a8a" strokeWidth={2} strokeLinecap="round" /></svg>
            <svg width={18} height={18} viewBox="0 0 24 24"><path d="M3.5 7.5 L12 3.5 L20.5 7.5 V16.5 L12 20.5 L3.5 16.5 Z" fill="none" stroke={COLORS.accent} strokeWidth={2} strokeLinejoin="round" /></svg>
          </div>
          <div style={{ width: sidebarW, flex: `0 0 ${sidebarW}px`, boxSizing: "border-box", background: "#181818", borderRight: "1px solid #2b2b2b", display: "flex", flexDirection: "column", padding: "14px 14px" }}>
            <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 11, letterSpacing: "0.06em", color: "#9a9a9a", marginBottom: 12 }}>EXTENSIONS</span>
            <div style={{ height: 34, borderRadius: 5, border: `1px solid ${COLORS.accent}`, background: "#313131", display: "flex", alignItems: "center", padding: "0 12px", marginBottom: 16 }}>
              <span style={{ fontFamily: FONTS.term, fontSize: 14, color: "#e8eaec" }}>vscode pdf</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", borderRadius: 6, background: "rgba(18,115,196,0.18)" }}>
              <div style={{ width: 34, height: 34, borderRadius: 6, background: COLORS.accentWash, flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FileIcon kind="doc" size={22} />
              </div>
              <div style={{ flex: "1 1 0", minWidth: 0 }}>
                <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 15, color: "#e8eaec" }}>vscode-pdf</div>
                <div style={{ fontFamily: FONTS.body, fontSize: 12, color: "#9a9a9a" }}>PDF 뷰어 확장</div>
              </div>
            </div>
            <div style={{ marginTop: 10, alignSelf: "flex-start", padding: "6px 16px", borderRadius: 5, background: COLORS.accent, color: "#ffffff", fontFamily: FONTS.display, fontWeight: 700, fontSize: 14 }}>Install</div>
          </div>
          <div style={{ flex: "1 1 0", minWidth: 0, background: "#1f1f1f" }} />
        </div>
      </AppWindow>
    </div>
  );
};

const Slide08: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const activityIconY = illoY + WINDOW_HEADER_H + 10 + 44 + 9; // second activity-bar icon center (box icon)
  const searchBoxY = illoY + WINDOW_HEADER_H + 14 + 12 + 17;
  const installY = illoY + illoH - 160;

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="PDF 확장 수동 설치">
      <ExtensionsMock x={illoX} y={illoY} w={illoW} h={illoH} />

      <FocusBadge number={1} x={illoX + ACTIVITY_W / 2} y={activityIconY} size={30} />
      <FocusBadge number={2} x={illoX + ACTIVITY_W + 150} y={searchBoxY} size={30} />
      <FocusBadge number={3} x={illoX + ACTIVITY_W + 254} y={installY} size={30} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "확장(Extensions) 아이콘 클릭", body: "왼쪽 액티비티 바의 네모 아이콘을 누른다." },
          { number: 2, head: "검색창에 vscode pdf 입력", body: "확장 검색창에 입력해 찾는다." },
          { number: 3, head: "첫 항목의 Install 클릭", body: "목록 맨 위 확장의 Install 버튼을 누른다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 09 · 파일 드래그해서 건네기 — doc_230928_v3.txt 를 Claude 창으로 드롭 (read_txt_드래그드롭.svg)
// ------------------------------------------------------------------------------------------------

const Slide09: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const explorerNodes: ExplorerNode[] = practiceExplorer({ selected: "doc_230928_v3.txt" });
  const termLayout = layoutClaudeCodeTerminal({ width: termW, showLaunch: true, showWelcome: true, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const b1 = toFrame(explorerRowCenter(1, 0));

  const dragStart = toFrame({ x: ACTIVITY_W + SIDEBAR_W - 16, y: explorerRowCenter(1, 0).y });
  const dragEnd = toFrame(dragEndAtInput(paneLeft, contentTop + termLayout.inputY + termLayout.inputH / 2));
  const dragControlY = toFrame({ x: 0, y: WINDOW_HEADER_H + 40 }).y;
  const b2 = toFrame({ x: paneLeft + TERM_PAD_H + BADGE_GUTTER / 2, y: contentTop + termLayout.inputY + termLayout.inputH / 2 });

  return (
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="파일 드래그해서 건네기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} showLaunch showWelcome fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <DragCue start={dragStart} end={dragEnd} controlY={dragControlY} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "EXPLORER 의 파일을 클릭 채로 끌기", body: "doc_230928_v3.txt 를 오른쪽 Claude 창으로 끌어다 놓는다." },
          { number: 2, head: "입력줄 경로 자동 삽입", body: "드롭하면 파일 경로가 입력줄에 그대로 채워진다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 10 · 분석 요청 입력 — 드롭된 경로 뒤에 "이 파일을 읽고 분석해줘" 이어 쓰기 (read_txt_분석요청.svg)
// ------------------------------------------------------------------------------------------------

const Slide10: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const explorerNodes: ExplorerNode[] = practiceExplorer({ selected: "doc_230928_v3.txt" });
  const inputText = "doc_230928_v3.txt 분석해줘";
  const termLayout = layoutClaudeCodeTerminal({ width: termW, inputText, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + TERM_PAD_H + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 });

  return (
    <SlideFrame index={10} total={TOTAL} eyebrow={EYEBROW} title="분석 요청 입력">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} inputText={inputText} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "요청 문장 이어 쓰기", body: "경로 뒤에 요청 문장만 덧붙인다." },
          { number: "!", head: "Enter → Claude 실행", body: "결과는 다음 장에서 확인한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 11 · 분석 결과 확인 — Read 툴 호출 줄 + 요약이 실제 내용과 맞는지 대조 (read_txt_분석결과.svg)
// ------------------------------------------------------------------------------------------------

const Slide11: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const priorTurns: ClaudeCodeTurn[] = [
    { role: "user", text: "doc_230928_v3.txt 분석해줘" },
    { role: "assistant", text: "Read(practice_files/doc_230928_v3.txt)" },
    { role: "assistant", text: "2026년 3월 9일 회의록입니다. 매출 12% 증가, 반품률 3.2% 등 Q1 실적을 담고 있어요." },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: priorTurns, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + TERM_PAD_H + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 });
  const b2 = toFrame({ x: badgeX, y: contentTop + termLayout.turns[2].anchorY + termLayout.lineH / 2 });

  return (
    <SlideFrame index={11} total={TOTAL} eyebrow={EYEBROW} title="분석 결과 확인">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={practiceExplorer({ selected: "doc_230928_v3.txt" })}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} turns={priorTurns} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="editor"
            editorTab={{ name: "doc_230928_v3.txt", lines: DOC_EXCERPT_LINES }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "Read 툴 호출 줄 표시", body: "정말로 파일을 열어봤다는 증거다." },
          { number: 2, head: "요약이 실제 내용과 맞는지 대조", body: "실제 파일을 열어 답변과 비교해본다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 12 · 파일명 변경 요청 — 내용에 맞는 이름으로 바꿔달라고 요청 (read_txt_파일명_변경.svg)
// ------------------------------------------------------------------------------------------------

const Slide12: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const priorTurns: ClaudeCodeTurn[] = [
    { role: "user", text: "바로 알아볼 수 있게 파일명을 바꿔줘" },
    { role: "assistant", text: "Bash(mv doc_230928_v3.txt → 2026-03-09_Q1실적_회의록.txt)" },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: priorTurns, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + TERM_PAD_H + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + termLayout.turns[0].anchorY + termLayout.lineH / 2 });
  const b2 = toFrame({ x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 });

  return (
    <SlideFrame index={12} total={TOTAL} eyebrow={EYEBROW} title="파일명 변경 요청">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={practiceExplorer({ renamed: ["doc_230928_v3.txt"] })}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} turns={priorTurns} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "'파일명을 바꿔줘' 라고 요청", body: "doc_230928_v3.txt → 날짜·안건이 담긴 이름으로." },
          { number: 2, head: "내용을 이해해야 가능한 작업", body: "Read 없이는 알아볼 수 있는 이름을 지을 수 없다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 13 · 사진도 드래그해서 건네기 — IMG_20260309_134502.jpg 드롭 (read_jpg_드래그드롭.svg)
// ------------------------------------------------------------------------------------------------

const Slide13: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative, "editorImage", READ_IMG_SIDEBAR_W);

  const explorerNodes: ExplorerNode[] = practiceExplorer({ selected: "IMG_20260309_134502.jpg" });
  const inputText = "IMG_20260309_134502.jpg";
  const termLayout = layoutClaudeCodeTerminal({ width: termW, inputText, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + TERM_PAD_H + BADGE_GUTTER / 2;
  const b1 = toFrame(explorerRowCenter(1, 6));
  const b2 = toFrame({ x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 });

  const dragStart = toFrame({ x: ACTIVITY_W + READ_IMG_SIDEBAR_W - 16, y: explorerRowCenter(1, 6).y });
  const dragEnd = toFrame(dragEndAtInput(paneLeft, contentTop + termLayout.inputY + termLayout.inputH / 2));
  const dragControlY = toFrame({ x: 0, y: WINDOW_HEADER_H + 40 }).y;

  return (
    <SlideFrame index={13} total={TOTAL} eyebrow={EYEBROW} title="사진도 드래그해서 건네기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            sidebarWidth={READ_IMG_SIDEBAR_W}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} inputText={inputText} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="editor"
            editorTab={{ name: "IMG_20260309_134502.jpg", image: PRACTICE_PHOTO }}
          />
        </Camera>
      </div>

      <DragCue start={dragStart} end={dragEnd} controlY={dragControlY} />

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "1번과 똑같은 방식", body: "IMG_20260309_134502.jpg 를 오른쪽 Claude 창으로 끌어다 놓는다." },
          { number: 2, head: "파일·사진 동일한 방법", body: "끌어다 놓고 물어본다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 14 · 사진 분석 결과 — Claude 가 사진을 '보고' 설명 (read_jpg_분석결과.svg)
// ------------------------------------------------------------------------------------------------

const Slide14: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative, "editorImage", READ_IMG_SIDEBAR_W);

  const priorTurns: ClaudeCodeTurn[] = [
    { role: "user", text: "IMG_20260309_134502.jpg 이 파일을 읽고 분석해줘" },
    { role: "assistant", text: "Read(practice_files/IMG_20260309_134502.jpg)" },
    { role: "assistant", text: "나무 도마 위에 적양파를 반으로 잘라 올려두었고, 통후추가 흩어져 있는 요리 재료 사진이에요." },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: priorTurns, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + TERM_PAD_H + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 });
  const b2 = toFrame({ x: badgeX, y: contentTop + termLayout.turns[2].anchorY + termLayout.lineH / 2 });

  return (
    <SlideFrame index={14} total={TOTAL} eyebrow={EYEBROW} title="사진 분석 결과">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            sidebarWidth={READ_IMG_SIDEBAR_W}
            explorerNodes={practiceExplorer({ selected: "IMG_20260309_134502.jpg" })}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} turns={priorTurns} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="editor"
            editorTab={{ name: "IMG_20260309_134502.jpg", image: PRACTICE_PHOTO }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "파일명에는 IMG 와 숫자뿐", body: "이름만으로는 아무 정보가 없다." },
          { number: 2, head: "설명이 실제 사진과 맞는지 확인", body: "답변과 실제 사진을 직접 비교해본다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 15 · 사진 파일명 변경 — 사진도 내용에 맞는 이름으로 (read_jpg_파일명_변경.svg)
// ------------------------------------------------------------------------------------------------

const Slide15: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const priorTurns: ClaudeCodeTurn[] = [
    { role: "user", text: "이 사진도 알아볼 수 있게 이름을 바꿔줘" },
    { role: "assistant", text: "Bash(mv IMG_20260309_134502.jpg → 요리재료_적양파_도마.jpg)" },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: priorTurns, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + TERM_PAD_H + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + termLayout.turns[0].anchorY + termLayout.lineH / 2 });
  const b2 = toFrame({ x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 });

  return (
    <SlideFrame index={15} total={TOTAL} eyebrow={EYEBROW} title="사진 파일명 변경">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={practiceExplorer({ renamed: ["doc_230928_v3.txt", "IMG_20260309_134502.jpg"] })}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} turns={priorTurns} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "텍스트 1개 · 이미지 1개 완료", body: "각각 Read 로 읽고 이름을 정리했다." },
          { number: 2, head: "다음은 나머지를 한 번에", body: "남은 6개 파일을 한 번에 처리해본다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 16 · 폴더째로 건네기 — practice_files 폴더 전체를 드롭 (read_폴더_드래그드롭.svg)
// ------------------------------------------------------------------------------------------------

const Slide16: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const explorerNodes: ExplorerNode[] = [{ name: "practice_files", kind: "folder", depth: 0, state: "selected" }];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const b1 = toFrame(explorerRowCenter(0, 0));
  const dragStart = toFrame({ x: ACTIVITY_W + SIDEBAR_W - 16, y: explorerRowCenter(0, 0).y });
  const dragEnd = toFrame(dragEndAtInput(paneLeft, contentTop + termLayout.inputY + termLayout.inputH / 2));
  const dragControlY = toFrame({ x: 0, y: WINDOW_HEADER_H + 40 }).y;

  return (
    <SlideFrame index={16} total={TOTAL} eyebrow={EYEBROW} title="폴더째로 건네기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <DragCue start={dragStart} end={dragEnd} controlY={dragControlY} />
      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "practice_files 폴더 전체를 드래그", body: "파일 하나가 아니라 폴더째로 오른쪽 Claude 창에 드롭한다." },
          { number: "!", head: "폴더 안 파일 전체 확인", body: "이렇게 넘기면 폴더 안 파일을 Claude 가 전부 확인할 수 있다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 17 · 나머지 파일 일괄 요청 — 한 문장으로 남은 6개 파일 처리 (read_일괄_요청.svg)
// ------------------------------------------------------------------------------------------------

const Slide17: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const inputText = "나머지 파일들도 모두 읽고 파일명 바꿔줘";
  const termLayout = layoutClaudeCodeTerminal({ width: termW, inputText, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + TERM_PAD_H + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 });

  return (
    <SlideFrame index={17} total={TOTAL} eyebrow={EYEBROW} title="나머지 파일 일괄 요청">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[{ name: "practice_files", kind: "folder", depth: 0, state: "selected" }]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} inputText={inputText} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "'나머지도 모두 읽고 바꿔줘'", body: "프롬프트 한 줄로 남은 6개 파일을 한 번에 처리한다." },
          { number: "!", head: "한 줄 → 여러 단계로 확장", body: "열기 → 읽기 → 이해 → 이름 바꾸기, 파일마다 반복된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 18 · 파일별로 순차 처리 — Read → Bash mv 를 파일마다 반복 (read_일괄_진행.svg)
// ------------------------------------------------------------------------------------------------

const Slide18: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const priorTurns: ClaudeCodeTurn[] = [
    { role: "user", text: "나머지 파일들도 모두 읽고 파일명 바꿔줘" },
    { role: "assistant", text: "Read(practice_files/temp_1104.txt)" },
    { role: "assistant", text: "Bash(mv temp_1104.txt → 업무메모_거래처_경비정산.txt)" },
    { role: "assistant", text: "Read(practice_files/report_final_v2.pdf)" },
    { role: "assistant", text: "Bash(mv report_final_v2.pdf → 2026_1분기_영업실적_보고서.pdf)" },
    { role: "assistant", text: "… 나머지 4개 파일도 같은 방식으로 계속됩니다" },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: priorTurns, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + TERM_PAD_H + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 });
  const b2 = toFrame({ x: badgeX, y: contentTop + termLayout.turns[2].anchorY + termLayout.lineH / 2 });

  return (
    <SlideFrame index={18} total={TOTAL} eyebrow={EYEBROW} title="파일별로 순차 처리">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={practiceExplorer({ renamed: ["doc_230928_v3.txt", "IMG_20260309_134502.jpg", "temp_1104.txt", "report_final_v2.pdf"] })}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} turns={priorTurns} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "Read 로 읽기", body: "파일마다 먼저 Read 로 열어서 내용을 확인한다." },
          { number: 2, head: "이름 바꾸기", body: "읽은 내용에 맞춰 파일명을 바꾼다 — 이 과정을 반복한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 19 · 8개 파일 이름 정리 완료 — practice_files 전부 새 이름 확인 (read_결과_전체.svg)
// ------------------------------------------------------------------------------------------------

const Slide19: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH);
  const termW = rightTermWidth(windowNative);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = [
    { name: "practice_files", kind: "folder", depth: 0, state: "selected" },
    ...RENAMED_FILES.map((r) => ({ name: r.to, kind: "file" as const, depth: 1, state: "new" as ExplorerNode["state"] })),
  ];
  const b1 = toFrame(explorerRowCenter(0, 0));

  return (
    <SlideFrame index={19} total={TOTAL} eyebrow={EYEBROW} title="8개 파일 이름 정리 완료">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={explorerNodes} layout="right" terminalWidth={termW} showTerminal mainMode="empty" />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={30} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "이름만으로 내용 파악 가능", body: "청첩장 · 회의록 · 보고서까지 이름으로 구분된다." },
          { number: "!", head: "새 이름 8개 완성", body: "파일명만 보고는 몰랐던 내용이 전부 이름에 담겼다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 20 · Read 툴 정리 — /clear 로 다음 실습 준비 (read_정리.svg)
// ------------------------------------------------------------------------------------------------

const Slide20: React.FC = () => {
  const { illoX, illoY, illoW, illoH, annoX, annoW } = bodySlot();
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const priorTurns: ClaudeCodeTurn[] = [{ role: "assistant", text: "나머지 6개 파일도 내용에 맞게 이름을 바꿨어요." }];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: priorTurns, inputText: "/clear", fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + TERM_PAD_H + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 });

  return (
    <SlideFrame index={20} total={TOTAL} eyebrow={EYEBROW} title="Read 툴 정리">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[{ name: "practice_files", kind: "folder", depth: 0 }]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} turns={priorTurns} inputText="/clear" fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={36} />

      <AnnotationColumn
        x={annoX}
        y={illoY}
        width={annoW}
        height={illoH}
        items={[
          { number: 1, head: "직접 읽기 · 드래그&드롭 · 이름 짓기", body: "텍스트 · 이미지 · PDF 를 직접 열어 읽고, 내용에 맞는 이름을 지었다." },
          { number: "!", head: "/clear 로 정리하고 다음으로", body: "다음 시간은 파일을 직접 만드는 Write 툴이다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S2_READ: SlideEntry[] = [
  { index: 1, name: "read_툴_이란", title: "파일 읽기 도구", render: () => React.createElement(Slide01) },
  { index: 2, name: "read_읽을_수_있는_것", title: "읽을 수 있는 파일 종류", render: () => React.createElement(Slide02) },
  { index: 3, name: "read_실습자료_받기", title: "실습 자료 받기", render: () => React.createElement(Slide03) },
  { index: 4, name: "read_압축_풀기", title: "압축 풀기", render: () => React.createElement(Slide04) },
  { index: 5, name: "read_폴더_펼치기", title: "폴더 펼치기", render: () => React.createElement(Slide05) },
  { index: 6, name: "read_파일_열어보기", title: "파일 하나씩 열어보기", render: () => React.createElement(Slide06) },
  { index: 7, name: "read_pdf_확장설치", title: "PDF 확장 설치 안내", render: () => React.createElement(Slide07) },
  { index: 8, name: "read_pdf_확장_수동설치", title: "PDF 확장 수동 설치", render: () => React.createElement(Slide08) },
  { index: 9, name: "read_txt_드래그드롭", title: "파일 드래그해서 건네기", render: () => React.createElement(Slide09) },
  { index: 10, name: "read_txt_분석요청", title: "분석 요청 입력", render: () => React.createElement(Slide10) },
  { index: 11, name: "read_txt_분석결과", title: "분석 결과 확인", render: () => React.createElement(Slide11) },
  { index: 12, name: "read_txt_파일명_변경", title: "파일명 변경 요청", render: () => React.createElement(Slide12) },
  { index: 13, name: "read_jpg_드래그드롭", title: "사진도 드래그해서 건네기", render: () => React.createElement(Slide13) },
  { index: 14, name: "read_jpg_분석결과", title: "사진 분석 결과", render: () => React.createElement(Slide14) },
  { index: 15, name: "read_jpg_파일명_변경", title: "사진 파일명 변경", render: () => React.createElement(Slide15) },
  { index: 16, name: "read_폴더_드래그드롭", title: "폴더째로 건네기", render: () => React.createElement(Slide16) },
  { index: 17, name: "read_일괄_요청", title: "나머지 파일 일괄 요청", render: () => React.createElement(Slide17) },
  { index: 18, name: "read_일괄_진행", title: "파일별로 순차 처리", render: () => React.createElement(Slide18) },
  { index: 19, name: "read_결과_전체", title: "8개 파일 이름 정리 완료", render: () => React.createElement(Slide19) },
  { index: 20, name: "read_정리", title: "Read 툴 정리", render: () => React.createElement(Slide20) },
];

export const S2_READ_PART: PartSpec = { id: "s2-read", eyebrow: EYEBROW, entries: S2_READ };
