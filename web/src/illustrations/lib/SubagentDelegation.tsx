// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  mainLabel?: string;
  subagentLabel?: string;
  memoryLabel?: string;
  resultLabel?: string;
}

export const canvas = { w: 520, h: 340 };

export const SubagentDelegation: React.FC<Props> = ({
  delay = 0,
  budget,
  mainLabel = "",
  subagentLabel = "",
  memoryLabel = "",
  resultLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  const enterScale = interpolate(f, [0, 35], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const enterOpacity = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const breatheA = Math.sin(f * 0.08) * 3;
  const breatheB = Math.sin(f * 0.08 + 1.6) * 3;

  const dispatchProgress = interpolate(f, [45, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const spawnScale = interpolate(f, [55, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  const memoryExpand = interpolate(f, [105, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subagentFocus = interpolate(f, [150, 180, 340, 370], [1, 1.12, 1.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mainDim = interpolate(f, [150, 180, 340, 370], [1, 0.76, 0.76, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const packetTravel = interpolate(f, [360, 440], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const packetOpacity = interpolate(f, [355, 365, 440, 450], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const packetX = interpolate(packetTravel, [0, 1], [375, 125]);
  const packetY = interpolate(packetTravel, [0, 0.5, 1], [170, 120, 170]);

  const mainAbsorbScale = interpolate(f, [440, 465, 500], [1, 1.18, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const finalBadgeOpacity = interpolate(f, [445, 465], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const memoryDimAfter = interpolate(f, [440, 480], [1, 0.74], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 520,
        height: 340,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f0efec",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        opacity: enterOpacity,
        transform: "scale(" + enterScale + ")",
      }}
    >
      <svg
        width={520}
        height={340}
        style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
      >
        <line
          x1={125}
          y1={170}
          x2={interpolate(dispatchProgress, [0, 1], [125, 375])}
          y2={170}
          stroke="#1273c4"
          strokeWidth={3}
          strokeDasharray="6 6"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 285,
          top: 75,
          width: 180,
          height: 190,
          borderRadius: 16,
          border: "3px dashed #d5d2cc",
          backgroundColor: "#ffffff",
          opacity: memoryDimAfter,
          transform: "scale(" + memoryExpand + ")",
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 16,
          boxSizing: "border-box",
        }}
      >
        {memoryLabel ? (
          <div
            style={{
              position: "absolute",
              top: -14,
              left: 16,
              backgroundColor: "#f0efec",
              padding: "3px 10px",
              borderRadius: 8,
              border: "2px solid #d5d2cc",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "Pretendard, sans-serif",
              color: "#43474b",
            }}
          >
            {memoryLabel}
          </div>
        ) : null}

        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            width: 38,
            height: 48,
            borderRadius: 6,
            border: "2px solid #d5d2cc",
            backgroundColor: "#f0efec",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            padding: "8px 6px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ height: 3, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
          <div style={{ height: 3, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
          <div style={{ height: 3, width: "60%", backgroundColor: "#d5d2cc", borderRadius: 2 }} />
        </div>

        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            width: 38,
            height: 48,
            borderRadius: 6,
            border: "2px solid #d5d2cc",
            backgroundColor: "#f0efec",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            padding: "8px 6px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ height: 3, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
          <div style={{ height: 3, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
          <div style={{ height: 3, width: "50%", backgroundColor: "#d5d2cc", borderRadius: 2 }} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 335,
          top: 130,
          width: 80,
          height: 80,
          borderRadius: 16,
          border: "3px solid #1273c4",
          backgroundColor: "#e8f2fb",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: "scale(" + (spawnScale * subagentFocus) + ") translateY(" + breatheB + "px)",
          transformOrigin: "center center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            border: "3px solid #1273c4",
            backgroundColor: "#ffffff",
          }}
        />
        {subagentLabel ? (
          <div
            style={{
              position: "absolute",
              bottom: -32,
              backgroundColor: "#1273c4",
              color: "#ffffff",
              padding: "3px 10px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "Pretendard, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {subagentLabel}
          </div>
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          left: packetX - 45,
          top: packetY - 16,
          width: 90,
          opacity: packetOpacity,
          padding: "6px 12px",
          borderRadius: 12,
          backgroundColor: "#1273c4",
          border: "2px solid #1273c4",
          color: "#ffffff",
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "Pretendard, sans-serif",
          textAlign: "center",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      >
        {resultLabel ? <div>{resultLabel}</div> : null}
      </div>

      <div
        style={{
          position: "absolute",
          left: 75,
          top: 120,
          width: 100,
          height: 100,
          borderRadius: 18,
          border: "3px solid #101113",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: mainDim,
          transform: "scale(" + (mainAbsorbScale + breatheA * 0.01) + ")",
          transformOrigin: "center center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#101113",
          }}
        />

        {mainLabel ? (
          <div
            style={{
              position: "absolute",
              bottom: -32,
              backgroundColor: "#ffffff",
              color: "#101113",
              border: "2px solid #101113",
              padding: "3px 12px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "Pretendard, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {mainLabel}
          </div>
        ) : null}

        {resultLabel ? (
          <div
            style={{
              position: "absolute",
              top: -14,
              opacity: finalBadgeOpacity,
              backgroundColor: "#e8f2fb",
              color: "#1273c4",
              border: "2px solid #1273c4",
              padding: "2px 8px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "Pretendard, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {resultLabel}
          </div>
        ) : null}
      </div>
    </div>
  );
};
