# Stan sesji BQ (rola 06 fix, 06-tresci-001…005 z recenzji BP)
Aktualizacja: 2026-11-10 · Gałąź `sesja-bq-poprawki` · Start 8b600ee (zgodny z poleceniem BQ @ cc8be4b)

## Zrobione (E1, każde ID osobny commit; status „naprawione-do-weryfikacji”, „zweryfikowane” nadaje reaudit)
| ID | Commit | Test (przed → po) | Dowody |
|---|---|---|---|
| 06-tresci-001 | b4176b0 | `bq-dominacja-001.test.ts` 2 failed → zielony; BP `recenzja-bp-dominacja.test.ts` → `it.failing.each`, asercje bez zmian (KO-048, wariant A: test asertuje twierdzenie obalone rachunkiem, więc nie może być zielony przy żadnej treści; `it.failing` = trwały dowód fałszu starego brzmienia) | `dowody/bq-001-*.txt` |
| 06-tresci-002 | 93d6f02 | `bq-dominacja-002.test.ts` 1 failed → zielony | `dowody/bq-002-*.txt` |
| 06-tresci-003 | e3b3e8d | `bq-allin-003.test.ts` 1 failed → zielony | `dowody/bq-003-*.txt` |
| 06-tresci-004 | 0ad057e | `bq-zrodla-004.test.ts` 3 failed → zielony | `dowody/bq-004-*.txt` |
| 06-tresci-005 | f4de2f8 | `bq-uproszczenie-005.test.ts` 3 failed → zielony | `dowody/bq-005-*.txt` |
- Na f4de2f8: `pnpm content:build` 0, `pnpm run ci` 0 (apps/mobile 737/737): `docs/tresci/dowody/bq-ci-f4de2f8.txt`.
- 3 ŚR z przeglądu świeżego BN (`stan-bn.md`) = 002, 003, 004 (zrobione wyżej).
- Decyzje do weta: D-610…D-613 (`docs/decyzje.md`); KO-048 (koordynator).
- Wyjątki nazwane: zmiana kodu `hand-reasons.ts` w sesji roli 06 (jak BN, plan przyjęty przez koordynatora); w teście autora BN `hand-reasons.test.ts` przykład T7o → K7o (003); 41 wyjątków nazwanych w `powody-reki-bn.test.ts` (18 z 002, 23 z 003).
- Ścieżki wrażliwe z CLAUDE.md: nietknięte (bez przeglądu subagenta).

## Otwarte
- 002: przeczytane źródło powodu słabości dwóch wysokich kart w różnych kolorach poza zakresem (np. dominacja przez zakres otwierającego); do tego czasu 18 wyjątków nazwanych.
- 003: powód z ceny sprawdzenia (R-M11-006) dla BB przy all-in (nowy klucz tekstu ×12, rachunek tylko dla 5/10/15bb bez ante); do tego czasu 23 wyjątki nazwane.
- Do przeglądu roli 09 (przekład agenta): R-M3-012 `because` i `then`, R-M11-013 `then` i `source`, `drill.range.hand.high/dominated/highAllIn` w 11 językach.
- 06-tresci-006 (egzaminy ×6 tylko pl): rola 09.
- M12 ×4 (treść krytyczna, D-027): przeróbka nie w tej sesji.
- Z BN: [DO USTALENIA] btnVsCo / R-M4-005; NIS „100% (zawsze)” przy 99,9%; brak źródła „połączenie kart jako powód gry”; NIS 005 liczby słowne (backlog).
- Wpisy D-610…D-613 do dokumentów 12/13 na Dysku (koordynator).
