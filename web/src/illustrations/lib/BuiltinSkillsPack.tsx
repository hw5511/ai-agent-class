// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  packTitle?: string;
  statusBadge?: string;
  skillsCountLabel?: string;
  actionLabel?: string;
}

const C_LINE = "#d5d2cc";
const C_INK = "#101113";
const C_ACCENT = "#1273c4";
const C_ACCENT_WASH = "#e8f2fb";

export const BuiltinSkillsPack: React.FC<Props> = ({
  delay = 0,
  budget = 780,
  packTitle = "",
  statusBadge = "",
  skillsCountLabel = "",
  actionLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 코어 팩 등장 애니메이션 (0~35f)
  const coreScale = interpolate(f, [0, 35], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const coreOpacity = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. 배지 팝업 (20~45f)
  const badgePop = interpolate(f, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.6)),
  });

  // 3. 연결선 전개 (40~75f)
  const wireProgress = interpolate(f, [40, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  // 4. 하단 3개 스킬 모듈 카드 순차 팝업 (55~115f)
  const card1Pop = interpolate(f, [55, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const card2Pop = interpolate(f, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const card3Pop = interpolate(f, [85, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  // 5. 나레이션 구간별 포커스 팝 (Show-and-Tell Focus Animation)
  const calcFocus = (start: number, end: number) => {
    const enter = interpolate(f, [start - 15, start], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    });
    const exit = interpolate(f, [end, end + 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    });
    return enter * (1 - exit);
  };

  const focus1 = calcFocus(130, 265); // "따로 설치한 적 없어도"
  const focus2 = calcFocus(330, 470); // "이미 들어 있는 스킬이 여러 개"
  const focus3 = calcFocus(550, budget); // "하나씩 직접 써보죠"

  const anyFocus = Math.max(focus1, focus2, focus3);
  const dim1 = 0.74 + 0.26 * (1 - anyFocus + focus1);
  const dim2 = 0.74 + 0.26 * (1 - anyFocus + focus2);
  const dim3 = 0.74 + 0.26 * (1 - anyFocus + focus3);

  // 상시 부유 모션 (쉬지 않는 안무)
  const floatCore = Math.sin(f * 0.05) * 3;
  const float1 = Math.sin(f * 0.055 + 0.5) * 3;
  const float2 = Math.sin(f * 0.055 + 1.8) * 3.5;
  const float3 = Math.sin(f * 0.055 + 3.1) * 3;

  return (
    <div
      style={{
        position: "relative",
        width: canvas.w,
        height: canvas.h,
        overflow: "hidden",
      }}
    >
      {/* 3갈래 벡터 파이프라인 연결선 */}
      <svg
        width={canvas.w}
        height={canvas.h}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <path
          d="M 210 128 C 180 170, 110 175, 95 215"
          fill="none"
          stroke={focus1 > 0.5 ? C_ACCENT : C_LINE}
          strokeWidth="3.5"
          strokeDasharray="180"
          strokeDashoffset={180 * (1 - wireProgress)}
        />
        <path
          d="M 240 128 C 240 165, 240 175, 240 215"
          fill="none"
          stroke={focus2 > 0.5 ? C_ACCENT : C_LINE}
          strokeWidth="3.5"
          strokeDasharray="120"
          strokeDashoffset={120 * (1 - wireProgress)}
        />
        <path
          d="M 270 128 C 300 170, 370 175, 385 215"
          fill="none"
          stroke={focus3 > 0.5 ? C_ACCENT : C_LINE}
          strokeWidth="3.5"
          strokeDasharray="180"
          strokeDashoffset={180 * (1 - wireProgress)}
        />
      </svg>

      {/* 중앙 상단 코어 팩 */}
      <div
        style={{
          position: "absolute",
          top: 32 + floatCore,
          left: 130,
          width: 220,
          height: 96,
          backgroundColor: "#ffffff",
          borderRadius: 18,
          border: `3.5px solid ${C_LINE}`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${coreScale})`,
          opacity: coreOpacity,
          zIndex: 2,
        }}
      >
        {/* 상태 안내 배지 */}
        {statusBadge && (
          <div
            style={{
              position: "absolute",
              top: -16,
              backgroundColor: C_ACCENT_WASH,
              border: `1.5px solid ${C_ACCENT}`,
              borderRadius: 12,
              padding: "3px 10px",
              color: C_ACCENT,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "Pretendard, -apple-system, sans-serif",
              transform: `scale(${badgePop})`,
              opacity: badgePop,
              whiteSpace: "nowrap",
            }}
          >
            {statusBadge}
          </div>
        )}

        {/* 코어 엠블럼 아이콘 */}
        <div style={{ marginBottom: 6 }}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect
              x="4"
              y="4"
              width="24"
              height="24"
              rx="8"
              fill={C_ACCENT_WASH}
              stroke={C_ACCENT}
              strokeWidth="3"
            />
            <circle cx="16" cy="16" r="4" fill={C_ACCENT} />
          </svg>
        </div>

        {packTitle && (
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: C_INK,
              fontFamily: "Pretendard, -apple-system, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {packTitle}
          </div>
        )}
      </div>

      {/* 하단 모듈 1: 스킬 개수 카드 */}
      <div
        style={{
          position: "absolute",
          top: 215 + float1,
          left: 30,
          width: 130,
          height: 98,
          backgroundColor: focus1 > 0.3 ? "#f8fbfe" : "#ffffff",
          borderRadius: 14,
          border: `3.5px solid ${focus1 > 0.3 ? C_ACCENT : C_LINE}`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 6px",
          transform: `scale(${card1Pop * (1 + focus1 * 0.12)})`,
          opacity: card1Pop * dim1,
          zIndex: focus1 > 0.3 ? 3 : 1,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" style={{ marginBottom: 6 }}>
          <circle cx="9" cy="9" r="4" fill={C_ACCENT_WASH} stroke={C_ACCENT} strokeWidth="2.5" />
          <circle cx="19" cy="9" r="4" fill={C_ACCENT_WASH} stroke={C_ACCENT} strokeWidth="2.5" />
          <circle cx="14" cy="19" r="4" fill={C_ACCENT_WASH} stroke={C_ACCENT} strokeWidth="2.5" />
        </svg>
        {skillsCountLabel && (
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: C_INK,
              fontFamily: "'Spoqa Han Sans Neo', -apple-system, sans-serif",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {skillsCountLabel}
          </div>
        )}
      </div>

      {/* 하단 모듈 2: 내장 스킬 엔진 토큰 카드 */}
      <div
        style={{
          position: "absolute",
          top: 215 + float2,
          left: 175,
          width: 130,
          height: 98,
          backgroundColor: focus2 > 0.3 ? "#f8fbfe" : "#ffffff",
          borderRadius: 14,
          border: `3.5px solid ${focus2 > 0.3 ? C_ACCENT : C_LINE}`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 6px",
          transform: `scale(${card2Pop * (1 + focus2 * 0.14)})`,
          opacity: card2Pop * dim2,
          zIndex: focus2 > 0.3 ? 3 : 1,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" style={{ marginBottom: 6 }}>
          <path
            d="M 15 3 L 8 16 L 14 16 L 13 25 L 20 12 L 14 12 Z"
            fill={C_ACCENT_WASH}
            stroke={C_ACCENT}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            width: 44,
            height: 6,
            borderRadius: 3,
            backgroundColor: focus2 > 0.3 ? C_ACCENT : C_LINE,
          }}
        />
      </div>

      {/* 하단 모듈 3: 직접 실행 카드 */}
      <div
        style={{
          position: "absolute",
          top: 215 + float3,
          left: 320,
          width: 130,
          height: 98,
          backgroundColor: focus3 > 0.3 ? "#f8fbfe" : "#ffffff",
          borderRadius: 14,
          border: `3.5px solid ${focus3 > 0.3 ? C_ACCENT : C_LINE}`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 6px",
          transform: `scale(${card3Pop * (1 + focus3 * 0.12)})`,
          opacity: card3Pop * dim3,
          zIndex: focus3 > 0.3 ? 3 : 1,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" style={{ marginBottom: 6 }}>
          <circle cx="14" cy="14" r="10" fill={C_ACCENT_WASH} stroke={C_ACCENT} strokeWidth="2.5" />
          <path
            d="M 12 10 L 18 14 L 12 18 Z"
            fill={C_ACCENT}
            stroke={C_ACCENT}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        {actionLabel && (
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: C_INK,
              fontFamily: "'Spoqa Han Sans Neo', -apple-system, sans-serif",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {actionLabel}
          </div>
        )}
      </div>
    </div>
  );
};
