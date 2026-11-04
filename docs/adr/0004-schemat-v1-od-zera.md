---
status: przyjęta (D-124, właściciel 2026-11-04; doprecyzowanie wykonania przyjęte w D-126)
data: 2026-11-04
decyduje: właściciel (sprawa produktowa: dane testowe właściciela)
---
# 0004. Schemat v1 bazy użytkownika od zera w nowym pliku; bazy z buildów TestFlight 1005–1008 zostają nietknięte obok

## Kontekst i problem
Buildy TestFlight 1005–1008 (testy wewnętrzne, jedynym użytkownikiem jest właściciel) zapisują `user.db` w schemacie drizzle 0000–0002 z 4 tabelami gry z botami (F-19 = NIE). Schemat tych buildów nie jest znany z repo (historia płytka, bez tagów; E0, sekcja 2). Kontrakt zakresu: bez tabel na zapas dla F-19–F-21.

## Czynniki decyzji
- Zasada wspólna 10 (zero utraty danych) kontra brak wzorca bazy z builda 1008 (wymagałby pliku z telefonu przez Xcode).
- Dane tylko testowe, właściciela; brak użytkowników zewnętrznych (`CLAUDE.md`, „Stan projektu”).
- Odpowiedź właściciela: P-1 „Nowy schemat (Recommended)” (D-124).

## Rozważane opcje
- A: nowy schemat v1, stary plik zachowany obok, nieczytany · B: migracja ze schematu drizzle 0002

## Decyzja
Wybrano „A” (decyzja właściciela D-124). Wyjątek od zasady wspólnej 10 nazwany: dotyczy tylko danych testowych właściciela z buildów 1005–1008; tańsza kontrola: stare pliki zachowane bez zmian, a od pierwszego wydania sztafety test migracji na kopii każdej wydanej wersji (ADR 0003).

Sposób wykonania (doprecyzowanie techniczne agenta, do weta): nowa baza dostaje nową nazwę pliku `postep.db`, a stare pliki `user.db`, `user.db-wal`, `user.db-shm` zostają pod swoimi nazwami, nieotwierane. Skutek jest ten sam co „przemianowany i zachowany obok” z D-124 (stara baza nie jest czytana ani kasowana), ale bez operacji na starych plikach: zmiana nazwy trzech plików nie jest jedną operacją atomową, a przerwana w połowie rozdzieliłaby bazę od pliku `-wal` (wal.html §4).
- Wyjątek: „Usuń postęp” (BR-DANE-003) usuwa też stare pliki `user.db*` — użytkownik prosi o usunięcie całego postępu.

### Konsekwencje
- Dobre: brak kodu przenoszącego dla danych bez użytkowników; schemat v1 bez tabel gry.
- Złe: testowy postęp właściciela nie przechodzi do nowej wersji (koszt przyjęty w D-124).
- Od czego zależy: jeśli przed pierwszym wydaniem sztafety pojawią się użytkownicy zewnętrzni na buildach 1005–1008 (dziś: brak), decyzja wraca do właściciela.

### Potwierdzenie
- Test (rola 07): katalog z `user.db` (dowolny schemat drizzle) + start aplikacji → powstaje `postep.db` w wersji v1, `user.db*` mają te same bajty co przed startem (suma SHA-256 przed i po).
- Test: „Usuń postęp” usuwa `postep.db` (przez port: `DELETE` w transakcji albo zamknięcie i usunięcie pliku, decyzja E2) oraz `user.db*`.
- Kontrola statyczna: brak odwołań do `user.db` w kodzie poza listą plików do usunięcia.

## Opcje: zalety i wady
### A: nowy schemat, stary plik obok
- Zalety: zero kodu przenoszącego; stary plik dostępny, gdyby był potrzebny; brak ryzyka częściowej migracji.
- Wady: postęp testowy właściciela nie przechodzi.
### B: migracja z drizzle 0002
- Zalety: ciągłość danych testowych.
- Wady: wzorzec bazy z telefonu (krok właściciela na Macu), kod przenoszący 4 tabele gry, których v1 nie ma; ok. 2–3 h agenta dla danych jednej osoby.
