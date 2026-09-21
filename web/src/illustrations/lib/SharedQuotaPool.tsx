// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  accountLabel?: string;
  usageLabel?: string;
  appLabel?: string;
  terminalLabel?: string;
}

export const canvas = { w: 460, h: 340 };

export const SharedQuotaPool: React.FC<Props> = ({
  delay = 0,
  budget = 840,
  accountLabel = "",
  usageLabel = "",
  appLabel = "",
  terminalLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 전체 엔터 모션 (0~30f)
  const enterScale = interpolate(f, [0, 30], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterOpacity = interpolate(f, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. 살아있는 연속 미세 호흡 모션
  const breath = Math.sin(f * 0.08) * 2;
  const liquidPulse = Math.sin(f * 0.12) * 3;

  // 3. 나레이션 타이밍 동기화 안무
  // #2 [98~157]: "앱에서 쓰든 터미널에서" -> 좌우 노드 번갈아 포커스
  const appFocusScale = interpolate(f, [98, 112, 130, 145], [1, 1.15, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const termFocusScale = interpolate(f, [126, 140, 158, 172], [1, 1.15, 1.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // #3~#4 [157~240]: "쓰든 같은 계정에서 빠져나가거든요" -> 중앙 사용량 코어 포커스 팝 (1.12배 확대)
  const coreFocusScale = interpolate(f, [157, 175, 220, 240], [1, 1.12, 1.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outerDimOpacity = interpolate(f, [157, 175, 220, 240], [1, 0.76, 0.76, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // #6~#7 [274~343]: "어느 쪽이 더 아껴진다는 이야기는 아니에요" -> 양쪽 1:1 대칭 밸런스 마크 점등
  const balanceOpacity = interpolate(f, [274, 290, 330, 345], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 파이프 에너지 흐름 오프셋
  const flowOffset = -f * 1.6;

  // 게이지 수면 위치 계산
  const waveY = interpolate(f, [157, 240], [92, 108], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fontPretendard = "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
  const fontSpoqa = "'Spoqa Han Sans Neo', Pretendard, sans-serif";

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        transform: `scale(${enterScale}) translateY(${breath}px)`,
        opacity: enterOpacity,
        backgroundColor: "#ffffff",
        borderRadius: "18px",
        border: "3px solid #d5d2cc",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* 도관 및 에너지 흐름 레이어 */}
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
        <defs>
          <clipPath id="coreTankClip">
            <rect x="135" y="125" width="190" height="175" rx="22" />
          </clipPath>
        </defs>

        {/* 좌측 도관 (앱 -> 코어) */}
        <path
          d="M 100 78 C 100 115, 185 105, 185 125"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 100 78 C 100 115, 185 105, 185 125"
          fill="none"
          stroke="#1273c4"
          strokeWidth="4"
          strokeDasharray="8 12"
          strokeDashoffset={flowOffset}
          strokeLinecap="round"
        />

        {/* 우측 도관 (터미널 -> 코어) */}
        <path
          d="M 360 78 C 360 115, 275 105, 275 125"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 360 78 C 360 115, 275 105, 275 125"
          fill="none"
          stroke="#1273c4"
          strokeWidth="4"
          strokeDasharray="8 12"
          strokeDashoffset={flowOffset}
          strokeLinecap="round"
        />

        {/* 1:1 대칭 균형 기호 (등호 마크) */}
        <g opacity={balanceOpacity}>
          <rect x="220" y="86" width="20" height="3.5" rx="1.75" fill="#1273c4" />
          <rect x="220" y="94" width="20" height="3.5" rx="1.75" fill="#1273c4" />
        </g>
      </svg>

      {/* 상단 좌측: 앱 노드 */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 40,
          width: 120,
          height: 42,
          borderRadius: "14px",
          border: `3px solid ${appFocusScale > 1.05 ? "#1273c4" : "#d5d2cc"}`,
          backgroundColor: appFocusScale > 1.05 ? "#e8f2fb" : "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${appFocusScale})`,
          opacity: outerDimOpacity,
          transformOrigin: "center center",
          boxSizing: "border-box",
        }}
      >
        {appLabel ? (
          <span
            style={{
              fontFamily: fontPretendard,
              fontSize: "14px",
              fontWeight: 700,
              color: "#101113",
              letterSpacing: "-0.2px",
            }}
          >
            {appLabel}
          </span>
        ) : null}
      </div>

      {/* 상단 우측: 터미널 노드 */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 300,
          width: 120,
          height: 42,
          borderRadius: "14px",
          border: `3px solid ${termFocusScale > 1.05 ? "#1273c4" : "#d5d2cc"}`,
          backgroundColor: termFocusScale > 1.05 ? "#e8f2fb" : "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${termFocusScale})`,
          opacity: outerDimOpacity,
          transformOrigin: "center center",
          boxSizing: "border-box",
        }}
      >
        {terminalLabel ? (
          <span
            style={{
              fontFamily: fontPretendard,
              fontSize: "14px",
              fontWeight: 700,
              color: "#101113",
              letterSpacing: "-0.2px",
            }}
          >
            {terminalLabel}
          </span>
        ) : null}
      </div>

      {/* 중앙: 같은 계정 사용량 코어 탱크 */}
      <div
        style={{
          position: "absolute",
          top: 125,
          left: 135,
          width: 190,
          height: 175,
          borderRadius: "22px",
          border: `3.5px solid ${coreFocusScale > 1.05 ? "#1273c4" : "#d5d2cc"}`,
          backgroundColor: "#ffffff",
          transform: `scale(${coreFocusScale})`,
          transformOrigin: "center center",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* 내부 액체 잔여량 게이지 웨이브 */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 190,
            height: 175,
          }}
        >
          <path
            d={`M 0 ${waveY + liquidPulse} Q 47 ${waveY - 5 + liquidPulse}, 95 ${waveY + liquidPulse} T 190 ${waveY + liquidPulse} L 190 175 L 0 175 Z`}
            fill="#e8f2fb"
          />
          <path
            d={`M 0 ${waveY + liquidPulse} Q 47 ${waveY - 5 + liquidPulse}, 95 ${waveY + liquidPulse} T 190 ${waveY + liquidPulse}`}
            fill="none"
            stroke="#1273c4"
            strokeWidth="3"
          />
        </svg>

        {/* 코어 라벨 정보 */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          {accountLabel ? (
            <div
              style={{
                fontFamily: fontSpoqa,
                fontSize: "13px",
                fontWeight: 500,
                color: "#43474b",
                marginBottom: "6px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "2px 10px",
                borderRadius: "8px",
                border: "1px solid #d5d2cc",
              }}
            >
              {accountLabel}
            </div>
          ) : null}

          {usageLabel ? (
            <div
              style={{
                fontFamily: fontPretendard,
                fontSize: "20px",
                fontWeight: 700,
                color: "#101113",
                letterSpacing: "-0.3px",
              }}
            >
              {usageLabel}
            </div>
          ) : null}

          {/* 게이지 눈금선 디테일 */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              marginTop: "12px",
            }}
          >
            <div style={{ width: "16px", height: "3px", backgroundColor: "#1273c4", borderRadius: "2px" }} />
            <div style={{ width: "16px", height: "3px", backgroundColor: "#1273c4", borderRadius: "2px" }} />
            <div style={{ width: "16px", height: "3px", backgroundColor: "#1273c4", borderRadius: "2px" }} />
            <div style={{ width: "16px", height: "3px", backgroundColor: "#d5d2cc", borderRadius: "2px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
