import os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
MONO = "'Courier New',Courier,monospace"


def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def wrap(inner):
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
        '  <rect width="1280" height="720" fill="#ffffff"/>\n'
        + inner +
        '\n</svg>\n'
    )


def badge():
    return (
        f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#2563eb"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{FONT}" '
        f'font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">ADV 07</text>'
    )


def divider(y):
    return f'  <line x1="60" y1="{y}" x2="1220" y2="{y}" stroke="#e5e7eb" stroke-width="1"/>'


def title(text, size=40):
    return (
        f'  <text x="60" y="130" font-family="{FONT}" font-size="{size}" '
        f'font-weight="700" fill="#171717">{esc(text)}</text>'
    )


def sub(text):
    return f'  <text x="60" y="178" font-family="{FONT}" font-size="19" fill="#6b7280">{esc(text)}</text>'


def label(y, text):
    return (
        f'  <text x="60" y="{y}" font-family="{FONT}" font-size="14" font-weight="600" '
        f'fill="#9ca3af" letter-spacing="0.08em">{esc(text)}</text>'
    )


def footer(text, light=False):
    bg = "#eff6ff" if light else "#2563eb"
    fg = "#2563eb" if light else "#ffffff"
    size = "15" if light else "17"
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="{bg}"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{FONT}" '
        f'font-size="{size}" font-weight="600" fill="{fg}">{esc(text)}</text>'
    )


def mono_line(x, y, text, color="#374151", size=13):
    return f'  <text x="{x}" y="{y}" font-family="{MONO}" font-size="{size}" fill="{color}">{esc(text)}</text>'


def text_line(x, y, text, color="#374151", size=14, bold=False):
    fw = ' font-weight="700"' if bold else ''
    return f'  <text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}"{fw} fill="{color}">{esc(text)}</text>'


# -----------------------------------------------------------------------
# 슬라이드 7: 스킬_세팅_확인
# -----------------------------------------------------------------------
def make_skill_check():
    parts = [
        badge(),
        title("스킬 세팅 확인"),
        sub("Step3 · Step4 · Step6에서 만든 스킬 파일이 있는지 확인합니다"),
        divider(212),
        label(254, "확인할 스킬 파일 3개 (.claude/skills/ 폴더)"),

        # 카드 1: gws_skill.md (파란)
        f'  <rect x="60" y="268" width="355" height="252" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>',
        text_line(80, 302, "gws_skill.md", color="#1e40af", size=16, bold=True),
        text_line(80, 326, "Step3 GWS CLI에서 생성", color="#6b7280", size=13),
        divider_local(60, 340, 415),
        text_line(80, 362, "GWS CLI 통합 스킬", color="#374151", size=14, bold=True),
        text_line(80, 386, "gmail · calendar · sheets · drive", color="#6b7280", size=13),
        text_line(80, 410, "gws 명령어를 Claude가 자연어로", color="#374151", size=13),
        text_line(80, 432, "변환하여 실행합니다", color="#374151", size=13),
        text_line(80, 496, "Step3 완료 시 자동 생성됨", color="#2563eb", size=13),

        # 카드 2: naver-datalab.md (노란)
        f'  <rect x="453" y="268" width="355" height="252" rx="10" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>',
        text_line(473, 302, "naver-datalab.md", color="#92400e", size=16, bold=True),
        text_line(473, 326, "Step4 네이버 API에서 생성", color="#6b7280", size=13),
        divider_local(453, 340, 808),
        text_line(473, 362, "네이버 API 스킬", color="#374151", size=14, bold=True),
        text_line(473, 386, "네이버 데이터랩 검색 트렌드 조사", color="#6b7280", size=13),
        text_line(473, 410, "키워드 검색량 추이를 조회하고", color="#374151", size=13),
        text_line(473, 432, "결과를 정리합니다", color="#374151", size=13),
        text_line(473, 496, "Step4 완료 시 자동 생성됨", color="#d97706", size=13),

        # 카드 3: notion-work.md (초록)
        f'  <rect x="846" y="268" width="374" height="252" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>',
        text_line(866, 302, "notion-work.md", color="#14532d", size=16, bold=True),
        text_line(866, 326, "Step6 세컨드브레인에서 생성", color="#6b7280", size=13),
        divider_local(846, 340, 1220),
        text_line(866, 362, "Work DB 조회 스킬", color="#374151", size=14, bold=True),
        text_line(866, 386, "Notion Work DB task 목록 조회", color="#6b7280", size=13),
        text_line(866, 410, "오늘 마감 task를 불러와서", color="#374151", size=13),
        text_line(866, 432, "처리 목록을 만들어 줍니다", color="#374151", size=13),
        text_line(866, 496, "Step6 완료 시 자동 생성됨", color="#16a34a", size=13),

        footer("3개 모두 확인 후 다음 단계로 진행합니다", light=True),
    ]
    return wrap("\n".join(parts))


def divider_local(x1, y, x2):
    return f'  <line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="#e5e7eb" stroke-width="1"/>'


# -----------------------------------------------------------------------
# 스킬 만들기 슬라이드 공통 함수
# -----------------------------------------------------------------------
def make_work_skill(title_text, sub_text, badge_color,
                    trigger_label, trigger_text,
                    steps, skill_name, skill_purpose,
                    skill_steps, footer_text):
    """
    badge_color: 헤더 색 (e.g. "#2563eb")
    trigger_label: e.g. "유형 = '미팅'"
    trigger_text: e.g. "Work DB 미팅 task 감지 시 실행"
    steps: [(번호, 내용), ...] 처리 순서
    skill_name: e.g. "work-meeting"
    skill_purpose: e.g. "Work DB 미팅 task를 캘린더에 등록"
    skill_steps: [문자열, ...] SKILL.md 내 처리 방식 목록
    """
    # 좌측 박스: 스킬 역할
    left_items = [
        f'  <rect x="60" y="232" width="530" height="310" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>',
        f'  <text x="80" y="264" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">스킬 역할</text>',
        f'  <rect x="80" y="278" width="490" height="34" rx="6" fill="{badge_color}" opacity="0.12"/>',
        f'  <text x="90" y="300" font-family="{FONT}" font-size="13" font-weight="700" fill="{badge_color}">{esc(trigger_label)}</text>',
        f'  <text x="80" y="338" font-family="{FONT}" font-size="14" fill="#374151">{esc(trigger_text)}</text>',
        f'  <text x="80" y="374" font-family="{FONT}" font-size="13" font-weight="600" fill="#9ca3af" letter-spacing="0.06em">처리 순서</text>',
    ]
    y = 396
    for step in steps:
        left_items.append(
            f'  <text x="80" y="{y}" font-family="{FONT}" font-size="13" fill="#374151">{esc(step)}</text>'
        )
        y += 24
    left_items.append(
        f'  <text x="80" y="506" font-family="{FONT}" font-size="13" fill="#6b7280">gws_skill.md + notion-work.md 활용</text>'
    )

    # 우측 박스: SKILL.md 구조
    right_items = [
        f'  <rect x="620" y="232" width="600" height="310" rx="10" fill="#f8fafc" stroke="#e5e7eb" stroke-width="1"/>',
        f'  <text x="640" y="264" font-family="{FONT}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">SKILL.md 구조 예시</text>',
    ]
    code_y = 290
    code_lines = [
        f"# {skill_name} 스킬",
        "",
        "## 용도",
        skill_purpose,
        "",
        "## 처리 방식",
    ] + [f"{i+1}. {s}" for i, s in enumerate(skill_steps)]

    for line in code_lines:
        color = "#2563eb" if line.startswith("#") else ("#374151" if line else "#374151")
        if line.startswith("##"):
            color = "#374151"
            bold_part = f' font-weight="600"'
        else:
            bold_part = ""
        right_items.append(
            f'  <text x="640" y="{code_y}" font-family="{MONO}" font-size="12"{bold_part} fill="{color}">{esc(line)}</text>'
        )
        code_y += 20

    parts = (
        [badge(),
         f'  <text x="60" y="130" font-family="{FONT}" font-size="36" font-weight="700" fill="#171717">{esc(title_text)}</text>',
         sub(sub_text),
         divider(212)]
        + left_items
        + right_items
        + [footer(footer_text, light=True)]
    )
    return wrap("\n".join(parts))


# -----------------------------------------------------------------------
# 신규 슬라이드 정의
# -----------------------------------------------------------------------
NEW_SLIDES = {
    "스킬_세팅_확인": make_skill_check,

    "work-meeting_스킬_만들기": lambda: make_work_skill(
        title_text="work-meeting 스킬 만들기",
        sub_text="미팅 task를 받아 Google Calendar에 등록하는 처리 방식을 정의합니다",
        badge_color="#2563eb",
        trigger_label="유형 = '미팅'  감지 시 실행",
        trigger_text="Work DB에서 유형이 '미팅'인 task를 처리합니다",
        steps=[
            "1. task명에서 날짜 / 시간 파악",
            "2. gws_skill.md 캘린더 기능으로 일정 등록",
            "3. notion-work 스킬로 Status = '완료' 업데이트",
        ],
        skill_name="work-meeting",
        skill_purpose="Work DB 미팅 task를 캘린더에 등록",
        skill_steps=[
            "task명에서 날짜/시간 추출",
            "gws calendar 기능으로 일정 등록",
            "Status = '완료' 변경",
        ],
        footer_text="Claude에게 'work-meeting.md 스킬 파일 만들어줘'라고 요청합니다",
    ),

    "work-research_스킬_만들기": lambda: make_work_skill(
        title_text="work-research 스킬 만들기",
        sub_text="리서치 task를 받아 데이터랩으로 조사하고 결과를 저장하는 처리 방식입니다",
        badge_color="#d97706",
        trigger_label="유형 = '리서치'  감지 시 실행",
        trigger_text="Work DB에서 유형이 '리서치'인 task를 처리합니다",
        steps=[
            "1. task명에서 핵심 키워드 추출",
            "2. naver-datalab.md 스킬로 검색량 조사",
            "3. 조사 결과를 Work DB 메모에 저장",
            "4. notion-work 스킬로 Status = '완료' 업데이트",
        ],
        skill_name="work-research",
        skill_purpose="Work DB 리서치 task를 조사하고 결과 저장",
        skill_steps=[
            "task명에서 핵심 키워드 추출",
            "naver-datalab으로 검색량 조사",
            "결과를 Work DB 메모에 저장",
            "Status = '완료' 변경",
        ],
        footer_text="Claude에게 'work-research.md 스킬 파일 만들어줘'라고 요청합니다",
    ),

    "work-docs_스킬_만들기": lambda: make_work_skill(
        title_text="work-docs 스킬 만들기",
        sub_text="문서 task를 받아 Google Sheets를 생성하는 처리 방식을 정의합니다",
        badge_color="#16a34a",
        trigger_label="유형 = '문서'  감지 시 실행",
        trigger_text="Work DB에서 유형이 '문서'인 task를 처리합니다",
        steps=[
            "1. task명에서 정리할 내용 파악",
            "2. gws_skill.md Sheets 기능으로 시트 생성",
            "3. 생성된 시트 링크를 Work DB 메모에 저장",
            "4. notion-work 스킬로 Status = '완료' 업데이트",
        ],
        skill_name="work-docs",
        skill_purpose="Work DB 문서 task를 Google Sheets로 정리",
        skill_steps=[
            "task명에서 정리 내용 파악",
            "gws sheets 기능으로 시트 생성",
            "시트 링크를 Work DB 메모에 저장",
            "Status = '완료' 변경",
        ],
        footer_text="Claude에게 'work-docs.md 스킬 파일 만들어줘'라고 요청합니다",
    ),

    "work-email_스킬_만들기": lambda: make_work_skill(
        title_text="work-email 스킬 만들기",
        sub_text="이메일 task를 받아 내용을 작성하고 Gmail로 발송하는 처리 방식입니다",
        badge_color="#9333ea",
        trigger_label="유형 = '이메일'  감지 시 실행",
        trigger_text="Work DB에서 유형이 '이메일'인 task를 처리합니다",
        steps=[
            "1. task명에서 수신자 / 용건 파악",
            "2. Claude가 이메일 초안 작성",
            "3. gws_skill.md gmail 기능으로 발송",
            "4. notion-work 스킬로 Status = '완료' 업데이트",
        ],
        skill_name="work-email",
        skill_purpose="Work DB 이메일 task를 작성하고 Gmail로 발송",
        skill_steps=[
            "task명에서 수신자/용건 파악",
            "Claude가 이메일 초안 작성",
            "gws gmail 기능으로 발송",
            "Status = '완료' 변경",
        ],
        footer_text="Claude에게 'work-email.md 스킬 파일 만들어줘'라고 요청합니다",
    ),
}

for filename, gen in NEW_SLIDES.items():
    path = os.path.join(BASE, f"{filename}.svg")
    content = gen()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {filename}.svg")

print("Done.")
