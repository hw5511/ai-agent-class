// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 520, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  cycleText?: string;
  stepOneText?: string;
  stepTwoText?: string;
  fileNameText?: string;
  statusText?: string;
}

export const SkillRefineCycle: React.FC<Props> = ({
  delay = 0,
  budget,
  cycleText = '',
  stepOneText = '',
  stepTwoText = '',
  fileNameText = '',
  statusText = '',
}) => {
  const frame = useCurrentFrame();
  const f = frame - delay;

  // 미세 숨쉬기 모션
  const breath = Math.sin(frame * 0.05) * 2.5;

  // 1단계: '읽고 나서' 하이라이트 (15~40 프레임)
  const stepOnePop = interpolate(f, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 2단계: '고치는' 도구 하이라이트 (45~65 프레임)
  const stepTwoPop = interpolate(f, [45, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 3단계: 파일 깔끔 업데이트 스파크 (70~95 프레임)
  const updateSuccess = interpolate(f, [70, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.back(1.5),
  });

  // 지속 순환 펄스 (링을 타고 회전하는 시각 흐름)
  const loopAngle = (frame * 1.5) % 360;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        backgroundColor: '#f0efec',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Pretendard, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 20px',
        boxSizing: 'border-box',
      }}
    >
      {/* 상단 다듬기 철학 타이틀 */}
      {cycleText ? (
        <div
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#101113',
            letterSpacing: '-0.02em',
            zIndex: 10,
          }}
        >
          {cycleText}
        </div>
      ) : null}

      {/* 중앙 순환 궤도 및 파일 카드 */}
      <div
        style={{
          position: 'relative',
          width: '260px',
          height: '210px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 순환 궤도 원형 라인 (SVG) */}
        <svg
          width="250"
          height="190"
          viewBox="0 0 250 190"
          style={{
            position: 'absolute',
            left: 5,
            top: 10,
          }}
        >
          <ellipse
            cx="125"
            cy="95"
            rx="115"
            ry="75"
            fill="none"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeDasharray="8 6"
          />
          {/* 궤도를 도는 파란 액센트 에너지 입자 */}
          <circle
            cx={125 + 115 * Math.cos((loopAngle * Math.PI) / 180)}
            cy={95 + 75 * Math.sin((loopAngle * Math.PI) / 180)}
            r="5"
            fill="#1273c4"
          />
        </svg>

        {/* 1단계 뱃지: 읽고 나서 (왼쪽 위) */}
        {stepOneText ? (
          <div
            style={{
              position: 'absolute',
              left: '-10px',
              top: '25px',
              backgroundColor: stepOnePop > 0.5 ? '#e8f2fb' : '#ffffff',
              border: `2px solid ${stepOnePop > 0.5 ? '#1273c4' : '#d5d2cc'}`,
              borderRadius: '16px',
              padding: '4px 12px',
              fontSize: '13px',
              fontWeight: 700,
              color: stepOnePop > 0.5 ? '#1273c4' : '#43474b',
              transform: `scale(${interpolate(stepOnePop, [0, 1], [0.9, 1.05])})`,
              boxShadow: '0 4px 12px rgba(16, 17, 19, 0.05)',
              zIndex: 5,
            }}
          >
            {stepOneText}
          </div>
        ) : null}

        {/* 2단계 뱃지: 고치는 (오른쪽 아래) */}
        {stepTwoText ? (
          <div
            style={{
              position: 'absolute',
              right: '-10px',
              bottom: '25px',
              backgroundColor: stepTwoPop > 0.5 ? '#e8f2fb' : '#ffffff',
              border: `2px solid ${stepTwoPop > 0.5 ? '#1273c4' : '#d5d2cc'}`,
              borderRadius: '16px',
              padding: '4px 12px',
              fontSize: '13px',
              fontWeight: 700,
              color: stepTwoPop > 0.5 ? '#1273c4' : '#43474b',
              transform: `scale(${interpolate(stepTwoPop, [0, 1], [0.9, 1.05])})`,
              boxShadow: '0 4px 12px rgba(16, 17, 19, 0.05)',
              zIndex: 5,
            }}
          >
            {stepTwoText}
          </div>
        ) : null}

        {/* 중앙 스킬 파일 시각 에셋 */}
        <div
          style={{
            position: 'relative',
            width: '100px',
            height: '130px',
            backgroundColor: '#ffffff',
            border: `3px solid ${updateSuccess > 0.5 ? '#1273c4' : '#d5d2cc'}`,
            borderRadius: '16px',
            transform: `translateY(${breath}px)`,
            boxShadow: '0 8px 24px rgba(16, 17, 19, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px 10px',
            boxSizing: 'border-box',
            justifyContent: 'space-between',
            zIndex: 6,
          }}
        >
          {/* 접힌 모서리 장식 */}
          <div
            style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              width: '20px',
              height: '20px',
              backgroundColor: '#f0efec',
              borderBottomLeftRadius: '8px',
              borderLeft: '2px solid #d5d2cc',
              borderBottom: '2px solid #d5d2cc',
            }}
          />

          {/* 파일 아이콘 엠블럼 */}
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: updateSuccess > 0.5 ? '#e8f2fb' : '#f0efec',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                backgroundColor: updateSuccess > 0.5 ? '#1273c4' : '#7c8288',
              }}
            />
          </div>

          {/* 파일 내부 라인 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              width: '100%',
            }}
          >
            <div
              style={{
                width: '75%',
                height: '5px',
                borderRadius: '3px',
                backgroundColor: '#d5d2cc',
              }}
            />
            <div
              style={{
                width: '50%',
                height: '5px',
                borderRadius: '3px',
                backgroundColor: '#f0efec',
              }}
            />
            <div
              style={{
                width: '85%',
                height: '5px',
                borderRadius: '3px',
                backgroundColor: '#f0efec',
              }}
            />
          </div>

          {/* 파일명 뱃지 (가운데 카드 하단) */}
          {fileNameText ? (
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#101113',
                textAlign: 'center',
                letterSpacing: '-0.01em',
              }}
            >
              {fileNameText}
            </div>
          ) : null}
        </div>
      </div>

      {/* 하단 완료 상태 메시지 영역 */}
      {statusText ? (
        <div
          style={{
            transform: `scale(${updateSuccess})`,
            opacity: updateSuccess,
            backgroundColor: '#ffffff',
            border: '2px solid #1273c4',
            borderRadius: '16px',
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#1273c4',
            fontFamily: '"Spoqa Han Sans Neo", sans-serif',
            boxShadow: '0 4px 14px rgba(18, 115, 196, 0.12)',
          }}
        >
          {statusText}
        </div>
      ) : null}
    </div>
  );
};
