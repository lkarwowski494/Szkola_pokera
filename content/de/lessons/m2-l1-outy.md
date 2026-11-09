---
id: m2.l1
module: m2
order: 1
title: "Outs und Chancen"
sub: "Die 2-und-4-Regel"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "Wie viele Outs hast du auf einen {{t:flush|Flush}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "Du hast {{n:draw.flush.seen}} Herz (2 auf der Hand, 2 auf dem {{t:board|Board}}). Im Deck gibt es {{n:cards.per-suit}} Herz, also bleiben {{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}} übrig." }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}} sind alle Herz im Deck, aber {{n:draw.flush.seen}} davon siehst du schon." }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}} sind die Herz, die du schon hast. Wir zählen die Karten, die du brauchst." }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "Wie viele Outs hast du auf eine {{t:straight|Straße}}?"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "Du hast 6-7-8-9. Eine {{t:straight|Straße}} bekommst du mit jeder Fünf und jeder Zehn: {{n:draw.oesd.ranks}} Ränge × {{n:cards.suits}} Farben = {{n:outs.oesd}} Karten." }
      - { text: "{{n:outs.gutshot}}", why: "So viele wären es mit einer fehlenden Karte in der Mitte (Gutshot). Hier ist die {{t:straight|Straße}} an beiden Enden offen." }
      - { text: "{{n:draw.oesd.ranks}}", why: "Zwei Kartenränge (Fünf und Zehn), aber jeder in vier Farben." }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn, du hast {{n:outs.flush}} Outs auf einen {{t:flush|Flush}}. Wie hoch ist die Chance, dass du am River triffst?"
    options:
      - { text: "Ca. {{n:odds.flush.turn-river}}", correct: true, why: "Eine Karte kommt noch: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (Näherung). Genau sind es {{n:outs.flush}} von {{n:cards.unseen.turn}} unbekannten Karten, also {{n:odds.flush.turn-river}}." }
      - { text: "Ca. {{n:odds.flush.flop-river}}", why: "Das ist die Chance am Flop, wenn noch zwei Karten kommen. Am Turn ist nur noch eine übrig." }
      - { text: "Ca. {{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}} würde bedeuten, dass dir jede zweite unbekannte Karte einen {{t:flush|Flush}} gibt. Das tun aber nur {{n:outs.flush}} von {{n:cards.unseen.turn}}." }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Am Flop hast du einen Gutshot ({{n:outs.gutshot}} Outs). Wie hoch ist die Chance, bis zum River zu treffen?"
    options:
      - { text: "Ca. {{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}} (Näherung). Genau sind es {{n:odds.gutshot.flop-river}}. So viel hast du aber nur, wenn du beide Karten ohne weitere {{t:bet|Bets}} siehst (All-in). Wenn dein Gegner am Flop {{t:bet|setzt}}, zahlst du für eine Karte: Dann liegt die Chance bei ca. {{n:odds.gutshot.flop-turn}}." }
      - { text: "Ca. {{n:odds.gutshot.rule-turn}}", why: "Das ist die Näherung für die Chance mit einer Karte ({{n:outs.gutshot}} × 2). Die Frage betrifft beide Karten: Turn und River." }
      - { text: "Ca. {{n:odds.oesd.flop-river}}", why: "So viel hättest du mit {{n:outs.oesd}} Outs. Ein Gutshot hat nur {{n:outs.gutshot}}." }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "Flop. Du hast einen {{t:flush-draw|Flush-Draw}}, und dein Gegner {{t:bet|setzt}}. Mit welcher Trefferchance vergleichst du den Preis für einen {{t:call|Call}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "Ca. {{n:odds.flush.flop-turn}}, die Chance am Turn", correct: true, why: "Ein {{t:call|Call}} kauft nur eine Karte. Am Turn kann dein Gegner erneut {{t:bet|setzen}}, und für den River zahlst du extra. {{n:outs.flush}} von {{n:cards.unseen.flop}} sind ca. {{n:odds.flush.flop-turn}}." }
      - { text: "Ca. {{n:odds.flush.flop-river}}, die Chance bis zum River", why: "So viel hast du nur, wenn du sicher beide Karten ohne weitere {{t:bet|Bets}} siehst, also bei einem All-in. Gegen eine normale {{t:bet|Bet}} am Flop kaufst du eine Karte." }
  - kind: generated
    id: m2.l1.g1
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush }
    count: 2
  - kind: generated
    id: m2.l1.g2
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd }
    count: 2
  - kind: generated
    id: m2.l1.n1
    family: m2.outs.oesd
    rules: [R-M2-002]
    generator: outs
    params: { kind: oesd, answer: numeric }
    count: 1
  - kind: generated
    id: m2.l1.n2
    family: m2.outs.flush
    rules: [R-M2-001]
    generator: outs
    params: { kind: flush, answer: numeric }
    count: 1
  - kind: numeric
    id: m2.l1.n3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn. Du hast {{n:outs.flush}} Outs auf einen {{t:flush|Flush}}. Wie viel Prozent Trefferchance am River ergibt die 2-und-4-Regel? Gib eine Zahl ein."
    answer: odds.flush.rule-turn
    explanation: "Eine Karte kommt noch, also multiplizierst du mit 2: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (Näherung). Genau: {{n:outs.flush}} von {{n:cards.unseen.turn}} Karten, also {{n:odds.flush.turn-river}}."
  - kind: generated
    id: m2.l1.g3
    family: m2.outs.gutshot
    rules: [R-M2-002]
    generator: outs
    params: { kind: gutshot }
    count: 2
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar math
  - kind: generated
    id: m2.l1.g-vocab-math
    family: vocab.math
    generator: vocab
    params: { area: math, dir: both }
    count: 4
---
Ein **Out** ist eine Karte, die deine Hand zu einer wahrscheinlich gewinnenden Hand verbessert. Wenn du Outs zählst, kannst du deine Chancen schnell ohne Taschenrechner abschätzen.

## Typische {{t:draw|Draws}}

- **{{t:flush-draw|Flush-Draw}}** ({{n:draw.flush.seen}} Karten einer Farbe, eine fehlt zum {{t:flush|Flush}}): **{{n:outs.flush}} Outs**. Eine Farbe hat {{n:cards.per-suit}} Karten, {{n:draw.flush.seen}} davon siehst du.
- **{{t:oesd|OESD}}**, z. B. [[8c 9d]] auf dem {{t:board|Board}} [[6s 7h Kd]]: **{{n:outs.oesd}} Outs**, also vier Fünfen und vier Zehnen.
- **Lücke in der {{t:straight|Straße}} (Gutshot)**, z. B. 5-6-8-9 ohne die Sieben: **{{n:outs.gutshot}} Outs**.

## Die 2-und-4-Regel

Die Regel liefert dir eine Näherung für deine Chance ohne Taschenrechner: Du multiplizierst die Outs mit 2 oder 4. Die genauen Chancen stehen in der Tabelle unten.

```formula
Chance ≈ Outs × 2   (eine Karte kommt noch)
Chance ≈ Outs × 4   (zwei Karten, nur wenn du beide ohne weitere Bets siehst)
```

| {{t:draw|Draw}} | Outs | Flop → Turn | Flop → River (All-in) | Turn → River |
|---|---|---|---|---|
| {{t:flush|Flush}} | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:oesd|OESD}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## Eine Karte oder zwei?

Wenn dein Gegner am Flop {{t:bet|setzt}}, kauft dein {{t:call|Call}} nur eine Karte: den Turn. Am Turn kann dein Gegner erneut {{t:bet|setzen}}, und für den River zahlst du extra. Deshalb rechnest du bei einer {{t:bet|Bet}} am Flop mit der Chance auf die **nächste Karte** (× 2): Beim {{t:flush|Flush}} sind das {{n:outs.flush}} von {{n:cards.unseen.flop}}, also ca. {{n:odds.flush.flop-turn}}. Die Chance **bis zum River** (× 4, beim {{t:flush|Flush}} ca. {{n:odds.flush.flop-river}}) nimmst du nur, wenn du sicher beide Karten ohne weitere {{t:bet|Bets}} siehst, also wenn jemand all-in ist.

:::note Woher diese Zahlen kommen
Am Turn kennst du {{n:cards.unseen.turn}} Karten nicht ({{n:cards.deck}} minus deine {{n:cards.hole}} und die {{n:cards.board.turn}} auf dem {{t:board|Board}}). Die Chance, einen {{t:flush|Flush}} zu treffen, ist {{n:outs.flush}} von {{n:cards.unseen.turn}}. Die 2-und-4-Regel liegt höchstens um ca. {{n:rule24.error.max.pp}} Prozentpunkte daneben, solange du nicht mehr als {{n:rule24.outs.max}} Outs hast.
:::
