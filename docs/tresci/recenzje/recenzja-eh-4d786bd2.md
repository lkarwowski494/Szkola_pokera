# Audyt: Treści i wiedza domenowa — Szkoła Pokera — 2026-11-11
Recenzja niezależna sesji EH (SC-04, SC-05, SC-08 w treści; D-1165…D-1170). Commit: 4d786bd2 (zakres a6d1bb1b..4d786bd2) · Tryb: audit (rola 06, moduły kontrole-mechaniczne, tresci-krytyczne) · Sesja EJ · Środowisko: Linux, Node 22, pnpm 10.28; sieć działa (curl do źródeł); brak macOS/Xcode (nie dotyczy: recenzja treści).

## Podsumowanie
**Werdykt: PRZYJĘTE Z UWAGAMI.** Brak znalezisk KRYT i WYS. Wszystkie twierdzenia pl i en w SC-04, SC-05 i SC-08 są POPARTE źródłami otwartymi dziś (22/22 cytaty znalezione dosłownie na surowym tekście, `dowody/ej-zrodla-2026-11-11.txt`). Liczby tylko przez `{{n:…}}`, w 10 przekładach te same znaczniki co w pl (test `szablony-eh`) i brak innych cyfr niż „3-bet”. Decyzje D-1165, D-1166, D-1169 i D-1170 przyjmuję bez zmian. D-1167 i D-1168 (gutshot i backdoor strita → `call`) przyjmuję co do wyniku, ale ich uzasadnienie czyta cytat o check-raisie jako cytat o sprawdzaniu (ŚR, 06-tresci-001). `pnpm run ci` na 4d786bd2: patrz „Kontrola dowodów”.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | ŚR | M | D-1167/D-1168: cytat o check-raise'u (blef) użyty jako podstawa `call`; brak nazwanego uproszczenia „kontynuacja → call” w D-1168 | otwarte |
| 06-tresci-002 | NIS | M | „ok. 2/3 puli” dla K84 wzięte z sekcji strony oznaczonej jako streszczenie AI | otwarte |
| 06-tresci-003 | NIS | M | R-M6-006 „wysokimi kartami z backdoorem” bez cytatu o sprawdzaniu; jest lepszy cytat szczebla 4 | otwarte |

## Weryfikacja twierdzeń
Zakres: całość (wszystkie zdania z faktem w SC-04, SC-05, SC-08 pl i en; w 10 przekładach tylko liczby i znaczniki) · Hierarchia: z `CLAUDE.md` (ADR-24) · Skrypt: `pnpm run ci` (bramki T-02 terminów, liczby `{{n:}}`, testy wyroczni), sonda tekstury `dowody/ej-sonda-tekstura-sc04.txt` (kod 0).

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| R-M3-002 | `content/pl/scenarios/sc-04.yaml` (linia 29) | za UTG pięciu graczy; otwarcie UTG ok. 15–18% | preflopwizard.app/blog/6-max-preflop-charts (tabela RFI); blog.gtowizard.com/preflop-range-morphology; beyondgto.com/ranges/lj-open-6max-100bb | „UTG (LJ) 5 15-17% 2.5bb”; „17.6% of all possible starting hands”; „GTO opens about 17% of hands first-in from the LJ” | POPARTE | ok | — | — |
| R-M5-007 | `content/pl/scenarios/sc-04.yaml` (linia 37) | suchy wysoki flop: c-bet często i mało, ok. 1/3 | upswingpoker.com/bet-size-strategy-tips-rules (Rule #3); blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games | „Bet small (25-35% pot) on dry, static board textures”; „frequent use of the 33% sizing” | POPARTE | ok: słowo „suchy” zgodne z klasyfikacją aplikacji dla 1248/1248 flopów filtra SC-04 (`dowody/ej-sonda-tekstura-sc04.txt`) | — | — |
| R-M3-003 | `content/pl/scenarios/sc-05.yaml` (linia 29) | BTN otwiera ok. 40–45% | beyondgto.com/ranges/btn-open-6max-100bb; preflopwizard.app (Quick Answer) | „GTO opens about 42% of hands first-in from the Button”; „reach 40-45% on the button at 100bb” | POPARTE | ok | — | — |
| R-M5-004 | `content/pl/scenarios/sc-05.yaml` (linia 37) | niski połączony flop: c-bet rzadziej; BB ma dużo niskich kart | blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games | „a large portion of their range consists of low-card holdings … We connect better with high-card boards and get to bet more.” | POPARTE | ok | — | — |
| R-M5-004 | `content/pl/scenarios/sc-05.yaml` (linia 41) | połączony flop: BB może mieć strita, rozmiar mniejszy | jw. | „flopped straights often being in the BB’s range. In order to be respectful of this, we size down” | POPARTE | ok: `connected` w aplikacji = strit możliwy (`packages/poker-core/src/texture.ts:14`) | — | — |
| R-M4-003 | `content/pl/scenarios/sc-08.yaml` (linia 24) | SB wobec BTN prawie nie sprawdza: 3-bet albo pas; 3-bet ok. 13% | beyondgto.com/defense/sb-vs-btn; blog.gtowizard.com/crush-3-bet-pots-oop-in-cash-games | „roughly 5% as a flat call and 13% as a 3-bet”; „the SB barely calls anything. Instead, they almost exclusively 3-bet or fold” | POPARTE | ok | — | — |
| R-M4-002 | `content/pl/scenarios/sc-08.yaml` (linia 36) | 3-bet bez pozycji ok. 4 × otwarcie = 10 bb | deepfold.co/en/blog/three-bet-strategy-guide | „The OOP Formula: 4x the Open”; „You (BB) 3-bet to 10bb” | POPARTE | ok | — | — |
| pf.open-size | `content/pl/scenarios/sc-08.yaml` (linia 10) | otwarcie 2,5 bb | preflopwizard.app | „The standard open size is 2.5bb from all positions (3bb from the small blind)” | POPARTE | ok | — | — |
| D-1166 | `docs/decyzje/EH.md` (linia 7) | „duży c-bet” ≥ 0,75 włącznie, 0,4–0,75 bez odpowiedzi | upswingpoker.com/when-to-call-with-ace-high (J42, 66%); rachunek MDF | „The Button c-bets 66% of the pot.”; „the solver does not call with any Ace-high hand that doesn’t have a significant backdoor draw” | POPARTE (kierunkowo; rachunek: obrona maleje z rozmiarem) | ok | — | 06-tresci-002 (NIS) |
| D-1167 | `docs/decyzje/EH.md` (linia 8) | gutshot wobec ok. 1/3 → `call` | pokercoaching.com/blog/defending-bb-on-high-card-boards | „This strategy lets us bluff quite a lot. Therefore, we can use our lower equity hands such as guthosts and runner runner draws to to put back the breasu” | CZĘŚCIOWO (cytat dotyczy check-raise'a; wynik obroniony rachunkiem MDF i R-M6-006) | — | uzasadnienie wg 06-tresci-001 | 06-tresci-001 |
| D-1168 | `docs/decyzje/EH.md` (linia 9) | backdoor strita, obie karty ≥ T → `call` | upswingpoker.com/backdoor-flush-straight-draw-tips | „stronger double backdoor hands — ones with an overcard to middle pair, like Q♣ 8♣ — are reasonable hands with which to call”; „Backdoor flush draws can make a hand worth folding into a hand worth calling” | POPARTE kierunkowo (szczebel 4) | — | nazwać uproszczenie | 06-tresci-001, 06-tresci-003 |

## Linia bazowa i założenia
Wymiary pokrycia:
- Kategorie twierdzeń (fakty, liczby, reguły, zalecenia, mechaniki): sprawdzone w tabeli wyżej; sytuacje (`situation`) bez faktów poza „Button otworzył na {{n:pf.open-size}}” (POPARTE).
- Progi krytyczne dla zdrowia, życia, mienia, prawa: sprawdzone, brak; moduł `tresci-krytyczne` nie ma tu zastosowania (teoria pokera bez stawek; „bez hazardu” w `CLAUDE.md`).
- Brakujące ostrzeżenia i granice stosowania: założenia 6-max, 100 bb, BB sprawdza i czeka są w polach szablonu i w `situation` SC-04; SC-05 nie mówi w `situation`, że BB broni, ale mówi to zdanie punktu c-betu („a {{t:big-blind}} czeka”). Sprawdzone, brak luki.
- Jednostki i warianty regionalne: ułamki puli i bb przez `{{n:}}`; w przekładach brak cyfr poza „3-bet” (komenda w „Pokryciu”).
- Aktualność źródeł: wszystkie otwarte 2026-11-11 (sha256 tekstu w `dowody/ej-zrodla-2026-11-11.txt`).
- Trudna pamięć: sprawdzone, brak.
- Pary zdań: przeczytane we wszystkich 16 wyjaśnieniach pl i en; brak wniosku spoza źródeł. W SC-04 „na suchym wysokim flopie” przy teksturze półpołączonej sprawdzone sondą (wszystkie flopy filtra są `dry`).
- Twierdzenia z jednym źródłem albo z niskich szczebli: R-M4-002 (deepfold, szczebel 4, plus drzewo solvera aplikacji), D-1168 (szczebel 4) — oznaczone, kierunkowo zgodne z wyższymi.

Soczewki: laik (dosłowne „prawie nie sprawdzasz”, „mały bet wystarczy” — zgodne ze źródłami), ekspert (UTG zamiast BTN w SC-04: zakres UTG silniejszy, przewaga zakresu tylko większa, D-1031), sceptyczny weryfikator (każdy cytat na surowym tekście), inny kraj (bez treści zależnych od jurysdykcji). Subagentów nie użyłem (zakres 3 szablonów; soczewki po kolei).

Wzorzec najlepszych: opublikowane rozwiązania solverów (GTO Wizard, BeyondGTO, PeakGTO w PokerCoaching) z liczbą i warunkami spotu w tekście; aplikacja to robi (spot, głębokość, pozycje w polach szablonu). Zmian statusu w `docs/zalozenia.md` nie proponuję.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/pl/scenarios/sc-04.yaml`, `sc-05.yaml`, `sc-08.yaml` | tak, całość | odczyt + źródła (`dowody/ej-zrodla-2026-11-11.txt`) |
| `content/en/scenarios/sc-0{4,5,8}.yaml` | tak, całość (sens i liczby) | odczyt |
| 10 przekładów (de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant) | tylko liczby i znaczniki | test `szablony-eh` w CI; grep cyfr poza `{{…}}`: jedyna cyfra to „3” z „3-bet” we wszystkich 12 językach |
| `docs/decyzje/EH.md` D-1165…D-1170 | tak | źródła + kod `packages/poker-core/src/scenario-gen.ts:730` |
| `docs/tresci/odczyty/eh-2026-11-11.tsv` (7 cytatów) | tak, 7/7 dosłownie | `dowody/ej-zrodla-2026-11-11.txt` |
| Testy (`szablony-co`, `szablony-du`, `szablony-eh`, `cs-tresc-realna`) | tak: diff bez poluzowań (dodana kontrola rodzaju punktu `cbet-case`), przebieg czerwony autora przeczytany | `docs/tresci/dowody/eh-red.txt`; CI |
| Terminologia (dokument 13, T-08) | tak: „konektory”, „draw”, „przewaga zakresu”; brak form wycofanych w T-08 w tekstach | dokument 13 na Drive, odczyt 2026-11-11 |
| Jakość językowa przekładów | nie (rola 09, polecenie EJ) | — |
| Kod `defendVsCbet` po 08-EH-2/3 | nie (zadania roli 08 jeszcze nie wykonane; N2 nie jest w treści) | — |

## Kontrola dowodów i sekretów
`pnpm run ci` na 4d786bd2: wynik i kod wyjścia w `dowody/ej-ci-4d786bd2.txt`. `node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-eh-4d786bd2.md . docs/tresci --rola 06-tresci`: wynik w `dowody/ej-sprawdz-raport.txt`.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| TRE-01 | dotyczy | ok: każde zdanie ma regułę (`rule:`) |
| TRE-02 | dotyczy | 06-tresci-001 (CZĘŚCIOWO w uzasadnieniu decyzji); treść POPARTE |
| TRE-03 | dotyczy | ok: SC-04 UTG wobec źródeł BTN rozstrzygnięte D-1031 (poza zakresem EH) |
| TRE-04 | dotyczy | 06-tresci-002 (streszczenie AI jako źródło liczby) |
| TRE-05 | dotyczy | ok: K84 (call Ax wobec większego c-betu) i J42 (fold Ax wobec 66%) zapisane w R-M6-007 jako wyjątek |
| TRE-06 | dotyczy | ok: `cbet.size.big` = 0,75 jedna wartość; 3-bet 10 bb = 4 × 2,5 |
| TRE-07 | dotyczy | 06-tresci-001 (nienazwane uproszczenie w D-1168) |
| TRE-08 | dotyczy | ok: pary zdań przeczytane |
| TRE-09 | nie dotyczy: brak faktów zmiennych (ceny, przepisy) | — |
| TRE-10 | nie dotyczy: brak treści krytycznej | — |
| TRE-11 | nie dotyczy: brak trudnej pamięci | — |
| TRE-12 | nie dotyczy: brak treści zależnej od lokalizacji | — |
| TRE-13 | dotyczy | ok: baza treści przebudowana w zakresie (`tresc-e5708cbfdb-*.db`), CI sprawdza zgodność |
| TRE-14 | dotyczy | ok: cytaty źródeł tylko w dokumentach, w treści własne słowa |

## Znaleziska (szczegóły)

### 06-tresci-001 · D-1167/D-1168 opierają `call` na cytacie o check-raise'u, a D-1168 nie nazywa uproszczenia
- Pozycja listy kontrolnej: TRE-02 (także TRE-07)
- Poziom: P2 (waga koordynatora: ŚR)
- Realność: realny (dla przyszłego punktu N2 po 08-EH-3; dziś bez skutku dla użytkownika) · Pewność: wysoka
- Rodzaj: M
- Dowód: `docs/decyzje/EH.md:8` cytuje „we can use our lower equity hands such as guthosts and runner runner draws” jako dowód, że „solver gutshotów nie pasuje”. Zdanie poprzedzające w źródle: „This strategy lets us bluff quite a lot.” — gutshoty i runner-runner są tam **blefami w check-raise'u**; zakres sprawdzenia w tym samym akapicie: „we will continue with pretty much all pairs including he underpairs and even A-high hands” (bez gutshotów). Źródło nie podaje, jak często gutshoty pasują (`dowody/ej-zrodla-2026-11-11.txt`).
- Mechanizm: źródło o „kontynuacji” (call albo raise) mapowane na `call` w punkcie z akcjami `call`/`fold`; `grep -n "runner runner" docs/decyzje/EH.md docs/tresci/odczyty/eh-2026-11-11.tsv` → 3 trafienia: `docs/decyzje/EH.md:8`, `docs/decyzje/EH.md:9`, `docs/tresci/odczyty/eh-2026-11-11.tsv:5`.
- Powraca: nie
- Wzorzec lub źródło: ADR-24 „Uproszczenie … nazwane uproszczeniem”; rachunek (szczebel 1): wobec zakładu 1/3 puli alpha = (1/3) ÷ (1 + 1/3) = 25%, MDF = 75% zakresu; źródło: call ok. 56% + check-raise ok. 17% = 73% (zgodne).
- Kroki w aplikacji: po wdrożeniu 08-EH-3: BB z gutshotem wobec c-betu 1/3 → ocena `call`.
- Opcje: (a) zostawić `call`, poprawić podstawę w D-1167/D-1168: rachunek MDF (szczebel 1: bronisz ok. 3/4 zakresu, a gutshot jest lepszy od rąk bez pary i drawa, które pasujesz) + R-M6-006 „kontynuujesz drawami” + cytat PeakGTO jako dowód, że solver gutshoty **kontynuuje** (check-raise), i nazwać uproszczenie „kontynuacja (call albo check-raise) = `call`” także w D-1168 — kompromis: brak zmiany kodu, uczciwy zapis; (b) gutshot bez overkarty → `null` — kompromis: węższy punkt, brak źródła za `fold` ani za `null`. Rekomendacja: (a) — decyzja D-1185.
- Test akceptacyjny: wpis D-1167 i D-1168 cytuje rachunek MDF i opisuje cytat PeakGTO jako check-raise; słowo „uproszczenie” w D-1168; testy 08-EH-3 bez zmian.
- Status: otwarte

### 06-tresci-002 · „K84 wobec ok. 2/3 puli” pochodzi z sekcji oznaczonej jako streszczenie AI
- Pozycja listy kontrolnej: TRE-04
- Poziom: P2 (waga koordynatora: NIS)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: M
- Dowód: strona zaczyna podsumowanie słowami „TLDR: See AI summary of this article.” i dopiero w nim jest „vs large c-bet (~2/3 pot)”; treść artykułu mówi tylko „against a bigger c-bet” i „against big sizing” (`dowody/ej-zrodla-2026-11-11.txt`). Użyte w D-1166 (`docs/decyzje/EH.md`, linia 7, odrzucona opcja b) i w odczytach (`docs/tresci/odczyty/eh-2026-11-11.tsv`, linia 4); ta sama liczba już wcześniej w R-M6-007 (`content/pl/rules.yaml`, linia 530).
- Mechanizm: streszczenie modelu na stronie źródła traktowane jak tekst autora; `grep -rn "2/3 puli" content/pl/rules.yaml docs/decyzje/EH.md` → 2 trafienia: `content/pl/rules.yaml:530`, `docs/decyzje/EH.md:7`.
- Powraca: nie
- Wzorzec lub źródło: `CLAUDE.md` „Streszczenie z wyszukiwarki nie jest źródłem” (to samo dotyczy streszczenia AI na stronie).
- Kroki w aplikacji: źródło reguły R-M6-007 w ekranie źródeł; próg 0,75 (D-1166) się nie zmienia, bo opiera się na tekście reguły i kluczu `cbet.size.big`.
- Opcje: (a) „wobec większego c-betu (rozmiar w tekście niepodany; streszczenie AI strony: ok. 2/3)” — kompromis: dłuższy zapis; (b) usunąć „2/3” — kompromis: traci się informację kierunkową. Rekomendacja: (a) — decyzja D-1186.
- Test akceptacyjny: `grep -n "2/3 puli" content/pl/rules.yaml` nie zwraca R-M6-007 bez dopisku o streszczeniu AI; D-1166 nazywa to samo.
- Status: otwarte

### 06-tresci-003 · R-M6-006 „wysokimi kartami z backdoorem” nie ma cytatu o sprawdzaniu, choć jest dostępny
- Pozycja listy kontrolnej: TRE-02
- Poziom: P2 (waga koordynatora: NIS)
- Realność: brzegowy · Pewność: średnia
- Rodzaj: M
- Dowód: `content/pl/rules.yaml:522` cytuje tylko „we will continue with pretty much all pairs including the underpairs and even A-high hands” (pary i asy). Część o backdoorach, na której stoi D-1168, ma w tym źródle oparcie tylko w zdaniu o blefach check-raise'em. Przeczytane dziś źródło szczebla 4 (upswingpoker.com/backdoor-flush-straight-draw-tips): „Backdoor flush draws can make a hand worth folding into a hand worth calling.” i Q♣8♣ jako „reasonable hands with which to call” wobec 66%.
- Mechanizm: część reguły bez cytatu; jedno wystąpienie (`content/pl/rules.yaml:519`).
- Powraca: nie
- Wzorzec lub źródło: ADR-24 „Każde twierdzenie w aplikacji ma przeczytane źródło (adres i cytat)”.
- Kroki w aplikacji: ekran źródeł reguły R-M6-006.
- Opcje: (a) dopisać cytat Upswing do `sources` R-M6-006 (szczebel 4, z atrybucją) — kompromis: drobna zmiana treści i przebudowa bazy; (b) zostawić — kompromis: jedna część reguły bez cytatu. Rekomendacja: (a) przy następnej zmianie M6 (bez osobnego wydania).
- Test akceptacyjny: R-M6-006 `sources` zawiera adres Upswing z cytatem; `pnpm content:build` zielone.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Próg „małego c-betu” 0,4 (D-1066) wobec „ok. 1/3” w R-M6-006 — już w otwartych pytaniach EH; zgadzam się, że poza zakresem.
- Czerwony przebieg autora (`docs/tresci/dowody/eh-red.txt`) przeczytany, nie odtworzony w tym kontenerze: wszystkie 18 czerwonych to testy obecności i struktury (przyczyna właściwa: brak szablonów w `content/`); wyrocznie oceny dla SC-04/05 przeszły dopiero po wejściu treści, co jest zgodne z naturą testu.

## Co działa dobrze i należy zachować
- Wszystkie 7 cytatów z `eh-2026-11-11.tsv` dosłownie na stronie, z sha256 tekstu i literówkami źródła zachowanymi.
- Wyrocznia `cbet-case` uogólniona na pozycję otwierającego (`flopPo`) i zaostrzona (sprawdza rodzaj punktu), bez poluzowań.
- D-1166 wiąże „duży c-bet” z jednym kluczem `cbet.size.big` (jedna wielkość, jeden klucz).
- SC-04 wyjaśnienia mówią „suchy”, a sonda potwierdza, że cały filtr daje tylko flopy `dry`.

## Decyzje dla właściciela
Brak decyzji produktowych. Decyzje merytoryczne tej recenzji (do weta, `docs/decyzje/EJ.md`): D-1185 (06-tresci-001: `call` zostaje, podstawa = MDF + R-M6-006, uproszczenie nazwane), D-1186 (06-tresci-002: streszczenie AI nie jest źródłem liczby 2/3), D-1187 (werdykt recenzji: przyjęte z uwagami, bez blokera).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001,06-tresci-002,06-tresci-003` (zapis w `docs/decyzje/EH.md` i `content/pl/rules.yaml`; kod 08-EH-2/3 bez zmian).
