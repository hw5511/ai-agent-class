// Props every asset shares. Assets render state; timing comes from cues (beats.ts) resolved against the
// scene's chunk_frames, so an asset never hard-codes frames.

import type { Cue } from "./beats";
import type { EnterCode } from "./motion";
import type { Tone } from "./tokens";

export interface AssetBaseProps {
  // Slot size in px, given by the layout zone / subslot the asset is placed in.
  width: number;
  height: number;
  // Frames added to every cue (stagger inside a composite). Default 0.
  delay?: number;
  // Entrance preset from the motion dictionary (src/motion/registry.ts) and when it starts.
  enter?: EnterCode | "none";
  enterAt?: Cue;
  // Idle float (STYLE.md section 5). Default true.
  float?: boolean;
  // Focus ring on the whole asset / fade back behind a focused sibling.
  focused?: boolean;
  dimmed?: boolean;
  tone?: Tone;
}

// One entry of a props-schema summary (registry + future spec validator).
export interface PropDoc {
  name: string;
  type: string;
  required?: boolean;
  summary: string;
}

export interface VariantDoc {
  id: string;
  ko: string;
  summary: string;
}
