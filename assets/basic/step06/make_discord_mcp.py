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

# 17.svg - Discord Bot 토큰 발급
s17 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">Discord Bot \ud1a0\ud070 \ubc1c\uae09</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">Discord MCP \uc5f0\uacb0\uc5d0 \ud544\uc694\ud55c Bot \ud1a0\ud070\uc744 \ubc1c\uae09\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 258, "1\ub2e8\uacc4")
    + t(60, 294, "discord.com/developers/applications \uc811\uc18d  \u2192  New Application  \u2192  \uc774\ub984 \uc785\ub825")
    + lbl(60, 344, "2\ub2e8\uacc4")
    + t(60, 380, "Bot \ud0ed  \u2192  Reset Token  \u2192  \ud1a0\ud070 \ubcf5\uc0ac")
    + t(60, 416, "Message Content Intent \ud65c\uc131\ud654 (Privileged Gateway Intents)")
    + lbl(60, 462, "3\ub2e8\uacc4")
    + t(60, 498, "OAuth2 \ud0ed  \u2192  URL Generator  \u2192  bot \uccb4\ud06c  \u2192  Read/Send Messages \uad8c\ud55c")
    + t(60, 534, "\uc0dd\uc131\ub41c URL\ub85c \uc811\uc18d\ud574\uc11c \ubcf8\uc778 \uc11c\ubc84\uc5d0 \ubc07 \ucd08\ub300")
    + footer("\ud1a0\ud070\uc740 \ube44\ubc00\ubc88\ud638\uccab\ub7fc \uad00\ub9ac  \u2014  \ucf54\ub4dc\uc5d0 \uc9c1\uc811 \uc785\ub825 \uae08\uc9c0, \ud658\uacbd\ubcc0\uc218\ub85c \ubcf4\uad00")
)
s17 += '</svg>\n'

# 18.svg - Discord MCP 설치
s18 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">Discord MCP \uc124\uce58</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">Node.js \uae30\ubc18 stdio \uc11c\ubc84\ub97c \ub85c\ucec8\uc5d0 \uc124\uce58\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 254, "1\ub2e8\uacc4  \u2014  \uc800\uc7a5\uc18c \ud074\ub860 \ubc0f \ube4c\ub4dc")
    + codebox(60, 268, 800, 44, "git clone https://github.com/v-3/discordmcp &amp;&amp; cd discordmcp", cx=460)
    + codebox(60, 322, 500, 44, "npm install &amp;&amp; npm run build", cx=310)
    + lbl(60, 394, "2\ub2e8\uacc4  \u2014  \ud658\uacbd\ubcc0\uc218 \uc124\uc815")
    + codebox(60, 408, 700, 44, "DISCORD_TOKEN=\ubc1c\uae09\ubc1b\uc740_\ud1a0\ud070", cx=410, size=15)
    + lbl(60, 474, "3\ub2e8\uacc4  \u2014  MCP \ub4f1\ub85d")
    + codebox(60, 488, 1000, 44, "claude mcp add --transport stdio discord -- node /\uacbd\ub85c/discordmcp/build/index.js", cx=560, size=14)
    + footer("claude mcp list \ub85c discord \uc11c\ubc84 \ub4f1\ub85d \ud655\uc778")
)
s18 += '</svg>\n'

# 19.svg - Discord MCP 실습
s19 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + practice_badge()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">Discord MCP \uc2e4\uc2b5</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">Claude\ub85c \ub514\uc2a4\ucf54\ub4dc \uba54\uc2dc\uc9c0\ub97c \uc77d\uace0 \ubcf4\ub0c5\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 256, "\uc2e4\uc2b5 1  \u2014  \uba54\uc2dc\uc9c0 \uc77d\uae30")
    + promptbox(90, 270, 1090, 52, "\ub098\uc5d0\uac8c \uba58\uc158\ub41c \uba54\uc2dc\uc9c0\uac00 \uc788\ub294\uc9c0 \uc77d\uc5b4\uc918", cx=635)
    + lbl(60, 352, "\uc2e4\uc2b5 2  \u2014  \uba54\uc2dc\uc9c0 \ubcf4\ub0b4\uae30")
    + promptbox(90, 366, 1090, 52, "#\uc77c\ubc18 \ucc44\ub110\uc5d0 '\ud14c\uc2a4\ud2b8 \uba54\uc2dc\uc9c0'\ub77c\uace0 \ubcf4\ub0b4\uc918", cx=635)
    + lbl(60, 450, "MCP\ub85c \ud560 \uc218 \uc5c6\ub294 \uac83 \ud655\uc778")
    + t(60, 490, "\uba58\uc158 \ud544\ud130\ub9c1  /  \ud2b9\uc815 \uc720\uc800 ID @\uba58\uc158  \u2192  \uc774\uac74 \ub2e4\uc74c step\uc5d0\uc11c \ud2b9\uae30\ub85c \ub9cc\ub4e4 \uc608\uc815")
    + footer("read-messages \ubc0f send-message 2\uac00\uc9c0 \ud234\ub9cc \uc81c\uacf5  \u2014  \ucd94\uac00 \ub85c\uc9c1\uc740 \uc2a4\ud0ac\uc774 \ud544\uc694")
)
s19 += '</svg>\n'

for fname, content in [('17.svg', s17), ('18.svg', s18), ('19.svg', s19)]:
    ET.fromstring(content.strip())
    with open(base + fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname} saved OK')
