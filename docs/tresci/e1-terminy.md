# E1 roli 06: weryfikacja źródeł, partia `terminy` (content/terms.yaml)

Stan: 2026-11-04. Zakres: wszystkie 162 terminy (`def`, `en`, `en_alt`). Rejestr: `docs/tresci/rejestr/terminy.json` (162 wpisy, `rodzaj: termin`, id `t:<klucz>`). Dowody odczytu: `docs/tresci/odczyty/terminy.tsv` (306 wierszy, każdy cytat osobno, wszystkie `tak`). Kopie stron tylko w katalogu roboczym (scratchpad/e1-terminy), nie w repo.

## Liczby

| | liczba |
|---|---|
| wpisy | 162 |
| status potwierdzone / otwarte / sprzeczne | 162 / 0 / 0 |
| werdykt POPARTE / CZĘŚCIOWO / NIEPOPARTE / SPRZECZNE | 146 / 16 / 0 / 0 |
| najwyższy szczebel wpisu: 1 (Robert's Rules, Poker TDA 2026) | 35 |
| najwyższy szczebel wpisu: 2 (glosariusz i blog serwisu solvera) | 120 |
| najwyższy szczebel wpisu: 4 (serwisy szkoleniowe, dane populacji) | 7 |
| cytaty wg szczebla: 1 / 2 / 4 / 5 | 46 / 199 / 23 / 38 |
| level: rules / gto / math / heuristic / exploit | 65 / 48 / 26 / 17 / 6 |
| krytyczne (bankroll, ryzyko bankructwa) | 2 |

Wikipedia (szczebel 5) nigdzie nie jest jedynym źródłem definicji. Dla terminów, które w polu `source` miały tylko Wikipedię (royal-flush, two-pair, pair, high-card, connectors, second-barrel, red-zone, green-zone), dodano źródła szczebla 2 albo 4.

Sprawdzenie dosłowne cytatów z pola `source`: wszystkie znalezione, poza jednym cytatem Wikipedii, który się zmienił: four-of-a-kind, dziś „also known as quads, four cards or bomb”, a w polu `source` „quads or four cards” (`content/terms.yaml:47`). Cytaty glosariusza serwisu solvera ze strony zbiorczej (`/en/glossary/`) są tam ucięte, więc w rejestrze podano strony haseł (`/en/glossary/<hasło>/`) z pełnym tekstem.

## Wpisy z jednym serwisem jako źródłem (bez rachunku)

Serwis solvera (szczebel 2) jako jedyne źródło spoza Wikipedii, 112 terminów: four-of-a-kind, three-of-a-kind, set, high-card, wheel, pot, street, preflop, river, in-position, out-of-position, early-position, late-position, hijack, cutoff, outs, draw, flush-draw, straight-draw, oesd, gutshot, backdoor, pot-odds, implied-odds, equity, equity-realization, expected-value, combo, range, mixed-hand, open, suited, offsuit, pocket-pair, connectors, 3-bet, 4-bet, limp, isolation, texture, dry, wet, rainbow, two-tone, monotone, paired, connected, disconnected, semi-connected, top-pair, second-pair, overpair, c-bet, aggressor, range-advantage, nuts-advantage, nuts, polarized, polarization, linear, condensed, value, value-bet, bluff, semi-bluff, blocker, bluff-catcher, barrel, second-barrel, probe-bet, donk-bet, overbet, effective-stack, spr, mdf, alpha, variance, bankroll, tilt, winrate, downswing, session, stakes, standard-deviation, mental-game, shove, icm, bubble, bubble-factor, risk-premium, m-ratio, fold-equity, gap-concept, chip-ev, tournament-equity, prize-pool, payout, pay-jump, final-table, short-stack, nash-equilibrium, overcall, stack-off, exploit, vpip, nit, tag, lag, calling-station, maniac, rake, rake-cap.

Jeden serwis szczebla 4: two-pair (serwis z poradnikiem układów; plus Wikipedia), risk-of-ruin (serwis z kalkulatorami), wtsd (serwis szkoleniowy).

Słownictwo zwykle ma jednego autora definicji, więc to oczekiwane. Gdy aplikacja zyska użytkowników, drugie źródło warto dodać najpierw dla terminów rachunkowych (pot-odds, mdf, alpha, spr, equity-realization, risk-of-ruin), np. z „The Mathematics of Poker”.

## Sprzeczności i proponowane decyzje (do rejestru D-1xx)

1. **Konektory: „sąsiednie albo prawie sąsiednie”.** Wikipedia (szczebel 5): „consecutive or close to consecutive rank”. Serwis solvera (szczebel 2): suited connectors to „consecutive in rank”, a ręce z przerwą to osobne „gapper”. Decyzja: wygrywa wyższy szczebel, usunąć „albo prawie sąsiednich”. Odrzucone: zostawić bez zmian (oparcie tylko na szczeblu 5); dodać osobny termin „gapper” (to decyzja zakresu, nie poprawka).
2. **wet = dynamic, dry = static (en_alt).** Te zrównania są tylko w Wikipedii. Serwis solvera pisze o „dynamic boards”, ale ich nie zrównuje z „wet”. Decyzja: usunąć oba `en_alt` do czasu znalezienia źródła szczebla ≤ 4. Odrzucone: zostawić z adnotacją (ćwiczenie słownictwa uczyłoby synonimu bez źródła).
3. **Granica strefy czerwonej M.** Pokerlistings: 1–5. Pokerstrategy: 1 ≤ M ≤ 5. Wikipedia: 1 ≤ M < 6. Wszystkie szczebla 4–5, książki Harringtona nie przeczytano. Lekcja m11.l1 już podaje obie granice (`m11.m.red`, `m11.m.red-alt`), więc to zgodne z zasadą przedziału. Decyzja: bez zmian. Odrzucone: wybrać jedną granicę.
4. **Early position.** Hasło serwisu solvera mówi „first person to act postflop”, co nie pasuje do UTG, a jego hasło middle-position opisuje kolejność przed flopem. Definicja kursu idzie za kolejnością przed flopem, zgodnie z regulaminem (Robert's: „Action is initiated on the first betting round by the first player to the left of the blinds”). Decyzja: bez zmian, rozbieżność wewnątrz źródła odnotowana.

## Werdykty CZĘŚCIOWO (poprawka minimalna; miejsce = linia `def`)

- `content/terms.yaml:61` flush. Definicja kończy się na najwyższej karcie. Wstawić: „…, a przy równej – z wyższą kolejną”. Rozważyć też: „kolor = pięć kart tego samego symbolu (♠♥♦♣)”.
- `content/terms.yaml:129` check. Dosłownie wyklucza czekanie dużego blinda przed flopem, a m1.l1 traktuje blind jak zakład. Wstawić: „gdy nie musisz nic dopłacać … (przed flopem tak może zagrać duży blind, gdy nikt nie przebił)”.
- `content/terms.yaml:152` raise. „Muszą dołożyć różnicę albo spasować” pomija ponowne przebicie. Wstawić: „co najmniej różnicę (albo przebić dalej)”.
- `content/terms.yaml:189` side-pot. „Gracze, którzy mają jeszcze żetony” jest błędne przy kilku all-inach. Wstawić: „gracze, którzy włożyli więcej niż gracz all-in”.
- `content/terms.yaml:429` pot-odds. „Do wielkości puli” bez zakładu rywala prowadzi laika do złego rachunku. Wstawić: „do puli, którą możesz wygrać (razem z zakładem rywala)”.
- `content/terms.yaml:448` equity-realization. „Jaką część” sugeruje najwyżej 100%, a źródło opisuje nadrealizację. Wstawić: „w jakim stopniu … (może być mniej albo więcej niż swoje equity)”.
- `content/terms.yaml:517` connectors. Patrz sprzeczność 1.
- `content/terms.yaml:563` dry i `:571` wet. Patrz sprzeczność 2.
- `content/terms.yaml:620` semi-connected. Źródło używa tej nazwy przy jednym stole (T-8-3), ale jej nie definiuje. Oznaczyć jako definicję przyjętą w kursie albo znaleźć źródło.
- `content/terms.yaml:670` initiative. „A rywal najczęściej czeka na jego ruch” nie ma źródła: usunąć. Dodać `en_alt` „betting lead” (hasło serwisu solvera, które definiuje to pojęcie).
- `content/terms.yaml:800` effective-stack. „Najmniejszy ze stacków graczy w rozdaniu” jest błędne przy kilku graczach (źródło: „more than one combination of effective stacks”). Wstawić wersję dla dwóch graczy plus „przy kilku graczach osobno dla każdej pary”.
- `content/terms.yaml:807` spr. „Ile zakładów zostało do rozegrania” jest dosłownie błędne, bo pula rośnie (SPR 4 to ok. dwa zakłady wielkości puli). Wstawić: „jak głębokie są stacki w stosunku do puli”.
- `content/terms.yaml:907` tournament. Równy stack startowy nie ma przeczytanego źródła. Wstawić: „zwykle taki sam stack”.
- `content/terms.yaml:964` m-ratio. „Na ile rund” myli się z rundami licytacji, a źródło mówi o orbitach. Lekcja m11.l1 już pisze „okrążenia”. Wstawić: „na ile pełnych okrążeń stołu (orbit)”.
- `content/terms.yaml:1004` gap-concept. Źródło mówi tylko o sprawdzeniu, a zakres 3-betu bywa spolaryzowany. Usunąć „lub przebicia”.

## Jedna nazwa, jedno pojęcie (do tabeli terminologii, dokument 13)

Jedna polska nazwa dla dwóch pojęć:
- **„poker”**: układ (straight flush) i nazwa gry. W pliku obsłużone ręcznym znacznikiem, ale laik może się pomylić (np. „Kolejność z góry: poker, …” w m0.l1).
- **„kolor”**: układ (flush) i kolor karty (suit). Definicja flusha sama używa „w jednym kolorze” w drugim znaczeniu.
- **„stół”**: board i stół do gry (definicje pozycji: „miejsce przy stole”, community-cards: „na środek stołu”).
- **„wartość”**: value (zakład dla wartości) i ranga karty („dwie karty tej samej wartości” w definicjach układów). Propozycja: dla rangi używać „wysokość”, tak jak m0.l1 („decyduje jego wysokość”).
- **„runda”**: runda licytacji i okrążenie stołu (definicja M).

Dwa terminy na jedno pojęcie:
- **street / betting-round** („ulica” i „runda licytacji”): definicja ulicy jawnie mówi, że to synonim. Do decyzji, czy zostawić oba (żargon i nazwa podstawowa).
- **value / value-bet**: definicje prawie identyczne. value-bet nie ma znacznika w treści.
- **aggressor / initiative**: gracz i jego rola, definicje się pokrywają.
- **stack-off / all-in**: bliskie, ale stack-off obejmuje też sprawdzenie all-inu. Różnica jest w definicji.
- **mixed-hand**: polska nazwa to ręka, a główna angielska `en` to strategia („mixed strategy”). Lepsza para to `en` „mixing hand” (potwierdzone w blogu serwisu solvera) i `en_alt` „mixed strategy”.

## Kolejność: termin użyty przed definicją (skrypt)

Metoda: moduły według `order` w `modules.yaml`. W każdej lekcji kolejno: treść lekcji, reguły z `rules:` lekcji, ćwiczenia; potem egzamin modułu. Wystąpienie to znacznik `{{t:klucz}}`, forma z `forms` albo polska nazwa. Pominięto nazwy wieloznaczne: stół, wartość, kolor, poker, M, out, open, reg.

**A. Wynik twardy.** Pierwsze wystąpienie jest w regule, ćwiczeniu albo egzaminie, zanim termin pojawi się w treści jakiejkolwiek lekcji do tego miejsca (format: pierwsze użycie → pierwsza lekcja, w której termin jest w treści). 32 terminy:
- position: m0.l1 ćwiczenia → m3.l1
- playing-the-board: m0.l1 reguła → brak w treści lekcji
- flush-draw: m2.l1 ćwiczenia → m5.l1
- implied-odds: m2.l2 reguła → m6.l2
- stack: m2.l2 ćwiczenia → m7.l3
- out-of-position: m3.l1 reguła → m4.l1
- offsuit: m3.l1 ćwiczenia → m3.l2
- limp: m3.l1 reguła → m4.l4
- initiative: m3.l1 reguła → brak
- 3-bet: m3.l2 reguła → m4.l1
- value: m3.l2 reguła → m4.l3
- bluff: m3.l2 ćwiczenia → m4.l1
- pocket-pair: m4.l1 ćwiczenia → brak
- wetness: m5.l1 reguła → m5.l3
- overpair: m5.l2 ćwiczenia → m9.l4
- c-bet: m5.l2 ćwiczenia → m5.l3
- aggressor: m5.l2 ćwiczenia → m6.l2
- set: m5.l3 ćwiczenia → m6.l3
- check-raise: m5.l3 ćwiczenia → m5.l4
- top-pair: m5.l3 ćwiczenia → m6.l3
- alpha: m5.l3 ćwiczenia → m6.l1
- condensed: m5.l4 reguła → brak
- recreational: m6.l1 reguła → m10.l2
- cover: m7.l3 reguła → m11.l3
- overbet: m8.l2 ćwiczenia → brak
- nit, regular, maniac: m10.l1 ćwiczenia → m10.l2
- variance: m10.l4 ćwiczenia → m12.l3
- green-zone: m11.l1 ćwiczenia → brak
- final-table: m11.l3 reguła → brak
- mental-game: m12.l3 ćwiczenia → m13.l1

**B. Wynik heurystyczny** (sygnał definicji: pogrubienie, nagłówek, wiersz tabeli, tytuł ramki, „czyli/tak zwany …”, „X: …”, „X to …”; wymaga przeglądu ręcznego). Nie ma sygnału definicji w żadnej lekcji, 34 terminy: split-pot, playing-the-board, early-position, late-position, flush-draw, backdoor, pot-odds, expected-value, suited, offsuit, pocket-pair, connectors, wetness, second-pair, initiative, nuts, condensed, overbet, mental-game, tournament, cover, red-zone, green-zone, bb-ante, gap-concept, tournament-equity, prize-pool, payout, final-table, short-stack, overcall, exploit, wtsd, tag, lag, calling-station, rake-cap.

Sygnał definicji jest dopiero w późniejszej lekcji niż pierwsze użycie (format: pierwsze użycie → lekcja z sygnałem definicji):
- pot: m0.l1 → m2.l2
- board: m0.l1 → m3.l1
- small-blind, big-blind: m1.l1 → m3.l1
- chips: m1.l1 → m7.l3
- street: m5.l4 → m9.l3
- mixed-hand: m3.l3 → m10.l3
- in-position: m4.l1 → m4.l3
- 4-bet: m4.l1 → m4.l3
- connected: m4.l2 → m5.l1
- bluff-catcher: m8.l2 → m8.l4
- barrel, second-barrel: m7.l1 → m7.l4
- winrate: m10.l1 → m12.l1
- session: m10.l1 → m12.l3
- standard-deviation: m10.l3 → m12.l1
- rake: m3.l3 → m10.l4
- oraz terminy z listy A

Najważniejsze do przeglądu: pot-odds (używane od m2, bez zdania definiującego w treści), expected-value (m2.l2), recreational i cover (w regułach o kilka modułów przed lekcją), overpair (m5 → m9), mixed-hand (m3.l3 → m10.l3), rake (m3.l3 → m10.l4), standard-deviation i winrate (m10 → m12). Aplikacja ma ekran słowniczka z definicją (`apps/mobile/src/app/glossary.tsx`), ale nie pokazuje jej w miejscu użycia.

Bez znacznika w treści: outs, polarization, value-bet, m-ratio, heads-up, stack-off i tilt występują w polskiej, angielskiej lub spolszczonej formie bez znacznika (reguła T-01). donk-bet, chip-ev, pay-jump i dead-money nie występują w lekcjach, egzaminach ani regułach. Są tylko w słowniczku i ćwiczeniu słownictwa.

## Brakujące granice stosowania (propozycje, nie tekst)

- small-blind i big-blind: w heads-up mały blind jest na Buttonie (TDA 2026, reguła 36-C: „Heads-up, the small blind is the button”). Definicje „gracz na lewo od Buttona” tego nie obejmują.
- oesd: A-K-Q-J i A-2-3-4 to cztery kolejne karty, ale draw jednostronny (4 outy). Warto dopisać w m2.l1.
- late-position: „działają jako ostatnie” dotyczy gry po flopie.
- straight-draw: lista odmian pomija double gutshot (8 outów).
- rainbow: na takim flopie możliwy jest draw backdoor do koloru.

## Otwarte pytania

- [DO USTALENIA] mixed-hand: zamienić `en` z „mixed strategy” na „mixing hand” (decyzja terminologiczna, dokument 13).
- [DO USTALENIA] `en_alt` z oparciem tylko w Wikipedii: hole-cards „pocket cards”, high-card „no pair”, oesd „outside straight draw” i „double-ended straight draw”, second-barrel „second barrel” („double barrel” potwierdzony u serwisu solvera), dry „static”, wet „dynamic”. Szukać źródła szczebla ≤ 4 albo usunąć.
- [DO USTALENIA] exploit `en_alt` „exploitative play”: serwis solvera używa „exploitative strategy”.
- [DO USTALENIA] street i betting-round: zostawić oba terminy czy zostawić jeden, a drugi oznaczyć jako synonim.

## Strony niedostępne

- PokerStars, ranking układów (pokerstars.com/poker/games/rules/hand-rankings/): przekierowuje na stronę zakładów FanDuel. Zamiennik: Wikipedia i serwis z poradnikiem układów, dla dwóch par szczebel 4.
- Wikipedia M-ratio: pierwsza próba zwróciła HTTP 429, druga się udała.
- Na czytanych stronach nie było instrukcji dla modelu.
