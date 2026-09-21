// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  sessionText?: string;
  statusText?: string;
  credentialText?: string;
  noticeText?: string;
}

export const canvas = { w: 560, h: 360 };

export const KeepSessionShield: React.FC<Props> = ({
  delay = 0,
  budget,
  sessionText = "",
  statusText = "",
  credentialText = "",
  noticeText = "",
}) => {
  const frame = useCurrentFrame();
  const activeFrame = Math.max(0, frame - delay);

  const enterProgress = interpolate(activeFrame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const containerScale = interpolate(enterProgress, [0, 1], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const containerOpacity = enterProgress;

  const shieldPulse = 1 + Math.sin(activeFrame * 0.08) * 0.03;
  const cardFloat = Math.sin(activeFrame * 0.05) * 3;

  const ringProgress = (activeFrame % 60) / 60;
  const ringScale = interpolate(ringProgress, [0, 1], [1, 1.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(ringProgress, [0, 0.4, 1], [0.6, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hasSessionText = Boolean(sessionText);
  const hasStatusText = Boolean(statusText);
  const hasCredentialText = Boolean(credentialText);
  const hasNoticeText = Boolean(noticeText);

  return (
    <div
      style={{
        width: 560,
        height: 360,
        backgroundColor: "#f0efec",
        borderRadius: 20,
        border: "3px solid #d5d2cc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 24px",
        boxSizing: "border-box",
        opacity: containerOpacity,
        transform: `scale(${containerScale})`,
        fontFamily: "Pretendard, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: 480,
          height: 84,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          boxSizing: "border-box",
          transform: `translateY(${cardFloat}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              backgroundColor: "#e8f2fb",
              borderRadius: 22,
              border: "2px solid #1273c4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="#1273c4"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                bottom: -2,
                right: -2,
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: "#1273c4",
                border: "2px solid #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width={10} height={10} viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 7.1-7.1 1.4 1.4z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>

          {hasSessionText ? (
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#101113",
              }}
            >
              {sessionText}
            </div>
          ) : null}
        </div>

        {hasStatusText ? (
          <div
            style={{
              backgroundColor: "#e8f2fb",
              border: "1.5px solid #1273c4",
              borderRadius: 999,
              padding: "6px 14px",
              color: "#1273c4",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {statusText}
          </div>
        ) : null}
      </div>

      <div
        style={{
          width: "100%",
          height: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 4,
            height: 96,
            backgroundColor: "#d5d2cc",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 58,
              height: 64,
              borderRadius: "12px 12px 24px 24px",
              border: "2px solid #1273c4",
              transform: `scale(${ringScale})`,
              opacity: ringOpacity,
            }}
          />

          <div
            style={{
              width: 58,
              height: 64,
              backgroundColor: "#ffffff",
              border: "3px solid #1273c4",
              borderRadius: "12px 12px 24px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${shieldPulse})`,
              boxShadow: "0 4px 16px rgba(18, 115, 196, 0.18)",
            }}
          >
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"
                fill="#1273c4"
              />
            </svg>
          </div>
        </div>

        {hasNoticeText ? (
          <div
            style={{
              position: "absolute",
              left: 316,
              backgroundColor: "#ffffff",
              border: "2px solid #d5d2cc",
              borderRadius: 10,
              padding: "6px 14px",
              color: "#43474b",
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              whiteSpace: "nowrap",
              zIndex: 3,
            }}
          >
            {noticeText}
          </div>
        ) : null}
      </div>

      <div
        style={{
          width: 480,
          height: 78,
          backgroundColor: "#f0efec",
          border: "2px dashed #d5d2cc",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              backgroundColor: "#ffffff",
              borderRadius: 18,
              border: "1.5px solid #d5d2cc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
                fill="#7c8288"
              />
            </svg>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: "#7c8288",
              }}
            />
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: "#7c8288",
              }}
            />
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: "#7c8288",
              }}
            />
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: "#7c8288",
              }}
            />
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: "#7c8288",
              }}
            />
          </div>
        </div>

        {hasCredentialText ? (
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#7c8288",
              fontFamily: "Spoqa Han Sans Neo, -apple-system, sans-serif",
            }}
          >
            {credentialText}
          </div>
        ) : null}
      </div>
    </div>
  );
};
