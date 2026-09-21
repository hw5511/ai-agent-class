// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 540, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  sequentialLabel?: string;
  parallelLabel?: string;
  speedBadge?: string;
}

export const ParallelSpeedComparison: React.FC<Props> = ({
  delay = 0,
  budget = 900,
  sequentialLabel = '',
  parallelLabel = '',
  speedBadge = '',
}) => {
  const frame = useCurrentFrame();
  const current = Math.max(0, frame - delay);

  // 미세 부유 생명력 모션
  const aliveFloat = Math.sin(current * 0.08) * 2;
  const pulseAccent = 1 + Math.sin(current * 0.12) * 0.04;

  // 전체 컨테이너 등장 (0 ~ 25)
  const containerOpacity = interpolate(current, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // [상단 트랙: 순차 실행] 3단계가 차례대로 끝나기를 기다림
  // 1단계 실행 (15 ~ 55)
  const seqStep1 = interpolate(current, [15, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });
  // 2단계 실행 (55 ~ 95) - 1단계 끝날 때까지 대기
  const seqStep2 = interpolate(current, [55, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });
  // 3단계 실행 (95 ~ 135) - 2단계 끝날 때까지 대기
  const seqStep3 = interpolate(current, [95, 135], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // [하단 트랙: 병렬 동시 실행] 3개가 기다림 없이 동시에 시작하여 끝남 (25 ~ 65)
  const parallelProgress = interpolate(current, [25, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // 속도 장점 배지 팝업 (65 ~ 95)
  const badgeOpacity = interpolate(current, [65, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const badgeScale = interpolate(current, [65, 90], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.6)),
  });

  // 절약된 시간 영역 하이라이트 (65 ~ 100)
  const savedAreaOpacity = interpolate(current, [65, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 540,
        height: 360,
        backgroundColor: '#ffffff',
        borderRadius: 18,
        border: '3px solid #d5d2cc',
        boxSizing: 'border-box',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: containerOpacity,
        overflow: 'hidden',
      }}
    >
      {/* 1. 상단: 순차 실행 트랙 (기다림 발생) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* 순차 라벨 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <circle cx={9} cy={9} r={7} stroke="#43474b" strokeWidth={2.5} />
            <path
              d="M9 5 V9 H12"
              stroke="#43474b"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
          {sequentialLabel ? (
            <span
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: '#43474b',
              }}
            >
              {sequentialLabel}
            </span>
          ) : null}
        </div>

        {/* 순차 타임라인 레일 */}
        <div
          style={{
            position: 'relative',
            width: 488,
            height: 48,
            backgroundColor: '#f0efec',
            borderRadius: 12,
            border: '2px solid #d5d2cc',
            boxSizing: 'border-box',
            padding: 4,
            display: 'flex',
            gap: 6,
          }}
        >
          {/* 순차 1구간 */}
          <div
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#ffffff',
              borderRadius: 8,
              border: '2px solid #43474b',
              boxSizing: 'border-box',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${seqStep1 * 100}%`,
                height: '100%',
                backgroundColor: '#43474b',
              }}
            />
          </div>

          {/* 순차 2구간 (1구간 대기 후 실행) */}
          <div
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#ffffff',
              borderRadius: 8,
              border: seqStep1 >= 1 ? '2px solid #43474b' : '2px dashed #d5d2cc',
              boxSizing: 'border-box',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${seqStep2 * 100}%`,
                height: '100%',
                backgroundColor: '#43474b',
              }}
            />
          </div>

          {/* 순차 3구간 (2구간 대기 후 실행) */}
          <div
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#ffffff',
              borderRadius: 8,
              border: seqStep2 >= 1 ? '2px solid #43474b' : '2px dashed #d5d2cc',
              boxSizing: 'border-box',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${seqStep3 * 100}%`,
                height: '100%',
                backgroundColor: '#43474b',
              }}
            />
          </div>
        </div>
      </div>

      {/* 구분 구분선 */}
      <div
        style={{
          width: '100%',
          height: 2,
          backgroundColor: '#d5d2cc',
        }}
      />

      {/* 2. 하단: 병렬 동시 실행 트랙 (동시 완료 & 속도 우위) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          transform: `translateY(${aliveFloat}px)`,
        }}
      >
        {/* 병렬 라벨 및 속도 배지 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
              <rect
                x={2}
                y={2}
                width={14}
                height={14}
                rx={4}
                stroke="#1273c4"
                strokeWidth={2.5}
              />
              <path
                d="M5 9 H13"
                stroke="#1273c4"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <path
                d="M9 5 V13"
                stroke="#1273c4"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
            {parallelLabel ? (
              <span
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#101113',
                }}
              >
                {parallelLabel}
              </span>
            ) : null}
          </div>

          {/* 속도 하이라이트 배지 */}
          {speedBadge ? (
            <div
              style={{
                backgroundColor: '#e8f2fb',
                border: '2px solid #1273c4',
                borderRadius: 8,
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                opacity: badgeOpacity,
                transform: `scale(${badgeScale * pulseAccent})`,
              }}
            >
              <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1 L3 8 H7 L6 13 L11 6 H7 L8 1 Z"
                  fill="#1273c4"
                  stroke="#1273c4"
                  strokeWidth={1}
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#1273c4',
                }}
              >
                {speedBadge}
              </span>
            </div>
          ) : null}
        </div>

        {/* 병렬 타임라인 레일 */}
        <div
          style={{
            position: 'relative',
            width: 488,
            height: 84,
            backgroundColor: '#f0efec',
            borderRadius: 12,
            border: '2px solid #d5d2cc',
            boxSizing: 'border-box',
            padding: 6,
            display: 'flex',
          }}
        >
          {/* 동시 실행 3단 스택 (전체 레일의 1/3 시간만에 동시 완료) */}
          <div
            style={{
              width: 156,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {[0, 1, 2].map((rowIdx) => (
              <div
                key={rowIdx}
                style={{
                  width: '100%',
                  height: 20,
                  backgroundColor: '#ffffff',
                  borderRadius: 6,
                  border: '2px solid #1273c4',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${parallelProgress * 100}%`,
                    height: '100%',
                    backgroundColor: '#1273c4',
                  }}
                />
              </div>
            ))}
          </div>

          {/* 동시 완료 세로 지점 플래그 */}
          <div
            style={{
              position: 'absolute',
              left: 162,
              top: 0,
              bottom: 0,
              width: 3,
              backgroundColor: '#1273c4',
              zIndex: 3,
            }}
          />

          {/* 절약된 시간 영역 시각화 (하이라이트 대시 패턴) */}
          <div
            style={{
              position: 'absolute',
              left: 168,
              top: 6,
              right: 6,
              bottom: 6,
              backgroundColor: '#e8f2fb',
              borderRadius: 8,
              border: '2px dashed #1273c4',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: savedAreaOpacity,
              zIndex: 1,
            }}
          >
            <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
              <path
                d="M8 16 L14 22 L24 10"
                stroke="#1273c4"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
