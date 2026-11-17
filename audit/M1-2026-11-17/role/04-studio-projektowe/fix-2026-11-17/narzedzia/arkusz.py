# arkusz.py — arkusz miniatur: python3 -I arkusz.py <katalog-zrzutów> <wyjście.png> <tryb> <szerokość> 
import sys
from PIL import Image
d, out, tryb, w = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
motywy = ['light', 'lightHigh', 'dark', 'darkHigh']
obr = [[Image.open(f'{d}/siatka-{tryb}-{m}-{w}{s}.png') for m in motywy] for s in ['', '-ax5']]
sk = 0.5
kom = [[im.resize((int(im.width * sk), int(im.height * sk)), Image.LANCZOS) for im in rz] for rz in obr]
W = sum(max(kom[r][c].width for r in range(2)) for c in range(4)) + 5 * 20
H = sum(max(im.height for im in rz) for rz in kom) + 3 * 20
a = Image.new('RGB', (W, H), (128, 128, 128))
y = 20
for rz in kom:
    x = 20
    for im in rz:
        a.paste(im, (x, y)); x += im.width + 20
    y += max(im.height for im in rz) + 20
a.save(out)
print(out, a.size)
