// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  hookLabel?: string;
  toolLabel?: string;
  targetLabel?: string;
}

export const PreToolUseGate: React.FC<Props> = ({
  delay = 0,
  budget,
  hookLabel = "",
  toolLabel = "",
  targetLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 미세 부유 호흡 모션
  const floatY = Math.sin(f * 0.08) * 3;

  // 인트로 등장 트랜지션 (24프레임 이내)
  const introScale = interpolate(f, [0, 24], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const introOpacity = interpolate(f, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 도구 호출 패킷이 컴퓨터를 향해 이동 (중앙 게이트 앞에서 멈춤)
  const packetX = interpolate(f, [18, 48], [105, 204], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const packetOpacity = interpolate(f, [18, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // PreToolUse 게이트의 가로채기 방어막 반응 및 포커스 팝
  const gateScale = interpolate(f, [40, 54, 68], [1, 1.12, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const barrierAura = interpolate(f, [44, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
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
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        transform: `translateY(${floatY}px) scale(${introScale})`,
        opacity: introOpacity,
      }}
    >
      {/* 파이프라인 경로 및 안전 차단 경계선 */}
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
          x1={138}
          y1={160}
          x2={205}
          y2={160}
          stroke="#d5d2cc"
          strokeWidth={4}
          strokeDasharray="6 6"
        />
        <line
          x1={275}
          y1={160}
          x2={342}
          y2={160}
          stroke="#d5d2cc"
          strokeWidth={4}
          strokeDasharray="6 6"
        />
        <line
          x1={310}
          y1={80}
          x2={310}
          y2={240}
          stroke="#1273c4"
          strokeWidth={3}
          strokeDasharray="4 8"
          opacity={0.4}
        />
      </svg>

      {/* 실행 직전 중앙 게이트에 의해 포획되는 명령 패킷 */}
      <div
        style={{
          position: "absolute",
          left: packetX,
          top: 145,
          width: 30,
          height: 30,
          backgroundColor: "#e8f2fb",
          border: "3px solid #1273c4",
          borderRadius: 8,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: packetOpacity,
          zIndex: 5,
        }}
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M12 5l7 7-7 7"
            stroke="#1273c4"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 좌측: 호출을 시도한 도구 노드 */}
      <div
        style={{
          width: 110,
          height: 104,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          borderRadius: 16,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          zIndex: 3,
        }}
      >
        <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <rect
            x={3}
            y={3}
            width={18}
            height={18}
            rx={5}
            stroke="#43474b"
            strokeWidth={3}
          />
          <path
            d="M8 10l3 2-3 2M13 14h3"
            stroke="#43474b"
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
              color: "#101113",
              fontFamily: 'Pretendard, "Spoqa Han Sans Neo", sans-serif',
              lineHeight: 1,
            }}
          >
            {toolLabel}
          </span>
        ) : null}
      </div>

      {/* 중앙: 실행 직전 가로채는 PreToolUse 방어막 게이트 */}
      <div
        style={{
          position: "relative",
          width: 136,
          height: 128,
          backgroundColor: "#ffffff",
          border: "3px solid #1273c4",
          borderRadius: 18,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          transform: `scale(${gateScale})`,
          boxShadow: `0 0 0 ${barrierAura * 8}px #e8f2fb`,
          zIndex: 6,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            backgroundColor: "#e8f2fb",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"
              stroke="#1273c4"
              strokeWidth={3}
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {hookLabel ? (
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#1273c4",
              fontFamily: 'Pretendard, "Spoqa Han Sans Neo", sans-serif',
              lineHeight: 1,
            }}
          >
            {hookLabel}
          </span>
        ) : null}
      </div>

      {/* 우측: 보호받는 대상 컴퓨터 시스템 */}
      <div
        style={{
          width: 110,
          height: 104,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          borderRadius: 16,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          zIndex: 3,
        }}
      >
        <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <rect
            x={3}
            y={4}
            width={18}
            height={12}
            rx={3}
            stroke="#43474b"
            strokeWidth={3}
          />
          <path
            d="M8 20h8M12 16v4"
            stroke="#43474b"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
        {targetLabel ? (
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#101113",
              fontFamily: 'Pretendard, "Spoqa Han Sans Neo", sans-serif',
              lineHeight: 1,
            }}
          >
            {targetLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};
