---
id: m4.l1
module: m4
order: 1
title: "Quando alguém abre antes de você"
sub: "Desistir, pagar ou 3-bet"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "O {{t:cutoff|CO}} {{t:open|abriu}} para {{n:pf.open-size}}. Você quer {{t:raise|aumentar}} do Button. Para quanto?"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "Para {{n:pf.3bet.ip-total}}", correct: true, why: "{{t:in-position|Em posição}}, você {{t:raise|aumenta}} para cerca de {{n:pf.3bet.size-ip}} a {{t:open|abertura}}. É o padrão, e deixa uma boa relação entre stack e {{t:pot|pote}} no flop." }
      - { text: "Para {{n:pf.3bet.too-small}}", why: "Pequeno demais: o adversário recebe um ótimo preço para {{t:call|pagar}} com quase tudo e continuar jogando." }
      - { text: "Para {{n:pf.3bet.too-big}}", why: "Grande demais para quem joga {{t:in-position|em posição}}: você arrisca mais, e o adversário não vai {{t:fold|desistir}} com as mãos melhores de qualquer forma." }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "O Button {{t:open|abriu}} para {{n:pf.open-size}}, e o {{t:small-blind}} {{t:fold|desistiu}}. Você quer {{t:raise|aumentar}} do {{t:big-blind}}. Para quanto?"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "Para {{n:pf.3bet.oop-total}}", correct: true, why: "{{t:out-of-position|Fora de posição}}, você {{t:raise|aumenta}} para cerca de {{n:pf.3bet.size-oop}} a {{t:open|abertura}}. O tamanho maior tira do Button a opção de {{t:call|pagar}} barato {{t:in-position|em posição}}." }
      - { text: "Para {{n:pf.3bet.ip-total}}", why: "Esse é o tamanho para quem joga {{t:in-position|em posição}}. {{t:out-of-position|Fora de posição}}, você dá ao adversário um preço bom demais." }
      - { text: "Só {{t:call|pago}}", why: "Com KK você quer construir o {{t:pot|pote}} logo: é a segunda melhor mão no preflop." }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "O Button {{t:open|abriu}} para {{n:pf.open-size}}. Você está no {{t:small-blind}}. Qual plano é o padrão?"
    table: { position: SB }
    options:
      - { text: "{{t:raise|Aumento}} ou {{t:fold|desisto}}", correct: true, why: "Depois de {{t:call|pagar}}, você joga {{t:out-of-position|fora de posição}}, e o {{t:big-blind}} ainda está atrás de você. Do {{t:small-blind}} contra {{t:open|aberturas}} de posições finais, os solvers quase sempre {{t:raise|aumentam}} ou {{t:fold|desistem}}." }
      - { text: "{{t:call|Pago}} de forma ampla, porque já tenho meio blind no {{t:pot|pote}}", why: "Meio blind é pouco. {{t:call|Pagar}} {{t:out-of-position|fora de posição}} com o {{t:big-blind}} atrás de você dá uma {{t:equity-realization|realização de equity}} ruim: você ganha uma parte menor do {{t:pot|pote}} do que indica a equity da mão, porque muitas vezes {{t:fold|desiste}} antes do showdown." }
      - { text: "Sempre {{t:fold|desisto}}", why: "Apertado demais: o Button {{t:open|abre}} de forma muito ampla, então vale a pena {{t:raise|aumentar}} com mãos fortes e parte dos {{t:bluff|blefes}}." }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "Você está no {{t:big-blind}} contra uma {{t:open|abertura}} do Button. Qual destas mãos é um 3-bet típico como {{t:bluff|blefe}}?"
    table: { position: BB }
    options:
      - { text: "A5 do mesmo naipe", correct: true, why: "Bloqueia AA e AK do adversário e, se ele {{t:call|pagar}}, tem chance de fazer {{t:flush}} e {{t:straight|sequência}}. É um {{t:bluff|blefe}} típico da parte de baixo do seu {{t:range}} de {{t:call|pagamento}}: do {{t:big-blind}}, você dá 3-bet com as mãos mais fortes mais {{t:bluff|blefes}} como este." }
      - { text: "K7 de naipes diferentes", why: "Com essa mão você se defende {{t:call|pagando}}. Como 3-bet, não bloqueia nada importante e joga mal quando o adversário {{t:call|paga}}." }
      - { text: "{{t:pair|Par}} 22", why: "Os {{t:pair|pares}} mais baixos se defendem {{t:call|pagando}}: lucram quando acertam um set ({{t:three-of-a-kind|trinca}} com um {{t:pocket-pair|par de mão}}, ou seja, um {{t:pair|par}} formado pelas duas {{t:hole-cards|cartas fechadas}}), e um 3-bet com eles lida mal com um 4-bet." }
  - kind: generated
    id: m4.l1.g-btn
    family: m4.vsopen.btn-vs-co
    rules: [R-M4-005]
    generator: rangeDecision
    params: { spots: "vs-open.btn-vs-co" }
    count: 5
  - kind: generated
    id: m4.l1.g-sb
    family: m4.vsopen.sb-vs-btn
    rules: [R-M4-003]
    generator: rangeDecision
    params: { spots: "vs-open.sb-vs-btn" }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar preflop
  - kind: generated
    id: m4.l1.g-vocab-preflop
    family: vocab.preflop
    generator: vocab
    params: { area: preflop, dir: both }
    count: 4
---
Quando alguém antes de você já {{t:open|abriu}}, você tem três opções: {{t:fold|desistir}}, {{t:call|pagar}} ou {{t:raise|aumentar}} mais uma vez. Esse novo {{t:raise|aumento}} se chama 3-bet, porque é a terceira {{t:bet|aposta}} da mão (blind, {{t:open|abertura}}, {{t:raise|aumento}}).

## Tamanho do 3-bet

{{t:in-position|Em posição}}, você {{t:raise|aumenta}} para cerca de {{n:pf.3bet.size-ip}} a {{t:open|abertura}}, ou seja, contra uma {{t:open|abertura}} de {{n:pf.open-size}}, para {{n:pf.3bet.ip-total}}. {{t:out-of-position|Fora de posição}}, por exemplo dos blinds contra uma {{t:open|abertura}} do {{t:cutoff|CO}} ou do Button, para cerca de {{n:pf.3bet.size-oop}} a {{t:open|abertura}}, ou seja, {{n:pf.3bet.oop-total}}. O tamanho maior {{t:out-of-position|fora de posição}} tira do adversário a chance de {{t:call|pagar}} barato e depois jogar com a vantagem da {{t:position|posição}}.

## A {{t:position|posição}} decide se vale {{t:call|pagar}}

Segundo soluções de solvers publicadas, o Button contra uma {{t:open|abertura}} do {{t:cutoff|CO}} costuma dar 3-bet com cerca de {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}} das mãos e {{t:call|paga}} só com cerca de {{n:pf.call-freq.btn-vs-co.low}}–{{n:pf.call-freq.btn-vs-co.high}}. Contra uma {{t:open|abertura}} do {{t:utg|UTG}} (nesta solução, mínima, para {{n:pf.open-size.solver-utg}}), já há um pouco mais de {{t:call|pagamentos}} do que de 3-bets: cerca de {{n:pf.call-freq.btn-vs-utg}} contra {{n:pf.3bet-freq.btn-vs-utg}}. O {{t:range}} do {{t:utg|UTG}} é forte, então o 3-bet recebe 4-bet com mais frequência e ganha o {{t:pot|pote}} de imediato com menos frequência.

```range
vs-open.btn-vs-co
```

A grade mostra só quais mãos o Button joga (com 3-bet ou {{t:call|pagando}}) e com quais ele {{t:fold|desiste}}. Aprenda a divisão entre 3-bet e {{t:call|pagamento}} pelos números acima: o solver do app quase nunca {{t:call|paga}} neste spot, então não reproduz essa divisão. Em pouco mais de uma dezena de mãos, por exemplo A8s, 98s e 44, o solver do app joga de forma diferente das soluções publicadas, então os exercícios não as avaliam.

Do {{t:small-blind}}, você quase sempre {{t:raise|aumenta}} ou {{t:fold|desiste}}. {{t:call|Pagar}} significa jogar {{t:out-of-position|fora de posição}}, e o {{t:big-blind}} atrás de você ainda pode {{t:raise|aumentar}}. {{t:out-of-position|Fora de posição}}, a mão tem uma **{{t:equity-realization|realização de equity}}** pior: ganha uma parte menor do {{t:pot|pote}} do que indica a equity dela, porque você {{t:fold|desiste}} com mais frequência antes do showdown e tem mais dificuldade para ganhar o {{t:pot|pote}} com uma {{t:bet|aposta}}.

```range
vs-open.sb-vs-btn
```

Segundo a solução de solver publicada, o {{t:small-blind}} contra o Button quase não {{t:call|paga}}: dá 3-bet com cerca de {{n:pf.3bet-freq.sb-vs-btn}} das mãos, o topo do {{t:range}} (entre elas 77+, AJo+, KQo, A5s, A4s, T9s), e {{t:fold|desiste}} com o resto. O solver do app dá 3-bet aqui com {{n:solver.3bet.sb-vs-btn}} das mãos, incluindo os {{t:pair|pares}} 55 e 66, com os quais a solução publicada também costuma dar 3-bet; os poucos {{t:call|pagamentos}} dele a grade conta como {{t:fold|desistência}}. Em algumas mãos, por exemplo ATo, T9s e A4s, o solver do app joga de forma diferente das soluções publicadas, então os exercícios não as avaliam.

## {{t:range|Range}} {{t:linear}} ou {{t:polarized|polarizado}}

Com {{t:position|posição}} contra uma {{t:open|abertura}} do {{t:cutoff|CO}}, você dá 3-bet principalmente com as melhores mãos, de cima para baixo, e acrescenta alguns {{t:bluff|blefes}} com ases do mesmo naipe (A5s, A4s), enquanto joga as mãos médias (por exemplo 77–99, AJs, ATs, {{t:connectors|conectores}} do mesmo naipe) de forma mista: com parte delas dá 3-bet, com parte {{t:call|paga}}. O adversário costuma {{t:call|pagar}}, então você quer uma mão que jogue bem no {{t:pot|pote}} depois do {{t:call|pagamento}}. As fontes chamam esse {{t:range}} de formas diferentes: umas de {{t:linear}} (construído das mãos mais fortes para baixo), outras de {{t:polarized|polarizado}} (formado principalmente por mãos muito fortes e {{t:bluff|blefes}}, quase sem mãos médias); o mais importante é com quais mãos você dá 3-bet e com quais {{t:call|paga}}.

Do {{t:big-blind}} contra o Button, você dá 3-bet com as mãos mais fortes (TT+, AQ+, AJs+) mais {{t:bluff|blefes}} da parte de baixo do seu {{t:range}} de {{t:call|pagamento}}: A5s, às vezes A4s, e {{t:connectors|conectores}} do mesmo naipe. Ases do mesmo naipe bloqueiam AA e AK do adversário e, quando recebem {{t:call|pagamento}}, ainda podem fazer {{t:flush}} ou {{t:straight|sequência}}. Com {{t:pair|pares}} médios e baixos, KQo e ases de naipes diferentes (AJo–A9o), você normalmente só {{t:call|paga}}: do {{t:big-blind}} você entra barato e fecha a ação, então essas mãos lucram mais depois de {{t:call|pagar}}. A composição depende do {{t:rake}} e do tamanho do 3-bet, então 99, KQo e AJo às vezes são jogados de formas diferentes. Contra uma {{t:open|abertura}} do {{t:small-blind}}, você dá 3-bet principalmente por {{t:value|valor}} (TT+, AJs+, parte de AQo e KQ), e com A5s e {{t:connectors|conectores}} do mesmo naipe normalmente {{t:call|paga}}.

Do {{t:small-blind}}, você joga de outro jeito: 3-bet ou {{t:fold|desistência}}, com o topo do {{t:range}} no 3-bet.

:::note De onde vêm estas regras
As grades do Button e do {{t:small-blind}} vêm do solver do app e coincidem aproximadamente com as fontes (no {{t:small-blind}}, exceto em algumas mãos que os exercícios não avaliam). Como dar 3-bet do {{t:big-blind}} é ensinado por uma regra baseada em resultados publicados de outros solvers, de várias fontes independentes: a composição dos 3-bets do {{t:big-blind}} no solver do app difere deles.
:::
