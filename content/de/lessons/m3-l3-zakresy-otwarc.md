---
id: m3.l3
module: m3
order: 3
title: "Eröffnungsranges"
sub: "Womit du als Erster einsteigst, Position für Position"
rules: [R-M3-002, R-M3-006, R-M3-003, R-M3-009, R-M3-004, R-M3-010]
drills:
  - kind: generated
    id: m3.l3.g-early
    family: m3.rfi.early
    rules: [R-M3-002, R-M3-006]
    generator: rangeDecision
    params: { spots: "rfi.utg,rfi.hj" }
    count: 5
  - kind: generated
    id: m3.l3.g-late
    family: m3.rfi.late
    rules: [R-M3-006, R-M3-003]
    generator: rangeDecision
    params: { spots: "rfi.co,rfi.btn" }
    count: 5
  - kind: generated
    id: m3.l3.g-sb
    family: m3.rfi.sb
    rules: [R-M3-004]
    generator: rangeDecision
    params: { spots: "rfi.sb" }
    count: 3
  - kind: paint
    id: m3.l3.p-btn
    family: m3.paint.late
    rules: [R-M3-003]
    spot: rfi.btn
    prompt: "Alle vor dir haben {{t:fold|gefoldet}}, du sitzt auf dem Button. Male die Hände an, mit denen du {{t:open|eröffnest}}."
  - kind: paint
    id: m3.l3.p-utg
    family: m3.paint.early
    rules: [R-M3-002]
    spot: rfi.utg
    prompt: "Du bist als Erster am Zug ({{t:utg}}). Male die Hände an, mit denen du {{t:open|eröffnest}}."
---
Die {{t:range|Range}} für die {{t:open|Eröffnung}} ist die Liste der Hände, mit denen du {{t:raise|raist}}, wenn alle vor dir {{t:fold|gefoldet}} haben. Die Raster unten hat der Preflop-Solver dieser App für das Spiel an einem 6er-Tisch mit Stacks von {{n:format.stack}} berechnet.

## So liest du das Raster

Jedes Feld steht für eine Art von Hand. Über der Diagonalen stehen die Hände in einer Farbe (z. B. AKs), darunter die Hände in verschiedenen Farben (z. B. AKo) und auf der Diagonalen die {{t:pair|Paare}}. Ein grünes Feld ist ein {{t:raise|Raise}}, ein leeres ein {{t:fold|Fold}}. Ein teilweise gefülltes Feld bedeutet, dass der Solver die Hand nur manchmal spielt. Wenn er sie mit einer Häufigkeit zwischen {{n:range.mixed.low}} und {{n:range.mixed.high}} {{t:open|eröffnet}} (diese Schwellen sind eine Einstellung der App), ist sie eine {{t:mixed-hand|gemischte Hand}}: In den Übungen akzeptieren wir dann beide Antworten. Eine Aktion, die der Solver seltener als in {{n:range.mixed.low}} der Fälle spielt, aber mindestens in {{n:range.mixed.min}}, werten die Übungen als zulässig: Das ist kein Fehler, aber die Wiederholung dieser Aufgabe kommt früher wieder. Eine Aktion, die der Solver seltener als in {{n:range.mixed.min}} der Fälle spielt, bewerten die Übungen als Ungenauigkeit (so nennt die von der Website des Solvers veröffentlichte Bewertungsskala solche Züge) und eine Aktion, die der Solver nie spielt, als Fehler.

## Von der ersten {{t:position|Position}} bis zum Button

```range
rfi.utg
```

Von {{t:utg}} {{t:open|eröffnet}} der Solver {{n:solver.rfi.utg}} der Hände. Professionelle Quellen nennen {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}}.

```range
rfi.hj
```

```range
rfi.co
```

Mit jeder {{t:position|Position}} näher am Button wächst die {{t:range|Range}}: Der {{t:hijack|HJ}} {{t:open|eröffnet}} {{n:solver.rfi.hj}}, der {{t:cutoff|CO}} schon {{n:solver.rfi.co}} der Hände.

```range
rfi.btn
```

Auf dem Button {{t:open|eröffnet}} der Solver schon {{n:solver.rfi.btn}} der Hände, denn es sind nur noch die Blinds übrig, und nach dem Flop hast du {{t:position|Position}}.

```range
rfi.sb
```

Der {{t:small-blind|Small Blind}} spielt nur noch gegen den {{t:big-blind|Big Blind}}, deshalb {{t:open|eröffnet}} er ähnlich weit wie der Button: etwa {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} der Hände, obwohl er nach dem Flop als Erster handelt. Auf {{t:stakes|Mikrolimits}} {{t:raise|raist}} du aus dem {{t:small-blind|Small Blind}} oder {{t:fold|foldest}}, ohne zum {{t:big-blind|Big Blind}} zu komplettieren: Der {{t:rake|Rake}}, der vom {{t:pot|Pot}} abgezogen wird, verringert den Gewinn aus dem Komplettieren. Das ist eine Vereinfachung: Manche Solver-Lösungen komplettieren einen Teil der Hände aus dem {{t:small-blind|Small Blind}}. Der Solver der App {{t:open|eröffnet}} von hier {{n:solver.rfi.sb}} der Hände, also innerhalb der Spanne aus den Quellen.

:::note Am 9er-Tisch
Am 9er-Tisch gibt es vor dem {{t:hijack|HJ}} noch drei {{t:position|Positionen}}: {{t:utg}}, {{t:utg|UTG}}+1 und {{t:utg|UTG}}+2, danach kommt der LJ. Hinter {{t:utg}} sitzen dann acht Spieler, deshalb {{t:open|eröffnest}} du von {{t:utg}}, {{t:utg|UTG}}+1 und {{t:utg|UTG}}+2 enger als von {{t:utg}} am 6er-Tisch: Hinter dir sitzen mehr Spieler. Wenn diese drei Spieler {{t:fold|folden}}, spielt der LJ wie {{t:utg}} am 6er-Tisch und die späteren {{t:position|Positionen}} genauso wie in den Rastern oben. Für die frühen {{t:position|Positionen}} am 9er-Tisch geben wir nur die Richtung an: Die Zahlen und die Zusammensetzung dieser {{t:range|Ranges}} haben wir noch nicht mit veröffentlichten Solver-Lösungen abgeglichen.
:::

:::note So merkst du es dir
Lerne die {{n:combos.kinds}} Felder nicht auswendig. Merk dir die Grenzen: welche {{t:pair|Paare}}, welche Asse in einer Farbe und ab welcher Karte die Hände in verschiedenen Farben beginnen. Die Übungen unten ziehen gerade die Hände an der Grenze der {{t:range|Range}} häufiger.
:::

Diese {{t:range|Ranges}} stammen aus einem Modell, das das Spiel nach dem Flop vereinfacht, deshalb weichen sie bei gut einem Dutzend Händen an der Grenze der {{t:range|Range}} von professionellen Tabellen ab, mal in die eine, mal in die andere Richtung. Das sind vor allem Hände in einer Farbe mit Lücke (z. B. 75s, 97s) und schwache Hände in verschiedenen Farben (z. B. A4o, K7o). Diese Hände bewerten die Übungen nicht.
