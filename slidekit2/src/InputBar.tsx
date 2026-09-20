// @slide-component: InputBar — the "이렇게 입력해보세요" prompt bar for slides where the student types
// something (plan hard rule: a typed prompt = an input bar with this small label + the text in D2Coding).
//
// Props:
//   x, y     top-left of the bar, absolute frame px.
//   width    bar width px.
//   height   bar height px, default 74.
//   text     the text the student types (D2Coding).
//   label    small label above the bar, default "이렇게 입력해보세요".
//   focused  accent border + wash background (use when this bar is the slide's focus), default true.
export interface InputBarProps {
  x: number;
  y: number;
  width: number;
  height?: number;
  text: string;
  label?: string;
  focused?: boolean;
}

import React from "react";
import { COLORS, FONTS, RADIUS } from "./core/tokens";

export const InputBar: React.FC<InputBarProps> = ({ x, y, width, height = 74, text, label = "이렇게 입력해보세요", focused = true }) => (
  <div style={{ position: "absolute", left: x, top: y, width }}>
    <div
      style={{
        fontFamily: FONTS.display,
        fontWeight: 600,
        fontSize: 22,
        color: COLORS.accentDeep,
        marginBottom: 10,
      }}
    >
      {label}
    </div>
    <div
      style={{
        width,
        height,
        boxSizing: "border-box",
        borderRadius: RADIUS.inner + 4,
        background: focused ? COLORS.accentWash : COLORS.paper2,
        border: `2px solid ${focused ? COLORS.accent : COLORS.line}`,
        display: "flex",
        alignItems: "center",
        padding: "16px 26px",
      }}
    >
      <span
        style={{
          fontFamily: FONTS.term,
          fontWeight: 500,
          fontSize: 28,
          lineHeight: 1.35,
          color: COLORS.ink,
          whiteSpace: "pre-wrap",
          wordBreak: "keep-all",
        }}
      >
        {text}
      </span>
    </div>
  </div>
);
