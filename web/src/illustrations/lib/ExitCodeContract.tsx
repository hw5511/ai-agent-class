// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  contractLabel?: string;
  blockCode?: string;
  blockAction?: string;
  passCode?: string;
  passAction?: string;
  agentLabel?: string;
}

export const ExitCodeContract: React.FC<Props> = ({
  delay = 0,
  budget = 1080,
  contractLabel = "",
  blockCode = "",
  blockAction = "",
  passCode = "",
  passAction = "",
  agentLabel = "",
}) => {
  const frame = useCurrentFrame();
  const f = frame - delay;

  const idleY = Math.sin(Math.max(0, f) * 0.06) * 3;

  const blockScale = interpolate(f, [40, 70, 95], [1, 1.08, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const passScale = interpolate(f, [120, 150, 175], [1, 1.08, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const agentTransit = interpolate(f, [200, 245], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const agentScale = interpolate(f, [230, 255, 275], [1, 1.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 560,
        height: 360,
        backgroundColor: "#ffffff",
        borderRadius: 18,
        border: "3px solid #d5d2cc",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        fontFamily:
          "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {contractLabel ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
              borderRadius: 18,
              padding: "6px 14px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"
                fill="#1273c4"
              />
            </svg>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1273c4",
                letterSpacing: "-0.01em",
              }}
            >
              {contractLabel}
            </span>
          </div>
        ) : null}
      </div>

      <svg
        width="560"
        height="360"
        viewBox="0 0 560 360"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <path
          d="M 88 180 C 130 180, 140 115, 185 115"
          stroke="#101113"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 88 180 C 130 180, 140 245, 185 245"
          stroke="#d5d2cc"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 370 115 C 440 115, 450 200, 460 260"
          stroke="#1273c4"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          fill="none"
        />
        <circle
          cx={370 + agentTransit * 90}
          cy={115 + agentTransit * 145}
          r="5"
          fill="#1273c4"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 44,
          top: 156 + idleY,
          width: 48,
          height: 48,
          borderRadius: 14,
          backgroundColor: "#f0efec",
          border: "3px solid #101113",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(16, 17, 19, 0.08)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            stroke="#101113"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="#ffffff"
          />
          <path
            d="M14 2v6h6"
            stroke="#101113"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: 185,
          top: 86 + idleY,
          display: "flex",
          alignItems: "center",
          gap: 12,
          transform: `scale(${blockScale})`,
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 14,
            backgroundColor: "#ffffff",
            border: "3.5px solid #101113",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(16, 17, 19, 0.1)",
          }}
        >
          {blockCode ? (
            <span
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#101113",
                letterSpacing: "-0.03em",
              }}
            >
              {blockCode}
            </span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#e8f2fb",
            border: "2.5px solid #1273c4",
            borderRadius: 14,
            padding: "8px 14px",
            boxShadow: "0 4px 12px rgba(18, 115, 196, 0.12)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3L4 7v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V7l-8-4z"
              stroke="#1273c4"
              strokeWidth="2.5"
              strokeLinejoin="round"
              fill="#ffffff"
            />
          </svg>
          {blockAction ? (
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#1273c4",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              {blockAction}
            </span>
          ) : null}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 185,
          top: 216 - idleY,
          display: "flex",
          alignItems: "center",
          gap: 12,
          transform: `scale(${passScale})`,
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 14,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(16, 17, 19, 0.05)",
          }}
        >
          {passCode ? (
            <span
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#43474b",
                letterSpacing: "-0.03em",
              }}
            >
              {passCode}
            </span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#ffffff",
            border: "2px solid #d5d2cc",
            borderRadius: 14,
            padding: "8px 14px",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#43474b" strokeWidth="2.5" />
            <path
              d="M8 12l3 3 5-5"
              stroke="#43474b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {passAction ? (
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#43474b",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              {passAction}
            </span>
          ) : null}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 32,
          bottom: 36,
          transform: `scale(${agentScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            backgroundColor: "#ffffff",
            border: "3px solid #101113",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(16, 17, 19, 0.1)",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect
              x="4"
              y="7"
              width="16"
              height="13"
              rx="3"
              stroke="#101113"
              strokeWidth="2.5"
              fill="#e8f2fb"
            />
            <circle cx="9" cy="13" r="1.5" fill="#101113" />
            <circle cx="15" cy="13" r="1.5" fill="#101113" />
            <path
              d="M12 3v4"
              stroke="#1273c4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="3" r="1.5" fill="#1273c4" />
          </svg>
        </div>
        {agentLabel ? (
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#101113",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {agentLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export const canvas = { w: 560, h: 360 };
