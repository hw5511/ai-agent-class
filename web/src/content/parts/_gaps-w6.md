# Gaps — w6 (s2-write, s2-edit)

Schema has no "native app window" screen kind, only `vscode` / `terminal` / `shot`. The following
result slides show a hand-drawn tkinter mock in the spec (CalculatorMock / TetrisV1Board / TetrisMock
components), not a real screenshot — no PNG exists in `slidekit2/public` or `assets/basic/step02` for
these. Closest template used: `screen` showing only the VS Code + Claude Code terminal transcript;
the actual calculator/tetris window visual is dropped rather than faked.

- `s2-write-13` ("창이 뜹니다"): calculator.py result window (tkinter) has no screenshot asset.
- `s2-write-14` ("같은 방식으로 테트리스"): tetris.py first-version result window (tkinter) has no
  screenshot asset.
- `s2-edit-03` ("테트리스 개선 요청"): the "current" tetris board shown for context in the spec has no
  screenshot asset (same tkinter mock as write-14).
- `s2-edit-04` ("Read Edit 작업 로그"): the "after 3 edits" tetris board shown in the spec has no
  screenshot asset.

`s2-edit-05` ("테트리스 개선 전후") avoided this gap by describing the before/after as a `table`
(시작 버튼/블록/화면 크기 rows) instead of picturing both tkinter mocks.
