# Rola 06 E1b: walidacja 24 liczb solvera projektu (2026-11-04, osiemnasta sesja)

Wejście: 24 wpisy `rangePlay` ze statusem „otwarte” (`docs/tresci/rejestr/auto.json`, D-148). Wyjście: `docs/tresci/walidacja-solvera.json` (generuje `narzedzia/e1b/walidacja.py`, czyta `auto-rejestr.py`), dowody `odczyty/e1b-solver-2026-11-04.txt` i `odczyty/e1b.tsv`. Decyzja D-153.

## 1. Wynik
- **19 potwierdzonych, 5 otwartych.** Rejestr: 1042 twierdzenia, 1012 potwierdzonych, 18 otwartych, 12 sprzecznych (w E1: 993 / 37 / 12).
- `node docs/tresci/narzedzia/scal-rejestr.mjs --przed-przegladem` → **kod 0**, 0 błędów, 46 uwag (te same co w E1: twierdzenia krytyczne czekają na przegląd zastępczy w E3).
- Cytaty: 13 źródeł pobranych `curl` dzisiaj (HTTP 200), każdy cytat znaleziony dosłownie na surowym tekście (0 braków); PDF przez `pdftotext -layout`.

## 2. Kryterium (D-153, ustalone przed porównaniem)
- Szczebel 2: wartość solvera najwyżej 2 pp od przedziału opublikowanych rozwiązań (źródła podają liczby zaokrąglone do 1 pp).
- Szczebel 1: niezależny rachunek równowagi w tym samym modelu gry (`narzedzia/e1b/nash_hu.py`, fictitious play na macierzy equity 169×169, bez kodu solvera), różnica najwyżej 1,5 pp. Rachunek wygrywa ze szczeblem 2 (hierarchia w `CLAUDE.md`).
- Walidacja dotyczy łącznej częstości, nie składu zakresu. Skład zostaje opisany listami `uncertain` w `content/ranges/spots.yaml` (dokument 10, „Pomiary v3c”).
- Dokument 10 na Dysku to nasz zapis pomiarów i kryteriów (K1–K5, N1–N5), nie źródło: posłużył do znalezienia celów; każda liczba porównana ze stroną źródła przeczytaną dzisiaj.

## 3. Tabela
| Liczba | Solver | Źródło (szczebel) | Wartość źródła | Werdykt |
|---|---|---|---|---|
| solver.rfi.utg | 16,39% | BeyondGTO LJ open 6-max (2) | ok. 17% | zgodne |
| solver.rfi.hj | 20,10% | BeyondGTO HJ open (2) | ok. 22% | zgodne, 1,9 pp — na granicy |
| solver.rfi.co | 27,34% | BeyondGTO CO open (2) | ok. 28% | zgodne |
| solver.rfi.btn | 41,37% | BeyondGTO BTN open (2) | ok. 42% | zgodne |
| solver.rfi.sb | 42,34% | BeyondGTO SB open (2) | ok. 44% | zgodne |
| solver9.rfi.utg / utg1 / utg2 | 10,90 / 12,50 / 13,22% | brak szczebla 2 (dokument 10: rozwiązania 9-max cash tylko w płatnych aplikacjach) | — | **otwarte** |
| solver.def.bb-vs-btn | 49,61% | BeyondGTO BB vs BTN (2); drugie rozwiązanie 40,5% (rejestr) | ok. 45% | **niezgodne**, 4,6 pp powyżej |
| solver.def.bb-vs-sb | 53,04% | BeyondGTO BB vs SB (2) | ok. 56% | **niezgodne**, 3,0 pp poniżej |
| solver.3bet.sb-vs-btn | 14,14% | BeyondGTO SB vs BTN (2) | ok. 13% | zgodne |
| m11.push.5 / 10 / 15 | 72,55 / 58,37 / 45,51% | PokerStrategy, tabela Nasha 1 (2); rachunek (1) | 74,1 / 56,6 / 45,7%; rachunek 71,50 / 58,29 / 45,66% | zgodne |
| m11.call.5 | 62,29% | rachunek (1); PokerStrategy (2) 68,6% | rachunek 62,04% | zgodne z rachunkiem (pkt 4) |
| m11.call.10 / 15 | 37,56 / 28,24% | PokerStrategy (2); rachunek (1) | 38,5 / 28,4%; rachunek 37,38 / 28,56% | zgodne |
| m11.push.10-ante / call.10-ante | 71,65 / 53,47% | rachunek (1), big blind ante 1bb | 71,05 / 53,25% | zgodne (pkt 5) |
| m11.3max.push.btn / push.sb | 35,76 / 64,46% | Ganzfried i Sandholm, AAMAS 2008, tabela 2, „Single hand” (2) | 35,5 / 63,3% | zgodne |
| m11.3max.call.sb / call.bb / call.bb-two | 23,86 / 30,67 / 20,55% | jw. | 23,4 / 30,8 / 19,7% | zgodne |

## 4. Rozbieżność przy 5bb (m11.call.5)
Wiersz ES = 5 tabeli PokerStrategy podaje sprawdzenie 68,6% (lista rąk z tej samej komórki daje 68,63% kombinacji, więc to nie literówka procentu). W modelu z definicji strony (stack przed wpłatą blindów, bez ante) najlepsza odpowiedź dużego blinda na zakres pushu z tego samego wiersza (74,1%) to **61,99%** sprawdzeń (`br_check.py`), a równowaga liczona niezależnie daje 62,04%. Przy ES = 10 i 15 tabela zgadza się z rachunkiem (do 1,8 pp). Wniosek: wiersz 5bb tabeli nie jest równowagą w opisanym modelu; rachunek (szczebel 1) wygrywa, liczba solvera 62,29% jest potwierdzona. Zastrzeżenie: rachunek i solver korzystają z tej samej macierzy equity (`tools/equity/equity169.json`); macierz ma osobną walidację (dokument 10: wartości referencyjne do trzeciego miejsca po przecinku), a zgodność z tabelą przy 10 i 15bb ją potwierdza.

## 5. Wariant z ante
Solver modeluje big blind ante 1bb: martwe pieniądze wpłacone przez dużego blinda ponad stack 10bb (`tools/preflop-solver/src/pushfold.ts:6`). Rachunek w tym samym modelu: 71,05% / 53,25%. Tabela PokerStrategy z ante ma inną strukturę (ante 10% BB od każdego gracza, 60,8% pushu), więc nie służy do walidacji liczby, tylko kierunku (z ante szerzej). Tekst lekcji musi nazwać strukturę (big blind ante 1bb).

## 6. Do E2 (treść)
- `m4-l2-obrona-bb.md:79`: zdanie „solver aplikacji jest na górnej granicy tego przedziału” jest SPRZECZNE (49,6% jest powyżej 40–45%). Poprawka: bez liczby solvera, liczba opublikowana z atrybucją; jeśli zostaje zdanie o solverze aplikacji, to „broni szerzej niż opublikowane rozwiązania”.
- `m4-l2-obrona-bb.md:89`, `rules.yaml:240`, `rules.yaml:323`: bez `solver.def.*`, tylko `pf.bb-def.vs-btn.pub.*` i `pf.bb-def.vs-sb.pub`.
- `m3-l3-zakresy-otwarc.md:80` i `rules.yaml:202` (R-M3-010): bez `solver9.*`; kierunek („węziej niż przy stole 6-osobowym”) albo przedział szczebla 4 z atrybucją po odczycie źródeł.
- `m11-l1-push-fold.md:90–92, :174`, `m11-l2-sprawdzanie.md:86, :168`: liczby z ante mogą zostać (D-153 zmienia D-148), z nazwaną strukturą „big blind ante 1bb”.
- `m11-l2-sprawdzanie.md:150`, `exams/m11.yaml:50–51`: `m11.call.5` może zostać (D-153 zmienia D-148).
- Klucze `solver.def.*` i `solver9.*` usunięte z `numbers.yaml` w E2 (po poprawkach tekstu nieużywane; siatki i boty czytają spoty z `content/ranges/`, nie te klucze); wynik walidacji zostaje w `walidacja-solvera.json`. Strażnik powiązań w `content-build` blokuje użycie w tekście liczby, której wpis nie jest „potwierdzony”.

## 7. Otwarte
- Siatki BB vs BTN i BB vs SB (częstości solvera, łączna obrona poza kryterium; zgodność „gram / pas” z BeyondGTO 89,7% i 91,3%, dokument 10): **zostają** z dopiskiem w lekcji, że solver aplikacji broni szerzej (BB vs BTN) i węziej (BB vs SB) niż opublikowane rozwiązania; liczba łączna w tekście tylko z opublikowanego źródła. Decyzja agenta w D-153 (delegacja z `CLAUDE.md`, do weta); odrzucone: ukrycie siatek do poprawy modelu (traci ćwiczenie, w którym 9 na 10 rąk zgadza się ze źródłem), pokazywanie bez dopisku.
- 9-max: walidacja szczebla 2 możliwa dopiero, gdy pojawi się opublikowane rozwiązanie 9-max cash 100bb.
