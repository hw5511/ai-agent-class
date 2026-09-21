// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 460, h: 340 };

interface Props {
  delay?: number;
  budget: number;
  triggerLabel?: string;
  menuLabel?: string;
  actionSubLabel?: string;
}

const C_LINE = "#d5d2cc";
const C_INK = "#101113";
const C_INK_SUB = "#43474b";
const C_ACCENT = "#1273c4";
const C_ACCENT_WASH = "#e8f2fb";

export const SlashCommandTrigger: React.FC<Props> = ({
  delay = 0,
  budget = 780,
  triggerLabel = "",
  menuLabel = "",
  actionSubLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 1. 슬래시 노드 등장 (0~35f)
  const nodeScale = interpolate(f, [0, 35], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  // 2. 키 입력 클릭 연출 (38~52f)
  const pressScale = interpolate(f, [38, 44, 52], [1, 0.9, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. 리플 링 발산 (42~75f)
  const rippleScale = interpolate(f, [42, 75], [0.9, 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const rippleOpacity = interpolate(f, [42, 75], [0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. 연결 라인 전개 (48~78f)
  const stemHeight = interpolate(f, [48, 78], [0, 36], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // 5. 하단 메뉴 리스트 언폴딩 (60~95f)
  const menuProgress = interpolate(f, [60, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  // 6. 목록 아이템 순차 포커스
  const activeItemIndex = interpolate(f, [140, 220, 360, 440], [0, 1, 1, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 미세 부유 모션
  const floatY = Math.sin(f * 0.05) * 3;

  return (
    <div
      style={{
        position: "relative",
        width: canvas.w,
        height: canvas.h,
        overflow: "hidden",
      }}
    >
      {/* 슬래시 트리거 노드 리플 링 */}
      <div
        style={{
          position: "absolute",
          top: 26 + floatY,
          left: 180,
          width: 100,
          height: 76,
          borderRadius: 18,
          border: `2.5px solid ${C_ACCENT}`,
          boxSizing: "border-box",
          transform: `scale(${rippleScale})`,
          opacity: rippleOpacity,
          pointerEvents: "none",
        }}
      />

      {/* 상단 슬래시 키 노드 */}
      <div
        style={{
          position: "absolute",
          top: 26 + floatY,
          left: 180,
          width: 100,
          height: 76,
          backgroundColor: "#ffffff",
          borderRadius: 18,
          border: `3.5px solid ${C_ACCENT}`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${nodeScale * pressScale})`,
          zIndex: 3,
        }}
      >
        {/* 상단 트리거 안내 배지 */}
        {triggerLabel && (
          <div
            style={{
              position: "absolute",
              top: -16,
              backgroundColor: C_ACCENT_WASH,
              border: `1.5px solid ${C_ACCENT}`,
              borderRadius: 12,
              padding: "2px 10px",
              color: C_ACCENT,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "Pretendard, -apple-system, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {triggerLabel}
          </div>
        )}

        {/* 벡터 슬래시 심볼 */}
        <svg width="40" height="40" viewBox="0 0 40 40">
          <line
            x1="26"
            y1="8"
            x2="14"
            y2="32"
            stroke={C_ACCENT}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 연결 스템 파이프라인 */}
      <div
        style={{
          position: "absolute",
          top: 102 + floatY,
          left: 228,
          width: 4,
          height: stemHeight,
          backgroundColor: C_ACCENT,
          borderRadius: 2,
          zIndex: 2,
        }}
      />

      {/* 하단 스킬 목록 브랜치 다이어그램 */}
      <div
        style={{
          position: "absolute",
          top: 142 + floatY,
          left: 70,
          width: 320,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          border: `3.5px solid ${C_LINE}`,
          boxSizing: "border-box",
          padding: "14px 16px",
          transform: `scale(${menuProgress})`,
          opacity: menuProgress,
          zIndex: 2,
        }}
      >
        {/* 목록 헤더 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
            borderBottom: `2px solid ${C_LINE}`,
            paddingBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: C_ACCENT,
              }}
            />
            {menuLabel && (
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: C_INK,
                  fontFamily: "Pretendard, -apple-system, sans-serif",
                }}
              >
                {menuLabel}
              </span>
            )}
          </div>
          {actionSubLabel && (
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: C_INK_SUB,
                fontFamily: "'Spoqa Han Sans Neo', -apple-system, sans-serif",
              }}
            >
              {actionSubLabel}
            </span>
          )}
        </div>

        {/* 스킬 목록 모듈 슬롯 3개 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[0, 1, 2].map((idx) => {
            const isSelected = Math.round(activeItemIndex) === idx;
            return (
              <div
                key={idx}
                style={{
                  height: 34,
                  borderRadius: 8,
                  border: isSelected
                    ? `2px solid ${C_ACCENT}`
                    : `1.5px solid ${C_LINE}`,
                  backgroundColor: isSelected ? C_ACCENT_WASH : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 12px",
                  gap: 10,
                  boxSizing: "border-box",
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: isSelected ? C_ACCENT : C_INK_SUB,
                    fontFamily: "Pretendard, -apple-system, sans-serif",
                  }}
                >
                  /
                </span>
                <div
                  style={{
                    width: idx === 0 ? 80 : idx === 1 ? 110 : 90,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: isSelected ? C_ACCENT : C_LINE,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
