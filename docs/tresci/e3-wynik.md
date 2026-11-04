# Rola 06 E3: stan (2026-11-04, dwudziesta pierwsza sesja) — w toku

## Zrobione (dowód)
- Niezależna weryfikacja wszystkich 1034 potwierdzonych twierdzeń, 7 weryfikatorów w świeżym kontekście bez notatek autora: `docs/tresci/e3/A1–A7` (instrukcja: treści i rejestr, cytat sprawdzany w surowym tekście, rachunki liczone od nowa). Źródło: 988 POPARTE, 45 CZĘŚCIOWO, 1 DO SPRAWDZENIA; tekst: 951 POPARTE, 80 CZĘŚCIOWO, 2 SPRZECZNE, 1 DO SPRAWDZENIA; skutek: 1×S1, 7×S2, 85×S3.
- Naprawione S1 i S2 (D-156): VN 115/113, R-M12-011, H-INT-1, M10-L3, egzamin M11, M5-L3, M5-L4; P-OCENA_STOPNIE → rola 08 (`grading.ts`). Commity 35b24e6, 5dd8e3d.
- Skrót wersji zdań dla przeglądu krytycznych (D-157): `scal-rejestr.mjs --skroty`, test `scal-rejestr.test.mjs` w `pnpm test:skrypty` (czerwony przed, zielony po).
- Przegląd ścieżek wrażliwych D-043 (`docs/tresci/e3/przeglad-D-043.md`): 0 KRYTYCZNYCH/WYSOKICH; NISKIE #4, #6 naprawione (155dbbf).
- Przegląd zastępczy D-027: A7 (33/50), A7b (44/50), A7c (11/14); zapis `przeglad` ze skrótem dla 36 wpisów (dbebf3c).
- `pnpm run ci` kod 0 na dbebf3c; `scal-rejestr --przed-przegladem` kod 0.

## Decyzje właściciela na tej bramce (2026-11-04)
- D-158: bez numerów krajowych; jedno ogólne zdanie i link do Gambling Therapy.
- D-159: M12-L4, M13-L3, egzamin M12 bez gry na prawdziwe pieniądze.

## Dwudziesta sesja (2026-11-04, commity 32ea0a0, 86b36cb, 07a3fdd)
- Krok 1 D-158 zrobiony (D-160): `helplines.yaml` = `fallback` (twierdzenie H-INT-2, MedlinePlus i NHS, szczebel 3) + `int-gambling-therapy`; 44 wpisy H-* `wycofane`; `fallback.claim` obowiązkowe w schemacie, strażnik content-build i `scal-rejestr` (testy czerwone przed, zielone po); ekran „Pomoc” bez powtórzenia zdania; E2E po etykiecie dostępności (nieuruchomione, macOS). Zgłoszenia 01/08/04/09: `docs/tresci/e3/zgloszenia-D-158-D-159.md`.
- Krok 2 D-159 zrobiony (D-161): M12-L4 „Bankroll i ryzyko” we wpisowych, R-M12-010 usunięta, egzamin M12 q10 bez złotych, q8 bez „niewielkie”, A7c R-M12-009/010/011 rozwiązane; M13-L3, M12-L3, termin `bankroll`.
- Krok 3 w toku: A8 (`e3/A8.*`) 5/11 zaliczonych, wszystkie rozbieżności poprawione w 07a3fdd (w tym S1 H-INT-2: zdanie bez zawężenia warunku). Przegląd D-043 (b) (`e3/przeglad-D-043-b.md`): 0 KRYT./WYS., Ś-1 poprawione, N-1/N-2 poprawione, reszta w `do-poprawy.md`. Ponowny przegląd zastępczy A9 na 07a3fdd przerwany błędem API (safeguards) — do powtórzenia w nowej sesji; zapis `przeglad` jeszcze niewpisany dla 11 twierdzeń.
- `pnpm run ci` kod 0 na 07a3fdd.

## Dwudziesta pierwsza sesja (2026-11-04)
- Przegląd zastępczy D-027 zakończony: A9 (6/11, `e3/A9.*`), A10 (2/5), A11 pełny (8/11, 29/29 cytatów dosłownie), kontrola zawężona poprawek po A11 `e3/A11-kontrola.md` (ZALICZONE, wyjątek nazwany D-162). Zapis `przeglad` ze skrótem dla 11 twierdzeń; `scal-rejestr --przeglad zastępczy --sprawdz`: 0 błędów, 0 uwag, kod 0; `pnpm tresci:rejestr` w CI bez `--przed-przegladem`.
- Poprawki po A9–A11: H-INT-2 (myśli samobójcze → numer alarmowy, „ty albo ktoś, kogo znasz”; MedlinePlus 001520), ramka „Niektóre sygnały”, m12-l3 bez „stale”, H-INT-1 cytat z widocznej stopki, R-M12-011 („najwcześniej wtedy”, „najpóźniej przy” połowie, warunek winrate), n:dd.bi.small (warunek i horyzont).
- Poprawki S3 z `do-poprawy.md`: 83 pozycje zamknięte (3 partie w osobnych kopiach roboczych: terminy 49dc464, M1–M6 d6528cb, M7–M13 9fbc8f9; scalone, konflikt m4-l1 rozwiązany ręcznie) + M12 (R-M12-002, R-M12-012, n:study.*, q-warning-sign). Otwarte: 5 spraw przekrojowych rejestru i 6 nowych pozycji (koniec tabeli).
- Błąd po drodze: c0cefdf i 27b95d0 miały czerwony `HelpScreen.test` (zdanie wpisane w teście); `ci` przerwało się wcześniej na przekroczeniu czasu i tego nie pokazało. Naprawione w e7627a1 (test czyta zdanie z `helplines.generated.ts`). `pnpm run ci` kod 0.
- Uwaga: regulamin MedlinePlus zabrania automatycznego pobierania treści; weryfikatorzy pobierali pojedyncze strony `curl` do odczytu cytatu.

## Następne kroki (E3, nowa sesja)
1. 5 spraw przekrojowych rejestru (szczeble, `level`, Beyondgto, szczebel wpisów pomocy, `n:var.z95`) i 6 nowych pozycji z końca `e3/do-poprawy.md`; zmiana wpisu albo zdania któregokolwiek z 11 krytycznych → kontrola zawężona w świeżym kontekście (D-162) i nowy skrót, `pnpm tresci:rejestr` kod 0.
2. Otwarte z E2 §4: `range.acceptable/explanation` (i18n, ścieżka wrażliwa), fakty 9 stanów błędów (04), pytania oceny poziomu F-01, lista B terminów, R-M4-007 `pf.vs3bet.*` (źródło HUD 55% bez adresu).
3. Definicja ukończenia punkt po punkcie; przekazanie 07/05/08/09/04/10; `docs/sztafeta.md`; STOP E3.
