// Camera / viewport: children are drawn once at a fixed native design size (a real window at real OS
// proportions, 13-16px UI text), and the slot shows a focus rect of that drawing, scaled to cover the slot
// (aspect kept, overflow clipped by a rounded mask that matches .illo-frame). Keys move the focus rect on
// narration beats (Cue), eased in-out over `dur` frames (default 21), clamped on both ends.
//
// Readability rule for camera shots: on-screen text px = native px x cameraScale(slot, focus) x the slot's own
// fit scale (IlloSlot). tools/spec_lint.py mirrors cameraView() to check key text >= 18px per shot.

import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { resolveCue, useBeatContext, type Cue } from "./beats";
import { COLORS } from "./tokens";

export interface FocusRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface CameraKey {
  at: Cue;
  // Native px. Any aspect: the shot covers the slot, so the longer side of the rect relative to the slot is kept
  // and the other axis shows a little more (or less) around the rect centre.
  focus: FocusRect;
  // Transition frames into this key. Default 21.
  dur?: number;
  // cover (default) = the rect fills the slot, the longer relative side is cropped; contain = the whole rect is
  // visible (establishing shots). contain is applied by growing the rect to the slot aspect around its centre,
  // so transitions between cover and contain keys stay smooth.
  fit?: "cover" | "contain";
}

// Rect grown to the slot aspect around its centre: its cover scale equals the original rect's contain scale.
export function containRect(slot: { w: number; h: number }, f: FocusRect): FocusRect {
  const aspect = slot.w / slot.h;
  let w = f.w;
  let h = f.h;
  if (w / h > aspect) h = w / aspect;
  else w = h * aspect;
  return { x: f.x + f.w / 2 - w / 2, y: f.y + f.h / 2 - h / 2, w, h };
}

export interface CameraProps {
  width: number;
  height: number;
  native: { w: number; h: number };
  keys: CameraKey[];
  // Mask corner radius px (slot space). Default 22 = .illo-frame.
  radius?: number;
  // Soft inner edge fade in slot px (0 = none). Default 14.
  fade?: number;
  // Ground behind the native drawing (shows where the view leaves the native rect). Default paper.
  ground?: string;
  // Frames added to every key cue.
  delay?: number;
  children?: React.ReactNode;
}

export const CAMERA_DEFAULT_DUR = 21;
const EASE_IN_OUT = Easing.inOut(Easing.cubic);

// Cover scale of a focus rect in a slot.
export const cameraScale = (slot: { w: number; h: number }, focus: FocusRect): number => Math.max(slot.w / focus.w, slot.h / focus.h);

// Translate (slot px) + scale for a focus rect. The view is centred on the focus rect, then clamped so the
// native drawing keeps covering the slot when it is large enough to.
export function cameraView(slot: { w: number; h: number }, native: { w: number; h: number }, focus: FocusRect): { s: number; tx: number; ty: number } {
  const s = cameraScale(slot, focus);
  let tx = slot.w / 2 - (focus.x + focus.w / 2) * s;
  let ty = slot.h / 2 - (focus.y + focus.h / 2) * s;
  const clampAxis = (t: number, nat: number, view: number) => (nat * s >= view ? Math.min(0, Math.max(view - nat * s, t)) : (view - nat * s) / 2);
  tx = clampAxis(tx, native.w, slot.w);
  ty = clampAxis(ty, native.h, slot.h);
  return { s, tx, ty };
}

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// Focus rect at a frame: keys in cue order, each eases from wherever the previous ones left the view.
// Interpolating the rect (not the scale) keeps the zoom perceptually even; before the first key the first
// key's rect holds.
export function focusAt(keys: { f: number; focus: FocusRect; dur: number }[], frame: number): FocusRect {
  if (!keys.length) return { x: 0, y: 0, w: 1, h: 1 };
  let cur = { ...keys[0].focus };
  for (let i = 1; i < keys.length; i += 1) {
    const k = keys[i];
    if (frame <= k.f) break;
    const t = interpolate(frame, [k.f, k.f + Math.max(1, k.dur)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_IN_OUT });
    cur = { x: lerp(cur.x, k.focus.x, t), y: lerp(cur.y, k.focus.y, t), w: lerp(cur.w, k.focus.w, t), h: lerp(cur.h, k.focus.h, t) };
  }
  return cur;
}

export const Camera: React.FC<CameraProps> = ({ width, height, native, keys, radius = 22, fade = 14, ground = COLORS.paper, delay = 0, children }) => {
  const frame = useCurrentFrame();
  const ctx = useBeatContext();
  const resolved = React.useMemo(
    () =>
      keys
        .map((k, order) => ({
          f: resolveCue(k.at, ctx) + delay,
          focus: k.fit === "contain" ? containRect({ w: width, h: height }, k.focus) : k.focus,
          dur: k.dur ?? CAMERA_DEFAULT_DUR,
          order,
        }))
        .sort((a, b) => a.f - b.f || a.order - b.order),
    [keys, ctx, delay, width, height],
  );
  const slot = { w: width, h: height };
  const fallback = { x: 0, y: 0, w: native.w, h: native.h };
  const focus = resolved.length ? focusAt(resolved, frame) : fallback;
  const { s, tx, ty } = cameraView(slot, native, focus);
  return (
    <div style={{ position: "relative", width, height, overflow: "hidden", borderRadius: radius, background: ground, isolation: "isolate" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: native.w,
          height: native.h,
          transform: `translate(${tx}px, ${ty}px) scale(${s})`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
      {fade > 0 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: radius,
            boxShadow: `inset 0 0 ${fade}px ${Math.round(fade * 0.35)}px ${ground}`,
            pointerEvents: "none",
          }}
        />
      ) : null}
    </div>
  );
};
