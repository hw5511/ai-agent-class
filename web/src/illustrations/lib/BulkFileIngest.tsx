// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  fileCountText?: string;
  readActionText?: string;
  targetText?: string;
}

export const canvas = { w: 480, h: 360 };

export const BulkFileIngest: React.FC<Props> = ({
  delay = 0,
  budget,
  fileCountText = "",
  readActionText = "",
  targetText = "",
}) => {
  const frame = useCurrentFrame();
  const f = frame - delay;

  const breath = Math.sin(f * 0.08) * 3;
  const pulse = Math.sin(f * 0.12) * 0.05 + 1;

  const enterOpacity = interpolate(f, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enterY = interpolate(f, [0, 30], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const scanOffset = interpolate(f, [196, 262], [10, 140], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scanOpacity = interpolate(f, [190, 198, 258, 266], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const streamOffset1 = interpolate(f, [240, 300], [0, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const streamOffset2 = interpolate(f, [260, 320], [0, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const streamOffset3 = interpolate(f, [280, 340], [0, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const streamOpacity = interpolate(f, [236, 246, 334, 344], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const targetScale = interpolate(f, [290, 335, 380], [1, 1.14, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        backgroundColor: "#f0efec",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "36px 36px",
        boxSizing: "border-box",
        opacity: enterOpacity,
        transform: `translateY(${enterY}px)`,
      }}
    >
      <div
        style={{
          width: 170,
          height: 230,
          position: "relative",
          transform: `translateY(${breath}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 18,
            top: 14,
            width: 136,
            height: 176,
            borderRadius: 16,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            transform: "rotate(-6deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 8,
            width: 136,
            height: 176,
            borderRadius: 16,
            backgroundColor: "#ffffff",
            border: "3px solid #d5d2cc",
            transform: "rotate(4deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 14,
            top: 10,
            width: 138,
            height: 178,
            borderRadius: 16,
            backgroundColor: "#ffffff",
            border: "3px solid #1273c4",
            boxSizing: "border-box",
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 8px 20px rgba(18, 115, 196, 0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 20,
                borderRadius: 6,
                backgroundColor: "#f3b738",
                border: "2px solid #101113",
              }}
            />
            <div
              style={{
                width: 60,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#d5d2cc",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                width: 102,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#e8f2fb",
              }}
            />
            <div
              style={{
                width: 90,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#e8f2fb",
              }}
            />
            <div
              style={{
                width: 78,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#e8f2fb",
              }}
            />
            <div
              style={{
                width: 96,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#e8f2fb",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                width: 32,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#d5d2cc",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: 4,
              right: 4,
              top: scanOffset,
              height: 3,
              backgroundColor: "#1273c4",
              boxShadow: "0 0 10px #1273c4",
              opacity: scanOpacity,
            }}
          />
        </div>

        {fileCountText ? (
          <div
            style={{
              position: "absolute",
              top: -12,
              left: 20,
              backgroundColor: "#101113",
              padding: "4px 12px",
              borderRadius: 14,
              zIndex: 3,
            }}
          >
            <span
              style={{
                fontFamily:
                  "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.2px",
              }}
            >
              {fileCountText}
            </span>
          </div>
        ) : null}

        {readActionText ? (
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: -10,
              backgroundColor: "#1273c4",
              padding: "5px 12px",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(18, 115, 196, 0.25)",
              transform: `scale(${pulse})`,
              zIndex: 4,
            }}
          >
            <span
              style={{
                fontFamily:
                  "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.2px",
              }}
            >
              {readActionText}
            </span>
          </div>
        ) : null}
      </div>

      <div
        style={{
          width: 80,
          height: 120,
          position: "relative",
          opacity: streamOpacity,
        }}
      >
        <svg
          width="80"
          height="120"
          viewBox="0 0 80 120"
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          <path
            d="M 10 30 C 40 30, 40 60, 70 60"
            fill="none"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M 10 60 C 40 60, 40 60, 70 60"
            fill="none"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M 10 90 C 40 90, 40 60, 70 60"
            fill="none"
            stroke="#d5d2cc"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            top: 24,
            left: streamOffset1 * 0.45,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: "#1273c4",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 54,
            left: streamOffset2 * 0.45,
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: "#1273c4",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 84,
            left: streamOffset3 * 0.45,
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: "#1273c4",
          }}
        />
      </div>

      <div
        style={{
          width: 154,
          height: 210,
          borderRadius: 20,
          backgroundColor: "#ffffff",
          border: "3px solid #d5d2cc",
          boxSizing: "border-box",
          padding: "20px 14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `scale(${targetScale})`,
          boxShadow: "0 10px 24px rgba(16, 17, 19, 0.05)",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 38,
            backgroundColor: "#e8f2fb",
            border: "3px solid #1273c4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <rect
              x="8"
              y="10"
              width="24"
              height="20"
              rx="6"
              fill="none"
              stroke="#1273c4"
              strokeWidth="3"
            />
            <path
              d="M 14 18 L 26 18 M 14 23 L 22 23"
              stroke="#1273c4"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: 45,
              border: "2px dashed #1273c4",
              opacity: 0.4,
              transform: `scale(${pulse})`,
            }}
          />
        </div>

        <div
          style={{
            width: 120,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 70,
              height: 6,
              borderRadius: 3,
              backgroundColor: "#d5d2cc",
            }}
          />
          <div
            style={{
              width: 90,
              height: 6,
              borderRadius: 3,
              backgroundColor: "#e8f2fb",
            }}
          />
        </div>

        {targetText ? (
          <div
            style={{
              backgroundColor: "#e8f2fb",
              border: "2px solid #1273c4",
              padding: "6px 12px",
              borderRadius: 12,
              textAlign: "center",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontFamily:
                  "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#1273c4",
                letterSpacing: "-0.2px",
                display: "block",
              }}
            >
              {targetText}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
