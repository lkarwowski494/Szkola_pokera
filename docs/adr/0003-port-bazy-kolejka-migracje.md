---
status: przyjęta (D-126, właściciel 2026-11-04)
data: 2026-11-04
decyduje: agent (technika), weto właściciela
---
# 0003. Dostęp do bazy użytkownika przez port z jedną kolejką zapisów i własny runner migracji na `user_version`; drizzle odchodzi z bazy użytkownika

## Kontekst i problem
Obecny kod otwiera `user.db` przez `openDatabaseSync` i drizzle 0.45 z migratorem drizzle (`__drizzle_migrations`), bez kluczy obcych i z synchronicznymi zapisami (`apps/mobile/src/data/user/db.ts`). Schemat v1 powstaje od zera (D-124), więc sposób dostępu i migracji wybieramy teraz. Dotyczy każdego przepływu z zapisem (PR-01–PR-07).

## Czynniki decyzji
- Klucze obce: „Foreign key constraints are disabled by default … must be enabled separately for each database connection”; pragma „is a no-op within a transaction” (sqlite.org, moduł `dane-lokalne-sqlite`; odtworzone dziś: E1d).
- Transakcja w expo-sqlite nie jest wyłączna: „any query that runs while the transaction is active will be included in the transaction. This includes query statements that are outside of the scope function” (docs.expo.dev …/sqlite, odczyt 2026-11-04). Eksperyment E1a: bez kolejki niezależny zapis B zginął razem z wycofaną transakcją A; E1b: z kolejką przeżył.
- `withExclusiveTransactionAsync()` „runs on a new database connection, so connection settings made on your original database, such as PRAGMA foreign_keys = ON, do not apply inside it” (jw.).
- Rekord nadrzędny przez UPSERT: E2a `INSERT OR REPLACE` skasował 2 z 2 wpisów logu karty, E2b UPSERT zachował 2.
- Przebudowa tabeli: procedura 12 kroków z `PRAGMA foreign_keys=OFF` przed `BEGIN` (sqlite.org/lang_altertable.html §8); E4a/E4b zachowały 2 karty i 3 wpisy logu, E4d (pragma w transakcji) skasowało 3 z 3, E4e (złamane CHECK) wycofało całość z wersją 1.
- Tryb dziennika: Expo nie włącza WAL sam („Tip: Enable WAL journal mode when you create a new database to improve performance”, jw.); przy WAL „If a database file is separated from its WAL file, then transactions that were previously committed … might be lost” (wal.html §4); E5a: kopia samego pliku przy WAL miała 0 z 5 ostatnich wierszy.
- Zachowanie migratora drizzle przy przebudowie tabeli z kluczami obcymi na expo-sqlite: nie sprawdzone `[DO USTALENIA]` (wymagałoby uruchomienia kodu z npm; w tej sesji nieuruchamiane).

## Rozważane opcje
- A: drizzle + migrator drizzle (obecny stan) · B: port bazy `run / all / transakcja` z jedną kolejką zapisów, czysty SQL, runner migracji na `PRAGMA user_version` · C: B + drizzle jako budowniczy zapytań przez sterownik `sqlite-proxy` (`drizzle(async (sql, params, method) => …)`, orm.drizzle.team/docs/connect-drizzle-proxy, odczyt 2026-11-04)

## Decyzja
Wybrano „B”, ponieważ każde z zachowań, które gubią dane (zapis spoza transakcji, REPLACE, pragma w transakcji, przebudowa), jest w B sprawdzone eksperymentem i daje się przetestować w Node przez adapter `node:sqlite`, a A ukrywa kolejność pragm i transakcji w migratorze, którego dziś nie sprawdziliśmy. C zostaje możliwą zmianą później (nowy ADR), gdy liczba zapytań uzasadni typowanie.

Ustalenia wiążące:
1. Jedno połączenie z bazą użytkownika na cały czas życia aplikacji, otwierane `openDatabaseAsync`; zaraz po otwarciu, poza transakcją: `PRAGMA foreign_keys = ON`, potem runner migracji, dopiero potem port przyjmuje zapisy.
2. Tryb dziennika: domyślny (rollback, `DELETE`), bez WAL. Powód: jeden zapisujący, małe zapisy, a plik `.db` jest spójny po każdym `COMMIT` także dla kopii systemu (ADR 0008). Zmiana na WAL tylko nowym ADR z pomiarem (OP-21).
3. Każdy zapis aplikacji idzie przez kolejkę portu; zapisy wielowierszowe przez `transakcja(fn)`, gdzie `fn` dostaje to samo połączenie bez ponownego kolejkowania. Zakaz `runSync`/`execSync`/`withExclusiveTransactionAsync` na bazie użytkownika.
4. Rekordy nadrzędne zapisywane UPSERT-em; `INSERT OR REPLACE` zakazany na tabelach z dziećmi.
5. Migracje: lista `{ wersja, sql, przebudowa }` w jednym module, runner z modułu `dane-lokalne-sqlite` (wersja przetestowana: `docs/architektura/eksperymenty/e1-sqlite.mjs`, funkcja `migruj`). Baza nowsza niż aplikacja: błąd bez zmian (E4f). Przed migracją z przebudową kopia `VACUUM INTO` do `postep-przed-v<N>.db` (`tlo-i-bledy.md` §4). Wykonanie (L8-02, fix 05 2026-11-07): schemat v1 nie ma migracji z przebudową, więc runner kopii jeszcze nie robi; pierwsza migracja z `przebudowa: true` wymaga w tym samym commicie kroku kopii w `migruj` i testu na kopii bazy (strażnik: `packages/postep/test/kontrakt-05-postep.test.ts`).
6. Transakcja nie czeka na sieć, dialog, timer ani sklep (zawieszenie z blokadą pliku, moduł `tlo-i-sensory-ios`).

### Konsekwencje
- Dobre: testy zapisu na prawdziwym SQLite w Node; jedno miejsce na pragmy i kolejność; mniej zależności (drizzle i drizzle-kit wypadają z bazy użytkownika; baza treści i tak używa surowego SQL).
- Złe: zapytania pisane ręcznie, typy wierszy ręcznie; zapisy czekają na siebie w kolejce (przy skali z E0 bez znaczenia [OCENA], pomiar w E3).
- Od czego zależy: ADR 0004 (schemat v1 od zera, bez migracji z drizzle).

### Potwierdzenie
- Test portu (rola 07, na adapterze `node:sqlite` otwartym z `enableForeignKeyConstraints: false`, jak SQLite w aplikacji): scenariusz E1a/E1b, `PRAGMA foreign_keys` odczytane wewnątrz `transakcja()` = 1, kaskada E3a, UPSERT E2b.
- Test migracji na kopii każdej wydanej wersji (E4a–E4f jako wzór; wzorce `bazy/vN.db` od pierwszego wydania sztafety).
- Kontrola statyczna: `grep -rnE "runSync|execSync|getAllSync|withExclusiveTransactionAsync|INSERT OR REPLACE" apps/mobile/src/data/user` (albo katalog danych z E2) = 0 trafień; `granice.mjs` bez naruszeń.
- Kontrola przy starcie w buildzie deweloperskim: `PRAGMA journal_mode` = `delete`, `PRAGMA foreign_keys` = 1.

## Opcje: zalety i wady
### A: drizzle + migrator drizzle
- Zalety: kod już istnieje; typowane zapytania; migracje generowane z modelu.
- Wady: schemat i tak od nowa (D-124); kolejność pragm i transakcji w migratorze niesprawdzona; API synchroniczne w obecnym kodzie łamie regułę kolejki (zapis synchroniczny w trakcie transakcji asynchronicznej trafia do niej, jak E1a); dwie zależności.
### B: port + kolejka + runner `user_version`
- Zalety: wszystkie ryzyka danych sprawdzone eksperymentem; adapter testowy w Node; zero zależności poza `expo-sqlite`.
- Wady: ręczne SQL i typy; runner trzeba utrzymywać (ok. 40 linii, gotowy wzorzec).
### C: B + drizzle `sqlite-proxy`
- Zalety: typowane zapytania na tym samym porcie i kolejce.
- Wady: zależność i druga warstwa dla ok. kilkunastu zapytań; budowniczy może wygenerować `INSERT OR REPLACE` (`onConflictDoUpdate` trzeba pilnować) — korzyść bez nazwanego problemu (zasada architekta 2).
