---
id: m12.l1
module: m12
order: 1
title: "Varianz in Zahlen"
sub: "Was ein Ergebnis aus Tausenden Händen aussagt"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Du gewinnst im Schnitt {{n:var.wr.ex}} und spielst {{n:var.hands.k}} Tsd. Hände. Wie viele {{t:buy-in|Buy-ins}} (je {{n:format.stack}}) beträgt dein erwartetes Ergebnis? Gib eine Zahl ein."
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}} Tsd. Hände sind {{n:var.blocks}} Blöcke zu je 100 Händen. Erwartetes Ergebnis = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, also {{n:var.exp.bi}} {{t:buy-in|Buy-ins}}. Das ist ein Durchschnitt: Dein tatsächliches Ergebnis kann weit davon abweichen."
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Die {{t:standard-deviation|Standardabweichung}} deines Spiels beträgt {{n:var.sd}}. Wie groß ist die {{t:standard-deviation|Standardabweichung}} des Ergebnisses nach {{n:var.hands.k}} Tsd. Händen ({{n:var.blocks}} Blöcke zu je 100 Händen)?"
    options:
      - { text: "Ca. {{n:var.sd.result.bi}} {{t:buy-in|Buy-ins}}", correct: true, why: "Die {{t:standard-deviation|Standardabweichung}} wächst mit der Wurzel aus der Zahl der Blöcke: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, also ca. {{n:var.sd.result.bi}} {{t:buy-in|Buy-ins}}." }
      - { text: "Ca. {{n:var.sd.wrong.bi}} {{t:buy-in|Buy-ins}}", why: "Das kommt heraus, wenn du die {{t:standard-deviation|Standardabweichung}} mit der Zahl der Blöcke multiplizierst. Zufällige Schwankungen heben sich teilweise auf, deshalb multiplizierst du mit der Wurzel: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}." }
      - { text: "Ca. {{n:var.exp.bi}} {{t:buy-in|Buy-ins}}", why: "Das ist das erwartete Ergebnis bei {{n:var.wr.ex}}, nicht seine {{t:standard-deviation|Standardabweichung}}. Die {{t:standard-deviation|Standardabweichung}} beträgt ca. {{n:var.sd.result.bi}} {{t:buy-in|Buy-ins}}." }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Du gewinnst {{n:var.wr.ex}} bei einer {{t:standard-deviation|Standardabweichung}} von {{n:var.sd}}. In welchem Bereich liegt dein Ergebnis nach {{n:var.hands.k}} Tsd. Händen mit ca. {{n:var.conf95}} Sicherheit?"
    options:
      - { text: "Von ca. {{n:var.ci.low.bi}} bis ca. {{n:var.ci.high.bi}} {{t:buy-in|Buy-ins}}", correct: true, why: "Erwartetes Ergebnis {{n:var.exp.bi}} {{t:buy-in|Buy-ins}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Selbst ein klar gewinnender Spieler kann nach {{n:var.hands.k}} Tsd. Händen fast bei null stehen." }
      - { text: "Von ca. {{n:var.ci68.low.bi}} bis ca. {{n:var.ci68.high.bi}} {{t:buy-in|Buy-ins}}", why: "Das ist der Bereich von einer {{t:standard-deviation|Standardabweichung}}: Er umfasst nur ca. 2 von 3 Ergebnissen. Für {{n:var.conf95}} nimmst du {{n:var.z95}} {{t:standard-deviation|Standardabweichungen}}: von ca. {{n:var.ci.low.bi}} bis ca. {{n:var.ci.high.bi}}." }
      - { text: "Genau {{n:var.exp.bi}} {{t:buy-in|Buy-ins}}", why: "Das ist nur der Durchschnitt. Das Ergebnis schwankt um mehrere Dutzend {{t:buy-in|Buy-ins}} in beide Richtungen darum." }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Nach {{n:var.hands.k}} Tsd. Händen ({{n:var.blocks}} Blöcke zu je 100) bei einer {{t:standard-deviation|Standardabweichung}} von {{n:var.sd}}: Wie groß ist der Standardfehler deiner Winrate in bb/100? Nimm √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}} an. Gib eine Zahl ein."
    answer: var.se.wr
    explanation: "Standardfehler = SD ÷ √(Zahl der Blöcke) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. Der Bereich für {{n:var.conf95}} ist ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}."
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "Nach {{n:var.hands.k}} Tsd. Händen ist dein Ergebnis {{n:var.wr.ex}}, {{t:standard-deviation|Standardabweichung}} {{n:var.sd}}. Was weißt du über deine wahre Winrate?"
    options:
      - { text: "Mit ca. {{n:var.conf95}} Sicherheit liegt sie zwischen ca. {{n:var.wr.ci.low}} und ca. {{n:var.wr.ci.high}}", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Nach {{n:var.hands.k}} Tsd. Händen weißt du nur, dass du eher nicht verlierst." }
      - { text: "Sie beträgt {{n:var.wr.ex}}, weil die Stichprobe groß ist", why: "{{n:var.hands.k}} Tsd. Hände klingen nach viel, aber bei einer {{t:standard-deviation|Standardabweichung}} von {{n:var.sd}} beträgt der Fehler immer noch ca. ± {{n:var.ci.wr}}." }
      - { text: "Nichts, Ergebnisse im Poker sind reines Glück", why: "Übertrieben. Die Stichprobe verengt den Bereich, nur langsam: Der Fehler sinkt mit der Wurzel aus der Zahl der Hände." }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Du willst deine Winrate auf ± {{n:var.target}} genau kennen, mit {{n:var.conf95}} Sicherheit. Die {{t:standard-deviation|Standardabweichung}} beträgt {{n:var.sd}}. Wie viele Hände brauchst du?"
    options:
      - { text: "Ca. {{n:var.need.hands.k}} Tsd.", correct: true, why: "Blöcke = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. Das sind ca. {{n:var.need.hands.k}} Tsd. Hände." }
      - { text: "Ca. {{n:var.hands.k}} Tsd.", why: "Nach {{n:var.hands.k}} Tsd. Händen beträgt der Fehler ca. ± {{n:var.ci.wr}}. Um ihn auf ± {{n:var.target}} zu senken, brauchst du ca. {{n:var.need.hands.k}} Tsd. Hände." }
      - { text: "Ca. {{n:var.need.blocks}} Hände", why: "Das ist die Zahl der Blöcke zu je 100 Händen. Hände sind es hundertmal mehr: ca. {{n:var.need.hands.k}} Tsd." }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Ein Spieler gewinnt {{n:var.wr.ex}} bei einer {{t:standard-deviation|Standardabweichung}} von {{n:var.sd}}. Wie oft erlebt er innerhalb von {{n:var.hands.k}} Tsd. Händen einen {{t:downswing}} von mindestens {{n:dd.bi.small}} {{t:buy-in|Buy-ins}} vom Höchststand?"
    options:
      - { text: "Fast immer, ca. {{n:dd.p.small.100k}}", correct: true, why: "Eine Simulation von {{n:var.hands.k}} Tsd. Händen mit diesen Parametern ergibt einen solchen {{t:downswing}} in ca. {{n:dd.p.small.100k}} der Durchläufe. Ein {{t:downswing|Downswing}} von {{n:dd.bi.small}} {{t:buy-in|Buy-ins}} ist ein normaler Teil im Spiel eines gewinnenden Spielers." }
      - { text: "In ca. {{n:dd.p.small.20k}} der Fälle", why: "So viel ergibt sich für eine kürzere Stichprobe, {{n:dd.hands.short.k}} Tsd. Hände. In {{n:var.hands.k}} Tsd. Händen gibt es viel mehr Gelegenheiten für einen tiefen {{t:downswing}}: ca. {{n:dd.p.small.100k}}." }
      - { text: "Selten, ca. {{n:var.p.lose}}", why: "So selten beendet ein Spieler mit {{n:var.wr.ex}} {{n:var.hands.k}} Tsd. Hände im Minus. Ein {{t:downswing|Downswing}} unterwegs ist etwas anderes: Er kommt fast immer vor." }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Zwei Spieler, {{t:standard-deviation|Standardabweichung}} {{n:var.sd}}, {{n:var.hands.k}} Tsd. Hände. Einer gewinnt {{n:var.wr.ex}}, der andere {{n:dd.wr-low}}. Wie oft gerät jeder von ihnen in einen {{t:downswing}} von {{n:dd.bi.big}} {{t:buy-in|Buy-ins}}?"
    options:
      - { text: "Der erste in ca. {{n:dd.p.big.100k}}, der zweite in ca. {{n:dd.p.big.100k.wr-low}} der Fälle", correct: true, why: "Eine niedrigere Winrate zieht das Ergebnis schwächer nach oben, daher sind {{t:downswing|Downswings}} tiefer und häufiger. Bei {{n:dd.wr-low}}, typisch für gewinnende Spieler auf Mikrolimits, kommt ein {{t:downswing}} von {{n:dd.bi.big}} {{t:buy-in|Buy-ins}} in mehr als der Hälfte der Stichproben vor." }
      - { text: "Beide gleich oft, weil die {{t:standard-deviation|Standardabweichung}} gleich ist", why: "Die {{t:standard-deviation|Standardabweichung}} bestimmt die Schwankungen, die Winrate aber, wie schnell sich das Ergebnis von ihnen absetzt. Bei {{n:dd.wr-low}} kommt ein {{t:downswing}} von {{n:dd.bi.big}} {{t:buy-in|Buy-ins}} in ca. {{n:dd.p.big.100k.wr-low}} der Stichproben vor, bei {{n:var.wr.ex}} in ca. {{n:dd.p.big.100k}}." }
      - { text: "Keiner: Einen {{t:downswing}} von {{n:dd.bi.big}} {{t:buy-in|Buy-ins}} erleben nur verlierende Spieler", why: "Stimmt nicht. Selbst ein Spieler mit {{n:var.wr.ex}} erlebt ihn in ca. {{n:dd.p.big.100k}} der Stichproben von {{n:var.hands.k}} Tsd. Händen." }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Seit einem Monat liegst du {{n:dd.bi.small}} {{t:buy-in|Buy-ins}} im Minus. Was folgt daraus?"
    options:
      - { text: "Der {{t:downswing}} allein entscheidet nichts; du gehst deine Entscheidungen in verlorenen Händen durch", correct: true, why: "Ein {{t:downswing|Downswing}} von {{n:dd.bi.small}} {{t:buy-in|Buy-ins}} innerhalb von {{n:var.hands.k}} Tsd. Händen trifft fast jeden Spieler, der zwischen {{n:dd.wr-low}} und {{n:var.wr.ex}} gewinnt (Simulation bei SD {{n:var.sd}}). Ob du gut spielst, zeigt die Analyse deiner Entscheidungen, nicht das Ergebnis allein." }
      - { text: "Du spielst schlecht und musst deinen ganzen Spielstil ändern", why: "{{t:downswing|Downswings}} dieser Größe erleben Spieler mit {{n:var.wr.ex}} (SD {{n:var.sd}}) in ca. {{n:dd.p.small.100k}} der Stichproben von {{n:var.hands.k}} Tsd. Händen. Den Stil nur wegen des Ergebnisses zu ändern heißt, auf Rauschen zu reagieren." }
      - { text: "Du hast sicher Pech und musst nichts analysieren", why: "Ein {{t:downswing|Downswing}} kann auch aus Fehlern entstehen. Das Ergebnis unterscheidet Pech nicht von Fehlern, eine Analyse der Hände kann das aber." }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "Welche {{t:standard-deviation}} ist typisch für 6-max No-Limit Hold'em Cash Games?"
    options:
      - { text: "Ca. {{n:var.sd.low}}–{{n:var.sd.high}}", correct: true, why: "Das geben Rechner zur {{t:variance|Varianz}} an. Meist wird ca. {{n:var.sd}} als typischer Wert angenommen. Ein aggressiver Stil führt zu einer höheren {{t:standard-deviation|Standardabweichung}}." }
      - { text: "Ca. {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "Das ist die typische Winrate gewinnender Spieler auf Mikrolimits. Die {{t:standard-deviation|Standardabweichung}} ist mehrere Dutzend Mal größer als die Winrate, deshalb schwanken die Ergebnisse so stark." }
      - { text: "Ca. {{n:var.sd.result.bi}} {{t:buy-in|Buy-ins}} pro 100 Hände", why: "Das ist die {{t:standard-deviation|Standardabweichung}} des Ergebnisses nach {{n:var.hands.k}} Tsd. Händen, nicht pro 100 Hände." }
---
Dein Ergebnis im Poker ist die Summe aus zwei Dingen: wie gut du spielst, und Glück. Beide Anteile lassen sich messen. Die Winrate sagt, wie viel du im Schnitt gewinnst, und die {{t:standard-deviation}}, wie stark das Ergebnis um diesen Durchschnitt schwankt.

## Zwei Zahlen in bb/100

**Winrate** ist der durchschnittliche Gewinn pro 100 Hände in {{t:big-blind|Big Blinds}}. Gewinnende Spieler auf Mikrolimits haben meist {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.

**{{t:standard-deviation|Standardabweichung}} (SD)** ist die typische Streuung des Ergebnisses pro 100 Hände. In 6-max Cash Games liegt sie meist bei {{n:var.sd.low}}–{{n:var.sd.high}}, als typischer Wert wird {{n:var.sd}} angenommen. Die {{t:standard-deviation|Standardabweichung}} ist mehrere Dutzend Mal größer als die Winrate, deshalb sagt das Ergebnis einer {{t:session|Session}} oder sogar eines Monats sehr wenig aus.

## Das Ergebnis nach vielen Händen

Du teilst die Zahl der Hände durch 100 und erhältst die Zahl der Blöcke.

```formula
erwartetes Ergebnis = Winrate × Zahl der Blöcke
Standardabweichung des Ergebnisses = SD × √(Zahl der Blöcke)
Bereich für {{n:var.conf95}} = erwartetes Ergebnis ± {{n:var.z95}} × Standardabweichung des Ergebnisses
```

Beispiel: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}} Tsd. Hände, also {{n:var.blocks}} Blöcke. Du erwartest {{n:var.exp.bb}}, also {{n:var.exp.bi}} {{t:buy-in|Buy-ins}}. Die {{t:standard-deviation|Standardabweichung}} des Ergebnisses beträgt {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, also ca. {{n:var.sd.result.bi}} {{t:buy-in|Buy-ins}}. Mit {{n:var.conf95}} Sicherheit landest du zwischen ca. **{{n:var.ci.low.bi}} und {{n:var.ci.high.bi}} {{t:buy-in|Buy-ins}}**. Das erwartete Ergebnis liegt ca. {{n:var.z.lose}} {{t:standard-deviation|Standardabweichungen}} über null, daher beträgt die Wahrscheinlichkeit, dass du nach {{n:var.hands.k}} Tsd. Händen im Minus bist, ca. {{n:var.p.lose}}.

## Wie viele Hände, um deine Winrate zu kennen

Dieselbe Rechnung funktioniert auch umgekehrt. Der Fehler bei der Schätzung der Winrate sinkt mit der Wurzel aus der Zahl der Hände:

```formula
Fehler der Winrate = SD ÷ √(Zahl der Blöcke)
benötigte Blöcke = ({{n:var.z95}} × SD ÷ Genauigkeit)²
```

Nach {{n:var.hands.k}} Tsd. Händen beträgt der Fehler ca. {{n:var.se.wr}}, der Bereich für {{n:var.conf95}} ist also ± {{n:var.ci.wr}}. Ein Ergebnis von {{n:var.wr.ex}} bedeutet dann nur, dass deine wahre Winrate irgendwo zwischen ca. {{n:var.wr.ci.low}} und {{n:var.wr.ci.high}} liegt. Um deine Winrate auf ± {{n:var.target}} genau zu kennen, brauchst du ca. **{{n:var.need.hands.k}} Tsd. Hände**.

## {{t:downswing|Downswings}} sind normal

Ein {{t:downswing|Downswing}} ist ein Rückgang des Ergebnisses vom Höchststand. Simulation eines Spielers mit {{n:var.wr.ex}} bei SD {{n:var.sd}}:

| {{t:downswing|Downswing}} vom Höchststand | In {{n:dd.hands.short.k}} Tsd. Händen | In {{n:var.hands.k}} Tsd. Händen | In {{n:var.hands.k}} Tsd. Händen bei {{n:dd.wr-low}} |
|---|---|---|---|
| {{n:dd.bi.small}} {{t:buy-in|Buy-ins}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} {{t:buy-in|Buy-ins}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note Woher diese Zahlen stammen
Ergebnisse einer Simulation: Tausende Durchläufe zu je {{n:var.hands.k}} Tsd. Händen mit einem zufälligen Ergebnis für jeden Block. Echte {{t:downswing|Downswings}} sind manchmal etwas tiefer, weil sich das Ergebnis mit jeder Hand ändert und nicht nur alle 100 Hände. Fazit: Ein {{t:downswing}} von {{n:dd.bi.small}} {{t:buy-in|Buy-ins}} beweist nicht, dass du schlecht spielst.
:::

Das sind allgemeine Hinweise, keine Garantie für Ergebnisse. Wenn dir das Spielen außer Kontrolle gerät, sieh auf dem Bildschirm „Hilfe“ nach.
