# react-shadcn-kit

Vite + React + TypeScript + Tailwind + shadcn/ui 로 UI 를 만들 때 쓰는 스킬 세트입니다.
AI 에이전트 심화 과정 8회차 실습 자료.

**이 세트는 혼자 쓰지 않습니다.** 공식 shadcn 스킬과 짝을 이룹니다.

## 설치 — 한 번에

```bash
unzip react-shadcn-kit.zip
./react-shadcn-kit/install.sh
```

세트를 `~/.claude/skills/` 에 복사하고, **공식 shadcn 스킬까지 함께 설치**합니다.
다른 위치에 넣으려면 경로를 인자로 주세요: `./react-shadcn-kit/install.sh ./.claude/skills`

### 직접 하려면

```bash
mkdir -p ~/.claude/skills
cp -r react-shadcn-kit ~/.claude/skills/
npx skills add shadcn-ui/ui --skill shadcn
```

## 왜 둘로 나뉘어 있나

shadcn 팀이 만든 공식 스킬(`shadcn-ui/ui`)이 컴포넌트·스타일·폼·CLI 를 이미 아주 잘 다룹니다.
같은 층을 이 세트가 또 다루면 **Claude 가 매번 다른 쪽을 고릅니다.**

그래서 겹치는 부분을 덜어냈습니다.

| 층 | 담당 |
|---|---|
| 컴포넌트 · 스타일 · 폼 | 공식 `shadcn` 스킬 |
| CLI · 레지스트리 · 프로젝트 세팅 | 공식 `shadcn` 스킬 |
| **디자인 결정** | 이 세트 — `reference/design.md` |
| **접근성 · 품질** | 이 세트 — `reference/interface.md` |
| **테스트** | 이 세트 — `reference/testing.md` |
| **브라우저 검증** | 이 세트 — `reference/verify.md` |

## 구조

```
react-shadcn-kit/
├── SKILL.md              층 분담 + 라우팅 + 비협상 규칙 9개
├── install.sh            세트 + 공식 스킬 한 번에 설치
└── reference/
    ├── design.md         색 · 타이포 · 시그니처 (AI 기본값 피하기)
    ├── interface.md      접근성 · 포커스 · 애니메이션 · 카피
    ├── testing.md        Vitest + Testing Library (버전 짝 주의)
    └── verify.md         브라우저로 눈 확인 (Playwright)
```

`SKILL.md` 는 짧게 유지하고 실제 절차는 `reference/` 로 나눴습니다.
Claude 는 작업 성격에 맞는 문서만 열어봅니다 — 7회차에서 만든 `notion-work` 과 같은 구조입니다.

## 출처

- `interface.md` 는 `vercel-labs/web-interface-guidelines` 원문입니다
- `design.md` 는 `anthropics/skills` 의 `frontend-design` 을 압축한 것입니다
- `testing.md` · `verify.md` 는 `obra/superpowers` 의 검증 원칙을 이 스택에 맞춘 것입니다

## 주의

스킬은 에이전트의 행동 지시서입니다. 쓰기 전에 `SKILL.md` 와 `reference/` 를 직접 읽어보세요.
이 세트에는 스크립트가 `install.sh` 하나뿐이고 나머지는 마크다운 문서입니다.
