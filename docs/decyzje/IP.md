# Decyzje sesji IP (IL-001: SC-18 łatwy tylko z kickerem ≥ Q)

## D-1965 · 2026-11-17 · Generator turn-action czyta kickerMin / kickerMax
- Decyzja: w `packages/poker-core/src/scenario-gen.ts` (gałąź `turn-action`) dla pary `top` kicker poza `[kickerMin; kickerMax]` odrzuca wariant (`return null`), tak samo jak `spr-call` (:1199) i filtr kickera turn-bet (D-1256, `TURN_BET_KICKER_MIN`). Nadpara nie ma kickera i nie jest filtrowana. Źródło decyzji: KO-123 (koordynator).
- Odrzucone: osobna stała `TURN_ACTION_KICKER_MIN` w kodzie (kryterium treści siedzi w `bounds`, jak w spr-call; stała ukryłaby je przed autorem treści).
- Analogia: Trening nie ma tego rodzaju punktu (nie sprawdzano szerzej); wzór wewnętrzny: spr-call i turn-bet.

## D-1966 · 2026-11-17 · `kickerMin: Q` w SC-18 łatwy, 12 plików
- Decyzja: `bounds.latwy` w `content/*/scenarios/sc-18.yaml` (12 języków; bounds są w każdym pliku, nie we wspólnym) dostaje `kickerMin: Q`. Wyjaśnienia bez zmian (KO-123). `pnpm content:build` przebudował bazy.
- Dowód: red na ef75f613 `docs/programista/dowody/ip-red-ef75f613.txt`: 194/300 ziaren z oczekiwanym bet-big ma kicker < Q (65%, w poleceniu ok. 41%: rozbieżność nazwana, test sprawdza własność, nie odsetek); green po zmianie `tools/content-build/test/ip-sc18-kicker.test.ts` (12 języków × 300 ziaren) i `ho-turn-action.test.ts`.

## D-1967 · 2026-11-17 · GENERATOR_WERSJA 6 → 7
- Decyzja: zmiana wyniku generatora pod tym samym ziarnem (zmienia się sc-18) wymaga podniesienia wersji (kontrola ŚR-001, D-731, precedens: D-1256 → 5). Wzorzec w `scenario-gen.test.ts` zaktualizowany w tym samym commicie (odcisk wzorca bez zmian, zmiana tylko numeru wersji).
- Skutek: wpisy historii wariantów z wersją 6 są niezgodne z bieżącą (zachowanie zaprojektowane w `packages/domena/src/wariant.ts:13`); dotyka ścieżki wrażliwej `packages/domena`, ale bez zmiany kodu tam; poza właścicielem brak użytkowników.
- Odrzucone: bez podniesienia wersji (historia pokazywałaby „to samo rozdanie” z innym rozdaniem, błąd danych).

## D-1968 · 2026-11-17 · Pojemność SC-18 łatwy
- Pomiar (5000 ziaren, pl, różne odciski): przed 4843, po 4570 (−5,6%). Bramka `POJEMNOSC_MIN` = 40 odcisków w 2000 losowań (`tools/content-build/src/scenariusze.ts:524`): spełniona z dużym zapasem; bez PYTANIA.
