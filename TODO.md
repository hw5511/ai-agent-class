# AI Agent Class — 작업 할 일 목록 (TODO)

## 1. CLI 설치 과정 실제 캡처 이미지로 슬라이드 교체
- **현재 상태**: Basic Step 01(`courses/basic/step01.json`)의 설치 및 설정 과정 슬라이드들이 임시 목업 SVG로 구성되어 있음.
- **업로드 완료 위치**: `assets/clis/`
  - `assets/clis/agy/`: `1.png` ~ `13.png` (Antigravity CLI 실제 설치, PATH 오류, 환경변수 설정, 실행 과정)
  - `assets/clis/claude/`: `0-1.png` ~ `0-3.png`, `1.png` ~ `10.png` (Claude Code CLI 설치, PATH 경고, 설정 및 대화 과정)
- **할 일**:
  - `assets/clis/`에 저장된 실제 CLI 터미널 캡처 이미지들을 바탕으로 `courses/basic/step01.json`의 해당 슬라이드 이미지 경로를 교체하거나, 목업 SVG 내 터미널 영역에 실제 캡처 내용을 정확히 반영하도록 리뉴얼.
  - 슬라이드 16~19 (`agy_설치`, `agy_PATH_오류`, `agy_PATH_등록`, `agy_PATH_반영_및_실행`)
  - 슬라이드 51~54 (`claude_설치`, `claude_PATH_오류`, `claude_PATH_등록`, `claude_PATH_반영_및_실행`)

---

## 2. 액션박스 macOS 지원 및 PATH 안내 개선
- **현재 상태**: Windows PowerShell 명령어 위주로 등록되어 있거나, macOS용 PATH 등록/반영 명령어가 누락되어 있음.
- **할 일**:
  - **설치 명령어**:
    - Windows: `irm https://... | iex`
    - macOS: `curl -fsSL https://... | bash` (또는 Homebrew 등)
  - **PATH 안내 (맥북 zsh 환경)**:
    - 맥북의 경우 설치 후 터미널에 안내되는 `run these commands` 형식 반영:
      ```bash
      echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
      ```
    - 설치 후 zsh 프롬프트에서 즉시 반영할 수 있는 명령어 액션박스 제공.
  - **PATH 갱신 및 실행**:
    - macOS: `source ~/.zshrc && agy` / `source ~/.zshrc && claude`
  - **기타 OS 의존성 액션박스 확장**:
    - Basic Step 05 Slide 8: Stop Hook PC 알림 (Windows: `BurntToast` / macOS: `osascript -e 'display notification ...'`)
    - Basic Step 01 Slide 13: 단축키 안내 (Windows: `Ctrl + J` / macOS: `Cmd + J`)
