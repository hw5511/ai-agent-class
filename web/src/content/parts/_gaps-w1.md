# Gaps — w1 (s1-agent, s1-env, s1-agy-install, s1-agy-login)

- `s1-agent-02` (3대 CLI 에이전트 비교): spec shows 3 real per-CLI logo+screenshot cards side by
  side. Schema has no "3-up card" template (compare only takes 2, screen/shot only one src) — used
  `table` (CLI / 제작사 / 특징) instead. Real screenshots not shown on this slide as a result.
- `s1-agent-03/04/05` (웹 검색으로 명령어 찾기 / AI 채팅 질문 → 직접 실행 / 명령 자동 감지·실행
  방식): spec draws a browser+terminal flow with numbered badges pinned on specific mock elements.
  `illustration` template (used here) has no badge mechanism at all, so the 2 badges per slide from
  the spec are dropped — notes keep the numbering but nothing on the (future) picture will show the
  matching badge dot. Flag for whoever builds these illustrations: badges need to be baked into the
  artwork itself.
- `s1-env-02` (VS Code 설치): spec is a hand-drawn browser/download-page mockup, not a real
  screenshot and not a vscode/terminal screen. No matching template — used `illustration`
  (`vscode-download-page`).
- `s1-env-04` (실습 폴더 에이전트1): CEO asked this to show the PROCESS (make folder → File > Open
  Folder) but the schema has no Windows file-explorer / folder-picker mock. Used `table` (단계 /
  동작, 4 steps) per CEO's fallback guidance. No visual folder-picker exists in the viewer today.
- `s1-env-05` (Ctrl+J로 터미널 열기): spec's Ctrl/J keycap graphic sits beside the VS Code mockup as
  a separate illustration; `ScreenSlide` only carries one `screen` field, so the keycap visual itself
  is dropped — the shortcut is covered only via the action box (already present in the session JSON:
  Ctrl+J / Cmd+J) and slide title, not a picture of the keys.
