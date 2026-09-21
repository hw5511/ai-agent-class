// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 500, h: 320 };

interface Props {
  delay?: number;
  budget: number;
  toolText?: string;
  targetName?: string;
  folderText?: string;
  actionText?: string;
}

export const AutoSkillFolder: React.FC<Props> = ({
  delay = 0,
  budget = 900,
  toolText = "",
  targetName = "",
  folderText = "",
  actionText = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  // 1. 상단 'Write' 도구 배지 등장 (0~24f, 45f 이내 첫 움직임)
  const toolEnter = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  // 2. 도구에서 하단으로 뻗는 생성 레이저 가이드선 (20~46f)
  const beamProgress = interpolate(frame, [20, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 3. 하단 폴더 전개 등장 (34~58f)
  const folderEnter = interpolate(frame, [34, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 4. 스킬 파일 카드가 쏙 생성되어 안착 (48~74f)
  const fileEnter = interpolate(frame, [48, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  // 5. 'card-news' 타겟 명칭 팝업 강조 (70~92f)
  const namePop = interpolate(frame, [70, 84, 98], [1, 1.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 지속적 호흡 모션
  const idleFloat = Math.sin((frame + 16) * 0.05) * 3.5;
  const pulseRing = (frame * 0.06) % 1;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: "16px 20px 14px",
        fontFamily: "'Pretendard', 'Spoqa Han Sans Neo', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* 상단: 'Write' 도구 배지 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: toolEnter,
          transform: `scale(${toolEnter}) translateY(${idleFloat * 0.6}px)`,
          position: "relative",
          zIndex: 3,
        }}
      >
        {/* 펄스 링 */}
        <div
          style={{
            position: "absolute",
            left: 2,
            top: 2,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid #1273c4",
            opacity: (1 - pulseRing) * 0.5,
            transform: `scale(${1 + pulseRing * 0.5})`,
            pointerEvents: "none",
          }}
        />

        {/* 펜/작성 도구 원형 아이콘 */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "#1273c4",
            border: "3.5px solid #101113",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(18, 115, 196, 0.25)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M3 19L7 18L18 7L14 3L3 14V19Z"
              fill="#ffffff"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <line x1="12" y1="5" x2="16" y2="9" stroke="#101113" strokeWidth="2" />
          </svg>
        </div>

        {/* 도구 이름 라벨 알약 */}
        {toolText !== "" && (
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "2.5px solid #1273c4",
              borderRadius: 20,
              padding: "4px 14px",
              color: "#1273c4",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "-0.2px",
              boxShadow: "0 3px 8px rgba(18, 115, 196, 0.12)",
            }}
          >
            {toolText}
          </div>
        )}
      </div>

      {/* 중앙: 생성 빔 / 분기 가이드선 */}
      <div
        style={{
          width: "100%",
          height: 44,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <svg
          width="360"
          height="44"
          viewBox="0 0 360 44"
          fill="none"
          style={{ overflow: "visible" }}
        >
          {/* 좌측 폴더로 향하는 분기선 */}
          <path
            d="M180 2 C180 20, 110 18, 110 44"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeDasharray="4 4"
          />
          <path
            d="M180 2 C180 20, 110 18, 110 44"
            stroke="#1273c4"
            strokeWidth="3"
            strokeDasharray="120"
            strokeDashoffset={120 * (1 - beamProgress)}
            strokeLinecap="round"
          />

          {/* 우측 파일로 향하는 분기선 */}
          <path
            d="M180 2 C180 20, 250 18, 250 44"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeDasharray="4 4"
          />
          <path
            d="M180 2 C180 20, 250 18, 250 44"
            stroke="#1273c4"
            strokeWidth="3"
            strokeDasharray="120"
            strokeDashoffset={120 * (1 - beamProgress)}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 하단: 폴더와 생성된 파일 안착 영역 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 28,
          zIndex: 2,
        }}
      >
        {/* 좌측: 폴더 일러스트 (고유색 노랑 예외) */}
        <div
          style={{
            width: 154,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: folderEnter,
            transform: `translateY(${idleFloat * -0.5}px) scale(${folderEnter})`,
          }}
        >
          <svg width="136" height="96" viewBox="0 0 136 96" fill="none">
            {/* 폴더 뒷면 탭 */}
            <path
              d="M10 22C10 16.4772 14.4772 12 20 12H48L58 22H116C121.523 22 126 26.4772 126 32V80C126 85.5228 121.523 90 116 90H20C14.4772 90 10 85.5228 10 80V22Z"
              fill="#fff7d6"
              stroke="#d59a22"
              strokeWidth="3.5"
            />
            {/* 폴더 내부 수납 면 */}
            <rect x="22" y="32" width="92" height="48" rx="8" fill="#ffffff" />
            {/* 폴더 앞면 플랩 */}
            <path
              d="M6 38C6 32.4772 10.4772 28 16 28H120C125.523 28 130 32.4772 130 38V80C130 85.5228 125.523 90 120 90H16C10.4772 90 6 85.5228 6 80V38Z"
              fill="#fef0ba"
              stroke="#d59a22"
              strokeWidth="3.5"
            />
          </svg>

          {/* 폴더 설명 텍스트 */}
          {folderText !== "" && (
            <div
              style={{
                marginTop: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "#43474b",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {folderText}
            </div>
          )}
        </div>

        {/* 우측: 스킬 파일 일러스트 및 'card-news' 명칭 */}
        <div
          style={{
            width: 170,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: fileEnter,
            transform: `translateY(${idleFloat * 0.7}px) scale(${fileEnter})`,
          }}
        >
          {/* 파일 카드 */}
          <div
            style={{
              width: 140,
              height: 104,
              borderRadius: 14,
              backgroundColor: "#ffffff",
              border: "3.5px solid #101113",
              boxSizing: "border-box",
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 6px 14px rgba(16, 17, 19, 0.08)",
              position: "relative",
            }}
          >
            {/* 상단 파일 태그 뱃지 */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
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
                  width: 44,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: "#d5d2cc",
                }}
              />
            </div>

            {/* 타겟 스킬 이름 ('card-news') 라벨 */}
            {targetName !== "" && (
              <div
                style={{
                  alignSelf: "center",
                  padding: "4px 10px",
                  borderRadius: 6,
                  backgroundColor: "#e8f2fb",
                  border: "1.5px solid #1273c4",
                  color: "#1273c4",
                  fontSize: 13.5,
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', 'D2Coding', monospace",
                  letterSpacing: "-0.2px",
                  transform: `scale(${namePop})`,
                  whiteSpace: "nowrap",
                }}
              >
                {targetName}
              </div>
            )}

            {/* 하단 줄글 라인 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  width: "100%",
                  height: 3.5,
                  borderRadius: 2,
                  backgroundColor: "#f0efec",
                }}
              />
              <div
                style={{
                  width: "70%",
                  height: 3.5,
                  borderRadius: 2,
                  backgroundColor: "#f0efec",
                }}
              />
            </div>
          </div>

          {/* 자동 생성 행동 문구 배지 */}
          {actionText !== "" && (
            <div
              style={{
                marginTop: 8,
                padding: "4px 12px",
                borderRadius: 8,
                backgroundColor: "#ffffff",
                border: "2px solid #1273c4",
                color: "#1273c4",
                fontSize: 13,
                fontWeight: 700,
                textAlign: "center",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 6px rgba(18, 115, 196, 0.1)",
              }}
            >
              {actionText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
