// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 480, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  learnedLabel?: string;
  limitLabel?: string;
  unknownLabel?: string;
}

export const KnowledgeCutoffDiagram: React.FC<Props> = ({
  delay = 0,
  budget,
  learnedLabel = '',
  limitLabel = '',
  unknownLabel = '',
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  // 1. 학습 영역 카드 등장 (0~25f)
  const learnedScale = interpolate(frame, [0, 25], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const learnedOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. 시간 축이 한계 경계선까지 전진 (15~40f)
  const timelineProgress = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 3. 한계점 경계 핀 꽂힘 (35~55f)
  const pinScale = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });

  // 4. 경계선 이후 미지 영역 점선 카드 등장 (50~75f)
  const unknownOpacity = interpolate(frame, [50, 75], [0, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const unknownScale = interpolate(frame, [50, 75], [0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 지속 생명력 모션
  const floatLearned = Math.sin((frame + 10) / 18) * 3;
  const floatUnknown = Math.sin((frame + 30) / 22) * 4;
  const pulsePin = 1 + Math.sin(frame / 14) * 0.04;
  const pulsePhase = (frame % 45) / 45;
  const ringScale = 1 + pulsePhase * 0.7;
  const ringOpacity = Math.max(0, (1 - pulsePhase) * 0.75);

  const learnedX = 36;
  const learnedY = 64 + floatLearned;
  const unknownX = 274;
  const unknownY = 64 + floatUnknown;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Pretendard', sans-serif",
      }}
    >
      {/* 타임라인 축 및 경계선 SVG */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: canvas.w,
          height: canvas.h,
          pointerEvents: 'none',
        }}
      >
        {/* 학습된 시간 축 실선 */}
        <line
          x1={40}
          y1={245}
          x2={40 + timelineProgress * 200}
          y2={245}
          stroke="#1273c4"
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* 한계선 수직 점선 */}
        <line
          x1={240}
          y1={65}
          x2={240}
          y2={245}
          stroke="#1273c4"
          strokeWidth={3}
          strokeDasharray="5 5"
          opacity={pinScale}
        />

        {/* 한계점 이후 점선 시간 축 */}
        <line
          x1={240}
          y1={245}
          x2={240 + unknownOpacity * 200}
          y2={245}
          stroke="#d5d2cc"
          strokeWidth={3}
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* 타임라인 축 기준점 마커들 */}
        <circle cx={40} cy={245} r={5} fill="#1273c4" opacity={learnedOpacity} />
        <circle cx={240} cy={245} r={6} fill="#1273c4" opacity={pinScale} />
      </svg>

      {/* 왼쪽: 미리 학습한 내용 카드 */}
      <div
        style={{
          position: 'absolute',
          left: learnedX,
          top: learnedY,
          width: 170,
          height: 160,
          backgroundColor: '#ffffff',
          borderRadius: 16,
          border: '3px solid #d5d2cc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 12px',
          boxSizing: 'border-box',
          opacity: learnedOpacity,
          transform: `scale(${learnedScale})`,
        }}
      >
        {/* 지식 데이터 블록 스택 시각화 */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            alignItems: 'center',
            marginTop: 6,
          }}
        >
          <div
            style={{
              width: '88%',
              height: 16,
              backgroundColor: '#e8f2fb',
              border: '2px solid #1273c4',
              borderRadius: 6,
            }}
          />
          <div
            style={{
              width: '74%',
              height: 16,
              backgroundColor: '#e8f2fb',
              border: '2px solid #1273c4',
              borderRadius: 6,
            }}
          />
          <div
            style={{
              width: '92%',
              height: 16,
              backgroundColor: '#e8f2fb',
              border: '2px solid #1273c4',
              borderRadius: 6,
            }}
          />
        </div>

        {learnedLabel ? (
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#101113',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            {learnedLabel}
          </span>
        ) : null}
      </div>

      {/* 중앙: 한계점 핀 배지 & 펄스 링 */}
      <div
        style={{
          position: 'absolute',
          left: 240,
          top: 36,
          transform: `translate(-50%, 0) scale(${pinScale * pulsePin})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* 펄스 링 */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '2px solid #1273c4',
            transform: `scale(${ringScale})`,
            opacity: ringOpacity,
          }}
        />

        {/* 핀 상단 깃발 배지 */}
        {limitLabel ? (
          <div
            style={{
              backgroundColor: '#1273c4',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: 8,
              whiteSpace: 'nowrap',
            }}
          >
            {limitLabel}
          </div>
        ) : null}

        {/* 핀 하단 포인터 쐐기 */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '7px solid #1273c4',
          }}
        />
      </div>

      {/* 오른쪽: 새로 생긴 일 (미지의 영역 점선 카드) */}
      <div
        style={{
          position: 'absolute',
          left: unknownX,
          top: unknownY,
          width: 170,
          height: 160,
          backgroundColor: '#f0efec',
          borderRadius: 16,
          border: '3px dashed #d5d2cc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 12px',
          boxSizing: 'border-box',
          opacity: unknownOpacity,
          transform: `scale(${unknownScale})`,
        }}
      >
        {/* 미지의 정보 상징 벡터 아이콘 */}
        <svg width={52} height={52} viewBox="0 0 52 52" style={{ marginTop: 10 }}>
          <circle
            cx={26}
            cy={26}
            r={22}
            fill="none"
            stroke="#d5d2cc"
            strokeWidth={3}
            strokeDasharray="4 4"
          />
          <path
            d="M 21 20 C 21 16 31 16 31 21 C 31 25 26 26 26 30"
            fill="none"
            stroke="#7c8288"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <circle cx={26} cy={37} r={2} fill="#7c8288" />
        </svg>

        {unknownLabel ? (
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#7c8288',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            {unknownLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};
