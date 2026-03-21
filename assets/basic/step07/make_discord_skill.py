import xml.etree.ElementTree as ET
import os

base = os.path.dirname(os.path.abspath(__file__)) + '/'
font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"
mono = "'Courier New',Courier,monospace"

def hdr():
    return (
        '  <rect width="1280" height="720" fill="#ffffff"/>\n'
        '  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>\n'
        f'  <text x="99" y="60" text-anchor="middle" font-family="{font}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">BASIC 07</text>\n'
    )

def practice_badge():
    return (
        '  <rect x="152" y="44" width="52" height="24" rx="12" fill="#2563eb"/>\n'
        f'  <text x="178" y="60" text-anchor="middle" font-family="{font}" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="0.05em">\uc2e4\uc2b5</text>\n'
    )

def footer(t_text):
    return (
        '  <rect x="60" y="568" width="1160" height="52" rx="10" fill="#f3f4f6"/>\n'
        f'  <text x="640" y="599" text-anchor="middle" font-family="{font}" font-size="15" fill="#6b7280">{t_text}</text>\n'
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

def stepnum(n, y, x=60):
    return f'  <text x="{x}" y="{y}" font-family="{font}" font-size="19" fill="#9ca3af" font-weight="600">{n}</text>\n'

# 04.svg - access.json 서버 채널 등록
s04 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">access.json \uc11c\ubc84 \ucc44\ub110 \ub4f1\ub85d</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">DM \uc678\uc5d0 \uc11c\ubc84 \ucc44\ub110\ub3c4 Plugin\uc73c\ub85c \uc5f0\uacb0\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 254, "access.json \uc704\uce58")
    + codebox(60, 268, 900, 44, "~/.claude/plugins/discord/access.json", cx=510)
    + lbl(60, 340, "\uc11c\ubc84 \ucc44\ub110 \ub4f1\ub85d \ubc29\ubc95")
    + stepnum(1, 380)
    + t(90, 380, "/discord:access \uba85\ub839\uc5b4\ub85c \uc124\uc815 \ud654\uba74 \uc5f4\uae30")
    + stepnum(2, 420)
    + t(90, 420, "\uc11c\ubc84 \ucc44\ub110\uc744 groups\uc5d0 \ub4f1\ub85d  \u2192  Claude\uac00 \ud574\ub2f9 \ucc44\ub110 \uc811\uadfc \ud5c8\uc6a9")
    + stepnum(3, 460)
    + t(90, 460, "requireMention: true  \u2192  @\uba58\uc158\ub41c \uba54\uc2dc\uc9c0\ub9cc \uc218\uc2e0 (\ub178\uc774\uc988 \ucc28\ub2e8)")
    + lbl(60, 506, "\ud575\uc2ec")
    + t(60, 540, "DM = \uc790\ub3d9 \ud398\uc5b4\ub9c1  /  \uc11c\ubc84 \ucc44\ub110 = access.json\uc5d0 \ub4f1\ub85d \ud544\uc694", "#1d4ed8", size=18)
    + footer("access.json\uc73c\ub85c \ucc44\ub110\ubcc4 \uc811\uadfc \uad8c\ud55c\uc744 \uc138\ubc00\ud558\uac8c \uc81c\uc5b4\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4")
)
s04 += '</svg>\n'

# 05.svg - Plugin 고급 도구 활용
s05 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">Plugin \uace0\uae09 \ub3c4\uad6c \ud65c\uc6a9</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">reply / fetch \uc678\uc5d0 react, edit, download \ub3c4\uad6c\ub97c \ud65c\uc6a9\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 254, "react  \u2014  \uba54\uc2dc\uc9c0\uc5d0 \uc774\ubaa8\uc9c0 \ubc18\uc751")
    + promptbox(90, 268, 1090, 44, "\ub0b4 \ub9c8\uc9c0\ub9c9 \uba54\uc2dc\uc9c0\uc5d0 \ud655\uc778 \uc774\ubaa8\uc9c0 \ubc18\uc751\uc744 \ub2ec\uc544\uc918", cx=635, size=16)
    + lbl(60, 340, "edit_message  \u2014  \ubcf4\ub0b8 \uba54\uc2dc\uc9c0 \uc218\uc815")
    + promptbox(90, 354, 1090, 44, "\ubc29\uae08 \ubcf4\ub0b8 \uba54\uc2dc\uc9c0\ub97c '\uc791\uc5c5 \uc644\ub8cc!'\ub85c \uc218\uc815\ud574\uc918", cx=635, size=16)
    + lbl(60, 426, "download_attachment  \u2014  \ucca8\ubd80 \ud30c\uc77c \ub2e4\uc6b4\ub85c\ub4dc")
    + promptbox(90, 440, 1090, 44, "\ucc44\ub110\uc758 \ucd5c\uadfc \uba54\uc2dc\uc9c0\uc5d0\uc11c \ucca8\ubd80 \ud30c\uc77c\uc744 \ub2e4\uc6b4\ub85c\ub4dc\ud574\uc918", cx=635, size=16)
    + lbl(60, 516, "\ud65c\uc6a9 \uc608\uc2dc")
    + t(60, 548, "\uc9c4\ud589 \uc911 \uba54\uc2dc\uc9c0 \uc804\uc1a1 \u2192 \uc644\ub8cc \ud6c4 edit_message\ub85c \uc5c5\ub370\uc774\ud2b8  \u2014  \uc2e4\uc2dc\uac04 \uc0c1\ud0dc \ubcf4\uace0", "#16a34a", size=17)
    + footer("reply\ub85c \uc804\uc1a1 \u2192 react\ub85c \ud655\uc778 \u2192 edit_message\ub85c \uc218\uc815  \u2014  \uc644\uc804\ud55c \ub300\ud654 \uc790\ub3d9\ud654")
)
s05 += '</svg>\n'

# 11.svg - 기존 MCP vs Plugin 비교
s11 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">\uae30\uc874 MCP vs Plugin</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">\ub450 \ubc29\uc2dd\uc758 \ucc28\uc774\uc810\uc744 \ube44\uad50\ud569\ub2c8\ub2e4</text>\n'
    + div()
    # 좌측: 기존 MCP
    + '  <rect x="60" y="226" width="530" height="260" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
    + f'  <text x="325" y="260" text-anchor="middle" font-family="{font}" font-size="14" font-weight="700" fill="#6b7280" letter-spacing="0.08em">\uae30\uc874 MCP (stdio)</text>\n'
    + t(80, 298, "git clone + npm build \ud544\uc694", size=17)
    + t(80, 334, "read-messages / send-message 2\uac00\uc9c0", size=17)
    + t(80, 370, "\uba58\uc158 \ud544\ud130\ub9c1 \ubd88\uac00", "#dc2626", size=16)
    + t(80, 406, "\ud30c\uc77c \ucca8\ubd80 / \uc774\ubaa8\uc9c0 \ubc18\uc751 \ubd88\uac00", "#dc2626", size=16)
    + t(80, 442, "DM \uc804\uc6a9 (\uc11c\ubc84 \ucc44\ub110 \uc81c\ud55c\uc801)", "#dc2626", size=16)
    # 우측: Plugin
    + '  <rect x="630" y="226" width="590" height="260" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
    + f'  <text x="925" y="260" text-anchor="middle" font-family="{font}" font-size="14" font-weight="700" fill="#1d4ed8" letter-spacing="0.08em">Plugin (\uacf5\uc2dd)</text>\n'
    + t(650, 298, "\uc790\ub3d9 \uc124\uce58  \u2014  \ube4c\ub4dc \uacfc\uc815 \uc5c6\uc74c", size=17)
    + t(650, 334, "reply / fetch / react / edit / download", size=17)
    + t(650, 370, "\uc2e4\uc2dc\uac04 \uba54\uc2dc\uc9c0 \uc218\uc2e0 (channel \ud0dc\uadf8)", "#16a34a", size=16)
    + t(650, 406, "\ud30c\uc77c \ucca8\ubd80 / \uc774\ubaa8\uc9c0 \ubc18\uc751 \uc9c0\uc6d0", "#16a34a", size=16)
    + t(650, 442, "DM + \uc11c\ubc84 \ucc44\ub110 (access.json)", "#16a34a", size=16)
    + footer("Plugin = \uacf5\uc2dd \uc9c0\uc6d0 + \ub354 \ub9ce\uc740 \ub3c4\uad6c + \uc2e4\uc2dc\uac04 \uc218\uc2e0  \u2014  MCP\ubcf4\ub2e4 \uac04\ud3b8\ud558\uace0 \uac15\ub825\ud569\ub2c8\ub2e4")
)
s11 += '</svg>\n'

# 12.svg - 서버 채널 실습 준비 (공부방 서버 초대)
s12 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + practice_badge()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">\uc11c\ubc84 \ucc44\ub110 \uc2e4\uc2b5 \uc900\ube44</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">\uacf5\ubd80\ubc29 \uc11c\ubc84\uc5d0 \uc811\uc18d\ud558\uc5ec \uc11c\ubc84 \ucc44\ub110 \uc2e4\uc2b5\uc744 \uc900\ube44\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 256, "1\ub2e8\uacc4  \u2014  \uacf5\ubd80\ubc29 \uc11c\ubc84 \uc785\uc7a5")
    + codebox(60, 270, 600, 52, "https://discord.gg/nZZrS5QN8F", cx=360, size=18)
    + t(60, 354, "\ucd08\ub300 \ub9c1\ud06c\ub85c \uc811\uc18d\ud558\uc5ec \uacf5\ubd80\ubc29 Discord \uc11c\ubc84\uc5d0 \uc785\uc7a5\ud569\ub2c8\ub2e4", "#6b7280", size=16)
    + lbl(60, 394, "2\ub2e8\uacc4  \u2014  \ubd07 \ucd08\ub300")
    + t(60, 430, "\ubcf8\uc778 \ubd07\uc744 \uacf5\ubd80\ubc29 \uc11c\ubc84\uc5d0 \ucd08\ub300  (OAuth2 URL Generator \uc774\uc6a9)")
    + lbl(60, 470, "3\ub2e8\uacc4  \u2014  access.json\uc5d0 \ucc44\ub110 \ub4f1\ub85d")
    + t(60, 506, "/discord:access \uba85\ub839\uc5b4\ub85c \uacf5\ubd80\ubc29 \uc11c\ubc84 \ucc44\ub110\uc744 \ub4f1\ub85d")
    + t(60, 542, "\ub4f1\ub85d \ud6c4 Claude\uac00 \ud574\ub2f9 \ucc44\ub110\uc758 \uba54\uc2dc\uc9c0\ub97c \uc77d\uace0 \uc4f8 \uc218 \uc788\uc74c", "#16a34a", size=17)
    + footer("\uacf5\ubd80\ubc29 \uc11c\ubc84\uc5d0\uc11c \ub2e4\ub978 \uc218\uac15\uc0dd\uc758 \ubd07\uacfc \ub300\ud654\ud558\ub294 \uc2e4\uc2b5\uc744 \uc9c4\ud589\ud569\ub2c8\ub2e4")
)
s12 += '</svg>\n'

# 13.svg - 서버 채널 실습 (봇끼리 대화)
s13 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + practice_badge()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">\uc11c\ubc84 \ucc44\ub110 \ub300\ud654 \uc2e4\uc2b5</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">\uacf5\ubd80\ubc29 \uc11c\ubc84\uc5d0\uc11c \ubd07\ub07c\ub9ac \ub300\ud654\ub97c \uc2e4\uc2b5\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 254, "\uc2e4\uc2b5 1  \u2014  \ucc44\ub110\uc5d0 \uba54\uc2dc\uc9c0 \uc804\uc1a1")
    + promptbox(90, 268, 1090, 52, "\uacf5\ubd80\ubc29 \ucc44\ub110\uc5d0 '\uc548\ub155\ud558\uc138\uc694! \uc800\ub294 [\uc774\ub984]\uc758 \ubd07\uc785\ub2c8\ub2e4'\ub77c\uace0 \ubcf4\ub0b4\uc918", cx=635, size=15)
    + lbl(60, 348, "\uc2e4\uc2b5 2  \u2014  \ucc44\ub110 \uba54\uc2dc\uc9c0 \uc77d\uae30")
    + promptbox(90, 362, 1090, 52, "\uacf5\ubd80\ubc29 \ucc44\ub110\uc758 \ucd5c\uadfc \uba54\uc2dc\uc9c0 10\uac1c\ub97c \uc77d\uc5b4\uc918", cx=635)
    + lbl(60, 442, "\uc2e4\uc2b5 3  \u2014  \ubd07\ub07c\ub9ac \ub300\ud654")
    + stepnum(1, 478)
    + t(90, 478, "\uc218\uac15\uc0dd A: \ucc44\ub110\uc5d0 \uba54\uc2dc\uc9c0 \uc804\uc1a1  \u2192  \uc218\uac15\uc0dd B\uc758 \ubd07\uc774 @\uba58\uc158")
    + stepnum(2, 518)
    + t(90, 518, "\uc218\uac15\uc0dd B: fetch_messages\ub85c \uba58\uc158 \ud655\uc778  \u2192  reply\ub85c \ub2f5\uc7a5  \u2192  react\ub85c \ud655\uc778")
    + footer("Plugin\uc73c\ub85c DM + \uc11c\ubc84 \ucc44\ub110 \ubaa8\ub450 \ub300\ud654 \uac00\ub2a5  \u2014  Skills\ub85c \ub354 \ud655\uc7a5\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4")
)
s13 += '</svg>\n'

for fname, content in [('04.svg', s04), ('05.svg', s05), ('11.svg', s11), ('12.svg', s12), ('13.svg', s13)]:
    ET.fromstring(content.strip())
    with open(base + fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname} saved OK')
