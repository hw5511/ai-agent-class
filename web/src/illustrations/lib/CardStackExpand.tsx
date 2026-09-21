// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 520, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  titleText?: string;
  actionText?: string;
  badgeText?: string;
}

export const CardStackExpand: React.FC<Props> = ({
  delay = 0,
  budget,
  titleText = '',
  actionText = '',
  badgeText = '',
}) => {
  const frame = useCurrentFrame();
  const f = frame - delay;

  // 연속적 생명력: 미세 부유 모션 (0프레임부터 지속)
  const breathing = Math.sin(frame * 0.06) * 3;

  // 10~55프레임 구간: 카드가 1겹 묶음에서 부드럽게 7장으로 펼쳐지는 안무
  const fanProgress = interpolate(f, [10, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 35~65프레임 구간: 배지 팝업 포커스
  const badgeScale = interpolate(f, [35, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.back(1.4),
  });
  const badgeOpacity = interpolate(f, [35, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 7장의 카드 인덱스 (가운데 카드 = index 3)
  const cards = [0, 1, 2, 3, 4, 5, 6];

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
      {/* 상단 텍스트 및 포커스 배지 영역 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          zIndex: 20,
        }}
      >
        {titleText ? (
          <div
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#101113',
              letterSpacing: '-0.02em',
            }}
          >
            {titleText}
          </div>
        ) : null}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {actionText ? (
            <div
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#43474b',
                fontFamily: '"Spoqa Han Sans Neo", sans-serif',
              }}
            >
              {actionText}
            </div>
          ) : null}

          {badgeText ? (
            <div
              style={{
                transform: `scale(${badgeScale})`,
                opacity: badgeOpacity,
                backgroundColor: '#e8f2fb',
                border: '2px solid #1273c4',
                color: '#1273c4',
                borderRadius: '14px',
                padding: '3px 10px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(18, 115, 196, 0.15)',
              }}
            >
              {badgeText}
            </div>
          ) : null}
        </div>
      </div>

      {/* 카드 7장 펼침 스테이지 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {cards.map((i) => {
          const diffFromCenter = i - 3; // -3, -2, -1, 0, 1, 2, 3

          const targetX = diffFromCenter * 54;
          const targetRot = diffFromCenter * 4.5;
          const targetY = Math.abs(diffFromCenter) * 4;

          const initialX = diffFromCenter * 3;
          const initialRot = diffFromCenter * 1.5;
          const initialY = 0;

          const currentX = interpolate(fanProgress, [0, 1], [initialX, targetX]);
          const currentRot = interpolate(fanProgress, [0, 1], [initialRot, targetRot]);
          const currentY = interpolate(fanProgress, [0, 1], [initialY, targetY]);

          const cardFloat = Math.sin((frame + i * 14) * 0.07) * 3.5;
          const isEdgeHighlight = (i === 0 || i === 6) && fanProgress > 0.8;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '84px',
                height: '130px',
                backgroundColor: '#ffffff',
                border: isEdgeHighlight ? '3px solid #1273c4' : '3px solid #d5d2cc',
                borderRadius: '14px',
                transform: `translate(${currentX}px, ${currentY + cardFloat + breathing}px) rotate(${currentRot}deg)`,
                boxShadow: '0 6px 16px rgba(16, 17, 19, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 8px',
                boxSizing: 'border-box',
                justifyContent: 'space-between',
                zIndex: 10 + i,
              }}
            >
              {/* 상단 썸네일 박스 (하드코딩 문자 없는 순수 기하학 조형) */}
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '7px',
                  backgroundColor: isEdgeHighlight ? '#e8f2fb' : '#f0efec',
                  border: '1.5px solid',
                  borderColor: isEdgeHighlight ? '#1273c4' : '#d5d2cc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    backgroundColor: isEdgeHighlight ? '#1273c4' : '#7c8288',
                  }}
                />
              </div>

              {/* 본문 플레이스홀더 바 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '80%',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: '#d5d2cc',
                  }}
                />
                <div
                  style={{
                    width: '60%',
                    height: '5px',
                    borderRadius: '3px',
                    backgroundColor: '#f0efec',
                  }}
                />
                <div
                  style={{
                    width: '90%',
                    height: '5px',
                    borderRadius: '3px',
                    backgroundColor: '#f0efec',
                  }}
                />
              </div>

              {/* 하단 악센트 바 */}
              <div
                style={{
                  width: '100%',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: isEdgeHighlight ? '#1273c4' : '#d5d2cc',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 하단 진행 게이지 라인 */}
      <div
        style={{
          width: '120px',
          height: '4px',
          borderRadius: '2px',
          backgroundColor: '#d5d2cc',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${fanProgress * 100}%`,
            backgroundColor: '#1273c4',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  );
};
