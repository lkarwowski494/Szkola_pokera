# Audyt: Treści i wiedza domenowa — Szkoła Pokera (recenzja HS: treść HN, szkice HP) — 2026-11-16
Commit: 9677c41c (gałąź `claude/sesja-hs-recenzja`) · Tryb: audit (rola 06-tresci) · Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/HS.md` @ 63ef7c65 · Środowisko: Linux, node, `pnpm install --frozen-lockfile` kod 0, sieć do PC/GW/UP działa; bez symulatora iOS (nie był potrzebny). Decyzje: `docs/decyzje/HS.md` (D-1750…D-1754).

## Podsumowanie
Treść HN (SC-07, 10, 15, 17, 20, 23, 24, 31, pl i en) jest merytorycznie poprawna w rachunkach, a wyjaśnienia zgadzają się z wynikiem silnika na 39 rozdaniach (3 ziarna × poziom). Dwie rozbieżności zmieniają to, co widzi albo robi użytkownik: SC-20 mówi o dwóch kartach koloru, a w ok. 70% rozdań turn ma trzy (06-tresci-301), oraz SC-07 poziom średni uczy pasa nadkartami na niskich flopach, o których źródło R-M6-006 nie mówi (06-tresci-302). **Werdykt HN: PRZYJĄĆ Z UWAGAMI** (obie poprawki są małe: warunek generatora i filtr flopu). D-1705 rozstrzygnięte inaczej niż w HO (D-1750). Szkice HP są merytorycznie poprawne poza dwiema uwagami P2; do `content/` potrzebują zmian formatu w każdym z sześciu plików (tabela niżej), a SC-16 i SC-18 dodatkowo decyzji D-1710 (akcje per poziom).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-301 | P1 | M | SC-20: sytuacja „dwie karty w jednym kolorze”, a w 42/60 rozdań turn ma trzy | otwarte |
| 06-tresci-302 | P1 | M | SC-07 Ś: pas nadkartami na niskich flopach bez źródła (R-M6-006 = wysokie stoły) | otwarte |
| 06-tresci-303 | P2 | M | Szkic SC-26: „gra turniejowa” bez zastrzeżenia ICM | otwarte |
| 06-tresci-304 | P2 | M | Szkic SC-30: „sprawdzenie traci” bez nazwania uproszczenia (equity bez gry po flopie) | otwarte |
| 06-tresci-305 | P2 | D | SC-20: „ćwierć puli” słowem zamiast `{{n:}}`, rozmiar turnu przez klucz `cbet.size.big` | otwarte |

## Weryfikacja twierdzeń
Zakres: całość treści HN (8 szablonów pl, sytuacje en dla SC-07, 15, 17, 20) i 6 szkiców HP pl; twierdzenia krytyczne: brak (poker, bez zdrowia i prawa) · Hierarchia: ADR-24 z `CLAUDE.md` · Rozdania: `generateVariant` @ 9677c41c, ziarna 11, 222, 3333 (`dowody/hs-rozdania.txt`), częstości na ziarnach 1–60 (`dowody/hs-czestosci.txt`), kod wyjścia 0 · Źródła otwarte dziś: `dowody/hs-odczyty.txt`.

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| R-M6-006 | `content/pl/scenarios/sc-07.yaml:13` (Ś: pas) | pas najsłabszymi bez pary, drawa, backdoora i asa wobec 1/3 puli | pokercoaching.com/blog/defending-bb-on-high-card-boards/, wiersze 105–127 odczytu | "As for our calling range, we will continue with pretty much all pairs including he underpairs and even A-high hands." | CZĘŚCIOWO (zakres: tylko wysokie stoły K84, Q98) | ok | Ś tylko `flop: { height: [high] }` (D-1752) | 06-tresci-302 |
| D-1690 | `content/pl/scenarios/sc-07.yaml:20` (`fractions`) | mały c-bet = 1/3 puli | jw., wiersze 123–124 | "since he should mostly go with a small bet of around one-third of the pot" | POPARTE | — | — | — |
| R-M6-003 | `content/pl/scenarios/sc-15.yaml` (wyjaśnienie call) | OOP na flopie bronisz trochę mniej niż MDF | blog.gtowizard.com/mdf-alpha/ | „On average, BB is consistently over-folding to all bet sizes on the flop.” | POPARTE (PC K84: 56% + 17% = 73% wobec MDF 75%) | ok | — | — |
| R-M6-007 | `content/pl/scenarios/sc-17.yaml` (wyjaśnienie call) | wobec dużego c-betu sprawdzasz raczej z dodatkowym drawem | upswingpoker.com/when-to-call-with-ace-high/ (J42, 66%) | „does not call with any Ace-high hand that doesn’t have a significant backdoor draw” | POPARTE | ok | — | — |
| R-M7-006 | `content/pl/scenarios/sc-20.yaml:7` (sytuacja) | rywal może mieć flush-draw; na stole dwie karty koloru | rachunek i warunek silnika `packages/poker-core/src/scenario-gen.ts:1053` | — | SPRZECZNE z wariantem (42/60 rozdań: trzy karty koloru na turnie) | ok | D-1751: generator, dokładnie dwie karty koloru na turnie | 06-tresci-301 |
| R-M7-006 | `content/pl/scenarios/sc-20.yaml` (bet-big, bet-small) | draw ma 19,6%, potrzebuje 30% przy 3/4 i 16,7% przy 1/4 | rachunek: hit 0,1957, requiredBig 0,3, requiredSmall 0,1667 w `hs-rozdania.txt` | — | POPARTE | ok | — | 06-tresci-305 (zapis) |
| R-M4-010 | `content/pl/scenarios/sc-10.yaml` | AA, KK, AK: 4-bet; AK call dopuszczalny | rozdania: AKs (4bet, call acceptable), AA, KK | — | POPARTE (zgodne z D-1435) | ok | — | — |
| R-M8-007 | `content/pl/scenarios/sc-23.yaml` | lepszy blef = mniej kombinacji sprawdzających, nie mniej pasujących | rozdania: calls 35/29, folds 11/13 → hand-b; 27/34, 13/13 → hand-a | — | POPARTE (tekst = rachunek silnika) | ok | — | — |
| R-M8-010 | `content/pl/scenarios/sc-24.yaml`, `sc-31.yaml` | call ⇔ udział blefów > zakład ÷ (pula + 2·zakład) | 18 rozdań: każde `correct` zgodne z porównaniem bluffShare i required | — | POPARTE | ok | — | — |
| T-HP-21 | `docs/tresci/szablony-robocze/fd/pl/sc-27.yaml` (bet-big) | równe zakłady: rywal broni się najszerzej i wpłaca najwięcej | blog.gtowizard.com/pot-geometry/ | „This strategy maximizes how much money your opponent puts into the pot.” | POPARTE | ok | — | — |
| D-1720 | szkic SC-27 | SPR 4 → f ≈ 0,54; SPR 8 → f ≈ 0,79 | rachunek `hs-odczyty.txt` | — | POPARTE | — | — | — |

## Linia bazowa i założenia
- Wymiary pokrycia: fakty i reguły (8 szablonów HN, 6 szkiców HP): sprawdzone; liczby: wszystkie przez `{{n:}}` poza „ćwierć” (06-tresci-305); progi krytyczne dla zdrowia i prawa: sprawdzone, brak (dziedzina bez takich progów); brakujące ostrzeżenia: ICM w szkicu SC-26 (06-tresci-303); warianty regionalne: nie dotyczy (reguły gry wspólne, przekłady to rola 09); aktualność: źródła otwarte dziś, sha w `dowody/hs-odczyty.txt`; trudna pamięć: sprawdzone, brak; pary zdań: przeczytane w każdym wyjaśnieniu HN; twierdzenia z jednym źródłem: R-M6-006 Ś (jedno źródło szczebla 2 o wąskim zakresie, 06-tresci-302).
- Soczewki: laik (zdanie sytuacji SC-20 sprzeczne z kartami na ekranie), ekspert (pas nadkartami na niskim stole), sceptyczny weryfikator (każdy cytat dosłownie w surowym HTML), inny kraj: nie dotyczy.
- Wzorzec najlepszych: treść oparta na rozwiązaniach solvera opublikowanych przez szkoły (szczebel 2) z jawnym zakresem tekstury; tu zakres tekstury źródła nie przeszedł do filtra generatora.
- E0b (próbka od nowa): dla rachunków (SC-20, 24, 31, 27) liczby przeliczone niezależnie; dla R-M6-006 źródło przeczytane od nowa i porównane z rozdaniami silnika.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/pl/scenarios/sc-{07,10,15,17,20,23,24,31}.yaml` | tak, całość | odczyt + rozdania `dowody/hs-rozdania.txt` |
| `content/en/scenarios/` te same 8 | sytuacje SC-07, 15, 17, 20 i wyjaśnienie bet-big SC-20 | odczyt (D-1693); pełne en nie (przekłady: rola 09) |
| Szkice HP `fd/pl/sc-{16,18,21,26,27,30}.yaml` | tak, całość pl | odczyt, schemat `packages/content-schema/src/index.ts:796-886` |
| Szkice HP en | nie | poza zadaniem (zgodność struktury sprawdziła HP) |
| `content/pl/scenarios/sc-04.yaml:11` | tak | odczyt (zadanie 4) |
| Silnik `turn-bet`, `turn-action` | tak, gałęzie | `packages/poker-core/src/scenario-gen.ts:1023-1070` |
| Ekran (RODZAJE_NA_EKRANIE) | tak | `tools/content-build/src/scenariusze.ts:443`: defend i turn-bet są na ekranie |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-hs.md . --rola 06-tresci` (kopia skryptu z promptu roli w scratchpadzie): wynik w `dowody/hs-sprawdz-raport.txt`.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| TRE-01 | dotyczy | ok dla HN (reguły w `rules.yaml`, rejestr); szkice HP: rejestr `fd/rejestr-hp.md` |
| TRE-02 | dotyczy | ok dla 6 cytatów otwartych dziś; reszta rejestru nie otwierana (zakres HS) |
| TRE-03 | dotyczy | 06-tresci-302, 06-tresci-303 |
| TRE-04 | dotyczy | ok (szczeble 2 i 4 z atrybucją w szkicu SC-16) |
| TRE-05 | dotyczy | ok (D-1435 AKs, D-1722 SC-16 ręka mieszana) |
| TRE-06 | dotyczy | 06-tresci-305 |
| TRE-07 | dotyczy | 06-tresci-304 |
| TRE-08 | dotyczy | 06-tresci-301 |
| TRE-09 | nie dotyczy | brak faktów zmiennych w czasie |
| TRE-10 | nie dotyczy | brak treści krytycznych (D-027: przegląd zastępczy dotyczy całości aplikacji) |
| TRE-11, TRE-12 | nie dotyczy | brak historii i lokalizacji |
| TRE-13 | nie dotyczy | brak nagrań i pakietów spoza `content:build` |
| TRE-14 | dotyczy | ok: cytaty w treści ≤ 2 zdania, tylko w komentarzach i rejestrze |

## Znaleziska

### 06-tresci-301 · SC-20: sytuacja mówi „dwie karty w jednym kolorze”, a w ok. 70% rozdań na turnie są trzy
- Pozycja listy kontrolnej: TRE-08
- Poziom: P1
- Realność: realny (turn-bet jest na ekranie) · Pewność: wysoka
- Rodzaj: M
- Dowód: `content/pl/scenarios/sc-20.yaml:7` „Na {{t:board|stole}} są dwie karty w jednym kolorze”; warunek silnika `packages/poker-core/src/scenario-gen.ts:1053` liczy 4 karty koloru w rękach rywala i na turnie razem; `dowody/hs-czestosci.txt`: 42 z 60 wariantów ma trzy karty jednego koloru na turnie (np. ziarno 11: turn 5♠ 9♠ 9♣ 8♠, `dowody/hs-rozdania.txt`). To samo w en.
- Mechanizm: zdanie sytuacji opisuje stół, którego generator nie wymusza; `grep -n "dwie karty w jednym kolorze" content/pl/scenarios/*.yaml` → 1 trafienie (sc-20).
- Powraca: nie
- Wzorzec lub źródło: D-1751; R-M7-006 liczy tylko cenę drawa
- Kroki w aplikacji: scenariusz SC-20, poziom łatwy; stół z trzema pikami na turnie.
- Opcje: (a) generator: dokładnie dwie karty koloru na turnie (rola 08) — tekst bez zmian; (b) tekst „co najmniej dwie” — uczyłby dużego zakładu na stole z możliwym kolorem bez źródła. Rekomendacja: (a).
- Test akceptacyjny: 60 ziaren poziomu łatwego: każdy turn ma najwyżej dwie karty jednego koloru; wyrocznia HO zielona.
- Status: otwarte

### 06-tresci-302 · SC-07 poziom średni uczy pasa nadkartami na niskich flopach, o których źródło nie mówi
- Pozycja listy kontrolnej: TRE-03
- Poziom: P1
- Realność: realny (defend jest na ekranie) · Pewność: wysoka co do zakresu źródła; średnia co do tego, że pas jest błędny
- Rodzaj: M
- Dowód: `content/pl/scenarios/sc-07.yaml:13` `sredni: { expected: [fold] }` bez filtra flopu; `dowody/hs-czestosci.txt`: 36 z 60 wariantów Ś ma najwyższą kartę flopu J lub niższą (KJ na 8♠4♣2♦, KT na 4♦6♠5♦); źródło: `dowody/hs-odczyty.txt` wiersze 105–107 ("dry high-card boards like K♠8♥4♣", "wet high-card boards like Q♥9♥8♦").
- Mechanizm: zakres tekstury źródła nie trafił do granic poziomu; `grep -n "R-M6-006" content/pl/scenarios/*.yaml` → sc-07, sc-15 (sc-15 ma tylko poziom łatwy, nie dotyczy).
- Powraca: nie
- Wzorzec lub źródło: D-1752
- Kroki w aplikacji: SC-07, poziom średni, flop niski z nadkartami gracza.
- Opcje: (a) `sredni: { expected: [fold], flop: { height: [high] } }` — mniej różnorodne stoły; (b) szukać źródła dla niskich stołów — dłużej, wynik niepewny. Rekomendacja: (a).
- Test akceptacyjny: 60 ziaren Ś: każdy flop z najwyższą kartą Q lub wyższą; `pnpm run ci` zielone.
- Status: otwarte

### 06-tresci-303 · Szkic SC-26: „gra turniejowa” bez zastrzeżenia ICM
- Pozycja listy kontrolnej: TRE-03
- Poziom: P2
- Realność: brzegowy (szkic poza `content/`) · Pewność: wysoka
- Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-26.yaml:6` „Gra turniejowa, krótkie stacki”; werdykt liczony w żetonach (R-M9-002).
- Mechanizm: jedno wystąpienie.
- Powraca: nie
- Wzorzec lub źródło: D-1753
- Kroki w aplikacji: po wejściu szkicu: SC-26.
- Opcje: (a) dopisać „gra o żetony, bez presji ICM”; (b) usunąć „turniejowa”. Rekomendacja: (a).
- Test akceptacyjny: sytuacja SC-26 nie sugeruje ICM albo je wyklucza.
- Status: otwarte

### 06-tresci-304 · Szkic SC-30: „sprawdzenie traci” bez nazwania uproszczenia
- Pozycja listy kontrolnej: TRE-07
- Poziom: P2
- Realność: brzegowy (szkic) · Pewność: wysoka
- Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/fd/pl/sc-30.yaml:22` „traci: nawet wobec wszystkich rąk, które gra ten rywal”; porównanie equity z ceną pomija grę po flopie (realizację equity), kierunek zgodny (ręce zdominowane wobec nita).
- Mechanizm: jedno wystąpienie.
- Powraca: nie
- Wzorzec lub źródło: zasada uproszczenia w `CLAUDE.md` (nazwane uproszczenie)
- Kroki w aplikacji: po wejściu szkicu: SC-30.
- Opcje: (a) „w uproszczeniu, bez gry po flopie, sprawdzenie traci”; (b) zostawić w komentarzu szablonu. Rekomendacja: (a).
- Test akceptacyjny: wyjaśnienie nazywa uproszczenie.
- Status: otwarte

### 06-tresci-305 · SC-20: „ćwierć puli” słowem i rozmiar turnu przez klucz c-betu
- Pozycja listy kontrolnej: TRE-06
- Poziom: P2
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `content/pl/scenarios/sc-20.yaml:25` „przy {{t:bet|zakładzie}} ćwierć {{t:pot|puli}}” (liczba poza `{{n:}}`); zakład na turnie podany przez `{{n:cbet.size.big}}`, a `small: 0.25` w `content/pl/scenarios/sc-20.yaml:19` nie ma klucza w tekście. Wartości poprawne.
- Mechanizm: `grep -n "ćwierć" content/pl/scenarios/*.yaml` → 1 trafienie.
- Powraca: nie
- Wzorzec lub źródło: `CLAUDE.md`, zasady techniczne (liczby tylko przez `{{n:klucz}}`)
- Kroki w aplikacji: SC-20, wyjaśnienie bet-small.
- Opcje: (a) `{{n:cbet.range.small.low}}` albo nowy klucz `bet.size.quarter` = 0,25 i `bet.size.three-quarters`; (b) zostawić słowo. Rekomendacja: (a) z nowymi kluczami rozmiaru (jedna nazwa na pojęcie: to nie c-bet).
- Test akceptacyjny: kontrola 06-tresci-008 obejmuje `turn-bet` (`small`/`big` = klucze w tekście).
- Status: otwarte

## Do sprawdzenia
- SC-15 łatwy i SC-07 łatwy dają identyczne rozdania dla tych samych ziaren (`dowody/hs-rozdania.txt`): ten sam punkt w dwóch modułach. Sprawa zakresu (rola 03), bez skutku merytorycznego.
- SC-10: „dominuje większość rąk, które sprawdzą 4-bet” dla AK — brak przeczytanego źródła składu zakresu sprawdzającego BTN; prawdziwe dla AA i KK.
- Szkic SC-16 raise-small: „tanio zapłaci każdym drawem” — „każdym” mocniejsze niż rachunek; sprawdzić wartość `eq.vs-xr.too-small` wobec equity gutshota.
- Komentarze nagłówków SC-07, 17, 20, 24, 31 mówią „poza ekranem”, a rodzaje są na ekranie (`tools/content-build/src/scenariusze.ts:443`): nieaktualny komentarz, bez treści dziedzinowej.

## Co działa dobrze i należy zachować
- Wszystkie liczby rachunkowe HN przez `{{n:}}` z formułami; wyjaśnienia river-catch warunkowe (D-1438), więc jeden tekst na akcję jest prawdziwy przy każdym poziomie.
- Wyrocznia HO liczy od zera (D-1712); w tej recenzji 39 rozdań zgodnych z tekstem co do akcji poprawnej.
- Szkice HP: każdy cytat ponownie przeczytany (D-1715), ręka mieszana w SC-16 rozstrzygnięta zrzutem solvera (D-1722).

## Decyzje dla właściciela
Brak decyzji merytorycznych dla właściciela (ADR-24). Do weta: D-1750…D-1754. Produktowe (przez koordynatora, rola 03/04): D-1710 (akcje per poziom w SC-16 i SC-18).

## Tabela szkiców HP (zadanie 3)
| Szkic | Ocena merytoryczna | Zmiany formatu, by wejść do `content/` |
|---|---|---|
| SC-16 | PRZYJĄĆ (ręka mieszana D-1722 poprawna; uwaga w „Do sprawdzenia”) | `fractions: [0.33]` → `cbet: 0.333333` (jak D-1690); `multipliers: {raise-small, raise-big}` → `{ small: 1.5, big: 4.5 }` (= `xr.too-small.mult`, `xr.mult.example`); granice: `draws: [flush, oesd]` (D-1706), `flopBroadwayMax: 2`; `actions` per poziom usunąć (D-1710: Ś bez raise-small wymaga decyzji 03/04 albo dwóch szablonów) |
| SC-18 | PRZYJĄĆ | z decyzji usunąć `spot`, `turnClass`, `hand`, `sizes` (schemat `turn-action` ich nie ma); granice: `turnClass: overcard`, `pairKind: [top]`, `flopMiss: true`; filtr strita wg D-1750; `actions` per poziom: D-1710 (T z bet-small); rozmiary 0,33/0,67 nie trafiają do schematu — „duży” bez liczby na ekranie (sprawa widoku 04) |
| SC-21 | PRZYJĄĆ | `turnClass: blank` → granica `turnClass: other`; `flop: { height: [high] }` → `flopHighMin: K` (warunki HP: „od króla w górę”; `high` = od damy); usunąć `spot`, `hand`, `sizes`, `actions` per poziom (zgodne z decyzją) |
| SC-26 | PRZYJĄĆ Z UWAGĄ 06-tresci-303 | `calc: R-M9-002` → `rule: R-M9-002` (D-1702); `kicker: [A, K]` → `kickerMin: K` (D-1701); w decyzji `pots`, `stacks` dające SPR 1,8–2,3; `spot` zostaje (schemat `spr-call` go wymaga) |
| SC-27 | PRZYJĄĆ | `kind: flop-size` + `mode` → `kind: geo-size` (D-1700); `pots`, `stacks`, `streets: 3`, `small` = wartość klucza użytego w tekście (`g3b.third.*`, jak D-1690); Ś: `sprRange` równe `spr.3bet-ip`, T: `[4, 8]` |
| SC-30 | PRZYJĄĆ Z UWAGĄ 06-tresci-304 | `calc: R-M2-005` → `rule: R-M2-005` (analogia D-1702); w decyzji `open`, `threeBet` (= `pf.open-size`, `pf.3bet.oop-total`), `vpips: [0.08, 0.1]`; z granic usunąć `vpip`; usunąć `spot` (schemat `nit-3bet` go nie ma) |

## Tytuł SC-04 (zadanie 4)
Tytuł = pierwsze zdanie sytuacji (D-1660); w SC-04 całość to jedno zdanie (`content/pl/scenarios/sc-04.yaml:11`). Propozycja pl: "Pierwszy do gry na {{t:utg|UTG}}. Jeśli {{t:open|otworzysz}}, {{t:big-blind|duży blind}} {{t:call|sprawdzi}} i na flopie {{t:check|poczeka}}." Tytuł: "Pierwszy do gry na UTG." (24 znaki po rozwinięciu). Sens bez zmian: na UTG nikt przed tobą nie wszedł do gry, więc "pierwszy do gry" zastępuje "nikt jeszcze nie wszedł do gry". Tytuł nie zdradza akcji (otwarcie albo pas zależy od ręki). Brzmienie należy do roli 04 (SP-11); en analogicznie: "First to act {{t:utg|UTG}}."

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-302,06-tresci-303,06-tresci-304,06-tresci-305` (treść, rola 06) oraz dla roli 08: 06-tresci-301 (D-1751) i filtr strita D-1750 w `turn-action`.
