// s3-account — basic 3회차 (step03) 파트. 계획서: courses/basic/step03-redesign-plan.md
// 이 파일은 이 파트의 슬라이드만 소유한다. registry.ts 는 이미 등록되어 있으므로 건드리지 않는다.
//
// 슬라이드 1(목차)·8(사용량 개념 도식)은 제대로 디자인한다. 슬라이드 2~7은 claude.ai 실제 웹 화면 캡처가
// 있어야 하는데 아직 없다 — CEO 지시로 지어내지 않고 CapturePendingBox 자리표시자로 둔다(점선 박스 +
// 캡처할 URL/상태 한 줄 + AnnotationColumn 으로 이 슬라이드가 짚을 포인트). 캡처가 들어오면 각 슬라이드의
// CapturePendingBox 를 실제 화면(ShotFrame 류)으로만 교체하면 되도록 자리·포인트를 미리 잡아 둔다.
import React from "react";
import { SlideFrame } from "../SlideFrame";
import { FocusBadge } from "../FocusBadge";
import { AnnotationColumn } from "../AnnotationColumn";
import { COLORS, FONTS, RADIUS } from "../core/tokens";
import { colX, colW, BODY_Y, BODY_H } from "../grid";
import type { SlideEntry, PartSpec } from "./types";

const EYEBROW = "CLAUDE 설정";
const TOTAL = 8;

// ------------------------------------------------------------------------------------------------
// CapturePendingBox — 실제 웹 캡처가 아직 없는 슬라이드의 본문 자리표시자. 점선 테두리 박스 안에
// 카메라 아이콘 + 캡처 대상 URL(모노스페이스 pill) + 캡처할 화면 상태 한 줄을 담는다. 캡처가 들어오면
// 이 박스 하나만 실제 스크린샷(예: s1-claude-login.tsx 의 ShotFrame 패턴)으로 바꿔치기하면 된다.
// ------------------------------------------------------------------------------------------------

const CameraGlyph: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 8.4C3 7.6 3.6 7 4.4 7H8L9.4 5H14.6L16 7H19.6C20.4 7 21 7.6 21 8.4V17.6C21 18.4 20.4 19 19.6 19H4.4C3.6 19 3 18.4 3 17.6Z" stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
    <circle cx="12" cy="13" r="4" stroke={color} strokeWidth={1.7} />
    <circle cx="17.3" cy="9.7" r="0.9" fill={color} />
  </svg>
);

const CapturePendingBox: React.FC<{ x: number; y: number; width: number; height: number; url: string; capture: string }> = ({ x, y, width, height, url, capture }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      boxSizing: "border-box",
      border: `2.5px dashed ${COLORS.line}`,
      borderRadius: RADIUS.outer,
      background: COLORS.paper2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 26,
      padding: "40px 56px",
    }}
  >
    <div style={{ width: 92, height: 92, borderRadius: "50%", background: COLORS.accentWash, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CameraGlyph size={44} color={COLORS.accentDeep} />
    </div>
    <div
      style={{
        fontFamily: FONTS.term,
        fontWeight: 600,
        fontSize: 22,
        color: COLORS.accentDeep,
        background: COLORS.accentWash,
        border: `1px solid ${COLORS.accent}`,
        borderRadius: RADIUS.inner,
        padding: "9px 22px",
        wordBreak: "break-all",
        textAlign: "center",
        maxWidth: "92%",
      }}
    >
      {url}
    </div>
    <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 27, color: COLORS.ink2, textAlign: "center", wordBreak: "keep-all", maxWidth: "88%" }}>{capture}</div>
    <div style={{ fontFamily: FONTS.body, fontWeight: 700, fontSize: 19, color: COLORS.ink3, letterSpacing: "0.14em" }}>CAPTURE PENDING</div>
  </div>
);

// Standard split for the capture-pending slides: 9-col placeholder + 3-col annotation (same split
// s1-claude-login.tsx uses for its real ShotFrame slides — capture will drop into the same slot).
const CAP_X = colX(0);
const CAP_W = colW(9);
const ANNO_X = colX(9);
const ANNO_W = colW(3);

// ------------------------------------------------------------------------------------------------
// 01 · s3_오늘의_흐름 — 3회차 목차 (7파트, 합계 54장). 2회차 wrap/review 계열과 같은 결의 전체 흐름 슬라이드.
// ------------------------------------------------------------------------------------------------

interface TocPart {
  n: number;
  label: string;
  count: number;
}

const PARTS: TocPart[] = [
  { n: 1, label: "CLAUDE 설정", count: 8 },
  { n: 2, label: "SETTINGS.JSON", count: 8 },
  { n: 3, label: "권한 모드", count: 12 },
  { n: 4, label: "/CONFIG", count: 6 },
  { n: 5, label: "/MODEL", count: 2 },
  { n: 6, label: "웹서치 툴", count: 4 },
  { n: 7, label: "CLAUDE IN CHROME", count: 14 },
];
const TOTAL_SLIDES = 54;

const Slide01: React.FC = () => {
  const x = colX(0);
  const w = colW(12);
  const rowGap = 12;
  const footerGap = 22;
  const footerH = 110;
  const rowH = (BODY_H - footerGap - footerH - rowGap * (PARTS.length - 1)) / PARTS.length;
  const footerY = BODY_Y + PARTS.length * rowH + (PARTS.length - 1) * rowGap + footerGap;

  return (
    <SlideFrame index={1} total={TOTAL} eyebrow={EYEBROW} title="Claude 설정과 권한">
      {PARTS.map((p, i) => {
        const y = BODY_Y + i * (rowH + rowGap);
        const current = i === 0;
        return (
          <div
            key={p.n}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: w,
              height: rowH,
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              gap: 28,
              padding: "0 36px",
              background: current ? COLORS.accentWash : COLORS.paper2,
              border: `1.5px solid ${current ? COLORS.accent : COLORS.line}`,
              borderRadius: RADIUS.base,
            }}
          >
            <div
              style={{
                flex: "0 0 auto",
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: current ? COLORS.accent : COLORS.ink3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONTS.display,
                fontWeight: 800,
                fontSize: 26,
                color: COLORS.paper2,
              }}
            >
              {p.n}
            </div>
            <div style={{ flex: "1 1 auto", fontFamily: FONTS.display, fontWeight: 800, fontSize: 36, color: COLORS.ink, letterSpacing: "-0.01em" }}>{p.label}</div>
            {current ? (
              <div
                style={{
                  flex: "0 0 auto",
                  fontFamily: FONTS.body,
                  fontWeight: 700,
                  fontSize: 20,
                  color: COLORS.accentDeep,
                  background: COLORS.paper2,
                  border: `1px solid ${COLORS.accent}`,
                  borderRadius: 999,
                  padding: "7px 20px",
                }}
              >
                지금 여기
              </div>
            ) : null}
            <div style={{ flex: "0 0 auto", fontFamily: FONTS.term, fontWeight: 700, fontSize: 27, color: current ? COLORS.accentDeep : COLORS.ink2, minWidth: 74, textAlign: "right" }}>{p.count}장</div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: x,
          top: footerY,
          width: w,
          height: footerH,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          background: COLORS.ink,
          borderRadius: RADIUS.base,
        }}
      >
        <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 28, color: COLORS.paper2 }}>3회차 전체 구성</span>
        <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 42, color: COLORS.paper2 }}>합계 {TOTAL_SLIDES}장</span>
      </div>
    </SlideFrame>
  );
};

// ------------------------------------------------------------------------------------------------
// 02 · account_설정_진입 — "설정 메뉴 진입"
// TODO-CAPTURE: https://claude.ai/new 우하단 프로필 클릭 → 설정 메뉴 펼친 상태
// ------------------------------------------------------------------------------------------------

const Slide02: React.FC = () => (
  <SlideFrame index={2} total={TOTAL} eyebrow={EYEBROW} title="설정 메뉴 진입">
    <CapturePendingBox
      x={CAP_X}
      y={BODY_Y}
      width={CAP_W}
      height={BODY_H}
      url="claude.ai/new — 우하단 프로필 클릭"
      capture="프로필 클릭 → 설정 메뉴가 펼쳐진 상태"
    />
    <AnnotationColumn
      x={ANNO_X}
      y={BODY_Y}
      width={ANNO_W}
      height={BODY_H}
      items={[
        { number: 1, head: "프로필 아이콘 위치", body: "화면 우하단 계정 아이콘에서 시작한다." },
        { number: 2, head: "펼쳐지는 메뉴 항목", body: "설정 · 로그아웃 등 하위 항목이 나타난다." },
        { number: 3, head: "설정으로 이동", body: "여기서 데이터/청구/사용량 화면으로 각각 들어간다." },
      ]}
    />
  </SlideFrame>
);

// ------------------------------------------------------------------------------------------------
// 03 · account_privacy_화면 — "데이터 및 개인정보 보호"
// TODO-CAPTURE: https://claude.ai/new#settings/data-privacy-controls 전체
// ------------------------------------------------------------------------------------------------

const Slide03: React.FC = () => (
  <SlideFrame index={3} total={TOTAL} eyebrow={EYEBROW} title="데이터 및 개인정보 보호">
    <CapturePendingBox
      x={CAP_X}
      y={BODY_Y}
      width={CAP_W}
      height={BODY_H}
      url="claude.ai/new#settings/data-privacy-controls"
      capture="데이터 및 개인정보 보호 화면 전체"
    />
    <AnnotationColumn
      x={ANNO_X}
      y={BODY_Y}
      width={ANNO_W}
      height={BODY_H}
      items={[
        { number: 1, head: "데이터·개인정보 메뉴", body: "설정 안에서 이 화면으로 들어온다." },
        { number: 2, head: "AI 모델 개선 돕기 토글", body: "다음 슬라이드에서 이 항목을 확대해서 끈다." },
        { number: 3, head: "그 밖의 개인정보 옵션", body: "대화 기록 내보내기 · 삭제 등도 같은 화면에 있다." },
      ]}
    />
  </SlideFrame>
);

// ------------------------------------------------------------------------------------------------
// 04 · account_privacy_off — "AI 모델 개선 돕기 끄기"
// TODO-CAPTURE: 같은 화면(#settings/data-privacy-controls)의 "AI 모델 개선 돕기" 토글 off 상태 확대
// ------------------------------------------------------------------------------------------------

const Slide04: React.FC = () => (
  <SlideFrame index={4} total={TOTAL} eyebrow={EYEBROW} title="AI 모델 개선 돕기 끄기">
    <CapturePendingBox
      x={CAP_X}
      y={BODY_Y}
      width={CAP_W}
      height={BODY_H}
      url="claude.ai/new#settings/data-privacy-controls"
      capture="'AI 모델 개선 돕기' 토글 off 상태 확대"
    />
    <AnnotationColumn
      x={ANNO_X}
      y={BODY_Y}
      width={ANNO_W}
      height={BODY_H}
      items={[
        { number: 1, head: "토글 off 확인", body: "회색으로 꺼져 있어야 한다." },
        { number: 2, head: "이 설정이 하는 일", body: "대화 내용을 모델 학습에 쓰지 않도록 막는다." },
        { number: 3, head: "권장 opt-out", body: "수업에서는 끄고 시작하기를 권한다." },
      ]}
    />
  </SlideFrame>
);

// ------------------------------------------------------------------------------------------------
// 05 · account_billing_화면 — "요금 및 청구"
// TODO-CAPTURE: https://claude.ai/new#settings/billing 전체 (결제수단 마스킹 필요)
// ------------------------------------------------------------------------------------------------

const Slide05: React.FC = () => (
  <SlideFrame index={5} total={TOTAL} eyebrow={EYEBROW} title="요금 및 청구">
    <CapturePendingBox
      x={CAP_X}
      y={BODY_Y}
      width={CAP_W}
      height={BODY_H}
      url="claude.ai/new#settings/billing"
      capture="요금 및 청구 화면 전체 (결제수단 마스킹)"
    />
    <AnnotationColumn
      x={ANNO_X}
      y={BODY_Y}
      width={ANNO_W}
      height={BODY_H}
      items={[
        { number: 1, head: "현재 플랜 확인", body: "지금 쓰고 있는 구독 등급이 표시된다." },
        { number: 2, head: "결제 수단", body: "카드 정보는 뒷자리까지 가려서 보여준다." },
        { number: 3, head: "청구 내역", body: "지난 결제 이력을 여기서 확인한다." },
      ]}
    />
  </SlideFrame>
);

// ------------------------------------------------------------------------------------------------
// 06 · account_billing_인보이스 — "인보이스 다운로드 · 플랜 변경"
// TODO-CAPTURE: 같은 화면(#settings/billing) 인보이스 목록 + 다운로드 버튼 + 플랜 변경 버튼
// ------------------------------------------------------------------------------------------------

const Slide06: React.FC = () => (
  <SlideFrame index={6} total={TOTAL} eyebrow={EYEBROW} title="인보이스 다운로드 · 플랜 변경">
    <CapturePendingBox
      x={CAP_X}
      y={BODY_Y}
      width={CAP_W}
      height={BODY_H}
      url="claude.ai/new#settings/billing"
      capture="인보이스 목록 + 다운로드 버튼 + 플랜 변경 버튼"
    />
    <AnnotationColumn
      x={ANNO_X}
      y={BODY_Y}
      width={ANNO_W}
      height={BODY_H}
      items={[
        { number: 1, head: "인보이스 목록", body: "월별 결제 건이 날짜순으로 나열된다." },
        { number: 2, head: "다운로드 버튼", body: "각 항목 옆 버튼으로 인보이스를 내려받는다." },
        { number: 3, head: "플랜 변경 버튼", body: "구독 등급을 올리거나 내릴 때 여기를 누른다." },
      ]}
    />
  </SlideFrame>
);

// ------------------------------------------------------------------------------------------------
// 07 · account_usage_화면 — "사용량 화면"
// TODO-CAPTURE: https://claude.ai/new#settings/usage 전체
// ------------------------------------------------------------------------------------------------

const Slide07: React.FC = () => (
  <SlideFrame index={7} total={TOTAL} eyebrow={EYEBROW} title="사용량 화면">
    <CapturePendingBox
      x={CAP_X}
      y={BODY_Y}
      width={CAP_W}
      height={BODY_H}
      url="claude.ai/new#settings/usage"
      capture="사용량 화면 전체"
    />
    <AnnotationColumn
      x={ANNO_X}
      y={BODY_Y}
      width={ANNO_W}
      height={BODY_H}
      items={[
        { number: 1, head: "설정에서 진입", body: "프로필 메뉴 → 사용량으로 들어온다." },
        { number: 2, head: "표시되는 지표들", body: "지금까지 쓴 양을 그래프·수치로 보여준다." },
        { number: 3, head: "다음 슬라이드", body: "이 화면 뒤에 숨은 두 가지 한도 개념을 짚는다." },
      ]}
    />
  </SlideFrame>
);

// ------------------------------------------------------------------------------------------------
// 08 · account_usage_개념 — "5시간 창 · 주간 한도" (개념 도식, 실제 캡처 없음 — 지어낸 숫자 없음)
// ------------------------------------------------------------------------------------------------

const LOOP_ID = "s3-account-usage-loop";

const Slide08: React.FC = () => {
  const illoX = colX(0);
  const illoY = BODY_Y;
  const illoW = colW(8);
  const illoH = BODY_H;
  const gap = 36;
  const panelAH = Math.round((illoH - gap) * 0.46);
  const panelBH = illoH - gap - panelAH;
  const panelAY = illoY;
  const panelBY = panelAY + panelAH + gap;

  // Panel A — 5시간 사용 창: 3개 창(과거 2 + 진행 중 1) + 시간이 지나면 초기화되는 반복 루프.
  const padX = 44;
  const padTop = 78;
  const padBottom = 32;
  const trackW = illoW - padX * 2;
  const trackH = panelAH - padTop - padBottom;
  const blockW = trackW * 0.22;
  const blockH = trackH * 0.6;
  const blockGap = (trackW - blockW * 3) / 2;
  const blockY = padTop + (trackH - blockH) / 2;
  const bx = [0, 1, 2].map((i) => padX + i * (blockW + blockGap));

  const loopTopY = padTop - 46;
  const loopStartX = bx[2] + blockW / 2;
  const loopEndX = bx[0] + blockW / 2;

  // Panel B — 주간 한도: 요일 7개 막대 + 한도선. 막대 높이는 개념을 보여주기 위한 상대값(예시)이며
  // 실제 수치가 아니다.
  const bPadX = 44;
  const bPadTop = 74;
  const bPadBottom = 46;
  const bTrackW = illoW - bPadX * 2;
  const bTrackH = panelBH - bPadTop - bPadBottom;
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const heightFracs = [0.16, 0.28, 0.4, 0.52, 0.66, 0.8, 0.96];
  const capFrac = 0.88;
  const slotW = bTrackW / days.length;
  const barW = slotW * 0.46;

  return (
    <SlideFrame index={8} total={TOTAL} eyebrow={EYEBROW} title="5시간 창 · 주간 한도">
      {/* Panel A */}
      <div
        style={{
          position: "absolute",
          left: illoX,
          top: panelAY,
          width: illoW,
          height: panelAH,
          boxSizing: "border-box",
          background: COLORS.paper2,
          border: `1px solid ${COLORS.line}`,
          borderRadius: RADIUS.base,
          boxShadow: "0 14px 30px rgba(16,17,19,0.08)",
        }}
      >
        <div style={{ position: "absolute", left: 36, top: 26, fontFamily: FONTS.term, fontWeight: 700, fontSize: 22, color: COLORS.accentDeep, letterSpacing: "0.04em" }}>5시간 사용 창</div>

        <svg width={illoW} height={panelAH} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <defs>
            <marker id={LOOP_ID} markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
              <path d="M0 0L8 5L0 10Z" fill={COLORS.accentDeep} />
            </marker>
          </defs>
          {/* forward arrows between the 3 windows */}
          {[0, 1].map((i) => {
            const x1 = bx[i] + blockW + 6;
            const x2 = bx[i + 1] - 6;
            const y = blockY + blockH / 2;
            return (
              <g key={i}>
                <line x1={x1} y1={y} x2={x2 - 10} y2={y} stroke={COLORS.ink3} strokeWidth={3} strokeLinecap="round" markerEnd={`url(#${LOOP_ID})`} />
                <text x={(x1 + x2) / 2} y={y - 14} textAnchor="middle" fontFamily={FONTS.body} fontWeight={600} fontSize={17} fill={COLORS.ink3}>
                  5시간 경과
                </text>
              </g>
            );
          })}
          {/* dashed loop-back: window 3 -> window 1, "시간이 지나면 초기화" */}
          <path
            d={`M ${loopStartX} ${blockY} C ${loopStartX} ${loopTopY}, ${loopEndX} ${loopTopY}, ${loopEndX} ${blockY}`}
            fill="none"
            stroke={COLORS.accentDeep}
            strokeWidth={3}
            strokeDasharray="9 8"
            strokeLinecap="round"
            markerEnd={`url(#${LOOP_ID})`}
          />
          <text x={(loopStartX + loopEndX) / 2} y={loopTopY - 12} textAnchor="middle" fontFamily={FONTS.display} fontWeight={700} fontSize={19} fill={COLORS.accentDeep}>
            일정 시간 지나면 초기화 — 반복
          </text>
        </svg>

        {[0, 1].map((i) => (
          <div key={i} style={{ position: "absolute", left: bx[i], top: blockY, width: blockW, height: blockH, boxSizing: "border-box", border: `2px solid ${COLORS.ink3}`, borderRadius: RADIUS.inner, background: COLORS.paper, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 20, color: COLORS.ink2 }}>{i === 0 ? "이전 창" : "그 이전 창"}</span>
            <span style={{ fontFamily: FONTS.body, fontWeight: 500, fontSize: 16, color: COLORS.ink3 }}>이미 초기화됨</span>
          </div>
        ))}
        <div style={{ position: "absolute", left: bx[2], top: blockY, width: blockW, height: blockH, boxSizing: "border-box", border: `2.5px solid ${COLORS.accent}`, borderRadius: RADIUS.inner, background: COLORS.accentWash, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "55%", background: COLORS.accent, opacity: 0.28 }} />
          <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: COLORS.accentDeep }}>지금 이 창</span>
            <span style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 16, color: COLORS.accentDeep }}>진행 중 (예시)</span>
          </div>
        </div>
      </div>

      {/* Panel B */}
      <div
        style={{
          position: "absolute",
          left: illoX,
          top: panelBY,
          width: illoW,
          height: panelBH,
          boxSizing: "border-box",
          background: COLORS.paper2,
          border: `1px solid ${COLORS.line}`,
          borderRadius: RADIUS.base,
          boxShadow: "0 14px 30px rgba(16,17,19,0.08)",
        }}
      >
        <div style={{ position: "absolute", left: 36, top: 24, fontFamily: FONTS.term, fontWeight: 700, fontSize: 22, color: COLORS.accentDeep, letterSpacing: "0.04em" }}>주간 한도</div>
        <div style={{ position: "absolute", right: 36, top: 26, fontFamily: FONTS.body, fontWeight: 600, fontSize: 17, color: COLORS.ink3 }}>그래프 형태는 예시 — 실제 수치 아님</div>

        <svg width={illoW} height={panelBH} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          {/* cap line */}
          <line x1={bPadX - 8} y1={bPadTop + bTrackH * (1 - capFrac)} x2={illoW - bPadX + 8} y2={bPadTop + bTrackH * (1 - capFrac)} stroke={COLORS.ink3} strokeWidth={2.4} strokeDasharray="7 7" />
          <text x={illoW - bPadX + 8} y={bPadTop + bTrackH * (1 - capFrac) - 10} textAnchor="end" fontFamily={FONTS.body} fontWeight={700} fontSize={17} fill={COLORS.ink2}>
            주간 한도선
          </text>

          {heightFracs.map((f, i) => {
            const bh = bTrackH * f;
            const bxi = bPadX + i * slotW + (slotW - barW) / 2;
            const by = bPadTop + bTrackH - bh;
            const overCap = f >= capFrac;
            return (
              <g key={i}>
                <rect x={bxi} y={by} width={barW} height={bh} rx={6} fill={overCap ? COLORS.accentDeep : COLORS.accent} opacity={overCap ? 1 : 0.72} />
                <text x={bxi + barW / 2} y={bPadTop + bTrackH + 30} textAnchor="middle" fontFamily={FONTS.term} fontWeight={600} fontSize={19} fill={COLORS.ink2}>
                  {days[i]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <FocusBadge number={1} x={bx[2] + illoX + blockW - 6} y={blockY + 6} size={30} />
      <FocusBadge number={2} x={illoX + illoW - bPadX} y={panelBY + bPadTop + bTrackH * (1 - capFrac)} size={30} />
      <FocusBadge number={3} x={illoX + bPadX + 6 * slotW + slotW / 2} y={panelBY + bPadTop + bTrackH * (1 - heightFracs[6]) - 20} size={30} />

      <AnnotationColumn
        x={colX(8)}
        y={illoY}
        width={colW(4)}
        height={illoH}
        items={[
          { number: 1, head: "5시간 창", body: "사용을 시작하면 창이 열리고, 일정 시간이 지나면 그 창이 초기화된다." },
          { number: 2, head: "주간 한도", body: "5시간 창과는 별도로, 한 주 동안 쓸 수 있는 총량에도 상한이 있다." },
          { number: 3, head: "둘 중 먼저 걸리는 쪽", body: "5시간 창이 남아 있어도 주간 한도에 먼저 닿으면 거기서 막힌다." },
        ]}
      />
    </SlideFrame>
  );
};

export const S3_ACCOUNT: SlideEntry[] = [
  { index: 1, name: "s3_오늘의_흐름", title: "Claude 설정과 권한", render: () => React.createElement(Slide01) },
  { index: 2, name: "account_설정_진입", title: "설정 메뉴 진입", render: () => React.createElement(Slide02) },
  { index: 3, name: "account_privacy_화면", title: "데이터 및 개인정보 보호", render: () => React.createElement(Slide03) },
  { index: 4, name: "account_privacy_off", title: "AI 모델 개선 돕기 끄기", render: () => React.createElement(Slide04) },
  { index: 5, name: "account_billing_화면", title: "요금 및 청구", render: () => React.createElement(Slide05) },
  { index: 6, name: "account_billing_인보이스", title: "인보이스 다운로드 · 플랜 변경", render: () => React.createElement(Slide06) },
  { index: 7, name: "account_usage_화면", title: "사용량 화면", render: () => React.createElement(Slide07) },
  { index: 8, name: "account_usage_개념", title: "5시간 창 · 주간 한도", render: () => React.createElement(Slide08) },
];

export const S3_ACCOUNT_PART: PartSpec = { id: "s3-account", eyebrow: EYEBROW, entries: S3_ACCOUNT };
