// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  title?: string;
}

export const canvas = { w: 480, h: 320 };

export const McpConnectorDock: React.FC<Props> = ({
  delay = 0,
  budget = 240,
  title = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  // 1. 지속적 부유 생명력
  const breatheY = Math.sin(frame * 0.065) * 3;

  // 2. 45프레임 이내 진입
  const dockEnter = interpolate(frame, [0, 24], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const dockOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. 커넥터 접근 및 맞물림 안무 (25~72f)
  const plugApproach = interpolate(frame, [25, 60], [42, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const plugSnap = interpolate(frame, [60, 66, 72], [0, -3.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const latchEngage = interpolate(frame, [68, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });

  // 4. 결합 체결 스파크 플래시 (68~92f)
  const sparkScale = interpolate(frame, [68, 78, 92], [0, 1.25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sparkOpacity = interpolate(frame, [68, 78, 92], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5. 나레이션 #0 "MCP에" 포커스 팝 (78~146f)
  const focusScale = interpolate(
    frame,
    [78, 98, 130, 146],
    [1, 1.15, 1.15, 1.04],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  // 6. 나레이션 #1 "대해서 배워봅시다" 연결 확인 및 활성 데이터 스트림 (142~240f)
  const confirmScale = interpolate(frame, [72, 86], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const packet1 = interpolate(frame, [145, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const packet1Alpha = interpolate(frame, [145, 150, 170, 175], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const packet2 = interpolate(frame, [178, 208], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const packet2Alpha = interpolate(frame, [178, 183, 203, 208], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const packet3 = interpolate(frame, [210, 238], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const packet3Alpha = interpolate(frame, [210, 215, 235, 238], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: canvas.w,
        height: canvas.h,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 390,
          height: 220,
          transform: `scale(${dockEnter * focusScale}) translateY(${breatheY}px)`,
          opacity: dockOpacity,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* 결합 체결 시 상단 확인 배지 */}
        <div
          style={{
            position: "absolute",
            left: 174,
            top: 2,
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: "#1273c4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${confirmScale})`,
            zIndex: 20,
            boxShadow: "0 4px 10px rgba(18, 115, 196, 0.25)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M 3.5 8.5 L 6.5 11.5 L 12.5 4.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 좌측 호스트 소켓 (수용 포트) */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 25,
            width: 155,
            height: 170,
            borderRadius: 18,
            backgroundColor: "#ffffff",
            border: "3.5px solid #d5d2cc",
            boxShadow: "0 8px 24px rgba(16, 17, 19, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 0 0 24px",
            overflow: "hidden",
          }}
        >
          {/* 내부 칩 인터페이스 그래픽 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "#e8f2fb",
                border: "2.5px solid #1273c4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <rect
                  x="4"
                  y="4"
                  width="12"
                  height="12"
                  rx="3"
                  fill="none"
                  stroke="#1273c4"
                  strokeWidth="2"
                />
                <circle cx="10" cy="10" r="2" fill="#1273c4" />
              </svg>
            </div>
            <div
              style={{
                width: 48,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#d5d2cc",
              }}
            />
            <div
              style={{
                width: 32,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#d5d2cc",
              }}
            />
          </div>

          {/* 수용 포트 홈 */}
          <div
            style={{
              width: 26,
              height: 84,
              borderRadius: "8px 0 0 8px",
              backgroundColor: "#e8f2fb",
              border: "3px solid #1273c4",
              borderRight: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "8px 0",
            }}
          >
            <div
              style={{
                width: 10,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#1273c4",
              }}
            />
            <div
              style={{
                width: 10,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#1273c4",
              }}
            />
            <div
              style={{
                width: 10,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#1273c4",
              }}
            />
          </div>
        </div>

        {/* 상/하 잠금 래치 핀 (체결 안무) */}
        <div
          style={{
            position: "absolute",
            left: 172,
            top: 50 + latchEngage * 8,
            width: 12,
            height: 14,
            borderRadius: "4px 4px 0 0",
            backgroundColor: "#1273c4",
            zIndex: 15,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 172,
            bottom: 50 + latchEngage * 8,
            width: 12,
            height: 14,
            borderRadius: "0 0 4px 4px",
            backgroundColor: "#1273c4",
            zIndex: 15,
          }}
        />

        {/* 우측 이동형 커넥터 카트리지 (결합 주체) */}
        <div
          style={{
            position: "absolute",
            left: 178 + plugApproach + plugSnap,
            top: 35,
            width: 165,
            height: 150,
            borderRadius: 18,
            backgroundColor: "#ffffff",
            border: "3.5px solid #1273c4",
            boxShadow: "0 10px 28px rgba(18, 115, 196, 0.12)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* 돌출 결합 플러그 혀 */}
          <div
            style={{
              position: "absolute",
              left: -24,
              top: 36,
              width: 24,
              height: 74,
              borderRadius: "8px 0 0 8px",
              backgroundColor: "#1273c4",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "6px 0",
            }}
          >
            <div
              style={{
                width: 10,
                height: 3,
                borderRadius: 1.5,
                backgroundColor: "#ffffff",
              }}
            />
            <div
              style={{
                width: 10,
                height: 3,
                borderRadius: 1.5,
                backgroundColor: "#ffffff",
              }}
            />
            <div
              style={{
                width: 10,
                height: 3,
                borderRadius: 1.5,
                backgroundColor: "#ffffff",
              }}
            />
          </div>

          {/* 각인 라벨 (나레이션 언급 키워드 "MCP") */}
          {title ? (
            <div
              style={{
                fontSize: 14,
                fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 700,
                color: "#1273c4",
                backgroundColor: "#e8f2fb",
                padding: "2px 10px",
                borderRadius: 8,
                marginBottom: 6,
                letterSpacing: "0.2px",
              }}
            >
              {title}
            </div>
          ) : null}

          {/* 중앙 결합 링크 벡터 아이콘 */}
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path
              d="M 14 20 L 26 20"
              stroke="#1273c4"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle
              cx="12"
              cy="20"
              r="6"
              fill="none"
              stroke="#43474b"
              strokeWidth="3"
            />
            <circle
              cx="28"
              cy="20"
              r="6"
              fill="none"
              stroke="#1273c4"
              strokeWidth="3"
            />
          </svg>

          {/* 우측 인출 케이블 */}
          <div
            style={{
              position: "absolute",
              right: -24,
              top: 71,
              width: 24,
              height: 4,
              backgroundColor: "#d5d2cc",
              borderRadius: "0 2px 2px 0",
            }}
          />
        </div>

        {/* 결합 이음새 스파크 섬광 */}
        {sparkOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              left: 166,
              top: 96,
              width: 26,
              height: 26,
              borderRadius: 13,
              backgroundColor: "#e8f2fb",
              border: "3px solid #1273c4",
              transform: `scale(${sparkScale})`,
              opacity: sparkOpacity,
              zIndex: 25,
            }}
          />
        )}

        {/* 결합 브리지 관통 데이터 펄스들 */}
        {packet1Alpha > 0 && (
          <div
            style={{
              position: "absolute",
              left: 70 + (280 - 70) * packet1,
              top: 107,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#1273c4",
              opacity: packet1Alpha,
              zIndex: 30,
            }}
          />
        )}
        {packet2Alpha > 0 && (
          <div
            style={{
              position: "absolute",
              left: 70 + (280 - 70) * packet2,
              top: 107,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#1273c4",
              opacity: packet2Alpha,
              zIndex: 30,
            }}
          />
        )}
        {packet3Alpha > 0 && (
          <div
            style={{
              position: "absolute",
              left: 70 + (280 - 70) * packet3,
              top: 107,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#1273c4",
              opacity: packet3Alpha,
              zIndex: 30,
            }}
          />
        )}
      </div>
    </div>
  );
};
