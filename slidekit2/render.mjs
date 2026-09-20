// Render one or more still slides from a step02 lesson part (src/slides/index.ts -> SlideRoot.tsx ->
// src/slides/specs/registry.ts, NOT the episode entry src/index.ts) to PNG at 2560x1440
// (1920x1080 native x scale 4/3).
//
//   node render_slides.mjs claudemd            -> renders all slides of the "claudemd" part
//   node render_slides.mjs claudemd 1 6        -> renders slides 01 and 06 of "claudemd"
//   node render_slides.mjs read                -> renders all slides of the "read" part
//
// Output file names come from that part's own spec (SlideEntry["name"], read off the composition's
// defaultProps.slideNames — see SlideRoot.tsx) — this script keeps no hand-written name list, so a part
// worker adding/renaming slides in their own step02-<part>.tsx never has to touch this file.
//
// Output folder: C:/woohee_industries/30-프로젝트/ai-agent-class/_drafts/step02_<part>/, except
// "claudemd" which keeps its original folder step02_claudemd_v1 (existing renders/reviews live there).
//
// Bundles src/slides/index.ts once, then renders each requested slide sequentially with a single
// Chromium instance (no parallelism: one render process at a time, per the task's hard rule). Launch this
// at below-normal OS priority from VIDEO, e.g.:
//   cmd /c "start /belownormal /wait /b node render_slides.mjs claudemd 1 6"
//
// After rendering, writes contact_sheet.png (3 columns, 640x360 thumbnails) for that part's output folder
// via tools/contact_sheet.py (python + PIL).
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DRAFTS = path.resolve(__dirname, "..", "_drafts");
const SCALE = 4 / 3; // 1920x1080 -> 2560x1440

function outDirFor(part) {
  // One folder per part id under _drafts/render/ (legacy step02_* folders from the ax-site era are left
  // alone). The part id is also the Remotion composition id — see src/SlideRoot.tsx.
  return path.join(DRAFTS, "render", part);
}

async function main() {
  const [part, ...rest] = process.argv.slice(2);
  if (!part) {
    console.error("usage: node render_slides.mjs <part> [indices...]");
    process.exitCode = 1;
    return;
  }
  const requested = rest.map((n) => Number.parseInt(n, 10)).filter((n) => Number.isFinite(n));

  const compId = part;
  const outDir = outDirFor(part);
  mkdirSync(outDir, { recursive: true });

  console.log("bundling src/index.ts ...");
  const serveUrl = await bundle({
    entryPoint: path.resolve(__dirname, "src/index.ts"),
  });

  const composition = await selectComposition({ serveUrl, id: compId });
  const slideNames = composition.defaultProps?.slideNames;
  if (!Array.isArray(slideNames) || slideNames.length === 0) {
    throw new Error(`composition "${compId}" has no defaultProps.slideNames — is the part registered in src/slides/specs/registry.ts?`);
  }

  const slideNumbers = requested.length ? requested : slideNames.map((_, i) => i + 1);

  for (const n of slideNumbers) {
    const name = slideNames[n - 1];
    if (!name) {
      console.warn(`skip: no slide #${n} (part "${part}" has ${slideNames.length})`);
      continue;
    }
    const frame = n - 1; // frame N (0-based) = slide N+1
    const out = path.join(outDir, `${String(n).padStart(2, "0")}_${name.replace(/^\d+_/, "")}.png`);
    const t0 = Date.now();
    await renderStill({
      composition,
      serveUrl,
      output: out,
      frame,
      imageFormat: "png",
      scale: SCALE,
    });
    const ms = Date.now() - t0;
    console.log(`still #${n} -> ${out} (${(ms / 1000).toFixed(1)}s)`);
  }

  console.log("building contact sheet ...");
  const py = spawnSync("python", [path.resolve(__dirname, "tools/contact_sheet.py"), outDir], { stdio: "inherit" });
  if (py.status !== 0) {
    console.warn("contact sheet build failed (non-fatal) — see output above");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
