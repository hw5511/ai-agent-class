# AGENTS.md — ai-agent-class

## 레포 목적
AI 에이전트 강의 수업자료.

## 정본 = `web/` React 뷰어 (shadcn 버전, 2026-09-22 교체)

**hw5511.github.io/ai-agent-class 는 `web/` 을 빌드한 사이트다.** 예전 `viewer.template.html` +
`build.py` 로 만든 `index.html` 뷰어는 더 이상 배포되지 않는다(`build.py` 는 설명회용
`overview/index.html` 만 계속 만든다). 공개 과정은 **basic · advanced** 두 개뿐이다
(automation 은 `courses/automation/` 에 데이터만 남기고 사이트에서 숨김 — `web/src/content/load.ts` 의 `COURSE_ORDER`).

**슬라이드는 데이터다.** 두 종류가 한 뷰어에 섞여 나온다:

| 종류 | 위치 | 설명 |
|---|---|---|
| 새 슬라이드 (CEO 검수 완료: basic 1~4회차) | `web/src/content/sessions/<course>/stepNN.json` + `web/src/content/parts/<part-id>.json` | 템플릿 + 목업 화면 + 설명(notes) + 액션박스. 회차 파일은 파트 id 목록만 갖는다 |
| 기존 슬라이드 (basic 5~8회차, advanced 전체) | `courses/<course>/stepNN.json` + `assets/...` 이미지 | 옛 덱을 그대로 이미지 슬라이드로 보여주고 액션박스를 붙인다. 같은 회차에 새 세션 파일이 생기면 그쪽이 대체한다 |

**새 슬라이드를 고칠 때:**
1. 규칙 = `web/CONTENT_RULES.md` (시각요소만 슬라이드에 · 설명은 키워드로 notes 에 · 번호 배지 = notes 번호).
2. `node web/scripts/check-content.mjs` 가 0 errors 여야 한다 (배지↔설명 짝 · 문장형 제목 · AI 말투 검사).
3. 확인은 본부 개발 서버 http://211.189.207.75:3080 (PM2 `agentclass-web`, `web/` 의 vite dev) 에서 한다.
4. 목업 화면 부품 = `web/src/components/mock/` (VSCodeMock · AgentTerminal · WebMocks), 필드 정의 = `web/src/content/schema.ts`.
5. 공용 그림 = `web/public/illustrations/*.svg`, 캡처 = `web/public/shots/`. JSON 에는 `/illustrations/x.svg` 처럼 루트 경로로 적는다
   (배포 하위경로 `/ai-agent-class/` 는 `asset()` 이 붙인다 — `web/src/lib/utils.ts`).

**배포:** `main` 에 push → GitHub Actions(`.github/workflows/deploy.yml`) 가 내용 검사 → `web` 빌드(base `/ai-agent-class/`)
→ `assets/` 를 빌드 옆에 복사 → consultation · playwright_demo · overview 와 함께 Pages 배포.
- `web/public/assets` 는 로컬 전용 정션(→ `../assets`)이다. CI 에는 없고 워크플로가 `assets/` 를 복사한다.
- 회차 0(`[목업] 새 슬라이드 구조 시연`)은 개발 서버에만 보이고 배포본에서는 빠진다.
- 배포 링크: 수업자료 `…/ai-agent-class/`, 상담자료 `…/ai-agent-class/consultation/`, 설명회 `…/ai-agent-class/overview/`.

**기존(이미지) 슬라이드 주의:** 이미지 교체 시 `slides.json` 순서와 `stepNN.json` 의 `imagePath` 가 일치해야 한다.
흐름에서 뺀 슬라이드는 지우지 말고 같은 폴더의 `_archive/` 로 옮긴다. `tools/slidekit.py`·`slidekit2/` 는 옛 이미지 슬라이드 제작 도구다.

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

## Code Map (생성된 구조 지도)

이 레포의 파일·의존성 구조 지도는 `.understand-anything/knowledge-graph.json`에 있다(로컬 전용, `.gitignore` 처리 — 노트북 비비만 생성/보유, 커밋 안 함).
파일 구조·함수 역할·의존성 흐름을 파악할 땐 **수동 탐색 전에** 이 그래프나 `/understand-chat`을 먼저 본다.

- 생성: 2026-07-09 (Understand-Anything, 한국어) · 노드 129 · 엣지 162 · 레이어 6 · 언어 python/javascript/html/css/markdown/json/yaml/powershell
- 레이어: 코어 빌드 · 배포 · 강의 커리큘럼 데이터 · Basic 슬라이드 생성 자산 · Advanced 슬라이드 생성 자산 · 상담·랜딩 페이지 · 도구 스크립트 · 실습 데모
- 갱신: 구조 대변경(새 모듈·파일 이동·public API/라우트 변경·대형 리팩터·데이터흐름 변경) 시 `/understand . --full` 재실행. 카피/주석/스타일/문서-전용/단발 버그픽스엔 갱신 불필요.
