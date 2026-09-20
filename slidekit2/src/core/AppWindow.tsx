// @asset: 맥/윈도우 공용 앱 창 틀 — 둥근 테두리, 제목줄(맥 점 3개 / 윈도우 최소화·최대화·닫기), 밝은/어두운 테마
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { cueFrame, useBeatContext } from "./beats";
import { breathe, enterStyle, motionCss } from "./motion";
import { NATIVE } from "./native";
import { COLORS, FONTS, RADIUS, WINDOW_THEME } from "./tokens";
import type { AssetBaseProps } from "./types";

export type WindowOs = "mac" | "windows";
export type WindowTheme = "light" | "dark";

export interface AppWindowProps extends AssetBaseProps {
  os?: WindowOs;
  theme?: WindowTheme;
  title?: string;
  // mac: three dots on the left. Default true.
  trafficLights?: boolean;
  // windows: minimise / maximise / close glyphs on the right. Default true.
  controls?: boolean;
  // Title bar height in px. Default scales with the slot (30..52).
  headerHeight?: number;
  // Body ground colour override (e.g. a terminal ground).
  bodyColor?: string;
  // Extra element at the right end of the title bar (mac) / after the title (windows).
  headerExtra?: React.ReactNode;
  // Realistic chrome for camera shots: 34px title bar, 13px title, 1px border, 10px corners (_core/native.ts).
  native?: boolean;
  children?: React.ReactNode;
}

export const windowHeaderHeight = (width: number, height: number): number =>
  Math.max(30, Math.min(52, Math.round(Math.min(width, height) * 0.07)));

const MacDots: React.FC<{ size: number; color: string; ring: string }> = ({ size, color, ring }) => (
  <div style={{ display: "flex", gap: size * 0.7, alignItems: "center" }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: ring === "transparent" ? undefined : `inset 0 0 0 1.5px ${ring}`,
        }}
      />
    ))}
  </div>
);

const WinControls: React.FC<{ size: number; color: string; gap?: number }> = ({ size, color, gap }) => {
  const s = size;
  const stroke = Math.max(1.2, s / 9);
  return (
    <div style={{ display: "flex", gap: gap ?? s * 1.1, alignItems: "center" }}>
      <svg width={s} height={s} viewBox="0 0 12 12">
        <line x1="1" y1="6" x2="11" y2="6" stroke={color} strokeWidth={(stroke * 12) / s} strokeLinecap="round" />
      </svg>
      <svg width={s} height={s} viewBox="0 0 12 12">
        <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" fill="none" stroke={color} strokeWidth={(stroke * 12) / s} />
      </svg>
      <svg width={s} height={s} viewBox="0 0 12 12">
        <path d="M2 2 L10 10 M10 2 L2 10" stroke={color} strokeWidth={(stroke * 12) / s} strokeLinecap="round" />
      </svg>
    </div>
  );
};

export const AppWindow: React.FC<AppWindowProps> = ({
  width,
  height,
  os = "mac",
  theme = "light",
  title,
  trafficLights = true,
  controls = true,
  headerHeight,
  bodyColor,
  headerExtra,
  delay = 0,
  enter = "pop",
  enterAt,
  float = true,
  focused = false,
  dimmed = false,
  native = false,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ctx = useBeatContext();
  const pal = WINDOW_THEME[theme];
  const headH = headerHeight ?? (native ? NATIVE.windowHeader : windowHeaderHeight(width, height));
  const border = native ? NATIVE.windowBorder : Math.max(2, Math.round(Math.min(width, height) / 220));
  const start = (cueFrame(enterAt, ctx) ?? 0) + delay;
  const motion = motionCss(enterStyle(enter, frame, fps, { delay: start }));
  const floatY = float ? breathe(frame - start, native ? 1.5 : 2.5) : 0;
  const glyph = native ? (os === "mac" ? 12 : 10) : Math.round(headH * 0.3);
  const titleSize = native ? NATIVE.windowTitle : Math.round(headH * 0.4);
  const radius = native ? NATIVE.windowRadius : RADIUS.outer;
  const shadow = native
    ? focused
      ? `0 0 0 3px ${COLORS.accentWash}, 0 10px 28px rgba(16,17,19,0.12), 0 1px 3px rgba(16,17,19,0.08)`
      : "0 10px 28px rgba(16, 17, 19, 0.10), 0 1px 3px rgba(16, 17, 19, 0.06)"
    : focused
      ? `0 0 0 ${border + 2}px ${COLORS.accentWash}, 0 14px 28px rgba(16,17,19,0.10)`
      : "0 14px 28px rgba(16, 17, 19, 0.08)";

  const titleEl = title ? (
    <div
      style={{
        fontFamily: FONTS.display,
        fontSize: titleSize,
        fontWeight: native ? 500 : 600,
        color: pal.title,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "70%",
      }}
    >
      {title}
    </div>
  ) : null;

  return (
    <div
      style={{
        width,
        height,
        opacity: (motion.opacity as number | undefined) ?? 1,
        transform: motion.transform,
        filter: dimmed ? "saturate(0.6)" : undefined,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          borderRadius: radius,
          border: `${border}px solid ${focused ? COLORS.accent : pal.border}`,
          backgroundColor: bodyColor ?? pal.body,
          boxShadow: shadow,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          translate: `0px ${floatY}px`,
          // Inactive floor 0.72 (project rule: inactive elements stay >= 0.7; was 0.35).
          opacity: dimmed ? 0.72 : 1,
        }}
      >
        <div
          style={{
            height: headH,
            flex: `0 0 ${headH}px`,
            backgroundColor: pal.header,
            borderBottom: `${border}px solid ${pal.headerRule}`,
            display: "flex",
            alignItems: "center",
            padding: `0 ${native ? 12 : Math.round(headH * 0.36)}px`,
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          {os === "mac" ? (
            <>
              {trafficLights ? <MacDots size={glyph} color={native && theme === "light" ? "#cfccc5" : pal.dot} ring={pal.dotRing} /> : null}
              {/* mac: title centred on the whole bar */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                {titleEl}
              </div>
              <div style={{ marginLeft: "auto" }}>{headerExtra}</div>
            </>
          ) : (
            <>
              {titleEl}
              {headerExtra ? <div style={{ marginLeft: glyph }}>{headerExtra}</div> : null}
              <div style={{ marginLeft: "auto", marginRight: native ? 6 : 0 }}>{controls ? <WinControls size={glyph} color={pal.glyph} gap={native ? 26 : undefined} /> : null}</div>
            </>
          )}
        </div>
        <div style={{ flex: "1 1 0", minHeight: 0, position: "relative", overflow: "hidden" }}>{children}</div>
      </div>
    </div>
  );
};
