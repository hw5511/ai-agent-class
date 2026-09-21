// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 420, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  keyLabel?: string;
  actionLabel?: string;
  subLabel?: string;
}

export const EscDoublePress: React.FC<Props> = ({
  delay = 0,
  budget = 810,
  keyLabel = "",
  actionLabel = "",
  subLabel = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  const floatY = Math.sin(frame * 0.08) * 3;

  const press1 = interpolate(
    frame,
    [18, 26, 36],
    [0, 8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const press2 = interpolate(
    frame,
    [50, 58, 68],
    [0, 8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const pressY = press1 + press2;

  const scale = interpolate(
    frame,
    [0, 18, 30, 50, 65, 90, 120],
    [1, 1, 1.06, 1.04, 1.12, 1.04, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const ripple1Scale = interpolate(
    frame,
    [24, 48],
    [0.9, 1.45],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ripple1Opacity = interpolate(
    frame,
    [24, 28, 48],
    [0, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const ripple2Scale = interpolate(
    frame,
    [56, 80],
    [0.9, 1.55],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ripple2Opacity = interpolate(
    frame,
    [56, 60, 80],
    [0, 0.75, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const dot1Active = interpolate(
    frame,
    [22, 28],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const dot2Active = interpolate(
    frame,
    [54, 60],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const keyBorder = interpolate(
    pressY,
    [0, 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0efec",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 72,
          width: 140,
          height: 120,
          borderRadius: 20,
          border: "3px solid #1273c4",
          opacity: ripple1Opacity,
          transform: `scale(${ripple1Scale})`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 72,
          width: 140,
          height: 120,
          borderRadius: 20,
          border: "3px solid #1273c4",
          opacity: ripple2Opacity,
          transform: `scale(${ripple2Scale})`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          transform: `translateY(${floatY}px) scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 140,
            height: 120,
            backgroundColor: "#d5d2cc",
            borderRadius: 18,
            boxShadow: "0 8px 16px rgba(16, 17, 19, 0.08)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 112,
              backgroundColor: "#ffffff",
              borderRadius: 16,
              borderWidth: 3,
              borderStyle: "solid",
              borderColor: keyBorder === 1 ? "#1273c4" : "#d5d2cc",
              boxShadow: "0 6px 0 #c4c1ba",
              transform: `translateY(${pressY}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
            }}
          >
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 32,
                fontWeight: 700,
                color: "#101113",
                letterSpacing: "-0.02em",
              }}
            >{keyLabel}</span>

            <div
              style={{
                display: "flex",
                gap: 6,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: dot1Active === 1 ? "#1273c4" : "#d5d2cc",
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: dot2Active === 1 ? "#1273c4" : "#d5d2cc",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              display: Boolean(actionLabel) ? "inline-flex" : "none",
              alignItems: "center",
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 6,
              paddingBottom: 6,
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
              borderRadius: 8,
            }}
          >
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#1273c4",
              }}
            >{actionLabel}</span>
          </div>

          <span
            style={{
              display: Boolean(subLabel) ? "inline" : "none",
              fontFamily: "'Spoqa Han Sans Neo', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#43474b",
            }}
          >{subLabel}</span>
        </div>
      </div>
    </div>
  );
};
