# Audyt: Programista — Szkoła Pokera — recenzja niezależna CN — 2026-11-11
Commit: `3ab616b` (zakres `9143dec..3ab616b`: 08abdad, 3ab616b) · gałąź `sesja-cp-recenzja` (start = `sesja-cn-kontekst` @ 3ab616b, zgodny z poleceniem) · Tryb: audit (recenzja D-043, polecenie CP) · Środowisko: Linux 6.18, Node 22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; bez macOS/Xcode (ekran sprawdzony testami Jest z react-native-testing-library i odczytem kodu, bez zrzutów z urządzenia). Ścieżki dowodów względem `docs/programista`.

## Podsumowanie
Werdykt: **przyjąć warunkowo** (0 KRYT, 3 WYS, 1 ŚR, 1 NIS). Dzisiejsza treść ma tylko punkty draw-call (72 szablony w 35 językach), więc scalenie nie psuje niczego, co widzi tester; kontekst generatora, odcisk w planie i ICM tylko BB wobec SB działają i mają niezależne potwierdzenie. Ale bramka `checkScenarioNaEkran` po CN przepuszcza rodzaje punktów, które ekran psuje: c-bet albo rozmiar z dwiema akcjami szablonu kończy się wyjątkiem na ekranie oceny (001), każda akcja poza najlepszą dostaje „Błąd”, choć reguła daje „dopuszczalne” albo „niedokładność” (002), a decyzja ICM jest oceniana na stosach i wypłatach, których ekran nie pokazuje (003). Warunek przyjęcia: naprawa 001–003 albo zawężenie listy dozwolonych do rodzajów bez tych defektów, zanim rola 06 doda pierwszy szablon F2–F4 (D-807). Zmiana testu ŚR-001 CM nie osłabia kontroli rodzaju punktu, ale jej nowa nazwa („bramka zgodna z ekranem”) obiecuje więcej, niż test sprawdza (004).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | WYS | D | C-bet albo rozmiar z dwiema akcjami szablonu przechodzi bramkę, a ekran pokazuje trzecią akcję bez wyjaśnienia i rzuca wyjątek na ocenie | otwarte |
| 08-programista-002 | WYS | M | Ekran ocenia każdą akcję c-betu i rozmiaru poza najlepszą jako „Błąd”; reguła (silnik gry) daje „dopuszczalne” albo „niedokładność” | otwarte |
| 08-programista-003 | WYS | M | Decyzja ICM oceniana na stosach i wypłatach, których ekran nie pokazuje; na poziomie trudnym poprawna odpowiedź przeczy jedynemu widocznemu rachunkowi | otwarte |
| 08-programista-004 | ŚR | D | Test ŚR-001 po zmianie nazywa się „bramka zgodna z ekranem”, a sprawdza tylko, że generator daje wariant | otwarte |
| 08-programista-005 | NIS | D | `getKontekstGeneratora` przyjmuje JSON z bazy treści przez `as` bez parsowania | otwarte |

## Linia bazowa i założenia
Ocena z kodu i diffów przed przeczytaniem uzasadnień autora (`docs/decyzje/CN.md`, `docs/programista/stan-cn.md` przeczytane po własnej ocenie, tylko żeby odróżnić decyzje od defektów: D-783 wybrało akcje ekranu z punktu wariantu bez porównania z akcjami szablonu, D-785 odnotowało brak „Liczb” ICM jako sprawę tekstów roli 04; żadne z 001–003 nie jest w nich rozważone, więc zostają znaleziskami).
- **Ścieżki zapisu:** `otworzScenariusz` zapisuje plan z `odcisk` (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:108`); `plan` to kolumna TEXT z JSON, bez zmiany schematu, migracji ani formatu eksportu; `parsujPlan` przyjmuje plan bez odcisku (sprzed CN) i odrzuca odcisk niebędący napisem (`packages/postep/test/plan-odcisk-cn.test.ts`). Starsza wersja aplikacji czyta plan z odciskiem (pole pomijane). Wznowienie przy niezgodnym odcisku zaczyna nowe rozdanie i porzuca stare z zachowaniem odpowiedzi (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:68`, test `wznowienie-cn.test.ts`). Bez `OR REPLACE` i bez usuwania wierszy.
- **Obsługa błędów:** błąd odczytu kontekstu → dziennik `odczyt_nieudany` i `plan_niepoprawny` (`apps/mobile/src/app/scenario.tsx:77`), bez zgadywanych progów. Wyjątek z `bloki()` przy akcji bez wyjaśnienia ląduje w renderze (001).
- **Typy na granicach:** kontekst z bazy treści bez parsowania (005).
- **System projektowy, teksty:** bez nowych kluczy; nazwy akcji z `play.*` (ocena niżej); brak tekstów stosów ICM (003).
- **Wydajność:** `getKontekstGeneratora` przy każdym otwarciu czyta `ranges` i (dla ICM) 350 KB `equity169`; dziś tylko dla szablonów F2–F4, których treść nie ma. Bez pomiaru na urządzeniu, poza znaleziskami.
- **Testy na właściwym poziomie:** kontekst i wariant na prawdziwej bazie treści przez `node:sqlite` (`apps/mobile/src/test-utils/kontekstCn.ts`); ekran przez render. Testy CN używają fixture z pełnym zestawem akcji, więc nie dotykają 001.
- **Dostępność:** przyciski akcji mają nazwy z etykiet (`PasekStrategii`), zapowiedź oceny z nazwą akcji (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:191`); bez nowego znaleziska.
- **Soczewki:** (1) recenzent szukający ścieżki bez testu → 001 (szablon z dwiema akcjami), 004; (2) programista czytający moduł pierwszy raz → `akcjePunktu` nie patrzy na szablon, a `bloki` zakłada wyjaśnienie każdej akcji (001); (3) użytkownik przerwany w połowie → wznowienie z odciskiem działa; (4) rachunek szczebla 1 (ADR-24) → 002, 003.
- **Wzorzec najlepszych:** bramka konsumenta treści sprawdza wszystko, co konsument zakłada (rodzaj punktu, zestaw akcji, dane potrzebne do decyzji), a ocena ekranu ma tę samą skalę co reguła, na której stoi (jak tryb gry).
- **Wyrocznie niezależne od generatora (D-805):** F2/F3 przez `gradeDecision` na prawdziwym rozdaniu; F4 przez własny Malmuth-Harville w teście; wynik w „Co działa dobrze” i 002.
- **Etykiety bez nowych tekstów:** „Czekam”, „Mały c-bet”, „Duży c-bet”, „Przebicie do N bb” (trzy rozmiary rozróżnia kwota), limp „Sprawdzam 0.5bb”/„1bb” (to samo co tryb gry dla dopłaty do dużego blinda), ICM „Sprawdzam 9bb” i dziennik „SB: all-in 10bb” są zgodne z rachunkiem kwot (wyrocznia ICM) i nie wprowadzają w błąd co do akcji; mylący jest tylko stół ICM, który pokazuje obu graczom stos 10 bb (efektywny), a nie ich stosy (część 003).
- Rejestr założeń: bez propozycji zmian statusu.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/poker-core/src/scenario-gen.ts` (`buildGeneratorContext`, icm-call tylko BB/SB) | tak | odczyt; wyrocznia ICM w `apps/mobile/src/features/scenariusz/__tests__/cp-recenzja-cn.test.tsx` |
| `tools/content-build/src/build.ts`, `scenariusze.ts` (kontekst, `RODZAJE_NA_EKRANIE`, `equity169` w bazie) | tak | odczyt; test bramki `tools/content-build/test/cp-recenzja-cn.test.ts`, `dowody/cp-czerwone-content-build.txt` |
| `tools/content-build/test/cm-recenzja-cl.test.ts` (zmiana ŚR-001, ŚR-002) | tak | diff i odczyt (004) |
| `apps/mobile/src/data/content/repo.ts` (`getKontekstGeneratora`) | tak | odczyt (005); użyty w testach CP |
| `apps/mobile/src/features/scenariusz/wariant.ts`, `EkranScenariusza.tsx`, `komponenty.tsx`, `aktywnoscScenariusza.ts`, `apps/mobile/src/app/scenario.tsx` | tak | odczyt; render w `dowody/cp-czerwone-mobile.txt` |
| `packages/domena/src/maszyny.ts`, `packages/postep/src/aktywnosci.ts` (odcisk w planie; ścieżka wrażliwa) | tak | odczyt; testy CN `plan-odcisk-cn`, `wznowienie-cn` w przebiegu CI |
| Eksport/import, migracje | tak | `plan` to TEXT bez zmiany schematu; `packages/postep/src/daneUzytkownika.ts` bez zmian w zakresie |
| Treść `content/*/scenarios` | tak | `grep kind:` → 72 × draw-call, brak F2–F4 |
| Zachowanie na urządzeniu iOS, zrzuty | nie | brak macOS; logika i render sprawdzone w Jest |

## Kontrola dowodów i sekretów
Wynik `node sprawdz-raport.mjs docs/programista/recenzje/recenzja-cn-3ab616b.md . docs/programista --rola 08-programista` (kopia skryptu w scratchpadzie): `OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista`, kod 0. `git diff --cached` przejrzany przed commitem: testy, raport, decyzje, dowody; bez sekretów.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy (ocena F2–F4, kwoty, kontekst) | 002, 003; kwoty i poprawne akcje zgodne z wyrocznią |
| DEV-02 | dotyczy (1 commit zmieniający zachowanie: 08abdad) | 1/1: testy w tym samym commicie; brak testu ekranu dla szablonu z niepełnymi akcjami (001) |
| DEV-03 | dotyczy (zmiana `it.fails` CM) | 004 (nazwa ponad zakres); brak `.skip`/`.only`; `it.fails` ŚR-002 → `it` uzasadnione naprawą |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 (`dowody/cp-ci-7cda372.txt`) |
| DEV-05 | dotyczy (plan z odciskiem) | ok: zapis bez zmian ścieżki, JSON w istniejącej kolumnie |
| DEV-06 | nie dotyczy: brak migracji i kopii w zakresie | — |
| DEV-07 | dotyczy (`getKontekstGeneratora`) | ok: brak progów → `undefined` i odmowa generatora, bez wartości domyślnych |
| DEV-08 | nie dotyczy: brak dat w zakresie | — |
| DEV-09 | dotyczy | 005 |
| DEV-10 | dotyczy | 001 (wyjątek w renderze zamiast błędu treści w budowaniu) |
| DEV-11 | dotyczy (zmiany ekranu) | ok: tokeny z `useTokens`, komponenty `PasekStrategii`, `Werdykt`; bez nowych kolorów |
| DEV-12 | dotyczy | ok: teksty przez `t()`; brak tekstów stosów ICM to 003 |
| DEV-13 | dotyczy | ok: `SIZE_SMALL_FACTOR`, `ICM_STRUCTURES` w poker-core, jedna definicja kontekstu |
| DEV-14 | dotyczy | ok: diff bez sekretów |
| DEV-15 | nie dotyczy: brak nowych nasłuchów i timerów | — |
| DEV-16 | dotyczy (bb, żetony ICM) | ok: kwoty w bb, żetony tylko w wariancie; przeliczenie w teście wyroczni zgodne |

## Znaleziska (szczegóły)

### 08-programista-001 · C-bet albo rozmiar z dwiema akcjami szablonu przechodzi bramkę, a ekran pokazuje trzecią akcję bez wyjaśnienia i rzuca wyjątek na ocenie
- Pozycja listy kontrolnej: DEV-10
- Poziom: WYS (awaria ekranu oceny)
- Realność: brzegowy (dziś brak treści F2/F3; pierwszy szablon roli 06 z dwiema akcjami trafia do użytkownika) · Pewność: wysoka
- Rodzaj: D
- Dowód: schemat dopuszcza 2 akcje c-betu (`packages/content-schema/src/index.ts:577`) i rozmiaru (`packages/content-schema/src/index.ts:597`); `checkScenarioTemplate` wymaga tylko `raise` plus mały i/lub duży (`tools/content-build/src/scenariusze.ts:144`); bramka ekranu sprawdza sam rodzaj (`tools/content-build/src/scenariusze.ts:201`). Ekran: `akcjePunktu` dla c-betu zawsze trzy akcje (`apps/mobile/src/features/scenariusz/wariant.ts:31`), dla rozmiaru opcje generatora (`apps/mobile/src/features/scenariusz/wariant.ts:33`), a `bloki` rzuca przy akcji bez wyjaśnienia (`apps/mobile/src/features/scenariusz/wariant.ts:189`). Test `tools/content-build/test/cp-recenzja-cn.test.ts`: szablony `sc-fx-cbet-dry` bez `bet-big` i `sc-fx-3bet-ip` bez `raise-big` przechodzą całą bramkę (`expected [] to not deeply equal []`, `dowody/cp-czerwone-content-build.txt`); render: przycisk "Duży c-bet" obecny, ocena zgodnej akcji kończy się "sc-cn-cbet: brak wyjaśnienia akcji bet-big" i "sc-cn-3bet: brak wyjaśnienia akcji raise-big" (`dowody/cp-czerwone-mobile.txt`).
- Mechanizm: ekran bierze listę akcji z wariantu, a teksty z szablonu, i nikt nie sprawdza, że pierwsza jest podzbiorem drugiej; `grep -n "akcjePunktu(" apps/mobile/src` → `apps/mobile/src/features/scenariusz/wariant.ts:92` (graf planu), `apps/mobile/src/features/scenariusz/wariant.ts:129` (oceny), `apps/mobile/src/features/scenariusz/wariant.ts:194` (bloki), `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:193` (przyciski): wszystkie cztery użycia zakładają wyjaśnienie każdej akcji.
- Powraca: CM 08-programista-001 (bramka ekranu niepełna) → trwała kontrola: test bramki z szablonem o niepełnych akcjach (ten raport) i test kontraktu "każda akcja ekranu ma wyjaśnienie" dla każdego rodzaju z `RODZAJE_NA_EKRANIE`.
- Wzorzec lub źródło: BR-OCE-002 (wyjaśnienie każdej akcji); zasada "bramka sprawdza, co konsument zakłada" (Linia bazowa).
- Kroki w aplikacji: szablon F2 z akcjami `bet-small`, `check` → scenariusz → przycisk "Duży c-bet" bez treści; wybór najlepszej akcji → ekran oceny pada (wyjątek w renderze).
- Opcje: (a) bramka wymaga pełnego zestawu akcji ekranu (c-bet: trzy; rozmiar poza no-limp: trzy) — tanio, ogranicza autora treści; (b) ekran pokazuje tylko akcje z wyjaśnieniem (przecięcie wariantu i szablonu), bramka sprawdza, że oczekiwana akcja jest w przecięciu — elastyczniej, ale ocena "dlaczego nie" obejmuje mniej akcji niż reguła. Rekomendacja: (a), bo BR-OCE-002 i tak wymaga wyjaśnienia każdej akcji, którą da się wybrać.
- Test akceptacyjny: `it.fails` w `tools/content-build/test/cp-recenzja-cn.test.ts` i `it.failing` WYS-001 w `apps/mobile/src/features/scenariusz/__tests__/cp-recenzja-cn.test.tsx` zamienione na `it` i zielone.
- Status: otwarte

### 08-programista-002 · Ekran ocenia każdą akcję c-betu i rozmiaru poza najlepszą jako „Błąd”; reguła (silnik gry) daje „dopuszczalne” albo „niedokładność”
- Pozycja listy kontrolnej: DEV-01
- Poziom: WYS (błędna ocena merytoryczna)
- Realność: brzegowy (dziś brak treści F2/F3) · Pewność: wysoka
- Rodzaj: M
- Dowód: `trescZWariantu` daje częstość 1 najlepszej akcji i 0 pozostałym (`apps/mobile/src/features/scenariusz/wariant.ts:111`), `ocenyAkcji` wprost "zgodne"/"blad" (`apps/mobile/src/features/scenariusz/wariant.ts:129`). Reguła c-betu w silniku gry (cytat niżej), zły rozmiar = `inaccuracy` (`packages/poker-core/src/grading.ts:421`). Wyrocznia (D-805, `gradeDecision` na prawdziwym rozdaniu BTN vs BB i CO vs BTN): c-bet R-M5-007 best small → `bet-small` zgodne, `check` dopuszczalne, `bet-big` niedokładność; 3-bet R-M4-001 → mały i duży rozmiar niedokładność. Ekran: `check` i `bet-big` "blad", `raise-small`/`raise-big` "blad" (`dowody/cp-czerwone-mobile.txt`, "Expected - 2 / Received + 2").
- Cytat: `packages/poker-core/src/grading.ts:383` „reguły c-betu są częstotliwościowe („często”, „rzadziej”): rzadsza akcja jest dopuszczalna, nie błędem (5.2)”
- Mechanizm: skala ocen draw-call (rachunek, dwie akcje: zgodne/błąd) przeniesiona na reguły częstotliwościowe i rozmiaru; `grep -n "czestosc: a.akcja === poprawnaAkcja" apps/mobile/src` → 1 trafienie (`apps/mobile/src/features/scenariusz/wariant.ts:111`).
- Powraca: nie
- Wzorzec lub źródło: ADR-24 (ocena zgodna z regułą, na której stoi); D-695 (F2 "jak grading.ts").
- Kroki w aplikacji: szablon F2 (best: mały c-bet) → "Czekam" → werdykt "Błąd", a ta sama akcja w trybie gry daje "dopuszczalne".
- Opcje: (a) częstości/oceny akcji punktu z oceny reguły (`gradeDecision` albo wspólna funkcja oceny przypadku c-betu i rozmiaru w poker-core, użyta i przez grading, i przez wariant) — jedna definicja; (b) mapowanie stałe w `wariant.ts` (best/dopuszczalne/niedokładność) — tanio, ale druga definicja reguły. Rekomendacja: (a).
- Test akceptacyjny: `it.failing` WYS-002 ("oceny ekranu = oceny silnika gry") zamienione na `it` i zielone; test "mechanizm" zaktualizowany.
- Status: otwarte

### 08-programista-003 · Decyzja ICM oceniana na stosach i wypłatach, których ekran nie pokazuje; na poziomie trudnym poprawna odpowiedź przeczy jedynemu widocznemu rachunkowi
- Pozycja listy kontrolnej: DEV-01
- Poziom: WYS (decyzja bez danych potrzebnych do odpowiedzi; ocena nieweryfikowalna dla użytkownika)
- Realność: brzegowy (dziś brak treści F4) · Pewność: wysoka
- Rodzaj: M
- Dowód: próg ICM zależy od losowej struktury wypłat i stosów (`packages/poker-core/src/scenario-gen.ts:411`; `packages/poker-core/src/icm.ts:43`), a generator zakłada "stacki są pokazane w decyzji" (`packages/poker-core/src/scenario-gen.ts:421`). Ekran pokazuje stół z jednym stosem `stackBb` dla obu graczy (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:218`), pulę 11 bb, dopłatę 9 bb i all-in rywala; tekst ekranu z testu: "BB · ty · 10 bb … W puli (pot) 11 bb · do sprawdzenia (call) 9 bb … SB: all-in 10bb" (bez wypłat i stosów pozostałych graczy, `dowody/cp-czerwone-mobile.txt`). Fixture ICM `trudny` ma `chipsDiffer: true`: poprawne "Pas" przy equity ≥ 50% (test "warunek wstępny"), więc widoczny rachunek (cena 9 do 20) wskazuje "Sprawdzam".
- Mechanizm: wariant `icm-call` niesie `payouts`, `stacks`, `heroIndex`, `villainIndex`, a widok decyzji (`widokDecyzji`) i stół używają tylko `stackBb`; `grep -n "stacks\|payouts" apps/mobile/src/features/scenariusz` → 0 trafień.
- Powraca: nie (D-785 CN odnotowało brak "Liczb" ICM, nie brak danych wejściowych decyzji)
- Wzorzec lub źródło: BR-OCE-001 (sytuacja z wariantu w wyjaśnieniu); rachunek ICM (szczebel 1) potwierdzony wyrocznią Malmuth-Harville.
- Kroki w aplikacji: szablon F4, poziom trudny → ręka z equity ≥ 50% wobec all-inu 10 bb → "Sprawdzam" → "Błąd", bez informacji, że to bańka z wypłatami 60/40 i jakie są stosy.
- Opcje: (a) ekran decyzji ICM pokazuje wypłaty i stosy wszystkich graczy w bb (nowe teksty i układ od roli 04) — pełna naprawa, czeka na projekt; (b) do czasu projektu `icm-call` poza `RODZAJE_NA_EKRANIE` (D-807) — tanio, F4 nie trafia do aplikacji. Rekomendacja: (b) teraz, (a) jako zadanie dla 04 i 08.
- Test akceptacyjny: `it.failing` "ekran decyzji icm-call pokazuje wypłaty i stosy graczy" zamienione na `it` i zielone (albo, przy opcji b, test bramki odrzucającej icm-call).
- Status: otwarte

### 08-programista-004 · Test ŚR-001 po zmianie nazywa się „bramka zgodna z ekranem”, a sprawdza tylko, że generator daje wariant
- Pozycja listy kontrolnej: DEV-03
- Poziom: ŚR
- Realność: realny (test przeszedł przy 001–003) · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/cm-recenzja-cl.test.ts:37` sprawdza `checkScenarioNaEkran(t) = []` i liczbę punktów wariantu z kontekstem; nie sprawdza akcji ekranu wobec akcji szablonu, oceny ani danych decyzji. Zmiana z "odrzuca F2–F4" jest zasadna (ekran obsługuje generowanie), ale nie obejmuje 001–003.
- Mechanizm: test kontraktu bramki na poziomie generatora, bez ekranu; 1 miejsce.
- Powraca: CM 08-programista-001 → trwała kontrola jak w 001 (test kontraktu bramka ⇒ ekran renderuje decyzję i ocenę każdej akcji dla fixture każdego rodzaju, także z minimalnym zestawem akcji ze schematu).
- Wzorzec lub źródło: zasada 21 (kontrolę wymusza test, którego nazwa mówi, co sprawdza).
- Kroki w aplikacji: brak bezpośrednich; skutek przez 001–003.
- Opcje: (a) rozszerzyć test o render ekranu dla każdego fixture i minimalnego zestawu akcji; (b) zmienić nazwę na "bramka ⇒ generator daje wariant" i dodać osobny test kontraktu ekranu. Rekomendacja: (a).
- Test akceptacyjny: test bramki pada dla szablonu z 001 przed naprawą i przechodzi po niej.
- Status: otwarte

### 08-programista-005 · `getKontekstGeneratora` przyjmuje JSON z bazy treści przez `as` bez parsowania
- Pozycja listy kontrolnej: DEV-09
- Poziom: NIS
- Realność: teoretyczny (baza treści budowana przez nasze narzędzie, tylko do odczytu) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/data/content/repo.ts:282` i `apps/mobile/src/data/content/repo.ts:285` (`as RangeSpotData['actions']`, `as Equity169Data`, rzut `evalRules`); uszkodzony wiersz daje wyjątek w generatorze → `plan_niepoprawny`, bez utraty danych.
- Mechanizm: ten sam wzorzec co `getScenarioTemplates` przed zod; 1 funkcja.
- Powraca: nie
- Wzorzec lub źródło: Wzorce programisty, "Parsowanie: brak zostaje brakiem".
- Kroki w aplikacji: brak przy poprawnej bazie.
- Opcje: (a) schemat zod dla `RangeSpotData`, `Equity169Data` i reguł z `content-schema`; (b) zostawić z komentarzem (baza z hashem treści). Rekomendacja: (a) przy najbliższej zmianie pliku, do backlogu.
- Test akceptacyjny: uszkodzony `game_kit.equity169` daje typowany błąd odczytu, nie wyjątek generatora.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- „na stole preflop” (D-784) w zdaniu sytuacji F3/F4: zrozumiałe, ale brzmienie należy do roli 04/06 (CN to zgłosiło).
- Koszt `getKontekstGeneratora` (350 KB `equity169`, `JSON.parse` na wątku JS przy każdym otwarciu F4) na starszym iPhonie: brak pomiaru na urządzeniu.
- Analogia z Treningiem (D-191) w `docs/decyzje/CN.md` oznaczona „nie sprawdzona”; dla ocen scenariusza analogii nie ma (`docs/zakres/scenariusze-plan.md:88`), więc bez wpływu na znaleziska.

## Co działa dobrze i należy zachować
- Jedna definicja kontekstu (`buildGeneratorContext`) w budowaniu i na ekranie; test `kontekst-cn` porównuje odciski.
- ICM tylko BB wobec all-inu SB: wyrocznia Malmuth-Harville w teście CP (3 poziomy × 8 ziaren) zgadza się z progiem, equity i poprawną akcją wariantu co do 1e-9; kwota „Sprawdzam 9bb” i pula 11 bb zgodne z linią (SB 10 bb z 0,5 bb blindem, BB 1 bb).
- Poprawne akcje F2/F3 zgodne z silnikiem gry (najlepsza akcja = „compliant” `gradeDecision`, reguły R-M5-007 i R-M4-001).
- Odcisk wariantu w planie: zgodny wstecz (plan bez odcisku), deterministyczny, test czerwony bez porównania; zapis w istniejącej kolumnie bez migracji.
- `RODZAJE_NA_EKRANIE` jako lista dozwolonych (nowy rodzaj odrzucany domyślnie); `equity169` w bazie tylko przy szablonie ICM (hash dzisiejszej treści bez zmian).

## Decyzje dla właściciela
Brak: 001–005 to defekty i rachunek (rola 08, ADR-24). Sprawa dla koordynatora (kolejność prac): przyjąć CN z naprawą 001–002 w kodzie i zawężeniem bramki o `icm-call` do projektu 04 (D-807, rekomendacja), albo naprawić 001–003 przed scaleniem (003 czeka na teksty i układ roli 04).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003,08-programista-004` (003 w wariancie b: `icm-call` poza listą dozwolonych do projektu 04; 005 do backlogu).

Kontrola raportu: `node sprawdz-raport.mjs docs/programista/recenzje/recenzja-cn-3ab616b.md . docs/programista --rola 08-programista` → `OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista`, kod 0
