# basic step6 (MCP) — slide structure draft (CEO outline 2026-09-22)

Account for all web captures: 수업용 구글 계정 (playwright 수업용 프로필).
Conventions follow step5: parts with cover slides, keyword headings + spoken-style note bodies,
screenshots in public/shots/s6-*, illustrations must be colorful and polished (NOT the B&W office style).

## Part 1 — MCP란? (concept, 5)
1. MCP = AI와 외부 서비스를 잇는 다리 (Claude - bridge - Notion/Google/Blender icons)
2. 온라인 서비스 원리 1: 서버=총무, 나=클라이언트 (phone call -> "네" -> fax/email)
3. 원리 2: 요청은 버튼으로, 버튼 뒤에는 배선된 '서버 요청 명령어' (button cutaway)
4. 원리 3: 버튼 시동 vs 전선 직결 = API (car analogy; stop here, no deeper)
5. 원리 4: 명령어 모음집을 AI에 연결 = MCP (toolbox of commands -> Claude)

## Part 2 — 웹에서 커넥터 연결하기 (practice 1 setup, 6)
6. claude.ai/directory 접속 (note: 웹 클로드는 MCP를 '커넥터'라고 부름)   [shot]
7. 노션 검색                                                              [shot]
8. + 버튼                                                                 [shot]
9. 노션 OAuth 창 -> 계속하기                                               [shot]
10. customize/connectors/yours 에서 연결 확인                              [shot]
11. VSCode: claude --dangerously-skip-permissions -> /mcp -> "claude.ai Notion ✔ connected · 45 tools"  [terminal mock]

## Part 3 — 노션 첫 실습 (7)
12. 노션이란? 문서+데이터베이스 (docs+sheet 느낌), 협업툴로 대중적          [illustration]
13. 프롬프트: "현재 노션 mcp 연결상태 확인하고, 모든 툴목록 토대로 너가 뭘할수 있는지 설명해줘"
14. 결과                                                                  [terminal, rehearsal]
15. 프롬프트: "'테스트페이지'라는 제목으로 개인페이지를 만든다음 크롬에서 그 페이지를 열어줘"
16. 결과: 크롬 + VSCode 좌우 배치                                          [shot pair]
17. 프롬프트: 벚꽃축제 웹서치 -> 제목 변경 + 리서치보고서(표 포함)
18. 결과: 실시간 변경된 노션 + 터미널 좌우                                  [shot pair]

## Part 4 — 노션의 장점 (7)
19. 장점1 공유: 우상단 공유 -> 초대받은 사용자만                            [shot]
20. -> 링크가 있는 웹의 모든 사용자 -> 링크 복사                            [shot]
21. PDF: ... -> 내보내기 -> 형식 '마크다운&CSV' -> PDF 선택                  [shot]
22. PDF 다운로드 결과                                                      [shot]
23. 장점2 마크다운: 마크다운&CSV로 내보내기 -> 에이전트1 폴더로 옮기기       [shot]
24. VSCode 탐색기에서 열기 — 마크다운 기반이라 AI와 호환이 좋다             [shot]
25. 장점3 템플릿이 많다 / 문제: 채우기가 매우 귀찮다 -> AI로 해결           [illustration]

## Part 5 — 템플릿 + AI (8)
26. notion.com/ko/explore-templates 목록                                   [shot]
27. 맨 아래 '여행 일정 & 경비 관리 All in One'                              [shot, creator name blurred]
28. 템플릿 모달 -> 템플릿 사용하기                                          [shot]
29. 새 창 -> 개인페이지에 추가                                              [shot]
30. 프롬프트: 복제한 페이지 구조와 DB 분석
31. 분석 결과                                                              [terminal, rehearsal]
32. 프롬프트: 기존 데이터 제거 + 스페인 2박3일 웹서치로 채우기
33. 결과 (채워진 노션 템플릿)                                              [shot]

## Part 6 — 구글 캘린더 (5)
34. 웹 클로드에서 구글 캘린더 추가 -> 구글 계정 연결                         [shot x2]
35. Ctrl+C -> 재실행 -> /mcp 에 추가된 것 확인                              [terminal]
36. 툴목록 토대로 할 수 있는 것 묻기                                        [prompt + result]
37. 실습 카드: 이벤트 추가 / 읽기 / 반복일정 / 삭제                          [prompts]
38. 실습 카드: Meet 링크 추출 / 안 바쁜 시간 찾기                            [prompts]

## Part 7 — 구글 드라이브 (4)
39. 추가 -> 연결 -> 재실행 -> /mcp                                          [shot + terminal]
40. 툴목록 묻기
41. 실습: 파일 조회 / 폴더 만들기
42. 실습: 업로드 / 다운로드

## Part 8 — Gmail (4)
43. 추가 -> 연결 -> 재실행 -> /mcp
44. 툴목록 묻기
45. 실습: 기존 메일 조회
46. 실습: 나에게 보내기 (실제 발송 테스트)

## Part 9 — Blender MCP: 로컬 MCP (7)
47. 웹 커넥터 vs 로컬 MCP 차이 (웹=계정 따라다님 / 로컬=내 PC 프로그램 직접 조종)  [illustration]
48. 설치 프롬프트: "블렌더 설치해주고, 현재폴더에 blender mcp도 설치해줘 …"
49. Ctrl+C -> claude --dangerously-skip-permissions -c 재부팅
50. "이제 블렌더 실행한다음 연결상태 체크해봐" 결과                          [shot: Blender + terminal]
51. 프롬프트: '공의 모험' 플랫포머 맵 + 다이나믹 카메라 + mp4 저장
52. 진행 화면                                                              [shot]
53. 결과 영상 프레임                                                       [video frames, rehearsal]

Total ~53 content slides + 9 covers = ~62.

## Capture list (web, 수업용 구글 계정)
- claude.ai: directory, notion search, + button, OAuth, connectors/yours, calendar/drive/gmail add + connect
- notion: share menu x2, export menu x2, markdown export, explore-templates list/bottom, template modal, add to private
- Needs real Claude Code runs logged in as 수업용 구글 계정 (rehearsal): all terminal results, Chrome+VSCode side-by-side, Blender run.
