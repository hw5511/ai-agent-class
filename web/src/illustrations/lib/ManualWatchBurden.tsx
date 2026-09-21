// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 460, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  taskQuery?: string;
  actionLabel?: string;
}

export const ManualWatchBurden: React.FC<Props> = ({
  delay = 0,
  budget,
  taskQuery = "",
  actionLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // continuous organic floating motion
  const floatY = Math.sin(f / 24) * 3.5;

  // entrance transition
  const enter = interpolate(f, [0, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // periodic looking cycle: eye shifts, focuses, returns
  const cycle = f % 120;
  const pupilX = interpolate(cycle, [0, 20, 50, 75, 95, 120], [0, -7, -7, 0, 5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pupilY = interpolate(cycle, [0, 20, 50, 75, 95, 120], [0, 2, 2, 0, -2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // eye focus scale-up animation during staring
  const eyeFocus = interpolate(cycle, [15, 25, 50, 60], [1, 1.15, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // task node soft dimming while eye is focused (stays above 0.72)
  const taskOpacity = interpolate(cycle, [15, 25, 50, 60], [1, 0.78, 0.78, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // gaze beam pulsating opacity
  const beamOpacity = interpolate(cycle, [0, 20, 50, 65, 120], [0.15, 0.85, 0.85, 0.2, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ongoing process rotation
  const spin = (f * 3) % 360;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        backgroundColor: "#ffffff",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        boxSizing: "border-box",
        overflow: "hidden",
        opacity: enter,
        transform: `translateY(${floatY}px) scale(${0.96 + enter * 0.04})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Pretendard', sans-serif",
      }}
    >
      {/* connecting gaze beam line */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: canvas.w,
          height: canvas.h,
          pointerEvents: "none",
        }}
      >
        <line
          x1={300}
          y1={135}
          x2={185}
          y2={135}
          stroke="#1273c4"
          strokeWidth={3}
          strokeDasharray="6 6"
          opacity={beamOpacity}
        />
        <polygon
          points="180,135 192,129 192,141"
          fill="#1273c4"
          opacity={beamOpacity}
        />
      </svg>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        {/* Left: Background Task Node */}
        <div
          style={{
            width: 170,
            height: 190,
            backgroundColor: "#f0efec",
            borderRadius: 14,
            border: "3px solid #d5d2cc",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
            opacity: taskOpacity,
            transition: "opacity 0.2s ease",
          }}
        >
          {/* animated process loop circle */}
          <div
            style={{
              width: 72,
              height: 72,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={72} height={72} style={{ transform: `rotate(${spin}deg)` }}>
              <circle
                cx={36}
                cy={36}
                r={28}
                fill="none"
                stroke="#d5d2cc"
                strokeWidth={4}
              />
              <path
                d="M 36 8 A 28 28 0 0 1 64 36"
                fill="none"
                stroke="#43474b"
                strokeWidth={4}
                strokeLinecap="round"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#101113",
              }}
            />
          </div>

          {taskQuery ? (
            <div
              style={{
                marginTop: 14,
                fontSize: 14,
                fontWeight: 600,
                color: "#43474b",
                backgroundColor: "#ffffff",
                border: "2px solid #d5d2cc",
                borderRadius: 8,
                padding: "5px 10px",
                textAlign: "center",
                whiteSpace: "nowrap",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {taskQuery}
            </div>
          ) : null}
        </div>

        {/* Right: Observer Eye Node */}
        <div
          style={{
            width: 180,
            height: 190,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${eyeFocus})`,
            transformOrigin: "center center",
          }}
        >
          {/* stylized vector eye */}
          <div
            style={{
              width: 86,
              height: 58,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={86} height={58}>
              {/* eye outline */}
              <path
                d="M 8 29 Q 43 5 78 29 Q 43 53 8 29 Z"
                fill="#ffffff"
                stroke="#101113"
                strokeWidth={3.5}
                strokeLinejoin="round"
              />
              {/* pupil */}
              <circle
                cx={43 + pupilX}
                cy={29 + pupilY}
                r={12}
                fill="#1273c4"
              />
              {/* pupil highlight */}
              <circle
                cx={46 + pupilX}
                cy={26 + pupilY}
                r={3.5}
                fill="#ffffff"
              />
            </svg>
          </div>

          {actionLabel ? (
            <div
              style={{
                marginTop: 14,
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
                backgroundColor: "#e8f2fb",
                border: "2px solid #1273c4",
                borderRadius: 8,
                padding: "6px 12px",
                textAlign: "center",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 8px rgba(18, 115, 196, 0.08)",
              }}
            >
              {actionLabel}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
