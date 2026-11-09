---
id: m6.l1
module: m6
order: 1
title: "MDF und Alpha"
sub: "Wie viel du verteidigst, wenn dein Gegner setzt"
rules: [R-M6-001, R-M6-002, R-M6-003, R-M6-004]
drills:
  - kind: numeric
    id: m6.l1.n-mdf-third
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Im {{t:pot|Pot}} sind {{n:ex.third.pot}}, dein Gegner {{t:bet|setzt}} {{n:ex.third.bet}}. Welchen Anteil deiner {{t:range|Range}} musst du mindestens verteidigen ({{t:call|callen}} oder {{t:raise|raisen}}), damit sein chancenloser {{t:bluff|Bluff}} nicht automatisch Gewinn macht? Gib die Zahl in Prozent ein."
    answer: mdf.bet-third
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + Bet) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}. Dein Gegner riskiert {{n:ex.third.bet}}, um {{n:ex.third.pot}} zu gewinnen, also macht sein {{t:bluff|Bluff}} Gewinn, wenn du öfter als {{n:alpha.bet-third}} {{t:fold|foldest}}."
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Im {{t:pot|Pot}} sind {{n:ex.pot}}, dein Gegner {{t:bet|setzt}} den ganzen {{t:pot|Pot}}: {{n:ex.bet.pot}}. Wie hoch ist die {{t:mdf}}? Gib die Zahl in Prozent ein."
    answer: mdf.bet-pot
    explanation: "{{t:mdf}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}. Bei einem Bet in Höhe des {{t:pot|Pots}} riskiert ein {{t:bluff|Bluff}} so viel, wie er gewinnen kann, also reicht es, wenn du in jedem zweiten Fall {{t:fold|foldest}}, damit er bei null herauskommt."
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Im {{t:pot|Pot}} sind {{n:ex.pot}}, dein Gegner {{t:bet|setzt}} einen halben {{t:pot|Pot}}: {{n:ex.bet.half}}. Wie hoch ist die {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}. So viel deiner {{t:range|Range}} verteidigst du, damit ein chancenloser {{t:bluff|Bluff}} keinen Gewinn macht." }
      - { text: "{{n:alpha.bet-half}}", why: "Das ist Alpha: wie oft der {{t:bluff|Bluff}} deines Gegners funktionieren muss. Die {{t:mdf}} ist der Rest zum Ganzen, also {{n:mdf.bet-half}}." }
      - { text: "{{n:eq.bet-half}}", why: "Das ist die Equity, die du zum {{t:call|Callen}} mit einer einzelnen Hand brauchst (aus M2). Die {{t:mdf}} sagt dir, welchen Anteil deiner gesamten {{t:range|Range}} du verteidigst." }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. Im {{t:pot|Pot}} sind {{n:ex.pot}}, dein Gegner {{t:bet|setzt}} mehr als den {{t:pot|Pot}}: {{n:ex.bet.overbet}}. Wie hoch ist die {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}. Je größer der Bet, desto kleiner der Anteil deiner {{t:range|Range}}, den du verteidigen musst." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Das ist Alpha: So oft muss ein {{t:bluff|Bluff}} über {{n:ex.bet.overbet}} funktionieren. Du verteidigst den Rest, also {{n:mdf.bet-overbet}}." }
      - { text: "{{n:eq.bet-overbet}}", why: "Das ist die Equity, die du zum {{t:call|Callen}} brauchst: {{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}). Andere Zahl, andere Frage." }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. Du {{t:bluff|bluffst}} mit einer chancenlosen Hand: Im {{t:pot|Pot}} sind {{n:ex.pot}}, du {{t:bet|setzt}} {{n:ex.bet.half}}. Wie oft muss dein Gegner {{t:fold|folden}}, damit der {{t:bluff|Bluff}} bei null herauskommt? Gib die Zahl in Prozent ein."
    answer: alpha.bet-half
    explanation: "Alpha = Bet ÷ ({{t:pot}} + Bet) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}. Du riskierst {{n:ex.bet.half}}, um {{n:ex.pot}} zu gewinnen: Wenn dein Gegner öfter {{t:fold|foldet}}, macht der {{t:bluff|Bluff}} Gewinn."
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. Du {{t:bluff|bluffst}}: Im {{t:pot|Pot}} sind {{n:ex.pot}}, du {{t:bet|setzt}} {{n:ex.bet.three-quarters}}. Wie oft muss dein Gegner {{t:fold|folden}}, damit sich der {{t:bluff|Bluff}} lohnt?"
    options:
      - { text: "Öfter als {{n:alpha.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. So hoch ist Alpha bei einem Bet von 3/4 {{t:pot|Pot}}." }
      - { text: "Öfter als {{n:mdf.bet-three-quarters}}", why: "Das ist die {{t:mdf}}, also wie viel dein Gegner verteidigen sollte. Alpha ist der Anteil, den er {{t:fold|folden}} kann, bevor dein {{t:bluff|Bluff}} Gewinn macht: {{n:alpha.bet-three-quarters}}." }
      - { text: "Öfter als {{n:eq.bet-three-quarters}}", why: "Das ist die Equity, die dein Gegner zum {{t:call|Callen}} braucht. Die Schwelle für den {{t:bluff|Bluff}} berechnest du ohne seinen {{t:call|Call}} im Nenner: {{n:alpha.bet-three-quarters}}." }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "Im {{t:pot|Pot}} sind {{n:ex.pot}}. Welcher chancenlose {{t:bluff|Bluff}} braucht seltener einen {{t:fold|Fold}} deines Gegners: einer über {{n:ex.bet.quarter}} oder einer über {{n:ex.bet.pot}}?"
    options:
      - { text: "Über {{n:ex.bet.quarter}}: Es reichen über {{n:alpha.bet-quarter}} {{t:fold|Folds}}", correct: true, why: "Ein kleiner {{t:bluff|Bluff}} riskiert wenig: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}. Ein {{t:bluff|Bluff}} über den ganzen {{t:pot|Pot}} braucht über {{n:alpha.bet-pot}} {{t:fold|Folds}}." }
      - { text: "Über {{n:ex.bet.pot}}: Es reichen über {{n:alpha.bet-quarter}} {{t:fold|Folds}}", why: "Umgekehrt. Ein größerer Bet riskiert mehr, also muss dein Gegner öfter {{t:fold|folden}}: beim ganzen {{t:pot|Pot}} über {{n:alpha.bet-pot}}." }
      - { text: "Beide brauchen gleich viel", why: "Alpha hängt von der Größe ab: {{n:alpha.bet-quarter}} bei {{n:ex.bet.quarter}}, {{n:alpha.bet-pot}} bei {{n:ex.bet.pot}}." }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "River, dein Gegner {{t:bet|setzt}} 1/3 {{t:pot|Pot}}. Die {{t:mdf}} beträgt {{n:mdf.bet-third}}, und zum {{t:call|Callen}} brauchst du {{n:eq.bet-third}} Equity. Wie passen diese beiden Zahlen zusammen?"
    options:
      - { text: "Die {{t:mdf}} betrifft die gesamte {{t:range|Range}}, die Equity eine einzelne Hand", correct: true, why: "Die {{t:mdf}} sagt dir, welchen Anteil all deiner Hände du verteidigst, damit dein Gegner nicht mit beliebigen Karten {{t:bluff|bluffen}} kann. Die benötigte Equity sagt dir, ob sich ein {{t:call|Call}} mit einer bestimmten Hand lohnt gegen das, womit dein Gegner tatsächlich {{t:bet|setzt}}." }
      - { text: "Eine davon ist falsch berechnet", why: "Beide stimmen: {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}} und {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Sie beantworten verschiedene Fragen." }
      - { text: "Du {{t:call|callst}}, wenn du mindestens {{n:mdf.bet-third}} Equity hast", why: "Hier werden Begriffe vermischt. Zum {{t:call|Callen}} reichen {{n:eq.bet-third}} Equity. {{n:mdf.bet-third}} ist ein Anteil der {{t:range|Range}}, nicht die Chance einer einzelnen Hand." }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "Flop. Du verteidigst den {{t:big-blind|Big Blind}}, der Button {{t:bet|setzt}} einen C-Bet von 1/3 {{t:pot|Pot}}. Die {{t:mdf}} beträgt {{n:mdf.bet-third}}. Musst du wirklich so viele Hände verteidigen?"
    table: { position: BB }
    options:
      - { text: "Nein, du kannst etwas weniger verteidigen", correct: true, why: "Die {{t:mdf}} geht von einem {{t:bluff|Bluff}} ganz ohne Chancen aus. Auf dem Flop haben die {{t:bluff|Bluffs}} des Buttons noch Equity ({{t:draw|Draws}}, hohe Karten), und {{t:out-of-position|ohne Position}} realisierst du nicht die ganze Equity deiner schwachen Hände. Deshalb kannst du etwas weniger als die {{t:mdf}} verteidigen, aber auf einen kleinen C-Bet {{t:fold|foldest}} du nicht massenhaft." }
      - { text: "Ja, sonst macht der Button mit jeder Hand Gewinn", why: "Am River wäre das so. Auf dem Flop {{t:bluff|blufft}} der Button nicht mit einer chancenlosen Hand: Auch wenn du {{t:call|callst}}, kann er noch treffen. Die {{t:mdf}} ist ein Richtwert, keine Pflicht." }
      - { text: "Nein, du verteidigst mehr, weil es erst der Flop ist", why: "Umgekehrt. Die kommenden {{t:street|Streets}} wirken zugunsten des Setzenden {{t:in-position|in Position}}, also verteidigst du weniger, nicht mehr." }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "Ein Spieler, von dem du aus vielen früheren Händen weißt, dass er selten {{t:bluff|blufft}}, {{t:bet|setzt}} am River den ganzen {{t:pot|Pot}}. Du hast ein {{t:pair|Paar}} Könige mit schwachem Kicker. Was tust du?"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "Ich {{t:fold|folde}}", correct: true, why: "Aus vielen früheren Händen weißt du, dass dieser Spieler selten {{t:bluff|blufft}}. Wenn {{t:bluff|Bluffs}} fehlen, bezahlt dein {{t:pair|Paar}} vor allem bessere Hände (KQ, Sets). Gegen so einen Spieler {{t:fold|foldest}} du öfter, als die {{t:mdf}} vorgibt." }
      - { text: "Ich {{t:call|calle}}, weil ich laut {{t:mdf}} {{n:mdf.bet-pot}} verteidigen soll", why: "Die {{t:mdf}} schützt vor einem Spieler, der oft genug {{t:bluff|blufft}}. Dieser Spieler tut das nicht, also schenkst du ihm Geld, wenn du dich an die {{t:mdf}} hältst." }
      - { text: "Ich {{t:raise|raise}} all-in", why: "Bessere Hände bezahlen, schlechtere {{t:fold|folden}}. Ein {{t:pair|Paar}} mit schwachem Kicker ist keine Hand zum {{t:raise|Raisen}}." }
---
Wenn dein Gegner {{t:bet|setzt}}, fragst du nicht nur: „Kann diese Hand gewinnen?“ Du schaust auch auf alle Hände, die du in dieser Situation haben kannst, also auf deine {{t:range|Range}}. Zwei Zahlen sagen dir, wie viele davon du verteidigst und wie oft der {{t:bluff|Bluff}} deines Gegners funktionieren muss.

## Alpha: wie oft ein {{t:bluff|Bluff}} funktionieren muss

Ein chancenloser {{t:bluff|Bluff}} gewinnt nur, wenn dein Gegner {{t:fold|foldet}}. Du riskierst den Bet, um den {{t:pot|Pot}} zu gewinnen.

```formula
alpha = Bet ÷ (Pot + Bet)
```

Beispiel: Im {{t:pot|Pot}} sind {{n:ex.pot}}, du {{t:bet|setzt}} {{n:ex.bet.half}}. Alpha = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**. Wenn dein Gegner öfter {{t:fold|foldet}}, macht dein {{t:bluff|Bluff}} Gewinn, auch ganz ohne Hand.

## {{t:mdf}}: wie viel du verteidigen musst

Die {{t:mdf}} (minimale Verteidigungshäufigkeit) ist die Kehrseite von Alpha. Wenn du weniger Hände verteidigst ({{t:call|callst}} oder {{t:raise|raist}}), macht dein Gegner Gewinn, indem er mit beliebigen Karten {{t:bluff|blufft}}.

```formula
MDF = Pot ÷ (Pot + Bet)
```

Beispiel vom River: Im {{t:pot|Pot}} sind {{n:ex.third.pot}}, dein Gegner {{t:bet|setzt}} {{n:ex.third.bet}}, also 1/3 {{t:pot|Pot}}. {{t:mdf}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**.

| Bet des Gegners | {{t:mdf}} | Alpha | Benötigte Equity |
|---|---|---|---|
| 1/4 {{t:pot|Pot}} | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3 {{t:pot|Pot}} | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2 {{t:pot|Pot}} | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4 {{t:pot|Pot}} | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| Ganzer {{t:pot|Pot}} | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## {{t:mdf}} ist nicht die benötigte Equity

Die benötigte Equity aus M2 betrifft **eine einzelne Hand**: ob sich ein {{t:call|Call}} mit ihr lohnt. Die {{t:mdf}} betrifft **die gesamte {{t:range|Range}}**: welchen Anteil davon du verteidigst. Bei einem Bet von 1/3 {{t:pot|Pot}} am River legt dir die {{t:mdf}} nahe, etwa {{n:mdf.bet-third}} deiner Hände zu verteidigen, während sich ein einzelner {{t:call|Call}} lohnt, wenn die Hand in mindestens {{n:eq.bet-third}} der Fälle gewinnt.

## Auf dem Flop {{t:out-of-position|ohne Position}} verteidigst du weniger

Die {{t:mdf}} geht davon aus, dass der {{t:bluff|Bluff}} deines Gegners überhaupt keine Chancen hat. Am nächsten an der Wahrheit ist das am River, wo sich {{t:draw|Draws}} nicht mehr verbessern. Auf dem Flop haben {{t:bluff|Bluffs}} noch Equity: {{t:draw|Draws}} und hohe Karten können sich verbessern. Dazu kommt, dass du {{t:out-of-position|ohne Position}} nicht die ganze Equity deiner schwachen Hände realisierst. Deshalb kannst du auf dem Flop {{t:out-of-position|ohne Position}} weniger als die {{t:mdf}} verteidigen (auf Flops, die schlecht für den Verteidiger sind, deutlich weniger) und behandelst sie als Richtwert, nicht als Pflicht; auf kleine C-Bets {{t:fold|foldest}} du trotzdem nicht massenhaft. In einem Beispiel vom Turn verteidigte der Solver im Schnitt nahe an der {{t:mdf}}.

:::note Wenn dein Gegner selten {{t:bluff|blufft}}
Die {{t:mdf}} schützt dich vor einem Spieler, der oft genug {{t:bluff|blufft}}. Wenn du aus Beobachtung weißt, dass ein bestimmter Spieler mit großen Bets am River zu selten {{t:bluff|blufft}}, {{t:fold|foldest}} du gegen ihn öfter, als die {{t:mdf}} vorgibt: {{t:call|Callen}} mit einem schwächeren {{t:pair|Paar}} bezahlt vor allem bessere Hände. Das ist ein {{t:exploit|Exploit}}, keine Strategie gegen jeden (mehr dazu in Modul 10).
:::
