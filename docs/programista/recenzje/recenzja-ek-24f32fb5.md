# Recenzja niezależna EK: Programista (08, audit) — Szkoła Pokera — 2026-11-12
Commit: 24f32fb5 (zakres fc2a31e6..24f32fb5, 9 commitów EK) · Tryb: audit (recenzja EP) · Środowisko: Linux 6.18, Node v22.23.4, pnpm 10.28; bez Xcode i symulatora iOS (ekran sprawdzony testami RNTL, bez zrzutu). Raport autora EK nie był czytany przed oceną; `docs/decyzje/EK.md` i `docs/decyzje/EH.md` tylko jako opis zamiaru.

## Podsumowanie
**Werdykt: przyjęte z zastrzeżeniami.** Brak KRYT. Kod robi to, co mówią decyzje D-1165…D-1168 i D-1190: każda poprawka ma test, który był czerwony na kodzie sprzed commitu (6/6, `dowody/ep/czerwone-wynik.txt`), 13 z 14 moich mutantów zabitych (`dowody/ep/mutanty-wynik.txt`), `pnpm run ci` kod 0 (`dowody/ep-ci-24f32fb5.txt`). `poker-core`, `srs` i `content-schema` bez React Native. Trzy znaleziska WYS są **utajone**: dotyczą rodzajów punktów, które nie mają jeszcze treści w `content/` (pick-hand, turn-bet), więc dziś nie widzi ich nikt. Blokują dopiero pierwszą treść pick-hand (001, 002) i włączenie turn-bet na ekran (003). Najważniejsze: wyjaśnienia pick-hand przypięte do hand-a/hand-b przy losowej stronie poprawnej ręki są w ok. połowie wariantów fałszywe, a „SDV = 0” liczy remis jako przegraną.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | WYS (utajone) | D | pick-hand: wyjaśnienie przypięte do strony A/B, a poprawna strona jest losowa | otwarte |
| 08-programista-002 | WYS (utajone) | M | pick-hand: remis liczony jako przegrana, „SDV = 0” przy ręce, która dzieli pulę | otwarte |
| 08-programista-003 | WYS (utajone) | M | turn-bet: `hit` z nominalnych outów; przy brudnych outach mały zakład nie daje ceny (21,6% wariantów) | otwarte |
| 08-programista-004 | ŚR | D | pick-hand: przyciski i dziennik pokazują surowy zapis „Ah 4h” (bez i18n i bez nazwy dla czytnika) | otwarte |
| 08-programista-005 | ŚR | D | pick-hand: granica „nie mniej pasujących” (F równe) bez testu; mutant `>=`→`>` przeżył | otwarte |
| 08-programista-006 | NIS | D | testy wektorów ręcznych pick-hand z asercją warunkową (oczekiwanie z wyroczni, nie wpisane) | otwarte |
| 08-programista-007 | NIS | D | nieaktualne opisy progu 0,7 (komentarz `defendVsCbet`, nazwa testu bramki); commit 1503e4c5 czerwony | otwarte |

## Linia bazowa i założenia
Linia bazowa zbudowana z kodu i decyzji przed czytaniem testów EK: ścieżki zapisu w zakresie to tylko zapis wyboru `hand-a`/`hand-b` przez istniejący plan aktywności (`grafPunktow` kończy rozdanie każdą akcją, `jestAkcja` przyjmuje nowe akcje przy odczycie z bazy) — bez zmian schematu i migracji. Reszta zakresu to czysta logika generatora (poker-core), bramka budowania (content-build) i widok.

Wymiary pokrycia:
- Ścieżki zapisu: sprawdzone, bez zmian w porcie bazy; nowe akcje przechodzą walidację odczytu (`aktywnoscScenariusza.ts`, `parsujWybor`).
- Obsługa błędów: błędne szablony dają `TemplateError` (klasy w calls i folds, nieznana klasa); brak jednoznacznej odpowiedzi = odrzucenie wariantu, nie zgadnięta odpowiedź. Zdanie „Liczby” dla pick-hand puste zamiast zgadniętego (ok).
- Typy na granicach: schemat zod `ScenarioPickHandDecision` strict; klasy rąk sprawdzane w bramce i generatorze.
- System projektowy: widok z istniejących komponentów (`CardRow`, `PasekStrategii`); brak nowych kolorów i stylów poza układem rzędu (`odstep.m`). Wygląd: zadanie 04 (EK).
- Teksty przez i18n: znalezisko 004.
- Wydajność: `pickHandAnalysis` liczy siłę układu dla każdej kombinacji zakresu (setki × 2 ręce) na wariant; poza głównym wątkiem UI tylko przy generowaniu; akceptowalne.
- Testy na właściwym poziomie: logika w Node (vitest), widok w RNTL; wyrocznie częściowo niezależne (niżej).
- Dostępność: znalezisko 004.
- Liczby konfiguracyjne: `DEFEND_BIG_MIN` = 0,75 jako stała z testem zgodności z `cbet.size.big` (`szablony-eh.test.ts`), zgodnie z D-1166.

Soczewki: użytkownik VoiceOver (004), recenzent szukający ścieżki bez testu (005, mutanty), programista czytający moduł pierwszy raz (007), uczący się, któremu aplikacja tłumaczy decyzję (001–003). Wzorzec: rachunek szczebla 1 ADR-24 (equity na showdownie liczy remis jako połowę puli; pot odds z żywych outów).

Rejestr założeń: bez proponowanych zmian statusu.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/poker-core/src/scenario-gen.ts` (turn-bet, range-spot→cbet, pick-hand, defendVsCbet) | tak, cały diff | odczyt + mutanty M01–M11 (`dowody/ep/mutanty-wynik.txt`), sondy (`dowody/ep/sondy-wynik.txt`) |
| `packages/content-schema/src/index.ts` (pick-hand) | tak | odczyt; test bramki `ek-pick-hand-bramka.test.ts` |
| `tools/content-build/src/scenariusze.ts` (bramka defend, pick-hand, lista ekranu) | tak | odczyt + M12, M14, R3, R4 |
| `apps/mobile/src/features/scenariusz/{wariant,EkranScenariusza,liczby}.ts(x)` | tak | odczyt + M13, R6 (RNTL) |
| Testy w zakresie (11 plików) | tak | odczyt diffu; grep `.skip/.only/xit/todo/expect(true)`: 0 trafień |
| `generator-odciski.json` (GENERATOR_WERSJA 4) | tak | diff: zmienione tylko sc-04 (łatwy) i sc-05 (łatwy, średni) |
| Pełne CI | tak | `dowody/ep-ci-24f32fb5.txt` (kod 0) |
| Ekran na urządzeniu / zrzut | nie | brak symulatora iOS; Expo web nie uruchamiane (widok minimalny, RNTL) |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-ek-24f32fb5.md . docs/programista --rola 08-programista` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”, kod 0 (skrypt w scratchpadzie sesji, kopia z promptu roli). Sekrety: diff zakresu bez kluczy, `.env` ani certyfikatów.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 logika domenowa z testami | dotyczy | ok: każda gałąź z testem; mutanty 13/14 zabite; luka 005 |
| DEV-02 testy przed kodem | dotyczy | 6/6 poprawek czerwonych na kodzie sprzed commitu (R1–R6); 6/6 commitów zmieniających zachowanie (3d5183e8, becd739e, 738fefc9, ac6bde33, dac7e449, 1503e4c5) zmienia test w tym samym commicie; 1503e4c5 zostawił czerwony test listy (007) |
| DEV-03 testy nieosłabione | dotyczy | ok: usunięte asercje (`toBeNull` dla gutshot/backdoor, 0,7 → fold) zastąpione zgodnie z D-1166…D-1168; „call-lub-null” usunięte = wzmocnienie; asercje warunkowe: 006 |
| DEV-04 testy, typecheck, lint | dotyczy | ok: `pnpm run ci` kod 0 (`dowody/ep-ci-24f32fb5.txt`) |
| DEV-05 zapis bez kasowania | nie dotyczy | zakres bez zmian zapisu i schematu |
| DEV-06 migracje i kopie | nie dotyczy | bez migracji |
| DEV-07 brak zgadywanych wartości | dotyczy | ok: pick-hand bez zdania „Liczby” zamiast zgadniętego; `?? ''` w `PasekStrategii` istniało wcześniej |
| DEV-08 daty | nie dotyczy | brak dat w zakresie |
| DEV-09 typy na granicy | dotyczy | ok: zod strict; `as unknown as` tylko w testach |
| DEV-10 błędy | dotyczy | ok: `TemplateError`, odrzucenie wariantu; `opisAkcji` rzuca dla hand-a/hand-b (stan niemożliwy, `tekstAkcji` obsługuje pick-hand wcześniej) |
| DEV-11 tokeny | dotyczy | ok (widok z komponentów systemu; wygląd do 04) |
| DEV-12 i18n | dotyczy | znalezisko 004 |
| DEV-13 liczby konfiguracyjne | dotyczy | ok (D-1166, test zgodności z numbers.yaml) |
| DEV-14 sekrety | dotyczy | ok |
| DEV-15 zasoby | nie dotyczy | brak efektów, timerów i nasłuchów w zakresie |
| DEV-16 jednostki | dotyczy | ok: ułamki puli, bb bez mieszania |

Zadania z polecenia EP:
- **EI-001** (turn-bet, ręka zrobiona + żywy out): wykonane zgodnie z D-1190 (a); test odtwarzający czerwony na kodzie sprzed (R1). Zgodność z rachunkiem szczebla 1: **częściowa** — patrz 003.
- **EI-002** (mutanty): testy EK zabijają M01, M02 i margines (`ef-turn-bet.test.ts`).
- **EI-003/005/006**: bramka liczy zakład po zaokrągleniu (M12 zabity), gracz BB i spot `vs-open.bb-*` (M14 zabity, R4 czerwony), komunikat list-hand przypięty.
- **08-EH-1**: dolosowanie flopu tylko przy szablonie z cbet-case (`packages/poker-core/src/scenario-gen.ts:604-607`); 10 000 wariantów bez odrzuceń seryjnych; R5 czerwony (błąd szablonu: 5000 odrzuceń z rzędu), M10 zabity; GENERATOR_WERSJA 4, odciski zmienione tylko dla sc-04 i sc-05.
- **08-EH-2** (próg 0,75 włącznie): M03 zabity; test na 0,749 / 0,75.
- **08-EH-3** (gutshot i backdoor strita ≥ T → call): M04, M05 zabite; wyrocznia losowa 20 000 w `scenario-dx.test.ts` niezależna od `defendVsCbet` (własne okno rang i licznik koloru).
- **KO-072 pick-hand**: silnik, schemat, bramka, widok i RNTL są; wyrocznia liczy kombinacje przejściem po parach talii z `classOf` (generator: `classCombos`) — niezależna w liczeniu V/F, wspólna z generatorem w ewaluatorze `strength` i w regule decyzji (przepisanej z D-1054). Znaleziska 001, 002, 004–006.

## Znaleziska

### 08-programista-001 · pick-hand: wyjaśnienie przypięte do strony A/B, a poprawna strona jest losowa
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 (WYS według progu wydania: błędne twierdzenie merytoryczne; utajone, bo `content/` nie ma szablonu pick-hand)
- Realność: realny (przy pierwszej treści) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/wariant.ts:358` wybiera tylko rękę do `{{w:reka}}`; tekst pochodzi z `spec.actions` dla akcji `hand-a`/`hand-b`. Jedyny warunek bloków to `nadkarty` (`apps/mobile/src/features/scenariusz/wariant.ts:336`).
- Dowód (fixture, hand-a): `tools/content-build/test/fixtures/pick-hand/sc-fx-pick-hand.yaml:19` „ta ręka blokuje ręce rywala, które sprawdzą”. Sonda: w trybie blockers poprawna jest hand-b w 147/300 wariantów (`dowody/ep/sondy-wynik.txt`) — wtedy to zdanie jest fałszywe. Test `apps/mobile/src/features/scenariusz/__tests__/ek-pick-hand-ekran.test.tsx:87` utrwala zachowanie (oczekuje tekstu hand-a niezależnie od poprawności).
- Mechanizm: wyjaśnienia kluczowane identyfikatorem akcji, który przy pick-hand nie niesie znaczenia (strona losowa); bramka (`tools/content-build/src/scenariusze.ts:296`) przepuszcza pick-hand na ekran.
- Powraca: nie
- Wzorzec lub źródło: D-1054 (tekst ma tłumaczyć, dlaczego ta ręka); BR-OCE-002
- Kroki w aplikacji: po dodaniu szablonu jak fixture: wybierz rękę A, gdy poprawna jest B → blok „słabsza” mówi, że A blokuje sprawdzające.
- Opcje: (a) wyjaśnienia pick-hand kluczowane rolą (`best`/`other`), mapowane na stronę w `bloki` — mała zmiana schematu i widoku; (b) warunek `{{jesli:…}}` z wartościami pick-hand (np. `poprawna`) — elastyczne, ale autor treści musi pisać oba warianty w każdym tekście. Rekomendacja: (a).
- Test akceptacyjny: dla ziaren z `correct = hand-b` blok „lepsza” zawiera tekst „ręki lepszej”, blok „słabsza” tekst „ręki gorszej”, z kartami właściwej ręki; bramka odrzuca pick-hand bez obu tekstów ról.
- Status: otwarte

### 08-programista-002 · pick-hand: remis liczony jako przegrana, „SDV = 0” przy ręce, która dzieli pulę
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 (WYS utajone: rachunek szczebla 1 ADR-24)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: `packages/poker-core/src/scenario-gen.ts:985` liczy tylko ścisłe wygrane („moja < strength”); remisy nie wchodzą do SDV. Sonda (`dowody/ep/sondy-wynik.txt`): ręka uznana za blef bez SDV remisuje z ≥ 1 kombinacją zakresu w 94/300 wariantów (showdown) i 122/300 (blockers); ziarno 1 blockers: 23 remisy na 62 kombinacje, 0 wygranych. Mutant M08 (remis = wygrana) zabity, więc test wiernie przypina obecną definicję (wyrocznia ma ten sam `<`).
- Mechanizm: definicja SDV bez udziału remisów; ta sama w wyroczni `ek-pick-hand.test.ts`, więc test jej nie zakwestionuje.
- Powraca: nie
- Wzorzec lub źródło: rachunek (szczebel 1): przy remisie gracz odzyskuje połowę puli, więc ręka ma wartość na showdownie; D-1054 („ręka wygrywająca czasem przy showdownie nie blefuje”) nie rozstrzyga remisu.
- Kroki w aplikacji: po dodaniu treści: ekran nazywa blefem rękę, która w ok. 37% przypadków (ziarno 1) dzieli pulę.
- Opcje: (a) SDV = (wygrane + ½ remisów) / razem — zgodne z rachunkiem, zmienia odciski i wymaga GENERATOR_WERSJA 5 tylko, jeśli pick-hand trafi do treści przed zmianą (dziś bez treści: bez podnoszenia); (b) odrzucać warianty, w których kandydat bez wygranych ma remisy — prostsze dydaktycznie, mniejsza akceptacja. Rozstrzyga rola 06 (ADR-24); rekomendacja programisty: (a) w trybie showdown, (b) w trybie blockers (obie ręce „czysto” bez SDV).
- Test akceptacyjny: wektor ręczny z remisem (np. 7h6h na Ts9h4d3c2s wobec 76s w zakresie) ma SDV > 0 albo wariant odrzucony; wyrocznia liczy remis jawnie.
- Status: otwarte

### 08-programista-003 · turn-bet: `hit` z nominalnych outów; przy brudnych outach mały zakład nie daje ceny
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 (WYS utajone: turn-bet poza `RODZAJE_NA_EKRANIE` i bez treści)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: `packages/poker-core/src/scenario-gen.ts:719` wymaga tylko jednego żywego outu, a `packages/poker-core/src/scenario-gen.ts:726` bierze szansę z nominalnych outów drawa. Sonda (3000 ziaren, `dowody/ep/sondy-wynik.txt`): żywe outy/44 < `hit` w 1745 wariantach; żywe outy/44 ≤ cena małego zakładu w **648 (21,6%)** — tam lekcja "mały zakład daje cenę" jest fałszywa. Przykład ziarno 8: 4c9c wobec 7hKh na 4dJh3h9d, hit 0,196, żywe 7/44 = 0,159, cena małego 0,167 (4h i 9h dają graczowi fulla).
- Mechanizm: EI-001 opcja (a) zamyka tylko przypadek 0 żywych outów; opcja (b) odłożona do roli 06 (D-1190).
- Powraca: tak, EI-001 (recenzja EI) → trwała kontrola: test „żywe outy/44 > cena małego i < cena dużego”.
- Wzorzec lub źródło: rachunek pot odds (szczebel 1 ADR-24); D-1190 (odłożona opcja b).
- Kroki w aplikacji: brak dziś (turn-bet bez widoku); wystąpi przy włączeniu na ekran.
- Opcje: (a) `hit` z żywych outów (licznik jak w teście EI-001) i ten sam warunek progów — zgodne z rachunkiem, mniej wariantów; (b) odrzucać warianty z martwymi outami — prostsze tłumaczenie („9 outów”), większa strata wariantów. Rozstrzyga 06 (ADR-24); warunek blokujący: przed dodaniem turn-bet do `RODZAJE_NA_EKRANIE`.
- Test akceptacyjny: 3000 ziaren, każdy wariant: żywe outy rywala/44 (albo /46 według wybranej perspektywy, zapisanej w decyzji) > cena małego i < cena dużego zakładu.
- Status: otwarte

### 08-programista-004 · pick-hand: przyciski i dziennik pokazują surowy zapis „Ah 4h”
- Pozycja listy kontrolnej: DEV-12
- Poziom: P2 (ŚR; barierę dostępności rozstrzyga 04 przed treścią)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:51` składa nazwę akcji z `cardToString` (litery kolorów po angielsku, np. „Ah 4h”) i używa jej jako tekstu przycisku (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:254`), w dzienniku i na liście końcowej. Inne miejsca podają czytnikowi nazwę z kluczy `card.*` (`nazwaKarty`, `apps/mobile/src/components/PlayingCard.tsx:27`).
- Mechanizm: zapis techniczny kart jako tekst widoczny; to samo w 35 językach.
- Powraca: nie
- Wzorzec lub źródło: zasada programisty 8 (i18n), A04-10 (D-284) nazwy kart dla czytnika
- Kroki w aplikacji: punkt pick-hand → VoiceOver czyta przycisk „A h 4 h”.
- Opcje: (a) etykieta przycisku z `nazwaKarty` (dostępność) i karty jako `[[…]]` RichText w tekście — bez nowych kluczy; (b) nowe klucze „Ręka A/Ręka B” + karty obok — wymaga 04/09. Rekomendacja: (a) teraz, (b) z makietą 04.
- Test akceptacyjny: RNTL: przycisk ma `accessibilityLabel` z nazwami kart z `card.*`; brak surowego „Ah” w drzewie tekstu poza `[[…]]`.
- Status: otwarte

### 08-programista-005 · pick-hand: granica „nie mniej pasujących” bez testu
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 (ŚR)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: mutant M07 (`a.f >= b.f` → `a.f > b.f` w `packages/poker-core/src/scenario-gen.ts:992`) przeżył: 7/7 testów zielonych (`dowody/ep/mutanty-wynik.txt`). Żaden wektor nie ma F równych przy różnym V.
- Mechanizm: brak wektora granicznego dla reguły D-1054.
- Powraca: nie
- Wzorzec lub źródło: D-1054 („nie mniej pasujących”)
- Kroki w aplikacji: brak bezpośrednich; regresja reguły przeszłaby niezauważona.
- Opcje: jedna — dopisać wektor ręczny z F równym, V różnym (np. dwie ręce bez kart klas folds); powód: to brak testu, nie decyzja.
- Test akceptacyjny: M07 zabity.
- Status: otwarte

### 08-programista-006 · testy wektorów ręcznych pick-hand z asercją warunkową
- Pozycja listy kontrolnej: DEV-03
- Poziom: P2 (NIS)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D
- Dowód: `packages/poker-core/test/ek-pick-hand.test.ts:51` „expect(r.correct).toBe(wa.sdv === 0 && wb.sdv > 0 ? 0 : null)” — gdy obie strony dadzą null, test przechodzi bez sprawdzenia SC-23a; test „brak dominacji w obu liczbach → null” (`packages/poker-core/test/ek-pick-hand.test.ts:65`) nie sprawdza `null`, tylko zgodność z wyrocznią.
- Mechanizm: oczekiwanie wyliczane w teście zamiast wpisanego.
- Powraca: nie
- Wzorzec lub źródło: wzorce programisty „Dobry test” (wynik oczekiwany X)
- Kroki w aplikacji: brak.
- Opcje: jedna — wpisać oczekiwane wartości (`correct`, V, F) dla wektorów; powód: test ma przypinać wynik.
- Test akceptacyjny: wektory mają literały oczekiwane; test 65 sprawdza `toBeNull()`.
- Status: otwarte

### 08-programista-007 · nieaktualne opisy progu 0,7; commit 1503e4c5 czerwony
- Pozycja listy kontrolnej: DEV-02
- Poziom: P2 (NIS)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D
- Dowód: `packages/poker-core/src/scenario-gen.ts:1045` „Duży (≥ 0,7)” (kod: 0,75); `tools/content-build/test/ef-defend-bramka.test.ts:23` nazwa „(0,4–0,7)”. Commit 1503e4c5 zmienił `RODZAJE_NA_EKRANIE` bez testu listy (poprawka w 88e873a0; sam EK to odnotował w `docs/programista/dowody/ek-ci-88e873a0.txt:2`).
- Mechanizm: opis nie poszedł za D-1166; commit pośredni nieprzechodzący (utrudnia bisect).
- Powraca: nie
- Wzorzec lub źródło: D-1166
- Kroki w aplikacji: brak.
- Opcje: jedna — poprawić dwa opisy przy najbliższej zmianie pliku.
- Test akceptacyjny: grep „0,7)” w obu plikach pusty.
- Status: otwarte

## Do sprawdzenia
- D-1054: „kandydaci raczej nietrafione strity niż kolory” — generator losuje dowolne dwie ręce; czy to wymóg, czy wskazówka dla treści: [DO USTALENIA] rola 06.
- Perspektywa ceny drawa (46 kart z punktu widzenia rywala vs 44 przy znanych kartach) do zapisu przy 003: [DO USTALENIA] rola 06.

## Co działa dobrze i należy zachować
- Każda poprawka z testem czerwonym na kodzie sprzed commitu z właściwego powodu (asercja albo „5000 odrzuceń z rzędu”, nie błąd importu).
- Wyrocznia pick-hand liczy kombinacje inną drogą niż generator (pary talii + `classOf`).
- Brak jednoznacznej odpowiedzi = odrzucenie wariantu, nie zgadnięta odpowiedź (D-1054, D-1168).
- Zmiana wersji generatora tylko z dowodem, które odciski się zmieniają (sc-04, sc-05).

## Decyzje dla właściciela
Brak decyzji produktowych. Merytoryczne (ADR-24, rola 06): 002 i 003. Decyzje EP: D-1250, D-1251 (`docs/decyzje/EP.md`), do weta.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-004,08-programista-005,08-programista-006,08-programista-007` (002 i 003 po decyzji roli 06).
