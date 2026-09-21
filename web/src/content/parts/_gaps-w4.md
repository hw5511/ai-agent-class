# Gaps — w4 (s2-review, s2-claudemd)

- `s2-review-03` (agent1 폴더 만들기): spec is a desktop right-click "새로 만들기 → 폴더" context-menu
  mockup, not a real screenshot and not a vscode/terminal/shot screen. No matching template — used
  `illustration` (`new-folder-desktop-menu`). The 2 badges from the spec (menu item, folder icon)
  are dropped since `illustration` has no badge mechanism.
- `s2-review-04` (작업 폴더 열기): spec shows the VS Code File menu open plus an OS folder-picker
  dialog over it. Schema's `vscode` screen only has explorer/terminal/editor, no menu-bar or native
  dialog concept. Used `illustration` (`vscode-open-folder-dialog`).
- `s2-review-05` (Ctrl+J 로 터미널 열기): spec shows the VS Code chat panel with a close (X) button
  plus a floating "Ctrl+J" keycap graphic. Schema has no chat-panel or keycap concept. Used
  `illustration` (`vscode-close-chat-ctrl-j`).
- `s2-review-06` (터미널 패널 오른쪽 배치): spec shows the terminal tab's right-click context menu
  with a "패널 위치 → 오른쪽" submenu. No context-menu concept in schema. Used `illustration`
  (`terminal-panel-position-menu`).
- `s2-review-11` (브라우저에서 계정 선택): spec is a Google account-picker mockup inside a browser
  chrome window — not a real screenshot (`shot`) and not a vscode/terminal screen. Used
  `illustration` (`google-account-picker`).
- `s2-claudemd-06` / `s2-claudemd-07` (.claude 폴더 만들기 / CLAUDE.md 파일 만들기): spec shows the
  explorer's "New Folder"/"New File" toolbar icon being clicked, with an inline rename box. Schema's
  `VSCodeScreen.files` has no header-icon or inline-editing concept, so that click/typing moment is
  approximated with a `files` entry carrying the final name + a badge; the icon-click note (note 1
  in each slide) has no visual anchor.
- `s2-claudemd-08` (CLAUDE.md 내용 작성): spec also shows a top `InputBar` with the full prompt text
  being typed, plus an unsaved "dirty dot" indicator on the editor tab. Schema's `editor` field has
  no dirty-state flag, so the "저장까지 눌러야 반영" note has no visual anchor (badge omitted).
