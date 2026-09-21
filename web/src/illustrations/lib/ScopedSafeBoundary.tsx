// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  scopeLabel?: string;
  boundaryLabel?: string;
  targetLabel?: string;
}

export const canvas = { w: 460, h: 320 };

export const ScopedSafeBoundary: React.FC<Props> = (props) => {
  const {
    delay = 0,
    budget = 720,
    scopeLabel = "",
    boundaryLabel = "",
    targetLabel = "",
  } = props;

  const frame = useCurrentFrame();
  const activeFrame = Math.min(Math.max(0, frame - delay), budget);

  const containerScale = interpolate(activeFrame, [0, 25], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const containerOpacity = interpolate(activeFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const probeX = interpolate(activeFrame, [20, 50, 75], [35, 185, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const targetScale = interpolate(activeFrame, [45, 70], [1, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const checkScale = interpolate(activeFrame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.7)),
  });

  const floatY = Math.sin(activeFrame * 0.05) * 3;
  const shieldPulse = 1 + Math.sin(activeFrame * 0.08) * 0.04;

  return (
    <div
      style={{
        position: "relative",
        width: canvas.w,
        height: canvas.h,
        backgroundColor: "#f0efec",
        borderRadius: 18,
        border: "3px dashed #d5d2cc",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 396,
          height: 252,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          border: "3px solid #1273c4",
          boxShadow: "0 10px 26px rgba(18, 115, 196, 0.09)",
          boxSizing: "border-box",
          padding: "16px 18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: containerOpacity,
          transform: `translateY(${floatY}px) scale(${containerScale})`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg
              width={20}
              height={22}
              viewBox="0 0 20 22"
              fill="none"
              style={{ transform: `scale(${shieldPulse})` }}
            >
              <path
                d="M10 2L3 5.5V11.5C3 16 6.5 19.5 10 20.5C13.5 19.5 17 16 17 11.5V5.5L10 2Z"
                fill="#e8f2fb"
                stroke="#1273c4"
                strokeWidth={2.4}
                strokeLinejoin="round"
              />
              <polyline
                points="6.5,11.5 8.8,13.8 13.5,8.8"
                stroke="#1273c4"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {scopeLabel ? (
              <span
                style={{
                  fontFamily: "Pretendard, -apple-system, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#101113",
                }}
              >
                {scopeLabel}
              </span>
            ) : null}
          </div>

          {boundaryLabel ? (
            <div
              style={{
                backgroundColor: "#e8f2fb",
                border: "2px solid #1273c4",
                borderRadius: 8,
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <circle cx={6} cy={6} r={4.5} stroke="#1273c4" strokeWidth={2} />
                <circle cx={6} cy={6} r={2} fill="#1273c4" />
              </svg>
              <span
                style={{
                  fontFamily: "Spoqa Han Sans Neo, -apple-system, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1273c4",
                }}
              >
                {boundaryLabel}
              </span>
            </div>
          ) : null}
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: 154,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 4,
              left: 0,
              transform: `translateX(${probeX}px)`,
              pointerEvents: "none",
              zIndex: 3,
            }}
          >
            <svg width={42} height={42} viewBox="0 0 42 42" fill="none">
              <circle
                cx={18}
                cy={18}
                r={12}
                stroke="#1273c4"
                strokeWidth={3}
                fill="none"
              />
              <line
                x1={27}
                y1={27}
                x2={37}
                y2={37}
                stroke="#1273c4"
                strokeWidth={3.5}
                strokeLinecap="round"
              />
              <circle
                cx={18}
                cy={18}
                r={6}
                fill="#1273c4"
                opacity={0.2}
              />
            </svg>
          </div>

          <div
            style={{
              width: 64,
              height: 86,
              backgroundColor: "#ffffff",
              border: "2px solid #d5d2cc",
              borderRadius: 8,
              opacity: 0.72,
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 24,
                height: 4,
                backgroundColor: "#d5d2cc",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: "100%",
                height: 3,
                backgroundColor: "#d5d2cc",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: "70%",
                height: 3,
                backgroundColor: "#d5d2cc",
                borderRadius: 2,
              }}
            />
          </div>

          <div
            style={{
              position: "relative",
              width: 154,
              height: 114,
              backgroundColor: "#ffffff",
              border: "3px solid #1273c4",
              borderRadius: 8,
              transform: `scale(${targetScale})`,
              boxShadow: "0 8px 22px rgba(18, 115, 196, 0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "12px 14px",
              boxSizing: "border-box",
              zIndex: 2,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -9,
                right: -9,
                transform: `scale(${checkScale})`,
                backgroundColor: "#1273c4",
                width: 20,
                height: 20,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <polyline
                  points="2.5,6 5,8.5 9.5,3.5"
                  stroke="#ffffff"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width={18} height={20} viewBox="0 0 18 20" fill="none">
                <path
                  d="M2 3C2 2.44772 2.44772 2 3 2H11L16 7V17C16 17.5523 15.5523 18 15 18H3C2.44772 18 2 17.5523 2 17V3Z"
                  stroke="#1273c4"
                  strokeWidth={2.4}
                  strokeLinejoin="round"
                />
                <path
                  d="M11 2V7H16"
                  stroke="#1273c4"
                  strokeWidth={2.4}
                  strokeLinejoin="round"
                />
              </svg>
              {targetLabel ? (
                <span
                  style={{
                    fontFamily: "Pretendard, -apple-system, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#101113",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {targetLabel}
                </span>
              ) : null}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div
                style={{
                  width: "100%",
                  height: 4,
                  backgroundColor: "#e8f2fb",
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  width: "60%",
                  height: 4,
                  backgroundColor: "#e8f2fb",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>

          <div
            style={{
              width: 64,
              height: 86,
              backgroundColor: "#ffffff",
              border: "2px solid #d5d2cc",
              borderRadius: 8,
              opacity: 0.72,
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 24,
                height: 4,
                backgroundColor: "#d5d2cc",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: "100%",
                height: 3,
                backgroundColor: "#d5d2cc",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: "70%",
                height: 3,
                backgroundColor: "#d5d2cc",
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
