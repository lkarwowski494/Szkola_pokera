# Drugi przegląd AI przekładów: fr, it (sc-09, 16, 18, 21, 26, 27, 30)

Data: 2026-11-17. Tryb: tylko odczyt. Wzorzec: `content/pl/scenarios/`, `content/en/scenarios/`; terminologia: `content/{fr,it}/terms-nazwy.yaml`; liczby: `content/numbers.yaml`.

## 1. Werdykty

| język | szablon | werdykt | ID znalezisk |
|---|---|---|---|
| fr | sc-09 | OK | — |
| fr | sc-16 | uwagi NISKIE | fr-sc16-1, fr-sc16-2 |
| fr | sc-18 | uwagi NISKIE | fr-sc16-1 (to samo sformułowanie w situation) |
| fr | sc-21 | uwagi NISKIE | fr-sc16-1 (to samo sformułowanie w situation) |
| fr | sc-26 | uwagi NISKIE | fr-sc26-1 |
| fr | sc-27 | OK (problem źródła, sekcja 4) | — |
| fr | sc-30 | OK | — |
| it | sc-09 | OK | — |
| it | sc-16 | uwagi NISKIE | it-sc16-1 |
| it | sc-18 | OK | — |
| it | sc-21 | OK | — |
| it | sc-26 | uwagi NISKIE | it-sc26-1 |
| it | sc-27 | OK (problem źródła, sekcja 4) | — |
| it | sc-30 | ŚREDNIE | it-sc30-1, it-sc30-2 |

Sens, liczby, kierunek rad, warunki i znaczniki `{{n:}}`/`{{w:}}` we wszystkich 14 plikach zgodne z pl/en. Terminy zgodne z `terms-nazwy.yaml` (fr: tirage, relance, top paire, deuxième paire, grosse blinde, ouverture, hors de position; it: progetto, rilancio, top pair, seconda coppia, apertura, fuori posizione, piatto). Forma zwracania się spójna (fr: vous, it: tu). Tytuły mieszczą się w 2 liniach. Brak WYSOKICH.

## 2. Znaleziska

### it-sc30-1 · ŚREDNIE · „il 8%” zamiast „l'8%” w situation
- Pole: situation.
- Obecnie: „abbia un {{t:vpip}} tra il {{n:hud.ex.nit3bet.vpip.low}} e il {{n:hud.ex.nit3bet.vpip.high}}” → wyświetla „tra il 8% e il 10%”.
- Wzorzec: pl „ma {{t:vpip}} od {{n:hud.ex.nit3bet.vpip.low}} do {{n:hud.ex.nit3bet.vpip.high}}”; en „between … and …”.
- Problem: przed „8” (otto) rodzajnik ulega elizji: „l'8%”. Rodzajnik wpisany na sztywno przed liczbą z `numbers.yaml` psuje się przy każdej wartości zaczynającej się od samogłoski (8, 11, 80…). Lepiej bez rodzajnika.
- Propozycja: „Supponi che questo avversario abbia un {{t:vpip}} compreso tra {{n:hud.ex.nit3bet.vpip.low}} e {{n:hud.ex.nit3bet.vpip.high}} su almeno circa {{n:hud.hands.vpip.low}} mani e che il suo {{t:3-bet}} rientri in queste mani.”
- Pewność: wysoka.

### it-sc30-2 · ŚREDNIE · „circa il 8%–10% più forte delle mani” (gramatyka i szyk)
- Pole: explanation akcji fold.
- Obecnie: „se gioca circa il {{n:hud.ex.nit3bet.vpip.low}}–{{n:hud.ex.nit3bet.vpip.high}} più forte delle mani” → „circa il 8%–10% più forte delle mani”.
- Wzorzec: pl „jeśli gra on najsilniejsze ok. {{n:…low}}–{{n:…high}} rąk”; en „if they play the strongest … or so of hands”.
- Problem: „il 8%” (zob. wyżej) i szyk „il X% più forte delle mani” jest nienaturalny („il X% delle mani più forti”). Sens zachowany.
- Propozycja: „{{t:fold|Foldi}}, perché se gioca solo le mani più forti, circa {{n:hud.ex.nit3bet.vpip.low}}–{{n:hud.ex.nit3bet.vpip.high}} del totale, si tratta soprattutto di {{t:pair|coppie}} e dei migliori assi, e contro di esse la tua mano ha meno equity di quanta ne richieda il prezzo del {{t:call}} (semplificando, senza il gioco dopo il flop).” (dalej bez zmian)
- Pewność: wysoka.

### fr-sc16-1 · NISKIE · „mise petit avec un c-bet”
- Pole: situation i wszystkie 4 explanation sc-16 („le Bouton {{t:bet|mise}} petit avec un {{t:c-bet}}”, „votre adversaire en {{w:rywal}} {{t:bet|mise}} petit avec un {{t:c-bet}}”); podobnie situation sc-18 i sc-21 („vous avez {{t:bet|misé}} petit avec un {{t:c-bet}}”).
- Wzorzec: pl „Button stawia mały c-bet”; en „bets a small c-bet”.
- Problem: kalka; naturalniej „fait un petit c-bet”. Sens poprawny.
- Propozycja (sc-16 situation): „Au flop, vous faites {{t:check}}, et le Bouton fait un petit {{t:c-bet}}.”; w wyjaśnieniach: „et votre adversaire en {{w:rywal}} fait un petit {{t:c-bet}}.”; sc-18/21: „Au flop, vous avez fait un petit {{t:c-bet}}, et elle a de nouveau {{t:call|suivi}}.”
- Pewność: średnia.

### fr-sc16-2 · NISKIE · „d'autant plus que le c-bet est petit”
- Pole: explanation akcji raise-small.
- Obecnie: „Vous {{t:raise|relancez}} à environ {{n:xr.mult.low}}–{{n:xr.mult.example}} le {{t:c-bet}}, d'autant plus que le {{t:c-bet}} est petit.”
- Wzorzec: pl „tym więcej, im mniejszy c-bet”; en „more the smaller the c-bet”.
- Problem: konstrukcja poprawna, ale można ją czytać jako „tym bardziej, że c-bet jest mały” (przyczyna, nie proporcja). Jaśniej wprost.
- Propozycja: „Vous {{t:raise|relancez}} à environ {{n:xr.mult.low}}–{{n:xr.mult.example}} le {{t:c-bet}} : plus le {{t:c-bet}} est petit, plus vous relancez gros.”
- Pewność: średnia.

### fr-sc26-1 · NISKIE · „les mains meilleures”
- Pole: explanation akcji call i fold.
- Obecnie: „une {{t:top-pair|top paire}} et les mains meilleures suffisent…”, „… et les mains meilleures jouent tout le stack”.
- Wzorzec: pl „najwyższa para i lepsze ręce”; en „top pair and better hands”.
- Problem: szyk nienaturalny; po francusku „les mains plus fortes” / „mieux”.
- Propozycja (call): „avec un tel {{t:spr}}, une {{t:top-pair|top paire}} ou mieux suffit pour jouer tout le stack.”; (fold): „avec un {{t:spr}} aussi bas, une {{t:top-pair|top paire}} ou mieux joue tout le stack.”
- Pewność: średnia.

### it-sc16-1 · NISKIE · możliwe odczytanie „la c-bet è troppo piccola”
- Pole: explanation akcji raise-small.
- Obecnie: „Il {{t:check-raise}} è una buona idea, ma a circa {{n:xr.too-small.mult}} la {{t:c-bet}} è troppo piccolo”.
- Wzorzec: en „but a raise to about 1.5x the c-bet is too small”.
- Problem: bez przecinków pierwsze czytanie to „la c-bet è troppo…”; tylko rodzaj „piccolo” wskazuje check-raise.
- Propozycja: „Il {{t:check-raise}} è una buona idea, ma un rilancio a circa {{n:xr.too-small.mult}} la {{t:c-bet}} è troppo piccolo: …”
- Pewność: średnia.

### it-sc26-1 · NISKIE · „con {{t:spr}} circa {{n:spr.commit}}”
- Pole: situation, explanation call i fold („con {{t:spr}} circa {{w:spr}}”, „con {{t:spr}} {{n:spr.commit}}”).
- Problem: styl telegraficzny; w tym samym pliku jest „con uno {{t:spr}} così basso”. Naturalniej „con uno SPR di circa 2”.
- Propozycja (situation): „Sul flop fai {{t:check}} e il Button va {{t:all-in}} con uno {{t:spr}} di circa {{n:spr.commit}}.”; analogicznie „con uno {{t:spr}} di circa {{w:spr}}”, „con uno {{t:spr}} di {{n:spr.commit}}”.
- Pewność: średnia.

## 3. Do sprawdzenia przez rodzimego użytkownika

1. fr (systemowo, 91 wystąpień „en {{w:pozycja}}” we wszystkich plikach fr, nie tylko w tych szablonach): czy „en Bouton” / „en Cutoff” brzmi naturalnie, czy powinno być „au Bouton”, „au cutoff”? Jeśli tak, to poprawka całego języka, nie szablonu.
2. it sc-09: „L'HJ ha solo pagato il big blind” — czy „L'HJ” (czytane „acca-gei”) jest naturalne, czy lepiej „L'hijack (HJ)”?
3. it sc-21/sc-26: „Al river manca una carta” jako „do rivera została jedna karta” — czy jednoznaczne (nie „brakuje karty na riverze”)? Alternatywa: „Resta una sola carta da scoprire”.
4. fr sc-09 situation: „({{t:limp}})” i „({{t:isolation}})” bez rodzajnika w nawiasie — czy naturalne, czy lepiej „(un limp)”, „(relance d'isolation)”? en ma „(a limp)”, „(an isolation raise)”.

## 4. Uwagi o źródle (pl/en, wspólne dla wszystkich języków)

- **sc-27, `{{w:rozmiar}}` bez znaku procentu.** `wariant.ts:410` zwraca `String(Math.round(d.fractionBig * 100))`, czyli np. „75”, bez „%”. We wzorcu pl „{{t:bet|Stawiasz}} ok. {{w:rozmiar}} {{t:pot|puli}}” wyświetla się „ok. 75 puli”, en „about 75 of the pot”; to samo w fr („environ 75 du pot”) i it („circa 75 del piatto”), w explanation bet-big i bet-small. Proponuję poprawić we wzorcu i wszystkich językach: „ok. {{w:rozmiar}}% puli” / „about {{w:rozmiar}}% of the pot” / fr „environ {{w:rozmiar}} % du pot” / it „circa il {{w:rozmiar}}% del piatto” (uwaga it: rodzajnik „il” przy liczbie z elizją, np. 80 → „l'80%”; bezpieczniej „circa {{w:rozmiar}}% del piatto”). Albo dodać „%” w rendererze w formacie zależnym od języka. Waga: ŚREDNIE (liczba bez jednostki może mylić; wartość jest poprawna).
- Ogólnie dla it: wpisany na sztywno rodzajnik przed `{{n:…}}` z procentem (sc-16 „circa il {{n:eq.bet-third}}”, sc-26 „circa il {{n:eq.jam.spr2}}”) jest dziś poprawny (20%, 9%, 40%), ale zepsuje się, gdy wartość zmieni się na 8, 11, 80 itd. Warto to uwzględnić w kontroli liczb.
