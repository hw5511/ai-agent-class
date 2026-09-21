// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  scopeTitle?: string;
  allowedTool?: string;
  safetyNotice?: string;
}

export const PermissionScopeGuard: React.FC<Props> = ({
  delay = 0,
  budget,
  scopeTitle = "",
  allowedTool = "",
  safetyNotice = "",
}) => {
  const rawFrame = useCurrentFrame();
  const frame = Math.max(0, rawFrame - delay);

  // 지속적 부유 및 방패 호흡 펄스 (쉬지 않는 애니메이션)
  const floatY = Math.sin(frame * 0.05) * 2.5;
  const pulseR = Math.sin(frame * 0.07) * 3;

  // 0~35f 탄성 확장 진입 (45프레임 이내 첫 움직임)
  const enterProgress = interpolate(frame, [0, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  // #12~#13 [617~723] 읽고 찾는 도구만 들어 있네요 -> 허용 도구 포커스 팝
  const toolFocus = interpolate(
    frame,
    [610, 635, 715, 735],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // #14~#15 [723~823] 필요 없는 도구가 있으면 지우면 돼요 -> 외부 불필요 요소 딤 & 차단
  const pruneDim = interpolate(frame, [720, 755], [1, 0.74], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // #16~#18 [823~960] 권한을 좁혀두면 실수로 파일을 건드릴 일이 없거든요 -> 방패 잠금 & 안전 안내 팝
  const lockProgress = interpolate(frame, [820, 855], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const ink = "#101113";
  const ink2 = "#43474b";
  const muted = "#7c8288";
  const borderCol = "#d5d2cc";
  const accent = "#1273c4";
  const accentWash = "#e8f2fb";

  const shieldScale = interpolate(lockProgress, [0, 1], [1, 0.96]);

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: "16px 20px",
        fontFamily: "'Pretendard', 'Spoqa Han Sans Neo', sans-serif",
        opacity: enterProgress,
        transform: `scale(${enterProgress})`,
      }}
    >
      {/* 상단: 권한 좁힘 안내 라벨 */}
      {scopeTitle !== "" && (
        <div
          style={{
            position: "absolute",
            top: 24,
            padding: "6px 16px",
            borderRadius: 14,
            backgroundColor: "#ffffff",
            border: `3px solid ${lockProgress > 0.5 ? accent : borderCol}`,
            color: lockProgress > 0.5 ? accent : ink,
            fontSize: 15,
            fontWeight: 700,
            boxShadow: "0 2px 8px rgba(16, 17, 19, 0.04)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transform: `translateY(${floatY * 0.5}px)`,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: accent,
            }}
          />
          {scopeTitle}
        </div>
      )}

      {/* 중앙: 보호 영역 (Shield Scope Boundary) */}
      <div
        style={{
          position: "relative",
          width: 360,
          height: 190,
          borderRadius: 22,
          backgroundColor: "#ffffff",
          border: `3px dashed ${lockProgress > 0.5 ? accent : borderCol}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${floatY}px) scale(${shieldScale})`,
          boxSizing: "border-box",
          padding: 16,
        }}
      >
        {/* 보호받는 파일 코어 (중앙) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* 안전 보호 링 펄스 */}
          <div
            style={{
              position: "absolute",
              width: 86 + pulseR,
              height: 86 + pulseR,
              borderRadius: "50%",
              backgroundColor: accentWash,
              opacity: lockProgress > 0.5 ? 0.9 : 0.4,
              zIndex: 0,
            }}
          />

          {/* 파일 벡터 아이콘 */}
          <div
            style={{
              width: 52,
              height: 64,
              borderRadius: 8,
              backgroundColor: "#ffffff",
              border: `3.5px solid ${ink}`,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              padding: "10px 8px",
              boxSizing: "border-box",
              zIndex: 1,
            }}
          >
            {/* 파일 안쪽 라인 */}
            <div
              style={{
                width: 22,
                height: 3,
                backgroundColor: ink2,
                borderRadius: 2,
                marginBottom: 6,
              }}
            />
            <div
              style={{
                width: 30,
                height: 3,
                backgroundColor: borderCol,
                borderRadius: 2,
                marginBottom: 6,
              }}
            />
            <div
              style={{
                width: 18,
                height: 3,
                backgroundColor: borderCol,
                borderRadius: 2,
              }}
            />

            {/* 잠금 뱃지 인디케이터 */}
            <div
              style={{
                position: "absolute",
                right: -6,
                bottom: -6,
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: accent,
                border: "2px solid #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path
                  d="M5 7V5a3 3 0 016 0v2M4 7h8v6H4V7z"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 허용된 도구 뱃지 (읽고 찾는 도구만 통과) */}
        {allowedTool !== "" && (
          <div
            style={{
              position: "absolute",
              right: 22,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 14,
              backgroundColor: toolFocus > 0.3 ? accentWash : "#f0efec",
              border: `3px solid ${toolFocus > 0.3 ? accent : borderCol}`,
              color: toolFocus > 0.3 ? accent : ink,
              transform: `scale(${toolFocus > 0.3 ? 1.12 : 1.0})`,
              boxShadow:
                toolFocus > 0.3
                  ? "0 6px 16px rgba(18, 115, 196, 0.16)"
                  : "none",
            }}
          >
            {/* 돋보기 벡터 아이콘 */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="7"
                cy="7"
                r="4.5"
                stroke={toolFocus > 0.3 ? accent : ink2}
                strokeWidth="2.4"
              />
              <path
                d="M10.5 10.5L14 14"
                stroke={toolFocus > 0.3 ? accent : ink2}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 700 }}>
              {allowedTool}
            </span>
          </div>
        )}

        {/* 배제된 불필요 도구 차단 노드 (좌측 바깥 경계) */}
        <div
          style={{
            position: "absolute",
            left: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: "#f0efec",
            border: `2.5px solid ${borderCol}`,
            opacity: pruneDim,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke={muted}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* 하단: 실수 방지 안내 배지 */}
      {safetyNotice !== "" && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            padding: "6px 16px",
            borderRadius: 14,
            backgroundColor: "#ffffff",
            border: `2px solid ${lockProgress > 0.5 ? borderCol : "transparent"}`,
            color: ink2,
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
            opacity: lockProgress > 0.2 ? 1 : 0.74,
            transform: `translateY(${floatY * -0.5}px)`,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2l6 3v4c0 4-6 6-6 6s-6-2-6-6V5l6-3z"
              stroke={accent}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {safetyNotice}
        </div>
      )}
    </div>
  );
};
