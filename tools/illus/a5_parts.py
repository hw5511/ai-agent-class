"""Physical drawing parts shared by the A5 database concept illustrations."""
from illuskit import *
def rect(x,y,w,h,fill='#fff',stroke=LINE,sw=2,r=12,shadow=False):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"'+(' filter="url(#shs)"' if shadow else '')+'/>')
def soft_zone(x,y,w,h,fill=ACCENT_ZONE):
    # The current zone() suppresses its legacy named tints. Equivalent explicit
    # RGB values restore only the scene zones required for these illustrations.
    rgb=tuple(int(fill[i:i+2],16) for i in (1,3,5))
    return zone(x,y,w,h,f'rgb({rgb[0]},{rgb[1]},{rgb[2]})',rx=36)
def arrow(d,cx,cy,tx,ty,color=ACCENT,size=20):
    return path(d,color,dotted=False,arrow=False)+arrow_head_at(cx,cy,tx,ty,size,color)
def rule(x1,y1,x2,y2,color=LINE,sw=2):
    return f'<path d="M{x1} {y1}L{x2} {y2}" stroke="{color}" stroke-width="{sw}" fill="none" stroke-linecap="round"/>'
def grid(x,y,widths,rows,rh=78,size=30,header=True):
    w=sum(widths)
    out=[rect(x,y,w,rh*len(rows),r=10)]
    for i in range(1,len(rows)): out.append(rule(x,y+i*rh,x+w,y+i*rh))
    xx=x
    for j,cw in enumerate(widths):
        if j: out.append(rule(xx,y,xx,y+rh*len(rows)))
        for i,row in enumerate(rows):
            out.append(text(xx+cw/2,y+i*rh+rh/2+size*.35,row[j],size,900 if i==0 and header else 600,MUTED if i==0 and header else INK))
        xx+=cw
    return ''.join(out)
def gauge(x,y,w,fraction,color):
    return text(x,y-16,'context',30,700,MUTED,anchor='start',family=MONO)+rect(x,y,w,32,'#fff',LINE2,2,16)+rect(x+5,y+5,(w-10)*fraction,22,color,color,0,11)
def key(x,y,s=1,label=True):
    out=f'<g transform="translate({x} {y}) scale({s})"><circle cx="24" cy="24" r="20" fill="#fff" stroke="{ACCENT}" stroke-width="9"/><path d="M44 24H112V42M88 24V39" fill="none" stroke="{ACCENT}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/></g>'
    if label: out+=text(x+60*s,y+78*s,'API 키',28)
    return out
def page(x,y,lit=False,w=96):
    out=doc(x,y,w,accent=ACCENT if lit else LINE2,stroke=ACCENT if lit else LINE,shadow=False)
    if lit: out+=check(x+w-4,y+17,16)
    return out
def code(x,y,lines,size=28,leading=45):
    # ASCII has a real mono face; Korean inherits Pretendard rather than relying
    # on Cairo's missing fallback between a mono font and a Korean font.
    import re
    out=[]
    for i,line in enumerate(lines):
        out.append(f'<text x="{x}" y="{y+i*leading}" font-size="{size}" font-weight="600" fill="{INK}" font-family="{FONT}">')
        for part in re.findall(r'[\x00-\x7f]+|[^\x00-\x7f]+',line):
            fam=MONO if part.isascii() else FONT
            escaped=part.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
            out.append(f'<tspan font-family="{fam}" xml:space="preserve">{escaped}</tspan>')
        out.append('</text>')
    return ''.join(out)
PEOPLE=[['이름','나이','취미'],['김민수','34','축구'],['이지은','28','등산'],['박서준','41','독서']]
