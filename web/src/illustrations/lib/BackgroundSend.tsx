// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing, interpolateColors } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  shortcutKey?: string;
  taskLabel?: string;
  directionLabel?: string;
  resultLabel?: string;
}

export const BackgroundSend: React.FC<Props> = ({
  delay = 0,
  budget,
  shortcutKey = "",
  taskLabel = "",
  directionLabel = "",
  resultLabel = "",
}) => {
  const rawFrame = useCurrentFrame() - delay;
  const frame = Math.max(0, rawFrame);

  // 1. 기본 진입 모션 (0~24f)
  const entryProgress = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const entryScale = interpolate(entryProgress, [0, 1], [0.94, 1]);
  const entryOpacity = entryProgress;

  // 2. 단축키 키캡 하이라이트 및 클릭 프레스 (540~630f)
  const keyHighlight = interpolate(
    frame,
    [540, 570, 620, 650],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const keyBorder = interpolateColors(
    keyHighlight,
    [0, 1],
    ["#101113", "#1273c4"]
  );
  const keyBg = interpolateColors(
    keyHighlight,
    [0, 1],
    ["#ffffff", "#e8f2fb"]
  );

  const keyPress = interpolate(frame, [590, 605, 620, 635], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const keyDepth = interpolate(keyPress, [0, 1], [4, 1]);
  const keyOffsetY = interpolate(keyPress, [0, 1], [0, 3]);

  // 3. 작업 카드의 뒤(백그라운드) 레이어 전송 안무 (605~665f: Ctrl+B 입력과 동기화)
  const sendProgress = interpolate(frame, [605, 665], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const cardX = interpolate(sendProgress, [0, 1], [18, 238]);
  const cardY = interpolate(sendProgress, [0, 1], [14, 38]);
  const cardScale = interpolate(sendProgress, [0, 1], [1.0, 0.78]);
  // 비포커스 및 뒤쪽 레이어 요소는 opacity 0.72 이상 유지 규칙 준수
  const cardOpacity = interpolate(sendProgress, [0, 1], [1.0, 0.85]);

  // 4. 완료 상태 배지 팝업 (660~700f)
  const resultProgress = interpolate(frame, [660, 690], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const resultScale = interpolate(resultProgress, [0, 1], [0.6, 1]);
  const resultOpacity = interpolate(frame, [660, 675], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 지속적 생명력 (미세 호흡 및 펄스)
  const idleBreathe = Math.sin(frame * 0.08) * 2;
  const ringPulse = Math.sin(frame * 0.1) * 3;

  return (
    <div
      style={{
        width: 480,
        height: 320,
        backgroundColor: "#ffffff",
        border: "3px solid #d5d2cc",
        borderRadius: 18,
        boxSizing: "border-box",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        fontFamily:
          "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        color: "#101113",
        transform: `scale(${entryScale})`,
        opacity: entryOpacity,
      }}
    >
      {/* 상단 바: 키캡 단축키 & 결과 배지 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 36,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {shortcutKey ? (
            <div
              style={{
                backgroundColor: keyBg,
                border: `3px solid ${keyBorder}`,
                borderRadius: 8,
                padding: "4px 14px",
                fontSize: 15,
                fontWeight: 700,
                color: "#101113",
                boxShadow: `0 ${keyDepth}px 0 #d5d2cc`,
                transform: `translateY(${keyOffsetY}px)`,
                display: "inline-flex",
                alignItems: "center",
                lineHeight: 1.2,
              }}
            >
              {shortcutKey}
            </div>
          ) : null}
        </div>

        {resultLabel ? (
          <div
            style={{
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 13,
              fontWeight: 600,
              color: "#1273c4",
              opacity: resultOpacity,
              transform: `scale(${resultScale})`,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7.5L5.5 10L11 4"
                stroke="#1273c4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{resultLabel}</span>
          </div>
        ) : null}
      </div>

      {/* 중앙/하단 전후 레이어 안무 스테이지 */}
      <div
        style={{
          height: 210,
          position: "relative",
          marginTop: 10,
        }}
      >
        {/* 뒤쪽(백그라운드) 안착 슬롯 */}
        <div
          style={{
            position: "absolute",
            top: 38,
            left: 238,
            width: 194,
            height: 126,
            borderRadius: 14,
            border: "3px dashed #d5d2cc",
            backgroundColor: "#f0efec",
            boxSizing: "border-box",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {directionLabel ? (
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#7c8288",
                }}
              >
                {directionLabel}
              </span>
            ) : (
              <div />
            )}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="#7c8288"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              width: "100%",
              height: 6,
              backgroundColor: "#d5d2cc",
              borderRadius: 3,
            }}
          />
        </div>

        {/* 전송 궤적 가이드 곡선 */}
        <svg
          width="430"
          height="190"
          viewBox="0 0 430 190"
          fill="none"
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          <path
            d="M 170 80 C 210 50, 230 65, 260 75"
            stroke="#1273c4"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeOpacity={sendProgress > 0 ? 0.7 : 0.2}
          />
        </svg>

        {/* 이동하는 작업 카드 (앞 -> 뒤) */}
        <div
          style={{
            position: "absolute",
            top: cardY,
            left: cardX,
            width: 194,
            height: 126,
            borderRadius: 14,
            border: "3px solid #101113",
            backgroundColor: "#ffffff",
            boxSizing: "border-box",
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow:
              sendProgress > 0.5
                ? "0 4px 12px rgba(16, 17, 19, 0.06)"
                : `0 ${6 + ringPulse}px 18px rgba(16, 17, 19, 0.08)`,
            transform: `scale(${cardScale}) translateY(${
              sendProgress === 0 ? idleBreathe : 0
            }px)`,
            transformOrigin: "center center",
            opacity: cardOpacity,
            zIndex: 10,
          }}
        >
          {/* 작업 카드 상단 아이콘 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: "#e8f2fb",
                border: "2px solid #1273c4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="2"
                  y="4"
                  width="12"
                  height="9"
                  rx="2"
                  stroke="#1273c4"
                  strokeWidth="2"
                />
                <path d="M5 2H11" stroke="#1273c4" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#1273c4",
              }}
            />
          </div>

          {/* 작업 카드 중앙 라벨 */}
          {taskLabel ? (
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#101113",
              }}
            >
              {taskLabel}
            </div>
          ) : null}

          {/* 미니 프로그레스 바 */}
          <div
            style={{
              width: "100%",
              height: 6,
              backgroundColor: "#f0efec",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "55%",
                height: "100%",
                backgroundColor: "#1273c4",
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const canvas = { w: 480, h: 320 };
