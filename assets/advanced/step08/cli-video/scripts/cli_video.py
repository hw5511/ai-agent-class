# -*- coding: utf-8 -*-
"""cli-video: agy(Gemini)에게 동영상 파일을 그대로 읽혀 분석시킨다.

프레임을 뽑을 필요가 없다 — 영상 파일 경로를 넘기면 모델이 직접 본다.

사용:
    python cli_video.py --video ad.mp4 --task "샷 단위로 정리해줘"
    python cli_video.py --video ad.mp4 --task-file prompt.txt --out report.md
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import time
from pathlib import Path


def out(text: str) -> None:
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):
        pass
    print(text)


def main() -> int:
    ap = argparse.ArgumentParser(description="영상을 Gemini 에게 읽혀 분석한다")
    ap.add_argument("--video", required=True)
    ap.add_argument("--task", default="")
    ap.add_argument("--task-file", default="")
    ap.add_argument("--model", default="gemini-3.1-pro-high")
    ap.add_argument("--out", default="")
    ap.add_argument("--timeout", type=int, default=600)
    a = ap.parse_args()

    video = Path(a.video).resolve()   # 상대경로면 CLI 가 못 찾는 경우가 있다
    if not video.exists():
        out(f"영상 파일이 없다: {video}")
        return 2

    task = a.task
    if a.task_file:
        tf = Path(a.task_file)
        if not tf.exists():
            out(f"지시문 파일이 없다: {tf}")
            return 2
        task = tf.read_text(encoding="utf-8", errors="replace")
    if not task.strip():
        out("--task 또는 --task-file 이 필요하다.")
        return 2

    prompt = (f"다음 경로의 동영상 파일을 직접 열어서 끝까지 본 뒤 답하라. "
              f"프레임을 따로 추출하지 말고 영상 파일 자체를 읽어라.\n"
              f"영상: {video.as_posix()}\n\n{task}")

    exe = shutil.which("agy")
    if not exe:
        out("agy 명령을 찾을 수 없다. 설치와 PATH 를 확인하라.")
        return 127

    # 권한 플래그가 없으면 헤드리스에서 도구가 자동 거부되어 빈 답이 온다.
    cmd = [exe, "-p", prompt, "--model", a.model,
           "--dangerously-skip-permissions", "--print-timeout", f"{a.timeout}s"]
    t0 = time.time()
    try:
        p = subprocess.run(cmd, capture_output=True, timeout=a.timeout + 60)
    except subprocess.TimeoutExpired:
        out(f"{a.timeout}초 안에 끝나지 않았다. 긴 영상이면 --timeout 을 늘려라.")
        return 124

    body = p.stdout.decode("utf-8", "replace").strip()
    if len(body) < 30:
        err = p.stderr.decode("utf-8", "replace").strip()
        out(f"[실패] 답이 비어 있다 (rc={p.returncode}, {time.time()-t0:.0f}초)\n{err[:1500]}")
        return 1

    if a.out:
        dest = Path(a.out)
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(body, encoding="utf-8")
        out(f"저장 완료: {dest.as_posix()} ({len(body)}자, {time.time()-t0:.0f}초)")
    else:
        out(body)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
