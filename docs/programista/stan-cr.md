# Stan sesji CR (08-programista, fix): poprawki CN po recenzji CP
Gałąź `sesja-cr-poprawki` od 9a6f45f; decyzje `docs/decyzje/CR.md` (D-815…D-820); polecenie `docs/koordynacja/polecenia/CR.md`.

## Zrobione
| ID | Klasa | Commit | Test (czerwony → zielony) |
|---|---|---|---|
| NIS-005 | D | dbc54523 | `kontekst-cn.test.ts` „CR NIS-005”: czerwony („did not throw” na kodzie sprzed zmiany), zielony po |
| WYS-001 | D | af40492b | `cp-recenzja-cn.test.ts` (content-build): `it.fails` → `it`; kontrakt w mobile (`cp-recenzja-cn.test.tsx`) |
| WYS-002 | M | af40492b, 138ca636 | `cp-recenzja-cn.test.tsx` „oceny ekranu = oceny silnika gry” (`it.failing` → `it`), `ekran-cn.test.tsx` poprawiony (utrwalał defekt) |
| WYS-003 | M | af40492b | test bramki odrzucającej icm-call (content-build); test ekranu ICM usunięty (D-817) |
| ŚR-004 | D | af40492b | `cm-recenzja-cl.test.ts` (akcje i oceny), kontrakt w mobile |
Czerwień WYS-001…003: dowody CP `cp-czerwone-*.txt` (testy odtwarzające sprzed naprawy). Commity 001/002/003/004 złączone w jeden (wspólne hunki w `scenario-gen.ts` i `scenariusze.ts`), ID w treści.

## Dowody
- `docs/programista/dowody/cr-ci-138ca636.txt`: `pnpm run ci` kod 0 (mobile 116 zestawów / 885 testów, content-build 333, poker-core 179).
- Pierwszy przebieg CI (af40492b) padł na `ekran-cn.test.tsx` (test utrwalał defekt WYS-002); poprawiony w 138ca636.
- Przegląd niezależny ścieżek wrażliwych (subagent, tylko diff 9a6f45f..HEAD): brak uwag P0/P1.

## Otwarte
- Zrzuty ekranu z urządzenia: brak (brak macOS); ekran sprawdzony testami Jest.
- Powrót icm-call: projekt widoku ICM (rola 04), potem wdrożenie (08) i test ekranu ze stosami i wypłatami.
- Wpisu D-793 nie ma na tej gałęzi (jest w sesji CO); przy scaleniu sprawdzić zgodność z D-816.
- Scalenie z `sesja-co-szablony`: SC-34 (icm-call) zostanie szkicem po WYS-003; SC-11/SC-12 (cbet-case) muszą mieć 3 akcje (bramka D-815).
