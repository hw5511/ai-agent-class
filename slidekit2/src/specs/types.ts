// Spec entry type shared by every step02-<part> slide-deck spec file.
import type React from "react";

export interface SlideEntry {
  // 1-based slide number, matches the plan doc order.
  index: number;
  // Original file base name from the plan (no extension), e.g. "01_CLAUDE_md_란". render_slides.mjs
  // derives the output PNG file name from this (it never keeps its own hand-written name list).
  name: string;
  // Slide title (keyword noun phrase, no question/fragment) — used by TODO placeholders too.
  title: string;
  // Returns the fully composed <SlideFrame> element for this slide.
  render: () => React.ReactElement;
}

// One lesson part of the step02 deck (e.g. "claudemd", "read", "bash"). Each part is its own spec file
// under ./step02-<id>.tsx and owns its own entries — a worker building one part never needs to touch
// another part's file or ./registry.ts once the stub for their part exists.
export interface PartSpec {
  // Part id, matches the spec file name step02-<id>.tsx and the render_slides.mjs CLI arg / output dir
  // suffix (_drafts/step02_<id>[_v1]).
  id: string;
  // Eyebrow label before " · NN/TOTAL", e.g. "CLAUDE.MD", "READ 툴". Passed to SlideFrame.
  eyebrow: string;
  entries: SlideEntry[];
}
