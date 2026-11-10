---
id: m13.l3
module: m13
order: 3
title: "Hände aus echten Partien analysieren"
sub: "Was du analysierst und wie"
rules: [R-M13-005, R-M13-006, R-M13-007, R-M13-008]
drills:
  - kind: choice
    id: m13.l3.q-mark
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Während eines Live-Spiels spielst du eine Hand, bei der du nicht weißt, was du tun sollst. Was machst du später damit?"
    options:
      - { text: "Ich notiere sie kurz und analysiere sie nach der {{t:session|Session}}", correct: true, why: "Ja: Während des Spiels markierst du die Hand nur und analysierst sie später, mit klarem Kopf. Ein Urteil unter Emotionen kann falsch sein." }
      - { text: "Ich analysiere sie sofort, solange ich mich noch erinnere", why: "Eine kurze Notiz reicht, damit du nichts vergisst. Die vollständige Analyse machst du später, mit klarem Kopf." }
      - { text: "Nichts, es zählt nur die nächste Hand", why: "Hände, bei denen du nicht wusstest, was zu tun ist, solltest du dir ansehen. Markiere sie und komm nach der {{t:session|Session}} darauf zurück." }
  - kind: choice
    id: m13.l3.q-when
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Du hast gerade einen großen {{t:pot|Pot}} verloren und bist aufgebracht. Wann analysierst du diese Hand am besten?"
    options:
      - { text: "Nach ein paar Stunden oder am nächsten Tag", correct: true, why: "Ja: Die beste Zeit für die Analyse ist ein paar Stunden oder Tage nach der {{t:session|Session}}, mit klarem Kopf. Direkt nach einer Niederlage hält man leicht eine gute Entscheidung für einen Fehler oder umgekehrt." }
      - { text: "Sofort, damit ich die Details nicht vergesse", why: "Die Details notierst du sofort, das Urteil verschiebst du. Unter Emotionen ist das Urteil vom Ergebnis gefärbt." }
      - { text: "Nie, das war Pech", why: "Vielleicht war es Pech, vielleicht ein Fehler. Das erfährst du nur durch eine Analyse, wenn sich die Emotionen gelegt haben." }
  - kind: choice
    id: m13.l3.q-which
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Bei welcher dieser Hände lohnt sich eine lange Analyse am wenigsten?"
    options:
      - { text: "Ein Set verliert gegen ein höheres Set auf einem {{t:dry|trockenen}} {{t:board|Board}}; ihr habt beide euren ganzen Stack investiert", correct: true, why: "Ja: Das ist ein Cooler. Kein vernünftiger Spieler würde hier mit einem Set {{t:fold|folden}}. Cooler passieren jedem und lehren wenig." }
      - { text: "Ein großer verlorener {{t:pot|Pot}}, bei dem du am River nicht wusstest, ob du {{t:call|callen}} sollst", why: "Das ist ein guter Kandidat für eine Analyse: ein großer {{t:pot|Pot}} und eine schwierige Entscheidung." }
      - { text: "Ein mittlerer {{t:pot|Pot}}, in dem dich dein Gegner ausgespielt hat und du dich verloren gefühlt hast", why: "Solche Hände lohnen eine Analyse: Du hattest das Gefühl, dass etwas schiefgelaufen ist, und es lohnt sich zu sehen, was." }
  - kind: choice
    id: m13.l3.q-big
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Du hast einen großen {{t:pot|Pot}} verloren, glaubst aber, gut gespielt zu haben. Lohnt es sich, ihn zu analysieren?"
    options:
      - { text: "Ja: In einem großen {{t:pot|Pot}} wiegen Entscheidungen am meisten, auch wenn du gut gespielt hast", correct: true, why: "Ja: Große {{t:pot|Pots}}, vor allem verlorene, sind die Entscheidungen mit dem größten Gewicht. Auch wenn du gut gespielt hast, lohnt es sich zu wissen, warum. Nur offensichtliche Cooler lässt du aus." }
      - { text: "Nein: Wenn ich gut gespielt habe, gibt es nichts zu suchen", why: "Gewissheit ohne Analyse ist immer noch nur eine erste Reaktion. Ein großer {{t:pot|Pot}} ist ein guter Grund, ihn zu analysieren." }
      - { text: "Nur wenn ich gegen eine seltene Hand verloren habe", why: "Die Art der gegnerischen Hand entscheidet nicht. Es zählt, ob die Entscheidung schwierig oder der {{t:pot|Pot}} groß war." }
  - kind: choice
    id: m13.l3.q-gut
    family: m13.review-how
    rules: [R-M13-007]
    prompt: "Du beginnst die Analyse einer Entscheidung am River. Was machst du zuerst?"
    options:
      - { text: "Ich notiere meine erste Reaktion, z. B. „leichter {{t:call|Call}}“, und rechne erst danach", correct: true, why: "Ja: Der Vergleich der ersten Reaktion mit der Rechnung zeigt, wo dich deine Intuition täuscht. Mit der Zeit wird die Intuition besser." }
      - { text: "Ich berechne sofort die {{t:equity|Equity}}", why: "Rechnen ist nötig, aber ohne notierte erste Reaktion siehst du nicht, wo sich deine Intuition irrt." }
      - { text: "Ich schaue, welche Karten der Gegner hatte", why: "Die Karten des Gegners aus dem Showdown sind das Ergebnis, keine Information aus dem Moment der Entscheidung. Du beurteilst die Entscheidung gegen seine möglichen Hände." }
  - kind: choice
    id: m13.l3.q-pessimist
    family: m13.review-how
    rules: [R-M13-008]
    prompt: "Du analysierst einen {{t:call|Call}} am River. Selbst bei einer pessimistischen Annahme über die {{t:range|Range}} des Gegners (wenige {{t:bluff|Bluffs}}) hast du genug {{t:equity|Equity}}. Wie geht es weiter?"
    options:
      - { text: "Ich kann aufhören: Die Entscheidung ist bei jeder vernünftigen Annahme gut", correct: true, why: "Ja: Die extremen Annahmen stecken den Bereich ab. Wenn die Entscheidung sogar bei der pessimistischen gut ist, wird sie auch von der realistischen Annahme bestätigt." }
      - { text: "Ich muss noch den realistischen Fall berechnen", why: "Musst du nicht: Die realistische Annahme liegt zwischen den Extremen, und da beide zum selben Schluss führen, ändert sich das Ergebnis nicht." }
      - { text: "Ich wechsle zur optimistischen Annahme, weil die pessimistische übertrieben ist", why: "Du beginnst mit den Extremen, um den Bereich abzustecken. Wenn schon die pessimistische ein gutes Ergebnis liefert, dann die optimistische erst recht." }
---
Die App analysiert Hände aus Spielen gegen Bots für dich. Hände, die du außerhalb der App gespielt hast, analysierst du selbst. Diese Lektion sammelt Tipps von Trainern.

## Während des Spiels markieren, nach der {{t:session|Session}} analysieren

Während des Spiels markierst du nur Hände, die dir interessant, schwierig oder seltsam vorkamen: Eine kurze Notiz reicht. Am besten analysierst du ein paar Stunden oder Tage nach der {{t:session|Session}}, mit klarem Kopf. Der schlechteste Zeitpunkt ist direkt nach einer großen Niederlage oder wenn du müde bist.

## Was du analysierst

- Große {{t:pot|Pots}}, vor allem verlorene: Dort wiegen Entscheidungen am meisten.
- Hände, bei denen du nicht wusstest, was zu tun ist, oder das Gefühl hattest, dass dich der Gegner ausgespielt hat.
- Auch Gewinne: Ein Fehler, der sich ausgezahlt hat, kostet genauso viel (Lektion über Entscheidung und Ergebnis).

Mit Coolern und Bad Beats verbringst du nicht viel Zeit. Ein Cooler ist eine Hand, in der zwei starke Hände aufeinandertreffen und keine vernünftigerweise {{t:fold|folden}} konnte, z. B. ein Set gegen ein höheres Set. Solche Hände passieren jedem und lehren wenig.

## Wie du eine Entscheidung analysierst

1. Notiere die Hand: {{t:position|Positionen}}, Stacks, Aktionen und Einsatzhöhen auf jeder {{t:street|Street}}.
2. Notiere deine erste Reaktion: ob die Entscheidung leicht oder schwierig wirkt.
3. Rechne: den Preis, die {{t:equity|Equity}} und was du im Moment der Entscheidung wusstest.
4. Prüfe die Entscheidung unter drei Annahmen über die {{t:range|Range}} des Gegners: optimistisch, pessimistisch und realistisch. Wenn sie sogar bei der pessimistischen gut ist, kannst du aufhören.
5. Notiere den Unterschied zwischen deiner ersten Reaktion und der Rechnung. Mit der Zeit wird die Intuition besser.

:::note Woher diese Regeln stammen
Drei Trainingsmaterialien zur Analyse von Händen: wann und was du analysierst; Cooler und Bad Beats; erste Reaktion und drei Annahmen über den Gegner. Das sind Heuristiken von Trainern, keine Solver-Ergebnisse.
:::
