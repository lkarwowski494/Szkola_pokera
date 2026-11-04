---
status: przyjęta (D-126, właściciel 2026-11-04)
data: 2026-11-04
decyduje: agent (technika; W-05 odrzuca synchronizację), weto właściciela
---
# 0008. Przeniesienie danych: plik eksportu JSON z wersją formatu plus kopia systemowa iCloud; bez usługi w chmurze

## Kontekst i problem
F-14 (BR-DANE-001–004): eksport do jednego pliku bez zakupu, import na czystej instalacji i przy istniejącym postępie (z potwierdzeniem), odrzucenie pliku uszkodzonego, obcego i z nowszej wersji bez zmiany postępu, usunięcie postępu. NFR-DANE-002: 0 różnic eksport → import. W-05: eksport i import pliku dla wszystkich, bez synchronizacji.

## Czynniki decyzji
- Kopia iCloud: dane tworzone przez użytkownika są „nonpurgeable” i należą do kopii (Apple, E0); baza w `Documents/SQLite` (ADR 0002), więc nowy telefon z kopii systemu dostaje postęp bez eksportu. Tryb dziennika `DELETE` (ADR 0003) — plik `.db` spójny po `COMMIT`, bez pliku `-wal` do rozdzielenia.
- Kopia działającej bazy: `VACUUM INTO` daje „a consistent snapshot” (lang_vacuum.html, moduł); E5b: 5 z 5 wierszy; `backupDatabaseAsync` w expo-sqlite (E0).
- Import obcego pliku SQLite = migracja schematu na niezaufanym pliku; JSON da się zwalidować przed dotknięciem bazy.
- Rozmiar: do ok. 5 MB JSON po 3 latach [OCENA z E0].
- Wzorzec Treningu: `expo-sharing` i `expo-document-picker` (D-125), bez nowych uprawnień (E0).

## Rozważane opcje
- A: eksport JSON + kopia systemu iCloud · B: eksport jako plik SQLite (`VACUUM INTO`) + kopia systemu · C: tylko eksport (baza wyłączona z kopii iCloud) · D: usługa w chmurze (CloudKit / własna)

## Decyzja
Wybrano „A”, ponieważ plik JSON z kopertą i wersją formatu daje się sprawdzić przed jakąkolwiek zmianą bazy (odrzucenie nowszego i obcego pliku, BR-DANE-002), jest niezależny od wersji schematu, a kopia systemu przenosi postęp na nowy telefon bez działania użytkownika. D odrzucona przez W-05, NFR-PRYW-001 i NFR-KOSZT-001.

Ustalenia wiążące (format szczegółowo w `docs/architektura/dane.md`, E2):
1. Koperta: `format: "szkola-pokera-postep"`, `wersja_formatu` (liczba całkowita), `utworzono` (ISO 8601 UTC), `aplikacja` (wersja), `dane` (tabele postępu). Bez pamięci podręcznej uprawnień (ADR 0006).
2. Import: (1) odczyt i walidacja całości w pamięci; obcy `format` albo błąd struktury → „błędny plik”; `wersja_formatu` wyższa niż obsługiwana → „zaktualizuj aplikację”; oba bez dotknięcia bazy; (2) przy istniejącym postępie potwierdzenie (rola 04); (3) kopia `VACUUM INTO` do pliku tymczasowego; (4) zastąpienie w jednej transakcji portu; błąd → `ROLLBACK`, postęp bez zmian; (5) usunięcie kopii po udanym imporcie. Licznik dnia łączony, nie zastępowany (ADR 0007).
3. Starsza `wersja_formatu`: migracja formatu w domenie (czysta funkcja), przed walidacją.
4. Suma kontrolna nie jest wymagana; jeśli zostanie dodana, liczona z bajtów pliku (moduł `dane-lokalne-sqlite`).
5. Plik eksportu powstaje w katalogu tymczasowym i jest przekazywany do arkusza udostępniania; aplikacja nie trzyma kopii.

### Konsekwencje
- Dobre: odrzucenie złego pliku przed zmianą danych; format czytelny i przenośny; zero usług.
- Złe: dwie reprezentacje danych (schemat i format eksportu) do utrzymania w zgodzie — kontrolowane testem „eksport → import = 0 różnic”; brak automatycznego przeniesienia między iOS i Androidem (tylko plik).
- Od czego zależy: ADR 0002 (baza w dokumentach), ADR 0003 (tryb `DELETE`).

### Potwierdzenie
- Test NFR-DANE-002 (rola 07): dane ze wszystkich tabel postępu → eksport → import na pustej bazie → 0 różnic w każdej tabeli.
- Testy odrzucenia: plik obcy, uszkodzony (ucięty JSON), `wersja_formatu + 1` → komunikat i baza bajt w bajt bez zmian.
- Test przerwania: błąd w środku zastąpienia (wstrzyknięty) → `ROLLBACK`, liczności tabel bez zmian.
- Krok właściciela T-06: eksport i import między dwoma telefonami.

## Opcje: zalety i wady
### A: JSON + kopia systemu
- Zalety: walidacja przed importem; niezależność od schematu; kopia systemu bez pracy użytkownika.
- Wady: kod serializacji i migracji formatu.
### B: plik SQLite
- Zalety: eksport jedną komendą (`VACUUM INTO`); brak drugiego formatu.
- Wady: import otwiera niezaufany plik bazy i migruje go; trudniej odrzucić obcy plik bez jego otwarcia; plik zależny od wersji schematu.
### C: tylko eksport
- Zalety: brak danych w kopii Apple.
- Wady: nowy telefon bez eksportu traci postęp (recenzje o utracie postępu, BR-DANE-001); Apple zalicza dane użytkownika do kopii.
### D: chmura
- Wady: odrzucona (W-05, NFR-PRYW-001, NFR-KOSZT-001).
