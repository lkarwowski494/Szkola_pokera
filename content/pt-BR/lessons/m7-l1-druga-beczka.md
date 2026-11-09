---
id: m7.l1
module: m7
order: 1
title: "Segundo barril"
sub: "Quando apostar de novo no turn"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Você {{t:open|abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}. No flop [[Jd 7c 3s]], você {{t:bet|apostou}} um c-bet e ele {{t:call|pagou}}. Qual carta do turn mais ajuda o seu {{t:second-barrel}}?"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "Sim: o ás acerta muitas mãos do seu {{t:range}} de {{t:open|abertura}} (AK, AQ, AJ), e o {{t:big-blind}} {{t:call|pagou}} o flop principalmente com {{t:pair|pares}} e {{t:draw|projetos}}. Cada {{t:pair|par}} dele desce uma posição." }
      - { text: "[[8h]]", why: "Não: o oito se conecta com o flop. Dá {{t:straight|sequência}} para T9 e {{t:two-pair|dois pares}} para 87, mãos que o {{t:big-blind}} defende muito. É mais uma carta dele." }
      - { text: "[[3h]]", why: "Não é a pior, mas muda pouco: raramente melhora o seu {{t:range}}, e o rival com {{t:pair|par}} continua com {{t:pair|par}}. O ás dá muito mais ao seu {{t:second-barrel}}." }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Por que um ás no turn, depois do flop [[Jd 7c 3s]], funciona bem para o {{t:second-barrel}} de quem {{t:open|abriu}} do Button?"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Acerta seus AK e AQ, e o {{t:pair|par}} do rival passa a ser o segundo ou o terceiro {{t:pair|par}}", correct: true, why: "Sim: uma carta alta acerta com mais frequência o {{t:range}} de quem {{t:open|abre}}, e o rival que {{t:call|pagou}} o flop com {{t:pair|par}} de valetes ou de setes agora tem uma mão mais fraca em relação ao {{t:board}}." }
      - { text: "Porque contra um ás o rival sempre {{t:fold|desiste}}", why: "Nem sempre: o rival com ás ou com set vai pagar. O ás aumenta a chance de {{t:fold|desistência}}, mas não garante nada." }
      - { text: "Porque o ás completa os {{t:draw|projetos}} do rival", why: "Não: neste {{t:board}}, o ás não completa nenhum {{t:flush}} nem nenhuma {{t:straight|sequência}} que o rival poderia ter. Ajuda porque combina com o seu {{t:range}}." }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "Você {{t:open|abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}. No flop, você {{t:bet|apostou}} um c-bet e ele {{t:call|pagou}}. O turn é um sete. O {{t:pot|pote}} tem {{n:ex.pot}} e o rival {{t:check|passa}}. O que você faz?"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "Um sete num {{t:board}} com nove e seis dá {{t:straight|sequência}} a T8 e 85 e {{t:two-pair|dois pares}} a 76 e 97, mãos que o {{t:big-blind}} defende. Você não tem {{t:pair|par}} nem {{t:draw|projeto}}. Você abre mão do {{t:bluff|blefe}} e leva uma carta grátis." }
      - { text: "Aposto {{n:ex.bet.three-quarters}}", why: "Essa carta combina com o {{t:range}} do rival, não com o seu, e você não tem outs para uma mão forte. Faça o {{t:second-barrel}} de {{t:bluff|blefe}} em cartas que ajudam você e com mãos que podem melhorar." }
      - { text: "Aposto {{n:ex.bet.pot}}", why: "Um {{t:bluff|blefe}} grande numa carta que favorece o rival arrisca muito: ele teria de {{t:fold|desistir}} em mais de {{n:alpha.bet-pot}} das vezes, e depois de {{t:call|pagar}} o flop ele tem muitos {{t:pair|pares}} e {{t:draw|projetos}}." }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "Você {{t:open|abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}} o c-bet no flop. O turn é um ás. O {{t:pot|pote}} tem {{n:ex.pot}} e o rival {{t:check|passa}}. O que você faz?"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Aposto {{n:ex.bet.three-quarters}}", correct: true, why: "Bom {{t:second-barrel}}: o ás combina com o seu {{t:range}}, e você tem gutshot para {{t:straight|sequência}} (o dez). Quando o rival {{t:fold|desiste}} de um {{t:pair|par}}, você ganha na hora; quando ele {{t:call|paga}}, você ainda pode acertar." }
      - { text: "Aposto {{n:ex.bet.quarter}}", sizeError: true, why: "Ação certa, tamanho errado: uma aposta tão barata o rival {{t:call|paga}} com qualquer {{t:pair|par}}, e este {{t:bluff|blefe}} lucra principalmente com {{t:fold|desistências}}. Numa carta que ajuda você, aposte alto, como com mãos fortes." }
      - { text: "{{t:check|Passo}}", correct: true, why: "Também está certo: você tem outs e verá o river de graça, então {{t:check|passar}} não é erro. Num exemplo publicado de solver, o gutshot para a {{t:straight|sequência}} mais alta {{t:check|passou}} no turn. As duas jogadas estão corretas." }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "Você {{t:open|abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}} o c-bet no flop. O turn é um dois. O {{t:pot|pote}} tem {{n:ex.pot}} e o rival {{t:check|passa}}. O que você faz?"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "Você não tem {{t:pair|par}} nem {{t:draw|projeto}}: três copas não bastam com só uma carta por vir, e para a {{t:straight|sequência}} faltam duas cartas. O dois não muda nada, e o rival {{t:call|pagou}} o flop num {{t:board}} com rei, então muitas vezes tem {{t:pair|par}}. Você abre mão do {{t:bluff|blefe}}." }
      - { text: "Aposto {{n:ex.bet.three-quarters}}", why: "Um {{t:bluff|blefe}} sem outs só ganha quando o rival {{t:fold|desiste}}. Depois de {{t:call|pagar}} o flop, ele tem muitos {{t:pair|pares}} (reis, oitos), que não vão {{t:fold|desistir}} num dois vazio." }
      - { text: "{{t:fold|Desisto}}", why: "O rival {{t:check|passa}}, então você pode {{t:check|passar}} de graça (regra do módulo 1). {{t:fold|Desistir}} entrega o {{t:pot|pote}} sem motivo." }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "Você {{t:bet|aposta}} um {{t:second-barrel}} com {{t:flush-draw|projeto de flush}} e o rival {{t:call|paga}}. Que chances você ainda tem?"
    options:
      - { text: "Cerca de {{n:odds.flush.turn-river}} de acertar o {{t:flush}} no river", correct: true, why: "Sim: esse é o segundo caminho para ganhar. {{n:outs.flush}} outs entre {{n:cards.unseen.turn}} cartas desconhecidas. Por isso o {{t:semi-bluff|semiblefe}} é melhor que um {{t:bluff|blefe}} sem outs." }
      - { text: "Nenhuma, o {{t:bluff|blefe}} não deu certo", why: "Um {{t:bluff|blefe}} sem outs já não tem chance, mas você tem {{t:draw|projeto}}: um {{t:flush}} no river ganha mesmo depois de ele {{t:call|pagar}}." }
      - { text: "Cerca de {{n:odds.flush.flop-river}}", why: "Era o que você tinha no flop, com duas cartas por vir. No turn sobrou uma: {{n:odds.flush.turn-river}}." }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "Você {{t:open|abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}} o c-bet no flop. O turn é um dois. O {{t:pot|pote}} tem {{n:ex.pot}} e o rival {{t:check|passa}}. O que você faz?"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "{{t:pair|Par}} de noves é uma mão média: ganha de {{t:bluff|blefes}}, mas perde para qualquer rei. Diante de uma segunda aposta, o rival vai {{t:fold|desistir}} das mãos piores e pagar com reis. {{t:check|Passando}}, você mantém o {{t:pot|pote}} pequeno e chega ao showdown." }
      - { text: "Aposto {{n:ex.bet.three-quarters}}", why: "O rival já {{t:call|pagou}} o flop num {{t:board}} com rei. Mãos piores (oitos, treses) vão {{t:fold|desistir}} ou pagar uma vez, e as melhores vão pagar sempre. Essa aposta dá lucro para as mãos melhores." }
      - { text: "Aposto para saber onde estou", why: "Apostar “por informação” é um erro comum: você paga por ela, porque as mãos melhores não vão deixar você escapar mesmo assim, e as piores vão fugir. Você aposta por {{t:value|valor}} ou como {{t:bluff|blefe}}." }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "Você {{t:open|abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}} o c-bet no flop. O turn é um dois. O {{t:pot|pote}} tem {{n:ex.pot}} e o rival {{t:check|passa}}. O que você faz?"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Aposto por {{t:value|valor}}", correct: true, why: "{{t:top-pair|Top pair}} com o melhor kicker é uma mão forte. O rival {{t:call|pagou}} o flop, então muitas vezes tem um rei mais fraco ou oitos, que vão pagar mais uma vez." }
      - { text: "{{t:check|Passo}}, porque o rival não tem nada mesmo", why: "O rival {{t:call|pagou}} o flop, então muitas vezes tem {{t:pair|par}}. {{t:check|Passando}}, você perde uma {{t:bet|aposta}} que uma mão pior pagaria." }
      - { text: "Aposto all-in", why: "{{t:pair|Pares}} piores raramente vão pagar o stack inteiro. Escolha um tamanho que receba pagamento de reis mais fracos e de oitos." }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "Com quais mãos você {{t:bet|aposta}} um {{t:second-barrel}} no turn com mais frequência?"
    options:
      - { text: "Mãos fortes e {{t:draw|projetos}}; mãos médias {{t:check|passam}}", correct: true, why: "Sim: mãos fortes querem receber pagamento, {{t:draw|projetos}} ganham de duas formas, e mãos médias não ganham nada com mais uma {{t:bet|aposta}}." }
      - { text: "Todas, para não perder a {{t:initiative|iniciativa}}", why: "A {{t:initiative|iniciativa}} sozinha não ganha. O rival {{t:call|pagou}} o flop, então tem um {{t:range}} mais forte, e mãos sem outs e {{t:pair|pares}} médios perdem ao apostar sem parar." }
      - { text: "Só as mãos mais fortes", why: "Aí o rival desistiria toda vez que você apostasse e pagaria só quando estivesse na sua frente. {{t:draw|Projetos}} são {{t:semi-bluff|semiblefes}} naturais." }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "Turn. O {{t:pot|pote}} tem {{n:ex.pot}}, você {{t:bluff|blefa}} com uma mão que quase nunca ganha e {{t:bet|aposta}} {{n:ex.bet.three-quarters}}. Com que frequência o rival precisa {{t:fold|desistir}} para esse {{t:bluff|blefe}} ficar no zero a zero? Digite o número em porcentagem."
    answer: alpha.bet-three-quarters
    explanation: "Alpha = aposta ÷ ({{t:pot|pote}} + aposta) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Com outs, você precisa de menos {{t:fold|desistências}}, porque parte das vezes em que ele {{t:call|paga}} você ainda ganha no river."
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "Por que, depois de {{t:call|pagar}} o c-bet, o {{t:range}} do rival no turn é mais forte que no flop?"
    options:
      - { text: "Porque ele {{t:fold|desistiu}} das mãos mais fracas no flop", correct: true, why: "Sim: contra o c-bet {{t:fold|desistem}} as mãos sem {{t:pair|par}} e sem {{t:draw|projeto}}. Ficam {{t:pair|pares}} e {{t:draw|projetos}}, então o {{t:second-barrel}} enfrenta um {{t:range}} mais forte que o primeiro." }
      - { text: "Porque o turn sempre o ajuda", why: "Não: o turn é aleatório e às vezes ajuda você (por exemplo, um ás). O que fortalece o {{t:range}} do rival é a própria decisão dele no flop." }
      - { text: "Não é, ele tem o mesmo {{t:range}} de antes do flop", why: "Cada decisão filtra parte das mãos. Quem {{t:call|pagou}} uma {{t:bet|aposta}} geralmente acertou algo ou tem {{t:draw|projeto}}." }
---
O {{t:second-barrel|second barrel}} é a segunda {{t:bet|aposta}} do jogador que {{t:raise|aumentou}} antes do flop: c-bet no flop, o rival {{t:call|paga}} e depois vem a aposta no turn. No turn, você não pergunta só “tenho mão?”, mas também “essa carta ajuda a mim ou ao rival?”.

## O rival {{t:call|pagou}}, então está mais forte

Contra o c-bet, o rival {{t:fold|desiste}} das mãos sem {{t:pair|par}} e sem {{t:draw|projeto}}. Quem {{t:call|pagou}} geralmente tem {{t:pair|par}} ou {{t:draw|projeto}}, às vezes cartas altas com backdoor (como na defesa do M6). Por isso o {{t:second-barrel}} enfrenta um {{t:range}} mais forte que o primeiro, e você não aposta de novo com tudo.

## Qual carta ajuda

- **Carta alta num {{t:board}} mais baixo** (ás, rei) geralmente ajuda quem {{t:open|abriu}}: acerta os AK, AQ e KQ dele, e cada {{t:pair|par}} do rival desce uma posição. Nessas cartas você aposta de novo com mais frequência, inclusive de {{t:bluff|blefe}}.
- **Carta baixa que se conecta com o {{t:board}}**, por exemplo um sete em [[9h 6c 2d]], ajuda o {{t:big-blind}}: dá {{t:straight|sequências}} e {{t:two-pair|dois pares}} às mãos que ele mais defende.
- **Carta vazia**, por exemplo um dois em [[Kd 8c 3s]], muda pouco. Quem decide é a sua mão.

## Com o que apostar de novo

Você aposta com mãos fortes (por {{t:value|valor}}) e com {{t:draw|projetos}} (como {{t:semi-bluff|semiblefe}}). O {{t:semi-bluff|semiblefe}} ganha de duas formas: quando o rival {{t:fold|desiste}} ou quando você acerta no river. Com mãos sem {{t:pair|par}} e sem outs, você abre mão com mais frequência, porque elas só ganham quando o rival desiste, a não ser que bloqueiem as mãos com que o rival pagaria. Quando o rival pode responder com {{t:raise|aumento}}, o solver também {{t:bluff|blefa}} com mãos sem outs.

Um {{t:bluff|blefe}} sem chances fica no zero a zero quando o rival {{t:fold|desiste}} em aposta ÷ ({{t:pot|pote}} + aposta) das vezes (o alpha do M6). Com aposta de 3/4 do {{t:pot|pote}}, isso dá {{n:alpha.bet-three-quarters}}; com meio {{t:pot|pote}}, {{n:alpha.bet-half}}.

## Mãos médias {{t:check|passam}}

{{t:second-pair|Segundo par}} ou {{t:top-pair}} com kicker fraco ganha de {{t:bluff|blefes}}, mas perde para {{t:pair|pares}} melhores. Diante de uma segunda aposta, as mãos piores vão {{t:fold|desistir}} e as melhores vão pagar. Você {{t:check|passa}}, mantém o {{t:pot|pote}} pequeno e chega ao showdown.

:::note De onde vêm estas regras
As direções gerais (cartas altas geralmente favorecem o {{t:second-barrel}}, {{t:bluff|blefes}} com outs em vez de sem outs, mãos médias {{t:check|passam}}) são heurísticas de materiais de treinamento e de análises de solver. Valem para stacks de cerca de {{n:format.stack}}. É uma simplificação: o solver também {{t:bluff|blefa}} com parte das mãos sem outs quando elas bloqueiam o {{t:value|valor}} do rival ou quando o rival pode responder com {{t:raise|aumento}}. O app não informa com que frequência apostar em porcentagens, porque esses números dependem da mão específica nos resultados de solver.
:::
