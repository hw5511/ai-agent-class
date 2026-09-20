// s1-cli-install — basic 1회차 슬라이드 35~38 (4장), rebuilt from the shipped deck
// (ai-agent-class/assets/basic/step01/*.svg) and courses/basic/step01.json parts[6] "Claude Code · Codex
// 설치". These are plain shell moments (before any AI CLI is running), so the terminal panel here is a
// small local ShellTerminal (not AgyPanel/ClaudeCodeTerminal) that renders exact literal command/output
// lines with a "PS C:\에이전트1> " prompt — the class's own folder name (에이전트1), not the shared
// VSCodeScreen terminalLines mode's hardcoded "PS C:\agent1> " prompt, which would be wrong here.
//
// Command text is verified against courses/basic/step01.json actions (claude_설치 / codex_설치 /
// PATH_자동_등록): Windows Claude Code install = `irm https://claude.ai/install.ps1 | iex`.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode } from "../VSCodeScreen";
import { Camera, cameraView } from "../core/Camera";
import { FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "CLI 설치";
const TOTAL = 4;

const WINDOW_HEADER_H = 34;
const TERM_TAB_H = 30;
const TERM_FONT_SIZE = 15;
const TERM_WINDOW_H = 620;
const PROMPT = "PS C:\\에이전트1> ";

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
// ShellTerminal — plain PowerShell mock for pre-CLI-install moments. Line kinds:
//   "input"  a real typed command — shows the PS prompt, then the command only (no PS prompt baked
//            into the string, matching the plan's "terminalLines input = command only" rule).
//   "cont"   a PowerShell backtick line-continuation of the previous "input" line — no prompt, indented.
//   "output" console output, dim.
//   "prompt" the bare prompt with a blinking caret (nothing typed yet) — shows the shell is back.
// ------------------------------------------------------------------------------------------------

interface ShellLine {
  kind: "input" | "cont" | "output" | "prompt";
  text?: string;
}

const SHELL_DARK = { dim: "#767c81", text: "#e8eaec", muted: "#9a9a9a", caret: "#cfd2d4" };

function layoutShellTerminal(lines: ShellLine[], fontSize: number) {
  const lineH = Math.round(fontSize * 1.6);
  const padV = 10;
  let y = padV;
  const ys = lines.map(() => {
    const cur = y;
    y += lineH;
    return cur;
  });
  return { ys, lineH, totalHeight: y + padV };
}

const ShellTerminal: React.FC<{ width: number; lines: ShellLine[]; fontSize?: number }> = ({ width, lines, fontSize = TERM_FONT_SIZE }) => {
  const { ys, lineH, totalHeight } = layoutShellTerminal(lines, fontSize);
  return (
    <div style={{ position: "relative", width, height: totalHeight, boxSizing: "border-box", fontFamily: FONTS.term, fontSize, overflow: "hidden" }}>
      {lines.map((l, i) => (
        <div key={i} style={{ position: "absolute", left: 16, top: ys[i], whiteSpace: "pre", lineHeight: `${lineH}px` }}>
          {l.kind === "input" ? (
            <>
              <span style={{ color: SHELL_DARK.dim }}>{PROMPT}</span>
              <span style={{ color: SHELL_DARK.text }}>{l.text}</span>
            </>
          ) : l.kind === "cont" ? (
            <span style={{ color: SHELL_DARK.text, paddingLeft: PROMPT.length * fontSize * 0.6 }}>{l.text}</span>
          ) : l.kind === "output" ? (
            <span style={{ color: SHELL_DARK.muted }}>{l.text}</span>
          ) : (
            <>
              <span style={{ color: SHELL_DARK.dim }}>{PROMPT}</span>
              <span style={{ display: "inline-block", width: Math.max(2, Math.round(fontSize * 0.5)), height: Math.round(fontSize * 1.15), background: SHELL_DARK.caret, transform: "translateY(3px)" }} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

// ------------------------------------------------------------------------------------------------
// 01 · agy_Ctrl_C_종료  (shipped slide 35) — leaving the Antigravity CLI, back to a plain shell prompt.
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const lines: ShellLine[] = [
    { kind: "output", text: "무엇을 도와드릴까요? [입력 대기]" },
    { kind: "input", text: "^C" },
    { kind: "output", text: "Antigravity CLI 세션을 정상 종료하고" },
    { kind: "output", text: "일반 터미널로 복귀합니다." },
    { kind: "prompt" },
  ];
  const { ys } = layoutShellTerminal(lines, TERM_FONT_SIZE);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const bCtrlC = toFrame({ x: paneLeft + 16 + 60, y: contentTop + ys[1] + 12 });
  const bPrompt = toFrame({ x: paneLeft + 16 + 60, y: contentTop + ys[4] + 12 });

  const nodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0 },
    { name: "gemini.txt", kind: "file", depth: 1 },
  ];

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="Ctrl + C로 CLI 종료">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ShellTerminal width={termW} lines={lines} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={bCtrlC.x} y={bCtrlC.y} size={34} />
      <FocusBadge number={2} x={bPrompt.x} y={bPrompt.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "Ctrl + C 로 나가기", body: "대화가 끝나면 이 단축키로 CLI 를 종료한다." },
          { number: 2, head: "PS 프롬프트로 복귀", body: "여기서부터는 일반 터미널 명령을 친다 — 다음은 나머지 CLI 설치." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · claude_설치  (shipped slide 36) — Claude Code install command.
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const lines: ShellLine[] = [
    { kind: "input", text: "irm https://claude.ai/install.ps1 | iex" },
    { kind: "output", text: "Claude Code installed to %USERPROFILE%\\.local\\bin" },
    { kind: "output", text: "( claude 는 이 터미널에서 아직 안 됨 — PATH 는 다음에 )" },
    { kind: "prompt" },
  ];
  const { ys } = layoutShellTerminal(lines, TERM_FONT_SIZE);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const bCmd = toFrame({ x: paneLeft + 16 + 60, y: contentTop + ys[0] + 12 });
  const bOut = toFrame({ x: paneLeft + 16 + 60, y: contentTop + ys[1] + 12 });

  const nodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0 },
    { name: "gemini.txt", kind: "file", depth: 1 },
  ];

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="Claude Code 설치">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ShellTerminal width={termW} lines={lines} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={bCmd.x} y={bCmd.y} size={34} />
      <FocusBadge number={2} x={bOut.x} y={bOut.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "설치 명령 한 줄 실행", body: "irm https://claude.ai/install.ps1 | iex" },
          { number: 2, head: "설치 완료 · PATH 미반영", body: "이 터미널은 새 경로를 모른다 — claude 는 나중에 한 번에 잡는다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · codex_설치  (shipped slide 37) — Codex CLI install, PowerShell -NoProfile wrapper (backtick
// line-continuation, exactly as the shipped SVG splits it).
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const lines: ShellLine[] = [
    { kind: "output", text: "# -NoProfile 빼지 마세요 (StrictMode 오류 방지)" },
    { kind: "input", text: "powershell -NoProfile -ExecutionPolicy ByPass -c `" },
    { kind: "cont", text: '"irm https://chatgpt.com/codex/install.ps1 | iex"' },
    { kind: "output", text: "Codex CLI installed (Programs\\OpenAI\\Codex\\bin)" },
    { kind: "output", text: "( codex 는 이 터미널에서 아직 안 됨 )" },
    { kind: "prompt" },
  ];
  const { ys } = layoutShellTerminal(lines, TERM_FONT_SIZE);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const bCmd = toFrame({ x: paneLeft + 16 + 60, y: contentTop + ys[1] + 12 });
  const bOut = toFrame({ x: paneLeft + 16 + 60, y: contentTop + ys[3] + 12 });

  const nodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0 },
    { name: "gemini.txt", kind: "file", depth: 1 },
  ];

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="Codex CLI 설치">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ShellTerminal width={termW} lines={lines} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={bCmd.x} y={bCmd.y} size={34} />
      <FocusBadge number={2} x={bOut.x} y={bOut.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "-NoProfile 필수 유지", body: "프로필의 StrictMode 가 켜져 있으면 설치가 중간에 멈춘다." },
          { number: 2, head: "이것까지 끝나면 PATH 정리", body: "codex 도 아직 이 터미널에서 안 된다 — 한 번에 잡는다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · PATH_자동_등록  (shipped slide 38, SVG title "세 개 마저 잡기") — the verification script's
// pass/fail checklist for agy / codex / claude, all three versions confirmed at once.
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, TERM_WINDOW_H);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const lines: ShellLine[] = [
    { kind: "output", text: "────────────────────────────" },
    { kind: "output", text: "[v] agy      사용 가능!  1.2.5" },
    { kind: "output", text: "[v] codex    사용 가능!  codex-cli 0.154.0" },
    { kind: "output", text: "[v] claude   사용 가능!  2.1.274 (Claude Code)" },
    { kind: "output", text: "────────────────────────────" },
    { kind: "output", text: "세 개 다 버전이 찍혔습니다." },
    { kind: "prompt" },
  ];
  const { ys } = layoutShellTerminal(lines, TERM_FONT_SIZE);

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const bCheck = toFrame({ x: paneLeft + 16 + 60, y: contentTop + ys[2] + 12 });
  const bDone = toFrame({ x: paneLeft + 16 + 60, y: contentTop + ys[5] + 12 });

  const nodes: ExplorerNode[] = [
    { name: "introduce", kind: "folder", depth: 0 },
    { name: "gemini.txt", kind: "file", depth: 1 },
  ];

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="세 개 마저 잡기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={nodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalContent={<ShellTerminal width={termW} lines={lines} />}
            mainMode="empty"
          />
        </Camera>
      </div>

      <FocusBadge number={1} x={bCheck.x} y={bCheck.y} size={34} />
      <FocusBadge number={2} x={bDone.x} y={bDone.y} size={34} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "Windows — 같은 명령 한 번 더", body: "조금 전과 같은 명령을 다시 실행해 codex·claude 자리까지 함께 등록한다." },
          { number: 2, head: "버전이 찍히면 확인 끝", body: "세 개 다 버전이 나오면 VS Code 를 껐다 켤 필요 없다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S1_CLI_INSTALL: SlideEntry[] = [
  { index: 1, name: "agy_Ctrl_C_종료", title: "Ctrl + C로 CLI 종료", render: () => React.createElement(Slide01) },
  { index: 2, name: "claude_설치", title: "Claude Code 설치", render: () => React.createElement(Slide02) },
  { index: 3, name: "codex_설치", title: "Codex CLI 설치", render: () => React.createElement(Slide03) },
  { index: 4, name: "PATH_자동_등록", title: "세 개 마저 잡기", render: () => React.createElement(Slide04) },
];

export const S1_CLI_INSTALL_PART: PartSpec = { id: "s1-cli-install", eyebrow: EYEBROW, entries: S1_CLI_INSTALL };
