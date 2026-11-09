---
id: m8.l3
module: m8
order: 3
title: "Blocker"
sub: "Mit welcher Hand bluffen"
rules: [R-M8-009, R-M8-007, R-M8-008, R-M8-006]
drills:
  - kind: choice
    id: m8.l3.q-what-blocker
    family: m8.blockers.concept
    rules: [R-M8-009]
    prompt: "Was ist ein {{t:blocker|Blocker}}?"
    options:
      - { text: "Eine Karte in deiner Hand, durch die dein Gegner weniger {{t:combo|Kombinationen}} einer bestimmten Hand hat", correct: true, why: "Eine Karte, die du hältst, kann dein Gegner nicht haben. Wenn du ein Ass hast, hat dein Gegner weniger Asse: weniger {{t:pair|Paare}} aus Assen, weniger AK, weniger Flushes mit dem Ass." }
      - { text: "Eine Karte auf dem {{t:board|Board}}, die einen {{t:draw|Draw}} kaputt macht", why: "So sagt man umgangssprachlich manchmal über Karten auf dem {{t:board|Board}}, aber ein {{t:blocker|Blocker}} in diesem Sinn ist eine Karte in deiner Hand. Die Karten auf dem {{t:board|Board}} sehen beide Spieler." }
      - { text: "Ein kleiner Bet, der einen großen Bet des Gegners verhindern soll", why: "Das ist ein sogenannter Blocking Bet, etwas anderes. Ein {{t:blocker|Blocker}} ist eine Karte in deiner Hand, die die Zahl der {{t:combo|Kombinationen}} deines Gegners verringert." }
  - kind: numeric
    id: m8.l3.n-ak-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Ohne weiteres Wissen hat AK {{n:combos.unpaired}} {{t:combo|Kombinationen}}. Du hältst einen König (kein Ass). Wie viele {{t:combo|Kombinationen}} AK kann dein Gegner haben? Gib die Zahl ein."
    answer: combos.unpaired.one-blocked
    explanation: "Es gibt {{n:cards.suits}} Asse, und es sind {{n:pair.outs.per-rank}} Könige übrig, weil einer bei dir ist: {{n:pair.outs.per-rank}} × {{n:cards.suits}} = {{n:combos.unpaired.one-blocked}}. Eine Karte entfernt ein ganzes Viertel der {{t:combo|Kombinationen}}."
  - kind: numeric
    id: m8.l3.n-aa-one
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Ein {{t:pair|Paar}} Asse hat {{n:combos.pair}} {{t:combo|Kombinationen}}. Du hältst ein Ass. Wie viele {{t:combo|Kombinationen}} für ein {{t:pair|Paar}} Asse kann dein Gegner haben? Gib die Zahl ein."
    answer: combos.pair.one-blocked
    explanation: "Es sind {{n:pair.outs.per-rank}} Asse übrig, und aus drei Karten lassen sich nur {{n:combos.pair.one-blocked}} {{t:pair|Paare}} bilden. Ein Ass in deiner Hand entfernt die Hälfte der {{t:combo|Kombinationen}} von AA."
  - kind: choice
    id: m8.l3.q-ak-both
    family: m8.blockers.combos
    rules: [R-M8-009]
    prompt: "Du hältst [[Ah Kc]]. Wie viele {{t:combo|Kombinationen}} AK kann dein Gegner haben?"
    options:
      - { text: "{{n:combos.unpaired.both-blocked}}", correct: true, why: "Es sind {{n:pair.outs.per-rank}} Asse und {{n:pair.outs.per-rank}} Könige übrig: {{n:pair.outs.per-rank}} × {{n:pair.outs.per-rank}} = {{n:combos.unpaired.both-blocked}}." }
      - { text: "{{n:combos.unpaired.one-blocked}}", why: "So viele wären es, wenn du nur das Ass oder nur den König hieltest. Du blockst beide Ränge." }
      - { text: "{{n:combos.unpaired}}", why: "So viele {{t:combo|Kombinationen}} AK gibt es im Deck, bevor du deine Karten siehst. Dein Ass und dein König können nicht beim Gegner sein." }
  - kind: choice
    id: m8.l3.q-flush-blocker
    family: m8.blockers.bluff
    rules: [R-M8-007]
    prompt: "Am River kam die dritte Herz-Karte, und ein {{t:flush|Flush}} ist möglich. Der {{t:big-blind|Big Blind}} {{t:check|checkt}}. Du hast nur Ass-hoch und willst bluffen. Mit welcher Hand ist der {{t:bluff|Bluff}} besser?"
    table: { board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "[[Ah 3c]]", correct: true, why: "Das Herz-Ass blockt die stärksten Flushes des Gegners: Er kann keinen {{t:flush|Flush}} mit dem Ass haben, und das ist eine Hand, die immer zahlt. Dein Gegner hat weniger Hände zum {{t:call|Callen}}, also funktioniert der {{t:bluff|Bluff}} öfter." }
      - { text: "[[Ad 3c]]", why: "Gleiche Stärke im Showdown, aber du blockst keinen {{t:flush|Flush}}. Der Gegner hat alle seine Flushes, mit denen er zahlt." }
      - { text: "Kein Unterschied, beide sind nur Ass-hoch", why: "Im Showdown ja, aber als {{t:bluff|Bluff}} nicht. Das Herz-Ass verringert die Zahl der gegnerischen Flushes, die sicher zahlen." }
  - kind: choice
    id: m8.l3.q-missed-flush
    family: m8.blockers.bluff
    rules: [R-M8-008]
    prompt: "Der {{t:flush-draw|Flush-Draw}} in Pik ist nicht angekommen. Der {{t:big-blind|Big Blind}} checkt am River. Beide Hände haben nur Dame-Acht. Mit welcher bluffst du besser?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "[[Qd 8c]]", correct: true, why: "Ohne Pik blockst du keine verpassten {{t:draw|Draws}} des Gegners, und das sind Hände, die auf deinen Bet {{t:fold|folden}}. Die übrigen Karten beider Hände sind gleich." }
      - { text: "[[Qd 8s]]", why: "Die Pik-Acht blockt einen Teil der verpassten {{t:flush-draw|Flush-Draws}} (z. B. [[8s 7s]]), mit denen der Gegner {{t:fold|folden}} würde. Ihm bleiben relativ mehr Hände, mit denen er zahlt." }
      - { text: "Kein Unterschied", why: "Der Unterschied liegt in der Farbe der Acht. Ein Pik in deiner Hand nimmt dem Gegner einen Teil der Hände, die er folden würde." }
  - kind: choice
    id: m8.l3.q-showdown-first
    family: m8.blockers.bluff
    rules: [R-M8-006]
    prompt: "Dieselbe Situation: Pik ist nicht angekommen, der {{t:big-blind|Big Blind}} {{t:check|checkt}}. Du hast eine von zwei Händen. Mit welcher {{t:bluff|bluffst}} du, und mit welcher {{t:check|checkst}} du?"
    table: { board: "Kd 9s 5s 2c 3h", position: BTN }
    options:
      - { text: "Mit [[Qc Jd]] {{t:bluff|bluffen}}, mit [[9c 8c]] {{t:check|checken}}", correct: true, why: "Ein {{t:pair|Paar}} Neunen schlägt verpasste {{t:draw|Draws}} nach einem {{t:check|Check}}. Dame-Bube verliert gegen fast jede Hand, also kann nur ein {{t:bluff|Bluff}} den {{t:pot|Pot}} gewinnen." }
      - { text: "Mit [[9c 8c]] {{t:bluff|bluffen}}, mit [[Qc Jd]] {{t:check|checken}}", why: "Umgekehrt. Ein {{t:bluff|Bluff}} mit einem {{t:pair|Paar}} Neunen gibt einen Sieg im Showdown her, und ein {{t:check|Check}} mit Dame-Bube gibt den {{t:pot|Pot}} kampflos ab." }
      - { text: "Mit beiden {{t:bluff|bluffen}}", why: "Ein {{t:pair|Paar}} Neunen braucht keinen {{t:bluff|Bluff}}: Es schlägt nach einem {{t:check|Check}} viele Hände. Du {{t:bluff|bluffst}} mit Händen ohne Showdown-Wert." }
  - kind: choice
    id: m8.l3.q-program-rule
    family: m8.blockers.concept
    rules: [R-M8-007, R-M8-008]
    prompt: "Du wählst am River einen {{t:bluff|Bluff}} unter Händen ohne Showdown-Wert. Welche Karte auf deiner Hand hilft am meisten?"
    options:
      - { text: "Eine Karte aus den Händen, mit denen der Gegner zahlt", correct: true, why: "Du blockst seinen Value: Er hat weniger starke Hände, also bleibt ihm öfter eine Hand zum Folden." }
      - { text: "Eine Karte in der Farbe des verpassten {{t:draw|Draws}}", why: "Sie blockt Hände, die der Gegner {{t:fold|foldet}}. Der {{t:bluff|Bluff}} funktioniert dann seltener." }
      - { text: "Die höchste Karte, unabhängig vom Board", why: "Eine hohe Karte gibt etwas Stärke im Showdown, sagt aber nichts darüber, was du blockst. Achte darauf, welche Hände des Gegners zahlen." }
  - kind: choice
    id: m8.l3.q-blocker-not-enough
    family: m8.blockers.bluff
    rules: [R-M8-006, R-M8-007]
    prompt: "Am River kam die dritte Herz-Karte. Der {{t:big-blind|Big Blind}} {{t:check|checkt}}. Du hast ein {{t:pair|Paar}} Neunen und das Herz-Ass. Was tust du?"
    table: { hand: "Ah 9c", board: "Kh 9h 4c 2s 6h", position: BTN }
    options:
      - { text: "{{t:check|Checken}}", correct: true, why: "Ein {{t:pair|Paar}} Neunen schlägt nach einem {{t:check|Check}} viele Hände des Gegners ohne {{t:pair|Paar}}. Ein {{t:blocker|Blocker}} macht aus einer Hand mit Showdown-Wert keinen guten {{t:bluff|Bluff}}: Zuerst wählst du Hände ohne Chance, erst danach schaust du auf {{t:blocker|Blocker}}." }
      - { text: "Als {{t:bluff|Bluff}} betten, weil ich das Herz-Ass habe", why: "Das Herz-Ass ist ein guter {{t:blocker|Blocker}}, aber mit einem {{t:pair|Paar}} Neunen verlierst du, wenn du {{t:bluff|bluffst}}: Schlechtere Hände würden ohnehin {{t:fold|folden}}, und Flushes und Könige zahlen." }
      - { text: "Für {{t:value|Value}} betten", why: "Wer zahlt mit einer schlechteren Hand? Auf einem {{t:board|Board}} mit möglichem Flush {{t:fold|folden}} Hände, die schwächer sind als ein {{t:pair|Paar}} Neunen, fast immer." }
---
In der vorigen Lektion hast du festgelegt, wie viele {{t:bluff|Bluffs}} du brauchst und dass du mit Händen ohne Chance im Showdown {{t:bluff|bluffst}}. Oft gibt es mehr solche Hände als nötig. Dann entscheiden die **{{t:blocker|Blocker}}**.

## {{t:blocker|Blocker}}

Eine Karte, die du hältst, kann dein Gegner nicht haben. Deshalb hat er weniger {{t:combo|Kombinationen}} von Händen mit dieser Karte:

| Hand des Gegners | Ohne {{t:blocker|Blocker}} | Du hältst eine Karte dieses Rangs |
|---|---|---|
| AK | {{n:combos.unpaired}} | {{n:combos.unpaired.one-blocked}} |
| AA | {{n:combos.pair}} | {{n:combos.pair.one-blocked}} |

Wenn du sowohl das Ass als auch den König hältst, hat dein Gegner nur {{n:combos.unpaired.both-blocked}} {{t:combo|Kombinationen}} AK.

## Blocke die Hände, mit denen der Gegner zahlt

Ein guter {{t:bluff|Bluff}} hat eine Karte aus den Händen, mit denen der Gegner **{{t:call|callt}}**. Beispiel: Am River kam die dritte Herz-Karte. Das Herz-Ass in deiner Hand bedeutet, dass der Gegner keinen {{t:flush|Flush}} mit dem Ass hat, also keine Hand, die immer zahlt. Ihm bleiben mehr Hände zum Folden.

## Blocke nicht die Hände, die der Gegner {{t:fold|foldet}}

Wenn der {{t:flush-draw|Flush-Draw}} **nicht ankommt**, {{t:fold|foldet}} der Gegner seine verpassten {{t:draw|Draws}}. Hast du eine Karte in dieser Farbe, hat er weniger davon, also trifft dein {{t:bluff|Bluff}} öfter auf eine Hand, die zahlt. Von zwei ähnlichen {{t:bluff|Bluffs}} wählst du den ohne Karten in der Farbe des verpassten {{t:draw|Draws}}.

## Zuerst die Showdown-Stärke

Die Reihenfolge steht fest: Zuerst legst du die Hände beiseite, die nach einem {{t:check|Check}} gewinnen können, und erst aus dem Rest wählst du die {{t:bluff|Bluffs}} mit den besten {{t:blocker|Blockern}}. Ein guter {{t:blocker|Blocker}} macht aus einem {{t:pair|Paar}}, das den Showdown gewinnen würde, keinen {{t:bluff|Bluff}}. {{t:blocker|Blocker}} geben bei der Wahl zwischen ähnlichen Händen den Ausschlag; der Effekt selbst ist klein, daher entscheidet er erst, wenn die Hände ähnlich stark sind (genauso bei der Wahl der {{t:call|Calls}} in der nächsten Lektion).

:::note Woher diese Regeln stammen
Die Zahlen der {{t:combo|Kombinationen}} sind Kombinatorik. Die Regeln für die Wahl der {{t:bluff|Bluffs}} nach {{t:blocker|Blockern}} stammen aus dem Lehrplan sowie aus Trainingsmaterialien und Solver-Analysen. Wenn andere {{t:bluff|Bluffs}} fehlen, {{t:bluff|blufft}} der Solver auch mit verpassten Flushes.
:::
