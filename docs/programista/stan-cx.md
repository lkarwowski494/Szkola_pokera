# Stan sesji CX (rola 08, build): range-spot (F1) na ekranie scenariusza
Gałąź `sesja-cx-range-spot` od 46197812 · aktualizacja 2026-11-11

| Krok | Stan | Dowód |
|---|---|---|
| E0 (plan, źródła, lista plików) | wysłany do koordynatora | raport |
| Zadanie 1: range-spot na ekranie + bramka + testy | **gotowe**, commity d423a6a8 (ekran) i następny (bramka, testy) | CI kod 0: `docs/programista/dowody/cx-ci-d423a6a8.txt` |
| Zadanie 2: teksty | bez nowych kluczy (istniejące `play.*`, D-868); gałąź `sesja-da-teksty` nie istniała | `docs/decyzje/CX.md` |
| Zadanie 3: CI, przegląd D-043 | CI zielone; ścieżki wrażliwe (`apps/mobile/src/data/`) NIE zmieniane, więc przegląd D-043 nie dotyczy | `git diff --stat` |

Zmienione pliki: `apps/mobile/src/features/scenariusz/{wariant.ts,EkranScenariusza.tsx,aktywnoscScenariusza.ts}`, `__tests__/cx-range-spot.test.tsx`, `tools/content-build/src/scenariusze.ts`, `tools/content-build/test/{cm-recenzja-cl,szablon-na-ekranie-ck,cx-range-spot}.test.ts`, `docs/decyzje/CX.md`, ten plik, dowód CI.
Poza listą dozwolonych: `szablon-na-ekranie-ck.test.ts` (PYTANIE do koordynatora wysłane, wariant A).
Otwarte: wiersz „ruch rywala” dla spotów vs-open/call (projekt roli 04); fixture range-spot + draw-call jest w pamięci w `cx-range-spot.test.ts` (bez nowego pliku w fixtures). Następny krok: koordynator scala; szablony SC-04/05/32/33 do `content/` robi rola 06.
