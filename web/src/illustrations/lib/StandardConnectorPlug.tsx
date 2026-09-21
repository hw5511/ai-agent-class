// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 460, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  labelSpec?: string;
  labelPlug?: string;
}

export const StandardConnectorPlug: React.FC<Props> = ({
  delay = 0,
  budget,
  labelSpec = "",
  labelPlug = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  // 살아있는 유기적 부유 및 호흡 모션
  const breatheY = Math.sin(frame * 0.06) * 3;
  const cableWave = Math.sin(frame * 0.08) * 4;

  // 플러그가 좌측 소켓으로 다가가 단단하게 체결되는 모션 (0~46프레임)
  const plugOffset = interpolate(frame, [0, 20, 46], [115, 48, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 체결 순간 충격과 탄성 반동 (46~58프레임)
  const snapScaleX = interpolate(frame, [44, 47, 54, 62], [1, 0.94, 1.03, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // 체결 성공 시 방출되는 에너지 링 펄스 (46~74프레임)
  const pulseScale = interpolate(frame, [46, 74], [0.85, 1.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const pulseOpacity = interpolate(frame, [46, 50, 74], [0, 0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 체결 후 케이블에서 포트로 흐르는 데이터 신호 비트 (46프레임 이후 무한 루프)
  const isConnected = frame >= 46;
  const signalLoop = isConnected ? ((frame - 46) % 36) / 36 : 0;
  const signalX = interpolate(signalLoop, [0, 1], [350, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 420,
          height: 240,
          transform: `translateY(${breatheY}px)`,
        }}
      >
        {/* 체결 접점 펄스 링 */}
        {pulseOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              left: 178,
              top: 104,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "3px solid #1273c4",
              transform: `translate(-50%, -50%) scale(${pulseScale})`,
              opacity: pulseOpacity,
              pointerEvents: "none",
            }}
          />
        )}

        {/* 1. 좌측: 표준 규격 포트 (소켓 리셉터클) */}
        <div
          style={{
            position: "absolute",
            left: 30,
            top: 40,
            width: 140,
            height: 128,
            backgroundColor: "#ffffff",
            border: "3.5px solid #101113",
            borderRadius: 18,
            boxShadow: "0 6px 0 #d5d2cc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          {/* 소켓 가이드 홈 */}
          <div
            style={{
              width: 86,
              height: 38,
              backgroundColor: isConnected ? "#e8f2fb" : "#f0efec",
              border: `3px solid ${isConnected ? "#1273c4" : "#101113"}`,
              borderRadius: 19,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
          >
            {/* 표준 규격 중심 접점 바 */}
            <div
              style={{
                width: 44,
                height: 10,
                backgroundColor: isConnected ? "#1273c4" : "#d5d2cc",
                borderRadius: 5,
              }}
            />
          </div>

          {/* 소켓 하단 고정 핀 디테일 */}
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <div
              style={{
                width: 12,
                height: 5,
                backgroundColor: "#d5d2cc",
                borderRadius: 3,
              }}
            />
            <div
              style={{
                width: 12,
                height: 5,
                backgroundColor: "#d5d2cc",
                borderRadius: 3,
              }}
            />
          </div>
        </div>

        {/* 소켓 상단 라벨 배지 */}
        {labelSpec !== "" && (
          <div
            style={{
              position: "absolute",
              left: 42,
              top: 4,
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
              color: "#1273c4",
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 13,
              fontWeight: 700,
              zIndex: 5,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#1273c4",
                display: "inline-block",
              }}
            />
            {labelSpec}
          </div>
        )}

        {/* 2. 우측: 플러그 단자 & 케이블 (슬라이딩 체결) */}
        <div
          style={{
            position: "absolute",
            left: 170 + plugOffset,
            top: 40,
            transformOrigin: "left center",
            transform: `scaleX(${snapScaleX})`,
            zIndex: 3,
          }}
        >
          {/* 플러그 금속 삽입 단자 (타원형 USB-C 팁) */}
          <div
            style={{
              position: "absolute",
              left: -22,
              top: 47,
              width: 34,
              height: 34,
              backgroundColor: "#ffffff",
              border: "3px solid #101113",
              borderRadius: 10,
              zIndex: 1,
            }}
          />

          {/* 플러그 본체 바디 */}
          <div
            style={{
              position: "absolute",
              left: 6,
              top: 36,
              width: 86,
              height: 56,
              backgroundColor: "#ffffff",
              border: "3.5px solid #101113",
              borderRadius: 14,
              boxShadow: "0 5px 0 #d5d2cc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            {/* 플러그 그립 라인 */}
            <div style={{ display: "flex", gap: 5 }}>
              <div
                style={{
                  width: 4,
                  height: 22,
                  backgroundColor: "#d5d2cc",
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  width: 4,
                  height: 22,
                  backgroundColor: "#d5d2cc",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>

          {/* 플러그 후면 케이블 스트레인 릴리프 */}
          <div
            style={{
              position: "absolute",
              left: 92,
              top: 52,
              width: 16,
              height: 24,
              backgroundColor: "#101113",
              borderRadius: 4,
              zIndex: 1,
            }}
          />

          {/* 플러그 상단 라벨 배지 */}
          {labelPlug !== "" && (
            <div
              style={{
                position: "absolute",
                left: 10,
                top: -34,
                backgroundColor: "#ffffff",
                border: "2px solid #101113",
                color: "#101113",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 13,
                fontWeight: 700,
                whiteSpace: "nowrap",
                boxShadow: "0 3px 0 #d5d2cc",
              }}
            >
              {labelPlug}
            </div>
          )}
        </div>

        {/* 3. 유연하게 이어지는 백터 케이블 선 */}
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 420,
            height: 240,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <path
            d={`M ${278 + plugOffset} 104 C ${330 + plugOffset} 104, ${350} ${104 + cableWave}, 415 ${104 + cableWave * 0.5}`}
            fill="none"
            stroke="#101113"
            strokeWidth={4.5}
            strokeLinecap="round"
          />
        </svg>

        {/* 4. 체결 후 케이블을 따라 흐르는 데이터 펄스 비트 */}
        {isConnected && (
          <div
            style={{
              position: "absolute",
              left: signalX,
              top: 104 + cableWave * 0.3,
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#1273c4",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 6px #1273c4",
              zIndex: 4,
            }}
          />
        )}
      </div>
    </div>
  );
};
