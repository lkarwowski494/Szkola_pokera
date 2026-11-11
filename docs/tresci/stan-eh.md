# Stan sesji EH (06-tresci, build): SC-04, SC-05, SC-08 do treści; NIS-004, D-1116 — 2026-11-11
Gałąź `sesja-eh-szablony` od a6d1bb1b. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/EH.md` @ 58e47337. Decyzje: `docs/decyzje/EH.md` (D-1165…D-1170; wolne D-1171…D-1179).

| Zadanie | Stan | Dowód |
|---|---|---|
| 1. SC-04, SC-05 do treści | w treści, 12 języków (10: przekład agenta 5a438d2b); SC-04 tylko Ł (D-1165) | czerwony: `dowody/eh-red.txt`; `pnpm content:build` kod 0 |
| 2. SC-08 do treści | w treści, 12 języków (D-1170: znacznik „otwarcie”) | jw. |
| 3. NIS-004 | rozstrzygnięte: próg ≥ 0,75 (`cbet.size.big`), D-1166; zadanie 08-EH-2 | `odczyty/eh-2026-11-11.tsv` |
| 4. D-1116 | gutshot → call (D-1167), backdoor strita z kartami ≥ T → call (D-1168), niski backdoor → null (otwarte); 08-EH-3 | jw. |
| 5. CI i push | `pnpm run ci` kod 0 na 5a438d2b | `dowody/eh-ci-5a438d2b.txt` |

Następny krok: 08: 08-EH-1 (dolosowanie flopu po range-spot, potem 06 dodaje SC-04 Ś i zawęża Ł), 08-EH-2, 08-EH-3 (`docs/decyzje/EH.md`); 09: przegląd przekładu SC-04/05/08 w 10 językach — uwagi agentów: Button/botón/bouton/bottone/botão niespójne już w sc-06 vs sc-11/12 (es, fr, it, pt, pt-BR), fr spacja zwykła zamiast nierozdzielającej przed : ; ? ! (52 miejsca w istniejących plikach fr), „3-bet” jako czasownik bez znacznika (jak pl), ja termin 3-bet [DO USTALENIA] w słowniku; 06: backdoor z kartą < T wobec 1/3 i próg „małego” 0,4 (otwarte pytania EH).
