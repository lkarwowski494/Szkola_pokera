# arkusz-ikony.py — arkusz kontrolny ikony: iOS w masce (5 rozmiarów, domyślna i ciemna, jasna i ciemna tapeta),
# Android adaptacyjna (widoczny środek 72 z 108 dp, maska koło) i monochromatyczna. Użycie: python3 arkusz-ikony.py <katalog ikona/>
import sys, os
from PIL import Image, ImageDraw, ImageFont
d = sys.argv[1]; F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 13)
def mask(sz, kolo=False):
    m = Image.new('L', (sz*4, sz*4), 0); dr = ImageDraw.Draw(m)
    (dr.ellipse if kolo else lambda b, fill: dr.rounded_rectangle(b, radius=int(sz*4*0.2237), fill=fill))([0, 0, sz*4-1, sz*4-1], fill=255)
    return m.resize((sz, sz), Image.LANCZOS)
def srodek(im):  # widoczna część warstwy adaptacyjnej: środkowe 72/108
    s = im.size[0]; o = int(s*18/108); return im.crop((o, o, s-o, s-o))
ik = {'domyślna': Image.open(f'{d}/icon.png').convert('RGB'), 'ciemna': Image.open(f'{d}/ios-dark.png').convert('RGB')}
fg = Image.open(f'{d}/android-foreground.png'); bg = Image.new('RGBA', fg.size, (34, 72, 138, 255)); bg.alpha_composite(fg)
mo = Image.open(f'{d}/android-monochrome.png'); mb = Image.new('RGBA', mo.size, (60, 60, 60, 255)); mb.alpha_composite(mo)
andr = {'Android adaptacyjna': srodek(bg).convert('RGB'), 'Android monochromatyczna': srodek(mb).convert('RGB')}
rozm = [180, 120, 60, 40, 29]; W = 40 + sum(r+28 for r in rozm); H = 3*240 + 20
sh = Image.new('RGB', (W*2, H)); dr = ImageDraw.Draw(sh)
for ti, (tn, tc, tx) in enumerate([('jasna tapeta', (236, 232, 226), (90, 90, 90)), ('ciemna tapeta', (28, 30, 36), (170, 170, 170))]):
    ox = ti*W; dr.rectangle([ox, 0, ox+W-1, H], fill=tc)
    for ii, (n, im) in enumerate(list(ik.items()) + [('Android: adaptacyjna i monochromatyczna', None)]):
        y = 34 + ii*240; dr.text((ox+20, y-24), f'{n}, {tn}', fill=tx, font=F); x = ox+20
        if im is None:
            for k, (an, ai) in enumerate(andr.items()):
                for r in ([180, 48] if k == 0 else [180]):
                    sh.paste(ai.resize((r, r), Image.LANCZOS), (x, y+(180-r)), mask(r, True)); x += r+28
            continue
        for r in rozm:
            sh.paste(im.resize((r, r), Image.LANCZOS), (x, y+(180-r)), mask(r)); x += r+28
sh.save(f'{d}/arkusz.png', optimize=True); print(f'{d}/arkusz.png', sh.size)
