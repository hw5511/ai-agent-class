# Gaps — w5 (s2-read)

Things the schema (`web/src/content/schema.ts`) cannot express, hit while building `s2-read.json`.

- **s2-read-07** (`PDF 확장 설치 안내`): the spec shows an `Install`/`나중에` toast dialog overlaid on the
  VS Code window (the vscode-pdf install prompt). Schema's `VSCodeScreen` has no dialog/toast concept, only
  explorer files / editor / terminal. Kept the badge-1 note (file row) but dropped the badge for note 2
  ("Install 클릭") since there is nowhere to anchor it.
- **s2-read-08** (`PDF 확장 수동 설치`): the spec renders VS Code's Extensions sidebar (activity-bar icon →
  search box → install button in a list). `VSCodeScreen` only supports Explorer/Editor/Terminal, not an
  Extensions panel. Used `illustration` (`vscode-extensions-search`, picture TBD) as the closest template
  instead of inventing an extensions-panel field.
- **s2-read-09 / s2-read-13 / s2-read-16** (drag-and-drop slides): the spec draws a dashed drag-cue line +
  cursor icon from the Explorer row to the terminal input. Schema has no drag-line/cursor field — represented
  only the start (explorer file `badge`) and end (terminal `input.badge`) points, the connecting line itself
  is not expressible.
- **s2-read-13 / s2-read-14** (`사진도 드래그해서 건네기` / `사진 분석 결과`): the spec's VS Code editor pane
  shows the real practice photo (`IMG_20260309_134502.jpg`) previewed inline. Schema's `editor` field only
  supports `lines: string[]` (text), no image field, so no editor block was included for these two slides
  (file selection + terminal turns still carry the content). Separately, the real photo file itself is not
  yet copied into `web/public/shots/` (only exists under `slidekit2/public/slides/read/` and
  `assets/basic/step02/practice/_tmp/`), so even a `shot` fallback wasn't usable without adding that asset.
