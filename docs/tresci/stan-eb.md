# Stan sesji EB (06-tresci, fix): poprawki szablonów DU po recenzji EA — 2026-11-11
Gałąź `sesja-eb-du-fix`, start 7a7a0f1d (= `origin/sesja-du-szablony`). Recenzja: `docs/tresci/recenzje/recenzja-du-7a7a0f1d.md` na `sesja-ea-recenzja`. Decyzje: `docs/decyzje/EB.md` (D-1105…D-1108; D-1109 wolne).

| ID | Commit | Test (przed → po) | Decyzja |
|---|---|---|---|
| 06-tresci-006 | d77ab171 (+ bazy 441c1c22) | `szablony-eb` znaczniki DU = pl w 11 przekładach: kod 1 (es sc-34 fold bez `t:call`) → 12/12 | — |
| 06-tresci-001 | a47d6c37 (+ bazy 441c1c22) | `szablony-eb` przyczyna w zdaniu decyzji SC-34, 10 000 wariantów/poziom × 12 języków: 12 czerwonych → 38/38; Ł: 9008/10 000 pas także w żetonach | D-1105 |
| 06-tresci-004 | 82d2f5e5 | `szablony-eb` SC-06 raise-big i SC-32 w granicach `because` (pl, en): kod 1 → kod 0 | D-1106 |
| 06-tresci-005 | 1aa97df3 | `szablony-eb` `if` R-M11-009 bez warunku eliminacji (pl, en); gracz pokrywa rywala w 2012/4000 wariantów: 2 czerwone → 43/43 | D-1107 |
| 06-tresci-003 | f08cabe4 | `cs-tresc-realna` pętla po szablonach bazy: mutant (bez `sizeRules`) kod 1, stary test kod 0; bez mutanta 36/36 (`docs/tresci/dowody/eb-003-mutant.txt`) | D-1108 |

Nie ruszane: 06-tresci-002 (decyzja właściciela). Poza zakresem, dla 04/08: „na mały blind” (odmiana `{{w:pozycja}}` po „na”, wszystkie szablony), „2.4 bb” z kropką w przebiegu rozdania obok „2,4 bb” w ocenie.

Przekłady: 10 języków (de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant) zmienione przez agenta tylko w zdaniach z 001, 004, 005; jakość językowa do przeglądu roli 09. `source` R-M11-009 uzupełniony cytatem tylko w pl i en.

Nowe znaleziska (nienaprawiane):
- NIS (TRE-03): R-M11-009 `because` („przegrana kosztuje więcej, niż wygrana dodaje”) bez wyłączenia ze źródła: „PKOs are the exception to the rule that you lose more equity than you gain in tournament hands, because of the bounties” (blog.gtowizard.com/what-is-the-bubble-factor-in-poker-tournaments, odczyt 2026-11-11). Aplikacja nie uczy turniejów z bounty, więc skutek teoretyczny; propozycja: dopisać „(bez nagród za wyeliminowanie)” do `if` przy następnej zmianie M11.
- Przegląd ścieżek wrażliwych: zmiany EB nie dotykają ścieżek z listy `CLAUDE.md` poza bazami treści budowanymi przez `tools/content-build/` (kod narzędzia bez zmian), więc przegląd subagenta niepotrzebny.

CI: `pnpm run ci` na f08cabe4 kod 0 (`docs/tresci/dowody/eb-ci-f08cabe4.txt`; content-build 552 + 1 expected fail, mobile 1058, domena 347 + 1 expected fail).
