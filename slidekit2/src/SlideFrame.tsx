// @slide-component: SlideFrame — the fixed frame every step02-claudemd slide is built on. Renders the
// 1920x1080 paper background, the eyebrow ("CLAUDE.MD · NN/07"), the Pretendard title, an optional Spoqa
// subtitle, and a relatively-positioned body slot (x120..1800, y250..1000) that the slide's own content is
// laid into (position: absolute children, see grid.ts colX/colW helpers).
//
// Props:
//   index     (required) 1-based slide number (1..total) — drives the eyebrow "NN/total".
//   total     total slide count for this part (required — no hardcoded default; each part spec knows
//             its own entries.length, e.g. STEP02_CLAUDEMD.length).
//   eyebrow   (required) label before " · NN/total", e.g. "CLAUDE.MD", "READ 툴" — one per lesson part
//             (see ./specs/registry.ts), no hardcoded "CLAUDE.MD" default.
//   title     slide title, Pretendard 700 ~72px, ink. Keyword noun phrase (no questions/fragments).
//   subtitle  optional one-line Spoqa Han Sans Neo ~30px, ink-2 — the slide goal in plain words.
//   children  body content, absolutely positioned within the 1680x750 body slot (BODY_Y..BODY_BOTTOM).
//
// Colors/fonts come only from ../assets/_core/tokens (COLORS/FONTS), matching STYLE.md + tokens.css.
// This file does not import remotion animation/beat helpers: slides are static stills (enter="none" /
// float=false everywhere), so nothing here depends on `useCurrentFrame`.
import React from "react";
import { COLORS, FONTS } from "./core/tokens";
import { BODY_Y, CONTENT_W, CONTENT_X } from "./grid";

export interface SlideFrameProps {
  index: number;
  total: number;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const FRAME_W = 1920;
export const FRAME_H = 1080;

export const SlideFrame: React.FC<SlideFrameProps> = ({ index, total, eyebrow, title, subtitle, children }) => {
  const nn = String(index).padStart(2, "0");
  const tt = String(total).padStart(2, "0");
  return (
    <div
      style={{
        position: "relative",
        width: FRAME_W,
        height: FRAME_H,
        overflow: "hidden",
        boxSizing: "border-box",
        background: COLORS.paper,
        color: COLORS.ink,
        fontFamily: FONTS.body,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          position: "absolute",
          left: CONTENT_X,
          top: 64,
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          fontFamily: FONTS.term,
          fontSize: 24,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: COLORS.ink3,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: COLORS.accent,
            transform: "translateY(-2px)",
          }}
        />
        <span>{`${eyebrow} · ${nn}/${tt}`}</span>
      </div>

      {/* Title + optional subtitle */}
      <div style={{ position: "absolute", left: CONTENT_X, top: 128, width: CONTENT_W }}>
        <div
          style={{
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: 72,
            lineHeight: 1.12,
            color: COLORS.ink,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 14,
              fontFamily: FONTS.body,
              fontWeight: 500,
              fontSize: 30,
              lineHeight: 1.4,
              color: COLORS.ink2,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      {/* Body slot — covers the whole frame; children position themselves with the absolute frame
          coordinates from ./grid.ts (colX/BODY_Y are already frame-absolute, not slot-relative).
          Hard-clipped near BODY_Y so a spec bug (a screen/illustration box positioned too high) can never
          paint over the eyebrow+title again (2026-09-17 rework: slide 06 covered the title this way).
          The clip top is BODY_Y minus 32px, not exactly BODY_Y: a FocusBadge pinned at the top-right
          corner of a body-slot card (y = BODY_Y + 6, the common "corner badge" pattern) has its accent
          ring extend ~35px above its center, and an exact BODY_Y clip cut that ring's top half off
          (slides 02/11 review, 2026-09-17). 32px of extra headroom still stays clear of the title block,
          which ends well above BODY_Y-32 in every slide here (none use a subtitle). */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(${BODY_Y - 32}px 0 0 0)` }}>{children}</div>
    </div>
  );
};
