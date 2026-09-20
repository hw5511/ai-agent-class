// Motion dictionary: every named animation a scene may pick (templates/MOTION.md section 3 is generated
// from this file by tools/motion_dict.mjs). Presets are pure functions (frame, fps, params) -> MotionStyle.
// Frame counts below are the MOTION.md numbers at 30fps; they scale with fps/30 and divide by `speed`.
// No React here: this file is also bundled for node by the doc generator.

import { Easing, interpolate } from "remotion";

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// MOTION.md section 1: scene transition length. Episode length math (timing.ts) depends on it, so
// transition presets change the look only, never the length.
export const TRANSITION_FRAMES = 12;

export interface MotionParams {
  delay: number;
  speed: number;
  strength: number;
  distance: number;
  hold: number;
  chars: number;
  count: number;
  // Scene length in frames. Filled in by the runtime for exit presets; not a script param.
  end: number;
}

export type ParamName = keyof MotionParams;

// Numeric style. toCss (motion/runtime.tsx) turns it into CSS; overlays (ring / underline) and tint are
// drawn by the zone that is the emphasis target, dim is applied to every other zone.
export interface MotionStyle {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  scaleX?: number;
  // 0..1, visible fraction from the left (type-on).
  reveal?: number;
  ring?: number;
  ringWidth?: number;
  underline?: number;
  underlineAlpha?: number;
  underlineSize?: number;
  tint?: number;
  dim?: number;
}

export type PresetFn = (frame: number, fps: number, p: MotionParams) => MotionStyle;

export interface ParamDoc {
  default: number;
  ko: string;
}

export interface PresetDef {
  ko: string;
  when: string;
  params: Partial<Record<ParamName, ParamDoc>>;
  fn: PresetFn;
}

export const BASE_PARAMS: MotionParams = {
  delay: 0,
  speed: 1,
  strength: 1,
  distance: 26,
  hold: 45,
  chars: 12,
  count: 2,
  end: 0,
};

// Frames at the MOTION.md 30fps basis -> frames at this fps and speed.
const fr = (n: number, fps: number, p: MotionParams) => (n * (fps / 30)) / p.speed;

const fadeIn = (frame: number, fps: number, p: MotionParams) =>
  interpolate(frame, [p.delay, p.delay + fr(12, fps, p)], [0, 1], { ...clamp, easing: EASE });

// In (12) -> hold -> out (12) envelope, local to the emphasis start (p.delay).
const envelope = (frame: number, fps: number, p: MotionParams, inF = 12, outF = 12) => {
  const t = frame - p.delay;
  const a = fr(inF, fps, p);
  const b = a + p.hold * (fps / 30);
  const up = interpolate(t, [0, a], [0, 1], { ...clamp, easing: EASE });
  const down = interpolate(t, [b, b + fr(outF, fps, p)], [1, 0], { ...clamp, easing: EASE });
  return Math.min(up, down);
};

const P = {
  delay: (d: number, ko = "시작 프레임 오프셋(컴포넌트 스태거에 더한다)"): ParamDoc => ({ default: d, ko }),
  speed: { default: 1, ko: "속도 배율. 2 = 두 배 빠르게" } as ParamDoc,
  strength: (ko: string): ParamDoc => ({ default: 1, ko }),
  distance: (d: number, ko = "이동 거리 px(strength 곱)"): ParamDoc => ({ default: d, ko }),
  hold: (d: number): ParamDoc => ({ default: d, ko: "최고점 유지 프레임" }),
};

// ------------------------------------------------------------------ 등장 (enter)

export const ENTER = {
  fade: {
    ko: "페이드",
    when: "움직임 없이 조용히 나타나야 할 때(그림 칸, 강조 장면 뒤)",
    params: { delay: P.delay(0), speed: P.speed },
    fn: (frame, fps, p) => ({ opacity: fadeIn(frame, fps, p) }),
  },
  rise: {
    ko: "떠오르기",
    when: "기본 등장. 페이드 + 26px 라이즈 (MOTION.md §1)",
    params: { delay: P.delay(0), speed: P.speed, strength: P.strength("라이즈 거리 배율"), distance: P.distance(26) },
    fn: (frame, fps, p) => ({
      opacity: fadeIn(frame, fps, p),
      y: interpolate(frame, [p.delay, p.delay + fr(14, fps, p)], [p.distance * p.strength, 0], { ...clamp, easing: EASE }),
    }),
  },
  "slide-left": {
    ko: "왼쪽으로 밀려들기",
    when: "오른쪽에서 들어오는 흐름(다음 단계, 새 항목 추가)",
    params: { delay: P.delay(0), speed: P.speed, strength: P.strength("이동 거리 배율"), distance: P.distance(26) },
    fn: (frame, fps, p) => ({
      opacity: fadeIn(frame, fps, p),
      x: interpolate(frame, [p.delay, p.delay + fr(14, fps, p)], [p.distance * p.strength, 0], { ...clamp, easing: EASE }),
    }),
  },
  "slide-right": {
    ko: "오른쪽으로 밀려들기",
    when: "왼쪽에서 들어오는 흐름(이전 것과 대비, 되돌아보기)",
    params: { delay: P.delay(0), speed: P.speed, strength: P.strength("이동 거리 배율"), distance: P.distance(26) },
    fn: (frame, fps, p) => ({
      opacity: fadeIn(frame, fps, p),
      x: interpolate(frame, [p.delay, p.delay + fr(14, fps, p)], [-p.distance * p.strength, 0], { ...clamp, easing: EASE }),
    }),
  },
  pop: {
    ko: "톡 튀어나오기",
    when: "창·카드가 한 덩어리로 나타날 때. scale 0.965→1 + 페이드 12프레임 (터미널 팝)",
    params: { delay: P.delay(0), speed: P.speed, strength: P.strength("축소 폭 배율(0.035 기준)") },
    fn: (frame, fps, p) => ({
      opacity: fadeIn(frame, fps, p),
      scale: interpolate(frame, [p.delay, p.delay + fr(12, fps, p)], [1 - 0.035 * p.strength, 1], { ...clamp, easing: EASE }),
    }),
  },
  "draw-rule": {
    ko: "선 긋기",
    when: "왼쪽에서 자라나는 등장. 룰(구분선) 기본값, 18프레임 (MOTION.md §1 12→30)",
    params: { delay: P.delay(0), speed: P.speed },
    fn: (frame, fps, p) => ({
      scaleX: interpolate(frame, [p.delay, p.delay + fr(18, fps, p)], [0, 1], { ...clamp, easing: EASE }),
    }),
  },
  "type-on": {
    ko: "타이핑",
    when: "글자가 한 자씩 쳐지는 느낌이 필요할 때. 글자당 3프레임, 상한 90프레임",
    params: { delay: P.delay(0), speed: P.speed, chars: { default: 12, ko: "끊어 보일 글자 칸 수" } },
    fn: (frame, fps, p) => {
      const n = Math.max(1, Math.round(p.chars));
      const total = Math.max(1, Math.min(fr(3 * n, fps, p), fr(90, fps, p)));
      const k = interpolate(frame, [p.delay, p.delay + total], [0, 1], clamp);
      return { opacity: frame >= p.delay ? 1 : 0, reveal: Math.floor(k * n) / n };
    },
  },
} satisfies Record<string, PresetDef>;

// ------------------------------------------------------------------ 강조 (emphasis) — frame 0 = `at`

export const EMPHASIS = {
  "scale-pop": {
    ko: "살짝 커졌다 돌아오기",
    when: "짧은 한 박자 강조(단어·숫자를 말하는 순간). 칸 안에서만 커진다",
    params: { delay: P.delay(0, "at 뒤 오프셋 프레임"), speed: P.speed, strength: P.strength("확대 폭 배율(6% 기준)"), hold: P.hold(0) },
    fn: (frame, fps, p) => ({ scale: 1 + 0.06 * p.strength * envelope(frame, fps, p, 12, 15) }),
  },
  ring: {
    ko: "테두리 두르기",
    when: "칸 하나를 가리킬 때(그림·터미널 칸). 파란 4px 테두리",
    params: { delay: P.delay(0, "at 뒤 오프셋 프레임"), speed: P.speed, strength: P.strength("테두리 두께 배율(4px 기준)"), hold: P.hold(45) },
    fn: (frame, fps, p) => ({ ring: envelope(frame, fps, p), ringWidth: 4 * p.strength }),
  },
  underline: {
    ko: "밑줄 긋기",
    when: "글자 칸의 핵심어를 짚을 때. 왼쪽에서 18프레임에 그어진다",
    params: { delay: P.delay(0, "at 뒤 오프셋 프레임"), speed: P.speed, strength: P.strength("밑줄 두께 배율(6px 기준)"), hold: P.hold(45) },
    fn: (frame, fps, p) => {
      const t = frame - p.delay;
      const grow = fr(18, fps, p);
      const out = grow + p.hold * (fps / 30);
      return {
        underline: interpolate(t, [0, grow], [0, 1], { ...clamp, easing: EASE }),
        underlineAlpha: t < 0 ? 0 : interpolate(t, [out, out + fr(12, fps, p)], [1, 0], { ...clamp, easing: EASE }),
        underlineSize: 6 * p.strength,
      };
    },
  },
  pulse: {
    ko: "두근거리기",
    when: "기다림·진행 중을 보여줄 때. 30프레임 주기 3% 맥박",
    params: { delay: P.delay(0, "at 뒤 오프셋 프레임"), speed: P.speed, strength: P.strength("맥박 폭 배율(3% 기준)"), count: { default: 2, ko: "맥박 횟수" } },
    fn: (frame, fps, p) => {
      const t = frame - p.delay;
      const period = fr(30, fps, p);
      if (t < 0 || t > period * p.count) return { scale: 1 };
      return { scale: 1 + 0.03 * p.strength * (0.5 - 0.5 * Math.cos((2 * Math.PI * t) / period)) };
    },
  },
  "dim-others": {
    ko: "나머지 어둡게",
    when: "여러 칸 중 하나만 보게 할 때(포커스 안무). 다른 칸이 투명도 0.35 로 물러난다",
    params: { delay: P.delay(0, "at 뒤 오프셋 프레임"), speed: P.speed, strength: P.strength("어둡게 하는 정도 배율"), hold: P.hold(45) },
    fn: (frame, fps, p) => ({ dim: Math.min(1, Math.max(0, envelope(frame, fps, p) * (1 - 0.35) * p.strength)) }),
  },
  "color-shift": {
    ko: "파란색으로 물들기",
    when: "글자 칸의 먹색을 액센트 블루로 바꿔 짚을 때",
    params: { delay: P.delay(0, "at 뒤 오프셋 프레임"), speed: P.speed, strength: P.strength("물드는 정도(1 = 완전히)"), hold: P.hold(45) },
    fn: (frame, fps, p) => ({ tint: Math.min(1, envelope(frame, fps, p) * p.strength) }),
  },
} satisfies Record<string, PresetDef>;

// ------------------------------------------------------------------ 전환 (transition) — frame 0..12 of the transition, entering scene

export const TRANSITION = {
  fade: {
    ko: "페이드",
    when: "기본 장면 전환",
    params: {},
    fn: (frame, fps) => ({ opacity: Math.min(1, Math.max(0, frame / (TRANSITION_FRAMES * (fps / 30)))) }),
  },
  "slide-up": {
    ko: "아래에서 밀어올리기",
    when: "챕터 범퍼 → 다음 장면 (기본값), 큰 단락이 바뀔 때",
    params: {},
    fn: (frame, fps) => ({ y: 1080 * (1 - Math.min(1, Math.max(0, frame / (TRANSITION_FRAMES * (fps / 30))))) }),
  },
  zoom: {
    ko: "다가오기",
    when: "전체 → 한 부분으로 파고들 때. 새 장면이 8% 크게 시작해 제자리로",
    params: { strength: P.strength("시작 확대 폭 배율(8% 기준)") },
    fn: (frame, fps, p) => {
      const k = Math.min(1, Math.max(0, frame / (TRANSITION_FRAMES * (fps / 30))));
      return { opacity: k, scale: 1 + 0.08 * p.strength * (1 - EASE(k)) };
    },
  },
  cut: {
    ko: "컷",
    when: "화면이 곧바로 바뀌어야 할 때(전후 비교, 오류 화면 등장)",
    params: {},
    fn: () => ({}),
  },
} satisfies Record<string, PresetDef>;

// ------------------------------------------------------------------ 퇴장 (exit) — ends `delay` frames before scene end

const exitWindow = (fps: number, p: MotionParams): [number, number] => {
  const stop = p.end - p.delay * (fps / 30);
  return [stop - fr(12, fps, p), stop];
};

export const EXIT = {
  fade: {
    ko: "사라지기",
    when: "다음 장면과 겹치기 전에 먼저 비워둘 때",
    params: { delay: P.delay(12, "장면 끝 몇 프레임 전에 다 사라지나(기본 = 전환 12프레임)"), speed: P.speed },
    fn: (frame, fps, p) => ({ opacity: interpolate(frame, exitWindow(fps, p), [1, 0], { ...clamp, easing: EASE }) }),
  },
  sink: {
    ko: "가라앉기",
    when: "설명이 끝난 요소를 아래로 내려보낼 때(떠오르기의 반대)",
    params: { delay: P.delay(12, "장면 끝 몇 프레임 전에 다 사라지나"), speed: P.speed, strength: P.strength("가라앉는 거리 배율"), distance: P.distance(26) },
    fn: (frame, fps, p) => ({
      opacity: interpolate(frame, exitWindow(fps, p), [1, 0], { ...clamp, easing: EASE }),
      y: interpolate(frame, exitWindow(fps, p), [0, p.distance * p.strength], { ...clamp, easing: EASE }),
    }),
  },
  shrink: {
    ko: "작아지며 사라지기",
    when: "창·카드를 닫는 느낌(톡 튀어나오기의 반대)",
    params: { delay: P.delay(12, "장면 끝 몇 프레임 전에 다 사라지나"), speed: P.speed, strength: P.strength("축소 폭 배율(0.035 기준)") },
    fn: (frame, fps, p) => ({
      opacity: interpolate(frame, exitWindow(fps, p), [1, 0], { ...clamp, easing: EASE }),
      scale: interpolate(frame, exitWindow(fps, p), [1, 1 - 0.035 * p.strength], { ...clamp, easing: EASE }),
    }),
  },
} satisfies Record<string, PresetDef>;

export type EnterCode = keyof typeof ENTER;
export type EmphasisCode = keyof typeof EMPHASIS;
export type TransitionCode = keyof typeof TRANSITION;
export type ExitCode = keyof typeof EXIT;

export const MOTION_REGISTRY = {
  enter: ENTER as Record<EnterCode, PresetDef>,
  emphasis: EMPHASIS as Record<EmphasisCode, PresetDef>,
  transition: TRANSITION as Record<TransitionCode, PresetDef>,
  exit: EXIT as Record<ExitCode, PresetDef>,
};

export type MotionGroup = keyof typeof MOTION_REGISTRY;

export const GROUP_KO: Record<MotionGroup, string> = {
  enter: "등장",
  emphasis: "강조",
  transition: "전환",
  exit: "퇴장",
};

// Defaults for a preset, then script overrides. Unknown keys are ignored here (scene_lint reports them).
export function resolveParams(def: PresetDef, overrides?: Partial<MotionParams>): MotionParams {
  const out: MotionParams = { ...BASE_PARAMS };
  (Object.keys(def.params) as ParamName[]).forEach((k) => {
    const d = def.params[k];
    if (d) out[k] = d.default;
  });
  if (overrides) {
    (Object.keys(overrides) as ParamName[]).forEach((k) => {
      const v = overrides[k];
      if (typeof v === "number" && Number.isFinite(v) && k in BASE_PARAMS) out[k] = v;
    });
  }
  if (!(out.speed > 0)) out.speed = 1;
  return out;
}
