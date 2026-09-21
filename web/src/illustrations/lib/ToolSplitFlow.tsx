// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 640, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  splitLabel?: string;
  desktopLabel?: string;
  terminalLabel?: string;
}

export const ToolSplitFlow: React.FC<Props> = ({
  delay = 0,
  budget = 720,
  splitLabel = "",
  desktopLabel = "",
  terminalLabel = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  const hubScale = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const hubOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pathProgress = interpolate(frame, [20, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const desktopNodeEnter = interpolate(frame, [35, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  const terminalNodeEnter = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  const desktopFocus = interpolate(
    frame,
    [110, 130, 280, 300],
    [1, 1.12, 1.12, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const desktopOpacity = interpolate(
    frame,
    [310, 330, 500, 520],
    [1, 0.78, 0.78, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const terminalFocus = interpolate(
    frame,
    [320, 340, 500, 520],
    [1, 1.12, 1.12, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const terminalOpacity = interpolate(
    frame,
    [110, 130, 280, 300],
    [1, 0.78, 0.78, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const floatHub = Math.sin(frame * 0.04) * 3;
  const floatDesktop = Math.sin(frame * 0.04 + 1.2) * 4;
  const floatTerminal = Math.cos(frame * 0.04 + 2.0) * 4;

  const pulseLoop = (frame % 80) / 80;

  return (
    <div
      style={{
        position: "relative",
        width: canvas.w,
        height: canvas.h,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        viewBox="0 0 640 360"
        fill="none"
      >
        <path
          d="M 170 180 C 260 180, 280 100, 370 100"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset={300 * (1 - pathProgress)}
        />
        <path
          d="M 170 180 C 260 180, 280 260, 370 260"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset={300 * (1 - pathProgress)}
        />

        {pathProgress > 0.8 ? (
          <circle
            cx={interpolate(pulseLoop, [0, 1], [170, 370])}
            cy={interpolate(
              pulseLoop,
              [0, 0.4, 0.6, 1],
              [180, 175, 105, 100],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
            r="4.5"
            fill="#1273c4"
          />
        ) : null}

        {pathProgress > 0.8 ? (
          <circle
            cx={interpolate(pulseLoop, [0, 1], [170, 370])}
            cy={interpolate(
              pulseLoop,
              [0, 0.4, 0.6, 1],
              [180, 185, 255, 260],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
            r="4.5"
            fill="#1273c4"
          />
        ) : null}
      </svg>

      <div
        style={{
          position: "absolute",
          left: 50,
          top: 130,
          transform: `translateY(${floatHub}px) scale(${hubScale})`,
          opacity: hubOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            backgroundColor: "#ffffff",
            border: "3px solid #1273c4",
            boxShadow: "0 4px 12px rgba(18, 115, 196, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="10" cy="18" r="4" fill="#1273c4" />
            <path
              d="M 14 18 H 20 C 23 18 24 11 27 11 H 29"
              stroke="#1273c4"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 14 18 H 20 C 23 18 24 25 27 25 H 29"
              stroke="#1273c4"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="28" cy="11" r="3" fill="#1273c4" />
            <circle cx="28" cy="25" r="3" fill="#1273c4" />
          </svg>
        </div>

        {splitLabel ? (
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 14,
              backgroundColor: "#e8f2fb",
              border: "1.5px solid #1273c4",
              color: "#1273c4",
              fontFamily: "Pretendard, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            <span>{splitLabel}</span>
          </div>
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          left: 370,
          top: 55,
          transform: `translateY(${floatDesktop}px) scale(${desktopNodeEnter * desktopFocus})`,
          opacity: desktopNodeEnter * desktopOpacity,
          width: 210,
          padding: "16px 20px",
          borderRadius: 18,
          backgroundColor: "#ffffff",
          border: `3px solid ${desktopFocus > 1.05 ? "#1273c4" : "#d5d2cc"}`,
          boxShadow:
            desktopFocus > 1.05
              ? "0 8px 20px rgba(18, 115, 196, 0.15)"
              : "0 4px 10px rgba(0,0,0,0.03)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: "#e8f2fb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect
              x="2"
              y="2"
              width="22"
              height="22"
              rx="6"
              stroke="#1273c4"
              strokeWidth="2.5"
            />
            <path
              d="M 13 7 L 14.8 11.2 L 19 13 L 14.8 14.8 L 13 19 L 11.2 14.8 L 7 13 L 11.2 11.2 Z"
              fill="#1273c4"
            />
          </svg>
        </div>

        {desktopLabel ? (
          <span
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: 17,
              fontWeight: 700,
              color: "#101113",
              whiteSpace: "nowrap",
            }}
          >
            {desktopLabel}
          </span>
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          left: 370,
          top: 215,
          transform: `translateY(${floatTerminal}px) scale(${terminalNodeEnter * terminalFocus})`,
          opacity: terminalNodeEnter * terminalOpacity,
          width: 210,
          padding: "16px 20px",
          borderRadius: 18,
          backgroundColor: "#0c0d0e",
          border: `3px solid ${terminalFocus > 1.05 ? "#1273c4" : "#43474b"}`,
          boxShadow:
            terminalFocus > 1.05
              ? "0 8px 20px rgba(18, 115, 196, 0.2)"
              : "0 4px 10px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: "#191c20",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polyline
              points="5,6 11,12 5,18"
              stroke="#1273c4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="13"
              y1="18"
              x2="19"
              y2="18"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={Math.floor(frame / 15) % 2 === 0 ? 1 : 0.2}
            />
          </svg>
        </div>

        {terminalLabel ? (
          <span
            style={{
              fontFamily: "D2Coding, monospace",
              fontSize: 17,
              fontWeight: 700,
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            {terminalLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};
