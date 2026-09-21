// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import {
  useCurrentFrame,
  interpolate,
  Easing,
  interpolateColors,
} from "remotion";

export const canvas = { w: 440, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  titleText?: string;
  captionText?: string;
  offText?: string;
  deleteText?: string;
}

export const PluginToggle: React.FC<Props> = ({
  delay = 0,
  budget = 960,
  titleText = "",
  captionText = "",
  offText = "",
  deleteText = "",
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - delay);
  const safeBudget = Math.max(budget, 120);

  // 상시 부유 호흡 애니메이션
  const breath = Math.sin(relFrame * 0.06) * 2.2;

  // 진입 애니메이션 (0~30f)
  const enterScale = interpolate(relFrame, [0, 28], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterOpacity = interpolate(relFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 상태 전환 타이밍 구간
  const tToggleStart = safeBudget * 0.35;
  const tToggleDone = safeBudget * 0.45;
  const tEjectStart = safeBudget * 0.68;
  const tEjectPeak = safeBudget * 0.78;
  const tEjectEnd = safeBudget * 0.88;

  // 1. 토글 조작 포커스 팝 (1.12x) & 비활성화(OFF) 스위치 동작
  const toggleFocusScale = interpolate(
    relFrame,
    [tToggleStart - 10, tToggleStart + 10, tToggleDone + 30],
    [1, 1.12, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // 스위치 노브 위치 이동 (ON: 36px -> OFF: 4px)
  const knobX = interpolate(
    relFrame,
    [tToggleStart, tToggleDone],
    [36, 4],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // 스위치 배경색 전환 (블루 -> 연회색)
  const trackBg = interpolateColors(
    relFrame,
    [tToggleStart, tToggleDone],
    ["#1273c4", "#d5d2cc"]
  );

  // 상태 LED 램프 색상 (ON -> OFF)
  const ledColor = interpolateColors(
    relFrame,
    [tToggleStart, tToggleDone],
    ["#1273c4", "#7c8288"]
  );

  // 2. 분리/제거(지우기) 슬롯 포커스 팝 (1.12x)
  const ejectFocusScale = interpolate(
    relFrame,
    [tEjectStart, tEjectPeak, tEjectEnd],
    [1, 1.12, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // 상호 딤 안무 (설명 대상 외 요소는 0.74 로 부드럽게 딤)
  const toggleDimOpacity = interpolate(
    relFrame,
    [tEjectStart, tEjectPeak, tEjectEnd],
    [1, 0.74, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const ejectDimOpacity = interpolate(
    relFrame,
    [tToggleStart - 10, tToggleStart + 10, tToggleDone + 30],
    [1, 0.74, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 상단 결합 핀 분리 모션 (플러그 탈착 시각화)
  const pinDisconnectY = interpolate(
    relFrame,
    [tEjectStart, tEjectPeak],
    [0, -7],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transform: `translateY(${breath}px) scale(${enterScale})`,
        opacity: enterOpacity,
        transformOrigin: "center center",
      }}
    >
      {/* 탈착 가능한 플러그인 유닛 카드 */}
      <div
        style={{
          width: 390,
          height: 256,
          backgroundColor: "#ffffff",
          borderRadius: 18,
          border: "3px solid #d5d2cc",
          boxShadow: "0 10px 24px rgba(16, 17, 19, 0.05)",
          display: "flex",
          flexDirection: "column",
          padding: "16px 20px 14px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* 상단 모듈 결합 핀 (플러그 형태를 나타냄) */}
        <div
          style={{
            position: "absolute",
            top: -10,
            left: 28,
            display: "flex",
            gap: 10,
            transform: `translateY(${pinDisconnectY}px)`,
            transition: "transform 0.1s ease",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 10,
                backgroundColor: "#f0efec",
                border: "2.5px solid #d5d2cc",
                borderBottom: "none",
                borderRadius: "5px 5px 0 0",
              }}
            />
          ))}
        </div>

        {/* 유닛 상단 명칭 및 전원 인디케이터 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
            paddingTop: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: ledColor,
                boxShadow: `0 0 8px ${ledColor}`,
              }}
            />
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#101113",
              }}
            >
              {titleText}
            </div>
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#7c8288",
              fontFamily:
                '"Spoqa Han Sans Neo", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            {captionText}
          </div>
        </div>

        {/* 본문 동작 영역: [끄기 스위치] vs [지우기 버튼] */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* 액션 1: 끄거나 (토글 스위치 카드) */}
          <div
            style={{
              flex: 1,
              height: 136,
              backgroundColor: "#f0efec",
              borderRadius: 14,
              border: "2px solid #d5d2cc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${toggleFocusScale})`,
              opacity: toggleDimOpacity,
              transformOrigin: "center center",
              boxSizing: "border-box",
              padding: "10px",
            }}
          >
            {/* 토글 트랙 */}
            <div
              style={{
                width: 68,
                height: 36,
                borderRadius: 18,
                backgroundColor: trackBg,
                position: "relative",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* 스위치 노브 */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: "#ffffff",
                  position: "absolute",
                  left: knobX,
                  boxShadow: "0 2px 6px rgba(16, 17, 19, 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 10,
                    borderRadius: 2,
                    backgroundColor: "#43474b",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
              }}
            >
              {offText}
            </div>
          </div>

          {/* 액션 2: 지우면 돼요 (분리/제거 슬롯 카드) */}
          <div
            style={{
              flex: 1,
              height: 136,
              backgroundColor: "#f0efec",
              borderRadius: 14,
              border: "2px solid #d5d2cc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${ejectFocusScale})`,
              opacity: ejectDimOpacity,
              transformOrigin: "center center",
              boxSizing: "border-box",
              padding: "10px",
            }}
          >
            {/* 언후크/분리 벡터 아이콘 */}
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                backgroundColor: "#ffffff",
                border: "2px solid #d5d2cc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 8v12"
                  stroke="#43474b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M11 13l5-5 5 5"
                  stroke="#43474b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 24h16"
                  stroke="#1273c4"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
              }}
            >
              {deleteText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
