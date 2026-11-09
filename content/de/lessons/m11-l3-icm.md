---
id: m11.l3
module: m11
order: 3
title: "ICM und Bubble Factor"
sub: "Chips sind kein Geld"
rules: [R-M11-008, R-M11-009, R-M11-010]
drills:
  - kind: numeric
    id: m11.l3.n-first
    family: m11.icm.first
    rules: [R-M11-008]
    prompt: "Drei Spieler sind übrig, zwei Plätze werden bezahlt. Stacks: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} und {{n:m11.icm.a.s3}} {{t:chips|Chips}}. Wie hoch ist laut {{t:icm}} die Chance des kürzesten Stacks auf Platz 1? Gib eine Zahl in Prozent ein."
    answer: m11.icm.a.chips3
    explanation: "Chance auf Platz 1 = Stack ÷ alle {{t:chips|Chips}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}."
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "Dieselben Stacks ({{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}). Der große Stack hat Platz 1 belegt. Wie hoch ist jetzt die Chance des kürzesten Stacks auf Platz 2?"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "Übrig sind zwei Spieler mit {{n:m11.icm.a.rest1}} {{t:chips|Chips}}, davon hat der kurze {{n:m11.icm.a.s3}}: {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}." }
      - { text: "{{n:m11.icm.a.chips3}}", why: "Das ist die Chance auf Platz 1, gerechnet mit allen {{t:chips|Chips}}. Wenn der Sieger aus der Rechnung fällt, teilst du nur durch die {{t:chips|Chips}} der übrigen Spieler: {{n:m11.icm.a.rest1}}." }
      - { text: "{{n:m11.icm.a.second3}}", why: "Das ist die Gesamtchance des {{t:short-stack|Short Stacks}} auf Platz 2, über beide möglichen Sieger. Die Frage betrifft den Fall, dass der große Stack gewonnen hat." }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|Auszahlungen}}: {{n:m11.icm.a.p1}} des {{t:prize-pool|Preispools}} für Platz 1 und {{n:m11.icm.a.p2}} für Platz 2. Stacks {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}. Wie viel ist der kürzeste Stack laut {{t:icm}} wert (in Prozent des {{t:prize-pool|Preispools}})? Gib eine Zahl ein."
    answer: m11.icm.a.eq3
    explanation: "Chance auf Platz 1 {{n:m11.icm.a.chips3}}, auf Platz 2 {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ {{n:m11.icm.a.second3}}. Equity = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{n:m11.icm.a.eq3}}, mehr als sein Anteil an den {{t:chips|Chips}} ({{n:m11.icm.a.chips3}})."
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "Der große Stack hält {{n:m11.icm.a.chips1}} der {{t:chips|Chips}} im Spiel. Wie viel ist er laut {{t:icm}} in Geld wert?"
    options:
      - { text: "{{n:m11.icm.a.eq1}}, also weniger als sein Anteil an den {{t:chips|Chips}}", correct: true, why: "Der große Stack kann höchstens {{n:m11.icm.a.p1}} des {{t:prize-pool|Preispools}} gewinnen, obwohl er Chancen auf alle {{t:chips|Chips}} hat. Deshalb sind die {{t:chips|Chips}} des Leaders weniger wert als ihr Anteil, die des {{t:short-stack|Short Stacks}} mehr ({{n:m11.icm.a.eq3}})." }
      - { text: "{{n:m11.icm.a.chips1}}, so viel wie sein Anteil an den {{t:chips|Chips}}", why: "So wäre es, wenn der Sieger den ganzen {{t:prize-pool|Preispool}} bekäme. Bei {{t:payout|Auszahlungen}} von {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}} ist jeder {{t:chips|Chip}} des großen Stacks weniger wert: {{n:m11.icm.a.eq1}}." }
      - { text: "{{n:m11.icm.a.p1}}, weil er fast sicher gewinnt", why: "Er hat nur eine Chance von {{n:m11.icm.a.chips1}} auf Platz 1, den Rest seiner {{t:tournament-equity|Turnier-Equity}} bringt ihm Platz 2. Zusammen {{n:m11.icm.a.eq1}}." }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|Bubble}}: vier Spieler, drei Plätze bezahlt. {{t:call|Callst}} du ein All-in, verlierst du bei einer Niederlage {{n:m11.bf.loss}} des {{t:prize-pool|Preispools}}, bei einem Sieg gewinnst du {{n:m11.bf.gain}}. Wie hoch ist der Bubble Factor? Gib eine Zahl mit zwei Nachkommastellen ein."
    answer: m11.bf.value
    explanation: "Bubble Factor = Verlust ÷ Gewinn = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}. Eine Niederlage schmerzt fast anderthalbmal so stark, wie ein Sieg hilft."
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Der Bubble Factor beträgt {{n:m11.bf.value}}. Wie viel Equity brauchst du, damit sich ein {{t:call|Call}} des All-ins lohnt? Gib eine Zahl in Prozent ein."
    answer: m11.bf.req
    explanation: "Benötigte Equity = BF ÷ (BF + 1), also Verlust ÷ (Verlust + Gewinn) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}. Im Spiel um {{t:chips|Chips}} würden {{n:m11.bf.req-chips}} reichen."
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Im Spiel um {{t:chips|Chips}} reichen zum {{t:call|Callen}} dieses All-ins {{n:m11.bf.req-chips}} Equity, laut {{t:icm}} brauchst du dagegen {{n:m11.bf.req}}. Wie heißt der Unterschied?"
    options:
      - { text: "{{t:risk-premium|Risk Premium}} ({{n:m11.bf.premium}})", correct: true, why: "{{t:risk-premium|Risk Premium}} ist die zusätzliche Equity, die das {{t:icm}} über den Preis in {{t:chips|Chips}} hinaus verlangt: {{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}." }
      - { text: "Bubble Factor", why: "Der Bubble Factor ist das Verhältnis von Verlust zu Gewinn ({{n:m11.bf.value}}). Daraus berechnest du die benötigte Equity, und der Unterschied zum Spiel um {{t:chips|Chips}} ist die {{t:risk-premium|Risk Premium}}." }
      - { text: "Fold Equity", why: "Fold Equity ist der Gewinn aus den {{t:fold|Folds}} des Gegners. Wenn du ein All-in {{t:call|callst}}, hast du sie nicht." }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|Bubble}}, das Beispiel aus der Lektion. Deine Hand hat etwa {{n:m11.bf.example-eq}} Equity gegen die All-in-{{t:range|Range}} des Gegners. Im Spiel um {{t:chips|Chips}} würde sich ein {{t:call|Call}} lohnen, weil {{n:m11.bf.req-chips}} reichen. Was tust du hier?"
    options:
      - { text: "Ich {{t:fold|folde}}", correct: true, why: "Laut {{t:icm}} brauchst du hier {{n:m11.bf.req}} Equity. Eine Hand, die seltener gewinnt, verliert Geld, obwohl sie in {{t:chips|Chips}} im Plus wäre." }
      - { text: "Ich {{t:call|calle}}, weil es in {{t:chips|Chips}} Gewinn bringt", why: "In einem {{t:tournament|Turnier}} mit {{t:payout|Auszahlungen}} zählt Geld, nicht {{t:chips|Chips}}. Eine Niederlage kostet dich {{n:m11.bf.loss}} des {{t:prize-pool|Preispools}}, ein Sieg bringt dir nur {{n:m11.bf.gain}}." }
      - { text: "Ich {{t:call|calle}}, weil ich öfter als in der Hälfte der Fälle gewinne", why: "Eine Hand mit {{n:m11.bf.example-eq}} gewinnt öfter als in der Hälfte der Fälle und ist hier trotzdem zu schwach: Die Schwelle liegt bei {{n:m11.bf.req}}." }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:bubble|Bubble}} eines {{t:tournament|Turniers}}. Du hast den größten Stack am Tisch und {{t:cover|coverst}} alle. Der mittlere Stack foldet sehr oft gegen dich. Was folgt daraus?"
    options:
      - { text: "Du kannst breiter {{t:shove|pushen}}, weil die Gegner eng {{t:call|callen}}", correct: true, why: "Der mittlere Stack riskiert beim {{t:call|Callen}}, kurz vor den Preisen auszuscheiden, deshalb braucht er viel Equity. Du verlierst bei einer Niederlage nur einen Teil deines Stacks. Die Gegner {{t:call|callen}} eng, also gewinnst du den {{t:pot|Pot}} öfter kampflos." }
      - { text: "Du spielst enger, um die Führung nicht zu verlieren", why: "Der Leader hat das geringste Risiko am Tisch. Enges Spiel verschenkt seinen wichtigsten Vorteil: den Druck auf die mittleren Stacks." }
      - { text: "Nichts, weil das {{t:icm}} nur {{t:short-stack|Short Stacks}} betrifft", why: "Das {{t:icm}} betrifft alle: Es verändert, wie viel Equity jeder zum {{t:call|Callen}} braucht, und das hängt von der gesamten Verteilung der Stacks ab." }
  - kind: generated
    id: m11.l3.g-icm-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    generator: icm
    params: { mode: equity }
    count: 2
  - kind: generated
    id: m11.l3.g-icm-call
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    generator: icm
    params: { mode: call }
    count: 3
  - kind: choice
    id: m11.l3.q-limits
    family: m11.icm.limits
    rules: [R-M11-008]
    prompt: "Wovon geht das Modell {{t:icm}} aus?"
    options:
      - { text: "Dass alle gleich gut spielen und nur die Stacks über die Platzierungen entscheiden", correct: true, why: "Das {{t:icm}} rechnet allein die Stacks in Chancen auf die Platzierungen um. Es kennt weder {{t:position|Position}} noch steigende Blinds oder Vorteile durch Können." }
      - { text: "Dass der bessere Spieler öfter gewinnt", why: "Im Gegenteil: Das {{t:icm}} geht von gleichem Können aus. Den Vorteil eines Spielers berücksichtigt es überhaupt nicht." }
      - { text: "Dass der Spieler im {{t:big-blind|Big Blind}} geringere Chancen hat", why: "Das {{t:icm}} kennt weder {{t:position|Position}} noch Blinds: Es schaut nur auf die Stacks. Das ist eine seiner Grenzen." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
Im Spiel um Geld (Cash) ist ein {{t:chips|Chip}} Geld: Ein gewonnener und ein verlorener sind gleich viel wert. Im {{t:tournament|Turnier}} ist das nicht so. Preise bekommen die ersten paar Plätze, und der Sieger nimmt nicht den ganzen {{t:prize-pool|Preispool}} mit, obwohl er alle {{t:chips|Chips}} mitnimmt. Deshalb muss man {{t:chips|Chips}} in Geld umrechnen.

## {{t:icm}}: der Stack in Geld

Das Modell unabhängiger {{t:chips|Chips}} ({{t:icm}}) rechnet Stacks in Chancen auf jeden Platz um. Es geht davon aus, dass alle gleich gut spielen, also entscheiden nur die Stacks über die Reihenfolge.

```formula
Chance auf Platz 1 = dein Stack ÷ alle Chips
```

Die Chance auf Platz 2 berechnest du genauso, aber getrennt für jeden möglichen Sieger: Du ziehst seine {{t:chips|Chips}} ab und teilst durch den Rest. Die {{t:tournament-equity|Turnier-Equity}} eines Stacks, also sein erwarteter Anteil am {{t:prize-pool|Preispool}}, ist die Summe aus: Chance auf den Platz × {{t:payout|Auszahlung}} für den Platz.

## Beispiel: drei Spieler auf der {{t:bubble|Bubble}}

Zwei Plätze werden bezahlt: {{n:m11.icm.a.p1}} und {{n:m11.icm.a.p2}} des {{t:prize-pool|Preispools}}. Stacks: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} und {{n:m11.icm.a.s3}} {{t:chips|Chips}}.

- Der {{t:short-stack|Short Stack}} gewinnt das {{t:tournament|Turnier}} mit einer Chance von {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**.
- Platz 2: Gewinnt der große Stack ({{n:m11.icm.a.chips1}}), wird der kurze mit einer Chance von {{n:m11.icm.a.second3.via1}} Zweiter; gewinnt der mittlere ({{n:m11.icm.a.chips2}}), mit einer Chance von {{n:m11.icm.a.second3.via2}}. Zusammen {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ **{{n:m11.icm.a.second3}}** (die Summanden sind gerundet).
- Equity: {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ **{{n:m11.icm.a.eq3}}** des {{t:prize-pool|Preispools}}.

| Stack | Anteil an den {{t:chips|Chips}} | Equity laut {{t:icm}} |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

Der {{t:short-stack|Short Stack}} ist mehr wert als seine {{t:chips|Chips}}, der große weniger: Der Leader bekommt nicht mehr als den Preis für Platz 1.

## Bubble Factor: Verlieren schmerzt mehr

Vier Spieler, drei Plätze bezahlt: {{n:m11.bf.p1}}, {{n:m11.bf.p2}} und {{n:m11.bf.p3}}. Stacks {{n:m11.bf.s1}}, {{n:m11.bf.s2}} (du), {{n:m11.bf.s3}} und {{n:m11.bf.s4}}. Der Spieler mit {{n:m11.bf.s3}} geht All-in, du {{t:cover|coverst}} ihn, hast also mehr {{t:chips|Chips}}. Der Einfachheit halber lassen wir die Blinds im {{t:pot|Pot}} weg.

- Jetzt ist dein Stack {{n:m11.bf.eq.now}} des {{t:prize-pool|Preispools}} wert.
- Du gewinnst: Du hast {{n:m11.bf.win}}, der Gegner scheidet aus, alle sind in den Preisen. Deine Equity steigt auf {{n:m11.bf.eq.win}}, also um **{{n:m11.bf.gain}}**.
- Du verlierst: Dir bleiben {{n:m11.bf.lose}}, und die Equity fällt auf {{n:m11.bf.eq.lose}}, also um **{{n:m11.bf.loss}}**.

```formula
Bubble Factor = Verlust bei Niederlage ÷ Gewinn bei Sieg
```

Hier {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**. Die App verwendet diese Definition (Verlust ÷ Gewinn): Im Spiel um {{t:chips|Chips}}, wo der Verlust dem Gewinn entspricht, beträgt der Bubble Factor eins. Manche Push/Fold-Tabellen berechnen den Bubble Factor anders, auf einer anderen Skala, vergleiche ihre Zahlen also nicht direkt mit diesen. Aus ihm ergibt sich die benötigte Equity:

```formula
benötigte Equity = BF ÷ (BF + 1)
```

Heraus kommen **{{n:m11.bf.req}}**. Im Spiel um {{t:chips|Chips}} riskierst du {{n:m11.bf.s3}}, um {{n:m11.bf.s3}} zu gewinnen, also würden {{n:m11.bf.req-chips}} reichen. Der Unterschied, {{n:m11.bf.premium}}, ist die **{{t:risk-premium|Risk Premium}}**.

Dieselbe Richtung zeigt ein veröffentlichtes Gleichgewicht für drei Spieler mit gleichen Stacks (eine wissenschaftliche Arbeit von 2008): Wenn Button und {{t:small-blind|Small Blind}} schon All-in sind, {{t:call|callt}} der {{t:big-blind|Big Blind}} in einer einzelnen Hand {{n:m11.jamfold3.overcall.single}} der Hände, im {{t:tournament|Turnier}} mit {{t:payout|Auszahlungen}} dagegen nur {{n:m11.jamfold3.overcall.tourn}}, also nur die höchsten {{t:pocket-pair|Pocket Pairs}} und AKs.

:::note Wer eng {{t:call|callt}}
Ein mittlerer Stack auf der {{t:bubble|Bubble}} oder am {{t:final-table|Finaltisch}} (dem letzten Tisch eines {{t:tournament|Turniers}}, an dem um die höchsten Preise gespielt wird) {{t:call|callt}} All-ins viel enger als im Spiel um {{t:chips|Chips}}. Ein großer Stack, der die Gegner {{t:cover|covert}}, riskiert weniger und kann das ausnutzen: breiter {{t:shove|pushen}}, weil die Gegner {{t:fold|folden}} müssen. Der Bubble Factor hängt von allen Stacks am Tisch ab, deshalb rechnet man ihn nicht am Tisch aus, sondern übt ihn an Beispielen, um ein Gespür zu entwickeln.
:::

## Grenzen des {{t:icm}}

Das {{t:icm}} berücksichtigt weder {{t:position|Position}} noch steigende Blinds oder das Können der Spieler. Es ist eine Näherung, keine genaue Bewertung eines {{t:tournament|Turniers}}.
