# Zdania „Liczby” dla river-catch i defend — szkic roli 06 (sesja FQ, 2026-11-12)
Zadanie: FM-07 (`docs/design/fm-turn-bet.md` §2, wiersz FM-07), D-1380. Decyzja: D-1465 (`docs/decyzje/FQ.md`). Status: **szkic dla 08 i 09**; teksty nie są w `apps/mobile/src/i18n/locales/*.json` (zakaz zmian plików językowych w FQ). Wzór formy: `scenario.numbers.line` (D-888: liczba i jej sens w tym samym zdaniu; liczby tylko jako parametry, bez liczb w kluczu).

## 1. river-catch (SC-24, SC-31)
Dane wariantu: `RiverCatchVariantDecision` (`packages/poker-core/src/scenario-gen.ts:347-356`): `pot` (pula przed zakładem rywala), `bet`, `bluffShare` (dana zadania), `required`, `correct`.

| Parametr | Wzór | Zgodność z `content/numbers.yaml` |
|---|---|---|
| `pula` | `d.pot + d.bet` — ta sama liczba co wiersz „W puli” na ekranie (`widokDecyzji`, `apps/mobile/src/features/scenariusz/wariant.ts:318`) | — (wyświetlenie) |
| `kwota` | `d.bet` (= „do sprawdzenia” na ekranie) | — |
| `potrzeba` | `kwota ÷ (pula + kwota)` = `requiredEquity(d.pot, d.bet)` = `d.bet ÷ (d.pot + 2·d.bet)`; procent `formatujProcent` | formuła `requiredEquity` z `refs: [pula, zakład]` jak `eq.bet-pot`, `eq.bet-half`, `bluff.share.bet-pot` (`content/numbers.yaml:74-76`, `:322-324`); R-M8-010 |
| `razPotrzeba` | `max(1, round(1 ÷ potrzeba))` — funkcja `raz` z `liczby.ts` | — |
| `udzial` | `d.bluffShare`, procent | dana zadania (D-1143, D-1300), nie twierdzenie |
| wybór zdania sensu | `d.bluffShare > potrzeba` → „więcej”; inaczej „mniej” (generator gwarantuje odstęp ≥ `marginMin` ≥ 0,02, więc równości nie ma) | R-M8-010 (math) |

Rachunek sprawdzony na 1200 wariantach SC-24 i SC-31 (wszystkie poziomy, ziarna 1–200): `potrzeba` = `d.required` = `requiredEquity(d.pot, d.bet)` i kierunek zdania sensu = `d.correct`, 0 rozbieżności (`docs/tresci/dowody/fq-liczby-rachunek.txt`, narzędzie `docs/tresci/narzedzia/fq-liczby-rachunek.ts`). Udziału blefów nie podajemy jako „raz na N”: przy poziomie trudnym (odstęp 0,02–0,05) zaokrąglenie daje tę samą liczbę co cena (np. 30,6 % i 35 % → oba „raz na 3”, SC-24 trudny, ziarno 1), więc zdanie przeczyłoby samo sobie.

Klucze (propozycja nazw dla 08/09; znaczniki `{{t:…}}` jak w `line`, D-966):
- `scenario.numbers.riverCatch`
  - pl: „{{t:pot|Pula}} to {{pula}} bb, a {{t:call|sprawdzenie}} kosztuje {{kwota}} bb, więc potrzebujesz {{potrzeba}} szans, czyli wygrać mniej więcej raz na {{razPotrzeba}}. Wygrywasz tylko z {{t:bluff|blefami}}, a w tym rozdaniu {{t:bluff|blefy}} to {{udzial}} jego {{t:bet|zakładów}}.”
  - en: „The {{t:pot|pot}} is {{pula}} bb and a {{t:call|call}} costs {{kwota}} bb, so you need {{potrzeba}} equity, that is, to win about once in {{razPotrzeba}}. You beat only {{t:bluff|bluffs}}, and in this hand {{t:bluff|bluffs}} make up {{udzial}} of their {{t:bet|bets}}.”
- `scenario.numbers.riverCatchMore`
  - pl: „{{t:bluff|Blefów}} jest więcej, niż potrzebujesz, więc {{t:call|sprawdzenie}} zarabia.”
  - en: „There are more {{t:bluff|bluffs}} than you need, so {{t:call|calling}} makes money.”
- `scenario.numbers.riverCatchLess`
  - pl: „{{t:bluff|Blefów}} jest mniej, niż potrzebujesz, więc {{t:call|sprawdzenie}} traci.”
  - en: „There are fewer {{t:bluff|bluffs}} than you need, so {{t:call|calling}} loses money.”

Gdzie w widoku (dla 08): sekcja „Liczby” punktu `river-catch` (`zdaniaLiczb`, `apps/mobile/src/features/scenariusz/liczby.ts:30`, dziś `[]`): dwa zdania w kolejności `riverCatch`, potem `riverCatchMore` albo `riverCatchLess`, niezależnie od wyboru gracza (rachunek dotyczy rozdania, nie wyboru). To spełnia D-1357 (dana zadania widoczna przed oceną wyjaśnienia). Test 08: dla SC-24 Ł ziarno 1 zdania zawierają „25 bb”, „11 bb”, procent 30,6 %, „raz na 3”, 50 % i wariant „więcej”; dla SC-24 Ś ziarno 1: 28 bb, 14 bb, 33,3 %, 25 % i „mniej” (wartości z `fq-liczby-rachunek.txt`).

## 2. defend (SC-07, SC-15, SC-17)
Dane: `DefendVariantDecision` (`scenario-gen.ts:359-366`): `pot` (przed c-betem), `bet`, `fraction`, `holding`, `correct`. Ocena idzie z klasy ręki (R-M6-006, R-M6-007, heurystyki), więc zdanie liczbowe nie rozstrzyga ręki; pokazuje cenę i MDF z jasnym zastrzeżeniem, że MDF dotyczy zakresu (`docs/zakres/rachunek-szablonow.md` §2, wiersz SC-07: „dotyczy zakresu, nie ręki”).

| Parametr | Wzór | Zgodność z `content/numbers.yaml` |
|---|---|---|
| `pula`, `kwota`, `potrzeba`, `razPotrzeba` | jak w river-catch: `pula = d.pot + d.bet`, `potrzeba = requiredEquity(d.pot, d.bet)` | `requiredEquity` jak `eq.bet-third`, `eq.bet-three-quarters`; R-M6-006 because |
| `obrona` | `mdf(d.pot, d.bet)` = `d.pot ÷ (d.pot + d.bet)` — **pula przed zakładem**, nie wyświetlana `pula` | formuła `mdf` z `refs: [pula, zakład]` (`content/numbers.yaml:250-255`, np. `mdf.bet-third`); R-M6-001 |

Sprawdzenie: pula 12 i zakład 4 (⅓) → cena 20 %, MDF 75 % = `mdf.bet-third`; pula 10 i zakład 5 → 25 % i 66,7 % (`fq-liczby-rachunek.txt`).

Klucz `scenario.numbers.defend`:
- pl: „{{t:pot|Pula}} to {{pula}} bb, a {{t:call|sprawdzenie}} kosztuje {{kwota}} bb, więc potrzebujesz {{potrzeba}} szans, czyli wygrać mniej więcej raz na {{razPotrzeba}}. Przy takim {{t:bet|zakładzie}} {{t:mdf}} to {{obrona}}: to punkt odniesienia dla całego {{t:range|zakresu}}; na flopie możesz bronić trochę mniej, a o jednej ręce decyduje wyjaśnienie.”
- en: „The {{t:pot|pot}} is {{pula}} bb and a {{t:call|call}} costs {{kwota}} bb, so you need {{potrzeba}} equity, that is, to win about once in {{razPotrzeba}}. Against a {{t:bet}} this size, {{t:mdf}} is {{obrona}}: a reference point for your whole {{t:range}}; on the flop you can defend a little less, and for a single hand, the explanation decides.”

Brzmienie MDF (FT, D-1474, 06-tresci-005): punkty defend to BB poza pozycją na flopie (SC-07, SC-15, SC-17: `hero: BB`, `street: flop`), więc obowiązuje R-M6-003 („{{t:mdf}} traktujesz jako punkt odniesienia, nie obowiązek”; GTO Wizard MDF & Alpha, odczyt 2026-11-12: “On average, BB is consistently over-folding to all bet sizes on the flop.”) i lekcja m6-l1 (`content/pl/lessons/m6-l1-mdf-alpha.md:82-83`). Zdanie nie podaje MDF jako normy obrony.

Gdzie w widoku: sekcja „Liczby” punktu `defend` (`liczby.ts:31`, dziś `[]`), jedno zdanie, niezależne od wyboru. Test 08: pula przed c-betem 12, zakład 4 → „16 bb”, „4 bb”, 20 %, „raz na 5”, 75 %.

## 3. Uwagi dla 09 i 04
- 09: trzy klucze river-catch i jeden defend do 35 języków; znaczniki terminów identyczne w pl i przekładzie (`sprawdz-i18n.mjs`, D-966). Słowo „szans” jak w `line`.
- 04: forma bez nowych komponentów (wzór `line`); kolejność zdań jak wyżej. Brak zmian projektu, jeśli 04 nie zgłosi inaczej.
