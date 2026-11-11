# Audyt: Programista — Szkoła Pokera — recenzja niezależna CX (range-spot na ekranie scenariusza) — 2026-11-11
Commit: `92b06ca` (zakres `46197812..92b06ca9`: d423a6a8 kod i testy, f75be7ab i 92b06ca9 dokumenty) · gałąź `sesja-dc-recenzja` (start = `origin/sesja-cx-range-spot` @ 92b06ca9, zgodny z poleceniem) · Tryb: audit (recenzja D-043, polecenie DC) · Środowisko: Linux 6.18, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; bez macOS/Xcode (ekran sprawdzany renderem testowym, nie na urządzeniu).

## Podsumowanie
Werdykt: **PRZYJĄĆ Z WARUNKIEM** (0 KRYT, 1 WYS, 4 ŚR, 1 NIS). Kod CX robi to, co obiecuje dla pojedynczego punktu range-spot: akcje z etykiet węzła solvera, ocena z `rangeVerdict` wariantu, kwoty zgodne z tabelą D-886 (BB "call 2.5" → 1,5 bb, `push.sb-10` all-in → 10 bb, `call.bb-10` → 9 bb; ante w `call.bb-10-ante` też się zgadza, bo stos solvera jest bez ante, `tools/preflop-solver/src/pushfold.ts:6`). Testy CX łapią 7 z 9 mutacji. Ale w ręce mieszanej ekran mówi "✓ Zgodna" i jednocześnie "Lepiej: przebicie" oraz "Dlaczego pas to słabsze zagranie" (WYS-001, odtworzone testem). Dziś w `content/` nie ma żadnego szablonu range-spot (tylko fixture), więc tester tego nie zobaczy. **Warunek przyjęcia:** WYS-001 naprawione, zanim pierwszy szablon range-spot trafi do `content/` (bramka jest już otwarta, więc następna sesja treści może to wypuścić). ŚR do backlogu, w tym rozbieżność z D-886 (wdrożenie w osobnej sesji).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | WYS | M | Ręka mieszana: pas oceniony „Zgodna”, a ekran pokazuje „Lepiej: …” i „dlaczego to słabsze zagranie” | otwarte |
| 08-programista-002 | ŚR | P | Nazwy i kwoty akcji spotu niezgodne z projektem D-886 (`play.*` zamiast `scenario.action`, brak „3-bet”, „2.5bb”, kwota zdradza odpowiedź przed size-spot) | otwarte |
| 08-programista-003 | ŚR | D | Graf: każda akcja range-spot poza pasem i all-in prowadzi do następnego punktu, także gdy ten punkt nie wynika z tej akcji | otwarte |
| 08-programista-004 | ŚR | D | Test CK „budowanie go przyjmuje” przechodzi, choć budowanie odrzuca fixture innym błędem | otwarte |
| 08-programista-005 | ŚR | D | Ekran decyzji range-spot nie mówi o ruchu rywala (otwarcie, all-in) ani o puli | otwarte |
| 08-programista-006 | NIS | D | Dwie mutacje przeżywają testy CX: kwota przebicia z blindu i all-in w linii dwupunktowej | otwarte |

## Linia bazowa i założenia
Ocena z kodu, diffów, projektu i własnych testów przed przeczytaniem raportu autora; `docs/decyzje/CX.md` (D-866–D-869) przeczytane po własnej ocenie, tylko by odróżnić decyzje od defektów.
- **Ścieżki zapisu:** wybór zapisany w bazie przechodzi przez `jestAkcja` (`apps/mobile/src/features/scenariusz/wariant.ts:27`), wspólny strażnik zamiast lokalnej listy w `aktywnoscScenariusza.ts`; schemat, migracje i eksport bez zmian. Wzorzec `^(raise|call) \d+(\.\d+)?$` przepuszcza każdy rozmiar, ale wybór spoza węzła i tak odrzuca `przebiegScenariusza` (`akcja_niedostepna`); sprawdzone, brak znaleziska.
- **Obsługa błędów:** etykieta spotu spoza wzorca rzuca wyjątek (`apps/mobile/src/features/scenariusz/wariant.ts:28-31`), ale bramka budowania sprawdza wyjaśnienie każdej akcji węzła (`tools/content-build/src/scenariusze.ts:106-108`), a etykiety solvera to dziś tylko `fold`, `call`, `call N`, `raise N`, `all-in` (wypis wszystkich 34 spotów z `compileRanges`, sonda w scratchpadzie, wynik niżej w „Pokrycie”).
- **Typy na granicach:** `akcjaSpotu` parsuje etykietę strażnikiem, bez `as`; sprawdzone, brak.
- **System projektowy, teksty:** bez nowych kluczy, `play.*` (002).
- **Wydajność:** bez zmian ścieżek gorących; brak.
- **Testy na właściwym poziomie:** czyste funkcje i render na prawdziwej bazie treści (`dbCn`); mutacje niżej.
- **Dostępność:** przyciski z nazwą i kwotą (`PasekStrategii`), zapowiedź oceny z nazwą akcji; zapowiedź przed decyzją range-spot to sama ulica, bez ruchu rywala (005).
- **Liczby konfiguracyjne:** progi `rangeVerdict` z kontekstu (`mixedMin`, `mixedLow`), bez nowych literałów; brak.
- **Soczewki:** (1) recenzent szukający ścieżki bez testu → mutacje M5 i M7 (006), test CK (004); (2) programista czytający moduł pierwszy raz → `bloki` i zdanie werdyktu porównują wybór z `poprawnaAkcja`, a ocena pochodzi z `rangeVerdict`, który daje kilka „correct” (001); (3) użytkownik VoiceOver → przed decyzją słyszy „Preflop”, bez otwarcia rywala (005); (4) użytkownik przerwany w połowie → wznowienie bez zmian, odcisk wariantu obejmuje `points` z `options`.
- **Wzorzec najlepszych:** ocena, zdanie werdyktu i bloki „dlaczego” pochodzą z jednej tabeli ocen (projekt `docs/design/scenariusz-i-ocena.md:19`: przy „zgodne” blok „dobrze”, przy ręce mieszanej „Kiedy które zagranie”).
- Rejestr założeń: bez propozycji zmian statusu.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `apps/mobile/src/features/scenariusz/wariant.ts` (cały plik) | tak | lektura, mutacje M1–M7, test DC |
| `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx` (przebieg, koniec, nazwy akcji, dziennik) | tak | lektura, render w teście DC |
| `apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts` (zmiana strażnika) | tak | lektura diffu |
| `tools/content-build/src/scenariusze.ts` (bramka, kontrola wyjaśnień) | tak | lektura, mutacje M8–M9 |
| `cm-recenzja-cl.test.ts`, `szablon-na-ekranie-ck.test.ts` (KO-063) | tak | diff względem 46197812, sonda budowania |
| Testy CX (`cx-range-spot.test.tsx`, `cx-range-spot.test.ts`) | tak | lektura, mutacje |
| `packages/poker-core` (`rangeVerdict`, `validateTemplate`, punkt range-spot) | tak, tylko czytane miejsca | `packages/poker-core/src/grading.ts:135-139`, `packages/poker-core/src/scenario-gen.ts:324-333` |
| Projekt D-886 (`origin/sesja-da-teksty` @ 7366faa9, `docs/design/scenariusz-akcje-i-liczby.md` §1) | tak | `git show 7366faa9:…` |
| Ekran na urządzeniu iOS, AX5, VoiceOver | nie | brak macOS; tylko render testowy |

Wyniki sond (komendy i kody wyjścia):
- Etykiety węzłów: `compileRanges(content).spots` → 34 spoty; etykiety tylko `fold`, `raise 2.5`, `raise 3`, `call 2.5`, `call 3`, `raise 7.5`, `raise 9`, `raise 10`, `all-in`, `call` (zwykłe `call` tylko w spotach `call.*`, czyli wobec all-inu). Kod 0.
- Szablony range-spot w treści: `grep -rln "range-spot" content/` → 0 trafień (tylko `tools/content-build/test/fixtures/range-spot/`).
- Mutacje (każda nałożona na plik, test, plik przywrócony; `git status --porcelain` po serii: tylko nowy test DC):

| Mutacja | Testy | Wynik |
|---|---|---|
| M1 ocena spotu: `acceptable` → `blad` | `cx-range-spot.test.tsx` kod 1 (1 failed / 12) | zabita |
| M2 ocena: zgodna tylko akcja `correct`, reszta błąd | kod 1 (1 / 12) | zabita |
| M3 kwota `call N` bez odjęcia blinda | kod 1 (1 / 12) | zabita |
| M4 kwota `call` wobec all-inu = cały stos | kod 1 (1 / 12) | zabita |
| M5 kwota `raise N` minus blind gracza | kod 0 (12 / 12) | **przeżyła** (006) |
| M6 graf: range-spot zawsze kończy | kod 1 (2 / 12) | zabita |
| M7 graf: all-in prowadzi do następnego punktu | kod 0 (12 / 12) | **przeżyła** (006) |
| M8 bramka bez kontroli wyjaśnień akcji spotu | content-build kod 1 (1 / 26) | zabita |
| M9 bramka bez `range-spot` na liście | content-build kod 1 (7 / 26) | zabita |

## Kontrola dowodów i sekretów
Raport bez sekretów; odwołania `plik:linia` sprawdzone ręcznie na `92b06ca9` (plus test DC na `b718641b`). Pełna weryfikacja: `docs/programista/dowody/dc-ci-b718641b.txt` (wynik w „Decyzje dla właściciela” i stanie DC).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 | dotyczy (ocena i kwoty akcji spotu) | 001 (ocena vs bloki), 006 (luki testów) |
| DEV-02 | dotyczy (d423a6a8) | commit zmienia kod i testy razem; 1/1 |
| DEV-03 | dotyczy (KO-063: zmienione asercje) | 004; zmiana `cm-recenzja-cl.test.ts` uzasadniona zniesieniem D-755 (D-866), kontrola icm-call zachowana (`tools/content-build/test/cp-recenzja-cn.test.ts:64-65`), kontrola all-in zachowana (`tools/content-build/test/szablon-na-ekranie-ck.test.ts:34-38` bez zmian) |
| DEV-04 | dotyczy | `pnpm run ci` (dowód w pliku CI) |
| DEV-05, DEV-06 | nie dotyczy | CX nie zmienia zapisu, schematu ani kopii |
| DEV-07 | dotyczy (kwoty) | `bb ?? 0` w `nazwaAkcji` przy `raise N`/`call N` nie występuje (kwota z etykiety zawsze liczba); `call` i `all-in` bez `stackBb` → `0 bb` albo „All-in” bez kwoty; dziś każdy szablon ma `stackBb` (schemat). Ok |
| DEV-08 | nie dotyczy | bez dat |
| DEV-09 | dotyczy | ok (`jestAkcja`, bez `as`) |
| DEV-10 | dotyczy | wyjątki tylko przy etykiecie spoza wzorca, której bramka nie przepuści; ok |
| DEV-11 | dotyczy | bez nowych stylów; ok |
| DEV-12 | dotyczy | 002 (klucze i format liczby) |
| DEV-13 | dotyczy | ok |
| DEV-14 | dotyczy | diff bez sekretów; ok |
| DEV-15 | nie dotyczy | bez nasłuchów i timerów |
| DEV-16 | dotyczy (bb całkowite vs dopłata) | ok: „raise N” = do N bb, „call N” = N − blind, zgodnie z D-886 |

## Znaleziska (szczegóły)

### 08-programista-001 · Ręka mieszana: pas oceniony „Zgodna”, a ekran pokazuje „Lepiej: …” i „dlaczego to słabsze zagranie”
- Pozycja listy kontrolnej: DEV-01
- Poziom: WYS (błędne twierdzenie merytoryczne na ekranie oceny)
- Realność: brzegowy dziś (brak szablonu range-spot w `content/`), realny od pierwszego takiego szablonu · Pewność: wysoka
- Rodzaj: M
- Dowód: `rangeVerdict` daje "correct" każdej akcji z częstością ≥ `mixedLow` (`packages/poker-core/src/grading.ts:138`), więc na poziomie "trudny" (oczekiwane otwarcie 0,25–0,9) pas często też jest "correct". Ekran ocenia z werdyktu (`apps/mobile/src/features/scenariusz/wariant.ts:130-134`), ale bloki i zdanie werdyktu porównują wybór z `poprawnaAkcja`: `apps/mobile/src/features/scenariusz/wariant.ts:251-253` i `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:236`. Test `apps/mobile/src/features/scenariusz/__tests__/dc-recenzja-cx.test.tsx` jako `it` (kod 1, 2 failed / 3): `Expected: "dobrze" Received: "slabsza"`; tekst ekranu: "✓ Zgodna Twój wybór: Pas (fold). Lepiej: Przebicie (raise) do 2.5bb. Dlaczego "Pas (fold)" to słabsze zagranie …". Jako `it.failing` kod 0 (3/3).
- Mechanizm: wybór porównany z jedną "poprawną" akcją zamiast z oceną; `grep -n "poprawnaAkcja\|najlepsza" apps/mobile/src/features/scenariusz/*.tsx apps/mobile/src/features/scenariusz/wariant.ts` → bloki (`apps/mobile/src/features/scenariusz/wariant.ts:250-253`), werdykt (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:236`), zapowiedź VoiceOver (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:195`, zawsze z "Lepiej"); lista końcowa (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:292`) liczy "lepiej" z oceny i jest poprawna. Ten sam wzorzec dotyczy "dopuszczalne" w c-becie i rozmiarze (CN), ale tam "słabsza / lepsza" przy "Dopuszczalna" nie przeczy werdyktowi; sprzeczność powstaje dopiero przy kilku "zgodnych" akcjach, które wnosi range-spot.
- Powraca: nie (pokrewne CP WYS-002: skala ocen ekranu)
- Wzorzec lub źródło: ADR-04 (ręka mieszana: oba zagrania poprawne, `CLAUDE.md`); projekt `docs/design/scenariusz-i-ocena.md:19` („Przy „zgodne” jeden blok „Dlaczego dobrze” … Przy ręce mieszanej blok „Kiedy które zagranie””).
- Kroki w aplikacji: szablon range-spot (np. `rfi.btn`, poziom trudny) → ręka mieszana (np. 75o z otwarciem < 75%) → wybierz pas → ekran oceny.
- Opcje: (a) bloki i zdanie werdyktu wybierane według oceny: „zgodne” → `yoursGood` i blok „dobrze” plus „dlaczego nie” pozostałych; mały diff, ale bez bloku „Kiedy które zagranie” z projektu; (b) jak (a) plus blok „Kiedy które zagranie” dla ręki mieszanej (wymaga tekstu od roli 04/06); (c) generator nie losuje rąk z drugą akcją ≥ `mixedLow` — zmienia treść poziomu trudnego. Rekomendacja: (a) teraz jako naprawa blokera, (b) do backlogu roli 04.
- Test akceptacyjny: `dc-recenzja-cx.test.tsx` z `it.failing` → `it` zielony; zapowiedź VoiceOver bez „Lepiej” przy ocenie zgodnej.
- Status: otwarte

### 08-programista-002 · Nazwy i kwoty akcji spotu niezgodne z projektem D-886
- Pozycja listy kontrolnej: DEV-12
- Poziom: ŚR
- Realność: brzegowy (brak szablonu range-spot w treści; wdrożenie D-886 zaplanowane w osobnej sesji) · Pewność: wysoka
- Rodzaj: P
- Dowód: kod używa `play.raise`, `play.call`, `play.allin` (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:45-46`); projekt `docs/design/scenariusz-akcje-i-liczby.md` §1 @ 7366faa9: grupa `scenario.action` "zastępuje `play.*` na ekranie scenariusza". Rozbieżności: (1) `raise X` w spocie z jednym przebiciem w `path` (`vs-open.*`) ma być "3-bet", kod pisze "Przebicie do 10bb"; (2) kwota z formatem języka i spacją nierozdzielającą ("2,5 bb"), kod daje "do 2.5bb" (tekst ekranu w teście DC); (3) "range-spot, po którym szablon ma punkt size-spot": przycisk przebicia bez kwoty, bo kwota zdradza odpowiedź na następne pytanie; kod zawsze dopisuje kwotę, a generator dopuszcza taką linię (`packages/poker-core/src/scenario-gen.ts:329-332`); (4) testy CX akceptują oba separatory (`apps/mobile/src/features/scenariusz/__tests__/cx-range-spot.test.tsx:122-123`, `2[.,]5`). Zgodne z projektem: kwoty (tabela "Kwota przy akcji") i kolejność na pasku.
- Mechanizm: jedna funkcja `nazwaAkcji`; po wdrożeniu D-886 wszystkie wywołania (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:195`, `:198`, `:297-298`) dostaną nowe nazwy.
- Powraca: nie
- Wzorzec lub źródło: D-886 (rola 04, `docs/decyzje/DA.md` na `origin/sesja-da-teksty`).
- Kroki w aplikacji: szablon `vs-open.bb-vs-btn` → pasek „Sprawdzam 1.5bb · Przebicie do 10bb”.
- Opcje: (a) wdrożyć D-886 w zaplanowanej sesji, przed pierwszym szablonem range-spot w treści — jeden diff, testy kryteriów 1–6 projektu; (b) wdrożyć teraz osobno format liczby i brak kwoty przed size-spot — szybciej, ale dwa przejścia po tych samych nazwach. Rekomendacja: (a).
- Test akceptacyjny: kryteria akceptacji 1–5 z §1 projektu D-886.
- Status: otwarte

### 08-programista-003 · Graf: każda akcja range-spot poza pasem i all-in prowadzi do następnego punktu
- Pozycja listy kontrolnej: DEV-01
- Poziom: ŚR
- Realność: brzegowy (brak treści; generator dopuszcza range-spot + draw-call, size-spot albo cbet-case) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/wariant.ts:115` („dalej: i < ostatni && akcja !== 'fold' && akcja !== 'all-in' ? i + 1 : 'koniec'”). Przy `vs-open.bb-vs-btn` + size-spot `three-bet-size` (dozwolone w `validateTemplate`, `packages/poker-core/src/scenario-gen.ts:329-332`) wybór „call 2.5” prowadzi do pytania o rozmiar 3-betu, którego gracz nie zrobił; przy range-spot + draw-call sprawdzenie i 3-bet prowadzą do tego samego flopa z tą samą pulą szablonu.
- Mechanizm: graf nie zna akcji, która prowadzi do następnego punktu; jedno miejsce.
- Powraca: nie
- Wzorzec lub źródło: D-219 (graf: tylko akcja zgodna z linią prowadzi dalej, jak sprawdzenie w draw-call).
- Kroki w aplikacji: szablon F1+F3 → „Sprawdzenie” → pytanie o rozmiar 3-betu.
- Opcje: (a) dalej prowadzi tylko akcja oczekiwana z poziomu (`expected[0]`), inne kończą rozdanie; (b) bramka budowania odrzuca range-spot z kolejnym punktem, dopóki szablon nie poda akcji prowadzącej dalej. Rekomendacja: (b) teraz (tania kontrola), (a) razem z pierwszym szablonem dwupunktowym.
- Test akceptacyjny: graf F1+F3: `call 2.5` → `koniec`, `raise 10` → 1; albo test bramki odrzucającej taki szablon.
- Status: otwarte

### 08-programista-004 · Test CK „budowanie go przyjmuje” przechodzi, choć budowanie odrzuca fixture
- Pozycja listy kontrolnej: DEV-03
- Poziom: ŚR
- Realność: realny (fałszywy sygnał w teście; użytkownika nie dotyczy) · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/szablon-na-ekranie-ck.test.ts:31-32` — `.not.toThrow(/nie jest jeszcze obsługiwany na ekranie scenariusza/)` przechodzi także, gdy budowanie rzuca inny błąd. Sonda (ta sama procedura `zTreścią`, kod 0): `compileContent` rzuca "szablon sc-fx-rfi-btn: poziom sredni: pojemność 3 odcisków w 2000 losowaniach, wymagane 40" (i to samo dla "trudny"). Nazwa testu twierdzi, że budowanie szablon przyjmuje.
- Mechanizm: `grep -rn "not.toThrow(/" tools/content-build/test apps/mobile/src` → 1 trafienie (to).
- Powraca: tak, ten sam typ co CP 004 (nazwa testu ponad to, co sprawdza) → trwała kontrola: asercja na liście błędów bramki (`checkScenarioNaEkran`) albo na komunikacie budowania bez dopasowania wzorcem negatywnym.
- Wzorzec lub źródło: DEV-03 (asercja poluzowana przy zmianie oczekiwania).
- Kroki w aplikacji: brak (test).
- Opcje: (a) asercja: budowanie rzuca, ale żaden komunikat nie dotyczy ekranu (`toThrow` + sprawdzenie treści), nazwa „bramka ekranu nie odrzuca”; (b) fixture z poziomami o wystarczającej pojemności i `.not.toThrow()`. Rekomendacja: (a), bo pojemność fixture to nie temat tego testu.
- Test akceptacyjny: mutacja „bramka odrzuca range-spot” daje czerwień tego testu, a nazwa opisuje to, co sprawdza.
- Status: otwarte

### 08-programista-005 · Ekran decyzji range-spot nie mówi o ruchu rywala ani o puli
- Pozycja listy kontrolnej: DEV-01
- Poziom: ŚR
- Realność: brzegowy (brak treści) · Pewność: wysoka
- Rodzaj: P
- Dowód: `ruchRywala` zwraca null dla range-spot (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:123-130`), a `widokDecyzji` daje pulę null (`apps/mobile/src/features/scenariusz/wariant.ts:210`). W spocie `vs-open.bb-vs-btn` przyciski "Sprawdzam 1.5bb · Przebicie do 10bb" pojawiają się bez zdania, że Button otworzył na 2,5 bb; w `call.*` bez zdania o all-inie rywala. Sytuacja jest tylko na ekranie startu (`situation`) i w wyjaśnieniach po decyzji. Dla size-spot `three-bet-size` kod pisze otwarcie rywala (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:129`).
- Mechanizm: jedno miejsce (`ruchRywala`).
- Powraca: nie (autor zapisał to jako pozycję otwartą, `docs/decyzje/CX.md` sekcja "Otwarte"; recenzja nadaje poziom)
- Wzorzec lub źródło: `docs/design/scenariusz-i-ocena.md:19` (zdanie sytuacji: „ręka, pozycja, stół, akcja rywala”).
- Kroki w aplikacji: szablon vs-open → ekran decyzji (także VoiceOver: zapowiedź „Preflop” bez ruchu rywala).
- Opcje: (a) ruch rywala z `path` spotu (ostatnia akcja: `raise2.5` → `play.log.raise`, `allin` → `play.log.allin`), bez nowych tekstów; (b) tytuł spotu ze `spots.yaml` nad paskiem — nowy element, decyzja roli 04. Rekomendacja: (a).
- Test akceptacyjny: render decyzji `vs-open.bb-vs-btn` zawiera „BTN” i „2.5” (albo „2,5” po D-886) w dzienniku; `call.bb-10` zawiera all-in rywala.
- Status: otwarte

### 08-programista-006 · Dwie mutacje przeżywają testy CX
- Pozycja listy kontrolnej: DEV-01
- Poziom: NIS
- Realność: teoretyczny (kod dziś poprawny) · Pewność: wysoka
- Rodzaj: D
- Dowód: M5 (kwota `raise N` minus blind) i M7 (all-in prowadzi dalej) dają kod 0 w `cx-range-spot.test.tsx` (tabela w „Pokrycie”). Test kwot sprawdza podbicie tylko z BTN (blind 0, `apps/mobile/src/features/scenariusz/__tests__/cx-range-spot.test.tsx:134`), a graf nie ma przypadku all-in w linii dwupunktowej.
- Mechanizm: luki testu, nie kodu.
- Powraca: nie
- Wzorzec lub źródło: wzorce roli („test, który potrafi paść”).
- Kroki w aplikacji: brak.
- Opcje: (a) dopisać `kwotaAkcji(d, 'raise 10', poz('SB', 100)) === 10` i graf push + draw-call (all-in → koniec); (b) zostawić do D-886, które i tak dopisze testy kwot. Rekomendacja: (a) przy naprawie 001.
- Test akceptacyjny: M5 i M7 zabite.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Ekran na iOS przy AX5 z dłuższymi nazwami („Sprawdzam 1.5bb”, trzy przyciski vs-open): nie sprawdzone (brak macOS); kryterium 6 D-886 obejmie to po wdrożeniu nazw.
- Pojemność wariantów dla realnych szablonów range-spot `rfi.*` na poziomach średni/trudny: fixture ma 3 odciski przy wymaganych 40 (sonda 004); czy jakikolwiek trzypoziomowy szablon `rfi.*` przejdzie budowanie, rozstrzygnie sesja treści.
- `docs/decyzje/CX.md:2`: CX nie sprawdził analogii z Treningiem (D-191) i oznaczył to `[DO USTALENIA]`; poza zakresem tej recenzji.

## Co działa dobrze i należy zachować
- Kwoty akcji spotu: wszystkie przypadki tabeli D-886 i ante w `call.bb-10-ante` (stos solvera bez ante) zgadzają się; testy zabijają mutacje M3 i M4.
- Ocena z werdyktu wariantu (`rangeVerdict`) z niezależną wyrocznią w teście (`apps/mobile/src/features/scenariusz/__tests__/cx-range-spot.test.tsx:80-96`, 300 ziaren, ręce mieszane obecne): zabija M1 i M2.
- Bramka budowania jako lista dozwolonych plus nowa kontrola „każda akcja węzła ma wyjaśnienie” (D-869): zabija M8 i M9; icm-call nadal odrzucany.
- Jeden strażnik `jestAkcja` dla wyboru z bazy i etykiet spotu.

## Decyzje dla właściciela
Brak decyzji produktowych w tej recenzji. Do koordynatora: warunek przyjęcia (001 przed pierwszym szablonem range-spot w `content/`) i kolejność 002 (sesja D-886) względem 003/005. Decyzje techniczne recenzji: D-894, D-895 (`docs/decyzje/DC.md`, do weta).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-004,08-programista-006` (002 w sesji D-886; 003 i 005 przed pierwszym szablonem dwupunktowym albo vs-open w treści).
