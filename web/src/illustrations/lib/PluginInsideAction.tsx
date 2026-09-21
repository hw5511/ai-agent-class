// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const canvas = { w: 540, h: 380 };

interface Props {
  delay?: number;
  budget: number;
  hookTitle?: string;
  hookDesc?: string;
  hookAction?: string;
  mcpTitle?: string;
  mcpAction?: string;
}

export const PluginInsideAction: React.FC<Props> = ({
  delay = 0,
  budget = 900,
  hookTitle = '',
  hookDesc = '',
  hookAction = '',
  mcpTitle = '',
  mcpAction = '',
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);

  // 1. 초기 등장 (첫 35프레임 내 완결)
  const introProgress = interpolate(t, [0, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const introScale = interpolate(t, [0, 32], [0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });

  // 2. 멈추지 않는 유기적 호흡 모션
  const idleY = Math.sin(t * 0.05) * 3;
  const idleBreath = 1 + Math.sin(t * 0.07) * 0.012;

  // 3. 내부 훅 & MCP 모듈 개방/분기 (200~240f)
  const branchOpen = interpolate(t, [200, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 4. "훅" 포커스 팝 (365~505f)
  const hookScale = interpolate(
    t,
    [365, 395, 475, 505],
    [1, 1.12, 1.12, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) }
  );
  const hookOpacity = interpolate(
    t,
    [495, 515, 565, 585],
    [1, 0.74, 0.74, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 5. "MCP" 포커스 팝 (495~590f)
  const mcpScale = interpolate(
    t,
    [495, 515, 565, 590],
    [1, 1.12, 1.12, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) }
  );
  const mcpOpacity = interpolate(
    t,
    [365, 395, 475, 505],
    [1, 0.74, 0.74, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 기어 및 스크립트 실행 루프 회전
  const hookSpeed = interpolate(t, [365, 400, 475, 510], [1, 2.4, 2.4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const gearRotation = (t * 1.5 * hookSpeed) % 360;

  // 외부 통신 안테나 파동 펄스
  const wave1 = (t * 0.04) % 1;
  const wave2 = (t * 0.04 + 0.5) % 1;

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Pretendard, -apple-system, sans-serif',
        transform: `translateY(${idleY}px) scale(${introScale * idleBreath})`,
        opacity: introProgress,
      }}
    >
      {/* 상단: 플러그인 컨테이너 모듈 헤더 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#ffffff',
          border: '3px solid #d5d2cc',
          borderRadius: 16,
          padding: '8px 18px',
          boxShadow: '0 4px 12px rgba(16, 17, 19, 0.04)',
          zIndex: 3,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="8" width="20" height="16" rx="5" stroke="#1273c4" strokeWidth="2.8" fill="#e8f2fb" />
          <path d="M9 8V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V8" stroke="#1273c4" strokeWidth="2.8" />
          <circle cx="14" cy="16" r="3" fill="#1273c4" />
        </svg>
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1273c4' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d5d2cc' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d5d2cc' }} />
        </div>
      </div>

      {/* 중앙 분기 연결선 */}
      <svg
        width="460"
        height="50"
        viewBox="0 0 460 50"
        fill="none"
        style={{ marginTop: -4, marginBottom: -4, zIndex: 1 }}
      >
        <path
          d="M 230 0 L 230 24 Q 230 40 190 40 L 120 40"
          stroke="#d5d2cc"
          strokeWidth="3"
          strokeDasharray={branchOpen < 1 ? '6 6' : 'none'}
        />
        <path
          d="M 230 0 L 230 24 Q 230 40 270 40 L 340 40"
          stroke="#d5d2cc"
          strokeWidth="3"
          strokeDasharray={branchOpen < 1 ? '6 6' : 'none'}
        />
        <circle cx="230" cy="24" r="4" fill="#1273c4" />
        <circle cx="120" cy="40" r="4" fill="#101113" />
        <circle cx="340" cy="40" r="4" fill="#101113" />
      </svg>

      {/* 하단 좌우 모듈 영역: [훅: 로컬 스크립트 실행] vs [MCP: 바깥 통신] */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 480,
          gap: 20,
          zIndex: 2,
        }}
      >
        {/* 좌측: 훅 카드 */}
        <div
          style={{
            flex: 1,
            background: '#ffffff',
            border: '3px solid #d5d2cc',
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${hookScale})`,
            opacity: hookOpacity,
            boxShadow: '0 6px 16px rgba(16, 17, 19, 0.04)',
          }}
        >
          {hookTitle && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#e8f2fb',
                border: '2px solid #1273c4',
                borderRadius: 8,
                padding: '3px 10px',
                fontSize: 14,
                fontWeight: 700,
                color: '#1273c4',
                marginBottom: 12,
              }}
            >
              {hookTitle}
            </div>
          )}

          {/* 로컬 컴퓨터 및 스크립트 실행 루프 */}
          <div
            style={{
              width: 130,
              height: 90,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <svg width="86" height="74" viewBox="0 0 86 74" fill="none">
              <rect x="4" y="4" width="78" height="50" rx="8" stroke="#101113" strokeWidth="3" fill="#f0efec" />
              <line x1="43" y1="54" x2="43" y2="66" stroke="#101113" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="28" y1="66" x2="58" y2="66" stroke="#101113" strokeWidth="3.5" strokeLinecap="round" />
            </svg>

            <div
              style={{
                position: 'absolute',
                top: 14,
                width: 32,
                height: 32,
                transform: `rotate(${gearRotation}deg)`,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="10" stroke="#1273c4" strokeWidth="3" strokeDasharray="5 3" />
                <circle cx="16" cy="16" r="4" fill="#1273c4" />
              </svg>
            </div>
          </div>

          {hookDesc && (
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#43474b',
                fontFamily: 'Spoqa Han Sans Neo, sans-serif',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              {hookDesc}
            </div>
          )}
          {hookAction && (
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#101113',
                fontFamily: 'Pretendard, -apple-system, sans-serif',
                textAlign: 'center',
                marginTop: 2,
              }}
            >
              {hookAction}
            </div>
          )}
        </div>

        {/* 우측: MCP 카드 */}
        <div
          style={{
            flex: 1,
            background: '#ffffff',
            border: '3px solid #d5d2cc',
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${mcpScale})`,
            opacity: mcpOpacity,
            boxShadow: '0 6px 16px rgba(16, 17, 19, 0.04)',
          }}
        >
          {mcpTitle && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#e8f2fb',
                border: '2px solid #1273c4',
                borderRadius: 8,
                padding: '3px 10px',
                fontSize: 14,
                fontWeight: 700,
                color: '#1273c4',
                marginBottom: 12,
              }}
            >
              {mcpTitle}
            </div>
          )}

          {/* 안테나 노드 및 바깥 통신 파동 */}
          <div
            style={{
              width: 130,
              height: 90,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 54 + wave1 * 46,
                height: 54 + wave1 * 46,
                borderRadius: '50%',
                border: '2.5px solid #1273c4',
                opacity: (1 - wave1) * 0.72,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 54 + wave2 * 46,
                height: 54 + wave2 * 46,
                borderRadius: '50%',
                border: '2.5px solid #1273c4',
                opacity: (1 - wave2) * 0.72,
                pointerEvents: 'none',
              }}
            />

            <svg width="74" height="74" viewBox="0 0 74 74" fill="none">
              <circle cx="37" cy="37" r="14" fill="#f0efec" stroke="#101113" strokeWidth="3" />
              <circle cx="37" cy="37" r="6" fill="#1273c4" />
              <line x1="37" y1="23" x2="37" y2="9" stroke="#101113" strokeWidth="3" strokeLinecap="round" />
              <line x1="27" y1="47" x2="16" y2="58" stroke="#101113" strokeWidth="3" strokeLinecap="round" />
              <line x1="47" y1="47" x2="58" y2="58" stroke="#101113" strokeWidth="3" strokeLinecap="round" />
              <circle cx="37" cy="7" r="3" fill="#1273c4" />
              <circle cx="14" cy="60" r="3" fill="#101113" />
              <circle cx="60" cy="60" r="3" fill="#101113" />
            </svg>
          </div>

          {mcpAction && (
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#101113',
                fontFamily: 'Pretendard, -apple-system, sans-serif',
                textAlign: 'center',
                marginTop: 20,
              }}
            >
              {mcpAction}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
