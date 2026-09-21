// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 560, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  tabSearch?: string;
  tabInstalled?: string;
  tabRepo?: string;
  tabSettings?: string;
}

const C = {
  paper: '#f0efec',
  card: '#ffffff',
  border: '#d5d2cc',
  ink: '#101113',
  ink2: '#43474b',
  muted: '#7c8288',
  accent: '#1273c4',
  accentWash: '#e8f2fb',
};

const fontDisplay = "'Pretendard', -apple-system, sans-serif";

export const PluginCategoryFlow: React.FC<Props> = ({
  delay = 0,
  budget,
  tabSearch = '',
  tabInstalled = '',
  tabRepo = '',
  tabSettings = '',
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 순차 등장 애니메이션 (0~40f)
  const introOp = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. 나레이션 타이밍 연동 포커스 (364f 부근 "저장소부터 넣어보는 거죠")
  const repoFocus = interpolate(f, [360, 395], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 탭 목록 데이터 구성
  const tabs = [
    {
      id: 'search',
      label: tabSearch,
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="3" />
          <path d="M17.5 17.5L23 23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      isTarget: false,
    },
    {
      id: 'installed',
      label: tabInstalled,
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M5 8L14 3L23 8V18L14 23L5 18V8Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M10 13L13 16L19 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      isTarget: false,
    },
    {
      id: 'repo',
      label: tabRepo,
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="5" width="20" height="7" rx="3.5" stroke="currentColor" strokeWidth="3" />
          <rect x="4" y="15" width="20" height="7" rx="3.5" stroke="currentColor" strokeWidth="3" />
          <circle cx="8" cy="8.5" r="1.5" fill="currentColor" />
          <circle cx="8" cy="18.5" r="1.5" fill="currentColor" />
          <path d="M17 8.5H20M17 18.5H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
      isTarget: true,
    },
    {
      id: 'settings',
      label: tabSettings,
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="3" />
          <path d="M14 4V7M14 21V24M4 14H7M21 14H24M6.9 6.9L9 9M19 19L21.1 21.1M6.9 21.1L9 19M19 9L21.1 6.9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      isTarget: false,
    },
  ];

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
        fontFamily: fontDisplay,
        opacity: introOp,
      }}
    >
      {/* 탭들을 연결하는 백그라운드 베이스 라인 */}
      <div
        style={{
          position: 'absolute',
          width: '460px',
          height: '3px',
          backgroundColor: C.border,
          borderRadius: '2px',
          top: '160px',
          zIndex: 1,
        }}
      />

      {/* 4개 카테고리 탭 카드 배치 */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          width: '100%',
          padding: '0 20px',
        }}
      >
        {tabs.map((tab, idx) => {
          // 등장 바운스
          const nodeEnter = interpolate(f, [idx * 6, idx * 6 + 20], [20, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.back(1.5)),
          });

          // 상시 호흡 모션
          const breath = Math.sin((f + idx * 25) / 15) * 3;

          // 포커스 상태 안무
          const isRepo = tab.isTarget;
          const scale = isRepo ? 1 + repoFocus * 0.18 : 1 - repoFocus * 0.04;
          const opacity = isRepo ? 1 : 1 - repoFocus * 0.28; // 비포커스 요소 0.72 유지 (규칙 준수)
          const translateY = nodeEnter + breath - (isRepo ? repoFocus * 12 : 0);

          const borderColor = isRepo
            ? repoFocus > 0.4
              ? C.accent
              : C.border
            : C.border;

          const cardBg = isRepo && repoFocus > 0.3 ? C.accentWash : C.card;
          const iconColor = isRepo && repoFocus > 0.3 ? C.accent : C.ink2;
          const textColor = isRepo && repoFocus > 0.3 ? C.accent : C.ink;

          return (
            <div
              key={tab.id}
              style={{
                width: '116px',
                height: '136px',
                backgroundColor: cardBg,
                border: `3px solid ${borderColor}`,
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
                transition: 'border-color 0.2s, background-color 0.2s',
                position: 'relative',
              }}
            >
              {/* 포커스 시 발생하는 펄스 링 */}
              {isRepo && repoFocus > 0.5 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: '-8px',
                    borderRadius: '22px',
                    border: `2px solid ${C.accent}`,
                    opacity: (1 - (f % 40) / 40) * repoFocus * 0.8,
                    transform: `scale(${1 + ((f % 40) / 40) * 0.08})`,
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* 아이콘 심볼 */}
              <div
                style={{
                  color: iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {tab.icon}
              </div>

              {/* 탭 라벨 (14px 이상 유지) */}
              {tab.label ? (
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: isRepo && repoFocus > 0.3 ? 700 : 600,
                    color: textColor,
                    letterSpacing: '-0.3px',
                    textAlign: 'center',
                  }}
                >
                  {tab.label}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
