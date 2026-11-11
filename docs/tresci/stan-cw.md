# Stan sesji CW (rola 06-tresci, tryb fix): ŚR-005, CW-1, NIS-003

Gałąź `sesja-cw-tresci`, start `46197812`. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/CW.md` @ 26918d9f, zadanie 3 (CW-1) dodane przez koordynatora po E0. Stan na 2026-11-11. Decyzje: `docs/decyzje/CW.md` (D-856, D-857, D-858; pula D-856…D-865, wolne D-859…D-865), wszystkie do weta.

## E0 (przyjęte przez koordynatora)
Środowisko: Linux, Node 22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0, tożsamość git z CLAUDE.md. Kontrola transportu promptu (sha256) niewykonalna z wnętrza sesji (przyjęte jako niesprawdzone). Klasyfikacja: ŚR-005 M, NIS-003 M, CW-1 M.

## E2: dowody

| ID | Test | Przed | Po | Commit |
|---|---|---|---|---|
| ŚR-005 (06-tresci-005) | `tools/content-build/test/cw-sc11-oesd.test.ts` (wyrocznia OESD z rang na 22 100 flopach, 400 ziaren SC-11 obu poziomów, granice w 12 językach) | 6 czerwonych, m.in. „ziarno 1: flop 23,10,45 pozwala na OESD, a oczekiwana akcja to bet-small” (`docs/tresci/dowody/cw-sr005-test-przed.txt`) | 8/8 | `bbd574ed` (struktura: pole `oesdPossible`), `1cf3f601` |
| CW-1 (nowe, D-858) | ten sam plik, opis „CW-1 (D-858)” | czerwony: przypadek R-M5-007 pasował do flopów z możliwym OESD (ten sam dowód „przed”) | zielony | `4ddb7534` |
| NIS-003 (08-programista-003) | `tools/content-build/test/cw-nadkarty.test.ts` (zdanie z `{{n:pair.outs.per-rank}}` w 14 wyjaśnieniach × 12 języków; wyrocznia: odpowiedź z outami + 3 na rangę wyższą od stołu = odpowiedź wariantu, ziarna 1–300) | 12 czerwonych (brak zdania), wyrocznia już zielona (`docs/tresci/dowody/cw-nis003-test-przed.txt`) | 22/22 | `dd04f24f` |

- Źródło ŚR-005 i CW-1 otwarte w sesji: `docs/tresci/dowody/cw-zrodlo-gtow-flop-heuristics-ip.txt` (HTTP 200, 2026-11-11).
- Kontrola trwała CV: `generator-odciski.test.ts` przeliczony przy `GENERATOR_WERSJA` 2→3; zmieniły się tylko `wersja` i `sc-11|sredni`; zielony także bez zmiany lekcji (spójność `1cf3f601`) i po NIS-003 (wynik generatora bez zmian). Wzorzec ŚR-001 w `packages/poker-core/test/scenario-gen.test.ts` z wersją 3, odcisk bez zmian.
- Rachunek recenzji CQ poprawiony: 90 z 138 układów rang wysokich flopów półpołączonych pozwala na OESD, nie 84 (pominięte okno 2-3-4-5).
- Przegląd D-043 (subagent w świeżym kontekście, diff `packages tools/content-build/src` 46197812..HEAD): „brak uwag”; uwaga brzegowa (8 układów flopów połączonych, `oesdPossible` ostrożnie true) zapisana w D-856.
- Rejestr: R-M5-007 (+2 źródła z odczytem 2026-11-11, uproszczenie, uwagi), R-M7-007 i R-M7-008 (uproszczenie NIS-003); `scal-rejestr.mjs --przeglad zastępczy`: 0 błędów, 0 uwag.
- Zrzuty ekranu: brak (środowisko bez symulatora; zmiana widoczna tylko jako dodatkowe zdanie wyjaśnienia i inny rozkład flopów).
- `pnpm run ci`: `docs/programista/dowody/cw-ci-<sha8>.txt` (wynik niżej po zakończeniu).

## Przekazania
- Rola 09: przegląd przekładów zdania NIS-003 w 11 językach (sc-01/02/03/19, ostatnie zdanie każdego wyjaśnienia draw-call). Klucze do przekładu z zadania 3: brak (teksty pl bez zmian, tylko `when`).
- Rola 04: brzmienie zdania NIS-003 (pl) do akceptacji w ramach przewodnika głosu; „Liczby” bez zmian.
- Do backlogu: R-M5-007 w trybie gry nie ma przypadku dla wysokich flopów z możliwym OESD (boty: rozmiar z mokrości); ewentualny przypadek R-M5-008 wymaga opcji „rzadziej, większym” w zadaniu (produkt, rola 04).
- Uwaga do R-M2-005 (`docs/tresci/rejestr/m0-m4.json`, poza ścieżkami sesji): to samo uproszczenie NIS-003 dotyczy punktów flopu sc-01/02/19; wpis do uzupełnienia przy najbliższej sesji z dostępem do tego pliku.

## Następny krok
Statusu „zweryfikowane” nie nadaję: reaudit ŚR-005, CW-1 i NIS-003 innym weryfikatorem.
