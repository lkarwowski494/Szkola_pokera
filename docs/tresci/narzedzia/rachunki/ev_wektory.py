"""EV (06-tresci, 2026-11-12): niezależny rachunek wektorów EP-002 (remis w SDV) i EP-003 (żywe outy w turn-bet).
Własny ewaluator 5 z 7 kart, bez poker-core. Uruchom: python3 -I ev_wektory.py"""
from itertools import combinations
R = '23456789TJQKA'
def card(s): return (R.index(s[0]), s[1])
def rank5(cs):
    r = sorted((c[0] for c in cs), reverse=True); fl = len({c[1] for c in cs}) == 1
    u = sorted(set(r), reverse=True); st = None
    if len(u) == 5 and u[0] - u[4] == 4: st = u[0]
    if u == [12, 3, 2, 1, 0]: st = 3
    cnt = sorted(((r.count(x), x) for x in set(r)), reverse=True); sh = [c for c, _ in cnt]; ks = [x for _, x in cnt]
    if st is not None and fl: return (8, st)
    if sh[0] == 4: return (7, *ks)
    if sh[:2] == [3, 2]: return (6, *ks)
    if fl: return (5, *r)
    if st is not None: return (4, st)
    if sh[0] == 3: return (3, *ks)
    if sh[:2] == [2, 2]: return (2, *ks)
    if sh[0] == 2: return (1, *ks)
    return (0, *r)
def best(cs): return max(rank5(c) for c in combinations(cs, 5))
DECK = [(r, s) for r in range(13) for s in 'shdc']
def P(s): return [card(x) for x in s.split()]

# EP-002: SDV = (wygrane + ½ remisów) / kombinacje zakresu (rachunek: przy remisie pula dzielona na pół)
def sdv(hand, board, rng):
    dead = set(hand + board); w = t = n = 0; me = best(hand + board)
    for c in rng:
        if dead & set(c): continue
        o = best(list(c) + board); n += 1
        w += me > o; t += me == o
    return w, t, n, (w + t / 2) / n if n else 0
b = P('Ts 9h 4d 3c 2s'); h = P('7h 6h')
r76 = [(card('7' + a), card('6' + c)) for a in 'shdc' for c in 'shdc']
print('EP-002 wektor A 7h6h na Ts9h4d3c2s vs wszystkie 76 (16 komb.):', sdv(h, b, r76))
rK = [(card('K' + a), card('Q' + c)) for a in 'shdc' for c in 'shdc']
print('EP-002 wektor B 7h6h vs KQ (16 komb.):', sdv(h, b, rK))

# EP-003: equity rywala na riverze = (wygrane + ½ remisów) / 44 przy znanych 8 kartach; outy nominalne / 46 z perspektywy rywala
def turn(hero, vil, tb):
    known = set(hero + vil + tb); unseen = [c for c in DECK if c not in known]
    w = t = 0
    for c in unseen:
        a, v = best(hero + tb + [c]), best(vil + tb + [c]); w += v > a; t += v == a
    return w, t, len(unseen), (w + t / 2) / len(unseen)
req = lambda f: f / (1 + 2 * f)
print('ceny: 1/4 =', round(req(0.25), 4), ' 3/4 =', round(req(0.75), 4))
for opis, hero, vil, tb in [('ziarno 8 (brudne outy)', '4c 9c', '7h Kh', '4d Jh 3h 9d'),
                           ('czyste outy', 'As Kd', 'Qh Jh', 'Ks 8h 5h 2c'),
                           ('kolor w ręce gracza', 'Ah Kd', 'Qh Jh', 'Ks 8h 5h 2c')]:
    w, t, n, e = turn(P(hero), P(vil), P(tb))
    print(f'EP-003 {opis}: {hero} vs {vil} na {tb}: wygrane rywala {w}, remisy {t}, z {n} → {e:.4f}; nominalnie 9/46 = {9/46:.4f}')
