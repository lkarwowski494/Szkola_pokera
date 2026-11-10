---
id: m7.l1
module: m7
order: 1
title: "Segundo barril"
sub: "Quando apostar pela segunda vez no turn"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "{{t:open|Abriu}} a partir do Button e o {{t:big-blind}} {{t:call|pagou}}. No flop [[Jd 7c 3s]] {{t:bet|apostou}} um c-bet e ele {{t:call|pagou}}. Que carta no turn mais ajuda o seu {{t:second-barrel|second barrel}}?"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "Sim: o ás acerta em muitas mãos do seu {{t:range|range}} de {{t:open|abertura}} (AK, AQ, AJ), e o {{t:big-blind}} {{t:call|pagou}} o flop sobretudo com {{t:pair|pares}} e {{t:draw|draws}}. Cada {{t:pair|par}} dele desce um lugar." }
      - { text: "[[8h]]", why: "Não: o oito liga com o flop. Dá {{t:straight|sequência}} a T9 e {{t:two-pair|dois pares}} a 87, mãos que o {{t:big-blind}} defende muito. É mais uma carta para ele." }
      - { text: "[[3h]]", why: "Não é a pior, mas muda pouco: raramente melhora o seu {{t:range}}, e o adversário com {{t:pair|par}} continua com {{t:pair|par}}. O ás dá muito mais ao seu {{t:second-barrel|second barrel}}." }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Porque é que um ás no turn, depois do flop [[Jd 7c 3s]], favorece o {{t:second-barrel|second barrel}} de quem {{t:open|abre}} a partir do Button?"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Acerta no seu AK e AQ, e o {{t:pair|par}} do adversário passa a ser o segundo ou o terceiro {{t:pair|par}}", correct: true, why: "Sim: uma carta alta acerta mais vezes no {{t:range}} de quem {{t:open|abre}}, e o adversário que {{t:call|pagou}} o flop com um {{t:pair|par}} de valetes ou de setes tem agora uma mão mais fraca em relação à {{t:board|mesa}}." }
      - { text: "Porque perante um ás o adversário {{t:fold|desiste}} sempre", why: "Nem sempre: um adversário com um ás ou com um set paga. O ás aumenta a probabilidade de {{t:fold|desistência}}, mas não garante nada." }
      - { text: "Porque o ás completa os {{t:draw|draws}} do adversário", why: "Não: nesta {{t:board|mesa}} o ás não completa nenhum {{t:flush}} nem nenhuma {{t:straight|sequência}} que o adversário possa ter. Ajuda porque encaixa no seu {{t:range|range}}." }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "{{t:open|Abriu}} a partir do Button e o {{t:big-blind}} {{t:call|pagou}}. No flop {{t:bet|apostou}} um c-bet e ele {{t:call|pagou}}. O turn é um sete. No {{t:pot|pote}} há {{n:ex.pot}} e o adversário {{t:check|passa}}. O que faz?"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "Um sete numa {{t:board|mesa}} com um nove e um seis dá {{t:straight|sequência}} às mãos T8 e 85 e {{t:two-pair|dois pares}} às mãos 76 e 97, mãos que o {{t:big-blind}} defende. Não tem {{t:pair|par}} nem {{t:draw|draw}}. Abdica do {{t:bluff}} e recebe uma carta grátis." }
      - { text: "Aposto {{n:ex.bet.three-quarters}}", why: "Esta carta encaixa no {{t:range|range}} do adversário, não no seu, e não tem outs para uma mão forte. Faça o {{t:second-barrel|second barrel}} como {{t:bluff}} em cartas que o ajudam e com mãos que podem melhorar." }
      - { text: "Aposto {{n:ex.bet.pot}}", why: "Um {{t:bluff}} grande numa carta que favorece o adversário arrisca muito: ele teria de {{t:fold|desistir}} mais do que {{n:alpha.bet-pot}} das vezes, e depois de {{t:call|pagar}} o flop tem muitos {{t:pair|pares}} e {{t:draw|draws}}." }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "{{t:open|Abriu}} a partir do Button e o {{t:big-blind}} {{t:call|pagou}} o c-bet no flop. O turn é um ás. No {{t:pot|pote}} há {{n:ex.pot}} e o adversário {{t:check|passa}}. O que faz?"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Aposto {{n:ex.bet.three-quarters}}", correct: true, why: "Um bom {{t:second-barrel}}: o ás encaixa no seu {{t:range|range}}, e tem um gutshot para {{t:straight|sequência}} (um dez). Se o adversário {{t:fold|desistir}} com um {{t:pair|par}}, ganha logo; se {{t:call|pagar}}, ainda pode acertar." }
      - { text: "Aposto {{n:ex.bet.quarter}}", sizeError: true, why: "Ação certa, tamanho errado: o adversário {{t:call|paga}} uma aposta tão barata com qualquer {{t:pair|par}}, e este {{t:bluff}} ganha sobretudo com {{t:fold|desistências}}. Numa carta que o ajuda, aposte alto, tal como com mãos fortes." }
      - { text: "{{t:check|Passo}}", correct: true, why: "Também está bem: tem outs e vê o river de graça, por isso {{t:check|passar}} não é um erro. Num exemplo publicado de um solver, um gutshot para a {{t:straight|sequência}} máxima {{t:check|passou}} no turn. Ambas as jogadas estão corretas." }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "{{t:open|Abriu}} a partir do Button e o {{t:big-blind}} {{t:call|pagou}} o c-bet no flop. O turn é um dois. No {{t:pot|pote}} há {{n:ex.pot}} e o adversário {{t:check|passa}}. O que faz?"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "Não tem {{t:pair|par}} nem {{t:draw|draw}}: três copas não chegam com uma só carta por sair, e para a {{t:straight|sequência}} faltam duas cartas. O dois não muda nada, e o adversário {{t:call|pagou}} o flop numa {{t:board|mesa}} com um rei, por isso tem muitas vezes {{t:pair|par}}. Abdica do {{t:bluff}}." }
      - { text: "Aposto {{n:ex.bet.three-quarters}}", why: "Um {{t:bluff}} sem outs só ganha se o adversário {{t:fold|desistir}}. Depois de {{t:call|pagar}} o flop, ele tem muitos {{t:pair|pares}} (reis, oitos) com que não vai {{t:fold|desistir}} num dois vazio." }
      - { text: "{{t:fold|Desisto}}", why: "O adversário {{t:check|passa}}, por isso pode {{t:check|passar}} de graça (regra do módulo 1). {{t:fold|Desistir}} entrega o {{t:pot|pote}} sem motivo." }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "{{t:bet|Aposta}} um {{t:second-barrel|second barrel}} com um {{t:flush-draw|flush draw}} e o adversário {{t:call|paga}}. Que hipóteses ainda tem?"
    options:
      - { text: "Cerca de {{n:odds.flush.turn-river}} de completar o {{t:flush}} no river", correct: true, why: "Sim: é a segunda forma de ganhar. {{n:outs.flush}} outs em {{n:cards.unseen.turn}} cartas desconhecidas. Por isso o {{t:semi-bluff}} é melhor do que um {{t:bluff}} sem outs." }
      - { text: "Nenhuma, o {{t:bluff}} falhou", why: "Um {{t:bluff}} sem outs já não tem hipóteses, mas tem um {{t:draw|draw}}: um {{t:flush}} no river ganha apesar de ele ter {{t:call|pago}}." }
      - { text: "Cerca de {{n:odds.flush.flop-river}}", why: "Era o que tinha no flop, com duas cartas por sair. No turn resta uma: {{n:odds.flush.turn-river}}." }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "{{t:open|Abriu}} a partir do Button e o {{t:big-blind}} {{t:call|pagou}} o c-bet no flop. O turn é um dois. No {{t:pot|pote}} há {{n:ex.pot}} e o adversário {{t:check|passa}}. O que faz?"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "Um {{t:pair|par}} de noves é uma mão média: ganha a {{t:bluff|bluffs}}, mas perde contra qualquer rei. Perante uma segunda aposta, o adversário {{t:fold|desiste}} das mãos piores e paga com reis. Ao {{t:check|passar}}, mantém o {{t:pot|pote}} pequeno e chega ao showdown." }
      - { text: "Aposto {{n:ex.bet.three-quarters}}", why: "O adversário já {{t:call|pagou}} o flop numa {{t:board|mesa}} com um rei. As mãos piores (oitos, três) {{t:fold|desistem}} ou pagam uma vez, e as melhores pagam sempre. Esta aposta faz ganhar as mãos melhores." }
      - { text: "Aposto para saber onde estou", why: "Apostar «para obter informação» é um erro comum: paga por ela, porque as mãos melhores não o deixam escapar de qualquer forma e as piores fogem. Aposta por {{t:value|valor}} ou como {{t:bluff}}." }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "{{t:open|Abriu}} a partir do Button e o {{t:big-blind}} {{t:call|pagou}} o c-bet no flop. O turn é um dois. No {{t:pot|pote}} há {{n:ex.pot}} e o adversário {{t:check|passa}}. O que faz?"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Aposto por {{t:value|valor}}", correct: true, why: "{{t:top-pair|Top pair}} com o melhor kicker é uma mão forte. O adversário {{t:call|pagou}} o flop, por isso tem muitas vezes um rei mais fraco ou oitos, que pagam mais uma vez." }
      - { text: "{{t:check|Passo}}, o adversário não tem nada de qualquer forma", why: "O adversário {{t:call|pagou}} o flop, por isso tem muitas vezes {{t:pair|par}}. Ao {{t:check|passar}}, perde uma {{t:bet|aposta}} que uma mão pior pagaria." }
      - { text: "Aposto all-in", why: "Os {{t:pair|pares}} piores raramente pagam um stack inteiro. Escolha um tamanho que seja pago por reis mais fracos e por oitos." }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "Com que mãos {{t:bet|aposta}} mais vezes um {{t:second-barrel|second barrel}} no turn?"
    options:
      - { text: "Com mãos fortes e {{t:draw|draws}}; as mãos médias {{t:check|passam}}", correct: true, why: "Sim: as mãos fortes querem ser pagas, os {{t:draw|draws}} ganham de duas formas, e as mãos médias nada ganham com mais uma {{t:bet|aposta}}." }
      - { text: "Com todas, para não perder a {{t:initiative|iniciativa}}", why: "A {{t:initiative|iniciativa}}, por si só, não ganha. O adversário {{t:call|pagou}} o flop, por isso tem um {{t:range}} mais forte, e as mãos sem outs e os {{t:pair|pares}} médios perdem ao apostar sem parar." }
      - { text: "Só com as mãos mais fortes", why: "Nesse caso, o adversário desistiria sempre que aposta e só pagaria quando o bate. Os {{t:draw|draws}} são {{t:semi-bluff|semi-bluffs}} naturais." }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "Turn. No {{t:pot|pote}} há {{n:ex.pot}}, {{t:bluff|faz bluff}} com uma mão que quase nunca ganha e {{t:bet|aposta}} {{n:ex.bet.three-quarters}}. Com que frequência tem o adversário de {{t:fold|desistir}} para que este {{t:bluff}} fique a zero? Introduza o número em percentagem."
    answer: alpha.bet-three-quarters
    explanation: "Alpha = aposta ÷ ({{t:pot|pote}} + aposta) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Com outs precisa de menos {{t:fold|desistências}}, porque, mesmo quando lhe {{t:call|pagam}}, parte dessas vezes ganha no river."
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "Porque é que, depois de {{t:call|pagar}} o c-bet, o {{t:range}} do adversário no turn é mais forte do que no flop?"
    options:
      - { text: "Porque {{t:fold|desistiu}} das mãos mais fracas no flop", correct: true, why: "Sim: perante um c-bet {{t:fold|desistem}} as mãos sem {{t:pair|par}} e sem {{t:draw|draw}}. Ficam os {{t:pair|pares}} e os {{t:draw|draws}}, por isso o {{t:second-barrel}} enfrenta um {{t:range}} mais forte do que o primeiro." }
      - { text: "Porque o turn o ajuda sempre", why: "Não: o turn é aleatório e às vezes ajuda-o a si (p. ex. um ás). O {{t:range|range}} do adversário é reforçado pela decisão dele no flop." }
      - { text: "Não é, tem o mesmo {{t:range}} que antes do flop", why: "Cada decisão filtra parte das mãos. Quem {{t:call|pagou}} uma {{t:bet|aposta}} normalmente acertou alguma coisa ou tem um {{t:draw|draw}}." }
---
O {{t:second-barrel|second barrel}} é a segunda {{t:bet|aposta}} do jogador que {{t:raise|aumentou}} antes do flop: c-bet no flop, {{t:call|pagamento}} e, depois, uma aposta no turn. No turn não pergunta apenas «tenho mão?», mas também «esta carta ajuda-me a mim ou ao adversário?».

## O adversário {{t:call|pagou}}, por isso é mais forte

Perante um c-bet, o adversário {{t:fold|desiste}} das mãos sem {{t:pair|par}} e sem {{t:draw|draw}}. Quem {{t:call|pagou}} tem normalmente {{t:pair|par}} ou {{t:draw|draw}}, às vezes cartas altas com backdoor (como na defesa do M6). Por isso o {{t:second-barrel}} enfrenta um {{t:range}} mais forte do que o primeiro, e não aposta pela segunda vez com tudo.

## Que carta ajuda

- **Uma carta alta numa {{t:board|mesa}} mais baixa** (ás, rei) costuma ajudar quem {{t:open|abre}}: acerta nos AK, AQ e KQ dele, e cada {{t:pair|par}} do adversário desce um lugar. Nessas cartas aposta pela segunda vez mais vezes, também como {{t:bluff}}.
- **Uma carta baixa que liga com a {{t:board|mesa}}**, p. ex. um sete em [[9h 6c 2d]], ajuda o {{t:big-blind|big blind}}: dá {{t:straight|sequências}} e {{t:two-pair|dois pares}} às mãos que ele mais defende.
- **Uma carta vazia**, p. ex. um dois em [[Kd 8c 3s]], muda pouco. Decide a sua mão.

## Com que mãos apostar pela segunda vez

Aposta com mãos fortes (por {{t:value|valor}}) e com {{t:draw|draws}} (como {{t:semi-bluff}}). O {{t:semi-bluff|semi-bluff}} ganha de duas formas: quando o adversário {{t:fold|desiste}} ou quando acerta no river. Com mãos sem {{t:pair|par}} e sem outs abdica mais vezes, porque só ganham quando o adversário desiste, a não ser que bloqueiem as mãos com que o adversário pagaria. Quando o adversário pode responder com um {{t:raise|aumento}}, o solver também {{t:bluff|faz bluff}} com mãos sem outs.

Um {{t:bluff|bluff}} sem hipóteses fica a zero quando o adversário {{t:fold|desiste}} em aposta ÷ ({{t:pot|pote}} + aposta) das vezes (alpha do M6). Com uma aposta de 3/4 do {{t:pot|pote}} isso dá {{n:alpha.bet-three-quarters}}; com meio {{t:pot|pote}}, {{n:alpha.bet-half}}.

## As mãos médias {{t:check|passam}}

{{t:second-pair|Segundo par}} ou {{t:top-pair|top pair}} com kicker fraco ganha a {{t:bluff|bluffs}}, mas perde contra {{t:pair|pares}} melhores. Perante uma segunda aposta, as mãos piores {{t:fold|desistem}} e as melhores pagam. {{t:check|Passa}}, mantém o {{t:pot|pote}} pequeno e chega ao showdown.

:::note De onde vêm estas regras
As orientações gerais (as cartas altas costumam favorecer o {{t:second-barrel|second barrel}}, {{t:bluff|bluffs}} com outs em vez de sem outs, as mãos médias {{t:check|passam}}) são heurísticas de materiais de formação e de análises de solvers. Aplicam-se a stacks de cerca de {{n:format.stack}}. É uma simplificação: o solver também {{t:bluff|faz bluff}} com parte das mãos sem outs quando bloqueiam o valor do adversário ou quando o adversário pode responder com um {{t:raise|aumento}}. A aplicação não indica com que frequência apostar em percentagem, porque esses números dependem da mão concreta nos resultados dos solvers.
:::
