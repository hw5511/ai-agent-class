// Generated with agy (ax-site agy_illustrate.py prompt + STYLE.md contract) for the web viewer, 2026-09-21.
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget?: number;
  inputText?: string;
  outputText?: string;
  badgeText?: string;
}

export const canvas = { w: 520, h: 320 };

export const ChatbotLinearFlow: React.FC<Props> = ({
  delay = 0,
  budget: _budget = 420,
  inputText = "",
  outputText = "",
  badgeText = "",
}) => {
  const frame = useCurrentFrame();
  const currentFrame = Math.max(0, frame - delay);

  // 1. 전체 컴포넌트 진입 및 부유 모션 (쉬지 않는 움직임)
  const enterScale = interpolate(currentFrame, [0, 25], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterOpacity = interpolate(currentFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const floatY = Math.sin(currentFrame * 0.06) * 3;

  // 2. 단방향 데이터 흐름: 입력 노드에서 출력 노드로 전달되는 파란색 펄스 (15~45f)
  const pulseProgress = interpolate(currentFrame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const pulseX = 175 + pulseProgress * 170;

  // 3. '답만 하는 AI' 청크(47f~) 설명 타이밍 포커스 팝 (우측 노드 확대 및 강조)
  const isFocusOutput = currentFrame >= 47 && currentFrame < 94;
  const outputScale = interpolate(
    currentFrame,
    [47, 57, 84, 94],
    [1.0, 1.15, 1.15, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.4)),
    }
  );

  const inputOpacity = isFocusOutput ? 0.74 : 1.0;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transform: `translateY(${floatY}px) scale(${enterScale})`,
        opacity: enterOpacity,
        fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* 바깥 배경 카드 */}
      <div
        style={{
          width: 480,
          height: 280,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          borderRadius: "18px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
          padding: "24px 20px",
          boxShadow: "0 8px 24px rgba(16, 17, 19, 0.04)",
        }}
      >
        {/* 상단 액센트 배지 */}
        {badgeText && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "4px 12px",
              backgroundColor: "#e8f2fb",
              borderRadius: "8px",
              border: "1.5px solid #1273c4",
              color: "#1273c4",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "-0.2px",
              marginBottom: "32px",
            }}
          >
            {badgeText}
          </div>
        )}

        {/* 연결 선 및 단방향 화살표 SVG */}
        <svg
          style={{
            position: "absolute",
            top: 140,
            left: 0,
            width: "100%",
            height: 40,
            pointerEvents: "none",
          }}
        >
          {/* 단방향 진행선 */}
          <line
            x1="180"
            y1="20"
            x2="330"
            y2="20"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          {/* 화살표 머리 */}
          <path
            d="M 326 14 L 334 20 L 326 26"
            fill="none"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 이동하는 프리즘 블루 에너지 펄스 */}
          {pulseProgress > 0 && pulseProgress < 1 && (
            <circle
              cx={pulseX}
              cy="20"
              r="5"
              fill="#1273c4"
              style={{
                filter: "drop-shadow(0 0 6px rgba(18, 115, 196, 0.5))",
              }}
            />
          )}
        </svg>

        {/* 중앙 인터랙션 노드 2개 (좌: 입력 노드, 우: 단답 출력 노드) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 410,
            marginTop: "16px",
          }}
        >
          {/* 1. 입력 노드 (채팅 질문) */}
          <div
            style={{
              width: 140,
              height: 84,
              backgroundColor: "#f0efec",
              border: "3px solid #d5d2cc",
              borderRadius: "14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              padding: "8px",
              opacity: inputOpacity,
              transition: "opacity 0.2s ease",
            }}
          >
            {/* 키보드/메시지 벡터 심볼 */}
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" style={{ marginBottom: 6 }}>
              <rect x="2" y="2" width="20" height="16" rx="4" stroke="#43474b" strokeWidth="2.5" />
              <line x1="6" y1="8" x2="8" y2="8" stroke="#43474b" strokeWidth="2" strokeLinecap="round" />
              <line x1="11" y1="8" x2="13" y2="8" stroke="#43474b" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="8" x2="18" y2="8" stroke="#43474b" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="12" x2="16" y2="12" stroke="#43474b" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {inputText && (
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#101113",
                  textAlign: "center",
                  letterSpacing: "-0.3px",
                }}
              >
                {inputText}
              </span>
            )}
          </div>

          {/* 2. 출력 노드 (답변만 하고 멈춤) */}
          <div
            style={{
              width: 140,
              height: 84,
              backgroundColor: isFocusOutput ? "#e8f2fb" : "#ffffff",
              border: isFocusOutput ? "3px solid #1273c4" : "3px solid #d5d2cc",
              borderRadius: "14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              padding: "8px",
              transform: `scale(${outputScale})`,
              boxShadow: isFocusOutput
                ? "0 6px 20px rgba(18, 115, 196, 0.2)"
                : "none",
              position: "relative",
            }}
          >
            {/* 단답 텍스트 벡터 심볼 */}
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" style={{ marginBottom: 6 }}>
              <path
                d="M3 4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4V13C21 14.1046 20.1046 15 19 15H8L4 18V4Z"
                stroke={isFocusOutput ? "#1273c4" : "#43474b"}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <line
                x1="8"
                y1="7"
                x2="16"
                y2="7"
                stroke={isFocusOutput ? "#1273c4" : "#7c8288"}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="8"
                y1="10"
                x2="13"
                y2="10"
                stroke={isFocusOutput ? "#1273c4" : "#7c8288"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {outputText && (
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: isFocusOutput ? "#1273c4" : "#101113",
                  textAlign: "center",
                  letterSpacing: "-0.3px",
                }}
              >
                {outputText}
              </span>
            )}

            {/* 단절/정지 표시: 더 이상 이어지지 않는 벽(X/Stop) */}
            <div
              style={{
                position: "absolute",
                right: -24,
                top: 28,
                width: 6,
                height: 28,
                backgroundColor: "#7c8288",
                borderRadius: "3px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
