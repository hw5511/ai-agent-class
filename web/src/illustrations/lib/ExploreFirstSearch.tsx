// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 480, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  stepLabel?: string;
  foundLabel?: string;
}

export const ExploreFirstSearch: React.FC<Props> = ({
  delay = 0,
  budget,
  stepLabel = '',
  foundLabel = '',
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 초기 등장: 선반 및 보관된 블록들 슬라이드업 (0~35f)
  const shelfIntroY = interpolate(f, [0, 35], [35, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.3)),
  });
  const shelfIntroOpacity = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. 돋보기 스캐너 이동 궤적 (좌측 -> 중앙 블록 -> 우측 이미 만들어진 완성 블록)
  // 35~75f: 첫 번째 블록 위로 진입
  // 80~125f: 우측 세 번째 완성 블록으로 스캔 이동
  const lensX = interpolate(
    f,
    [30, 70, 85, 125],
    [90, 160, 160, 345],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const lensOpacity = interpolate(f, [25, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. 우측 완성 블록 발견 및 픽업 리프트 (130~175f)
  // "이미 만들어진 게 있는지부터 찾는다"는 의도에 따라 발견된 블록이 위로 솟아오름
  const targetLiftY = interpolate(f, [135, 175], [0, -32], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });
  const targetScale = interpolate(f, [135, 175], [1, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });

  // 비타겟 블록 살짝 딤 (규칙: 0.72 이상 유지)
  const otherBlocksOpacity = interpolate(f, [135, 170], [1, 0.75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. 발견 강조 배지 팝인 (150~180f)
  const foundBadgeScale = interpolate(f, [150, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.6)),
  });

  // 5. 상단 습관 라벨 팝인 (10~40f)
  const stepLabelY = interpolate(f, [10, 40], [-15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const stepLabelOpacity = interpolate(f, [10, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 6. 지속적 생명력 모션: 픽업된 블록 및 돋보기의 숨쉬는 부유
  const floatTarget = Math.sin(f * 0.06) * 4;
  const floatLens = Math.sin(f * 0.06 + 0.8) * 3;

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
      {/* 상단 습관 안내 텍스트 배지 */}
      {stepLabel ? (
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            transform: `translateY(${stepLabelY}px)`,
            opacity: stepLabelOpacity,
            zIndex: 10,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '3px solid #d5d2cc',
              borderRadius: '16px',
              padding: '6px 18px',
              fontSize: '15px',
              fontWeight: 700,
              color: '#101113',
              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '-0.2px',
            }}
          >
            {stepLabel}
          </div>
        </div>
      ) : null}

      {/* 하단 모듈 보관대/선반 베이스라인 */}
      <div
        style={{
          position: 'absolute',
          left: 50,
          right: 50,
          bottom: 70,
          height: 10,
          backgroundColor: '#d5d2cc',
          borderRadius: '5px',
          transform: `translateY(${shelfIntroY}px)`,
          opacity: shelfIntroOpacity,
        }}
      />

      {/* 모듈 블록 1: 일반 조각 A (좌측) */}
      <div
        style={{
          position: 'absolute',
          left: 75,
          bottom: 86,
          width: 86,
          height: 86,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '3px solid #d5d2cc',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          opacity: otherBlocksOpacity,
          transform: `translateY(${shelfIntroY}px)`,
        }}
      >
        <div
          style={{
            width: 44,
            height: 6,
            borderRadius: '3px',
            backgroundColor: '#d5d2cc',
          }}
        />
        <div
          style={{
            width: 32,
            height: 6,
            borderRadius: '3px',
            backgroundColor: '#f0efec',
          }}
        />
      </div>

      {/* 모듈 블록 2: 일반 조각 B (중앙) */}
      <div
        style={{
          position: 'absolute',
          left: 197,
          bottom: 86,
          width: 86,
          height: 86,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '3px solid #d5d2cc',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: otherBlocksOpacity,
          transform: `translateY(${shelfIntroY}px)`,
        }}
      >
        {/* 미니 브래킷 라인 */}
        <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
          <path
            d="M 14 6 L 6 15 L 14 24"
            stroke="#7c8288"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 26 6 L 34 15 L 26 24"
            stroke="#7c8288"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 모듈 블록 3: 우리가 찾던 "이미 만들어진 게" 완성 모듈! (우측) */}
      <div
        style={{
          position: 'absolute',
          left: 319,
          bottom: 86,
          width: 86,
          height: 86,
          backgroundColor: f > 135 ? '#e8f2fb' : '#ffffff',
          borderRadius: '16px',
          border: f > 135 ? '3px solid #1273c4' : '3px solid #d5d2cc',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          zIndex: 4,
          transform: `translateY(${shelfIntroY + targetLiftY + (f > 135 ? floatTarget : 0)}px) scale(${targetScale})`,
          transition: 'background-color 0.2s, border-color 0.2s',
        }}
      >
        {/* 완성된 모듈 블록 아이콘 */}
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
          <rect
            x="5"
            y="5"
            width="32"
            height="32"
            rx="8"
            fill={f > 135 ? '#ffffff' : '#f0efec'}
            stroke={f > 135 ? '#1273c4' : '#7c8288'}
            strokeWidth="3"
          />
          {/* 완성 체크 마크 */}
          <path
            d="M 13 21 L 19 27 L 29 15"
            stroke="#1273c4"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* 발견 시 상단에 떠오르는 파란 말풍선 배지 */}
        {foundLabel ? (
          <div
            style={{
              position: 'absolute',
              top: -38,
              left: '50%',
              transform: `translateX(-50%) scale(${foundBadgeScale})`,
              transformOrigin: 'bottom center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                backgroundColor: '#1273c4',
                color: '#ffffff',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: '-0.2px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 10px rgba(18, 115, 196, 0.25)',
              }}
            >
              {foundLabel}
            </div>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderTop: '5px solid #1273c4',
              }}
            />
          </div>
        ) : null}
      </div>

      {/* 탐색 돋보기 (스캐너) 벡터 */}
      <div
        style={{
          position: 'absolute',
          left: lensX - 36,
          bottom: 110 + (f > 135 ? targetLiftY * 0.4 : 0),
          width: 72,
          height: 72,
          pointerEvents: 'none',
          zIndex: 8,
          opacity: lensOpacity,
          transform: `translateY(${floatLens}px)`,
        }}
      >
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          {/* 돋보기 렌즈 원형 림 */}
          <circle
            cx="30"
            cy="30"
            r="24"
            fill="rgba(232, 242, 251, 0.45)"
            stroke="#1273c4"
            strokeWidth="4"
          />
          {/* 렌즈 내부 십자 조준선 */}
          <line
            x1="30"
            y1="18"
            x2="30"
            y2="24"
            stroke="#1273c4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="30"
            y1="36"
            x2="30"
            y2="42"
            stroke="#1273c4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="18"
            y1="30"
            x2="24"
            y2="30"
            stroke="#1273c4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="36"
            y1="30"
            x2="42"
            y2="30"
            stroke="#1273c4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* 돋보기 손잡이 */}
          <path
            d="M 47 47 L 64 64"
            stroke="#101113"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
