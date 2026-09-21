# Content rules — web viewer

The site is data: `src/content/schema.ts` is the contract, JSON under `src/content/sessions/<course>/stepNN.json`
is the content. Writing a lesson means writing JSON; no page code changes per lesson.

## Structure

```
course -> session (goal, practice) -> part (table of contents) -> slide -> action box
```

## The one rule for slides (CEO 2026-09-21)

**The slide area is visuals only. Explanations go to the right panel.**

| On the slide | In the right panel |
|---|---|
| a keyword title (noun phrase, no sentence) | `notes`: numbered head + one-line body per point |
| screenshot / mockup (`screen`) | `action`: copy / link / download |
| two screens (`compare`) with a short label each | session goal and practice (automatic) |
| a table with short cells (`table`) | |
| a diagram or illustration (`illustration`) | |
| numbered badges on the visual, matching `notes` | |

- No paragraphs, captions or bullet explanations on the slide.
- A badge number on the visual always has a note with the same number; a note with `"!"` is a tip.
- Table cells are keywords, commands or yes/no, never sentences.

## Templates

| template | fields |
|---|---|
| `screen` | `screen` (vscode / terminal / shot) |
| `compare` | `left`, `right`: `{ label, screen }` |
| `table` | `columns`, `rows: { cells, highlight? }` |
| `illustration` | `illustration` — path to a static SVG in `public/illustrations/` |
| `overview` | `items: { label, meta?, current? }` |
| `cards` | `cards: { label, logo?, image?, tags?, badge?, highlight? }` — products/tools/options side by side |
| `flow` | `steps: { label, sub?, logo?, badge? }`, `loop?` — a process as boxes and arrows |
| `image` | `src` — legacy rendered slides only |

Screens also include `chat` (`app`, `logo?`, `messages`) and `browser` (`url`, `results?` or `page?`).

## Visuals first (CEO 2026-09-21: "시각적인게 약하다")

- A slide about products, tools or brands shows them: `cards` with the brand logo (`/logos/*.svg`,
  `/brand/*-wordmark.png`) and a real screenshot when one exists (`/brand/*-screen.png`, `/shots/*`).
- A process is a `flow`, not a table. A "ask a chatbot / search the web" step is a `chat` / `browser` screen.
- Tools and concepts without a brand use `logo: "icon:<Name>"` (Read, Write, Edit, Bash, Folder, Terminal,
  Globe, Search, Settings, Shield, Lock, Cpu, Brain, Bot, Chat, Keyboard, Click, Book, Zap).
- `table` only for genuinely tabular facts (mode x permission, setting x value). Never as the only visual
  of a concept slide.

## Colour (CEO 2026-09-21)

- No warm off-white. The old ax-site "paper" token `#f0efec` (and its cousins `#f6f6f4`, `#f3f3f1`,
  `#d5d2cc`) read as yellowish grey and are banned.
- Surfaces are pure white. Anything that needs to stand apart gets a thin neutral border
  (`border-neutral-200`), not a fill. The one exception is the dark product mockups (terminal, VS Code).
- Emphasis = the blue accent as a border or badge, never a tinted background.

## Illustrations (CEO 2026-09-21)

- Static vector illustrations only (SVG in `public/illustrations/`), centred in the slide. **No animation** in
  the lecture slides.
- First choice: the illustration the original deck already had (`_archive/stepNN-svg/*.svg`), cut out as its
  own SVG with the deck's blue swapped to the accent `#1273c4` and the font to Pretendard.

## Action box (CEO 2026-09-21)

Only three uses: **download a file**, **open a link** (link icon), **copy a prompt or a command**.
Never a key press (Enter, arrows, Ctrl+C, Shift+Tab, Ctrl+J), never a bare folder/file name — those belong
in the notes. One line per item; longer values are cut off with an ellipsis and still copy in full.

## Notes text (CEO 2026-09-22: "이런 문장은 대체 왜 넣어두는거야")

Each note says what the student sees or does on this slide, in plain words. Never write:
- claims that do not match the slide (the prompt is not 존댓말, so do not call it one; a result slide
  shows the same prompt the slide before typed)
- jargon a beginner does not need: 자연어, PATH, 패턴, 옵션 names, 시스템 프롬프트
- filler about the phrasing itself: "한 줄로", "한 문장으로", "직접 눈으로 검증", "한눈에 보인다"
- navigation or wrap-up: "다음 슬라이드에서", "다음은 종료", "실습 완료"
- a second note that repeats the first
If a note has nothing left to say, delete it and the matching badge on the slide.
