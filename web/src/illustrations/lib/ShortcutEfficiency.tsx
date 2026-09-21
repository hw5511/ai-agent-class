// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 520, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  heavyEffortLabel?: string;
  installStepLabel?: string;
  importStepLabel?: string;
  finishLabel?: string;
}

export const ShortcutEfficiency: React.FC<Props> = ({
  delay = 0,
  budget,
  heavyEffortLabel = '',
  installStepLabel = '',
  importStepLabel = '',
  finishLabel = '',
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 상시 부유 호흡 애니메이션
  const floatA = Math.sin(frame * 0.05) * 3;
  const floatB = Math.cos(frame * 0.05) * 3;

  // 전체 인트로 등장 (0~25f)
  const enterProgress = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const enterScale = interpolate(f, [0, 25], [0.94, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 상단 직접 계산 레인: 느린 진행과 버벅거림 (560~660f)
  const manualDotProgress = interpolate(f, [560, 660], [0, 68], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shake = f >= 580 && f <= 670 ? Math.sin(f * 0.9) * 1.5 : 0;

  // 며칠 걸릴 일 라벨 등장 (615~650f)
  const heavyOpacity = interpolate(f, [615, 640], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const heavyScale = interpolate(f, [615, 635, 650], [0.85, 1.08, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 하단 단축 경로로 포커스 전환 시 상단 딤 (690~720f)
  const upperDimOpacity = interpolate(f, [690, 720], [1, 0.74], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 1단계: 설치 한 줄 팝업 (698~730f)
  const installScale = interpolate(f, [698, 715, 730], [1, 1.14, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const installActive = interpolate(f, [698, 712], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 광선 이동 (715~735f)
  const beamProgress = interpolate(f, [715, 735], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2단계: 불러오기 한 줄 팝업 (729~760f)
  const importScale = interpolate(f, [729, 745, 760], [1, 1.14, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const importActive = interpolate(f, [729, 742], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 최종 완료 & 딱 끝나는 거죠 배지 (769~805f)
  const finishPop = interpolate(f, [769, 788, 805], [0, 1.15, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });
  const finishOpacity = interpolate(f, [769, 782], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 결과물 축소 완료 펄스 (769~800f)
  const resultScale = interpolate(f, [769, 785, 800], [0.8, 1.18, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        transform: `scale(${enterScale})`,
        opacity: enterProgress,
        boxSizing: 'border-box',
        padding: 10,
      }}
    >
      {/* 1. 상단 레인: 직접 픽셀 계산 (복잡하고 긴 경로) */}
      <div
        style={{
          width: 480,
          height: 135,
          backgroundColor: '#ffffff',
          borderRadius: 18,
          border: '3px solid #d5d2cc',
          boxShadow: '0 8px 20px rgba(16, 17, 19, 0.04)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          position: 'relative',
          opacity: upperDimOpacity,
          transform: `translateY(${floatA + shake}px)`,
          boxSizing: 'border-box',
        }}
      >
        {/* 원본 사진 심볼 */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: '#f0efec',
            border: '2.5px solid #d5d2cc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="#43474b" strokeWidth="2" />
            <circle cx="8.5" cy="8.5" r="1.8" fill="#43474b" />
            <path d="M4 17L8.5 12L13 16.5L16.5 13L20 17" stroke="#43474b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* 꼬불꼬불 미로/연산 중간 경로 */}
        <div
          style={{
            flex: 1,
            height: 60,
            margin: '0 16px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg width="100%" height="40" viewBox="0 0 220 40" fill="none" style={{ overflow: 'visible' }}>
            <path
              d="M 10 20 Q 35 0, 60 20 T 110 20 T 160 20 T 210 20"
              stroke="#d5d2cc"
              strokeWidth="3"
              strokeDasharray="5 5"
              fill="none"
            />
            <circle
              cx={15 + manualDotProgress * 2.5}
              cy="20"
              r="6"
              fill="#7c8288"
            />
          </svg>

          {/* 픽셀 격자 연산 아이콘 */}
          <div
            style={{
              position: 'absolute',
              left: '48%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 30,
              height: 30,
              backgroundColor: '#f0efec',
              borderRadius: 8,
              border: '2px solid #d5d2cc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M2 5H14M2 11H14M5 2V14M11 2V14" stroke="#7c8288" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* heavyEffortLabel ("며칠 걸릴 일") */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
          {heavyEffortLabel ? (
            <div
              style={{
                fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                color: '#43474b',
                backgroundColor: '#f0efec',
                border: '1.5px solid #d5d2cc',
                padding: '4px 10px',
                borderRadius: 10,
                opacity: heavyOpacity,
                transform: `scale(${heavyScale})`,
                whiteSpace: 'nowrap',
              }}
            >
              {heavyEffortLabel}
            </div>
          ) : null}
        </div>
      </div>

      {/* 2. 하단 레인: 라이브러리 활용 (단축 통로) */}
      <div
        style={{
          width: 480,
          height: 155,
          backgroundColor: '#ffffff',
          borderRadius: 20,
          border: '3.5px solid #1273c4',
          boxShadow: '0 12px 28px rgba(18, 115, 196, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          position: 'relative',
          transform: `translateY(${floatB}px)`,
          boxSizing: 'border-box',
        }}
      >
        {/* 원본 사진 심볼 */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: '#e8f2fb',
            border: '2.5px solid #1273c4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="#1273c4" strokeWidth="2.5" />
            <circle cx="8.5" cy="8.5" r="1.8" fill="#1273c4" />
            <path d="M4 17L8.5 12L13 16.5L16.5 13L20 17" stroke="#1273c4" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* 단축 연결 레일 & 두 개 노드 (설치 한 줄 -> 불러오기 한 줄) */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            position: 'relative',
            margin: '0 12px',
          }}
        >
          {/* 기저 고속 레일 선 */}
          <div
            style={{
              position: 'absolute',
              left: 10,
              right: 10,
              height: 4,
              backgroundColor: '#e8f2fb',
              borderRadius: 2,
              zIndex: 0,
            }}
          >
            <div
              style={{
                width: `${beamProgress * 100}%`,
                height: '100%',
                backgroundColor: '#1273c4',
                borderRadius: 2,
              }}
            />
          </div>

          {/* 노드 1: 설치 한 줄 */}
          {installStepLabel ? (
            <div
              style={{
                backgroundColor: installActive > 0.5 ? '#1273c4' : '#ffffff',
                border: '2.5px solid #1273c4',
                borderRadius: 14,
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transform: `scale(${installScale})`,
                zIndex: 1,
                boxShadow: installActive > 0.5 ? '0 4px 12px rgba(18, 115, 196, 0.25)' : 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2V10M8 10L5 7M8 10L11 7M3 13H13"
                  stroke={installActive > 0.5 ? '#ffffff' : '#1273c4'}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: 13,
                  fontWeight: 700,
                  color: installActive > 0.5 ? '#ffffff' : '#1273c4',
                  whiteSpace: 'nowrap',
                }}
              >
                {installStepLabel}
              </span>
            </div>
          ) : null}

          {/* 노드 2: 불러오기 한 줄 */}
          {importStepLabel ? (
            <div
              style={{
                backgroundColor: importActive > 0.5 ? '#1273c4' : '#ffffff',
                border: '2.5px solid #1273c4',
                borderRadius: 14,
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transform: `scale(${importScale})`,
                zIndex: 1,
                boxShadow: importActive > 0.5 ? '0 4px 12px rgba(18, 115, 196, 0.25)' : 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L14 7M14 7L10 11M14 7H5C3.3 7 2 8.3 2 10V13"
                  stroke={importActive > 0.5 ? '#ffffff' : '#1273c4'}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: 13,
                  fontWeight: 700,
                  color: importActive > 0.5 ? '#ffffff' : '#1273c4',
                  whiteSpace: 'nowrap',
                }}
              >
                {importStepLabel}
              </span>
            </div>
          ) : null}
        </div>

        {/* 우측 완성: 축소된 사진 및 finishLabel ("딱 끝나는 거죠") 배지 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            flexShrink: 0,
            position: 'relative',
          }}
        >
          {finishLabel ? (
            <div
              style={{
                position: 'absolute',
                top: -34,
                backgroundColor: '#1273c4',
                color: '#ffffff',
                fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 13,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 10,
                boxShadow: '0 4px 12px rgba(18, 115, 196, 0.3)',
                transform: `scale(${finishPop})`,
                opacity: finishOpacity,
                whiteSpace: 'nowrap',
              }}
            >
              {finishLabel}
            </div>
          ) : null}

          {/* 축소 완료 사진 카드 */}
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: '#1273c4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${resultScale})`,
              boxShadow: '0 4px 12px rgba(18, 115, 196, 0.25)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 13L9 17L19 7" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
