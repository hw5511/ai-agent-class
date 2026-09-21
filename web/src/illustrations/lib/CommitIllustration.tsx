// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  badge?: string;
  action?: string;
  label?: string;
  caption?: string;
}

export const CommitIllustration: React.FC<Props> = ({
  delay = 0,
  budget,
  badge = "",
  action = "",
  label = "",
  caption = "",
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - delay);

  // 1. 초기 등장 모션 (0~30f) — 첫 움직임 45f 이내 보장
  const enterProgress = interpolate(relFrame, [0, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const enterOpacity = interpolate(relFrame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 지속적 미세 부유 생명력 (쉬지 않는 모션)
  const floatY = Math.sin(relFrame * 0.07) * 3;

  // 2. 문서 내 텍스트 라인 작성 모션 (20~55f)
  const lineWriteProgress = interpolate(relFrame, [20, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  // 3. '저장' 버튼 꾹 누름 모션 (55~85f)
  const pressScale = interpolate(
    relFrame,
    [55, 66, 74, 85],
    [1, 1.14, 0.92, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.ease,
    }
  );

  // 저장 시 파동 링 확산 (66~95f)
  const rippleRadius = interpolate(relFrame, [66, 92], [0, 36], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const rippleOpacity = interpolate(relFrame, [66, 75, 92], [0, 0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. 스냅샷 노드가 문서에서 기록 레일로 이동/안착 (72~110f)
  const snapMove = interpolate(relFrame, [72, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.3, 1),
  });
  const snapScale = interpolate(
    relFrame,
    [72, 86, 105],
    [0.4, 1.22, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.ease,
    }
  );

  // 5. '커밋' 파란 배지 강조 팝업 (95~125f)
  const badgePop = interpolate(
    relFrame,
    [95, 110, 122],
    [0, 1.15, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.6)),
    }
  );

  // 6. 하단 캡션 카드 페이드/슬라이드인 (110~135f)
  const captionY = interpolate(relFrame, [110, 132], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const captionOpacity = interpolate(relFrame, [110, 128], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 기록 노드 펄스 (105f 이후 지속)
  const pulseScale =
    relFrame > 105 ? 1 + Math.sin((relFrame - 105) * 0.12) * 0.05 : 1;

  return (
    <div
      style={{
        width: 480,
        height: 360,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f0efec",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 24px",
      }}
    >
      {/* 상단: 환경 라벨 ('내 컴퓨터 안에') */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          opacity: enterOpacity,
          transform: `translateY(${floatY * 0.5}px)`,
        }}
      >
        {label ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#ffffff",
              border: "3px solid #d5d2cc",
              borderRadius: 14,
              padding: "6px 14px",
              boxShadow: "0 2px 6px rgba(16, 17, 19, 0.04)",
            }}
          >
            {/* 컴퓨터 모니터 벡터 도식 */}
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <rect
                x={2}
                y={3}
                width={20}
                height={13}
                rx={3}
                stroke="#43474b"
                strokeWidth={3}
              />
              <path
                d="M8 20H16M12 16V20"
                stroke="#43474b"
                strokeWidth={3}
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#43474b",
                letterSpacing: "-0.01em",
              }}
            >
              {label}
            </span>
          </div>
        ) : null}
      </div>

      {/* 중앙 메인 스테이지: 문서 작업 -> 저장 스탬프 -> 기록 레일 */}
      <div
        style={{
          width: "100%",
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px",
          transform: `scale(${enterProgress}) translateY(${floatY}px)`,
          opacity: enterOpacity,
        }}
      >
        {/* 좌측: 작업 중인 문서 (Document Card) */}
        <div
          style={{
            width: 154,
            height: 188,
            backgroundColor: "#ffffff",
            border: "3.5px solid #101113",
            borderRadius: 18,
            position: "relative",
            boxSizing: "border-box",
            padding: "16px 14px",
            boxShadow: "0 8px 20px rgba(16, 17, 19, 0.06)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* 접힌 귀퉁이 (Folded Corner 벡터) */}
          <div
            style={{
              position: "absolute",
              top: -3.5,
              right: -3.5,
              width: 28,
              height: 28,
              backgroundColor: "#f0efec",
              borderBottom: "3.5px solid #101113",
              borderLeft: "3.5px solid #101113",
              borderTopRightRadius: 18,
              borderBottomLeftRadius: 8,
            }}
          />

          {/* 기존 텍스트 줄 1, 2 */}
          <div
            style={{
              width: "55%",
              height: 7,
              backgroundColor: "#101113",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: "75%",
              height: 6,
              backgroundColor: "#d5d2cc",
              borderRadius: 3,
            }}
          />

          {/* 실시간으로 채워지는 새 텍스트 줄 3 (프리즘 블루) */}
          <div
            style={{
              width: `${lineWriteProgress * 78}%`,
              height: 6,
              backgroundColor: "#1273c4",
              borderRadius: 3,
              transition: "width 0.05s linear",
            }}
          />

          {/* '저장' 인터랙션 스탬프/버튼 */}
          <div
            style={{
              marginTop: "auto",
              position: "relative",
              alignSelf: "center",
            }}
          >
            {/* 저장 파동 링 */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: rippleRadius * 2,
                height: rippleRadius * 2,
                borderRadius: "50%",
                border: "3px solid #1273c4",
                transform: "translate(-50%, -50%)",
                opacity: rippleOpacity,
                pointerEvents: "none",
              }}
            />

            {action ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#1273c4",
                  color: "#ffffff",
                  borderRadius: 12,
                  padding: "7px 14px",
                  transform: `scale(${pressScale})`,
                  boxShadow: "0 4px 12px rgba(18, 115, 196, 0.3)",
                }}
              >
                {/* 디스크 저장 벡터 아이콘 */}
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                    stroke="#ffffff"
                    strokeWidth={2.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="17 21 17 13 7 13 7 21"
                    stroke="#ffffff"
                    strokeWidth={2.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="7 3 7 8 15 8"
                    stroke="#ffffff"
                    strokeWidth={2.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: "Pretendard, -apple-system, sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {action}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* 중앙 연결: 전송 호선 & 이동하는 스냅샷 노드 */}
        <div
          style={{
            flex: 1,
            height: 80,
            position: "relative",
            margin: "0 10px",
          }}
        >
          {/* 부드러운 연결 호선 점선 */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 60"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 10 30 C 45 10, 55 50, 90 30"
              stroke="#d5d2cc"
              strokeWidth={3}
              strokeDasharray="5 5"
            />
          </svg>

          {/* 문서에서 타임라인으로 '찰칵' 날아가는 스냅샷 노드 */}
          {relFrame >= 72 ? (
            <div
              style={{
                position: "absolute",
                left: `${10 + snapMove * 78}%`,
                top: `${30 + Math.sin(snapMove * Math.PI) * -22}px`,
                transform: `translate(-50%, -50%) scale(${snapScale})`,
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#1273c4",
                border: "3px solid #ffffff",
                boxShadow: "0 4px 10px rgba(18, 115, 196, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>
          ) : null}
        </div>

        {/* 우측: 로컬 저장소 타임라인 레일 (기록 체인) */}
        <div
          style={{
            width: 148,
            height: 188,
            backgroundColor: "#ffffff",
            border: "3.5px solid #d5d2cc",
            borderRadius: 18,
            boxSizing: "border-box",
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* 수직 타임라인 레일 선 */}
          <div
            style={{
              position: "absolute",
              top: 24,
              bottom: 24,
              width: 3.5,
              backgroundColor: "#d5d2cc",
              borderRadius: 2,
            }}
          />

          {/* 이전 커밋 노드 (v1) */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "3.5px solid #7c8288",
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#7c8288",
              }}
            />
          </div>

          {/* 방금 기록된 현재 커밋 노드 (v2, 지금 상태) */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              marginTop: "auto",
              marginBottom: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#e8f2fb",
                border: "4px solid #1273c4",
                transform: `scale(${pulseScale})`,
                boxShadow: "0 4px 14px rgba(18, 115, 196, 0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#1273c4",
                }}
              />
            </div>

            {/* '커밋' 콕 집는 파란 말풍선 배지 */}
            {badge ? (
              <div
                style={{
                  position: "absolute",
                  bottom: 48,
                  transform: `scale(${badgePop})`,
                  transformOrigin: "bottom center",
                  backgroundColor: "#1273c4",
                  borderRadius: 14,
                  padding: "6px 14px",
                  boxShadow: "0 6px 16px rgba(18, 115, 196, 0.35)",
                  whiteSpace: "nowrap",
                  zIndex: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "Pretendard, -apple-system, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {badge}
                </span>
                {/* 말풍선 꼬리 */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -5,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "6px solid #1273c4",
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* 하단: 상태 보존 캡션 ('기록해두는 거죠') */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: captionOpacity,
          transform: `translateY(${captionY}px)`,
        }}
      >
        {caption ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#ffffff",
              border: "3px solid #d5d2cc",
              borderRadius: 16,
              padding: "7px 18px",
              boxShadow: "0 2px 8px rgba(16, 17, 19, 0.04)",
            }}
          >
            {/* 체크 벡터 아이콘 */}
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <circle cx={12} cy={12} r={10} stroke="#1273c4" strokeWidth={3} />
              <path
                d="M7.5 12L10.5 15L16.5 9"
                stroke="#1273c4"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "'Spoqa Han Sans Neo', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#101113",
                letterSpacing: "-0.01em",
              }}
            >
              {caption}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
