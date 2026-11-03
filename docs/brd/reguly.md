# Reguły dziedzinowe: Szkoła Pokera
Stan: E2 (2026-11-03) · Rola 01 build · Źródła: `zrodla.md` · Errata: `errata.md`

Zakres: RD to tylko to, co aplikacja **liczy, ocenia albo wyzwala** (`packages/poker-core`, `packages/srs`, `content/helplines.yaml`). 142 reguły treści z `content/pl/rules.yaml` (39 math, 17 gto, 72 heuristic, 5 exploit, 9 rules; 21 z polem `check` używanym przez silnik oceny) to twierdzenia, których aplikacja uczy. Trafiają do rejestru twierdzeń roli 06, nie do RD; ich źródła i poziomy pewności są w samym pliku (hierarchia ADR-24).

Wektory policzono niezależnie od kodu: skrypt w Pythonie na ułamkach dokładnych, bez importu `poker-core`; RD-10 przez wyliczenie wszystkich 2 598 960 układów pięciokartowych (scratchpad roli 01, `wektory.py`, 2026-11-03). Zgodność kodu sprawdzono osobno (`zgodnosc.ts` przez `tsx`, 2026-11-03): 9 funkcji zgodnych, 2 bez kontroli wejścia (RYZ-03). Kwoty w żetonach albo bb, wszystkie w tej samej jednostce; P to pula **przed** zakładem rywala, B to zakład rywala.

### RD-01: Wymagane equity do sprawdzenia (pot odds)
- Wzór: `e = B / (P + 2·B)`
- Jednostki: P [żetony], B [żetony], e [-] (ułamek 0–1)
- Granica: P > 0 i B > 0 (ostra); B ≤ 0 albo P ≤ 0 to błędne dane
- Podstawa: rachunek (sprawdzasz B, żeby wygrać pulę P + B + B)
- Krytyczna: nie
- Kod: `packages/poker-core/src/math.ts:7` (`requiredEquity`)

| ID | P [żetony] | B [żetony] | Oczekiwane: e [-] | Tolerancja | Rodzaj | Pochodzenie |
|---|---|---|---|---|---|---|
| RD-01-W1 | 100 | 50 | 0,25 | 0,0001 | typowy | rachunek: 50 / 200 |
| RD-01-W2 | 100 | 100 | 0,3333 | 0,0001 | typowy | rachunek: 100 / 300 |
| RD-01-W3 | 100 | 1 | 0,0098 | 0,0001 | powyżej | rachunek: 1 / 102 |
| RD-01-W4 | 100 | 0 | błąd danych | — | granica | rachunek: B > 0 ostra |
| RD-01-W5 | 100 | -10 | błąd danych | — | poniżej | rachunek: poza granicą |
| RD-01-W6 | brak | 50 | błąd danych | — | błąd | rachunek: brak puli |

### RD-02: Minimalna częstość obrony (MDF)
- Wzór: `MDF = P / (P + B)`
- Jednostki: P [żetony], B [żetony], MDF [-]
- Granica: P > 0 i B > 0 (ostra)
- Podstawa: rachunek (blef rywala z zerowym equity jest na zero przy obronie P/(P+B))
- Krytyczna: nie
- Uproszczenie: blef ma zerowe equity (komentarz w kodzie `math.ts:18`); treść ma to nazywać.
- Kod: `math.ts:19` (`mdf`)

| ID | P [żetony] | B [żetony] | Oczekiwane: MDF [-] | Tolerancja | Rodzaj | Pochodzenie |
|---|---|---|---|---|---|---|
| RD-02-W1 | 100 | 50 | 0,6667 | 0,0001 | typowy | rachunek: 100 / 150 |
| RD-02-W2 | 100 | 100 | 0,5 | 0,0001 | typowy | rachunek: 100 / 200 |
| RD-02-W3 | 100 | 1 | 0,9901 | 0,0001 | powyżej | rachunek: 100 / 101 |
| RD-02-W4 | 100 | 0 | błąd danych | — | granica | rachunek: B > 0 ostra |
| RD-02-W5 | 100 | -1 | błąd danych | — | poniżej | rachunek: poza granicą |
| RD-02-W6 | 100 | brak | błąd danych | — | błąd | rachunek: brak zakładu |

### RD-03: Alpha (jak często blef musi zadziałać)
- Wzór: `α = B / (P + B)`
- Jednostki: P [żetony], B [żetony], α [-]
- Granica: P > 0 i B > 0 (ostra)
- Podstawa: rachunek (ryzykujesz B, żeby wygrać P); α = 1 − MDF (RD-02)
- Krytyczna: nie
- Kod: `math.ts:25` (`alpha`)

| ID | P [żetony] | B [żetony] | Oczekiwane: α [-] | Tolerancja | Rodzaj | Pochodzenie |
|---|---|---|---|---|---|---|
| RD-03-W1 | 100 | 50 | 0,3333 | 0,0001 | typowy | rachunek: 50 / 150 |
| RD-03-W2 | 100 | 100 | 0,5 | 0,0001 | typowy | rachunek: 100 / 200 |
| RD-03-W3 | 100 | 1 | 0,0099 | 0,0001 | powyżej | rachunek: 1 / 101 |
| RD-03-W4 | 100 | 0 | błąd danych | — | granica | rachunek: B > 0 ostra |
| RD-03-W5 | -100 | 50 | błąd danych | — | poniżej | rachunek: P > 0 ostra |
| RD-03-W6 | 100 | brak | błąd danych | — | błąd | rachunek: brak zakładu |

### RD-04: Dokładna szansa trafienia co najmniej jednego outu
- Wzór: k = 1: `p = o / n`; k = 2: `p = 1 − ((n − o) / n) · ((n − 1 − o) / (n − 1))`
- Jednostki: o [karty], n [karty] (niewidziane), k [karty] (do odkrycia, 1 albo 2), p [-]
- Granica: 0 ≤ o ≤ n (włączna); o < 0, o > n albo k ∉ {1, 2} to błędne dane
- Podstawa: rachunek (losowanie bez zwracania)
- Krytyczna: nie
- Kod: `math.ts:36` (`hitProbability`); klucze `odds.*` w `content/numbers.yaml`

| ID | o [karty] | n [karty] | k [karty] | Oczekiwane: p [-] | Tolerancja | Rodzaj | Pochodzenie |
|---|---|---|---|---|---|---|---|
| RD-04-W1 | 9 | 47 | 2 | 0,3497 | 0,0001 | typowy | rachunek: 378/1081 (kolor flop–river) |
| RD-04-W2 | 9 | 46 | 1 | 0,1957 | 0,0001 | typowy | rachunek: 9/46 (kolor turn–river) |
| RD-04-W3 | 8 | 47 | 2 | 0,3145 | 0,0001 | typowy | rachunek: 340/1081 (strit otwarty) |
| RD-04-W4 | 0 | 47 | 2 | 0 | 0 | granica | rachunek |
| RD-04-W5 | 47 | 47 | 2 | 1 | 0 | granica | rachunek |
| RD-04-W6 | 1 | 47 | 2 | 0,0426 | 0,0001 | powyżej | rachunek: 2/47 |
| RD-04-W7 | -1 | 47 | 2 | błąd danych | — | poniżej | rachunek: o ≥ 0 |
| RD-04-W8 | 48 | 47 | 2 | błąd danych | — | błąd | rachunek: o ≤ n |

### RD-05: Reguła 2 i 4 (przybliżenie)
- Wzór: `p ≈ 4·o %` przy k = 2, `p ≈ 2·o %` przy k = 1
- Jednostki: o [karty], k [karty], p [%]
- Granica: o ≥ 0 (włączna)
- Podstawa: rachunek; przybliżenie RD-04
- Krytyczna: nie
- Uproszczenie: przy k = 2 zawyża dla dużej liczby outów (15 outów: 60% wobec 54,12% dokładnie, różnica 5,88 pkt proc.); treść ma porównywać z RD-04 i nazywać przybliżenie.
- Kod: `math.ts:65` (`ruleOf2And4`) — brak kontroli o < 0 (RYZ-03)

| ID | o [karty] | k [karty] | Oczekiwane: p [%] | Tolerancja | Rodzaj | Pochodzenie |
|---|---|---|---|---|---|---|
| RD-05-W1 | 9 | 2 | 36 | 0 | typowy | rachunek: 4 × 9 (dokładnie 34,97) |
| RD-05-W2 | 9 | 1 | 18 | 0 | typowy | rachunek: 2 × 9 (dokładnie 19,57 przy n = 46) |
| RD-05-W3 | 15 | 2 | 60 | 0 | typowy | rachunek: 4 × 15 (dokładnie 54,12) |
| RD-05-W4 | 0 | 2 | 0 | 0 | granica | rachunek |
| RD-05-W5 | 1 | 1 | 2 | 0 | powyżej | rachunek |
| RD-05-W6 | -1 | 2 | błąd danych | — | poniżej | rachunek: o ≥ 0 |

### RD-06: Stosunek stacka do puli (SPR)
- Wzór: `SPR = S / P`
- Jednostki: S [żetony] (efektywny stack), P [żetony], SPR [-]
- Granica: S > 0 i P > 0 (ostra)
- Podstawa: rachunek (definicja ilorazu)
- Krytyczna: nie
- Kod: `math.ts:70` (`spr`)

| ID | S [żetony] | P [żetony] | Oczekiwane: SPR [-] | Tolerancja | Rodzaj | Pochodzenie |
|---|---|---|---|---|---|---|
| RD-06-W1 | 100 | 10 | 10 | 0 | typowy | rachunek |
| RD-06-W2 | 1 | 10 | 0,1 | 0,0001 | powyżej | rachunek |
| RD-06-W3 | 100 | 0 | błąd danych | — | granica | rachunek: P > 0 ostra |
| RD-06-W4 | -5 | 10 | błąd danych | — | poniżej | rachunek: S > 0 ostra |
| RD-06-W5 | brak | 10 | błąd danych | — | błąd | rachunek |

### RD-07: Rozmiar geometryczny zakładu
- Wzór: `f = ((1 + 2·SPR)^(1/u) − 1) / 2` (po u zakładach f·puli i sprawdzeniach cały stack jest w puli)
- Jednostki: SPR [-], u [ulice] (liczba całkowita ≥ 1), f [-] (ułamek puli)
- Granica: SPR ≥ 0 (włączna), u ≥ 1 (włączna)
- Podstawa: rachunek: (1 + 2f)^u = 1 + 2·SPR
- Krytyczna: nie
- Kod: `math.ts:59` (`geometricFraction`), `math.ts:76` (`geometricBetFraction`)

| ID | SPR [-] | u [ulice] | Oczekiwane: f [-] | Tolerancja | Rodzaj | Pochodzenie |
|---|---|---|---|---|---|---|
| RD-07-W1 | 4 | 2 | 1 | 0,0001 | typowy | rachunek: (√9 − 1)/2 |
| RD-07-W2 | 13 | 3 | 1 | 0,0001 | typowy | rachunek: (∛27 − 1)/2 |
| RD-07-W3 | 0 | 2 | 0 | 0 | granica | rachunek |
| RD-07-W4 | 1 | 1 | 1 | 0 | powyżej | rachunek: (3 − 1)/2 |
| RD-07-W5 | 4 | 0 | błąd danych | — | poniżej | rachunek: u ≥ 1 |
| RD-07-W6 | -1 | 2 | błąd danych | — | błąd | rachunek: SPR ≥ 0 |

### RD-08: Wartość oczekiwana sprawdzenia
- Wzór: `EV = e · (P + 2·B) − B`
- Jednostki: e [-] (0–1), P [żetony], B [żetony], EV [żetony]
- Granica: 0 ≤ e ≤ 1 (włączna); EV = 0 dokładnie przy e z RD-01
- Podstawa: rachunek
- Krytyczna: nie
- Kod: `math.ts:83` (`callEv`, argumenty: pula po zakładzie P + B i kwota B) — brak kontroli e ∉ [0, 1] (RYZ-03)

| ID | e [-] | P [żetony] | B [żetony] | Oczekiwane: EV [żetony] | Tolerancja | Rodzaj | Pochodzenie |
|---|---|---|---|---|---|---|---|
| RD-08-W1 | 0,25 | 100 | 50 | 0 | 0,0001 | granica | rachunek: 0,25 × 200 − 50 (zgodne z RD-01-W1) |
| RD-08-W2 | 0,3 | 100 | 50 | 10 | 0,0001 | powyżej | rachunek: 60 − 50 |
| RD-08-W3 | 0,2 | 100 | 50 | -10 | 0,0001 | poniżej | rachunek: 40 − 50 |
| RD-08-W4 | 1,2 | 100 | 50 | błąd danych | — | błąd | rachunek: e ≤ 1 |

### RD-09: Equity turniejowe według ICM (Malmuth–Harville)
- Wzór: P(i na 1. miejscu) = s_i / Σs; P(i na kolejnym | zajęte miejsca) = s_i / (Σs − s zajętych); equity_i = Σ_m P(i na miejscu m) · w_m
- Jednostki: s [żetony], w [% puli nagród], equity [% puli nagród]
- Granica: s ≥ 0 (włączna); liczba wypłat ≤ liczba graczy
- Podstawa: rachunek (model zdefiniowany wzorem; zgodność z literaturą szczebla 3 do potwierdzenia przez rolę 06, OP-09)
- Krytyczna: nie
- Uproszczenie: model nie uwzględnia umiejętności ani pozycji; treść M11 ma to nazywać.
- Kod: `packages/poker-core/src/icm.ts:9` (`icmEquities`)

| ID | s [żetony] | w [%] | Oczekiwane: equity [%] | Tolerancja | Rodzaj | Pochodzenie |
|---|---|---|---|---|---|---|
| RD-09-W1 | 5000; 3000; 2000 | 65; 35 | 44,375; 32,625; 23 | 0,001 | typowy | rachunek (ułamki dokładne) |
| RD-09-W2 | 1; 1; 1 | 65; 35 | 33,3333; 33,3333; 33,3333 | 0,001 | typowy | rachunek: symetria |
| RD-09-W3 | 4000; 3000; 2000; 1000 | 50; 30; 20 | 33,6032; 29,4881; 23,5873; 13,3214 | 0,001 | typowy | rachunek (ułamki dokładne) |
| RD-09-W4 | 6000; 4000; 0 | 65; 35 | 53; 47; 0 | 0,001 | granica | rachunek: stack 0 nie zajmuje płatnego miejsca |
| RD-09-W5 | -1; 3; 2 | 65; 35 | błąd danych | — | poniżej | rachunek: s ≥ 0 |
| RD-09-W6 | 1; 1 | 50; 30; 20 | błąd danych | — | powyżej | rachunek: więcej wypłat niż graczy |

### RD-10: Ranking układów i liczba układów pięciokartowych
- Wzór: kolejność od najrzadszego: poker (w tym królewski) > kareta > full > kolor > strit > trójka > dwie pary > para > wysoka karta; rzadszy układ wygrywa; przy tej samej kategorii kickery (treść R-M0-002)
- Jednostki: liczba układów [układy] z 52 kart
- Granica: brak (kategorie rozłączne; strit A-2-3-4-5 liczony jako strit)
- Podstawa: rachunek (wyliczenie wszystkich C(52,5) = 2 598 960 układów)
- Krytyczna: nie
- Kod: `packages/poker-core/src/evaluate.ts`; zgodność kategorii z liczbami do sprawdzenia testem roli 07 (wektory niżej)

| ID | Kategoria [-] | Oczekiwane: liczba [układy] | Tolerancja | Rodzaj | Pochodzenie |
|---|---|---|---|---|---|
| RD-10-W1 | poker | 40 | 0 | typowy | rachunek: wyliczenie |
| RD-10-W2 | kareta | 624 | 0 | typowy | rachunek: wyliczenie |
| RD-10-W3 | full | 3744 | 0 | typowy | rachunek: wyliczenie |
| RD-10-W4 | kolor | 5108 | 0 | typowy | rachunek: wyliczenie |
| RD-10-W5 | strit | 10200 | 0 | typowy | rachunek: wyliczenie (z A-2-3-4-5) |
| RD-10-W6 | trójka | 54912 | 0 | typowy | rachunek: wyliczenie |
| RD-10-W7 | dwie pary | 123552 | 0 | typowy | rachunek: wyliczenie |
| RD-10-W8 | para | 1098240 | 0 | typowy | rachunek: wyliczenie |
| RD-10-W9 | wysoka karta | 1302540 | 0 | typowy | rachunek: wyliczenie; suma 2 598 960 |

### RD-11: Ocena zagrania z częstości solvera
- Wzór: f = częstość zagrania w rozwiązaniu, f_max = częstość najczęstszego zagrania; f = f_max albo f ≥ L → **zgodne**; M ≤ f < L → **dopuszczalne**; 0 < f < M → **niedokładność**; f = 0 → **błąd**
- Jednostki: f [-], M [-] = 0,035 (S-06), L [-] = 0,25 (parametr produktowy `range.mixed.low`, ADR-26 w rejestrze 03)
- Granica: f = M włączna (dopuszczalne), f = L włączna (zgodne), f = 0 włączna (błąd)
- Podstawa: S-06 (kategorie i próg 3,5%); L to parametr produktowy, uproszczenie dydaktyczne: źródło nazywa każde zagranie z f ≥ M „Correct Move”, aplikacja dzieli je na zgodne i dopuszczalne, a oba dają punkt (`verdictPoints`)
- Krytyczna: nie
- Kod: `packages/poker-core/src/grading.ts:132` (`rangeVerdict`), `apps/mobile/src/features/drills/engine.ts:421` — **dziś 0 < f < M daje „błąd” zamiast „niedokładność”** (ER-01)

| ID | f [-] | f_max [-] | Oczekiwane: ocena [-] | Tolerancja | Rodzaj | Pochodzenie |
|---|---|---|---|---|---|---|
| RD-11-W1 | 0,6 | 0,6 | zgodne | — | typowy | S-06: „Best Move” |
| RD-11-W2 | 0,3 | 0,6 | zgodne | — | typowy | parametr L (ADR-26) |
| RD-11-W3 | 0,25 | 0,715 | zgodne | — | granica | L włączna |
| RD-11-W4 | 0,1 | 0,6 | dopuszczalne | — | typowy | S-06: „Correct Move” |
| RD-11-W5 | 0,035 | 0,715 | dopuszczalne | — | granica | S-06: „less than 3.5%” to niedokładność, więc 3,5% już nie |
| RD-11-W6 | 0,0349 | 0,7151 | niedokładność | — | poniżej | S-06: „Inaccuracy” |
| RD-11-W7 | 0 | 0,7 | błąd | — | granica | S-06: „Wrong Move – Moves that are not taken in GTO” |
| RD-11-W8 | 0,2 | 0,2 | zgodne | — | powyżej | f = f_max zawsze zgodne, także poniżej L |
| RD-11-W9 | -0,1 | 0,6 | błąd danych | — | błąd | rachunek: f ≥ 0 |

### RD-12: Telefon pomocy przy problemie z hazardem według kraju użytkownika
- Wzór: kraj = region urządzenia (nie język aplikacji); wpis z `content/helplines.yaml` dla kraju; brak wpisu → numer alarmowy kraju i odnośnik do listy pomocy (do ustalenia przez rolę 06)
- Jednostki: kraj [ISO 3166-1], numer [-]
- Granica: brak
- Podstawa: [DO USTALENIA] (OP-10) — numery z oficjalnych źródeł każdego kraju w sprzedaży (szczebel 1); dziś plik ma tylko Polskę, a storefrontu PL nie będzie (ER-04)
- Krytyczna: tak (zdrowie użytkownika; przegląd roli 06, przegląd zastępczy D-027)
- Kod: `content/helplines.yaml`, ekran „Pomoc” (`apps/mobile/src/features/help`), ramka w lekcji M12-L4
