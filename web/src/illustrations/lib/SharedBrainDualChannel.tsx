// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import {
  useCurrentFrame,
  interpolate,
  interpolateColors,
  Easing,
} from "remotion";

export const canvas = { w: 560, h: 360 };

interface Props {
  delay?: number;
  budget?: number;
  brainLabel?: string;
  resultLabel?: string;
  leftBadge?: string;
  rightBadge?: string;
  note?: string;
}

export const SharedBrainDualChannel: React.FC<Props> = ({
  delay = 0,
  budget = 840,
  brainLabel = "",
  resultLabel = "",
  leftBadge = "",
  rightBadge = "",
  note = "",
}) => {
  const current = useCurrentFrame();
  const frame = Math.max(0, current - delay);

  // 1. 지속적 생명력 (부유 모션)
  const floatCenterY = Math.sin(frame * 0.05) * 3;
  const floatSideY = Math.sin(frame * 0.05 + 1.2) * 2;

  // 2. 진입 안무 (장면 시작 45프레임 이내 시작)
  const brainEnter = interpolate(frame, [0, 28], [0.84, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const brainOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cableDraw = interpolate(frame, [22, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const sideNodesEnter = interpolate(frame, [38, 70], [0.86, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });
  const sideNodesOpacity = interpolate(frame, [38, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. "두뇌가 같으니 답이 비슷한 게 당연하거든요" (설명 포커스 팝: 200~420f)
  const brainFocusScale = interpolate(
    frame,
    [200, 240, 380, 420],
    [1, 1.14, 1.14, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    }
  );

  // 4. "달라진 건 창 모양새뿐이에요" (외곽 쉘 비교 포커스: 470~720f, 비포커스 딤 >= 0.72)
  const brainFocusDim = interpolate(
    frame,
    [470, 510, 690, 730],
    [1, 0.78, 0.78, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const shellHighlight = interpolate(
    frame,
    [480, 520, 680, 720],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const leftBorderColor = interpolateColors(
    shellHighlight,
    [0, 1],
    ["#d5d2cc", "#43474b"]
  );
  const rightBorderColor = interpolateColors(
    shellHighlight,
    [0, 1],
    ["#d5d2cc", "#1273c4"]
  );

  // 5. 하단 안내 카드 진입
  const noteEnter = interpolate(frame, [500, 535], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });
  const noteY = interpolate(frame, [500, 535], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 6. 연속 순환 신호 펄스 (동일한 두뇌에서 양쪽으로 동기화되어 흘러나오는 쌍둥이 데이터)
  const loopCycle = 90;
  const cycleFrame = (frame + 20) % loopCycle;
  const packetT = interpolate(cycleFrame, [0, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const packetOpacity = interpolate(
    cycleFrame,
    [0, 8, 55, 65],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 베지에 곡선 좌표 계산
  const getCubicPoint = (
    p0: [number, number],
    p1: [number, number],
    p2: [number, number],
    p3: [number, number],
    t: number
  ) => {
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    const t2 = t * t;
    const t3 = t2 * t;
    return {
      x: mt3 * p0[0] + 3 * mt2 * t * p1[0] + 3 * mt * t2 * p2[0] + t3 * p3[0],
      y: mt3 * p0[1] + 3 * mt2 * t * p1[1] + 3 * mt * t2 * p2[1] + t3 * p3[1],
    };
  };

  const leftP0: [number, number] = [205, 175];
  const leftP1: [number, number] = [165, 175];
  const leftP2: [number, number] = [140, 205];
  const leftP3: [number, number] = [125, 235];

  const rightP0: [number, number] = [355, 175];
  const rightP1: [number, number] = [395, 175];
  const rightP2: [number, number] = [420, 205];
  const rightP3: [number, number] = [435, 235];

  const leftPos = getCubicPoint(leftP0, leftP1, leftP2, leftP3, packetT);
  const rightPos = getCubicPoint(rightP0, rightP1, rightP2, rightP3, packetT);

  // 중앙 코어 파동 링
  const corePulse = (frame * 0.04) % 1;
  const pulseRadius = interpolate(corePulse, [0, 1], [18, 38]);
  const pulseOpacity = interpolate(corePulse, [0, 1], [0.7, 0]);

  return (
    <div
      style={{
        width: 560,
        height: 360,
        position: "relative",
        background: "transparent",
        overflow: "hidden",
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* 1. 연결 케이블 레이어 */}
      <svg
        width="560"
        height="360"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* 왼쪽 분기 케이블 */}
        <path
          d="M 205 175 C 165 175, 140 205, 125 235"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="180"
          strokeDashoffset={180 * (1 - cableDraw)}
        />
        {/* 오른쪽 분기 케이블 */}
        <path
          d="M 355 175 C 395 175, 420 205, 435 235"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="180"
          strokeDashoffset={180 * (1 - cableDraw)}
        />

        {/* 동일 두뇌 응답 데이터 패킷 (왼쪽) */}
        {cableDraw >= 1 && (
          <g
            transform={`translate(${leftPos.x}, ${leftPos.y})`}
            opacity={packetOpacity}
          >
            <circle r="7" fill="#ffffff" stroke="#1273c4" strokeWidth="2.5" />
            <circle r="2.5" fill="#1273c4" />
          </g>
        )}

        {/* 동일 두뇌 응답 데이터 패킷 (오른쪽) */}
        {cableDraw >= 1 && (
          <g
            transform={`translate(${rightPos.x}, ${rightPos.y})`}
            opacity={packetOpacity}
          >
            <circle r="7" fill="#ffffff" stroke="#1273c4" strokeWidth="2.5" />
            <circle r="2.5" fill="#1273c4" />
          </g>
        )}
      </svg>

      {/* 2. 상단 '동일 응답' 동기화 배지 */}
      {resultLabel !== "" && (
        <div
          style={{
            position: "absolute",
            top: 22,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: interpolate(frame, [15, 35], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            background: "#e8f2fb",
            borderRadius: 9999,
            border: "1.5px solid #1273c4",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8.5 L6.5 12 L13 4.5"
              stroke="#1273c4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#1273c4",
              letterSpacing: "-0.2px",
            }}
          >
            {resultLabel}
          </span>
        </div>
      )}

      {/* 3. 중앙 카드: 단일 AI 두뇌 코어 (Single Brain) */}
      <div
        style={{
          position: "absolute",
          left: 280,
          top: 175 + floatCenterY,
          width: 170,
          height: 136,
          transform: `translate(-50%, -50%) scale(${brainEnter * brainFocusScale})`,
          opacity: brainOpacity * brainFocusDim,
          background: "#ffffff",
          borderRadius: 18,
          border: "3px solid #d5d2cc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          padding: "10px",
          zIndex: 3,
        }}
      >
        {/* 두뇌 / 뉴럴 코어 벡터 일러스트 */}
        <div
          style={{
            position: "relative",
            width: 58,
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 펄스 파동 링 */}
          <svg
            width="58"
            height="58"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <circle
              cx="29"
              cy="29"
              r={pulseRadius}
              fill="none"
              stroke="#1273c4"
              strokeWidth="2"
              opacity={pulseOpacity}
            />
          </svg>

          {/* 중앙 코어 노드 & 시냅스 분기 */}
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            {/* 시냅스 경로 */}
            <line
              x1="25"
              y1="25"
              x2="11"
              y2="14"
              stroke="#1273c4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="25"
              y1="25"
              x2="39"
              y2="14"
              stroke="#1273c4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="25"
              y1="25"
              x2="10"
              y2="34"
              stroke="#1273c4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="25"
              y1="25"
              x2="40"
              y2="34"
              stroke="#1273c4"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* 위성 노드 */}
            <circle cx="11" cy="14" r="3.5" fill="#ffffff" stroke="#1273c4" strokeWidth="2" />
            <circle cx="39" cy="14" r="3.5" fill="#ffffff" stroke="#1273c4" strokeWidth="2" />
            <circle cx="10" cy="34" r="3.5" fill="#ffffff" stroke="#1273c4" strokeWidth="2" />
            <circle cx="40" cy="34" r="3.5" fill="#ffffff" stroke="#1273c4" strokeWidth="2" />

            {/* 메인 뉴럴 허브 */}
            <circle cx="25" cy="25" r="11" fill="#e8f2fb" stroke="#1273c4" strokeWidth="2.5" />
            <path
              d="M 25 19 L 26.8 23.2 L 31 25 L 26.8 26.8 L 25 31 L 23.2 26.8 L 19 25 L 23.2 23.2 Z"
              fill="#1273c4"
            />
          </svg>
        </div>

        {/* 코어 명칭 라벨 */}
        {brainLabel !== "" && (
          <div
            style={{
              marginTop: 6,
              fontSize: 14,
              fontWeight: 700,
              color: "#101113",
              textAlign: "center",
              letterSpacing: "-0.2px",
              lineHeight: 1.2,
            }}
          >
            {brainLabel}
          </div>
        )}
      </div>

      {/* 4. 왼쪽 카드: 터미널 환경 채널 (CLI Shell) */}
      <div
        style={{
          position: "absolute",
          left: 95,
          top: 235 + floatSideY,
          width: 130,
          height: 104,
          transform: `translate(-50%, -50%) scale(${sideNodesEnter})`,
          opacity: sideNodesOpacity,
          background: "#ffffff",
          borderRadius: 14,
          border: `3px solid ${leftBorderColor}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          padding: "8px",
          zIndex: 2,
        }}
      >
        {/* CLI 프롬프트 심볼 */}
        <div
          style={{
            width: 38,
            height: 28,
            background: "#f0efec",
            borderRadius: 7,
            border: "2px solid #43474b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 4,
            boxSizing: "border-box",
          }}
        >
          <svg width="26" height="18" viewBox="0 0 26 18" fill="none">
            <path
              d="M 5 4 L 11 9 L 5 14"
              stroke="#101113"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="14"
              y1="14"
              x2="20"
              y2="14"
              stroke="#1273c4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {leftBadge !== "" && (
          <div
            style={{
              marginTop: 8,
              fontSize: 13,
              fontWeight: 600,
              color: "#43474b",
              textAlign: "center",
              letterSpacing: "-0.2px",
              lineHeight: 1.2,
            }}
          >
            {leftBadge}
          </div>
        )}
      </div>

      {/* 5. 오른쪽 카드: 앱 환경 채널 (GUI / App Shell) */}
      <div
        style={{
          position: "absolute",
          left: 465,
          top: 235 + floatSideY,
          width: 130,
          height: 104,
          transform: `translate(-50%, -50%) scale(${sideNodesEnter})`,
          opacity: sideNodesOpacity,
          background: "#ffffff",
          borderRadius: 14,
          border: `3px solid ${rightBorderColor}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          padding: "8px",
          zIndex: 2,
        }}
      >
        {/* 대화형 말풍선 심볼 */}
        <div
          style={{
            width: 38,
            height: 28,
            background: "#e8f2fb",
            borderRadius: 10,
            border: "2px solid #1273c4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: 18,
              height: 2.5,
              background: "#1273c4",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 12,
              height: 2.5,
              background: "#1273c4",
              borderRadius: 2,
              alignSelf: "flex-start",
              marginLeft: 10,
            }}
          />
        </div>

        {rightBadge !== "" && (
          <div
            style={{
              marginTop: 8,
              fontSize: 13,
              fontWeight: 600,
              color: "#1273c4",
              textAlign: "center",
              letterSpacing: "-0.2px",
              lineHeight: 1.2,
            }}
          >
            {rightBadge}
          </div>
        )}
      </div>

      {/* 6. 하단 '창 모양새만 달라짐' 비교 캡션 배지 */}
      {note !== "" && (
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: "50%",
            transform: `translateX(-50%) translateY(${noteY}px)`,
            opacity: noteEnter,
            background: "#ffffff",
            padding: "6px 18px",
            borderRadius: 9999,
            border: "2px solid #1273c4",
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 4,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "#1273c4",
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#101113",
              letterSpacing: "-0.2px",
            }}
          >
            {note}
          </span>
        </div>
      )}
    </div>
  );
};
