// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 360 };

interface PersistentRecordVaultProps {
  delay?: number;
  budget: number;
  statusBadge?: string;
  vaultTitle?: string;
  subNotice?: string;
}

const COLOR_INK = "#101113";
const COLOR_INK2 = "#43474b";
const COLOR_MUTED = "#7c8288";
const COLOR_BORDER = "#d5d2cc";
const COLOR_CARD = "#ffffff";
const COLOR_ACCENT = "#1273c4";
const COLOR_ACCENT_WASH = "#e8f2fb";

const FONT_DISPLAY = "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
const FONT_BODY = "'Spoqa Han Sans Neo', Pretendard, sans-serif";

export const PersistentRecordVault: React.FC<PersistentRecordVaultProps> = ({
  delay = 0,
  budget,
  statusBadge = "",
  vaultTitle = "",
  subNotice = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  // 1. 살아 숨쉬는 지속 부유 애니메이션
  const subtleFloat = Math.sin(frame * 0.055) * 3.5;
  const livingPulse = 1 + Math.sin(frame * 0.07) * 0.012;

  // 2. 초기 등장 (프레임 0~35: 45프레임 이내 시작)
  const enterScale = interpolate(frame, [0, 35], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const enterOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. 외부 휘발성 세션 경계의 닫힘/소멸 애니메이션 (프레임 500~560, "창을 닫아도 그" 타이밍 대응)
  // 의도: 창이 닫히는 사건을 설명하기 위해 외부 점선 세션 틀이 수축하며 희미하게 닫혀 사라짐
  const sessionEnvelopeScale = interpolate(frame, [500, 560], [1.0, 0.88], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const sessionEnvelopeOpacity = interpolate(frame, [500, 560], [1.0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. 중앙 영구 보관함(Vault)의 포커스 팝 (프레임 500~560)
  // 의도: 창이 닫혀도 '기록'은 절대 사라지지 않고 견고하게 남는다는 핵심을 보관함 확대(1.16배)와 강화로 강조
  const vaultFocusScale = interpolate(frame, [500, 550], [1.0, 1.16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
  const vaultElevation = interpolate(frame, [500, 550], [0, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 5. 안전 보존 락(Lock) 쉴드 펄스 및 파동 링 (프레임 550~615, "기록은 지워지지 않아요")
  const shieldScale = interpolate(frame, [550, 580, 615], [1.0, 1.28, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const ringScale = interpolate(frame, [550, 615], [1.0, 1.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(frame, [550, 615], [0.45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 6. 하단 지속성 확인 안내 배지 (프레임 620~670, "그대로 남아 있거든요")
  const noticeOpacity = interpolate(frame, [620, 660], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const noticeY = interpolate(frame, [620, 660], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: enterOpacity,
        transform: `scale(${enterScale})`,
      }}
    >
      {/* 1. 휘발성 세션 경계 프레임 (창이 닫히면 사라지는 추상 벡터 틀) */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 290,
          borderRadius: 22,
          border: `3px dashed ${COLOR_BORDER}`,
          transform: `scale(${sessionEnvelopeScale})`,
          opacity: sessionEnvelopeOpacity,
          pointerEvents: "none",
          boxSizing: "border-box",
        }}
      >
        {/* 상단 상황 배지 ("창을 닫아도") */}
        {statusBadge !== "" && (
          <div
            style={{
              position: "absolute",
              top: -14,
              left: 28,
              background: COLOR_CARD,
              border: `2px solid ${COLOR_INK}`,
              borderRadius: 14,
              padding: "4px 14px",
              boxShadow: "0 2px 8px rgba(16, 17, 19, 0.06)",
            }}
          >
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 13,
                fontWeight: 700,
                color: COLOR_INK,
              }}
            >
              {statusBadge}
            </span>
          </div>
        )}
      </div>

      {/* 2. 중앙 영구 보관함 (Persistent Vault) */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          transform: `scale(${vaultFocusScale * livingPulse}) translateY(${subtleFloat + vaultElevation}px)`,
          transition: "transform 0.25s ease-out",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 보관함 상단 타이틀 명판 */}
        {vaultTitle !== "" && (
          <div
            style={{
              background: COLOR_INK,
              color: COLOR_CARD,
              padding: "4px 18px",
              borderRadius: "12px 12px 0 0",
              fontFamily: FONT_DISPLAY,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              boxShadow: "0 2px 6px rgba(16, 17, 19, 0.1)",
            }}
          >
            {vaultTitle}
          </div>
        )}

        {/* 보관 금고 본체 */}
        <div
          style={{
            width: 250,
            height: 160,
            background: COLOR_CARD,
            border: `3.5px solid ${COLOR_INK}`,
            borderRadius: 18,
            boxShadow: "0 12px 28px rgba(16, 17, 19, 0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: 16,
            boxSizing: "border-box",
          }}
        >
          {/* 금고 모서리 리벳 장식 (4개) */}
          <div style={{ position: "absolute", top: 10, left: 10, width: 7, height: 7, borderRadius: "50%", background: COLOR_BORDER }} />
          <div style={{ position: "absolute", top: 10, right: 10, width: 7, height: 7, borderRadius: "50%", background: COLOR_BORDER }} />
          <div style={{ position: "absolute", bottom: 10, left: 10, width: 7, height: 7, borderRadius: "50%", background: COLOR_BORDER }} />
          <div style={{ position: "absolute", bottom: 10, right: 10, width: 7, height: 7, borderRadius: "50%", background: COLOR_BORDER }} />

          {/* 안전하게 정돈되어 쌓여 있는 대화 기록 문서 카드 3장 */}
          <div
            style={{
              width: "100%",
              height: 70,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* 문서 뒷장 1 */}
            <div
              style={{
                position: "absolute",
                top: 0,
                width: 170,
                height: 38,
                background: COLOR_ACCENT_WASH,
                border: `2px solid ${COLOR_BORDER}`,
                borderRadius: 8,
              }}
            />
            {/* 문서 중간장 2 */}
            <div
              style={{
                position: "absolute",
                top: 10,
                width: 186,
                height: 40,
                background: COLOR_CARD,
                border: `2px solid ${COLOR_INK2}`,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                gap: 8,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLOR_BORDER }} />
              <div style={{ width: 70, height: 4, background: COLOR_MUTED, borderRadius: 2 }} />
            </div>
            {/* 문서 앞장 3 (보존 활성 레이어) */}
            <div
              style={{
                position: "absolute",
                top: 20,
                width: 202,
                height: 44,
                background: COLOR_CARD,
                border: `2.5px solid ${COLOR_INK}`,
                borderRadius: 8,
                boxShadow: "0 4px 10px rgba(16, 17, 19, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLOR_ACCENT }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ width: 80, height: 4, background: COLOR_INK, borderRadius: 2 }} />
                  <div style={{ width: 45, height: 3, background: COLOR_MUTED, borderRadius: 2 }} />
                </div>
              </div>
              {/* 블루 보존 태그 핀 */}
              <div
                style={{
                  width: 12,
                  height: 16,
                  background: COLOR_ACCENT,
                  borderRadius: "2px 2px 4px 4px",
                }}
              />
            </div>
          </div>

          {/* 중앙 안전 보존 락(Lock) 쉴드 배지 */}
          <div
            style={{
              position: "absolute",
              bottom: -18,
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 락 작동 시 퍼져나가는 안전 펄스 링 */}
            <div
              style={{
                position: "absolute",
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: `3px solid ${COLOR_ACCENT}`,
                transform: `scale(${ringScale})`,
                opacity: ringOpacity,
              }}
            />

            {/* 메인 락 아이콘 서클 */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: COLOR_ACCENT,
                border: `3px solid ${COLOR_CARD}`,
                boxShadow: "0 4px 14px rgba(18, 115, 196, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${shieldScale})`,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V10M5 10H19C20.1046 10 21 10.8954 21 12V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V12C3 10.8954 3.89543 10 5 10Z"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="16" r="1.5" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 하단 영구 유지 확인 문구 배지 ("그대로 남아 있거든요") */}
      {subNotice !== "" && (
        <div
          style={{
            position: "absolute",
            bottom: 22,
            opacity: noticeOpacity,
            transform: `translateY(${noticeY}px)`,
            background: COLOR_CARD,
            border: `2px solid ${COLOR_BORDER}`,
            borderRadius: 16,
            padding: "6px 18px",
            boxShadow: "0 4px 12px rgba(16, 17, 19, 0.05)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLOR_ACCENT }} />
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 14,
              fontWeight: 700,
              color: COLOR_INK2,
              letterSpacing: "-0.01em",
            }}
          >
            {subNotice}
          </span>
        </div>
      )}
    </div>
  );
};
