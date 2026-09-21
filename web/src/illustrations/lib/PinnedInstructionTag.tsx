// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  commandText?: string;
  pinnedRuleText?: string;
  badgeText?: string;
}

export const canvas = { w: 440, h: 280 };

export const PinnedInstructionTag: React.FC<Props> = ({
  delay = 0,
  budget = 300,
  commandText = "",
  pinnedRuleText = "",
  badgeText = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = currentFrame - delay;

  const baseOpacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const baseY = interpolate(frame, [0, 24], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const tagSlide = interpolate(frame, [28, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const tagScale = interpolate(frame, [28, 58, 72], [0.88, 1.05, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const pinPop = interpolate(frame, [60, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.2)),
  });

  const floatY = Math.sin((frame + 18) * 0.07) * 3.5;
  const pulseScale = 1 + Math.sin(frame * 0.05) * 0.012;

  const showCommand = Boolean(commandText);
  const showRule = Boolean(pinnedRuleText);
  const showBadge = Boolean(badgeText);

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        transform: `translateY(${floatY}px) scale(${pulseScale})`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#ffffff",
            border: "3px solid #101113",
            borderRadius: 16,
            padding: "12px 20px",
            boxShadow: "0 6px 18px rgba(16, 17, 19, 0.06)",
            opacity: baseOpacity,
            transform: `translateY(${baseY}px)`,
          }}
        >
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
            <path
              d="M3 2.5L8.5 7L3 11.5"
              stroke="#1273c4"
              strokeWidth={2.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {showCommand ? (
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 16,
                fontWeight: 700,
                color: "#1273c4",
                letterSpacing: "-0.3px",
                whiteSpace: "nowrap",
              }}
            >
              {commandText}
            </span>
          ) : null}
        </div>

        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: "#f0efec",
            border: "2px solid #d5d2cc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: tagSlide,
          }}
        >
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
            <path
              d="M7 2.5V11.5M2.5 7H11.5"
              stroke="#43474b"
              strokeWidth={2.4}
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: tagSlide,
            transform: `scale(${tagScale})`,
          }}
        >
          {showBadge ? (
            <div
              style={{
                position: "absolute",
                top: -16,
                right: 14,
                backgroundColor: "#1273c4",
                borderRadius: 8,
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 5,
                boxShadow: "0 4px 12px rgba(18, 115, 196, 0.25)",
                transform: `scale(${pinPop})`,
                transformOrigin: "bottom center",
                zIndex: 2,
              }}
            >
              <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1V7M3 3H9M6 7L3 11M6 7L9 11"
                  stroke="#ffffff"
                  strokeWidth={2}
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
                {badgeText}
              </span>
            </div>
          ) : null}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "3px solid #1273c4",
              borderRadius: 16,
              padding: "16px 22px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 8px 24px rgba(18, 115, 196, 0.1)",
              maxWidth: 380,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#1273c4",
                flexShrink: 0,
              }}
            />
            {showRule ? (
              <span
                style={{
                  fontFamily: "Spoqa Han Sans Neo, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#101113",
                  letterSpacing: "-0.3px",
                  lineHeight: "20px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {pinnedRuleText}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
