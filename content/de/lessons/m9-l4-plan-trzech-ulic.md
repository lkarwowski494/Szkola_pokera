---
id: m9.l4
module: m9
order: 4
title: "Ein Plan für drei Streets"
sub: "Wie viele Value-Streets eine Hand verträgt"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}}. Du hast auf einem {{t:dry|trockenen}} Flop ein Set getroffen. Wie viele {{t:value|Value-Streets}} verträgt diese Hand?"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "Drei", correct: true, why: "Ein Set auf einem {{t:dry|trockenen}} Flop ist fast immer die beste Hand. Auf jeder {{t:street|Street}} können schlechtere Hände des Gegners (z. B. ein König, eine Sieben, ein {{t:pair}}) noch zahlen, also planst du eine {{t:bet}} auf Flop, Turn und River." }
      - { text: "Eine", why: "Zu wenig: Mit einer so starken Hand lässt eine einzelne {{t:bet}} den Großteil des Werts auf dem {{t:board|Board}} liegen. Ein Gegner mit einem König zahlt mehr als einmal." }
      - { text: "Keine: Ich {{t:check|checke}}, um den Gegner nicht zu verscheuchen", why: "{{t:check|Checken}} auf allen {{t:street|Streets}} baut keinen {{t:pot|Pot}} auf. Ein Set will, dass der {{t:pot}} wächst, weil es meist im Showdown gewinnt." }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}}, {{t:spr}} ca. {{n:spr.srp}}. Du hast {{t:top-pair|Top Pair}} mit dem besten Kicker. Welcher Plan?"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Meist zwei {{t:value|Value-Streets}}, ohne Plan, um den ganzen Stack zu spielen", correct: true, why: "Ja: Schlechtere Könige und Achten zahlen meist einen oder zwei {{t:bet|Einsätze}}. Wenn sehr viel Geld im {{t:pot|Pot}} liegt, zahlen vor allem Hände, die besser als ein {{t:pair|Paar}} sind. Bei {{t:spr}} ca. {{n:spr.srp}} ginge der ganze Stack erst mit {{t:bet|Einsätzen}} rein, die größer als der {{t:pot}} sind." }
      - { text: "Drei {{t:street|Streets}} mit großen {{t:bet|Einsätzen}} bis zum All-in", why: "Bei {{t:spr}} ca. {{n:spr.srp}} sind das {{t:bet|Einsätze}} von ca. {{n:geo.srp.3}} des {{t:pot|Pots}} auf jeder {{t:street|Street}}. Bis zum River bleiben im {{t:pot|Pot}} vor allem {{t:two-pair}} und Sets, die ein einzelnes {{t:pair|Paar}} schlagen." }
      - { text: "Eine {{t:street}} oder keine", why: "Zu vorsichtig: {{t:top-pair}} mit dem besten Kicker auf einem {{t:dry|trockenen}} Flop schlägt viele Hände des Gegners. Die Hand verträgt meist zwei {{t:value|Value-Streets}}." }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "Du hast vom Button {{t:open|eröffnet}}, der {{t:big-blind}} hat {{t:call|gecallt}}. Du hast ein mittleres {{t:pair|Paar}}. Wie viele {{t:value|Value-Streets}} verträgt diese Hand?"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Eine oder keine: Oft reicht es, zum Showdown zu kommen", correct: true, why: "Ja: Ein mittleres {{t:pair}} schlägt {{t:bluff|Bluffs}} und schwächere {{t:pair|Paare}}, aber es gibt nur wenige schlechtere Hände, die mehrere {{t:bet|Einsätze}} zahlen. Plan: höchstens eine kleine {{t:bet}} oder {{t:check}} und {{t:call|Callen}}." }
      - { text: "Zwei, wie {{t:top-pair}}", why: "Ein mittleres {{t:pair}} verliert gegen jeden König. Nach dem zweiten {{t:bet|Einsatz}} zahlen vor allem Hände, die es schlagen." }
      - { text: "Drei, damit der Gegner nicht trifft", why: "Drei {{t:bet|Einsätze}} mit einem mittleren {{t:pair|Paar}} gehen vor allem an bessere Hände: Schlechtere Hände {{t:fold|folden}} schon nach dem ersten oder zweiten {{t:bet|Einsatz}}." }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "{{t:pot|Pot}} nach einer 4-Bet, {{t:spr}} ca. {{n:spr.4bet}}. Du hast {{t:top-pair|Top Pair}} mit dem besten Kicker. Die Hand verträgt zwei {{t:value|Value-Streets}}. Welcher Plan?"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "Zwei {{t:bet|Einsätze}} von je ca. {{n:geo.4bet.2}} des {{t:pot|Pots}}: Am Turn geht der ganze Stack rein", correct: true, why: "Ja: Bei {{t:spr}} ca. {{n:spr.4bet}} reichen zwei {{t:street|Streets}}, um den ganzen Stack einzuzahlen. Zwei {{t:value|Value-Streets}} mit {{t:top-pair|Top Pair}} bedeuten hier das Spiel um den ganzen Stack." }
      - { text: "Kleine {{t:bet}} und {{t:fold}} gegen ein All-in", why: "Bei {{t:spr}} ca. {{n:spr.4bet}} gibt ein {{t:fold}} gegen ein All-in mit {{t:top-pair|Top Pair}} und Ass zu viel her: Dir reichen ca. {{n:eq.jam.4bet}} Equity, nach deinem eigenen {{t:bet|Einsatz}} sogar noch weniger." }
      - { text: "Ich {{t:check|checke}} auf jeder {{t:street|Street}}, um den {{t:pot|Pot}} zu kontrollieren", why: "Kontrolle über den {{t:pot|Pot}} ist bei hoher {{t:spr}} sinnvoll. Hier ist der {{t:pot}} im Verhältnis zum Stack schon groß, und schlechtere Hände (AQ, QQ, JJ) zahlen den Rest gern ein." }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "{{t:pot|Pot}} nach einer 3-Bet, du hast {{t:position}}, {{t:spr}} ca. {{n:spr.3bet-ip}}. Du hast ein Set und willst bis zum River den ganzen Stack einzahlen. Welche Linie?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "{{t:bet|Einsatz}} auf Flop, Turn und River, jedes Mal ca. {{n:geo.3bet-ip.3}} des {{t:pot|Pots}}", correct: true, why: "Ja: {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} und {{n:geo.3bet-ip.river}} ergeben zusammen {{n:geo.3bet-ip.total}}, also den ganzen Stack. Der Gegner zahlt auf jeder {{t:street|Street}} einen vernünftigen Teil des {{t:pot|Pots}}." }
      - { text: "{{t:bet|Einsatz}} von 1/3 {{t:pot|Pot}} auf jeder {{t:street|Street}}", sizeError: true, why: "Gute Linie, falsche Größe: Drei {{t:bet|Einsätze}} von je 1/3 {{t:pot|Pot}} bringen nur ca. {{n:g3b.third.total}} von {{n:spr.3bet-ip.stack}} rein. Ein Plan für den ganzen Stack braucht ca. {{n:geo.3bet-ip.3}} des {{t:pot|Pots}}." }
      - { text: "Ich {{t:check|checke}} Flop und Turn, am River All-in", why: "Am River wäre ein All-in mit dem ganzen Stack ein {{t:bet|Einsatz}}, der um ein Mehrfaches größer ist als der {{t:pot}}. Der Gegner zahlt ihn nur mit einer sehr starken Hand, und schlechtere Hände, die drei kleinere {{t:bet|Einsätze}} bezahlt hätten, {{t:fold|folden}}." }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "Warum lohnt es sich, den Plan für drei {{t:street|Streets}} schon am Flop festzulegen?"
    options:
      - { text: "Weil die Größe am Flop bestimmt, wie viel du später einzahlen kannst", correct: true, why: "Ja: Der {{t:pot}} wächst multiplikativ. Eine kleine {{t:bet}} am Flop lässt einen kleinen {{t:pot|Pot}} für Turn und River, sodass es später schwer ist, den ganzen Stack ohne sehr große {{t:bet|Einsätze}} einzuzahlen." }
      - { text: "Weil man den Plan später nicht ändern darf", why: "Du änderst den Plan, wenn sich die Situation ändert (z. B. eine gefährliche Karte am Turn). Es geht darum, dass die erste {{t:bet}} zum Ziel passt: wie viele {{t:value|Value-Streets}} und ob es um den ganzen Stack geht." }
      - { text: "Weil der Gegner deinen Plan sieht", why: "Der Gegner kennt deinen Plan nicht. Der Plan hilft dir, die Größe so zu wählen, dass am Ende so viel im {{t:pot|Pot}} liegt, wie die Hand verträgt." }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "{{t:pot|Pot}} mit einem Raise, {{t:spr}} ca. {{n:spr.srp}}. Du hast {{t:top-pair|Top Pair}} mit einem guten Kicker. Setzt du mit geometrischem Sizing von ca. {{n:geo.srp.3}} des {{t:pot|Pots}}?"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "Nein: Das ist eine Größe für den ganzen Stack, und diese Hand verträgt meist zwei {{t:street|Streets}}", correct: true, why: "Richtig: Geometrisches Sizing dient dazu, den ganzen Stack einzuzahlen. Bei {{t:bet|Einsätzen}}, die größer als der {{t:pot}} sind, hören schlechtere Hände auf zu zahlen, und es bleiben Hände, die besser als ein {{t:pair|Paar}} sind." }
      - { text: "Ja: Ich setze immer geometrisch", why: "Geometrisches Sizing passt zu einem Plan für den ganzen Stack. {{t:top-pair|Top Pair}} hat bei {{t:spr}} ca. {{n:spr.srp}} meist keinen solchen Plan." }
      - { text: "Nein: Mit {{t:top-pair|Top Pair}} {{t:check|checke}} ich immer", why: "{{t:top-pair|Top Pair}} will {{t:bet|Einsätze}} auf Value, nur kleinere und meist über zwei {{t:street|Streets}}, nicht um den ganzen Stack." }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr}} {{n:spr.commit}}: Im {{t:pot|Pot}} liegen {{n:ex.pot}}, die Stacks betragen je {{n:commit.stack}}. Du setzt am Flop und am Turn je ca. {{n:geo.spr2.2}} des {{t:pot|Pots}}, der Gegner {{t:call|callt}}. Was ist mit dem Rest des Stacks?"
    options:
      - { text: "Nach dem Turn ist der ganze Stack im {{t:pot|Pot}}", correct: true, why: "Ja: {{n:geo.spr2.flop}} am Flop und {{n:geo.spr2.turn}} am Turn ergeben zusammen {{n:geo.spr2.total}}. Deshalb reichen bei {{t:spr}} {{n:spr.commit}} zwei {{t:value|Value-Streets}} mit {{t:top-pair|Top Pair}} für das Spiel um den ganzen Stack." }
      - { text: "Etwa die Hälfte bleibt für den River", why: "Der {{t:pot|Pot}} wächst multiplikativ: Nach dem Flop liegen darin ca. {{n:geo.spr2.flop-after}}, und eine {{t:bet}} von ca. {{n:geo.spr2.2}} am Turn sind ca. {{n:geo.spr2.turn}}, also der Rest des Stacks." }
      - { text: "Fast der ganze Stack bleibt übrig", why: "Bei {{t:spr}} {{n:spr.commit}} entspricht der Stack nur {{n:spr.commit}} {{t:pot|Pots}}. Zwei {{t:bet|Einsätze}} von je ca. {{n:geo.spr2.2}} des {{t:pot|Pots}} zahlen die vollen {{n:geo.spr2.total}} ein." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Ein guter Plan beginnt am Flop, bevor du die erste {{t:bet}} {{t:bet|setzt}}. Du fragst dich: Wie viele {{t:value|Value-Streets}} verträgt meine Hand, und will ich um den ganzen Stack spielen? Die Antwort verbindet die Stärke der Hand mit der {{t:spr}}.

## Wie viele {{t:value|Value-Streets}}

Mit jeder {{t:street|Street}} {{t:fold|folden}} schlechtere Hände des Gegners, und im {{t:pot|Pot}} bleiben vor allem Hände, die besser sind als deine. Deshalb verträgt eine stärkere Hand mehr {{t:bet|Einsätze}}:

| Hand | {{t:value|Value-Streets}} (meist) |
|---|---|
| Sehr stark: Set, {{t:straight}}, hohe {{t:two-pair}} | Drei |
| {{t:top-pair|Top Pair}} mit gutem Kicker, {{t:overpair}} | Zwei; eine dritte, wenn der Gegner mit schwächeren Händen zahlt |
| Schwächeres {{t:pair}} (mittleres, niedriges) | Eine oder keine |

Die Zahl der {{t:street|Streets}} in der Tabelle ist eine Vereinfachung: Viel hängt von der {{t:texture|Textur}} des {{t:board|Boards}}, den Karten am Turn und River sowie vom Gegner ab.

## Verbinde die Hand mit der {{t:spr}}

- **Hand für drei {{t:street|Streets}}, {{t:spr}} liegt in der Zone fürs Spiel um den Stack, und du willst den ganzen Stack:** Du setzt ab dem Flop mit geometrischem Sizing (im {{t:pot|Pot}} nach einer 3-Bet {{t:in-position}} ca. {{n:geo.3bet-ip.3}} des {{t:pot|Pots}}).
- **Hand für zwei {{t:street|Streets}} bei niedriger {{t:spr}}:** Bei {{t:spr}} ca. {{n:spr.commit}} sind zwei {{t:bet|Einsätze}} von je ca. {{n:geo.spr2.2}} des {{t:pot|Pots}} schon der ganze Stack, also spielst du um den Stack.
- **Hand für zwei {{t:street|Streets}} bei hoher {{t:spr}}:** Im {{t:pot|Pot}} mit einem Raise ({{t:spr}} ca. {{n:spr.srp}}) setzt du auf Value, planst aber nicht den ganzen Stack ein.

Drei {{t:value|Value-Streets}} sind nicht dasselbe wie das Spiel um den ganzen Stack. Hohe {{t:two-pair}} vertragen drei {{t:street|Streets}}, spielen aber im {{t:pot|Pot}} mit einem Raise ({{t:spr}} ca. {{n:spr.srp}}, über {{n:spr.zone.deep}}) meist nicht um den ganzen Stack: In dieser Zone spielen Set, {{t:straight}} und bessere Hände um den Stack (Zonen der {{t:spr}} aus der ersten Lektion).

## Linien

Eine Linie ist ein Plan der Aktionen auf den folgenden {{t:street|Streets}}. Einige grundlegende:

- **{{t:bet}}, {{t:bet}}, {{t:bet}}:** Hand für drei {{t:value|Value-Streets}},
- **{{t:bet}}, {{t:bet}}, {{t:check}}:** Hand für zwei {{t:street|Streets}}, am River gehst du zum Showdown,
- **{{t:bet}} oder {{t:check}}, dann {{t:check}} und {{t:call|Callen}}:** schwächeres {{t:pair}}, das billig zum Showdown kommen will.

## Die Größe am Flop bestimmt den Rest

Der {{t:pot|Pot}} wächst multiplikativ, also lässt eine kleine {{t:bet}} am Flop einen kleinen {{t:pot|Pot}} für die folgenden {{t:street|Streets}}. Im {{t:pot|Pot}} nach einer 3-Bet bringen drei {{t:bet|Einsätze}} von je 1/3 {{t:pot|Pot}} nur ca. {{n:g3b.third.total}} eines Stacks von {{n:spr.3bet-ip.stack}} rein, drei {{t:bet|Einsätze}} von je ca. {{n:geo.3bet-ip.3}} des {{t:pot|Pots}} dagegen den ganzen Stack.

:::note Ein Plan ist nicht in Stein gemeißelt
Am Turn und River bewertest du den Plan neu: Eine gefährliche Karte kann die Zahl der {{t:value|Value-Streets}} verringern. Wie man Turn und River spielt, lernst du in den Modulen M7 und M8. Die Zahl der {{t:value|Value-Streets}} für Handklassen ist eine Heuristik, eine Synthese aus mehreren Trainingsmaterialien: Im {{t:pot|Pot}} mit einem Raise ist die {{t:spr}} zu hoch, als dass viele {{t:top-pair|Top Pairs}} bequem drei {{t:value|Value-Streets}} einsammeln könnten.
:::
