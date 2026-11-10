---
id: m2.l1
module: m2
order: 1
title: "Out e probabilità"
sub: "La regola del 2 e del 4"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "Quanti out hai per il {{t:flush|colore}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "Hai {{n:draw.flush.seen}} cuori (2 in mano, 2 sul {{t:board|board}}). Nel mazzo ci sono {{n:cards.per-suit}} cuori, quindi ne restano {{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}}." }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}} sono tutti i cuori del mazzo, ma {{n:draw.flush.seen}} li vedi già." }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}} sono i cuori che hai già. Contiamo le carte che ti servono." }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "Quanti out hai per la {{t:straight|scala}}?"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "Hai 6-7-8-9. Qualsiasi cinque e qualsiasi dieci ti danno la {{t:straight|scala}}: {{n:draw.oesd.ranks}} valori × {{n:cards.suits}} semi = {{n:outs.oesd}} carte." }
      - { text: "{{n:outs.gutshot}}", why: "Tanti ne avresti con una sola carta mancante nel mezzo (gutshot). Qui la {{t:straight}} è aperta da entrambi i lati." }
      - { text: "{{n:draw.oesd.ranks}}", why: "Due valori di carta (il cinque e il dieci), ma ognuno in quattro semi." }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn, hai {{n:outs.flush}} out per il {{t:flush|colore}}. Qual è la probabilità di chiuderlo al river?"
    options:
      - { text: "Circa {{n:odds.flush.turn-river}}", correct: true, why: "Una carta da scoprire: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (approssimazione). Esattamente {{n:outs.flush}} su {{n:cards.unseen.turn}} carte sconosciute, cioè {{n:odds.flush.turn-river}}." }
      - { text: "Circa {{n:odds.flush.flop-river}}", why: "È la probabilità al flop, quando hai davanti due carte. Al turn ne resta una." }
      - { text: "Circa {{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}} vorrebbe dire che il {{t:flush}} te lo dà una carta sconosciuta su due. Te lo danno solo {{n:outs.flush}} su {{n:cards.unseen.turn}}." }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Al flop hai un gutshot ({{n:outs.gutshot}} out). Qual è la probabilità di chiuderlo entro il river?"
    options:
      - { text: "Circa {{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}} (approssimazione). Esattamente {{n:odds.gutshot.flop-river}}. Però ce l'hai solo quando vedi entrambe le carte senza altre {{t:bet|puntate}} (all-in). Quando l'avversario {{t:bet|punta}} al flop, paghi per una carta: allora la probabilità è circa {{n:odds.gutshot.flop-turn}}." }
      - { text: "Circa {{n:odds.gutshot.rule-turn}}", why: "È l'approssimazione della probabilità con una carta ({{n:outs.gutshot}} × 2). La domanda riguarda entrambe le carte: turn e river." }
      - { text: "Circa {{n:odds.oesd.flop-river}}", why: "Tanto avresti con {{n:outs.oesd}} out. Un gutshot ne ha solo {{n:outs.gutshot}}." }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "Flop. Hai un {{t:flush-draw}} e l'avversario {{t:bet|punta}}. Con quale probabilità di chiusura confronti il prezzo della {{t:call|chiamata}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "Circa {{n:odds.flush.flop-turn}}, la probabilità al turn", correct: true, why: "La {{t:call|chiamata}} compra solo una carta. Al turn l'avversario può {{t:bet|puntare}} di nuovo e il river lo pagherai a parte. {{n:outs.flush}} su {{n:cards.unseen.flop}} fa circa {{n:odds.flush.flop-turn}}." }
      - { text: "Circa {{n:odds.flush.flop-river}}, la probabilità entro il river", why: "Ce l'hai solo quando sei sicuro di vedere entrambe le carte senza altre {{t:bet|puntate}}, cioè con un all-in. Con una normale {{t:bet}} al flop compri una carta." }
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
    prompt: "Turn. Hai {{n:outs.flush}} out per il {{t:flush|colore}}. Quale percentuale di probabilità di chiuderlo al river dà la regola del 2 e del 4? Inserisci un numero."
    answer: odds.flush.rule-turn
    explanation: "Una carta da scoprire, quindi moltiplichi per 2: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (approssimazione). Esattamente: {{n:outs.flush}} su {{n:cards.unseen.turn}} carte, cioè {{n:odds.flush.turn-river}}."
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
Un **out** è una carta che migliora la tua mano rendendola probabilmente vincente. Contare gli out ti permette di stimare in fretta le probabilità senza calcolatrice.

## {{t:draw|Progetti}} tipici

- **{{t:flush-draw|Progetto di colore}}** ({{n:draw.flush.seen}} carte dello stesso seme, ne manca una per il {{t:flush|colore}}): **{{n:outs.flush}} out**. Un seme ha {{n:cards.per-suit}} carte, {{n:draw.flush.seen}} le vedi.
- **{{t:oesd|OESD}}**, ad es. [[8c 9d]] sul {{t:board|board}} [[6s 7h Kd]]: **{{n:outs.oesd}} out**, cioè quattro cinque e quattro dieci.
- **Buco nella {{t:straight|scala}} (gutshot)**, ad es. 5-6-8-9 senza il sette: **{{n:outs.gutshot}} out**.

## La regola del 2 e del 4

La regola ti dà un'approssimazione della probabilità senza calcolatrice: moltiplichi gli out per 2 o per 4. Le probabilità esatte sono nella tabella qui sotto.

```formula
probabilità ≈ out × 2   (una carta da scoprire)
probabilità ≈ out × 4   (due carte, solo se le vedi entrambe senza altre puntate)
```

| {{t:draw|Progetto}} | Out | Flop → turn | Flop → river (all-in) | Turn → river |
|---|---|---|---|---|
| {{t:flush|Colore}} | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:oesd|OESD}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## Una carta o due?

Quando l'avversario {{t:bet|punta}} al flop, la tua {{t:call|chiamata}} compra solo una carta: il turn. Al turn l'avversario può {{t:bet|puntare}} di nuovo e il river lo pagherai a parte. Per questo, davanti a una {{t:bet|puntata}} al flop, calcoli la probabilità per la **carta successiva** (× 2): per il {{t:flush|colore}} sono {{n:outs.flush}} su {{n:cards.unseen.flop}}, cioè circa {{n:odds.flush.flop-turn}}. La probabilità **entro il river** (× 4, per il {{t:flush|colore}} circa {{n:odds.flush.flop-river}}) la usi solo quando sei sicuro di vedere entrambe le carte senza altre {{t:bet|puntate}}, cioè quando qualcuno è all-in.

:::note Da dove vengono questi numeri
Al turn non conosci {{n:cards.unseen.turn}} carte ({{n:cards.deck}} meno le tue {{n:cards.hole}} e le {{n:cards.board.turn}} sul {{t:board|board}}). La probabilità di chiudere il {{t:flush|colore}} è {{n:outs.flush}} su {{n:cards.unseen.turn}}. La regola del 2 e del 4 sbaglia al massimo di circa {{n:rule24.error.max.pp}} punti percentuali, finché gli out non sono più di {{n:rule24.outs.max}}.
:::
