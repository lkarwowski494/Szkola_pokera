# Niezależny rachunek BA (2026-11-10): udział rąk z najlepszym układem w kategoriach na flopie,
# BTN otwarcie 2,5bb vs BB (call / call+3-bet) z content/ranges/preflop-6max-100bb.json.
# Uruchom: python3 -I docs/tresci/dowody-ba/rachunek.py  (z katalogu repo)
import json
from itertools import combinations
RANKS = '23456789TJQKA'
d = json.load(open('content/ranges/preflop-6max-100bb.json'))
spot = {s['path']: s for s in d['spots']}
def strat(path, act):
    s = spot[path]; return s['strategy'][s['actions'].index(act)]
BTN = strat('UTG:fold,HJ:fold,CO:fold', 'raise 2.5')
p = 'UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold'
BBc = strat(p, 'call 2.5'); BB3 = strat(p, 'raise 10')
BBd = {k: BBc[k] + BB3[k] for k in BBc}
deck = [r + s for r in RANKS for s in 'shdc']
def klasa(a, b):
    ra, rb = sorted([a[0], b[0]], key=RANKS.index, reverse=True)
    if ra == rb: return ra + rb
    return ra + rb + ('s' if a[1] == b[1] else 'o')
def kat(cards):  # 5 kart
    v = sorted((RANKS.index(c[0]) for c in cards), reverse=True)
    cnt = sorted(((v.count(x), x) for x in set(v)), reverse=True)
    fl = len({c[1] for c in cards}) == 1
    u = sorted(set(v)); st = len(u) == 5 and (u[4] - u[0] == 4 or u == [0, 1, 2, 3, 12])
    if st and fl: return 'poker'
    if cnt[0][0] == 4: return 'kareta'
    if cnt[0][0] == 3 and cnt[1][0] == 2: return 'full'
    if fl: return 'kolor'
    if st: return 'strit'
    if cnt[0][0] == 3: return 'trojka'
    if cnt[0][0] == 2 and cnt[1][0] == 2: return 'dwiepary'
    return 'inne'
def licz(R, board):
    b = board.split(); tot = 0; c = {}
    for x, y in combinations([k for k in deck if k not in b], 2):
        w = R.get(klasa(x, y), 0)
        if w <= 0: continue
        tot += w; k = kat([x, y] + b); c[k] = c.get(k, 0) + w
    return tot, c
SILNE = ['dwiepary', 'trojka', 'strit', 'kolor', 'full', 'kareta', 'poker']
print('flop | gracz | kombinacji | dwie pary | trójka/set | strit | full+ | dwie pary albo strit % | dwie pary lub lepiej %')
for board in ['8h 6d 5c', '7s 6h 5d', 'Kd Td 3s', 'Ah Ad 7c']:
    for n, R in (('BTN', BTN), ('BB call', BBc), ('BB call+3bet', BBd)):
        t, c = licz(R, board); g = lambda k: c.get(k, 0)
        dp_s = g('dwiepary') + g('strit'); silne = sum(g(k) for k in SILNE)
        print(f"{board} | {n} | {t:.1f} | {g('dwiepary'):.1f} | {g('trojka'):.1f} | {g('strit'):.1f} | {g('full')+g('kareta'):.1f} | {100*dp_s/t:.2f} | {100*silne/t:.2f}")
