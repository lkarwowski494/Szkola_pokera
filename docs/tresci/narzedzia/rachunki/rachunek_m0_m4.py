"""Rola 06 E3: rachunki źródeł „rachunek” (szczebel 1) z rejestru docs/tresci/rejestr/m0-m4.json.
Każda sekcja liczy od nowa wielkości z pola `cytat` wpisu i porównuje je z cytatem.
Dane wejściowe: content/numbers.yaml (wartości i formuły liczone od nowa) oraz definicje pokera.
Użycie (z korzenia repo): python3 -I docs/tresci/narzedzia/rachunki/rachunek_m0_m4.py [korzeń-repo]
Kod 0: wszystko zgodne z cytatami; kod 1: rozbieżność (lista na końcu wyjścia)."""
import importlib.util
import sys
import math
import random
from fractions import Fraction as F
from pathlib import Path

sys.dont_write_bytecode = True  # bez __pycache__ w repo
_s = importlib.util.spec_from_file_location('wspolne', Path(__file__).resolve().parent / 'wspolne.py')
W = importlib.util.module_from_spec(_s)
_s.loader.exec_module(W)

R = W.Raport()
L = W.Liczby(W.korzen())
pct = lambda x: float(x) * 100


def sekcja_dominacja_czekania():
    """R-M1-002: EV(check) − EV(fold) = equity × pula ≥ 0 dla equity ∈ [0,1] (ułamki dokładne)."""
    zle = 0
    for pula in range(1, 201):
        for k in range(0, 101):
            eq = F(k, 100)
            ev_check, ev_fold = eq * pula, F(0)
            if ev_check - ev_fold != eq * pula or ev_check - ev_fold < 0:
                zle += 1
    R.warunek('R-M1-002', 'dominacja: EV(check) − EV(fold) = equity × pula ≥ 0 (pula 1..200, equity k/100)',
              zle == 0, f'przypadków sprzecznych: {zle} z {200 * 101}')


def sekcja_ev_sprawdzenia():
    """R-M1-003 i R-M2-005: EV(pas) = 0, EV(call) = eq·(P+2B) − B; EV(call) < 0 ⇔ eq < B/(P+2B)."""
    rng = random.Random(20261104)
    n, zgodne = 10_000, 0
    for _ in range(n):
        P = F(rng.randint(1, 1000))
        B = F(rng.randint(1, 1000))
        eq = F(rng.randint(0, 10_000), 10_000)
        ev_call = eq * (P + 2 * B) - B
        if (ev_call < 0) == (eq < B / (P + 2 * B)):
            zgodne += 1
    opis = 'EV(call) = eq×(P+2B) − B < 0 ⇔ eq < B/(P+2B), 10 000 losowych ułamków (ziarno 20261104)'
    R.warunek('R-M1-003', opis, zgodne == n, f'zgodne {zgodne}/{n}')
    R.warunek('R-M2-005', opis, zgodne == n, f'zgodne {zgodne}/{n}')


def sekcja_outy_kolor():
    """R-M2-001: outy = 13 − 4 = 9; P(turn) = 9/47; P(do rivera) = 1 − (38/47)(37/46)."""
    outy = int(L('outs.flush'))
    u = int(L('cards.unseen.flop'))
    R.liczba('R-M2-001', 'outy do koloru', outy, 9, 0)
    R.liczba('R-M2-001', 'P(kolor na turnie) = outy/47 [%]', pct(F(outy, u)), 19.15, W.zaokr(2))
    p2 = 1 - F(u - outy, u) * F(u - outy - 1, u - 1)
    R.liczba('R-M2-001', 'P(kolor do rivera) = 1 − 38·37/(47·46) [%]', pct(p2), 34.97, W.zaokr(2))


def sekcja_regula_2_4():
    """R-M2-002: maks. błąd reguły ×2 (1 karta, 47 lub 46 nieznanych) i ×4 (2 karty z flopu), n = 1…10."""
    u_flop, u_turn = int(L('cards.unseen.flop')), int(L('cards.unseen.turn'))
    b2 = max((abs(2 * n - 100 * n / u), n, u) for n in range(1, 11) for u in (u_flop, u_turn))
    b4 = max((abs(4 * n - 100 * (1 - math.comb(u_flop - n, 2) / math.comb(u_flop, 2))), n) for n in range(1, 11))
    R.liczba('R-M2-002', f'maks. błąd ×2 [pp] (n={b2[1]}, nieznanych {b2[2]})', b2[0], 1.74, W.zaokr(2))
    R.warunek('R-M2-002', 'maks. błąd ×2 przy n=10 i 1 karcie z turnu (46 nieznanych)', b2[1:] == (10, u_turn))
    R.liczba('R-M2-002', f'maks. błąd ×4 [pp] (n={b4[1]})', b4[0], 1.61, W.zaokr(2))
    R.warunek('R-M2-002', 'maks. błąd ×4 przy n=10', b4[1] == 10)


def sekcja_potrzebne_equity():
    """R-M2-003, R-M2-004: potrzebne equity = bet/(pula + 2·bet)."""
    pula = L('ex.pot')
    for wpis, bet, cyt, dec in (('R-M2-003', L('ex.bet.half'), 25, 0), ('R-M2-004', L('ex.bet.pot'), 33.3, 1)):
        R.liczba(wpis, f'bet {bet:g} do puli {pula:g}: bet/(pula+2·bet) [%]', pct(bet / (pula + 2 * bet)), cyt, W.zaokr(dec))


def sekcja_obrona_bb():
    """R-M4-004 (BB wobec otwarcia BTN, SB pasuje) i R-M4-014 (BB wobec otwarcia SB): dopłata/(pula po sprawdzeniu)."""
    o, sb, bb = F(str(L('pf.open-size'))), F(str(L('pf.blind.sb'))), F(str(L('pf.blind.bb')))
    d = o - bb
    q = d / (o + sb + bb + d)
    R.warunek('R-M4-004', 'dopłata/(pula po sprawdzeniu) = 1,5/(2,5 + 0,5 + 1 + 1,5) = 3/11', q == F(3, 11), str(q))
    R.liczba('R-M4-004', 'potrzebne equity [%]', pct(q), 27.3, W.zaokr(1))
    o_sb = F(str(L('pf.open-size-sb')))
    d = o_sb - bb
    q = d / (o_sb + bb + d)
    R.warunek('R-M4-014', 'dopłata/(pula po sprawdzeniu) = 2/(3 + 1 + 2) = 1/3', q == F(1, 3), str(q))
    R.liczba('R-M4-014', 'potrzebne equity [%]', pct(q), 33.3, W.zaokr(1))


# Pailiku (https://pailiku.com/charts/co-vs-btn-3bet i /charts): CO wobec 3-betu BTN, 4-bet 38 kombinacji,
# call 82 kombinacje; otwarcie CO 354 kombinacje (cytaty w źródłach wpisu R-M4-007). Dane wejściowe ze źródła.
PAILIKU_4BET, PAILIKU_CALL, PAILIKU_CO = 38, 82, 354
WPISY_VS3BET = ['R-M4-007', 'n:pf.vs3bet.fold.high', 'n:pf.vs3bet.fold.low', 'n:pf.vs3bet.call.high',
                'n:pf.vs3bet.call.low', 'n:pf.vs3bet.4bet.high', 'n:pf.vs3bet.4bet.low',
                'n:pf.vs3bet.pub2.4bet', 'n:pf.vs3bet.pub2.call', 'n:pf.vs3bet.pub2.fold']


def sekcja_vs3bet_pailiku():
    """R-M4-007 i liczby pf.vs3bet.*: 38/354, 82/354, 1 − 120/354; alpha = 7,5/(7,5 + 4)."""
    for w in WPISY_VS3BET:
        R.liczba(w, '4-bet 38/354 [%]', pct(F(PAILIKU_4BET, PAILIKU_CO)), 10.7, W.zaokr(1))
        R.liczba(w, 'call 82/354 [%]', pct(F(PAILIKU_CALL, PAILIKU_CO)), 23.2, W.zaokr(1))
        R.liczba(w, 'pas 1 − 120/354 [%]', pct(1 - F(PAILIKU_4BET + PAILIKU_CALL, PAILIKU_CO)), 66.1, W.zaokr(1))
    t3, wygr = L('pf.3bet.ip-total'), L('vs3bet.win')
    R.liczba('R-M4-007', f'alpha 3-betu = {t3:g}/({t3:g} + {wygr:g}) [%]', pct(t3 / (t3 + wygr)), 65.2, W.zaokr(1))


def sekcja_spr_4bet():
    """R-M4-011 i n:pf.4bet.size-oop.low: SPR = (stack − 4-bet)/(2·4-bet + martwe blindy)."""
    st = L('format.stack')
    t3_ip, t3_oop = L('pf.3bet.ip-total'), L('pf.3bet.oop-total')
    sb, bb = L('pf.blind.sb'), L('pf.blind.bb')
    # IP z 3-betu 10bb (3-bet z SB wobec BTN, martwy BB = 1bb); OOP z 7,5bb (CO wobec BTN, martwe oba blindy)
    przypadki = [
        ('IP 2,2x z 3-betu 10bb', t3_oop * L('pf.4bet.size-ip.low'), bb, 78, 45, 1.73),
        ('IP 2,5x z 3-betu 10bb', t3_oop * L('pf.4bet.size-ip.high'), bb, 75, 51, 1.47),
        ('OOP 2,3x z 3-betu 7,5bb', t3_ip * L('pf.4bet.size-oop.low'), sb + bb, 82.75, 36, 2.30),
        ('OOP 3x z 3-betu 7,5bb', t3_ip * L('pf.4bet.size-oop.high'), sb + bb, 77.5, 46.5, 1.67),
    ]
    for opis, b4, martwe, c_l, c_m, c_spr in przypadki:
        licz, mian = st - b4, 2 * b4 + martwe
        R.liczba('R-M4-011', f'{opis}: licznik stack − 4-bet', licz, c_l, 1e-9)
        R.liczba('R-M4-011', f'{opis}: mianownik 2·4-bet + martwe', mian, c_m, 1e-9)
        R.liczba('R-M4-011', f'{opis}: SPR', licz / mian, c_spr, W.zaokr(2))
    pa = 17.2 / t3_ip  # 4-bet do 17,2bb wobec 3-betu 7,5bb (poker.academy, źródło szczebla 2 wpisu)
    R.liczba('R-M4-011', 'PA 17,2/7,5 [x]', pa, 2.29, W.zaokr(2))
    R.liczba('n:pf.4bet.size-oop.low', '17,2/7,5 [x]', pa, 2.29, W.zaokr(2))
    R.liczba('n:pf.4bet.size-oop.low', '≈ 2,3x (zaokrąglenie do 0,1)', round(pa, 1), L('pf.4bet.size-oop.low'), 1e-9)


N_EQ, ZIARNO_EQ, N_EQ_CYTAT = 100_000, 20261104, 20_000


def sekcja_equity_suited():
    """R-M3-005: equity ręki wobec losowej ręki, Monte Carlo (wspólne losowania: to samo ziarno dla każdej ręki).
    Tolerancja: 3·√(SE_cytatu² + SE_nasze²) + 0,05 pp; SE = √(e(1−e)/n), n cytatu 20 000, nasze 100 000."""
    K = W.modul('karty')
    pary = [('AKs', 'As Ks', 67.2, 'AKo', 'As Kh', 65.3), ('76s', '7s 6s', 45.4, '76o', '7s 6h', 42.5),
            ('72s', '7s 2s', 38.4, '72o', '7s 2h', 34.8), ('32s', '3s 2s', 36.2, '32o', '3s 2h', 32.6)]
    for ns, ks, cs, no, ko, co in pary:
        es = K.equity_vs_losowa([K.karta(x) for x in ks.split()], N_EQ, ZIARNO_EQ)
        eo = K.equity_vs_losowa([K.karta(x) for x in ko.split()], N_EQ, ZIARNO_EQ)
        R.liczba('R-M3-005', f'{ns} equity vs losowa [%]', pct(es), cs, W.tol_mc(es, N_EQ_CYTAT, N_EQ, 1))
        R.liczba('R-M3-005', f'{no} equity vs losowa [%]', pct(eo), co, W.tol_mc(eo, N_EQ_CYTAT, N_EQ, 1))
        R.warunek('R-M3-005', f'{ns} silniejsza niż {no}', es > eo, f'{pct(es):.2f} > {pct(eo):.2f}')


if __name__ == '__main__':
    sekcja_dominacja_czekania()
    sekcja_ev_sprawdzenia()
    sekcja_outy_kolor()
    sekcja_regula_2_4()
    sekcja_potrzebne_equity()
    sekcja_obrona_bb()
    sekcja_vs3bet_pailiku()
    sekcja_spr_4bet()
    sekcja_equity_suited()
    R.koniec()
