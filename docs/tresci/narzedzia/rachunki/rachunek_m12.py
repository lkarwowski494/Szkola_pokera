"""Rola 06 E3: rachunki źródeł „rachunek” (szczebel 1) z rejestru docs/tresci/rejestr/m12-m13.json.
Każda sekcja liczy od nowa wielkości z pola `cytat` wpisu i porównuje je z cytatem.
Dane wejściowe: content/numbers.yaml (var.*, br.*, dd.*, pf.aa-vs-kk, format.stack) i definicje.
Symulacje (numpy, generator default_rng ze stałym ziarnem, wynik bloku 100 rąk z rozkładu normalnego
o średniej = winrate i odchyleniu = SD; blok k rąk: średnia wr·k/100, odchylenie SD·√(k/100)):
  - downswing: maks. spadek od szczytu (szczyt liczony od startu 0) ≥ próg w wpisowych po 100bb;
  - ruina: skumulowany wynik ≤ −bankroll w 3 mln rąk (30 000 bloków po 100 rąk).
Tolerancja symulacji (punkty procentowe): 3·√(p(1−p)/n_cytatu + p(1−p)/n_nasze)·100 + zaokrąglenie cytatu;
dla ruiny liczba przebiegów cytatu nie jest podana, więc przyjęto n_cytatu = n_nasze (10 000).
Użycie (z korzenia repo): python3 -I docs/tresci/narzedzia/rachunki/rachunek_m12.py [korzeń-repo]
Kod 0: wszystko zgodne z cytatami; kod 1: rozbieżność (lista na końcu wyjścia). Czas ok. 1 min."""
import importlib.util
import sys
import math
import random
from fractions import Fraction as F
from pathlib import Path
from statistics import NormalDist

import numpy as np

sys.dont_write_bytecode = True  # bez __pycache__ w repo
_s = importlib.util.spec_from_file_location('wspolne', Path(__file__).resolve().parent / 'wspolne.py')
W = importlib.util.module_from_spec(_s)
_s.loader.exec_module(W)

R = W.Raport()
L = W.Liczby(W.korzen())
STACK = L('format.stack')  # wpisowe = 100bb
SD = L('var.sd')


def sekcja_przedzial():
    """R-M12-001: SE = SD ÷ √(ręce÷100); CI95 = wr ± 1,96·SE; z95 = Φ⁻¹(0,975)."""
    bloki = L('var.blocks')
    se = SD / math.sqrt(bloki)
    pol = L('var.z95') * se
    wr = L('var.wr.ex')
    R.liczba('R-M12-001', f'SE = {SD:g}/√{bloki:g}', se, 2.530, W.zaokr(3))
    R.liczba('R-M12-001', '1,96·SE', pol, 4.96, W.zaokr(2))
    R.liczba('R-M12-001', 'dolna granica wr − 1,96·SE [bb/100]', wr - pol, 0.04, W.zaokr(2))
    R.liczba('R-M12-001', 'górna granica wr + 1,96·SE [bb/100]', wr + pol, 9.96, W.zaokr(2))
    R.liczba('R-M12-001', 'z95 = Φ⁻¹(0,975)', NormalDist().inv_cdf(0.975), 1.95996, W.zaokr(5))


def sekcja_proba():
    """R-M12-003: bloki = (1,96·SD ÷ dokładność)²; ręce = bloki × 100."""
    z, cel = L('var.z95'), L('var.target')
    for sd, c_bl, c_k, dec in ((SD, 6146.56, 615, 0), (L('var.sd.high'), 9604, 960, 0)):
        bl = (z * sd / cel) ** 2
        R.liczba('R-M12-003', f'SD {sd:g}: bloki (1,96·{sd:g}/{cel:g})²', bl, c_bl, 1e-6)
        R.liczba('R-M12-003', f'SD {sd:g}: ręce [tys.] ≈', bl * 100 / 1000, c_k, W.zaokr(dec))
    R.liczba('R-M12-003', 'SD 80: ręce = 6146,56 × 100', (z * SD / cel) ** 2 * 100, 614656, 1e-6)


def ror(wr, bi):
    return math.exp(-2 * wr * bi * STACK / SD ** 2)


def sekcja_ror_wzor():
    """R-M12-009 (wzór), R-M12-010, R-M12-011, n:br.bi.base, n:br.bi.beginner: RoR = e^(−2·wr·BR/SD²), BR w bb."""
    w1, w3, w5 = L('var.wr.typical.low'), L('var.wr.typical.high'), L('var.wr.ex')
    b30, b50, b15 = L('br.bi.base'), L('br.bi.beginner'), L('br.bi.move-down')
    d2 = W.zaokr(2)
    d1 = W.zaokr(1)
    for opis, v, c in (('wr3/30', ror(w3, b30), 6.01), ('wr3/15', ror(w3, b15), 24.51), ('wr1/30', ror(w1, b30), 39.16),
                       ('wr1/50', ror(w1, b50), 20.96), ('wr5/30', ror(w5, b30), 0.92), ('wr2/40', ror(L('dd.wr-low'), 40), 8.21)):
        R.liczba('R-M12-009', f'RoR {opis} [%]', v * 100, c, d2)
    R.liczba('R-M12-010', 'RoR wr1, 30 wpisowych [%]', ror(w1, b30) * 100, 39.2, d1)
    R.liczba('R-M12-010', 'RoR wr1, 50 wpisowych [%]', ror(w1, b50) * 100, 21.0, d1)
    R.liczba('R-M12-011', 'RoR wr3, 15 wpisowych [%]', ror(w3, b15) * 100, 24.5, d1)
    R.liczba('R-M12-011', 'RoR wr3, 30 wpisowych [%]', ror(w3, b30) * 100, 6.0, d1)
    R.liczba('n:br.bi.base', 'e^(−2·3·3000/6400) [%]', ror(w3, b30) * 100, 6.0, d1)
    R.liczba('n:br.bi.beginner', 'e^(−2·1·5000/6400) [%]', ror(w1, b50) * 100, 21.0, d1)


def _sciezki(rng, n, kroki, mu, s, chunk):
    for start in range(0, n, chunk):
        m = min(chunk, n - start)
        x = rng.normal(mu, s, (m, kroki))
        np.cumsum(x, axis=1, out=x)
        yield x


def p_downswing(rng, n, reka, krok, wr, progi_bi, chunk):
    kroki = reka // krok
    mu, s = wr * krok / 100, SD * math.sqrt(krok / 100)
    traf = np.zeros(len(progi_bi), dtype=np.int64)
    for x in _sciezki(rng, n, kroki, mu, s, chunk):
        szczyt = np.maximum.accumulate(np.maximum(x, 0.0), axis=1)
        dd = (szczyt - x).max(axis=1)
        for i, p in enumerate(progi_bi):
            traf[i] += int((dd >= p * STACK).sum())
    return traf / n


N_DD, ZIARNO_DD = 20_000, 424242  # jak w cytacie: 20 tys. przebiegów, ziarno 424242 (strumień liczb inny niż w cytacie)


def sekcja_downswing():
    """R-M12-002, n:dd.bi.small: P(maks. spadek od szczytu ≥ próg) w próbce rąk."""
    rng = np.random.default_rng(ZIARNO_DD)
    wr5, wr2 = L('var.wr.ex'), L('dd.wr-low')
    hk, hk_short = int(L('var.hands.k')) * 1000, int(L('dd.hands.short.k')) * 1000
    small, big = L('dd.bi.small'), L('dd.bi.big')
    tol = lambda p: W.tol_mc(p, N_DD, N_DD, 1)
    p100 = p_downswing(rng, N_DD, hk, 100, wr5, [small, big], 2000)
    p10 = p_downswing(rng, N_DD, hk, 10, wr5, [small], 200)
    p20k = p_downswing(rng, N_DD, hk_short, 100, wr5, [small], 5000)
    pwr2 = p_downswing(rng, N_DD, hk, 100, wr2, [small, big], 2000)
    R.liczba('R-M12-002', '10 wpisowych, 100 tys. rąk, wr 5, kroki 100 rąk [%]', p100[0] * 100, 94.9, tol(p100[0]))
    R.liczba('n:dd.bi.small', 'próg 10 wpisowych, 100 tys. rąk, wr 5 [%]', p100[0] * 100, 94.9, tol(p100[0]))
    R.liczba('R-M12-002', '10 wpisowych, kroki 10 rąk [%]', p10[0] * 100, 97.1, tol(p10[0]))
    R.liczba('R-M12-002', '10 wpisowych, 20 tys. rąk [%]', p20k[0] * 100, 39.7, tol(p20k[0]))
    R.liczba('R-M12-002', '10 wpisowych, wr 2 [%]', pwr2[0] * 100, 99.0, tol(pwr2[0]))
    R.liczba('R-M12-002', '20 wpisowych, wr 5 [%]', p100[1] * 100, 27.6, tol(p100[1]))
    R.liczba('R-M12-002', '20 wpisowych, wr 2 [%]', pwr2[1] * 100, 58.9, tol(pwr2[1]))


N_ROR, ZIARNO_ROR, RECE_ROR = 10_000, 20261104, 3_000_000


def p_ruina(rng, wr, progi_bi):
    kroki = RECE_ROR // 100
    traf = np.zeros(len(progi_bi), dtype=np.int64)
    for x in _sciezki(rng, N_ROR, kroki, wr, SD, 250):
        mn = x.min(axis=1)
        for i, p in enumerate(progi_bi):
            traf[i] += int((mn <= -p * STACK).sum())
    return traf / N_ROR


def sekcja_ror_mc():
    """R-M12-009 (Monte Carlo), n:ror.two: ruina w 3 mln rąk, bloki 100 rąk; MC nie powyżej wzoru (kroki dyskretne)."""
    rng = np.random.default_rng(ZIARNO_ROR)
    w1, w3 = L('var.wr.typical.low'), L('var.wr.typical.high')
    b30, b15 = L('br.bi.base'), L('br.bi.move-down')
    p3 = p_ruina(rng, w3, [b15, b30])
    p1 = p_ruina(rng, w1, [b30])
    tol = lambda p: W.tol_mc(p, N_ROR, N_ROR, 1)
    for wpis, opis, p, c, wz in (('R-M12-009', 'wr3/15', p3[0], 23.6, ror(w3, b15)),
                                 ('R-M12-009', 'wr3/30', p3[1], 5.7, ror(w3, b30)),
                                 ('R-M12-009', 'wr1/30', p1[0], 38.0, ror(w1, b30)),
                                 ('n:ror.two', 'wr3/30', p3[1], 5.7, ror(w3, b30))):
        R.liczba(wpis, f'MC ruiny {opis} [%]', p * 100, c, tol(p))
        # kroki dyskretne i skończona próbka dają ruinę nie większą niż wzór ciągły; sprawdzane z tolerancją symulacji
        R.warunek(wpis, f'MC {opis} nie powyżej wzoru (± tolerancja)', p * 100 <= wz * 100 + tol(p) - W.zaokr(1),
                  f'MC {p * 100:.2f}%, wzór {wz * 100:.2f}%')


N_AA, ZIARNO_AA, N_AA_CYTAT = 200_000, 20261104, 60_000


def sekcja_aa_kk():
    """R-M12-004: equity AA wobec KK przed flopem (Monte Carlo, losowe kolory), remisy; zgodność z pf.aa-vs-kk."""
    K = W.modul('karty')
    rng = random.Random(ZIARNO_AA)
    asy, krole = [12 * 4 + s for s in range(4)], [11 * 4 + s for s in range(4)]
    wyg = rem = 0
    for _ in range(N_AA):
        a = rng.sample(asy, 2)
        k = rng.sample(krole, 2)
        reszta = [c for c in range(52) if c not in a and c not in k]
        stol = rng.sample(reszta, 5)
        ea, ek = K.ocena7(a + stol), K.ocena7(k + stol)
        if ea > ek:
            wyg += 1
        elif ea == ek:
            rem += 1
    eq = (wyg + rem / 2) / N_AA
    pr = rem / N_AA
    R.liczba('R-M12-004', 'equity AA vs KK [%]', eq * 100, 81.77, W.tol_mc(eq, N_AA_CYTAT, N_AA, 2))
    R.liczba('R-M12-004', 'remisy [%]', pr * 100, 0.47, W.tol_mc(pr, N_AA_CYTAT, N_AA, 2))
    R.liczba('R-M12-004', 'połowa przedziału 95% cytatu: 1,96·√(e(1−e)/60 000) [pp]',
             1.96 * math.sqrt(0.8177 * 0.1823 / N_AA_CYTAT) * 100, 0.31, W.zaokr(2))
    exact = L('pf.aa-vs-kk') * 100
    R.warunek('R-M12-004', 'cytat 81,77 ± 0,31 obejmuje pf.aa-vs-kk', abs(81.77 - exact) <= 0.31, f'pf.aa-vs-kk = {exact:.2f}%')
    R.liczba('R-M12-004', 'KK wygrywa ok. [%] (100 − equity AA, zaokr. do 1)', round(100 - eq * 100), 18, 0)


def sekcja_przegrana():
    """R-M13-001: P(przegrana) = 1 − equity."""
    R.warunek('R-M13-001', '1 − 4/5 = 1/5', 1 - F(4, 5) == F(1, 5))
    R.warunek('R-M13-001', '10 · 1/5 = 2', 10 * F(1, 5) == 2)
    R.warunek('R-M13-001', '1 − 13/20 = 7/20', 1 - F(13, 20) == F(7, 20))


def sekcja_kolory():
    """R-M13-003: 3000 losowych układów 2+2+5 kart i losowych permutacji kolorów: ranga i wynik porównania bez zmian."""
    K = W.modul('karty')
    rng = random.Random(20261104)
    zmiany = 0
    for _ in range(3000):
        k = rng.sample(range(52), 9)
        perm = list(range(4))
        rng.shuffle(perm)
        pk = [(c // 4) * 4 + perm[c % 4] for c in k]
        a, b = K.ocena7(k[:2] + k[4:]), K.ocena7(k[2:4] + k[4:])
        pa, pb = K.ocena7(pk[:2] + pk[4:]), K.ocena7(pk[2:4] + pk[4:])
        if a != pa or b != pb or (a > b) != (pa > pb) or (a == b) != (pa == pb):
            zmiany += 1
    R.liczba('R-M13-003', 'zmiany rangi lub wyniku porównania po permutacji kolorów (3000 układów)', zmiany, 0, 0)


if __name__ == '__main__':
    sekcja_przedzial()
    sekcja_proba()
    sekcja_ror_wzor()
    sekcja_przegrana()
    sekcja_kolory()
    sekcja_aa_kk()
    sekcja_downswing()
    sekcja_ror_mc()
    R.koniec()
