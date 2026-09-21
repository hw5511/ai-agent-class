// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  command?: string;
  targetLabel?: string;
  actionBadge?: string;
  bypassLabel?: string;
}

export const canvas = { w: 440, h: 320 };

export const DirectContinueFlow: React.FC<Props> = ({
  delay = 0,
  budget,
  command = "",
  targetLabel = "",
  actionBadge = "",
  bypassLabel = "",
}) => {
  const currentFrame = useCurrentFrame();
  const f = Math.max(0, currentFrame - delay);

  const floatY = Math.sin(f * 0.07) * 3;
  const pulse = interpolate(Math.sin(f * 0.1), [-1, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const introProgress = interpolate(f, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const leapProgress = interpolate(f, [25, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const targetFocus = interpolate(f, [70, 110], [1, 1.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const badgeScale = interpolate(f, [85, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });

  const bypassOpacity = interpolate(f, [35, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dashOffset = -f * 2.5;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        backgroundColor: "#ffffff",
        border: "2px solid #d5d2cc",
        borderRadius: "16px",
        boxSizing: "border-box",
        position: "relative",
        padding: "18px 20px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'Pretendard', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          opacity: introProgress,
          transform: `translateY(${(1 - introProgress) * -8}px)`,
        }}
      >
        {command ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#f0efec",
              border: "1.5px solid #d5d2cc",
              borderRadius: "8px",
              padding: "6px 12px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 4L13 12L5 20M13 4L21 12L13 20"
                stroke="#1273c4"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#101113",
                letterSpacing: "-0.2px",
              }}
            >
              {command}
            </span>
          </div>
        ) : (
          <div />
        )}

        {bypassLabel ? (
          <div
            style={{
              opacity: bypassOpacity,
              transform: `scale(${0.9 + bypassOpacity * 0.1})`,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#e8f2fb",
              border: "1px solid #1273c4",
              borderRadius: "8px",
              padding: "5px 10px",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12L20 12M20 12L14 6M20 12L14 18"
                stroke="#1273c4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "'Spoqa Han Sans Neo', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#1273c4",
              }}
            >
              {bypassLabel}
            </span>
          </div>
        ) : null}
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "220px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          viewBox="0 0 400 220"
        >
          <line
            x1="45"
            y1="140"
            x2="300"
            y2="140"
            stroke="#d5d2cc"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            opacity={introProgress}
          />
          <path
            d="M 45 130 C 80 15, 230 15, 290 100"
            fill="none"
            stroke="#1273c4"
            strokeWidth="3.5"
            strokeDasharray="6 6"
            strokeDashoffset={dashOffset}
            opacity={Math.min(1, leapProgress * 1.2)}
          />
          <polygon
            points="285,92 296,104 295,88"
            fill="#1273c4"
            opacity={leapProgress >= 0.8 ? 1 : 0}
            transform={`scale(${pulse})`}
            style={{ transformOrigin: "290px 100px" }}
          />
        </svg>

        <div
          style={{
            position: "absolute",
            left: "25px",
            top: "115px",
            width: "50px",
            height: "50px",
            borderRadius: "14px",
            backgroundColor: "#f0efec",
            border: "2px solid #d5d2cc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            opacity: 0.74,
            transform: `translateY(${(1 - introProgress) * 12}px)`,
          }}
        >
          <div
            style={{
              width: "22px",
              height: "4px",
              backgroundColor: "#7c8288",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "4px",
              backgroundColor: "#d5d2cc",
              borderRadius: "2px",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "115px",
            width: "50px",
            height: "50px",
            borderRadius: "14px",
            backgroundColor: "#f0efec",
            border: "2px solid #d5d2cc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            opacity: 0.74,
            transform: `translateY(${(1 - introProgress) * 12}px)`,
          }}
        >
          <div
            style={{
              width: "22px",
              height: "4px",
              backgroundColor: "#7c8288",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "4px",
              backgroundColor: "#d5d2cc",
              borderRadius: "2px",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: "15px",
            top: "60px",
            width: "155px",
            height: "105px",
            backgroundColor: "#ffffff",
            border: "3px solid #1273c4",
            borderRadius: "16px",
            boxShadow: `0 4px 16px rgba(18, 115, 196, ${0.12 * pulse})`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "12px 14px",
            boxSizing: "border-box",
            transform: `scale(${targetFocus}) translateY(${floatY}px)`,
            transformOrigin: "center center",
            zIndex: 3,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#1273c4",
                boxShadow: "0 0 6px rgba(18, 115, 196, 0.6)",
              }}
            />
            <svg width="18" height="14" viewBox="0 0 24 20" fill="none">
              <path
                d="M20 2H4C2.9 2 2 2.9 2 4V14C2 15.1 2.9 16 4 16H18L22 20V4C22 2.9 21.1 2 20 2Z"
                stroke="#1273c4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {targetLabel ? (
            <div
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#101113",
                lineHeight: "1.3",
                letterSpacing: "-0.3px",
              }}
            >
              {targetLabel}
            </div>
          ) : (
            <div
              style={{
                width: "60px",
                height: "6px",
                backgroundColor: "#d5d2cc",
                borderRadius: "3px",
              }}
            />
          )}

          {actionBadge ? (
            <div
              style={{
                alignSelf: "flex-start",
                backgroundColor: "#1273c4",
                borderRadius: "6px",
                padding: "3px 8px",
                transform: `scale(${badgeScale})`,
                transformOrigin: "left center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {actionBadge}
              </span>
            </div>
          ) : (
            <div
              style={{
                width: "40px",
                height: "4px",
                backgroundColor: "#e8f2fb",
                borderRadius: "2px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
