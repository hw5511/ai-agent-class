# _archive — 폐기된 일회성 스크립트 보관소

아래 스크립트들은 **현재 빌드 파이프라인에서 사용되지 않는다.** 과거 1회성 작업에
쓰였고, 이력 보존 목적으로만 남겨둔다. (유키 로컬 조사 #9 결과로 폐기 판정)

현역 파이프라인은 루트 `build.py` 하나뿐이다 — `courses/*.json` → `index.html`의
`const COURSES = {…}` 블록 재생성.

| 파일 | 원래 용도 | 폐기 사유 |
|---|---|---|
| `extract_courses.js` | `courses/` 디렉터리 최초 부트스트랩(1회용) | 지금은 `build.py`가 반대 방향(JSON→HTML)을 수행 |
| `patch_index.py` | `index.html` 텍스트 일괄 치환 | `C:/woohee_dev/...` 부재 경로 하드코딩, 일회성 |
| `reorder_steps.py` | step01~08 SVG 번호 정렬 | 일회성, 이미 적용 완료 |

> 새 작업에 재사용하지 말 것. 필요하면 내용만 참고하고 새로 작성한다.
