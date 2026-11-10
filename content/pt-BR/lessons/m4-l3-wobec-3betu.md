---
id: m4.l3
module: m4
order: 3
title: "Quando você recebe um 3-bet"
sub: "Desistir, pagar ou dar 4-bet"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "Você {{t:open|abriu}} do {{t:cutoff|CO}} para {{n:pf.open-size}}, o Button {{t:raise|aumentou}} para {{n:pf.3bet.ip-total}} e os blinds {{t:fold|desistiram}}. Que parte do seu {{t:range|range}} de {{t:open|abertura}} você precisa, no mínimo, continuar ({{t:call|pagar}} ou dar 4-bet) para que o Button não lucre dando 3-bet com qualquer mão?"
    table: { position: CO }
    options:
      - { text: "Cerca de {{n:mdf.vs-3bet-ip-size}} do {{t:range|range}} de {{t:open|abertura}}", correct: true, why: "O Button arrisca {{n:pf.3bet.ip-total}} para ganhar {{n:vs3bet.win}}. Se você {{t:fold|desistir}} com mais frequência que {{n:alpha.vs-3bet-ip-size}}, o 3-bet dele lucra até com a pior mão." }
      - { text: "Cerca de metade do {{t:range|range}}", why: "É demais para um mínimo: pela matemática, basta {{n:mdf.vs-3bet-ip-size}}. Segundo soluções de solvers e tabelas, quem {{t:open|abre}} {{t:fold|desiste}} de cerca de {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}} das {{t:open|aberturas}}, então continua com menos da metade do {{t:range|range}}." }
      - { text: "Sempre, com qualquer mão", why: "Assim você paga 3-bets com mãos que perdem para o {{t:range|range}} do Button. {{t:fold|Desistir}} da parte mais fraca das {{t:open|aberturas}} é correto." }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Você {{t:open|abriu}} do {{t:cutoff|CO}} para {{n:pf.open-size}}, o Button {{t:raise|aumentou}} para {{n:pf.3bet.ip-total}} e os blinds {{t:fold|desistiram}}. O que você faz?"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "KJ de naipes diferentes {{t:out-of-position}} costuma ser dominado por AK, AJ e KQ, e é difícil de jogar depois do flop. Os materiais de treino recomendam {{t:fold}} aqui." }
      - { text: "{{t:call|Pago}}", why: "É tentador, porque são cartas altas, mas {{t:out-of-position}} esta mão {{t:equity-realization|realiza equity}} mal e muitas vezes perde para um kicker melhor." }
      - { text: "Dou 4-bet", why: "KJo é fraco demais para dar 4-bet {{t:value|por valor}}, e como {{t:bluff}} não bloqueia as mãos com que o Button continua." }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Você {{t:open|abriu}} do {{t:cutoff|CO}} para {{n:pf.open-size}}, o Button {{t:raise|aumentou}} para {{n:pf.3bet.ip-total}} e os blinds {{t:fold|desistiram}}. O que você faz?"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "Dou 4-bet", correct: true, why: "Com AK, você normalmente dá 4-bet: a mão quer colocar o stack todo, bloqueia AA e KK do adversário e domina AQ, KQ e ases mais fracos." }
      - { text: "{{t:call|Pago}}", why: "Algumas fontes às vezes {{t:call|pagam}} com AK, mas normalmente você dá 4-bet: {{t:out-of-position}}, depois de {{t:call|pagar}} você perde a {{t:initiative|iniciativa}} e valor." }
      - { text: "{{t:fold|Desisto}}", why: "AK é uma das melhores mãos no preflop. {{t:fold|Desistir}} aqui é um grande erro." }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Você {{t:open|abriu}} do Button para {{n:pf.open-size}}, o {{t:small-blind}} {{t:fold|desistiu}} e o {{t:big-blind}} {{t:raise|aumentou}} para {{n:pf.3bet.oop-total}}. O que você faz?"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Um {{t:connectors|conector}} do mesmo naipe {{t:in-position}} {{t:equity-realization|realiza bem a equity}}: faz {{t:straight|sequências}} e flushes, e quando erra, é fácil {{t:fold|desistir}} no flop." }
      - { text: "{{t:fold|Desisto}}", why: "{{t:in-position|Em posição}}, esta mão é jogável o bastante para defender. {{t:fold|Desistir}} seria apertado demais." }
      - { text: "Dou 4-bet", why: "Como {{t:bluff}}, ases do mesmo naipe funcionam melhor, porque bloqueiam AA e AK. 87s prefere ver o flop." }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Você {{t:open|abriu}} do Button para {{n:pf.open-size}}, o {{t:small-blind}} {{t:fold|desistiu}} e o {{t:big-blind}} {{t:raise|aumentou}} para {{n:pf.3bet.oop-total}}. O que você faz?"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Segundo uma das fontes, contra um 3-bet grande você {{t:fold|desiste}} dos {{t:pair|pares}} mais baixos mesmo {{t:in-position}}: eles lucram principalmente quando acertam um set, e o preço é alto demais. Outra fonte admite {{t:call|pagar}} com eles {{t:in-position}}." }
      - { text: "{{t:call|Pago}}, porque tenho {{t:position|posição}}", why: "A {{t:position|posição}} ajuda, mas contra um 3-bet para {{n:pf.3bet.oop-total}} o preço é alto demais para uma mão que precisa acertar um set." }
      - { text: "Dou 4-bet", why: "Um {{t:pair|par}} de 33 não é mão para 4-bet: não é valor nem um bom {{t:bluff}}." }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Você {{t:open|abriu}} do {{t:cutoff|CO}} para {{n:pf.open-size}}, o Button {{t:raise|aumentou}} para {{n:pf.3bet.ip-total}} e os blinds {{t:fold|desistiram}}. O que você faz?"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "Dou 4-bet", correct: true, why: "Uma das fontes dá 4-bet com QQ (e JJ) na grande maioria dos casos: o Button continua com muitos {{t:pair|pares}} mais fracos e ases." }
      - { text: "{{t:call|Pago}}", correct: true, why: "Também é uma boa jogada: outra fonte coloca QQ no {{t:range|range}} de {{t:call|call}} para não fazer o Button largar as mãos mais fracas. As fontes divergem, então as duas jogadas são boas." }
      - { text: "{{t:fold|Desisto}}", why: "QQ é a terceira melhor mão no preflop. {{t:fold|Desistir}} é um grande erro." }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Você {{t:open|abriu}} do {{t:cutoff|CO}} para {{n:pf.open-size}}, o Button {{t:raise|aumentou}} para {{n:pf.3bet.ip-total}} e os blinds {{t:fold|desistiram}}. O que você faz?"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Um ás forte do mesmo naipe é a base do {{t:range|range}} de {{t:call|call}}: bloqueia AA e AK e faz flushes e bons {{t:pair|pares}}." }
      - { text: "{{t:fold|Desisto}}", why: "Apertado demais: AJs está entre as melhores mãos para defender contra um 3-bet." }
      - { text: "Dou 4-bet {{t:value|por valor}}", why: "AJs é fraco demais para querer jogar pelo stack inteiro. As mãos melhores do Button o dominam." }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "Você {{t:open|abriu}} do Button para {{n:pf.open-size}}, o {{t:small-blind}} {{t:raise|aumentou}} para {{n:pf.3bet.oop-total}} e o {{t:big-blind}} {{t:fold|desistiu}}. Você tem KK e quer dar 4-bet. Para quanto?"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "Para cerca de {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}", correct: true, why: "{{t:in-position|Em posição}}, o 4-bet tem cerca de {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} do 3-bet. Se o {{t:small-blind}} {{t:call|pagar}}, o {{t:pot|pote}} fica com cerca de {{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}} (com o {{t:big-blind|big blind}} morto), e nos stacks restam cerca de {{n:spr.4bet.high}}–{{n:spr.4bet}} vezes o que há no {{t:pot|pote}}." }
      - { text: "Para {{n:pf.4bet.too-small}}", why: "Pouco demais: você dá ao adversário um preço muito bom para {{t:call|pagar}} {{t:out-of-position}}." }
      - { text: "All-in por {{n:format.stack}}", why: "Com stacks de {{n:format.stack}}, o all-in expulsa as mãos mais fracas com que o adversário pagaria o 4-bet. Você ganha menos." }
---
O 3-bet é a resposta do adversário à sua {{t:open|abertura}}. Você tem três opções: {{t:fold|desistir}}, {{t:call|pagar}} ou {{t:raise|aumentar}} de novo, ou seja, dar 4-bet.

:::note De onde vêm estas regras
Esta lição se baseia em materiais de treino de várias fontes e em resultados publicados de outros solvers, não no solver do app. No jogo contra 3-bet, o solver do app ainda não passou por validação, por isso as regras estão marcadas como heurísticas.
:::

## Quanto continuar

Quando o Button {{t:raise|aumenta}} a sua {{t:open|abertura}} do {{t:cutoff|CO}} para {{n:pf.3bet.ip-total}}, ele arrisca esse valor para ganhar {{n:vs3bet.win}}. Se você {{t:fold|desistir}} com mais frequência que {{n:alpha.vs-3bet-ip-size}}, o 3-bet dele lucra com qualquer mão. Então você precisa continuar com pelo menos cerca de {{n:mdf.vs-3bet-ip-size}} do {{t:range|range}} de {{t:open|abertura}}.

Segundo uma solução de solver publicada ({{t:cutoff|CO}} contra 3-bet do Button para {{n:pf.3bet.ip-total}}), quem {{t:open|abre}} {{t:fold|desiste}} de cerca de {{n:pf.vs3bet.pub1.fold}} das {{t:open|aberturas}}, {{t:call|paga}} cerca de {{n:pf.vs3bet.pub1.call}} e dá 4-bet em cerca de {{n:pf.vs3bet.pub1.4bet}}; tabelas simplificadas de outra fonte dão cerca de {{n:pf.vs3bet.pub2.fold}} / {{n:pf.vs3bet.pub2.call}} / {{n:pf.vs3bet.pub2.4bet}}. Adotamos intervalos próximos às duas fontes: {{t:fold}} cerca de {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}, {{t:call}} cerca de {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}, 4-bet cerca de {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}. O limite superior de {{t:fold|folds}} fica logo abaixo do limiar de {{n:alpha.vs-3bet-ip-size}}: desistindo com mais frequência, o 3-bet do Button lucraria com qualquer mão. Para {{t:call|pagar}}, você precisa de cerca de {{n:eq.call-3bet-ip-size}} de equity: você coloca {{n:vs3bet.call}} em um {{t:pot|pote}} que, depois do {{t:call}}, tem {{n:vs3bet.pot-after}}.

## {{t:out-of-position|Fora de posição}}, escolha com cuidado

{{t:out-of-position|Fora de posição}}, você {{t:call|paga}} com mãos que jogam bem depois do flop: principalmente cartas altas do mesmo naipe (KQs, QJs), ases fortes do mesmo naipe, {{t:pair|pares}} médios e altos e parte dos {{t:connectors|conectores}} do mesmo naipe. Mãos mais fracas de naipes diferentes, como KJo, ATo ou QTo, muitas vezes estão dominadas, então você {{t:fold|desiste}} delas.

## {{t:in-position|Em posição}}, defenda mais amplo

{{t:in-position|Em posição}}, você também {{t:call|paga}} com {{t:pair|pares}} de 66 a TT e {{t:connectors|conectores}} do mesmo naipe (T9s, 98s, 87s). Segundo uma das fontes, contra um 3-bet grande você {{t:fold|desiste}} dos {{t:pair|pares}} mais baixos mesmo {{t:in-position}}: eles lucram principalmente quando acertam um set, e o preço é alto demais. Outra fonte admite {{t:call|pagar}} com eles {{t:in-position}}.

## 4-bet

Com AA, KK e AK, você normalmente dá 4-bet {{t:value|por valor}}; com AK, algumas fontes às vezes {{t:call|pagam}}. As fontes jogam QQ e JJ de formas diferentes: uma dá principalmente 4-bet, a outra {{t:call|paga}}. Como {{t:bluff}}, os melhores são ases do mesmo naipe, por exemplo A5s: bloqueiam AA e AK do adversário e, depois de um {{t:call}}, têm chance de fazer {{t:flush}} e {{t:straight|sequência}}. O tamanho do 4-bet é de cerca de {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} do 3-bet {{t:in-position}} e {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}} {{t:out-of-position}}. Por exemplo, quando você dá 4-bet do Button contra o 3-bet do {{t:small-blind|small blind}} para {{n:pf.3bet.oop-total}} (o {{t:big-blind}} {{t:fold|desistiu}}), você {{t:raise|aumenta}} para {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}; quando dá 4-bet do {{t:cutoff|CO}} contra o 3-bet do Button para {{n:pf.3bet.ip-total}}, você {{t:raise|aumenta}} para cerca de {{n:pf.4bet.oop-example.low}}. Depois do {{t:call}}, restam nos stacks cerca de {{n:spr.4bet.high}}–{{n:spr.4bet.oop}} vezes o que há no {{t:pot|pote}}, então mãos boas colocam o resto com facilidade.
