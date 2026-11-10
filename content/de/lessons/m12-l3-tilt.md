---
id: m12.l3
module: m12
order: 3
title: "Tilt"
sub: "Erkenne ihn, bevor er deine Entscheidungen übernimmt"
rules: [R-M12-006, R-M12-007, R-M12-008]
drills:
  - kind: choice
    id: m12.l3.q-type-injustice
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Zum dritten Mal in einer Stunde trifft ein Gegner am River eine Karte, die ihn rettet. Du hast das Gefühl, das Spiel ist ungerecht und jemand hat es auf dich abgesehen. Welcher Tilt-Typ ist das laut der Einteilung in dieser Lektion?"
    options:
      - { text: "Tilt aus Ungerechtigkeit", correct: true, why: "Bad Beats, Cooler und Treffer des Gegners am River erzeugen das Gefühl, dass Poker ungerecht ist. Das ist ein typischer Auslöser für Tilt aus Ungerechtigkeit." }
      - { text: "Tilt aus Fehlern", why: "Tilt aus Fehlern betrifft deine eigenen Fehler. Hier ärgerst du dich über das Schicksal, nicht über deine Entscheidung." }
      - { text: "Tilt aus Verzweiflung", why: "Verzweiflung ist ein starkes Bedürfnis, Verluste zurückzuholen (lange {{t:session|Sessions}}, höhere {{t:stakes|Limits}}). Hier geht es vorerst um das Gefühl, ungerecht behandelt zu werden." }
  - kind: choice
    id: m12.l3.q-type-revenge
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Derselbe Gegner raist zum vierten Mal in Folge gegen deine Blinds. Du beschließt, beim nächsten Mal mit einer beliebigen Hand gegen ihn zu {{t:raise|raisen}}, um es ihm zu zeigen. Welcher Tilt-Typ ist das?"
    options:
      - { text: "Tilt aus Rache", correct: true, why: "Respektlosigkeit, die ständige Aggression des Gegners und der Wunsch, es ihm „zu zeigen“, sind Auslöser für Tilt aus Rache. Die Entscheidung trifft nun zunehmend der Wunsch nach Vergeltung statt der Rechnung." }
      - { text: "Tilt aus Anspruchsdenken", why: "Dieser Typ entsteht aus der Überzeugung, dass du den Gewinn verdienst, weil du besser bist. Hier geht es um Vergeltung an einem bestimmten Gegner." }
      - { text: "Das ist kein Tilt, sondern eine Anpassung an einen aggressiven Gegner", why: "Anpassung bedeutet, breiter mit durchdachten Händen zu verteidigen. „Mit einer beliebigen Hand, um es ihm zu zeigen“ ist Emotion, keine Strategie." }
  - kind: choice
    id: m12.l3.q-type-desperation
    family: m12.tilt-type
    rules: [R-M12-007]
    prompt: "Du liegst im Minus und denkst: „Noch eine Stunde, und wenn es nicht läuft, wechsle ich auf ein höheres {{t:stakes|Limit}} und hole alles auf einmal zurück.“ Welcher Tilt-Typ ist das?"
    options:
      - { text: "Tilt aus Verzweiflung", correct: true, why: "Das Bedürfnis, Verluste zurückzuholen, führt zu sehr langen {{t:session|Sessions}}, erzwungener Action und Sprüngen nach oben bei den {{t:stakes|Limits}}. Das ist ein Signal, mit dem Spielen aufzuhören." }
      - { text: "Tilt aus Hass aufs Verlieren", why: "Knapp daneben, aber hier kommt der Plan hinzu, Verluste mit einem höheren {{t:stakes|Limit}} und längerem Spielen zurückzuholen. Das sind Merkmale der Verzweiflung." }
      - { text: "Ein vernünftiger Plan, denn ein höheres {{t:stakes|Limit}} holt die Verluste schneller zurück", why: "Ein höheres {{t:stakes|Limit}} vergrößert auch die Schwankungen, und du triffst Entscheidungen in schlechtem Zustand. Nach einem Verlust aufzusteigen ist genau das Gegenteil von vorsichtigem {{t:bankroll|Bankroll}}-Management (Lektion über Bankroll und Risiko)." }
  - kind: choice
    id: m12.l3.q-type-mistake
    family: m12.tilt-type
    rules: [R-M12-008]
    prompt: "Du hast die beste Hand {{t:fold|gefoldet}} und kannst seitdem nicht aufhören, daran zu denken. Du ärgerst dich über dich selbst und spielst immer schlechter. Welcher Tilt-Typ ist das?"
    options:
      - { text: "Tilt aus Fehlern", correct: true, why: "Ärger über die eigenen Fehler ist Tilt aus Fehlern. Die Ursache ist meist die unrealistische Erwartung, beim Lernen keine Fehler zu machen." }
      - { text: "Tilt aus Ungerechtigkeit", why: "Hier gibst du nicht dem Schicksal die Schuld, sondern dir selbst. Das ist Tilt aus Fehlern." }
      - { text: "Tilt aus Rache", why: "Rache richtet sich gegen einen Gegner. Hier betrifft der Ärger deine Entscheidung." }
  - kind: choice
    id: m12.l3.q-type-entitlement
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Du verlierst gegen einen Spieler, der deiner Meinung nach katastrophal spielt, und denkst: „Ich lerne, er nicht, ich sollte gegen ihn gewinnen.“ Welcher Tilt-Typ ist das?"
    options:
      - { text: "Tilt aus Anspruchsdenken", correct: true, why: "Der Glaube, dass du aus irgendeinem Grund den Gewinn verdienst, lässt ihn wie dein Eigentum erscheinen. Wenn ein Gegner, der ihn „nicht verdient“, ihn dir wegnimmt, entsteht Tilt." }
      - { text: "Tilt aus Hass aufs Verlieren", why: "Dieser Typ betrifft das Verlieren allgemein. Hier ist die Überzeugung entscheidend, dass dir der Gewinn zusteht." }
      - { text: "Tilt aus Fehlern", why: "Es geht nicht um deinen Fehler, sondern um das Gefühl, dass du den Gewinn verdienst." }
  - kind: choice
    id: m12.l3.q-early-signal
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Nach einem Bad Beat spürst du, wie Ärger in dir aufsteigt, aber du spielst noch korrekt. Was tust du?"
    options:
      - { text: "Du reagierst jetzt: durchatmen und ein vorbereiteter Satz, z. B. „Das ist {{t:variance}}, spiel weiter gut“", correct: true, why: "Tilt lässt sich korrigieren, solange er klein ist und du noch denken kannst. Wenn er wächst, schaltet er deine Denkfähigkeit aus und Kontrolle wird unmöglich." }
      - { text: "Du spielst weiter, bis du den ersten Fehler bemerkst", why: "Dann ist der Tilt schon größer und schwerer zu stoppen. Am leichtesten reagierst du auf die ersten Signale." }
      - { text: "Du unterdrückst den Ärger und tust so, als wäre er nicht da", why: "Besser ist es, die Emotion zu erkennen und ihrer Ursache mit einem konkreten Gedanken zu begegnen. Unterdrücken allein beseitigt die Ursache nicht." }
  - kind: choice
    id: m12.l3.q-quit
    family: m12.tilt-response
    rules: [R-M12-007]
    prompt: "Seit einer halben Stunde spielst du Hände, die du normalerweise {{t:fold|foldest}}, und denkst nur noch ans Zurückgewinnen. Was tust du?"
    options:
      - { text: "Du beendest die {{t:session|Session}}", correct: true, why: "Das sind Signale, dass du nicht mehr zu klarem Denken zurückfindest. Dann ist das Ziel, so schnell wie möglich aufzuhören, nicht das Geld zurückzugewinnen." }
      - { text: "Du spielst weiter, aber nur die besten Hände", why: "In diesem Zustand ist es schwer, sich an Vorsätze zu halten, weil die Emotion für dich entscheidet. Sicherer ist es aufzuhören." }
      - { text: "Du gehst auf ein höheres {{t:stakes|Limit}}, um schneller aufzuholen", why: "Das ist Tilt aus Verzweiflung in Reinform. Ein höheres {{t:stakes|Limit}} bei schlechteren Entscheidungen beschleunigt die Verluste." }
  - kind: choice
    id: m12.l3.q-profile
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Du willst Tilt schneller erkennen. Womit fängst du an?"
    options:
      - { text: "Damit, ein Profil aufzuschreiben: was dich triggert, was du denkst und fühlst, wie sich dein Spiel verändert", correct: true, why: "Jeder Spieler tiltet etwas anders und aus anderen Gründen. Ein Profil hilft dir, die Signale zu erkennen, bevor der Tilt wächst: Was man nicht versteht, kann man nicht kontrollieren." }
      - { text: "Mit Spielen auf höheren {{t:stakes|Limits}}, um dich abzuhärten", why: "Mehr Druck bringt dir nicht bei, Tilt zu erkennen. Zuerst musst du wissen, wie er bei dir aussieht." }
      - { text: "Damit, allen Gegnern aus dem Weg zu gehen, die dich nerven", why: "Auslösern kann man nicht ausweichen, denn Bad Beats und aggressive Gegner wird es immer geben. Ziel ist, deine Reaktion zu erkennen und darauf zu antworten." }
  - kind: choice
    id: m12.l3.q-c-game
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Dein Spiel hat gute und schlechte Tage. Wo liegt der schnellste dauerhafte Fortschritt?"
    options:
      - { text: "In der Verbesserung deines schlechtesten Spiels (C-Game)", correct: true, why: "Fortschritt ähnelt der Bewegung einer Raupe: ein Schritt nach vorn an der Spitze (ein besseres A-Game) und einer am Ende (ein weniger katastrophales C-Game). Wenn du die schlimmsten Fehler beseitigst, wird außerdem Aufmerksamkeit frei, um Neues zu lernen." }
      - { text: "Nur im Feilen an deinem besten Spiel (A-Game)", why: "Das A-Game ist wichtig, aber das C-Game kostet am meisten. Ohne Verbesserung deiner schlechtesten Tage geht der Fortschritt an der Spitze hinten leicht wieder verloren." }
      - { text: "Nirgends, Form ist Glückssache", why: "Die Formschwankung lässt sich verringern: Spieler, die Tilt gut kontrollieren, haben eine engere Verteilung ihres Spielniveaus (Übersichtsarbeit von 2020)." }
  - kind: choice
    id: m12.l3.q-compare
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Wie prüfst du, ob deine Arbeit am {{t:mental-game}}, also am Umgang mit Tilt, Emotionen und Konzentration, Wirkung zeigt?"
    options:
      - { text: "Du vergleichst deine schlechtesten {{t:session|Sessions}} mit früheren schlechtesten", correct: true, why: "Vergleiche Gleiches mit Gleichem: dein schlechtestes Spiel mit deinem früheren schlechtesten. Fortschritt zeigt sich auch daran, dass du Tilt schneller erkennst und die {{t:session|Session}} früher beendest." }
      - { text: "Du schaust auf das Ergebnis der letzten Woche", why: "Eine Woche Ergebnisse ist vor allem {{t:variance}} (Lektion über {{t:variance|Varianz}}). Die Qualität deines Spiels an den schlechtesten Tagen sagt mehr." }
      - { text: "Du vergleichst deine beste {{t:session|Session}} mit der schlechtesten", why: "Dieser Vergleich zeigt nur die Schwankungsbreite, nicht den Fortschritt. Vergleiche dein schlechtestes Spiel mit deinem früheren schlechtesten." }
---
Tilt ist ein Kontrollverlust unter dem Einfluss negativer Emotionen, meist nach Bad Beats oder einer langen Verlustserie. Er endet in schwachen Entscheidungen und einem viel größeren Verlust als üblich. Das ist keine Seltenheit: In einer Umfragestudie gaben {{n:tilt.severe}} der Spieler zu, in den letzten sechs Monaten mindestens einmal stark getiltet zu haben.

## Sieben Tilt-Typen

Ein anerkanntes Buch über Pokerpsychologie beschreibt Tilt als Problem mit Ärger und unterscheidet {{n:tilt.types}} Typen:

| Typ | Was ihn auslöst |
|---|---|
| Pechsträhne | Andere Tilt-Typen kehren so oft zurück, dass dein Kopf sich vor der nächsten {{t:session|Session}} nicht erholen kann |
| Ungerechtigkeit | Bad Beats, Cooler, Treffer des Gegners am River |
| Hass aufs Verlieren | Das Verlieren selbst, auch wenn du weißt, dass es {{t:variance}} ist |
| Fehler | Deine eigenen Fehler |
| Anspruchsdenken | Die Überzeugung, dass du den Gewinn verdienst |
| Rache | Respektlosigkeit, die ständige Aggression des Gegners |
| Verzweiflung | Das Bedürfnis, Verluste zurückzuholen: Marathon-Sessions, höhere {{t:stakes|Limits}} |

## Erkenne die Signale

Jeder tiltet etwas anders. Schreib dein **Tilt-Profil** auf: was ihn auslöst, was du dann denkst und fühlst, was du am Tisch tust (z. B. du {{t:call|callst}} zu breit, du {{t:raise|raist}} aus Rache). Je besser du deine Signale kennst, desto früher erkennst du sie.

## Reagiere, solange du denken kannst

Wenn der Tilt wächst, schaltet er deine Denkfähigkeit aus. Deshalb reagierst du auf die ersten Signale:

1. Ein Atemzug, der dir einen Moment Abstand zur Emotion gibt.
2. Ein vorbereiteter Satz, der auf die Ursache antwortet, z. B. „Schwächere Spieler müssen manchmal gewinnen, das ist {{t:variance}}. Spiel weiter gut.“
3. Wenn du nicht mehr klar denken kannst, beendest du die {{t:session|Session}}. Fortschritt ist auch, wenn du früher aufhörst, aus einem guten Grund.

## A-Game und C-Game

Dein Spiel hat eine Bandbreite: vom besten (A-Game) bis zum schlechtesten (C-Game). Fortschritt ähnelt der Bewegung einer Raupe: ein Schritt nach vorn an der Spitze, wenn dein bestes Spiel besser wird, und einer am Ende, wenn dein schlechtestes weniger katastrophal wird. Am meisten kostet das C-Game, also fängst du dort an.

:::note Wenn es mehr ist als Tilt
Wenn du länger spielst als geplant, Verlusten hinterherjagst oder mit Geld spielst, dessen Verlust du dir nicht leisten kannst, lies den Hinweis „Verantwortungsvolles Spielen“ in der Lektion über die Bankroll.
:::
