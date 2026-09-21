// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  matcherLabel?: string;
  toolLabel?: string;
  scriptLabel?: string;
}

export const HookMatcherBinding: React.FC<Props> = ({
  delay = 0,
  budget,
  matcherLabel = "",
  toolLabel = "",
  scriptLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 지속적인 부유 모션
  const floatY = Math.sin(f * 0.08) * 3;

  // 인트로 등장 모션
  const introScale = interpolate(f, [0, 24], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const introOpacity = interpolate(f, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // matcher 연결선 전개 애니메이션
  const wireProgress = interpolate(f, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 스크립트 바인딩 활성화 포커스 팝
  const scriptScale = interpolate(f, [45, 58, 70], [1, 1.1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: 480,
        height: 320,
        backgroundColor: "#f0efec",
        border: "3px solid #d5d2cc",
        borderRadius: 18,
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 32px",
        transform: `translateY(${floatY}px) scale(${introScale})`,
        opacity: introOpacity,
      }}
    >
      {/* 상단: 도구 필터링 기준을 정하는 matcher 키 */}
      <div
        style={{
          width: 170,
          height: 52,
          backgroundColor: "#ffffff",
          border: "3px solid #1273c4",
          borderRadius: 14,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "0 14px",
          zIndex: 4,
        }}
      >
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 6h16M7 12h10M10 18h4"
            stroke="#1273c4"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
        {matcherLabel ? (
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#1273c4",
              fontFamily: 'Pretendard, "Spoqa Han Sans Neo", sans-serif',
              lineHeight: 1,
            }}
          >
            {matcherLabel}
          </span>
        ) : null}
      </div>

      {/* 중단: 대상 도구 매칭 태그 */}
      <div
        style={{
          width: 150,
          height: 48,
          backgroundColor: "#e8f2fb",
          border: "3px solid #1273c4",
          borderRadius: 12,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "0 12px",
          zIndex: 4,
        }}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <path
            d="M6 8l4 4-4 4M12 16h6"
            stroke="#1273c4"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {toolLabel ? (
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#1273c4",
              fontFamily: 'Pretendard, "Spoqa Han Sans Neo", sans-serif',
              lineHeight: 1,
            }}
          >
            {toolLabel}
          </span>
        ) : null}
      </div>

      {/* 하단: 매칭 시 실행될 스크립트 파일 */}
      <div
        style={{
          width: 170,
          height: 54,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          borderRadius: 14,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "0 14px",
          transform: `scale(${scriptScale})`,
          zIndex: 4,
        }}
      >
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <path
            d="M6 3h8l5 5v13H6V3z"
            stroke="#43474b"
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <path d="M14 3v5h5" stroke="#43474b" strokeWidth={3} />
        </svg>
        {scriptLabel ? (
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#101113",
              fontFamily: 'Pretendard, "Spoqa Han Sans Neo", sans-serif',
              lineHeight: 1,
            }}
          >
            {scriptLabel}
          </span>
        ) : null}
      </div>

      {/* 계층 바인딩 연결 라인 */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 480,
          height: 320,
          pointerEvents: "none",
        }}
      >
        <line
          x1={240}
          y1={76}
          x2={240}
          y2={136}
          stroke="#1273c4"
          strokeWidth={4}
          strokeDasharray="60"
          strokeDashoffset={60 * (1 - wireProgress)}
        />
        <line
          x1={240}
          y1={184}
          x2={240}
          y2={242}
          stroke="#1273c4"
          strokeWidth={4}
          strokeDasharray="60"
          strokeDashoffset={60 * (1 - wireProgress)}
        />
      </svg>
    </div>
  );
};
