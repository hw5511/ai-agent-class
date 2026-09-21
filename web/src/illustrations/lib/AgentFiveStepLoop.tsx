// Generated with agy (ax-site agy_illustrate.py prompt + STYLE.md contract) for the web viewer, 2026-09-21.
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget?: number;
  step1Text?: string;
  step2Text?: string;
  step3Text?: string;
  step4Text?: string;
  step5Text?: string;
  loopText?: string;
  badgeText?: string;
}

export const canvas = { w: 680, h: 560 };

export const AgentFiveStepLoop: React.FC<Props> = ({
  delay = 0,
  budget: _budget = 420,
  step1Text = "",
  step2Text = "",
  step3Text = "",
  step4Text = "",
  step5Text = "",
  loopText = "",
  badgeText = "",
}) => {
  const frame = useCurrentFrame();
  const currentFrame = Math.max(0, frame - delay);

  // 1. 전체 컨테이너 숨쉬는 모션 (쉬지 않는 유기적 부유)
  const floatY = Math.sin(currentFrame * 0.05) * 3;
  const containerScale = interpolate(currentFrame, [0, 30], [0.94, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 2. 나레이션 청크 타이밍 동기화 (5단계 포커스)
  // 청크 #2 [94~134] 보고
  // 청크 #3 [134~177] 생각
  // 청크 #4 [177~217] 계획
  // 청크 #5~#6 [217~264] 실행
  // 청크 #7~#8 [264~351] 확인/고치고
  // 청크 #9~#10 [351~420] 5단계 무한 순환 반복
  const isStep1Active = currentFrame >= 94 && currentFrame < 134;
  const isStep2Active = currentFrame >= 134 && currentFrame < 177;
  const isStep3Active = currentFrame >= 177 && currentFrame < 217;
  const isStep4Active = currentFrame >= 217 && currentFrame < 264;
  const isStep5Active = currentFrame >= 264 && currentFrame < 351;
  const isLoopActive = currentFrame >= 351;

  const hasAnyStepActive = currentFrame >= 94 && currentFrame < 351;

  // 3. 중심점 및 5개 노드 좌표 계산 (타원형 궤도: 가로 225px, 세로 170px)
  const cx = 340;
  const cy = 280;
  const rx = 225;
  const ry = 170;

  // 12시 방향부터 시계방향 5개 지점 각도 (-90도 = -pi/2)
  const nodeAngles = [
    -Math.PI / 2, // 1단계: 상단 12시 (보고)
    -Math.PI / 2 + (2 * Math.PI * 1) / 5, // 2단계: 2시 (생각)
    -Math.PI / 2 + (2 * Math.PI * 2) / 5, // 3단계: 4시 (계획)
    -Math.PI / 2 + (2 * Math.PI * 3) / 5, // 4단계: 7시 (실행)
    -Math.PI / 2 + (2 * Math.PI * 4) / 5, // 5단계: 10시 (확인)
  ];

  const nodePositions = nodeAngles.map((angle) => ({
    x: cx + rx * Math.cos(angle),
    y: cy + ry * Math.sin(angle),
  }));

  // 스텝별 포커스 팝 (1.18배 확대 및 포커스 줌)
  const getStepScale = (isActive: boolean, startF: number, endF: number) => {
    if (!isActive) return 1.0;
    return interpolate(
      currentFrame,
      [startF, startF + 8, endF - 8, endF],
      [1.0, 1.18, 1.18, 1.0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.back(1.4)),
      }
    );
  };

  const stepScales = [
    getStepScale(isStep1Active, 94, 134),
    getStepScale(isStep2Active, 134, 177),
    getStepScale(isStep3Active, 177, 217),
    getStepScale(isStep4Active, 217, 264),
    getStepScale(isStep5Active, 264, 351),
  ];

  const activeStates = [
    isStep1Active,
    isStep2Active,
    isStep3Active,
    isStep4Active,
    isStep5Active,
  ];

  const stepTexts = [step1Text, step2Text, step3Text, step4Text, step5Text];

  // 중앙 회전 화살표 회전각
  const loopRotation = currentFrame * (isLoopActive ? 2.6 : 0.8);
  const loopCenterScale = isLoopActive
    ? interpolate(currentFrame, [351, 370], [1.0, 1.15], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.back(1.3)),
      })
    : 1.0;

  // 5개 노드별 전용 미니멀 벡터 아이콘
  const renderIcon = (index: number, active: boolean) => {
    const strokeColor = active ? "#1273c4" : "#43474b";
    switch (index) {
      case 0: // 보고 (레이더/눈/관찰)
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="12" cy="12" r="4" fill={active ? "#1273c4" : strokeColor} />
            <line x1="12" y1="3" x2="12" y2="6" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="21" y1="12" x2="18" y2="12" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 1: // 생각 (사고/신경망 노드)
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="12" r="3" stroke={strokeColor} strokeWidth="2.2" />
            <circle cx="18" cy="7" r="3" stroke={strokeColor} strokeWidth="2.2" />
            <circle cx="18" cy="17" r="3" stroke={strokeColor} strokeWidth="2.2" />
            <line x1="9" y1="11" x2="15" y2="8" stroke={strokeColor} strokeWidth="2" />
            <line x1="9" y1="13" x2="15" y2="16" stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
      case 2: // 계획 (단계/순서도/체크)
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="4" stroke={strokeColor} strokeWidth="2.5" />
            <line x1="8" y1="9" x2="16" y2="9" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="8" y1="14" x2="13" y2="14" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );
      case 3: // 실행 (도구/기어/번개)
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 2L4 14H12L11 22L20 10H12L13 2Z"
              stroke={strokeColor}
              strokeWidth="2.2"
              strokeLinejoin="round"
              fill={active ? "#1273c4" : "none"}
            />
          </svg>
        );
      case 4: // 확인/고치고 (순환 피드백 루프)
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 12A8 8 0 1 1 17.65 6.35L20 4V9H15"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
        transform: `translateY(${floatY}px) scale(${containerScale})`,
      }}
    >
      {/* 1. 5개 노드를 잇는 시계 방향 곡선 궤도 및 회전 입자 */}
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
        {nodePositions.map((pos, i) => {
          const nextPos = nodePositions[(i + 1) % 5];
          // 제어점을 바깥쪽으로 부드럽게 위치시켜 곡선 형성
          const midX = (pos.x + nextPos.x) / 2;
          const midY = (pos.y + nextPos.y) / 2;
          const offsetAngle = nodeAngles[i] + Math.PI / 5;
          const qx = midX + Math.cos(offsetAngle) * 35;
          const qy = midY + Math.sin(offsetAngle) * 35;

          const isPathActive = isLoopActive || activeStates[i];

          return (
            <g key={i}>
              <path
                d={`M ${pos.x} ${pos.y} Q ${qx} ${qy} ${nextPos.x} ${nextPos.y}`}
                fill="none"
                stroke={isPathActive ? "#1273c4" : "#d5d2cc"}
                strokeWidth={isPathActive ? 3.5 : 2.5}
                strokeDasharray={isPathActive ? "none" : "5 5"}
                style={{
                  transition: "stroke 0.2s ease, stroke-width 0.2s ease",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* 2. 중앙 코어: 목표 달성까지 무한 반복 순환 카드 */}
      <div
        style={{
          position: "absolute",
          left: cx - 90,
          top: cy - 60,
          width: 180,
          height: 120,
          backgroundColor: "#ffffff",
          border: isLoopActive ? "3.5px solid #1273c4" : "3px solid #d5d2cc",
          borderRadius: "18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          padding: "10px",
          transform: `scale(${loopCenterScale})`,
          boxShadow: isLoopActive
            ? "0 10px 30px rgba(18, 115, 196, 0.22)"
            : "0 4px 16px rgba(16, 17, 19, 0.05)",
          zIndex: 10,
        }}
      >
        {/* 상단 배지 */}
        {badgeText && (
          <div
            style={{
              padding: "2px 8px",
              backgroundColor: "#e8f2fb",
              borderRadius: "6px",
              color: "#1273c4",
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "8px",
              letterSpacing: "-0.2px",
            }}
          >
            {badgeText}
          </div>
        )}

        {/* 자전하는 2중 회전 루프 벡터 화살표 */}
        <div
          style={{
            transform: `rotate(${loopRotation}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "6px",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M 16 4 A 12 12 0 0 1 28 16 L 25 16 A 9 9 0 0 0 16 7 Z"
              fill={isLoopActive ? "#1273c4" : "#43474b"}
            />
            <path
              d="M 16 28 A 12 12 0 0 1 4 16 L 7 16 A 9 9 0 0 0 16 25 Z"
              fill={isLoopActive ? "#1273c4" : "#43474b"}
            />
          </svg>
        </div>

        {/* 중앙 반복 텍스트 */}
        {loopText && (
          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: isLoopActive ? "#1273c4" : "#101113",
              letterSpacing: "-0.3px",
              textAlign: "center",
            }}
          >
            {loopText}
          </span>
        )}
      </div>

      {/* 3. 5개 단계 노드 배치 */}
      {nodePositions.map((pos, i) => {
        const active = activeStates[i];
        const scale = stepScales[i];
        // 포커스 요소 외 딤 처리 시에도 0.72 이상 유지
        const opacity = hasAnyStepActive ? (active ? 1.0 : 0.74) : 1.0;
        const text = stepTexts[i];

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.x - 85,
              top: pos.y - 38,
              width: 170,
              height: 76,
              backgroundColor: active ? "#e8f2fb" : "#ffffff",
              border: active ? "3.5px solid #1273c4" : "3px solid #d5d2cc",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "10px 12px",
              transform: `scale(${scale}) translateY(${Math.sin((currentFrame + i * 15) * 0.05) * 2}px)`,
              opacity,
              boxShadow: active
                ? "0 8px 24px rgba(18, 115, 196, 0.22)"
                : "0 4px 12px rgba(16, 17, 19, 0.04)",
              zIndex: active ? 20 : 5,
              transition: "opacity 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
            }}
          >
            {/* 좌측 아이콘 박스 */}
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "8px",
                backgroundColor: active ? "#ffffff" : "#f0efec",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
                flexShrink: 0,
              }}
            >
              {renderIcon(i, active)}
            </div>

            {/* 우측 번호 및 나레이션 문구 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: active ? "#1273c4" : "#7c8288",
                  lineHeight: "14px",
                  marginBottom: "3px",
                }}
              >
                0{i + 1}
              </span>
              {text && (
                <span
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 700,
                    color: active ? "#1273c4" : "#101113",
                    letterSpacing: "-0.4px",
                    lineHeight: "18px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {text}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
