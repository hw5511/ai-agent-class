# -*- coding: utf-8 -*-
"""cli-image: codex / agy 에게 이미지를 만들게 하고 결과 파일을 가져온다.

두 CLI 는 이미지를 자기 폴더에 저장하고 경로만 말로 알려준다. 게다가 요청한 확장자와
실제 저장 형식이 다를 수 있다(agy 는 png 로 부탁해도 jpg 로 낸다). 그래서 이 스크립트는
"실행 전 스냅샷 -> 실행 -> 새로 생긴 파일 찾기" 방식으로 결과를 확정한다.

사용:
    python cli_image.py --tool agy --prompt "새벽 강가의 러너" --out run.png
    python cli_image.py --tool agy --prompt "제품 컷" --aspect 16:9 --out hero.png
    python cli_image.py --tool codex --prompt "다른 포즈" --ref face.png --out pose.png
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import time
from pathlib import Path

EXTS = {".png", ".jpg", ".jpeg", ".webp"}
CODEX_DIR = Path.home() / ".codex" / "generated_images"
AGY_DIR = Path.home() / ".gemini" / "antigravity-cli" / "brain"


def out(text: str) -> None:
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):
        pass
    print(text)


def snapshot(root: Path) -> set[Path]:
    if not root.exists():
        return set()
    return {p for p in root.rglob("*") if p.suffix.lower() in EXTS}


def newest_new(root: Path, before: set[Path]) -> Path | None:
    after = snapshot(root)
    fresh = [p for p in after - before if p.stat().st_size > 0]
    if not fresh:
        return None
    return max(fresh, key=lambda p: p.stat().st_mtime)


def run(cmd: list[str], timeout: int) -> tuple[int, str]:
    exe = shutil.which(cmd[0])
    if not exe:
        return 127, f"{cmd[0]} 명령을 찾을 수 없다. 설치와 PATH 를 확인하라."
    try:
        p = subprocess.run([exe] + cmd[1:], capture_output=True, timeout=timeout)
    except subprocess.TimeoutExpired:
        return 124, f"{timeout}초 안에 끝나지 않았다."
    return p.returncode, (p.stdout + b"\n" + p.stderr).decode("utf-8", "replace").strip()


def main() -> int:
    ap = argparse.ArgumentParser(description="CLI 로 이미지 만들기")
    ap.add_argument("--tool", choices=["codex", "agy"], required=True)
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--ref", action="append", default=[])
    ap.add_argument("--aspect", default="")
    ap.add_argument("--timeout", type=int, default=300)
    a = ap.parse_args()

    refs = [Path(r).resolve() for r in a.ref]
    for r in refs:
        if not r.exists():
            out(f"참조 이미지가 없다: {r}")
            return 2

    ask = a.prompt
    if a.aspect and a.tool == "agy":
        ask += f"\n화면비는 {a.aspect} 로 만들어라."
    if refs:
        ask += "\n다음 참조 이미지를 사용해 같은 인물/사물을 유지하라: " + \
               ", ".join(p.as_posix() for p in refs)
    ask = "이미지를 한 장 생성하라. 설명하지 말고 생성 도구를 실제로 실행하라.\n" + ask

    root = CODEX_DIR if a.tool == "codex" else AGY_DIR
    before = snapshot(root)
    t0 = time.time()

    if a.tool == "codex":
        cmd = ["codex", "exec", "--sandbox", "read-only", "--skip-git-repo-check"]
        for r in refs:
            cmd += ["-i", str(r)]
        cmd += [ask]
    else:
        cmd = ["agy", "-p", ask, "--dangerously-skip-permissions",
               "--print-timeout", f"{a.timeout}s"]

    rc, log = run(cmd, a.timeout)
    made = newest_new(root, before)
    if made is None:
        out(f"[실패] 새로 만들어진 이미지를 찾지 못했다 (rc={rc}, {time.time()-t0:.0f}초)\n"
            f"CLI 출력:\n{log[:1500]}")
        return 1

    # 실제 형식에 맞춰 확장자를 고친다 — agy 는 png 로 부탁해도 jpg 를 낸다.
    dest = Path(a.out)
    if dest.suffix.lower() != made.suffix.lower():
        dest = dest.with_suffix(made.suffix)
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(made, dest)
    out(f"저장 완료: {dest.as_posix()} ({dest.stat().st_size // 1024}KB, "
        f"{time.time()-t0:.0f}초, 원본 {made.name})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
