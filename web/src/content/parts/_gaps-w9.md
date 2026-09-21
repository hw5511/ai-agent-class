# Gaps — w9 (s3-config, s3-model, s3-websearch, s3-chrome)

Schema cannot express these; picked the closest template and listed here per CONTENT_RULES worker brief rule 10.

## s3-config

- **s3-config-01 / 03 / 04 / 06** (`/config`, `Language 한국어`, `/status`, `/usage`): the spec renders these as a
  dark Ink-style scrollable row-list panel inside the VS Code terminal pane (`RowListPanel`), with per-row
  badges and a highlighted/editing row. `TableSlide` has no per-cell `badge` field, so I used `table` +
  `highlight` on the referenced row, but the note numbers (1/2/"!") no longer point at an exact visual mark
  the way a real badge would. Real product screenshots of `/config`, `/status`, `/usage` would fix this.
- **s3-config-05** (`/login 으로 본인 계정`): spec itself marks this `CAPTURE PENDING` (verbatim account-picker
  text NOT FOUND). No real screenshot exists in `web/public/shots/`. Used `illustration` id
  `login-account-picker` — picture still needed.

## s3-websearch

- **s3-websearch-01** (`할루시네이션`): spec combines two concept cards (clock/warning icons) with a real
  terminal exchange below. A slide can only carry one visual, so I kept the real terminal turns (`screen`)
  and moved the concept explanation into `notes`; the two icon cards themselves are dropped.
- **s3-websearch-02** (`웹서치 툴`): spec's two `CompareCard`s (WebSearch/WebFetch) are plain label+icon+desc,
  not real product `Screen`s, so `CompareSlide` (which requires a `Screen` on each side) doesn't fit. Used
  `table` instead.
- **s3-websearch-03** (`최근 7일 AI 트렌드`): `Terminal.input` only carries one `badge`, but the spec's card
  row numbers this moment 1/2/"!" for three different phrases inside the same one prompt. Only note 1 has a
  matching visual badge; notes 2 and "!" have no separate anchor point.
- **s3-websearch-04** (`주요 뉴스 3건`): spec's right-side `ResultPanel` (3 numbered news cards with
  headline+body) has no schema equivalent. Folded the 3 news items into the slide's `notes` instead of a
  visual panel — the 2 badges actually on the visual (`screen.terminal.turns`) mark the WebSearch tool call
  and the assistant's summary line, not the news items themselves, so badge numbers and note numbers here
  describe different things by necessity.

## s3-chrome

- **s3-chrome-01** (`웹서치가 못 보는 것`): spec's two-panel compare (웹서치 결과 card with a lock/login-wall
  mock vs. 브라우저 조작 card with a fake login form) is custom illustration, not a real `Screen`, so
  `CompareSlide` doesn't fit. Used `table`.
- **s3-chrome-02** (`브라우저를 쥔 AI`): custom diagram (Claude icon reaching into a browser tab via a dashed
  control line) — no diagram template in the schema. Used `illustration` id `claude-controls-browser`;
  picture still needed.
- **s3-chrome-03 / 04** (`Add to Chrome`, `확장 설치`): these two actually **do** have real screenshots already
  in `web/public/shots/` (`chrome_소개_페이지.png`, `chrome_웹스토어.png`) even though the spec file still
  wraps them in `CapturePendingBox`. Used `screen.kind: "shot"` with those files — not a gap, noting it
  because the spec text says CAPTURE PENDING but the asset already exists.
- **s3-chrome-05** (`확장에서 클로드 로그인`): spec marks `CAPTURE PENDING` (extension popup login screen), no
  screenshot exists. Used `illustration` id `chrome-extension-login`.
- **s3-chrome-06** (`크롬 전부 껐다 켜기`): custom 3-step icon diagram (window stack → X → refresh) with
  connecting arrows — no step-diagram template. Used `table` (3 rows) instead.
- **s3-chrome-08** (`/chrome · Status: Enabled`): spec marks `CAPTURE PENDING` — exact row text for the
  `/chrome` panel (Status/Extension/Browser/Select browser… labels) is NOT FOUND in the facts sheet either.
  Per brief guidance used the closest mockup (`screen.kind: "vscode"`, `terminal.vendor: "claude"`) with
  plausible status lines, but this text is **not verified real product copy** — needs a real `/chrome`
  capture to confirm exact wording before shipping.
- **s3-chrome-09 / 10 / 11 / 12 / 13 / 14**: all marked `CAPTURE PENDING` in spec, no screenshots exist yet.
  Used `illustration` placeholders: `chrome-installed-page`, `chrome-tab-group`, `chrome-challenge-2`,
  `chrome-challenge-3`, `gmail-compose`, `gmail-sent-confirmation`. All still need real captures per the
  spec's own `TODO-CAPTURE` comments.
