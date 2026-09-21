// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  hookLabel?: string;
  commandLabel?: string;
  actionLabel?: string;
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

export const HookInterceptor: React.FC<Props> = ({
  delay = 0,
  budget = 780,
  hookLabel = "",
  commandLabel = "",
  actionLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 진입 애니메이션 (첫 25프레임 내 활성화)
  const enter = interpolate(f, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 2. 명령 패킷 진입 (왼쪽 -> 중앙 훅 아래 도달)
  const packetX = interpolate(f, [10, 60], [30, 210], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const packetOpacity = interpolate(f, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. 훅의 하강 낚아채기 (Catch & Lock)
  const hookDrop = interpolate(f, [52, 64], [0, 48], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.back(1.5),
  });

  // 4. 낚아챈 직후 감쇠 진동 (Damped Swing)
  const swingAngle =
    f >= 64
      ? Math.sin((f - 64) * 0.22) * Math.exp(-(f - 64) * 0.045) * 14
      : 0;

  // 지속적인 부유 숨쉬기 모션
  const idleSway = Math.sin(f * 0.05) * 2;

  // 5. 체결 시 프리즘 블루 충격파 링
  const rippleScale = interpolate(f, [62, 90], [0.4, 2.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleOpacity = interpolate(f, [62, 70, 90], [0, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 6. 결과 설명 배지 팝업 (포커스 줌)
  const badgePop = interpolate(f, [80, 105], [0, 1], {
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
        opacity: enter,
        transform: `scale(${0.96 + enter * 0.04})`,
      }}
    >
      {/* 배경 실행 파이프 레일 */}
      <svg
        width={canvas.w}
        height={canvas.h}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <line
          x1={30}
          y1={200}
          x2={450}
          y2={200}
          stroke={C.border}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <line
          x1={30}
          y1={200}
          x2={210}
          y2={200}
          stroke={C.accent}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="8 8"
          strokeOpacity={0.6}
        />
      </svg>

      {/* 상단 훅 앵커 기구 베이스 */}
      <div
        style={{
          position: "absolute",
          left: 240,
          top: 25,
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 5,
        }}
      >
        {/* 훅 라벨 헤더 */}
        {hookLabel && (
          <div
            style={{
              padding: "4px 14px",
              backgroundColor: C.accent,
              borderRadius: 8,
              color: C.white,
              fontFamily: "Pretendard, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: -0.3,
              marginBottom: 8,
              boxShadow: "0 2px 6px rgba(18, 115, 196, 0.3)",
            }}
          >
            {hookLabel}
          </div>
        )}

        {/* 앵커 마운트 블록 */}
        <div
          style={{
            width: 70,
            height: 18,
            backgroundColor: C.paper,
            border: `3px solid ${C.ink}`,
            borderRadius: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.ink }} />
          <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.ink }} />
          <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.ink }} />
        </div>
      </div>

      {/* 훅 (갈고리) 어셈블리: 앵커에서 아래로 내려와 낚아챔 */}
      <div
        style={{
          position: "absolute",
          left: 240,
          top: 65 + hookDrop,
          transformOrigin: "top center",
          transform: `translateX(-50%) rotate(${swingAngle}deg)`,
          zIndex: 6,
        }}
      >
        <svg width={70} height={105} viewBox="0 0 70 105" style={{ overflow: "visible" }}>
          {/* 수직 암 (Arm) */}
          <line
            x1={35}
            y1={0}
            x2={35}
            y2={55}
            stroke={C.ink}
            strokeWidth={4}
            strokeLinecap="round"
          />
          {/* 갈고리 곡선 (Hook curve) */}
          <path
            d="M 35 55 C 35 90, 68 90, 68 68 C 68 54, 52 54, 48 64"
            fill="none"
            stroke={C.accent}
            strokeWidth={4}
            strokeLinecap="round"
          />
          {/* 훅 첨단 악센트 팁 */}
          <circle cx={48} cy={64} r={3} fill={C.ink} />
        </svg>

        {/* 낚아채는 접점의 임팩트 파동 링 */}
        <div
          style={{
            position: "absolute",
            left: 35,
            top: 75,
            width: 32,
            height: 32,
            marginLeft: -16,
            marginTop: -16,
            borderRadius: 16,
            border: `3px solid ${C.accent}`,
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
            pointerEvents: "none",
          }}
        />

        {/* 훅에 걸려 정지된 명령 패킷 (체결 후 훅과 일체화되어 함께 스윙) */}
        {f >= 60 && (
          <div
            style={{
              position: "absolute",
              left: 35,
              top: 72,
              transform: "translate(-50%, 0)",
            }}
          >
            {/* 패킷 상단 걸쇠 고리 */}
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                border: `3px solid ${C.ink}`,
                margin: "0 auto -3px auto",
                backgroundColor: C.white,
              }}
            />
            {/* 명령 패킷 본체 */}
            <div
              style={{
                padding: "8px 14px",
                backgroundColor: C.white,
                border: `3px solid ${C.ink}`,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 4px 12px rgba(16, 17, 19, 0.08)",
                whiteSpace: "nowrap",
              }}
            >
              {commandLabel && (
                <span
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: C.ink,
                  }}
                >
                  {commandLabel}
                </span>
              )}
              {/* 잠금 인디케이터 배지 */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: C.accent,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 체결 전 이동 중인 명령 패킷 */}
      {f < 60 && (
        <div
          style={{
            position: "absolute",
            left: packetX,
            top: 175 + idleSway,
            opacity: packetOpacity,
            zIndex: 4,
          }}
        >
          {/* 상단 걸쇠 고리 */}
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              border: `3px solid ${C.ink}`,
              margin: "0 auto -3px auto",
              backgroundColor: C.white,
            }}
          />
          <div
            style={{
              padding: "8px 14px",
              backgroundColor: C.white,
              border: `3px solid ${C.ink}`,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
              whiteSpace: "nowrap",
            }}
          >
            {commandLabel && (
              <span
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.ink,
                }}
              >
                {commandLabel}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 차단 완료 상태 팝업 배지 (actionLabel) */}
      {actionLabel && (
        <div
          style={{
            position: "absolute",
            right: 42,
            top: 130 + idleSway,
            transform: `scale(${badgePop})`,
            transformOrigin: "left center",
            opacity: badgePop,
            zIndex: 7,
          }}
        >
          <div
            style={{
              padding: "6px 14px",
              backgroundColor: C.paper,
              border: `2px solid ${C.ink}`,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(16, 17, 19, 0.06)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: C.accent,
              }}
            />
            <span
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: C.ink,
              }}
            >
              {actionLabel}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
