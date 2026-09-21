// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 520, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  officialTitle?: string;
  trustedDesc?: string;
  unknownTitle?: string;
}

export const SourceTrustCheck: React.FC<Props> = ({
  delay = 0,
  budget = 900,
  officialTitle = '',
  trustedDesc = '',
  unknownTitle = '',
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);

  // 1. 초기 등장 애니메이션 (첫 32프레임 내 완결)
  const introProgress = interpolate(t, [0, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const introScale = interpolate(t, [0, 32], [0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });

  // 2. 부유 모션 (연속 애니메이션)
  const idleY = Math.sin(t * 0.05) * 2.8;

  // 3. "누가 만든 목록인지 보는 건데요" (96~195f) 스캐너 스캔 빔
  const scanSweep = interpolate(t, [96, 130, 160, 195], [0, -42, 42, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.sin),
  });

  // 4. "모르는 곳에서 온 건 아예 안 까는 편이 안전해요" (570~715f) 차단 포커스
  const unknownScale = interpolate(
    t,
    [570, 600, 680, 715],
    [1, 1.12, 1.12, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) }
  );
  const unknownDim = interpolate(
    t,
    [720, 745, 830, 855],
    [1, 0.74, 0.74, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const blockStrike = interpolate(t, [595, 625], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 5. "공식 목록이나 신뢰할 수 있는 곳부터" (720~855f) 승인 포커스
  const officialScale = interpolate(
    t,
    [720, 745, 830, 855],
    [1, 1.14, 1.14, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) }
  );
  const officialDim = interpolate(
    t,
    [570, 600, 680, 715],
    [1, 0.74, 0.74, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 공식 인증 배지 펄스 링
  const pulseRing = (t * 0.05) % 1;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Pretendard, -apple-system, sans-serif',
        transform: `translateY(${idleY}px) scale(${introScale})`,
        opacity: introProgress,
      }}
    >
      {/* 상단: 출처 검증 돋보기 엠블럼 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: '#ffffff',
          border: '3px solid #d5d2cc',
          borderRadius: 16,
          padding: '8px 20px',
          boxShadow: '0 4px 12px rgba(16, 17, 19, 0.04)',
          marginBottom: 18,
        }}
      >
        <div style={{ transform: `rotate(${scanSweep}deg)`, transformOrigin: 'center center' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="12" cy="12" r="8" stroke="#1273c4" strokeWidth="3" fill="#e8f2fb" />
            <line x1="18" y1="18" x2="24" y2="24" stroke="#1273c4" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3" fill="#1273c4" />
          </svg>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1273c4' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1273c4' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d5d2cc' }} />
        </div>
      </div>

      {/* 하단 카드 비교 영역: [공식 목록] vs [모르는 곳] */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 480,
          gap: 20,
        }}
      >
        {/* 좌측: 공식 목록 / 신뢰할 수 있는 곳 */}
        <div
          style={{
            flex: 1,
            background: '#ffffff',
            border: '3px solid #d5d2cc',
            borderRadius: 16,
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${officialScale})`,
            opacity: officialDim,
            boxShadow: '0 6px 16px rgba(16, 17, 19, 0.04)',
            position: 'relative',
          }}
        >
          {/* 공식 인증 실드 아이콘 */}
          <div
            style={{
              width: 72,
              height: 72,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 52 + pulseRing * 24,
                height: 52 + pulseRing * 24,
                borderRadius: '50%',
                border: '2px solid #1273c4',
                opacity: (1 - pulseRing) * 0.6,
                pointerEvents: 'none',
              }}
            />

            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path
                d="M28 6L44 13V26C44 37 37 46 28 50C19 46 12 37 12 26V13L28 6Z"
                fill="#e8f2fb"
                stroke="#1273c4"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />
              <path
                d="M21 27L26 32L36 21"
                stroke="#1273c4"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {officialTitle && (
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#101113',
                textAlign: 'center',
                marginBottom: 4,
              }}
            >
              {officialTitle}
            </div>
          )}
          {trustedDesc && (
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: '#43474b',
                fontFamily: 'Spoqa Han Sans Neo, sans-serif',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              {trustedDesc}
            </div>
          )}
        </div>

        {/* 우측: 모르는 곳 (차단/비신뢰) */}
        <div
          style={{
            flex: 1,
            background: '#ffffff',
            border: '3px solid #d5d2cc',
            borderRadius: 16,
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${unknownScale})`,
            opacity: unknownDim,
            boxShadow: '0 6px 16px rgba(16, 17, 19, 0.04)',
            position: 'relative',
          }}
        >
          {/* 미확인 물음표 및 차단 빗장 */}
          <div
            style={{
              width: 72,
              height: 72,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
            }}
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect x="8" y="8" width="40" height="40" rx="10" stroke="#101113" strokeWidth="3.2" fill="#f0efec" />
              <path
                d="M23 22C23 19.5 25 18 28 18C31 18 33 19.5 33 22C33 24 31.5 25.5 28 27.5V31"
                stroke="#101113"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="28" cy="37" r="2" fill="#101113" />

              <line
                x1="12"
                y1="44"
                x2={12 + 32 * blockStrike}
                y2={44 - 32 * blockStrike}
                stroke="#43474b"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {unknownTitle && (
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#101113',
                textAlign: 'center',
                marginTop: 4,
              }}
            >
              {unknownTitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
