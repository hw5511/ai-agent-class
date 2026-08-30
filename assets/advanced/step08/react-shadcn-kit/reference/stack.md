# 스캐폴딩 — Vite + React + TS + Tailwind + shadcn/ui

## 생성 순서

```bash
npm create vite@latest <app> -- --template react-ts
cd <app>
npm i -D tailwindcss @tailwindcss/vite
npm i class-variance-authority clsx tailwind-merge lucide-react
npx shadcn@latest init
npx shadcn@latest add button card dialog input select badge
```

의존성을 설치할 수 없는 환경이라면 **위 명령을 README 에 적고 소스는 그대로 작성한다.**
설치하지 않았다는 사실을 숨기지 않는다.

## 반드시 있어야 할 파일

```
<app>/
├── package.json
├── vite.config.ts          @tailwindcss/vite 플러그인 + @ alias
├── tsconfig.json           paths: { "@/*": ["./src/*"] }
├── components.json         shadcn 설정 (style, aliases)
├── index.html
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css           @import "tailwindcss"; + 테마 토큰
    ├── lib/utils.ts        cn() 헬퍼
    └── components/ui/      shadcn 컴포넌트 (내 코드다)
```

## vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
})
```

## lib/utils.ts — 이 파일 없이는 shadcn 컴포넌트가 동작하지 않는다

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## index.css — 테마 토큰

색을 컴포넌트에 직접 쓰지 않는다. **토큰을 정의하고 토큰만 참조한다.**

```css
@import "tailwindcss";

@theme {
  --color-background: <light 배경>;
  --color-foreground: <light 본문>;
  --color-muted: <보조 배경>;
  --color-muted-foreground: <보조 텍스트>;
  --color-border: <경계선>;
  --color-primary: <강조>;
  --color-primary-foreground: <강조 위 텍스트>;
}
```

다크 모드가 필요하면 `<html>` 에 `color-scheme` 을 세팅하고 토큰만 재정의한다.
컴포넌트 안에서 `dark:` 로 색을 하드코딩하지 않는다.
