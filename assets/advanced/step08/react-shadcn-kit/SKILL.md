---
name: react-shadcn-kit
description: Vite + React + TypeScript + Tailwind + shadcn/ui 로 UI 를 만들 때, 공식 shadcn 스킬이 다루지 않는 부분을 채운다. 디자인 결정, 접근성·품질 기준, 테스트, 브라우저 검증을 담당한다. "React 앱 만들어줘", "화면 만들어줘", "대시보드 만들어줘" 같은 요청에서 공식 스킬과 함께 발동한다.
---

# react-shadcn-kit — 공식 스킬이 안 하는 것만

이 세트는 **공식 shadcn 스킬과 함께 쓰는 것을 전제로 한다.**
컴포넌트를 어떻게 쓰는지는 공식이 정본이고, 이 세트는 그 바깥을 맡는다.

## 층 분담 — 겹치지 않는다

| 층 | 담당 |
|---|---|
| 컴포넌트 · 스타일 · 폼 | **공식 `shadcn` 스킬** |
| CLI · 레지스트리 · 프로젝트 세팅 | **공식 `shadcn` 스킬** |
| 디자인 결정 | `reference/design.md` |
| 접근성 · 품질 | `reference/interface.md` |
| 테스트 | `reference/testing.md` |
| 브라우저 검증 | `reference/verify.md` |

**공식 스킬이 없으면 먼저 설치한다.**

```bash
npx skills add shadcn-ui/ui --skill shadcn
```

컴포넌트 선택, `className` 사용법, 폼 구조, 스타일 토큰, CLI 명령은
**공식 스킬의 `rules/` 와 `cli.md` 를 따른다.** 이 세트는 그것을 다시 적지 않는다.

## 작업 순서

1. **설계를 먼저 말한다** — 무엇을 만들지, 화면 구조, 되돌리기 어려운 가정을 먼저 적는다.
2. **스캐폴딩 · 컴포넌트** → 공식 shadcn 스킬
3. **디자인 결정** → `reference/design.md`
4. **품질 점검** → `reference/interface.md`
5. **테스트** → `reference/testing.md`
6. **브라우저로 눈 확인** → `reference/verify.md`

## 유형별 라우팅

작업 성격을 보고 아래 문서를 열어 그 절차대로 실행한다.

- 색 · 타이포 · 레이아웃 결정 → `reference/design.md`
- 접근성 · 포커스 · 애니메이션 · 카피 → `reference/interface.md`
- 테스트 작성 → `reference/testing.md`
- 화면 확인 · 콘솔 에러 점검 · Playwright → `reference/verify.md`
- 컴포넌트 · 폼 · 스타일 · CLI → **공식 `shadcn` 스킬** (이 세트에 없다)

## 비협상 규칙

1. **`<div onClick>` 금지.** 동작은 `<button>`, 이동은 `<a>`.
2. **포커스 링을 지우지 않는다.** `outline-none` 을 쓰면 반드시 `focus-visible:ring-*` 로 대체한다.
3. **아이콘 전용 버튼에는 `aria-label`.** 장식 아이콘에는 `aria-hidden="true"`.
4. **빈 상태를 반드시 그린다.** "데이터가 없다"와 "조건에 맞는 게 없다"를 구분한다 — 다음 행동이 다르다.
5. **파괴적 동작에는 확인 또는 되돌리기.** 즉시 삭제하지 않는다.
6. **`transition: all` 금지.** 속성을 명시한다.
7. **`prefers-reduced-motion` 을 존중한다.**
8. **완료를 주장하기 전에 근거를 만든다.** 실행하지 않은 것을 "된다"고 말하지 않는다.
9. **화면은 눈으로 본다.** 완료 선언 전에 브라우저로 렌더 결과와 콘솔 에러를 반드시 확인한다.
   **Playwright MCP 가 설치되어 있지 않으면 사용자에게 설치해도 되는지 먼저 묻고, 승인받으면 직접 설치한 뒤 사용한다.**
   절차는 `reference/verify.md`. 브라우저를 열지 않았다면 "확인했다"고 쓰지 않는다.

## 목록 화면을 만들 때

화면이 여러 개면 **목록 로직을 한 곳에 모으고 화면은 컬럼 정의만 갖는다.**
URL 파라미터 이름(`q` · `sort` · `dir` · `page`)을 앱 전체에서 통일한다.
필터·정렬 상태는 URL 에 두고, 기본값과 같은 값은 주소에 쓰지 않는다.

## 자율 실행 시 (사람이 없을 때)

승인해 줄 사람이 없으면 설계 게이트를 다음으로 대체한다.

> 설계 선택과 그 근거를 **먼저 글로 명시**하고, 되돌릴 수 없는 가정은 문서로 남긴 뒤 진행한다.

승인 자체를 건너뛰는 것이지, 설계를 건너뛰는 것이 아니다.
