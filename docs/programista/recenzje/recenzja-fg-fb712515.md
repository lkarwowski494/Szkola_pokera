# Recenzja niezależna FG: Programista (08, audit) — Szkoła Pokera — 2026-11-12
Commit: fb712515 (zakres 28fdb1b0..fb712515, 6 commitów FG) · Tryb: audit (recenzja FH) · Środowisko: Linux 6.18, Node v22, pnpm 10.28; bez Xcode i symulatora iOS (widoki sprawdzone testami RNTL i mutantami, bez zrzutu). Raportu autora (`docs/programista/stan-fg.md`) nie czytałem; `docs/decyzje/FG.md` przeczytany po własnej ocenie.

## Podsumowanie
**Werdykt: PRZYJĄĆ Z UWAGAMI.** Brak KRYT i WYS. Ocena odpowiedzi we wszystkich czterech widokach zgadza się z silnikiem i regułą: turn-bet `bet-big` zgodne, `bet-small` niedokładność; river-catch i defend poprawna zgodna, druga błąd; list-hand poprawna zgodna, dopuszczalna z wpisu dopuszczalna, inna błąd. `pnpm run ci` na fb712515: kod 0, mobile 132 zestawy / 1359 testów (`dowody/fh/ci.txt`). Z 13 mutantów 11 zabitych; przeżył M5 (river-catch/defend ignoruje `p.correct` i zawsze uznaje „call”: testy oceny używają tylko poziomu z poprawnym „call”) oraz M8 (mutant równoważny, bramka wymusza `bet-big`), `dowody/fh/mutanty.txt`. Bramka ekranu nadal odrzuca iso-size, range-spot z `play` i icm-call trudny (M11–M13 zabite). Główna uwaga: turn-bet i pula bez dopłaty używają kluczy `play.*` na ekranie scenariusza, czego zabrania specyfikacja roli 04 (D-886); autor nazwał to odstępstwo w D-1375, ale rozstrzyga je rola 04.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | ŚR | D | turn-bet: nazwa przycisku i pula z kluczy `play.*` wbrew D-886 (format „2bb”, wielka litera w środku zdania werdyktu) | otwarte |
| 08-programista-002 | ŚR | D | river-catch i defend: brak testu oceny wariantu z poprawnym „fold”; mutant „poprawna zawsze call” przeżył | otwarte |
| 08-programista-003 | NIS | D | `scenario.action.fourBet`: 10 przekładów skopiowanych z `threeBet` i brak opisu w `pl.kontekst.json` (zadanie 09) | otwarte |
| 08-programista-004 | NIS | D | turn-bet: martwa wartość zastępcza `?? 0` w kwocie zakładu | otwarte |

## Linia bazowa i założenia
Linia bazowa z kodu przed czytaniem testów FG: zmiana nie dotyka zapisu danych poza tym, że nowe akcje (`4bet`, `bet-small`/`bet-big` w turn-bet) trafiają do planu aktywności i wyboru w bazie przez istniejące `grafPunktow` i `jestAkcja` (bez zmian schematu). Najważniejsze ścieżki: ocena wyboru (`ocenaAkcji`, `poprawnaAkcja`), zbiór akcji punktu (`akcjePunktu`), bramka ekranu (`checkScenarioNaEkran`).

Wymiary pokrycia:
- Ścieżki zapisu: sprawdzone; `odpowiedzWScenariuszu` i `otworzScenariusz` dostają szablon (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:109`, `:137`), więc list-hand ma zbiór akcji przy zapisie planu; `jestAkcja('4bet')` przechodzi walidację odczytu (test FG).
- Obsługa błędów: list-hand bez specyfikacji albo z akcją spoza słownictwa rzuca błąd z nazwą (`apps/mobile/src/features/scenariusz/wariant.ts:189-192`); bramka odrzuca to wcześniej (M10 zabity). Brak cichych wartości poza 004.
- Typy na granicach: bez nowych granic z zewnętrzem; `as unknown as` tylko w narzędziu testów (`fgScenariusz.ts`).
- System projektowy: znalezisko 001; nowe elementy (`list-hand-sytuacja`, wiersz puli) z istniejących stylów `styl.tresc` i `tk.ink`, bez nowych kolorów i rozmiarów.
- Teksty przez i18n: 001, 003.
- Wydajność: sprawdzone, brak (stałe listy 2–7 akcji).
- Testy na właściwym poziomie: logika w Jest bez ekranu plus RNTL ekranu; 002.
- Dostępność: przyciski mają rolę `button` i etykiety z nazwą akcji (testy `getByLabelText`, `getAllByRole('button')`); turn-bet czyta „Zakład N bb” z kwotą; sprawdzone, brak znaleziska.
- Liczby konfiguracyjne: sprawdzone, brak nowych literałów.

Soczewki: recenzent szukający ścieżki bez testu (002, mutanty), użytkownik VoiceOver (etykiety przycisków, zdanie werdyktu w `useAnnounce`: 001), programista czytający moduł pierwszy raz (lustro `AKCJE_LISTY`/`AKCJE_LISTY_EKRANU` z testem przypięcia po obu stronach), tłumacz (003). Wzorzec: specyfikacja 04 `docs/design/scenariusz-akcje-i-liczby.md` (D-886) i wcześniejsze widoki draw-call/pick-hand.

Rejestr założeń: bez proponowanych zmian statusu.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `apps/mobile/src/features/scenariusz/wariant.ts` (cały diff) | tak | odczyt + mutanty M1–M8 (`dowody/fh/mutanty.txt`) |
| `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx` (diff) | tak | odczyt; testy RNTL FG w `dowody/fh/ci.txt` |
| `apps/mobile/src/data/content/repo.ts` (`getKontekstGeneratora` + defend) | tak | M9 zabity |
| `aktywnoscScenariusza.ts`, `liczby.ts` | tak | odczyt |
| `tools/content-build/src/scenariusze.ts` (bramka ekranu) | tak | odczyt + M10–M13 |
| testy `fg-*-ekran.test.tsx`, `ef-*-bramka.test.ts`, `cm-recenzja-cl.test.ts` | tak | odczyt, mutanty |
| 12 locale (`scenario.action.fourBet`) | tak | diff i porównanie z `threeBet` |
| Wygląd na urządzeniu | nie | brak symulatora iOS w Linuksie; zrzut przez Expo web nie robiony (krok 04/właściciela) |
| Prawdziwe szablony treści z nowymi rodzajami | nie dotyczy | `content/` nie ma dziś szablonu turn-bet, river-catch, defend ani list-hand (grep pusty), zmiana bramki nie zmienia bazy treści |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-fg-fb712515.md . --rola 08-programista` → `OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista` (kod 0, wynik w `dowody/fh/sprawdz-raport.txt`; wcześniejszy przebieg z 8 błędami odwołań poprawiony w raporcie).

`git status --porcelain` przed commitem: tylko nowe pliki `?? docs/decyzje/FH.md`, `?? docs/programista/recenzje/dowody/fh/`, `?? docs/programista/recenzje/recenzja-fg-fb712515.md`; pliki śledzone nietknięte. Mutanty uruchomione w osobnym worktree w scratchpadzie (po przebiegu `git status --porcelain` pusty).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| DEV-01 | dotyczy | ok poza 002 (ocena czterech rodzajów ma testy; luka fold-poprawny) |
| DEV-02 | dotyczy | 4/4 commity zmieniające zachowanie (6b4fe0c5, d7799c85, e3623680, 454780bc) zmieniają test w tym samym commicie; 364c39be to tekst i18n, fb712515 dowód |
| DEV-03 | dotyczy | ok: zmienione asercje bramki (`ef-*-bramka.test.ts`) odwracają oczekiwanie „ekran nie obsługuje” na „przepuszcza fixture” zgodnie ze zmianą zakresu, a nowy test sprawdza odrzucenie akcji spoza słownictwa (M10); kontrola iso-size nietknięta (M11) |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 (`dowody/fh/ci.txt`) |
| DEV-05 | nie dotyczy | brak zmian zapisu i schematu |
| DEV-06 | nie dotyczy | brak migracji i kopii w diffie |
| DEV-07 | dotyczy | 004 (NIS, nieosiągalne) |
| DEV-08 | nie dotyczy | brak dat w diffie |
| DEV-09 | dotyczy | ok: `as unknown as` tylko w narzędziu testów |
| DEV-10 | dotyczy | ok: błędy list-hand głośne, z nazwą akcji |
| DEV-11 | dotyczy | 001 (klucze `play.*` zamiast `scenario.action`); bez nowych stylów |
| DEV-12 | dotyczy | 001, 003 |
| DEV-13 | dotyczy | ok |
| DEV-14 | dotyczy | ok: diff bez sekretów (przegląd diffu, wzorce skryptu) |
| DEV-15 | nie dotyczy | brak efektów i timerów w diffie |
| DEV-16 | dotyczy | ok: kwoty w bb, nazwy `pulaBb`, `doSprawdzeniaBb` |

## Znaleziska (szczegóły)

### 08-programista-001 · turn-bet: nazwa przycisku i pula z kluczy `play.*` wbrew specyfikacji ekranu scenariusza
- Pozycja listy kontrolnej: DEV-11
- Poziom: P1 → ŚR (nie blokuje: tekst czytelny, liczby poprawne)
- Realność: realny (od pierwszego szablonu turn-bet w treści) · Pewność: wysoka
- Rodzaj: D
- Dowód:
  - `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:59` „const nazwa = t('play.bet', { bb: kwotaAkcji(d, a, s) ?? 0 });”; linia 60: fraza = nazwa (z wielką literą).
  - `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:257` „t('play.potLabel', { bb: widok.pulaBb })”.
  - `docs/design/scenariusz-akcje-i-liczby.md:11` „nowa grupa `scenario.action`, zastępuje `play.*` na ekranie scenariusza”.
  - `docs/design/scenariusz-akcje-i-liczby.md:30` „Spacja między liczbą a „bb” to spacja nierozdzielająca (U+00A0)” — liczba według języka.
  - `play.bet` w pl to `Zakład {{bb}}bb` (bez spacji), więc na jednym ekranie stoją `Pula: 8bb` i `do 2,5 bb`; werdykt czyta `Twój wybór: Zakład 4bb. Lepiej: Zakład 12bb.` (wielka litera w środku zdania) w `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:271` i w ogłoszeniu VoiceOver w linii 214.
- Mechanizm: klucze trybu gry użyte na ekranie scenariusza; `grep -n "t('play\.\(bet\|potLabel\)" EkranScenariusza.tsx` → 2 trafienia: linie 59 i 257.
- Powraca: nie
- Wzorzec lub źródło: zasada wspólna 15; D-886 (rola 04). Autor nazwał odstępstwo w D-1375 z powodem („mały c-bet” to zły termin na turnie) — powód trafny, ale nowe nazwy akcji należą do 04.
- Kroki w aplikacji: szablon turn-bet → ekran decyzji (przyciski „Zakład 4bb”, „Zakład 12bb”, wiersz „Pula: 16bb”) → ocena (zdanie werdyktu).
- Opcje: (a) rola 04 dodaje do D-886 klucze turn-bet (np. `scenario.action.betTurnSmall/Big` albo `scenario.action.bet` + `amountAll`) i wiersz samej puli w grupie `scenario`, 08 podmienia — spójne, ale wymaga 04 i 09; (b) zostawić `play.*` jako wyjątek zapisany w D-886 — zero pracy, niespójny format. Rekomendacja: (a) przed pierwszym szablonem turn-bet w `content/`.
- Test akceptacyjny: test RNTL turn-bet sprawdza przycisk „Nazwa” + kwota w drugiej linii według `scenario.action.amount*` i frazę werdyktu małą literą; grep `t('play.` w `EkranScenariusza.tsx` nie zwraca trafień poza `play.log.*`.
- Status: otwarte

### 08-programista-002 · river-catch i defend: brak testu oceny wariantu z poprawnym „fold”
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 → ŚR (kod dziś poprawny; luka w ochronie przed regresją oceny)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: mutant M5 („`poprawnaAkcja` zwraca zawsze `call` dla river-catch i defend”) przeżył: 45/45 testów FG zielonych (`dowody/fh/mutanty.txt`). Testy oceny losują tylko poziom łatwy (poprawna = call): `apps/mobile/src/features/scenariusz/__tests__/fg-river-catch-ekran.test.tsx:41-50`, `apps/mobile/src/features/scenariusz/__tests__/fg-defend-ekran.test.tsx:44-52`; testy ekranu oceny wybierają `call` jako poprawną na stałe (`apps/mobile/src/features/scenariusz/__tests__/fg-river-catch-ekran.test.tsx:108-116`). Stała `POZIOM_AKCJI` (`apps/mobile/src/features/scenariusz/__tests__/fg-river-catch-ekran.test.tsx:39`) jest zdefiniowana i nieużyta. Poziom średni (fold) jest sprawdzany tylko na polu `correct` generatora (`:55`), nie na ocenie.
- Mechanizm: testy ocen jednego poziomu; `grep -n "POZIOM_AKCJI" fg-river-catch-ekran.test.tsx` → 1 trafienie (definicja).
- Powraca: nie
- Wzorzec lub źródło: rola 08, „Dobry test” (przypadki obu akcji poprawnych); mutant jako dowód luki.
- Kroki w aplikacji: regresja, która pomija `p.correct`, oceniłaby w szablonie z poprawnym pasem pas jako błąd i sprawdzenie jako zgodne — bez czerwonego testu.
- Opcje: (a) pętla testów ocen po obu poziomach (`POZIOM_AKCJI`) w obu plikach — kilka linii; (b) jeden test ekranu oceny z poziomem średnim — mniej, ale słabiej. Rekomendacja: (a).
- Test akceptacyjny: M5 ginie (czerwony test oceny dla wariantu z poprawnym „fold” w river-catch i defend).
- Status: otwarte

### 08-programista-003 · `scenario.action.fourBet`: przekłady skopiowane z `threeBet`, brak opisu dla tłumacza
- Pozycja listy kontrolnej: DEV-12
- Poziom: P2 → NIS
- Realność: brzegowy · Pewność: średnia (poprawność przekładów ocenia 09)
- Rodzaj: D
- Dowód: `apps/mobile/src/i18n/locales/pl.json:1122` („4-bet”), `apps/mobile/src/i18n/locales/de.json:1086` („4-Bet”), `apps/mobile/src/i18n/locales/ja.json:1068`, `apps/mobile/src/i18n/locales/ko.json:1068` — wartości 3→4 z `threeBet` w każdym locale (D-1378 to przyznaje); `pl.kontekst.json` ma opis `threeBet` (`apps/mobile/src/i18n/locales/pl.kontekst.json:728`), a `fourBet` nie ma (grep: 0 trafień).
- Mechanizm: mechaniczne kopiowanie przekładu; dotyczy jednego klucza w 10 locale poza pl/en.
- Powraca: nie
- Wzorzec lub źródło: rola 09 (przekłady), kontrakt `pl.kontekst.json`.
- Kroki w aplikacji: punkt list-hand z akcją 4-bet w języku innym niż pl/en.
- Opcje: (a) 09 przegląda 10 wartości i dodaje opis do `pl.kontekst.json`; (b) zostawić do najbliższego przeglądu terminologii. Rekomendacja: (a) razem z 001 (te same klucze akcji).
- Test akceptacyjny: wpis `scenario.action.fourBet` w `pl.kontekst.json`; przegląd 09 zapisany.
- Status: otwarte

### 08-programista-004 · turn-bet: martwa wartość zastępcza `?? 0` w kwocie zakładu
- Pozycja listy kontrolnej: DEV-07
- Poziom: P2 → NIS
- Realność: teoretyczny (dla `bet-small`/`bet-big` `kwotaAkcji` zawsze zwraca liczbę) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:59` `?? 0`; `apps/mobile/src/features/scenariusz/wariant.ts:114` zwraca `null` tylko dla akcji spoza pary.
- Mechanizm: zgadnięta wartość zamiast błędu; jedno trafienie w diffie.
- Powraca: nie
- Wzorzec lub źródło: rola 08, zasada 9 („brak zostaje brakiem”).
- Kroki w aplikacji: brak drogi dziś; przy przyszłej akcji turn-bet bez kwoty przycisk pokazałby „Zakład 0bb”.
- Opcje: (a) rzucić błąd przy `null`; (b) usunąć przy okazji 001. Rekomendacja: (b).
- Test akceptacyjny: brak `?? 0` w `tekstAkcji`.
- Status: otwarte

## Do sprawdzenia
- Umiejscowienie opisu sytuacji list-hand (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:250`, D-1379) i brak zdań „Liczby” dla czterech rodzajów (D-1380): autor sam skierował do 04 i 06/09; nie powtarzam jako znaleziska. Wygląd na urządzeniu niesprawdzony (brak symulatora).
- `08-programista-003` z recenzji EK (turn-bet, `hit` z nominalnych outów) dotyczy generatora, poza tym diffem; stanu naprawy nie sprawdzałem.

## Co działa dobrze i należy zachować
- Usunięte wyjątki w `wariant.ts` zastąpione jawnymi gałęziami per rodzaj; list-hand bez szablonu rzuca błąd zamiast zgadywać zbiór akcji.
- Lustro słownictwa (`AKCJE_LISTY` ↔ `AKCJE_LISTY_EKRANU`) z testem przypięcia po obu stronach i kontrolą w bramce (M10 zabity).
- Bramka ekranu: osobne warunki iso-size, range-spot `play`, icm-call trudny nietknięte i chronione testami (M11–M13 zabite).
- Każdy commit zmieniający zachowanie ma test w tym samym commicie (4/4).

## Decyzje dla właściciela
Brak. 001 i 003 idą do ról 04 i 09 przez koordynatora (sprawy projektu i przekładu, nie produktu).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-002,08-programista-004` (001 i 003 po decyzji 04/09).
