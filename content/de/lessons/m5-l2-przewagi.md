---
id: m5.l2
module: m5
order: 2
title: "Wem der Flop hilft"
sub: "Range-Vorteil und Nuts-Vorteil"
rules: [R-M5-003, R-M5-004, R-M5-005, R-M5-006]
drills:
  - kind: choice
    id: m5.l2.q-k72
    family: m5.advantage.who
    rules: [R-M5-003]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}}. Flop: [[Ks 7d 2c]]. Wer hat den {{t:range-advantage|Range-Vorteil}}?"
    table: { position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "Du, als {{t:open|Eröffner}} vom Button", correct: true, why: "Ja: In deiner {{t:range|Range}} sind alle KK, AK und KQ. Der {{t:big-blind|Big Blind}} hätte die stärksten davon vor dem Flop geraist, und seine breite Verteidigung besteht größtenteils aus Händen, die hier nichts getroffen haben." }
      - { text: "Der {{t:big-blind|Big Blind}}", why: "Nein: Der {{t:big-blind}} hat mehr schwache Hände, weil er breit verteidigt hat. Einen König mit gutem Kicker hat er seltener als du." }
      - { text: "Niemand, der Flop ist zufällig", why: "Der Flop ist zufällig, aber die {{t:range|Ranges}} sind es nicht. Derselbe Flop passt besser zu der {{t:range|Range}}, in der mehr hohe Karten sind." }
  - kind: choice
    id: m5.l2.q-765
    family: m5.advantage.who
    rules: [R-M5-004]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}}. Flop: [[7s 6h 5d]]. Wer hat hier öfter eine sehr starke Hand ({{t:two-pair|zwei Paare}} oder eine {{t:straight|Straße}})?"
    table: { position: BTN, board: "7s 6h 5d" }
    options:
      - { text: "Der {{t:big-blind|Big Blind}}", correct: true, why: "Ja: Der {{t:big-blind}} verteidigt viele gleichfarbige {{t:connectors|Connectors}} und Hände mit einer Sechs oder Sieben. Du hast vom Button mehr hohe Karten, die hier nichts getroffen haben. Das ist der {{t:nuts-advantage|Nuts-Vorteil}} des {{t:big-blind|Big Blinds}}." }
      - { text: "Du, als {{t:open|Eröffner}} vom Button", why: "Nein: Deine {{t:range|Range}} ist voller hoher Karten. Du hast mehr {{t:overpair|Overpairs}} ({{t:pocket-pair|Pocket Pairs}}, die höher sind als jede Karte auf dem {{t:board|Board}}, z. B. TT, JJ), aber weniger {{t:two-pair|zwei Paare}} und {{t:straight|Straßen}}; Sets (Drillinge mit einem {{t:pocket-pair|Pocket Pair}}) habt ihr ähnlich viele." }
      - { text: "Beide gleich oft", why: "Nein: Die {{t:range|Ranges}} sind unterschiedlich zusammengesetzt. Die breite Verteidigung des {{t:big-blind|Big Blinds}} hat viele kleine Karten, deine {{t:range|Range}} hohe." }
  - kind: choice
    id: m5.l2.q-capped
    family: m5.advantage.why
    rules: [R-M5-003]
    prompt: "Warum hat ein {{t:big-blind}}, der deine {{t:open|Eröffnung}} nur {{t:call|gecallt}} hat, auf einem Flop [[Ad 8s 3c]] selten AA oder AK?"
    table: { position: BTN, board: "Ad 8s 3c" }
    options:
      - { text: "Weil er mit diesen Händen vor dem Flop meistens {{t:raise|raist}} (3-Bet)", correct: true, why: "Ja: Seine stärksten Hände spielt der {{t:big-blind}} mit einer 3-Bet, also hat seine {{t:range|Range}} nach einem bloßen {{t:call|Call}} wenige der besten Hände. Du hast sie alle in deiner {{t:range|Range}}." }
      - { text: "Weil der {{t:big-blind}} nie Asse spielt", why: "Nein: Der {{t:big-blind}} verteidigt viele Asse, z. B. A5 oder A9. Ihm fehlen vor allem die stärksten, die er geraist hätte." }
      - { text: "Weil schon ein Ass auf dem Flop liegt", why: "Das Ass auf dem {{t:board|Board}} verringert die Zahl der {{t:combo|Kombinationen}} mit einem Ass in beiden {{t:range|Ranges}}, schafft aber keinen Unterschied zwischen ihnen. Der Unterschied entsteht durch die Entscheidungen vor dem Flop." }
  - kind: choice
    id: m5.l2.q-kinds
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "Du hast den {{t:range-advantage|Range-Vorteil}}, aber dein Gegner hat genauso viele der stärksten Hände wie du. Mit welcher Größe bettest du eher?"
    options:
      - { text: "Klein, und das oft", correct: true, why: "Ja: Der {{t:range-advantage|Range-Vorteil}} sagt, dass du oft betten kannst. Ohne {{t:nuts-advantage|Nuts-Vorteil}} riskiert eine große {{t:bet|Bet}} viel gegen die stärksten Hände deines Gegners, und schwächere Hände {{t:fold|folden}} ohnehin schon auf eine kleine." }
      - { text: "Groß, weil du den Vorteil hast", why: "Nein: Über eine große Bet-Größe entscheidet der {{t:nuts-advantage|Nuts-Vorteil}}, also mehr der stärksten Hände. Den hast du hier nicht." }
      - { text: "Ich {{t:check|checke}} immer", why: "Zu vorsichtig: Der {{t:range-advantage|Range-Vorteil}} ist ein Grund, oft zu betten, nur klein." }
  - kind: choice
    id: m5.l2.q-nuts
    family: m5.advantage.why
    rules: [R-M5-005]
    prompt: "In deiner {{t:range|Range}} sind viel mehr der stärksten Hände als in der {{t:range|Range}} deines Gegners. Was bringt dir das?"
    options:
      - { text: "Du kannst groß betten, weil du selten auf eine bessere Hand triffst", correct: true, why: "Ja: Das ist der {{t:nuts-advantage|Nuts-Vorteil}}. Eine große {{t:bet|Bet}} holt mehr aus den mittelstarken Händen des Gegners heraus, und ein {{t:raise|Raise}} von einer besseren Hand kommt selten vor." }
      - { text: "Du musst immer klein betten", why: "Nein: Die kleine Größe wählst du, wenn du nur den {{t:range-advantage|Range-Vorteil}} hast. Der {{t:nuts-advantage|Nuts-Vorteil}} erlaubt dir, größer zu betten." }
      - { text: "Nichts, es zählt nur deine Hand", why: "Deine Hand ist wichtig, aber der Gegner sieht nur deine {{t:range|Range}}. Die Größe der {{t:bet|Bet}} wählt man so, dass sie zu vielen Händen gleichzeitig passt." }
  - kind: numeric
    id: m5.l2.n-miss
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Der Gegner hat zwei Karten unterschiedlichen Rangs, z. B. [[Jc Td]]. In wie viel Prozent der Fälle paart der Flop keine von beiden? Gib eine Zahl ein."
    table: { opp: "Jc Td" }
    answer: flop.miss.unpaired
    explanation: "Von den {{n:cards.unseen.preflop}} unbekannten Karten ergeben nur {{n:pair.outs.unpaired}} ein {{t:pair|Paar}}: je drei verbliebene Buben und Zehnen. Der Flop besteht aus {{n:cards.board.flop}} Karten, und die Chance, dass keine davon eine dieser {{n:pair.outs.unpaired}} ist, beträgt ca. {{n:flop.miss.unpaired}}. Ein {{t:pair|Paar}} triffst du also nur in ca. {{n:flop.hit.unpaired}} der Fälle."
  - kind: choice
    id: m5.l2.q-miss-means
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Eine Hand ohne {{t:pair|Paar}} trifft auf dem Flop in ca. {{n:flop.miss.unpaired}} der Fälle kein {{t:pair|Paar}}. Was folgt daraus für die C-Bet?"
    options:
      - { text: "Der Gegner hat oft nichts, also gewinnt selbst eine kleine {{t:bet|Bet}} oft sofort den {{t:pot|Pot}}", correct: true, why: "Ja: Das ist die Grundlage der C-Bet. Nichts zu treffen bedeutet nicht immer einen {{t:fold|Fold}} (der Gegner kann einen {{t:draw|Draw}} oder hohe Karten haben), aber in seiner {{t:range|Range}} gibt es viele schwache Hände." }
      - { text: "Der Gegner {{t:fold|foldet}} in genau {{n:flop.miss.unpaired}} der Fälle", why: "Nein: Ein Gegner ohne {{t:pair|Paar}} {{t:call|callt}} manchmal mit einem {{t:draw|Draw}} oder einer hohen Karte, und manchmal hat er ein {{t:pair|Paar}} auf der Hand. Das ist nur eine Annäherung daran, wie oft der Flop ihn verfehlt hat." }
      - { text: "Du triffst genauso oft nichts, also ergibt die C-Bet keinen Sinn", why: "Nein: Du triffst auch oft nichts, aber der Gegner weiß nicht, wann. Deine {{t:range|Range}} als {{t:aggressor|Aggressor}} (der Spieler, der vor dem Flop zuletzt {{t:raise|geraist}} hat) ist auf vielen Flops stärker, und eine {{t:bet|Bet}} gewinnt den {{t:pot|Pot}}, wenn der Gegner {{t:fold|foldet}}." }
  - kind: numeric
    id: m5.l2.n-hit
    family: m5.math.miss
    rules: [R-M5-006]
    prompt: "Und in wie viel Prozent der Fälle paart der Flop mindestens eine der beiden Karten einer Hand ohne {{t:pair|Paar}}? Gib eine Zahl ein."
    answer: flop.hit.unpaired
    explanation: "Das ist die Ergänzung zur vorherigen Zahl: {{n:prob.certain}} minus {{n:flop.miss.unpaired}} ergibt ca. {{n:flop.hit.unpaired}}, also ungefähr jeden dritten Flop."
---
Vor dem Flop sehen die {{t:range|Ranges}} der Spieler unterschiedlich aus. Der {{t:open|Eröffner}} vom Button hat viele hohe Karten. Der {{t:big-blind|Big Blind}} verteidigt sehr breit, aber die stärksten Hände (AA, KK, AK) {{t:raise|raist}} er meistens, also hat er nach einem bloßen {{t:call|Call}} wenige davon. Der Flop passt zu einer dieser {{t:range|Ranges}} besser, und das entscheidet, wer oft betten kann.

## {{t:range-advantage|Range-Vorteil}}

Du hast den {{t:range-advantage|Range-Vorteil}}, wenn deine Hände auf einem bestimmten Flop im Schnitt stärker sind als die Hände deines Gegners. Auf [[Ks 7d 2c]] nach einer {{t:open|Eröffnung}} vom Button hast du mehr Könige mit gutem Kicker und mehr hohe {{t:pair|Paare}}. Der {{t:big-blind|Big Blind}} hat hier viele Hände, die nichts getroffen haben.

Auf einem niedrigen, {{t:connected|verbundenen}} Flop, z. B. [[7s 6h 5d]], verschwindet der {{t:range-advantage|Range-Vorteil}} fast, und die stärksten Hände hat öfter der {{t:big-blind}}: Er verteidigt viele gleichfarbige {{t:connectors|Connectors}} und Hände mit einer Sechs oder Sieben, also hat er öfter {{t:two-pair|zwei Paare}} oder eine {{t:straight|Straße}}.

## {{t:nuts-advantage|Nuts-Vorteil}}

Der {{t:nuts-advantage|Nuts-Vorteil}} bedeutet mehr der stärksten Hände („{{t:nuts|Nuts}}“) in der {{t:range|Range}}. Der {{t:range-advantage|Range-Vorteil}} sagt dir, wie oft du betten kannst. Der {{t:nuts-advantage|Nuts-Vorteil}} sagt dir, wie groß: Wenn du viel mehr der stärksten Hände hast als dein Gegner, kannst du größer betten. Wenn du nur den {{t:range-advantage|Range-Vorteil}} hast, bettest du klein.

## Der Gegner trifft meistens nichts

Eine Hand ohne {{t:pair|Paar}}, z. B. [[Jc Td]], trifft auf dem Flop in ca. {{n:flop.miss.unpaired}} der Fälle kein {{t:pair|Paar}}. Von den {{n:cards.unseen.preflop}} unbekannten Karten paaren nur {{n:pair.outs.unpaired}} ihre Karten. Quellen nennen oft ca. {{n:flop.hit.one-pair}}: Das ist die Chance auf genau ein {{t:pair|Paar}}; mit {{t:two-pair|zwei Paaren}} und {{t:three-of-a-kind|Drilling}} liegt die Trefferquote bei ca. {{n:flop.hit.unpaired}}. Deshalb gewinnt eine {{t:bet|Bet}} auf dem Flop oft sofort den {{t:pot|Pot}}, auch wenn du selbst nichts getroffen hast. Nichts zu treffen bedeutet nicht immer einen {{t:fold|Fold}}: Der Gegner kann einen {{t:draw|Draw}} oder zwei hohe Karten haben.

:::note Woher diese Prinzipien stammen
Die Begriffe {{t:range-advantage|Range-Vorteil}} und {{t:nuts-advantage|Nuts-Vorteil}} stammen aus spieltheoretischen Materialien, die auf Solver-Ergebnissen beruhen (ein Begriffsglossar und ein Artikel über C-Bet-Größen). Die Zahlen in dieser Lektion sind exakte Berechnungen der App.
:::
