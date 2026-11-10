---
id: m2.l2
module: m2
order: 2
title: "Pot odds"
sub: "Quando compensa pagar"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "No {{t:pot|pote}} estão {{n:ex.third.pot}}. O adversário {{t:bet|aposta}} {{n:ex.third.bet}}. De quanta equity precisa para {{t:call|pagar}}?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "O {{t:pot|pote}} depois da {{t:bet|aposta}} é {{n:ex.third.pot-after-bet}}, paga {{n:ex.third.bet}}, no total {{n:ex.third.total}}. {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "É o que precisa perante uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}}. Aqui a {{t:bet|aposta}} é 1/3 do {{t:pot|pote}}." }
      - { text: "{{n:eq.bet-third.no-call}}", why: "Isso é {{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}. Some também o seu {{t:call|pagamento}} ao denominador." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "Turn. Tem um {{t:flush-draw|flush draw}}. No {{t:pot|pote}} estão {{n:ex.pot}}, o adversário {{t:bet|aposta}} {{n:ex.bet.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Precisa de {{n:eq.bet-pot}}. O {{t:flush|flush}} dá {{n:outs.flush}} outs, ou seja, cerca de {{n:odds.flush.turn-river}}. Mesmo que acrescente os {{n:pair.outs.per-rank}} ases que dão um {{t:pair|par}} de ases (no total {{n:outs.flush-ace}} outs, cerca de {{n:odds.flush-ace.turn-river}}), continua a ser claramente menos do que {{n:eq.bet-pot}}. Um {{t:call|pagamento}} destes perde a longo prazo." }
      - { text: "{{t:call|Pago}}", why: "É tentador, porque tem um {{t:draw|draw}} para o melhor {{t:flush|flush}} e um ás também pode ajudar, mas mesmo cerca de {{n:odds.flush-ace.turn-river}} é menos do que {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Aumento}} all-in", why: "Entre jogadores avançados, por vezes é uma jogada, mas sem uma boa razão arrisca todo o stack (todas as {{t:chips|fichas}} que tem à sua frente) com uma mão que ainda não tem nada." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "A mesma mão, mas o adversário {{t:bet|aposta}} apenas {{n:ex.bet.quarter}} num {{t:pot|pote}} de {{n:ex.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Precisa de {{n:eq.bet-quarter}} e tem cerca de {{n:odds.flush.turn-river}}, e com os ases ainda mais. Uma {{t:bet|aposta}} pequena dá-lhe um bom preço." }
      - { text: "{{t:fold|Desisto}}", why: "Demasiado barato para {{t:fold|desistir}}: {{n:odds.flush.turn-river}} é mais do que os {{n:eq.bet-quarter}} necessários, e com os ases ainda mais." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "O adversário {{t:bet|aposta}} meio {{t:pot|pote}}. De quanta equity precisa?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|Pote}} {{n:ex.pot}}, {{t:bet|aposta}} {{n:ex.bet.half}}. Paga {{n:ex.bet.half}} para um total de {{n:ex.half.total}}, ou seja, {{n:eq.bet-half}}." }
      - { text: "{{n:ex.wrong.half}}", why: "Erro comum: {{n:ex.wrong.half}} é a {{t:bet|aposta}} dividida pelo {{t:pot|pote}} antes da {{t:bet|aposta}} ({{n:ex.bet.half}} ÷ {{n:ex.pot}}). O valor a pagar divide-se pelo {{t:pot|pote}} inteiro depois do seu {{t:call|pagamento}}: {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}." }
      - { text: "{{n:eq.bet-pot}}", why: "É o que precisa perante uma {{t:bet|aposta}} do tamanho de todo o {{t:pot|pote}}." }
  - kind: generated
    id: m2.l2.g1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    count: 3
  - kind: generated
    id: m2.l2.n1
    family: m2.pot-odds
    rules: [R-M2-003]
    generator: potOdds
    params: { answer: numeric }
    count: 2
  - kind: numeric
    id: m2.l2.n2
    family: m2.pot-odds
    rules: [R-M2-004]
    prompt: "O adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro. De que percentagem de equity precisa para {{t:call|pagar}}? Introduza um número."
    answer: eq.bet-pot
    explanation: "{{t:pot|Pote}} {{n:ex.pot}}, {{t:bet|aposta}} {{n:ex.bet.pot}}. Paga {{n:ex.bet.pot}} para um {{t:pot|pote}} que, depois do seu {{t:call|pagamento}}, tem {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}. Divide o valor a pagar pelo {{t:pot|pote}} inteiro: {{n:eq.bet-pot}}, ou seja, um terço."
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
Quando tem um {{t:draw|draw}} e o adversário {{t:bet|aposta}}, a pergunta é: o preço é bom? Compara dois números: **com que frequência precisa de ganhar** e **com que frequência ganha realmente**.

:::note Equity e probabilidade de acertar
**Equity** é a sua parte do {{t:pot|pote}}: com que frequência ganha se a mão chegar ao showdown sem mais {{t:bet|apostas}}. A **probabilidade de acertar**, da lição sobre outs, é apenas a probabilidade de sair um out. Com um {{t:draw|draw}} puro, que só ganha se acertar, a probabilidade de acertar nas cartas que realmente verá por esse preço é uma aproximação da equity. Perante uma {{t:bet|aposta}} no flop, é a probabilidade com uma carta, e não até ao river.
:::

## Com que frequência precisa de ganhar

```formula
equity necessária = valor a pagar ÷ pote depois de pagar
pote depois de pagar = pote antes da aposta + aposta + valor a pagar
```

Exemplo: no {{t:pot|pote}} estão {{n:ex.pot}} e o adversário {{t:bet|aposta}} {{n:ex.bet.half}}. O {{t:pot|pote}} tem agora {{n:ex.half.pot-after-bet}}, paga {{n:ex.bet.half}}, portanto o {{t:pot|pote}} depois do seu {{t:call|pagamento}} tem {{n:ex.half.total}}. Precisa de {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**.

## Resumo rápido

| {{t:bet|Aposta}} do adversário | Equity necessária |
|---|---|
| {{t:pot|Pote}} inteiro | {{n:eq.bet-pot}} |
| Meio {{t:pot|pote}} | {{n:eq.bet-half}} |
| Um quarto do {{t:pot|pote}} | {{n:eq.bet-quarter}} |

:::note A decisão
Se a sua equity for maior do que a necessária, {{t:call|paga}}. Se for menor, {{t:fold|desiste}}. Isto resulta do {{t:expected-value|valor esperado}}: o {{t:expected-value|EV}} de {{t:call|pagar}} = equity × {{t:pot|pote}} depois do seu {{t:call|pagamento}} − valor do {{t:call|pagamento}}, e este é negativo exatamente quando a equity é menor do que a necessária. Este único cálculo elimina a maioria dos erros dispendiosos dos principiantes. Por agora, deixa de fora as {{t:implied-odds|odds implícitas}}, ou seja, as {{t:chips|fichas}} que espera ganhar mais tarde na mão se completar a sua combinação; voltarão em módulos posteriores.
:::
