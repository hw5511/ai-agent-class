// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  frontLaneLabel?: string;
  backLaneLabel?: string;
  frontTaskLabel?: string;
  backTaskLabel?: string;
}

export const canvas = { w: 460, h: 320 };

export const DualLaneExecution: React.FC<Props> = ({
  delay = 0,
  budget = 720,
  frontLaneLabel = "",
  backLaneLabel = "",
  frontTaskLabel = "",
  backTaskLabel = "",
}) => {
  const frame = useCurrentFrame();
  const rel = Math.max(0, frame - (delay ?? 0));

  const breath = Math.sin(frame * 0.05) * 2;
  const pulse = 1 + Math.sin(frame * 0.08) * 0.03;
  const loopAngle = (frame * 3) % 360;

  const entry = interpolate(rel, [0, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const focusScale = interpolate(rel, [370, 410, 450, 480], [1, 1.08, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const frontTaskEntry = interpolate(rel, [460, 500], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const backTaskActive = interpolate(rel, [440, 490], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dashOffset = -rel * 1.5;

  return (
    <div
      style={{
        width: 460,
        height: 320,
        backgroundColor: "#ffffff",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        transform: `translateY(${breath}px) scale(${entry})`,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          right: 18,
          height: 128,
          borderRadius: 14,
          backgroundColor: "#f0efec",
          border: "2px solid #d5d2cc",
          boxSizing: "border-box",
          padding: "12px 14px",
        }}
      >
        {frontLaneLabel ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 10px",
              borderRadius: 8,
              backgroundColor: "#ffffff",
              border: "1.5px solid #d5d2cc",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#1273c4",
              }}
            />
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#43474b",
                letterSpacing: -0.2,
              }}
            >
              {frontLaneLabel}
            </span>
          </div>
        ) : null}

        {frontTaskLabel ? (
          <div
            style={{
              marginTop: 18,
              opacity: frontTaskEntry,
              transform: `scale(${frontTaskEntry}) translateY(${frontTaskEntry ? 0 : 8}px)`,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 10,
              backgroundColor: "#ffffff",
              border: "2px solid #1273c4",
              boxShadow: "0 2px 8px rgba(18, 115, 196, 0.12)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#1273c4",
                transform: `scale(${pulse})`,
              }}
            />
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#1273c4",
                letterSpacing: -0.2,
              }}
            >
              {frontTaskLabel}
            </span>
          </div>
        ) : null}
      </div>

      <svg
        width={460}
        height={320}
        viewBox="0 0 460 320"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          transform: `scale(${focusScale})`,
          transformOrigin: "350px 160px",
        }}
      >
        <path
          d="M 330 82 C 400 82, 400 238, 330 238"
          fill="none"
          stroke="#1273c4"
          strokeWidth={3}
          strokeDasharray="6 6"
          strokeDashoffset={dashOffset}
        />
        <path
          d="M 340 230 L 330 238 L 340 246"
          fill="none"
          stroke="#1273c4"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 18,
          right: 18,
          height: 128,
          borderRadius: 14,
          backgroundColor: "#e8f2fb",
          border: "2px dashed #1273c4",
          boxSizing: "border-box",
          padding: "12px 14px",
        }}
      >
        {backLaneLabel ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 10px",
              borderRadius: 8,
              backgroundColor: "#ffffff",
              border: "1.5px solid #1273c4",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#1273c4",
              }}
            />
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#1273c4",
                letterSpacing: -0.2,
              }}
            >
              {backLaneLabel}
            </span>
          </div>
        ) : null}

        {backTaskLabel ? (
          <div
            style={{
              marginTop: 18,
              opacity: backTaskActive,
              transform: `scale(${backTaskActive})`,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 14px",
              borderRadius: 10,
              backgroundColor: "#ffffff",
              border: "2px solid #1273c4",
              boxShadow: "0 2px 8px rgba(18, 115, 196, 0.12)",
            }}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 18"
              style={{
                transform: `rotate(${loopAngle}deg)`,
                transformOrigin: "center center",
              }}
            >
              <circle
                cx={9}
                cy={9}
                r={7}
                fill="none"
                stroke="#1273c4"
                strokeWidth={2}
                strokeDasharray="14 6"
              />
            </svg>
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
                letterSpacing: -0.2,
              }}
            >
              {backTaskLabel}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
