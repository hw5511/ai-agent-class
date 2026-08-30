# 웹 코드 스킬 세트

Claude 가 웹 화면을 제대로 만들게 하는 스킬 **2개** 입니다.
AI 에이전트 심화 과정 8회차 실습 자료.

## 설치 — 폴더를 넣기만 하면 됩니다

압축을 풀면 폴더 **2개**가 나옵니다. 둘 다 스킬 폴더에 넣으세요.

```bash
unzip web-skills.zip
mkdir -p ~/.claude/skills
cp -r react-shadcn-kit shadcn ~/.claude/skills/
```

Finder·탐색기에서 끌어다 놓아도 됩니다. 넣을 곳은 이 폴더입니다.

- macOS · Linux — `~/.claude/skills/`
- Windows — `C:\Users\<사용자>\.claude\skills\`

Claude Code 를 다시 열면 끝입니다. **설치 명령이나 인터넷 연결은 필요 없습니다.**

## 잘 들어갔는지 확인

```bash
ls ~/.claude/skills/
```

`react-shadcn-kit` 와 `shadcn` 두 개가 보이면 됩니다.

## 써보기

Claude Code 에서 그냥 말하면 됩니다.

```
5페이지 정도 규모의 ERP 대시보드 만들어줘
```

스킬 이름을 부를 필요가 없습니다. Claude 가 알아서 두 스킬을 꺼내 씁니다.

## 두 스킬이 하는 일

| 스킬 | 담당 |
|---|---|
| **`shadcn`** (공식) | 어떤 컴포넌트를 어떻게 쓰는가 — 버튼·표·폼·다이얼로그, 스타일 규칙, CLI |
| **`react-shadcn-kit`** | 공식이 안 다루는 것 — 디자인 결정, 접근성, 테스트, 브라우저로 눈 확인 |

층이 나뉘어 있어 서로 싸우지 않습니다.
`react-shadcn-kit` 은 컴포넌트 사용법을 **일부러 적지 않았습니다** — 공식이 정본이기 때문입니다.

## react-shadcn-kit 구조

```
react-shadcn-kit/
├── SKILL.md              층 분담 + 라우팅 + 비협상 규칙 9개
└── reference/
    ├── design.md         색 · 타이포 · 시그니처 (AI 티 안 나게)
    ├── interface.md      접근성 · 포커스 · 애니메이션 · 카피
    ├── testing.md        Vitest + Testing Library
    └── verify.md         브라우저로 눈 확인 (Playwright)
```

`SKILL.md` 는 짧게 두고 실제 절차는 `reference/` 로 나눴습니다.
Claude 는 필요한 문서만 열어봅니다 — 7회차에서 만든 `notion-work` 과 같은 구조입니다.

## 출처

- **`shadcn`** — shadcn 팀 공식 스킬. `shadcn-ui/ui` 레포에서 그대로 가져왔습니다 (MIT).
  최신판을 받으려면 `npx skills add shadcn-ui/ui --skill shadcn`
- `interface.md` — `vercel-labs/web-interface-guidelines` 원문
- `design.md` — `anthropics/skills` 의 `frontend-design` 압축
- `testing.md` · `verify.md` — `obra/superpowers` 의 검증 원칙을 이 스택에 맞춘 것

## 주의

스킬은 에이전트의 행동 지시서입니다. 쓰기 전에 `SKILL.md` 를 직접 읽어보세요.
두 스킬 모두 **마크다운 문서만** 들어 있고 실행되는 스크립트는 없습니다.
