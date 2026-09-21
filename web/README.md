# web — AI 에이전트 수업 뷰어 (정본)

hw5511.github.io/ai-agent-class 에 배포되는 React 뷰어. Vite + React + TypeScript + Tailwind v4 + shadcn.

- 개발 서버: `npm run dev` (본부 PM2 `agentclass-web` = http://211.189.207.75:3080)
- 배포 빌드: `npm run build` (base `/ai-agent-class/`). 실제 배포는 `main` push 시 GitHub Actions 가 한다.
- 내용 검사: `node scripts/check-content.mjs` (0 errors 여야 배포된다)
- 슬라이드 데이터: `src/content/` (새 슬라이드) + `../courses/` (기존 이미지 슬라이드). 규칙 = `CONTENT_RULES.md`
- 작업 방법 전체 = 레포 루트 `AGENTS.md`
