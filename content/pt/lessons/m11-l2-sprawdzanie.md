---
id: m11.l2
module: m11
order: 2
title: "Pagar um all-in"
sub: "Quanta equity precisa e porque paga de forma mais restrita"
rules: [R-M11-006, R-M11-007, R-M11-012]
drills:
  - kind: numeric
    id: m11.l2.n-price-10
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Tem {{n:m11.depth.10}} no {{t:big-blind|big blind}}, sem ante. O {{t:small-blind|small blind}} foi all-in com {{n:m11.depth.10}}. Que percentagem de equity precisa para que {{t:call|pagar}} compense? Introduza um número."
    table: { position: BB }
    answer: m11.call.10.eq
    explanation: "O seu blind já está no {{t:pot|pote}}, por isso acrescenta {{n:m11.call.10.cost}}. Após o {{t:call|pagamento}}, o {{t:pot|pote}} tem {{n:m11.call.10.pot}}: {{n:m11.call.10.cost}} ÷ {{n:m11.call.10.pot}} = {{n:m11.call.10.eq}}."
  - kind: choice
    id: m11.l2.q-price-5
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "O mesmo spot, mas os stacks são de {{n:m11.depth.5}} cada. Quanta equity precisa para {{t:call|pagar}} o all-in?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.5.eq}}", correct: true, why: "Acrescenta {{n:m11.call.5.cost}} a um {{t:pot|pote}} que, após o {{t:call|pagamento}}, tem {{n:m11.call.5.pot}}: {{n:m11.call.5.eq}}. Com um stack mais curto, o blind representa uma parte maior do stack, por isso o preço é melhor." }
      - { text: "{{n:m11.call.10.eq}}", why: "É o preço com {{n:m11.depth.10}}. Com {{n:m11.depth.5}}, o seu blind é uma parte maior de todo o stack, por isso precisa de menos: {{n:m11.call.5.eq}}." }
      - { text: "Metade", why: "Precisaria de metade se estivesse a pôr o stack inteiro. O blind já está no {{t:pot|pote}}, por isso acrescenta apenas {{n:m11.call.5.cost}}." }
  - kind: choice
    id: m11.l2.q-price-15
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "Stacks de {{n:m11.depth.15}} cada, o {{t:small-blind|small blind}} foi all-in. Quanta equity precisa para {{t:call|pagar}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.15.eq}}", correct: true, why: "Acrescenta {{n:m11.call.15.cost}} a um {{t:pot|pote}} de {{n:m11.call.15.pot}}: {{n:m11.call.15.eq}}. Quanto mais profundo o stack, mais perto de metade." }
      - { text: "{{n:m11.call.5.eq}}", why: "É o preço com {{n:m11.depth.5}}. Com {{n:m11.depth.15}}, o blind é uma parte menor do stack, por isso o preço sobe para {{n:m11.call.15.eq}}." }
      - { text: "Mais de metade", why: "Mesmo com um stack muito profundo, o preço não ultrapassa metade: tem sempre o seu blind no {{t:pot|pote}}." }
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
    prompt: "Tem {{n:m11.depth.10}} no {{t:big-blind|big blind}} e o {{t:small-blind|small blind}} foi all-in. Pinte as mãos com que {{t:call|paga}}."
  - kind: choice
    id: m11.l2.q-76s
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Com {{n:m11.depth.10}}, o solver vai all-in a partir do {{t:small-blind|small blind}} com sete e seis do mesmo naipe (76s). Tem esta mão no {{t:big-blind|big blind}} e é o {{t:small-blind|small blind}} que foi all-in. O que faz?"
    table: { hand: "7s 6s", position: BB }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Ir all-in com 76s compensa sobretudo graças às {{t:fold|desistências}} do adversário. Ao {{t:call|pagar}}, só ganha no showdown, e contra um {{t:range|range}} de all-in com muitas cartas altas e {{t:pair|pares}}. O solver {{t:fold|desiste}} desta mão." }
      - { text: "{{t:call|Pago}}, porque iria all-in com ela a partir do {{t:small-blind|small blind}}", why: "O {{t:call|pagamento}} é outra situação: não tem fold equity e o {{t:range|range}} do adversário é mais forte do que um aleatório. Para {{t:call|pagar}}, precisa de uma mão mais forte." }
      - { text: "{{t:call|Pago}}, porque uma mão do mesmo naipe desenvolve-se bem", why: "Depois de um all-in, não há mais jogo em que a mão se possa desenvolver. Conta apenas a equity até ao showdown." }
  - kind: choice
    id: m11.l2.q-22
    family: m11.call.depth
    rules: [R-M11-007]
    prompt: "{{t:big-blind|Big blind}}, o {{t:small-blind|small blind}} foi all-in. Tem um {{t:pair|par}} de dois. Com {{n:m11.depth.10}}, o solver {{t:call|paga}}. E com {{n:m11.depth.15}}?"
    table: { hand: "2d 2c", position: BB }
    options:
      - { text: "{{t:fold|Desiste}}", correct: true, why: "Com {{n:m11.depth.15}}, o preço sobe para {{n:m11.call.15.eq}} e o {{t:range|range}} de all-in é mais estreito (cerca de {{n:m11.push.15}} mãos), por isso um {{t:pair|par}} de dois encontra mais vezes um {{t:pair|par}} superior. O {{t:range|range}} de {{t:call|pagamento}} desce de cerca de {{n:m11.call.10}} para cerca de {{n:m11.call.15}} mãos." }
      - { text: "{{t:call|Paga}}, porque um {{t:pair|par}} é sempre favorito", why: "Um {{t:pair|par}} de dois contra duas cartas mais altas é mais ou menos uma moeda ao ar, e contra qualquer {{t:pair|par}} superior é claramente o azarão. Com um stack mais profundo, o adversário {{t:shove|faz shove}} com menos mãos fracas, por isso os {{t:pair|pares}} representam uma parte maior do seu {{t:range|range}}." }
      - { text: "{{t:call|Paga}}, porque quanto mais profundo o stack, mais amplo", why: "Ao contrário: quanto mais profundo o stack, mais custa {{t:call|pagar}} e mais estreito é o {{t:range|range}} de {{t:call|pagamento}}." }
  - kind: choice
    id: m11.l2.q-why-tighter
    family: m11.call.gap
    rules: [R-M11-007]
    prompt: "Com {{n:m11.depth.10}}, o {{t:small-blind|small blind}} vai all-in com cerca de {{n:m11.push.10}} mãos, mas o {{t:big-blind|big blind}} {{t:call|paga}} apenas com cerca de {{n:m11.call.10}}. Porquê?"
    options:
      - { text: "Quem paga não tem fold equity e joga contra um {{t:range|range}} mais forte do que um aleatório", correct: true, why: "Um all-in ganha também quando o adversário {{t:fold|desiste}}. O {{t:call|pagamento}} só ganha no showdown, e contra mãos que já passaram por uma seleção. Daí a velha regra: para {{t:call|pagar}}, precisa de uma mão melhor do que para ir all-in em primeiro lugar." }
      - { text: "O {{t:big-blind|big blind}} paga mais", why: "Ambos arriscam o mesmo stack, e o {{t:big-blind|BB}} já tem o seu blind no {{t:pot|pote}}, por isso acrescenta até menos." }
      - { text: "O solver está errado", why: "É o equilíbrio de um jogo de all-in ou {{t:fold|desistir}}: nenhum jogador ganha alterando apenas o seu {{t:range|range}}. A diferença resulta da fold equity." }
  - kind: choice
    id: m11.l2.q-ante
    family: m11.call.price
    rules: [R-M11-006]
    prompt: "O jogo decorre com {{t:bb-ante|big blind ante}}. Tem {{n:m11.depth.10}} no {{t:big-blind|big blind}} e colocou um ante de {{n:m11.ante}}. O {{t:small-blind|small blind}} foi all-in. Quanta equity precisa para {{t:call|pagar}}?"
    table: { position: BB }
    options:
      - { text: "{{n:m11.call.10-ante.eq}}", correct: true, why: "Acrescenta o mesmo ({{n:m11.call.10.cost}}), mas o {{t:pot|pote}} contém ainda o ante: após o {{t:call|pagamento}}, {{n:m11.call.10-ante.pot}}. {{n:m11.call.10.cost}} ÷ {{n:m11.call.10-ante.pot}} = {{n:m11.call.10-ante.eq}}. Por isso, com ante, {{t:call|paga}} de forma mais ampla: cerca de {{n:m11.call.10-ante}} mãos em vez de {{n:m11.call.10}}." }
      - { text: "{{n:m11.call.10.eq}}", why: "É o preço sem ante. O ante fica no {{t:pot|pote}}, por isso, pelo mesmo valor, ganha mais: {{n:m11.call.10-ante.eq}}." }
      - { text: "Mais do que sem ante, porque colocou mais", why: "O ante é dinheiro já gasto. Conta apenas quanto ainda acrescenta e quanto pode ganhar." }
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
    prompt: "Três jogadores, stacks de {{n:m11.depth.3max}} cada. O Button foi all-in e o {{t:small-blind|small blind}} {{t:call|pagou}}. No {{t:big-blind|big blind}}, precisa apenas de {{n:m11.3max.bb-two.eq}} de equity. {{t:call|Paga}} de forma mais ampla do que quando só o Button foi all-in?"
    table: { position: BB }
    options:
      - { text: "Não, de forma mais restrita", correct: true, why: "O preço é melhor, mas joga contra dois {{t:range|ranges}}, incluindo contra quem pagou, que tem uma mão forte. O solver {{t:call|paga}} aqui com cerca de {{n:m11.3max.call.bb-two}} mãos e, quando só o Button está all-in, com cerca de {{n:m11.3max.call.bb}}." }
      - { text: "Sim, porque o preço é muito melhor", why: "Um preço melhor não chega: contra dois adversários, a equity das mãos mais fracas cai rapidamente. O solver {{t:call|paga}} apenas com cerca de {{n:m11.3max.call.bb-two}} mãos." }
      - { text: "Da mesma forma, porque só conta a sua mão", why: "Conta a equity contra as mãos dos adversários. Quem paga depois do all-in do Button tem um {{t:range|range}} mais forte do que o Button, por isso {{t:call|paga}} de forma mais restrita." }
---
Quando um adversário vai all-in e está no {{t:big-blind|big blind}}, a decisão é simples na forma: {{t:call|paga}} ou {{t:fold|desiste}}. Depois do {{t:call|pagamento}} já não há mais jogo, por isso contam apenas o preço e a sua equity contra o {{t:range|range}} de all-in.

## O preço do {{t:call|pagamento}}

O seu blind já está no {{t:pot|pote}}. Com um stack de {{n:m11.depth.10}}, acrescenta {{n:m11.call.10.cost}}, e o {{t:pot|pote}} após o {{t:call|pagamento}} tem {{n:m11.call.10.pot}}.

```formula
equity necessária = valor a acrescentar ÷ pote após o pagamento
```

| Stack | Valor a acrescentar | {{t:pot|Pote}} após o {{t:call|pagamento}} | Equity necessária |
|---|---|---|---|
| {{n:m11.depth.5}} | {{n:m11.call.5.cost}} | {{n:m11.call.5.pot}} | {{n:m11.call.5.eq}} |
| {{n:m11.depth.10}} | {{n:m11.call.10.cost}} | {{n:m11.call.10.pot}} | {{n:m11.call.10.eq}} |
| {{n:m11.depth.15}} | {{n:m11.call.15.cost}} | {{n:m11.call.15.pot}} | {{n:m11.call.15.eq}} |

Quanto mais curto o stack, melhor o preço, porque o seu blind é uma parte maior de todo o stack.

## {{t:call|Paga}} de forma mais restrita do que {{t:shove|faz shove}}

Ao ir all-in em primeiro lugar, ganha também quando o adversário {{t:fold|desiste}}. Ao {{t:call|pagar}}, só ganha no showdown, e contra mãos que o adversário escolheu para ir all-in. Por isso, para {{t:call|pagar}}, precisa de uma mão melhor do que para ir all-in em primeiro lugar (na literatura, chama-se a isto «gap concept»).

```range
call.bb-10
```

Com {{n:m11.depth.10}}, o {{t:small-blind|small blind}} vai all-in com cerca de {{n:m11.push.10}} mãos, enquanto o {{t:big-blind|big blind}} {{t:call|paga}} com cerca de {{n:m11.call.10}}. Com mãos como [[7s 6s]], {{t:shove|faz shove}} a partir do {{t:small-blind|small blind}}, mas {{t:fold|desiste}} perante um all-in: sem fold equity, têm equity a menos contra cartas altas e {{t:pair|pares}}. Para comparação, uma tabela de um site de formação indica, com {{n:m11.depth.10}}, um {{t:range|range}} de {{t:call|pagamento}} de {{n:m11.ext.call.10}}.

```range
call.bb-15
```

```range
call.bb-5
```

Um stack mais profundo significa um {{t:call|pagamento}} mais caro e um {{t:range|range}} de all-in do adversário mais estreito, por isso {{t:call|paga}} com menos frequência: cerca de {{n:m11.call.15}} com {{n:m11.depth.15}} e, com {{n:m11.depth.5}}, até cerca de {{n:m11.call.5}}.

## Quando ainda há alguém atrás de si

Com três jogadores e stacks de {{n:m11.depth.3max}} cada, o {{t:small-blind|small blind}} {{t:call|paga}} o all-in do Button apenas com cerca de {{n:m11.3max.call.sb}} mãos, embora precise de {{n:m11.3max.sb.eq}} de equity. O {{t:big-blind|big blind}}, na mesma situação, quando o {{t:small-blind|small blind}} {{t:fold|desistiu}}, acrescenta {{n:m11.3max.bb.cost}} a um {{t:pot|pote}} de {{n:m11.3max.bb.pot}}, precisa de {{n:m11.3max.bb.eq}} de equity e {{t:call|paga}} com cerca de {{n:m11.3max.call.bb}}. A diferença deve-se sobretudo ao jogador atrás de si (os preços diferem pouco): o {{t:small-blind|small blind}} pode {{t:call|pagar}} e encontrar uma mão ainda mais forte do {{t:big-blind|big blind}}.

```range
call.sb-vs-btn-3max
```

Quando já há dois jogadores all-in, o preço desce para {{n:m11.3max.bb-two.eq}} e, mesmo assim, o {{t:big-blind|big blind}} {{t:call|paga}} apenas com cerca de {{n:m11.3max.call.bb-two}} mãos. Contra dois {{t:range|ranges}}, um dos quais já {{t:call|pagou}} o all-in, as mãos mais fracas perdem equity rapidamente.

```range
call.bb-vs-two-3max
```

## Com ante, {{t:call|paga}} de forma mais ampla

O ante fica no {{t:pot|pote}}, por isso, pelo mesmo valor, ganha mais: com {{n:m11.depth.10}} e {{t:bb-ante|big blind ante}} de {{n:m11.ante}}, precisa de {{n:m11.call.10-ante.eq}} em vez de {{n:m11.call.10.eq}}. Com ante, o adversário também {{t:shove|faz shove}} de forma mais ampla, por isso o solver {{t:call|paga}} com cerca de {{n:m11.call.10-ante}} mãos.

```range
call.bb-10-ante
```

:::note {{t:range|Ranges}} nesta lição
As grelhas referem-se ao jogo entre dois jogadores: o {{t:small-blind|small blind}} contra o {{t:big-blind|big blind}}, quando todos os outros {{t:fold|desistiram}}, e contam {{t:chips|fichas}}, não dinheiro. Quando, num {{t:tournament|torneio}}, contam os {{t:payout|prémios}}, {{t:call|paga}} de forma ainda mais restrita (próxima lição).
:::
