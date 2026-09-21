// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 540, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  ctrlLabel?: string;
  keyCLabel?: string;
  keyBLabel?: string;
  stopActionLabel?: string;
  keepRunningLabel?: string;
}

export const ShortcutActionCompare: React.FC<Props> = ({
  delay = 0,
  budget,
  ctrlLabel = "",
  keyCLabel = "",
  keyBLabel = "",
  stopActionLabel = "",
  keepRunningLabel = "",
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - delay);

  // 1. Scene entrance (0 ~ 30f)
  const enterProgress = interpolate(relFrame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 2. Idle living motion
  const floatLeft = Math.sin(relFrame * 0.08) * 2;
  const floatRight = Math.cos(relFrame * 0.08) * 2;
  const continuousSpin = (relFrame * 4) % 360;

  // 3. Stage 1: Ctrl+C focus & stop (frames 30 ~ 120)
  const focusLeft = interpolate(
    relFrame,
    [30, 50, 100, 120],
    [1, 1.05, 1.05, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const pressC = interpolate(relFrame, [40, 55, 75, 90], [0, 3, 3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stopIconTrigger = interpolate(relFrame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. Stage 2: Ctrl+B focus & background keep-running (frames 120 ~ 220)
  const focusRight = interpolate(
    relFrame,
    [120, 140, 200, 220],
    [1, 1.07, 1.07, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const pressB = interpolate(relFrame, [130, 145, 165, 180], [0, 3, 3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightDimOpacity = interpolate(
    relFrame,
    [30, 50, 100, 120],
    [1, 0.78, 0.78, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const leftDimOpacity = interpolate(
    relFrame,
    [120, 140, 200, 220],
    [1, 0.76, 0.76, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "relative",
        width: canvas.w,
        height: canvas.h,
        overflow: "hidden",
        backgroundColor: "#f0efec",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        boxSizing: "border-box",
        padding: "20px 24px",
        display: "flex",
        gap: 16,
        justifyContent: "space-between",
        alignItems: "center",
        opacity: enterProgress,
      }}
    >
      {/* Left Column: Ctrl + C (Complete Stop) */}
      <div
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "#ffffff",
          borderRadius: 16,
          border: "3px solid #d5d2cc",
          boxSizing: "border-box",
          padding: "16px 14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transform: "scale(" + focusLeft + ") translateY(" + floatLeft + "px)",
          opacity: leftDimOpacity,
          boxShadow: "0 4px 12px rgba(16, 17, 19, 0.05)",
          transformOrigin: "center center",
        }}
      >
        {/* Shortcut Keys Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              padding: "4px 8px",
              minWidth: 44,
              backgroundColor: "#ffffff",
              border: "3px solid #d5d2cc",
              borderRadius: 8,
              boxShadow: "0 3px 0 #d5d2cc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {ctrlLabel ? (
              <span
                style={{
                  fontFamily: "JetBrains Mono, Pretendard, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#101113",
                }}
              >
                {ctrlLabel}
              </span>
            ) : null}
          </div>

          <div
            style={{
              width: 34,
              height: 32,
              backgroundColor: "#ffffff",
              border: "3px solid #d5d2cc",
              borderRadius: 8,
              boxShadow:
                pressC === 0 ? "0 3px 0 #d5d2cc" : "0 1px 0 #43474b",
              transform: "translateY(" + pressC + "px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {keyCLabel ? (
              <span
                style={{
                  fontFamily: "JetBrains Mono, Pretendard, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#101113",
                }}
              >
                {keyCLabel}
              </span>
            ) : null}
          </div>
        </div>

        {/* Downward indicator arrow */}
        <svg width="18" height="24" viewBox="0 0 18 24">
          <path
            d="M 9 2 L 9 18 M 4 13 L 9 18 L 14 13"
            fill="none"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Action result: Halt Box */}
        <div
          style={{
            width: "100%",
            borderRadius: 12,
            border: "3px solid #d5d2cc",
            backgroundColor: "#f0efec",
            padding: "12px 8px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Vector Stop Icon */}
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              backgroundColor: "#43474b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "scale(" + (1 + stopIconTrigger * 0.1) + ")",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: "#ffffff",
                borderRadius: 2,
              }}
            />
          </div>

          {stopActionLabel ? (
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#43474b",
                textAlign: "center",
              }}
            >
              {stopActionLabel}
            </span>
          ) : null}
        </div>
      </div>

      {/* Right Column: Ctrl + B (Keep Running in Background) */}
      <div
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "#ffffff",
          borderRadius: 16,
          border: "3px solid #1273c4",
          boxSizing: "border-box",
          padding: "16px 14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transform: "scale(" + focusRight + ") translateY(" + floatRight + "px)",
          opacity: rightDimOpacity,
          boxShadow: "0 6px 18px rgba(18, 115, 196, 0.12)",
          transformOrigin: "center center",
        }}
      >
        {/* Shortcut Keys Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              padding: "4px 8px",
              minWidth: 44,
              backgroundColor: "#e8f2fb",
              border: "3px solid #1273c4",
              borderRadius: 8,
              boxShadow: "0 3px 0 #1273c4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {ctrlLabel ? (
              <span
                style={{
                  fontFamily: "JetBrains Mono, Pretendard, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1273c4",
                }}
              >
                {ctrlLabel}
              </span>
            ) : null}
          </div>

          <div
            style={{
              width: 34,
              height: 32,
              backgroundColor: "#e8f2fb",
              border: "3px solid #1273c4",
              borderRadius: 8,
              boxShadow:
                pressB === 0 ? "0 3px 0 #1273c4" : "0 1px 0 #1273c4",
              transform: "translateY(" + pressB + "px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {keyBLabel ? (
              <span
                style={{
                  fontFamily: "JetBrains Mono, Pretendard, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1273c4",
                }}
              >
                {keyBLabel}
              </span>
            ) : null}
          </div>
        </div>

        {/* Downward indicator arrow */}
        <svg width="18" height="24" viewBox="0 0 18 24">
          <path
            d="M 9 2 L 9 18 M 4 13 L 9 18 L 14 13"
            fill="none"
            stroke="#1273c4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Action result: Continuous Orbit Box */}
        <div
          style={{
            width: "100%",
            borderRadius: 12,
            border: "3px solid #1273c4",
            backgroundColor: "#e8f2fb",
            padding: "12px 8px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Continuous Loop Arrow SVG */}
          <div
            style={{
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(" + continuousSpin + "deg)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M 12 3 A 9 9 0 0 1 21 12 A 9 9 0 0 1 12 21"
                fill="none"
                stroke="#1273c4"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 21 8 L 21 12 L 17 12"
                fill="none"
                stroke="#1273c4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {keepRunningLabel ? (
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#1273c4",
                textAlign: "center",
              }}
            >
              {keepRunningLabel}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
