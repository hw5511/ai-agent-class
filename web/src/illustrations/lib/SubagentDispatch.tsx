// @ts-nocheck -- vendored from ax-site illustration library (type-checked there); unused-prop lints differ here
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Props {
  delay?: number;
  budget: number;
  mainAgentLabel?: string;
  taskLabel?: string;
  subagentLabel?: string;
}

export const SubagentDispatch: React.FC<Props> = ({
  delay = 0,
  budget = 600,
  mainAgentLabel = "",
  taskLabel = "",
  subagentLabel = "",
}) => {
  const frame = useCurrentFrame();
  const currentFrame = delay ? frame - delay : frame;
  const clampedFrame = currentFrame < 0 ? 0 : currentFrame;

  const breathe = Math.sin(clampedFrame * 0.08) * 3;

  const mainScale = interpolate(clampedFrame, [0, 24], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const mainOpacity = interpolate(clampedFrame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineProgress = interpolate(clampedFrame, [18, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const taskOpacity = interpolate(clampedFrame, [22, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taskY = interpolate(clampedFrame, [22, 60], [105, 155], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const sub0Scale = interpolate(clampedFrame, [42, 68], [0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const sub0Opacity = interpolate(clampedFrame, [42, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sub1Scale = interpolate(clampedFrame, [48, 74], [0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const sub1Opacity = interpolate(clampedFrame, [48, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sub2Scale = interpolate(clampedFrame, [54, 80], [0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });
  const sub2Opacity = interpolate(clampedFrame, [54, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dashOffsetCurved = 220 * (1 - lineProgress);
  const dashOffsetStraight = 145 * (1 - lineProgress);

  const particleProgress = (clampedFrame % 45) / 45;
  const particleY = 110 + particleProgress * 125;
  const particleOpacity = interpolate(lineProgress, [0.8, 1], [0, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hasMainAgentLabel = Boolean(mainAgentLabel);
  const hasTaskLabel = Boolean(taskLabel);
  const hasSubagentLabel = Boolean(subagentLabel);

  return (
    <div
      style={{
        width: 540,
        height: 360,
        backgroundColor: "#f0efec",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        width="540"
        height="360"
        viewBox="0 0 540 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="12"
          y="12"
          width="516"
          height="336"
          rx="18"
          fill="#f0efec"
          stroke="#d5d2cc"
          strokeWidth="3"
        />

        <path
          d="M 270 98 C 270 165, 115 165, 115 236"
          stroke="#d5d2cc"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        <path
          d="M 270 98 L 270 240"
          stroke="#d5d2cc"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        <path
          d="M 270 98 C 270 165, 425 165, 425 236"
          stroke="#d5d2cc"
          strokeWidth="3"
          strokeDasharray="6 6"
        />

        <path
          d="M 270 98 C 270 165, 115 165, 115 236"
          stroke="#1273c4"
          strokeWidth="3"
          strokeDasharray="220"
          strokeDashoffset={dashOffsetCurved}
        />
        <path
          d="M 270 98 L 270 240"
          stroke="#1273c4"
          strokeWidth="3"
          strokeDasharray="145"
          strokeDashoffset={dashOffsetStraight}
        />
        <path
          d="M 270 98 C 270 165, 425 165, 425 236"
          stroke="#1273c4"
          strokeWidth="3"
          strokeDasharray="220"
          strokeDashoffset={dashOffsetCurved}
        />

        <circle
          cx="270"
          cy={particleY}
          r="5"
          fill="#1273c4"
          opacity={particleOpacity}
        />

        <g
          opacity={sub0Opacity}
          transform={`translate(115, 270) scale(${sub0Scale}) translate(-115, -270)`}
        >
          <rect
            x="45"
            y="236"
            width="140"
            height="68"
            rx="14"
            fill="#ffffff"
            stroke="#d5d2cc"
            strokeWidth="3"
          />
          <circle
            cx="75"
            cy="270"
            r="14"
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth="3"
          />
          <circle cx="75" cy="270" r="5" fill="#1273c4" />
          {hasSubagentLabel ? (
            <text
              x="130"
              y="275"
              textAnchor="middle"
              fill="#101113"
              fontSize="13"
              fontFamily="Pretendard, -apple-system, sans-serif"
              fontWeight="700"
            >
              {subagentLabel}
            </text>
          ) : null}
        </g>

        <g
          opacity={sub1Opacity}
          transform={`translate(270, 274) scale(${sub1Scale}) translate(-270, -274)`}
        >
          <rect
            x="200"
            y="240"
            width="140"
            height="68"
            rx="14"
            fill="#ffffff"
            stroke="#1273c4"
            strokeWidth="3"
          />
          <circle
            cx="230"
            cy="274"
            r="14"
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth="3"
          />
          <circle cx="230" cy="274" r="5" fill="#1273c4" />
          {hasSubagentLabel ? (
            <text
              x="285"
              y="279"
              textAnchor="middle"
              fill="#101113"
              fontSize="13"
              fontFamily="Pretendard, -apple-system, sans-serif"
              fontWeight="700"
            >
              {subagentLabel}
            </text>
          ) : null}
        </g>

        <g
          opacity={sub2Opacity}
          transform={`translate(425, 270) scale(${sub2Scale}) translate(-425, -270)`}
        >
          <rect
            x="355"
            y="236"
            width="140"
            height="68"
            rx="14"
            fill="#ffffff"
            stroke="#d5d2cc"
            strokeWidth="3"
          />
          <circle
            cx="385"
            cy="270"
            r="14"
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth="3"
          />
          <circle cx="385" cy="270" r="5" fill="#1273c4" />
          {hasSubagentLabel ? (
            <text
              x="440"
              y="275"
              textAnchor="middle"
              fill="#101113"
              fontSize="13"
              fontFamily="Pretendard, -apple-system, sans-serif"
              fontWeight="700"
            >
              {subagentLabel}
            </text>
          ) : null}
        </g>

        <g opacity={taskOpacity} transform={`translate(270, ${taskY})`}>
          <rect
            x="-75"
            y="-18"
            width="150"
            height="36"
            rx="12"
            fill="#ffffff"
            stroke="#1273c4"
            strokeWidth="3"
          />
          {hasTaskLabel ? (
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill="#1273c4"
              fontSize="13"
              fontFamily="Pretendard, -apple-system, sans-serif"
              fontWeight="700"
            >
              {taskLabel}
            </text>
          ) : null}
        </g>

        <g
          opacity={mainOpacity}
          transform={`translate(270, ${70 + breathe}) scale(${mainScale}) translate(-270, -70)`}
        >
          <rect
            x="170"
            y="42"
            width="200"
            height="56"
            rx="16"
            fill="#ffffff"
            stroke="#101113"
            strokeWidth="3"
          />
          <circle
            cx="202"
            cy="70"
            r="15"
            fill="#e8f2fb"
            stroke="#1273c4"
            strokeWidth="3"
          />
          <circle cx="202" cy="70" r="6" fill="#1273c4" />
          {hasMainAgentLabel ? (
            <text
              x="276"
              y="75"
              textAnchor="middle"
              fill="#101113"
              fontSize="15"
              fontFamily="Pretendard, -apple-system, sans-serif"
              fontWeight="700"
            >
              {mainAgentLabel}
            </text>
          ) : null}
        </g>
      </svg>
    </div>
  );
};

export const canvas = { w: 540, h: 360 };
