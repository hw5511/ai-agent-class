// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 720, h: 420 };

interface Props {
  delay?: number;
  budget: number;
  agentLabel?: string;
  serviceLabel?: string;
  calendarLabel?: string;
  docsLabel?: string;
  connectorLabel?: string;
}

const COLORS = {
  paper: "#f0efec",
  card: "#ffffff",
  border: "#d5d2cc",
  ink: "#101113",
  ink2: "#43474b",
  sub: "#7c8288",
  accent: "#1273c4",
  accentWash: "#e8f2fb",
};

export const ConnectorBridge: React.FC<Props> = ({
  delay = 0,
  budget = 660,
  agentLabel = "",
  serviceLabel = "",
  calendarLabel = "",
  docsLabel = "",
  connectorLabel = "",
}) => {
  const currentFrame = useCurrentFrame();
  const f = Math.max(0, currentFrame - delay);

  // 1. 등장 모션 (0 ~ 45 프레임: 규정상 45프레임 이내 첫 모션 개시)
  const introProgress = interpolate(f, [0, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const agentEnterX = interpolate(f, [5, 40], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const serviceEnterX = interpolate(f, [10, 45], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const pipeProgress = interpolate(f, [35, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 2. 서비스(캘린더/문서) 직접 열어보기 강조 (청크 183 ~ 350)
  const servicePop = interpolate(
    f,
    [183, 215, 320, 350],
    [1, 1.08, 1.08, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    }
  );

  const serviceHighlight = interpolate(
    f,
    [183, 215, 320, 350],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 3. '커넥터' 포커스 팝 (청크 385 ~ 525: 1.18배 확대 & 주변 0.78 딤)
  const connectorScale = interpolate(
    f,
    [385, 415, 495, 525],
    [1, 1.18, 1.18, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    }
  );

  const connectorFocus = interpolate(
    f,
    [385, 415, 495, 525],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const bgDim = interpolate(
    f,
    [385, 415, 495, 525],
    [1, 0.78, 0.78, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 4. 지속적 생명력 모션 (부유 & 호흡)
  const floatAgent = Math.sin((f + 10) * 0.05) * 4;
  const floatService = Math.sin((f + 40) * 0.045) * 4;
  const floatConnector = Math.sin(f * 0.07) * 2;
  const pulseScale = 1 + Math.sin(f * 0.12) * 0.04;

  // 5. 연결 파이프 데이터 흐름 (루프 파티클 3개)
  const packetActive = f > 75;
  const p1 = ((f * 2.2) % 180) / 180;
  const p2 = (((f + 60) * 2.2) % 180) / 180;
  const p3 = (((f + 120) * 2.2) % 180) / 180;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
        fontFamily: "'Pretendard', sans-serif",
      }}
    >
      {/* 1. 좌우 연결 브릿지 & 파이프라인 */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 210,
          width: 300,
          height: 20,
          display: "flex",
          alignItems: "center",
          transform: `translateY(${floatConnector}px)`,
        }}
      >
        {/* 기본 트랙 */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: 300,
            height: 6,
            backgroundColor: COLORS.border,
            borderRadius: 3,
          }}
        />

        {/* 연결 활성화 라인 (좌 -> 우 뻗어나감) */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: 300 * pipeProgress,
            height: 6,
            backgroundColor: COLORS.accent,
            borderRadius: 3,
            boxShadow: `0 0 10px ${COLORS.accentWash}`,
          }}
        />

        {/* 파이프 내부 데이터 패킷 */}
        {packetActive && (
          <>
            {[p1, p2, p3].map((progress, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: progress * 280 + 10,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: COLORS.accent,
                  border: `2px solid ${COLORS.card}`,
                  transform: "translate(-50%, 0)",
                  opacity:
                    progress < 0.1
                      ? progress * 10
                      : progress > 0.9
                      ? (1 - progress) * 10
                      : 1,
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* 2. 좌측 [에이전트 노드] */}
      <div
        style={{
          position: "absolute",
          top: 85,
          left: 45,
          width: 170,
          height: 250,
          opacity: introProgress * bgDim,
          transform: `translate(${agentEnterX}px, ${floatAgent}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 12px",
          boxSizing: "border-box",
          backgroundColor: COLORS.card,
          borderRadius: 18,
          border: `3px solid ${COLORS.border}`,
          boxShadow: "0 8px 24px rgba(16, 17, 19, 0.05)",
        }}
      >
        {/* 에이전트 벡터 아이콘 */}
        <div
          style={{
            width: 110,
            height: 110,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
            {/* 안테나 센서 */}
            <path
              d="M55 22V10"
              stroke={COLORS.ink}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle
              cx="55"
              cy="8"
              r="4.5"
              fill={COLORS.accent}
              stroke={COLORS.ink}
              strokeWidth="3"
            />

            {/* 메인 헤드 프레임 */}
            <rect
              x="16"
              y="22"
              width="78"
              height="66"
              rx="16"
              fill={COLORS.accentWash}
              stroke={COLORS.ink}
              strokeWidth="3.5"
            />

            {/* 바이저/화면 영역 */}
            <rect
              x="26"
              y="34"
              width="58"
              height="36"
              rx="10"
              fill={COLORS.card}
              stroke={COLORS.border}
              strokeWidth="2.5"
            />

            {/* 센서 아이즈 (살아있는 모션: 맥박 깜빡임/크기) */}
            <circle
              cx="44"
              cy="52"
              r="5"
              fill={COLORS.accent}
              style={{
                transform: `scale(${pulseScale})`,
                transformOrigin: "44px 52px",
              }}
            />
            <circle
              cx="66"
              cy="52"
              r="5"
              fill={COLORS.accent}
              style={{
                transform: `scale(${pulseScale})`,
                transformOrigin: "66px 52px",
              }}
            />

            {/* 좌우 이어 노드 */}
            <rect
              x="8"
              y="44"
              width="8"
              height="22"
              rx="4"
              fill={COLORS.border}
              stroke={COLORS.ink}
              strokeWidth="3"
            />
            <rect
              x="94"
              y="44"
              width="8"
              height="22"
              rx="4"
              fill={COLORS.border}
              stroke={COLORS.ink}
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* 에이전트 라벨 */}
        {agentLabel !== "" && (
          <div
            style={{
              padding: "6px 16px",
              backgroundColor: COLORS.paper,
              borderRadius: 12,
              border: `2px solid ${COLORS.border}`,
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.ink,
              textAlign: "center",
              letterSpacing: "-0.2px",
            }}
          >
            {agentLabel}
          </div>
        )}
      </div>

      {/* 3. 우측 [외부 서비스 그룹] */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 45,
          width: 200,
          height: 300,
          opacity: introProgress * bgDim,
          transform: `translate(${serviceEnterX}px, ${floatService}px) scale(${servicePop})`,
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 14px",
          boxSizing: "border-box",
          backgroundColor: COLORS.card,
          borderRadius: 20,
          border: `3px solid ${
            serviceHighlight > 0.5 ? COLORS.accent : COLORS.border
          }`,
          boxShadow:
            serviceHighlight > 0.5
              ? `0 12px 28px ${COLORS.accentWash}`
              : "0 8px 24px rgba(16, 17, 19, 0.05)",
        }}
      >
        {/* 상단 그룹 타이틀 */}
        {serviceLabel !== "" && (
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: COLORS.ink2,
              textAlign: "center",
              paddingBottom: 4,
              borderBottom: `2px solid ${COLORS.border}`,
              width: "100%",
            }}
          >
            {serviceLabel}
          </div>
        )}

        {/* 서브 서비스 1: 캘린더 카드 */}
        <div
          style={{
            width: "100%",
            height: 96,
            backgroundColor: COLORS.paper,
            borderRadius: 12,
            border: `2px solid ${
              serviceHighlight > 0.5 ? COLORS.accent : COLORS.border
            }`,
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
            boxSizing: "border-box",
            gap: 12,
          }}
        >
          {/* 캘린더 벡터 아이콘 */}
          <div style={{ width: 44, height: 44, flexShrink: 0 }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <rect
                x="4"
                y="8"
                width="36"
                height="32"
                rx="8"
                fill={COLORS.card}
                stroke={COLORS.ink}
                strokeWidth="3"
              />
              <path
                d="M4 18H40"
                stroke={COLORS.ink}
                strokeWidth="2.5"
              />
              <path
                d="M13 4V10"
                stroke={COLORS.accent}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M31 4V10"
                stroke={COLORS.accent}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <rect x="10" y="24" width="5" height="5" rx="1.5" fill={COLORS.accent} />
              <rect x="19.5" y="24" width="5" height="5" rx="1.5" fill={COLORS.sub} />
              <rect x="29" y="24" width="5" height="5" rx="1.5" fill={COLORS.sub} />
              <rect x="10" y="32" width="5" height="5" rx="1.5" fill={COLORS.sub} />
              <rect x="19.5" y="32" width="5" height="5" rx="1.5" fill={COLORS.accent} />
            </svg>
          </div>

          {/* 캘린더 라벨 */}
          {calendarLabel !== "" && (
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: COLORS.ink,
              }}
            >
              {calendarLabel}
            </div>
          )}
        </div>

        {/* 서브 서비스 2: 문서 카드 */}
        <div
          style={{
            width: "100%",
            height: 96,
            backgroundColor: COLORS.paper,
            borderRadius: 12,
            border: `2px solid ${
              serviceHighlight > 0.5 ? COLORS.accent : COLORS.border
            }`,
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
            boxSizing: "border-box",
            gap: 12,
          }}
        >
          {/* 문서 벡터 아이콘 */}
          <div style={{ width: 44, height: 44, flexShrink: 0 }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path
                d="M8 8C8 5.79086 9.79086 4 12 4H26L36 14V36C36 38.2091 34.2091 40 32 40H12C9.79086 40 8 38.2091 8 36V8Z"
                fill={COLORS.card}
                stroke={COLORS.ink}
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M26 4V14H36"
                stroke={COLORS.ink}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M15 22H29"
                stroke={COLORS.accent}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M15 28H27"
                stroke={COLORS.sub}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M15 34H22"
                stroke={COLORS.sub}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 문서 라벨 */}
          {docsLabel !== "" && (
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: COLORS.ink,
              }}
            >
              {docsLabel}
            </div>
          )}
        </div>
      </div>

      {/* 4. 중앙 [커넥터 브릿지 & 포커스 허브] */}
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 315,
          width: 90,
          height: 110,
          transform: `translateY(${floatConnector}px) scale(${connectorScale})`,
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        {/* 설명 타이밍 상단 강조 배지 ("커넥터") */}
        {connectorLabel !== "" && (
          <div
            style={{
              position: "absolute",
              top: -34,
              padding: "4px 14px",
              backgroundColor: COLORS.accent,
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 14,
              boxShadow: "0 4px 12px rgba(18, 115, 196, 0.35)",
              whiteSpace: "nowrap",
              transform: `scale(${connectorFocus > 0 ? pulseScale : 1})`,
            }}
          >
            {connectorLabel}
          </div>
        )}

        {/* 커넥터 허브 코어 심볼 */}
        <div
          style={{
            width: 82,
            height: 82,
            borderRadius: "50%",
            backgroundColor: COLORS.card,
            border: `3.5px solid ${
              connectorFocus > 0.5 ? COLORS.accent : COLORS.ink
            }`,
            boxShadow:
              connectorFocus > 0.5
                ? `0 0 24px ${COLORS.accentWash}`
                : "0 6px 16px rgba(16, 17, 19, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* 좌측 소켓 플러그 */}
            <rect
              x="6"
              y="18"
              width="12"
              height="12"
              rx="3"
              fill={COLORS.accentWash}
              stroke={COLORS.accent}
              strokeWidth="2.5"
            />
            <path
              d="M18 24H24"
              stroke={COLORS.accent}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* 우측 소켓 플러그 */}
            <rect
              x="30"
              y="18"
              width="12"
              height="12"
              rx="3"
              fill={COLORS.accentWash}
              stroke={COLORS.accent}
              strokeWidth="2.5"
            />
            <path
              d="M24 24H30"
              stroke={COLORS.accent}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* 중앙 연결 볼트/링크 */}
            <circle
              cx="24"
              cy="24"
              r="4.5"
              fill={COLORS.accent}
              stroke={COLORS.ink}
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
