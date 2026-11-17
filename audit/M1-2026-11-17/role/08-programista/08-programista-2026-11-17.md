# Audyt: Programista — Szkoła Pokera (PokerGym) — 2026-11-17
Commit: f75acdffa (kod aplikacji = f75acdff16915aeb43ff788888216e28616c11ed; HEAD gałęzi audytu 01cd5fcc dokłada tylko audit/M1-2026-11-17/ i docs/decyzje/IR.md) · Tryb: audit (polecenie M1, plan zatwierdzony przez właściciela 2026-11-17 „c: głęboki”) · Moduł: sqlite-expo · Środowisko: Linux (kontener), Node v22.23.4, pnpm 10.28.0, git; działało: odczyt kodu, grep, pojedyncze testy Vitest; nie działało/nie uruchamiane: Xcode, symulator iOS, telefon, ESLint (brak w repo), pełne testy i instalacja (wyniki wspólne M1: audit/M1-2026-11-17/wspolne/).

## Podsumowanie
Warstwa danych (`packages/postep`, adapter `apps/mobile/src/data`) jest najmocniejszą częścią kodu: jedna kolejka zapisów, UPSERT zamiast REPLACE, migracje w transakcji z testem na wzorcu v1 z danymi, kopia `VACUUM INTO`, import walidowany przed dotknięciem bazy i w jednej transakcji, błędy jako wartości z kodem i komunikatem. W E1 nie znalazłem ścieżki utraty danych, sekretu ani osłabionego testu; pełne `pnpm run ci` na f75acdff przeszło (kod 0, wspólny log M1), a 4 pliki testów portu i migracji przeszły ponownie w tej sesji (41/41). Wszystkie 6 znalezisk to P2 (ŚREDNIE, nie blokują wydania wg CLAUDE.md „Audyty i wydania” pkt 1); najważniejsze: aplikacja nie reaguje na powrót na pierwszy plan (AppState), choć wymagają tego `tlo-i-bledy.md` §2 pkt 3–4 i ADR 0013 pkt 4–5 (licznik limitu i powtórek na „Dziś” zostaje z poprzedniego dnia), oraz te same progi oceny i egzaminu zdefiniowane w dwóch modułach. Decyzja dla właściciela: tylko kolejność napraw P2 (backlog z wersją) i narzędzie lint (koszt 0).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | P2 | D | Po powrocie aplikacji na pierwszy plan ekran „Dziś” pokazuje limit i powtórki z poprzedniego dnia; brak obsługi AppState z ADR 0013 i tlo-i-bledy.md | otwarte |
| 08-programista-002 | P2 | D | Te same progi oceny i egzaminu zdefiniowane w dwóch modułach (KONFIGURACJA i thresholds.ts), bez testu równości | otwarte |
| 08-programista-003 | P2 | D | Dziennik rozdania używa nazwy ulicy jako klucza React; SC-06 i SC-08 mają dwie decyzje preflop (ostrzeżenie o zdublowanym kluczu w CI) | otwarte |
| 08-programista-004 | P2 | D | Każdy komponent z `useTokens` osobno odpytuje „Zwiększ kontrast” i zaczyna od palety zwykłej (mignięcie palety, 77 nasłuchów) | otwarte |
| 08-programista-005 | P2 | P | Skrypt `lint` (`expo lint`) nie działa: brak ESLint i konfiguracji; 21 wyłączeń reguł, których nic nie sprawdza | otwarte |
| 08-programista-006 | P2 | D | Rozmiary i krój tekstu wpisane na sztywno w 6 miejscach poza modułem motywu | otwarte |

## Linia bazowa i założenia
**E0 (stan wyjściowy, stosowalność).** Stan projektu wzięty z polecenia M1 i `CLAUDE.md` (w budowie, TestFlight tylko wewnętrznie, build 1011, poza właścicielem brak użytkowników i ich danych), więc bez pytania do właściciela. Bramka opłacalności: wyjątek nazwany właściciela z 2026-11-17 („Pomiń, wyjątek nazwany”), brak werdyktu bramki w tym audycie (kontekst `docs/monetyzacja.md`). Komendy stanu wyjściowego (zasada programisty 1) nie powtarzane zgodnie z poleceniem: pełne `env -u NODE_PATH pnpm run ci` na f75acdff w audit/M1-2026-11-17/wspolne/ci-pelne.log (kod 0; m.in. mobile 173 zestawy / 1782 testy, postep 160, domena 347 + 1 oczekiwany błąd, content-build 927 + 1 oczekiwany błąd), stan CI na GitHub w audit/M1-2026-11-17/wspolne/ci-stan.txt (CI #479 na SHA audytu: success). Wyjątek nazwany z polecenia: raport nie jest dopisywany do `.git/info/exclude` (katalog M1 commituje koordynator, KO-126). Środowisko i dowód, że kod aplikacji = f75acdff: dowody/e0-srodowisko.txt 

**E0b: obraz najlepszej w klasie wersji (przed czytaniem starych raportów).** Z kodu i ADR wyznaczyłem ścieżki zapisu: start bazy i migracje (`start.ts`, `migracje.ts`), krok aktywności i zakończenie z kartą FSRS (`aktywnosci.ts`, `powtorki.ts`), ustawienia, pamięć uprawnień, historia wariantów, dziennik, eksport/import/kopia/„Usuń postęp” (`daneUzytkownika.ts`, `przeniesienie.ts`). Wzorzec: każda z nich w transakcji przez jedną kolejkę, z testem na prawdziwym SQLite (`node:sqlite`), z błędem jako wartością i komunikatem; granice z zewnętrzem (baza, plik importu, sklep, ustawienia) parsowane z `unknown`; cykl życia iOS (przejście do tła i powrót) obsłużony jawnie. Wzorzec API: docs.expo.dev dla SDK 58 i ADR roli 05 (w repo ADR 0001–0014 z cytatami z dokumentacji, odczyt 2026-11-04); nowych stron w tej sesji nie czytałem, bo nie oceniam użycia API spoza już udokumentowanych.

**Wymiary pokrycia:**
- Ścieżki zapisu: wszystkie wyżej wymienione przeczytane; brak REPLACE, brak „usuń dzieci i wstaw od nowa” poza świadomym importem i „Usuń postęp” (ADR 0008, BR-DANE-003), zapisy wielowierszowe w `port.transakcja`. Dwa zapisy poza jedną transakcją są nazwane w kodzie i bezpieczne (ocena poziomu: `punkt_startu` przed zakończeniem; scenariusz: odcisk po starcie aktywności). Wynik: bez znaleziska.
- Obsługa błędów: `jakoWynik`/`powodZapisu` → komunikat w sesji, scenariuszu, ustawieniach i ekranie danych; puste `catch` tylko z komentarzem i powodem (dowody/dev10-grep-catch.txt). Brak reakcji na przejście do tła i powrót: 08-programista-001.
- Typy na granicach: baza postępu, plik importu, sklep (`zakupy.ts`), ustawienia parsowane z `unknown`; baza treści czytana z rzutowaniem (`getAllSync<T>`, `JSON.parse … as Drill`), co jest świadomą granicą zaufania do artefaktu buildu (ADR 0005, manifest i hash w nazwie pliku). Wynik: bez znaleziska.
- System projektowy: kolory tylko z motywu; 6 rozmiarów/krojów na sztywno (08-programista-006); mechanizm palety kontrastu: 08-programista-004.
- i18n: `i18n:kod` w CI 0 błędów, 877 kluczy, liczba mnoga przez i18next; grep literałów w JSX: 0 trafień. Wynik: bez znaleziska (zakres języków interfejsu to rola 09).
- Wydajność: synchroniczne odczyty bazy treści przy budowie zestawu (`repo.ts`) i 77 nasłuchów kontrastu (08-programista-004); budżety czekają na pomiar OP-21. Pomiar na telefonie: nie sprawdzono.
- Testy na właściwym poziomie: logika domeny w Node (Vitest), zapis na `node:sqlite` z wyłączonymi kluczami obcymi (adapter testowy), ekrany przez RNTL; wektory RD-11 i BR w nazwach testów (dowody/dev01-brd-testy.txt).
- Dostępność w komponentach: role, etykiety i ogłoszenia przez `useAnnounce` w sesji i scenariuszu (próbka); pełny przegląd to rola 04/07. Wynik: bez znaleziska poza 08-programista-004.
- Liczby konfiguracyjne: 08-programista-002 (dowody/dev13-konfiguracja.txt).

**Soczewki (po kolei, bez subagentów):**
- Użytkownik, któremu zapis przerwano w połowie: krok i odpowiedź w jednej transakcji, `krok = max(krok, next)`, wznowienie odtwarza zestaw z planu i porzuca aktywność, gdy treść się zmieniła; import i „Usuń postęp” wycofywane w całości. Luka: tylko fallback ADR 0013 pkt 4 przy odmowie czasu w tle (08-programista-001).
- Recenzent szukający ścieżki bez testu: eksportowane funkcje `domena`, `postep`, `srs` bez wzmianki w testach to tylko pomocnicze (`kodSQLite`, `jakoWynik`, `powtorkaTx`, `wycofaj`), testowane pośrednio (dowody/dev01-funkcje-bez-testu.txt). Brak testu równości progów: 08-programista-002.
- Programista czytający moduł pierwszy raz: komentarze z ID decyzji przy każdej regule; dwa źródła tych samych progów mylą (08-programista-002); `session.tsx` 664 linie i `scenario-gen.ts` 112 KB to koszt czytania, nie błąd.
- Użytkownik VoiceOver albo z dużym tekstem: mignięcie palety przy „Zwiększ kontrast” (08-programista-004); stałe rozmiary bez sufitu dla AX5 (08-programista-006).

**Wzorzec najlepszych:** w tym repo wzorcem jest sam port bazy z eksperymentami E1–E5 roli 05 i Trening (`lkarwowski494/trening`, przywoływany w kodzie z odczytem 2026-11-08); nie czytałem nowych źródeł zewnętrznych, bo znaleziska nie zależą od faktów spoza repo.

**Rejestr założeń:** bez propozycji zmiany statusu (żadne znalezisko nie dotyczy kierunku produktu).

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `packages/postep/src` (port, start, migracje, aktywności, powtórki, ustawienia, uprawnienia, warianty, dziennik, dane użytkownika, błędy) | tak, w całości | odczyt; dowody/testy-postep-pojedyncze.txt |
| `apps/mobile/src/data` (postepExpo, przeniesienie, postep, tresc/startTresci, content/repo) | tak | odczyt; dowody/dev09-grep-rzutowania.txt |
| `apps/mobile/src/platform` (zakupy, pliki, dziennik, ochronaTla, przypomnienie przez features/ustawienia) | tak | odczyt; dowody/dev10-grep-catch.txt |
| Ekrany: session, settings, data, lesson, (tabs)/index, scenariusz (EkranScenariusza, komponenty, aktywnoscScenariusza), ocena poziomu | tak (przepływ zapisu i błędu) | odczyt; dowody/appstate-grep.txt, dowody/dziennik-klucz.txt |
| `packages/domena/src` (konfiguracja, kurs, przypomnienie) | częściowo (pliki z zapisem, konfiguracją i czasem) | dowody/dev13-konfiguracja.txt |
| `packages/poker-core`, `tools/content-build`, `packages/srs` | tylko grep (domyślne wartości, czas, testy osłabione) | dowody/dev07-grep-domyslne.txt, dowody/dev08-dev16-czas.txt |
| `apps/mobile/modules/ochrona-tla` (Swift) | nie sprawdzono (bez Xcode; poza `ochronaTla.ts`) | — |
| Testy, typecheck, lint | tak (log wspólny + 4 pliki testów portu w tej sesji; lint nie istnieje) | dowody/dev04-lint.txt, audit/M1-2026-11-17/wspolne/ci-pelne.log |
| Historia testów (DEV-02, DEV-03) | tak (próbka 40 commitów, 80 commitów testów) | dowody/dev02-probka-commitow.txt, dowody/dev03-grep-oslabione.txt |
| Sekrety w repo i historii | tak | dowody/dev14-sekrety.txt |
| Działanie na iPhonie (migracja na bazie z buildu 1011, import w tle, U-2, U-3) | nie sprawdzono (bez urządzenia; krok właściciela) | — |
| Workflowy `.github/`, `app.json`, `eas.json` | nie sprawdzono (obszar roli 10) | — |

## Kontrola dowodów i sekretów
Wynik `node audit/M1-2026-11-17/narzedzia/sprawdz-raport.mjs <raport> /home/user/Szkola_pokera audit/M1-2026-11-17/role/08-programista --rola 08-programista`: kod 0, „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista” (przebieg końcowy po poprawkach, 2026-11-17).

`git status --porcelain` na początku (dowody/e0-srodowisko.txt): tylko nieśledzone katalogi audytu M1; na końcu: wyłącznie wpisy `??` w audit/M1-2026-11-17/role/ (ten katalog i katalogi innych ról), żaden plik śledzony nie jest zmieniony (wynik wklejony na końcu raportu).

Treść z zewnątrz (zasada 16): w przeczytanych plikach nie zauważyłem poleceń skierowanych do agenta.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | ok: 52 z 58 ID BR ma test; 6 bez testu to reguły interfejsu i procesu treści (BR-MENU-002/003, BR-OCE-003, BR-SZB-002) albo pokryte inaczej (BR-JEZ-001: flow E2E 08; BR-CWI-001: wektory RD-11 w `rd11-ocena.test.ts`) — dowody/dev01-brd-testy.txt, dowody/dev01-funkcje-bez-testu.txt |
| DEV-02 | dotyczy | ok: 10/10 commitów zmieniających zachowanie ma test w tym samym commicie (1cde3a1d 8de3e90f e8b6455a 1be29ad5 2e7b0e0d a76841c6 77c7235b 5a071412 6f24f52d 53046488) — dowody/dev02-probka-commitow.txt |
| DEV-03 | dotyczy | ok: 2 `it.fails` z ID recenzji (CG-ŚR-1, CQ) i opisem, brak `.skip`/`.only`/`expect(true)`; 2 commity z ubytkiem asercji (8de3e90f, b15d37b1) zastępują je ściślejszymi wartościami — dowody/dev03-grep-oslabione.txt |
| DEV-04 | dotyczy | typecheck i testy: ok (ci-pelne.log kod 0); lint: 08-programista-005; ostrzeżenie Reacta w przechodzącym teście: 08-programista-003 |
| DEV-05 | dotyczy (moduł sqlite-expo) | ok: 0 trafień `OR REPLACE`/`REPLACE INTO`/`withExclusiveTransactionAsync`/`*Sync` na bazie postępu; `DELETE FROM` tylko w imporcie, „Usuń postęp”, przycięciu dziennika i historii wariantów oraz w tabeli-liściu `uprawnienie_cache`, wszystkie w transakcji — odczyt kodu, dowody/testy-postep-pojedyncze.txt |
| DEV-06 | dotyczy | ok: każda migracja w `BEGIN IMMEDIATE` z `foreign_key_check`, test na wzorcu v1 z danymi (v1 → v3), wycofanie przy złamanym CHECK, odmowa bazy nowszej; kopia `VACUUM INTO`; tryb `DELETE` (bez WAL). Migracji z przebudową brak (ADR 0003 pkt 5: krok kopii dopiero z pierwszą taką migracją) |
| DEV-07 | dotyczy | ok: trafienia `?? 0`/`?? ''` to liczniki, indeksy, etykiety i parametry silnika z domyślną wartością schematu; brak zgadniętej liczby w danych użytkownika (`odczytajPamiec`, karty, odpowiedzi parsowane ze sprawdzeniem typu) — dowody/dev07-grep-domyslne.txt |
| DEV-08 | dotyczy | znalezisko 08-programista-001 (stan dnia po powrocie na pierwszy plan); format czasu ok: INTEGER ms UTC, `new Date` tylko do formatowania i ISO eksportu — dowody/dev08-dev16-czas.txt |
| DEV-09 | dotyczy | ok dla danych użytkownika, sklepu i pliku importu (parsowanie z `unknown`); baza treści: granica zaufania do artefaktu buildu (ADR 0005, manifest formatu sprawdzany w `startTresci.ts`, hash treści w nazwie pliku) — nie znalezisko; `contentChange.ts` rzutuje JSON, ale sprawdza pola i łapie wyjątek — dowody/dev09-grep-rzutowania.txt |
| DEV-10 | dotyczy | ok: nieudany zapis daje komunikat (sesja, scenariusz, ustawienia, dane); `catch` bez obsługi tylko z komentarzem (sprzątanie plików tymczasowych, haptyka, odczyt preferencji) — dowody/dev10-grep-catch.txt |
| DEV-11 | dotyczy | 08-programista-006 (kolory: 0 trafień poza motywem) — dowody/dev11-tokeny.txt |
| DEV-12 | dotyczy (i18next, 12 słowników interfejsu) | ok: `i18n:kod` 0 błędów, 877 kluczy w źródle; 0 literałów w JSX; sklejanie `t() +` 0 trafień |
| DEV-13 | dotyczy | 08-programista-002 — dowody/dev13-konfiguracja.txt |
| DEV-14 | dotyczy | ok: brak plików kluczy w drzewie i historii; trafienia wzorców to „risk-of-ruin” w adresach i atrapa klucza w testach — dowody/dev14-sekrety.txt |
| DEV-15 | dotyczy | nasłuchy i timery mają sprzątanie (`PasekStrategii`, `tokens`, `zakupy`, `ochronaTla`); mechanizm kontrastu: 08-programista-004 |
| DEV-16 | dotyczy | ok: nazwy z jednostką (`terazMs`, `czas_ms`, `SKLEP_LIMIT_CZASU_MS`, `PROSBA_O_OCENE_ODSTEP_DNI`); przeliczenia dni na ms w 2 miejscach (`kurs.ts`, `srs/game.ts`) bez pomyłki jednostki — dowody/dev08-dev16-czas.txt |

Pozycje wspólne z rolą 05 (DEV-05, 06, 08, 10, 13, 14): raportu roli 05 nie czytałem (polecenie M1), więc zgłaszam je sam; M1 scali duplikaty.

## Znaleziska (szczegóły)

### 08-programista-001 · Po powrocie aplikacji na pierwszy plan ekran „Dziś” pokazuje limit i powtórki z poprzedniego dnia; brak obsługi AppState z ADR 0013 i tlo-i-bledy.md
- Pozycja listy kontrolnej: DEV-08
- Poziom: P2
- Realność: realny (nieaktualny stan ekranu), brzegowy (operacja długa bez czasu w tle) · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `docs/architektura/tlo-i-bledy.md:41-42` wymaga reakcji na `AppState` → `background` (kolejka i przerwanie operacji długiej przy `rozpocznij` = −1) i → `active` (odczyt dnia lokalnego i strefy, BR-LIM-005; odczyt zgody na powiadomienia); `docs/adr/0013-ochrona-dlugich-operacji-przed-zawieszeniem.md:31-32` to samo jako ustalenie wiążące. W kodzie `AppState` występuje tylko w komentarzach: `packages/postep/src/port.ts:57-58` i `apps/mobile/src/platform/ochronaTla.ts:8` (dowody/appstate-grep.txt). Ekran „Dziś” czyta zużycie limitu i liczbę powtórek tylko przy fokusie nawigacji: `apps/mobile/src/app/(tabs)/index.tsx:27` i `apps/mobile/src/data/postep.ts:63` (`useFocusEffect`), a fokus nie zmienia się przy powrocie aplikacji z tła. Komentarz `apps/mobile/src/features/ustawienia/przypomnienie.ts:44` deklaruje odtworzenie przypomnienia także przy powrocie na pierwszy plan, a funkcję woła tylko start, import i „Usuń postęp”.
- Mechanizm: brak subskrypcji `AppState` w aplikacji; `grep -rn "AppState" apps/mobile/src packages/*/src` → 2 trafienia, oba w komentarzach.
- Powraca: tak — luka nazwana w `docs/jakosc/strategia.md:323` („odtworzenie po powrocie na pierwszy plan (U-3)”) → trwała kontrola: test hooka stanu aplikacji z atrapą `AppState`.
- Wzorzec lub źródło: ADR 0013 pkt 4–5; `tlo-i-bledy.md` §2 pkt 3–4; BR-LIM-005 („Gdy w telefonie zacznie się następny dzień kalendarzowy … licznik znów pokazuje 1 darmową aktywność”).
- Kroki w aplikacji: bez Pro zużyj dzienną aktywność, zostaw aplikację w tle na ekranie „Dziś”, wróć po północy: kafelki nadal pokazują stan „limit” i wczorajszą liczbę powtórek, dopóki nie przejdziesz na inny ekran. Start sesji liczy limit od nowa (`przygotujStart`), więc sam dostęp nie jest blokowany. Drugi skutek: gdy iOS odmówi czasu w tle (`beginBackgroundTask` → −1), import, eksport albo „Usuń postęp” nie są przerywane przy przejściu do tła (ryzyko zabicia `0xdead10cc`; dane spójne dzięki dziennikowi `DELETE`, więc bez utraty danych).
- Opcje: (a) jeden hook `useStanAplikacji` w `_layout`: `active` → `odswiez()` odczytów ekranu i `odtworzZBazy`, `background` → flaga przerwania dla operacji z id −1 — pełna zgodność z ADR, ok. 1 sesja z testem; (b) tylko `active` → odświeżenie „Dziś” i przypomnienia, a fallback −1 zapisany jako odstępstwo od ADR 0013 (rola 05) — mniej kodu, zostaje teoretyczne ryzyko. Rekomendacja: (a).
- Test akceptacyjny: test RNTL z atrapą `AppState`: zmiana dnia zegara + zdarzenie `active` → kafel sesji bez stanu „limit”; test portu: `rozpocznij` = −1 i zdarzenie `background` w środku importu → `przerwano_w_tle`, liczności tabel bez zmian.
- Status: otwarte

### 08-programista-002 · Te same progi oceny i egzaminu zdefiniowane w dwóch modułach (KONFIGURACJA i thresholds.ts), bez testu równości
- Pozycja listy kontrolnej: DEV-13
- Poziom: P2
- Realność: brzegowy (wartości dziś równe; rozjazd przy pierwszej zmianie jednego z plików) · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `packages/domena/src/konfiguracja.ts:7` (`TEST_MODULU_PROG: 0.85`), `packages/domena/src/konfiguracja.ts:12-13` (`OCENA_PROG_DOPUSZCZALNE: 0.035`, `OCENA_PROG_MIESZANA_DOLNY: 0.25`), `packages/domena/src/konfiguracja.ts:15` (`MALOWANIE_ZAKRESU_PROG: 0.9`) wobec `apps/mobile/src/features/drills/thresholds.ts:21-26` (`MIXED_MIN`, `MIXED_LOW`, `MIXED_HIGH`, `PAINT_PASS`) i `apps/mobile/src/features/drills/thresholds.ts:46-48` (`EXAM_SIZE`, `EXAM_MODULE_SHARE`, `EXAM_PASS`). Zapis wyniku testu używa `KONFIGURACJA.TEST_MODULU_PROG` (`apps/mobile/src/features/session/aktywnoscSesji.ts:139`), a ekran wyniku tej samej sesji `EXAM_PASS` (`apps/mobile/src/app/session.tsx:322`). Ocena scenariuszy bierze progi z `KONFIGURACJA` (`apps/mobile/src/features/scenariusz/wariant.ts:244-245`), a ocena zadań i opis skali z `MIXED_*` (`apps/mobile/src/features/drills/engine.ts:425`, `apps/mobile/src/features/stol/skala.ts:25-27`). Klucze `MALOWANIE_ZAKRESU_PROG`, `TEST_MODULU_UDZIAL_MODULU`, `FSRS_RETENCJA`, `FSRS_SZYBKO_MS`, `FSRS_WOLNO_MS` nie są czytane przez kod (retencję ustala `packages/srs/src/scheduler.ts:5`).
- Mechanizm: `docs/architektura/moduly.md:143-144` każe przenieść wartości do jednego pliku; klucze dodano, ale stare stałe zostały i to one działają w części ścieżek. Dowód: dowody/dev13-konfiguracja.txt (13 definicji i lista czytelników każdego klucza).
- Powraca: nie → trwała kontrola: test, że każdy klucz `KONFIGURACJA` ma czytelnika poza testami i że `thresholds.ts` nie definiuje wielkości obecnych w `KONFIGURACJA`.
- Wzorzec lub źródło: `CLAUDE.md` „Zasady techniczne”: „Ta sama wielkość ma jeden klucz”; zasada programisty 11.
- Kroki w aplikacji: dziś brak widocznego skutku. Po zmianie progu egzaminu tylko w jednym pliku ekran wyniku pokaże „zaliczony”, a zapis w `wynik_testu` (zaliczenie modułu na ścieżce kursu) „niezaliczony”, albo odwrotnie; analogicznie scenariusze i zadania oceniałyby tę samą częstość inaczej.
- Opcje: (a) `thresholds.ts` re-eksportuje wartości z `KONFIGURACJA` i znika jako źródło, nieużywane klucze usunięte albo podłączone (`srs` dostaje retencję z konfiguracji) — jedno źródło; (b) zostawić oba i dodać test równości — tańsze, ale dwa miejsca do zmiany. Rekomendacja: (a).
- Test akceptacyjny: grep `= 0.85|= 0.035|= 0.9;` w `apps/mobile/src` → 0 definicji; test kontroli z pkt „Powraca” zielony i czerwony na kopii z przywróconą stałą.
- Status: otwarte

### 08-programista-003 · Dziennik rozdania używa nazwy ulicy jako klucza React; SC-06 i SC-08 mają dwie decyzje preflop (ostrzeżenie o zdublowanym kluczu w CI)
- Pozycja listy kontrolnej: DEV-04
- Poziom: P2
- Realność: realny (ostrzeżenie w każdym przebiegu CI), skutek dla użytkownika teoretyczny (lista tylko rośnie, kolejność stała) · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/features/scenariusz/komponenty.tsx:92` (`key={w.ulica}`), wpisy budowane po jednym na decyzję z `ulica: t(...)` w `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:230`; szablony z dwiema decyzjami preflop: `content/pl/scenarios/sc-06.yaml:14` i `:23`, `content/pl/scenarios/sc-08.yaml:18` i `:29`. Dowód: dowody/dziennik-klucz.txt
- Log CI: w przechodzącym teście `cs-tresc-realna.test.tsx` React zgłasza 7 razy `audit/M1-2026-11-17/wspolne/ci-pelne.log:1990` („Encountered two children with the same key, `Preflop`”).
- Mechanizm: klucz z etykiety ulicy zamiast indeksu decyzji; `grep -n "key={w.ulica}"` → 1 trafienie; inne listy w scenariuszu mają klucze złożone (`komponenty.tsx` miejsca i stosy).
- Powraca: nie → trwała kontrola: test dziennika SC-08 z asercją braku `console.error` (np. `jest.spyOn(console, 'error')`).
- Wzorzec lub źródło: React: klucze rodzeństwa muszą być unikalne (komunikat Reacta w logu: „Non-unique keys may cause children to be duplicated and/or omitted”).
- Kroki w aplikacji: scenariusz SC-08 (M4, 3-bet z SB) albo SC-06: po pierwszej decyzji dziennik ma dwa wiersze „Preflop”. Dziś wiersze się nie gubią, bo lista tylko rośnie; przy zmianie kolejności albo usuwaniu wpisów React może pominąć lub zdublować wiersz.
- Opcje: (a) klucz z indeksu decyzji (`WpisDziennika` dostaje `indeks`) — jedna linia i test; (b) klucz `${ulica}-${i}` w mapowaniu — bez zmiany typu. Rekomendacja: (a).
- Test akceptacyjny: `cs-tresc-realna.test.tsx` bez ostrzeżenia o kluczu (grep logu CI `same key` = 0) i nowy test z pkt „Powraca”.
- Status: otwarte

### 08-programista-004 · Każdy komponent z `useTokens` osobno odpytuje „Zwiększ kontrast” i zaczyna od palety zwykłej (mignięcie palety, 77 nasłuchów)
- Pozycja listy kontrolnej: DEV-15
- Poziom: P2
- Realność: brzegowy (dotyczy osób z włączonym „Zwiększ kontrast”; czas mignięcia niezmierzony) · Pewność: wysoka co do mechanizmu, średnia co do widoczności
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/theme/tokens.ts:51-68`: hook `useZwiekszonyKontrast` z `useState(false)`, asynchronicznym `isDarkerSystemColorsEnabled()` w `useEffect` i własnym `addEventListener` — wołany przez `useTokens` (`apps/mobile/src/theme/tokens.ts:70-74`) w każdym komponencie; 77 wywołań `useTokens()` w 41 plikach, w tym 7 w `ui.tsx` (przyciski, tytuły), `RichText` (każdy akapit) i `PlayingCard` (każda karta). Pierwszy render każdego komponentu idzie w palecie zwykłej, zmiana przychodzi po efekcie (po namalowaniu). W CI 8 ostrzeżeń act() z `PlayingCard` pochodzi z tej aktualizacji stanu (dowody/tokeny-kontrast.txt).
- Mechanizm: stan systemowy trzymany per instancja zamiast raz na aplikację; `grep -rn "useTokens()" apps/mobile/src` → 77.
- Powraca: nie → trwała kontrola: test, że `isDarkerSystemColorsEnabled` jest wołane raz na start niezależnie od liczby komponentów.
- Wzorzec lub źródło: D-259 (paleta z „Zwiększ kontrast”); zasada programisty 11 (platforma cienka, stan w jednym miejscu).
- Kroki w aplikacji: iOS „Zwiększ kontrast” włączony → wejście na nowy ekran: przyciski, teksty i karty mogą przez chwilę mieć kolory palety zwykłej (kontrast niższy od zaprojektowanego), potem przełączają się na wariant „High”; przy każdym wejściu jest tyle wywołań mostu i nasłuchów, ile komponentów.
- Opcje: (a) jeden magazyn (zustand albo kontekst) z wartością odczytaną przy starcie przed ukryciem ekranu powitalnego i jednym nasłuchem — bez mignięcia, 1 nasłuch; (b) pamięć modułowa ostatniej wartości jako stan początkowy hooka — mniej zmian, mignięcie zostaje tylko na pierwszym ekranie. Rekomendacja: (a); zmiana wyglądu nie zachodzi (rola 04 bez nowej decyzji).
- Test akceptacyjny: test RNTL: atrapa `isDarkerSystemColorsEnabled` → `true`, pierwszy render nowego komponentu po starcie od razu z paletą `lightHigh`; licznik wywołań atrapy = 1 po wyrenderowaniu ekranu z wieloma przyciskami.
- Status: otwarte

### 08-programista-005 · Skrypt `lint` (`expo lint`) nie działa: brak ESLint i konfiguracji; 21 wyłączeń reguł, których nic nie sprawdza
- Pozycja listy kontrolnej: DEV-04
- Poziom: P2
- Realność: realny (brak kontroli), skutek pośredni · Pewność: wysoka
- Rodzaj: P (decyzja produktowa: narzędzie i bramka CI)
- Dowód: `apps/mobile/package.json:61` (`"lint": "expo lint"`); brak `eslint` w `node_modules/.bin`, brak pliku konfiguracji ESLint, brak kroku lint w `.github/workflows` (dowody/dev04-lint.txt). W kodzie 21 komentarzy `eslint-disable`, w tym 4× `react-hooks/exhaustive-deps` i 1× `react-hooks/refs` (np. `apps/mobile/src/app/session.tsx:200`, `apps/mobile/src/components/PaintGrid.tsx:59`). Brak lintu został przyjęty w planie roli 08 (`docs/programista/plan-08.md:14`), bez ID decyzji i bez nazwania ryzyka reguł hooków.
- Mechanizm: deklarowany skrypt bez narzędzia; reguły hooków (zależności efektów, odczyt refów w renderze) nie są sprawdzane mechanicznie (zasada 21: kontrolę wymusza hook albo test).
- Powraca: nie → trwała kontrola: krok `pnpm --filter @szkola/mobile lint` w `pnpm run ci` albo usunięty skrypt i komentarze.
- Wzorzec lub źródło: zasada wspólna 21; lista kontrolna DEV-04 („Testy, typecheck i lint przechodzą na czysto”).
- Kroki w aplikacji: brak bezpośrednich; ryzyko to nieaktualne domknięcia w efektach (`session.tsx`, `scenario.tsx`), których nikt nie sprawdza po zmianie.
- Opcje: (a) dodać `eslint` i `eslint-config-expo` (devDependencies, koszt 0 zł, kilka sekund CI) i krok w `ci` z tylko regułami `react-hooks` — mechaniczna kontrola hooków; (b) usunąć skrypt `lint` i komentarze `eslint-disable`, zapisać decyzję „bez lintu” z ID — mniej zależności, brak kontroli hooków. Rekomendacja: (a), ale to wybór właściciela (narzędzie, zależność, minuty CI).
- Test akceptacyjny: (a) `pnpm run ci` zawiera lint z kodem 0 i pada na celowo usuniętej zależności efektu; (b) `grep -rn "eslint-disable" apps/mobile/src` → 0 i brak skryptu `lint`.
- Status: otwarte

### 08-programista-006 · Rozmiary i krój tekstu wpisane na sztywno w 6 miejscach poza modułem motywu
- Pozycja listy kontrolnej: DEV-11
- Poziom: P2
- Realność: realny (poza systemem projektowym), skutek brzegowy (duży tekst) · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: `apps/mobile/src/app/session.tsx:660-661` (28 i 56 pt), `apps/mobile/src/app/advancement.tsx:98` (56 pt), `apps/mobile/src/features/advancement/AdvancementCard.tsx:61` (30 pt), `apps/mobile/src/components/PaintGrid.tsx:189-190` (8 pt), `apps/mobile/src/components/RangeGrid.tsx:63` (8 pt), `apps/mobile/src/components/Blocks.tsx:119` (`fontFamily: 'Menlo'`); grep: dowody/dev11-tokeny.txt
- Znane: `RangeGrid` 8 pt to A04-18 w `docs/design/audyt-5b-6.md:54` („razem z tokenami siatek”); pozostałe nie mają zapisu w `docs/design/`.
- Mechanizm: `grep -rnE "fontSize: ?[0-9]|fontFamily: ?'" apps/mobile/src` poza `theme/` → 8 linii w 6 plikach.
- Powraca: częściowo (A04-18) → trwała kontrola: rozszerzenie kontroli K-07 o `fontSize` i `fontFamily` z literałem poza `theme/`.
- Wzorzec lub źródło: zasada wspólna 15; zasada programisty 7.
- Kroki w aplikacji: wynik sesji („12/15”) i wskaźnik zaawansowania przy AX5 skalują 56 pt bez sufitu, który mają tytuły (D-122); na 320 pt liczba może wyjść poza ekran — niesprawdzone zrzutem (do roli 04).
- Opcje: (a) rola 04 dodaje tokeny „liczba wyniku” i „etykieta siatki” z sufitem, 08 podmienia — spójne z systemem; (b) zostawić i zapisać wyjątek z ID decyzji roli 04 — bez pracy, rozjazd zostaje. Rekomendacja: (a) przez rolę 04.
- Test akceptacyjny: grep z pkt „Mechanizm” → 0 linii (albo każda z ID wyjątku); zrzut 320 pt AX5 ekranu wyniku bez przepełnienia.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Ekran danych: tekst pliku po walidacji jest trzymany w domknięciu obiektu tworzonego w `useMemo` (`apps/mobile/src/app/data.tsx:35-51`, `apps/mobile/src/data/przeniesienie.ts:36`). Gdy między wyborem pliku a potwierdzeniem zmieni się `stan` (np. fokus ekranu), nowy obiekt nie ma tekstu i potwierdzenie kończy się komunikatem błędu zapisu bez zmiany danych. Nie potwierdziłem, że na iOS wybór pliku zmienia fokus; brakuje próby na urządzeniu.
- Wyłączenie przypomnienia: nieudane `anulujWszystkie` jest pomijane, a przełącznik pokazuje „wyłączone” (`apps/mobile/src/features/ustawienia/przypomnienie.ts:24`); stan naprawia się przy następnym starcie (`odtworzZBazy`). Brak danych, czy `cancelAllScheduledNotificationsAsync` w praktyce zawodzi.
- Uszkodzenie bazy wykryte dopiero w trakcie migracji (nie przy próbnym odczycie `sqlite_schema`) daje `migracja_nieudana`, nie `baza_uszkodzona` (`packages/postep/src/migracje.ts:70-72`), więc plik nie jest odkładany. Brakuje próby z bazą uszkodzoną na stronie innej niż 1.
- Wydajność synchronicznych odczytów bazy treści przy budowie egzaminu (`apps/mobile/src/data/content/repo.ts:125-134`, wszystkie zadania wcześniejszych modułów z `JSON.parse`) na iPhonie 8: brak pomiaru (OP-21).
- `apps/mobile/modules/ochrona-tla` (Swift): bez Xcode nie sprawdziłem, czy `wygasa` zawsze kończy zadanie w tle.

## Co działa dobrze i należy zachować
- Port bazy z jedną kolejką i transakcją bez ponownego kolejkowania (`packages/postep/src/port.ts:83-111`), sprawdzenie `PRAGMA foreign_keys` po otwarciu (`packages/postep/src/port.ts:40-44`) i test na adapterze `node:sqlite` z wyłączonymi kluczami.
- UPSERT wszędzie, gdzie są dzieci (karta → log, odpowiedź kroku, postęp lekcji z `COALESCE` daty ukończenia), z komentarzem o skutku `INSERT OR REPLACE`.
- Import: walidacja całości przed dotknięciem bazy, zamknięta lista kolumn i typów (`packages/postep/src/daneUzytkownika.ts:9-24`), jedna transakcja z `foreign_key_check`, kopia `VACUUM INTO` przed importem, zachowanie dzisiejszego zużycia limitu.
- Start bazy: uszkodzony plik odkładany pod wolną nazwą, nigdy nadpisywany; baza nowsza niż aplikacja odrzucana bez zmiany bajtów (test E4f).
- Błędy jako wartości z kodem i komunikatem w każdej ścieżce zapisu z interfejsu; „brak zostaje brakiem” w parserach wierszy.
- Dyscyplina testów: 10/10 commitów z testem, `it.fails` tylko z ID recenzji, wektory BRD w nazwach testów.

## Decyzje dla właściciela
- 08-programista-005 (narzędzie): (a) dodać ESLint z regułami hooków do `pnpm run ci` (koszt 0 zł, kilka sekund CI) albo (b) usunąć martwy skrypt i komentarze i zapisać „bez lintu”. Rekomendacja: (a).
- Kolejność napraw P2 (wszystkie bez blokady wydania, do backlogu z wersją): rekomendacja 001 → 002 → 003 → 004 w jednej sesji roli 08 przed kolejnym buildem TestFlight; 006 przez rolę 04.
- Kroki właściciela (nie sprawdzono w tym środowisku): na iPhonie z buildem 1011 — wejście po aktualizacji (migracja istniejącej bazy), scenariusze U-2 (import i przycisk Home) i U-3 (powrót na pierwszy plan po północy) z `docs/architektura/kontrole-07.md`.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003,08-programista-004`
(08-programista-005 po decyzji właściciela; 08-programista-006 przez rolę 04.)

Czas: praca agenta w tej sesji ok. 2 h; naprawa 001–004 ok. 1 sesja roli 08 (bez czekania na sieć); od właściciela: 1 decyzja (005) i kroki na telefonie z listy wyżej.

`git status --porcelain` na końcu, filtr na zmiany plików śledzonych (`git status --porcelain | grep -v '^??'`): pusty wynik, kod 1 (brak linii). Wpisy nieśledzone (wszystkie w audit/M1-2026-11-17/role/; pliki innych ról nie są moje i ich nie czytałem):

```
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/eksport-web.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/f-haptyka.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/f-liczby-ax5.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/f-linki-postep.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/f-pasek-granica.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/f-pogrubiony.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/f-postep-id.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/f-skala-dopuszczalna.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/sp03-kolory-kroje-grep.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/sp04-kontrast.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/sp07-skalowanie-grep.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/sp11-teksty-grep.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/sp21-ikona.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/dowody/zrzuty-web.txt
?? audit/M1-2026-11-17/role/04-studio-projektowe/narzedzia/
?? audit/M1-2026-11-17/role/04-studio-projektowe/zrzuty/
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch01-martwy-kod-gry.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch03-04-granice.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch05-liczby.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch07-replace.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch08-wydane-migracje.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch13-14-appstate.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch13-apple-odczyt.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch15-22-tlo-i-pliki.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch16-manifesty.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch16-siec.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch17-sql-szablony.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/arch21-sekrety.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/sonda-sqlite.mjs.txt
?? audit/M1-2026-11-17/role/05-architekt/dowody/sonda-sqlite.txt
?? audit/M1-2026-11-17/role/06-tresci-b/dowody/kontrole-mechaniczne.txt
?? audit/M1-2026-11-17/role/06-tresci-b/dowody/porownaj-siatki.py.txt
?? audit/M1-2026-11-17/role/06-tresci-b/dowody/rachunek-liczb.txt
?? audit/M1-2026-11-17/role/06-tresci-b/dowody/rachunek-niezalezny.py.txt
?? audit/M1-2026-11-17/role/06-tresci-b/dowody/siatki-obrona-bb.txt
?? audit/M1-2026-11-17/role/06-tresci-b/dowody/symulacja-dd-ror.txt
?? audit/M1-2026-11-17/role/06-tresci-b/dowody/zrodla-krytyczne.txt
?? audit/M1-2026-11-17/role/06-tresci-b/dowody/zrodla-strategia.txt
?? audit/M1-2026-11-17/role/08-programista/08-programista-2026-11-17.md
?? audit/M1-2026-11-17/role/08-programista/dowody/appstate-grep.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev01-brd-testy.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev01-funkcje-bez-testu.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev02-probka-commitow.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev03-grep-oslabione.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev04-lint.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev07-grep-domyslne.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev08-dev16-czas.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev09-grep-rzutowania.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev10-grep-catch.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev11-tokeny.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev13-konfiguracja.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dev14-sekrety.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/dziennik-klucz.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/testy-postep-pojedyncze.txt
?? audit/M1-2026-11-17/role/08-programista/dowody/tokeny-kontrast.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/mechanizm-start.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/runbook-cwiczenia.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/sdk-i-ota.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/sonda-przerwana.mts.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/sonda-przerwana.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/sonda-start.mts.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/sonda-start.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/sonda-tresc.mts.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/sonda-tresc.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/trening-analogia.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/wydanie-symbole.txt
?? audit/M1-2026-11-17/role/12-niezawodnosc/dowody/zrodla-platformy.txt
```
