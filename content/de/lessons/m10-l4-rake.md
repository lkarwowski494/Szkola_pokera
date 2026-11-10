---
id: m10.l4
module: m10
order: 4
title: "Rake"
sub: "Was das Spielen kostet und was das an deinen Entscheidungen ändert"
rules: [R-M10-013, R-M10-014, R-M10-015]
drills:
  - kind: choice
    id: m10.l4.q-rake-vs-wr
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Du spielst NL10 6-max in einem der großen Online-Pokerräume. Wie groß ist der {{t:rake}} im Vergleich zur Winrate eines typischen Gewinnspielers auf niedrigen {{t:stakes|Limits}}?"
    options:
      - { text: "Ein Mehrfaches davon: ca. {{n:rake.micro.low}}–{{n:rake.micro.high}} gegenüber {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "Rechnet man die Rake-Tabellen der Pokerräume in bb/100 um, ergeben sich auf den Mikrolimits ca. {{n:rake.micro.low}}–{{n:rake.micro.high}}. Ein Gewinnspieler muss seine Gegner um mehr schlagen, als der {{t:rake}} beträgt, und erst der Überschuss ist seine Winrate." }
      - { text: "Ungefähr gleich groß", why: "Der {{t:rake}} beträgt auf den Mikrolimits ca. {{n:rake.micro.low}}–{{n:rake.micro.high}}, die typische Winrate {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}. Der Unterschied beträgt ein Mehrfaches." }
      - { text: "Vernachlässigbar klein, weil der Pokerraum nur ein paar Prozent des {{t:pot|Pots}} nimmt", why: "Ein paar Prozent aus jedem {{t:pot|Pot}} nach dem Flop summieren sich auf ca. {{n:rake.micro.low}}–{{n:rake.micro.high}}. Das ist mehr, als ein typischer Gewinnspieler gewinnt." }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "In einem Bericht über die Spielerpopulation im 6-max-Cashgame verliert jeder NL100-Spieler im Schnitt {{n:rake.pop.nl100.loss}}. Woher kommt dieser Verlust?"
    options:
      - { text: "Das ist der {{t:rake}}: Ohne ihn kämen die Spieler insgesamt bei null heraus", correct: true, why: "Die Spieler spielen gegeneinander, also verliert der eine, was der andere gewinnt. Im Schnitt verlieren alle nur das, was der Pokerraum einnimmt. Der Autor: „your biggest villain is the house“." }
      - { text: "Daher, dass die meisten Spieler schlecht spielen", why: "Schlechtes Spiel verschiebt Geld von schwächeren zu besseren Spielern, ändert aber nicht den Durchschnitt. Den Durchschnitt senkt nur der {{t:rake}}." }
      - { text: "Aus der {{t:variance|Varianz}}: Bei einer größeren Stichprobe kommt null heraus", why: "Die {{t:variance|Varianz}}, also die Streuung der Ergebnisse um den {{t:expected-value|Erwartungswert}}, wirkt auf die Ergebnisse einzelner Spieler in beide Richtungen. Der Durchschnitt der gesamten Population ist negativ, weil alle {{t:rake}} zahlen." }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Laut einer Schätzung des Autors derselben Daten (mit bayesscher Korrektur) gewinnen unter den Spielern mit mindestens {{n:rake.pop.reg.hands}} Händen ca. {{n:rake.pop.reg.prerake}} vor Abzug des {{t:rake|Rakes}}. Wie viele gewinnen nach dem Abzug?"
    options:
      - { text: "Ca. {{n:rake.pop.reg.postrake}}", correct: true, why: "Der {{t:rake}} nimmt fast die Hälfte der Gewinner weg: ca. {{n:rake.pop.reg.prerake}} vor Rake, ca. {{n:rake.pop.reg.postrake}} danach. Deshalb rechnest du die Winrate immer nach Rake." }
      - { text: "Fast genauso viele, ca. {{n:rake.pop.reg.prerake}}", why: "Wäre der {{t:rake}} klein, wäre das so. Bei einigen bb/100 Rake rutschen viele Spieler, die vor Rake gewinnen, unter null." }
      - { text: "Fast niemand", why: "Übertrieben: Ca. {{n:rake.pop.reg.postrake}} dieser Gruppe gewinnen weiterhin. Der {{t:rake}} ist ein großes Hindernis, versperrt aber nicht den Weg zum Gewinnen." }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "Warum ist der {{t:rake}} in bb/100 bei NL500 um ein Mehrfaches kleiner ({{n:rake.nl500.low}}–{{n:rake.nl500.high}}) als auf den Mikrolimits?"
    options:
      - { text: "Weil größere {{t:pot|Pots}} häufiger das {{t:rake-cap|Rake-Cap}} erreichen, das dort in bb klein ist", correct: true, why: "Der Pokerraum nimmt einen Prozentsatz des {{t:pot|Pots}}, aber nicht mehr als eine Obergrenze in Dollar. Auf den Mikrolimits entspricht diese Obergrenze vielen bb und {{t:pot|Pots}} erreichen sie selten, also zahlst du den vollen Prozentsatz. Bei NL500 ist dieselbe Obergrenze ein Bruchteil eines bb." }
      - { text: "Weil der Pokerraum bei NL500 einen kleineren Prozentsatz nimmt", why: "Der Prozentsatz ist oft ähnlich (ca. {{n:rake.ex.pct}}). Den Unterschied macht das {{t:rake-cap|Rake-Cap}}, das auf hohen {{t:stakes|Limits}} die Gebühr bei großen {{t:pot|Pots}} kappt." }
      - { text: "Weil bei NL500 weniger Hände pro Stunde gespielt werden", why: "bb/100 misst den {{t:rake}} pro 100 Hände, also ändert ihn das Spieltempo nicht. Ihn ändert das in bb ausgedrückte {{t:rake-cap|Rake-Cap}}." }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Im {{t:pot|Pot}} sind {{n:ex.pot}}, dein Gegner {{t:bet|setzt}} {{n:ex.bet.half}}. Der Pokerraum nimmt {{n:rake.ex.pct}} des {{t:pot|Pots}}, ein {{t:rake-cap|Rake-Cap}} ist nicht in Reichweite. Wie viel Equity brauchst du, um zu {{t:call|callen}}? Gib einen Prozentwert ein."
    answer: eq.bet-half.rake
    explanation: "Nach deinem {{t:call}} sind {{n:ex.half.total}} im {{t:pot|Pot}}, nach Abzug des Rakes bleiben {{n:rake.ex.pot-after}}. Du zahlst {{n:ex.bet.half}}, also brauchst du {{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}} statt {{n:eq.bet-half}} ohne Rake."
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Ohne {{t:rake}} braucht ein {{t:call}} gegen eine Bet von einem halben {{t:pot|Pot}} {{n:eq.bet-half}} Equity. Wie viel braucht er bei einem {{t:rake}} von {{n:rake.ex.pct}}?"
    options:
      - { text: "Etwas mehr: ca. {{n:eq.bet-half.rake}}", correct: true, why: "Du gewinnst den {{t:pot|Pot}} abzüglich des {{t:rake|Rakes}}, zahlst aber den vollen Betrag. Eine Hand knapp über der Schwelle ohne Rake kann mit Rake schon darunter liegen." }
      - { text: "Gleich viel, weil beide Spieler {{t:rake}} zahlen", why: "Der {{t:rake}} wird vom {{t:pot|Pot}} abgezogen, den du gewinnst, nicht von dem Betrag, den du zahlst. Die Schwelle steigt auf ca. {{n:eq.bet-half.rake}}." }
      - { text: "Weniger, weil der {{t:pot}} größer ist", why: "Der {{t:pot}} ist nach Rake kleiner, nicht größer, also brauchst du mehr Equity: ca. {{n:eq.bet-half.rake}}." }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Du spielst in einem Pokerraum, der {{t:rake}} nur von {{t:pot|Pots}} nimmt, die den Flop erreichen. Jemand vor dir {{t:open|eröffnet}}, du bist in {{t:position}} mit einer Hand, die ohne Rake ein knapper {{t:call}} wäre. Was ändert der {{t:rake}}?"
    options:
      - { text: "Ich {{t:call|calle}} seltener: Grenzhände für einen {{t:call}} {{t:fold|folde}} ich öfter oder 3-bette sie", correct: true, why: "In veröffentlichten Solver-Lösungen mit Rake spielen Spieler in {{t:position}} gegen ein {{t:open}} ca. {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} weniger Hände. Es verliert der {{t:call}} selbst, denn ein {{t:pot}} nach dem Flop zahlt {{t:rake}}, ein mit einer 3-Bet vor dem Flop gewonnener {{t:pot}} nicht." }
      - { text: "Nichts: Der {{t:rake}} betrifft nur das Spiel nach dem Flop", why: "Genau deshalb ändert er die Entscheidung vor dem Flop: Ein {{t:call}} führt zum Flop und zum Rake, eine 3-Bet oder ein {{t:fold}} beendet die Hand oft ohne ihn." }
      - { text: "Ich {{t:call|calle}} öfter, weil die {{t:pot|Pots}} nach dem Flop groß sind", why: "Umgekehrt: Der {{t:rake}} nimmt einen Teil genau dieser {{t:pot|Pots}}. Der Solver mit Rake {{t:call|callt}} deutlich seltener." }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "In denselben Solver-Lösungen {{t:call|callt}} der {{t:big-blind}} einen Min-Raise im Spiel mit Rake nur in ca. {{n:rake.solver.bb-minraise}} der Fälle, in denen er ihn ohne Rake {{t:call|callt}}. Was folgt daraus für dich im {{t:big-blind|Big Blind}}?"
    options:
      - { text: "Ich verteidige weiterhin viele Hände, aber enger als in Tabellen, die ohne Rake berechnet wurden", correct: true, why: "Der {{t:big-blind}} verteidigt weiterhin oft, weil er schon {{t:chips}} im {{t:pot|Pot}} hat und die Action schließt. Der {{t:rake}} schneidet aber die schwächsten {{t:call|Calls}} ab, also sind Tabellen ohne Rake für dich zu weit." }
      - { text: "Ich verteidige den {{t:big-blind|Big Blind}} nicht mehr per {{t:call}}", why: "Nein: Laut dem Autor bleibt {{t:call|Callen}} aus den Blinds auch mit Rake ein wichtiger Teil der Strategie. Es ändert sich, wie weit du verteidigst, nicht, ob du verteidigst." }
      - { text: "Ich verteidige genauso weit, weil der {{t:rake}} im {{t:big-blind|Big Blind}} keine Rolle spielt", why: "Doch, er spielt eine Rolle: Nach einem {{t:call}} erreicht der {{t:pot}} den Flop und zahlt {{t:rake}}. Deshalb {{t:call|callt}} der Solver aus dem {{t:big-blind|Big Blind}} seltener." }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "In manchen Pokerräumen wird {{t:rake}} auch von {{t:pot|Pots}} mit 3-Bet genommen, die vor dem Flop enden. Was ändert das am Argument „Eine 3-Bet zahlt keinen Rake“?"
    options:
      - { text: "In so einem Pokerraum wird das Argument schwächer: Auch die 3-Bet zahlt, also ist der Vorteil einer 3-Bet gegenüber einem {{t:call}} kleiner", correct: true, why: "Das Solver-Ergebnis gilt für die Struktur „no flop, no drop“, in der ein {{t:pot}} ohne Flop rakefrei ist. In so einem Pokerraum gilt diese Regel nur für {{t:pot|Pots}} ohne 3-Bet, also verliert ein {{t:call}} weiterhin durch den Rake, aber auch eine 3-Bet ist nicht davon befreit." }
      - { text: "Nichts, weil der {{t:rake}} bei einer 3-Bet vernachlässigbar ist", why: "Das wissen wir ohne Rechnung für den konkreten Pokerraum nicht. Sicher ist nur, dass die 3-Bet nicht mehr rakefrei ist." }
      - { text: "In so einem Pokerraum sollte man immer {{t:call|callen}} statt zu 3-betten", why: "Ein {{t:call}} führt zum Flop und zahlt {{t:rake}} genauso wie vorher. Es ändert sich nur, dass auch die 3-Bet zahlt." }
---
Der {{t:rake}} ist die Gebühr, die der Pokerraum aus dem {{t:pot|Pot}} nimmt. Die Spieler spielen gegeneinander, also kämen sie ohne {{t:rake}} insgesamt bei null heraus. Mit Rake verliert der durchschnittliche Spieler genau so viel, wie der Pokerraum einnimmt, und ein Gewinnspieler muss seine Gegner um mehr schlagen, als der {{t:rake}} beträgt.

## Was es kostet

Der Pokerraum nimmt einen Prozentsatz des {{t:pot|Pots}}, aber nicht mehr als das {{t:rake-cap|Rake-Cap}} in Dollar. In den zwei größten Online-Pokerräumen sind das bei NL2–NL10 {{n:rake.ex.pct}} des {{t:pot|Pots}}. Auf den Mikrolimits erreichen {{t:pot|Pots}} das Cap selten, also zahlst du den vollen Prozentsatz.

Ein Vergleich der Rake-Tabellen rechnet sie anhand der Verteilung der {{t:pot|Pots}} aus mehreren Millionen Händen in bb/100 um:

| {{t:stakes|Limit}} (6-max, zwei größte Online-Pokerräume) | {{t:rake}} |
|---|---|
| NL2–NL25 | ca. {{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | ca. {{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

Ein typischer Gewinnspieler auf niedrigen {{t:stakes|Limits}} hat eine Winrate von {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}} (Modul 12): um ein Mehrfaches weniger, als er an den Pokerraum zahlt. Auf höheren {{t:stakes|Limits}} ist dasselbe Cap in Dollar nur ein Bruchteil eines bb, also sinkt der {{t:rake}} in bb/100.

Die Daten zur Spielerpopulation sagen dasselbe. In einem Bericht über die Population (6-max-Cashgame, NL10–NL500) verliert jeder Spieler im Schnitt {{n:rake.pop.nl10.loss}} bei NL10, {{n:rake.pop.nl100.loss}} bei NL100 und {{n:rake.pop.nl500.loss}} bei NL500. Unter den NL100-Spielern mit mindestens {{n:rake.pop.reg.hands}} Händen gewinnen laut Schätzung des Autors (bayessche Korrektur) ca. {{n:rake.pop.reg.prerake}} vor Abzug des Rakes und ca. {{n:rake.pop.reg.postrake}} nach dem Abzug (in den Rohdaten {{n:rake.pop.reg.prerake.raw}} und {{n:rake.pop.reg.postrake.raw}}).

## Die Schwelle für einen {{t:call}} mit Rake

Du gewinnst den {{t:pot|Pot}} abzüglich des {{t:rake|Rakes}}, zahlst aber den vollen Betrag. Die benötigte Equity aus Modul 2 steigt:

```formula
benötigte Equity = zu zahlender Betrag ÷ ({{t:pot}} nach dem {{t:call}} × (1 − {{t:rake}}))
```

Eine Bet von {{n:ex.bet.half}} in einen {{t:pot|Pot}} von {{n:ex.pot}}: Ohne Rake brauchst du {{n:eq.bet-half}}, bei {{n:rake.ex.pct}} Rake {{n:eq.bet-half.rake}}. Der Unterschied ist in einer einzelnen Hand klein, betrifft aber jeden {{t:pot|Pot}} nach dem Flop.

## Was der {{t:rake}} vor dem Flop ändert

In vielen Pokerräumen wird {{t:rake}} nur von {{t:pot|Pots}} genommen, die den Flop erreichen („no flop, no drop“). Dann ist ein vor dem Flop gewonnener {{t:pot}} rakefrei, während ein {{t:pot}} nach einem {{t:call}} zahlt. In veröffentlichten NL100-Solver-Lösungen mit Rake gilt:

- Spieler in {{t:position}} gegen ein {{t:open}} spielen ca. {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} weniger Hände; es verliert vor allem der {{t:call}}, und es gibt etwas mehr 3-Bets;
- der {{t:big-blind}} {{t:call|callt}} einen Min-Raise nur in ca. {{n:rake.solver.bb-minraise}} der Fälle, in denen er es ohne Rake tut, obwohl die Verteidigung aus den Blinds weiterhin auf dem {{t:call|Callen}} beruht.

Aus demselben Grund {{t:raise|raist}} oder {{t:fold|foldest}} du in Modul 3 aus dem {{t:small-blind|Small Blind}}, ohne zum {{t:big-blind|Big Blind}} aufzufüllen. Manche Pokerräume nehmen {{t:rake}} auch von {{t:pot|Pots}} mit 3-Bet, die vor dem Flop enden; dort ist eine 3-Bet nicht rakefrei.

:::note Quellen
Höhe des Rakes: Vergleich des Rakes von Online-Pokerräumen aus dem Jahr 2026 (Rake-Tabellen der zwei größten Pokerräume, in bb/100 umgerechnet, abgerufen am 5. Oktober 2026); andere Pokerräume haben andere Zahlen. Verlust der Population: unabhängiger Bericht über die Spielerpopulation (6-max-NLHE-Cashgame, Pokerräume mit Hand-Tracking-Datenbanken, Spieler mit mindestens 100 Händen; Pokerräume und Zeitraum nennt der Autor nicht). Einfluss des Rakes auf das Spiel vor dem Flop: veröffentlichter Artikel über Raise-Größen vor dem Flop, Solver-Lösungen für Stacks von {{n:rake.solver.depth}}; der Autor schreibt, dass sich die Schlussfolgerungen weitgehend auf andere Formate übertragen lassen, für einen Stack von {{n:format.stack}} ist das also eine Vereinfachung. Die Equity-Schwelle ist eine Rechnung.
:::
