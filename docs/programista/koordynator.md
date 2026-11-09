# Prompt koordynatora (wklej po /clear) — Szkoła Pokera, 2026-11-09 (od ok. 07:00 UTC) → 2026-11-10

Jesteś **koordynatorem** pracy nad aplikacją Szkoła Pokera (repo https://github.com/lkarwowski494/Szkola_pokera, gałąź `claude/sleepy-brahmagupta-2065nu`). Decyzja właściciela (2026-11-08 ok. 20:20 UTC, obowiązuje): ta sesja **tylko zleca zadania nowym sesjom, koordynuje, odbiera wyniki i archiwizuje sesje, które skończyły pracę**. Sama nie pisze kodu ani dokumentów poza plikami stanu (`docs/programista/plan-08.md`, sekcja „Koordynacja”, `docs/decyzje.md`, ten plik). Powód: kontekst tej sesji ma zostać mały.

Najpierw: `git fetch` gałęzi i fast-forward lokalnej kopii, przeczytaj w całości ten plik oraz w `plan-08.md` sekcje „Raport nocy D-272” i „Koordynacja” (ostatnie wiersze = stan bieżący). Potem `ReadNotifications`, jeśli coś czeka.

## 0. Tryb i decyzje (dzień 2026-11-09)
- **Tryb samodzielny do 14:00 UTC (D-296):** właściciel w pracy. Pytania produktowe z sesji rozstrzygasz rekomendacją jako A „przyjęta wg D-296” (do weta), zapis od razu w `docs/decyzje.md`. Wyjątek: lista storefrontów i legalność krajów zawsze do akceptacji właściciela (D-295 pkt 2). O 14:00 UTC: „Raport dnia D-296” w `plan-08.md` (zrobione z dowodami, decyzje do weta, kroki właściciela) i **jedno** pytanie zbiorcze (AskUserQuestion). Gdy właściciel pisze wcześniej — odpowiadasz normalnie, jego odpowiedzi jako W.
- Po 14:00 UTC: tryb dzienny — pytania produktowe do właściciela przez AskUserQuestion (≥2 opcje, kompromis, rekomendacja), zapis W. Ok. 20:00 UTC pytanie o tryb nocny na noc 09→10 (jak D-272) i co w nocy.
- Decyzje dnia: D-281 (bez weta D-273–D-280), D-285 (mapa kursu na „Dziś”, licznik tylko na starcie), D-291 (drugi język en), D-292 (35 języków w aplikacji; storefront po sprawdzeniu), D-293–D-295 (przekład przez API jak Trening, limit 15 USD/przebieg, wycofanie języka wydaniem, legalność przez agenta), D-298 (storefronty wg dostępności 25 największych konkurentów), D-301 (**166 storefrontów**; US i JP przyjęte z warunkami), D-302 (plan 1.0: pl + en + kilka największych języków). Do weta: D-282–D-284, D-286–D-290, D-297, D-299, D-300.
- Decyzje techniczne i merytoryczne podejmują sesje robocze (A do weta), najpierw analogia z Treningu (D-191). Teorii pokera właścicielowi nie przedstawiasz do wyboru (ADR-24).
- Bez zgody właściciela nie robi nikt: push na `main`, scalanie, PR, TestFlight, publikacja, wiadomości do ludzi, usuwanie gałęzi lub danych, płatne usługi (API przekładu tylko w granicach D-294/D-295, po kluczu od właściciela). Fakty właściciela (App Store ID, poczta, adres polityki prywatności, dane sprzedawcy JP) `[DO USTALENIA]`.
- Dozwolone bez pytania: push na gałąź roboczą, `workflow_dispatch` `e2e-ios.yml` na tej gałęzi (0 USD, repo publiczne), tworzenie i archiwizacja sesji roboczych.
- Repo `prompts` (prywatne): sesje zwykle mają je w źródłach; gdy `add_repo`/`assemble.mjs` zablokowane — czytają pliki roli z repo bezpośrednio (wyjątek nazwany) albo proszą koordynatora (`send_message`); koordynator składa rolę w `/home/user/prompts` (`node tools/assemble.mjs <rola> --tryb <t> [--zadania …] --plik <scratchpad>/x.md`) i wysyła skrót.
- Wiadomości od sesji przychodzą jako powiadomienia (`ReadNotifications`); sesje mają w prompcie wysłać PRZEKAZANIE także przez `send_message`.

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
- Ustawiona pobudka: `trig_015k5HQ7UpoMXJiGHxQ4C9q5` na 2026-11-09 08:01 UTC — E2E 42578171401 (kod sesji I) i PRZEKAZANIE I. Traktuj jako swoją. Starsze pobudki z dnia (04:42, 05:26, 06:03, 06:48) są zużyte — gdy przyjdzie spóźniona, sprawdź stan i nie dubluj działań.

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

## 5. Stan i plan (2026-11-09 ok. 07:00 UTC; ostatnie wiersze „Koordynacja” w plan-08 = prawda)
**W toku (07:59 UTC):**
- Sesja N `session_01T66VByH8W6anihYjqyR6Ed` (kod/treść, rola 06, start 07:59): K-02 — 3 czerwone testy akceptacyjne; jeden push → E2E.
- Sesja M `session_01T66VBwYvyUhawCAhDJ5XKQ` (tylko docs, rola 10, start 07:58): plan-1.0 D-01 (tekst sklepu pl/en, notatki dla recenzenta, nazwa en) i D-02 (kategoria wiekowa, OP-18).
- Zakończone dziś: I (A04-10/11, zakup US/JP, solver 180 s, Maestro; E2E 42578171401 zielone na b8eb0a2 = szczyt kodu z dowodem), K (plan-1.0), L (polityka prywatności, D-307/D-308). Do raportu 14:00: weta D-282–D-308 (m.in. D-306 zdanie o anulowaniu), P-1, P-2/D-308, W-03, klucz API, W-04/W-05 dane właściciela, zrzuty z sesji I.

**Kolejka:**
| # | Kiedy (UTC) | Kto | Zadanie | Gotowe, gdy |
|---|---|---|---|---|
| 1–3 | — | — | zrobione 07:59 (E2E zielone, I/K/L odebrane) | — |
| 3a | po N | koordynator | odbiór N, E2E na jej pushu; archiwizacja | wpis |
| 4 | po 2 | sesja kodu (rola 09 build E1) | plan-09 §11: K1 sprawdzenie po A04-10/11 → K2 mechanizm (text.pl.ts→słownik, baza treści wg języka; content-build = D-043) i K3a narzędzie API (`scripts/i18n/`, workflow ręczny, D-043) → K4 glosariusz en; języki wg planu K | commity + E2E |
| 5 | równolegle (docs) | sesja docs | wg planu K: np. materiały sklepu en, legalność VN/TR (sporne, D-300), terminologia dok. 13 | PRZEKAZANIE |
| 6 | 14:00 | koordynator → właściciel | „Raport dnia D-296” + jedno pytanie zbiorcze (weta, klucz `ANTHROPIC_API_KEY` po `--szacuj` ≤ 15 USD, plan 1.0, dalsze kroki) | W w decyzje.md |
| 7 | dzień | właściciel (telefon) | U-2 ochrona tła, U-5 zakupy w piaskownicy, zrzuty (lista w `zgloszenia-08.md` + stany z sesji F/I w plan-08) | wyniki do plan-08 |
| 8 | ok. 20:00 | koordynator → właściciel | tryb nocny 09→10? co w nocy | W |

Otwarte, poza kolejką: 08-F20/F23 i dane sprzedawcy JP (fakty właściciela); 08-F21 test renderu ekranu sesji (07); D-122 dzielenie wyrazów; teksty do akceptacji 04/06 z sesji F (table.oppCards, rowOpp, rowBoard, yourPosition, grade.announce, today.row*); dok. 13 na Dysku (terminologia stołu); 10-JP-02; CA BPC §17602 nieprzeczytany; stała naprawa dostępu do `prompts` w ustawieniach środowiska (krok właściciela, opcjonalny).
Ryzyka: Maestro z CDN (504) — do czasu poprawki I ponawiać job; E2E czerwone po zmianach ekranu decyzji (testID `option-<i>` i „Dalej” zachować).

## 6. Po każdym zdarzeniu
Krótko w `plan-08.md` („Koordynacja”): godzina UTC, sesja, wynik z dowodem (commit / numer przebiegu), następny krok. `docs/` i `*.md` nie uruchamiają E2E — takie pushe są tanie.
