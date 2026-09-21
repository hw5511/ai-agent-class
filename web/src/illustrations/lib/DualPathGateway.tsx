// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  appLabel?: string;
  terminalLabel?: string;
  entranceLabel?: string;
}

export const canvas = { w: 460, h: 340 };

export const DualPathGateway: React.FC<Props> = ({
  delay = 0,
  budget = 840,
  appLabel = "",
  terminalLabel = "",
  entranceLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 전체 엔터 모션 (0~30f)
  const enterScale = interpolate(f, [0, 30], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterOpacity = interpolate(f, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. 살아있는 미세 부유 모션
  const floatY = Math.cos(f * 0.07) * 2;

  // 3. 나레이션 구간별 포커스 안무
  // #10 [436~490]: "시작은 앱에서 가볍게" -> 앱 게이트 포커스 팝 (1.14배)
  const appGateScale = interpolate(f, [436, 455, 480, 500], [1, 1.14, 1.14, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const termDimOpacity = interpolate(f, [436, 455, 480, 500], [1, 0.74, 0.74, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // #11~#12 [490~618]: "하고, 반복되는 작업만 터미널로 옮겨와도 좋거든요" -> 터미널 게이트 포커스 팝 (1.14배)
  const termGateScale = interpolate(f, [520, 545, 600, 625], [1, 1.14, 1.14, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const appDimOpacity = interpolate(f, [520, 545, 600, 625], [1, 0.74, 0.74, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 상단 이전 궤적(Handover Arc) 활성화
  const handoverProgress = interpolate(f, [490, 560], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // #13~#16 [618~840]: "앱은 같은 Claude로 들어가는 또 다른 입구니까, 편한 쪽을 골라 쓰면 되는 거예요"
  // -> 중앙 "입구" 배지 1.2배 포커스 팝업
  const entrancePop = interpolate(f, [618, 640, 780, 810], [1, 1.2, 1.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badgePulse = Math.sin(f * 0.15) * 0.08;

  const fontPretendard = "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif";

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        transform: `scale(${enterScale}) translateY(${floatY}px)`,
        opacity: enterOpacity,
        backgroundColor: "#ffffff",
        borderRadius: "18px",
        border: "3px solid #d5d2cc",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* 상단 연결 아치 궤적 및 핸드오버 플로우 */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: canvas.w,
          height: canvas.h,
          pointerEvents: "none",
        }}
      >
        {/* 기본 연결 호 */}
        <path
          d="M 125 72 C 125 22, 335 22, 335 72"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeDasharray="6 8"
        />

        {/* 앱 -> 터미널 전환 애니메이션 스트로크 */}
        {handoverProgress > 0 ? (
          <path
            d="M 125 72 C 125 22, 335 22, 335 72"
            fill="none"
            stroke="#1273c4"
            strokeWidth="4"
            strokeDasharray="180"
            strokeDashoffset={180 * (1 - handoverProgress)}
            strokeLinecap="round"
          />
        ) : null}

        {/* 핸드오버 이동 포커스 도트 */}
        {handoverProgress > 0 && handoverProgress < 1 ? (
          <circle
            cx={interpolate(handoverProgress, [0, 0.5, 1], [125, 230, 335])}
            cy={interpolate(handoverProgress, [0, 0.5, 1], [72, 34, 72])}
            r="6"
            fill="#1273c4"
          />
        ) : null}
      </svg>

      {/* 좌측: 앱 입구 게이트웨이 */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 45,
          width: 160,
          height: 220,
          borderRadius: "18px",
          border: `3px solid ${appGateScale > 1.05 ? "#1273c4" : "#d5d2cc"}`,
          backgroundColor: appGateScale > 1.05 ? "#e8f2fb" : "#ffffff",
          transform: `scale(${appGateScale})`,
          opacity: appDimOpacity,
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 12px",
          boxSizing: "border-box",
        }}
      >
        {appLabel ? (
          <span
            style={{
              fontFamily: fontPretendard,
              fontSize: "16px",
              fontWeight: 700,
              color: "#101113",
              letterSpacing: "-0.2px",
              marginBottom: "14px",
            }}
          >
            {appLabel}
          </span>
        ) : null}

        {/* 아치 포털 기하 그래픽 */}
        <svg width="100" height="135" viewBox="0 0 100 135">
          <path
            d="M 15 130 L 15 50 C 15 20, 85 20, 85 50 L 85 130 Z"
            fill="none"
            stroke={appGateScale > 1.05 ? "#1273c4" : "#d5d2cc"}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M 30 130 L 30 55 C 30 35, 70 35, 70 55 L 70 130"
            fill="none"
            stroke="#d5d2cc"
            strokeWidth="2.5"
            strokeDasharray="4 6"
          />
          <circle cx="50" cy="52" r="7" fill="#1273c4" />
        </svg>
      </div>

      {/* 우측: 터미널 입구 게이트웨이 */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 255,
          width: 160,
          height: 220,
          borderRadius: "18px",
          border: `3px solid ${termGateScale > 1.05 ? "#1273c4" : "#d5d2cc"}`,
          backgroundColor: termGateScale > 1.05 ? "#e8f2fb" : "#ffffff",
          transform: `scale(${termGateScale})`,
          opacity: termDimOpacity,
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 12px",
          boxSizing: "border-box",
        }}
      >
        {terminalLabel ? (
          <span
            style={{
              fontFamily: fontPretendard,
              fontSize: "16px",
              fontWeight: 700,
              color: "#101113",
              letterSpacing: "-0.2px",
              marginBottom: "14px",
            }}
          >
            {terminalLabel}
          </span>
        ) : null}

        {/* 아치 포털 기하 그래픽 */}
        <svg width="100" height="135" viewBox="0 0 100 135">
          <path
            d="M 15 130 L 15 50 C 15 20, 85 20, 85 50 L 85 130 Z"
            fill="none"
            stroke={termGateScale > 1.05 ? "#1273c4" : "#d5d2cc"}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M 30 130 L 30 55 C 30 35, 70 35, 70 55 L 70 130"
            fill="none"
            stroke="#d5d2cc"
            strokeWidth="2.5"
            strokeDasharray="4 6"
          />
          <circle cx="50" cy="52" r="7" fill="#1273c4" />
        </svg>
      </div>

      {/* 중앙: 또 다른 "입구" 강조 배지 */}
      {entranceLabel ? (
        <div
          style={{
            position: "absolute",
            top: 170,
            left: 230,
            transform: `translate(-50%, -50%) scale(${entrancePop + (entrancePop > 1 ? badgePulse : 0)})`,
            transformOrigin: "center center",
            zIndex: 10,
            backgroundColor: "#1273c4",
            color: "#ffffff",
            padding: "8px 18px",
            borderRadius: "16px",
            boxShadow: entrancePop > 1.05 ? "0 4px 14px rgba(18, 115, 196, 0.35)" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontFamily: fontPretendard,
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "-0.2px",
            }}
          >
            {entranceLabel}
          </span>
        </div>
      ) : null}
    </div>
  );
};
