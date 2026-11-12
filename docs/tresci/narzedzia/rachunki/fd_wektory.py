"""Rola 06, sesja FD (2026-11-12): wektory dla specyfikacji 08 (SC-13 rozmiar na flopie, SC-28 trzecia ulica wartości).
Niezależnie od poker-core: ewaluator z karty.py (definicja rankingu układów), kombinacje liczone przejściem po parach talii.
Uruchom: PYTHONDONTWRITEBYTECODE=1 python3 -I docs/tresci/narzedzia/rachunki/fd_wektory.py > docs/tresci/dowody/fd-wektory.txt"""
import importlib.util, os, itertools
from fractions import Fraction as F
sp = importlib.util.spec_from_file_location('karty', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'karty.py'))
K = importlib.util.module_from_spec(sp); sp.loader.exec_module(K)
karta, ocena7, RANGI = K.karta, K.ocena7, K.RANGI
P = lambda s: [karta(x) for x in s.split()]
TALIA = list(range(52))

def req(f):  # potrzebne equity przy zakładzie f puli: f / (1 + 2f)
    return F(f) / (1 + 2 * F(f))

def klasa(a, b):
    ra, rb = a // 4, b // 4
    if ra < rb: ra, rb, a, b = rb, ra, b, a
    if ra == rb: return RANGI[ra] * 2
    return RANGI[ra] + RANGI[rb] + ('s' if a % 4 == b % 4 else 'o')

def klasy_z_listy(lista):
    out = set()
    for k in lista:
        out |= {k} if (len(k) == 2 and k[0] == k[1]) or (len(k) == 3) else {k + 's', k + 'o'}
    return out

print('== SC-13 (08-EX-4): rozmiar silną ręką na flopie wobec drawa do koloru; jedna karta (turn), D-1306 ==')
for f in ('1/4', '1/3', '2/3', '3/4'):
    print(f'  cena przy {f} puli: {float(req(F(f))):.4f}')
def flop_outy(hero, vil, flop):
    """Karty turnu (z 45 niewidzianych), na których rywal wygrywa albo remisuje po turnie (stan po 4 kartach stołu + river nieznany:
    liczymy układ 6 kart, jak na turnie), i nominalne outy koloru."""
    znane = set(hero + vil + flop)
    wygr = [c for c in TALIA if c not in znane and ocena7(vil + flop + [c]) >= ocena7(hero + flop + [c])]
    return wygr
for opis, h, v, fl in [
    ('A: AsKd vs QhJh, Ks8h5h (czyste 9 outów)', 'As Kd', 'Qh Jh', 'Ks 8h 5h'),
    ('B: AhKd vs QhJh, Ks8h5h (gracz trzyma Ah: 8 outów)', 'Ah Kd', 'Qh Jh', 'Ks 8h 5h'),
    ('C: AsKd vs 7h6h, Ks8h5h (kolor + strit: outy nieczyste)', 'As Kd', '7h 6h', 'Ks 8h 5h'),
]:
    w = flop_outy(P(h), P(v), P(fl))
    n = len(w); e = F(n, 47)
    print(f'  {opis}: kart turnu wygrywających/remisujących rywala = {n} ({" ".join(RANGI[c//4]+K.KOLORY[c%4] for c in w)}); e = {n}/47 = {float(e):.4f};'
          f' margines przy 1/4 = {float(e - req(F(1,4))):+.4f}, przy 2/3 = {float(req(F(2,3)) - e):+.4f}')

print('\n== SC-28 (08-EX-1/2, river-value): w = W/(W+L) wśród kombinacji sprawdzających po usunięciu kart; bet ⇔ w ≥ 0,5 + δ, czekanie ⇔ w ≤ 0,5 − δ ==')
def river_value(hero, board, calls, folds):
    hero, board = P(hero), P(board)
    martwe = set(hero + board)
    kc, kf = klasy_z_listy(calls), klasy_z_listy(folds)
    moja = ocena7(hero + board)
    W = L = T = Fl = lepszy_pas = 0
    for a, b in itertools.combinations(TALIA, 2):
        if a in martwe or b in martwe: continue
        k = klasa(a, b)
        jego = ocena7([a, b] + board)
        if k in kc:
            if jego < moja: W += 1
            elif jego > moja: L += 1
            else: T += 1
        elif k in kf:
            Fl += 1
            if jego > moja: lepszy_pas += 1
    w = F(W, W + L) if W + L else None
    return W, L, T, Fl, lepszy_pas, w
for opis, h, b, calls, folds in [
    ('D: QhQd na Js8c5d3h2s; sprawdzi AJ KJ JT J9 88 55; pasuje 76 A4 (A4 to strit, lepszy od gracza → odrzucenie, D-1302)', 'Qh Qd', 'Js 8c 5d 3h 2s', ['AJ', 'KJ', 'JT', 'J9', '88', '55'], ['76', 'A4']),
    ('G: QhQd na Js8c5d3h2s; sprawdzi AJ KJ JT J9 88 55; pasuje 76 (bet)', 'Qh Qd', 'Js 8c 5d 3h 2s', ['AJ', 'KJ', 'JT', 'J9', '88', '55'], ['76']),
    ('E: QhQd na Js8c5d3h2s; sprawdzi AJ KJ 88 55 JJ AA KK; pasuje 76 (w w pasie ±δ → odrzucenie)', 'Qh Qd', 'Js 8c 5d 3h 2s', ['AJ', 'KJ', '88', '55', 'JJ', 'AA', 'KK'], ['76']),
    ('H: QhQd na Js8c5d3h2s; sprawdzi AJ 88 55 JJ AA KK; pasuje 76 (czekanie)', 'Qh Qd', 'Js 8c 5d 3h 2s', ['AJ', '88', '55', 'JJ', 'AA', 'KK'], ['76']),
    ('F: QhQd na Js8c5d3h2s; sprawdzi AJ KJ; pasuje KK (lepsza ręka pasuje → odrzucenie, D-1302)', 'Qh Qd', 'Js 8c 5d 3h 2s', ['AJ', 'KJ'], ['KK']),
]:
    W, L, T, Fl, lp, w = river_value(h, b, calls, folds)
    print(f'  {opis}: W = {W}, L = {L}, remisy = {T}, pasujące = {Fl}, lepsze wśród pasujących = {lp}; w = {w} = {float(w):.4f}' if w is not None else f'  {opis}: brak sprawdzających')
