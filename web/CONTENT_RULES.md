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

Step 8 surfaces (each drawn from a real capture; see `schema-claude.ts`, `schema-site.ts`, `schema-phone.ts`):
`desktop` (the Claude desktop app, `view`), `web` (a Chrome window: `url`, `tabs`, `page` = claude.ai/code body, a GitHub /
Google / claude.com page, or a page `image`), `phone` (Claude Code on the web, mobile view). A slide never shows a state of
these apps that no capture shows.

## Visuals first (CEO 2026-09-21: "시각적인게 약하다")

- A slide about products, tools or brands shows them: `cards` with the brand logo (`/logos/*.svg`,
  `/brand/*-wordmark.png`) and a real screenshot when one exists (`/brand/*-screen.png`, `/shots/*`).
- A process is a `flow`, not a table. A "ask a chatbot / search the web" step is a `chat` / `browser` screen.
- Tools and concepts without a brand use `logo: "icon:<Name>"` (Read, Write, Edit, Bash, Folder, Terminal,
  Globe, Search, Settings, Shield, Lock, Cpu, Brain, Bot, Chat, Keyboard, Click, Book, Zap, Upload, Download, Undo,
  History, Cloud, Monitor, Phone, Commit, Merge, Star).
- `table` only for genuinely tabular facts (mode x permission, setting x value). Never as the only visual
  of a concept slide.

## Colour (CEO 2026-09-21)

- No warm off-white. The old ax-site "paper" token `#f0efec` (and its cousins `#f6f6f4`, `#f3f3f1`,
  `#d5d2cc`) read as yellowish grey and are banned.
- Surfaces are pure white. Anything that needs to stand apart gets a thin neutral border
  (`border-neutral-200`), not a fill. The one exception is the dark product mockups (terminal, VS Code).
- Emphasis = the blue accent as a border or badge, never a tinted background.

## Concept slides: editorial minimalism (CEO 2026-09-26: "세련되면서 미니멀리즘해야해 여백같은것도 느낌있게")

Cards, flow, table and illustration slides follow one look:
- Type does the work: big bold labels, a short muted line under them. Thin rules (2px ink to open a block,
  hairlines to separate) instead of boxes, pills, shadows or tinted fills.
- The content block sits in the lower part of the body on one optical line (free space split 3:1 above/below,
  at least 64px bottom margin). Whitespace above it is intentional; never a small group floating in the centre.
- No clip-art: no cartoon people, clouds, devices, magnifiers, stars, and no lucide icons on cards/flows
  (`icon:` logos are ignored there; brand logos stay). Illustrations are drawn with type, rules, dots and real
  brand marks only.
- Numbers on cards/flows are flat mono numerals (01 02) in the accent colour. When a slide has badges, only the
  badged items show a number (the badge number = the note number); otherwise every item shows its position.
- Illustration SVGs: `viewBox="0 0 1792 840"`, Pretendard for Korean (an `<img>` SVG cannot load webfonts),
  a monospace stack only for ASCII code, content roughly y 320..770.

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

## Notes body — spoken explanation (CEO 2026-09-22, second revision; overrides the body part below)

- `head` stays a short keyword title (rules below still apply to it).
- `body` is a detailed explanation spoken to the student in polite Korean, 1-3 sentences, concrete:
  what to press or type, what they will see, why. e.g. "~해보세요", "~를 ○○하면 ○○하게 할 수 있습니다".
- No dashes in either. The gate checks the keyword rule on `head` only.

## Notes tone — keywords, no AI 말투 (CEO 2026-09-22)

"뭐뭐한다 뭐뭐한다. 뭐뭐 했다 이거 ai말투라고" / "문장형태가 아닌 '키워드'식으로 하라 했잖니"

Notes are keywords, not sentences. The 해라체 report voice ("~한다. ~했다.") and dash chains read as
machine-written, and a 해요체 sentence is still a sentence. The gate (`scripts/check-content.mjs`) fails
any note head or body that ends in 다 / 요 / 니다, ends with a period, or contains — / –.

- head: a short keyword phrase, what to look at or do. e.g. "확인 없이 계속 진행", "Enter 로 실행"
- body: a short keyword phrase too (about 30 characters), ending on a noun or noun form. e.g. "요청마다 확인 없이 진행"
- no dashes, no "A → B → C" chains (a single arrow in a menu path like 파일 → 폴더 열기 is fine)
- keep the facts, commands, file names and button labels exact

| AI 말투 (금지) | 키워드 |
| --- | --- |
| 매번 안 물어본다 / auto mode — 요청마다 확인 없이 이어서 진행한다. | 확인 없이 계속 진행 / 요청마다 묻지 않고 바로 진행 |
| 그래도 감시자가 있다 / 화면 뒤에서 각 도구 호출을 계속 판정한다 — 위험해 보이면 그 자리에서 멈춘다. | 뒤에서 지켜보는 감시자 / 위험한 작업은 실행 전 정지 |
| 로그인 성공 메시지 확인 / 성공 메시지가 뜨면 로그인이 끝난 것이다. | 로그인 성공 메시지 / 이 메시지가 뜨면 로그인 완료 |
