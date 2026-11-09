---
id: m2.l2
module: m2
order: 2
title: "Pot odds"
sub: "Quando vale a pena pagar"
rules: [R-M2-003, R-M2-004, R-M2-005]
drills:
  - kind: choice
    id: m2.l2.q1
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "Há {{n:ex.third.pot}} no {{t:pot|pote}}. O adversário {{t:bet|aposta}} {{n:ex.third.bet}}. De quanta equity você precisa para {{t:call|pagar}}?"
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "O {{t:pot|pote}} depois da {{t:bet|aposta}} é {{n:ex.third.pot-after-bet}}, você coloca mais {{n:ex.third.bet}}, total de {{n:ex.third.total}}. {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}." }
      - { text: "{{n:eq.bet-pot}}", why: "É disso que você precisa contra uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}}. Aqui a {{t:bet|aposta}} é 1/3 do {{t:pot|pote}}." }
      - { text: "{{n:eq.bet-third.no-call}}", why: "Isso é {{n:ex.third.bet}} ÷ {{n:ex.third.pot-after-bet}}. Some também o seu {{t:call|call}} ao denominador." }
  - kind: choice
    id: m2.l2.q2
    family: m2.draw-call
    rules: [R-M2-004, R-M2-005]
    prompt: "Turn. Você tem um {{t:flush-draw|projeto de flush}}. No {{t:pot|pote}} há {{n:ex.pot}}, e o adversário {{t:bet|aposta}} {{n:ex.bet.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Você precisa de {{n:eq.bet-pot}}. O {{t:flush|flush}} dá {{n:outs.flush}} outs, ou seja, cerca de {{n:odds.flush.turn-river}}. Mesmo se você somar os {{n:pair.outs.per-rank}} ases que dão um {{t:pair|par}} de ases (total de {{n:outs.flush-ace}} outs, cerca de {{n:odds.flush-ace.turn-river}}), ainda é claramente menos que {{n:eq.bet-pot}}. Um {{t:call|call}} assim perde no longo prazo." }
      - { text: "{{t:call|Pago}}", why: "É tentador, porque você tem um {{t:draw|projeto}} para o melhor {{t:flush|flush}} e um ás também pode ajudar, mas mesmo cerca de {{n:odds.flush-ace.turn-river}} é menos que {{n:eq.bet-pot}}." }
      - { text: "{{t:raise|Aumento}} all-in", why: "Jogadores avançados às vezes fazem essa jogada, mas sem um bom motivo você arrisca todo o stack (todas as {{t:chips|fichas}} que tem à sua frente) com uma mão que ainda não tem nada." }
  - kind: choice
    id: m2.l2.q3
    family: m2.draw-call
    rules: [R-M2-005]
    prompt: "A mesma mão, mas o adversário {{t:bet|aposta}} só {{n:ex.bet.quarter}} num {{t:pot|pote}} de {{n:ex.pot}}."
    table: { hand: "Ah 5h", board: "Kh 8h 3c Jc" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Você precisa de {{n:eq.bet-quarter}} e tem cerca de {{n:odds.flush.turn-river}}, e com os ases, ainda mais. Uma {{t:bet|aposta}} pequena dá um bom preço." }
      - { text: "{{t:fold|Desisto}}", why: "Barato demais para {{t:fold|desistir}}: {{n:odds.flush.turn-river}} é mais que os {{n:eq.bet-quarter}} necessários, e com os ases, ainda mais." }
  - kind: choice
    id: m2.l2.q4
    family: m2.pot-odds
    rules: [R-M2-003]
    prompt: "O adversário {{t:bet|aposta}} meio {{t:pot|pote}}. De quanta equity você precisa?"
    options:
      - { text: "{{n:eq.bet-half}}", correct: true, why: "{{t:pot|Pote}} {{n:ex.pot}}, {{t:bet|aposta}} {{n:ex.bet.half}}. Você coloca {{n:ex.bet.half}} para um total de {{n:ex.half.total}}, ou seja, {{n:eq.bet-half}}." }
      - { text: "{{n:ex.wrong.half}}", why: "Erro comum: {{n:ex.wrong.half}} é a {{t:bet|aposta}} dividida pelo {{t:pot|pote}} de antes da {{t:bet|aposta}} ({{n:ex.bet.half}} ÷ {{n:ex.pot}}). Divida o que você coloca pelo {{t:pot|pote}} inteiro depois do seu {{t:call|call}}: {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = {{n:eq.bet-half}}." }
      - { text: "{{n:eq.bet-pot}}", why: "É disso que você precisa contra uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}} inteiro." }
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
    prompt: "O adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro. De que porcentagem de equity você precisa para {{t:call|pagar}}? Digite um número."
    answer: eq.bet-pot
    explanation: "{{t:pot|Pote}} {{n:ex.pot}}, {{t:bet|aposta}} {{n:ex.bet.pot}}. Você coloca {{n:ex.bet.pot}} num {{t:pot|pote}} que, depois do seu {{t:call|call}}, tem {{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}. Divida o que você coloca pelo {{t:pot|pote}} inteiro: {{n:eq.bet-pot}}, ou seja, um terço."
  - kind: generated
    id: m2.l2.g2
    family: m2.draw-call
    rules: [R-M2-005]
    generator: drawCall
    count: 3
---
Quando o adversário {{t:bet|aposta}} e você tem um {{t:draw|projeto}}, a pergunta é: o preço é bom? Você compara dois números: **com que frequência você precisa ganhar** e **com que frequência você realmente ganha**.

:::note Equity e chance de acertar
**Equity** é a sua parte do {{t:pot|pote}}: com que frequência você vai ganhar se a mão chegar ao showdown sem mais {{t:bet|apostas}}. A **chance de acertar**, da lição sobre outs, é só a probabilidade de sair um out. Com um {{t:draw|projeto}} puro, que só ganha se acertar, a chance de acertar nas cartas que você realmente vai ver por esse preço é uma aproximação da equity. Diante de uma {{t:bet|aposta}} no flop, é a chance com uma carta, e não até o river.
:::

## Com que frequência você precisa ganhar

```formula
equity necessária = call ÷ pote depois do seu call
pote depois do seu call = pote antes da aposta + aposta + call
```

Exemplo: há {{n:ex.pot}} no {{t:pot|pote}}, e o adversário {{t:bet|aposta}} {{n:ex.bet.half}}. O {{t:pot|pote}} agora tem {{n:ex.half.pot-after-bet}}, você coloca mais {{n:ex.bet.half}}, então o {{t:pot|pote}} depois do seu {{t:call|call}} tem {{n:ex.half.total}}. Você precisa de {{n:ex.bet.half}} ÷ {{n:ex.half.total}} = **{{n:eq.bet-half}}**.

## Cola rápida

| {{t:bet|Aposta}} do adversário | Equity necessária |
|---|---|
| {{t:pot|Pote}} inteiro | {{n:eq.bet-pot}} |
| Meio {{t:pot|pote}} | {{n:eq.bet-half}} |
| Um quarto do {{t:pot|pote}} | {{n:eq.bet-quarter}} |

:::note A decisão
Se a sua equity for maior que a necessária, você {{t:call|paga}}. Se for menor, você {{t:fold|desiste}}. Isso decorre do {{t:expected-value|valor esperado}}: o {{t:expected-value|EV}} de um {{t:call|call}} = equity × {{t:pot|pote}} depois do seu {{t:call|call}} − {{t:call|call}}, e isso é negativo exatamente quando a equity é menor que a necessária. Esse único cálculo elimina a maioria dos erros caros de iniciante. Por enquanto, você deixa de lado as {{t:implied-odds|implied odds}}, ou seja, as {{t:chips|fichas}} que espera ganhar mais tarde na mão se completar a sua mão; elas voltam nos próximos módulos.
:::
