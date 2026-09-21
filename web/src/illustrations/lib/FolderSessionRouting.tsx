// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 360 };

interface FolderSessionRoutingProps {
  delay?: number;
  budget: number;
  sourceTitle?: string;
  routingBadge?: string;
  folderATitle?: string;
  folderBTitle?: string;
}

const COLOR_INK = "#101113";
const COLOR_INK2 = "#43474b";
const COLOR_MUTED = "#7c8288";
const COLOR_BORDER = "#d5d2cc";
const COLOR_CARD = "#ffffff";
const COLOR_ACCENT = "#1273c4";
const COLOR_ACCENT_WASH = "#e8f2fb";
const COLOR_FOLDER_YELLOW = "#f5b83d";
const COLOR_FOLDER_TAB = "#e8a82c";

const FONT_DISPLAY = "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
const FONT_BODY = "'Spoqa Han Sans Neo', Pretendard, sans-serif";

export const FolderSessionRouting: React.FC<FolderSessionRoutingProps> = ({
  delay = 0,
  budget,
  sourceTitle = "",
  routingBadge = "",
  folderATitle = "",
  folderBTitle = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  // 1. 지속적인 미세 부유 생명력 (절대 멈추지 않는 모션)
  const subtleFloat = Math.sin(frame * 0.06) * 3;
  const pulseScale = 1 + Math.sin(frame * 0.08) * 0.015;

  // 2. 상단 발신원 대화 버블 진입 (프레임 0~35: 45프레임 이내 빠른 첫 동작)
  const sourceScale = interpolate(frame, [0, 30], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const sourceOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. 중앙 분기 경로 배지 및 파이프 등장 (프레임 25~60)
  const routingOpacity = interpolate(frame, [25, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const routingScale = interpolate(frame, [25, 55], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 4. 하단 두 폴더 컨테이너 슬라이드 진입 (프레임 35~75)
  const foldersY = interpolate(frame, [35, 75], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const foldersOpacity = interpolate(frame, [35, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5. '에이전트' 폴더 포커스 팝 및 블록 차곡차곡 스택 (프레임 134~343 대응)
  // 의도: 에이전트 폴더를 설명할 때 해당 폴더를 1.15배 확대 포커스하고, 반대편은 은은하게 딤(0.74 >= 0.72)
  const focusScaleA = interpolate(frame, [134, 165, 320, 345], [1.0, 1.15, 1.15, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const dimOpacityB = interpolate(frame, [134, 165, 320, 345], [1.0, 0.74, 0.74, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 에이전트 쪽으로 떨어져 쌓이는 세션 메시지 블록들
  const blockA1Y = interpolate(frame, [160, 195], [-35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.bounce),
  });
  const blockA1Opacity = interpolate(frame, [160, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blockA2Y = interpolate(frame, [215, 250], [-35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.bounce),
  });
  const blockA2Opacity = interpolate(frame, [215, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blockA3Y = interpolate(frame, [270, 305], [-35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.bounce),
  });
  const blockA3Opacity = interpolate(frame, [270, 285], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 6. '사진' 폴더 포커스 팝 및 블록 차곡차곡 스택 (프레임 343~510 대응)
  // 의도: 사진 쪽 설명을 시작하는 타이밍에 포커스를 사진 폴더로 넘겨 1.15배 확대
  const focusScaleB = interpolate(frame, [343, 375, 480, 510], [1.0, 1.15, 1.15, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const dimOpacityA = interpolate(frame, [343, 375, 480, 510], [1.0, 0.74, 0.74, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 사진 쪽으로 떨어져 쌓이는 세션 메시지 블록들
  const blockB1Y = interpolate(frame, [365, 400], [-35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.bounce),
  });
  const blockB1Opacity = interpolate(frame, [365, 380], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blockB2Y = interpolate(frame, [415, 450], [-35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.bounce),
  });
  const blockB2Opacity = interpolate(frame, [415, 430], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blockB3Y = interpolate(frame, [465, 495], [-35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.bounce),
  });
  const blockB3Opacity = interpolate(frame, [465, 480], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 데이터 흐름 파티클 모션 (배선 위를 흐르는 점)
  const flowProgressA = (frame * 0.035) % 1;
  const flowProgressB = ((frame + 15) * 0.035) % 1;

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
        justifyContent: "space-between",
        padding: "16px 20px 20px",
      }}
    >
      {/* 1. 상단: 클로드 코드 대화 발신원 버블 */}
      <div
        style={{
          transform: `scale(${sourceScale * pulseScale}) translateY(${subtleFloat}px)`,
          opacity: sourceOpacity,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: COLOR_CARD,
          border: `3px solid ${COLOR_INK}`,
          borderRadius: 16,
          padding: "8px 18px",
          boxShadow: "0 6px 16px rgba(16, 17, 19, 0.06)",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: COLOR_ACCENT,
            boxShadow: `0 0 0 4px ${COLOR_ACCENT_WASH}`,
          }}
        />
        {sourceTitle !== "" && (
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 15,
              fontWeight: 700,
              color: COLOR_INK,
              letterSpacing: "-0.02em",
            }}
          >
            {sourceTitle}
          </span>
        )}
      </div>

      {/* 2. 중앙: 분기 파이프라인 SVG 및 경로 배지 */}
      <div
        style={{
          width: "100%",
          height: 90,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="100%"
          height="90"
          viewBox="0 0 440 90"
          style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
        >
          {/* 좌측 폴더로 향하는 분기선 */}
          <path
            d="M 220 5 C 220 45, 110 35, 110 85"
            fill="none"
            stroke={COLOR_BORDER}
            strokeWidth="3.5"
            strokeDasharray="6 6"
          />
          {/* 우측 폴더로 향하는 분기선 */}
          <path
            d="M 220 5 C 220 45, 330 35, 330 85"
            fill="none"
            stroke={COLOR_BORDER}
            strokeWidth="3.5"
            strokeDasharray="6 6"
          />
          {/* 좌측 파이프를 타고 이동하는 데이터 펄스 점 */}
          <circle
            cx={interpolate(flowProgressA, [0, 0.5, 1], [220, 165, 110])}
            cy={interpolate(flowProgressA, [0, 0.5, 1], [5, 40, 85])}
            r="4.5"
            fill={COLOR_ACCENT}
          />
          {/* 우측 파이프를 타고 이동하는 데이터 펄스 점 */}
          <circle
            cx={interpolate(flowProgressB, [0, 0.5, 1], [220, 275, 330])}
            cy={interpolate(flowProgressB, [0, 0.5, 1], [5, 40, 85])}
            r="4.5"
            fill={COLOR_ACCENT}
          />
        </svg>

        {/* 중앙 분기 설명 배지 */}
        {routingBadge !== "" && (
          <div
            style={{
              position: "relative",
              zIndex: 5,
              transform: `scale(${routingScale})`,
              opacity: routingOpacity,
              background: COLOR_ACCENT_WASH,
              border: `1.5px solid ${COLOR_ACCENT}`,
              borderRadius: 20,
              padding: "4px 14px",
              boxShadow: "0 2px 8px rgba(18, 115, 196, 0.12)",
            }}
          >
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: 13,
                fontWeight: 700,
                color: COLOR_ACCENT,
                letterSpacing: "-0.01em",
              }}
            >
              {routingBadge}
            </span>
          </div>
        )}
      </div>

      {/* 3. 하단: 좌우 분리 저장 폴더 2개 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          transform: `translateY(${foldersY}px)`,
          opacity: foldersOpacity,
          padding: "0 10px",
        }}
      >
        {/* 좌측 폴더 (에이전트) */}
        <div
          style={{
            width: 190,
            transform: `scale(${focusScaleA}) translateY(${subtleFloat * 0.8}px)`,
            opacity: dimOpacityA,
            transformOrigin: "bottom center",
            transition: "transform 0.2s ease-out",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 폴더 내부로 차곡차곡 스택되는 세션 메시지 카드 3개 */}
          <div
            style={{
              width: 154,
              height: 48,
              position: "relative",
              marginBottom: -10,
              zIndex: 1,
            }}
          >
            {/* 카드 1 */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 22,
                background: COLOR_CARD,
                border: `2px solid ${COLOR_BORDER}`,
                borderRadius: 8,
                transform: `translateY(${blockA1Y}px)`,
                opacity: blockA1Opacity,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                gap: 6,
                boxShadow: "0 2px 6px rgba(16, 17, 19, 0.04)",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLOR_ACCENT }} />
              <div style={{ width: 50, height: 3, background: COLOR_MUTED, borderRadius: 2 }} />
            </div>

            {/* 카드 2 */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 6,
                right: 6,
                height: 22,
                background: COLOR_CARD,
                border: `2px solid ${COLOR_INK2}`,
                borderRadius: 8,
                transform: `translateY(${blockA2Y}px)`,
                opacity: blockA2Opacity,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                gap: 6,
                boxShadow: "0 3px 8px rgba(16, 17, 19, 0.06)",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLOR_ACCENT }} />
              <div style={{ width: 65, height: 3, background: COLOR_INK2, borderRadius: 2 }} />
            </div>

            {/* 카드 3 */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 12,
                right: 12,
                height: 22,
                background: COLOR_CARD,
                border: `2px solid ${COLOR_ACCENT}`,
                borderRadius: 8,
                transform: `translateY(${blockA3Y}px)`,
                opacity: blockA3Opacity,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                gap: 6,
                boxShadow: "0 4px 10px rgba(18, 115, 196, 0.14)",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLOR_ACCENT }} />
              <div style={{ width: 45, height: 3, background: COLOR_ACCENT, borderRadius: 2 }} />
            </div>
          </div>

          {/* 폴더 형태 본체 */}
          <div style={{ width: 180, position: "relative", zIndex: 2 }}>
            {/* 폴더 탭 */}
            <div
              style={{
                width: 60,
                height: 14,
                background: COLOR_FOLDER_TAB,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                marginLeft: 14,
                border: `3px solid ${COLOR_INK}`,
                borderBottom: "none",
              }}
            />
            {/* 폴더 전면 포켓 */}
            <div
              style={{
                width: "100%",
                height: 84,
                background: COLOR_FOLDER_YELLOW,
                border: `3px solid ${COLOR_INK}`,
                borderRadius: 16,
                boxShadow: "0 6px 16px rgba(16, 17, 19, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 12px",
                boxSizing: "border-box",
              }}
            >
              {folderATitle !== "" && (
                <div
                  style={{
                    background: COLOR_CARD,
                    border: `2px solid ${COLOR_INK}`,
                    borderRadius: 10,
                    padding: "4px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 14,
                      fontWeight: 700,
                      color: COLOR_INK,
                    }}
                  >
                    {folderATitle}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 우측 폴더 (사진) */}
        <div
          style={{
            width: 190,
            transform: `scale(${focusScaleB}) translateY(${subtleFloat * 0.8}px)`,
            opacity: dimOpacityB,
            transformOrigin: "bottom center",
            transition: "transform 0.2s ease-out",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 폴더 내부로 차곡차곡 스택되는 세션 메시지 카드 3개 */}
          <div
            style={{
              width: 154,
              height: 48,
              position: "relative",
              marginBottom: -10,
              zIndex: 1,
            }}
          >
            {/* 카드 1 */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 22,
                background: COLOR_CARD,
                border: `2px solid ${COLOR_BORDER}`,
                borderRadius: 8,
                transform: `translateY(${blockB1Y}px)`,
                opacity: blockB1Opacity,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                gap: 6,
                boxShadow: "0 2px 6px rgba(16, 17, 19, 0.04)",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLOR_ACCENT }} />
              <div style={{ width: 50, height: 3, background: COLOR_MUTED, borderRadius: 2 }} />
            </div>

            {/* 카드 2 */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 6,
                right: 6,
                height: 22,
                background: COLOR_CARD,
                border: `2px solid ${COLOR_INK2}`,
                borderRadius: 8,
                transform: `translateY(${blockB2Y}px)`,
                opacity: blockB2Opacity,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                gap: 6,
                boxShadow: "0 3px 8px rgba(16, 17, 19, 0.06)",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLOR_ACCENT }} />
              <div style={{ width: 65, height: 3, background: COLOR_INK2, borderRadius: 2 }} />
            </div>

            {/* 카드 3 */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 12,
                right: 12,
                height: 22,
                background: COLOR_CARD,
                border: `2px solid ${COLOR_ACCENT}`,
                borderRadius: 8,
                transform: `translateY(${blockB3Y}px)`,
                opacity: blockB3Opacity,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                gap: 6,
                boxShadow: "0 4px 10px rgba(18, 115, 196, 0.14)",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLOR_ACCENT }} />
              <div style={{ width: 45, height: 3, background: COLOR_ACCENT, borderRadius: 2 }} />
            </div>
          </div>

          {/* 폴더 형태 본체 */}
          <div style={{ width: 180, position: "relative", zIndex: 2 }}>
            {/* 폴더 탭 */}
            <div
              style={{
                width: 60,
                height: 14,
                background: COLOR_FOLDER_TAB,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                marginLeft: 14,
                border: `3px solid ${COLOR_INK}`,
                borderBottom: "none",
              }}
            />
            {/* 폴더 전면 포켓 */}
            <div
              style={{
                width: "100%",
                height: 84,
                background: COLOR_FOLDER_YELLOW,
                border: `3px solid ${COLOR_INK}`,
                borderRadius: 16,
                boxShadow: "0 6px 16px rgba(16, 17, 19, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 12px",
                boxSizing: "border-box",
              }}
            >
              {folderBTitle !== "" && (
                <div
                  style={{
                    background: COLOR_CARD,
                    border: `2px solid ${COLOR_INK}`,
                    borderRadius: 10,
                    padding: "4px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 14,
                      fontWeight: 700,
                      color: COLOR_INK,
                    }}
                  >
                    {folderBTitle}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
