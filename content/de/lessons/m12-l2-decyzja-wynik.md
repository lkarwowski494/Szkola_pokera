---
id: m12.l2
module: m12
order: 2
title: "Entscheidung vs. Ergebnis"
sub: "Bewerte den Spielzug, nicht die River-Karte"
rules: [R-M12-004, R-M12-005]
drills:
  - kind: choice
    id: m12.l2.q-aa-kk
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Preflop bringst du deinen ganzen Stack mit einem {{t:pair|Paar}} Assen rein, dein Gegner {{t:call|callt}} mit einem {{t:pair|Paar}} Königen. Am River kommt ein König und du verlierst. Wie bewertest du deine Entscheidung?"
    options:
      - { text: "Sie war sehr gut", correct: true, why: "AA gewinnt gegen KK in ca. {{n:pf.aa-vs-kk}} der Fälle. Die Niederlage in ca. {{n:res.kk-wins}} ist der Preis des Spiels, kein Fehler. Du spielst jedes Mal genauso." }
      - { text: "Sie war schlecht, du hättest vorsichtiger spielen müssen", why: "Das ist Bewertung nach dem Ergebnis. Wäre die River-Karte eine andere gewesen, sähe dieselbe Entscheidung großartig aus. Die Entscheidung hängt davon ab, was du vor der Karte wusstest: ca. {{n:pf.aa-vs-kk}} Equity." }
      - { text: "Man kann sie nicht bewerten, weil du verloren hast", why: "Doch: Du berechnest die Equity im Moment der Entscheidung. Das Ergebnis einer einzelnen Hand fügt nichts hinzu." }
  - kind: numeric
    id: m12.l2.n-kk-wins
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "AA gewinnt gegen KK all-in preflop in ca. {{n:pf.aa-vs-kk}} der Fälle. In wie viel Prozent der Fälle verlierst du trotz der bestmöglichen Entscheidung? Gib eine Zahl ein."
    answer: res.kk-wins
    explanation: "Das Ganze minus {{n:pf.aa-vs-kk}} ergibt ca. {{n:res.kk-wins}}. Ungefähr jedes fünfte bis sechste Mal endet eine gute Entscheidung mit einer Niederlage."
  - kind: choice
    id: m12.l2.q-draw-good
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Du hast einen sauberen {{t:flush-draw|Flush-Draw}} ({{n:outs.flush}} Outs), im {{t:pot|Pot}} sind {{n:ex.pot}}, dein Gegner {{t:bet|setzt}} {{n:ex.bet.quarter}}. Du {{t:call|callst}}, der {{t:flush}} kommt nicht und du verlierst {{n:ex.bet.quarter}}. Wie bewertest du den {{t:call}}?"
    options:
      - { text: "Er war gut", correct: true, why: "Du brauchtest {{n:eq.bet-quarter}} Equity und hattest ca. {{n:odds.flush.turn-river}}. So ein {{t:call}} bringt langfristig Gewinn, auch wenn er in den meisten einzelnen Händen verliert." }
      - { text: "Er war schlecht, weil der {{t:flush}} nicht kam", why: "Der {{t:flush}} kommt nur in ca. {{n:odds.flush.turn-river}} der Fälle, also war das Verfehlen das wahrscheinlichste Ergebnis. Du bewertest die Entscheidung nach dem Preis, und der war gut." }
      - { text: "Gut nur dann, wenn der {{t:flush}} gekommen wäre", why: "Genau das ist Bewertung nach dem Ergebnis. Dieselbe Entscheidung ändert ihre Qualität nicht je nach der Karte, die später kam." }
  - kind: choice
    id: m12.l2.q-draw-bad
    family: m12.resulting
    rules: [R-M12-004]
    prompt: "Turn. Sauberer {{t:flush-draw|Flush-Draw}}, im {{t:pot|Pot}} sind {{n:ex.pot}}, dein Gegner {{t:bet|setzt}} den ganzen {{t:pot|Pot}}: {{n:ex.bet.pot}}. Du {{t:call|callst}} und der {{t:flush}} kommt am River. Wie bewertest du den {{t:call}}?"
    options:
      - { text: "Er war schlecht, trotz des Gewinns", correct: true, why: "Du brauchtest {{n:eq.bet-pot}} Equity und hattest ca. {{n:odds.flush.turn-river}}. Diesmal hast du gewonnen, aber bei vielen Wiederholungen verliert so ein {{t:call}}." }
      - { text: "Er war gut, weil du den {{t:pot|Pot}} gewonnen hast", why: "Ein Gewinn macht die Entscheidung nicht besser. Bei einem Preis von {{n:eq.bet-pot}} und einer Chance von ca. {{n:odds.flush.turn-river}} verliert dieser {{t:call}} langfristig." }
      - { text: "Er war gut, weil der {{t:flush}} die beste Hand ist", why: "Die Stärke der Hand nach dem Treffer ändert den Preis nicht. Entscheidend ist der Vergleich: {{n:odds.flush.turn-river}} Chance gegenüber {{n:eq.bet-pot}}, die du brauchst." }
  - kind: choice
    id: m12.l2.q-review
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Du analysierst eine verlorene Hand. Welche Frage ist die wichtigste?"
    options:
      - { text: "Hatte die Entscheidung mit den Informationen, die ich hatte, einen positiven {{t:expected-value|EV}}?", correct: true, why: "Das ist die einzige Frage, die einen Fehler von Pech unterscheidet. Du berechnest den Preis, die Equity gegen die {{t:range|Range}} des Gegners und das, was du im Moment der Entscheidung wusstest." }
      - { text: "Welche Karte hätte der Gegner bekommen, wenn ich {{t:fold|gefoldet}} hätte?", why: "Eine künftige Karte ändert die Qualität der Entscheidung nicht. Es zählt nur, was du damals wusstest." }
      - { text: "Wie viel habe ich in dieser Hand verloren?", why: "Die Höhe des Verlusts sagt etwas über den {{t:pot|Pot}}, nicht über die Entscheidung. Ein großer Verlust kann aus einer guten Entscheidung entstehen, ein kleiner aus einem Fehler." }
  - kind: choice
    id: m12.l2.q-outcome-bias
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Ein Freund fragt dich nach demselben Spielzug in zwei Händen: In einer hat er gewonnen, in der anderen verloren. Dir kommt es so vor, als hätte er beim ersten Mal besser gespielt. Was passiert hier?"
    options:
      - { text: "Das ist die Ergebnisverzerrung: Du bewertest die Entscheidung danach, wie sie ausgegangen ist", correct: true, why: "In psychologischen Studien bewerteten Menschen dieselbe Entscheidung besser, wenn das Ergebnis gut war, selbst wenn sie meinten, das Ergebnis sollte keine Rolle spielen. Es hilft, zu bewerten, bevor du das Ergebnis kennst." }
      - { text: "Die erste Entscheidung war besser, weil sie funktioniert hat", why: "Wenn der Spielzug derselbe ist, ist die Entscheidung dieselbe. Nur das Ergebnis unterscheidet sich, also der Zufall." }
      - { text: "Die zweite Entscheidung war besser, weil sie Demut lehrt", why: "Die Bewertung hängt in keine Richtung vom Ergebnis ab. Dieselbe Entscheidung hat dieselbe Qualität." }
  - kind: choice
    id: m12.l2.q-strategy-change
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Drei {{t:session|Sessions}} lang hast du aggressiver gespielt als sonst und gewonnen. Ist das ein Beweis, dass der neue Stil besser ist?"
    options:
      - { text: "Nein, drei {{t:session|Sessions}} sind zu wenig; du bewertest die neuen Spielzüge in der Handanalyse", correct: true, why: "Selbst ein riesiger Unterschied im Können (die besten {{n:skill.pct}} gegen die schwächsten {{n:skill.pct}}) geht erst nach ca. {{n:skill.hands}} Händen in ca. {{n:skill.ahead}} der Fälle in Führung. Der Unterschied zwischen deinen beiden Stilen ist viel kleiner." }
      - { text: "Ja, das Ergebnis zeigt, was funktioniert", why: "Das Ergebnis aus wenigen {{t:session|Sessions}} ist vor allem Rauschen. Bei einer {{t:standard-deviation|Standardabweichung}} von ca. {{n:var.sd}} lassen selbst {{n:var.hands.k}} Tausend Hände einen Fehler von ca. ± {{n:var.ci.wr}}." }
      - { text: "Ja, wenn du mehr als sonst gewonnen hast", why: "Ein größerer Gewinn aus einer kleinen Stichprobe ist immer noch eine kleine Stichprobe. Spielzüge bewertest du mit Rechnung und Handanalyse." }
  - kind: choice
    id: m12.l2.q-skill-hands
    family: m12.sample-size
    rules: [R-M12-005]
    prompt: "Eine Studie mit Millionen von Online-Händen hat gezeigt, wann Können beginnt, das Glück zu überwiegen. Was genau wurde gemessen?"
    options:
      - { text: "Die besten {{n:skill.pct}} der Spieler liegen nach ca. {{n:skill.hands}} Händen in ca. {{n:skill.ahead}} der Fälle vor den schwächsten {{n:skill.pct}}", correct: true, why: "So definieren es die Autoren der Studie (2015). Es ist ein Vergleich extremer Gruppen: Bei kleineren Unterschieden im Können braucht es deutlich mehr Hände." }
      - { text: "Nach ca. {{n:skill.hands}} Händen ist jeder gute Spieler im Plus", why: "Die Studie vergleicht extreme Spielergruppen und sagt nicht, wann ein einzelner guter Spieler im Plus ist. Das hängt von der Winrate und der {{t:standard-deviation|Standardabweichung}} ab (Lektion zur {{t:variance|Varianz}})." }
      - { text: "Nach ca. {{n:skill.hands}} Händen spielt Glück keine Rolle mehr", why: "Glück spielt immer eine Rolle. Die Studie sagt nur, wann der Vorsprung der Besten gegenüber den Schlechtesten beginnt, die Mehrheit der Vergleiche zu gewinnen." }
  - kind: choice
    id: m12.l2.q-good-session
    family: m12.decision-review
    rules: [R-M12-004]
    prompt: "Du hast eine {{t:session}} dank zweier Calls ohne guten Preis gewonnen, die am River getroffen haben. Was tust du nach der {{t:session}}?"
    options:
      - { text: "Du notierst diese {{t:call|Calls}} als Fehler, die du korrigieren musst", correct: true, why: "Ein Gewinn ändert den Preis nicht. Wenn der {{t:call}} mehr Equity erforderte, als du hattest, war er ein Fehler, auch wenn er sich ausgezahlt hat." }
      - { text: "Nichts, die {{t:session}} war gewonnen", why: "Fehler in gewonnenen {{t:session|Sessions}} sind genauso teuer, nur schwerer zu bemerken. Wer nur Niederlagen analysiert, übersieht die Hälfte der Fehler." }
      - { text: "Du gehst davon aus, dass du Gegner besser liest, als die Rechnung sagt", why: "Zwei Treffer sind zu wenig, um Schlüsse über das Lesen von Gegnern zu ziehen. Die einfachste Erklärung ist die {{t:variance|Varianz}}." }
---
Poker gibt dir Feedback, das oft lügt. Eine gute Entscheidung kann verlieren und eine schlechte gewinnen. Wenn du dein Spiel nach Ergebnissen bewertest, lernst du aus zufälligen Signalen.

## Resulting: Bewertung nach dem Ergebnis

Spieler nennen das *Resulting*: Du gehst davon aus, dass die Qualität des Ergebnisses dir etwas über die Qualität der Entscheidung sagt. Psychologen beschreiben dasselbe Phänomen als **Ergebnisverzerrung**. In einer klassischen psychologischen Studie (1988) bewerteten Menschen dieselbe Entscheidung als besser und die entscheidende Person als kompetenter, wenn das Ergebnis günstig war. Das taten sie sogar dann, wenn sie selbst meinten, das Ergebnis nicht berücksichtigen zu sollen.

## Auch gute Entscheidungen verlieren

All-in mit einem {{t:pair|Paar}} Assen gegen ein {{t:pair|Paar}} Könige ist die bestmögliche Entscheidung, und trotzdem verliert sie in ca. **{{n:res.kk-wins}}** der Fälle. Umgekehrt ist ein {{t:call}} mit einem {{t:flush-draw|Flush-Draw}} um den ganzen {{t:pot|Pot}} am Turn schlecht (du brauchst {{n:eq.bet-pot}}, hast ca. {{n:odds.flush.turn-river}}), und trotzdem gewinnt er ungefähr jedes fünfte Mal.

```formula
Entscheidungsqualität = EV mit den Informationen, die du im Moment der Entscheidung hattest
```

## So analysierst du eine Hand

1. Verdecke das Ergebnis. Bewerte nur, was du im Moment der Entscheidung wusstest.
2. Berechne Preis und Equity gegen die {{t:range|Range}} des Gegners (M2, M6).
3. Prüfe, ob der Spielzug zu den Regeln aus dem Kurs passt.
4. Analysiere auch gewonnene Hände: Fehler, die sich ausgezahlt haben, sind genauso teuer.

## Wann das Ergebnis etwas zu bedeuten beginnt

In einer Studie mit ca. {{n:skill.sample.m}} Mio. Online-Händen (Studie von 2015) begann Können erst nach ca. **{{n:skill.hands}}** Händen zu überwiegen. Das bedeutet, dass die besten {{n:skill.pct}} der Spieler in ca. {{n:skill.ahead}} der Vergleiche vor den schwächsten {{n:skill.pct}} lagen. Bei kleineren Unterschieden im Können braucht es ein Vielfaches an Händen. Das Ergebnis einiger {{t:session|Sessions}} sagt dir also nicht, welcher Spielstil besser ist.

:::note Bewertung in dieser App
Deshalb bewertet die App deine Entscheidungen und nicht das Ergebnis der Hand. Wenn Ergebnis und Entscheidung auseinandergehen, vertrau der Rechnung.
:::
