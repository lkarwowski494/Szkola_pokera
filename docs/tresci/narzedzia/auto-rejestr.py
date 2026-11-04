"""Rola 06 E1: wpisy rejestru dla liczb, które są rachunkiem albo danymi zadania (nie twierdzeniem).
Wejście: content/numbers.yaml. Wyjście: docs/tresci/rejestr/auto.json (twierdzenia) i docs/tresci/rejestr/bez-twierdzen.json.
Liczby z formułą: rachunek, szczebel 1, potwierdzone niezależnym przeliczeniem (rachunek_niezalezny.py, kod 0, 2026-11-04).
rangePlay: dane solvera projektu, status z walidacji spotu (walidacja-solvera.json, E1b, D-153; brak wpisu = otwarte). flopWetnessShare: rachunek na definicji
tekstury aplikacji (uproszczenie nazwane). Wartości ze źródłem „przykład…”: dane zadania, nie twierdzenie (jak bezTwierdzenia w Treningu)."""
import json, sys, yaml
# E3 2026-11-04 (21. sesja): od E3 auto.json jest utrzymywany ręcznie (poprawki z werdyktów, wpisy „wycofane” z następcą,
# nowe klucze). Ponowne uruchomienie nadpisałoby te zmiany, więc skrypt zatrzymuje się bez flagi --nadpisz.
if '--nadpisz' not in sys.argv:
    sys.exit('auto-rejestr.py: auto.json jest od E3 utrzymywany ręcznie; uruchomienie nadpisze poprawki E3. Świadomie: --nadpisz, potem porównaj git diff.')
num = yaml.safe_load(open('content/numbers.yaml', encoding='utf-8'))
DZIS = '2026-11-04'; DOWOD = 'docs/tresci/odczyty/rachunek-2026-11-04.txt'
tw, bez = [], []
WALIDACJA = json.load(open('docs/tresci/walidacja-solvera.json', encoding='utf-8'))
# Parametry produktowe (D-145): wartości decyzji projektu, nie twierdzenia o świecie; tekst musi je nazywać ustawieniem aplikacji.
PARAMETRY = {'format.stack': 'parametr produktowy: format główny cash 6-max 100bb (ADR-01 rejestru 03)',
  'range.mixed.low': 'parametr produktowy L = 0,25 (RD-11, ADR-26 rejestru 03); źródło S-06 go nie zna',
  'range.mixed.high': 'parametr produktowy (RD-11, ADR-26 rejestru 03)',
  'game.recall.count': 'parametr produktowy: wartość startowa bez źródła (D-M13-13, dokument 12)',
  'game.recall.days': 'parametr produktowy: wartość startowa bez źródła (D-M13-13, dokument 12)'}
def wpis(k, e, zr, status='potwierdzone', upr=None, uwagi=''):
    return {'id': f'n:{k}', 'rodzaj': 'liczba', 'level': 'math', 'twierdzenie': f"{k} = {e.get('value', '(formuła ' + str(e.get('formula')) + ')')} [{e.get('unit')}]; {e.get('source', '')}",
            'zrodla': zr, 'status': status, 'uproszczenie': upr, 'krytyczne': False, 'przeglad': None,
            'wielkosc': k, 'wartosc': e.get('value'), 'jednostka': e.get('unit'), 'werdykt_tekstu': 'POPARTE' if status == 'potwierdzone' else None, 'poprawka': None, 'uwagi': uwagi}
for k, e in num.items():
    f, src = e.get('formula'), (e.get('source') or '')
    if f == 'rangePlay':
        v = WALIDACJA.get(k)  # E1b, D-153: walidacja spotu (narzedzia/e1b/walidacja.py)
        if v is None:
            tw.append(wpis(k, e, [], 'otwarte', uwagi=f"dane solvera projektu, spot {e.get('spot')}: szczebel 2 tylko po walidacji (dokument 10, ADR-24)"))
        else:
            w = wpis(k, e, v['zrodla'], v['status'], upr=v['uproszczenie'], uwagi=f"solver projektu, spot {e.get('spot')}, wartość {v['wartosc_solvera_pct']}%: {v['uwagi']}")
            w['wartosc'] = round(v['wartosc_solvera_pct'] / 100, 4); w['decyzja'] = v['decyzja']
            if v['status'] != 'potwierdzone': w['werdykt_tekstu'] = None
            tw.append(w)
    elif f == 'flopWetnessShare':
        tw.append(wpis(k, e, [{'adres': 'rachunek: wyliczenie wszystkich 22 100 flopów według klasyfikacji tekstur aplikacji (poker-core texture.ts)', 'miejsce': 'packages/poker-core/src/texture.ts flopWetnessShares', 'cytat': 'udział flopów danej klasy = liczba flopów klasy / 22 100', 'odczyt': DZIS, 'szczebel': 1}],
                       upr='klasa tekstury (suchy, średni, mokry) to definicja aplikacji; liczba zależy od tej definicji'))
    elif f:
        tw.append(wpis(k, e, [{'adres': f"rachunek: {f}({', '.join(e.get('refs', []) or map(str, e.get('args', [])))})", 'miejsce': DOWOD, 'cytat': 'przeliczone niezależnie w Pythonie z definicji wzoru; 0 rozbieżności z content-build', 'odczyt': DZIS, 'szczebel': 1}]))
    elif src.startswith(('obliczenie', 'kombinatoryka', 'zasady', 'definicja')):
        tw.append(wpis(k, e, [{'adres': f'rachunek: {src}', 'miejsce': 'content/numbers.yaml', 'cytat': src[:250], 'odczyt': DZIS, 'szczebel': 1}],
                       uwagi='zasady gry: regulamin potwierdza partia M0–M4 (Robert\'s Rules, TDA)' if src.startswith('zasady') else ''))
    elif k in PARAMETRY:
        bez.append({'klucz': k, 'wartosc': e.get('value'), 'jednostka': e.get('unit'), 'powod': PARAMETRY[k], 'source': src[:120]})
    elif src.startswith(('stała pomocnicza', 'liczba ulic')):
        bez.append({'klucz': k, 'wartosc': e.get('value'), 'jednostka': e.get('unit'), 'powod': 'stała pomocnicza rachunku albo definicja zadania, nie twierdzenie', 'source': src[:120]})
    elif src.startswith('przykład'):
        bez.append({'klucz': k, 'wartosc': e.get('value'), 'jednostka': e.get('unit'), 'powod': 'dane zadania (przykład), nie twierdzenie o świecie', 'source': src[:120]})
json.dump(tw, open('docs/tresci/rejestr/auto.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(bez, open('docs/tresci/rejestr/bez-twierdzen.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
from collections import Counter
print(len(tw), Counter(t['status'] for t in tw), 'bez twierdzeń:', len(bez))
