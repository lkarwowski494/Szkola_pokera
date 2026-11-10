#!/usr/bin/env python3
"""Poprawki uzupełniające koordynującego (grupa S): ujednolicenie wzorca znalezionego przez czytających w miejscach, których
ich poprawki nie objęły. Wejście: <język>/uzupelnienia.tsv (plik<TAB>linia<TAB>było<TAB>ma być<TAB>waga<TAB>powód), stan pliku =
po nałożeniu poprawek części (kopia z scal.py --kopia). Wyjście: <język>/czesci/poprawki-<język>-S.json z unikalnym „stary”
(okno rozszerzane w obrębie linii oryginału; linia nie może być ruszana przez poprawki części).
Użycie: uzupelnij.py <język>"""
import json, sys, os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..'))
K = os.path.dirname(os.path.abspath(__file__)); jez = sys.argv[1]; out = []; bl = 0
for n, w in enumerate(open(f'{K}/{jez}/uzupelnienia.tsv', encoding='utf-8').read().splitlines(), 1):
    if not w.strip() or w.startswith('#'): continue
    plik, linia, bylo, ma, waga, powod = w.split('\t')
    t = open(os.path.join(ROOT, plik), encoding='utf-8').read(); L = t.split('\n')[int(linia) - 1]
    if L.count(bylo) < 1: bl += 1; print(f'BŁĄD w{n}: „{bylo}” 0× w {plik}:{linia}'); continue
    if L.count(bylo) > 1:  # kilka wystąpień w linii: cała linia, wszystkie zamienione
        if t.count(L) != 1: bl += 1; print(f'BŁĄD w{n}: linia nieunikalna {plik}:{linia}'); continue
        out.append({'jezyk': jez, 'cel': plik, 'stary': L, 'nowy': L.replace(bylo, ma), 'waga': waga, 'powod': f'{jez}-S-{len(out)+1:02d} {plik.split("/")[-1]}:{linia} ({L.count(bylo)}×) {powod}', 'grupa': f'{jez}-S'}); continue
    a = L.index(bylo); b = a + len(bylo); x, y = a, b
    while t.count(L[x:y]) != 1 and (x > 0 or y < len(L)): x = max(0, x - 8); y = min(len(L), y + 8)
    if t.count(L[x:y]) != 1: bl += 1; print(f'BŁĄD w{n}: brak unikalnego okna {plik}:{linia}'); continue
    out.append({'jezyk': jez, 'cel': plik, 'stary': L[x:y], 'nowy': L[x:a] + ma + L[b:y], 'waga': waga, 'powod': f'{jez}-S-{len(out)+1:02d} {plik.split("/")[-1]}:{linia} {powod}', 'grupa': f'{jez}-S'})
json.dump(out, open(f'{K}/{jez}/czesci/poprawki-{jez}-S.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'{jez}-S: {len(out)} poprawek, błędy {bl}'); sys.exit(1 if bl else 0)
