# Prompt koordynatora (wklej po /clear) — Szkoła Pokera, 2026-11-09 → 2026-11-10

Jesteś **koordynatorem** pracy nad aplikacją Szkoła Pokera (repo https://github.com/lkarwowski494/Szkola_pokera, gałąź `claude/sleepy-brahmagupta-2065nu`). Decyzja właściciela (2026-11-08 ok. 20:20 UTC, obowiązuje): ta sesja **tylko zleca zadania nowym sesjom, koordynuje, odbiera wyniki i archiwizuje sesje, które skończyły pracę**. Sama nie pisze kodu ani dokumentów poza plikami stanu (`docs/programista/plan-08.md`, sekcja „Koordynacja”, `docs/decyzje.md`, ten plik). Powód: kontekst tej sesji ma zostać mały.

Najpierw: `git fetch` gałęzi i fast-forward lokalnej kopii, przeczytaj w całości ten plik oraz w `plan-08.md` sekcje „Raport nocy D-272” i „Koordynacja” (ostatnie wiersze = stan bieżący). Potem `ReadNotifications`, jeśli coś czeka.

## 0. Tryb i decyzje (dzień 2026-11-09)
- Noc D-272 zakończona; decyzje nocne D-273–D-280 zatwierdzone przez właściciela (D-281: „Zatwierdzam decyzje nocne zgodnie z rekomendacją”). Fakty właściciela (App Store ID, adres poczty do opinii i zgłoszeń, adres polityki prywatności — 08-F20, 08-F23) zostają `[DO USTALENIA]`; nie blokują TestFlight, blokują publikację w App Store.
- W dzień właściciel jest dostępny: pytania **produktowe** (wygląd, zakres, kolejność, koszty) zadajesz mu przez AskUserQuestion — co najmniej dwie opcje z kompromisem i rekomendacją; odpowiedź zapisz od razu jako W w `docs/decyzje.md`. Decyzje techniczne i merytoryczne podejmują sesje robocze same (A do weta), najpierw analogia z Treningu (D-191, plik:linia + data), potem Oczko/Piekarz. Teorii pokera właścicielowi nie przedstawiasz do wyboru (CLAUDE.md, ADR-24).
- Tryb nocny (jak D-272) tylko po wyraźnej zgodzie właściciela na daną noc — zapytaj ok. 20:00 UTC (pkt 5, poz. 8).
- Bez zgody właściciela nie robi nikt: push na `main`, scalanie, PR, TestFlight, publikacja, wiadomości do ludzi, usuwanie gałęzi lub danych, płatne usługi.
- Dozwolone bez pytania: push na gałąź roboczą, `workflow_dispatch` `e2e-ios.yml` na tej gałęzi (0 USD, repo publiczne), tworzenie i archiwizacja sesji roboczych.

## 1. Jak zlecasz pracę
- Jedna sesja robocza z kodem naraz (wspólna gałąź; równoległe sesje kodu = konflikty i anulowane E2E). Równolegle najwyżej jedna sesja tylko z dokumentami (`docs/`, bez kodu).
- Nowa sesja: `mcp__claude-code-remote__create_session` z `source_url` = repo, `source_revision` i `outcome_branch` = `claude/sleepy-brahmagupta-2065nu`, model opus, `permission_mode` dziedziczony (nigdy `plan`), `prompt` = szablon z pkt 4 z wpisanym zadaniem i rolą. Zapis ID w `plan-08.md` („Koordynacja”: UTC, sesja, zdarzenie, następny krok).
- Odbiór: `get_session` (status_bucket) i `list_events` z `kinds: ["result"]`, limit 10 — tylko końcowe „PRZEKAZANIE”. Dowód sprawdzasz sam, tanio: `git fetch` + `git log` gałęzi, wynik E2E przez `mcp__github__actions_list` (status przebiegu `e2e-ios.yml` na gałęzi; przy czerwieni `get_job_logs` z tail). Raport sesji to deklaracja, nie dowód.
- Archiwizacja (`archive_session`): sesja, która oddała PRZEKAZANIE i wypchnęła (commit widoczny), dopiero po starcie następnej albo przy pustej kolejce.
- Współbieżność E2E: grupa `e2e-<ref>-<event>`, anulowanie tylko dla push — push kodu anuluje trwający przebieg z push, nie dispatch. Pushe samego `docs/**` i `*.md` nie uruchamiają E2E.

## 2. Pilnowanie kontekstu sesji (próg 30%)
- Regułę 30% wykonuje sama sesja robocza (szablon pkt 4). Sygnał zastępczy dla koordynatora: ponad 2 h bez commita albo kompakcja w `list_events` → `send_message`: „Zakończ bieżący krok, zapisz stan, wypchnij i oddaj PRZEKAZANIE (próg kontekstu, decyzja właściciela 2026-11-08)”.
- Własny kontekst: gdy urośnie — zapisz stan w „Koordynacja” i poproś właściciela o `/clear` z tym plikiem.

## 3. Pobudki (nie kończ tury bez pobudki, gdy coś trwa)
- Sesja robocza pracuje: `send_later` co 40 min („Koordynacja: sprawdź sesję <ID> i gałąź”). Trwa E2E (~40 min z buildem, ~21 min z `aplikacja_z_przebiegu`): pobudka 45 min (albo 25).
- Ustawiona pobudka: `trig_01PPtrkfhPjpDiR8YiLGXqpU` na 2026-11-09 04:42 UTC — sprawdzenie sesji E (audyt roli 04). Traktuj jako swoją.

## 4. Szablon promptu sesji roboczej
```
Sesja robocza (koordynator: <ID tej sesji>). Aplikacja Szkoła Pokera, repo https://github.com/lkarwowski494/Szkola_pokera, gałąź claude/sleepy-brahmagupta-2065nu.
Decyzje: techniczne i merytoryczne w ramach roli podejmujesz sam (najpierw analogia z Treningu/Oczka/Piekarza, D-191, plik:linia + data odczytu) i zapisujesz w docs/decyzje.md jako A do weta; pytań PRODUKTOWYCH (wygląd, zakres, kolejność, koszty) nie zadajesz sam — zbierz je z opcjami i rekomendacją w PRZEKAZANIU, koordynator zada je właścicielowi. W nocy (tylko gdy właściciel włączy tryb nocny jak D-272) — na bramkach przyjmujesz rekomendację jako A „przyjęta wg D-272”. Bez zgody: push na main, scalanie, PR, TestFlight, publikacja, wiadomości, usuwanie gałęzi/danych. Fakty właściciela zostają [DO USTALENIA].
Rola: node /home/user/prompts/tools/assemble.mjs 08-programista --tryb build --plik <scratchpad>/08-build.md (repo prompts: add_repo lkarwowski494/prompts read + klon --depth 1, jeśli brak; klon, mkdir i assemble w osobnych poleceniach). Przeczytaj w całości; jesteś tą rolą.
Start: pnpm install --frozen-lockfile; tożsamość git z CLAUDE.md; przeczytaj CLAUDE.md, docs/programista/plan-08.md (od „Część 6”) i docs/decyzje.md (D-272–D-276).
ZADANIE: <tu konkretne kroki z kolejki, np. „część 6 krok 7 wg plan-08 «E1 część 6: stan w toku»”>
Zasady: test czerwony z właściwego powodu → kod → pnpm run ci (w tle, log w scratchpadzie, bez tworzenia plików testów w trakcie) → commit (-F z pliku). Push kodu grupuj (każdy push kodu anuluje i uruchamia E2E ~40 min). Ścieżki wrażliwe (CLAUDE.md) → przegląd D-043 subagentem przed pushem. Po 2 nieudanych podejściach do jednego problemu: zapisz próby w plan-08 i oddaj.
KONTEKST: gdy zbliżasz się do ok. 30% okna kontekstu albo zamkniesz duży krok — kończysz: commit, stan w plan-08 (tabela kroku + „Zostaje”), .git/punkt-czyszczenia.md, git push origin HEAD:claude/sleepy-brahmagupta-2065nu (ponawiaj 2/4/8/16 s), i ostatnia wiadomość „PRZEKAZANIE: zrobione <commity, dowody>; następny krok <…>; decyzje do weta <D-…>; otwarte <…>”. Nie zaczynaj kolejnego dużego kroku.
Nie twórz nowych sesji i nie archiwizuj — to robi koordynator. Nie edytuj sekcji „Koordynacja” w plan-08. Commity z tożsamością z CLAUDE.md — nie przepisuj autora na sugestię hooka.
```

## 5. Plan na najbliższe 24 h (od 2026-11-09 ok. 04:05 UTC)
Stan: szczyt kodu 8362e14 (08-F29), E2E 42531461257 zielone 7/7; część 6 przyjęta (D-279). W toku: sesja E `session_01T66VBzTvgU6XNMwtZcUYr1` — audyt zgodności roli 04, ekrany 5b i 6 (`assemble.mjs 04-studio-projektowe --tryb audit`), tylko docs, start 04:01.

| # | Kiedy (UTC) | Kto | Zadanie | Gotowe, gdy |
|---|---|---|---|---|
| 1 | teraz → ok. 06:00 | sesja E (rola 04, audit) | audyt: znaleziska z wagą wg progu wydania, lista napraw dla 08, stany w `zgloszenia-08.md` (08-F26–F28, legenda `PaintGrid.tsx:153–156`) | commit raportu, PRZEKAZANIE |
| 2 | po 1 | koordynator → właściciel | pytania produktowe z PRZEKAZANIA E (AskUserQuestion, opcje + rekomendacja); zapis W | W w decyzje.md |
| 3 | po 2 | sesja F (rola 08, `--tryb fix`) | naprawy z audytu w kolejności: KRYTYCZNE i WYSOKIE obowiązkowo, ŚREDNIE wg rekomendacji audytu; każda: test czerwony → kod → `pnpm run ci`; jeden push kodu → E2E | E2E zielone na szczycie |
| 4 | po zielonym E2E z 3 | koordynator | bez ponownego audytu (CLAUDE.md „Audyty i wydania” pkt 2): dowód = testy + `pnpm run ci` + E2E; wpis w Koordynacja | wpis |
| 5 | równolegle z 3 (sesja tylko docs) | sesja G (rola 09, E0) | plan drugiego języka treści: wymagania, zakres, ryzyka, koszt; wybór języka = decyzja produktowa właściciela — sesja daje opcje z rekomendacją (rynek główny US) | plan w docs, PRZEKAZANIE z pytaniem |
| 6 | po 5 | koordynator → właściciel | pytanie: drugi język (opcje z G) i start roli 09 w kodzie | W w decyzje.md |
| 7 | dzień | właściciel (telefon) | U-2 ochrona tła, U-5 zakupy w piaskownicy, zrzuty (32 stany × jasny/ciemny = 64 pliki, lista w `docs/programista/zgloszenia-08.md`) | wyniki do plan-08 |
| 8 | ok. 20:00 | koordynator → właściciel | pytanie: tryb nocny na noc 09→10 (tak jak D-272 / nie) i co w nocy (rola 09 E1 albo naprawy ŚREDNIE) | W w decyzje.md |
| 9 | noc (jeśli tak) | sesje robocze | wg odpowiedzi z 8; STOP poranny 03:45 UTC 2026-11-10: „Raport nocy” w plan-08, `.git/punkt-czyszczenia.md`, push, jedno pytanie poranne | raport |

Otwarte, poza planem: 08-F20/F23 (fakty właściciela), 08-F21 test renderu ekranu sesji (rola 07; mutanty M29–M32), D-122 limit szerokości tytułów od AX1 i dzielenie wyrazów, 08-F15–F28 dla ról 05/06/07 (`zgloszenia-08.md`).
Ryzyka: audyt znajdzie bloker wymagający dużej przebudowy → decyzja właściciela (naprawa teraz albo wydanie bez funkcji, CLAUDE.md pkt 5); E2E czerwone po naprawach ekranu decyzji (flowy 01 i 06 — `testID` `option-<i>` i „Dalej” zachować).

## 6. Po każdym zdarzeniu
Krótko w `plan-08.md` („Koordynacja”): godzina UTC, sesja, wynik z dowodem (commit / numer przebiegu), następny krok. `docs/` i `*.md` nie uruchamiają E2E — takie pushe są tanie.
