// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing, interpolateColors } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  heavyPayloadLabel?: string;
  filteredResultLabel?: string;
  targetLabel?: string;
}

export const canvas = { w: 500, h: 320 };

export const ContextPayloadFilter: React.FC<Props> = ({
  delay = 0,
  budget,
  heavyPayloadLabel = "",
  filteredResultLabel = "",
  targetLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  const enterScale = interpolate(f, [0, 35], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const enterOpacity = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const breathe = Math.sin(f * 0.08) * 3;
  const stackWiggle = Math.sin(f * 0.14) * 2;

  const filterGlow = interpolate(f, [180, 240, 320], [0, 1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const streamFlow = interpolate(f, [220, 320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const resultTravel = interpolate(f, [320, 420], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const targetAbsorb = interpolate(f, [400, 430, 470], [1, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const heavyDim = interpolate(f, [380, 440], [1, 0.74], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const packetX = interpolate(resultTravel, [0, 1], [250, 395]);
  const packetOpacity = interpolate(f, [315, 330], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 500,
        height: 320,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f0efec",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        opacity: enterOpacity,
        transform: "scale(" + enterScale + ")",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 25,
          top: 50,
          width: 170,
          height: 220,
          borderRadius: 16,
          border: "3px dashed #d5d2cc",
          backgroundColor: "#ffffff",
          opacity: heavyDim,
          transform: "translateY(" + breathe + "px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {heavyPayloadLabel ? (
          <div
            style={{
              position: "absolute",
              top: -14,
              left: 16,
              backgroundColor: "#f0efec",
              border: "2px solid #d5d2cc",
              padding: "3px 10px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "Pretendard, sans-serif",
              color: "#43474b",
              whiteSpace: "nowrap",
            }}
          >
            {heavyPayloadLabel}
          </div>
        ) : null}

        <div
          style={{
            position: "relative",
            width: 110,
            height: 120,
            transform: "translateY(" + stackWiggle + "px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 16,
              top: 0,
              width: 78,
              height: 94,
              borderRadius: 8,
              border: "2px solid #d5d2cc",
              backgroundColor: "#f0efec",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 10,
              width: 78,
              height: 94,
              borderRadius: 8,
              border: "2px solid #d5d2cc",
              backgroundColor: "#f0efec",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 20,
              width: 78,
              height: 94,
              borderRadius: 8,
              border: "3px solid #d5d2cc",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              padding: "12px 10px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ height: 3, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
            <div style={{ height: 3, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
            <div style={{ height: 3, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
            <div style={{ height: 3, width: "65%", backgroundColor: "#d5d2cc", borderRadius: 2 }} />
          </div>
        </div>
      </div>

      <svg width={60} height={140} style={{ position: "absolute", left: 220, top: 90 }}>
        <path
          d="M 10 20 L 50 20 L 38 65 L 38 115 L 22 115 L 22 65 Z"
          fill={interpolateColors(filterGlow, [0, 1], ["#ffffff", "#e8f2fb"])}
          stroke="#1273c4"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <line
          x1={30}
          y1={35}
          x2={30}
          y2={interpolate(streamFlow, [0, 1], [35, 105])}
          stroke="#1273c4"
          strokeWidth={3}
          strokeDasharray="4 4"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 315,
          top: 50,
          width: 160,
          height: 220,
          borderRadius: 16,
          border: "3px solid #101113",
          backgroundColor: "#ffffff",
          transform: "scale(" + targetAbsorb + ")",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {targetLabel ? (
          <div
            style={{
              position: "absolute",
              top: -14,
              left: 16,
              backgroundColor: "#101113",
              color: "#ffffff",
              padding: "3px 12px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "Pretendard, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {targetLabel}
          </div>
        ) : null}

        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            border: "3px solid #101113",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "#101113",
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: packetX - 50,
          top: 140,
          width: 100,
          opacity: packetOpacity,
          backgroundColor: "#1273c4",
          color: "#ffffff",
          border: "2px solid #1273c4",
          borderRadius: 12,
          padding: "8px 12px",
          textAlign: "center",
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "Pretendard, sans-serif",
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      >
        {filteredResultLabel ? <div>{filteredResultLabel}</div> : null}
      </div>
    </div>
  );
};
