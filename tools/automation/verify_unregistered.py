# -*- coding: utf-8 -*-
"""Check every number in vendors.csv against the real NTS API; print counts only.
Registered numbers are appended to s1_excluded_hashes.json so make_kit_s1.py redraws them."""
import hashlib, csv, json, sys, urllib.parse, urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
CSV = HERE.parents[1] / "assets/automation/step01/kit/vendors.csv"
EXCL = HERE / "s1_excluded_hashes.json"
sys.path.insert(0, r"C:/wi/yuki/.claude/skills/playwright-tool/credentials")
import credentials_vault as cv

key = cv._load_vault()["publicdata_servicekey"]["password"]
with open(CSV, encoding="utf-8-sig", newline="") as f:
    nums = ["".join(c for c in r["사업자등록번호"] if c.isdigit()) for r in csv.DictReader(f)]
reg, checked = [], 0
for i in range(0, len(nums), 100):
    batch = nums[i:i + 100]
    url = "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=" + urllib.parse.quote(key, safe="")
    req = urllib.request.Request(url, data=json.dumps({"b_no": batch}).encode(),
                                 headers={"Content-Type": "application/json"}, method="POST")
    try:
        res = json.load(urllib.request.urlopen(req, timeout=30))
    except Exception as e:
        print("request failed:", type(e).__name__, getattr(e, "code", ""))
        sys.exit(2)
    checked += len(res["data"])
    reg += [d["b_no"] for d in res["data"] if d.get("b_stt_cd")]
print("checked", checked, "registered", len(reg))
if reg:
    old = json.loads(EXCL.read_text(encoding="utf-8")) if EXCL.exists() else []
    EXCL.write_text(json.dumps(sorted(set(old) | {hashlib.sha256(n.encode()).hexdigest() for n in reg})), encoding="utf-8")
    sys.exit(1)
