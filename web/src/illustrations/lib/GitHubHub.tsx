// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 480, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  label?: string;
  hubTag?: string;
}

export const GitHubHub: React.FC<Props> = ({
  delay = 0,
  budget,
  label = '',
  hubTag = '',
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 초기 45f 이내 중앙 허브 카드 및 라벨 팝인
  const hubIntroScale = interpolate(f, [0, 35], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });
  const hubIntroOpacity = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. 파이프 라인 드로우 애니메이션 (25~55f)
  const pipeProgress = interpolate(f, [25, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 3. 서브 모듈 노드 순차 팝인 (35~70f)
  const node1Scale = interpolate(f, [35, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });
  const node2Scale = interpolate(f, [42, 62], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });
  const node3Scale = interpolate(f, [50, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });

  // 4. 나레이션 설명 포커스 줌 (140~200f: "깃허브가 무엇인지" 강조 구간에서 중앙 허브 1.15배 확대)
  const focusScale = interpolate(
    f,
    [130, 160, 250, 280],
    [1, 1.15, 1.15, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );

  // 주변 노드들은 포커스 시 살짝 딤 (규칙: 0.72 이상 유지)
  const satelliteOpacity = interpolate(
    f,
    [130, 160, 250, 280],
    [1, 0.74, 0.74, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // 상단 라벨 배지 팝
  const badgePop = interpolate(
    f,
    [140, 165, 250, 275],
    [0.92, 1.08, 1.08, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.back(1.5)),
    }
  );

  // 5. 지속적 생명력 부유 모션 (쉬지 않는 안무)
  const floatHub = Math.sin(f * 0.05) * 3;
  const floatNode1 = Math.sin(f * 0.05 + 1.2) * 4;
  const floatNode2 = Math.sin(f * 0.05 + 2.4) * 4;
  const floatNode3 = Math.sin(f * 0.05 + 3.6) * 4;

  // 연결선 데이터 펄스 이동 오프셋 (순환)
  const pulseT1 = ((f * 1.6) % 100) / 100;
  const pulseT2 = (((f * 1.6) + 33) % 100) / 100;
  const pulseT3 = (((f * 1.6) + 66) % 100) / 100;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: 'relative',
        backgroundColor: '#f0efec',
        overflow: 'hidden',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
    >
      {/* 상단 설명 라벨 (파란 말풍선 배지) */}
      {label ? (
        <div
          style={{
            position: 'absolute',
            top: 22,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
            transform: `scale(${badgePop})`,
            transformOrigin: 'center center',
          }}
        >
          <div
            style={{
              backgroundColor: '#1273c4',
              color: '#ffffff',
              padding: '6px 18px',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '-0.2px',
              boxShadow: '0 4px 12px rgba(18, 115, 196, 0.22)',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </div>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '6px solid #1273c4',
            }}
          />
        </div>
      ) : null}

      {/* 노드 연결 벡터 파이프 SVG */}
      <svg
        width={canvas.w}
        height={canvas.h}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {/* 허브(240, 195) -> 노드1 좌상단(95, 120) */}
        <path
          d="M 240 195 C 170 195, 130 160, 95 120"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3"
          strokeDasharray="220"
          strokeDashoffset={220 * (1 - pipeProgress)}
        />
        {/* 허브(240, 195) -> 노드2 우상단(385, 120) */}
        <path
          d="M 240 195 C 310 195, 350 160, 385 120"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3"
          strokeDasharray="220"
          strokeDashoffset={220 * (1 - pipeProgress)}
        />
        {/* 허브(240, 195) -> 노드3 하단(240, 305) */}
        <path
          d="M 240 195 L 240 305"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3"
          strokeDasharray="110"
          strokeDashoffset={110 * (1 - pipeProgress)}
        />

        {/* 파이프 위를 달리는 프리즘 블루 데이터 펄스 점 */}
        {pipeProgress > 0.8 ? (
          <>
            <circle
              cx={240 + (95 - 240) * pulseT1}
              cy={195 + (120 - 195) * Math.pow(pulseT1, 1.2)}
              r="4"
              fill="#1273c4"
            />
            <circle
              cx={240 + (385 - 240) * pulseT2}
              cy={195 + (120 - 195) * Math.pow(pulseT2, 1.2)}
              r="4"
              fill="#1273c4"
            />
            <circle
              cx={240}
              cy={195 + (305 - 195) * pulseT3}
              r="4"
              fill="#1273c4"
            />
          </>
        ) : null}
      </svg>

      {/* 위성 노드 1: 모듈/파일 보관함 (좌상단) */}
      <div
        style={{
          position: 'absolute',
          left: 55,
          top: 85,
          width: 80,
          height: 68,
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '3px solid #d5d2cc',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          transform: `scale(${node1Scale}) translateY(${floatNode1}px)`,
          opacity: satelliteOpacity,
        }}
      >
        <div
          style={{
            width: 32,
            height: 6,
            borderRadius: '3px',
            backgroundColor: '#1273c4',
          }}
        />
        <div
          style={{
            width: 48,
            height: 5,
            borderRadius: '3px',
            backgroundColor: '#d5d2cc',
          }}
        />
        <div
          style={{
            width: 38,
            height: 5,
            borderRadius: '3px',
            backgroundColor: '#e8f2fb',
          }}
        />
      </div>

      {/* 위성 노드 2: 패키지/라이브러리 블록 (우상단) */}
      <div
        style={{
          position: 'absolute',
          left: 345,
          top: 85,
          width: 80,
          height: 68,
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '3px solid #d5d2cc',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${node2Scale}) translateY(${floatNode2}px)`,
          opacity: satelliteOpacity,
        }}
      >
        {/* 미니 큐브 벡터 */}
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path
            d="M 18 5 L 31 12 L 18 19 L 5 12 Z"
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M 5 12 L 5 24 L 18 31 L 18 19 Z"
            fill="#ffffff"
            stroke="#d5d2cc"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M 31 12 L 31 24 L 18 31 L 18 19 Z"
            fill="#ffffff"
            stroke="#1273c4"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 위성 노드 3: 배포 및 공유 커넥터 (하단) */}
      <div
        style={{
          position: 'absolute',
          left: 200,
          top: 280,
          width: 80,
          height: 50,
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '3px solid #d5d2cc',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          transform: `scale(${node3Scale}) translateY(${floatNode3}px)`,
          opacity: satelliteOpacity,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#1273c4',
          }}
        />
        <div
          style={{
            width: 24,
            height: 4,
            borderRadius: '2px',
            backgroundColor: '#d5d2cc',
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#43474b',
          }}
        />
      </div>

      {/* 중앙 메인 허브 리포지토리 코어 */}
      <div
        style={{
          position: 'absolute',
          left: 175,
          top: 130,
          width: 130,
          height: 130,
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '3px solid #101113',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          zIndex: 5,
          transform: `scale(${hubIntroScale * focusScale}) translateY(${floatHub}px)`,
          opacity: hubIntroOpacity,
        }}
      >
        {/* 브랜치 트리 벡터 심볼 */}
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          {/* 메인 트렁크 라인 */}
          <line
            x1="20"
            y1="14"
            x2="20"
            y2="42"
            stroke="#101113"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* 분기 브랜치 라인 */}
          <path
            d="M 20 32 C 20 23, 36 25, 36 18"
            stroke="#1273c4"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* 트렁크 노드 점들 */}
          <circle cx="20" cy="14" r="5" fill="#101113" />
          <circle cx="20" cy="42" r="5" fill="#101113" />
          {/* 브랜치 노드 점 (프리즘 블루) */}
          <circle cx="36" cy="16" r="6" fill="#1273c4" />
          <circle cx="36" cy="16" r="3" fill="#ffffff" />
        </svg>

        {/* 허브 명칭 태그 배지 */}
        {hubTag ? (
          <div
            style={{
              backgroundColor: '#e8f2fb',
              border: '2px solid #1273c4',
              color: '#1273c4',
              borderRadius: '8px',
              padding: '3px 10px',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '-0.2px',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
            }}
          >
            {hubTag}
          </div>
        ) : null}
      </div>
    </div>
  );
};
