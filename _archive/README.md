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

## `gen/` — 슬라이드 SVG 생성 스크립트

`assets/**/make_*.py` 는 SVG를 **한 번 찍어내고 버린** 생성기다. 찍어낸 SVG가
정본이고, 스크립트는 그 시점 스냅샷이라 이후 SVG를 손으로 고치면 곧바로 낡는다.
다시 돌리면 최신 수정을 **조용히 덮어쓴다.**

| 폴더 | 원래 용도 | 폐기 사유 |
|---|---|---|
| `gen/advanced-step03/` | ADV 03 슬라이드 SVG 생성 (`make_slides.py` → `make_adv03.py` → `make_adv03_v2.py`) | 세 파일이 서로 다른 낡은 인증 스코프 목록을 갖고 있음 — `…,docs,tasks` / `…,docs,youtube,forms` / 현재 정본은 `drive,gmail,calendar,docs,sheets,slides,forms,tasks` |

> `assets/` 아래에 아직 같은 성격의 `make_*.py` 가 남아 있다. 해당 회차 슬라이드를
> 손으로 고친 뒤에는 그 폴더의 생성기도 여기로 옮길 것.
