---
name: react-shadcn-kit
description: Vite + React + TypeScript + Tailwind + shadcn/ui 로 UI 를 만들 때 쓴다. 컴포넌트 스캐폴딩, 화면 설계, 접근성·품질 기준, 테스트까지 한 세트로 다룬다. "React 앱 만들어줘", "화면 만들어줘", "컴포넌트 추가해줘" 같은 요청에서 발동한다.
---

# React + shadcn/ui 제작 세트

이 세트는 **하나의 스택을 기본값으로 못박는다.** 매번 무엇을 쓸지 고르지 않는다.

## 기본 스택 (협상하지 않는다)

| 층 | 선택 | 대안을 쓰지 않는 이유 |
|---|---|---|
| 빌드 | **Vite** | 프레임워크 중립, 설정이 가장 적다 |
| 언어 | **TypeScript** | `any` 금지, props 는 전부 타입을 쓴다 |
| 스타일 | **Tailwind CSS** | shadcn/ui 가 Tailwind 를 전제한다 |
| 컴포넌트 | **shadcn/ui** (Radix 기반) | 복붙 소유 방식 — 의존성이 아니라 내 코드가 된다 |
| 아이콘 | **lucide-react** | shadcn 기본값 |
| 테스트 | **Vitest** + Testing Library | Vite 와 설정을 공유한다 |

**CSS 엔진은 하나만 돌린다.** UnoCSS·styled-components·CSS Modules 를 Tailwind 와 섞지 않는다.

## 작업 순서

1. **설계를 먼저 말한다** — 무엇을 만들지, 화면 구조, 쓸 shadcn 컴포넌트 목록을 먼저 적는다. 코드보다 먼저다.
2. **스캐폴딩** → `reference/stack.md`
3. **컴포넌트 작성** → `reference/components.md`
4. **디자인 결정** → `reference/design.md`
5. **품질 점검** → `reference/interface.md`
6. **테스트** → `reference/testing.md`
7. **브라우저로 눈 확인** → `reference/verify.md`
8. **완료 선언 전 점검** → `reference/process.md`

## 유형별 라우팅

작업 성격을 보고 아래 문서를 열어 그 절차대로 실행한다.

- 새 프로젝트 시작 · 설정 파일 → `reference/stack.md`
- 컴포넌트 추가 · 상태 관리 · 폼 → `reference/components.md`
- 색·타이포·레이아웃 결정 → `reference/design.md`
- 접근성 · 포커스 · 애니메이션 · 카피 → `reference/interface.md`
- 테스트 작성 → `reference/testing.md`
- 화면 확인 · 콘솔 에러 점검 · Playwright → `reference/verify.md`
- 계획 수립 · 완료 검증 → `reference/process.md`

## 비협상 규칙 (전 문서 공통)

1. **`<div onClick>` 금지.** 동작은 `<button>`, 이동은 `<a>`.
2. **포커스 링을 지우지 않는다.** `outline-none` 을 쓰면 반드시 `focus-visible:ring-*` 로 대체한다.
3. **아이콘 전용 버튼에는 `aria-label`.** 장식 아이콘에는 `aria-hidden="true"`.
4. **빈 상태를 반드시 그린다.** 배열이 비었을 때 깨진 화면을 렌더하지 않는다.
5. **파괴적 동작에는 확인 또는 되돌리기.** 즉시 삭제하지 않는다.
6. **`transition: all` 금지.** 속성을 명시한다.
7. **`prefers-reduced-motion` 을 존중한다.**
8. **완료를 주장하기 전에 근거를 만든다.** 실행하지 않은 것을 "된다"고 말하지 않는다.
9. **화면은 눈으로 본다.** 완료 선언 전에 브라우저로 렌더 결과와 콘솔 에러를 반드시 확인한다.
   **Playwright MCP 가 설치되어 있지 않으면 사용자에게 설치해도 되는지 먼저 묻고, 승인받으면 직접 설치한 뒤 사용한다.**
   절차는 `reference/verify.md`. 브라우저를 열지 않았다면 "확인했다"고 쓰지 않는다.

## 자율 실행 시 (사람이 없을 때)

원본 Superpowers 의 brainstorming 스킬은 **사람의 승인 전까지 구현을 금지**한다.
승인을 받을 사람이 없는 자율 실행에서는 그 게이트를 다음으로 대체한다:

> 설계 선택과 그 근거를 **먼저 글로 명시**하고, 되돌릴 수 없는 가정은 문서로 남긴 뒤 진행한다.

승인 자체를 건너뛰는 것이지, 설계를 건너뛰는 것이 아니다.
