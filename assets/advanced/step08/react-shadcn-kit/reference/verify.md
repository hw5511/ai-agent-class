# 눈으로 확인하기 — 브라우저를 열어 검증한다

**코드가 컴파일된다는 것과 화면이 제대로 나온다는 것은 다른 말이다.**
완료를 선언하기 전에 실제로 렌더된 화면을 보고, 콘솔 에러가 없는지 확인한다.

타입체크와 테스트만으로는 다음을 잡지 못한다:
레이아웃 깨짐 · 대비 부족 · 겹침 · 폰트 폴백 · 다크 모드에서 안 보이는 텍스트 ·
런타임 에러 · 하이드레이션 경고 · 이미지 404.

## 시작: Playwright MCP 가 있는지부터 확인한다

```
Playwright MCP 도구가 붙어 있는가?
├─ 있다  ────────────────────────────→ 경로 1 로 바로 검증한다
└─ 없다
   ├─ 사람과 대화 중인가?
   │   ├─ 예 → 【반드시 먼저 묻는다】 → 승인 → 스스로 설치 → 경로 1
   │   │                              └ 거절 → 경로 2 (다시 묻지 않는다)
   │   └─ 아니오(서브에이전트·자동 실행) → 묻지 말고 경로 2
```

### 설치되어 있지 않으면 — 묻고, 승인받고, 직접 설치한다

**임의로 설치하지 않는다. 먼저 허락을 구한다.** 이렇게 묻는다:

> "결과 화면을 직접 열어 확인하려면 Playwright MCP 가 필요한데 지금 설치되어 있지 않습니다.
> `claude mcp add playwright -- npx @playwright/mcp@latest` 로 추가해도 될까요?
> 브라우저를 띄워 렌더 결과와 콘솔 에러를 확인하는 용도이고, 브라우저를 조작할 수 있는 권한이 생깁니다."

**승인받으면 내가 직접 실행한다.** 사용자에게 대신 치라고 시키지 않는다.

```bash
claude mcp add playwright -- npx @playwright/mcp@latest
```

- 추가된 서버의 도구는 **세션을 재시작하지 않아도** 그 턴 안에서 쓸 수 있다.
  아직 연결 중이면 도구를 호출하는 시점에 연결이 끝날 때까지 기다린다.
- 설치가 끝나면 **경로 1 로 이어서 실제 검증까지 마친다.** 설치만 하고 끝내지 않는다.
- 설치가 실패하면 실패 사실을 적고 경로 2 로 간다.
- **거절당하면 그대로 존중한다.** 다시 묻지 않고 경로 2 를 쓴다.

## 경로 1 — Playwright MCP 로 검증

```
1. 개발 서버를 띄운다        npm run dev
2. 페이지로 이동한다          browser_navigate
3. 화면을 본다                browser_snapshot 또는 browser_take_screenshot
4. 콘솔을 읽는다              browser_console_messages
5. 주요 흐름을 클릭해 본다     browser_click / browser_type
6. 다시 3~4 를 반복한다
```

**최소한 이 네 가지는 직접 보고 확인한다:**

- [ ] 첫 화면이 의도대로 그려지는가 (빈 상태 포함)
- [ ] 콘솔에 error/warning 이 없는가
- [ ] 핵심 동작 하나를 실제로 클릭해서 끝까지 되는가
- [ ] 좁은 폭(375px)에서 레이아웃이 깨지지 않는가

## 경로 2 — Playwright 스크립트 (MCP 없이)

MCP 없이도 검증할 수 있다. 이 방식은 설정이 필요 없다.

```bash
npm i -D playwright        # 또는 이미 설치된 브라우저를 재사용
```

```js
// verify.mjs
import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

const problems = []
page.on('console', m => { if (m.type() === 'error') problems.push(m.text()) })
page.on('pageerror', e => problems.push('PAGEERROR: ' + e))
page.on('response', r => { if (r.status() >= 400) problems.push(r.status() + ' ' + r.url()) })

await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
await page.screenshot({ path: 'shot-desktop.png' })

await page.setViewportSize({ width: 375, height: 800 })
await page.screenshot({ path: 'shot-mobile.png' })

console.log(problems.length ? problems.join('\n') : '문제 없음')
await browser.close()
```

**스크린샷을 찍었으면 실제로 읽어본다.** 파일을 만들어 놓고 안 보는 것은 검증이 아니다.

**브라우저가 이미 있으면 새로 받지 않는다.** 먼저 찾아본다:

```bash
echo $PLAYWRIGHT_BROWSERS_PATH
ls $PLAYWRIGHT_BROWSERS_PATH 2>/dev/null || ls ~/.cache/ms-playwright 2>/dev/null
find / -name 'chrome' -path '*chrome-linux*' 2>/dev/null | head -1
```

찾았으면 그 경로를 넘긴다:

```js
chromium.launch({ executablePath: '<찾은 경로>' })
```

`playwright` 모듈이 전역에만 있으면 `NODE_PATH=$(npm root -g) node verify.mjs` 로 실행한다.

## 보고할 때

무엇을 **실제로 봤는지**와 **못 본 것**을 나눠서 쓴다.

```
확인함  — 데스크톱/모바일 첫 화면 렌더, 콘솔 에러 0건, 카드 추가→이동 흐름
못 봄   — 다크 모드, 키보드 탭 순서, 스크린리더 낭독
```

**브라우저를 열지 않았다면 "화면을 확인했다"고 쓰지 않는다.**
경로 1~2 중 어느 것도 불가능한 환경이면, 그 사실을 그대로 적는다.
