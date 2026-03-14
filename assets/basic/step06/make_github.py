import xml.etree.ElementTree as ET
import os

base = os.path.dirname(os.path.abspath(__file__)) + '/'

font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
mono = "'Courier New',Courier,monospace"

def hdr():
    return (
        '  <rect width="1280" height="720" fill="#ffffff"/>\n'
        '  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{font}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 06</text>\n'
    )

def practice_badge():
    return (
        '  <rect x="152" y="44" width="52" height="24" rx="12" fill="#2563eb"/>\n'
        f'  <text x="178" y="60" text-anchor="middle" font-family="{font}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">\uc2e4\uc2b5</text>\n'
    )

def footer(t):
    return (
        '  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#f3f4f6"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{font}" font-size="15" fill="#6b7280">{t}</text>\n'
    )

def div(y=212):
    return f'  <line x1="60" y1="{y}" x2="1220" y2="{y}" stroke="#e5e7eb" stroke-width="1"/>\n'

def t(x, y, s, color="#374151", size=19):
    return f'  <text x="{x}" y="{y}" font-family="{font}" font-size="{size}" fill="{color}">{s}</text>\n'

def lbl(x, y, s):
    return f'  <text x="{x}" y="{y}" font-family="{font}" font-size="14" font-weight="600" fill="#9ca3af" letter-spacing="0.08em">{s}</text>\n'

def codebox(x, y, w, h, code, cx=None, size=16):
    cx = cx or x + w // 2
    return (
        f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
        f'  <text x="{cx}" y="{y + h//2 + 6}" text-anchor="middle" font-family="{mono}" font-size="{size}" fill="#1d4ed8">{code}</text>\n'
    )

def promptbox(x, y, w, h, content, cx=None, size=18):
    cx = cx or x + w // 2
    return (
        f'  <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
        f'  <text x="{cx}" y="{y + h//2 + 6}" text-anchor="middle" font-family="{font}" font-size="{size}" fill="#1d4ed8">{content}</text>\n'
    )

def stepnum(n, x=60, y=0):
    return f'  <text x="{x}" y="{y}" font-family="{font}" font-size="19" fill="#9ca3af" font-weight="600">{n}</text>\n'

# 17.svg - GitHub MCP 소개 (백업 도구 느낌)
s17 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">GitHub MCP</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">작업 폴더를 클라우드에 백업합니다</text>\n'
    + div()
    + lbl(60, 262, "\uc65c GitHub \ubc31\uc5c5\uc778\uac00?")
    + t(60, 306, "\uc5b8\uc81c \ubb3c\ub9ac\uc801 \uc784\ubc31\uc5c5\uc774 \uc5c6\uc5b4\ub3c4  \u2014  \uc778\ud130\ub137 \uc5b4\ub514\uc11c\ub098 \uc811\uadfc \uac00\ub2a5")
    + t(60, 346, "\ubaa8\ub4e0 \ubcc0\uacbd \uc774\ub825\uc774 \uc790\ub3d9 \uc800\uc7a5  \u2014  \uc2e4\uc218\ub85c \uc9c0\uc6cc\ub3c4 \ubcf5\uc6d0 \uac00\ub2a5")
    + t(60, 386, "\ub9c1\ud06c \uc0ac\ub78c\uacfc \uacf5\uc720  \u2014  \uc774\uba54\uc77c \uccca\ubd80 \ub300\uc2e0 URL \ud558\ub098\ub85c \uc804\ub2ec")
    + div(426)
    + lbl(60, 466, "Claude\ub85c \ud560 \uc218 \uc788\ub294 \uc77c")
    + t(60, 506, "\ud604\uc7ac \ud3f4\ub354 \uc804\uccb4\ub97c GitHub\uc5d0 \uc62c\ub824\uc918  /  \uc0c8 \ud30c\uc77c \ucd94\uac00\ud574\uc918")
    + t(60, 546, "\ubcc0\uacbd\ub41c \ub0b4\uc6a9 \uc5c5\ub370\uc774\ud2b8\ud574\uc918  /  \uc9c0\ub09c \ubc84\uc804\uc73c\ub85c \ub418\ub3cc\ub824\uc918")
    + footer("GitHub \ubb34\ub8cc \uacc4\uc815\uc73c\ub85c \uc6a9\ub7c9 \ubb34\uc81c\ud55c \ubbf8\ub9ac\ubcf4\uae30 \uc81c\uacf5  \u2014  \ubcc0\uacbd \uc774\ub825 \uc790\ub3d9 \uae30\ub85d")
    + '</svg>\n'
)

# 18.svg - GitHub MCP 등록
s18 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">GitHub MCP \ub4f1\ub85d</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">GitHub \uacc4\uc815\ub9cc \uc788\uc73c\uba74 \ubc14\ub85c \uc5f0\uacb0 \uac00\ub2a5\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 262, "1\ub2e8\uacc4  \u2014  MCP \uc11c\ubc84 \ub4f1\ub85d")
    + codebox(60, 276, 860, 48, "claude mcp add --transport http github https://api.githubcopilot.com/mcp/", cx=490)
    + lbl(60, 370, "2\ub2e8\uacc4  \u2014  \uc778\uc99d \uc9c4\ud589")
    + t(60, 410, "claude --dangerously-skip-permissions \uc2e4\ud589")
    + t(60, 450, "/mcp  \u2192  github \uc120\ud0dd  \u2192  Authenticate  \u2192  \uacf5\uc2dd GitHub \ub85c\uadf8\uc778")
    + lbl(60, 510, "3\ub2e8\uacc4  \u2014  \uc5f0\uacb0 \ud655\uc778")
    + codebox(60, 524, 200, 44, "/mcp", cx=160)
    + footer("github \uc11c\ubc84\uac00 connected \uc0c1\ud0dc\uc774\uba74 \uc790\uc5f0\uc5b4\ub85c \ub80c\ud3ec \uc0dd\uc131 \u00b7 \ud30c\uc77c \uc5c5\ub85c\ub4dc \uac00\ub2a5")
    + '</svg>\n'
)

# 19.svg - GitHub MCP 실습
s19 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + practice_badge()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">GitHub MCP \uc2e4\uc2b5</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">\ud604\uc7ac \ud3f4\ub354\ub97c GitHub\uc5d0 \ubc31\uc5c5\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + stepnum(1, 60, 264)
    + t(90, 264, "practice \ud3f4\ub354\ub85c \uc774\ub3d9 \ud6c4 claude \uc2e4\ud589")
    + stepnum(2, 60, 324)
    + t(90, 324, "\uc544\ub798 \ud504\ub86c\ud504\ud2b8 \uc785\ub825")
    + promptbox(90, 342, 1090, 52, "\ud604\uc7ac \ud3f4\ub354\ub97c GitHub \uc0c8 \ub808\ud3ec\uc9c0\ud130\ub9ac\uc5d0 \ubc31\uc5c5\ud574\uc918. \ub808\ud3ec \uc774\ub984\uc740 my-practice-backup\uc73c\ub85c \ud574\uc918", cx=635)
    + stepnum(3, 60, 438)
    + t(90, 438, "Claude\uac00 \ub808\ud3ec \uc0dd\uc131 \u2192 \ud30c\uc77c \uc5c5\ub85c\ub4dc \uc644\ub8cc \ud6c4 GitHub URL \uc81c\uacf5 \ud655\uc778")
    + stepnum(4, 60, 494)
    + t(90, 494, "\ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c URL \uc811\uc18d \ud6c4 \ud30c\uc77c \uae30\ub85d \ud655\uc778")
    + footer("\ub808\ud3ec\ub294 Public(\uacf5\uac1c) \ub610\ub294 Private(\ube44\uacf5\uac1c) \uc120\ud0dd \uac00\ub2a5  \u2014  Claude\uc5d0\uac8c \uc694\uccad\ud558\uba74 \uc790\ub3d9 \uc124\uc815")
    + '</svg>\n'
)

for fname, content in [('17.svg', s17), ('18.svg', s18), ('19.svg', s19)]:
    ET.fromstring(content.strip())
    with open(base + fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname} saved OK')
