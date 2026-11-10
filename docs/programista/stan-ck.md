# Stan sesji CK (08-programista, fix) — 2026-11-10
Gałąź `sesja-ck-ekran`, start f3f548f. Wszystkie trzy zadania gotowe, `pnpm run ci` kod 0 (docs/programista/dowody/ck-ci-93ccfba.txt).

| ID | Commit | Test (przed → po) |
|---|---|---|
| 08-programista-001 (WYS) | 7c7b7ff | `recenzja-ch-stos.test.ts` jako `it`: 3 z 4 czerwone → 4/4 zielone |
| 08-programista-002 (ŚR) | c47c337 | `szablon-na-ekranie-ck.test.ts` (content-build), `szablon-allin-ck.test.ts` (mobile: czerwony przed 001, zielony po) |
| 08-programista-004 (NIS) | 93ccfba | `wybor-pusta-lista-ck.test.tsx`; mutacja gałęzi → pada |

Poza zakresem (CJ): 08-programista-003. Otwarte: obsługa range-spot na ekranie (D-755), zachowanie wznowienia po zmianie wariantów dla zapisanych ziaren [DO USTALENIA, raport CH „Do sprawdzenia”].
Przegląd ścieżki wrażliwej (`tools/content-build/`) w świeżym kontekście: nieodbyty, do uruchomienia przez koordynatora: `git diff f3f548f..HEAD -- tools/content-build/src`.
