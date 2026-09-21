// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 520, h: 360 };

interface SlashLookupDiagramProps {
  delay?: number;
  budget: number;
  triggerLabel?: string;
  inspectLabel?: string;
  memorizeNot?: string;
  principleLabel?: string;
}

export const SlashLookupDiagram: React.FC<SlashLookupDiagramProps> = ({
  delay = 0,
  budget,
  triggerLabel = "",
  inspectLabel = "",
  memorizeNot = "",
  principleLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 전체 베이스 등장 (0~36f: 첫 움직임 45f 이내)
  const enterScale = interpolate(f, [0, 32], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterOpacity = interpolate(f, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. 쉬지 않는 지속 부유 모션
  const floatKey = Math.sin(f * 0.055) * 3;
  const floatDeck = Math.sin(f * 0.055 + 2) * 3;
  const dashOffset = -(f * 2) % 24;

  // 3. 키 프레스 액션 (420~465f: "슬래시를 치고")
  const keyPressY = interpolate(f, [425, 438, 458], [0, 6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const keyPulseScale = interpolate(f, [432, 470], [1, 1.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const keyPulseOpacity = interpolate(f, [432, 470], [0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. 실시간 탐색 덱 전개 (460~535f: "지금 뭐가 있는지 보면 되거든요")
  const item1Pop = interpolate(f, [460, 485], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const item2Pop = interpolate(f, [480, 505], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const item3Pop = interpolate(f, [500, 525], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  // 5. 같은 원리 결합 뱃지 (560~680f)
  const linkOpacity = interpolate(f, [560, 595], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const linkY = interpolate(f, [560, 595], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ringRotate = interpolate(f, [560, 750], [0, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        boxSizing: "border-box",
        backgroundColor: "#f0efec",
        border: "3px solid #d5d2cc",
        borderRadius: 18,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: enterOpacity,
        transform: `scale(${enterScale})`,
        transformOrigin: "center center",
        overflow: "hidden",
      }}
    >
      {/* 상단 라벨 영역 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "2px solid #d5d2cc",
          paddingBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#1273c4",
            }}
          />
          {triggerLabel ? (
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
              }}
            >
              {triggerLabel}
            </span>
          ) : null}
        </div>
        {inspectLabel ? (
          <span
            style={{
              fontFamily: "'Spoqa Han Sans Neo', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#1273c4",
              backgroundColor: "#e8f2fb",
              padding: "4px 10px",
              borderRadius: 8,
              border: "1.5px solid #1273c4",
            }}
          >
            {inspectLabel}
          </span>
        ) : null}
      </div>

      {/* 중앙 메인: [슬래시 키캡] === 빔 ===> [실시간 탐색 덱] */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 4px",
        }}
      >
        {/* 좌측: 슬래시 키캡 */}
        <div
          style={{
            position: "relative",
            width: 110,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateY(${floatKey}px)`,
          }}
        >
          {/* 키 프레스 파동 링 */}
          <div
            style={{
              position: "absolute",
              top: 4,
              width: 86,
              height: 86,
              borderRadius: 20,
              border: "3px solid #1273c4",
              transform: `scale(${keyPulseScale})`,
              opacity: keyPulseOpacity,
              pointerEvents: "none",
            }}
          />

          {/* 키캡 베이스 그림자 */}
          <div
            style={{
              position: "relative",
              width: 86,
              height: 86,
              backgroundColor: "#d5d2cc",
              borderRadius: 18,
            }}
          >
            {/* 누르는 키캡 본체 */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 86,
                height: 80,
                backgroundColor: "#ffffff",
                border: "3px solid #d5d2cc",
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateY(${keyPressY}px)`,
                boxShadow: "0 4px 8px rgba(16, 17, 19, 0.06)",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 34,
                  fontWeight: 800,
                  color: "#1273c4",
                }}
              >
                /
              </span>
            </div>
          </div>
        </div>

        {/* 중앙: 연결 광선 패스 */}
        <div style={{ flex: 1, padding: "0 10px" }}>
          <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none">
            <line
              x1="0"
              y1="12"
              x2="100"
              y2="12"
              stroke="#1273c4"
              strokeWidth="3.5"
              strokeDasharray="6 6"
              strokeDashoffset={dashOffset}
            />
          </svg>
        </div>

        {/* 우측: 실시간 스킬 목록 덱 */}
        <div
          style={{
            width: 210,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            transform: `translateY(${floatDeck}px)`,
          }}
        >
          {/* 아이템 1 */}
          <div
            style={{
              height: 40,
              backgroundColor: "#ffffff",
              border: "2px solid #1273c4",
              borderRadius: 10,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: f < 420 ? 0.8 : item1Pop,
              transform: `scale(${f < 420 ? 1 : Math.max(0.8, item1Pop)})`,
              boxShadow: "0 2px 8px rgba(18, 115, 196, 0.1)",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#1273c4" }} />
              <div style={{ width: 70, height: 6, backgroundColor: "#1273c4", borderRadius: 3 }} />
            </div>
            <div style={{ width: 36, height: 16, backgroundColor: "#e8f2fb", borderRadius: 4 }} />
          </div>

          {/* 아이템 2 */}
          <div
            style={{
              height: 40,
              backgroundColor: "#ffffff",
              border: "2px solid #d5d2cc",
              borderRadius: 10,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: f < 420 ? 0.8 : item2Pop,
              transform: `scale(${f < 420 ? 1 : Math.max(0.8, item2Pop)})`,
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#43474b" }} />
              <div style={{ width: 90, height: 6, backgroundColor: "#43474b", borderRadius: 3 }} />
            </div>
            <div style={{ width: 30, height: 16, backgroundColor: "#f0efec", borderRadius: 4 }} />
          </div>

          {/* 아이템 3 */}
          <div
            style={{
              height: 40,
              backgroundColor: "#ffffff",
              border: "2px solid #d5d2cc",
              borderRadius: 10,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: f < 420 ? 0.8 : item3Pop,
              transform: `scale(${f < 420 ? 1 : Math.max(0.8, item3Pop)})`,
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#7c8288" }} />
              <div style={{ width: 60, height: 6, backgroundColor: "#d5d2cc", borderRadius: 3 }} />
            </div>
            <div style={{ width: 24, height: 16, backgroundColor: "#f0efec", borderRadius: 4 }} />
          </div>
        </div>
      </div>

      {/* 하단 푸터: "외우지 말라고 한" + 연결 고리 + "같은 원리인 거죠" */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          borderTop: "2px solid #d5d2cc",
          paddingTop: 12,
          opacity: linkOpacity,
          transform: `translateY(${linkY}px)`,
        }}
      >
        {memorizeNot ? (
          <span
            style={{
              fontFamily: "'Spoqa Han Sans Neo', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#43474b",
              backgroundColor: "#ffffff",
              border: "2px solid #d5d2cc",
              borderRadius: 8,
              padding: "4px 10px",
            }}
          >
            {memorizeNot}
          </span>
        ) : null}

        {/* 상호 연동되는 인터로킹 링 아이콘 */}
        <div style={{ transform: `rotate(${ringRotate}deg)` }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="12" r="5.5" stroke="#1273c4" strokeWidth="2.5" />
            <circle cx="16" cy="12" r="5.5" stroke="#1273c4" strokeWidth="2.5" />
          </svg>
        </div>

        {principleLabel ? (
          <span
            style={{
              fontFamily: "Pretendard, -apple-system, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#1273c4",
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
              borderRadius: 8,
              padding: "4px 12px",
            }}
          >
            {principleLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};
