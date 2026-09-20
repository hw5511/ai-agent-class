// @slide-component: ClaudeCodeTerminal — a reusable mockup of what a student sees after typing `claude`
// in the VS Code integrated terminal (dark VS Code palette). Used on every step02-claudemd slide where
// Claude is launched or answers, so the terminal look (welcome box, conversation, input box) is drawn
// once instead of hand-built per slide.
//
// Two ways to use it:
//   <ClaudeCodeTerminal>       content only (no background/border) — drop into VSCodeScreen's
//                               `terminalContent` slot (../VSCodeScreen), which already draws the panel
//                               chrome (tab bar, dark ground, border).
//   <ClaudeCodeTerminalPanel>  the same content wrapped in its own dark bordered panel (x, y, width) —
//                               for standalone/comparison slides that are not inside a VSCodeScreen.
//
// `layoutClaudeCodeTerminal(props)` runs the exact same line-wrap + vertical-rhythm math the component
// itself uses, so a slide can grab the absolute y (and wrapped line list) of the launch line / welcome
// box / any turn / the input box to place a FocusBadge next to it without covering the text.
//
// Real Claude Code CLI look this mirrors (see src/components/Terminal.tsx / templates/components.css
// `.t-*` classes for the episode-narration equivalent): dim prompt "PS <cwd>> ", an orange-bordered
// welcome box with a "✻" mark, "> " dim-grey user turns, "●" near-white assistant turns, and a
// rounded-grey input box with "> " + typed text/caret or dim placeholder, plus a dim "? for shortcuts"
// hint line.
import React from "react";
import { COLORS, FONTS } from "./core/tokens";

export interface ClaudeCodeTurn {
  role: "user" | "assistant";
  text: string;
}

export interface ClaudeCodeTerminalProps {
  width: number;
  // Optional explicit height — clips/pads the content box. Omit to size to content (layout.totalHeight).
  height?: number;
  showLaunch?: boolean;
  launchPath?: string; // default "C:\agent1"
  showWelcome?: boolean;
  cwd?: string; // default "C:\agent1"
  turns?: ClaudeCodeTurn[];
  inputText?: string;
  placeholder?: string;
  showHint?: boolean; // default true
  fontSize?: number; // default 15 (matches VSCodeScreen's own terminal panel)
  // Extra left inset (px) reserved so a FocusBadge can sit immediately left of a line INSIDE the
  // terminal instead of floating out in the (often near-empty) editor column beside it (2026-09-18
  // render review, defect 4). Default 0 (no gutter) — pass this on slides that pin a badge next to a
  // launch/turn/input line.
  leftGutter?: number;
}

// Claude's brand orange — used ONLY inside this mock (the welcome box border), never for slide chrome or
// badges: the deck's one accent color stays blue everywhere else (plan hard rule). This is the one
// deliberate exception because it is the real product's own color.
const CLAUDE_ORANGE = "#D97757";

const TERM_DARK = {
  dim: "#767c81",
  text: "#e8eaec",
  softText: "#cfd2d4",
  muted: "#9a9a9a",
  hint: "#5b5e61",
  inputBorder: "#3a3d40",
  caret: "#cfd2d4",
};

const metrics = (fontSize: number) => ({
  lineH: Math.round(fontSize * 1.6),
  charW: fontSize * 0.6,
});

// Fullwidth-aware char-width wrap. D2Coding (like every CJK monospace font) draws Hangul/CJK glyphs at
// ~2x an ASCII glyph's cell width — a flat "N characters per line" wrap (which this used to be) badly
// under-counts a mostly-Korean line's real pixel width and overflows the box (2026-09-17 render review:
// turn text ran past the terminal panel's right edge). Cost each char 1 "half-width unit" (ASCII) or 2
// (Hangul/CJK/fullwidth punctuation) and wrap on a unit budget instead of a raw character count.
function charWidthUnits(ch: string): number {
  const code = ch.codePointAt(0) ?? 0;
  const isWide =
    (code >= 0x1100 && code <= 0x11ff) || // Hangul Jamo
    (code >= 0x2e80 && code <= 0x9fff) || // CJK radicals/punctuation/unified ideographs
    (code >= 0x3130 && code <= 0x318f) || // Hangul compatibility jamo
    (code >= 0xac00 && code <= 0xd7a3) || // Hangul syllables
    (code >= 0xff00 && code <= 0xffef); // fullwidth forms
  return isWide ? 2 : 1;
}

function unitsOf(s: string): number {
  let u = 0;
  for (const ch of Array.from(s)) u += charWidthUnits(ch);
  return u;
}

// Word-boundary wrap: breaks only at spaces (space-separated eojeol for Korean, words for
// English/mixed text). A single "word" longer than the whole line budget is the only thing that
// gets hard-broken by character (2026-09-18 render review: the old per-character wrap split mid-word,
// "A / nthropic", "에이 / 전트" — reads as broken Korean/English, not a real line wrap).
function wrapByWidth(text: string, maxUnits: number): string[] {
  if (maxUnits <= 0) return [text];
  if (unitsOf(text) <= maxUnits) return [text];

  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  let curUnits = 0;

  const flush = () => {
    if (cur !== "") {
      lines.push(cur);
      cur = "";
      curUnits = 0;
    }
  };

  for (const word of words) {
    const wordUnits = unitsOf(word);
    if (wordUnits > maxUnits) {
      // Single word longer than a whole line — the only case allowed to hard-break by character.
      flush();
      let chunk = "";
      let chunkUnits = 0;
      for (const ch of Array.from(word)) {
        const u = charWidthUnits(ch);
        if (chunkUnits + u > maxUnits && chunk !== "") {
          lines.push(chunk);
          chunk = "";
          chunkUnits = 0;
        }
        chunk += ch;
        chunkUnits += u;
      }
      cur = chunk;
      curUnits = chunkUnits;
      continue;
    }
    const sepUnits = cur === "" ? 0 : 1; // the space we'd rejoin with
    if (curUnits + sepUnits + wordUnits > maxUnits && cur !== "") {
      lines.push(cur);
      cur = word;
      curUnits = wordUnits;
    } else {
      cur = cur === "" ? word : `${cur} ${word}`;
      curUnits += sepUnits + wordUnits;
    }
  }
  if (cur !== "" || lines.length === 0) lines.push(cur);
  return lines;
}

export interface ClaudeCodeTurnLayout {
  role: ClaudeCodeTurn["role"];
  lines: string[];
  ys: number[]; // y of each wrapped line, relative to the component's own top
  anchorY: number; // y of the first line (convenience — matches ys[0])
}

export interface ClaudeCodeTerminalLayout {
  totalHeight: number;
  launchY?: number;
  welcomeY?: number;
  welcomeH?: number;
  welcomeHelpLines?: string[];
  welcomeCwdLines?: string[];
  turns: ClaudeCodeTurnLayout[];
  inputY: number;
  inputH: number;
  hintY?: number;
  padH: number;
  padLeft: number;
  charW: number;
  lineH: number;
}

const PAD_H = 16;
const PAD_V = 10;
const HELP_LINE_TEXT = "/help for help, /status for your current setup";

export function layoutClaudeCodeTerminal(props: ClaudeCodeTerminalProps): ClaudeCodeTerminalLayout {
  const {
    width,
    showLaunch = false,
    showWelcome = false,
    cwd = "C:\\agent1",
    turns = [],
    showHint = true,
    fontSize = 15,
    leftGutter = 0,
  } = props;
  const { lineH, charW } = metrics(fontSize);
  const padLeft = PAD_H + leftGutter;

  let y = PAD_V;
  let launchY: number | undefined;
  if (showLaunch) {
    launchY = y;
    y += lineH + Math.round(lineH * 0.5);
  }

  let welcomeY: number | undefined;
  let welcomeH: number | undefined;
  let welcomeHelpLines: string[] | undefined;
  let welcomeCwdLines: string[] | undefined;
  if (showWelcome) {
    welcomeY = y;
    const boxPadV = Math.round(fontSize * 0.65);
    const boxPadH = Math.round(fontSize * 1.05);
    // Box sizes to its actual (wrapped) content instead of an assumed fixed 3 lines — with a narrow
    // terminal the "/help ..." line wraps and the fixed-height box let the "cwd: ..." line touch/overlap
    // the bottom border (2026-09-18 render review, defect 3).
    const boxContentUnits = Math.max(10, Math.floor((width - padLeft - PAD_H - boxPadH * 2) / charW));
    welcomeHelpLines = wrapByWidth(HELP_LINE_TEXT, boxContentUnits);
    welcomeCwdLines = wrapByWidth(`cwd: ${cwd}`, boxContentUnits);
    const totalLines = 1 + welcomeHelpLines.length + welcomeCwdLines.length; // title + help + cwd
    const paragraphGap = Math.round(lineH * 0.08) * 2; // 2 gaps between the 3 paragraph groups
    welcomeH = boxPadV * 2 + lineH * totalLines + paragraphGap;
    y += welcomeH + Math.round(lineH * 0.6);
  }

  // "> "/"● " prefix is 2 ASCII cells = 2 half-width units; reserve those from the wrap budget.
  const availUnits = Math.max(10, Math.floor((width - padLeft - PAD_H) / charW) - 2);
  const turnLayouts: ClaudeCodeTurnLayout[] = turns.map((t) => {
    const lines = wrapByWidth(t.text, availUnits);
    const ys = lines.map((_, i) => y + i * lineH);
    const anchorY = ys[0];
    y += lines.length * lineH + Math.round(lineH * 0.45);
    return { role: t.role, lines, ys, anchorY };
  });

  const inputBoxPadV = Math.round(fontSize * 0.55);
  const inputH = inputBoxPadV * 2 + lineH;
  const inputY = y;
  y += inputH;

  let hintY: number | undefined;
  if (showHint) {
    hintY = y + Math.round(lineH * 0.35);
    y = hintY + Math.round(fontSize * 1.1);
  }

  return {
    totalHeight: y + PAD_V,
    launchY,
    welcomeY,
    welcomeH,
    welcomeHelpLines,
    welcomeCwdLines,
    turns: turnLayouts,
    inputY,
    inputH,
    hintY,
    padH: PAD_H,
    padLeft,
    charW,
    lineH,
  };
}

// Simple inline-SVG asterisk fallback, in case "✻" tofu's in D2Coding/Pretendard at render time (plan
// hard rule: no tofu). Six-armed sparkle in Claude orange, sized to the text's line-height.
const AsteriskGlyph: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "inline-block", verticalAlign: "-0.12em" }}>
    {[0, 60, 120].map((deg) => (
      <line key={deg} x1="12" y1="2" x2="12" y2="22" stroke={CLAUDE_ORANGE} strokeWidth={2.4} strokeLinecap="round" transform={`rotate(${deg} 12 12)`} />
    ))}
  </svg>
);

// Set true only if a render review finds the literal "✻" glyph tofu'ing in D2Coding/Pretendard.
const ASTERISK_IS_TOFU = false;

export const ClaudeCodeTerminal: React.FC<ClaudeCodeTerminalProps> = (props) => {
  const {
    width,
    height,
    showLaunch = false,
    launchPath = "C:\\agent1",
    showWelcome = false,
    cwd = "C:\\agent1",
    inputText,
    placeholder,
    showHint = true,
    fontSize = 15,
  } = props;
  const layout = layoutClaudeCodeTerminal(props);
  const { lineH, charW, padLeft } = layout;
  const h = height ?? layout.totalHeight;

  return (
    <div
      style={{
        position: "relative",
        width,
        height: h,
        boxSizing: "border-box",
        fontFamily: FONTS.term,
        fontSize,
        overflow: "hidden",
      }}
    >
      {showLaunch && layout.launchY !== undefined ? (
        <div style={{ position: "absolute", left: padLeft, top: layout.launchY, whiteSpace: "pre", color: TERM_DARK.text }}>
          <span style={{ color: TERM_DARK.dim }}>{`PS ${launchPath}> `}</span>claude
        </div>
      ) : null}

      {showWelcome && layout.welcomeY !== undefined && layout.welcomeH !== undefined ? (
        <div
          style={{
            position: "absolute",
            left: padLeft,
            top: layout.welcomeY,
            width: width - padLeft - PAD_H,
            height: layout.welcomeH,
            boxSizing: "border-box",
            border: `1px solid ${CLAUDE_ORANGE}`,
            borderRadius: 5,
            padding: `${Math.round(fontSize * 0.65)}px ${Math.round(fontSize * 1.05)}px`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span style={{ color: TERM_DARK.text, fontWeight: 700, lineHeight: `${lineH}px` }}>
            {ASTERISK_IS_TOFU ? <AsteriskGlyph size={Math.round(fontSize * 0.95)} /> : <span style={{ color: CLAUDE_ORANGE }}>{"\u273B"}</span>}
            {" Welcome to Claude Code!"}
          </span>
          {/* No CSS `gap` here \u2014 this can wrap to a variable number of lines, and a flex `gap` would add
              space between every wrapped line, not just between the 3 paragraph groups (which is what
              welcomeH above accounts for). Instead a small margin-top on each group's first line only. */}
          {(layout.welcomeHelpLines ?? [HELP_LINE_TEXT]).map((ln, i) => (
            <span key={`help-${i}`} style={{ color: TERM_DARK.muted, lineHeight: `${lineH}px`, marginTop: i === 0 ? Math.round(lineH * 0.08) : 0 }}>
              {ln}
            </span>
          ))}
          {(layout.welcomeCwdLines ?? [`cwd: ${cwd}`]).map((ln, i) => (
            <span key={`cwd-${i}`} style={{ color: TERM_DARK.muted, lineHeight: `${lineH}px`, marginTop: i === 0 ? Math.round(lineH * 0.08) : 0 }}>
              {ln}
            </span>
          ))}
        </div>
      ) : null}

      {layout.turns.map((t, ti) => {
        const isUser = t.role === "user";
        const prefix = isUser ? "> " : "\u25CF "; // "> " / "● "
        const color = isUser ? TERM_DARK.dim : TERM_DARK.text;
        const hangIndent = prefix.length * charW;
        return (
          <React.Fragment key={ti}>
            {t.lines.map((ln, li) => (
              <div
                key={li}
                style={{
                  position: "absolute",
                  left: padLeft + (li === 0 ? 0 : hangIndent),
                  top: t.ys[li],
                  color,
                  whiteSpace: "pre",
                  lineHeight: `${lineH}px`,
                }}
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
          width: width - padLeft - PAD_H,
          height: layout.inputH,
          boxSizing: "border-box",
          border: `1px solid ${TERM_DARK.inputBorder}`,
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: `0 ${Math.round(fontSize * 0.75)}px`,
        }}
      >
        <span style={{ color: TERM_DARK.dim }}>{"\u003E"}</span>
        {inputText ? (
          <>
            <span style={{ color: TERM_DARK.text, whiteSpace: "pre" }}>{inputText}</span>
            <span style={{ display: "inline-block", width: Math.max(2, Math.round(fontSize * 0.5)), height: Math.round(fontSize * 1.15), background: TERM_DARK.caret }} />
          </>
        ) : placeholder ? (
          <span style={{ color: TERM_DARK.hint, whiteSpace: "pre" }}>{placeholder}</span>
        ) : null}
      </div>

      {showHint && layout.hintY !== undefined ? (
        <div style={{ position: "absolute", left: padLeft, top: layout.hintY, color: TERM_DARK.hint, fontSize: Math.round(fontSize * 0.85) }}>? for shortcuts</div>
      ) : null}
    </div>
  );
};

export interface ClaudeCodeTerminalPanelProps extends ClaudeCodeTerminalProps {
  x: number;
  y: number;
}

// Standalone dark panel wrapper (no VS Code chrome) for comparison-style slides that show the terminal
// on its own, not inside a VSCodeScreen.
export const ClaudeCodeTerminalPanel: React.FC<ClaudeCodeTerminalPanelProps> = ({ x, y, ...rest }) => {
  const layout = layoutClaudeCodeTerminal(rest);
  const h = rest.height ?? layout.totalHeight;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: rest.width,
        height: h,
        boxSizing: "border-box",
        background: COLORS.void2,
        border: `1px solid ${COLORS.lineDark}`,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <ClaudeCodeTerminal {...rest} height={h} />
    </div>
  );
};
