# Scenariusz: nazwy akcji i sekcja „Liczby” dla F1–F4 (sesja DA)
Rola 04, build, 2026-11-11. Uzupełnia `scenariusz-i-ocena.md` (sesja BE, D-543–D-545). Decyzje: D-886 (nazwy akcji), D-887 (`{{w:stol}}` przed flopem), D-888 („Liczby”), `docs/decyzje/DA.md`. Wdraża rola 08; przekład kluczy na 11 pozostałych słowników to rola 09 (poniżej tylko pl i en).

## 1. Nazwy akcji na ekranie scenariusza (D-886)

### Zasada
Przycisk na pasku ma dwie linie, jak w zatwierdzonej makiecie BE (`ekrany/scenariusz.html:62`): **nazwa akcji** (rzeczownik, pogrubiona) i pod nią **kwota** mniejszym tekstem. Na pasku ocen jest sama nazwa (`scenariusz.html:82`). W zdaniach (werdykt, nagłówki „dlaczego”, lista na końcu, VoiceOver) nazwa i kwota tworzą jedną frazę.

*Dlaczego:* rzeczowniki to nazwy z terminologii (`content/terms.yaml`: pas, czekanie, sprawdzenie, przebicie) i z makiety BE. Ta sama nazwa działa na przycisku, na pasku ocen i w zdaniu, a kwota w osobnej linii nie rozpycha przycisku.

### Klucze (nowa grupa `scenario.action`, zastępuje `play.*` na ekranie scenariusza)
Nazwy są zapisane w formie do zdania (od małej litery w pl i en). Przycisk i początek zdania dostają wielką pierwszą literę przez funkcję, która tylko podnosi pierwszy znak (`wielka` w `EkranScenariusza.tsx`). Funkcja, która zmniejsza litery, jest zabroniona: w niemieckim zepsułaby rzeczowniki.

| Klucz | pl | en | Kiedy |
|---|---|---|---|
| `scenario.action.fold` | `{{t:fold\|pas}}` | `{{t:fold}}` | każdy punkt z pasem |
| `scenario.action.check` | `{{t:check\|czekanie}}` | `{{t:check}}` | cbet-case |
| `scenario.action.call` | `{{t:call\|sprawdzenie}}` | `{{t:call}}` | draw-call, icm-call, range-spot `call X` i `call` |
| `scenario.action.limp` | `limp` | `limp` | size-spot `limp` |
| `scenario.action.raise` | `{{t:raise\|przebicie}}` | `{{t:raise}}` | podbicie, gdy nikt przed tobą nie przebił (otwarcie): range-spot `raise X` w spocie bez przebicia w `path`, size-spot `open-size` i `no-limp` |
| `scenario.action.threeBet` | `3-bet` | `3-bet` | przebicie otwarcia: range-spot `raise X` w spocie z jednym przebiciem w `path`, size-spot `three-bet-size` |
| `scenario.action.allIn` | `all-in` | `all-in` | range-spot `all-in` (spoty `push.*`) |
| `scenario.action.betSmall` | `mały {{t:c-bet\|c-bet}}` | `small {{t:c-bet}}` | cbet-case `bet-small` |
| `scenario.action.betBig` | `duży {{t:c-bet\|c-bet}}` | `big {{t:c-bet}}` | cbet-case `bet-big` |
| `scenario.action.amountPay` | `{{bb}} bb` | `{{bb}} bb` | kwota, którą dopłacasz: sprawdzenie, limp |
| `scenario.action.amountTo` | `do {{bb}} bb` | `to {{bb}} bb` | rozmiar całkowity: przebicie, 3-bet |
| `scenario.action.amountAll` | `{{bb}} bb` | `{{bb}} bb` | all-in: cały stos |
| `scenario.action.withAmount` | `{{akcja}} {{kwota}}` | `{{akcja}} {{kwota}}` | fraza w zdaniu; szyk do zmiany w przekładzie |

- Spacja między liczbą a „bb” to spacja nierozdzielająca (U+00A0), tak jak w kluczach `scenario.pot` i `scenario.table.seat` po przekładzie; liczba formatowana według języka (pl „2,5”, en „2.5”). Analogia: Trening składa jednostkę jako `'{n} kg'` i liczbę przez `toLocaleString` (`lkarwowski494/trening:lib/units.ts:88`, `:96`, @ 2e4b0f8, odczyt 2026-11-11).
- `play.fold`, `play.check`, `play.call`, `play.raise`, `play.allin`, `play.report.detail.cbetPlans.*` przestają być używane na tym ekranie (dziś to jedyny ekran, który ich używa; trybu gry w przebudowie jeszcze nie ma). Klucze dziennika `play.log.*` zostają (osobne zdania o graczach), uwaga NIS-DA-01 niżej.
- 4-bet: w `content/ranges/spots.yaml` nie ma dziś spotu z dwoma przebiciami w `path`. Klucz `scenario.action.fourBet` (`4-bet`) dochodzi razem z pierwszym takim spotem; do tego czasu kod rzuca błąd dla spotu z więcej niż jednym przebiciem (cicha nazwa „przebicie” byłaby myląca).

### Kwota przy akcji
| Akcja | Kwota | Skąd |
|---|---|---|
| pas, czekanie, c-bet mały i duży | brak (c-bet: rozmiar w „Liczbach”, bo wariant nie ma puli) | — |
| sprawdzenie draw-call | zakład rywala | `p.bet` (jak dziś) |
| sprawdzenie icm-call i range-spot `call` (wobec all-inu) | stos − twój blind | `stackBb − blindBb(hero)` (jak dziś w `kwotaAkcji`) |
| sprawdzenie range-spot `call X` | X − twój blind | etykieta solvera to kwota całkowita („call 2.5” = sprawdzenie do 2,5 bb); BB dopłaca 1,5 bb, SB 2 bb, Button 2,5 bb |
| limp | 1 bb − twój blind | jak dziś (SB 0,5 bb) |
| przebicie, 3-bet (range-spot) | X z etykiety solvera | „raise 7.5” = do 7,5 bb |
| przebicie, 3-bet (size-spot) | `options[].bb` | jak dziś |
| all-in | cały stos | `stackBb` szablonu |

*Dlaczego dwa sposoby liczenia:* „sprawdzenie N bb” znaczy to samo co wiersz „do sprawdzenia N bb” pod stołem (dopłata), a „przebicie do N bb” i „all-in N bb” to zapis całkowity, jak w `spots.yaml` („Przebicie do 2,5bb”, „3-bet do 10bb”) i w opisach rozdań.

**Wyjątek: range-spot, po którym szablon ma punkt size-spot** (F1 + F3, np. SC-08: 3-bet, potem jego rozmiar). Przycisk przebicia w range-spot nie ma wtedy kwoty (sama nazwa „3-bet”), bo kwota z etykiety solvera zdradziłaby odpowiedź na następne pytanie o rozmiar.

### Kolejność na pasku
Od najtańszej: pas, czekanie, limp, sprawdzenie, przebicie albo 3-bet (rosnąco według kwoty), all-in. Rozmiary w size-spot mają tę samą nazwę i różnią się tylko kwotą; słowa „standardowe”, „mniejsze”, „większe” nie trafiają na przycisk, bo zdradzałyby ocenę przed decyzją (`design-spec.md`, `PasekStrategii`: „nic nie zdradzają”).

### Przykłady (pl)
| Punkt | Pasek przed decyzją | Werdykt |
|---|---|---|
| range-spot `rfi.utg` | Pas · Przebicie / do 2,5 bb | „Twój wybór: przebicie (raise) do 2,5 bb.” |
| range-spot `vs-open.bb-vs-btn` | Pas · Sprawdzenie / 1,5 bb · 3-bet / do 10 bb | „Twój wybór: sprawdzenie (call) 1,5 bb. Lepiej: 3-bet do 10 bb.” |
| range-spot `push.sb-10` | Pas · All-in / 10 bb | „Twój wybór: pas (fold). Lepiej: all-in 10 bb.” |
| range-spot `call.bb-10` | Pas · Sprawdzenie / 9 bb | — |
| size-spot `open-size` (BTN) | Przebicie / do 2 bb · Przebicie / do 2,5 bb · Przebicie / do 4 bb (standard 2,5 bb × `SIZE_SMALL_FACTOR` 0,8 i `SIZE_BIG_FACTOR` 1,6, `scenario-gen.ts:275-276`) | „Twój wybór: przebicie do 4 bb. Lepiej: przebicie do 2,5 bb.” |
| size-spot `no-limp` (SB) | Limp / 0,5 bb · Przebicie / do 3 bb | „Twój wybór: limp 0,5 bb. Lepiej: przebicie do 3 bb.” |
| size-spot `three-bet-size` | 3-bet / do … bb (trzy rozmiary) | — |
| cbet-case | Czekanie · Mały c-bet · Duży c-bet | „Twój wybór: duży c-bet. Lepiej: mały c-bet.” |
| icm-call | Pas · Sprawdzenie / 9 bb | — |

Nawias z nazwą angielską („pas (fold)”) dokłada podstawianie znaczników `{{t:…}}` (reguła T-01, `content/terms.yaml`, nagłówek); terminy angielskie (3-bet, all-in, limp, c-bet) nawiasu nie mają.

### VoiceOver
- Przycisk: nazwa i kwota jednym ciągiem, np. „Sprawdzenie, 1,5 bb”; rola przycisku; w pasku ocen „Oceny akcji: pas zgodna, sprawdzenie błąd, twój wybór, 3-bet dopuszczalna.” (wzór BE).
- Zapis kwoty „bb” czytany jako litery (jak w całym scenariuszu, `scenariusz-i-ocena.md`, VoiceOver).

### Kryteria akceptacji dla 08 (nazwy akcji)
1. Każda akcja punktów draw-call, cbet-case, size-spot, icm-call i range-spot ma nazwę z grupy `scenario.action`; test: dla każdej etykiety solvera ze `spots.yaml` używanej w szablonach i każdej akcji `Akcja` funkcja nazwy zwraca niepusty tekst bez `{{`.
2. `raise X` w spocie bez przebicia w `path` = „przebicie”, z jednym przebiciem = „3-bet”; spot z dwoma przebiciami: błąd z nazwą spotu. Test na `rfi.*`, `vs-open.*`.
3. Kwoty jak w tabeli; test: BB wobec otwarcia BTN „call 2.5” → 1,5 bb; `push.sb-10` all-in → 10 bb; `call.bb-10` → 9 bb.
4. Range-spot przed size-spot: przycisk przebicia bez kwoty (test na szablonie F1 + F3 albo fixture).
5. Pasek przed decyzją nie zawiera słów oceny ani „standard” (test: tekst przycisków size-spot różni się tylko kwotą).
6. Przy AX5 na 320 pt nazwa i kwota mieszczą się bez ucinania (przepełnienie jak w BE, kod 0).

### Uwaga dla 08 (NIS-DA-01, niskie)
Dziennik (`play.log.*`) pisze kwoty bez spacji („BB: sprawdza 9bb”), a wiersz pod stołem i przyciski ze spacją („9 bb”). Na jednym ekranie dwa zapisy tej samej jednostki; propozycja: przy przekładzie kluczy `scenario.action` rola 09 poprawia też spację w `play.log.*` (pl, en i pozostałe słowniki). Nie blokuje wydania.

## 2. `{{w:stol}}` przed flopem (D-887, ocena D-784)
Akceptuję D-784 dla pl i en: „Masz [[A♠ K♦]] na UTG, preflop, wszyscy przed tobą spasowali.” (szkic SC-04, `docs/tresci/szablony-robocze/README.md:35`); en według wzoru szablonów („You have {{w:reka}} on the {{w:pozycja}}, …”, `content/en/scenarios/`): „You have [[A♠ K♦]] on the …, preflop, …”. „Preflop” to termin z `content/terms.yaml` (pl i en „preflop”), zapisany po angielsku, więc bez nawiasu i bez znacznika (reguła T-01).

Warunek: kod robi dziś `t('scenario.street.preflop').toLowerCase()`. W językach z wielką literą rzeczowników (de) albo z inną formą przysłówka zmniejszenie liter może dać zły zapis. Rola 09 sprawdza 11 słowników przy przekładzie; jeśli w którymś forma się nie zgadza, dochodzi klucz `scenario.marker.preflop` (pl „preflop”, en „preflop”), a kod przestaje zmniejszać litery. `[DO USTALENIA: forma w de, fr, es, it, pt, pt-BR, vi, ja, ko, zh-Hant, rola 09]`

## 3. Sekcja „Liczby” dla F2–F4 i draw-call z nadkartami (D-888)

### Zasada
„Liczby” to rozwijany wiersz pod paskiem ocen, domyślnie zwinięty (D-544). Każda liczba ma w tym samym zdaniu przełożenie na sens (BR-OCE-001, pole `sens`). Wszystkie wartości to parametry liczone w kodzie z wariantu i z `content/numbers.yaml` (rachunek, szczebel 1 ADR-24); w kluczach nie ma wpisanych liczb. Procenty: `formatujProcent` (`packages/jezyki/src/formaty.ts:18`), bez miejsc po przecinku, chyba że niżej podano inaczej; „raz na N”: `Math.max(1, Math.round(1 / p))`, jak w obecnym `zdanieLiczb`.

Sekcja jest pokazywana tylko wtedy, gdy ekran ma dla punktu zdanie z tej tabeli; pusty wiersz „Liczby” się nie pojawia.

| Punkt | Zdania (klucze) | Kiedy |
|---|---|---|
| draw-call | `scenario.numbers.line` (bez zmian) + `overcardsFold` albo `overcardsCall` | zdanie o nadkartach tylko przy `nadkarty > 0` |
| cbet-case | `scenario.numbers.cbet` | zawsze |
| size-spot `open-size`, `no-limp` | `sizeOpen` dla standardu; drugi raz `sizeOpen` dla twojego wyboru, gdy to inny rozmiar; `limp`, gdy wybrałeś limp | zawsze |
| size-spot `three-bet-size` | `size3bet` dla standardu i dla twojego wyboru, gdy inny | zawsze |
| icm-call | `scenario.numbers.icm` | zawsze |
| range-spot | bez nowych zdań: częstości solvera dochodzą tu według BE („tu trafiają częstości solvera, jeśli punkt je ma”), osobne zadanie przy wdrożeniu range-spot | — |

### Teksty (pl, en)
**draw-call, nadkarty** (NIS-003, D-846). Wzór: `content/pl/lessons/m2-l2-pot-odds.md:25` („Nawet jeśli doliczysz {{n:pair.outs.per-rank}} asy, które dają parę asów (razem {{n:outs.flush-ace}} outów, …), to wciąż wyraźnie mniej niż {{n:eq.bet-pot}}”): nadkarty dolicza się jako dodatkowe outy i porównuje z ceną. Zdania omijają liczbę mnogą po liczebniku (dopełniacz „z N kart”, „w N% przypadków” się nie odmienia), więc nie potrzebują form `_few`/`_many`.

| Klucz | pl | en |
|---|---|---|
| `scenario.numbers.overcardsFold` | `Jeśli doliczysz karty, które dają ci parę wyższą od każdej karty na stole ({{nadkarty}} z {{nieznane}} niewidzianych), trafisz w {{trafiszRazem}} przypadków, czyli wciąż rzadziej, niż wymaga cena ({{potrzeba}}). Taka {{t:pair\|para}} może też przegrać z lepszym układem rywala.` | `If you also count the cards that give you a {{t:pair}} higher than every card on the {{t:board}} ({{nadkarty}} of {{nieznane}} unseen), you hit in {{trafiszRazem}} of cases, still less often than the price requires ({{potrzeba}}). Such a pair can also lose to a stronger hand.` |
| `scenario.numbers.overcardsCall` | `Karty, które dają ci parę wyższą od każdej karty na stole ({{nadkarty}} z {{nieznane}} niewidzianych), rachunek pomija: taka {{t:pair\|para}} może przegrać z lepszym układem rywala, a same outy drawa wystarczają.` | `The cards that give you a {{t:pair}} higher than every card on the {{t:board}} ({{nadkarty}} of {{nieznane}} unseen) are left out of the math: such a pair can lose to a stronger hand, and the outs of your draw are enough on their own.` |

Parametry (rachunek, rola 08):
- `nadkarty`: niewidziane karty tej samej rangi co twoja karta wyższa od najwyższej karty stołu (po 3 na każdą taką kartę; para w ręce się nie liczy), bez kart już policzonych w `outs` (np. as w kolorze drawa).
- `trafiszRazem = (outs + nadkarty) / nieznane`, jedno miejsce po przecinku (jak `trafisz`); `nieznane`, `potrzeba` jak w `scenario.numbers.line`.
- Wybór zdania: `correct = fold` → `overcardsFold`, `correct = call` → `overcardsCall`. Test: w każdym wariancie z `correct = fold` i `nadkarty > 0` zachodzi `trafiszRazem < required` (inaczej zdanie byłoby fałszywe; wyrocznia CT z D-846 mówi, że tak jest na 3000 ziaren, test to utrwala).
- „Para może przegrać z lepszym układem” to ranking układów (szczebel „rules”): jedna para przegrywa z każdym wyższym układem.
- Ten sam wzór zdania może wziąć rola 06 do wyjaśnień szablonów sc-01/02/03/19 („Masz N outów”), jeśli 08 da znacznik wariantu; to poza tą sesją (D-846: backlog).

**cbet-case.** Wariant nie ma puli (`widokDecyzji`: `pulaBb` null), więc zdanie mówi o rozmiarach w procentach puli i o cenie, jaką rozmiar daje rywalowi (R-M5-007: mały zakład wystarcza, żeby słabe ręce spasowały).

| Klucz | pl | en |
|---|---|---|
| `scenario.numbers.cbet` | `Mały {{t:c-bet\|c-bet}} to ok. {{maly}} {{t:pot\|puli}}, a duży ok. {{duzy}}. Rywal, żeby {{t:call\|sprawdzić}}, potrzebuje przy małym {{cenaMaly}} szans, czyli wygrać mniej więcej raz na {{razMaly}}, a przy dużym {{cenaDuzy}}, czyli raz na {{razDuzy}}.` | `A small {{t:c-bet}} is about {{maly}} of the {{t:pot}}, a big one about {{duzy}}. To {{t:call}}, your opponent needs {{cenaMaly}} equity against the small one, that is, to win about once in {{razMaly}}, and {{cenaDuzy}} against the big one, about once in {{razDuzy}}.` |

Parametry: `maly`, `duzy` = `cbet.size.small`, `cbet.size.big` z `numbers.yaml`; cena rywala `f / (1 + 2f)` (sprawdza f do puli 1 + 2f). Dziś wychodzi 20% i raz na 5 oraz 30% i raz na 3 (rachunek kontrolny, nie wartości do wpisania).

**size-spot.** Zdanie pokazuje cenę, jaką rozmiar daje rywalowi (R-M4-001: rozmiar „nie daje rywalowi taniej ceny”; ten sam rachunek co `bb.call.vs-btn` i `bb.pot-after.vs-btn` w `numbers.yaml`).

| Klucz | pl | en |
|---|---|---|
| `scenario.numbers.sizeOpen` | `Przy przebiciu do {{bb}} bb {{t:big-blind\|duży blind}} dopłaca {{doplata}} bb do puli {{pula}} bb (gdy reszta spasuje), więc potrzebuje {{cena}} szans, czyli wygrać mniej więcej raz na {{raz}}.` | `With a raise to {{bb}} bb, the {{t:big-blind}} adds {{doplata}} bb to a {{t:pot}} of {{pula}} bb (if everyone else folds), so they need {{cena}} equity, that is, to win about once in {{raz}}.` |
| `scenario.numbers.size3bet` | `Przy 3-becie do {{bb}} bb otwierający dopłaca {{doplata}} bb do puli {{pula}} bb, więc potrzebuje {{cena}} szans, czyli wygrać mniej więcej raz na {{raz}}.` | `With a 3-bet to {{bb}} bb, the opener adds {{doplata}} bb to a {{t:pot}} of {{pula}} bb, so they need {{cena}} equity, that is, to win about once in {{raz}}.` |
| `scenario.numbers.limp` | `Limp kosztuje {{kwota}} bb, a {{t:big-blind\|duży blind}} może zobaczyć flop bez dopłaty.` | `A limp costs {{kwota}} bb, and the {{t:big-blind}} can see the flop without paying more.` |

Parametry (R = rozmiar przebicia z `options[].bb`, O = `openBb`, M = martwe blindy `deadBlindsBb(positions)`):
- otwarcie: `doplata = R − 1`; `pula = 2R + 0,5`, gdy nie jesteś na SB, `2R`, gdy jesteś (twój mały blind jest w R); `cena = doplata / pula`. Rachunek kontrolny Buttona: 2,5 bb → 1,5 bb do 5,5 bb, 27%.
- 3-bet: `doplata = R − O`; `pula = 2R + M`; `cena = doplata / pula`.
- limp: `kwota` jak na przycisku (`1 − blindBb(hero)`).
- Gdy szablon size-spot ma pozycje, przy których rywalem nie jest duży blind (otwarcie), zdanie `sizeOpen` mówi o dużym blindzie jako ostatnim graczu do decyzji; to nazwane uproszczenie („gdy reszta spasuje”).

**icm-call.** Wzór i fakty: R-M11-009 (`math`; bubble factor, próg BF ÷ (BF + 1)) i ćwiczenie `drill.icm.callWrongChips` („przegrana zabiera ci więcej z puli nagród, niż wygrana dodaje”).

| Klucz | pl | en |
|---|---|---|
| `scenario.numbers.icm` | `Twoja ręka ma {{equity}} {{t:equity}} wobec {{t:range\|zakresu}} {{t:all-in\|all-inu}} rywala, czyli wygrywa mniej więcej w {{na10}} rozdaniach na 10. Według {{t:icm}} {{t:call\|sprawdzenie}} opłaca się od {{prog}}, a w grze o {{t:chips\|żetony}} wystarczyłoby {{progZetony}}: na {{t:bubble\|bańce}} przegrana zabiera ci więcej z {{t:prize-pool\|puli nagród}}, niż wygrana dodaje.` | `Your hand has {{equity}} {{t:equity}} against your opponent's {{t:all-in}} {{t:range}}, so it wins about {{na10}} hands in 10. Under {{t:icm\|ICM}}, a {{t:call}} pays off from {{prog}}, while in a game for {{t:chips}} {{progZetony}} would be enough: on the {{t:bubble}}, losing takes more of the {{t:prize-pool}} from you than winning adds.` |

Parametry:
- `equity = handEquity`, `prog = required` z wariantu; `na10 = Math.round(10 × handEquity)`. Rachunek tej sesji (`tools/equity/equity169.json` × zakres all-inu `10bb|` SB z `content/ranges/pushfold.json`, ważony liczbą par kombinacji): equity klas od 30,6% (72o) do 84,6% (AA), więc `na10` = 3–8 i forma „w N rozdaniach” (miejscownik liczby mnogiej, taki sam dla 2–9) się nie zmienia; test pilnuje przedziału 2–9 dla każdego spotu szablonu.
- Bez miejsc po przecinku: przy `marginMin` ≥ 0,01 zaokrąglone `equity` i `prog` zawsze się różnią (różnica ≥ 1 punkt procentowy przed zaokrągleniem daje różnicę ≥ 1 po zaokrągleniu); test: wyświetlone wartości różne.
- **`progZetony` z blindem, nie stałe 0,5** (D-890): `(S − b) / (2S)`, gdzie S = `stackBb` (stos efektywny), b = `blindBb(hero)`. Przy BB i 10 bb: 9 / 20 = 45%. Pole wariantu `requiredChips` = 0,5 pomija blindy, a `required` (ICM) liczy stratę blinda przy pasie (`scenario-gen.ts:456-457`; `requiredChips` = `ICM_CHIPS_REQUIRED` z `:278`, wpisane w `:464`; CJ WYS-001); zdanie zestawiające oba progi musi mieć te same założenia.

### Kryteria akceptacji dla 08 („Liczby”)
1. Dla każdego rodzaju punktu z tabeli „Liczby” zawiera wskazane zdania; dla range-spot wiersza nie ma (do czasu zadania z częstościami).
2. Żadne zdanie nie zawiera liczby wpisanej w kluczu (test: klucze `scenario.numbers.*` w pl i en nie mają cyfr poza znacznikami `{{…}}`).
3. Nadkarty: zdanie tylko przy `nadkarty > 0`; dla `correct = fold` `trafiszRazem < required` we wszystkich wariantach testu (na ziarnach jak wyrocznia CT).
4. ICM: `progZetony` = (S − b) / (2S); `equity` i `prog` po zaokrągleniu różne; `na10` w 2–9.
5. Liczby w zdaniach zgadzają się z kwotami na przyciskach i pod stołem (ta sama funkcja kwoty, D-886).
