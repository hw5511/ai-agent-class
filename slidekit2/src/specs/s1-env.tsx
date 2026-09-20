// s1-env — basic 1회차 슬라이드 9~15 (7장), "개발 환경 준비".
// Rebuilt from the shipped deck (ai-agent-class/assets/basic/step01/*.svg) + courses/basic/step01.json.
// Real VS Code screens use the shared VSCodeScreen (always dark, layout="right"); the two slides before
// VS Code is even open (설치, 폴더 만들기) are hand-drawn vector mockups of the OS/browser instead.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode, type TerminalPaneLine } from "../VSCodeScreen";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS, RADIUS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "개발 환경";
const TOTAL = 7;

const WINDOW_HEADER_H = 34;
const TERM_WINDOW_H = 620;

// Same helpers step02-claudemd/step02-sample use — an 8-col camera-zoomed VS Code screen + a 4-col
// AnnotationColumn (local copies; this file never imports from another spec file).
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

// A generic browser chrome (tab + address bar) — local copy of step02-bash.tsx's ChromeBrowserWindow
// pattern, used only for the "설치 파일 받기" mockup (slide 2), never a real product screen.
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

// A keyboard keycap glyph (Ctrl / J / Cmd), used only by slide 5's shortcut illustration.
const KeyCap: React.FC<{ label: string; w?: number }> = ({ label, w = 96 }) => (
  <div
    style={{
      width: w,
      height: 74,
      borderRadius: 12,
      background: COLORS.paper2,
      border: `2px solid ${COLORS.ink2}`,
      borderBottom: `5px solid ${COLORS.ink2}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONTS.display,
      fontWeight: 700,
      fontSize: 28,
      color: COLORS.ink,
    }}
  >
    {label}
  </div>
);

// ------------------------------------------------------------------------------------------------
// 1 · 오늘_완성할_환경 — VS Code에서 CLI 3종 실습
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const termW = rightTermWidth(windowNative);

  const explorerNodes: ExplorerNode[] = [
    { name: "brief.md", kind: "file", depth: 0 },
    { name: "introduce", kind: "folder", depth: 0 },
    { name: "gemini.txt", kind: "file", depth: 1 },
    { name: "gpt.txt", kind: "file", depth: 1 },
    { name: "claude.txt", kind: "file", depth: 1 },
  ];

  const terminalLines: TerminalPaneLine[] = [
    { type: "output", text: "PS C:\\Users\\student\\에이전트1>" },
    { type: "output", text: "# 여기서 설치 명령과 CLI 실행 명령을 입력합니다" },
  ];

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="VS Code에서 CLI 3종 실습">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            windowTitle="에이전트1 — Visual Studio Code"
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalLines={terminalLines}
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
          { number: 1, head: "Antigravity — agy", body: "대화하고 파일을 만들고 옮겨본다." },
          { number: 2, head: "Codex — codex", body: "같은 작업을 다시 요청하고 비교한다." },
          { number: 3, head: "Claude Code — claude", body: "같은 폴더와 실습 결과를 이어서 쓴다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 2 · VS_Code_설치 — 공식 사이트에서 다운로드
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(8);
  const browserY = BODY_Y + 10;
  const browserH = 560;

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="VS Code 설치">
      <BrowserWindow x={illoX} y={browserY} width={illoW} height={browserH} tabLabel="Visual Studio Code" url="code.visualstudio.com/download">
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
          <div style={{ width: 96, height: 96, borderRadius: 22, background: COLORS.accentWash, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={48} height={48} viewBox="0 0 48 48">
              <path d="M34 4 12 24 34 44 44 38V10Z" fill="none" stroke={COLORS.accentDeep} strokeWidth={2.4} strokeLinejoin="round" />
              <path d="M4 18v12l12-6Z" fill={COLORS.accentDeep} />
            </svg>
          </div>
          <div
            style={{
              padding: "20px 48px",
              borderRadius: RADIUS.inner + 6,
              background: COLORS.accent,
              color: "#ffffff",
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: 26,
            }}
          >
            Download for Windows
          </div>
          <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 18, color: COLORS.ink3 }}>macOS · Linux 버전도 같은 페이지에서 받을 수 있습니다</div>
        </div>
      </BrowserWindow>

      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "VS Code 소개", body: "코드 편집기이지만 비개발자도 생성된 파일 확인·수정·폴더 관리에 활용한다." },
          { number: 2, head: "code.visualstudio.com 접속", body: "Download for Windows 클릭 후 설치 파일을 실행한다." },
          { number: 3, head: "설치 완료 확인", body: "VS Code 실행을 확인하고 다음 슬라이드에서 작업 폴더를 설정한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 3 · VS_Code_화면_구성 — 좌측 탐색기 / 중앙 편집기 / 우측 터미널 패널
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const termW = rightTermWidth(windowNative, "editor");
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = [
    { name: "brief.md", kind: "file", depth: 0 },
    { name: "introduce", kind: "folder", depth: 0 },
    { name: "gemini.txt", kind: "file", depth: 1 },
    { name: "gpt.txt", kind: "file", depth: 1 },
    { name: "claude.txt", kind: "file", depth: 1, state: "selected" },
  ];

  const terminalLines: TerminalPaneLine[] = [
    { type: "input", text: "Get-Location" },
    { type: "output", text: "Path: C:\\Users\\student\\에이전트1" },
    { type: "input", text: "agy" },
    { type: "output", text: "● Antigravity CLI (v1.0)" },
    { type: "output", text: "> 무엇을 도와드릴까요? [입력 대기]" },
  ];

  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH;
  const b1 = toFrame({ x: ACTIVITY_W + SIDEBAR_W - 26, y: treeTop + rowH * 0.5 });
  const editorLeft = ACTIVITY_W + SIDEBAR_W;
  const editorW = windowNative.w - ACTIVITY_W - SIDEBAR_W - termW;
  const b2 = toFrame({ x: editorLeft + editorW / 2, y: WINDOW_HEADER_H + 30 });
  const paneLeft = windowNative.w - termW;
  const b3 = toFrame({ x: paneLeft + termW - 20, y: WINDOW_HEADER_H + 12 });

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="VS Code 화면 구성">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            windowTitle="에이전트1 — Visual Studio Code"
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalLines={terminalLines}
            mainMode="editor"
            editorTab={{
              name: "claude.txt",
              lines: ["# AI 에이전트 실습", "안녕하세요. 저는 AI 에이전트입니다.", "질문에 답변하고 파일 조작을 돕습니다", "// 결과 파일은 좌측 탐색기에 생성됩니다.", "실습 명령은 우측 터미널에서 실행합니다."],
            }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={b1.x} y={b1.y} size={34} />
      <FocusBadge number={2} x={b2.x} y={b2.y} size={34} />
      <FocusBadge number={3} x={b3.x} y={b3.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "좌측 탐색기", body: "실습 폴더와 생성된 파일을 확인한다." },
          { number: 2, head: "중앙 편집기", body: "선택한 코드와 문서를 열람·수정한다." },
          { number: 3, head: "우측 패널(터미널)", body: "Panel Position: Right 로 실행한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 4 · 실습_폴더_에이전트1 — 폴더를 만들고 VS Code에서 연다
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(8);
  const pickerY = BODY_Y + 10;
  const pickerH = 560;

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="실습 폴더 에이전트1">
      <div
        style={{
          position: "absolute",
          left: illoX,
          top: pickerY,
          width: illoW,
          height: pickerH,
          borderRadius: 14,
          overflow: "hidden",
          border: `1px solid ${COLORS.line}`,
          boxShadow: "0 18px 40px rgba(16,17,19,0.10)",
          background: COLORS.paper2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ height: 48, flex: "0 0 48px", display: "flex", alignItems: "center", padding: "0 24px", borderBottom: `1px solid ${COLORS.line}`, fontFamily: FONTS.display, fontWeight: 700, fontSize: 20, color: COLORS.ink }}>
          폴더 선택 — File › Open Folder
        </div>
        <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          <svg width={100} height={80} viewBox="0 0 20 16">
            <path
              d="M1 2.4C1 1.6 1.6 1 2.4 1H7.6L9 3H17.6C18.4 3 19 3.6 19 4.4V13.6C19 14.4 18.4 15 17.6 15H2.4C1.6 15 1 14.4 1 13.6Z"
              fill={COLORS.accentWash}
              stroke={COLORS.accent}
              strokeWidth={0.8}
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 30, color: COLORS.ink }}>에이전트1</div>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ fontFamily: FONTS.term, fontSize: 17, color: COLORS.ink3 }}>Windows: C:\Users\student\에이전트1</div>
            <div style={{ fontFamily: FONTS.term, fontSize: 17, color: COLORS.ink3 }}>macOS: ~/에이전트1</div>
          </div>
          <div style={{ padding: "12px 36px", borderRadius: RADIUS.inner + 4, background: COLORS.accent, color: "#ffffff", fontFamily: FONTS.display, fontWeight: 700, fontSize: 20 }}>폴더 선택</div>
        </div>
      </div>

      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "새 폴더 만들기", body: "이름은 '에이전트1'. Windows는 C:\\Users\\student\\에이전트1, macOS는 ~/에이전트1 예시." },
          { number: 2, head: "File → Open Folder", body: "VS Code 메뉴에서 방금 만든 폴더를 연다." },
          { number: 3, head: "작업 기준 폴더", body: "열린 폴더가 에이전트가 파일을 찾고 작업할 기준이 된다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 5 · Ctrl_J로_터미널_열기 — 패널 토글
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const termW = rightTermWidth(windowNative);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = [{ name: "(비어 있음)", kind: "file", depth: 0 }];
  const terminalLines: TerminalPaneLine[] = [{ type: "output", text: "PS C:\\Users\\student\\에이전트1>" }];

  const paneLeft = windowNative.w - termW;
  const b1 = toFrame({ x: paneLeft + termW - 20, y: WINDOW_HEADER_H + 12 });

  const keyY = illoY + illoH - 150;

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="Ctrl+J로 터미널 열기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH - 180, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH - 180} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            windowTitle="에이전트1 — Visual Studio Code"
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalLines={terminalLines}
            mainMode="empty"
          />
        </Camera>
      </div>
      <FocusBadge number={1} x={b1.x} y={Math.min(b1.y, illoY + illoH - 200)} size={34} />

      <div style={{ position: "absolute", left: illoX, top: keyY, width: illoW, display: "flex", alignItems: "center", gap: 20 }}>
        <KeyCap label="Ctrl" w={120} />
        <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 32, color: COLORS.ink3 }}>+</span>
        <KeyCap label="J" w={74} />
        <span style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 22, color: COLORS.ink2, marginLeft: 12, wordBreak: "keep-all" }}>패널(터미널) 열기/닫기 토글 · macOS는 ⌘+J</span>
      </div>

      <AnnotationColumn
        x={colX(8)}
        y={BODY_Y}
        width={colW(4)}
        height={BODY_H}
        items={[
          { number: 1, head: "우측 터미널 패널 확인", body: "Panel Position: Right 로 코드와 터미널을 나란히 본다." },
          { number: 2, head: "PowerShell 프롬프트 확인", body: "패널이 열리면 작업 폴더 경로가 보인다." },
          { number: 3, head: "명령은 터미널에 입력", body: "위쪽 검색창이 아니라 우측 터미널에 입력한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 6 · 터미널과_AI_CLI_상태 — 일반 터미널 vs AI CLI 실행 상태
// ------------------------------------------------------------------------------------------------

const StatePanel: React.FC<{ x: number; width: number; label: string; dark: boolean; lines: Array<{ text: string; tone?: "dim" | "text" | "accent" }>; caption: string }> = ({
  x,
  width,
  label,
  dark,
  lines,
  caption,
}) => {
  const y = BODY_Y + 10;
  const h = 560;
  return (
    <div style={{ position: "absolute", left: x, top: y, width, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 26, color: COLORS.ink }}>{label}</div>
      <div
        style={{
          width,
          height: h - 90,
          borderRadius: 14,
          background: dark ? COLORS.void2 : COLORS.paper2,
          border: `1px solid ${dark ? COLORS.lineDark : COLORS.line}`,
          boxSizing: "border-box",
          padding: "24px 26px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONTS.term,
              fontSize: 20,
              lineHeight: 1.45,
              color: dark ? (l.tone === "accent" ? "#6cc0ff" : l.tone === "dim" ? "#767c81" : "#e8eaec") : l.tone === "dim" ? COLORS.ink3 : COLORS.ink,
              wordBreak: "keep-all",
            }}
          >
            {l.text}
          </div>
        ))}
      </div>
      <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 19, color: COLORS.ink2, wordBreak: "keep-all" }}>{caption}</div>
    </div>
  );
};

const Slide06: React.FC = () => {
  const illoX = colX(0);
  const illoW = colW(12);
  const gap = 60;
  const panelW = (illoW - gap) / 2;

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="터미널과 AI CLI 상태">
      <StatePanel
        x={illoX}
        width={panelW}
        label="일반 터미널 · POWERSHELL"
        dark={false}
        lines={[
          { text: "PS C:\\Users\\student\\에이전트1>", tone: "dim" },
          { text: "agy", tone: "text" },
        ]}
        caption="실행 전에는 경로와 프롬프트가 보인다 — 명령을 입력하는 출발점."
      />
      <StatePanel
        x={illoX + panelW + gap}
        width={panelW}
        label="AI CLI 실행 중 · ANTIGRAVITY CLI"
        dark={true}
        lines={[
          { text: "안녕하세요. 무엇을 도와드릴까요?", tone: "text" },
          { text: "현재 폴더에 자기소개서를 만들어줘", tone: "accent" },
        ]}
        caption="자연어로 요청하고 응답을 확인한다 — 에이전트와 대화하는 화면."
      />

      <div
        style={{
          position: "absolute",
          left: illoX,
          top: BODY_BOTTOM - 70,
          width: illoW,
          textAlign: "center",
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: 24,
          color: COLORS.accentDeep,
          wordBreak: "keep-all",
        }}
      >
        종료 방법 — Ctrl + C 를 누르면 일반 터미널 프롬프트로 돌아온다. 프롬프트가 돌아온 뒤 다음 설치 명령을 입력한다.
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 7 · 터미널_기본_명령어 — echo / clear 를 직접 쳐본다
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const termW = rightTermWidth(windowNative);

  const explorerNodes: ExplorerNode[] = [{ name: "(비어 있음)", kind: "file", depth: 0 }];
  const terminalLines: TerminalPaneLine[] = [
    { type: "input", text: "echo 안녕하세요" },
    { type: "output", text: "안녕하세요" },
    { type: "input", text: "clear" },
    { type: "output", text: "(화면이 비워지고 프롬프트만 남는다)" },
  ];

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="터미널 기본 명령어">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            windowTitle="에이전트1 — Visual Studio Code"
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalLines={terminalLines}
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
          { number: 1, head: "echo — 입력 그대로 출력", body: "한 줄 치고 Enter → 한 줄로 답한다. AI CLI 대화창과 다른 점이다." },
          { number: 2, head: "clear — 화면 초기화", body: "지워지는 것은 화면뿐, 파일·폴더는 사라지지 않는다. Windows는 cls도 가능." },
          { number: 3, head: "다음은 작업 폴더 확인", body: "터미널이 반응하는 것을 확인했으니 이제 설치를 시작한다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S1_ENV: SlideEntry[] = [
  { index: 1, name: "오늘_완성할_환경", title: "VS Code에서 CLI 3종 실습", render: () => React.createElement(Slide01) },
  { index: 2, name: "VS_Code_설치", title: "VS Code 설치", render: () => React.createElement(Slide02) },
  { index: 3, name: "VS_Code_화면_구성", title: "VS Code 화면 구성", render: () => React.createElement(Slide03) },
  { index: 4, name: "실습_폴더_에이전트1", title: "실습 폴더 에이전트1", render: () => React.createElement(Slide04) },
  { index: 5, name: "Ctrl_J로_터미널_열기", title: "Ctrl+J로 터미널 열기", render: () => React.createElement(Slide05) },
  { index: 6, name: "터미널과_AI_CLI_상태", title: "터미널과 AI CLI 상태", render: () => React.createElement(Slide06) },
  { index: 7, name: "터미널_기본_명령어", title: "터미널 기본 명령어", render: () => React.createElement(Slide07) },
];

export const S1_ENV_PART: PartSpec = { id: "s1-env", eyebrow: EYEBROW, entries: S1_ENV };
