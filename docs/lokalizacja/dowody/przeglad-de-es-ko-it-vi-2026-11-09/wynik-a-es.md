# Kontrola (a) treści krytycznej, moduł 12: pl → es

Data: 2026-11-09

## Co porównano
- Źródło pl (<scratchpad>/ka/pl/: m12-l1-wariancja.md, rules-R-M12.yaml — reguły R-M12-001…009, 011, 012) z przekładem zwrotnym na polski wykonanym bez dostępu do źródła (<scratchpad>/kz/es/), zdanie po zdaniu: zalecenia, ostrzeżenia, granice (najpóźniej/najwcześniej/co najmniej/ponad/najwyżej), liczby i klucze {{n:…}}, przeczenia, stopień pewności („zwykle”, „ok.”, „przybliżenie”), poprawne odpowiedzi (correct) i ich uzasadnienia.
- Każde wątpliwe miejsce (w tym znaczniki [NIEJASNE] przekładu zwrotnego) rozstrzygnięto na oryginale <scratchpad>/ka/es/. Wyciągi ka/es są tożsame z plikami pełnymi: lekcja identyczna bajtowo z <scratchpad>/tl/content/es/lessons/m12-l1-wariancja.md, wyciąg reguł występuje dosłownie w <scratchpad>/tl/content/es/rules.yaml.

## Kontrola automatyczna (python, <scratchpad>/pr/A/kontrola-de-es.py, <scratchpad>/ka/pl vs <scratchpad>/ka/es)
- Multizbiór {{n:…}}: lekcja 188 = 188, reguły 43 = 43; zgodny w każdym segmencie (11 drilli + nagłówek + treść lekcji; 11 reguł) — 0 różnic.
- Multizbiór {{t:<id>}}: lekcja 75 = 75, reguły 19 = 19 — zgodny per segment.
- Liczby wpisane cyfrą (100, 2 z 3, 6-max, 1,96 × 80 ÷ 2, 615, 3bb/100, 30, 10, lata źródeł): lekcja 17 = 17, reguły 24 = 24 — zgodne per segment.

## Wyniki

| # | Sekcja (plik, wpis/fragment) | Wynik (zgodne/różnica) | Opis różnicy | Proponowany poprawiony tekst | Waga |
|---|---|---|---|---|---|
| 1 | m12-l1, nagłówek (title, sub) | zgodne | „Wariancja w liczbach” — sub „Co mówi” vs „Ile mówi”: odcień, bez zmiany sensu | — | — |
| 2 | m12-l1, treść lekcji: winrate „zwykle” {{n:var.wr.typical.*}}, SD „zwykle” + wartość typowa, wzory, przykład ({{n:var.p.lose}}), błąd winrate, ile rąk, tabela downswingów, nota „Skąd te liczby” („nieco głębsze… nie dowodzi, że grasz źle”), zdanie o ekranie „Pomoc” | zgodne | stopnie pewności („zwykle”, „ok.”, „bywają”) zachowane; przeczenie w nocie zachowane | — | — |
| 3 | m12-l1, n-expected, q-sd-result, q-ci95, n-se | zgodne | correct i uzasadnienia (pierwiastek z liczby bloków, ±{{n:var.z95}}, „ok. 2 z 3 wyników”) zgodne | — | — |
| 4 | m12-l1, q-winrate-ci, q-hands-needed | zgodne | „raczej nie przegrywasz” zachowane jako niepewność; „sto razy więcej” zgodne | — | — |
| 5 | m12-l1, q-dd-100k | zgodne | granica „co najmniej {{n:dd.bi.small}}” = «de al menos {{n:dd.bi.small}}»; correct „Prawie zawsze” zgodne | — | — |
| 6 | m12-l1, q-dd-wr-low, why poprawnej: „częściej niż w co drugiej próbce” | zgodne | oryginał: «en más de la mitad de las muestras» | — | — |
| 7 | m12-l1, q-dd-wr-low, why opcji 2 | zgodne | [NIEJASNE] przekładu zwrotnego rozstrzygnięty na oryginale: «lo rápido que el resultado se aleja de ellas» — ta sama metafora co pl „jak szybko wynik od nich ucieka” (wynik oddala się od strefy wahań); sens identyczny, liczby {{n:dd.p.big.100k*}} przypisane do właściwych graczy | — | — |
| 8 | m12-l1, q-dd-meaning | zgodne | correct „Sam downswing niczego nie przesądza; przeglądasz decyzje” — oryginał «El {{t:downswing}} por sí solo no demuestra nada» oddaje sens (downswing nie rozstrzyga o jakości gry); dystraktory i ich why zgodne | — | — |
| 9 | m12-l1, q-sd-typical | zgodne | — | — | — |
| 10 | rules R-M12-001, 003 (level math) | zgodne | wzory, „ok.”, „setki tysięcy rąk” zgodne | — | — |
| 11 | rules R-M12-002, 004, 005 | zgodne | przeczenie „nie traktujesz go jako dowodu złej gry”, „dopiero po przeglądzie… a nie na podstawie samego wyniku”, „nawet gdy wiedzą, że nie powinni” zachowane | — | — |
| 12 | rules R-M12-006, 007, 008 | zgodne | „od razu”, „zanim stracisz zdolność jasnego myślenia”, „a nie od szlifowania najlepszych” zgodne | — | — |
| 13 | rules R-M12-009 | zgodne | „to przybliżenie przy stałym winrate i SD” zachowane | — | — |
| 14 | rules R-M12-011 if/then/because | zgodne | granice: oryginał «como muy tarde en ese momento, y vuelves a subir como muy pronto» — kolejność „najpóźniej… / najwcześniej…” zgodna z pl | — | — |
| 15 | rules R-M12-011 source: „przy 3bb/100 zejście przy 30 wpisowych, czyli przy pełnym bankrollu” | zgodne | [NIEJASNE] przekładu zwrotnego dotyczy treści samego źródła pl (to sformułowanie jest w pl; w cytowanym źródle 30 wpisowych to pełny bankroll dla 3bb/100), przekład oddaje je wiernie; pole źródła, nie zalecenie | — | — |
| 16 | rules R-M12-012 | zgodne | „nigdy mniej niż {{n:study.min}}” zachowane | — | — |

Poprawki do nałożenia: brak (plik poprawki-A-es.json nie powstał, bo nie ma czego poprawiać).

## Werdykt: zaliczona
Brak różnic sensu.
Liczby: KRYTYCZNE 0, WYSOKIE 0, ŚREDNIE 0, NISKIE 0; poprawek w JSON 0.
