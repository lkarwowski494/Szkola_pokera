---
id: m3.l1
module: m3
order: 1
title: "Position am Tisch"
sub: "Warum dein Platz zählt"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "Welche {{t:position}} ist die beste?"
    options:
      - { text: "Button ({{t:button|BTN}})", correct: true, why: "Ab dem Flop handelt der Button als Letzter und kennt so immer die Entscheidungen der Gegner vor seiner eigenen." }
      - { text: "{{t:big-blind|Big Blind}}", why: "Der {{t:big-blind|BB}} zahlt weniger für den Einstieg, weil er schon eingezahlt hat, handelt ab dem Flop aber als einer der Ersten." }
      - { text: "{{t:utg|UTG}}", why: "{{t:utg|UTG}} handelt preflop als Erster und hat alle Spieler am Tisch hinter sich. Das ist der schwierigste Platz zum Eröffnen." }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "Alle vor dir haben {{t:fold|gefoldet}}. Was tust du?"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "Ich {{t:fold|folde}}", correct: true, why: "K9 in verschiedenen Farben liegt außerhalb der {{t:range|Range}} für die {{t:open|Eröffnung}} von {{t:utg|UTG}}, also außerhalb der Liste von Händen, mit denen du von dieser {{t:position|Position}} {{t:open|eröffnest}}. Hinter dir sitzen fünf Spieler, und oft hat jemand einen König mit besserem Kicker." }
      - { text: "Ich {{t:raise|raise}}", why: "Von {{t:utg|UTG}} {{t:open|eröffnest}} du nur etwa {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} der Hände. K9o trifft leicht einen König und verliert gegen KQ oder AK." }
      - { text: "Ich zahle den {{t:big-blind|Big Blind}}", why: "Nur mitzuzahlen (Limp) von {{t:utg|UTG}} ist eine schlechte Angewohnheit. Entweder ist die Hand einen {{t:raise|Raise}} wert, oder du {{t:fold|foldest}}." }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Dieselbe Hand, aber du sitzt am Button und alle vor dir haben {{t:fold|gefoldet}}."
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "Ich {{t:raise|raise}}", correct: true, why: "Nur noch die Blinds sind übrig, und nach dem Flop hast du {{t:position|Position}}. Am Button {{t:open|eröffnest}} du etwa {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} der Hände, und K9o gehört dazu." }
      - { text: "Ich {{t:fold|folde}}", why: "Zu vorsichtig. Gegen nur die Blinds ist diese Hand gut genug, und die {{t:position}} gibt ihr zusätzlichen Wert." }
      - { text: "Ich zahle den {{t:big-blind|Big Blind}}", why: "Ein Limp gibt die {{t:initiative|Initiative}} ab. Ein {{t:raise|Raise}} gewinnt oft sofort die Blinds." }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "Warum hilft es, als Letzter zu handeln?"
    options:
      - { text: "Ich weiß, was die Gegner getan haben, bevor ich entscheide", correct: true, why: "Jede Aktion eines Gegners ist eine Information. Der Letzte hat die meisten davon und kann billig {{t:check|checken}} oder den {{t:pot|Pot}} an sich ziehen, wenn andere Schwäche zeigen." }
      - { text: "Ich bekomme bessere Karten", why: "Die Karten sind unabhängig von der {{t:position|Position}} zufällig." }
      - { text: "Ich zahle kleinere Blinds", why: "Am Button zahlst du keine Blinds, aber das ist nicht der Hauptvorteil. Am wichtigsten ist die Information." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
Der Dealer-Button (**{{t:button|BTN}}**, Button) wandert mit jeder Hand weiter. Er bestimmt die Reihenfolge, in der gehandelt wird. Ab dem Flop handelt der Button als **Letzter**, und das ist ein riesiger Vorteil: Du siehst, was alle anderen getan haben, bevor du selbst entscheidest. Wer nach dem Flop vor einem Gegner handelt, spielt {{t:out-of-position}}: Er entscheidet, ohne dessen Spielzug zu kennen.

## {{t:position|Positionen}} am 6er-Tisch

| {{t:position|Position}} | Wann sie handelt | Wie breit {{t:open|eröffnen}} |
|---|---|---|
| {{t:utg|UTG}} | Zuerst preflop | etwa {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} der Hände |
| {{t:hijack|HJ}}, {{t:cutoff|CO}} | Nach {{t:utg|UTG}}; {{t:cutoff|CO}} direkt vor dem Button | immer breiter |
| {{t:button|BTN}} | Zuletzt ab dem Flop | etwa {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} der Hände |
| {{t:small-blind|SB}}, {{t:big-blind|BB}} | Zuletzt preflop, zuerst ab dem Flop | {{t:small-blind|SB}} {{t:open|eröffnet}}, wenn alle {{t:fold|folden}} (Lektion über {{t:range|Ranges}}); Verteidigung der Blinds im Modul M4 |

**{{t:hijack|HJ}}** (Hijack) sitzt nach {{t:utg|UTG}}, zwei Plätze vor dem Button, und **{{t:cutoff|CO}}** (Cutoff) direkt vor dem Button. Das sind mittlere {{t:position|Positionen}}: Hinter ihnen sitzen weniger Spieler als hinter {{t:utg|UTG}}, deshalb {{t:open|eröffnest}} du von dort breiter, aber immer noch enger als vom Button.

:::note Größe der {{t:open|Eröffnung}}
Du {{t:open|eröffnest}} von jeder {{t:position|Position}} mit einem {{t:raise|Raise}} auf {{n:pf.open-size}}, aus dem {{t:small-blind|Small Blind}} auf {{n:pf.open-size-sb}}. Das ist eine Vereinfachung: In Solver-Lösungen sind {{t:open|Eröffnungen}} aus {{t:early-position|frühen Positionen}} etwas kleiner (z. B. {{n:pf.open-size.solver-utg}} von {{t:utg|UTG}} und {{n:pf.open-size.solver-co}} vom {{t:cutoff|CO}}), aber eine einzige Größe ist leichter zu lernen. Wenn du als Erster einsteigst, zahlst du nicht einfach nur den Blind (das ist ein {{t:limp}}, also der Einstieg durch bloßes {{t:call|Callen}} des {{t:big-blind|Big Blinds}}): Ein {{t:raise}} kann den {{t:pot|Pot}} sofort gewinnen und gibt dir die {{t:initiative|Initiative}}, denn wer zuletzt {{t:raise|geraist}} hat, macht meist die nächste {{t:bet|Bet}}.
:::
