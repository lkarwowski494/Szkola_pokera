---
id: m5.l1
module: m5
order: 1
title: "Flop-Textur"
sub: "Höhe, Farben, Verbundenheit"
rules: [R-M5-001, R-M5-002]
drills:
  - kind: texture
    id: m5.l1.t-axes
    family: m5.texture.axes
    rules: [R-M5-001, R-M5-002]
    axes: [height, suits, ranks]
    count: 5
  - kind: texture
    id: m5.l1.t-wet
    family: m5.texture.wetness
    rules: [R-M5-001, R-M5-002]
    axes: [wetness]
    count: 4
  - kind: choice
    id: m5.l1.q-connected
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Welcher dieser Flops ist {{t:connected|verbunden}}, sodass auf ihm schon jetzt eine {{t:straight|Straße}} möglich ist?"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "Ja: Neun, Sieben und Sechs liegen innerhalb von fünf aufeinanderfolgenden Rängen. Eine {{t:straight|Straße}} ergeben z. B. 85 oder T8." }
      - { text: "[[Ks 8d 3c]]", why: "Nein: Von der Drei bis zum König ist es zu weit. Keine zwei Karten ergeben hier eine {{t:straight|Straße}}." }
      - { text: "[[Qd Qs 9h]]", why: "Nein: Der Flop ist {{t:paired|gepaart}}. Mit zwei Karten auf der Hand und einem {{t:pair|Paar}} auf dem {{t:board|Board}} ist eine {{t:straight|Straße}} unmöglich, denn für eine {{t:straight|Straße}} braucht man fünf verschiedene Ränge." }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Der Flop ist {{t:monotone|monoton}}: Alle drei Karten haben dieselbe Farbe. Was bedeutet das?"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "Ein Spieler mit zwei Karten dieser Farbe hat schon einen {{t:flush|Flush}}", correct: true, why: "Ja: Drei Herz auf dem {{t:board|Board}} und zwei auf der Hand sind fünf Karten einer Farbe. Ein Spieler mit einem Herz hat einen {{t:flush-draw|Flush-Draw}}." }
      - { text: "Niemand kann schon einen {{t:flush|Flush}} haben", why: "Nein: Für einen {{t:flush|Flush}} braucht man fünf Karten, und drei liegen schon auf dem {{t:board|Board}}. Zwei auf der Hand reichen." }
      - { text: "Ein {{t:flush|Flush}} ist erst ab dem Turn möglich", why: "Nein: So ist es auf einem {{t:two-tone|zweifarbigen}} Flop. Auf einem {{t:monotone|monotonen}} kann ein {{t:flush|Flush}} schon jetzt fertig sein." }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "Du hast [[Ac Kd]], und der Flop ist [[Ks 7d 2c]]. Warum ist ein {{t:pair|Paar}} mit gutem Kicker auf so einem Flop sicherer als auf einem {{t:wet|nassen}} Flop?"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "Weil dein Gegner keinen {{t:draw|Draw}} hat, sodass spätere Karten selten ändern, wer vorne liegt", correct: true, why: "Ja: Der Flop ist {{t:rainbow|Rainbow}}, und eine {{t:straight|Straße}} ist nicht möglich. Ein Gegner, der jetzt hinten liegt, hat meist wenige Outs: ein paar Karten für einen {{t:three-of-a-kind|Drilling}} oder {{t:two-pair|zwei Paare}}, und ohne {{t:pair|Paar}} braucht er zwei gute Karten in Folge." }
      - { text: "Weil der Gegner auf einem {{t:dry|trockenen}} Flop immer {{t:fold|foldet}}", why: "Nein: Ein Gegner mit einer Sieben, einer Zwei oder einem schwächeren König kann {{t:call|callen}}. Ein {{t:dry|trockener}} Flop sagt etwas über {{t:draw|Draws}}, nicht darüber, ob der Gegner {{t:fold|foldet}}." }
      - { text: "Weil ein {{t:pair|Paar}} Könige immer bis zum River vorne bleibt", why: "Nein: Der Gegner kann schon jetzt ein Set oder {{t:two-pair|zwei Paare}} haben. Ein {{t:dry|trockener}} Flop verringert nur das Risiko, dass dich jemand einholt." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
Nach dem Flop sieht jeder Spieler schon fünf seiner sieben Karten. Wie die drei Karten auf dem {{t:board|Board}} zu den Händen der Spieler passen, nennen wir die {{t:texture|Textur}} des Flops. Von der {{t:texture|Textur}} hängt ab, wer öfter getroffen hat und ob sich Betten lohnt. Bevor du die C-Bet lernst (eine {{t:bet|Bet}} auf dem Flop nach einem {{t:raise|Raise}} vor dem Flop), lerne, den Flop auf vier Achsen zu lesen.

## Höhe

Wir schauen auf die höchste Karte. Ein **hoher** Flop hat als höchste Karte ein Ass, einen König oder eine Dame, z. B. [[Ks 7d 2c]]. Ein **mittlerer** Flop hat als höchste Karte einen Buben oder eine Zehn, z. B. [[Jh 8c 4d]]. Ein **niedriger** Flop hat als höchste Karte eine Neun oder eine niedrigere Karte, z. B. [[7s 6h 5d]].

## Farben

Ein **{{t:rainbow|Rainbow}}**-Flop hat drei verschiedene Farben: Noch niemand hat einen {{t:flush-draw|Flush-Draw}}. Ein **{{t:two-tone|zweifarbiger}}** Flop hat zwei Karten einer Farbe, z. B. [[Jh Th 8c]]: Zwei Karten eines Spielers in dieser Farbe ergeben einen {{t:flush-draw|Flush-Draw}}. Ein **{{t:monotone|monotoner}}** Flop hat alle drei Karten in einer Farbe, z. B. [[Kh 8h 3h]]: Ein {{t:flush|Flush}} kann schon fertig sein.

## Ränge

Ein **{{t:paired|gepaarter}}** Flop hat zwei Karten desselben Rangs, z. B. [[Qd Qs 6h]]. Eine {{t:straight|Straße}} mit zwei Karten auf der Hand hat darauf niemand, auch wenn ein {{t:straight-draw|Straßen-Draw}} manchmal möglich ist (z. B. auf Q-Q-9).

Ein **{{t:connected|verbundener}}** Flop hat drei verschiedene Ränge innerhalb von fünf aufeinanderfolgenden, also ist eine {{t:straight|Straße}} schon jetzt möglich: Auf [[9h 7d 6c]] ergeben z. B. 85 und T8 eine {{t:straight|Straße}}. Das Ass zählt auch als Eins, deshalb ist auch [[Ah 5d 3c]] {{t:connected|verbunden}}.

Ein **{{t:semi-connected|halb verbundener}}** Flop hat nur zwei seiner Karten innerhalb von fünf aufeinanderfolgenden Rängen. Eine {{t:straight|Straße}} hat noch niemand, aber jemand kann einen {{t:straight-draw|Straßen-Draw}} haben (offen oder Gutshot): Auf [[Kh Qd 4c]] hat ihn z. B. JT. Solche Flops gibt es viele, denn zwei nah beieinanderliegende Karten reichen.

Ein **{{t:disconnected|unverbundener}}** Flop hat so weit auseinanderliegende Karten, dass keine zwei in fünf aufeinanderfolgende Ränge passen, z. B. [[Ks 8d 3c]]. Hier hat niemand auch nur einen {{t:straight-draw|Straßen-Draw}}. Solche Flops gibt es wenige.

## {{t:dry|Trocken}} oder {{t:wet|nass}}

Wir zählen Punkte für die {{t:wetness|Nässe}}, also dafür, wie sehr der Flop {{t:draw|Draws}} und starke Hände mit Flushes und {{t:straight|Straßen}} begünstigt:

- eine {{t:straight|Straße}}, die schon jetzt auf mehrere Arten möglich ist, also mit mindestens zwei verschiedenen Kombinationen aus zwei Rängen auf der Hand (auf [[9h 8d 7c]] ergeben sie JT, T6 und 65): {{n:tex.points.straight.made}} Pkt.,
- eine {{t:straight|Straße}}, die nur auf eine Art möglich ist (auf [[Ah Kd Tc]] ergibt sie nur QJ, auf [[Ah 4d 2c]] nur 53): {{n:tex.points.straight.made-one}} Pkt.,
- nur ein {{t:straight-draw|Straßen-Draw}} (ein {{t:semi-connected|halb verbundener}} Flop oder ein {{t:paired|gepaarter}} mit zwei nah beieinanderliegenden Karten): {{n:tex.points.straight.draw}} Pkt.,
- zwei Karten einer Farbe: {{n:tex.points.suits.two-tone}} Pkt.; drei Karten einer Farbe: {{n:tex.points.suits.monotone}} Pkt.

Ein **{{t:dry|trockener}}** Flop hat weniger als {{n:tex.threshold.medium}} Pkt., ein **{{t:wet|nasser}}** mindestens {{n:tex.threshold.wet}} Pkt., und ein **mittelnasser** liegt dazwischen.

| Flop | Farben | {{t:straight|Straße}} | Summe | {{t:texture|Textur}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry|trocken}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry|trocken}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry|trocken}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry|trocken}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | mittelnass |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | mittelnass |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet|nass}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet|nass}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet|nass}} |

Eine fertige {{t:straight|Straße}} wiegt mehr als ein bloßer {{t:draw|Draw}}, weil sie das Kräfteverhältnis schon jetzt verändert. Eine {{t:straight|Straße}}, die auf mehrere Arten möglich ist, wiegt mehr als eine {{t:straight|Straße}}, die nur auf eine Art möglich ist: Auf [[9h 8d 7c]] haben viele Hände eine {{t:straight|Straße}} oder einen {{t:oesd|OESD}}, auf [[Ah Kd Tc]] dagegen ergibt nur QJ eine {{t:straight|Straße}}, und einen offenen {{t:draw|Draw}} hat niemand. Deshalb ist A-K-T in drei Farben mittelnass, obwohl er {{t:connected|verbunden}} ist.

Der {{t:two-tone|zweifarbige}} Flop [[Kh 7h 2c]] ist ein {{t:dry|trockener}} Flop mit einem {{t:flush-draw|Flush-Draw}}: Es gibt weder eine {{t:straight|Straße}} noch einen {{t:straight-draw|Straßen-Draw}}. Ein {{t:monotone|monotoner}} Flop ist immer {{t:wet|nass}}: Auf [[Kh 8h 3h]] haben mehr Hände einen {{t:flush|Flush}} oder {{t:flush-draw|Flush-Draw}} als auf [[9h 8d 7c]] eine {{t:straight|Straße}} oder einen {{t:oesd|OESD}}.

Auf einem {{t:dry|trockenen}} Flop bleibt der Führende meist bis zum River vorne. Auf einem {{t:wet|nassen}} verändern spätere Karten oft das Kräfteverhältnis, deshalb ist die beste Hand auf dem Flop weniger sicher.

:::note Woher diese Definitionen stammen
Die Begriffe {{t:dry|trocken}} und {{t:wet|nass}} stammen aus der Pokerliteratur: Als {{t:dry|trocken}} nennen Trainingsmaterialien z. B. K-7-2, A-9-4 und A-A-6 in drei Farben, als {{t:wet|nass}} 9-8-7, Q-J-T und T-9-5-4. Die Punkte und genauen Grenzen, z. B. dass ein mittlerer Flop bei der Zehn beginnt, sind eine Konvention der App, damit sich jeder Flop eindeutig bewerten lässt. Die Quellen nennen keine Punktgrenzen und legen nicht fest, wie man Flops nennt, die weder {{t:dry|trocken}} noch {{t:wet|nass}} sind. Nach dieser Konvention sind etwa {{n:tex.share.dry}} aller Flops {{t:dry|trocken}}, etwa {{n:tex.share.medium}} mittelnass und etwa {{n:tex.share.wet}} {{t:wet|nass}}; das ergibt sich aus den Definitionen der App und ist keine Zahl aus der Literatur.
:::
