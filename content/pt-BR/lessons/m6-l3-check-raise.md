---
id: m6.l3
module: m6
order: 3
title: "Check-raise"
sub: "Quando aumentar um c-bet e para quanto"
rules: [R-M6-008, R-M6-009, R-M6-010, R-M6-011]
drills:
  - kind: choice
    id: m6.l3.q-two-pair
    family: m6.xr.value
    rules: [R-M6-008, R-M6-009]
    prompt: "Você defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop, você {{t:check|dá check}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que você faz?"
    table: { hand: "6c 5c", board: "7h 6d 5s", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "{{t:two-pair|Dois pares}} em um flop baixo e {{t:connected|conectado}} é uma mão de {{t:value|valor}}. Em flops assim, o {{t:big-blind|big blind}} tem mais das combinações mais fortes que o Button. Com o {{t:raise|aumento}}, você constrói o {{t:pot|pote}} e faz {{t:pair|pares}} e {{t:draw|projetos}} pagarem." }
      - { text: "{{t:call|Pago}}", correct: true, why: "Também é bom: em um flop muito {{t:connected|conectado}}, o solver apenas {{t:call|paga}} com parte dos {{t:two-pair|dois pares}}. O check-raise constrói o {{t:pot|pote}} e protege a mão com mais frequência." }
      - { text: "{{t:fold|Desisto}}", why: "{{t:two-pair|Dois pares}} é uma das mãos mais fortes neste flop. {{t:fold|Desistir}} é um erro grave." }
  - kind: choice
    id: m6.l3.q-set-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Há {{n:ex.third.pot}} no {{t:pot|pote}}, e o Button {{t:bet|aposta}} um c-bet de {{n:ex.third.bet}}. Você tem um set e quer dar check-raise. Para quanto você {{t:raise|aumenta}}?"
    table: { hand: "4s 4d", board: "Qc 9h 4h", position: BB }
    options:
      - { text: "Para {{n:xr.example}}", correct: true, why: "Isso é {{n:xr.mult.example}} o c-bet. O Button precisa completar {{n:xr.example.extra}} e precisa de cerca de {{n:eq.vs-xr.example}} de equity: {{t:pair|pares}} piores e {{t:draw|projetos}} fracos (gutshot) não têm o preço certo, e os projetos de {{t:flush}} e os {{t:oesd}} vão pagar, mas já em um {{t:pot|pote}} grande." }
      - { text: "Para {{n:xr.too-small}}", sizeError: true, why: "Ação certa, mas tamanho pequeno demais: o Button completa só {{n:xr.too-small.extra}} e precisa de cerca de {{n:eq.vs-xr.too-small}} de equity. Qualquer {{t:flush-draw|projeto de flush}} ou de {{t:straight|sequência}} vai pagar quase de graça." }
      - { text: "{{t:call|Pago}}", why: "Em um flop com duas copas e cartas para {{t:straight|sequência}}, você perde valor e proteção: muitas cartas no turn vão travar a ação ou superar sua mão. Um set quer construir o {{t:pot|pote}} imediatamente." }
  - kind: numeric
    id: m6.l3.n-size
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Há {{n:ex.third.pot}} no {{t:pot|pote}}, e o Button {{t:bet|aposta}} um c-bet de {{n:ex.third.bet}}. Você dá check-raise de {{n:xr.mult.example}} o c-bet. Para quanto você {{t:raise|aumenta}}? Digite o número de {{t:chips|fichas}}."
    table: { position: BB }
    answer: xr.example
    explanation: "O c-bet é de {{n:ex.third.bet}}, então {{n:xr.mult.example}} o c-bet dá {{n:xr.example}}. O tamanho do check-raise é calculado a partir do c-bet, não do {{t:pot|pote}}."
  - kind: numeric
    id: m6.l3.n-price-vs-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Havia {{n:ex.third.pot}} no {{t:pot|pote}}, o Button {{t:bet|apostou}} {{n:ex.third.bet}} e você {{t:raise|aumentou}} para {{n:xr.example}}. De quantos por cento de equity o Button precisa para {{t:call|pagar}}? Digite o número."
    table: { position: BB }
    answer: eq.vs-xr.example
    explanation: "O Button completa {{n:xr.example}} − {{n:ex.third.bet}} = {{n:xr.example.extra}}. O {{t:pot|pote}} fica então em {{n:xr.example.pot-after}} e, depois do {{t:call|pagamento}} dele, com {{n:xr.example.extra}} a mais. {{n:xr.example.extra}} ÷ ({{n:xr.example.pot-after}} + {{n:xr.example.extra}}) = {{n:eq.vs-xr.example}}."
  - kind: choice
    id: m6.l3.q-price-small-xr
    family: m6.xr.size
    rules: [R-M6-010]
    prompt: "Havia {{n:ex.third.pot}} no {{t:pot|pote}}, o Button {{t:bet|apostou}} {{n:ex.third.bet}} e você {{t:raise|aumentou}} só para {{n:xr.too-small}}. De quanta equity o Button precisa para {{t:call|pagar}}?"
    table: { position: BB }
    options:
      - { text: "Cerca de {{n:eq.vs-xr.too-small}}", correct: true, why: "Ele completa {{n:xr.too-small.extra}} para um {{t:pot|pote}} de {{n:xr.too-small.pot-after}}: {{n:xr.too-small.extra}} ÷ ({{n:xr.too-small.pot-after}} + {{n:xr.too-small.extra}}) = {{n:eq.vs-xr.too-small}}. Barato assim, ele paga com quase qualquer mão; por isso o {{t:raise|aumento}} deve ser várias vezes maior que o c-bet." }
      - { text: "Cerca de {{n:eq.vs-xr.example}}", why: "É o que ele precisaria contra um {{t:raise|aumento}} para {{n:xr.example}}. Com {{n:xr.too-small}}, ele completa só {{n:xr.too-small.extra}}." }
      - { text: "Cerca de {{n:eq.bet-third}}", why: "É o que você precisava para {{t:call|pagar}} o c-bet. Depois do check-raise, você calcula o preço do Button: ele completa {{n:xr.too-small.extra}} para um {{t:pot|pote}} de {{n:xr.too-small.pot-after}}." }
  - kind: choice
    id: m6.l3.q-nut-flush-draw
    family: m6.xr.semibluff
    rules: [R-M6-008]
    prompt: "Você defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop, você {{t:check|dá check}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que você faz?"
    table: { hand: "Ah 5h", board: "Kh 8h 3c", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Um {{t:draw|projeto}} para o melhor {{t:flush}} é um bom {{t:semi-bluff|semiblefe}}: você ganha quando o Button {{t:fold|desiste}} e, quando ele paga, ainda tem {{n:outs.flush}} outs (cerca de {{n:odds.flush.flop-turn}} no turn)." }
      - { text: "{{t:call|Pago}}", correct: true, why: "Também é bom: você acerta o {{t:flush}} no turn em cerca de {{n:odds.flush.flop-turn}} das vezes, quase o mesmo que o preço de {{n:eq.bet-third}}, e, ao acertar o melhor {{t:flush}}, ganha mais (implied odds). {{t:draw|Projetos}} fortes você joga das duas maneiras, para que seu check-raise não represente apenas mãos fortes." }
      - { text: "{{t:fold|Desisto}}", why: "Erro grave: com {{n:outs.flush}} outs, você acerta o melhor {{t:flush}} no turn em cerca de {{n:odds.flush.flop-turn}} das vezes, quase o mesmo que o preço de {{n:eq.bet-third}}, e, ao acertar, ganha mais (implied odds). Além disso, você pode dar check-raise." }
  - kind: choice
    id: m6.l3.q-oesd
    family: m6.xr.semibluff
    rules: [R-M6-008, R-M6-009]
    prompt: "Você defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop, você {{t:check|dá check}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que você faz?"
    table: { hand: "9s 8s", board: "7d 6c 2h", position: BB }
    options:
      - { text: "Check-raise", correct: true, why: "Um {{t:oesd|OESD}} ({{n:outs.oesd}} outs) contra um c-bet pequeno, que dá uma oportunidade barata de {{t:raise|aumentar}}. Com o {{t:raise|aumento}}, você pode ganhar na hora e, se for {{t:call|pago}}, ainda pode acertar." }
      - { text: "{{t:call|Pago}}", correct: true, why: "Também é bom: você acerta a {{t:straight|sequência}} no turn em cerca de {{n:odds.oesd.flop-turn}} das vezes, um pouco menos que o preço de {{n:eq.bet-third}}, mas, ao acertar, ganha mais (implied odds) e, se ninguém {{t:bet|apostar}} no turn, também verá o river de graça. Parte dos {{t:draw|projetos}} fortes você {{t:call|paga}}, para que seus {{t:call|pagamentos}} não sejam só de mãos fracas." }
      - { text: "{{t:fold|Desisto}}", why: "Tight demais: com {{n:outs.oesd}} outs, você acerta a {{t:straight|sequência}} no turn em cerca de {{n:odds.oesd.flop-turn}} das vezes, não muito menos que o preço de {{n:eq.bet-third}}; o resto vem das implied odds e da chance de ver o river de graça. Além disso, você pode dar check-raise." }
  - kind: choice
    id: m6.l3.q-top-pair-weak
    family: m6.xr.medium
    rules: [R-M6-008]
    prompt: "Você defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop, você {{t:check|dá check}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que você faz?"
    table: { hand: "Kd 9c", board: "Ks 7d 2c", position: BB }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "{{t:top-pair|Top pair}} com kicker fraco é uma mão para {{t:call|pagar}}. Ela ganha dos {{t:bluff|blefes}} do Button e, ao {{t:call|pagar}}, você os mantém no jogo." }
      - { text: "Check-raise", why: "Normalmente você {{t:call|paga}}. Depois do {{t:raise|aumento}}, você é pago principalmente por mãos melhores e {{t:draw|projetos}}; check-raise com uma mão assim é uma jogada rara do solver contra c-bets pequenos." }
      - { text: "{{t:fold|Desisto}}", why: "{{t:top-pair|Top pair}} contra um c-bet pequeno é forte demais, de longe, para {{t:fold|desistir}}." }
  - kind: choice
    id: m6.l3.q-ace-high-board
    family: m6.xr.board
    rules: [R-M6-008, R-M6-006]
    prompt: "Você defende o {{t:big-blind|big blind}} contra a {{t:open|abertura}} do Button. No flop, você {{t:check|dá check}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que você faz?"
    table: { hand: "6s 5s", board: "Ad Kc 8h", position: BB }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Você não tem {{t:pair|par}} nem {{t:flush-draw|projeto de flush}}; tem só um {{t:straight-draw|projeto de sequência}} backdoor fraco (precisa de duas cartas específicas), e nenhuma das suas cartas é maior que as da mesa. Em flops com ás, você {{t:fold|desiste}} de mais mãos assim." }
      - { text: "Check-raise como {{t:bluff|blefe}}", why: "{{t:bluff|Blefes}} de check-raise você faz principalmente com {{t:draw|projetos}} ({{t:flush}}, {{t:oesd}}) que também ganham quando acertam. Esta mão tem só um {{t:draw|projeto}} backdoor fraco, e o Button tem aqui muitos ases e reis que não vão {{t:fold|desistir}}." }
      - { text: "{{t:call|Pago}}", why: "O preço é bom, mas esta mão quase não vai acertar nada: até um {{t:pair|par}} de seis ou de cinco perde para a maioria das mãos com que o Button continuará pagando." }
  - kind: choice
    id: m6.l3.q-when-more
    family: m6.xr.when
    rules: [R-M6-009]
    prompt: "Contra qual c-bet do Button você dá check-raise com mais frequência?"
    table: { position: BB }
    options:
      - { text: "1/4 do {{t:pot|pote}}", correct: true, why: "Um c-bet pequeno dá uma oportunidade barata de {{t:raise|aumentar}}, e o Button o {{t:bet|aposta}} com um {{t:range}} amplo, com muitas mãos fracas. Contra um c-bet grande, você {{t:raise|aumenta}} com menos frequência e de forma mais estreita: principalmente sets e {{t:two-pair|dois pares}}, menos {{t:bluff|blefes}}." }
      - { text: "{{t:pot|Pote}} inteiro", why: "Contra um c-bet grande, o {{t:raise|aumento}} custa caro, e o {{t:range}} do Button é mais forte. Você {{t:call|paga}} ou {{t:fold|desiste}} com mais frequência." }
      - { text: "Com a mesma frequência", why: "Contra c-bets pequenos, você {{t:raise|aumenta}} com mais frequência e de forma mais ampla; contra os grandes, com menos frequência, principalmente com as mãos mais fortes." }
  - kind: choice
    id: m6.l3.q-exploit-station
    family: m6.xr.exploit
    rules: [R-M6-011]
    prompt: "Você joga contra um Button que quase nunca {{t:fold|desiste}} no flop. Ele {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O que você faz?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Gutshot com carta alta é um bom {{t:call|call}} pelo preço de {{n:eq.bet-third}}. O check-raise de {{t:bluff|blefe}} lucra com os {{t:fold|folds}}, e esse rival quase não {{t:fold|desiste}}, então o {{t:raise|aumento}} perde sua principal vantagem." }
      - { text: "Check-raise", why: "{{t:bluff|Blefes}} de check-raise você faz principalmente com {{t:draw|projetos}} fortes, e o gutshot não está entre eles. Além disso, o {{t:bluff|blefe}} lucra com os {{t:fold|folds}}, e esse rival quase não {{t:fold|desiste}}: contra ele, você {{t:raise|aumenta}} principalmente por {{t:value|valor}}." }
      - { text: "{{t:fold|Desisto}}", why: "Tight demais: um {{t:draw|projeto}} com carta alta a um preço tão bom vale a defesa, não importa contra quem você joga." }
---
O check-raise é um {{t:check}} seguido de um {{t:raise|aumento}} da {{t:bet|aposta}} do rival. No {{t:big-blind|big blind}}, é uma arma importante contra c-bets (na maioria das vezes, você escolhe mesmo entre {{t:call|pagar}} e {{t:fold|desistir}}): sem ela, o Button poderia fazer c-bet barato com quase qualquer mão.

## Por que {{t:raise|aumentar}}

Você dá check-raise por dois motivos:

- **por {{t:value|valor}}**: você tem uma mão muito forte ({{t:two-pair|dois pares}}, set) e quer construir o {{t:pot|pote}},
- **como {{t:semi-bluff|semiblefe}}**: você tem um {{t:draw|projeto}} ({{t:flush}}, {{t:oesd}}) que ganha de duas formas: quando o Button {{t:fold|desiste}} ou quando você acerta.

Mãos médias, como {{t:top-pair}} com kicker fraco, você normalmente {{t:call|paga}}: depois do {{t:raise|aumento}}, as mãos piores do Button {{t:fold|desistem}} com mais frequência, e as melhores pagam. Isso é uma simplificação: contra c-bets pequenos, o solver também {{t:raise|aumenta}} com parte dos {{t:top-pair|top pairs}} e dos {{t:pair|pares}} fracos para proteção. Já com {{t:two-pair|dois pares}} em um flop muito {{t:connected|conectado}}, o solver muitas vezes apenas {{t:call|paga}}.

## Quando com mais frequência

- **Contra um c-bet pequeno.** O {{t:raise|aumento}} é barato, e o Button {{t:bet|aposta}} o c-bet pequeno com um {{t:range}} amplo. Contra um c-bet grande, você {{t:raise|aumenta}} com menos frequência e de forma mais estreita: principalmente sets e {{t:two-pair|dois pares}}, menos {{t:bluff|blefes}}.
- **Em flops baixos e {{t:connected|conectados}}** (por exemplo, [[7h 6d 5s]]). O {{t:big-blind|big blind}} defende muitas mãos baixas, então costuma ter aqui mais {{t:two-pair|dois pares}} e {{t:straight|sequências}} que o Button, ou seja, {{t:nuts-advantage|vantagem de nuts}}.
- **Com menos frequência em flops altos favoráveis ao Button**, por exemplo, K-J-T ou A-A-K: ali é ele quem tem mais das mãos mais fortes.

## Qual tamanho

O tamanho do check-raise é calculado a partir do c-bet. Exemplo: há {{n:ex.third.pot}} no {{t:pot|pote}}, e o c-bet é de {{n:ex.third.bet}}. Um check-raise de {{n:xr.mult.example}} o c-bet é um {{t:raise|aumento}} para {{n:xr.example}}: o Button completa {{n:xr.example.extra}} e precisa de cerca de **{{n:eq.vs-xr.example}}** de equity. Um {{t:raise|aumento}} só para {{n:xr.too-small}} dá a ele um preço de cerca de **{{n:eq.vs-xr.too-small}}**: ele vai pagar com quase qualquer mão que tenha algum {{t:draw|projeto}}. Por isso, você {{t:raise|aumenta}} para cerca de {{n:xr.mult.low}}–{{n:xr.mult.example}} o c-bet, mais quanto menor for o c-bet, e não o mínimo.

:::note Rival que não {{t:fold|desiste}}
O {{t:bluff|blefe}} no check-raise lucra com os {{t:fold|folds}} (lembre-se do alpha da primeira lição). Contra um jogador que quase nunca {{t:fold|desiste}} no flop, você {{t:raise|aumenta}} principalmente por {{t:value|valor}} e reserva os {{t:bluff|blefes}} para os {{t:draw|projetos}} mais fortes.
:::
