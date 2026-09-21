// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 580, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  accountLabel?: string;
  webLabel?: string;
  syncLabel?: string;
  appLabel?: string;
}

export const AccountSyncFlow: React.FC<Props> = ({
  delay = 0,
  budget = 720,
  accountLabel = "",
  webLabel = "",
  syncLabel = "",
  appLabel = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  const leftNodeEnter = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const rightNodeEnter = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const centerNodeEnter = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const floatLeft = Math.sin(frame * 0.05) * 3;
  const floatRight = Math.cos(frame * 0.05) * 3;
  const floatCenter = Math.sin(frame * 0.07 + 1) * 4;

  const packetCycle1 = (frame % 75) / 75;
  const packetX1 = interpolate(packetCycle1, [0, 1], [130, 450]);
  const packetOpacity1 = interpolate(
    packetCycle1,
    [0, 0.1, 0.85, 1],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const packetCycle2 = ((frame + 37) % 75) / 75;
  const packetX2 = interpolate(packetCycle2, [0, 1], [130, 450]);
  const packetOpacity2 = interpolate(
    packetCycle2,
    [0, 0.1, 0.85, 1],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

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
        viewBox="0 0 580 360"
        fill="none"
      >
        <line
          x1="120"
          y1="180"
          x2="460"
          y2="180"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeDasharray="6 6"
        />

        <line
          x1="120"
          y1="180"
          x2="460"
          y2="180"
          stroke="#1273c4"
          strokeWidth="2"
          strokeOpacity="0.4"
        />

        <g
          transform={`translate(${packetX1 - 10}, 170)`}
          opacity={packetOpacity1}
        >
          <path
            d="M 2 2 C 2 0.9 2.9 0 4 0 H 16 C 17.1 0 18 0.9 18 2 V 12 C 18 13.1 17.1 14 16 14 H 7 L 3 17 V 14 C 2 14 2 13 2 12 Z"
            fill="#1273c4"
          />
        </g>

        <g
          transform={`translate(${packetX2 - 10}, 170)`}
          opacity={packetOpacity2}
        >
          <path
            d="M 2 2 C 2 0.9 2.9 0 4 0 H 16 C 17.1 0 18 0.9 18 2 V 12 C 18 13.1 17.1 14 16 14 H 7 L 3 17 V 14 C 2 14 2 13 2 12 Z"
            fill="#1273c4"
          />
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          left: 40,
          top: 120,
          transform: `translateY(${floatLeft}px) scale(${leftNodeEnter})`,
          opacity: leftNodeEnter,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 18,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="15" stroke="#1273c4" strokeWidth="2.5" />
            <path
              d="M 5 20 H 35 M 20 5 C 24 10 24 30 20 35 M 20 5 C 16 10 16 30 20 35"
              stroke="#1273c4"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {webLabel ? (
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 12,
              backgroundColor: "#ffffff",
              border: "1.5px solid #d5d2cc",
              fontFamily: "Pretendard, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#101113",
              whiteSpace: "nowrap",
            }}
          >
            <span>{webLabel}</span>
          </div>
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          left: 240,
          top: 85,
          transform: `translateY(${floatCenter}px) scale(${centerNodeEnter})`,
          opacity: centerNodeEnter,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        {accountLabel ? (
          <div
            style={{
              padding: "5px 14px",
              borderRadius: 14,
              backgroundColor: "#1273c4",
              color: "#ffffff",
              fontFamily: "Pretendard, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(18, 115, 196, 0.25)",
            }}
          >
            <span>{accountLabel}</span>
          </div>
        ) : null}

        <div
          style={{
            width: 74,
            height: 74,
            borderRadius: 37,
            backgroundColor: "#ffffff",
            border: "3.5px solid #1273c4",
            boxShadow: "0 4px 14px rgba(18, 115, 196, 0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="14" r="6" fill="#1273c4" />
            <path
              d="M 9 29 C 9 23.5 13.5 21 19 21 C 24.5 21 29 23.5 29 29"
              stroke="#1273c4"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {syncLabel ? (
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 12,
              backgroundColor: "#e8f2fb",
              border: "1.5px solid #1273c4",
              color: "#1273c4",
              fontFamily: "Spoqa Han Sans Neo, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            <span>{syncLabel}</span>
          </div>
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          right: 40,
          top: 120,
          transform: `translateY(${floatRight}px) scale(${rightNodeEnter})`,
          opacity: rightNodeEnter,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 18,
            backgroundColor: "#ffffff",
            border: "3px solid #1273c4",
            boxShadow: "0 4px 12px rgba(18, 115, 196, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="5" y="5" width="30" height="30" rx="9" fill="#1273c4" />
            <path
              d="M 20 11 L 22.8 17.2 L 29 20 L 22.8 22.8 L 20 29 L 17.2 22.8 L 11 20 L 17.2 17.2 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {appLabel ? (
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 12,
              backgroundColor: "#ffffff",
              border: "1.5px solid #d5d2cc",
              fontFamily: "Pretendard, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#101113",
              whiteSpace: "nowrap",
            }}
          >
            <span>{appLabel}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
