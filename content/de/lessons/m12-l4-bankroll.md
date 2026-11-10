---
id: m12.l4
module: m12
order: 4
title: "Bankroll und Risiko"
sub: "Varianz in Buy-ins gerechnet und wann du im Limit absteigst"
rules: [R-M12-009, R-M12-011, R-M12-012]
drills:
  - kind: numeric
    id: m12.l4.n-base-bb
    family: m12.bankroll-size
    rules: [R-M12-009]
    prompt: "Ein {{t:buy-in|Buy-in}} entspricht {{n:format.stack}}. Wie viele bb hat eine Bankroll von {{n:br.bi.base}} {{t:buy-in|Buy-ins}}? Gib eine Zahl ein."
    answer: br.base.bb
    explanation: "{{n:br.bi.base}} × {{n:format.stack}} = {{n:br.base.bb}}. Du rechnest deine Bankroll in {{t:buy-in|Buy-ins}} des {{t:stakes|Limits}}, das du spielst."
  - kind: choice
    id: m12.l4.q-ror-base
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Du gewinnst {{n:var.wr.typical.high}} bei einer {{t:standard-deviation|Standardabweichung}} von {{n:var.sd}} und hast {{n:br.bi.base}} {{t:buy-in|Buy-ins}} ({{n:br.base.bb}}). Wie hoch ist das Risiko, deine gesamte Bankroll zu verlieren?"
    options:
      - { text: "Ca. {{n:ror.base}}", correct: true, why: "Der Exponent ist 2 × Winrate × Bankroll ÷ SD² = {{n:ror.two}} × {{n:var.wr.typical.high}} × {{n:br.base.bb}} ÷ {{n:var.sd.sq}} ≈ {{n:ror.exp.base}}, also RoR = e^(−{{n:ror.exp.base}}) ≈ {{n:ror.base}}. Das ist die Chance, dass du irgendwann deine gesamte Bankroll verlierst, wenn du nie im {{t:stakes|Limit}} absteigst." }
      - { text: "Ca. {{n:ror.half}}", why: "So viel ergibt sich bei halber Bankroll, {{n:br.bi.move-down}} {{t:buy-in|Buy-ins}}. Bei {{n:br.bi.base}} ist der Exponent doppelt so groß, also sinkt das Risiko auf ca. {{n:ror.base}}." }
      - { text: "Null, weil der Spieler gewinnt", why: "Auch ein Gewinnspieler kann einen {{t:downswing|Downswing}} erwischen, der tiefer ist als die gesamte Bankroll. Das Risiko sinkt mit der Bankroll, fällt aber nie auf null." }
  - kind: choice
    id: m12.l4.q-ror-winrate
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Dieselbe Bankroll von {{n:br.bi.base}} {{t:buy-in|Buy-ins}}, {{t:standard-deviation|Standardabweichung}} {{n:var.sd}}, aber eine Winrate von nur {{n:var.wr.typical.low}}. Wie hoch ist das Risiko, die Bankroll zu verlieren?"
    options:
      - { text: "Ca. {{n:ror.base.wr-min}}", correct: true, why: "Die Winrate steht im Exponenten: Bei {{n:var.wr.typical.low}} statt {{n:var.wr.typical.high}} ist der Exponent nur ein Drittel so groß, und das Risiko steigt von ca. {{n:ror.base}} auf ca. {{n:ror.base.wr-min}}." }
      - { text: "Ca. {{n:ror.base}}, weil die Bankroll gleich ist", why: "Das Risiko hängt vom Produkt Winrate × Bankroll ab. Eine niedrigere Winrate wirkt wie eine kleinere Bankroll: Es ergibt sich ca. {{n:ror.base.wr-min}}." }
      - { text: "Ca. {{n:ror.base.wr-ex}}", why: "So viel ergibt sich bei einer Winrate von {{n:var.wr.ex}}. Bei {{n:var.wr.typical.low}} ist das Risiko Dutzende Male höher: ca. {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-unknown-wr
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Du hast {{n:br.bi.base}} {{t:buy-in|Buy-ins}}, {{t:standard-deviation|Standardabweichung}} {{n:var.sd}}, kennst deine Winrate aber noch nicht. Was weißt du über das Risiko, deine gesamte Bankroll zu verlieren?"
    options:
      - { text: "Es hängt von der Winrate ab: bei {{n:var.wr.typical.high}} ca. {{n:ror.base}}, bei {{n:var.wr.typical.low}} ca. {{n:ror.base.wr-min}}", correct: true, why: "Die Winrate steht im Exponenten neben der Bankroll. Ohne bekannte Winrate kennst du auch das Risiko nicht, und bei niedriger Winrate ergibt dieselbe Bankroll ein mehrfach höheres Risiko." }
      - { text: "Ca. {{n:ror.base}}, weil es nur von der Bankroll abhängt", why: "So viel ergibt sich nur bei {{n:var.wr.typical.high}}. Bei {{n:var.wr.typical.low}} ergibt dieselbe Bankroll ca. {{n:ror.base.wr-min}}." }
      - { text: "Null, weil {{n:br.bi.base}} {{t:buy-in|Buy-ins}} viel sind", why: "Bei positiver Winrate sinkt das Risiko mit der Bankroll, fällt aber nie auf null. Bei {{n:var.wr.typical.low}} sind es immer noch ca. {{n:ror.base.wr-min}}." }
  - kind: choice
    id: m12.l4.q-move-down
    family: m12.move-down
    rules: [R-M12-011]
    prompt: "Du hast das {{t:stakes|Limit}} mit {{n:br.bi.base}} {{t:buy-in|Buy-ins}} begonnen. Nach einem {{t:downswing|Downswing}} hast du {{n:br.ex.below}}. Was tust du?"
    options:
      - { text: "Du steigst ein {{t:stakes|Limit}} ab", correct: true, why: "Du bist unter die Hälfte deiner geplanten Bankroll ({{n:br.bi.move-down}}) gefallen. Bei dieser Zahl an {{t:buy-in|Buy-ins}} ist das Risiko, den Rest zu verlieren, mehrfach höher als bei {{n:br.bi.base}} (bei einer Winrate von {{n:var.wr.typical.high}} und SD {{n:var.sd}}). Auf einem halb so hohen {{t:stakes|Limit}} ist dieselbe Bankroll wieder fast die volle Zahl seiner {{t:buy-in|Buy-ins}}." }
      - { text: "Du spielst weiter, weil es nur {{t:variance|Varianz}} ist", why: "Es ist zwar wahrscheinlich {{t:variance|Varianz}}, aber genau davor schützt der Abstieg im {{t:stakes|Limit}}. Mit {{n:br.ex.below}} {{t:buy-in|Buy-ins}} kann ein weiterer {{t:downswing|Downswing}} alles kosten." }
      - { text: "Du wechselst auf ein höheres {{t:stakes|Limit}}, um schneller aufzuholen", why: "Das ist Tilt aus Verzweiflung. Ein höheres {{t:stakes|Limit}} bei kleinerer Bankroll in {{t:buy-in|Buy-ins}} erhöht das {{t:risk-of-ruin|Ruinrisiko}} drastisch." }
  - kind: choice
    id: m12.l4.q-stay
    family: m12.move-down
    rules: [R-M12-011, R-M12-002]
    prompt: "Du hast das {{t:stakes|Limit}} mit {{n:br.bi.base}} {{t:buy-in|Buy-ins}} begonnen und {{n:dd.bi.small}} verloren. Jetzt hast du {{n:br.ex.after-dd}}. Was tust du?"
    options:
      - { text: "Du bleibst auf dem {{t:stakes|Limit}} und gehst deine Entscheidungen in den verlorenen Händen durch", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|Buy-ins}} sind immer noch mehr als die späteste Abstiegsschwelle, {{n:br.bi.move-down}}. Einen solchen {{t:downswing|Downswing}} erleben in der Simulation ca. {{n:dd.p.small.100k}} der Spieler, die {{n:var.wr.ex}} gewinnen, in {{n:var.hands.k}} Tsd. Händen, und die Analyse der Hände prüft, ob Fehler dahinterstecken." }
      - { text: "Du steigst sofort im {{t:stakes|Limit}} ab", correct: true, why: "Auch das ist eine gute Entscheidung: Manche Quellen raten, schon nach dem Verlust von {{n:dd.bi.small}} {{t:buy-in|Buy-ins}} abzusteigen. Früher abzusteigen als bei der Hälfte der Bankroll ist kein Fehler, später schon." }
      - { text: "Du legst {{t:buy-in|Buy-ins}} von außen nach, um wieder {{n:br.bi.base}} zu haben", why: "Nachlegen nach jedem {{t:downswing|Downswing}} verwässert den Sinn der Bankroll als Risikogrenze. Du legst die Schwelle vorher fest und hältst dich daran." }
  - kind: choice
    id: m12.l4.q-move-up
    family: m12.bankroll-size
    rules: [R-M12-011]
    prompt: "Du hast {{n:br.bi.base}} {{t:buy-in|Buy-ins}} deines aktuellen {{t:stakes|Limits}}, also so viel, wie du als Bankroll festgelegt hast. Das höhere {{t:stakes|Limit}} hat ein doppelt so großes {{t:buy-in|Buy-in}}. Steigst du auf?"
    options:
      - { text: "Nein, auf dem höheren {{t:stakes|Limit}} ist das nur die Hälfte der geplanten Bankroll", correct: true, why: "Du rechnest die Bankroll in {{t:buy-in|Buy-ins}} des {{t:stakes|Limits}}, auf das du wechseln willst. Deine {{n:br.bi.base}} {{t:buy-in|Buy-ins}} sind dort {{n:br.bi.move-down}}, also genau die Abstiegsschwelle." }
      - { text: "Ja, weil es gut läuft", why: "Ein guter Monat ist vor allem {{t:variance|Varianz}} (Lektion über {{t:variance|Varianz}}). Der Aufstieg hängt von der Bankroll auf dem neuen {{t:stakes|Limit}} ab." }
      - { text: "Ja, weil du schon {{n:br.bi.base}} {{t:buy-in|Buy-ins}} hast", why: "{{n:br.bi.base}} {{t:buy-in|Buy-ins}} des aktuellen {{t:stakes|Limits}} sind auf einem doppelt so hohen {{t:stakes|Limit}} nur {{n:br.bi.move-down}}." }
  - kind: choice
    id: m12.l4.q-losing
    family: m12.risk-of-ruin
    rules: [R-M12-009]
    prompt: "Ein Spieler verliert auf seinem {{t:stakes|Limit}} im Schnitt, hat aber eine riesige Bankroll. Was bringt ihm das?"
    options:
      - { text: "Sie schiebt den Verlust nur auf", correct: true, why: "Bei negativer Winrate sinkt das Ergebnis im Schnitt, also verliert er früher oder später die Bankroll, unabhängig von ihrer Größe. Die Bankroll schützt vor {{t:variance|Varianz}}, nicht vor schwachem Spiel." }
      - { text: "Sie schützt ihn vor dem Bankrott", why: "Die Risikoformel gilt nur bei positiver Winrate. Ein Verlustspieler verliert die Bankroll mit Sicherheit, nur bei größerer Bankroll langsamer." }
      - { text: "Sie erlaubt ihm, höhere {{t:stakes|Limits}} zu spielen", why: "Ein höheres {{t:stakes|Limit}} beschleunigt bei negativer Winrate nur den Verlust." }
  - kind: choice
    id: m12.l4.q-study-beginner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Du fängst gerade erst an. Wie teilst du deine Zeit zwischen Lernen und Spielen auf?"
    options:
      - { text: "Ca. {{n:study.beginner}} Lernen", correct: true, why: "Am Anfang hast du am meisten nachzuholen, deshalb überwiegt das Lernen." }
      - { text: "Ca. {{n:study.min}} Lernen", why: "Das ist die Untergrenze für einen Spieler, der schon gewinnt. Am Anfang sollte das Lernen überwiegen." }
      - { text: "Nur spielen, das Lernen kommt mit der Erfahrung", why: "Das Spielergebnis ist ein schwaches Feedback (Lektion über Entscheidung und Ergebnis). Lernen mit Erklärungen und Handanalysen bringen dich schneller voran." }
  - kind: choice
    id: m12.l4.q-study-winner
    family: m12.study-ratio
    rules: [R-M12-012]
    prompt: "Du gewinnst schon auf deinem {{t:stakes|Limit}}. Wie teilst du deine Zeit auf?"
    options:
      - { text: "Ungefähr halbe-halbe, aber nie weniger als {{n:study.min}} Lernen", correct: true, why: "Auch wenn du gewinnst, sind ca. {{n:study.winner}} Lernen ideal, und das Minimum liegt bei {{n:study.min}}." }
      - { text: "Nur spielen, wenn du schon gewinnst", why: "Auch wenn du gewinnst, gehst du nicht unter {{n:study.min}} deiner Zeit fürs Lernen." }
      - { text: "Ca. {{n:study.beginner}} Lernen, wie am Anfang", why: "Das geht, wenn du dich auf höhere {{t:stakes|Limits}} vorbereitest. Wenn du einfach auf deinem gewinnst, reichen ca. {{n:study.winner}}." }
  - kind: choice
    id: m12.l4.q-warning-sign
    family: m12.responsible
    prompt: "Welches Anzeichen spricht dafür, dass das Spielen außer Kontrolle geraten könnte?"
    options:
      - { text: "Nach einem Verlust kehrst du ins Spiel zurück, um die Verluste zurückzuholen", correct: true, why: "Verlusten hinterherjagen ist eines der Anzeichen für ein Glücksspielproblem, die in diagnostischen Kriterien genannt werden. Wenn du solche Anzeichen bei dir erkennst, nutze die Kontakte im Hinweis „Verantwortungsvolles Spielen“." }
      - { text: "Du analysierst verlorene Hände nach einer {{t:session|Session}}", why: "Das ist eine gesunde Lerngewohnheit. Anzeichen für ein Problem sind u. a. Verlusten hinterherjagen, länger spielen als geplant und mit geliehenem Geld spielen." }
      - { text: "Du beendest die {{t:session|Session}} wie geplant", why: "Das ist gute Kontrolle über dein Spiel. Ein Anzeichen für ein Problem wäre, länger zu spielen als geplant, oder das Bedürfnis, Verluste zurückzuholen." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar mental
  - kind: generated
    id: m12.l4.g-vocab-mental
    family: vocab.mental
    generator: vocab
    params: { area: mental, dir: both }
    count: 4
---
Die Bankroll ist dein gesamter Vorrat, der ausschließlich fürs Pokerspielen bestimmt ist. In dieser Lektion rechnest du sie in **{{t:buy-in|Buy-ins}}**, nicht in Geld: Ein {{t:buy-in|Buy-in}} ist ein voller Stack von {{n:format.stack}} auf dem {{t:stakes|Limit}}, das du spielst.

## {{t:risk-of-ruin|Ruinrisiko}}

Das ist die Wahrscheinlichkeit, dass du irgendwann deine gesamte Bankroll verlierst, wenn du auf demselben {{t:stakes|Limit}} weiterspielst:

```formula
RoR = e^(−2 × Winrate × Bankroll ÷ SD²)
```

Die Formel ist eine Näherung bei konstanter Winrate und SD. Winrate und SD gibst du in bb/100 an, die Bankroll in bb. Bei einer {{t:standard-deviation|Standardabweichung}} von {{n:var.sd}}:

| Winrate | {{n:br.bi.move-down}} {{t:buy-in|Buy-ins}} | {{n:br.bi.base}} {{t:buy-in|Buy-ins}} | {{n:br.bi.beginner}} {{t:buy-in|Buy-ins}} |
|---|---|---|---|
| {{n:var.wr.typical.low}} | — | {{n:ror.base.wr-min}} | {{n:ror.beginner.wr-min}} |
| {{n:var.wr.typical.high}} | {{n:ror.half}} | {{n:ror.base}} | — |
| {{n:var.wr.ex}} | — | {{n:ror.base.wr-ex}} | — |

## Wovon das Risiko abhängt

Winrate und Bankroll stehen in der Formel nebeneinander: Eine halb so hohe Winrate erfordert für dasselbe Risiko eine doppelt so große Bankroll. Deshalb ergibt dieselbe Zahl an {{t:buy-in|Buy-ins}} für einen Spieler ein mehrfach geringeres Risiko als für einen anderen. Die Winrate ist anfangs unbekannt, und um sie abzuschätzen, braucht es sehr viele Hände (Lektion über {{t:variance|Varianz}}). Bei negativer Winrate hilft keine Bankroll, denn sie schützt vor {{t:variance|Varianz}}, nicht vor schwachem Spiel.

## Wann du im {{t:stakes|Limit}} absteigst

Leg die Schwelle vorher fest: Du steigst spätestens dann ein {{t:stakes|Limit}} ab, wenn deine Bankroll auf die **Hälfte** der geplanten Zahl an {{t:buy-in|Buy-ins}} fällt, z. B. von {{n:br.bi.base}} auf {{n:br.bi.move-down}}. Quellen nennen Schwellen von der Hälfte bis zur vollen Bankroll; die Hälfte ist die späteste davon. Auf einem halb so hohen {{t:stakes|Limit}} ist dieselbe Bankroll wieder fast die volle Zahl seiner {{t:buy-in|Buy-ins}}. Du steigst frühestens dann wieder auf, wenn du eine volle Bankroll in {{t:buy-in|Buy-ins}} des höheren {{t:stakes|Limits}} hast. Manche Quellen raten, früher abzusteigen, schon nach dem Verlust von {{n:dd.bi.small}} {{t:buy-in|Buy-ins}}: Ein Abstieg vor der Schwelle der halben Bankroll ist kein Fehler.

## Lernen und Spielen

Am Anfang verwendest du ca. {{n:study.beginner}} deiner Zeit aufs Lernen und den Rest aufs Spielen. Wenn du auf deinem {{t:stakes|Limit}} gewinnst, sind ca. {{n:study.winner}} ideal, aber nie weniger als {{n:study.min}} Lernen.

:::note Verantwortungsvolles Spielen
Einige Anzeichen, dass das Spielen außer Kontrolle gerät: Du spielst länger, als du geplant hast; nach einem Verlust kehrst du zurück, um die Verluste zurückzuholen; du spielst mit Geld, dessen Verlust du dir nicht leisten kannst, oder leihst dir Geld zum Spielen; du spielst, um Sorgen zu entfliehen; du verheimlichst das Spielen vor nahestehenden Menschen.

Wo du Hilfe findest:

{{helplines}}
:::
