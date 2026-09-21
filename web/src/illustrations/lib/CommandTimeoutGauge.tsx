// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  title?: string;
  limitLabel?: string;
  statusLabel?: string;
}

export const canvas = { w: 420, h: 320 };

export const CommandTimeoutGauge: React.FC<Props> = ({
  delay = 0,
  budget = 720,
  title = "",
  limitLabel = "",
  statusLabel = "",
}) => {
  const frame = useCurrentFrame();
  const rel = Math.max(0, frame - (delay ?? 0));

  const breath = Math.sin(frame * 0.06) * 2;
  const pulse = 1 + Math.sin(frame * 0.09) * 0.03;

  const entry = interpolate(rel, [0, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const gaugeFill = interpolate(rel, [15, 240], [0, 0.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const overflowFill = interpolate(rel, [340, 420], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const totalFill = gaugeFill + overflowFill;
  const currentAngle = 150 + totalFill * 240;
  const angleRad = (currentAngle * Math.PI) / 180;

  const centerX = 210;
  const centerY = 145;
  const needleLength = 46;
  const tipX = centerX + Math.cos(angleRad) * needleLength;
  const tipY = centerY + Math.sin(angleRad) * needleLength;
  const backX = centerX - Math.cos(angleRad) * 12;
  const backY = centerY - Math.sin(angleRad) * 12;

  const limitAngleRad = (330 * Math.PI) / 180;
  const limitInnerX = centerX + Math.cos(limitAngleRad) * 52;
  const limitInnerY = centerY + Math.sin(limitAngleRad) * 52;
  const limitOuterX = centerX + Math.cos(limitAngleRad) * 78;
  const limitOuterY = centerY + Math.sin(limitAngleRad) * 78;

  const focusScale = interpolate(rel, [240, 275, 360, 395], [1, 1.12, 1.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const isAtThreshold = rel >= 240;
  const isTransferred = rel >= 430;
  const thresholdPulse = isAtThreshold ? 1 + Math.sin((rel - 240) * 0.14) * 0.06 : 1;

  const transferProgress = interpolate(rel, [410, 460], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const transferY = interpolate(transferProgress, [0, 1], [0, 6]);

  const totalArcLength = 268.08;
  const filledArcLength = totalFill * totalArcLength;

  return (
    <div
      style={{
        width: 420,
        height: 320,
        backgroundColor: "#ffffff",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        transform: `translateY(${breath}px) scale(${entry})`,
        transformOrigin: "center center",
      }}
    >
      {title ? (
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              borderRadius: 14,
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#1273c4",
              }}
            />
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#1273c4",
                letterSpacing: -0.2,
              }}
            >
              {title}
            </span>
          </div>
        </div>
      ) : null}

      <svg
        width={420}
        height={320}
        viewBox="0 0 420 320"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: `scale(${focusScale})`,
          transformOrigin: "210px 145px",
        }}
      >
        <circle
          cx={centerX}
          cy={centerY}
          r={64}
          fill="none"
          stroke="#f0efec"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={`${totalArcLength} 200`}
          strokeDashoffset={0}
          transform={`rotate(150 ${centerX} ${centerY})`}
        />

        <circle
          cx={centerX}
          cy={centerY}
          r={64}
          fill="none"
          stroke="#1273c4"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={`${filledArcLength} 500`}
          strokeDashoffset={0}
          transform={`rotate(150 ${centerX} ${centerY})`}
        />

        <line
          x1={limitInnerX}
          y1={limitInnerY}
          x2={limitOuterX}
          y2={limitOuterY}
          stroke="#1273c4"
          strokeWidth={3.5}
          strokeLinecap="round"
        />

        <circle
          cx={limitOuterX}
          cy={limitOuterY}
          r={5 * thresholdPulse}
          fill="#1273c4"
        />

        <line
          x1={backX}
          y1={backY}
          x2={tipX}
          y2={tipY}
          stroke="#1273c4"
          strokeWidth={3.5}
          strokeLinecap="round"
        />

        <circle
          cx={centerX}
          cy={centerY}
          r={7}
          fill="#ffffff"
          stroke="#1273c4"
          strokeWidth={3}
        />
      </svg>

      {limitLabel ? (
        <div
          style={{
            position: "absolute",
            left: 272,
            top: 72,
            transform: `scale(${thresholdPulse * focusScale})`,
            transformOrigin: "left center",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 10px",
            borderRadius: 8,
            backgroundColor: isAtThreshold ? "#1273c4" : "#ffffff",
            border: "2px solid #1273c4",
          }}
        >
          <span
            style={{
              fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: isAtThreshold ? "#ffffff" : "#1273c4",
              letterSpacing: -0.2,
            }}
          >
            {limitLabel}
          </span>
        </div>
      ) : null}

      {statusLabel ? (
        <div
          style={{
            position: "absolute",
            bottom: 22,
            left: 36,
            right: 36,
            height: 52,
            borderRadius: 12,
            backgroundColor: isTransferred ? "#e8f2fb" : "#f0efec",
            border: `2px solid ${isTransferred ? "#1273c4" : "#d5d2cc"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 18px",
            transform: `translateY(${transferY}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: isTransferred ? "#43474b" : "#1273c4",
                transform: `scale(${isTransferred ? 1 : pulse})`,
              }}
            />
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#101113",
                letterSpacing: -0.2,
              }}
            >
              {statusLabel}
            </span>
          </div>
          <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
            {isTransferred ? (
              <path
                d="M4 11h14M12 5l6 6-6 6"
                stroke="#1273c4"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <circle
                cx={11}
                cy={11}
                r={7}
                stroke="#1273c4"
                strokeWidth={2.5}
                strokeDasharray="14 7"
              />
            )}
          </svg>
        </div>
      ) : null}
    </div>
  );
};
