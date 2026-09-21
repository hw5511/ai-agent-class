// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 480, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  manualText?: string;
  skillText?: string;
}

export const SkillAcquiredIllustration: React.FC<Props> = ({
  delay = 0,
  budget,
  manualText = '',
  skillText = '',
}) => {
  const currentFrame = useCurrentFrame();
  const f = Math.max(0, currentFrame - delay);

  // 상시 미세 호흡 부유 모션
  const breathe = Math.sin(f * 0.08) * 3;

  // 1단계: 초기 진입 (0~40프레임)
  const enterOpacity = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const enterLift = interpolate(f, [0, 30], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 2단계: 신규 스킬 도착 알림 팝 (60~120프레임, '무엇이 들어왔는지 딱 알려주거든요')
  const arrivalPop = interpolate(
    f,
    [60, 85, 115],
    [0.7, 1.15, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)) }
  );

  // 3단계: 수작업 대조 강조 (140~210프레임, '손으로 만들던 걸')
  const manualFocus = interpolate(
    f,
    [140, 165, 200, 220],
    [1.0, 1.08, 1.08, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // 4단계: 스킬 인수 및 자동화 활성화 (230프레임~, '대신 해줄 스킬이 하나 생긴 거죠')
  const skillFinalPop = interpolate(f, [230, 270], [1.0, 1.18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const skillScale = f >= 230 ? skillFinalPop : (f >= 60 ? arrivalPop : 1.0);

  // 수작업 영역 딤 처리 (스킬이 주도권을 잡을 때 부드럽게 양보, 0.72 이상 유지)
  const manualDim = interpolate(f, [230, 270], [1.0, 0.74], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const manualScale = f >= 230
    ? interpolate(f, [230, 270], [1.0, 0.95], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : manualFocus;

  // 스킬 내부 기어/스파크 회전 모션
  const gearRotation = f * 1.2;

  // 우측 스킬 에너지 파동
  const ringScale = interpolate((f % 50), [0, 50], [0.9, 1.45]);
  const ringOpacity = interpolate((f % 50), [0, 50], [0.6, 0.0]);

  // 전달 화살표 동적 흐름 (왼쪽 작업 -> 오른쪽 스킬로 이동)
  const flowPhase = (f * 0.12) % 3;

  return (
    <div
      style={{
        position: 'relative',
        width: canvas.w,
        height: canvas.h,
        overflow: 'hidden',
        fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
        opacity: enterOpacity,
        transform: `translateY(${enterLift}px)`,
      }}
    >
      {/* 좌측: 손으로 만들던 작업 영역 (Manual Stage) */}
      <div
        style={{
          position: 'absolute',
          left: 45,
          top: 80 + (f < 230 ? breathe : 0),
          width: 160,
          height: 160,
          backgroundColor: '#ffffff',
          borderRadius: 18,
          border: '3px solid #d5d2cc',
          boxShadow: '0 4px 14px rgba(16, 17, 19, 0.05)',
          transform: `scale(${manualScale})`,
          transformOrigin: 'center center',
          opacity: manualDim,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          boxSizing: 'border-box',
        }}
      >
        {/* 수작업 드래프팅 & 반복 레이어 벡터 */}
        <div style={{ position: 'relative', width: 64, height: 64, marginBottom: 8 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            {/* 뒤편 누적된 작업 문서 레이어 */}
            <rect
              x="16"
              y="12"
              width="36"
              height="38"
              rx="4"
              fill="#f0efec"
              stroke="#d5d2cc"
              strokeWidth="2"
            />
            {/* 앞쪽 작업 문서 */}
            <rect
              x="10"
              y="18"
              width="36"
              height="38"
              rx="4"
              fill="#ffffff"
              stroke="#43474b"
              strokeWidth="2.5"
            />
            <line x1="16" y1="26" x2="38" y2="26" stroke="#d5d2cc" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="33" x2="34" y2="33" stroke="#d5d2cc" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="40" x2="28" y2="40" stroke="#d5d2cc" strokeWidth="2.5" strokeLinecap="round" />
            {/* 손 수작업 펜슬 도구 */}
            <path
              d="M 46 16 L 52 22 L 32 42 L 26 42 L 26 36 Z"
              fill="#ffffff"
              stroke="#101113"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 텍스트 라벨 */}
        {manualText !== '' && (
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#43474b',
              textAlign: 'center',
              letterSpacing: '-0.2px',
              whiteSpace: 'nowrap',
            }}
          >
            {manualText}
          </div>
        )}
      </div>

      {/* 중앙: 대행 전환 브릿지 (Kinetic Chevron Stream) */}
      <div
        style={{
          position: 'absolute',
          left: 215,
          top: 144,
          width: 50,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {[0, 1, 2].map((i) => {
          const isActive = Math.floor(flowPhase) === i;
          return (
            <svg key={i} width="12" height="18" viewBox="0 0 12 18" fill="none">
              <path
                d="M 2 2 L 9 9 L 2 16"
                stroke={isActive || f >= 230 ? '#1273c4' : '#d5d2cc'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );
        })}
      </div>

      {/* 우측: 대신 해줄 스킬 모듈 영역 (Skill Module Stage) */}
      <div
        style={{
          position: 'absolute',
          left: 275,
          top: 80 - (f >= 230 ? breathe : 0),
          width: 160,
          height: 160,
          backgroundColor: '#ffffff',
          borderRadius: 18,
          border: f >= 230 ? '3px solid #1273c4' : '3px solid #d5d2cc',
          boxShadow: f >= 230 ? '0 10px 28px rgba(18, 115, 196, 0.2)' : '0 4px 14px rgba(16, 17, 19, 0.05)',
          transform: `scale(${skillScale})`,
          transformOrigin: 'center center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          boxSizing: 'border-box',
        }}
      >
        {/* 스킬 활성화 방사 파동 (230프레임 이후) */}
        {f >= 230 && (
          <div
            style={{
              position: 'absolute',
              width: 90,
              height: 90,
              borderRadius: '50%',
              border: '2px solid #1273c4',
              transform: `scale(${ringScale})`,
              opacity: ringOpacity,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* 자동화 스킬 코어 벡터 (기어 & 빛나는 지능 스타) */}
        <div style={{ position: 'relative', width: 64, height: 64, marginBottom: 8 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            {/* 회전하는 정밀 기어 */}
            <g transform={`rotate(${gearRotation} 32 32)`}>
              <path
                d="M 32 14 L 35 18 L 40 17 L 41 22 L 46 23 L 45 28 L 50 31 L 47 35 L 50 39 L 45 42 L 45 47 L 40 47 L 38 52 L 33 50 L 30 53 L 28 48 L 23 48 L 23 43 L 18 41 L 20 36 L 16 33 L 19 29 L 17 24 L 22 23 L 23 18 L 28 19 Z"
                fill="#e8f2fb"
                stroke="#1273c4"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="32" r="8" fill="#ffffff" stroke="#1273c4" strokeWidth="2" />
            </g>

            {/* 중앙 능력 4각 스타 스파크 */}
            <path
              d="M 32 23 Q 32 32 23 32 Q 32 32 32 41 Q 32 32 41 32 Q 32 32 32 23 Z"
              fill="#1273c4"
            />
          </svg>
        </div>

        {/* 텍스트 라벨 (파란 액센트 알약 배지) */}
        {skillText !== '' && (
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#ffffff',
              backgroundColor: '#1273c4',
              padding: '4px 14px',
              borderRadius: 12,
              textAlign: 'center',
              letterSpacing: '-0.2px',
              boxShadow: '0 3px 8px rgba(18, 115, 196, 0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            {skillText}
          </div>
        )}
      </div>
    </div>
  );
};
