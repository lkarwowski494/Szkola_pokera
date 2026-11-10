# Recenzja niezależna pracy BG (KO-040, generatory decyzji, lista książek): Treści i wiedza domenowa, Szkoła Pokera, 2026-11-10
Commit: 07eba39 (= `origin/sesja-bg-wyjasnienia`), przedmiot `git diff 8cba034..07eba39` · Tryb: audit (rola 06, sesja BK, polecenie koordynatora `docs/koordynacja/polecenia/BK.md` @ be30f63) · Środowisko: Linux, Node, pnpm; `pnpm content:build` i `pnpm run ci` uruchomione; sieć do odczytu spisów książek działała; bez urządzenia i symulatora iOS.

Zgodnie z poleceniem nie czytałem `docs/tresci/stan-bg.md` ani raportu recenzji BG.

## Podsumowanie
**Werdykt: przyjąć z warunkiem.** Warunek: przed wydaniem trzeba naprawić 06-tresci-001 (WYSOKIE: w jednym spocie M11 powód "bo" pochodzi z reguły, która tego spotu nie dotyczy). Poza tym zmiany w `content/` są w porządku. Poprawne odpowiedzi i zbiory kluczy `{{n:}}` są identyczne przed i po zmianach. Każde nowe zdanie "bo" w generatorze zakresów ma odpowiednik w polu `because` reguły w `content/pl/rules.yaml`. Liczby słowne ("co trzecie", "co piąte") zgadzają się z rachunkiem. Najpoważniejsze ryzyka w zakresie KO-040: mniej więcej połowa wyjaśnień generatora zakresów daje jako "bo" samo "ręka jest w zakresie / poza zakresem" (06-tresci-002), a częstość 50% jest opisana słowami "częściej niż co drugi raz" (06-tresci-003). `pnpm content:build` zakończył się kodem 0, `pnpm run ci` też kodem 0 (92 zestawy, 709 testów).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | P1 · WYSOKIE | M | Powód z R-M11-011 ("każdy kolejny gracz za tobą") przypisany do spotu SB w grze trzyosobowej po pasie Buttona, gdzie za graczem jest tylko BB | otwarte |
| 06-tresci-002 | P2 · ŚREDNIE | M | Około połowa wyjaśnień `rangeDecision` ma tylko tautologiczne "bo ręka jest w zakresie / poza zakresem" i częstość solvera, czyli właśnie to, czego KO-040 zabrania | otwarte |
| 06-tresci-003 | P2 · ŚREDNIE | D | Słowna częstość na granicy 50%: "50% … częściej niż co drugi raz" | otwarte |
| 06-tresci-004 | P2 · NISKIE | M | Powód porównawczy (krótszy stack, rywal sprawdza 3-bet) podany jako powód dla jednej ręki: push.sb-15, btn-vs-co | otwarte |
| 06-tresci-005 | P2 · NISKIE | D | Liczby słowne w `content/` ("co trzeciego", "co piąte") nie mają kontroli zgodności z kluczami `{{n:}}`: wyjątek D-565 bez tańszej kontroli | otwarte |
| 06-tresci-006 | P2 · NISKIE | M | Dwie nazwy jednej osoby w jednym zadaniu ("przeciwnik" w treści zadania, "rywal" w wyjaśnieniu) oraz "szans" zamiast "equity" w potOdds | otwarte |

Liczby według progu: KRYTYCZNE 0, WYSOKIE 1, ŚREDNIE 2, NISKIE 3.

## Weryfikacja twierdzeń
Zakres: całość nowych i zmienionych twierdzeń merytorycznych z diffu (6 plików `content/`, 16 powodów `range.reason.*`, teksty generatorów drawCall/ICM/potOdds/outs/whoWins/playerType w `pl.json`) · Hierarchia: z CLAUDE.md (ADR-24) · Skrypt: projekt nie ma kontroli znaczników `[T:]` (treść w YAML z polem `rules:`), więc zamiast niej porównanie przed/po (`dowody/bg-07eba39-porownanie-odpowiedzi.txt`, exit 0) i sonda tekstów (`dowody/bg-07eba39-sonda-wyjasnienia.txt`, exit 0).

Kolumny w kolejności: źródło z cytatem, potem zdanie w aplikacji. Cytat stoi przy swoim pliku, żeby skrypt kontroli raportu mógł go sprawdzić.

| ID | Źródło (reguła, plik:linia) i cytat `because` | Werdykt | Para zdań | Znalezisko | Zdanie w aplikacji |
|---|---|---|---|---|---|
| rfiUtg | R-M3-002, `content/pl/rules.yaml:132` „za tobą jest jeszcze pięciu graczy, więc ktoś częściej ma lepszą rękę” | POPARTE | ok | — | `apps/mobile/src/i18n/locales/pl.json:732` |
| rfiMid | R-M3-006, `content/pl/rules.yaml:167` „im mniej graczy zostało za tobą, tym rzadziej ktoś ma lepszą rękę” | POPARTE | ok | — | `apps/mobile/src/i18n/locales/pl.json:733` |
| rfiBtn | R-M3-003, `content/pl/rules.yaml:141` „zostały tylko blindy, a po flopie będziesz mieć” | POPARTE | ok | — | `apps/mobile/src/i18n/locales/pl.json:734` |
| rfiSb | R-M3-009, `content/pl/rules.yaml:193` „po flopie mówisz pierwszy, więc {{t:open|otwierasz}} mniej więcej tak szeroko jak z Buttona” | POPARTE (skrót) | ok | — | `apps/mobile/src/i18n/locales/pl.json:735` |
| nineEarly, nineLj | R-M3-010 (heuristic), `content/pl/rules.yaml:203` „za tobą siedzi więcej graczy niż przy stole 6-osobowym” | POPARTE | ok | — | `apps/mobile/src/i18n/locales/pl.json:736-737` |
| btnVsCo | R-M4-005, `content/pl/rules.yaml:249` „rywal często {{t:call|sprawdza}}, więc chcesz mieć rękę” | POPARTE | niejasna przy akcji "Gram (3-bet albo call)" i przy pasie ręki mieszanej | 06-tresci-004 | `apps/mobile/src/i18n/locales/pl.json:738` |
| sbVsBtn | R-M4-003, `content/pl/rules.yaml:231` „3-bet daje {{t:initiative|inicjatywę}} i szansę wygrania” | POPARTE | ok | — | `apps/mobile/src/i18n/locales/pl.json:739` |
| bbVsBtn | R-M4-004 (heuristic), `content/pl/rules.yaml:240` „dopłacasz niewiele do dużej {{t:pot|puli}}” | POPARTE | ok | — | `apps/mobile/src/i18n/locales/pl.json:740` |
| bbVsSb | R-M4-014 (heuristic), `content/pl/rules.yaml:323` „po flopie masz {{t:position|pozycję}}, więc realizujesz więcej equity” | POPARTE | ok | — | `apps/mobile/src/i18n/locales/pl.json:741` |
| pushSb | R-M11-002, `content/pl/rules.yaml:1056` „przy krótszym stacku ryzykujesz mniej względem blindów” | POPARTE | porównawcze przy 15bb | 06-tresci-004 | `apps/mobile/src/i18n/locales/pl.json:742` |
| pushAnte | R-M11-003, `content/pl/rules.yaml:1064` „ante powiększa {{t:pot|pulę}}, którą zgarniasz” | POPARTE | ok | — | `apps/mobile/src/i18n/locales/pl.json:743` |
| push3max | R-M11-011, warunek `content/pl/rules.yaml:1126` „za tobą zostało więcej graczy, którzy mogą” | dla push.btn-3max POPARTE; dla push.sb-3max SPRZECZNE z zakresem reguły | fałszywy wniosek | 06-tresci-001 | `apps/mobile/src/i18n/locales/pl.json:744`; mapa `apps/mobile/src/features/drills/range-reasons.ts:32` |
| callBb | R-M11-007, `content/pl/rules.yaml:1096` „sprawdzający wygrywa tylko na showdownie” | POPARTE | ok | — | `apps/mobile/src/i18n/locales/pl.json:745` |
| call3max, call3maxTwo | R-M11-012, `content/pl/rules.yaml:1136` „gracz za tobą może mieć silną rękę i dołączyć” | POPARTE | ok | — | `apps/mobile/src/i18n/locales/pl.json:746-747` |
| ICM callExplanation | R-M11-009, `content/pl/rules.yaml:1112` „przegrana kosztuje więcej pieniędzy, niż wygrana dodaje”; sonda: 20 000 spotów, najmniejszy bubble factor 1,0586 | POPARTE | ok | — | `apps/mobile/src/i18n/locales/pl.json:800` |
| m2.q6, q7, q8; m8.q8; m12 | rachunek: eq.bet-pot 33,3% (co trzecie), odds.flush.flop-turn 19,1% (co piąte), exam.m2.third.eq 40 ÷ 200 = 20% (co piąte), OESD 8/46 = 17,4% (rzadziej), eq.bet-half 25% (co czwarte), flop-river 35,0% (ponad co trzecie), m8 28,6% (ponad co czwarte) wobec 20%, turn-river 19,6% (co piąte) | POPARTE (rachunek) | ok | 06-tresci-005 (kontrola) | `content/pl/exams/m2.yaml:80`, `content/pl/exams/m2.yaml:89`, `content/pl/exams/m2.yaml:98`, `content/pl/exams/m8.yaml:72`, `content/pl/lessons/m12-l2-decyzja-wynik.md:40` |
| m3, m10, m11 | R-M3-002; R-M10-011; R-M11-011 (cytaty jak wyżej) | POPARTE | ok | — | `content/pl/exams/m3.yaml:21`, `content/pl/exams/m10.yaml:73`, `content/pl/exams/m11.yaml:86` |

## Linia bazowa i założenia
- **Wymiary pokrycia:** twierdzenia (16 powodów, 6 wyjaśnień w treści, teksty 6 generatorów): sprawdzone, jedno SPRZECZNE (001). Progi krytyczne dla zdrowia i prawa: sprawdzone, nie ma ich w diffie. Brakujące ostrzeżenia: zastrzeżenie o implied odds zostało (`drawCall.impliedFlop/Turn`). Jednostki i warianty regionalne: przekład en/de/ja ma ten sam sens (niżej). Aktualność: lista książek z datą odczytu 2026-11-10. Trudna pamięć: sprawdzone, brak. Pary zdań: przeczytane w sondzie, wynik w 001, 003 i 004. Jedno źródło albo niskie szczeble: lista luk szczebla 4 zgadza się z `docs/tresci/rejestr.json` (np. R-M4-010 [4, 4, 4]).
- **Soczewki:** laik biorący zdania dosłownie (003, 006), ekspert szukający szkodliwych uproszczeń (001, 004), sceptyczny weryfikator (tabela weryfikacji, spisy książek), osoba z innego kraju (próbka en/de/ja).
- **Wzorzec najlepszych w klasie dla KO-040:** każde "dlaczego" wskazuje cechę tej konkretnej sytuacji (pozycja, liczba graczy za tobą, stack, cena), a częstość solvera jest tylko dodatkiem. Tak zapisał to przewodnik BG (`docs/tresci/przewodnik-wyjasnien-ko040.md:9`). W generatorze zakresów wzorzec jest spełniony tylko wtedy, gdy kierunek powodu zgadza się z miejscem ręki (002).
- **Założenia:** bez zmian w `docs/zalozenia.md`.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/pl/exams/{m2,m3,m8,m10,m11}.yaml`, `content/pl/lessons/m12-l2-decyzja-wynik.md` | tak, całość | diff, rachunek, `dowody/bg-07eba39-porownanie-odpowiedzi.txt` |
| `apps/mobile/src/features/drills/{engine,text,range-reasons}.ts`, test KO-040 | tak, całość | lektura kodu i sonda `dowody/bg-07eba39-sonda-wyjasnienia.txt` (kod sondy: `dowody/bg-07eba39-sonda-kod.txt`) |
| klucze `drill.*` w `pl.json` | tak, wszystkie zmienione | diff i sonda |
| przekład `drill.*`: en, de, ja | próbka 32 kluczy na język (range, drawCall, icm, potOdds, playerType) | odczyt JSON; sens zgodny, bez znalezisk |
| przekład pozostałych 8 języków | nie (polecenie: pełny przegląd robi rola 09) | — |
| `docs/tresci/przewodnik-wyjasnien-ko040.md`, D-565–D-567 | tak | lektura |
| `docs/tresci/zrodla-scenariusze-ksiazki.md` | MoP i Acevedo: spisy otwarte i porównane; Janda, Brokos, FMM, Kill Everyone, Harrington: nie | `dowody/bg-07eba39-ksiazki-spisy.txt` |
| `pnpm content:build`, `pnpm run ci` | tak, oba z kodem 0 | `dowody/bg-07eba39-content-build.txt`, `dowody/bg-07eba39-ci.txt` |
| bazy `.db` i `tresc.generated.ts` | tylko pośrednio (po content:build drzewo git bez zmian) | `git status --porcelain` pusty po buildzie |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/tresci/recenzje/recenzja-bg-07eba39.md . --rola 06-tresci` → kod 0: "OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 06-tresci" (skrypt w scratchpadzie sesji, wynik po ostatniej poprawce raportu).

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| TRE-01 zdanie → twierdzenie | dotyczy (każdy powód = pole `because` reguły; zdania w exams mają `rules:`) | ok; 001 to błąd zakresu, nie brak twierdzenia |
| TRE-02 źródło popiera | dotyczy | powody zgodne dosłownie z `because` (tabela); źródeł reguł nie otwierałem ponownie, bo `because` się nie zmieniło |
| TRE-03 zakres twierdzenia | dotyczy | 06-tresci-001, 06-tresci-004 |
| TRE-04 szczebel | dotyczy (lista luk) | ok, zgodne z `rejestr.json` |
| TRE-05 sprzeczne źródła | nie dotyczy (diff nie wprowadza nowych wartości) | — |
| TRE-06 liczby i granice | dotyczy | klucze `{{n:}}` i poprawne odpowiedzi bez zmian; 06-tresci-003, 06-tresci-005 |
| TRE-07 uproszczenie | dotyczy | ok (zastrzeżenie o implied odds zostało) |
| TRE-08 tekst nie mówi więcej / pary zdań / przekład | dotyczy | 06-tresci-001, 06-tresci-004; przekład en/de/ja ok |
| TRE-09 fakty zmienne | dotyczy (książki: wydania, ISBN) | MoP i Acevedo ok; reszta w "Do sprawdzenia" |
| TRE-10 treść krytyczna | nie dotyczy (diff bez treści krytycznej; aplikacja bez hazardu, CLAUDE.md) | — |
| TRE-11 trudna pamięć | nie dotyczy | — |
| TRE-12 odniesienia przestrzenne | nie dotyczy | — |
| TRE-13 wersja w produkcie | dotyczy | build zgodny z drzewem (pusty `git status` po buildzie) |
| TRE-14 miejsce treści i cytaty | dotyczy (spisy książek) | ok; w repo tylko tytuły rozdziałów, bez tekstu książek |

## Znaleziska (szczegóły)

### 06-tresci-001 · Powód "każdy kolejny gracz za tobą" w spocie, w którym za graczem jest tylko jeden gracz
- Pozycja listy kontrolnej: TRE-03
- Poziom: P1 · próg CLAUDE.md: WYSOKIE (błędne twierdzenie merytoryczne)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: mapa `apps/mobile/src/features/drills/range-reasons.ts:32` „'push.sb-3max': 'push3max'” i kierunek `apps/mobile/src/features/drills/range-reasons.ts:59` „push3max: 'tight'”.
- Dowód (tekst): `apps/mobile/src/i18n/locales/pl.json:744` „Każdy kolejny gracz za tobą to dodatkowa szansa, że ktoś obudzi się z silną ręką”.
- Dowód (warunek reguły): R-M11-011 `content/pl/rules.yaml:1126` „grasz push/fold, a za tobą zostało więcej graczy, którzy mogą”.
- Dowód (spot): `content/ranges/spots.yaml:243` „trzech graczy, stacki po 7,5bb, Button {{t:fold|spasował}}”. Za SB zostaje tylko BB, czyli tyle samo graczy co w grze jeden na jednego.
- Dowód (sonda, blok "push.sb-3max [out]" w `dowody/bg-07eba39-sonda-wyjasnienia.txt`): "Pasujesz, bo w tej sytuacji ta ręka jest poza zakresem. Każdy kolejny gracz za tobą to dodatkowa szansa … więc pasy wszystkich zdarzają się rzadziej."
- Mechanizm: mapa powodów przypisuje spotom M11 reguły bez `check.spots` (`grep -n "spots: \[.*push\." content/pl/rules.yaml` → 0 trafień), więc zakres reguły nie jest sprawdzany. Drugie trafienie tego mechanizmu: `push.sb-15` → `pushSb` (06-tresci-004). Pozostałe spoty M11 pasują do warunków reguł R-M11-007 i R-M11-012.
- Powraca: nie
- Wzorzec lub źródło: CLAUDE.md, "Zasady rozstrzygania": nie wolno uczyć zasady sprzecznej ze szczeblami 1–2; R-M11-011, warunek `if`.
- Kroki w aplikacji: ćwiczenie M11 ze spotem "Mały blind, trzech graczy, stacki po 7,5bb, Button spasował", ręka poza zakresem albo na granicy, a potem wyjaśnienie.
- Opcje: (a) dla `push.sb-3max` powód z części `then` tej samej reguły, kierunek `wide`: "Button już spasował, więc pas zależy tylko od dużego blinda; z Buttona muszą spasować dwaj gracze" (zgodne z egzaminem M11, opcja poprawna, `content/pl/exams/m11.yaml:84`; kompromis: nowe zdanie do przekładu w 11 językach); (b) usunąć mapowanie `push.sb-3max` (kompromis: tautologiczne "bo" jak w 002). Rekomendacja: (a). Treść merytoryczną rozstrzyga rola 06 w trybie fix, nie właściciel.
- Test akceptacyjny: test w `apps/mobile/src/features/drills/__tests__/wyjasnienia-ko040.test.ts` sprawdza, że spoty, w których za graczem jest jeden rywal (`push.sb-*`, `push.sb-3max`), nie dostają powodu `push3max`, a reguła źródłowa każdego wpisu `RANGE_REASON` ma warunek zgodny ze spotem (tabela spot → ID reguły w teście).
- Status: otwarte

### 06-tresci-002 · W około połowie wyjaśnień zakresów "bo" to tylko "ręka jest w zakresie / poza nim" plus procent solvera
- Pozycja listy kontrolnej: TRE-08
- Poziom: P2 · próg: ŚREDNIE (KO-040 to wymaganie produktowe; twierdzenie nie jest fałszywe)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód (kod): `apps/mobile/src/features/drills/text.ts:140` „(st === 'in' && dir === 'wide') || (st === 'out' && dir === 'tight')”: poza tymi przypadkami powód to `null`.
- Dowód (szablon): `apps/mobile/src/i18n/locales/pl.json:717` „{{t:fold|Pasujesz}}, bo {{status}}.”, gdzie `status` brzmi "w tej sytuacji ta ręka jest poza zakresem".
- Dowód (sonda, bloki "rfi.btn [out]", "push.sb-15 [out]", "vs-open.btn-vs-co [out]", "push.sb-3max [in]", "call.bb-10 [in]"): "Pasujesz, bo w tej sytuacji ta ręka jest poza zakresem. Częstości solvera dla K2o: pas 100%."
- Dowód (przewodnik BG): `docs/tresci/przewodnik-wyjasnien-ko040.md:21` „**Bez tautologii.**”. KO-040 wyklucza wyjaśnienie "dlatego że tak jest w liczbach".
- Mechanizm: `REASON_DIRECTION` ma jeden kierunek na spot, więc ręce po przeciwnej stronie zakresu nie mają powodu. Dotyczy wszystkich 34 spotów: spoty `wide` przy rękach poza zakresem (9 kluczy powodów), spoty `tight` przy rękach w zakresie (7 kluczy). Test `apps/mobile/src/features/drills/__tests__/wyjasnienia-ko040.test.ts:48` sprawdza tylko, czy w tekście jest ", bo ", a nie czy po nim stoi powód.
- Powraca: nie
- Wzorzec lub źródło: KO-040 (`origin/koordynacja:docs/koordynacja/decyzje.md`, wiersz 48); D-567 sam nazywa powód zależny od klasy ręki "poza zakresem tej sesji".
- Kroki w aplikacji: dowolne ćwiczenie zakresów, np. Button i ręka K2o.
- Opcje: (a) drugi powód na spot dla przeciwnego kierunku, każde zdanie z przeczytanym źródłem (kompromis: nowe twierdzenia i przekład); (b) w przeciwnym kierunku pokazać ten sam powód z odwróconą ramą ("zakres jest tu szeroki, a mimo to ta ręka się w nim nie mieści"; kompromis: prościej, ale bez cechy ręki); (c) zostawić i zapisać w backlogu jako znane ograniczenie KO-040. Rekomendacja: (b) teraz, (a) razem z szablonami scenariuszy. Decyzja o zakresie należy do roli 03 z właścicielem.
- Test akceptacyjny: dla każdego spotu i każdego statusu `in`/`out` wyjaśnienie zawiera zdanie powodu inne niż `range.status.*`.
- Status: otwarte

### 06-tresci-003 · Częstość 50% opisana słowami "częściej niż co drugi raz"
- Pozycja listy kontrolnej: TRE-06
- Poziom: P2 · próg: ŚREDNIE (błędne słowa przy liczbie, ale tylko na granicy)
- Realność: brzegowy · Pewność: wysoka
- Rodzaj: D
- Dowód (kod): `apps/mobile/src/features/drills/text.ts:143` „f >= 0.5 ? 'overHalf'”.
- Dowód (tekst): `apps/mobile/src/i18n/locales/pl.json:728` „częściej niż co drugi raz”.
- Dowód (sonda, blok "rfi.btn [mixed]"): obie opcje ręki 50/50 mówią "Solver gra tak w 50% przypadków, czyli częściej niż co drugi raz". Przy f z przedziału [0,495; 0,5) pokazuje się "50%" ze słowami "rzadziej niż co drugi raz", czyli ta sama liczba dostaje dwa przeciwne opisy.
- Dowód (losowanie): `apps/mobile/src/features/drills/engine.ts:436` waży klasy przez 4·p·(1−p), więc ręce bliskie 50% pojawiają się najczęściej.
- Mechanizm: progi `oftenKey` są tylko w tym jednym miejscu (`grep -rn "oftenKey" apps/mobile/src` → definicja i użycie w `freqRight`).
- Powraca: nie
- Wzorzec lub źródło: rachunek; 0,5 to dokładnie "co drugi raz".
- Kroki w aplikacji: ćwiczenie zakresów, ręka mieszana bliska 50%.
- Opcje: (a) przedział "mniej więcej co drugi raz" dla wartości, które `pct` zaokrągla do 50% (kompromis: jeden klucz więcej w 12 językach); (b) próg liczony na wartości zaokrąglonej, równej "50%" → "co drugi raz". Rekomendacja: (a).
- Test akceptacyjny: `oftenKey(0.5)`, `oftenKey(0.497)` i `oftenKey(0.503)` dają ten sam opis, który nie mówi "częściej" ani "rzadziej".
- Status: otwarte

### 06-tresci-004 · Powód porównawczy podany jako powód dla jednej ręki
- Pozycja listy kontrolnej: TRE-08
- Poziom: P2 · próg: NISKIE
- Realność: realny · Pewność: średnia
- Rodzaj: M
- Dowód (stack): mapa `apps/mobile/src/features/drills/range-reasons.ts:29` „'push.sb-15': 'pushSb'” i tekst `apps/mobile/src/i18n/locales/pl.json:742` „Przy krótszym stacku ryzykujesz mniej względem blindów”. Przy 15bb, najgłębszym stacku M11, jest to powód "dlaczego pushujesz tę rękę" (sonda, blok "push.sb-15 [in]").
- Dowód (BTN vs CO): `apps/mobile/src/i18n/locales/pl.json:738` „Rywal często {{t:call|sprawdza}}, więc chcesz mieć rękę”. Zdanie stoi przy akcji "Gram (3-bet albo call)" i przy opcji "Pas" ręki mieszanej, a kto ma sprawdzać, wynika tylko z R-M4-005 (3-bet sprawdzany przez CO).
- Mechanizm: `because` reguł opisuje różnicę między spotami albo skład zakresu, a mapa używa go jako powodu dla pojedynczej ręki; 2 trafienia (pushSb przy push.sb-15, btnVsCo).
- Powraca: nie
- Wzorzec lub źródło: R-M11-002 (`content/pl/rules.yaml:1055`); R-M4-005 (`content/pl/rules.yaml:248`).
- Kroki w aplikacji: ćwiczenie M11 przy 15bb; ćwiczenie BTN vs CO.
- Opcje: (a) doprecyzować podmiot ("CO często sprawdza twój 3-bet") i przy 15bb pominąć powód stacka (kompromis: przekład 2 kluczy); (b) zostawić. Rekomendacja: (a) razem z 001.
- Test akceptacyjny: odczyt próbki wyjaśnień obu spotów przez rolę 06.
- Status: otwarte

### 06-tresci-005 · Liczby słowne w treści bez kontroli zgodności z `numbers.yaml`
- Pozycja listy kontrolnej: TRE-06
- Poziom: P2 · próg: NISKIE (dziś wszystkie wartości się zgadzają)
- Realność: teoretyczny · Pewność: wysoka
- Rodzaj: D
- Dowód: `content/pl/exams/m2.yaml:80` „wymaga wygrywania mniej więcej co trzeciego rozdania ({{n:eq.bet-pot}})”; podobnie `content/pl/exams/m2.yaml:89`, `content/pl/exams/m2.yaml:98`, `content/pl/exams/m8.yaml:72`, `content/pl/lessons/m12-l2-decyzja-wynik.md:40`. D-565 (`docs/decyzje.md:343`) świadomie odrzuca nowe klucze, ale nie ustanawia kontroli zastępczej. Jeśli zmieni się `ex.bet.pot`, słowa przestaną się zgadzać z liczbą obok.
- Mechanizm: 5 zdań w 3 plikach (grep "co trzeciego|co piąte|co czwartego|ponad co" w `content/`).
- Powraca: nie
- Wzorzec lub źródło: CLAUDE.md: liczby w treści tylko przez `{{n:klucz}}`; zasada 7 właściciela: ryzykowną część zastąp tańszą kontrolą, nie żadną.
- Kroki w aplikacji: dziś bez skutku.
- Opcje: (a) test content-build: słowo "co N-te" stojące przy `{{n:k}}` zgadza się z round(1 ÷ wartość); (b) klucze "raz na N" jako formuła w `numbers.yaml`. Rekomendacja: (a), bo jest tańsza.
- Test akceptacyjny: zmiana `ex.bet.pot` w kopii roboczej daje czerwony test.
- Status: otwarte

### 06-tresci-006 · Dwie nazwy jednej osoby i "szanse" zamiast "equity" w jednym zadaniu
- Pozycja listy kontrolnej: TRE-08
- Poziom: P2 · próg: NISKIE
- Realność: realny · Pewność: średnia
- Rodzaj: M
- Dowód (treść zadania): `apps/mobile/src/i18n/locales/pl.json:847` „Przeciwnik {{t:bet|stawia}} {{bet}}. Ile equity potrzebujesz”.
- Dowód (wyjaśnienie): `apps/mobile/src/i18n/locales/pl.json:848` „potrzebujesz {{required}} szans, czyli wygrywać mniej więcej raz na”; to samo wyjaśnienie zaczyna się od "Rywal stawia". W drawCall treść zadania mówi "przeciwnik stawia", a wyjaśnienie (`apps/mobile/src/i18n/locales/pl.json:868`) "rywal". W gałęzi `drill` "rywal" występuje 9 razy, "przeciwnik" 5 razy.
- Mechanizm: nowe klucze używają "rywal", a stare treści zadań "przeciwnik". Tabeli terminologii (dokument 13 na Drive) nie otwierałem, więc który termin jest kanoniczny: `[DO USTALENIA]`.
- Powraca: nie
- Wzorzec lub źródło: CLAUDE.md, "jedna nazwa na jedno pojęcie".
- Kroki w aplikacji: ćwiczenia potOdds i drawCall.
- Opcje: (a) ujednolicić według tabeli terminologii (rola 04 lub 09, przekład); (b) zostawić. Rekomendacja: (a) przy przeglądzie 09.
- Test akceptacyjny: w obrębie jednego generatora tylko jedna nazwa.
- Status: otwarte

## Do sprawdzenia
- Spisy treści Jandy (obalkyknih.cz), Brokosa POP2 (Panrolling), FMM (MARC, archive.org), Kill Everyone i Harringtona, a także ISBN i lata wydań: nie otwierałem, `[DO USTALENIA]`. Spisy MoP (LOC, rozdz. 11, 12, 14, 16–18, 27) i Acevedo (s. 80, 127, 146, 394, 434, 457) zgadzają się z listą BG (`dowody/bg-07eba39-ksiazki-spisy.txt`). Dopasowanie do szablonów jest tematycznie trafne. BG sama zaznacza, że spis to nie treść.
- R-M4-012 w `rejestr.json` ma szczeble [4, 4, 4], ale dwa wpisy pochodzą z tego samego serwisu (preflopwizard.app), więc według zasady "źródła pochodne to jedno źródło" są to dwa źródła. Sprawa sprzed diffu: zgłaszam do rejestru, nie jako znalezisko.
- Przekład 8 pozostałych języków: do roli 09.

## Co działa dobrze i należy zachować
- Poprawne odpowiedzi i zbiory kluczy `{{n:}}` są nietknięte (porównanie mechaniczne, 6 plików ZGODNE).
- Powody w generatorze zakresów są brane dosłownie z pól `because` reguł, nie pisane z pamięci (tabela weryfikacji).
- Mechanizm kierunku (`REASON_DIRECTION`) zapobiega zdaniu "bo" sprzecznemu z decyzją. Do poprawy jest tylko brak drugiego kierunku (002).
- Każda zła opcja ma teraz własne "dlaczego" (whoWins, outs, ICM, playerType, drawCall), a zastrzeżenie o implied odds zostało.
- Lista książek uczciwie odróżnia spis od treści i stwierdza, że M10 wymaga danych o populacji, a nie książki.

## Decyzje dla właściciela
Brak decyzji merytorycznych (ADR-24). Do roli 03 i właściciela trafia tylko zakres 06-tresci-002: czy drugi kierunek powodu robić teraz (opcja b), czy razem z szablonami scenariuszy (opcja a). Rekomendacja: (b) teraz.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001,06-tresci-003,06-tresci-004` (002 po decyzji 03; 005 test dla roli 07; 006 przy przeglądzie 09).

Stan drzewa: `git status --porcelain` na starcie był pusty; na końcu, przed commitem, zawiera tylko `docs/tresci/recenzje/`.
