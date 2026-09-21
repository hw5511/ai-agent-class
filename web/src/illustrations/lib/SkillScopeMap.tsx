// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  scopeText?: string;
  insightText?: string;
}

export const canvas = { w: 480, h: 360 };

export const SkillScopeMap: React.FC<Props> = ({
  delay = 0,
  budget = 300,
  scopeText = "",
  insightText = "",
}) => {
  const frame = useCurrentFrame();
  const rel = frame - delay;

  // 지속적인 미세 부유 모션 (쉬지 않는 안무)
  const floatY = Math.sin(rel * 0.05) * 4;
  const floatX = Math.cos(rel * 0.035) * 2.5;

  // 1. 중앙 스킬 코어 등장 (첫 움직임 0~25f < 45f 보장)
  const coreScale = interpolate(rel, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  // 2. 스킬 가능성 레이더 파동 확산
  const radarWave = (rel % 80) / 80;
  const waveRadius = interpolate(radarWave, [0, 1], [34, 138], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const waveOpacity = interpolate(radarWave, [0, 0.25, 0.85, 1], [0, 0.65, 0.2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. 작업 노드로 뻗어나가는 벡터 연결선 전개
  const lineProgress = interpolate(rel, [18, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // 4. 주변 가능성 작업 노드 순차 팝업 (staggered)
  const nodeScaleA = interpolate(rel, [32, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const nodeScaleB = interpolate(rel, [42, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const nodeScaleC = interpolate(rel, [52, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  // 5. 상단 설명 배지 팝업
  const badgeScale = interpolate(rel, [20, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  // 6. 하단 인사이트 카드 등장 & 줌인 포커스 안무 (설명 의도: 가능성의 확인)
  const insightOpacity = interpolate(rel, [80, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const insightY = interpolate(rel, [80, 105], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 7. 설명 포커스 팝 (전체 범위 인지 시점 1.12배 확대)
  const focusZoom = interpolate(rel, [110, 140, 170], [1, 1.12, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

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
        userSelect: "none",
        transform: `translate(${floatX}px, ${floatY}px) scale(${focusZoom})`,
        transformOrigin: "center center",
      }}
    >
      {/* 상단 범위 강조 배지 */}
      {scopeText && (
        <div
          style={{
            position: "absolute",
            top: 14,
            transform: `scale(${badgeScale})`,
            transformOrigin: "center center",
            backgroundColor: "#e8f2fb",
            border: "3px solid #1273c4",
            borderRadius: 18,
            padding: "6px 18px",
            boxShadow: "0 4px 14px rgba(18, 115, 196, 0.12)",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "Pretendard, -apple-system, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#1273c4",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {scopeText}
          </span>
        </div>
      )}

      {/* 중앙 다이어그램 영역 */}
      <div
        style={{
          width: 440,
          height: 240,
          position: "relative",
          marginTop: scopeText ? 24 : 0,
        }}
      >
        {/* 방사형 벡터 연결선 및 레이더 링 (SVG) */}
        <svg
          viewBox="0 0 440 240"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* 레이더 스캔 파동 */}
          <circle
            cx="220"
            cy="115"
            r={waveRadius}
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth="3"
            opacity={waveOpacity}
          />

          {/* 중앙 코어 -> 노드 A (좌상단 90, 55) */}
          <path
            d="M 220 115 L 90 55"
            stroke="#d5d2cc"
            strokeWidth="3.5"
            strokeDasharray="6 6"
            fill="none"
          />
          <path
            d="M 220 115 L 90 55"
            stroke="#1273c4"
            strokeWidth="3.5"
            strokeDasharray="160"
            strokeDashoffset={160 * (1 - lineProgress)}
            fill="none"
          />

          {/* 중앙 코어 -> 노드 B (우상단 350, 55) */}
          <path
            d="M 220 115 L 350 55"
            stroke="#d5d2cc"
            strokeWidth="3.5"
            strokeDasharray="6 6"
            fill="none"
          />
          <path
            d="M 220 115 L 350 55"
            stroke="#1273c4"
            strokeWidth="3.5"
            strokeDasharray="160"
            strokeDashoffset={160 * (1 - lineProgress)}
            fill="none"
          />

          {/* 중앙 코어 -> 노드 C (하단 220, 195) */}
          <path
            d="M 220 115 L 220 195"
            stroke="#d5d2cc"
            strokeWidth="3.5"
            strokeDasharray="6 6"
            fill="none"
          />
          <path
            d="M 220 115 L 220 195"
            stroke="#1273c4"
            strokeWidth="3.5"
            strokeDasharray="100"
            strokeDashoffset={100 * (1 - lineProgress)}
            fill="none"
          />
        </svg>

        {/* 노드 A: 기획/분석 작업 상징 카드 */}
        <div
          style={{
            position: "absolute",
            left: 50,
            top: 25,
            width: 76,
            height: 60,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            borderRadius: 14,
            boxShadow: "0 6px 14px rgba(16, 17, 19, 0.05)",
            transform: `scale(${nodeScaleA})`,
            transformOrigin: "center center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <div style={{ width: 44, height: 6, backgroundColor: "#1273c4", borderRadius: 3 }} />
          <div style={{ width: 34, height: 5, backgroundColor: "#d5d2cc", borderRadius: 3 }} />
          <div style={{ width: 26, height: 5, backgroundColor: "#e8f2fb", borderRadius: 3 }} />
        </div>

        {/* 노드 B: 데이터 가공/변환 작업 상징 카드 */}
        <div
          style={{
            position: "absolute",
            left: 314,
            top: 25,
            width: 76,
            height: 60,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            borderRadius: 14,
            boxShadow: "0 6px 14px rgba(16, 17, 19, 0.05)",
            transform: `scale(${nodeScaleB})`,
            transformOrigin: "center center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <div style={{ width: 10, height: 32, backgroundColor: "#e8f2fb", borderRadius: 4, border: "2px solid #1273c4" }} />
          <div style={{ width: 10, height: 22, backgroundColor: "#ffffff", borderRadius: 4, border: "2px solid #d5d2cc" }} />
          <div style={{ width: 10, height: 38, backgroundColor: "#ffffff", borderRadius: 4, border: "2px solid #1273c4" }} />
        </div>

        {/* 노드 C: 산출물 제작/완성 작업 상징 카드 */}
        <div
          style={{
            position: "absolute",
            left: 182,
            top: 170,
            width: 76,
            height: 52,
            backgroundColor: "#ffffff",
            border: "3px solid #1273c4",
            borderRadius: 14,
            boxShadow: "0 6px 14px rgba(18, 115, 196, 0.1)",
            transform: `scale(${nodeScaleC})`,
            transformOrigin: "center center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect x="4" y="4" width="22" height="22" rx="6" fill="#e8f2fb" stroke="#1273c4" strokeWidth="2.5" />
            <path d="M9 15 L13 19 L21 10" stroke="#1273c4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* 중앙 스킬 허브 코어 (모든 작업의 중심축) */}
        <div
          style={{
            position: "absolute",
            left: 188,
            top: 83,
            width: 64,
            height: 64,
            backgroundColor: "#ffffff",
            border: "4px solid #1273c4",
            borderRadius: 22,
            boxShadow: "0 8px 24px rgba(18, 115, 196, 0.16)",
            transform: `scale(${coreScale})`,
            transformOrigin: "center center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          {/* 스킬 코어 엠블럼 */}
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="12" fill="#e8f2fb" />
            <circle cx="17" cy="17" r="6" fill="#1273c4" />
            <line x1="17" y1="2" x2="17" y2="7" stroke="#1273c4" strokeWidth="3" strokeLinecap="round" />
            <line x1="17" y1="27" x2="17" y2="32" stroke="#1273c4" strokeWidth="3" strokeLinecap="round" />
            <line x1="2" y1="17" x2="7" y2="17" stroke="#1273c4" strokeWidth="3" strokeLinecap="round" />
            <line x1="27" y1="17" x2="32" y2="17" stroke="#1273c4" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 하단 인사이트 강조 카드 */}
      {insightText && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            opacity: insightOpacity,
            transform: `translateY(${insightY}px)`,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            borderRadius: 14,
            padding: "8px 22px",
            boxShadow: "0 6px 18px rgba(16, 17, 19, 0.06)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              backgroundColor: "#1273c4",
            }}
          />
          <span
            style={{
              fontFamily: "Spoqa Han Sans Neo, -apple-system, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#101113",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {insightText}
          </span>
        </div>
      )}
    </div>
  );
};
