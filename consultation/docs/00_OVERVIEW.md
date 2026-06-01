# AI Agent Lecture

AI 에이전트 커리큘럼 발표자료 프로젝트

## Stack

- 순수 HTML + CSS (프레임워크 없음)
- Modular 섹션 시스템 (sections/*.html -> build.py -> 단일 HTML 조립)
- GitHub Pages 배포 대상 (웹 랜딩페이지 형태)

## Structure

```
22_ai_agent_lecture/
|-- build.py              # 빌드 스크립트 (섹션 조립 + standalone)
|-- package.json          # npm dev server (live-server + chokidar)
|-- manifest.json         # 섹션 메타데이터 (순서, 활성화 등)
|-- config.json           # 프로젝트 설정
|-- sections/             # 섹션 HTML (12개)
|   |-- 01_hero.html              # 표지
|   |-- 02_what_is_agent.html     # AI 에이전트란?
|   |-- 03_ai_vs_agent.html       # 일반 AI vs 에이전트
|   |-- 04_agent_status.html      # 에이전트 현황
|   |-- 05_agent_future.html      # 에이전트 미래
|   |-- 06_curriculum_roadmap.html # 커리큘럼 로드맵
|   |-- 07_basic_curriculum.html   # 기초 커리큘럼
|   |-- 08_advanced_curriculum.html # 심화 커리큘럼
|   |-- 09_lecture_features.html   # 강의 특징
|   |-- 10_agent_demo.html        # 에이전트 시연
|   |-- 11_qa.html                # 수강생 질문
|   +-- 12_use_cases.html         # 응용사례
|-- css/
|   +-- style_portrait.css  # 메인 스타일 (랜딩페이지용)
|-- components/             # 재사용 CSS 컴포넌트 (20_presentation에서 복사)
|-- assets/                 # 이미지 등
|-- _build/                 # 빌드 결과물
|   |-- ai_agent_lecture.html            # 개발용 (외부 CSS 참조)
|   +-- ai_agent_lecture_standalone.html  # 배포용 (CSS/이미지 내장)
+-- docs/                   # 프로젝트 문서
```

## Commands

```bash
# 개발 서버 (live reload)
npm run dev

# 빌드 (섹션 조립)
npm run build

# 배포용 빌드 (CSS inline + 이미지 base64)
npm run build:standalone
```

## Design

- 각 섹션 = 100vh x 100vw 풀스크린 블록
- scroll-snap으로 섹션 단위 스크롤
- 반응형: 1024px / 768px 브레이크포인트
- 컨텐츠 max-width: 1200px (가독성)
- 컴포넌트: Hero, Section, Card, Grid, Badge, Table, Findings
