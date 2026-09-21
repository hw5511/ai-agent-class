# basic 3회차 (step03) 재설계 계획 — 갭 분석

작성 2026-09-21 · 이 문서는 **계획서**다. 슬라이드 제작·렌더·커밋은 이 라운드에서 하지 않는다.

기준 문서: `slidekit2/src/README.md` (디자인 규칙 + CEO 지시 로그), `slidekit2/src/specs/s2-claudemd.tsx`,
`s2-write.tsx` (완성 파트 참조), `slidekit2/src/specs/registry.ts` (파트 등록),
현행 `courses/basic/step03.json` + `assets/basic/step03/*.svg`.

## 0. 현황 확인 (디스크에서 검증한 사실)

- 현행 step03 = 18장, 전부 `assets/basic/step03/*.svg`, **1280x720 구형 SVG**. 파트(`parts`) 정의 없음.
- 18장 중 **실제 스크린샷을 박아 넣은 슬라이드는 0장**이다 (`grep data:image` 결과 0). 전부 텍스트 박스
  나열 = 새 기준의 "실패한 슬라이드". 따라서 "실제 스크린샷은 살린다" 규칙이 구출할 수 있는 자산이 없고,
  **`기존 유지` 항목은 0건**이다.
- 1·2회차는 slidekit2 렌더러 산출 PNG로 이미 교체되어 있다 (step01 66장, step02 86장, 전부 `.png`,
  현재 워킹트리 미커밋). 스크린샷 자산은 `slidekit2/public/slides/shots/` + `_manifest.json` (현재 28개,
  step03용은 하나도 없다).
- `_archive/`에 이미 빠져 있는 것: `Todos.svg`, `Todos_실습.svg`, `summary.svg` — 그대로 둔다.
- 뷰어 해시는 1-based다 (`viewer.template.html:1102`). 따라서 **`#basic/3/9` = `주요_슬래시_명령어.svg`**.

## 1. 파트 구성 (7개)

CEO 아웃라인 7개 절 = 파트 7개. 파일은 파트당 하나(`slidekit2/src/specs/s3-<id>.tsx`),
`registry.ts`에만 import + 배열 등록. 실습은 2회차가 확립한 **`~란` → `요청` → `결과`** 3단 분할을 따른다.

| # | 파트 id | eyebrow | 장수 |
|---|---|---|---|
| 1 | `s3-account` | `CLAUDE 설정` | 8 |
| 2 | `s3-settings` | `SETTINGS.JSON` | 8 |
| 3 | `s3-permission` | `권한 모드` | 12 |
| 4 | `s3-config` | `/CONFIG` | 6 |
| 5 | `s3-model` | `/MODEL` | 2 |
| 6 | `s3-websearch` | `웹서치 툴` | 4 |
| 7 | `s3-chrome` | `CLAUDE IN CHROME` | 14 |
|  |  | **합계** | **54** |

### 파트 1 — `s3-account` / eyebrow `CLAUDE 설정` (8장, 통합 1~8)

| idx | name | title |
|---|---|---|
| 1 | `s3_오늘의_흐름` | Claude 설정과 권한 |
| 2 | `account_설정_진입` | 설정 메뉴 진입 |
| 3 | `account_privacy_화면` | 데이터 및 개인정보 보호 |
| 4 | `account_privacy_off` | AI 모델 개선 돕기 끄기 |
| 5 | `account_billing_화면` | 요금 및 청구 |
| 6 | `account_billing_인보이스` | 인보이스 다운로드 · 플랜 변경 |
| 7 | `account_usage_화면` | 사용량 화면 |
| 8 | `account_usage_개념` | 5시간 창 · 주간 한도 |

1번은 3회차 타이틀 슬라이드(2회차와 동일하게 첫 파트 안에 둔다). 4번은 3번 화면의 해당 토글을
확대한 컷 + FocusBadge, 8번은 7번 실화면 위에 5시간/주간 두 개념을 주석으로 얹는다.

### 파트 2 — `s3-settings` / eyebrow `SETTINGS.JSON` (8장, 통합 9~16)

| idx | name | title |
|---|---|---|
| 1 | `settings_란` | settings.json |
| 2 | `settings_항목` | 주요 설정 항목 |
| 3 | `settings_요청` | 삭제 명령어 금지 |
| 4 | `settings_결과` | 생성된 deny 규칙 |
| 5 | `settings_clear` | /clear 로 대화 비우기 |
| 6 | `settings_차단_요청` | 파일 삭제 요청 |
| 7 | `settings_차단_결과` | Permission denied |
| 8 | `settings_생성_경로` | settings.json 이 생기는 다른 길 |

3번 입력 문구: "현재 폴더의 .claude 폴더에 settings.json 파일을 만들어서 모든 삭제 명령어를 금지시켜줘".
8번 = MCP 추가 · 플러그인 설치 · 기타 설정 변경으로도 같은 파일이 생긴다(실제 화면 3종).

### 파트 3 — `s3-permission` / eyebrow `권한 모드` (12장, 통합 17~28)

| idx | name | title |
|---|---|---|
| 1 | `perm_shift_tab` | Shift+Tab 5단 순환 |
| 2 | `perm_표` | 모드별 허용 범위 |
| 3 | `perm_auto_란` | auto 모드 · 감시자 |
| 4 | `perm_auto_요청` | 삭제 금지 해제 요청 |
| 5 | `perm_auto_결과_A` | 감시자가 막는 경우 |
| 6 | `perm_auto_결과_B` | 그대로 통과하는 경우 |
| 7 | `perm_bypass_란` | bypass 모드 · 감시자 off |
| 8 | `perm_bypass_실행` | claude --dangerously-skip-permissions |
| 9 | `perm_bypass_요청` | 금지 해제 + 파일 삭제 |
| 10 | `perm_bypass_결과` | 삭제 완료 |
| 11 | `perm_종료` | /exit · Ctrl+C 두 번 |
| 12 | `perm_방향키` | 위쪽 방향키로 재실행 |

2번 = read·write·edit·bash × manual / accept edits / plan / auto / bypass 표 1장.
8번에 액션박스(copy: `claude --dangerously-skip-permissions`).
12번 = 종료 → 방향키 → 엔터 3회 반복을 한 장에 3스텝으로.

### 파트 4 — `s3-config` / eyebrow `/CONFIG` (6장, 통합 29~34)

| idx | name | title |
|---|---|---|
| 1 | `config_란` | /config |
| 2 | `config_항목표` | 설정 항목 한눈에 |
| 3 | `config_language` | Language 한국어 |
| 4 | `status_실습` | /status · Organization 확인 |
| 5 | `status_login` | /login 으로 본인 계정 |
| 6 | `usage_실습` | /usage · 터미널 사용량 |

2번은 CEO 지시대로 기존 (1/2)·(2/2) 두 장을 **한 장 표**로 합친다.

### 파트 5 — `s3-model` / eyebrow `/MODEL` (2장, 통합 35~36)

| idx | name | title |
|---|---|---|
| 1 | `model_선택_화면` | /model 선택 화면 |
| 2 | `model_스펙트럼` | haiku → sonnet → opus → fable |

2번 = 좌→우 축 도식. 오른쪽 = 더 똑똑, 더 비쌈(같은 시간에 구독 사용량 더 소모) / 왼쪽 = 성능 낮고 싸고 빠름.

### 파트 6 — `s3-websearch` / eyebrow `웹서치 툴` (4장, 통합 37~40)

| idx | name | title |
|---|---|---|
| 1 | `web_할루시네이션` | 할루시네이션 |
| 2 | `web_툴_란` | 웹서치 툴 |
| 3 | `web_요청` | 최근 7일 AI 트렌드 |
| 4 | `web_결과` | 주요 뉴스 3건 |

3번 입력 문구: "현재 시스템 시간 날짜를 확인해서, 'ai트렌드'에 관해 최근 7일 이내에 발행된 것으로만 해서
관련 뉴스들을 웹서치해서 주요 뉴스 3가지를 알려줘".

### 파트 7 — `s3-chrome` / eyebrow `CLAUDE IN CHROME` (14장, 통합 41~54)

| idx | name | title |
|---|---|---|
| 1 | `chrome_웹서치_한계` | 웹서치가 못 보는 것 |
| 2 | `chrome_란` | 브라우저를 쥔 AI |
| 3 | `chrome_소개_페이지` | Add to Chrome |
| 4 | `chrome_웹스토어` | 확장 설치 |
| 5 | `chrome_로그인` | 확장에서 클로드 로그인 |
| 6 | `chrome_재시작` | 크롬 전부 껐다 켜기 |
| 7 | `chrome_flag` | --chrome 플래그 |
| 8 | `chrome_패널` | /chrome · Status: Enabled |
| 9 | `chrome_실습1` | 설치 확인 페이지 접속 |
| 10 | `chrome_탭그룹` | claude 탭 그룹 |
| 11 | `chrome_챌린지2` | 챌린지 2번 |
| 12 | `chrome_챌린지3` | 챌린지 3번 |
| 13 | `chrome_gmail_접속` | Gmail 접속 |
| 14 | `chrome_gmail_발송` | 나에게 보내기 발송 |

7번 = VS Code에서 Ctrl+C 두 번 종료 → 위쪽 방향키로 `claude --dangerously-skip-permissions` 불러오기 →
뒤에 ` --chrome` 붙이기. 8번 본문은 CEO가 준 `/chrome` 패널 텍스트를 실제 캡처로 대체
(Status: Enabled / Extension: Installed / Browser / Select browser… 메뉴 4행).

## 2. 갭 표

현행 18장이 전부 아래 표에 나온다. 누락 없음.

### 2-1. 현행 슬라이드의 처분 (18장)

| 현행 # | 현행 SVG | 처분 | 대응 신규 슬라이드 |
|---|---|---|---|
| 1 | `Claude_에이전트_환경_설정과_명령어.svg` | 기존 수정 | `s3_오늘의_흐름` (7파트 구성으로 목차 교체) |
| 2 | `보안_설정.svg` | 삭제 | 개인정보 opt-out 은 `account_privacy_off` 로 대체. '파일 쓰기 범위/상위 폴더 허가' 내용은 새 아웃라인에 없음 |
| 3 | `settings.json.svg` | 기존 수정 | `settings_란` (실제 폴더 트리 + 파일 실물) |
| 4 | `permissions_—_허용_·_차단_규칙.svg` | 기존 수정 | `settings_차단_결과` (실제 빨간 permission denied 캡처) |
| 5 | `settings.json_—_주요_설정_항목.svg` | 기존 수정 | `settings_항목` |
| 6 | `settings.json_실습.svg` | 기존 수정 | `settings_요청` (프롬프트 문구 새 아웃라인 것으로 교체) |
| 7 | `권한_모드_(Shift+Tab_순환).svg` | 기존 수정 | `perm_shift_tab` (3모드 → 5모드) |
| 8 | `욜로_모드_(YOLO_Mode).svg` | 기존 수정 | `perm_bypass_실행` ('욜로' 표현 → bypass 모드) |
| 9 | `주요_슬래시_명령어.svg` (`#basic/3/9`) | **삭제** | 없음 — CEO 지시로 제거, /config 파트가 대체 |
| 10 | `config_화면_구성.svg` | 기존 수정 | `config_란` (실제 /config 패널) |
| 11 | `config_설정_항목_(1_2).svg` | 기존 수정 | `config_항목표` (한 장 표로 통합) |
| 12 | `config_설정_항목_(2_2).svg` | 삭제 | 11번으로 병합 |
| 13 | `model_—_Claude_모델_선택.svg` | 기존 수정 | `model_스펙트럼` (4카드 → 좌우 축 도식) |
| 14 | `웹_Search_툴.svg` | 기존 수정 | `web_툴_란` |
| 15 | `웹_Search_실습.svg` | 기존 수정 | `web_요청` (프롬프트 교체) |
| 16 | `Claude_in_Chrome.svg` | 기존 수정 | `chrome_란` (7기능 나열 → 브라우저 제어 개념) |
| 17 | `Claude_in_Chrome_설치_·_활성화.svg` | 기존 수정 | `chrome_웹스토어` |
| 18 | `Claude_in_Chrome_실습.svg` | 기존 수정 | `chrome_챌린지2` |

이미 `_archive/` 로 빠진 `Todos.svg` · `Todos_실습.svg` · `summary.svg` 는 그대로 둔다(복귀 없음).

### 2-2. 신규 제작 39장

위 파트 표에서 2-1 의 '대응 신규 슬라이드' 열에 이름이 없는 슬라이드 전부가 `신규 제작`이다:

- `s3-account`: `account_설정_진입`, `account_privacy_화면`, `account_privacy_off`, `account_billing_화면`,
  `account_billing_인보이스`, `account_usage_화면`, `account_usage_개념` (7)
- `s3-settings`: `settings_결과`, `settings_clear`, `settings_차단_요청`, `settings_생성_경로` (4)
- `s3-permission`: `perm_표`, `perm_auto_란`, `perm_auto_요청`, `perm_auto_결과_A`, `perm_auto_결과_B`,
  `perm_bypass_란`, `perm_bypass_요청`, `perm_bypass_결과`, `perm_종료`, `perm_방향키` (10)
- `s3-config`: `config_language`, `status_실습`, `status_login`, `usage_실습` (4)
- `s3-model`: `model_선택_화면` (1)
- `s3-websearch`: `web_할루시네이션`, `web_결과` (2)
- `s3-chrome`: `chrome_웹서치_한계`, `chrome_소개_페이지`, `chrome_로그인`, `chrome_재시작`, `chrome_flag`,
  `chrome_패널`, `chrome_실습1`, `chrome_탭그룹`, `chrome_챌린지3`, `chrome_gmail_접속`,
  `chrome_gmail_발송` (11)

합계 7+4+10+4+1+2+11 = **39**. 기존 수정 15 + 신규 39 = 54 ✓

## 3. 스크린샷 캡처 목록

전부 `slidekit2/public/slides/shots/` 에 넣고 `_manifest.json` 에 `part`/`slide`/`file`/`w`/`h` 로 등록한다.
"캡처 주체" 는 U=유키가 playwright-tool(`/play`)로 가능, C=CEO 본인 로그인 세션 필요, L=유키 로컬 CLI 실행 후 화면 캡처.

### 웹 화면

| 슬라이드 | 캡처 대상 | 주체 |
|---|---|---|
| `account_설정_진입` | `https://claude.ai/new` 우하단 프로필 → 설정 메뉴 펼친 상태 | U |
| `account_privacy_화면` | `https://claude.ai/new#settings/data-privacy-controls` 전체 | U |
| `account_privacy_off` | 같은 화면의 "AI 모델 개선 돕기" 토글 (off 상태) 확대 | C (실제 계정 토글을 끄는 행위라 CEO 확인 필요) |
| `account_billing_화면` | `https://claude.ai/new#settings/billing` 전체 | **C** (결제수단·청구 이력 = 개인정보, 마스킹 필요) |
| `account_billing_인보이스` | 같은 화면 인보이스 목록 + 다운로드 버튼, 플랜 변경 버튼 | **C** |
| `account_usage_화면` | `https://claude.ai/new#settings/usage` 전체 | U (유키 계정 UI 동일, 숫자만 다름) / 실제 수강 계정 숫자를 쓰려면 C |
| `chrome_웹서치_한계` | 로그인 벽에 막힌 실제 페이지 1컷 | U |
| `chrome_소개_페이지` | `https://claude.com/claude-in-chrome` (Add to Chrome 버튼 보이게) | U |
| `chrome_웹스토어` | `https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn` | U |
| `chrome_로그인` | 설치된 확장 팝업의 클로드 로그인 화면 | **C** (확장이 설치된 실제 Chrome 필요) |
| `chrome_탭그룹` | 주황/초록 claude 탭 그룹이 잡힌 Chrome 탭바 | **C** |
| `chrome_실습1` | `https://claude.ai/chrome/installed` 접속 결과 | **C** |
| `chrome_챌린지2` / `chrome_챌린지3` | 위 페이지의 챌린지 2·3 진행/성공 화면 | **C** |
| `chrome_gmail_접속` / `chrome_gmail_발송` | Gmail 편지쓰기 → '나에게 보내기' 발송 완료 | **C** (실제 메일 발송, 계정 확인 필요) |

### CLI / 터미널 화면 (전부 실제 실행 후 캡처, 합성 금지)

| 슬라이드 | 캡처할 CLI 상태 | 주체 |
|---|---|---|
| `settings_요청` / `settings_결과` | 스크래치 폴더에서 "…모든 삭제 명령어를 금지시켜줘" 실행 → 생성된 `.claude/settings.json` 전문 | L |
| `settings_clear` | `/clear` 직후 화면 | L |
| `settings_차단_요청` / `settings_차단_결과` | 파일 삭제 요청 → 빨간 permission denied 문구 | L |
| `settings_생성_경로` | MCP 추가 / 플러그인 설치 후 settings.json 이 갱신된 화면 | L |
| `perm_shift_tab` | Shift+Tab 5단계 각 상태의 입력줄 하단 모드 표시 5컷 | L |
| `perm_auto_요청`·`결과_A`·`결과_B` | auto 모드에서 "삭제 금지 명령어들을 모두 지워줘" 실행 2회(막힘/통과) | L (§4-1 참조) |
| `perm_bypass_실행`·`요청`·`결과` | `claude --dangerously-skip-permissions` 기동 배너 + 실행/삭제 성공 | L |
| `perm_종료` / `perm_방향키` | Ctrl+C 두 번 종료 화면, 방향키로 직전 명령 불러온 프롬프트 | L |
| `config_란` / `config_항목표` | `/config` 패널 전체(스크롤 포함, 항목 전부) | L |
| `config_language` | Language 항목에 '한국어' 입력 직전/직후 | L |
| `status_실습` / `status_login` | `/status` 출력(Organization 행), `/login` 계정 선택 화면 | L + **C 확인**(§4-4) |
| `usage_실습` | `/usage` 출력 | L |
| `model_선택_화면` | `/model` 선택 패널 (haiku/sonnet/opus/fable 전부 보이게) | L (§4-6) |
| `web_할루시네이션` | 웹서치 없이 틀린 최신 정보를 답한 실제 응답 | L |
| `web_요청` / `web_결과` | AI 트렌드 프롬프트 실행 + 뉴스 3건 출력 | L |
| `chrome_flag` | 방향키로 불러온 명령 뒤에 ` --chrome` 붙인 입력줄 | L |
| `chrome_패널` | `/chrome` 패널 (Status: Enabled) | **C** (확장 연결된 환경에서만 Enabled 로 나옴) |

요약: **유키가 처리 가능 U/L = 24건**, **CEO 본인 환경/계정이 필요 C = 11건**.

## 4. CEO 확인이 필요한 열린 질문

1. **auto 모드 A/B 두 결과.** 같은 요청에 감시자가 막는 경우와 통과하는 경우 두 개가 다 필요한데,
   재현이 보장되지 않는다. 제안: 깨끗한 스크래치 폴더에서 같은 프롬프트를 **최대 10회 실제 실행**하고
   전사(transcript)를 전부 보관한 뒤, 서로 다른 결과가 실제로 나온 두 회차만 슬라이드로 쓴다.
   10회로도 한쪽만 나오면 — **B 화면을 지어내지 않는다.** 그 경우 (a) 나온 결과 한 장만 싣고
   "같은 요청이라도 결과가 달라질 수 있다" 는 문구만 남기거나, (b) 삭제 대상 파일을 조금 위험하게 바꾼
   두 번째 실제 실행으로 반대 결과를 얻는다. 둘 중 어느 쪽을 쓸지 결정 필요.
2. **'지난 시간 복습' 파트 유무.** 2회차는 복습 14장으로 시작했다. 3회차 아웃라인에는 없다. 넣는가?
   넣으면 장수가 약 +10 된다.
3. **마무리 파트 유무.** 2회차는 마무리 5장이 있었다. 3회차는 Gmail 발송으로 끝나는가?
4. **`/status` 의 Organization.** 슬라이드에 찍히는 이메일이 CEO 계정인가, 가려야 하는가,
   아니면 수강생용 더미로 다시 찍는가?
5. **billing 화면 마스킹 범위.** 결제수단 뒷자리·금액·인보이스 번호 중 무엇을 가리는가?
6. **`/model` 의 fable.** 수강생 플랜의 `/model` 목록에 fable 이 실제로 보이는지 확인 필요.
   안 보이면 도식에 fable 을 넣을지, 목록과 맞출지.
7. **Chrome 확장 설치 환경.** 캡처 11건이 확장이 설치된 실제 Chrome 을 요구한다.
   유키가 HQ Chrome 프로필에 확장을 설치해도 되는가, CEO 개인 노트북에서 찍어 주는가?
   `/chrome` 패널의 `Browser: 개인노트북` 을 그대로 쓸지, 수강생 기준 표기로 바꿀지도 함께.
8. **Gmail 실습 발송.** 실제로 메일이 나간다. 어느 계정에서 보내며, 캡처에 주소를 노출하는가?
9. **액션박스 배치.** 액션박스를 다는 슬라이드 후보: `account_privacy_화면`/`billing`/`usage`
   (claude.ai URL 3개), `perm_bypass_실행` (copy `claude --dangerously-skip-permissions`),
   `chrome_소개_페이지`·`chrome_웹스토어` (URL 2개). 이대로 가는가?
10. **'욜로 모드' 표현 폐기.** 새 아웃라인은 bypass 모드로 부른다. 수업 구술에서도 bypass 로 통일하는가?

## 5. 장수

| 항목 | 값 |
|---|---|
| 현행 step03 | 18장 |
| 계획 step03 | **54장** (7파트) |
| 기존 유지 | **0장** (현행 18장에 실제 스크린샷이 박힌 슬라이드가 없다) |
| 기존 수정 | 15장 |
| 신규 제작 | 39장 |
| 삭제 | 3장 (`보안_설정`, `주요_슬래시_명령어`=`#basic/3/9`, `config_설정_항목_(2_2)`) |
| 캡처해야 할 스크린샷 | 35건 (유키 24 / CEO 11) |

참고: 1회차 66장, 2회차 86장. 4·2·1번 열린 질문(복습·마무리 파트) 결정에 따라 54장은 최대 +15 움직인다.
