// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 460, h: 300 };

interface Props {
  delay?: number;
  budget: number;
  slotLabel?: string;
  moduleLabel?: string;
}

export const McpSocketConnector: React.FC<Props> = ({
  delay = 0,
  budget,
  slotLabel = "",
  moduleLabel = "",
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

  // MCP 모듈이 소켓으로 미끄러져 결합되는 모션 (x: 250 -> 164)
  const plugProgress = interpolate(f, [32, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const moduleX = interpolate(plugProgress, [0, 1], [250, 164]);

  const isPlugged = plugProgress >= 0.98;

  // 결합 충격파 링 확산 (frame 60 ~ 85)
  const pulseScale = interpolate(f, [60, 85], [0.6, 2.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulseOpacity = interpolate(f, [60, 65, 85], [0, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 결합 후 전송선 데이터 펄스 순환
  const dataFlow = (Math.max(0, f - 70) * 3) % 120;

  // 상/하단 래치(걸쇠) 맞물림 회전
  const latchRot = interpolate(f, [56, 66], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });

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
      {/* 좌측: 데이터 버스 전송선 */}
      <svg
        style={{
          position: "absolute",
          left: 10,
          top: 146,
          width: 50,
          height: 8,
          overflow: "visible",
        }}
      >
        <line
          x1="0"
          y1="4"
          x2="50"
          y2="4"
          stroke={isPlugged ? "#1273c4" : "#d5d2cc"}
          strokeWidth="3"
        />
        {isPlugged && (
          <circle
            cx={Math.max(0, 50 - (dataFlow % 50))}
            cy="4"
            r="3.5"
            fill="#1273c4"
          />
        )}
      </svg>

      {/* 소켓 본체 (연결을 다루는 칸) */}
      <div
        style={{
          position: "absolute",
          left: 56,
          top: 68,
          width: 114,
          height: 164,
          borderRadius: 18,
          backgroundColor: "#ffffff",
          border: `3px solid ${isPlugged ? "#1273c4" : "#d5d2cc"}`,
          boxSizing: "border-box",
          padding: "12px 10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: `translateY(${idleFloat * 0.5}px)`,
          zIndex: 2,
        }}
      >
        {/* 소켓 상단 라벨 */}
        <div>
          {slotLabel ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                backgroundColor: isPlugged ? "#e8f2fb" : "#f0efec",
                padding: "3px 8px",
                borderRadius: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: isPlugged ? "#1273c4" : "#7c8288",
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: isPlugged ? "#1273c4" : "#43474b",
                }}
              >
                {slotLabel}
              </span>
            </div>
          ) : null}
        </div>

        {/* 핀 수납 접점 홈 3개 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignItems: "flex-end",
            paddingRight: 2,
          }}
        >
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              style={{
                width: 18,
                height: 12,
                borderRadius: 4,
                backgroundColor: isPlugged ? "#e8f2fb" : "#f0efec",
                border: `2px solid ${isPlugged ? "#1273c4" : "#d5d2cc"}`,
                boxSizing: "border-box",
              }}
            />
          ))}
        </div>

        {/* 하단 연결 상태 인디케이터 바 */}
        <div
          style={{
            width: "60%",
            height: 4,
            borderRadius: 2,
            backgroundColor: isPlugged ? "#1273c4" : "#d5d2cc",
          }}
        />
      </div>

      {/* 상단 락 래치(걸쇠) */}
      <div
        style={{
          position: "absolute",
          left: 154,
          top: 60,
          width: 22,
          height: 8,
          borderRadius: 4,
          backgroundColor: isPlugged ? "#1273c4" : "#43474b",
          transformOrigin: "left center",
          transform: `translateY(${idleFloat * 0.5}px) rotate(${isPlugged ? 0 : latchRot}deg)`,
          zIndex: 4,
        }}
      />

      {/* 하단 락 래치(걸쇠) */}
      <div
        style={{
          position: "absolute",
          left: 154,
          top: 232,
          width: 22,
          height: 8,
          borderRadius: 4,
          backgroundColor: isPlugged ? "#1273c4" : "#43474b",
          transformOrigin: "left center",
          transform: `translateY(${idleFloat * 0.5}px) rotate(${isPlugged ? 0 : -latchRot}deg)`,
          zIndex: 4,
        }}
      />

      {/* 결합 충격파 펄스 링 */}
      {f >= 60 && f <= 85 && (
        <div
          style={{
            position: "absolute",
            left: 168,
            top: 150,
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -20,
            borderRadius: 20,
            border: "3px solid #1273c4",
            transform: `scale(${pulseScale})`,
            opacity: pulseOpacity,
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      )}

      {/* 꽂히는 MCP 모듈 카트리지 */}
      <div
        style={{
          position: "absolute",
          left: moduleX,
          top: 76,
          width: 172,
          height: 148,
          transform: `translateY(${isPlugged ? idleFloat * 0.5 : idleFloat}px)`,
          zIndex: 3,
        }}
      >
        {/* 모듈 좌측 접속 핀 단자 3개 */}
        <div
          style={{
            position: "absolute",
            left: -12,
            top: 36,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              style={{
                width: 14,
                height: 12,
                borderRadius: "4px 0 0 4px",
                backgroundColor: isPlugged ? "#1273c4" : "#101113",
                boxSizing: "border-box",
              }}
            />
          ))}
        </div>

        {/* 모듈 카드 본체 */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 18,
            backgroundColor: "#ffffff",
            border: `3px solid ${isPlugged ? "#1273c4" : "#101113"}`,
            boxSizing: "border-box",
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* 모듈 상단 연결 상태 표시 점 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 4 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: isPlugged ? "#1273c4" : "#d5d2cc",
                }}
              />
              <div
                style={{
                  width: 16,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#f0efec",
                }}
              />
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: isPlugged ? "#1273c4" : "#d5d2cc",
              }}
            />
          </div>

          {/* 모듈 중앙: moduleLabel */}
          <div
            style={{
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            {moduleLabel ? (
              <div
                style={{
                  backgroundColor: isPlugged ? "#e8f2fb" : "#f0efec",
                  padding: "6px 16px",
                  borderRadius: 10,
                  border: `2px solid ${isPlugged ? "#1273c4" : "#d5d2cc"}`,
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    color: isPlugged ? "#1273c4" : "#101113",
                  }}
                >
                  {moduleLabel}
                </span>
              </div>
            ) : null}
          </div>

          {/* 모듈 하단 가이드 라인 */}
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: isPlugged ? "#e8f2fb" : "#f0efec",
              }}
            />
            <div
              style={{
                width: 28,
                height: 4,
                borderRadius: 2,
                backgroundColor: isPlugged ? "#1273c4" : "#d5d2cc",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
