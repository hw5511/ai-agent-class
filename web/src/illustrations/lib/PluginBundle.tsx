// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import {
  useCurrentFrame,
  interpolate,
  Easing,
  interpolateColors,
} from "remotion";

export const canvas = { w: 520, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  categoryText?: string;
  badgeText?: string;
  toolItemText?: string;
  handItemText?: string;
  footerText?: string;
}

export const PluginBundle: React.FC<Props> = ({
  delay = 0,
  budget = 960,
  categoryText = "",
  badgeText = "",
  toolItemText = "",
  handItemText = "",
  footerText = "",
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - delay);
  const safeBudget = Math.max(budget, 120);

  // 상시 미세 호흡 모션 (정지 화면 방지)
  const breath = Math.sin(relFrame * 0.05) * 2.5;

  // 1. 등장 안무 (0~35f)
  const enterScale = interpolate(relFrame, [0, 30], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterOpacity = interpolate(relFrame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. 설명 포커스 타이밍 구간
  const tToolStart = safeBudget * 0.38;
  const tToolPeak = safeBudget * 0.48;
  const tToolEnd = safeBudget * 0.58;

  const tHandStart = safeBudget * 0.6;
  const tHandPeak = safeBudget * 0.7;
  const tHandEnd = safeBudget * 0.8;

  const tBundleStart = safeBudget * 0.84;
  const tBundlePeak = safeBudget * 0.92;
  const tBundleEnd = safeBudget * 0.98;

  // 3. 도구 모듈 포커스 줌 & 딤 안무
  const toolScale = interpolate(
    relFrame,
    [tToolStart, tToolPeak, tToolEnd],
    [1, 1.12, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const toolOpacity = interpolate(
    relFrame,
    [tHandStart, tHandPeak, tHandEnd],
    [1, 0.74, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  // 4. 손(브라우저) 모듈 포커스 줌 & 딤 안무
  const handScale = interpolate(
    relFrame,
    [tHandStart, tHandPeak, tHandEnd],
    [1, 1.12, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const handOpacity = interpolate(
    relFrame,
    [tToolStart, tToolPeak, tToolEnd],
    [1, 0.74, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  // 5. 전체 묶음(꾸러미) 밴드 조임 & 체결 버클 팝 안무
  const bandTighten = interpolate(
    relFrame,
    [tBundleStart, tBundlePeak, tBundleEnd],
    [0, 4, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const claspScale = interpolate(
    relFrame,
    [tBundleStart, tBundlePeak, tBundleEnd],
    [1, 1.2, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.8)),
    }
  );
  const claspColor = interpolateColors(
    relFrame,
    [tBundleStart, tBundlePeak, tBundleEnd],
    ["#1273c4", "#0f5e9e", "#1273c4"]
  );

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transform: `translateY(${breath}px) scale(${enterScale})`,
        opacity: enterOpacity,
        transformOrigin: "center center",
      }}
    >
      {/* 꾸러미 외곽 컨테이너 */}
      <div
        style={{
          width: 480,
          height: 326,
          backgroundColor: "#ffffff",
          borderRadius: 18,
          border: "3px solid #d5d2cc",
          boxShadow: "0 10px 28px rgba(16, 17, 19, 0.05)",
          display: "flex",
          flexDirection: "column",
          padding: "16px 20px 14px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* 상단 헤더 영역 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "#43474b",
              fontWeight: 500,
              fontFamily:
                '"Spoqa Han Sans Neo", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            {categoryText}
          </div>

          {badgeText && (
            <div
              style={{
                backgroundColor: "#e8f2fb",
                border: "2px solid #1273c4",
                borderRadius: 14,
                padding: "4px 12px",
                fontSize: 14,
                fontWeight: 700,
                color: "#1273c4",
                letterSpacing: "-0.2px",
              }}
            >
              {badgeText}
            </div>
          )}
        </div>

        {/* 중앙 모듈 배치 및 묶음 밴드 영역 */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 6px",
          }}
        >
          {/* 두 기능을 감싸 묶는 벡터 밴드 라인 */}
          <div
            style={{
              position: "absolute",
              top: 6 - bandTighten,
              left: 4 - bandTighten,
              right: 4 - bandTighten,
              bottom: 6 - bandTighten,
              borderRadius: 18,
              border: "3px dashed #1273c4",
              pointerEvents: "none",
              opacity: 0.85,
            }}
          />

          {/* 밴드 중앙 잠금 버클 (하나로 묶였음을 시각화) */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) scale(${claspScale})`,
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: claspColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
              boxShadow: "0 4px 12px rgba(18, 115, 196, 0.35)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 14l4-4"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M15 9l2-2a3 3 0 0 1 4 4l-2 2"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M9 15l-2 2a3 3 0 0 1-4-4l2-2"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 모듈 1: 도구 (스킬 제작) */}
          <div
            style={{
              width: 192,
              height: 174,
              backgroundColor: "#f0efec",
              borderRadius: 14,
              border: "2px solid #d5d2cc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 10px",
              boxSizing: "border-box",
              transform: `scale(${toolScale})`,
              opacity: toolOpacity,
              transformOrigin: "center center",
              transition: "transform 0.1s ease",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 12,
                backgroundColor: "#ffffff",
                border: "2px solid #d5d2cc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                <path
                  d="M28 8a6.5 6.5 0 0 0-6.2 4.8l-9.6 9.6a3.5 3.5 0 1 0 5 5l9.6-9.6A6.5 6.5 0 1 0 28 8z"
                  stroke="#1273c4"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23 13l4 4"
                  stroke="#43474b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="30" cy="11" r="1.5" fill="#1273c4" />
              </svg>
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
                textAlign: "center",
                lineHeight: 1.35,
                wordBreak: "keep-all",
              }}
            >
              {toolItemText}
            </div>
          </div>

          {/* 모듈 2: 손 (브라우저 조작) */}
          <div
            style={{
              width: 192,
              height: 174,
              backgroundColor: "#f0efec",
              borderRadius: 14,
              border: "2px solid #d5d2cc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 10px",
              boxSizing: "border-box",
              transform: `scale(${handScale})`,
              opacity: handOpacity,
              transformOrigin: "center center",
              transition: "transform 0.1s ease",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 12,
                backgroundColor: "#ffffff",
                border: "2px solid #d5d2cc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                <path
                  d="M18 10v11a2 2 0 0 1-4 0v-3a2 2 0 0 0-4 0v8c0 5.5 4.5 10 10 10s10-4.5 10-10V20a2 2 0 0 0-4 0v2a2 2 0 0 0-4 0v-2a2 2 0 0 0-4 0"
                  stroke="#1273c4"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="18" cy="7" r="1.5" fill="#1273c4" />
              </svg>
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
                textAlign: "center",
                lineHeight: 1.35,
                wordBreak: "keep-all",
              }}
            >
              {handItemText}
            </div>
          </div>
        </div>

        {/* 하단 요약 문구 */}
        <div
          style={{
            marginTop: 10,
            textAlign: "center",
            fontSize: 13,
            color: "#7c8288",
            fontFamily:
              '"Spoqa Han Sans Neo", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          {footerText}
        </div>
      </div>
    </div>
  );
};
