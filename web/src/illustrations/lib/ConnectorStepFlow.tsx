// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 720, h: 280 };

interface Props {
  delay?: number;
  budget: number;
  step1Title?: string;
  step2Title?: string;
  step3Title?: string;
}

const COLORS = {
  paper: "#f0efec",
  white: "#ffffff",
  line: "#d5d2cc",
  ink: "#101113",
  inkSecondary: "#43474b",
  inkMuted: "#7c8288",
  accent: "#1273c4",
  accentWash: "#e8f2fb",
};

export const ConnectorStepFlow: React.FC<Props> = ({
  delay = 0,
  budget = 960,
  step1Title = "",
  step2Title = "",
  step3Title = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  // 첫 45프레임 이내 진입 애니메이션
  const enterProgress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 단계별 포커스 팝 (순차 하이라이트)
  const step1Focus = interpolate(frame, [0, 25, 90, 115], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const step2Focus = interpolate(frame, [95, 120, 185, 210], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const step3Focus = interpolate(frame, [190, 215, 300, 325], [0, 1, 1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 상시 부유 호흡 애니메이션
  const floatY1 = Math.sin(frame * 0.07) * 3;
  const floatY2 = Math.sin((frame + 20) * 0.07) * 3;
  const floatY3 = Math.sin((frame + 40) * 0.07) * 3;

  // 카드 2 연결 버튼 클릭 펄스 모션
  const clickScale = interpolate(
    frame,
    [135, 145, 155, 165],
    [1, 0.92, 1.06, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 카드 3 인증 완료 체크 스트로크
  const checkProgress = interpolate(frame, [210, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 단계 사이 연결 점진 흐름
  const flowProgress1 = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flowProgress2 = interpolate(frame, [175, 205], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxSizing: "border-box",
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        opacity: enterProgress,
        transform: `translateY(${(1 - enterProgress) * 16}px)`,
      }}
    >
      {/* 1단계 카드: 디렉토리 선택 */}
      <div
        style={{
          width: 196,
          height: 220,
          backgroundColor: COLORS.white,
          borderRadius: 18,
          borderWidth: 3,
          borderStyle: "solid",
          borderColor: step1Focus > 0.5 ? COLORS.accent : COLORS.line,
          boxSizing: "border-box",
          padding: "16px 14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `translateY(${floatY1}px) scale(${1 + step1Focus * 0.05})`,
          boxShadow:
            step1Focus > 0.5
              ? `0 10px 24px ${COLORS.accentWash}`
              : "0 4px 12px rgba(16, 17, 19, 0.04)",
        }}
      >
        {/* 상단 1단계 인디케이터 도트 */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: COLORS.accent,
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: COLORS.line,
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: COLORS.line,
            }}
          />
        </div>

        {/* 디렉토리 선택 일러스트 */}
        <div
          style={{
            width: 100,
            height: 96,
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            padding: 8,
            boxSizing: "border-box",
            backgroundColor: COLORS.paper,
            borderRadius: 12,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 6,
              border: `2px solid ${COLORS.line}`,
            }}
          />
          <div
            style={{
              backgroundColor: step1Focus > 0.2 ? COLORS.accentWash : COLORS.white,
              borderRadius: 6,
              border: `2px solid ${COLORS.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: COLORS.accent,
              }}
            />
          </div>
          <div
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 6,
              border: `2px solid ${COLORS.line}`,
            }}
          />
          <div
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 6,
              border: `2px solid ${COLORS.line}`,
            }}
          />
        </div>

        {/* 텍스트 prop */}
        {step1Title ? (
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: step1Focus > 0.5 ? COLORS.accent : COLORS.ink,
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {step1Title}
          </span>
        ) : null}
      </div>

      {/* 1 -> 2 연결 화살표 커넥터 */}
      <div
        style={{
          width: 44,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <svg width="44" height="32" viewBox="0 0 44 32" fill="none">
          <path
            d="M 4 16 L 36 16 M 28 8 L 36 16 L 28 24"
            stroke={flowProgress1 > 0.5 ? COLORS.accent : COLORS.line}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={4 + flowProgress1 * 32}
            cy="16"
            r="3.5"
            fill={COLORS.accent}
            opacity={flowProgress1}
          />
        </svg>
      </div>

      {/* 2단계 카드: 연결 버튼 누름 */}
      <div
        style={{
          width: 196,
          height: 220,
          backgroundColor: COLORS.white,
          borderRadius: 18,
          borderWidth: 3,
          borderStyle: "solid",
          borderColor: step2Focus > 0.5 ? COLORS.accent : COLORS.line,
          boxSizing: "border-box",
          padding: "16px 14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `translateY(${floatY2}px) scale(${1 + step2Focus * 0.05})`,
          boxShadow:
            step2Focus > 0.5
              ? `0 10px 24px ${COLORS.accentWash}`
              : "0 4px 12px rgba(16, 17, 19, 0.04)",
        }}
      >
        {/* 상단 2단계 인디케이터 도트 */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: COLORS.line,
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: COLORS.accent,
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: COLORS.line,
            }}
          />
        </div>

        {/* 연결 버튼 인터랙션 일러스트 */}
        <div
          style={{
            width: 100,
            height: 96,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.paper,
            borderRadius: 12,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 74,
              height: 38,
              backgroundColor: COLORS.accent,
              borderRadius: 19,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${clickScale})`,
              boxShadow: "0 4px 10px rgba(18, 115, 196, 0.25)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M 6 12 L 18 12 M 12 6 L 18 12 L 12 18"
                stroke={COLORS.white}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 클릭 시 발생하는 파동 링 */}
          {frame >= 140 && frame <= 180 ? (
            <div
              style={{
                position: "absolute",
                width: 86,
                height: 50,
                borderRadius: 25,
                border: `2px solid ${COLORS.accent}`,
                opacity: 1 - (frame - 140) / 40,
                transform: `scale(${1 + (frame - 140) * 0.015})`,
                pointerEvents: "none",
              }}
            />
          ) : null}
        </div>

        {/* 텍스트 prop */}
        {step2Title ? (
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: step2Focus > 0.5 ? COLORS.accent : COLORS.ink,
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {step2Title}
          </span>
        ) : null}
      </div>

      {/* 2 -> 3 연결 화살표 커넥터 */}
      <div
        style={{
          width: 44,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <svg width="44" height="32" viewBox="0 0 44 32" fill="none">
          <path
            d="M 4 16 L 36 16 M 28 8 L 36 16 L 28 24"
            stroke={flowProgress2 > 0.5 ? COLORS.accent : COLORS.line}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={4 + flowProgress2 * 32}
            cy="16"
            r="3.5"
            fill={COLORS.accent}
            opacity={flowProgress2}
          />
        </svg>
      </div>

      {/* 3단계 카드: 계정 로그인 및 승인 완료 */}
      <div
        style={{
          width: 196,
          height: 220,
          backgroundColor: COLORS.white,
          borderRadius: 18,
          borderWidth: 3,
          borderStyle: "solid",
          borderColor: step3Focus > 0.2 ? COLORS.accent : COLORS.line,
          boxSizing: "border-box",
          padding: "16px 14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `translateY(${floatY3}px) scale(${1 + step3Focus * 0.05})`,
          boxShadow:
            step3Focus > 0.2
              ? `0 10px 24px ${COLORS.accentWash}`
              : "0 4px 12px rgba(16, 17, 19, 0.04)",
        }}
      >
        {/* 상단 3단계 인디케이터 도트 */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: COLORS.line,
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: COLORS.line,
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: COLORS.accent,
            }}
          />
        </div>

        {/* 로그인 자물쇠 & 체크 일러스트 */}
        <div
          style={{
            width: 100,
            height: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.paper,
            borderRadius: 12,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            {/* 자물쇠 몸통 */}
            <rect
              x="14"
              y="24"
              width="32"
              height="26"
              rx="8"
              fill={COLORS.white}
              stroke={COLORS.accent}
              strokeWidth="3"
            />
            {/* 자물쇠 고리 */}
            <path
              d="M 22 24 V 17 C 22 12.58 25.58 9 30 9 C 34.42 9 38 12.58 38 17 V 24"
              stroke={COLORS.accent}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* 완료 체크마크 */}
            <path
              d="M 23 37 L 28 42 L 38 31"
              stroke={COLORS.accent}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="24"
              strokeDashoffset={24 * (1 - checkProgress)}
            />
          </svg>
        </div>

        {/* 텍스트 prop */}
        {step3Title ? (
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: step3Focus > 0.2 ? COLORS.accent : COLORS.ink,
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {step3Title}
          </span>
        ) : null}
      </div>
    </div>
  );
};
