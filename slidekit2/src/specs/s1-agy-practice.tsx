// s1-agy-practice — basic 1회차 슬라이드 29~34 (6장), rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step01/agy_*.svg + courses/basic/step01.json parts[5] "Antigravity 실습
// 4단계"). Conversation text, file names (gemini.txt — NOT 자기소개서.txt, verified against the shipped
// SVGs and step01.json) and every prompt come straight from those two sources.
//
// Antigravity has no shared terminal component (ClaudeCodeTerminal is Claude-only — its orange welcome
// box is the one deliberate brand-color exception, plan hard rule). So this file draws Antigravity's own
// agent panel locally: a plain welcome paragraph (no bordered box, matching the shipped screens, which
// never draw one), "> " user lines / "✔ " assistant lines, and the same rounded input box shape
// ClaudeCodeTerminal uses — all in the deck's one blue accent (core/tokens COLORS.accent), never the
// shipped screens' own literal hex (#3b5bdb): tokens only, one chromatic accent everywhere.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "ANTIGRAVITY 실습";
const TOTAL = 6;

const WINDOW_HEADER_H = 34; // AppWindow's native title bar height (core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane's own tab-bar height.
const TERM_FONT_SIZE = 15;
const BADGE_GUTTER = 44; // reserved inside the agy panel so badges never cover its own text.
const TERM_WINDOW_H = 620;

// Same helpers step02-sample.tsx uses for an 8-col camera-zoomed VS Code screen + 4-col AnnotationColumn.
function windowGeometry(illoW: number, illoH: number, windowH = 480) {
  const windowNative = { w: Math.round(windowH * (illoW / illoH)), h: windowH };
  const focus = { x: 0, y: 0, w: windowNative.w, h: windowNative.h };
  const view = cameraView({ w: illoW, h: illoH }, windowNative, focus);
  return { windowNative, focus, view };
}

function rightTermWidth(windowNative: { w: number }, mainMode: "empty" | "editor" = "empty"): number {
  const contentW = windowNative.w - ACTIVITY_W - SIDEBAR_W;
  return Math.round(contentW * (mainMode === "empty" ? 0.5 : 0.42));
}

// ------------------------------------------------------------------------------------------------
// AgyPanel — the Antigravity agent panel content (drops into VSCodeScreen's terminalContent slot).
// ------------------------------------------------------------------------------------------------

interface AgyRow {
  role: "user" | "assistant";
  lines: string[];
}

interface AgyPanelProps {
  width: number;
  cwd?: string;
  welcomeLines?: string[];
  rows?: AgyRow[];
  inputText?: string;
  placeholder?: string;
  leftGutter?: number;
  fontSize?: number;
}

const AGY_DARK = {
  dim: "#767c81",
  text: "#e8eaec",
  muted: "#9a9a9a",
  inputBorder: "#3a3d40",
};

const AGY_PAD_H = 16;
const AGY_PAD_V = 10;

interface AgyPanelLayout {
  totalHeight: number;
  headerY: number;
  headerH: number;
  welcomeY?: number;
  welcomeYs: number[];
  rows: Array<{ role: AgyRow["role"]; ys: number[]; anchorY: number }>;
  inputY: number;
  inputH: number;
  lineH: number;
  padLeft: number;
}

function layoutAgyPanel(props: AgyPanelProps): AgyPanelLayout {
  const { welcomeLines = [], rows = [], fontSize = 15, leftGutter = 0 } = props;
  const lineH = Math.round(fontSize * 1.6);
  const padLeft = AGY_PAD_H + leftGutter;

  let y = AGY_PAD_V;
  const headerY = y;
  const headerH = Math.round(fontSize * 2.6);
  y += headerH + Math.round(lineH * 0.4);

  let welcomeY: number | undefined;
  const welcomeYs: number[] = [];
  if (welcomeLines.length > 0) {
    welcomeY = y;
    welcomeLines.forEach((_, i) => welcomeYs.push(y + i * lineH));
    y += welcomeLines.length * lineH + Math.round(lineH * 0.6);
  }

  const rowLayouts = rows.map((r) => {
    const anchorY = y;
    const ys = r.lines.map((_, i) => y + i * lineH);
    y += r.lines.length * lineH + Math.round(lineH * 0.5);
    return { role: r.role, ys, anchorY };
  });

  const inputBoxPadV = Math.round(fontSize * 0.55);
  const inputH = inputBoxPadV * 2 + lineH;
  const inputY = y;
  y += inputH + AGY_PAD_V;

  return { totalHeight: y, headerY, headerH, welcomeY, welcomeYs, rows: rowLayouts, inputY, inputH, lineH, padLeft };
}

const AgyMark: React.FC<{ size: number }> = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.28),
      background: COLORS.accentWash,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "0 0 auto",
    }}
  >
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 16 16">
      <path d="M8 2L14 13H2Z" fill={COLORS.accent} />
    </svg>
  </div>
);

const AgyPanel: React.FC<AgyPanelProps> = (props) => {
  const { width, cwd = "에이전트1", welcomeLines = [], rows = [], inputText, placeholder, fontSize = 15 } = props;
  const layout = layoutAgyPanel(props);
  const { lineH, padLeft } = layout;
  return (
    <div style={{ position: "relative", width, height: layout.totalHeight, boxSizing: "border-box", fontFamily: FONTS.term, fontSize, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: padLeft, top: layout.headerY, display: "flex", alignItems: "center", gap: 12, height: layout.headerH }}>
        <AgyMark size={layout.headerH} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ color: AGY_DARK.text, fontWeight: 700 }}>Antigravity v0.6</span>
          <span style={{ color: AGY_DARK.muted, fontSize: Math.round(fontSize * 0.8) }}>{cwd}</span>
        </div>
      </div>

      {welcomeLines.map((ln, i) => (
        <div key={i} style={{ position: "absolute", left: padLeft, top: layout.welcomeYs[i], color: AGY_DARK.muted, whiteSpace: "pre", lineHeight: `${lineH}px` }}>
          {ln}
        </div>
      ))}

      {layout.rows.map((r, ri) => {
        const isUser = r.role === "user";
        const prefix = isUser ? "> " : "✔ ";
        const color = isUser ? AGY_DARK.dim : AGY_DARK.text;
        const hangIndent = prefix.length * fontSize * 0.6;
        return (
          <React.Fragment key={ri}>
            {rows[ri].lines.map((ln, li) => (
              <div
                key={li}
                style={{ position: "absolute", left: padLeft + (li === 0 ? 0 : hangIndent), top: r.ys[li], color, whiteSpace: "pre", lineHeight: `${lineH}px` }}
              >
                {li === 0 ? prefix : ""}
                {ln}
              </div>
            ))}
          </React.Fragment>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: padLeft,
          top: layout.inputY,
          width: width - padLeft - AGY_PAD_H,
          height: layout.inputH,
          boxSizing: "border-box",
          border: `1px solid ${AGY_DARK.inputBorder}`,
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: `0 ${Math.round(fontSize * 0.75)}px`,
        }}
      >
        <span style={{ color: AGY_DARK.dim }}>{">"}</span>
        {inputText ? (
          <span style={{ color: AGY_DARK.text, whiteSpace: "pre" }}>{inputText}</span>
        ) : placeholder ? (
          <span style={{ color: AGY_DARK.dim, whiteSpace: "pre" }}>{placeholder}</span>
        ) : null}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------------------------------------
// 01 · agy_첫_대화_자기소개  (shipped slide 29, title rewritten: "첫 대화: 너는 누구니?" quoted the typed
// prompt as the title itself — reads as the banned question-fragment style. Rewritten as a keyword noun
// phrase describing what the slide teaches.)
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const panelProps: AgyPanelProps = {
    width: termW,
    welcomeLines: ["안녕하세요, Antigravity입니다.", "현재 작업 폴더를 기준으로 파일을 읽고", "쓰거나 명령을 실행할 수 있습니다."],
    inputText: "너는 누구니?",
    fontSize: TERM_FONT_SIZE,
    leftGutter: BADGE_GUTTER,
  };
  const L = layoutAgyPanel(panelProps);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + L.headerY + L.headerH / 2 });
  const b2 = toFrame({ x: badgeX, y: contentTop + (L.welcomeY ?? 0) + ((L.welcomeYs.length * L.lineH) / 2) });
  const b3 = toFrame({ x: badgeX, y: contentTop + L.inputY + L.inputH / 2 });

  const nodes: ExplorerNode[] = [];

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="Antigravity 자기소개 확인">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<AgyPanel {...panelProps} />}
            mainMode="empty"
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
          { number: 1, head: "Antigravity 실행 확인", body: "터미널에 agy 를 실행하면 이 화면이 뜬다." },
          { number: 2, head: "자기소개 안내문", body: "무엇을 할 수 있는지 먼저 알려준다." },
          { number: 3, head: "질문 입력 후 Enter", body: "\"너는 누구니?\"를 입력해 정체를 확인한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · agy_자기소개서_생성  (shipped slide 30)
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative, "editor");

  const panelProps: AgyPanelProps = {
    width: termW,
    rows: [
      { role: "user", lines: ["현재 폴더에 'gemini.txt'를 만들어줘."] },
      { role: "user", lines: ["네가 누구이고 무엇을 할 수 있는지", "간단히 작성해줘."] },
      { role: "assistant", lines: ["gemini.txt 파일을 만들었습니다.", "탐색기에 파일이 추가되고 편집기에서", "내용이 열렸습니다."] },
    ],
    fontSize: TERM_FONT_SIZE,
    leftGutter: BADGE_GUTTER,
  };
  const L = layoutAgyPanel(panelProps);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const bTerm = toFrame({ x: badgeX, y: contentTop + L.rows[2].anchorY });

  const editorPaneRight = windowNative.w - termW;
  const bTab = toFrame({ x: editorPaneRight - 24, y: WINDOW_HEADER_H + 17 });

  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH * 0.5;
  const badgeExplorerX = ACTIVITY_W + SIDEBAR_W - 26;
  const bExplorer = toFrame({ x: badgeExplorerX, y: treeTop });

  const nodes: ExplorerNode[] = [{ name: "gemini.txt", kind: "file", depth: 0, state: "selected" }];

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="자기소개서 파일 만들기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<AgyPanel {...panelProps} />}
            mainMode="editor"
            editorTab={{
              name: "gemini.txt",
              lines: ["# 자기소개서", "안녕하세요!", "저는 Antigravity입니다.", "작업 폴더의 파일을 읽고, 요청에 따라", "파일을 만들거나 수정할 수 있습니다."],
            }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={bExplorer.x} y={bExplorer.y} size={34} />
      <FocusBadge number={2} x={bTab.x} y={bTab.y} size={34} />
      <FocusBadge number={3} x={bTerm.x} y={bTerm.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "탐색기에 파일 추가", body: "요청한 이름 그대로 gemini.txt 가 생긴다." },
          { number: 2, head: "편집기 내용 표시", body: "생성과 동시에 내용까지 확인할 수 있다." },
          { number: 3, head: "완료 응답으로 확인", body: "무엇을 했는지 문장으로 알려준다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · agy_파일_생성_확인  (shipped slide 31)
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative, "editor");

  const panelProps: AgyPanelProps = {
    width: termW,
    rows: [
      { role: "assistant", lines: ["완료했습니다. gemini.txt를 생성했습니다.", "왼쪽 탐색기에서 파일을 선택해 내용을", "확인할 수 있습니다."] },
      { role: "assistant", lines: ["확인 포인트: 파일 이름과 저장 위치가", "요청과 같은지 직접 확인하세요."] },
    ],
    placeholder: "무엇을 도와드릴까요?",
    fontSize: TERM_FONT_SIZE,
    leftGutter: BADGE_GUTTER,
  };
  const L = layoutAgyPanel(panelProps);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const bTerm = toFrame({ x: badgeX, y: contentTop + L.rows[1].anchorY });

  const editorPaneRight = windowNative.w - termW;
  const bTab = toFrame({ x: editorPaneRight - 24, y: WINDOW_HEADER_H + 17 });

  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH * 0.5;
  const badgeExplorerX = ACTIVITY_W + SIDEBAR_W - 26;
  const bExplorer = toFrame({ x: badgeExplorerX, y: treeTop });

  const nodes: ExplorerNode[] = [{ name: "gemini.txt", kind: "file", depth: 0, state: "selected" }];

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="탐색기에서 파일 확인하기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<AgyPanel {...panelProps} />}
            mainMode="editor"
            editorTab={{
              name: "gemini.txt",
              lines: ["# 자기소개서", "안녕하세요!", "저는 Antigravity입니다.", "작업 폴더의 파일을 읽고, 요청에 따라", "파일을 만들거나 수정할 수 있습니다."],
            }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={bExplorer.x} y={bExplorer.y} size={34} />
      <FocusBadge number={2} x={bTab.x} y={bTab.y} size={34} />
      <FocusBadge number={3} x={bTerm.x} y={bTerm.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "탐색기에서 이름 확인", body: "gemini.txt 가 원하는 위치에 있는지 본다." },
          { number: 2, head: "편집기에서 내용 확인", body: "실제로 열어서 내용을 읽어본다." },
          { number: 3, head: "직접 눈으로 검증", body: "확인 포인트를 직접 눈으로 검증한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · agy_introduce_폴더_생성  (shipped slide 32)
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative, "editor");

  const panelProps: AgyPanelProps = {
    width: termW,
    rows: [
      { role: "user", lines: ["현재 폴더에 'introduce' 폴더를 만들어줘."] },
      { role: "assistant", lines: ["'introduce' 폴더를 생성했습니다.", "탐색기에서 새로 만들어진 폴더를", "확인할 수 있습니다."] },
    ],
    placeholder: "무엇을 도와드릴까요?",
    fontSize: TERM_FONT_SIZE,
    leftGutter: BADGE_GUTTER,
  };
  const L = layoutAgyPanel(panelProps);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const bTerm = toFrame({ x: badgeX, y: contentTop + L.rows[1].anchorY });

  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH * 0.5;
  const badgeExplorerX = ACTIVITY_W + SIDEBAR_W - 26;
  const bExplorer = toFrame({ x: badgeExplorerX, y: treeTop });

  const nodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0, state: "new" },
    { name: "gemini.txt", kind: "file", depth: 0 },
  ];

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="introduce 폴더 만들기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<AgyPanel {...panelProps} />}
            mainMode="editor"
            editorTab={{ name: "gemini.txt", lines: ["# 자기소개서", "안녕하세요! 저는 Antigravity입니다.", "작업 폴더의 파일을 읽고 수정할 수 있습니다."] }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={bExplorer.x} y={bExplorer.y} size={34} />
      <FocusBadge number={2} x={bTerm.x} y={bTerm.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "폴더도 자연어로 요청", body: "파일과 같은 방식으로 폴더 생성을 시킨다." },
          { number: 2, head: "새 폴더 생성 확인", body: "탐색기에 introduce 폴더가 새로 생긴다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · agy_자기소개서_이동  (shipped slide 33)
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative, "editor");

  const panelProps: AgyPanelProps = {
    width: termW,
    rows: [
      { role: "user", lines: ["'gemini.txt'를 'introduce' 폴더로", "옮겨줘."] },
      { role: "assistant", lines: ["파일을 introduce 폴더로 이동했습니다.", "introduce\\gemini.txt 로 이동 완료."] },
    ],
    placeholder: "무엇을 도와드릴까요?",
    fontSize: TERM_FONT_SIZE,
    leftGutter: BADGE_GUTTER,
  };
  const L = layoutAgyPanel(panelProps);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const bTerm = toFrame({ x: badgeX, y: contentTop + L.rows[1].anchorY });

  const editorPaneRight = windowNative.w - termW;
  const bTab = toFrame({ x: editorPaneRight - 24, y: WINDOW_HEADER_H + 17 });

  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH;
  const badgeExplorerX = ACTIVITY_W + SIDEBAR_W - 26;
  const bExplorer = toFrame({ x: badgeExplorerX, y: treeTop + rowH * 0.5 });

  const nodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0 },
    { name: "gemini.txt", kind: "file", depth: 1, state: "selected" },
  ];

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="자기소개서를 폴더로 옮기기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<AgyPanel {...panelProps} />}
            mainMode="editor"
            editorTab={{
              name: "introduce/gemini.txt",
              lines: ["# 자기소개서 (경로 이동 완료)", "안녕하세요!", "저는 Antigravity입니다.", "작업 폴더의 파일을 읽고 수정할 수 있습니다."],
            }}
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={bExplorer.x} y={bExplorer.y} size={34} />
      <FocusBadge number={2} x={bTab.x} y={bTab.y} size={34} />
      <FocusBadge number={3} x={bTerm.x} y={bTerm.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "폴더 아래로 이동", body: "gemini.txt 가 introduce 밑으로 들어갔다." },
          { number: 2, head: "경로가 바뀐 탭 제목", body: "introduce/gemini.txt 로 표시된다." },
          { number: 3, head: "이동 후 원래 자리 확인", body: "루트에는 더 이상 파일이 남아있지 않은지 본다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · agy_최종_폴더_구조  (shipped slide 34)
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const panelProps: AgyPanelProps = {
    width: termW,
    rows: [
      { role: "assistant", lines: ["실습을 마쳤습니다. 파일과 폴더 구조가", "요청한 대로입니다.", "introduce\\gemini.txt", "다음 단계: Ctrl + C로", "Antigravity CLI 종료"] },
    ],
    placeholder: "무엇을 도와드릴까요?",
    fontSize: TERM_FONT_SIZE,
    leftGutter: BADGE_GUTTER,
  };
  const L = layoutAgyPanel(panelProps);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const bTerm = toFrame({ x: badgeX, y: contentTop + L.rows[0].anchorY });

  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH * 0.5;
  const badgeExplorerX = ACTIVITY_W + SIDEBAR_W - 26;
  const bExplorer = toFrame({ x: badgeExplorerX, y: treeTop });

  const nodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0, state: "selected" },
    { name: "gemini.txt", kind: "file", depth: 1 },
  ];

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="최종 폴더 구조 확인">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<AgyPanel {...panelProps} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={bExplorer.x} y={bExplorer.y} size={34} />
      <FocusBadge number={2} x={bTerm.x} y={bTerm.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "introduce 안에 gemini.txt", body: "요청한 폴더 구조가 그대로 만들어졌다." },
          { number: 2, head: "다음은 CLI 종료", body: "Ctrl + C 로 Antigravity 를 빠져나간다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S1_AGY_PRACTICE: SlideEntry[] = [
  { index: 1, name: "agy_첫_대화_자기소개", title: "Antigravity 자기소개 확인", render: () => React.createElement(Slide01) },
  { index: 2, name: "agy_자기소개서_생성", title: "자기소개서 파일 만들기", render: () => React.createElement(Slide02) },
  { index: 3, name: "agy_파일_생성_확인", title: "탐색기에서 파일 확인하기", render: () => React.createElement(Slide03) },
  { index: 4, name: "agy_introduce_폴더_생성", title: "introduce 폴더 만들기", render: () => React.createElement(Slide04) },
  { index: 5, name: "agy_자기소개서_이동", title: "자기소개서를 폴더로 옮기기", render: () => React.createElement(Slide05) },
  { index: 6, name: "agy_최종_폴더_구조", title: "최종 폴더 구조 확인", render: () => React.createElement(Slide06) },
];

export const S1_AGY_PRACTICE_PART: PartSpec = { id: "s1-agy-practice", eyebrow: EYEBROW, entries: S1_AGY_PRACTICE };
