// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  title?: string;
  chapterBadge?: string;
}

export const canvas = { w: 520, h: 360 };

export const McpHubNetwork: React.FC<Props> = ({
  delay = 0,
  budget = 240,
  title = "",
  chapterBadge = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  // 1. 지속적 생명력 (쉬지 않는 유기적 부유 & 미세 맥박)
  const breatheY = Math.sin(frame * 0.06) * 3.5;
  const breatheScale = 1 + Math.sin(frame * 0.05) * 0.012;

  // 2. 45프레임 이내 진입 모션
  const leftEnter = interpolate(frame, [0, 22], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const leftOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hubEnter = interpolate(frame, [5, 28], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });
  const hubOpacity = interpolate(frame, [5, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rightTopEnter = interpolate(frame, [12, 32], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const rightTopOpacity = interpolate(frame, [12, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rightBottomEnter = interpolate(frame, [16, 36], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const rightBottomOpacity = interpolate(frame, [16, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. 연결 배선 드로잉 & 소켓 도킹 스냅
  const lineDraw = interpolate(frame, [22, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const plugSnap = interpolate(frame, [48, 65], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  // 4. 나레이션 #0 "MCP에" 구간 포커스 팝 (75~135f)
  // 비포커스 요소는 딤 처리하되 CEO 불변 철칙에 따라 0.72 이상 유지 (0.76 적용)
  const hubFocusScale = interpolate(
    frame,
    [75, 95, 130, 148],
    [1, 1.18, 1.18, 1.04],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const sideOpacity = interpolate(
    frame,
    [75, 95, 130, 148],
    [1, 0.76, 0.76, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const rippleScale = interpolate(frame, [88, 122], [1, 1.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const rippleOpacity = interpolate(frame, [88, 98, 122], [0, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5. 나레이션 #1 "대해서 배워봅시다" 구간 데이터 교환 흐름 (142~240f)
  const p1Prog = interpolate(frame, [145, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const p1Alpha = interpolate(frame, [145, 150, 170, 175], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const p2Prog = interpolate(frame, [168, 198], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const p2Alpha = interpolate(frame, [168, 173, 193, 198], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const p3Prog = interpolate(frame, [174, 204], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const p3Alpha = interpolate(frame, [174, 179, 199, 204], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const p4Prog = interpolate(frame, [198, 228], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const p4Alpha = interpolate(frame, [198, 203, 223, 228], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 데이터 펄스 위치 보간
  const p1X = 130 + (195 - 130) * p1Prog;
  const p1Y = 180;

  const t2 = p2Prog;
  const p2X = (1 - t2) * (1 - t2) * 325 + 2 * (1 - t2) * t2 * 360 + t2 * t2 * 392;
  const p2Y = (1 - t2) * (1 - t2) * 160 + 2 * (1 - t2) * t2 * 138 + t2 * t2 * 115;

  const t3 = p3Prog;
  const p3X = (1 - t3) * (1 - t3) * 325 + 2 * (1 - t3) * t3 * 360 + t3 * t3 * 392;
  const p3Y = (1 - t3) * (1 - t3) * 200 + 2 * (1 - t3) * t3 * 222 + t3 * t3 * 245;

  const t4 = p4Prog;
  const p4X = (1 - t4) * (1 - t4) * 325 + 2 * (1 - t4) * t4 * 360 + t4 * t4 * 392;
  const p4Y = (1 - t4) * (1 - t4) * 160 + 2 * (1 - t4) * t4 * 138 + t4 * t4 * 115;

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
      {/* 백그라운드 연결 케이블 & 데이터 패킷 스트림 */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: canvas.w,
          height: canvas.h,
          pointerEvents: "none",
        }}
      >
        {/* 좌측 클라이언트 - 중앙 허브 연결선 */}
        <line
          x1="130"
          y1="180"
          x2="195"
          y2="180"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="65"
          strokeDashoffset={65 * (1 - lineDraw)}
        />

        {/* 중앙 허브 - 우상단 데이터베이스 연결선 */}
        <path
          d="M 325 160 Q 360 138 392 115"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="80"
          strokeDashoffset={80 * (1 - lineDraw)}
        />

        {/* 중앙 허브 - 우하단 도구 서비스 연결선 */}
        <path
          d="M 325 200 Q 360 222 392 245"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="80"
          strokeDashoffset={80 * (1 - lineDraw)}
        />

        {/* 동적 데이터 펄스들 */}
        {p1Alpha > 0 && (
          <circle cx={p1X} cy={p1Y} r="5" fill="#1273c4" opacity={p1Alpha} />
        )}
        {p2Alpha > 0 && (
          <circle cx={p2X} cy={p2Y} r="5" fill="#1273c4" opacity={p2Alpha} />
        )}
        {p3Alpha > 0 && (
          <circle cx={p3X} cy={p3Y} r="5" fill="#1273c4" opacity={p3Alpha} />
        )}
        {p4Alpha > 0 && (
          <circle cx={p4X} cy={p4Y} r="5" fill="#1273c4" opacity={p4Alpha} />
        )}
      </svg>

      {/* 좌측 호스트 클라이언트 노드 (AI 에이전트 상징) */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 135 + breatheY * 0.6,
          width: 90,
          height: 90,
          borderRadius: 18,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${leftEnter})`,
          opacity: leftOpacity * sideOpacity,
          boxShadow: "0 6px 16px rgba(16, 17, 19, 0.04)",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48">
          <path
            d="M 24 6 C 24 16 16 24 6 24 C 16 24 24 32 24 42 C 24 32 32 24 42 24 C 32 24 24 16 24 6 Z"
            fill="#1273c4"
          />
          <circle cx="24" cy="24" r="3.5" fill="#ffffff" />
        </svg>
      </div>

      {/* 우상단 데이터 소스 노드 (실린더 스택 상징) */}
      <div
        style={{
          position: "absolute",
          left: 392,
          top: 78 - breatheY * 0.5,
          width: 86,
          height: 74,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${rightTopEnter})`,
          opacity: rightTopOpacity * sideOpacity,
          boxShadow: "0 6px 16px rgba(16, 17, 19, 0.04)",
        }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44">
          <ellipse
            cx="22"
            cy="13"
            rx="16"
            ry="5.5"
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth="3"
          />
          <path
            d="M 6 13 V 22 C 6 25 13 27.5 22 27.5 C 31 27.5 38 25 38 22 V 13"
            fill="none"
            stroke="#43474b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 6 22 V 31 C 6 34 13 36.5 22 36.5 C 31 36.5 38 34 38 31 V 22"
            fill="none"
            stroke="#43474b"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 우하단 도구/서비스 노드 (토글 & 슬라이더 상징) */}
      <div
        style={{
          position: "absolute",
          left: 392,
          top: 208 - breatheY * 0.7,
          width: 86,
          height: 74,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${rightBottomEnter})`,
          opacity: rightBottomOpacity * sideOpacity,
          boxShadow: "0 6px 16px rgba(16, 17, 19, 0.04)",
        }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44">
          <rect
            x="8"
            y="12"
            width="28"
            height="6"
            rx="3"
            fill="#d5d2cc"
          />
          <circle cx="16" cy="15" r="5" fill="#1273c4" />
          <rect
            x="8"
            y="26"
            width="28"
            height="6"
            rx="3"
            fill="#d5d2cc"
          />
          <circle cx="28" cy="29" r="5" fill="#43474b" />
        </svg>
      </div>

      {/* 포커스 펄스 파동 링 */}
      {rippleOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: 195,
            top: 125 + breatheY,
            width: 130,
            height: 110,
            borderRadius: 22,
            border: "3px solid #1273c4",
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* 중앙 핵심 MCP 프로토콜 허브 (설명 주체) */}
      <div
        style={{
          position: "absolute",
          left: 195,
          top: 125 + breatheY,
          width: 130,
          height: 110,
          borderRadius: 20,
          backgroundColor: "#ffffff",
          border: "3.5px solid #1273c4",
          boxShadow: "0 10px 28px rgba(18, 115, 196, 0.14)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${hubEnter * hubFocusScale * breatheScale})`,
          opacity: hubOpacity,
          zIndex: 10,
        }}
      >
        {/* 좌우 결합 핀 (스냅 안무) */}
        <div
          style={{
            position: "absolute",
            left: -11 + plugSnap,
            top: 45,
            width: 10,
            height: 20,
            borderRadius: "5px 0 0 5px",
            backgroundColor: "#1273c4",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -11 - plugSnap,
            top: 45,
            width: 10,
            height: 20,
            borderRadius: "0 5px 5px 0",
            backgroundColor: "#1273c4",
          }}
        />

        {/* 상단 챕터 배지 (prop 이 있을 때만 렌더) */}
        {chapterBadge ? (
          <div
            style={{
              fontSize: 13,
              fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 700,
              color: "#1273c4",
              backgroundColor: "#e8f2fb",
              padding: "2px 8px",
              borderRadius: 8,
              marginBottom: 4,
              letterSpacing: "-0.2px",
            }}
          >
            {chapterBadge}
          </div>
        ) : null}

        {/* 인터페이스 인터록 프로토콜 아이콘 */}
        <svg width="36" height="24" viewBox="0 0 36 24">
          <rect
            x="4"
            y="6"
            width="12"
            height="12"
            rx="3"
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth="2.5"
          />
          <rect
            x="20"
            y="6"
            width="12"
            height="12"
            rx="3"
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth="2.5"
          />
          <line
            x1="16"
            y1="12"
            x2="20"
            y2="12"
            stroke="#1273c4"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* 중심 라벨 (나레이션 언급 키워드 "MCP") */}
        {title ? (
          <div
            style={{
              fontSize: 18,
              fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 800,
              color: "#101113",
              letterSpacing: "0.5px",
              marginTop: 2,
            }}
          >
            {title}
          </div>
        ) : null}
      </div>
    </div>
  );
};
