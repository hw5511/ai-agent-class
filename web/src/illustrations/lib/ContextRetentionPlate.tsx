// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  retainedTitle?: string;
  retainedStep1?: string;
  retainedStep2?: string;
  clearedSpaceText?: string;
}

export const canvas = { w: 500, h: 340 };

export const ContextRetentionPlate: React.FC<Props> = ({
  delay = 0,
  budget = 240,
  retainedTitle = "",
  retainedStep1 = "",
  retainedStep2 = "",
  clearedSpaceText = "",
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);

  // 1. 등장 모션 (0~30프레임)
  const enterProgress = interpolate(t, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterY = interpolate(enterProgress, [0, 1], [20, 0]);

  // 2. 지속적인 부유 호흡 모션
  const breathY = Math.sin((frame + 20) / 19) * 2.5;

  // 3. 영역 분할 수축 및 공간 확보 모션 (30~75프레임)
  const partitionProgress = interpolate(t, [30, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // 보존 영역의 너비가 압축되면서 우측 여유 공간이 넓어짐
  const retainedWidth = interpolate(partitionProgress, [0, 1], [428, 205]);

  // 4. 보존 항목 순차 표시 투명도
  const step1Opacity = interpolate(t, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const step2Opacity = interpolate(t, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5. 확보된 공간 텍스트 및 시각 요소 페이드인
  const clearedOpacity = interpolate(t, [75, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: canvas.w,
        height: canvas.h,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: enterProgress,
        transform: `translateY(${enterY + breathY}px)`,
      }}
    >
      {/* 전체 메인 플레이트 트레이 */}
      <div
        style={{
          position: "relative",
          width: 460,
          height: 250,
          borderRadius: 18,
          border: "3px solid #d5d2cc",
          backgroundColor: "#ffffff",
          padding: 16,
          boxSizing: "border-box",
          display: "flex",
          gap: 14,
          overflow: "hidden",
        }}
      >
        {/* 좌측: 보존되는 핵심 요약 영역 */}
        <div
          style={{
            width: retainedWidth,
            height: "100%",
            borderRadius: 14,
            border: "2.5px solid #1273c4",
            backgroundColor: "#ffffff",
            padding: "14px 12px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {retainedTitle ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 6,
                backgroundColor: "#e8f2fb",
                color: "#1273c4",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "Pretendard, sans-serif",
                letterSpacing: "-0.01em",
                alignSelf: "flex-start",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4" fill="#1273c4" />
              </svg>
              {retainedTitle}
            </div>
          ) : null}

          {retainedStep1 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                borderRadius: 8,
                backgroundColor: "#f0efec",
                fontSize: 13,
                fontWeight: 600,
                color: "#101113",
                fontFamily: "'Spoqa Han Sans Neo', sans-serif",
                opacity: step1Opacity,
                whiteSpace: "nowrap",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7.5L5.5 10.5L11.5 3.5"
                  stroke="#1273c4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {retainedStep1}
            </div>
          ) : null}

          {retainedStep2 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                borderRadius: 8,
                backgroundColor: "#f0efec",
                fontSize: 13,
                fontWeight: 600,
                color: "#101113",
                fontFamily: "'Spoqa Han Sans Neo', sans-serif",
                opacity: step2Opacity,
                whiteSpace: "nowrap",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                  stroke="#1273c4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {retainedStep2}
            </div>
          ) : null}
        </div>

        {/* 우측: 압축 후 확보된 넉넉한 여유 공간 */}
        <div
          style={{
            flex: 1,
            height: "100%",
            borderRadius: 14,
            border: "2px dashed #d5d2cc",
            backgroundColor: "#e8f2fb",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: 12,
            boxSizing: "border-box",
            opacity: clearedOpacity,
          }}
        >
          {/* 공간 확보 상징 아이콘 */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M6 18H30M18 6V30"
              stroke="#1273c4"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="18" cy="18" r="14" stroke="#1273c4" strokeWidth="2.5" strokeDasharray="4 4" />
          </svg>

          {clearedSpaceText ? (
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#1273c4",
                fontFamily: "Pretendard, sans-serif",
                textAlign: "center",
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
              }}
            >
              {clearedSpaceText}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
