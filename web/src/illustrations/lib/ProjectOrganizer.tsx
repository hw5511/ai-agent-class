// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  boxLabel?: string;
  unorganizedLabel?: string;
  organizedLabel?: string;
}

export const ProjectOrganizer: React.FC<Props> = ({
  delay = 0,
  budget,
  boxLabel = "",
  unorganizedLabel = "",
  organizedLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  // 상시 부유 호흡 모션
  const idleFloat = Math.sin(f * 0.08) * 3;

  // 전체 페이드인
  const introOpacity = interpolate(f, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 프로젝트 수납함 스케일 등장
  const boxScale = interpolate(f, [12, 36], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  // 각 대화 버블 비행 모션 진행도 (flyProgress)
  const fly0 = interpolate(f, [38, 66], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.9, 0.3, 1),
  });
  const fly1 = interpolate(f, [50, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.9, 0.3, 1),
  });
  const fly2 = interpolate(f, [62, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.9, 0.3, 1),
  });

  // 정돈 완료 포커스 팝 (Focus Pop)
  const focusPop = interpolate(f, [90, 100, 112], [1, 1.035, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // organizedLabel 페이드인
  const organizedOpacity = interpolate(f, [92, 108], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const organizedY = interpolate(f, [92, 108], [6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 버블 0 위치 (시간 순서 1번 -> 프로젝트 주제 1 상단 슬롯)
  const b0X = interpolate(fly0, [0, 1], [38, 252]);
  const b0Y = interpolate(fly0, [0, 1], [100, 108]);
  const b0Rot = interpolate(fly0, [0, 1], [-5, 0]);

  // 버블 1 위치 (시간 순서 2번 -> 프로젝트 주제 2 슬롯)
  const b1X = interpolate(fly1, [0, 1], [44, 252]);
  const b1Y = interpolate(fly1, [0, 1], [162, 218]);
  const b1Rot = interpolate(fly1, [0, 1], [4, 0]);

  // 버블 2 위치 (시간 순서 3번 -> 프로젝트 주제 1 하단 슬롯)
  const b2X = interpolate(fly2, [0, 1], [36, 252]);
  const b2Y = interpolate(fly2, [0, 1], [224, 154]);
  const b2Rot = interpolate(fly2, [0, 1], [-3, 0]);

  const b0Border = fly0 >= 0.9 ? "#1273c4" : "#d5d2cc";
  const b1Border = fly1 >= 0.9 ? "#1273c4" : "#d5d2cc";
  const b2Border = fly2 >= 0.9 ? "#1273c4" : "#d5d2cc";

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
        opacity: introOpacity,
        fontFamily: "'Pretendard', sans-serif",
      }}
    >
      {/* 좌측: 시간 순서 헤더 영역 */}
      <div
        style={{
          position: "absolute",
          left: 36,
          top: 48,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#7c8288",
          }}
        />
        {unorganizedLabel ? (
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#43474b",
              letterSpacing: "-0.2px",
            }}
          >
            {unorganizedLabel}
          </span>
        ) : null}
      </div>

      {/* 좌측: 시간 순서 점선 가이드 */}
      <svg
        style={{
          position: "absolute",
          left: 40,
          top: 76,
          width: 2,
          height: 194,
        }}
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="194"
          stroke="#d5d2cc"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>

      {/* 우측: 프로젝트 컨테이너 상자 */}
      <div
        style={{
          position: "absolute",
          left: 236,
          top: 40,
          width: 216,
          height: 248,
          borderRadius: 18,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          boxSizing: "border-box",
          transform: `scale(${boxScale * focusPop}) translateY(${idleFloat * 0.4}px)`,
          transformOrigin: "center center",
          padding: "14px 14px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {/* 프로젝트 헤더 및 상태 뱃지 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 4,
            borderBottom: "2px solid #f0efec",
          }}
        >
          {boxLabel ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#e8f2fb",
                padding: "3px 9px",
                borderRadius: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#1273c4",
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1273c4",
                }}
              >
                {boxLabel}
              </span>
            </div>
          ) : (
            <div />
          )}

          {organizedLabel ? (
            <div
              style={{
                opacity: organizedOpacity,
                transform: `translateY(${organizedY}px)`,
                fontSize: 13,
                fontWeight: 600,
                color: "#101113",
                backgroundColor: "#f0efec",
                padding: "3px 7px",
                borderRadius: 6,
              }}
            >
              {organizedLabel}
            </div>
          ) : null}
        </div>

        {/* 그룹 구획 가이드라인 (주제 1 구역, 주제 2 구역) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 4,
          }}
        >
          <div
            style={{
              height: 100,
              borderRadius: 10,
              backgroundColor: "#f0efec",
              border: "2px dashed #d5d2cc",
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              height: 54,
              borderRadius: 10,
              backgroundColor: "#f0efec",
              border: "2px dashed #d5d2cc",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* 비행 대화 버블 0 */}
      <div
        style={{
          position: "absolute",
          left: b0X,
          top: b0Y,
          width: 184,
          height: 38,
          borderRadius: 12,
          backgroundColor: "#ffffff",
          border: `3px solid ${b0Border}`,
          boxSizing: "border-box",
          padding: "7px 10px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transform: `rotate(${b0Rot}deg) translateY(${fly0 === 0 ? idleFloat : 0}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: fly0 >= 0.9 ? "#1273c4" : "#7c8288",
            flexShrink: 0,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          <div
            style={{
              width: "72%",
              height: 6,
              borderRadius: 3,
              backgroundColor: fly0 >= 0.9 ? "#101113" : "#7c8288",
            }}
          />
          <div
            style={{
              width: "44%",
              height: 5,
              borderRadius: 3,
              backgroundColor: "#d5d2cc",
            }}
          />
        </div>
      </div>

      {/* 비행 대화 버블 2 (주제 1 하단 안착) */}
      <div
        style={{
          position: "absolute",
          left: b2X,
          top: b2Y,
          width: 184,
          height: 38,
          borderRadius: 12,
          backgroundColor: "#ffffff",
          border: `3px solid ${b2Border}`,
          boxSizing: "border-box",
          padding: "7px 10px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transform: `rotate(${b2Rot}deg) translateY(${fly2 === 0 ? -idleFloat : 0}px)`,
          zIndex: 9,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: fly2 >= 0.9 ? "#1273c4" : "#7c8288",
            flexShrink: 0,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          <div
            style={{
              width: "82%",
              height: 6,
              borderRadius: 3,
              backgroundColor: fly2 >= 0.9 ? "#101113" : "#7c8288",
            }}
          />
          <div
            style={{
              width: "36%",
              height: 5,
              borderRadius: 3,
              backgroundColor: "#d5d2cc",
            }}
          />
        </div>
      </div>

      {/* 비행 대화 버블 1 (주제 2 안착) */}
      <div
        style={{
          position: "absolute",
          left: b1X,
          top: b1Y,
          width: 184,
          height: 38,
          borderRadius: 12,
          backgroundColor: "#ffffff",
          border: `3px solid ${b1Border}`,
          boxSizing: "border-box",
          padding: "7px 10px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transform: `rotate(${b1Rot}deg) translateY(${fly1 === 0 ? idleFloat * 0.7 : 0}px)`,
          zIndex: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: fly1 >= 0.9 ? "#1273c4" : "#7c8288",
            flexShrink: 0,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          <div
            style={{
              width: "60%",
              height: 6,
              borderRadius: 3,
              backgroundColor: fly1 >= 0.9 ? "#101113" : "#7c8288",
            }}
          />
          <div
            style={{
              width: "50%",
              height: 5,
              borderRadius: 3,
              backgroundColor: "#d5d2cc",
            }}
          />
        </div>
      </div>
    </div>
  );
};
