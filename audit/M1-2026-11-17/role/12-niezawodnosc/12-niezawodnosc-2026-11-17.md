# Audyt: Niezawodność — Szkoła Pokera — 2026-11-17
Commit: f75acdff16915aeb43ff788888216e28616c11ed (kod aplikacji; gałąź `claude/sesja-ir-audyt-m1` @ 01cd5fcc różni się od f75acdff tylko plikami `audit/M1-2026-11-17/` i `docs/decyzje/IR.md`, sprawdzone `git diff --name-only`) · Tryb: audit (moduły: ratowanie-danych, widocznosc-awarii, pakiety-tresci) · Środowisko: Linux 6.18 x86_64, Node 22.23.4, pnpm, `node:sqlite`, `tsx` z repo; sieć przez proxy (developer.apple.com, sqlite.org, raw.githubusercontent.com: HTTP 200). Brak macOS, Xcode, symulatora i telefonu: nic na urządzeniu, w Organizerze ani w App Store Connect nie było uruchamiane. Instalacja i pełne CI z `audit/M1-2026-11-17/wspolne/` (nie powtarzane, zgodnie z poleceniem M1).

## Podsumowanie
Ścieżka danych przy zapisie i migracji jest solidna: migracje idą w transakcji, przerwana migracja (zabicie procesu z gorącym dziennikiem) i migracja z błędem zostawiają wszystkie wiersze, baza nowsza niż aplikacja nie jest ruszana, a uszkodzony plik jest odkładany, nie kasowany. Wszystko to odtworzyłem na kopiach w scratchpadzie. Najsłabsze jest to, co użytkownik widzi przy awarii. Trzy błędy danych przy starcie (migracja nieudana, baza nowsza, inny błąd otwarcia) dają ten sam ekran „Tego ekranu nie udało się wyświetlić. Spróbuj jeszcze raz.”: bez eksportu, bez informacji, że dane są całe, a ponowienie zawsze daje ten sam wynik. Uszkodzona baza kończy się cichym startem od zera, a odłożony plik nie ma żadnej drogi wyjścia z telefonu. Aplikacja nie ma strażnika pętli awarii ani trybu awaryjnego, choć Trening (analogia D-191) ma oba. Po premierze właściciel bez Maca nie ma sprawdzonego źródła sygnału o awariach. Brak runbooka i ćwiczeń to decyzje dla właściciela, nie znaleziska. KRYTYCZNYCH (P0): 0. Wszystkie 3 znaleziska P1 mają dopisek „bez blokady wg CLAUDE.md pkt 1”: żadne nie gubi ani nie psuje danych, a niedostępność danych bierze się z awarii, którą te ekrany mają łagodzić.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 12-niezawodnosc-001 | P1 (WYSOKIE), bez blokady wg CLAUDE.md pkt 1 | D | Błąd danych przy starcie daje ogólny ekran z samym ponowieniem: bez eksportu, bez „zaktualizuj aplikację”, z obietnicą, której ponowienie nie spełni | otwarte |
| 12-niezawodnosc-002 | P1 (WYSOKIE), bez blokady wg CLAUDE.md pkt 1 | D | Uszkodzona baza postępu: cichy start od zera, a odłożony plik z całym postępem nie ma drogi wyjścia z telefonu | otwarte |
| 12-niezawodnosc-003 | P1 (WYSOKIE), bez blokady wg CLAUDE.md pkt 1 | P | Brak strażnika pętli awarii i trybu awaryjnego z wysłaniem danych (Trening je ma) | otwarte |
| 12-niezawodnosc-004 | P2 (ŚREDNIE) | P | Po premierze brak sprawdzonej drogi, którą właściciel bez Maca dowie się o awarii; reguła pauzy D-304 nie ma kanału zgłoszeń | otwarte |
| 12-niezawodnosc-005 | P2 (ŚREDNIE) | D | „Usuń postęp” zostawia na telefonie kopie postępu: odłożoną bazę uszkodzoną i kopię sprzed nieudanego importu | otwarte |
| 12-niezawodnosc-006 | P2 (ŚREDNIE) | D | Uszkodzona kopia pliku treści na urządzeniu nie wraca do pliku z paczki; ekran błędu bez wyjścia poza reinstalacją | otwarte |

## Linia bazowa i założenia
**E0, stan projektu:** z polecenia M1 (etap: w budowie, TestFlight wewnętrzny, ostatni build 1011, poza właścicielem brak użytkowników i danych; rynek US; standard marki wysoki, bez SDK śledzących; iOS). Poziomy ustawione jak dla wydania; przed „w sklepie” skutki danych dotyczą tylko właściciela. Bramka opłacalności (zasada 20): wyjątek nazwany właściciela z 2026-11-17, ten audyt nie wydaje werdyktu bramki. Decyzje projektu przeczytane przed oceną: ADR 0002, 0003, 0005, 0008, 0009, 0013, `docs/architektura/tlo-i-bledy.md` §2 i §4, `docs/tresci/stany-bledow-fakty.md`, `docs/wydanie/plan-1.0.md` §10 (D-304), D-200, D-201, D-270 w `docs/decyzje.md`.

**E0b, tryby awarii od zera (przed lekturą runbooków; runbooka nie ma):**
| Tryb awarii | Zabezpieczenie w kodzie | Wynik |
|---|---|---|
| Utrata danych przy aktualizacji (migracja v1→v3) | migracje w `BEGIN IMMEDIATE` z `ROLLBACK`, test kopii schematu | ok: sonda A, 8 tabel bez zmian liczności (dowody/sonda-start.txt) |
| Migracja przerwana zabiciem procesu | tryb `DELETE`, gorący dziennik odtwarzany przy otwarciu | ok: sonda E, SIGKILL w środku migracji v2, potem start: v3, liczności bez zmian, `integrity_check` = ok (dowody/sonda-przerwana.txt) |
| Baza nowsza niż aplikacja (TestFlight pozwala zainstalować starszy build) | `baza_nowsza` bez zmiany pliku | dane ok (sonda B, sha bez zmian); ekran: 12-niezawodnosc-001 |
| Migracja z błędem | `ROLLBACK`, `migracja_nieudana` | dane ok (sonda C, sha bez zmian, 3 ponowienia = ten sam wynik); ekran: 12-niezawodnosc-001 |
| Uszkodzona baza (NOTADB/CORRUPT) | przemianowanie, nowa pusta baza (D-201) | plik zachowany (sonda D); użytkownik nic nie wie, pliku nie wyniesie: 12-niezawodnosc-002 |
| Pętla awarii przy starcie (JS poza granicą błędu, kod natywny) | brak | 12-niezawodnosc-003 |
| Uszkodzony albo niekompletny pakiet treści | kopia pod nazwą tymczasową + przemianowanie, manifest | instalacja ok; uszkodzenie po instalacji bez powrotu: 12-niezawodnosc-006 (sonda: dowody/sonda-tresc.txt) |
| Brak miejsca | `SQLITE_FULL` → `brak_miejsca` przy zapisie odpowiedzi (`apps/mobile/src/app/session.tsx:373`) | przy starcie (migracja, kopia treści) ten sam ogólny ekran: 12-niezawodnosc-001, 12-niezawodnosc-006 |
| Zawieszenie z blokadą pliku (`0xdead10cc`) | moduł `ochrona-tla` (ADR 0013), przerwanie na granicy instrukcji | odczyt kodu ok; gałąź „system nie dał czasu” (`AppState`) niezaimplementowana: „Do sprawdzenia” |
| Zła aktualizacja binarki | brak OTA; wydanie stopniowe i pauza (D-304) | proces jest; sygnał o awarii po premierze: 12-niezawodnosc-004 |
| Nieudany import | transakcja, kopia `VACUUM INTO` przed importem | dane ok (testy K-11, rola 05/07); kopia zostaje po błędzie: 12-niezawodnosc-005 |
| Utrata telefonu | kopia iCloud bazy w `Documents/SQLite` + eksport JSON (ADR 0008) | zgodne z decyzją; przywrócenie nieprzećwiczone (NIE-12) |

**Wymiary pokrycia:**
- Katalog trybów awarii: tabela wyżej.
- Migracja przerwana w połowie i baza nowsza: odtworzone (sondy E, B).
- Widoczność bez SDK: TestFlight w App Store Connect (zakładka Crashes, raporty 120 dni, przeglądarka także z Windowsa), Xcode Organizer (Mac), raport wysłany przez użytkownika pocztą, MetricKit (brak modułu), Android vitals nie dotyczy (bez wydania na Androida). Źródła w dowody/zrodla-platformy.txt ; wynik: 12-niezawodnosc-004.
- Ścieżki ratunku: eksport JSON w zwykłym przepływie (Ustawienia → Dane); tryb awaryjny, przywracanie pliku bazy i ćwiczenia: brak (12-niezawodnosc-003, „Decyzje dla właściciela”).
- Tor incydentu: `docs/wydanie/plan-1.0.md:252` (pauza wydania stopniowego, nowy build, przyspieszona recenzja; D-304); brak OTA, więc bez wycofania OTA; runbooka brak (decyzja).
- Progi: wstrzymanie wydania z decyzji D-304 (1 zgłoszenie utraty danych albo awarii przy starcie, 3 zgłoszenia tego samego błędu); próg pętli awarii: brak (brak strażnika; Trening ma 2); czas reakcji: brak decyzji (do runbooka).
- Zależności zewnętrzne: klucz API App Store Connect w sekretach (`.github/workflows/testflight.yml:9`), podpis automatyczny w chmurze, członkostwo Apple Developer (roczne; data odnowienia `[DO USTALENIA]`, do runbooka); minuty macOS w repo publicznym bez opłat (plan-1.0 §1).
- Pliki od użytkowników: dziś brak kanału, więc brak plików; miejsce poza repo i maskowanie: do runbooka.

**Soczewki (po kolei, bez subagentów):**
1. *Użytkownik z latami danych, któremu aplikacja nie startuje:* dane przeżywają każdą odtworzoną awarię, ale ekran nie mówi, że są całe, nie daje ich wysłać ani nie mówi, co zrobić (001); przy uszkodzeniu widzi powitanie jak przy pierwszym uruchomieniu (002).
2. *Właściciel w weekend bez Maca:* po premierze nie zobaczy awarii z App Store (Organizer wymaga Maca), a kanał pocztowy jest wyłączony do czasu adresu (D-270, 08-F23); dziennik lokalny nigdy nie opuszcza telefonu (004).
3. *Prowadzący incydent po wydaniu z błędem:* plan pauzy i nowego buildu jest (D-304), ale dla starszych buildów nie ma map źródeł JS ani zapisanego miejsca symboli (NIE-08, decyzja runbooka), a reguła pauzy liczy zgłoszenia, których nie ma którędy wysłać (004).
4. *Audytor post-mortem za rok:* kody błędów startu trafiają do tabeli `dziennik` w bazie, która przy `baza_uszkodzona` jest nowa i pusta (wpis o uszkodzeniu ląduje w nowej bazie, nie w odłożonej); numer buildu → commit tylko przez historię GitHub Actions (`.github/workflows/testflight.yml:122`).

**Wzorzec najlepszych:** Apple: „TestFlight users of your app automatically share crash reports with you, regardless of the device settings…”, a dla klientów App Store: „ask the customer to e-mail you the crash report from their device” (developer.apple.com/documentation/xcode/acquiring-crash-reports-and-diagnostic-logs, odczyt 2026-11-17; surowy tekst: dowody/zrodla-platformy.txt ). SQLite: przeniesienie gorącego dziennika psuje bazę („If the hot journal files are moved, deleted, or renamed after a crash or power failure, then automatic recovery will not work”, sqlite.org/howtocorrupt.html, odczyt 2026-11-17). Najbliższy wzorzec praktyczny to Trening tego samego właściciela (D-191): strażnik pętli awarii z progiem 2, ekran błędu startu „Dane w telefonie nie zostały zmienione — możesz je wysłać jako plik.” z przyciskiem „Wyślij dane”, osobny ekran „Dane z nowszej wersji aplikacji — zaktualizuj aplikację” i granica błędu całego drzewa z wysłaniem danych (dowody/trening-analogia.txt, HEAD 2d975814, odczyt 2026-11-17). Odstępstwo Szkoły od tego wzoru nie jest nigdzie nazwane. Uwaga do wzorca: Trening zeruje licznik timerem `BOOT_STABLE_MS` (1500 ms). Wzorce roli każą zamiast timera użyć kamienia milowego (baza otwarta, migracje, pierwszy ekran), więc analogię biorę bez timera.

**Rejestr założeń:** `docs/zalozenia.md` nie ma założeń o niezawodności (grep „awari|kopi|uszkodz” trafia tylko ZAL-006 o synchronizacji); zmian statusu nie proponuję.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| Start bazy postępu: `packages/postep/src/start.ts`, `port.ts`, `migracje.ts`, `bledy.ts`, `apps/mobile/src/data/postepExpo.ts` | tak | odczyt całości + sondy A–E na `node:sqlite`, pliki w scratchpadzie: dowody/sonda-start.txt, dowody/sonda-przerwana.txt |
| Ścieżka startu w interfejsie: `apps/mobile/src/app/_layout.tsx`, `RenderErrorScreen.tsx`, `GranicaBledu.tsx`, `PierwszeUruchomienie.tsx` (stan powitania) | tak (odczyt kodu) | dowody/mechanizm-start.txt; ekranu na urządzeniu nie oglądałem |
| Eksport, import, kopia `VACUUM INTO`, „Usuń postęp”: `apps/mobile/src/data/przeniesienie.ts`, `platform/pliki.ts`, `packages/postep/src/daneUzytkownika.ts` | tak (odczyt; poprawność eksportu i importu to ARCH-10/11, rola 05) | dowody/mechanizm-start.txt |
| Pakiet treści: `packages/domena/src/tresc.ts`, `apps/mobile/src/data/tresc/*.ts(x)` | tak | sonda z uszkodzoną kopią na urządzeniu: dowody/sonda-tresc.txt |
| Dziennik lokalny: `apps/mobile/src/platform/dziennik.ts`, `packages/postep/src/dziennik.ts`, tabela eksportu `packages/domena/src/eksport.ts` | tak | odczyt; dziennik poza eksportem i bez wysyłki |
| Ochrona tła: `apps/mobile/modules/ochrona-tla/ios/OchronaTlaModule.swift`, `platform/ochronaTla.ts` | tak (odczyt) | na urządzeniu nie (U-2 to krok właściciela) |
| Zależności SDK i OTA: `apps/mobile/package.json`, `pnpm-lock.yaml`, `app.json` | tak | dowody/sdk-i-ota.txt |
| Wydanie: `testflight.yml`, `asc-*.yml`, `iphone-*.yml`, `eas.json` | tak | dowody/wydanie-symbole.txt |
| Runbook, ćwiczenia, `docs/niezawodnosc/` | tak (brak) | dowody/runbook-cwiczenia.txt |
| Analogia Trening (D-191) | tak (3 pliki) | dowody/trening-analogia.txt |
| Zachowanie na iPhonie (ekrany błędu, pętla awarii, `0xdead10cc`, raport w TestFlight) | nie | brak telefonu i Maca; kroki właściciela w „Decyzjach” |
| Czy raporty TestFlight zawierają komunikat i stos JS; czy eksport archiwum wysyła symbole (`uploadSymbols`) | nie | wymaga ćwiczenia na buildzie i macOS (`xcodebuild -help`) |
| Rejestr zaległości 04 na Dysku (czy stany z 001/002 są tam z wersją) | nie | Dysk poza zakresem polecenia; `[DO USTALENIA]` |

## Kontrola dowodów i sekretów
`node /home/user/Szkola_pokera/audit/M1-2026-11-17/narzedzia/sprawdz-raport.mjs <ten raport> /home/user/Szkola_pokera /home/user/Szkola_pokera/audit/M1-2026-11-17/role/12-niezawodnosc --rola 12-niezawodnosc` → WYNIK_KONTROLI. Sekrety: 0 trafień wzorców. Dowody zawierają tylko dane syntetyczne ze wzorca bazy (`tests/narzedzia/wzorzec-bazy.ts`), bez danych osobowych; ścieżki scratchpadu skrócone do `<scratchpad>`. Treść z zewnątrz (strony Apple i SQLite, pliki Treningu, pliki repo) czytana jako dane; poleceń skierowanych do agenta w niej nie zauważyłem.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| NIE-01 kopia ratunkowa | dotyczy (dane użytkownika w `postep.db`, tryb `DELETE`, ADR 0003 pkt 2) | Kopii ratunkowej z trybu awaryjnego nie ma, bo nie ma trybu (003). Uszkodzony plik jest odkładany w całości, co potwierdza sonda D: po przywróceniu nagłówka 8 tabel z tymi samymi licznościami, `integrity_check` = ok. Nie ma jednak drogi wyjścia z telefonu: 12-niezawodnosc-002. Kopie zostają po „Usuń postęp”: 12-niezawodnosc-005 |
| NIE-02 naprawa nie niszczy | dotyczy | ok: 0 trafień `VACUUM` bez `INTO`, `REINDEX`, `deleteDatabase`, `.recover` w kodzie aplikacji (dowody/mechanizm-start.txt); uszkodzona baza przemianowana, nie usunięta (`packages/postep/src/start.ts:63`); brak tekstów obiecujących naprawę |
| NIE-03 przywrócenie z kopii pliku bazy | nie dotyczy jako znalezisko: funkcji przywracania pliku bazy nie ma (przeniesienie danych to import JSON, ADR 0008, ARCH-11) | decyzja dla właściciela (D4 w „Decyzjach”) |
| NIE-04 strażnik pętli awarii | dotyczy (dane użytkownika na urządzeniu) | 12-niezawodnosc-003 (brak; wektorów nie było na czym uruchomić) |
| NIE-05 tryb awaryjny | dotyczy | brak trybu; ocena razem z 12-niezawodnosc-003. Ekrany błędu startu nie kasują danych (ok dla progu P0) |
| NIE-06 źródło sygnału | dotyczy | ADR 0009 wybiera opcję bez SDK; runbooka i ćwiczenia brak (decyzja D3); droga po premierze: 12-niezawodnosc-004 |
| NIE-07 SDK awarii | dotyczy (sprawdzenie braku) | ok: 0 SDK awarii, diagnostyki i analityki w zależnościach (`expo-updates-interface` to tylko interfejs z `expo-dev-client`), `NSPrivacyCollectedDataTypes` pusty (`apps/mobile/app.json:17`); dowody/sdk-i-ota.txt |
| NIE-08 czytelny raport | dotyczy | nie sprawdzono w pełni: numer buildu = 1000 + numer przebiegu (`.github/workflows/testflight.yml:122`), więc commit odczytasz z historii Actions. Archiwum `.xcarchive` i mapy źródeł Hermesa nie są przechowywane (artefakt tylko przy porażce, 1 dzień: `.github/workflows/testflight.yml:199`). Wysyłka symboli do Apple `[DO USTALENIA]`. Przed pierwszym wydaniem to krok runbooka, nie znalezisko |
| NIE-09 dziennik diagnostyczny | dotyczy | ok: wpis = czas, kod, ekran, wersja (`packages/postep/src/dziennik.ts:7`), pierścień 200 wpisów (`packages/domena/src/konfiguracja.ts:24`), poza eksportem (`packages/domena/src/eksport.ts:5`), bez żadnej wysyłki |
| NIE-10 OTA | nie dotyczy: brak `expo-updates` (dowody/sdk-i-ota.txt) | — |
| NIE-11 tor poprawek | dotyczy | ok: wszystkie workflowy wydania i ASC tylko `workflow_dispatch`, 0 trafień `submit`/`reviewSubmission`/`eas update`/`phasedRelease` (dowody/wydanie-symbole.txt); TestFlight wewnętrzny bez recenzji; runbook incydentu: brak (decyzja D3; proces jest w `docs/wydanie/plan-1.0.md:252`) |
| NIE-12 ćwiczenia | dotyczy (eksport i import, kopia iCloud) | nie sprawdzono, z warunkiem wysyłki 1.0: przywrócenie z eksportu na czystej instalacji z licznościami i wymuszona awaria na buildzie TestFlight nie mają zapisu (PU-014 w protokole 1011 bez wyniku); aktualizacja z poprzedniej wersji to JAK-16 |
| NIE-13 pakiety treści | dotyczy częściowo: treść w paczce aplikacji, wersja w nazwie pliku (ADR 0005), bez pobierania od dostawcy (wycofanie u dostawcy nie dotyczy) | instalacja atomowa i manifest ok (ARCH-20); uszkodzenie kopii po instalacji bez powrotu do pliku z paczki: 12-niezawodnosc-006 |
| NIE-14 nieudana migracja | dotyczy | dane ok (sonda C: wersja 1, liczności i sha bez zmian); żadna migracja nie ma `przebudowa: true`, a strażnik `packages/postep/test/kontrakt-05-postep.test.ts:9` pilnuje kopii przed pierwszą; ekran błędu bez eksportu i z ponowieniem: 12-niezawodnosc-001 |

## Znaleziska (szczegóły)

### 12-niezawodnosc-001 · Błąd danych przy starcie daje ogólny ekran z samym ponowieniem: bez eksportu, bez „zaktualizuj aplikację”, z obietnicą, której ponowienie nie spełni
- Pozycja listy kontrolnej: NIE-14
- Poziom: P1 (WYSOKIE), bez blokady wg CLAUDE.md pkt 1 (dane nie giną ani się nie psują: sondy B i C; ekran nie jest przyczyną niedostępności, tylko jej nie łagodzi)
- Realność: brzegowy (baza nowsza: realna u właściciela po instalacji starszego buildu z TestFlight; migracja nieudana i błąd otwarcia: brzegowe, np. brak miejsca przy migracji)   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: każdy błąd startu postępu daje `{ stan: 'blad' }` (`_layout.tsx`, wiersz 76), a `apps/mobile/src/app/_layout.tsx:152` „if (postep.stan === 'blad') return <RenderErrorScreen onRetry={postep.ponow} />”. Ekran ma tylko tytuł, treść i ponowienie: `apps/mobile/src/components/RenderErrorScreen.tsx:19` „<Button label={t('errors.render.retry')} onPress={onRetry} />”. Tekst: `apps/mobile/src/i18n/locales/pl.json:570` „Tego ekranu nie udało się wyświetlić. Spróbuj jeszcze raz.”. Sonda B (`user_version` = 4) i sonda C (migracja v2 z błędem): 3 ponowienia z rzędu dają `BladStartuPostepu(baza_nowsza)` i `BladStartuPostepu(migracja_nieudana)`, sha pliku i liczności 8 tabel bez zmian (dowody/sonda-start.txt, kod 0)
- Mechanizm: wszystkie powody startu (`baza_nowsza`, `migracja_nieudana`, `przerwano_w_tle`, `baza_uszkodzona` bez przemianowania, `zapis_nieudany` dla IOERR i FULL) zlewają się w jeden stan `blad` i ekran błędu renderowania. Ten sam ekran dostaje błąd treści (`_layout.tsx`, wiersz 151). `grep -rn "RenderErrorScreen" apps/mobile/src` → 3 użycia, wszystkie w `_layout.tsx` (dowody/mechanizm-start.txt). Specyfikacja przewiduje osobne stany w `docs/architektura/tlo-i-bledy.md`, wiersze 66–67: dla `baza_nowsza` ekran "Zaktualizuj aplikację", dla `migracja_nieudana` ekran z "Zgłoś błąd"; oba mają w kolumnie projektu "brak".
- Powraca: nie (pierwszy audyt roli 12); trwała kontrola w teście akceptacyjnym
- Wzorzec lub źródło: rola 06 zabrania obecnego tekstu dla migracji: `docs/tresci/stany-bledow-fakty.md:18` „„spróbuj ponownie” bez zmiany wersji (ten sam błąd wróci)”. Trening (D-191; dowody/trening-analogia.txt): osobny ekran danych nowszych z „Wyślij dane” i ekran błędu startu z „Dane w telefonie nie zostały zmienione — możesz je wysłać jako plik.”; zasada roli 1 (dane użytkownika przed dostępnością)
- Kroki w aplikacji: właściciel instaluje z TestFlight build starszy niż ostatnio otwarty (np. 1010 po 1011) → start → „Coś poszło nie tak / Tego ekranu nie udało się wyświetlić” → „Spróbuj ponownie” → to samo bez końca; danych nie da się wysłać, a ekran nie mówi, że wystarczy zainstalować nowszy build
- Opcje: (A) osobne stany startu według `stany-bledow-fakty.md` (nowsza: „Zaktualizuj aplikację”; migracja i błąd otwarcia: dane całe, „Zgłoś błąd”, gdy będzie adres), na każdym „Wyślij dane”: kopia `VACUUM INTO` otwartej bazy (dla `baza_nowsza` i `migracja_nieudana` połączenie jest otwarte przed `migruj`) albo plik `postep.db` przy zamkniętym połączeniu (tryb `DELETE`, brak gorącego dziennika) do arkusza udostępniania. Kompromis: nowy ekran i teksty (role 04, 06) oraz kod startu w ścieżce wrażliwej (D-043). (B) tylko właściwe teksty i „Zaktualizuj aplikację” bez wysyłania danych. Kompromis: tańsze, ale użytkownik dalej nie wyniesie danych do czasu poprawki. Rekomendacja: A (jak w Treningu); wspólnie z 002 i 003 to jeden ekran awaryjny
- Test akceptacyjny: test ekranu startu dla każdego powodu (`baza_nowsza`, `migracja_nieudana`, `zapis_nieudany`) pokazuje właściwy tekst i akcję „Wyślij dane”; test w Node: plik udostępniony z ekranu błędu otwiera się i ma te same liczności 8 tabel co `postep.db`; `postep.db` po akcji bajt w bajt bez zmian
- Status: otwarte

### 12-niezawodnosc-002 · Uszkodzona baza postępu: cichy start od zera, a odłożony plik z całym postępem nie ma drogi wyjścia z telefonu
- Pozycja listy kontrolnej: NIE-01
- Poziom: P1 (WYSOKIE), bez blokady wg CLAUDE.md pkt 1 (plik nie jest kasowany ani zmieniany; brak informacji i drogi wyniesienia)
- Realność: teoretyczny (tryb `DELETE` wycofuje przerwane transakcje; uszkodzenie wymaga awarii nośnika albo błędu systemu, `docs/architektura/tlo-i-bledy.md:73`)   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: wynik startu niesie ścieżkę odłożonego pliku (`packages/postep/src/start.ts`, wiersz 67), ale interfejs bierze tylko port: `apps/mobile/src/app/_layout.tsx:79` „otwarty = w.wartosc.port;”. Jedyny ślad zostaje w dzienniku: `apps/mobile/src/data/postepExpo.ts:125` „if (w.uszkodzona !== null) zapiszBlad('baza_uszkodzona');”. Sonda D: po nadpisaniu nagłówka start zwraca `uszkodzona: …/postep-uszkodzona-1800000000000.db`, a nowa `postep.db` ma 0 wierszy w 8 tabelach. Odłożony plik ma ten sam sha co uszkodzony; po przywróceniu nagłówka (u dewelopera) ma 5/3/7/5/2/4/4/1 wierszy jak przed uszkodzeniem, `integrity_check` = ok. Drugi start: `uszkodzona: null`, plik dalej leży (dowody/sonda-start.txt, kod 0). `apps/mobile/app.json` nie ma `UIFileSharingEnabled` (dowody/mechanizm-start.txt), więc plik nie jest widoczny w aplikacji Pliki
- Mechanizm: ścieżka `uszkodzona` z `uruchomPostep` nie jest nigdzie czytana; `grep -rn "uszkodzona" apps/mobile/src` → 0 użyć poza dziennikiem i komentarzem (dowody/mechanizm-start.txt). Pusta baza daje stan pierwszego uruchomienia (powitanie, `PierwszeUruchomienie.tsx`). Wpis dziennika `baza_uszkodzona` trafia do nowej bazy, a dziennik nigdy nie opuszcza telefonu (ADR 0009)
- Powraca: nie; trwała kontrola w teście akceptacyjnym
- Wzorzec lub źródło: `docs/tresci/stany-bledow-fakty.md:19` (co jest prawdą dla użytkownika: plik odłożony, nowy postęp, import ostatniego eksportu, zgłoszenie błędu); moduł ratowanie-danych (komplet plików przy zamkniętym połączeniu, `.recover` tylko u dewelopera); Trening `exportStartDataDetailed` (kopia ratunkowa plików bazy, gdy bazy nie da się otworzyć; dowody/trening-analogia.txt)
- Kroki w aplikacji: plik `postep.db` uszkodzony (nośnik, błąd systemu) → start → powitanie i ocena poziomu jak przy pierwszym uruchomieniu; żadnej informacji, że postęp jest odłożony i że można zaimportować ostatni eksport
- Opcje: (A) stan „baza uszkodzona” po starcie: komunikat według `stany-bledow-fakty.md`, „Zaimportuj ostatni eksport” (istniejący przepływ Dane) i „Wyślij uszkodzony plik” (arkusz udostępniania z odłożonym plikiem; połączenie z nim jest już zamknięte); komunikat do czasu decyzji użytkownika. Kompromis: nowy stan (04, 06). (B) sam komunikat z odesłaniem do importu, bez wysyłania pliku. Kompromis: przy braku eksportu danych nie da się odzyskać nawet u dewelopera. Rekomendacja: A, w tym samym ekranie co 001
- Test akceptacyjny: test startu z uszkodzonym `postep.db` → ekran stanu `baza_uszkodzona` z akcją importu i wysyłania; plik udostępniony = odłożony plik bajt w bajt; bez zgody użytkownika nic nie jest usuwane
- Status: otwarte

### 12-niezawodnosc-003 · Brak strażnika pętli awarii i trybu awaryjnego z wysłaniem danych (Trening je ma)
- Pozycja listy kontrolnej: NIE-04
- Poziom: P1 (WYSOKIE), bez blokady wg CLAUDE.md pkt 1 (brak zabezpieczenia, nie istniejąca awaria; dane w bazie zostają, a kopia iCloud i poprawiony build przywracają dostęp)
- Realność: brzegowy (granica błędu łapie błędy renderowania pod nią; błąd w samym `RootLayout`, w obsłudze zdarzenia przy starcie albo w kodzie natywnym zamyka aplikację przy każdym starcie)   · Pewność: wysoka
- Rodzaj: P (decyzja produktowa: brak)
- Dowód: `grep -rnE "nieudan[a-z]*_?start|PROG_NIEUDANYCH|trybAwaryjny|tryb_awaryjny|kamienMilowy|kamien_milowy|setGlobalHandler" apps/mobile/src packages` → 0 trafień, kod 1 (dowody/mechanizm-start.txt). Granica błędu obejmuje tylko drzewo pod `ThemeProvider` (`apps/mobile/src/app/_layout.tsx:161`); `apps/mobile/src/components/GranicaBledu.tsx:12` sama zaznacza, że nie łapie błędów w obsłudze zdarzeń i kodzie asynchronicznym. Trening ma strażnika z progiem 2 i ekranem z wysłaniem danych (dowody/trening-analogia.txt, `lib/state/crashguard.ts` wiersze 1–31)
- Mechanizm: start nie zapisuje znacznika przed otwarciem bazy i nie ma kamienia milowego; nie ma ścieżki startu, która omija migracje, treść i główny stan. Jedyną drogą wyniesienia danych jest ekran Dane w działającej aplikacji
- Powraca: nie; trwała kontrola: test logiki strażnika na wektorach z wzorców roli
- Wzorzec lub źródło: wzorce roli „Strażnik pętli awarii przy starcie” (kamień milowy zamiast timera, zapis stanu w małym pliku poza SQLite); Trening D-191 (odstępstwo nienazwane)
- Kroki w aplikacji: build z deterministycznym błędem przy starcie (np. wyjątek w kodzie nad granicą błędu) → aplikacja zamyka się przy każdym otwarciu → użytkownik nie wyeksportuje danych do czasu nowego buildu
- Opcje: (a) tryb `build` roli 12 od E1: strażnik (plik w `Paths.document` przez `File.writeSync`, kamień = baza otwarta + migracje + pierwszy ekran, próg 2 jak w Treningu) i ekran awaryjny bez migracji i bez głównego stanu, z „Wyślij dane” (jak w 001), „Spróbuj normalnie” i kontaktem. Kompromis: ok. 1 sesja kodu z testami, ścieżka wrażliwa D-043, kod startu do przeglądu. (b) tylko ekrany z 001 i 002, bez strażnika. Kompromis: obsługuje błędy danych, ale nie awarię kodu przy starcie. (c) bez zmian, z ryzykiem nazwanym w raporcie. Rekomendacja: (b) przed 1.0 (pokrywa realne błędy danych przy starcie, mniejszy zakres przy zamrożeniu), (a) w 1.1 albo przed pierwszą aktualizacją z migracją; decyzja właściciela (D1)
- Test akceptacyjny: test logiki strażnika na wektorach wzorców (pierwszy start, po udanym, jeden bez kamienia, drugi z rzędu → awaryjny, „spróbuj normalnie” bez kamienia → awaryjny, z kamieniem → 0, start awaryjny nie zeruje, zapis `'{"x":1}'`/`'nie-json'`/`null` → stan początkowy); test ekranu awaryjnego: brak importu modułów migracji i treści
- Status: otwarte

### 12-niezawodnosc-004 · Po premierze brak sprawdzonej drogi, którą właściciel bez Maca dowie się o awarii; reguła pauzy D-304 nie ma kanału zgłoszeń
- Pozycja listy kontrolnej: NIE-06
- Poziom: P2 (ŚREDNIE); po premierze bez zmian byłoby to P1 (próg NIE-06)
- Realność: realny (premiera planowana ok. 2026-11-27, plan-1.0)   · Pewność: wysoka
- Rodzaj: P (decyzja produktowa)
- Dowód: `apps/mobile/src/platform/adresy.ts:18` „export const ADRES_KONTAKTOWY: string | null = null;”, przez co „Opinie” i „Zgłoś błąd” są ukryte (D-270). Reguła pauzy liczy zgłoszenia: `docs/wydanie/plan-1.0.md:252` „Pauza po pierwszym zgłoszeniu utraty danych albo awarii przy starcie”. Dziennik lokalny nie opuszcza telefonu (ADR 0009 pkt 2; w kodzie brak odczytu dziennika poza testami). Runbooka i zapisu ćwiczenia brak (dowody/runbook-cwiczenia.txt). Apple: raporty z App Store pokazuje Crashes organizer w Xcode, a TestFlight dla testerów: zakładka Crashes w App Store Connect, raporty 120 dni (dowody/zrodla-platformy.txt)
- Mechanizm: po premierze źródła bez SDK to Organizer (wymaga Maca), raport wysłany przez użytkownika pocztą (brak adresu) i opinie w sklepie. MetricKit nie ma modułu. Adres kontaktowy jest w planie 1.0 (08-F23, K-09, W-05 w `docs/wydanie/plan-1.0.md`), ale bez instrukcji wysłania raportu z urządzenia i bez ćwiczenia
- Powraca: nie
- Wzorzec lub źródło: Apple, acquiring-crash-reports-and-diagnostic-logs: „ask the customer to e-mail you the crash report from their device” (odczyt 2026-11-17); zasada roli 2 (najpierw źródła bez SDK)
- Kroki w aplikacji: użytkownik App Store ma awarię przy starcie → nie ma jak napisać z aplikacji, raport trafia tylko do Organizera → właściciel bez Maca dowiaduje się z recenzji
- Opcje: (a) adres z 08-F23 + w runbooku i na stronie pomocy instrukcja wysłania raportu awarii z urządzenia (Ustawienia → Prywatność → Analityka) + ćwiczenie: celowa awaria na buildzie TestFlight, sprawdzenie zakładki Crashes w przeglądarce. Kompromis: zależy od chęci użytkownika, 0 USD, bez SDK. (b) dostęp do Maca (Organizer) raz w tygodniu po premierze. Kompromis: koszt albo pożyczony sprzęt; pełny obraz awarii. (c) moduł MetricKit z eksportem przez użytkownika. Kompromis: kod natywny i ADR; dane wychodzą tylko z inicjatywy użytkownika. (d) SDK (Sentry, Crashlytics). Kompromis: łamie NFR-PRYW-001 i ADR 0009; wymaga zmiany NFR przez właściciela. Rekomendacja: (a) przed 1.0, (b) jako uzupełnienie, gdy będą użytkownicy; decyzja właściciela (D2)
- Test akceptacyjny: zapis ćwiczenia w runbooku: build TestFlight, data, celowa awaria, raport widoczny w App Store Connect w przeglądarce; adres kontaktowy ustawiony i „Zgłoś błąd” widoczny (test ekranu ustawień)
- Status: otwarte

### 12-niezawodnosc-005 · „Usuń postęp” zostawia na telefonie kopie postępu: odłożoną bazę uszkodzoną i kopię sprzed nieudanego importu
- Pozycja listy kontrolnej: NIE-01
- Poziom: P2 (ŚREDNIE)
- Realność: brzegowy (kopia sprzed importu zostaje po każdym nieudanym imporcie; baza uszkodzona: teoretyczny)   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: usuwanie plików obejmuje tylko stare bazy: `packages/postep/src/start.ts:27` „const STARE_BAZY = ['user.db-wal', 'user.db-shm', 'user.db'] as const;”, wołane z `postepExpo.ts` (wiersz 156). Po błędzie importu kopia `VACUUM INTO` zostaje w katalogu tymczasowym: `apps/mobile/src/data/przeniesienie.ts:95` „kopia zostaje w katalogu tymczasowym”. Nazwa: `apps/mobile/src/platform/pliki.ts:15`. Sonda D: odłożony `postep-uszkodzona-*.db` leży dalej po kolejnym starcie (dowody/sonda-start.txt)
- Mechanizm: „Usuń postęp” czyści tabele w `postep.db` i `user.db*`; `grep -rn "postep-uszkodzona\|postep-przed-importem" packages/postep/src apps/mobile/src` → tylko miejsca tworzenia, 0 usunięć poza `zapiszImport` (dowody/mechanizm-start.txt)
- Powraca: nie
- Wzorzec lub źródło: BR-DANE-003 („Usuń postęp”); zasada wspólna 10. Wspólne z ARCH-10 (kopia w zwykłym przepływie, rola 05)
- Kroki w aplikacji: import się nie udaje (np. przerwanie w tle) → użytkownik wybiera „Usuń postęp” → pełna kopia poprzedniego postępu zostaje w `Caches` do czasu sprzątania systemu albo następnego importu
- Opcje: (A) „Usuń postęp” usuwa także `postep-przed-importem.db` i odłożone `postep-uszkodzona-*.db` (te ostatnie po ostrzeżeniu w stanie z 002). Kompromis: kasuje ostatnią deską ratunku uszkodzonego postępu, ale robi to na wyraźne polecenie użytkownika. (B) kopia sprzed importu usuwana także po nieudanym imporcie (transakcja i tak chroni dane), odłożone pliki tylko po decyzji w 002. Rekomendacja: B + usunięcie obu przy „Usuń postęp”
- Test akceptacyjny: test w Node: po nieudanym imporcie i po „Usuń postęp” w katalogach baz i tymczasowym nie ma plików z danymi postępu poza pustą `postep.db`
- Status: otwarte

### 12-niezawodnosc-006 · Uszkodzona kopia pliku treści na urządzeniu nie wraca do pliku z paczki; ekran błędu bez wyjścia poza reinstalacją
- Pozycja listy kontrolnej: NIE-13
- Poziom: P2 (ŚREDNIE); skutek byłby P0 (główny przepływ bez treści), ale realność teoretyczna, a dane użytkownika zostają
- Realność: teoretyczny (plik w `Documents` zapisany kopią i przemianowaniem; uszkodzenie wymaga awarii nośnika albo systemu)   · Pewność: wysoka
- Rodzaj: D (defekt)
- Dowód: plan kopiuje tylko, gdy pliku nie ma: `packages/domena/src/tresc.ts:39` „kopiuj: !wej.naUrzadzeniu.includes(plik),”. Sonda: po uszkodzeniu nagłówka kopii na urządzeniu (plik w paczce zdrowy) 3 kolejne starty dają `tresc_niedostepna`, wywołania `lista,lista,otworz` bez `kopiuj` (dowody/sonda-tresc.txt, kod 0). Ekran: ten sam ogólny ekran z ponowieniem (`apps/mobile/src/app/_layout.tsx:151`)
- Mechanizm: `przygotujTresc` nie ma powrotu do pliku z paczki po nieudanym otwarciu albo manifeście; ponowienie powtarza ten sam plan. Ten sam brak przy braku miejsca na kopię nowej wersji: plik poprzedniej wersji leży na urządzeniu, ale plan go nie używa
- Powraca: nie
- Wzorzec lub źródło: moduł pakiety-tresci, „Wzorzec powrotu” pkt 2–3 (bez poprzedniego pakietu wróć do pakietu z paczki; brak pliku daje ponowne pobranie albo poprzedni pakiet); `docs/tresci/stany-bledow-fakty.md:24` (reinstalacja kasuje dane, nie proponować)
- Kroki w aplikacji: kopia `tresc-<wersja>-<język>.db` uszkodzona → start → „Tego ekranu nie udało się wyświetlić” → ponowienie bez skutku; reinstalacja bez eksportu kasuje postęp
- Opcje: (A) przy `tresc_niedostepna` z istniejącym plikiem odłożyć go (przemianować) i skopiować ponownie z paczki, raz na start. Kompromis: kilka linii w domenie i test. (B) bez zmian, ryzyko nazwane. Rekomendacja: A
- Test akceptacyjny: test `przygotujTresc` (adapter `tests/narzedzia/tresc-node.ts`): uszkodzona kopia na urządzeniu + zdrowy plik w paczce → wynik `ok` z ponowną kopią; pliki inne niż `tresc-*` nietknięte
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- **ADR 0013 pkt 4 (gałąź „system nie dał czasu”):** `grep -rn "AppState" apps/mobile/src` daje tylko komentarz w `apps/mobile/src/platform/ochronaTla.ts:8`. Gdy `rozpocznij` zwróci −1, nic nie ustawia flagi przerwania przy przejściu do tła. Możliwy skutek: zabicie `0xdead10cc` w środku importu; dane przetrwają, bo transakcja zostanie wycofana. Brakuje odczytu na urządzeniu, jak często −1 występuje. Właściwa rola: 05/08 (ARCH, ADR 0013).
- **Rejestr 04 na Dysku:** czy stany startu z 001 i 002 są tam z przypisaną wersją. Gdyby były, 001 i 002 przechodzą do backlogu bez zmiany oceny.
- **NIE-08:** czy eksport archiwum (`method` app-store-connect, `.github/workflows/testflight.yml:179`) wysyła symbole do Apple i czy raport awarii JS z TestFlight ma komunikat i stos. Brakuje macOS (`xcodebuild -help`) i ćwiczenia na buildzie.
- **Liczba awarii w App Analytics (App Store Connect w przeglądarce):** strony pomocy Apple renderowane skryptem nie dały się przeczytać surowo; jeśli metryka istnieje, jest to dodatkowe źródło bez Maca dla 004.
- **Data odnowienia członkostwa Apple Developer:** wygaśnięcie zdejmuje aplikację ze sklepu; daty nie ma w repo.

## Co działa dobrze i należy zachować
- Migracje w `BEGIN IMMEDIATE` z `ROLLBACK`, wersja z `PRAGMA user_version`, baza nowsza nietknięta. Odtworzone sondami B, C, E: 8 tabel bez zmian liczności, także po SIGKILL w środku migracji.
- Uszkodzona baza nigdy nie jest kasowana ani nadpisywana; przemianowanie bez nadpisania celu z sufiksem przy kolizji (D-201, `packages/postep/src/start.ts:46`).
- Strażnik testowy blokuje pierwszą migrację z przebudową bez kopii `VACUUM INTO` (`packages/postep/test/kontrakt-05-postep.test.ts:8`).
- Tryb `DELETE` zamiast WAL: `postep.db` jest spójny po każdym `COMMIT`, więc kopia pliku przy zamkniętym połączeniu jest kompletna (ADR 0003 pkt 2). Upraszcza to przyszłą ścieżkę ratunkową z 001–003.
- Instalacja pliku treści pod nazwą tymczasową z przemianowaniem; stare pliki usuwane dopiero po otwarciu nowego (`packages/domena/src/tresc.ts:79`).
- Zero SDK awarii i analityki, pusty `NSPrivacyCollectedDataTypes`, dziennik lokalny bez danych osobowych i z limitem.
- Wszystkie workflowy wydania tylko ręcznie; brak automatycznej wysyłki do recenzji i publikacji.
- Proces złego buildu i pauzy wydania stopniowego zapisany z analogią Treningu (D-304).

## Decyzje dla właściciela
- **D1 (003): strażnik pętli awarii i tryb awaryjny.** (a) tryb `build` roli 12 od E1 na obecnym kodzie: strażnik, ekran awaryjny, „Wyślij dane”; ok. 1 sesja agenta, przegląd D-043. (b) przed 1.0 tylko ekrany startu z 001 i 002 (z „Wyślij dane”), strażnik w 1.1. (c) bez zmian, z ryzykiem nazwanym w raporcie. Rekomendacja: (b). Ekrany obsłużą realne błędy danych przy starcie przy małym zakresie w czasie zamrożenia, a strażnik wejdzie przed pierwszą aktualizacją z migracją.
- **D2 (004): źródło sygnału o awariach po premierze.** Opcje (a)–(d) w znalezisku. Rekomendacja: (a) adres 08-F23 + instrukcja wysłania raportu + ćwiczenie na TestFlight przed 1.0.
- **D3 (NIE-06, NIE-08, NIE-11, NIE-12): runbook i ćwiczenia** (brak dokumentów to nie znalezisko). (a) tryb `build` roli 12 od E1: runbook (gdzie i kiedy patrzeć, numer buildu → SHA → symbole i mapy źródeł, kroki incydentu z D-304, miejsce plików od użytkowników poza repo, data odnowienia Apple Developer) + ćwiczenia. (b) tylko runbook. (c) bez zmian. Rekomendacja: (b) przed 1.0, z dwoma krokami właściciela na telefonie: eksport → usunięcie aplikacji → instalacja → import z zapisem liczności (Postęp przed i po; NIE-12) oraz celowa awaria na buildzie TestFlight z odczytem zakładki Crashes (NIE-06). Czas właściciela: ok. 20–30 min.
- **D4 (NIE-03): przywracanie z kopii pliku bazy.** (a) bez tej funkcji: przeniesienie danych to eksport i import JSON (ADR 0008) oraz kopia iCloud. (b) przywracanie pliku przez API kopii z walidacją. Rekomendacja: (a). Import JSON jest walidowany przed dotknięciem bazy, a (b) to drugi format do utrzymania.
- **Kroki właściciela, których agent nie wykona:** sprawdzenie na iPhonie ekranów z 001 po poprawce (np. instalacja starszego buildu z TestFlight), ćwiczenia z D3, odczyt `backgroundTimeRemaining` (ADR 0013, „Do sprawdzenia”).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 12-niezawodnosc --tryb fix --zadania 12-niezawodnosc-001,12-niezawodnosc-002,12-niezawodnosc-005,12-niezawodnosc-006`
(003 i 004 po decyzjach D1 i D2. Wygląd i teksty ekranów startu robią role 04 i 06 według `docs/tresci/stany-bledow-fakty.md`. Zmiana ścieżki startu i plików bazy to ścieżka wrażliwa: przegląd D-043 w świeżym kontekście. Zakres zamrożony: P1 bez blokady trafiają do backlogu z wersją, chyba że właściciel postanowi inaczej.)

Stan plików śledzonych (`git status --porcelain`): na początku pusty (dowody/git-status-start.txt); na końcu STATUS_KONCOWY
