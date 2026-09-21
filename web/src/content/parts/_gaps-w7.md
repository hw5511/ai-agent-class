# Gaps — w7 (s2-bash, s2-wrap)

- **s2-bash-07** (`만든 파일 찾아서 실행`, 테트리스 실행 결과): spec shows a hand-drawn Chrome-window
  Tetris canvas mock (`TetrisMock`), not a real screenshot. No real capture exists in
  `slidekit2/public` or `assets/`. Schema has no generic mockup screen type for this, so the slide
  only shows the VS Code / Claude terminal side; the browser-with-running-tetris visual is dropped.
- **s2-bash-09** (`바탕화면 위젯 동작 확인`, 슬라임 결과): spec is a hand-drawn desktop mock
  (`SlimeDesktopMock`) showing a drag path + right-click menu — no real screenshot exists. Used
  `template: "illustration"` with id `desktop-slime-widget` as a placeholder; the actual picture
  still needs to be made.
- **s2-wrap-02** (`에이전트 동작 루프`): spec draws a real vector loop diagram (4 boxes + dashed
  loop-back arrow: 사용자 지시 → 작성 → 실행 → 확인 → 다시). Used `template: "illustration"` with id
  `agent-work-loop` as a placeholder; the actual diagram still needs to be made.
- **s2-wrap-03** (`ChatGPT 와 무엇이 다른가`): left side of the spec is a plain chat-bubble mockup
  labelled "ChatGPT" — not a VS Code/terminal/shot screen. Schema's `Terminal.vendor` only supports
  `claude | antigravity | codex | shell`, so `vendor: "shell"` was used as the closest stand-in;
  it renders as a generic shell prompt, not an actual chat-bubble UI.

## Not gaps (for the record — resolved within schema)

- **s2-bash-06 / s2-bash-10**: dir listing / system-info text output are plain text, not real
  screenshots — represented with `compare` + a `terminal` screen showing the exact lines from the
  spec (`TerminalTextPanel` in the spec). No image needed.
- **s2-bash-11** (웹캠): a real capture exists at `slidekit2/public/slides/bash/webcam_shot.png`
  (referenced by the spec via `staticFile`). Copied to `web/public/shots/bash-webcam.png` and used
  with `screen.kind: "shot"`.
