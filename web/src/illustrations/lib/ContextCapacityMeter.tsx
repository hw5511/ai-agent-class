// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface Props {
  delay?: number;
  budget: number;
  percentageLabel?: string;
  statusLabel?: string;
  alertLabel?: string;
}

export const canvas = { w: 420, h: 280 };

export const ContextCapacityMeter: React.FC<Props> = (props) => {
  const {
    delay = 0,
    percentageLabel = '',
    statusLabel = '',
    alertLabel = '',
  } = props;

  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  const breath = Math.sin(frame * 0.09) * 2;
  const pulse = (Math.sin(frame * 0.12) + 1) / 2;

  const fillRatio = interpolate(frame, [0, 42], [0.35, 0.92], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const valueBadgeScale = interpolate(frame, [36, 52], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.back(1.5),
  });

  const alertOpacity = interpolate(frame, [45, 62], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const alertTranslateY = interpolate(frame, [45, 62], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const trackWidth = 340;
  const fillWidth = trackWidth * fillRatio;

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
        boxSizing: 'border-box',
        transform: `translateY(${breath}px)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 8,
          marginBottom: 16,
          transform: `scale(${valueBadgeScale})`,
        }}
      >
        {percentageLabel ? (
          <span
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 32,
              fontWeight: 800,
              color: '#1273c4',
              lineHeight: 1,
            }}
          >
            {percentageLabel}
          </span>
        ) : null}
        {statusLabel ? (
          <span
            style={{
              fontFamily: 'Spoqa Han Sans Neo, sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#43474b',
              lineHeight: 1,
            }}
          >
            {statusLabel}
          </span>
        ) : null}
      </div>

      <div
        style={{
          width: trackWidth,
          height: 38,
          backgroundColor: '#ffffff',
          border: '3px solid #d5d2cc',
          borderRadius: 19,
          padding: 4,
          boxSizing: 'border-box',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: fillWidth,
            height: '100%',
            backgroundColor: '#1273c4',
            borderRadius: 14,
            transition: 'width 0.05s linear',
            boxShadow: `0 0 ${8 + pulse * 6}px rgba(18, 115, 196, ${0.2 + pulse * 0.25})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 28,
            top: 6,
            bottom: 6,
            width: 2,
            backgroundColor: '#d5d2cc',
          }}
        />
      </div>

      <div
        style={{
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backgroundColor: '#e8f2fb',
          border: '2px solid #1273c4',
          borderRadius: 14,
          padding: '6px 14px',
          opacity: alertOpacity,
          transform: `translateY(${alertTranslateY}px)`,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="#1273c4" strokeWidth="2" />
          <path
            d="M8 4.5V8.5M8 11.5V12"
            stroke="#1273c4"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {alertLabel ? (
          <span
            style={{
              fontFamily: 'Pretendard, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: '#1273c4',
              lineHeight: 1,
            }}
          >
            {alertLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};
