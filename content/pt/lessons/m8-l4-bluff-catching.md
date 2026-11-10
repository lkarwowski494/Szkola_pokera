---
id: m8.l4
module: m8
order: 4
title: "Apanhar bluffs"
sub: "Com que mãos pagar no river"
rules: [R-M8-010, R-M8-011, R-M8-012, R-M6-001]
drills:
  - kind: choice
    id: m8.l4.q-role
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Defende o {{t:big-blind}}. No river, {{t:check|passa}}, e o Button {{t:bet|aposta}} o {{t:pot|pote}} inteiro. Não saíram espadas. Que papel tem o seu {{t:pair}} de noves?"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Bluff-catcher: só ganha a {{t:bluff|bluffs}}", correct: true, why: "Pelo {{t:pot|pote}} inteiro, o Button aposta {{t:value|por valor}} com pelo menos um rei e faz {{t:bluff|bluff}} sobretudo com {{t:draw|draws}} falhados. O seu {{t:pair}} perde contra todas as mãos {{t:value|de valor}} dele e ganha a todos os {{t:bluff|bluffs}}." }
      - { text: "Mão {{t:value|de valor}}", why: "Uma mão {{t:value|de valor}} ganha às mãos que pagam ou apostam {{t:value|por valor}}. Um {{t:pair|par}} de noves perde contra qualquer rei e qualquer mão melhor do Button." }
      - { text: "Mão sem hipóteses", why: "Um {{t:pair|par}} de noves ganha aos {{t:draw|draws}} falhados, e é com esses que o Button faz {{t:bluff|bluff}}. Tem hipóteses, mas apenas contra {{t:bluff|bluffs}}." }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. No {{t:pot|pote}} há {{n:ex.pot}}, e o adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. Tem um bluff-catcher. Que percentagem mínima das apostas dele tem de ser {{t:bluff|bluffs}} para que {{t:call|pagar}} compense? Introduza um número."
    answer: eq.bet-pot
    explanation: "A sua equity é a proporção de {{t:bluff|bluffs}} nas apostas dele. Acrescenta {{n:ex.bet.pot}} para ganhar o {{t:pot|pote}} depois de {{t:call|pagar}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}. É o mesmo número que a proporção de {{t:bluff|bluffs}} em equilíbrio da lição anterior."
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. O adversário {{t:bet|aposta}} meio {{t:pot|pote}}. Tem um bluff-catcher e estima que os {{t:bluff|bluffs}} sejam cerca de {{n:catch.ex.bluffs-low}} das apostas dele. O que faz?"
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Precisa de {{n:eq.bet-half}} de equity, e o seu bluff-catcher só ganha em {{n:catch.ex.bluffs-low}} dos casos. {{t:call|Pagar}} dá prejuízo." }
      - { text: "{{t:call|Pago}}, porque a {{t:mdf}} é de {{n:mdf.bet-half}}", why: "A {{t:mdf}} protege contra um adversário que faz {{t:bluff|bluff}} com frequência suficiente. Quando há {{t:bluff|bluffs}} a menos, {{t:call|pagar}} com bluff-catchers é oferecer dinheiro." }
      - { text: "{{t:raise|Aumento}}", why: "A sua mão só ganha a {{t:bluff|bluffs}}. Depois de um {{t:raise|aumento}}, os {{t:bluff|bluffs}} {{t:fold|desistem}} e pagam as mãos {{t:value|de valor}}: perde mais." }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. O adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro. Tem um bluff-catcher e estima que os {{t:bluff|bluffs}} sejam cerca de {{n:catch.ex.bluffs-high}} das apostas dele. O que faz?"
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Precisa de {{n:eq.bet-pot}} de equity, e os {{t:bluff|bluffs}} são {{n:catch.ex.bluffs-high}}. O adversário faz {{t:bluff|bluff}} mais do que o equilíbrio, por isso {{t:call|pagar}} dá lucro." }
      - { text: "{{t:fold|Desisto}}, porque a aposta é grande", why: "Uma aposta grande sobe o preço para {{n:eq.bet-pot}}, mas há mais {{t:bluff|bluffs}} do que isso. O que conta é comparar estes dois números, e não apenas o tamanho da aposta." }
      - { text: "{{t:raise|Aumento}} all-in", why: "Com um bluff-catcher não se {{t:raise|aumenta}}: os {{t:bluff|bluffs}} {{t:fold|desistem}} e só pagam mãos melhores do que a sua." }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "O adversário aposta o {{t:pot|pote}} inteiro no river e faz {{t:bluff|bluff}} exatamente em {{n:bluff.share.bet-pot}} dos casos. Quanto ganha ao {{t:call|pagar}} com um bluff-catcher?"
    options:
      - { text: "Nada: {{t:call|pagar}} e {{t:fold|desistir}} dão o mesmo resultado", correct: true, why: "Uma proporção de {{t:bluff|bluffs}} igual a {{n:eq.bet-pot}} é exatamente o preço de {{t:call|pagar}}. Os ganhos contra {{t:bluff|bluffs}} compensam as perdas contra o valor, por isso o adversário não o deixa lucrar nem a {{t:call|pagar}}, nem a {{t:fold|desistir}}." }
      - { text: "Ganho, porque há muitos {{t:bluff|bluffs}}", why: "Há exatamente tantos quanto o preço. Só ganha quando o adversário faz {{t:bluff|bluff}} mais vezes do que {{n:eq.bet-pot}}." }
      - { text: "Perco, porque há mais valor do que {{t:bluff|bluffs}}", why: "Há mais valor, mas, ao {{t:call|pagar}}, arrisca {{n:ex.bet.pot}} para ganhar {{n:ex.pot}} + {{n:ex.bet.pot}}. Com esta proporção de {{t:bluff|bluffs}}, as duas coisas equilibram-se." }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Não saíram espadas. No river, {{t:check|passa}}, e o Button {{t:bet|aposta}} o {{t:pot|pote}} inteiro. Tem {{t:top-pair|top pair}} com um dez. Com qual destas duas mãos é melhor {{t:call|pagar}}?"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "Sem espadas, não bloqueia os {{t:flush-draw|flush draws}} falhados, que são os principais {{t:bluff|bluffs}} do Button (p. ex. dez e valete de espadas). No {{t:range|range}} dele ficam mais {{t:bluff|bluffs}} contra os quais ganha." }
      - { text: "[[Kc Ts]]", why: "O dez de espadas tira ao Button parte dos {{t:draw|draws}} falhados com que faz {{t:bluff|bluff}} (p. ex. valete e dez de espadas). Fica-lhe relativamente mais valor, por isso {{t:call|pagar}} é pior." }
      - { text: "Indiferente", why: "A força no showdown é a mesma, mas a espada na sua mão bloqueia {{t:bluff|bluffs}} do Button. Isso muda aquilo contra que realmente joga." }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "No river saiu a terceira carta de copas. {{t:check|Passa}}, e o Button {{t:bet|aposta}} o {{t:pot|pote}} inteiro. Tem um {{t:pair|par}} de noves. Com qual destas duas mãos é melhor {{t:call|pagar}}?"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "O ás de copas bloqueia o {{t:flush|flush}} com ás, uma das mãos {{t:value|de valor}} mais fortes do Button. Quando bloqueia o valor dele, ficam mais {{t:bluff|bluffs}} entre as apostas dele." }
      - { text: "[[Ad 9c]]", why: "O mesmo {{t:pair}}, mas não bloqueia nenhum {{t:flush|flush}}. O Button tem todos os seus flushes, contra as quais perde." }
      - { text: "Indiferente", why: "No showdown, as duas mãos são igualmente fortes, mas o ás de copas tira ao Button parte das mãos {{t:value|de valor}}." }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "Não saíram espadas. No river, {{t:check|passa}}, e o Button {{t:bet|aposta}} meio {{t:pot|pote}}. O que faz?"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Tem apenas o sete como carta mais alta. Perde até contra a maioria dos {{t:bluff|bluffs}} do Button (dama com espadas, valete com espadas), por isso isto não é um bluff-catcher. Defende com outras mãos." }
      - { text: "{{t:call|Pago}}, porque o preço é bom", why: "O preço ({{n:eq.bet-half}}) não ajuda uma mão que perde contra quase tudo, até contra {{t:bluff|bluffs}}." }
      - { text: "{{t:raise|Aumento}} como {{t:bluff}}", why: "{{t:raise|Aumentar}} em {{t:bluff}} no river é uma jogada avançada e arriscada. Mais simples e melhor é desistir de uma mão sem hipóteses." }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "River. O adversário {{t:bet|aposta}} meio {{t:pot|pote}}. A {{t:mdf}} é de {{n:mdf.bet-half}}. Que mãos defende em primeiro lugar?"
    options:
      - { text: "Os melhores bluff-catchers: ganham a {{t:bluff|bluffs}} e têm bons {{t:blocker|bloqueadores}}", correct: true, why: "Defende as mãos que ganham a {{t:bluff|bluffs}} e, entre mãos de força semelhante, escolhe as que bloqueiam o valor do adversário e não bloqueiam os {{t:bluff|bluffs}} dele. {{t:fold|Desiste}} das mãos que perdem até contra {{t:bluff|bluffs}}." }
      - { text: "{{n:mdf.bet-half}} aleatórios do {{t:range|range}}", why: "A {{t:mdf}} diz quanto defender, e não com quê. Uma defesa aleatória paga com mãos que nunca vão ganhar." }
      - { text: "Só mãos {{t:value|de valor}}", why: "Assim defende pouco demais, e o adversário ganha dinheiro a fazer {{t:bluff|bluff}} com quaisquer cartas. Para chegar à {{t:mdf}}, acrescenta os melhores bluff-catchers." }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Porque é que, com um bluff-catcher no river, {{t:call|paga}} em vez de {{t:raise|aumentar}}?"
    options:
      - { text: "Porque, depois de um {{t:raise|aumento}}, os {{t:bluff|bluffs}} {{t:fold|desistem}} e só pagam mãos melhores", correct: true, why: "A sua mão só ganha a {{t:bluff|bluffs}}. O {{t:raise|aumento}} expulsa precisamente essas mãos e deixa as que o vencem." }
      - { text: "Porque não é permitido {{t:raise|aumentar}} no river", why: "É permitido. Simplesmente, {{t:raise|aumentar}} com um bluff-catcher transforma-o num {{t:bluff}} contra mãos que não vão {{t:fold|desistir}}." }
      - { text: "Porque {{t:call|pagar}} é sempre mais barato", why: "Não se trata do custo, mas de quem fica no jogo. Depois de um {{t:raise|aumento}}, ficam as mãos que o vencem." }
---
Agora está do outro lado: é o adversário que aposta no river, e tem uma mão média. Na maioria das vezes será um **bluff-catcher**, ou seja, uma mão que perde contra todas as mãos {{t:value|de valor}} do adversário, mas ganha aos {{t:bluff|bluffs}} dele.

## A sua equity são os {{t:bluff|bluffs}} dele

Um bluff-catcher ganha exatamente quando o adversário faz {{t:bluff|bluff}}. A sua equity é, portanto, a proporção de {{t:bluff|bluffs}} nas apostas do adversário. {{t:call|Paga}} quando essa proporção é maior do que a equity necessária do M2:

| Aposta do adversário | Equity necessária ({{t:bluff|bluffs}} pelo menos) |
|---|---|
| 1/3 do {{t:pot|pote}} | {{n:eq.bet-third}} |
| 1/2 do {{t:pot|pote}} | {{n:eq.bet-half}} |
| {{t:pot|Pote}} inteiro | {{n:eq.bet-pot}} |

Quando o adversário faz {{t:bluff|bluff}} exatamente na proporção da lição anterior ({{n:bluff.share.bet-pot}} com o {{t:pot|pote}} inteiro), {{t:call|pagar}} fica a zero. Quando faz {{t:bluff|bluff}} mais vezes, {{t:call|paga}}; quando menos, {{t:fold|desiste}}. Os números não incluem rake; o rake aumenta um pouco a equity necessária.

## Quanto defender e com quê

Quanto defender, di-lo a {{t:mdf}} do M6: com uma aposta de meio {{t:pot|pote}}, cerca de **{{n:mdf.bet-half}}** do {{t:range|range}}. Esta lição responde à segunda pergunta: **com que mãos**. {{t:call|Paga}} com os melhores bluff-catchers: entre mãos de força semelhante, escolhe as que têm melhores {{t:blocker|bloqueadores}}; {{t:fold|desiste}} das mãos que perdem até contra {{t:bluff|bluffs}}.

Um bluff-catcher melhor:

- ganha a mais {{t:bluff|bluffs}} (um {{t:pair}} é melhor do que apenas uma carta alta),
- bloqueia as mãos {{t:value|de valor}} do adversário,
- não bloqueia os {{t:bluff|bluffs}} dele.

## {{t:blocker|Bloqueadores}} ao {{t:call|pagar}}

É o espelho da lição anterior. Quando não saem espadas, o adversário faz {{t:bluff|bluff}} com {{t:flush-draw|flush draws}} falhados. Uma espada na sua mão tira-lhe parte dos {{t:bluff|bluffs}}, por isso {{t:call|pagar}} é pior. Quando o {{t:flush|flush}} sai, o ás desse naipe na sua mão tira-lhe os flushes mais fortes, por isso {{t:call|pagar}} é melhor.

## Não aumente com um bluff-catcher

Depois de um {{t:raise|aumento}}, os {{t:bluff|bluffs}} {{t:fold|desistem}} e só pagam as mãos que o vencem. Com um bluff-catcher, {{t:call|paga}} ou {{t:fold|desiste}}.

:::note Quando o adversário raramente faz {{t:bluff|bluff}}
Estas regras pressupõem um adversário que faz {{t:bluff|bluff}} mais ou menos em equilíbrio. Contra um jogador que raramente faz {{t:bluff|bluff}} com uma aposta grande no river, {{t:fold|desiste}} mais vezes do que indica a {{t:mdf}}: quando há menos {{t:bluff|bluffs}} do que o preço exige, {{t:call|pagar}} dá prejuízo (as contas desta lição). As regras de escolha de bluff-catchers segundo os {{t:blocker|bloqueadores}} vêm de materiais de formação e de análises de solvers (jogo no river, {{t:blocker|bloqueadores}}): entre os bluff-catchers (mãos que, de qualquer forma, só ganham a {{t:bluff|bluffs}}), o solver escolhe os {{t:call|pagamentos}} mais pelos {{t:blocker|bloqueadores}} do que pela força da mão em si.
:::
