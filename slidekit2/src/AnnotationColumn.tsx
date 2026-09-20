// @slide-component: AnnotationColumn — the right-side numbered annotation column used by every L21-style
// slide (screen 8 cols left + annotations 4 cols right). Stacks 1-4 white cards evenly inside the given
// rect, each with a small numbered accent badge, a Pretendard 700 head line, and an optional Spoqa body
// line. Numbers should match the FocusBadge numbers drawn on the screen for the same step.
//
// Props:
//   x, y, width, height  the column rect in absolute frame px (layouts.json L21 note1..note3 stack is
//                         x=1267 y=132 w=533 h=724 across 3 slots; pass the outer rect and this component
//                         divides it evenly for items.length cards).
//   items                AnnotationItem[]: { number, head, body? }. body is optional (a bare label item).
//   gap                  px gap between cards, default 24.
export interface AnnotationItem {
  number: number | string;
  head: string;
  body?: string;
}

export interface AnnotationColumnProps {
  x: number;
  y: number;
  width: number;
  height: number;
  items: AnnotationItem[];
  gap?: number;
}

import React from "react";
import { COLORS, FONTS, RADIUS } from "./core/tokens";

export const AnnotationColumn: React.FC<AnnotationColumnProps> = ({ x, y, width, height, items, gap = 24 }) => {
  const n = Math.max(1, items.length);
  const cardH = (height - gap * (n - 1)) / n;
  return (
    <div style={{ position: "absolute", left: x, top: y, width, height }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: i * (cardH + gap),
            width,
            height: cardH,
            boxSizing: "border-box",
            background: COLORS.paper2,
            border: `1px solid ${COLORS.line}`,
            borderRadius: RADIUS.base,
            padding: "28px 30px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                flex: "0 0 auto",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: COLORS.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: 20,
                color: "#ffffff",
              }}
            >
              {it.number}
            </div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontWeight: 700,
                fontSize: 34,
                lineHeight: 1.2,
                color: COLORS.ink,
                wordBreak: "keep-all",
              }}
            >
              {it.head}
            </div>
          </div>
          {it.body ? (
            <div style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 26, lineHeight: 1.42, color: COLORS.ink2, wordBreak: "keep-all" }}>{it.body}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
