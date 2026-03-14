import xml.etree.ElementTree as ET
import os

base = os.path.dirname(os.path.abspath(__file__)) + '/'

font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
mono = "'Courier New',Courier,monospace"

def badge(num):
    return (
        f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{font}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 06</text>\n'
    )

def footer(text):
    return (
        f'  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#f3f4f6"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{font}" font-size="15" fill="#6b7280">{text}</text>\n'
    )

def divider(y):
    return f'  <line x1="60" y1="{y}" x2="1220" y2="{y}" stroke="#e5e7eb" stroke-width="1"/>\n'

def label(x, y, text, color="#9ca3af", size=14, weight="600", spacing="0.08em"):
    return f'  <text x="{x}" y="{y}" font-family="{font}" font-size="{size}" font-weight="{weight}" fill="{color}" letter-spacing="{spacing}">{text}</text>\n'

def text(x, y, content, color="#374151", size=19):
    return f'  <text x="{x}" y="{y}" font-family="{font}" font-size="{size}" fill="{color}">{content}</text>\n'

def codebox(x, y, w, h, code, size=16, cx=None):
    cx = cx if cx else x + w // 2
    return (
        f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
        f'  <text x="{cx}" y="{y + h//2 + 6}" text-anchor="middle" font-family="{mono}" font-size="{size}" fill="#1d4ed8">{code}</text>\n'
    )

def promptbox(x, y, w, h, content, size=18, cx=None):
    cx = cx if cx else x + w // 2
    return (
        f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
        f'  <text x="{cx}" y="{y + h//2 + 6}" text-anchor="middle" font-family="{font}" font-size="{size}" fill="#1d4ed8">{content}</text>\n'
    )

# 14.svg - Canva MCP 소개
s14 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    '  <rect width="1280" height="720" fill="#ffffff"/>\n'
    + badge(6)
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">Canva MCP</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">자연어로 Canva 디자인을 만들고 내보냅니다</text>\n'
    + divider(212)
    + label(60, 262, "주요 기능")
    + text(60, 306, "Search   \u2014   기존 디자인 \u00b7 템플릿 검색")
    + text(60, 346, "Create   \u2014   새 디자인 자동 생성")
    + text(60, 386, "Autofill   \u2014   텍스트 \u00b7 이미지 자동 채우기")
    + text(60, 426, "Export   \u2014   PNG \u00b7 PDF 등 형식으로 내보내기")
    + footer("Canva 계정만 있으면 OAuth 인증으로 바로 연결 가능")
    + '</svg>\n'
)

# 15.svg - Canva MCP 등록
s15 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    '  <rect width="1280" height="720" fill="#ffffff"/>\n'
    + badge(6)
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">Canva MCP 등록</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">Notion과 동일한 방식으로 등록합니다</text>\n'
    + divider(212)
    + label(60, 262, "1단계  \u2014  MCP 서버 등록")
    + codebox(60, 276, 1000, 48, "claude mcp add --transport http canva https://mcp.canva.com/mcp", cx=570)
    + label(60, 370, "2단계  \u2014  인증 진행")
    + text(60, 410, "claude --dangerously-skip-permissions 실행")
    + text(60, 450, "/mcp  \u2192  canva 선택  \u2192  Authenticate  \u2192  브라우저 Canva 로그인")
    + label(60, 510, "3단계  \u2014  연결 확인")
    + codebox(60, 524, 200, 44, "/mcp", cx=160)
    + footer("canva 서버가 connected 상태이면 바로 자연어로 디자인 제어 가능")
    + '</svg>\n'
)

# 16.svg - Canva MCP 실습
s16 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    '  <rect width="1280" height="720" fill="#ffffff"/>\n'
    + badge(6)
    + f'  <rect x="152" y="44" width="52" height="24" rx="12" fill="#2563eb"/>\n'
    + f'  <text x="178" y="60" text-anchor="middle" font-family="{font}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">실습</text>\n'
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">Canva MCP 실습</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">자연어로 프레젠테이션을 만들고 내보냅니다</text>\n'
    + divider(212)
    + f'  <text x="60" y="264" font-family="{font}" font-size="19" fill="#9ca3af" font-weight="600">1</text>\n'
    + text(90, 264, "아래 프롬프트 입력")
    + promptbox(90, 278, 1090, 52, "AI 에이전트 소개 프레젠테이션을 Canva로 만들고 PDF로 내보내줘", cx=635)
    + f'  <text x="60" y="374" font-family="{font}" font-size="19" fill="#9ca3af" font-weight="600">2</text>\n'
    + text(90, 374, "Claude가 Canva 디자인 생성 후 내보내기 링크 제공 확인")
    + f'  <text x="60" y="434" font-family="{font}" font-size="19" fill="#9ca3af" font-weight="600">3</text>\n'
    + text(90, 434, "추가 수정 요청으로 Autofill 동작 확인")
    + promptbox(90, 448, 900, 52, '첫 번째 슬라이드 제목을 &quot;AI 시대의 업무 혁신&quot;으로 바꿔줘', cx=540)
    + footer("Canva 계정 미보유 시  \u2014  무료 가입 후 진행 가능")
    + '</svg>\n'
)

for fname, content in [('14.svg', s14), ('15.svg', s15), ('16.svg', s16)]:
    ET.fromstring(content.strip())
    with open(base + fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname} saved OK')
