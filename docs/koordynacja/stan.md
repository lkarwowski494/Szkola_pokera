# Koordynacja Szkoła Pokera (PokerGym) — stan (aktualizacja 2026-11-10 05:20 UTC)

Migracja na M9 (moduł „migracja”, D-056) z koordynatora bez M9 `session_01T66VBzPr7MhGZ3A6RPdfBG`. Dawne pliki stanu zostają na gałęzi roboczej: `docs/programista/koordynator.md` (prompt i kolejka nocy), `docs/programista/plan-08.md` sekcja „Koordynacja” (dziennik od 2026-11-08, ostatni wpis 01:51 UTC 10.11), `docs/decyzje.md` (rejestr D-NNN aplikacji, ostatni D-394).

## Mandat (przepisuj bez zmian; zmienia go tylko właściciel)
- Tryb decyzji: **analogia** od 2026-11-09 ok. 19:25 UTC (D-359, tryb nocny 09→10), słowa: „Ty podejmujesz wszystkie decyzje zgodnie z tym, co i tak byś zarekomendował. Prace zlecasz do innych sesji, żeby oszczędzać swój kontekst, a sam tylko koordynujesz. Pilnujesz ich, żeby nie przekroczyły 30% limitu kontekstu; jak to się stanie, zapisują stan i przekazują zadanie dalej.” Decyzje zapisywane jako A „przyjęta wg D-359” do weta. Po raporcie rannym (D-359: „Rano raport nocy w plan-08 i jedno pytanie zbiorcze”) tryb dzienny jak D-296/D-341: pytania produktowe do właściciela z ≥ 2 opcjami i rekomendacją (= tryb „właściciel” dla spraw produktowych) — [DO USTALENIA] słowami właściciela, czy po raporcie zostaje „analogia”.
- Stała zasada z `CLAUDE.md` (decyzja właściciela 2026-11-03/2026-11-07, D-191): przed każdą decyzją najpierw analogia z Treningu (`lkarwowski494/trening`, `plik:linia`, data odczytu), wzory procesu także Oczko i Piekarz; sprawy merytoryczne pokerowe rozstrzyga hierarchia źródeł ADR-24 (nie właściciel).
- Repo portfela do analogii (odczyt): lkarwowski494/trening, lkarwowski494/oczko, lkarwowski494/piekarz.
- Zgody trwałe (słowa w `docs/decyzje.md`):
  - D-342 (2026-11-09 ok. 14:10) + D-348, D-355, D-356: push na `main` **tylko** wymienionych plików: `.github/workflows/przeklad-tlumaczen.yml`, `pages.yml`, `site/**` (z nową nazwą PokerGym — **tylko po nowej zgodzie**, D-378), 4× `asc-*.yml`, `store-screenshots.yml`, `asc-produkty.yml`. Nic poza nimi.
  - D-375 (2026-11-09 21:08): „Ok zgoda na jezyki z rekomendacji i API do 80 USD” — przekład de, es, ko, it, vi; ≤ 15 USD na przebieg; **wykorzystane 53,92 USD, zgoda wyczerpana zadaniem** (przekład zakończony 8/8).
  - D-358/D-359: dotłumaczenia po poprawkach ≤ 5 USD łącznie (wykorzystane 0).
  - Workflowy App Store Connect w trybie zapisu uruchamia i zatwierdza (`release`) **tylko właściciel**, zawsze z ref gałęzi roboczej (z `main` padają). Koordynator: tylko podglądy/kontrola.
- Zawsze za zgodą: push i scalenie na `main` (poza listą wyżej), PR, App Store Connect zapis, TestFlight, publikacja, usuwanie gałęzi i danych, force-push, koszty stałe, wiadomości do ludzi, koszt API ponad pułap.
- Pułapy kosztu: sesja [DO USTALENIA] (w praktyce 4,6–40 USD na sesję, `koszty.md`), doba [DO USTALENIA]; API przekładu wg zgód wyżej. Do ustalenia słowami właściciela.
- Koordynator aktywny: session_01T66VBvZebfV7GaciZqtW3H (od 2026-11-10 05:12 UTC; poprzednik session_01T66VBzPr7MhGZ3A6RPdfBG).
- Środowisko: environment_id env_011LiSvPc7hKtQZSkk13hSky, model claude-opus-5-5, wysiłek medium, permission_mode auto, extra_allowed_tools brak; repo sesji: lkarwowski494/Szkola_pokera, lkarwowski494/prompts (biblioteka, prywatna — dodawać przez add_repo read).
- Gałąź robocza: `claude/sleepy-brahmagupta-2065nu`; gałąź stanu: `koordynacja` (utworzona 2026-11-10 od ab820a8).

## Teraz
- Kolejka nocy D-359 wykonana: przekład + nałożenie + wydanie w kodzie 11 języków (pl, en, ja, zh-Hant, pt-BR, fr, de, es, ko, it, vi), nazwa PokerGym w kodzie, metadane sklepu. Brak aktywnych sesji podrzędnych.
- Szczyt kodu z dowodem: **6afa34d** (E2E 42732430729 zielone 01:41; CI 42732569378 na 3d9b776, ten sam kod, zielone). Gałąź robocza @ ab820a8 (tylko docs nad 6afa34d).
- Następny krok: **07:00 UTC raport nocy D-359** (w `docs/programista/plan-08.md`) + jedno pytanie zbiorcze do właściciela (treść: „Czeka na właściciela”). Do tego czasu bez nowych sesji.

## Sesje
| Litera | ID | Rola, tryb | Gałąź @ SHA | Kontekst % | Koszt USD | Stan |
|---|---|---|---|---|---|---|
| — | — | brak aktywnych (ostatnia AL zarchiwizowana 01:00) | — | — | — | — |

Litery użyte dotąd: A…Z, AA…AL (następna: **AM**). Polecenia nocy były w treści `create_session` (wzór: `docs/programista/koordynator.md` pkt 4); od teraz w `docs/koordynacja/polecenia/<litera>.md`.

## Plan 24 h (UTC)
| Kiedy | Co | Kto | Zależy od | Od właściciela |
|---|---|---|---|---|
| 07:00 | Raport nocy D-359 w plan-08 + jedno pytanie zbiorcze (AskUserQuestion) | koordynator | — | odpowiedzi |
| po odpowiedzi | Weta → poprawki (sesja kodu, rola 08/09) | AM… | weta | — |
| po odpowiedzi | Fala 2 metadanych → `store/` i zapis metadanych w ASC (właściciel, `asc-metadane`, release) | sesja 10 + właściciel | znaki towarowe PokerGym, decyzja o językach 1.0 | sprawdzenie USPTO/EUIPO/WIPO, Approve |
| po zgodzie | `site/` (PokerGym) na `main`: site/privacy.html, site/support.html | koordynator/sesja 08 | zgoda | zgoda |
| dzień | Testy na telefonie: `docs/lokalizacja/lista-telefonu-4.md`, `lista-telefonu-de-es.md`, `lista-telefonu-ko-it-vi.md`, K6 en | właściciel | build TestFlight (zgoda) | czas |
| backlog | flow E2E CJK, zrzuty 320 pt/AX5 ja/fr, NISKIE z D-043 AE/AK/AL, terms-nazwy [DO USTALENIA] (ko 25, it 52, vi 48 + 22 z D-392), zh-Hant limp 溜入, notatki recenzenta po W-04 | sesje 08/09 | zakres 1.0/1.1 | decyzja zakresu |

## Czeka na właściciela (pytanie zbiorcze 07:00)
- Weta decyzji A z nocy: D-343–D-346, D-349–D-354, D-357, D-360–D-373, D-376, D-379–D-394 (lista: `docs/decyzje.md`; KO w `decyzje.md`).
- W-04: e-mail wsparcia + dostawca skrzynki; administrator (imię i nazwisko, forma); W-05: Apple ID aplikacji; W-07: dane sprzedawcy JP (wariant A D-361).
- Znaki towarowe „pokergym” / „poker gym” (USPTO, EUIPO, WIPO GBD w przeglądarce) przed zapisem nazwy w ASC (D-378, D-382).
- Zgoda na push `site/` z nową nazwą na `main`.
- Zakres 1.0: które języki (wydane w kodzie 11) i kiedy wysyłka do Apple [OCENA ~20.11 pl+en albo później z resztą]; fala 2 metadanych do `store/`.
- Konto Apple Search Ads (D-377; najpewniej dopiero po premierze, `docs/sklep/search-ads-kroki.md`).
- Pułapy kosztu sesji i doby do mandatu; tryb decyzji w dzień.
- Zgoda na `add_repo lkarwowski494/prompts` (read): odrzucone przez klasyfikator trybu auto 05:12 (tak samo u koordynatora Piekarza 00:16). Bez biblioteki koordynator nie składa ról sesji podrzędnych → do zgody bez nowych sesji (E6 pkt 5.1). Alternatywa: reguła uprawnienia dla `mcp__claude-code-remote__add_repo` w ustawieniach.
- Notatki recenzenta ASC (jedyna RÓŻNICA kontroli 42706853122) — czekają na W-04.

## Przypomnienia
- trig_01AeLXmJouMbVztuzcB4fAF7 „Koordynator Szkoła Pokera: raport nocy” 07:00 UTC 10.11 (jednorazowo) · trig_019PQfnnVoXW4mwtNVKTwddy „…: linia 14:00” 10.11 · trig_01TZaaQwGGQsTwNNy3JN3WHC „…: linia 05:00” 11.11. Kontrola tylko gdy coś trwa.
- Poprzednika: trig_01BrH7Zk3tSKmXLeQ1wovYhg „kontrola przekazania” 05:42 (sprząta poprzednik).
- Push na gałąź stanu przechodzi przez hook pre-push (typecheck, i18n, content) — w nowym kontenerze najpierw `pnpm install --frozen-lockfile` (5,6 s).

## Pule numerów decyzji
- Rejestr aplikacji `docs/decyzje.md`: ostatni D-394; następny wolny **D-395**. Sesjom przydzielaj pule (noc: 4 kolizje numerów, WG-01).
- KO następny: **KO-005**.

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
