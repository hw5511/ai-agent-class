// Own Remotion entry point for the still-slide mockup mode (SlideDeck), separate from ../index.ts /
// ../Root.tsx (never imported or modified). Bundled by ../../render_slides.mjs.
import { registerRoot } from "remotion";
// Read-only: the design-system stylesheet that @imports the Pretendard / Spoqa Han Sans Neo / D2Coding
// (and JetBrains Mono / Noto Sans KR, unused by this deck) webfonts. Never edited from here.
import "../tokens.css";
import { SlideRootComponent } from "./SlideRoot";

registerRoot(SlideRootComponent);
