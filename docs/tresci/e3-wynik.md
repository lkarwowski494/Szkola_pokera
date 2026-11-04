# Rola 06 E3: stan (2026-11-04, dwudziesta sesja) — w toku

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

## Następne kroki (E3, nowa sesja)
1. (zrobione) D-158: `content/helplines.yaml` — tylko `fallback` (zdanie: lekarz albo lokalna poradnia; w zagrożeniu życia lokalny numer alarmowy) i `int-gambling-therapy`; wpisy H-* krajów → status `wycofane` z `nastepca` w `rejestr/pomoc.json`; nowe twierdzenie dla zdania (źródło szczebla 1–3, np. NHS/MedlinePlus „seek help”); ramka M12-L4 i `pointer`; testy `helplines.test.ts`, `HelpScreen.test.tsx`; zgłoszenie do 08 (ekran „Pomoc” bez wyboru regionu, `help.tsx`, E2E `04-pomoc.yaml`, `helplines-env.mjs`) i `fix` 01 (RD-12, BR-POM-001/002, wektory `tests/wektory/brd.json`). Ścieżki wrażliwe → przegląd D-043.
2. (zrobione) D-159: przepisać M12-L4 (bez porad ile pieniędzy, bez „prawdziwe pieniądze”), M13-L3:64 (kasyno), egzamin M12 (q9, q10 kwoty w zł; A7c: m12.yaml:74 „niewielkie” przy 8,2%); rozbieżności A7c (R-M12-009/010/011) rozwiązać przy przepisaniu; rejestr R-M12-*, n:br.*, n:ror.*; terminy bankroll i RoR.
3. Ponowny przegląd zastępczy A9 (świeży kontekst, instrukcja jak A8: treści, rejestr i źródła, bez decyzje.md i e3/*) 11 twierdzeń: R-M12-009, R-M12-011, n:br.bi.base, n:br.bi.beginner, n:dd.bi.small, n:ror.two, M12-L4-RAMKA, H-INT-1, H-INT-2, t:bankroll, t:risk-of-ruin; zapis `przeglad` ze skrótem; `pnpm tresci:rejestr` z `--przeglad zastępczy` bez `--przed-przegladem` → kod 0.
4. 75 poprawek S3 i 17 spraw przekrojowych: `docs/tresci/e3/do-poprawy.md` (szczeble, `level`, spójność modułów, push 10bb ante, 1/4 puli 17% vs 16,7%, `spr.stack.*`).
5. Otwarte z E2 §4: `range.acceptable/explanation`, fakty 9 stanów błędów (04), pytania oceny poziomu F-01, lista B terminów, R-M4-007 `pf.vs3bet.*`.
6. Definicja ukończenia punkt po punkcie; przekazanie 07/05/08/09/04/10; aktualizacja `docs/sztafeta.md`; STOP E3.
