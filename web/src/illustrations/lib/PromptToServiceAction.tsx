// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing, interpolateColors } from "remotion";

export const canvas = { w: 480, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  promptLabel?: string;
  serviceLabel?: string;
  resultLabel?: string;
}

export const PromptToServiceAction: React.FC<Props> = ({
  delay = 0,
  budget = 840,
  promptLabel = "",
  serviceLabel = "",
  resultLabel = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  // 1. 왼쪽 프롬프트 카드 등장 및 지속 부유
  const enterPrompt = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const scalePrompt = interpolate(enterPrompt, [0, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const floatPrompt = Math.sin(frame * 0.08) * 3;

  // 2. 중앙 연결 통로 및 데이터 펄스 전송
  const enterBridge = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulseLoop = (frame % 45) / 45;
  const pulseX = interpolate(pulseLoop, [0, 1], [175, 305], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulseOpacity = interpolate(pulseLoop, [0, 0.15, 0.85, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bridgeGlow = interpolateColors(
    frame % 60,
    [0, 30, 60],
    ["#1273c4", "#e8f2fb", "#1273c4"]
  );

  // 3. 오른쪽 외부 서비스 카드 등장 및 기어 회전
  const enterService = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const scaleService = interpolate(enterService, [0, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const floatService = Math.cos(frame * 0.07) * 3;
  const gearRotation = (frame * 1.8) % 360;

  // 4. 하단 결과 카드 생성 흐름
  const flowProgress = interpolate(frame, [45, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterResult = interpolate(frame, [60, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const scaleResult = interpolate(enterResult, [0, 1], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const floatResult = Math.sin((frame + 20) * 0.06) * 2;
  const checkProgress = interpolate(frame, [80, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: 480,
        height: 320,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
        fontFamily: "'Pretendard', sans-serif",
      }}
    >
      {/* 중앙 연결 파이프라인 */}
      <div
        style={{
          position: "absolute",
          left: 165,
          top: 35,
          width: 150,
          height: 100,
          opacity: enterBridge,
        }}
      >
        <svg width="150" height="100" viewBox="0 0 150 100" fill="none">
          <line
            x1="0"
            y1="50"
            x2="150"
            y2="50"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
        </svg>

        {/* 중앙 인터랙션 노드 배지 */}
        <div
          style={{
            position: "absolute",
            left: 55,
            top: 30,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#ffffff",
            border: `3px solid ${bridgeGlow}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(18, 115, 196, 0.15)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10H16M16 10L11 5M16 10L11 15"
              stroke="#1273c4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 전송되는 데이터 펄스 패킷 */}
        <div
          style={{
            position: "absolute",
            left: pulseX - 165,
            top: 45,
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#1273c4",
            opacity: pulseOpacity,
            boxShadow: "0 0 8px #1273c4",
          }}
        />
      </div>

      {/* 왼쪽: 프롬프트 지시 카드 */}
      <div
        style={{
          position: "absolute",
          left: 25,
          top: 35 + floatPrompt,
          width: 140,
          height: 100,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          boxShadow: "0 4px 12px rgba(16, 17, 19, 0.05)",
          opacity: enterPrompt,
          transform: `scale(${scalePrompt})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 12px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: "#e8f2fb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V15C20 16.1046 19.1046 17 18 17H8L4 21V6Z"
              fill="#e8f2fb"
              stroke="#1273c4"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M8 10H16M8 13H13"
              stroke="#1273c4"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {promptLabel && (
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#101113",
              textAlign: "center",
              lineHeight: 1.3,
              wordBreak: "keep-all",
            }}
          >
            {promptLabel}
          </div>
        )}
      </div>

      {/* 오른쪽: 외부 서비스 실행 엔진 카드 */}
      <div
        style={{
          position: "absolute",
          left: 315,
          top: 35 + floatService,
          width: 140,
          height: 100,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          boxShadow: "0 4px 12px rgba(16, 17, 19, 0.05)",
          opacity: enterService,
          transform: `scale(${scaleService})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 12px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 6,
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            style={{ transform: `rotate(${gearRotation}deg)` }}
          >
            <circle cx="16" cy="16" r="6" stroke="#1273c4" strokeWidth="2.5" fill="#e8f2fb" />
            <path
              d="M16 2V6M16 26V30M2 16H6M26 16H30M6.1 6.1L8.9 8.9M23.1 23.1L25.9 25.9M6.1 25.9L8.9 23.1M23.1 8.9L25.9 6.1"
              stroke="#1273c4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {serviceLabel && (
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#101113",
              textAlign: "center",
              lineHeight: 1.3,
              wordBreak: "keep-all",
            }}
          >
            {serviceLabel}
          </div>
        )}
      </div>

      {/* 중앙에서 하단 결과 카드로 이어지는 연결 화살표 */}
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 135,
          width: 40,
          height: 60,
          pointerEvents: "none",
        }}
      >
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
          <path
            d="M20 0V48M13 42L20 49L27 42"
            stroke="#1273c4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="60"
            strokeDashoffset={60 * (1 - flowProgress)}
          />
        </svg>
      </div>

      {/* 하단: 생성/실행 완료 결과 카드 */}
      <div
        style={{
          position: "absolute",
          left: 65,
          top: 195 + floatResult,
          width: 350,
          height: 86,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: "3px solid #1273c4",
          boxShadow: "0 6px 18px rgba(18, 115, 196, 0.12)",
          opacity: enterResult,
          transform: `scale(${scaleResult})`,
          display: "flex",
          alignItems: "center",
          padding: "14px 18px",
          boxSizing: "border-box",
          gap: 14,
        }}
      >
        {/* 성공 체크 배지 */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: "#e8f2fb",
            border: "2px solid #1273c4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5L9.5 17L19 7"
              stroke="#1273c4"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="24"
              strokeDashoffset={24 * (1 - checkProgress)}
            />
          </svg>
        </div>

        {/* 결과 라벨 및 상태 라인 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {resultLabel && (
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
                marginBottom: 6,
                lineHeight: 1.3,
                wordBreak: "keep-all",
              }}
            >
              {resultLabel}
            </div>
          )}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div
              style={{
                width: 110,
                height: 5,
                borderRadius: 3,
                backgroundColor: "#e8f2fb",
              }}
            />
            <div
              style={{
                width: 45,
                height: 5,
                borderRadius: 3,
                backgroundColor: "#d5d2cc",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
