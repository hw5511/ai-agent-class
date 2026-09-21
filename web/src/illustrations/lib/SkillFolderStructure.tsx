// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface SkillFolderStructureProps {
  delay?: number;
  budget: number;
  folderLabel?: string;
  fileLabel?: string;
  highlightText?: string;
  badgeLabel?: string;
}

export const canvas = { w: 480, h: 360 };

export const SkillFolderStructure: React.FC<SkillFolderStructureProps> = ({
  delay = 0,
  budget,
  folderLabel = '',
  fileLabel = '',
  highlightText = '',
  badgeLabel = '',
}) => {
  const currentFrame = useCurrentFrame();
  const f = Math.max(0, currentFrame - delay);

  // 미세 숨쉬기 모션 (영상이 멈추지 않도록 지속)
  const breathe = Math.sin(f * 0.08) * 3;
  const fileBreathe = Math.cos(f * 0.09) * 2;

  // 1단계 [0~45f]: 폴더 등장 (스킬 폴더 안착)
  const folderEnter = interpolate(f, [0, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.4)),
  });

  // 2단계 [46~115f]: 파일 등장 (위쪽에서 부유하며 준비)
  const fileEnter = interpolate(f, [40, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 3단계 [216~310f]: 파일이 폴더 속으로 쏙 들어가는 동작
  const fileInsertY = interpolate(f, [210, 290], [-90, 24], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const fileInsertScale = interpolate(f, [210, 290], [1, 0.88], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4단계 [390~470f]: 대문자 'SKILL' 파일명 강조 포커스 팝
  const textFocusScale = interpolate(f, [380, 420, 470], [1, 1.18, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const textGlow = interpolate(f, [390, 430, 480], [0, 1, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5단계 [520~590f]: '정식 스킬' 인증 뱃지 팝업
  const badgePop = interpolate(f, [510, 555], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.8)),
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'Pretendard, -apple-system, sans-serif',
      }}
    >
      {/* 중앙 메인 그룹 */}
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 240,
          transform: `translateY(${breathe}px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 파일 (SKILL.md) */}
        <div
          style={{
            position: 'absolute',
            zIndex: 1,
            top: '50%',
            left: '50%',
            width: 170,
            height: 190,
            marginLeft: -85,
            marginTop: -95,
            opacity: fileEnter,
            transform: `translateY(${fileInsertY + fileBreathe}px) scale(${fileInsertScale * (0.8 + 0.2 * fileEnter)})`,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            border: '3.5px solid #101113',
            boxShadow: '0 8px 20px rgba(16, 17, 19, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 16,
            boxSizing: 'border-box',
          }}
        >
          {/* 파일 모서리 접힘 디테일 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 32,
              height: 32,
              backgroundColor: '#f0efec',
              borderBottomLeftRadius: 10,
              borderBottom: '3px solid #101113',
              borderLeft: '3px solid #101113',
            }}
          />

          {/* 파일 내부 도식 라인 */}
          <div style={{ width: '70%', height: 4, backgroundColor: '#d5d2cc', borderRadius: 2, marginBottom: 8, alignSelf: 'flex-start', marginLeft: 16 }} />
          <div style={{ width: '45%', height: 4, backgroundColor: '#d5d2cc', borderRadius: 2, marginBottom: 18, alignSelf: 'flex-start', marginLeft: 16 }} />

          {/* 파일명 카드 / 하이라이트 박스 */}
          <div
            style={{
              transform: `scale(${textFocusScale})`,
              backgroundColor: textGlow > 0.1 ? '#e8f2fb' : '#ffffff',
              border: `2.5px solid ${textGlow > 0.1 ? '#1273c4' : '#d5d2cc'}`,
              borderRadius: 8,
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              boxShadow: textGlow > 0.1 ? '0 0 16px rgba(18, 115, 196, 0.25)' : 'none',
              transition: 'background-color 0.2s, border-color 0.2s',
            }}
          >
            {highlightText && (
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#1273c4',
                  fontFamily: 'JetBrains Mono, Pretendard, sans-serif',
                  letterSpacing: '0.5px',
                }}
              >
                {highlightText}
              </span>
            )}
            {fileLabel && (
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#101113',
                  fontFamily: 'JetBrains Mono, Pretendard, sans-serif',
                }}
              >
                {fileLabel.startsWith(highlightText) ? fileLabel.slice(highlightText.length) : fileLabel}
              </span>
            )}
          </div>
        </div>

        {/* 스킬 폴더 뒷면 및 탭 */}
        <div
          style={{
            position: 'absolute',
            zIndex: 0,
            bottom: 18,
            width: 280,
            height: 180,
            opacity: folderEnter,
            transform: `scale(${folderEnter})`,
          }}
        >
          {/* 폴더 상단 탭 */}
          <div
            style={{
              position: 'absolute',
              top: -18,
              left: 12,
              width: 90,
              height: 24,
              backgroundColor: '#e8b338',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              border: '3.5px solid #101113',
              borderBottom: 'none',
            }}
          />
          {/* 폴더 뒷면 바디 */}
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f3c444',
              borderRadius: 18,
              border: '3.5px solid #101113',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 스킬 폴더 앞면 포켓 (파일이 꽂히는 앞주머니) */}
        <div
          style={{
            position: 'absolute',
            zIndex: 2,
            bottom: 18,
            width: 280,
            height: 130,
            opacity: folderEnter,
            transform: `scale(${folderEnter})`,
            backgroundColor: '#f8d25d',
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            border: '3.5px solid #101113',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 16,
            boxShadow: '0 12px 28px rgba(16, 17, 19, 0.1)',
          }}
        >
          {/* 폴더 명칭 라벨 뱃지 */}
          {folderLabel && (
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '2.5px solid #101113',
                borderRadius: 8,
                padding: '5px 14px',
                fontSize: 14,
                fontWeight: 700,
                color: '#101113',
                letterSpacing: '-0.3px',
              }}
            >
              {folderLabel}
            </div>
          )}
        </div>

        {/* '정식 스킬' 승인 배지 (우측 상단 팝업) */}
        {badgeLabel && (
          <div
            style={{
              position: 'absolute',
              zIndex: 4,
              top: 15,
              right: 2,
              transform: `scale(${badgePop}) rotate(-4deg)`,
              opacity: badgePop,
              backgroundColor: '#1273c4',
              color: '#ffffff',
              borderRadius: 14,
              border: '3px solid #101113',
              boxShadow: '0 6px 18px rgba(18, 115, 196, 0.35)',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {/* 체크 벡터 아이콘 */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5L6.5 12L13 4.5"
                stroke="#ffffff"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '-0.2px',
                whiteSpace: 'nowrap',
              }}
            >
              {badgeLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
