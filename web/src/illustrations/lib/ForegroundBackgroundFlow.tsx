// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  userLaneLabel?: string;
  actionLabel?: string;
  monitorLaneLabel?: string;
  stopLabel?: string;
}

export const ForegroundBackgroundFlow: React.FC<Props> = ({
  delay = 0,
  budget,
  userLaneLabel = "",
  actionLabel = "",
  monitorLaneLabel = "",
  stopLabel = "",
}) => {
  const currentFrame = useCurrentFrame();
  const f = Math.max(0, currentFrame - delay);

  // 상시 부유 호흡 모션
  const floatOffset = Math.sin(f * 0.07) * 2;

  // 전면 레인: 사용자의 연속 작업 스트림 (멈추지 않는 컨베이어 흐름)
  const streamOffset = (f * 1.6) % 110;

  // 후면 레인 정지 트리거 애니메이션 (750프레임 이후: "그만 보라고 말하면 멈추고")
  const isStopped = f >= 770;
  const stopFocusScale = interpolate(f, [730, 765, 850, 885], [1, 1.08, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const userLaneDim = interpolate(f, [730, 765, 850, 885], [1, 0.82, 0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const stopBadgeScale = interpolate(f, [745, 770, 860, 890], [0, 1, 1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 후면 레이더 파동 모션 (정지 전까지 지속 회전)
  const radarPulse = isStopped ? 0 : (f * 3) % 100;

  return (
    <div
      style={{
        width: 480,
        height: 320,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f0efec",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        boxSizing: "border-box",
        transform: `translateY(${floatOffset}px)`,
      }}
    >
      {/* 상단 레인: 전면 사용자 연속 작업 ("같은 자리에서 계속 다른 걸 시키면 돼요") */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: 440,
          height: 122,
          backgroundColor: "#ffffff",
          borderRadius: 14,
          border: "3px solid #101113",
          boxSizing: "border-box",
          padding: "12px 14px",
          opacity: userLaneDim,
          zIndex: 4,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                backgroundColor: "#1273c4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              ✦
            </span>
            {userLaneLabel !== "" && (
              <span
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#101113",
                }}
              >
                {userLaneLabel}
              </span>
            )}
          </div>

          {actionLabel !== "" && (
            <span
              style={{
                fontFamily: "Spoqa Han Sans Neo, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "#1273c4",
                backgroundColor: "#e8f2fb",
                padding: "2px 8px",
                borderRadius: 6,
              }}
            >
              {actionLabel}
            </span>
          )}
        </div>

        {/* 멈추지 않고 흘러가는 작업 연속 블록들 */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 44,
            overflow: "hidden",
            backgroundColor: "#f0efec",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
          }}
        >
          {[-1, 0, 1, 2, 3].map((idx) => {
            const cardX = idx * 110 + streamOffset;
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: cardX,
                  width: 96,
                  height: 30,
                  backgroundColor: "#ffffff",
                  borderRadius: 6,
                  border: "2px solid #d5d2cc",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  gap: 6,
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#1273c4" }} />
                <div style={{ width: 50, height: 6, borderRadius: 3, backgroundColor: "#d5d2cc" }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* 중앙 분리선: 독립 실행 레인 구분선 */}
      <div
        style={{
          position: "absolute",
          top: 154,
          left: 36,
          right: 36,
          height: 2,
          borderBottom: "2px dashed #d5d2cc",
          zIndex: 1,
        }}
      />

      {/* 하단 레인: 후면 Monitor 감시 ("뒤에서 무언가를 가만히 지켜보다가... 멈추고") */}
      <div
        style={{
          position: "absolute",
          top: 168,
          left: 20,
          width: 440,
          height: 128,
          backgroundColor: "#ffffff",
          borderRadius: 14,
          border: isStopped ? "3px solid #7c8288" : "3px solid #d5d2cc",
          boxSizing: "border-box",
          padding: "12px 14px",
          transform: `scale(${stopFocusScale})`,
          transformOrigin: "center center",
          zIndex: stopFocusScale > 1 ? 8 : 4,
          transition: "border 0.2s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                backgroundColor: isStopped ? "#f0efec" : "#e8f2fb",
                border: isStopped ? "2px solid #7c8288" : "2px solid #1273c4",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isStopped ? "#7c8288" : "#1273c4",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {isStopped ? "❚❚" : "◎"}
            </span>
            {monitorLaneLabel !== "" && (
              <span
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: isStopped ? "#7c8288" : "#43474b",
                }}
              >
                {monitorLaneLabel}
              </span>
            )}
          </div>

          {/* 중지 신호 알림 배지 */}
          {isStopped && stopLabel !== "" && (
            <div
              style={{
                transform: `scale(${stopBadgeScale})`,
                backgroundColor: "#f0efec",
                border: "2px solid #7c8288",
                borderRadius: 6,
                padding: "2px 8px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#7c8288" }} />
              <span
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#43474b",
                }}
              >
                {stopLabel}
              </span>
            </div>
          )}
        </div>

        {/* 후면 감시 레이다 파동 애니메이션 */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 48,
            backgroundColor: "#f0efec",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: isStopped ? "#7c8288" : "#1273c4",
              }}
            />
            <span
              style={{
                fontFamily: "Spoqa Han Sans Neo, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: isStopped ? "#7c8288" : "#43474b",
              }}
            >
              {isStopped ? "모니터링 대기 / 정지됨" : "백그라운드 감시 루프 실행 중"}
            </span>
          </div>

          {/* 활동 파동 원 */}
          {!isStopped && (
            <div style={{ width: 40, height: 28, position: "relative", display: "flex", alignItems: "center" }}>
              <div
                style={{
                  position: "absolute",
                  right: 4,
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: "#e8f2fb",
                  border: "2px solid #1273c4",
                  opacity: 1 - radarPulse / 100,
                  transform: `scale(${1 + radarPulse / 60})`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 8,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#1273c4",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
