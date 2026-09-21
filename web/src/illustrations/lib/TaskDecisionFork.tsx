// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface Props {
  delay?: number;
  budget: number;
  criterionTitle?: string;
  oneOffTitle?: string;
  oneOffSub?: string;
  recurringTitle?: string;
  recurringSub?: string;
}

export const canvas = { w: 560, h: 360 };

export const TaskDecisionFork: React.FC<Props> = ({
  delay = 0,
  budget,
  criterionTitle = '',
  oneOffTitle = '',
  oneOffSub = '',
  recurringTitle = '',
  recurringSub = '',
}) => {
  const currentFrame = useCurrentFrame();
  const f = Math.max(0, currentFrame - delay);

  // Entrance animations
  const rootScale = interpolate(f, [0, 24], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const rootOpacity = interpolate(f, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pathProgress = interpolate(f, [15, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });

  const leftY = interpolate(f, [28, 52], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const leftOpacity = interpolate(f, [28, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rightY = interpolate(f, [34, 58], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const rightOpacity = interpolate(f, [34, 54], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Focus choreography: one-off branch first, then shifts focus to recurring branch
  const oneOffFocus = interpolate(f, [60, 85, 160, 190], [1, 1.05, 1.05, 0.98], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });
  const oneOffDim = interpolate(f, [170, 200], [1, 0.74], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const recurringFocus = interpolate(f, [170, 205], [0.98, 1.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });
  const recurringActive = interpolate(f, [175, 205], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Continuous micro-motion
  const floatY = Math.sin(f / 16) * 3;
  const loopAngle = (f * 2) % 360;

  return (
    <div
      style={{
        width: 560,
        height: 360,
        backgroundColor: '#f0efec',
        borderRadius: 18,
        border: '3px solid #d5d2cc',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Pretendard, sans-serif',
      }}
    >
      {/* SVG Branching Lines */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 560,
          height: 360,
          pointerEvents: 'none',
        }}
      >
        <path
          d="M 280 78 C 280 118, 146 118, 146 155"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 280 78 C 280 118, 146 118, 146 155"
          fill="none"
          stroke="#1273c4"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="145"
          strokeDashoffset={145 * (1 - pathProgress)}
          opacity={0.85}
        />
        <path
          d="M 280 78 C 280 118, 414 118, 414 155"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 280 78 C 280 118, 414 118, 414 155"
          fill="none"
          stroke="#1273c4"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="145"
          strokeDashoffset={145 * (1 - pathProgress)}
          opacity={0.85}
        />
      </svg>

      {/* Root Decision Node */}
      <div
        style={{
          position: 'absolute',
          top: 22,
          left: '50%',
          transform: `translateX(-50%) translateY(${floatY * 0.4}px) scale(${rootScale})`,
          opacity: rootOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          backgroundColor: '#ffffff',
          border: '3px solid #1273c4',
          borderRadius: 16,
          padding: '8px 20px',
          boxShadow: '0 4px 14px rgba(18, 115, 196, 0.08)',
          zIndex: 10,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3L20 12L12 21L4 12L12 3Z"
            stroke="#1273c4"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" fill="#1273c4" />
        </svg>
        {criterionTitle ? (
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#101113',
              fontFamily: 'Pretendard, sans-serif',
            }}
          >
            {criterionTitle}
          </span>
        ) : null}
      </div>

      {/* Left Branch Card: One-off task */}
      <div
        style={{
          position: 'absolute',
          left: 28,
          top: 155,
          width: 236,
          height: 178,
          backgroundColor: '#ffffff',
          border: '3px solid #d5d2cc',
          borderRadius: 16,
          padding: '16px',
          boxSizing: 'border-box',
          opacity: leftOpacity * oneOffDim,
          transform: `translateY(${leftY + floatY}px) scale(${oneOffFocus})`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 5,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: '#f0efec',
              border: '2px solid #d5d2cc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="#43474b"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              backgroundColor: '#f0efec',
              border: '1.5px solid #d5d2cc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#7c8288',
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          {oneOffTitle ? (
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#101113',
                fontFamily: 'Pretendard, sans-serif',
                marginBottom: 6,
                lineHeight: 1.3,
              }}
            >
              {oneOffTitle}
            </div>
          ) : null}
          {oneOffSub ? (
            <div
              style={{
                fontSize: 13,
                color: '#43474b',
                fontFamily: "'Spoqa Han Sans Neo', sans-serif",
                lineHeight: 1.4,
              }}
            >
              {oneOffSub}
            </div>
          ) : null}
        </div>
      </div>

      {/* Right Branch Card: Recurring / Skill task */}
      <div
        style={{
          position: 'absolute',
          right: 28,
          top: 155,
          width: 236,
          height: 178,
          backgroundColor: '#ffffff',
          border: `3px solid ${recurringActive > 0.5 ? '#1273c4' : '#d5d2cc'}`,
          borderRadius: 16,
          padding: '16px',
          boxSizing: 'border-box',
          opacity: rightOpacity,
          transform: `translateY(${rightY - floatY}px) scale(${recurringFocus})`,
          boxShadow: recurringActive > 0.3 ? '0 8px 24px rgba(18, 115, 196, 0.16)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: '#e8f2fb',
              border: '2px solid #1273c4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              style={{ transform: `rotate(${loopAngle}deg)` }}
            >
              <path
                d="M21 12A9 9 0 0 0 6 5.3L3 8M3 3V8H8M3 12A9 9 0 0 0 18 18.7L21 16M21 21V16H16"
                stroke="#1273c4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              backgroundColor: '#e8f2fb',
              border: '1.5px solid #1273c4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#1273c4',
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          {recurringTitle ? (
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#101113',
                fontFamily: 'Pretendard, sans-serif',
                marginBottom: 6,
                lineHeight: 1.3,
              }}
            >
              {recurringTitle}
            </div>
          ) : null}
          {recurringSub ? (
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#1273c4',
                fontFamily: "'Spoqa Han Sans Neo', sans-serif",
                lineHeight: 1.4,
              }}
            >
              {recurringSub}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
