# Recenzja niezależna: sesja AX (KO-027) — `sesja-ax-pytania` @ e0ab3d2 względem 31347bd

Data: 2026-11-10. Recenzent: świeży kontekst, tylko odczyt i kontrole. Worktree `rec-ax` @ e0ab3d28 (usunięty po recenzji).
Zakres: `git diff 31347bd...e0ab3d2` (159 plików: content/pl/exams 7, 11 języków × 6–7 plików exams, 35 baz, `tresc.generated.ts`, docs).

## Werdykt

**Przyjąć.** Zmiana brzmienia nie zmienia sensu, poprawnej odpowiedzi, identyfikatorów ani liczb; bazy odpowiadają źródłom; testy zielone. Brak znalezisk KRYT/WYS wprowadzonych przez tę gałąź.
Jedno znalezisko WYS **istniejące przed zmianą** (m5.exam.q2 / R-M5-004, Z-1) nie jest regresją i nie wstrzymuje przyjęcia gałęzi, ale wg progu „Audyty i wydania” wymaga rozstrzygnięcia przed wydaniem (D-487 opisuje je jako „otwarte” — waga zaniżona).

## 1. Tabela 8 pytań puli (pl)

Pula: `apps/mobile/src/features/ocena-poziomu/ocenaPoziomu.ts:19-28`. Oznaczenie poprawnej (wzorzec `correct` po indeksach) przed i po: `100` we wszystkich 7 zmienionych (skrypt porównujący YAML bazy i HEAD).

| ID | zmienione? | sens bez zmian | poprawna bez zmian i jedyna | uwagi |
|---|---|---|---|---|
| m0.exam.q1 | nie | — | — | bez zmian w żadnym języku |
| m1.exam.q2 | tak (prompt; `pl/exams/m1.yaml:17`) | tak | tak (po zakładzie nie można czekać; R-M1-001) | „Rywal przed tobą postawił” → „Rywal postawił zakład i teraz twoja kolej”; `why` nadal pasuje. Przekład zmieniony tylko w de (Z-5) |
| m2.exam.q5 | tak (prompt; `m2.yaml:61`) | tak | tak (30 ÷ 120 = 25%) | „Przed zakładem rywala w puli jest 60 żetonów” zgodne z rachunkiem w `why` (60+30+30); jednostka klucza `count`, więc „żetonów” poprawne; equity objaśnione definicją z `terms.yaml:502` |
| m3.exam.q2 | tak (prompt, opcje 0 i 2, `why` opcji 2; `m3.yaml:18-23`) | tak | tak (AT o z UTG: przebicie; R-M3-002) | „Sprawdzam duży blind” zgodne z definicją limpa `terms.yaml:612` („samo sprawdzenie dużego blinda”) i call = „sprawdzenie” `terms.yaml:161-162`; „sześć osób” zgodne z R-M3-002 (`rules.yaml:132`, `check.players: [6]`). Niespójność z lekcją — Z-3 |
| m4.exam.q1 | tak (prompt; `m4.yaml:9`) | tak | tak („Do 10bb”; R-M4-002) | „otworzył grę, przebijając do 2,5bb”; „przebić jeszcze raz (3-bet)” — Z-6 |
| m5.exam.q2 | tak (prompt; `m5.yaml:19`) — tylko redakcja | tak | bez zmian; jedyność — patrz Z-1 | D-487 „treść bez zmian” = bez zmiany merytorycznej; brzmienie promptu zmienione w 12 językach („gracz na dużym blindzie”, objaśnienie flopa) |
| m6.exam.q5 | tak (prompt; `m6.yaml:44`) | tak | tak (17% i 30%) | „Jesteś na dużym blindzie” zgodne z `table.position: BB`; „przed zakładem w puli 80” zgodne z rachunkiem |
| m8.exam.q1 | tak (prompt, `why` opcji 0; `m8.yaml:8,10`) | tak | tak (3 wygrane vs 4 przegrane sprawdzenia → czekam; R-M8-001) | założenie „może już tylko sprawdzić albo spasować” = `if` R-M8-001 (`rules.yaml:645`); „4 ręce lepsze” usuwa dwuznaczność „4 razy lepszą ręką”; „Tak:” → „Dobrze:” przy odpowiedzi „Nie” |

Punkty 1a–1g:
- (a)(b)(c) — jak w tabeli; `rules:`, `family`, `table`, `kind` bez zmian we wszystkich zmienionych zadaniach.
- (d) terminologia m3.q2 zgodna z glosariuszem (`content/terms.yaml`); tabeli terminologii dokumentu 13 na Drive nie czytałem (niesprawdzone).
- (e) każde pojęcie w promptach ma znacznik `{{t:}}` (objaśnienie w nawiasie przy renderze; render wg `docs/tresci/dowody-ax/pula-po-pl.md`, sam renderer nieuruchamiany ręcznie — testy jest oceny poziomu zielone).
- (f) poza pulę nie wyszło nic: w pl zmienione dokładnie 7 zadań, wszystkie z puli; w pozostałych językach te same 6 (+ m1.q2 w de). Nagłówki plików i pozostałe zadania identyczne.
- (g) znaczniki `{{n:}}` w każdym zmienionym zadaniu identyczne co do zbioru z bazą i z pl; brak nowych cyfr w pl („sześć”, „trzech” słownie, jak w R-M3-002). Cyfry w ja/ko — Z-4.

## 2. Przekłady

- en — przeczytane w całości (6 zadań, 10 pól): sens = nowy pl, poprawna bez zmian, znaczniki zgodne. m1.q2 en bez zmian („An opponent acting before you has bet…”) — sens równy nowemu pl.
- 10 języków strukturalnie (skrypt, wszystkie zmienione zadania): te same ID co w pl (wyjątek m1.q2: tylko de), liczba opcji = pl, wzorzec `correct` = pl i = baza, zbiór `{{n:}}` = pl i = baza, zbiór `{{t:}}` w promptach = pl, brak uszkodzonych znaczników, brak polskich znaków i angielskich słów-pozostałości. 0 flag.
- Treściowo m3.q2 we wszystkich 11: de, es, fr, it, pt, pt-BR — zgodne; ja, ko, zh-Hant, vi — zgodne w zakresie mojej znajomości (vi i ko: tylko sens ogólny i struktura, niuanse „niesprawdzone”). Opcja 0 bez „duży blind” w fr/ja/ko/vi/zh-Hant — odstępstwo nazwane w D-486, bez wpływu na sens.
- Próbka: de (m1.q2, m2.q5, m4.q1, m8.q1), es (m2.q5, m4.q1, m8.q1), fr (m2.q5, m4.q1, m8.q1), ja (m2.q5, m4.q1, m8.q1) — zgodne z nowym pl. `why` poprawnej opcji m8.q1 w de/es/it/ja/ko/pt-BR/vi/zh-Hant już wcześniej zaczynało się od „Richtig/Correcto/Giusto/正解…”, więc brak zmiany jest uzasadniony.

## 3. Bazy generowane

`pnpm content:build` → kod 0 (35 s), po nim `git status --short` = 0 linii; `pnpm content:check` → kod 0 („Treść aktualna (35 baz): 44 lekcji, 141 reguł, 162 terminów”; jedyna uwaga dotyczy `lessons/m10-l4-rake.md`, poza zakresem). `tresc.generated.ts`: zmiana wyłącznie skrótu `6e372be925` → `311aeef646` w `WERSJA_TRESCI` i 35 nazwach plików.

## 4. Identyfikatory

Listy `id` zadań w każdym pliku exams (12 języków) identyczne z bazą; kolejność i liczba opcji bez zmian (opcje nie mają własnych ID — identyfikuje je indeks). Brak znalezisk.

## 5. m5.exam.q2 (D-487)

- Dane wejściowe podane: `content/ranges/preflop-6max-100bb.json`, ścieżki spotów w `licz.py`, komenda w README. `python3 -I docs/tresci/dowody-ax/m5-q2/licz.py` → kod 0, wynik identyczny z `wynik.txt` (diff pusty). Poprawności samych zakresów solvera nie sprawdzałem.
- Ocena obecnego brzmienia: Z-1 (WYS istniejące) i Z-2.
- Rekomendacja A jest spójna z `rules.yaml:356-363`: `because` R-M5-004 kończy się „to on ma przewagę nutsów”, a `why` poprawnej opcji też; A wymaga jednak równoczesnej zmiany `because` (usunięcie „częściej ma dwie pary albo strita”) i sprawdzenia setów — patrz Z-1; bez tego A przeniesie niepoparte twierdzenie do nowego brzmienia. Cytaty „at the top end” i „far more flushes and straights” są w `docs/tresci/rejestr.json`.

## 6. Log CI i testy

- `docs/tresci/dowody-ax/ci-2026-11-10.log:1` „pnpm run ci na 60adafcffde962ef1f8096e9d2642db907075ce8”, ostatnia linia „KOD WYJŚCIA: 0”; `git diff --stat 60adafc e0ab3d2` = tylko ten log.
- Uruchomione w worktree @ e0ab3d2 (pełnego `pnpm run ci` nie uruchamiałem): `pnpm --filter @szkola/content-build test` → 0 (180 testów); `pnpm --filter @szkola/content-schema test` → 0; `pnpm test:akceptacja:domena` → 0 (14 testów); `jest src/features/ocena-poziomu` → 0 (5 zestawów, 49 testów); `content:build`, `content:check` → 0.

## 7. Autor i sekrety

`git log --format='%an <%ae>' 31347bd..e0ab3d2`: 14 commitów, wszystkie `Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>`. Przeszukanie dodanych linii (bez baz binarnych) wzorcami kluczy/tokenów/adresów e-mail: 0 trafień poza nazwami testów w logu.

## Znaleziska

| ID | waga | plik:linia | opis | dowód | naprawa |
|---|---|---|---|---|---|
| Z-1 | WYS (istniało przed zmianą; nie regresja; nie blokuje przyjęcia gałęzi) | `content/pl/exams/m5.yaml:19,22-24`; `content/pl/rules.yaml:360` | `why` poprawnej opcji i `because` R-M5-004 twierdzą, że na niskim połączonym flopie duży blind „częściej ma dwie pary albo strita” i ma „przewagę nutsów”. Rachunek autora na zakresach solvera aplikacji tego nie potwierdza: sama kategoria „dwie pary albo strit” to 2,0% vs 1,8% (tylko call) albo remis 1,8% (obrona łącznie), a po doliczeniu setów Button ma więcej w obu wariantach. Źródła w rejestrze dotyczą innych spotów (654r 20bb MTT; 8d7d6d). `why` opcji A-A-7 pomija, że dwie pary daje tam każda para kieszonkowa. | `wynik.txt`: 8-6-5 BTN dwie pary 5,1 + strit 3,7 + trójka 9,0 = 17,8/496,4 = 3,6%; BB call 4,1+4,1+3,6 = 11,8/417,8 = 2,8%; BB obrona łącznie 6,0+4,7+9,0 = 19,7/593 = 3,3% | Rozstrzygnąć D-487 przed wydaniem: opcja C (wymiana pytania M5 w puli) jako szybka, a dla q2 i R-M5-004 opcja A dopiero po doczytaniu źródła dla spotu BTN vs BB 100bb i uwzględnieniu setów; podnieść wagę w D-487 z „otwarte” do blokera wydania albo zapisać decyzję właściciela |
| Z-2 | NIS | `docs/tresci/dowody-ax/m5-q2/README.md:13`; `docs/decyzje.md` D-487 | Wniosek 1 („dystraktor A-A-7 nie jest jednoznacznie fałszywy”) opiera się na obronie łącznej (call + 3-bet), a pytanie mówi „sprawdził”; w wariancie call dystraktor jest wyraźnie fałszywy (15,5% vs 21,4%). | `wynik.txt` linie A-A-7 | Doprecyzować wniosek: niejednoznaczność dotyczy głównie 8-6-5 (margines 0,2 pp) i `why`, nie A-A-7 |
| Z-3 | ŚR | `content/pl/lessons/m3-l1-pozycja.md:27,37`; `content/pl/exams/m3.yaml:51,61` vs `m3.yaml:23` | Dwa brzmienia tej samej opcji: „Dopłacam do dużego blinda” (lekcja M3, m3.q5, m3.q6) i „Sprawdzam duży blind” (m3.q2) — zasada „jedna nazwa na jedno pojęcie”. Autor nazwał to w `dowody-ax/README.md`. | grep | Backlog z wersją: ujednolicić do „Sprawdzam duży blind” (zgodne z `terms.yaml:612`) w lekcji i q5/q6 + 11 języków |
| Z-4 | NIS | `content/ja/exams/m3.yaml:18` („6人”); `content/ja/exams/m5.yaml:19`, `content/ko/exams/m5.yaml:19` („3”) | Nowe cyfry wpisane ręcznie w przekładach (pl ma słownie). `content:check` nie zgłasza; w ja istnieje już 231 linii z takim zapisem, więc to utrwalona konwencja. | skrypt porównania cyfr | Bez zmiany albo zapis słowny (六人 / 三枚) przy następnej poprawce |
| Z-5 | NIS | `content/de/exams/m1.yaml:17` vs `content/{en,es,fr,it,ja,ko,pt,pt-BR,vi,zh-Hant}/exams/m1.yaml:17` | m1.q2 przeredagowane w pl i de, w 10 językach stare brzmienie („przeciwnik przed tobą postawił”). Sens równy, więc bez wpływu na odpowiedź; brak wzmianki w D-486. | diff | Dopisać w D-486, że m1.q2 nie wymagało zmiany w 10 językach |
| Z-6 | NIS | `content/pl/exams/m4.yaml:9` | „chcesz przebić jeszcze raz (3-bet)” — „jeszcze raz” może sugerować, że gracz już raz przebijał; sens rozstrzyga nawias i kontekst. | cytat | Opcjonalnie: „chcesz przebić jego przebicie (3-bet)” |
| Z-7 | NIS | `content/pl/exams/m8.yaml:8-12`; `m6.yaml:44-49` | Prompt używa „zakład”, a opcje i `why` nadal „bet/Bet/becie” bez znacznika (istniało wcześniej; po zmianie mieszanie w jednym zadaniu jest bardziej widoczne). `terms.yaml:153-154`: bet = „zakład”. | cytat | Backlog: ujednolicić w `why` przy następnej poprawce M6/M8 |

Liczba: KRYT 0, WYS 1 (istniejące, poza regresją), ŚR 1, NIS 5.

## Niesprawdzone

- Pełne `pnpm run ci` i E2E (uruchomiono podzbiór z pkt 6).
- Dokumenty 12 i 13 na Drive (tabela terminologii, wpis do rejestru) — oceniono tylko `content/terms.yaml` i `wpis-dokument-13.md` w repo.
- Poprawność zakresów solvera i źródeł zewnętrznych R-M5-004 (nie czytałem stron); rachunek `licz.py` tylko odtworzony, nie zweryfikowany niezależną implementacją.
- Jakość językowa ko, vi, zh-Hant, it, pt, pt-BR poza m3.q2; w de/es/fr/ja pytania m5.q2 i m6.q5 tylko strukturalnie.
- Render na urządzeniu (mieszczenie się tekstu, lista T-ax-1…4) i zawartość baz `.db` odczytem SQL (potwierdzono pośrednio: przebudowa nie zmienia plików).
- Pliki `przeklady/recenzja-*.json` i przeglądy `przeglad-*.md` autora — nieczytane.
