#!/usr/bin/env python3
"""Kontrola plików poprawek pełnego przeglądu (sesja AQ, 2026-11-10). Tylko odczyt.
Użycie: sprawdz-poprawki.py <poprawki.json>…   Kod 0 = bez błędów.
Reguły: pola, cel pod content/<jezyk>/ albo słownik interfejsu / metadane sklepu, `stary` dokładnie 1× w pliku,
poprawki w jednym pliku nie nachodzą, zestaw znaczników {{n:…}} i kluczy {{t:…}} bez zmian (OSTRZEŻENIE, gdy inny)."""
import json, re, sys, os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..'))
WAGI = {'KRYT', 'WYS', 'ŚR', 'NISKIE'}
JEZ = {'it', 'es', 'pt-BR'}
def zn(s): return sorted(re.findall(r'\{\{n:[^}]+\}\}', s)), sorted(re.findall(r'\{\{t:([^}|]+)', s)), sorted(re.findall(r'\[\[[^\]]*\]\]', s))
bl = ost = n = 0
for f in sys.argv[1:]:
    lista = json.load(open(f, encoding='utf-8'))
    zakresy = {}
    for i, p in enumerate(lista):
        n += 1
        def e(m):
            global bl; bl += 1; print(f'BŁĄD {f}[{i}] {str(p.get("powod",""))[:40]}: {m}')
        if not all(isinstance(p.get(k), str) and p.get(k) for k in ('jezyk', 'cel', 'stary', 'waga', 'powod')) or not isinstance(p.get('nowy'), str): e('pola'); continue
        if p['waga'] not in WAGI: e(f'waga {p["waga"]}')
        j, cel = p['jezyk'], p['cel']
        if j not in JEZ: e('jezyk'); continue
        ok = cel.startswith(f'content/{j}/') or cel == f'apps/mobile/src/i18n/locales/{j}.json' or cel in ('store/app-store-metadata.json', 'docs/sklep/aso/metadane-fala2.json', 'store/iap-localizations.json')
        if not ok or '..' in cel: e(f'cel poza zakresem: {cel}'); continue
        sc = os.path.join(ROOT, cel)
        if not os.path.isfile(sc): e(f'brak pliku {cel}'); continue
        t = open(sc, encoding='utf-8').read()
        ile = t.count(p['stary'])
        if ile != 1: e(f'„stary” występuje {ile}× w {cel}'); continue
        if p['stary'] == p['nowy']: e('nowy = stary')
        a = t.index(p['stary']); b = a + len(p['stary'])
        for (x, y, k) in zakresy.get(cel, []):
            if a < y and x < b: e(f'nachodzi na poprawkę [{k}]')
        zakresy.setdefault(cel, []).append((a, b, i))
        if zn(p['stary']) != zn(p['nowy']):
            ost += 1; print(f'OSTRZEŻENIE {f}[{i}] {p["powod"][:40]}: zmiana znaczników {zn(p["stary"])} → {zn(p["nowy"])}')
print(f'poprawek: {n}, błędy: {bl}, ostrzeżenia: {ost}')
sys.exit(1 if bl else 0)
