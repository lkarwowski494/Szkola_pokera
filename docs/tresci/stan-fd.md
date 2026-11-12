# Stan sesji FD (06-tresci, build): KO-085 i treści fali 1–2 — 2026-11-12
Gałąź `sesja-fd-tresci` od `claude/sleepy-brahmagupta-2065nu` @ da1e02db + `origin/sesja-ex-rachunek`. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/FD.md` @ 267abcd4. Decyzje: `docs/decyzje/FD.md` (D-1350…D-1357). Odczyty: `docs/tresci/odczyty/fd-2026-11-12.tsv` (7/7 dosłownie w surowym tekście w dniu pracy, + R-M5-012 z EV tego dnia). Rachunek: `docs/tresci/narzedzia/rachunki/fd_wektory.py` → `docs/tresci/dowody/fd-wektory.txt`. Kontrola szkiców: `docs/tresci/narzedzia/fd-kontrola-szkicow.sh` → `docs/tresci/dowody/fd-szkice.txt` (D-1356, kod 0). CI: `docs/tresci/dowody/fd-ci-416d9f5.txt` (kod 0).

## Wynik
| Szablon | Stan | Gdzie | Blokuje wejście do bazy |
|---|---|---|---|
| SC-14 (P2a) | **gotowy szkic** (build z pełnym kontekstem kod 0), Ł/Ś `check`, pl+en | `docs/tresci/szablony-robocze/fd/` | 08-FD-5 (testy `tools/`), 09 (10 języków) — D-1358 |
| SC-23 | **gotowy szkic** (rodzaj na ekranie), Ł `best-hand` (blockers), pl+en | `docs/tresci/szablony-robocze/fd/` | 08-FD-5 (test pokrycia `pick-hand`), 09 (10 języków) — D-1358 |
| SC-24, SC-31 | szkic, pl+en (SC-31 z poziomem pasa, D-1438; SC-24: nowe znalezisko FN-N1) | `docs/tresci/szablony-robocze/fd/` | widok `river-catch` z udziałem blefów i ceną (D-1357) |
| SC-07, SC-15, SC-17 | szkic, pl+en | jw. | widok `defend` |
| SC-09 | szkic, pl+en | jw. | widok limperów (`iso-size`) + 08-FD-2 |
| SC-10 | szkic, pl+en | jw. | widok `list-hand` |
| SC-20 (P4a) | szkic `turn-bet`, pl+en | jw. | widok `turn-bet` |
| SC-13 (P1a), SC-28 (P3a) | spec dla 08 (niżej), treść po silniku | ten plik | 08-FD-3, 08-FD-4 |

Przeniesienie szkicu do bazy: skopiuj `fd/{pl,en}/sc-NN.yaml` do `content/{pl,en}/scenarios/`, dodaj rodzaj do `RODZAJE_NA_EKRANIE` (08), `pnpm content:build`; struktura pl = en jest już sprawdzona.

## Poprawki FN po recenzji FK (2026-11-12, sesja FN, decyzje `docs/decyzje/FN.md` D-1435…D-1438)
06-tresci-001…007, 010, 011: naprawione-do-weryfikacji (commity w raporcie `docs/tresci/recenzje/recenzja-fd-fc16e128.md`); test `docs/tresci/narzedzia/fn-kontrola.mjs`: 9/9 czerwone przed (`dowody/fn-kontrola-przed.txt`), 9/9 zielone po (`dowody/fn-kontrola-po.txt`); kontrola szkiców `dowody/fn-szkice.txt`. 002 nie wymaga generatora (same dane szablonu, D-1436). 008 i 009 zostają u 08.
**Warunek 08-FD-5 (D-1410): SC-14 i SC-23 gotowe do `content/`.** SC-14 bez zmian (D-1410 pkt 1). SC-23 pl poprawione: 004 (cb1ae089, „każdym AK i z AQ w kolorze… KQ, KJ, QJ, QT i JT, wszystkimi w kolorze” = dane `calls`/`folds`) i 011 (04289ccb); en zgodne: sytuacja bez zmian („AK and suited AQ”, „folds suited KQ…”), wyjaśnienia en poprawione razem z pl (011); struktura pl = en (`dowody/fn-szkice.txt`). Przekład 09 bierze pl i en z tego stanu (D-1410 pkt 4).

## Specyfikacja dla roli 08 (bez zmian kodu w FD)
**08-FD-1 (widoki, z 04):** `river-catch`: sekcja „Liczby” pokazuje udział blefów wariantu (dana zadania) i potrzebne equity zakład ÷ (pula + 2·zakład) — bez tego wyjaśnienie odwołuje się do liczby niewidocznej (D-1357). `defend`, `list-hand`, `turn-bet`, `iso-size` (limperzy przed graczem): widoki według projektu 04; wtedy rodzaj trafia do `RODZAJE_NA_EKRANIE`.
- Przypadek: SC-24 Ł, ziarno dowolne → ekran pokazuje udział blefów i cenę; wybór `call` → werdykt zgodny, wyjaśnienie „call”.

**08-FD-2 (SC-09):** `size-spot` `iso-size` bez punktu `range-spot`: ręka gracza z zakresu otwarcia pozycji (`rfi.<pozycja>`, jak `handFromRange` w `cbet-case`, `scenario-gen.ts:615-626`), a nie z całej talii (`scenario-gen.ts:627-631`). Powód: sytuacja mówi „masz rękę, którą przebijasz”; 72o z CO uczyłoby izolacji ręką spoza zakresu.
- Przypadek: SC-09 Ł, 2000 ziaren → każda klasa ręki ma częstość otwarcia > 0 w `rfi.co`.

**08-FD-3 (SC-13, = 08-EX-4; D-1306, D-1355):** rodzaj „rozmiar na flopie” (`flop-size`): gracz z silną ręką (najwyższa para z kickerem ≥ Q albo lepsza, jak D-1256) na flopie two-tone; rywal z drawem do koloru; akcje `bet-small` (¼ puli) i `bet-big` (⅔ puli); poprawna `bet-big`. Warunek przyjęcia wariantu: zbiór kart turnu, na których rywal wygrywa albo remisuje, **równy** nominalnym outom koloru, 0 remisów (jak D-1286 na flopie); e = N/47; `e − cena(¼) ≥ marginMin` i `cena(⅔) − e ≥ marginMin`; marginMin 0,02.
- Wektory (`docs/tresci/dowody/fd-wektory.txt`): ceny ¼ = 0,1667, ⅓ = 0,2000, ⅔ = 0,2857, ¾ = 0,3000.
  - A: AsKd vs QhJh, Ks8h5h → 9 kart (2h 3h 4h 6h 7h 9h Th Kh Ah), e = 0,1915, marginesy +0,0248 / +0,0942 → **przyjęty**, `bet-big`.
  - B: AhKd vs QhJh, Ks8h5h → 8 kart, e = 0,1702, margines przy ¼ = +0,0035 < 0,02 → **odrzucony**.
  - C: AsKd vs 7h6h, Ks8h5h → 15 kart (kolor + strit), e = 0,3191 > cena ⅔ → **odrzucony** (outy nieczyste; draw ma cenę także przy dużym zakładzie).

**08-FD-4 (SC-28, = 08-EX-1 + 08-EX-2; D-1302, D-1355):** rodzaj `river-value` (bet/czekanie na riverze z pozycji): dane szablonu `calls` i `folds` (klasy rąk rywala, dana zadania); W = kombinacje sprawdzające gorsze od gracza, L = lepsze, remisy pominięte, po usunięciu kart gracza i stołu; w = W ÷ (W + L); bet ⇔ w ≥ 0,5 + δ, czekanie ⇔ w ≤ 0,5 − δ; pas ±δ → odrzucenie (δ ≥ 0,02, D-1051; szkic SC-28 użyje δ = 0,05 na Ł). Odrzucenie, gdy któraś ręka z `folds` jest lepsza od ręki gracza (D-1302 war. 2). SC-28: ręka gracza = overpara (para w ręce wyższa od każdej karty stołu), stół bez trzech kart w kolorze i bez strita na stole.
- Wektory (gracz QhQd, stół Js8c5d3h2s):
  - G: sprawdza AJ, KJ, JT, J9, 88, 55; pasuje 76 → W = 48, L = 6, w = 8/9 = 0,8889 → **bet**.
  - H: sprawdza AJ, 88, 55, JJ, AA, KK; pasuje 76 → W = 12, L = 21, w = 4/11 = 0,3636 → **czekanie**.
  - E: sprawdza AJ, KJ, 88, 55, JJ, AA, KK; pasuje 76 → w = 8/15 = 0,5333 (w pasie ±0,05) → **odrzucony**.
  - D: jak G, pasuje też A4 (strit A–5, lepszy od QQ; 16 kombinacji lepszych wśród pasujących) → **odrzucony** (D-1302).
  - F: sprawdza AJ, KJ; pasuje KK (6 lepszych pasujących) → **odrzucony**.

**08-FD-5 (wejście SC-14 i SC-23 do bazy, D-1358):** CI na cbf1d41 z SC-14 i SC-23 w `content/` czerwone (`docs/tresci/dowody/fd-ci-czerwone-cbf1d41.txt`, 17 testów):
- `recenzja-cq-odtworzenie.test.ts:27` i `generator-odciski.test.ts` (kontekst testu): `cbetCases` tylko z R-M5-007 → SC-14 (przypadek R-M5-012) daje 20 000 odrzuceń; poprawka: kontekst jak `buildGeneratorContext` (wszystkie reguły cbet-case), plus odciski SC-14 i SC-23 dla bieżącej `GENERATOR_WERSJA`.
- `szablony-co.test.ts`: lista szablonów cbet-case (SC-04, 05, 11, 12) → dopisać SC-14; test 10 000 wariantów SC-14 z oceną `cbetVerdict` przypadku R-M5-012.
- `cz-pokrycie-szablonow.test.ts:25`: `pick-hand` bez testu zgodności na treści → test SC-23 (wyrocznia jak `ek-pick-hand.test.ts`, zakres z szablonu).
- `szablony-bs.test.ts`: 10 języków bez sc-14/sc-23 → 09 (przekład) w tym samym commicie co wejście do bazy.
- Przypadek: po przeniesieniu `fd/{pl,en}/sc-14.yaml`, `sc-23.yaml` do `content/` i zmianach wyżej `pnpm run ci` kod 0.

**08-FN-1 (SC-10, ręka mieszana w `list-hand`; 06-tresci-007, D-1435):** dziś wpis listy ma jedną `correct` i listę `acceptable` (`packages/poker-core/src/scenario-gen.ts:1102`); ocena dopuszczalna daje 1 punkt jak zgodna (`packages/poker-core/src/grading.ts:53`), różni się etykieta (`apps/mobile/src/features/scenariusz/wariant.ts:196`). Dwóch akcji poprawnych silnik nie obsługuje. Zmiana: schemat wpisu dopuszcza `correct: string | string[]` (albo `mixed: [..]`), `listHandVerdicts` zwraca listę, ocena ekranu „zgodne” dla każdej akcji z listy (jak range-spot, ADR-04, DC WYS-001), `poprawnaAkcja` i bounds `expected` biorą pierwszą z listy. Potem 06 rozdziela AKs (`correct: [4bet, call]`) od AKo (`correct: 4bet`, `acceptable: [call]`).
- Przypadek: SC-10, ręka AKs, wybór `call` → „zgodne”; AKo, wybór `call` → „dopuszczalne”; test schematu: dotychczasowe wpisy z jednym `correct` bez zmian.

## Dla roli 04
- Widoki rodzajów `river-catch`, `defend`, `list-hand`, `turn-bet`, `iso-size` (limperzy) — wymagane przez szkice; w `river-catch` dana zadania (udział blefów) musi być widoczna (D-1357).
- `pick-hand` (SC-23): zdania „Liczby” z V/F po usunięciu kart — dziś brak (`liczby.ts:26`); klucze do zaprojektowania, potem 09.

## Klucze nowe w FD dla roli 09 (wzorzec pl i en; pozostałe języki biorą dziś en)
- `sc-14.yaml` (wzorzec `docs/tresci/szablony-robocze/fd/{pl,en}/`): `situation`, `decisions[0].actions[check|bet-small|bet-big].explanation` — do przełożenia razem z 08-FD-5.
- `sc-23.yaml` (jw.): `situation`, `decisions[0].actions[best-hand|other-hand].explanation`.
- Szkice (przekład dopiero po wejściu do bazy): `docs/tresci/szablony-robocze/fd/{pl,en}/sc-07, sc-09, sc-10, sc-15, sc-17, sc-20, sc-24, sc-31.yaml` — `situation` i wszystkie `explanation`.

## Rejestr twierdzeń
Teksty nowych szablonów i szkiców składają się wyłącznie z pól `then`/`because` reguł już potwierdzonych w `docs/tresci/rejestr.json` (R-M5-012, R-M8-007, R-M8-010, R-M6-001, R-M6-003, R-M6-006, R-M6-007, R-M4-010, R-M4-012, R-M7-006) i liczb z `numbers.yaml` (`{{n:}}`); nowych twierdzeń merytorycznych FD nie wprowadza. Źródła tych reguł przeczytane ponownie dosłownie w dniu pracy (`odczyty/fd-2026-11-12.tsv`). Nowe są tylko: dane zadania (zakresy i udziały blefów, D-1300 — nie twierdzenia) i rachunki wektorów (szczebel 1, `fd_wektory.py`).

## Otwarte
- [DO USTALENIA] (produkt, 03): SC-23 tryb `showdown` (R-M8-006) jako drugi szablon M8 albo poziom — dziś jeden tryb na punkt.
- [DO USTALENIA] (04): czy dziś pokazywać SC-23 bez zdań „Liczby” (V/F) — tekst wyjaśnienia jest kompletny bez nich.
- Niezależna weryfikacja (E3) treści SC-14 i SC-23 oraz szkiców: przy najbliższym audycie 06 (fala 2 według `rachunek-szablonow.md` §5).

## Następny krok
08: 08-FD-1…4 (widoki z 04, ręka z zakresu dla iso, `flop-size`, `river-value`); 06: przeniesienie szkiców po widokach, treść SC-13 i SC-28 po 08-FD-3/4, fala 3–4 (SC-22, 25, 29, 27, 26, 30, 16, 18, 21).
