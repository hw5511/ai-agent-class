// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 520, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  timingLabel?: string;
  pointLabel?: string;
  scriptLabel?: string;
  actionLabel?: string;
}

export const HookTriggerPipeline: React.FC<Props> = ({
  delay = 0,
  budget = 900,
  timingLabel = "",
  pointLabel = "",
  scriptLabel = "",
  actionLabel = "",
}) => {
  const currentFrame = useCurrentFrame();
  const f = Math.max(0, currentFrame - (delay ?? 0));

  // 지속적인 생명력 모션 (미세 부유 및 기어 회전)
  const breathY = Math.sin(f * 0.06) * 2.5;
  const gearRotate = (f * 2.2) % 360;

  // 장면 진입 (0~35f)
  const enterScale = interpolate(f, [0, 35], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterOpacity = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 훅 장치 하강 안무 (15~45f)
  const hookDrop = interpolate(f, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  // "도구를 쓰기 직전" 핵심 설명 시점 포커스 팝 (330~500f)
  const focusScale = interpolate(
    f,
    [330, 370, 460, 500],
    [1, 1.18, 1.18, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const contextDim = interpolate(
    f,
    [330, 370, 460, 500],
    [1, 0.74, 0.74, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 파이프라인 상의 주기적 이벤트 펄스 이동 (120f 주기)
  const loopFrame = f % 120;
  const pulseX = interpolate(
    loopFrame,
    [0, 45, 55, 105, 120],
    [80, 260, 260, 440, 440],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    }
  );
  const pulseOpacity = interpolate(
    loopFrame,
    [0, 10, 105, 120],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 훅에서 스크립트 모듈로 전달되는 에너지 신호
  const hookEnergy = interpolate(
    loopFrame,
    [45, 75],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // 스크립트 모듈 활성화 점등
  const scriptGlow = interpolate(
    loopFrame,
    [45, 60, 85, 100],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        width: 520,
        height: 360,
        backgroundColor: "#f0efec",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
        boxSizing: "border-box",
        transform: `scale(${enterScale}) translateY(${breathY}px)`,
        opacity: enterOpacity,
      }}
    >
      {/* 상단: 자동 실행 스크립트 모듈 카드 */}
      <div
        style={{
          position: "absolute",
          top: 22,
          left: 70,
          width: 380,
          height: 94,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          border: `3px solid ${scriptGlow > 0.3 ? "#1273c4" : "#d5d2cc"}`,
          boxShadow: "0 4px 14px rgba(16, 17, 19, 0.05)",
          display: "flex",
          alignItems: "center",
          padding: "12px 18px",
          boxSizing: "border-box",
          opacity: contextDim,
        }}
      >
        {/* 스크립트 동작 기어 벡터 */}
        <svg
          width={48}
          height={48}
          viewBox="0 0 48 48"
          style={{
            transform: `rotate(${gearRotate}deg)`,
            flexShrink: 0,
          }}
        >
          <circle
            cx={24}
            cy={24}
            r={14}
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth={3}
          />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <rect
              key={deg}
              x={21}
              y={4}
              width={6}
              height={7}
              rx={2}
              fill="#1273c4"
              transform={`rotate(${deg} 24 24)`}
            />
          ))}
          <circle cx={24} cy={24} r={5} fill="#ffffff" stroke="#1273c4" strokeWidth={2} />
        </svg>

        {/* 스크립트 라벨 및 자동 상태 배지 */}
        <div
          style={{
            marginLeft: 16,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            flex: 1,
          }}
        >
          {scriptLabel ? (
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#101113",
                lineHeight: 1.2,
                fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              {scriptLabel}
            </span>
          ) : null}

          {actionLabel ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1273c4",
                  backgroundColor: "#e8f2fb",
                  border: "2px solid #1273c4",
                  borderRadius: 10,
                  padding: "3px 10px",
                  lineHeight: 1,
                  display: "inline-block",
                }}
              >
                {actionLabel}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* 중앙: 스크립트 카드와 파이프라인을 잇는 훅(갈고리) 장치 */}
      <svg
        width={520}
        height={360}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        {/* 인터셉트 가이드 라인 */}
        <line
          x1={260}
          y1={116}
          x2={260}
          y2={220}
          stroke="#d5d2cc"
          strokeWidth={3}
          strokeDasharray="5 5"
        />

        {/* 훅을 타고 상승하는 실행 에너지 */}
        {hookEnergy > 0 && hookEnergy < 1 ? (
          <line
            x1={260}
            y1={220 - hookEnergy * 104}
            x2={260}
            y2={220 - Math.min(104, (hookEnergy + 0.25) * 104)}
            stroke="#1273c4"
            strokeWidth={4}
            strokeLinecap="round"
          />
        ) : null}

        {/* 훅(갈고리) 형상 */}
        <g
          transform={`translate(260, ${150 + hookDrop * 45})`}
          style={{ opacity: contextDim }}
        >
          <rect x={-8} y={-10} width={16} height={12} rx={4} fill="#43474b" />
          <path
            d="M 0 2 L 0 26 C 0 34 -14 34 -14 24"
            fill="none"
            stroke="#101113"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <circle cx={-14} cy={24} r={3} fill="#1273c4" />
        </g>
      </svg>

      {/* 하단: 이벤트 흐름 트랙 (도구 실행 파이프라인) */}
      <div
        style={{
          position: "absolute",
          top: 215,
          left: 40,
          width: 440,
          height: 110,
        }}
      >
        <svg
          width={440}
          height={60}
          style={{ position: "absolute", top: 12, left: 0, overflow: "visible" }}
        >
          {/* 파이프라인 기본선 */}
          <line
            x1={40}
            y1={24}
            x2={400}
            y2={24}
            stroke="#d5d2cc"
            strokeWidth={4}
            strokeLinecap="round"
          />

          {/* 진행 방향 화살표 */}
          {[120, 180, 320, 370].map((x) => (
            <path
              key={x}
              d={`M ${x - 5} 19 L ${x} 24 L ${x - 5} 29`}
              fill="none"
              stroke="#d5d2cc"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* 시작 노드 */}
          <circle cx={40} cy={24} r={10} fill="#ffffff" stroke="#43474b" strokeWidth={3} />
          <circle cx={40} cy={24} r={4} fill="#43474b" />

          {/* 대상 도구 실행 노드 */}
          <rect
            x={388}
            y={8}
            width={32}
            height={32}
            rx={8}
            fill="#ffffff"
            stroke="#101113"
            strokeWidth={3}
          />
          <path
            d="M 400 20 L 408 28 M 407 17 L 411 21"
            stroke="#101113"
            strokeWidth={3}
            strokeLinecap="round"
          />

          {/* 이동하는 이벤트 펄스 */}
          <circle
            cx={pulseX - 40}
            cy={24}
            r={8}
            fill="#1273c4"
            opacity={pulseOpacity}
          />
          <circle
            cx={pulseX - 40}
            cy={24}
            r={14}
            fill="none"
            stroke="#1273c4"
            strokeWidth={2}
            opacity={pulseOpacity * 0.5}
          />
        </svg>

        {/* 시작 지점 라벨 ("정해진 순간에") */}
        {timingLabel ? (
          <div
            style={{
              position: "absolute",
              top: 50,
              left: 0,
              width: 100,
              textAlign: "center",
              opacity: contextDim,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#43474b",
                lineHeight: 1.2,
                display: "inline-block",
              }}
            >
              {timingLabel}
            </span>
          </div>
        ) : null}

        {/* 핵심 분기점: "도구를 쓰기 직전" (포커스 팝 영역) */}
        <div
          style={{
            position: "absolute",
            top: -6,
            left: 140,
            width: 160,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${focusScale})`,
            transformOrigin: "center 36px",
            zIndex: 10,
          }}
        >
          {pointLabel ? (
            <div
              style={{
                backgroundColor: "#1273c4",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 14,
                padding: "5px 12px",
                lineHeight: 1,
                boxShadow: "0 4px 10px rgba(18, 115, 196, 0.3)",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>{pointLabel}</span>
            </div>
          ) : null}

          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #1273c4",
              marginBottom: 2,
            }}
          />

          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "3px solid #1273c4",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>
    </div>
  );
};
