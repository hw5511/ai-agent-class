// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface Props {
  delay?: number;
  budget: number;
  titleText?: string;
  longDescText?: string;
  fileText?: string;
  callText?: string;
}

export const canvas = { w: 560, h: 360 };

export const SkillConceptCompress: React.FC<Props> = ({
  delay = 0,
  budget,
  titleText = '',
  longDescText = '',
  fileText = '',
  callText = '',
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 지속적 생명력 모션 (절대 쉬지 않는 미세 호흡)
  const breathe = Math.sin(f * 0.05) * 4;
  const pulseScale = 1 + Math.sin(f * 0.08) * 0.015;

  // 2. 전체 진입 (0 ~ 35f)
  const enterProgress = interpolate(f, [0, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 3. 좌측 '긴 설명' 지시문 다중 카드 모션 & 수축 흡수 (70 ~ 150f)
  const docsSpread = interpolate(f, [0, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });

  const compressProgress = interpolate(f, [75, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  // 4. 중앙 '파일 하나' 카드 포커스 팝 (130 ~ 170f)
  const filePopScale = interpolate(f, [130, 150, 175], [1, 1.14, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  // 5. '이름만' 쏙 불러내는 상단 칩 도출 (175 ~ 220f)
  const chipPop = interpolate(f, [175, 215], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(2.0)),
  });

  // 6. 이름 호출 펄스 링 (210 ~ 260f)
  const ringProgress = interpolate(f, [210, 260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.8, 1.7]);
  const ringOpacity = interpolate(ringProgress, [0, 0.2, 1], [0, 0.8, 0]);

  // 좌측 긴 설명들의 흡수 좌표 및 투명도
  const leftX = interpolate(compressProgress, [0, 1], [0, 110]);
  const leftScale = interpolate(compressProgress, [0, 1], [1, 0.1]);
  const leftOpacity = interpolate(compressProgress, [0, 0.8, 1], [1, 0.6, 0]);

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: enterProgress,
        transform: `translateY(${breathe}px) scale(${enterProgress})`,
        userSelect: 'none',
      }}
    >
      {/* 상단 스킬 엠블럼 태그 */}
      {titleText ? (
        <div
          style={{
            position: 'absolute',
            top: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 14px',
            borderRadius: 14,
            backgroundColor: '#e8f2fb',
            border: '2px solid #1273c4',
            transform: `scale(${pulseScale})`,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#1273c4',
            }}
          />
          <span
            style={{
              fontFamily: 'Pretendard, -apple-system, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: '#1273c4',
              letterSpacing: '-0.01em',
            }}
          >
            {titleText}
          </span>
        </div>
      ) : null}

      {/* 메인 다이어그램 캔버스 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* [좌측 구역] 반복되던 긴 설명 문서 더미 */}
        <div
          style={{
            position: 'absolute',
            left: 50,
            top: 90,
            width: 150,
            height: 190,
            transform: `translateX(${leftX}px) scale(${leftScale})`,
            opacity: leftOpacity,
            transformOrigin: 'right center',
          }}
        >
          {/* 뒤쪽 문서 2 */}
          <div
            style={{
              position: 'absolute',
              width: 120,
              height: 150,
              left: 16,
              top: -6,
              borderRadius: 14,
              backgroundColor: '#ffffff',
              border: '3px solid #d5d2cc',
              transform: `rotate(${interpolate(docsSpread, [0, 1], [0, 8])}deg)`,
              boxSizing: 'border-box',
            }}
          />

          {/* 뒤쪽 문서 1 */}
          <div
            style={{
              position: 'absolute',
              width: 120,
              height: 150,
              left: 6,
              top: 2,
              borderRadius: 14,
              backgroundColor: '#ffffff',
              border: '3px solid #d5d2cc',
              transform: `rotate(${interpolate(docsSpread, [0, 1], [0, -6])}deg)`,
              boxSizing: 'border-box',
            }}
          />

          {/* 메인 앞쪽 문서 */}
          <div
            style={{
              position: 'absolute',
              width: 124,
              height: 154,
              left: 0,
              top: 8,
              borderRadius: 14,
              backgroundColor: '#ffffff',
              border: '3px solid #101113',
              boxSizing: 'border-box',
              padding: '14px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 32,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#101113',
              }}
            />
            <div
              style={{
                width: '100%',
                height: 4,
                borderRadius: 2,
                backgroundColor: '#d5d2cc',
              }}
            />
            <div
              style={{
                width: '85%',
                height: 4,
                borderRadius: 2,
                backgroundColor: '#d5d2cc',
              }}
            />
            <div
              style={{
                width: '92%',
                height: 4,
                borderRadius: 2,
                backgroundColor: '#d5d2cc',
              }}
            />
            <div
              style={{
                width: '60%',
                height: 4,
                borderRadius: 2,
                backgroundColor: '#d5d2cc',
              }}
            />
          </div>

          {/* 긴 설명 텍스트 라벨 */}
          {longDescText ? (
            <div
              style={{
                position: 'absolute',
                bottom: -28,
                left: 0,
                width: 124,
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Spoqa Han Sans Neo, -apple-system, sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#43474b',
                }}
              >
                {longDescText}
              </span>
            </div>
          ) : null}
        </div>

        {/* 수렴 압축 화살표 가이드 (점선 아크) */}
        <svg
          style={{
            position: 'absolute',
            left: 170,
            top: 145,
            width: 70,
            height: 40,
            pointerEvents: 'none',
            opacity: interpolate(compressProgress, [0, 0.4, 0.9, 1], [0.3, 1, 0.4, 0]),
          }}
          viewBox="0 0 70 40"
          fill="none"
        >
          <path
            d="M 10 20 L 52 20"
            stroke="#1273c4"
            strokeWidth="3"
            strokeDasharray="5 5"
            strokeLinecap="round"
          />
          <path
            d="M 44 12 L 54 20 L 44 28"
            stroke="#1273c4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* [중앙 구역] 파일 하나 카드 */}
        <div
          style={{
            position: 'absolute',
            left: 240,
            top: 96,
            width: 140,
            height: 180,
            borderRadius: 16,
            backgroundColor: '#ffffff',
            border: `3px solid ${compressProgress > 0.6 ? '#1273c4' : '#101113'}`,
            boxSizing: 'border-box',
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transform: `scale(${filePopScale})`,
            transition: 'border-color 0.2s ease',
          }}
        >
          {/* 상단 파일 귀 접힘 디자인 & 헤더 라인 */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#e8f2fb',
                  border: '2px solid #1273c4',
                }}
              />
              {/* 귀 접힘 벡터 */}
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderBottom: '3px solid #101113',
                  borderLeft: '3px solid #101113',
                  backgroundColor: '#f0efec',
                  borderRadius: '0 0 0 6px',
                }}
              />
            </div>

            {/* 정돈되어 압축 수납된 내부 블록 3선 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div
                style={{
                  width: '100%',
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#101113',
                }}
              />
              <div
                style={{
                  width: '85%',
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#d5d2cc',
                }}
              />
              <div
                style={{
                  width: '92%',
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#d5d2cc',
                }}
              />
            </div>
          </div>

          {/* 중앙 파일 라벨 문구 */}
          {fileText ? (
            <div
              style={{
                textAlign: 'center',
                paddingTop: 8,
                borderTop: '2px dashed #d5d2cc',
              }}
            >
              <span
                style={{
                  fontFamily: 'Pretendard, -apple-system, sans-serif',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#101113',
                  letterSpacing: '-0.01em',
                }}
              >
                {fileText}
              </span>
            </div>
          ) : null}
        </div>

        {/* [우측/상단 구역] '이름만' 쏙 불러내는 스마트 칩 */}
        <div
          style={{
            position: 'absolute',
            left: 285,
            top: 54,
            transform: `translateY(${interpolate(chipPop, [0, 1], [35, -12])}px) scale(${chipPop})`,
            opacity: chipPop,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* 호출 펄스 링 */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 100,
              height: 42,
              transform: `translate(-50%, -50%) scale(${ringScale})`,
              borderRadius: 20,
              border: '2px solid #1273c4',
              opacity: ringOpacity,
              pointerEvents: 'none',
            }}
          />

          {callText ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 18px',
                borderRadius: 18,
                backgroundColor: '#1273c4',
                boxShadow: '0 4px 12px rgba(18, 115, 196, 0.25)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M 2 7 L 11 2 L 7 12 L 6 8 Z"
                  fill="#ffffff"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'Pretendard, -apple-system, sans-serif',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}
              >
                {callText}
              </span>
            </div>
          ) : null}

          {/* 아래 파일과 연결되는 수직 점선 스템 */}
          <div
            style={{
              width: 2,
              height: 18,
              borderLeft: '2px dashed #1273c4',
              marginTop: 3,
            }}
          />
        </div>
      </div>
    </div>
  );
};
