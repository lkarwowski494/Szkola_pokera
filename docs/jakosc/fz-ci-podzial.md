# FZ: podział joba CI `check` na równoległe części (KO-101, WG-18)
Rola 07-jakosc, tryb build · sesja FZ · 2026-11-13 · gałąź `claude/sesja-fz-ci` od `claude/sleepy-brahmagupta-2065nu` @ 1d2ef3bf · decyzje: `docs/decyzje/FZ.md` (D-1520, D-1521)

Problem: CI 43343782691 na 1d2ef3bf anulowane po `timeout-minutes: 15` joba `check` (krok `pnpm run ci`, 01:17:43→01:32:41). Poprzedni zielony przebieg 43337711819 na ac2ed2e3: krok `pnpm run ci` 12 min 28 s (00:31:39→00:44:07), job 12 min 50 s. Zakres: przyspieszyć przy tym samym zestawie kontroli; limitu nie podnosimy.

## 1. Pomiar (zad. 1)
Lokalnie: kontener Linux, 4 rdzenie (`nproc`), Node v22.23.4, pnpm 10.28.0, komendy kolejno, jedna naraz, SHA 1d2ef3bf. CI: log joba 131598010061 (przebieg 43337711819, ac2ed2e3, ubuntu-latest), znaczniki czasu kroków `>`.

| Komenda skryptu `ci` | Lokalnie 1d2ef3bf | CI ac2ed2e3 | Kod |
|---|---|---|---|
| `pnpm typecheck` | 19 s | 18 s | 0 |
| `pnpm test` (`pnpm -r --if-present test`) | 575 s | 646 s | 0 |
| `pnpm test:skrypty` | 20 s | 18 s | 0 |
| `pnpm test:kontrole` | 2 s | 2 s | 0 |
| `pnpm k08` | 1 s | 1 s | 0 |
| `pnpm i18n:kod` | 1 s | 1 s | 0 |
| `pnpm content:check` | 74 s | 60 s | 0 |
| `pnpm tresci:rejestr` | 1 s | 1 s | 0 |
| `pnpm tresci:el-kontrola` | 1 s | <1 s | 0 |

`pnpm test` w rozbiciu na pakiety (czas `Duration`/`Time` z wyjścia narzędzia; `pnpm -r` uruchamia je w kolejności topologicznej, więc w praktyce łańcuchem):

| Pakiet | Lokalnie | CI ac2ed2e3 | Testy |
|---|---|---|---|
| `@szkola/content-build` | 329 s | 382 s | 748 + 1 expected fail |
| `@szkola/poker-core` | 135 s | 135 s | 310 |
| `@szkola/mobile` (jest) | 62 s | 75 s | 1395 |
| `@szkola/preflop-solver` | 48 s | 52 s | 44 |
| `@szkola/domena` | 9 s | 12 s | 347 + 1 expected fail |
| `@szkola/postep` | 7 s | 11 s | 160 |
| `@szkola/jezyki` | 1 s | 1 s | 144 |
| `@szkola/srs` | 1 s | 1 s | 21 |

Wniosek: `pnpm test` to ~95% czasu, więc podział tylko po komendach skryptu nie daje zapasu (najdłuższy job nadal ~11 min w CI). Podział po pakietach: najdłuższa część to sam content-build.

## 2. Podział (zad. 2, D-1520)

| Job | Komendy | Szacunek CI (z ac2ed2e3) | Pomiar osobno, świeży worktree (lokalnie) |
|---|---|---|---|
| `ci-kontrole` | typecheck, test:skrypty, test:kontrole, k08, i18n:kod, content:check, tresci:rejestr, tresci:el-kontrola | ~1 min 40 s + setup | 121 s, kod 0 |
| `ci-testy-tresci` | `pnpm --filter @szkola/content-build test` | ~6 min 30 s + setup | 348 s, kod 0 |
| `ci-testy-silnik` | `--filter @szkola/poker-core test`, `--filter @szkola/preflop-solver test` | ~3 min 10 s + setup | 204 s, kod 0 |
| `ci-testy-aplikacja` | `--filter` mobile, domena, postep, srs, jezyki `test` | ~1 min 40 s + setup | 81 s, kod 0 |
| `check` | `needs` na 4 części, `if: always()`, `jq -e`: każda `success` | <10 s | — |

Każda część: `timeout-minutes: 15`, checkout + pnpm + node 22 + `pnpm install --frozen-lockfile` jak dotąd (setup ~15 s w 43343782691). Pomiar „osobno” (skrypt: worktree z HEAD, install, komendy części) dowodzi, że części nie zależą od kolejności `pnpm -r` ani od plików tworzonych przez inną część. Liczby testów w częściach = liczby z `pnpm test` (tabela wyżej); `test:skrypty` 202 → 204 (dwa nowe testy z zad. 3).

Zapas: najdłuższa część ~6,5 min w CI wobec 15 min. Rośnie z liczbą języków (content-build). Następny krok, gdy zapas spadnie poniżej ~5 min: osobna decyzja (np. `vitest --shard` w content-build, co zmienia komendy, albo podział plików testów).

Koszt: repo publiczne, standardowe runnery bez opłat (strategia.md §5). Minuty runnera rosną o ~3× setup (~45 s) na przebieg; czas ścienny spada z ~12,5 min do ~6,5–7 min.

## 3. Kontrola rozjazdu (zad. 3, D-1521)
`tests/narzedzia/workflowy.test.mjs`, dwa testy „ci.yml: części check…”. Czerwień na 7 celowych mutacjach (usunięta komenda, niepełne rozpisanie `pnpm test`, komenda tylko w `package.json`, dubel, brak `always()`, `continue-on-error`, limit 20): `docs/jakosc/dowody/fz-rozjazd-mutacje.txt`.

## 4. Dowody (zad. 4)
- `pnpm run ci` lokalnie: `docs/jakosc/dowody/fz-ci-<sha>.txt`.
- CI na końcowym SHA kodu fb4e6e0f: przebieg 43389167128, wszystkie 7 jobów `success` (odczyt `list_workflow_jobs` i logów jobów, 2026-11-13 08:06 UTC). Commit z tym zapisem ma `[skip ci]` (tylko ten plik), więc ostatnie SHA z CI to fb4e6e0f.

| Job | Czas joba (start→koniec) | Krok testów | Testy (CI fb4e6e0f) | Przed (CI ac2ed2e3) |
|---|---|---|---|---|
| `ci-kontrole` | 1 min 37 s | content:check 45 s, typecheck 15 s, test:skrypty 15 s | skrypty 204, kontrole 35 | skrypty 202, kontrole 35 |
| `ci-testy-tresci` | 8 min 01 s | content-build 7 min 40 s (vitest 459,66 s) | 748 + 1 expected fail | 748 + 1 expected fail |
| `ci-testy-silnik` | 4 min 13 s | poker-core 2 min 47 s, preflop-solver 1 min 03 s | 310; 44 | 310; 44 |
| `ci-testy-aplikacja` | 2 min 15 s | mobile 1 min 39 s, domena 9 s, postep 5 s, srs 1 s, jezyki 1 s | 1395; 347 + 1 ef; 160; 21; 144 | 1395; 347 + 1 ef; 160; 21; 144 |
| `check` | 2 s (start 08:03:01 po częściach) | `jq -e`: 4 × success | — | — |
| `rachunki`, `akceptacja` (bez zmian) | 53 s; 31 s | — | — | — |

Całość przebiegu: 07:54:56 → 08:03:03 = **8 min 07 s** (przed: 43337711819 12 min 54 s; 43343782691 anulowany po 15 min). Najdłuższy job 8 min 01 s wobec limitu 15 min: zapas ~7 min. Uwaga: content-build w CI urósł z 382 s (ac2ed2e3, w łańcuchu) do 460 s (fb4e6e0f, osobny runner; zawiera 13 nowych plików locale z FY) — przy tym tempie wzrostu zapas wystarczy na kilka kolejnych fal przekładu; próg ponownej decyzji: krok content-build > 10 min.
- Różnica liczby testów przed/po: tylko `test:skrypty` +2 (testy D-1521); reszta identyczna.

## Stan
- [x] zad. 1 pomiar · [x] zad. 2 `ci.yml` · [x] zad. 3 test + mutacje · [x] zad. 4 CI na gałęzi (43389167128) · [x] zad. 5 `docs/decyzje/FZ.md`
