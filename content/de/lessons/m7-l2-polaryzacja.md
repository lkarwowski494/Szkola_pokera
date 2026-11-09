---
id: m7.l2
module: m7
order: 2
title: "Polarisierung"
sub: "Großer Bet: starke Hände und Semi-Bluffs"
rules: [R-M7-005, R-M7-006, R-M7-003]
drills:
  - kind: choice
    id: m7.l2.q-def-polar
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Welche {{t:range}} für den Bet am Turn ist {{t:polarized|polarisiert}}?"
    options:
      - { text: "Sets, {{t:two-pair|zwei Paare}} und {{t:draw|Draws}}, ohne mittlere {{t:pair|Paare}}", correct: true, why: "Ja: Eine {{t:polarized|polarisierte}} {{t:range}} hat zwei Pole, sehr starke Hände und {{t:semi-bluff|Semi-Bluffs}}. Die Mitte, also mittlere Hände, fehlt darin: Diese Hände {{t:check|checken}}." }
      - { text: "{{t:top-pair|Top Pairs}}, mittlere {{t:pair|Paare}} und schwächere {{t:pair|Paare}}", why: "Hier gibt es keinen Pol: Es fehlen sehr starke Hände und {{t:semi-bluff|Semi-Bluffs}}, es sind nur {{t:pair|Paare}} von oben nach unten. Das kommt einer {{t:linear|linearen}} {{t:range}} näher, die vor allem mit Value-Händen bettet, meist mit kleiner Größe und nicht mit großer am Turn." }
      - { text: "Nur {{t:bluff|Bluffs}}", why: "Eine {{t:range}} ohne starke Hände erkennt der Gegner leicht und wird {{t:call|callen}}. Eine {{t:polarized|polarisierte}} {{t:range}} verbindet {{t:bluff|Bluffs}} mit sehr starken Händen." }
  - kind: choice
    id: m7.l2.q-def-linear
    family: m7.polar.concept
    rules: [R-M7-005]
    prompt: "Auf dem {{t:dry|trockenen}} Flop [[Ks 7d 2c]] hast du mit fast allen Händen klein gebettet: vom Set bis zu schwachen {{t:pair|Paaren}}. Wie heißt eine solche {{t:range}} für den Bet?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "{{t:linear|Linear}}", correct: true, why: "Ja: Starke und mittlere Hände betten zusammen, mit kleiner Größe. Das ist der Plan aus M5 auf einem {{t:dry|trockenen}}, hohen Flop, auf dem du den {{t:range-advantage|Range-Vorteil}} hast." }
      - { text: "{{t:polarized|Polarisiert}}", why: "Eine {{t:polarized|polarisierte}} {{t:range}} hat keine mittleren Hände: Nur sehr starke Hände und {{t:bluff|Bluffs}} betten. Hier haben auch schwache {{t:pair|Paare}} gebettet." }
      - { text: "Gedeckelt", why: "Eine gedeckelte {{t:range}} ist eine, der die stärksten Hände fehlen. Du hast auch mit Sets gebettet." }
  - kind: choice
    id: m7.l2.q-why-medium
    family: m7.polar.concept
    rules: [R-M7-003, R-M7-005]
    prompt: "Warum mag ein mittleres {{t:pair|Paar}} keinen großen Bet am Turn?"
    options:
      - { text: "Weil schlechtere Hände {{t:fold|folden}} und bessere bezahlen", correct: true, why: "Ja: Ein großer Bet mit einem mittleren {{t:pair|Paar}} bringt nur dann etwas ein, wenn eine schlechtere Hand bezahlt, und solche Hände {{t:fold|folden}} auf einen großen Bet meist. Übrig bleiben {{t:call|Calls}} von Händen, die dich schlagen." }
      - { text: "Weil ein großer Bet immer ein {{t:bluff}} ist", why: "Nein: Auch die stärksten Hände {{t:bet|betten}} groß. Das Problem eines mittleren {{t:pair|Paars}} ist, wer es bezahlt." }
      - { text: "Weil ein mittleres {{t:pair|Paar}} nicht gewinnen kann", why: "Doch: Es schlägt {{t:bluff|Bluffs}} und schlechtere {{t:pair|Paare}}. Deshalb {{t:check|checkt}} es und kommt günstig zum Showdown." }
  - kind: choice
    id: m7.l2.q-set-wet
    family: m7.polar.size
    rules: [R-M7-005, R-M7-006]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat deinen C-Bet am Flop {{t:call|gecallt}}. Der Turn ist eine Zwei. Im {{t:pot}} liegen {{n:ex.pot}}, der Gegner {{t:check|checkt}}. Du hast ein Set. Was tust du?"
    table: { hand: "7c 7d", position: BTN, board: "Jh 7h 4s 2c" }
    options:
      - { text: "Ich bette {{n:ex.bet.three-quarters}}", correct: true, why: "Ja: Der Gegner kann einen {{t:draw}} auf einen {{t:flush}} (zwei Herz) und auf eine {{t:straight|Straße}} (z. B. 65, T9) haben. Bei einem Bet von 3/4 {{t:pot|Pot}} braucht ein {{t:flush-draw}} {{n:eq.bet-three-quarters}} Equity, und der {{t:flush}} kommt in etwa {{n:odds.flush.turn-river}} der Fälle. Gegen dein Set hat er noch weniger: [[4h]] und [[2h]] geben dir ein {{t:full-house}}, also bleiben ihm {{n:outs.flush.vs-set}} saubere Outs, etwa {{n:odds.flush.vs-set}}. Er zahlt zu viel." }
      - { text: "Ich bette {{n:ex.bet.quarter}}", sizeError: true, why: "Richtige Aktion, falsche Größe: Bei einem Bet von 1/4 {{t:pot|Pot}} braucht ein {{t:draw}} nur {{n:eq.bet-quarter}} Equity, er bekommt also einen guten Preis. Mit einer sehr starken Hand auf einem {{t:board}} mit {{t:flush-draw|Flush-Draw}} bettest du groß." }
      - { text: "Ich {{t:check|checke}}", why: "Eine Freikarte ist ein Geschenk für {{t:draw|Draws}}, und du baust den {{t:pot}} vor dem River nicht auf. Ein Set auf einem {{t:board}} mit {{t:flush-draw|Flush-Draw}} bettet." }
  - kind: choice
    id: m7.l2.q-semibluff-size
    family: m7.polar.size
    rules: [R-M7-005, R-M7-002]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat deinen C-Bet am Flop {{t:call|gecallt}}. Der Turn ist eine Drei. Im {{t:pot}} liegen {{n:ex.pot}}, der Gegner {{t:check|checkt}}. Was tust du?"
    table: { hand: "Qh Jh", position: BTN, board: "Th 6h 2c 3s" }
    options:
      - { text: "Ich bette {{n:ex.bet.three-quarters}}", correct: true, why: "Ja: Ein {{t:flush-draw}} mit zwei hohen Karten ist ein guter {{t:semi-bluff}}. Du bettest genauso groß wie mit starken Händen, also kann der Gegner einen {{t:bluff}} nicht von Value unterscheiden." }
      - { text: "Ich bette {{n:ex.bet.quarter}}", sizeError: true, why: "Richtige Aktion, falsche Größe: Einen so billigen Bet {{t:call|callt}} der Gegner mit jedem {{t:pair|Paar}}, und ein {{t:semi-bluff}} verdient vor allem an {{t:fold|Folds}}. Wenn kleine Bets bei dir {{t:draw|Draws}} bedeuten würden und große starke Hände, könnte der Gegner das leicht ausnutzen." }
      - { text: "Ich {{t:check|checke}}", correct: true, why: "Auch gut: Du siehst den River kostenlos und triffst den {{t:flush}} in {{n:odds.flush.turn-river}} der Fälle. Ein Bet ist aber meist besser, denn ein {{t:draw}} mit hohen Karten ist einer der besten {{t:semi-bluff|Semi-Bluffs}}, und wenn du {{t:check|checkst}}, verzichtest du darauf, den {{t:pot}} sofort zu gewinnen." }
  - kind: choice
    id: m7.l2.q-medium-big
    family: m7.polar.size
    rules: [R-M7-003, R-M7-005]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat deinen C-Bet am Flop {{t:call|gecallt}}. Der Turn ist eine Fünf. Im {{t:pot}} liegen {{n:ex.pot}}, der Gegner {{t:check|checkt}}. Was tust du?"
    table: { hand: "Kh 9c", position: BTN, board: "Ks 7d 2c 5h" }
    options:
      - { text: "Ich {{t:check|checke}}", correct: true, why: "{{t:top-pair}} mit schwachem Kicker ist eine mittlere Hand. Einen großen Bet bezahlen vor allem bessere Könige (AK, KQ, KJ), und schlechtere Hände {{t:fold|folden}}. Wenn du {{t:check|checkst}}, kommst du günstig zum Showdown." }
      - { text: "Ich bette {{n:ex.bet.three-quarters}}", why: "Ein großer Bet passt zu einer {{t:polarized|polarisierten}} {{t:range}}. Mit dieser Hand wirst du vor allem von Händen bezahlt, die dich schlagen." }
      - { text: "Ich bette {{n:ex.bet.pot}}", why: "Ein noch größerer {{t:pot}} mit einer mittelstarken Hand: Schlechtere Hände {{t:fold|folden}} fast immer, und bessere bezahlen." }
  - kind: numeric
    id: m7.l2.n-price-big
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Im {{t:pot}} liegen {{n:ex.pot}}, du bettest {{n:ex.bet.three-quarters}} mit einer sehr starken Hand. Wie viel Prozent Equity braucht der Gegner mit einem {{t:draw}}, um zu {{t:call|callen}}? Gib eine Zahl ein."
    answer: eq.bet-three-quarters
    explanation: "Der Gegner zahlt {{n:ex.bet.three-quarters}} in einen {{t:pot}}, der nach dem {{t:call}} {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}} umfasst: {{n:eq.bet-three-quarters}}. Ein {{t:flush-draw}} hat am Turn etwa {{n:odds.flush.turn-river}}, also zahlt er zu viel."
  - kind: choice
    id: m7.l2.q-quarter-price
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Du hast ein Set und bettest nur {{n:ex.bet.quarter}} in einen {{t:pot}} von {{n:ex.pot}}. Der Gegner hat einen {{t:flush-draw}} (etwa {{n:odds.flush.turn-river}} bis zum River). Was folgt daraus?"
    options:
      - { text: "Er bekommt einen guten Preis: Er braucht nur {{n:eq.bet-quarter}}", correct: true, why: "Ja: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}} + {{n:ex.bet.quarter}}) = {{n:eq.bet-quarter}}, weniger als seine {{n:odds.flush.turn-river}}. Das {{t:call|Callen}} lohnt sich für ihn, und du verschenkst mit dem kleinen Bet einen Teil des Werts." }
      - { text: "Er muss {{t:fold|folden}}, weil er {{n:eq.bet-three-quarters}} braucht", why: "So viel bräuchte er bei einem Bet von 3/4 {{t:pot|Pot}}. Bei einem Bet von 1/4 {{t:pot|Pot}} reichen ihm {{n:eq.bet-quarter}}." }
      - { text: "Der Preis spielt keine Rolle, weil du ihn sowieso schlägst", why: "Jetzt schlägst du ihn, aber in etwa {{n:odds.flush.turn-river}} der Fälle gewinnt er am River. Die Betgröße entscheidet, ob er für diese Chance zu viel oder zu wenig zahlt." }
  - kind: choice
    id: m7.l2.q-oesd-threshold
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Der Gegner hat am Turn einen {{t:oesd}}: etwa {{n:odds.oesd.turn-river}} bis zum River. Ab welchem Bet von dir zahlt er zu viel (nur nach Pot Odds gerechnet)?"
    options:
      - { text: "Schon ab 1/3 {{t:pot|Pot}}: Er braucht {{n:eq.bet-third}}", correct: true, why: "Ja: {{n:eq.bet-third}} ist mehr als {{n:odds.oesd.turn-river}}. Am Turn haben {{t:draw|Draws}} nur noch eine Karte, also gibt ihnen schon ein mittlerer Bet einen schlechten Preis." }
      - { text: "Erst ab dem ganzen {{t:pot}}: Er braucht {{n:eq.bet-pot}}", why: "Beim ganzen {{t:pot}} zahlt er viel zu viel, aber schon bei 1/3 {{t:pot|Pot}} braucht er {{n:eq.bet-third}}, mehr als seine {{n:odds.oesd.turn-river}}." }
      - { text: "Nie, ein {{t:draw}} kann immer {{t:call|callen}}", why: "Ein {{t:draw}} {{t:call|callt}} nur bei einem guten Preis oder mit Implied Odds (nächste Lektion). Am Turn hat er etwa {{n:odds.oesd.turn-river}}, also sind die meisten Bets für ihn ein schlechter Preis." }
  - kind: generated
    id: m7.l2.g-draw-call
    family: m7.polar.price
    rules: [R-M7-007]
    generator: drawCall
    count: 3
  - kind: numeric
    id: m7.l2.n-price-pot
    family: m7.polar.price
    rules: [R-M7-006]
    prompt: "Turn. Im {{t:pot}} liegen {{n:ex.pot}}, du bettest den ganzen {{t:pot}}: {{n:ex.bet.pot}}. Wie viel Prozent Equity braucht der Gegner, um zu {{t:call|callen}}? Gib eine Zahl ein."
    answer: eq.bet-pot
    explanation: "Der Gegner zahlt {{n:ex.bet.pot}} in einen {{t:pot}}, der nach dem {{t:call}} {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} umfasst: {{n:eq.bet-pot}}. Weder ein {{t:flush}} (etwa {{n:odds.flush.turn-river}}) noch eine offene {{t:straight|Straße}} (etwa {{n:odds.oesd.turn-river}}) hat eine solche Chance."
---
Am Flop hast du oft mit fast deiner ganzen {{t:range}} klein gebettet. Am Turn ändert sich deine {{t:range}} für den Bet: Darin bleiben sehr starke Hände und {{t:semi-bluff|Semi-Bluffs}}, während mittlere Hände {{t:check|checken}}. Eine solche {{t:range}} nennen wir {{t:polarized|polarisiert}}.

## Zwei Arten von {{t:range|Ranges}}

- **{{t:linear|Linear}}:** Du bettest von den stärksten Händen abwärts, die mittleren eingeschlossen. Meist mit kleiner Größe, z. B. ein C-Bet von {{n:cbet.size.small}} {{t:pot|Pot}} auf [[Ks 7d 2c]].
- **{{t:polarized|Polarisiert}}:** Es betten die zwei Pole, sehr starke Hände (Sets, {{t:two-pair|zwei Paare}}, {{t:straight|Straßen}}, Flushes) und {{t:semi-bluff|Semi-Bluffs}} ({{t:draw|Draws}}). Mittlere Hände gibt es darin nicht.

Allgemein besteht eine {{t:polarized|polarisierte}} {{t:range}} aus sehr starken Händen und {{t:bluff|Bluffs}}. Am Turn sind die {{t:bluff|Bluffs}} meist {{t:semi-bluff|Semi-Bluffs}}, am River (M8) Hände ohne Chance im Showdown.

## Warum du am Turn polarisierst

Der Gegner hat den Flop {{t:call|gecallt}}, also hat er meist ein {{t:pair|Paar}} oder einen {{t:draw}}, manchmal hohe Karten mit Backdoor (M6). Eine mittlere Hand gewinnt durch einen zweiten Bet nichts: Schlechtere Hände {{t:fold|folden}}, und bessere zahlen. Starke Hände wollen den {{t:pot}} vor dem River aufbauen, und {{t:semi-bluff|Semi-Bluffs}} brauchen {{t:fold|Folds}} und haben Outs, wenn sie einen {{t:call}} bekommen.

## {{t:polarized|Polarisierte}} {{t:range}}, großer Bet

Eine {{t:polarized|polarisierte}} {{t:range}} bettet groß, z. B. 3/4 {{t:pot|Pot}}. Starke Hände holen mehr {{t:chips}} heraus, und {{t:semi-bluff|Semi-Bluffs}} gewinnen öfter sofort. Mittlere Hände {{t:check|checken}}. Wenn {{t:bluff|Bluffs}} und starke Hände mit derselben Größe betten, weiß der Gegner nicht, was du hast.

## Der Preis für {{t:draw|Draws}}

Am Turn hat ein {{t:draw}} nur noch eine Karte. Ein großer Bet lässt ihn zu viel zahlen:

| Dein Bet | Gegner braucht | {{t:flush}} hat | Offene {{t:straight|Straße}} hat |
|---|---|---|---|
| 1/4 {{t:pot|Pot}} | {{n:eq.bet-quarter}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/3 {{t:pot|Pot}} | {{n:eq.bet-third}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 1/2 {{t:pot|Pot}} | {{n:eq.bet-half}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| 3/4 {{t:pot|Pot}} | {{n:eq.bet-three-quarters}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |
| Ganzer {{t:pot}} | {{n:eq.bet-pot}} | {{n:odds.flush.turn-river}} | {{n:odds.oesd.turn-river}} |

Bei einem Bet von 1/4 {{t:pot|Pot}} hat ein {{t:flush-draw}} einen guten Preis. Bei 1/3 {{t:pot|Pot}} ist der Preis fast gleich der Chance des {{t:flush|Flushs}} ({{n:eq.bet-third}} gegenüber {{n:odds.flush.turn-river}}), und ab 1/2 {{t:pot|Pot}} aufwärts zahlt der {{t:flush}} deutlich zu viel, es sei denn, er setzt auf Implied Odds (nächste Lektion). Die Aufgaben mit einem {{t:draw}} in dieser Lektion rechnen nur mit Pot Odds.

:::note Woher diese Regeln stammen
Die Begriffe der {{t:polarized|polarisierten}} und der {{t:linear|linearen}} {{t:range}} sowie die Regel „Eine {{t:polarized|polarisierte}} {{t:range}} bettet groß, mittlere Hände {{t:check|checken}}“ stammen aus Trainingsmaterialien und sind hier eine Heuristik; das gilt auch für die Empfehlung, mit einer starken, verwundbaren Hand groß zu betten. Der Solver nutzt am Turn auch kleine Größen. Die Größe 3/4 {{t:pot|Pot}} ist ein Beispiel zum Üben, nicht die einzige gute Größe. Die Preise in der Tabelle sind exakte Berechnungen der App.
:::
