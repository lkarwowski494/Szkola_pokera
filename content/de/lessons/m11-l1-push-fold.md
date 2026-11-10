---
id: m11.l1
module: m11
order: 1
title: "Kurzer Stack: All-in oder Fold"
sub: "Wenn aus einer Erhöhung ein All-in wird"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|Turnier}}. Du hast {{n:m11.depth.10}}, alle vor dir haben {{t:fold|gefoldet}}. Welcher Spielplan ist einfach und in den Quellen bewährt?"
    options:
      - { text: "All-in oder {{t:fold}}", correct: true, why: "Bei etwa {{n:m11.thr.pushfold}} oder weniger empfehlen die Quellen übereinstimmend Push/Fold. Eine Erhöhung und ein {{t:fold|Fold}} nach einem {{t:raise|Raise}} würden zu viel vom Stack hergeben, während ein All-in aus ihm die meisten {{t:fold|Folds}} des Gegners herausholt." }
      - { text: "Erhöhung auf {{n:pf.open-size}}, nach einem {{t:raise|Raise}} entscheiden", why: "Nach so einer Erhöhung bleibt dir hinter dem {{t:pot|Pot}} nur wenig, sodass du gegen einen All-in-{{t:raise|Raise}} ohnehin fast gezwungen bist zu {{t:call|callen}}. Der Gegner muss nicht {{t:fold|folden}}, und du verlierst Fold Equity." }
      - { text: "Ich {{t:call|calle}} den Blind (Limp) und schaue mir den Flop an", why: "Ein Limp gibt dir keine Chance, den {{t:pot|Pot}} sofort zu gewinnen. Solver mit voller Aktionsauswahl limpen manchmal, aber das ist eine Strategie für Fortgeschrittene; der einfache und sichere Plan ist All-in oder {{t:fold}}." }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "Du hast {{n:m11.thr.raise}} oder mehr und {{t:open|eröffnest}} als Erster. Was machst du mit einer Hand, die du spielen willst?"
    options:
      - { text: "Meist erhöhe ich (z. B. minimal)", correct: true, why: "Über etwa {{n:m11.thr.raise}} empfehlen die Quellen eine normale Erhöhung: Du hast noch Spielraum, um auf einen {{t:raise|Raise}} zu {{t:fold|folden}} oder nach dem Flop zu spielen." }
      - { text: "Immer All-in", why: "Ein All-in mit so großem Stack riskiert viel, um nur die Blinds zu gewinnen. Schwächere Hände {{t:fold|folden}}, bessere bezahlen dich." }
      - { text: "Push/Fold wie bei {{n:m11.thr.pushfold}}", why: "Push/Fold ist ein Werkzeug für den {{t:short-stack|Short Stack}}: bis etwa {{n:m11.thr.pushfold}}, für schwächere Hände bis etwa {{n:m11.thr.upper}}." }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "Du hast {{n:m11.m.stack}} {{t:chips|Chips}}. Die Blinds sind {{n:m11.m.sb}}/{{n:m11.m.bb}}, und der {{t:big-blind}} zahlt zusätzlich ein Ante von {{n:m11.m.ante}}. Wie hoch ist dein M?"
    answer: m11.m.value
    explanation: "M = Stack ÷ ({{t:small-blind}} + {{t:big-blind}} + Ante) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}. So viele Runden überstehst du, ohne zu spielen. In {{t:big-blind|Big Blinds}} sind das {{n:m11.m.bbs}}, aber M zählt auch das Ante mit."
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "Dein M ist auf etwa {{n:m11.m.example}} gefallen. Was sagt das Modell der M-Zonen dazu?"
    options:
      - { text: "{{t:red-zone|Rote Zone}}: nur All-in oder {{t:fold}}, am besten als Erster", correct: true, why: "Bei einem M von etwa {{n:m11.m.red}} und darunter bleibt dir nur All-in oder {{t:fold}}. Wenn du als Erster einsteigst, hast du die Chance, dass alle {{t:fold|folden}}." }
      - { text: "{{t:green-zone|Grüne Zone}}: Du spielst normal", why: "Die {{t:green-zone|grüne Zone}}, in der dein Stack freies Spiel erlaubt, beginnt erst bei einem M von etwa {{n:m11.m.green}}. Bei einem M von etwa {{n:m11.m.example}} reicht der Stack für {{n:m11.m.example}} Runden." }
      - { text: "Du wartest auf Asse, du hast ja ohnehin Zeit", why: "Bei einem M von etwa {{n:m11.m.example}} fressen die Blinds deinen Stack auf, bevor du eine starke Hand bekommst. Du musst mit einer breiteren {{t:range|Range}} All-in gehen." }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 3
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "Du hast {{n:m11.depth.10}} im {{t:small-blind|Small Blind}}, alle haben {{t:fold|gefoldet}}. Male die Hände an, mit denen du All-in gehst."
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|Small Blind}}, alle haben {{t:fold|gefoldet}}, du hast K2o. Bei {{n:m11.depth.10}} geht der Solver mit dieser Hand All-in. Und bei {{n:m11.depth.15}}?"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "Bei {{n:m11.depth.15}} riskierst du im Verhältnis zu den Blinds mehr, deshalb wird die All-in-{{t:range|Range}} von etwa {{n:m11.push.10}} auf etwa {{n:m11.push.15}} der Hände enger. K2o fällt heraus." }
      - { text: "All-in, weil ein König eine starke Karte ist", why: "Bei {{n:m11.depth.15}} trifft K2o zu oft auf einen besseren König oder ein Ass in der {{t:call|Call}}-{{t:range|Range}}. Der Solver {{t:fold|foldet}} sie." }
      - { text: "All-in, denn je tiefer der Stack, desto breiter", why: "Umgekehrt: Je tiefer der Stack, desto enger die All-in-{{t:range|Range}}. Am breitesten {{t:shove|pushst}} du mit einem sehr kleinen {{t:short-stack|Short Stack}}." }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|Small Blind}}, {{n:m11.depth.10}}, kein Ante. Wie oft von hundert Malen müsste der {{t:big-blind}} {{t:fold|folden}}, damit ein All-in mit einer Hand ganz ohne Chancen bei null herauskommt?"
    options:
      - { text: "Mehr als {{n:m11.push.10.alpha}}", correct: true, why: "Du riskierst {{n:m11.push.10.risk}}, um {{n:m11.push.10.win}} zu gewinnen: {{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}}) sind etwa {{n:m11.push.10.alpha}}. So oft {{t:fold|foldet}} der Gegner nicht, also lohnt sich ein All-in nur mit einer Hand, die auch Equity hat, wenn der Gegner {{t:call|callt}}." }
      - { text: "Mehr als die Hälfte", why: "Die Hälfte würde reichen, wenn du so viel riskieren würdest, wie du gewinnen kannst. Hier riskierst du {{n:m11.push.10.risk}} und gewinnst nur {{n:m11.push.10.win}} Blinds." }
      - { text: "Es reicht, wenn er manchmal {{t:fold|foldet}}", why: "Jeder {{t:call}} kostet eine Hand ohne Chancen den ganzen Stack. Ohne Equity brauchst du sehr häufige {{t:fold|Folds}}: mehr als {{n:m11.push.10.alpha}}." }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "Warum gehst du mit einem {{t:short-stack|Short Stack}} lieber als Erster All-in, statt zu warten, bis jemand anderes All-in geht, und dann zu {{t:call|callen}}?"
    options:
      - { text: "Weil ein All-in auf zwei Arten gewinnt", correct: true, why: "Gehst du als Erster rein, gewinnst du den {{t:pot|Pot}}, wenn alle {{t:fold|folden}}, oder du gewinnst im Showdown. Wenn du {{t:call|callst}}, gewinnst du nur im Showdown." }
      - { text: "Weil ein All-in immer mehr Equity hat", why: "Die Equity einer Hand hängt nicht davon ab, wer als Erster eingestiegen ist. Der Unterschied ist, dass ein All-in dem Gegner die Chance gibt zu {{t:fold|folden}}." }
      - { text: "Weil das {{t:call|Callen}} eines All-ins verboten ist", why: "{{t:call|Callen}} ist erlaubt, aber zum {{t:call|Callen}} brauchst du eine stärkere Hand (Lektion über das {{t:call|Callen}})." }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "Derselbe Stack von {{n:m11.depth.10}} im {{t:small-blind|Small Blind}}, aber gespielt wird mit {{t:bb-ante}}: Der {{t:big-blind}} hat ein Ante von {{n:m11.ante}} gezahlt. Wie verändert sich die All-in-{{t:range|Range}}?"
    options:
      - { text: "Sie wächst: etwa {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} statt {{n:m11.push.10}}", correct: true, why: "Das Ante vergrößert den {{t:pot|Pot}}, den du gewinnst, wenn der Gegner {{t:fold|foldet}}: {{n:m11.push.10.win-ante}} statt {{n:m11.push.10.win}}. Eine Hand ohne Chancen braucht nur noch mehr als {{n:m11.push.10.alpha-ante}} {{t:fold|Folds}}, also lohnen sich mehr All-ins." }
      - { text: "Sie schrumpft, weil der Gegner mehr im {{t:pot|Pot}} hat und öfter {{t:call|callt}}", why: "Der Gegner {{t:call|callt}} tatsächlich breiter, aber der größere {{t:pot|Pot}}, den es zu gewinnen gibt, wiegt schwerer. Das Gleichgewicht liegt bei etwa {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} der Hände." }
      - { text: "Sie ändert sich nicht", why: "Das Ante verändert das Verhältnis von Risiko zu Gewinn. Ohne Ante etwa {{n:m11.push.10}}, mit Ante etwa {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}." }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l1.g-push-3max
    family: m11.push.3max
    rules: [R-M11-011]
    generator: rangeDecision
    params: { spots: "push.btn-3max,push.sb-3max" }
    count: 2
---
Im {{t:tournament|Turnier}} steigen die Blinds, dein Stack aber nicht. Früher oder später hast du so wenig, dass eine normale Erhöhung nicht mehr funktioniert. Dann kommt die **Push/Fold**-Strategie ins Spiel: Mit jeder Hand, die du spielst, machst du einen {{t:shove|Push}}, gehst also All-in, und den Rest {{t:fold|foldest}} du.

## Wann All-in oder {{t:fold}}

Deinen Stack zählst du in {{t:big-blind|Big Blinds}}. In einem Punkt sind sich die Quellen einig: Bei etwa **{{n:m11.thr.pushfold}} oder weniger** spielst du fast nur noch All-in oder {{t:fold}}.

| Stack | Was du meistens tust |
|---|---|
| etwa {{n:m11.thr.pushfold}} oder weniger | All-in oder {{t:fold}} |
| von {{n:m11.thr.pushfold}} bis {{n:m11.thr.upper}} | Push/Fold für schwächere und mittlere Hände |
| mehr als etwa {{n:m11.thr.raise}} | normale Erhöhung |

Warum keine Erhöhung? Wenn du {{n:m11.depth.10}} hast und auf {{n:pf.open-size}} erhöhst, bleibt dir hinter dem {{t:pot|Pot}} so wenig, dass du gegen einen All-in-{{t:raise|Raise}} ohnehin fast {{t:call|callen}} musst. Der Gegner weiß, dass du nicht {{t:fold|foldest}}, und muss sich nicht fürchten. Ein sofortiges All-in holt aus dem Stack die meiste **Fold Equity** heraus, also den Gewinn daraus, dass der Gegner {{t:fold|foldet}}.

:::note Vereinfachung
Push/Fold ist eine Vereinfachung. Solver, die auch Limp und kleine Erhöhung zur Auswahl haben, limpen bei {{n:m11.depth.10}} einen Teil der Hände oder erhöhen minimal. All-in oder {{t:fold}} ist aber einfach, es ist schwer, damit einen großen Fehler zu machen, und die Quellen empfehlen es als Ausgangspunkt.
:::

## M: wie viele Runden du überstehst

Ein verbreitetes Turniermodell misst den {{t:short-stack|Short Stack}} anders: **M** ist dein Stack geteilt durch die Kosten einer Runde aller Spieler am Tisch.

```formula
M = Stack ÷ (Small Blind + Big Blind + Ante)
```

Beispiel: Du hast {{n:m11.m.stack}} {{t:chips|Chips}}, Blinds {{n:m11.m.sb}}/{{n:m11.m.bb}}, {{t:bb-ante}} {{n:m11.m.ante}}. M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**. In {{t:big-blind|Big Blinds}} sind das {{n:m11.m.bbs}}, aber M berücksichtigt auch das Ante. Bei einem M von etwa {{n:m11.m.red}} und darunter ({{t:red-zone|rote Zone}}) bleibt dir nur noch All-in oder {{t:fold}}.

## Je kürzer der Stack, desto breiter

Die Raster in dieser Lektion hat der Solver dieser App für die einfachste Situation berechnet: Alle haben {{t:fold|gefoldet}}, du spielst aus dem {{t:small-blind|Small Blind}} gegen den {{t:big-blind|Big Blind}}, und jeder kann nur All-in gehen oder {{t:fold|folden}}.

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

Bei {{n:m11.depth.15}} gehst du mit etwa {{n:m11.push.15}} der Hände All-in, bei {{n:m11.depth.10}} mit etwa {{n:m11.push.10}} und bei {{n:m11.depth.5}} schon mit etwa {{n:m11.nash.push.5}}–{{n:m11.push.5}}. Je weniger du im Verhältnis zu den Blinds riskierst, desto mehr Hände lohnen sich. Zum Vergleich: Eine Tabelle einer Trainingsseite gibt bei {{n:m11.depth.10}} {{n:m11.ext.push.10}} an; der Unterschied liegt innerhalb der Validierungstoleranz des Solvers, die Richtung ist dieselbe.

## Drei Spieler: Je mehr Gegner hinter dir, desto enger

Wenn du vom Button spielst, sitzen hinter dir noch zwei Spieler statt einem. Jeder von ihnen kann eine starke Hand haben, deshalb kommen {{t:fold|Folds}} von beiden seltener vor. Mit drei Spielern und Stacks von je {{n:m11.depth.3max}} geht der Button mit etwa {{n:m11.3max.push.btn}} der Hände All-in, der {{t:small-blind|Small Blind}}, wenn der Button {{t:fold|gefoldet}} hat, mit etwa {{n:m11.3max.push.sb}}.

```range
push.btn-3max
```

```range
push.sb-3max
```

Diese beiden Raster haben wir mit einem veröffentlichten Gleichgewichtsergebnis für dieselbe Situation abgeglichen (eine wissenschaftliche Arbeit von 2008: Button {{n:m11.jamfold3.btn}}). Die wenigen Hände, bei denen die Ergebnisse abweichen, kommen in den Übungen nicht vor.

## Zwei Wege zum Gewinn

Ein All-in gewinnt, wenn der Gegner {{t:fold|foldet}} oder wenn er {{t:call|callt}} und im Showdown verliert. Der {{t:fold|Fold}} des Gegners allein reicht selten: Bei {{n:m11.depth.10}} riskierst du {{n:m11.push.10.risk}}, um {{n:m11.push.10.win}} Blinds zu gewinnen, also bräuchte eine Hand ohne Chancen {{t:fold|Folds}} in mehr als {{n:m11.push.10.alpha}} der Fälle. Deshalb zählen sowohl die Fold Equity als auch die Equity der Hand, wenn der Gegner {{t:call|callt}}.

## Das Ante macht die {{t:range|Range}} breiter

Das Ante sind zusätzliche {{t:chips|Chips}} im {{t:pot|Pot}} vor dem Geben. Beim {{t:bb-ante}} zahlt der {{t:big-blind}} ein Ante von {{n:m11.ante}}, also gewinnt ein All-in {{n:m11.push.10.win-ante}} statt {{n:m11.push.10.win}}, während das Risiko gleich bleibt. In dieser Struktur wächst die {{t:range|Range}} von etwa {{n:m11.push.10}} auf etwa {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} der Hände (der Solver der App und eine unabhängige Gleichgewichtsrechnung weichen um den Bruchteil eines Punktes voneinander ab).

```range
push.sb-10-ante
```
