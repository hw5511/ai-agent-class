// s3-settings — basic 3회차 (step03) 파트. 계획서: courses/basic/step03-redesign-plan.md
// 이 파일은 이 파트의 슬라이드만 소유한다. registry.ts 는 이미 등록되어 있으므로 건드리지 않는다.
//
// 실행 검증 (2026-09-21, 스크래치 폴더 C:/Users/woohee/AppData/Local/Temp/claude/s3-settings-scratch):
//   1) `claude -p "현재 폴더의 .claude 폴더에 settings.json 파일을 만들어서 모든 삭제 명령어를 금지시켜줘"
//      --model sonnet --dangerously-skip-permissions` 실행 -> 실제 생성된 .claude/settings.json 전문을
//      그대로 슬라이드 4에 옮겼다 (지어낸 규칙 없음).
//   2) 같은 폴더에 test.txt 를 만들고 `claude -p "test.txt 파일을 삭제해줘" --model sonnet
//      --output-format stream-json --verbose` 실행 -> permission_denied 이벤트의 실제 문구
//      "Permission to use PowerShell with command Remove-Item -LiteralPath .\test.txt -Confirm:$false;
//      Test-Path -LiteralPath .\test.txt has been denied." 를 그대로 슬라이드 7에 옮겼다.
//   3) settings.json 키 이름은 code.claude.com/docs/en/settings-reference 로 재확인했다. mcpServers 는
//      settings.json 키가 아니라 .mcp.json 쪽이라 슬라이드 8에서 그 사실 자체를 카드로 넣었다(지어내지
//      않음). enabledPlugins(플러그인 설치)와 settings.local.json(권한 "항상 허용")은 실제 확인된 경로.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { InputBar } from "../InputBar";
import { VSCodeScreen, ACTIVITY_W, SIDEBAR_W, type ExplorerNode, type TerminalPaneLine } from "../VSCodeScreen";
import { ClaudeCodeTerminal, layoutClaudeCodeTerminal, type ClaudeCodeTurn } from "../ClaudeCodeTerminal";
import { Camera, cameraView } from "../core/Camera";
import { COLORS, FONTS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_BOTTOM, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "SETTINGS.JSON";
const TOTAL = 8;

const WINDOW_HEADER_H = 34; // AppWindow native title bar height (../core/native.ts).
const TERM_TAB_H = 30; // VSCodeScreen TerminalPane tab-bar height.
const TERM_FONT_SIZE = 15; // matches VSCodeScreen's own terminal-panel default.
const BADGE_GUTTER = 44; // reserved inside the terminal so badges never cover its text.

// ------------------------------------------------------------------------------------------------
// Local helpers (each part owns its own copy per the worker guide — same math as s2-claudemd.tsx).
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

// Small local horizontal card row (s2-write.tsx CardRow pattern, copied per the worker guide).
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
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 23, lineHeight: 1.25, color: COLORS.ink, wordBreak: "keep-all" }}>{it.head}</div>
          </div>
          {it.body ? <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 18, lineHeight: 1.4, color: COLORS.ink2, wordBreak: "keep-all" }}>{it.body}</div> : null}
        </div>
      ))}
    </div>
  );
};

// Dark VS Code-style code preview panel for a *result* (hand-built chrome, same pattern as
// s2-write.tsx's MarkdownPreviewWindow — a result panel outside the shared VSCodeScreen editor, not a
// "hand-drawn terminal"). Shows real file content with line numbers, monospace, dark ground.
const CODE_DARK = { bg: "#1f1f1f", tabBg: "#181818", border: "#2b2b2b", text: "#d4d4d4", lineNo: "#5a5a5a", key: "#9cdcfe", str: "#ce9178" };

const CodePreviewPanel: React.FC<{ x: number; y: number; width: number; height: number; fileName: string; lines: string[]; fontSize?: number }> = ({
  x,
  y,
  width,
  height,
  fileName,
  lines,
  fontSize = 17,
}) => {
  const lineH = Math.round(fontSize * 1.55);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        boxSizing: "border-box",
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${CODE_DARK.border}`,
        boxShadow: "0 18px 40px rgba(16,17,19,0.12)",
        display: "flex",
        flexDirection: "column",
        background: CODE_DARK.bg,
      }}
    >
      <div
        style={{
          height: 40,
          flex: "0 0 40px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 20px",
          background: CODE_DARK.tabBg,
          borderBottom: `1px solid ${CODE_DARK.border}`,
          borderTop: `2px solid ${COLORS.accent}`,
        }}
      >
        <span style={{ fontFamily: FONTS.term, fontWeight: 600, fontSize: 16, color: CODE_DARK.text }}>{fileName}</span>
      </div>
      <div style={{ flex: "1 1 0", minHeight: 0, padding: "18px 22px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {lines.map((ln, i) => (
          <div key={i} style={{ display: "flex", gap: 20, fontFamily: FONTS.term, fontSize, lineHeight: `${lineH}px` }}>
            <span style={{ color: CODE_DARK.lineNo, width: 24, textAlign: "right", flex: "0 0 auto" }}>{i + 1}</span>
            <span style={{ color: CODE_DARK.text, whiteSpace: "pre" }}>{ln}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------------------------------------
// 01 · settings_란 — "settings.json" (실제 폴더 트리 + 파일 실물, 프로젝트 단위 vs 사용자 단위)
// ------------------------------------------------------------------------------------------------

const Slide01: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, 460);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });

  const explorerNodes: ExplorerNode[] = [
    { name: ".claude", kind: "folder", depth: 0, state: "selected" },
    { name: "settings.json", kind: "file", depth: 1 },
  ];

  const SKELETON_LINES = ["{", '  "permissions": {', '    "allow": [],', '    "deny": []', "  }", "}"];

  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH;
  const badgeX = ACTIVITY_W + SIDEBAR_W - 26;
  const b1 = toFrame({ x: badgeX, y: treeTop + rowH * 0.5 });
  const b2 = toFrame({ x: badgeX, y: treeTop + rowH * 1.5 });

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="settings.json">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            showTerminal={false}
            mainMode="editor"
            editorTab={{ name: "settings.json", lines: SKELETON_LINES }}
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
          { number: 1, head: "숨김 폴더 .claude 안", body: "settings.json 도 CLAUDE.md 처럼 .claude 폴더 안에 둔다." },
          { number: 2, head: "파일 이름 settings.json", body: "이 파일 하나가 도구 실행 규칙·모델·환경변수를 담는다." },
          { number: "!", head: "두 군데에 존재", body: "프로젝트: .claude/settings.json (팀과 공유) / 사용자: ~/.claude/settings.json (나에게만, 모든 프로젝트 적용)." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · settings_항목 — "주요 설정 항목" (permissions/model/env/hooks — 실제 키 이름만)
// ------------------------------------------------------------------------------------------------

const KEY_CARDS: Array<{ n: number; key: string; desc: string; example: string }> = [
  { n: 1, key: "permissions", desc: "allow / deny / ask 세 목록으로 도구 실행 허용 여부를 정한다.", example: '"deny": ["Bash(rm:*)"]' },
  { n: 2, key: "model", desc: "이 세션이 기본으로 쓸 모델을 지정한다.", example: '"model": "claude-sonnet-5"' },
  { n: 3, key: "env", desc: "세션과 하위 프로세스(명령·훅·MCP)에 전달되는 환경변수.", example: '"env": { "MY_VAR": "value" }' },
  { n: 4, key: "hooks", desc: "도구 호출 전후에 실행되는 쉘 명령을 건다.", example: '"hooks": { "PreToolUse": [ ... ] }' },
];

const Slide02: React.FC = () => {
  const gridX = colX(0);
  const gridY = BODY_Y;
  const gridW = colW(12);
  const gap = 32;
  const cardW = (gridW - gap) / 2;
  const cardH = 220;
  const noteY = gridY + cardH * 2 + gap + 40;

  return (
    <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="주요 설정 항목">
      {KEY_CARDS.map((c, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = gridX + col * (cardW + gap);
        const y = gridY + row * (cardH + gap);
        return (
          <div
            key={c.key}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: cardW,
              height: cardH,
              boxSizing: "border-box",
              background: COLORS.paper2,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 14px 30px rgba(16,17,19,0.08)",
            }}
          >
            <div style={{ height: 8, background: COLORS.accent }} />
            <div style={{ padding: "22px 34px", display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontFamily: FONTS.term, fontWeight: 800, fontSize: 30, color: COLORS.accentDeep }}>{c.key}</span>
              <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 19, color: COLORS.ink2, wordBreak: "keep-all" }}>{c.desc}</span>
              <div
                style={{
                  marginTop: 4,
                  background: COLORS.paper,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 8,
                  padding: "8px 14px",
                  fontFamily: FONTS.term,
                  fontSize: 17,
                  color: COLORS.ink,
                  whiteSpace: "pre",
                  overflow: "hidden",
                }}
              >
                {c.example}
              </div>
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: gridX,
          top: noteY,
          width: gridW,
          height: BODY_BOTTOM - noteY,
          boxSizing: "border-box",
          background: COLORS.accentWash,
          border: `1px solid ${COLORS.accent}`,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
        }}
      >
        <span style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 22, color: COLORS.accentDeep, wordBreak: "keep-all" }}>
          이 네 가지는 확실한 키 이름만 — 오늘 실습은 permissions 위주로 다룬다.
        </span>
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 03 · settings_요청 — "삭제 명령어 금지" (실제 입력 문구 그대로, InputBar + VSCodeScreen +
// ClaudeCodeTerminal). 문장이 길어서(86 유닛) 터미널 패널을 12칸 전체 폭으로 넓혀 한 줄에 담는다
// (실측: termW>=868px 필요, 이 레이아웃은 넉넉히 넘는다 — 잘리지 않는다).
// ------------------------------------------------------------------------------------------------

const REQUEST_TEXT = "현재 폴더의 .claude 폴더에 settings.json 파일을 만들어서 모든 삭제 명령어를 금지시켜줘";

const Slide03: React.FC = () => {
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

  const windowH = 420; // == screenH: no camera upscale needed, native.w == illoW (max width for the panel)
  const { windowNative, focus, view } = windowGeometry(illoW, screenH, windowH);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: screenY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const termProps = { width: termW, inputText: REQUEST_TEXT, fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER };
  const L = layoutClaudeCodeTerminal(termProps);
  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const b1 = toFrame({ x: badgeX, y: contentTop + L.inputY + L.inputH / 2 });

  return (
    <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="삭제 명령어 금지">
      <InputBar x={illoX} y={barY} width={illoW} height={barH} text={REQUEST_TEXT} />

      <div style={{ position: "absolute", left: illoX, top: screenY, width: illoW, height: screenH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={screenH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
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

      <CardRow
        x={illoX}
        y={cardsY}
        width={illoW}
        height={cardsH}
        items={[
          { number: 1, head: "말로 그대로 요청", body: "존댓말 문장 하나로 만들 파일과 금지할 대상을 다 말한다." },
          { number: "!", head: "위치까지 지정", body: ".claude 폴더 안 settings.json 이라고 경로까지 콕 집었다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 04 · settings_결과 — "생성된 deny 규칙" (실제 실행 결과 전문. VS Code 왼쪽 / 결과 크게 오른쪽 / 카드는
// 아래 가로줄 — s2-write.tsx 결과 슬라이드 패턴)
// ------------------------------------------------------------------------------------------------

const GENERATED_JSON_LINES = [
  "{",
  '  "permissions": {',
  '    "deny": [',
  '      "Bash(rm:*)",',
  '      "Bash(rmdir:*)",',
  '      "Bash(unlink:*)",',
  '      "Bash(shred:*)",',
  '      "Bash(find:* -delete*)",',
  '      "Bash(git rm:*)",',
  '      "Bash(git clean:*)",',
  '      "PowerShell(Remove-Item:*)",',
  '      "PowerShell(ri:*)",',
  '      "PowerShell(rm:*)",',
  '      "PowerShell(rmdir:*)",',
  '      "PowerShell(del:*)",',
  '      "PowerShell(erase:*)",',
  '      "PowerShell(rd:*)",',
  '      "PowerShell(Clear-Content:*)",',
  '      "PowerShell(git rm:*)",',
  '      "PowerShell(git clean:*)"',
  "    ]",
  "  }",
  "}",
];

const Slide04: React.FC = () => {
  const leftX = colX(0);
  const leftW = colW(4);
  const resultX = colX(4) + 8;
  const resultW = 1800 - resultX;
  const topY = BODY_Y;
  const topH = 600;
  const gap = 24;
  const cardsY = topY + topH + gap;
  const cardsH = BODY_BOTTOM - cardsY;

  const { windowNative, focus } = windowGeometry(leftW, topH, topH);

  return (
    <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="생성된 deny 규칙">
      <div style={{ position: "absolute", left: leftX, top: topY, width: leftW, height: topH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={leftW} height={topH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[
              { name: ".claude", kind: "folder", depth: 0, state: "selected" },
              { name: "settings.json", kind: "file", depth: 1, state: "new" },
            ]}
            showTerminal={false}
            mainMode="empty"
          />
        </Camera>
      </div>

      <CodePreviewPanel x={resultX} y={topY} width={resultW} height={topH} fileName=".claude/settings.json" lines={GENERATED_JSON_LINES} fontSize={16} />

      <CardRow
        x={colX(0)}
        y={cardsY}
        width={colW(12)}
        height={cardsH}
        items={[
          { number: 1, head: "Bash·PowerShell 양쪽 다", body: "rm / Remove-Item 계열 명령을 두 셸 모두에서 deny 에 넣었다." },
          { number: 2, head: "이름 패턴으로 차단", body: '"PowerShell(rm:*)" 처럼 명령 이름 + 별표 패턴으로 막는다.' },
          { number: "!", head: "한계도 있다", body: "Write/Edit 툴로 파일을 덮어써서 비우는 것까지는 막지 못한다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 05 · settings_clear — "/clear 로 대화 비우기"
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, 620);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const priorTurns: ClaudeCodeTurn[] = [
    { role: "user", text: REQUEST_TEXT },
    { role: "assistant", text: "settings.json 을 만들고 삭제 명령어를 모두 deny 에 넣었어요." },
  ];
  const termLayout = layoutClaudeCodeTerminal({ width: termW, turns: priorTurns, inputText: "/clear", fontSize: TERM_FONT_SIZE, leftGutter: BADGE_GUTTER });

  const paneLeft = windowNative.w - termW;
  const contentTop = WINDOW_HEADER_H + TERM_TAB_H;
  const badgeX = paneLeft + 16 + BADGE_GUTTER / 2;
  const inputSpot = { x: badgeX, y: contentTop + termLayout.inputY + termLayout.inputH / 2 };
  const b1 = toFrame(inputSpot);

  return (
    <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="/clear 로 대화 비우기">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[
              { name: ".claude", kind: "folder", depth: 0 },
              { name: "settings.json", kind: "file", depth: 1, state: "selected" },
            ]}
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
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "/clear", body: "지금 대화방을 나가고 새 대화방으로 간다." },
          { number: "!", head: "새 규칙은 다음 세션부터", body: "settings.json 은 새 세션이 시작될 때 다시 읽힌다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 06 · settings_차단_요청 — "파일 삭제 요청" (test.txt 삭제 요청 입력줄)
// ------------------------------------------------------------------------------------------------

// Raw-terminal (VSCodeScreen terminalLines, layout="right") line metrics — matches TerminalPane's own
// plain-lines rendering exactly (VSCodeScreen.tsx: tab bar 30px, body padding "10px 16px", fontSize 15,
// lineHeight 1.5, flex column gap 4). Reused by Slide06/Slide07 for badge placement on a specific line.
const RAW_LINE_H = TERM_FONT_SIZE * 1.5; // 22.5
const RAW_LINE_GAP = 4;
function rawLineCenterY(i: number): number {
  return TERM_TAB_H + 10 + i * (RAW_LINE_H + RAW_LINE_GAP) + RAW_LINE_H / 2;
}

const Slide06: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, 460);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const explorerNodes: ExplorerNode[] = [
    { name: ".claude", kind: "folder", depth: 0 },
    { name: "settings.json", kind: "file", depth: 1 },
    { name: "test.txt", kind: "file", depth: 0, state: "selected" },
  ];

  const terminalLines: TerminalPaneLine[] = [{ type: "input", text: "test.txt 파일을 삭제해줘" }];

  const rowH = 30;
  const treeTop = WINDOW_HEADER_H + 36 + rowH * 2; // test.txt is the 3rd row (depth-0 file after the folder's child)
  const badgeX = ACTIVITY_W + SIDEBAR_W - 26;
  const b1 = toFrame({ x: badgeX, y: treeTop + rowH * 0.5 });

  const paneLeft = windowNative.w - termW;
  const b2 = toFrame({ x: paneLeft + 30, y: WINDOW_HEADER_H + rawLineCenterY(0) });

  return (
    <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="파일 삭제 요청">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={explorerNodes}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalLines={terminalLines}
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
          { number: 1, head: "지우려는 파일", body: "방금 만든 test.txt 다." },
          { number: 2, head: "삭제해줘", body: "터미널에 그대로 입력하고 Enter 를 누른다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 07 · settings_차단_결과 — "Permission denied" (실제로 받은 빨간 거부 문구 그대로. 빨간색은
// VSCodeScreen 의 터미널 error 색으로만 쓴다 — 슬라이드 accent 는 파랑 하나 유지.)
// ------------------------------------------------------------------------------------------------

const DENY_MESSAGE = 'Permission to use PowerShell with command Remove-Item -LiteralPath .\\test.txt -Confirm:$false; Test-Path -LiteralPath .\\test.txt has been denied.';

const Slide07: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const { windowNative, focus, view } = windowGeometry(illoW, illoH, 460);
  const toFrame = (p: { x: number; y: number }) => ({ x: illoX + view.tx + p.x * view.s, y: illoY + view.ty + p.y * view.s });
  const termW = rightTermWidth(windowNative);

  const terminalLines: TerminalPaneLine[] = [
    { type: "input", text: "test.txt 파일을 삭제해줘" },
    { type: "error", text: DENY_MESSAGE },
  ];

  const paneLeft = windowNative.w - termW;
  const b1 = toFrame({ x: paneLeft + 30, y: WINDOW_HEADER_H + rawLineCenterY(1) });

  return (
    <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="Permission denied">
      <div style={{ position: "absolute", left: illoX, top: illoY, width: illoW, height: illoH, borderRadius: 22, boxShadow: "0 18px 40px rgba(16,17,19,0.10)" }}>
        <Camera width={illoW} height={illoH} native={windowNative} keys={[{ at: { frame: 0 }, focus }]} radius={22} fade={0}>
          <VSCodeScreen
            width={windowNative.w}
            height={windowNative.h}
            explorerNodes={[
              { name: ".claude", kind: "folder", depth: 0 },
              { name: "settings.json", kind: "file", depth: 1 },
              { name: "test.txt", kind: "file", depth: 0 },
            ]}
            layout="right"
            terminalWidth={termW}
            showTerminal
            terminalLines={terminalLines}
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
          { number: 1, head: "명령 패턴으로 차단", body: 'settings.json 의 "PowerShell(rm:*)" 규칙에 걸려 도구 호출 자체가 거부됐다.' },
          { number: "!", head: "파일은 그대로 남는다", body: "거부된 명령은 실행되지 않는다 — test.txt 는 지워지지 않았다." },
        ]}
      />
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 08 · settings_생성_경로 — "settings.json 이 생기는 다른 길" (실제 키 이름만: enabledPlugins,
// settings.local.json. mcpServers 는 settings.json 키가 아니라 별도 .mcp.json 이라 뺐다 —
// code.claude.com/docs/en/settings-reference 로 확인, 지어내지 않음.)
// ------------------------------------------------------------------------------------------------

const Slide08: React.FC = () => {
  const x = colX(0);
  const w = colW(12);
  const rowH = 150;
  const rowGap = 24;
  const y0 = BODY_Y;

  const ROWS: Array<{ n: number | string; head: string; body: string; code: string }> = [
    { n: 1, head: "플러그인 설치", body: "플러그인을 설치하면 settings.json 에 활성화 목록이 추가·갱신된다.", code: '"enabledPlugins": { "내플러그인@마켓": true }' },
    { n: 2, head: '권한 프롬프트에서 "항상 허용"', body: "도구 실행을 승인할 때 항상 허용을 고르면 규칙이 같은 파일 계열에 쌓인다.", code: '.claude/settings.local.json  ->  "permissions": { "allow": [...] }' },
    { n: "!", head: "MCP 서버는 예외", body: "MCP 서버 설정은 settings.json 이 아니라 별도의 .mcp.json 에 저장된다 — 헷갈리지 말 것.", code: ".mcp.json (project) — settings.json 과는 다른 파일" },
  ];

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="settings.json 이 생기는 다른 길">
      {ROWS.map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x,
            top: y0 + i * (rowH + rowGap),
            width: w,
            height: rowH,
            boxSizing: "border-box",
            background: COLORS.paper2,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 16,
            padding: "24px 34px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 14px 30px rgba(16,17,19,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                flex: "0 0 auto",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: COLORS.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: 19,
                color: COLORS.paper2,
              }}
            >
              {r.n}
            </div>
            <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 27, color: COLORS.ink }}>{r.head}</span>
          </div>
          <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 20, color: COLORS.ink2, wordBreak: "keep-all" }}>{r.body}</span>
          <div
            style={{
              background: COLORS.paper,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 8,
              padding: "8px 16px",
              fontFamily: FONTS.term,
              fontSize: 17,
              color: COLORS.accentDeep,
              whiteSpace: "pre",
              overflow: "hidden",
              alignSelf: "flex-start",
            }}
          >
            {r.code}
          </div>
        </div>
      ))}
    </SlideFrame>
  );
};

export const S3_SETTINGS: SlideEntry[] = [
  { index: 1, name: "settings_란", title: "settings.json", render: () => React.createElement(Slide01) },
  { index: 2, name: "settings_항목", title: "주요 설정 항목", render: () => React.createElement(Slide02) },
  { index: 3, name: "settings_요청", title: "삭제 명령어 금지", render: () => React.createElement(Slide03) },
  { index: 4, name: "settings_결과", title: "생성된 deny 규칙", render: () => React.createElement(Slide04) },
  { index: 5, name: "settings_clear", title: "/clear 로 대화 비우기", render: () => React.createElement(Slide05) },
  { index: 6, name: "settings_차단_요청", title: "파일 삭제 요청", render: () => React.createElement(Slide06) },
  { index: 7, name: "settings_차단_결과", title: "Permission denied", render: () => React.createElement(Slide07) },
  { index: 8, name: "settings_생성_경로", title: "settings.json 이 생기는 다른 길", render: () => React.createElement(Slide08) },
];

export const S3_SETTINGS_PART: PartSpec = { id: "s3-settings", eyebrow: EYEBROW, entries: S3_SETTINGS };
