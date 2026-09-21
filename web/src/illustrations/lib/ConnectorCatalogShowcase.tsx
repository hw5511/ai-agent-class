// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 560, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  notionLabel?: string;
  calendarLabel?: string;
  moreServicesLabel?: string;
}

export const ConnectorCatalogShowcase: React.FC<Props> = ({
  delay = 0,
  budget = 780,
  notionLabel = "",
  calendarLabel = "",
  moreServicesLabel = "",
}) => {
  const current = useCurrentFrame();
  const frame = Math.max(0, current - delay);

  // 1. 인트로 등장 (0~35 프레임)
  const introProgress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 2. 부유 모션 (쉬지 않는 생명력)
  const floatA = Math.sin(frame * 0.05) * 4;
  const floatB = Math.sin((frame + 25) * 0.05) * 4;
  const floatC = Math.sin((frame + 50) * 0.05) * 4;

  // 3. 노션 설명 구간 하이라이트 (162~280 프레임)
  const notionHighlight = interpolate(
    frame,
    [155, 175, 270, 290],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    }
  );

  // 4. 구글 캘린더 설명 구간 하이라이트 (289~380 프레임)
  const calendarHighlight = interpolate(
    frame,
    [285, 305, 370, 390],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    }
  );

  // 5. 다양한 서비스 설명 구간 펄스 (376~520 프레임)
  const moreHighlight = interpolate(
    frame,
    [375, 395, 500, 520],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    }
  );

  // 6. 최종 "노션 하나로 실습" 포커스 팝 & 센터링 안무 (659~780 프레임)
  const finalFocus = interpolate(frame, [655, 690], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 노션 카드의 위치 이동 (좌측 x: -160에서 중앙 x: 0으로 이동 및 확대)
  const notionX = interpolate(finalFocus, [0, 1], [-160, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const notionScale =
    1 +
    notionHighlight * 0.06 +
    finalFocus * 0.18;

  // 비포커스 요소 물러서기 (규칙: opacity 0.72 이상 유지)
  const bgCardsOpacity = interpolate(finalFocus, [0, 1], [1, 0.74], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const calendarX = interpolate(finalFocus, [0, 1], [0, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const moreX = interpolate(finalFocus, [0, 1], [160, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0efec",
        overflow: "hidden",
        fontFamily: "Pretendard, 'Spoqa Han Sans Neo', sans-serif",
      }}
    >
      {/* 카드 1: 노션 (메모와 표) */}
      <div
        style={{
          position: "absolute",
          width: 140,
          height: 190,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: `3px solid ${
            notionHighlight > 0.5 || finalFocus > 0.5 ? "#1273c4" : "#d5d2cc"
          }`,
          boxShadow:
            notionHighlight > 0.1 || finalFocus > 0.1
              ? "0 8px 24px rgba(18, 115, 196, 0.16)"
              : "0 4px 12px rgba(16, 17, 19, 0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 12px 14px",
          boxSizing: "border-box",
          transform: `translate(${notionX}px, ${
            (1 - introProgress) * 30 + floatA
          }px) scale(${introProgress * notionScale})`,
          opacity: introProgress,
          zIndex: finalFocus > 0.1 ? 20 : 10,
        }}
      >
        {/* 상단 핀 / 배지 표시 */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor:
              notionHighlight > 0.5 || finalFocus > 0.5
                ? "#1273c4"
                : "#d5d2cc",
            alignSelf: "flex-end",
          }}
        />

        {/* 메모와 표 벡터 심볼 */}
        <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
          {/* 문서 시트 */}
          <rect
            x="8"
            y="6"
            width="52"
            height="56"
            rx="8"
            fill={notionHighlight > 0.2 || finalFocus > 0.2 ? "#e8f2fb" : "#ffffff"}
            stroke={notionHighlight > 0.2 || finalFocus > 0.2 ? "#1273c4" : "#101113"}
            strokeWidth="3.5"
          />
          {/* 메모 줄 1 */}
          <path
            d="M18 18H50"
            stroke="#101113"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* 표(Table) 그리드 선 분할 */}
          <path
            d="M18 28H50"
            stroke="#43474b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M18 38H50"
            stroke="#43474b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M34 28V48"
            stroke="#43474b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* 체크 포인트 */}
          <path
            d="M20 48L24 52L30 46"
            stroke="#1273c4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* 라벨 텍스트 */}
        {notionLabel ? (
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color:
                notionHighlight > 0.5 || finalFocus > 0.5
                  ? "#1273c4"
                  : "#101113",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {notionLabel}
          </span>
        ) : null}
      </div>

      {/* 카드 2: 구글 캘린더 (일정 관리) */}
      <div
        style={{
          position: "absolute",
          width: 140,
          height: 190,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: `3px solid ${calendarHighlight > 0.5 ? "#1273c4" : "#d5d2cc"}`,
          boxShadow:
            calendarHighlight > 0.1
              ? "0 8px 24px rgba(18, 115, 196, 0.16)"
              : "0 4px 12px rgba(16, 17, 19, 0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 12px 14px",
          boxSizing: "border-box",
          transform: `translate(${calendarX}px, ${
            (1 - introProgress) * 30 + floatB
          }px) scale(${introProgress * (1 + calendarHighlight * 0.06)})`,
          opacity: introProgress * bgCardsOpacity,
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: calendarHighlight > 0.5 ? "#1273c4" : "#d5d2cc",
            alignSelf: "flex-end",
          }}
        />

        {/* 캘린더 벡터 심볼 */}
        <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
          {/* 달력 외곽 틀 */}
          <rect
            x="8"
            y="12"
            width="52"
            height="48"
            rx="8"
            fill={calendarHighlight > 0.2 ? "#e8f2fb" : "#ffffff"}
            stroke={calendarHighlight > 0.2 ? "#1273c4" : "#101113"}
            strokeWidth="3.5"
          />
          {/* 상단 바인더 고리 */}
          <path
            d="M22 6V14"
            stroke="#101113"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M46 6V14"
            stroke="#101113"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* 구분선 */}
          <path
            d="M8 24H60"
            stroke="#101113"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* 일정 그리드 블록 */}
          <rect x="18" y="32" width="8" height="8" rx="2" fill="#d5d2cc" />
          <rect x="30" y="32" width="8" height="8" rx="2" fill="#d5d2cc" />
          <rect
            x="42"
            y="32"
            width="8"
            height="8"
            rx="2"
            fill={calendarHighlight > 0.2 ? "#1273c4" : "#43474b"}
          />
          <rect
            x="18"
            y="44"
            width="20"
            height="8"
            rx="3"
            fill="#1273c4"
          />
          <rect x="42" y="44" width="8" height="8" rx="2" fill="#d5d2cc" />
        </svg>

        {calendarLabel ? (
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: calendarHighlight > 0.5 ? "#1273c4" : "#101113",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {calendarLabel}
          </span>
        ) : null}
      </div>

      {/* 카드 3: 다양한 서비스 (허브 & 연결망) */}
      <div
        style={{
          position: "absolute",
          width: 140,
          height: 190,
          borderRadius: 16,
          backgroundColor: "#ffffff",
          border: `3px solid ${moreHighlight > 0.5 ? "#1273c4" : "#d5d2cc"}`,
          boxShadow:
            moreHighlight > 0.1
              ? "0 8px 24px rgba(18, 115, 196, 0.16)"
              : "0 4px 12px rgba(16, 17, 19, 0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 12px 14px",
          boxSizing: "border-box",
          transform: `translate(${moreX}px, ${
            (1 - introProgress) * 30 + floatC
          }px) scale(${introProgress * (1 + moreHighlight * 0.06)})`,
          opacity: introProgress * bgCardsOpacity,
          zIndex: 4,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: moreHighlight > 0.5 ? "#1273c4" : "#d5d2cc",
            alignSelf: "flex-end",
          }}
        />

        {/* 다양한 서비스 연결망 벡터 심볼 */}
        <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
          {/* 중앙 허브 노드 */}
          <circle
            cx="34"
            cy="34"
            r="12"
            fill={moreHighlight > 0.2 ? "#e8f2fb" : "#ffffff"}
            stroke={moreHighlight > 0.2 ? "#1273c4" : "#101113"}
            strokeWidth="3.5"
          />
          {/* 주변 위성 노드 3개 */}
          <circle cx="16" cy="18" r="6" fill="#1273c4" />
          <circle cx="52" cy="20" r="6" fill="#43474b" />
          <circle cx="34" cy="54" r="6" fill="#43474b" />
          {/* 연결선 */}
          <path
            d="M21 22L26 27"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M47 24L42 28"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M34 46V48"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* 중앙 플러스 마크 (텍스트가 아닌 벡터 라인) */}
          <path
            d="M34 29V39"
            stroke="#1273c4"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M29 34H39"
            stroke="#1273c4"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {moreServicesLabel ? (
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: moreHighlight > 0.5 ? "#1273c4" : "#101113",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {moreServicesLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};
