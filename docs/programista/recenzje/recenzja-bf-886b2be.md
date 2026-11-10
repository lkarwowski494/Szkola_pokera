# Audyt: Programista — Szkoła Pokera — 2026-11-10
Recenzja niezależna pracy sesji BF (generator scenariuszy, historia wariantów, limit) · sesja BJ, rola 08-programista, tryb audit (zakres zawężony poleceniem `docs/koordynacja/polecenia/BJ.md` @ a6adbc8)
Commit: 886b2be (= `origin/sesja-bf-generator`, sprawdzone `git rev-parse`) · Przedmiot: `git diff 8cba034..886b2be` (39 plików) · Środowisko: Linux 6.18 x86_64, Node v22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; brak macOS/Xcode (Maestro, iOS: nie dotyczy zakresu — zmiana nie ma ekranu)

**Werdykt: przyjąć z warunkiem.** Warstwa danych (migracja v2, UPSERT, eksport/import/„Usuń postęp”), limit KO-043, okno 20 i wydzielenie `analyseOutsSpot` są poprawne i dobrze przetestowane. Warunek: 08-programista-001 (WYS) naprawione przed krokiem C planu (06 pisze szablony w tym formacie, `docs/zakres/scenariusze-plan.md` §3), najlepiej razem z 08-programista-004, bo oba zmieniają format szablonu.

## Podsumowanie
Kod danych spełnia zasadę 10: migracja v2 to zwykła migracja addytywna w `BEGIN IMMEDIATE` z wycofaniem, test na kopii pliku bazy v1 istnieje i jest rzetelny, zapis historii to UPSERT + przycięcie w jednej transakcji, eksport/import/„Usuń postęp” obejmują nową tabelę, stary plik eksportu (bez tabeli) się wczytuje, a plik nowy przechodzi walidację starej aplikacji (sonda). Najważniejsze ryzyko jest merytoryczne, nie danych: generator wylicza poprawną akcję osobno dla każdego wariantu, więc w granicach jednego poziomu raz poprawne jest „call”, raz „fold” (szablon A, poziom trudny: 961 call / 1039 fold w 2000 wariantach), a format szablonu nie ma oceny oczekiwanej, tylko stałe wyjaśnienie dla każdej akcji. To łamie BR-GEN-003 i słownik BRD („granice losowania” = poprawna decyzja się nie zmienia) i przy pierwszych szablonach dałoby wyjaśnienie „call, bo…” do wariantu, w którym call jest błędem. Ścieżki przez interfejs jeszcze nie ma (brak szablonów w `content/` i ekranu, krok F), dlatego warunek dotyczy kroku C, a nie bieżącego stanu aplikacji. `pnpm run ci`: wynik w sekcji „Kontrola dowodów”.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | WYS (P1) | D | Poprawna decyzja zmienia się między wariantami jednego poziomu; szablon nie ma oceny oczekiwanej (BR-GEN-003, BR-SZB-001) | otwarte |
| 08-programista-004 | ŚR (P2) | D | Wyjaśnienie akcji w szablonie to stały tekst bez kart i pozycji wariantu (BR-OCE-001, BR-OCE-002) | otwarte |
| 08-programista-002 | ŚR (P2) | D | „Powtórka wariantu” w limicie to flaga od wywołującego; domena nie rozpoznaje powtórki z ziarna (KO-043) | otwarte |
| 08-programista-003 | NIS (P2) | D | Zapis odcisku przy cofniętym zegarze zwraca sukces, a odcisk znika przy przycięciu okna | otwarte |

Progi według `CLAUDE.md` „Audyty i wydania”: KRYT 0 · WYS 1 · ŚR 2 · NIS 1.

## Linia bazowa i założenia
Najpierw z BRD (`docs/brd/wymagania-scenariusze.md` BR-SZB-001, BR-GEN-001…003, BR-OCE-001/002), decyzji D-531…D-533, D-550…D-555, KO-043, KO-047 i kodu ustaliłem ścieżki zapisu i obsługi błędów, potem sprawdziłem testy; raporty autora (`docs/programista/stan-bf.md`, `docs/programista/dowody/bf-*`) przeczytałem dopiero po własnej ocenie, do porównania (niżej).

Wymiary pokrycia:
- Ścieżki zapisu: `zapiszOdcisk` (UPSERT + DELETE przycięcia w jednej transakcji), migracja v2 (runner), import (DELETE dzieci→rodzice, INSERT, `foreign_key_check`), „Usuń postęp”. Wynik: poprawne; jedno brzegowe zachowanie przy cofniętym zegarze (003).
- Obsługa błędów: `zapiszOdcisk` przez `jakoWynik` (CHECK → `zapis_nieudany`, test), `odczytajOdciski` zły kształt → `odczyt_nieudany` (test), migracja nieudana → `migracja_nieudana` i wersja 1 (test). `wybierzWariant`/`generateVariant` rzucają `TemplateError` — do obsłużenia w ekranie (krok F), dziś brak wywołania w aplikacji.
- Typy na granicach: `jakoOdcisk` parsuje z `unknown` bez `as`; import przez `TYPY_KOLUMN`. Jedno rzutowanie `as GeneratorTemplate` po walidacji zod (Do sprawdzenia).
- System projektowy, i18n, dostępność: sprawdzone, brak — zmiana nie dotyka `apps/mobile` ani tekstów interfejsu.
- Wydajność: generator do 1000 prób na wariant, `wybierzWariant` do 200 wariantów; czas testów poker-core 125 s (10 000 losowań × 5 przypadków) — w CI akceptowalne, w aplikacji jeden wariant na start.
- Testy na właściwym poziomie: dane na `node:sqlite` przez port (nie atrapa), logika czysta w Node. Tak.
- Liczby konfiguracyjne: `WARIANTY_HISTORIA_OKNO` w `KONFIGURACJA` (`packages/domena/src/konfiguracja.ts:25`); `WYBOR_MAKS_PROB`, `MAX_CONSECUTIVE_REJECTIONS`, `POJEMNOSC_MIN` lokalnie przy logice z komentarzem — dopuszczalne (jedno miejsce każda).

Soczewki: (1) użytkownik, któremu zapis przerwano — transakcje, sonda zegara; (2) recenzent szukający ścieżki bez testu — wyrocznia generatora (001), flaga powtórki (002); (3) programista czytający moduł pierwszy raz — format szablonu vs BRD (001, 004); (4) VoiceOver — nie dotyczy (brak UI).

Wzorzec najlepszych w klasie: generator, którego każda niezmienna z wymagań ma test z wyrocznią niezależną od kodu i od danych wejściowych testu (Trening: wyrocznie niezależne na wszystkich kombinacjach, repo `lkarwowski494/trening`, plik `tests/mutation-generator.test.ts`, linie 2–5, przywołane w D-533; sam plik Treningu nieotwierany w tej sesji). Rozbieżność: wyrocznia BF sprawdza zgodność decyzji z rachunkiem w każdym wariancie osobno, ale nie niezmienność decyzji w poziomie, czyli dokładnie tę własność, której wymaga BR-GEN-003 (001).

Porównanie z przeglądem autora (`docs/programista/dowody/bf-przeglad-sciezek-wrazliwych.md`): uwaga 1 autora = 002 (zgodnie); uwagi 2–5 autora potwierdzam jako niskie i nie powtarzam. 001, 003 i 004 nie są w przeglądzie autora.

Rejestr założeń: bez propozycji zmiany statusu (ZAL-012, ZAL-013 nieobalone tym audytem).

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/postep/src/` migracje, schemat-v2, wariantyHistoria, daneUzytkownika (diff) | tak, przeczytane w całości | kod + testy autora + sonda `dowody/bj-sonda-dane.txt` |
| `packages/postep/test/` k02, k10, k12, dane-08, schemat-v2, wariantyHistoria-532 | tak; zmiany istniejących asercji ocenione (wersja 1→2, 7→8 tabel, regex k10 bez `BEGIN`): uczciwe | diff |
| `packages/domena/src/` eksport, limit, wariant, konfiguracja | tak | kod + testy + mutacje `dowody/bj-mutacje-domena.txt` |
| `packages/poker-core/src/scenario-gen.ts`, `drills.ts` | tak | sonda różnicowa i rozkład decyzji `dowody/bj-sonda-generator.txt` |
| `packages/content-schema`, `tools/content-build` (scenariusze) | tak | kod + test autora (14 przypadków) |
| `.github/workflows/nocny.yml` | tak: jedna linia, dopisane jedno słowo `scenario-gen.ts` w grupie `poker-core-reszta` | `git diff 8cba034..886b2be -- .github/workflows/nocny.yml` |
| `tests/narzedzia/` (postep-node, sprawdz-eksport, wzorzec-bazy) | tak | diff + `pnpm test:skrypty` w CI |
| Mutacje `scenario-gen.ts` | nie uruchomiono lokalnie: każdy mutant uruchamia cały zestaw poker-core (125 s), ok. 1 h; pokrywa grupa nocna `poker-core-reszta` | — |
| Ekrany, E2E, iOS | nie dotyczy zakresu (brak zmian w `apps/mobile`) | — |

## Kontrola dowodów i sekretów
- `pnpm run ci` (przebieg 1, równolegle ze Strykerem na 4 procesach): kod 1 — przekroczony czas 5000 ms w `tools/content-build/test/terms-nazwy-09.test.ts:82` (plik spoza zmiany), `dowody/bj-ci-1-obciazenie.txt`. Przebieg 2 (sam, bez innych zadań, HEAD eae60e3 = 886b2be + test oczekujący poza ci): **kod 0**; testy: poker-core 165, domena 331, postep 134, content-build 194, srs 21, jezyki 144, preflop-solver 44 — wszystkie zielone (`dowody/bj-ci-2.txt`). Czerwień przebiegu 1 wynikała z obciążenia, nie ze zmiany BF.
- Test odtwarzający 001: `tests/akceptacja/generator/bj-001-decyzja-niezmienna.test.ts`, kod 1, 3 przypadki czerwone na asercji (A/średni, A/trudny, B/średni), 2 zielone (oba poziomy łatwe): `dowody/bj-red-001.txt`. Poza `pnpm run ci` (testy oczekujące, D-175: `tests/akceptacja/vitest.config.ts:1`).
- Mutacje (Stryker 9.6.1, `wariant.ts`, `limit.ts`, `eksport.ts`, testy `wariant-bf`, `limit`, `eksport`): wynik 89,32% (206 mutantów: 159 zabite, 25 przekroczeń czasu, 22 przeżyło; `eksport.ts` 85,87%, `limit.ts` 96,74%, `wariant.ts` 72,73% — przeżyły m.in. mutanty kierunku kroku ziarna i gałęzi obronnej „brak prób”, bez wpływu na wymagania; testy postep nie były w komendzie, więc wynik `eksport.ts` jest dolną granicą), kod 0, `dowody/bj-mutacje-domena.txt`.
- Sondy w osobnym worktree w scratchpadzie (nie w repo); źródła sond: `dowody/bj-sonda-generator.test.ts.txt`, `dowody/bj-sonda-dane.test.ts.txt`.
- Sekrety: diff 8cba034..886b2be bez plików `.env/.p8/.p12/.pem/.key` i bez wzorców kluczy (`dowody/bj-sekrety.txt`).
- `sprawdz-raport.mjs --rola 08-programista` (kopia ze scratchpadu): „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista”, kod 0.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | znalezisko 08-programista-001 (reguła BR-GEN-003 bez testu niezmienności); pozostałe reguły (BR-GEN-001, 002, KO-043, D-550) mają testy |
| DEV-02 | dotyczy | ok: 5/5 commitów zmieniających zachowanie ma test w tym samym commicie (654dfb4, 3df22f1, 98718f0, 64bdd62, 9a8d79c); ad8df88 strukturalny bez testu, równoważność potwierdzona sondą różnicową 12 000 porównań; kolejności czerwony→zielony nie da się odtworzyć z jednego commitu |
| DEV-03 | dotyczy | ok: brak `.skip/.only/todo`; zmienione asercje istniejących testów (wersja 2, 8 tabel, wzorzec v1 bez `wariant_historia`, regex k10) wynikają z migracji, nie luzują kontroli |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 w przebiegu osobnym (`dowody/bj-ci-2.txt`); przebieg równoległy ze Strykerem kod 1 z powodu czasu (`dowody/bj-ci-1-obciazenie.txt`) |
| DEV-05 | dotyczy | ok: UPSERT `ON CONFLICT … DO UPDATE` (`packages/postep/src/wariantyHistoria.ts:20-23`), bez REPLACE; tabela bez kluczy obcych; zapis + przycięcie w jednej transakcji; brzegowe 08-programista-003 |
| DEV-06 | dotyczy | ok: migracja v2 w transakcji (`packages/postep/src/migracje.ts:56-67`), test na kopii pliku bazy v1 z danymi (`packages/postep/test/k02-migracje.test.ts:69-110`) i test wycofania; kopia przed migracją niewymagana dla migracji bez przebudowy (`docs/architektura/dane.md:106`) |
| DEV-07 | dotyczy | ok: brak zgadywanych wartości; `odczytajOdciski` nie udaje pustej historii przy błędzie |
| DEV-08 | dotyczy | ok: `zagrano_ms` INTEGER ms UTC; wpływ cofniętego zegara na przycięcie → 003 |
| DEV-09 | dotyczy | ok w ścieżkach danych; `as GeneratorTemplate` po zod w content-build → Do sprawdzenia |
| DEV-10 | dotyczy | 08-programista-003 (zapis zwraca sukces, a odcisku nie ma); reszta ok |
| DEV-11 | nie dotyczy: brak zmian interfejsu | — |
| DEV-12 | nie dotyczy: brak tekstów interfejsu w zmianie (wyjaśnienia w treści, przekład krok I) | — |
| DEV-13 | dotyczy | ok: okno 20 w jednym miejscu; `SCHEMAT_WERSJA` 2 = ostatnia migracja (pilnuje `packages/postep/test/k12-bledy.test.ts:120`) |
| DEV-14 | dotyczy | ok (`dowody/bj-sekrety.txt`) |
| DEV-15 | nie dotyczy: brak nasłuchów i timerów w zmianie | — |
| DEV-16 | dotyczy | ok: `zagranoMs`, `terazMs`; pule i zakłady bez jednostki w bb, ale tylko w obliczeniu ilorazu (bez pomyłki) |

## Znaleziska (szczegóły)

### 08-programista-001 · Poprawna decyzja zmienia się między wariantami jednego poziomu, a szablon nie ma oceny oczekiwanej
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 · próg CLAUDE.md: WYSOKIE (błędne twierdzenia merytoryczne po podłączeniu treści)
- Realność: brzegowy dziś (brak szablonów w `content/`, brak ekranu; krok F), realny od kroku C · Pewność: wysoka
- Rodzaj: D
- Dowód:
  - Wymaganie: `docs/brd/wymagania-scenariusze.md:10` (granice losowania) „warunki szablonu, w których poprawna decyzja w każdym punkcie decyzji się nie zmienia”; `docs/brd/wymagania-scenariusze.md:101` „w 100% wariantów ocena każdej akcji jest taka, jak w szablonie”; BR-SZB-001 wymaga pola `punktyDecyzji` z „akcje z oceną” (`docs/brd/wymagania-scenariusze.md:18`).
  - Kod: `packages/poker-core/src/scenario-gen.ts:134` liczy `correct` dla każdego wariantu osobno („correct: spot.hitNextCard > required ? 'call' : 'fold'”); format `packages/content-schema/src/index.ts:514` ma dla akcji tylko `action` i `explanation`, bez oceny; `packages/content-schema/src/index.ts:528` wymaga dwóch akcji, każdej ze stałym wyjaśnieniem.
  - Test autora sprawdza zgodność z rachunkiem w każdym wariancie osobno (`packages/poker-core/test/scenario-gen.test.ts:66`), nie niezmienność w poziomie, więc przechodzi.
  - Sonda (`dowody/bj-sonda-generator.txt`, kod 0), 2000 wariantów na poziom, szablony testowe autora: A/łatwy fold 2000; A/średni fold 1882, call 118; A/trudny fold 1039, call 961; B/łatwy fold>fold 2000; B/średni fold>fold 1806, fold>call 91, call>fold 74, call>call 29.
  - Test odtwarzający: `tests/akceptacja/generator/bj-001-decyzja-niezmienna.test.ts`, 3 czerwone na asercji (`dowody/bj-red-001.txt`, kod 1).
- Mechanizm: ocena wariantu z rachunku zamiast z szablonu; jedno miejsce (`correct` w `tryVariant`), wyrocznia w jednym teście; `grep -rn "correct" packages/poker-core/src/scenario-gen.ts` → 2 trafienia (typ i wyliczenie).
- Powraca: nie
- Wzorzec lub źródło: BR-GEN-003, D-533, BR-SZB-001.
- Rachunek pomocniczy (nie twierdzenie merytoryczne): przy drawach z D-551 (kolor 9, OESD 8, gutshot 4 outy, 47 nieznanych kart na flopie) szansa na jedną kartę wynosi najwyżej 9/47 ≈ 19,1%, a cena przy najmniejszym ułamku 0,25 puli to 0,25 / 1,5 ≈ 16,7%, więc po stronie „call” odległość od progu nie przekracza ok. 2,5 pp. Poziom łatwy (≥ 10 pp) może więc dać wyłącznie „fold”, a „call” istnieje tylko w wąskim pasie średni/trudny — to ogranicza sens poziomów niezależnie od naprawy (do oceny 03/06).
- Kroki w aplikacji: po kroku C i F: użytkownik startuje szablon na poziomie trudnym, dostaje wariant, w którym rachunek daje „fold”, wybiera „call” i widzi wyjaśnienie napisane do „call” — albo ocenę „zgodne” przy tekście, który opisuje sytuację odwrotną; w drugim wariancie tego samego szablonu ta sama akcja jest oceniana odwrotnie.
- Opcje: (a) szablon deklaruje dla każdego punktu i poziomu oczekiwaną akcję (lub zbiór akcji zgodne/dopuszczalne, ADR-04), generator odrzuca wariant z inną oceną rachunku, wyrocznia testu porównuje z szablonem — zgodne z BR-GEN-003 dosłownie, mała zmiana formatu przed krokiem C; (b) granice poziomu z kierunkiem (np. `side: 'call' | 'fold'` obok `marginMin/Max`), z którego wynika ocena — mniej pól, ale ocena pośrednia, a ręka mieszana trudna (ADR-04) wymaga osobnej ścieżki. Rekomendacja: (a), bo BR-SZB-001 wprost wymaga „akcje z oceną”.
- Test akceptacyjny: `tests/akceptacja/generator/bj-001-decyzja-niezmienna.test.ts` zielony po przeniesieniu do `packages/poker-core/test/` (z szablonami deklarującymi ocenę), bez zmiany asercji niezmienności; test 10 000 losowań porównuje `correct` z oceną z szablonu.
- Status: otwarte

### 08-programista-004 · Wyjaśnienie akcji w szablonie to stały tekst bez kart i pozycji wariantu
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 · próg: ŚREDNIE (rozbieżność z wymaganiem, bez błędnej liczby; ścieżki przez UI jeszcze brak)
- Realność: brzegowy dziś, realny od kroku C · Pewność: wysoka
- Rodzaj: D
- Dowód: `docs/brd/wymagania-scenariusze.md:189` „Wtedy w zdaniu sytuacji są karty i pozycja z tego wariantu, a nie z przykładu w treści”; BR-OCE-001 wymaga, by pierwsze zdanie wymieniało rękę i stół gracza. Format: `packages/content-schema/src/index.ts:514` — `explanation: z.string()` bez miejsca na karty wariantu; `tools/content-build/src/build.ts` podstawia tylko `{{n:…}}` (wywołanie `sub(a.explanation, …)` w bloku szablonów).
- Mechanizm: wyjaśnienie z treści bez parametrów wariantu; jedno miejsce (`ScenarioActionText`).
- Powraca: nie
- Wzorzec lub źródło: BR-OCE-001, BR-OCE-002; plan §3 krok C (06 pisze wyjaśnienia w formacie z kroku B).
- Kroki w aplikacji: po kroku C/F: wyjaśnienie nie może powiedzieć „Masz A♥K♥ na Q♥7♥2♣”, tylko opis ogólny; 06 napisze wyjaśnienia ogólne, które trzeba będzie przepisać po zmianie formatu (35 języków, krok I).
- Opcje: (a) znaczniki wariantu w wyjaśnieniu (np. ręka, stół, pozycja) podstawiane przy wyświetleniu, sprawdzane w content-build — zgodne z BR, zmiana formatu przed krokiem C; (b) wyjaśnienie dwuczęściowe: zdanie sytuacji generowane przez kod z wariantu (i18n), część „bo” z treści — mniej pracy 06, tekst sytuacji w kluczach i18n. Rekomendacja: zdecydować (rola 03/05/06) przed krokiem C, razem z 001.
- Test akceptacyjny: test content-build: wyjaśnienie bez odwołania do kart wariantu w zdaniu sytuacji → błąd budowania; test ekranu (krok F): zdanie sytuacji zawiera karty wariantu.
- Status: otwarte

### 08-programista-002 · „Powtórka wariantu” w limicie to flaga od wywołującego; domena nie rozpoznaje powtórki z ziarna
- Pozycja listy kontrolnej: DEV-01
- Poziom: P2 · próg: ŚREDNIE (do backlogu z wersją kroku F)
- Realność: teoretyczny dziś (brak wywołania z `true` w aplikacji), brzegowy od kroku F · Pewność: wysoka
- Rodzaj: D
- Dowód: `packages/domena/src/limit.ts:25` („powtorkaWariantu = false,”); decyzja, czy to ten sam wariant, nie jest w domenie (D-554: „Rozpoznanie … należy do ekranu przebiegu (krok F)”). Testy KO-043 (`packages/domena/test/limit.test.ts:77-92`) podają flagę ręcznie, więc kryterium z polecenia BJ (nowy wariant zużywa limit, brak obejścia przez ziarno) jest sprawdzalne dopiero w ekranie.
- Mechanizm: zasada limitu zależy od wartości logicznej z interfejsu; `grep -rn "mozeStartowac(" apps packages --include=*.ts --include=*.tsx` → wywołania bez czwartego argumentu (zachowanie dotychczasowe).
- Powraca: nie (uwaga 1 w przeglądzie autora, zgodna)
- Wzorzec lub źródło: zasada roli 11 (logika czysta, platforma cienka); KO-043.
- Kroki w aplikacji: po kroku F, gdyby ekran ustawiał flagę dla „Nowe rozdanie” albo dla wariantu z innym ziarnem, użytkownik darmowy grałby nowe warianty bez limitu.
- Opcje: (a) czysta funkcja w domenie `czyPowtorkaWariantu(ostatniUkonczony, start)` porównująca szablon, poziom i ziarno, z testem; `mozeStartowac` przyjmuje jej wynik — logika testowana w Node; (b) zostawić flagę i dopisać test ekranu w kroku F — mniej kodu, kontrola dopiero w teście ekranu. Rekomendacja: (a) w kroku F.
- Test akceptacyjny: test domeny: ten sam szablon+poziom+ziarno co ukończony wariant → poza limitem; inne ziarno albo poziom → z limitu i blokada przy wyczerpanym.
- Status: otwarte

### 08-programista-003 · Zapis odcisku przy cofniętym zegarze zwraca sukces, a odcisk znika przy przycięciu okna
- Pozycja listy kontrolnej: DEV-10
- Poziom: P2 · próg: NISKIE
- Realność: brzegowy (zmiana daty/strefy w telefonie, ręczne cofnięcie zegara) · Pewność: wysoka
- Rodzaj: D
- Dowód: przycięcie po czasie (`packages/postep/src/wariantyHistoria.ts:26`, „ORDER BY zagrano_ms DESC, id DESC LIMIT ?”). Sonda: 20 odcisków z `T0+i`, potem zapis z `T0 − 1 dzień` → `{"ok":true}`, nowego odcisku brak w historii, liczba 20 (`dowody/bj-sonda-dane.txt`, kod 0).
- Mechanizm: kolejność okna według zegara urządzenia zamiast kolejności zapisu; jedno zapytanie.
- Powraca: nie
- Wzorzec lub źródło: DEV-10 (nieudany zapis nie wygląda na udany); skutek ogranicza się do historii odcisków (bez utraty postępu).
- Kroki w aplikacji: po kroku F: użytkownik cofa datę w telefonie (np. obejście limitu dziennego), gra wariant; ten wariant nie trafia do okna i może wrócić w następnej sesji.
- Opcje: (a) przycięcie po `id` (kolejność zapisu, UPSERT zachowuje id — wtedy odświeżenie nie przesuwa wpisu, trzeba nowego id albo osobnej kolumny kolejności); (b) `zagrano_ms = max(teraz, max(zagrano_ms) + 1)` w tej samej transakcji — kolejność monotoniczna, czas przybliżony. Rekomendacja: (b), mała zmiana i test sondy jako regresja.
- Test akceptacyjny: sonda z `dowody/bj-sonda-dane.test.ts.txt` (przypadek zegara) jako test w `packages/postep/test/`: nowy odcisk jest w historii po zapisie z cofniętym czasem.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- `tools/content-build/src/scenariusze.ts:75` rzutuje dane po zod na `GeneratorTemplate` („as GeneratorTemplate”); nie sprawdziłem, czy `TextureFilter` z content-schema i z poker-core mają ten sam kształt. Brak: kompilacja bez `as` (uwaga 3 autora).
- Szablony w innych językach (`content/<język>/scenarios/`): generator sprawdzany tylko w pl, a id i granice mogą się rozjechać z pl; historia wariantów kluczuje po id. Brak: kontrola zgodności id/granic między językami (krok I, rola 09).
- Pakiet `packages/postep` nie ma grupy w testach mutacyjnych `nocny.yml` (macierz: domena, srs, poker-core); `wariantyHistoria.ts` nie jest mutowany. Brak: decyzja, czy to celowe (poza zakresem BF).
- `wybierzWariant` przekazuje `TemplateError` z `generateVariant` do wywołującego; budowanie treści sprawdza ziarna 1…2000, a w aplikacji ziarna są dowolne. Brak: pomiar odsetka odrzuceń dla prawdziwych szablonów (krok C).

## Co działa dobrze i należy zachować
- Migracja v2 osobnym plikiem (`schemat-v2.sql` + dosłowna kopia w kodzie ze strażnikiem testu), v1 nietknięta; test na kopii pliku bazy v1 z danymi brzegowymi i test wycofania z asercją braku tabeli i indeksu.
- Tylko `wariant_historia` opcjonalna w imporcie, z komentarzem „dlaczego” i testem, że brak innej tabeli nadal jest błędem; zgodność w obie strony (sonda: plik nowy w walidacji starej aplikacji przechodzi, obca tabela pomijana).
- `odczytajOdciski` zwraca `odczyt_nieudany` zamiast pustej historii przy złym wierszu.
- `analyseOutsSpot` wydzielone w osobnym commicie strukturalnym; równoważność potwierdzona różnicowo (12 000 porównań, `dowody/bj-sonda-generator.txt`).
- Wyrocznia outów w teście generatora liczy outy przeglądem wszystkich kart i 5-kartowych podzbiorów wzorcowym evaluatorem — niezależnie od `drawOuts`; do zachowania przy naprawie 001.
- Zmiana `nocny.yml` ogranicza się do dopisania jednego pliku (KO-047).

## Decyzje dla właściciela
Brak decyzji produktowych w tej recenzji. Do koordynatora (decyzje techniczne/merytoryczne, nie właściciela): kolejność — naprawa 001 i 004 przed krokiem C; wybór opcji formatu w 001 i 004 należy do ról 03/05/06 według ADR-24.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-004` (przed krokiem C); 08-programista-002 i 08-programista-003 do backlogu kroku F.

`git status --porcelain` przed commitem recenzji: pusty poza plikami recenzji (`dowody/bj-git-status.txt`).
