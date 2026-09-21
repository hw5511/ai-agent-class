// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 480, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  slowLabel?: string;
  fastLabel?: string;
  targetLabel?: string;
}

export const FastPathFinder: React.FC<Props> = ({
  delay = 0,
  budget,
  slowLabel = '',
  fastLabel = '',
  targetLabel = '',
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 카드 진입 애니메이션 (f: 0 ~ 25)
  const intro = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 상시 부유 호흡 애니메이션 (0프레임부터 지속)
  const floating = Math.sin(f * 0.07) * 2.5;

  // 수동 탐색: 방황하고 지연되는 궤적 진행도 (f: 15 ~ 180)
  const slowProgress = interpolate(f, [15, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 디버그 스킬: 직진으로 빠르고 시원하게 도달하는 궤적 (f: 20 ~ 75)
  const fastProgress = interpolate(f, [20, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 목표 지점 도달 시 펄스 (f >= 75)
  const targetPulseLoop = f >= 75 ? ((f - 75) % 40) / 40 : 0;
  const targetPulseRadius = 14 + targetPulseLoop * 20;
  const targetPulseOpacity = f >= 75 ? (1 - targetPulseLoop) * 0.7 : 0;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: 'relative',
        backgroundColor: '#f0efec',
        borderRadius: 20,
        padding: 20,
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'Pretendard, -apple-system, sans-serif',
      }}
    >
      {/* 트랙 1: 혼자 뒤지는 수동 탐색 (지체되고 복잡한 점선 궤적) */}
      <div
        style={{
          width: '100%',
          height: 122,
          backgroundColor: '#ffffff',
          border: '3px solid #d5d2cc',
          borderRadius: 16,
          padding: '12px 16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: `translateY(${floating}px)`,
          opacity: intro,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="#7c8288" strokeWidth="2" />
            <path d="M8 5V8.5L10.5 10" stroke="#7c8288" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {slowLabel ? (
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#7c8288',
              }}
            >
              {slowLabel}
            </span>
          ) : null}
        </div>

        {/* 지그재그 미로형 점선 경로 */}
        <div style={{ width: '100%', height: 48, position: 'relative' }}>
          <svg width="100%" height="48" viewBox="0 0 400 48" fill="none">
            <path
              d="M 10 24 L 70 8 L 130 40 L 190 12 L 250 36 L 310 16 L 380 24"
              stroke="#d5d2cc"
              strokeWidth="3"
              strokeDasharray="6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 헤매는 위치 점 */}
            <circle
              cx={10 + slowProgress * 300}
              cy={24 + Math.sin(slowProgress * 18) * 12}
              r="6"
              fill="#7c8288"
            />
          </svg>
        </div>
      </div>

      {/* 트랙 2: 디버그 스킬의 직선 원인 발견 (빠르고 명쾌한 액센트 궤적) */}
      <div
        style={{
          width: '100%',
          height: 138,
          backgroundColor: '#ffffff',
          border: '3px solid #1273c4',
          borderRadius: 16,
          padding: '14px 16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: `translateY(${floating}px)`,
          opacity: intro,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 8L8 14M2 8H13" stroke="#1273c4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {fastLabel ? (
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#1273c4',
                }}
              >
                {fastLabel}
              </span>
            ) : null}
          </div>

          {targetLabel ? (
            <div
              style={{
                backgroundColor: '#e8f2fb',
                border: '1.5px solid #1273c4',
                borderRadius: 6,
                padding: '3px 8px',
                fontSize: 13,
                fontWeight: 600,
                color: '#1273c4',
              }}
            >
              {targetLabel}
            </div>
          ) : null}
        </div>

        {/* 직선 화살표 및 도착지점 타겟 */}
        <div style={{ width: '100%', height: 56, position: 'relative' }}>
          <svg width="100%" height="56" viewBox="0 0 400 56" fill="none">
            {/* 베이스 가이드 라인 */}
            <path d="M 16 28 H 360" stroke="#e8f2fb" strokeWidth="6" strokeLinecap="round" />
            {/* 액센트 빔 궤적 */}
            <path
              d={`M 16 28 H ${16 + fastProgress * 344}`}
              stroke="#1273c4"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* 화살표 헤드 */}
            <circle
              cx={16 + fastProgress * 344}
              cy="28"
              r="6"
              fill="#1273c4"
            />

            {/* 도착 목표 노드 및 펄스 */}
            <g transform="translate(360, 28)">
              {f >= 75 && (
                <circle
                  cx="0"
                  cy="0"
                  r={targetPulseRadius}
                  stroke="#1273c4"
                  strokeWidth="2"
                  opacity={targetPulseOpacity}
                />
              )}
              <circle cx="0" cy="0" r="14" fill="#e8f2fb" stroke="#1273c4" strokeWidth="3" />
              <circle cx="0" cy="0" r="5" fill="#1273c4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
