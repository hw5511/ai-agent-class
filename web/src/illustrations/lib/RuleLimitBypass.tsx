// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  gateLabel?: string;
  ruleDesc?: string;
  blockedLabel?: string;
  bypassLabel?: string;
}

const C = {
  paper: "#f0efec",
  white: "#ffffff",
  border: "#d5d2cc",
  ink: "#101113",
  ink2: "#43474b",
  muted: "#7c8288",
  accent: "#1273c4",
  accentWash: "#e8f2fb",
};

export const RuleLimitBypass: React.FC<Props> = ({
  delay = 0,
  budget = 780,
  gateLabel = "",
  ruleDesc = "",
  blockedLabel = "",
  bypassLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 숨쉬는 지속 모션 (쉬지 않는 움직임)
  const breath = Math.sin(f * 0.05) * 2.5;
  const pulseScale = 1 + Math.sin(f * 0.06) * 0.015;

  // 2. 진입 애니메이션 (시작 25프레임 내 완료)
  const enterProgress = interpolate(f, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 3. 패킷 A (정면 차단되는 일반 명령)
  const blockPacketX = interpolate(f, [15, 45, 55], [40, 185, 172], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const blockImpactScale = interpolate(f, [44, 48, 56], [1, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blockOpacity = interpolate(f, [10, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blockMarkPop = interpolate(f, [46, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.back(2),
  });

  // 4. 패킷 B (규칙을 우회하여 빠져나가는 변형 명령)
  const bypassProgress = interpolate(f, [60, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const bypassPacketX = interpolate(bypassProgress, [0, 1], [40, 360]);
  const bypassPacketY = interpolate(
    bypassProgress,
    [0, 0.35, 0.7, 1],
    [175, 235, 235, 175]
  );
  const bypassOpacity = interpolate(f, [55, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5. 우회 배지 팝업
  const badgePop = interpolate(f, [125, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.back(1.8),
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        backgroundColor: C.white,
        borderRadius: 18,
        border: `3px solid ${C.border}`,
        boxSizing: "border-box",
        overflow: "hidden",
        opacity: enterProgress,
        transform: `scale(${0.96 + enterProgress * 0.04})`,
      }}
    >
      {/* 배경 메인 레일 라인 */}
      <svg
        width={canvas.w}
        height={canvas.h}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {/* 직선 실행 레일 */}
        <line
          x1={30}
          y1={175}
          x2={450}
          y2={175}
          stroke={C.border}
          strokeWidth={3}
          strokeDasharray="6 6"
        />
        {/* 우회 곡선 레일 */}
        <path
          d="M 120 175 C 160 175, 170 235, 240 235 C 310 235, 320 175, 360 175"
          fill="none"
          stroke={C.accent}
          strokeWidth={3}
          strokeDasharray="5 5"
          strokeOpacity={0.65}
        />
      </svg>

      {/* 중앙 규칙 게이트 필터 */}
      <div
        style={{
          position: "absolute",
          left: 215,
          top: 75 + breath,
          width: 50,
          height: 140,
          backgroundColor: C.paper,
          borderRadius: 14,
          border: `3px solid ${C.ink}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 4px",
          boxSizing: "border-box",
          zIndex: 4,
        }}
      >
        {/* 필터 슬릿 라인들 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 4 }}>
          <div style={{ width: 24, height: 3, backgroundColor: C.ink, borderRadius: 2 }} />
          <div style={{ width: 24, height: 3, backgroundColor: C.ink, borderRadius: 2 }} />
          <div style={{ width: 24, height: 3, backgroundColor: C.ink, borderRadius: 2 }} />
        </div>

        {/* 차단 방패 아이콘 */}
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            backgroundColor: C.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 8, height: 8, backgroundColor: C.white, borderRadius: 2 }} />
        </div>
      </div>

      {/* 게이트 상단 배지 (설명 포커스) */}
      <div
        style={{
          position: "absolute",
          left: 240,
          top: 30 + breath * 0.5,
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          zIndex: 5,
        }}
      >
        {gateLabel && (
          <div
            style={{
              padding: "4px 12px",
              backgroundColor: C.ink,
              borderRadius: 8,
              color: C.white,
              fontFamily: "Pretendard, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: -0.3,
            }}
          >
            {gateLabel}
          </div>
        )}
        {ruleDesc && (
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: C.paper,
              borderRadius: 6,
              border: `1.5px solid ${C.border}`,
              color: C.ink2,
              fontFamily: "Pretendard, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {ruleDesc}
          </div>
        )}
      </div>

      {/* 패킷 1: 게이트에 막히는 일반 위험 명령 */}
      <div
        style={{
          position: "absolute",
          left: blockPacketX,
          top: 155,
          transform: `scale(${blockImpactScale})`,
          opacity: blockOpacity,
          zIndex: 3,
        }}
      >
        <div
          style={{
            padding: "8px 14px",
            backgroundColor: C.white,
            border: `3px solid ${C.ink}`,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {blockedLabel && (
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: C.ink,
              }}
            >
              {blockedLabel}
            </span>
          )}
          {/* 차단 심볼 */}
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              backgroundColor: C.ink,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${blockMarkPop})`,
            }}
          >
            <span
              style={{
                color: C.white,
                fontSize: 13,
                lineHeight: 1,
                fontWeight: 800,
              }}
            >
              ×
            </span>
          </div>
        </div>
      </div>

      {/* 패킷 B: 규칙 아래로 빠져나가는 우회 명령 */}
      <div
        style={{
          position: "absolute",
          left: bypassPacketX,
          top: bypassPacketY - 20,
          opacity: bypassOpacity,
          transform: `scale(${pulseScale})`,
          zIndex: 6,
        }}
      >
        <div
          style={{
            padding: "8px 14px",
            backgroundColor: C.accentWash,
            border: `3px solid ${C.accent}`,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {blockedLabel && (
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: C.accent,
              }}
            >
              {blockedLabel}
            </span>
          )}
          {/* 우회 화살표 포인트 */}
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: C.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: 3,
                backgroundColor: C.white,
              }}
            />
          </div>
        </div>
      </div>

      {/* 우회 결과 설명 배지 (포커스 팝) */}
      {bypassLabel && (
        <div
          style={{
            position: "absolute",
            left: 310,
            top: 245,
            transform: `scale(${badgePop})`,
            transformOrigin: "center top",
            opacity: badgePop,
            zIndex: 7,
          }}
        >
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: C.accent,
              borderRadius: 8,
              color: C.white,
              fontFamily: "Pretendard, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              boxShadow: "0 2px 8px rgba(18, 115, 196, 0.25)",
            }}
          >
            {bypassLabel}
          </div>
        </div>
      )}
    </div>
  );
};
