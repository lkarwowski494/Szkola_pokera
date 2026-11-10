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
    prompt: "Joga NL10 6-max numa das grandes salas online. Qual é a dimensão do {{t:rake}} em comparação com o winrate de um jogador vencedor típico nos {{t:stakes|limites}} baixos?"
    options:
      - { text: "Várias vezes maior: cerca de {{n:rake.micro.low}}–{{n:rake.micro.high}} face a {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", correct: true, why: "Convertendo as tabelas das salas para bb/100, nos microlimites obtém-se cerca de {{n:rake.micro.low}}–{{n:rake.micro.high}}. Um jogador vencedor tem de superar os adversários por mais do que o {{t:rake}}, e só o excedente é o seu winrate." }
      - { text: "Mais ou menos o mesmo", why: "O {{t:rake}} nos microlimites é de cerca de {{n:rake.micro.low}}–{{n:rake.micro.high}}, e o winrate típico de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}. A diferença é de várias vezes." }
      - { text: "Insignificante, porque a sala retira apenas alguns por cento do {{t:pot|pote}}", why: "Alguns por cento de cada {{t:pot|pote}} após o flop somam cerca de {{n:rake.micro.low}}–{{n:rake.micro.high}}. É mais do que ganha um jogador vencedor típico." }
  - kind: choice
    id: m10.l4.q-population-loss
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Num relatório sobre a população de cash 6-max, cada jogador de NL100 perde em média {{n:rake.pop.nl100.loss}}. De onde vem esta perda?"
    options:
      - { text: "É o {{t:rake}}: sem ele, os jogadores, no conjunto, ficariam a zero", correct: true, why: "Os jogadores jogam uns contra os outros, por isso o que um ganha, outro perde. Em média, todos perdem apenas o que a sala retira. O autor: «your biggest villain is the house»." }
      - { text: "Do facto de a maioria dos jogadores jogar mal", why: "O mau jogo transfere dinheiro dos jogadores mais fracos para os melhores, mas não altera a média. Só o {{t:rake}} baixa a média." }
      - { text: "Da {{t:variance|variância}}: com uma amostra maior, dará zero", why: "A {{t:variance|variância}}, ou seja, a dispersão dos resultados em torno do {{t:expected-value|valor esperado}}, afeta os resultados de cada jogador nos dois sentidos. A média de toda a população é negativa porque todos pagam {{t:rake}}." }
  - kind: choice
    id: m10.l4.q-reg-prerake
    family: m10.rake.cost
    rules: [R-M10-013]
    prompt: "Segundo uma estimativa do autor dos mesmos dados (com correção bayesiana), entre os jogadores com pelo menos {{n:rake.pop.reg.hands}} mãos, cerca de {{n:rake.pop.reg.prerake}} ganham antes da dedução do {{t:rake|rake}}. Quantos ganham depois dessa dedução?"
    options:
      - { text: "Cerca de {{n:rake.pop.reg.postrake}}", correct: true, why: "O {{t:rake}} elimina quase metade dos vencedores: cerca de {{n:rake.pop.reg.prerake}} antes do rake, cerca de {{n:rake.pop.reg.postrake}} depois dele. Por isso, calcula sempre o winrate depois do rake." }
      - { text: "Quase os mesmos, cerca de {{n:rake.pop.reg.prerake}}", why: "Se o {{t:rake}} fosse pequeno, assim seria. Com um rake de vários bb/100, muitos jogadores que ganham antes dele descem abaixo de zero." }
      - { text: "Quase ninguém", why: "Exagero: cerca de {{n:rake.pop.reg.postrake}} deste grupo continua a ganhar. O {{t:rake}} é um grande obstáculo, mas não fecha o caminho para ganhar." }
  - kind: choice
    id: m10.l4.q-higher-stakes
    family: m10.rake.cost
    rules: [R-M10-013, R-M10-015]
    prompt: "Porque é que em NL500 o {{t:rake}} em bb/100 é várias vezes menor ({{n:rake.nl500.low}}–{{n:rake.nl500.high}}) do que nos microlimites?"
    options:
      - { text: "Porque os {{t:pot|potes}} maiores atingem com mais frequência o {{t:rake-cap|limite de rake}}, que aí é pequeno em bb", correct: true, why: "A sala retira uma percentagem do {{t:pot|pote}}, mas não mais do que um limite em dólares. Nos microlimites, o limite corresponde a muitos bb e os {{t:pot|potes}} raramente o atingem, por isso paga a percentagem completa. Em NL500, o mesmo limite é uma fração de bb." }
      - { text: "Porque em NL500 a sala retira uma percentagem menor", why: "A percentagem costuma ser semelhante (cerca de {{n:rake.ex.pct}}). A diferença vem do {{t:rake-cap|limite de rake}}, que nos {{t:stakes|limites}} altos corta a comissão dos {{t:pot|potes}} grandes." }
      - { text: "Porque em NL500 se jogam menos mãos por hora", why: "O bb/100 mede o {{t:rake}} por 100 mãos, por isso o ritmo de jogo não o altera. O que o altera é o {{t:rake-cap|limite de rake}} expresso em bb." }
  - kind: numeric
    id: m10.l4.n-eq-rake
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "No {{t:pot|pote}} estão {{n:ex.pot}}, e o adversário {{t:bet|aposta}} {{n:ex.bet.half}}. A sala retira {{n:rake.ex.pct}} do {{t:pot|pote}}, sem {{t:rake-cap|limite}} ao alcance. De quanta equity precisa para {{t:call|pagar}}? Introduza a percentagem."
    answer: eq.bet-half.rake
    explanation: "Depois do {{t:call|pagamento}}, o {{t:pot|pote}} tem {{n:ex.half.total}}, e após o rake ficam {{n:rake.ex.pot-after}}. Paga {{n:ex.bet.half}}, por isso precisa de {{n:ex.bet.half}} ÷ {{n:rake.ex.pot-after}} ≈ {{n:eq.bet-half.rake}} em vez de {{n:eq.bet-half}} sem rake."
  - kind: choice
    id: m10.l4.q-eq-rake-why
    family: m10.rake.math
    rules: [R-M10-015]
    prompt: "Sem {{t:rake|rake}}, um {{t:call|pagamento}} contra uma aposta de meio {{t:pot|pote}} precisa de {{n:eq.bet-half}} de equity. De quanto precisa com um {{t:rake|rake}} de {{n:rake.ex.pct}}?"
    options:
      - { text: "Um pouco mais: cerca de {{n:eq.bet-half.rake}}", correct: true, why: "Ganha o {{t:pot|pote}} menos o {{t:rake}}, mas paga o montante completo. Uma mão logo acima do limiar sem rake pode já estar abaixo dele com rake." }
      - { text: "O mesmo, porque o {{t:rake}} é pago pelos dois jogadores", why: "O {{t:rake}} é subtraído ao {{t:pot|pote}} que ganha, e não ao valor que paga. O limiar sobe para cerca de {{n:eq.bet-half.rake}}." }
      - { text: "Menos, porque o {{t:pot|pote}} é maior", why: "O {{t:pot|pote}} após o rake é menor, e não maior, por isso precisa de mais equity: cerca de {{n:eq.bet-half.rake}}." }
  - kind: choice
    id: m10.l4.q-flat-raked
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Joga numa sala que retira {{t:rake}} apenas dos {{t:pot|potes}} que chegam ao flop. Alguém antes de si {{t:open|abre}}, e está em {{t:position|posição}} com uma mão que, sem rake, seria um {{t:call|pagamento}} marginal. O que muda o {{t:rake}}?"
    options:
      - { text: "{{t:call|Pago}} menos vezes: com mãos marginais para {{t:call|pagamento}}, {{t:fold|desisto}} ou faço 3-bet com mais frequência", correct: true, why: "Nas soluções de solver publicadas com rake, os jogadores em {{t:position|posição}} perante uma {{t:open|abertura}} jogam cerca de {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} menos mãos. Quem perde é o próprio {{t:call|pagamento}}, porque o {{t:pot|pote}} após o flop paga {{t:rake}}, e o {{t:pot|pote}} ganho com 3-bet antes do flop não." }
      - { text: "Nada: o {{t:rake}} só se aplica ao jogo após o flop", why: "É precisamente por isso que muda a decisão antes do flop: o {{t:call|pagamento}} leva ao flop e ao rake, enquanto o 3-bet ou a {{t:fold|desistência}} terminam muitas vezes a mão sem ele." }
      - { text: "{{t:call|Pago}} mais vezes, porque os {{t:pot|potes}} após o flop são grandes", why: "Pelo contrário: o {{t:rake}} leva uma parte precisamente desses {{t:pot|potes}}. O solver com rake {{t:call|paga}} claramente menos vezes." }
  - kind: choice
    id: m10.l4.q-bb-minraise
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Nas mesmas soluções de solver, o {{t:big-blind|big blind}} {{t:call|paga}} um min-raise num jogo com rake apenas em cerca de {{n:rake.solver.bb-minraise}} dos casos em que o {{t:call|paga}} sem rake. O que significa isto para si no {{t:big-blind|big blind}}?"
    options:
      - { text: "Continuo a defender muitas mãos, mas de forma mais apertada do que nas tabelas calculadas sem rake", correct: true, why: "O {{t:big-blind|big blind}} continua a defender com frequência, porque já tem {{t:chips|fichas}} no {{t:pot|pote}} e fecha a ação. O {{t:rake}} elimina, no entanto, os {{t:call|pagamentos}} mais fracos, por isso as tabelas sem rake são demasiado largas para si." }
      - { text: "Deixo de defender o {{t:big-blind|big blind}} {{t:call|pagando}}", why: "Não: segundo o autor, {{t:call|pagar}} a partir dos blinds continua a ser uma parte importante da estratégia também com rake. Muda a largura da defesa, não a sua existência." }
      - { text: "Defendo com a mesma largura, porque no {{t:big-blind|big blind}} o {{t:rake}} não conta", why: "Conta: após um {{t:call|pagamento}}, o {{t:pot|pote}} chega ao flop e paga {{t:rake}}. Por isso, o solver {{t:call|paga}} a partir do {{t:big-blind|big blind}} menos vezes." }
  - kind: choice
    id: m10.l4.q-gg-3bet
    family: m10.rake.preflop
    rules: [R-M10-014]
    prompt: "Em algumas salas, o {{t:rake}} é também retirado dos {{t:pot|potes}} com 3-bet que terminam antes do flop. O que muda isto no argumento «o 3-bet não paga rake»?"
    options:
      - { text: "Numa sala assim, esse argumento enfraquece: o 3-bet também paga, por isso a vantagem do 3-bet sobre o {{t:call|pagamento}} é menor", correct: true, why: "O resultado do solver refere-se à estrutura «no flop, no drop», em que um {{t:pot|pote}} sem flop está isento de rake. Numa sala assim, essa regra abrange apenas os {{t:pot|potes}} sem 3-bet, por isso o {{t:call|pagamento}} continua a perder com o rake, mas o 3-bet não está isento dele." }
      - { text: "Nada, porque o {{t:rake}} do 3-bet é insignificante", why: "Não o sabemos sem fazer as contas para a sala concreta. Certo é apenas que o 3-bet deixa de estar isento de rake." }
      - { text: "Numa sala assim, deve-se sempre {{t:call|pagar}} em vez de fazer 3-bet", why: "O {{t:call|pagamento}} leva ao flop e paga {{t:rake}} tal como antes. A única mudança é que o 3-bet também paga." }
---
O {{t:rake}} é a comissão que a sala retira do {{t:pot|pote}}. Os jogadores jogam uns contra os outros, por isso, se não fosse o {{t:rake}}, no conjunto ficariam a zero. Com rake, o jogador médio perde exatamente o que a sala retira, e um jogador vencedor tem de superar os adversários por mais do que o {{t:rake}}.

## Quanto custa

A sala retira uma percentagem do {{t:pot|pote}}, mas não mais do que um {{t:rake-cap|limite de rake}} em dólares. Nas duas maiores salas online, em NL2–NL10, são {{n:rake.ex.pct}} do {{t:pot|pote}}. Nos microlimites, os {{t:pot|potes}} raramente atingem o limite, por isso paga a percentagem completa.

Uma comparação das tabelas das salas converte-as para bb/100 com base na distribuição dos {{t:pot|potes}} de vários milhões de mãos:

| {{t:stakes|Limite}} (6-max, as duas maiores salas online) | {{t:rake}} |
|---|---|
| NL2–NL25 | cerca de {{n:rake.micro.low}}–{{n:rake.micro.high}} |
| NL500 | cerca de {{n:rake.nl500.low}}–{{n:rake.nl500.high}} |

Um jogador vencedor típico nos {{t:stakes|limites}} baixos tem um winrate de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}} (módulo 12): várias vezes menos do que paga à sala. Nos {{t:stakes|limites}} mais altos, o mesmo limite em dólares é uma fração de bb, por isso o {{t:rake}} em bb/100 desce.

Os dados da população dizem o mesmo. Num relatório sobre a população (cash 6-max, NL10–NL500), cada jogador perde em média {{n:rake.pop.nl10.loss}} em NL10, {{n:rake.pop.nl100.loss}} em NL100 e {{n:rake.pop.nl500.loss}} em NL500. Entre os jogadores de NL100 com pelo menos {{n:rake.pop.reg.hands}} mãos, segundo a estimativa do autor (correção bayesiana), cerca de {{n:rake.pop.reg.prerake}} ganham antes da dedução do rake e cerca de {{n:rake.pop.reg.postrake}} depois dela (nos dados brutos, {{n:rake.pop.reg.prerake.raw}} e {{n:rake.pop.reg.postrake.raw}}).

## O limiar de {{t:call|pagamento}} com rake

Ganha o {{t:pot|pote}} menos o {{t:rake}}, mas paga o montante completo. A equity necessária do módulo 2 aumenta:

```formula
equity necessária = valor a pagar ÷ ({{t:pot|pote}} após o {{t:call|pagamento}} × (1 − {{t:rake}}))
```

Aposta de {{n:ex.bet.half}} num {{t:pot|pote}} de {{n:ex.pot}}: sem rake precisa de {{n:eq.bet-half}}, com um rake de {{n:rake.ex.pct}} precisa de {{n:eq.bet-half.rake}}. A diferença é pequena numa só mão, mas aplica-se a cada {{t:pot|pote}} após o flop.

## O que o {{t:rake}} muda antes do flop

Em muitas salas, o {{t:rake}} é retirado apenas dos {{t:pot|potes}} que chegam ao flop («no flop, no drop»). Nesse caso, o {{t:pot|pote}} ganho antes do flop está isento dele, e o {{t:pot|pote}} após um {{t:call|pagamento}} paga. Nas soluções de solver publicadas para NL100 com rake:

- os jogadores em {{t:position|posição}} perante uma {{t:open|abertura}} jogam cerca de {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} menos mãos; quem perde é sobretudo o {{t:call|pagamento}}, e há um pouco mais de 3-bets;
- o {{t:big-blind|big blind}} {{t:call|paga}} um min-raise apenas em cerca de {{n:rake.solver.bb-minraise}} dos casos em que o faz sem rake, embora a defesa a partir dos blinds continue a assentar no {{t:call|pagamento}}.

Pelo mesmo motivo, no módulo 3, a partir do {{t:small-blind|small blind}} {{t:raise|aumenta}} ou {{t:fold|desiste}}, sem completar para o {{t:big-blind|big blind}}. Algumas salas retiram {{t:rake}} também dos {{t:pot|potes}} com 3-bet que terminam antes do flop; aí, o 3-bet não está isento dele.

:::note Fontes
Valor do rake: comparação do rake das salas online de 2026 (tabelas das duas maiores salas convertidas para bb/100, consulta a 5 de outubro de 2026); outras salas têm outros números. Perda da população: relatório independente sobre a população (cash 6-max NLHE, salas com bases de dados de registo de mãos, jogadores com pelo menos 100 mãos; o autor não indica as salas nem o período). Efeito do rake no jogo antes do flop: artigo publicado sobre os tamanhos de aumento antes do flop, soluções de solver para stacks de {{n:rake.solver.depth}}; o autor escreve que as conclusões se transferem em grande medida para outros formatos, por isso, para um stack de {{n:format.stack}}, isto é uma simplificação. O limiar de equity é um cálculo.
:::
