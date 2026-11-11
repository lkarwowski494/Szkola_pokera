# Stan sesji CW (rola 06-tresci, tryb fix): ŚR-005 i NIS-003

Gałąź `sesja-cw-tresci`, start `46197812`. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/CW.md` @ 26918d9f. Stan na 2026-11-11.

## E0 (plan, czeka na koordynatora)

Środowisko: Linux, Node 22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0, tożsamość git z CLAUDE.md ustawiona lokalnie. Kontrola transportu promptu (sha256): niewykonalna z wnętrza sesji (model nie ma dostępu do surowych bajtów wiadomości); `origin/koordynacja` nie ma pliku promptu do porównania.

| ID | Rodzaj | Plan |
|---|---|---|
| ŚR-005 (06-tresci-005) | M | Źródło szczebla 2 otwarte dziś (GTO Wizard, Flop Heuristics: IP C-Betting in Cash Games, HTTP 200, odczyt 2026-11-11): klasy „Disconnected” (33% często), „OESD possible” (66% częściej, rzadszy c-bet), „Connected”; OESD = cztery kolejne rangi domykane z obu końców, 8 outów. Decyzja (D-856): SC-11 średni tylko na flopach półpołączonych bez możliwego OESD (zostają flopy z samym gutshotem, które w podziale źródła są „Disconnected”). Nowe pole `oesdPossible` w `FlopTexture` i `TextureFilter` (poker-core, content-schema), granica poziomu w 12 plikach `sc-11.yaml` (bez zmiany tekstów, więc bez przekładów), `GENERATOR_WERSJA` 2→3, odciski przeliczone, test `cw-sc11-oesd.test.ts` z wyrocznią z rang (przegląd wszystkich rąk). Przegląd D-043 subagentem. |
| NIS-003 (08-programista-003) | M | Da się samą treścią: generator gwarantuje tę samą odpowiedź przy outach z nadkartami (`packages/poker-core/src/scenario-gen.ts:543-551`), więc zdanie warunkowe „liczysz tylko outy drawa; karta wyższa od stołu, jeśli ją masz, daje jeszcze po {{n:pair.outs.per-rank}} niepewne outy na wysokość, ale tu nie zmienia odpowiedzi” jest prawdziwe dla każdego wariantu. 14 wyjaśnień draw-call (sc-01/02/03/19) × 12 języków, test `cw-nadkarty.test.ts` (znacznik w każdym wyjaśnieniu i języku + wyrocznia odpowiedzi z nadkartami). D-857. „Liczby” na ekranie bez zmian (zgodne z nazwanym uproszczeniem). |

Nowe znalezisko (poza dozwolonymi ścieżkami): przypadek 1 zadania `m5.l3.c-btn` (`content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:19-21`) ocenia wysokie flopy półpołączone z możliwym OESD jako R-M5-007 „często i mało”, sprzecznie z R-M5-008 i źródłem.

## Następny krok
Po odpowiedzi koordynatora: E1 ŚR-005, potem NIS-003.
