// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface Props {
  delay?: number;
  budget: number;
  parentFolderText?: string;
  childFolderText?: string;
  fileText?: string;
  statusText?: string;
}

export const canvas = { w: 520, h: 360 };

export const NestedFolderPlacement: React.FC<Props> = ({
  delay = 0,
  budget = 900,
  parentFolderText = '',
  childFolderText = '',
  fileText = '',
  statusText = '',
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - delay);

  // 지속적인 부유 호흡 모션
  const floatY = Math.sin(relFrame * 0.08) * 3;

  // 1단계: 상위 .claude 폴더 부드럽게 등장 (0 ~ 25)
  const parentEntrance = interpolate(relFrame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const parentY = interpolate(relFrame, [0, 25], [-16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 2단계: agents 하위 폴더로 이어지는 트리 브랜치 전개 (15 ~ 40)
  const branch1Progress = interpolate(relFrame, [15, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3단계: 하위 agents 폴더 오픈 및 정착 (25 ~ 50)
  const childEntrance = interpolate(relFrame, [25, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const childX = interpolate(relFrame, [25, 50], [-16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 4단계: 파일 위치로 향하는 하위 연결선 확장 (45 ~ 70)
  const branch2Progress = interpolate(relFrame, [45, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5단계: 생성된 에이전트 파일이 안착하며 일어나는 포커스 팝 (60 ~ 95)
  const fileEntrance = interpolate(relFrame, [60, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fileY = interpolate(relFrame, [60, 90], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });
  const fileScale = interpolate(relFrame, [60, 90, 115], [0.85, 1.15, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 최종 생성 파일이 돋보이도록 상위 폴더 부드러운 딤(0.80 >= 0.72)
  const folderDim = interpolate(relFrame, [80, 110], [1, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 신규 생성 강조 비콘 펄스
  const beaconLoop = (relFrame + 5) % 40;
  const beaconScale = interpolate(beaconLoop, [0, 40], [1, 1.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const beaconOpacity = interpolate(beaconLoop, [0, 40], [0.5, 0], {
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
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* 계층 구조 벡터 브랜치 연결선 */}
      <svg
        width={canvas.w}
        height={canvas.h}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <path
          d="M 120 74 V 125 Q 120 145 140 145 H 170"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3"
          strokeDasharray="120"
          strokeDashoffset={120 * (1 - branch1Progress)}
        />
        <path
          d="M 220 174 V 225 Q 220 245 240 245 H 250"
          fill="none"
          stroke="#1273c4"
          strokeWidth="3"
          strokeDasharray="120"
          strokeDashoffset={120 * (1 - branch2Progress)}
        />
      </svg>

      {/* 상위 폴더: .claude */}
      <div
        style={{
          position: 'absolute',
          left: 50,
          top: 35,
          width: 170,
          height: 52,
          backgroundColor: '#ffffff',
          border: '3px solid #d5d2cc',
          borderRadius: 14,
          padding: '8px 14px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: parentEntrance * folderDim,
          transform: `translateY(${parentY + floatY}px)`,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 7V19C3 20.1046 3.89543 21 21 21H19C20.1046 21 21 20.1046 21 19V9C21 7.89543 20.1046 7 19 7H12L10 4H5C3.89543 4 3 4.89543 3 6V7Z"
            stroke="#101113"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {parentFolderText && (
          <span
            style={{
              fontFamily: 'JetBrains Mono, Pretendard, monospace',
              fontSize: 15,
              fontWeight: 700,
              color: '#101113',
              letterSpacing: '-0.3px',
            }}
          >
            {parentFolderText}
          </span>
        )}
      </div>

      {/* 하위 폴더: agents */}
      <div
        style={{
          position: 'absolute',
          left: 170,
          top: 120,
          width: 170,
          height: 52,
          backgroundColor: '#ffffff',
          border: '3px solid #d5d2cc',
          borderRadius: 14,
          padding: '8px 14px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: childEntrance * folderDim,
          transform: `translateX(${childX}px) translateY(${floatY}px)`,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 7V19C3 20.1046 3.89543 21 21 21H19C20.1046 21 21 20.1046 21 19V9C21 7.89543 20.1046 7 19 7H12L10 4H5C3.89543 4 3 4.89543 3 6V7Z"
            stroke="#1273c4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {childFolderText && (
          <span
            style={{
              fontFamily: 'JetBrains Mono, Pretendard, monospace',
              fontSize: 15,
              fontWeight: 700,
              color: '#101113',
              letterSpacing: '-0.3px',
            }}
          >
            {childFolderText}
          </span>
        )}
      </div>

      {/* 새로 생성되어 안착한 에이전트 파일 (포커스 주인공) */}
      <div
        style={{
          position: 'absolute',
          left: 250,
          top: 200,
          width: 230,
          backgroundColor: '#ffffff',
          border: '3px solid #1273c4',
          borderRadius: 16,
          padding: '14px 16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          opacity: fileEntrance,
          transform: `scale(${fileScale}) translateY(${fileY - floatY}px)`,
          transformOrigin: 'left center',
          zIndex: 4,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: '#1273c4',
            opacity: beaconOpacity,
            transform: `scale(${beaconScale})`,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                stroke="#1273c4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2V8H20"
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

          {statusText && (
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
              {statusText}
            </div>
          )}
        </div>

        {fileText && (
          <div
            style={{
              fontFamily: 'Pretendard, -apple-system, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: '#101113',
              lineHeight: 1.4,
              wordBreak: 'keep-all',
              marginTop: '2px',
            }}
          >
            {fileText}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            style={{
              width: '75%',
              height: 3,
              backgroundColor: '#f0efec',
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: '45%',
              height: 3,
              backgroundColor: '#f0efec',
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
};
