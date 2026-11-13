# Audyt: Programista — Szkoła Pokera — 2026-11-13 (recenzja niezależna HC kodu HB, poprawki 401–403)
Commit: d1f4e99d5b9c6b7a1835602680d9e1291698c013 (zakres `7740eeab..d1f4e99d`) · Tryb: audit · Środowisko: Linux 6.18, Node + pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; jest, tsc, content:build i `pnpm run ci` uruchomione; Xcode/symulator niedostępne (nie dotyczy diffu: logika, schemat, testy).

## Podsumowanie
Werdykt: **PRZYJĄĆ Z UWAGAMI** (D-1585). Trzy poprawki HB zamykają uwagi 401–403 z recenzji GC: ogłoszenie VoiceOver ręki mieszanej ma test zabijający mutant typu G4, linia draw-call formatuje kwotę i pulę według języka, a schemat odrzuca punkt river-catch z marginesem poniżej 0,01. Własne mutanty: 401 3/3 i 403 3/3 zabite; 402 3/5 — przeżyły mutanty „sprawdzaj tylko poziom łatwy” i „zawsze `margins[0]`”, bo test ma szablon z jednym poziomem i jednym punktem (08-programista-404, NISKIE, nie blokuje). Próg 0,01 jest matematycznym minimum (sonda: 0 kolizji procentów na 132,9 mln przypadków, przy 0,009 — 13 872), nie zmienia treści merytorycznej (ADR-24), przyjmuje wszystkie 187 szablonów i szkiców, a bazy treści są identyczne bajtowo (D-043). `pnpm run ci` kod 0 (`dowody/hc-ci-d1f4e99.txt`).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-404 | P2 (NISKIE) | D | Test bramki 402 sprawdza tylko poziom łatwy i punkt 0; regres pętli poziomów lub indeksu przeszedłby CI | otwarte |

## Linia bazowa i założenia
Linia bazowa z kodu przed odczytem raportu HB: zdanie river-catch (`apps/mobile/src/features/scenariusz/liczby.ts:49-56`) liczy kierunek z wartości dokładnych i pokazuje procenty `formatujProcent` bez miejsc po przecinku (`packages/jezyki/src/formaty.ts:18-19`, Intl, zaokrąglenie halfExpand); generator przyjmuje kandydata, gdy `margin > 0 && margin >= m.min` (`packages/poker-core/src/scenario-gen.ts:547-549`), a `m` to `margins[i]` albo `marginMin` — ta sama kolejność co w nowym `superRefine` (`packages/content-schema/src/index.ts:808`). Schemat jest pierwszym etapem budowania treści (`tools/content-build/src/scenariusze.ts:45`) i odczytu w aplikacji (`apps/mobile/src/data/content/repo.ts:257`), więc bramka działa w obu miejscach; bramka build nadal wymaga jawnego marginesu > 0 dla river-catch (`tools/content-build/src/scenariusze.ts:222`), więc brak marginesu nie omija progu.

Wymiary pokrycia:
- Ścieżki zapisu: diff nie dotyka danych użytkownika — sprawdzone, brak.
- Obsługa błędów: nowy błąd schematu ma ścieżkę i komunikat z numerem decyzji i poziomem; w aplikacji wiersz niezgodny ze schematem daje błąd odczytu (`apps/mobile/src/data/content/repo.ts:257-258`), ale bazy i kod budowane są razem (35/35 baz identycznych), więc rozjazdu nie ma — sprawdzone, brak.
- Typy na granicach: `superRefine` działa na sparsowanym `t`; brak `as` w kodzie produkcyjnym diffu; `as unknown as SesjaScenariusza` tylko w teście 403 — sprawdzone, brak.
- System projektowy: diff bez zmian wyglądu — nie dotyczy.
- i18n: 403 to właśnie formatowanie liczb według języka; test pl „12,5 bb” — ok.
- Wydajność: `superRefine` iteruje po ≤ 2 decyzjach × 3 poziomy — brak.
- Testy na właściwym poziomie: 401 przez prawdziwy ekran i szpieg `announceForAccessibility`; 403 przez `zdaniaLiczb` na prawdziwej bazie testowej; 402 na schemacie — luka pokrycia poziomów i indeksu: 08-programista-404.
- Dostępność: 401 dotyczy ogłoszenia VoiceOver; test sprawdza dosłowne zdanie dla wyboru zgodnego i niezgodnego — ok.
- Liczby konfiguracyjne: `RIVER_CATCH_MARGIN_MIN` jedna stała eksportowana ze schematu, użyta w teście — ok.

Soczewki: recenzent szukający ścieżki bez testu (→ mutanty, 404); użytkownik VoiceOver (→ 401 ok); programista czytający moduł pierwszy raz (komentarz przy stałej podaje dowód monotoniczności); użytkownik z przerwanym zapisem (nie dotyczy). Wzorzec najlepszych: Trening — szpieg ogłoszeń (lkarwowski494/trening @ 2d97581, plik `tests/m3-p2-matrix.test.tsx`, linia 45; odczyt 2026-11-13), formatowanie liczb w tekstach przez locale (Trening `lib/units.ts`, linia 88, `fmtNum`), limity wejścia w jednym module (Trening `lib/loads.ts`, linia 30, `LOAD_LIMITS`). Zmian w rejestrze założeń nie proponuję.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/content-schema/src/index.ts` (stała, superRefine) | tak | odczyt kodu, mutanty H402a–e (`dowody/hc-mutanty.txt`), sonda progu (`dowody/hc-sonda-402.txt`) |
| `apps/mobile/src/features/scenariusz/liczby.ts` (linia draw-call) | tak | mutanty H403a–c (`dowody/hc-mutanty.txt`) |
| `EkranScenariusza.tsx` ogłoszenie (poza diffem, cel testu 401) | tak | mutanty H401a–c (`dowody/hc-mutanty.txt`) |
| 3 testy w `__tests__/` | tak | odczyt, przebieg na mutantach i w CI |
| Szablony `content/` i szkice `docs/tresci/szablony-robocze` vs nowy schemat | tak | 187/187 przyjęte, 4 z river-catch (`dowody/hc-szkice-schemat.txt`) |
| Bramka w `content:build` (koniec-do-końca) | tak | szablon 0,005 → kod 1 (`dowody/hc-build-river-0005.txt`) |
| Bazy treści D-043 | tak | 35/35 identyczne (`dowody/hc-bazy-d043.txt`) |
| Pełna weryfikacja | tak | `pnpm run ci` (`dowody/hc-ci-d1f4e99.txt`) |
| Rejestr decyzji HB (D-1575…D-1577), analogia Trening, ADR-24 | tak | odczyt `docs/decyzje/HB.md`, klon Treningu @ 2d97581 |
| Telefon / VoiceOver na urządzeniu | nie | środowisko Linux; ogłoszenie sprawdzone testem ze szpiegiem |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-hb-d1f4e99.md . docs/programista --rola 08-programista` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”, kod 0. `git diff --cached` przed commitem: tylko `docs/programista/**` i `docs/decyzje/HC.md`.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy (bramka schematu, zdanie liczb, ogłoszenie) | ok poza pokryciem poziomów/indeksu: 08-programista-404 |
| DEV-02 | dotyczy | 3/3 commity poprawek (4282bce2, 62e6e124, b7764f5f) zmieniają test w tym samym commicie; czerwień przed poprawką w `dowody/hb-401.txt`, `hb-402.txt`, `hb-403.txt` i potwierdzona własnymi mutantami |
| DEV-03 | dotyczy | ok: brak `.skip`/`.only`; HB usunął własną, nieopublikowaną asercję warunkową (hb-402.txt) — nie osłabia istniejącego testu |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 (`dowody/hc-ci-d1f4e99.txt`) |
| DEV-05 | nie dotyczy (diff bez zapisu danych użytkownika) | — |
| DEV-06 | nie dotyczy (brak migracji i kopii w diffie) | — |
| DEV-07 | dotyczy (`?? b?.marginMin`) | ok: brak marginesu zostaje `undefined`, nie zgadniętą liczbą; wymóg > 0 w bramce build |
| DEV-08 | nie dotyczy (brak dat) | — |
| DEV-09 | dotyczy (schemat = granica treści) | ok |
| DEV-10 | dotyczy (komunikat błędu schematu) | ok |
| DEV-11 | nie dotyczy (brak zmian interfejsu) | — |
| DEV-12 | dotyczy (403) | ok |
| DEV-13 | dotyczy (próg 0,01) | ok: jedna stała, uzasadniona rachunkiem; progi „> 0” w `tools/` bez zmian (poza zakresem HB) |
| DEV-14 | dotyczy | ok: diff bez sekretów (przegląd diffu) |
| DEV-15 | nie dotyczy | — |
| DEV-16 | dotyczy (ułamek vs pp) | ok: stała jako ułamek, komentarz „0,01 = 1 pp” |

## Znaleziska (szczegóły)

### 08-programista-404 · Test bramki 402 sprawdza tylko poziom łatwy i punkt 0; regres pętli poziomów lub indeksu przeszedłby CI
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (NISKIE wg CLAUDE.md „Audyty i wydania” pkt 1: kod dziś poprawny, brak strażnika; nie blokuje)
- Realność: brzegowy (regres wymaga zmiany pętli w `superRefine`; poziomy średni i trudny to te z najmniejszymi marginesami w szkicach SC-24/31: 0,02–0,03)   · Pewność: wysoka
- Rodzaj: D
- Dowód: fixture testu ma jeden poziom i jeden punkt (`apps/mobile/src/features/scenariusz/__tests__/hb-river-catch-margines-402.test.ts:8`); mutant H402e (pętla tylko po `latwy`, `packages/content-schema/src/index.ts:806`) i H402d (`margins[0]` zamiast `margins[i]`, linia 808) przeżywają z wynikiem 5 passed / 5 total (`dowody/hc-mutanty.txt`).
- Mechanizm: test bramki na minimalnym fixture bez wariantów wymiarów, po których iteruje kod; `grep -n "levels:" apps/mobile/src/features/scenariusz/__tests__/hb-river-catch-margines-402.test.ts` → 1 trafienie (`['latwy']`).
- Powraca: nie → trwała kontrola: przypadki w teście 402
- Wzorzec lub źródło: rola 08 „Dobry test” (granice i wymiary); wynik mutantów H402d/H402e
- Kroki w aplikacji: brak bezpośrednich; po regresie szablon river-catch z `trudny.marginMin` 0,005 wszedłby do treści, a gracz zobaczyłby „30%” i „30%” ze zdaniem „blefów jest mniej”.
- Opcje: (a) dopisać w teście 402: poziom `trudny` z `marginMin` 0,005 odrzucony; szablon dwupunktowy (np. draw-call + river-catch) z `margins[1].min` 0,005 odrzucony i `margins[0].min` 0,005 dla punktu nie-river-catch przyjęty — mały diff, zabija oba mutanty; (b) zostawić — tańsze, ale bramka bez strażnika na wymiarach, po których iteruje. Rekomendacja: (a) przy najbliższej sesji 08.
- Test akceptacyjny: `python3 docs/programista/dowody/hc-mutanty-skrypt.txt <worktree> H402d H402e` → oba ZABITE.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Ścieżka błędu schematu dla `margins` nie zawiera indeksu (`['bounds', l, 'margins']`, `packages/content-schema/src/index.ts:810`); komunikat podaje numer decyzji, więc autor treści trafi — uznaję za styl, nie znalezisko.
- Test bramki 402 leży w `apps/mobile`, nie w `tools/content-build/test` (zakaz `tools/` dla HB, sesja HA). Ścieżkę budowania sprawdziłem ręcznie: `content:build` z szablonem river-catch `marginMin` 0,005 kończy się kodem 1 z komunikatem schematu (`dowody/hc-build-river-0005.txt`), więc test akceptacyjny 402 z recenzji GC jest spełniony; stałego testu w `tools/` brak. Do decyzji sesji HA, czy dopisać przypadek w `ef-river-catch-bramka.test.ts`.

## Co działa dobrze i należy zachować
- Próg 0,01 uzasadniony rachunkiem i ciasny: przy 0,009 sonda daje 13 872 kolizji, przy 0,01 — 0 (`dowody/hc-sonda-402.txt`); szkic 06 zakładał ≥ 0,02 opisowo (`docs/tresci/liczby-river-catch-defend.md:14`), bez wymogu.
- Kolejność `margins[i] ?? marginMin` w schemacie jak w `inMargin` generatora — jedna semantyka.
- Test 401 wzorowany na Treningu i sprawdzający dosłowne zdanie, a nie samo wywołanie szpiega.
- Commity poprawek osobne na uwagę, z testem w tym samym commicie i dowodem czerwieni.
- Brak wpływu na treść: 187/187 szablonów przyjętych, 35/35 baz identycznych.

## Decyzje dla właściciela
Brak decyzji produktowych. Do weta: D-1585 (werdykt), D-1586 (próg 0,01 zgodny z ADR-24, nie zmienia treści merytorycznej), D-1587 (analogie Treningu uzupełnione dla D-1575 i D-1577) — `docs/decyzje/HC.md`.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-404`
