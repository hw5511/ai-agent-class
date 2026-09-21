# AI Agent Class — 작업 할 일 목록 (TODO)

## 현재 상태 (2026-09-22)
- ✅ shadcn 뷰어(`web/`)를 정본으로 교체 — hw5511.github.io/ai-agent-class 가 이 빌드다. 공개 과정 = basic · advanced.
- ✅ basic 1~4회차 새 슬라이드로 CEO 검수 완료 (4회차 = 세션 · context · 백그라운드, 10개 파트 78장).
- ⏭ 다음: basic 5회차(Sub Agent와 Hooks)부터 새 슬라이드로 재작성 — 그 전까지 5~8회차와 advanced 는 기존 이미지 슬라이드 + 액션박스로 나간다.


## ~~1. CLI 설치 과정 실제 캡처 이미지로 슬라이드 교체~~ ✅ 완료
- **완료**: `b6e7394` 커밋에서 처리됨.
- `assets/clis/agy/` 및 `assets/clis/claude/`의 실제 터미널 캡처 PNG를 base64로 SVG에 인라인 embed.
- 슬라이드 16~19 (`agy_설치`, `agy_PATH_오류`, `agy_PATH_등록`, `agy_PATH_반영_및_실행`)
- 슬라이드 51~54 (`claude_설치`, `claude_PATH_오류`, `claude_PATH_등록`, `claude_PATH_반영_및_실행`)
- SVG 프레임(BASIC 01 배지, 제목, 터미널 창 크롬, 각주)은 유지.

---

## ~~2. 액션박스 macOS 지원 및 PATH 안내 개선~~ ✅ 완료
- **완료**: `b6e7394` 커밋에서 처리됨.
- **step01.json 변경 내역**:
  - 슬라이드 13: 터미널 단축키 `Ctrl + J` (Windows) / `Cmd + J` (macOS) 액션박스 추가
  - 슬라이드 18: agy PATH 등록 — `items` 분기(Windows PowerShell / macOS zshrc)
  - 슬라이드 19: agy PATH 갱신 및 실행 — `items` 분기
  - 슬라이드 53: claude PATH 등록 — `items` 분기
  - 슬라이드 54: claude PATH 갱신 및 실행 — `items` 분기
- **step05.json 변경 내역**:
  - 슬라이드 8: Hook 알림 — Windows BurntToast + macOS osascript `display notification` 분기

---

## ~~3. 서브링크(#해시) 이동 및 액션박스 동기화 버그 수정~~ ✅ 완료
- **완료**: `0c9e938` 커밋에서 처리됨.
- **viewer.template.html 변경 내역**:
  - `window.addEventListener('hashchange', handleHashChange)` 추가로 페이지 내 서브링크 클릭, 주소창 해시 변경, 브라우저 뒤로가기/앞으로가기 시 슬라이드 및 액션박스 즉시 동기화.
  - `readHash()` 정규화: `step01`, `slide13` 등 문자열 포함 서브링크에서도 숫자 추출 방어코드 적용.
  - `renderSlides()` 최적화: 링크 접속 시 해당 슬라이드 이미지 즉시 로드(1번 슬라이드 깜빡임 및 로딩 지연 방지).
  - 인디케이터 닷(dot) 클릭 시 액션박스 갱신(`updateDescPanel()`) 및 URL 해시 동기화(`pushHash()`) 누락 수정.
  - `DOMContentLoaded` 시 빌드 내장 데이터를 활용하여 0초 즉시 렌더링하도록 개선.
