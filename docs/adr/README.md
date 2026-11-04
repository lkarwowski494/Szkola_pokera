# ADR: Szkoła Pokera (rola 05, od 2026-11-04)
Szablon na wzór MADR (prompt roli 05). Numeracja ciągła, bez kasowania; zmiana decyzji to nowy ADR, stary dostaje status „zastąpiona przez NNNN”. Numery ADR-01–ADR-26 z rejestru 03 na Dysku to inna numeracja (rejestr historyczny); ADR 0006 zastępuje ADR-18, ADR 0009 zastępuje ADR-17, ADR 0003 i 0005 częściowo ADR-08 (wpisy zastąpienia na Dysku czekają na właściciela).

Eksperymenty E1: `docs/architektura/eksperymenty/e1-sqlite.mjs`, wynik `e1-sqlite.wynik.txt` (komenda: `node --no-warnings e1-sqlite.mjs <katalog-tymczasowy>`; 19 wyników zgodnych, kod wyjścia 0; SQLite 3.53.4, Node 22.23.4).

| Nr | Decyzja | Status | Kto |
|---|---|---|---|
| [0001](0001-expo-sdk-58.md) | Expo SDK 58 na start budowy | proponowana | agent |
| [0002](0002-dane-uzytkownika-sqlite.md) | Dane użytkownika w SQLite w `Documents/SQLite` | proponowana | agent |
| [0003](0003-port-bazy-kolejka-migracje.md) | Port bazy z jedną kolejką zapisów, UPSERT, runner `user_version` (12 kroków), dziennik `DELETE`, bez drizzle | proponowana | agent |
| [0004](0004-schemat-v1-od-zera.md) | Schemat v1 od zera w `postep.db`; stare `user.db*` nietknięte | przyjęta (D-124) | właściciel |
| [0005](0005-tresc-w-paczce-baza-na-jezyk.md) | Treść w paczce, baza na język, kopia tylko przy zmianie wersji | proponowana | agent (rozmiar > 50 MB: właściciel) |
| [0006](0006-platnosci-expo-iap.md) | `expo-iap`, ID produktów, logika dostępu w domenie | proponowana | agent |
| [0007](0007-licznik-dziennego-limitu-lokalny.md) | Licznik limitu lokalny (OP-24: ponowna instalacja zeruje dzień, przyjęte) | proponowana | agent (analogia Trening) |
| [0008](0008-kopia-eksport-json-i-kopia-systemu.md) | Eksport JSON z wersją formatu + kopia iCloud | proponowana | agent |
| [0009](0009-bez-sentry-i-observe-dziennik-lokalny.md) | Usunięcie Sentry i `expo-observe`, dziennik lokalny | proponowana | agent |
| [0010](0010-maszyny-stanow-w-domenie.md) | Maszyny stanów w domenie, stan w toku w bazie | proponowana | agent |
| [0011](0011-kod-bez-br-usuniety.md) | Kod bez BR usunięty (wytyczna 2.5.19), diagnostyka tylko w buildzie deweloperskim | proponowana | agent z 08 |
| [0012](0012-przypomnienie-expo-notifications-codzienne.md) | Przypomnienie: jedno powiadomienie z wyzwalaczem codziennym | proponowana | agent |
