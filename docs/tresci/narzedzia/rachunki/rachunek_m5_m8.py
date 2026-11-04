"""Rola 06 E3: rachunki źródeł „rachunek” (szczebel 1) z rejestru docs/tresci/rejestr/m5-m8.json.
Każda sekcja liczy od nowa wielkości z pola `cytat` wpisu i porównuje je z cytatem (ułamki dokładne).
Dane wejściowe: content/numbers.yaml, content/ranges/preflop-6max-100bb.json (R-M5-004) i definicje pokera.
Użycie (z korzenia repo): python3 -I docs/tresci/narzedzia/rachunki/rachunek_m5_m8.py [korzeń-repo]
Kod 0: wszystko zgodne z cytatami; kod 1: rozbieżność (lista na końcu wyjścia)."""
import importlib.util
import sys
import itertools
import json
import math
from fractions import Fraction as F
from pathlib import Path

sys.dont_write_bytecode = True  # bez __pycache__ w repo
_s = importlib.util.spec_from_file_location('wspolne', Path(__file__).resolve().parent / 'wspolne.py')
W = importlib.util.module_from_spec(_s)
_s.loader.exec_module(W)

ROOT = W.korzen()
R = W.Raport()
L = W.Liczby(ROOT)
pct = lambda x: float(x) * 100
Z2 = W.zaokr(2)


def fr(k):
    return F(str(L(k)))


def mdf(p, b):
    return p / (p + b)


def alpha(p, b):
    return b / (p + b)


def eq_pot(p, b):
    return b / (p + 2 * b)


def sekcja_sety_765():
    """R-M5-004: flop 7-6-5, kombinacje setów z par 55–77 w zakresie otwarcia BTN i obrony BB (solver aplikacji).
    Każda z par 55, 66, 77 daje po C(3,2) = 3 kombinacje seta; przy pełnej wadze obaj mają po 9."""
    sp = json.load(open(ROOT / 'content' / 'ranges' / 'preflop-6max-100bb.json', encoding='utf-8'))['spots']
    def strat(path, gracz):
        s = next(x for x in sp if x['path'] == path and x['player'] == gracz)
        return dict(zip(s['actions'], s['strategy']))
    btn = strat('UTG:fold,HJ:fold,CO:fold', 'BTN')['raise 2.5']
    bb_all = strat('UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold', 'BB')
    bb = {r: sum(a[r] for n, a in bb_all.items() if n != 'fold') for r in ('55', '66', '77')}
    combo_set = math.comb(3, 2)
    s_btn = sum(combo_set * btn[r] for r in ('55', '66', '77'))
    s_bb = sum(combo_set * bb[r] for r in ('55', '66', '77'))
    R.warunek('R-M5-004', 'pary 55–77 w obu zakresach (waga ≥ 0,9)',
              all(btn[r] >= 0.9 and bb[r] >= 0.9 for r in ('55', '66', '77')),
              f'BTN {[round(btn[r], 3) for r in ("55", "66", "77")]}, BB (call+3-bet) {[round(bb[r], 3) for r in ("55", "66", "77")]}')
    R.warunek('R-M5-004', 'kombinacje setów na 7-6-5 podobne (różnica < 1 kombinacji)',
              abs(s_btn - s_bb) < 1, f'BTN {s_btn:.2f}, BB {s_bb:.2f} z 9 możliwych')


def sekcja_flop_bez_pary():
    """R-M5-006: C(44,3)/C(50,3), trafienie, dokładnie jedna para 6·C(44,2)/C(50,3); R-M5-013: C(36,3)/C(48,3)."""
    u = int(L('cards.unseen.preflop'))
    o = int(L('pair.outs.unpaired'))
    k = int(L('cards.board.flop'))
    brak = F(math.comb(u - o, k), math.comb(u, k))
    jedna = F(o * math.comb(u - o, k - 1), math.comb(u, k))
    R.liczba('R-M5-006', 'brak pary C(44,3)/C(50,3) [%]', pct(brak), 67.57, Z2)
    R.liczba('R-M5-006', 'trafienie 1 − brak [%]', pct(1 - brak), 32.43, Z2)
    R.liczba('R-M5-006', 'dokładnie jedna para 6·C(44,2)/C(50,3) [%]', pct(jedna), 28.96, Z2)
    u2 = int(L('cards.unseen.two-hands'))
    o2 = int(L('pair.outs.two-hands'))
    R.liczba('R-M5-013', 'obaj chybiają C(36,3)/C(48,3) [%]', pct(F(math.comb(u2 - o2, k), math.comb(u2, k))), 41.28, Z2)


def sekcja_alpha_mdf():
    """R-M5-011, R-M6-001, R-M6-002, R-M6-005, R-M6-011, R-M7-004, R-M7-013: alpha = bet/(pula+bet), MDF = pula/(pula+bet)."""
    pula = fr('ex.pot')
    R.liczba('R-M5-011', 'alpha c-betu 1/3: (1/3)/(4/3) [%]', pct(alpha(1, F(1, 3))), 25.00, Z2)
    R.liczba('R-M5-011', 'alpha c-betu 3/4: (3/4)/(7/4) [%]', pct(alpha(1, fr('cbet.size.big'))), 42.86, Z2)
    p3, b3 = fr('ex.third.pot'), fr('ex.third.bet')
    R.liczba('R-M6-001', 'MDF 90/120 [%]', pct(mdf(p3, b3)), 75.00, Z2)
    R.liczba('R-M6-001', 'alpha 30/120 [%]', pct(alpha(p3, b3)), 25.00, Z2)
    R.warunek('R-M6-001', 'blef ryzykuje 30, by wygrać 90 (1:3)', b3 / p3 == F(1, 3), f'{b3}:{p3}')
    R.liczba('R-M6-002', 'alpha 50/150 [%]', pct(alpha(pula, fr('ex.bet.half'))), 33.33, Z2)
    R.liczba('R-M6-005', 'MDF 1/3: 90/120 [%]', pct(mdf(p3, b3)), 75, W.zaokr(0))
    R.liczba('R-M6-005', 'MDF pula: 100/200 [%]', pct(mdf(pula, fr('ex.bet.pot'))), 50, W.zaokr(0))
    R.liczba('R-M6-005', 'equity 30/150 [%]', pct(eq_pot(p3, b3)), 20, W.zaokr(0))
    R.liczba('R-M6-005', 'equity 100/300 [%]', pct(eq_pot(pula, fr('ex.bet.pot'))), 33.33, Z2)
    R.liczba('R-M7-004', 'alpha 75/175 [%]', pct(alpha(pula, fr('ex.bet.three-quarters'))), 42.86, Z2)
    R.liczba('R-M7-004', 'alpha 50/150 [%]', pct(alpha(pula, fr('ex.bet.half'))), 33.33, Z2)
    # R-M6-011: blef zarabia tylko przy pasach częstszych niż alpha: EV = f·P − (1−f)·B > 0 ⇔ f > B/(P+B)
    zle = sum(1 for P in range(1, 51) for B in range(1, 51) for k in range(101)
              if ((F(k, 100) * P - (1 - F(k, 100)) * B) > 0) != (F(k, 100) > alpha(F(P), F(B))))
    R.warunek('R-M6-011', 'EV blefu > 0 ⇔ pasy > alpha (P, B = 1..50, f = k/100)', zle == 0, f'sprzecznych {zle}')
    # R-M7-013: MDF flop 1/3 puli → 75%, turn 3/4 puli → 100/175 = 57,1%; większy bet = węższa obrona
    m_flop, m_turn = mdf(1, F(1, 3)), mdf(pula, fr('ex.bet.three-quarters'))
    R.warunek('R-M7-013', 'MDF: flop 1/3 → 75%, turn 3/4 → 57,1%; turn węższy',
              pct(m_flop) == 75 and abs(pct(m_turn) - 57.1) <= 0.05 and m_turn < m_flop,
              f'{pct(m_flop):.2f}% i {pct(m_turn):.2f}%')


def sekcja_bluff_catcher():
    """R-M6-004, R-M8-004, R-M8-005, R-M8-010: udział blefów / potrzebne equity = bet/(pula+2·bet)."""
    pula, bp = fr('ex.pot'), fr('ex.bet.pot')
    p3, b3 = fr('ex.third.pot'), fr('ex.third.bet')
    R.liczba('R-M8-004', 'udział blefów 100/300 [%]', pct(eq_pot(pula, bp)), 33.33, Z2)
    ev = F(1, 3) * 2 - F(2, 3) * 1  # w jednostkach betu: wygrywa pulę+bet = 2 betów, przegrywa 1 bet
    R.liczba('R-M8-004', 'EV call bluff-catchera = (1/3)·2 − (2/3)·1', float(ev), 0, 1e-12)
    R.liczba('R-M8-005', 'udział blefów 30/150 [%]', pct(eq_pot(p3, b3)), 20.00, Z2)
    R.liczba('R-M8-005', 'udział blefów 100/300 [%]', pct(eq_pot(pula, bp)), 33.33, Z2)
    R.liczba('R-M8-010', 'potrzebne equity 100/300 [%]', pct(eq_pot(pula, bp)), 33.33, Z2)
    # R-M6-004 (por. R-M8-010): przy udziale blefów b mniejszym niż bet/(pula+2·bet) call ma EV < 0
    zle = 0
    for P in range(1, 31):
        for B in range(1, 31):
            prog = eq_pot(F(P), F(B))
            for k in range(101):
                b = F(k, 100)
                if ((b * (P + B) - (1 - b) * B) < 0) != (b < prog):
                    zle += 1
    R.warunek('R-M6-004', 'EV call bluff-catchera < 0 ⇔ udział blefów < bet/(pula+2·bet) (P, B = 1..30)', zle == 0,
              f'sprzecznych {zle}')


def sekcja_check_raise():
    """R-M6-010: pula 90, c-bet 30; dopłata/(pula po przebiciu + dopłata) przy 4,5x, 3x i 1,5x."""
    p, c = fr('ex.third.pot'), fr('ex.third.bet')
    for k, cyt in (('xr.mult.example', 29.17), ('xr.mult.low', 22.22), ('xr.too-small.mult', 8.33)):
        x = c * fr(k)
        dopl = x - c
        q = dopl / (p + c + x + dopl)
        R.liczba('R-M6-010', f'{float(fr(k)):g}x: {dopl}/{p + c + x + dopl} [%]', pct(q), cyt, Z2)


def sekcja_turn_draw():
    """R-M7-006, R-M7-007, R-M7-008: equity za cenę, kolor turn→river 9/46, implied odds."""
    pula = fr('ex.pot')
    outy, u_t, u_f = int(L('outs.flush')), int(L('cards.unseen.turn')), int(L('cards.unseen.flop'))
    turn = F(outy, u_t)
    flop = 1 - F(math.comb(u_f - outy, 2), math.comb(u_f, 2))
    R.liczba('R-M7-006', 'eq 75/250 [%]', pct(eq_pot(pula, fr('ex.bet.three-quarters'))), 30.00, Z2)
    R.liczba('R-M7-006', 'eq 25/150 [%]', pct(eq_pot(pula, fr('ex.bet.quarter'))), 16.67, Z2)
    R.liczba('R-M7-006', 'kolor turn→river 9/46 [%]', pct(turn), 19.57, Z2)
    R.liczba('R-M7-007', 'turn→river 9/46 [%]', pct(turn), 19.57, Z2)
    R.liczba('R-M7-007', 'flop→river 1 − C(38,2)/C(47,2) [%]', pct(flop), 34.97, Z2)
    R.liczba('R-M7-007', 'stosunek', float(turn / flop), 0.56, Z2)
    bet = fr('io.flush.bet')
    w = bet * (u_t - outy) / outy
    R.liczba('R-M7-008', 'W = 45·37/9', float(w), 185, 1e-9)
    R.liczba('R-M7-008', 'nadwyżka W − (90 + 45)', float(w - (fr('ex.third.pot') + bet)), 50, 1e-9)
    R.liczba('R-M7-008', 'EV call przy W: (9/46)·W − (37/46)·45', float(turn * w - (1 - turn) * bet), 0, 1e-12)


def sekcja_value_bet():
    """R-M8-001 i n:value.threshold: EV(bet) − EV(check) = w·B − (1−w)·B > 0 ⇔ w > 1/2."""
    zle = sum(1 for k in range(1001) for B in (1, 7, 100)
              if ((F(k, 1000) * B - (1 - F(k, 1000)) * B) > 0) != (F(k, 1000) > F(1, 2)))
    for wpis in ('R-M8-001', 'n:value.threshold'):
        R.warunek(wpis, 'w·B − (1−w)·B > 0 ⇔ w > 1/2 (w = k/1000)', zle == 0, f'sprzecznych {zle}')
        R.liczba(wpis, 'próg [%]', pct(F(1, 2)), 50, W.zaokr(0))
    R.liczba('n:value.threshold', 'value.threshold z numbers.yaml [%]', pct(fr('value.threshold')), 50, W.zaokr(0))


def sekcja_blokery():
    """R-M8-009: kombinacje AK i AA u rywala przy A♠ w ręce bohatera (wyliczenie itertools)."""
    rangi, kolory = 'AK', 'shdc'
    talia = [r + s for r in '23456789TJQKA' for s in kolory]
    def combos(r1, r2, martwe):
        zost = [c for c in talia if c not in martwe]
        return sum(1 for a, b in itertools.combinations(zost, 2) if sorted([a[0], b[0]]) == sorted([r1, r2]))
    R.liczba('R-M8-009', 'AK bez blokera', combos('A', 'K', []), 16, 0)
    R.liczba('R-M8-009', 'AK przy A♠', combos('A', 'K', ['As']), 12, 0)
    R.liczba('R-M8-009', 'AA bez blokera', combos('A', 'A', []), 6, 0)
    R.liczba('R-M8-009', 'AA przy A♠', combos('A', 'A', ['As']), 3, 0)


if __name__ == '__main__':
    sekcja_sety_765()
    sekcja_flop_bez_pary()
    sekcja_alpha_mdf()
    sekcja_bluff_catcher()
    sekcja_check_raise()
    sekcja_turn_draw()
    sekcja_value_bet()
    sekcja_blokery()
    R.koniec()
