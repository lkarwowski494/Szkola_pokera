---
id: m12.l1
module: m12
order: 1
title: "Variância em números"
sub: "O que diz um resultado de milhares de mãos"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Você ganha em média {{n:var.wr.ex}} e vai jogar {{n:var.hands.k}} mil mãos. De quantos {{t:buy-in|buy-ins}} (de {{n:format.stack}} cada) é o seu resultado esperado? Digite um número."
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}} mil mãos são {{n:var.blocks}} blocos de 100 mãos. Resultado esperado = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, ou seja, {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. Isso é uma média: o resultado real pode ficar bem longe dela."
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "O {{t:standard-deviation|desvio padrão}} do seu jogo é {{n:var.sd}}. Qual é o {{t:standard-deviation|desvio}} do resultado após {{n:var.hands.k}} mil mãos ({{n:var.blocks}} blocos de 100 mãos)?"
    options:
      - { text: "Cerca de {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "O {{t:standard-deviation|desvio}} cresce com a raiz quadrada do número de blocos: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, ou seja, cerca de {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
      - { text: "Cerca de {{n:var.sd.wrong.bi}} {{t:buy-in|buy-ins}}", why: "É o que dá quando você multiplica o {{t:standard-deviation|desvio}} pelo número de blocos. As oscilações aleatórias se anulam em parte, então você multiplica pela raiz: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}." }
      - { text: "Cerca de {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "Esse é o resultado esperado com {{n:var.wr.ex}}, e não o {{t:standard-deviation|desvio}} dele. O {{t:standard-deviation|desvio}} é de cerca de {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Você ganha {{n:var.wr.ex}} com {{t:standard-deviation|desvio}} de {{n:var.sd}}. Em que intervalo cairá o seu resultado após {{n:var.hands.k}} mil mãos, com cerca de {{n:var.conf95}} de confiança?"
    options:
      - { text: "De cerca de {{n:var.ci.low.bi}} a cerca de {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "Resultado esperado de {{n:var.exp.bi}} {{t:buy-in|buy-ins}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Mesmo um jogador claramente vencedor pode estar quase no zero a zero após {{n:var.hands.k}} mil mãos." }
      - { text: "De cerca de {{n:var.ci68.low.bi}} a cerca de {{n:var.ci68.high.bi}} {{t:buy-in|buy-ins}}", why: "Esse é o intervalo de um {{t:standard-deviation|desvio}}: cobre só cerca de 2 em cada 3 resultados. Para {{n:var.conf95}}, você usa {{n:var.z95}} {{t:standard-deviation|desvios}}: de cerca de {{n:var.ci.low.bi}} a cerca de {{n:var.ci.high.bi}}." }
      - { text: "Exatamente {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "Isso é só a média. O resultado oscila em torno dela algumas dezenas de {{t:buy-in|buy-ins}} para os dois lados." }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Após {{n:var.hands.k}} mil mãos ({{n:var.blocks}} blocos de 100) com {{t:standard-deviation|desvio}} de {{n:var.sd}}: qual é o erro padrão do seu winrate em bb/100? Considere √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Digite um número."
    answer: var.se.wr
    explanation: "Erro padrão = SD ÷ √(número de blocos) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. O intervalo de {{n:var.conf95}} é ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}."
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "Após {{n:var.hands.k}} mil mãos, seu resultado é {{n:var.wr.ex}}, {{t:standard-deviation|desvio}} de {{n:var.sd}}. O que você sabe sobre o seu winrate real?"
    options:
      - { text: "Com cerca de {{n:var.conf95}} de confiança, está entre cerca de {{n:var.wr.ci.low}} e cerca de {{n:var.wr.ci.high}}", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Após {{n:var.hands.k}} mil mãos, você só sabe que provavelmente não está perdendo." }
      - { text: "É {{n:var.wr.ex}}, porque a amostra é grande", why: "{{n:var.hands.k}} mil mãos parece muito, mas com {{t:standard-deviation|desvio}} de {{n:var.sd}} o erro ainda é de cerca de ± {{n:var.ci.wr}}." }
      - { text: "Nada, resultado no pôquer é pura sorte", why: "Exagero. A amostra estreita o intervalo, só que devagar: o erro diminui com a raiz quadrada do número de mãos." }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Você quer saber o seu winrate com precisão de ± {{n:var.target}} e {{n:var.conf95}} de confiança. O {{t:standard-deviation|desvio}} é de {{n:var.sd}}. De quantas mãos você precisa?"
    options:
      - { text: "Cerca de {{n:var.need.hands.k}} mil", correct: true, why: "Blocos = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. Isso dá cerca de {{n:var.need.hands.k}} mil mãos." }
      - { text: "Cerca de {{n:var.hands.k}} mil", why: "Após {{n:var.hands.k}} mil mãos, o erro é de cerca de ± {{n:var.ci.wr}}. Para reduzi-lo a ± {{n:var.target}}, você precisa de cerca de {{n:var.need.hands.k}} mil mãos." }
      - { text: "Cerca de {{n:var.need.blocks}} mãos", why: "Esse é o número de blocos de 100 mãos. As mãos são cem vezes mais: cerca de {{n:var.need.hands.k}} mil." }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Um jogador ganha {{n:var.wr.ex}} com {{t:standard-deviation|desvio}} de {{n:var.sd}}. Com que frequência, ao longo de {{n:var.hands.k}} mil mãos, ele terá um {{t:downswing}} de pelo menos {{n:dd.bi.small}} {{t:buy-in|buy-ins}} a partir do ponto mais alto?"
    options:
      - { text: "Quase sempre, cerca de {{n:dd.p.small.100k}}", correct: true, why: "Uma simulação de {{n:var.hands.k}} mil mãos com esses parâmetros produz esse {{t:downswing}} em cerca de {{n:dd.p.small.100k}} das execuções. Um {{t:downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} é parte normal do jogo de um jogador vencedor." }
      - { text: "Em cerca de {{n:dd.p.small.20k}} dos casos", why: "Esse é o valor para uma amostra menor, de {{n:dd.hands.short.k}} mil mãos. Em {{n:var.hands.k}} mil mãos, há muito mais chances de um {{t:downswing}} profundo: cerca de {{n:dd.p.small.100k}}." }
      - { text: "Raramente, cerca de {{n:var.p.lose}}", why: "É com essa raridade que um jogador de {{n:var.wr.ex}} termina {{n:var.hands.k}} mil mãos no prejuízo. Um {{t:downswing}} no caminho é outra coisa: acontece quase sempre." }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Dois jogadores, {{t:standard-deviation|desvio}} de {{n:var.sd}}, {{n:var.hands.k}} mil mãos. Um ganha {{n:var.wr.ex}}, o outro {{n:dd.wr-low}}. Com que frequência cada um deles terá um {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}}?"
    options:
      - { text: "O primeiro em cerca de {{n:dd.p.big.100k}}, o segundo em cerca de {{n:dd.p.big.100k.wr-low}} dos casos", correct: true, why: "Um winrate menor puxa o resultado para cima com menos força, então os {{t:downswing|downswings}} são mais profundos e mais frequentes. Com {{n:dd.wr-low}}, típico de jogadores vencedores nos microlimites, um {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} acontece em mais da metade das amostras." }
      - { text: "Os dois com a mesma frequência, porque o {{t:standard-deviation|desvio}} é o mesmo", why: "O {{t:standard-deviation|desvio}} determina as oscilações, mas o winrate determina a rapidez com que o resultado se afasta delas. Com {{n:dd.wr-low}}, um {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} acontece em cerca de {{n:dd.p.big.100k.wr-low}} das amostras; com {{n:var.wr.ex}}, em cerca de {{n:dd.p.big.100k}}." }
      - { text: "Nenhum: um {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} só acontece com jogadores perdedores", why: "Falso. Mesmo um jogador de {{n:var.wr.ex}} passa por um em cerca de {{n:dd.p.big.100k}} das amostras de {{n:var.hands.k}} mil mãos." }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Há um mês você está {{n:dd.bi.small}} {{t:buy-in|buy-ins}} no negativo. O que isso significa?"
    options:
      - { text: "O {{t:downswing}} sozinho não prova nada; revise suas decisões nas mãos perdidas", correct: true, why: "Um {{t:downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} ao longo de {{n:var.hands.k}} mil mãos atinge quase todo jogador que ganha de {{n:dd.wr-low}} a {{n:var.wr.ex}} (simulação com SD {{n:var.sd}}). O que mostra se você joga bem é a revisão das decisões, e não o resultado sozinho." }
      - { text: "Você está jogando mal e precisa mudar todo o seu estilo de jogo", why: "{{t:downswing|Downswings}} desse tamanho acontecem com jogadores que ganham {{n:var.wr.ex}} (SD {{n:var.sd}}) em cerca de {{n:dd.p.small.100k}} das amostras de {{n:var.hands.k}} mil mãos. Mudar o estilo só por causa do resultado é reagir ao ruído." }
      - { text: "Com certeza é azar, não há nada para revisar", why: "Um {{t:downswing}} também pode vir de erros. O resultado não distingue azar de erro, mas a revisão das mãos pode fazer isso." }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "Que {{t:standard-deviation|desvio padrão}} é típico no cash game 6-max de No-Limit Hold'em?"
    options:
      - { text: "Cerca de {{n:var.sd.low}}–{{n:var.sd.high}}", correct: true, why: "É o que informam as calculadoras de {{t:variance|variância}}. O valor típico mais adotado é de cerca de {{n:var.sd}}. Um estilo agressivo dá um {{t:standard-deviation|desvio}} maior." }
      - { text: "Cerca de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "Esse é o winrate típico de jogadores vencedores nos microlimites. O {{t:standard-deviation|desvio}} é dezenas de vezes maior que o winrate, e por isso os resultados oscilam tanto." }
      - { text: "Cerca de {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}} a cada 100 mãos", why: "Esse é o {{t:standard-deviation|desvio}} do resultado após {{n:var.hands.k}} mil mãos, e não a cada 100 mãos." }
---
Seu resultado no pôquer é a soma de duas coisas: o quanto você joga bem e a sorte. Os dois componentes podem ser medidos. O winrate diz quanto você ganha em média, e o {{t:standard-deviation|desvio padrão}}, o quanto o resultado oscila em torno dessa média.

## Dois números em bb/100

**Winrate** é o lucro médio a cada 100 mãos, em {{t:big-blind|big blinds}}. Jogadores vencedores nos microlimites costumam ter {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.

**{{t:standard-deviation|Desvio padrão}} (SD)** é a dispersão típica do resultado a cada 100 mãos. No cash game 6-max, costuma ficar em {{n:var.sd.low}}–{{n:var.sd.high}}, e o valor típico adotado é {{n:var.sd}}. O {{t:standard-deviation|desvio}} é dezenas de vezes maior que o winrate, então o resultado de uma {{t:session|sessão}}, ou mesmo de um mês, diz muito pouco.

## O resultado depois de muitas mãos

Divida o número de mãos por 100 para obter o número de blocos.

```formula
resultado esperado = winrate × número de blocos
desvio do resultado = SD × √(número de blocos)
intervalo de {{n:var.conf95}} = resultado esperado ± {{n:var.z95}} × desvio do resultado
```

Exemplo: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}} mil mãos, ou seja, {{n:var.blocks}} blocos. Você espera {{n:var.exp.bb}}, ou seja, {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. O {{t:standard-deviation|desvio}} do resultado é {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, ou seja, cerca de {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}. Com {{n:var.conf95}} de confiança, você vai terminar entre cerca de **{{n:var.ci.low.bi}} e {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}**. O resultado esperado fica cerca de {{n:var.z.lose}} {{t:standard-deviation|desvios}} acima de zero, então a chance de você estar no prejuízo após {{n:var.hands.k}} mil mãos é de cerca de {{n:var.p.lose}}.

## Quantas mãos para conhecer o seu winrate

A mesma conta funciona no sentido inverso. O erro na estimativa do winrate diminui com a raiz quadrada do número de mãos:

```formula
erro do winrate = SD ÷ √(número de blocos)
blocos necessários = ({{n:var.z95}} × SD ÷ precisão)²
```

Após {{n:var.hands.k}} mil mãos, o erro é de cerca de {{n:var.se.wr}}, então o intervalo de {{n:var.conf95}} é ± {{n:var.ci.wr}}. Um resultado de {{n:var.wr.ex}} significa, então, apenas que o seu winrate real está em algum ponto entre cerca de {{n:var.wr.ci.low}} e {{n:var.wr.ci.high}}. Para conhecer o seu winrate com precisão de ± {{n:var.target}}, você precisa de cerca de **{{n:var.need.hands.k}} mil mãos**.

## {{t:downswing|Downswings}} são normais

{{t:downswing|Downswing}} é a queda do resultado a partir do ponto mais alto. Simulação de um jogador de {{n:var.wr.ex}} com SD {{n:var.sd}}:

| {{t:downswing|Downswing}} a partir do pico | Em {{n:dd.hands.short.k}} mil mãos | Em {{n:var.hands.k}} mil mãos | Em {{n:var.hands.k}} mil mãos com {{n:dd.wr-low}} |
|---|---|---|---|
| {{n:dd.bi.small}} {{t:buy-in|buy-ins}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} {{t:buy-in|buy-ins}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note De onde vêm esses números
Resultados de simulação: milhares de execuções de {{n:var.hands.k}} mil mãos cada, com resultado aleatório em cada bloco. {{t:downswing|Downswings}} reais podem ser um pouco mais profundos, porque o resultado muda a cada mão, e não a cada 100 mãos. Conclusão: um {{t:downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} não prova que você está jogando mal.
:::

Estas são orientações gerais, não uma garantia de resultado. Se o jogo deixar de estar sob controle, consulte a tela “Ajuda”.
