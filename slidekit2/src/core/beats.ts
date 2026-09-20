// Beat driver: turns a cue ({chunk:n} or {frame:n}) into a scene-local frame.
// Chunk cues resolve through the scene's voice-aligned chunk_frames (scripts/<slug>.json). When a scene
// has no chunk_frames (not voiced yet) the chunk start is estimated proportionally: by chunk text length
// when the chunk texts are known (same rule as timing.ts spreadChunks), else by equal split.
// A chunk-indexed cue survives re-voicing; a hard-coded frame does not.

import React, { createContext, useContext } from "react";
import { Easing, interpolate } from "remotion";

export type Cue = { chunk: number; offset?: number } | { frame: number; offset?: number };

export interface BeatContext {
  // Scene length in frames.
  duration: number;
  // Voice-aligned chunk start frames (scene.chunk_frames).
  chunkFrames?: number[];
  // Chunk texts (scene.chunks) for the proportional fallback.
  chunks?: string[];
  // Chunk count when neither frames nor texts are known.
  chunkCount?: number;
}

export const isChunkCue = (cue: Cue): cue is { chunk: number; offset?: number } => "chunk" in cue;

// Proportional chunk start when chunk_frames is missing.
export function estimateChunkFrame(n: number, ctx: BeatContext): number {
  const texts = ctx.chunks ?? [];
  if (texts.length > 0) {
    const total = texts.reduce((a, t) => a + t.length, 0) || 1;
    let chars = 0;
    for (let i = 0; i < Math.min(n, texts.length); i += 1) chars += texts[i].length;
    return Math.round((chars / total) * ctx.duration);
  }
  const count = Math.max(ctx.chunkCount ?? n + 1, 1);
  return Math.round((Math.min(n, count) / count) * ctx.duration);
}

export function resolveCue(cue: Cue, ctx: BeatContext): number {
  const offset = cue.offset ?? 0;
  if (!isChunkCue(cue)) return cue.frame + offset;
  const frames = ctx.chunkFrames;
  const n = Math.max(0, Math.floor(cue.chunk));
  const valid = frames && (!ctx.chunks || frames.length === ctx.chunks.length);
  if (frames && valid && n < frames.length) return frames[n] + offset;
  return estimateChunkFrame(n, ctx) + offset;
}

// Cue or plain frame number -> frame. undefined stays undefined.
export const cueFrame = (cue: Cue | number | undefined, ctx: BeatContext): number | undefined =>
  cue === undefined ? undefined : typeof cue === "number" ? cue : resolveCue(cue, ctx);

const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// 0 -> 1 over `dur` frames from `start` (eased). 0 before start.
export const rampIn = (frame: number, start: number, dur = 12): number =>
  interpolate(frame, [start, start + Math.max(dur, 1)], [0, 1], { ...clamp, easing: EASE });

// In at `start`, out at `end` (both eased). Without `end` it stays on.
export function window01(frame: number, start: number, end?: number, dur = 12): number {
  const up = rampIn(frame, start, dur);
  if (end === undefined) return up;
  const down = interpolate(frame, [end, end + Math.max(dur, 1)], [1, 0], { ...clamp, easing: EASE });
  return Math.min(up, down);
}

// Last item whose resolved start is <= frame (state machines driven by beats: active menu row, tab ...).
export function activeAt<T extends { at: Cue | number }>(items: T[] | undefined, frame: number, ctx: BeatContext): T | undefined {
  let best: T | undefined;
  let bestAt = -Infinity;
  for (const item of items ?? []) {
    const at = cueFrame(item.at, ctx) ?? 0;
    if (at <= frame && at >= bestAt) {
      best = item;
      bestAt = at;
    }
  }
  return best;
}

// Assets read the scene's beat context from here, so a spec renderer sets it once per scene.
const Ctx = createContext<BeatContext>({ duration: 300 });

export const BeatProvider: React.FC<{ value: BeatContext; children?: React.ReactNode }> = ({ value, children }) =>
  React.createElement(Ctx.Provider, { value }, children);

export const useBeatContext = (): BeatContext => useContext(Ctx);
