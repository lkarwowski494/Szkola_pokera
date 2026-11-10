# Koordynacja Szkoła Pokera (PokerGym) — stan (aktualizacja 2026-11-10 05:52 UTC)

Migracja na M9 (moduł „migracja”, D-056) z koordynatora bez M9 `session_01T66VBzPr7MhGZ3A6RPdfBG`. Dawne pliki stanu zostają na gałęzi roboczej: `docs/programista/koordynator.md` (prompt i kolejka nocy), `docs/programista/plan-08.md` sekcja „Koordynacja” (dziennik od 2026-11-08, ostatni wpis 01:51 UTC 10.11), `docs/decyzje.md` (rejestr D-NNN aplikacji, ostatni D-394).

## Mandat (przepisuj bez zmian; zmienia go tylko właściciel)
- Tryb decyzji: **analogia** od 2026-11-09 ok. 19:25 UTC (D-359, tryb nocny 09→10), słowa: „Ty podejmujesz wszystkie decyzje zgodnie z tym, co i tak byś zarekomendował. Prace zlecasz do innych sesji, żeby oszczędzać swój kontekst, a sam tylko koordynujesz. Pilnujesz ich, żeby nie przekroczyły 30% limitu kontekstu; jak to się stanie, zapisują stan i przekazują zadanie dalej.” Decyzje zapisywane jako A „przyjęta wg D-359” do weta. Po raporcie rannym (D-359: „Rano raport nocy w plan-08 i jedno pytanie zbiorcze”) tryb dzienny jak D-296/D-341: pytania produktowe do właściciela z ≥ 2 opcjami i rekomendacją (= tryb „właściciel” dla spraw produktowych) — [DO USTALENIA] słowami właściciela, czy po raporcie zostaje „analogia”.
- **Tryb decyzji od 2026-11-10 ok. 05:55 UTC: właściciel dla spraw produktowych** — odpowiedź na pytanie zbiorcze „Tryb decyzji w dzień”: „Produktowe do mnie (zalecane)”; techniczne rozstrzyga koordynator/sesja do weta. Rozstrzyga [DO USTALENIA] z linii wyżej.
- Stała zasada z `CLAUDE.md` (decyzja właściciela 2026-11-03/2026-11-07, D-191): przed każdą decyzją najpierw analogia z Treningu (`lkarwowski494/trening`, `plik:linia`, data odczytu), wzory procesu także Oczko i Piekarz; sprawy merytoryczne pokerowe rozstrzyga hierarchia źródeł ADR-24 (nie właściciel).
- Repo portfela do analogii (odczyt): lkarwowski494/trening, lkarwowski494/oczko, lkarwowski494/piekarz.
- Zgody trwałe (słowa w `docs/decyzje.md`):
  - D-342 (2026-11-09 ok. 14:10) + D-348, D-355, D-356: push na `main` **tylko** wymienionych plików: `.github/workflows/przeklad-tlumaczen.yml`, `pages.yml`, `site/**` (z nową nazwą PokerGym — **tylko po nowej zgodzie**, D-378), 4× `asc-*.yml`, `store-screenshots.yml`, `asc-produkty.yml`. Nic poza nimi.
  - D-375 (2026-11-09 21:08): „Ok zgoda na jezyki z rekomendacji i API do 80 USD” — przekład de, es, ko, it, vi; ≤ 15 USD na przebieg; **wykorzystane 53,92 USD, zgoda wyczerpana zadaniem** (przekład zakończony 8/8).
  - D-358/D-359: dotłumaczenia po poprawkach ≤ 5 USD łącznie (wykorzystane 0).
  - Workflowy App Store Connect w trybie zapisu uruchamia i zatwierdza (`release`) **tylko właściciel**, zawsze z ref gałęzi roboczej (z `main` padają). Koordynator: tylko podglądy/kontrola.
  - 2026-11-10 ok. 06:10 UTC, pytanie „Strona site/ … z nową nazwą PokerGym: czy wypchnąć ją na main”: „Zgoda, publikuj teraz” — **wykonane** ddb0108 (tylko `site/privacy.html`, `site/support.html`); zgoda zużyta tym pushem.
  - 2026-11-10 ok. 06:05 UTC, przekład pt-PT przez API: „Do 25 USD” łącznie (≤ 15 USD na przebieg, D-341); wykorzystane 0.
- Zawsze za zgodą: push i scalenie na `main` (poza listą wyżej), PR, App Store Connect zapis, TestFlight, publikacja, usuwanie gałęzi i danych, force-push, koszty stałe, wiadomości do ludzi, koszt API ponad pułap.
- Pułapy kosztu: **brak** — właściciel 2026-11-10 ok. 05:55 UTC: „Bez pułapu, tylko raport” (koszt w liniach 05:00 i 14:00; budżet kontekstu 30% bez zmian); API przekładu wg zgód wyżej.
- Koordynator aktywny: session_01T66VBxtQGd3faU3Y4mNUuA (od 2026-11-10 05:30 UTC, uruchomiony przez właściciela z `/apps4brew`; poprzednik session_01T66VBvZebfV7GaciZqtW3H, przed nim session_01T66VBzPr7MhGZ3A6RPdfBG).
- Środowisko: environment_id env_011LiSvPc7hKtQZSkk13hSky, model claude-opus-5-5, wysiłek medium, permission_mode auto, extra_allowed_tools brak; repo sesji: lkarwowski494/Szkola_pokera, lkarwowski494/prompts (biblioteka, prywatna — dodawać przez add_repo read).
- Środowisko sesji podrzędnych od 2026-11-10 ok. 06:10 UTC: „Takie jak ta sesja (zalecane)” = env_0166YQoQYngJLGR5ViagvRAi, permission_mode auto.
- Gałąź robocza: `claude/sleepy-brahmagupta-2065nu`; gałąź stanu: `koordynacja` (utworzona 2026-11-10 od ab820a8).

## Teraz
- Raport nocy D-359 zapisany (gałąź robocza e01ba05, `docs/programista/plan-08.md`); pytanie zbiorcze zadane i odebrane 05:50–06:10 UTC (odpowiedzi: `decyzje.md` KO-005…KO-016).
- `site/` z nazwą PokerGym na `main` @ ddb0108 (zgoda właściciela); przebieg Pages do sprawdzenia przy kontroli.
- Szczyt kodu z dowodem: **6afa34d** (E2E 42732430729 i CI 42732569378 success — sprawdzone w Actions 05:40). Gałąź robocza @ e01ba05 (tylko docs nad 6afa34d).
- W toku: sesje AM (kategoria Games/Card), AN (ponowna ocena KR/VN, docs), AO (szacunek pełnego przeglądu + pt-PT) — osobne gałęzie od e01ba05, rozłączne pliki.
- Zakres 1.0 słowami właściciela: „Wszystkie 11 od razu” (+ pt-PT); build TestFlight „Po poprawkach z dzisiaj”.

## Sesje
| Litera | ID | Rola, tryb | Gałąź @ SHA | Kontekst % | Koszt USD | Stan |
|---|---|---|---|---|---|---|
| AM | session_01T66VBzioNjwudY42GtzgHt | 10 build, kod | sesja-am-kategoria @ e01ba05 | — | — | wystartowała (get_session przez subagenta: WORKING) |
| AN | session_01T66VBy5HsHQDnmCWm8Vboj | 10 build, docs | sesja-an-kr-vn @ e01ba05 | — | — | wystartowała (WORKING) |
| AO | session_01T66VBwQoZrfRhLaY2LmtdR | 09 build, kod | sesja-ao-pt-pt @ e01ba05 | — | — | wystartowała (WORKING) |

Litery użyte dotąd: A…Z, AA…AO (następna: **AP**). Polecenia: `docs/koordynacja/polecenia/<litera>.md`.

## Plan 24 h (UTC)
| Kiedy | Co | Kto | Zależy od | Od właściciela |
|---|---|---|---|---|
| 06:25 → ok. 07:30 | AM: kategoria Education + Games/Card w repo, kontrola zgodności z ankietą wiekową i notatkami recenzenta | AM (10) | — | ewent. odpowiedź na PYTANIE; potem wpis ręczny w ASC |
| 06:25 → ok. 08:30 | AN: ponowna ocena KR i VN (źródła pierwotne) → opcje | AN (10, docs) | — | decyzja o KR/VN |
| 06:25 → ok. 07:00 | AO zad. 1: szacunek pełnego przeglądu AI 9 języków | AO (09) | — | limit kosztu API przeglądu |
| po szacunku | pełny przegląd AI całości 9 języków (workflow płatny) + naniesienie poprawek | AP… (09) | limit właściciela | limit |
| dziś | AO zad. 2–4: pt-PT przekład (≤ 25 USD), przegląd, wydanie w kodzie, E2E | AO (09) | — | — |
| po AM, AO, przeglądzie | scalenie gałęzi sesji do roboczej, CI + E2E na wyniku | koordynator (konflikt: sesja) | odbiory | — |
| po scaleniu („Po poprawkach z dzisiaj”) | build TestFlight `testflight.yml` z ref gałęzi roboczej; listy telefonu 4 + de-es + ko-it-vi + pt-PT, K6 en | właściciel | zielone E2E na szczycie | uruchomienie + Approve, telefon |
| po znakach towarowych | fala 2 metadanych → `store/`, zapis metadanych w ASC (`asc-metadane`, release) | sesja 10 + właściciel | USPTO/EUIPO/WIPO | sprawdzenie, Approve |
| 14:00 | linia dzienna + przegląd przepływu | koordynator | — | — |
| backlog | flow E2E CJK, zrzuty 320 pt/AX5 ja/fr, NISKIE z D-043 AE/AK/AL, terms-nazwy [DO USTALENIA] (ko 25, it 52, vi 48 + 22), zh-Hant limp 溜入, notatki recenzenta po W-04 | sesje 08/09 | — | — |

## Czeka na właściciela (pytanie zbiorcze 07:00)
- Fakty: W-04 e-mail wsparcia + dostawca skrzynki; administrator (imię i nazwisko, forma); W-05 Apple ID aplikacji; W-07 dane sprzedawcy JP (wariant A potwierdzony 2026-11-10). Uwaga: `site/` na `main` ma w tych miejscach publicznie tekst „[DO USTALENIA: …]” (było tak też przed ddb0108).
- Znaki towarowe „pokergym” / „poker gym” (USPTO, EUIPO, WIPO GBD w przeglądarce) przed zapisem nazwy w ASC (D-378, D-382) — krok po kroku do podania.
- Wpis ręczny kategorii w ASC (Education + Games/Card) po wyniku AM.
- Limit kosztu API pełnego przeglądu AI (po szacunku AO).
- Decyzja o KR i VN (po AN).
- Build TestFlight po poprawkach; potem listy telefonu.
- Konto Apple Search Ads (D-377; po premierze).
- Zarchiwizowanie sesji poprzednika session_01T66VBvZebfV7GaciZqtW3H, jeśli jest widoczna (dla koordynatora „not found”).
- Decyzje nocy nieomówione pojedynczo (techniczne i wykonawcze z listy D-343–D-394): zostają „do weta”.

## Przypomnienia
- (raport nocy 07:00 trig_01PLD3r1hZVyFRQodEVuJfz4 usunięty 06:20 — raport zrobiony 05:45) · trig_01E3ShNoCbuUYRTGFdedbP47 „…: linia 14:00” 10.11 · trig_019RcQqtkXBEGePo3EBxinUa „…: linia 05:00” 11.11. Kontrola tylko gdy coś trwa. (Przypomnienia poprzednika trig_01AeLX…, trig_019PQf…, trig_01TZaa… usunął on sam 05:25.)
- Poprzednika: trig_01BrH7Zk3tSKmXLeQ1wovYhg „kontrola przekazania” 05:42 (sprząta poprzednik).
- Push na gałąź stanu przechodzi przez hook pre-push (typecheck, i18n, content) — w nowym kontenerze najpierw `pnpm install --frozen-lockfile` (5,6 s).

## Pule numerów decyzji
- Rejestr aplikacji `docs/decyzje.md`: ostatni D-394. Pule: AM D-395…D-399, AN D-400…D-404, AO D-405…D-419; następny wolny **D-420**.
- KO następny: **KO-018**.

## Dziennik (najnowsze na dole; starszy w `docs/programista/plan-08.md` „Koordynacja”)
| UTC | Sesja | Zdarzenie z dowodem | Następny krok |
|---|---|---|---|
| 11-09 22:05 | koordynator | E2E 42700220213 (935c9cf) zielone | odbiór AE |
| 11-09 22:59 | koordynator | E2E 42709979531 (e67157a: 4 języki AE + PokerGym AG) zielone | — |
| 11-09 23:58 | — | E2E 42717745661 (200d6a2, AH) zielone | — |
| 11-10 00:58 | — | E2E 42725476937 (804160d, AK de+es) zielone | — |
| 11-10 01:41 | — | E2E 42732430729 (6afa34d, AL ko/it/vi) zielone; CI 42732569378 (3d9b776) zielone | raport 07:00 |
| 11-10 05:15 | koordynator | migracja na M9: gałąź `koordynacja` @ ab820a8, pliki stanu | przekazanie następcy M9 |
| 11-10 05:12 | koordynator | przekazane do session_01T66VBvZebfV7GaciZqtW3H (start bez błędu); przypomnienie trig_01KihuPMEhUFQp1zAXjtFr5g usunięte — raport 07:00 tworzy następca | PRZEJĄŁEM → archiwizacja poprzednika |
| 11-10 05:20 | koordynator (session_01T66VBvZebfV7GaciZqtW3H) | przejęcie E6 pkt 5: przypomnienia 07:00/14:00/05:00 utworzone; add_repo prompts odrzucony (klasyfikator); trening/oczko/piekarz publiczne, klon na żądanie; od sesji podrzędnych brak wiadomości; aktywnych sesji brak | PRZEJĄŁEM → raport 07:00 |
| 11-10 05:25 | koordynator | WSTRZYMANE przez właściciela; usunięte trig_01AeLXmJouMbVztuzcB4fAF7, trig_019PQfnnVoXW4mwtNVKTwddy, trig_01TZaaQwGGQsTwNNy3JN3WHC | czekam na słowa właściciela |
| 11-10 05:32 | koordynator (session_01T66VBxtQGd3faU3Y4mNUuA) | przejęcie E6 pkt 5 na polecenie właściciela (`/apps4brew`), wstrzymanie odwołane jego słowami; przypomnienia 07:00/14:00/05:00 utworzone (ID w „Przypomnienia”); `get_session` i `list_events` poprzednika: „not found” (niesprawdzone: jego status i wiadomości po 05:25); ReadNotifications: 0; aktywnych sesji podrzędnych brak | PRZEJĄŁEM → raport 07:00 |
| 11-10 05:45 | koordynator | send_message „PRZEJĄŁEM” do poprzednika: „not found”; raport nocy D-359 w plan-08 @ e01ba05 (E2E 42732430729, CI 42732569378 success — Actions 05:40) | pytanie zbiorcze |
| 11-10 06:10 | właściciel → koordynator | pytanie zbiorcze: odpowiedzi KO-005…KO-016: weto D-360 (Games/Card), ponowna ocena KR/VN, pt-PT osobno ≤ 25 USD API, pełny przegląd AI całości, 11 języków w 1.0, tryb „właściciel”, bez pułapu, site/ na main, build po poprawkach, środowisko tej sesji | zlecenie AM, AN, AO |
| 11-10 06:15 | koordynator | `site/` PokerGym na `main`: ddb0108 (2 pliki, 8 linii — tylko nazwa; `git diff --stat`) | sprawdzić przebieg Pages |
| 11-10 06:20 | koordynator | polecenia AM/AN/AO @ c32ddfa (komunikat tego commitu wymienia też stan — stan dopisany dopiero w następnym commicie, błąd skryptu) | start sesji |
| 11-10 05:52 | koordynator | AM, AN, AO wystartowały (ID w tabeli; create_session przez subagentów, prompt roli przepisany — zgodność znak po znaku niesprawdzona; znana różnica w AO: w szablonie „Przekazanie” roli 09 jedna linia polecenia ma `06-tresci` zamiast `12-niezawodnosc` — bez wpływu, sesje nie robią przekazania roli). Pages 42764138515 na ddb0108 success (05:46). **Korekta godzin:** wpisy dziennika z 05:45–06:20 i godziny w KO-005…017 były szacowane; wg Actions push `site/` na `main` był o 05:45, pytanie zbiorcze ok. 05:35–05:45 | kontrola za ok. 60 min |
