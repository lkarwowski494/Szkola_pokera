# Recenzja niezależna pracy BS (szablony scenariuszy SC-01, SC-02, SC-19): Treści i wiedza domenowa, Szkoła Pokera, 2026-11-10
Commit: 866744e (przedmiot `git diff 70fdf40..866744e`) · Tryb: audit (rola 06, sesja BV, polecenie koordynatora `docs/koordynacja/polecenia/BV.md` @ 1564f82) · Środowisko: Linux 6.18, Node 22.23, pnpm 10.28; `pnpm install --frozen-lockfile` kod 0; `pnpm content:build` kod 0 bez zmian w plikach śledzonych; test autora `szablony-bs.test.ts` kod 0 (20/20); `pnpm run ci` nie uruchamiałem w całości (ciężki, recenzja dotyczy treści; dowody CI autora w `docs/tresci/dowody/bs-ci-c2553eb.txt`); ekranu scenariuszy w aplikacji nie ma (`apps/mobile/src/app/scenarios.tsx:14` pokazuje tylko tekst `scenarios.soon`, `apps/mobile/src/i18n/locales/pl.json:52`), więc sprawdzenie na działającej aplikacji niemożliwe.

`docs/tresci/stan-bs.md` i `docs/tresci/bs-e0.md` przeczytałem dopiero po własnym werdykcie (porównanie w polu „Powraca”).

## Podsumowanie
**Werdykt: przyjąć z warunkiem.** Warunek: przed podłączeniem ekranu scenariuszy (i przed wydaniem z nim) naprawić 06-tresci-201 (WYSOKIE). W SC-02 i SC-19 oczekiwana odpowiedź na turnie to „pas”, uzasadniona samym drawem („bo ostatnia karta trafia rzadziej, niż wymaga cena”). Generator dopuszcza jednak warianty, w których gracz ma już gotową rękę z własną kartą: parę, top parę, overparę, dwie pary, trips albo set. Tak jest w 24% wariantów SC-02 i w 44% wariantów SC-19. R-M2-005 dotyczy samego drawa, a silnik ocen z tego powodu wyłącza takie ręce z reguły draw-price. Przy tripsach i secie „pas” jest sprzeczny z rachunkiem nawet przy założeniu szablonu, że rywal prowadzi: 18–19 kart poprawy z 46 to 39–41% wobec ceny 25–33%.

Rachunek pot odds i equity sprawdziłem niezależnym skryptem na 10 000 wariantach każdego poziomu. Outy liczyłem przeglądem talii, cenę jako zakład ÷ (pula + 2 × zakład). Zgodność jest pełna: 0 różnic w outach, 0 w cenie, 0 zmian akcji w poziomie. Wynika z tego, że decyzja nie zmienia się w wariantach poziomu. Pas wobec implied odds (R-M7-008) jest odporny: przy całym pozostałym stosie jako wygranej po trafieniu EV sprawdzenia jest ujemne we wszystkich wariantach draw. Liczby w tekstach idą tylko przez `{{n:…}}` (0 cyfr w 36 plikach) i zgadzają się z „mniej więcej co piątą/szóstą kartę” (D-565). Przekład en zachowuje sens.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-201 | P1 · WYSOKIE | M | SC-02 i SC-19, turn: „pas” oceniony jako poprawny przy gotowej ręce gracza (para…set), choć reguła draw-price jej nie obejmuje; przy tripsach/secie sprzeczny z rachunkiem | otwarte; test czerwony dopisany (5bca448) |
| 06-tresci-202 | P2 · ŚREDNIE | M | SC-01 trudny: „sprawdzenie” przy marginesie < 1 out także przy drawie do koloru bez asa i z jedną kartą gracza w kolorze; R-M7-010 każe liczyć wtedy mniej outów, co odwraca decyzję | otwarte |
| 06-tresci-203 | P2 · ŚREDNIE | D | SC-02 i SC-19, poziom łatwy: zakład rywala na turnie większy niż stos gracza (850 i 3268 z 10 000 wariantów); decyzja i poziom bez zmian, ale kwota zakładu niemożliwa | otwarte |
| 06-tresci-204 | P2 · ŚREDNIE | D | Wyrocznia `szablony-bs.test.ts` liczy outy i cenę tymi samymi funkcjami co generator (`analyseOutsSpot`, `requiredEquity`), więc nie widzi błędu z 06-tresci-201 | otwarte |

Liczby według progu: KRYTYCZNE 0, WYSOKIE 1, ŚREDNIE 3, NISKIE 0.

## Weryfikacja twierdzeń
Zakres: całość twierdzeń w tekstach szablonów pl (3 sytuacje, 12 wyjaśnień) i ich ocen we wszystkich poziomach (10 000 wariantów na poziom, ziarna 1–10 000, ta sama metoda co test autora); en w całości (sens); pozostałe 10 języków tylko kontrola cyfr. Kontrola zastępcza (D-027): ja, sesja bez udziału w pracy BS. Hierarchia: z CLAUDE.md (ADR-24), wszystkie twierdzenia tu są szczebla 1 (rachunek) albo z reguł rejestru. Skrypty: `dowody/bs-866744e-niezalezny-wynik.txt`, `dowody/bs-866744e-set-wynik.txt`, `dowody/bs-866744e-io-wynik.txt`, `dowody/bs-866744e-rio-wynik.txt` (kod 0 każdy; kod skryptów: pliki `bs-866744e-skrypt-{niezalezny,set,io,rio}.ts.txt` w tym samym katalogu).

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło (rachunek, dziś) | Werdykt | Para zdań | Znalezisko |
|---|---|---|---|---|---|---|
| outs.flush | `content/pl/scenarios/sc-01.yaml:24` | 9 outów do koloru | 13 kart w kolorze − 4 widoczne; przegląd talii w 40 000 punktach flop: 0 różnic | POPARTE | ok | — |
| odds.flush.flop-turn | `content/pl/scenarios/sc-01.yaml:24` | ok. 19,1%, „co piątą kartę” | 9/47 = 0,1915; 1/0,1915 = 5,2 → 5 | POPARTE | ok | — |
| odds.flush.turn-river | `content/pl/scenarios/sc-01.yaml:35` | ok. 19,6%, „co piątą” | 9/46 = 0,1957; 5,1 → 5 | POPARTE | ok | — |
| odds.oesd.* | `content/pl/scenarios/sc-02.yaml:23` | 8 outów, 17,0% / 17,4%, „co szóstą” | 8/47 = 0,170 (5,9 → 6); 8/46 = 0,174 (5,75 → 6) | POPARTE | ok | — |
| flop „call” (SC-01, SC-02, SC-19) | `content/pl/scenarios/sc-01.yaml:24` | jedna karta trafia częściej, niż wymaga niska cena | cena = B/(P+2B); 0 wariantów z inną akcją (`dowody/bs-866744e-niezalezny-wynik.txt`) | POPARTE (SC-01 trudny: patrz 202) | ok | 06-tresci-202 |
| turn „call” SC-01 | `content/pl/scenarios/sc-01.yaml:35` | za niską cenę draw nadal trafia wystarczająco często | jw., 0 różnic | POPARTE | ok | 06-tresci-202 |
| turn „fold”, część draw | `content/pl/scenarios/sc-02.yaml:36` | ostatnia karta trafia rzadziej, niż wymaga cena | jw., 0 różnic | POPARTE dla samego drawa | razem z początkiem zdania (pasujesz, bo …) daje wniosek fałszywy przy gotowej ręce | 06-tresci-201 |
| turn „fold”, implied odds | `content/pl/scenarios/sc-19.yaml:36` | za pulą za mało żetonów, by trafienie odrobiło przegrane | EV = p·(P+B+S) − (1−p)·B < 0 we wszystkich 40 000 wariantach (S = cały stos za pulą, wkład preflop realnie i ostrożnie) | POPARTE dla samego drawa | ok | 06-tresci-203 (kwota) |
| ocena „fold” jako poprawna | `content/pl/scenarios/sc-19.yaml:13` | `expected: [call, fold]` dla każdego wariantu | R-M2-005 dotyczy equity; przy gotowej ręce equity ≠ outy ÷ karty | NIEPOPARTE (para, dwie pary), SPRZECZNE (trips/set) | — | 06-tresci-201 |
| D-630 uzasadnienie | `docs/decyzje.md:376` | „sprawdzenie” wymaga tylko rachunku na jedną kartę, bo dalsze karty i implied odds mogą je tylko wzmocnić | prawda przy outach, które zawsze wygrywają; odwrotne implied odds (R-M7-010) mogą je osłabić | CZĘŚCIOWO | — | 06-tresci-202 |
| D-631 | `docs/decyzje.md:377` | przy 40 bb 368–1463 z 3000 wariantów Ś nieodpornych | nie liczyłem | — | — | Do sprawdzenia |

## Linia bazowa i założenia
Wymiary pokrycia:
- Fakty i liczby: wszystkie liczby w szablonach to klucze `{{n:…}}` z rachunkiem; przeliczone od nowa (tabela wyżej).
- Reguły i zalecenia: oceny `expected` według R-M2-005, R-M7-007 i R-M7-008 sprawdzone na wariantach. Znaleziska 201, 202.
- Progi krytyczne dla zdrowia, mienia i prawa: sprawdzone, brak (treść dydaktyczna, nie hazard, CLAUDE.md „Cel”).
- Brakujące ostrzeżenia i granice stosowania: model draw-call zakłada, że gracz bez trafienia przegrywa. Szablony tego nie wymuszają (201) i nie uwzględniają odwrotnych implied odds (202).
- Jednostki i warianty regionalne: jednostka bb i „co N-tą kartę”. Japoński używa liczebników słownych (五枚に一枚), co jest zgodne z D-565 (liczby słowami).
- Aktualność źródeł: rachunek, bez dat odczytu. Sprawdzone, brak.
- Trudna pamięć: sprawdzone, brak.
- Pary zdań: przeczytane wszystkie 12 wyjaśnień pl i en. Para „Pasujesz, bo [draw]” daje fałszywy wniosek przy gotowej ręce (201). W SC-01 zdanie „a nie dlatego, że jeszcze nie masz układu” pada jako ogólna rada przy pasie i nie twierdzi niczego o wariancie (ok).
- Jedno źródło albo niskie szczeble: R-M7-009 (heuristic, 2 serwisy szkoleniowe) występuje tylko w komentarzu SC-19. Tekst wyjaśnienia stoi na R-M7-008 (math). Ok.

Soczewki:
- Laik: przeczyta „pasujesz, bo ostatnia karta trafia rzadziej” przy swoim secie i nauczy się pasować sety.
- Ekspert: zauważy set albo top parę z drawem spasowane przy SPR < 1 (201) i niski kolor sprawdzany przy marginesie poniżej jednego outu (202).
- Sceptyczny weryfikator: wyrocznia testu nie jest niezależna (204); niezależny przegląd talii potwierdził rachunek.
- Inny kraj: przekład en wierny co do sensu, liczb i kierunku decyzji. Terminy en: call/fold/bet/implied odds/SPR.

Wzorzec najlepszych: trener pot odds, który w ćwiczeniu „draw wobec ceny” podaje tylko ręce bez gotowego układu albo liczy equity całej ręki. Projekt już tak robi w silniku ocen (`packages/poker-core/src/grading.ts:430` „gotowa ręka z kartą gracza (para i lepsza): equity to nie same outy, reguła nie pasuje”) i w ćwiczeniach M2 (`generateOuts` losuje rękę i stół pod rodzaj drawa). Szablony scenariuszy są jedynym miejscem, gdzie ta granica nie obowiązuje.

Rejestr założeń: bez zmian.

## Pokrycie
| Obszar / pliki | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/pl/scenarios/sc-01.yaml`, `sc-02.yaml`, `sc-19.yaml` (granice, decyzje, wyjaśnienia) | tak, w całości | czytanie + `dowody/bs-866744e-niezalezny-wynik.txt`, `dowody/bs-866744e-set-wynik.txt`, `dowody/bs-866744e-io-wynik.txt`, `dowody/bs-866744e-rio-wynik.txt` |
| `content/en/scenarios/*` | tak, sens wszystkich 15 tekstów | czytanie |
| pozostałe 10 języków | tylko brak cyfr poza `{{…}}` (0 trafień) i jeden tekst ja | grep (wynik w raporcie) |
| `tools/content-build/test/szablony-bs.test.ts` | tak | czytanie + `dowody/bs-866744e-test-autora.txt` (kod 0) |
| zmiany testów 08 (`build.test.ts`, `liczby-jezyk-08.test.ts`, `szablon-scenariusza-bf.test.ts`) | tak: limit 120 s i fikstura bez prawdziwych szablonów; asercje bez zmian sensu | diff |
| D-630, D-631 | tak (D-631: tylko logika, liczb 40 bb nie przeliczałem) | czytanie, rachunek |
| `docs/tresci/szablony-robocze/README.md` | merytorycznie, pobieżnie (szkice poza treścią) | czytanie |
| terminologia wg tabeli dokumentu 13 (Drive) | nie sprawdzono: dokumentu na Drive nie otwierałem; terminy `{{t:…}}` przechodzą `content:build` | `dowody/bs-866744e-content-build.txt` |
| generator `packages/poker-core/src/scenario-gen.ts` | tak (logika losowania i odrzuceń) | czytanie |
| działająca aplikacja | nie: brak ekranu scenariuszy | — |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-bs-866744e.md . docs/tresci/recenzje --rola 06-tresci` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 06-tresci” (kod 0, ostatni przebieg przed commitem).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| TRE-01 | dotyczy | ok: każde wyjaśnienie wskazuje regułę (`rule:`), liczby z `numbers.yaml` |
| TRE-02 | dotyczy | 06-tresci-201 (ocena „pas” NIEPOPARTE/SPRZECZNE w części wariantów); reszta POPARTE |
| TRE-03 | dotyczy | 06-tresci-201 (zakres R-M2-005: sam draw), 06-tresci-202 (zakres: outy, które wygrywają) |
| TRE-04 | dotyczy | ok: rachunek (szczebel 1); R-M7-009 tylko w komentarzu |
| TRE-05 | dotyczy | ok: D-630 rozstrzyga rekomendację recenzji ŚR-103 rachunkiem; zapis z odrzuconymi opcjami |
| TRE-06 | dotyczy | ok: 0 cyfr poza `{{n:}}`; liczby = rachunek |
| TRE-07 | dotyczy | 06-tresci-202 (uproszczenie „każdy out wygrywa” nienazwane przy marginesie < 1 out) |
| TRE-08 | dotyczy | 06-tresci-201 (para zdań przy gotowej ręce); przekład en ok |
| TRE-09 | nie dotyczy: brak faktów zmiennych | — |
| TRE-10 | nie dotyczy: brak treści krytycznych dla zdrowia/mienia/prawa | — |
| TRE-11 | nie dotyczy: brak trudnej pamięci | — |
| TRE-12 | nie dotyczy: brak treści zależnej od lokalizacji | — |
| TRE-13 | dotyczy częściowo | ok: `content:build` bez zmian w bazie i `tresc.generated.ts` (baza = treść z commitu) |
| TRE-14 | dotyczy | ok: własne słowa, bez cudzych tekstów |

## Znaleziska
### 06-tresci-201 · SC-02 i SC-19: na turnie „pas” jest oceniany jako poprawny także przy gotowej ręce gracza (para…set), choć reguła draw-price jej nie obejmuje
- Pozycja listy kontrolnej: TRE-03
- Poziom: P1 (WYSOKIE: błędna ocena merytoryczna w głównym typie ćwiczenia)
- Realność: realny po podłączeniu ekranu scenariuszy (dziś szablony są w bazie treści, ale nie ma ich ekranu) · Pewność: wysoka
- Rodzaj: M
- Dowód: wyjaśnienie `content/pl/scenarios/sc-19.yaml:36` „bo ostatnia karta trafia rzadziej, niż wymaga cena”; oczekiwana akcja `content/pl/scenarios/sc-19.yaml:13` i `content/pl/scenarios/sc-02.yaml:13` (`expected: [call, fold]`). Generator sprawdza tylko rodzaj drawa (`packages/poker-core/src/scenario-gen.ts:130`, `analyseOutsSpot` odrzuca tylko strit i lepiej). Skrypt niezależny (`dowody/bs-866744e-set-wynik.txt`, 10 000 wariantów): karta gracza poprawia stół (`classifyHolding.improvesBoard`) przy oczekiwanym pasie w SC-02 Ł/Ś 2403, w SC-19 Ł 4353 i Ś 4367. Trips/set: SC-02 63 i 63, SC-19 205 i 188. We wszystkich szanse poprawy (kolor, strit, full, kareta) przewyższają cenę nawet przy założeniu, że rywal prowadzi, np. 19/46 = 41,3% wobec ceny 30,3%. Przykłady (`dowody/bs-866744e-niezalezny-wynik.txt`): SC-02 seed 5: Kh Qd na Ks Ts Jh 7s (top para i OESD), oczekiwany pas wobec 13 bb do puli 20. Test odtwarzający `tools/content-build/test/bv-gotowa-reka.test.ts` jest czerwony: 496/2000, 496/2000, 857/2000 i 880/2000 (`dowody/bs-866744e-201-test-czerwony.txt`, kod 1).
- Mechanizm: wyrocznia oceny w szablonie (draw-price) zakłada, że gracz wygrywa tylko po trafieniu. `grep -rn "improvesBoard" packages/poker-core/src` → silnik ocen (`packages/poker-core/src/grading.ts:431`) wyłącza gotowe ręce. Generator scenariuszy i test BS tego nie robią. Dotyczy wszystkich punktów `fold` w `content/*/scenarios/` (SC-02, SC-19 × 12 języków). Punkty `call` są wolne od błędu, bo gotowa ręka tylko wzmacnia sprawdzenie.
- Powraca: nie (autor w `docs/tresci/bs-e0.md` i D-630 nie rozważa gotowej ręki) → trwała kontrola: test `bv-gotowa-reka.test.ts` w CI.
- Wzorzec lub źródło: `content/pl/rules.yaml:112` „twoje equity jest mniejsze niż potrzebne equity”. Przy gotowej ręce equity nie równa się szansie trafienia drawa, więc „pas” nie wynika z tej reguły. `packages/poker-core/src/grading.ts:430` „gotowa ręka z kartą gracza (para i lepsza): equity to nie same outy, reguła nie pasuje”.
- Kroki w aplikacji: scenariusz SC-19, poziom łatwy, wariant z setem i drawem do koloru; gracz sprawdza na turnie, a aplikacja ocenia to jako błąd i mówi „pasujesz, bo ostatnia karta trafia rzadziej”.
- Opcje: (a) nowy warunek odrzucenia w generatorze, np. `gracz-ma-gotowa-reke` (`classifyHolding(...).improvesBoard`), dopisany do `reject` w SC-02 i SC-19. Daje najmniejszą zmianę treści; wymaga roli 08 (kod generatora i schemat), a odcisków jest mniej (do sprawdzenia próg D-532 ≥ 40). (b) Do czasu (a) wyłączyć SC-02 i SC-19 z treści, bo pas na turnie to cała ich wartość; mniej treści, ale zero błędnych ocen. (c) Liczyć equity całej ręki zamiast outów; dla gotowej ręki potrzebny jest zakres rywala, którego nie ma źródła. Odrzucone. Rekomendacja: (a), z (b) jako tańszą kontrolą, jeśli ekran scenariuszy ruszy przed naprawą generatora.
- Test akceptacyjny: `tools/content-build/test/bv-gotowa-reka.test.ts` zielony bez zmiany asercji; `szablony-bs.test.ts` zielony; `pnpm run ci` kod 0.
- Status: otwarte

### 06-tresci-202 · SC-01 trudny: „sprawdzenie” przy marginesie poniżej jednego outu także przy drawie do koloru, który nie jest najwyższy
- Pozycja listy kontrolnej: TRE-07
- Poziom: P2 (ŚREDNIE: poziom trudny, uproszczenie kierunkowo sporne, ale nie twierdzenie fałszywe w rachunku)
- Realność: realny · Pewność: średnia (R-M7-010 to heurystyka bez liczby outów do odjęcia)
- Rodzaj: M
- Dowód: `content/pl/rules.yaml:644` „ostrożniej i liczysz mniej outów” (R-M7-010); `content/pl/scenarios/sc-01.yaml:14` (trudny: margines 0–2 pp). Jeden out to 1/47 ≈ 2,1 pp na flopie i 1/46 ≈ 2,2 pp na turnie, więc każdy punkt trudny ma margines poniżej jednego outu. W 8218 z 20 000 punktów `call` gracz ma jedną kartę w kolorze i nie jest nią as (`dowody/bs-866744e-rio-wynik.txt`). Na poziomie średnim jest takich 481 z 20 000. Odjęcie choćby jednego outu, jak każe R-M7-010, odwraca decyzję na „pas”.
- Mechanizm: D-630 (`docs/decyzje.md:376`, „kolejne karty i implied odds mogą ją tylko wzmocnić”) pomija odwrotne implied odds. Inne szablony tego nie mają, bo margines Ł i Ś jest ≥ 2 pp.
- Powraca: nie
- Wzorzec lub źródło: R-M7-010 (heuristic; źródła w rejestrze), rachunek marginesu wyżej.
- Kroki w aplikacji: SC-01 trudny, np. gracz z 6♥ na K♥9♥2♥ (przykład typu wariantu, nie konkretne ziarno); aplikacja żąda sprawdzenia przy marginesie poniżej 2 pp.
- Opcje: (a) w trudnym tylko draw do koloru z asem albo z dwiema kartami gracza w kolorze (nowy filtr generatora, rola 08); (b) nazwać uproszczenie w regule (`then`: „każdy out traktujesz jako wygrywający”) i zostawić warianty; (c) usunąć poziom T z SC-01. Rekomendacja: (a), bo uczy czystego przypadku na granicy, a (b) zostawia sprzeczność z R-M7-010 w tym samym module.
- Test akceptacyjny: test na wariantach SC-01 trudny: brak punktu `call` z jedną kartą gracza w kolorze poniżej asa (albo zapisane uproszczenie w R-M2-005 i decyzja).
- Status: otwarte

### 06-tresci-203 · SC-02 i SC-19, poziom łatwy: zakład rywala na turnie większy niż stos gracza
- Pozycja listy kontrolnej: TRE-06
- Poziom: P2 (ŚREDNIE; stanie się WYSOKIE, jeśli ekran pokaże kwotę zakładu obok stosu)
- Realność: brzegowy (dziś bez ekranu) · Pewność: wysoka
- Rodzaj: D
- Dowód: `dowody/bs-866744e-niezalezny-wynik.txt`: SC-02 Ł 850 i SC-19 Ł 3268 z 10 000 wariantów, np. SC-19 seed 6: zakład 26 bb, a graczowi zostało 22,25 bb (stos 35, pula na flopie 22). Przy liczeniu ceny z kwotą all-in (30,0% zamiast 33,3%) akcja i poziom nie zmieniają się w żadnym wariancie. Źródło: `content/pl/scenarios/sc-19.yaml:29` (ułamki do 1 puli) i zaokrąglenie `packages/poker-core/src/scenario-gen.ts:135`. Test autora obcina ujemny stos (`tools/content-build/test/szablony-bs.test.ts:19`, `Math.max(0, …)`), więc tego nie widzi.
- Mechanizm: generator nie zna stosu (`stackBb` nie wchodzi do `GeneratorTemplate`). Dotyczy każdego szablonu z krótkim stosem i dużym zakładem na turnie.
- Powraca: nie
- Wzorzec lub źródło: rachunek: stos − (pula − 0,5)/2 − zakład na flopie.
- Kroki w aplikacji: po podłączeniu ekranu: „rywal stawia 26 bb” przy 22 bb gracza.
- Opcje: (a) linia all-in w generatorze (zakład = min(zakład, stos), F5 w szkicach BS), rola 08; (b) ułamki SC-19 Ł bez 1 puli i pule ≤ 20; zmienia treść, bez kodu. Rekomendacja: (a), bo i tak jest w planie F5.
- Test akceptacyjny: zakład ≤ pozostały stos we wszystkich wariantach SC-02 i SC-19.
- Status: otwarte

### 06-tresci-204 · Wyrocznia testu BS korzysta z tych samych funkcji co generator
- Pozycja listy kontrolnej: TRE-02
- Poziom: P2 (ŚREDNIE)
- Realność: realny (przepuściła 06-tresci-201) · Pewność: wysoka
- Rodzaj: D
- Dowód: nagłówek testu `tools/content-build/test/szablony-bs.test.ts:1` „z wyrocznią niezależną od” (generatora); a wyrocznia woła `analyseOutsSpot` (`tools/content-build/test/szablony-bs.test.ts:38`) i `requiredEquity` (`tools/content-build/test/szablony-bs.test.ts:40`), te same funkcje co `packages/poker-core/src/scenario-gen.ts:130`. Mój przegląd talii zgodził się w 100%, więc rachunek jest dobry, ale wspólny zakres funkcji (bez gotowej ręki) jest ślepym punktem obu stron.
- Mechanizm: ten sam w każdym przyszłym teście szablonów, który skopiuje `szablony-bs.test.ts` (szkic `docs/tresci/szablony-robocze/README.md` tak to zapowiada).
- Powraca: nie
- Wzorzec lub źródło: BR-GEN-003 (wyrocznia niezależna od generatora).
- Kroki w aplikacji: brak (jakość kontroli).
- Opcje: (a) outy przeglądem talii i cena wzorem w teście, plus warunek `classifyHolding` z 201; (b) zostawić i dopisać test 201 osobno. Rekomendacja: (a), bo jest tani i uniezależnia kontrolę.
- Test akceptacyjny: wyrocznia w `szablony-bs.test.ts` bez importu `analyseOutsSpot` i `requiredEquity`; zielona.
- Status: otwarte

## Do sprawdzenia
- D-631: przy 40–50 bb 368–1463 z 3000 wariantów Ś nieodpornych (skrypt sesji BS). Nie przeliczałem; decyzja 35 bb jest ostrożna, więc ryzyko jest tylko po stronie zakresu treści.
- Szkice `docs/tresci/szablony-robocze/README.md`: tylko pobieżnie. SC-03 („rzadziej niż raz na jedenaście kart” przy 4/46 = 8,7%, czyli 1 na 11,5) brzmi poprawnie. SC-34 „ok. {{n:m11.bf.req}} zamiast {{n:m11.bf.req-chips}}” wymaga sprawdzenia kluczy przy przenoszeniu. Pełna weryfikacja wtedy, gdy szkice wejdą do treści.
- Terminologia według tabeli dokumentu 13 (Drive): nie otwierałem.

## Co działa dobrze i należy zachować
- D-630: rozstrzygnięcie ŚR-103 rachunkiem. „Pas” tylko wtedy, gdy przetrwa implied odds z całym stosem. Niezależnie potwierdzone: 0 z 40 000 wariantów z dodatnim EV sprawdzenia drawem (`dowody/bs-866744e-io-wynik.txt`).
- Jedna oczekiwana akcja na punkt we wszystkich poziomach szablonu i odrzucanie innych w generatorze: 0 zmian akcji w 80 000 wariantach.
- Liczby wyłącznie przez `{{n:…}}`, przełożenie „co piątą/szóstą” zgodne z D-565.
- Test przekładów: struktura każdego języka równa pl (zmienia się tylko tekst).
- Ostrożny wkład preflop (−1,5 bb) w teście, czyli stos za pulą liczony z nadmiarem.

## Decyzje dla właściciela
Brak. Wszystkie znaleziska są merytoryczne (ADR-24) albo techniczne. Kolejność napraw ustala koordynator. Jeśli ekran scenariuszy ma ruszyć przed naprawą generatora (201 a), trzeba wybrać produktowo: wyłączyć SC-02 i SC-19 albo poczekać na 08.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-201,06-tresci-202,06-tresci-204`, a kod generatora (warunek odrzucenia gotowej ręki, filtr koloru do asa w T, linia all-in: 06-tresci-201 a, 06-tresci-202 a, 06-tresci-203 a) dla roli 08.
