---
id: m13.l1
module: m13
order: 1
title: "So liest du den Spielbericht"
sub: "Entscheidung, Ergebnis und Bewertungsstufen"
rules: [R-M12-004, R-M13-001, R-M13-002]
drills:
  - kind: numeric
    id: m13.l1.n-lose
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Du gehst mit {{n:m13.eq.example}} {{t:equity}} all-in und verlierst. In wie viel Prozent solcher Hände verlierst du trotz guter Entscheidung? Gib eine Zahl ein."
    answer: m13.lose.example
    explanation: "Du verlierst in 1 − e der Hände: Das Ganze minus {{n:m13.eq.example}} ergibt {{n:m13.lose.example}}. Diese Niederlage sagt nichts über die Entscheidung aus."
  - kind: numeric
    id: m13.l1.n-of-ten
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Du gehst zehnmal mit {{n:m13.eq.example}} {{t:equity}} all-in. Wie viele dieser Hände verlierst du im Schnitt? Gib eine Zahl ein."
    answer: m13.lose.of-ten
    explanation: "{{n:m13.ten}} × {{n:m13.lose.example}} = {{n:m13.lose.of-ten}}. Wenn du zweimal hintereinander verlierst, passt das immer noch zur Rechnung."
  - kind: numeric
    id: m13.l1.n-lose2
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Du hast im All-in {{n:m13.eq.example2}} {{t:equity}}. In wie viel Prozent solcher Hände verlierst du? Gib eine Zahl ein."
    answer: m13.lose.example2
    explanation: "Das Ganze minus {{n:m13.eq.example2}} ergibt {{n:m13.lose.example2}}: Ungefähr jede dritte solche Hand verlierst du, und die Entscheidung ist trotzdem gut."
  - kind: choice
    id: m13.l1.q-mixed
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "Der Solver spielt deine Hand in diesem Spot ungefähr gleich oft als {{t:raise|Raise}} oder als {{t:fold|Fold}}. Du hast {{t:fold|gefoldet}}. Wie bewertet der Bericht das?"
    options:
      - { text: "Konform", correct: true, why: "Ja: Eine Aktion, die der Solver in mindestens {{n:range.mixed.low}} der Fälle spielt, ist konform. Im Gleichgewicht mischt ein Spieler nur Spielzüge mit demselben {{t:expected-value|Erwartungswert}}, also sind beide korrekt." }
      - { text: "Fehler, denn du hättest {{t:raise|raisen}} müssen", why: "Nein: Bei einer {{t:mixed-hand|gemischten Hand}} haben beide Spielzüge denselben {{t:expected-value|Erwartungswert}}. Der Bericht bestraft dich nicht, wenn du einen davon wählst." }
      - { text: "Ohne Bewertung", why: "Nein: Für den Spot gibt es ein Solver-Ergebnis, also wird die Entscheidung bewertet. „Ohne Bewertung“ bekommt eine Entscheidung, für die die App keine überprüfbare Regel hat." }
  - kind: choice
    id: m13.l1.q-rare
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "Der Solver spielt deine Hand in etwa {{n:range.mixed.high}} der Fälle als {{t:raise|Raise}} und in den übrigen als {{t:call|Call}}. Du hast {{t:call|gecallt}}. Wie lautet das Urteil?"
    options:
      - { text: "Konform", correct: true, why: "Ja: Ein {{t:call}}, der in etwa {{n:range.mixed.low}} der Fälle gespielt wird, fällt nicht unter die Schwelle für konform ({{n:range.mixed.low}}). Das ist eine {{t:mixed-hand|gemischte Hand}}." }
      - { text: "Zulässig", why: "Zulässig ist eine Aktion, die in mindestens {{n:range.mixed.min}}, aber seltener als in {{n:range.mixed.low}} der Fälle gespielt wird. Hier erreicht der {{t:call}} die Schwelle für konform." }
      - { text: "Fehler", why: "Ein Fehler ist eine Aktion, die der Solver gar nicht spielt. Eine Aktion, die seltener als in {{n:range.mixed.min}} der Fälle gespielt wird, ist eine Ungenauigkeit." }
  - kind: choice
    id: m13.l1.q-size
    family: m13.verdicts
    rules: []
    prompt: "In einem Spot, in dem der Solver eine 3-Bet spielt, spielst du eine 3-Bet, aber mit einer anderen Größe, als die Regel empfiehlt. Wie lautet das Urteil?"
    options:
      - { text: "Ungenauigkeit", correct: true, why: "Ja: gute Aktion, falsche Größe. Sie zählt wie ein Fehler und kommt in den Wiederholungen wieder, aber der Bericht zeigt eine eigene Erklärung zur Größe." }
      - { text: "Konform", why: "Die Aktion ist gut, aber die Größe zählt: Eine zu kleine 3-Bet gibt dem Gegner einen guten Preis, eine zu große riskiert mehr als nötig." }
      - { text: "Fehler", why: "Einen Fehler bekommt eine falsche Aktion. Eine gute Aktion mit falscher Größe ist eine eigene Stufe: eine Ungenauigkeit." }
  - kind: choice
    id: m13.l1.q-unrated
    family: m13.verdicts
    rules: []
    prompt: "Bericht: „14 von 30 Entscheidungen bewertet“. Was bedeuten die übrigen Entscheidungen?"
    options:
      - { text: "Die App hatte für sie weder eine überprüfbare Regel noch ein Solver-Ergebnis", correct: true, why: "Ja: „Ohne Bewertung“ heißt nicht „gut“. Diese Entscheidungen können gut oder schlecht gewesen sein; der Bericht weiß es nicht und sagt das offen." }
      - { text: "Sie waren gut, deshalb zeigt der Bericht sie nicht an", why: "Nein: Gute Entscheidungen zählt der Bericht als konform. „Ohne Bewertung“ bedeutet, dass eine Bewertung fehlt, und ist kein Lob." }
      - { text: "Sie waren zu leicht, um sie zu bewerten", why: "Es geht nicht um die Schwierigkeit. Bewertet werden Entscheidungen, für die die App eine Regel mit Bedingung oder einen Solver-Spot hat." }
  - kind: choice
    id: m13.l1.q-result
    family: m13.result
    rules: [R-M12-004]
    prompt: "Nach der {{t:session|Session}} hast du viele {{t:chips|Chips}} gewonnen, aber der Bericht zeigt fünf Fehler. Was sagt mehr über dein Spiel aus?"
    options:
      - { text: "Die Bewertung der Entscheidungen", correct: true, why: "Ja: Ein paar Dutzend Hände sind zu wenig, damit das Ergebnis etwas aussagt. Selbst nach Tausenden Händen ist das Ergebnis größtenteils Rauschen, und jeder Fehler hat seinen Preis, egal wie die Hand ausgegangen ist." }
      - { text: "Das Ergebnis in {{t:chips|Chips}}", why: "Das Ergebnis einer kurzen {{t:session|Session}} hängt vor allem von den Karten ab. Genau deshalb zeigt der Bericht es in kleinerer Schrift." }
      - { text: "Beides gleich", why: "Ein Ergebnis aus ein paar Dutzend Händen sagt fast nichts über dein Können aus. Eine Entscheidung, die durch eine Regel oder einen Solver bewertet wurde, sagt viel mehr." }
---
Der Bericht nach einer {{t:session|Session}} bewertet deine Entscheidungen und nicht, wie viel du gewonnen hast. Diese Lektion erklärt, wie du ihn liest.

## Entscheidung, nicht Ergebnis

Im Modul zum Mental Game hast du das Prinzip kennengelernt: Du bewertest eine Entscheidung nach den Informationen, die du im Moment der Entscheidung hattest, und nicht nach dem Ergebnis der Hand. Der Bericht wendet das wörtlich an: Er bewertet die Situation vor deiner Aktion und sieht weder die Karten der Gegner noch die Karten, die später gekommen sind.

Mit der besseren Hand zu verlieren, passt zur Rechnung. {{t:equity|Equity}} ist der Anteil der Gewinne über viele Wiederholungen derselben Situation. Mit {{n:m13.eq.example}} {{t:equity}} verlierst du etwa {{n:m13.lose.example}} der Hände, also im Schnitt {{n:m13.lose.of-ten}} von {{n:m13.ten}}.

```formula
Verlustwahrscheinlichkeit = 1 − Equity
```

## Bewertungsstufen

- **Konform**: eine Aktion, die die Regel empfiehlt oder die der Solver in mindestens {{n:range.mixed.low}} der Fälle spielt (diese Schwelle ist eine Einstellung der App).
- **Zulässig**: Der Solver spielt sie selten (mindestens {{n:range.mixed.min}}, aber seltener als {{n:range.mixed.low}}), oder die Regel spricht von einer Häufigkeit („oft“, „seltener“) und du hast die seltenere Option gewählt. Das ist kein Fehler.
- **Ungenauigkeit**: gute Aktion, falsche Größe, oder eine Aktion, die der Solver spielt, aber seltener als in {{n:range.mixed.min}} der Fälle. Sie zählt wie ein Fehler: Das ist eine Einstellung der App, keine Theorie.
- **Fehler**: eine Aktion, die einer kategorisch formulierten Regel widerspricht oder die der Solver gar nicht spielt.
- **Ohne Bewertung**: Die App hat für diese Entscheidung keine überprüfbare Regel. Das heißt nicht „gut“.
- **Zeit abgelaufen**: Bei eingeschaltetem Zeitlimit hat die App für dich gespielt. Eine solche Entscheidung zählt nicht zur Bewertung, kommt aber in den Wiederholungen wieder.

Oben im Bericht steht die Zahl „X von Y Entscheidungen bewertet“. Nach dem Flop bleiben viele Entscheidungen ohne Bewertung, weil die meisten Regeln für Turn und River von Häufigkeiten der ganzen {{t:range|Range}} sprechen und nicht von einer einzelnen Hand.

## {{t:mixed-hand|Gemischte Hand}}

Wenn der Solver deine Hand auf zwei Arten spielt, sind beide korrekt. Die Gleichgewichtstheorie erklärt das mit dem Indifferenzprinzip: Ein Spieler mischt nur Spielzüge, die denselben {{t:expected-value|Erwartungswert}} haben. Deshalb bestraft der Bericht dich nicht, wenn du einen davon wählst, und markiert den selteneren Spielzug als zulässig, wenn der Solver ihn in mindestens {{n:range.mixed.min}} der Fälle spielt; seltener ist eine Ungenauigkeit (Einstellung der App).

## Ergebnis in {{t:chips|Chips}}

Das Ergebnis steht unten im Bericht, in kleiner Schrift. Laut der Rechnung aus der Lektion zur {{t:variance|Varianz}} liegt das {{n:var.conf95}}-Intervall für die Winrate nach etwa {{n:m13.noise.hands.k}} Tsd. Händen bei etwa ± {{n:m13.noise.ci}}, also ist das Ergebnis fast reines Rauschen: Ein Gewinnspieler kann im Minus sein und ein Verlustspieler deutlich im Plus. Eine {{t:session|Session}} hat ein paar Dutzend Hände, also sagt das Ergebnis fast nichts über dein Spiel aus.

:::note Woher diese Regeln stammen
Indifferenzprinzip: Materialien zu den Grundlagen der Gleichgewichtstheorie. Schwelle für seltene Züge und der Name „Ungenauigkeit“: Material zur Bewertung des eigenen Spiels im Vergleich zum Solver. Die Schwelle {{n:range.mixed.low}} ist eine Einstellung der App, ohne Quelle. {{t:variance|Varianz}} des Ergebnisses und Verlustwahrscheinlichkeit sind Rechnung.
:::
