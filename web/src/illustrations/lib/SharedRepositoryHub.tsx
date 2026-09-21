// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  cloudLabel?: string;
  folderLabel?: string;
  repoLabel?: string;
  otherComputerLabel?: string;
  togetherLabel?: string;
}

export const canvas = { w: 520, h: 380 };

export const SharedRepositoryHub: React.FC<Props> = ({
  delay = 0,
  budget,
  cloudLabel = "",
  folderLabel = "",
  repoLabel = "",
  otherComputerLabel = "",
  togetherLabel = "",
}) => {
  const rawFrame = useCurrentFrame();
  const frame = Math.max(0, rawFrame - delay);

  // 상시 부유 모션 (쉬지 않는 생명력)
  const floatY = Math.sin((frame + 10) * 0.06) * 4;
  const pulseScale = 1 + Math.sin(frame * 0.08) * 0.02;

  // 1. 초기 등장 (0~35f)
  const introProgress = interpolate(frame, [0, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  // 2. 나레이션 포커스 안무
  // [145~210]: "둔 공유폴더라고 보면" -> 폴더 포커스 팝
  // [220~300]: "그 폴더 하나를 저장소라고 부르죠" -> 저장소 1.18배 포커스 줌 & 파란 오라
  // [355~480]: "다른 컴퓨터에서도 열리고 여럿이 함께 볼 수 있어요" -> 하단 컴퓨터들 포커스
  const repoFocusScale = interpolate(
    frame,
    [0, 145, 175, 215, 240, 305, 340],
    [1, 1, 1.12, 1.08, 1.2, 1.2, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );

  const bottomFocusScale = interpolate(
    frame,
    [305, 355, 420, 480, 520],
    [1, 1.08, 1.08, 1.05, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );

  const topOpacity = interpolate(
    frame,
    [340, 380, 470, 510],
    [1, 0.78, 0.78, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const bottomOpacity = interpolate(
    frame,
    [210, 245, 305, 335],
    [1, 0.75, 0.75, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 3. 파일 전달 스토리텔링 애니메이션
  // 파일 1: 하단 장치 A -> 상단 저장소 업로드 (305~355f)
  const uploadProg = interpolate(frame, [305, 350], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const file1X = interpolate(uploadProg, [0, 1], [115, 260]);
  const file1Y = interpolate(uploadProg, [0, 1], [270, 130]);
  const file1Opacity = interpolate(frame, [300, 308, 348, 355], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 파일 2 & 3: 저장소 -> 다른 컴퓨터들로 동시 복사 배포 (355~420f)
  const syncProg = interpolate(frame, [355, 410], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const file2X = interpolate(syncProg, [0, 1], [260, 260]);
  const file2Y = interpolate(syncProg, [0, 1], [130, 270]);
  const file3X = interpolate(syncProg, [0, 1], [260, 405]);
  const file3Y = interpolate(syncProg, [0, 1], [130, 270]);
  const syncOpacity = interpolate(frame, [352, 360, 415, 430], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 네트워크 링크 대시 이동
  const dashOffset = (frame * 1.5) % 24;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
        fontFamily: "'Pretendard', sans-serif",
      }}
    >
      {/* SVG 네트워크 연결선 */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="linkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1273c4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d5d2cc" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* 중앙 클라우드에서 각 컴퓨터로 연결되는 데이터 패스 */}
        <path
          d="M 260 145 C 260 195, 115 210, 115 270"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeDasharray="6 6"
          strokeDashoffset={-dashOffset}
        />
        <path
          d="M 260 145 C 260 200, 260 220, 260 270"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeDasharray="6 6"
          strokeDashoffset={-dashOffset}
        />
        <path
          d="M 260 145 C 260 195, 405 210, 405 270"
          fill="none"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          strokeDasharray="6 6"
          strokeDashoffset={-dashOffset}
        />

        {/* 활성 에너지 펄스 비드 */}
        <circle
          cx={interpolate((frame * 2.2) % 100, [0, 100], [260, 115])}
          cy={interpolate((frame * 2.2) % 100, [0, 100], [145, 270])}
          r="4.5"
          fill="#1273c4"
          opacity={frame > 40 ? 0.75 : 0}
        />
        <circle
          cx="260"
          cy={interpolate((frame * 2.8) % 100, [0, 100], [145, 270])}
          r="4.5"
          fill="#1273c4"
          opacity={frame > 40 ? 0.75 : 0}
        />
        <circle
          cx={interpolate((frame * 2.5) % 100, [0, 100], [260, 405])}
          cy={interpolate((frame * 2.5) % 100, [0, 100], [145, 270])}
          r="4.5"
          fill="#1273c4"
          opacity={frame > 40 ? 0.75 : 0}
        />
      </svg>

      {/* 실시간 날아가는 파일 1 (업로드) */}
      {file1Opacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: file1X - 16,
            top: file1Y - 18,
            width: 32,
            height: 38,
            backgroundColor: "#ffffff",
            border: "3px solid #101113",
            borderRadius: 6,
            opacity: file1Opacity,
            boxShadow: "0 6px 14px rgba(18, 115, 196, 0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            zIndex: 20,
          }}
        >
          <div style={{ width: 16, height: 3, backgroundColor: "#1273c4", borderRadius: 2 }} />
          <div style={{ width: 12, height: 3, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
        </div>
      )}

      {/* 실시간 날아가는 파일 2 & 3 (동기화 배포) */}
      {syncOpacity > 0 && (
        <>
          <div
            style={{
              position: "absolute",
              left: file2X - 14,
              top: file2Y - 16,
              width: 28,
              height: 34,
              backgroundColor: "#ffffff",
              border: "3px solid #101113",
              borderRadius: 6,
              opacity: syncOpacity,
              boxShadow: "0 6px 12px rgba(18, 115, 196, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              zIndex: 20,
            }}
          >
            <div style={{ width: 14, height: 2.5, backgroundColor: "#1273c4", borderRadius: 2 }} />
            <div style={{ width: 10, height: 2.5, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
          </div>
          <div
            style={{
              position: "absolute",
              left: file3X - 14,
              top: file3Y - 16,
              width: 28,
              height: 34,
              backgroundColor: "#ffffff",
              border: "3px solid #101113",
              borderRadius: 6,
              opacity: syncOpacity,
              boxShadow: "0 6px 12px rgba(18, 115, 196, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              zIndex: 20,
            }}
          >
            <div style={{ width: 14, height: 2.5, backgroundColor: "#1273c4", borderRadius: 2 }} />
            <div style={{ width: 10, height: 2.5, backgroundColor: "#d5d2cc", borderRadius: 2 }} />
          </div>
        </>
      )}

      {/* ── 상단 클라우드 & 저장소 허브 ── */}
      <div
        style={{
          position: "absolute",
          top: 22,
          left: 140,
          width: 240,
          height: 140,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(${floatY}px) scale(${introProgress * repoFocusScale})`,
          transformOrigin: "center center",
          opacity: topOpacity,
          zIndex: 10,
        }}
      >
        {/* 구름 형태의 배경 심볼 */}
        <div
          style={{
            position: "absolute",
            width: 220,
            height: 110,
            top: 10,
            borderRadius: "44px",
            backgroundColor: "#ffffff",
            border: "3.5px solid #d5d2cc",
            boxShadow: "0 8px 24px rgba(16, 17, 19, 0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 90,
            height: 90,
            top: -16,
            left: 55,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            borderTop: "3.5px solid #d5d2cc",
            borderLeft: "3.5px solid #d5d2cc",
          }}
        />

        {/* 최상단 플랫폼 배지 (GitHub) */}
        {cloudLabel && (
          <div
            style={{
              position: "relative",
              zIndex: 3,
              marginTop: -2,
              padding: "4px 14px",
              backgroundColor: "#101113",
              color: "#ffffff",
              borderRadius: 16,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "-0.2px",
              boxShadow: "0 4px 10px rgba(16, 17, 19, 0.15)",
            }}
          >
            {cloudLabel}
          </div>
        )}

        {/* 중앙 노란색 폴더 (공유폴더 / 저장소) */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            marginTop: 10,
            width: 108,
            height: 74,
            transform: `scale(${pulseScale})`,
          }}
        >
          {/* 폴더 뒤판 탭 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 6,
              width: 38,
              height: 16,
              backgroundColor: "#d49b22",
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              border: "3px solid #101113",
              borderBottom: "none",
            }}
          />
          {/* 살짝 드러난 문서 종이 */}
          <div
            style={{
              position: "absolute",
              top: 6,
              left: 20,
              width: 68,
              height: 30,
              backgroundColor: "#ffffff",
              borderRadius: 4,
              border: "2px solid #d5d2cc",
            }}
          />
          {/* 폴더 앞판 바디 */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 0,
              width: 108,
              height: 62,
              backgroundColor: "#e8b338",
              borderRadius: 12,
              border: "3.5px solid #101113",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 6px",
              boxSizing: "border-box",
            }}
          >
            {/* 저장소 / 공유폴더 배지 라벨 */}
            {(repoLabel || folderLabel) && (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "2px solid #1273c4",
                  borderRadius: 8,
                  padding: "2px 8px",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#1273c4",
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.3px",
                }}
              >
                {frame >= 220 && repoLabel ? repoLabel : folderLabel || repoLabel}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 하단 클라이언트 장치들 (다른 컴퓨터 / 여럿이 함께) ── */}
      <div
        style={{
          position: "absolute",
          top: 255,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          padding: "0 50px",
          boxSizing: "border-box",
          transform: `scale(${bottomFocusScale})`,
          transformOrigin: "center bottom",
          opacity: bottomOpacity,
          zIndex: 5,
        }}
      >
        {/* 장치 1 (좌측) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateY(${Math.sin((frame + 20) * 0.05) * 3}px)`,
          }}
        >
          <div
            style={{
              width: 82,
              height: 54,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              border: "3px solid #101113",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 32,
                height: 22,
                backgroundColor: frame > 340 ? "#e8f2fb" : "#f0efec",
                border: "2px solid #1273c4",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 14, height: 3, backgroundColor: "#1273c4", borderRadius: 2 }} />
            </div>
          </div>
          <div
            style={{
              width: 42,
              height: 7,
              backgroundColor: "#101113",
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          />
          {otherComputerLabel && (
            <span
              style={{
                marginTop: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "#43474b",
                fontFamily: "'Spoqa Han Sans Neo', sans-serif",
              }}
            >
              {otherComputerLabel}
            </span>
          )}
        </div>

        {/* 장치 2 (중앙) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateY(${Math.sin((frame + 40) * 0.05) * 3}px)`,
          }}
        >
          <div
            style={{
              width: 82,
              height: 54,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              border: "3px solid #101113",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 32,
                height: 22,
                backgroundColor: frame > 390 ? "#e8f2fb" : "#f0efec",
                border: frame > 390 ? "2px solid #1273c4" : "2px solid #d5d2cc",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 3,
                  backgroundColor: frame > 390 ? "#1273c4" : "#7c8288",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
          <div
            style={{
              width: 42,
              height: 7,
              backgroundColor: "#101113",
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          />
          {togetherLabel && (
            <div
              style={{
                marginTop: 6,
                padding: "2px 8px",
                backgroundColor: "#e8f2fb",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 700,
                color: "#1273c4",
              }}
            >
              {togetherLabel}
            </div>
          )}
        </div>

        {/* 장치 3 (우측) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateY(${Math.sin((frame + 60) * 0.05) * 3}px)`,
          }}
        >
          <div
            style={{
              width: 82,
              height: 54,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              border: "3px solid #101113",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 32,
                height: 22,
                backgroundColor: frame > 410 ? "#e8f2fb" : "#f0efec",
                border: frame > 410 ? "2px solid #1273c4" : "2px solid #d5d2cc",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 3,
                  backgroundColor: frame > 410 ? "#1273c4" : "#7c8288",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
          <div
            style={{
              width: 42,
              height: 7,
              backgroundColor: "#101113",
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          />
          {otherComputerLabel && (
            <span
              style={{
                marginTop: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "#43474b",
                fontFamily: "'Spoqa Han Sans Neo', sans-serif",
              }}
            >
              {otherComputerLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
