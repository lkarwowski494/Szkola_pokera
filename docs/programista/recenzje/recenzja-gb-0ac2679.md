# Audyt: Programista — Szkoła Pokera — 2026-11-13 (recenzja niezależna kodu GB)
Commit recenzowany: 0ac2679 (zakres `git diff 40e66ab4..0ac2679`, 24 pliki) · Tryb: audit (sesja GC) · Środowisko: Linux, Node 22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; jest/vitest działają; brak macOS, symulatora i react-native-web (zrzuty 390 / 320 AX5 i VoiceOver nie sprawdzone).

## Podsumowanie
Kod GB robi to, co mówią specyfikacje: ręka mieszana (FW §3) daje „Też dobrze” i „Lepiej: a albo b”, zdania „Liczby” river-catch/defend liczą z wariantu tymi samymi wzorami co szkic 06 (D-1465), zdanie zakresu river-value (FW-01) pokazuje tylko `calls`, stos stołu idzie przez `formatujLiczbe` (KO-102). D-1536 nie zmienia żadnego wariantu obecnej treści ani szkiców (porównanie wyjścia generatora przed/po: identyczne skróty), a bazy treści przed i po są identyczne bajtowo (D-043). Z 12 poprawnych mutantów 11 zabitych; przeżył jeden: ogłoszenie czytnika ekranu przy ręce mieszanej nie ma testu, choć kryterium 3 FW §3 go wymaga (kod jest poprawny, brakuje strażnika). **Werdykt: PRZYJĄĆ Z UWAGAMI** (D-1550); blokery KRYT/WYS: 0.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-401 | P2 (ŚR) | D | Ogłoszenie VoiceOver werdyktu ręki mieszanej bez testu (mutant G4 przeżył) | otwarte |
| 08-programista-402 | P2 (NISKIE) | D | Zdanie river-catch może pokazać równe procenty z „blefów więcej”, gdy szablon ma marginMin < 0,01 | otwarte |
| 08-programista-403 | P2 (NISKIE) | D | `scenario.numbers.line`: kwota i pula bez `formatujLiczbe` (dziś zawsze całkowite) | otwarte |

## Linia bazowa i założenia
Najpierw kod i testy (diff, specyfikacje `docs/design/fw-river-value-i-mieszana.md`, `docs/tresci/liczby-river-catch-defend.md`, schemat `margins`), dopiero potem `docs/decyzje/GB.md` i `plan-08.md`.

Wymiary pokrycia:
- Ścieżki zapisu: diff nie dotyka zapisu danych użytkownika (brak zmian w `packages/postep`, `src/data`); sprawdzone, brak.
- Obsługa błędów: nowe funkcje są czyste; `zgodneAkcje`/`inneZgodne` przy braku zgodnych wracają do `poprawnaAkcja` (`apps/mobile/src/features/scenariusz/wariant.ts:401-403`); brak zgadniętych wartości. Sprawdzone, brak.
- Typy na granicach: dane wariantu z generatora (typowane), bez nowych `as` w kodzie aplikacji; `as unknown as` tylko w testach. Sprawdzone, brak.
- System projektowy: nowy blok `tez_dobrze` używa `BlokDlaczego` z `accessibilityRole="header"` i stylu „dobrze” (`apps/mobile/src/features/scenariusz/komponenty.tsx:205-209`), zdanie zakresu `styl.tresc`/`tk.ink` jak w specyfikacji. Sprawdzone, brak.
- i18n: wszystkie nowe teksty przez `t()` (`scenario.or`, `verdict.yoursGoodAlso`, `why.alsoGood`, `numbers.riverCatch*`, `numbers.defend`, `riverValue.calls/sep`) — każdy klucz w 13 słownikach; `pnpm i18n:kod` w CI bez błędu. Liczby przez `formatujLiczbe`/`formatujProcent`; wyjątek pre-istniejący: 403.
- Wydajność: `wariantKlasy` w teście iteruje ziarna; w kodzie aplikacji brak pętli zapytań. Sprawdzone, brak.
- Testy na właściwym poziomie: logika (`bloki`, `zdaniaLiczb`, generator) w Node; ekran przez prawdziwy `PrzebiegScenariusza`/`KoniecScenariusza`. Luka: ogłoszenie (401).
- Dostępność: blok „Też dobrze” jako nagłówek; ogłoszenie używa tego samego zdania co ekran (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:234`) — poprawne w kodzie, bez testu.
- Liczby konfiguracyjne: brak nowych progów; margines river-catch to dana szablonu.

Soczewki: recenzent szukający ścieżki bez testu (→ 401, mutanty), użytkownik VoiceOver (→ 401), programista czytający moduł pierwszy raz (komentarze z ID decyzji są przy każdej zmianie), użytkownik z przerwanym zapisem (nie dotyczy diffu).

Wzorzec najlepszych w klasie: każda zmiana zachowania ma test, który pada na mutancie; tak jest dla 11 z 12 gałęzi. Trening ma wzorzec testu ogłoszeń (D-1552). Rejestr założeń: bez propozycji zmian.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/poker-core/src/scenario-gen.ts` (D-1536) | tak | czytanie + porównanie generatora przed/po: `dowody/gc-generator-d1536.txt` |
| `apps/mobile/src/features/scenariusz/liczby.ts` | tak | czytanie vs szkic 06 §1–2; mutant G10: `dowody/gc-mutanty.txt`; ułamki w `line`: `dowody/gc-line-ulamki.txt` |
| `wariant.ts` (bloki, zgodneAkcje, inneZgodne) | tak | mutanty G1–G3 |
| `EkranScenariusza.tsx` (werdykt, ogłoszenie, lista końcowa, zakres, formatBb) | tak | mutanty G4–G7, G11, G12 |
| `komponenty.tsx` (StolRozdania, BlokDlaczego) | tak | mutant G8; czytanie |
| `tools/content-build/src/scenariusze.ts` (bramka FU-201, D-043) | tak | mutant G13; bazy przed/po: `dowody/gc-bazy-d043.txt` |
| Testy nowe i zmienione (8 plików apps/mobile, 4 content-build, 1 poker-core) | tak | czytanie + mutanty; zmienione oceniono w D-1551 |
| Dokumenty GB (`docs/decyzje/GB.md`, `plan-08.md`, dowody GB) | tak, po kodzie | czytanie |
| Wygląd 390 / 320 AX5, VoiceOver na urządzeniu | nie | brak macOS i react-native-web; krok telefonu właściciela |
| Pełne `pnpm run ci` | tak, na końcowym SHA GC | `dowody/gc-ci-final.txt` |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-gb-0ac2679.md . docs/programista --rola 08-programista` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”, kod 0 (uruchomione przed commitem raportu). Dowody nie zawierają sekretów ani danych osobowych (ścieżki scratchpadu usunięte).

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy (logika werdyktu, liczby, generator) | ok poza ogłoszeniem: 08-programista-401 |
| DEV-02 | dotyczy | ok: GB dokumentuje czerwień przed kodem dla 301–304, L1–L4, FW-01, KO-102 (`dowody/gb-mutanty-301-304.txt`); ręka mieszana bez zapisu czerwieni w pliku — test sondy FU istniał wcześniej |
| DEV-03 | dotyczy | ok: 3 zmienione testy uznane za zmianę wymagania (D-1551); brak `.skip`/`.only` w diffie |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 (`dowody/gc-ci-final.txt`) |
| DEV-05 | nie dotyczy: diff bez zapisu danych | — |
| DEV-06 | nie dotyczy: brak migracji i kopii w diffie | — |
| DEV-07 | dotyczy | ok: brak zgadniętych liczb; brak zgodnych → `poprawnaAkcja` (stan znany, nie zgadnięty) |
| DEV-08 | nie dotyczy: brak dat | — |
| DEV-09 | dotyczy | ok: dane z generatora typowane; `as unknown as` tylko w testach |
| DEV-10 | nie dotyczy: brak nowych ścieżek błędu | — |
| DEV-11 | dotyczy | ok: tokeny i komponenty systemu; brak nowych kolorów |
| DEV-12 | dotyczy | ok w diffie; pre-istniejące `line`: 08-programista-403 |
| DEV-13 | dotyczy | ok: brak nowych progów; 08-programista-402 dotyczy bramki marginesu |
| DEV-14 | dotyczy | ok: brak plików sekretów w diffie |
| DEV-15 | nie dotyczy: brak nowych nasłuchów i timerów | — |
| DEV-16 | dotyczy (bb, procenty) | ok: bb przez `formatujLiczbe`, procenty `formatujProcent` |

## Znaleziska (szczegóły)

### 08-programista-401 · Ogłoszenie VoiceOver werdyktu ręki mieszanej nie ma testu; regres ogłoszenia przeszedłby CI
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (ŚREDNIE wg CLAUDE.md „Audyty i wydania” pkt 1: kod poprawny, brak strażnika; nie bariera dostępności dziś)
- Realność: realny (luka testu)   · Pewność: wysoka
- Rodzaj: D
- Dowód: opis ogłoszenia budowany przez `zdanieWerdyktu` (EkranScenariusza.tsx, linia 234); mutant G4 (ogłoszenie po staremu: `yoursGood`/`yours` z jedną akcją, ekran po nowemu) przeżywa `gb-reka-mieszana-ekran` i cały `src/features` (894 testy) — `dowody/gc-mutanty.txt`, przebieg 3. Specyfikacja: kryterium 3 „Test werdyktu i ogłoszenia” (`docs/design/fw-river-value-i-mieszana.md:70`). Testy „kryterium 3” sprawdzają tylko `tekstEkranu()`.
- Mechanizm: `grep -rn "announceForAccessibility" apps/mobile/src/features/scenariusz/__tests__` → 0 trafień: żaden test scenariusza nie sprawdza ogłoszeń (także sprzed GB).
- Powraca: nie → trwała kontrola: test ze szpiegiem `announceForAccessibility`
- Wzorzec lub źródło: D-1552; Trening (repo lkarwowski494/trening @ 2d97581) tests/m3-p2-matrix.test.tsx, linia 45
- Kroki w aplikacji: VoiceOver, scenariusz list-hand z ręką mieszaną, wybór drugiej poprawnej akcji → dziś słychać „Też dobrze: …”; po ewentualnym regresie usłyszałby „Lepiej: …” mimo oceny Zgodna, bez czerwonego CI.
- Opcje: (a) test w `gb-reka-mieszana-ekran` ze szpiegiem dla zgodnego i niezgodnego wyboru — mały, zgodny z Treningiem; (b) wydzielić i eksportować `zdanieWerdyktu` i testować funkcję — nie sprawdza, że ogłoszenie jej używa. Rekomendacja: (a).
- Test akceptacyjny: mutant G4 zabity (`python3 mutanty.py <worktree> G4` → kod ≠ 0).
- Status: otwarte

### 08-programista-402 · Przy marginMin < 0,01 zdanie river-catch może podać ten sam procent ceny i blefów, a potem „blefów jest więcej”
- Pozycja listy kontrolnej: DEV-13
- Poziom: P2 (NISKIE)
- Realność: brzegowy (dzisiejsze szkice SC-24/SC-31 mają marginMin ≥ 0,02; river-catch nie jest w `content/`)   · Pewność: wysoka
- Rodzaj: D
- Dowód: kierunek zdania liczony z wartości dokładnych (`apps/mobile/src/features/scenariusz/liczby.ts:49`), procenty pokazywane bez miejsc po przecinku (`formatujProcent`); bramka treści wymaga tylko marginesu większego od zera (`tools/content-build/src/scenariusze.ts:222`). Rachunek: potrzeba 0,3041 i udział 0,2951 (odstęp 0,9 pp) → oba „30%”, a zdanie mówi „mniej” — dla gracza sprzeczność. Szkic 06 zakłada odstęp ≥ marginMin ≥ 0,02, czego bramka nie wymusza (komentarz `apps/mobile/src/features/scenariusz/liczby.ts:40`).
- Mechanizm: ten sam próg „> 0” w trzech miejscach bramki (`tools/content-build/src/scenariusze.ts:160`, `tools/content-build/src/scenariusze.ts:274`); dotyczy zdań tylko river-catch (draw-call pokazuje `trafisz` z 1 miejscem).
- Powraca: nie
- Wzorzec lub źródło: szkic 06 §1 (`docs/tresci/liczby-river-catch-defend.md:14`, wiersz „wybór zdania sensu”)
- Kroki w aplikacji: dopiero po wejściu szablonu river-catch z marginMin < 0,01 do `content/`.
- Opcje: (a) bramka river-catch: marginMin ≥ 0,01 (albo ≥ 0,02 jak w szkicu) z testem — tanie, chroni zdanie; (b) procent z jednym miejscem, gdy odstęp < 1 pp — zmienia brzmienie (rola 04/06). Rekomendacja: (a), przed wejściem SC-24/31 do `content/`.
- Test akceptacyjny: szablon river-catch z marginMin 0,005 odrzucony przez `checkScenarioNaEkran`/kontrolę treści.
- Status: otwarte

### 08-programista-403 · `scenario.numbers.line` przekazuje kwotę i pulę bez `formatujLiczbe`
- Pozycja listy kontrolnej: DEV-12
- Poziom: P2 (NISKIE)
- Realność: teoretyczny dziś (wszystkie punkty draw-call w `content/pl` mają całkowite kwoty i pule: 3200 punktów (ziarna 1–200), 0 ułamków — `dowody/gc-line-ulamki.txt`); pre-istniejące, poza diffem GB
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/liczby.ts:66` „kwota: d.bet, pula: d.pot + d.bet”; nowe zdania GB formatują te same wielkości (`apps/mobile/src/features/scenariusz/liczby.ts:46`). All-in (`stackBb − (pot − martwe)/2`) może dać ułamek przy innych stosach.
- Mechanizm: niespójność dwóch dróg formatowania tej samej wielkości w jednym module; GB odnotował w `plan-08.md` („`scenario.numbers.line` przekazuje liczby bez formatowania”).
- Powraca: pokrewne KO-102 (stos stołu) → trwała kontrola: test `line` z kwotą 12,5 w pl
- Wzorzec lub źródło: DEV-16, KO-102
- Kroki w aplikacji: draw-call z ułamkową pulą w pl → „12.5 bb” zamiast „12,5 bb” (dziś nieosiągalne).
- Opcje: (a) `formatujLiczbe` dla `kwota` i `pula` w `line` + test — jedna linia; (b) zostawić do pierwszego szablonu z ułamkiem — ryzyko powrotu błędu typu KO-102. Rekomendacja: (a) przy najbliższej sesji 08.
- Test akceptacyjny: test `zdaniaLiczb` draw-call z pulą 12,5 w pl zawiera „12,5 bb”.
- Status: otwarte

## Do sprawdzenia
- Wygląd „Też dobrze” i zdania zakresu na 320 pt przy AX5 oraz kolejność czytania VoiceOver — krok telefonu właściciela (lista: FW §2 kryterium 5, §3 makiety `mix-zgodna`, `mix-blad`).
- Test D-1465 river-catch używa wariantu „SC-24-podobnego” zamiast SC-24 Ł ziarno 1, o który prosił szkic 06 §1; rachunek jest sprawdzany na 60 wariantach generatora, więc to różnica formy, nie luki. Pewność, że to bez znaczenia: ~80% — do decyzji 07, czy wymagać fixture z `docs/tresci/szablony-robocze/fd/pl/sc-24.yaml`.

## Co działa dobrze i należy zachować
- D-1536 uzasadnione schematem („zastępuje marginMin/marginMax”, `packages/content-schema/src/index.ts:535`) i spójne z `inMargin` (`packages/poker-core/src/scenario-gen.ts:548`); zero wpływu na obecne szablony (`dowody/gc-generator-d1536.txt`).
- Wyrocznia testów liczb niezależna od kodu (rachunek wprost z pól wariantu) i sprawdzana na wariantach generatora, nie tylko na jednym przykładzie.
- Jawne komentarze „ZMIANA ISTNIEJĄCEGO TESTU (powód)” przy każdym zmienionym oczekiwaniu.
- KO-102 testowane prawdziwą ścieżką ekranu w trzech językach.
- Bazy treści identyczne bajtowo przed i po (D-043, `dowody/gc-bazy-d043.txt`).

## Decyzje dla właściciela
Brak decyzji produktowych. Do weta: D-1550 (werdykt), D-1551 (zmienione testy uznane), D-1552 (wzorzec testu ogłoszeń) — `docs/decyzje/GC.md`.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-401,08-programista-402,08-programista-403`
