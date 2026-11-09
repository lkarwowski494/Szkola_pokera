---
id: m10.l4
module: m10
order: 4
title: "Rake"
sub: "Quanto custa jogar e o que isso muda nas decisões"
rules: [R-M10-013, R-M10-014, R-M10-015]
drills:
  - kind: choice
    id: m10.l4.q-rake-vs-wr
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Você joga NL10 6-max em um dos grandes sites online. Qual é o tamanho do {{t:rake}} em comparação com o winrate de um jogador vencedor típico nos {{t:stakes|limites}} baixos?"
    options:
      - { text: "Várias vezes maior: cerca de {{n:rake.micro.low}}–{{n:rake.micro.high}} contra {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "Convertendo as tabelas de rake dos sites para bb/100, nos microlimites o resultado é cerca de {{n:rake.micro.low}}–{{n:rake.micro.high}}. O jogador vencedor precisa superar os adversários por mais do que o {{t:rake}}, e só o excedente é o seu winrate." }
      - { text: "Mais ou menos o mesmo", why: "O {{t:rake}} nos microlimites é de cerca de {{n:rake.micro.low}}–{{n:rake.micro.high}}, e o winrate típico, de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}. A diferença é de várias vezes." }
      - { text: "Desprezível, porque o site fica com só alguns por cento do {{t:pot|pote}}", why: "Alguns por cento de cada {{t:pot|pote}} pós-flop somam cerca de {{n:rake.micro.low}}–{{n:rake.micro.high}}. Isso é mais do que ganha um jogador vencedor típico." }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Em um relatório sobre a população de cash 6-max, cada jogador de NL100 perde em média {{n:rake.pop.nl100.loss}}. De onde vem essa perda?"
    options:
      - { text: "É o {{t:rake}}: sem ele, os jogadores, no conjunto, ficariam no zero a zero", correct: true, why: "Os jogadores jogam uns contra os outros, então o que um ganha, outro perde. Em média, todos perdem só o que o site leva. O autor: “your biggest villain is the house”." }
      - { text: "Do fato de a maioria dos jogadores jogar mal", why: "O jogo fraco transfere dinheiro dos jogadores mais fracos para os melhores, mas não muda a média. Só o {{t:rake}} reduz a média." }
      - { text: "Da {{t:variance|variância}}: com uma amostra maior, vai dar zero", why: "A {{t:variance|variância}}, ou seja, a dispersão dos resultados em torno do {{t:expected-value|valor esperado}}, afeta os resultados de cada jogador nas duas direções. A média da população inteira é negativa porque todos pagam {{t:rake}}." }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Segundo uma estimativa do autor dos mesmos dados (com correção bayesiana), entre os jogadores com pelo menos {{n:rake.pop.reg.hands}} mãos, cerca de {{n:rake.pop.reg.prerake}} ganham antes de descontar o {{t:rake}}. Quantos ganham depois de descontá-lo?"
    options:
      - { text: "Cerca de {{n:rake.pop.reg.postrake}}", correct: true, why: "O {{t:rake}} elimina quase metade dos vencedores: cerca de {{n:rake.pop.reg.prerake}} antes do rake, cerca de {{n:rake.pop.reg.postrake}} depois dele. Por isso você sempre calcula o winrate depois do rake." }
      - { text: "Quase o mesmo número, cerca de {{n:rake.pop.reg.prerake}}", why: "Se o {{t:rake}} fosse pequeno, seria assim. Com um rake de alguns bb/100, muitos jogadores que ganham antes dele caem abaixo de zero." }
      - { text: "Quase ninguém", why: "Exagero: cerca de {{n:rake.pop.reg.postrake}} desse grupo ainda ganham. O {{t:rake}} é um grande obstáculo, mas não fecha o caminho para ganhar." }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "Por que no NL500 o {{t:rake}} em bb/100 é várias vezes menor ({{n:rake.nl500.low}}–{{n:rake.nl500.high}}) do que nos microlimites?"
    options:
      - { text: "Porque {{t:pot|potes}} maiores atingem com mais frequência o {{t:rake-cap|teto de rake}}, que lá é pequeno em bb", correct: true, why: "O site fica com uma porcentagem do {{t:pot|pote}}, mas não mais do que um teto em dólares. Nos microlimites, o teto equivale a muitos bb e os {{t:pot|potes}} raramente chegam a ele, então você paga a porcentagem cheia. No NL500, o mesmo teto é uma fração de bb." }
      - { text: "Porque no NL500 o site fica com uma porcentagem menor", why: "A porcentagem costuma ser parecida (cerca de {{n:rake.ex.pct}}). A diferença vem do {{t:rake-cap|teto de rake}}, que nos {{t:stakes|limites}} altos corta a taxa dos {{t:pot|potes}} grandes." }
      - { text: "Porque no NL500 se jogam menos mãos por hora", why: "bb/100 mede o {{t:rake}} por 100 mãos, então o ritmo de jogo não o altera. O que o altera é o {{t:rake-cap|teto de rake}} expresso em bb." }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Há {{n:ex.pot}} no {{t:pot|pote}}, e o adversário {{t:bet|aposta}} {{n:ex.bet.half}}. O site cobra {{n:rake.ex.pct}} do {{t:pot|pote}}, sem {{t:rake-cap|teto}} ao alcance. Quanta equity você precisa para {{t:call|pagar}}? Digite a porcentagem."
    answer: eq.bet-half.rake
    explanation: "Depois do {{t:call|call}}, há {{n:ex.half.total}} no {{t:pot|pote}}, e após o rake sobram {{n:rake.ex.pot-after}}. Você paga {{n:ex.bet.half}}, então precisa de {{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}} em vez de {{n:eq.bet-half}} sem rake."
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Sem {{t:rake}}, um {{t:call|call}} contra uma aposta de meio {{t:pot|pote}} precisa de {{n:eq.bet-half}} de equity. Quanto precisa com {{t:rake}} de {{n:rake.ex.pct}}?"
    options:
      - { text: "Um pouco mais: cerca de {{n:eq.bet-half.rake}}", correct: true, why: "Você ganha o {{t:pot|pote}} descontado o {{t:rake}}, mas paga o valor inteiro. Uma mão logo acima do limiar sem rake pode já estar abaixo dele com rake." }
      - { text: "O mesmo, porque os dois jogadores pagam {{t:rake}}", why: "O {{t:rake}} é descontado do {{t:pot|pote}} que você ganha, não do valor que você paga. O limiar sobe para cerca de {{n:eq.bet-half.rake}}." }
      - { text: "Menos, porque o {{t:pot|pote}} é maior", why: "O {{t:pot|pote}} após o rake é menor, não maior, então você precisa de mais equity: cerca de {{n:eq.bet-half.rake}}." }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Você joga em um site que cobra {{t:rake}} só dos {{t:pot|potes}} que chegam ao flop. Alguém antes de você {{t:open|abre}}, e você está em {{t:position|posição}} com uma mão que, sem rake, estaria no limite do {{t:call|call}}. O que o {{t:rake}} muda?"
    options:
      - { text: "{{t:call|Pago}} menos vezes: com mãos no limite do {{t:call|call}}, {{t:fold|desisto}} ou dou 3-bet com mais frequência", correct: true, why: "Nas soluções de solver publicadas com rake, os jogadores em {{t:position|posição}} diante de uma {{t:open|abertura}} jogam cerca de {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} menos mãos. Quem perde é o próprio {{t:call|call}}, porque o {{t:pot|pote}} pós-flop paga {{t:rake}}, e o {{t:pot|pote}} ganho com 3-bet antes do flop, não." }
      - { text: "Nada: o {{t:rake}} só afeta o jogo pós-flop", why: "É justamente por isso que ele muda a decisão pré-flop: o {{t:call|call}} leva ao flop e ao rake, enquanto o 3-bet ou o {{t:fold|fold}} muitas vezes encerram a mão sem ele." }
      - { text: "{{t:call|Pago}} mais vezes, porque os {{t:pot|potes}} pós-flop são grandes", why: "O contrário: o {{t:rake}} leva parte justamente desses {{t:pot|potes}}. O solver com rake {{t:call|paga}} bem menos vezes." }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Nas mesmas soluções de solver, o {{t:big-blind|big blind}} {{t:call|paga}} um min-raise no jogo com rake em apenas cerca de {{n:rake.solver.bb-minraise}} dos casos em que o {{t:call|paga}} sem rake. O que isso significa para você no {{t:big-blind|big blind}}?"
    options:
      - { text: "Continuo defendendo muitas mãos, mas de forma mais restrita do que nas tabelas calculadas sem rake", correct: true, why: "O {{t:big-blind|big blind}} ainda defende com frequência, porque já tem {{t:chips|fichas}} no {{t:pot|pote}} e fecha a ação. Mas o {{t:rake}} elimina os {{t:call|calls}} mais fracos, então as tabelas sem rake são amplas demais para você." }
      - { text: "Paro de defender o {{t:big-blind|big blind}} {{t:call|pagando}}", why: "Não: segundo o autor, {{t:call|pagar}} dos blinds continua sendo uma parte importante da estratégia também com rake. Muda a amplitude da defesa, não a existência dela." }
      - { text: "Defendo com a mesma amplitude, porque no {{t:big-blind|big blind}} o {{t:rake}} não conta", why: "Conta: depois do {{t:call|call}}, o {{t:pot|pote}} chega ao flop e paga {{t:rake}}. Por isso o solver {{t:call|paga}} menos vezes do {{t:big-blind|big blind}}." }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Em alguns sites, o {{t:rake}} também é cobrado de {{t:pot|potes}} com 3-bet que terminam antes do flop. O que isso muda no argumento “o 3-bet não paga rake”?"
    options:
      - { text: "Em um site assim, esse argumento perde força: o 3-bet também paga, então a vantagem do 3-bet sobre o {{t:call|call}} é menor", correct: true, why: "O resultado do solver vale para a estrutura “no flop, no drop”, em que o {{t:pot|pote}} sem flop é livre de rake. Em um site assim, essa regra cobre apenas {{t:pot|potes}} sem 3-bet, então o {{t:call|call}} continua perdendo com o rake, mas o 3-bet não está livre dele." }
      - { text: "Nada, porque o {{t:rake}} do 3-bet é desprezível", why: "Não dá para saber isso sem fazer as contas para um site específico. A única certeza é que o 3-bet deixa de ser livre de rake." }
      - { text: "Em um site assim, deve-se sempre {{t:call|pagar}} em vez de dar 3-bet", why: "O {{t:call|call}} leva ao flop e paga {{t:rake}} como antes. A única mudança é que o 3-bet também paga." }
---
O {{t:rake}} é a taxa que o site cobra do {{t:pot|pote}}. Os jogadores jogam uns contra os outros, então, se não fosse o {{t:rake}}, no conjunto eles ficariam no zero a zero. Com rake, o jogador médio perde exatamente o que o site leva, e o jogador vencedor precisa superar os adversários por mais do que o {{t:rake}}.

## Quanto custa

O site fica com uma porcentagem do {{t:pot|pote}}, mas não mais do que um {{t:rake-cap|teto de rake}} em dólares. Nos dois maiores sites online, no NL2–NL10, isso é {{n:rake.ex.pct}} do {{t:pot|pote}}. Nos microlimites, os {{t:pot|potes}} raramente chegam ao teto, então você paga a porcentagem cheia.

Uma comparação das tabelas de rake dos sites as converte para bb/100 com base na distribuição de {{t:pot|potes}} de vários milhões de mãos:

| {{t:stakes|Limite}} (6-max, os dois maiores sites online) | {{t:rake}} |
|---|---|
| NL2–NL25 | cerca de {{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | cerca de {{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

Um jogador vencedor típico nos {{t:stakes|limites}} baixos tem winrate de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}} (módulo 12): várias vezes menos do que paga ao site. Nos {{t:stakes|limites}} mais altos, o mesmo teto em dólares é uma fração de bb, então o {{t:rake}} em bb/100 cai.

Os dados da população dizem o mesmo. Em um relatório sobre a população (cash 6-max, NL10–NL500), cada jogador perde em média {{n:rake.pop.nl10.loss}} no NL10, {{n:rake.pop.nl100.loss}} no NL100 e {{n:rake.pop.nl500.loss}} no NL500. Entre os jogadores de NL100 com pelo menos {{n:rake.pop.reg.hands}} mãos, segundo a estimativa do autor (correção bayesiana), cerca de {{n:rake.pop.reg.prerake}} ganham antes de descontar o rake e cerca de {{n:rake.pop.reg.postrake}} depois do desconto (nos dados brutos, {{n:rake.pop.reg.prerake.raw}} e {{n:rake.pop.reg.postrake.raw}}).

## O limiar do {{t:call|call}} com rake

Você ganha o {{t:pot|pote}} descontado o {{t:rake}}, mas paga o valor inteiro. A equity necessária do módulo 2 aumenta:

```formula
equity necessária = valor a pagar ÷ ({{t:pot|pote}} após o {{t:call|call}} × (1 − {{t:rake}}))
```

Aposta de {{n:ex.bet.half}} em um {{t:pot|pote}} de {{n:ex.pot}}: sem rake você precisa de {{n:eq.bet-half}}; com rake de {{n:rake.ex.pct}}, de {{n:eq.bet-half.rake}}. A diferença é pequena em uma única mão, mas vale para todo {{t:pot|pote}} pós-flop.

## O que o {{t:rake}} muda antes do flop

Em muitos sites, o {{t:rake}} é cobrado só dos {{t:pot|potes}} que chegam ao flop (“no flop, no drop”). Nesse caso, o {{t:pot|pote}} ganho antes do flop é livre dele, e o {{t:pot|pote}} depois de um {{t:call|call}} paga. Nas soluções de solver publicadas para NL100 com rake:

- os jogadores em {{t:position|posição}} diante de uma {{t:open|abertura}} jogam cerca de {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} menos mãos; quem perde é principalmente o {{t:call|call}}, e há um pouco mais de 3-bets;
- o {{t:big-blind|big blind}} {{t:call|paga}} um min-raise em apenas cerca de {{n:rake.solver.bb-minraise}} dos casos em que paga sem rake, embora a defesa dos blinds continue baseada em {{t:call|pagar}}.

Pelo mesmo motivo, no módulo 3, do {{t:small-blind|small blind}} você {{t:raise|aumenta}} ou {{t:fold|desiste}}, sem completar até o {{t:big-blind|big blind}}. Alguns sites cobram {{t:rake}} também de {{t:pot|potes}} com 3-bet que terminam antes do flop; neles, o 3-bet não é livre de rake.

:::note Fontes
Valor do rake: comparação do rake de sites online de 2026 (tabelas dos dois maiores sites convertidas para bb/100, acesso em 5 de outubro de 2026); outros sites têm outros números. Perda da população: relatório independente sobre a população (cash 6-max NLHE, sites com bancos de dados de rastreamento de mãos, jogadores com pelo menos 100 mãos; o autor não informa os sites nem o período). Efeito do rake no jogo pré-flop: artigo publicado sobre tamanhos de aumento pré-flop, soluções de solver para stacks de {{n:rake.solver.depth}}; o autor escreve que as conclusões se aplicam em grande parte a outros formatos, então, para um stack de {{n:format.stack}}, isso é uma simplificação. O limiar de equity é um cálculo.
:::
