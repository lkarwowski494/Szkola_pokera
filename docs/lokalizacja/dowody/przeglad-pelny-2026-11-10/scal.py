#!/usr/bin/env python3
"""Scala części pełnego przeglądu jednego języka (sesja AQ, 2026-11-10): poprawki-<język>.json + test nałożenia na kopii.
Użycie: scal.py <język> [--bez <Nr,Nr…>]   (Nr = numer znaleziska odrzuconego przez koordynującego; poprawki z tym Nr w „powod” odpadają)
Niczego nie zmienia w content/ ani locales/: nakłada poprawki w pamięci i sprawdza: „stary” 1×, YAML/JSON parsuje się,
zestaw {{n:…}} i kluczy {{t:…}} każdego pliku po poprawkach = zestaw w pliku źródłowym pl (lekcje, egzaminy, rules, areas, modules)."""
import json, re, sys, os, glob, collections
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..'))
K = os.path.dirname(os.path.abspath(__file__))
jez = sys.argv[1]
bez = set(sys.argv[sys.argv.index('--bez') + 1].split(',')) if '--bez' in sys.argv else set()
ORDER = ['L1','L2','L3','L4','L5','L6','L7','R1','R2','X1','X2','U','T','S']
wsz, odrz = [], []
for g in ORDER:
    f = f'{K}/{jez}/czesci/poprawki-{jez}-{g}.json'
    if not os.path.exists(f): continue
    for p in json.load(open(f, encoding='utf-8')):
        m = re.search(rf'{re.escape(jez)}-[A-Z]\d?-\d+', p.get('powod', ''))
        nr = m.group(0) if m else None
        p['grupa'] = f'{jez}-{g}'
        (odrz if nr in bez else wsz).append(p)
teksty, bl = {}, 0
for p in wsz:
    c = p['cel']; t = teksty.get(c)
    if t is None: t = teksty[c] = open(os.path.join(ROOT, c), encoding='utf-8').read()
    if t.count(p['stary']) != 1: bl += 1; print('BŁĄD', c, p['powod'][:50], t.count(p['stary'])); continue
    teksty[c] = t.replace(p['stary'], p['nowy'], 1)
zn = lambda s: (sorted(re.findall(r'\{\{n:[^}]+\}\}', s)), sorted(x.strip() for x in re.findall(r'\{\{t:([^}|]+)', s)), sorted(re.findall(r'\[\[[^\]]*\]\]', s)))
try:
    import yaml
except ImportError: yaml = None
for c, t in sorted(teksty.items()):
    try:
        if c.endswith('.json'): json.loads(t)
        elif yaml and c.endswith('.yaml'): yaml.safe_load(t)
        elif yaml and c.endswith('.md') and t.startswith('---'): yaml.safe_load(t.split('---')[1])
    except Exception as e: bl += 1; print('BŁĄD parsowania', c, str(e)[:120])
    if c.startswith(f'content/{jez}/'):
        zr = os.path.join(ROOT, 'content/pl', c[len(f'content/{jez}/'):])
        if os.path.exists(zr) and zn(open(zr, encoding='utf-8').read()) != zn(t):
            a, b = zn(open(zr, encoding='utf-8').read()), zn(t)
            if a[0] != b[0] or a[2] != b[2]: bl += 1; print('BŁĄD znaczniki n/karty ≠ pl', c)
            elif a[1] != b[1]:
                d = collections.Counter(a[1]); d.subtract(b[1]); print('UWAGA klucze t ≠ pl', c, {k: v for k, v in d.items() if v})
json.dump(wsz, open(f'{K}/{jez}/poprawki-{jez}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1); open(f'{K}/{jez}/poprawki-{jez}.json', 'a').write('\n')
w = collections.Counter(p['waga'] for p in wsz); g = collections.Counter(p['grupa'] for p in wsz)
print(f'{jez}: poprawek {len(wsz)} (odrzucone decyzją: {len(odrz)}), plików {len(teksty)}, wg wagi {dict(w)}, błędy {bl}, yaml={"tak" if yaml else "NIE (brak modułu)"}')
print(' wg grupy', dict(g))
if '--kopia' in sys.argv:
    kop = sys.argv[sys.argv.index('--kopia') + 1]
    for c, t in teksty.items():
        os.makedirs(os.path.dirname(os.path.join(kop, c)), exist_ok=True); open(os.path.join(kop, c), 'w', encoding='utf-8').write(t)
sys.exit(1 if bl else 0)
