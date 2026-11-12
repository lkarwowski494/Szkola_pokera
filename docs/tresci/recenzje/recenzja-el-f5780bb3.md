# Recenzja niezależna EL (06-tresci, audit): poprawki treści po EJ/EI i kolejka 06 — Szkoła Pokera — 2026-11-12
Commit: f5780bb3 (zakres 31723a6c..f5780bb3) · Sesja: EO · Tryb: audit (moduły kontrole-mechaniczne, tresci-krytyczne) · Środowisko: Linux 6.18, Node v22.23.4, pnpm z lockfile; sieć działa (źródła pobrane `curl` w dniu recenzji); macOS/Xcode niedostępne (nie dotyczy zakresu).

## Podsumowanie
Werdykt: **przyjąć z poprawkami (bez KRYT; 1 WYS do decyzji 06 przed 08-EL-1)**. Wszystkie 14 cytatów z `docs/tresci/odczyty/el-2026-11-11.tsv` sprawdziłem dziś dosłownie na surowym tekście stron (7 adresów, kod HTTP 200, `curl` + usunięcie znaczników HTML + `grep -F`); każdy jest w źródle. Przesunięcia uzasadnień (D-1210 zamiast D-1167/D-1168, D-1211 dla „2/3”) są trafne: cytat PeakGTO o gutshotach dotyczy blefów check-raise'em, a „~2/3 pot” stoi tylko w sekcji streszczenia AI strony. Najważniejsze ryzyko: nowe brzmienie R-M7-006 („silna ręka = najwyższa para albo lepsza”) jest szersze niż źródło („strong top pairs and better”) i sprzeczne z lekcją m7-l2 („najwyższa para ze słabym kickerem to średnia ręka”); D-1213 przenosi to szerokie brzmienie do specyfikacji generatora 08-EL-1. Kontrola zastępcza D-1219 jest realna jako dowód jednorazowy (czerwony przebieg odtworzony, zielony na HEAD), ale nie jest bramką: skrypt nie biegnie w `pnpm run ci`.

Skala: KRYT = P0, WYS = P1, ŚR = P2, NIS = P2 bez zmiany działania (szlif zapisu).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | P1 (WYS) | M | R-M7-006 i D-1213: „silna ręka = najwyższa para albo lepsza” szersze niż źródło i sprzeczne z lekcją m7-l2 | otwarte |
| 06-tresci-002 | P2 (ŚR) | M | D-1210/D-1168: „wysokie karty ≥ T” obejmuje ręce bez overkarty, a źródło mówi „backdoor plus overcard” i dotyczy blind vs blind | otwarte |
| 06-tresci-003 | P2 (ŚR) | D | D-1219: el-kontrola.mjs poza `pnpm run ci`, więc regresja treści pl/en przejdzie niezauważona do czasu 08-EL-3 | otwarte |
| 06-tresci-004 | P2 (NIS) | D | Rejestr R-M7-006 odsyła do D-1214 zamiast D-1213 (uproszczenie i uwagi, oba pliki rejestru) | otwarte |

## Weryfikacja twierdzeń
Zakres: całość zakresu commitów (3 reguły pl/en, 11 decyzji D-1210…D-1220, 14 cytatów, 2 rachunki) · Hierarchia: z `CLAUDE.md` (ADR-24) · Skrypty: `el-kontrola.mjs` kod 0 na HEAD i kod 1 (12 braków) na 31723a6c; rachunki KO-076 kod 0, wynik identyczny z dowodem autora; spójność `{{n:…}}` w 11 językach: bez różnic.

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| R-M6-006 source (Upswing) | `content/pl/rules.yaml:522` | sprawdzasz wysokimi kartami z backdoorem | upswingpoker.com/backdoor-flush-straight-draw-tips, Tip 4 (wiersz 182 surowego tekstu) | „Unless you start calling with these non-made, backdoor plus overcard of hands, you will not reach the desired defense frequency” | POPARTE (w zakresie BvB; zakres podany w source: „BB wobec c-betu SB”) | z `then` reguły: „wysokimi kartami” = źródłowe „overcard” | — | 06-tresci-002 (dla generatora) |
| R-M6-006 source (PeakGTO) | `content/pl/rules.yaml:522` | solver kontynuuje prawie wszystkie pary i A-high | pokercoaching.com/blog/defending-bb-on-high-card-boards (wiersz 114) | „we will continue with pretty much all pairs including he underpairs and even A-high hands” | POPARTE (literówka „he” jest w źródle, dosłownie) | — | — | — |
| R-M6-007 source | `content/pl/rules.yaml:530` | K84 wobec większego c-betu, rozmiar niepodany | tamże, wiersze 115 i 117; “~2/3 pot” tylko w wierszach 97–98 pod “TLDR: See AI summary of this article.” | “We call with a similar range as when facing a small c-bet putting out chips in the middle any pair and most of our Ax holdings.” | POPARTE | z `then` (“zwykle pasujesz”): wyjątek nazwany | — | — |
| R-M7-006 if | `content/pl/rules.yaml:609`, `content/en/rules.yaml:608` | silna = najwyższa para albo lepsza | pokercoaching.com/blog/bet-sizing-on-connected-boards-pot-it-or-slow-down, Tip #2 (wiersz 110); Tip #1 (wiersz 106) | “Pot-size bets with your strong top pairs and better are standard” | CZĘŚCIOWO: źródło “strong top pairs”, aplikacja każda najwyższa para | sprzeczne z `content/pl/lessons/m7-l2-polaryzacja.md:64` (TPWK = średnia ręka) | “najwyższą parę z dobrym kickerem albo lepszą” | 06-tresci-001 |
| R-M7-006 if (żywy draw) | `content/pl/rules.yaml:609` | draw, który po trafieniu cię pokona | rachunek: 9/46 = 19,57 %; ceny 1/4 i 3/4 puli = 16,67 % i 30 % | — | POPARTE (rachunek sprawdzony: 8/46 − 1/6 = 0,72 pp) | then/because spójne | — | — |
| D-1210 | `docs/decyzje/EL.md:6` | MDF 1/3 → obrona ok. 75 %; solver 56 % + 17 % = 73 % | defending-bb (wiersz 111); rachunek alpha = (1/3)/(4/3) = 25 % | „Versus a small c-bet, we are calling 56% of the time and check-raising 17% of the hands.” | POPARTE; cytat o gutshotach poprzedzony „This strategy lets us bluff quite a lot.” (wiersz 113) — odczytanie D-1210 trafne | gutshot 4/47 = 8,51 % < 20 % (`eq.bet-third`) — rachunek zgodny | doprecyzować zakres Tip 4 (BvB) i „overcard” | 06-tresci-002 |
| D-1211 | `docs/decyzje/EL.md:7` | „2/3” tylko w streszczeniu AI | defending-bb, wiersze 96–98 | „TLDR: See AI summary of this article.” | POPARTE | — | — | — |
| D-1212 | `docs/decyzje/EL.md:8` | Tip 4 o obronie BB, Tip 2 o check-raisie | backdoor-tips, wiersze 180–182 | “Float on the flop with backdoor plus overcard hands in blind vs blind battles” | POPARTE | — | — | — |
| D-1213 | `docs/decyzje/EL.md:9` | silna = najwyższa para i lepsze | jak R-M7-006 | jak wyżej | CZĘŚCIOWO | — | jak R-M7-006; filtr 08-EL-1 bez słabego kickera | 06-tresci-001 |
| D-1214 | `docs/decyzje/EL.md:10` | KO-076: 0 klas SC-33 z marginesem bezpośrednim < 2 pp | rachunek (Python, kod 0), `dowody/eo-ko076.txt` | — | POPARTE (wynik identyczny co do znaku z `docs/tresci/dowody/el-ko076.txt`; wzory EV: call 20·eq − 9 → próg 0,45; push (1−pc)·1 + pc·(20·eq − 10) + 0,5 — sprawdzone) | miara Python = `policzMargines` (`packages/poker-core/src/scenario-gen.ts:504`) | — | — |
| D-1215 | `docs/decyzje/EL.md:11` | warunkowa; pole cofnięte | `el-kontrola.mjs --ko076`: 6 braków (pole nieobecne w pl/en) | BR-POZ-001: „margines od 0 do 2 pp” (`docs/brd/wymagania-scenariusze.md:116`) | POPARTE (0,02 z BRD) | — | — | — |
| D-1216 | `docs/decyzje/EL.md:12` | mały c-bet = [0,25; 0,35] | upswingpoker.com/bet-size-strategy-tips-rules | „Bet small (25-35% pot) on dry, static board textures” | POPARTE jako definicja (źródło mówi o rozmiarze betującego; kierunek obrony przy 0,25 tym bardziej szerszy — MDF) | `content/numbers.yaml:185` ten sam cytat | — | — |
| D-1217 | `docs/decyzje/EL.md:13` | bluff-catcher bez dwóch par i lepszych | deepfold.co/en/blog/bluff-catching-principles (wiersz 25) | “If your hand can beat some of villain's value combos — say you have a small set … you're not bluff catching.” | POPARTE | przykład TPGK (wiersz 179) zgodny z “jedna para” | — | — |
| D-1218 | `docs/decyzje/EL.md:14` | bez `check` dla R-M5-012 | blog.gtowizard.com/c-betting-as-the-oop-preflop-raiser | „which flops we can continue to be aggressive on” | POPARTE | — | — | — |

## Linia bazowa i założenia
Linię bazową zbudowałem przed czytaniem `stan-el.md` (raport autora nieczytany): dla twierdzeń o największym skutku (progi N2, warunek R-M7-006, miara KO-076) otworzyłem źródła od nowa i przeczytałem otoczenie cytatów (akapit przed i po), a rachunki policzyłem sam.

Wymiary pokrycia:
- Kategorie twierdzeń (reguły, uzasadnienia, liczby, progi generatora): sprawdzone; znaleziska 001, 002.
- Progi krytyczne dla zdrowia, życia, mienia, prawa: sprawdzone, brak (treść pokerowa bez progów bezpieczeństwa; moduł tresci-krytyczne: żadne zmienione twierdzenie nie ma `krytyczne: true`).
- Brakujące ostrzeżenia i granice stosowania: R-M7-006 nie mówi o kickerze (001); D-1216 nie dotyczy rozmiarów poniżej 0,25 — zostają `null` (bezpieczne).
- Jednostki i warianty regionalne: sprawdzone; `{{n:…}}` identyczne w 11 językach dla R-M6-006, R-M6-007, R-M7-006 (`dowody/eo-jezyki.txt`).
- Aktualność źródeł: wszystkie 7 adresów otwarte 2026-11-12, cytaty niezmienione od odczytu autora 2026-11-11.
- Trudna pamięć: nie dotyczy (sprawdzone, brak).
- Pary zdań: sprzeczność R-M7-006 ↔ m7-l2:64 (001); cytat o gutshotach ↔ zdanie poprzedzające (potwierdza D-1210).
- Jedno źródło / niskie szczeble: „silna ręka” i backdoor z overkartą stoją na pojedynczych źródłach szczebla 4 (001, 002).

Soczewki: laik (każda najwyższa para = silna ręka → duży bet), ekspert (kicker i overkarta), sceptyczny weryfikator (każdy cytat na surowym tekście), inny region (języki poza pl/en — D-1220). Wzorzec najlepszych w klasie: reguła ma warunek w brzmieniu źródła, a lekcje i reguła używają jednej definicji „silnej ręki”. Zmian w `docs/zalozenia.md` nie proponuję.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/pl/rules.yaml`, `content/en/rules.yaml` (R-M6-006, R-M6-007, R-M7-006) | tak | diff zakresu, cytaty `dowody/eo-cytaty.txt` |
| 10 pozostałych języków: liczby i placeholdery | tak (tylko `{{n:…}}`, „2/3” w source) | `dowody/eo-jezyki.txt` |
| `docs/decyzje/EL.md` D-1210…D-1220, `docs/decyzje/EH.md` D-1166…D-1168 | tak | cytaty i rachunki powyżej |
| `docs/tresci/rejestr.json`, `docs/tresci/rejestr/m5-m8.json` (wpisy R-M6-006, R-M6-007, R-M7-006) | tak | grep, 06-tresci-004 |
| `docs/tresci/narzedzia/el-kontrola.mjs`, `dowody/el-red.txt` | tak (uruchomione na HEAD i 31723a6c) | `dowody/eo-el-kontrola.txt` |
| Rachunki KO-076 (`rachunki/el_ko076_*.py`) | tak (uruchomione, porównane) | `dowody/eo-ko076.txt` |
| Lekcje i egzaminy używające R-M7-006 / R-M6-006 (m7-l2, m7 exam, m6-l2) | tak, pary zdań | 06-tresci-001 |
| Bazy `tresc-*.db` i `tresc.generated.ts` | nie (artefakty budowania; spójność z treścią sprawdza `pnpm run ci`) | `dowody/eo-ci-f5780bb3.txt` |
| Kod generatora (`defendVsCbet`, `turn-bet`) | tylko odczyt do kontekstu (obszar 08) | — |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-el-f5780bb3.md . docs/tresci --rola 06-tresci` (skrypt z promptu roli, kopia w scratchpadzie) → kod 0: „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 06-tresci”. Przejrzane `git diff --cached` przed commitem: tylko raport, dowody `eo-*` i `docs/decyzje/EO.md`; brak sekretów.

`pnpm run ci` na f5780bb3 we własnym kontenerze: **kod 0** (`dowody/eo-ci-f5780bb3.txt`; testy: content-build 665 + 1 oczekiwany błąd, domena 347 + 1, poker-core 230, postep 160, jezyki 144, preflop-solver 44, srs 21, ostatni zestaw vitest 35; rejestr 0 błędów, 1 uwaga). `git status --porcelain` plików śledzonych przed i po: bez zmian.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| TRE-01 | dotyczy | ok: każda zmieniona reguła ma wpis w rejestrze |
| TRE-02 | dotyczy | ok: 14/14 cytatów dosłownie w źródle |
| TRE-03 | dotyczy | 06-tresci-001, 06-tresci-002 |
| TRE-04 | dotyczy | ok: szczeble 2 i 4 z atrybucją „serwis szkoleniowy”; „2/3” ze streszczenia AI usunięte (pl, en) |
| TRE-05 | dotyczy | ok: D-1211 rozstrzyga J42 vs K84; 06-tresci-004 (zapis odsyłacza) |
| TRE-06 | dotyczy | ok: liczby tylko przez `{{n:…}}`; progi D-1216 z kluczy `cbet.range.small.*` |
| TRE-07 | dotyczy | 06-tresci-002 (uproszczenie ≥ T bez dowodu kierunku) |
| TRE-08 | dotyczy | 06-tresci-001 (para R-M7-006 ↔ m7-l2:64) |
| TRE-09 | nie dotyczy | brak faktów zmiennych w zakresie |
| TRE-10 | nie dotyczy | brak twierdzeń `krytyczne` w zakresie |
| TRE-11 | nie dotyczy | brak trudnej pamięci |
| TRE-12 | nie dotyczy | brak treści zależnej od lokalizacji |
| TRE-13 | dotyczy | ok przez `pnpm run ci` (bramka treść = baza) |
| TRE-14 | dotyczy | ok: cytaty 1–2 zdania z atrybucją |

## Znaleziska (szczegóły)

### 06-tresci-001 · R-M7-006 i D-1213 uczą, że każda najwyższa para to silna ręka do dużego betu, choć źródło mówi „strong top pairs”, a lekcja m7-l2 nazywa TPWK średnią ręką
- Pozycja listy kontrolnej: TRE-03 (też TRE-08)
- Poziom: P1 (WYS)
- Realność: realny · Pewność: wysoka (rozbieżność tekstów); średnia co do wyniku solvera dla TPWK na turnie z drawem
- Rodzaj: M
- Dowód: `content/pl/rules.yaml:609` „masz na turnie silną rękę ({{t:top-pair|najwyższą parę}} albo lepszą)”; `content/en/rules.yaml:608` „you have a strong hand on the turn ({{t:top-pair}} or better)”; `content/pl/lessons/m7-l2-polaryzacja.md:64` „{{t:top-pair|Najwyższa para}} ze słabym kickerem to średnia ręka”; źródło (wiersz 110 surowego tekstu, 2026-11-12): “Pot-size bets with your strong top pairs and better are standard”; Tip #1 (wiersz 106) wymienia jako silne “overpairs, two pairs, and sets”.
- Mechanizm: definicja „silnej ręki” w regule pominęła przymiotnik źródła; `grep -n "pairKind overpair/top" docs/decyzje/EL.md` → D-1213 (`docs/decyzje/EL.md:9`) i 08-EL-1 przenoszą to do filtra generatora (każdy kicker).
- Powraca: nie
- Wzorzec lub źródło: pokercoaching.com/blog/bet-sizing-on-connected-boards-pot-it-or-slow-down/, odczyt 2026-11-12, cytat wyżej.
- Kroki w aplikacji: moduł 7, lekcja m7-l2: zadanie z K♥9♣ uczy czekania z TPWK, a reguła R-M7-006 w tej samej lekcji mówi, że najwyższa para to silna ręka do dużego betu; po 08-EL-1 warianty `turn-bet` z TPWK oczekiwałyby `bet-big`.
- Opcje: (a) „najwyższą parę z dobrym kickerem albo lepszą” (pl, en) + filtr 08-EL-1 bez TPWK — brzmienie źródła, zgodne z m7-l2; wymaga progu „dobrego kickera” (np. kicker ≥ T, nazwane uproszczenie); (b) „{{t:overpair}}, dwie pary albo lepszą” (Tip #1) — prostsze w generatorze, węższe niż źródło. Rekomendacja: (a) — decyzja merytoryczna 06 (ADR-24), nie właściciela.
- Test akceptacyjny: `el-kontrola.mjs` (albo test 08-EL-3) wymaga „kicker” w `if` R-M7-006 pl/en; wektor 08-EL-1: K♥4♣ na K♦8♦3♠7♥ → odrzucony (TPWK); K♥Q♣ na tym samym stole → przyjęty.
- Status: otwarte

### 06-tresci-002 · Backdoor z kartami ≥ T jako „call” obejmuje ręce bez overkarty, a przeczytane źródło mówi o „backdoor plus overcard” w blind vs blind
- Pozycja listy kontrolnej: TRE-07 (też TRE-03)
- Poziom: P2 (ŚR)
- Realność: brzegowy · Pewność: wysoka (brak pokrycia w źródle); kierunek wyniku nieustalony
- Rodzaj: M
- Dowód: `docs/decyzje/EL.md:6` D-1210: „w D-1168 dodatkowo „wysokie karty” = obie ≥ T (D-1066), a źródło mówi o „overcard””; `packages/poker-core/src/scenario-gen.ts:931` `BACKDOOR_HIGH_MIN = RANK_T`; źródło (wiersze 180–182): “Float on the flop with backdoor plus overcard hands in blind vs blind battles”. Przykład: J♠T♠ na K♠8♦4♣ ma backdoory, ale żadnej overkarty; żadne przeczytane źródło nie każe tej ręki sprawdzać wobec 1/3 BB vs BTN.
- Mechanizm: uproszczenie nazwane, ale bez wykazania zgodności kierunku (TRE-07); Tip 4 dotyczy BvB, a PeakGTO (BB vs BTN) mówi o parach i A-high, nie o backdoorach bez overkarty.
- Powraca: nie
- Wzorzec lub źródło: upswingpoker.com/backdoor-flush-straight-draw-tips/, odczyt 2026-11-12; Tip 5 (wiersz 188): 9♣5♣ z kilkoma backdoorami „is not a hand with which to call” wobec 66 %.
- Kroki w aplikacji: punkt N2 (po 08-EH-3/08-EL-2) — wariant z JT bez overkarty oceniony jako `call`.
- Opcje: (a) dodać warunek „co najmniej jedna karta wyższa od najwyższej karty flopu” dla backdoorów → `call`, reszta `null` — brzmienie źródła; (b) zostawić ≥ T i dopisać do D-1210 uzasadnienie kierunku z MDF z jawnym `[DO USTALENIA]` dla rąk bez overkarty. Rekomendacja: (a).
- Test akceptacyjny: J♠T♠ na K♠8♦4♣, c-bet 1/3 → `null`; Q♥4♥ na T♣9♥2♠ (przykład źródła) → `call`.
- Status: otwarte

### 06-tresci-003 · Kontrola zastępcza D-1219 nie jest bramką: el-kontrola.mjs nie biegnie w pnpm run ci
- Pozycja listy kontrolnej: TRE-06
- Poziom: P2 (ŚR)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód: `docs/tresci/narzedzia/el-kontrola.mjs:3` „Dlaczego osobny skrypt, a nie test w tools/content-build/test”; `grep -rn "el-kontrola" package.json .github tools` → 0 trafień (`dowody/eo-el-kontrola.txt`). Czerwony przebieg odtworzony na 31723a6c: 12 braków, kod 1 (autor: 18 z `--ko076`); HEAD: 0 braków, kod 0.
- Mechanizm: zasada wspólna 21 („kontrolę, którą agent może pominąć, wymusza hook albo test”); warunki są obecnościowe (regex), bez 10 języków (D-1220).
- Powraca: nie
- Wzorzec lub źródło: zasada wspólna 7 („ryzykowną część zastąp tańszą kontrolą, nie żadną”) — spełniona tylko jednorazowo.
- Kroki w aplikacji: brak bezpośrednich; ryzyko regresji przy przekładzie 09 albo scaleniu EK.
- Opcje: (a) 08-EL-3 jako warunek scalenia EL do roboczej; (b) tymczasowo dopisać krok do skryptu `ci` w `package.json` (poza zakresem tej roli). Rekomendacja: (a).
- Test akceptacyjny: test w `tools/content-build/test/` czerwony po przywróceniu „2/3” w R-M6-007 pl.
- Status: otwarte

### 06-tresci-004 · Rejestr R-M7-006 odsyła do D-1214 zamiast D-1213
- Pozycja listy kontrolnej: TRE-05
- Poziom: P2 (NIS)
- Realność: realny · Pewność: wysoka
- Rodzaj: D
- Dowód: `docs/tresci/rejestr/m5-m8.json:1283` (pole `uproszczenie` kończy się „może nie zachodzić (D-1214)”) i `docs/tresci/rejestr/m5-m8.json:1291` „EL 2026-11-11 (EI-001, D-1214)”; to samo `docs/tresci/rejestr.json:22418` i `docs/tresci/rejestr.json:22426`. D-1214 to KO-076; warunek R-M7-006 to D-1213 (`docs/decyzje/EL.md:9`).
- Mechanizm: `grep -n "D-1214" docs/tresci/rejestr.json docs/tresci/rejestr/m5-m8.json` → 4 trafienia, wszystkie przy R-M7-006.
- Powraca: nie
- Wzorzec lub źródło: zasada wspólna 6 (decyzja do sprawdzenia i cofnięcia).
- Kroki w aplikacji: brak (pole rejestru nie jest pokazywane).
- Opcje: jedna sensowna — zamiana na D-1213 w 4 miejscach.
- Test akceptacyjny: `grep -c "D-1214" docs/tresci/rejestr.json` przy R-M7-006 = 0.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Czy solver na turnie z drawem do koloru betuje duży rozmiar z TPWK (dotyczy wagi 001): brak przeczytanego wyniku solvera dla tej klasy; `[DO USTALENIA]`.
- 10 języków ma stare `source` R-M6-007 z „2/3” (ze streszczenia AI) i stare `if` R-M7-006: zapisane w D-1220 jako zadanie 09, nie zgłaszam jako znalezisko; po 001 przekład 09 powinien brać nowe brzmienie.

## Co działa dobrze i należy zachować
- Plik odczytów z SHA-256 tekstu i dosłownymi cytatami (`docs/tresci/odczyty/el-2026-11-11.tsv`): 14/14 cytatów odnalazłem dziś bez zmian.
- D-1210 i D-1211 same poprawiają błędne odczytanie źródła (check-raise vs sprawdzenie, streszczenie AI) zamiast dopisywać nowe argumenty.
- Rachunki KO-076 odtwarzalne jednym poleceniem (`python3 -I`), bez kodu generatora — niezależna wyrocznia.
- D-1215 cofnięte z treści zamiast poluzowania testów (zasada 11).

## Decyzje dla właściciela
Brak decyzji produktowych w zakresie. Decyzje merytoryczne (001, 002) rozstrzyga rola 06 według ADR-24; do weta: D-1245 (przyjęcie werdyktu i rekomendacji 001 (a), 002 (a)) w `docs/decyzje/EO.md`.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001,06-tresci-002,06-tresci-004`; 06-tresci-003 → rola 08 (zadanie 08-EL-3), filtry generatora z 001 i 002 → 08-EL-1 i 08-EH-3/08-EL-2.
