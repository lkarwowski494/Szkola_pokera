# Decyzje sesji FF (08-programista, audit: recenzja FC c4110310). Pula D-1370…D-1374 (użyte D-1370, D-1371). Wszystkie do weta właściciela.

| ID | Data | Decyzja | Odrzucone | Podstawa |
|---|---|---|---|---|
| D-1370 | 2026-11-12 | 08-programista-001 (WYS): test wydajności turn-bet naprawić miarą deterministyczną (liczba prób albo wywołań klasyfikacji na wariant dla stałych ziaren), bez progu czasu ściennego w bramce CI. | (b) test czasu poza bramką (regresja nie zatrzyma CI); (c) podniesienie limitu (nadal niedeterministyczne; D-1341) | analogia w repo: `packages/poker-core/test/core.test.ts:284` (pomiar bez progu czasu, odczyt 2026-11-12); Trening: brak analogii (`gh api search/code`, 0 trafień, 2026-11-12); dowody `docs/programista/recenzje/dowody/ff-gh-ci-28fdb1b0.txt`, `ff-ci-c4110310.txt` |
| D-1371 | 2026-11-12 | 08-programista-002 (ŚR): dopisać wektor `czysteOuty` z W = N i innym zbiorem kart (zabija mutanta „tylko liczność”). | pozostawienie bez testu | `docs/programista/recenzje/dowody/ff-odciski-mutant-m7.txt` |
