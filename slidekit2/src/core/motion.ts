// Motion presets for assets. The dictionary lives in src/motion/registry.ts (owned by the motion work);
// assets only pick presets by code name and turn the numeric style into CSS here.
// TODO: when src/motion/runtime.tsx exports toCss, use it instead of motionCss below.

import type React from "react";
import { EMPHASIS, ENTER, resolveParams, type EmphasisCode, type EnterCode, type MotionParams, type MotionStyle } from "./motion-registry";

export type { EmphasisCode, EnterCode, MotionStyle };

export function enterStyle(code: EnterCode | "none", frame: number, fps: number, params?: Partial<MotionParams>): MotionStyle {
  if (code === "none") return {};
  const def = ENTER[code];
  return def.fn(frame, fps, resolveParams(def, params));
}

export function emphasisStyle(code: EmphasisCode, frame: number, fps: number, params?: Partial<MotionParams>): MotionStyle {
  const def = EMPHASIS[code];
  return def.fn(frame, fps, resolveParams(def, params));
}

// Transform/opacity part of a MotionStyle as CSS (ring/underline/tint/dim are drawn by the asset itself).
export function motionCss(s: MotionStyle): React.CSSProperties {
  const parts: string[] = [];
  if (s.x || s.y) parts.push(`translate(${s.x ?? 0}px, ${s.y ?? 0}px)`);
  if (s.scale !== undefined && s.scale !== 1) parts.push(`scale(${s.scale})`);
  if (s.scaleX !== undefined && s.scaleX !== 1) parts.push(`scaleX(${s.scaleX})`);
  const css: React.CSSProperties = {};
  if (parts.length) css.transform = parts.join(" ");
  if (s.opacity !== undefined) css.opacity = s.opacity;
  return css;
}

// STYLE.md section 5: things on screen breathe. Small vertical float, px.
export const breathe = (frame: number, amp = 2.5, period = 150): number => Math.sin((frame / period) * Math.PI * 2) * amp;
