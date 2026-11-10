---
id: m5.l3
module: m5
order: 3
title: "Com que frequência e quanto"
sub: "C-bet em posição"
rules: [R-M5-007, R-M5-008, R-M5-009, R-M5-010, R-M5-011]
drills:
  - kind: cbet
    id: m5.l3.c-btn
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Você {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e {{t:check|dá check}} no flop. Qual plano combina com este flop?"
    position: BTN
    options:
      check: "{{t:check|Dou check}} mais vezes, c-bet com menos frequência que o normal"
      small: "C-bet frequente e pequeno: {{n:cbet.size.small}} do {{t:pot|pote}} ({{n:cbet.btn.small}})"
      big: "C-bet frequente e grande: {{n:cbet.size.big}} do {{t:pot|pote}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Cauteloso demais: em um flop {{t:dry|seco}} e alto, você tem {{t:range-advantage|vantagem de range}}, e o rival geralmente errou. Ao {{t:check|dar check}}, você dá a ele uma carta grátis."
          small: "Isso: um flop {{t:dry|seco}} e alto favorece você. Uma {{t:bet|aposta}} pequena basta para o rival {{t:fold|desistir}} das mãos fracas, e {{t:pair|pares}} piores ainda vão {{t:call|pagá-la}}."
          big: "Ação certa, tamanho errado: em um flop {{t:dry|seco}}, o rival tem poucos {{t:draw|projetos}}, e as mãos que erraram também vão {{t:fold|desistir}} diante de uma {{t:bet|aposta}} pequena. Uma {{t:bet|aposta}} maior faz {{t:fold|desistir}} mais ou menos as mesmas mãos, mas arrisca mais. Aposte cerca de {{n:cbet.size.small}} do {{t:pot|pote}}."
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "Cauteloso demais: você tem {{t:range-advantage|vantagem de range}}, e em um flop {{t:paired|pareado}} é difícil ter um {{t:draw|projeto}}, então um rival sem {{t:pair|par}} raramente consegue pagar nem mesmo uma {{t:bet|aposta}} pequena."
          small: "Isso: em um flop {{t:paired|pareado}}, você aposta com frequência e pouco. Um rival sem {{t:pair|par}} raramente tem com o que {{t:call|pagar}}, e os dois jogadores podem ter {{t:three-of-a-kind|trinca}}, então não há motivo para arriscar mais."
          big: "Ação certa, tamanho errado: em um flop {{t:paired|pareado}}, qualquer um de vocês pode ter {{t:three-of-a-kind|trinca}}, então uma {{t:bet|aposta}} grande não compensa, e as mãos fracas do rival também vão {{t:fold|desistir}} diante de uma pequena. Basta cerca de {{n:cbet.size.small}} do {{t:pot|pote}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Isso: um flop baixo com cartas próximas acerta o {{t:range|range}} do {{t:big-blind}}: ele tem aqui {{t:straight|sequências}} e {{t:two-pair|dois pares}}, e você não tem {{t:nuts-advantage|vantagem de nuts}}. Você faz c-bet com menos frequência que em flops altos: muitas mãos {{t:check|dão check}}, e apostam principalmente as mãos fortes e os {{t:draw|projetos}} fortes."
          small: "Frequente demais: em um flop baixo com cartas próximas, você não tem {{t:nuts-advantage|vantagem de nuts}}. C-bets frequentes, mesmo pequenos, dão ao {{t:big-blind}} a chance de {{t:raise|aumentar}} depois de {{t:check|dar check}} antes (check-raise) com as mãos mais fortes."
          big: "Frequente e caro demais: o {{t:big-blind}} tem aqui no {{t:range|range}} {{t:straight|sequências}} e {{t:two-pair|dois pares}}. Um c-bet grande e frequente arrisca muito quando você mesmo geralmente só tem cartas altas."
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "Você {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e {{t:check|dá check}}. Você tem um {{t:pair|par}} de reis com valete. O que você faz?"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} do {{t:pot|pote}})", correct: true, why: "Isso: {{t:top-pair|top pair}} ({{t:pair|par}} com a carta mais alta da {{t:board|mesa}}) em um flop {{t:dry|seco}}. Uma {{t:bet|aposta}} pequena recebe {{t:call|pagamento}} de setes, duques e reis mais fracos, e o rival quase não tem {{t:draw|projetos}}." }
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} do {{t:pot|pote}})", sizeError: true, why: "Ação certa, tamanho errado: em um flop {{t:dry|seco}}, o rival não tem {{t:draw|projetos}}, e as mãos que erraram também vão {{t:fold|desistir}} diante de uma {{t:bet|aposta}} pequena. Uma {{t:bet|aposta}} maior faz {{t:fold|desistir}} mais ou menos as mesmas mãos, mas arrisca mais. Aposte cerca de {{n:cbet.size.small}} do {{t:pot|pote}}." }
      - { text: "{{t:check|Dou check}}", why: "Você perde valor: o rival tem muitos {{t:pair|pares}} mais fracos e mãos com ás que pagariam uma {{t:bet|aposta}} pequena. Em um flop {{t:dry|seco}} com {{t:top-pair|top pair}}, você aposta." }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "Você {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e {{t:check|dá check}}. Você tem um set de valetes em um flop com muitos {{t:draw|projetos}}. O que você faz?"
    table: { hand: "Jc Js", position: BTN, board: "Kh Jh 7c" }
    options:
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} do {{t:pot|pote}})", correct: true, why: "Isso: o rival tem muitos {{t:flush-draw|projetos de flush}} e de {{t:straight|sequência}} (ex.: QT, AQ, duas cartas de copas). Uma {{t:bet|aposta}} grande faz com que eles paguem caro pela próxima carta." }
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} do {{t:pot|pote}})", sizeError: true, why: "Ação certa, tamanho errado: uma {{t:bet|aposta}} pequena dá aos {{t:draw|projetos}} do rival uma carta barata, e seu set pode perder para um flush ou uma {{t:straight|sequência}}. Com muitos {{t:draw|projetos}}, aposte alto." }
      - { text: "{{t:check|Dou check}} para não espantar o rival", why: "Com muitos {{t:draw|projetos}}, uma carta grátis é um presente para eles. Com uma mão muito forte, você constrói o {{t:pot|pote}} logo." }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "Você {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e {{t:check|dá check}}. O flop está {{t:paired|pareado}}. Qual plano combina?"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "C-bet frequente e pequeno", correct: true, why: "Isso: você tem {{t:range-advantage|vantagem de range}}, e em um flop {{t:paired|pareado}} é difícil ter um {{t:draw|projeto}}, então um rival sem {{t:pair|par}} raramente consegue pagar nem mesmo uma {{t:bet|aposta}} pequena. Você também tem mais {{t:pair|pares}} altos, ex.: AA e KK, que o {{t:big-blind}} geralmente não tem depois de só {{t:call|pagar}}." }
      - { text: "C-bet frequente e grande", sizeError: true, why: "Ação certa, tamanho errado: qualquer um de vocês pode ter {{t:three-of-a-kind|trinca}}, então uma {{t:bet|aposta}} grande não compensa, e um rival sem {{t:pair|par}} também vai {{t:fold|desistir}} diante de uma pequena. Aposte com frequência e pouco." }
      - { text: "{{t:check|Dou check}} mais vezes do que aposto", why: "Cauteloso demais: um flop {{t:paired|pareado}} e alto favorece você, e o rival geralmente não tem nada aqui." }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "Você {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e {{t:check|dá check}}. O flop está {{t:monotone|monocromático}}. Qual plano combina?"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "C-bet com menos frequência que o normal e pequeno", correct: true, why: "Isso: qualquer jogador já pode ter {{t:flush}}, então sua {{t:nuts-advantage|vantagem de nuts}} é menor do que em um flop alto comum. Você aposta com menos frequência e com tamanho pequeno, para não construir um {{t:pot|pote}} grande contra um flush." }
      - { text: "C-bet frequente e grande, para os {{t:draw|projetos}} pagarem", why: "Em um flop {{t:monotone|monocromático}}, um {{t:pot|pote}} grande é perigoso: o rival pode ter um {{t:flush}} pronto, e suas mãos sem carta de copas se defendem mal." }
      - { text: "Sempre {{t:check|dou check}}", why: "Cauteloso demais: um flop alto ainda favorece você, e parte das mãos (ex.: com uma carta alta de copas) aposta pouco de bom grado." }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Há {{n:ex.pot}} no {{t:pot|pote}}. Você aposta {{n:cbet.ex.small}} sem nenhuma mão. Em que porcentagem das vezes o rival precisa {{t:fold|desistir}} para que essa {{t:bet|aposta}} fique no zero a zero? Digite um número."
    answer: alpha.cbet.small
    explanation: "Você arrisca {{n:cbet.ex.small}} para ganhar {{n:ex.pot}}. O limite é aposta ÷ ({{t:pot|pote}} + aposta): {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. O rival erra o flop com muito mais frequência, por isso o c-bet pequeno compensa com tanta frequência."
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Há {{n:ex.pot}} no {{t:pot|pote}}. Você aposta {{n:cbet.ex.big}} sem nenhuma mão. Em que porcentagem das vezes o rival precisa {{t:fold|desistir}} para que essa {{t:bet|aposta}} fique no zero a zero? Digite um número."
    answer: alpha.cbet.big
    explanation: "Você arrisca {{n:cbet.ex.big}} para ganhar {{n:ex.pot}}: {{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}. Um {{t:bluff|blefe}} grande precisa funcionar com muito mais frequência do que um pequeno ({{n:alpha.cbet.small}})."
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Por que, em um flop {{t:dry|seco}}, um c-bet de {{n:cbet.size.small}} do {{t:pot|pote}} com uma mão sem chances compensa com mais frequência do que um c-bet de {{n:cbet.size.big}} do {{t:pot|pote}}?"
    options:
      - { text: "Porque a {{t:bet|aposta}} pequena precisa de desistência só em {{n:alpha.cbet.small}} das vezes, e a grande em {{n:alpha.cbet.big}}", correct: true, why: "Isso: em um flop {{t:dry|seco}}, as mãos mais fracas do rival (sem {{t:pair|par}} e sem {{t:draw|projeto}}) {{t:fold|desistem}} diante dos dois tamanhos, então a {{t:bet|aposta}} pequena alcança o mesmo efeito gastando menos." }
      - { text: "Porque a {{t:bet|aposta}} pequena sempre recebe {{t:fold|desistência}}", why: "Não: o rival {{t:call|paga}} uma {{t:bet|aposta}} pequena com qualquer {{t:pair|par}}. A {{t:bet|aposta}} pequena simplesmente arrisca menos, então precisa de menos {{t:fold|desistências}}." }
      - { text: "Porque a {{t:bet|aposta}} grande é sempre um erro", why: "Não: em um flop {{t:wet|molhado}} e com {{t:nuts-advantage|vantagem de nuts}}, a {{t:bet|aposta}} grande às vezes é a melhor. Em um flop {{t:dry|seco}}, porém, ela não dá nada em troca do risco maior." }
---
O c-bet ({{t:bet|aposta}} de continuação) é uma {{t:bet|aposta}} no flop feita pelo jogador que fez o último {{t:raise|aumento}} antes do flop. Nesta lição, você joga {{t:in-position|em posição}}: você {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e {{t:check|dá check}} no flop. O {{t:pot|pote}} no flop é {{n:bb.pot-after.vs-btn}}. São duas perguntas: com que frequência apostar e quanto.

## Flop {{t:dry|seco}} e alto: com frequência e pouco

Em um flop como [[Ks 7d 2c]], você tem {{t:range-advantage|vantagem de range}}, e o rival quase não tem {{t:draw|projetos}}. Você aposta com frequência e pouco, cerca de {{n:cbet.size.small}} do {{t:pot|pote}}, ou seja, cerca de {{n:cbet.btn.small}}. Uma {{t:bet|aposta}} pequena basta para o rival {{t:fold|desistir}} das mãos que erraram, e {{t:pair|pares}} piores ainda vão {{t:call|pagá-la}}. Uma {{t:bet|aposta}} maior faz {{t:fold|desistir}} mais ou menos as mesmas mãos, mas arrisca mais.

Um c-bet pequeno típico fica em cerca de {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}} do {{t:pot|pote}}, e um grande em cerca de {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}} (materiais de treinamento); os solvers costumam usar {{n:cbet.size.small}} e {{n:cbet.solver.big.low}}–{{n:cbet.size.big}}, e em parte dos flops também {{t:overbet}}, ou seja, uma {{t:bet|aposta}} maior que o {{t:pot|pote}} inteiro (resultados de solvers publicados).

## Flop com muitos {{t:draw|projetos}}: menos vezes, mas mais alto

Em um flop como [[Kh Jh 7c]], o rival tem muitos {{t:flush-draw|projetos de flush}} e de {{t:straight|sequência}}, mas a {{t:straight|sequência}} ainda não é possível. Mãos fortes e {{t:draw|projetos}} fortes apostam um tamanho maior, ex.: {{n:cbet.size.big}} do {{t:pot|pote}}, para que os {{t:draw|projetos}} paguem caro pela próxima carta. Mãos médias sem {{t:draw|projeto}} {{t:check|dão check}} com mais frequência. Quando a {{t:straight|sequência}} já é possível, ex.: em [[Jh Th 8c]], o rival pode tê-la, então os solvers apostam ali um tamanho menor.

## {{t:paired|Pareado}} e {{t:monotone|monocromático}}

Em um flop {{t:paired|pareado}}, ex.: [[Qd Qs 6h]], você tem {{t:range-advantage|vantagem de range}}, e é difícil ter um {{t:draw|projeto}}, então um rival sem {{t:pair|par}} raramente consegue {{t:call|pagar}}. Você aposta com frequência e pouco: uma {{t:bet|aposta}} grande não compensa, porque qualquer um de vocês pode ter {{t:three-of-a-kind|trinca}}. Em um flop {{t:monotone|monocromático}}, ex.: [[Kh 8h 3h]], qualquer um já pode ter {{t:flush}}, então você aposta com menos frequência que o normal e pouco.

Atenção: “{{t:wet|molhado}}” não significa “aposta grande”. No app, um flop {{t:monotone|monocromático}} é sempre {{t:wet|molhado}}, e mesmo assim o solver aposta nele raramente e com tamanho pequeno (resultados de solvers publicados). O tamanho cresce com a {{t:wetness|umidade}} só até certo ponto: nos flops mais {{t:wet|molhados}}, como [[Qd 8d 7d]], ele volta a cair. O tamanho maior da seção anterior vale para flops com muitos {{t:draw|projetos}} em que a {{t:straight|sequência}} ainda não é possível (no app, geralmente os intermediários).

## Baixo com cartas próximas: você {{t:check|dá check}} com mais frequência

Em [[7s 6h 5d]], o {{t:big-blind}} tem no {{t:range|range}} {{t:straight|sequências}} e {{t:two-pair|dois pares}}, e você não tem {{t:nuts-advantage|vantagem de nuts}} (lição sobre vantagens). O mesmo vale para outros flops baixos {{t:connected|conectados}} e {{t:semi-connected|semiconectados}}. Você faz c-bet com menos frequência que em flops altos: muitas mãos {{t:check|dão check}}, e apostam principalmente as mãos muito fortes e os {{t:draw|projetos}} fortes.

## Com que frequência o rival precisa {{t:fold|desistir}}

Uma {{t:bet|aposta}} sem nenhuma mão fica no zero a zero quando o rival {{t:fold|desiste}} em aposta ÷ ({{t:pot|pote}} + aposta) das vezes. Com {{n:cbet.size.small}} do {{t:pot|pote}}, isso dá {{n:alpha.cbet.small}}; com {{n:cbet.size.big}} do {{t:pot|pote}}, já são {{n:alpha.cbet.big}}. Uma mão sem {{t:pair|par}} erra o flop em cerca de {{n:flop.miss.unpaired}} das vezes, por isso o c-bet pequeno compensa com tanta frequência.

:::note De onde vêm estas regras
As direções (flop {{t:dry|seco}}: pouco e com frequência; muitos {{t:draw|projetos}} sem {{t:straight|sequência}} pronta: mais e com menos frequência; {{t:straight|sequência}} já possível: menos; {{t:paired|pareado}}: pouco; {{t:monotone|monocromático}}: com menos frequência e pouco) são regras gerais de materiais de treinamento e de resultados de solvers publicados, marcadas como heurísticas. Os tamanhos {{n:cbet.size.small}} e {{n:cbet.size.big}} do {{t:pot|pote}} são exemplos das faixas indicadas acima (materiais de treinamento sobre tamanhos de aposta; resultados de solvers publicados). O app não informa com que frequência apostar em porcentagem, porque esses números vêm de resultados de solvers.
:::
