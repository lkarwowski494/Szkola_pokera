# Rola 08 (Programista), build: plan i postęp

## E0: rozpoznanie i plan (2026-11-07, STOP)

### Środowisko i stan wyjściowy
| Sprawdź | Wynik |
|---|---|
| System, Node, git | Linux x86_64 (chmura, bez Xcode), Node 22.23.4, gałąź `claude/sleepy-brahmagupta-2065nu` = origin, szczyt d595053 |
| GitHub | MCP GitHub (repo w zakresie sesji), push na gałąź roboczą; Trening: klon tylko do odczytu `/home/user/lkarwowski494/trening` (2e4b0f8) |
| Przeglądarka | Chromium + Playwright wstępnie zainstalowane (zrzuty ekranów od części 5) |
| iOS | brak; E2E przez `e2e-ios.yml` (macOS, repo publiczne, 0 USD) |
| `pnpm run ci` | kod 0 (typecheck, test, test:skrypty 77, i18n, content:check, tresci:rejestr 0 błędów) |
| `pnpm test:akceptacja` | kod 1 zgodnie z oczekiwaniem: domena 295 (277 czerwonych, 18 zielonych), ekrany 80 (69 czerwonych, 11 zielonych); razem 375, 346 czerwonych, 29 strażników |
| Komendy | testy szybkie i pełne: `pnpm test` (w `ci`); typecheck: `pnpm typecheck`; lint: brak osobnej komendy (kontrole statyczne w testach: `granice.mjs`, K-07, i18n) — zostaje jak jest, bez propozycji nowego narzędzia |

### Założenia wejściowe (hipotezy z artefaktów 05 i 07)
- Sygnatury `packages/postep/src` (07, część uzupełniona: `SurowyPort`, `PlikiPostepu`, `eksportuj`/`importuj`/`kopiaBazy`/`usunPostep`) są wykonalne bez zmiany testów — sprawdzone czytaniem 6 testów; jedna luka niżej (L8-01).
- Kontrakt błędów adaptera: wyjątek niesie liczbowe `errcode` SQLite (założenie 07). node:sqlite 22.23 daje `errcode` — potwierdzi pierwszy czerwony test K-12.

### Plan (część 1: `packages/postep`, cięcie pionowe, każdy krok kończy się zielonym `pnpm run ci`)
| Krok | Zachowanie (kryterium) | Test (plik w `tests/akceptacja/postep/` → `packages/postep/test/`) | Pliki |
|---|---|---|---|
| 0 | infrastruktura testów pakietu (struktura, bez zachowania) | — | `packages/postep/package.json` (vitest 5.0.3, @types/node ^22.10.0 jak w `domena`; lockfile bez nowych pakietów), `tsconfig.test.json` |
| 1 | K-02 migracje: v1 = `schemat.sql`, E4e, E4f; K-04 klucze obce, kolejka E1b | `k02-migracje`, `k04-k15-port` (część K-04, kolejka) | `migracje.ts`, `schemat-v1.ts` (nowy), `port.ts` |
| 2 | K-15 UPSERT kroku i karty; K-12 błędy zapisu → `powod` | `k04-k15-port`, `k12-bledy` (część zapisu) | `aktywnosci.ts`, `powtorki.ts`, `bledy.ts` (nowy, mapowanie `errcode`) |
| 3 | K-12 baza uszkodzona przy starcie; K-14 stare `user.db*` | `k12-bledy` (część startu), `k14-stare-bazy` | `start.ts` |
| 4 | K-11 eksport, import, „Usuń postęp”; walidacja koperty w domenie | `k11-dane`, `domena/eksport` (przeniesiony do `packages/domena/test/`) | `daneUzytkownika.ts`, `packages/domena/src/eksport.ts` |
| 5 | K-10 ochrona tła (4 operacje + migracja z przebudową, przerwanie przy wygaśnięciu) | `k10-ochrona` | `port.ts`, `migracje.ts`, `daneUzytkownika.ts` |
| 6 | E2: próby mutacji (D-172), przegląd D-043 w świeżym kontekście, raport | — | — |

Wywołania do sprawdzenia przed zmianą (zasada 4): `otworzPostep`, `migruj`, `listaMigracji` — dziś tylko testy akceptacyjne i `index.ts` (`grep -rn` w `apps/`, `packages/`: brak użyć poza zaślepkami); adapter `apps/mobile/src/data/postepExpo.ts` jeszcze nie istnieje (część 4 przekazania: usunięcie starego kodu i adapter).

### Luki i decyzje (techniczne, agent, do weta; zapis D-199–D-204)
- **L8-01 (do 05):** `otworzPostep` / `uruchomPostep` zwracają port, a polityka błędów wymaga `baza_nowsza` i `migracja_nieudana`. Wybór: wyjątek typowany `BladStartuPostepu { powod }` (wzór Treningu: `lib/state/boot.ts:96–101`, wyjątek migracji przerywa start bez zapisu, odczyt 2026-11-07). Odrzucone: zmiana sygnatury na `Wynik` (to zmiana testu, rola 07/05).
- **L8-02 (do 05):** `importuj` i `migruj` nie mają ścieżki kopii `VACUUM INTO` (ADR 0008 pkt 2.3, ADR 0003 pkt 5). Wybór: kopię robi wywołujący (warstwa `apps/mobile/src/data`) przez `kopiaBazy` przed `importuj`; v1 nie ma migracji z przebudową, więc kopia przed migracją czeka na pierwszą taką migrację.
- Schemat v1 w kodzie: moduł `schemat-v1.ts` z dosłowną kopią `schemat.sql` (aplikacja nie czyta plików `docs/`); strażnik: K-02 (porównanie `sqlite_schema` z plikiem) i test zgodności tekstu. Odrzucone: generator przy budowaniu (dodatkowy krok), plik jako zasób (asynchroniczne ładowanie przy starcie).
- Uszkodzona baza: przemianowanie razem z `postep.db-journal`, jeśli istnieje (inaczej stary dziennik trafiłby obok nowej bazy); kolizja nazwy → sufiks `-1`, `-2`… (wzór: Trening `lib/state/db.ts:107`, resztki dziennika traktowane razem z bazą).
- Import: kolumny wiersza muszą być dokładnie kolumnami tabeli (zamknięta lista; nazwy kolumn trafiają do SQL), wartości tylko tekst, liczba, null; naruszenie CHECK/klucza obcego w transakcji → `bledny_plik`. Dzisiejsze aktywności z limitu spoza pliku zostają jako puste znaczniki (jak w „Usuń postęp”), ich odpowiedzi usunięte (kolizja identyfikatorów z plikiem).
- Mapowanie błędów: `errcode & 0xff` = 13 → `brak_miejsca`; każdy inny błąd zapisu → `zapis_nieudany` (nigdy cicho).

### Szacunek (zasada 9)
Agent: część 1 ok. 3–4 h (6 kroków, `pnpm run ci` ok. 2 min po każdym). Czekanie: E2E po każdym pushu kodu ok. 26–33 min (macOS, 0 USD), przegląd D-043 ok. 10 min. Właściciel: akceptacja E0, potem dopiero raport E2 (decyzji produktowych w części 1 brak).
