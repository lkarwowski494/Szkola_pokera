# 06-tresci, tryb fix, 2026-11-17: wynik dla 06-tresci-501 (M1-audytor-generalny-002)

Gałąź `claude/sesja-is-naprawy-p1`, baza 5a12a2ad. Commit: jeden, z „[M1-audytor-generalny-002; 06-tresci-501]” w treści (SHA w odpowiedzi do koordynatora; ten plik jest w tym samym commicie). Bez push, bez scalenia.

## E0: środowisko i klasyfikacja
- Linux (chmura), Node i pnpm z repo, sieć: `curl` do beyondgto.com działa (4 strony, kod 0, po 169 komórek `data-tip`). Bez Xcode; zrzuty Expo web nie zrobione (niżej).
- Klasyfikacja: **M** (merytoryczne, hierarchia ADR-24). Plan zatwierdzony przez właściciela w planie M2 (polecenie). Rozstrzygnięcie: opcja (a) z audytu, bez zmiany kodu aplikacji.
- Analogia z Treningiem (D-191): `lkarwowski494/trening` @ 2d97581, plik CLAUDE.md, wiersz 122 (odczyt 2026-11-17): „Przy sprzeczności na tym samym szczeblu podaj część wspólną (przedział, „zwykle”) i pokaż różnicę.”

## Werdykt i źródło (odczyt 2026-11-17 13:52 UTC, surowy HTML przez curl)
- https://beyondgto.com/defense/bb-vs-btn: „Facing a 2.5bb button open in 6-max cash at 100bb, the big blind 3-bets 13% of hands, calls 32% and folds 55%.”; siatka „BeyondGTO solver database · 6-max cash (NL500) · 100bb · vs 2.5bb open · updated Jul 28, 2026”.
- https://beyondgto.com/defense/bb-vs-sb: „Facing a 3bb small blind open in 6-max cash at 100bb, the big blind 3-bets 17% of hands, calls 39% and folds 44%.”
- Odczyt audytu potwierdzony niezależnie: obrona kanonu 49,6% wobec 45,1% (BTN) i 53,0% wobec 55,5% (SB); 16 klas (136 komb.) i 13 klas (116 komb.) z różnicą ≥ 50 pp, `uncertain` puste w 4 spotach BB. Werdykt siatki w tych rękach: SPRZECZNE ze szczeblem 2, a kanon dla spotów BB nie ma szczebla 2 (walidacja „otwarte”, D-153). Kontrola tym samym narzędziem: `btn-vs-co` 20 klas i `sb-vs-btn` 11 klas ≥ 50 pp, wszystkie już w `uncertain` (kryterium projektu działa, brakowało go tylko w BB).

## Poprawka (D-2011…D-2014, `docs/decyzje/IS.md`)
- `content/ranges/spots.yaml`: `uncertain` w `vs-open.bb-vs-btn` (16 klas) i `vs-open.bb-vs-sb` (13 klas), aliasy w `nine.vs-open.bb-*` (D-2011, D-2012); te same pola w 11 nakładkach `content/*/ranges/spots.yaml` (nakładka musi równać się plikowi wspólnemu poza tekstem, `tools/content-build/src/nakladka.ts:6-11`).
- `content/pl/lessons/m4-l2-obrona-bb.md:73`: teraz „dlatego zwykle bronisz nimi chętniej” (wcześniej: «dlatego w siatce bronisz nimi chętniej»); ta sama minimalna zmiana w 11 przekładach (D-2014).
- Trwała kontrola (D-2013): `tools/content-build/test/is-siatki-niepewne.test.ts` + wynik porównania `docs/tresci/porownanie-siatek.json` (listy klas spornych, skrót kanonu, adres, cytat, data; bez tabel źródła) + narzędzie `docs/tresci/narzedzia/siatki-niepewne.py`.
- Rejestr: uwagi R-M4-004 i R-M4-014 w `docs/tresci/rejestr/m0-m4.json`, `docs/tresci/rejestr.json` przeliczony (`scal-rejestr.mjs --przeglad zastępczy`: 0 błędów, 1 uwaga sprzed zmiany). Wpisów `walidacja-solvera.json` nie zmieniam (plik generowany przez `docs/tresci/narzedzia/e1b/walidacja.py`; status spotów BB nadal „otwarte”, bo łączna obrona dalej nie spełnia kryterium).
- Rejestru na Dysku (12/13) nie ruszam: koordynator.

## Dowody przed/po
| Test | Przed | Po | Plik |
|---|---|---|---|
| `is-siatki-niepewne.test.ts` (vitest, tools/content-build) | kod 1: 4 z 9 czerwone (spoty BB 6/9-max: 16 i 13 klas spoza `uncertain`), btn-vs-co i sb-vs-btn zielone | kod 0: 9/9 | `dowody/test-przed.txt`, `dowody/test-po.txt` |
| `python3 -I docs/tresci/narzedzia/siatki-niepewne.py <strony>` | kod 1: 58 klas ≥ 50 pp spoza `uncertain` (16+13, ×2 wersje) | kod 0: 0 | `dowody/porownanie-przed.txt` (z SHA-256 pobranych stron), `dowody/porownanie-po.txt` |
| `pnpm content:build` / `pnpm content:check` | — | kod 0, „Treść aktualna (35 baz)” | `dowody/content-check.txt` |
| `pnpm run ci` | nie uruchamiane przed (baza 5a12a2ad zielona według koordynatora) | kod 0; content-build 936 + 1 expected fail | `dowody/ci-po.txt` (skrót) |

Generator `rangeDecision` nie losuje klas z `uncertain`: istniejący test zachowania `apps/mobile/src/features/drills/__tests__/engine.test.ts:157` („klasy niepewne spotu nie pojawiają się w zadaniach z decyzją”), zielony w CI. Malowanie: `apps/mobile/src/features/drills/__tests__/engine.test.ts:317` (zaliczone w obie strony).

Ryzyko szczątkowe (po poprawce, `dowody/porownanie-po.txt`): w BB vs BTN dwie klasy poniżej progu z inną akcją większościową niż źródło: 98o (kanon 0,06 / źródło 0,51) i A4o (0,38 / 0,69); żadna ręka spoza `uncertain` nie ma akcji większościowej źródła z częstością kanonu < 3,5% (czyli żadna nie dostaje „błędu” za zagranie źródła). W BB vs SB brak.

## Przekazania
- **08 (kod):** brak zmiany. Ocena w trybie gry M13 (`check: solver-spot`, `content/pl/rules.yaml:275` i `:358`) już pomija klasy niepewne: `packages/poker-core/src/grading.ts:326-327` zwraca `null` (ocena „unrated”, test `tools/content-build/test/grading.test.ts:95`); generator scenariuszy pomija je w `packages/poker-core/src/scenario-gen.ts:843`.
- **07 (testy):** wektor = `docs/tresci/porownanie-siatek.json` (D-2013), test w `pnpm test`. Do rozważenia przez 07: test E2E malowania BB z klasą z listy (np. T2s w `vs-open.bb-vs-btn`) zaliczaną w obie strony.
- **09 (przekłady):** przegląd 11 przekładów zdania `content/pl/lessons/m4-l2-obrona-bb.md:73` (zmiana minimalna: bez „w siatce”, dodane „zwykle”; D-2014).
- **Koordynator:** backlog — opcja (b) (siatki BB z opublikowanego rozwiązania z atrybucją; licencja danych do sprawdzenia; decyzja produktowa); rejestr 12/13 na Dysku: D-2011…D-2014.

## Zrzuty
Nie zrobione: zmiana widoczna to jedno zdanie lekcji M4 i kropki „mieszana” w wyniku malowania dla klas z listy; ciężki `pnpm zrzuty:web` pominięty. Krok dla koordynatora albo właściciela (lista kontrolna telefonu): Lekcje → M4 „Obrona dużego blinda” → malowanie siatki: pole T2s pomalowane i niepomalowane daje „mieszana”; ćwiczenie „gram / pas” nie pokazuje rąk z listy D-2011.

## Przegląd D-043
Ścieżka wrażliwa `tools/content-build/` (nowy test). Sesja jako subagent bez narzędzia subagentów: przegląd **nieodbyty**, polecenie w `przeglad-d043-polecenie.md` (uruchamia koordynator).

## Nowe znaleziska (bez naprawy)
- **06-tresci-502 (P2, TRE-08/SP):** siatka w lekcji (blok ```range, `apps/mobile/src/components/RangeGrid.tsx`) nie oznacza klas niepewnych, więc pod zdaniem „zwykle bronisz nimi chętniej” nadal widać kanon (np. 74s pas, 75o obrona). Opcje: (a) rola 04/08: znacznik „ćwiczenia nie oceniają” na polach `uncertain`; (b) rola 06/04/09: zdanie pod siatkami BB w stylu `content/pl/lessons/m4-l1-3bet.md:104` („poza kilkoma rękami, których ćwiczenia nie oceniają”), z przekładem na 11 języków. Rekomendacja: (b) przy najbliższej partii przekładów, (a) do backlogu projektu.

## Kroki właściciela
Brak wymaganych teraz. Weto D-2011…D-2014 możliwe. Test telefonu: krok z sekcji „Zrzuty” przy najbliższym buildzie.

## Kontrola raportu
Wynik `node narzedzia/sprawdz-raport.mjs wynik.md <repo>` (2026-11-17): „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone”, kod 0.
