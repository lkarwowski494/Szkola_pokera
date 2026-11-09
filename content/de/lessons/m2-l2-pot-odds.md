---
id: m2.l2
module: m2
order: 2
title: "Pot Odds"
sub: "Wann sich ein Call lohnt"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Im {{t:pot|Pot}} liegen {{n:ex.third.pot}}. Dein Gegner {{t:bet|setzt}} {{n:ex.third.bet}}. Wie viel Equity brauchst du für einen {{t:call|Call}}?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Der {{t:pot|Pot}} nach dem {{t:bet|Einsatz}} beträgt {{n:ex.third.pot-after-bet}}, du zahlst {{n:ex.third.bet}} nach, zusammen {{n:ex.third.total}}. {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "So viel brauchst du bei einem {{t:bet|Einsatz}} in Höhe des {{t:pot|Pots}}. Hier beträgt der {{t:bet|Einsatz}} 1/3 des {{t:pot|Pots}}." }
      - { text: "{{n:eq.bet-third.no-call}}", why: "Das ist {{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}. Rechne auch deinen {{t:call|Call}} in den Nenner ein." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "Turn. Du hast einen {{t:flush-draw|Flush-Draw}}. Im {{t:pot|Pot}} liegen {{n:ex.pot}}, dein Gegner {{t:bet|setzt}} {{n:ex.bet.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "Du brauchst {{n:eq.bet-pot}}. Der {{t:flush|Flush}} bringt dir {{n:outs.flush}} Outs, also etwa {{n:odds.flush.turn-river}}. Selbst wenn du die {{n:pair.outs.per-rank}} Asse dazurechnest, die dir ein {{t:pair|Paar}} Asse geben (zusammen {{n:outs.flush-ace}} Outs, etwa {{n:odds.flush-ace.turn-river}}), ist das immer noch deutlich weniger als {{n:eq.bet-pot}}. Ein solcher {{t:call|Call}} verliert auf lange Sicht." }
      - { text: "{{t:call|Call}}", why: "Das ist verlockend, weil du einen {{t:draw|Draw}} auf den besten {{t:flush|Flush}} hast und auch ein Ass helfen kann, aber selbst etwa {{n:odds.flush-ace.turn-river}} ist weniger als {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Raise}} all-in", why: "Bei Fortgeschrittenen kann das ein Spielzug sein, aber ohne guten Grund riskierst du deinen ganzen Stack (alle {{t:chips|Chips}}, die vor dir liegen) mit einer Hand, die noch nichts hat." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "Dieselbe Hand, aber dein Gegner {{t:bet|setzt}} nur {{n:ex.bet.quarter}} in einen {{t:pot|Pot}} von {{n:ex.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "Du brauchst {{n:eq.bet-quarter}} und hast etwa {{n:odds.flush.turn-river}}, mit den Assen sogar noch mehr. Ein kleiner {{t:bet|Einsatz}} gibt dir einen guten Preis." }
      - { text: "{{t:fold|Fold}}", why: "Zu billig, um zu {{t:fold|folden}}: {{n:odds.flush.turn-river}} ist mehr als die benötigten {{n:eq.bet-quarter}}, mit den Assen sogar noch mehr." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Dein Gegner {{t:bet|setzt}} den halben {{t:pot|Pot}}. Wie viel Equity brauchst du?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|Pot}} {{n:ex.pot}}, {{t:bet|Einsatz}} {{n:ex.bet.half}}. Du zahlst {{n:ex.bet.half}} nach, bei insgesamt {{n:ex.half.total}}, also {{n:eq.bet-half}}." }
      - { text: "{{n:ex.wrong.half}}", why: "Häufiger Fehler: {{n:ex.wrong.half}} ist der {{t:bet|Einsatz}} geteilt durch den {{t:pot|Pot}} vor dem {{t:bet|Einsatz}} ({{n:ex.bet.half}} ÷ {{n:ex.pot}}). Die Nachzahlung teilst du durch den ganzen {{t:pot|Pot}} nach deinem {{t:call|Call}}: {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}." }
      - { text: "{{n:eq.bet-pot}}", why: "So viel brauchst du bei einem {{t:bet|Einsatz}} in Höhe des ganzen {{t:pot|Pots}}." }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.n1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    params: { answer: numeric }
    count: 2
  - kind: numeric
    id: m2.l2.n2
    family: m2.pot-odds
    rules: [R-M2-004]
    prompt: "Dein Gegner {{t:bet|setzt}} den ganzen {{t:pot|Pot}}. Wie viel Prozent Equity brauchst du für einen {{t:call|Call}}? Gib eine Zahl ein."
    answer: eq.bet-pot
    explanation: "{{t:pot|Pot}} {{n:ex.pot}}, {{t:bet|Einsatz}} {{n:ex.bet.pot}}. Du zahlst {{n:ex.bet.pot}} in einen {{t:pot|Pot}}, der nach deinem {{t:call|Call}} {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}} beträgt. Du teilst die Nachzahlung durch den ganzen {{t:pot|Pot}}: {{n:eq.bet-pot}}, also ein Drittel."
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
Wenn dein Gegner {{t:bet|setzt}} und du einen {{t:draw|Draw}} hast, lautet die Frage: Ist der Preis gut? Du vergleichst zwei Zahlen: **wie oft du gewinnen musst** und **wie oft du tatsächlich gewinnst**.

:::note Equity und Trefferchance
**Equity** ist dein Anteil am {{t:pot|Pot}}: wie oft du gewinnst, wenn die Hand ohne weitere {{t:bet|Einsätze}} zum Showdown kommt. Die **Trefferchance** aus der Lektion über Outs ist nur die Wahrscheinlichkeit, dass ein Out kommt. Bei einem reinen {{t:draw|Draw}}, der nur gewinnt, wenn er ankommt, ist die Trefferchance auf den Karten, die du für diesen Preis tatsächlich siehst, eine Näherung für die Equity. Bei einem {{t:bet|Einsatz}} auf dem Flop ist das die Chance für eine Karte, nicht bis zum River.
:::

## Wie oft du gewinnen musst

```formula
benötigte Equity = Call ÷ Pot nach deinem Call
Pot nach deinem Call = Pot vor dem Einsatz + Einsatz + Call
```

Beispiel: Im {{t:pot|Pot}} liegen {{n:ex.pot}}, dein Gegner {{t:bet|setzt}} {{n:ex.bet.half}}. Der {{t:pot|Pot}} beträgt jetzt {{n:ex.half.pot-after-bet}}, du zahlst {{n:ex.bet.half}} nach, also beträgt der {{t:pot|Pot}} nach deinem {{t:call|Call}} {{n:ex.half.total}}. Du brauchst {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**.

## Kurzer Spickzettel

| {{t:bet|Einsatz}} des Gegners | Benötigte Equity |
|---|---|
| Ganzer {{t:pot|Pot}} | {{n:eq.bet-pot}} |
| Halber {{t:pot|Pot}} | {{n:eq.bet-half}} |
| Ein Viertel des {{t:pot|Pots}} | {{n:eq.bet-quarter}} |

:::note Entscheidung
Ist deine Equity höher als die benötigte, {{t:call|callst}} du. Ist sie niedriger, {{t:fold|foldest}} du. Das folgt aus dem {{t:expected-value|Erwartungswert}}: {{t:expected-value|EV}} eines {{t:call|Calls}} = Equity × {{t:pot|Pot}} nach deinem {{t:call|Call}} − {{t:call|Call}}, und das ist genau dann negativ, wenn die Equity kleiner als die benötigte ist. Diese eine Rechnung beseitigt die meisten teuren Anfängerfehler. Vorerst lässt du {{t:implied-odds|Implied Odds}} außen vor, also die {{t:chips|Chips}}, die du später in der Hand zu gewinnen erwartest, wenn du deine Hand triffst; sie kommen in späteren Modulen wieder.
:::
