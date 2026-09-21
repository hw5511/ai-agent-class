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
| `illustration` | `illustration` (library id) |
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
