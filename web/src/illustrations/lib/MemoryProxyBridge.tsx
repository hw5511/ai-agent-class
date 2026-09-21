// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 480, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  sourceText?: string;
  targetText?: string;
}

export const MemoryProxyBridge: React.FC<Props> = ({
  delay = 0,
  budget = 630,
  sourceText = '',
  targetText = '',
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 초기 인입 (0~40f)
  const introProgress = interpolate(f, [0, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 2. 미세 지속 호흡 모션
  const floatA = Math.sin(f * 0.05) * 3;
  const floatB = Math.cos(f * 0.05) * 3;

  // 3. 브릿지 전송 펄스 모션 (385~490f)
  const transferPulse = (f * 0.04) % 1;

  // 4. "내 기억을 대신해줘요" 우측 카드 포커스 팝 (520~610f)
  const targetScale = interpolate(f, [515, 545, 600, 620], [1, 1.12, 1.12, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0, 0.38, 0.9),
  });
  const sourceDim = interpolate(f, [515, 545, 600, 620], [1, 0.78, 0.78, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px',
        boxSizing: 'border-box',
        backgroundColor: 'transparent',
      }}
    >
      {/* 1) 좌측: 사람의 생각/말 노드 */}
      <div
        style={{
          width: 160,
          height: 140,
          backgroundColor: '#ffffff',
          borderRadius: 18,
          border: '3.5px solid #d5d2cc',
          boxShadow: '0 8px 24px rgba(16, 17, 19, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 12px',
          boxSizing: 'border-box',
          transform: `translateY(${floatA}px) scale(${introProgress})`,
          opacity: introProgress * sourceDim,
          zIndex: 2,
        }}
      >
        {/* 음성/대화 벡터 심볼 */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: '#f0efec',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C7.58 2 4 5.13 4 9C4 11.24 5.22 13.22 7.12 14.47L6 19L10.38 16.82C10.9 16.94 11.44 17 12 17C16.42 17 20 13.87 20 9C20 5.13 16.42 2 12 2Z"
              stroke="#43474b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {sourceText ? (
          <span
            style={{
              fontFamily: 'Pretendard, -apple-system, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: '#101113',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            {sourceText}
          </span>
        ) : null}
      </div>

      {/* 2) 중앙: 연결 브릿지 & 흐르는 데이터 파티클 */}
      <div
        style={{
          position: 'absolute',
          left: 170,
          right: 170,
          top: '50%',
          height: 4,
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        {/* 배경 점선 라인 */}
        <svg width="100%" height="20" viewBox="0 0 140 20" fill="none">
          <line
            x1="0"
            y1="10"
            x2="140"
            y2="10"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
        </svg>

        {/* 흐르는 액센트 펄스 볼 */}
        <div
          style={{
            position: 'absolute',
            left: `${transferPulse * 100}%`,
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#1273c4',
            boxShadow: '0 0 8px rgba(18, 115, 196, 0.6)',
            transform: 'translate(-50%, -3px)',
          }}
        />
      </div>

      {/* 3) 우측: 기억을 대신하는 스킬 파일 노드 */}
      <div
        style={{
          width: 160,
          height: 140,
          backgroundColor: f >= 515 ? '#e8f2fb' : '#ffffff',
          borderRadius: 18,
          border: `3.5px solid ${f >= 515 ? '#1273c4' : '#d5d2cc'}`,
          boxShadow: f >= 515 ? '0 12px 28px rgba(18, 115, 196, 0.18)' : '0 8px 24px rgba(16, 17, 19, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 12px',
          boxSizing: 'border-box',
          transform: `translateY(${floatB}px) scale(${introProgress * targetScale})`,
          opacity: introProgress,
          zIndex: 2,
          transition: 'border 0.25s ease, background-color 0.25s ease',
        }}
      >
        {/* 파일/저장소 벡터 심볼 */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: f >= 515 ? '#1273c4' : '#f0efec',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H14L21 10V19C21 20.1 20.1 21 19 21Z"
              stroke={f >= 515 ? '#ffffff' : '#43474b'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 13L11 15L15 11"
              stroke={f >= 515 ? '#ffffff' : '#1273c4'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {targetText ? (
          <span
            style={{
              fontFamily: 'Pretendard, -apple-system, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: f >= 515 ? '#1273c4' : '#101113',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            {targetText}
          </span>
        ) : null}
      </div>
    </div>
  );
};
