---
id: m4.l2
module: m4
order: 2
title: "Defesa do big blind"
sub: "Preço para pagar e defesa ampla"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "O Button {{t:open|abriu}} para {{n:pf.open-size}}, o {{t:small-blind}} {{t:fold|desistiu}}. De quantos por cento de equity você precisa no {{t:big-blind|big blind}} para que valha a pena {{t:call|pagar}} (sem considerar o jogo depois do flop)? Digite um número."
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "Você completa {{n:bb.call.vs-btn}} em um {{t:pot|pote}} que, depois de você {{t:call|pagar}}, tem {{n:bb.pot-after.vs-btn}}: {{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}} dá cerca de {{n:eq.bb-vs-btn-open}}. Você só precisaria de metade se no {{t:pot|pote}} houvesse apenas a {{t:bet|aposta}} do adversário; os blinds no {{t:pot|pote}} melhoram o preço."
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "O {{t:small-blind|small blind}} {{t:open|abriu}} para {{n:pf.open-size-sb}}. De quanta equity você precisa no {{t:big-blind|big blind}} para {{t:call|pagar}}?"
    table: { position: BB }
    options:
      - { text: "Cerca de {{n:eq.bb-vs-sb-open}}", correct: true, why: "Você completa {{n:bb.call.vs-sb}} em um {{t:pot|pote}} que, depois de você {{t:call|pagar}}, tem {{n:bb.pot-after.vs-sb}}: isso dá cerca de {{n:eq.bb-vs-sb-open}}. O preço é pior do que contra o Button, mas, em compensação, depois do flop você tem {{t:position|posição}}." }
      - { text: "Cerca de {{n:eq.bb-vs-btn-open}}", why: "Esse é o preço contra uma {{t:open|abertura}} do Button para {{n:pf.open-size}}. O {{t:small-blind|small blind}} {{t:open|abre}} com um tamanho maior, então você paga mais." }
      - { text: "Cerca de metade", why: "Você precisaria de metade da equity se no {{t:pot|pote}} houvesse só a {{t:bet|aposta}} do adversário. Aqui o pote também tem os blinds, então o preço é melhor." }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "Por que, no {{t:big-blind|big blind}}, você não {{t:call|paga}} com toda mão que tem cerca de {{n:eq.bb-vs-btn-open}} de equity contra o {{t:range|range}} do Button?"
    table: { position: BB }
    options:
      - { text: "Porque {{t:out-of-position|fora de posição}} você não vai realizar toda a sua equity", correct: true, why: "Equity é a chance de vencer se a mão for jogada até o fim sem {{t:bet|apostas}}. {{t:out-of-position|Fora de posição}}, você muitas vezes vai {{t:fold|desistir}} da mão antes do showdown, então mãos fracas de naipes diferentes realizam menos do que a equity indica." }
      - { text: "Porque o Button sempre tem uma mão forte", why: "O Button {{t:open|abre}} de forma muito ampla, por isso a defesa do {{t:big-blind|BB}} é ampla." }
      - { text: "Porque é preciso economizar {{t:chips|fichas}}", why: "O que conta é o {{t:expected-value|valor esperado}}, não economizar {{t:chips|fichas}}." }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "O Button {{t:open|abriu}} para {{n:pf.open-size}}, o {{t:small-blind}} {{t:fold|desistiu}}. Você tem QQ no {{t:big-blind|big blind}}. O que você faz?"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "3-bet para {{n:pf.3bet.oop-total}}", correct: true, why: "QQ é uma mão {{t:value|de valor}}. {{t:out-of-position|Fora de posição}}, você {{t:raise|aumenta}} para cerca de {{n:pf.3bet.size-oop}} o valor da {{t:open|abertura}}, para que o Button não {{t:call|pague}} barato {{t:in-position|em posição}}." }
      - { text: "3-bet para {{n:pf.3bet.ip-total}}", sizeError: true, why: "Ação certa, mas esse é o tamanho para quem joga {{t:in-position|em posição}} ({{n:pf.3bet.size-ip}} o valor da {{t:open|abertura}}). {{t:out-of-position|Fora de posição}}, você {{t:raise|aumenta}} mais: para {{n:pf.3bet.oop-total}}." }
      - { text: "{{t:call|Pago}}", why: "Você perde valor: com QQ você quer construir o {{t:pot|pote}} antes do flop, e não jogar um {{t:pot|pote}} pequeno {{t:out-of-position|fora de posição}}." }
      - { text: "{{t:fold|Desisto}}", why: "QQ é uma das melhores mãos no preflop. {{t:fold|Desistir}} é um grande erro." }
  - kind: generated
    id: m4.l2.g-btn
    family: m4.vsopen.bb-vs-btn
    rules: [R-M4-004]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-btn" }
    count: 5
  - kind: generated
    id: m4.l2.g-sb
    family: m4.vsopen.bb-vs-sb
    rules: [R-M4-014]
    generator: rangeDecision
    params: { spots: "vs-open.bb-vs-sb" }
    count: 4
  - kind: paint
    id: m4.l2.p-btn
    family: m4.paint.bb-vs-btn
    rules: [R-M4-004]
    spot: vs-open.bb-vs-btn
    prompt: "O Button {{t:open|abriu}} para {{n:pf.open-size}}, o {{t:small-blind}} {{t:fold|desistiu}}. Pinte as mãos com que você defende o {{t:big-blind}} ({{t:call|pagando}} ou dando 3-bet)."
---
O {{t:big-blind|big blind}} já tem um blind inteiro no {{t:pot|pote}}, então completa pouco diante de uma {{t:open|abertura}}. Quando o Button {{t:open|abre}} para {{n:pf.open-size}} e o {{t:small-blind}} {{t:fold|desiste}}, você precisa de apenas cerca de {{n:eq.bb-vs-btn-open}} de equity para {{t:call|pagar}}. Por isso o {{t:big-blind}} é quem defende de forma mais ampla entre todas as {{t:position|posições}}.

## O preço não é tudo

A equity diz com que frequência você vence se os dois chegarem ao showdown sem mais {{t:bet|apostas}}. {{t:out-of-position|Fora de posição}}, você muitas vezes vai {{t:fold|desistir}} depois do flop, então mãos fracas de naipes diferentes realizam menos do que a equity delas. Mãos do mesmo naipe, {{t:connectors|conectores}} e {{t:pair|pares}} médios realizam mais, por isso, na grade, você defende com eles mais prontamente.

```range
vs-open.bb-vs-btn
```

As soluções de solver publicadas defendem aqui cerca de {{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}} das mãos (somando {{t:call|pagar}} e 3-bet). O solver do app, de onde vem a grade, defende aqui de forma mais ampla do que as soluções publicadas.

## Contra o {{t:small-blind|small blind}}

O {{t:small-blind|small blind}} {{t:open|abre}} com um tamanho maior, para {{n:pf.open-size-sb}}, então você precisa de cerca de {{n:eq.bb-vs-sb-open}} de equity para {{t:call|pagar}}. O preço é pior, mas depois do flop você tem {{t:position|posição}}, então ainda defende de forma ampla: mais da metade das mãos.

```range
vs-open.bb-vs-sb
```

A solução de solver publicada defende aqui cerca de {{n:pf.bb-def.vs-sb.pub}} das mãos. O solver do app, de onde vem a grade, defende aqui de forma mais restrita do que a solução publicada.

:::note Como {{t:raise|aumentar}} do {{t:big-blind|big blind}}
As grades mostram com o que defender, e não como: 3-bet e {{t:call|pagar}} aparecem juntos, porque a composição dos 3-bets do {{t:big-blind|big blind}} no solver do app difere dos resultados publicados de outros solvers. Contra o Button, o 3-bet do {{t:big-blind|big blind}} é de cerca de {{n:pf.3bet.size-oop}} o valor da {{t:open|abertura}}. Você dá 3-bet com as mãos mais fortes (TT+, AQ+, AJs+) mais {{t:bluff|blefes}} da parte de baixo do seu {{t:range|range}} de {{t:call|pagamento}}: A5s, às vezes A4s, e {{t:connectors|conectores}} do mesmo naipe. Com {{t:pair|pares}} médios e pequenos, KQo e ases de naipes diferentes, você normalmente {{t:call|paga}}. Contra o {{t:small-blind|small blind}} você tem {{t:position|posição}}, então {{t:raise|aumenta}} menos, cerca de {{n:pf.3bet.size-ip}} o valor da {{t:open|abertura}}. Nesse caso, você dá 3-bet principalmente {{t:value|por valor}} (TT+, AJs+, parte de AQo e KQ), e com A5s e {{t:connectors|conectores}} do mesmo naipe normalmente {{t:call|paga}}.
:::
