// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 560, h: 340 };

interface Props {
  delay?: number;
  budget: number;
  agentLabel?: string;
  calendarLabel?: string;
  documentLabel?: string;
}

export const DirectServiceAccess: React.FC<Props> = ({
  delay = 0,
  budget,
  agentLabel = "",
  calendarLabel = "",
  documentLabel = "",
}) => {
  const frame = useCurrentFrame();
  const rel = frame - delay;

  // 1. 초기 등장 모션 (30프레임 내 완료)
  const enterScale = interpolate(rel, [0, 28], [0.94, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const enterOpacity = interpolate(rel, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. 지속적인 숨쉬기 모션
  const breatheAgent = Math.sin(rel * 0.055) * 3;
  const breatheTargets = Math.sin(rel * 0.055 + 1.6) * 3;

  // 3. 에이전트 직접 검사 빔 활성화 (자막 #3~#5 [183~385] "직접 열어보게 하는 거거든요")
  const beamIntensity = interpolate(rel, [180, 215, 370, 405], [0, 1, 1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. 캘린더 열람 포커스 팝 (자막 #3 [183~246])
  const calendarPop = interpolate(rel, [183, 215, 275, 305], [1.0, 1.12, 1.12, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  // 5. 문서 열람 포커스 팝 (자막 #4~#5 [246~385])
  const documentPop = interpolate(rel, [246, 278, 355, 385], [1.0, 1.12, 1.12, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  // 비포커스 요소 딤 처리 (0.76 >= 0.72 안전 규칙)
  const agentDim = interpolate(rel, [183, 215, 360, 390], [1.0, 0.76, 0.76, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 문서 라인 스캔 하이라이트 진행도
  const scanSweep = interpolate(rel, [250, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 데이터 회수 파티클 순환
  const retrieveProgress = ((rel - 183) * 0.025) % 1;
  const showParticles = rel >= 183;
  const particleX = interpolate(retrieveProgress, [0, 1], [300, 175], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const particleY1 = interpolate(retrieveProgress, [0, 1], [95, 170], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const particleY2 = interpolate(retrieveProgress, [0, 1], [235, 170], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
        opacity: enterOpacity,
        transform: `scale(${enterScale})`,
        userSelect: "none",
      }}
    >
      {/* 1. 에이전트 시선/검사 빔 (SVG 광선 영역) */}
      <svg
        width={canvas.w}
        height={canvas.h}
        style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="scanBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1273c4" stopOpacity={0.4 * beamIntensity} />
            <stop offset="100%" stopColor="#1273c4" stopOpacity={0.05 * beamIntensity} />
          </linearGradient>
        </defs>

        {/* 캘린더 쪽으로 펼쳐지는 검사 원뿔 빔 */}
        <polygon
          points="175,170 300,60 300,130"
          fill="url(#scanBeamGrad)"
          opacity={beamIntensity}
        />
        {/* 문서 쪽으로 펼쳐지는 검사 원뿔 빔 */}
        <polygon
          points="175,170 300,200 300,270"
          fill="url(#scanBeamGrad)"
          opacity={beamIntensity}
        />

        {/* 조준 벡터 라인 */}
        <line
          x1={175}
          y1={170}
          x2={300}
          y2={95}
          stroke="#1273c4"
          strokeWidth={2}
          strokeDasharray="4 4"
          opacity={beamIntensity}
        />
        <line
          x1={175}
          y1={170}
          x2={300}
          y2={235}
          stroke="#1273c4"
          strokeWidth={2}
          strokeDasharray="4 4"
          opacity={beamIntensity}
        />

        {/* 직접 열람하여 에이전트로 회수되는 데이터 패킷 */}
        {showParticles && beamIntensity > 0.2 && (
          <>
            <circle cx={particleX} cy={particleY1} r={4.5} fill="#1273c4" />
            <circle cx={particleX} cy={particleY2} r={4.5} fill="#1273c4" />
          </>
        )}
      </svg>

      {/* 2. 에이전트 유닛 (좌측 조작 주체) */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 80,
          width: 135,
          height: 180,
          backgroundColor: "#ffffff",
          borderRadius: 18,
          border: "3px solid #1273c4",
          boxShadow: "0 6px 20px rgba(18, 115, 196, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: agentDim,
          transform: `translateY(${breatheAgent}px)`,
          transition: "opacity 0.2s ease",
        }}
      >
        {/* 직접 열람 스캐너 렌즈 모티프 */}
        <svg width={64} height={64} viewBox="0 0 64 64">
          <circle cx={32} cy={32} r={24} fill="#e8f2fb" stroke="#1273c4" strokeWidth={3} />
          {/* 포커스 조리개 링 */}
          <circle
            cx={32}
            cy={32}
            r={14}
            fill="#ffffff"
            stroke="#1273c4"
            strokeWidth={2.5}
            strokeDasharray="6 3"
          />
          {/* 센서 코어 */}
          <circle cx={32} cy={32} r={6} fill="#1273c4" />
          {/* 레이저 펄스 방출 팁 */}
          <line x1={46} y1={32} x2={56} y2={32} stroke="#1273c4" strokeWidth={3.5} strokeLinecap="round" />
        </svg>

        {agentLabel ? (
          <div
            style={{
              marginTop: 12,
              fontSize: 15,
              fontWeight: 700,
              color: "#101113",
              fontFamily: "Pretendard, -apple-system, sans-serif",
            }}
          >
            {agentLabel}
          </div>
        ) : null}
      </div>

      {/* 3. 에이전트가 열어보는 캘린더 (우상단) */}
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 40,
          width: 215,
          height: 115,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          border: `2.5px solid ${calendarPop > 1.05 ? "#1273c4" : "#d5d2cc"}`,
          boxShadow:
            calendarPop > 1.05
              ? "0 0 0 6px #e8f2fb, 0 10px 24px rgba(18, 115, 196, 0.12)"
              : "0 4px 14px rgba(16, 17, 19, 0.04)",
          transform: `translateY(${breatheTargets}px) scale(${calendarPop})`,
          padding: "10px 14px",
          boxSizing: "border-box",
          zIndex: calendarPop > 1.05 ? 5 : 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {calendarLabel ? (
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
                fontFamily: "Pretendard, -apple-system, sans-serif",
              }}
            >
              {calendarLabel}
            </span>
          ) : null}
          {/* 바인더 링 */}
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 4, height: 8, borderRadius: 2, backgroundColor: "#1273c4" }} />
            <div style={{ width: 4, height: 8, borderRadius: 2, backgroundColor: "#1273c4" }} />
          </div>
        </div>

        {/* 열람된 날짜 그리드 벡터 */}
        <div
          style={{
            marginTop: 10,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 6,
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => {
            const isTarget = idx === 6;
            return (
              <div
                key={idx}
                style={{
                  height: 20,
                  borderRadius: 6,
                  backgroundColor: isTarget ? "#1273c4" : "#f0efec",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isTarget ? "0 2px 6px rgba(18, 115, 196, 0.3)" : "none",
                }}
              >
                {isTarget && (
                  <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#ffffff" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. 에이전트가 열어보는 문서 (우하단) */}
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 180,
          width: 215,
          height: 115,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          border: `2.5px solid ${documentPop > 1.05 ? "#1273c4" : "#d5d2cc"}`,
          boxShadow:
            documentPop > 1.05
              ? "0 0 0 6px #e8f2fb, 0 10px 24px rgba(18, 115, 196, 0.12)"
              : "0 4px 14px rgba(16, 17, 19, 0.04)",
          transform: `translateY(${breatheTargets}px) scale(${documentPop})`,
          padding: "12px 14px",
          boxSizing: "border-box",
          zIndex: documentPop > 1.05 ? 5 : 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {documentLabel ? (
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
                fontFamily: "Pretendard, -apple-system, sans-serif",
              }}
            >
              {documentLabel}
            </span>
          ) : null}
          {/* 접힌 모서리 장식 */}
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: "#e8f2fb",
              borderLeft: "2px solid #1273c4",
              borderBottom: "2px solid #1273c4",
              borderRadius: "0 0 0 3px",
            }}
          />
        </div>

        {/* 열람되어 스캔되는 텍스트 라인 벡터 */}
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 7 }}>
          {[0.2, 0.5, 0.8].map((ratio, i) => {
            const isScanned = scanSweep >= ratio;
            return (
              <div
                key={i}
                style={{
                  height: 7,
                  width: i === 2 ? "65%" : "100%",
                  borderRadius: 4,
                  backgroundColor: isScanned ? "#1273c4" : "#d5d2cc",
                  transition: "background-color 0.2s ease",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
