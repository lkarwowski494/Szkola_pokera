"""Rola 06 E1b (2026-11-04): walidacja 24 liczb solvera projektu (rangePlay) według D-153.
Wyjście: docs/tresci/walidacja-solvera.json, czytane przez auto-rejestr.py (status, źródła, uwagi).
Kryterium D-153: (a) szczebel 2 — wartość solvera najwyżej 2 pp od przedziału opublikowanych rozwiązań (źródła podają
liczby zaokrąglone do 1 pp); (b) szczebel 1 — niezależny rachunek równowagi w tym samym modelu gry (nash_hu.py), różnica
najwyżej 1,5 pp; rachunek wygrywa ze szczeblem 2. Walidacja dotyczy łącznej częstości, nie składu zakresu (skład: listy
uncertain w content/ranges/spots.yaml, dokument 10). Wartości solvera: play.py (jak tools/content-build/src/ranges.ts)."""
import json
DZIS = '2026-11-04'
def bg(path, cytat, miejsce):
    return {'adres': f'https://beyondgto.com/{path}', 'miejsce': miejsce, 'cytat': cytat, 'odczyt': DZIS, 'szczebel': 2}
PS = 'https://www.pokerstrategy.com/strategy/sit-and-go/push-fold-play-nash-ranges/'
def ps(miejsce, cytat):
    return {'adres': PS, 'miejsce': miejsce, 'cytat': cytat, 'odczyt': DZIS, 'szczebel': 2}
AAMAS = 'https://www.cs.cmu.edu/~sandholm/3-player%20jam-fold.AAMAS08.pdf'
def gs(wiersz):
    return {'adres': AAMAS, 'miejsce': 'Ganzfried i Sandholm, AAMAS 2008, Table 2 (equal stacks s1 = s2 = s3 = 4500, SB = 300, BB = 600, czyli 7,5bb), kolumna „Single hand prob.”',
            'cytat': wiersz, 'odczyt': DZIS, 'szczebel': 2}
def calc(opis):
    return {'adres': 'rachunek: docs/tresci/narzedzia/e1b/nash_hu.py (fictitious play na tools/equity/equity169.json, bez kodu solvera)',
            'miejsce': 'docs/tresci/odczyty/e1b-solver-2026-11-04.txt', 'cytat': opis, 'odczyt': DZIS, 'szczebel': 1}
OK, NIE = 'potwierdzone', 'otwarte'
W = {}
def add(k, wartosc, status, zr, uwagi, upr=None):
    W[k] = {'status': status, 'wartosc_solvera_pct': wartosc, 'zrodla': zr, 'uwagi': uwagi, 'uproszczenie': upr, 'decyzja': 'D-153'}
UPR_RFI = 'zgodna łączna częstość otwarć; skład zakresu odbiega od opublikowanych tabel w klasach z listy uncertain-rfi (dokument 10, „Pomiary v3c”)'
add('solver.rfi.utg', 16.39, OK, [bg('ranges/lj-open-6max-100bb', 'The solver opens about 17% of hands here.', 'LJ Opening Range 6-Max (100bb); w 6-max pierwsza pozycja (UTG w aplikacji)')], 'zgodne: 0,6 pp od 17%', UPR_RFI)
add('solver.rfi.hj', 20.10, OK, [bg('ranges/hj-open-6max-100bb', 'The solver opens about 22% of hands here.', 'HJ Opening Range 6-Max (100bb)')], 'zgodne na granicy kryterium: 1,9 pp poniżej 22%', UPR_RFI)
add('solver.rfi.co', 27.34, OK, [bg('ranges/co-open-6max-100bb', 'The solver opens about 28% of hands here.', 'CO Opening Range 6-Max (100bb)')], 'zgodne: 0,7 pp', UPR_RFI)
add('solver.rfi.btn', 41.37, OK, [bg('ranges/btn-open-6max-100bb', 'The solver opens about 42% of hands here.', 'BTN Opening Range 6-Max (100bb)')], 'zgodne: 0,6 pp', UPR_RFI)
add('solver.rfi.sb', 42.34, OK, [bg('ranges/sb-open-6max-100bb', 'The solver opens about 44% of hands here.', 'SB Opening Range 6-Max (100bb)')], 'zgodne: 1,7 pp poniżej 44%; aplikacja: przebicie albo pas', UPR_RFI)
for k, v in (('solver9.rfi.utg', 10.90), ('solver9.rfi.utg1', 12.50), ('solver9.rfi.utg2', 13.22)):
    add(k, v, NIE, [], 'niezwalidowane: brak opublikowanego rozwiązania 9-max cash 100bb szczebla 2 (dokument 10, „Konfiguracja 9-max 100bb”: rozwiązania tylko w płatnych aplikacjach); walidacja częściowa N2 tylko wobec tabel szczebla 4. Nie do treści (D-148, D-153); E2: kierunek („węziej niż w 6-max”) albo przedział szczebla 4 z atrybucją po odczycie źródeł')
add('solver.def.bb-vs-btn', 49.61, NIE, [bg('defense/bb-vs-btn', 'Facing a 2.5bb open from the Button, GTO defends the Big Blind with about 45% of hands', 'BB vs BTN Defense (6-Max 100bb)')],
    'niezgodne: 4,6 pp powyżej 45% (drugie opublikowane rozwiązanie 40,5%, rejestr pf.bb-def.vs-btn.pub.low). Nie do treści; E2: m4-l2-obrona-bb.md:79 („na górnej granicy tego przedziału” jest fałszywe — solver jest powyżej) i rules.yaml:240 bez liczby solvera')
add('solver.def.bb-vs-sb', 53.04, NIE, [bg('defense/bb-vs-sb', 'Facing a 3bb open from the Small Blind, GTO defends the Big Blind with about 56% of hands', 'BB vs SB Defense (6-Max 100bb)')],
    'niezgodne: 3,0 pp poniżej 56% (kryterium 2 pp). Nie do treści; E2: m4-l2-obrona-bb.md:89 i rules.yaml:323 tylko z liczbą opublikowaną pf.bb-def.vs-sb.pub')
add('solver.3bet.sb-vs-btn', 14.14, OK, [bg('defense/sb-vs-btn', 'Facing a 2.5bb open from the Button, GTO defends the Small Blind with about 18% of hands — roughly 5% as a flat call and 13% as a 3-bet.', 'SB vs BTN Defense (6-Max 100bb)')],
    'zgodne: 1,1 pp od 13%; 14% z serwisu komercyjnego solvera (Crush 3-Bet Pots OOP) jest tylko na grafice, niesprawdzone dosłownie', 'siatka „3-bet / pas” (B-045): solver projektu prawie nie sprawdza (0,5%), źródło sprawdza 5%')
PSDEF = ps('Basics, „Effective stack”', 'It refers to the size of the smaller of the two stacks before the blinds (and antes) are posted')
T1 = {5: '5 74.1%: 22+, Jx+, T2s+, T5o+', 10: '10 56.6%: 22+, Kx+, Q2s+, Q7o+', 15: '15 45.7%: 22+, Ax+, K2s+, K6o+'}
T1C = {5: '68.6%: 22+, Qx+, J2s+, J3o+', 10: '38.5%: 22+, Ax+, K2s+, K6o+', 15: '28.4%: 33+, Ax+, K7s+, K9o+'}
def t1(es, npr, ncr):
    return ps(f'Table 1 (without ante), ES = {es}: NPR {npr}%, NCR {ncr}%', f'{T1[es]} … {T1C[es]}')
add('m11.push.5', 72.55, OK, [t1(5, '74.1', '68.6'), PSDEF, calc('S=5: push 71,50% (15000 iteracji)')], 'zgodne z tabelą (1,6 pp) i z rachunkiem (1,05 pp)')
add('m11.push.10', 58.37, OK, [t1(10, '56.6', '38.5'), calc('S=10: push 58,29%')], 'zgodne z tabelą (1,8 pp) i z rachunkiem (0,1 pp); dokument 10: 55–61%')
add('m11.push.15', 45.51, OK, [t1(15, '45.7', '28.4'), calc('S=15: push 45,66%')], 'zgodne: 0,2 pp')
add('m11.call.5', 62.29, OK, [calc('S=5: call 62,04%; najlepsza odpowiedź BB na zakres pushu z tabeli PokerStrategy (74,1%) = 61,99% sprawdzeń (br_check.py)')],
    'rachunek (szczebel 1) wygrywa ze szczeblem 2: wiersz ES = 5 tabeli PokerStrategy (NCR 68,6%, lista rąk daje 68,63% kombinacji) nie jest najlepszą odpowiedzią na NPR tego samego wiersza w modelu z definicji strony; przy ES = 10 i 15 tabela zgadza się z rachunkiem. Zmienia D-148 dla tej liczby (do weta)')
add('m11.call.10', 37.56, OK, [t1(10, '56.6', '38.5'), calc('S=10: call 37,38%')], 'zgodne z tabelą (0,9 pp) i z rachunkiem; dokument 10: 34,5–40,5%')
add('m11.call.15', 28.24, OK, [t1(15, '45.7', '28.4'), calc('S=15: call 28,56%')], 'zgodne: 0,2 pp')
add('m11.push.10-ante', 71.65, OK, [calc('S=10, big blind ante 1bb (martwe, wpłacone przez BB ponad stack, tools/preflop-solver/src/pushfold.ts:6): push 71,05%')],
    'zgodne z rachunkiem (0,6 pp) w modelu z big blind ante 1bb; tabela PokerStrategy z ante (10% BB od każdego gracza) to inna struktura: 60,8% — kierunek ten sam. Tekst musi nazwać strukturę (BB ante 1bb). Zmienia D-148 dla tej liczby (do weta)')
add('m11.call.10-ante', 53.47, OK, [calc('S=10, big blind ante 1bb: call 53,25%')], 'zgodne z rachunkiem (0,2 pp); struktura jak wyżej')
add('m11.3max.push.btn', 35.76, OK, [gs('Button jam 0.376 0.355')], 'zgodne: 0,3 pp od 35,5%')
add('m11.3max.push.sb', 64.46, OK, [gs('SB jam after fold 0.652 0.633')], 'zgodne: 1,2 pp od 63,3%')
add('m11.3max.call.sb', 23.86, OK, [gs('SB jam after jam 0.088 0.234')], 'zgodne: 0,5 pp od 23,4%')
add('m11.3max.call.bb', 30.67, OK, [gs('BB jam after jam/fold 0.145 0.308')], 'zgodne: 0,1 pp od 30,8%')
add('m11.3max.call.bb-two', 20.55, OK, [gs('BB jam after jam/jam 0.021 0.197')], 'zgodne: 0,9 pp od 19,7%')
UPR3 = 'artykuł podaje prawdopodobieństwo akcji przy grze obu strategii (warunkowe na dojście do węzła, z blokerami); solver projektu: udział kombinacji wszystkich rąk; różnica mieści się w kryterium'
for k in [k for k in W if k.startswith('m11.3max')]: W[k]['uproszczenie'] = UPR3
assert len(W) == 24
json.dump(W, open('docs/tresci/walidacja-solvera.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(sum(v['status'] == OK for v in W.values()), 'potwierdzone,', sum(v['status'] != OK for v in W.values()), 'otwarte')
