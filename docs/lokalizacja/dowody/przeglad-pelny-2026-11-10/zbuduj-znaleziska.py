#!/usr/bin/env python3
"""Składa <język>/znaleziska.md z części czytających (czesci/<język>-*.md), scalonych poprawek i <język>/decyzje.md
(rozstrzygnięcia koordynującego sesji AQ). Użycie: zbuduj-znaleziska.py <język>"""
import json, re, sys, os, glob, collections
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..'))
K = os.path.dirname(os.path.abspath(__file__)); jez = sys.argv[1]
L = {'L1': 'm0-l1 m1-l1 m2-l1 m2-l2 m3-l1 m3-l2 m3-l3 m4-l1 m4-l2', 'L2': 'm4-l3 m4-l4 m5-l1 m5-l2 m5-l3 m5-l4', 'L3': 'm6-l1 m6-l2 m6-l3 m7-l1 m7-l2',
     'L4': 'm7-l3 m7-l4 m8-l1 m8-l2 m8-l3 m8-l4', 'L5': 'm9-l1 m9-l2 m9-l3 m9-l4 m10-l1', 'L6': 'm10-l2 m10-l3 m10-l4 m11-l1 m11-l2 m11-l3', 'L7': 'm12-l1 m12-l2 m12-l3 m12-l4 m13-l1 m13-l2 m13-l3'}
lek = {p: g for g, v in L.items() for p in v.split()}
jedn = [(f'apps/mobile/src/i18n/locales/{jez}.json', 'U')]
for f in sorted(glob.glob(f'{ROOT}/content/pl/**/*', recursive=True)):
    if not re.search(r'\.(md|ya?ml)$', f): continue
    r = os.path.relpath(f, f'{ROOT}/content/pl'); b = os.path.basename(r)
    g = lek['-'.join(b.split('-')[:2])] if r.startswith('lessons/') else ('X1' if int(b[1:-5]) <= 6 else 'X2') if r.startswith('exams/') else 'R1 (do R-M7) + R2 (od R-M8)' if b == 'rules.yaml' else 'U'
    jedn.append((f'content/{jez}/{r}', g))
jedn += [(f'content/{jez}/ranges/spots.yaml', 'U'), (f'content/{jez}/helplines.yaml', 'U'), (f'content/{jez}/terms-def.yaml', 'T')]
sklep = 'store/app-store-metadata.json (pt-BR)' if jez == 'pt-BR' else f'docs/sklep/aso/metadane-fala2.json ({"es-ES" if jez == "es" else jez})'
poza = [(f'content/{jez}/terms-nazwy.yaml', 'T'), (sklep, 'U')]
def sekcje(t):
    s, k = collections.OrderedDict(), None
    for l in t.split('\n'):
        if l.startswith('## '): k = l[3:].strip(); s[k] = []
        elif k: s[k].append(l)
    return {a: '\n'.join(b).strip() for a, b in s.items()}
czesci = {}
for f in sorted(glob.glob(f'{K}/{jez}/czesci/{jez}-*.md')):
    czesci[os.path.basename(f)[len(jez) + 1:-3]] = sekcje(open(f, encoding='utf-8').read())
def znajdz(s, n): return next((v for k, v in s.items() if k.lower().startswith(n.lower())), '')
wiersze = lambda g: [l for l in znajdz(czesci[g], 'Znaleziska').split('\n') if re.match(rf'\|\s*{re.escape(jez)}-{g}-\d+', l)]
def waga(l):
    c = l.split('|')[2].strip().strip('*').upper()
    return 'KRYT' if c.startswith('KRYT') else 'WYS' if c.startswith('WYS') else 'ŚR' if c.startswith('ŚR') else 'NISKIE'
pop = json.load(open(f'{K}/{jez}/poprawki-{jez}.json', encoding='utf-8'))
pg = collections.Counter(p['grupa'].split('-')[-1] for p in pop); pw = collections.Counter(p['waga'] for p in pop)
ORDER = [g for g in ['L1','L2','L3','L4','L5','L6','L7','R1','R2','X1','X2','U','T'] if g in czesci]
o = [f'# Pełny przegląd przekładu — {jez} — 2026-11-10 (sesja AQ, rola 09 audit, tylko dokumenty)', '',
     f'Stan przekładu: gałąź `claude/sleepy-brahmagupta-2065nu` @ 016317e. Źródło: pl (en pomocniczo). Czytający: {len(ORDER)} subagentów w świeżym kontekście (ten sam model co sesja), instrukcja `../instrukcja-subagenta.md`; 0 USD API, workflow `przeglad-tlumaczen.yml` nieuruchamiany. To drugi przegląd AI całości, nie przegląd rodzimego użytkownika języka.', '',
     '## Liczby', '', '| Część | Zakres | KRYT | WYS | ŚR | NISKIE | Znalezisk | Poprawek |', '|---|---|---|---|---|---|---|---|']
tot = collections.Counter()
for g in ORDER:
    c = collections.Counter(waga(l) for l in wiersze(g)); tot.update(c)
    zak = L.get(g) or {'R1': 'rules.yaml R-M0…R-M7', 'R2': 'rules.yaml R-M8…R-M13', 'X1': 'exams m0–m6', 'X2': 'exams m7–m13', 'U': 'interfejs, areas, modules, spots, helplines, metadane sklepu', 'T': 'terms-def, terms-nazwy'}[g]
    o.append(f'| {jez}-{g} | {zak} | {c["KRYT"]} | {c["WYS"]} | {c["ŚR"]} | {c["NISKIE"]} | {sum(c.values())} | {pg[g]} |')
if pg['S']: o.append(f'| {jez}-S | uzupełnienia koordynującego (wzorce czytających w miejscach nieobjętych; `uzupelnienia.tsv`) | – | – | – | – | – | {pg["S"]} |')
o += [f'| **Razem** | | **{tot["KRYT"]}** | **{tot["WYS"]}** | **{tot["ŚR"]}** | **{tot["NISKIE"]}** | **{sum(tot.values())}** | **{len(pop)}** |', '',
      f'Poprawki do nałożenia: `poprawki-{jez}.json` ({len(pop)}; wg wagi: {", ".join(f"{k} {v}" for k, v in pw.items())}) — format `docs/lokalizacja/narzedzia/poprawki.mjs` (jezyk, cel, stary, nowy, waga, powod, grupa); `stary` występuje w pliku `cel` dokładnie raz na stanie 016317e. Jedno znalezisko może mieć kilka poprawek (wzorzec rozpisany na wystąpienia), a jedna poprawka łączyć dwa znaleziska w tym samym fragmencie.', '']
dec = f'{K}/{jez}/decyzje.md'
if os.path.exists(dec): o += [open(dec, encoding='utf-8').read().strip(), '']
o += ['## Pokrycie jednostek (65 z `jednostki()` w `scripts/i18n/wspolne.mjs:147` + 2 poza listą)', '', '| Nr | Jednostka | Przejrzana w całości | Przez kogo |', '|---|---|---|---|']
for i, (j, g) in enumerate(jedn, 1): o.append(f'| {i} | `{j}` | tak | {jez}-{g} |')
for j, g in poza: o.append(f'| + | `{j}` | tak | {jez}-{g} |')
o += ['', f'Nieprzejrzane: brak (deklaracje pokrycia z zakresami linii: sekcja „Pokrycie” każdego pliku `czesci/{jez}-*.md`).', '', '## Znaleziska', '']
for g in ORDER:
    o += [f'### {jez}-{g}', '', '| Nr | Waga | plik:linia | Było | Ma być | Powód |', '|---|---|---|---|---|---|'] + (wiersze(g) or ['| – | – | – | – | – | brak znalezisk |']) + ['']
for n, t in (('Źródło', 'Błędy w źródle pl (bez poprawki; do roli 06)'), ('Do sprawdzenia', 'Do sprawdzenia (pewność ≤ 80%; pytania do człowieka znającego język albo decyzja globalna)'), ('Uwagi', 'Uwagi ogólne czytających')):
    o += [f'## {t}', '']
    for g in ORDER:
        x = znajdz(czesci[g], n)
        if x and not re.fullmatch(r'(?is)\W*(brak|nie stwierdzono|—|-)[^\n]{0,80}', x): o += [f'**{jez}-{g}**', '', x, '']
open(f'{K}/{jez}/znaleziska.md', 'w', encoding='utf-8').write('\n'.join(o) + '\n')
print(jez, dict(tot), 'znalezisk', sum(tot.values()), 'poprawek', len(pop), 'jednostek', len(jedn))
