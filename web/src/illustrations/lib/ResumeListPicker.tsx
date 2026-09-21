// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  command?: string;
  listTitle?: string;
  itemRecent?: string;
  itemPast?: string;
  actionBadge?: string;
}

export const canvas = { w: 440, h: 320 };

export const ResumeListPicker: React.FC<Props> = ({
  delay = 0,
  budget,
  command = "",
  listTitle = "",
  itemRecent = "",
  itemPast = "",
  actionBadge = "",
}) => {
  const currentFrame = useCurrentFrame();
  const f = Math.max(0, currentFrame - delay);

  const floatY = Math.sin(f * 0.08) * 2.5;
  const pulse = interpolate(Math.sin(f * 0.1), [-1, 1], [0.9, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const introHeader = interpolate(f, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const enterItem1 = interpolate(f, [5, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const enterItem2 = interpolate(f, [15, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const enterItem3 = interpolate(f, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const selectFocus = interpolate(f, [65, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const badgeScale = interpolate(f, [90, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });

  const unfocusedOpacity = interpolate(selectFocus, [0, 1], [1, 0.76], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: canvas.w,
        height: canvas.h,
        backgroundColor: "#ffffff",
        border: "2px solid #d5d2cc",
        borderRadius: "16px",
        boxSizing: "border-box",
        position: "relative",
        padding: "18px 20px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'Pretendard', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          opacity: introHeader,
          transform: `translateY(${(1 - introHeader) * -8}px)`,
        }}
      >
        {command ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#f0efec",
              border: "1.5px solid #d5d2cc",
              borderRadius: "8px",
              padding: "6px 12px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6H20M4 12H20M4 18H14"
                stroke="#1273c4"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#101113",
                letterSpacing: "-0.2px",
              }}
            >
              {command}
            </span>
          </div>
        ) : (
          <div />
        )}

        {listTitle ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#e8f2fb",
              border: "1px solid #1273c4",
              borderRadius: "8px",
              padding: "5px 10px",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#1273c4" strokeWidth="2.5" />
              <path d="M16 16L21 21" stroke="#1273c4" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: "'Spoqa Han Sans Neo', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#1273c4",
              }}
            >
              {listTitle}
            </span>
          </div>
        ) : null}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "56px",
            backgroundColor: "#ffffff",
            border: "2px solid #d5d2cc",
            borderRadius: "12px",
            padding: "0 14px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: enterItem1 * unfocusedOpacity,
            transform: `translateY(${(1 - enterItem1) * 10}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#d5d2cc",
              }}
            />
            {itemRecent ? (
              <span
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#43474b",
                }}
              >
                {itemRecent}
              </span>
            ) : (
              <div
                style={{
                  width: "70px",
                  height: "6px",
                  backgroundColor: "#d5d2cc",
                  borderRadius: "3px",
                }}
              />
            )}
          </div>
          <div
            style={{
              width: "28px",
              height: "4px",
              backgroundColor: "#d5d2cc",
              borderRadius: "2px",
            }}
          />
        </div>

        <div
          style={{
            width: "100%",
            height: "64px",
            backgroundColor: "#ffffff",
            border: `${2 + selectFocus}px solid ${selectFocus > 0.5 ? "#1273c4" : "#d5d2cc"}`,
            borderRadius: "14px",
            padding: "0 14px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 2,
            boxShadow:
              selectFocus > 0.1
                ? `0 4px 18px rgba(18, 115, 196, ${0.16 * selectFocus})`
                : "none",
            transform: `scale(${1 + selectFocus * 0.05}) translateY(${floatY}px)`,
            transformOrigin: "center center",
            opacity: enterItem2,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "4px",
              top: "10px",
              bottom: "10px",
              width: "4px",
              borderRadius: "2px",
              backgroundColor: "#1273c4",
              opacity: selectFocus,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingLeft: "6px",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                border: "2px solid #1273c4",
                backgroundColor: selectFocus > 0.5 ? "#e8f2fb" : "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${pulse})`,
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#1273c4",
                  opacity: selectFocus,
                }}
              />
            </div>

            {itemPast ? (
              <span
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#101113",
                  letterSpacing: "-0.2px",
                }}
              >
                {itemPast}
              </span>
            ) : (
              <div
                style={{
                  width: "85px",
                  height: "6px",
                  backgroundColor: "#d5d2cc",
                  borderRadius: "3px",
                }}
              />
            )}
          </div>

          {actionBadge ? (
            <div
              style={{
                backgroundColor: "#1273c4",
                borderRadius: "6px",
                padding: "4px 10px",
                transform: `scale(${badgeScale})`,
                transformOrigin: "right center",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12L10 17L20 7"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {actionBadge}
              </span>
            </div>
          ) : (
            <div
              style={{
                width: "36px",
                height: "6px",
                backgroundColor: "#e8f2fb",
                borderRadius: "3px",
              }}
            />
          )}
        </div>

        <div
          style={{
            width: "100%",
            height: "56px",
            backgroundColor: "#f0efec",
            border: "2px solid #d5d2cc",
            borderRadius: "12px",
            padding: "0 14px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: enterItem3 * unfocusedOpacity,
            transform: `translateY(${(1 - enterItem3) * 10}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#d5d2cc",
              }}
            />
            <div
              style={{
                width: "80px",
                height: "6px",
                backgroundColor: "#7c8288",
                borderRadius: "3px",
              }}
            />
          </div>
          <div
            style={{
              width: "32px",
              height: "4px",
              backgroundColor: "#d5d2cc",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          paddingLeft: "6px",
          opacity: introHeader,
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#1273c4",
          }}
        />
        <div
          style={{
            width: "24px",
            height: "2px",
            backgroundColor: "#1273c4",
          }}
        />
        <div
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: "#d5d2cc",
          }}
        />
        <div
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: "#d5d2cc",
          }}
        />
      </div>
    </div>
  );
};
