# Audyt: Programista — Szkoła Pokera — recenzja niezależna DX (08-A, funkcje oceny N2, N3, N4, N7a) — 2026-11-11
Commit: `174dc00b` (gałąź `sesja-ec-recenzja` = `origin/sesja-dx-silnik` o 20:00) · Zakres: `b3963e9a..174dc00b` (af871e32, 70ed7bc7, 510c3615, 7350d60a, 174dc00b) · Tryb: audit (recenzja D-043, polecenie EC) · Środowisko: Linux, Node 22, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; vitest działa. Mutanty, sondy i test 08-A na kodzie sprzed poprawki uruchamiane w kopiach (`git worktree` w scratchpadzie, @174dc00b i @b3963e9a). Pliki śledzone poza tym raportem i plikami dowodów `ec-*.txt` są nietknięte. Ścieżki dowodów są względne wobec `docs/programista/recenzje`.

## Podsumowanie
Werdykt: **PRZYJĄĆ PO POPRAWKACH** (0 KRYT, 2 WYS, 1 ŚR, 3 NIS). Bramka 08-A jest poprawna i ma dobry test: na `b3963e9a` test pada z właściwego powodu (bramka zgłasza „holding tylko dla punktu cbet-case” dla szablonu range-spot → cbet-case), a na `174dc00b` przechodzi. `pnpm run ci` daje kod 0. N3 (iso-size), N4 (lista rąk) i N7a (bluff-catcher) liczą zgodnie ze specyfikacją. W każdej funkcji co najmniej 2 mutanty dają czerwony wynik. Oba znaleziska WYS dotyczą N2 (`defendVsCbet`) i są merytoryczne. Gutshot i backdoor strita kończą się pasem wobec małego c-betu, choć R-M6-006 każe pasować tylko „rękami bez pary i bez drawa” (001). Każda para, także underpara 22 na AKQ, dostaje sprawdzenie wobec c-betu 3/4 puli, a R-M6-007 tego nie obejmuje i nie ma na to źródła (002). Dziś oba błędy są uśpione: funkcje nie są podpięte do schematu, generatora ani ekranu, więc użytkownik ich nie widzi. Poprawić je trzeba przed podpięciem do SC-07, SC-15 i SC-17. Testy N2 i N7a przepuszczają 7 mutantów, które zmieniają zachowanie (003).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | WYS (P1, uśpione) | M | N2: gutshot i backdoor strita bez pary dają „pas” wobec małego c-betu, wbrew R-M6-006 („pasujesz […] bez pary i bez drawa”) | otwarte (08 + 06) |
| 08-programista-002 | WYS (P1, uśpione) | M | N2: każda para (22 na AKQ, 32 na AK2) dostaje „sprawdzenie” wobec c-betu ≥ 3/4 puli; reguła R-M6-007 tego nie obejmuje, brak źródła | otwarte (08 + 06) |
| 08-programista-003 | ŚR (P1 wg DEV-03) | D | Testy N2 i N7a przepuszczają 7 mutantów zmieniających zachowanie; wyrocznia 10 000 losowań sprawdza tylko kierunek „call” i akceptuje `null` | otwarte |
| 08-programista-004 | NIS (P2) | M | Próg „dużego” c-betu 0,7 (D-1066) przy regule i wyjaśnieniach „3/4 puli i więcej”: wariant 0,7 dostałby tekst o 3/4 | otwarte (06, D-1066 do weta) |
| 08-programista-005 | NIS (P2) | D | Wzór iso-size w dwóch miejscach (`grading.ts` i `scenario-gen.ts`), a lista rozmiarów size-spot w dwóch miejscach `scenario-gen.ts` | otwarte |
| 08-programista-006 | NIS (P2) | D | Brak sprawdzenia wejścia: `fraction` NaN lub ≤ 0, udział blefów poza [0, 1], klasa w dwóch wpisach listy N4 (wygrywa pierwszy bez błędu) | otwarte |

## Linia bazowa i założenia
Ryzyka spisałem z diffu i specyfikacji (`origin/sesja-du-szablony:docs/tresci/stan-du.md`, wiersze 08-A i 08-N1…N7; `origin/sesja-dy-szablony-e:docs/tresci/stan-dy.md`, wiersz 08-N7a; polecenie DX na `origin/koordynacja`) oraz reguł R-M4-010, R-M4-012, R-M6-006, R-M6-007 i R-M8-010 (`content/pl/rules.yaml`). Raport autora (`docs/programista/stan-dx.md`) przeczytałem dopiero po wydaniu werdyktu, tylko żeby porównać zakres. Zakres się zgadza: autor też podaje, że N2, N3, N4 i N7 to same czyste funkcje, bez schematu, generatora, bramki i widoku, a N1, N5, N6 i KO-072 nie są zrobione. Dowód CI autora pominąłem i uruchomiłem CI sam.

Wymiary pokrycia:
- **Ścieżki zapisu:** brak w zakresie. Diff nie dotyka `packages/postep`, `apps/mobile/src/data`, schematu ani `content/` poza fixture'em testu.
- **Dane i warianty:** w generatorze doszedł tylko import `HOLDING_LIMITS` i nowe funkcje eksportowane na końcu pliku. `tryVariant` i `validateTemplate` są bez zmian, więc warianty i odciski się nie zmieniają, a `GENERATOR_WERSJA` nie trzeba podnosić. `pnpm run ci` (w nim `content:check` i testy odcisków) ma kod 0 (dowody/ec-ci-174dc00b.txt).
- **Obsługa błędów:** funkcje zwracają `null`, gdy źródło nie rozstrzyga (rozmiar 0,4–0,7, wyjątek „as na suchym flopie z królem”, margines N7a, D-1065). To zgodne z wzorcem `draw-call` (`inMargin`, `packages/poker-core/src/scenario-gen.ts:372-375`). Wejścia nie są sprawdzane → 006.
- **Typy na granicach:** dane przychodzą z generatora i szablonu (typy TS), nie z zewnątrz. `as any` jest tylko w teście (`tools/content-build/test/dx-bramka-holding.test.ts:28`), czego DEV-09 nie obejmuje.
- **System projektowy, i18n, dostępność:** nie dotyczy, w diffie nie ma widoku.
- **Wydajność:** `defendVsCbet` woła `classifyHolding` i `classifyFlop` raz na wariant, bez pętli.
- **Testy na właściwym poziomie:** czysta logika w Node, wyrocznie liczone z rang i kolorów, niezależnie od `classifyHolding`. Luki → 003.
- **Liczby konfiguracyjne:** progi N2 są stałymi z komentarzem i ID decyzji (D-1066). Wzór iso-size jest powtórzony → 005.
- **Granica pakietów:** `poker-core` nie importuje React Native (diff dodaje tylko importy z `./holding`).

Soczewki: recenzent kodu szukający ścieżki bez testu (mutanty, dowody/ec-mutanty.txt); użytkownik, który uczy się z oceny (sonda przypadków brzegowych N2, dowody/ec-sonda-n2.txt). Wzorzec: każda ścieżka oceny ma test, który potrafi paść, a każda ocena ma przeczytane źródło (ADR-24 w `CLAUDE.md`). Zmian w rejestrze założeń nie proponuję.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `tools/content-build/src/scenariusze.ts` (08-A) | tak | czytanie kodu; test na b3963e9a czerwony, na 174dc00b zielony (dowody/ec-08a-czerwony-b3963e9a.txt) |
| `tools/content-build/test/dx-bramka-holding.test.ts` + fixture | tak | czytanie; przebieg w CI (dowody/ec-ci-174dc00b.txt) |
| `packages/poker-core/src/scenario-gen.ts:645-702` (N2, N3, N4, N7a) | tak | czytanie, 22 mutanty (dowody/ec-mutanty.txt), sonda 9 przypadków (dowody/ec-sonda-n2.txt) |
| `packages/poker-core/test/scenario-dx.test.ts` | tak | czytanie, mutanty |
| `docs/decyzje/DX.md` (D-1065, D-1066) | tak | czytanie, porównanie z R-M6-006/007 |
| `pnpm run ci` na 174dc00b | tak | kod 0 (dowody/ec-ci-174dc00b.txt) |
| Integracja N* (schemat, generator, widok) | nie dotyczy | poza zakresem DX tej rundy (stan-dx.md, polecenie EC pkt 3) |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-dx-174dc00b.md . --rola 08-programista` → `OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista`, kod 0 (przebieg przed commitem; skrypt w scratchpadzie).

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy | reguły R-M4-010, R-M4-012 i R-M8-010 mają test z wektorem; N2 ma test, ale z lukami → 08-programista-003; merytoryka N2 → 001, 002 |
| DEV-02 | dotyczy | 2/2 commity zmieniające zachowanie (af871e32 z testem 08-A; 70ed7bc7 z `scenario-dx.test.ts`); test 08-A czerwony na b3963e9a z właściwego powodu (dowody/ec-08a-czerwony-b3963e9a.txt) |
| DEV-03 | dotyczy | brak `.skip`/`.only`; słaba wyrocznia i przeżywające mutanty → 08-programista-003 |
| DEV-04 | dotyczy | `pnpm run ci` kod 0; poker-core 192/192, content-build 483 + 1 expected fail (dowody/ec-ci-174dc00b.txt) |
| DEV-05 | nie dotyczy: diff bez zapisu danych | — |
| DEV-06 | nie dotyczy: brak migracji i kopii w diffie | — |
| DEV-07 | dotyczy | `?? 0` przy liczbie outów (`packages/poker-core/src/scenario-gen.ts:678`) oznacza: brak drawa to 0 outów, a nie zgadywanie; ok. Brak sprawdzenia wejścia → 006 |
| DEV-08 | nie dotyczy: brak dat | — |
| DEV-09 | nie dotyczy: brak danych z zewnątrz (`as any` tylko w teście) | — |
| DEV-10 | dotyczy | `null` zamiast zgadniętej odpowiedzi (D-1065); ok |
| DEV-11 | nie dotyczy: brak widoku | — |
| DEV-12 | nie dotyczy: brak tekstów interfejsu | — |
| DEV-13 | dotyczy | progi z ID decyzji; powtórzony wzór → 08-programista-005 |
| DEV-14 | dotyczy | sprawdzone: w diffie brak plików kluczy i wzorców sekretów (sprawdzenie skryptu na raporcie; diff przejrzany ręcznie) |
| DEV-15 | nie dotyczy: brak nasłuchów i timerów | — |
| DEV-16 | dotyczy | ułamek puli (`fraction`), bb (`isoSizeStandardBb`) i udział (`bluffShare`) mają jednostkę w nazwie albo w komentarzu; ok |

## Znaleziska (szczegóły)

### 08-programista-001 · N2: gutshot i backdoor strita bez pary dostają „pas” wobec małego c-betu, choć reguła każe pasować tylko rękami bez pary i bez drawa
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 (WYS: błędne twierdzenie merytoryczne; uśpione, bo funkcja nie jest podpięta)
- Realność: brzegowy dziś, realny po podpięciu N2 do SC-07, SC-15 i SC-17 · Pewność: wysoka
- Rodzaj: M
- Dowód: `packages/poker-core/src/scenario-gen.ts:678` „(h.draw?.all.length ?? 0) >= HOLDING_LIMITS.drawOutsMin) return 'call'”: draw to tylko co najmniej 8 outów (`HOLDING_LIMITS.drawOutsMin`, kolor i strit otwarty). Backdoor jest tylko kolorowy (linia 686 tego pliku). Sonda (dowody/ec-sonda-n2.txt): `Jd Tc | Qh 8c 2s | 1/3 → fold` (gutshot, 4 outy), `5d 4c | Kh 7c 3s | 1/3 → fold` (gutshot), `Kd Qd | Jh 7c 2s | 0.33 → fold` (dwie nadkarty z backdoorem strita). Reguła (`content/pl/rules.yaml:519`): „{{t:fold|pasujesz}} najsłabszymi rękami bez {{t:pair|pary}} i bez {{t:draw|drawa}}”, a dla wysokich kart „z dodatkowym {{t:draw|drawem}} (backdoor)”, bez zawężenia do koloru. Spec 08-N2 (stan-du.md) też mówi „przy parze, drawie, backdoorze z wysokimi kartami”. D-1066 nazywa próg „wysokich kart”, ale nie nazywa zawężenia drawa do 8+ outów ani backdoora do koloru.
- Mechanizm: jedno miejsce, definicja drawa w `defendVsCbet`; `grep -n "drawOutsMin" packages/poker-core/src/scenario-gen.ts` → 1 trafienie (678). Filtr `holding` generatora ma osobną definicję (`holdingMatches`), poza tym znaleziskiem.
- Powraca: nie
- Wzorzec lub źródło: ADR-24 (`CLAUDE.md`): nie wolno uczyć zasady sprzecznej z regułą; uproszczenie musi być nazwane. R-M6-006 `content/pl/rules.yaml:516-523`.
- Kroki w aplikacji: po podpięciu N2 gracz na BB z J♦T♣ na Q♥8♣2♠ dostaje c-bet 1/3 puli, sprawdza i widzi ocenę „błąd”, choć tekst reguły mówi, że z drawem kontynuuje.
- Opcje: (a) gutshot i backdoor strita z wysokimi kartami → `call` — zgodne z dosłownym brzmieniem reguły, ale granice („ile outów”, „który backdoor”) wybiera 06; (b) takie ręce → `null` (wariant odrzucany), dopóki 06 nie rozstrzygnie — generator ich nie losuje i niczego nie uczy bez źródła, ale pula wariantów jest węższa; (c) zostawić i dopisać uproszczenie do D-1066 — wymaga, żeby 06 uznała pas gutshotem wobec 1/3 za kierunkowo zgodny z solverem, a cytat źródła („continue with pretty much all pairs […] and even A-high hands”) mówi o kontynuowaniu szerzej, nie węziej. Rekomendacja: (b) teraz, a (a) po decyzji 06 zapisanej z cytatem.
- Test akceptacyjny: wektory `Jd Tc | Qh 8c 2s | 1/3` i `Kd Qd | Jh 7c 2s | 1/3` dają `call` albo `null` (nie `fold`); wyrocznia 10 000 losowań sprawdza też gutshot liczony z rang.
- Status: otwarte

### 08-programista-002 · N2: każda para dostaje „sprawdzenie” wobec c-betu 3/4 puli i więcej, choć R-M6-007 tego nie obejmuje i nie ma na to źródła
- Pozycja listy kontrolnej: DEV-01
- Poziom: P1 (WYS: twierdzenie bez przeczytanego źródła; uśpione)
- Realność: brzegowy dziś, realny po podpięciu N2 do SC-17 · Pewność: wysoka
- Rodzaj: M
- Dowód: linia 678 `scenario-gen.ts` zwraca `call` dla każdego `pairKind !== null`, zanim sprawdzi rozmiar. Sonda (dowody/ec-sonda-n2.txt): `2d 2c | Ah Kc Qs | 0.75 → call | underpair`, `3d 2c | Ah Kc 2s | 0.75 → call | low`. Test utrwala to dla każdego rozmiaru: `packages/poker-core/test/scenario-dx.test.ts:61` „if (pair || flush || open) { expect(r ?? 'call'”. Reguła `content/pl/rules.yaml:526` dotyczy tylko sytuacji, gdy „masz dwie wysokie karty bez {{t:pair|pary}} i bez {{t:draw|drawa}}”. Spec 08-N2 dla dużego c-betu podaje tylko pas dwiema wysokimi kartami. O parach wobec dużego c-betu nie mówi ani reguła, ani spec, ani D-1066.
- Mechanizm: ta sama linia co 001; gałąź „duży c-bet” (`packages/poker-core/src/scenario-gen.ts:680-683`) dziedziczy `call` z gałęzi wspólnej.
- Powraca: nie
- Wzorzec lub źródło: ADR-24 (`CLAUDE.md`): „Każde twierdzenie w aplikacji ma przeczytane źródło […] Czego nie da się przeczytać, to nie trafia do aplikacji”.
- Kroki w aplikacji: po podpięciu N2 do SC-17 gracz z 2♦2♣ na A♥K♣Q♠ wobec 3/4 puli pasuje i dostaje ocenę „błąd”.
- Opcje: (a) przy dużym c-becie para i draw → `null`, a ocena tylko dla dwóch wysokich kart bez pary i drawa, czyli dokładnie w zakresie R-M6-007 — wąsko, ale bez twierdzeń bez źródła; (b) 06 dodaje regułę o parach wobec dużego c-betu z przeczytanym źródłem i dopiero wtedy `call` — szerzej, ale czeka na 06. Rekomendacja: (a); szablon SC-17 i tak ćwiczy R-M6-007.
- Test akceptacyjny: `2d 2c | Ah Kc Qs | 0.75` daje `null` (albo wynik z nowej reguły ze źródłem); wyrocznia losowań przy rozmiarze 0,75 nie wymaga `call` dla par.
- Status: otwarte

### 08-programista-003 · Testy N2 i N7a przepuszczają 7 mutantów zmieniających zachowanie, a wyrocznia losowań sprawdza tylko kierunek „call” i akceptuje `null`
- Pozycja listy kontrolnej: DEV-03
- Poziom: P1 wg DEV-03 (ŚR wg progu wydania: nie blokuje, bo kod nie jest podpięty)
- Realność: realny (regresja przejdzie niezauważona) · Pewność: wysoka
- Rodzaj: D
- Dowód: dowody/ec-mutanty.txt: 22 mutanty, 15 zabitych, 7 przeżyło. Przeżyły: def-4 (backdoor `>= 1` karta koloru; to mutant **równoważny**, bo przy 2 lub 3 kartach koloru wcześniej wraca `call` z drawa albo koloru), def-6 (backdoor od dwójki: brak przypadku niskich kart jednokolorowych), def-7 i def-8 (wyjątek R-M6-007 bez warunku „suchy” albo „król”: brak przypadku asa na mokrym flopie z królem i na suchym flopie bez króla), def-10 (rozmiar 0,4–0,7 → gałąź dużego: brak testu `null` w przedziale), river-1 (`>` → `>=`) i river-2 (`<` → `<=`) (brak testu dokładnie na progu i na granicy marginesu), river-5 (margines ×2). Wymóg polecenia, czyli co najmniej 2 zabite mutanty na funkcję, jest spełniony: iso 3/3, N2 8/12, N4 2/2, N7a 2/5. Wyrocznia `packages/poker-core/test/scenario-dx.test.ts:61` jest jednokierunkowa (sprawdza tylko `call` dla pary, koloru i strita otwartego) i przepuszcza `null` (`r ?? 'call'`). Nie sprawdza `fold` ani asa i backdoora przy małym c-becie, choć spec 08-N2 każe ocenić wyrocznią klasę ręki w obu kierunkach.
- Mechanizm: jeden plik testu; `grep -n "r ?? 'call'" packages/poker-core/test/scenario-dx.test.ts` → 1 trafienie (61).
- Powraca: nie
- Wzorzec lub źródło: rola 08, „Dobry test”: przypadki zwykłe, puste, granice (równo na progu) i złe dane.
- Kroki w aplikacji: brak (testy); skutek pośredni: 001 i 002 przeszły testy.
- Opcje: jedna sensowna — dopisać wektory brzegowe i pełną wyrocznię (`call`/`fold`/`null` z rang i kolorów dla obu rozmiarów) — bo osłabionego testu nie zastąpi nic tańszego.
- Test akceptacyjny: mutanty def-6, def-7, def-8, def-10, river-1, river-2 i river-5 ze skryptu w dowody/ec-mutanty.txt dają czerwony wynik; def-4 opisany jako równoważny.
- Status: otwarte

### 08-programista-004 · Próg „dużego” c-betu 0,7 (D-1066) przy regule i wyjaśnieniach „3/4 puli i więcej”
- Pozycja listy kontrolnej: DEV-13
- Poziom: P2 (NIS)
- Realność: brzegowy (dopiero gdy szablon poda rozmiar 0,70–0,74) · Pewność: wysoka
- Rodzaj: M
- Dowód: `packages/poker-core/src/scenario-gen.ts:653` „const DEFEND_BIG_MIN = 0.7;” z komentarzem „duży ≥ 0,7 (≥ 3/4, R-M6-007)”; `content/pl/rules.yaml:526` „a c-bet jest duży (3/4 {{t:pot|puli}} i więcej)”. Wariant z rozmiarem 0,7 dostałby ocenę z reguły, której tekst mówi o 3/4. D-1066 nazywa próg i jest warunkowa do potwierdzenia przez 06.
- Mechanizm: 1 stała.
- Powraca: nie
- Wzorzec lub źródło: `CLAUDE.md`, spójność: „jedna definicja”.
- Kroki w aplikacji: po podpięciu szablon z rozmiarem 0,7 pokazuje regułę „3/4 i więcej”.
- Opcje: (a) próg 0,75, zgodny z tekstem reguły — przy 2/3 puli (J42 66% w źródle reguły) wynik `null`, czyli węższa pula; (b) zostawić 0,7 i zmienić tekst reguły na „ok. 2/3–3/4 i więcej” ze źródłem J42 — decyzja i tekst należą do 06. Rekomendacja: (a) do decyzji 06.
- Test akceptacyjny: `defendVsCbet(…, 0.7)` zgodne z tekstem reguły (null przy (a)).
- Status: otwarte (06, weto D-1066)

### 08-programista-005 · Wzór iso-size zapisany w dwóch miejscach, a lista rozmiarów size-spot powtórzona
- Pozycja listy kontrolnej: DEV-13
- Poziom: P2 (NIS)
- Realność: teoretyczny (dziś wartości są równe) · Pewność: wysoka
- Rodzaj: D
- Dowód: `packages/poker-core/src/grading.ts:375` „const expected = Number(p.base) + Number(p.perLimper) * limpers.length + (oop ? Number(p.oopExtra) : 0);” i `packages/poker-core/src/scenario-gen.ts:661` „return p.base + p.perLimper * limpers + (oop ? p.oopExtra : 0);”. Rozmiary 0,8× i 1,6×: `packages/poker-core/src/scenario-gen.ts:511` i `packages/poker-core/src/scenario-gen.ts:665`.
- Mechanizm: `grep -n "perLimper" packages/poker-core/src/*.ts` → 2 wzory; `grep -n "standard \* SIZE_SMALL_FACTOR" packages/poker-core/src/scenario-gen.ts` → 2 trafienia.
- Powraca: nie
- Wzorzec lub źródło: rola 08, zasada 11 (próg w jednym miejscu); DEV-13.
- Kroki w aplikacji: brak dziś; gdy ktoś zmieni jeden wzór, ocena partii (`grading.ts`) i ocena scenariusza rozjadą się.
- Opcje: (a) `grading.ts` woła `isoSizeStandardBb`, a `size-spot` woła `isoSizeOptions` przy podpinaniu N3 — jedno źródło, mały diff; (b) zostawić do integracji N3 i wtedy scalić — bez zmian teraz, ale ryzyko, że ktoś o tym zapomni. Rekomendacja: (a) razem z podpięciem N3.
- Test akceptacyjny: jeden wzór; `grep` daje 1 trafienie; testy iso-size w `grading` i N3 zielone.
- Status: otwarte

### 08-programista-006 · Brak sprawdzenia wejścia w N2, N4 i N7a
- Pozycja listy kontrolnej: DEV-07
- Poziom: P2 (NIS)
- Realność: teoretyczny (wejście z szablonu sprawdzanego przyszłą bramką) · Pewność: wysoka
- Rodzaj: D
- Dowód: `packages/poker-core/src/scenario-gen.ts:675-676`: `fraction` NaN przechodzi do gałęzi „duży” (`NaN <= 0.4` i `NaN < 0.7` dają false), a ≤ 0 do gałęzi „mały”. `packages/poker-core/src/scenario-gen.ts:700-701`: `bluffShare` spoza [0, 1] i ujemny `marginMin` przechodzą bez błędu. `packages/poker-core/src/scenario-gen.ts:693`: klasa w dwóch wpisach listy N4 dostaje werdykt z pierwszego wpisu bez błędu. Długość flopu sprawdza tylko `classifyFlop` w gałęzi dużego c-betu.
- Mechanizm: 3 funkcje, ten sam brak strażnika.
- Powraca: nie
- Wzorzec lub źródło: rola 08, zasada 9 („Niepoprawne dane dają typowany błąd”).
- Kroki w aplikacji: brak dziś.
- Opcje: (a) strażniki w funkcjach (wyjątek przy błędzie programisty, jak `assertPositive` w `requiredEquity`) — prosto i lokalnie; (b) sprawdzenie w bramce `checkScenarioTemplate` przy podpinaniu — błąd treści wychodzi przy `content:build`. Rekomendacja: (b) dla danych szablonu (duplikaty w liście, ułamki) i (a) dla zakresów liczb.
- Test akceptacyjny: szablon z klasą w dwóch wpisach listy albo z ułamkiem ≤ 0 jest odrzucany przy `content:build`.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- „As jako najwyższa karta” to w D-1066 każdy as w ręce przy małym c-becie. Źródło (`content/pl/rules.yaml:522`) mówi „even A-high hands”, więc kierunek się zgadza. Czy obejmuje to też A2o na flopie z trzema kartami w kolorze bez asa gracza (bez backdoora), musi rozstrzygnąć 06. Nie zgłaszam jako znaleziska.
- Wyjątek R-M6-007 „na suchych flopach z królem solver sprawdza wiele rąk z asem” jest zaimplementowany jako `null` tylko przy `wetness === 'dry'`. Czy „suchy” w źródle odpowiada klasie `dry` z `classifyFlop` (np. K72 dwukolorowy), sprawdzi 06. Test i tak tego nie pilnuje (def-7 w 003).

## Co działa dobrze i należy zachować
- Test 08-A ma dwie strony: dopuszcza szablon range-spot → cbet-case i nadal odrzuca szablon z `holding` bez cbet-case. Na kodzie sprzed poprawki pada z właściwego powodu (dowody/ec-08a-czerwony-b3963e9a.txt).
- `null` zamiast zgadniętej odpowiedzi w przedziale, którego źródło nie rozstrzyga (D-1065, przedział 0,4–0,7, wyjątek asa z królem), zgodnie z wzorcem `draw-call`.
- Wyrocznia N2 liczy klasę z rang i kolorów, niezależnie od `classifyHolding` (wymaga tylko rozszerzenia, 003).
- Funkcje dodane na końcu `scenario-gen.ts`, bez zmiany `tryVariant`: brak ryzyka dla zapisanych wariantów i odcisków.

## Decyzje dla właściciela
Brak. Znaleziska 001, 002 i 004 są merytoryczne (rola 06 według ADR-24), a 003, 005 i 006 techniczne (rola 08). Decyzji produktowej nie ma.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002,08-programista-003,08-programista-005,08-programista-006` (001, 002: wariant `null` do czasu decyzji 06); 004 i rozstrzygnięcie drawa wobec małego c-betu do roli 06 (D-1066).

`git status --porcelain` przed commitem (tylko nowe pliki raportu i dowodów):
```
?? docs/programista/recenzje/dowody/ec-08a-czerwony-b3963e9a.txt
?? docs/programista/recenzje/dowody/ec-ci-174dc00b.txt
?? docs/programista/recenzje/dowody/ec-mutanty.txt
?? docs/programista/recenzje/dowody/ec-sonda-n2.txt
?? docs/programista/recenzje/recenzja-dx-174dc00b.md
```
