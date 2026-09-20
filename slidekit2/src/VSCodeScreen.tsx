// @slide-component: VSCodeScreen — the "에이전트1 — Visual Studio Code" screen every step02-claudemd L21
// slide re-creates (Explorer showing agent1/.claude/CLAUDE.md + a PowerShell/Claude Code session in the
// TERMINAL panel). Reuses AppWindow (../assets/window/AppWindow) for the outer window chrome (native mode:
// real 34px title bar, 1px border). The VS Code sidebar Explorer and the integrated terminal panel are NOT
// the OS Explorer / a standalone terminal window (AppWindow's own Explorer/TerminalWindow assets always draw
// their own separate window chrome and the shared FileIcon folder glyph is hard-coded yellow, which the
// plan's color rule forbids) — so this file adds two small new wrapper pieces, ExplorerPane and
// TerminalPane, drawn in ink/accent tones only, to sit *inside* the single AppWindow as VS Code panels.
//
// Render at a fixed NATIVE design size (VSCodeScreen.NATIVE, 1440x900) and wrap in the existing
// `Camera` (../assets/_core/Camera) when a slide needs to zoom into one part of the screen (e.g. slide 06
// zooms the Explorer header). Camera keeps the UI at real proportions and scales up for readability
// (STYLE.md section 4 / section 7).
//
// Props:
//   width, height        render size in px — pass VSCODE_NATIVE.w/h directly for an unzoomed shot, or
//                         render at VSCODE_NATIVE size inside a Camera for a zoomed shot.
//   windowTitle          AppWindow title bar text. Default "에이전트1 — Visual Studio Code".
//   explorerRoot         root folder row label (bold, top of the tree). Default "AGENT1".
//   explorerNodes        ExplorerNode[] tree rows below the root (depth 0 = directly under root).
//   explorerHeaderHot    which root-row hover icon is highlighted: "newFile" | "newFolder" | "refresh" |
//                         "collapse" | "none" (default "none"). Icons only render when this is set or
//                         explorerHeaderIcons is true.
//   explorerHeaderIcons  force-show the 4 root-row icons even with explorerHeaderHot "none". Default false
//                         (icons show automatically whenever explorerHeaderHot !== "none").
//   showTerminal         render the TERMINAL panel. Default true.
//   terminalTitle        terminal panel tab label. Default "터미널".
//   terminalLines        TerminalPaneLine[] shown top-to-bottom, oldest first (no animation/typing — full
//                         final state, per the static-still rule). Ignored when terminalContent is given.
//   terminalContent      custom React content to render inside the terminal panel instead of
//                         terminalLines (e.g. <ClaudeCodeTerminal>) — the panel's own chrome (tab bar,
//                         border, background) is unchanged; this only replaces the lines list.
//   layout               "bottom" (default, terminal panel docked under the editor — VS Code's own
//                         default) | "right" (terminal panel docked beside the editor as a right column,
//                         TERM_SIDE_W wide, full height — the class's own VS Code setting from 2026-09-17,
//                         "panel position: right"). Does not change the default.
//   mainMode             "empty" (default, blank editor with a muted placeholder) | "editor" (shows
//                         editorTab content).
//   editorTab            { name, dirty?, lines } — used when mainMode="editor" (e.g. slide 08's CLAUDE.md
//                         content with an unsaved dot).
export interface ExplorerNode {
  name: string;
  kind: "folder" | "file";
  depth: number;
  state?: "normal" | "selected" | "hover" | "new";
  // Inline create/rename text box shown in place of the row's name (badge 2 spots in the plan).
  editingValue?: string;
}

export interface TerminalPaneLine {
  type: "input" | "output" | "success" | "error";
  text: string;
}

export interface EditorTabSpec {
  name: string;
  dirty?: boolean;
  // Optional when `image` is set (image mode ignores lines entirely).
  lines?: string[];
  // staticFile() src of an image to preview centered in the editor body instead of text `lines` — used
  // for e.g. a photo opened as an editor tab (step02-read.tsx slides 07/08). When set, `lines` is ignored.
  image?: string;
}

// sidebarWidth: Explorer pane width (native px). Default SIDEBAR_W (272) — unchanged unless a caller
// passes this. Added 2026-09-18 (Yuki review) so a slide can narrow the Explorer to free up editor-column
// width (e.g. step02-read.tsx slides 07/08's real-photo preview) without touching the shared constant.
export interface VSCodeScreenProps {
  width: number;
  height: number;
  windowTitle?: string;
  explorerRoot?: string;
  explorerNodes?: ExplorerNode[];
  explorerHeaderHot?: "newFile" | "newFolder" | "refresh" | "collapse" | "none";
  explorerHeaderIcons?: boolean;
  showTerminal?: boolean;
  terminalTitle?: string;
  terminalLines?: TerminalPaneLine[];
  terminalContent?: React.ReactNode;
  layout?: "bottom" | "right";
  // Right-layout terminal panel width (native px) — only used when layout="right". Default TERM_SIDE_W
  // (sized for the full VSCODE_NATIVE 1440-wide canvas); pass an explicit value for a smaller custom
  // native window (see specs/step02-claudemd.tsx rightTermWidth) so the panel never overflows the window.
  terminalWidth?: number;
  mainMode?: "empty" | "editor";
  editorTab?: EditorTabSpec;
  sidebarWidth?: number;
}

import React from "react";
import { Img } from "remotion";
import { AppWindow } from "./core/AppWindow";
import { Glyph } from "./core/glyphs";
import { COLORS, FONTS } from "./core/tokens";

// Real design size for the whole mockup (STYLE.md: draw UI at real size, then Camera zooms/crops it).
// Wrap VSCodeScreen in the existing Camera (../assets/_core/Camera) with `native={VSCODE_NATIVE}` to zoom.
export const VSCODE_NATIVE = { w: 1440, h: 900 };
export const SIDEBAR_W = 272;
export const ACTIVITY_W = 48;
const HEADER_ROW_H = 36;
const ROW_H = 30;
export const TERM_H = 260; // bottom-layout terminal panel height
export const TERM_SIDE_W = 460; // right-layout terminal panel width (CEO 2026-09-17: panel position = right, the class's own VS Code setting from here on)

// ---- small ink/accent-only glyphs (deliberately NOT the shared yellow FileIcon — STYLE.md forbids
// yellow folder icons; these draw folder/file outlines in ink2/accent only). ----

const FolderGlyph: React.FC<{ size: number; tone: string }> = ({ size, tone }) => (
  <svg width={size} height={size} viewBox="0 0 20 16" style={{ display: "block", flex: "0 0 auto" }}>
    <path
      d="M1 2.4C1 1.6 1.6 1 2.4 1H7.6L9 3H17.6C18.4 3 19 3.6 19 4.4V13.6C19 14.4 18.4 15 17.6 15H2.4C1.6 15 1 14.4 1 13.6Z"
      fill="none"
      stroke={tone}
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
  </svg>
);

const FileGlyph: React.FC<{ size: number; tone: string }> = ({ size, tone }) => (
  <svg width={size} height={size} viewBox="0 0 16 20" style={{ display: "block", flex: "0 0 auto" }}>
    <path d="M2 1.4C2 1 2.3 0.7 2.7 0.7H10L14 4.7V18.3C14 18.7 13.7 19 13.3 19H2.7C2.3 19 2 18.7 2 18.3Z" fill="none" stroke={tone} strokeWidth={1.4} strokeLinejoin="round" />
    <path d="M10 0.7V4.4C10 4.6 10.2 4.7 10.4 4.7H14" fill="none" stroke={tone} strokeWidth={1.4} strokeLinejoin="round" />
  </svg>
);

// Dark VS Code palette (CEO 2026-09-17: every VS Code screen in this deck is dark mode, "Dark Modern"
// look). These are fixed dark-chrome tones, not deck design tokens — the deck's single blue accent
// (COLORS.accent) still does all the highlighting/selection work, matching real VS Code's own blue
// close enough (#1273c4 vs VS Code's #0078d4) without introducing a second chromatic color.
const VSCODE_DARK = {
  editorBg: "#1f1f1f",
  sidebarBg: "#181818",
  border: "#2b2b2b",
  text: "#cccccc",
  textMuted: "#9a9a9a",
  lineNumber: "#6e7681",
  hoverBg: "#2a2a2a",
  selectedBg: "rgba(18, 115, 196, 0.25)",
  inputBg: "#313131",
};

const HeaderIconBtn: React.FC<{ hot: boolean; children: React.ReactNode }> = ({ hot, children }) => (
  <div
    style={{
      width: 22,
      height: 22,
      borderRadius: 5,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: hot ? "rgba(18, 115, 196, 0.22)" : "transparent",
      border: hot ? `1px solid ${COLORS.accent}` : "1px solid transparent",
      color: hot ? COLORS.accent : VSCODE_DARK.textMuted,
    }}
  >
    {children}
  </div>
);

const ExplorerPane: React.FC<{
  width: number;
  root: string;
  nodes: ExplorerNode[];
  headerHot: NonNullable<VSCodeScreenProps["explorerHeaderHot"]>;
  headerIcons: boolean;
}> = ({ width, root, nodes, headerHot, headerIcons }) => {
  const showIcons = headerIcons || headerHot !== "none";
  return (
    <div style={{ width, flex: `0 0 ${width}px`, boxSizing: "border-box", background: VSCODE_DARK.sidebarBg, borderRight: `1px solid ${VSCODE_DARK.border}`, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: 26,
          flex: "0 0 26px",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.06em",
          color: VSCODE_DARK.textMuted,
        }}
      >
        EXPLORER
      </div>
      {/* Root row (the folder that's actually open in VS Code, i.e. "agent1") */}
      <div
        style={{
          height: HEADER_ROW_H,
          flex: `0 0 ${HEADER_ROW_H}px`,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 10px",
          background: showIcons ? VSCODE_DARK.hoverBg : "transparent",
        }}
      >
        <Glyph name="right" size={12} color={VSCODE_DARK.textMuted} strokeWidth={2.6} style={{ transform: "rotate(90deg)" }} />
        <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 13, letterSpacing: "0.03em", color: VSCODE_DARK.text, flex: "1 1 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {root.toUpperCase()}
        </span>
        {showIcons ? (
          <div style={{ display: "flex", gap: 3 }}>
            <HeaderIconBtn hot={headerHot === "newFile"}>
              <FileGlyph size={12} tone={headerHot === "newFile" ? COLORS.accent : VSCODE_DARK.textMuted} />
            </HeaderIconBtn>
            <HeaderIconBtn hot={headerHot === "newFolder"}>
              <FolderGlyph size={13} tone={headerHot === "newFolder" ? COLORS.accent : VSCODE_DARK.textMuted} />
            </HeaderIconBtn>
            <HeaderIconBtn hot={headerHot === "refresh"}>
              <Glyph name="refresh" size={13} color={headerHot === "refresh" ? COLORS.accent : VSCODE_DARK.textMuted} strokeWidth={2.4} />
            </HeaderIconBtn>
            <HeaderIconBtn hot={headerHot === "collapse"}>
              <Glyph name="up" size={13} color={headerHot === "collapse" ? COLORS.accent : VSCODE_DARK.textMuted} strokeWidth={2.4} />
            </HeaderIconBtn>
          </div>
        ) : null}
      </div>
      <div style={{ flex: "1 1 0", minHeight: 0, overflow: "hidden" }}>
        {nodes.map((n, i) => {
          const hot = n.state === "selected" || n.state === "hover";
          const tone = hot ? COLORS.accent : VSCODE_DARK.text;
          return (
            <div
              key={i}
              style={{
                height: ROW_H,
                display: "flex",
                alignItems: "center",
                gap: 6,
                paddingLeft: 12 + n.depth * 16,
                paddingRight: 10,
                minWidth: 0,
                overflow: "hidden",
                background: n.state === "selected" ? VSCODE_DARK.selectedBg : n.state === "hover" ? VSCODE_DARK.hoverBg : "transparent",
                borderLeft: n.state === "selected" ? `2px solid ${COLORS.accent}` : "2px solid transparent",
              }}
            >
              {n.kind === "folder" ? <FolderGlyph size={14} tone={tone} /> : <FileGlyph size={12} tone={tone} />}
              {n.editingValue !== undefined ? (
                <span
                  style={{
                    fontFamily: FONTS.term,
                    fontSize: 13,
                    color: "#e8eaec",
                    background: VSCODE_DARK.inputBg,
                    border: `1px solid ${COLORS.accent}`,
                    borderRadius: 3,
                    padding: "1px 6px",
                    boxShadow: "0 0 0 2px rgba(18, 115, 196, 0.28)",
                  }}
                >
                  {n.editingValue}
                  <span style={{ display: "inline-block", width: 1, height: 13, background: "#e8eaec", marginLeft: 1, transform: "translateY(2px)" }} />
                </span>
              ) : (
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontWeight: hot ? 700 : 500,
                    fontSize: 13,
                    color: hot ? COLORS.accent : VSCODE_DARK.text,
                    minWidth: 0,
                    flex: "0 1 auto",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {n.name}
                </span>
              )}
              {n.state === "new" ? <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accent, marginLeft: 2 }} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TerminalPane: React.FC<{
  width: number;
  side: "bottom" | "right";
  title: string;
  lines: TerminalPaneLine[];
  content?: React.ReactNode;
}> = ({ width, side, title, lines, content }) => (
  <div
    style={{
      width,
      flex: side === "bottom" ? `0 0 ${TERM_H}px` : "0 0 auto",
      height: side === "bottom" ? TERM_H : "100%",
      boxSizing: "border-box",
      background: COLORS.void2,
      borderTop: side === "bottom" ? `1px solid ${COLORS.lineDark}` : undefined,
      borderLeft: side === "right" ? `1px solid ${COLORS.lineDark}` : undefined,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div style={{ height: 30, flex: "0 0 30px", display: "flex", alignItems: "center", gap: 16, padding: "0 14px", borderBottom: `1px solid ${COLORS.lineDark}` }}>
      <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 12, letterSpacing: "0.04em", color: "#e8eaec", borderBottom: `2px solid ${COLORS.accent}`, paddingBottom: 6 }}>{title}</span>
    </div>
    {content ? (
      <div style={{ flex: "1 1 0", minHeight: 0, overflow: "hidden" }}>{content}</div>
    ) : (
      <div style={{ flex: "1 1 0", minHeight: 0, padding: "10px 16px", display: "flex", flexDirection: "column", gap: 4, fontFamily: FONTS.term, fontSize: 15, lineHeight: 1.5, overflow: "hidden" }}>
        {lines.map((l, i) => {
          const color = l.type === "error" ? "#ff8a80" : l.type === "success" ? "#e8eaec" : l.type === "input" ? "#e8eaec" : "#cfd2d4";
          return (
            <div key={i} style={{ whiteSpace: "pre-wrap", color }}>
              {l.type === "input" ? <span style={{ color: "#767c81" }}>PS C:\agent1&gt; </span> : null}
              {l.text}
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export const VSCodeScreen: React.FC<VSCodeScreenProps> = ({
  width,
  height,
  windowTitle = "\uC5D0\uC774\uC804\uD2B81 \u2014 Visual Studio Code",
  explorerRoot = "agent1",
  explorerNodes = [
    { name: ".claude", kind: "folder", depth: 0, state: "selected" },
    { name: "CLAUDE.md", kind: "file", depth: 1 },
  ],
  explorerHeaderHot = "none",
  explorerHeaderIcons = false,
  showTerminal = true,
  terminalTitle = "\uD130\uBBF8\uB110",
  terminalLines = [],
  terminalContent,
  layout = "bottom",
  terminalWidth = TERM_SIDE_W,
  mainMode = "empty",
  editorTab,
  sidebarWidth = SIDEBAR_W,
}) => (
  <div style={{ width, height }}>
    <AppWindow width={width} height={height} os="windows" theme="dark" title={windowTitle} native enter="none" float={false}>
      <div style={{ position: "absolute", inset: 0, display: "flex", background: VSCODE_DARK.editorBg }}>
        {/* Activity bar */}
        <div style={{ width: ACTIVITY_W, flex: `0 0 ${ACTIVITY_W}px`, background: VSCODE_DARK.sidebarBg, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10, gap: 14 }}>
          <div style={{ width: 4, height: 26, borderRadius: 2, background: COLORS.accent, position: "absolute", left: 0, marginTop: 3 }} />
          <FileGlyph size={18} tone="#e8eaec" />
          <Glyph name="scan" size={17} color="#8a8a8a" strokeWidth={2} />
          <Glyph name="box" size={17} color="#8a8a8a" strokeWidth={2} />
        </div>
        <ExplorerPane width={sidebarWidth} root={explorerRoot} nodes={explorerNodes} headerHot={explorerHeaderHot} headerIcons={explorerHeaderIcons} />
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: layout === "right" ? "row" : "column" }}>
          <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column" }}>
          {mainMode === "editor" && editorTab ? (
            <>
              <div style={{ height: 34, flex: "0 0 34px", minWidth: 0, overflow: "hidden", display: "flex", alignItems: "center", background: VSCODE_DARK.sidebarBg, borderBottom: `1px solid ${VSCODE_DARK.border}` }}>
                {/* minWidth:0 + ellipsis (2026-09-18 render review: a long filename in a narrow right-layout
                    editor column — e.g. IMG_20260309_134502.jpg next to a wide terminal panel — used to
                    overflow past the column and get painted over by the terminal panel's own background,
                    reading as an abrupt mid-name cut. Real VS Code tabs ellipsize the same way, so this is
                    also the more faithful mock. Short names that already fit render byte-identical.) */}
                <div style={{ height: "100%", minWidth: 0, maxWidth: "100%", boxSizing: "border-box", display: "flex", alignItems: "center", gap: 10, padding: "0 16px", background: VSCODE_DARK.editorBg, borderRight: `1px solid ${VSCODE_DARK.border}`, borderTop: `2px solid ${COLORS.accent}` }}>
                  <FileGlyph size={13} tone={COLORS.accent} />
                  <span style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 13, color: VSCODE_DARK.text, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{editorTab.name}</span>
                  {editorTab.dirty ? <span style={{ width: 8, height: 8, borderRadius: "50%", background: VSCODE_DARK.textMuted, flex: "0 0 auto" }} /> : <span style={{ width: 8, flex: "0 0 auto" }} />}
                </div>
              </div>
              {editorTab.image ? (
                <div style={{ flex: "1 1 0", minHeight: 0, background: VSCODE_DARK.editorBg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, boxSizing: "border-box" }}>
                  <Img
                    src={editorTab.image}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 4, boxShadow: "0 14px 34px rgba(0,0,0,0.5)" }}
                  />
                </div>
              ) : (
                <div style={{ flex: "1 1 0", minHeight: 0, background: VSCODE_DARK.editorBg, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {(editorTab.lines ?? []).map((ln, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, fontFamily: FONTS.term, fontSize: 15, lineHeight: 1.6 }}>
                      <span style={{ color: VSCODE_DARK.lineNumber, width: 22, textAlign: "right", flex: "0 0 auto" }}>{i + 1}</span>
                      <span style={{ color: VSCODE_DARK.text, whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>{ln}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ flex: "1 1 0", minHeight: 0, background: VSCODE_DARK.editorBg }} />
          )}
          {layout === "bottom" && showTerminal ? (
            <TerminalPane width={width - ACTIVITY_W - SIDEBAR_W} side="bottom" title={terminalTitle} lines={terminalLines} content={terminalContent} />
          ) : null}
          </div>
          {layout === "right" && showTerminal ? (
            <TerminalPane width={terminalWidth} side="right" title={terminalTitle} lines={terminalLines} content={terminalContent} />
          ) : null}
        </div>
      </div>
    </AppWindow>
  </div>
);

