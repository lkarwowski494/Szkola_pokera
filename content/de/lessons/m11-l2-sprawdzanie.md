---
id: m11.l2
module: m11
order: 2
title: "Ein All-in callen"
sub: "Wie viel Equity du brauchst und warum du enger callst"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Du hast {{n:m11.depth.10}} im {{t:big-blind|Big Blind}}, ohne Ante. Der {{t:small-blind|Small Blind}} ist mit {{n:m11.depth.10}} all-in gegangen. Wie viel Prozent Equity brauchst du, damit sich ein {{t:call}} lohnt? Gib eine Zahl ein."
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "Dein Blind liegt schon im {{t:pot|Pot}}, also zahlst du {{n:m11.call.10.cost}} nach. Der {{t:pot|Pot}} nach dem {{t:call|Call}} beträgt {{n:m11.call.10.pot}}: {{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}."
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Gleicher Spot, aber die Stacks betragen je {{n:m11.depth.5}}. Wie viel Equity brauchst du, um das All-in zu {{t:call|callen}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "Du zahlst {{n:m11.call.5.cost}} in einen {{t:pot|Pot}} nach, der nach dem {{t:call|Call}} {{n:m11.call.5.pot}} beträgt: {{n:m11.call.5.eq}}. Bei einem kürzeren Stack ist der Blind ein größerer Teil des Stacks, also ist der Preis besser." }
      - { text: "{{n:m11.call.10.eq}}", why: "Das ist der Preis bei {{n:m11.depth.10}}. Bei {{n:m11.depth.5}} ist dein Blind ein größerer Teil deines ganzen Stacks, also brauchst du weniger: {{n:m11.call.5.eq}}." }
      - { text: "Die Hälfte", why: "Die Hälfte bräuchtest du, wenn du deinen ganzen Stack einzahlen würdest. Der Blind liegt schon im {{t:pot|Pot}}, also zahlst du nur {{n:m11.call.5.cost}} nach." }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Stacks von je {{n:m11.depth.15}}, der {{t:small-blind}} ist all-in gegangen. Wie viel Equity brauchst du für einen {{t:call|Call}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "Du zahlst {{n:m11.call.15.cost}} in einen {{t:pot|Pot}} von {{n:m11.call.15.pot}} nach: {{n:m11.call.15.eq}}. Je tiefer der Stack, desto näher an der Hälfte." }
      - { text: "{{n:m11.call.5.eq}}", why: "Das ist der Preis bei {{n:m11.depth.5}}. Bei {{n:m11.depth.15}} ist der Blind ein kleinerer Teil des Stacks, also steigt der Preis auf {{n:m11.call.15.eq}}." }
      - { text: "Mehr als die Hälfte", why: "Selbst bei einem sehr tiefen Stack übersteigt der Preis die Hälfte nicht: Du hast immer deinen Blind im {{t:pot|Pot}}." }
  - kind: generated
    id: m11.l2.g-call
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-5,call.bb-10,call.bb-15" }
    count: 3
  - kind: paint
    id: m11.l2.p-call-10
    family: m11.paint.call
    rules: [R-M11-007]
    spot: call.bb-10
    prompt: "Du hast {{n:m11.depth.10}} im {{t:big-blind|Big Blind}}, der {{t:small-blind}} ist all-in gegangen. Male die Hände an, mit denen du {{t:call|callst}}."
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Bei {{n:m11.depth.10}} geht der Solver aus dem {{t:small-blind|Small Blind}} mit Sieben und Sechs in derselben Farbe (76s) all-in. Du hast diese Hand im {{t:big-blind|Big Blind}}, und der {{t:small-blind}} ist all-in gegangen. Was machst du?"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "Ein All-in mit 76s lohnt sich vor allem durch die {{t:fold|Folds}} deines Gegners. Wenn du {{t:call|callst}}, gewinnst du nur im Showdown, und zwar gegen die {{t:range|Range}} des All-ins, die viele hohe Karten und {{t:pair|Paare}} enthält. Der Solver {{t:fold|foldet}} diese Hand." }
      - { text: "{{t:call|Call}}, weil ich aus dem {{t:small-blind|Small Blind}} damit all-in gehen würde", why: "Ein {{t:call|Call}} ist eine andere Situation: Du hast keine Fold Equity, und die {{t:range}} des Gegners ist stärker als eine zufällige. Für einen {{t:call|Call}} brauchst du eine stärkere Hand." }
      - { text: "{{t:call|Call}}, weil sich eine Hand in einer Farbe gut entwickelt", why: "Nach einem All-in gibt es kein weiteres Spiel, in dem sich die Hand entwickeln könnte. Es zählt nur die Equity bis zum Showdown." }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|Big Blind}}, der {{t:small-blind}} ist all-in gegangen. Du hast ein {{t:pair|Paar}} Zweien. Bei {{n:m11.depth.10}} {{t:call|callt}} der Solver. Und bei {{n:m11.depth.15}}?"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "{{t:fold|Foldet}}", correct: true, why: "Bei {{n:m11.depth.15}} steigt der Preis auf {{n:m11.call.15.eq}}, und die {{t:range}} des All-ins ist enger (ca. {{n:m11.push.15}} der Hände), also trifft ein {{t:pair}} Zweien häufiger auf ein höheres {{t:pair|Paar}}. Die {{t:range|Range}} für den {{t:call|Call}} sinkt von ca. {{n:m11.call.10}} auf ca. {{n:m11.call.15}} der Hände." }
      - { text: "{{t:call|Callt}}, weil ein {{t:pair}} immer Favorit ist", why: "Ein {{t:pair|Paar}} Zweien ist gegen zwei höhere Karten ungefähr ein Münzwurf und gegen jedes höhere {{t:pair|Paar}} klarer Außenseiter. Bei einem tieferen Stack {{t:shove|pusht}} der Gegner weniger schwache Hände, also machen {{t:pair|Paare}} einen größeren Teil seiner {{t:range|Range}} aus." }
      - { text: "{{t:call|Callt}}, weil: je tiefer der Stack, desto breiter", why: "Umgekehrt: Je tiefer der Stack, desto mehr kostet ein {{t:call}} und desto enger ist die {{t:range}} für den {{t:call|Call}}." }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Bei {{n:m11.depth.10}} geht der {{t:small-blind}} mit ca. {{n:m11.push.10}} der Hände all-in, aber der {{t:big-blind}} {{t:call|callt}} nur mit ca. {{n:m11.call.10}}. Warum?"
    options:
      - { text: "Der Callende hat keine Fold Equity und spielt gegen eine {{t:range|Range}}, die stärker als eine zufällige ist", correct: true, why: "Ein All-in gewinnt auch, wenn der Gegner {{t:fold|foldet}}. Ein {{t:call|Call}} gewinnt nur im Showdown, und zwar gegen Hände, die bereits ausgewählt wurden. Daher die alte Regel: Für einen {{t:call|Call}} brauchst du eine bessere Hand als dafür, als Erster all-in zu gehen." }
      - { text: "Der {{t:big-blind|Big Blind}} zahlt mehr", why: "Beide riskieren denselben Stack, und der {{t:big-blind|BB}} hat seinen Blind schon im {{t:pot|Pot}}, zahlt also sogar weniger nach." }
      - { text: "Der Solver irrt sich", why: "Das ist das Gleichgewicht eines Spiels aus All-in oder {{t:fold}}: Kein Spieler kann mehr gewinnen, indem er nur seine eigene {{t:range}} ändert. Der Unterschied kommt von der Fold Equity." }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Es wird mit {{t:bb-ante}} gespielt. Du hast {{n:m11.depth.10}} im {{t:big-blind|Big Blind}} und hast ein Ante von {{n:m11.ante}} gezahlt. Der {{t:small-blind|Small Blind}} ist all-in gegangen. Wie viel Equity brauchst du für einen {{t:call|Call}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "Du zahlst gleich viel nach ({{n:m11.call.10.cost}}), aber im {{t:pot|Pot}} liegt zusätzlich das Ante: nach dem {{t:call|Call}} {{n:m11.call.10-ante.pot}}. {{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}. Deshalb {{t:call|callst}} du mit Ante breiter: mit ca. {{n:m11.call.10-ante}} der Hände statt {{n:m11.call.10}}." }
      - { text: "{{n:m11.call.10.eq}}", why: "Das ist der Preis ohne Ante. Das Ante bleibt im {{t:pot|Pot}}, also gewinnst du für dieselbe Nachzahlung mehr: {{n:m11.call.10-ante.eq}}." }
      - { text: "Mehr als ohne Ante, weil du mehr eingezahlt hast", why: "Das Ante ist bereits ausgegebenes Geld. Es zählt nur, wie viel du noch nachzahlst und wie viel du gewinnen kannst." }
  - kind: generated
    id: m11.l2.g-call-ante
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l2.g-call-3max
    family: m11.call.3max
    rules: [R-M11-012]
    generator: rangeDecision
    params: { spots: "call.sb-vs-btn-3max,call.bb-vs-btn-3max,call.bb-vs-two-3max" }
    count: 2
  - kind: choice
    id: m11.l2.q-overcall
    family: m11.call.3max
    rules: [R-M11-012]
    prompt: "Drei Spieler, Stacks von je {{n:m11.depth.3max}}. Der Button ist all-in gegangen, der {{t:small-blind}} hat {{t:call|gecallt}}. Im {{t:big-blind|Big Blind}} brauchst du nur {{n:m11.3max.bb-two.eq}} Equity. {{t:call|Callst}} du breiter als dann, wenn nur der Button all-in gegangen ist?"
    table: { position: BB }
    options:
      - { text: "Nein, enger", correct: true, why: "Der Preis ist besser, aber du spielst gegen zwei {{t:range|Ranges}}, darunter die eines Callers, der eine starke Hand hat. Der Solver {{t:call|callt}} hier mit ca. {{n:m11.3max.call.bb-two}} der Hände, und wenn nur der Button all-in ist, mit ca. {{n:m11.3max.call.bb}}." }
      - { text: "Ja, weil der Preis viel besser ist", why: "Ein besserer Preis reicht nicht: Gegen zwei Gegner sinkt die Equity schwächerer Hände schnell. Der Solver {{t:call|callt}} nur mit ca. {{n:m11.3max.call.bb-two}} der Hände." }
      - { text: "Gleich, weil nur deine Hand zählt", why: "Es zählt die Equity gegen die Hände der Gegner. Wer nach dem All-in des Buttons callt, hat eine stärkere {{t:range}} als der Button, also {{t:call|callst}} du enger." }
---
Wenn ein Gegner all-in geht und du im {{t:big-blind}} sitzt, ist die Entscheidung der Form nach einfach: Du {{t:call|callst}} oder du {{t:fold|foldest}}. Nach einem {{t:call|Call}} gibt es kein weiteres Spiel, also zählen nur der Preis und deine Equity gegen die {{t:range|Range}} des All-ins.

## Der Preis eines {{t:call|Calls}}

Dein Blind liegt schon im {{t:pot|Pot}}. Bei einem Stack von {{n:m11.depth.10}} zahlst du {{n:m11.call.10.cost}} nach, und der {{t:pot}} nach dem {{t:call|Call}} beträgt {{n:m11.call.10.pot}}.

```formula
benötigte Equity = Nachzahlung ÷ Pot nach dem Call
```

| Stack | Nachzahlung | {{t:pot|Pot}} nach dem {{t:call|Call}} | Benötigte Equity |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

Je kürzer der Stack, desto besser der Preis, weil dein Blind ein größerer Teil deines ganzen Stacks ist.

## Du {{t:call|callst}} enger, als du {{t:shove|pushst}}

Wenn du als Erster all-in gehst, gewinnst du auch dann, wenn der Gegner {{t:fold|foldet}}. Wenn du {{t:call|callst}}, gewinnst du nur im Showdown, und zwar gegen Hände, die der Gegner für sein All-in ausgewählt hat. Deshalb brauchst du für einen {{t:call|Call}} eine bessere Hand als dafür, als Erster all-in zu gehen (in der Literatur heißt das „Gap Concept“).

```range
call.bb-10
```

Bei {{n:m11.depth.10}} geht der {{t:small-blind}} mit ca. {{n:m11.push.10}} der Hände all-in, während der {{t:big-blind}} mit ca. {{n:m11.call.10}} {{t:call|callt}}. Hände wie [[7s 6s]] {{t:shove|pushst}} du aus dem {{t:small-blind|Small Blind}}, aber gegen ein All-in {{t:fold|foldest}} du sie: Ohne Fold Equity haben sie zu wenig Equity gegen hohe Karten und {{t:pair|Paare}}. Zum Vergleich: Eine Tabelle von einer Trainingsseite gibt bei {{n:m11.depth.10}} eine {{t:range}} für den {{t:call|Call}} von {{n:m11.ext.call.10}} an.

```range
call.bb-15
```

```range
call.bb-5
```

Ein tieferer Stack bedeutet einen teureren {{t:call}} und eine engere {{t:range}} des gegnerischen All-ins, also {{t:call|callst}} du seltener: ca. {{n:m11.call.15}} bei {{n:m11.depth.15}}, bei {{n:m11.depth.5}} dagegen sogar ca. {{n:m11.call.5}}.

## Wenn noch jemand hinter dir sitzt

Bei drei Spielern und Stacks von je {{n:m11.depth.3max}} {{t:call|callt}} der {{t:small-blind}} das All-in des Buttons nur mit ca. {{n:m11.3max.call.sb}} der Hände, obwohl er {{n:m11.3max.sb.eq}} Equity braucht. Der {{t:big-blind|Big Blind}} zahlt in derselben Situation, wenn der {{t:small-blind}} {{t:fold|gefoldet}} hat, {{n:m11.3max.bb.cost}} in einen {{t:pot|Pot}} von {{n:m11.3max.bb.pot}} nach, braucht {{n:m11.3max.bb.eq}} Equity und {{t:call|callt}} mit ca. {{n:m11.3max.call.bb}}. Der Unterschied kommt vor allem vom Spieler hinter dir (die Preise unterscheiden sich kaum): Der {{t:small-blind}} kann {{t:call|callen}} und auf eine noch stärkere Hand des {{t:big-blind|Big Blinds}} treffen.

```range
call.sb-vs-btn-3max
```

Wenn schon zwei Spieler all-in sind, sinkt der Preis auf {{n:m11.3max.bb-two.eq}}, und trotzdem {{t:call|callt}} der {{t:big-blind}} nur mit ca. {{n:m11.3max.call.bb-two}} der Hände. Gegen zwei {{t:range|Ranges}}, von denen eine das All-in bereits {{t:call|gecallt}} hat, verlieren schwächere Hände schnell an Equity.

```range
call.bb-vs-two-3max
```

## Mit Ante {{t:call|callst}} du breiter

Das Ante bleibt im {{t:pot|Pot}}, also gewinnst du für dieselbe Nachzahlung mehr: Bei {{n:m11.depth.10}} und einem {{t:bb-ante}} von {{n:m11.ante}} brauchst du {{n:m11.call.10-ante.eq}} statt {{n:m11.call.10.eq}}. Mit Ante {{t:shove|pusht}} auch der Gegner breiter, also {{t:call|callt}} der Solver mit ca. {{n:m11.call.10-ante}} der Hände.

```range
call.bb-10-ante
```

:::note {{t:range|Ranges}} in dieser Lektion
Die Raster gelten für das Spiel zweier Spieler: {{t:small-blind|Small Blind}} gegen {{t:big-blind|Big Blind}}, wenn alle anderen {{t:fold|gefoldet}} haben, und rechnen in {{t:chips}}, nicht in Geld. Wenn in einem {{t:tournament|Turnier}} die {{t:payout|Auszahlungen}} zählen, {{t:call|callst}} du noch enger (nächste Lektion).
:::
