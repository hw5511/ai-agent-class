import subprocess, json, time, os, shutil, re

SESSION = "session_1773044291826"
BASE_URL = "http://localhost:3004/mcp/v1"
SHOT_DIR = "C:/woohee_dev/404_ai_agent_lecture/lecture/assets/basic/_check/autosurf"

def call(method_name, args):
    payload = json.dumps({"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":method_name,"arguments":args}})
    result = subprocess.run(
        ["curl","-s",BASE_URL,"-X","POST","-H","Content-Type: application/json","-d",payload],
        capture_output=True, text=True, encoding='utf-8', errors='replace'
    )
    try:
        r = json.loads(result.stdout)
        return r.get('result',{}).get('content',[{}])[0].get('text','')
    except:
        return "ERROR"

def screenshot(fname):
    result = subprocess.run(
        ["curl","-s",BASE_URL,"-X","POST","-H","Content-Type: application/json","-d",
         json.dumps({"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"capture_screenshot","arguments":{"session_id":SESSION}}})],
        capture_output=True, text=True, encoding='utf-8', errors='replace'
    )
    try:
        r = json.loads(result.stdout)
        text = r.get('result',{}).get('content',[{}])[0].get('text','')
        paths = re.findall(r'[A-Za-z]:[/\\][^\s*|]+\.png', text)
        if paths:
            src = paths[0].strip()
            if os.path.exists(src):
                dest = os.path.join(SHOT_DIR, fname)
                shutil.copy(src, dest)
                print(f"  -> {fname}")
                return dest
        print(f"  -> path not found in: {text[:100]}")
    except Exception as e:
        print(f"  ERROR: {e}")
    return None

def click_coord(x, y):
    return call("click_by_coordinate", {"session_id": SESSION, "x": x, "y": y})

def snap():
    return call("snapshot_page", {"session_id": SESSION, "interactive_only": True})

def get_next_ref():
    text = snap()
    # 마지막 버튼 ref 추출 (다음 버튼)
    refs = re.findall(r'(@e\d+)\s*\[button\].*?[다음|Next]', text)
    if refs:
        return refs[-1]
    # 없으면 마지막 ref
    all_refs = re.findall(r'(@e\d+)', text)
    if all_refs:
        return all_refs[-1]
    return None

def click_ref(ref):
    return call("click_element", {"session_id": SESSION, "selector": ref})

# 강의별 설정: (step번호, 사이드바 y좌표, 슬라이드수)
lectures = [
    ("03", 269, 8),
    ("04", 324, 8),
    ("05", 379, 6),
    ("06", 434, 5),
    ("07", 489, 5),
    ("08", 545, 5),
]

for step, sidebar_y, slide_count in lectures:
    print(f"\n=== STEP {step} ({slide_count}장) ===")

    # 강의 버튼 클릭
    click_coord(130, sidebar_y)
    time.sleep(2)

    # 현재 슬라이드 스크린샷
    screenshot(f"step{step}_01.png")

    # 스냅샷으로 다음 버튼 ref 확인
    snap_text = snap()
    # 다음 버튼 ref 찾기
    next_matches = re.findall(r"(@e\d+)\s*\[button\]\s*'[^']*다음[^']*'", snap_text)
    if not next_matches:
        # fallback: 마지막 버튼
        next_matches = re.findall(r'(@e\d+)', snap_text)
    next_ref = next_matches[-1] if next_matches else None
    print(f"  다음 버튼 ref: {next_ref}")

    for i in range(2, slide_count + 1):
        if next_ref:
            click_ref(next_ref)
        else:
            # 좌표 fallback (다음 버튼 우측 하단)
            click_coord(1400, 760)
        time.sleep(0.8)
        screenshot(f"step{step}_{i:02d}.png")

print("\n완료!")
