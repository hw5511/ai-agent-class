// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, interpolateColors, Easing } from 'remotion';

export const canvas = { w: 520, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  coreLabel?: string;
  terminalLabel?: string;
  otherEnvLabel?: string;
}

export const SameClaudeMultiEnv: React.FC<Props> = ({
  delay = 0,
  budget = 480,
  coreLabel = '',
  terminalLabel = '',
  otherEnvLabel = '',
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - delay);

  // 1. 진입 모션 (0 ~ 35프레임)
  const enterProgress = interpolate(relFrame, [0, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 2. 지속적 유기적 부유 (Continuous Choreography)
  const floatCoreY = Math.sin(relFrame * 0.07) * 4;
  const floatLeftY = Math.sin((relFrame + 15) * 0.06) * 3;
  const floatRightTopY = Math.sin((relFrame + 30) * 0.06) * 3;
  const floatRightBottomY = Math.sin((relFrame + 45) * 0.06) * 3;

  // 3. 나레이션 동기화 포커스 안무
  // [99~207]: "환경에서도 같은 클로드를" -> 중앙 코어 포커스 줌인 (1.0 -> 1.15)
  const coreFocusScale = interpolate(
    relFrame,
    [90, 120, 205, 230],
    [1, 1.15, 1.15, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) }
  );
  const coreBorderColor = interpolateColors(
    relFrame,
    [90, 120, 205, 230],
    ['#d5d2cc', '#1273c4', '#1273c4', '#d5d2cc']
  );
  const coreBgColor = interpolateColors(
    relFrame,
    [90, 120, 205, 230],
    ['#ffffff', '#e8f2fb', '#e8f2fb', '#ffffff']
  );

  // [314~440]: "지금까지는 터미널 한 곳에서만 일했었죠" -> 좌측 터미널 노드 포커스 줌인 (1.0 -> 1.16)
  const terminalFocusScale = interpolate(
    relFrame,
    [305, 335, 435, 465],
    [1, 1.16, 1.16, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) }
  );
  const terminalBorderColor = interpolateColors(
    relFrame,
    [305, 335, 435, 465],
    ['#d5d2cc', '#1273c4', '#1273c4', '#d5d2cc']
  );
  const terminalBgColor = interpolateColors(
    relFrame,
    [305, 335, 435, 465],
    ['#ffffff', '#e8f2fb', '#e8f2fb', '#ffffff']
  );

  // 비포커스 요소 딤 처리 (CEO 원칙: 0.72 이상 유지)
  const dimLeftDuringCore = interpolate(relFrame, [95, 120, 205, 230], [1, 0.76, 0.76, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dimCoreDuringTerminal = interpolate(relFrame, [310, 335, 435, 465], [1, 0.76, 0.76, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // [207~314]: "불러 쓰는 법을 배워볼게요" -> 우측 환경 노드로 확장 펄스
  const rightConnectProgress = interpolate(relFrame, [207, 260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const rightTopScale = interpolate(relFrame, [220, 250, 280], [1, 1.08, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rightBottomScale = interpolate(relFrame, [240, 270, 300], [1, 1.08, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 데이터 빔 흐름 (점선 offset 및 이동 펄스)
  const flowOffset = (relFrame * 2) % 36;
  const pulseLeftT = (relFrame * 0.04) % 1;
  const pulseRightTopT = ((relFrame + 18) * 0.04) % 1;
  const pulseRightBottomT = ((relFrame + 27) * 0.04) % 1;

  // 터미널 커서 점멸
  const cursorBlink = Math.floor(relFrame / 15) % 2 === 0 ? 1 : 0.15;

  return (
    <div
      style={{
        position: 'relative',
        width: 520,
        height: 360,
        backgroundColor: '#f0efec',
        overflow: 'hidden',
        opacity: enterProgress,
        transform: `scale(${0.92 + enterProgress * 0.08})`,
      }}
    >
      {/* 1. 배경 연결선 SVG */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 520,
          height: 360,
          pointerEvents: 'none',
        }}
      >
        {/* 좌측 터미널 연결선 */}
        <line
          x1={150}
          y1={180 + floatLeftY}
          x2={200}
          y2={180 + floatCoreY}
          stroke="#d5d2cc"
          strokeWidth={3}
          strokeDasharray="6 6"
          strokeDashoffset={-flowOffset}
        />
        {/* 좌측 신호 펄스 닷 */}
        <circle
          cx={150 + (200 - 150) * pulseLeftT}
          cy={180 + floatLeftY + (floatCoreY - floatLeftY) * pulseLeftT}
          r={4}
          fill="#1273c4"
        />

        {/* 우측 상단 환경 연결 곡선 */}
        <path
          d={`M 320 ${160 + floatCoreY} C 345 ${160 + floatCoreY}, 345 ${115 + floatRightTopY}, 370 ${115 + floatRightTopY}`}
          fill="none"
          stroke={rightConnectProgress > 0 ? '#1273c4' : '#d5d2cc'}
          strokeWidth={3}
          strokeDasharray="6 6"
          strokeDashoffset={-flowOffset}
          opacity={0.3 + rightConnectProgress * 0.7}
        />
        {rightConnectProgress > 0.5 ? (
          <circle
            cx={320 + (370 - 320) * pulseRightTopT}
            cy={160 + (115 - 160) * pulseRightTopT + floatRightTopY}
            r={4}
            fill="#1273c4"
          />
        ) : null}

        {/* 우측 하단 환경 연결 곡선 */}
        <path
          d={`M 320 ${200 + floatCoreY} C 345 ${200 + floatCoreY}, 345 ${245 + floatRightBottomY}, 370 ${245 + floatRightBottomY}`}
          fill="none"
          stroke={rightConnectProgress > 0 ? '#1273c4' : '#d5d2cc'}
          strokeWidth={3}
          strokeDasharray="6 6"
          strokeDashoffset={-flowOffset}
          opacity={0.3 + rightConnectProgress * 0.7}
        />
        {rightConnectProgress > 0.5 ? (
          <circle
            cx={320 + (370 - 320) * pulseRightBottomT}
            cy={200 + (245 - 200) * pulseRightBottomT + floatRightBottomY}
            r={4}
            fill="#1273c4"
          />
        ) : null}
      </svg>

      {/* 2. 중앙 코어: "같은 클로드" */}
      <div
        style={{
          position: 'absolute',
          left: 200,
          top: 120,
          width: 120,
          height: 120,
          borderRadius: 24,
          backgroundColor: coreBgColor,
          border: `3px solid ${coreBorderColor}`,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: 8,
          transform: `translateY(${floatCoreY}px) scale(${coreFocusScale})`,
          opacity: dimCoreDuringTerminal,
          zIndex: 3,
        }}
      >
        {/* AI 코어 기하학 엠블럼 */}
        <svg width={44} height={44} viewBox="0 0 44 44">
          <circle cx={22} cy={22} r={18} fill="none" stroke="#e8f2fb" strokeWidth={3} />
          <circle cx={22} cy={22} r={8} fill="#1273c4" />
          <path
            d="M 22 2 L 22 8 M 22 36 L 22 42 M 2 22 L 8 22 M 36 22 L 42 22"
            stroke="#1273c4"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={22} cy={22} r={14} fill="none" stroke="#1273c4" strokeWidth={2} strokeDasharray="3 4" />
        </svg>

        {coreLabel ? (
          <span
            style={{
              fontSize: 14,
              fontFamily: 'Pretendard, -apple-system, sans-serif',
              fontWeight: 600,
              color: '#101113',
              textAlign: 'center',
              lineHeight: 1.2,
              wordBreak: 'keep-all',
            }}
          >
            {coreLabel}
          </span>
        ) : null}
      </div>

      {/* 3. 좌측 노드: "터미널" */}
      <div
        style={{
          position: 'absolute',
          left: 30,
          top: 125,
          width: 120,
          height: 110,
          borderRadius: 16,
          backgroundColor: terminalBgColor,
          border: `3px solid ${terminalBorderColor}`,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: 8,
          transform: `translateY(${floatLeftY}px) scale(${terminalFocusScale})`,
          opacity: dimLeftDuringCore,
          zIndex: 2,
        }}
      >
        {/* 터미널 CLI 기하학 벡터 심볼 (가짜 창틀 없이 미니멀 아이콘 형태) */}
        <svg width={44} height={28} viewBox="0 0 44 28">
          <path
            d="M 6 5 L 18 14 L 6 23"
            fill="none"
            stroke="#101113"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1={24}
            y1={23}
            x2={38}
            y2={23}
            stroke="#1273c4"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={cursorBlink}
          />
        </svg>

        {terminalLabel ? (
          <span
            style={{
              fontSize: 14,
              fontFamily: 'Pretendard, -apple-system, sans-serif',
              fontWeight: 600,
              color: '#101113',
              textAlign: 'center',
              lineHeight: 1.2,
              wordBreak: 'keep-all',
            }}
          >
            {terminalLabel}
          </span>
        ) : null}
      </div>

      {/* 4. 우측 상단 노드: "다른 환경 1" */}
      <div
        style={{
          position: 'absolute',
          left: 370,
          top: 65,
          width: 120,
          height: 100,
          borderRadius: 16,
          backgroundColor: '#ffffff',
          border: '3px solid #d5d2cc',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: 8,
          transform: `translateY(${floatRightTopY}px) scale(${rightTopScale})`,
          opacity: dimLeftDuringCore,
          zIndex: 2,
        }}
      >
        {/* 모듈형 데스크톱 환경 기하학 벡터 심볼 */}
        <svg width={36} height={32} viewBox="0 0 36 32">
          <rect
            x={3}
            y={3}
            width={30}
            height={22}
            rx={5}
            fill="none"
            stroke="#101113"
            strokeWidth={3}
          />
          <line x1={3} y1={10} x2={33} y2={10} stroke="#d5d2cc" strokeWidth={2} />
          <circle cx={8} cy={6.5} r={1.5} fill="#1273c4" />
          <line x1={12} y1={28} x2={24} y2={28} stroke="#101113" strokeWidth={3} strokeLinecap="round" />
          <line x1={18} y1={25} x2={18} y2={28} stroke="#101113" strokeWidth={3} />
        </svg>

        {otherEnvLabel ? (
          <span
            style={{
              fontSize: 14,
              fontFamily: 'Pretendard, -apple-system, sans-serif',
              fontWeight: 600,
              color: '#101113',
              textAlign: 'center',
              lineHeight: 1.2,
              wordBreak: 'keep-all',
            }}
          >
            {otherEnvLabel}
          </span>
        ) : null}
      </div>

      {/* 5. 우측 하단 노드: 확장 환경 2 */}
      <div
        style={{
          position: 'absolute',
          left: 370,
          top: 195,
          width: 120,
          height: 100,
          borderRadius: 16,
          backgroundColor: '#ffffff',
          border: '3px solid #d5d2cc',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: 8,
          transform: `translateY(${floatRightBottomY}px) scale(${rightBottomScale})`,
          opacity: dimLeftDuringCore,
          zIndex: 2,
        }}
      >
        {/* 모듈형 블록 레이어 벡터 심볼 */}
        <svg width={36} height={32} viewBox="0 0 36 32">
          <rect
            x={4}
            y={4}
            width={28}
            height={10}
            rx={4}
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth={2.5}
          />
          <rect
            x={4}
            y={18}
            width={28}
            height={10}
            rx={4}
            fill="none"
            stroke="#43474b"
            strokeWidth={2.5}
          />
        </svg>

        {otherEnvLabel ? (
          <span
            style={{
              fontSize: 14,
              fontFamily: 'Pretendard, -apple-system, sans-serif',
              fontWeight: 600,
              color: '#43474b',
              textAlign: 'center',
              lineHeight: 1.2,
              wordBreak: 'keep-all',
            }}
          >
            {otherEnvLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};
