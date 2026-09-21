// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const canvas = { w: 580, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  headerText?: string;
  modeBoth?: string;
  modeChat?: string;
  descChat?: string;
  modeFile?: string;
  descFile?: string;
}

export const RewindModeDiagram: React.FC<Props> = ({
  delay = 0,
  budget = 810,
  headerText = "",
  modeBoth = "",
  modeChat = "",
  descChat = "",
  modeFile = "",
  descFile = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  const floatY = Math.sin(frame * 0.06) * 2.5;

  const headerY = interpolate(frame, [0, 24], [-10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const f1 = interpolate(
    frame,
    [0, 30, 45, 320, 340],
    [0, 0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const f2a = interpolate(
    frame,
    [330, 345, 450, 470],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const f2b = interpolate(
    frame,
    [550, 565, 650, 670],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const f2 = Math.min(1, f2a + f2b);

  const f3a = interpolate(
    frame,
    [460, 475, 540, 560],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const f3b = interpolate(
    frame,
    [660, 675, 800, 810],
    [0, 1, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const f3 = Math.min(1, f3a + f3b);

  const s1 = interpolate(f1, [0, 1], [1, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s2 = interpolate(f2, [0, 1], [1, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s3 = interpolate(f3, [0, 1], [1, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const otherFocus1 = Math.max(f2, f3);
  const op1 = interpolate(otherFocus1, [0, 1], [1, 0.75], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const otherFocus2 = Math.max(f1, f3);
  const op2 = interpolate(otherFocus2, [0, 1], [1, 0.75], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const otherFocus3 = Math.max(f1, f2);
  const op3 = interpolate(otherFocus3, [0, 1], [1, 0.75], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0efec",
        position: "relative",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          transform: `translateY(${headerY}px)`,
          opacity: headerOpacity,
          display: Boolean(headerText) ? "inline-flex" : "none",
          alignItems: "center",
          paddingLeft: 14,
          paddingRight: 14,
          paddingTop: 6,
          paddingBottom: 6,
          backgroundColor: "#e8f2fb",
          border: "2px solid #1273c4",
          borderRadius: 8,
          marginBottom: 18,
        }}
      >
        <span
          style={{
            fontFamily: "Pretendard, sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#1273c4",
          }}
        >{headerText}</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${floatY}px)`,
        }}
      >
        <div
          style={{
            width: 164,
            height: 236,
            borderRadius: 16,
            backgroundColor: "#ffffff",
            borderWidth: 3,
            borderStyle: "solid",
            borderColor: f1 === 1 ? "#1273c4" : "#d5d2cc",
            boxShadow: f1 === 1 ? "0 8px 24px rgba(18, 115, 196, 0.15)" : "0 4px 12px rgba(16, 17, 19, 0.04)",
            transform: `scale(${s1})`,
            opacity: op1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 16,
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              backgroundColor: f1 === 1 ? "#e8f2fb" : "#f0efec",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path
                d="M5 6 C5 4.9 5.9 4 7 4 H18 L25 11 V26 C25 27.1 24.1 28 23 28 H7 C5.9 28 5 27.1 5 26 Z"
                fill="#ffffff"
                stroke="#101113"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 18 A7 7 0 1 1 20 22"
                fill="none"
                stroke="#1273c4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M7 18 L10 14 M7 18 L11 20"
                fill="none"
                stroke="#1273c4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: f1 === 1 ? "#1273c4" : "#d5d2cc",
              marginBottom: 10,
            }}
          />

          <span
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#101113",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >{modeBoth}</span>
        </div>

        <div
          style={{
            width: 164,
            height: 236,
            borderRadius: 16,
            backgroundColor: "#ffffff",
            borderWidth: 3,
            borderStyle: "solid",
            borderColor: f2 === 1 ? "#1273c4" : "#d5d2cc",
            boxShadow: f2 === 1 ? "0 8px 24px rgba(18, 115, 196, 0.15)" : "0 4px 12px rgba(16, 17, 19, 0.04)",
            transform: `scale(${s2})`,
            opacity: op2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 16,
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              backgroundColor: f2 === 1 ? "#e8f2fb" : "#f0efec",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path
                d="M6 7 H24 C25.7 7 27 8.3 27 10 V19 C27 20.7 25.7 22 24 22 H12 L7 26 V22 H6 C4.3 22 3 20.7 3 10 C3 8.3 4.3 7 6 7 Z"
                fill="#ffffff"
                stroke="#101113"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 14 A5 5 0 1 1 18 17"
                fill="none"
                stroke="#1273c4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M7 14 L10 11 M7 14 L11 16"
                fill="none"
                stroke="#1273c4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: f2 === 1 ? "#1273c4" : "#d5d2cc",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: f2 === 1 ? "#1273c4" : "#d5d2cc",
              }}
            />
          </div>

          <span
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#101113",
              textAlign: "center",
              lineHeight: 1.3,
              marginBottom: 8,
            }}
          >{modeChat}</span>

          <span
            style={{
              display: Boolean(descChat) ? "inline" : "none",
              fontFamily: "'Spoqa Han Sans Neo', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#43474b",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >{descChat}</span>
        </div>

        <div
          style={{
            width: 164,
            height: 236,
            borderRadius: 16,
            backgroundColor: "#ffffff",
            borderWidth: 3,
            borderStyle: "solid",
            borderColor: f3 === 1 ? "#1273c4" : "#d5d2cc",
            boxShadow: f3 === 1 ? "0 8px 24px rgba(18, 115, 196, 0.15)" : "0 4px 12px rgba(16, 17, 19, 0.04)",
            transform: `scale(${s3})`,
            opacity: op3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 16,
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              backgroundColor: f3 === 1 ? "#e8f2fb" : "#f0efec",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path
                d="M7 4 H21 L27 10 V28 C27 29.1 26.1 30 25 30 H7 C5.9 30 5 29.1 5 28 V6 C5 4.9 5.9 4 7 4 Z"
                fill="#ffffff"
                stroke="#101113"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 16 H21 M11 22 H17"
                stroke="#7c8288"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: f3 === 1 ? "#1273c4" : "#d5d2cc",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: f3 === 1 ? "#1273c4" : "#d5d2cc",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: f3 === 1 ? "#1273c4" : "#d5d2cc",
              }}
            />
          </div>

          <span
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#101113",
              textAlign: "center",
              lineHeight: 1.3,
              marginBottom: 8,
            }}
          >{modeFile}</span>

          <span
            style={{
              display: Boolean(descFile) ? "inline" : "none",
              fontFamily: "'Spoqa Han Sans Neo', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#43474b",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >{descFile}</span>
        </div>
      </div>
    </div>
  );
};
