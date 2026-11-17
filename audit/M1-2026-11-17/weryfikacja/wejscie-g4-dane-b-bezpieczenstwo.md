### 07-jakosc-002 · Eksport i import sprawdzane na jednym syntetycznym wzorcu: brak pliku z telefonu i testu własności, które zapowiada strategia
- Katalog dowodów: audit/M1-2026-11-17/role/07-jakosc/
- Poziom: P2 (ŚREDNIE; parser importu nie jest danymi głównego przepływu nauki; ryzyko danych pokrywają testy przykładowe i PU-014 klasy F)
- Realność: brzegowy · Pewność: wysoka
- Dowód: `docs/jakosc/strategia.md:169` plan „→ `tests/dane/eksport/eksport-<build>.json`” co wydanie, a `ls tests/dane` = tylko `k08`; `docs/jakosc/strategia.md:121` przypisuje fast-check do „R-14 (generator stanu bazy)”, a `grep -rln fast-check packages/postep` = 0; jedyny roundtrip: `packages/postep/test/k11-dane.test.ts:37` „eksport → import na czystej instalacji: 0 różnic” na wzorcu z `tests/narzedzia/wzorzec-bazy.ts`.
- Kroki w aplikacji: Ustawienia → Dane → Eksport na telefonie, Import tego pliku; błąd adaptera widoczny dopiero u użytkownika

### 12-niezawodnosc-006 · Uszkodzona kopia pliku treści na urządzeniu nie wraca do pliku z paczki; ekran błędu bez wyjścia poza reinstalacją
- Katalog dowodów: audit/M1-2026-11-17/role/12-niezawodnosc/
- Poziom: P2 (ŚREDNIE); skutek byłby P0 (główny przepływ bez treści), ale realność teoretyczna, a dane użytkownika zostają
- Realność: teoretyczny (plik w `Documents` zapisany kopią i przemianowaniem; uszkodzenie wymaga awarii nośnika albo systemu)   · Pewność: wysoka
- Dowód: plan kopiuje tylko, gdy pliku nie ma: `packages/domena/src/tresc.ts:39` „kopiuj: !wej.naUrzadzeniu.includes(plik),”. Sonda: po uszkodzeniu nagłówka kopii na urządzeniu (plik w paczce zdrowy) 3 kolejne starty dają `tresc_niedostepna`, wywołania `lista,lista,otworz` bez `kopiuj` (dowody/sonda-tresc.txt, kod 0). Ekran: ten sam ogólny ekran z ponowieniem (`apps/mobile/src/app/_layout.tsx:151`)
- Kroki w aplikacji: kopia `tresc-<wersja>-<język>.db` uszkodzona → start → „Tego ekranu nie udało się wyświetlić” → ponowienie bez skutku; reinstalacja bez eksportu kasuje postęp

### 05-architekt-002 · Wygaśnięcie czasu w tle i odmowa czasu zostawiają otwartą transakcję długiej operacji w chwili zawieszenia
- Katalog dowodów: audit/M1-2026-11-17/role/05-architekt/
- Poziom: P2 (lista daje P1 przy potwierdzonym zakończeniu w tle; tu mechanizm pewny, zakończenie nie potwierdzone na urządzeniu, wyzwalacz rzadki)
- Realność: brzegowy   · Pewność: wysoka (mechanizm), średnia (skutek `0xdead10cc` dla bazy w `Documents`)
- Dowód: handler wygaśnięcia wysyła zdarzenie do JS i od razu kończy zadanie: `apps/mobile/modules/ochrona-tla/ios/OchronaTlaModule.swift:40` „self.sendEvent("wygasa", ["id": biezace.rawValue])”, w następnej linii `endBackgroundTask`. Wycofanie robi JS dopiero przy następnej instrukcji (`packages/postep/src/port.ts:65` „if (flaga.przerwij) throw new PrzerwanoWTle();”), więc po powrocie handlera transakcja jest jeszcze otwarta. Przy odmowie czasu (−1) nie ma żadnego przerwania: `packages/postep/src/port.ts:61` „if (!ochrona) return praca(port);” dotyczy braku modułu, a dla −1 flaga nie ma źródła, bo ADR 0013 pkt 4–5 (nasłuch `AppState`) nie jest wdrożony: `docs/adr/0013-ochrona-dlugich-operacji-przed-zawieszeniem.md:32` „nie przyjmuje nowych zadań długich i kończy kolejkę”; 0 wywołań `AppState` (dowody/arch13-14-appstate.txt). Apple (odczyt 2026-11-17, dowody/arch13-apple-odczyt.txt): handler „Use this handler to clean up and mark the end of the background task.”, „The system calls the handler synchronously on the main thread, blocking the app’s suspension momentarily.”; SIGKILL: aplikacja „held on to a file lock or SQLite database lock during suspension”.
- Kroki w aplikacji: import pliku 3-letniego na najstarszym telefonie, wyjście do ekranu głównego zaraz po starcie importu; gdy import trwa dłużej niż czas przyznany w tle (albo system nie przyzna czasu), aplikacja zostaje zawieszona z otwartą transakcją. Dane są bezpieczne (dziennik `DELETE` wycofa transakcję przy następnym otwarciu), ale import przepada bez komunikatu, a przy zakończeniu przez system zostaje raport `0xdead10cc`.

### 01-odkrywanie-004 · Wymagania danych bez scenariuszy błędu: nieudany eksport, przerwane usuwanie, nieudana migracja
- Katalog dowodów: audit/M1-2026-11-17/role/01-odkrywanie/
- Poziom: P1 (bez blokady wg CLAUDE.md pkt 1; dotyczy kryteriów zapisu danych, nie stwierdzonej utraty)
- Realność: brzegowy · Pewność: wysoka
- Dowód:
  - BR-DANE-001 ma tylko dwa scenariusze: `docs/brd/wymagania-sklep.md:153` „Scenariusz: Eksport bez zakupu” i „Data ostatniego eksportu”
  - BR-DANE-003 tylko dwa: `docs/brd/wymagania-sklep.md:188` „Scenariusz: Usunięcie z potwierdzeniem” i „Rezygnacja”
  - BR-DANE-004 bez scenariusza nieudanej migracji: `docs/brd/wymagania-sklep.md:201` „Scenariusz: Nowa wersja ze zmianą schematu bazy”
  - wzór: BR-DANE-002 ma scenariusze błędu (plik uszkodzony, nowsza wersja)
- Kroki w aplikacji: eksport przerwany w arkuszu udostępniania albo przy braku miejsca; usunięcie przerwane zamknięciem aplikacji; aktualizacja z migracją przerwana.

### 07-jakosc-004 · Akcja `pnpm/action-setup@v5` spoza `actions/*` nieprzypięta do SHA, także w zadaniu z kluczem App Store Connect
- Katalog dowodów: audit/M1-2026-11-17/role/07-jakosc/
- Poziom: P2 (ŚREDNIE)
- Realność: teoretyczny · Pewność: wysoka
- Dowód: 16 użyć bez SHA (dowody/jak09-10-workflowy-grep.txt), kontrola projektu dopuszcza tag: `tests/narzedzia/workflowy.test.mjs:29` „akcje przypięte do wersji głównej albo SHA”. Przykłady: `.github/workflows/testflight.yml:101` (zadanie `build`, które dalej zapisuje klucz ASC w kroku z `.github/workflows/testflight.yml:136`) i `.github/workflows/przeklad-tlumaczen.yml:62` (sekret `ANTHROPIC_API_KEY` w `.github/workflows/przeklad-tlumaczen.yml:82`).
- Kroki w aplikacji: brak bezpośrednich; skutek to możliwy wyciek klucza ASC (rola Admin) albo API

