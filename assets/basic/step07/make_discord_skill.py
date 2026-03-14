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

# 11.svg - MCP vs 스킬 차이 + check_my_mention 개념
s11 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">MCP vs \uc2a4\ud0ac</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">MCP\ub85c \uc548 \ub418\ub294 \uac83\uc744 \uc2a4\ud0ac\uc73c\ub85c \ud655\uc7a5\ud569\ub2c8\ub2e4</text>\n'
    + div()
    # 좌측: MCP
    + '  <rect x="60" y="226" width="530" height="220" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
    + f'  <text x="325" y="260" text-anchor="middle" font-family="{font}" font-size="14" font-weight="700" fill="#6b7280" letter-spacing="0.08em">MCP (Discord)</text>\n'
    + t(80, 298, "send-message  \u2014  \uba54\uc2dc\uc9c0 \uc804\uc1a1", size=17)
    + t(80, 334, "read-messages  \u2014  \ucc44\ub110 \uba54\uc2dc\uc9c0 \uc870\ud68c", size=17)
    + t(80, 374, "\uba58\uc158 \ud544\ud130\ub9c1 \ubd88\uac00", "#dc2626", size=16)
    + t(80, 410, "\ud2b9\uc815 User ID @\uba58\uc158 \ubd88\uac00", "#dc2626", size=16)
    # 우측: 스킬
    + '  <rect x="630" y="226" width="590" height="220" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>\n'
    + f'  <text x="925" y="260" text-anchor="middle" font-family="{font}" font-size="14" font-weight="700" fill="#1d4ed8" letter-spacing="0.08em">\uc2a4\ud0ac (Python \ub85c\uc9c1 \ucd94\uac00)</text>\n'
    + t(650, 298, "check_my_mention  \u2014  \ub0b4 \uba58\uc158 \ud544\ud130\ub9c1", size=17)
    + t(650, 334, "send_with_mention  \u2014  \ubcf4 ID\ub97c @\uba58\uc158", size=17)
    + t(650, 374, "1\ud68c\uc131 \uc870\ud68c  \u2014  \ubb34\ud55c\ub8e8\ud504 \uc5c6\uc74c", "#16a34a", size=16)
    + t(650, 410, "MCP + \ub85c\uc9c1 = \uc2a4\ud0ac", "#16a34a", size=16)
    + footer("MCP = \uc678\ubd80 \uc11c\ube44\uc2a4 \uc5f0\uacb0  /  \uc2a4\ud0ac = Claude\uc5d0\uac8c \ub2e8\uacc4\uc801 \uc808\ucc28 \uc815\uc758  \u2014  \ub458\uc744 \uc870\ud569\ud558\uba74 \ub354 \uac15\ub825\ud574\uc9d1\ub2c8\ub2e4")
)
s11 += '</svg>\n'

# 12.svg - check_my_mention 스킬 제작
s12 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">check_my_mention \uc2a4\ud0ac</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">\ub098\ub97c \uba58\uc158\ud55c \uba54\uc2dc\uc9c0\uac00 \uc788\ub294\uc9c0 1\ud68c\uc131\uc73c\ub85c \ud655\uc778\ud569\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 258, "SKILL.md \uc791\uc131 \uc704\uce58")
    + codebox(60, 272, 700, 44, ".claude/skills/check-mention/SKILL.md", cx=390)
    + lbl(60, 340, "SKILL.md \ub0b4\uc6a9 (Claude \uc9c0\uce68)")
    + '  <rect x="60" y="354" width="1160" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
    + f'  <text x="80" y="382" font-family="{mono}" font-size="15" fill="#374151">---</text>\n'
    + f'  <text x="80" y="406" font-family="{mono}" font-size="15" fill="#374151">description: \ub514\uc2a4\ucf54\ub4dc \ucc44\ub110\uc5d0\uc11c \ub098\ub97c \uba58\uc158\ud55c \uba54\uc2dc\uc9c0\ub97c \ud655\uc778\ud569\ub2c8\ub2e4</text>\n'
    + f'  <text x="80" y="430" font-family="{mono}" font-size="15" fill="#374151">---</text>\n'
    + f'  <text x="80" y="454" font-family="{mono}" font-size="15" fill="#374151">Discord MCP\uc758 read-messages\ub85c \ucd5c\uadfc 50\uac1c \uba54\uc2dc\uc9c0\ub97c \uac00\uc838\uc640\uc11c,</text>\n'
    + f'  <text x="80" y="474" font-family="{mono}" font-size="15" fill="#374151">$USER_ID\uac00 \uba58\uc158\ub41c \ud56d\ubaa9\ub9cc \ud544\ud130\ub9c1\ud574 \ubcf4\uace0\ud569\ub2c8\ub2e4. \ubc31\uadf8\ub77c\uc6b4\ub4dc \ub9ac\uc2a4\ub2dd \uc5c6\uc74c.</text>\n'
    + footer("/check-mention \uc785\ub825 \uc2dc Claude\uac00 read-messages \ud234 \ud638\ucd9c \ud6c4 \uba58\uc158 \ud544\ud130\ub9c1 \uc218\ud589")
)
s12 += '</svg>\n'

# 13.svg - send_with_mention 스킬 + 봇끼리 대화 실습
s13 = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">\n'
    + hdr()
    + practice_badge()
    + f'  <text x="60" y="130" font-family="{font}" font-size="40" font-weight="700" fill="#171717">send_with_mention \uc2a4\ud0ac  /  \uc2e4\uc2b5</text>\n'
    + f'  <text x="60" y="178" font-family="{font}" font-size="19" fill="#6b7280">\ud2b9\uc815 \ubcf4\uc744 @\uba58\uc158\ud558\uc5ec \uba54\uc2dc\uc9c0\ub97c \ubcf4\ub0c5\ub2c8\ub2e4</text>\n'
    + div()
    + lbl(60, 254, "SKILL.md \uc9c0\uce68 \ud575\uc2ec")
    + '  <rect x="60" y="268" width="1160" height="86" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>\n'
    + f'  <text x="80" y="296" font-family="{mono}" font-size="15" fill="#374151">Discord API\ub85c $CHANNEL_ID\uc5d0 \uba54\uc2dc\uc9c0\ub97c \uc804\uc1a1\ud569\ub2c8\ub2e4.</text>\n'
    + f'  <text x="80" y="320" font-family="{mono}" font-size="15" fill="#374151">\uba54\uc2dc\uc9c0 \uc55e\uc5d0 &lt;@$MENTION_USER_ID&gt; \ud615\uc2dd\uc73c\ub85c \uba58\uc158\uc744 \ucca8\ubd80\ud569\ub2c8\ub2e4.</text>\n'
    + f'  <text x="80" y="344" font-family="{mono}" font-size="15" fill="#374151">BOT_TOKEN, CHANNEL_ID, MENTION_USER_ID\ub294 \ud658\uacbd\ubcc0\uc218\ub85c \uad00\ub9ac\ud569\ub2c8\ub2e4.</text>\n'
    + lbl(60, 390, "\uc2e4\uc2b5  \u2014  \ubd07\ub07c\ub9ac \uba58\uc158 \ub300\ud654")
    + stepnum(1, 430)
    + t(90, 430, "\uc218\uac15\uc0dd A: /send-mention \uc785\ub825  \u2192  \uc218\uac15\uc0dd B \ubd07\uc744 @\uba58\uc158\ud574\uc11c \uba54\uc2dc\uc9c0 \uc804\uc1a1")
    + stepnum(2, 480)
    + t(90, 480, "\uc218\uac15\uc0dd B: /check-mention \uc785\ub825  \u2192  \uba58\uc158 \uc788\ub294\uc9c0 \ud655\uc778")
    + stepnum(3, 530)
    + t(90, 530, "\ub2f5\uc7a5 \ud6c4 A\uac00 \ub2e4\uc2dc /check-mention \u2192  MCP\ub9cc\uc73c\ub85c\ub294 \ubaa8\ub4e0 \uac83\uc774 \ub418\uc9c0 \uc54a\ub294\ub2e4\ub294 \uac83 \uccb4\uac10")
    + footer("MCP = \uae30\ubc18 \uc5f0\uacb0  /  \uc2a4\ud0ac = \uc9c1\uc811 \uad6c\ud604\ud55c \ub85c\uc9c1  \u2014  \ub458\uc758 \uc5ed\ud560\uc774 \ub2e4\ub985\ub2c8\ub2e4")
)
s13 += '</svg>\n'

for fname, content in [('11.svg', s11), ('12.svg', s12), ('13.svg', s13)]:
    ET.fromstring(content.strip())
    with open(base + fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{fname} saved OK')
