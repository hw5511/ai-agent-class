// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 500, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  toolLabel?: string;
  toolName?: string;
  repoLabel?: string;
  webLabel?: string;
}

export const GhToolBridge: React.FC<Props> = ({
  delay = 0,
  budget = 780,
  toolLabel = '',
  toolName = '',
  repoLabel = '',
  webLabel = '',
}) => {
  const frame = useCurrentFrame() - delay;

  // 연속적 생명력 미세 모션
  const floatLeft = Math.sin(frame * 0.08) * 3;
  const floatRight = Math.sin((frame + 20) * 0.08) * 3;

  // 등장 애니메이션 (0~35 프레임)
  const introScale = interpolate(frame, [0, 30], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.3)),
  });
  const introOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 나레이션 설명 포커스 줌 안무: 'gh' 도구 설명 구간(35~140)에서 좌측 도구 카드 집중 확대
  const toolFocusScale = interpolate(frame, [35, 60, 115, 140], [1, 1.15, 1.15, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const rightNodeDim = interpolate(frame, [35, 60, 115, 140], [1, 0.76, 0.76, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 다리(브릿지) 파이프라인 연결선 전개
  const bridgeProgress = interpolate(frame, [25, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // 명령 도구 -> 원격 웹 저장소 방향 데이터 펄스 패킷 이동
  const loopPeriod = 90;
  const loopFrame = frame > 55 ? (frame - 55) % loopPeriod : 0;

  const beamProgress = interpolate(loopFrame, [10, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const beamOpacity = interpolate(loopFrame, [10, 20, 65, 75], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulseX = interpolate(beamProgress, [0, 1], [195, 305]);

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: 'relative',
        backgroundColor: '#f0efec',
        overflow: 'hidden',
        fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 중앙 연결 파이프라인 벡터 */}
      <svg
        width={canvas.w}
        height={canvas.h}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {/* 기본 경로선 */}
        <line
          x1={185}
          y1={160}
          x2={185 + 130 * bridgeProgress}
          y2={160}
          stroke="#d5d2cc"
          strokeWidth={4}
          strokeLinecap="round"
        />
        {/* 양방향 브릿지 조인트 링 */}
        <circle cx={190} cy={160} r={5} fill="#ffffff" stroke="#1273c4" strokeWidth={3} />
        <circle cx={310} cy={160} r={5} fill="#ffffff" stroke="#1273c4" strokeWidth={3} />
      </svg>

      {/* 브릿지 위를 주행하는 명령 펄스 토큰 */}
      <div
        style={{
          position: 'absolute',
          left: pulseX,
          top: 160,
          transform: 'translate(-50%, -50%)',
          opacity: beamOpacity,
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: '#1273c4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 12px rgba(18, 115, 196, 0.4)',
          zIndex: 6,
        }}
      >
        <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
          <path
            d="M 3 6 L 9 6 M 6 3 L 9 6 L 6 9"
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 좌측: 명령 도구 노드 (gh) */}
      <div
        style={{
          position: 'absolute',
          left: 45,
          top: 95 + floatLeft,
          width: 145,
          height: 130,
          transform: `scale(${introScale * toolFocusScale})`,
          opacity: introOpacity,
          backgroundColor: '#ffffff',
          borderRadius: 18,
          border: '3px solid #d5d2cc',
          boxShadow: '0 8px 24px rgba(16, 17, 19, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          boxSizing: 'border-box',
          zIndex: 5,
        }}
      >
        {/* 명령 프롬프트 형상 벡터 아이콘 (순수 SVG 패스) */}
        <div
          style={{
            width: 44,
            height: 28,
            backgroundColor: '#f0efec',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 6,
          }}
        >
          <svg width={26} height={16} viewBox="0 0 26 16" fill="none">
            <path
              d="M 4 3 L 10 8 L 4 13"
              stroke="#1273c4"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1={14}
              y1={13}
              x2={22}
              y2={13}
              stroke="#1273c4"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 도구 이름 라벨 ('gh') */}
        {toolName ? (
          <div
            style={{
              backgroundColor: '#e8f2fb',
              border: '2px solid #1273c4',
              borderRadius: 8,
              padding: '2px 14px',
              fontSize: 20,
              fontWeight: 700,
              color: '#1273c4',
              lineHeight: 1.2,
            }}
          >
            {toolName}
          </div>
        ) : null}

        {/* 분류 라벨 ('명령 도구') */}
        {toolLabel ? (
          <div
            style={{
              marginTop: 6,
              fontSize: 13,
              fontWeight: 600,
              color: '#43474b',
              lineHeight: 1.2,
            }}
          >
            {toolLabel}
          </div>
        ) : null}
      </div>

      {/* 우측: 웹 저장소 노드 */}
      <div
        style={{
          position: 'absolute',
          left: 310,
          top: 95 + floatRight,
          width: 145,
          height: 130,
          transform: `scale(${introScale})`,
          opacity: introOpacity * rightNodeDim,
          backgroundColor: '#ffffff',
          borderRadius: 18,
          border: '3px solid #d5d2cc',
          boxShadow: '0 8px 24px rgba(16, 17, 19, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          boxSizing: 'border-box',
          zIndex: 4,
        }}
      >
        {/* 웹/클라우드 저장소 벡터 아이콘 */}
        <div
          style={{
            width: 44,
            height: 28,
            backgroundColor: '#e8f2fb',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 6,
          }}
        >
          <svg width={26} height={20} viewBox="0 0 26 20" fill="none">
            <circle cx={13} cy={10} r={8} stroke="#1273c4" strokeWidth={2} />
            <ellipse cx={13} cy={10} rx={4} ry={8} stroke="#1273c4" strokeWidth={1.5} />
            <line x1={5} y1={10} x2={21} y2={10} stroke="#1273c4" strokeWidth={1.5} />
          </svg>
        </div>

        {/* 저장소 라벨 ('저장소') */}
        {repoLabel ? (
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#101113',
              lineHeight: 1.2,
            }}
          >
            {repoLabel}
          </div>
        ) : null}

        {/* 웹 환경 라벨 ('웹') */}
        {webLabel ? (
          <div
            style={{
              marginTop: 6,
              fontSize: 13,
              fontWeight: 600,
              color: '#43474b',
              lineHeight: 1.2,
            }}
          >
            {webLabel}
          </div>
        ) : null}
      </div>
    </div>
  );
};
