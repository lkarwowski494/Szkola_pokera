# Stan sesji BQ (rola 06 fix, 06-tresci-001…005 z recenzji BP)
Aktualizacja: 2026-11-10 · Gałąź `sesja-bq-poprawki` · Start 8b600ee (zgodny z poleceniem BQ @ cc8be4b)

## E0 — STOP, raport do koordynatora (czekam na odpowiedź)
- Środowisko: Linux 6.18, Node 22, `pnpm install --frozen-lockfile` kod 0, sieć do źródeł (pokertda.com HTTP 200), push na gałąź roboczą.
- Klasyfikacja: 001–005 = M (ADR-24, rozstrzyga rola 06); P brak.
- Test BP `recenzja-bp-dominacja.test.ts` czerwony (2 failed): asercja `win(A2s) < win(A3o)` jest fałszywa z rachunku, więc nie zazieleni się bez zmiany asercji → PYTANIE do koordynatora.

## Plan
1. 001: R-M3-012 `because` zawężone do rąk w różnych kolorach + zastrzeżenie dla ręki w kolorze z niskim kickerem (pl + 11 języków, `bn.json`); test dokładny/Monte Carlo nowego brzmienia.
2. 002: `dominated` tylko przy drugiej karcie ≤ 9 (warunek R-M3-012, próg `high`); 18 par z dwiema wysokimi kartami → wyjątki nazwane; źródło dominacji broadway → otwarte.
3. 003: `highAllIn` od damy wzwyż; pary z J i 10 → wyjątki nazwane; powód z ceny (R-M11-006) → otwarte.
4. 004: TDA reguła 17 (przeczytana 2026-11-10) do `source`, `sources`, `bn.json`; test trwały.
5. 005: uproszczenie nazwane w R-M3-012 i R-M11-013 oraz „zwykle” w `hand.high`, `hand.dominated`, `hand.highAllIn` (12 języków).
- Wyjątek nazwany: zmiana `hand-reasons.ts` (kod) w sesji roli 06, jak BN (przydział koordynatora).

## Otwarte
- 06-tresci-006 (egzaminy ×6 tylko pl): rola 09.
- M12 ×4 (treść krytyczna, D-027): przeróbka nie w tej sesji.
