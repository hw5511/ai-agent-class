// @slide-component: SlideRoot — the Remotion root for the still-slide mockup mode. One composition per
// lesson part (id = the part id, e.g. "s2-claudemd"), 1920x1080, one frame per slide
// (durationInFrames = that part's slide count). Frame N (0-based) renders slide N+1 by indexing into the
// part's `entries` (SlideEntry[] from ./specs/*, looked up via ./specs/registry.ts — the only file a part
// worker needs to have their stub already listed in). This file and its own ./index.ts registerRoot are
// separate from the episode Root.tsx/index.ts — existing files are never imported or modified here except
// read-only asset/token/layout modules under ../assets and ../../templates.
import React, { useEffect, useState } from "react";
import { Composition, continueRender, delayRender, useCurrentFrame } from "remotion";
import { STEP02_PARTS } from "./specs/registry";
import type { SlideEntry } from "./specs/types";

// Fonts this deck is allowed to use (plan hard rule: Pretendard / Spoqa Han Sans Neo / D2Coding only).
// tokens.css @imports all of them from CDN; this hook blocks the still capture until these three report
// loaded via the Font Loading API, so a render never grabs a mid-swap Malgun-Gothic frame.
const REQUIRED_FONTS = ['700 40px "Pretendard"', '400 40px "Spoqa Han Sans Neo"', '600 40px "Spoqa Han Sans Neo"', '400 40px "D2Coding ligature"'];

const useFontsReady = () => {
  const [handle] = useState(() => delayRender("slides: wait for Pretendard / Spoqa Han Sans Neo / D2Coding"));
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        await document.fonts.ready;
        await Promise.all(REQUIRED_FONTS.map((f) => document.fonts.load(f).catch(() => undefined)));
        const deadline = Date.now() + 15000;
        // Poll: document.fonts.ready can resolve before every @font-face finished swapping in.
        while (!cancelled && Date.now() < deadline) {
          if (REQUIRED_FONTS.every((f) => document.fonts.check(f))) break;
          await new Promise((r) => setTimeout(r, 50));
        }
      } finally {
        if (!cancelled) continueRender(handle);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// `entries` is NOT taken as a Composition prop: Remotion serializes props to JSON (CLI/player
// round-trip), so a spec's `render()` function can never survive as `defaultProps`. Each part's entries
// are closed over per-composition instead — a different part = a different Composition id, not a
// different prop. `slideNames` IS a (serializable, string[]) defaultProps field — not consumed by the
// component itself, only so render_slides.mjs can read a part's output file names off
// `selectComposition(...).defaultProps.slideNames` (SlideEntry["name"], in order) instead of keeping its
// own hand-written name list per part.
type PartDeckProps = { slideNames?: string[] };

const makePartDeck = (entries: SlideEntry[]): React.FC<PartDeckProps> => {
  const PartDeck: React.FC<PartDeckProps> = () => {
    useFontsReady();
    const frame = useCurrentFrame();
    const entry = entries[Math.max(0, Math.min(frame, entries.length - 1))];
    if (!entry) return null;
    return entry.render();
  };
  return PartDeck;
};

export const SlideRootComponent: React.FC = () => (
  <>
    {STEP02_PARTS.map((part) => (
      <Composition
        key={part.id}
        id={part.id}
        component={makePartDeck(part.entries)}
        durationInFrames={part.entries.length}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ slideNames: part.entries.map((e) => e.name) }}
      />
    ))}
  </>
);
