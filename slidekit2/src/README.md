# step02 slide parts — worker guide

Each lesson part is its own file `specs/step02-<part>.tsx`, exporting `STEP02_<PART>_PART: PartSpec`
(`{ id, eyebrow, entries }`, see `specs/types.ts`). `specs/registry.ts` lists all five parts (review,
claudemd, read, write, bash) — the only shared file; once your part's stub is listed you never edit it again.

## Add a slide
1. Add a `SlideXX: React.FC` in your part file. Wrap everything in `<SlideFrame index={N} total={TOTAL}
   eyebrow={EYEBROW} title="...">...</SlideFrame>` (`TOTAL`/`EYEBROW` are your file's own consts).
2. Push `{ index, name, title, render }` onto your `STEP02_<PART>` array (`name` = plan file base name,
   becomes the output PNG name).
3. Render: `node render_slides.mjs <part> [indices...]` (from this dir; omit indices for all). Output ->
   `C:/woohee_industries/30-프로젝트/ai-agent-class/_drafts/step02_<part>/` (claudemd keeps
   `step02_claudemd_v1`), plus `contact_sheet.png` there.

## Components
- `SlideFrame` — the 1920x1080 frame (eyebrow/title/body slot). Always required.
- `AnnotationColumn` — right-side numbered card stack (`items: {number, head, body?}[]`).
- `FocusBadge` — the one blue numbered circle per callout, pinned at the exact UI spot (center x/y).
- `InputBar` — "이렇게 입력해보세요" typed-prompt bar.
- `VSCodeScreen` — the mock VS Code window. `layout="right"` + `terminalContent={<ClaudeCodeTerminal .../>}`
  is this deck's standard (panel position: right).
- `ClaudeCodeTerminal` — dark terminal mock. Props: `turns` (user/assistant), `inputText`, `leftGutter`
  (space for a badge inside the panel). `layoutClaudeCodeTerminal(...)` gives the same line math to
  place badges without covering text.

## Badge placement
Exactly one blue `FocusBadge` per UI element called out, centered on that exact spot — never floating.
Numbers must match the `AnnotationColumn` item numbers for the same step.

## Design rules
- Tokens only: colors/fonts from `../assets/_core/tokens` (COLORS/FONTS), never hardcoded hex/px families.
- Fonts: Pretendard (titles/headers), Spoqa Han Sans Neo (body), D2Coding (terminal/code) — nothing else.
- 12-column grid (`./grid.ts` colX/colW), body slot y 250..1000. One blue accent everywhere; Claude
  orange (`#D97757`) only inside the ClaudeCodeTerminal welcome box.
- VS Code mock is always dark; terminal panel docked on the right (`layout="right"`).
- Fill the body slot top to bottom — no dead space, no overflow past BODY_BOTTOM.
- Korean text wraps on word boundaries (`wordBreak: "keep-all"`), never mid-syllable.
- No tofu: only glyphs the three loaded fonts cover.

## CEO direction log (read before building any slide)
These are the CEO's own corrections while building step02. They are standing rules for every later part and step.

| Date | CEO said (gist) | Rule it sets |
|---|---|---|
| 09-17 | "2장에서 vscode 다크모드로 해줘야하는디" | Every VS Code mockup is dark mode. |
| 09-17 | "claude 실행한 목업 UI도 만들어서 재사용" | Claude Code screens always use the shared `ClaudeCodeTerminal`; no one-off terminal drawings. |
| 09-17 | "CLAUDE.md 자동로드 / 네가지 항목 슬라이드가 왜 필요한지… 쓸데없는 슬라이드가 늘어났지?" | Slides map 1:1 to the CEO's lesson outline (`ai-agent-class/_drafts/basic_step02_outline.md`). No extra explainer, summary or recap slides; do not copy old SVG decks. Split a step into several slides only where the outline says so. |
| 09-18 | (review) install command was npm | Content must match what the class really teaches: Claude Code install is `irm https://claude.ai/install.ps1 \| iex`. Check commands against `ai-agent-class/courses/*/stepNN.json`. |
| 09-18 | "read툴 실습에서 실제 그 이미지를 가운데에 넣어주고, 드래그하는 마우스의 선도 보여주고" | Use the real practice files (from the class repo's practice zip) in the editor area, large and centered. Drag actions show a dashed drag line from the explorer row to the drop target (terminal input) with a cursor. |
| 09-18 | "생성물은 서브에이전트나 sonnet보고 실제로 한번 시켜보고 나온 결과물을 옮겨서 넣어봐. tkinter는 직접 그린다던가. 카드들을 아래로 보내고 결과물을 우측 공간에 전부" | Results shown on slides come from actually running the practice prompt (headless `claude -p --model sonnet`) and screenshotting the output (html/svg/md). Programs that open native windows (tkinter, games) are redrawn by hand from their real code (layout, colors, labels). Result slides: VS Code left, result large on the right, annotation cards in a horizontal row below. |
| 09-18 | "맥북은 오류가 날 수 있다 부분은 그 주소를 들어가서 본문을 읽고, 오류 발생시 클로드에게 보낼 프롬프트를 써놔야지 링크를 넣는 게 아니라" | Never put a reference URL on a slide as the fix. Read the source, then give students the ready-to-paste prompt for Claude (e.g. Mac tkinter: check `python3 --version`, `brew install python-tk@<version>`, rerun). |
| 09-18 | "write 파트 좋아 좋아" | Approved reference for result-style slides: `specs/step02-write.tsx`. |

General lessons from review rounds:
- A badge never covers text, digits or a button label; put it at the edge or in the terminal gutter (`BADGE_GUTTER`).
- Long terminal input lines do not wrap: shorten them rather than let them clip.
- When cards are few, they go in the bottom row at normal size; never squeeze them into narrow columns.
- Render only through the one-at-a-time lock (one render process at a time, below-normal priority).
