# Gaps — w3 (s1-codex, s1-claude-login, s1-claude-practice, s1-wrap)

- `s1-wrap-01`, `s1-wrap-02`: the spec renders these as an Explorer-only VS Code window with
  `showTerminal={false}` (`layout="bottom"`, no terminal panel at all). The schema's `VSCodeScreen.terminal`
  field is required, so both slides carry a `vendor: "shell"` terminal with empty `turns` (renders as a
  blank panel) instead of no terminal. No fabricated dialogue was added.
- `s1-claude-login-10` ("대화 전에 기본 세팅 두 가지"): the spec embeds the real screenshot
  (`claude_기본_세팅.png`) inside a VS Code terminal-panel mockup. Per rule 5 (never replace a real
  screenshot with a mockup) this JSON uses `screen.kind: "shot"` directly instead of reproducing the
  VS Code wrapper.
- `s1-wrap-02`: the spec's AnnotationColumn has 4 items but the rule caps notes at 3 per slide. Merged
  "VS Code 터미널 제어 숙달" and "터미널 상태 구분 능력 확보" into one note ("공통 4단계 + 터미널 제어 숙달").
