// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  percentText?: string;
  singleLineText?: string;
  heavyFileText?: string;
  essentialFileText?: string;
}

export const canvas = { w: 480, h: 360 };

export const ContextCapacityGauge: React.FC<Props> = ({
  delay = 0,
  budget,
  percentText = "",
  singleLineText = "",
  heavyFileText = "",
  essentialFileText = "",
}) => {
  const frame = useCurrentFrame();
  const f = frame - delay;

  const float = Math.sin(f * 0.08) * 2.5;

  const enterOpacity = interpolate(f, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const fillPercent = interpolate(f, [330, 410], [8, 64], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const badgeScale = interpolate(f, [366, 400, 435], [1, 1.22, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const singleLineOpacity = interpolate(f, [330, 380], [1, 0.74], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const heavyOpacity = interpolate(f, [649, 700, 830, 860], [0.74, 1, 1, 0.74], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const essentialOpacity = interpolate(f, [855, 910], [0.74, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const essentialScale = interpolate(f, [855, 910], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        backgroundColor: "#f0efec",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "36px 36px",
        boxSizing: "border-box",
        opacity: enterOpacity,
      }}
    >
      <div
        style={{
          width: 140,
          height: 280,
          position: "relative",
          transform: `translateY(${float}px)`,
        }}
      >
        <div
          style={{
            width: 120,
            height: 280,
            borderRadius: 22,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 70,
              left: 8,
              right: 8,
              height: 2,
              backgroundColor: "#f0efec",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 140,
              left: 8,
              right: 8,
              height: 2,
              backgroundColor: "#f0efec",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 210,
              left: 8,
              right: 8,
              height: 2,
              backgroundColor: "#f0efec",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: `${fillPercent}%`,
              backgroundColor: "#1273c4",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              transition: "height 0.1s linear",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                backgroundColor: "#e8f2fb",
              }}
            />
          </div>
        </div>

        {percentText ? (
          <div
            style={{
              position: "absolute",
              left: 84,
              bottom: `${fillPercent}%`,
              transform: `translateY(50%) scale(${badgeScale})`,
              transformOrigin: "left center",
              backgroundColor: "#1273c4",
              padding: "6px 14px",
              borderRadius: 12,
              boxShadow: "0 6px 16px rgba(18, 115, 196, 0.3)",
              zIndex: 5,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily:
                  "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.2px",
              }}
            >
              {percentText}
            </span>
          </div>
        ) : null}
      </div>

      <div
        style={{
          width: 230,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "2px solid #d5d2cc",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: singleLineOpacity,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              backgroundColor: "#f0efec",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <line
                x1="3"
                y1="9"
                x2="15"
                y2="9"
                stroke="#101113"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {singleLineText ? (
            <span
              style={{
                fontFamily:
                  "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
                letterSpacing: "-0.2px",
              }}
            >
              {singleLineText}
            </span>
          ) : null}
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "2px solid #d5d2cc",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: heavyOpacity,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              backgroundColor: "#e8f2fb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <rect
                x="3"
                y="3"
                width="12"
                height="12"
                rx="3"
                fill="none"
                stroke="#1273c4"
                strokeWidth="2"
              />
              <path
                d="M 6 12 L 9 8 L 12 12"
                stroke="#1273c4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {heavyFileText ? (
            <span
              style={{
                fontFamily:
                  "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
                letterSpacing: "-0.2px",
              }}
            >
              {heavyFileText}
            </span>
          ) : null}
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "3px solid #1273c4",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: essentialOpacity,
            transform: `scale(${essentialScale})`,
            boxShadow: "0 6px 16px rgba(18, 115, 196, 0.12)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              backgroundColor: "#1273c4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <circle
                cx="9"
                cy="9"
                r="6"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <circle cx="9" cy="9" r="2" fill="#ffffff" />
            </svg>
          </div>
          {essentialFileText ? (
            <span
              style={{
                fontFamily:
                  "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#1273c4",
                letterSpacing: "-0.2px",
              }}
            >
              {essentialFileText}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
