# 테스트 — Vitest + Testing Library

## 설정

```bash
npm i -D vitest @vitest/coverage-v8 jsdom \
  @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

**버전을 먼저 맞춘다.** vitest 는 자기 버전에 맞는 vite 를 물고 들어온다.
프로젝트의 vite 와 메이저가 어긋나면 `defineConfig` 타입이 충돌해 **빌드가 깨진다.**

| 프로젝트 vite | 써야 할 vitest |
|---|---|
| 5.x | 1.x ~ 2.x |
| 6.x | **3.x 이상** |
| 7.x | 4.x 이상 |

`vite.config.ts` 에 이어 붙인다 (Vite 설정을 그대로 공유한다).
`test` 키를 쓰려면 **`defineConfig` 를 `vitest/config` 에서 가져와야 한다** — `vite` 에서 가져오면 타입에 `test` 가 없다:

```ts
import { defineConfig } from 'vitest/config'   // ← 'vite' 아님
```


```ts
test: {
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.ts'],
  globals: true,
}
```

`src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

## 무엇을 테스트하는가

**사용자가 보는 것을 테스트한다.** 구현 세부가 아니라 동작이다.

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('카드를 추가하면 해당 컬럼에 나타난다', async () => {
  const user = userEvent.setup()
  render(<Board />)

  await user.click(screen.getByRole('button', { name: '할 일 추가' }))
  await user.type(screen.getByLabelText('제목'), '스킬 세트 정리')
  await user.click(screen.getByRole('button', { name: '추가' }))

  expect(screen.getByText('스킬 세트 정리')).toBeInTheDocument()
})
```

- 조회는 `getByRole` 우선. `getByTestId` 는 마지막 수단이다.
- **`getByRole(… { name })` 로 찾을 수 없다면 접근성이 깨진 것이다** — 테스트를 고치지 말고 컴포넌트를 고친다.
- 클릭·입력은 `fireEvent` 대신 `userEvent`.

## 반드시 덮는 경우

1. 빈 상태 — 데이터가 없을 때 무엇이 보이는가
2. 파괴적 동작 — 확인 없이 삭제되지 않는가
3. 필터 — 조건에 맞는 것만 남는가
4. 긴 입력 — 레이아웃이 깨지지 않는가

## 실행

```bash
npx vitest run          # 1회
npx vitest              # watch
npx vitest run --coverage
```

**실행하지 않은 테스트를 "통과한다"고 말하지 않는다.**
설치가 불가능한 환경이면 테스트 파일은 작성하되 "실행하지 못했다"고 명시한다.
