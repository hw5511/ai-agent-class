// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const canvas = { w: 520, h: 360 };

interface Props {
  delay?: number;
  budget: number;
  filesLabel?: string;
  mainLabel?: string;
  memoryLabel?: string;
  cleanLabel?: string;
}

export const CleanMemoryVault: React.FC<Props> = ({
  delay = 0,
  budget = 660,
  filesLabel = "",
  mainLabel = "",
  memoryLabel = "",
  cleanLabel = "",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = Math.max(0, currentFrame - delay);

  const enterProgress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const floatY = Math.sin((frame + 20) * 0.06) * 4;

  const file1Progress = (frame * 0.04) % 1;
  const file2Progress = ((frame + 25) * 0.04) % 1;
  const file3Progress = ((frame + 50) * 0.04) % 1;

  const vaultFocusScale = interpolate(
    frame,
    [180, 215, 380, 410],
    [1.0, 1.14, 1.14, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const fileAreaDim = interpolate(
    frame,
    [180, 215, 380, 410],
    [1.0, 0.75, 0.75, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const shieldGlow = 1 + Math.sin(frame * 0.1) * 0.06;

  return (
    <div
      style={{
        width: 520,
        height: 360,
        position: "relative",
        backgroundColor: "#f0efec",
        overflow: "hidden",
        borderRadius: 18,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 36,
          top: 55,
          width: 154,
          height: 250,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          border: "3.5px solid #d5d2cc",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 12px 14px 12px",
          opacity: enterProgress * fileAreaDim,
          transform: `translateY(${floatY}px)`,
        }}
      >
        {filesLabel ? (
          <div
            style={{
              width: "100%",
              height: 32,
              backgroundColor: "#f0efec",
              borderRadius: 8,
              border: "2px solid #d5d2cc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#101113",
              }}
            >
              {filesLabel}
            </span>
          </div>
        ) : (
          <div style={{ width: "100%", height: 32 }} />
        )}

        <div
          style={{
            width: 126,
            height: 120,
            borderRadius: 12,
            backgroundColor: "#f0efec",
            border: "2px dashed #d5d2cc",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 18,
              top: file1Progress * 120 - 30,
              width: 90,
              height: 26,
              backgroundColor: "#ffffff",
              borderRadius: 6,
              border: "2px solid #101113",
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              gap: 6,
              boxSizing: "border-box",
              opacity: interpolate(
                file1Progress,
                [0, 0.2, 0.8, 1],
                [0, 1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                backgroundColor: "#e8b839",
              }}
            />
            <div
              style={{
                width: 48,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#d5d2cc",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: 18,
              top: file2Progress * 120 - 30,
              width: 90,
              height: 26,
              backgroundColor: "#ffffff",
              borderRadius: 6,
              border: "2px solid #101113",
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              gap: 6,
              boxSizing: "border-box",
              opacity: interpolate(
                file2Progress,
                [0, 0.2, 0.8, 1],
                [0, 1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                backgroundColor: "#1273c4",
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
          </div>

          <div
            style={{
              position: "absolute",
              left: 18,
              top: file3Progress * 120 - 30,
              width: 90,
              height: 26,
              backgroundColor: "#ffffff",
              borderRadius: 6,
              border: "2px solid #101113",
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              gap: 6,
              boxSizing: "border-box",
              opacity: interpolate(
                file3Progress,
                [0, 0.2, 0.8, 1],
                [0, 1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                backgroundColor: "#43474b",
              }}
            />
            <div
              style={{
                width: 52,
                height: 4,
                borderRadius: 2,
                backgroundColor: "#d5d2cc",
              }}
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: 38,
            backgroundColor: "#e8f2fb",
            borderRadius: 8,
            border: "2px solid #1273c4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#1273c4",
            }}
          />
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#1273c4",
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 210,
          top: 65,
          width: 4,
          height: 230,
          backgroundColor: "#d5d2cc",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          opacity: enterProgress,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#1273c4",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#1273c4",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#1273c4",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 235,
          top: 45,
          width: 250,
          height: 270,
          backgroundColor: "#ffffff",
          borderRadius: 18,
          border: "3.5px solid #101113",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px 16px 16px 16px",
          opacity: enterProgress,
          transform: `translateY(${floatY}px) scale(${vaultFocusScale})`,
          boxShadow: "0 8px 24px rgba(16, 17, 19, 0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {mainLabel ? (
              <span
                style={{
                  fontFamily: "Pretendard, -apple-system, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#7c8288",
                }}
              >
                {mainLabel}
              </span>
            ) : null}
            {memoryLabel ? (
              <span
                style={{
                  fontFamily: "Pretendard, -apple-system, sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#101113",
                }}
              >
                {memoryLabel}
              </span>
            ) : null}
          </div>

          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              backgroundColor: "#f0efec",
              border: "2px solid #101113",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#1273c4",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 32,
              borderRadius: 8,
              backgroundColor: "#f0efec",
              border: "2px solid #d5d2cc",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 14,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#1273c4",
              }}
            />
          </div>

          <div
            style={{
              width: "100%",
              height: 32,
              borderRadius: 8,
              backgroundColor: "#f0efec",
              border: "2px solid #d5d2cc",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 14,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#1273c4",
              }}
            />
          </div>

          <div
            style={{
              width: "100%",
              height: 32,
              borderRadius: 8,
              backgroundColor: "#f0efec",
              border: "2px solid #d5d2cc",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 14,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#1273c4",
              }}
            />
          </div>
        </div>

        {cleanLabel ? (
          <div
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "#e8f2fb",
              borderRadius: 10,
              border: "2.5px solid #1273c4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxSizing: "border-box",
              transform: `scale(${shieldGlow})`,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2 L15 5 V9 C15 13 9 16 9 16 C9 16 3 13 3 9 V5 L9 2 Z"
                fill="#ffffff"
                stroke="#1273c4"
                strokeWidth="2"
              />
              <path
                d="M6.5 9 L8 10.5 L11.5 7"
                stroke="#1273c4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "Pretendard, -apple-system, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#1273c4",
              }}
            >
              {cleanLabel}
            </span>
          </div>
        ) : (
          <div style={{ width: "100%", height: 40 }} />
        )}
      </div>
    </div>
  );
};
