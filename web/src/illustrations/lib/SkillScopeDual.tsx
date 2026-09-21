// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface SkillScopeDualProps {
  delay?: number;
  budget: number;
  projectFolderText?: string;
  projectScopeText?: string;
  userFolderText?: string;
  userScopeText?: string;
}

export const canvas = { w: 520, h: 320 };

export const SkillScopeDual: React.FC<SkillScopeDualProps> = ({
  delay = 0,
  budget,
  projectFolderText = '',
  projectScopeText = '',
  userFolderText = '',
  userScopeText = '',
}) => {
  const currentFrame = useCurrentFrame();
  const f = Math.max(0, currentFrame - delay);

  // 상시 미세 부유 운동
  const floatL = Math.sin(f * 0.07) * 2.5;
  const floatR = Math.cos(f * 0.08) * 2.5;

  // 등장 애니메이션 (0~45f 이내 첫 움직임)
  const enterL = interpolate(f, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const enterR = interpolate(f, [15, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 좌측 프로젝트 포커스 구간 (612~745f 대역 전후 대응)
  const focusLeft = interpolate(f, [40, 75, 170, 210], [1, 1.08, 1.08, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const opacityRight = interpolate(f, [40, 75, 170, 210], [1, 0.78, 0.78, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 우측 계정 포커스 구간 (782~874f 대역 전후 대응)
  const focusRight = interpolate(f, [215, 255, 360, 400], [1, 1.08, 1.08, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const opacityLeft = interpolate(f, [215, 255, 360, 400], [1, 0.78, 0.78, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 공유 펄스 라인 웨이브
  const pulseLoop = (f % 50) / 50;
  const orbitAngle = (f * 0.06) % (Math.PI * 2);

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
        fontFamily: 'Pretendard, -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* 1. 프로젝트 폴더 카드 (팀원 공유) */}
      <div
        style={{
          width: 236,
          height: 270,
          backgroundColor: '#ffffff',
          borderRadius: 18,
          border: '3.5px solid #101113',
          boxShadow: '0 8px 24px rgba(16, 17, 19, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 14px 16px 14px',
          boxSizing: 'border-box',
          opacity: enterL * opacityLeft,
          transform: `translateY(${floatL}px) scale(${enterL * focusLeft})`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* 프로젝트 메인 폴더 아이콘 */}
        <div style={{ position: 'relative', width: 68, height: 48, marginBottom: 12 }}>
          <div
            style={{
              position: 'absolute',
              top: -7,
              left: 4,
              width: 26,
              height: 10,
              backgroundColor: '#e8b338',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              border: '2.5px solid #101113',
              borderBottom: 'none',
            }}
          />
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f3c444',
              borderRadius: 8,
              border: '2.5px solid #101113',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* 스킬 마크 */}
            <div
              style={{
                width: 14,
                height: 18,
                backgroundColor: '#ffffff',
                borderRadius: 3,
                border: '1.5px solid #101113',
              }}
            />
          </div>
        </div>

        {/* 연결 파이프 / 전파 선 */}
        <svg width="150" height="30" viewBox="0 0 150 30" fill="none">
          <path
            d="M75 0V12M75 12H24V28M75 12H126V28"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* 전파되는 액센트 블루 펄스 닷 */}
          <circle
            cx={24 + (75 - 24) * (1 - pulseLoop)}
            cy="12"
            r="3.5"
            fill="#1273c4"
          />
          <circle
            cx={75 + (126 - 75) * pulseLoop}
            cy="12"
            r="3.5"
            fill="#1273c4"
          />
        </svg>

        {/* 공유받는 팀원 아바타 3인 */}
        <div style={{ display: 'flex', gap: 18, marginTop: 4, marginBottom: 16 }}>
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: idx === 1 ? '#e8f2fb' : '#f0efec',
                border: `2.5px solid ${idx === 1 ? '#1273c4' : '#101113'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" fill={idx === 1 ? '#1273c4' : '#43474b'} />
                <path
                  d="M2.5 13.5C2.5 10.8 5 9.5 8 9.5C11 9.5 13.5 10.8 13.5 13.5"
                  stroke={idx === 1 ? '#1273c4' : '#43474b'}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* 텍스트 영역: 폴더 이름 & 범위 라벨 */}
        {projectFolderText && (
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: '#101113',
              marginBottom: 4,
            }}
          >
            {projectFolderText}
          </div>
        )}
        {projectScopeText && (
          <div
            style={{
              backgroundColor: '#e8f2fb',
              color: '#1273c4',
              borderRadius: 6,
              padding: '3px 9px',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {projectScopeText}
          </div>
        )}
      </div>

      {/* 2. 내 계정 폴더 카드 (항상 따라옴) */}
      <div
        style={{
          width: 236,
          height: 270,
          backgroundColor: '#ffffff',
          borderRadius: 18,
          border: '3.5px solid #101113',
          boxShadow: '0 8px 24px rgba(16, 17, 19, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 14px 16px 14px',
          boxSizing: 'border-box',
          opacity: enterR * opacityRight,
          transform: `translateY(${floatR}px) scale(${enterR * focusRight})`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* 사용자 중심 + 위성 궤도 시스템 */}
        <div
          style={{
            position: 'relative',
            width: 106,
            height: 106,
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 궤도 점선 가이드 원 */}
          <div
            style={{
              position: 'absolute',
              width: 86,
              height: 86,
              borderRadius: 43,
              border: '2.5px dashed #d5d2cc',
            }}
          />

          {/* 중앙 내 계정 본체 */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#f0efec',
              border: '3px solid #101113',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4.5" fill="#101113" />
              <path
                d="M4 19C4 15.5 7.5 14 12 14C16.5 14 20 15.5 20 19"
                stroke="#101113"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 궤도를 공전하며 항상 따라다니는 스킬 파일 위성 */}
          <div
            style={{
              position: 'absolute',
              width: 24,
              height: 28,
              backgroundColor: '#ffffff',
              border: '2.5px solid #1273c4',
              borderRadius: 5,
              zIndex: 2,
              transform: `translate(${Math.cos(orbitAngle) * 43}px, ${Math.sin(orbitAngle) * 43}px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(18, 115, 196, 0.3)',
            }}
          >
            <div style={{ width: 10, height: 2, backgroundColor: '#1273c4', borderRadius: 1 }} />
          </div>
        </div>

        {/* 텍스트 영역: 폴더 이름 & 특성 라벨 */}
        {userFolderText && (
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: '#101113',
              marginBottom: 4,
            }}
          >
            {userFolderText}
          </div>
        )}
        {userScopeText && (
          <div
            style={{
              backgroundColor: '#e8f2fb',
              color: '#1273c4',
              borderRadius: 6,
              padding: '3px 9px',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {userScopeText}
          </div>
        )}
      </div>
    </div>
  );
};
