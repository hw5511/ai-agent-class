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

def stepnum(n, y, x=60):
    return f'  <text x="{x}" y="{y}" font-family="{font}" font-size="19" fill="#9ca3af" font-weight="600">{n}</text>\n'

# 17.svg - Discord Bot 토큰 발급 (Plugin용)
s17 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">Discord Bot \ud1a0\ud070 \ubc1c\uae09</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">Discord Plugin \uc5f0\uacb0\uc5d0 \ud544\uc694\ud55c Bot \ud1a0\ud070\uc744 \ubc1c\uae09\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 258, "1\ub2e8\uacc4")
    + t(60, 294, "discord.com/developers/applications \uc811\uc18d  \u2192  New Application  \u2192  \uc774\ub984 \uc785\ub825")
    + lbl(60, 344, "2\ub2e8\uacc4")
    + t(60, 380, "Bot \ud0ed  \u2192  Reset Token  \u2192  \ud1a0\ud070 \ubcf5\uc0ac")
    + t(60, 416, "Message Content Intent \ud65c\uc131\ud654 (Privileged Gateway Intents)")
    + lbl(60, 462, "3\ub2e8\uacc4")
    + t(60, 498, "OAuth2 \ud0ed  \u2192  URL Generator  \u2192  bot \uccb4\ud06c  \u2192  Read/Send Messages \uad8c\ud55c")
    + t(60, 534, "\uc0dd\uc131\ub41c URL\ub85c \uc811\uc18d\ud574\uc11c \ubcf8\uc778 \uc11c\ubc84\uc5d0 \ubc07 \ucd08\ub300")
    + footer("\ud1a0\ud070\uc740 \ube44\ubc00\ubc88\ud638\uccab\ub7fc \uad00\ub9ac  \u2014  \ucf54\ub4dc\uc5d0 \uc9c1\uc811 \uc785\ub825 \uae08\uc9c0, .env \ud30c\uc77c\ub85c \ubcf4\uad00")
)
s17 += '</svg>\n'

# 18.svg - Discord Plugin 설치
s18 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">Discord Plugin \uc124\uce58</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">Claude Code \uacf5\uc2dd \ud50c\ub7ec\uadf8\uc778\uc73c\ub85c \ub514\uc2a4\ucf54\ub4dc\ub97c \uc5f0\uacb0\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 254, "1\ub2e8\uacc4  \u2014  .env \ud30c\uc77c\uc5d0 \ud1a0\ud070 \uc800\uc7a5")
    + codebox(60, 268, 700, 44, "DISCORD_BOT_TOKEN=\ubc1c\uae09\ubc1b\uc740_\ud1a0\ud070", cx=410, size=15)
    + t(60, 340, "\ud504\ub85c\uc81d\ud2b8 \ud3f4\ub354\uc5d0 .env \ud30c\uc77c \uc0dd\uc131 \ud6c4 \ud1a0\ud070 \uc800\uc7a5", "#6b7280", size=16)
    + lbl(60, 390, "2\ub2e8\uacc4  \u2014  Claude Code \uc2e4\ud589 \uc2dc Plugin \ud65c\uc131\ud654")
    + codebox(60, 404, 1100, 44, "claude --channels plugin:discord@claude-plugins-official", cx=610, size=15)
    + t(60, 476, "\uc2e4\ud589 \uc2dc \uc790\ub3d9\uc73c\ub85c \ud50c\ub7ec\uadf8\uc778 \ub2e4\uc6b4\ub85c\ub4dc \ubc0f \uc124\uce58  \u2014  \ubcc4\ub3c4 \uc124\uce58 \ubd88\ud544\uc694", "#6b7280", size=16)
    + lbl(60, 516, "\ucc38\uace0")
    + t(60, 546, "git clone / npm build \ud544\uc694 \uc5c6\uc74c  \u2014  Plugin\uc774 \uc790\ub3d9 \ucc98\ub9ac", "#16a34a", size=17)
    + footer("--channels \ud50c\ub798\uadf8\ub85c Plugin \ud65c\uc131\ud654  \u2014  MCP\uc640 \ub2ec\ub9ac \ube4c\ub4dc \uacfc\uc815\uc774 \ud544\uc694 \uc5c6\uc2b5\ub2c8\ub2e4")
)
s18 += '</svg>\n'

# 19.svg - DM 페어링 실습
s19 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + practice_badge()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">DM \ud398\uc5b4\ub9c1 \uc2e4\uc2b5</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">\ubd07\uc5d0\uac8c DM\uc744 \ubcf4\ub0b4 Claude\uc640 \ub514\uc2a4\ucf54\ub4dc\ub97c \uc5f0\uacb0\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 256, "\uc2e4\uc2b5 1  \u2014  DM \ud398\uc5b4\ub9c1")
    + stepnum(1, 294)
    + t(90, 294, "Discord\uc5d0\uc11c \ubcf8\uc778 \ubd07\uc5d0\uac8c \uc9c1\uc811 DM \uc804\uc1a1  \u2192  \ud398\uc5b4\ub9c1 \ucf54\ub4dc \uc218\uc2e0")
    + stepnum(2, 334)
    + t(90, 334, "Claude Code \ud130\ubbf8\ub110\uc5d0 \ud398\uc5b4\ub9c1 \ucf54\ub4dc \uc785\ub825  \u2192  \uc5f0\uacb0 \uc644\ub8cc")
    + lbl(60, 384, "\uc2e4\uc2b5 2  \u2014  \uba54\uc2dc\uc9c0 \uc8fc\uace0\ubc1b\uae30")
    + promptbox(90, 398, 1090, 52, "\ub0b4 DM\uc5d0 '\uc548\ub155\ud558\uc138\uc694! Claude\uc5d0\uc11c \ubcf4\ub0c5\ub2c8\ub2e4'\ub77c\uace0 \ubcf4\ub0b4\uc918", cx=635)
    + lbl(60, 480, "\uc2e4\uc2b5 3  \u2014  \ucd5c\uadfc \uba54\uc2dc\uc9c0 \uc77d\uae30")
    + promptbox(90, 494, 1090, 52, "\ub0b4 DM \ucc44\ub110\uc758 \ucd5c\uadfc \uba54\uc2dc\uc9c0 5\uac1c\ub97c \uc77d\uc5b4\uc918", cx=635)
    + footer("DM \ud398\uc5b4\ub9c1\uc73c\ub85c \uc5f0\uacb0  \u2192  reply / fetch_messages \ub3c4\uad6c\ub85c \ub300\ud654  \u2014  \ub2e4\uc74c step\uc5d0\uc11c \uc11c\ubc84 \ucc44\ub110 \uc5f0\uacb0")
)
s19 += '</svg>\n'

# 20.svg - Plugin 도구 소개 (NEW)
s20 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">Discord Plugin \ub3c4\uad6c</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">Plugin\uc774 \uc81c\uacf5\ud558\ub294 5\uac00\uc9c0 \ub3c4\uad6c\ub97c \uc54c\uc544\ubd05\ub2c8\ub2e4</text>\n'
    + div()
    # 5가지 도구 목록
    + lbl(60, 254, "\uba54\uc2dc\uc9c0 \ub3c4\uad6c")
    + t(60, 290, "reply  \u2014  \ucc44\ub110\uc5d0 \uba54\uc2dc\uc9c0 \uc804\uc1a1 (\ud14d\uc2a4\ud2b8 + \ud30c\uc77c \ucca8\ubd80 \uac00\ub2a5)")
    + t(60, 326, "fetch_messages  \u2014  \ucc44\ub110\uc758 \ucd5c\uadfc \uba54\uc2dc\uc9c0 \uc870\ud68c")
    + t(60, 362, "edit_message  \u2014  \uc774\uc804\uc5d0 \ubcf4\ub0b8 \uba54\uc2dc\uc9c0 \uc218\uc815")
    + lbl(60, 406, "\ubc18\uc751 \ub3c4\uad6c")
    + t(60, 442, "react  \u2014  \uba54\uc2dc\uc9c0\uc5d0 \uc774\ubaa8\uc9c0 \ubc18\uc751 \ucd94\uac00")
    + lbl(60, 486, "\ud30c\uc77c \ub3c4\uad6c")
    + t(60, 522, "download_attachment  \u2014  \uba54\uc2dc\uc9c0\uc758 \ucca8\ubd80 \ud30c\uc77c \ub2e4\uc6b4\ub85c\ub4dc")
    + footer("reply + fetch_messages\uac00 \uae30\ubcf8  \u2014  react / edit_message / download_attachment\ub294 \uace0\uae09 \uae30\ub2a5")
)
s20 += '</svg>\n'

for fname, content in [('17.svg', s17), ('18.svg', s18), ('19.svg', s19), ('20.svg', s20)]:
    ET.fromstring(content.strip())
    with open(base + fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname} saved OK')
