// step02 "지난 시간 복습" — 10-slide recap, mapped 1:1 to the CEO's lesson outline
// (ai-agent-class/_drafts/basic_step02_outline.md, section "1. 지난시간 복습"). Every bullet under that
// heading becomes exactly one slide, in outline order — no cover/summary slide (the heading itself is a
// plain label, not a "...란?" question like claudemd's section 2, so no part-cover slide here).
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { Camera, cameraView } from "../core/Camera";
import { AppWindow, windowHeaderHeight } from "../core/AppWindow";
import { FileIcon } from "../core/glyphs";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "지난 시간 복습";
const TOTAL = 10;

const WINDOW_HEADER_H = 34; // NATIVE.windowHeader — AppWindow's own native title bar height.
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // reserved left inset inside the terminal so a badge sits inside the panel.
const TERM_WINDOW_H = 620; // taller native window for terminal-focused slides (06-10).

// Dark chrome tones shared by the menu/dialog mockups below (mirrors VSCodeScreen's own VSCODE_DARK /
// ClaudeCodeTerminal's own TERM_DARK — those consts are file-private, so the literal values are repeated
// here rather than imported).
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

// ------------------------------------------------------------------------------------------------
// Shared L21-style helper (copied from step02-claudemd.tsx — each part spec owns its own copy so
// workers never touch each other's files): an 8-col VSCodeScreen (camera-zoomed) + a 4-col
// AnnotationColumn.
// ------------------------------------------------------------------------------------------------

function windowGeometry(illoW: number, illoH: number, windowH = 480) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

function rightTermWidth(windowNative: { w: number }, mainMode: "empty" | "editor" = "empty"): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  const frac = mainMode === "empty" ? 0.84 : 0.62;
  return Math.round(contentW * frac);
}

// Small reusable dark menu row (VS Code context/menu-bar look) — used by slides 03 and 05.
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
// 01 · vscode 설치
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const headH = windowHeaderHeight(illoW, illoH);
  const border = 3;
  const contentTop = illoY + headH + border;

  const iconSize = 108;
  const iconY = contentTop + 74;
  const iconX = illoX + illoW / 2 - iconSize / 2;
  const titleY = iconY + iconSize + 34;
  const descY = titleY + 66;
  const buttonsY = descY + 74;
  const btnH = 68;
  const installW = 220;
  const cancelW = 160;
  const gapBtn = 20;
  const totalBtnW = installW + gapBtn + cancelW;
  const btnX = illoX + illoW / 2 - totalBtnW / 2;
  const installBadge = { x: btnX + installW - 16, y: buttonsY + 14 }; // top-right corner, off the label text

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="VS Code 설치">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <AppWindow width={illoW} height={illoH} os="windows" theme="light" title="Visual Studio Code Setup" enter="none" float={false} />
      </div>

      <div style={{ position: "absolute", left: iconX, top: iconY, width: iconSize, height: iconSize, borderRadius: 24, background: COLORS.accentWash, border: `3px solid ${COLORS.accentDeep}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 40, color: COLORS.accentDeep }}>VS</span>
      </div>

      <div style={{ position: "absolute", left: illoX, top: titleY, width: illoW, textAlign: "center", fontFamily: FONTS.display, fontWeight: 700, fontSize: 40, color: COLORS.ink }}>
        Visual Studio Code 설치
      </div>
      <div style={{ position: "absolute", left: illoX + illoW / 2 - 430, top: descY, width: 860, textAlign: "center", fontFamily: FONTS.body, fontWeight: 500, fontSize: 26, color: COLORS.ink2, wordBreak: "keep-all" }}>
        다운로드한 설치 파일을 실행하고, 안내에 따라 진행한 뒤 Install 버튼을 누른다.
      </div>

      <div style={{ position: "absolute", left: btnX, top: buttonsY, width: installW, height: btnH, borderRadius: 10, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(18,115,196,0.3)" }}>
        <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: "#ffffff" }}>Install</span>
      </div>
      <div style={{ position: "absolute", left: btnX + installW + gapBtn, top: buttonsY, width: cancelW, height: btnH, borderRadius: 10, border: `2px solid ${COLORS.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 24, color: COLORS.ink2 }}>Cancel</span>
      </div>

      <FocusBadge number={1} x={installBadge.x} y={installBadge.y} size={30} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[{ number: 1, head: "Install까지 눌러 설치", body: "다운로드한 설치 파일을 실행하고 안내에 따라 Install까지 마친다." }]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · 다운로드/바탕화면에 'agent1' 폴더 만들기
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
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
  const submenuOffsetY = 8 + 3 * 34; // aligned with "새로 만들기" row (4th row, index 3)
  const submenuY = menuY + submenuOffsetY;

  const badge1 = { x: submenuX + submenuW - 24, y: submenuY + 8 + 22 }; // "폴더" row (row 0 of submenu) — right edge, clear of the label text
  const badge2 = { x: colLeft + iconSize - 6, y: rows[2] + 4 };

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="'agent1' 폴더 만들기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, background: COLORS.void, boxShadow: "0 18px 40px rgba(16,17,19,0.10)", overflow: "hidden" }}>
        {[
          { y: rows[0], label: "문서", kind: "doc" as const },
          { y: rows[1], label: "사진", kind: "photo" as const },
        ].map((it) => (
          <div key={it.label} style={{ position: "absolute", left: 60, top: it.y - illoY, width: 96, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <FileIcon kind={it.kind} size={iconSize} />
            <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 18, color: "#e8eaec" }}>{it.label}</span>
          </div>
        ))}

        {/* new folder, mid-rename */}
        <div style={{ position: "absolute", left: 60, top: rows[2] - illoY, width: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <FileIcon kind="folder" size={iconSize} />
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
          { number: 1, head: "우클릭 → 새로 만들기 → 폴더", body: "다운로드나 바탕화면 빈 곳에서 마우스 오른쪽 버튼을 클릭한다." },
          { number: 2, head: "이름 agent1 입력 후 Enter", body: "영문 소문자로 정확히 입력한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · 작업 폴더 열기 (File → Open Folder → agent1)
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const menuBarH = 34;

  const dropdownW = 260;
  const dropdownItems = ["새 텍스트 파일", "폴더 열기...", "최근 항목 열기", "저장", "종료"];
  const hotIndex = 1;
  const badge1 = { x: illoX + 16 + dropdownW - 24, y: illoY + menuBarH + 8 + hotIndex * 34 + 17 }; // right edge of the row, clear of "폴더 열기..." text

  const dialogW = 460;
  const dialogH = 340;
  const dialogX = illoX + illoW - dialogW - 40;
  const dialogY = illoY + illoH - dialogH - 40;
  const btnW = 130;
  const btnH = 46;
  const footerTop = dialogY + dialogH - 70;
  const btnTop = footerTop + (70 - btnH) / 2;
  const btnRight = dialogX + dialogW - 24;
  const badge2 = { x: btnRight - 16, y: btnTop + 14 }; // top-right corner of "폴더 선택", off the label text

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="작업 폴더 열기">
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

      {/* OS folder-picker dialog (light chrome — this is a Windows dialog, not VS Code chrome) */}
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
// 04 · chat 창 닫고 ctrl+j 로 터미널 열기
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
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
  const keycapBadge = { x: keycapSpot.x + keycapW / 2 - 14, y: keycapSpot.y - keycapH / 2 + 14 }; // top-right corner, off the "Ctrl+J" label

  const b1 = toFrame(closeSpot);
  const b2 = toFrame(keycapBadge);

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="chat 창 닫고 터미널 열기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <div style={{ position: "relative", width: windowNative.w, height: windowNative.h }}>
            <VSCodeScreen width={windowNative.w} height={windowNative.h} explorerNodes={[]} showTerminal={false} mainMode="empty" />

            {/* chat panel mock (VSCodeScreen has no chat-panel prop — this overlay reuses its own dark tones) */}
            <div style={{ position: "absolute", left: chatLeft, top: WINDOW_HEADER_H, width: chatW, height: windowNative.h - WINDOW_HEADER_H, background: DARK.sidebarBg, borderLeft: `1px solid ${DARK.border}`, display: "flex", flexDirection: "column" }}>
              <div style={{ height: 40, flex: "0 0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", borderBottom: `1px solid ${DARK.border}` }}>
                <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 14, color: "#e8eaec" }}>채팅</span>
                <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: DARK.textMuted, lineHeight: 1 }}>×</span>
              </div>
              <div style={{ flex: "1 1 0", padding: 16, fontFamily: FONTS.body, fontSize: 14, color: DARK.textMuted }}>무엇을 도와드릴까요?</div>
            </div>

            {/* Ctrl+J keycap */}
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
// 05 · 터미널 우클릭 → Panel Position → Right 설정 (앞으로 이 세팅으로 진행)
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
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

  const b1 = toFrame({ x: menuX + menuW - 24, y: menuY + 8 + hotIndex * 34 + 17 }); // right edge, clear of "위치" text
  const b2 = toFrame({ x: submenuX + submenuW - 24, y: submenuY + 8 + subHotIndex * 34 + 17 }); // right edge, clear of "오른쪽" text

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="터미널 패널 위치를 오른쪽으로">
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
// 06 · 터미널에 클로드 코드 설치 명령어 입력 (panel position = right, 이제부터 고정)
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => {
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
  // Badge sits in a reserved left gutter INSIDE the terminal's own left padding (same BADGE_GUTTER
  // pattern Slide07-10 use via ClaudeCodeTerminal's `leftGutter` prop), so it never covers the
  // "PS C:\agent1>" prompt text. This slide predates Claude Code being installed, so it still renders
  // the plain PowerShell line itself (not <ClaudeCodeTerminal>, which draws the Claude Code REPL input
  // box) — the custom terminalContent below reproduces VSCodeScreen's plain-line styling with the
  // gutter added to its left padding.
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const badgeY = contentTop + 10 + lineH / 2;
  const b1 = toFrame({ x: badgeX, y: badgeY });

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="Claude Code 설치 명령어 입력">
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
          { number: "!", head: "설치가 끝날 때까지 기다리기", body: "설치 완료 메시지가 뜨면 다음 단계로 넘어간다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · 자동 path 등록 후 claude 입력해서 실행
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => {
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
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="claude 실행">
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
          { number: 2, head: "시작 화면이 뜨면 성공", body: "Welcome to Claude Code! 박스가 보이면 정상 실행된 것이다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · /login 입력 → 본인 계정으로 재로그인
// ------------------------------------------------------------------------------------------------

const Slide08: React.FC = () => {
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
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="/login 으로 재로그인">
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
        items={[
          { number: 1, head: "/login 입력 후 Enter", body: "브라우저가 열리면 본인 계정으로 다시 로그인한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 09 · /model sonnet 입력
// ------------------------------------------------------------------------------------------------

const Slide09: React.FC = () => {
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
    <SlideFrame index={9} total={TOTAL} eyebrow={EYEBROW} title="/model sonnet 입력">
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
          { number: 1, head: "/model sonnet 입력", body: "쓸 모델을 Sonnet으로 지정한다." },
          { number: 2, head: "전환 확인", body: "모델이 바뀌었다는 답을 확인한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 10 · /ide 입력 → vscode 선택 중이면 화살표로 none 선택 후 Enter
// ------------------------------------------------------------------------------------------------

const Slide10: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const gutterLeft = 60; // PAD_H(16) + BADGE_GUTTER-ish(44), matches this custom content's own left inset

  const ideContent = (
    <div style={{ position: "relative", width: termW, height: 170, fontFamily: FONTS.term, fontSize: TERM_FONT_SIZE }}>
      <div style={{ position: "absolute", left: gutterLeft, top: 10, color: "#767c81", whiteSpace: "pre" }}>
        {"> "}
        <span style={{ color: "#e8eaec" }}>/ide</span>
      </div>
      <div style={{ position: "absolute", left: gutterLeft, top: 46, width: termW - gutterLeft - 16, border: `1px solid ${DARK.inputBorder}`, borderRadius: 6, overflow: "hidden" }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 14px", color: DARK.textMuted }}>vscode (연결됨)</div>
        <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 14px", background: "rgba(18, 115, 196, 0.25)", color: "#e8eaec", fontWeight: 700 }}>{"❯ None"}</div>
      </div>
      <div style={{ position: "absolute", left: gutterLeft, top: 46 + 88 + 10, color: "#5b5e61", fontSize: 13 }}>↑↓ 이동 · Enter 선택</div>
    </div>
  );

  const b1 = toFrame({ x: paneLeft + gutterLeft - 20, y: contentTop + 46 + 22 });
  const b2 = toFrame({ x: paneLeft + gutterLeft - 20, y: contentTop + 46 + 44 + 22 });

  return (
    <SlideFrame index={10} total={TOTAL} eyebrow={EYEBROW} title="/ide 로 연결 해제">
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
          { number: 1, head: "/ide 입력 시 vscode가 선택돼 있으면", body: "이미 연결(connected)된 상태로 표시된다." },
          { number: 2, head: "아래 방향키로 None 선택 후 Enter", body: "vscode 연결을 해제해 둔다." },
        ]}
      />
    </SlideFrame>
  );
};

export const STEP02_REVIEW: SlideEntry[] = [
  { index: 1, name: "01_지난시간_복습_vscode_설치", title: "VS Code 설치", render: () => React.createElement(Slide01) },
  { index: 2, name: "02_지난시간_복습_agent1_폴더", title: "'agent1' 폴더 만들기", render: () => React.createElement(Slide02) },
  { index: 3, name: "03_지난시간_복습_작업폴더_열기", title: "작업 폴더 열기", render: () => React.createElement(Slide03) },
  { index: 4, name: "04_지난시간_복습_터미널_열기", title: "chat 창 닫고 터미널 열기", render: () => React.createElement(Slide04) },
  { index: 5, name: "05_지난시간_복습_패널_오른쪽", title: "터미널 패널 위치를 오른쪽으로", render: () => React.createElement(Slide05) },
  { index: 6, name: "06_지난시간_복습_claude_설치", title: "Claude Code 설치 명령어 입력", render: () => React.createElement(Slide06) },
  { index: 7, name: "07_지난시간_복습_claude_실행", title: "claude 실행", render: () => React.createElement(Slide07) },
  { index: 8, name: "08_지난시간_복습_login", title: "/login 으로 재로그인", render: () => React.createElement(Slide08) },
  { index: 9, name: "09_지난시간_복습_model_sonnet", title: "/model sonnet 입력", render: () => React.createElement(Slide09) },
  { index: 10, name: "10_지난시간_복습_ide_none", title: "/ide 로 연결 해제", render: () => React.createElement(Slide10) },
];

export const STEP02_REVIEW_PART: PartSpec = { id: "review", eyebrow: EYEBROW, entries: STEP02_REVIEW };
