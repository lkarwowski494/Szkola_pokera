---
id: m4.l2
module: m4
order: 2
title: "Defender o big blind"
sub: "O preço para pagar e a defesa larga"
rules: [R-M4-004, R-M4-014, R-M4-002, R-M4-006]
drills:
  - kind: numeric
    id: m4.l2.n-price-btn
    family: m4.bb.price
    rules: [R-M4-004]
    prompt: "O Button {{t:open|abriu}} para {{n:pf.open-size}}, o {{t:small-blind}} {{t:fold|desistiu}}. De que percentagem de equity precisa no {{t:big-blind|big blind}} para que {{t:call|pagar}} compense (sem considerar o jogo após o flop)? Introduza um número."
    table: { position: BB }
    answer: eq.bb-vs-btn-open
    explanation: "Acrescenta {{n:bb.call.vs-btn}} a um {{t:pot|pote}} que, depois de {{t:call|pagar}}, tem {{n:bb.pot-after.vs-btn}}: {{n:bb.call.vs-btn}} ÷ {{n:bb.pot-after.vs-btn}} dá cerca de {{n:eq.bb-vs-btn-open}}. Só precisaria de metade se no {{t:pot|pote}} estivesse apenas a {{t:bet}} do adversário; os blinds no {{t:pot|pote}} melhoram o preço."
  - kind: choice
    id: m4.l2.q-price-sb
    family: m4.bb.price
    rules: [R-M4-014]
    prompt: "O {{t:small-blind|small blind}} {{t:open|abriu}} para {{n:pf.open-size-sb}}. De quanta equity precisa no {{t:big-blind|big blind}} para {{t:call|pagar}}?"
    table: { position: BB }
    options:
      - { text: "Cerca de {{n:eq.bb-vs-sb-open}}", correct: true, why: "Acrescenta {{n:bb.call.vs-sb}} a um {{t:pot|pote}} que, depois de {{t:call|pagar}}, tem {{n:bb.pot-after.vs-sb}}: isso dá cerca de {{n:eq.bb-vs-sb-open}}. O preço é pior do que contra o Button, mas, em compensação, após o flop tem {{t:position|posição}}." }
      - { text: "Cerca de {{n:eq.bb-vs-btn-open}}", why: "Esse é o preço contra uma {{t:open|abertura}} do Button para {{n:pf.open-size}}. O {{t:small-blind|small blind}} {{t:open|abre}} com um tamanho maior, por isso paga mais." }
      - { text: "Cerca de metade", why: "Precisaria de metade da equity se no {{t:pot|pote}} estivesse apenas a {{t:bet}} do adversário. Aqui também estão os blinds, por isso o preço é melhor." }
  - kind: choice
    id: m4.l2.q-realize
    family: m4.bb.realize
    rules: [R-M4-004]
    prompt: "Porque é que no {{t:big-blind|big blind}} não {{t:call|paga}} com todas as mãos que têm cerca de {{n:eq.bb-vs-btn-open}} de equity contra o {{t:range|range}} do Button?"
    table: { position: BB }
    options:
      - { text: "Porque {{t:out-of-position}} não realiza toda a equity", correct: true, why: "A equity é a probabilidade de ganhar se a mão for jogada até ao fim sem {{t:bet|apostas}}. {{t:out-of-position|Fora de posição}}, muitas vezes {{t:fold|desiste}} da mão antes do showdown, por isso as mãos fracas de naipes diferentes realizam menos do que a equity indica." }
      - { text: "Porque o Button tem sempre uma mão forte", why: "O Button {{t:open|abre}} muito largo, e é por isso que a defesa do {{t:big-blind|BB}} é larga." }
      - { text: "Porque é preciso poupar {{t:chips}}", why: "O que conta é o {{t:expected-value}}, não poupar {{t:chips|fichas}}." }
  - kind: choice
    id: m4.l2.q-qq
    family: m4.bb.3bet-size
    rules: [R-M4-002]
    prompt: "O Button {{t:open|abriu}} para {{n:pf.open-size}}, o {{t:small-blind}} {{t:fold|desistiu}}. Tem QQ no {{t:big-blind|big blind}}. O que faz?"
    table: { hand: "Qs Qd", position: BB }
    options:
      - { text: "3-bet para {{n:pf.3bet.oop-total}}", correct: true, why: "QQ é uma mão {{t:value|de valor}}. {{t:out-of-position|Fora de posição}}, {{t:raise|aumenta}} para cerca de {{n:pf.3bet.size-oop}} a {{t:open|abertura}}, para que o Button não {{t:call|pague}} barato {{t:in-position}}." }
      - { text: "3-bet para {{n:pf.3bet.ip-total}}", sizeError: true, why: "Boa ação, mas esse é o tamanho para um jogador {{t:in-position}} ({{n:pf.3bet.size-ip}} a {{t:open|abertura}}). {{t:out-of-position|Fora de posição}}, {{t:raise|aumenta}} mais: para {{n:pf.3bet.oop-total}}." }
      - { text: "{{t:call|Pago}}", why: "Perde valor: com QQ quer construir o {{t:pot|pote}} antes do flop, e não jogar um {{t:pot|pote}} pequeno {{t:out-of-position}}." }
      - { text: "{{t:fold|Desisto}}", why: "QQ é uma das melhores mãos preflop. {{t:fold|Desistir}} é um erro grave." }
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
    prompt: "O Button {{t:open|abriu}} para {{n:pf.open-size}}, o {{t:small-blind}} {{t:fold|desistiu}}. Pinte as mãos com que defende o {{t:big-blind}} (a {{t:call|pagar}} ou com 3-bet)."
---
O {{t:big-blind|big blind}} já tem no {{t:pot|pote}} um blind inteiro, por isso, perante uma {{t:open|abertura}}, acrescenta pouco. Quando o Button {{t:open|abre}} para {{n:pf.open-size}} e o {{t:small-blind}} {{t:fold|desiste}}, para {{t:call|pagar}} precisa apenas de cerca de {{n:eq.bb-vs-btn-open}} de equity. Por isso, o {{t:big-blind}} é, de todas as {{t:position|posições}}, a que defende de forma mais larga.

## O preço não é tudo

A equity indica com que frequência ganha se ambos chegarem ao showdown sem mais {{t:bet|apostas}}. {{t:out-of-position|Fora de posição}}, muitas vezes {{t:fold|desiste}} após o flop, por isso as mãos fracas de naipes diferentes realizam menos do que a sua equity. As mãos do mesmo naipe, os {{t:connectors|conectores}} e os {{t:pair|pares}} médios realizam mais, e é por isso que, na grelha, defende com elas de melhor vontade.

```range
vs-open.bb-vs-btn
```

As soluções de solvers publicadas defendem aqui cerca de {{n:pf.bb-def.vs-btn.pub.low}}–{{n:pf.bb-def.vs-btn.pub.high}} das mãos ({{t:call}} e 3-bet em conjunto). O solver da aplicação, de onde vem a grelha, defende aqui de forma mais larga do que as soluções publicadas.

## Contra o {{t:small-blind|small blind}}

O {{t:small-blind|small blind}} {{t:open|abre}} com um tamanho maior, para {{n:pf.open-size-sb}}, por isso, para {{t:call|pagar}}, precisa de cerca de {{n:eq.bb-vs-sb-open}} de equity. O preço é pior, mas após o flop tem {{t:position|posição}}, por isso continua a defender de forma larga: mais de metade das mãos.

```range
vs-open.bb-vs-sb
```

A solução de solver publicada defende aqui cerca de {{n:pf.bb-def.vs-sb.pub}} das mãos. O solver da aplicação, de onde vem a grelha, defende aqui de forma mais apertada do que a solução publicada.

:::note Como {{t:raise|aumentar}} a partir do {{t:big-blind|big blind}}
As grelhas mostram com que mãos defender, e não como: o 3-bet e o {{t:call}} estão agrupados, porque a composição dos 3-bets do {{t:big-blind|big blind}} no solver da aplicação difere dos resultados publicados de outros solvers. Contra o Button, o 3-bet a partir do {{t:big-blind|big blind}} é de cerca de {{n:pf.3bet.size-oop}} a {{t:open|abertura}}. Faz 3-bet com as mãos mais fortes (TT+, AQ+, AJs+) e ainda com {{t:bluff|bluffs}} da parte de baixo do {{t:range|range}} com que {{t:call|paga}}: A5s, por vezes A4s, e {{t:connectors|conectores}} do mesmo naipe. Com os {{t:pair|pares}} médios e pequenos, KQo e os ases de naipes diferentes, normalmente {{t:call|paga}}. Contra o {{t:small-blind|small blind}} tem {{t:position|posição}}, por isso {{t:raise|aumenta}} menos, cerca de {{n:pf.3bet.size-ip}} a {{t:open|abertura}}. Nesse caso, faz 3-bet sobretudo {{t:value|por valor}} (TT+, AJs+, parte dos AQo e KQ), e com A5s e {{t:connectors|conectores}} do mesmo naipe normalmente {{t:call|paga}}.
:::
