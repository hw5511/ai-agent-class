// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

const C = {
  paper: "#f0efec",
  card: "#ffffff",
  border: "#d5d2cc",
  ink: "#101113",
  ink2: "#43474b",
  inkWeak: "#7c8288",
  accent: "#1273c4",
  accentWash: "#e8f2fb",
};

interface Props {
  delay?: number;
  budget: number;
  loopTitle?: string;
  intervalLabel?: string;
}

export const canvas = { w: 480, h: 400 };

export const LoopIntervalCycle: React.FC<Props> = ({
  delay = 0,
  budget,
  loopTitle = "",
  intervalLabel = "",
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - delay);

  // 상시 부유 호흡 모션
  const breatheY = Math.sin(relFrame * 0.05) * 3;

  // 인트로 등장 트랜지션 (0~35 프레임)
  const introScale = interpolate(relFrame, [0, 30], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const introOpacity = interpolate(relFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 나레이션 타이밍 포커스 안무:
  // "같은 일을 정해진 간격으로" (78~184프레임 부근) 상단 간격 노드 1.15배 확대 및 중심부 살짝 딤
  const intervalFocus = interpolate(
    relFrame,
    [65, 95, 175, 205],
    [1, 1.15, 1.15, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }
  );
  const centerDim = interpolate(
    relFrame,
    [65, 95, 175, 205],
    [1, 0.78, 0.78, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // "loop" 소개 타이밍 (0~78프레임) 중앙 허브 팝
  const hubIntroPop = interpolate(relFrame, [5, 30, 65, 85], [0.85, 1.08, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 무한 궤도 회전 애니메이션 (지속적 연속 모션)
  const orbitAngle = (relFrame * 2.2) % 360;
  const orbitRad = ((orbitAngle - 90) * Math.PI) / 180;
  const radius = 100;
  const centerX = 240;
  const centerY = 205;

  const runnerX = centerX + radius * Math.cos(orbitRad);
  const runnerY = centerY + radius * Math.sin(orbitRad);

  // 둘레 길이 (2 * PI * 100 = 628.3)
  const circ = 2 * Math.PI * radius;
  const dashOffset = -((orbitAngle / 360) * circ);

  // 4개 인터벌 체크포인트 각도 (0:상, 90:우, 180:하, 270:좌)
  const nodeAngles = [0, 90, 180, 270];

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        backgroundColor: C.card,
        border: `3px solid ${C.border}`,
        borderRadius: 20,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        opacity: introOpacity,
        transform: `translateY(${breatheY}px) scale(${introScale})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <svg
        width={canvas.w}
        height={canvas.h}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* 베이스 순환 원형 궤도 */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={C.border}
          strokeWidth={4}
          strokeDasharray="6 6"
        />

        {/* 회전하는 프리즘 블루 활성 궤적 (Accent Trail) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={C.accent}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={`${circ * 0.38} ${circ * 0.62}`}
          strokeDashoffset={dashOffset}
        />

        {/* 궤도 순환 방향 표시 화살표 (45도, 135도, 225도, 315도) */}
        {[45, 135, 225, 315].map((deg) => {
          const r = ((deg - 90) * Math.PI) / 180;
          const ax = centerX + radius * Math.cos(r);
          const ay = centerY + radius * Math.sin(r);
          return (
            <g key={deg} transform={`translate(${ax}, ${ay}) rotate(${deg})`}>
              <path
                d="M -5 -3 L 0 2 L 5 -3"
                fill="none"
                stroke={C.border}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {/* 4개의 정해진 간격 체크포인트 노드 */}
        {nodeAngles.map((deg, i) => {
          const r = ((deg - 90) * Math.PI) / 180;
          const nx = centerX + radius * Math.cos(r);
          const ny = centerY + radius * Math.sin(r);

          // 러너가 통과할 때 발생하는 펄스 링
          const angleDiff = Math.abs((orbitAngle - deg + 360) % 360);
          const isHit = angleDiff < 25;
          const pingProgress = isHit ? 1 - angleDiff / 25 : 0;

          return (
            <g key={i}>
              {pingProgress > 0 && (
                <circle
                  cx={nx}
                  cy={ny}
                  r={8 + pingProgress * 14}
                  fill="none"
                  stroke={C.accent}
                  strokeWidth={2}
                  opacity={pingProgress * 0.8}
                />
              )}
              <circle cx={nx} cy={ny} r={8} fill={C.card} stroke={C.ink} strokeWidth={3} />
              <circle cx={nx} cy={ny} r={3} fill={i === 0 ? C.accent : C.ink2} />
            </g>
          );
        })}

        {/* 궤도를 달리는 실시간 러너 헤드 (Glowing Runner) */}
        <circle cx={runnerX} cy={runnerY} r={14} fill={C.accentWash} opacity={0.6} />
        <circle cx={runnerX} cy={runnerY} r={8} fill={C.accent} stroke={C.card} strokeWidth={3} />
        <circle cx={runnerX} cy={runnerY} r={3} fill={C.card} />
      </svg>

      {/* 상단 포커스 지점: '정해진 간격' 인터벌 라벨 배지 */}
      {intervalLabel ? (
        <div
          style={{
            position: "absolute",
            top: 42,
            left: "50%",
            transform: `translateX(-50%) scale(${intervalFocus})`,
            transformOrigin: "center bottom",
            backgroundColor: C.accentWash,
            border: `2px solid ${C.accent}`,
            borderRadius: 999,
            padding: "6px 14px",
            display: "flex",
            alignItems: "center",
            gap: 7,
            boxShadow: "0 4px 12px rgba(18, 115, 196, 0.12)",
            zIndex: 10,
          }}
        >
          {/* 타이머 시계 바늘 벡터 아이콘 */}
          <svg width={16} height={16} viewBox="0 0 16 16">
            <circle cx={8} cy={8} r={6.5} fill="none" stroke={C.accent} strokeWidth={2} />
            <path
              d="M 8 4.5 L 8 8 L 10.5 9.5"
              fill="none"
              stroke={C.accent}
              strokeWidth={1.8}
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: C.accent,
              letterSpacing: "-0.2px",
              whiteSpace: "nowrap",
            }}
          >
            {intervalLabel}
          </span>
        </div>
      ) : null}

      {/* 중앙 메인 허브 (코어 loop 설명 영역) */}
      <div
        style={{
          width: 124,
          height: 124,
          borderRadius: "50%",
          backgroundColor: C.card,
          border: `3px solid ${C.border}`,
          boxShadow: "0 6px 16px rgba(16, 17, 19, 0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${hubIntroPop})`,
          opacity: centerDim,
          zIndex: 5,
        }}
      >
        {/* 미세 회전하는 2방향 루프 화살표 아이콘 */}
        <div
          style={{
            transform: `rotate(${relFrame * 0.9}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: loopTitle ? 6 : 0,
          }}
        >
          <svg width={36} height={36} viewBox="0 0 36 36">
            <path
              d="M 18 6 A 12 12 0 0 1 29 15"
              fill="none"
              stroke={C.accent}
              strokeWidth={3.5}
              strokeLinecap="round"
            />
            <polygon points="30,9 33,16 26,16" fill={C.accent} />
            <path
              d="M 18 30 A 12 12 0 0 1 7 21"
              fill="none"
              stroke={C.accent}
              strokeWidth={3.5}
              strokeLinecap="round"
            />
            <polygon points="6,27 3,20 10,20" fill={C.accent} />
          </svg>
        </div>

        {/* 중앙 loop 키워드 배지 */}
        {loopTitle ? (
          <div
            style={{
              backgroundColor: C.ink,
              borderRadius: 999,
              padding: "4px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: C.card,
                letterSpacing: "-0.2px",
                lineHeight: 1,
              }}
            >
              {loopTitle}
            </span>
          </div>
        ) : null}
      </div>

      {/* 하단 반복 재실행 상태 가이드 핀 */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: C.accent,
            boxShadow: `0 0 0 ${2 + Math.sin(relFrame * 0.15) * 2}px ${C.accentWash}`,
          }}
        />
        <div
          style={{
            width: 32,
            height: 3,
            backgroundColor: C.border,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: C.border,
          }}
        />
      </div>
    </div>
  );
};
