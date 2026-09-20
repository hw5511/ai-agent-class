// Native (realistic) typography for assets drawn inside a Camera: real OS / app proportions instead of text
// fitted big to the slot. The camera zoom makes it readable; on-screen px = these px x camera scale.
// tools/spec_lint.py reads the key text size per asset from registry.json `nativeKeyText` (keep in sync).

export const NATIVE = {
  // Window chrome (AppWindow native).
  windowHeader: 34,
  windowTitle: 13,
  windowBorder: 1,
  windowRadius: 10,
  windowGlyph: 11,
  // Terminal / code text.
  term: 15,
  code: 15,
  // UI text.
  body: 14,
  label: 12,
  tag: 11,
  title: 16,
  cardTitle: 18,
  key: 14,
  badge: 13,
} as const;
