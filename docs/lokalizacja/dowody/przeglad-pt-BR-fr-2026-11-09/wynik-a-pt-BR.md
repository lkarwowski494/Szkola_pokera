# Kontrola (a) treści krytycznej, moduł 12: pl → pt-BR

Data: 2026-11-09

## Co porównano
- Źródło pl (<scratchpad>/ka/pl/, 7 plików: m12-l1-wariancja.md, m12-l4-bankroll.md, exams-m12.yaml, helplines.yaml, rules-R-M12-009-011.yaml, terms-def-wybrane.yaml, ui-wybrane.json) z przekładem zwrotnym na polski wykonanym bez dostępu do źródła (<scratchpad>/kz/pt-BR/), zdanie po zdaniu: zalecenia, ostrzeżenia, granice (najpóźniej/najwcześniej/co najmniej/ponad/najwyżej), liczby i klucze {{n:…}}, przeczenia, stopień pewności, nazwy i linki pomocy, teksty płatności i usuwania/zastępowania danych.
- Każde wątpliwe miejsce (w tym znaczniki [NIEJASNE] przekładu zwrotnego) rozstrzygnięto na oryginale <scratchpad>/ka/pt-BR/ i na pliku pełnym <scratchpad>/tl/content/pt-BR/… / <scratchpad>/tl/ui/pt-BR.json.

## Kontrola automatyczna (node, <scratchpad>/pr/A-tmp/kontrola.mjs, <scratchpad>/ka/pl vs <scratchpad>/ka/pt-BR)
- Multizbiór {{n:…}}: zgodny w każdym pliku i w każdym drillu (segmentacja po id) — 0 różnic.
- {{helplines}}: 1 = 1 (m12-l4). Parametry {{…}} UI ({{data}}, {{phone}}, {{name}}, {{label}}, {{host}}, {{target}}): zgodne.
- URL: helplines.yaml zgodne (gamblingtherapy.org ×4). terms-def-wybrane.yaml: „brak” 3 URL w pt-BR to artefakt formatu (wyciąg pt-BR zawiera tylko pole `def`, URL są w polu `source` pliku pl, nie w tekście) — nie różnica.
- `claim`: H-INT-2, H-INT-1 — zgodne. Nazwy organizacji: „Gambling Therapy (Gordon Moody)”, „Gambling Therapy”, „Apple” — zgodne.
- {{t:…}} (ostrzeżenie): m12-l1 q-dd-meaning: brak 2× {{t:call}} — źródło używa terminu „call” w znaczeniu „sprawdzasz decyzje”; pt-BR „revise suas decisões” oddaje sens poprawnie (zgodne, bez poprawki).

## Wyniki

| # | Sekcja (plik, wpis/fragment) | Wynik (zgodne/różnica) | Opis różnicy | Proponowany poprawiony tekst (dokładny fragment do zastąpienia i nowy) | Waga |
|---|---|---|---|---|---|
| 1 | m12-l1, treść lekcji (winrate, SD, przedziały, ile rąk, tabela downswingów, nota „Skąd te liczby”, zdanie o „Pomoc”) | zgodne | — | — | — |
| 2 | m12-l1, drille n-expected … q-sd-typical | zgodne | q-dd-wr-low „mais da metade das amostras” = „częściej niż w co drugiej próbce”; q-dd-meaning bez {{t:call}} — sens zachowany | — | — |
| 3 | m12-l4, „Quando descer de limite”: „desça um limite no máximo quando o bankroll cair para a metade” | różnica | Źródło: „najpóźniej wtedy”. „no máximo” = „najwyżej/maksymalnie” — granica dwuznaczna w treści krytycznej (bankroll); reguła R-M12-011 pt-BR ma poprawne „no mais tardar” | stary: `desça um {{t:stakes|limite}} no máximo quando o bankroll cair` → nowy: `desça um {{t:stakes|limite}} no mais tardar quando o bankroll cair` | WYSOKIE |
| 4 | m12-l4, reszta sekcji: „Volte a subir só quando…”, „descer antes do patamar da metade não é erro”, „a metade é o mais tardio” | zgodne | „só quando” = „najwcześniej wtedy” | — | — |
| 5 | m12-l4, RoR: definicja, wzór, tabela, „Od czego zależy ryzyko” | zgodne | — | — | — |
| 6 | m12-l4, drille q-ror-base, q-ror-winrate, q-unknown-wr, q-move-down, q-stay, q-move-up, q-losing, q-study-* | zgodne | q-stay „teto de risco” (sufit ryzyka) = „granica ryzyka”; sens zgodny | — | — |
| 7 | m12-l4, q-warning-sign, why poprawnej: „use os contatos do cartão sobre jogo responsável” | różnica | Odesłanie do pomocy: „cartão” brzmi jak fizyczna karta, nie wskazuje jednoznacznie ramki „Jogo responsável” w lekcji | stary: `use os contatos do cartão sobre jogo responsável.` → nowy: `use os contatos do quadro “Jogo responsável”.` | ŚREDNIE |
| 8 | m12-l4, ramka „Jogo responsável” (sygnały, {{helplines}}) | zgodne | — | — | — |
| 9 | exams-m12, q1–q10 | zgodne | q8 „se você nunca descer de limite”, q9 „desce no mais tardar”, q10 „dois/duas vezes” — zgodne | — | — |
| 10 | helplines.yaml: pointer, fallback.text (lekarz/specjalista, numer alarmowy, myśli samobójcze), entry info, links, sources | zgodne | — | — | — |
| 11 | rules R-M12-009, R-M12-011 (if/then/because/source) | zgodne | „no mais tardar”, „só volta quando” — granice zgodne | — | — |
| 12 | terms-def: bankroll | zgodne | — | — | — |
| 13 | terms-def: risk-of-ruin „se continuar jogando nos mesmos stakes” | różnica | Angielskie „stakes” zamiast terminu „limite” używanego w lekcji i regułach; sens zachowany, terminologia niespójna | stary: `se continuar jogando nos mesmos stakes.` → nowy: `se continuar jogando no mesmo limite.` | ŚREDNIE |
| 14 | UI purchase: unlocks, renewsQuarter/Year, oneTime, cancelInfo, pending, failed, restore* | zgodne | — | — | — |
| 15 | UI purchase.terms „Termos de Uso” | różnica | Pominięty dopisek „(Terms of Use)” ze źródła (fr go zachowuje) | stary: `"terms": "Termos de Uso"` → nowy: `"terms": "Termos de Uso (Terms of Use)"` | NISKIE |
| 16 | UI data: intro, replaceBody (nieodwracalność), badFile, newerVersion, imported, importFailed | zgodne | — | — | — |
| 17 | UI help: link, intro, call, callA11y, openA11y, openFailed | zgodne | — | — | — |

Poprawki do nałożenia: <scratchpad>/pr/A-pt-BR.json (grupa „A-pt-BR”, 4 poprawki); `node <scratchpad>/skrypty/sprawdz-poprawki.mjs <scratchpad>/pr/A-pt-BR.json` → „poprawek 4, błędnych 0”.

## Werdykt: zaliczona
Wszystkie różnice sensu WYS/ŚR mają propozycję naprawy w A-pt-BR.json (warunek: nałożyć poprawki).
Liczby: KRYTYCZNE 0, WYSOKIE 1, ŚREDNIE 2, NISKIE 1; poprawek w JSON 4.
