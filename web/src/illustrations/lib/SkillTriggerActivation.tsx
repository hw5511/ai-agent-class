// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing, interpolateColors } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  dialogueLabel?: string;
  wordLabel?: string;
  claudeLabel?: string;
  judgeLabel?: string;
  skillLabel?: string;
  actionLabel?: string;
}

export const canvas = { w: 520, h: 360 };

const COLORS = {
  paper: "#f0efec",
  card: "#ffffff",
  border: "#d5d2cc",
  ink: "#101113",
  ink2: "#43474b",
  sub: "#7c8288",
  accent: "#1273c4",
  accentWash: "#e8f2fb",
  surfaceSub: "#f8f7f5",
};

export const SkillTriggerActivation: React.FC<Props> = ({
  delay = 0,
  dialogueLabel = "",
  wordLabel = "",
  claudeLabel = "",
  judgeLabel = "",
  skillLabel = "",
  actionLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 전체 노드 셋업 진입 (45프레임 이내 시작)
  const enterProgress = interpolate(f, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 2. 클로드 판단 맥동 & 스캔 링 (설명을 보고 판단하는 단계)
  const judgePulse = interpolate(f, [45, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 1, 0.68, 1),
  });

  // 3. 대화에서 단어 발화 및 중앙으로의 신호 이동 (여러분이 대화에서 그 단어를 쓰면)
  const wordEmitProgress = interpolate(f, [105, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const signalLeftToCenter = interpolate(f, [125, 165], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  // 4. 중앙에서 스킬로 신호 도달 및 전원 스위치 ON (이 스킬이 저절로 켜져요)
  const signalCenterToRight = interpolate(f, [170, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const activationProgress = interpolate(f, [205, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 5. 지속적 생명력 (노드별 오프셋 부유 및 켜진 후 잔잔한 호흡)
  const floatLeftY = Math.sin(f * 0.05) * 3;
  const floatCenterY = Math.sin(f * 0.05 + Math.PI * 0.6) * 3;
  const floatRightY = Math.sin(f * 0.05 + Math.PI * 1.2) * 3;
  const glowBreath = Math.sin(f * 0.08) * 0.5 + 0.5;

  // 동적 스타일 보간
  const scanRingScale = interpolate(judgePulse, [0, 1], [0.8, 1.45]);
  const scanRingOpacity = interpolate(judgePulse, [0, 0.3, 1], [0, 0.7, 0]);

  const skillCardBg = interpolateColors(activationProgress, [0, 1], [COLORS.card, COLORS.accentWash]);
  const skillCardBorder = interpolateColors(activationProgress, [0, 1], [COLORS.border, COLORS.accent]);
  const toggleKnobX = interpolate(activationProgress, [0, 1], [3, 23]);
  const toggleBg = interpolateColors(activationProgress, [0, 1], [COLORS.border, COLORS.accent]);

  const actionBadgeScale = interpolate(activationProgress, [0, 0.6, 1], [0, 1.15, 1], {
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
        backgroundColor: "transparent",
        fontFamily: "Pretendard, -apple-system, sans-serif",
        opacity: enterProgress,
        transform: `scale(${interpolate(enterProgress, [0, 1], [0.95, 1])})`,
      }}
    >
      {/* 1. 연결선 벡터 레이어 (좌 -> 중, 중 -> 우) */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: canvas.w,
          height: canvas.h,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* 좌측 -> 중앙 연결선 */}
        <line
          x1={148}
          y1={180}
          x2={205}
          y2={180}
          stroke={COLORS.border}
          strokeWidth={3}
          strokeDasharray="6 6"
        />
        {/* 중앙 -> 우측 연결선 */}
        <line
          x1={315}
          y1={180}
          x2={372}
          y2={180}
          stroke={COLORS.border}
          strokeWidth={3}
          strokeDasharray="6 6"
        />

        {/* 좌 -> 중 신호 구슬 */}
        {signalLeftToCenter > 0 && signalLeftToCenter < 1 && (
          <circle
            cx={interpolate(signalLeftToCenter, [0, 1], [148, 205])}
            cy={180}
            r={5}
            fill={COLORS.accent}
          />
        )}

        {/* 중 -> 우 신호 구슬 */}
        {signalCenterToRight > 0 && signalCenterToRight < 1 && (
          <circle
            cx={interpolate(signalCenterToRight, [0, 1], [315, 372])}
            cy={180}
            r={5}
            fill={COLORS.accent}
          />
        )}
      </svg>

      {/* 좌측 노드: 대화 & 단어 입력 */}
      <div
        style={{
          width: 128,
          height: 180,
          backgroundColor: COLORS.card,
          border: `3px solid ${COLORS.border}`,
          borderRadius: 16,
          boxSizing: "border-box",
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `translateY(${floatLeftY}px)`,
          boxShadow: "0 8px 24px rgba(16, 17, 19, 0.05)",
          zIndex: 2,
        }}
      >
        {dialogueLabel && (
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: COLORS.ink,
              letterSpacing: "-0.2px",
            }}
          >
            {dialogueLabel}
          </div>
        )}

        {/* 대화 말풍선 시각 기호 */}
        <div
          style={{
            width: 56,
            height: 42,
            border: `3px solid ${COLORS.ink2}`,
            borderRadius: "12px 12px 12px 2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: COLORS.ink2 }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: COLORS.ink2 }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: COLORS.ink2 }} />
        </div>

        {/* 단어 칩 (입력 시 튀어나옴) */}
        {wordLabel && (
          <div
            style={{
              padding: "4px 10px",
              borderRadius: 8,
              border: `2px solid ${COLORS.accent}`,
              backgroundColor: COLORS.accentWash,
              color: COLORS.accent,
              fontSize: 13,
              fontWeight: 700,
              transform: `scale(${wordEmitProgress})`,
              boxShadow: "0 4px 12px rgba(18, 115, 196, 0.12)",
            }}
          >
            {wordLabel}
          </div>
        )}
      </div>

      {/* 중앙 노드: 클로드 판단 코어 */}
      <div
        style={{
          width: 136,
          height: 196,
          backgroundColor: COLORS.surfaceSub,
          border: `3px solid ${COLORS.ink}`,
          borderRadius: 18,
          boxSizing: "border-box",
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `translateY(${floatCenterY}px)`,
          boxShadow: "0 10px 28px rgba(16, 17, 19, 0.08)",
          position: "relative",
          zIndex: 3,
        }}
      >
        {/* 판단 단계 레이더 스캔 링 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 90,
            height: 90,
            borderRadius: "50%",
            border: `3px solid ${COLORS.accent}`,
            transform: `translate(-50%, -50%) scale(${scanRingScale})`,
            opacity: scanRingOpacity,
            pointerEvents: "none",
          }}
        />

        {claudeLabel && (
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.ink,
              letterSpacing: "-0.2px",
            }}
          >
            {claudeLabel}
          </div>
        )}

        {/* 클로드 중앙 스파크 기하 심볼 */}
        <div
          style={{
            width: 48,
            height: 48,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              border: `3px solid ${COLORS.ink}`,
              borderRadius: 8,
              transform: "rotate(45deg)",
              backgroundColor: COLORS.card,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: judgePulse > 0.5 ? COLORS.accent : COLORS.ink,
            }}
          />
        </div>

        {/* 판단 상태 배지 */}
        {judgeLabel && (
          <div
            style={{
              padding: "4px 8px",
              borderRadius: 6,
              backgroundColor: judgePulse > 0.3 ? COLORS.accent : COLORS.card,
              border: `2px solid ${judgePulse > 0.3 ? COLORS.accent : COLORS.border}`,
              color: judgePulse > 0.3 ? COLORS.card : COLORS.ink2,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "Spoqa Han Sans Neo, sans-serif",
            }}
          >
            {judgeLabel}
          </div>
        )}
      </div>

      {/* 우측 노드: 스킬 활성화 (저절로 켜짐) */}
      <div
        style={{
          width: 128,
          height: 180,
          backgroundColor: skillCardBg,
          border: `3px solid ${skillCardBorder}`,
          borderRadius: 16,
          boxSizing: "border-box",
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `translateY(${floatRightY}px)`,
          boxShadow:
            activationProgress > 0
              ? `0 10px 28px rgba(18, 115, 196, ${0.16 + glowBreath * 0.08})`
              : "0 8px 24px rgba(16, 17, 19, 0.05)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* 상단 팝업 액션 배지 */}
        {actionLabel && (
          <div
            style={{
              position: "absolute",
              top: -18,
              backgroundColor: COLORS.accent,
              color: COLORS.card,
              fontSize: 13,
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 6,
              boxShadow: "0 4px 12px rgba(18, 115, 196, 0.3)",
              transform: `scale(${actionBadgeScale})`,
              transformOrigin: "bottom center",
              whiteSpace: "nowrap",
            }}
          >
            {actionLabel}
          </div>
        )}

        {skillLabel && (
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: activationProgress > 0.5 ? COLORS.accent : COLORS.ink,
              letterSpacing: "-0.2px",
            }}
          >
            {skillLabel}
          </div>
        )}

        {/* 토글 스위치 활성화 벡터 인터랙션 */}
        <div
          style={{
            width: 48,
            height: 28,
            backgroundColor: toggleBg,
            borderRadius: 14,
            border: `2px solid ${activationProgress > 0.5 ? COLORS.accent : COLORS.border}`,
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: toggleKnobX,
              width: 18,
              height: 18,
              borderRadius: "50%",
              backgroundColor: COLORS.card,
              boxShadow: "0 2px 6px rgba(16, 17, 19, 0.2)",
            }}
          />
        </div>

        {/* 스킬 출력 실행 라인 인디케이터 */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <div
            style={{
              width: "75%",
              height: 6,
              borderRadius: 3,
              backgroundColor: activationProgress > 0.5 ? COLORS.accent : COLORS.border,
            }}
          />
          <div
            style={{
              width: "45%",
              height: 6,
              borderRadius: 3,
              backgroundColor: activationProgress > 0.5 ? COLORS.accent : COLORS.border,
              opacity: 0.6,
            }}
          />
        </div>
      </div>
    </div>
  );
};
