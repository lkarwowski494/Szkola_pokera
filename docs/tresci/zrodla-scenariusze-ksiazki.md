# Źródła dla szablonów „brakuje” i „częściowo”: luki i książki do kupienia (KO-044)
Stan: 2026-11-10 · Rola 06 build, sesja BG, zadanie 1 · Wejście: `docs/zakres/scenariusze-plan.md` §2, `docs/tresci/rejestr.json`, `content/pl/rules.yaml` · Decyzja: D-566

## 1. Metoda
- Dla reguł wskazanych w szablonach SC-07…SC-31 (silnik „częściowo” i „brakuje”, 36 reguł) odczytałem z rejestru twierdzeń status, werdykt i szczeble źródeł (`rejestr.json`, pole `zrodla[].szczebel`; ADR-24: 1 rachunek, 2 opublikowany solver, 3 książki, 4 serwisy szkoleniowe, 5 eksploatacja z danymi o populacji).
- Książkę przypisuję do luki tylko wtedy, gdy temat stoi w **spisie treści przeczytanym w surowym tekście** (`curl` + `grep`, odczyt 2026-11-10; kopie w katalogu roboczym sesji). Spis to nie treść: przed użyciem w aplikacji trzeba przeczytać rozdział i zapisać cytat (CLAUDE.md, „przeczytane źródło”).

## 2. Luki
**A. Reguły, które stoją tylko na szczeblu 4** (wszystkie mają status „potwierdzone”, werdykt POPARTE, ale bez szczebla 1–3):

| Reguła | Szablon | Szczeble | Czego brakuje |
|---|---|---|---|
| R-M4-010 (4-bet z AA, KK, AK) | SC-10 | 4, 4, 4 | solver albo książka o grze wobec 3-betu |
| R-M4-012 (rozmiar izolacji limpera) | SC-09 | 4, 4, 4 | źródło wyższego szczebla `[DO USTALENIA]`: żaden przeczytany spis nie ma rozdziału o izolacji |
| R-M4-013 (zakres wobec wielu limperów) | SC-09 | 4 ×4 | jw. (Acevedo ma podrozdział „Limping”, s. 127; czy dotyczy izolacji: `[DO USTALENIA]`) |
| R-M10-004 (VPIP − PFR = gracz pasywny) | SC-29 | 4 ×3 (w tym analiza bazy rąk) | dane o populacji (szczebel 5), nie książka |
| R-M10-006 (więcej value wobec pasywnego) | SC-29 | 4 ×6 (populacja bez liczby rąk) | jw. |
| R-M10-007 (pasuj na 3-bet nita) | SC-30 | 4, 4 | jw. |

Pozostałe 30 reguł tych szablonów ma co najmniej jedno przeczytane źródło szczebla 1 lub 2 (sprawdzone, brak luki).

**B. Warunki do napisania (silnik „brakuje”, ZAL-013)**: to nowe twierdzenia, których dziś nie ma w rejestrze; każde potrzebuje źródła przed `grading.ts`:
- SC-16: które ręce i drawy kwalifikują się do check-raise'u; SC-18: klasa karty turnu „dobra dla otwierającego”; SC-21: definicja „średniej ręki”; SC-22 i SC-25: które ręce rywala zapłacą na riverze (model zakresu); SC-23: warunek blokera; SC-24: skład blefów rywala; SC-26–SC-28: strefa SPR i liczba ulic wartości jako warunek sprawdzalny.

## 3. Książki do kupienia (priorytet: najwięcej luk pierwszeństwa)
| # | Książka | Wydanie, ISBN (gdzie przeczytany) | Co pokrywa (rozdział ze spisu) | Szablony, reguły |
|---|---|---|---|---|
| 1 | Michael Acevedo, *Modern Poker Theory* | D&B Poker; ISBN 978-1-909457-89-8 (druk), 978-1-909457-91-1 (e-book) — dandbpoker.com/products/modern-poker-theory; rok `[DO USTALENIA]` | „Playing vs 3-bets: General Heuristics” (s. 146), „Limping” (127), „Developing OOP C-betting Strategies” (394), „Turn Play After Flop C-bet and Call” (434), „River Abstract Models” (457), MDF (80) — spis z wyciągu PDF wydawcy | SC-10 (R-M4-010: jedyna luka szczebla 4 z rozwiązaniem w książce), SC-09 (warunkowo), SC-14, SC-18, SC-21, SC-22–25 |
| 2 | Matthew Janda, *Applications of No-Limit Hold 'em* | Two Plus Two; ISBN 978-1-880685-55-6 (skan okładki i spisu, obalkyknih.cz) | „Deciding Whether to Check-Call or Check-Raise” (205), „Playing the Turn in Position” (243) i „Out of Position” (279), „The Value Betting to Bluffing Ratio…” (144), „River Play” (327), „Pinpointing the Optimal River Bet Size” (339), „Polarized and Condensed Ranges” (15) | SC-16, SC-18, SC-20, SC-21, SC-22, SC-23, SC-25 |
| 3 | Bill Chen, Jerrod Ankenman, *The Mathematics of Poker* | ConJelCo 2006; ISBN 978-1-886070-25-7 (conjelco.com/mathofpoker) | rozdz. 11 „Half-Street Games”, 14 „No-Limit Bet Sizing”, 16–18 gry [0,1] (blef, value bet), 12 „Jam-or-Fold Game”, 27 „Tournaments, Part II” — spis LOC (catdir.loc.gov, generowany maszynowo) | SC-22, SC-24, SC-25 (R-M8-001/010/012: podstawa rachunku, dziś szczebel 1 z obliczenia), SC-32, SC-34 |
| 4 | Matt Flynn, Sunny Mehta, Ed Miller, *Professional No-Limit Hold 'em: Volume I* | Two Plus Two 2007; ISBN 978-1-880685-40-2 (rekord MARC, archive.org) | SPR: dziś tylko cytat autorów przez serwis informacyjny w R-M9-010 („…stack-to-pot ratio is 13…”); spisu treści nie znalazłem | SC-26, SC-27, SC-28 (zamiana cytatu pośredniego na bezpośredni) |
| 5 | Andrew Brokos, *Play Optimal Poker 2: Range Construction* | 2020; ISBN 979-8-6471-0092-4 (OpenLibrary) | rozdz. 5 o SPR, rozdz. 11 ICM (spis wydania japońskiego Panrolling); rozdz. 8 barrel na turnie — niesprawdzony dosłownie | SC-26–28, SC-18 (warunkowo), SC-34 |
| 6 | Andrew Brokos, *Play Optimal Poker* (tom 1) | 2019; ISBN 978-1-0709-8272-4 (OpenLibrary) | spisu nie znalazłem; `[DO USTALENIA]` (blokery, bluff-catching według recenzji, niesprawdzone) | SC-23, SC-24 warunkowo |
| 7 | Nelson, Streib, Heston, *Kill Everyone* | Huntington Press, wyd. 2 2009; ISBN 978-1-935396-30-7 (huntingtonpress.com) | spisu nie znalazłem `[DO USTALENIA]` | SC-34 (już szczebel 2; niski priorytet) |
| 8 | Dan Harrington, Bill Robertie, *Harrington on Hold 'em* t. 1–3 | Two Plus Two 2004–2010; ISBN t. 1 978-1-880685-33-4, t. 2 978-1-880685-35-8 (MARC) | tylko tytuły tomów; `[DO USTALENIA]` | M11 ogólnie; niski priorytet |

## 4. Czego książka nie da
- **M10 (SC-29, SC-30, SC-31)**: reguły eksploatacyjne wymagają danych o populacji (ADR-24, szczebel 5: próba, stawki, pokój). Książka teorii ich nie zawiera; potrzebna jest opublikowana analiza bazy rąk z liczbą rąk albo własna baza. Bez tego szablony M10 zostają na obecnych źródłach szczebla 4 z oznaczeniem „jedno źródło”/atrybucją, albo M10 dostaje szablony bez `typRywala` — decyzja produktowa dla roli 03.
- **Izolacja limperów (SC-09)**: żaden przeczytany spis nie ma tego tematu; alternatywa: opublikowany solver z limpem (szczebel 2) — `[DO USTALENIA]`.
