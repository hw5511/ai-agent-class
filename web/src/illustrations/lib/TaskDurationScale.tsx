// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  quickTaskText?: string;
  limitText?: string;
  adequateText?: string;
  longTaskText?: string;
}

export const canvas = { w: 540, h: 300 };

export const TaskDurationScale: React.FC<Props> = ({
  delay = 0,
  budget,
  quickTaskText = "",
  limitText = "",
  adequateText = "",
  longTaskText = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 상시 부유 모션
  const breathe = Math.sin(f * 0.07) * 2.5;

  // 전체 진입 안무 (0~35f)
  const enterScale = interpolate(f, [0, 35], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterOpacity = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 빠른 작업(1초 미만) 실행 후 완료 팝업 (15~60f)
  const quickTaskX = interpolate(f, [15, 45], [45, 95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const quickCheckScale = interpolate(f, [45, 60, 75], [0, 1.25, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // 2분 기준 핀 포커스 팝 (85~140f)
  const limitPinScale = interpolate(f, [85, 115, 140], [1, 1.16, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // 오래 걸리는 작업의 느린 진행 안무 (150~260f)
  const longTaskX = interpolate(f, [150, 260], [100, 435], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const gearRotate = (f * 3) % 360;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f0efec",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        boxSizing: "border-box",
        fontFamily: "Pretendard, -apple-system, sans-serif",
        transform: `scale(${enterScale}) translateY(${breathe}px)`,
        opacity: enterOpacity,
      }}
    >
      {/* 넉넉한 2분 구간 하이라이트 밴드 (0초 ~ 2분) */}
      <div
        style={{
          position: "absolute",
          left: 55,
          top: 140,
          width: 260,
          height: 32,
          backgroundColor: "#e8f2fb",
          borderRadius: 8,
          border: "2px solid #1273c4",
          opacity: 0.85,
        }}
      />

      {/* 수평 시간축 메인 레일 */}
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 152,
          width: 450,
          height: 8,
          backgroundColor: "#ffffff",
          borderRadius: 4,
          border: "2px solid #d5d2cc",
        }}
      />

      {/* 눈금 표시들 */}
      <div
        style={{
          position: "absolute",
          left: 55,
          top: 144,
          width: 4,
          height: 24,
          backgroundColor: "#101113",
          borderRadius: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 95,
          top: 147,
          width: 3,
          height: 18,
          backgroundColor: "#1273c4",
          borderRadius: 2,
        }}
      />

      {/* 좌측: 1초 미만 빠른 작업 영역 */}
      <div
        style={{
          position: "absolute",
          left: quickTaskX - 22,
          top: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        {quickTaskText ? (
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#101113",
              backgroundColor: "#ffffff",
              border: "2px solid #d5d2cc",
              padding: "4px 8px",
              borderRadius: 8,
              whiteSpace: "nowrap",
            }}
          >
            {quickTaskText}
          </div>
        ) : null}

        {/* 폴더 고유색 아이콘 + 완료 체크 */}
        <div
          style={{
            position: "relative",
            width: 44,
            height: 38,
            backgroundColor: "#fef3d6",
            border: "3px solid #e5a93c",
            borderRadius: 8,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 폴더 탭 */}
          <div
            style={{
              position: "absolute",
              top: -6,
              left: 4,
              width: 14,
              height: 6,
              backgroundColor: "#e5a93c",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          />
          {/* 완료 배지 */}
          <div
            style={{
              transform: `scale(${quickCheckScale})`,
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: "#1273c4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 중앙: 2분 기준 핀 (Focal Standard Point) */}
      <div
        style={{
          position: "absolute",
          left: 295,
          top: 38,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${limitPinScale})`,
          zIndex: 2,
        }}
      >
        {limitText ? (
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: "#ffffff",
              backgroundColor: "#1273c4",
              padding: "5px 12px",
              borderRadius: 8,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 10px rgba(18, 115, 196, 0.3)",
            }}
          >
            {limitText}
          </div>
        ) : null}

        {/* 핀 세로 기둥 */}
        <div
          style={{
            width: 4,
            height: 98,
            backgroundColor: "#1273c4",
            borderRadius: 2,
            marginTop: 4,
          }}
        />

        {/* 넉넉해요 안내 배지 */}
        {adequateText ? (
          <div
            style={{
              marginTop: 6,
              fontSize: 13,
              fontWeight: 700,
              color: "#1273c4",
              backgroundColor: "#ffffff",
              border: "2px solid #1273c4",
              padding: "3px 10px",
              borderRadius: 6,
              whiteSpace: "nowrap",
            }}
          >
            {adequateText}
          </div>
        ) : null}
      </div>

      {/* 우측: 2분을 초과하여 나아가는 오래 걸리는 작업 */}
      <div
        style={{
          position: "absolute",
          left: longTaskX - 24,
          top: 132,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {/* 회전 기어/프로세스 블록 */}
        <div
          style={{
            width: 48,
            height: 48,
            backgroundColor: "#ffffff",
            borderRadius: 12,
            border: "3px solid #43474b",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: `rotate(${gearRotate}deg)` }}
          >
            <circle
              cx="12"
              cy="12"
              r="7"
              stroke="#1273c4"
              strokeWidth="3"
              strokeDasharray="4 4"
            />
            <circle cx="12" cy="12" r="3" fill="#43474b" />
          </svg>
        </div>

        {longTaskText ? (
          <div
            style={{
              marginTop: 10,
              fontSize: 13,
              fontWeight: 700,
              color: "#43474b",
              backgroundColor: "#ffffff",
              border: "2px solid #d5d2cc",
              padding: "4px 8px",
              borderRadius: 8,
              whiteSpace: "nowrap",
            }}
          >
            {longTaskText}
          </div>
        ) : null}
      </div>
    </div>
  );
};
