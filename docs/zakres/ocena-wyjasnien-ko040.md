# Ocena wyjaśnień pl według KO-040 (wejście dla roli 06)
Stan: 2026-11-10 · Rola 03 build, sesja BD, zadanie 3 · Commit wejścia: 00b0566 · Bez zmian w treści

Zasada właściciela (KO-040): wyjaśnienie „dlaczego dobrze / dlaczego źle” na intuicję — „jak mam to i to i taką pozycję i taką sytuacją na stole to gram to bo…”, a nie „tabelka prawdopodobieństwa i … dlatego że tak jest w liczbach”. Wymaganie: BR-OCE-001–003 (`docs/brd/wymagania-scenariusze.md`).

## Metoda
- Próbka 41 wyjaśnień, z czego 40 w skali (słownictwo poza skalą): 16 z generatorów (`apps/mobile/src/features/drills/engine.ts`, teksty `apps/mobile/src/i18n/locales/pl.json` klucze `drill.*`, linie 658–940), 24 z lekcji, egzaminów i reguł (`content/pl/`). Wartości w szablonach tekstu wstawione przykładowo z `content/numbers.yaml`.
- Klasy: **A** intuicja od sytuacji (ręka, pozycja, stół, akcja rywala → zagranie → „bo” słowami; liczba najwyżej dodatkiem); **B** mieszane (sens jest, ale wyjaśnienie zaczyna się od liczby albo wzoru, albo liczba bez przełożenia); **C** „tabelka / bo tak w liczbach” (próg, procent, częstość solvera zamiast powodu).
- Próbka celowo przesunięta ku modułom rachunkowym (M2, M6–M9, M11), więc odsetek C to raczej górna granica. Pomiar pomocniczy (automatyczny, bez czytania): w 1304 tekstach `why`/`explanation` w `content/pl/lessons` i `content/pl/exams` jawny rachunek (÷, ×, „= {{n:…}}”) ma ok. 134 (10%), a ok. 57 zaczyna się od liczby albo wzoru.
- Ocenę wykonał subagent roli 03; cytaty z `pl.json:702`, `:707`, `:826`, `content/pl/exams/m2.yaml:80`, `apps/mobile/src/app/session.tsx:485` i `packages/content-schema/src/index.ts:211` sprawdzone u źródła 2026-11-10.

## Wynik

| Grupa | A | B | C |
|---|---|---|---|
| razem (40) | 13 (32,5%) | 11 (27,5%) | 16 (40%) |
| generatory (16) | 5 | 3 | 8 |
| lekcje, egzaminy, reguły (24) | 8 | 8 | 8 |

- Każdy generator **decyzji** (`rangeDecision`, `potOdds`, `drawCall`, `icm`) jest w klasie C; A mają tylko generatory „rzemieślnicze” (kto wygrywa, najlepszy układ, wysokość flopu, c-bet z treści).
- „Dlaczego źle”: w treści pisanej ręcznie jest prawie zawsze, bo schemat wymaga `why` przy każdej opcji (`packages/content-schema/src/index.ts:211`), a ekran pokazuje `why` każdej opcji po odpowiedzi (`apps/mobile/src/app/session.tsx:485`). W generatorach `whoWins`, `outs`, `drawCall` zła opcja dostaje „Nie.” albo „13 to za dużo w tej sytuacji”; `rangeDecision` i `playerType` — sam procent albo próg.

## Przykłady (`plik:linia`, cytat z wstawionymi wartościami, klasa)
| Nr | Miejsce | Typ | Cytat | Klasa | Dlaczego źle |
|---|---|---|---|---|---|
| 1 | `pl.json:702`, `engine.ts:452` | rangeDecision | „Tak. Solver gra tak w 97% przypadków.” | C | tylko częstość |
| 2 | `pl.json:707–709`, `text.ts:149` | rangeDecision | „A9o: przebicie 55%, pas 45%. To ręka graniczna: solver miesza akcje…” | C | — |
| 3 | `content/ranges/spots.yaml:62` | rangeDecision, rozmiar | „Z pozycją przebijasz ok. 3x otwarcia, czyli do 7,5bb.” | B | tak |
| 4 | `pl.json:717`, `:719` | whoWins | „…(strit). Przeciwnik: … (kolor). Kolor jest wyżej w rankingu niż strit.” | A | nie („Nie.”) |
| 7 | `pl.json:738`, `:741` | outs | „Masz 4 karty w kolorze… 13 − 4 = 9. Szansa na turnie: 19,1%…” | B | nie |
| 8 | `pl.json:808`, `:810` | potOdds | „Pula po zakładzie to 150, dopłacasz 50, razem 200. 50 ÷ 200 = 25%.” | C | tak (rachunek) |
| 9 | `pl.json:826` | drawCall | „Masz 9 outów z 47 nieznanych kart, czyli 19,1% szans na turnie… Potrzebujesz 33%.” | C | nie |
| 11 | `pl.json:761`, `:757` | icm | „Twoje equity w puli nagród: teraz 27,3%… Bubble factor = strata ÷ zysk ≈ 1,99” | C | tak (progi) |
| 13 | `pl.json:800`, `:797` | playerType | „Nie. Nit gra do 14% rąk (VPIP); ten gracz gra 41%.” | B | sam próg |
| 14 | `pl.json:912` | texture (mokrość) | „Liczymy punkty: strit możliwy na kilka sposobów 3… Razem 4 punkty” | C | tak |
| 16 | `content/pl/lessons/m5-l3…md:36` | cbet | „niski flop z kartami blisko siebie trafia zakres dużego blinda… twoje wysokie karty tu chybiły.” | A | tak |
| 17 | `pl.json:691–692` | paint | „Zielone pole: grasz i zaznaczyłeś… Zgodność z solverem: 72% (zaliczenie od 80%).” | C | nie dotyczy |
| 19 | `content/pl/lessons/m0-l1-uklady.md:42` | lekcja M0 | „Para jest ta sama, więc decyduje kicker: twój as bije damę przeciwnika.” | A | tak |
| 21 | `content/pl/exams/m2.yaml:80` | egzamin M2 | „Potrzebujesz 33%. Sprawdzenie kupuje tylko turn… ok. 19,1%. To wyraźnie za mało.” | C | tak |
| 23 | `content/pl/exams/m3.yaml:21` | egzamin M3 | „AT … mieści się w zakresie otwarcia z UTG (ok. 15%–18% rąk). Solver aplikacji gra ją tu zawsze.” | C | tak |
| 24 | `content/pl/exams/m3.yaml:31` | egzamin M3 | „Za tobą jest jeszcze czterech graczy. A9 … często trafia asa ze słabszym kickerem niż AT, AJ…” | A | tak |
| 28 | `content/pl/exams/m6.yaml:10` | egzamin M6 | „MDF = pula ÷ (pula + bet) = 80 ÷ (80 + 60) = 57%. Gdy pasujesz częściej…” | B | nie |
| 29 | `content/pl/exams/m6.yaml:37` | egzamin M6 | „twoja para jest niższa niż as i król…, więc wygrywa głównie z blefami. Ten gracz rzadko blefuje…” | A | tak |
| 33 | `content/pl/exams/m8.yaml:56` | egzamin M8 | „dziesiątka blokuje oba strity (KT i T8), czyli ręce, którymi rywal na pewno zapłaci.” | A | tak |
| 34 | `content/pl/exams/m8.yaml:72` | egzamin M8 | „potrzebujesz 60 ÷ (90 + 60 + 60) = 28,6% equity, a bluff-catcher wygrywa… w ok. 20%” | C | tak |
| 35 | `content/pl/exams/m9.yaml:19` | egzamin M9 | „4 to strefa od 3 do 6, w której najwyższa para jest ręką na granicy” | C | tak |
| 39 | `content/pl/lessons/m12-l2…md:40` | lekcja M12 | „Potrzebowałeś 33% equity, a miałeś ok. 19,6%. Wygrałeś tym razem, ale… takie sprawdzenie traci.” | C | tak |
| 41 | `content/pl/rules.yaml:114` | R-M2-005 | „każde takie sprawdzenie traci pieniądze w długim terminie” | C (tautologia) | — |

Pełna tabela 41 pozycji: raport subagenta w sesji BD (przekazany koordynatorowi); wiersze wyżej to wybór z numeracją oryginału.

## Wzorce do przeróbki (rola 06; kod szablonów tekstu generatorów: 08)
1. **„Solver gra tak w X%”** zamiast powodu (`rangeDecision`, 13 zadań treści; egzamin M3). Do zrobienia: zdanie „masz <klasa>, jesteś na <pozycja>, za tobą <n> graczy → <akcja>, bo <ręka trafia / dominuje / gra dobrze bez pozycji…>”; częstość jako dodatek.
2. **„Potrzebujesz X%, masz Y%”** jako cała odpowiedź (`drawCall`, `potOdds`, egzaminy M2, M7, M8, M12). Generator nie daje pozycji ani rywala, więc nie ma z czego zbudować sytuacji: potrzebne pola kontekstu (08) i zdanie sensu („płacisz 1 część, by wygrać 2 — musisz trafiać raz na trzy; kolor trafia raz na pięć”).
3. **Najpierw wzór, sens na końcu** (MDF, alpha, rozmiar izolacji): odwrócić kolejność (BR-OCE-001: liczba po „bo”).
4. **Progi i strefy jako definicja** (punkty mokrości, progi HUD, strefy SPR, „przy 10bb źródła zalecają”): dodać, co dzieje się w rozdaniu (kto ma drawy, kto zapłaci, ile ulic wartości).
5. **Zła opcja bez wyjaśnienia w generatorach** („Nie.”, „13 to za dużo”): wyjaśnienie błędu myślowego dla każdej opcji (BR-OCE-002).

Kryterium po przeróbce: BR-OCE-003 (≥ 90% A, 0% C, 100% „dlaczego źle”, ta sama metoda). Brzmienie i poprawność merytoryczna należą do roli 06 (ADR-24); ta ocena nie zmienia reguł ani liczb.
