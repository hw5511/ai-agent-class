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
| `image` | `src` — legacy rendered slides only |
