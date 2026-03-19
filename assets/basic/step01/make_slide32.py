import urllib.request, base64, textwrap

# Download Twitter image
url = 'https://pbs.twimg.com/media/HDZKxukaMAA3IKj?format=png&name=900x900'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=15) as r:
    img_data = r.read()
img_b64 = base64.b64encode(img_data).decode('ascii')
img_href = f"data:image/png;base64,{img_b64}"

FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif"

def text(x, y, s, size=13, weight=400, fill='#374151', anchor='start', ls=''):
    ls_attr = f' letter-spacing="{ls}"' if ls else ''
    return f'  <text x="{x}" y="{y}" text-anchor="{anchor}" font-family="{FONT}" font-size="{size}" font-weight="{weight}" fill="{fill}"{ls_attr}>{s}</text>'

# Right column lines
story_lines = [
    ('엔지니어 폴 커닝햄 — 2026년 3월', 14, '700', '#0a0a0a'),
    ('자신의 반려견의 암을 AI를 활용해 치료했다.', 13, '400', '#374151'),
    ('', 13, '400', '#374151'),
    ('AI를 고급 생물학 컨설턴트로 활용,', 13, '400', '#374151'),
    ('두 DNA 샘플을 비교하고 암을 유발하는', 13, '400', '#374151'),
    ('정확한 돌연변이를 찾는 방법을 찾아냈다.', 13, '400', '#374151'),
    ('', 13, '400', '#374151'),
    ('데이터 파이프라인 실행을 위한 단계별 지침과', 13, '400', '#374151'),
    ('복잡한 종양학 개념을 AI에게 요청했고,', 13, '400', '#374151'),
    ('손상된 단백질의 물리적 형태를 시각화해 파악했다.', 13, '400', '#374151'),
    ('', 13, '400', '#374151'),
    ('최종적으로 면역체계가 암세포를 공격하도록', 13, '400', '#374151'),
    ('지시하는 mRNA 백신의 화학적 레시피 작성 성공.', 13, '400', '#374151'),
    ('', 13, '400', '#374151'),
    ('결과:', 13, '700', '#0a0a0a'),
    ('몇 주 만에 거대한 종양의 크기가 50% 감소.', 14, '700', '#dc2626'),
]

svg_lines = []
svg_lines.append('<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">')
svg_lines.append('  <rect width="1280" height="720" fill="#ffffff"/>')
svg_lines.append('')
svg_lines.append('  <!-- 헤더 배지 -->')
svg_lines.append(f'  <rect x="60" y="44" width="78" height="24" rx="12" fill="#171717"/>')
svg_lines.append(f'  {text(99, 60, "BASIC 01", 11, "600", "#fafafa", "middle", "0.8")}')
svg_lines.append('')
svg_lines.append('  <!-- 제목 -->')
svg_lines.append(f'  {text(60, 100, "AI 동작원리를 알면 달라진다", 26, "800", "#0a0a0a", ls="-0.02em")}')
svg_lines.append(f'  {text(60, 122, "이 강의에서 배울 핵심 개념들이 에이전트 활용에 어떻게 연결되는지", 14, "400", "#737373")}')
svg_lines.append('  <line x1="60" y1="138" x2="1220" y2="138" stroke="#e5e5e5" stroke-width="1.5"/>')
svg_lines.append('')

# Left image (x=60, y=152, width=530, height=420)
svg_lines.append('  <!-- 좌측: 폴 커닝햄 기사 이미지 -->')
svg_lines.append('  <rect x="60" y="152" width="530" height="420" rx="10" fill="#f3f4f6"/>')
svg_lines.append(f'  <image x="60" y="152" width="530" height="420" href="{img_href}" preserveAspectRatio="xMidYMid meet" clip-path="url(#imgClip)"/>')
svg_lines.append('  <clipPath id="imgClip">')
svg_lines.append('    <rect x="60" y="152" width="530" height="420" rx="10"/>')
svg_lines.append('  </clipPath>')
svg_lines.append('')

# Right text column (x=620, y=152)
svg_lines.append('  <!-- 우측: 기사 내용 -->')
rx = 630
ry = 168
line_h = 24
for (txt, size, weight, fill) in story_lines:
    if txt == '':
        ry += 8
        continue
    svg_lines.append(f'  {text(rx, ry, txt, size, weight, fill)}')
    ry += line_h

svg_lines.append('')

# Bottom black box
svg_lines.append('  <!-- 핵심 메시지 박스 -->')
svg_lines.append('  <rect x="60" y="588" width="1160" height="80" rx="12" fill="#0a0a0a"/>')
svg_lines.append(f'  {text(640, 617, "AI는 생각보다 많은것을 알고 있습니다.", 15, "700", "#ffffff", "middle")}')
svg_lines.append(f'  {text(640, 641, "AI에게 간단한 질문만 하는게 아닌, 전문적이고 체계적인 요청과 설계는", 13, "400", "#d1d5db", "middle")}')
svg_lines.append(f'  {text(640, 661, "실제로 동작하게 합니다.", 13, "400", "#d1d5db", "middle")}')

svg_lines.append('</svg>')

svg_content = '\n'.join(svg_lines)
with open('C:/woohee_dev/404_ai_agent_lecture/lecture/assets/basic/step01/32.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print(f'Done. SVG size: {len(svg_content):,} bytes')
