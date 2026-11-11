# Recenzja niezależna treści CO (SC-03, SC-11, SC-12, SC-34): Treści i wiedza domenowa, Szkoła Pokera, 2026-11-11
Commit: ad62a2d (= `sesja-co-szablony`, gałąź `sesja-cq-recenzja`), przedmiot `git diff 5637200..ad62a2d` (93 pliki: 48 plików `content/*/scenarios/`, 35 baz treści, 4 testy, dokumenty) · Tryb: audit (rola 06, moduły kontrole-mechaniczne i tresci-krytyczne; sesja CQ, polecenie koordynatora `docs/koordynacja/polecenia/CQ.md` @ 60a6dad) · Środowisko: Linux 6.18, Node 22, pnpm; `pnpm install --frozen-lockfile` kod 0; sieć do źródeł działa (curl, HTTP 200); Python 3 z numpy do rachunku ICM; bez macOS i Xcode (niepotrzebne). `git status --porcelain` na starcie: pusty.

Kolejność pracy: najpierw własna ocena na rachunku, generatorze i źródle (sondy w scratchpadzie), dopiero potem `docs/decyzje/CO.md`. Jedno odstępstwo: wiersz D-795 zobaczyłem w wyniku `grep D-698` (szukałem precedensu D-698), zanim skończyłem ocenę. Dotyczy SC-06, SC-08 i SC-13, czyli szablonów spoza tej recenzji. `docs/tresci/stan-co.md` nie czytałem.

## Podsumowanie
**Werdykt: NIE PRZYJMOWAĆ do wydania w obecnym stanie. SC-03 przyjąć po naprawie 06-tresci-003; SC-11, SC-12, SC-34 wstrzymać.** Rachunek, liczby `{{n:}}` i oceny silnika gry zgadzają się z treścią w każdym z 10 000 losowań na poziom (`pnpm run ci` kod 0). Brzmienie wyjaśnień jest intuicyjne i nie dodaje faktów spoza reguł. Problem leży w modelu losowania: trzy szablony w części wariantów uczą odpowiedzi albo sytuacji, której aplikacja gdzie indziej nie uczy albo której rachunek nie potwierdza. Do tego SC-11, SC-12 i SC-34 trafiły do bazy treści i na listę scenariuszy, choć na ekranie nie da się ich uruchomić. Autor zapisał to w D-797, ale żadna kontrola tego nie wymusza.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | P1 · WYSOKIE | D | SC-11, SC-12 i SC-34 są w bazie treści i na liście scenariuszy, ale ekran nie może ich uruchomić („plan_niepoprawny”); kolejność scalania z D-797 nie jest wymuszona żadną kontrolą | otwarte |
| 06-tresci-002 | P1 · WYSOKIE | M | SC-34 poziom trudny: „pas” wynika z modelu, w którym SB gra zakres all-inu jak o żetony, a BB liczy ICM; przy ICM po obu stronach 50 ze 150 wariantów ma odpowiedź „sprawdzam” | otwarte |
| 06-tresci-003 | P1 · WYSOKIE | M | SC-03: „masz 4 outy” i pas jako jedyna dobra odpowiedź także wtedy, gdy gracz ma kartę wyższą od stołu; z outami na parę (jak D1 aplikacji) pas przestaje być odporny w 33% wariantów poziomu średniego | otwarte |
| 06-tresci-004 | P1 · WYSOKIE | M | SC-11 i SC-12: „Otworzyłeś z Buttona” z ręką, której zakres otwarcia BTN aplikacji nie gra wcale (44–59% wariantów, np. 72o, T3o) | otwarte |
| 06-tresci-005 | P2 · ŚREDNIE | M | SC-11 poziom średni: flopy półpołączone z możliwym OESD (ok. 61%) uczone jak suche („często i mało”, duży zakład = niedokładność), a źródło szczebla 2 podaje dla nich większy rozmiar i rzadszy c-bet | otwarte |
| 06-tresci-006 | P2 · ŚREDNIE | D | Filtr `every(kind === 'draw-call')` w trzech testach treści po cichu pominie przyszły szablon z punktem draw-call obok innego punktu | otwarte |
| 06-tresci-007 | P2 · NISKIE | D | `szablony-co.test.ts`: wyrocznia klasy „air” używa klasyfikatora generatora i nie sprawdza zakresu otwarcia | otwarte |

Liczby według progu: KRYTYCZNE 0, WYSOKIE 4, ŚREDNIE 2, NISKIE 1. Testy odtwarzające dla 4 WYSOKICH: `tools/content-build/test/recenzja-cq-odtworzenie.test.ts` (`it.fails`; ten sam plik z `it` daje 13 czerwonych przypadków, `dowody/cq-ad62a2d-odtworzenie-czerwone.txt`).

Decyzje autora: D-790 (SC-03, 25 bb) **poparta rachunkiem**. Pas jest odporny na implied odds w każdym wariancie, najmniejszy zapas wynosi 0,25 bb przy puli 12 i zakładzie 3. To prawda jednak tylko wtedy, gdy liczą się same outy do strita (06-tresci-003). D-792 (tylko ręce `air`) **poparta** cytatem źródła o parach z asem i słabym kickerem. Wybór rąk pomija jednak zakres otwarcia (06-tresci-004). D-793 (rzadsza akcja „dopuszczalna”, duży zakład „niedokładność”) **poparta kierunkowo** dla flopów niepołączonych. Dla flopów z możliwym OESD źródło mówi co innego (06-tresci-005).

## Weryfikacja twierdzeń
Zakres: całość, czyli 4 szablony pl: 2 sytuacje SC-03, 3 akcje SC-11, 2 SC-12 i 2 SC-34, łącznie 9 wyjaśnień i 4 zdania sytuacji. Do tego ocena silnika i rachunek w wariantach: sondy po 4000 i 10 000 ziaren, próbka ICM ziarna 1–150 na poziom. Treść nie jest krytyczna w rozumieniu modułu (nie dotyczy zdrowia, życia ani prawa; pieniądze tylko w nauce gry). · Hierarchia: z CLAUDE.md (ADR-24; rachunek to szczebel 1) · Skrypty: `pnpm run ci` kod 0 (`docs/tresci/dowody/cq-ci-*.txt`), sonda generatora (`dowody/cq-ad62a2d-sonda-generatora.txt`), overkarty (`dowody/cq-ad62a2d-overkarty.txt`), równowaga ICM (`dowody/cq-ad62a2d-icm-rownowaga.txt`, kod 0, narzędzie zwalidowane na grze o żetony), źródło (`dowody/cq-ad62a2d-zrodlo-gtow-flop-heuristics-ip.txt`, HTTP 200).

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| SC-03 pas | `content/pl/scenarios/sc-03.yaml:24` "{{t:fold|Pasujesz}}, bo do rivera zostaje jedna karta" | 4 outy z 46 kart: ok. 8,7% wobec ceny 16,7–33,3%; pas odporny na implied odds przy 25 bb | rachunek: `content/numbers.yaml:37` (4 z 46), sonda: najmniejszy zapas 0,25 bb | szansa 0,087 < cena; potrzebna wygrana 16,5 bb > 16,25 bb za pulą (pula 12, zakład 3) | CZĘŚCIOWO | "masz 4 outy" z "rzadziej, niż wymaga cena" jest prawdą tylko bez karty wyższej od stołu | dopuścić tylko ręce bez kart wyższych od stołu albo liczyć je jak D1 | 06-tresci-003 |
| SC-03 sprawdzenie | `content/pl/scenarios/sc-03.yaml:26` "Sprawdzenie" | jak wyżej | jak wyżej | jak wyżej | CZĘŚCIOWO | jak wyżej | jak wyżej | 06-tresci-003 |
| SC-11 mały zakład | `content/pl/scenarios/sc-11.yaml:27` "Stawiasz" | R-M5-007: suchy wysoki flop, c-bet często i mało; BB rzadko ma AA, KK, AK | GTO Wizard, Flop Heuristics: IP C-Betting in Cash Games (odczyt 2026-11-11, `dowody/cq-ad62a2d-zrodlo-gtow-flop-heuristics-ip.txt`); zakresy aplikacji: BB wobec BTN 2,5 bb 3-betuje AA, KK, AKs, AKo z częstością 1,0 | "Disconnected boards … This texture sees the frequent use of the 33% sizing" | POPARTE (Ł); CZĘŚCIOWO (Ś) | sytuacja "Otworzyłeś z Buttona" + ręka spoza zakresu daje fałszywy wniosek | Ś: patrz 06-tresci-005; ręce: 06-tresci-004 | 06-tresci-004, 06-tresci-005 |
| SC-11 czekanie | `content/pl/scenarios/sc-11.yaml:29` „jest dopuszczalne, ale rzadsze” | rzadsza akcja ręki mieszanej (ADR-04) | jak wyżej, wiersze 119–124 | „all check back the flop at a significantly higher frequency than the rest of the range” | POPARTE kierunkowo | ok | — | — |
| SC-11 duży zakład | `content/pl/scenarios/sc-11.yaml:31` "to tu niedokładność" | na suchym flopie zwykle mało | jak wyżej | "OESD possible … increased use of the 66% pot bet size, but decreased overall betting frequency" | POPARTE (Ł); CZĘŚCIOWO (Ś) | — | Ś bez flopów z możliwym OESD | 06-tresci-005 |
| SC-12 czekanie | `content/pl/scenarios/sc-12.yaml:27` "Czekasz" | R-M5-004: niski połączony flop trafia zakres BB | `content/pl/rules.yaml:389-397` (źródła odczytane w D-510); dziś otwarty artykuł GTO Wizard, wiersz 206 | "Size down and bet less on flops that complete straights and flushes in your opponent’s range." | POPARTE kierunkowo (częstości dla samych rąk `air` źródło nie podaje) | sytuacja + ręka spoza zakresu: 06-tresci-004 | — | 06-tresci-004 |
| SC-12 mały zakład | `content/pl/scenarios/sc-12.yaml:29` „Mały” | rzadsza akcja dopuszczalna | jak wyżej | jak wyżej | POPARTE kierunkowo | ok | — | — |
| SC-34 pas | `content/pl/scenarios/sc-34.yaml:23` "Pasujesz" | equity wobec zakresu all-inu poniżej progu ICM | rachunek: wyrocznia ICM w `szablony-co.test.ts` (zgodna), równowaga ICM (`dowody/cq-ad62a2d-icm-rownowaga.txt`) | T: 50/150 wariantów przy równowadze ICM daje "call" (np. KJo: equity 0,602 wobec progu 0,585) | POPARTE (Ł); CZĘŚCIOWO (T) | "za mało equity wobec zakresu all-inu" zakłada zakres SB z gry o żetony, czego tekst nie mówi | T: tylko warianty z tą samą odpowiedzią w obu modelach albo nazwane założenie | 06-tresci-002 |
| SC-34 sprawdzenie | `content/pl/scenarios/sc-34.yaml:25` „Sprawdzasz” | equity powyżej progu ICM, próg wyższy niż w żetonach | jak wyżej; test `szablony-co` sprawdza próg > 0,45 w każdym wariancie | Ś: 0/150 rozbieżności | POPARTE | ok | — | — |
| sytuacje | `content/pl/scenarios/sc-34.yaml:7` „Na {{t:bubble|bańce}}” | 3 graczy / 2 płatne i 4 / 3: bańka | rachunek struktur w wariantach (test `szablony-co`: miejsc płatnych = graczy − 1) | — | POPARTE | — | — | — |

## Linia bazowa i założenia
Wymiary pokrycia:
- **Kategorie twierdzeń:** rachunek ceny i implied odds (SC-03), heurystyki c-betu (SC-11, SC-12), próg ICM i equity (SC-34). Wszystkie przejrzane. Wynik: tabela wyżej i znaleziska 002–005.
- **Progi krytyczne:** brak treści o zdrowiu, życiu i prawie. Mienie pojawia się tylko jako żetony i wypłaty w nauce gry. Sprawdzone, nie dotyczy.
- **Brakujące ostrzeżenia i granice stosowania:** wyjaśnienia nie mówią, jaki zakres all-inu przyjmuje SC-34 (06-tresci-002) ani że outy nie liczą par z kart wyższych od stołu (06-tresci-003).
- **Warianty regionalne:** 11 przekładów przejrzałem pobieżnie: en sc-34 i struktura w teście przekładów. Sens en się zgadza. Pełny przegląd zostaje dla roli 09 (zh-Hant „卡順”, D-796).
- **Aktualność źródeł:** artykuł GTO Wizard otwarty 2026-11-11. Rachunek nie zależy od daty.
- **Trudna pamięć:** nie dotyczy.
- **Pary zdań:** sytuacja z wylosowaną ręką daje dwa fałszywe wnioski (06-tresci-004, 06-tresci-003). Same pary zdań w wyjaśnieniach nie dają niepotwierdzonego wniosku.
- **Jedno źródło albo niskie szczeble:** SC-11 i SC-12 stoją na szczeblu 2 (jedno źródło solvera) i 4. SC-03 i SC-34 stoją na rachunku.

Soczewki: laik biorący zdanie dosłownie (odczytuje „otworzyłeś z Buttona” z 72o jako normalne otwarcie: 004), ekspert szukający szkodliwych uproszczeń (002, 003, 005), sceptyczny weryfikator (źródło otwarte sam, sondy na 4000–10 000 ziaren), osoba z innego kraju (przekłady pobieżnie). Subagentów nie używałem. Soczewki przeszedłem po kolei.

Wzorzec najlepszych: ćwiczenie scenariusza powinno pokazać rękę, którą gracz realnie ma w tej linii (zakres solvera dla akcji przed flopem). Odpowiedź ma się zgadzać z rachunkiem przy założeniach, które aplikacja nazywa (np. zakres rywala). Solvery ICM liczą równowagę po obu stronach. Model, w którym jedna strona liczy ICM, a druga nie, to uproszczenie, które trzeba nazwać.

Proponowana zmiana w rejestrze założeń: brak; projekt nie ma `docs/zalozenia.md` dla tej pracy.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/pl/scenarios/sc-03.yaml`, `sc-11.yaml`, `sc-12.yaml`, `sc-34.yaml` (całe) | tak | odczyt + sondy `dowody/cq-ad62a2d-sonda-generatora.txt` |
| przekłady 11 języków | pobieżnie (en sc-34; struktura testem przekładów w CI) | `docs/tresci/dowody/cq-ci-*.txt` |
| `tools/content-build/test/szablony-co.test.ts` (wyrocznie) | tak | odczyt; 06-tresci-007 |
| zawężenie BS/BU/BV (`szablony-bs`, `stos-zakladu-bu`, `bv-gotowa-reka`) | tak | odczyt diffu; 06-tresci-006 |
| generator (`packages/poker-core/src/scenario-gen.ts:325-486`) | tak, ścieżki cbet-case, icm-call, draw-call | odczyt |
| ekran scenariusza (`apps/mobile/src/features/scenariusz/`) | częściowo: start wariantu i graf decyzji | odczyt, test odtwarzający 001 |
| baza treści pl (`tresc-16edcf0a41-pl.db`, tabela `scenarios`) | tak: sc-01, 02, 03, 11, 12, 19, 34 | sqlite3 (`dowody/cq-ad62a2d-odtworzenie-czerwone.txt` pośrednio) |
| rejestr na Drive (dokumenty 12, 13) | nie: sesja bez użycia Drive | — |
| szkice SC-04…SC-33 poza 4 szablonami | nie: poza zakresem | — |

## Kontrola dowodów i sekretów
Wynik `node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-co-ad62a2d.md . docs/tresci/recenzje --rola 06-tresci` (kopia skryptu z promptu roli w scratchpadzie): „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 06-tresci”, kod 0.

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| TRE-01 | dotyczy (wyjaśnienia ze znacznikami reguł) | ok: każda akcja ma regułę `rule` w rejestrze treści (`content/pl/rules.yaml`) |
| TRE-02 | dotyczy | 06-tresci-005 (CZĘŚCIOWO); reszta POPARTE |
| TRE-03 | dotyczy | 06-tresci-005 |
| TRE-04 | dotyczy | ok: szczebel 1–2, atrybucje w `source` reguł |
| TRE-05 | dotyczy | ok dla D-790, D-792, D-793; D-794 patrz 06-tresci-002 |
| TRE-06 | dotyczy | ok: liczby tylko przez `{{n:}}` (outs.gutshot, odds.gutshot.turn-river, cbet.size.small), brak liczb wpisanych w pl |
| TRE-07 | dotyczy | 06-tresci-002, 06-tresci-003 |
| TRE-08 | dotyczy | 06-tresci-004 |
| TRE-09 | nie dotyczy: brak faktów zmiennych w czasie | — |
| TRE-10 | nie dotyczy: brak treści krytycznej (moduł tresci-krytyczne wybrany przez koordynatora, ale te szablony go nie wyzwalają) | — |
| TRE-11 | nie dotyczy: brak historii i miejsc | — |
| TRE-12 | nie dotyczy: brak treści zależnej od lokalizacji | — |
| TRE-13 | dotyczy: wersja w bazie = wersja pl z repo | ok: baza `tresc-16edcf0a41-pl.db` zawiera sc-03, 11, 12, 34; obecność na ekranie: 06-tresci-001 |
| TRE-14 | dotyczy | ok: własne słowa, brak cytatów cudzego tekstu w treści |

## Znaleziska (szczegóły)

### 06-tresci-001 · SC-11, SC-12 i SC-34 są na liście scenariuszy, ale nie dają się uruchomić
- Pozycja listy kontrolnej: TRE-13 (wersja w produkcie); obszar kodu należy do roli 08 (raportu 08 z tego commitu brak, zgłaszam sam)
- Poziom: P1 (WYSOKIE: funkcja nie do użycia, jeśli gałąź wejdzie do wydania przed pracą na ekranie)
- Realność: realny na tej gałęzi (bazy treści już zawierają szablony) · Pewność: wysoka
- Rodzaj: D
- Dowód: `apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:88` "wybierzWariant(generator, w.poziom, w.ziarno, { historia: h, sesja: w.sesja })" (bez `kontekst`), a generator rzuca błąd bez kontekstu dla cbet-case i icm-call (`packages/poker-core/src/scenario-gen.ts:371` i `:432`); błąd kończy start powodem "plan_niepoprawny". Test odtwarzający: 7 przypadków czerwonych ("sc-11: punkt cbet-case wymaga przypadków c-betu (GeneratorContext.cbetCases)", "sc-34: punkt icm-call wymaga macierzy equity"), `dowody/cq-ad62a2d-odtworzenie-czerwone.txt`.
- Mechanizm: budowanie blokuje tylko range-spot (`tools/content-build/src/scenariusze.ts:199` „range-spot nie jest jeszcze obsługiwany na ekranie scenariusza”), a cbet-case i icm-call przepuszcza. D-797 zapisuje kolejność scalania, ale to linia w dokumencie, nie kontrola (zasada 21). Dodatkowo graf ekranu (`apps/mobile/src/features/scenariusz/wariant.ts:31-36`) ma tylko akcje fold/call i buduje się z `v.decisions`, czyli z samych punktów draw-call.
- Powraca: tak, ten sam mechanizm co D-755 dla range-spot; trwała kontrola = `checkScenarioNaEkran` także dla cbet-case i icm-call, dopóki ekran ich nie obsłuży
- Wzorzec lub źródło: zasada 21 (kontrola wymuszona testem, nie zapisem)
- Kroki w aplikacji: Dziś → Scenariusze → M5 „Otworzyłeś z Buttona…” albo M11 „Na bańce…” → błąd startu
- Opcje: (a) rozszerzyć `checkScenarioNaEkran` na cbet-case i icm-call, a SC-11, SC-12 i SC-34 wrócą do bazy razem z pracą CN/08 (szablony zostają w `content/`, budowanie je odrzuca, więc trzeba je przenieść do szkiców). Kompromis: treść czeka na kod. (b) zostawić je w treści i scalić CO dopiero po CN, pilnując tylko kolejności. Kompromis: zero pracy, ale nic tego nie wymusza. Rekomendacja: (a), bo kontrola chroni też przed przyszłymi punktami bez ekranu.
- Test akceptacyjny: `recenzja-cq-odtworzenie.test.ts` 06-tresci-001 przechodzi jako zwykłe `it` (ekran z kontekstem) albo budowanie odrzuca szablon bez obsługi na ekranie
- Status: otwarte

### 06-tresci-002 · SC-34 poziom trudny: odpowiedź „pas” zależy od nienazwanego założenia o zakresie SB
- Pozycja listy kontrolnej: TRE-07
- Poziom: P1 (WYSOKIE: błędna odpowiedź merytoryczna w 1/3 wariantów poziomu)
- Realność: realny · Pewność: wysoka dla rachunku; model równowagi to szczebel 1 (rachunek), a kierunek („na bańce sprawdzenia zaciskają się bardziej niż all-iny”) zgadza się z R-M11-010
- Rodzaj: M
- Dowód: `dowody/cq-ad62a2d-icm-rownowaga.txt`: przy zakresie all-inu SB z równowagi ICM (fictitious play, 800 iteracji; walidacja bez ICM odtwarza push 58,3% i call 37,4% jak `pushfold.json`) w 50 ze 150 wariantów poziomu trudnego poprawne jest „sprawdzam”, np. KJo przy stackach 2500/2500/2000/3000 i wypłatach 50/30/20: equity 0,602 wobec progu 0,585. SB pushuje wtedy 77–100% rąk, bo BB sprawdza ciaśniej. Poziomy łatwy i średni: 0 rozbieżności na 150.
- Mechanizm: `packages/poker-core/src/scenario-gen.ts:379` „const handEquity = equityVsRange(ctx.equity169, handClass, shove.freqs)” liczy equity wobec zakresu `push.sb-10` (HU, gra o żetony), a próg wobec ICM; `grep -rn "push.sb-" content/pl/scenarios` → 1 trafienie (sc-34)
- Powraca: nie
- Wzorzec lub źródło: R-M11-010 `content/pl/rules.yaml:1150-1153` („Big stacks can threaten smaller stacks…”; ICM zaciska sprawdzenia); rachunek
- Kroki w aplikacji: Scenariusze → M11 → poziom trudny → ręka typu KJo, A8o → aplikacja ocenia „sprawdzam” jako błąd
- Opcje: (a) poziom trudny tylko z wariantów, w których odpowiedź jest ta sama przy zakresie z gry o żetony i przy zakresie z równowagi ICM (filtr w generatorze, rola 08). Kompromis: mniej wariantów i koszt obliczeń przy budowaniu. (b) nazwać założenie w wyjaśnieniu („jeśli SB pushuje jak w grze o żetony”). Kompromis: tekst prawdziwy, ale poziom uczy odpowiedzi na nierealny zakres. (c) usunąć poziom trudny do czasu (a). Rekomendacja: (c) teraz i (a) jako zadanie 08.
- Test akceptacyjny: `recenzja-cq-odtworzenie.test.ts` 06-tresci-002 (ziarna 1–12) przechodzi jako `it`
- Status: otwarte

### 06-tresci-003 · SC-03 uczy pasu „4 outami” także z kartą wyższą od stołu
- Pozycja listy kontrolnej: TRE-07
- Poziom: P1 (WYSOKIE: odpowiedź podana jako jedyna dobra, choć przy kartach wyższych od stołu nie jest odporna)
- Realność: realny (33% wariantów obu poziomów ma kartę wyższą od stołu) · Pewność: wysoka dla dwóch kart wyższych, średnia dla jednej
- Rodzaj: M
- Dowód: `dowody/cq-ad62a2d-overkarty.txt`: SC-03 średni, 10 000 ziaren: 564 warianty z dwiema kartami wyższymi, gdzie 10 outów (21,7%) przekracza cenę 16,7–18,2% wprost; 2692 z jedną kartą wyższą, gdzie 7 outów daje pas nieodporny na implied odds. Przykład: pula 16, zakład 4, 7 outów, szansa 0,152, cena 0,167, potrzebna wygrana 1,7 bb przy 16,75 bb za pulą. Aplikacja sama liczy parę z wyższej karty jako out: `content/numbers.yaml:49` („9 kart do koloru + 3 asy (dokument 12, D1)”). W M6 zadanie z gutshotem i królem wyższym od stołu wobec małego zakładu ocenia pas jako „Za ciasno: {{t:draw}} plus wysoka karta to wystarczająco dużo wobec małego c-betu” (`content/pl/lessons/m6-l2-sprawdzenie.md:75`).
- Mechanizm: generator i test BS liczą tylko outy drawa (`analyseOutsSpot`); `grep -n "overcard" packages/poker-core/src/scenario-gen.ts` → 0 trafień. Ten sam mechanizm jest w sc-02 (Ś: 2934 z 10 000 wariantów pasu z kartą wyższą nie jest odpornych) i sc-19 (Ś: 2185), czyli w szablonach sprzed CO
- Powraca: nie (dotąd niezgłoszone)
- Wzorzec lub źródło: D1 (`content/numbers.yaml:48`), zadanie `m6.l2.q-gutshot-overcard`
- Kroki w aplikacji: Scenariusze → M2 „Przy krótkich stosach…” → poziom średni → np. QJ na stole 9-8-x-x, zakład ćwierć puli → „sprawdzam” oceniane jako błąd
- Opcje: (a) nowy warunek odrzucenia w generatorze („gracz bez kart wyższych od stołu”) dla poziomów z oczekiwanym pasem. Kompromis: zmiana kodu 08, ręce czytelniejsze dla ucznia. (b) liczyć pary z kart wyższych jako outy niepewne (połowa) w rachunku szablonu. Kompromis: nowa reguła wymaga źródła. Rekomendacja: (a), także dla sc-02 i sc-19.
- Test akceptacyjny: `recenzja-cq-odtworzenie.test.ts` 06-tresci-003 przechodzi jako `it`; ten sam test rozszerzony na sc-02 i sc-19
- Status: otwarte

### 06-tresci-004 · SC-11 i SC-12 pokazują otwarcie z Buttona ręką, której aplikacja nie otwiera
- Pozycja listy kontrolnej: TRE-08
- Poziom: P1 (WYSOKIE: w większości wariantów fałszywy wniosek o otwarciu, sprzeczny z M3)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: `dowody/cq-ad62a2d-sonda-generatora.txt`: ręka gracza ma częstość otwarcia 0 w `content/ranges/preflop-6max-100bb.json` (BTN po pasach) w 2346 z 4000 wariantów (SC-11 Ł), 2378 z 4000 (SC-11 Ś), 1777 z 4000 (SC-12 Ł) i 1845 z 4000 (SC-12 Ś). Przykłady z testu: „1: T3o”, „3: 72o”, „3: 32o”. Sytuacja `content/pl/scenarios/sc-11.yaml:7` zaczyna się od „{{t:open|Otworzyłeś}} z Buttona”.
- Mechanizm: dla punktów bez range-spot generator rozdaje karty losowo (`packages/poker-core/src/scenario-gen.ts:350-354`), a filtr `holding: [air]` nie ogranicza zakresu. Ten sam mechanizm autor uznał za blokujący dla SC-06 i SC-08 (D-795, D-698), ale nie zastosował go do SC-11 i SC-12.
- Powraca: tak (D-698) → trwała kontrola: test zakresu otwarcia w `szablony-co.test.ts`
- Wzorzec lub źródło: zakres BTN aplikacji (solver, szczebel 2, `content/ranges/preflop-6max-100bb.json`)
- Kroki w aplikacji: Scenariusze → M5 → „Otworzyłeś z Buttona…” → ręka np. 72o
- Opcje: (a) filtr rąk z zakresu otwarcia w generatorze (losowanie klasy z wagą częstości otwarcia; zadanie 08, jak planowany filtr size-spot z D-795). Kompromis: kod. (b) zostawić losowe ręce i dopisać w sytuacji „(ręka z dowolnego zakresu)”. Kompromis: uczy nierealnej linii. Rekomendacja: (a).
- Test akceptacyjny: `recenzja-cq-odtworzenie.test.ts` 06-tresci-004 (4 przypadki) przechodzi jako `it`
- Status: otwarte

### 06-tresci-005 · SC-11 średni uczy strategii suchego flopu na flopach z możliwym OESD
- Pozycja listy kontrolnej: TRE-03
- Poziom: P2 (ŚREDNIE)
- Realność: realny (ok. 61% kombinacji rang wysokich flopów półpołączonych pozwala na OESD: 84 z 138, rachunek w scratchpadzie opisany w dowodzie źródła) · Pewność: średnia (źródło nie podaje częstości dla samych rąk `air`)
- Rodzaj: M
- Dowód: `content/pl/scenarios/sc-11.yaml:18` ("ranks: [semi-connected]") i `content/pl/scenarios/sc-11.yaml:31` ("Duży {{t:bet}} to tu niedokładność"); źródło: `dowody/cq-ad62a2d-zrodlo-gtow-flop-heuristics-ip.txt`: "This board texture sees the increased use of the 66% pot bet size, but decreased overall betting frequency due to our newfound polarity." (OESD possible). Przypadek zadania `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:20` obejmuje te flopy już przed CO; R-M5-008 (D-154) uczy dla K-J-7 dwukolorowego "rzadziej, większym", a SC-11 Ś losuje K-J-7 w trzech kolorach z oceną "mało, często".
- Mechanizm: definicja „semi-connected” aplikacji obejmuje gutshot i OESD (`packages/poker-core/src/texture.ts:120-130`); klasy źródła rozdzielają "Disconnected" i "OESD possible"
- Powraca: nie
- Wzorzec lub źródło: GTO Wizard, Flop Heuristics: IP C-Betting in Cash Games, odczyt 2026-11-11
- Kroki w aplikacji: Scenariusze → M5 „Otworzyłeś z Buttona…” → średni → np. K-J-4 w trzech kolorach → duży zakład oceniony jako niedokładność
- Opcje: (a) Ś na flopach półpołączonych bez możliwego OESD (np. A-K-x, K-9-x), co wymaga filtra w kodzie. (b) Ś na flopie niepołączonym dwukolorowym, jeśli przypadek R-M5-007 go obejmie (dziś nie obejmuje). Rekomendacja: (a) jako zadanie 08 z tym samym podziałem w przypadku zadania m5.l3 (decyzja merytoryczna 06).
- Test akceptacyjny: w wariantach SC-11 Ś żaden flop nie pozwala na OESD (wyrocznia z rang)
- Status: otwarte

### 06-tresci-006 · Zawężenie testów BS, BU i BV może po cichu pominąć przyszłe szablony z draw-call
- Pozycja listy kontrolnej: spoza listy TRE (obszar 07, wyrocznia testu); zgłaszam sam
- Poziom: P2 (ŚREDNIE)
- Realność: brzegowy (dziś żaden szablon nie łączy draw-call z innym punktem) · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/szablony-bs.test.ts:15`, `tools/content-build/test/stos-zakladu-bu.test.ts:11`, `tools/content-build/test/bv-gotowa-reka.test.ts:13`: „.filter((x) => x.template.decisions.every((d) => d.kind === 'draw-call'))”. Szablon range-spot + draw-call (np. szkice SC-04 i SC-05 po D-755) wypadnie z kontroli D-630, ŚR-203 i 06-tresci-201 bez czerwonego testu. Dla dzisiejszej treści osłabienia nie ma: SC-11, SC-12 i SC-34 nie mają punktów draw-call.
- Mechanizm: 3 trafienia (wyżej)
- Powraca: nie
- Wzorzec lub źródło: zasada wspólna 11 (nie dopasowywać testów)
- Kroki w aplikacji: brak (kontrola jakości)
- Opcje: (a) filtr `some(draw-call)` i asercje tylko dla punktów draw-call (indeksy punktów). (b) asercja, że każdy szablon pl trafia do co najmniej jednego testu zgodności. Rekomendacja: (a) i (b).
- Test akceptacyjny: fixture z range-spot + draw-call jest sprawdzany przez test D-630
- Status: otwarte

### 06-tresci-007 · Wyrocznia „air” w `szablony-co` nie jest niezależna i nie sprawdza zakresu
- Pozycja listy kontrolnej: spoza listy TRE (obszar 07); zgłaszam sam
- Poziom: P2 (NISKIE)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D
- Dowód: `tools/content-build/test/szablony-co.test.ts:82` „classifyHolding(v.hero, flop).cls !== 'air'”, czyli ten sam klasyfikator co generator. Pary sprawdza niezależnie `maPare`, drawów nie sprawdza nic. Brak kontroli zakresu otwarcia przepuścił 06-tresci-004.
- Mechanizm: 1 trafienie
- Powraca: nie
- Wzorzec lub źródło: polecenie CQ pkt 3 („wyrocznie niezależne od generatora”)
- Kroki w aplikacji: brak
- Opcje: (a) wyrocznia drawu z rang (4 karty do strita lub koloru), (b) zostawić. Rekomendacja: (a) przy naprawie 004.
- Test akceptacyjny: wyrocznia „bez drawa” liczona bez `classifyHolding`
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- SC-34 `because` R-M11-009 („przegrana kosztuje więcej pieniędzy, niż wygrana dodaje”): wobec stanu po pasie (blind BB już stracony) zdanie nie zachodzi w 725 z 4000 wariantów Ś i 202 z 4000 Ł (próg ICM < 0,5; `dowody/cq-ad62a2d-sonda-generatora.txt`, „req>0.5=false”). Przy odczytaniu „wygrana i przegrana tej samej stawki od stanu przed rozdaniem” zachodzi zawsze. Brakuje decyzji, który odczyt przyjmuje lekcja M11. Krok: rola 06 przy D-794.
- SC-12: czy dla samych rąk `air` na niskim połączonym flopie solver częściej czeka. Źródło mówi to tylko o całym zakresie. Krok: odczyt raportu tekstur solvera, ten sam co dla SC-13 (D-795).
- SC-11 i SC-12: ręka rywala jest losowa (ok. 47% poza zakresem obrony BB, `dowody/cq-ad62a2d-sonda-generatora.txt`). Jeśli ekran po pracy CN pokaże karty rywala, wyjaśnienie „ma ich mało” może kłócić się z pokazanym AA. Nie sprawdzono, bo ekran dziś nie obsługuje cbet-case.
- zh-Hant: forma „卡順” dla gutshota (D-796). Krok: rola 09.

## Co działa dobrze i należy zachować
- Liczby wyłącznie przez `{{n:}}` (outs.gutshot, odds.gutshot.turn-river, cbet.size.small), brak liczb wpisanych w tekst pl.
- SC-03: wybór 25 bb (D-790) wynika z warunku D-630. Rachunek ma najmniejszy zapas 0,25 bb i sprawdzam go niezależnie tym samym wzorem co R-M7-008.
- Test `szablony-co`: niezależny ICM Malmutha-Harville'a i prawdziwe rozdanie w silniku gry. Sprawdza też oceny akcji, które wyjaśnienia nazywają wprost („dopuszczalne”, „niedokładność”).
- D-797: autor sam nazwał zależność od ekranu (brakuje tylko kontroli, 06-tresci-001).
- Wyjaśnienia „dlaczego” mówią na intuicję, bez żargonu spoza słownika (`{{t:}}`), i biorą powód z `because` reguły (D-565).

## Decyzje dla właściciela
Brak decyzji merytorycznych dla właściciela: zgodnie z ADR-24 rozstrzygam je sam (`docs/decyzje/CQ.md`, D-810–D-814). Produktowa: przy 06-tresci-002 rekomenduję tymczasowo usunąć poziom trudny SC-34 (opcja c), co zmienia zakres scenariusza. Przy 06-tresci-001 rekomenduję wstrzymać SC-11, SC-12 i SC-34 w szkicach do pracy CN/08 (opcja a). Obie decyzje należą do koordynatora albo właściciela; obie mogą zostać zawetowane.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001,06-tresci-002,06-tresci-003,06-tresci-004,06-tresci-005` (filtry generatora 003, 004, 005 i kontekst ekranu 001: rola 08; testy 006, 007: rola 07)

Wynik `sprawdz-raport` (ostatni przebieg): „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 06-tresci”, kod 0

`git status --porcelain` na końcu (przed commitem): `?? docs/decyzje/CQ.md; ?? docs/tresci/recenzje/dowody/cq-ad62a2d-icm-rownowaga.txt; ?? docs/tresci/recenzje/dowody/cq-ad62a2d-icm_nash.py.txt; ?? docs/tresci/recenzje/dowody/cq-ad62a2d-odtworzenie-czerwone.txt; ?? docs/tresci/recenzje/dowody/cq-ad62a2d-overkarty.txt; ?? docs/tresci/recenzje/dowody/cq-ad62a2d-sonda-generatora.txt; ?? docs/tresci/recenzje/dowody/cq-ad62a2d-zrodlo-gtow-flop-heuristics-ip.txt; ?? docs/tresci/recenzje/recenzja-co-ad62a2d.md; ?? tools/content-build/test/recenzja-cq-odtworzenie.test.ts` (tylko pliki tej recenzji; treści i kodu aplikacji nie zmieniałem)
