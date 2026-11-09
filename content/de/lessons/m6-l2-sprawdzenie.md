---
id: m6.l2
module: m6
order: 2
title: "Callen oder folden"
sub: "Verteidigung gegen eine C-Bet ohne Position"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. Im {{t:pot|Pot}} sind {{n:ex.third.pot}}, der Button {{t:bet|setzt}} eine C-Bet von {{n:ex.third.bet}}. Wie viel Equity brauchst du für einen {{t:call|Call}}?"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Du zahlst {{n:ex.third.bet}} in einen {{t:pot|Pot}}, der nach deinem {{t:call|Call}} {{n:ex.third.total}} enthält: {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Eine kleine C-Bet gibt einen sehr guten Preis." }
      - { text: "{{n:alpha.bet-third}}", why: "Das ist Alpha: wie oft der {{t:bluff}} des Buttons funktionieren muss. Für die benötigte Equity rechnest du auch deinen eigenen {{t:call|Call}} in den Nenner ein." }
      - { text: "{{n:mdf.bet-third}}", why: "Das ist die {{t:mdf}}, also ein Anteil der {{t:range|Range}}, nicht die Equity einer einzelnen Hand. Auf dem Flop {{t:out-of-position}} verteidigst du übrigens etwas weniger als die {{t:mdf}}." }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. Im {{t:pot|Pot}} sind {{n:ex.pot}}, der Button {{t:bet|setzt}} eine C-Bet von {{n:ex.bet.three-quarters}}. Wie viel Prozent Equity brauchst du für einen {{t:call|Call}}? Gib eine Zahl ein."
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "Du zahlst {{n:ex.bet.three-quarters}} in einen {{t:pot|Pot}}, der nach deinem {{t:call|Call}} {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}} enthält. {{n:ex.bet.three-quarters}} ÷ diese Summe = {{n:eq.bet-three-quarters}}. Das ist fast doppelt so viel wie gegen eine C-Bet von 1/4 {{t:pot|Pot}} ({{n:eq.bet-quarter}})."
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "Dieselbe Hand auf demselben Flop. Einmal {{t:bet|setzt}} der Button 1/3 {{t:pot|Pot}}, einmal den ganzen {{t:pot|Pot}}. Wie ändert sich deine Verteidigung?"
    table: { position: BB }
    options:
      - { text: "Gegen den ganzen {{t:pot|Pot}} verteidigst du eine engere {{t:range|Range}}", correct: true, why: "Eine größere Bet bedeutet einen schlechteren Preis: Die benötigte Equity steigt von {{n:eq.bet-third}} auf {{n:eq.bet-pot}}, und die {{t:mdf}} sinkt von {{n:mdf.bet-third}} auf {{n:mdf.bet-pot}}. Die schwächsten Hände, mit denen du die kleine Bet gecallt hast, {{t:fold|foldest}} du jetzt." }
      - { text: "Du verteidigst genauso, weil es dieselbe Hand ist", why: "Gleiche Hand, aber anderer Preis. Bei einer Bet in Höhe des {{t:pot|Pots}} brauchst du {{n:eq.bet-pot}} Equity statt {{n:eq.bet-third}}." }
      - { text: "Gegen den ganzen {{t:pot|Pot}} verteidigst du breiter, weil eine große Bet öfter ein {{t:bluff}} ist", why: "Eine solche Regel gibt es nicht. Eine große Bet bedeutet meist eine {{t:polarized|polarisierte}} {{t:range}} (sehr starke Hände und {{t:bluff|Bluffs}}) und auf jeden Fall einen schlechteren Preis für dich." }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Du verteidigst den {{t:big-blind}} gegen das {{t:open|Open}} des Buttons. Auf dem Flop {{t:check|checkst}} du, der Button {{t:bet|setzt}} eine C-Bet von 1/3 {{t:pot|Pot}}. Was tust du?"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "Ein mittleres {{t:pair|Paar}} schlägt alle {{t:bluff|Bluffs}} des Buttons (Hände ohne {{t:pair|Paar}}), und für einen {{t:call|Call}} brauchst du nur {{n:eq.bet-third}} Equity. Eine Standard-Verteidigung." }
      - { text: "{{t:fold|Fold}}", why: "Zu tight. Gegen eine kleine C-Bet {{t:fold|foldest}} du die schwächsten Hände ohne {{t:pair|Paar}} und ohne {{t:draw}}, nicht ein {{t:pair|Paar}}." }
      - { text: "Check-Raise", why: "Meist {{t:call|callst}} du. Nach einem {{t:raise}} zahlen dich hauptsächlich bessere Hände und {{t:draw|Draws}}; ein Check-Raise mit so einer Hand ist gegen kleine C-Bets ein seltener Solver-Spielzug." }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "Du verteidigst den {{t:big-blind}} gegen das {{t:open|Open}} des Buttons. Auf dem Flop {{t:check|checkst}} du, der Button {{t:bet|setzt}} eine C-Bet von 3/4 {{t:pot|Pot}}. Was tust du?"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "Du hast weder ein {{t:pair|Paar}} noch einen {{t:draw}} (kein Pik, und eine {{t:straight|Straße}} ist weit weg). Gegen eine große C-Bet brauchst du {{n:eq.bet-three-quarters}} Equity, und {{t:out-of-position}} kommst du mit bloßen hohen Karten selten bis zum Showdown. Ein {{t:pair|Paar}} Damen oder Buben gewinnt auch nicht immer." }
      - { text: "{{t:call|Call}}", why: "Verlockend, weil Dame und Bube höher als das Board sind. Aber bloße hohe Karten reichen bei diesem Preis nicht: Am Turn bekommst du oft eine weitere Bet und {{t:fold|foldest}}." }
      - { text: "Check-Raise", why: "Zum {{t:bluff|Bluffen}} eignen sich Hände mit einem {{t:draw|Draw}} besser, weil sie einen zweiten Weg zum Gewinn haben. Diese Hand hat keinen." }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Du verteidigst den {{t:big-blind}} gegen das {{t:open|Open}} des Buttons. Auf dem Flop {{t:check|checkst}} du, der Button {{t:bet|setzt}} eine C-Bet von 1/3 {{t:pot|Pot}}. Was tust du?"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "Zwei hohe Karten plus ein zusätzlicher {{t:flush-draw}} (Backdoor: drei Pik, du brauchst Pik am Turn und am River). Bei einem Preis von {{n:eq.bet-third}} reicht das für einen {{t:call|Call}}." }
      - { text: "Check-Raise", why: "Meist nicht. Check-Raises machst du hauptsächlich mit den stärksten Händen und {{t:draw|Draws}} ({{t:flush}}, {{t:oesd}}). Ein zusätzlicher {{t:flush-draw}} ist schwach: Wenn der Button zahlt, bleibst du meist mit bloßen hohen Karten zurück. Diese Hand {{t:call|callst}} du." }
      - { text: "{{t:fold|Fold}}", why: "Zu tight gegen eine kleine C-Bet. Der zusätzliche {{t:draw}} und zwei hohe Karten geben bei einem Preis von {{n:eq.bet-third}} genug Equity." }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Du verteidigst den {{t:big-blind}} gegen das {{t:open|Open}} des Buttons. Auf dem Flop {{t:check|checkst}} du, der Button {{t:bet|setzt}} eine C-Bet von 1/3 {{t:pot|Pot}}. Was tust du?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "Du hast einen Gutshot zur {{t:straight|Straße}} (Dame) und einen König, der höher als das Board ist. Der {{t:call|Call}} kauft eine Karte: Den Gutshot triffst du am Turn in etwa {{n:odds.gutshot.flop-turn}}, und der König bringt ein paar Outs zu {{t:top-pair|Top Pair}} dazu. Zusammen ist das weniger als der Preis von {{n:eq.bet-third}}, aber mit einer getroffenen {{t:straight|Straße}} gewinnst du mehr (Implied Odds), und der König allein schlägt manchmal die {{t:bluff|Bluffs}} des Buttons. Gegen eine kleine C-Bet reicht das für einen {{t:call|Call}}." }
      - { text: "{{t:fold|Fold}}", why: "Zu tight: Ein {{t:draw}} plus eine hohe Karte sind gegen eine kleine C-Bet genug." }
      - { text: "Check-Raise All-in", why: "Du riskierst deinen ganzen Stack mit einer Hand, die noch nichts hat. Diese Größe drängt schwächere Hände raus, und es zahlen nur bessere." }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "Du verteidigst den {{t:big-blind}} gegen das {{t:open|Open}} des Buttons. Auf dem Flop {{t:check|checkst}} du, der Button {{t:bet|setzt}} eine C-Bet von 1/3 {{t:pot|Pot}}. Was tust du?"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "Du hast weder ein {{t:pair|Paar}} noch einen {{t:flush-draw}}; du hast nur einen schwachen zusätzlichen {{t:straight-draw}} (du brauchst zwei bestimmte Karten), und keine deiner Karten ist höher als das Board. Auf einem Flop mit Ass und König hat der Button viele starke Hände. Der Preis ist gut, aber diese Hand realisiert ihn fast nie." }
      - { text: "{{t:call|Call}}, weil die {{t:mdf}} {{n:mdf.bet-third}} beträgt", why: "Die {{t:mdf}} ist ein Bezugspunkt für die ganze {{t:range|Range}}, kein Grund, mit den schwächsten Händen zu zahlen. Auf dem Flop {{t:out-of-position}} kannst du etwas weniger als die {{t:mdf}} verteidigen." }
      - { text: "Check-Raise", why: "Auf einem Flop mit Ass und König liegt der {{t:range-advantage}} beim Button, und du hast keinen {{t:draw}}, der dir einen zweiten Weg zum Gewinn gäbe." }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "Warum {{t:call|callst}} du auf dem Flop {{t:out-of-position}} nicht mit jeder Hand, deren Equity auch nur etwas höher als der Preis ist?"
    table: { position: BB }
    options:
      - { text: "Weil du nicht deine ganze Equity realisierst", correct: true, why: "Equity ist deine Chance, wenn bis zum Showdown ohne weitere {{t:bet|Bets}} gespielt wird. {{t:out-of-position|Ohne Position}} handelst du am Turn und River zuerst und {{t:fold|foldest}} oft gegen eine weitere Bet. Schwache Hände realisieren dann weniger als ihre Equity." }
      - { text: "Weil der Button auf dem Flop immer eine starke Hand hat", why: "Der Button {{t:open|eröffnet}} und spielt C-Bets breit, auch mit {{t:bluff|Bluffs}}. Das Problem ist deine {{t:position}}, nicht seine Stärke." }
      - { text: "Weil man {{t:chips}} für bessere Gelegenheiten sparen muss", why: "Es zählt der {{t:expected-value}} jeder Entscheidung, nicht das Sparen von {{t:chips}}." }
---
In M5 hast du die C-Bet als {{t:aggressor}} gespielt. Jetzt sitzt du auf der anderen Seite: Du verteidigst den {{t:big-blind}}, checkst auf dem Flop, und der Button {{t:bet|setzt}} eine C-Bet. Denk an M5: Eine C-Bet ist eine {{t:bet}} des Spielers, der preflop {{t:raise|geraist}} hat, und der {{t:range-advantage}} hängt von der {{t:texture|Textur}} des Flops ab.

## Der Preis einer C-Bet

Zuerst rechnest du aus, wie viel Equity du brauchst (die Formel aus M2). Eine kleine C-Bet gibt einen sehr guten Preis, eine große einen deutlich schlechteren.

| C-Bet des Buttons | Benötigte Equity | {{t:mdf}} |
|---|---|---|
| 1/4 {{t:pot|Pot}} | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3 {{t:pot|Pot}} | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2 {{t:pot|Pot}} | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4 {{t:pot|Pot}} | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| Ganzer {{t:pot|Pot}} | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

Die {{t:mdf}} zeigt die Richtung: Je größer die Bet, desto weniger Hände verteidigst du. Auf dem Flop {{t:out-of-position}} kannst du etwas weniger als die {{t:mdf}} verteidigen, weil die {{t:bluff|Bluffs}} des Buttons noch Equity haben, aber gegen eine kleine C-Bet {{t:fold|foldest}} du nicht massenhaft.

## {{t:out-of-position|Ohne Position}} realisierst du weniger

Equity ist deine Chance, wenn bis zum Ende ohne weitere {{t:bet|Bets}} gespielt wird. {{t:out-of-position|Ohne Position}} handelst du auf jeder {{t:street}} zuerst, also {{t:fold|foldest}} du oft, bevor du den Showdown siehst. Schwache Hände ohne {{t:draw}} realisieren weniger, als ihre Equity vermuten lässt. Suited-Hände, {{t:connectors}} und {{t:pair|Paare}} realisieren mehr, weil sie starke Hände treffen oder schon vorne liegen.

## Womit du {{t:call|callst}}

Gegen eine kleine C-Bet (etwa 1/3 {{t:pot|Pot}}) spielst du weiter mit:

- fast jedem {{t:pair|Paar}}, auch einem mittleren und dem niedrigsten,
- {{t:flush-draw|Flush-Draws}} und {{t:straight|Straßen}}-Draws, auch einem Gutshot mit hoher Karte,
- hohen Karten mit einem zusätzlichen {{t:draw}} (Backdoor), z. B. drei Karten einer Farbe,
- meist auch einem Ass als höchster Karte.

Denk an M2: Ein {{t:call}} gegen eine {{t:bet}} auf dem Flop kauft eine Karte, also vergleichst du einen {{t:draw}} mit deiner Chance am Turn. Diese Chance ist manchmal etwas niedriger als der Preis einer kleinen C-Bet. Der {{t:call|Call}} lohnt sich trotzdem, wenn du nach einem Treffer mehr gewinnst als das, was jetzt im {{t:pot|Pot}} liegt (die sogenannten Implied Odds, die du in M7 berechnest), oder wenn die Hand manchmal ohne Treffer gewinnt, z. B. dank einer hohen Karte.

## Womit du {{t:fold|foldest}}

- mit Händen ohne {{t:pair|Paar}} und ohne {{t:draw}}, die weder ein Ass noch Karten höher als das Board haben; auf Flops mit Ass {{t:fold|foldest}} du mehr davon,
- meist mit zwei hohen Karten ohne {{t:draw}}, wenn die C-Bet groß ist (auf {{t:dry|trockenen}} Flops mit König {{t:call|callt}} der Solver allerdings viele Hände mit Ass); du {{t:call|callst}} eher, wenn du einen zusätzlichen {{t:draw}} hast, am besten zum höchsten {{t:flush}}.

Wenn die C-Bet wächst, wandern die nächstschwächsten Hände vom {{t:call|Callen}} zum Folden.
