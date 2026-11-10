---
id: m3.l2
module: m3
order: 2
title: "Starthände"
sub: "Welche Karten du vor dem Flop spielst"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "Welche Hand ist stärker?"
    options:
      - { text: "A♥ K♥ (gleiche Farbe)", correct: true, why: "Die Ränge sind gleich, aber die gleichfarbige Hand hat einen zusätzlichen Weg zum Sieg: einen {{t:flush|Flush}}." }
      - { text: "A♥ K♣ (verschiedene Farben)", why: "Mit verschiedenen Farben verlierst du die Chance auf einen {{t:flush|Flush}}." }
      - { text: "Sie sind gleich stark", why: "Fast, aber nicht ganz. Die Farbe der Karten spielt eine Rolle." }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "Noch niemand ist ins Spiel eingestiegen. Was tust du?"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|Ich folde}}", correct: true, why: "7-2 in verschiedenen Farben ist eine der schwächsten Hände: Die Karten liegen zu weit auseinander, um zusammen eine {{t:straight|Straße}} zu bilden, sie ergeben selten einen {{t:flush|Flush}}, und ein getroffenes {{t:pair|Paar}} hat einen schwachen Kicker. Sie wird oft als schlechteste Hand bezeichnet, obwohl rechnerisch gegen eine zufällige Hand einige andere, z. B. 3-2 in verschiedenen Farben, noch schlechter abschneiden." }
      - { text: "{{t:raise|Ich erhöhe}}, um zu überraschen", why: "Ein {{t:bluff|Bluff}} (eine schwache Hand so spielen, dass die Gegner bessere Hände {{t:fold|folden}}) preflop mit einer der schwächsten Hände, wenn hinter dir noch vier Spieler sitzen, verliert auf lange Sicht." }
      - { text: "{{t:call|Ich calle}}, weil es billig ist", why: "Jeder „billige“ Einstieg mit einer schwachen Hand summiert sich zu großen Verlusten." }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "Der Spieler vor dir hat {{t:raise|erhöht}}. Was tust du?"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "{{t:raise|Ich erhöhe}} erneut (3-Bet)", correct: true, why: "Du hast die bestmögliche Hand. Du willst so viel wie möglich einzahlen und die Zahl der Gegner verringern." }
      - { text: "Ich {{t:call|calle}} nur", why: "Fortgeschrittene spielen manchmal so, um zu täuschen, aber als Regel verlierst du Wert und lässt andere billig ins Spiel." }
      - { text: "{{t:fold|Ich folde}}", why: "Asse {{t:fold|foldest}} du preflop nie. Gegen jede andere Hand sind sie Favorit, z. B. gegen KK haben sie etwa {{n:pf.aa-vs-kk}}." }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Alle haben bis zu dir {{t:fold|gefoldet}}. Was tust du?"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|Ich erhöhe}}", correct: true, why: "QJ in einer Farbe ist eine sehr gute Hand, um aus {{t:position|Position}} die Blinds anzugreifen: Sie trifft {{t:straight|Straßen}}, Flushes und hohe {{t:pair|Paare}}." }
      - { text: "{{t:fold|Ich folde}}", why: "Am Button ist diese Hand zu gut für einen {{t:fold|Fold}}." }
      - { text: "{{t:call|Ich calle}}", why: "Besser {{t:raise|erhöhen}}: Du hast die Chance, die Blinds sofort zu gewinnen, und spielst mit {{t:initiative|Initiative}}." }
---
Den Großteil ihres Geldes verlieren Anfänger, weil sie zu viele schwache Hände spielen. Eine gute Auswahl der Starthände ist der schnellste Weg, nicht mehr zu verlieren.

## Handgruppen

- **Die stärksten**: [[As Ah]], [[Ks Kh]], [[Qs Qh]] sowie AK gleichfarbig und in verschiedenen Farben, z. B. [[As Ks]] und [[As Kd]]. Du {{t:raise|erhöhst}}, und wenn jemand vor dir {{t:raise|erhöht hat}}, {{t:raise|erhöhst}} du meist erneut (3-Bet) {{t:value|auf Value}}, also damit dein Gegner mit einer schwächeren Hand {{t:call|callt}}.
- **Starke**: JJ, TT, AQ, AJ gleichfarbig, KQ gleichfarbig.
- **Spekulative**: kleine {{t:pair|Paare}} und aufeinanderfolgende Karten in einer Farbe, z. B. [[7h 6h]]. Gut in {{t:late-position|später Position}}.
- **Schwache**: unverbunden, niedrig, in verschiedenen Farben, z. B. [[9c 3d]]. {{t:fold|Folden}}.

:::note Wie viele {{t:combo|Kombinationen}} es gibt
Insgesamt gibt es {{n:combos.total}} {{t:combo|Kombinationen}} von Starthänden, aber nur {{n:combos.kinds}} Arten: {{n:combos.kinds.pair}} {{t:pair|Paare}}, {{n:combos.kinds.suited}} gleichfarbige Hände und {{n:combos.kinds.offsuit}} in verschiedenen Farben. Jedes {{t:pair|Paar}} hat {{n:combos.pair}} {{t:combo|Kombinationen}}, eine gleichfarbige Hand {{n:combos.suited}} und eine Hand in verschiedenen Farben {{n:combos.offsuit}}. Deshalb kommt AK in verschiedenen Farben dreimal so oft vor wie AK gleichfarbig.
:::

Die Gruppen oben sind eine Vereinfachung für den Einstieg. Die genauen {{t:range|Ranges}} fürs {{t:open|Eröffnen}} auf jeder {{t:position|Position}}, in einem Raster der {{t:range|Ranges}}, lernst du in der nächsten Lektion.
