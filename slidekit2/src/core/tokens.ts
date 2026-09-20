// Design tokens as TS constants. Values mirror templates/tokens.css (:root) one-to-one, so assets can use
// them in inline styles and in SVG attributes (where CSS variables are awkward). If tokens.css changes,
// change the literal here too. The CSS variable name is kept next to each value for grep.

export const COLORS = {
  ink: "#101113", // --ink
  ink2: "#43474b", // --ink-2
  ink3: "#7c8288", // --ink-3
  paper: "#f0efec", // --paper
  paper2: "#ffffff", // --paper-2
  void: "#15181a", // --void
  void2: "#0c0d0e", // --void-2 (terminal ground)
  line: "#d5d2cc", // --line
  lineDark: "#2c3033", // --line-dark
  accent: "#1273c4", // --accent (the only chromatic accent)
  accentDeep: "#0a568f", // --accent-deep
  accentWash: "#e8f2fb", // --accent-wash
} as const;

export const FONTS = {
  display: '"Pretendard", "Pretendard Variable", sans-serif', // --font-display
  body: '"Spoqa Han Sans Neo", "Pretendard", sans-serif', // --font-body
  caption: '"Noto Sans KR", "Pretendard", sans-serif', // --font-caption
  code: '"JetBrains Mono", "D2Coding ligature", "D2Coding", monospace', // --font-code
  term: '"D2Coding ligature", "D2Coding", "JetBrains Mono", monospace', // --font-term
} as const;

export const FONT_SIZES = {
  mega: 168, // --fs-mega
  xxl: 116, // --fs-xxl
  xl: 76, // --fs-xl
  lg: 54, // --fs-lg
  md: 40, // --fs-md
  sm: 30, // --fs-sm
  xs: 24, // --fs-xs
  caption: 52, // --fs-caption
  term: 26, // --fs-term
} as const;

export const RADIUS = {
  base: 14, // --radius
  outer: 18, // STYLE.md section 3: outer frame 14-18px
  inner: 7, // STYLE.md section 3: inner element 6-8px
} as const;

export const PAD_FRAME = 120; // --pad-frame

// Window chrome palettes. light = generated/lib/TerminalWindowFrame.tsx (theme="light"),
// dark = generated/lib/VsCodeWindowFrame.tsx (the dark palette the generated sets adopted).
export const WINDOW_THEME = {
  light: {
    body: "#ffffff",
    header: "#f7f6f4",
    headerRule: COLORS.line,
    border: COLORS.line,
    borderFocused: COLORS.ink,
    dot: COLORS.line,
    dotRing: "transparent",
    title: COLORS.ink2,
    glyph: COLORS.ink2,
  },
  dark: {
    body: "#1f1f1f",
    header: "#181818",
    headerRule: "#2b2b2b",
    border: "#2b2b2b",
    borderFocused: "#6e6e6e",
    dot: "#3c3c3c",
    dotRing: "#6e6e6e",
    title: "#cccccc",
    glyph: "#9a9a9a",
  },
} as const;

// Terminal body palettes. dark = templates/components.css section 4 (.mac-term / .t-*), light = the
// TerminalWindowFrame light body with ink text.
export const TERM_THEME = {
  dark: {
    ground: "#1f1f1f",
    text: "#cfd2d4",
    strong: "#e8eaec",
    dim: "#767c81",
    args: "#b9bdc0",
    box: "#3a3d40",
    error: "#ff6b6b",
    hot: "#e06c60",
    caret: "#cfd2d4",
    highlight: "rgba(18, 115, 196, 0.26)",
    tabOn: COLORS.accent,
    tabOnText: "#ffffff",
  },
  light: {
    ground: "#ffffff",
    text: COLORS.ink2,
    strong: COLORS.ink,
    dim: COLORS.ink3,
    args: COLORS.ink2,
    box: COLORS.line,
    error: "#c9302c",
    hot: "#c9302c",
    caret: COLORS.ink,
    highlight: COLORS.accentWash,
    tabOn: COLORS.accent,
    tabOnText: "#ffffff",
  },
} as const;

export type Tone = keyof typeof TERM_THEME;
