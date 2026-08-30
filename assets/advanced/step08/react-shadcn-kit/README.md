# react-shadcn-kit

Vite + React + TypeScript + Tailwind + shadcn/ui 로 UI 를 만들 때 쓰는 스킬 세트입니다.
AI 에이전트 심화 과정 8회차 실습 자료.

## 설치

압축을 풀고 폴더째 스킬 디렉터리에 넣습니다.

```bash
# 프로젝트 단위로 쓸 때
mkdir -p .claude/skills
cp -r react-shadcn-kit .claude/skills/

# 어디서나 쓰고 싶을 때
cp -r react-shadcn-kit ~/.claude/skills/
```

Claude Code 를 다시 열면 `SKILL.md` 의 description 을 보고 알아서 발동합니다.

## 구조

```
react-shadcn-kit/
├── SKILL.md              스택 기본값 + 라우팅 + 비협상 규칙 9개
└── reference/
    ├── stack.md          스캐폴딩 (Vite · Tailwind · shadcn)
    ├── components.md     컴포넌트 선택과 작성 규칙
    ├── design.md         색 · 타이포 · 시그니처 결정
    ├── interface.md      화면 품질 기준 (접근성 · 포커스 · 카피)
    ├── testing.md        Vitest + Testing Library
    ├── verify.md         브라우저로 눈 확인 (Playwright)
    └── process.md        계획 → 조각 → 검증
```

`SKILL.md` 는 짧게 유지하고, 실제 절차는 `reference/` 문서로 나눠 두었습니다.
Claude 는 작업 성격에 맞는 문서만 열어봅니다 — 7회차에서 만든 `notion-work` 스킬과 같은 구조입니다.

## 출처

이 세트는 아래 공개 스킬들을 이 스택에 맞게 압축·조합한 것입니다.

- `obra/superpowers` — 계획 · TDD · 완료 전 검증
- `anthropics/skills` 의 `frontend-design` — 디자인 결정
- `vercel-labs/web-interface-guidelines` — 화면 품질 기준 (`interface.md` 는 이 원문)
- `antfu/skills` 의 `vite` · `vitest` — 빌드 · 테스트 툴링

## 주의

스킬은 에이전트의 행동 지시서입니다. 쓰기 전에 `SKILL.md` 와 `reference/` 를 직접 읽어보세요.
이 세트에는 스크립트가 없고 마크다운 문서만 들어 있습니다.
