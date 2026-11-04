"""Rola 06 E3: wspólny moduł kart dla rachunków rejestru (tylko biblioteka standardowa).
Ewaluator 7 kart z definicji rankingu układów Texas Hold'em i proste Monte Carlo equity.
Karta = liczba 0..51: ranga = karta // 4 (0 = dwójka … 12 = as), kolor = karta % 4.
Moduł nie jest uruchamiany samodzielnie; ładują go rachunek_m0_m4.py i rachunek_m12.py
(importlib ze ścieżki pliku, więc działa także pod python3 -I)."""
import random

RANGI = '23456789TJQKA'
KOLORY = 'shdc'


def karta(napis):
    """'As' -> karta (ranga + kolor: s pik, h kier, d karo, c trefl)."""
    return RANGI.index(napis[0]) * 4 + KOLORY.index(napis[1])


def _strit(maska):
    """Najwyższa ranga strita w masce rang (as także jako jedynka) albo -1."""
    m = (maska << 1) | ((maska >> 12) & 1)  # bit 0 = as jako jedynka
    for t in range(13, 3, -1):
        if (m >> (t - 4)) & 0x1F == 0x1F:
            return t - 1
    return -1


def ocena7(karty):
    """Siła najlepszego układu 5 z 5–7 kart jako krotka (większa = silniejsza).
    Kategorie: 8 poker, 7 kareta, 6 full, 5 kolor, 4 strit, 3 trójka, 2 dwie pary, 1 para, 0 wysoka karta."""
    rc = [0] * 13
    sc = [0] * 4
    ms = [0] * 4
    for c in karty:
        r = c >> 2
        s = c & 3
        rc[r] += 1
        sc[s] += 1
        ms[s] |= 1 << r
    for s in range(4):
        if sc[s] >= 5:
            # przy 5+ kartach jednego koloru w najwyżej 7 kartach kareta ani full nie są możliwe
            sf = _strit(ms[s])
            if sf >= 0:
                return (8, sf)
            return (5,) + tuple([r for r in range(12, -1, -1) if ms[s] >> r & 1][:5])
    maska = 0
    for r in range(13):
        if rc[r]:
            maska |= 1 << r
    grupy = sorted(((rc[r], r) for r in range(13) if rc[r]), reverse=True)
    n0, r0 = grupy[0]
    if n0 == 4:
        return (7, r0, max(r for r in range(13) if rc[r] and r != r0))
    if n0 == 3 and len(grupy) > 1 and grupy[1][0] >= 2:
        return (6, r0, grupy[1][1])
    st = _strit(maska)
    if st >= 0:
        return (4, st)
    if n0 == 3:
        return (3, r0) + tuple([r for r in range(12, -1, -1) if rc[r] and r != r0][:2])
    if n0 == 2 and grupy[1][0] == 2:
        p1, p2 = grupy[0][1], grupy[1][1]
        return (2, p1, p2, max(r for r in range(13) if rc[r] and r not in (p1, p2)))
    if n0 == 2:
        return (1, r0) + tuple([r for r in range(12, -1, -1) if rc[r] and r != r0][:3])
    return (0,) + tuple([r for r in range(12, -1, -1) if rc[r]][:5])


def equity_vs_losowa(reka, n, ziarno):
    """Equity ręki (wygrane + remisy/2) wobec losowej ręki, Monte Carlo n rozdań, stałe ziarno
    (to samo ziarno dla każdej ręki = wspólne losowania)."""
    rng = random.Random(ziarno)
    talia = [c for c in range(52) if c not in reka]
    wynik = 0.0
    for _ in range(n):
        los = rng.sample(talia, 7)
        stol = los[2:]
        a = ocena7(list(reka) + stol)
        b = ocena7(los[:2] + stol)
        if a > b:
            wynik += 1
        elif a == b:
            wynik += 0.5
    return wynik / n
