// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, interpolateColors, Easing } from 'remotion';

interface Props {
  delay?: number;
  budget: number;
  actionText?: string;
  promptText?: string;
  fileText?: string;
}

export const canvas = { w: 560, h: 360 };

export const PromptToAgentFile: React.FC<Props> = ({
  delay = 0,
  budget = 900,
  actionText = '',
  promptText = '',
  fileText = '',
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - delay);

  // 미세하게 숨쉬듯 부유하는 지속적 생명력 모션
  const floatPrompt = Math.sin(relFrame * 0.08) * 3;
  const floatFile = Math.cos(relFrame * 0.08) * 3;

  // 1단계: 말하듯 적은 프롬프트 카드 등장 (0 ~ 25)
  const promptEntrance = interpolate(relFrame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const promptY = interpolate(relFrame, [0, 25], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 2단계: 변환 통로 에너지 스트림 활성화 (25 ~ 65)
  const conduitProgress = interpolate(relFrame, [25, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const sparkRotation = interpolate(relFrame, [25, 90], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3단계: 완성된 에이전트 파일 결정화 및 시선 집중 포커스 팝 (55 ~ 95)
  const fileEntrance = interpolate(relFrame, [55, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fileY = interpolate(relFrame, [55, 85], [25, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });
  const fileScale = interpolate(relFrame, [55, 85, 115], [0.85, 1.14, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 설명 대상이 파일로 넘어갈 때 이전 프롬프트 카드를 부드럽게 딤(0.78 >= 0.72)
  const promptDim = interpolate(relFrame, [75, 105], [1, 0.78], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 파일 카드의 테두리 액센트 블루 점등
  const fileBorderColor = interpolateColors(
    relFrame,
    [65, 90],
    ['#d5d2cc', '#1273c4']
  );

  // 쉬지 않는 변환 통로 에너지 펄스
  const streamLoop = (relFrame + 15) % 45;
  const streamOffset = interpolate(streamLoop, [0, 45], [0, 72], {
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
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        overflow: 'hidden',
      }}
    >
      {/* 왼쪽: 일상 언어 프롬프트 카드 */}
      <div
        style={{
          width: 228,
          minHeight: 180,
          backgroundColor: '#ffffff',
          borderRadius: 16,
          border: '3px solid #d5d2cc',
          padding: '16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          opacity: promptEntrance * promptDim,
          transform: `translateY(${promptY + floatPrompt}px)`,
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12C21 16.4183 16.9706 20 12 20C10.4573 20 9.00689 19.6542 7.74026 19.0435L3 20L4.25882 16.5912C3.46824 15.2494 3 13.6874 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z"
                stroke="#1273c4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#1273c4',
              }}
            />
          </div>
          {actionText && (
            <div
              style={{
                backgroundColor: '#e8f2fb',
                color: '#1273c4',
                fontFamily: 'Pretendard, -apple-system, sans-serif',
                fontSize: 13,
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 6,
                letterSpacing: '-0.2px',
              }}
            >
              {actionText}
            </div>
          )}
        </div>

        <div style={{ marginTop: '8px', marginBottom: '8px' }}>
          {promptText && (
            <div
              style={{
                fontFamily: 'Spoqa Han Sans Neo, -apple-system, sans-serif',
                fontSize: 14,
                lineHeight: 1.5,
                color: '#101113',
                fontWeight: 500,
                wordBreak: 'keep-all',
              }}
            >
              {promptText}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div
            style={{
              width: 14,
              height: 3,
              borderRadius: 2,
              backgroundColor: '#1273c4',
            }}
          />
          <div
            style={{
              width: 24,
              height: 3,
              borderRadius: 2,
              backgroundColor: '#d5d2cc',
            }}
          />
          <div
            style={{
              width: 8,
              height: 3,
              borderRadius: 2,
              backgroundColor: '#d5d2cc',
            }}
          />
        </div>
      </div>

      {/* 중앙: 변환 프로세스 에너지 스트림 */}
      <div
        style={{
          width: 72,
          height: 100,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: conduitProgress,
        }}
      >
        <svg
          width="72"
          height="100"
          viewBox="0 0 72 100"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <line
            x1="0"
            y1="50"
            x2="72"
            y2="50"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeDasharray="4 4"
          />
        </svg>

        <div
          style={{
            position: 'absolute',
            left: streamOffset,
            top: 47,
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: '#1273c4',
          }}
        />

        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: '#ffffff',
            border: '3px solid #1273c4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            transform: `rotate(${sparkRotation}deg)`,
            zIndex: 2,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              fill="#1273c4"
            />
          </svg>
        </div>
      </div>

      {/* 오른쪽: 자동 생성된 에이전트 파일 카드 */}
      <div
        style={{
          width: 216,
          minHeight: 180,
          backgroundColor: '#ffffff',
          borderRadius: 16,
          border: `3px solid ${fileBorderColor}`,
          padding: '16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          opacity: fileEntrance,
          transform: `scale(${fileScale}) translateY(${fileY + floatFile}px)`,
          transformOrigin: 'center center',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 3H14L19 8V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3Z"
              stroke="#101113"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 3V8H19"
              stroke="#101113"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: '#e8f2fb',
              border: '1.5px solid #1273c4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5L6.5 12L13 4"
                stroke="#1273c4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div style={{ marginTop: '8px', marginBottom: '8px' }}>
          {fileText && (
            <div
              style={{
                fontFamily: 'Pretendard, -apple-system, sans-serif',
                fontSize: 14,
                lineHeight: 1.45,
                color: '#101113',
                fontWeight: 700,
                wordBreak: 'keep-all',
              }}
            >
              {fileText}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div
            style={{
              width: '85%',
              height: 4,
              backgroundColor: '#f0efec',
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: '60%',
              height: 4,
              backgroundColor: '#f0efec',
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
};
