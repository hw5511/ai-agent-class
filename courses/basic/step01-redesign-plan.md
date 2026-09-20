# Basic Step 1 재설계 계획

> 상태: 반영 완료 (2026-09-20). 1회차는 67장·11개 파트로 운영 중이다.
> 정본: `courses/basic/step01.json` + `assets/basic/step01/slides.json`. 이 문서는 재설계 당시의 계획이고,
> 아래 3절의 72장 표는 초안 기록으로만 남긴다 — 실제 장수·순서와 다르다.
> 원칙: 1~8장은 유지하고, VS Code를 공통 작업 공간으로 먼저 가르친다.

## 1. 확정된 방향

- 수강생은 VS Code를 먼저 설치하고 `에이전트1` 폴더를 연다.
- `Ctrl + J`로 아래 패널을 열고 터미널 탭을 사용한다.
- **일반 터미널 상태**와 **AI 에이전트 CLI 실행 상태**를 별도 슬라이드에서 구분한다.
- CLI 설치 순서는 Antigravity CLI(`agy`) → Codex CLI → Claude Code다.
- Git·Node.js·npm 설치는 Step 1 선행 과정에서 제거한다.
- Windows와 macOS 모두 공식 네이티브 설치 스크립트를 사용한다.
- 로컬 참조 폴더 `clis/agy`의 `1.png`부터 `13.png`까지를 Antigravity 설치·로그인 흐름의 근거 화면으로 사용한다.
- `agy` PATH 오류와 복구 화면(`2.png`~`4.png`)도 본문 순서에 포함한다.
- 사용자 이미지가 없는 파일 생성·폴더 생성·파일 이동·종료 화면은 기존 Step 1 SVG 스타일을 유지한 목업 SVG로 제작한다.
- Antigravity 실습 종료는 `Ctrl + C`를 사용한다. 종료 후 PowerShell 또는 zsh 프롬프트가 다시 보이는 상태를 확인한다.
- 세 CLI에 같은 네 단계 실습을 반복한다: 자기소개 질문 → `자기소개서.txt` 생성 → `introduce` 폴더 생성 → 파일 이동.
- ~~각 CLI는 `에이전트1/agy`, `에이전트1/codex`, `에이전트1/claude`에서 실행한다.~~ → 폐기(`042b969`, 2026-09-14).
  세 CLI 모두 `에이전트1` 한 폴더에서 실행하고, 결과 충돌은 파일 이름으로 구분한다 —
  agy는 `gemini.txt`, Codex는 `gpt.txt`, Claude Code는 `claude.txt`.
- Codex는 설치 단계가 짧으므로 설치·확인·로그인 뒤 바로 같은 실습으로 들어간다.
- Claude는 로컬 참조 폴더 `clis/claude`의 화면을 근거로 설치·PATH·초기 설정·로그인·신뢰 과정을 설명한다.

## 2. 학습 결과

수강생이 Step 1을 마치면 같은 과제를 세 CLI가 각각 수행한 결과가 남는다.

```text
에이전트1/
└── introduce/
    ├── gemini.txt   (Antigravity)
    ├── gpt.txt      (Codex)
    └── claude.txt   (Claude Code)
```

수강생은 다음 차이를 설명할 수 있어야 한다.

- `PS C:\\...\\에이전트1>` 또는 `... 에이전트1 %`는 일반 터미널 프롬프트다.
- Antigravity 로고·모델명·입력창이 보이는 화면은 AI 에이전트 CLI다.
- 일반 터미널에서는 설치·실행 명령을 입력한다.
- AI CLI에서는 자연어로 파일 작업을 요청한다.
- `Ctrl + C`는 AI CLI를 종료하고 일반 터미널로 돌아오는 방법이다.

## 3. 9장 이후 페이지 초안

| 장 | 슬라이드 제목 | 화면·설명 | 시각 자료 | 액션박스 초안 |
|---:|---|---|---|---|
| 9 | 오늘 완성할 환경 | VS Code 안에서 CLI 3종을 사용하는 전체 그림 | 기존 스타일 신규 SVG | 없음 |
| 10 | VS Code 설치 | Windows·macOS 설치 경로 | 기존/개편 SVG | VS Code 다운로드 링크 |
| 11 | VS Code 화면 구성 | 탐색기·편집기·아래 패널·현재 폴더 | 기존 스타일 신규 SVG | 없음 |
| 12 | 실습 폴더 `에이전트1` | 폴더 생성 후 VS Code에서 열고 `agy`, `codex`, `claude` 하위 폴더 준비 | 기존 스타일 신규 SVG | 폴더 이름 복사 |
| 13 | `Ctrl + J`와 터미널 패널 | 아래 패널을 열고 터미널 탭 선택 | 기존 스타일 신규 SVG | 단축키 안내 여부 검토 |
| 14 | 터미널과 AI CLI | 두 상태의 화면·입력 방식·종료 방법 비교 | 기존 스타일 비교 SVG | 없음 |
| 15 | 현재 작업 폴더 | 터미널 경로가 `에이전트1/agy`인지 확인 | 기존 스타일 신규 SVG | Windows `Get-Location`, macOS `pwd` |
| 16 | Antigravity CLI 설치 | 공식 설치 스크립트 실행과 설치 완료 | `clis/agy/1.png` 기반 SVG | Windows·macOS 설치 명령 |
| 17 | `agy` 명령을 찾지 못하는 경우 | 설치 직후 현재 터미널 PATH가 갱신되지 않은 화면 | `clis/agy/2.png` 기반 SVG | `agy --version` 또는 `agy` |
| 18 | Antigravity PATH 등록 | `%LOCALAPPDATA%\\agy\\bin` 사용자 PATH 등록 | `clis/agy/3.png` 기반 SVG | Windows PATH 등록 명령 |
| 19 | PATH 반영과 재실행 | 현재 터미널 PATH를 새로 읽고 `agy` 재실행 | `clis/agy/4.png` 기반 SVG | PATH 새로고침 + 버전 확인 + 실행 |
| 20 | Google 로그인 방식 | `1. Google OAuth` 선택 | `clis/agy/5.png` 기반 SVG | 없음 |
| 21 | Google 계정 선택 | 브라우저에서 사용할 계정 선택 | `clis/agy/6.png` 기반 SVG | 없음 |
| 22 | 브라우저 인증 완료 | 인증 코드를 복사 | `clis/agy/7.png` 기반 SVG | 없음, 실제 인증 코드는 노출 금지 |
| 23 | 인증 코드 입력 | 터미널로 돌아와 인증 완료 | `clis/agy/8.png` 기반 SVG | 없음, 실제 URL·코드는 노출 금지 |
| 24 | 화면 색상 선택 | Antigravity CLI 테마 선택 | `clis/agy/9.png` 기반 SVG | 없음 |
| 25 | 데이터 사용 설정 | 약관과 데이터 사용 선택의 의미 | `clis/agy/10.png` 기반 SVG | 없음 |
| 26 | 초기 설정 완료 | `Done` 선택 | `clis/agy/11.png` 기반 SVG | 없음 |
| 27 | 작업 폴더 신뢰 | `에이전트1` 폴더에 대한 읽기·수정·명령 실행 허용 | `clis/agy/12.png` 기반 SVG, 경로 재작성 | 없음 |
| 28 | Antigravity 실행 화면 | 계정·모델·현재 폴더·입력창 위치 | `clis/agy/13.png` 기반 SVG, 이메일 익명화 | `agy` 실행 명령 여부 검토 |
| 29 | 첫 대화 | “너는 누구니?” 입력과 응답 | 신규 목업 SVG | 프롬프트 복사 |
| 30 | 자기소개서 생성 | 현재 폴더에 `자기소개서.txt` 생성 요청 | 신규 목업 SVG | 프롬프트 복사 |
| 31 | 생성된 파일 확인 | VS Code 탐색기에 새 파일이 나타난 상태 | 신규 목업 SVG | 없음 |
| 32 | `introduce` 폴더 생성 | 현재 폴더 아래 새 폴더 생성 요청 | 신규 목업 SVG | 프롬프트 복사 |
| 33 | 자기소개서 이동 | 파일을 `introduce` 폴더로 이동 요청 | 신규 목업 SVG | 프롬프트 복사 |
| 34 | 최종 폴더 구조 | `introduce/자기소개서.txt` 확인 | 신규 목업 SVG | 없음 |
| 35 | `Ctrl + C`로 Antigravity 종료 | AI CLI 입력 상태에서 종료 | 신규 목업 SVG | 없음 |
| 36 | 일반 터미널로 복귀 | PowerShell/zsh 프롬프트가 다시 나타난 상태 | 신규 목업 SVG | 없음 |
| 37 | 다음 도구: Codex | `에이전트1/codex`로 이동해 Codex 설치로 전환 | 기존 스타일 신규 SVG | 작업 폴더 이동 명령 |

### Codex 구간

| 장 | 슬라이드 제목 | 화면·설명 | 시각 자료 | 액션박스 |
|---:|---|---|---|---|
| 38 | Codex 실습 폴더 | `에이전트1/codex`가 현재 폴더인지 확인 | 공통 VS Code 목업 | Windows/macOS 폴더 이동·확인 |
| 39 | Codex CLI 설치 | 네이티브 설치 스크립트 실행 | 설치 명령 중심 SVG | Windows/macOS 설치 명령 |
| 40 | Codex 설치 확인 | 버전 확인 후 `codex` 실행 | 터미널 목업 | `codex --version`, `codex` |
| 41 | ChatGPT 로그인과 실행 화면 | 브라우저 로그인 후 현재 폴더 확인 | 익명화한 Codex 목업 | 없음 |
| 42 | 첫 대화 | “너는 누구니?” | 공통 실습 목업의 Codex 변형 | 프롬프트 복사 |
| 43 | 자기소개서 생성 | 현재 폴더에 `자기소개서.txt` 생성 | 공통 실습 목업의 Codex 변형 | 프롬프트 복사 |
| 44 | 생성된 파일 확인 | VS Code 탐색기에서 파일 확인 | 공통 실습 목업의 Codex 변형 | 없음 |
| 45 | `introduce` 폴더 생성 | 현재 폴더 아래 폴더 생성 | 공통 실습 목업의 Codex 변형 | 프롬프트 복사 |
| 46 | 자기소개서 이동 | 파일을 `introduce`로 이동 | 공통 실습 목업의 Codex 변형 | 프롬프트 복사 |
| 47 | Codex 결과 확인 | `codex/introduce/자기소개서.txt` 확인 | 최종 트리 목업 | 없음 |
| 48 | `Ctrl + C`로 Codex 종료 | CLI 입력 상태 종료 | 종료 전후 목업 | 없음 |
| 49 | 다음 도구: Claude | 일반 터미널로 돌아와 `에이전트1/claude`로 이동 | 공통 터미널 목업 | 작업 폴더 이동 명령 |

### Claude 구간

`clis/claude/0-1.png`~`0-3.png`은 웹 앱·계정·요금제 화면이라 설치 흐름에서 제외한다.
`1.png`~`10.png` 및 `8-1.png`, `8-2.png`을 UI 근거로만 사용하고 모두 안전한 SVG로 재구성한다.

| 장 | 슬라이드 제목 | 근거 이미지·설명 | 시각 자료 | 액션박스 |
|---:|---|---|---|---|
| 50 | Claude 실습 폴더 | `에이전트1/claude`가 현재 폴더인지 확인 | 공통 VS Code 목업 | Windows/macOS 확인 명령 |
| 51 | Claude Code 설치 | 네이티브 설치 스크립트 | `clis/claude/1.png` 기반 SVG | Windows/macOS 설치 명령 |
| 52 | `claude` 명령을 찾지 못하는 경우 | 설치 직후 현재 셸의 PATH 미반영 | `clis/claude/2.png` 기반 SVG | `claude --version` |
| 53 | Claude PATH 등록 | `%USERPROFILE%\\.local\\bin`을 User PATH에 중복 없이 등록 | `clis/claude/3.png` 기반 SVG | Windows PATH 등록, macOS PATH 확인 |
| 54 | PATH 반영과 Claude 실행 | 현재 셸 PATH 갱신 → 버전 확인 → 실행 | 안전한 터미널 목업 | 갱신·확인·실행 명령 |
| 55 | 터미널 모양 선택 | 최초 실행 테마 선택 | `clis/claude/4.png` 기반 SVG | 없음 |
| 56 | 로그인 방식 선택 | Claude 구독 또는 해당 계정 방식 선택 | `clis/claude/5.png` 기반 SVG | 없음 |
| 57 | 브라우저 권한 확인 | 계정 권한을 읽고 승인 | `clis/claude/6.png` 기반 SVG | 없음 |
| 58 | 로그인 완료 | 성공 상태 확인 | `clis/claude/7.png` 기반 SVG, 이메일 제거 | 없음 |
| 59 | Claude Code 보안 안내 | 실수·프롬프트 인젝션 주의 | `clis/claude/8-1.png` 기반 SVG | 없음 |
| 60 | 터미널 입력 설정 | 권장 터미널 설정 선택 | `clis/claude/8-2.png` 기반 SVG | 없음 |
| 61 | 작업 폴더 신뢰 | `에이전트1/claude`의 읽기·수정 권한 확인 | `clis/claude/9.png` 기반 SVG | 없음 |
| 62 | Claude 실행 화면 | 현재 폴더와 입력창 확인 | `clis/claude/10.png` 기반 SVG, 모델·이메일 일반화 | 없음 |
| 63 | 첫 대화 | “너는 누구니?” | 공통 실습 목업의 Claude 변형 | 프롬프트 복사 |
| 64 | 자기소개서 생성 | 현재 폴더에 `자기소개서.txt` 생성 | 공통 실습 목업의 Claude 변형 | 프롬프트 복사 |
| 65 | 생성된 파일 확인 | VS Code 탐색기에서 파일 확인 | 공통 실습 목업의 Claude 변형 | 없음 |
| 66 | `introduce` 폴더 생성 | 현재 폴더 아래 폴더 생성 | 공통 실습 목업의 Claude 변형 | 프롬프트 복사 |
| 67 | 자기소개서 이동 | 파일을 `introduce`로 이동 | 공통 실습 목업의 Claude 변형 | 프롬프트 복사 |
| 68 | Claude 결과 확인 | `claude/introduce/자기소개서.txt` 확인 | 최종 트리 목업 | 없음 |
| 69 | `Ctrl + C`로 Claude 종료 | AI CLI 종료 | 종료 전후 목업 | 없음 |
| 70 | 일반 터미널 복귀 | PowerShell/zsh 프롬프트 확인 | 공통 터미널 목업 | 없음 |
| 71 | 세 에이전트 결과 비교 | 세 자기소개서의 내용과 작업 방식 비교 | 3개 폴더 트리 비교 SVG | 없음 |
| 72 | Step 1 완료 | 설치·로그인·파일 작업·CLI 종료 체크 | 기존 스타일 체크리스트 SVG | 없음 |

## 4. 세 CLI 공통 실습 프롬프트

각 CLI의 첫 대화:

```text
너는 누구니?
```

각 CLI의 파일 생성 (파일 이름만 도구별로 다르다 — `gemini.txt` · `gpt.txt` · `claude.txt`):

```text
현재 폴더에 'gemini.txt'를 만들어줘.
네가 누구이고 무엇을 할 수 있는지 간단히 작성해줘.
```

각 CLI의 폴더 생성:

```text
현재 폴더에 'introduce' 폴더를 만들어줘.
```

각 CLI의 파일 이동 (파일 이름만 도구별로 다르다):

```text
'gemini.txt'를 'introduce' 폴더로 옮겨줘.
```

## 5. PATH 본문 흐름

PATH 문제 해결을 부록으로 보내지 않고 17~19장에 포함한다.

1. 설치 직후 `agy` 명령이 인식되지 않는 화면을 보여준다.
2. Antigravity 설치 폴더를 사용자 PATH에 영구 등록한다.
3. 현재 터미널의 PATH를 Machine + User 값으로 새로 구성한다.
4. `agy --version`으로 확인한 뒤 `agy`를 실행한다.

Windows 설치 경로:

```powershell
$agyBin = "$env:LOCALAPPDATA\agy\bin"
```

현재 터미널 PATH 새로고침:

```powershell
$env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
            [Environment]::GetEnvironmentVariable("Path", "User")
```

## 6. 시각 자료 제작 원칙

- 모든 SVG는 `1280×720`, `viewBox="0 0 1280 720"`로 만든다.
- `BASIC 01` 배지는 `(60,44)`, 제목은 `(60,100)`의 약 26px 굵은 글꼴, 부제는 `(60,148)`의 15px 회색 글꼴을 기준으로 한다.
- 기본 폰트는 `-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`, 터미널은 `Courier New, Courier, monospace`를 사용한다.
- 기본 팔레트는 본문 `#0a0a0a`, 보조 `#6b7280`, 카드 `#f9fafb`, 테두리 `#e5e7eb`, 강조 파랑 `#1d4ed8`·`#3b5bdb`를 사용한다.
- 화면형 목업은 `(140,118)` 안의 최대 `1000×520` 영역을 기준으로 하고 비율을 왜곡하지 않는다.
- 사용자가 제공한 PNG는 증거 화면으로 취급한다. 화면 비율을 왜곡하지 않고 SVG 프레임 안에 배치한다.
- 이메일, OAuth URL, 인증 코드는 SVG에서 가리거나 예시 값으로 교체한다.
- `Downloads` 경로는 실습 기준 경로인 `에이전트1`로 바꾼 목업을 사용한다.
- 신규 목업은 VS Code 탐색기와 터미널의 관계가 한눈에 보이게 구성한다.
- 터미널 상태와 AI CLI 상태는 프롬프트·화면 구조·입력 문장의 차이로 구분한다.
- 액션박스에는 수강생이 실제로 복사하거나 열어야 하는 값만 넣는다. 설명만 있는 슬라이드에는 억지로 액션박스를 만들지 않는다.
- 액션박스는 SVG 안에 그리지 않는다. `step01.json`의 `action.copy`, `action.items`, `action.download`로만 제공한다.
- `--dangerously-skip-permissions` 같은 전체 권한 우회 옵션은 초급 과정의 SVG·액션박스·실행 예시에서 제외한다.

## 7. 액션박스 기준

- 다운로드 페이지는 `action.download`를 사용한다.
- Windows와 macOS 명령을 함께 제공할 때는 `action.items`를 사용한다.
- 실습 문장 하나를 복사할 때는 `action.copy`를 사용한다.
- UI 선택, 로그인, 테마, 약관, 폴더 신뢰, 결과 확인, `Ctrl + C` 설명 페이지는 `action: null`을 사용한다.
- 긴 PATH 스크립트는 액션박스에서 화면상 말줄임되지만 복사값 전체는 유지된다. 본문 SVG에는 핵심 줄만 보여준다.

주요 액션 값:

```text
VS Code 다운로드: https://code.visualstudio.com/download
Antigravity Windows: irm https://antigravity.google/cli/install.ps1 | iex
Antigravity macOS: curl -fsSL https://antigravity.google/cli/install.sh | bash
Codex Windows: irm https://chatgpt.com/codex/install.ps1 | iex
Codex macOS: curl -fsSL https://chatgpt.com/codex/install.sh | sh
Claude Windows: irm https://claude.ai/install.ps1 | iex
Claude macOS: curl -fsSL https://claude.ai/install.sh | bash
```

Claude Windows PATH:

```powershell
$claudeBin = Join-Path $env:USERPROFILE ".local\bin"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if (($userPath -split ";") -notcontains $claudeBin) {
  $newUserPath = (($userPath -split ";") + $claudeBin |
    Where-Object { $_ } |
    Select-Object -Unique) -join ";"
  [Environment]::SetEnvironmentVariable("Path", $newUserPath, "User")
}
```

## 8. 남은 결정·검증 항목 — 정리 (2026-09-20)

- ~~72장 상세안을 실제 수업 시간에 맞춰 어디까지 합칠지 결정한다.~~ → 결정됨.
  `d93687b`(#51)로 70장 구성이 배포됐고, 2026-09-20 수업 후 피드백으로 전환용 3장
  (`현재_작업_폴더_확인` · `다음_도구_Codex` · `다음_도구_Claude`)을 `_archive/` 로 보내 67장이 됐다.
  사이드바 목차(`parts`) 11개 구간으로 나눠 길이를 관리한다.
- ~~Codex 로그인·폴더 신뢰 화면은 실제 캡처 없이 일반 목업으로 만든다.~~ → 반영됨.
  `assets/basic/step01/codex_로그인_및_실행_화면.svg` 에 임베드된 캡처가 없다(base64 0건).
  실제 캡처를 쓰는 22장은 모두 agy·claude 구간이다.
- ~~모든 SVG XML 파싱, JSON 유효성, 이미지 경로, 뷰어 렌더를 검증한다.~~ → 상시 검증으로 전환.
  67장 전부 XML 파싱 통과, `courses/basic/step01.json` JSON 유효, `imagePath` 67건 모두 실존,
  `slides.json` 순서와 일치. 뷰어 렌더는 `python build.py` 후 실제 페이지에서 확인한다.
- 세 결과 파일을 비교하는 마지막 실습 질문과 평가 기준 — **미정, CEO 결정 사항.**
  `세_에이전트_결과_비교` 슬라이드는 세 파일(`gemini.txt` · `gpt.txt` · `claude.txt`)과
  '비교 메모' 칸까지 그려져 있으나, 수강생에게 던질 질문과 평가 기준 문구는 아직 없다.

## 9. 2026-09-20 수업 후 반영

- 맥 PATH: 설치 스크립트가 출력하는 `Run: echo 'export PATH=...' >> ~/.zshrc` 줄을 복사해
  실행하는 흐름으로 바꿨다(`agy_PATH_등록` · `PATH_자동_등록`). 액션박스의 macOS 항목은 제거했다 —
  윈도우 자동 등록 스크립트만 남는다.
- 설치·실습 슬라이드는 VS Code 창 목업 안에서 진행한다. 에이전트 실행 상태는
  `slidekit.agent_panel()` + `logo_antigravity` · `logo_codex` · `logo_claude` 로 그린다.
- `/ide` 설정은 실제 캡처(`assets/clis/claude/model_ide_select_none.png`)로 교체했다.
