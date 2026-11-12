# Audyt: Programista — Szkoła Pokera — 2026-11-12
Recenzja niezależna zmian sesji FL `56a7ac70..be1e44ae` (silnik 08-FD-2/3/4). Commit: be1e44ae · Tryb: audit (sesja FO, polecenie `origin/koordynacja:docs/koordynacja/polecenia/FO.md` @ 2fa4910f) · Środowisko: kontener Linux, Node 22 (`/opt/node22`), pnpm, Python 3.13, git z prawem push na gałąź roboczą; bez macOS/Xcode (testy na urządzeniu nie dotyczą tej zmiany). Raportu autora nie używałem jako uzasadnienia; decyzje FL czytałem jako przedmiot recenzji.

## Podsumowanie
**Werdykt: PRZYJĄĆ Z UWAGAMI** (0 KRYT, 0 WYS, 2 ŚR, 4 NIS). Kod robi to, co mówią specyfikacje 08-FD-2/3/4 i decyzje D-1415…D-1421: wektory A–H z `fd-wektory.txt` odtworzone (rachunek odniesienia daje wynik identyczny z dowodem, testy poker-core sprawdzają te same liczby), bramka content-build odrzuca `river-value` z powodem i przyjmuje `flop-size`, switche w mobile są wyczerpujące z kontrolą kompilatora, a każda zmiana zachowania ma test w tym samym commicie (5/5). Słabsza strona to siła testów nowych warunków generatora: z 23 mutantów 18 zginęło, 5 przeżyło. Przeżyły warunek D-1421 (dokładne equity N/45 przy dużym zakładzie), oba warunki „czystych outów” i filtr `dryBoard`. Kod jest dziś poprawny, ale cofnięcie tych warunków nie zaczerwieni żadnego testu (001, 002). Sonda spoza repo pokazuje, że da się napisać test, który zabija M06 i M12. Żadne znalezisko nie blokuje (próg z `CLAUDE.md`: ŚR i NIS do backlogu); decyzji właściciela brak.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | ŚR (P2) | D | flop-size: warunek D-1421 (N/45) i warunki czystych outów bez testu, który potrafi paść; wyrocznia pokrycia liczy tylko N/47 | naprawione (8380bee) |
| 08-programista-002 | ŚR (P2) | D | river-value: filtr `dryBoard` bez testu, który potrafi paść (pasujące ręce w kolorze maskują warunek) | naprawione (8f7f7b4) |
| 08-programista-003 | NIS (P2) | D | Wyrocznie pokrycia biorą δ tylko z `marginMin`, generator najpierw z `margins[i].min` | naprawione (8380bee) |
| 08-programista-004 | NIS (P2) | D | Commit 05653964 zostawił czerwony test przypięcia `RODZAJE_NA_EKRANIE` do 0895fa03 | otwarte |
| 08-programista-005 | NIS (P2) | D | Komunikat błędu widoku flop-size mówi „turn-bet” | naprawione (e157b28) |
| 08-programista-006 | NIS (P2) | D | river-value: δ ≥ 0,5 daje w generatorze zwykły `Error` zamiast `TemplateError`, bramka tego nie sprawdza | naprawione (63e8591) |

## Linia bazowa i założenia
Linię bazową zbudowałem z kodu i specyfikacji (`docs/tresci/stan-fd.md:22-35`, `fd-wektory.txt`, recenzja FK 06-tresci-009), zanim przeczytałem uzasadnienia w `docs/decyzje/FL.md`. Najlepszy w klasie silnik scenariuszy: każda reguła z wektorem ma test z tym wektorem; każdy warunek odrzucenia wariantu ma test, który pada po jego usunięciu; wyrocznia pokrycia treści liczy niezależnie te same warunki, które egzekwuje generator; nowy rodzaj bez widoku nie może wejść do bazy (bramka).

Wymiary pokrycia:
- Ścieżki zapisu: sprawdzone, brak. Zmiana nie dotyka bazy, `packages/postep/` ani `src/data/`; jedyna ścieżka wrażliwa to `tools/content-build/` (bramka treści, poniżej).
- Obsługa błędów: sprawdzone. Brak kontekstu albo spotu dla iso-size, błędne pule, marginesy i akcje to `TemplateError` (testy M14–M16 zabite). Wyjątki: komunikat 005, rodzaj błędu 006. `river-value` w mobile rzuca jawny błąd zamiast cichego zgadywania (`apps/mobile/src/features/scenariusz/wariant.ts:59-60`, `apps/mobile/src/features/scenariusz/wariant.ts:73`).
- Typy na granicach: sprawdzone. Szablon treści przechodzi przez zod (`ScenarioFlopSizeDecision`, `ScenarioRiverValueDecision`), potem `as GeneratorTemplate` (`tools/content-build/src/scenariusze.ts:389`, mechanizm sprzed FL). Enum `pairKind` w schemacie jest równy typowi `PairKind` (`packages/poker-core/src/holding.ts:15`), ale nic tego nie przypina (Do sprawdzenia).
- System projektowy: sprawdzone. flop-size używa komponentów i klucza `play.bet` z turn-bet, bez nowych tekstów; river-value bez widoku do projektu roli 04 (D-1420).
- i18n: sprawdzone. Brak nowych tekstów w interfejsie; sekcja „Liczby” pusta jak w turn-bet (`apps/mobile/src/features/scenariusz/liczby.ts:27-28`).
- Wydajność: sprawdzone. Generator flop-size i river-value mieści się w limicie odrzuceń; czasy testów w CI (dowód CI).
- Testy na właściwym poziomie: sprawdzone. Logika czysta w poker-core (Node), wyrocznie z pełnym przejściem po talii; słabe miejsca w 001 i 002.
- Dostępność: sprawdzone, bez zmian. Widok flop-size to widok turn-bet; tekst dla czytnika widoczny w wyniku testu ekranu (M20 w `dowody/fo-mutanty-be1e44ae.txt`).
- Liczby konfiguracyjne: sprawdzone. δ z poziomu szablonu, minimum `DRAW_CALL_MIN_GAP` (D-1051) importowane, a nie wpisane; `RIVER_VALUE_EPS` nazwany.

Soczewki: recenzent szukający ścieżki bez testu (mutanty, wynik 001, 002); programista czytający moduł pierwszy raz (komunikat 005, rodzaj błędu 006); użytkownik VoiceOver (bez zmian względem turn-bet). Soczewka „przerwany zapis” nie dotyczy (brak zapisu). Rejestr założeń: bez propozycji zmian statusu.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/poker-core/src/scenario-gen.ts` (diff, 218 linii) | tak, całość diffu | czytanie; mutanty M01–M15 (`dowody/fo-mutanty-be1e44ae.txt`) |
| `packages/content-schema/src/index.ts` (2 nowe schematy) | tak | czytanie; test bramki „small < big” |
| `tools/content-build/src/scenariusze.ts` (bramka, `RODZAJE_NA_EKRANIE`) | tak | czytanie; mutanty M16–M19 |
| `apps/mobile/src/features/scenariusz/` (wariant, liczby, ekran) | tak | czytanie; mutanty M20–M23 (jest, tsc) |
| testy nowe i zmienione (9 plików) | tak | czytanie, grep osłabień (DEV-03), stare wersje testów na nowym kodzie (R3) |
| wektory A–H | tak | `dowody/fo-wektory-be1e44ae.txt` (python, diff z dowodem kod 0) |
| testy czerwone przed poprawką | tak, 2 commity (b734fc15, 08b92f11) | `dowody/fo-mutanty-be1e44ae.txt`, sekcja R1–R3 |
| pełne CI na be1e44ae | tak | `dowody/fo-ci-be1e44ae.txt` |
| treść `content/` (szablony iso-size, flop-size, river-value) | tak: brak takich szablonów | `grep -rl iso-size content --include=*.yaml` trafia tylko w `rules.yaml` |
| test na telefonie | nie dotyczy | flop-size nie ma szablonu w treści, więc nie ma go w aplikacji |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-fl-be1e44ae.md . docs/programista --rola 08-programista` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”, kod 0 (skrypt w scratchpadzie, poza repo; wynik z ostatniego przebiegu przed commitem).

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | ok dla wektorów: A, B, C (`fl-flop-size.test.ts`), D, E, F, G, H (`fl-river-value.test.ts`); znaleziska 001, 002 (warunki generatora bez testu, który pada) |
| DEV-02 | dotyczy | 5/5 commitów zmieniających zachowanie ma test w tym samym commicie: b734fc15, 82b5103b, d38233b6, 05653964, 08b92f11 (f4c8c93a strukturalny, 0895fa03 sam test); czerwień przed poprawką pokazana dla b734fc15 (R1: asercja, właściwy powód) i 08b92f11 (R2: pole `eExact` undefined, asercja o nowym polu, nie o warunku generatora, patrz 001); 004 |
| DEV-03 | dotyczy | ok: brak `.skip`, `.only`, `xit`, `todo`, `expect(true)` w diffie testów; jedyna usunięta asercja to stara wersja testu przypięcia zastąpiona rozszerzoną; `ef-iso-size.test.ts` zmienia tylko kontekst (`spots`), asercje bez zmian, a stara wersja pada na nowym kodzie z powodu specyfikacji (R3) |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 (`dowody/fo-ci-be1e44ae.txt`) |
| DEV-05 | nie dotyczy: zmiana bez zapisu danych użytkownika | — |
| DEV-06 | nie dotyczy: bez migracji i kopii | — |
| DEV-07 | dotyczy | ok: `?? 0` przy δ (`packages/poker-core/src/scenario-gen.ts:793`, `packages/poker-core/src/scenario-gen.ts:851`) kończy się błędem szablonu (δ < 0,02), nie cichą wartością; w testach 003 |
| DEV-08 | nie dotyczy: bez dat i czasu | — |
| DEV-09 | dotyczy | ok w diffie (dane treści przez zod); `as GeneratorTemplate` w `tools/content-build/src/scenariusze.ts:389` sprzed FL |
| DEV-10 | dotyczy | 005, 006 |
| DEV-11 | dotyczy | ok: bez nowych kolorów, krojów i komponentów |
| DEV-12 | dotyczy | ok: bez nowych tekstów; puste „Liczby” jawnie skomentowane |
| DEV-13 | dotyczy | ok: `DRAW_CALL_MIN_GAP` importowane w generatorze i bramce, ułamki puli z szablonu |
| DEV-14 | dotyczy | ok: diff bez plików kluczy i wzorców sekretów (sprawdzone w diffie i skryptem raportu) |
| DEV-15 | nie dotyczy: bez nasłuchów i timerów | — |
| DEV-16 | dotyczy | ok: ułamki puli (`small`, `big`) i kwoty w bb rozdzielone w nazwach (`betSmall`, `requiredSmall`) |

Decyzje FL (D-1415…D-1421), ocena recenzenta:
| Decyzja | Ocena | Dowód |
|---|---|---|
| D-1415 iso-size z `rfi.<pozycja>` | zgodna z 08-FD-2; `GENERATOR_WERSJA` słusznie bez zmiany (brak szablonu iso-size w `content/`) | M15 zabity; R1 czerwony; grep treści |
| D-1416 `classComboSplit` publiczne | zgodna; remis osobno, wejście strzeżone | M01, M02 zabite |
| D-1417 werdykt river-value | zgodna z 08-FD-4 i D-1302 war. 2; granice włącznie | M03, M04, M05 zabite |
| D-1418 filtry `pairKind`, `dryBoard` | interpretacja rozsądna; przy `pairKind: [overpair]` warunek „strit na stole” jest nadmiarowy (gracz grający stołem nie ma `pairKind`) | M06 i M07 przeżyły → 002 |
| D-1419 flop-size | zgodna z 08-FD-3 (e = N/47, czyste outy, ¼ i ⅔, cała kwota) | M09, M13, M14 zabite; M10, M11 przeżyły → 001 |
| D-1420 schemat, bramka, widok | zgodna: flop-size przyjmowany, river-value odrzucany z powodem; switche wyczerpujące | M16–M23 zabite |
| D-1421 N/45 przy dużym zakładzie | kod zgodny z recenzją FK 009 | M12 przeżył → 001 |

## Znaleziska (szczegóły)

### 08-programista-001 · flop-size: warunek D-1421 i warunki czystych outów można cofnąć bez czerwonego testu
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (ŚR)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: `dowody/fo-mutanty-be1e44ae.txt`: M12 (warunek `inMargin(r.marginBigExact…)` z `packages/poker-core/src/scenario-gen.ts:802` zamieniony na `marginBig`) PRZEŻYŁ, M10 (bez `ties === 0`) i M11 (bez równości zbiorów) w `packages/poker-core/src/scenario-gen.ts:1220` PRZEŻYŁY. Powód: przy ¼ i ⅔ puli i drawie do koloru jedyne przyjmowane N to 9, a 2/7 − 9/45 = 0,0857 ≥ 0,02, więc oba warunki dają ten sam wynik; test generatora (`packages/poker-core/test/fl-flop-size.test.ts:98`) liczy N, nie porównuje zbioru z outami koloru. Wyrocznia pokrycia treści sprawdza duży zakład tylko wobec N/47 (`tools/content-build/test/fl-pokrycie-flop-size-river-value.test.ts:40`), choć D-1421 ustaliło N/45. Sonda (`dowody/fo-sonda-test.txt`: duży zakład ½ puli, mały ⅛, δ = 0,055; cena 0,25, margines 0,0585 przy N/47 i 0,05 przy N/45) przechodzi na oryginale i zabija M12.
- Mechanizm: warunek przyjęcia testowany tylko w konfiguracji, w której jest nieaktywny; `grep -n "marginBigExact\|clean" packages/poker-core/test/fl-flop-size.test.ts tools/content-build/test/fl-pokrycie-flop-size-river-value.test.ts` → asercje tylko na polach wyniku dla wektora A, żadna na odrzuceniu wariantu.
- Powraca: nie
- Wzorzec lub źródło: zasada 11 (test, który potrafi paść); recenzja FK 06-tresci-009, test akceptacyjny „sprawdza obie liczby”.
- Kroki w aplikacji: dziś brak (żaden szablon flop-size w treści). Po wejściu SC-13 z innymi ułamkami albo drawem do strita regresja tych warunków przeszłaby CI, a ekran uczyłby rozmiaru z liczbą po złej stronie ceny.
- Opcje: (a) dodać do `fl-flop-size.test.ts` przypadek sondy (½ i ⅛, δ 0,055 → brak wariantu) i wektor z remisem albo z zablokowanym outem przy tej samej liczności, a w wyroczni pokrycia liczyć duży zakład wobec N/45 i porównywać zbiór kart z outami — pełna ochrona, ok. 30 linii testów; (b) tylko przypadek sondy — zabija M12, M10 i M11 zostają. Rekomendacja: (a).
- Test akceptacyjny: mutanty M10, M11, M12 ze skryptu `dowody/fo-mutanty-skrypt.txt` giną.
- Status: naprawione (8380bee); FP: mutanty giną (`docs/programista/dowody/fp-mutanty-M06-M12.txt`), CI kod 0 (`docs/programista/dowody/fp-ci-8380bee-partia1.txt`)

### 08-programista-002 · river-value: filtr `dryBoard` można usunąć bez czerwonego testu
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (ŚR)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: M06 (warunek koloru w `packages/poker-core/src/scenario-gen.ts:859` wyłączony) i M07 (warunek strita wyłączony) PRZEŻYŁY test `packages/poker-core/test/fl-river-value.test.ts:123`. Powód: pasujące ręce testu i fixture'u to ręce w kolorze (`packages/poker-core/test/fl-river-value.test.ts:94`, `tools/content-build/test/fixtures/river-value/sc-fx-river-value.yaml:16`), więc na stole z trzema kartami jednej barwy wariant odpada już przez D-1302 war. 2 (lepsza ręka wśród pasujących). Nazwa testu obiecuje także brak strita, ale asercji o stricie nie ma. Sonda z pasującą `72o` zabija M06; M07 przeżywa także sondę, bo przy `pairKind: [overpair]` stół ze stritem daje `pairKind = null` (warunek nadmiarowy, mutant równoważny w tej konfiguracji). Wyrocznia pokrycia (`fl-pokrycie-flop-size-river-value.test.ts`) nie sprawdza ani `pairKind`, ani `dryBoard`.
- Mechanizm: ten sam co 001 (warunek testowany tylko tam, gdzie inny warunek go maskuje); trafienia: `packages/poker-core/src/scenario-gen.ts:857-860`.
- Powraca: nie
- Wzorzec lub źródło: zasada 11; 08-FD-4 („stół bez trzech kart w kolorze i bez strita na stole”, `docs/tresci/stan-fd.md:31`).
- Kroki w aplikacji: dziś brak (SC-28 nie ma szablonu w treści). Szablon SC-28 z pasującymi rękami spoza koloru po regresji dostałby mokre stoły, a „sucho, betuj overparą” uczyłoby na stole, którego lekcja nie dotyczy.
- Opcje: (a) test z pasującymi rękami bez koloru (jak sonda) plus przypadek `dryBoard` bez `pairKind` dla strita; wyrocznia pokrycia sprawdza oba filtry — pełna ochrona; (b) tylko test koloru, a w D-1418 zapisać, że warunek strita jest nadmiarowy przy `pairKind` — mniej kodu testów, warunek strita bez testu. Rekomendacja: (a).
- Test akceptacyjny: M06 i M07 giną (M07 w teście bez `pairKind`).
- Status: naprawione (8f7f7b4); FP: mutanty giną (`docs/programista/dowody/fp-mutanty-M06-M12.txt`), CI kod 0 (`docs/programista/dowody/fp-ci-8380bee-partia1.txt`)

### 08-programista-003 · Wyrocznie pokrycia biorą δ tylko z `marginMin`
- Pozycja listy kontrolnej: DEV-07
- Poziom: P2 (NIS)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/fl-pokrycie-flop-size-river-value.test.ts:23` i `:55` liczą `marginMin ?? 0`, a generator bierze najpierw `margins[i].min` (`packages/poker-core/src/scenario-gen.ts:793`, `:851`). Szablon z `margins` dostałby w wyroczni δ = 0, czyli słabszą kontrolę (nie fałszywy alarm).
- Mechanizm: 2 trafienia w jednym pliku testu.
- Powraca: nie
- Wzorzec lub źródło: wzorzec roli „brak zostaje brakiem”.
- Kroki w aplikacji: brak (test).
- Opcje: (a) δ jak w generatorze: `margins?.[idx]?.min ?? marginMin`, brak to błąd testu; (b) zostawić, dopóki treść nie używa `margins`. Rekomendacja: (a), przy okazji 001.
- Test akceptacyjny: wyrocznia na fixture z `margins: [{ min: 0.05 }]` i bez `marginMin` sprawdza δ = 0,05.
- Status: naprawione (8380bee); FP: mutanty giną (`docs/programista/dowody/fp-mutanty-M06-M12.txt`), CI kod 0 (`docs/programista/dowody/fp-ci-8380bee-partia1.txt`)

### 08-programista-004 · Commit 05653964 zostawił czerwony test przypięcia do następnego commitu
- Pozycja listy kontrolnej: DEV-04
- Poziom: P2 (NIS)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: 05653964 dodaje `flop-size` do `RODZAJE_NA_EKRANIE`, a `tools/content-build/test/cm-recenzja-cl.test.ts:29` w tym commicie nadal oczekuje starej listy (`git show 05653964:tools/content-build/test/cm-recenzja-cl.test.ts | grep -c "'turn-bet', 'river-catch'"` → 1); poprawka dopiero w 0895fa03. Dowód CI FL jest tylko dla 08b92f1.
- Mechanizm: jeden commit pośredni.
- Powraca: nie
- Wzorzec lub źródło: zasada roli 4 (każdy commit przy zielonych testach), `CLAUDE.md` („Przed commitem `pnpm run ci` musi być zielone”).
- Kroki w aplikacji: brak; skutek dla `git bisect` i dla cofania pojedynczych commitów.
- Opcje: (a) nic nie zmieniać w historii (gałąź wypchnięta, bez przepisywania), zapisać jako uwagę procesu; (b) scalić oba commity przy integracji — przepisanie historii, zakazane bez zgody. Rekomendacja: (a).
- Test akceptacyjny: nie dotyczy (uwaga procesu).
- Status: otwarte

### 08-programista-005 · Komunikat błędu widoku flop-size mówi „turn-bet”
- Pozycja listy kontrolnej: DEV-10
- Poziom: P2 (NIS)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:60` „turn-bet: akcja” w gałęzi wspólnej dla `turn-bet` i `flop-size`; podobnie `scenario-gen.ts` komunikat walidacji „punkt cbet-case albo size-spot jest najwyżej jeden” obejmuje dziś 9 rodzajów (sprzed FL, rozszerzony przez FL).
- Mechanizm: komunikat z nazwą rodzaju wpisaną na sztywno przy gałęzi wspólnej.
- Powraca: nie
- Wzorzec lub źródło: wzorzec roli „błędy typowane”.
- Kroki w aplikacji: brak (błąd programisty, nie użytkownika).
- Opcje: (a) `${d.point}: akcja …`; (b) zostawić. Rekomendacja: (a).
- Test akceptacyjny: test „FH NIS-004” w `fl-flop-size-ekran.test.tsx` oczekuje komunikatu z „flop-size”.
- Status: naprawione (e157b28); FP: mutanty giną (`docs/programista/dowody/fp-mutanty-M06-M12.txt`), CI kod 0 (`docs/programista/dowody/fp-ci-8380bee-partia1.txt`)

### 08-programista-006 · river-value: δ ≥ 0,5 to zwykły `Error`, nie błąd szablonu
- Pozycja listy kontrolnej: DEV-10
- Poziom: P2 (NIS)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D
- Dowód: generator sprawdza tylko dolną granicę δ (`packages/poker-core/src/scenario-gen.ts:851-853`); górną sprawdza `riverValueVerdict` i rzuca `Error` (`packages/poker-core/src/scenario-gen.ts:1172`). Bramka (`tools/content-build/src/scenariusze.ts`, gałąź river-value) też nie sprawdza δ < 0,5. Błąd dotrze do autora treści jako wynik `checkScenarioGenerator`, bez wskazania miejsca w YAML.
- Mechanizm: 1 trafienie.
- Powraca: nie
- Wzorzec lub źródło: D-1417 (δ ≥ 0,5 to błąd szablonu).
- Kroki w aplikacji: brak.
- Opcje: (a) w generatorze `TemplateError` dla δ ≥ 0,5 i błąd bramki z miejscem; (b) zostawić. Rekomendacja: (a).
- Test akceptacyjny: bramka zwraca błąd dla `marginMin: 0.5` w river-value.
- Status: naprawione (63e8591); FP: mutanty giną (`docs/programista/dowody/fp-mutanty-M06-M12.txt`), CI kod 0 (`docs/programista/dowody/fp-ci-8380bee-partia1.txt`)

## Do sprawdzenia (pewność ≤ 80%)
- Enum `pairKind` w `packages/content-schema/src/index.ts` i typ `PairKind` w `packages/poker-core/src/holding.ts:15` są dziś równe, ale przejście przez `as GeneratorTemplate` (`tools/content-build/src/scenariusze.ts:389`) nie wykryje rozjazdu. Brakuje: decyzji, czy content-schema może importować typ z poker-core albo czy wystarczy test przypięcia.
- Bramka flop-size nie wymaga tekstury `two-tone` (08-FD-3 mówi „flop two-tone”); na flopie monotonicznym rachunek nadal jest poprawny, więc to raczej sprawa treści SC-13 niż kodu. Brakuje: stanowiska roli 06.

## Co działa dobrze i należy zachować
- Wyrocznie niezależne od generatora: pełne przejście po talii w testach poker-core i content-build zamiast wywołań tej samej funkcji (`fl-river-value.test.ts`, 300 losowych układów).
- Brak cichego powrotu do całej talii w iso-size (`TemplateError`); test sprawdza, że brak spotu to błąd.
- Rodzaj bez widoku zablokowany na dwóch poziomach: bramka treści z powodem (`POWOD_POZA_EKRANEM`) i jawny błąd w mobile; zmiana listy wymaga ruszenia testu przypięcia.
- Commit strukturalny `silnaZrobiona` (f4c8c93a) oddzielony od zmian zachowania.
- Każda decyzja FL z odrzuconymi opcjami i warunkiem zależności.

## Decyzje dla właściciela
Brak. Znaleziska dotyczą testów i komunikatów; poziomy i werdykt to decyzje recenzenta (D-1445, D-1446 w `docs/decyzje/FO.md`), do weta.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003,08-programista-005,08-programista-006` (004 bez naprawy w kodzie; zakres jednej sesji, szacunek pracy agenta ok. 1 h, bez czasu właściciela).
