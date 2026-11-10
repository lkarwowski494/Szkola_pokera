---
id: m8.l2
module: m8
order: 2
title: "Wie viel bluffen"
sub: "Das Verhältnis von Bluffs zur Betgröße"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. Im {{t:pot|Pot}} sind {{n:ex.pot}}, du bettest den ganzen {{t:pot|Pot}}: {{n:ex.bet.pot}}. Deine {{t:range}} besteht aus sehr starken Händen und {{t:bluff|Bluffs}}. Welcher Anteil deiner Bets sollte aus {{t:bluff|Bluffs}} bestehen, damit dein Gegner dich nicht ausnutzen kann? Gib eine Prozentzahl ein."
    answer: bluff.share.bet-pot
    explanation: "Anteil der {{t:bluff|Bluffs}} = Bet ÷ ({{t:pot}} + 2·Bet) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}. Jede dritte Bet ist ein {{t:bluff}}: Dann verdient die Hand deines Gegners, die nur gegen {{t:bluff|Bluffs}} gewinnt, weder mit einem {{t:call|Call}} noch mit einem {{t:fold|Fold}} etwas."
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. Im {{t:pot|Pot}} sind {{n:ex.pot}}, du bettest den halben {{t:pot|Pot}}: {{n:ex.bet.half}}. Welcher Anteil deiner Bets sind im Gleichgewicht {{t:bluff|Bluffs}}? Gib eine Prozentzahl ein."
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}. Eine kleinere Bet gibt deinem Gegner einen besseren Preis, daher gibt es weniger {{t:bluff|Bluffs}} als bei einer Bet über den ganzen {{t:pot|Pot}} ({{n:bluff.share.bet-pot}})."
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. Im {{t:pot|Pot}} sind {{n:ex.pot}}, du bettest {{n:ex.bet.three-quarters}}. Welcher Anteil deiner Bets sind im Gleichgewicht {{t:bluff|Bluffs}}?"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}. Das ist dieselbe Zahl wie die Equity, die dein Gegner zum {{t:call|Callen}} braucht." }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "Das ist Alpha: wie oft ein einzelner {{t:bluff}} ohne Chance funktionieren muss. Den Anteil der {{t:bluff|Bluffs}} in der {{t:range|Range}} berechnest du mit beiden Bets im Nenner: {{n:bluff.share.bet-three-quarters}}." }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "Das ist die {{t:mdf}}, also wie viel dein Gegner verteidigen sollte. Der Anteil deiner {{t:bluff|Bluffs}} beträgt {{n:bluff.share.bet-three-quarters}}." }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. Im {{t:pot|Pot}} sind {{n:ex.pot}}, du bettest mehr als den {{t:pot|Pot}}: {{n:ex.bet.overbet}}. Welcher Anteil deiner Bets sind im Gleichgewicht {{t:bluff|Bluffs}}?"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}. Eine {{t:overbet|Overbet}}, also eine {{t:bet|Bet}}, die größer ist als der ganze {{t:pot|Pot}}, gibt deinem Gegner den schlechtesten Preis, daher kannst du darin die meisten {{t:bluff|Bluffs}} haben, aber immer noch weniger als die Hälfte." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Das ist Alpha für diese Größe: wie oft dein Gegner {{t:fold|folden}} muss, damit sich ein einzelner {{t:bluff}} lohnt. Der Anteil der {{t:bluff|Bluffs}} in der {{t:range|Range}} beträgt {{n:bluff.share.bet-overbet}}." }
      - { text: "{{n:bluff.share.bet-pot}}", why: "So hoch ist der Anteil der {{t:bluff|Bluffs}} bei einer Bet über den ganzen {{t:pot|Pot}}. Bei einer Bet von {{n:ex.bet.overbet}} sind es mehr: {{n:bluff.share.bet-overbet}}." }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "Bei welcher Bet auf dem River hast du mehr {{t:bluff|Bluffs}} in deiner {{t:range|Range}}: 1/3 {{t:pot|Pot}} oder ganzer {{t:pot|Pot}}?"
    options:
      - { text: "Bei ganzem {{t:pot|Pot}}", correct: true, why: "Bei 1/3 {{t:pot|Pot}} sind etwa {{n:bluff.share.bet-third}} der Bets {{t:bluff|Bluffs}}, bei ganzem {{t:pot|Pot}} etwa {{n:bluff.share.bet-pot}}. Eine größere Bet gibt deinem Gegner einen schlechteren Preis, deshalb braucht sein {{t:call}} mehr {{t:bluff|Bluffs}}, um sich zu lohnen." }
      - { text: "Bei 1/3 {{t:pot|Pot}}", why: "Umgekehrt. Eine kleine Bet gibt deinem Gegner einen guten Preis: Zum {{t:call|Callen}} reichen ihm etwa {{n:bluff.share.bet-third}} {{t:bluff|Bluffs}} unter deinen Bets. Bei mehr {{t:bluff|Bluffs}} würde er mit Gewinn bezahlen." }
      - { text: "Gleich viele", why: "Der Anteil der {{t:bluff|Bluffs}} hängt von der Größe ab: etwa {{n:bluff.share.bet-third}} bei 1/3 {{t:pot|Pot}}, etwa {{n:bluff.share.bet-pot}} bei ganzem {{t:pot|Pot}}." }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Du bettest auf dem River den ganzen {{t:pot|Pot}}. Alpha beträgt {{n:alpha.bet-pot}}, der Anteil der {{t:bluff|Bluffs}} {{n:bluff.share.bet-pot}}. Was sagt jede dieser Zahlen aus?"
    options:
      - { text: "Alpha: wie oft dein Gegner {{t:fold|folden}} muss; Anteil: welcher Teil der Bets {{t:bluff|Bluffs}} sind", correct: true, why: "Alpha betrifft einen einzelnen {{t:bluff}} ohne Chance: Er kommt bei null heraus, wenn dein Gegner in {{n:alpha.bet-pot}} der Fälle {{t:fold|foldet}}. Der Anteil der {{t:bluff|Bluffs}} beschreibt die Zusammensetzung deiner {{t:range|Range}}: Jede dritte Bet ist ein {{t:bluff}}, damit der {{t:call}} deines Gegners bei null herauskommt." }
      - { text: "Das sind zwei Namen für dasselbe, eine davon ist falsch berechnet", why: "Beide sind richtig berechnet: Alpha = Bet ÷ ({{t:pot}} + Bet), Anteil der {{t:bluff|Bluffs}} = Bet ÷ ({{t:pot}} + 2·Bet). Sie beantworten verschiedene Fragen." }
      - { text: "Alpha: wie viele {{t:bluff|Bluffs}} du in deiner {{t:range|Range}} hast; Anteil: wie oft dein Gegner {{t:fold|foldet}}", why: "Umgekehrt. Alpha ist die Schwelle für {{t:fold|Folds}} deines Gegners bei einem einzelnen {{t:bluff}}, und der Anteil der {{t:bluff|Bluffs}} ist die Zusammensetzung deiner {{t:range|Range}} an Bets." }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Warum berechnest du den Anteil der {{t:bluff|Bluffs}} in deinen Bets mit derselben Formel wie die Equity, die dein Gegner zum {{t:call|Callen}} braucht?"
    options:
      - { text: "Weil die Hand deines Gegners, die {{t:bluff|Bluffs}} fängt, genau dann gewinnt, wenn du {{t:bluff|bluffst}}", correct: true, why: "Seine Hand verliert gegen deine Value-Hände und gewinnt gegen {{t:bluff|Bluffs}}, also ist ihre Equity der Anteil der {{t:bluff|Bluffs}}. Wenn dieser der benötigten Equity entspricht, kommt der {{t:call}} bei null heraus, und dein Gegner kann dich weder durch Callen noch durch Folden ausnutzen." }
      - { text: "Das ist Zufall, die Formeln sehen nur ähnlich aus", why: "Das ist kein Zufall. Den Anteil der {{t:bluff|Bluffs}} wählst du so, dass die Equity der Hand, die {{t:bluff|Bluffs}} fängt, ihrem Preis entspricht." }
      - { text: "Weil dein Gegner immer genau die benötigte Equity hat", why: "Dein Gegner hat so viel Equity, wie sich aus deinen Bets ergibt. Du bist es, der die Zahl der {{t:bluff|Bluffs}} so wählt, dass es bei null herauskommt." }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Du bettest auf dem River den ganzen {{t:pot|Pot}}, aber bei dir ist die Hälfte der Bets {{t:bluff|Bluffs}} und nicht {{n:bluff.share.bet-pot}}. Was kann ein aufmerksamer Gegner tun?"
    options:
      - { text: "Öfter {{t:call|callen}}, sogar mit schwachen Händen, die {{t:bluff|Bluffs}} fangen", correct: true, why: "Sein {{t:call}} gewinnt in der Hälfte der Fälle, braucht aber nur {{n:eq.bet-pot}}. Wenn er öfter bezahlt, gewinnt er gegen deine {{t:bluff|Bluffs}} mehr, als er gegen deine Value-Hände verliert." }
      - { text: "Öfter {{t:fold|folden}}", why: "Folden überlässt dir den {{t:pot|Pot}} mit deinen {{t:bluff|Bluffs}}. Wenn es zu viele {{t:bluff|Bluffs}} gibt, verdient dein Gegner, indem er {{t:call|callt}}." }
      - { text: "Nichts, das Verhältnis spielt keine Rolle", why: "Doch: Bei zu vielen {{t:bluff|Bluffs}} ist jeder {{t:call}} mit einer Hand, die {{t:bluff|Bluffs}} fängt, für deinen Gegner profitabel." }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Auf dem River bettest du den ganzen {{t:pot|Pot}} fast nur auf {{t:value|Value}}, fast ohne {{t:bluff|Bluffs}}. Was kann ein aufmerksamer Gegner tun?"
    options:
      - { text: "Alle Hände {{t:fold|folden}}, die nur gegen {{t:bluff|Bluffs}} gewinnen", correct: true, why: "Wenn weniger als {{n:bluff.share.bet-pot}} deiner Bets {{t:bluff|Bluffs}} sind, verliert ein {{t:call}} mit einer Hand, die {{t:bluff|Bluffs}} fängt. Dein Gegner bezahlt dann nur mit besseren Händen, und deine Bets auf {{t:value|Value}} werden seltener bezahlt." }
      - { text: "Öfter {{t:call|callen}}", why: "Mit einem {{t:call|Call}} würde er vor allem deine Value-Hände bezahlen. Ohne {{t:bluff|Bluffs}} in deiner {{t:range|Range}} sollte er besser {{t:fold|folden}}." }
      - { text: "Mit jeder Hand {{t:raise|raisen}}", why: "Ein {{t:raise|Raise}} gegen deine starke Hand ohne bessere Hand ist ein sicherer Verlust. Dein Gegner {{t:fold|foldet}} einfach öfter." }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "Auf dem River bettest du den ganzen {{t:pot|Pot}} mit einer {{t:range|Range}} aus {{n:bluff.ex.range}} {{t:combo|Kombinationen}}: Value-Hände und {{t:bluff|Bluffs}}. Wie viele davon sind im Gleichgewicht {{t:bluff|Bluffs}}?"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}} {{t:bluff|Bluffs}} und {{n:bluff.ex.value}} {{t:combo|Kombinationen}} für {{t:value|Value}}: ein {{t:bluff}} auf je zwei Hände für {{t:value|Value}}." }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "Das ergäbe sich aus Alpha ({{n:alpha.bet-pot}}). Alpha ist die Schwelle für {{t:fold|Folds}} bei einem einzelnen {{t:bluff}}, nicht der Anteil der {{t:bluff|Bluffs}} in der {{t:range|Range}}." }
      - { text: "{{n:bluff.ex.value}}", why: "So viele {{t:combo|Kombinationen}} sind für {{t:value|Value}}. {{t:bluff|Bluffs}} gibt es halb so viele: {{n:bluff.ex.bluffs}}." }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "Auf dem River brauchst du ein paar {{t:bluff|Bluffs}} für Bets über den ganzen {{t:pot|Pot}}. Welche Hände wählst du dafür?"
    options:
      - { text: "Die schwächsten, z. B. verpasste {{t:draw|Draws}} auf eine {{t:straight|Straße}} oder hohe Karten ohne Chance", correct: true, why: "Eine Hand ohne Chance im Showdown verliert nichts, wenn der {{t:bluff}} nicht klappt: Nach einem {{t:check}} würde sie sowieso verlieren. Deshalb {{t:bluff|blufft}} sie." }
      - { text: "Mittlere {{t:pair|Paare}}", why: "Ein mittleres {{t:pair|Paar}} gewinnt nach einem {{t:check}} oft. Wenn du damit {{t:bluff|bluffst}}, {{t:fold|folden}} schlechtere Hände, und bessere bezahlen: Du gibst einen Gewinn im Showdown her." }
      - { text: "Beliebige, Hauptsache das Verhältnis stimmt", why: "Das Verhältnis ist nicht alles. Ein {{t:bluff}} mit einer Hand, die den Showdown gewinnen würde, kostet mehr als ein {{t:bluff}} mit einer Hand ohne Chance." }
---
In der ersten Lektion hast du auf {{t:value|Value}} gebettet. Aber wenn du auf dem River nur mit starken Händen betten würdest, würde ein aufmerksamer Gegner alles außer noch stärkeren Händen folden, und deine Bets würden fast nie bezahlt. {{t:bluff|Bluffs}} sorgen dafür, dass es sich für deinen Gegner lohnt zu bezahlen.

## {{t:polarized|Polarisierte}} {{t:range}}

Auf dem River bettest du {{t:in-position}} oft mit einer **{{t:polarized|polarisierten}} {{t:range}}** (wie in M7): sehr starke Hände auf {{t:value|Value}} und {{t:bluff|Bluffs}}, ohne mittlere Hände (die {{t:check|checken}}, wie in der ersten Lektion). Auf dem River sind deine {{t:bluff|Bluffs}} Hände ohne Chance im Showdown. Dein Gegner hat dann viele Hände, die gegen deine Value-Hände verlieren, aber gegen deine {{t:bluff|Bluffs}} gewinnen. Das sind **Bluff-Catcher** (Hände, die {{t:bluff|Bluffs}} fangen).

## Wie viele {{t:bluff|Bluffs}}

Die Zahl der {{t:bluff|Bluffs}} wählst du so, dass der Bluff-Catcher deines Gegners bei null herauskommt, egal ob er {{t:call|callt}} oder {{t:fold|foldet}}:

```formula
Anteil der Bluffs = Bet ÷ (Pot + 2·Bet)
```

Das ist dieselbe Formel wie für die Equity, die man zum {{t:call|Callen}} braucht, aus M2. Das ist kein Zufall: Ein Bluff-Catcher gewinnt genau dann, wenn du {{t:bluff|bluffst}}, also ist seine Equity der Anteil deiner {{t:bluff|Bluffs}}. Bei einer Bet über den ganzen {{t:pot|Pot}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**, also ist jede dritte Bet ein {{t:bluff}}.

## Größere Bet, mehr {{t:bluff|Bluffs}}

| Bet | Anteil der {{t:bluff|Bluffs}} | Alpha (aus M6) |
|---|---|---|
| 1/3 {{t:pot|Pot}} | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| 1/2 {{t:pot|Pot}} | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| 3/4 {{t:pot|Pot}} | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| Ganzer {{t:pot}} | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| 1,5 {{t:pot|Pots}} | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

Eine größere Bet gibt deinem Gegner einen schlechteren Preis, daher kannst du darin mehr {{t:bluff|Bluffs}} haben. Eine kleine Bet verträgt nur wenige.

## Der Anteil der {{t:bluff|Bluffs}} ist nicht Alpha

Alpha aus M6 = Bet ÷ ({{t:pot}} + Bet) sagt dir, wie oft dein Gegner {{t:fold|folden}} muss, damit **ein einzelner** {{t:bluff}} ohne Chance bei null herauskommt. Der Anteil der {{t:bluff|Bluffs}} = Bet ÷ ({{t:pot}} + 2·Bet) sagt dir, welcher Teil **deiner gesamten {{t:range|Range}} an Bets** aus {{t:bluff|Bluffs}} besteht. Bei einer Bet über den ganzen {{t:pot|Pot}} braucht ein {{t:bluff}} mehr als {{n:alpha.bet-pot}} {{t:fold|Folds}}, während deine {{t:range|Range}} {{n:bluff.share.bet-pot}} {{t:bluff|Bluffs}} enthält. Im zweiten Nenner steht eine zusätzliche Bet, weil du den Preis für den {{t:call|Call}} deines Gegners berechnest.

## Womit du {{t:bluff|bluffst}}

Für {{t:bluff|Bluffs}} wählst du **die schwächsten Hände**, z. B. verpasste {{t:draw|Draws}} auf eine {{t:straight|Straße}} oder hohe Karten ohne Chance (verpasste {{t:flush|Flushes}} behandelt die Lektion über {{t:blocker|Blocker}}): Nach einem {{t:check}} würden sie sowieso verlieren, also nimmt ihnen ein gescheiterter {{t:bluff}} nichts. Hände mit Showdown-Value {{t:check|checken}}.

:::note Das ist ein Gleichgewichtspunkt, kein Rezept für jeden Gegner
Diese Verhältnisse schützen dich vor einem Gegner, der gut spielt. Gegen bestimmte Spieler kannst du davon abweichen; mehr dazu im Modul über {{t:exploit|Exploits}} auf den Mikrolimits (M10). Die Formel für den Anteil der {{t:bluff|Bluffs}} ist eine Rechnung in einem vereinfachten Modell: eine {{t:polarized|polarisierte}} {{t:range}} gegen eine Hand, die {{t:bluff|Bluffs}} fängt (ein Spielzeugmodell aus der Spieltheorie). Die Empfehlung, mit den schwächsten Händen zu {{t:bluff|bluffen}}, stammt aus Trainingsmaterialien und Solver-Analysen.
:::
