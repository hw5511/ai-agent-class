// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export interface Props {
  delay?: number;
  budget: number;
  hooksText?: string;
  matcherText?: string;
  toolText?: string;
  scriptText?: string;
}

export const canvas = { w: 520, h: 360 };

export const HookMatcherFlow: React.FC<Props> = ({
  delay = 0,
  budget,
  hooksText = '',
  matcherText = '',
  toolText = '',
  scriptText = '',
}) => {
  const currentFrame = useCurrentFrame();
  const f = Math.max(0, currentFrame - delay);

  // 미세 부유 숨쉬기
  const idleFloat = Math.sin(f * 0.05) * 2.5;

  // 1. 초기 앵커 박스 진입 (0~30f: 첫 움직임 < 45f)
  const intro = interpolate(f, [0, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 2. matcher 도킹 슬롯 포커스 팝 (510~640f: 청크 #10~#12)
  const matcherFocus = interpolate(f, [510, 540, 620, 650], [1, 1.15, 1.15, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });

  // 3. Bash 도구 칩 결합 애니메이션 (670~760f: 청크 #13~#14)
  const bashSnap = interpolate(f, [670, 705], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.6)),
  });

  const snapPulse = interpolate(f, [705, 745], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. 스크립트 실행 트리거 파이프라인 흐름 (810~890f: 청크 #15~#17)
  const triggerFlow = interpolate(f, [810, 850], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  const scriptFocus = interpolate(f, [840, 875], [1, 1.14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });

  // Bash 칩 도킹 위치 계산
  const bashX = interpolate(bashSnap, [0, 1], [400, 290]);
  const bashOpacity = interpolate(bashSnap, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: 'relative',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 연결 배선 SVG */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* hooks -> matcher 연결선 */}
        <line
          x1={260}
          y1={72}
          x2={260}
          y2={150}
          stroke="#d5d2cc"
          strokeWidth={3.5}
        />
        {/* matcher -> 내 스크립트 파일 연결선 */}
        <line
          x1={260}
          y1={215}
          x2={260}
          y2={280}
          stroke="#d5d2cc"
          strokeWidth={3.5}
        />

        {/* 트리거 신호 빔 (하강) */}
        {triggerFlow > 0 && (
          <line
            x1={260}
            y1={215}
            x2={260}
            y2={215 + 65 * triggerFlow}
            stroke="#1273c4"
            strokeWidth={4.5}
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* 1. 상단: hooks 앵커 허브 */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          height: 48,
          backgroundColor: '#ffffff',
          borderRadius: 16,
          border: '3.5px solid #101113',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 4px 14px rgba(16, 17, 19, 0.05)',
          transform: `translateY(${idleFloat}px) scale(${intro})`,
          zIndex: 3,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path
            d="M6 4V11C6 14.5 8.5 17 12 17C15.5 17 18 14.5 18 11V7"
            stroke="#1273c4"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="6" cy="4" r="2" fill="#1273c4" />
        </svg>
        {hooksText !== '' && (
          <span
            style={{
              fontFamily: 'JetBrains Mono, Pretendard, sans-serif',
              fontSize: 16,
              fontWeight: 700,
              color: '#101113',
            }}
          >
            {hooksText}
          </span>
        )}
      </div>

      {/* 2. 중앙: matcher 도킹 베이 */}
      <div
        style={{
          position: 'absolute',
          top: 145,
          width: 320,
          height: 72,
          backgroundColor: '#ffffff',
          borderRadius: 18,
          border: '3.5px solid #1273c4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          boxShadow: '0 6px 18px rgba(18, 115, 196, 0.08)',
          transform: `scale(${matcherFocus}) translateY(${-idleFloat * 0.5}px)`,
          zIndex: 4,
        }}
      >
        {/* matcher 명칭 배지 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              backgroundColor: '#e8f2fb',
              padding: '6px 12px',
              borderRadius: 10,
              fontFamily: 'JetBrains Mono, Pretendard, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: '#1273c4',
            }}
          >
            {matcherText !== '' ? matcherText : 'matcher'}
          </div>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 9H14M14 9L10 5M14 9L10 13"
              stroke="#1273c4"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 결합 슬롯 자리표시자 */}
        <div
          style={{
            width: 110,
            height: 44,
            borderRadius: 12,
            border: '2px dashed #d5d2cc',
            backgroundColor: '#f0efec',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

        {/* 스냅 펄스 링 */}
        {snapPulse > 0 && snapPulse < 1 && (
          <div
            style={{
              position: 'absolute',
              right: 12,
              top: 10,
              width: 118,
              height: 52,
              borderRadius: 14,
              border: '2.5px solid #1273c4',
              opacity: 1 - snapPulse,
              transform: `scale(${1 + snapPulse * 0.2})`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* 3. 결합되는 Bash 도구 칩 */}
      {toolText !== '' && (
        <div
          style={{
            position: 'absolute',
            top: 159,
            left: bashX,
            width: 106,
            height: 44,
            backgroundColor: '#101113',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            opacity: bashOpacity,
            boxShadow: '0 4px 14px rgba(16, 17, 19, 0.18)',
            zIndex: 5,
          }}
        >
          <span
            style={{
              color: '#1273c4',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            $
          </span>
          <span
            style={{
              color: '#ffffff',
              fontFamily: 'JetBrains Mono, Pretendard, sans-serif',
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            {toolText}
          </span>
        </div>
      )}

      {/* 4. 하단: 실행할 내 스크립트 파일 블록 */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          width: 250,
          height: 56,
          backgroundColor: '#ffffff',
          borderRadius: 16,
          border: triggerFlow > 0.5 ? '3.5px solid #1273c4' : '3.5px solid #d5d2cc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          boxShadow:
            triggerFlow > 0.5
              ? '0 6px 18px rgba(18, 115, 196, 0.18)'
              : '0 4px 12px rgba(16, 17, 19, 0.04)',
          transform: `scale(${scriptFocus}) translateY(${idleFloat * 0.6}px)`,
          transition: 'border 0.2s ease',
          zIndex: 3,
        }}
      >
        <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
          <path
            d="M4 3H14L18 7V21H4V3Z"
            stroke={triggerFlow > 0.5 ? '#1273c4' : '#43474b'}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path
            d="M14 3V7H18"
            stroke={triggerFlow > 0.5 ? '#1273c4' : '#43474b'}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <line
            x1="8"
            y1="13"
            x2="14"
            y2="13"
            stroke={triggerFlow > 0.5 ? '#1273c4' : '#43474b'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="17"
            x2="12"
            y2="17"
            stroke={triggerFlow > 0.5 ? '#1273c4' : '#43474b'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        {scriptText !== '' && (
          <span
            style={{
              fontFamily: 'Pretendard, "Spoqa Han Sans Neo", sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: triggerFlow > 0.5 ? '#1273c4' : '#101113',
            }}
          >
            {scriptText}
          </span>
        )}
      </div>
    </div>
  );
};
