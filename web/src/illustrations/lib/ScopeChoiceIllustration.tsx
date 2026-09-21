// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 540, h: 340 };

interface Props {
  delay?: number;
  budget: number;
  folderScopeLabel?: string;
  globalScopeLabel?: string;
  recommendedBadge?: string;
}

export const ScopeChoiceIllustration: React.FC<Props> = ({
  delay = 0,
  budget,
  folderScopeLabel = "",
  globalScopeLabel = "",
  recommendedBadge = "",
}) => {
  const currentFrame = useCurrentFrame();
  const safeBudget = budget > 0 ? budget : 9999;
  const frame = Math.min(safeBudget, Math.max(0, currentFrame - delay));

  // 1. 상단 플러그인 패키지 모듈 진입
  const pkgOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pkgInitialY = interpolate(frame, [0, 30], [-22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 지속적인 부유 모션 (생명력 유지)
  const floatY = Math.sin(frame * 0.08) * 3;

  // 2. 분기 선택 연결선 애니메이션
  const lineDraw = interpolate(frame, [25, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. 선택 카드 2개 진입
  const cardsEnter = interpolate(frame, [40, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cardsTranslateY = interpolate(cardsEnter, [0, 1], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. 나레이션 대상 언급 펄스
  const leftPulse = interpolate(frame, [155, 175, 195], [1, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightPulse = interpolate(frame, [245, 265, 285], [1, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5. "이 폴더에서만으로 가볍게 시작해요" 선택 및 포커스 팝
  const decisionProgress = interpolate(frame, [345, 390], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 6. 패키지가 왼쪽 폴더 안으로 이동하여 안착
  const travelProgress = interpolate(frame, [350, 395], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // 7. 추천 뱃지 등장
  const badgeProgress = interpolate(frame, [380, 415], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });

  // 이동 패키지 실시간 좌표
  const pkgX = interpolate(travelProgress, [0, 0.5, 1], [244, 180, 123], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pkgY = interpolate(
    travelProgress,
    [0, 0.5, 1],
    [20 + pkgInitialY + floatY, 82, 150],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const pkgSize = interpolate(travelProgress, [0, 1], [52, 44], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pkgBorderColor = decisionProgress > 0.3 ? "#1273c4" : "#d5d2cc";

  return (
    <div
      style={{
        width: 540,
        height: 340,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
        fontFamily: "Pretendard, -apple-system, sans-serif",
      }}
    >
      {/* 분기 연결선 */}
      <svg
        width={540}
        height={340}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* 왼쪽 분기 (폴더 범위) */}
        <path
          d="M 270 72 C 270 95, 145 95, 145 120"
          fill="none"
          stroke={decisionProgress > 0.3 ? "#1273c4" : "#d5d2cc"}
          strokeWidth={decisionProgress > 0.3 ? 4 : 3}
          strokeDasharray="6 6"
          strokeDashoffset={-frame * 0.8}
          opacity={lineDraw}
        />
        {/* 오른쪽 분기 (컴퓨터 전체 범위) */}
        <path
          d="M 270 72 C 270 95, 395 95, 395 120"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth={3}
          strokeDasharray="6 6"
          strokeDashoffset={-frame * 0.8}
          opacity={lineDraw * (1 - decisionProgress * 0.25)}
        />
      </svg>

      {/* 상단에서 폴더로 이동하는 플러그인 패키지 */}
      <div
        style={{
          position: "absolute",
          left: pkgX,
          top: pkgY,
          width: pkgSize,
          height: pkgSize,
          borderRadius: 14,
          backgroundColor: "#ffffff",
          border: `3px solid ${pkgBorderColor}`,
          boxShadow:
            decisionProgress > 0.3
              ? "0 6px 18px rgba(18, 115, 196, 0.2)"
              : "0 4px 12px rgba(16, 17, 19, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: pkgOpacity,
          zIndex: 20,
        }}
      >
        <svg width={28} height={28} viewBox="0 0 32 32" fill="none">
          <rect
            x="6"
            y="10"
            width="20"
            height="16"
            rx="4"
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth="2.5"
          />
          <path
            d="M11 5 L11 10 M21 5 L21 10"
            stroke="#1273c4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="16" cy="18" r="3" fill="#1273c4" />
        </svg>
      </div>

      {/* 왼쪽 카드: 이 폴더에서만 */}
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 110,
          width: 230,
          height: 190,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: `3px solid ${decisionProgress > 0.4 ? "#1273c4" : "#d5d2cc"}`,
          boxShadow:
            decisionProgress > 0.4
              ? "0 10px 28px rgba(18, 115, 196, 0.18)"
              : "0 4px 12px rgba(16, 17, 19, 0.04)",
          opacity: cardsEnter,
          transform: `translateY(${cardsTranslateY + Math.sin(frame * 0.05) * 1.5}px) scale(${(1 + decisionProgress * 0.08) * leftPulse})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 12px",
          boxSizing: "border-box",
          zIndex: decisionProgress > 0.4 ? 10 : 2,
        }}
      >
        {/* 추천 선택 배지 */}
        {recommendedBadge && (
          <div
            style={{
              position: "absolute",
              top: -14,
              right: 12,
              transform: `scale(${badgeProgress})`,
              transformOrigin: "center center",
              opacity: badgeProgress > 0.05 ? 1 : 0,
              backgroundColor: "#1273c4",
              color: "#ffffff",
              padding: "4px 10px",
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "Pretendard, sans-serif",
              boxShadow: "0 4px 12px rgba(18, 115, 196, 0.28)",
              whiteSpace: "nowrap",
            }}
          >
            {recommendedBadge}
          </div>
        )}

        {/* 폴더 벡터 그래픽 */}
        <div style={{ width: 84, height: 64, position: "relative", marginBottom: 12 }}>
          <svg width={84} height={64} viewBox="0 0 84 64" fill="none">
            {/* 폴더 탭 & 후면 */}
            <path
              d="M 4 8 L 26 8 L 34 16 L 80 16 A 6 6 0 0 1 84 22 L 84 56 A 6 6 0 0 1 78 62 L 10 62 A 6 6 0 0 1 4 56 Z"
              fill="#e5a93c"
            />
            {/* 내부 용지 */}
            <rect x="14" y="18" width="56" height="34" rx="4" fill="#f0efec" />
            {/* 폴더 전면 포켓 */}
            <rect
              x="4"
              y="22"
              width="76"
              height="40"
              rx="6"
              fill="#f6c466"
              stroke="#101113"
              strokeWidth="3"
            />
            <line
              x1="18"
              y1="40"
              x2="48"
              y2="40"
              stroke="#e5a93c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 라벨 */}
        {folderScopeLabel && (
          <div
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: decisionProgress > 0.5 ? "#1273c4" : "#101113",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {folderScopeLabel}
          </div>
        )}
      </div>

      {/* 오른쪽 카드: 내 컴퓨터 어디서나 */}
      <div
        style={{
          position: "absolute",
          left: 280,
          top: 110,
          width: 230,
          height: 190,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          boxShadow: "0 4px 12px rgba(16, 17, 19, 0.04)",
          opacity: cardsEnter * interpolate(decisionProgress, [0, 1], [1, 0.76]),
          transform: `translateY(${cardsTranslateY}px) scale(${interpolate(decisionProgress, [0, 1], [1, 0.96]) * rightPulse})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 12px",
          boxSizing: "border-box",
          zIndex: 1,
        }}
      >
        {/* 컴퓨터/네트워크 범위 그래픽 */}
        <div style={{ width: 84, height: 64, position: "relative", marginBottom: 12 }}>
          <svg width={84} height={64} viewBox="0 0 84 64" fill="none">
            {/* 모니터 프레임 */}
            <rect
              x="10"
              y="6"
              width="64"
              height="42"
              rx="6"
              fill="#f0efec"
              stroke="#43474b"
              strokeWidth="3"
            />
            {/* 스탠드 */}
            <path
              d="M 36 48 L 36 56 L 24 56 L 60 56 L 48 56 L 48 48"
              stroke="#43474b"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 화면 속 연결 노드들 */}
            <line x1="28" y1="22" x2="56" y2="22" stroke="#43474b" strokeWidth="2" />
            <line x1="28" y1="22" x2="42" y2="34" stroke="#43474b" strokeWidth="2" />
            <line x1="56" y1="22" x2="42" y2="34" stroke="#43474b" strokeWidth="2" />
            <circle cx="28" cy="22" r="4" fill="#ffffff" stroke="#43474b" strokeWidth="2" />
            <circle cx="56" cy="22" r="4" fill="#ffffff" stroke="#43474b" strokeWidth="2" />
            <circle cx="42" cy="34" r="4" fill="#ffffff" stroke="#43474b" strokeWidth="2" />
            {/* 전체 범위 파동 신호 */}
            <circle
              cx="42"
              cy="27"
              r={24 + Math.sin(frame * 0.08) * 1.5}
              stroke="#7c8288"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
              opacity={0.5}
            />
          </svg>
        </div>

        {/* 라벨 */}
        {globalScopeLabel && (
          <div
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "#43474b",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {globalScopeLabel}
          </div>
        )}
      </div>
    </div>
  );
};
