---
id: m9.l2
module: m9
order: 2
title: "Commitment"
sub: "Wenn du um den ganzen Stack spielst"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: Im {{t:pot|Pot}} sind {{n:ex.pot}}, die Stacks betragen je {{n:commit.stack}}. Du setzt den ganzen {{t:pot|Pot}} ({{n:ex.bet.pot}}), dein Gegner geht all-in. Du musst {{n:commit.after-pot.call}} nachzahlen. Wie viel Equity brauchst du für einen {{t:call|Call}}? Gib die Zahl in Prozent ein."
    answer: eq.commit.after-pot
    explanation: "Vor dem Überschuss deines Gegners liegen im {{t:pot|Pot}} {{n:ex.pot.after-pot-call}} (der {{t:pot|Pot}}, deine {{t:bet|Bet}} und sein Ausgleich). Du zahlst {{n:commit.after-pot.call}} nach, also benötigte Equity = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}. Nach so einer {{t:bet|Bet}} bist du committed: Ein {{t:fold|Fold}} lohnt sich meist nicht."
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: Im {{t:pot|Pot}} sind {{n:ex.pot}}, die Stacks betragen je {{n:commit.stack}}. Du setzt einen halben {{t:pot|Pot}} ({{n:ex.bet.half}}), dein Gegner geht all-in. Du musst {{n:commit.after-half.call}} nachzahlen. Wie viel Equity brauchst du für einen {{t:call|Call}}? Gib die Zahl in Prozent ein."
    answer: eq.commit.after-half
    explanation: "Vor dem Überschuss deines Gegners liegen im {{t:pot|Pot}} {{n:ex.half.total}} (der {{t:pot|Pot}}, deine {{t:bet|Bet}} und sein Ausgleich). Du zahlst {{n:commit.after-half.call}} nach: {{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}. Weniger als bei einem sofortigen All-in ({{n:eq.jam.spr2}}), weil du einen Teil des Geldes schon investiert hast."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}. Du hast {{t:top-pair|Top Pair}}, setzt den ganzen {{t:pot|Pot}}, dein Gegner geht all-in. Für einen {{t:call|Call}} brauchst du {{n:eq.commit.after-pot}} Equity. Was tust du?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "Ich {{t:call|calle}}", correct: true, why: "Ja: Der Preis ist sehr gut. Bei niedriger {{t:spr}} geht dein Gegner auch mit {{t:draw|Draws}} und schwächeren Damen all-in, also hat {{t:top-pair|Top Pair}} mit Ass meist viel mehr als {{n:eq.commit.after-pot}} Equity. Deutlich verliert es nur gegen {{t:two-pair|zwei Paare}} und Sets." }
      - { text: "Ich {{t:fold|folde}}, weil das All-in eine starke Hand zeigt", why: "Ein {{t:fold|Fold}} gibt einen {{t:pot|Pot}} auf, in den du schon viel investiert hast. Du musst nur einmal von fünf gewinnen, also in {{n:eq.commit.after-pot}} der Fälle. Wenn du hier {{t:fold|folden}} wolltest, hättest du besser nicht den ganzen {{t:pot|Pot}} gesetzt." }
      - { text: "Ich {{t:fold|folde}}, weil die {{t:spr}} niedrig ist", why: "Eine niedrige {{t:spr}} wirkt umgekehrt: Mit ihr ist es leichter, um den ganzen Stack zu spielen, weil der Preis für das All-in besser ist." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "Nach deiner {{t:bet|Bet}} hättest du weniger im Stack übrig, als der {{t:pot|Pot}} betragen wird, nachdem sie {{t:call|gecallt}} wurde. Welcher Plan ergibt keinen Sinn?"
    options:
      - { text: "{{t:bet|Bet}} und {{t:fold|Fold}}, wenn dein Gegner all-in geht", correct: true, why: "Ja, dieser Plan ist ein Fehler: Nach so einer {{t:bet|Bet}} brauchst du sehr wenig Equity, um das All-in zu {{t:call|callen}} (bei {{t:spr}} {{n:spr.commit}} und einer {{t:bet|Bet}} in Höhe des {{t:pot|Pots}} nur {{n:eq.commit.after-pot}}). Wenn du trotzdem {{t:fold|foldest}}, verschenkt die {{t:bet|Bet}} nur {{t:chips|Chips}}." }
      - { text: "Sofort all-in", why: "Das ist ein vernünftiger Plan mit einer starken Hand: Du spielst ohnehin um den ganzen Stack, also bringst du ihn gleich rein." }
      - { text: "{{t:check|Check}}", why: "Auch vernünftig, wenn du nicht um den ganzen Stack spielen willst: Du investierst kein Geld, mit dem dir ein {{t:fold|Fold}} später schwerfallen würde." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pot}} nach einer 4-Bet, {{t:spr}} ca. {{n:spr.4bet}}. Du hast {{t:top-pair|Top Pair}} mit dem besten Kicker getroffen. Welcher Plan?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "Ich spiele um den ganzen Stack", correct: true, why: "Ja: Bei {{t:spr}} ca. {{n:spr.4bet}} brauchst du für ein All-in nur ca. {{n:eq.jam.4bet}} Equity, und {{t:top-pair|Top Pair}} mit Ass ist hier sehr stark. Du setzt oder {{t:call|callst}} mit dem Plan, alles reinzubringen." }
      - { text: "Ich spiele vorsichtig und {{t:fold|folde}} auf eine große {{t:bet|Bet}}", why: "Bei so niedriger {{t:spr}} gibt ein {{t:fold|Fold}} mit {{t:top-pair|Top Pair}} zu viel her. Nach einer 4-Bet hat dein Gegner auch AQ, QQ, JJ und andere Hände, die gegen deine verlieren." }
      - { text: "Ich setze klein und {{t:fold|folde}} auf ein All-in", why: "Das ist ein Plan aus {{t:bet|Bet}} und {{t:fold|Fold}} bei niedriger {{t:spr}}: Nach der {{t:bet|Bet}} wird der Preis für das All-in noch besser, und ein {{t:fold|Fold}} gibt einen {{t:pot|Pot}} auf, in den du schon investiert hast." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Warum spielt {{t:top-pair|Top Pair}} bei {{t:spr}} ca. {{n:spr.commit}} meist um den ganzen Stack?"
    options:
      - { text: "Weil du für ein All-in ca. {{n:eq.jam.spr2}} Equity brauchst und zwei {{t:bet|Bets}} von je ca. {{n:geo.spr2.2}} des {{t:pot|Pots}} den ganzen Stack reinbringen", correct: true, why: "Ja: Der Preis ist gut, und um den Stack reinzubringen, reichen zwei {{t:value|Value-Streets}}. So viel hält {{t:top-pair|Top Pair}} meist aus. Die Schwelle selbst ist eine Heuristik: Es zählt auch, womit dein Gegner spielt." }
      - { text: "Weil {{t:top-pair|Top Pair}} immer gewinnt", why: "Nicht immer: Manchmal hat dein Gegner {{t:two-pair|zwei Paare}} oder ein Set. Bei niedriger {{t:spr}} bringen schlechtere Hände und {{t:draw|Draws}} aber genug Geld rein, und der Preis ist gut." }
      - { text: "Weil die Regeln bei {{t:spr}} {{n:spr.commit}} keinen {{t:fold|Fold}} erlauben", why: "{{t:fold|Folden}} kannst du immer. Es geht darum, dass ein {{t:fold|Fold}} meist mehr kostet, als er bringt: Für ein All-in brauchst du nur ca. {{n:eq.jam.spr2}} Equity." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "{{t:pot|Pot}} mit einem Raise, Stacks von je {{n:format.stack}}, {{t:spr}} ca. {{n:spr.srp}}. Du hast {{t:top-pair|Top Pair}} mit gutem Kicker getroffen. Wie behandelst du diese Hand?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "Als Value-Hand, aber meist nicht für den ganzen Stack", correct: true, why: "Ja: Bei {{t:spr}} ca. {{n:spr.srp}} geht der ganze Stack erst nach mehreren {{t:bet|Bets}} rein, die größer sind als der {{t:pot|Pot}}. Ein Gegner, der so viel investiert, hat selten eine schlechtere Hand als ein {{t:pair|Paar}}." }
      - { text: "Ich spiele um den ganzen Stack, weil {{t:top-pair|Top Pair}} stark ist", why: "Bei {{t:spr}} {{n:spr.commit}} ja, aber hier liegt die {{t:spr}} bei ca. {{n:spr.srp}}. Wenn der ganze Stack im {{t:pot|Pot}} ist, hat dein Gegner meist {{t:two-pair|zwei Paare}}, ein Set oder ein besseres {{t:pair|Paar}}." }
      - { text: "Ich {{t:fold|folde}} auf die erste {{t:bet|Bet}} meines Gegners", why: "Zu vorsichtig: {{t:top-pair|Top Pair}} mit gutem Kicker ist auf diesem Flop eine starke Hand. Es geht darum, mit ihr keinen {{t:pot|Pot}} um den ganzen Stack aufzubauen, nicht um einen {{t:fold|Fold}}." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pot}} nach einer 4-Bet, {{t:spr}} ca. {{n:spr.4bet}}. Du hast ein {{t:pair|Paar}} Buben, und auf dem Flop liegen ein Ass und ein König. Dein Gegner geht all-in. Was ist mit der Regel „bei niedriger {{t:spr}} spiele ich um den Stack“?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "Sie gilt nicht für diese Hand: Es ist ein {{t:pair|Paar}}, das niedriger ist als beide hohen Karten auf dem {{t:board|Board}}", correct: true, why: "Ja: Die Regel betrifft {{t:top-pair|Top Pair}} und bessere Hände. Nach einer 4-Bet hat dein Gegner oft ein Ass oder einen König, und deine Buben verlieren gegen jedes {{t:pair|Paar}} mit einer hohen Karte. Hier {{t:fold|foldest}} du öfter, trotz des guten Preises ({{n:eq.jam.4bet}})." }
      - { text: "Sie gilt: Bei niedriger {{t:spr}} {{t:call|calle}} ich mit allem", why: "Eine niedrige {{t:spr}} gibt einen guten Preis, macht aber aus einer schwachen Hand keine starke. Wenn dein Gegner oft ein besseres {{t:pair|Paar}} hat, können selbst {{n:eq.jam.4bet}} Equity zu viel sein." }
      - { text: "Sie gilt, aber nur, wenn ich {{t:position|Position}} habe", why: "{{t:position|Position}} ändert nichts daran, womit du spielst. Die Regel betrifft {{t:top-pair|Top Pair}} und bessere Hände." }
---
Commitment (etwa: Festgelegtsein) ist eine Situation, in der im {{t:pot|Pot}} im Verhältnis zu deinem Stack schon so viel Geld liegt, dass sich ein {{t:fold|Fold}} auf ein All-in fast nie lohnt. Die {{t:spr}} aus der vorigen Lektion zeigt dir, wie nah du daran schon zu Beginn des Flops bist.

## Nach einer {{t:bet|Bet}} ist der Preis noch besser

Beispiel: {{t:spr}} {{n:spr.commit}}, im {{t:pot|Pot}} {{n:ex.pot}}, Stacks von je {{n:commit.stack}}. Wenn dein Gegner sofort all-in geht, brauchst du {{n:eq.jam.spr2}} Equity. Wenn du zuerst setzt, brauchst du weniger:

| Deine {{t:bet|Bet}} vor dem All-in des Gegners | Nachzahlung | Benötigte Equity |
|---|---|---|
| Keine (Gegner sofort all-in) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| Halber {{t:pot|Pot}} ({{n:ex.bet.half}}) | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| Ganzer {{t:pot|Pot}} ({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## Plane nicht {{t:bet|Bet}} und {{t:fold|Fold}}

Wenn du nach deiner {{t:bet|Bet}} weniger im Stack übrig hättest, als der {{t:pot|Pot}} betragen wird, nachdem sie {{t:call|gecallt}} wurde, ergeben {{t:bet|Bet}} und {{t:fold|Fold}} auf ein All-in meist keinen Sinn: Um das All-in zu {{t:call|callen}}, brauchst du dann weniger Equity als für den {{t:call|Call}} einer {{t:bet|Bet}} in Höhe des {{t:pot|Pots}} ({{n:eq.bet-pot}}). Du hast zwei vernünftige Wege: Du spielst um den ganzen Stack (du setzt oder gehst all-in) oder du {{t:check|checkst}}.

## Niedrige {{t:spr}}: {{t:top-pair|Top Pair}} spielt um den Stack

Regel: **Bei einer {{t:spr}} auf dem Flop unter ca. {{n:spr.zone.low}} spielen {{t:top-pair|Top Pair}} und bessere Hände meist um den ganzen Stack** (die Zonen der {{t:spr}} aus der vorigen Lektion). Das Beispiel mit {{t:spr}} {{n:spr.commit}} liegt in dieser Zone, und die Rechnung dort stützt die Regel:

- für ein All-in brauchst du höchstens ca. {{n:eq.jam.spr2}} Equity, nach deiner eigenen {{t:bet|Bet}} noch weniger,
- zwei {{t:bet|Bets}} von je ca. {{n:geo.spr2.2}} des {{t:pot|Pots}} bringen den ganzen Stack rein: Bei einem {{t:pot|Pot}} von {{n:ex.pot}} sind das {{n:geo.spr2.flop}} am Flop und {{n:geo.spr2.turn}} am Turn, zusammen {{n:geo.spr2.total}},
- {{t:top-pair|Top Pair}} hält meist zwei {{t:value|Value-Streets}} aus (Lektion zum Plan für drei {{t:street|Streets}}).

Die Rechnung legt aber keine genaue Schwelle fest. Ob {{t:top-pair|Top Pair}} genug Equity hat, hängt davon ab, womit dein Gegner spielt. Deshalb ist das eine Heuristik und kein festes Gesetz. Die Regel betrifft {{t:top-pair|Top Pair}} und bessere Hände: Ein {{t:pair|Paar}}, das niedriger ist als die hohen Karten auf dem {{t:board|Board}}, erfüllt sie nicht.

## Hohe {{t:spr}}: ein {{t:pair|Paar}} vorsichtiger spielen

In einem {{t:pot|Pot}} mit einem Raise liegt die {{t:spr}} bei ca. {{n:spr.srp}}. Um den ganzen Stack bis zum River reinzubringen, müsstest du auf jeder {{t:street|Street}} mehr als den {{t:pot|Pot}} setzen (Lektion zum geometrischen Sizing). Ein Gegner, der so viel Geld investiert, hat selten eine schlechtere Hand als ein {{t:pair|Paar}}. Deshalb spielst du mit einem {{t:pair|Paar}} in so einem {{t:pot|Pot}} auf Value, planst aber meist nicht, um den ganzen Stack zu spielen.

:::note Woher diese Regeln kommen
Die Grenze von ca. {{n:spr.zone.low}} stammt aus Trainingsmaterialien und einer veröffentlichten Solver-Analyse (bei {{t:spr}} ca. {{n:spr.commit}} spielt jedes {{t:top-pair|Top Pair}} und jede bessere Hand um den Stack). Die Vorsicht mit einem {{t:pair|Paar}} bei hoher {{t:spr}} bestätigen Trainingsmaterialien und Solver-Analysen. Die Zahlen zu Preis und Größen in dieser Lektion sind reine Mathematik.
:::
