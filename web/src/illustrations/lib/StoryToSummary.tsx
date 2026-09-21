// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  storyLabel?: string;
  summaryLabel?: string;
  resultBadge?: string;
}

export const canvas = { w: 480, h: 320 };

export const StoryToSummary: React.FC<Props> = ({
  delay = 0,
  budget = 300,
  storyLabel = "",
  summaryLabel = "",
  resultBadge = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = currentFrame - delay;

  const leftCardOpacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leftCardY = interpolate(frame, [0, 24], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const scanProgress = interpolate(frame, [20, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const streamProgress = interpolate(frame, [45, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const rightCardOpacity = interpolate(frame, [50, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightCardScale = interpolate(frame, [50, 78, 92], [0.9, 1.05, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const badgeScale = interpolate(frame, [78, 98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.0)),
  });

  const breatheY = Math.sin((frame + 12) * 0.08) * 3;
  const pulseScale = 1 + Math.sin(frame * 0.06) * 0.012;

  const scanTop = 64 + scanProgress * 106;

  const showStoryLabel = Boolean(storyLabel);
  const showSummaryLabel = Boolean(summaryLabel);
  const showResultBadge = Boolean(resultBadge);

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 28px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        transform: `translateY(${breatheY}px) scale(${pulseScale})`,
      }}
    >
      <div
        style={{
          width: 194,
          height: 236,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          border: "3px solid #d5d2cc",
          boxSizing: "border-box",
          padding: "16px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          position: "relative",
          overflow: "hidden",
          opacity: leftCardOpacity,
          transform: `translateY(${leftCardY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "2px solid #f0efec",
            paddingBottom: 10,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#7c8288",
            }}
          />
          {showStoryLabel ? (
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#43474b",
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {storyLabel}
            </span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 9,
            marginTop: 4,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 7,
              borderRadius: 4,
              backgroundColor: "#d5d2cc",
            }}
          />
          <div
            style={{
              width: "82%",
              height: 7,
              borderRadius: 4,
              backgroundColor: "#d5d2cc",
            }}
          />
          <div
            style={{
              width: "92%",
              height: 7,
              borderRadius: 4,
              backgroundColor: "#d5d2cc",
            }}
          />
          <div
            style={{
              width: "68%",
              height: 7,
              borderRadius: 4,
              backgroundColor: "#d5d2cc",
            }}
          />
          <div
            style={{
              width: "88%",
              height: 7,
              borderRadius: 4,
              backgroundColor: "#d5d2cc",
            }}
          />
          <div
            style={{
              width: "54%",
              height: 7,
              borderRadius: 4,
              backgroundColor: "#d5d2cc",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            top: scanTop,
            width: "100%",
            height: 3,
            backgroundColor: "#1273c4",
            boxShadow: "0 0 10px rgba(18, 115, 196, 0.45)",
          }}
        />
      </div>

      <div
        style={{
          width: 36,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <svg width={32} height={24} viewBox="0 0 32 24" fill="none">
          <path
            d="M4 12H24M16 4L24 12L16 20"
            stroke="#1273c4"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={28}
            strokeDashoffset={(1 - streamProgress) * 28}
          />
        </svg>
      </div>

      <div
        style={{
          width: 194,
          height: 236,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          border: "3px solid #1273c4",
          boxSizing: "border-box",
          padding: "16px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          boxShadow: "0 8px 24px rgba(18, 115, 196, 0.08)",
          opacity: rightCardOpacity,
          transform: `scale(${rightCardScale})`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "2px solid #e8f2fb",
              paddingBottom: 10,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#1273c4",
              }}
            />
            {showSummaryLabel ? (
              <span
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#101113",
                  letterSpacing: "-0.2px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {summaryLabel}
              </span>
            ) : null}
          </div>

          <div
            style={{
              backgroundColor: "#e8f2fb",
              borderRadius: 8,
              padding: "12px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 9,
            }}
          >
            <div
              style={{
                width: "90%",
                height: 8,
                borderRadius: 4,
                backgroundColor: "#1273c4",
              }}
            />
            <div
              style={{
                width: "74%",
                height: 8,
                borderRadius: 4,
                backgroundColor: "#101113",
              }}
            />
            <div
              style={{
                width: "82%",
                height: 8,
                borderRadius: 4,
                backgroundColor: "#43474b",
              }}
            />
          </div>
        </div>

        {showResultBadge ? (
          <div
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#1273c4",
              borderRadius: 8,
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transform: `scale(${badgeScale})`,
              transformOrigin: "bottom right",
            }}
          >
            <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6.5L4.8 8.8L9.5 3.5"
                stroke="#ffffff"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
              }}
            >
              {resultBadge}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
