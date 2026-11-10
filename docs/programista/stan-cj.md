# Stan sesji CJ (08-programista, fix) — 2026-11-10
Gałąź: sesja-cj-poprawki · kod: 994e285e · `pnpm run ci` kod 0 (docs/programista/dowody/cj-ci-994e285e.txt) · decyzje D-745…D-751 w docs/decyzje/CJ.md.

| ID | Stan | Dowód |
|---|---|---|
| WYS-001 | naprawione-do-weryfikacji | recenzja-ce-odtworzenie.test.ts (001) jako `it`; wyrocznia F4 z blindami; commit f5e43951 |
| WYS-002 | naprawione-do-weryfikacji | test 002 jako `it`; wyrocznie allin-stos-ca, stos-zakladu-bu, szablony-bs, szablony-f5-bu z pozycji; f5e43951 |
| ŚR-003 | naprawione-do-weryfikacji | size-spot-pozycje-cj.test.ts (był czerwony: 4 niepowodzenia przed poprawką); 994e285e |
| ŚR-004 | naprawione (M, źródło przeczytane) | D-749; test open-size tylko BTN/SB; 994e285e |
| ŚR-005 | OTWARTE PYTANIE (D-750) | bez zmiany treści |

Otwarte: ŚR-005 (rola 06: źródło o częstościach c-betu); próg żetonowy 0,5 bez blindów (D-751, NIS-008); icm-call z martwymi blindami trzecich graczy nieobsługiwany (TemplateError); NIS 006–009 bez zmian (backlog).
Uwagi: commity WYS-001 i WYS-002 w jednym (wspólny nowy argument positions); przegląd świeżym kontekstem (D-043) nie odbyty — generator jest w ścieżce treści, nie w wrażliwych; ścieżki wrażliwe zmienione: brak.
