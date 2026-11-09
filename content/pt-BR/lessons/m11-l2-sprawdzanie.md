---
id: m11.l2
module: m11
order: 2
title: "Pagar um all-in"
sub: "De quanta equity você precisa e por que paga mais apertado"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Você tem {{n:m11.depth.10}} no {{t:big-blind|big blind}}, sem ante. O {{t:small-blind|small blind}} foi all-in com {{n:m11.depth.10}}. De quantos por cento de equity você precisa para que o {{t:call|call}} seja lucrativo? Digite um número."
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "Seu blind já está no {{t:pot|pote}}, então você completa {{n:m11.call.10.cost}}. Depois do {{t:call|call}}, o {{t:pot|pote}} tem {{n:m11.call.10.pot}}: {{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}."
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Mesmo spot, mas os stacks são de {{n:m11.depth.5}} cada. De quanta equity você precisa para {{t:call|pagar}} o all-in?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "Você completa {{n:m11.call.5.cost}} num {{t:pot|pote}} que, depois do {{t:call|call}}, tem {{n:m11.call.5.pot}}: {{n:m11.call.5.eq}}. Com um stack mais curto, o blind é uma parte maior do stack, então o preço é melhor." }
      - { text: "{{n:m11.call.10.eq}}", why: "Esse é o preço com {{n:m11.depth.10}}. Com {{n:m11.depth.5}}, seu blind é uma parte maior do stack inteiro, então você precisa de menos: {{n:m11.call.5.eq}}." }
      - { text: "Metade", why: "Você precisaria de metade se colocasse o stack inteiro. O blind já está no {{t:pot|pote}}, então você só completa {{n:m11.call.5.cost}}." }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Stacks de {{n:m11.depth.15}} cada, e o {{t:small-blind|small blind}} foi all-in. De quanta equity você precisa para {{t:call|pagar}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "Você completa {{n:m11.call.15.cost}} num {{t:pot|pote}} de {{n:m11.call.15.pot}}: {{n:m11.call.15.eq}}. Quanto mais fundo o stack, mais perto da metade." }
      - { text: "{{n:m11.call.5.eq}}", why: "Esse é o preço com {{n:m11.depth.5}}. Com {{n:m11.depth.15}}, o blind é uma parte menor do stack, então o preço sobe para {{n:m11.call.15.eq}}." }
      - { text: "Mais da metade", why: "Mesmo com um stack muito fundo, o preço não passa da metade: você sempre tem seu blind no {{t:pot|pote}}." }
  - kind: generated
    id: m11.l2.g-call
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-5,call.bb-10,call.bb-15" }
    count: 3
  - kind: paint
    id: m11.l2.p-call-10
    family: m11.paint.call
    rules: [R-M11-007]
    spot: call.bb-10
    prompt: "Você tem {{n:m11.depth.10}} no {{t:big-blind|big blind}}, e o {{t:small-blind|small blind}} foi all-in. Pinte as mãos com que você {{t:call|paga}}."
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Com {{n:m11.depth.10}}, o solver vai all-in do {{t:small-blind|small blind}} com sete e seis do mesmo naipe (76s). Você tem essa mão no {{t:big-blind|big blind}}, e foi o {{t:small-blind|small blind}} que foi all-in. O que você faz?"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "Ir all-in com 76s é lucrativo principalmente graças aos {{t:fold|folds}} do adversário. Ao {{t:call|pagar}}, você só ganha no showdown, e contra um {{t:range|range}} de all-in com muitas cartas altas e {{t:pair|pares}}. O solver {{t:fold|folda}} essa mão." }
      - { text: "{{t:call|Pago}}, porque do {{t:small-blind|small blind}} eu iria all-in com ela", why: "{{t:call|Pagar}} é outra situação: você não tem fold equity, e o {{t:range|range}} do adversário é mais forte que um aleatório. Para {{t:call|pagar}}, você precisa de uma mão mais forte." }
      - { text: "{{t:call|Pago}}, porque mão do mesmo naipe se desenvolve bem", why: "Depois de um all-in, não há jogo posterior em que a mão possa se desenvolver. Só conta a equity até o showdown." }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|Big blind}}, e o {{t:small-blind|small blind}} foi all-in. Você tem um {{t:pair|par}} de dois. Com {{n:m11.depth.10}}, o solver {{t:call|paga}}. E com {{n:m11.depth.15}}?"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "{{t:fold|Folda}}", correct: true, why: "Com {{n:m11.depth.15}}, o preço sobe para {{n:m11.call.15.eq}}, e o {{t:range|range}} de all-in é mais estreito (cerca de {{n:m11.push.15}} mãos), então um {{t:pair|par}} de dois encontra um {{t:pair|par}} maior com mais frequência. O {{t:range|range}} de {{t:call|call}} cai de cerca de {{n:m11.call.10}} para cerca de {{n:m11.call.15}} mãos." }
      - { text: "{{t:call|Paga}}, porque um {{t:pair|par}} é sempre favorito", why: "Um {{t:pair|par}} de dois contra duas cartas maiores é mais ou menos um cara ou coroa, e contra qualquer {{t:pair|par}} maior é um azarão claro. Com um stack mais fundo, o adversário {{t:shove|dá shove}} com menos mãos fracas, então os {{t:pair|pares}} formam uma parte maior do {{t:range|range}} dele." }
      - { text: "{{t:call|Paga}}, porque quanto mais fundo o stack, mais aberto", why: "Ao contrário: quanto mais fundo o stack, mais custa o {{t:call|call}} e mais estreito é o {{t:range|range}} de {{t:call|call}}." }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Com {{n:m11.depth.10}}, o {{t:small-blind|small blind}} vai all-in com cerca de {{n:m11.push.10}} mãos, mas o {{t:big-blind|big blind}} {{t:call|paga}} só com cerca de {{n:m11.call.10}}. Por quê?"
    options:
      - { text: "Quem paga não tem fold equity e joga contra um {{t:range|range}} mais forte que um aleatório", correct: true, why: "O all-in também ganha quando o adversário {{t:fold|folda}}. O {{t:call|call}} só ganha no showdown, e contra mãos que já passaram por uma seleção. Daí a velha regra: para {{t:call|pagar}}, você precisa de uma mão melhor do que para ir all-in primeiro." }
      - { text: "O {{t:big-blind|big blind}} paga mais", why: "Os dois arriscam o mesmo stack, e o {{t:big-blind|BB}} já tem seu blind no {{t:pot|pote}}, então completa até menos." }
      - { text: "O solver está errado", why: "Este é o equilíbrio do jogo de all-in ou {{t:fold|fold}}: nenhum jogador ganha mudando apenas o próprio {{t:range|range}}. A diferença vem da fold equity." }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "O jogo é com {{t:bb-ante|big blind ante}}. Você tem {{n:m11.depth.10}} no {{t:big-blind|big blind}} e colocou um ante de {{n:m11.ante}}. O {{t:small-blind|small blind}} foi all-in. De quanta equity você precisa para {{t:call|pagar}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "Você completa o mesmo valor ({{n:m11.call.10.cost}}), mas o {{t:pot|pote}} também tem o ante: depois do {{t:call|call}}, {{n:m11.call.10-ante.pot}}. {{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}. Por isso, com ante, você {{t:call|paga}} mais aberto: cerca de {{n:m11.call.10-ante}} mãos em vez de {{n:m11.call.10}}." }
      - { text: "{{n:m11.call.10.eq}}", why: "Esse é o preço sem ante. O ante fica no {{t:pot|pote}}, então pelo mesmo valor você ganha mais: {{n:m11.call.10-ante.eq}}." }
      - { text: "Mais do que sem ante, porque você colocou mais", why: "O ante é dinheiro já gasto. Só conta quanto você ainda completa e quanto pode ganhar." }
  - kind: generated
    id: m11.l2.g-call-ante
    family: m11.call.bb
    rules: [R-M11-007]
    generator: rangeDecision
    params: { spots: "call.bb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l2.g-call-3max
    family: m11.call.3max
    rules: [R-M11-012]
    generator: rangeDecision
    params: { spots: "call.sb-vs-btn-3max,call.bb-vs-btn-3max,call.bb-vs-two-3max" }
    count: 2
  - kind: choice
    id: m11.l2.q-overcall
    family: m11.call.3max
    rules: [R-M11-012]
    prompt: "Três jogadores, stacks de {{n:m11.depth.3max}} cada. O Button foi all-in, e o {{t:small-blind|small blind}} {{t:call|pagou}}. No {{t:big-blind|big blind}}, você precisa de só {{n:m11.3max.bb-two.eq}} de equity. Você {{t:call|paga}} mais aberto do que quando só o Button foi all-in?"
    table: { position: BB }
    options:
      - { text: "Não, mais apertado", correct: true, why: "O preço é melhor, mas você joga contra dois {{t:range|ranges}}, incluindo o de quem pagou, que tem uma mão forte. O solver {{t:call|paga}} aqui com cerca de {{n:m11.3max.call.bb-two}} mãos e, quando só o Button está all-in, com cerca de {{n:m11.3max.call.bb}}." }
      - { text: "Sim, porque o preço é muito melhor", why: "Um preço melhor não basta: contra dois adversários, a equity das mãos mais fracas cai rápido. O solver {{t:call|paga}} só com cerca de {{n:m11.3max.call.bb-two}} mãos." }
      - { text: "Igual, porque só a sua mão importa", why: "Importa a equity contra as mãos dos adversários. Quem paga o all-in do Button tem um {{t:range|range}} mais forte que o do Button, então você {{t:call|paga}} mais apertado." }
---
Quando um adversário vai all-in e você está no {{t:big-blind|big blind}}, a decisão é simples na forma: você {{t:call|paga}} ou {{t:fold|folda}}. Depois do {{t:call|call}}, não há mais jogo, então só contam o preço e a sua equity contra o {{t:range|range}} de all-in.

## O preço do {{t:call|call}}

Seu blind já está no {{t:pot|pote}}. Com um stack de {{n:m11.depth.10}}, você completa {{n:m11.call.10.cost}}, e o {{t:pot|pote}} depois do {{t:call|call}} tem {{n:m11.call.10.pot}}.

```formula
equity necessária = valor a completar ÷ pote depois do call
```

| Stack | A completar | {{t:pot|Pote}} depois do {{t:call|call}} | Equity necessária |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

Quanto mais curto o stack, melhor o preço, porque seu blind é uma parte maior do stack inteiro.

## Você {{t:call|paga}} mais apertado do que {{t:shove|dá shove}}

Indo all-in primeiro, você também ganha quando o adversário {{t:fold|folda}}. Ao {{t:call|pagar}}, você só ganha no showdown, e contra mãos que o adversário escolheu para ir all-in. Por isso, para {{t:call|pagar}}, você precisa de uma mão melhor do que para ir all-in primeiro (na literatura, isso se chama “gap concept”).

```range
call.bb-10
```

Com {{n:m11.depth.10}}, o {{t:small-blind|small blind}} vai all-in com cerca de {{n:m11.push.10}} mãos, e o {{t:big-blind|big blind}} {{t:call|paga}} com cerca de {{n:m11.call.10}}. Mãos como [[7s 6s]] você {{t:shove|dá shove}} do {{t:small-blind|small blind}}, mas {{t:fold|folda}} contra um all-in: sem fold equity, elas têm equity de menos contra cartas altas e {{t:pair|pares}}. Para comparar, a tabela de um site de treinamento dá, com {{n:m11.depth.10}}, um {{t:range|range}} de {{t:call|call}} de {{n:m11.ext.call.10}}.

```range
call.bb-15
```

```range
call.bb-5
```

Um stack mais fundo significa um {{t:call|call}} mais caro e um {{t:range|range}} de all-in do adversário mais estreito, então você {{t:call|paga}} com menos frequência: cerca de {{n:m11.call.15}} com {{n:m11.depth.15}} e, com {{n:m11.depth.5}}, até cerca de {{n:m11.call.5}}.

## Quando ainda há alguém depois de você

Com três jogadores e stacks de {{n:m11.depth.3max}} cada, o {{t:small-blind|small blind}} {{t:call|paga}} o all-in do Button só com cerca de {{n:m11.3max.call.sb}} mãos, embora precise de {{n:m11.3max.sb.eq}} de equity. O {{t:big-blind|big blind}} na mesma situação, quando o {{t:small-blind|small blind}} {{t:fold|foldou}}, completa {{n:m11.3max.bb.cost}} num {{t:pot|pote}} de {{n:m11.3max.bb.pot}}, precisa de {{n:m11.3max.bb.eq}} de equity e {{t:call|paga}} com cerca de {{n:m11.3max.call.bb}}. A diferença vem principalmente do jogador depois de você (os preços diferem pouco): o {{t:small-blind|small blind}} pode {{t:call|pagar}} e encontrar uma mão ainda mais forte do {{t:big-blind|big blind}}.

```range
call.sb-vs-btn-3max
```

Quando dois jogadores já estão all-in, o preço cai para {{n:m11.3max.bb-two.eq}}, mas mesmo assim o {{t:big-blind|big blind}} {{t:call|paga}} só com cerca de {{n:m11.3max.call.bb-two}} mãos. Contra dois {{t:range|ranges}}, um dos quais já {{t:call|pagou}} o all-in, as mãos mais fracas perdem equity rápido.

```range
call.bb-vs-two-3max
```

## Com ante, você {{t:call|paga}} mais aberto

O ante fica no {{t:pot|pote}}, então pelo mesmo valor você ganha mais: com {{n:m11.depth.10}} e {{t:bb-ante|big blind ante}} de {{n:m11.ante}}, você precisa de {{n:m11.call.10-ante.eq}} em vez de {{n:m11.call.10.eq}}. Com ante, o adversário também {{t:shove|dá shove}} mais aberto, então o solver {{t:call|paga}} com cerca de {{n:m11.call.10-ante}} mãos.

```range
call.bb-10-ante
```

:::note {{t:range|Ranges}} nesta lição
As grades tratam do jogo entre dois jogadores: o {{t:small-blind|small blind}} contra o {{t:big-blind|big blind}}, quando todos os outros {{t:fold|foldaram}}, e contam {{t:chips|fichas}}, não dinheiro. Quando, num {{t:tournament|torneio}}, as {{t:payout|premiações}} importam, você {{t:call|paga}} ainda mais apertado (próxima lição).
:::
