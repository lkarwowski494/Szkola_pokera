---
id: m4.l1
module: m4
order: 1
title: "Quando alguém abre antes de si"
sub: "Desistir, pagar ou fazer 3-bet"
rules: [R-M4-001, R-M4-002, R-M4-003, R-M4-005, R-M4-006]
drills:
  - kind: choice
    id: m4.l1.q-size-ip
    family: m4.3bet.size
    rules: [R-M4-001]
    prompt: "O {{t:cutoff|CO}} {{t:open|abriu}} para {{n:pf.open-size}}. Pretende {{t:raise|aumentar}} a partir do Button. Para quanto?"
    table: { hand: "Ah Qh", position: BTN }
    options:
      - { text: "Para {{n:pf.3bet.ip-total}}", correct: true, why: "{{t:in-position|Em posição}}, {{t:raise|aumenta}} para cerca de {{n:pf.3bet.size-ip}} a {{t:open|abertura}}. É o padrão, que deixa uma boa relação entre o stack e o {{t:pot|pote}} no flop." }
      - { text: "Para {{n:pf.3bet.too-small}}", why: "Demasiado pouco: o adversário recebe um preço excelente para {{t:call|pagar}} com quase tudo e continuar a jogar." }
      - { text: "Para {{n:pf.3bet.too-big}}", why: "Demasiado para jogar {{t:in-position|em posição}}: arrisca mais, e as mãos melhores do adversário não vão {{t:fold|desistir}} de qualquer forma." }
  - kind: choice
    id: m4.l1.q-size-oop
    family: m4.3bet.size
    rules: [R-M4-002]
    prompt: "O Button {{t:open|abriu}} para {{n:pf.open-size}} e o {{t:small-blind}} {{t:fold|desistiu}}. Pretende {{t:raise|aumentar}} a partir do {{t:big-blind}}. Para quanto?"
    table: { hand: "Kd Ks", position: BB }
    options:
      - { text: "Para {{n:pf.3bet.oop-total}}", correct: true, why: "{{t:out-of-position|Fora de posição}}, {{t:raise|aumenta}} para cerca de {{n:pf.3bet.size-oop}} a {{t:open|abertura}}. O tamanho maior tira ao Button um {{t:call|pagamento}} barato {{t:in-position|em posição}}." }
      - { text: "Para {{n:pf.3bet.ip-total}}", why: "Esse é o tamanho para um jogador {{t:in-position|em posição}}. {{t:out-of-position|Fora de posição}}, dá ao adversário um preço demasiado bom." }
      - { text: "Apenas {{t:call|pago}}", why: "Com KK pretende construir o {{t:pot|pote}} de imediato: é a segunda melhor mão preflop." }
  - kind: choice
    id: m4.l1.q-sb
    family: m4.sb.vs-open
    rules: [R-M4-003]
    prompt: "O Button {{t:open|abriu}} para {{n:pf.open-size}}. Está no {{t:small-blind}}. Que plano é o padrão?"
    table: { position: SB }
    options:
      - { text: "{{t:raise|Aumento}} ou {{t:fold|desisto}}", correct: true, why: "Depois de {{t:call|pagar}}, joga {{t:out-of-position|fora de posição}}, e ainda tem o {{t:big-blind}} atrás de si. No {{t:small-blind}}, perante {{t:open|aberturas}} de posições tardias, os solvers quase sempre {{t:raise|aumentam}} ou {{t:fold|desistem}}." }
      - { text: "{{t:call|Pago}} com muitas mãos, porque já tenho meio blind no {{t:pot|pote}}", why: "Meio blind é pouco. {{t:call|Pagar}} {{t:out-of-position|fora de posição}} com o {{t:big-blind}} atrás de si dá uma fraca {{t:equity-realization|realização de equity}}: ganha uma parte do {{t:pot|pote}} menor do que a equity da mão indica, porque {{t:fold|desiste}} muitas vezes antes do showdown." }
      - { text: "{{t:fold|Desisto}} sempre", why: "Demasiado apertado: o Button {{t:open|abre}} com muitíssimas mãos, por isso compensa {{t:raise|aumentar}} com mãos fortes e com parte dos {{t:bluff|bluffs}}." }
  - kind: choice
    id: m4.l1.q-polar
    family: m4.3bet.shape
    rules: [R-M4-006]
    prompt: "Está no {{t:big-blind}} perante uma {{t:open|abertura}} do Button. Qual destas mãos é um 3-bet típico como {{t:bluff}}?"
    table: { position: BB }
    options:
      - { text: "A5 do mesmo naipe", correct: true, why: "Bloqueia AA e AK do adversário e, depois de um {{t:call|pagamento}}, tem hipóteses de fazer {{t:flush|flush}} e {{t:straight|sequência}}. É um {{t:bluff}} típico do fundo do {{t:range}} de {{t:call|pagamento}}: a partir do {{t:big-blind}}, faz 3-bet com as mãos mais fortes e com {{t:bluff|bluffs}} como este." }
      - { text: "K7 de naipes diferentes", why: "Com esta mão defende-se {{t:call|pagando}}. Como 3-bet, não bloqueia nada importante e joga mal quando o adversário {{t:call|paga}}." }
      - { text: "{{t:pair|Par}} 22", why: "Os {{t:pair|pares}} mais pequenos defendem-se {{t:call|pagando}}: ganham quando acertam um set (um {{t:three-of-a-kind|trio}} com um {{t:pocket-pair|pocket pair}}, ou seja, um {{t:pair|par}} formado pelas duas {{t:hole-cards|cartas próprias}}), e um 3-bet com eles lida mal com um 4-bet." }
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
Quando alguém antes de si {{t:open|abriu}}, tem três possibilidades: {{t:fold|desiste}}, {{t:call|paga}} ou {{t:raise|aumenta}} novamente. O novo {{t:raise|aumento}} chama-se 3-bet, porque é a terceira {{t:bet|aposta}} da mão (blind, {{t:open|abertura}}, {{t:raise|aumento}}).

## Tamanho do 3-bet

{{t:in-position|Em posição}}, {{t:raise|aumenta}} para cerca de {{n:pf.3bet.size-ip}} a {{t:open|abertura}}, ou seja, com uma {{t:open|abertura}} de {{n:pf.open-size}}, para {{n:pf.3bet.ip-total}}. {{t:out-of-position|Fora de posição}}, por exemplo nos blinds perante uma {{t:open|abertura}} do {{t:cutoff|CO}} ou do Button, para cerca de {{n:pf.3bet.size-oop}} a {{t:open|abertura}}, ou seja, {{n:pf.3bet.oop-total}}. O tamanho maior {{t:out-of-position|fora de posição}} tira ao adversário um {{t:call|pagamento}} barato, com o qual depois jogaria com a vantagem da {{t:position|posição}}.

## A {{t:position|posição}} decide se deve {{t:call|pagar}}

Segundo as soluções de solvers publicadas, o Button perante uma {{t:open|abertura}} do {{t:cutoff|CO}} faz normalmente 3-bet com cerca de {{n:pf.3bet-freq.btn-vs-co.low}}–{{n:pf.3bet-freq.btn-vs-co.high}} das mãos e {{t:call|paga}} apenas com cerca de {{n:pf.call-freq.btn-vs-co.low}}–{{n:pf.call-freq.btn-vs-co.high}}. Perante uma {{t:open|abertura}} do {{t:utg}} (nesta solução, mínima, para {{n:pf.open-size.solver-utg}}), já há um pouco mais de {{t:call|pagamentos}} do que 3-bets: cerca de {{n:pf.call-freq.btn-vs-utg}} contra {{n:pf.3bet-freq.btn-vs-utg}}. O {{t:range}} do {{t:utg}} é forte, por isso o 3-bet recebe mais vezes um 4-bet e ganha menos vezes o {{t:pot|pote}} de imediato.

```range
vs-open.btn-vs-co
```

A grelha mostra apenas que mãos o Button joga (com 3-bet ou {{t:call|pagando}}) e com quais {{t:fold|desiste}}. A divisão entre 3-bet e {{t:call|pagamento}} deve aprendê-la com os números acima: o solver da aplicação quase nunca {{t:call|paga}} neste spot, por isso não reproduz essa divisão. Em mais de uma dezena de mãos, por exemplo A8s, 98s e 44, o solver da aplicação joga de forma diferente das soluções publicadas, por isso os exercícios não as avaliam.

No {{t:small-blind}}, quase sempre {{t:raise|aumenta}} ou {{t:fold|desiste}}. {{t:call|Pagar}} significa jogar {{t:out-of-position|fora de posição}}, e o {{t:big-blind}} atrás de si ainda pode {{t:raise|aumentar}}. {{t:out-of-position|Fora de posição}}, a mão tem pior **{{t:equity-realization|realização de equity}}**: ganha uma parte do {{t:pot|pote}} menor do que a sua equity indica, porque {{t:fold|desiste}} mais vezes antes do showdown e tem mais dificuldade em ganhar o {{t:pot|pote}} com uma {{t:bet|aposta}}.

```range
vs-open.sb-vs-btn
```

Segundo a solução de solver publicada, o {{t:small-blind}} perante o Button quase não {{t:call|paga}}: faz 3-bet com cerca de {{n:pf.3bet-freq.sb-vs-btn}} das mãos, o topo do {{t:range}} (entre outras, 77+, AJo+, KQo, A5s, A4s, T9s), e {{t:fold|desiste}} com o resto. O solver da aplicação faz aqui 3-bet com {{n:solver.3bet.sb-vs-btn}} das mãos, incluindo os {{t:pair|pares}} 55 e 66, com os quais a solução publicada também faz muitas vezes 3-bet; os seus raros {{t:call|pagamentos}} são contados na grelha como {{t:fold|desistências}}. Em algumas mãos, por exemplo ATo, T9s e A4s, o solver da aplicação joga de forma diferente das soluções publicadas, por isso os exercícios não as avaliam.

## {{t:range|Range}} {{t:linear}} ou {{t:polarized|polarizado}}

Tendo {{t:position|posição}} perante uma {{t:open|abertura}} do {{t:cutoff|CO}}, faz 3-bet sobretudo com as melhores mãos, a partir do topo, e acrescenta alguns {{t:bluff|bluffs}} com ases do mesmo naipe (A5s, A4s), enquanto as mãos médias (por exemplo 77–99, AJs, ATs, {{t:connectors|conectores}} do mesmo naipe) joga de forma mista: com umas faz 3-bet, com outras {{t:call|paga}}. O adversário {{t:call|paga}} muitas vezes, por isso pretende ter uma mão que jogue bem no {{t:pot|pote}} depois de um {{t:call|pagamento}}. As fontes dão nomes diferentes a este {{t:range}}: umas chamam-lhe {{t:linear}} (construído a partir das mãos mais fortes para baixo), outras {{t:polarized|polarizado}} (composto sobretudo por mãos muito fortes e {{t:bluff|bluffs}}, quase sem mãos médias); mais importante é com que mãos faz 3-bet e com quais {{t:call|paga}}.

A partir do {{t:big-blind}} perante o Button, faz 3-bet com as mãos mais fortes (TT+, AQ+, AJs+) e com {{t:bluff|bluffs}} do fundo do {{t:range}} de {{t:call|pagamento}}: A5s, por vezes A4s, e {{t:connectors|conectores}} do mesmo naipe. Os ases do mesmo naipe bloqueiam AA e AK do adversário e, quando recebem um {{t:call|pagamento}}, ainda podem fazer {{t:flush|flush}} ou {{t:straight|sequência}}. Com {{t:pair|pares}} médios e pequenos, KQo e ases de naipes diferentes (AJo–A9o), normalmente apenas {{t:call|paga}}: no {{t:big-blind}} entra barato e fecha a ação, por isso estas mãos ganham mais depois de {{t:call|pagar}}. A composição depende do {{t:rake}} e do tamanho do 3-bet, por isso 99, KQo e AJo são por vezes jogadas de formas diferentes. Perante uma {{t:open|abertura}} do {{t:small-blind}}, faz 3-bet sobretudo por {{t:value|valor}} (TT+, AJs+, parte de AQo e KQ), e com A5s e {{t:connectors|conectores}} do mesmo naipe normalmente {{t:call|paga}}.

No {{t:small-blind}} joga de outra forma: fazer 3-bet ou {{t:fold|desistir}}, com o topo do {{t:range}} no 3-bet.

:::note De onde vêm estas regras
As grelhas do Button e do {{t:small-blind}} provêm do solver da aplicação e coincidem aproximadamente com as fontes (no {{t:small-blind}}, exceto algumas mãos que os exercícios não avaliam). Como fazer 3-bet a partir do {{t:big-blind}} é ensinado por uma regra baseada em resultados publicados de outros solvers, provenientes de várias fontes independentes: a composição dos 3-bets do {{t:big-blind}} no solver da aplicação afasta-se deles.
:::
