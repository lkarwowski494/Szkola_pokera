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
    prompt: "{{t:open|Abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e no flop {{t:check|passa}}. Que plano se adequa a este flop?"
    position: BTN
    options:
      check: "{{t:check|Passo}} mais vezes, c-bet menos vezes do que o habitual"
      small: "C-bet frequente e pequeno: {{n:cbet.size.small}} do {{t:pot|pote}} ({{n:cbet.btn.small}})"
      big: "C-bet frequente e grande: {{n:cbet.size.big}} do {{t:pot|pote}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected] }
        best: small
        rule: R-M5-007
        why:
          check: "Demasiado cauteloso: num flop {{t:dry|seco}} e alto tem a {{t:range-advantage|vantagem de range}}, e o adversário normalmente falhou. Ao {{t:check|passar}}, dá-lhe uma carta grátis."
          small: "Sim: um flop {{t:dry|seco}} e alto favorece-o. Uma {{t:bet|aposta}} pequena chega para que o adversário {{t:fold|desista}} com mãos fracas, e {{t:pair|pares}} piores continuarão a {{t:call|pagá-la}}."
          big: "Boa ação, tamanho errado: num flop {{t:dry|seco}} o adversário tem poucos {{t:draw|draws}}, e as mãos que falharam também {{t:fold|desistem}} perante uma {{t:bet|aposta}} pequena. Uma {{t:bet|aposta}} maior faz {{t:fold|desistir}} mais ou menos as mesmas mãos, mas arrisca mais. Aposte cerca de {{n:cbet.size.small}} do {{t:pot|pote}}."
      - when: { height: [high, middle], suits: [rainbow, two-tone], ranks: [paired], trips: false }
        best: small
        rule: R-M5-009
        why:
          check: "Demasiado cauteloso: tem a {{t:range-advantage|vantagem de range}}, e num flop {{t:paired|emparelhado}} é difícil ter um {{t:draw}}, por isso um adversário sem {{t:pair|par}} raramente consegue pagar sequer uma {{t:bet|aposta}} pequena."
          small: "Sim: num flop {{t:paired|emparelhado}} aposta com frequência e pouco. Um adversário sem {{t:pair|par}} raramente tem com que {{t:call|pagar}}, e ambos os jogadores podem ter {{t:three-of-a-kind|trio}}, por isso não há razão para arriscar mais."
          big: "Boa ação, tamanho errado: num flop {{t:paired|emparelhado}} qualquer um dos dois pode ter {{t:three-of-a-kind|trio}}, por isso uma {{t:bet|aposta}} grande não compensa, e as mãos fracas do adversário também {{t:fold|desistem}} perante uma pequena. Chega cerca de {{n:cbet.size.small}} do {{t:pot|pote}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Sim: um flop baixo com cartas próximas favorece o {{t:big-blind}}, que aqui tem mais vezes {{t:two-pair|dois pares}} ou uma {{t:straight|sequência}}. Faz c-bet menos vezes do que em flops altos: muitas mãos {{t:check|passam}}, e apostam sobretudo as mãos fortes e os {{t:draw|draws}} fortes."
          small: "Demasiadas vezes: num flop baixo com cartas próximas, é o {{t:big-blind}} quem tem a {{t:nuts-advantage|vantagem de nuts}}. C-bets frequentes, mesmo pequenos, dão-lhe a oportunidade de {{t:raise|aumentar}} depois de {{t:check|passar}} primeiro (check-raise) com as mãos mais fortes."
          big: "Demasiadas vezes e demasiado caro: o {{t:big-blind}} acertou aqui mais vezes {{t:two-pair|dois pares}} ou uma {{t:straight|sequência}}. Um c-bet grande e frequente arrisca muito quando, na maioria das vezes, tem apenas cartas altas."
    count: 6
  - kind: choice
    id: m5.l3.q-kj
    family: m5.cbet.size
    rules: [R-M5-007]
    prompt: "{{t:open|Abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e {{t:check|passa}}. Tem um {{t:pair|par}} de reis com valete. O que faz?"
    table: { hand: "Kh Jc", position: BTN, board: "Ks 7d 2c" }
    options:
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} do {{t:pot|pote}})", correct: true, why: "Sim: {{t:top-pair|top pair}} ({{t:pair|par}} com a carta mais alta da {{t:board|mesa}}) num flop {{t:dry|seco}}. Uma {{t:bet|aposta}} pequena é {{t:call|paga}} por setes, duques e reis mais fracos, e o adversário quase não tem {{t:draw|draws}}." }
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} do {{t:pot|pote}})", sizeError: true, why: "Boa ação, tamanho errado: num flop {{t:dry|seco}} o adversário não tem {{t:draw|draws}}, e as mãos que falharam também {{t:fold|desistem}} perante uma {{t:bet|aposta}} pequena. Uma {{t:bet|aposta}} maior faz {{t:fold|desistir}} mais ou menos as mesmas mãos, mas arrisca mais. Aposte cerca de {{n:cbet.size.small}} do {{t:pot|pote}}." }
      - { text: "{{t:check|Passo}}", why: "Perde valor: o adversário tem muitos {{t:pair|pares}} mais fracos e mãos com ás que pagariam uma {{t:bet|aposta}} pequena. Num flop {{t:dry|seco}}, com {{t:top-pair|top pair}}, aposta." }
  - kind: choice
    id: m5.l3.q-set-wet
    family: m5.cbet.size
    rules: [R-M5-008]
    prompt: "{{t:open|Abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e {{t:check|passa}}. Tem um set de valetes num flop com muitos {{t:draw|draws}}. O que faz?"
    table: { hand: "Jc Js", position: BTN, board: "Kh Jh 7c" }
    options:
      - { text: "C-bet {{n:cbet.btn.big}} ({{n:cbet.size.big}} do {{t:pot|pote}})", correct: true, why: "Sim: o adversário tem muitos {{t:flush-draw|flush draws}} e de {{t:straight|sequência}} (p. ex. QT, AQ, duas copas). Uma {{t:bet|aposta}} grande obriga-os a pagar caro pela carta seguinte." }
      - { text: "C-bet {{n:cbet.btn.small}} ({{n:cbet.size.small}} do {{t:pot|pote}})", sizeError: true, why: "Boa ação, tamanho errado: uma {{t:bet|aposta}} pequena dá aos {{t:draw|draws}} do adversário uma carta barata, e o seu set pode perder para um flush ou uma {{t:straight|sequência}}. Com muitos {{t:draw|draws}}, aposte alto." }
      - { text: "{{t:check|Passo}} para não assustar o adversário", why: "Com muitos {{t:draw|draws}}, uma carta grátis é um presente para eles. Com uma mão muito forte, constrói o {{t:pot|pote}} de imediato." }
  - kind: choice
    id: m5.l3.q-paired
    family: m5.cbet.texture
    rules: [R-M5-009]
    prompt: "{{t:open|Abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e {{t:check|passa}}. O flop é {{t:paired|emparelhado}}. Que plano é o correto aqui?"
    table: { position: BTN, board: "Qd Qs 6h" }
    options:
      - { text: "C-bet frequente e pequeno", correct: true, why: "Sim: tem a {{t:range-advantage|vantagem de range}}, e num flop {{t:paired|emparelhado}} é difícil ter um {{t:draw}}, por isso um adversário sem {{t:pair|par}} raramente consegue pagar sequer uma {{t:bet|aposta}} pequena. Tem também mais {{t:pair|pares}} altos, p. ex. AA e KK, que o {{t:big-blind}} normalmente não tem depois de apenas {{t:call|pagar}}." }
      - { text: "C-bet frequente e grande", sizeError: true, why: "Boa ação, tamanho errado: qualquer um dos dois pode ter {{t:three-of-a-kind|trio}}, por isso uma {{t:bet|aposta}} grande não compensa, e um adversário sem {{t:pair|par}} também {{t:fold|desiste}} perante uma pequena. Aposte com frequência e pouco." }
      - { text: "{{t:check|Passo}} mais vezes do que aposto", why: "Demasiado cauteloso: um flop {{t:paired|emparelhado}} e alto favorece-o, e o adversário normalmente não tem aqui nada." }
  - kind: choice
    id: m5.l3.q-mono
    family: m5.cbet.texture
    rules: [R-M5-010]
    prompt: "{{t:open|Abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e {{t:check|passa}}. O flop é {{t:monotone|monocromático}}. Que plano é o correto aqui?"
    table: { position: BTN, board: "Kh 8h 3h" }
    options:
      - { text: "C-bet menos vezes do que o habitual e pequeno", correct: true, why: "Sim: qualquer um dos jogadores pode já ter {{t:flush}}, por isso a sua {{t:nuts-advantage|vantagem de nuts}} é menor do que num flop alto normal. Aposta menos vezes e com um tamanho pequeno, para não construir um {{t:pot|pote}} grande contra um flush." }
      - { text: "C-bet frequente e grande, para que os {{t:draw|draws}} paguem", why: "Num flop {{t:monotone|monocromático}}, um {{t:pot|pote}} grande é perigoso: o adversário pode ter um {{t:flush}} já feito, e as suas mãos sem copas defendem-se mal." }
      - { text: "{{t:check|Passo}} sempre", why: "Demasiado cauteloso: um flop alto continua a favorecê-lo, e parte das mãos (p. ex. com uma copa alta) aposta de bom grado com um tamanho pequeno." }
  - kind: numeric
    id: m5.l3.n-alpha-small
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "No {{t:pot|pote}} há {{n:ex.pot}}. Aposta {{n:cbet.ex.small}} sem qualquer mão. Em que percentagem dos casos tem o adversário de {{t:fold|desistir}} para que esta {{t:bet|aposta}} não dê lucro nem prejuízo? Introduza um número."
    answer: alpha.cbet.small
    explanation: "Arrisca {{n:cbet.ex.small}} para ganhar {{n:ex.pot}}. O limiar é aposta ÷ ({{t:pot|pote}} + aposta): {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. O adversário falha o flop muito mais vezes, por isso um c-bet pequeno compensa com tanta frequência."
  - kind: numeric
    id: m5.l3.n-alpha-big
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "No {{t:pot|pote}} há {{n:ex.pot}}. Aposta {{n:cbet.ex.big}} sem qualquer mão. Em que percentagem dos casos tem o adversário de {{t:fold|desistir}} para que esta {{t:bet|aposta}} não dê lucro nem prejuízo? Introduza um número."
    answer: alpha.cbet.big
    explanation: "Arrisca {{n:cbet.ex.big}} para ganhar {{n:ex.pot}}: {{n:cbet.ex.big}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.big}}) = {{n:alpha.cbet.big}}. Um {{t:bluff}} grande tem de funcionar muito mais vezes do que um pequeno ({{n:alpha.cbet.small}})."
  - kind: choice
    id: m5.l3.q-alpha
    family: m5.math.alpha
    rules: [R-M5-011]
    prompt: "Porque é que, num flop {{t:dry|seco}}, um c-bet de {{n:cbet.size.small}} do {{t:pot|pote}} com uma mão sem hipóteses compensa mais vezes do que um c-bet de {{n:cbet.size.big}} do {{t:pot|pote}}?"
    options:
      - { text: "Porque uma {{t:bet|aposta}} pequena só precisa de desistência em {{n:alpha.cbet.small}} dos casos, e uma grande em {{n:alpha.cbet.big}}", correct: true, why: "Sim: num flop {{t:dry|seco}} as mãos mais fracas do adversário (sem {{t:pair|par}} e sem {{t:draw}}) {{t:fold|desistem}} perante ambos os tamanhos, por isso uma {{t:bet|aposta}} pequena consegue o mesmo efeito de forma mais barata." }
      - { text: "Porque uma {{t:bet|aposta}} pequena leva sempre o adversário a {{t:fold|desistir}}", why: "Não: o adversário {{t:call|paga}} uma {{t:bet|aposta}} pequena com qualquer {{t:pair|par}}. Uma {{t:bet|aposta}} pequena simplesmente arrisca menos, por isso precisa de menos {{t:fold|desistências}}." }
      - { text: "Porque uma {{t:bet|aposta}} grande é sempre um erro", why: "Não: num flop {{t:wet|molhado}} e com {{t:nuts-advantage|vantagem de nuts}}, uma {{t:bet|aposta}} grande é por vezes a melhor. No entanto, num flop {{t:dry|seco}}, não dá nada em troca do risco maior." }
---
O c-bet ({{t:bet|aposta}} de continuação) é uma {{t:bet|aposta}} no flop do jogador que fez o último {{t:raise|aumento}} antes do flop. Nesta lição joga {{t:in-position|em posição}}: {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e no flop {{t:check|passa}}. O {{t:pot|pote}} no flop é de {{n:bb.pot-after.vs-btn}}. Há duas perguntas: com que frequência apostar e quanto.

## Flop {{t:dry|seco}} e alto: com frequência e pouco

Num flop como [[Ks 7d 2c]] tem a {{t:range-advantage|vantagem de range}}, e o adversário quase não tem {{t:draw|draws}}. Aposta com frequência e pouco, cerca de {{n:cbet.size.small}} do {{t:pot|pote}}, ou seja, cerca de {{n:cbet.btn.small}}. Uma {{t:bet|aposta}} pequena chega para que o adversário {{t:fold|desista}} com as mãos que falharam, e {{t:pair|pares}} piores continuarão a {{t:call|pagá-la}}. Uma {{t:bet|aposta}} maior faz {{t:fold|desistir}} mais ou menos as mesmas mãos, mas arrisca mais.

Um c-bet pequeno típico é de cerca de {{n:cbet.range.small.low}}–{{n:cbet.range.small.high}} do {{t:pot|pote}}, e um grande de cerca de {{n:cbet.range.big.low}}–{{n:cbet.range.big.high}} (materiais de formação); os solvers usam normalmente {{n:cbet.size.small}} e {{n:cbet.solver.big.low}}–{{n:cbet.size.big}}, e em alguns flops também o {{t:overbet}}, ou seja, uma {{t:bet|aposta}} maior do que o {{t:pot|pote}} inteiro (resultados publicados de solvers).

## Flop com muitos {{t:draw|draws}}: menos vezes, mas mais alto

Num flop como [[Kh Jh 7c]] o adversário tem muitos {{t:flush-draw|flush draws}} e de {{t:straight|sequência}}, mas a {{t:straight|sequência}} ainda não é possível. As mãos fortes e os {{t:draw|draws}} fortes apostam com um tamanho maior, p. ex. {{n:cbet.size.big}} do {{t:pot|pote}}, para que os {{t:draw|draws}} paguem caro pela carta seguinte. As mãos médias sem {{t:draw}} {{t:check|passam}} mais vezes. Quando a {{t:straight|sequência}} já é possível, p. ex. em [[Jh Th 8c]], o adversário pode tê-la, por isso os solvers apostam aí com um tamanho menor.

## {{t:paired|Emparelhado}} e {{t:monotone|monocromático}}

Num flop {{t:paired|emparelhado}}, p. ex. [[Qd Qs 6h]], tem a {{t:range-advantage|vantagem de range}}, e é difícil ter um {{t:draw}}, por isso um adversário sem {{t:pair|par}} raramente consegue {{t:call|pagar}}. Aposta com frequência e pouco: uma {{t:bet|aposta}} grande não compensa, porque qualquer um dos dois pode ter {{t:three-of-a-kind|trio}}. Num flop {{t:monotone|monocromático}}, p. ex. [[Kh 8h 3h]], qualquer um pode já ter {{t:flush}}, por isso aposta menos vezes do que o habitual e pouco.

Atenção: «{{t:wet|molhado}}» não significa «aposta grande». Na aplicação, um flop {{t:monotone|monocromático}} é sempre {{t:wet|molhado}}, e mesmo assim o solver aposta nele raramente e com um tamanho pequeno (resultados publicados de solvers). O tamanho aumenta com a {{t:wetness|humidade}} apenas até certo nível: nos flops mais {{t:wet|molhados}}, como [[Qd 8d 7d]], volta a descer. O tamanho maior da secção anterior aplica-se a flops com muitos {{t:draw|draws}} em que a {{t:straight|sequência}} ainda não é possível (na aplicação, normalmente intermédios).

## Baixo com cartas próximas: {{t:check|passa}} mais vezes

Em [[7s 6h 5d]] é o {{t:big-blind}} quem tem mais vezes {{t:two-pair|dois pares}} ou uma {{t:straight|sequência}} (lição sobre vantagens). O mesmo acontece noutros flops baixos {{t:connected|conectados}} e {{t:semi-connected|semiconectados}}. Faz c-bet menos vezes do que em flops altos: muitas mãos {{t:check|passam}}, e apostam sobretudo as mãos muito fortes e os {{t:draw|draws}} fortes.

## Com que frequência o adversário tem de {{t:fold|desistir}}

Uma {{t:bet|aposta}} sem qualquer mão não dá lucro nem prejuízo quando o adversário {{t:fold|desiste}} em aposta ÷ ({{t:pot|pote}} + aposta) dos casos. Com {{n:cbet.size.small}} do {{t:pot|pote}}, isso é {{n:alpha.cbet.small}}; com {{n:cbet.size.big}} do {{t:pot|pote}}, já é {{n:alpha.cbet.big}}. Uma mão sem {{t:pair|par}} falha o flop em cerca de {{n:flop.miss.unpaired}} dos casos, por isso um c-bet pequeno compensa com tanta frequência.

:::note De onde vêm estas regras
As direções (flop {{t:dry|seco}}: pouco e com frequência; muitos {{t:draw|draws}} sem {{t:straight|sequência}} feita: mais e menos vezes; {{t:straight|sequência}} já possível: menos; {{t:paired|emparelhado}}: pouco; {{t:monotone|monocromático}}: menos vezes e pouco) são regras gerais de materiais de formação e de resultados publicados de solvers, assinaladas como heurísticas. Os tamanhos {{n:cbet.size.small}} e {{n:cbet.size.big}} do {{t:pot|pote}} são exemplos dos intervalos indicados acima (materiais de formação sobre tamanhos de aposta; resultados publicados de solvers). A aplicação não indica em percentagens com que frequência apostar, porque esses números vêm de resultados de solvers.
:::
