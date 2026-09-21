// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 480, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  bundleTitle?: string;
  libraryBadge?: string;
  featureLabel?: string;
}

export const LibraryBundleBox: React.FC<Props> = ({
  delay = 0,
  budget,
  bundleTitle = '',
  libraryBadge = '',
  featureLabel = '',
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 상시 부유 호흡 애니메이션 (생명력 유지)
  const floatY = Math.sin(frame * 0.06) * 3.5;

  // 인트로 등장 애니메이션 (0~25f)
  const introProgress = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const introScale = interpolate(f, [0, 25], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const introY = interpolate(f, [0, 25], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 기능 묶음 헤더 라벨 활성화 (160~205f)
  const titleOpacity = interpolate(f, [160, 190], [0.4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleScale = interpolate(f, [160, 185, 205], [0.95, 1.05, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 핵심 기능 모듈 포커스 팝업 (240~275f)
  const focusScale = interpolate(f, [240, 275], [1, 1.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });
  const focusY = interpolate(f, [240, 275], [0, -12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const nonFocusOpacity = interpolate(f, [240, 275], [1, 0.74], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 라이브러리 명칭 배지 팝업 (295~340f)
  const badgeScale = interpolate(f, [295, 318, 340], [0, 1.14, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });
  const badgeOpacity = interpolate(f, [295, 310], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 기능 인출 및 하단 연결선 (410~475f)
  const connectLineH = interpolate(f, [410, 445], [0, 42], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const plugOpacity = interpolate(f, [410, 430], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulseRing = interpolate(f, [440, 475], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transform: `translateY(${introY + floatY}px) scale(${introScale})`,
        opacity: introProgress,
      }}
    >
      {/* 메인 번들 패키지 박스 */}
      <div
        style={{
          width: 400,
          height: 250,
          backgroundColor: '#ffffff',
          borderRadius: 20,
          border: '3.5px solid #d5d2cc',
          boxShadow: '0 12px 28px rgba(16, 17, 19, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px 20px',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* 상단 탭 및 라벨 바 */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          {/* 패키지 상단 그립 홈 */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#d5d2cc' }} />
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#d5d2cc' }} />
            <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#d5d2cc' }} />
          </div>

          {/* bundleTitle 라벨 (미리 만들어둔 기능 묶음) */}
          {bundleTitle ? (
            <div
              style={{
                fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                color: '#1273c4',
                backgroundColor: '#e8f2fb',
                padding: '4px 10px',
                borderRadius: 10,
                opacity: titleOpacity,
                transform: `scale(${titleScale})`,
              }}
            >
              {bundleTitle}
            </div>
          ) : null}

          {/* 우측 장식 블록 */}
          <div
            style={{
              width: 28,
              height: 10,
              borderRadius: 5,
              backgroundColor: '#f0efec',
              border: '1.5px solid #d5d2cc',
            }}
          />
        </div>

        {/* 모듈 보관 랙 (3개 슬롯) */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 12,
            marginTop: 4,
            position: 'relative',
          }}
        >
          {/* 보조 모듈 1 */}
          <div
            style={{
              flex: 1,
              height: 115,
              backgroundColor: '#f0efec',
              borderRadius: 14,
              border: '3px solid #d5d2cc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: nonFocusOpacity,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="5" y="5" width="22" height="22" rx="6" stroke="#7c8288" strokeWidth="3" />
              <line x1="10" y1="12" x2="22" y2="12" stroke="#7c8288" strokeWidth="3" strokeLinecap="round" />
              <line x1="10" y1="18" x2="18" y2="18" stroke="#7c8288" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div style={{ width: 36, height: 6, borderRadius: 3, backgroundColor: '#d5d2cc' }} />
          </div>

          {/* 중앙 핵심 모듈 2 (포커스 대상) */}
          <div
            style={{
              flex: 1.15,
              height: 130,
              backgroundColor: '#e8f2fb',
              borderRadius: 16,
              border: '3.5px solid #1273c4',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transform: `translateY(${focusY}px) scale(${focusScale})`,
              boxShadow: '0 8px 20px rgba(18, 115, 196, 0.16)',
              position: 'relative',
              zIndex: 3,
            }}
          >
            {/* 상단 라이브러리 명칭 배지 */}
            {libraryBadge ? (
              <div
                style={{
                  position: 'absolute',
                  top: -42,
                  backgroundColor: '#1273c4',
                  color: '#ffffff',
                  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: 14,
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: 12,
                  boxShadow: '0 6px 14px rgba(18, 115, 196, 0.3)',
                  transform: `scale(${badgeScale})`,
                  opacity: badgeOpacity,
                  whiteSpace: 'nowrap',
                }}
              >
                {libraryBadge}
                <div
                  style={{
                    position: 'absolute',
                    bottom: -5,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '5px solid #1273c4',
                  }}
                />
              </div>
            ) : null}

            {/* 기능 톱니 아이콘 */}
            <svg width="38" height="38" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="7" stroke="#1273c4" strokeWidth="3.5" />
              <path
                d="M18 4V8M18 28V32M4 18H8M28 18H32M8.1 8.1L10.9 10.9M25.1 25.1L27.9 27.9M8.1 27.9L10.9 25.1M25.1 10.9L27.9 8.1"
                stroke="#1273c4"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>

            {/* featureLabel ("기능") */}
            {featureLabel ? (
              <div
                style={{
                  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#1273c4',
                }}
              >
                {featureLabel}
              </div>
            ) : null}
          </div>

          {/* 보조 모듈 3 */}
          <div
            style={{
              flex: 1,
              height: 115,
              backgroundColor: '#f0efec',
              borderRadius: 14,
              border: '3px solid #d5d2cc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: nonFocusOpacity,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="10" stroke="#7c8288" strokeWidth="3" />
              <path d="M12 16L15 19L21 13" stroke="#7c8288" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ width: 36, height: 6, borderRadius: 3, backgroundColor: '#d5d2cc' }} />
          </div>
        </div>

        {/* 연결선 및 플러그 */}
        <div
          style={{
            position: 'absolute',
            bottom: -connectLineH,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 5,
            height: connectLineH,
            backgroundColor: '#1273c4',
            opacity: plugOpacity,
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: '#ffffff',
              border: '3.5px solid #1273c4',
            }}
          />
          {pulseRing > 0 ? (
            <div
              style={{
                position: 'absolute',
                bottom: -11,
                left: '50%',
                transform: `translateX(-50%) scale(${1 + pulseRing * 1.5})`,
                width: 24,
                height: 24,
                borderRadius: 12,
                border: '2px solid #1273c4',
                opacity: 1 - pulseRing,
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
