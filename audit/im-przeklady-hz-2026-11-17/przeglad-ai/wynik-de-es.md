# Drugi przegląd AI: de, es (sc-09, sc-16, sc-18, sc-21, sc-26, sc-27, sc-30)

Tryb: tylko odczyt, 2026-11-17. Przeczytane: wzorce pl i en, przekłady de i es, `terms-nazwy.yaml` (de, es; tylko potrzebne klucze), `numbers.yaml` (potrzebne klucze), sposób wstawiania `{{w:pozycja}}` (`apps/mobile/src/features/stol/uklad.ts:116`, `table.position.*` w `apps/mobile/src/i18n/locales/{de,es}.json` = `{{t:big-blind}}`, `{{t:button}}` itd.) i `{{w:rozmiar}}` (`apps/mobile/src/features/scenariusz/wariant.ts:410`, liczba bez %).

Znaczniki `{{n:}}` i `{{w:}}`: we wszystkich 14 plikach ten sam zestaw co we wzorcu i w tym samym miejscu sensu. Forma zwracania się spójna (de: du, es: tú). Żaden tytuł nie jest wyraźnie za długi.

## 1. Tabela

| język | szablon | werdykt | ID znalezisk |
|---|---|---|---|
| de | sc-09 | OK | — |
| de | sc-16 | uwagi NISKIE | de-SYS-01 |
| de | sc-18 | OK | — |
| de | sc-21 | OK | — |
| de | sc-26 | uwagi NISKIE | de-SYS-01 |
| de | sc-27 | uwagi NISKIE | de-sc27-01 (+ uwaga o źródle Ź-01) |
| de | sc-30 | OK | — |
| es | sc-09 | OK | — |
| es | sc-16 | ŚREDNIE | es-SYS-02 |
| es | sc-18 | ŚREDNIE | es-SYS-01 |
| es | sc-21 | ŚREDNIE | es-SYS-01 |
| es | sc-26 | ŚREDNIE | es-SYS-02 |
| es | sc-27 | ŚREDNIE | es-SYS-01 (+ uwaga o źródle Ź-01) |
| es | sc-30 | ŚREDNIE | es-SYS-01, es-sc30-01 |

Znaleziska SYS dotyczą zdania wspólnego dla wszystkich szablonów danego języka (`… am/en el {{w:pozycja}} …`, 91 wystąpień w de i 91 w es) albo całego katalogu `scenarios/`. Lepiej naprawić je raz dla wszystkich szablonów niż osobno w każdym.

## 2. Znaleziska

### es-SYS-01 · ŚREDNIE · „Button” w tekście i „botón (BTN)” z `{{w:pozycja}}` w tej samej karcie
- Pole: `situation` (sc-18, sc-21, sc-27, sc-30: „Has {{t:open|abierto}} desde el Button”, sc-27: „En el Button has hecho {{t:3-bet}}”) i `explanation` każdej akcji („Tienes {{w:reka}} en el {{w:pozycja}}”).
- Wzorzec: pl „z Buttona” (zwykły tekst), en „from the Button”; `{{w:pozycja}}` dla BTN = `{{t:button}}`.
- Problem: w es `button: "botón"`, więc gracz widzi w tytule „desde el Button”, a pod spodem „en el botón (BTN)”. To dwie nazwy jednego pojęcia w jednej karcie (zasada „jedna nazwa na jedno pojęcie”). Katalog `es/scenarios/` ma 40× „Button” i 0× „botón”, a `es/lessons/` ma 90× „botón”, więc to niespójność całego katalogu, nie pojedynczego szablonu.
- Proponowane brzmienie: w es zamienić zwykły tekst „Button” na „botón” (np. „Has {{t:open|abierto}} desde el botón y la {{t:big-blind}} ha {{t:call|pagado}}.”; sc-27: „En el botón has hecho {{t:3-bet}} a la {{t:open|apertura}} del {{t:cutoff|CO}} y ha {{t:call|pagado}}.”; sc-16/sc-26: „la {{t:open|apertura}} del botón”, „el botón {{t:bet|apuesta}}”, „el botón va {{t:all-in}}”, „el botón necesita entonces…”), najlepiej jedną zmianą w całym `es/scenarios/`.
- Pewność: wysoka (że jest niespójność); wybór „botón” zgodny z `terms-nazwy.yaml`.

### es-SYS-02 · ŚREDNIE · „en el {{w:pozycja}}” przy graczu na BB daje „en el ciega grande (BB)”
- Pole: `explanation` wszystkich akcji w sc-16 i sc-26 (gracz = BB), dosłownie „Tienes {{w:reka}} en el {{w:pozycja}}, …”.
- Wzorzec: pl „na {{w:pozycja}}”, en „in the {{w:pozycja}}”.
- Problem: `{{w:pozycja}}` dla BB w es = „ciega grande (BB)” (r. ż.), więc wychodzi „en el ciega grande (BB)”, czyli błąd rodzaju. Situation tych samych kart mówi poprawnie „Estás en la {{t:big-blind}}”. Ten sam szablon zdania występuje w es 91 razy, więc dotyczy każdej karty z graczem na SB/BB.
- Proponowane brzmienie (neutralne rodzajowo, dla wszystkich szablonów): „Tienes {{w:reka}} en la posición de {{w:pozycja}}, en la {{t:board}} hay {{w:stol}}, y tu rival en el {{w:rywal}} …” (sc-26 itd. analogicznie). Druga możliwość: rodzajnik z rodzajem dodany przez generator wraz z nazwą pozycji.
- Pewność: wysoka.

### de-SYS-01 · NISKIE · „am {{w:pozycja}}” przy graczu na BB: „am Big Blind (BB)”
- Pole: `explanation` wszystkich akcji w sc-16 i sc-26 („Du hast {{w:reka}} am {{w:pozycja}}, …”).
- Wzorzec: pl „na {{w:pozycja}}”, en „in the {{w:pozycja}}”.
- Problem: dla Button/Cutoff „am” brzmi naturalnie, ale przy blindach po niemiecku mówi się „im Big Blind”. Situation tej samej karty: „Du sitzt im {{t:big-blind}}”. Zdanie jest zrozumiałe, to tylko szlif stylu.
- Proponowane brzmienie: „Du hast {{w:reka}} auf der Position {{w:pozycja}}, das {{t:board}} ist {{w:stol}}, …” (neutralne dla wszystkich pozycji) albo zostawić „am”.
- Pewność: średnia (patrz pytanie 1).

### de-sc27-01 · NISKIE · „hinter dem Pot” brzmi jak kalka
- Pole: `explanation` akcji bet-small.
- Obecnie: „mit einem Stack von {{n:spr.3bet-ip.stack}} hinter dem {{t:pot}} nur etwa {{n:g3b.third.total}}”
- Wzorzec: pl „przy stacku {{n:spr.3bet-ip.stack}} za {{t:pot|pulą}}”, en „with {{n:spr.3bet-ip.stack}} behind”.
- Problem: „Stack hinter dem Pot” to dosłowna kalka. Po niemiecku zwykle mówi się „effektiver Stack” albo „… dahinter”. Sens się zgadza.
- Proponowane brzmienie: „… zum Beispiel in einem {{t:pot}} nach einer {{t:3-bet}} mit {{n:spr.3bet-ip.stack}} effektivem Stack nur etwa {{n:g3b.third.total}}.”
- Pewność: średnia.

### es-sc30-01 · NISKIE · „el X–Y % más fuerte de las manos”
- Pole: `explanation` akcji fold.
- Obecnie: „si juega aproximadamente el {{n:hud.ex.nit3bet.vpip.low}}–{{n:hud.ex.nit3bet.vpip.high}} más fuerte de las manos”
- Wzorzec: pl „gra on najsilniejsze ok. 8–10 % rąk”, en „the strongest 8–10 % or so of hands”.
- Problem: szyk nienaturalny. Sens się zgadza (najsilniejsze 8–10 % rąk).
- Proponowane brzmienie: „Te {{t:fold|retiras}}, porque si juega aproximadamente el {{n:hud.ex.nit3bet.vpip.low}}–{{n:hud.ex.nit3bet.vpip.high}} de manos más fuertes, son sobre todo {{t:pair|parejas}} y los mejores ases, …”
- Pewność: wysoka.

WYSOKIE: brak. Sprawdziłem w szczególności kierunek rad i porównania (sc-16 „im kleiner, umso mehr” / „tanto más cuanto más pequeño”; sc-26 „seltener als jedes zweite Mal” / „menos de una de cada dos veces”; sc-21 kto czeka i kto stawia; sc-18 „etwas mehr / algo más” dla otwierającego), warunki (sc-30 „vereinfacht / simplificando”, „nach der Annahme / por hipótesis”) i liczby (sc-09: 3 bb + 1 bb na limpera, +1 bb bez pozycji). Wszystkie są zgodne z pl i en.

## 3. Do sprawdzenia przez rodzimego użytkownika

1. de: czy „am Big Blind” / „am Small Blind” brzmi dla niemieckiego gracza akceptowalnie, czy wyraźnie źle (wtedy de-SYS-01 trzeba podnieść do ŚREDNIEGO)? Dla Button i Cutoff „am” uważam za poprawne.
2. de sc-16 raise-big: czy „auf etwa 4,5x seiner Bet” jest naturalne, czy lepiej „auf etwa das 4,5-Fache seiner Bet”?
3. de sc-26: czy „geht … All-in” z wielką literą (nazwa terminu „All-in”) jest akceptowalne w zdaniu, czy lepiej formą „all-in”?
4. es sc-18/sc-26: „{{t:top-pair|pareja mayor}}”. Nazwa w `terms-nazwy.yaml` to „top pair”, a „pareja mayor” jest formą ze źródła C. Czy w es-ES nie jest bardziej rozpoznawalne „top pair”? (To zgodne z glosariuszem, więc nie zgłaszam tego jako znaleziska.)
5. es sc-16 raise-small: „pero a aproximadamente {{n:xr.too-small.mult}} el {{t:c-bet}} es demasiado pequeño” — czy brak podmiotu („lo es / es demasiado pequeño”) nie myli z „el c-bet es demasiado pequeño”? Proponowane, jeśli tak: „… pero, a aproximadamente {{n:xr.too-small.mult}} el {{t:c-bet}}, se queda demasiado pequeño: …”.

## 4. Uwagi o źródle (pl/en, wspólne dla wszystkich języków)

### Ź-01 · sc-27: `{{w:rozmiar}}` bez znaku procentu
- pl: „{{t:bet|Stawiasz}} ok. {{w:rozmiar}} {{t:pot|puli}}” i „rozmiar geometryczny, ok. {{w:rozmiar}} {{t:pot|puli}}”; en: „about {{w:rozmiar}} of the {{t:pot}}”.
- `{{w:rozmiar}}` = `String(Math.round(d.fractionBig * 100))` (`apps/mobile/src/features/scenariusz/wariant.ts:410`), czyli np. „75” bez %. Gracz widzi „ok. 75 puli” / „about 75 of the pot” / „etwa 75 des Pots” / „aproximadamente 75 del bote”, czyli liczbę bez jednostki. To błąd w obu akcjach (bet-big, bet-small) we wszystkich językach.
- Proponowana naprawa: dodać % do wartości znacznika w generatorze, w formacie procentu danego języka (de i es „75 %”, ze spacją jak w `{{n:}}` percent). Ręczne dopisywanie „%” w 35 językach byłoby gorsze. Jeśli zostanie wersja w treści: pl „ok. {{w:rozmiar}}% {{t:pot|puli}}”.
