// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  savedLabel?: string;
  resumeLabel?: string;
  rewindLabel?: string;
}

export const SessionResumeRewind: React.FC<Props> = function SessionResumeRewind({
  delay = 0,
  budget = 540,
  savedLabel = "",
  resumeLabel = "",
  rewindLabel = "",
}) {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  const intro = interpolate(f, [0, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const floatY = Math.sin(f * 0.04) * 3;

  const savedGlow = interpolate(f, [40, 70, 140], [0, 1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const handleExtend = interpolate(f, [330, 365], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const resumePop = interpolate(f, [350, 375, 400], [1, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rewindPop = interpolate(f, [390, 415, 440], [1, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const armLength = handleExtend * 35;

  return (
    <div
      style={{
        position: "relative",
        width: 440,
        height: 320,
        opacity: intro,
        transform: `scale(${0.92 + 0.08 * intro}) translateY(${floatY}px)`,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 130 - armLength,
          top: 155,
          width: armLength,
          height: 8,
          backgroundColor: "#101113",
          borderRadius: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 85 - armLength,
          top: 128,
          width: 44,
          height: 62,
          borderRadius: 12,
          backgroundColor: "#ffffff",
          border: "3px solid #101113",
          boxShadow: "0 4px 0 #101113",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${rewindPop})`,
          transformOrigin: "center center",
        }}
      >
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <path
            d="M 8 7 L 4 11 L 8 15"
            stroke="#101113"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 5 11 H 13 A 5 5 0 0 1 18 16 A 5 5 0 0 1 13 21 H 9"
            stroke="#101113"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {rewindLabel ? (
        <div
          style={{
            position: "absolute",
            left: 55 - armLength,
            top: 205,
            padding: "5px 12px",
            backgroundColor: "#ffffff",
            border: "2px solid #101113",
            borderRadius: 10,
            boxShadow: "0 3px 0 rgba(16, 17, 19, 0.08)",
            transform: `scale(${rewindPop})`,
            transformOrigin: "center center",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontFamily: "Pretendard, -apple-system, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#101113",
              lineHeight: 1,
            }}
          >{rewindLabel}</span>
        </div>
      ) : null}

      <div
        style={{
          position: "absolute",
          left: 130,
          top: 75,
          width: 180,
          height: 170,
          backgroundColor: "#ffffff",
          borderRadius: 18,
          border: "3px solid #101113",
          boxShadow: "0 6px 0 rgba(16, 17, 19, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 14,
          boxSizing: "border-box",
        }}
      >
        {savedLabel ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 12px",
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
              borderRadius: 999,
              boxShadow: `0 0 10px rgba(18, 115, 196, ${savedGlow * 0.4})`,
            }}
          >
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
              <rect x={2} y={7} width={12} height={8} rx={2} fill="#1273c4" />
              <path
                d="M 5 7 V 4.5 C 5 2.8 6.3 1.5 8 1.5 C 9.7 1.5 11 2.8 11 4.5 V 7"
                stroke="#1273c4"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#1273c4",
                lineHeight: 1,
              }}
            >{savedLabel}</span>
          </div>
        ) : null}

        <div
          style={{
            position: "relative",
            width: "100%",
            flex: 1,
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              width: 85,
              height: 20,
              backgroundColor: "#f0efec",
              border: "2px solid #d5d2cc",
              borderRadius: 6,
              alignSelf: "flex-start",
            }}
          />
          <div
            style={{
              width: 105,
              height: 20,
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
              borderRadius: 6,
              alignSelf: "flex-end",
            }}
          />
          <div
            style={{
              width: 75,
              height: 20,
              backgroundColor: "#f0efec",
              border: "2px solid #d5d2cc",
              borderRadius: 6,
              alignSelf: "flex-start",
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 310,
          top: 155,
          width: armLength,
          height: 8,
          backgroundColor: "#101113",
          borderRadius: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 310 + armLength,
          top: 128,
          width: 44,
          height: 62,
          borderRadius: 12,
          backgroundColor: "#ffffff",
          border: "3px solid #101113",
          boxShadow: "0 4px 0 #101113",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${resumePop})`,
          transformOrigin: "center center",
        }}
      >
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <path
            d="M 16 7 L 20 11 L 16 15"
            stroke="#1273c4"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 19 11 H 11 A 5 5 0 0 0 6 16 A 5 5 0 0 0 11 21 H 15"
            stroke="#1273c4"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {resumeLabel ? (
        <div
          style={{
            position: "absolute",
            left: 300 + armLength,
            top: 205,
            padding: "5px 12px",
            backgroundColor: "#ffffff",
            border: "2px solid #1273c4",
            borderRadius: 10,
            boxShadow: "0 3px 0 rgba(18, 115, 196, 0.12)",
            transform: `scale(${resumePop})`,
            transformOrigin: "center center",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontFamily: "Pretendard, -apple-system, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#1273c4",
              lineHeight: 1,
            }}
          >{resumeLabel}</span>
        </div>
      ) : null}
    </div>
  );
};

export const canvas = { w: 440, h: 320 };
