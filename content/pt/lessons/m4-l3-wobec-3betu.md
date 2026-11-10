---
id: m4.l3
module: m4
order: 3
title: "Quando enfrenta um 3-bet"
sub: "Desistir, pagar ou fazer 4-bet"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "{{t:open|Abriu}} do {{t:cutoff|CO}} para {{n:pf.open-size}}, o Button {{t:raise|aumentou}} para {{n:pf.3bet.ip-total}} e os blinds {{t:fold|desistiram}}. Que parte do {{t:range|range}} de {{t:open|abertura}} tem de continuar, no mínimo ({{t:call|pagar}} ou fazer 4-bet), para que o Button não lucre com o 3-bet com qualquer mão?"
    table: { position: CO }
    options:
      - { text: "Cerca de {{n:mdf.vs-3bet-ip-size}} do {{t:range|range}} de {{t:open|abertura}}", correct: true, why: "O Button arrisca {{n:pf.3bet.ip-total}} para ganhar {{n:vs3bet.win}}. Se {{t:fold|desistir}} mais vezes do que {{n:alpha.vs-3bet-ip-size}}, o 3-bet dele lucra mesmo com a pior mão." }
      - { text: "Cerca de metade do {{t:range|range}}", why: "Demasiado para um mínimo: pela matemática bastam {{n:mdf.vs-3bet-ip-size}}. Segundo as soluções de solvers e as tabelas, quem {{t:open|abre}} {{t:fold|desiste}} de cerca de {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}} das {{t:open|aberturas}}, pelo que continua com menos de metade do {{t:range|range}}." }
      - { text: "Sempre, com qualquer mão", why: "Assim paga 3-bets com mãos que perdem contra o {{t:range|range}} do Button. {{t:fold|Desistir}} com a parte mais fraca das {{t:open|aberturas}} é correto." }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "{{t:open|Abriu}} do {{t:cutoff|CO}} para {{n:pf.open-size}}, o Button {{t:raise|aumentou}} para {{n:pf.3bet.ip-total}} e os blinds {{t:fold|desistiram}}. O que faz?"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "KJ de naipes diferentes {{t:out-of-position}} é muitas vezes dominado por AK, AJ e KQ, e é difícil de jogar depois do flop. Os materiais de formação recomendam aqui {{t:fold}}." }
      - { text: "{{t:call|Pago}}", why: "É tentador porque são cartas altas, mas {{t:out-of-position}} esta mão {{t:equity-realization|realiza a equity}} mal e perde muitas vezes contra um kicker melhor." }
      - { text: "Faço 4-bet", why: "KJo é demasiado fraco para fazer 4-bet {{t:value|por valor}} e, como {{t:bluff}}, não bloqueia as mãos com que o Button continua." }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "{{t:open|Abriu}} do {{t:cutoff|CO}} para {{n:pf.open-size}}, o Button {{t:raise|aumentou}} para {{n:pf.3bet.ip-total}} e os blinds {{t:fold|desistiram}}. O que faz?"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "Faço 4-bet", correct: true, why: "Com AK faz normalmente 4-bet: é uma mão que quer colocar o stack em jogo, bloqueia AA e KK do adversário e domina AQ, KQ e ases mais fracos." }
      - { text: "{{t:call|Pago}}", why: "Algumas fontes por vezes {{t:call|pagam}} com AK, mas normalmente faz 4-bet: {{t:out-of-position}}, depois de {{t:call|pagar}} perde a {{t:initiative|iniciativa}} e valor." }
      - { text: "{{t:fold|Desisto}}", why: "AK é uma das melhores mãos preflop. {{t:fold|Desistir}} aqui é um grande erro." }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "{{t:open|Abriu}} do Button para {{n:pf.open-size}}, o {{t:small-blind}} {{t:fold|desistiu}} e o {{t:big-blind}} {{t:raise|aumentou}} para {{n:pf.3bet.oop-total}}. O que faz?"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Um {{t:connectors|conector}} do mesmo naipe {{t:in-position}} {{t:equity-realization|realiza bem a equity}}: faz {{t:straight|sequências}} e flushes e, quando falha, é fácil {{t:fold|desistir}} dele no flop." }
      - { text: "{{t:fold|Desisto}}", why: "{{t:in-position|Em posição}}, esta mão é suficientemente jogável para defender. {{t:fold|Desistir}} seria demasiado apertado." }
      - { text: "Faço 4-bet", why: "Como {{t:bluff}}, os ases do mesmo naipe são mais adequados, porque bloqueiam AA e AK. 87s prefere ver o flop." }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "{{t:open|Abriu}} do Button para {{n:pf.open-size}}, o {{t:small-blind}} {{t:fold|desistiu}} e o {{t:big-blind}} {{t:raise|aumentou}} para {{n:pf.3bet.oop-total}}. O que faz?"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Segundo uma das fontes, contra um 3-bet grande {{t:fold|desiste}} dos {{t:pair|pares}} mais baixos mesmo {{t:in-position}}: lucram sobretudo quando acertam um set, e o preço é demasiado alto. Outra fonte admite {{t:call|pagar}} com eles {{t:in-position}}." }
      - { text: "{{t:call|Pago}}, porque tenho {{t:position|posição}}", why: "A {{t:position|posição}} ajuda, mas contra um 3-bet para {{n:pf.3bet.oop-total}} o preço é demasiado alto para uma mão que precisa de acertar um set." }
      - { text: "Faço 4-bet", why: "O {{t:pair|par}} de 33 não é mão para 4-bet: não é valor nem um bom {{t:bluff}}." }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "{{t:open|Abriu}} do {{t:cutoff|CO}} para {{n:pf.open-size}}, o Button {{t:raise|aumentou}} para {{n:pf.3bet.ip-total}} e os blinds {{t:fold|desistiram}}. O que faz?"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "Faço 4-bet", correct: true, why: "Uma das fontes faz 4-bet com QQ (e JJ) na grande maioria dos casos: o Button continua com muitos {{t:pair|pares}} mais fracos e ases." }
      - { text: "{{t:call|Pago}}", correct: true, why: "Também é uma boa jogada: outra fonte coloca QQ no {{t:range|range}} de {{t:call|pagamento}}, para não afastar as mãos mais fracas do Button. As fontes divergem, por isso ambas as jogadas são boas." }
      - { text: "{{t:fold|Desisto}}", why: "QQ é a terceira melhor mão preflop. {{t:fold|Desistir}} é um grande erro." }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "{{t:open|Abriu}} do {{t:cutoff|CO}} para {{n:pf.open-size}}, o Button {{t:raise|aumentou}} para {{n:pf.3bet.ip-total}} e os blinds {{t:fold|desistiram}}. O que faz?"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Um ás forte do mesmo naipe é a base do {{t:range|range}} de {{t:call|pagamento}}: bloqueia AA e AK, faz flushes e bons {{t:pair|pares}}." }
      - { text: "{{t:fold|Desisto}}", why: "Demasiado apertado: AJs é uma das melhores mãos para defender contra um 3-bet." }
      - { text: "Faço 4-bet {{t:value|por valor}}", why: "AJs é demasiado fraco para querer jogar o stack inteiro. As mãos melhores do Button dominam-no." }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "{{t:open|Abriu}} do Button para {{n:pf.open-size}}, o {{t:small-blind}} {{t:raise|aumentou}} para {{n:pf.3bet.oop-total}} e o {{t:big-blind}} {{t:fold|desistiu}}. Tem KK e quer fazer 4-bet. Para quanto?"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "Para cerca de {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}", correct: true, why: "{{t:in-position|Em posição}}, o 4-bet tem cerca de {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} do 3-bet. Se o {{t:small-blind}} {{t:call|pagar}}, ficam no {{t:pot|pote}} cerca de {{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}} (com o {{t:big-blind|big blind}} morto) e nos stacks resta cerca de {{n:spr.4bet.high}}–{{n:spr.4bet}} vezes o que está no {{t:pot|pote}}." }
      - { text: "Para {{n:pf.4bet.too-small}}", why: "Demasiado pouco: dá ao adversário um preço muito bom para {{t:call}} {{t:out-of-position}}." }
      - { text: "All-in por {{n:format.stack}}", why: "Com stacks de {{n:format.stack}}, o all-in afasta as mãos mais fracas com que o adversário pagaria o 4-bet. Ganha menos." }
---
O 3-bet é a resposta do adversário à sua {{t:open}}. Tem três opções: {{t:fold|desistir}}, {{t:call|pagar}} ou {{t:raise|aumentar}} outra vez, ou seja, fazer 4-bet.

:::note De onde vêm estas regras
Esta lição baseia-se em materiais de formação de várias fontes e em resultados publicados de outros solvers, e não no solver da aplicação. No jogo contra 3-bet, o solver da aplicação ainda não foi validado, por isso as regras estão marcadas como heurísticas.
:::

## Quanto continuar

Quando o Button {{t:raise|aumenta}} a sua {{t:open}} do {{t:cutoff|CO}} para {{n:pf.3bet.ip-total}}, arrisca esse valor para ganhar {{n:vs3bet.win}}. Se {{t:fold|desistir}} mais vezes do que {{n:alpha.vs-3bet-ip-size}}, o 3-bet dele lucra com qualquer mão. Por isso, tem de continuar com pelo menos cerca de {{n:mdf.vs-3bet-ip-size}} do {{t:range|range}} de {{t:open|abertura}}.

Segundo uma solução de solver publicada ({{t:cutoff|CO}} contra um 3-bet do Button para {{n:pf.3bet.ip-total}}), quem {{t:open|abre}} {{t:fold|desiste}} de cerca de {{n:pf.vs3bet.pub1.fold}} das {{t:open|aberturas}}, {{t:call|paga}} cerca de {{n:pf.vs3bet.pub1.call}} e faz 4-bet com cerca de {{n:pf.vs3bet.pub1.4bet}}; as tabelas simplificadas de outra fonte dão cerca de {{n:pf.vs3bet.pub2.fold}} / {{n:pf.vs3bet.pub2.call}} / {{n:pf.vs3bet.pub2.4bet}}. Adotamos intervalos próximos de ambas as fontes: {{t:fold}} cerca de {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}, {{t:call}} cerca de {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}, 4-bet cerca de {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}. O limite superior de {{t:fold|desistências}} fica logo abaixo do limiar de {{n:alpha.vs-3bet-ip-size}}: desistindo mais vezes, o 3-bet do Button lucraria com qualquer mão. Para {{t:call|pagar}}, precisa de cerca de {{n:eq.call-3bet-ip-size}} de equity: acrescenta {{n:vs3bet.call}} a um {{t:pot|pote}} que, depois do {{t:call|pagamento}}, tem {{n:vs3bet.pot-after}}.

## {{t:out-of-position|Fora de posição}}, escolha com cuidado

{{t:out-of-position|Fora de posição}}, {{t:call|paga}} com mãos que jogam bem depois do flop: sobretudo cartas altas do mesmo naipe (KQs, QJs), ases fortes do mesmo naipe, {{t:pair|pares}} médios e altos e alguns {{t:connectors|conectores}} do mesmo naipe. Mãos mais fracas de naipes diferentes, como KJo, ATo ou QTo, são muitas vezes dominadas, por isso {{t:fold|desiste}} delas.

## {{t:in-position|Em posição}}, defenda de forma mais ampla

{{t:in-position|Em posição}}, também {{t:call|paga}} com {{t:pair|pares}} de 66 a TT e {{t:connectors|conectores}} do mesmo naipe (T9s, 98s, 87s). Segundo uma das fontes, contra um 3-bet grande {{t:fold|desiste}} dos {{t:pair|pares}} mais baixos mesmo {{t:in-position}}: lucram sobretudo quando acertam um set, e o preço é demasiado alto. Outra fonte admite {{t:call|pagar}} com eles {{t:in-position}}.

## 4-bet

Com AA, KK e AK faz normalmente 4-bet {{t:value|por valor}}; com AK, algumas fontes por vezes {{t:call|pagam}}. As fontes jogam QQ e JJ de forma diferente: uma faz sobretudo 4-bet, a outra {{t:call|paga}}. Como {{t:bluff}}, os melhores são os ases do mesmo naipe, por exemplo A5s: bloqueiam AA e AK do adversário e, depois de um {{t:call|pagamento}}, têm hipóteses de fazer {{t:flush}} e {{t:straight|sequência}}. O tamanho do 4-bet é de cerca de {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} do 3-bet {{t:in-position}} e de {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}} {{t:out-of-position}}. Por exemplo, quando faz 4-bet do Button contra um 3-bet do {{t:small-blind|small blind}} para {{n:pf.3bet.oop-total}} (o {{t:big-blind}} {{t:fold|desistiu}}), {{t:raise|aumenta}} para {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}; quando faz 4-bet do {{t:cutoff|CO}} contra um 3-bet do Button para {{n:pf.3bet.ip-total}}, {{t:raise|aumenta}} para cerca de {{n:pf.4bet.oop-example.low}}. Depois do {{t:call|pagamento}}, nos stacks resta cerca de {{n:spr.4bet.high}}–{{n:spr.4bet.oop}} vezes o que está no {{t:pot|pote}}, pelo que as boas mãos colocam facilmente o resto.
