// Shared vector glyphs for assets (STYLE.md section 3: minimal line icons, round caps). Icons draw in
// currentColor unless a color is given, on a 24-unit grid, so they scale with the font size of the asset.

import React from "react";
import { COLORS } from "./tokens";

export type GlyphName =
  | "check"
  | "check-circle"
  | "x"
  | "dot"
  | "question"
  | "lock"
  | "pin"
  | "return"
  | "shift"
  | "tab"
  | "up"
  | "down"
  | "left"
  | "right"
  | "plus"
  | "equal"
  | "arrow-right"
  | "refresh"
  | "box"
  | "spark"
  | "scan"
  | "chevron-right";

export const Glyph: React.FC<{ name: GlyphName; size: number; color?: string; strokeWidth?: number; style?: React.CSSProperties }> = ({
  name,
  size,
  color = "currentColor",
  strokeWidth = 2.6,
  style,
}) => {
  const common = { fill: "none", stroke: color, strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  let body: React.ReactNode;
  switch (name) {
    case "check":
      body = <path d="M4.5 12.5 L9.5 17.5 L19.5 6.5" {...common} />;
      break;
    case "check-circle":
      body = (
        <>
          <circle cx="12" cy="12" r="11" fill={color} />
          <path d="M6.8 12.4 L10.4 16 L17.2 8.6" fill="none" stroke="#ffffff" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
      break;
    case "x":
      body = <path d="M6 6 L18 18 M18 6 L6 18" {...common} />;
      break;
    case "dot":
      body = <circle cx="12" cy="12" r="5.5" fill={color} />;
      break;
    case "question":
      body = (
        <>
          <path d="M8.6 8.8 C8.6 6.6 10.2 5 12.3 5 C14.4 5 16 6.5 16 8.5 C16 11.2 12.4 11.4 12.4 14.4" {...common} />
          <circle cx="12.4" cy="19" r="1.6" fill={color} />
        </>
      );
      break;
    case "lock":
      body = (
        <>
          <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.6" {...common} />
          <path d="M8 10.5 V7.6 C8 5.3 9.8 3.5 12 3.5 C14.2 3.5 16 5.3 16 7.6 V10.5" {...common} />
        </>
      );
      break;
    case "pin":
      body = (
        <>
          <path d="M9 3.5 H15 L14 9.5 L17.5 13 H6.5 L10 9.5 Z" {...common} />
          <path d="M12 13 V20.5" {...common} />
        </>
      );
      break;
    case "return":
      body = (
        <>
          <polyline points="9 10 4 15 9 20" {...common} />
          <path d="M20 4 V11 A4 4 0 0 1 16 15 H4" {...common} />
        </>
      );
      break;
    case "shift":
      body = <path d="M12 3.5 L20.5 12 H16 V20 H8 V12 H3.5 Z" {...common} />;
      break;
    case "tab":
      body = (
        <>
          <path d="M3.5 12 H18" {...common} />
          <path d="M13 7 L18 12 L13 17" {...common} />
          <path d="M20.5 5.5 V18.5" {...common} />
        </>
      );
      break;
    case "up":
      body = <polyline points="6 15 12 9 18 15" {...common} />;
      break;
    case "down":
      body = <polyline points="6 9 12 15 18 9" {...common} />;
      break;
    case "left":
      body = <polyline points="15 6 9 12 15 18" {...common} />;
      break;
    case "right":
    case "chevron-right":
      body = <polyline points="9 6 15 12 9 18" {...common} />;
      break;
    case "plus":
      body = <path d="M12 5 V19 M5 12 H19" {...common} />;
      break;
    case "equal":
      body = <path d="M5 9 H19 M5 15 H19" {...common} />;
      break;
    case "arrow-right":
      body = <path d="M4 12 H19 M13.5 6.5 L19 12 L13.5 17.5" {...common} />;
      break;
    case "refresh":
      body = (
        <>
          <polyline points="20.5 4 20.5 9.5 15 9.5" {...common} />
          <path d="M19.4 14.5 A8 8 0 1 1 17.8 6.4 L20.5 9.5" {...common} />
        </>
      );
      break;
    case "box":
      body = (
        <>
          <path d="M3.5 7.5 L12 3.5 L20.5 7.5 V16.5 L12 20.5 L3.5 16.5 Z" {...common} />
          <path d="M3.5 7.5 L12 11.5 L20.5 7.5 M12 11.5 V20.5" {...common} />
        </>
      );
      break;
    case "spark":
      body = <path d="M12 3 L14.2 9.8 L21 12 L14.2 14.2 L12 21 L9.8 14.2 L3 12 L9.8 9.8 Z" fill={color} stroke="none" />;
      break;
    case "scan":
      body = (
        <>
          <path d="M4 8 V5.5 A1.5 1.5 0 0 1 5.5 4 H8 M16 4 H18.5 A1.5 1.5 0 0 1 20 5.5 V8 M20 16 V18.5 A1.5 1.5 0 0 1 18.5 20 H16 M8 20 H5.5 A1.5 1.5 0 0 1 4 18.5 V16" {...common} />
          <path d="M4 12 H20" {...common} />
        </>
      );
      break;
    default:
      body = null;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block", flex: "0 0 auto", overflow: "visible", ...style }}>
      {body}
    </svg>
  );
};

// ------------------------------------------------------------------ file / folder icons (DesktopIconItem look)

export type FileKind = "folder" | "file" | "md" | "json" | "zip" | "photo" | "doc" | "video" | "ps1";

// Kind mark drawn inside the page (no tiny extension text: in-picture text stays >= 18px).
const KindMark: React.FC<{ kind: FileKind; stroke: string }> = ({ kind, stroke }) => {
  const c = { fill: "none", stroke, strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "md":
      return (
        <g transform="translate(8.5 22)">
          <path d="M0 12 V0 L5 6 L10 0 V12" {...c} stroke={COLORS.accent} strokeWidth={2.8} />
          <path d="M16 0 V11 M12.5 7.5 L16 11.5 L19.5 7.5" {...c} stroke={COLORS.accent} strokeWidth={2.8} />
        </g>
      );
    case "json":
      return (
        <g transform="translate(9 20)">
          <path d="M5 0 C2 0 2.5 3 2.5 5.5 C2.5 7.5 1.5 8 0 8 C1.5 8 2.5 8.5 2.5 10.5 C2.5 13 2 16 5 16" {...c} stroke={COLORS.accent} />
          <path d="M15 0 C18 0 17.5 3 17.5 5.5 C17.5 7.5 18.5 8 20 8 C18.5 8 17.5 8.5 17.5 10.5 C17.5 13 18 16 15 16" {...c} stroke={COLORS.accent} />
        </g>
      );
    case "ps1":
      return (
        <g transform="translate(9 21)">
          <path d="M0 0 L7 6 L0 12" {...c} stroke={COLORS.accent} strokeWidth={2.8} />
          <path d="M10 13 H19" {...c} />
        </g>
      );
    case "zip":
      return (
        <g>
          {[16, 22, 28, 34].map((y, i) => (
            <rect key={y} x={i % 2 ? 19 : 15} y={y} width="4" height="4" rx="1" fill={stroke} />
          ))}
          <rect x="14.5" y="38" width="9" height="5" rx="1.5" {...c} />
        </g>
      );
    case "photo":
      return (
        <g>
          <circle cx="14" cy="23" r="3" fill={COLORS.accent} />
          <path d="M8 38 L15 30 L20 34 L25 28 L31 38 Z" fill="none" stroke={stroke} strokeWidth={2.4} strokeLinejoin="round" />
        </g>
      );
    case "video":
      return <path d="M14 22 L26 29.5 L14 37 Z" fill={COLORS.accent} stroke="none" />;
    case "doc":
    case "file":
    default:
      return (
        <g>
          <path d="M10 24 H28 M10 30 H28 M10 36 H21" {...c} />
        </g>
      );
  }
};

export const FileIcon: React.FC<{ kind: FileKind; size: number; focused?: boolean; open?: boolean }> = ({ kind, size, focused = false, open = false }) => {
  const stroke = focused ? COLORS.accent : COLORS.ink2;
  if (kind === "folder") {
    return (
      <svg width={size} height={size} viewBox="0 0 46 46" style={{ display: "block", flex: "0 0 auto", overflow: "visible" }}>
        <path
          d="M3 9 C3 7.9 3.9 7 5 7 H16 C17.5 7 18.5 8.5 19.5 10 L21.5 13 H41 C42.1 13 43 13.9 43 15 V39 C43 40.1 42.1 41 41 41 H5 C3.9 41 3 40.1 3 39 Z"
          fill="#f5be38"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {open ? <rect x="12" y="10" width="20" height="14" rx="2" fill="#ffffff" stroke={COLORS.ink2} strokeWidth="1.8" /> : null}
        <path d="M1 19 H45 L41 40 C40.8 40.6 40.2 41 39.5 41 H6.5 C5.8 41 5.2 40.6 5 40 Z" fill="#e5b232" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 46 46" style={{ display: "block", flex: "0 0 auto", overflow: "visible" }}>
      <g transform="translate(4 0)">
        <path d="M4 2 H24 L36 14 V42 C36 43.1 35.1 44 34 44 H4 C2.9 44 2 43.1 2 42 V4 C2 2.9 2.9 2 4 2 Z" fill="#ffffff" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M24 2 V14 H36" fill={COLORS.accentWash} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
        <KindMark kind={kind} stroke={focused ? COLORS.accent : COLORS.line} />
      </g>
    </svg>
  );
};
