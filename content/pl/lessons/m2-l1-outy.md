---
id: m2.l1
module: m2
order: 1
title: "Outy i szanse"
sub: "Reguła 2 i 4"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "Ile masz outów do koloru?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "Masz {{n:draw.flush.seen}} kiery (2 w ręce, 2 na stole). W talii jest {{n:cards.per-suit}} kierów, więc zostało {{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}}." }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}} to wszystkie kiery w talii, ale {{n:draw.flush.seen}} już widzisz." }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}} to kiery, które już masz. Liczymy karty, których potrzebujesz." }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "Ile masz outów do strita?"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "Masz 6-7-8-9. Strita daje każda piątka i każda dziesiątka: {{n:draw.oesd.ranks}} rangi × {{n:cards.suits}} kolory = {{n:outs.oesd}} kart." }
      - { text: "{{n:outs.gutshot}}", why: "Tyle byłoby przy jednej brakującej karcie w środku (gutshot). Tu strit jest otwarty z obu stron." }
      - { text: "{{n:draw.oesd.ranks}}", why: "Dwie rangi kart (piątka i dziesiątka), ale każda w czterech kolorach." }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn, masz {{n:outs.flush}} outów do koloru. Jaka jest szansa, że trafisz na riverze?"
    options:
      - { text: "Ok. {{n:odds.flush.turn-river}}", correct: true, why: "Jedna karta do odkrycia: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}}. Dokładnie {{n:outs.flush}} z {{n:cards.unseen.turn}} nieznanych kart, czyli {{n:odds.flush.turn-river}}." }
      - { text: "Ok. {{n:odds.flush.flop-river}}", why: "To szansa na flopie, gdy przed tobą są dwie karty. Na turnie została jedna." }
      - { text: "Ok. {{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}} znaczyłoby, że kolor daje co druga nieznana karta. Daje go tylko {{n:outs.flush}} z {{n:cards.unseen.turn}}." }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Na flopie masz gutshot ({{n:outs.gutshot}} outy). Jaka jest szansa trafienia do rivera?"
    options:
      - { text: "Ok. {{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}}. Dokładnie {{n:odds.gutshot.flop-river}}. Tyle masz jednak tylko wtedy, gdy zobaczysz obie karty bez dalszych zakładów (all-in). Gdy rywal stawia na flopie, płacisz za jedną kartę: wtedy szansa to ok. {{n:odds.gutshot.flop-turn}}." }
      - { text: "Ok. {{n:odds.gutshot.rule-turn}}", why: "To szansa przy jednej karcie ({{n:outs.gutshot}} × 2). Pytanie dotyczy obu kart: turnu i rivera." }
      - { text: "Ok. {{n:odds.oesd.flop-river}}", why: "Tyle miałbyś z {{n:outs.oesd}} outami. Gutshot ma tylko {{n:outs.gutshot}}." }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "Flop. Masz dobieranie do koloru, a rywal stawia. Z jaką szansą trafienia porównujesz cenę sprawdzenia?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "Ok. {{n:odds.flush.flop-turn}}, szansa na turnie", correct: true, why: "Sprawdzenie kupuje tylko jedną kartę. Na turnie rywal może postawić znowu i za rivera zapłacisz osobno. {{n:outs.flush}} z {{n:cards.unseen.flop}} to ok. {{n:odds.flush.flop-turn}}." }
      - { text: "Ok. {{n:odds.flush.flop-river}}, szansa do rivera", why: "Tyle masz tylko wtedy, gdy na pewno zobaczysz obie karty bez dalszych zakładów, czyli przy all-inie. Za zwykły zakład na flopie kupujesz jedną kartę." }
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
    prompt: "Turn. Masz {{n:outs.flush}} outów do koloru. Ile procent szans na trafienie na riverze daje reguła 2 i 4? Wpisz liczbę."
    answer: odds.flush.rule-turn
    explanation: "Jedna karta do odkrycia, więc mnożysz przez 2: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}}. Dokładnie: {{n:outs.flush}} z {{n:cards.unseen.turn}} kart, czyli {{n:odds.flush.turn-river}}."
  - kind: generated
    id: m2.l1.g3
    family: m2.outs.gutshot
    rules: [R-M2-002]
    generator: outs
    params: { kind: gutshot }
    count: 2
---
**Out** to karta, która poprawia twoją rękę na prawdopodobnie wygrywającą. Liczenie outów pozwala szybko oszacować szanse bez kalkulatora.

## Typowe dobierania

- **Do koloru** ({{n:draw.flush.seen}} karty w kolorze): **{{n:outs.flush}} outów**. W kolorze jest {{n:cards.per-suit}} kart, {{n:draw.flush.seen}} widzisz.
- **Otwarte dobieranie do strita (OESD)**, np. [[8c 9d]] na stole [[6s 7h Kd]]: **{{n:outs.oesd}} outów**, czyli cztery piątki i cztery dziesiątki.
- **Dziura w stricie (gutshot)**, np. 5-6-8-9 bez siódemki: **{{n:outs.gutshot}} outy**.

## Reguła 2 i 4

```formula
szansa ≈ outy × 2   (jedna karta do odkrycia)
szansa ≈ outy × 4   (dwie karty, tylko gdy zobaczysz obie bez dalszych zakładów)
```

| Dobieranie | Outy | Flop → turn | Flop → river (all-in) | Turn → river |
|---|---|---|---|---|
| Kolor | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| OESD | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## Jedna karta czy dwie?

Gdy rywal stawia na flopie, twoje sprawdzenie kupuje tylko jedną kartę: turn. Na turnie rywal może postawić znowu i za rivera zapłacisz osobno. Dlatego przy zakładzie na flopie liczysz szansę na **następną kartę** (× 2): dla koloru to {{n:outs.flush}} z {{n:cards.unseen.flop}}, czyli ok. {{n:odds.flush.flop-turn}}. Szansę **do rivera** (× 4, dla koloru ok. {{n:odds.flush.flop-river}}) bierzesz tylko wtedy, gdy na pewno zobaczysz obie karty bez dalszych zakładów, czyli gdy ktoś jest all-in.

:::note Skąd te liczby
Na turnie nie znasz {{n:cards.unseen.turn}} kart ({{n:cards.deck}} minus {{n:cards.hole}} twoje i {{n:cards.board.turn}} na stole). Szansa trafienia koloru to {{n:outs.flush}} z {{n:cards.unseen.turn}}. Reguła 2 i 4 myli się najwyżej o ok. 2 punkty procentowe, dopóki outów jest nie więcej niż 10.
:::
