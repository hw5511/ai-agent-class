// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, interpolateColors, Easing } from "remotion";

export const canvas = { w: 440, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  fileAction?: string;
  installStep?: string;
  methodLabel?: string;
}

export const DoubleClickInstaller: React.FC<Props> = ({
  delay = 0,
  budget,
  fileAction = "",
  installStep = "",
  methodLabel = "",
}) => {
  const frame = useCurrentFrame() - delay;

  // 쉬지 않는 미세 부유 생명력 모션
  const hoverY = Math.sin(Math.max(0, frame) * 0.08) * 3;

  // 1. 패키지 카드 최초 진입 (시작 24프레임 이내 — 45프레임 규칙 준수)
  const cardEnter = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cardBaseScale = interpolate(frame, [0, 22], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  // 2. 마우스 커서 등장 (프레임 28~54)
  const cursorProgress = interpolate(frame, [28, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cursorX = interpolate(cursorProgress, [0, 1], [330, 224]);
  const cursorY = interpolate(cursorProgress, [0, 1], [260, 136]);
  const cursorOpacity = interpolate(cursorProgress, [0, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. 더블클릭 반응 (클릭 1: 68f, 클릭 2: 84f)
  const click1Scale = interpolate(frame, [68, 72, 76], [1, 0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple1Scale = interpolate(frame, [70, 88], [0.4, 2.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ripple1Opacity = interpolate(frame, [70, 74, 88], [0, 0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const click2Scale = interpolate(frame, [84, 88, 92], [1, 0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple2Scale = interpolate(frame, [86, 106], [0.4, 2.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ripple2Opacity = interpolate(frame, [86, 90, 106], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cursorScale = click1Scale * click2Scale;

  // 4. "가볍게" 강조 배지 등장 (클릭 시점에 맞춰 등장)
  const methodBadgeOpacity = interpolate(frame, [60, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const methodBadgeY = interpolate(frame, [60, 75], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 5. 설치 진행 게이지 (프레임 98~165) 및 포커스 팝 (1.0 -> 1.08)
  const installProgress = interpolate(frame, [98, 165], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const cardFocusScale = interpolate(frame, [98, 125], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const borderColor = interpolateColors(frame, [95, 115], ["#d5d2cc", "#1273c4"]);

  // 커서는 설치 트리거 후 자연스럽게 퇴장
  const cursorPostOpacity = interpolate(frame, [112, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 6. 설치 완료 스파크 (프레임 165+)
  const successPop = interpolate(frame, [165, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  return (
    <div
      style={{
        position: "relative",
        width: 440,
        height: 320,
        backgroundColor: "transparent",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 마우스 조작 강조 배지 */}
      {methodLabel ? (
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 28,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 14,
            backgroundColor: "#e8f2fb",
            border: "2px solid #1273c4",
            color: "#1273c4",
            fontFamily: "Pretendard, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            opacity: methodBadgeOpacity,
            transform: `translateY(${methodBadgeY + hoverY * 0.4}px)`,
            zIndex: 10,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1273c4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          <span>{methodLabel}</span>
        </div>
      ) : null}

      {/* 중앙 설치 패키지 카드 */}
      <div
        style={{
          width: 310,
          padding: "20px 22px",
          borderRadius: 18,
          backgroundColor: "#ffffff",
          border: `3px solid ${borderColor}`,
          opacity: cardEnter,
          transform: `translateY(${hoverY}px) scale(${cardBaseScale * cardFocusScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          boxSizing: "border-box",
        }}
      >
        {/* 패키지 벡터 아이콘 */}
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 14,
            backgroundColor: installProgress > 0 ? "#e8f2fb" : "#f0efec",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#101113" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>

          {/* 설치 완료 인디케이터 스파크 */}
          {successPop > 0.01 ? (
            <div
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#1273c4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${successPop})`,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          ) : null}
        </div>

        {/* 설치 파일 대상 문구 */}
        {fileAction ? (
          <div
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: "#101113",
              textAlign: "center",
            }}
          >
            {fileAction}
          </div>
        ) : null}

        {/* 설치 진행 게이지 트랙 및 채움 바 */}
        <div
          style={{
            width: "100%",
            height: 8,
            borderRadius: 4,
            backgroundColor: "#f0efec",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: `${installProgress * 100}%`,
              backgroundColor: "#1273c4",
              borderRadius: 4,
            }}
          />
        </div>

        {/* 설치 진행 상태 문구 */}
        {installStep ? (
          <div
            style={{
              fontFamily: "Spoqa Han Sans Neo, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: installProgress >= 1 ? "#1273c4" : "#43474b",
              textAlign: "center",
            }}
          >
            {installStep}
          </div>
        ) : null}
      </div>

      {/* 더블클릭 파동 링 1 & 2 */}
      <div
        style={{
          position: "absolute",
          left: cursorX - 18,
          top: cursorY - 18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "2.5px solid #1273c4",
          transform: `scale(${ripple1Scale})`,
          opacity: ripple1Opacity,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: cursorX - 18,
          top: cursorY - 18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "2.5px solid #1273c4",
          transform: `scale(${ripple2Scale})`,
          opacity: ripple2Opacity,
          pointerEvents: "none",
        }}
      />

      {/* 부드럽게 날아오는 벡터 마우스 커서 */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          opacity: cursorOpacity * cursorPostOpacity,
          transform: `scale(${cursorScale})`,
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 3L11.5 21L14.8 13.8L22 10.5L4 3Z"
            fill="#ffffff"
            stroke="#101113"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
