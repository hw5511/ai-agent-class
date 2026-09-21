// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing, interpolateColors } from "remotion";

export const canvas = { w: 520, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  sourceTitle?: string;
  targetTitle?: string;
  transferText?: string;
  resultBadge?: string;
}

export const SkillPatternClone: React.FC<Props> = ({
  delay = 0,
  budget,
  sourceTitle = "",
  targetTitle = "",
  transferText = "",
  resultBadge = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 생명력 있는 미세 부유 모션 (양측 교차 위상)
  const leftFloatY = Math.sin(f * 0.05) * 3;
  const rightFloatY = Math.cos(f * 0.05) * 3;

  // 인트로 진입 모션 (30프레임 내 완료)
  const enterScale = interpolate(f, [0, 30], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterOpacity = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 구조 복제 전이 진행도 (90~240프레임 대역)
  const transferWave = interpolate(f, [90, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // 타겟 스킬 블록 순차 각인 (스탬프 효과)
  const stamp1 = interpolate(f, [140, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
  const stamp2 = interpolate(f, [195, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
  const stamp3 = interpolate(f, [250, 285], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  // 복제 완료 결과 배지 팝업 (310프레임 이후)
  const resultPop = interpolate(f, [310, 345], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  // 전이 펄스 입자 위치
  const particleOffset = (f * 3) % 90;

  // 우측 카드 테두리 전환 (점선 회색 -> 실선 파랑)
  const targetBorderColor = interpolateColors(resultPop, [0, 1], ["#d5d2cc", "#1273c4"]);

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        boxSizing: "border-box",
        overflow: "hidden",
        opacity: enterOpacity,
        transform: `scale(${enterScale})`,
      }}
    >
      {/* 좌측: 잘 만든 스킬 원본 카드 */}
      <div
        style={{
          width: 184,
          height: 270,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          borderRadius: 16,
          boxSizing: "border-box",
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          transform: `translateY(${leftFloatY}px)`,
        }}
      >
        {/* 상단 제목 바 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          {sourceTitle ? (
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
              }}
            >
              {sourceTitle}
            </span>
          ) : <span />}
          <div
            style={{
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
              borderRadius: 6,
              width: 14,
              height: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#1273c4" }} />
          </div>
        </div>

        {/* 원본 구조 레이아웃 블록들 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {/* 블록 1: 설명 영역 */}
          <div
            style={{
              height: 48,
              backgroundColor: "#f0efec",
              border: "2.5px solid #d5d2cc",
              borderRadius: 8,
              padding: "6px 8px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ height: 6, width: "85%", backgroundColor: "#1273c4", borderRadius: 3 }} />
            <div style={{ height: 6, width: "60%", backgroundColor: "#d5d2cc", borderRadius: 3 }} />
          </div>

          {/* 블록 2: 단계/순서 영역 */}
          <div
            style={{
              height: 72,
              backgroundColor: "#f0efec",
              border: "2.5px solid #d5d2cc",
              borderRadius: 8,
              padding: "6px 8px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#1273c4" }} />
              <div style={{ height: 6, width: "65%", backgroundColor: "#43474b", borderRadius: 3 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#1273c4" }} />
              <div style={{ height: 6, width: "75%", backgroundColor: "#43474b", borderRadius: 3 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#1273c4" }} />
              <div style={{ height: 6, width: "50%", backgroundColor: "#43474b", borderRadius: 3 }} />
            </div>
          </div>

          {/* 블록 3: 실행 영역 */}
          <div
            style={{
              height: 46,
              backgroundColor: "#f0efec",
              border: "2.5px solid #d5d2cc",
              borderRadius: 8,
              padding: "6px 8px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ height: 6, width: "90%", backgroundColor: "#43474b", borderRadius: 3 }} />
            <div style={{ height: 6, width: "45%", backgroundColor: "#d5d2cc", borderRadius: 3 }} />
          </div>
        </div>
      </div>

      {/* 중앙: 구조 복제 전이 안무 및 화살표 흐름 */}
      <div
        style={{
          width: 108,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          position: "relative",
        }}
      >
        {transferText ? (
          <div
            style={{
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
              borderRadius: 8,
              padding: "4px 8px",
              textAlign: "center",
              transform: `scale(${1 + Math.sin(f * 0.08) * 0.04})`,
            }}
          >
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#1273c4",
                whiteSpace: "nowrap",
              }}
            >
              {transferText}
            </span>
          </div>
        ) : null}

        {/* 전이 트랙 */}
        <div style={{ width: "100%", height: 32, position: "relative", display: "flex", alignItems: "center" }}>
          <svg width="108" height="32" viewBox="0 0 108 32" fill="none">
            <path
              d="M 6 16 L 96 16"
              stroke="#d5d2cc"
              strokeWidth="3"
              strokeDasharray="5 5"
            />
            <path
              d="M 6 16 L 96 16"
              stroke="#1273c4"
              strokeWidth="3"
              strokeDasharray="24 40"
              strokeDashoffset={-particleOffset}
            />
            <polygon
              points="94,10 104,16 94,22"
              fill="#1273c4"
            />
          </svg>
        </div>

        {/* 전이 중인 형태 힌트 펄스 */}
        <div
          style={{
            width: 32,
            height: 22,
            borderRadius: 6,
            border: "2px solid #1273c4",
            backgroundColor: "#e8f2fb",
            opacity: transferWave,
            transform: `scale(${0.8 + transferWave * 0.2})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 14, height: 4, borderRadius: 2, backgroundColor: "#1273c4" }} />
        </div>
      </div>

      {/* 우측: 내가 만들 때 (본떠서 각인되는 신규 카드) */}
      <div
        style={{
          width: 184,
          height: 270,
          backgroundColor: "#ffffff",
          border: `3px ${resultPop > 0.5 ? "solid" : "dashed"} ${targetBorderColor}`,
          borderRadius: 16,
          boxSizing: "border-box",
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          transform: `translateY(${rightFloatY}px)`,
          position: "relative",
        }}
      >
        {/* 상단 제목 바 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          {targetTitle ? (
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
              }}
            >
              {targetTitle}
            </span>
          ) : <span />}
          <div
            style={{
              backgroundColor: resultPop > 0.5 ? "#1273c4" : "#f0efec",
              border: `2px solid ${resultPop > 0.5 ? "#1273c4" : "#d5d2cc"}`,
              borderRadius: 6,
              width: 14,
              height: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: resultPop > 0.5 ? "#ffffff" : "#d5d2cc" }} />
          </div>
        </div>

        {/* 본떠서 순차 각인되는 구조 블록들 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {/* 블록 1: 각인되는 설명 영역 */}
          <div
            style={{
              height: 48,
              backgroundColor: stamp1 > 0 ? "#e8f2fb" : "transparent",
              border: `2.5px ${stamp1 > 0 ? "solid" : "dashed"} ${stamp1 > 0 ? "#1273c4" : "#d5d2cc"}`,
              borderRadius: 8,
              padding: "6px 8px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              opacity: stamp1,
              transform: `scale(${0.9 + stamp1 * 0.1})`,
            }}
          >
            <div style={{ height: 6, width: "85%", backgroundColor: "#1273c4", borderRadius: 3 }} />
            <div style={{ height: 6, width: "60%", backgroundColor: "#d5d2cc", borderRadius: 3 }} />
          </div>

          {/* 블록 2: 각인되는 단계 영역 */}
          <div
            style={{
              height: 72,
              backgroundColor: stamp2 > 0 ? "#e8f2fb" : "transparent",
              border: `2.5px ${stamp2 > 0 ? "solid" : "dashed"} ${stamp2 > 0 ? "#1273c4" : "#d5d2cc"}`,
              borderRadius: 8,
              padding: "6px 8px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              opacity: stamp2,
              transform: `scale(${0.9 + stamp2 * 0.1})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#1273c4" }} />
              <div style={{ height: 6, width: "65%", backgroundColor: "#43474b", borderRadius: 3 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#1273c4" }} />
              <div style={{ height: 6, width: "75%", backgroundColor: "#43474b", borderRadius: 3 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#1273c4" }} />
              <div style={{ height: 6, width: "50%", backgroundColor: "#43474b", borderRadius: 3 }} />
            </div>
          </div>

          {/* 블록 3: 각인되는 실행 영역 */}
          <div
            style={{
              height: 46,
              backgroundColor: stamp3 > 0 ? "#e8f2fb" : "transparent",
              border: `2.5px ${stamp3 > 0 ? "solid" : "dashed"} ${stamp3 > 0 ? "#1273c4" : "#d5d2cc"}`,
              borderRadius: 8,
              padding: "6px 8px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              opacity: stamp3,
              transform: `scale(${0.9 + stamp3 * 0.1})`,
            }}
          >
            <div style={{ height: 6, width: "90%", backgroundColor: "#43474b", borderRadius: 3 }} />
            <div style={{ height: 6, width: "45%", backgroundColor: "#d5d2cc", borderRadius: 3 }} />
          </div>
        </div>

        {/* 복제 완성 강조 결과 배지 */}
        {resultBadge && resultPop > 0.05 ? (
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 10,
              right: 10,
              backgroundColor: "#1273c4",
              borderRadius: 8,
              padding: "6px 8px",
              textAlign: "center",
              transform: `scale(${resultPop})`,
              boxShadow: "0 4px 12px rgba(18, 115, 196, 0.25)",
            }}
          >
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#ffffff",
                whiteSpace: "nowrap",
              }}
            >
              {resultBadge}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
