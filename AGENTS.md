# AGENTS.md — ai-agent-class

## 레포 목적
AI 에이전트 강의 수업자료.

## 수업자료 수정 워크플로우 (필수)

수업 뷰어 `index.html` 은 **빌드 산출물**이다 — 직접 편집하지 말 것(덮어써짐, git 미추적).
`build.py` 가 **셸 템플릿 + 강의 데이터**를 조립해 생성한다.

**무엇을 고치냐에 따라 소스가 다르다:**

| 고치려는 것 | 만지는 파일 |
|---|---|
| 강의 내용 (제목·목표·토픽·실습 문구·링크) | `courses/{basic,advanced}/stepNN.json` |
| 슬라이드 이미지 (그림 자체) | `assets/{basic,advanced}/stepNN/*.svg` |
| 슬라이드 순서 | 해당 폴더의 `slides.json` (순서 권위) |
| 뷰어 디자인·기능 (색·레이아웃·버튼 동작) | `viewer.template.html` (`//__COURSES__` 마커에 데이터 주입) |

**기본 절차:**
1. 위 **소스만** 수정한다. (`index.html` 직접 수정 금지)
2. `python3 build.py` 로 `index.html` 재생성 → 브라우저로 열어 확인.
3. `courses/`·`assets/`·`viewer.template.html`·`build.py` 변경분을 커밋·push.
4. `main` push → GitHub Actions 가 `build.py` 실행 후 GitHub Pages 자동 배포.

**주의:**
- 슬라이드 이미지 교체 시 `slides.json` 순서와 `stepNN.json` 의 `imagePath` 가 일치해야 함(어긋나면 404·순서 뒤바뀜).
- 배포 링크: 수업자료 `…/ai-agent-class/`, 상담자료 `…/ai-agent-class/consultation/`.
- 폐기된 일회성 스크립트는 `_archive/` 에 격리됨 — 재사용 금지. 현역 빌드는 루트 `build.py` 하나.

## 로컬 작업 에스컬레이션 (필수)

이 레포는 원격/클라우드 에이전트가 작업할 수 있다.
**원격 세션에서 해결 불가능한 — 로컬 머신 또는 특정 실행 환경 접근이 필요한 작업**
(로컬 파일시스템 / 로컬 프로세스·배포 / 자격증명 등)이 필요하면 직접 막히지 말고
아래 방법으로 에스컬레이션한다.

**방법**:
1. 이 레포에 GitHub 이슈 또는 PR 을 생성한다.
2. **label = `유키`** (필수).
3. 제목 접두사 `[유키-LOCAL]`.
4. 본문에 필요한 작업을 구체적으로 적는다 — 무엇을 / 왜 / 기대 결과.

담당자가 감지하여 처리한 뒤 해당 이슈/PR 에 회신한다.
