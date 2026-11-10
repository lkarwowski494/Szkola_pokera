---
id: m2.l1
module: m2
order: 1
title: "Outs e probabilidades"
sub: "Regra do 2 e do 4"
rules: [R-M2-001, R-M2-002]
drills:
  - kind: choice
    id: m2.l1.q1
    family: m2.outs.flush
    rules: [R-M2-001]
    prompt: "Quantos outs tem para o {{t:flush|flush}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "{{n:outs.flush}}", correct: true, why: "Tem {{n:draw.flush.seen}} cartas de copas (2 na mão, 2 na {{t:board|mesa}}). O baralho tem {{n:cards.per-suit}} cartas de copas, por isso restam {{n:cards.per-suit}} − {{n:draw.flush.seen}} = {{n:outs.flush}}." }
      - { text: "{{n:cards.per-suit}}", why: "{{n:cards.per-suit}} são todas as cartas de copas do baralho, mas já vê {{n:draw.flush.seen}}." }
      - { text: "{{n:draw.flush.seen}}", why: "{{n:draw.flush.seen}} são as cartas de copas que já tem. Contamos as cartas de que precisa." }
  - kind: choice
    id: m2.l1.q2
    family: m2.outs.oesd
    rules: [R-M2-002]
    prompt: "Quantos outs tem para a {{t:straight|sequência}}?"
    table: { hand: "8c 9d", board: "6s 7h Kd" }
    options:
      - { text: "{{n:outs.oesd}}", correct: true, why: "Tem 6-7-8-9. Qualquer cinco e qualquer dez dão a {{t:straight|sequência}}: {{n:draw.oesd.ranks}} valores × {{n:cards.suits}} naipes = {{n:outs.oesd}} cartas." }
      - { text: "{{n:outs.gutshot}}", why: "Seriam esses com uma carta em falta no meio (gutshot). Aqui a {{t:straight}} está aberta dos dois lados." }
      - { text: "{{n:draw.oesd.ranks}}", why: "Dois valores de cartas (cinco e dez), mas cada um existe em quatro naipes." }
  - kind: choice
    id: m2.l1.q3
    family: m2.odds
    rules: [R-M2-002]
    prompt: "Turn, tem {{n:outs.flush}} outs para o {{t:flush|flush}}. Qual é a probabilidade de acertar no river?"
    options:
      - { text: "Cerca de {{n:odds.flush.turn-river}}", correct: true, why: "Falta sair uma carta: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (aproximação). Exatamente {{n:outs.flush}} em {{n:cards.unseen.turn}} cartas desconhecidas, ou seja, {{n:odds.flush.turn-river}}." }
      - { text: "Cerca de {{n:odds.flush.flop-river}}", why: "É a probabilidade no flop, quando ainda faltam duas cartas. No turn resta apenas uma." }
      - { text: "Cerca de {{n:ex.wrong.half}}", why: "{{n:ex.wrong.half}} significaria que uma em cada duas cartas desconhecidas dá a {{t:flush}}. Apenas {{n:outs.flush}} em {{n:cards.unseen.turn}} a dão." }
  - kind: choice
    id: m2.l1.q4
    family: m2.odds
    rules: [R-M2-002]
    prompt: "No flop tem um gutshot ({{n:outs.gutshot}} outs). Qual é a probabilidade de acertar até ao river?"
    options:
      - { text: "Cerca de {{n:odds.gutshot.flop-river}}", correct: true, why: "{{n:outs.gutshot}} × 4 = {{n:odds.gutshot.rule-flop}} (aproximação). Exatamente {{n:odds.gutshot.flop-river}}. No entanto, só tem essa probabilidade quando vê as duas cartas sem mais {{t:bet|apostas}} (all-in). Quando o adversário {{t:bet|aposta}} no flop, o seu pagamento compra apenas uma carta: nesse caso, a probabilidade é de cerca de {{n:odds.gutshot.flop-turn}}." }
      - { text: "Cerca de {{n:odds.gutshot.rule-turn}}", why: "É a aproximação da probabilidade com uma carta ({{n:outs.gutshot}} × 2). A pergunta refere-se às duas cartas: o turn e o river." }
      - { text: "Cerca de {{n:odds.oesd.flop-river}}", why: "É o que teria com {{n:outs.oesd}} outs. Um gutshot tem apenas {{n:outs.gutshot}}." }
  - kind: choice
    id: m2.l1.q5
    family: m2.odds
    rules: [R-M2-001, R-M2-002]
    prompt: "Flop. Tem um {{t:flush-draw}} e o adversário {{t:bet|aposta}}. Com que probabilidade de acertar compara o preço do {{t:call|pagamento}}?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c" }
    options:
      - { text: "Cerca de {{n:odds.flush.flop-turn}}, a probabilidade no turn", correct: true, why: "O {{t:call|pagamento}} compra apenas uma carta. No turn, o adversário pode {{t:bet|apostar}} de novo, e o river paga-se à parte. {{n:outs.flush}} em {{n:cards.unseen.flop}} são cerca de {{n:odds.flush.flop-turn}}." }
      - { text: "Cerca de {{n:odds.flush.flop-river}}, a probabilidade até ao river", why: "Só tem essa probabilidade quando tem a certeza de ver as duas cartas sem mais {{t:bet|apostas}}, ou seja, num all-in. Perante uma {{t:bet}} normal no flop, compra uma carta." }
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
    prompt: "Turn. Tem {{n:outs.flush}} outs para o {{t:flush|flush}}. Que percentagem de probabilidade de acertar no river dá a regra do 2 e do 4? Introduza um número."
    answer: odds.flush.rule-turn
    explanation: "Falta sair uma carta, por isso multiplica por 2: {{n:outs.flush}} × 2 = {{n:odds.flush.rule-turn}} (aproximação). Exatamente: {{n:outs.flush}} em {{n:cards.unseen.turn}} cartas, ou seja, {{n:odds.flush.turn-river}}."
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
Um **out** é uma carta que melhora a sua mão para uma mão provavelmente vencedora. Contar os outs permite estimar rapidamente as probabilidades sem calculadora.

## {{t:draw|Draws}} típicos

- **{{t:flush-draw|Flush draw}}** ({{n:draw.flush.seen}} cartas do mesmo naipe, falta uma para o {{t:flush|flush}}): **{{n:outs.flush}} outs**. Um naipe tem {{n:cards.per-suit}} cartas e vê {{n:draw.flush.seen}}.
- **{{t:oesd|OESD}}**, por exemplo [[8c 9d]] com a {{t:board|mesa}} [[6s 7h Kd]]: **{{n:outs.oesd}} outs**, ou seja, quatro cincos e quatro dez.
- **Buraco na {{t:straight|sequência}} (gutshot)**, por exemplo 5-6-8-9 sem o sete: **{{n:outs.gutshot}} outs**.

## Regra do 2 e do 4

A regra dá uma aproximação da probabilidade sem calculadora: multiplica os outs por 2 ou por 4. As probabilidades exatas estão na tabela abaixo.

```formula
probabilidade ≈ outs × 2   (falta sair uma carta)
probabilidade ≈ outs × 4   (duas cartas, só se vir ambas sem mais apostas)
```

| {{t:draw|Draw}} | Outs | Flop → turn | Flop → river (all-in) | Turn → river |
|---|---|---|---|---|
| {{t:flush|Flush}} | {{n:outs.flush}} | {{n:odds.flush.flop-turn}} | {{n:odds.flush.flop-river}} | {{n:odds.flush.turn-river}} |
| {{t:oesd|OESD}} | {{n:outs.oesd}} | {{n:odds.oesd.flop-turn}} | {{n:odds.oesd.flop-river}} | {{n:odds.oesd.turn-river}} |
| Gutshot | {{n:outs.gutshot}} | {{n:odds.gutshot.flop-turn}} | {{n:odds.gutshot.flop-river}} | {{n:odds.gutshot.turn-river}} |

## Uma carta ou duas?

Quando o adversário {{t:bet|aposta}} no flop, o seu {{t:call}} compra apenas uma carta: o turn. No turn, o adversário pode {{t:bet|apostar}} de novo, e o river paga-se à parte. Por isso, perante uma {{t:bet|aposta}} no flop, calcula a probabilidade para a **carta seguinte** (× 2): para o {{t:flush|flush}} são {{n:outs.flush}} em {{n:cards.unseen.flop}}, ou seja, cerca de {{n:odds.flush.flop-turn}}. A probabilidade **até ao river** (× 4, para o {{t:flush|flush}} cerca de {{n:odds.flush.flop-river}}) só a utiliza quando tem a certeza de ver as duas cartas sem mais {{t:bet|apostas}}, ou seja, quando alguém está all-in.

:::note De onde vêm estes números
No turn há {{n:cards.unseen.turn}} cartas que não conhece ({{n:cards.deck}} menos as suas {{n:cards.hole}} e as {{n:cards.board.turn}} na {{t:board|mesa}}). A probabilidade de acertar o {{t:flush|flush}} é de {{n:outs.flush}} em {{n:cards.unseen.turn}}. A regra do 2 e do 4 erra, no máximo, por cerca de {{n:rule24.error.max.pp}} pontos percentuais, desde que não haja mais de {{n:rule24.outs.max}} outs.
:::
