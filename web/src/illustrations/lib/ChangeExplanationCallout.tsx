// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 520, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  topicLabel?: string;
  detailLabel?: string;
}

export const ChangeExplanationCallout: React.FC<Props> = ({
  delay = 0,
  budget,
  topicLabel = "",
  detailLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 0~35: 좌측 코드 변경 노드 등장
  const enterLeft = interpolate(f, [0, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 30~65: 인출선 전개
  const lineProgress = interpolate(f, [30, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // 45~110: 우측 설명 카드가 1.16배로 팝업되며 시선 집중
  const calloutScale = interpolate(f, [45, 75, 110], [0.75, 1.16, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const calloutOpacity = interpolate(f, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 설명 집중 시 좌측 요소 부드럽게 딤 (0.76 유지)
  const leftDim = interpolate(f, [65, 95], [1, 0.76], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 지속적 생명력 (부유 및 펄스)
  const floatY = Math.sin(f * 0.05) * 3.5;
  const pulseNode = Math.sin(f * 0.09) * 2;

  // 음파 막대 실시간 웨이브 (말로 설명하는 모션 시각화)
  const waveHeights = [0, 1, 2, 3, 4].map((i) => {
    const wave = Math.sin(f * 0.16 + i * 1.1);
    return Math.max(8, 16 + wave * 9);
  });

  return (
    <div
      style={{
        width: 520,
        height: 360,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        position: "relative",
        boxSizing: "border-box",
        transform: `translateY(${floatY}px)`,
      }}
    >
      {/* 좌측: 변경 전후 코드 노드 */}
      <div
        style={{
          width: 150,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          opacity: enterLeft * leftDim,
          transform: `translateY(${(1 - enterLeft) * 18}px)`,
        }}
      >
        {/* 원본 블록 */}
        <div
          style={{
            width: 140,
            height: 70,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            borderRadius: 14,
            padding: "10px 12px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        >
          <div
            style={{
              width: "45%",
              height: 8,
              backgroundColor: "#d5d2cc",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: "80%",
              height: 8,
              backgroundColor: "#d5d2cc",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: "60%",
              height: 8,
              backgroundColor: "#d5d2cc",
              borderRadius: 4,
            }}
          />
        </div>

        {/* 변경 지점 블록 */}
        <div
          style={{
            width: 150,
            height: 80,
            backgroundColor: "#ffffff",
            border: "3px solid #1273c4",
            borderRadius: 14,
            padding: "12px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            position: "relative",
            boxShadow: "0 6px 16px rgba(18, 115, 196, 0.08)",
          }}
        >
          <div
            style={{
              width: "40%",
              height: 8,
              backgroundColor: "#1273c4",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: "90%",
              height: 10,
              backgroundColor: "#e8f2fb",
              border: "1.5px solid #1273c4",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: "65%",
              height: 8,
              backgroundColor: "#d5d2cc",
              borderRadius: 4,
            }}
          />

          {/* 인출 기준점 원 */}
          <div
            style={{
              position: "absolute",
              right: -8,
              top: 32,
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: "#ffffff",
              border: "3px solid #1273c4",
              boxSizing: "border-box",
              transform: `scale(${1 + pulseNode * 0.08})`,
            }}
          />
        </div>
      </div>

      {/* 중앙 연결선 (인출선) */}
      <svg
        width={100}
        height={100}
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          left: 172,
          top: 135,
          pointerEvents: "none",
        }}
      >
        <path
          d="M 0 50 C 40 50, 50 50, 95 50"
          fill="none"
          stroke="#1273c4"
          strokeWidth={3}
          strokeDasharray={100}
          strokeDashoffset={(1 - lineProgress) * 100}
        />
        {lineProgress > 0.9 ? (
          <circle cx={95} cy={50} r={4} fill="#1273c4" />
        ) : null}
      </svg>

      {/* 우측: 말로 설명하는 콜아웃 카드 */}
      <div
        style={{
          width: 225,
          backgroundColor: "#ffffff",
          border: "3px solid #1273c4",
          borderRadius: 18,
          padding: "18px 16px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          opacity: calloutOpacity,
          transform: `scale(${calloutScale})`,
          boxShadow: "0 12px 28px rgba(18, 115, 196, 0.12)",
          position: "relative",
        }}
      >
        {/* 상단: 음파 애니메이션 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            height: 30,
            padding: "0 4px",
          }}
        >
          <div
            style={{
              padding: "4px 8px",
              backgroundColor: "#e8f2fb",
              borderRadius: 8,
              marginRight: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
              <path
                d="M2 5.5V10.5M5 3V13M8 1V15M11 4V12M14 6V10"
                stroke="#1273c4"
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </svg>
          </div>
          {waveHeights.map((h, idx) => (
            <div
              key={idx}
              style={{
                width: 4,
                height: h,
                backgroundColor: "#1273c4",
                borderRadius: 2,
              }}
            />
          ))}
        </div>

        {/* 텍스트 영역 */}
        {topicLabel || detailLabel ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {topicLabel ? (
              <span
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#101113",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {topicLabel}
              </span>
            ) : null}
            {detailLabel ? (
              <span
                style={{
                  fontFamily: "'Spoqa Han Sans Neo', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#43474b",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.4,
                }}
              >
                {detailLabel}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
