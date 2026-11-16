# Audyt: Programista — Szkoła Pokera — 2026-11-16 (sesja HR: recenzja niezależna kodu HO)
Commit: 9677c41c · Tryb: audit · Zakres: diff `14fdc7c6..9677c41c` poza `content/`, `apps/mobile/assets/`, `docs/` · Środowisko: Linux (chmura), Node v22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; macOS/Xcode niedostępne (nie dotyczy: zmiany w czystym TS i testach Node/Jest).

**Werdykt: PRZYJĄĆ Z UWAGAMI.** Warunek: 08-programista-001 i 08-programista-002 naprawione, zanim którykolwiek z pięciu nowych rodzajów trafi do `RODZAJE_NA_EKRANIE` (dziś żaden nie jest na ekranie, D-1704; pilnuje tego `tools/content-build/test/ho-bramki.test.ts:86`).

Odstępstwo nazwane (zasada 7): raport leży w `docs/programista/recenzje/` i trafia na gałąź `claude/sesja-hr-recenzja`, a nie do `audit/` bez commitu, jak chce kontrakt roli. Powód: polecenie koordynatora HR.md (pkt 3 i 7) ma pierwszeństwo; commit obejmuje tylko dokumenty i dowody, plików kodu nie zmieniam (`git status` na końcu).

## Podsumowanie
Silnik HO liczy poprawnie: rachunek ręczny dla każdego punktu z liczbami (spr-call, geo-size, check-raise, nit-3bet; po dwa przypadki albo więcej) zgadza się ze wzorami w kodzie, a niezależnie policzone „górne x%” dla nit-3bet daje dokładnie listy rąk z D-1707/D-1721. Odciski generatora: 13 nowych par szablon×poziom (26 pól), 0 zmienionych, 0 usuniętych, czyli teza HO jest prawdziwa. Poprawka P0 z b41aca41 (turn-bet w `akcjePunktu`) jest chroniona testami: mutant cofający ją wywala 12 testów aplikacji. Najważniejsze ryzyko leży w ocenie odpowiedzi w aplikacji (`ocenaAkcji`). Dla SC-27 mały zakład dostaje „błąd” zamiast „niedokładności”, a dla SC-18 czekanie dostaje „niedokładność” zamiast „dopuszczalne”. Oba odstępstwa od warunków HP nie mają testu. Dziś są niewidoczne dla użytkownika, ale włączenie widoku bez naprawy pokaże błędne werdykty. Wyrocznia KO-111 łapie 2 z 3 mutantów, które na nią celowały; trzeci jest równoważny. Wbrew opisowi D-1712 korzysta jednak z ewaluatora rąk silnika.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | P1 | D | SC-27 geo-size: mały zakład oceniany jako „błąd”, warunek HP mówi „niedokładność” | otwarte |
| 08-programista-002 | P1 | M | SC-18 turn-action: czekanie oceniane jako „niedokładność”, warunek HP mówi „dopuszczalne” | otwarte |
| 08-programista-003 | P2 | D | Wyrocznia KO-111 używa ewaluatora `strength` z silnika, wbrew opisowi „od zera” | otwarte |
| 08-programista-004 | P2 | D | Dwie zmiany zachowania bez testu: strażnik pary w spr-call (mutant M3) i gałąź geo-size w `kluczeRozmiaruZgodne` (M9) | otwarte |
| 08-programista-005 | P2 | D | check-raise: ułamek `cbet` z szablonu nie jest sprawdzany z `cbet.size.small` | otwarte |
| 08-programista-006 | P2 | D | `{{w:spr}}` formatowany z kropką („2.1”), warunek HP chce „2,1” | otwarte |
| 08-programista-007 | P2 | D | Kolizja ID decyzji: D-1715 w HO.md i w HP.md to dwie różne decyzje | otwarte |

## Linia bazowa i założenia
Linię bazową ustaliłem z kodu i warunków HP (`docs/tresci/szablony-robocze/fd/warunki-hp.md`), zanim przeczytałem raporty HO. Raporty i dowody HO traktowałem jako deklaracje do sprawdzenia.
Najlepsza w klasie wersja tego obszaru wygląda tak: każdy punkt decyzji ma (a) generator, który odrzuca rozdania niespełniające warunków, (b) wyrocznię liczoną bez kodu silnika, (c) ocenę każdej akcji w aplikacji zgodną z tabelą werdyktów treści i przypiętą testem, (d) bramkę budowania, która wiąże liczby szablonu z `numbers.yaml`.
Wymiary pokrycia:
- Ścieżki zapisu: sprawdzone, brak. Diff nie dotyka `packages/postep/` ani `apps/mobile/src/data/` (`git diff --stat`).
- Obsługa błędów: `fillVariantMarkers` rzuca `TemplateError`, gdy brakuje wartości (`packages/poker-core/src/scenario-gen.ts:1388-1390`), zamiast podstawić pusty napis. Brak zostaje brakiem.
- Typy na granicach: schemat zod nowych rodzajów jest `.strict()` z zawężonymi enumami; bez nowych `as any`.
- System projektowy: sprawdzone, brak zmian interfejsu (nowe rodzaje poza ekranem, D-1704).
- i18n: znaczniki liczbowe → 08-programista-006.
- Wydajność: `topRangeClasses` zapamiętuje wynik na macierz i x (WeakMap); pętla odrzuceń bez nowych kosztownych wywołań przed tanimi filtrami.
- Testy na właściwym poziomie: czyste testy Node dla silnika i bramki; luki → 08-programista-004.
- Dostępność: nie dotyczy (brak widoku).
- Liczby konfiguracyjne: `NIT_FOLD_MIN_GAP` w silniku, a w bramce literał `0.03` (`tools/content-build/src/scenariusze.ts`, gałąź nit-3bet). Wartość jest ta sama, więc to P2 bez pomyłki, zgłoszone tylko tutaj; check-raise → 08-programista-005.
Soczewki: recenzent szukający ścieżki bez testu (mutanty), programista czytający moduł pierwszy raz (zgodność komentarzy z kodem: 001 i 003), rachunek niezależny (liczby).
Rejestr założeń: brak proponowanych zmian.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/poker-core/src/scenario-gen.ts` (cały diff, 312 linii) | tak | czytanie + mutanty M1–M8, `dowody/hr-mutanty.txt` |
| `apps/mobile/src/features/scenariusz/wariant.ts`, `liczby.ts` | tak | czytanie + mutant M10, `dowody/hr-mutanty.txt` |
| `packages/content-schema/src/index.ts` | tak (nowe schematy) | czytanie diffu |
| `tools/content-build/src/scenariusze.ts` (bramki) | tak | czytanie + mutant M9 |
| Testy HO: `ho-*.test.ts` (poker-core, content-build, mobile), fixtures, `wyrocznie-ho.ts` | tak | czytanie importów i asercji |
| Zmiany testów D-1703, D-1714, D-1715, `cz-pokrycie-szablonow` | tak | `git diff` (sekcja Znaleziska / Co działa) |
| Odciski generatora | tak | `dowody/hr-odciski.txt` |
| Rachunek liczb | tak | `dowody/hr-rachunek-reczny.txt`, `dowody/hr-rachunek-nit3bet.txt` |
| Pełne CI (`pnpm run ci`, kod 0) | tak | `dowody/hr-ci-9677c41c.txt` |
| Analogia z Treningiem | tak (klon @ 2d97581) | `dowody/hr-trening-analogia.txt` |
| `apps/mobile/src/data/content/tresc.generated.ts` | nie (plik generowany) | — |
| Ekran z nowymi rodzajami | nie dotyczy | rodzaje poza `RODZAJE_NA_EKRANIE` (D-1704) |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-hr-ho.md . docs/programista/recenzje --rola 08-programista` (kopia skryptu w scratchpadzie) → OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista (kod 0). Diff sesji HR: tylko pliki w `docs/` (`git status --porcelain` niżej); kod bez zmian.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 | dotyczy | znalezisko 08-programista-004 (dwie gałęzie bez testu); pozostałe reguły R-M9-001/002/003, R-M9-006/009, R-M6-008/010, R-M7-001/003, R-M2-005 mają testy w `ho-*.test.ts` |
| DEV-02 | dotyczy | ok: 5/6 commitów HO zmieniających zachowanie ma test w tym samym commicie (a656dcd7, edd0edfe, d2601481, 95cdd95c, 9cad6ed1, każdy z `ho-*.test.ts`); b41aca41 (poprawka P0) nie dodaje testu, ale regresję łapią testy, które już były (mutant M10: 12 testów pada). Próbka 6, bo tyle jest commitów kodu HO |
| DEV-03 | dotyczy | ok: D-1703 tylko dopisuje przypiętą listę i dodaje test błędu; D-1714 zmienia pętlę na faktyczne wybory pick-hand; D-1715 zawęża ładowanie szkiców, ale wszystkie asercje testu dotyczą SC-17 i SC-20 (`tools/content-build/test/fr-klucze-rozmiaru.test.ts:23-39`), więc żadna nie znika |
| DEV-04 | dotyczy | ok: `pnpm run ci` @ 9677c41c → KOD WYJŚCIA 0, 1094 s, bez powtórzenia (`dowody/hr-ci-9677c41c.txt`) |
| DEV-05 | nie dotyczy | diff nie zawiera zapisu do bazy |
| DEV-06 | nie dotyczy | brak migracji i kopii w diffie |
| DEV-07 | dotyczy | ok: `h.kicker ?? -1` przy najwyższej parze to wartość nieosiągalna (ta para zawsze ma kicker); odrzuca wariant, nie zgaduje liczby |
| DEV-08 | nie dotyczy | brak dat |
| DEV-09 | dotyczy | ok: szablony przez zod `.strict()`; `as VariantMarker` po sprawdzeniu `includes` |
| DEV-10 | dotyczy | ok: brak wartości znacznika → `TemplateError` |
| DEV-11 | nie dotyczy | brak zmian interfejsu |
| DEV-12 | dotyczy | znalezisko 08-programista-006 |
| DEV-13 | dotyczy | znalezisko 08-programista-005; literał 0,03 w bramce opisany w Linii bazowej |
| DEV-14 | dotyczy | ok: diff bez plików `.env`/kluczy; raport przeszedł kontrolę sekretów |
| DEV-15 | nie dotyczy | brak efektów i timerów w diffie |
| DEV-16 | dotyczy | ok: `stacks`/`pots` w bb opisane w typach; `vpip` ułamek → procent tylko w `wartosciPunktu` |

## Znaleziska (szczegóły)

### 08-programista-001 · SC-27: mały zakład z setem dostanie werdykt „błąd” zamiast „niedokładność”
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1
- Realność: brzegowy (dziś geo-size nie jest na ekranie, D-1704; po włączeniu widoku realny) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/wariant.ts:214` „return a === poprawnaAkcja(d) ? 'zgodne' : 'blad';”. Geo-size nie ma własnej gałęzi w `ocenaAkcji` (gałęzie 209–212 obejmują turn-bet, flop-size, nit-3bet, check-raise, turn-action), więc `bet-small` trafia do „blad”. Warunek HP: `docs/tresci/szablony-robocze/fd/warunki-hp.md:66` „`bet-small` = 1/3 puli `inaccuracy`”. Tak samo mówi komentarz typu w silniku (`GeoSizeSpec`: „`bet-small` … (`inaccuracy`)”). D-1709 wymienia nit-3bet, turn-action i check-raise, a geo-size pomija.
- Mechanizm: rodzaj punktu dopisany do `akcjePunktu` i `poprawnaAkcja`, ale nie do `ocenaAkcji`. `grep -n "d.point === 'geo-size'" apps/mobile/src/features/scenariusz/wariant.ts` → 1 trafienie (linia 354, `wartosciPunktu`), 0 w `ocenaAkcji`. Z nowych rodzajów tylko spr-call słusznie spada do „blad” (`fold` = `mistake`, warunki-hp SC-26).
- Powraca: nie (ta sama klasa co CR WYS-002 / D-1375 dla turn-bet i flop-size, wtedy naprawiona jawną gałęzią) → trwała kontrola: test tabeli werdyktów dla każdego rodzaju.
- Wzorzec lub źródło: `docs/tresci/szablony-robocze/fd/warunki-hp.md:66`; analogia D-1375 (turn-bet/flop-size: mały zakład = niedokładność).
- Kroki w aplikacji: po włączeniu SC-27: wybór „mały zakład” → ekran oceny pokazuje „błąd”.
- Opcje: (a) dopisać `geo-size` do gałęzi turn-bet/flop-size w `ocenaAkcji` + test na wszystkie akcje — minimalne; (b) werdykty akcji w szablonie (pole `verdict` w `actions`) i ocena z danych — usuwa całą klasę błędów, ale zmienia kontrakt 06 i schemat. Rekomendacja: (a) teraz; (b) rozważyć przy projekcie widoku (D-1710).
- Test akceptacyjny: test jednostkowy `ocenaAkcji` dla geo-size: `bet-big` → zgodne, `bet-small` → niedokladnosc; czerwony na 9677c41c.
- Status: otwarte

### 08-programista-002 · SC-18: czekanie na turnie dostanie „niedokładność”, warunek HP mówi „dopuszczalne”
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1
- Realność: brzegowy (turn-action poza ekranem, D-1704) · Pewność: wysoka
- Rodzaj: M (werdykt akcji to kwestia merytoryczna roli 06; tu niezgodność kodu z jej warunkiem)
- Dowód: `apps/mobile/src/features/scenariusz/wariant.ts:212` „if (d.point === 'turn-action') return a === d.correct ? 'zgodne' : 'niedokladnosc';” vs `docs/tresci/szablony-robocze/fd/warunki-hp.md:43` „| `check` | — | `acceptable` | heuristic („częściej”), D-1052 |”. D-1709 (HO) przyjmuje „inna niż poprawna = niedokładność” bez odniesienia do tej tabeli. Jedna reguła na rodzaj nie odróżnia SC-18 (czekanie `acceptable`, mały zakład `inaccuracy`) od SC-21 (zakład `inaccuracy`), a punkt `TurnActionVariantDecision` nie niesie werdyktów.
- Mechanizm: werdykt zależny od szablonu zakodowany per rodzaj. Ten sam wzorzec ma check-raise (`call` = zgodne, wpisane na sztywno). Dziś zgadza się z warunkiem HP, ale zmiana tabeli HP nie dotrze do kodu.
- Powraca: nie → trwała kontrola: test tabeli werdyktów SC-18 i SC-21.
- Wzorzec lub źródło: `docs/tresci/szablony-robocze/fd/warunki-hp.md:43`; ADR-04 (ręka mieszana / akcja dopuszczalna).
- Kroki w aplikacji: po włączeniu SC-18: czekanie z najwyższą parą na nadkarcie → „niedokładność” zamiast „dopuszczalne”.
- Opcje: (a) pole `acceptable` w `TurnActionVariantDecision` z granic poziomu (jak `list-hand.acceptable`) + gałąź w `ocenaAkcji` — mała zmiana, analogia z istniejącym list-hand; (b) werdykty akcji w schemacie szablonu (jak w 001 b). Rekomendacja: (a), ale werdykt potwierdza rola 06 (to ona rozstrzyga, czy D-1709 czy warunki HP).
- Test akceptacyjny: SC-18: check → dopuszczalne, bet-small → niedokladnosc, bet-big → zgodne; SC-21: check → zgodne, bet-big → niedokladnosc.
- Status: otwarte

### 08-programista-003 · Wyrocznia KO-111 nie jest niezależna od ewaluatora rąk silnika
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2
- Realność: teoretyczny (błąd w `strength` musiałby trafić jednocześnie w silnik i wyrocznię) · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/wyrocznie-ho.ts:2` „liczone tu od zera z kart (pełne przejście po talii, ewaluator 7 kart)” oraz import `strength` z `@szkola/poker-core` (linia 4), używany w wyroczniach turn-bet i pick-hand: `tools/content-build/test/wyrocznie-ho.ts:140` „strength([...v.villain, ...turn, c]), strength([...v.hero, ...turn, c])”. D-1712 opisuje ewaluator jako liczony od zera.
- Mechanizm: wspólny ewaluator. `grep -n "strength(" tools/content-build/test/wyrocznie-ho.ts` → 4 linie z wywołaniami (140, 156, 178, 186), import w linii 4. Pozostałe importy (`classOf`, `rankOf`, `suitOf`, `FULL_DECK`, `HAND_CLASSES`) to tożsamości kart, nie logika decyzji.
- Powraca: nie
- Wzorzec lub źródło: polecenie HR pkt 3.2 („czy wyrocznia nie importuje … logiki silnika”).
- Kroki w aplikacji: brak bezpośrednich.
- Opcje: (a) poprawić opis w komentarzu i D-1712 („ewaluator z poker-core, testowany osobno”) — zero kodu; (b) własny ewaluator 7 kart w wyroczni — pełna niezależność, ok. 60 linii testu. Rekomendacja: (a), bo `strength` jest objęty nocnym Strykerem (`.github/workflows/nocny.yml:64`); (b), gdy wyrocznia ma zastąpić przegląd eksperta.
- Test akceptacyjny: opis zgodny z importami; przy (b) brak importu `strength` w `wyrocznie-ho.ts`.
- Status: otwarte

### 08-programista-004 · Dwie zmiany zachowania bez testu, który potrafi paść
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: `dowody/hr-mutanty.txt`: M3 (spr-call dopuszcza drugą parę, `packages/poker-core/src/scenario-gen.ts:1155`) → 5/5 testów zielonych. Strażnik jest maskowany przez `pairKind` poziomu w każdej fixturze, a bramka nie wymaga `pairKind` dla spr-call. Szablon bez `pairKind` dostałby drugą parę dopiero wtedy, gdy strażnik się zepsuje. M9 (`kluczeRozmiaruZgodne` pomija geo-size, `tools/content-build/src/scenariusze.ts:89`) → 36/36 zielonych.
- Mechanizm: test sprawdza wynik przy filtrach poziomu, a nie strażnik silnika. M1 (turn-bet) i M8 (check-raise ≥ 8 outów) też przeżyły, ale są równoważne: M1 dlatego, że `inMargin(reqBig − equityRywala)` z `marginMin` 0,02 > 0 już wymusza `equityRywala < reqBig`; M8 dlatego, że `draws: [flush, oesd]` daje zawsze ≥ 8 outów.
- Powraca: nie
- Wzorzec lub źródło: zasada roli 2 („czerwony przebieg dowodzi, że test w ogóle coś sprawdza”).
- Kroki w aplikacji: brak bezpośrednich.
- Opcje: (a) test spr-call z poziomem bez `pairKind` (oczekiwane tylko overpair/top) i test `kluczeRozmiaruZgodne` dla geo-size z `small` ≠ `cbet.size.small`; (b) bramka wymaga `pairKind` dla spr-call. Rekomendacja: (a).
- Test akceptacyjny: M3 i M9 z `dowody/hr-mutanty.txt` dają FAIL.
- Status: otwarte

### 08-programista-005 · check-raise: rozmiar c-betu w szablonie nie jest wiązany z numbers.yaml
- Pozycja listy kontrolnej: DEV-13
- Poziom: P2
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: bramka check-raise (`tools/content-build/src/scenariusze.ts:212` i dalej) porównuje z `numbers.yaml` tylko `multipliers` (`xr.mult.example`, `xr.too-small.mult`), a `kluczeRozmiaruZgodne` (od linii 83) obsługuje turn-bet, flop-size, geo-size i defend, bez check-raise. Pole `cbet` (fixture: `0.3333333333333333`) może się więc rozjechać z `cbet.size.small` (0,333333). Wtedy tekst „c-bet 1/3” i liczby w wariancie (`cbet = pot × spec.cbet`) różnią się bez błędu budowania.
- Mechanizm: `grep -n "cbet.size" tools/content-build/src/scenariusze.ts` → trafienia tylko w `kluczeRozmiaruZgodne` (linie 88–90).
- Powraca: nie
- Wzorzec lub źródło: CLAUDE.md „Ta sama wielkość ma jeden klucz”.
- Kroki w aplikacji: brak dziś (poza ekranem).
- Opcje: (a) dopisać check-raise do `kluczeRozmiaruZgodne` (`cbet.size.small: [d.cbet]`); (b) sprawdzenie w gałęzi bramki check-raise. Rekomendacja: (a), bo to jedno miejsce dla wszystkich rozmiarów.
- Test akceptacyjny: szablon check-raise z `cbet: 0.5` daje błąd budowania.
- Status: otwarte

### 08-programista-006 · Znacznik {{w:spr}} da „2.1” w tekście polskim i innych językach z przecinkiem
- Pozycja listy kontrolnej: DEV-12
- Poziom: P2
- Realność: brzegowy (poza ekranem) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/wariant.ts:352` „if (d?.point === 'spr-call') return { spr: d.spr.toFixed(1) };” vs `docs/tresci/szablony-robocze/fd/warunki-hp.md:16` „SPR z 1 miejscem po przecinku, np. „2,1””. Komentarz w kodzie nazywa format zadaniem roli 04.
- Mechanizm: `toFixed` zamiast formatowania liczb dla języka; to samo w gałęzi geo-size (`apps/mobile/src/features/scenariusz/wariant.ts:354`).
- Powraca: nie
- Wzorzec lub źródło: zasada roli 8 (i18n), warunki HP.
- Kroki w aplikacji: po włączeniu SC-26: „SPR 2.1” w polskim tekście.
- Opcje: (a) formatowanie przez istniejący formater liczb treści (`{{n:…}}`) z parametrem języka; (b) zostawić do projektu widoku (04), z wpisem w backlogu. Rekomendacja: (a) razem z widokiem; do tego czasu (b).
- Test akceptacyjny: `wartosciZnacznikow` dla pl daje „2,1”, dla en „2.1”.
- Status: otwarte

### 08-programista-007 · Jedno ID decyzji D-1715 dla dwóch różnych decyzji
- Pozycja listy kontrolnej: DEV-13
- Poziom: P2
- Realność: realny (odwołania „D-1715” są niejednoznaczne) · Pewność: wysoka
- Rodzaj: D
- Dowód: `docs/decyzje/HO.md:2` „Pula D-1700…D-1714.” a `docs/decyzje/HO.md:21` zawiera „| D-1715 | 2026-11-16 | A | **`fr-klucze-rozmiaru`”; `docs/decyzje/HP.md:2` „Pula D-1715…D-1729.” i `docs/decyzje/HP.md:6` zawiera inną decyzję D-1715. Commit 8b701ea7 cytuje „D-1715” w tytule.
- Mechanizm: wyjście poza pulę sesji. `grep -rn "D-1715" docs/ | wc -l` pokaże odwołania do rozdzielenia.
- Powraca: nie
- Wzorzec lub źródło: CLAUDE.md, decyzje zapisywane, żeby „dało się ją sprawdzić i cofnąć”.
- Kroki w aplikacji: brak.
- Opcje: (a) nadać decyzji HO nowe ID z puli koordynatora i zostawić przy D-1715 w HO.md przekierowanie; (b) zostawić i dopisać „D-1715 (HO)” / „D-1715 (HP)”. Rekomendacja: (a).
- Test akceptacyjny: każde ID występuje jako wiersz definicji w jednym pliku `docs/decyzje/*.md`.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Warunki stołu SC-16 (niesparowany, bez trzech kart koloru, bez gotowego strita) wymusza dziś tylko `flop`/`reject` szablonu (fixture: `tools/content-build/test/fixtures/check-raise/sc-fx-check-raise.yaml:10`), a nie bramka. Do sprawdzenia przy przenoszeniu szkicu SC-16 do treści: czy szkic ustawia te granice.
- Szkic `docs/tresci/szablony-robocze/fd/pl/sc-26.yaml:12` nadal ma `kicker: [A, K]`, choć D-1701 wymaga `kickerMin: K`. To treść HP/HN, poza kodem HO; trzeba poprawić przed `content:build`.
- D-1705 (merytoryczna, rola 06 w HS) nie była oceniana.

## Co działa dobrze i należy zachować
- Liczby: wszystkie wzory zgodne z rachunkiem ręcznym (`dowody/hr-rachunek-reczny.txt`), a nit-3bet także z niezależnym przeliczeniem z macierzy equity169 (`dowody/hr-rachunek-nit3bet.txt`): 7 rąk przy 8% i 4 ręce przy 10%, jak D-1707/D-1721.
- Odciski: 0 zmienionych kluczy istniejących szablonów (`dowody/hr-odciski.txt`). Brak regresji generatora potwierdza też to, że `GENERATOR_WERSJA` się nie zmienił (D-1708).
- Mutanty silnika złapane: M2 (river-catch, wyrocznia KO-111), M4 (cena check-raise), M5 (cena nit-3bet), M6 (cztery do strita), M7 (kolor na stole geo-size), M10 (regresja P0 b41aca41, 12 testów aplikacji pada).
- Brak wartości znacznika daje `TemplateError`, a nie pusty napis; jest na to test (`packages/poker-core/test/scenario-znaczniki.test.ts`).
- D-1704: nowe rodzaje wyłączone z ekranu i przypięte testem, zamiast półgotowego widoku.

Decyzje HO do weta (D-1700…D-1715, bez D-1705). Analogia z Treningiem sprawdzona na klonie `lkarwowski494/trening` @ 2d97581 (`dowody/hr-trening-analogia.txt`). To aplikacja treningowa bez generatora rozdań, więc teza HO „brak odpowiednika” jest prawdziwa dla D-1700–D-1704, D-1706, D-1707, D-1709–D-1711, D-1713–D-1715. Dla D-1708 i D-1712 odpowiednikiem jest praktyka testów mutacyjnych Treningu (`stryker.config.json`, nocny workflow), a Szkoła ją ma (`.github/workflows/nocny.yml:64` obejmuje `scenario-gen.ts`). Zgodne, choć HO o tym nie pisze.
| ID | Ocena HR |
|---|---|
| D-1700, D-1701, D-1702, D-1703, D-1706, D-1707, D-1708, D-1710, D-1711, D-1713, D-1714 | bez uwag |
| D-1704 | bez uwag; warunek dla 001/002 przed zmianą tej decyzji |
| D-1709 | do weta częściowo: pomija geo-size (001) i jest sprzeczna z warunkiem HP dla SC-18 (002) |
| D-1712 | bez uwag co do zakresu; opis niezależności nieścisły (003) |
| D-1715 | treść bez uwag (nie osłabia asercji); ID koliduje (007) |

## Decyzje dla właściciela
Brak decyzji produktowych. Werdykt dla SC-18 (002) rozstrzyga rola 06; HR zgłasza go koordynatorowi. Decyzja HR (do weta): D-1740 w `docs/decyzje/HR.md`.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-004,08-programista-005,08-programista-007`
(006 razem z projektem widoku, rola 04; 003 wariant (a) w tym samym fix).

## Wynik git status --porcelain (przed commitem, po usunięciu worktree mutantów)
```
?? docs/decyzje/HR.md
?? docs/programista/plan-hr.md
?? docs/programista/recenzje/dowody/hr-ci-9677c41c.txt
?? docs/programista/recenzje/dowody/hr-mutanty.txt
?? docs/programista/recenzje/dowody/hr-odciski.txt
?? docs/programista/recenzje/dowody/hr-rachunek-nit3bet.txt
?? docs/programista/recenzje/dowody/hr-rachunek-reczny.txt
?? docs/programista/recenzje/dowody/hr-trening-analogia.txt
?? docs/programista/recenzje/recenzja-hr-ho.md
```
Pliki śledzone nietknięte (brak linii „ M”); nowe są tylko dokumenty i dowody HR.
