# Recenzja niezależna: sesja BA, KO-029 / D-500 (`sesja-ba-m5q2` @ 02ec8c4 wobec bca751e)

Data: 2026-11-10. Recenzent: świeży kontekst, tylko odczyt i kontrole (worktree `rec-ba`, usunięty po recenzji). Zakres: 4 commity, 24 linie pl + 11 języków, bazy treści, dowody `docs/tresci/dowody-ba/`.

## Werdykt

**Przyjąć po poprawkach: Z-1 i Z-2 (WYSOKIE) przed scaleniem.** Kierunek zmiany jest dobry i dobrze udokumentowany dla flopów **połączonych** (7-6-5, 8-6-5), ale te same nowe zdania wyświetlają się też na niskich flopach **półpołączonych** (połowa losowanych przypadków), gdzie są fałszywe (strit niemożliwy) i sprzeczne ze źródłem szczebla 2, które autor sam cytuje. Z-3…Z-5 (ŚREDNIE) do backlogu lub przy okazji tej samej poprawki.

Liczba znalezisk: KRYT 0 · WYS 2 · ŚR 3 · NIS 4.

## 1. Źródła (pobrane 2026-11-10 `curl -sL`, HTTP 200 ×5; cytaty szukane w tekście po zdjęciu znaczników, apostrofy znormalizowane)

| Adres | Cytat | Dosłownie? | Wspiera wniosek? |
|---|---|---|---|
| blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/ | „Connected boards are a unique case due to flopped straights often being in the BB’s range.” | tak | tak — cash, BTN vs BB (artykuł: „we’ll use the most common postflop formation, BTN vs BB”); dalej: „In order to be respectful of this, we size down; Connected boards see the least amount of the 133% pot sizing.” Dotyczy tylko flopów „connected” (= strit możliwy). Nie mówi wprost „brak przewagi nutsów”. |
| tamże | „Size down and bet less on flops that complete straights and flushes in your opponent’s range.” | tak | tak (`then`) — znów tylko flopy, na których strit jest już możliwy |
| tamże | „We connect better with high-card boards and get to bet more.” | tak | tak |
| tamże | „reduced nut advantage from trips being in both player’s ranges” | tak | tak jako powód wymiany A-A-7 („reduced”, nie „brak”; dalej: „The higher the pair … the larger our advantage”) |
| blog.gtowizard.com/bullying-the-blinds-with-continuation-bets/ | „BB’s advantage at the top end makes BTN vulnerable to check-raises” (654r); „enormous range advantage from top to bottom” (AQ7r); „less than 52% equity” | tak ×3 | kierunkowo — MTT 20bb (BTN 37bb / BB 21bb), format nazwany przez autora |
| blog.gtowizard.com/flop-heuristics-ip-c-betting-in-mtts/ | „An UTG raiser’s narrow range is less likely to contain straights and flushes, denying them the nuts advantage that facilitates larger bets.” | tak | tylko UTG vs BB, 40bb MTT |
| tamże | „the major exceptions are the monotone and connected boards, where overpairs are at their weakest, and the raiser generally does not have a nuts advantage to leverage with big bets.” | tak | **częściowo**: sekcja „Continuation Betting vs the Small Blind” (BTN vs **SB**, 40bb MTT), nie BTN vs BB; ten sam artykuł o wcześniejszych pozycjach: „they are less likely to hold nut hands than a BTN raiser” — czyli BTN ma na tych flopach więcej nutsów niż UTG. Spot nazwany w `zadanie1-zrodla.md`, rejestrze i wpisie do dok. 12, ale nie w `rules.yaml:363` ani w D-500 (Z-4). |
| blog.gtowizard.com/overbetting-the-flop-in-cash-games/ | „Double-Broadway boards …” / „Give us a large nut advantage as the preflop raiser (PFR).” | tak | tak dla K-10-3 i A-Q-7 (dwie karty T+). **Ten sam artykuł, sekcja „Middling Board Overbets”, o 973r: „the BTN has a monopoly on all of the overpairs. Due to the complete lack of possible two pairs and straights on this board, any overpair is essentially the nuts.” — przeczy nowemu zdaniu na flopach półpołączonych (Z-2).** |
| upswingpoker.com/nut-range-positional-advantage/ | „more combinations of super strong hands (two-pair or better)”; „If the board was low and connected in the example above, the Big Blind will often have the nut advantage.”; „the Big Blind will not have such a big nut advantage on those low boards”; „I estimated” | tak ×4; tytuł h1 i data 2019-01-15, autor „Dan B.” zgodne | tak, szczebel 4, „often”; zastrzeżenie o rake’u popiera słabszą wersję („nie masz”) zamiast „BB ma” |

Rachunek: `python3 -I docs/tresci/dowody-ba/rachunek.py` → wynik identyczny z `rachunek-wynik.txt` (diff pusty, kod 0).

Ocena: dla flopów **połączonych** „nie masz przewagi nutsów” to uczciwa część wspólna (szczebel 2 pośrednio dla cash, wprost dla 20bb; szczebel 4 wprost). Poziom `heuristic` adekwatny (brak opublikowanego wyniku solvera dla dokładnie tego spotu; kryteria `content/pl/rules.yaml:2-7`). Brzmienie jest kategoryczne, źródła mówią „generally”/„often” (Z-3).

## 2. m5.exam.q2

- `git diff`: ID `m5.exam.q2`, `family`, `rules: [R-M5-004]`, kolejność opcji i `correct: true` na opcji 0 bez zmian; opcja 2 zmieniona A-A-7 → A-Q-7.
- Jedna poprawna odpowiedź: tak. 8-6-5 = „connected” (strit z 97 i 74); K-10-3 i A-Q-7 = double-Broadway („large nut advantage as the PFR”), AQ7r dodatkowo wprost w artykule 20bb. Rachunek pomocniczy (niezwalidowany skład BB): „dwie pary lub lepiej” BTN/BB call: 8-6-5 3,58/2,82% (×1,27), K-10-3 4,16/2,53% (×1,64), A-Q-7 5,92/2,96% (×2,0) — kolejność zgodna z kluczem, ale na 8-6-5 BTN nadal ma więcej (Z-3).
- Zrozumiałość (pytanie jest w puli „Sprawdź poziom”, `ocenaPoziomu.ts:25`): termin objaśniony w zdaniu — w porządku.
- Wyjaśnienie K-10-3 „np. KK i KT”: KT bez źródła (Z-5).

## 3. Spójność

- `grep` po `content/pl` i `content/en`: brak pozostałości „częściej ma dwie pary albo strita”, „to on ma przewagę nutsów”, „more often has two pair or a straight”. Pozostałe trafienia „częściej” dotyczą innych tematów.
- m5.l2.q-765: poprawna opcja nadal indeks 0 (było „Duży blind”, jest „Nie: strity i dwie pary ma tu też duży blind”); opcje 1 i 2 były i są błędne. Zapis odpowiedzi: `odpowiedz(zadanie_id, wybor JSON {answer}, ocena, zaliczona)` (`docs/architektura/schemat.sql:46-58`, `aktywnoscSesji.ts:125`) — ocena zapisana w chwili odpowiedzi, powtórki po `rodzina_id` (bez zmian). Ryzyko dla zapisanych odpowiedzi: niskie (zmienia się tylko treść opcji pod tym samym indeksem; poza właścicielem brak użytkowników). Zmiana udokumentowana w D-500.
- Sprzeczność wewnętrzna: Z-1, Z-2 (flopy półpołączone).

## 4. Przekłady

- Skrypt (diff -U0, 11 języków): po 24 linie dodane i 24 usunięte w każdym, te same numery linii co pl, zbiory kluczy `{{…}}`, karty `[[…]]`, `correct: true`, `rule/best/id` = pl → 0 rozbieżności.
- en: 24 linie przeczytane w całości — sens = pl, przeczenia poprawne.
- de, es, fr, it, pt, pt-BR, ja, ko, vi, zh-Hant: przeczytane ręcznie m5.q2 (4 linie), m5.l2.q-765 (4 linie), `because` R-M5-004 i R-M6-009 — przeczenie zachowane wszędzie („keinen Nuts-Vorteil”, „no tienes”, „n'avez-vous pas”, „non hai”, „não tem”, 「ない」, „없습니까”, „không có”, 「沒有」). ja/ko/vi/zh-Hant: oceniane z ograniczoną pewnością.

## 5. Bazy i kontrole (worktree @ 02ec8c4)

| Komenda | Kod |
|---|---|
| `pnpm install --frozen-lockfile` | 0 |
| `pnpm content:build` → `git status --porcelain` | 0; 0 linii (czysto) |
| `pnpm content:check` | 0 („Treść aktualna (35 baz): 44 lekcji, 141 reguł, 162 terminów”) |
| `pnpm --filter @szkola/content-build test` | 0 (17 plików, 180 testów) |
| `pnpm --filter @szkola/content-schema test` | 0 |
| `pnpm test:akceptacja:domena` | 0 (3 pliki, 14 testów) |
| `pnpm tresci:rejestr` | 0 („0 błędów, 0 uwag”) |

Diff poza `content/` i `docs/`: tylko `apps/mobile/assets/content/*` (35 baz, nowy skrót w nazwie) i `apps/mobile/src/data/content/tresc.generated.ts`. Log `ci-2026-11-10.log`: nagłówek „pnpm run ci na 9f35c9187d…”, koniec „0 błędów, 0 uwag / KOD WYJŚCIA: 0”; SHA to commit przedostatni, HEAD 02ec8c4 dokłada wyłącznie 3 pliki w `docs/tresci/dowody-ba/` (Z-8).

## 6. Autor, decyzja, sekrety, prawa autorskie

- `git log --format='%an <%ae>' bca751e..origin/sesja-ba-m5q2`: 4× `Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>` — zgodne.
- D-500 (`docs/decyzje.md:331`): jest; odrzucone opcje (a)–(e); ograniczenie (solver aplikacji niezwalidowany na składzie obrony BB) nazwane.
- Sekrety: wzorce (klucze, tokeny, prywatne adresy) w dodanych liniach `docs/` i w logu CI — 0 trafień.
- Cytaty: najwyżej 1–2 zdania; kopii stron w repo brak.

## Znaleziska

| ID | Waga | Plik:linia | Opis | Dowód | Naprawa |
|---|---|---|---|---|---|
| Z-1 | WYS | `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:38,40`; `content/pl/lessons/m5-l4-bez-pozycji.md:90,92`; `content/pl/rules.yaml:358-360`; to samo w 11 językach | Nowe zdania „ma tu strity i dwie pary” / „ma tu w zakresie strity i dwie pary” są wyjaśnieniami przypadku `when: { height: [low], …, ranks: [connected, semi-connected] }`. Na flopie półpołączonym strit jest niemożliwy z definicji aplikacji, więc zdanie jest fałszywe (szczebel 1). Poprzednie „dwie pary **albo** strita” było niepoparte, ale nie dawało się obalić samymi zasadami gry; nowe się daje. Reguła R-M5-004 ma w `if` „połączony albo półpołączony”, a w `because` „trafiają tu strity”. | `content/terms.yaml:703` („strit nie jest jeszcze możliwy”); `packages/poker-core/src/texture.ts:12-15,145`; `apps/mobile/src/features/drills/engine.ts:166-167` (losuje flop z filtra przypadku); zliczenie wszystkich flopów pasujących do filtra: 1680 połączonych, 1680 półpołączonych (50%); `classifyFlop('9s 5h 2d')` = low, semi-connected | Albo rozdzielić przypadek (connected / semi-connected) z osobnymi `why`, albo brzmienie prawdziwe dla obu, np. „duży blind trafia tu dwie pary i sety, a na połączonym flopie także strity”; analogicznie `because` R-M5-004. Potem 11 języków + `content:build`. |
| Z-2 | WYS | te same linie co Z-1 oraz `m5-l3…:39`, `m5-l4…:91` („nie masz przewagi nutsów”) | „Nie masz przewagi nutsów” wyświetla się też na niskich flopach półpołączonych (np. 9-7-3, 9-5-2). Wszystkie cytaty autora dotyczą flopów „connected” (strit możliwy). Dla niskiego półpołączonego flopu źródło szczebla 2 z listy autora mówi odwrotnie. Uproszczenie sprzeczne ze szczeblem 2 jest wg ADR-24 niedozwolone. | blog.gtowizard.com/overbetting-the-flop-in-cash-games/, „Middling Board Overbets”, 973r: „the BTN has a monopoly on all of the overpairs. Due to the complete lack of possible two pairs and straights on this board, any overpair is essentially the nuts.”; `classifyFlop('9s 7h 3d')` = low, semi-connected, rainbow | Ograniczyć „nie masz przewagi nutsów” do flopów połączonych; dla półpołączonych inne, poparte uzasadnienie albo osobny przypadek. Uwaga poza zakresem diffu: to samo źródło pokazuje na 973r duże bety BTN, więc istniejące `then`/`best: check` dla niskich półpołączonych wymaga osobnego sprawdzenia (otwarte pytanie + wpis do rejestru decyzji). |
| Z-3 | ŚR | `content/pl/rules.yaml:360,511`; `content/pl/exams/m5.yaml:22` | Brzmienie kategoryczne („nie masz”), źródła: „generally”, „often”. Dla samego 8-6-5 żadne źródło nie podaje wyniku; rachunek autora (niezwalidowany skład BB) daje BTN więcej „dwóch par lub lepiej”. | `rachunek-wynik.txt`: 8h6d5c BTN 3,58% vs BB call 2,82% (sety 9,0 vs 3,6 komb.) | „zwykle nie masz” w `because`; rozważyć w m5.q2 flop, na którym rachunek i źródła są zgodne (wg `kandydaci-wynik.txt`: 9-8-6, 6-4-3, 7-6-4; 7-6-5 jest już w lekcji). |
| Z-4 | ŚR | `content/pl/rules.yaml:363`; `docs/decyzje.md:331` | Cytat „the raiser generally does not have a nuts advantage” podany bez spotu (BTN vs SB, 40bb MTT); w D-500 tylko „MTT 40bb”. W rejestrze i `zadanie1-zrodla.md` spot jest nazwany. | kontekst cytatu: sekcja „Continuation Betting vs the Small Blind”; ten sam artykuł: wcześniejsze pozycje „less likely to hold nut hands than a BTN raiser” | Dopisać „(40bb, BTN vs SB; inny spot)” w `source` i w D-500. |
| Z-5 | ŚR | `content/pl/exams/m5.yaml:23` (+11 języków) | „Masz tu więcej najsilniejszych rąk, np. KK i KT” — przewaga w KT nie ma przeczytanego źródła i zależy od niezwalidowanego składu (solver aplikacji 3-betuje 100% KTs; przy samym sprawdzaniu KT BB miałby proporcjonalnie więcej). | zakresy aplikacji na KdTd3s: KT BTN 9,0/481 = 1,87% vs BB call 6,0/414 = 1,45%; KK 3,0 vs 0; TT 3,0 vs 0 | „np. KK i TT” (obie ręce BB przebija przed flopem). |
| Z-6 | NIS | `content/pl/lessons/m5-l2-przewagi.md:88,92` | Treść lekcji nie mówi wprost „na 7-6-5 nie masz przewagi nutsów” (zadanie q-765 o to pyta); akapit o 7-6-5 stoi w sekcji o przewadze zakresu. R-M5-004 uzasadnia częstość c-betu przewagą nutsów, a lekcja (l. 92) przypisuje przewadze nutsów rozmiar. | odczyt lekcji | Jedno zdanie w sekcji „Przewaga nutsów”. |
| Z-7 | NIS | `content/pt/lessons/m5-l2-przewagi.md:27-28` | Opcje w 1. osobie („porque abri”, „porque tenho”), pl i pozostałe języki w 2. osobie. | odczyt | Ujednolicić przy następnej poprawce pt. |
| Z-8 | NIS | `docs/tresci/dowody-ba/ci-2026-11-10.log:1`; `content/pl/rules.yaml:363` | Log CI dotyczy 9f35c91, nie HEAD (różnica: tylko dokumenty). W `source` brak adresów trzech artykułów serwisu solvera (nagłówek pliku wymaga adresów). | `git show --stat 02ec8c4`; `rules.yaml:13` | Dopisać adresy; log bez zmian. |
| Z-9 | NIS (poza diffem) | `content/pl/lessons/m5-l2-przewagi.md:6` | Podtytuł „przewaga orzechowa” obok terminu „przewaga nutsów”. | odczyt | Backlog. |

## Niesprawdzone

- Pełne `pnpm run ci` (typecheck, wszystkie testy, i18n) na HEAD — uruchomione tylko kontrole treści z tabeli w p. 5; log autora (kod 0) dotyczy 9f35c91.
- Sens 18 pozostałych linii w 10 językach poza en (tylko struktura i znaczniki); ja/ko/vi/zh-Hant także w liniach czytanych — ograniczona znajomość.
- Wcześniejsze cytaty R-M6-009 (artykuły o check-raise, „The larger the BTN bets, the less BB raises”) — poza zmianą, nie pobierane; w pięciu pobranych stronach tego cytatu nie ma.
- Dokumenty 12 i 13 na Drive (autor przekazał wpisy koordynatorowi w `wpisy-dokumenty-12-13.md`).
- Wygląd na telefonie (T-ba-1…3) i E2E.
