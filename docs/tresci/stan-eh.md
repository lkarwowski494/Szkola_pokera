# Stan sesji EH (06-tresci, build): SC-04, SC-05, SC-08 do treści; NIS-004, D-1116 — 2026-11-11
Gałąź `sesja-eh-szablony` od a6d1bb1b. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/EH.md` @ 58e47337. Decyzje: `docs/decyzje/EH.md` (D-1165…D-1170; wolne D-1171…D-1179).

| Zadanie | Stan | Dowód |
|---|---|---|
| 1. SC-04, SC-05 do treści | pl, en w treści; SC-04 tylko Ł (D-1165); przekład 10 języków w toku | czerwony: `dowody/eh-red.txt`; `pnpm content:build` kod 0 |
| 2. SC-08 do treści | pl, en w treści (D-1170: znacznik „otwarcie”); przekład w toku | jw. |
| 3. NIS-004 | rozstrzygnięte: próg ≥ 0,75 (`cbet.size.big`), D-1166; zadanie 08-EH-2 | `odczyty/eh-2026-11-11.tsv` |
| 4. D-1116 | gutshot → call (D-1167), backdoor strita z kartami ≥ T → call (D-1168), niski backdoor → null (otwarte); 08-EH-3 | jw. |
| 5. CI i push | do zrobienia po przekładach | — |

Następny krok: przekłady de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant (`szablony-eh.test.ts`), `pnpm content:build`, `pnpm run ci` → `dowody/eh-ci-<sha>.txt`, raport do koordynatora.
