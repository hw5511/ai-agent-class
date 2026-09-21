// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing, interpolateColors } from "remotion";

export const canvas = { w: 560, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  fileLabel?: string;
  toolReadText?: string;
  toolEditText?: string;
  updateBadgeText?: string;
}

export const SkillRefinePipeline: React.FC<Props> = ({
  delay = 0,
  budget = 750,
  fileLabel = "",
  toolReadText = "",
  toolEditText = "",
  updateBadgeText = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  // 상시 미세 부유 모션 (쉬지 않는 생명력)
  const breathing = Math.sin(frame * 0.06) * 3;
  const pulseScale = 1 + Math.sin(frame * 0.08) * 0.015;

  // 인트로 페이드/엔터 (45프레임 이내 개시)
  const enterProgress = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 1단계: 읽기 도구 실행 포커스 (30~110프레임)
  const tool1Active = interpolate(frame, [30, 48, 100, 118], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const tool1Scale = interpolate(tool1Active, [0, 1], [1, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tool1Border = interpolateColors(tool1Active, [0, 1], ["#d5d2cc", "#1273c4"]);
  const tool1Bg = interpolateColors(tool1Active, [0, 1], ["#ffffff", "#e8f2fb"]);

  // 2단계: 고치기 도구 실행 포커스 (118~195프레임)
  const tool2Active = interpolate(frame, [118, 136, 182, 198], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const tool2Scale = interpolate(tool2Active, [0, 1], [1, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tool2Border = interpolateColors(tool2Active, [0, 1], ["#d5d2cc", "#1273c4"]);
  const tool2Bg = interpolateColors(tool2Active, [0, 1], ["#ffffff", "#e8f2fb"]);

  // 3단계: 파일 갱신 완료 강조 (198~280프레임)
  const updateActive = interpolate(frame, [198, 220, 270, 290], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const docUpdatedScale = interpolate(updateActive, [0, 1], [1, 1.14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 파이프라인 이동 점 좌표 진행률
  const flowProgress = (frame * 0.015) % 1;

  // 비포커스 요소 딤 처리 (0.72 하한 준수)
  const isAnyToolActive = Math.max(tool1Active, tool2Active, updateActive);
  const baseDimOpacity = interpolate(isAnyToolActive, [0, 1], [1, 0.78], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 560,
        height: 320,
        backgroundColor: "#f0efec",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 28px",
        opacity: enterProgress,
        transform: `translateY(${breathing}px) scale(${pulseScale})`,
      }}
    >
      {/* 상단: 흐름 연결 파이프라인 라인 (SVG) */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 560,
          height: 320,
          pointerEvents: "none",
        }}
      >
        <path
          d="M 120 136 L 205 136 M 315 136 L 400 136"
          stroke="#d5d2cc"
          strokeWidth="3"
          strokeDasharray="6 4"
          fill="none"
        />
        {/* 파이프라인 내 진행 입자 */}
        <circle
          cx={120 + flowProgress * 280}
          cy={136}
          r={4}
          fill="#1273c4"
        />
      </svg>

      {/* 메인 작업 영역: 파일 원본 -> 도구 1(읽기) -> 도구 2(수정) -> 갱신 파일 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* 좌측: 원본 스킬 파일 */}
        <div
          style={{
            width: 104,
            height: 132,
            backgroundColor: "#ffffff",
            borderRadius: 14,
            border: "3px solid #d5d2cc",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 8px",
            opacity: baseDimOpacity,
          }}
        >
          {/* 파일 아이콘 조형 */}
          <div
            style={{
              width: 44,
              height: 52,
              borderRadius: 6,
              border: "3px solid #43474b",
              backgroundColor: "#f0efec",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 4,
              padding: "0 6px",
              boxSizing: "border-box",
              marginBottom: 8,
            }}
          >
            <div style={{ width: "100%", height: 3, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
            <div style={{ width: "70%", height: 3, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
            <div style={{ width: "85%", height: 3, backgroundColor: "#1273c4", borderRadius: 2 }} />
          </div>

          {fileLabel ? (
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#101113",
                textAlign: "center",
                wordBreak: "keep-all",
              }}
            >
              {fileLabel}
            </span>
          ) : null}
        </div>

        {/* 중앙: 도구 실행 시퀀스 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: 176,
          }}
        >
          {/* 도구 1: 읽기 도구 */}
          <div
            style={{
              backgroundColor: tool1Bg,
              border: `3px solid ${tool1Border}`,
              borderRadius: 12,
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transform: `scale(${tool1Scale})`,
              transition: "transform 0.2s ease-out",
              boxSizing: "border-box",
              opacity: tool1Active > 0 ? 1 : baseDimOpacity,
            }}
          >
            {/* 돋보기/탐색 벡터 심볼 */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="10" cy="10" r="6" stroke={tool1Active > 0 ? "#1273c4" : "#43474b"} strokeWidth="3" />
              <line x1="14.5" y1="14.5" x2="20" y2="20" stroke={tool1Active > 0 ? "#1273c4" : "#43474b"} strokeWidth="3" strokeLinecap="round" />
            </svg>
            {toolReadText ? (
              <span
                style={{
                  fontFamily: "Spoqa Han Sans Neo, sans-serif",
                  fontSize: 13,
                  fontWeight: tool1Active > 0 ? 700 : 500,
                  color: tool1Active > 0 ? "#1273c4" : "#101113",
                }}
              >
                {toolReadText}
              </span>
            ) : null}
          </div>

          {/* 도구 2: 수정 도구 */}
          <div
            style={{
              backgroundColor: tool2Bg,
              border: `3px solid ${tool2Border}`,
              borderRadius: 12,
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transform: `scale(${tool2Scale})`,
              transition: "transform 0.2s ease-out",
              boxSizing: "border-box",
              opacity: tool2Active > 0 ? 1 : baseDimOpacity,
            }}
          >
            {/* 연필/수정 벡터 심볼 */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 20L8 19L19 8L15 4L4 15L4 20Z"
                stroke={tool2Active > 0 ? "#1273c4" : "#43474b"}
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </svg>
            {toolEditText ? (
              <span
                style={{
                  fontFamily: "Spoqa Han Sans Neo, sans-serif",
                  fontSize: 13,
                  fontWeight: tool2Active > 0 ? 700 : 500,
                  color: tool2Active > 0 ? "#1273c4" : "#101113",
                }}
              >
                {toolEditText}
              </span>
            ) : null}
          </div>
        </div>

        {/* 우측: 업데이트 완료된 스킬 파일 */}
        <div
          style={{
            width: 116,
            height: 142,
            backgroundColor: updateActive > 0 ? "#e8f2fb" : "#ffffff",
            borderRadius: 14,
            border: `3px solid ${updateActive > 0 ? "#1273c4" : "#d5d2cc"}`,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 8px",
            transform: `scale(${docUpdatedScale})`,
            transition: "transform 0.2s ease-out",
            position: "relative",
          }}
        >
          {/* 완료 체크 마크 뱃지 */}
          <div
            style={{
              width: 48,
              height: 56,
              borderRadius: 6,
              border: "3px solid #1273c4",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13L9 17L19 7"
                stroke="#1273c4"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {fileLabel ? (
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#1273c4",
                textAlign: "center",
              }}
            >
              {fileLabel}
            </span>
          ) : null}
        </div>
      </div>

      {/* 하단: 상태 완료 콜아웃 배지 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          backgroundColor: "#ffffff",
          border: "3px solid #1273c4",
          borderRadius: 14,
          padding: "8px 20px",
          alignSelf: "center",
          boxShadow: "0 4px 0 #d5d2cc",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#1273c4",
          }}
        />
        {updateBadgeText ? (
          <span
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#101113",
            }}
          >
            {updateBadgeText}
          </span>
        ) : null}
      </div>
    </div>
  );
};
