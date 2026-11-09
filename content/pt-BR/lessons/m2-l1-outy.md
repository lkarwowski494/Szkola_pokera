---
id: m2.l1
module: m2
order: 1
title: "Outs e chances"
sub: "Regra do 2 e do 4"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "Quantos outs você tem para o {{t:flush|flush}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "Você tem {{n:draw.flush.seen}} cartas de copas (2 na mão, 2 na {{t:board|mesa}}). O baralho tem {{n:cards.per-suit}} cartas de copas, então restam {{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}}." }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}} são todas as cartas de copas do baralho, mas {{n:draw.flush.seen}} você já vê." }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}} são as cartas de copas que você já tem. Contamos as cartas de que você precisa." }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "Quantos outs você tem para a {{t:straight|sequência}}?"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "Você tem 6-7-8-9. Qualquer 5 e qualquer 10 dão a {{t:straight|sequência}}: {{n:draw.oesd.ranks}} valores × {{n:cards.suits}} naipes = {{n:outs.oesd}} cartas." }
      - { text: "{{n:outs.gutshot}}", why: "Seriam esses se faltasse uma carta no meio (gutshot). Aqui a {{t:straight}} está aberta dos dois lados." }
      - { text: "{{n:draw.oesd.ranks}}", why: "São dois valores de carta (5 e 10), mas cada um vem em quatro naipes." }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn, você tem {{n:outs.flush}} outs para o {{t:flush|flush}}. Qual é a chance de acertar no river?"
    options:
      - { text: "Cerca de {{n:odds.flush.turn-river}}", correct: true, why: "Falta uma carta: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (aproximação). Exatamente: {{n:outs.flush}} de {{n:cards.unseen.turn}} cartas desconhecidas, ou seja, {{n:odds.flush.turn-river}}." }
      - { text: "Cerca de {{n:odds.flush.flop-river}}", why: "Essa é a chance no flop, quando ainda faltam duas cartas. No turn, resta uma." }
      - { text: "Cerca de {{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}} significaria que uma em cada duas cartas desconhecidas dá o {{t:flush}}. Só {{n:outs.flush}} de {{n:cards.unseen.turn}} dão." }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "No flop você tem um gutshot ({{n:outs.gutshot}} outs). Qual é a chance de acertar até o river?"
    options:
      - { text: "Cerca de {{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}} (aproximação). Exatamente {{n:odds.gutshot.flop-river}}. Mas você só tem isso quando vê as duas cartas sem mais {{t:bet|apostas}} (all-in). Quando o adversário {{t:bet|aposta}} no flop, você paga por uma carta: aí a chance é de cerca de {{n:odds.gutshot.flop-turn}}." }
      - { text: "Cerca de {{n:odds.gutshot.rule-turn}}", why: "Essa é a chance aproximada com uma carta ({{n:outs.gutshot}} × 2). A pergunta é sobre as duas cartas: o turn e o river." }
      - { text: "Cerca de {{n:odds.oesd.flop-river}}", why: "Isso é o que você teria com {{n:outs.oesd}} outs. Um gutshot tem só {{n:outs.gutshot}}." }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "Flop. Você tem um {{t:flush-draw}}, e o adversário {{t:bet|aposta}}. Com qual chance de acerto você compara o preço do {{t:call|call}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "Cerca de {{n:odds.flush.flop-turn}}, a chance no turn", correct: true, why: "O {{t:call|call}} compra só uma carta. No turn o adversário pode {{t:bet|apostar}} de novo, e você pagará pelo river separadamente. {{n:outs.flush}} de {{n:cards.unseen.flop}} dá cerca de {{n:odds.flush.flop-turn}}." }
      - { text: "Cerca de {{n:odds.flush.flop-river}}, a chance até o river", why: "Você só tem isso quando com certeza verá as duas cartas sem mais {{t:bet|apostas}}, ou seja, em um all-in. Pagando uma {{t:bet}} comum no flop, você compra uma carta." }
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
    prompt: "Turn. Você tem {{n:outs.flush}} outs para o {{t:flush|flush}}. Que porcentagem de chance de acertar no river a regra do 2 e do 4 dá? Digite um número."
    answer: odds.flush.rule-turn
    explanation: "Falta uma carta, então você multiplica por 2: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (aproximação). Exatamente: {{n:outs.flush}} de {{n:cards.unseen.turn}} cartas, ou seja, {{n:odds.flush.turn-river}}."
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
Um **out** é uma carta que melhora a sua mão para uma provável vencedora. Contar outs permite estimar rapidamente as suas chances sem calculadora.

## {{t:draw|Projetos}} comuns

- **{{t:flush-draw|Projeto de flush}}** ({{n:draw.flush.seen}} cartas do mesmo naipe, falta uma para o {{t:flush|flush}}): **{{n:outs.flush}} outs**. Um naipe tem {{n:cards.per-suit}} cartas, e você vê {{n:draw.flush.seen}}.
- **{{t:oesd|Projeto de sequência aberta}}**, por exemplo [[8c 9d]] com a {{t:board|mesa}} [[6s 7h Kd]]: **{{n:outs.oesd}} outs**, ou seja, quatro 5 e quatro 10.
- **Buraco na {{t:straight|sequência}} (gutshot)**, por exemplo 5-6-8-9 sem o 7: **{{n:outs.gutshot}} outs**.

## Regra do 2 e do 4

A regra dá uma aproximação da chance sem calculadora: você multiplica os outs por 2 ou por 4. As chances exatas estão na tabela abaixo.

```formula
chance ≈ outs × 2   (falta uma carta)
chance ≈ outs × 4   (duas cartas, só quando você vê as duas sem mais apostas)
```

| {{t:draw|Projeto}} | Outs | Flop → turn | Flop → river (all-in) | Turn → river |
|---|---|---|---|---|
| {{t:flush|Flush}} | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:oesd|Projeto de sequência aberta}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## Uma carta ou duas?

Quando o adversário {{t:bet|aposta}} no flop, o seu {{t:call}} compra só uma carta: o turn. No turn o adversário pode {{t:bet|apostar}} de novo, e você pagará pelo river separadamente. Por isso, diante de uma {{t:bet|aposta}} no flop, você calcula a chance para a **próxima carta** (× 2): para o {{t:flush|flush}}, são {{n:outs.flush}} de {{n:cards.unseen.flop}}, ou seja, cerca de {{n:odds.flush.flop-turn}}. A chance **até o river** (× 4, para o {{t:flush|flush}} cerca de {{n:odds.flush.flop-river}}) você só usa quando com certeza verá as duas cartas sem mais {{t:bet|apostas}}, ou seja, quando alguém está all-in.

:::note De onde vêm esses números
No turn, você não conhece {{n:cards.unseen.turn}} cartas ({{n:cards.deck}} menos as suas {{n:cards.hole}} e as {{n:cards.board.turn}} da {{t:board|mesa}}). A chance de acertar o {{t:flush|flush}} é de {{n:outs.flush}} em {{n:cards.unseen.turn}}. A regra do 2 e do 4 erra no máximo cerca de {{n:rule24.error.max.pp}} pontos percentuais, desde que você não tenha mais de {{n:rule24.outs.max}} outs.
:::
