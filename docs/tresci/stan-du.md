# Stan sesji DU (06-tresci, build): szablony kroku C (reszta) i D
Gałąź `sesja-du-szablony` od b3963e9a. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/DU.md` @ 48baa1fb. Stan na 2026-11-11. Decyzje: `docs/decyzje/DU.md` (D-1030…D-1037; wolne D-1038…D-1049).

## Wynik w skrócie
- CI: `pnpm run ci` kod 0 na cbdd2ff2 (`docs/tresci/dowody/du-ci-cbdd2ff2.txt`); pierwsze pełne CI na 4d05d33f było czerwone (`szablony-bs`, przekłady), naprawione w cbdd2ff2 (D-1039).
- **Po zgodzie koordynatora (KO-070) w treści: SC-06, SC-32, SC-33, SC-34 (Ł/Ś), we wszystkich 12 językach** (pl, en; 10 przekładów agenta do przeglądu 09: D-1038, D-1039). Treść scenariuszy: 10 szablonów (SC-01, 02, 03, 06, 11, 12, 19, 32, 33, 34).
- Szkice w `docs/tresci/szablony-robocze/` (SC-06, 32, 33 usunięte po wejściu do treści): SC-04, SC-05 (czekają na 08-A), SC-08 (pojemność, D-1035, kolejka decyzji koordynatora), SC-34 z poziomem trudnym (06-tresci-002).
- Testy zmienione według KO-070 (lista i powody: D-1038); nowy `tools/content-build/test/szablony-du.test.ts`.

## Inwentaryzacja (zadanie 1)
Reguły: wszystkie wymienione mają w `docs/tresci/rejestr.json` status „potwierdzone” ze źródłami szczebla 1–4 (odczyt 2026-11-04…11).

| SC | Moduł | Reguły | Rodzaj punktu w silniku (plik:linia) | Wynik sesji DU | Czego brakuje (kto) |
|---|---|---|---|---|---|
| SC-04 | M3 | R-M3-002 gto, R-M5-007 heur | range-spot `scenario-gen.ts:396`, c-bet po nim `:520` | szkic Ł/Ś (tekstura) | 08-A, 08-T; D-1031 |
| SC-05 | M3 | R-M3-003 gto, R-M5-004 heur | jw. | szkic Ł/Ś | 08-A, 08-T |
| SC-06 | M3 | R-M3-009 gto, R-M3-007 heur | range-spot + size-spot `:492` | **w treści** Ł (pl, en) | D-1032 |
| SC-08 | M4 | R-M4-003 gto, R-M4-002 heur | range-spot + size-spot | szkic Ł, pojemność 26 | KO-074: próg = liczba klas; zmiana progu w `scenariusze.ts:231` dla 08 (D-1040) |
| SC-13 | M5 | R-M5-008 heur (bez `check`), R-M5-011 math | cbet-case `:520`, ale brak przypadku `best: big` | otwarte | 06: źródło akcji dla klasy ręki na flopie z drawami (D-795) |
| SC-32 | M11 | R-M11-002 gto | range-spot `push.sb-10` | **w treści** Ł (pl, en) | — |
| SC-33 | M11 | R-M11-007 gto, R-M11-006 math | range-spot `call.bb-10` | **w treści** Ł (pl, en) | — |
| SC-34 | M11 | R-M11-009 math, R-M11-010 heur | icm-call `:455`, bramka T `scenariusze.ts:216` | **w treści** Ł/Ś (pl, en); T w szkicu | 06-tresci-002 (poziom trudny) |
| SC-07 | M4 | R-M4-004 heur, R-M6-006 heur | brak: obrona BB (gram/pas) i obrona wobec c-betu | — | 08-N1, 08-N2 |
| SC-09 | M4 | R-M4-012 heur (`iso-size` w `grading.ts`), R-M4-013 heur | brak `iso-size` w size-spot i limperów w generatorze | — | 08-N3; 06: lista rąk R-M4-013 |
| SC-10 | M4 | R-M4-007, R-M4-010 heur | brak (spot vs 3-bet wycofany, `spots.yaml:3`) | — | 08-N4 |
| SC-14 | M5 | R-M5-012, R-M5-013 heur | cbet-case tylko z przypadków Buttona | — | 06: przypadki OOP (CO wobec BTN); 08-N5 |
| SC-15 | M6 | R-M6-003 heur, R-M6-001 math | brak obrony wobec c-betu | — | 08-N2; 06: warunek R-M6-003 przez klasy R-M6-006 |
| SC-17 | M6 | R-M6-007 heur | jw. (duży c-bet) | — | 08-N2 |
| SC-20 | M7 | R-M7-006 math, R-M7-002 heur | brak zakładu gracza na turnie | — | 08-N6 |
| SC-24 | M8 | R-M8-010 math, R-M8-012 heur | brak decyzji na riverze | — | 08-N7; 06: skąd udział blefów (bez populacji tylko jako dana zadania, jak `m8.exam.q8`) |

## Lista dla roli 08 (dokładne zachowanie i test akceptacji)
- **08-T — ZROBIONE przez 06 (KO-070, D-1038); dla SC-04/05 po 08-A trzeba jeszcze w `szablony-co.test.ts` sekwencji akcji zależnej od `positions.hero` i punktu cbet-case nie na pozycji 0. Pierwotny opis:** (1) `cz-pokrycie-szablonow.test.ts:12-15`: test zgodności na treści pl dla range-spot (wyrocznia: częstość z `preflop-6max-100bb.json` / `pushfold.json` wprost, rangeVerdict liczony niezależnie), size-spot (rozmiar z parametru reguły × `openBb`) i icm-call (istniejąca wyrocznia ICM z `szablony-co.test.ts`); (2) `szablony-co.test.ts:148` lista `['sc-11','sc-12']` → `some(cbet-case)` z sekwencją akcji zależną od `positions.hero` (dziś `flopBtn` zakłada BTN i `decisions[0]`); (3) `recenzja-cq-odtworzenie.test.ts:47` i `cs-tresc-realna.test.tsx:28` zakładają brak SC-34 w treści: zmiana na „SC-34 w treści bez poziomu trudnego”; (4) `generator-odciski.json` przeliczony (`GENERATOR_ODCISKI_ZAPISZ=1`). Akceptacja: szkice skopiowane do `content/pl/scenarios` (SC-34 bez `trudny`), `pnpm run ci` kod 0.
- **08-A (bramka `holding`):** `scenariusze.ts:168-169` zgłasza „holding tylko dla punktu cbet-case” dla każdego punktu innego niż cbet-case; ma zgłaszać tylko, gdy żaden punkt szablonu nie jest cbet-case. Generator już stosuje `holding` w punkcie cbet-case po range-spot (`scenario-gen.ts:528`). Akceptacja: SC-04 i SC-05 przechodzą `pnpm content:build`; szablon z `holding` bez punktu cbet-case nadal odrzucony.
- **08-N1 (obrona preflop gram/pas):** punkt range-spot ze spotem, w którym ocenia się tylko „gram / pas” (grupa `groups` w `spots.yaml`, np. `vs-open.bb-vs-btn`): akcje = pas i gram (sprawdzenie albo 3-bet zaliczone jak w siatce). Akceptacja: dla klasy z sumą częstości gry ≥ 0,97 obie akcje gry „zgodne”, pas „błąd”.
- **08-N2 (obrona wobec c-betu):** punkt `defend` na flopie: gracz na BB po sprawdzeniu otwarcia Buttona, rywal stawia ułamek puli z listy szablonu; poprawna akcja z klasy ręki: dla małego c-betu (≈ 1/3) `call` przy parze, drawie, backdoorze z wysokimi kartami i asie jako najwyższej karcie, `fold` dla pozostałych (R-M6-006); dla dużego (≥ 3/4) `fold` dwiema wysokimi kartami bez pary i drawa (R-M6-007, z wyjątkiem asa na suchym flopie z królem: odrzucać takie warianty). Akceptacja: wyrocznia klas z rang i kolorów jak `outyDrawa` w `szablony-co.test.ts`, 10 000 losowań.
- **08-N3:** `iso-size` w size-spot (podstawa + na limpera + OOP z parametrów R-M4-012) z liczbą limperów w szablonie. Akceptacja: standard = `pf.iso.base + n × pf.iso.per-limper (+ oop-extra)`, rozmiary 0,8× i 1,6× „niedokładność”.
- **08-N4:** punkt „lista rąk” (oczekiwana akcja z jawnej listy klas w szablonie, np. AA, KK → 4-bet; AK → 4-bet zgodne, call dopuszczalne, R-M4-010). Akceptacja: wariant tylko z klas listy, ocena z listy.
- **08-N5:** przypadki c-betu wybierane według zadania wskazanego w regule (`check.drill`), nie zawsze z `m5.l3.c-btn`, i zakres otwarcia gracza z `positions.hero`. Akceptacja: szablon CO wobec BTN z regułą R-M5-012 dostaje przypadki OOP.
- **08-N6:** zakład gracza na turnie z drawem (semi-blef) albo silną ręką wobec drawa (R-M7-006: rozmiar 3/4 wobec 1/4 puli, cena rywala z rachunku). Akceptacja: wyrocznia ceny `bet ÷ (pula + 2·bet)`.
- **08-N7:** sprawdzenie na riverze bluff-catcherem przy danym udziale blefów (R-M8-010: `call`, gdy udział > `bet ÷ (pula + 2·bet)`). Akceptacja: wyrocznia rachunku, margines od progu jak w draw-call.

## Lista dla roli 09
Przegląd przekładu agenta (D-1039) w 10 językach (de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant): `content/<język>/scenarios/sc-06.yaml`, `sc-32.yaml`, `sc-33.yaml` (nowe w DU) i `sc-34.yaml` (z sesji CO, bez poziomu trudnego); pola `situation` i `explanation`, w tym formy terminów `{{t:…|forma}}`. Wersje en (`content/en/scenarios/`) do przeglądu 04/09.

## Następny krok
08: 08-A (bramka `holding`), potem 06 przenosi SC-04/05 z dopasowaniem `szablony-co`; 08-N1…N7 dla grupy „częściowo”; próg pojemności dla szablonów zakresowych (KO-074, D-1040), potem 06 przenosi SC-08; 06: SC-13 (źródło, D-795); 09: przekład 4 szablonów; recenzja niezależna DU (treść i testy, KO-070 pkt 4).
