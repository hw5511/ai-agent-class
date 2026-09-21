// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  fileName?: string;
  ruleTag?: string;
  sessionTag?: string;
  reloadTag?: string;
}

export const canvas = { w: 440, h: 320 };

export const SessionRuleKeeper: React.FC<Props> = ({
  delay = 0,
  budget = 900,
  fileName = "",
  ruleTag = "",
  sessionTag = "",
  reloadTag = "",
}) => {
  const frame = useCurrentFrame() - delay;

  // 1. 첫 등장 모션 (0~25f)
  const docOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const docY = interpolate(frame, [0, 25], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 2. 핵심 규칙 실드 배지 팝업 (18~38f)
  const badgeScale = interpolate(frame, [18, 36], [0.65, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.back(1.4),
  });
  const badgeOpacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. 세션 루프 궤도 및 회전 안무 (25~60f)
  const orbitOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const orbitStrokeDash = interpolate(frame, [25, 65], [300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 4. 태그 노출 (35~70f)
  const sessionTagOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const reloadTagOpacity = interpolate(frame, [45, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5. 지속적 생명력 (미세 부유 및 주입 펄스)
  const floatY = Math.sin(frame * 0.08) * 3;
  const reloadPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [0.96, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const orbitRotation = (frame * 0.9) % 360;

  return (
    <div
      style={{
        position: "relative",
        width: canvas.w,
        height: canvas.h,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      {/* 순환 세션 궤도 벡터 (매 세션 다시 읽힘 표현) */}
      <svg
        width={340}
        height={260}
        style={{
          position: "absolute",
          opacity: orbitOpacity,
          pointerEvents: "none",
        }}
        viewBox="0 0 340 260"
        fill="none"
      >
        <ellipse
          cx="170"
          cy="130"
          rx="150"
          ry="110"
          stroke="#d5d2cc"
          strokeWidth="3"
          strokeDasharray="8 8"
          strokeDashoffset={orbitStrokeDash}
        />
        {/* 궤도 회전 입자 */}
        <g transform={`rotate(${orbitRotation} 170 130)`}>
          <circle cx="320" cy="130" r="5" fill="#1273c4" />
        </g>
      </svg>

      {/* 상단 라벨: 매 세션마다 */}
      {sessionTag && (
        <div
          style={{
            position: "absolute",
            top: 22,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: sessionTagOpacity,
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "#ffffff",
            border: "1.5px solid #d5d2cc",
            borderRadius: 14,
            padding: "4px 12px",
            boxShadow: "0 2px 6px rgba(16, 17, 19, 0.04)",
            zIndex: 4,
          }}
        >
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1.5A5.5 5.5 0 1 0 12.5 7"
              stroke="#43474b"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M10 1.5L12.5 1.5L12.5 4"
              stroke="#43474b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: "13px",
              fontFamily: "'Spoqa Han Sans Neo', sans-serif",
              color: "#43474b",
              fontWeight: 500,
              letterSpacing: "-0.2px",
            }}
          >
            {sessionTag}
          </span>
        </div>
      )}

      {/* 중앙 메인: CLAUDE.md 영구 규칙 카드 */}
      <div
        style={{
          position: "relative",
          width: 220,
          height: 180,
          backgroundColor: "#ffffff",
          border: "3.5px solid #1273c4",
          borderRadius: 18,
          transform: `translateY(${docY + floatY}px)`,
          opacity: docOpacity,
          display: "flex",
          flexDirection: "column",
          padding: "16px 18px",
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        {/* 문서 상단: 파일 아이콘 + 파일명 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1.5px solid #e8f2fb",
            paddingBottom: 10,
          }}
        >
          <svg width={18} height={20} viewBox="0 0 18 20" fill="none">
            <path
              d="M2 3.5C2 2.4 2.9 1.5 4 1.5H11L16 6.5V16.5C16 17.6 15.1 18.5 14 18.5H4C2.9 18.5 2 17.6 2 16.5V3.5Z"
              fill="#e8f2fb"
              stroke="#1273c4"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M11 1.5V6.5H16"
              stroke="#1273c4"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          {fileName && (
            <span
              style={{
                fontSize: "15px",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                color: "#101113",
                letterSpacing: "-0.3px",
              }}
            >
              {fileName}
            </span>
          )}
        </div>

        {/* 문서 내부: 보존되는 규칙 본문 라인 도식 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 12,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 4,
              backgroundColor: "#e8f2fb",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: "75%",
              height: 4,
              backgroundColor: "#e8f2fb",
              borderRadius: 2,
            }}
          />

          {/* 핵심 규칙 실드 배지 */}
          {ruleTag && (
            <div
              style={{
                marginTop: 6,
                transform: `scale(${badgeScale})`,
                opacity: badgeOpacity,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                backgroundColor: "#e8f2fb",
                border: "1.5px solid #1273c4",
                borderRadius: 8,
                padding: "6px 10px",
                alignSelf: "flex-start",
              }}
            >
              <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1.5L2 3.5V7C2 10.2 4.1 12.2 7 13C9.9 12.2 12 10.2 12 7V3.5L7 1.5Z"
                  fill="#1273c4"
                />
                <path
                  d="M5 7L6.5 8.5L9.5 5.5"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontSize: "13px",
                  fontFamily: "Pretendard, sans-serif",
                  fontWeight: 700,
                  color: "#1273c4",
                }}
              >
                {ruleTag}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 우측 하단: 다시 읽히는 주입 플로우 배지 */}
      {reloadTag && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 42,
            opacity: reloadTagOpacity,
            transform: `scale(${reloadPulse})`,
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "#1273c4",
            borderRadius: 14,
            padding: "6px 14px",
            boxShadow: "0 4px 12px rgba(18, 115, 196, 0.2)",
            zIndex: 4,
          }}
        >
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7A4.5 4.5 0 0 1 10.5 3.8"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M11.5 7A4.5 4.5 0 0 1 3.5 10.2"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M11.5 3.5V6.5H8.5"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: "13px",
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.2px",
            }}
          >
            {reloadTag}
          </span>
        </div>
      )}
    </div>
  );
};
