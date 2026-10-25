"""Advanced 4 screen mockups, traced from the 2026-10-25 live browser captures.

1440 x 1000 Typecast API home/guide/key screens, and corrected NAVER auth popup.
Identity and credentials are fictional/masked. No account data is read by this generator.
Optional --font embeds a subset of the supplied Pretendard TTF in these SVG images;
SVGs loaded through <img> cannot inherit the viewer's web font.
"""
from pathlib import Path
from html import escape
import argparse
import base64
import io
import re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "web/public/shots/a4"


class SVG:
    def __init__(self, width=1440, height=1000):
        self.items = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" font-family="Pretendard, sans-serif">']
        self.rect(0, 0, width, height)

    def rect(self, x, y, w, h, fill="#fff", stroke="none", r=0):
        self.items.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke}" rx="{r}"/>')

    def text(self, x, y, text, size=16, color="#202428", weight=400, anchor="start"):
        self.items.append(f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}" text-anchor="{anchor}">{escape(text)}</text>')

    def line(self, x1, y1, x2, y2, color="#dedede"):
        self.items.append(f'<path d="M{x1} {y1}H{x2}" stroke="{color}"/>' if y1 == y2 else f'<path d="M{x1} {y1}L{x2} {y2}" stroke="{color}"/>')

    def button(self, x, y, w, label, fill="#fff", color="#202428", h=36):
        self.rect(x, y, w, h, fill, "#d6d6d6" if fill == "#fff" else fill, 8)
        self.text(x+w/2, y+h/2+6, label, 16, color, 600, "middle")

    def logo(self, x, y, scale=1):
        # Typecast's blue/orange diagonal mark and wordmark, from the page header.
        self.items.append(f'<g transform="translate({x} {y}) scale({scale})"><path d="M2 20L20 2M2 9L13 20" stroke="#0b1c31" stroke-width="4" stroke-linecap="round"/><path d="M3 3L21 21M13 2L22 11" stroke="#ff7b42" stroke-width="4" stroke-linecap="round"/><circle cx="2" cy="3" r="2" fill="#ff7b42"/></g>')
        self.text(x+30*scale, y+23*scale, "typecast", 31*scale, "#0b1c31", 700)

    def save(self, name):
        (OUT/name).write_text("\n".join(self.items)+"\n</svg>\n", encoding="utf-8")


def studio(active):
    s=SVG()
    s.rect(0,0,1440,40,"#404040")
    s.text(720,26,"더 나은 서비스를 위해 여러분의 의견을 공유해 주세요.  ›",15,"#fff",600,"middle")
    s.text(1410,26,"×",22,"#fff")
    s.logo(22,65,.75)
    s.line(239,40,239,1000)
    for y,section,rows in [(130,"CREATOR TOOLS",["AI 보이스 에디터","비디오 에디터","AI 토킹 아바타"]),(290,"VOICES",["보이스 클로닝","보이스 캐스팅"]),(415,"DEVELOPER TOOLS",["API"]),(500,"DISCOVERY",["쇼츠 목소리 찾기"])]:
        s.text(20,y,section,13,"#7b8790")
        for j,row in enumerate(rows):
            yy=y+29+j*40
            if row=="API":s.rect(12,yy-24,215,40,"#fff3ee",r=4)
            s.text(24,yy,"‹/›" if row=="API" else "□",18,"#555")
            s.text(50,yy,row,16,"#444")
    s.text(25,595,"⋮  더 보기",16,"#444")
    s.rect(12,822,215,87,"#fff","#ff7b42",12)
    s.text(26,850,"☆ 플랜 업그레이드",15,weight=600)
    s.text(26,875,"플랜을 업그레이드하고 더 많은 기능을",12,"#999")
    s.text(26,894,"이용해 보세요.",12,"#999")
    s.rect(12,918,215,50,"#f0f0f0",r=10)
    s.text(26,949,"●",28,"#008d81")
    s.text(64,939,"수강생",14)
    s.text(64,958,"student@gmail.com",12,"#8c9399")
    s.line(239,88,1425,88)
    for x,name in [(368,"가이드"),(445,"API 키"),(521,"보이스"),(599,"구독 관리")]:
        s.text(x,76,name,16,"#ff7b42" if name==active else "#202428")
        if name==active:s.line(x-15,87,x+53,87,"#ff7b42")
    return s


def generate():
    s=SVG();s.logo(114,25)
    for x,name in [(368,"타입캐스트 소개"),(505,"API & Enterprise"),(659,"리소스"),(735,"가격 안내")]:s.text(x,46,name,17)
    s.button(1100,22,90,"로그인",h=38);s.button(1200,22,104,"회원가입","#000","#fff",38)
    for y,t in [(275,"사람처럼"),(348,"자연스러운 AI 목소리,"),(421,"API로 더 쉽게 사용해보세요")]:s.text(118,y,t,58,"#050505",750)
    s.text(119,477,"콘텐츠 자동화, 앱 서비스, 대화형 에이전트까지",21,"#777")
    s.text(119,504,"원하는 어디든 섬세한 감정표현이 가능한 AI 음성을 연동하세요.",21,"#777")
    s.button(120,532,178,"무료로 API 시작하기","#ff7b42","#fff",41)
    s.button(310,532,140,"API 문서 보기",h=41)
    s.text(156,592,"*결제수단 등록 불필요",12,"#888")
    s.rect(837,239,467,333,"#fff","#ffc58c",20)
    s.rect(869,270,404,270,"#fafafa","#d8d8d8",14)
    for i,t in enumerate(["curl --request POST \\","  --url https://api.typecast.ai/v1/text-to-speech \\","  --header 'Content-Type: application/json' \\","  --header 'X-API-KEY: <api-key>' \\","  --output output.wav \\","  --data @- <<EOF","{","  \"voice_id\": \"tc_60e5426de8b95f1d3000d7b5\","]):s.text(895,312+i*24,t,15)
    s.text(114,825,"Smart Emotion",20,"#777")
    s.text(114,872,"텍스트만 넣으면",29,"#000",700)
    s.text(114,911,"맥락에 어울리는 감정이 자동으로",29,"#000",700)
    s.save("a4-typecast-home.svg")

    s=studio("가이드")
    s.rect(385,121,895,147,"#fafafa","#d8d8d8",12)
    s.text(410,163,"▣  API 문서와 키를 확인하세요",19,weight=700)
    s.text(410,190,"타입캐스트 API로 할 수 있는 일과 연동 방법, 다양한 활용 사례를 API 문서에서 살펴보세요.",15)
    s.button(410,212,115,"API 문서 보기","#202428","#fff",32)
    s.button(534,212,125,"API 키 확인하기",h=32)
    s.text(385,330,"더 쉽게 시작해 보세요",23,weight=700)
    s.text(385,359,"아래 도구를 활용하면 필요한 작업을 더 빠르게 진행할 수 있습니다.",16)
    cards=[(385,289,"AI 에이전트로 연동",["AI 에이전트와","대화하며 API 연동하기"],"AI용 프롬프트 복사"),(687,291,"영상 제작 자동화",["쇼츠/릴스/틱톡 영상까지","자동으로 완성하기"],"영상 제작 자동화 스킬 복사"),(990,289,"개발자용 리소스",["오픈소스 프로젝트","살펴보기"],"오픈소스 모음 보기")]
    for x,w,tag,lines,button in cards:
        s.rect(x,383,w,582,"#fff","#d8d8d8",18)
        s.rect(x+29,412,153,26,"#ff7b42",r=13);s.text(x+105,430,tag,13,"#fff",600,"middle")
        for i,t in enumerate(lines):s.text(x+29,480+i*30,t,23,"#000",700)
        s.rect(x+29,612,w-58,187,"#f7f7f7",r=14)
        for i,t in enumerate((["작업 환경에 가장 적합한 방식으로 연동","음성 및 자막 생성 · 스트리밍"] if x==385 else ["① 주제 선정","② 대본 및 음성 생성","③ 자막이 포함된 영상 완성"] if x==687 else ["콘텐츠와 영상 제작","실시간 보이스 에이전트 연동","자동화 워크플로우"])):s.text(x+43,655+i*42,t,14)
        s.button(x+29,850,w-58,button,"#202428","#fff",44)
    s.save("a4-typecast-guide.svg")

    s=studio("API 키");s.text(336,142,"API 키",27,weight=700)
    s.rect(336,166,991,119,"#fff","#d8d8d8",13)
    s.line(336,212,1327,212);s.text(360,196,"키",16)
    s.text(360,255,"••••••••••••••••",22)
    s.button(1166,232,65,"▣ 복사","#f1f1f1",h=32)
    s.button(1240,232,65,"삭제","#fff5f5","#ee565e",32)
    s.save("a4-typecast-api-key.svg")

    # Retain the committed NAVER drawing; correct the visible key fields to the
    # actual read-only inputs and copy controls, rather than editable white boxes.
    p=OUT/"a4-naver-auth-keys.svg";text=p.read_text(encoding="utf-8")
    text=text.replace('font-family="Pretendard, \'Pretendard Variable\', \'Malgun Gothic\', sans-serif"','font-family="Pretendard, sans-serif"')
    text=text.replace('x="615" y="441" width="462" height="42" rx="1" fill="#fff"','x="615" y="441" width="462" height="42" rx="1" fill="#eceff1"')
    text=text.replace('x="615" y="511" width="359" height="42" rx="1" fill="#fff"','x="615" y="511" width="359" height="42" rx="1" fill="#eceff1"')
    if 'id="key-copy-icons"' not in text:
        text=text.replace('</svg>','<g id="key-copy-icons" fill="none" stroke="#444" stroke-width="1.5"><rect x="1042" y="453" width="10" height="12"/><path d="M1046 453v-3h10v12h-4"/><rect x="941" y="523" width="10" height="12"/><path d="M945 523v-3h10v12h-4"/></g>\n</svg>')
    text=text.replace('viewBox="0 0 1200 900" width="1200" height="900"','viewBox="274 236 852 471" width="1200" height="663"')
    p.write_text(text,encoding="utf-8")
    p=OUT/"a4-naver-api-select.svg";text=p.read_text(encoding="utf-8")
    text=text.replace('viewBox="0 0 1200 900" width="1200" height="900"','viewBox="280 362 600 210" width="1200" height="420"')
    p.write_text(text,encoding="utf-8")


def embed_font(path, font, bold_font=None):
    from fontTools import subset
    from fontTools.ttLib import TTFont
    text=path.read_text(encoding="utf-8")
    text=re.sub(r'<style id="embedded-pretendard">.*?</style>', '', text, flags=re.S)
    chars=''.join(re.findall(r'>([^<>]+)<',text))
    css='<style id="embedded-pretendard">'
    for file,weight in [(font,400)]+([(bold_font,700)] if bold_font else []):
        ft=TTFont(file);opts=subset.Options();opts.flavor='woff2'
        sub=subset.Subsetter(options=opts);sub.populate(text=chars);sub.subset(ft)
        ft.flavor='woff2';buf=io.BytesIO();ft.save(buf)
        data=base64.b64encode(buf.getvalue()).decode()
        css+=f'@font-face{{font-family:Pretendard;src:url(data:font/woff2;base64,{data}) format("woff2");font-weight:{weight}}}'
    css+='</style>'
    text=text.replace('font-family="Pretendard, \'Pretendard Variable\', \'Malgun Gothic\', sans-serif"','font-family="Pretendard, sans-serif"')
    text=text.replace('>','>\n'+css,1)
    path.write_text(text,encoding="utf-8")


if __name__ == "__main__":
    parser=argparse.ArgumentParser();parser.add_argument('--font',type=Path);parser.add_argument('--bold-font',type=Path);args=parser.parse_args()
    generate()
    if args.font:
        for name in ['a4-typecast-home.svg','a4-typecast-guide.svg','a4-typecast-api-key.svg','a4-naver-api-select.svg','a4-naver-auth-keys.svg']:
            embed_font(OUT/name,args.font,args.bold_font)
