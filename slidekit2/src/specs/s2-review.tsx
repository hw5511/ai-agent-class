// s2-review — basic 2회차 슬라이드 1~14 (14장), "지난 시간 복습". Rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step02/*.svg) into this renderer, following the finished reference deck
// specs/step02-review.tsx (same ground, 10 slides) wherever content overlaps — screens 03~10 here reuse
// that deck's exact scenes (agent1 folder / open folder / Ctrl+J / panel right / claude install / claude
// run / login / model sonnet / ide none), rebuilt with this file's own local geometry copy per the
// worker convention (each part spec owns its helpers, no cross-file import). This part has 14 entries
// (vs. the reference's 10): 01 is the shipped step-cover slide, 02 is the 5-item recap-of-last-time
// overview, 08 splits out "PATH 자동 등록 확인" (shipped as its own slide, folded into 07 there), 11 is the
// browser account-picker (shipped as its own slide, not in the reference), 14 is the readiness checklist.
//
// CEO note followed here: the shipped review deck used tiny thumbnail mockups with green header bars and
// the filler line "기억이 안 나도 괜찮습니다" — both dropped. Every screen below is a real VSCodeScreen /
// AppWindow, camera-zoomed to reading size, one per slide. No green/red/amber anywhere; the only
// chromatic accent is blue (COLORS.accent), and Claude orange appears only inside ClaudeCodeTerminal's
// own welcome box.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { Camera, cameraView } from "../core/Camera";
import { AppWindow, windowHeaderHeight } from "../core/AppWindow";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "지난 시간 복습";
const TOTAL = 14;

const WINDOW_HEADER_H = 34; // AppWindow's own native title bar height (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15;
const BADGE_GUTTER = 44; // reserved inside the terminal so badges never cover its text.
const TERM_WINDOW_H = 620;

// Dark chrome tones for the menu/dialog mockups (mirrors VSCodeScreen's own VSCODE_DARK — file-private
// there, so the literal values are repeated here, same as every other part spec).
const DARK = {
  sidebarBg: "#181818",
  editorBg: "#1f1f1f",
  border: "#2b2b2b",
  menuBg: "#252526",
  menuBorder: "#454545",
  text: "#cccccc",
  textMuted: "#9a9a9a",
  hot: "rgba(18, 115, 196, 0.35)",
  inputBorder: "#3a3d40",
};

// Same L21-style helper every part copies: an 8-col VSCodeScreen (camera-zoomed) + 4-col AnnotationColumn.
function windowGeometry(illoW: number, illoH: number, windowH = 480) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

function rightTermWidth(windowNative: { w: number }, mainMode: "empty" | "editor" = "empty"): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  return Math.round(contentW * (mainMode === "empty" ? 0.84 : 0.62));
}

const MenuRow: React.FC<{ label: string; hot?: boolean; note?: string }> = ({ label, hot, note }) => (
  <div
    style={{
      height: 34,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 14px",
      background: hot ? DARK.hot : "transparent",
      fontFamily: FONTS.display,
      fontSize: 15,
      color: hot ? "#ffffff" : DARK.text,
      fontWeight: hot ? 700 : 500,
      whiteSpace: "nowrap",
    }}
  >
    <span>{label}</span>
    {note ? <span style={{ color: DARK.textMuted, marginLeft: 18 }}>{note}</span> : null}
  </div>
);

const MenuBox: React.FC<{ x: number; y: number; width: number; children: React.ReactNode }> = ({ x, y, width, children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      background: DARK.menuBg,
      border: `1px solid ${DARK.menuBorder}`,
      borderRadius: 6,
      boxShadow: "0 12px 28px rgba(0,0,0,0.45)",
      padding: "6px 0",
      overflow: "hidden",
    }}
  >
    {children}
  </div>
);

// ------------------------------------------------------------------------------------------------
// 01 · Claude 에이전트 메모리와 파일/폴더 제어 (step 2 표지 — shipped as the step's own title slide)
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const termW = rightTermWidth(windowNative);

  const termProps = {
    width: termW,
    placeholder: "터미널을 열고 claude 를 입력해 시작하세요",
    fontSize: TERM_FONT_SIZE,
    leftGutter: BADGE_GUTTER,
  };

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="Claude 에이전트 메모리와 파일/폴더 제어">
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

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "CLAUDE.md", body: "에이전트에 이름과 성격을 부여한다." },
          { number: 2, head: "Read · Write · Edit", body: "파일 읽기·생성·수정." },
          { number: 3, head: "Bash", body: "폴더 생성 · 복사 · 이름 변경 · 실행." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · 지난 시간에 한 것 (1회차 요약 5가지 → 오늘도 같은 세팅을 한 번 더)
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus } = windowGeometry(illoW, illoH, 560);

  const nodes: ExplorerNode[] = [{ name: "agent1", kind: "folder", depth: 0, state: "selected" }];

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="지난 시간에 한 것">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={nodes} showTerminal={false} mainMode="empty" />
        </Camera>
      </div>

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "VS Code 설치", body: "편집기를 설치하고 한글 환경으로 맞췄다." },
          { number: 2, head: "작업 폴더", body: "폴더를 만들고 VS Code 로 열었다." },
          { number: 3, head: "터미널", body: "Ctrl + J 로 열어 오른쪽에 붙였다." },
          { number: 4, head: "CLI 설치", body: "명령 한 줄로 설치하고 PATH 를 잡았다." },
          { number: 5, head: "로그인", body: "브라우저에서 계정을 연결했다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · agent1 폴더 만들기 (바탕화면/다운로드에 새 폴더)
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;

  const iconSize = 64;
  const colLeft = illoX + 60;
  const rows = [illoY + 60, illoY + 200, illoY + 340];

  const menuW = 230;
  const menuX = illoX + illoW - 480;
  const menuY = illoY + 40;
  const submenuW = 210;
  const submenuX = menuX + menuW - 4;
  const submenuOffsetY = 8 + 3 * 34;
  const submenuY = menuY + submenuOffsetY;

  const badge1 = { x: submenuX + submenuW - 24, y: submenuY + 8 + 22 };
  const badge2 = { x: colLeft + iconSize - 6, y: rows[2] + 4 };

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="agent1 폴더 만들기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, background: COLORS.void, boxShadow: "0 18px 40px rgba(16,17,19,0.10)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 60, top: rows[2] - illoY, width: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: iconSize, height: iconSize * 0.72, borderRadius: 6, background: COLORS.accentWash, border: `2px solid ${COLORS.accentDeep}` }} />
          <span
            style={{
              fontFamily: FONTS.term,
              fontSize: 17,
              color: "#e8eaec",
              background: "#313131",
              border: `1px solid ${COLORS.accent}`,
              borderRadius: 3,
              padding: "1px 8px",
              boxShadow: "0 0 0 2px rgba(18, 115, 196, 0.28)",
            }}
          >
            agent1
            <span style={{ display: "inline-block", width: 1, height: 15, background: "#e8eaec", marginLeft: 1, transform: "translateY(2px)" }} />
          </span>
        </div>

        <MenuBox x={menuX - illoX} y={menuY - illoY} width={menuW}>
          <MenuRow label="보기" note="▸" />
          <MenuRow label="정렬 기준" note="▸" />
          <MenuRow label="새로고침" />
          <MenuRow label="새로 만들기" note="▸" hot />
        </MenuBox>
        <MenuBox x={submenuX - illoX} y={submenuY - illoY} width={submenuW}>
          <MenuRow label="폴더" hot />
          <MenuRow label="바로 가기" />
          <MenuRow label="텍스트 문서" />
        </MenuBox>
      </div>

      <FocusBadge number={1} x={badge1.x} y={badge1.y} size={34} />
      <FocusBadge number={2} x={badge2.x} y={badge2.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "우클릭 → 새로 만들기 → 폴더", body: "바탕화면이나 다운로드의 빈 곳에서 마우스 오른쪽 버튼을 클릭한다." },
          { number: 2, head: "이름 agent1 입력 후 Enter", body: "오늘 실습 내내 이 폴더 한 곳만 쓴다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · 작업 폴더 열기 (File → Open Folder → agent1)
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const menuBarH = 34;

  const dropdownW = 260;
  const dropdownItems = ["새 텍스트 파일", "폴더 열기...", "최근 항목 열기", "저장", "종료"];
  const hotIndex = 1;
  const badge1 = { x: illoX + 16 + dropdownW - 24, y: illoY + menuBarH + 8 + hotIndex * 34 + 17 };

  const dialogW = 460;
  const dialogH = 340;
  const dialogX = illoX + illoW - dialogW - 40;
  const dialogY = illoY + illoH - dialogH - 40;
  const btnW = 130;
  const btnH = 46;
  const footerTop = dialogY + dialogH - 70;
  const btnTop = footerTop + (70 - btnH) / 2;
  const btnRight = dialogX + dialogW - 24;
  const badge2 = { x: btnRight - 16, y: btnTop + 14 };

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="작업 폴더 열기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <AppWindow width={illoW} height={illoH} os="windows" theme="dark" title="Visual Studio Code" enter="none" float={false}>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: DARK.editorBg }}>
            <div style={{ height: menuBarH, flex: `0 0 ${menuBarH}px`, background: DARK.sidebarBg, display: "flex", alignItems: "center", gap: 22, padding: "0 16px", fontFamily: FONTS.display, fontSize: 15, color: DARK.text, borderBottom: `1px solid ${DARK.border}` }}>
              <span style={{ borderBottom: `2px solid ${COLORS.accent}`, paddingBottom: 4, color: "#ffffff", fontWeight: 700 }}>파일</span>
              {["편집", "선택", "보기", "이동", "실행", "터미널", "도움말"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <div style={{ flex: "1 1 0" }} />
          </div>
        </AppWindow>
      </div>

      <MenuBox x={illoX + 16} y={illoY + menuBarH} width={dropdownW}>
        {dropdownItems.map((label, i) => (
          <MenuRow key={label} label={label} hot={i === hotIndex} />
        ))}
      </MenuBox>

      <div style={{ position: "absolute", left: dialogX, top: dialogY, width: dialogW, height: dialogH, background: "#f3f3f3", border: `1px solid ${COLORS.line}`, borderRadius: 8, boxShadow: "0 18px 40px rgba(16,17,19,0.28)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ height: 40, flex: "0 0 40px", display: "flex", alignItems: "center", padding: "0 16px", background: "#e9e9e9", borderBottom: `1px solid ${COLORS.line}`, fontFamily: FONTS.display, fontWeight: 600, fontSize: 16, color: COLORS.ink }}>
          폴더 찾아보기
        </div>
        <div style={{ flex: "1 1 0", background: "#ffffff", padding: "14px 18px", display: "flex", flexDirection: "column", gap: 4, fontFamily: FONTS.body, fontSize: 17, color: COLORS.ink2 }}>
          <span>다운로드</span>
          <span style={{ paddingLeft: 22, background: COLORS.accentWash, borderRadius: 6, padding: "6px 10px", color: COLORS.accentDeep, fontWeight: 700, display: "inline-block", width: "fit-content" }}>
            agent1
          </span>
        </div>
        <div style={{ height: 70, flex: "0 0 70px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14, padding: "0 24px", borderTop: `1px solid ${COLORS.line}` }}>
          <div style={{ width: 100, height: btnH, borderRadius: 6, border: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.display, fontSize: 16, color: COLORS.ink2 }}>취소</div>
          <div style={{ width: btnW, height: btnH, borderRadius: 6, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, color: "#ffffff" }}>폴더 선택</div>
        </div>
      </div>

      <FocusBadge number={1} x={badge1.x} y={badge1.y} size={34} />
      <FocusBadge number={2} x={badge2.x} y={badge2.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "File → Open Folder", body: "메뉴에서 폴더 열기(Open Folder...)를 누른다." },
          { number: 2, head: "agent1 선택 후 폴더 선택", body: "만들어둔 agent1 폴더를 골라 연다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · Ctrl+J로 터미널 열기 (chat 창 닫고 터미널만 쓴다)
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, 480);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const chatW = 340;
  const chatLeft = windowNative.w - chatW;
  const closeSpot = { x: chatLeft + chatW - 26, y: WINDOW_HEADER_H + 17 };
  const keycapW = 168;
  const keycapH = 56;
  const keycapSpot = { x: chatLeft / 2, y: windowNative.h - 90 };
  const keycapBadge = { x: keycapSpot.x + keycapW / 2 - 14, y: keycapSpot.y - keycapH / 2 + 14 };

  const b1 = toFrame(closeSpot);
  const b2 = toFrame(keycapBadge);

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="Ctrl+J 로 터미널 열기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <div style={{ position: "relative", width: windowNative.w, height: windowNative.h }}>
            <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={[]} showTerminal={false} mainMode="empty" />

            <div style={{ position: "absolute", left: chatLeft, top: WINDOW_HEADER_H, width: chatW, height: windowNative.h - WINDOW_HEADER_H, background: DARK.sidebarBg, borderLeft: `1px solid ${DARK.border}`, display: "flex", flexDirection: "column" }}>
              <div style={{ height: 40, flex: "0 0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", borderBottom: `1px solid ${DARK.border}` }}>
                <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 14, color: "#e8eaec" }}>채팅</span>
                <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: DARK.textMuted, lineHeight: 1 }}>×</span>
              </div>
              <div style={{ flex: "1 1 0", padding: 16, fontFamily: FONTS.body, fontSize: 14, color: DARK.textMuted }}>무엇을 도와드릴까요?</div>
            </div>

            <div style={{ position: "absolute", left: keycapSpot.x - keycapW / 2, top: keycapSpot.y - keycapH / 2, width: keycapW, height: keycapH, borderRadius: 10, background: DARK.menuBg, border: `2px solid ${COLORS.accent}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: FONTS.term, fontWeight: 700, fontSize: 20, color: "#ffffff" }}>
              <span>Ctrl</span>
              <span style={{ color: DARK.textMuted }}>+</span>
              <span>J</span>
            </div>
          </div>
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={32} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={36} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "채팅 창의 X 눌러 닫기", body: "오른쪽에 열려 있는 채팅 패널을 닫는다." },
          { number: 2, head: "Ctrl + J 로 터미널 열기", body: "이 단축키를 누르면 하단에 터미널 패널이 열린다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · 터미널 패널 오른쪽 배치 (앞으로 이 세팅으로 진행)
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, 560);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const TERM_H = 260;
  const tabLeft = ACTIVITY_W + SIDEBAR_W + 14;
  const tabTop = windowNative.h - TERM_H + 8;

  const menuW = 260;
  const menuX = tabLeft + 20;
  const menuY = tabTop + 20;
  const menuItems = ["터미널 이동", "패널 위치", "터미널 종료"];
  const hotIndex = 1;

  const submenuW = 150;
  const submenuX = menuX + menuW - 4;
  const submenuOffsetY = 8 + hotIndex * 34;
  const submenuY = menuY + submenuOffsetY;
  const submenuItems = ["위", "아래", "왼쪽", "오른쪽"];
  const subHotIndex = 3;

  const b1 = toFrame({ x: menuX + menuW - 24, y: menuY + 8 + hotIndex * 34 + 17 });
  const b2 = toFrame({ x: submenuX + submenuW - 24, y: submenuY + 8 + subHotIndex * 34 + 17 });

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="터미널 패널 오른쪽 배치">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <div style={{ position: "relative", width: windowNative.w, height: windowNative.h }}>
            <VSCodeScreen
              width={windowNative.w}
              height={windowNative.h}
              explorerNodes={[]}
              layout="bottom"
              showTerminal
              terminalLines={[{ type: "input", text: "" }]}
              mainMode="empty"
            />
            <MenuBox x={menuX} y={menuY} width={menuW}>
              {menuItems.map((label, i) => (
                <MenuRow key={label} label={label} hot={i === hotIndex} />
              ))}
            </MenuBox>
            <MenuBox x={submenuX} y={submenuY} width={submenuW}>
              {submenuItems.map((label, i) => (
                <MenuRow key={label} label={label} hot={i === subHotIndex} />
              ))}
            </MenuBox>
          </div>
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "터미널 탭 글자 우클릭", body: "터미널 패널 위쪽의 '터미널' 글자를 오른쪽 클릭한다." },
          { number: 2, head: "패널 위치 → 오른쪽", body: "앞으로 이 세팅(오른쪽 패널)으로 계속 진행한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · Claude Code 설치 (터미널에 설치 명령어 입력)
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const lineH = 22;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const badgeY = contentTop + 10 + lineH / 2;
  const b1 = toFrame({ x: badgeX, y: badgeY });

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="Claude Code 설치">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={
              <div
                style={{
                  padding: `10px 16px 10px ${16 + BADGE_GUTTER}px`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  fontFamily: FONTS.term,
                  fontSize: TERM_FONT_SIZE,
                  lineHeight: 1.5,
                }}
              >
                <div style={{ whiteSpace: "pre-wrap", color: "#e8eaec" }}>
                  <span style={{ color: "#767c81" }}>{"PS C:\\agent1> "}</span>
                  irm https://claude.ai/install.ps1 | iex
                </div>
              </div>
            }
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "설치 명령어 입력 후 Enter", body: "irm https://claude.ai/install.ps1 | iex 를 입력한다." },
          { number: "!", head: "설치 완료 대기", body: "여러 줄의 로그가 지나가고, 오류 없이 다시 프롬프트가 보이면 끝난 것이다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · PATH 자동 등록 확인 (claude --version 으로 설치를 확인)
// ------------------------------------------------------------------------------------------------

const Slide08: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const lineH = 22;
  const row1Y = 10;
  const row2Y = row1Y + lineH + 10;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + row2Y + lineH / 2 });

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="PATH 자동 등록 확인">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={
              <div
                style={{
                  position: "relative",
                  padding: `10px 16px 10px ${16 + BADGE_GUTTER}px`,
                  fontFamily: FONTS.term,
                  fontSize: TERM_FONT_SIZE,
                  lineHeight: `${lineH}px`,
                }}
              >
                <div style={{ position: "absolute", left: 16 + BADGE_GUTTER, top: row1Y, whiteSpace: "pre-wrap", color: "#e8eaec" }}>
                  <span style={{ color: "#767c81" }}>{"PS C:\\agent1> "}</span>
                  claude --version
                </div>
                <div style={{ position: "absolute", left: 16 + BADGE_GUTTER, top: row2Y, whiteSpace: "pre-wrap", color: "#e8eaec" }}>
                  <span style={{ color: COLORS.accent, fontWeight: 700 }}>{"✓ "}</span>
                  claude 사용 가능 — 2.1.274 (Claude Code)
                </div>
              </div>
            }
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "claude --version 입력", body: "PATH 등록이 끝났는지 확인하는 명령이다." },
          { number: 2, head: "등록 완료 확인", body: "안 보이면 VS Code 를 완전히 껐다가 다시 연다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 09 · claude 실행 (처음 실행하면 시작 화면이 뜬다)
// ------------------------------------------------------------------------------------------------

const Slide09: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const termLayout = layoutClaudeCodeTerminal({ width: termW, showLaunch: true, showWelcome: true, turns: [], fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const launchSpot = { x: badgeX, y: contentTop + (termLayout.launchY ?? 0) + termLayout.lineH / 2 };
  const welcomeSpot = { x: badgeX, y: contentTop + (termLayout.welcomeY ?? 0) + (termLayout.welcomeH ?? 0) / 2 };
  const b1 = toFrame(launchSpot);
  const b2 = toFrame(welcomeSpot);

  return (
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="claude 실행">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} showLaunch showWelcome turns={[]} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "claude 입력 후 Enter", body: "설치가 끝나면 PATH가 자동 등록되고, claude 명령을 바로 쓸 수 있다." },
          { number: 2, head: "실행 성공 확인", body: "Welcome to Claude Code! 박스가 보이면 정상 실행된 것이다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 10 · /login 으로 다시 로그인
// ------------------------------------------------------------------------------------------------

const Slide10: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const termLayout = layoutClaudeCodeTerminal({ width: termW, showWelcome: true, turns: [], inputText: "/login", fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const inputSpot = { x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 };
  const b1 = toFrame(inputSpot);

  return (
    <SlideFrame index={10} total={TOTAL} eyebrow={EYEBROW} title="/login 으로 다시 로그인">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} showWelcome turns={[]} inputText="/login" fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[{ number: 1, head: "/login 입력 후 Enter", body: "브라우저가 열리면 본인 계정으로 다시 로그인한다." }]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 11 · 브라우저에서 계정 선택 (Google 계정 선택 후 연결 완료까지 대기)
// ------------------------------------------------------------------------------------------------

const Slide11: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const headH = windowHeaderHeight(illoW, illoH);

  const urlBarH = 44;
  const contentTop = illoY + headH + urlBarH;
  const rowW = illoW - 200;
  const rowX = illoX + 100;
  const rowH = 62;
  const row1Y = contentTop + 96;
  const row2Y = row1Y + rowH + 16;
  const badge1 = { x: rowX + rowW - 20, y: row1Y + 16 };

  return (
    <SlideFrame index={11} total={TOTAL} eyebrow={EYEBROW} title="브라우저에서 계정 선택">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <AppWindow width={illoW} height={illoH} os="windows" theme="light" title="claude.ai/login — Chrome" enter="none" float={false}>
          <div style={{ position: "absolute", left: 0, top: headH, width: illoW, height: urlBarH, background: COLORS.paper, borderBottom: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", padding: "0 20px" }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${COLORS.ink3}`, marginRight: 10 }} />
            <span style={{ fontFamily: FONTS.term, fontSize: 16, color: COLORS.ink2 }}>claude.ai/login</span>
          </div>
          <div style={{ position: "absolute", left: illoX ? 0 : 0, top: headH + urlBarH, width: illoW, height: illoH - headH - urlBarH, background: COLORS.paper2, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ marginTop: 56, fontFamily: FONTS.display, fontWeight: 700, fontSize: 30, color: COLORS.ink }}>Google 계정으로 계속하기</div>

            <div style={{ position: "absolute", left: 100, top: row1Y - contentTop, width: rowW, height: rowH, borderRadius: 10, background: COLORS.accentWash, border: `2px solid ${COLORS.accent}`, display: "flex", alignItems: "center", padding: "0 24px" }}>
              <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: COLORS.accentDeep }}>내 계정 · you@gmail.com</span>
            </div>
            <div style={{ position: "absolute", left: 100, top: row2Y - contentTop, width: rowW, height: rowH, borderRadius: 10, background: COLORS.paper2, border: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", padding: "0 24px" }}>
              <span style={{ fontFamily: FONTS.display, fontWeight: 500, fontSize: 22, color: COLORS.ink2 }}>다른 계정 사용</span>
            </div>
          </div>
        </AppWindow>
      </div>

      <FocusBadge number={1} x={badge1.x} y={badge1.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "본인 계정 선택", body: "수업용이 아닌 내 계정을 클릭한다." },
          { number: 2, head: "연결 완료까지 대기", body: "창을 닫지 말고 터미널로 돌아올 때까지 기다린다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 12 · /model sonnet 입력
// ------------------------------------------------------------------------------------------------

const Slide12: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const turns: ClaudeCodeTurn[] = [
    { role: "user", text: "/model sonnet" },
    { role: "assistant", text: "Sonnet 모델로 전환했어요." },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const userSpot = { x: badgeX, y: contentTop + termLayout.turns[0].anchorY + termLayout.lineH / 2 };
  const assistantSpot = { x: badgeX, y: contentTop + termLayout.turns[1].anchorY + termLayout.lineH / 2 };
  const b1 = toFrame(userSpot);
  const b2 = toFrame(assistantSpot);

  return (
    <SlideFrame index={12} total={TOTAL} eyebrow={EYEBROW} title="/model sonnet 입력">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={termW} turns={turns} fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "/model sonnet 입력", body: "오늘 실습에는 Sonnet 이면 충분하고, 속도도 더 빠르다." },
          { number: 2, head: "전환 확인", body: "모델이 바뀌었다는 답을 확인한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 13 · /ide 로 연동 끊기 (vscode 가 연결돼 있으면 방향키로 none 선택)
// ------------------------------------------------------------------------------------------------

const Slide13: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const gutterLeft = 60;

  const ideContent = (
    <div style={{ position: "relative", width: termW, height: 170, fontFamily: FONTS.term, fontSize: TERM_FONT_SIZE }}>
      <div style={{ position: "absolute", left: gutterLeft, top: 10, color: "#767c81", whiteSpace: "pre" }}>
        {"> "}
        <span style={{ color: "#e8eaec" }}>/ide</span>
      </div>
      <div style={{ position: "absolute", left: gutterLeft, top: 46, width: termW - gutterLeft - 16, border: `1px solid ${DARK.inputBorder}`, borderRadius: 6, overflow: "hidden" }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 14px", color: DARK.textMuted }}>vscode (연결됨)</div>
        <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 14px", background: "rgba(18, 115, 196, 0.25)", color: "#e8eaec", fontWeight: 700 }}>{"❯ none"}</div>
      </div>
      <div style={{ position: "absolute", left: gutterLeft, top: 46 + 88 + 10, color: "#5b5e61", fontSize: 13 }}>↑↓ 이동 · Enter 선택</div>
    </div>
  );

  const b1 = toFrame({ x: paneLeft + gutterLeft - 20, y: contentTop + 46 + 22 });
  const b2 = toFrame({ x: paneLeft + gutterLeft - 20, y: contentTop + 46 + 44 + 22 });

  return (
    <SlideFrame index={13} total={TOTAL} eyebrow={EYEBROW} title="/ide 로 연동 끊기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={ideContent}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "vscode 연결 상태 표시", body: "이미 연결(연결됨)된 상태로 표시된다." },
          { number: 2, head: "아래 방향키로 none 선택 후 Enter", body: "vscode 연결을 해제해 둔다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 14 · 준비 완료 (오늘 세팅 체크리스트 — 이제 CLAUDE.md 로 넘어간다)
// ------------------------------------------------------------------------------------------------

const Slide14: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus } = windowGeometry(illoW, illoH, TERM_WINDOW_H);

  return (
    <SlideFrame index={14} total={TOTAL} eyebrow={EYEBROW} title="준비 완료">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[{ name: ".claude", kind: "folder", depth: 0 }, { name: "CLAUDE.md", kind: "file", depth: 1 }]}
            layout="right"
            terminalWidth={rightTermWidth(windowNative)}
            showTerminal
            terminalContent={<ClaudeCodeTerminal width={rightTermWidth(windowNative)} showWelcome turns={[]} placeholder="무엇을 도와드릴까요?" fontSize={TERM_FONT_SIZE} leftGutter={BADGE_GUTTER} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "agent1 폴더 생성 및 열기", body: "터미널은 오른쪽 배치로 열려 있다." },
          { number: 2, head: "Claude Code 설치·실행 확인", body: "/login 완료, /model sonnet 설정." },
          { number: 3, head: "/ide 로 연동 해제", body: "이제 CLAUDE.md 파일을 만들어 본다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S2_REVIEW: SlideEntry[] = [
  { index: 1, name: "Claude_에이전트_메모리와_파일_폴더_제어", title: "Claude 에이전트 메모리와 파일/폴더 제어", render: () => React.createElement(Slide01) },
  { index: 2, name: "복습_지난_시간", title: "지난 시간에 한 것", render: () => React.createElement(Slide02) },
  { index: 3, name: "복습_agent1_폴더", title: "agent1 폴더 만들기", render: () => React.createElement(Slide03) },
  { index: 4, name: "복습_폴더_열기", title: "작업 폴더 열기", render: () => React.createElement(Slide04) },
  { index: 5, name: "복습_터미널_열기", title: "Ctrl+J 로 터미널 열기", render: () => React.createElement(Slide05) },
  { index: 6, name: "복습_패널_우측", title: "터미널 패널 오른쪽 배치", render: () => React.createElement(Slide06) },
  { index: 7, name: "복습_claude_설치", title: "Claude Code 설치", render: () => React.createElement(Slide07) },
  { index: 8, name: "복습_PATH_자동등록", title: "PATH 자동 등록 확인", render: () => React.createElement(Slide08) },
  { index: 9, name: "복습_claude_실행", title: "claude 실행", render: () => React.createElement(Slide09) },
  { index: 10, name: "복습_login", title: "/login 으로 다시 로그인", render: () => React.createElement(Slide10) },
  { index: 11, name: "복습_계정_선택", title: "브라우저에서 계정 선택", render: () => React.createElement(Slide11) },
  { index: 12, name: "복습_model_sonnet", title: "/model sonnet 입력", render: () => React.createElement(Slide12) },
  { index: 13, name: "복습_ide_none", title: "/ide 로 연동 끊기", render: () => React.createElement(Slide13) },
  { index: 14, name: "복습_준비_완료", title: "준비 완료", render: () => React.createElement(Slide14) },
];

export const S2_REVIEW_PART: PartSpec = { id: "s2-review", eyebrow: EYEBROW, entries: S2_REVIEW };
