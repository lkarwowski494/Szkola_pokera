---
id: m9.l3
module: m9
order: 3
title: "Geometrisches Sizing"
sub: "Derselbe Anteil des Pots bis zum All-in"
rules: [R-M9-006, R-M9-007]
drills:
  - kind: numeric
    id: m9.l3.n-pot-after
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Im {{t:pot}} sind {{n:ex.pot}}. Du bettest den ganzen {{t:pot}} ({{n:ex.bet.pot}}), dein Gegner {{t:call|callt}}. Wie viel ist jetzt im {{t:pot}}? Gib eine Zahl ein."
    answer: ex.pot.after-pot-call
    explanation: "{{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} = {{n:ex.pot.after-pot-call}}. Eine {{t:bet}} in Höhe des {{t:pot|Pots}} und ein {{t:call}} multiplizieren den {{t:pot}} mit drei. Allgemein: Eine {{t:bet}} von f des {{t:pot|Pots}} und ein {{t:call}} multiplizieren den {{t:pot}} mit (1 + 2f)."
  - kind: numeric
    id: m9.l3.n-three-pot-bets
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Im {{t:pot}} sind {{n:ex.pot}}. Auf Flop, Turn und River bettest du den ganzen {{t:pot}} ({{n:ex.bet.pot}}, dann {{n:geo.ex.turn}}, dann {{n:geo.ex.river}}), und dein Gegner {{t:call|callt}} jedes Mal. Wie viel zahlt jeder von euch insgesamt ein? Gib eine Zahl ein."
    answer: geo.ex.total
    explanation: "{{n:ex.bet.pot}} + {{n:geo.ex.turn}} + {{n:geo.ex.river}} = {{n:geo.ex.total}}. Der {{t:pot}} wächst von {{n:ex.pot}} auf {{n:ex.pot.after-pot-call}}, {{n:geo.ex.turn-after}} und {{n:geo.ex.river-after}}. Drei {{t:bet|Bets}} in Höhe des {{t:pot|Pots}} bringen also bei {{t:spr}} {{n:spr.zone.deep}} das All-in."
  - kind: choice
    id: m9.l3.q-half-spr
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Bei welcher {{t:spr}} bringen drei {{t:bet|Bets}} über den halben {{t:pot}} (Flop, Turn, River, jede gecallt) genau den ganzen Stack ein?"
    options:
      - { text: "{{n:geo.half.spr}}", correct: true, why: "{{t:pot|Pot}} {{n:ex.pot}}: {{t:bet|Bets}} von {{n:ex.bet.half}}, {{n:geo.half.turn}} und {{n:geo.half.river}} ergeben zusammen {{n:geo.half.total}}, also einen Stack von {{n:geo.half.stack}}. Nach der Formel: (1 + 2·{{n:ex.frac.half}}) hoch drei = 1 + 2·{{n:geo.half.spr}}." }
      - { text: "{{n:spr.zone.deep}}", why: "Bei {{t:spr}} {{n:spr.zone.deep}} musst du auf jeder {{t:street}} den ganzen {{t:pot}} betten. {{t:bet|Bets}} über den halben {{t:pot}} bringen dann nur {{n:geo.half.total}} von {{n:geo.ex.stack}} ein." }
      - { text: "{{n:spr.commit}}", why: "Bei {{t:spr}} {{n:spr.commit}} sind drei {{t:bet|Bets}} über den halben {{t:pot}} zu viel: Der Stack geht schon am River aus, bevor du den vollen halben {{t:pot}} {{t:bet|bettest}}. Ein solcher Plan entspricht {{t:spr}} {{n:geo.half.spr}}." }
  - kind: choice
    id: m9.l3.q-srp-half
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Pot}} mit einem Raise: Auf dem Flop sind {{n:bb.pot-after.vs-btn}} drin, jeder von euch hat noch {{n:spr.srp.stack}} im Stack. Du bettest auf Flop, Turn und River den halben {{t:pot}}, dein Gegner {{t:call|callt}} immer. Wie viel zahlst du insgesamt ein?"
    options:
      - { text: "{{n:srp.half.total}}", correct: true, why: "{{n:srp.half.flop}} + {{n:srp.half.turn}} + {{n:srp.half.river}} = {{n:srp.half.total}}. Der Großteil des Stacks bleibt außerhalb des {{t:pot|Pots}}: Bei {{t:spr}} ca. {{n:spr.srp}} ist ein halber {{t:pot}} zu wenig, um um den ganzen Stack zu spielen." }
      - { text: "{{n:spr.srp.stack}}, also der ganze Stack", why: "Der {{t:pot}} wächst nur auf {{n:srp.half.flop-after}}, {{n:srp.half.turn-after}} und so weiter. Drei {{t:bet|Bets}} über den halben {{t:pot}} bringen zusammen {{n:srp.half.total}} ein, weit entfernt vom ganzen Stack." }
      - { text: "{{n:srp.potbet.total}}", why: "So viel würden drei {{t:bet|Bets}} in Höhe des ganzen {{t:pot|Pots}} einbringen ({{n:srp.potbet.flop}}, {{n:srp.potbet.turn}}, {{n:srp.potbet.river}}). {{t:bet|Bets}} über den halben {{t:pot}} ergeben nur {{n:srp.half.total}}." }
  - kind: choice
    id: m9.l3.q-srp-geo
    family: m9.geo-srp
    rules: [R-M9-007]
    prompt: "{{t:pot|Pot}} mit einem Raise, {{t:spr}} ca. {{n:spr.srp}}. Welche gleichbleibende {{t:bet}}-Größe auf Flop, Turn und River bringt den ganzen Stack ein?"
    options:
      - { text: "Ca. {{n:geo.srp.3}} {{t:pot}}, also mehr als der ganze {{t:pot}}", correct: true, why: "Ja: Selbst drei {{t:bet|Bets}} in Höhe des {{t:pot|Pots}} bringen nur {{n:srp.potbet.total}} von einem Stack von {{n:spr.srp.stack}} ein. Der ganze Stack geht erst bei ca. {{n:geo.srp.3}} {{t:pot}} auf jeder {{t:street}} rein." }
      - { text: "Ca. {{n:geo.3bet-ip.3}} {{t:pot}}", why: "Das reicht in einem 3-Bet-{{t:pot}} ({{t:spr}} ca. {{n:spr.3bet-ip}}). In einem {{t:pot}} mit einem Raise liegt die {{t:spr}} bei ca. {{n:spr.srp}}, also müssen die {{t:bet|Bets}} größer als der {{t:pot}} sein." }
      - { text: "Ca. {{n:cbet.size.small}} {{t:pot}}", why: "Drei solche {{t:bet|Bets}} bringen nur einen kleinen Teil des Stacks ein. Bei {{t:spr}} ca. {{n:spr.srp}} brauchst du ca. {{n:geo.srp.3}} {{t:pot}} auf jeder {{t:street}}." }
  - kind: choice
    id: m9.l3.q-3bet-ip
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "3-Bet-{{t:pot}}, du hast {{t:position}}, {{t:spr}} ca. {{n:spr.3bet-ip}}. Du hast eine sehr starke Hand und willst bis zum River mit gleich großen {{t:bet|Bets}} den ganzen Stack einzahlen. Wie viel bettest du auf dem Flop?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "Ca. {{n:geo.3bet-ip.3}} {{t:pot}} ({{n:geo.3bet-ip.flop}})", correct: true, why: "Ja: (1 + 2f) hoch drei = 1 + 2·{{n:spr.3bet-ip}} ergibt f ≈ {{n:geo.3bet-ip.3}}. {{t:bet|Bets}} von {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} und {{n:geo.3bet-ip.river}} ergeben zusammen {{n:geo.3bet-ip.total}}, also den ganzen Stack." }
      - { text: "{{n:cbet.size.small}} {{t:pot}} ({{n:g3b.third.flop}})", sizeError: true, why: "Richtige Aktion, falsche Größe: Drei {{t:bet|Bets}} über je 1/3 {{t:pot}} bringen nur ca. {{n:g3b.third.total}} von {{n:spr.3bet-ip.stack}} ein. Für den Plan „ganzer Stack bis zum River“ brauchst du ca. {{n:geo.3bet-ip.3}} {{t:pot}}." }
      - { text: "Ich {{t:check|checke}} und gehe am River all-in", why: "Ein All-in über {{n:spr.3bet-ip.stack}} am River in einen {{t:pot}} von {{n:vs3bet.pot-after}} ist eine {{t:bet}}, die um ein Vielfaches größer ist als der {{t:pot}}: Dein Gegner bezahlt sie nur mit einer sehr starken Hand. Gleich große {{t:bet|Bets}} auf drei {{t:street|Streets}} geben ihm die Chance, nach und nach Geld einzuzahlen." }
  - kind: choice
    id: m9.l3.q-3bet-oop
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pot}} nach deiner 3-Bet aus dem {{t:big-blind}}, {{t:spr}} ca. {{n:spr.3bet-oop}}. Du willst bis zum River mit gleich großen {{t:bet|Bets}} den ganzen Stack einzahlen. Welcher Anteil des {{t:pot|Pots}} auf jeder {{t:street}}?"
    table: { position: BB }
    options:
      - { text: "Ca. {{n:geo.3bet-oop.3}} {{t:pot}}", correct: true, why: "Ja: Bei {{t:spr}} ca. {{n:spr.3bet-oop}} gilt (1 + 2f) hoch drei = 1 + 2·{{n:spr.3bet-oop}}, also f ≈ {{n:geo.3bet-oop.3}}. Eine niedrigere {{t:spr}} als nach einer 3-Bet {{t:in-position}}, also auch eine kleinere Größe." }
      - { text: "Ca. {{n:geo.3bet-ip.3}} {{t:pot}}", sizeError: true, why: "Nah dran, aber das ist die Größe für {{t:spr}} ca. {{n:spr.3bet-ip}}. Bei {{t:spr}} ca. {{n:spr.3bet-oop}} reichen ca. {{n:geo.3bet-oop.3}} {{t:pot}}, und bei größeren {{t:bet|Bets}} fehlt dir am River der Stack für eine volle {{t:bet}}." }
      - { text: "Ca. {{n:geo.4bet.3}} {{t:pot}}", sizeError: true, why: "Das reicht nach einer 4-Bet ({{t:spr}} ca. {{n:spr.4bet}}). Bei {{t:spr}} ca. {{n:spr.3bet-oop}} lassen drei solche {{t:bet|Bets}} einen großen Teil des Stacks übrig." }
  - kind: choice
    id: m9.l3.q-4bet-two
    family: m9.geo-size
    rules: [R-M9-006]
    prompt: "{{t:pot|Pot}} nach einer 4-Bet, {{t:spr}} ca. {{n:spr.4bet}}. Du willst den ganzen Stack mit zwei {{t:bet|Bets}} einzahlen: auf dem Flop und auf dem Turn. Wie viel bettest du auf dem Flop?"
    options:
      - { text: "Ca. {{n:geo.4bet.2}} {{t:pot}}", correct: true, why: "Ja: Für zwei {{t:street|Streets}} gilt (1 + 2f) zum Quadrat = 1 + 2·{{n:spr.4bet}}, also f ≈ {{n:geo.4bet.2}}. Nach {{t:bet}} und {{t:call}} bleibt genau so viel übrig, wie eine gleich große {{t:bet}} am Turn beträgt." }
      - { text: "Ca. {{n:geo.4bet.3}} {{t:pot}}", sizeError: true, why: "Das ist die Größe für drei {{t:street|Streets}}. Mit zwei {{t:bet|Bets}} über je {{n:geo.4bet.3}} {{t:pot}} bleibt ein Teil des Stacks für den River übrig." }
      - { text: "Sofort All-in ({{n:spr.4bet.stack}})", why: "Das ist ein Plan für eine {{t:street}}, nicht für zwei. Eine {{t:bet}} von ca. {{n:spr.4bet}} {{t:pot|Pots}} sofort lässt deinem Gegner nur eine Entscheidung: alles {{t:call|callen}} oder {{t:fold|folden}}." }
  - kind: choice
    id: m9.l3.q-meaning
    family: m9.geo-math
    rules: [R-M9-006]
    prompt: "Was bedeutet geometrisches Sizing?"
    options:
      - { text: "Derselbe Anteil des {{t:pot|Pots}} auf jeder {{t:street}}, sodass die letzte {{t:bet}} ein All-in ist", correct: true, why: "Ja: Eine {{t:bet}} von f und ein {{t:call}} multiplizieren den {{t:pot}} auf jeder {{t:street}} mit (1 + 2f). Du wählst die Größe so, dass nach der letzten {{t:bet}} der ganze Stack im {{t:pot}} ist." }
      - { text: "Immer eine {{t:bet}} in Höhe des ganzen {{t:pot|Pots}}", why: "Der ganze {{t:pot}} ist nur bei einer einzigen {{t:spr}} geometrisch (z. B. {{n:spr.zone.deep}} für drei {{t:street|Streets}}). Bei {{t:spr}} ca. {{n:spr.3bet-ip}} reichen ca. {{n:geo.3bet-ip.3}} {{t:pot}}." }
      - { text: "{{t:bet|Bets}}, die prozentual immer größer werden: klein auf dem Flop, groß am River", why: "Die Beträge wachsen, weil der {{t:pot}} wächst, aber der Anteil des {{t:pot|Pots}} ist auf jeder {{t:street}} gleich. Im 3-Bet-{{t:pot}} sind das {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} und {{n:geo.3bet-ip.river}}, jedes Mal ca. {{n:geo.3bet-ip.3}} {{t:pot}}." }
---
Bevor du auf dem Flop {{t:bet|bettest}}, lohnt es sich zu wissen, wie viel Geld sich bis zum River einzahlen lässt. Eine {{t:bet}} und ein {{t:call}} addieren zum {{t:pot}} keinen festen Betrag, sondern multiplizieren ihn.

## Wie der {{t:pot}} wächst

Eine {{t:bet}} von f des {{t:pot|Pots}} und ein {{t:call}} multiplizieren den {{t:pot}} mit (1 + 2f). Bei einer {{t:bet}} in Höhe des ganzen {{t:pot|Pots}} verdreifacht sich der {{t:pot}}:

| {{t:street}} | {{t:pot}} vor der {{t:bet}} | {{t:bet}} (ganzer {{t:pot}}) | {{t:pot}} nach dem {{t:call}} |
|---|---|---|---|
| Flop | {{n:ex.pot}} | {{n:ex.bet.pot}} | {{n:ex.pot.after-pot-call}} |
| Turn | {{n:ex.pot.after-pot-call}} | {{n:geo.ex.turn}} | {{n:geo.ex.turn-after}} |
| River | {{n:geo.ex.turn-after}} | {{n:geo.ex.river}} | {{n:geo.ex.river-after}} |

Jeder Spieler hat {{n:geo.ex.total}} eingezahlt, also {{n:spr.zone.deep}} {{t:pot|Pots}}. Drei {{t:bet|Bets}} in Höhe des {{t:pot|Pots}} bringen also genau bei {{t:spr}} {{n:spr.zone.deep}} das All-in. Daher kommt die Schwelle der höchsten {{t:spr}}-Zone aus der ersten Lektion.

## Die Formel

Geometrisches Sizing heißt: derselbe Anteil f des {{t:pot|Pots}} auf jeder {{t:street}}, so gewählt, dass die letzte {{t:bet}} ein All-in ist. Für n {{t:street|Streets}}:

```formula
(1 + 2f)^n = 1 + 2·SPR
```

Beispiel: Bei {{t:spr}} {{n:geo.half.spr}} bringen drei {{t:bet|Bets}} über den halben {{t:pot}} den ganzen Stack ein: {{n:ex.bet.half}}, {{n:geo.half.turn}} und {{n:geo.half.river}}, zusammen {{n:geo.half.total}} bei einem {{t:pot}} von {{n:ex.pot}}.

## Größen für typische {{t:pot|Pots}}

| {{t:pot}} | {{t:spr}} | Drei {{t:street|Streets}} | Zwei {{t:street|Streets}} |
|---|---|---|---|
| {{t:open|Eröffnung}} und {{t:call}} | {{n:spr.srp}} | {{n:geo.srp.3}} {{t:pot}} | – |
| 3-Bet {{t:in-position}} | {{n:spr.3bet-ip}} | {{n:geo.3bet-ip.3}} {{t:pot}} | – |
| 3-Bet aus dem {{t:big-blind}} | {{n:spr.3bet-oop}} | {{n:geo.3bet-oop.3}} {{t:pot}} | – |
| 4-Bet | {{n:spr.4bet}} | {{n:geo.4bet.3}} {{t:pot}} | {{n:geo.4bet.2}} {{t:pot}} |

Im 3-Bet-{{t:pot}} {{t:in-position}} sind das {{t:bet|Bets}} von {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} und {{n:geo.3bet-ip.river}}, zusammen {{n:geo.3bet-ip.total}}, also der ganze Stack.

## Ein {{t:pot}} mit einem Raise ist tief

Bei {{t:spr}} ca. {{n:spr.srp}} bringen drei {{t:bet|Bets}} über den halben {{t:pot}} nur {{n:srp.half.total}} ein und drei {{t:bet|Bets}} in Höhe des {{t:pot|Pots}} {{n:srp.potbet.total}} von einem Stack von {{n:spr.srp.stack}}. Der ganze Stack geht erst mit {{t:bet|Bets}} rein, die größer sind als der {{t:pot}}. Deshalb wird in einem solchen {{t:pot}} vor allem mit sehr starken Händen um den ganzen Stack gespielt.

:::note Wann das nützlich ist
Geometrisches Sizing ist nützlich, wenn du den ganzen Stack bis zum River einzahlen willst, also mit einer sehr starken Hand. Nicht jede Hand will um den ganzen Stack spielen: Wie viele {{t:value|Value-Streets}} eine Hand verträgt, ist Thema der nächsten Lektion. Die Formel ist reine Mathematik. Frühere Module geben Größen an, die zur {{t:texture}} des Flops passen; geometrisches Sizing ist ein Bezugspunkt für einen Plan um den ganzen Stack.
:::
