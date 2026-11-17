# Audyt: Audytor Generalny — PokerGym (Szkoła Pokera) — 2026-11-17
Commit: f75acdff16915aeb43ff788888216e28616c11ed · Tryb: audit (wariant głęboki, wybór właściciela „c: głęboki”) · Środowisko: Linux w chmurze, Node 22, pnpm 10, Playwright/Chromium, MCP GitHub (odczyt CI); bez macOS, Xcode, symulatora i telefonu (E2E iOS tylko z CI), bez App Store Connect

## Podsumowanie
Pełny audyt M1 przed buildem 1012 (i przed App Store): 12 ról + drugi niezależny przebieg 06, 5 soczewek, weryfikacja przeciwna 7 grup. 78 znalezisk ról + 1 z porównania z linią bazową → **66 pozycji po scaleniu**. Po weryfikacji: **P0 0, P1 6, P2 60**. Kurs **trafny** (linia bazowa i soczewki potwierdzają główną pracę; brak potwierdzonych P0/P1 kierunku). Stan **ZABLOKOWANE**: 6 otwartych P1. Wg progu CLAUDE.md pkt 1: **build TestFlight 1012 blokuje tylko M1-audytor-generalny-002** (siatki obrony BB wbrew solverowi) — oraz niezależnie od audytu bramka scenariuszy: protokół F buildu 1011 ma 10 pozycji bez wyniku (krok właściciela, JAK-19); **wysyłkę do App Store blokuje 001–006**. Decyzje dla właściciela: 13 (DEC-01…DEC-13), najpilniejsza DEC-01 (e-mail kontaktu i dane sprzedawcy, W-04).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| M1-audytor-generalny-001 | P1 (blokuje App Store) | D | Polityka prywatności niepodpięta w aplikacji (przycisk nic nie otwiera) i brak kontaktu na stronie wsparcia, w polityce i notatkach (W-04) | otwarte |
| M1-audytor-generalny-002 | P1 (blokuje 1012 i App Store) | M | Siatki obrony BB (vs BTN i vs SB, 6- i 9-max) oceniają 16 i 13 rąk wbrew opublikowanemu rozwiązaniu solvera, bez klas niepewnych | otwarte |
| M1-audytor-generalny-003 | P1 (blokuje App Store) | D | Po zakupie albo przywróceniu w sesji i scenariuszu ekran dalej pokazuje wyczerpany limit i „Pełny dostęp” | otwarte |
| M1-audytor-generalny-004 | P1 (blokuje App Store) | D | Ćwiczenia z zakresem pokazują „✗ Błąd” zamiast „Niedokładność” dla akcji z częstością 0 < f < 3,5% (377 akcji; RD-11, D-143) | otwarte |
| M1-audytor-generalny-005 | P1 (blokuje App Store) | D | Kafel „Scenariusze” na ekranie „Dziś” pokazuje „Wkrótce”, choć scenariusze działają (D-581) | otwarte |
| M1-audytor-generalny-006 | P1 (blokuje App Store) | D | Notatki dla App Review, opis sklepu, ekran zakupu i README pomijają scenariusze (D-530); kontrola CI AK-K-11-l wymusza zawetowaną D-305 | otwarte |
| M1-audytor-generalny-007 | P2 | D | Publiczne repo zawiera wyciągi z cudzych artykułów ponad limit 250 znaków (19 źródeł, 29 cytatów, najdłuższy 2565 znaków; D-141) | otwarte |
| M1-audytor-generalny-008 | P2 | D | Brak obsługi AppState: po powrocie z tła „Dziś” pokazuje wczorajszy limit i powtórki (ADR 0013 pkt 4–5) | otwarte |
| M1-audytor-generalny-009 | P2 | D | Błąd danych przy starcie daje ogólny ekran z samym ponowieniem, bez eksportu i „Zaktualizuj aplikację” (stany-bledow-fakty.md) | otwarte |
| M1-audytor-generalny-010 | P2 | D | Uszkodzona baza postępu: cichy start od zera, odłożony plik bez drogi wyjścia z telefonu | otwarte |
| M1-audytor-generalny-011 | P2 | P | Brak strażnika pętli awarii i trybu awaryjnego (Trening je ma; odstępstwo nienazwane) | otwarte |
| M1-audytor-generalny-012 | P2 | D | BRD nieaktualne wobec D-158 i D-167 (RD-12, blokery, NFR-JEZ-001, OP-15, errata) | otwarte |
| M1-audytor-generalny-013 | P2 | D | Wymagania danych BR-DANE-001/003/004 bez scenariuszy błędu w BRD (są w tlo-i-bledy.md i testach) | otwarte |
| M1-audytor-generalny-014 | P2 | D | Pasek strategii po ocenie bez granicy między dwiema akcjami nie-pas (kontrast 1:1; wada uśpiona przy obecnej treści) | otwarte |
| M1-audytor-generalny-015 | P2 | D | Haptyka wyboru akcji działa mimo wyłączonych „Wibracji przy odpowiedzi” (PU-022) | otwarte |
| M1-audytor-generalny-016 | P2 | D | Kontrolka poziomu scenariusza łamie nazwy poziomów przy AX5 | otwarte |
| M1-audytor-generalny-017 | P2 | D | Liczby wyników i 6 rozmiarów/krojów tekstu wpisane na sztywno poza skalą motywu | otwarte |
| M1-audytor-generalny-018 | P2 | D | Tytuły w Literacie nie reagują na „Pogrubiony tekst” | otwarte |
| M1-audytor-generalny-019 | P2 | D | Linki „Słowniczek” i „Pomoc” na ekranie Postęp z celem dotyku 24 pt (D-121: 44 pt) | otwarte |
| M1-audytor-generalny-020 | P2 | D | Skala stopni łamie „Dopuszczalna” w środku wyrazu przy tekście domyślnym 390 pt (D-122) | otwarte |
| M1-audytor-generalny-021 | P2 | D | Polski przecinek dziesiętny na sztywno w wyniku zadania liczbowego i średnim czasie sesji (apps/mobile/src/app/session.tsx:333 i :601) | otwarte |
| M1-audytor-generalny-022 | P2 | D | Przypomnienie dzienne zostaje w poprzednim języku po zmianie języka (ADR 0012 pkt 3) | otwarte |
| M1-audytor-generalny-023 | P2 | D | „Usuń postęp” zostawia na telefonie kopię sprzed importu i odłożoną uszkodzoną bazę; inwentarz prywatności niepełny | otwarte |
| M1-audytor-generalny-024 | P2 | D | Progi oceny i zaliczenia testu w dwóch modułach (KONFIGURACJA i thresholds.ts); trzy implementacje zaliczenia | otwarte |
| M1-audytor-generalny-025 | P2 | P | Funkcje w kodzie bez wiersza F-nn i BR: zakładka „Postęp”, seria dni, „Talia czterokolorowa”, „Wibracje” | otwarte |
| M1-audytor-generalny-026 | P2 | P | 19 kryteriów „Intuicyjność” kontraktu bez przejścia poznawczego | otwarte |
| M1-audytor-generalny-027 | P2 | D | Fakty zmienne (rake, dane populacji) bez terminu ponownego odczytu w rejestrze | otwarte |
| M1-audytor-generalny-028 | P2 | D | Kontrakt zakresu nieaktualny wobec decyzji po 2026-11-10 (języki 1.0, liczba BR, stan E2E) | otwarte |
| M1-audytor-generalny-029 | P2 | D | Pięć BR w zakresie bez testu z ID w nazwie | otwarte |
| M1-audytor-generalny-030 | P2 | P | Lekcja M13-L1 uczy czytania „raportu z gry” z żetonami, a tryb gry usunięto (ADR 0011) | otwarte |
| M1-audytor-generalny-031 | P2 | D | Pusta lista produktów ze sklepu daje ekran zakupu bez planów i komunikatu | otwarte |
| M1-audytor-generalny-032 | P2 | P | Subskrybent nie ma w aplikacji drogi do zakupu dożywotniego | otwarte |
| M1-audytor-generalny-033 | P2 | D | Scenariusze zakupu na urządzeniu (U-5) bez daty i wyniku | otwarte |
| M1-audytor-generalny-034 | P2 | D | Pasek stosu „ty” w ICM 2,90:1 w ciemnym motywie ze zwiększonym kontrastem | otwarte |
| M1-audytor-generalny-035 | P2 | D | Postęp pokazuje i czyta surowe identyfikatory rodzin zadań („m0.best-hand”) | otwarte |
| M1-audytor-generalny-036 | P2 | D | Wygaśnięcie czasu w tle zostawia otwartą transakcję długiej operacji (skutek 0xdead10cc niepotwierdzony; P1, jeśli U-2 potwierdzi) | otwarte |
| M1-audytor-generalny-037 | P2 | D | Silnik gry z botami nadal w kodzie wbrew ADR 0011 | otwarte |
| M1-audytor-generalny-038 | P2 | D | Kontrola granic K-01 nie działa w CI; 11 plików źródłowych ponad 20 KB | otwarte |
| M1-audytor-generalny-039 | P2 | D | Zapytanie wejścia do scenariuszy skanuje całą tabelę odpowiedzi (B-4 bez pomiaru) | otwarte |
| M1-audytor-generalny-040 | P2 | M | Zdanie ekranu „Pomoc” o hazardzie bez twierdzenia w rejestrze (źródło GB odczytane) | otwarte |
| M1-audytor-generalny-041 | P2 | D | Przegląd zastępczy n:dd.bi.small zapisany tak, że kontrola uznaje go za przegląd człowieka | otwarte |
| M1-audytor-generalny-042 | P2 | M | „Mały blind wobec Buttona prawie nic nie sprawdza” — atrybucja do jednego rozwiązania | otwarte |
| M1-audytor-generalny-043 | P2 | M | „Rywal chybia flop … dlatego mały c-bet się opłaca”: związek przyczynowy bez źródła | otwarte |
| M1-audytor-generalny-044 | P2 | D | Katalog PU bez przypadków klasy A; opis PU-001…010 nieaktualny (bramka „A wykonane” nie sprawdza nic) | otwarte |
| M1-audytor-generalny-045 | P2 | D | Eksport i import sprawdzane tylko na syntetycznym wzorcu: brak pliku z telefonu i testu własności | otwarte |
| M1-audytor-generalny-046 | P2 | D | Nocne testy (Stryker, fast-check ×1000, E2E na małym ekranie) nigdy nie biegły: nocny.yml niezarejestrowany | otwarte |
| M1-audytor-generalny-047 | P2 | D | Akcja pnpm/action-setup@v5 nieprzypięta do SHA (15 użyć, także w zadaniu z kluczem ASC) | otwarte |
| M1-audytor-generalny-048 | P2 | D | Testy czekają stałym czasem (setTimeout 20–50 ms) i biorą dzień z zegara systemowego | otwarte |
| M1-audytor-generalny-049 | P2 | D | Dziennik rozdania używa nazwy ulicy jako klucza React (SC-06, SC-08) | otwarte |
| M1-audytor-generalny-050 | P2 | D | Każdy komponent z useTokens osobno odpytuje „Zwiększ kontrast” (mignięcie palety, 77 nasłuchów) | otwarte |
| M1-audytor-generalny-051 | P2 | P | Skrypt lint (expo lint) nie działa: brak ESLint; 21 wyłączeń reguł bez kontroli | otwarte |
| M1-audytor-generalny-052 | P2 | D | Godzina odnowienia limitu zawsze 24 h, dzień w historii jako surowe RRRR-MM-DD | otwarte |
| M1-audytor-generalny-053 | P2 | D | Listy sklejane łacińskim „, ” także w ja i zh-Hant | otwarte |
| M1-audytor-generalny-054 | P2 | D | Angielskie nazwy terminów bez accessibilityLanguage | otwarte |
| M1-audytor-generalny-055 | P2 | P | Rejestr języków bez wierszy dla wydanych de, es, ko, it, vi | otwarte |
| M1-audytor-generalny-056 | P2 | P | Zrzuty w najdłuższym języku i pseudolokalizacji tylko dla ekranu scenariusza | otwarte |
| M1-audytor-generalny-057 | P2 | D | 114 z 877 kluczy źródła bez kontekstu dla tłumacza | otwarte |
| M1-audytor-generalny-058 | P2 | M | Ankieta wiekowa (D-310) nieoceniona ponownie po wejściu scenariuszy do 1.0 (D-530) | otwarte |
| M1-audytor-generalny-059 | P2 | P | Strona produktu w 6 językach, build w 12 (fala 2 w docs/) | otwarte |
| M1-audytor-generalny-060 | P2 | P | Plan zrzutów sklepu nie pokazuje ocenionej decyzji ani scenariusza | otwarte |
| M1-audytor-generalny-061 | P2 | D | .gitignore w katalogu głównym bez *.p8, *.p12, credentials.json, .env | otwarte |
| M1-audytor-generalny-062 | P2 | D | Dwa źródła numeru buildu i nieaktualne workflowy ad hoc | otwarte |
| M1-audytor-generalny-063 | P2 | P | Hipotezy BRD bez progu, próby, ID decyzji i daty oceny | otwarte |
| M1-audytor-generalny-064 | P2 | P | Po premierze brak sprawdzonej drogi, którą właściciel bez Maca dowie się o awarii | otwarte |
| M1-audytor-generalny-065 | P2 | D | Uszkodzona kopia pliku treści nie wraca z paczki; ekran błędu bez wyjścia poza reinstalacją | otwarte |
| M1-audytor-generalny-066 | P2 | P | Brak oceny praw USA o weryfikacji wieku (Teksas od 2026-06, Utah, Luizjana) i decyzji o Declared Age Range API | otwarte |

## Werdykt
Kurs: **trafny** · Stan: **ZABLOKOWANE** · Uzasadnienie: reguła werdyktu (GEN-11), pierwszy pasujący wiersz — kurs: brak potwierdzonych P0/P1 kierunku (GEN-02 dał tylko P2 M1-audytor-generalny-066; role 01 i 03 potwierdziły kurs wobec niezależnej linii bazowej); stan: potwierdzone otwarte P1 po scaleniu i weryfikacji: M1-audytor-generalny-001, 002, 003, 004, 005, 006. Próg wydania z CLAUDE.md pkt 1 (pierwszeństwo): build TestFlight 1012 (testy wewnętrzne, bez App Review) blokuje 002 (błędne twierdzenie merytoryczne w głównym przepływie); 001, 003–006 to ryzyko odrzucenia przez Apple — blokują wysyłkę do App Store, nie build wewnętrzny (weryfikacja g1, g2). Zastrzeżenia: obszary „nie sprawdzono” wymagające telefonu (tabela pokrycia); bramka JAK-19 przed buildem 1012 wymaga protokołu F 1011 (10 pozycji, krok właściciela).

## Linia bazowa i założenia
Linia bazowa całości (`linia-bazowa.md`) powstała przed lekturą BRD, ADR, zakresu i kodu: App Store US czytany 2026-11-17 (Poker Trainer, Postflop+, GTO Preflop Wizard; recenzje z surowego JSON), App Review Guidelines 5.3.3/5.3.4/3.1.2(a), wartości kategorii wiekowej (simulated gambling; rating regionalny Brazylii). 15 punktów M1 (LB-01…LB-15) + 10 z soczewek-subagentów (LB-16…LB-25; pliki `soczewki/*.md`, 5 × 15 punktów). Wymiary pokrycia kontraktu: kurs całości (wynik: trafny), obszary ról 01–12 (wszystkie uruchomione), dane od zapisu do ratunku (05, 08, 12, 07: sondy migracji v1→v3, SIGKILL, uszkodzenie — dane przetrwały), pieniądze (02: wektory dostępu 12/12; znalezisko 003), prywatność (05, 10, 11: zero SDK i sieci, „Data Not Collected” zgodne; znalezisko 001), fakty od źródła do ekranu (06 ×2: 834 liczby, 42 reguły, 39 + 11 cytatów — zgodne; znalezisko 002), styki ról (SYS-01), obietnice kontra kod (006, 025, 066), rejestry decyzji i założeń (SYS-01; zmian statusu ZAL-nnn nie proponuję — żadne założenie nie obalone), koszty i limity (soczewka właściciela; CI w limitach, `nocny.yml` niezarejestrowany — 046). Wzorzec najlepszych: alternatywy to drillery bez programu i wyjaśnień; PokerGym ma program, wyjaśnienia z liczbami i model bez śledzenia — przewaga potwierdzona; luka do najlepszych to poprawność ocen w spotach niezwalidowanych (002, 004) i wiarygodność sklepu (001, 006).

### Linia bazowa całości i porównanie
| Punkt | Dowód | Który raport go dotyka | Znalezisko |
|---|---|---|---|
| LB-01 ocena z wyjaśnieniem, zgodna z solverem | recenzje alternatyw | 06, 06-b, 01 | 002, 004 |
| LB-02 program od zera | recenzja Preflop Wizard | 01, 03, 06 | 030 |
| LB-03 pierwsza sesja bez konfiguracji | recenzja Poker Trainer | 03, 04 | 026 |
| LB-04 ocena nie karze drugiego najlepszego | recenzja Postflop+ | 01, 06-b | 004, 002 |
| LB-05 postęp nie ginie | opis sklepu | 05, 08, 12, 07 | 008–011, 023, 036, 045 |
| LB-06 zero śledzenia | opis sklepu | 05, 10, 11 | ok (bez znaleziska) |
| LB-07 zakupy uczciwe | 3.1.2(a) | 02 | 003, 031, 033 |
| LB-08 brak hazardu, kategoria wiekowa | 5.3.3, age ratings | 10 | 058 |
| LB-09 pomoc hazardowa aktualna | opis sklepu | 06, 06-b | ok (11 twierdzeń krytycznych POPARTE); 040 |
| LB-10 35 języków | cel właściciela | 09, 01 | 012 (NFR-JEZ-001), 059 |
| LB-11 offline, bez konta | opis sklepu | 05, 11 | ok |
| LB-12 dostępność AX5, VoiceOver | HIG | 04, 09 | 014–020, 054 |
| LB-13 cena wobec konkurencji | recenzje | 02 | ok (kontekst bramki; wyjątek D-1990) |
| LB-14 obietnice sklepu = kod | opis sklepu | 02, 10, 01 | 006, 025 |
| LB-15 właściciel 0 zł | CLAUDE.md | 07, 10 | 046, 062 |
| LB-16 brak pomocy w czasie gry (RTA) | soczewka praktyk 13 | — (tryb gry usunięty, ADR 0011) | sprawdzone, brak ryzyka; 037 (martwy silnik) |
| LB-17 filtr i generator spójne | soczewki | 02, 05, 08 | ok |
| LB-18 założenia spotu jawne | soczewki | 06, 06-b | 002 |
| LB-19 push/fold i ICM z modelem | soczewka praktyk 6 | 06 | ok (IL-003 ICM do decyzji właściciela, znane) |
| LB-20 import niezaufany, usuń wszystko | soczewka sceptyk 7–8 | 05, 12 | 023 |
| LB-21 prawa USA o weryfikacji wieku | soczewka sceptyk 10 | żaden | **066 (brak, GEN-02)** |
| LB-22 DSA trader przed FR/DE | soczewki | 10 | DEC-01 (publiczny kontakt) |
| LB-23 kanał zgłoszeń, prośba o ocenę | soczewki | 11, 12 | 001 (kontakt), 064 |
| LB-24 dźwięk, bez presji czasu | soczewki | 04 | 015 |
| LB-25 wzrost bez reklam social casino | soczewki | 11 | ok (zero SDK, brak reklam); 063 |

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| CI na SHA audytu (`pnpm run ci`) | tak, kod 0 | wspolne/ci-pelne.log (mobile 1782, content-build 927, domena 347, poker-core 350, skrypty 229/0) |
| E2E iOS na SHA audytu | tak (z CI, run 44059753722 #110: zielony wg 07) | role/07-jakosc |
| Każdy raport roli i weryfikacji: kontrola dowodów uruchomiona przez M1 | tak, 13 + 7, wszystkie kod 0 | pliki kontrola-*.txt w katalogu dowodów K |
| Ekrany na telefonie, VoiceOver, prawdziwy Dynamic Type | nie sprawdzono (brak macOS/telefonu) — krok właściciela (protokół F) | role/04, role/07 |
| App Store Connect (etykieta prywatności, produkty, DSA) | nie sprawdzono (brak dostępu; workflowy ASC uruchamia właściciel) | role/10 |
| Migracja z buildu 1011 na urządzeniu z danymi, U-2, U-5 | nie sprawdzono — krok właściciela przed App Store | role/05, role/02, role/07 |

### Pokrycie ról
| Rola | Status | Raport | Kontrola dowodów | „Nie sprawdzono” |
|---|---|---|---|---|
| 01-odkrywanie | uruchomiona, skończona | role/01-odkrywanie/ | dowody/kontrola-01-odkrywanie.txt (kod 0) | aplikacja na telefonie, packages/postep, spis treści MoP (404) |
| 02-monetyzacja | uruchomiona, skończona | role/02-monetyzacja/ | dowody/kontrola-02-monetyzacja.txt (kod 0) | zakupy na urządzeniu i w ASC, natywne requestPurchase |
| 03-zakres | uruchomiona, skończona | role/03-zakres/ | dowody/kontrola-03-zakres.txt (kod 0) | pętla w działającej aplikacji, 23 bazy języków niewydanych |
| 04-studio-projektowe | uruchomiona, skończona | role/04-studio-projektowe/ | dowody/kontrola-04-studio-projektowe.txt (kod 0) | ekrany poza scenariuszem na obrazie, VoiceOver, HIG w dniu audytu |
| 05-architekt | uruchomiona, skończona | role/05-architekt/ | dowody/kontrola-05-architekt.txt (kod 0) | migracja 1010→1011 na urządzeniu, U-2, budżety B-1–B-7 |
| 06-tresci | uruchomiona, skończona | role/06-tresci/ | dowody/kontrola-06-tresci.txt (kod 0) | 413 twierdzeń niekrytycznych poza próbką, dokument 10 (HTTP 401) |
| 06-tresci-b | uruchomiona, skończona | role/06-tresci-b/ | dowody/kontrola-06-tresci-b.txt (kod 0) | teksty sklepu, wartości rake z API, walidacja solvera (dok. 10) |
| 07-jakosc | uruchomiona, skończona | role/07-jakosc/ | dowody/kontrola-07-jakosc.txt (kod 0) | protokół F 1011 (10 pozycji), aktualizacja 1011 → kandydat na telefonie |
| 08-programista | uruchomiona, skończona | role/08-programista/ | dowody/kontrola-08-programista.txt (kod 0) | iPhone, moduł Swift ochrona-tla, migracja z 1011 |
| 09-lokalizacja | uruchomiona, skończona | role/09-lokalizacja/ | dowody/kontrola-09-lokalizacja.txt (kod 0) | zrzuty pseudolokalizacji, Hermes/iOS |
| 10-wydanie | uruchomiona, skończona | role/10-wydanie/ | dowody/kontrola-10-wydanie.txt (kod 0) | pola ASC, Info.plist Release, manifesty podów (403) |
| 11-wzrost | uruchomiona, skończona | role/11-wzrost/ | dowody/kontrola-11-wzrost.txt (kod 0) | fora (403), przypomnienie i prośba o ocenę na telefonie |
| 12-niezawodnosc | uruchomiona, skończona | role/12-niezawodnosc/ | dowody/kontrola-12-niezawodnosc.txt (kod 0) | ekrany błędu na iPhonie, raporty awarii TestFlight, ćwiczenie przywrócenia |

| Obszar krytyczny | Role | Wynik |
|---|---|---|
| dane | 05, 08, 12, 07 | sprawdzone na kodzie i sondach (node:sqlite: migracja, przerwany import, SIGKILL, uszkodzenie — dane przetrwały); na urządzeniu nie sprawdzono |
| prywatność | 05, 10, 11, 02 | sprawdzone: zero SDK i sieci, manifest; 001 (link i kontakt); ASC nie sprawdzono |
| bezpieczeństwo, sekrety | 10, 07 | sprawdzone: historia 2415 commitów bez sekretów; 047, 061 |
| płatności | 02 | sprawdzone na kodzie i sondach RNTL; 003; urządzenie i ASC nie sprawdzono (U-5, 033) |
| główny przepływ | 03, 04, 07 | sprawdzony na kodzie, testach i E2E CI; 004, 005; telefon nie sprawdzono |
| treści krytyczne | 06, 06-tresci-b | sprawdzone (rachunek, źródła przeczytane dziś); 002; 24 języki zastępcze z en — rola 09 |

## Kontrola dowodów i sekretów
Raporty ról i weryfikacji: `sprawdz-raport.mjs` uruchomiony przez M1 po każdym subagencie, 20 plików, wszystkie kod 0 (dowody/kontrola-01-odkrywanie.txt … dowody/kontrola-wer-g7-tresc.txt). Plan: dowody/sprawdz-plan.txt (kod 0). Raport końcowy: dowody/kontrola-raport-koncowy.txt (kod 0 przed oddaniem) Przed każdym commitem K przegląd `git diff --cached` pod wzorce sekretów: 0 trafień poza jednym fałszywym (adres primedope „risk-of-ruin…” pasuje do wzorca `sk-`), bez sekretu.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| GEN-01 | dotyczy | ok: 12/12 ról uruchomionych + 06-tresci-b; tabela w plan-audytu.md |
| GEN-02 | dotyczy | ok: linia bazowa przed kodem; 1 brak → M1-audytor-generalny-066 |
| GEN-03 | dotyczy; bramka 02 spełniona wyjątkiem nazwanym właściciela (D-1990) | ok: plan zatwierdzony („c: głęboki”), punkt kontrolny po partii 1 („Dalej (zalecane)”), koszty.md |
| GEN-04 | dotyczy | ok: polecenia w prompty/ (poza repo publicznym), 20/20 raportów z „Commit” f75acdff |
| GEN-05 | dotyczy | ok: 20 kontroli M1 kod 0 |
| GEN-06 | dotyczy | ok: tabela obszar × rola wyżej; „nie sprawdzono” = telefon/ASC |
| GEN-07 | dotyczy | ok: 79 → 66, tabela scalania |
| GEN-08 | dotyczy | ok: brak sprzecznych zaleceń; 13 decyzji produktowych DEC-nn |
| GEN-09 | dotyczy | ok: SYS-01…SYS-04 |
| GEN-10 | dotyczy | ok: 7 grup, wszystkie P0/P1 i P2 obszarów krytycznych; K/weryfikacja/ |
| GEN-11 | dotyczy | ok: sekcja Werdykt |
| GEN-12 | dotyczy | ok: sprawdz-plan.mjs kod 0 |
| GEN-13 | dotyczy | ok: żadna rola nie zgłosiła poleceń w treści z zewnątrz; prompty i skrypty biblioteki poza repo (.git/info/exclude); cytaty recenzji ≤ 150 znaków; wyciągi > 250 znaków sprzed audytu → 007 |
| GEN-14 | nie dotyczy: tryb audit, nie reaudit | — |
| GEN-15 | dotyczy | JAK-19: bramka statyczna kod 0, próba negatywna kod 1, krok w testflight.yml; scenariuszy A: 0 → 044; protokół F 1011 otwarty (10 pozycji) — krok właściciela przed 1012 |

## Scalanie
79 pozycji (78 z raportów ról + M1-audytor-generalny-066) → 66. Scalone (ta sama przyczyna, jedna zmiana naprawia):
- M1-audytor-generalny-001 ← 10-wydanie-001, 02-monetyzacja-001, 01-odkrywanie-002, 11-wzrost-001
- M1-audytor-generalny-006 ← 10-wydanie-002, 10-wydanie-003, 02-monetyzacja-003, 01-odkrywanie-006
- M1-audytor-generalny-008 ← 05-architekt-001, 08-programista-001
- M1-audytor-generalny-017 ← 04-studio-projektowe-004, 08-programista-006
- M1-audytor-generalny-023 ← 05-architekt-007, 12-niezawodnosc-005
- M1-audytor-generalny-024 ← 05-architekt-003, 08-programista-002
- M1-audytor-generalny-025 ← 03-zakres-002, 11-wzrost-002
- M1-audytor-generalny-026 ← 03-zakres-004, 04-studio-projektowe-010
- M1-audytor-generalny-027 ← 06-tresci-003, 06-tresci-504
Pozostałe 59 pozycji: po jednym ID źródłowym (pole `zrodla` w plan-napraw.json). Rola-właściciel: ta, której artefakt trzeba zmienić (kod → 08 albo rola raportująca, gdy obszar jest jej).

## Konflikty i decyzje dla właściciela
Sprzecznych zaleceń (ta sama rzecz w przeciwnych kierunkach) nie znaleziono. Kwestie merytoryczne (rodzaj M: 002, 040, 042, 043, 058) rozstrzygają źródła, nie właściciel.

## Przyczyny systemowe
- **SYS-01**: Decyzje (D-530 scenariusze w 1.0, ADR 0011 bez trybu gry, D-158, D-167, D-302) nie przechodzą do dokumentów źródłowych, tekstów sklepu, notatek, lekcji i kontroli CI — brak mechanizmu propagacji decyzji. Zależne: 006, 012, 028, 030, 037, 058.
- **SYS-02**: Brak danych właściciela W-04 (e-mail kontaktu, dane sprzedawcy) blokuje politykę prywatności, kontakt, zgłaszanie błędów i stronę JP. Zależne: 001.
- **SYS-03**: Wymagania odporności z architektury (ADR 0013 AppState, tlo-i-bledy.md §1 i §4, stany-bledow-fakty.md, analogia Treningu) niewdrożone w kodzie i bez testów. Zależne: 008, 009, 010, 011, 036.
- **SYS-04**: Dynamic Type/AX5 i pseudolokalizacja sprawdzane zrzutami tylko dla ekranu scenariusza (pełna aplikacja nie startuje w Expo web). Zależne: 016, 017, 018, 020, 056.

## Weryfikacja przeciwna
Świeży subagent na grupę (7 grup), bez uzasadnień autorów; pliki `weryfikacja/g*.md`, kontrola M1 kod 0. Zbiorczo: `scalanie/weryfikacja-wyniki.md`.
| ID | Wynik | Dowód | Zmiana poziomu |
|---|---|---|---|
| M1-audytor-generalny-001 | g1: potwierdzone; P0 → P1 (blokuje App Store, nie build 1012); 22 wstawki (11 na język) | weryfikacja/ (grupa w wyniku) | P0 → P1 |
| M1-audytor-generalny-002 | g7: potwierdzone, odtworzone niezależnie na danych BeyondGTO odczytanych 2026-11-17; blokuje 1012 i App Store | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-003 | g2: potwierdzone; sonda 4/5 czerwona (kod 1), kontrola z jedną zmianą 5/5 zielona (kod 0) | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-004 | g2: potwierdzone; sonda: 377 akcji z 0<f<0,035 z werdyktem `wrong` na ekranie, `inaccuracy` w rdzeniu | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-005 | g2: potwierdzone; test kafle-bi utrwala stan przejściowy z D-581 | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-006 | g1: częściowo potwierdzone (notatki bez scenariuszy; „no bots” sporne; ścieżka zakupu działa) — P1 brzegowy; sonda: rzetelny opis łamie kontrolę AK-K-11-l (kod 1) | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-007 | g1: potwierdzone (29 cytatów > 250 znaków); P1 → P2 dla wydania (pliki poza aplikacją i metadanymi); naprawa osobna, zalecana w partii 1 | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-008 | g3: potwierdzone; P1 → P2 (start aktywności liczy limit od nowa) | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-009 | g3: potwierdzone; P1 → P2 (dane bez zmian, sonda kod 0) | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-010 | g3: potwierdzone; P1 → P2 (teoretyczny) | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-011 | g3: potwierdzone; P1 → P2 | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-012 | g6: potwierdzone z korektami; P1 → P2 | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-013 | g4: P1 obalone → P2 niskie (scenariusze błędu w tlo-i-bledy.md i testach) | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-014 | g5: kod potwierdzony, skutek uśpiony; P1 → P2 | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-015 | g6: potwierdzone; P1 → P2 (PU-022 przypisać temu ID) | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-016 | g5: potwierdzone; P1 → P2 | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-017 | g5: potwierdzone; P1 → P2; 04-004 i 08-006 jedna przyczyna | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-018 | g5: potwierdzone; P1 → P2 | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-019 | g5: potwierdzone; P1 → P2 (próg projektu D-121, nie wydania) | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-020 | g6: potwierdzone; P1 → P2 | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-021 | g6: potwierdzone; P1 → P2 | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-022 | g6: potwierdzone; P1 → P2 | weryfikacja/ (grupa w wyniku) | P1 → P2 |
| M1-audytor-generalny-023 | g3: potwierdzone z korektą (kopia w Library/Caches) | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-027 | g7: potwierdzone; 504 podzbiorem 003 | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-031 | g2: potwierdzone | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-033 | g2: potwierdzone | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-036 | g4: mechanizm potwierdzony, skutek niepotwierdzony | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-040 | g7: potwierdzone (zdanie prawdziwe) | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-042 | g7: potwierdzone, słabsze (P2 niskie) | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-043 | g7: potwierdzone; zarzut sprzeczności częściowo obalony | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-045 | g4: potwierdzone | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-047 | g4: potwierdzone (15 użyć) | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-058 | g1: potwierdzone | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-061 | g1: potwierdzone (niskie) | weryfikacja/ (grupa w wyniku) | bez zmiany |
| M1-audytor-generalny-065 | g4: potwierdzone (sonda kod 0) | weryfikacja/ (grupa w wyniku) | bez zmiany |

## Znaleziska (szczegóły)
### M1-audytor-generalny-001 · Polityka prywatności niepodpięta w aplikacji (przycisk nic nie otwiera) i brak kontaktu na stronie wsparcia, w polityce i notatkach (W-04)
- Pozycja listy kontrolnej: ID źródłowe: 10-wydanie-001, 02-monetyzacja-001, 01-odkrywanie-002, 11-wzrost-001
- Poziom: P1 — blokuje wysyłkę do App Store, nie build 1012
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/10-wydanie/10-wydanie-2026-11-17.md` (sekcja 10-wydanie-001); weryfikacja: g1: potwierdzone; P0 → P1 (blokuje App Store, nie build 1012); 22 wstawki (11 na język)
- Test akceptacyjny: test w pnpm run ci odrzuca null w ADRES_PRYWATNOSCI/ADRES_KONTAKTOWY i wstawki [DO USTALENIA]/[SUPPORT EMAIL] w site/ i store/review-notes; przycisk „Privacy Policy” otwiera politykę; curl Support URL zawiera e-mail; PU-015 i PU-017 = OK
- Opcje: patrz DEC-01 (Decyzje dla właściciela); Rekomendacja: (a)
- Status: otwarte

### M1-audytor-generalny-002 · Siatki obrony BB (vs BTN i vs SB, 6- i 9-max) oceniają 16 i 13 rąk wbrew opublikowanemu rozwiązaniu solvera, bez klas niepewnych
- Pozycja listy kontrolnej: ID źródłowe: 06-tresci-501
- Poziom: P1 — blokuje build 1012 i App Store
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: raport źródłowy `role/06-tresci-b/06-tresci-2026-11-17.md` (sekcja 06-tresci-501); weryfikacja: g7: potwierdzone, odtworzone niezależnie na danych BeyondGTO odczytanych 2026-11-17; blokuje 1012 i App Store
- Test akceptacyjny: ręce z rozbieżnością ≥ 50 pp wobec opublikowanego solvera oznaczone jako niepewne/mieszane (ocena dopuszcza obie akcje) tym samym kryterium co btn-vs-co i sb-vs-btn; test na 4 spotach BB; źródło w rejestrze
- Status: otwarte

### M1-audytor-generalny-003 · Po zakupie albo przywróceniu w sesji i scenariuszu ekran dalej pokazuje wyczerpany limit i „Pełny dostęp”
- Pozycja listy kontrolnej: ID źródłowe: 02-monetyzacja-002
- Poziom: P1 — blokuje wysyłkę do App Store, nie build 1012
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/02-monetyzacja/02-monetyzacja-2026-11-17.md` (sekcja 02-monetyzacja-002); weryfikacja: g2: potwierdzone; sonda 4/5 czerwona (kod 1), kontrola z jedną zmianą 5/5 zielona (kod 0)
- Test akceptacyjny: sonda mon05 (sesja, powtórka, scenariusz, przywrócenie, nasłuch przed zwrotem) 5/5 zielona w CI: po zakupie ekran startu bez licznika
- Status: otwarte

### M1-audytor-generalny-004 · Ćwiczenia z zakresem pokazują „✗ Błąd” zamiast „Niedokładność” dla akcji z częstością 0 < f < 3,5% (377 akcji; RD-11, D-143)
- Pozycja listy kontrolnej: ID źródłowe: 01-odkrywanie-001
- Poziom: P1 — blokuje wysyłkę do App Store, nie build 1012
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/01-odkrywanie/01-odkrywanie-2026-11-17.md` (sekcja 01-odkrywanie-001); weryfikacja: g2: potwierdzone; sonda: 377 akcji z 0<f<0,035 z werdyktem `wrong` na ekranie, `inaccuracy` w rdzeniu
- Test akceptacyjny: dla każdej akcji z 0 < f < 0,035 ekran pokazuje stopień `niedokladnosc` zgodny z rdzeniem; test na pełnej liście par spot × klasa
- Status: otwarte

### M1-audytor-generalny-005 · Kafel „Scenariusze” na ekranie „Dziś” pokazuje „Wkrótce”, choć scenariusze działają (D-581)
- Pozycja listy kontrolnej: ID źródłowe: 03-zakres-001
- Poziom: P1 — blokuje wysyłkę do App Store, nie build 1012
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/03-zakres/03-zakres-2026-11-17.md` (sekcja 03-zakres-001); weryfikacja: g2: potwierdzone; test kafle-bi utrwala stan przejściowy z D-581
- Test akceptacyjny: kafel pokazuje „Poziom: … (auto)” wg D-581 we wszystkich 12 językach; test kafle-bi zaktualizowany (nie utrwala „Wkrótce”)
- Status: otwarte

### M1-audytor-generalny-006 · Notatki dla App Review, opis sklepu, ekran zakupu i README pomijają scenariusze (D-530); kontrola CI AK-K-11-l wymusza zawetowaną D-305
- Pozycja listy kontrolnej: ID źródłowe: 10-wydanie-002, 10-wydanie-003, 02-monetyzacja-003, 01-odkrywanie-006
- Poziom: P1 — blokuje wysyłkę do App Store, nie build 1012
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/10-wydanie/10-wydanie-2026-11-17.md` (sekcja 10-wydanie-002); weryfikacja: g1: częściowo potwierdzone (notatki bez scenariuszy; „no bots” sporne; ścieżka zakupu działa) — P1 brzegowy; sonda: rzetelny opis łamie kontrolę AK-K-11-l (kod 1)
- Test akceptacyjny: notatki dla recenzenta opisują scenariusze i drogę do zakupu; opis i ekran zakupu wymieniają scenariusze z limitu; kontrola AK-K-11-l zgodna z D-530 (sonda z rzetelnym opisem kod 0)
- Status: otwarte

### M1-audytor-generalny-007 · Publiczne repo zawiera wyciągi z cudzych artykułów ponad limit 250 znaków (19 źródeł, 29 cytatów, najdłuższy 2565 znaków; D-141)
- Pozycja listy kontrolnej: ID źródłowe: 06-tresci-001
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/06-tresci/06-tresci-2026-11-17.md` (sekcja 06-tresci-001); weryfikacja: g1: potwierdzone (29 cytatów > 250 znaków); P1 → P2 dla wydania (pliki poza aplikacją i metadanymi); naprawa osobna, zalecana w partii 1
- Test akceptacyjny: skrypt kontroli w CI: żaden cytat w docs/tresci/ ponad 250 znaków; wyciągi skrócone do cytatu z adresem
- Status: otwarte

### M1-audytor-generalny-008 · Brak obsługi AppState: po powrocie z tła „Dziś” pokazuje wczorajszy limit i powtórki (ADR 0013 pkt 4–5)
- Pozycja listy kontrolnej: ID źródłowe: 05-architekt-001, 08-programista-001
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/05-architekt/05-architekt-2026-11-17.md` (sekcja 05-architekt-001); weryfikacja: g3: potwierdzone; P1 → P2 (start aktywności liczy limit od nowa)
- Test akceptacyjny: po zmianie dnia i powrocie na pierwszy plan „Dziś” odświeża limit i powtórki (test z zegarem); długa operacja przerwana przy wygaśnięciu czasu w tle
- Status: otwarte

### M1-audytor-generalny-009 · Błąd danych przy starcie daje ogólny ekran z samym ponowieniem, bez eksportu i „Zaktualizuj aplikację” (stany-bledow-fakty.md)
- Pozycja listy kontrolnej: ID źródłowe: 12-niezawodnosc-001
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/12-niezawodnosc/12-niezawodnosc-2026-11-17.md` (sekcja 12-niezawodnosc-001); weryfikacja: g3: potwierdzone; P1 → P2 (dane bez zmian, sonda kod 0)
- Test akceptacyjny: migracja nieudana, baza nowsza i IOERR dają ekrany z tlo-i-bledy.md §4 (eksport albo aktualizacja); testy na każdy stan
- Status: otwarte

### M1-audytor-generalny-010 · Uszkodzona baza postępu: cichy start od zera, odłożony plik bez drogi wyjścia z telefonu
- Pozycja listy kontrolnej: ID źródłowe: 12-niezawodnosc-002
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/12-niezawodnosc/12-niezawodnosc-2026-11-17.md` (sekcja 12-niezawodnosc-002); weryfikacja: g3: potwierdzone; P1 → P2 (teoretyczny)
- Test akceptacyjny: po uszkodzeniu bazy użytkownik widzi komunikat i może wyeksportować odłożony plik; test na kopii uszkodzonej
- Status: otwarte

### M1-audytor-generalny-011 · Brak strażnika pętli awarii i trybu awaryjnego (Trening je ma; odstępstwo nienazwane)
- Pozycja listy kontrolnej: ID źródłowe: 12-niezawodnosc-003
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: P
- Dowód: raport źródłowy `role/12-niezawodnosc/12-niezawodnosc-2026-11-17.md` (sekcja 12-niezawodnosc-003); weryfikacja: g3: potwierdzone; P1 → P2
- Test akceptacyjny: wg DEC-02: strażnik po N nieudanych startach otwiera tryb awaryjny z eksportem (test) albo odstępstwo nazwane w ADR
- Opcje: patrz DEC-02 (Decyzje dla właściciela); Rekomendacja: (a)
- Status: otwarte

### M1-audytor-generalny-012 · BRD nieaktualne wobec D-158 i D-167 (RD-12, blokery, NFR-JEZ-001, OP-15, errata)
- Pozycja listy kontrolnej: ID źródłowe: 01-odkrywanie-003
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/01-odkrywanie/01-odkrywanie-2026-11-17.md` (sekcja 01-odkrywanie-003); weryfikacja: g6: potwierdzone z korektami; P1 → P2
- Test akceptacyjny: kontrola-brd.mjs kod 0 po wpisaniu D-158/D-167; brak odwołań do nieaktualnych reguł
- Status: otwarte

### M1-audytor-generalny-013 · Wymagania danych BR-DANE-001/003/004 bez scenariuszy błędu w BRD (są w tlo-i-bledy.md i testach)
- Pozycja listy kontrolnej: ID źródłowe: 01-odkrywanie-004
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/01-odkrywanie/01-odkrywanie-2026-11-17.md` (sekcja 01-odkrywanie-004); weryfikacja: g4: P1 obalone → P2 niskie (scenariusze błędu w tlo-i-bledy.md i testach)
- Test akceptacyjny: BRD odsyła do scenariuszy błędu z tlo-i-bledy.md i testów k02/k10/k12
- Status: otwarte

### M1-audytor-generalny-014 · Pasek strategii po ocenie bez granicy między dwiema akcjami nie-pas (kontrast 1:1; wada uśpiona przy obecnej treści)
- Pozycja listy kontrolnej: ID źródłowe: 04-studio-projektowe-001
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/04-studio-projektowe/04-studio-projektowe-2026-11-17.md` (sekcja 04-studio-projektowe-001); weryfikacja: g5: kod potwierdzony, skutek uśpiony; P1 → P2
- Test akceptacyjny: granica segmentów ≥ 3:1 wobec wypełnienia w obu motywach; test kontrastu
- Status: otwarte

### M1-audytor-generalny-015 · Haptyka wyboru akcji działa mimo wyłączonych „Wibracji przy odpowiedzi” (PU-022)
- Pozycja listy kontrolnej: ID źródłowe: 04-studio-projektowe-002
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/04-studio-projektowe/04-studio-projektowe-2026-11-17.md` (sekcja 04-studio-projektowe-002); weryfikacja: g6: potwierdzone; P1 → P2 (PU-022 przypisać temu ID)
- Test akceptacyjny: przy wyłączonym przełączniku wybór akcji nie wywołuje haptyki (test); PU-022 = OK
- Status: otwarte

### M1-audytor-generalny-016 · Kontrolka poziomu scenariusza łamie nazwy poziomów przy AX5
- Pozycja listy kontrolnej: ID źródłowe: 04-studio-projektowe-003
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/04-studio-projektowe/04-studio-projektowe-2026-11-17.md` (sekcja 04-studio-projektowe-003); weryfikacja: g5: potwierdzone; P1 → P2
- Test akceptacyjny: przy AX5 i 320 pt nazwy poziomów całe (zawijanie albo układ pionowy); zrzut
- Status: otwarte

### M1-audytor-generalny-017 · Liczby wyników i 6 rozmiarów/krojów tekstu wpisane na sztywno poza skalą motywu
- Pozycja listy kontrolnej: ID źródłowe: 04-studio-projektowe-004, 08-programista-006
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/04-studio-projektowe/04-studio-projektowe-2026-11-17.md` (sekcja 04-studio-projektowe-004); weryfikacja: g5: potwierdzone; P1 → P2; 04-004 i 08-006 jedna przyczyna
- Test akceptacyjny: brak stałych fontSize/fontFamily poza modułem motywu (grep w teście); liczby mieszczą się przy AX5
- Status: otwarte

### M1-audytor-generalny-018 · Tytuły w Literacie nie reagują na „Pogrubiony tekst”
- Pozycja listy kontrolnej: ID źródłowe: 04-studio-projektowe-005
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/04-studio-projektowe/04-studio-projektowe-2026-11-17.md` (sekcja 04-studio-projektowe-005); weryfikacja: g5: potwierdzone; P1 → P2
- Test akceptacyjny: przy włączonym „Pogrubiony tekst” tytuły w wariancie pogrubionym (test z mockiem ustawienia)
- Status: otwarte

### M1-audytor-generalny-019 · Linki „Słowniczek” i „Pomoc” na ekranie Postęp z celem dotyku 24 pt (D-121: 44 pt)
- Pozycja listy kontrolnej: ID źródłowe: 04-studio-projektowe-006
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/04-studio-projektowe/04-studio-projektowe-2026-11-17.md` (sekcja 04-studio-projektowe-006); weryfikacja: g5: potwierdzone; P1 → P2 (próg projektu D-121, nie wydania)
- Test akceptacyjny: cel dotyku ≥ 44 pt (test hitSlop/minHeight)
- Status: otwarte

### M1-audytor-generalny-020 · Skala stopni łamie „Dopuszczalna” w środku wyrazu przy tekście domyślnym 390 pt (D-122)
- Pozycja listy kontrolnej: ID źródłowe: 04-studio-projektowe-007
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/04-studio-projektowe/04-studio-projektowe-2026-11-17.md` (sekcja 04-studio-projektowe-007); weryfikacja: g6: potwierdzone; P1 → P2
- Test akceptacyjny: najdłuższe słowo skali mieści się w 390 i 320 pt (pomiar z pliku fontu w teście)
- Status: otwarte

### M1-audytor-generalny-021 · Polski przecinek dziesiętny na sztywno w wyniku zadania liczbowego i średnim czasie sesji (apps/mobile/src/app/session.tsx:333 i :601)
- Pozycja listy kontrolnej: ID źródłowe: 09-lokalizacja-001
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/09-lokalizacja/09-lokalizacja-2026-11-17.md` (sekcja 09-lokalizacja-001); weryfikacja: g6: potwierdzone; P1 → P2
- Test akceptacyjny: formatowanie liczb przez Intl dla języka interfejsu; test 12 języków
- Status: otwarte

### M1-audytor-generalny-022 · Przypomnienie dzienne zostaje w poprzednim języku po zmianie języka (ADR 0012 pkt 3)
- Pozycja listy kontrolnej: ID źródłowe: 09-lokalizacja-002
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/09-lokalizacja/09-lokalizacja-2026-11-17.md` (sekcja 09-lokalizacja-002); weryfikacja: g6: potwierdzone; P1 → P2
- Test akceptacyjny: zmiana języka planuje przypomnienie od nowa w nowym języku (test)
- Status: otwarte

### M1-audytor-generalny-023 · „Usuń postęp” zostawia na telefonie kopię sprzed importu i odłożoną uszkodzoną bazę; inwentarz prywatności niepełny
- Pozycja listy kontrolnej: ID źródłowe: 05-architekt-007, 12-niezawodnosc-005
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/05-architekt/05-architekt-2026-11-17.md` (sekcja 05-architekt-007); weryfikacja: g3: potwierdzone z korektą (kopia w Library/Caches)
- Test akceptacyjny: po „Usuń postęp” brak plików kopii w Library/Caches i odłożonej bazy (test na systemie plików); inwentarz uzupełniony
- Status: otwarte

### M1-audytor-generalny-024 · Progi oceny i zaliczenia testu w dwóch modułach (KONFIGURACJA i thresholds.ts); trzy implementacje zaliczenia
- Pozycja listy kontrolnej: ID źródłowe: 05-architekt-003, 08-programista-002
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/05-architekt/05-architekt-2026-11-17.md` (sekcja 05-architekt-003); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: jedno źródło progów; test równości albo usunięty duplikat
- Status: otwarte

### M1-audytor-generalny-025 · Funkcje w kodzie bez wiersza F-nn i BR: zakładka „Postęp”, seria dni, „Talia czterokolorowa”, „Wibracje”
- Pozycja listy kontrolnej: ID źródłowe: 03-zakres-002, 11-wzrost-002
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `role/03-zakres/03-zakres-2026-11-17.md` (sekcja 03-zakres-002); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-03: wiersze F-nn/BR z testami albo funkcje usunięte
- Opcje: patrz DEC-03 (Decyzje dla właściciela); Rekomendacja: (a)
- Status: otwarte

### M1-audytor-generalny-026 · 19 kryteriów „Intuicyjność” kontraktu bez przejścia poznawczego
- Pozycja listy kontrolnej: ID źródłowe: 03-zakres-004, 04-studio-projektowe-010
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `role/03-zakres/03-zakres-2026-11-17.md` (sekcja 03-zakres-004); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-04: wynik przejścia poznawczego dla 19 kryteriów w docs/
- Opcje: patrz DEC-04 (Decyzje dla właściciela); Rekomendacja: (a)
- Status: otwarte

### M1-audytor-generalny-027 · Fakty zmienne (rake, dane populacji) bez terminu ponownego odczytu w rejestrze
- Pozycja listy kontrolnej: ID źródłowe: 06-tresci-003, 06-tresci-504
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/06-tresci/06-tresci-2026-11-17.md` (sekcja 06-tresci-003); weryfikacja: g7: potwierdzone; 504 podzbiorem 003
- Test akceptacyjny: kontrola rejestru odrzuca fakt zmienny bez wazne_do
- Status: otwarte

### M1-audytor-generalny-028 · Kontrakt zakresu nieaktualny wobec decyzji po 2026-11-10 (języki 1.0, liczba BR, stan E2E)
- Pozycja listy kontrolnej: ID źródłowe: 03-zakres-003
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/03-zakres/03-zakres-2026-11-17.md` (sekcja 03-zakres-003); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: zakres.mjs --brd kod 0 po aktualizacji; liczba BR zgodna z BRD
- Status: otwarte

### M1-audytor-generalny-029 · Pięć BR w zakresie bez testu z ID w nazwie
- Pozycja listy kontrolnej: ID źródłowe: 03-zakres-005
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/03-zakres/03-zakres-2026-11-17.md` (sekcja 03-zakres-005); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: każdy BR w zakresie ma test z ID (zakres.mjs)
- Status: otwarte

### M1-audytor-generalny-030 · Lekcja M13-L1 uczy czytania „raportu z gry” z żetonami, a tryb gry usunięto (ADR 0011)
- Pozycja listy kontrolnej: ID źródłowe: 01-odkrywanie-005
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `role/01-odkrywanie/01-odkrywanie-2026-11-17.md` (sekcja 01-odkrywanie-005); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-05: lekcja bez odwołań do trybu gry (grep) albo usunięta z programu
- Opcje: patrz DEC-05 (Decyzje dla właściciela); Rekomendacja: (a)
- Status: otwarte

### M1-audytor-generalny-031 · Pusta lista produktów ze sklepu daje ekran zakupu bez planów i komunikatu
- Pozycja listy kontrolnej: ID źródłowe: 02-monetyzacja-004
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/02-monetyzacja/02-monetyzacja-2026-11-17.md` (sekcja 02-monetyzacja-004); weryfikacja: g2: potwierdzone
- Test akceptacyjny: pusta lista → komunikat i ponowienie (test adaptera i ekranu)
- Status: otwarte

### M1-audytor-generalny-032 · Subskrybent nie ma w aplikacji drogi do zakupu dożywotniego
- Pozycja listy kontrolnej: ID źródłowe: 02-monetyzacja-005
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `role/02-monetyzacja/02-monetyzacja-2026-11-17.md` (sekcja 02-monetyzacja-005); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-06
- Opcje: patrz DEC-06 (Decyzje dla właściciela); Rekomendacja: (a)
- Status: otwarte

### M1-audytor-generalny-033 · Scenariusze zakupu na urządzeniu (U-5) bez daty i wyniku
- Pozycja listy kontrolnej: ID źródłowe: 02-monetyzacja-006
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/02-monetyzacja/02-monetyzacja-2026-11-17.md` (sekcja 02-monetyzacja-006); weryfikacja: g2: potwierdzone
- Test akceptacyjny: protokół U-5 z datą i wynikiem przed wysyłką do App Store
- Status: otwarte

### M1-audytor-generalny-034 · Pasek stosu „ty” w ICM 2,90:1 w ciemnym motywie ze zwiększonym kontrastem
- Pozycja listy kontrolnej: ID źródłowe: 04-studio-projektowe-008
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/04-studio-projektowe/04-studio-projektowe-2026-11-17.md` (sekcja 04-studio-projektowe-008); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: kontrast ≥ 3:1 we wszystkich motywach (test kontrastu)
- Status: otwarte

### M1-audytor-generalny-035 · Postęp pokazuje i czyta surowe identyfikatory rodzin zadań („m0.best-hand”)
- Pozycja listy kontrolnej: ID źródłowe: 04-studio-projektowe-009
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/04-studio-projektowe/04-studio-projektowe-2026-11-17.md` (sekcja 04-studio-projektowe-009); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: brak surowych ID w tekstach i etykietach dostępności (test)
- Status: otwarte

### M1-audytor-generalny-036 · Wygaśnięcie czasu w tle zostawia otwartą transakcję długiej operacji (skutek 0xdead10cc niepotwierdzony; P1, jeśli U-2 potwierdzi)
- Pozycja listy kontrolnej: ID źródłowe: 05-architekt-002
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/05-architekt/05-architekt-2026-11-17.md` (sekcja 05-architekt-002); weryfikacja: g4: mechanizm potwierdzony, skutek niepotwierdzony
- Test akceptacyjny: handler wygaśnięcia wycofuje transakcję przed endBackgroundTask; U-2 na telefonie
- Status: otwarte

### M1-audytor-generalny-037 · Silnik gry z botami nadal w kodzie wbrew ADR 0011
- Pozycja listy kontrolnej: ID źródłowe: 05-architekt-004
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/05-architekt/05-architekt-2026-11-17.md` (sekcja 05-architekt-004); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: brak modułu silnika gry (grep) i zależnych testów
- Status: otwarte

### M1-audytor-generalny-038 · Kontrola granic K-01 nie działa w CI; 11 plików źródłowych ponad 20 KB
- Pozycja listy kontrolnej: ID źródłowe: 05-architekt-005
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/05-architekt/05-architekt-2026-11-17.md` (sekcja 05-architekt-005); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: K-01 w pnpm run ci, czerwona przy naruszeniu (próba negatywna)
- Status: otwarte

### M1-audytor-generalny-039 · Zapytanie wejścia do scenariuszy skanuje całą tabelę odpowiedzi (B-4 bez pomiaru)
- Pozycja listy kontrolnej: ID źródłowe: 05-architekt-006
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/05-architekt/05-architekt-2026-11-17.md` (sekcja 05-architekt-006); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: indeks albo zapytanie z planem bez SCAN; pomiar na danych 3 lat
- Status: otwarte

### M1-audytor-generalny-040 · Zdanie ekranu „Pomoc” o hazardzie bez twierdzenia w rejestrze (źródło GB odczytane)
- Pozycja listy kontrolnej: ID źródłowe: 06-tresci-002
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: raport źródłowy `role/06-tresci/06-tresci-2026-11-17.md` (sekcja 06-tresci-002); weryfikacja: g7: potwierdzone (zdanie prawdziwe)
- Test akceptacyjny: wpis w rejestrze z przeczytanym źródłem dla rynku sprzedaży
- Status: otwarte

### M1-audytor-generalny-041 · Przegląd zastępczy n:dd.bi.small zapisany tak, że kontrola uznaje go za przegląd człowieka
- Pozycja listy kontrolnej: ID źródłowe: 06-tresci-004
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/06-tresci/06-tresci-2026-11-17.md` (sekcja 06-tresci-004); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: pole kto rozróżnia przegląd zastępczy; kontrola biblioteki kod 0
- Status: otwarte

### M1-audytor-generalny-042 · „Mały blind wobec Buttona prawie nic nie sprawdza” — atrybucja do jednego rozwiązania
- Pozycja listy kontrolnej: ID źródłowe: 06-tresci-502
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: raport źródłowy `role/06-tresci-b/06-tresci-2026-11-17.md` (sekcja 06-tresci-502); weryfikacja: g7: potwierdzone, słabsze (P2 niskie)
- Test akceptacyjny: zdanie z atrybucją albo przedziałem obejmującym źródła
- Status: otwarte

### M1-audytor-generalny-043 · „Rywal chybia flop … dlatego mały c-bet się opłaca”: związek przyczynowy bez źródła
- Pozycja listy kontrolnej: ID źródłowe: 06-tresci-503
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: raport źródłowy `role/06-tresci-b/06-tresci-2026-11-17.md` (sekcja 06-tresci-503); weryfikacja: g7: potwierdzone; zarzut sprzeczności częściowo obalony
- Test akceptacyjny: zdanie bez nieźródłowego „dlatego” albo ze źródłem szczebla 1–2
- Status: otwarte

### M1-audytor-generalny-044 · Katalog PU bez przypadków klasy A; opis PU-001…010 nieaktualny (bramka „A wykonane” nie sprawdza nic)
- Pozycja listy kontrolnej: ID źródłowe: 07-jakosc-001
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/07-jakosc/07-jakosc-2026-11-17.md` (sekcja 07-jakosc-001); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: flowy E2E spełniające warunki A przeniesione do klasy A; bramka scenariuszy z próbą negatywną
- Status: otwarte

### M1-audytor-generalny-045 · Eksport i import sprawdzane tylko na syntetycznym wzorcu: brak pliku z telefonu i testu własności
- Pozycja listy kontrolnej: ID źródłowe: 07-jakosc-002
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/07-jakosc/07-jakosc-2026-11-17.md` (sekcja 07-jakosc-002); weryfikacja: g4: potwierdzone
- Test akceptacyjny: test własności (fast-check) roundtrip eksport→import; wzorzec z telefonu (T-06)
- Status: otwarte

### M1-audytor-generalny-046 · Nocne testy (Stryker, fast-check ×1000, E2E na małym ekranie) nigdy nie biegły: nocny.yml niezarejestrowany
- Pozycja listy kontrolnej: ID źródłowe: 07-jakosc-003
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/07-jakosc/07-jakosc-2026-11-17.md` (sekcja 07-jakosc-003); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: nocny.yml zarejestrowany na main (za zgodą właściciela) i pierwszy przebieg z wynikiem
- Status: otwarte

### M1-audytor-generalny-047 · Akcja pnpm/action-setup@v5 nieprzypięta do SHA (15 użyć, także w zadaniu z kluczem ASC)
- Pozycja listy kontrolnej: ID źródłowe: 07-jakosc-004
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/07-jakosc/07-jakosc-2026-11-17.md` (sekcja 07-jakosc-004); weryfikacja: g4: potwierdzone (15 użyć)
- Test akceptacyjny: wszystkie akcje spoza actions/* przypięte do SHA (test workflowy.test.mjs)
- Status: otwarte

### M1-audytor-generalny-048 · Testy czekają stałym czasem (setTimeout 20–50 ms) i biorą dzień z zegara systemowego
- Pozycja listy kontrolnej: ID źródłowe: 07-jakosc-005
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/07-jakosc/07-jakosc-2026-11-17.md` (sekcja 07-jakosc-005); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: testy z fałszywym zegarem i waitFor zamiast setTimeout
- Status: otwarte

### M1-audytor-generalny-049 · Dziennik rozdania używa nazwy ulicy jako klucza React (SC-06, SC-08)
- Pozycja listy kontrolnej: ID źródłowe: 08-programista-003
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/08-programista/08-programista-2026-11-17.md` (sekcja 08-programista-003); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: brak ostrzeżeń „same key” w logu testów
- Status: otwarte

### M1-audytor-generalny-050 · Każdy komponent z useTokens osobno odpytuje „Zwiększ kontrast” (mignięcie palety, 77 nasłuchów)
- Pozycja listy kontrolnej: ID źródłowe: 08-programista-004
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/08-programista/08-programista-2026-11-17.md` (sekcja 08-programista-004); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: jeden nasłuch w kontekście motywu; test bez mignięcia
- Status: otwarte

### M1-audytor-generalny-051 · Skrypt lint (expo lint) nie działa: brak ESLint; 21 wyłączeń reguł bez kontroli
- Pozycja listy kontrolnej: ID źródłowe: 08-programista-005
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `role/08-programista/08-programista-2026-11-17.md` (sekcja 08-programista-005); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-07
- Opcje: patrz DEC-07 (Decyzje dla właściciela); Rekomendacja: (a)
- Status: otwarte

### M1-audytor-generalny-052 · Godzina odnowienia limitu zawsze 24 h, dzień w historii jako surowe RRRR-MM-DD
- Pozycja listy kontrolnej: ID źródłowe: 09-lokalizacja-003
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/09-lokalizacja/09-lokalizacja-2026-11-17.md` (sekcja 09-lokalizacja-003); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: formaty daty i godziny przez Intl dla języka (test)
- Status: otwarte

### M1-audytor-generalny-053 · Listy sklejane łacińskim „, ” także w ja i zh-Hant
- Pozycja listy kontrolnej: ID źródłowe: 09-lokalizacja-004
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/09-lokalizacja/09-lokalizacja-2026-11-17.md` (sekcja 09-lokalizacja-004); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: Intl.ListFormat albo separator z tłumaczeń (test ja, zh-Hant)
- Status: otwarte

### M1-audytor-generalny-054 · Angielskie nazwy terminów bez accessibilityLanguage
- Pozycja listy kontrolnej: ID źródłowe: 09-lokalizacja-005
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/09-lokalizacja/09-lokalizacja-2026-11-17.md` (sekcja 09-lokalizacja-005); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: accessibilityLanguage dla terminów obcojęzycznych (test)
- Status: otwarte

### M1-audytor-generalny-055 · Rejestr języków bez wierszy dla wydanych de, es, ko, it, vi
- Pozycja listy kontrolnej: ID źródłowe: 09-lokalizacja-006
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `role/09-lokalizacja/09-lokalizacja-2026-11-17.md` (sekcja 09-lokalizacja-006); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-08
- Opcje: patrz DEC-08 (Decyzje dla właściciela); Rekomendacja: (b)
- Status: otwarte

### M1-audytor-generalny-056 · Zrzuty w najdłuższym języku i pseudolokalizacji tylko dla ekranu scenariusza
- Pozycja listy kontrolnej: ID źródłowe: 09-lokalizacja-007
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `role/09-lokalizacja/09-lokalizacja-2026-11-17.md` (sekcja 09-lokalizacja-007); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-08
- Opcje: patrz DEC-08 (Decyzje dla właściciela); Rekomendacja: (b)
- Status: otwarte

### M1-audytor-generalny-057 · 114 z 877 kluczy źródła bez kontekstu dla tłumacza
- Pozycja listy kontrolnej: ID źródłowe: 09-lokalizacja-008
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/09-lokalizacja/09-lokalizacja-2026-11-17.md` (sekcja 09-lokalizacja-008); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: każdy klucz z opisem w pl.kontekst.json (sprawdz-i18n)
- Status: otwarte

### M1-audytor-generalny-058 · Ankieta wiekowa (D-310) nieoceniona ponownie po wejściu scenariuszy do 1.0 (D-530)
- Pozycja listy kontrolnej: ID źródłowe: 10-wydanie-004
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: raport źródłowy `role/10-wydanie/10-wydanie-2026-11-17.md` (sekcja 10-wydanie-004); weryfikacja: g1: potwierdzone
- Test akceptacyjny: zapisana ponowna ocena odpowiedzi (Simulated Gambling) przed wpisem w ASC
- Status: otwarte

### M1-audytor-generalny-059 · Strona produktu w 6 językach, build w 12 (fala 2 w docs/)
- Pozycja listy kontrolnej: ID źródłowe: 10-wydanie-005
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `role/10-wydanie/10-wydanie-2026-11-17.md` (sekcja 10-wydanie-005); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-09
- Opcje: patrz DEC-09 (Decyzje dla właściciela); Rekomendacja: (a)
- Status: otwarte

### M1-audytor-generalny-060 · Plan zrzutów sklepu nie pokazuje ocenionej decyzji ani scenariusza
- Pozycja listy kontrolnej: ID źródłowe: 10-wydanie-006
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `role/10-wydanie/10-wydanie-2026-11-17.md` (sekcja 10-wydanie-006); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-10
- Opcje: patrz DEC-10 (Decyzje dla właściciela); Rekomendacja: (a)
- Status: otwarte

### M1-audytor-generalny-061 · .gitignore w katalogu głównym bez *.p8, *.p12, credentials.json, .env
- Pozycja listy kontrolnej: ID źródłowe: 10-wydanie-007
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/10-wydanie/10-wydanie-2026-11-17.md` (sekcja 10-wydanie-007); weryfikacja: g1: potwierdzone (niskie)
- Test akceptacyjny: wzorce w .gitignore; test workflowy/ignore
- Status: otwarte

### M1-audytor-generalny-062 · Dwa źródła numeru buildu i nieaktualne workflowy ad hoc
- Pozycja listy kontrolnej: ID źródłowe: 10-wydanie-008
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: D
- Dowód: raport źródłowy `role/10-wydanie/10-wydanie-2026-11-17.md` (sekcja 10-wydanie-008); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: jedno źródło numeru buildu (test)
- Status: otwarte

### M1-audytor-generalny-063 · Hipotezy BRD bez progu, próby, ID decyzji i daty oceny
- Pozycja listy kontrolnej: ID źródłowe: 11-wzrost-003
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `role/11-wzrost/11-wzrost-2026-11-17.md` (sekcja 11-wzrost-003); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-11
- Opcje: patrz DEC-11 (Decyzje dla właściciela); Rekomendacja: (b)
- Status: otwarte

### M1-audytor-generalny-064 · Po premierze brak sprawdzonej drogi, którą właściciel bez Maca dowie się o awarii
- Pozycja listy kontrolnej: ID źródłowe: 12-niezawodnosc-004
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `role/12-niezawodnosc/12-niezawodnosc-2026-11-17.md` (sekcja 12-niezawodnosc-004); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-12
- Opcje: patrz DEC-12 (Decyzje dla właściciela); Rekomendacja: (a)
- Status: otwarte

### M1-audytor-generalny-065 · Uszkodzona kopia pliku treści nie wraca z paczki; ekran błędu bez wyjścia poza reinstalacją
- Pozycja listy kontrolnej: ID źródłowe: 12-niezawodnosc-006
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: raport źródłowy `role/12-niezawodnosc/12-niezawodnosc-2026-11-17.md` (sekcja 12-niezawodnosc-006); weryfikacja: g4: potwierdzone (sonda kod 0)
- Test akceptacyjny: uszkodzona kopia treści odtwarzana z paczki przy starcie (test)
- Status: otwarte

### M1-audytor-generalny-066 · Brak oceny praw USA o weryfikacji wieku (Teksas od 2026-06, Utah, Luizjana) i decyzji o Declared Age Range API
- Pozycja listy kontrolnej: GEN-02
- Poziom: P2 — nie blokuje (CLAUDE.md pkt 1)
- Realność: realny · Pewność: średnia
- Rodzaj: P
- Dowód: raport źródłowy `linia-bazowa.md` (sekcja M1-audytor-generalny-066); weryfikacja: nie dotyczy (P2 poza obszarem krytycznym)
- Test akceptacyjny: wg DEC-13: zapisana decyzja roli 10 przed wysyłką do App Store
- Opcje: patrz DEC-13 (Decyzje dla właściciela); Rekomendacja: (a)
- Status: otwarte

Wybrane miejsca kodu (sprawdzone przez M1 na f75acdff): apps/mobile/src/platform/adresy.ts:9 (ADRES_PRYWATNOSCI = null; 001), apps/mobile/src/app/purchase.tsx:29 (przycisk otwiera tylko niepusty adres; 001), apps/mobile/src/features/dzis/widok.ts:99 (stan `wkrotce`; 005), apps/mobile/src/app/session.tsx:601 (zamiana kropki na przecinek; 021), apps/mobile/src/platform/zakupy.ts:122 (ok:true z pustą listą; 031), apps/mobile/src/components/PasekStrategii.tsx:93 (haptyka; 015), docs/brd/README.md:33 (RD-11 bloker wydania; 004).

## Do sprawdzenia (pewność ≤ 80%)
- 036 (05-architekt-002): skutek 0xdead10cc wymaga U-2 na telefonie; potwierdzenie → P1.
- 016, 017, 020: wygląd przy AX5 na iOS (SF Pro) tylko rachunkiem i zrzutem web — zrzut z telefonu.
- Info.plist z archiwum Release: NSAllowsArbitraryLoads i opis sieci lokalnej z expo-dev-client (rola 10, „Do sprawdzenia”).
- 058: czy ćwiczenia decyzji to „Infrequent simulated gambling” (rola 10 rekomenduje Infrequent; rating regionalny BR).

## Co działa dobrze i należy zachować
- CI zielone na SHA audytu (ponad 3600 testów), E2E iOS zielone; bramka scenariuszy na ścieżce buildu (próba negatywna kod 1).
- Warstwa danych: brak INSERT OR REPLACE, migracje w transakcji z testem v1→v3, import w jednej transakcji, kopia VACUUM INTO; dane przetrwały każdą odtworzoną awarię.
- Prywatność: zero SDK i ruchu sieciowego, manifest prywatności, „Data Not Collected” zgodne z kodem; prośba o ocenę tylko systemowa.
- Treść: 834 liczby, 42 reguły rachunkowe, 11 twierdzeń krytycznych i próbka 28 niekrytycznych — zgodne ze źródłami czytanymi dziś; liczby przez `{{n:…}}` z numbers.yaml.
- Lokalizacja: mechanizm i18n dojrzały, 12 języków, skrypt projektu 0 błędów.
- Wektory dostępu (limit, zakup) 12/12, wydanie i publikacja tylko ręcznie, historia commitów bez sekretów.

## Decyzje dla właściciela
- **DEC-01** Adres e-mail kontaktu i dane sprzedawcy (W-04) dla polityki prywatności, strony wsparcia, notatek App Review i strony JP 特定商取引法 (D-361): (a) Właściciel podaje teraz e-mail i dane sprzedawcy; 08 podpina ADRES_PRYWATNOSCI (D-308) i ADRES_KONTAKTOWY, 10 uzupełnia site/ i notatki z jednego źródła — pełna naprawa 001 i 11-wzrost-001; wymaga decyzji o publicznym adresie (DSA dla FR/DE); (b) Teraz tylko ADRES_PRYWATNOSCI (adres z D-308), kontakt i dane sprzedawcy przed wysyłką do App Store — szybciej zamyka przycisk; wysyłka do App Store nadal zablokowana. **Rekomendacja: (a)**. Dotyczy: 10-wydanie-001, 02-monetyzacja-001, 01-odkrywanie-002, 11-wzrost-001.
- **DEC-02** Strażnik pętli awarii i tryb awaryjny jak w Treningu?: (a) Dodać strażnika i tryb awaryjny z eksportem (analogia Trening, D-191) — praca 08 i test; mniejsze ryzyko utraty dostępu do danych; (b) Odstępstwo nazwane w ADR (dziś brak awarii) — zero pracy teraz; brak wyjścia przy pętli awarii u pierwszych użytkowników. **Rekomendacja: (a)**. Dotyczy: 12-niezawodnosc-003.
- **DEC-03** Funkcje bez wiersza w kontrakcie (zakładka Postęp, seria dni, talia czterokolorowa, wibracje): (a) Dopisać F-nn i BR z testami (03), ukryć surowe ID — zgodność z zasadą 18 bez utraty funkcji; (b) Usunąć serię dni i zbędne przełączniki — mniej kodu; tracimy element powrotu (opis sklepu obiecuje serię). **Rekomendacja: (a)**. Dotyczy: 03-zakres-002, 11-wzrost-002.
- **DEC-04** Przejście poznawcze 19 kryteriów „Intuicyjność” — kiedy?: (a) Rola 04 robi przejście poznawcze przed wysyłką do App Store — koszt jednej sesji 04; dowód warunku zasady 18; (b) Po 1.0, z testem F właściciela jako zastępczym — tańsze teraz; kryteria zakresu bez wyniku przy publikacji. **Rekomendacja: (a)**. Dotyczy: 03-zakres-004, 04-studio-projektowe-010.
- **DEC-05** Lekcja M13-L1 o „raporcie z gry” po usunięciu trybu gry (ADR 0011): (a) Przepisać lekcję na przegląd własnych decyzji z sesji (bez żetonów) — zachowuje temat przeglądu gry; praca 06 + przekład 12 języków; (b) Usunąć lekcję z programu — mniej pracy; luka w module „przegląd własnej gry” obiecanym w opisie sklepu. **Rekomendacja: (a)**. Dotyczy: 01-odkrywanie-005.
- **DEC-06** Droga subskrybent → dożywotni w aplikacji: (a) Bez zmian do danych o udziale planów — zero pracy; subskrybent kupuje dożywotni tylko przez sklep; (b) Dodać ścieżkę upgrade z ekranu zakupu — więcej przychodu z dożywotniego; praca 02/08 i testy StoreKit. **Rekomendacja: (a)**. Dotyczy: 02-monetyzacja-005.
- **DEC-07** Skrypt lint bez ESLint: (a) Dodać ESLint z konfiguracją Expo do pnpm run ci — bramka mechaniczna (zasada 21); jednorazowa praca i możliwe poprawki; (b) Usunąć skrypt lint i martwe wyłączenia — zero nowych bramek; martwy skrypt znika. **Rekomendacja: (a)**. Dotyczy: 08-programista-005.
- **DEC-08** Kontrole polityki języków: rejestr i zrzuty pseudolokalizacji: (a) Uzupełnić rejestr i zrzuty pseudolokalizacji wszystkich ekranów przed App Store — pełna kontrola; pełna aplikacja nie startuje w Expo web — duży koszt; (b) Teraz rejestr języków; zrzuty wszystkich ekranów po 1.0 — tanio; ucięcia poza scenariuszem wykryje dopiero test F. **Rekomendacja: (b)**. Dotyczy: 09-lokalizacja-006, 09-lokalizacja-007.
- **DEC-09** Strona produktu w 6 czy 12 językach na start: (a) Metadane fali 2 (12 języków, m.in. de-DE) przed wysyłką do App Store — spójność z buildem; praca 10 + przegląd; (b) Start z 6 językami — szybciej; rynek DE bez lokalnej strony. **Rekomendacja: (a)**. Dotyczy: 10-wydanie-005.
- **DEC-10** Plan zrzutów sklepu: (a) Dodać zrzuty ocenionej decyzji i scenariusza — pokazuje główną pracę; praca 10/04; (b) Bez zmian — zero pracy; zrzuty nie pokazują wyróżnika. **Rekomendacja: (a)**. Dotyczy: 10-wydanie-006.
- **DEC-11** Hipotezy wzrostu z progami i datami: (a) Teraz: build roli 11 (docs/wzrost.md, progi, próby, daty) — plan gotowy przed premierą; koszt sesji; (b) Po premierze, gdy będą dane — tanio teraz; decyzje po premierze bez progów. **Rekomendacja: (b)**. Dotyczy: 11-wzrost-003.
- **DEC-12** Sygnał o awariach po premierze bez Maca: (a) Raporty awarii TestFlight/App Store Connect czytane przez właściciela + e-mail z W-04 w aplikacji — bez SDK; wymaga rytmu właściciela; (b) Bez kanału do pierwszych użytkowników — zero pracy; awarie widoczne dopiero w recenzjach. **Rekomendacja: (a)**. Dotyczy: 12-niezawodnosc-004.
- **DEC-13** Prawa USA o weryfikacji wieku (Teksas od 2026-06, Utah, Luizjana) przy kategorii 18+: (a) Rola 10 ocenia wymagania (Declared Age Range API, „istotna zmiana”) i zapisuje decyzję przed wysyłką — koszt krótkiej sesji 10; ryzyko odrzucenia albo naruszenia nazwane; (b) Przyjąć ryzyko bez oceny — zero pracy; nieznane ryzyko na rynku głównym. **Rekomendacja: (a)**. Dotyczy: M1-audytor-generalny-066.
- Krok właściciela przed buildem 1012 (niezależny od decyzji): uzupełnić protokół F buildu 1011 (10 pozycji, JAK-19); PU-022 przypisać do M1-audytor-generalny-015.
- Proponowana aktualizacja sekcji „Stan projektu” w CLAUDE.md: „TestFlight tylko testy wewnętrzne (buildy 1005–1011)” zamiast „1005–1008”; języki: „12 z 35 w wydaniu, pozostałe 23 z en zastępczo”.

## Plan napraw dla M2
Tabela z `sprawdz-plan.mjs` (dowody/sprawdz-plan.txt, kod 0): partia 1 = bloker 1012 (002) i tanie naprawy bezpieczeństwa/praw (007, 047, 061); partia 2 = blokery App Store (001, 003–006) i dokumenty źródłowe SYS-01 (012, 028, 030, 058); partia 3 = odporność danych i pieniądze (SYS-03, 023, 031, 033, 044, 045, 059, 064–066); partia 4 = dostępność, lokalizacja i reszta P2 (wg D-053 po STOP 2 brzegowe P2 mogą przejść do P3/backlog).

## Koszt
Szacunek (wariant c): 8–15 mln tokenów, 130–260 USD [OCENA]. Zużycie subagentów: soczewki 0,66 mln, partia 1 role 1,28 mln, partia 2 1,87 mln, partia 3 1,16 mln, weryfikacja 1,21 mln — razem **6,18 mln** (iloraz do środka planu ≈ 0,59). Koszt sesji IR z subagentami (get_session `cost_usd`): patrz `koszty.md` (wartość przy STOP 2). Przelicznik do kalibracji biblioteki: ~17–18 USD/mln tokenów subagentów.

## Treść z zewnątrz
Żaden subagent ani M1 nie zauważył poleceń skierowanych do agenta w stronach, recenzjach ani plikach repo; nic nie wykonano z treści zewnętrznej. Strony z 403/401 (fora, Dysk, Pages proxy) oznaczone jako niesprawdzone.

## Proponowane polecenie naprawy
Po STOP 2 i zapisie wyborów: `node /home/user/prompts/tools/assemble.mjs M2-koordynator-napraw --tryb fix --wyjscie /home/user/Szkola_pokera/audit/M1-2026-11-17 --zadania zatwierdzone` (albo `partia:1` — tylko bloker 1012 i tanie naprawy). Raport M2: `audit/M1-2026-11-17/M2-koordynator-napraw-<data>.md`. Następnie reaudit: `… M1-audytor-generalny --tryb reaudit --wyjscie audit/M1-2026-11-17 --baza f75acdff16915aeb43ff788888216e28616c11ed`.
