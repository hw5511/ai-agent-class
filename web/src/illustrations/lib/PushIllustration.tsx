// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 480, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  badge?: string;
  target?: string;
  action?: string;
  caption?: string;
}

export const PushIllustration: React.FC<Props> = ({
  delay = 0,
  budget,
  badge = "",
  target = "",
  action = "",
  caption = "",
}) => {
  const frame = useCurrentFrame();
  const relFrame = Math.max(0, frame - delay);

  // 1. 초기 등장 모션 (0~30f) — 첫 움직임 45f 이내 충족
  const enterScale = interpolate(relFrame, [0, 28], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const enterOpacity = interpolate(relFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 지속적 미세 부유 생명력
  const floatY = Math.sin(relFrame * 0.06) * 3.5;
  const peerFloatY = Math.cos(relFrame * 0.06) * 2.5;

  // 2. 하단 저장 노드에서 에너지를 모으는 펄스 (25~55f)
  const chargePulse =
    relFrame < 55 ? 1 + Math.sin(relFrame * 0.2) * 0.08 : 1;

  // 3. 커밋 패킷 수직 상승 추진 (50~88f)
  const uploadProgress = interpolate(relFrame, [50, 84], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });
  const trailOpacity = interpolate(
    relFrame,
    [50, 65, 84, 95],
    [0, 0.85, 0.85, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 4. 상단 '공유폴더' 안착 바운스 (82~115f)
  const folderBounce = interpolate(
    relFrame,
    [82, 92, 104, 115],
    [1, 1.14, 0.96, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.ease,
    }
  );

  // 5. '푸시' 배지 팝업 (60~90f)
  const badgeScale = interpolate(
    relFrame,
    [60, 74, 86],
    [0, 1.18, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.5)),
    }
  );

  // 6. 동료 사용자 연결선 및 활성화 (95~135f)
  const peerConnectProgress = interpolate(relFrame, [95, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const peerHighlight = interpolate(relFrame, [110, 130], [0.74, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 7. 하단 캡션 카드 애니메이션 (120~145f)
  const captionY = interpolate(relFrame, [120, 142], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const captionOpacity = interpolate(relFrame, [120, 138], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
        padding: "16px 20px",
      }}
    >
      {/* 상단: 공유폴더 & 다른 사람들(협업자들) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          opacity: enterOpacity,
          transform: `scale(${enterScale}) translateY(${floatY}px)`,
        }}
      >
        {/* 좌측 협업자 아바타 */}
        <div
          style={{
            position: "absolute",
            left: 28,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: peerHighlight,
            transform: `translateY(${peerFloatY}px)`,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "3px solid #d5d2cc",
              boxShadow: "0 4px 10px rgba(16, 17, 19, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 사람 실루엣 벡터 */}
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
              <circle cx={12} cy={8} r={4} stroke="#43474b" strokeWidth={2.8} />
              <path
                d="M4 20C4 16.5 7.5 14 12 14C16.5 14 20 16.5 20 20"
                stroke="#43474b"
                strokeWidth={2.8}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 좌측 연결 점선 케이블 */}
        <svg
          style={{
            position: "absolute",
            left: 78,
            width: 74,
            height: 24,
          }}
        >
          <line
            x1={4}
            y1={12}
            x2={70}
            y2={12}
            stroke="#1273c4"
            strokeWidth={3}
            strokeDasharray="4 4"
            opacity={peerConnectProgress}
          />
        </svg>

        {/* 중앙: 공유폴더 아이콘 & 라벨 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${folderBounce})`,
            zIndex: 4,
          }}
        >
          <div
            style={{
              width: 140,
              height: 74,
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 폴더 탭 (고유색 노랑 #f5c842) */}
            <div
              style={{
                width: 52,
                height: 14,
                backgroundColor: "#f5c842",
                borderTop: "3.5px solid #101113",
                borderLeft: "3.5px solid #101113",
                borderRight: "3.5px solid #101113",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                boxSizing: "border-box",
              }}
            />
            {/* 폴더 몸체 */}
            <div
              style={{
                width: "100%",
                height: 60,
                backgroundColor: "#ffffff",
                border: "3.5px solid #101113",
                borderRadius: "0 14px 14px 14px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                boxShadow: "0 6px 16px rgba(16, 17, 19, 0.08)",
                padding: "0 10px",
              }}
            >
              {/* 클라우드/공유 벡터 아이콘 */}
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
                  stroke="#1273c4"
                  strokeWidth={2.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {target ? (
                <span
                  style={{
                    fontFamily: "Pretendard, -apple-system, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#101113",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {target}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* 우측 연결 점선 케이블 */}
        <svg
          style={{
            position: "absolute",
            right: 78,
            width: 74,
            height: 24,
          }}
        >
          <line
            x1={4}
            y1={12}
            x2={70}
            y2={12}
            stroke="#1273c4"
            strokeWidth={3}
            strokeDasharray="4 4"
            opacity={peerConnectProgress}
          />
        </svg>

        {/* 우측 협업자 아바타 */}
        <div
          style={{
            position: "absolute",
            right: 28,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: peerHighlight,
            transform: `translateY(${-peerFloatY}px)`,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "3px solid #d5d2cc",
              boxShadow: "0 4px 10px rgba(16, 17, 19, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
              <circle cx={12} cy={8} r={4} stroke="#43474b" strokeWidth={2.8} />
              <path
                d="M4 20C4 16.5 7.5 14 12 14C16.5 14 20 16.5 20 20"
                stroke="#43474b"
                strokeWidth={2.8}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 중앙: 업로드 추진 통로 & '푸시' 배지 */}
      <div
        style={{
          width: "100%",
          height: 104,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 중앙 수직 상승 빔 궤적 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 4,
            backgroundColor: "#d5d2cc",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: `${(1 - uploadProgress) * 70}px`,
            bottom: 12,
            width: 5,
            backgroundColor: "#1273c4",
            borderRadius: 3,
            opacity: trailOpacity,
          }}
        />

        {/* 위로 솟구치는 업로드 화살표 벡터 */}
        <svg
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: "absolute",
            top: `${80 - uploadProgress * 76}px`,
            zIndex: 5,
          }}
        >
          <path
            d="M12 19V5M5 12L12 5L19 12"
            stroke="#1273c4"
            strokeWidth={3.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* 위로 쏘아 올려지는 커밋 팩 노드 */}
        <div
          style={{
            position: "absolute",
            top: `${78 - uploadProgress * 74}px`,
            width: 32,
            height: 32,
            borderRadius: 10,
            backgroundColor: "#1273c4",
            border: "3px solid #ffffff",
            boxShadow: "0 4px 12px rgba(18, 115, 196, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 6,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 3,
              backgroundColor: "#ffffff",
            }}
          />
        </div>

        {/* '푸시' 콕 집는 파란 말풍선 배지 (상승 빔 우측에 위치) */}
        {badge ? (
          <div
            style={{
              position: "absolute",
              right: 96,
              top: "50%",
              transform: `translateY(-50%) scale(${badgeScale})`,
              transformOrigin: "left center",
              backgroundColor: "#1273c4",
              borderRadius: 14,
              padding: "6px 15px",
              boxShadow: "0 6px 16px rgba(18, 115, 196, 0.35)",
              whiteSpace: "nowrap",
              zIndex: 10,
            }}
          >
            {/* 좌측 말풍선 꼬리 */}
            <div
              style={{
                position: "absolute",
                left: -6,
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderRight: "6px solid #1273c4",
              }}
            />
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
          </div>
        ) : null}
      </div>

      {/* 하단: 내 컴퓨터 로컬 보관소 ('올려서 다른 사람도') */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          opacity: enterOpacity,
        }}
      >
        {/* 하단 로컬 커밋 보관함 데스크 */}
        <div
          style={{
            width: 260,
            height: 48,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            borderRadius: 16,
            boxSizing: "border-box",
            padding: "0 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 12px rgba(16, 17, 19, 0.04)",
          }}
        >
          {/* 보관 중인 커밋 팩들 */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                backgroundColor: "#f0efec",
                border: "2.5px solid #7c8288",
              }}
            />
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                backgroundColor: "#f0efec",
                border: "2.5px solid #7c8288",
              }}
            />
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                backgroundColor: "#e8f2fb",
                border: "3px solid #1273c4",
                transform: `scale(${chargePulse})`,
              }}
            />
          </div>

          {action ? (
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#1273c4",
                letterSpacing: "-0.01em",
              }}
            >
              {action}
            </span>
          ) : null}
        </div>

        {/* 최하단 캡션: '보게 하는 거거든요' */}
        <div
          style={{
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
                borderRadius: 14,
                padding: "6px 16px",
                boxShadow: "0 2px 6px rgba(16, 17, 19, 0.03)",
              }}
            >
              {/* 공유 확인 벡터 눈/보기 아이콘 */}
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <path
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                  stroke="#43474b"
                  strokeWidth={2.8}
                />
                <circle cx={12} cy={12} r={3} stroke="#43474b" strokeWidth={2.8} />
              </svg>
              <span
                style={{
                  fontFamily: "'Spoqa Han Sans Neo', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#43474b",
                  letterSpacing: "-0.01em",
                }}
              >
                {caption}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
