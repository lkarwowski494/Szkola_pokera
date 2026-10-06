# Audyt słowniczka (content/terms.yaml)

Data: 6 października 2026. Gałąź `slowniczek-audyt`. Zakres: wszystkie 162 terminy. Część A (audyt) bez zmian nazw w treści; część B dodała pole `def` z definicjami z tego raportu.

## Wynik w skrócie

- **OK:** 127 terminów (polska nazwa potwierdzona w polskich źródłach, angielska poprawna).
- **Zmienić nazwę PL:** 26 (kalki, których polskie źródła nie używają, albo forma wyraźnie rzadsza od innej).
- **Poprawić en_alt:** 2 (trójka, winrate; trzecia poprawka en_alt, „merged” przy `linear`, jest w grupie „nie potwierdzono”); **poprawić cytat źródła EN:** 1.
- **Nie potwierdzono polskiej nazwy:** 6 (brak przeczytanego polskiego źródła; do decyzji, nie do zgadywania).
- **Brak definicji** dotyczył wszystkich 162 terminów. Pole `def` jest już w `terms.yaml` i w `terms.generated.ts`; ekrany i ćwiczenie jeszcze go nie pokazują (decyzja właściciela).

Zgłoszenie właściciela potwierdziło się tylko częściowo. „Ulica” jest w polskim użyciu (GGPoker PL, PokerGround, PokerStrategy PL); brakowało jej definicji, nazwa jest w porządku. Kalkami, których nikt nie używa, okazały się natomiast: orzechy, przewaga orzechowa, dobieranie (i pochodne), beczka/druga beczka (w PokerGround sporadycznie), wpychanie, przykrywać, łącznik, bańka, zjazd, nadpara, półblef, tęczowy, monotoniczny, rozłączony, gra stół, premia za ryzyko, krótki stack, ante dużego blinda. Po stronie angielskiej: `trójka` miała w en_alt „set” (i „trips”), `liniowy` miał „merged”, `winrate` miał jednostkę „bb/100”.

## Metoda i źródła

Hierarchia z CLAUDE.md dotyczy treści merytorycznej. Tu pytanie brzmi, jakiej nazwy używają polscy gracze, więc rozstrzyga przeczytany polski tekst. Źródła (wszystkie pobrane i przeczytane w całości, cytaty dosłowne):

1. Wikipedia PL: [Poker](https://pl.wikipedia.org/wiki/Poker) (tabela układów z nazwami angielskimi, lista zagrań) i [Texas Hold’em](https://pl.wikipedia.org/wiki/Texas_Hold%E2%80%99em).
2. [Słownik PokerStrategy PL](https://polska.pokerstrategy.com/glossary/): 411 haseł, każde czytane osobno (adres hasła przy cytacie).
3. [GGPoker PL, Terminy pokera](https://pl.ggpoker.net/poker-school/poker-terms/): oficjalny słownik polskiej wersji pokoju.
4. Korpus użycia, czyli pełne treści artykułów pobrane przez publiczne API WordPress: **PokerStrategy PL**, 740 artykułów strategii (ok. 11 MB tekstu, kolumna „PS”), oraz **PokerGround.com**, 1011 artykułów z kategorii Strategia, Podstawy, Słownik i Zasady gry (ok. 5 MB, kolumna „PG”). PokerGround to polski serwis społecznościowo-informacyjny. PokerStrategy PL to głównie tłumaczenia szkoły PokerStrategy, starsze (era SSS/BSS), więc liczby z obu korpusów podaję osobno.

Liczby wystąpień to dopasowania wyrażeń regularnych do form wyrazu w tekstach artykułów. Są przybliżone: słowa wieloznaczne, np. „stół” czy „para”, łapią też inne znaczenia. Służą do porównania dwóch nazw tego samego pojęcia, a nie jako miara bezwzględna. Ograniczenia: korpus to polskie media pokerowe online, a nie mowa przy stole na żywo. Fora (np. dyskusje PokerStrategy) i polskie tłumaczenia książek nie były dostępne do pobrania.

Nazwy angielskie sprawdzałem względem cytatów już zapisanych w polu `source` (GTO Wizard, Robert’s Rules, Wikipedia EN) i względem polskich słowników, które podają nazwę angielską. Definicje opierają się na cytacie z `source`; tam, gdzie polski słownik podaje inne znaczenie, zaznaczam to w uwagach (probe bet, nit, wypłata).

## Proponowane zmiany (do zatwierdzenia przez koordynatora, ADR-24)

Wpływ: znaczniki `{{t:klucz|forma}}` (z jawną polską formą, do przepisania ręcznie) i `{{t:klucz}}` (bez formy, nazwa podstawi się sama, ale trzeba sprawdzić zgodność rodzaju i przypadka sąsiednich słów, np. „otwarte dobieranie” → „OESD”). „Kod” oznacza polskie formy terminu i znaczniki w `apps/mobile/src` oraz `packages/*` (teksty aplikacji, testy, komentarze).

| klucz | obecnie | propozycja | lekcje: z formą / bez | rules.yaml: z formą / bez | pliki lekcji | kod (wystąpienia; pliki) |
|---|---|---|---|---|---|---|
| `three-of-a-kind` | trójka / three of a kind / en_alt: trips, set | **poprawić en_alt**: en_alt: usunąć „set” (osobny termin `set`) i „trips” (odmiana trójki, nie synonim) | — (tylko terms.yaml) | — (tylko terms.yaml) | — | — |
| `wheel` | koło / wheel | **zmienić nazwę PL**: pl: „wheel” (bez nawiasu, T-01) | 0 / 1 | 0 / 0 | 1 | 2 (evaluate.ts, reference-evaluator.ts) |
| `playing-the-board` | gra stół / playing the board / en_alt: play the board | **zmienić nazwę PL**: pl: „gra na stole” (GGPoker PL); forma „gra stół” nie występuje w żadnym źródle | 0 / 1 | 0 / 1 | 2 | 3 (core.test.ts, evaluate.ts, text.pl.ts) |
| `chips` | żetony / chips | **poprawić cytat źródła EN**: source: cytat dotyczy stacku („STACK: Chips in front of a player.”), nie żetonów; podmienić na hasło o żetonach | — (tylko terms.yaml) | — (tylko terms.yaml) | — | — |
| `draw` | dobieranie / draw | **zmienić nazwę PL**: pl: „draw” (odmiana: drawa, drawy, drawów, drawem); „dobieranie” to dosłowna kalka | 110 / 22 | 27 / 6 | 22 | 47 (bots.ts, core.test.ts, draws.ts, drills.ts, grading.ts, holding.test.ts, holding.ts, pl.ts, play.ts, situation.ts, text.pl.ts, texture.test.ts, texture.ts) |
| `flush-draw` | dobieranie do koloru / flush draw | **zmienić nazwę PL**: pl: „draw do koloru” (w nawiasie flush draw) | 21 / 15 | 0 / 2 | 15 | 8 (drills.ts, text.pl.ts) |
| `straight-draw` | dobieranie do strita / straight draw | **zmienić nazwę PL**: pl: „draw do strita” (w nawiasie straight draw) | 2 / 6 | 0 / 1 | 5 | 22 (text.pl.ts, texture.test.ts, texture.ts) |
| `oesd` | otwarte dobieranie do strita / open-ended straight draw / en_alt: outside straight draw, double-ended straight draw | **zmienić nazwę PL**: pl: „OESD” (skrót jak UTG; w nawiasie open-ended straight draw); w mowie także „open-ended” | 4 / 10 | 0 / 1 | 8 | 21 (core.test.ts, draws.ts, drills.ts, engine.test.ts, engine.ts, text.pl.ts) |
| `mixed-hand` | ręka mieszana / mixing hand | **nie potwierdzono (polska nazwa)**: pl „ręka mieszana” nie występuje w źródłach; w użyciu jest „mieszana strategia” („ręka grana mieszaną strategią”). en „mixing hand” to sformułowanie z artykułu GTO Wizard, nie hasło słownikowe (glosariusz: „Mixed strategy”) | 8 / 0 | 1 / 0 | 4 | 7 (engine.test.ts, grade.ts, index.ts, text.pl.ts) |
| `pocket-pair` | para w ręce / pocket pair | **zmienić nazwę PL**: pl: „pocket para” (PokerStrategy PL) albo „para z ręki” (PokerGround) | 1 / 0 | 0 / 0 | 1 | 1 (holding.ts) |
| `connectors` | łącznik / connectors / en_alt: connector | **zmienić nazwę PL**: pl: „konektory” (PokerStrategy PL) albo „connectory” (PokerGround); „łącznik” nie występuje w żadnym źródle | 13 / 1 | 5 / 0 | 9 | 1 (bots.ts) |
| `rainbow` | tęczowy / rainbow | **zmienić nazwę PL**: pl: „rainbow” (rzadziej rzeczownik „tęcza”); przymiotnik „tęczowy” prawie nie występuje | 0 / 2 | 0 / 0 | 1 | 4 (text.pl.ts, texture.ts) |
| `monotone` | monotoniczny / monotone | **zmienić nazwę PL**: pl: „jednokolorowy” (PokerStrategy PL) albo „monotonny” (PokerGround); „monotoniczny” nie występuje | 6 / 5 | 0 / 2 | 3 | 7 (text.pl.ts, texture.test.ts, texture.ts) |
| `disconnected` | rozłączony / disconnected | **zmienić nazwę PL**: pl: „niepołączony” | 0 / 1 | 0 / 0 | 1 | 6 (text.pl.ts, texture.test.ts, texture.ts) |
| `semi-connected` | półpołączony / semi-connected | **nie potwierdzono (polska nazwa)**: polska nazwa nie potwierdzona; brak odpowiednika w źródłach | 3 / 0 | 1 / 0 | 3 | 8 (text.pl.ts, texture.test.ts, texture.ts) |
| `wetness` | mokrość / wetness | **nie potwierdzono (polska nazwa)**: polska nazwa „mokrość” nie występuje w żadnym źródle | 1 / 0 | 2 / 0 | 2 | 11 (index.ts, text.pl.ts, texture.test.ts, texture.ts) |
| `overpair` | nadpara / overpair | **zmienić nazwę PL**: pl: „overpara” (odmiana: overpary, overparę, overparą); „nadpara” nie występuje | 1 / 1 | 0 / 1 | 3 | 0 |
| `nuts-advantage` | przewaga orzechowa / nuts advantage | **zmienić nazwę PL**: pl: „przewaga nutsów” | 10 / 4 | 1 / 3 | 5 | 0 |
| `nuts` | orzechy / nuts | **zmienić nazwę PL**: pl: „nuts” (odmiana: nutsa, nutsy, nutsów; przymiotnik „nutsowy”) | 1 / 0 | 0 / 0 | 1 | 0 |
| `linear` | liniowy / linear / en_alt: merged | **nie potwierdzono (polska nazwa)**: pl „liniowy” w znaczeniu zakresu nie występuje (w korpusie „liniowo” tylko w znaczeniu matematycznym); en_alt: usunąć „merged” – według GTO Wizard (cytat już w polu source) merged to kształt pośredni między linear a polarized, nie synonim | 7 / 1 | 1 / 0 | 4 | 0 |
| `semi-bluff` | półblef / semi-bluff | **zmienić nazwę PL**: pl: „semiblef” (PokerStrategy PL) lub „semi-blef” (PokerGround); „półblef” prawie nie występuje | 11 / 7 | 1 / 2 | 5 | 0 |
| `barrel` | beczka / barrel | **zmienić nazwę PL**: pl: „barrel” („beczka” jako potoczny wariant) | 0 / 0 | 0 / 0 | 0 | 0 |
| `second-barrel` | druga beczka / second barrel / en_alt: double barrel | **zmienić nazwę PL**: pl: „second barrel” | 16 / 3 | 3 / 0 | 3 | 0 |
| `alpha` | alpha / alpha | **nie potwierdzono (polska nazwa)**: nazwa „alpha” nie występuje w polskich źródłach (nazwa angielska, więc bez kalki do poprawienia) | 0 / 4 | 0 / 2 | 3 | 0 |
| `winrate` | winrate / win rate / en_alt: bb/100 | **poprawić en_alt**: en_alt: usunąć „bb/100” (to jednostka winrate, nie synonim); jednostka jest w definicji | — (tylko terms.yaml) | — (tylko terms.yaml) | — | — |
| `downswing` | zjazd / downswing | **zmienić nazwę PL**: pl: „downswing” | 15 / 13 | 1 / 2 | 3 | 5 (GlossaryScreen.test.tsx, glossary.test.ts, glossary.ts) |
| `shove` | wpychanie / shove / en_alt: jam, push | **zmienić nazwę PL**: pl: „shove” (PokerGround) albo „push” (PokerStrategy PL); „wpychanie” prawie nie występuje | 8 / 0 | 6 / 0 | 4 | 0 |
| `bubble` | bańka / bubble | **zmienić nazwę PL**: pl: „bubble” | 5 / 0 | 0 / 1 | 2 | 10 (GlossaryScreen.test.tsx, engine.test.ts, engine.ts, glossary.test.ts, icm.ts, index.ts, text.pl.ts) |
| `cover` | przykrywać / cover | **zmienić nazwę PL**: pl: „pokrywać” („pokrywasz go” = masz więcej żetonów) | 3 / 0 | 1 / 0 | 2 | 0 |
| `risk-premium` | premia za ryzyko / risk premium | **zmienić nazwę PL**: pl: „risk premium” | 2 / 2 | 0 / 1 | 2 | 1 (text.pl.ts) |
| `bb-ante` | ante dużego blinda / big blind ante / en_alt: BB ante | **zmienić nazwę PL**: pl: „big blind ante” (skrót BB ante) | 0 / 1 | 0 / 0 | 1 | 0 |
| `tournament-equity` | equity turniejowe / tournament equity | **nie potwierdzono (polska nazwa)**: pl „equity turniejowe” nie występuje; słownik PokerStrategy PL ma hasło „$EV” | 1 / 0 | 0 / 0 | 1 | 0 |
| `pay-jump` | skok wypłaty / pay jump | **zmienić nazwę PL**: pl: „pay jump” („skok wypłat” rzadziej) | 0 / 0 | 0 / 0 | 0 | 0 |
| `short-stack` | krótki stack / short stack | **zmienić nazwę PL**: pl: „short stack” (też „shortstack”) | 8 / 1 | 1 / 0 | 3 | 1 (icm.test.ts) |
| `regular` | regular / regular / en_alt: reg | **zmienić nazwę PL**: pl: „reg” (PokerGround); PokerStrategy PL pisze „regulars” | 4 / 1 | 0 / 1 | 4 | 0 |

Razem dla zmian nazw PL i terminów „nie potwierdzono”: lekcje 261 znaczników z formą i 102 bez formy, rules.yaml 51 z formą i 26 bez formy, w kodzie 165 wystąpień. Największy koszt to `draw` (110 + 22 w lekcjach, 27 + 6 w regułach, 47 w kodzie) razem z `flush-draw`, `straight-draw` i `oesd`. Zmiana `dobieranie` → `draw` zmienia też rodzaj gramatyczny (nijaki → męski), więc trzeba przejrzeć każde wystąpienie, także bez formy. Przy każdej zmianie nazwy trzeba też podmienić pole `forms`; po zmianie content-build sam wskaże wszystkie formy bez znacznika.

## Nie potwierdzono (bez przeczytanego polskiego źródła)

- `mixed-hand` (ręka mieszana / mixing hand): pl „ręka mieszana” nie występuje w źródłach; w użyciu jest „mieszana strategia” („ręka grana mieszaną strategią”). en „mixing hand” to sformułowanie z artykułu GTO Wizard, nie hasło słownikowe (glosariusz: „Mixed strategy”). Do decyzji koordynatora: zostawić termin roboczy z jawnym oznaczeniem albo przejść na „mieszana strategia (mixed strategy)”.
- `semi-connected` (półpołączony / semi-connected): polska nazwa nie potwierdzona; brak odpowiednika w źródłach. Do decyzji: opis zamiast nazwy („stół z drawami do strita, ale bez gotowego strita”).
- `wetness` (mokrość / wetness): polska nazwa „mokrość” nie występuje w żadnym źródle. Słownik PokerStrategy PL opisuje to inaczej: „nie jest wcale lub tylko w niewielkim stopniu skoordynowany”. Do decyzji: opis („jak bardzo mokry jest stół”) zamiast rzeczownika.
- `linear` (liniowy / linear): pl „liniowy” w znaczeniu zakresu nie występuje (w korpusie „liniowo” tylko w znaczeniu matematycznym); en_alt: usunąć „merged” – według GTO Wizard (cytat już w polu source) merged to kształt pośredni między linear a polarized, nie synonim. Słownik PokerStrategy PL ma hasło „Merging / (merged range)”, czyli zakres niespolaryzowany. Do decyzji: zostawić „liniowy” jako nazwę roboczą (oznaczoną) albo używać „linear” bez tłumaczenia.
- `alpha` (alpha / alpha): nazwa „alpha” nie występuje w polskich źródłach (nazwa angielska, więc bez kalki do poprawienia). 
- `tournament-equity` (equity turniejowe / tournament equity): pl „equity turniejowe” nie występuje; słownik PokerStrategy PL ma hasło „$EV”. Do decyzji: „$EV” albo opis („Twoja część puli nagród”).

## Część B: pole `def`

- Schemat: `def` (opcjonalny tekst, min. 10 znaków, bez znaczników `{{…}}`) w `TermEntry` (`packages/content-schema`), w `CompiledTerm` i w module `apps/mobile/src/data/content/terms.generated.ts` (`AppTerm.def`). Wypełnione dla 162/162 terminów.
- Definicje opisują pojęcie, a nie nazwę: tam, gdzie nazwa PL jest do zmiany, definicja nie używa spornego słowa, więc po zmianie nazw nie trzeba jej przepisywać.
- Tabeli `terms` w bazie `content-v4.db` nie zmieniałem, bo aplikacja czyta terminy z `terms.generated.ts`. Dlatego nie podbiłem też `CONTENT_SCHEMA_VERSION`, mimo komentarza „zmiana tego pliku = zmiana wersji schematu”: w poprzedniej zmianie (e1341c7) podbicie wynikało z nowej tabeli w bazie. Jeśli koordynator woli trzymać się reguły dosłownie, druga opcja to kolumna `def` w tabeli `terms` i wersja 5.
- Ekrany (`glossary.tsx`) i ćwiczenie (`vocab.ts`) bez zmian: sposób pokazania definicji wybiera właściciel.

## Wszystkie terminy

Format: polska nazwa / angielska (en_alt). **Werdykt.** Użycie: liczba wystąpień nazwy w korpusie PS / PG (dla zmian także dawnej nazwy). Cytat polski: źródło, adres, cytat. Definicja (pole `def`). Uwagi.

### `royal-flush`: poker królewski / royal flush

- **Werdykt: OK**.
- Użycie w korpusie: PS 18, PG 33.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „Poker królewski / Royal flush / Poker złożony z kart od asa do dziesiątki”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Najwyższy układ w pokerze: as, król, dama, walet i dziesiątka w jednym kolorze, np. A♠ K♠ Q♠ J♠ T♠.

### `straight-flush`: poker / straight flush

- **Werdykt: OK**.
- Użycie w korpusie: PS 0, PG 0.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Straight-Flush/: „Układ złożony z pięciu kolejnych kart w tym samym kolorze. Popularnie zwany pokerem.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pięć kolejnych kart w jednym kolorze, np. 5♥ 6♥ 7♥ 8♥ 9♥. Najwyższa odmiana (od asa) to poker królewski.
- Uwagi: Wikipedia PL i PokerStrategy PL: „poker” = straight flush. Uwaga: „poker” to też nazwa gry, więc w tekście często „strit w kolorze”.

### `four-of-a-kind`: kareta / four of a kind (quads)

- **Werdykt: OK**.
- Użycie w korpusie: PS 81, PG 83.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „Kareta / Four of a kind (Quads) / Cztery karty o tej samej wartości.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Cztery karty tej samej wartości, np. cztery siódemki. Remis rozstrzyga piąta karta (kicker).

### `full-house`: full / full house (boat)

- **Werdykt: OK**.
- Użycie w korpusie: PS 0, PG 0.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „Ful (także full) / Full house / Układ składający się z trójki i pary.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Trójka i para w jednym układzie, np. trzy damy i dwie piątki. Przy dwóch fullach wygrywa wyższa trójka.
- Uwagi: Wikipedia PL podaje pisownię „ful (także full)”.

### `flush`: kolor / flush

- **Werdykt: OK**.
- Użycie w korpusie: PS 0, PG 0.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „Kolor / Flush / Pięć kart w tym samym kolorze, nienastępujących po sobie.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pięć kart w jednym kolorze, które nie idą po kolei. Przy dwóch kolorach wygrywa ten z wyższą najwyższą kartą.

### `straight`: strit / straight

- **Werdykt: OK**.
- Użycie w korpusie: PS 1145, PG 527.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „Strit / Straight / Pięć kart następujących po sobie”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pięć kolejnych kart, nie wszystkie w jednym kolorze, np. 5-6-7-8-9. As może być najwyższą (A-K-Q-J-T) albo najniższą kartą (A-2-3-4-5).

### `three-of-a-kind`: trójka / three of a kind (trips, set)

- **Werdykt: poprawić en_alt**. en_alt: usunąć „set” (osobny termin `set`) i „trips” (odmiana trójki, nie synonim)
- Użycie w korpusie: PS 496, PG 91.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/trojka/: „Trójka to inaczej 3oak (three of a kind) - układ w postaci trzech kart tej samej wartości. Występują dwa rodzaje trójki - set, który składa się z pary na ręce i jednej karty na stole oraz trips, który składa się z pary na stole i jednej karty na ręce.”
- Nazwa angielska: do poprawy (patrz werdykt).
- Definicja: Trzy karty tej samej wartości i dwie inne. W hold'emie ma dwie odmiany: set (para w ręce i trzecia karta na stole) oraz trips (para na stole i trzecia karta w ręce).
- Uwagi: PokerStrategy PL (https://polska.pokerstrategy.com/glossary/trojka/): „Występują dwa rodzaje trójki - set, który składa się z pary na ręce i jednej karty na stole oraz trips, który składa się z pary na stole i jednej karty na ręce.” GGPoker PL (https://pl.ggpoker.net/poker-school/poker-terms/), hasło Trips: „Różni się to od seta, gdzie trójka powstaje, gdy para z ręki łączy się z jedną kartą na flopie”. Wikipedia EN mówi „also known as trips or a set”, ale GTO Wizard (już w polu source) zastrzega „are often different”. Część wspólna: three of a kind to nazwa nadrzędna, set i trips to jej odmiany. Ćwiczenie słownictwa nie powinno uznawać „set” za tłumaczenie „trójki”.

### `set`: set / set

- **Werdykt: OK**.
- Użycie w korpusie: PS 898, PG 553.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Set/: „Trzy karty tej samej wartości, utworzone z jednej karty wspólnej i dwóch na ręce.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Trójka zbudowana z pary w ręce i jednej karty na stole, np. 7♣ 7♦ na flopie K-7-2.

### `two-pair`: dwie pary / two pair

- **Werdykt: OK**.
- Użycie w korpusie: PS 448, PG 201.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „Dwie pary / Two pair / Układ składający się z dwóch różnych par.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Dwie różne pary i piąta karta, np. K-K-8-8-3. Remis rozstrzyga najpierw wyższa para, potem niższa, na końcu piąta karta.

### `pair`: para / pair (one pair)

- **Werdykt: OK**.
- Użycie w korpusie: PS 2896, PG 1486.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „Para / One pair / Dwie karty o takiej samej wartości.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Dwie karty tej samej wartości i trzy inne, np. dwie dziewiątki. Słabszy jest tylko układ wysokiej karty.

### `high-card`: wysoka karta / high card (no pair)

- **Werdykt: OK**.
- Użycie w korpusie: PS 222, PG 125.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „Wysoka karta / High card / Każdy układ kart, który nie kwalifikuje się do powyższych układów”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Układ bez pary ani lepszej kombinacji; o sile decyduje najwyższa karta, a przy remisie kolejne.
- Uwagi: Wikipedia PL: „Wysoka karta”; słownik PokerStrategy PL ma hasło „Najwyższa karta”. Obie nazwy w użyciu.

### `kicker`: kicker / kicker

- **Werdykt: OK**.
- Użycie w korpusie: PS 528, PG 152.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Top-Kicker/: „Najwyższa karta, która nie wchodzi w skład układu.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Najwyższa karta spoza układu, która rozstrzyga remis. Przykład: para asów z królem wygrywa z parą asów z damą, bo ma lepszy kicker.

### `wheel`: koło / wheel

- **Werdykt: zmienić nazwę PL**. pl: „wheel” (bez nawiasu, T-01)
- Użycie w korpusie: PS 26, PG 14; obecna nazwa „koło”: PS 14, PG 2.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Wheel/: „Wheel, bike lub bicycle, to strit składający się z A, 2, 3, 4, 5.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Najniższy strit: A-2-3-4-5, w którym as liczy się jako najniższa karta.
- Uwagi: Słownik PokerStrategy PL ma hasło „Wheel” (https://polska.pokerstrategy.com/glossary/Wheel/): „Wheel, bike lub bicycle, to strit składający się z A, 2, 3, 4, 5.” W korpusie „wheel” przeważa, „koło” występuje rzadko.

### `check`: czekanie / check

- **Werdykt: OK**.
- Użycie w korpusie: PS 168, PG 151.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „czekanie (ang. check) – gracz nie przebija stawki ani nie pasuje, czekając na ruch innych graczy. Czekanie jest możliwe tylko wtedy, gdy stawka w danej rundzie…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Granie dalej bez stawiania żetonów, możliwe tylko wtedy, gdy w tej rundzie licytacji nikt jeszcze nie postawił.

### `bet`: zakład / bet

- **Werdykt: OK**.
- Użycie w korpusie: PS 8316, PG 1745.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „postawienie (ang. bet) – jest to pierwsze postawienie zakładu w określonej rundzie.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pierwsze postawienie żetonów w rundzie licytacji, w której nikt jeszcze nie stawiał.
- Uwagi: Wikipedia PL nazywa bet „postawienie (ang. bet)”; w korpusie dominuje „zakład” i spolszczone „bet/betować”.

### `call`: sprawdzenie / call

- **Werdykt: OK**.
- Użycie w korpusie: PS 2488, PG 977.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „sprawdzenie (ang. call) – gracz wyrównuje do kwoty postawionej w danej rundzie przez innego gracza.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Dołożenie do puli tyle, ile wynosi zakład lub przebicie rywala, żeby grać dalej.

### `raise`: przebicie / raise

- **Werdykt: OK**.
- Użycie w korpusie: PS 863, PG 545.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „podbicie (ang. raise) – gracz przebija stawkę i zmusza innych zawodników do wyrównania, przebicia bądź spasowania. Po podbiciu inni gracze nie mogą wykonać…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Podniesienie stawki ponad zakład rywala; pozostali muszą dołożyć różnicę albo spasować. W polskich tekstach także „podbicie”.
- Uwagi: Obie nazwy w użyciu: Wikipedia PL i PokerStrategy PL częściej „podbicie”, PokerGround i GGPoker PL częściej „przebicie”. Bez zmiany; „podbicie” wymienione w definicji.

### `fold`: pas / fold

- **Werdykt: OK**.
- Użycie w korpusie: PS 3153, PG 924.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „pas (ang. fold) – rzucenie kart – równoznaczne z rezygnacją z dalszej gry w danym rozdaniu. Gracz traci wszystkie żetony, które postawił w rozdaniu.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Rezygnacja z rozdania: oddajesz karty i tracisz to, co już włożyłeś do puli.

### `check-raise`: check-raise / check-raise

- **Werdykt: OK**.
- Użycie w korpusie: PS 143, PG 279.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Check-raise/: „Check-raise to kombinacja zagrań, składająca się z czekania i następnie podbicia zakładu przeciwnika.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Najpierw czekasz, a gdy rywal postawi, przebijasz go w tej samej rundzie licytacji.

### `all-in`: all-in / all-in

- **Werdykt: OK**.
- Użycie w korpusie: PS 1334, PG 833.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „va banque (ang. all-in) – gracz kładzie do puli wszystkie posiadane przez siebie żetony, a w przypadku porażki traci je wszystkie i przerywa grę.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Postawienie wszystkich swoich żetonów. Od każdego rywala możesz wtedy wygrać najwyżej tyle, ile sam włożyłeś; o resztę gra się w puli bocznej.

### `pot`: pula / pot

- **Werdykt: OK**.
- Użycie w korpusie: PS 5992, PG 2786.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „va banque (ang. all-in) – gracz kładzie do puli wszystkie posiadane przez siebie żetony”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Wszystkie żetony postawione w bieżącym rozdaniu. Zabiera je najlepszy układ na showdownie albo gracz, przy którym wszyscy spasowali.

### `side-pot`: pula boczna / side pot

- **Werdykt: OK**.
- Użycie w korpusie: PS 0, PG 1.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Pula-boczna/: „Pula boczna powstaje w sytuacji, gdy jeden z graczy uczestniczących w rozdaniu zagrał all-in”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Osobna pula, która powstaje, gdy ktoś gra all-in: grają o nią tylko gracze, którzy mają jeszcze żetony, więc gracz all-in nie może jej wygrać.

### `split-pot`: podział puli / split pot

- **Werdykt: OK**.
- Użycie w korpusie: PS 59, PG 15.
- Cytat polski: Wikipedia PL, Texas Hold’em, https://pl.wikipedia.org/wiki/Texas_Hold%E2%80%99em: „…ma wyższą piątą kartę (piąta karta może być wybrana zarówno z ręki, jak i ze stołu), jeśli także jest taka sama to jest remis i następuje podział puli.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Podział puli między graczy z równymi układami, np. gdy obaj grają ten sam strit leżący na stole.

### `playing-the-board`: gra stół / playing the board (play the board)

- **Werdykt: zmienić nazwę PL**. pl: „gra na stole” (GGPoker PL); forma „gra stół” nie występuje w żadnym źródle
- Użycie w korpusie: PS 0, PG 0; obecna nazwa „gra stół”: PS 0, PG 0.
- Cytat polski: GGPoker PL, Terminy pokera, https://pl.ggpoker.net/poker-school/poker-terms/: „Jeśli najlepsza ręka gracza podczas showdownu znajduje się na stole bez użycia kart własnych, mówi się, że gracz gra na stole.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Sytuacja, w której Twój najlepszy pięciokartowy układ to same karty wspólne; karty własne nic nie dodają, więc w najlepszym razie dzielisz pulę.
- Uwagi: GGPoker PL, hasło Play the board: „Jeśli najlepsza ręka gracza podczas showdownu znajduje się na stole bez użycia kart własnych, mówi się, że gracz gra na stole.” Uwaga: „grać na stole” w korpusie częściej znaczy „grać przy stole”, więc w tekście lepiej opisowo („Twój układ to same karty wspólne”).

### `board`: stół / board

- **Werdykt: OK**.
- Użycie w korpusie: PS 2935, PG 1070.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Dry-Suchy_2031/: „Dry (suchy) board opisuje stół, który nie zawiera wcale albo zawiera bardzo mało drawów.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Odkryte karty wspólne na środku stołu (flop, turn, river), z których korzystają wszyscy gracze.
- Uwagi: W korpusie także „board” (PokerGround częściej „board”).

### `community-cards`: karty wspólne / community cards

- **Werdykt: OK**.
- Użycie w korpusie: PS 458, PG 131.
- Cytat polski: Wikipedia PL, Texas Hold’em, https://pl.wikipedia.org/wiki/Texas_Hold%E2%80%99em: „Po rundzie licytacji, kiedy wszyscy włożyli taką samą ilość pieniędzy do puli (lub spasowali), na stół wykładany jest flop. Są to trzy karty wspólne (ang. community cards), których może użyć każdy z graczy (karty wspólne są odkryte). Następuje druga runda licytacji począwszy od…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Karty wykładane odkryte na środek stołu, których każdy gracz może użyć do swojego układu; w hold'emie jest ich pięć.

### `hole-cards`: karty własne / hole cards (pocket cards)

- **Werdykt: OK**.
- Użycie w korpusie: PS 6, PG 51.
- Cytat polski: Wikipedia PL, Texas Hold’em, https://pl.wikipedia.org/wiki/Texas_Hold%E2%80%99em: „…ostatnia już runda licytacji, po której następuje wyłożenie kart. Gracze mogą użyć dowolnych 5 kart z 7 dostępnych (5 kart wspólnych i 2 karty własne), aby ułożyć najlepszy układ.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Dwie zakryte karty, które w hold'emie dostajesz na początku rozdania; widzisz je tylko Ty.
- Uwagi: PokerStrategy PL częściej „karty startowe”.

### `small-blind`: mały blind / small blind [SB]

- **Werdykt: OK**.
- Użycie w korpusie: PS 42, PG 18.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/bss/zasada-zwezajacego-sie-zasiegu/: „…BB, gra na 4 stołach i do tej pory nie widziałeś, żeby blefował. Możesz zatem założyć, że jest on TAGiem. Przeciętny zasięg sprawdzenia z małego blinda u TAGa wygląda następująco: TT-22, AJs-ATs, KTs+, QTs+, JTs, AJo-ATo, KJo+ (#134) Flop Flop: ($2.25) (2 players) SB checks, Hero bets…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Mniejsza obowiązkowa stawka wpłacana przed rozdaniem przez gracza na lewo od Buttona; tak nazywa się też to miejsce przy stole.
- Uwagi: Wikipedia PL używa „mała ciemna (small blind)”; korpus strategiczny prawie wyłącznie „blind”.

### `big-blind`: duży blind / big blind [BB]

- **Werdykt: OK**.
- Użycie w korpusie: PS 68, PG 28.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Limp/: „W grach, w których występują blindy, gracz limpuje, kiedy wykonując swój pierwszy ruch sprawdza blindy. Sprawdza dużego blinda, ale nie przebija.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Większa obowiązkowa stawka wpłacana przed rozdaniem przez drugiego gracza na lewo od Buttona; tak nazywa się też to miejsce. Służy też za jednostkę stacków i wyników (bb).
- Uwagi: jw.: Wikipedia PL „duża ciemna (big blind)”.

### `chips`: żetony / chips

- **Werdykt: poprawić cytat źródła EN**. source: cytat dotyczy stacku („STACK: Chips in front of a player.”), nie żetonów; podmienić na hasło o żetonach
- Użycie w korpusie: PS 1164, PG 1202.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „…najczęściej 1 talią składającą się z 52 kart (choć możliwa jest także gra kilkoma taliami), której celem jest wygranie pieniędzy (lub żetonów w wersji sportowej) od pozostałych uczestników dzięki skompletowaniu najlepszego układu lub za pomocą tzw. blefu. Nie ma ograniczenia…”
- Nazwa angielska: nazwa poprawna, cytat do podmiany (patrz werdykt).
- Definicja: Krążki, którymi gra się przy stole; w grze gotówkowej oznaczają pieniądze, w turnieju punkty turniejowe.

### `stack`: stack / stack

- **Werdykt: OK**.
- Użycie w korpusie: PS 4658, PG 2329.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Bust-out/: „Gracz jest bust out, kiedy przegrywa cały stack przy stole lub został wyeliminowany z turnieju. To bust out oznacza w języku angielskim wyeliminować kogoś z turnieju lub wysadzić z…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Wszystkie żetony, które gracz ma przed sobą; zwykle podaje się go w dużych blindach (np. stack 100 bb).

### `street`: ulica / street

- **Werdykt: OK**.
- Użycie w korpusie: PS 25, PG 239.
- Cytat polski: GGPoker PL, Terminy pokera, https://pl.ggpoker.net/poker-school/poker-terms/: „Ulica to inny termin na rozdawaną kartę lub rundę obstawiania.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Każda z rund licytacji w rozdaniu: preflop, flop, turn i river. Przykład: „value na trzech ulicach” to zakłady dla wartości na flopie, turnie i riverze.
- Uwagi: Nazwa jest w użyciu: GGPoker PL („Ulica to inny termin na rozdawaną kartę lub rundę obstawiania.”), PokerGround (ok. 240 wystąpień) i PokerStrategy PL. Problemem był brak definicji, nie nazwa.

### `betting-round`: runda licytacji / betting round

- **Werdykt: OK**.
- Użycie w korpusie: PS 499, PG 61.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „…check) – gracz nie przebija stawki ani nie pasuje, czekając na ruch innych graczy. Czekanie jest możliwe tylko wtedy, gdy stawka w danej rundzie licytacji nie została przebita.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Etap rozdania, w którym gracze po kolei czekają, stawiają, sprawdzają, przebijają albo pasują; w hold'emie są cztery: preflop, flop, turn i river.

### `preflop`: preflop / preflop

- **Werdykt: OK**.
- Użycie w korpusie: PS 2507, PG 571.
- Cytat polski: Wikipedia PL, Texas Hold’em, https://pl.wikipedia.org/wiki/Texas_Hold%E2%80%99em: „Po rundzie licytacji, kiedy wszyscy włożyli taką samą ilość pieniędzy do puli (l”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pierwsza runda licytacji: po rozdaniu kart własnych, zanim na stół trafi flop.

### `flop`: flop / flop

- **Werdykt: OK**.
- Użycie w korpusie: PS 14827, PG 4386.
- Cytat polski: Wikipedia PL, Texas Hold’em, https://pl.wikipedia.org/wiki/Texas_Hold%E2%80%99em: „Po rundzie licytacji, kiedy wszyscy włożyli taką samą ilość pieniędzy do puli (lub spasowali), na stół wykładany jest flop. Są to trzy karty wspólne (ang. community cards), których może użyć każdy z graczy (karty wspólne są odkryte). Następuje druga runda…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pierwsze trzy karty wspólne wykładane naraz po licytacji preflop; tak nazywa się też druga runda licytacji.

### `turn`: turn / turn

- **Werdykt: OK**.
- Użycie w korpusie: PS 7463, PG 1824.
- Cytat polski: Wikipedia PL, Texas Hold’em, https://pl.wikipedia.org/wiki/Texas_Hold%E2%80%99em: „…ktoś podbił przed nim). Kiedy wszyscy aktywni gracze włożą taką samą ilość pieniędzy do puli na stół, wykładana jest czwarta karta – turn. Analogicznie rozpoczyna się kolejna runda licytacji, po której ostatnia, piąta karta (river) wykładana jest na stół. Rozpoczyna się…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Czwarta karta wspólna i trzecia runda licytacji.

### `river`: river / river

- **Werdykt: OK**.
- Użycie w korpusie: PS 4503, PG 1818.
- Cytat polski: Wikipedia PL, Texas Hold’em, https://pl.wikipedia.org/wiki/Texas_Hold%E2%80%99em: „…puli na stół, wykładana jest czwarta karta – turn. Analogicznie rozpoczyna się kolejna runda licytacji, po której ostatnia, piąta karta (river) wykładana jest na stół. Rozpoczyna się ostatnia już runda licytacji, po której następuje wyłożenie kart. Gracze mogą użyć dowolnych 5…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Piąta, ostatnia karta wspólna i ostatnia runda licytacji przed showdownem.

### `showdown`: showdown / showdown

- **Werdykt: OK**.
- Użycie w korpusie: PS 1721, PG 389.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/All-in/: „…pozostali gracze pozostający w rozgrywce - nie może dalej obstawiać, nie może być zmuszony do spasowania i automatycznie bierze udział w showdownie.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Odkrycie kart po ostatniej licytacji, gdy w grze zostało co najmniej dwóch graczy; pulę zabiera najlepszy układ.

### `position`: pozycja / position

- **Werdykt: OK**.
- Użycie w korpusie: PS 5798, PG 2163.
- Cytat polski: Wikipedia PL, Texas Hold’em, https://pl.wikipedia.org/wiki/Texas_Hold%E2%80%99em: „Standardowy układ gry w Texas Hold’emie z zaznaczeniem pozycji.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Miejsce przy stole względem Buttona, które wyznacza kolejność działania. Kto działa później, ten przed decyzją widzi więcej zagrań rywali.

### `in-position`: z pozycją / in position [IP]

- **Werdykt: OK**.
- Użycie w korpusie: PS 790, PG 125.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/fixed-limit/bet-flop-check-call-turn-oop-pl/: „…postawi zakład z innymi rękami, niż gdyby to uczynił, gdyby podbił na turnie. Jednak najgorszą jest sytuacja, w której przeciwnik gra z pozycją. Oznacza to, że może, jeżeli jest dobrym graczem, dostosować swoje zakresy zagrań do Twojej gry. To zdecydowana przewaga. Załóżmy, że…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Sytuacja gracza, który po flopie działa jako ostatni, więc przed swoją decyzją widzi zagranie rywala.

### `out-of-position`: bez pozycji / out of position [OOP]

- **Werdykt: OK**.
- Użycie w korpusie: PS 1075, PG 326.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Wczesna-pozycja/: „na pozycji, bez pozycji, środkowa pozycja, późna pozycja”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Sytuacja gracza, który po flopie działa przed rywalem, więc decyduje, nie znając jego zagrania.

### `early-position`: wczesna pozycja / early position [EP]

- **Werdykt: OK**.
- Użycie w korpusie: PS 266, PG 166.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Button/: „diler, cutoff, under the gun, wczesna pozycja, środkowa pozycja, późna pozycja”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pierwsze miejsca do działania przed flopem (np. UTG); za Tobą jest jeszcze wielu graczy.

### `late-position`: późna pozycja / late position

- **Werdykt: OK**.
- Użycie w korpusie: PS 237, PG 133.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Button/: „diler, cutoff, under the gun, wczesna pozycja, środkowa pozycja, późna pozycja”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Miejsca, które działają jako ostatnie: Button i miejsca tuż przed nim, zwłaszcza Cutoff.

### `utg`: UTG / under the gun

- **Werdykt: OK**.
- Użycie w korpusie: PS 2953, PG 438.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Showdown-value_2042/: „UTG (100,00 $)”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pierwszy gracz do działania przed flopem, siedzący bezpośrednio na lewo od dużego blinda.

### `hijack`: Hijack / hijack [HJ]

- **Werdykt: OK**.
- Użycie w korpusie: PS 5, PG 153.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Hijack-_2049/: „Hijack to termin opisujący pozycję tuż przed cut-offem.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Miejsce bezpośrednio przed Cutoffem, czyli drugie na prawo od Buttona.

### `cutoff`: Cutoff / cutoff [CO]

- **Werdykt: OK**.
- Użycie w korpusie: PS 178, PG 324.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Button/: „diler, cutoff, under the gun, wczesna pozycja, środkowa pozycja, późna pozycja”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Miejsce bezpośrednio na prawo od Buttona, działające tuż przed nim.

### `button`: Button / button [BTN]

- **Werdykt: OK**.
- Użycie w korpusie: PS 1313, PG 784.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Button/: „Button lub inaczej dealer button to żeton, który pokazuje, kto jest obecnie liderem. miejsce które zajmuje diler również nazywane jest buttonem.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Miejsce rozdającego, oznaczone krążkiem „dealer”. Po flopie działa jako ostatnie w każdej rundzie licytacji.

### `outs`: out / out (outs)

- **Werdykt: OK**.
- Użycie w korpusie: PS 2347, PG 222.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „Aby obliczyć pokerowe oddsy i equity (czyli szanse na wygranie puli), musisz najpierw wiedzieć, ile outów potrzebujesz, aby skompletować swój układ. W typowych grach pokerowych są cztery karty o tej samej wartości i 13 w każdym kolorze.…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Karta, która jeszcze jest w talii i poprawi Twoją rękę do układu, który najpewniej wygra. Przykład: przy drawie do koloru outami są pozostałe karty w Twoim kolorze.

### `draw`: dobieranie / draw

- **Werdykt: zmienić nazwę PL**. pl: „draw” (odmiana: drawa, drawy, drawów, drawem); „dobieranie” to dosłowna kalka
- Użycie w korpusie: PS 6179, PG 1566; obecna nazwa „dobieranie”: PS 77, PG 53.
- Cytat polski: GGPoker PL, Terminy pokera, https://pl.ggpoker.net/poker-school/poker-terms/: „Backdoor / Draw do którego skompletowania konieczne są dwie lub więcej kart.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Ręka, która jeszcze nie jest silnym układem, ale może nim zostać po kolejnych kartach wspólnych, np. gdy brakuje jednej karty do koloru albo strita.
- Uwagi: GGPoker PL, hasło Backdoor: „Draw do którego skompletowania konieczne są dwie lub więcej kart.” W korpusie „draw” i odmiany kilkadziesiąt razy częściej niż „dobieranie”.

### `flush-draw`: dobieranie do koloru / flush draw

- **Werdykt: zmienić nazwę PL**. pl: „draw do koloru” (w nawiasie flush draw)
- Użycie w korpusie: PS 891, PG 250; obecna nazwa „dobieranie do koloru”: PS 4, PG 2.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Flop/: „Tęcza: trzy karty różnego koloru; drawy do koloru niemożliwe; pojawia sie w  40% przypadków;”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Cztery karty w jednym kolorze (w ręce i na stole razem); brakuje jednej, żeby mieć kolor.
- Uwagi: Najczęstsza forma w obu korpusach; „flush draw” też w użyciu.

### `straight-draw`: dobieranie do strita / straight draw

- **Werdykt: zmienić nazwę PL**. pl: „draw do strita” (w nawiasie straight draw)
- Użycie w korpusie: PS 230, PG 89; obecna nazwa „dobieranie do strita”: PS 4, PG 1.
- Cytat polski: GGPoker PL, Terminy pokera, https://pl.ggpoker.net/poker-school/poker-terms/: „Draw do strita zewnętrznego. Znany również jako draw do strita dwustronnego”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Cztery karty, którym brakuje jednej do strita. Odmiany: OESD (brakuje karty z jednego z dwóch końców) i gutshot (brakuje karty w środku).
- Uwagi: GGPoker PL, hasło Outside straight draw: „Draw do strita zewnętrznego.”

### `oesd`: otwarte dobieranie do strita / open-ended straight draw (outside straight draw, double-ended straight draw) [OESD]

- **Werdykt: zmienić nazwę PL**. pl: „OESD” (skrót jak UTG; w nawiasie open-ended straight draw); w mowie także „open-ended”
- Użycie w korpusie: PS 516, PG 30; obecna nazwa „otwarte dobieranie do strita”: PS 0, PG 0.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/OESD/: „Skrót od Open Ended Straight Draw.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Draw do strita z czterech kolejnych kart, który uzupełnia karta z obu końców, np. 5-6-7-8 czeka na czwórkę albo dziewiątkę.
- Uwagi: Słownik PokerStrategy PL ma hasła „OESD” i „Open Ended Straight Draw”; „otwarte dobieranie do strita” nie występuje w żadnym źródle.

### `gutshot`: gutshot / gutshot (inside straight draw)

- **Werdykt: OK**.
- Użycie w korpusie: PS 585, PG 128.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Drawy_1951/: „Na tym stole wielu graczy może mieć flush drawa, straight drawa lub gutshota. Istnieje wiele tak zwanych outów, które mogą skompletować potencjalne drawy z tego flopa na turnie lub riverze. Dlatego też board ten…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Draw do strita, któremu brakuje jednej konkretnej wartości w środku, np. 5-6-8-9 czeka tylko na siódemkę.

### `backdoor`: backdoor / backdoor

- **Werdykt: OK**.
- Użycie w korpusie: PS 343, PG 231.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Backdoor-Draw/: „Backdoor draw lub inaczej  runner-runner draw i potrzebuje do skompletowanie dwóch kart”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Draw na flopie, który potrzebuje dwóch pasujących kart z rzędu, na turnie i na riverze, np. trzy karty w kolorze po flopie.

### `pot-odds`: pot odds / pot odds

- **Werdykt: OK**.
- Użycie w korpusie: PS 1011, PG 4.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Commited_1801/: „Pot Odds”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stosunek kwoty, którą musisz dołożyć, do wielkości puli. Mówi, jak często musisz wygrywać, żeby sprawdzenie się opłacało.

### `implied-odds`: implied odds / implied odds

- **Werdykt: OK**.
- Użycie w korpusie: PS 971, PG 8.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Deep-Stack/: „Duży stack ma wpływ na taktykę gry. Gracz, który posiada deep stack ma lepsze implied odds i może więcej zaryzykować.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pot odds powiększone o żetony, które spodziewasz się wygrać na kolejnych ulicach, jeśli trafisz swój układ.

### `equity`: equity / equity

- **Werdykt: OK**.
- Użycie w korpusie: PS 4865, PG 854.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „Aby obliczyć pokerowe oddsy i equity (czyli szanse na wygranie puli), musisz najpierw wiedzieć, ile outów potrzebujesz, aby skompletować swój układ. W typowych grach…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Twoja szansa na wygranie puli, gdyby wszystkie pozostałe karty wyłożono bez dalszej licytacji; zwykle w procentach.

### `equity-realization`: realizacja equity / equity realization [EQR]

- **Werdykt: OK**.
- Użycie w korpusie: PS 1, PG 6.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/omaha-poker/2184/: „…equity (np. 2BFD, gutshoot + over karty), które na turnie będą mogły grać o stacki i wygrać dużą pulę lub mieć value z second barrel, czy realizacji equity szukamy dużej ilości kart, na których będziemy mogli barrelować Na co zwracamy uwagę chcąc betować jako blef? struktura boardu…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Jaką część swojego equity ręka faktycznie zamienia na wygraną, gdy licytacja trwa dalej; zależy m.in. od pozycji i od tego, jak łatwo rękę rozegrać.
- Uwagi: Rzadkie, ale potwierdzone (PokerGround).

### `expected-value`: wartość oczekiwana / expected value [EV]

- **Werdykt: OK**.
- Użycie w korpusie: PS 774, PG 18.
- Cytat polski: Wikipedia PL, Texas Hold’em, https://pl.wikipedia.org/wiki/Texas_Hold%E2%80%99em: „Dla uproszczenia skomplikowanej matematyki obliczania wartości oczekiwanej stosuje się zasadę „mnożenia przez dwa” lub „mnożenia przez cztery”.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Średni wynik zagrania, gdyby powtarzać je wiele razy. Zagranie z dodatnim EV zarabia w długim okresie, nawet jeśli tym razem przegra.

### `combo`: kombinacja / combo (combination)

- **Werdykt: OK**.
- Użycie w korpusie: PS 691, PG 388.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/dara-okearney-gra-koncowa/: „16 kombinacji AK i 6 kombinacji AA”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Jedno konkretne ułożenie dwóch kart z kolorami, np. A♠ K♥. Liczenie kombinacji pokazuje, ile danych rąk naprawdę jest w zakresie.
- Uwagi: Spotykane też „combo”.

### `range`: zakres / range

- **Werdykt: OK**.
- Użycie w korpusie: PS 4606, PG 3601.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Calling-station/: „Calling station lub po prostu station, to wyjątkowo luźny (duży zakres rąk) i pasywny gracz, który rozgrywa zbyt wiele rąk i za dużo z nimi licytuje. Sprawdza każdy zakład nawet ze słabymi kartami i nie jest…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Zbiór wszystkich rąk, które gracz może mieć w danej sytuacji, albo rąk, z którymi zagrałby dane zagranie.

### `mixed-hand`: ręka mieszana / mixing hand

- **Werdykt: nie potwierdzono (polska nazwa)**. pl „ręka mieszana” nie występuje w źródłach; w użyciu jest „mieszana strategia” („ręka grana mieszaną strategią”). en „mixing hand” to sformułowanie z artykułu GTO Wizard, nie hasło słownikowe (glosariusz: „Mixed strategy”)
- Użycie w korpusie: PS 12, PG 17.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/bss/rownowaga-nasha-czestotliwosc-blefowania-sprawdzania/: „…lub drugą strategię (jednocześnie). W przeciwnym wypadku zarówno jeden, jak i drugi otrzyma wypłatę 0. Zawodnicy mogą również używać mieszanych strategii. Znaczy to tyle, że pewne czyste strategie są użyte z określonym prawdopodobieństwem, które sumuje się oczywiście do 100%. Taka mieszana…”
- Nazwa angielska: „mixing hand” nie jest hasłem słownikowym (patrz werdykt).
- Definicja: Ręka, z którą strategia równowagi wybiera raz jedno, raz drugie zagranie (np. czasem przebicie, czasem sprawdzenie); oba zagrania są poprawne.
- Uwagi: Do decyzji koordynatora: zostawić termin roboczy z jawnym oznaczeniem albo przejść na „mieszana strategia (mixed strategy)”.

### `open`: otwarcie / open (open-raise)

- **Werdykt: OK**.
- Użycie w korpusie: PS 84, PG 287.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/zagranie-squeeze/: „W rozwiązaniach GTO, w grach cashowych 100 bb pierwsze sprawdzenia vs otwarcie z UTG pojawiają się dopiero na CO – przy założeniu, że do otwarcia używany jest sizin”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pierwsze wejście do puli przed flopem przez przebicie, gdy wszyscy przed Tobą spasowali.

### `suited`: w kolorze / suited

- **Werdykt: OK**.
- Użycie w korpusie: PS 552, PG 80.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Suited/: „Dwie lub więcej kart w tym samym kolorze.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Dwie karty własne w tym samym kolorze, np. A♥ K♥ (zapis AKs).
- Uwagi: W korpusie też „suited”.

### `offsuit`: w różnych kolorach / offsuit

- **Werdykt: OK**.
- Użycie w korpusie: PS 35, PG 28.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/jak-rozpoznac-ze-ktos-nie-blefuje/: „jest jeszcze sześć kombinacji AK w różnych kolorach”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Dwie karty własne w różnych kolorach, np. A♥ K♣ (zapis AKo).
- Uwagi: W korpusie częściej „offsuit”; polska forma też potwierdzona.

### `pocket-pair`: para w ręce / pocket pair

- **Werdykt: zmienić nazwę PL**. pl: „pocket para” (PokerStrategy PL) albo „para z ręki” (PokerGround)
- Użycie w korpusie: PS 186, PG 70; obecna nazwa „para w ręce”: PS 4, PG 0.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Pocket-Pair/: „W Texas Hold'em, "pocket pair" jest parą, którą tworzą obie karty na ręce”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Para z dwóch kart własnych, np. 8♣ 8♦ przed flopem.
- Uwagi: Słownik PokerStrategy PL, hasło Pocket Pair: „W Texas Hold'em, "pocket pair" jest parą, którą tworzą obie karty na ręce”. „Para w ręce” prawie nie występuje.

### `connectors`: łącznik / connectors (connector)

- **Werdykt: zmienić nazwę PL**. pl: „konektory” (PokerStrategy PL) albo „connectory” (PokerGround); „łącznik” nie występuje w żadnym źródle
- Użycie w korpusie: PS 520, PG 160; obecna nazwa „łącznik”: PS 0, PG 1.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „w przypadku gdy karty znajdują się obok siebie to: connectors.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Karty własne o sąsiednich albo prawie sąsiednich wartościach, np. 8-7 lub 9-8; łatwiej z nich ułożyć strita.
- Uwagi: Wikipedia PL, Poker: „w przypadku gdy karty znajdują się obok siebie to: connectors”.

### `3-bet`: 3-bet / 3-bet (three-bet)

- **Werdykt: OK**.
- Użycie w korpusie: PS 3497, PG 1575.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/3bet/: „Jest zatem trzecim z kolei podniesieniem stawki w danej rundzie licytacji.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pierwsze przebicie otwarcia przed flopem; nazwa liczy duży blind jako pierwszy zakład, a otwarcie jako drugi.

### `4-bet`: 4-bet / 4-bet (four-bet)

- **Werdykt: OK**.
- Użycie w korpusie: PS 1229, PG 545.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/4bet/: „Trzecie podbicie (przebicie) po obstawieniu zakładu przez jednego gracza”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Przebicie 3-betu, czyli czwarty zakład w rundzie licytacji.

### `limp`: limp / limp

- **Werdykt: OK**.
- Użycie w korpusie: PS 1003, PG 573.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Backraise/: „Specjalnym rodzajem backraise jest limp-raise. Z grach z blindami, sprawdzenie blindów nosi nazwę limpowania. Zatem limp a potem przebicie następującego po nim podbicia nazywa…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Wejście do puli przed flopem przez samo sprawdzenie dużego blinda, gdy nikt jeszcze nie przebił.

### `isolation`: izolacja / isolation raise (iso)

- **Werdykt: OK**.
- Użycie w korpusie: PS 44, PG 42.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Izolacja/: „Izolacja wykonywana jest w celu wyeliminowania z gry większości przeciwników i pozostawienia w grze tylko jednego, słabego gracza.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Przebicie po jednym lub kilku limpach, żeby zagrać z limperem (często słabszym graczem) jeden na jeden.

### `texture`: tekstura / texture (board texture)

- **Werdykt: OK**.
- Użycie w korpusie: PS 202, PG 70.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Texture-Tekstura_1952/: „Tekstura stołu opisuje kompozycje na boardzie w pokerze.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Charakter kart wspólnych: ile jest kolorów, czy karty są blisko siebie, czy leży para. Od tekstury zależy, jakie układy i drawy są możliwe.

### `dry`: suchy / dry (static)

- **Werdykt: OK**.
- Użycie w korpusie: PS 89, PG 38.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Drawy_1951/: „Z drugiej strony, ten board jest bardzo suchy i daje graczom bardzo nieliczne możliwości na ulepszenie ręki na turnie, czy riverze. Nie jest on drawy.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stół, na którym możliwych jest mało drawów i silnych układów, np. K♠ 7♦ 2♣.

### `wet`: mokry / wet (dynamic)

- **Werdykt: OK**.
- Użycie w korpusie: PS 25, PG 35.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Drawy_1951/: „Oto przykład boardu, który może być określony mianem draw heavy (zwany również mokrym boardem):”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stół, na którym możliwych jest wiele drawów i silnych układów, np. J♥ T♥ 8♣.

### `rainbow`: tęczowy / rainbow

- **Werdykt: zmienić nazwę PL**. pl: „rainbow” (rzadziej rzeczownik „tęcza”); przymiotnik „tęczowy” prawie nie występuje
- Użycie w korpusie: PS 98, PG 8; obecna nazwa „tęczowy”: PS 0, PG 1.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Dry-Suchy_2031/: „…boardów wet (mokrych) czy draw-heavy nie jest wcale lub tylko w niewielkim stopniu skoordynowany, a karty są w trzech różnych kolorach (rainbow). Możliwa jest niewielka ilość drawów, dlatego też board ten nazywa się suchym.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Flop z trzema kartami w trzech różnych kolorach, więc na flopie nikt nie ma drawu do koloru.
- Uwagi: Słownik PokerStrategy PL, hasło Dry: „karty są w trzech różnych kolorach (rainbow)”.

### `two-tone`: dwukolorowy / two-tone

- **Werdykt: OK**.
- Użycie w korpusie: PS 50, PG 0.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/bss/gra-na-flopie-kiedy-grasz-agresywnie/: „…jest bardziej ograniczony mniej prawdopodobne są ręce z drawami krótsza droga do zagrania za wszystko (all-in). Innymi słowy, na flopie dwukolorowym (2-suited) nie musisz wychodzić z założenia, że przeciwnicy mają drawa, ponieważ wiele rąk spekulacyjnych, takich jak konektory w kolorze…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Flop, na którym dwie karty są w jednym kolorze, więc możliwe są drawy do koloru.

### `monotone`: monotoniczny / monotone

- **Werdykt: zmienić nazwę PL**. pl: „jednokolorowy” (PokerStrategy PL) albo „monotonny” (PokerGround); „monotoniczny” nie występuje
- Użycie w korpusie: PS 51, PG 14; obecna nazwa „monotoniczny”: PS 0, PG 0.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/bss/gra-na-flopie-kiedy-grasz-agresywnie/: „masz jednak flop jednokolorowy (1-suted) i zwiększa się niebezpieczeństwo drawa do koloru”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Flop z trzema kartami w jednym kolorze, więc kolor może już być ułożony.

### `paired`: sparowany / paired

- **Werdykt: OK**.
- Użycie w korpusie: PS 80, PG 95.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Paired/: „Sparowanie - odnosi się do kart wspólnych na stole i oznacza wystąpienie dwóch kart tej samej figury.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stół, na którym leży para (dwie karty tej samej wartości), np. 8-8-3.

### `connected`: połączony / connected

- **Werdykt: OK**.
- Użycie w korpusie: PS 91, PG 79.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/fixed-limit/postflop-tekstury/: „Połączone flopy Drugim krokiem w ocenie flopa jest określenie, w jakim stopniu karty na stole są ze sobą połączone”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stół, na którym ktoś mógł już ułożyć strita, np. 9-8-7.

### `disconnected`: rozłączony / disconnected

- **Werdykt: zmienić nazwę PL**. pl: „niepołączony”
- Użycie w korpusie: PS 4, PG 3; obecna nazwa „rozłączony”: PS 0, PG 0.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/weekly-fixed-limit/1106/: „lubi blefować na niskich i niepołączonych flopach”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stół z kartami odległymi od siebie, z którym trudno zbudować strita lub draw do strita, np. K-7-2.
- Uwagi: Rzadkie (kilka wystąpień), ale „rozłączony” nie występuje wcale.

### `semi-connected`: półpołączony / semi-connected

- **Werdykt: nie potwierdzono (polska nazwa)**. polska nazwa nie potwierdzona; brak odpowiednika w źródłach
- Użycie w korpusie: PS 0, PG 0.
- Cytat polski: nie znaleziono w żadnym źródle.
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stół, na którym są drawy do strita, ale strit nie jest jeszcze możliwy, np. T-8-3.
- Uwagi: Do decyzji: opis zamiast nazwy („stół z drawami do strita, ale bez gotowego strita”).

### `wetness`: mokrość / wetness

- **Werdykt: nie potwierdzono (polska nazwa)**. polska nazwa „mokrość” nie występuje w żadnym źródle
- Użycie w korpusie: PS 0, PG 0.
- Cytat polski: nie znaleziono w żadnym źródle.
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stopień, w jakim stół sprzyja drawom i silnym układom: od suchego do mokrego.
- Uwagi: Słownik PokerStrategy PL opisuje to inaczej: „nie jest wcale lub tylko w niewielkim stopniu skoordynowany”. Do decyzji: opis („jak bardzo mokry jest stół”) zamiast rzeczownika.

### `top-pair`: najwyższa para / top pair

- **Werdykt: OK**.
- Użycie w korpusie: PS 573, PG 190.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Najwyzsza-para/: „Para utworzona z karty z ręki i najwyższej karty na stole.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Para z najwyższą kartą na stole, np. K♠ Q♦ na flopie K-7-2.

### `second-pair`: druga para / second pair

- **Werdykt: OK**.
- Użycie w korpusie: PS 38, PG 33.
- Cytat polski: GGPoker PL, Terminy pokera, https://pl.ggpoker.net/poker-school/poker-terms/: „W grach w pokera z kartami wspólnymi, para kart drugiej najwyższej rangi na stole. Druga para to para środkowa, ale niekoniecznie odwrotnie.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Para z drugą co do wysokości kartą na stole, np. 7♠ 6♠ na flopie K-7-2.

### `overpair`: nadpara / overpair

- **Werdykt: zmienić nazwę PL**. pl: „overpara” (odmiana: overpary, overparę, overparą); „nadpara” nie występuje
- Użycie w korpusie: PS 185, PG 157; obecna nazwa „nadpara”: PS 0, PG 0.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/various-poker/pokerowa-terminologia-poczatkujacy/: „…TWO PAIR Dwie dolne pary to takie, w których twoje własne karty sparowały się z dwiema najniższymi kartami na stole. Ręka Flop OVERPAIR (OVERPARA) Overpara to para na ręku wyższa od najwyższej karty na stole. Ręka Flop TOP PAIR (TOP PARA) Kiedy sparujesz najwyższą kartę na stole,…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Para w ręce wyższa od każdej karty na stole, np. Q-Q na flopie J-7-2.

### `c-bet`: c-bet / c-bet (continuation bet)

- **Werdykt: OK**.
- Użycie w korpusie: PS 642, PG 587.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/bss/eksploatowanie-autoprofit/: „…i zamiast niej powinieneś skorzystać ze statystyki, która dotyczy tej sytuacji. Również na postflopie statystyki takie jak \"fold to c-bet\", \"went to showdown\" oraz \"fold c-bet to raise\" są pomocne przy ustalaniu prawdziwej wartości fold equity. W szczególności na postflopie…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Zakład kontynuacyjny: zakład gracza, który był agresorem w poprzedniej rundzie, np. zakład na flopie po otwarciu preflop.

### `aggressor`: agresor / aggressor

- **Werdykt: OK**.
- Użycie w korpusie: PS 565, PG 229.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Donkbet/: „…pochodzi z dwóch angielskich słów - donkey (osioł) i bet (zakład). Wykonuje go gracz, który w poprzedniej rundzie licytacji nie był agresorem przeciwko graczowi, który był agresorem. Często używa się w mowie potocznej terminów gaybet lub \"zakład z nikąd\".”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Gracz, który jako ostatni stawiał lub przebijał w poprzedniej rundzie licytacji.

### `initiative`: inicjatywa / initiative (betting initiative)

- **Werdykt: OK**.
- Użycie w korpusie: PS 736, PG 46.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/AF/: „Jak łatwo zauważyć, wskaźnik będzie tym większy, im częściej gracz przejmuje inicjatywę w licytacji i sam stawia zakłady i przebija a nie sprawdza zakłady przeciwników. Jeżeli na przykład gracz ma niski wskaźnik AF i w danym…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Rola ostatniego agresora: to on zwykle wykonuje następny zakład, a rywal najczęściej czeka na jego ruch.

### `range-advantage`: przewaga zakresu / range advantage

- **Werdykt: OK**.
- Użycie w korpusie: PS 0, PG 47.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/jak-przejsc-mikrostawki/: „…Masz mocny zakres, który jest skondensowany wobec zakresu, który sprawdził poprzednią ulicę. Albo po prostu otworzyłeś przed flopem, masz przewagę zakresu, zostałeś sprawdzony i czekałeś aż do rivera. Na większości tekstur nadal masz przewagę zakresu, dlatego musisz blefować. Z punktu…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Sytuacja, w której zakres jednego gracza ma na danym stole łącznie większe equity niż zakres rywala.

### `nuts-advantage`: przewaga orzechowa / nuts advantage

- **Werdykt: zmienić nazwę PL**. pl: „przewaga nutsów”
- Użycie w korpusie: PS 0, PG 5; obecna nazwa „przewaga orzechowa”: PS 0, PG 0.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/porozmawiajmy-o-czestotliwosciach-3-bet-sb-btn-cbet/: „…jest to dla nas korzystny scenariusz. Najczęściej – choć nie zawsze – gracz, który 3-betuje, dysponuje zarówno przewagą zakresu, jak i przewagą nutsów. W naszym zakresie jest więcej silnych układów typu wysokie broadwaye oraz pary premium, a zakres rywala, który tylko sprawdza nasze…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Sytuacja, w której jeden gracz ma w zakresie proporcjonalnie więcej najsilniejszych rąk niż rywal.
- Uwagi: Rzadkie (PokerGround), ale „przewaga orzechowa” nie występuje.

### `nuts`: orzechy / nuts

- **Werdykt: zmienić nazwę PL**. pl: „nuts” (odmiana: nutsa, nutsy, nutsów; przymiotnik „nutsowy”)
- Użycie w korpusie: PS 272, PG 442; obecna nazwa „orzechy”: PS 1, PG 2.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Nuts/: „Nuts lub inaczej lock jest najlepszą możliwą ręką w danej sytuacji.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Najsilniejsza możliwa ręka na danym stole w danej chwili. Przykład: na stole K♥ 9♥ 4♥ 2♣ jest nią kolor z asem kier.
- Uwagi: Słownik PokerStrategy PL, hasło Nuts: „Nuts lub inaczej lock jest najlepszą możliwą ręką w danej sytuacji.” „Orzechy” w znaczeniu pokerowym nie występują.

### `polarized`: spolaryzowany / polarized

- **Werdykt: OK**.
- Użycie w korpusie: PS 55, PG 131.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Merging_2024/: „Jeżeli gracz na suchym flopie gra re-raise wyłącznie z setem, wówczas jego zasięg jest spolaryzowany i nie jest zbalansowany. Jeżeli natomiast gracz od czasu do czasu zagra re-raise również z niczym, wówczas jego zasięg jest spolaryzowany…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: O zakresie: złożony głównie z bardzo silnych rąk i z blefów, prawie bez rąk średnich.

### `polarization`: polaryzacja / polarization

- **Werdykt: OK**.
- Użycie w korpusie: PS 14, PG 4.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Merging_2024/: „…(wśród polskich pokerzystów określa się to mianem rozszerzania) opisuje proces dodawania do swojego zasięgu rąk, w celu uniknięcia polaryzacji. Oznacza to, że zasięg gracza zawiera więcej możliwości niż tylko dwie przeciwstawne sobie (nuts lub nic). Poprzez rozszerzanie zasięgu…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Budowanie zakresu ze skrajności: silnych rąk dla wartości i blefów, bez rąk średnich.

### `linear`: liniowy / linear (merged)

- **Werdykt: nie potwierdzono (polska nazwa)**. pl „liniowy” w znaczeniu zakresu nie występuje (w korpusie „liniowo” tylko w znaczeniu matematycznym); en_alt: usunąć „merged” – według GTO Wizard (cytat już w polu source) merged to kształt pośredni między linear a polarized, nie synonim
- Użycie w korpusie: PS 0, PG 0.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Merging_2024/: „wówczas jego zasięg jest niespolaryzowany oraz zbalansowany (= merged range).”
- Nazwa angielska: en „linear” poprawne; en_alt „merged” do usunięcia (patrz werdykt).
- Definicja: O zakresie: zbudowany od góry, z najsilniejszych rąk w dół, bez osobnej grupy blefów.
- Uwagi: Słownik PokerStrategy PL ma hasło „Merging / (merged range)”, czyli zakres niespolaryzowany. Do decyzji: zostawić „liniowy” jako nazwę roboczą (oznaczoną) albo używać „linear” bez tłumaczenia.

### `condensed`: skondensowany / condensed (depolarized)

- **Werdykt: OK**.
- Użycie w korpusie: PS 0, PG 4.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/jak-przejsc-mikrostawki/: „…masz obowiązkowy blef? Bez znajomości teorii nie da się tego zrobić, dlatego czytaj dalej wyjaśnienie. Masz mocny zakres, który jest skondensowany wobec zakresu, który sprawdził poprzednią ulicę. Albo po prostu otworzyłeś przed flopem, masz przewagę zakresu, zostałeś sprawdzony i…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: O zakresie: bez najsilniejszych rąk (ograniczony od góry) i złożony głównie ze średnich rąk; przeciwieństwo spolaryzowanego.
- Uwagi: Rzadkie (PokerGround).

### `value`: wartość / value

- **Werdykt: OK**.
- Użycie w korpusie: PS 41, PG 180.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/weekly-no-limit/3-betowane-poty-overkarty-equity/: „…Ręka Gracz 1 48.84% 42.93% 11.82% 45.25% 77+, AJs+, KQs, 87s, 76s, 65s, AQo+ Gracz 2 51.16% 45.25% 11.82% 42.93% AKo 3-betujesz preflop dla wartości. Postflop: Analiza Equity Board 7 4 4 Equity Wygrana Podział Przegrana Ręka Gracz 1 60.87% 53.37% 15% 31.63% 77+, AJs+, KQs, 87s, 76s,…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Gra dla wartości: zakład z silną ręką po to, żeby rywal sprawdził go słabszą ręką.

### `value-bet`: value bet / value bet

- **Werdykt: OK**.
- Użycie w korpusie: PS 528, PG 250.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Straightforward/: „Straightforward / prostolinijny(a) opisuje twój styl gry, który jest ściśle związany z siłą twojej ręki. Jeżeli masz silną rękę, robisz value bety i nie próbujesz pokonać swojego oponenta poprzez zagranie check / raise, czy przykładowo indukowanie bluffu. Prostolinijny styl nie…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Zakład z silną ręką, który ma zostać sprawdzony przez słabsze ręce.

### `bluff`: blef / bluff

- **Werdykt: OK**.
- Użycie w korpusie: PS 4903, PG 2380.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „…pieniędzy (lub żetonów w wersji sportowej) od pozostałych uczestników dzięki skompletowaniu najlepszego układu lub za pomocą tzw. blefu. Nie ma ograniczenia liczby graczy przy jednym stole, ale ze względów praktycznych nie gra się w więcej niż dziesięć osób. W pokera można…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Zakład ze słabą ręką, która raczej nie wygra na showdownie, żeby rywal spasował lepszą rękę.

### `semi-bluff`: półblef / semi-bluff

- **Werdykt: zmienić nazwę PL**. pl: „semiblef” (PokerStrategy PL) lub „semi-blef” (PokerGround); „półblef” prawie nie występuje
- Użycie w korpusie: PS 1034, PG 90; obecna nazwa „półblef”: PS 1, PG 0.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/jak-rozgrywac-ak-w-grach-cashowych/: „Twoja ręka ma więc wystarczające equity do tego, by mogła być opłacalnym semi-blefem”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Zakład z ręką jeszcze słabą, ale z szansą na poprawę (np. z drawem): wygrywasz, gdy rywal spasuje albo gdy trafisz.

### `blocker`: bloker / blocker

- **Werdykt: OK**.
- Użycie w korpusie: PS 7, PG 89.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/bss/game-plan-wprowadzenie/: „…KJs+, QJs, J9s+, T9s, 98s, 87s, AQo-AJo, KQo 104/382 (27%) Zasięg przeciwko pasywnym przeciwnikom (<6% 3-betu): TT-77, AQs 4-bet/fold Blokery np.: ATo, KJo, Ad9h 25/382 (7%) Zmienia się w dużym stopniu i prawdopodobnie zależy od dynamiki stołu Zbadanie zasięgów preflop dla…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Karta w Twojej ręce, która zmniejsza szansę, że rywal ma określone ręce. Przykład: z asem kier rywal nie może mieć koloru z asem kier.

### `bluff-catcher`: bluff-catcher / bluff catcher

- **Werdykt: OK**.
- Użycie w korpusie: PS 43, PG 57.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Bluff-catcher/: „Bluff catcher to ręka, którą może pokonać jedynie blef. Tego określenie używa się również dla opisania bardzo pasywnego, czytelnego gracza, który…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Ręka, która pokonuje tylko blefy rywala, a przegrywa z jego zakładami dla wartości; nadaje się do sprawdzania, nie do zakładu.

### `barrel`: beczka / barrel

- **Werdykt: zmienić nazwę PL**. pl: „barrel” („beczka” jako potoczny wariant)
- Użycie w korpusie: PS 710, PG 256; obecna nazwa „beczka”: PS 0, PG 20.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Second-barrel/: „Second barrel - jeśli gracz obstawiał w drugiej rundzie licytacji”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Kolejny zakład w następnej rundzie licytacji po własnym zakładzie z poprzedniej rundy.
- Uwagi: „beczka” występuje w PokerGround (ok. 20 razy), „barrel” ok. 970 razy w obu korpusach.

### `second-barrel`: druga beczka / second barrel (double barrel)

- **Werdykt: zmienić nazwę PL**. pl: „second barrel”
- Użycie w korpusie: PS 203, PG 50; obecna nazwa „druga beczka”: PS 0, PG 10.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Second-barrel/: „Second barrel - jeśli gracz obstawiał w drugiej rundzie licytacji (na flopie) i ponownie obstawia w kolejnej rundzie, to ten kolejny zakład nosi nazwę…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Drugi zakład z rzędu: po c-becie na flopie gracz stawia znowu na turnie.
- Uwagi: Słownik PokerStrategy PL, hasło Second barrel: „jeśli gracz obstawiał w drugiej rundzie licytacji (na flopie) i ponownie obstawia w kolejnej rundzie, to ten kolejny zakład nosi nazwę "second barrel"”. „Druga beczka” spotykana potocznie w PokerGround.

### `probe-bet`: probe / probe bet

- **Werdykt: OK**.
- Użycie w korpusie: PS 6, PG 45.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/probe-bet-na-riverze/: „Probe bet to zakład, jaki stawiasz bez pozycji przeciwko graczowi, który miał okazję do c-betowania na wcześniejszym streecie, ale z niej nie skorzystał.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Zakład na turnie gracza bez pozycji po tym, jak agresor preflop zaczekał na flopie zamiast zrobić c-bet.
- Uwagi: Znaczenie: PokerGround (za Upswing) zgodnie z GTO Wizard. Uwaga: starsze hasło słownika PokerStrategy PL (https://polska.pokerstrategy.com/glossary/Probe-bet/) opisuje probe bet jako mały zakład „który ma głównie na celu wybadanie reakcji przeciwnika” (feeler bet); kurs trzyma się znaczenia GTO Wizard.

### `donk-bet`: donk bet / donk bet

- **Werdykt: OK**.
- Użycie w korpusie: PS 676, PG 125.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Donkbet/: „Wykonuje go gracz, który w poprzedniej rundzie licytacji nie był agresorem przeciwko graczowi, który był agresorem.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Zakład gracza, który stawia, zanim agresor z poprzedniej rundy zdążył zagrać.

### `overbet`: overbet / overbet

- **Werdykt: OK**.
- Użycie w korpusie: PS 25, PG 233.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Overbet/: „Postawianie zakładu, w wysokości przekraczającej wielkość puli.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Zakład po flopie większy niż cała pula.

### `effective-stack`: efektywny stack / effective stack

- **Werdykt: OK**.
- Użycie w korpusie: PS 119, PG 165.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/sit-and-go/spin-n-go-strategia-dla-poczatkujacych/: „…Spójrzy na cztery przykładowe rozdania, by lepiej zrozumieć koncept efektywnego rozmiaru stacków. Przy każdym rozdaniu określ rozmiar efektywnego stacku, a następnie sprawdź poprawność swojej odpowiedzi klikając \"Pokaż\". 1. Jesteś na Small Blindzie. Jaki jest efektywny rozmiar stacków?…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Najmniejszy ze stacków graczy w rozdaniu, czyli najwięcej, ile można w nim realnie wygrać lub przegrać.

### `spr`: SPR / stack-to-pot ratio

- **Werdykt: OK**.
- Użycie w korpusie: PS 39, PG 45.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/SPR-Stack-to-Pot-Ratio_1728/: „Stack-to-pot ratio jest to po prostu stosunek stacka do wielkości pota.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Efektywny stack podzielony przez wielkość puli na flopie; mówi, ile zakładów zostało jeszcze do rozegrania.

### `mdf`: MDF / minimum defense frequency

- **Werdykt: OK**.
- Użycie w korpusie: PS 0, PG 11.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/blefowanie-na-riverze-trzy-porady/: „…które pomogą Ci lepiej blefować na riverze. Porada #1: Korzystaj z koncepcji minimalnej częstotliwości obrony (Minimum Defense Frequency, MDF) Minimalna częstotliwość obrony to podstawowa koncepcja, na której opiera się blefowanie, w tym blefowanie na riverze. MDF bazuje na…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Najmniejsza część zakresu, którą trzeba bronić przed zakładem, żeby blef rywala ręką bez szans nie był automatycznie opłacalny.

### `alpha`: alpha / alpha

- **Werdykt: nie potwierdzono (polska nazwa)**. nazwa „alpha” nie występuje w polskich źródłach (nazwa angielska, więc bez kalki do poprawienia)
- Użycie w korpusie: PS 0, PG 0.
- Cytat polski: nie znaleziono w żadnym źródle.
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Jak często rywal musi spasować, żeby blef ręką bez szans wyszedł na zero; zależy od wielkości zakładu względem puli.

### `variance`: wariancja / variance

- **Werdykt: OK**.
- Użycie w korpusie: PS 303, PG 244.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Downswing/: „…są naturalnym elementem wszystkich gier losowych, tak samo jak upswingi, które przynoszą znaczne zyski. Każda gra losowa ma pewien poziom wariancji ponieważ \"zachowanie\" kart zmienia się w krótkich odstępach czasu i różni się od średnich statystycznych. Jednak w odpowiednio długim…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Rozrzut wyników wokół wartości oczekiwanej: nawet przy dobrej grze krótkie serie bywają mocno na minusie albo na plusie.

### `buy-in`: wpisowe / buy-in

- **Werdykt: OK**.
- Użycie w korpusie: PS 37, PG 147.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Wpisowe/: „Wpisowe to kwota, jaką musi zapłacić gracz by zgrać w turnieju lub usiąść przy stole cashowym.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Kwota wejścia do turnieju albo do gry gotówkowej przy stole.

### `bankroll`: bankroll / bankroll

- **Werdykt: OK**.
- Użycie w korpusie: PS 367, PG 365.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Depozyt/: „…wpłata na konto, w tym przypadku na konto online prowadzone przez platformę pokerową lub kasyno online. Stan konta nazywany jest często bankrollem.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pieniądze przeznaczone wyłącznie na grę w pokera, oddzielone od pieniędzy na życie.

### `tilt`: tilt / tilt

- **Werdykt: OK**.
- Użycie w korpusie: PS 663, PG 257.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Blow-up/: „dark tunnel blef, tilt”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stan, w którym emocje (złość, frustracja, euforia) pogarszają Twoje decyzje przy stole.

### `winrate`: winrate / win rate (bb/100)

- **Werdykt: poprawić en_alt**. en_alt: usunąć „bb/100” (to jednostka winrate, nie synonim); jednostka jest w definicji
- Użycie w korpusie: PS 100, PG 126.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Hourly-Winrate/: „Hourly winrate to średni poziom wygranych na godzinę, liczony w big blindach”
- Nazwa angielska: do poprawy (patrz werdykt).
- Definicja: Średni wynik gracza na dłuższej próbie; w grach gotówkowych zwykle w bb/100, czyli dużych blindach na sto rozdań.
- Uwagi: GTO Wizard (już w polu source): „bb/100: A unit of measurement in poker”.

### `downswing`: zjazd / downswing

- **Werdykt: zmienić nazwę PL**. pl: „downswing”
- Użycie w korpusie: PS 147, PG 108; obecna nazwa „zjazd”: PS 0, PG 0.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Downswing/: „Downswing to okres, podczas którego gracz odnotowuje znaczne straty z powodu pecha.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Okres wyraźnie gorszych wyników, zwykle większych strat, niż wynikałoby z umiejętności; przeciwieństwo upswingu.
- Uwagi: Słownik PokerStrategy PL, hasło Downswing: „Downswing to okres, podczas którego gracz odnotowuje znaczne straty z powodu pecha.” „Zjazd” w tym znaczeniu nie występuje.

### `session`: sesja / session

- **Werdykt: OK**.
- Użycie w korpusie: PS 341, PG 464.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Momentum_1953/: „…od win rate. Gracz w takim momencie wierzy, że ponownie przegra następny coin flip, że monster draw kolejny raz się nie uzupełni i cała sesja jeszcze raz zakończy się niepowodzeniem. Negatywne momentum może mieć długoterminowy wpływ na podejmowane przez gracza decyzje.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Jedno posiedzenie przy pokerze, od rozpoczęcia do zakończenia gry.

### `stakes`: stawka / stakes

- **Werdykt: OK**.
- Użycie w korpusie: PS 253, PG 1144.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Stawki/: „Stawki określają minimalna wielkość zakładu.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Wysokość blindów w grze gotówkowej albo wpisowego w turnieju; „mikrostawki” to najniższe poziomy.

### `standard-deviation`: odchylenie standardowe / standard deviation

- **Werdykt: OK**.
- Użycie w korpusie: PS 15, PG 0.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/various-poker/koncept-ryzyka-zysku-w-pokerze/: „…Możesz jednakże z wariancji wyliczyć pewną wielkość, którą możesz interpretować jako sumę pieniędzy i która ma realną wartość: jest to odchylenie standardowe. Odchylenie standardowe można obliczyć jako pierwiastek z wariancji. Pierwiastek wariancji w wysokości 640 000 $² wynosi 800 $. Jest to…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Miara rozrzutu wyników (pierwiastek z wariancji); w pokerze zwykle podawana w bb/100.

### `risk-of-ruin`: ryzyko bankructwa / risk of ruin [RoR]

- **Werdykt: OK**.
- Użycie w korpusie: PS 7, PG 2.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/7-card-stud/5-card-draw-1-wprowadzenie/: „…polecić każdemu. Jeśli chodzi o pytanie o to, jak duży powinien być twój bankroll, należy wziąć pod uwagę zarówno RoR (risk of ruin - ryzyko bankructwa), jak i odchylenie standardowe. Ogólnie można powiedzieć, że z powodu zaledwie 2 rund zakładów oraz dość słabych przeciwników do limitu 3…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Prawdopodobieństwo, że stracisz cały bankroll, zanim osiągniesz cel albo przestaniesz grać.

### `mental-game`: mental game / mental game

- **Werdykt: OK**.
- Użycie w korpusie: PS 14, PG 6.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/poker-psychology/poprawa-motywacji/: „…problemu, by nie pytać się potem “Co by było, gdybym zrobił więcej?” \"O autorze: Jared Tendler jest autorem przełomowej książki \"The Mental Game of Poker\" , która opowiada o tilcie związanym z wariancją, pewności siebie, strachu i motywacji. Odkąd zaczął specjalizować się w pokerze…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Psychologiczna strona pokera: radzenie sobie z tiltem, emocjami i koncentracją przy stole.

### `tournament`: turniej / tournament

- **Werdykt: OK**.
- Użycie w korpusie: PS 1099, PG 2320.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „Dziś poker jest jedną z najpopularniejszych gier karcianych. Telewizja transmituje turnieje pokerowe, a w Internecie wiele firm oferuje pokoje do gry w pokera online. W największej pokerowej imprezie świata – World Series of…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Forma gry, w której wszyscy za wpisowe dostają taki sam stack żetonów, blindy rosną co pewien czas, a gra trwa, aż jeden gracz zbierze wszystkie żetony; nagrody dostają najwyżej sklasyfikowani.

### `push-fold`: push/fold / push/fold

- **Werdykt: OK**.
- Użycie w korpusie: PS 111, PG 23.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/sit-and-go/sng-przeglad-lekcji/: „…Zrozumienie kluczowych czynników Metagame w SnG ? Moduł zaawansowany Zaawansowane oddsy w SnG Zaawansowany ICM Zasięgi Nash'a dla gry push-or-fold Tworzenie eksploatującego gameplanu Zapobieganie re-eksploatowaniu”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Uproszczona strategia dla krótkich stacków: przed flopem gra się albo all-in, albo pas.
- Uwagi: PokerStrategy PL częściej „push or fold”.

### `shove`: wpychanie / shove (jam, push)

- **Werdykt: zmienić nazwę PL**. pl: „shove” (PokerGround) albo „push” (PokerStrategy PL); „wpychanie” prawie nie występuje
- Użycie w korpusie: PS 1324, PG 250; obecna nazwa „wpychanie”: PS 3, PG 4.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Push/: „Push oznacza zakład za wszystko, all-in.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Zagranie all-in, zwykle jako przebicie przed flopem.
- Uwagi: Słownik PokerStrategy PL, hasło Push: „Push oznacza zakład za wszystko, all-in.”

### `icm`: ICM / Independent Chip Model

- **Werdykt: OK**.
- Użycie w korpusie: PS 354, PG 142.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/EV_2044/: „$EV, który jest ważnym elementem ICM, jest pieniężnym odpowiednikiem EV. Jeżeli w turnieju nie przełożysz ilości żetonów w swoim stacku na pieniądze, ale starasz się zająć…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Model, który przelicza turniejowe żetony na wartość pieniężną z uwzględnieniem struktury wypłat i stacków wszystkich graczy.

### `bubble`: bańka / bubble

- **Werdykt: zmienić nazwę PL**. pl: „bubble”
- Użycie w korpusie: PS 358, PG 240; obecna nazwa „bańka”: PS 0, PG 2.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Bubble/: „Dodatkowym znaczeniem bubble jest faza turnieju tuż przed osiągnięciem bubble”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Faza turnieju tuż przed miejscami płatnymi, gdy do nagród brakuje odpadnięcia kilku graczy.
- Uwagi: Słownik PokerStrategy PL, hasło Bubble: „Najwyższe miejsce w turnieju, za które nie jest przyznawana nagroda pieniężna, nazywane jest bubble.” GGPoker PL: „Okres w trakcie turnieju pokerowego, tuż przed dotarciem do strefy miejsc płatnych.”

### `bubble-factor`: bubble factor / bubble factor

- **Werdykt: OK**.
- Użycie w korpusie: PS 97, PG 0.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Bubble-factor_2045/: „Bubble factor jest czynnikiem, który wpływa na fakt, że twoje oddsy jeżeli chodzi o żetony są różne niż oddsy w dolarach.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Wskaźnik z ICM: ile bardziej w turnieju boli przegrana niż cieszy wygrana tej samej liczby żetonów.

### `cover`: przykrywać / cover

- **Werdykt: zmienić nazwę PL**. pl: „pokrywać” („pokrywasz go” = masz więcej żetonów)
- Użycie w korpusie: PS 14, PG 36; obecna nazwa „przykrywać”: PS 0, PG 0.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/dara-okearney-wczesne-odpadniecie-z-turnieju-pko-moze-byc-dobrym-sygnalem/: „w której pokrywasz stacki graczy przy swoim stole”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Mieć więcej żetonów niż rywal. Gdy rywal ma więcej od Ciebie, przegrany z nim all-in kończy Twój turniej.
- Uwagi: „przykrywać” nie występuje.

### `risk-premium`: premia za ryzyko / risk premium

- **Werdykt: zmienić nazwę PL**. pl: „risk premium”
- Użycie w korpusie: PS 145, PG 0; obecna nazwa „premia za ryzyko”: PS 0, PG 0.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/sit-and-go/sng-przeglad-lekcji/: „…i poznasz kilka domyślnych tabel rąk startowych. Chip value Zasada malejącej wartości żetonów Podstawy ICM Zastosowanie ICM Koncepcja risk premium Gra preflop Open raisowanie Dołączanie do otwartej puli Sprawdzanie i izolowanie all-inów Niekonwencjonalne zagrania Tabele open…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Dodatkowe equity ponad to, czego wymagają pot odds, potrzebne w turnieju do ryzyka all-in, bo przegrana kosztuje więcej, niż daje wygrana.
- Uwagi: PokerStrategy PL ok. 145 razy „risk premium”, „premia za ryzyko” ani razu.

### `m-ratio`: M / M-ratio

- **Werdykt: OK**.
- Użycie w korpusie: PS 44, PG 0.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Q/: „Q określa relatywną pozycję gracza względem innych graczy biorących udział w grze. harrington opisuje go jako \"słabą siłę\" podczas gdy współczynnik M określa się jako \"mocną siłę\", ponieważ używa się go przeważnie w turniejach typu satelita, w których wszyscy pozostali gracze walczą o…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stack podzielony przez sumę blindów i ante w jednym rozdaniu: na ile rund wystarczy żetonów bez gry (miara Harringtona).

### `red-zone`: strefa czerwona / red zone

- **Werdykt: OK**.
- Użycie w korpusie: PS 4, PG 0.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/mtt/dan-harrington-m-factor/: „Harrington definiuje 5 stref, w których grasz w turnieju. strefa zielona: M > = 20 strefa żółta: 10 < M < 20 strefa pomarańczowa: 5 < M < = 10 strefa czerwona: 1 < = M < = 5 strefa śmierci: M < 1 W dalszej części artykułu zajmie”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Strefa Harringtona z bardzo niskim M: zostaje głównie gra all-in albo pas.

### `green-zone`: strefa zielona / green zone

- **Werdykt: OK**.
- Użycie w korpusie: PS 4, PG 0.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/mtt/dan-harrington-m-factor/: „Harrington definiuje 5 stref, w których grasz w turnieju. strefa zielona: M > = 20 strefa żółta: 10 < M < 20 strefa pomarańczowa: 5 < M < = 10 strefa czerwona: 1 < = M < = 5 strefa śmierci: M < 1 W dalszej części artykułu zajmie”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Strefa Harringtona z wysokim M: stack pozwala grać swobodnie, zachowawczo albo agresywnie.

### `ante`: ante / ante

- **Werdykt: OK**.
- Użycie w korpusie: PS 275, PG 275.
- Cytat polski: Wikipedia PL, Poker, https://pl.wikipedia.org/wiki/Poker: „W niektórych odmianach pokera, aby otrzymać karty, należy uiścić stawkę wejściową (ante). W innych, jak w Texas Hold’em, obowiązek stawiania w ciemno ma dwóch kolejnych graczy po rozdającym (ang. dealer).”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Mała obowiązkowa wpłata do puli przed rozdaniem od wszystkich graczy (głównie w turniejach).

### `bb-ante`: ante dużego blinda / big blind ante (BB ante)

- **Werdykt: zmienić nazwę PL**. pl: „big blind ante” (skrót BB ante)
- Użycie w korpusie: PS 3, PG 55; obecna nazwa „ante dużego blinda”: PS 0, PG 0.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/jonathan-little-o-ciekawej-sytuacji-z-turnieju-u-s-poker-open/: „000 z big blind ante na poziomie 1”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Format ante, w którym zamiast wszystkich graczy ante za cały stół wpłaca gracz na dużym blindzie.

### `fold-equity`: fold equity / fold equity

- **Werdykt: OK**.
- Użycie w korpusie: PS 1569, PG 109.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Fold-Equity/: „…pot equity, to procent puli należący do gracza na podstawie tego, jak prawdopodobne jest, że wszyscy przeciwnicy spasują, nazywamy fold equity.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Część wartości zagrania, która pochodzi z tego, że rywal może spasować.

### `gap-concept`: gap concept / gap concept

- **Werdykt: OK**.
- Użycie w korpusie: PS 3, PG 0.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Koncepcja-luki/: „Koncepcja luki to teoria sformułowana przez David Sklansky'ego. Twierdzi on, że do sprawdzenia zakładu potrzebna jest lepsza karta, niż do wykonania…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Zasada, że do sprawdzenia lub przebicia otwarcia potrzeba silniejszej ręki niż do samego otwarcia.
- Uwagi: Słownik PokerStrategy PL ma hasło „Koncepcja luki”; w artykułach „gap concept”.

### `chip-ev`: chip EV / chip EV (cEV)

- **Werdykt: OK**.
- Użycie w korpusie: PS 49, PG 6.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/sit-and-go/future-game-simulation-kluczowe-czynniki/: „…FGS. Warto wyciągnąć z tego wniosek, że zasięgi pushowania z wczesnych pozycji powinny być nieco szersze, niż dyktowałby to ICM czy cEV. Spójrz na przykład, który obrazuje praktyczne zastosowanie tej zasady: W tym przykładzie, właściwy (+cEV) zasięg pushu z UTG na 10bb…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Wartość oczekiwana zagrania liczona w żetonach, bez przeliczania ich na pieniądze (bez ICM).

### `tournament-equity`: equity turniejowe / tournament equity

- **Werdykt: nie potwierdzono (polska nazwa)**. pl „equity turniejowe” nie występuje; słownik PokerStrategy PL ma hasło „$EV”
- Użycie w korpusie: PS 219, PG 0.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/EV_2044/: „$EV, który jest ważnym elementem ICM, jest pieniężnym odpowiednikiem EV.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Twoja oczekiwana część puli nagród przy danej strukturze wypłat i stackach.
- Uwagi: Do decyzji: „$EV” albo opis („Twoja część puli nagród”).

### `prize-pool`: pula nagród / prize pool

- **Werdykt: OK**.
- Użycie w korpusie: PS 90, PG 46.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Freezeout/: „Freezeout jest rodzajem turnieju pokerowego, w którym zwycięzca zgarnia całą pulę nagród, lub w którym gracz odpada w momencie, kiedy przegra  wszystkie swoje żetony.  Nie  ma możliwości ich dokupienia.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Suma pieniędzy do podziału między nagrodzonych graczy turnieju.

### `payout`: wypłata / payout

- **Werdykt: OK**.
- Użycie w korpusie: PS 188, PG 102.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Struktura-wyplat/: „Struktura wypłat turnieju określa jak dzielona jest pula nagród pośród zwycięzców turnieju.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Nagroda za konkretne miejsce w turnieju; wszystkie razem tworzą strukturę wypłat.
- Uwagi: Uwaga na wieloznaczność: hasło „Wypłata” w słowniku PokerStrategy PL to wypłata pieniędzy z konta (withdrawal); w znaczeniu nagrody turniejowej używa się „struktura wypłat”.

### `pay-jump`: skok wypłaty / pay jump

- **Werdykt: zmienić nazwę PL**. pl: „pay jump” („skok wypłat” rzadziej)
- Użycie w korpusie: PS 1, PG 20; obecna nazwa „skok wypłaty”: PS 1, PG 4.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/sit-and-go/future-game-simulation-wprowadzenie/: „…i próbować wpływać na moment wzrostu poziomu blindów dla własnej korzyści. Pozycja Ważna jest też pozycja . Jeśli zbliża się kolejny payjump, dobrze jest nie musieć do tego czasu wpłacać blindów. Dobrze jest też siedzieć za luźnymi graczami z dużymi stackami, a graczy grających…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Różnica wypłaty między sąsiednimi miejscami w turnieju; duże skoki zwiększają premię za ryzyko.
- Uwagi: Termin bez znaczników w treści; zmiana bez kosztu.

### `final-table`: stół finałowy / final table [FT]

- **Werdykt: OK**.
- Użycie w korpusie: PS 34, PG 105.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Umowa_281/: „turniej, MTT, stół finałowy, ICM”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Ostatni stół turnieju, przy którym gra się o najwyższe nagrody.

### `short-stack`: krótki stack / short stack

- **Werdykt: zmienić nazwę PL**. pl: „short stack” (też „shortstack”)
- Użycie w korpusie: PS 590, PG 181; obecna nazwa „krótki stack”: PS 0, PG 19.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Shortstack/: „Shortstack to mała ilość żetonów w relacji do żetonów przeciwnika, maksymalnego buy-inu, albo obecnego poziomu blindów.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stack mały w stosunku do blindów; w turniejach zwykle taki, przy którym zostaje niewiele dużych blindów.
- Uwagi: W korpusie ok. 790 razy „short stack/shortstack”, „krótki stack” 12 razy.

### `nash-equilibrium`: równowaga Nasha / Nash equilibrium

- **Werdykt: OK**.
- Użycie w korpusie: PS 28, PG 14.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/GTO-Game-Theoretical-Optimum-_2135/: „Ta koncepcja pochodząca z teorii gier opisuje strategię, która mogłaby być uznana za optymalną na zasadach równowagi Nasha.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Zestaw strategii, w którym żaden gracz nie zyska, zmieniając sam tylko swoją strategię.

### `overcall`: overcall / overcall

- **Werdykt: OK**.
- Użycie w korpusie: PS 49, PG 5.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Overcall/: „Gracz wykonuje overcall, kiedy sprawdza podbicie w momencie, kiedy inny gracz lub inni gracze już je sprawdzili.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Sprawdzenie zakładu, który ktoś przed Tobą już sprawdził.

### `heads-up`: heads-up / heads up

- **Werdykt: OK**.
- Użycie w korpusie: PS 624, PG 112.
- Cytat polski: Wikipedia PL, Texas Hold’em, https://pl.wikipedia.org/wiki/Texas_Hold%E2%80%99em: „Kolejność licytacji i struktura zakładów w ciemno zmienia się, gdy w grze pozostaje dwóch graczy (ang. heads up). Mała ciemna przypada wtedy rozdającemu (dealerowi), natomiast duża ciemna drugiemu graczowi. Ostatnia karta rozdawana jest dealerowi,…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Gra jeden na jeden: przy stole albo w rozdaniu zostało tylko dwóch graczy.

### `dead-money`: dead money / dead money

- **Werdykt: OK**.
- Użycie w korpusie: PS 148, PG 23.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Commited_1801/: „…to, że taki gracz musi dorzucić do puli zaledwie 25% jej wartości, aby osiągnąć break even. Jeżeli w puli znajdują się jeszcze inne dead money, wówczas oddsy są jeszcze lepsze.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Żetony w puli od graczy, którzy nie mogą już jej wygrać, np. od tych, którzy spasowali.
- Uwagi: Słownik PokerStrategy PL ma też hasło „Martwa kasa”.

### `stack-off`: stack off / stack off

- **Werdykt: OK**.
- Użycie w korpusie: PS 15, PG 0.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/omaha-poker/2194/: „…call vs. raise z silną ręką, przede wszystkim będziemy kierować się hand readingiem, grywalnością ręki na dalszym streecie i equity vs. stack off range rywala: • Jaki rywal ma cbet na danym boardzie (przykładowo otworzył gracz na SB i sprawdził go BB, na flopie J T 8 SB gra cbet;…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Włożyć do puli cały stack w jednym rozdaniu, czyli zagrać albo sprawdzić all-in.

### `exploit`: eksploatacja / exploit (exploitative play)

- **Werdykt: OK**.
- Użycie w korpusie: PS 111, PG 128.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Polarising-Spolaryzowany_2023/: „Polaryzacja zasięgu oznacza zawarte w nim dwa przeciwne rodzaje układów (value hands oraz air), co czyni je bardzo wrażliwymi na eksploatację (nieopłacenie lub odkrycie poprzez bluff). Dlatego też, aby uniknąć polaryzacji, powinien on trzymać zasięg swoich rąk tak szeroki, jak…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Świadome odejście od strategii bazowej, żeby wykorzystać konkretny błąd rywala albo całej populacji graczy.
- Uwagi: W użyciu głównie czasownik „eksploatować”, rzeczownik „eksploatacja” rzadko.

### `hud`: HUD / heads-up display

- **Werdykt: OK**.
- Użycie w korpusie: PS 18, PG 185.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/jak-korzystac-z-pokerowych-trackerow/: „Co to jest HUD? HUD to skrót od angielskiego słowa „head up display” , które fachowo tłumaczy się j”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Nakładka na stół w grze online, która pokazuje statystyki rywali z wcześniej rozegranych rozdań.

### `vpip`: VPIP / voluntarily put in pot

- **Werdykt: OK**.
- Użycie w korpusie: PS 824, PG 43.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/VPIP/: „VPIP lub VP$IP to procent rąk, w jakich gracz włożył dobrowolnie do puli pieniądze przed flopem.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Statystyka HUD: w jakim odsetku rozdań gracz dobrowolnie wkłada pieniądze do puli przed flopem (sprawdza albo przebija).

### `pfr`: PFR / preflop raise

- **Werdykt: OK**.
- Użycie w korpusie: PS 987, PG 31.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/jak-korzystac-z-pokerowych-trackerow/: „PFR – jak często gracz przebija przed flopem”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Statystyka HUD: w jakim odsetku rozdań gracz przebija przed flopem.

### `wtsd`: WTSD / went to showdown

- **Werdykt: OK**.
- Użycie w korpusie: PS 38, PG 26.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/jak-korzystac-z-pokerowych-trackerow/: „ctor Flop/Turn/River – jak często gracz wybiera agresywne linie na każdej ulicy WTSD – jak często gracz dochodzi na showdown”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Statystyka HUD: jak często gracz, który zobaczył flop, dochodzi do showdownu.

### `nit`: nit / nit

- **Werdykt: OK**.
- Użycie w korpusie: PS 71, PG 212.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Nit_193/: „Określenie gracza tight-passive, inaczej murka albo weak-tight”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Bardzo ciasny gracz, który wchodzi do puli niemal wyłącznie z mocnymi rękami.
- Uwagi: Słownik PokerStrategy PL zawęża nita do gracza tight-passive; definicja w kursie idzie za GTO Wizard („very tight”), co obejmuje oba ujęcia.

### `regular`: regular / regular (reg)

- **Werdykt: zmienić nazwę PL**. pl: „reg” (PokerGround); PokerStrategy PL pisze „regulars”
- Użycie w korpusie: PS 121, PG 264; obecna nazwa „regular”: PS 14, PG 2.
- Cytat polski: PokerGround, artykuł, https://pokerground.com/anatomia-reki-1-babel92/: „50$/1$ większość regów posiada dobrze rozwiniętą umiejętność hand readingu, a mój rywal nie jest wyjąt”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Stały bywalec danej stawki, który gra dużo i w miarę solidnie; przeciwieństwo gracza rekreacyjnego.
- Uwagi: Drobna zmiana; „regular” nie jest kalką, tylko rzadszą formą.

### `tag`: TAG / tight aggressive

- **Werdykt: OK**.
- Użycie w korpusie: PS 858, PG 117.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/TAG/: „Skrót dla "tight aggressive" opisujący styl gry, w którym bardzo agresywnie rozgrywa się niewiele wyselekcjonowanych rąk.”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Styl ciasno-agresywny: mało rąk, ale grane agresywnie (zakłady i przebicia).

### `lag`: LAG / loose aggressive

- **Werdykt: OK**.
- Użycie w korpusie: PS 420, PG 73.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/LAG/: „LAG jest skrótem dla "loose-aggressive"”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Styl luźno-agresywny: dużo rąk, grane agresywnie.

### `recreational`: gracz rekreacyjny / recreational player (fish)

- **Werdykt: OK**.
- Użycie w korpusie: PS 8, PG 384.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/sit-and-go/spin-n-go-fakty-strategia/: „…narzędzi takich jak: HoldemResources Calculator , ICMIZER , Simple Nash . Pamiętaj, by używać ich do określania chipEV. Popularne wśród graczy rekreacyjnych Grając Spin & Go, możesz wygrać tysiące razy więcej niż twoje wpisowe w pojedynczym turnieju. Ze względu na swoją losowość i łatwość w…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Gracz, który gra dla rozrywki i zwykle słabiej od stałych bywalców; w żargonie pogardliwie „fish”.
- Uwagi: PokerStrategy PL częściej „fish”.

### `calling-station`: calling station / calling station

- **Werdykt: OK**.
- Użycie w korpusie: PS 707, PG 99.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Calling-station/: „Calling station lub po prostu station, to wyjątkowo luźny (duży zakres rąk) i pasywny gracz, który rozgrywa zbyt wiele rąk i za dużo z nimi licytuje.…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pogardliwie o graczu, który bardzo często sprawdza, nawet słabymi rękami, a rzadko pasuje lub przebija.

### `maniac`: maniak / maniac

- **Werdykt: OK**.
- Użycie w korpusie: PS 531, PG 106.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Maniak/: „Maniak jest ekstremalnie agresywnym graczem”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Pogardliwie o graczu bardzo luźnym i agresywnym, który stawia i przebija z byle czym.

### `rake`: rake / rake

- **Werdykt: OK**.
- Użycie w korpusie: PS 122, PG 185.
- Cytat polski: Słownik PokerStrategy PL, https://polska.pokerstrategy.com/glossary/Affiliate/: „…przykładem affiliate - ponieważ zachęca swoich użytkowników do gry na wybranych platformach pokerowych i jest wynagradzana udziałem w rake'u, jaki poleceni gracze wypracują. PokerStrategy uczy także swoich użytkowników, jak grać w pokera, zapewniając platformom zmotywowanych…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Prowizja, którą kasyno albo pokój online pobiera z puli lub z wpisowego za prowadzenie gry.

### `rake-cap`: limit rake'u / rake cap

- **Werdykt: OK**.
- Użycie w korpusie: PS 3, PG 0.
- Cytat polski: PokerStrategy PL, artykuł, https://polska.pokerstrategy.com/strategy/sss/1689/: „…nie odzyskuje się wcale tak łatwo, nawet gdy grasz przeciwko słabym graczom. Dlatego też z reguły dla gier heads-up obowiązuje niższy limit rake'u. Oznacza to, że nie płacisz wyższego rake'u w jednym rozdaniu niż określona suma. Graj tylko wtedy, gdy ograniczenie rake'u jest na…”
- Nazwa angielska: poprawna; cytat w polu `source`.
- Definicja: Najwyższa kwota rake'u, jaką pokój może pobrać z jednego rozdania.
- Uwagi: Rzadkie (PokerStrategy PL).
