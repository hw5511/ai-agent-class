#!/usr/bin/env bash
# react-shadcn-kit 설치 — 세트 복사 + 공식 shadcn 스킬 설치
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="${1:-$HOME/.claude/skills}"

echo "▸ 세트를 설치합니다 → $DEST/react-shadcn-kit"
mkdir -p "$DEST"
rm -rf "$DEST/react-shadcn-kit"
cp -r "$HERE" "$DEST/react-shadcn-kit"
echo "  완료 — SKILL.md + reference 문서 4장"

echo
echo "▸ 공식 shadcn 스킬을 설치합니다 (컴포넌트 · 스타일 · 폼 · CLI 담당)"
if command -v npx >/dev/null 2>&1; then
  npx --yes skills add shadcn-ui/ui --skill shadcn --agent '*' -y
else
  echo "  ✗ npx 를 찾지 못했습니다. Node.js 설치 후 아래를 직접 실행하세요:"
  echo "    npx skills add shadcn-ui/ui --skill shadcn"
  exit 1
fi

echo
echo "────────────────────────────────────────────"
echo "설치 완료. 두 스킬이 층을 나눠 맡습니다."
echo "  공식 shadcn  →  컴포넌트 · 스타일 · 폼 · CLI"
echo "  이 세트      →  디자인 · 접근성 · 테스트 · 브라우저 검증"
echo
echo "Claude Code 를 다시 열고 이렇게 시켜보세요:"
echo "  \"shadcn 기반으로 5페이지짜리 ERP 대시보드를 만들어줘\""
echo "────────────────────────────────────────────"
