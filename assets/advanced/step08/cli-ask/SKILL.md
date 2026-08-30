---
name: cli-ask
description: 다른 회사의 AI CLI(OpenAI Codex, Google Antigravity)에게 메시지를 보내고 답을 받아온다. 모델을 골라서 보낼 수 있고, 직전 대화를 이어서 물을 수도 있다. "다른 AI한테 물어봐", "코덱스한테 검수받아", "제미나이 의견도 들어봐", "GPT한테 확인시켜", "아까 그거 이어서 물어봐" 같은 요청에서 쓴다.
---

# cli-ask — 다른 AI 에게 물어보기

Claude 혼자 판단하기 애매할 때 **다른 회사 모델의 답을 받아온다.** 코드 검수, 설계 판단,
사실 확인처럼 "한 번 더 다른 눈으로 보고 싶은" 일에 쓴다.

## 준비물

`codex` 와 `agy` 가 설치되어 있고 **로그인되어 있어야** 한다. 로그인은 수업에서 미리 마친다.

## 쓰는 법

```bash
python scripts/cli_ask.py --tool codex --message "이 함수의 버그를 찾아줘"
python scripts/cli_ask.py --tool agy --model gemini-3.1-pro-high --message "이 설계의 위험은?"
python scripts/cli_ask.py --tool codex --message "그 중에 제일 급한 건?" --resume
python scripts/cli_ask.py --tool agy --message "이 파일 검토해줘" --file src/app.py
python scripts/cli_ask.py --list-models --tool agy
```

| 옵션 | 뜻 |
|---|---|
| `--tool` | `codex` 또는 `agy` (필수) |
| `--message` | 보낼 말 (필수) |
| `--model` | 모델 이름. 생략하면 CLI 기본값 |
| `--file` | 같이 볼 파일 경로. 여러 번 쓸 수 있다 |
| `--resume` | 새 대화가 아니라 **직전 대화에 이어서** 묻는다 |
| `--timeout` | 초 단위, 기본 300 |
| `--list-models` | 그 CLI 가 실제로 제공하는 모델 목록을 출력 |

## 고를 수 있는 모델

- **codex**: `gpt-5.5` · `gpt-5.5-fast` · `gpt-5.4` · `gpt-5.4-mini` · `o3` · `o4-mini`
- **agy**: `gemini-3.7-flash-high|medium|low` · `gemini-3.1-pro-high` · `gemini-3.1-pro-low` ·
  `claude-sonnet-4-6` · `claude-opus-4-6-thinking` · `gpt-oss-120b-medium`

가볍고 빠른 답 = flash / mini 계열. 깊게 봐야 하면 = `gemini-3.1-pro-high` 또는 `gpt-5.5`.
목록은 바뀔 수 있으니 확실히 하려면 `--list-models` 로 확인한다.

## 이어서 묻기

두 CLI 모두 직전 대화를 기억한다. `--resume` 을 붙이면 맥락을 다시 설명하지 않아도 된다.
후속 질문은 `--resume` 쪽이 더 싸고 정확하다.

## Claude 에게 이렇게 시키면 된다

- "방금 짠 코드를 codex 와 agy 한테 각각 검수받아줘. 둘이 지적한 것 중 네가 놓친 게 있으면 알려줘."
- "이 두 설계 중 뭐가 나은지 gemini-3.1-pro-high 한테 물어봐."
- "아까 codex 가 말한 것 중 제일 급한 게 뭔지 이어서 물어봐."

## 알아둘 것

- 답이 길면 오래 걸린다. 기본 5분이고 `--timeout` 으로 늘린다.
- 한국어와 이모지가 깨지지 않도록 스크립트가 UTF-8 로 직접 디코딩해서 출력한다.
- 각 CLI 는 그 계정의 구독 사용량을 쓴다. 한도가 차면 그 내용이 그대로 출력된다.
