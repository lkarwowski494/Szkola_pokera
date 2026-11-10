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

## Zadanie 6: timeout helplines.test.ts (CI GitHub, run 42909124569)
Przyczyna: `compileContent('pl')` ≈ 20–23 s, z czego ok. 85% to kontrola generatora szablonów (profil CPU: classifyFlop, analyseOutsSpot, drawOuts, tryVariant); test M12-L4 kompilował raz, ale `kit.ts` kompilował przy imporcie w każdym pliku testowym. Poprawka: D-752 (opcja `kontrolaGeneratora`, bez zmiany limitów i asercji).
Czas `vitest run` w tools/content-build (lokalnie, 4 rdzenie): przed 323 s (przebieg przed zmianą; 2 CI-przebiegi 205 s po pierwszej części), po 141 s. Test M12-L4: 20 648 ms → 1 678 ms. Najdłuższy test poza losowaniami: „jest deterministyczna” 18 s (pełna kompilacja, limit 120 s z D-720 bez zmian).
Liczba testów: 302 → 303 (+1: wyłączenie kontroli generatora nie zmienia hasha). `pnpm run ci` kod 0 (docs/programista/dowody/cj-ci-zad6.txt).
