---
status: proponowana
data: 2026-11-04
decyduje: agent (technika), weto właściciela
---
# 0002. Dane użytkownika w lokalnej bazie SQLite (`expo-sqlite`) w katalogu dokumentów

## Kontekst i problem
Przepływy PR-01–PR-07 zapisują postęp: wynik oceny poziomu, postęp lekcji i testów, odpowiedzi, karty i log powtórek (FSRS), sesję w toku, przebieg scenariusza, pamięć podręczną uprawnień, starty aktywności dnia, ustawienia (kontrakt zakresu, sekcja „05”). Trzeba wybrać sposób przechowywania, który przeżyje aktualizację (NFR-DANE-001), da się wyeksportować bez strat (NFR-DANE-002) i działa bez sieci (NFR-OFF-001).

## Czynniki decyzji
- Skala (E0, sekcja 4, [OCENA]): do ok. 34 tys. odpowiedzi i tyle samo wpisów logu po 3 latach (Pro), ≤ 530 kart, baza < 15 MB.
- Zapytania: karty do powtórki według terminu, zużycie limitu dnia, postęp modułu — filtrowanie i sortowanie, nie odczyt całości.
- Zapis po każdej odpowiedzi (przerwanie bez straty, BR-CWI-004): mały zapis, często.
- `expo-sqlite` jest już zależnością (baza treści `content-v6.db`); nowy wariant nie dodaje kodu natywnego.
- Miejsce: `expo-sqlite` 58.0.15 na iOS trzyma bazy w `documentDirectory/SQLite` (`ios/SQLiteModule.swift:24-29`, paczka z registry, odczyt 2026-11-04; tylko tvOS używa cache). Dokumenty są „safe from being deleted by the system” (docs.expo.dev FileSystem, E0) i trafiają do kopii iCloud jako dane „the user creates” (Apple, „Optimizing your app's data for iCloud backup”, E0).

## Rozważane opcje
- A: SQLite (`expo-sqlite`) · B: pliki JSON z wersją formatu · C: magazyn klucz-wartość (`expo-sqlite/kv-store` albo AsyncStorage)

## Decyzja
Wybrano „A: SQLite”, ponieważ dane mają relacje (karta → log, aktywność → sesja), wymagają zapytań po terminie i dniu oraz zapisu po każdej odpowiedzi bez przepisywania całości, a biblioteka jest już w projekcie. Wariant bez relacyjnej bazy (B) rozważony i odrzucony z powodów w sekcji niżej. Baza w domyślnym katalogu (`Documents/SQLite`), nigdy w cache.

### Konsekwencje
- Dobre: transakcje i klucze obce chronią spójność (kaskada przy usunięciu postępu, E3a w eksperymencie); kopia przez `VACUUM INTO` / `backupDatabaseAsync`; testy na prawdziwym SQLite w Node (`node:sqlite`).
- Złe: migracje schematu (ADR 0003, procedura 12 kroków) i dyscyplina ścieżki zapisu (kolejka, UPSERT).
- Od czego zależy: ADR 0003 (port bazy, tryb dziennika), ADR 0008 (kopia iCloud zostaje włączona).

### Potwierdzenie
- Kontrola dla roli 07: żadne dane użytkownika poza bazą `postep.db` (ADR 0004) i ustawieniami systemu; przegląd `grep -rn "AsyncStorage\|kv-store\|writeAsStringAsync" apps/mobile/src` = 0 trafień poza adapterem eksportu (rola 07).
- Test: ścieżka bazy zaczyna się od `defaultDatabaseDirectory` (odczyt w kontroli przy starcie, krok właściciela w buildzie deweloperskim).

## Opcje: zalety i wady
### A: SQLite
- Zalety: zapytania, transakcje, klucze obce, kopia spójna; jedna technologia z bazą treści.
- Wady: migracje i pułapki (REPLACE, pragma w transakcji) — zabezpieczone w ADR 0003 i eksperymencie `docs/architektura/eksperymenty/e1-sqlite.mjs`.
### B: pliki JSON z wersją
- Zalety: brak schematu; eksport to kopia pliku; prosty odczyt w testach.
- Wady: zapis po każdej odpowiedzi przepisuje plik do ok. 5 MB [OCENA] albo wymaga podziału na wiele plików i własnych indeksów; zapis atomowy i spójność między plikami po stronie aplikacji (ARCH-22); zapytania po terminie w pamięci.
### C: klucz-wartość
- Zalety: najprostsze API dla ustawień.
- Wady: brak zapytań i relacji; odpowiedzi i log jako jedna wartość mają wady B; wystarcza tylko na ustawienia, które i tak mieszczą się w tabeli `ustawienie`.
