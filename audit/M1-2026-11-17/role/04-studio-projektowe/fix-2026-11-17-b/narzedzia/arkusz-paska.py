# arkusz-paska.py (rola 04, M2-009, własny): python3 -I arkusz-paska.py <katalog> <wyjście.png> <sufiks>  — wiersze: przed/po; kolumny: motywy
import sys
from PIL import Image
d, out, suf = sys.argv[1], sys.argv[2], sys.argv[3]
motywy = ['light', 'lightHigh', 'dark', 'darkHigh'] if suf == '390' else ['dark', 'darkHigh']
rz = [[Image.open(f'{d}/pasek-{t}-{m}-{suf}.png') for m in motywy] for t in ['przed', 'po']]
sk = 0.5
rz = [[im.resize((int(im.width * sk), int(im.height * sk)), Image.LANCZOS) for im in r] for r in rz]
W = sum(max(rz[r][c].width for r in range(2)) for c in range(len(motywy))) + (len(motywy) + 1) * 16
H = sum(max(im.height for im in r) for r in rz) + 3 * 16
a = Image.new('RGB', (W, H), (128, 128, 128)); y = 16
for r in rz:
    x = 16
    for im in r: a.paste(im, (x, y)); x += im.width + 16
    y += max(im.height for im in r) + 16
a.save(out); print(out, a.size)
