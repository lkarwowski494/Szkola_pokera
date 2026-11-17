# arkusz.py (audyt 04, M1): arkusz zbiorczy zrzutów; użycie: python3 -I arkusz.py <wyjście.png> <wysokość_max> <plik>...
import sys
from PIL import Image
out, hmax, files = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
ims = [Image.open(f).convert('RGB') for f in files]
ims = [im.crop((0, 0, im.width, min(im.height, hmax))) for im in ims]
W = sum(im.width for im in ims) + 10 * (len(ims) + 1); H = max(im.height for im in ims) + 20
sheet = Image.new('RGB', (W, H), (128, 128, 128)); x = 10
for im in ims: sheet.paste(im, (x, 10)); x += im.width + 10
sheet.save(out); print(out, sheet.size)
