// @slide-component: FocusBadge — the one blue numbered circle every slide must have, pinned on the exact
// UI spot it calls out (plan hard rule: "exactly one focus = a blue numbered circle badge on the exact UI
// spot"; multi-step slides may repeat 1/2/3 matching the annotation numbers).
//
// Props:
//   number  badge label (1, 2, 3, ... or a short string like "!").
//   x, y    CENTER point of the circle, in absolute frame px (1920x1080). Place it directly on the UI
//           element it points at (e.g. the New Folder icon, an editor tab dot, an answer line).
//   size    circle diameter px, default 48 (>= 18px text easily).
//   ring    show the soft outer accent ring (static, no animation), default true.
export interface FocusBadgeProps {
  number: number | string;
  x: number;
  y: number;
  size?: number;
  ring?: boolean;
}

import React from "react";
import { COLORS, FONTS } from "./core/tokens";

export const FocusBadge: React.FC<FocusBadgeProps> = ({ number, x, y, size = 48, ring = true }) => {
  const fs = Math.round(size * 0.46);
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
      }}
    >
      {ring ? (
        <div
          style={{
            position: "absolute",
            inset: -size * 0.22,
            borderRadius: "50%",
            border: `${Math.max(2, Math.round(size * 0.05))}px solid ${COLORS.accent}`,
            opacity: 0.35,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: COLORS.accent,
          boxShadow: "0 6px 16px rgba(18, 115, 196, 0.35)",
          border: `${Math.max(2, Math.round(size * 0.06))}px solid #ffffff`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: fs, color: "#ffffff", lineHeight: 1 }}>{number}</span>
      </div>
    </div>
  );
};
