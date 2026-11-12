# Scenariusz: etykiety turn-bet i zgodność widoków FG (sesja FM)
Rola 04, build, 2026-11-12. Rozstrzyga FH ŚR-001 (`docs/programista/recenzje/recenzja-fg-fb712515.md`, 08-programista-001) i przegląda widoki list-hand, river-catch, defend z sesji FG. Uzupełnia `scenariusz-akcje-i-liczby.md` (D-886, D-888). Decyzje: D-1430–D-1434, `docs/decyzje/FM.md`. Wdraża rola 08; przekład nowych kluczy na 10 pozostałych słowników to rola 09 (poniżej pl i en). Stan kodu czytany na `56a7ac70`.

## 1. turn-bet (D-1430, D-1431)

### Zasada
turn-bet to dwa rozmiary tego samego zagrania, więc działa jak size-spot: **ta sama nazwa, różna kwota** w drugiej linii przycisku. Słowa „mały”, „duży” nie trafiają na przycisk (przy pokazanej kwocie nic nie dodają), a termin „c-bet” nie pasuje do turnu (D-1375 miał tu rację). Wiersz puli ma ten sam wzór co w draw-call, bez części „do sprawdzenia”, bo nikt przed tobą nie stawiał.

### Nowe klucze
| Klucz | pl | en | Kiedy |
|---|---|---|---|
| `scenario.action.bet` | `{{t:bet\|zakład}}` | `{{t:bet}}` | turn-bet `bet-small` i `bet-big` |
| `scenario.potOnly` | `W {{t:pot\|puli}} {{pula}} bb` | `{{t:pot\|Pot}} {{pula}} bb` | wiersz puli, gdy `doSprawdzeniaBb` = null (dziś tylko turn-bet) |

- Przed „bb” spacja nierozdzielająca (U+00A0), jak w `scenario.action.amount*` w słownikach.
- Kwota przycisku: istniejący `scenario.action.amountPay` (`{{bb}} bb`); opis klucza w `pl.kontekst.json` rozszerzyć: „kwota, którą wkładasz do puli: sprawdzenie, limp, zakład”.
- Opis dla tłumacza (`pl.kontekst.json`): `scenario.action.bet`: „Rzeczownik: pierwsze postawienie żetonów w rundzie (termin `bet`). Forma do zdania, od małej litery; przycisk podnosi pierwszą literę”. `scenario.potOnly`: „Wiersz pod stołem: ile jest w puli przed twoim zakładem; ten sam szyk co pierwsza część `scenario.pot`”.

### Wynik na ekranie (pl, przykład z puli 16 bb, zakłady 4 i 12 bb)
| Miejsce | Dziś (FG) | Po zmianie |
|---|---|---|
| Wiersz pod stołem | `Pula: 16bb` | `W puli 16 bb` |
| Przyciski | `Zakład 4bb` · `Zakład 12bb` (jedna linia) | `Zakład (bet)` / `4 bb` · `Zakład (bet)` / `12 bb` |
| Werdykt i ogłoszenie VoiceOver | `Twój wybór: Zakład 4bb. Lepiej: Zakład 12bb.` | `Twój wybór: zakład (bet) 4 bb. Lepiej: zakład (bet) 12 bb.` |
| Dziennik (twój ruch) | `BTN: Zakład 4bb` (wariant zapasowy `${pos}: ${fraza}`) | `BTN: zakład 12 bb` (`play.log.bet`, jak ruch rywala) |
| Pasek ocen | `Zakład 4bb` | `Zakład (bet)` / `4 bb` (D-1434; czytnik: „Zakład (bet), 4 bb zgodna”) |
| Lista na końcu | `Turn: Zakład 4bb` | `Turn: zakład (bet) 4 bb` |

Pasek ocen (D-1434): `PasekOcenAkcji` pokazuje dziś tylko `nazwy[a]` (`EkranScenariusza.tsx:278`, `komponenty.tsx:101`), więc dwie akcje o tej samej nazwie są nie do odróżnienia. Ten sam problem ma już size-spot (trzy razy „Przebicie (raise)”). Reguła: gdy w punkcie co najmniej dwie akcje mają tę samą nazwę, pasek ocen dostaje tekst przycisku (nazwa, a pod nią kwota), a etykieta czytnika „nazwa, kwota”; w pozostałych punktach bez zmian (sama nazwa, makieta BE `ekrany/scenariusz.html:82`).

### Miejsca w kodzie (dla 08)
| Plik:linia (@ 56a7ac70) | Dziś | Zmiana |
|---|---|---|
| `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:57-63` | gałąź `turn-bet` z `t('play.bet', { bb })`, `kwota: null` | usunąć gałąź; ogólna ścieżka (`opisAkcji` + `amountPay` + `formatujLiczbe` + `wielka`) daje przycisk dwuliniowy i frazę małą literą. Zachować błąd przy `kwotaAkcji` = null dla turn-bet (FH NIS-004). |
| `apps/mobile/src/features/scenariusz/wariant.ts:96-97` | `bet-small`/`bet-big` → `betSmall`/`betBig` bez kwoty | dla `p.point === 'turn-bet'`: `nazwa('bet', 'pay')`; cbet-case bez zmian |
| `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:162-168` (`reakcjaGracza`) | turn-bet wpada w `${pos}: ${fraza}` | `bet-small`/`bet-big` z kwotą → `t('play.log.bet', { pos, bb })` |
| `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:275-278` (`nazwy`, `etykiety`) | sama nazwa | D-1434: przy powtórzonej nazwie `nazwy[a]` = `przycisk`, `etykiety[a]` = `${nazwa}, ${kwota}` (dotyczy turn-bet i size-spot) |
| `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:259` | `t('play.potLabel', { bb: widok.pulaBb })` | `t('scenario.potOnly', { pula: formatujLiczbe(widok.pulaBb, jezykZadan()) })` |
| `apps/mobile/src/i18n/locales/pl.json`, `en.json` (+ 10 słowników, 09) | — | klucze z tabeli wyżej w grupie `scenario` |
| `apps/mobile/src/features/scenariusz/__tests__/fg-turn-bet-ekran.test.tsx:3`, `:71-77`, `:95-101` | testy przypinają `play.bet`, `play.potLabel` | przepisać na kryteria niżej (zmiana oczekiwania wynika z D-1430, nie z dopasowania do kodu) |

`play.bet`, `play.potLabel` po zmianie nie mają użycia w kodzie (`grep -rn "play.bet\|potLabel" apps/mobile/src` → dziś tylko `EkranScenariusza.tsx:61`, `:259`). Klucze zostają w słownikach do czasu trybu gry; `pnpm i18n:kod` zgłasza nieużywane klucze jako uwagę, nie błąd (`scripts/sprawdz-i18n.mjs:134`).

### Kryteria akceptacji (turn-bet)
1. `grep -n "t('play\.\(bet\|potLabel\)" apps/mobile/src/features/scenariusz/EkranScenariusza.tsx` → 0 trafień.
2. Test RNTL: przyciski mają nazwę `t('scenario.action.bet')` z wielką pierwszą literą i drugą linię `t('scenario.action.amountPay', { bb: formatujLiczbe(p.betSmall|p.betBig) })`; etykieta czytnika zawiera nazwę i kwotę.
3. Test: zdanie werdyktu i ogłoszenie zaczynają frazę akcji od małej litery (`fraza` = `withAmount` z nazwą bez `wielka`).
4. Test: wiersz puli = `t('scenario.potOnly', { pula })`, bez „·”.
5. Test: wpis dziennika twojego zakładu = `t('play.log.bet', { pos: hero, bb })`.
6. Test (turn-bet i size-spot): pasek ocen pokazuje kwotę przy każdej akcji; w range-spot z różnymi nazwami bez zmian.
7. Przy AX5 na 320 pt dwie linie przycisku mieszczą się bez ucinania (jak kryterium 6 D-886).

## 2. Przegląd widoków FG pod kątem `design-spec.md` i D-886/D-888 (znaleziska dla 08)

Metoda: odczyt `EkranScenariusza.tsx`, `wariant.ts` i testów `fg-*-ekran.test.tsx` @ 56a7ac70, porównanie z `scenariusz-akcje-i-liczby.md` i `scenariusz-i-ocena.md`. Bez zrzutu (brak symulatora; wygląd na urządzeniu niesprawdzony, krok testu na telefonie).

| ID | Widok | Poziom | Znalezisko | Plik:linia | Co zrobić |
|---|---|---|---|---|---|
| FM-01 | turn-bet | ŚR | = FH ŚR-001; rozstrzygnięte w §1 | `EkranScenariusza.tsx:57-63`, `:259` | §1 |
| FM-02 | river-catch, defend, draw-call, turn-bet | NIS | Liczby w wierszu puli i w dzienniku idą do tekstu jako surowa liczba, bez `formatujLiczbe` (D-886: liczba wg języka). Dziś teoretyczne: generator zaokrągla zakład do całości (`packages/poker-core/src/scenario-gen.ts:774`, `:790`), pule z szablonu są całkowite. Przy puli 7,5 bb pl pokazałby „7.5”. | `EkranScenariusza.tsx:148` (`play.log.bet`), `:258` (`scenario.pot`) | przekazywać `formatujLiczbe(x, jezykZadan())`, przy okazji FM-01 |
| FM-03 | wszystkie z `scenario.pot` | NIS (dla 09) | `scenario.pot` ma zwykłą spację przed „bb” w pl, en, de (odczyt bajtów słownika), a klucze `scenario.action.amount*` spację nierozdzielającą. W wąskim wierszu „bb” może przejść do nowej linii. | `apps/mobile/src/i18n/locales/pl.json:1070` | 09: U+00A0 przed „bb” w `scenario.pot` i nowym `scenario.potOnly` we wszystkich słownikach |
| FM-04 | list-hand | NIS | `raise` w słownictwie list-hand (`AKCJE_LISTY`) dostaje nazwę „przebicie”, a D-886 rezerwuje ją dla otwarcia. Szablon przebicia wobec otwarcia nazwałby 3-bet „przebiciem”. Dziś bez skutku: `sc-10` używa tylko `4bet`, `call`, `fold`. | `wariant.ts:29`, `:102-104` | D-1432: `raise` w list-hand = otwarcie; `3bet` → `scenario.action.threeBet` dochodzi do `AKCJE_LISTY` i lustra w bramce razem z pierwszym szablonem, który go potrzebuje |
| FM-05 | list-hand | — (zgodne) | Przyciski bez kwot (szablon nie ma rozmiarów), werdykt „sprawdzenie (call)” / „4-bet” bez kwoty: zgodne z D-1432. Opis sytuacji pod stołem (D-1379): przyjęty bez zmian. | `EkranScenariusza.tsx:252` | nic |
| FM-06 | river-catch, defend | — (zgodne) | Nazwy `fold`/`call` z `scenario.action`, kwota sprawdzenia = zakład rywala (`amountPay`), wiersz `scenario.pot`, ruch rywala `play.log.bet` (w defend to c-bet rywala; „zakład” jest poprawnym terminem ogólnym, `content/terms.yaml:156`), stół 5/3 karty, brak sekcji „Liczby” przy braku zdań (D-888). | `wariant.ts:113`, `:314`; `EkranScenariusza.tsx:148` | nic; zdania „Liczby” to zadanie 06/09 (D-1433) |
| FM-08 | size-spot (poza FG) | ŚR | Pasek ocen pokazuje trzy razy tę samą nazwę „Przebicie (raise)” bez kwoty: użytkownik nie widzi, który rozmiar był zgodny, a który błędem (tylko kolejność). | `EkranScenariusza.tsx:275-278`, `komponenty.tsx:101` | D-1434, razem z FM-01 |
| FM-07 | river-catch, defend | NIS (dla 06/09) | Brak zdań „Liczby” (D-1380). Ekran jest zgodny, ale użytkownik nie widzi rachunku ceny, który jest sednem obu rodzajów (cena sprawdzenia vs udział blefów, MDF). | `liczby.ts` (`zdaniaLiczb` → `[]`) | 06: zdania z sensem w tym samym zdaniu (wzór `scenario.numbers.line`, D-888); 09: przekład; 08: podpięcie |

Poza zakresem tej sesji: FH ŚR-002 (testy oceny z poprawnym „fold”) i NIS-003 (przekłady `fourBet`) nie dotyczą projektu.
