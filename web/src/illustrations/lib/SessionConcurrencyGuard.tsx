// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface SessionConcurrencyGuardProps {
  delay?: number;
  budget: number;
  conflictTitle?: string;
  conflictWarning?: string;
  recommendAction?: string;
}

export const canvas = { w: 480, h: 360 };

export const SessionConcurrencyGuard: React.FC<SessionConcurrencyGuardProps> = ({
  delay = 0,
  budget,
  conflictTitle = "",
  conflictWarning = "",
  recommendAction = "",
}) => {
  const frame = useCurrentFrame();
  const rel = Math.max(0, frame - delay);

  // 1. 지속적 펄스 모션 (정지 화면 방지)
  const pulse = Math.sin(rel * 0.1) * 3;

  // 2. 초기 진입 애니메이션 (0~30f)
  const intro = interpolate(rel, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 3. 충돌 꼬임 모션 구간 (35~90f: 양쪽 동시 입력으로 흔들림 발생)
  const conflictIntensity = interpolate(rel, [35, 60, 90], [0, 1, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(rel * 0.8) * 5 * conflictIntensity;

  // 4. 터미널 통로 차단 및 세션 단일화 안무 (95~135f: "닫아두는 편이 좋은 거죠")
  const lockProgress = interpolate(rel, [95, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const gateOpacity = interpolate(lockProgress, [0, 1], [1, 0.72]); // 0.72 이상 딤 규칙 준수
  const barrierTranslateY = interpolate(lockProgress, [0, 1], [-24, 0]);
  const barrierScale = interpolate(lockProgress, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        backgroundColor: "#ffffff",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        boxSizing: "border-box",
        position: "relative",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        fontFamily: "Pretendard, 'Spoqa Han Sans Neo', sans-serif",
        opacity: intro,
      }}
    >
      {/* 상단 헤더: 대본의 동시 접근 설명 문구 */}
      {conflictTitle !== "" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#e8f2fb",
            padding: "6px 16px",
            borderRadius: 12,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#1273c4",
            }}
          />
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#1273c4",
              letterSpacing: "-0.3px",
            }}
          >
            {conflictTitle}
          </span>
        </div>
      )}

      {/* 중앙 다이어그램: 양쪽 입력 통로와 하나의 공용 세션 파이프라인 */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginTop: 10,
        }}
      >
        {/* 왼쪽 통로 (앱 세션 채널: 활성 유지) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 86,
              height: 52,
              borderRadius: 12,
              border: "3px solid #1273c4",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(18, 115, 196, 0.15)",
            }}
          >
            <div
              style={{
                width: 32,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#1273c4",
              }}
            />
          </div>
          {/* 주입 화살표 */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M 4 12 H 18 M 14 6 L 20 12 L 14 18"
              stroke="#1273c4"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 중앙: 세션 코어 타임라인 (명령 순서 큐) */}
        <div
          style={{
            width: 140,
            padding: "16px 12px",
            borderRadius: 16,
            border: "3px solid #101113",
            backgroundColor: "#f0efec",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            transform: `translateX(${shakeX}px) translateY(${pulse}px)`,
            boxShadow: "0 4px 14px rgba(16, 17, 19, 0.08)",
          }}
        >
          {/* 큐 작업 블록 1 */}
          <div
            style={{
              width: 108,
              height: 22,
              borderRadius: 8,
              backgroundColor: "#ffffff",
              border: "2px solid #d5d2cc",
              display: "flex",
              alignItems: "center",
              paddingLeft: 8,
              gap: 4,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#1273c4",
              }}
            />
            <div
              style={{
                width: 50,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#7c8288",
              }}
            />
          </div>

          {/* 큐 작업 블록 2 */}
          <div
            style={{
              width: 108,
              height: 22,
              borderRadius: 8,
              backgroundColor: "#ffffff",
              border: "2px solid #d5d2cc",
              display: "flex",
              alignItems: "center",
              paddingLeft: 8,
              gap: 4,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#1273c4",
              }}
            />
            <div
              style={{
                width: 60,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#7c8288",
              }}
            />
          </div>

          {/* 큐 작업 블록 3 */}
          <div
            style={{
              width: 108,
              height: 22,
              borderRadius: 8,
              backgroundColor: "#ffffff",
              border: "2px solid #d5d2cc",
              display: "flex",
              alignItems: "center",
              paddingLeft: 8,
              gap: 4,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#1273c4",
              }}
            />
            <div
              style={{
                width: 42,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#7c8288",
              }}
            />
          </div>
        </div>

        {/* 오른쪽 통로 (터미널 채널: 충돌 방지를 위해 닫힘 안무 작동) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            opacity: gateOpacity,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 86,
              height: 52,
              borderRadius: 12,
              border: "3px solid #d5d2cc",
              backgroundColor: "#f0efec",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 32,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#7c8288",
              }}
            />

            {/* 닫힘 차단 쉴드 ("닫아두는 편이 좋은 거죠" 모션 트리거) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 9,
                backgroundColor: "rgba(16, 17, 19, 0.75)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateY(${barrierTranslateY}px) scale(${barrierScale})`,
                opacity: lockProgress,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M 5 5 L 15 15 M 15 5 L 5 15"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* 주입 화살표 */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M 20 12 H 6 M 10 6 L 4 12 L 10 18"
              stroke={lockProgress > 0.5 ? "#7c8288" : "#43474b"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 하단 안무 라벨: 경고에서 권장 조치로 전환되는 설명 피드백 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        {lockProgress < 0.6
          ? conflictWarning !== "" && (
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#43474b",
                  letterSpacing: "-0.2px",
                }}
              >
                {conflictWarning}
              </div>
            )
          : recommendAction !== "" && (
              <div
                style={{
                  backgroundColor: "#1273c4",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 700,
                  padding: "6px 18px",
                  borderRadius: 14,
                  letterSpacing: "-0.2px",
                  boxShadow: "0 3px 10px rgba(18, 115, 196, 0.3)",
                }}
              >
                {recommendAction}
              </div>
            )}
      </div>
    </div>
  );
};
