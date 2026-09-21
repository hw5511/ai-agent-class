// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  badgeText?: string;
  agentText?: string;
  actionText?: string;
}

export const canvas = { w: 560, h: 360 };

export const ExtensionBridge: React.FC<Props> = ({
  delay = 0,
  budget,
  badgeText = "",
  agentText = "",
  actionText = "",
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

  const agentFloat = Math.sin(activeFrame * 0.05) * 3;
  const targetFloat = Math.cos(activeFrame * 0.05) * 3;
  const badgePulse = 1 + Math.sin(activeFrame * 0.08) * 0.02;

  const packetCycle = activeFrame % 75;
  const packetProgress = interpolate(packetCycle, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const packetX = interpolate(packetProgress, [0, 1], [-26, 26], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const packetOpacity = interpolate(packetProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const clickCycle = activeFrame % 60;
  const clickProgress = interpolate(clickCycle, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cursorPress = interpolate(clickCycle, [0, 10, 20], [0, 4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleScale = interpolate(clickProgress, [0, 1], [0.6, 1.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleOpacity = interpolate(clickProgress, [0, 0.3, 1], [0.8, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blinkCycle = Math.sin(activeFrame * 0.16);
  const cursorOpacity = interpolate(blinkCycle, [-0.2, 0.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hasBadgeText = Boolean(badgeText);
  const hasAgentText = Boolean(agentText);
  const hasActionText = Boolean(actionText);

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
        padding: "24px 28px",
        boxSizing: "border-box",
        opacity: containerOpacity,
        transform: `scale(${containerScale})`,
        fontFamily: "Pretendard, -apple-system, sans-serif",
      }}
    >
      {hasBadgeText ? (
        <div
          style={{
            backgroundColor: "#e8f2fb",
            border: "2px solid #1273c4",
            borderRadius: 999,
            padding: "6px 16px",
            color: "#1273c4",
            fontSize: 13,
            fontWeight: 700,
            transform: `scale(${badgePulse})`,
            boxShadow: "0 2px 8px rgba(18, 115, 196, 0.12)",
          }}
        >
          {badgeText}
        </div>
      ) : (
        <div style={{ height: 29 }} />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 190,
            height: 220,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            borderRadius: 16,
            padding: 16,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `translateY(${agentFloat}px)`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              backgroundColor: "#e8f2fb",
              borderRadius: 28,
              border: "2px solid #1273c4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v1h-4V6a2 2 0 0 1 2-2zm-3 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                fill="#1273c4"
              />
            </svg>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#1273c4",
                opacity: 0.8,
              }}
            />
            <div
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#d5d2cc",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#1273c4",
                opacity: 0.8,
              }}
            />
          </div>

          {hasAgentText ? (
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {agentText}
            </div>
          ) : null}
        </div>

        <div
          style={{
            width: 76,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#ffffff",
              border: "3px solid #1273c4",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(18, 115, 196, 0.15)",
              marginBottom: 10,
            }}
          >
            <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
              <path
                d="M19 13h-2v-2a3 3 0 0 0-6 0v2H9a2 2 0 0 0-2 2v2a3 3 0 0 0 0 6v-2h2a2 2 0 0 0 2-2v-2a3 3 0 0 0 6 0v2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"
                fill="#1273c4"
              />
            </svg>
          </div>

          <div
            style={{
              width: 68,
              height: 6,
              backgroundColor: "#d5d2cc",
              borderRadius: 3,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: "#1273c4",
                transform: `translateX(${packetX}px)`,
                opacity: packetOpacity,
                boxShadow: "0 0 8px #1273c4",
              }}
            />
          </div>
        </div>

        <div
          style={{
            width: 190,
            height: 220,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            borderRadius: 16,
            padding: 16,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `translateY(${targetFloat}px)`,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 48,
                backgroundColor: "#f0efec",
                borderRadius: 8,
                border: "2px solid #d5d2cc",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  border: "2px solid #1273c4",
                  transform: `scale(${rippleScale})`,
                  opacity: rippleOpacity,
                }}
              />
              <div
                style={{
                  transform: `translateY(${cursorPress}px)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 3l14 7-6.5 2L9.5 19 4 3z"
                    fill="#101113"
                    stroke="#ffffff"
                    strokeWidth={1.5}
                  />
                </svg>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                height: 38,
                backgroundColor: "#f0efec",
                borderRadius: 8,
                border: "2px solid #d5d2cc",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                boxSizing: "border-box",
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#43474b",
                }}
              />
              <div
                style={{
                  width: 20,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#43474b",
                }}
              />
              <div
                style={{
                  width: 2,
                  height: 16,
                  backgroundColor: "#1273c4",
                  opacity: cursorOpacity,
                }}
              />
            </div>
          </div>

          {hasActionText ? (
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#101113",
                textAlign: "center",
                lineHeight: 1.3,
                fontFamily: "Spoqa Han Sans Neo, -apple-system, sans-serif",
              }}
            >
              {actionText}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
