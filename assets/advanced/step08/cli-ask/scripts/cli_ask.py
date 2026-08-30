# -*- coding: utf-8 -*-
"""cli-ask: 다른 AI CLI(codex / agy)에게 메시지를 보내고 답을 받아온다.

왜 스크립트로 감싸는가
  1) 윈도우에서 CLI 출력을 그냥 받으면 한국어와 이모지가 깨진다. 여기서는 바이트로 받아
     UTF-8 로 직접 디코딩하고, 출력 스트림도 UTF-8 로 다시 연다.
  2) 두 CLI 는 플래그 체계가 서로 다르다(모델 지정 방식, 이어하기 방식, 권한 플래그).
     그 차이를 여기서 흡수해서 사용하는 쪽은 --tool 만 바꾸면 되게 한다.
  3) agy 는 권한 플래그가 없으면 아무것도 하지 않고 조용히 끝난다. 항상 붙여준다.

사용:
    python cli_ask.py --tool codex --message "이 코드의 버그를 찾아줘"
    python cli_ask.py --tool agy --model gemini-3.1-pro-high --message "설계 검토해줘"
    python cli_ask.py --tool codex --message "그 중 제일 급한 건?" --resume
    python cli_ask.py --list-models --tool agy
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

MAX_FILE_CHARS = 60000


def out(text: str) -> None:
    """UTF-8 로 강제 출력 — 콘솔 기본 코드페이지가 무엇이든 한글/이모지를 지킨다."""
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):
        pass
    print(text)


def run(cmd: list[str], timeout: int, stdin_text: str | None = None) -> tuple[int, str, str]:
    """CLI 를 돌리고 (종료코드, stdout, stderr) 를 UTF-8 문자열로 돌려준다."""
    exe = shutil.which(cmd[0])
    if not exe:
        return 127, "", f"{cmd[0]} 명령을 찾을 수 없다. 설치와 PATH 를 확인하라."
    try:
        p = subprocess.run(
            [exe] + cmd[1:],
            input=stdin_text.encode("utf-8") if stdin_text is not None else None,
            capture_output=True, timeout=timeout)
    except subprocess.TimeoutExpired:
        return 124, "", f"{timeout}초 안에 답이 오지 않았다. --timeout 을 늘려보라."
    return (p.returncode,
            p.stdout.decode("utf-8", "replace").strip(),
            p.stderr.decode("utf-8", "replace").strip())


def build_message(message: str, files: list[str]) -> str:
    """첨부 파일 내용을 메시지 뒤에 붙인다. 경로만 주면 CLI 가 못 읽는 경우가 있다."""
    parts = [message]
    for f in files:
        p = Path(f)
        if not p.exists():
            parts.append(f"\n[파일 없음: {f}]")
            continue
        body = p.read_text(encoding="utf-8", errors="replace")[:MAX_FILE_CHARS]
        parts.append(f"\n--- 파일: {p.as_posix()} ---\n{body}")
    return "\n".join(parts)


def ask_codex(msg: str, model: str, resume: bool, timeout: int) -> tuple[int, str, str]:
    # 프롬프트는 stdin("-")으로 넘긴다 — 인자로 넘기면 긴 한글이 줄바꿈에서 잘리는 일이 있다.
    # 주의: resume 은 별도 서브커맨드라 받는 플래그가 다르다(--sandbox 를 거부한다).
    #       두 경우 모두 --skip-git-repo-check 가 없으면 git 저장소 밖에서 거부당한다.
    if resume:
        cmd = ["codex", "exec", "resume", "--last"]
        if model:
            cmd += ["-m", model]
        cmd += ["--skip-git-repo-check", "-"]
    else:
        cmd = ["codex", "exec"]
        if model:
            cmd += ["-m", model]
        cmd += ["--sandbox", "read-only", "--skip-git-repo-check", "-"]
    return run(cmd, timeout, stdin_text=msg)


def ask_agy(msg: str, model: str, resume: bool, timeout: int) -> tuple[int, str, str]:
    # --dangerously-skip-permissions 가 없으면 헤드리스에서 권한이 자동 거부되어
    # 아무 출력 없이 끝난다(빈 답의 대부분이 이 원인이다).
    cmd = ["agy", "-p", msg, "--dangerously-skip-permissions",
           "--print-timeout", f"{timeout}s"]
    if model:
        cmd += ["--model", model]
    if resume:
        cmd += ["--continue"]
    return run(cmd, timeout)


def main() -> int:
    ap = argparse.ArgumentParser(description="다른 AI CLI 에게 물어본다")
    ap.add_argument("--tool", choices=["codex", "agy"], required=True)
    ap.add_argument("--message", default="")
    ap.add_argument("--model", default="")
    ap.add_argument("--file", action="append", default=[])
    ap.add_argument("--resume", action="store_true")
    ap.add_argument("--timeout", type=int, default=300)
    ap.add_argument("--list-models", action="store_true")
    a = ap.parse_args()

    if a.list_models:
        if a.tool == "agy":
            rc, so, se = run(["agy", "models"], 60)
        else:
            rc, so, se = 0, ("gpt-5.5\ngpt-5.5-fast\ngpt-5.4\ngpt-5.4-mini\no3\no4-mini"), ""
        out(so or se)
        return rc

    if not a.message:
        out("--message 가 필요하다.")
        return 2

    msg = build_message(a.message, a.file)
    fn = ask_codex if a.tool == "codex" else ask_agy
    rc, so, se = fn(msg, a.model, a.resume, a.timeout)

    if so:
        out(so)
    if rc != 0 and not so:
        out(f"[{a.tool} 실패 rc={rc}]\n{se}")
    return rc


if __name__ == "__main__":
    raise SystemExit(main())
