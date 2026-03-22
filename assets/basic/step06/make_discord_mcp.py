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

# 18.svg - Plugin 설치 절차 (Steps 1-3: 실행 -> plugin install -> /mcp enable)
s18 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">Discord Plugin \uc124\uce58</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">Claude Code\uc5d0\uc11c Discord Plugin\uc744 \uc124\uce58\ud558\ub294 \uc808\ucc28\uc785\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 254, "1\ub2e8\uacc4  \u2014  Claude Code \uc2e4\ud589")
    + codebox(60, 268, 1100, 44, "claude --channels plugin:discord@claude-plugins-official --dangerously-skip-permissions", cx=610, size=14)
    + t(60, 340, "--channels \ud50c\ub798\uadf8\ub85c Plugin \ucc44\ub110\uc744 \ud65c\uc131\ud654\ud558\uba70 \uc2e4\ud589\ud569\ub2c8\ub2e4", "#6b7280", size=16)
    + lbl(60, 386, "2\ub2e8\uacc4  \u2014  Plugin \uc124\uce58 (\ucc98\uc74c \uc2e4\ud589 \uc2dc)")
    + t(60, 422, '"plugin:discord  \u2014  plugin not installed" \uba54\uc2dc\uc9c0\uac00 \ub098\uc624\uba74:')
    + codebox(60, 440, 700, 44, "/plugin install discord@claude-plugins-official", cx=410, size=15)
    + t(60, 512, "\uc124\uce58 \uc644\ub8cc \ud6c4 /reload-plugin \uc785\ub825\ud558\uc5ec \ud50c\ub7ec\uadf8\uc778 \uc0c8\ub85c\uace0\uce68", "#6b7280", size=16)
    + lbl(60, 552, "3\ub2e8\uacc4  \u2014  /mcp\uc5d0\uc11c Discord \ud65c\uc131\ud654")
    + t(60, 588, "/mcp \uc785\ub825  \u2192  discord \ud56d\ubaa9\uc744 enable\ub85c \ubcc0\uacbd")
    + footer("\ucc98\uc74c \uc124\uce58 \uc2dc\uc5d0\ub9cc 2~3\ub2e8\uacc4 \ud544\uc694  \u2014  \uc774\ud6c4\uc5d0\ub294 1\ub2e8\uacc4\ub9cc\uc73c\ub85c \uc790\ub3d9 \uc5f0\uacb0\ub429\ub2c8\ub2e4")
)
s18 += '</svg>\n'

# 19.svg - 토큰 저장 + 재실행 (Steps 5-6)
s19 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">\ud1a0\ud070 \uc800\uc7a5\uacfc \uc7ac\uc2e4\ud589</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">Bot \ud1a0\ud070\uc744 \uc800\uc7a5\ud558\uace0 Claude Code\ub97c \uc7ac\uc2e4\ud589\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 254, "4\ub2e8\uacc4  \u2014  .env \ud30c\uc77c\uc5d0 \ud1a0\ud070 \uc800\uc7a5")
    + t(60, 290, 'Claude\uc5d0\uac8c "\ubd07 \ud1a0\ud070\uc744 .env\uc5d0 \uc800\uc7a5\ud574\uc918"\ub77c\uace0 \uc694\uccad\ud558\uac70\ub098, \uc9c1\uc811 \uc0dd\uc131:')
    + codebox(60, 310, 700, 44, "DISCORD_BOT_TOKEN=MTQ8...\ud1a0\ud070\uac12...", cx=410, size=15)
    + t(60, 382, "\uc800\uc7a5 \uacbd\ub85c: ~/.claude/channels/discord/.env", "#6b7280", size=16)
    + t(60, 414, "\ud1a0\ud070\uc740 \ube44\ubc00\ubc88\ud638\ucc98\ub7fc \uad00\ub9ac  \u2014  \ucf54\ub4dc\uc5d0 \uc9c1\uc811 \uc785\ub825 \uae08\uc9c0", "#dc2626", size=16)
    + lbl(60, 462, "5\ub2e8\uacc4  \u2014  Claude Code \uc885\ub8cc \ud6c4 \uc7ac\uc2e4\ud589")
    + t(60, 498, "Ctrl+C\ub85c Claude Code \uc885\ub8cc  \u2192  \ub3d9\uc77c \uba85\ub839\uc5b4\ub85c \uc7ac\uc2e4\ud589:")
    + codebox(60, 516, 1100, 44, "claude --channels plugin:discord@claude-plugins-official --dangerously-skip-permissions", cx=610, size=14)
    + footer("\ud1a0\ud070 \uc800\uc7a5 \ud6c4 \uc7ac\uc2e4\ud589\ud574\uc57c Plugin\uc774 \ud1a0\ud070\uc744 \uc778\uc2dd\ud569\ub2c8\ub2e4")
)
s19 += '</svg>\n'

# 20.svg - DM 페어링 + 서버 채널 등록 (Steps 7-8)
s20 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + practice_badge()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">DM \ud398\uc5b4\ub9c1\uacfc \uc11c\ubc84 \ucc44\ub110 \ub4f1\ub85d</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">Discord\uc640 Claude\ub97c \uc5f0\uacb0\ud558\uace0 \uc11c\ubc84 \ucc44\ub110\uc744 \ub4f1\ub85d\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 254, "6\ub2e8\uacc4  \u2014  DM \ud398\uc5b4\ub9c1")
    + stepnum(1, 292)
    + t(90, 292, "Discord\uc5d0\uc11c \ubcf8\uc778 \ubd07\uc5d0\uac8c \uc9c1\uc811 DM \uc804\uc1a1  \u2192  \ud398\uc5b4\ub9c1 \ucf54\ub4dc \uc218\uc2e0")
    + stepnum(2, 332)
    + t(90, 332, "Claude Code \ud130\ubbf8\ub110\uc5d0 \ud398\uc5b4\ub9c1 \ucf54\ub4dc \uc785\ub825  \u2192  \uc5f0\uacb0 \uc644\ub8cc!")
    + lbl(60, 382, "7\ub2e8\uacc4  \u2014  \uc11c\ubc84 \ucc44\ub110 \ub4f1\ub85d")
    + t(60, 418, "\uc124\uc815 > \uace0\uae09 > \uac1c\ubc1c\uc790 \ubaa8\ub4dc \ud65c\uc131\ud654  \u2192  \ucc44\ub110 \uc6b0\ud074\ub9ad > \ucc44\ub110 ID \ubcf5\uc0ac")
    + t(60, 454, "Claude Code\uc5d0 \uc544\ub798 \uba85\ub839\uc5b4\ub97c \uc694\uccad:")
    + codebox(60, 472, 900, 44, "/discord:access group add &lt;\ucc44\ub110ID&gt;", cx=510, size=15)
    + t(60, 544, "\ub4f1\ub85d\ud55c \ucc44\ub110\uc5d0\uc11c Claude\uc640 \ub300\ud654\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4", "#16a34a", size=17)
    + footer("DM \ud398\uc5b4\ub9c1\uc73c\ub85c 1:1 \uc5f0\uacb0  \u2192  /discord:access\ub85c \uc11c\ubc84 \ucc44\ub110 \ucd94\uac00 \ub4f1\ub85d")
)
s20 += '</svg>\n'

for fname, content in [('12.svg', s17), ('13.svg', s18), ('14.svg', s19), ('15.svg', s20),
                       ('17.svg', s17), ('18.svg', s18), ('19.svg', s19), ('20.svg', s20)]:
    ET.fromstring(content.strip())
    with open(base + fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname} saved OK')
