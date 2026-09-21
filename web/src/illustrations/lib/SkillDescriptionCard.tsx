// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing, interpolateColors } from 'remotion';

interface Props {
  delay?: number;
  budget: number;
  skillText?: string;
  actionText?: string;
  descText?: string;
}

export const canvas = { w: 460, h: 260 };

export const SkillDescriptionCard: React.FC<Props> = ({
  delay = 0,
  budget,
  skillText = '',
  actionText = '',
  descText = '',
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 미세한 부유 연속 모션
  const floatY = Math.sin(f * 0.045) * 2.2;

  // 1. 좌측 스킬 아이템 등장 (0~24프레임)
  const leftScale = interpolate(f, [0, 16, 24], [0.85, 1.05, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });
  const leftOpacity = interpolate(f, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. 우측 설명 카드로 이어지는 연결 선 전개 (16~36프레임)
  const lineProgress = interpolate(f, [16, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 3. 우측 설명 카드 슬라이드 언폴드 (26~48프레임)
  const rightOpacity = interpolate(f, [26, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rightX = interpolate(f, [26, 46], [-12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 4. 설명 줄 포커스 팝 안무 (65~105프레임: "옆에 무엇을 하는지 한 줄씩 적혀 있어요")
  const focusScale = interpolate(f, [65, 84, 100], [1, 1.12, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const descBorder = interpolateColors(
    f,
    [65, 84],
    ['#d5d2cc', '#1273c4']
  );
  const descBg = interpolateColors(
    f,
    [65, 84],
    ['#ffffff', '#e8f2fb']
  );
  const leftDimOpacity = interpolate(f, [65, 84], [1, 0.74], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const highlightTagScale = interpolate(f, [72, 88], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateY(${floatY}px)`,
        padding: '16px 20px',
      }}
    >
      {/* 좌측 스킬 식별 카드 */}
      <div
        style={{
          opacity: leftOpacity * leftDimOpacity,
          transform: `scale(${leftScale})`,
          width: 120,
          borderRadius: 16,
          backgroundColor: '#ffffff',
          border: '3px solid #d5d2cc',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 6px 18px rgba(16, 17, 19, 0.05)',
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            backgroundColor: '#1273c4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M12 2L14.7 9.3L22 12L14.7 14.7L12 22L9.3 14.7L2 12L9.3 9.3L12 2Z" />
          </svg>
        </div>
        {skillText ? (
          <span
            style={{
              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              color: '#101113',
              textAlign: 'center',
            }}
          >
            {skillText}
          </span>
        ) : null}
      </div>

      {/* 중앙 연결 화살표 벡터 */}
      <div
        style={{
          width: 44,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="44" height="24" viewBox="0 0 44 24" fill="none">
          <line
            x1="4"
            y1="12"
            x2={4 + 32 * lineProgress}
            y2="12"
            stroke="#1273c4"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {lineProgress > 0.8 ? (
            <polyline
              points="30 6 38 12 30 18"
              stroke="#1273c4"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
        </svg>
      </div>

      {/* 우측 설명 안내 카드 (설명 시점 포커스 팝) */}
      <div
        style={{
          opacity: rightOpacity,
          transform: `translateX(${rightX}px) scale(${focusScale})`,
          flex: 1,
          borderRadius: 16,
          backgroundColor: descBg,
          border: `3px solid ${descBorder}`,
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          boxShadow:
            f >= 65
              ? '0 10px 28px rgba(18, 115, 196, 0.18)'
              : '0 6px 18px rgba(16, 17, 19, 0.05)',
          boxSizing: 'border-box',
          zIndex: 2,
        }}
      >
        {/* 상단 액션 역할 라벨 */}
        {actionText ? (
          <div
            style={{
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 10px',
              borderRadius: 9999,
              backgroundColor: '#ffffff',
              border: '2px solid #1273c4',
              transform: `scale(${highlightTagScale})`,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 9999,
                backgroundColor: '#1273c4',
              }}
            />
            <span
              style={{
                fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 13,
                fontWeight: 700,
                color: '#1273c4',
              }}
            >
              {actionText}
            </span>
          </div>
        ) : null}

        {/* 설명 줄 본문 박스 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            borderRadius: 8,
            backgroundColor: '#ffffff',
            border: '2px solid #d5d2cc',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1273c4"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {descText ? (
            <span
              style={{
                fontFamily:
                  'Spoqa Han Sans Neo, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 15,
                fontWeight: 600,
                color: '#101113',
                lineHeight: 1.3,
              }}
            >
              {descText}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
