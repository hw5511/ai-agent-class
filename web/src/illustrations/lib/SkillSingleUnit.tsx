// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  title?: string;
  fileLabel?: string;
  featureLabel?: string;
}

export const canvas = { w: 440, h: 380 };

export const SkillSingleUnit: React.FC<Props> = ({
  delay = 0,
  budget,
  title = "",
  fileLabel = "",
  featureLabel = "",
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delay);

  const floatY = Math.sin(localFrame * 0.05) * 3;
  const breathe = 1 + Math.sin(localFrame * 0.035) * 0.008;

  const introProgress = interpolate(localFrame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const introScale = interpolate(localFrame, [0, 25], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const fileTranslateX = interpolate(localFrame, [10, 35], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });
  const fileOpacity = interpolate(localFrame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const linkProgress = interpolate(localFrame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const featureScale = interpolate(localFrame, [45, 65, 75], [0.6, 1.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const featureOpacity = interpolate(localFrame, [45, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulsePhase = (localFrame % 60) / 60;
  const pulseX = interpolate(pulsePhase, [0, 1], [0, 52], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        border: "3px solid #d5d2cc",
        borderRadius: 18,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        transform: `translateY(${floatY}px) scale(${introScale * breathe})`,
        opacity: introProgress,
      }}
    >
      <div
        style={{
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {title ? (
          <div
            style={{
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
              color: "#1273c4",
              borderRadius: 12,
              padding: "4px 14px",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "Pretendard, -apple-system, sans-serif",
            }}
          >
            {title}
          </div>
        ) : null}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 140,
            height: 190,
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            border: "3px solid #101113",
            borderRadius: 14,
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            transform: `translateX(${fileTranslateX}px)`,
            opacity: fileOpacity,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -3,
              right: -3,
              width: 24,
              height: 24,
              borderBottom: "3px solid #101113",
              borderLeft: "3px solid #101113",
              backgroundColor: "#f0efec",
              borderTopRightRadius: 11,
              borderBottomLeftRadius: 6,
            }}
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginTop: 18,
            }}
          >
            <div
              style={{
                width: 50,
                height: 4,
                backgroundColor: "#1273c4",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: "80%",
                height: 4,
                backgroundColor: "#d5d2cc",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: "60%",
                height: 4,
                backgroundColor: "#d5d2cc",
                borderRadius: 2,
              }}
            />
          </div>

          {fileLabel ? (
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
                fontFamily: "Pretendard, -apple-system, sans-serif",
                textAlign: "center",
                backgroundColor: "#f0efec",
                padding: "6px 10px",
                borderRadius: 8,
                width: "90%",
                boxSizing: "border-box",
              }}
            >
              {fileLabel}
            </div>
          ) : (
            <div style={{ height: 28 }} />
          )}
        </div>

        <div
          style={{
            width: 60,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 56,
              height: 4,
              backgroundColor: "#d5d2cc",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${linkProgress * 100}%`,
                height: "100%",
                backgroundColor: "#101113",
              }}
            />
          </div>

          {linkProgress >= 1 ? (
            <div
              style={{
                position: "absolute",
                left: 2 + pulseX,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#1273c4",
                transform: "translateY(-50%)",
                top: "50%",
              }}
            />
          ) : null}
        </div>

        <div
          style={{
            width: 140,
            height: 190,
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            border: "3px solid #101113",
            borderRadius: 14,
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            transform: `scale(${featureScale})`,
            opacity: featureOpacity,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              backgroundColor: "#e8f2fb",
              border: "3px solid #1273c4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                fill="#1273c4"
                stroke="#1273c4"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {featureLabel ? (
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1273c4",
                fontFamily: "Pretendard, -apple-system, sans-serif",
                textAlign: "center",
                backgroundColor: "#e8f2fb",
                padding: "6px 10px",
                borderRadius: 8,
                width: "90%",
                boxSizing: "border-box",
              }}
            >
              {featureLabel}
            </div>
          ) : (
            <div style={{ height: 28 }} />
          )}
        </div>
      </div>

      <div
        style={{
          width: 60,
          height: 3,
          backgroundColor: "#d5d2cc",
          borderRadius: 2,
        }}
      />
    </div>
  );
};
