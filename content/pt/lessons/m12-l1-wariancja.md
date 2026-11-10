---
id: m12.l1
module: m12
order: 1
title: "Variância em números"
sub: "O que diz um resultado ao longo de milhares de mãos"
rules: [R-M12-001, R-M12-002, R-M12-003]
drills:
  - kind: numeric
    id: m12.l1.n-expected
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Ganha, em média, {{n:var.wr.ex}} e vai jogar {{n:var.hands.k}} mil mãos. A quantos {{t:buy-in|buy-ins}} (de {{n:format.stack}} cada) corresponde o seu resultado esperado? Introduza um número."
    answer: var.exp.bi
    explanation: "{{n:var.hands.k}} mil mãos são {{n:var.blocks}} blocos de 100 mãos. Resultado esperado = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, ou seja, {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. Trata-se de uma média: o resultado real pode afastar-se muito dela."
  - kind: choice
    id: m12.l1.q-sd-result
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "O {{t:standard-deviation|desvio-padrão}} do seu jogo é {{n:var.sd}}. Qual é o {{t:standard-deviation|desvio}} do resultado após {{n:var.hands.k}} mil mãos ({{n:var.blocks}} blocos de 100 mãos)?"
    options:
      - { text: "Cerca de {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "O {{t:standard-deviation|desvio}} cresce com a raiz quadrada do número de blocos: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, ou seja, cerca de {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
      - { text: "Cerca de {{n:var.sd.wrong.bi}} {{t:buy-in|buy-ins}}", why: "É o que se obtém ao multiplicar o {{t:standard-deviation|desvio}} pelo número de blocos. As oscilações aleatórias anulam-se em parte, por isso multiplica-se pela raiz quadrada: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}." }
      - { text: "Cerca de {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "Esse é o resultado esperado com {{n:var.wr.ex}}, e não o seu {{t:standard-deviation|desvio}}. O {{t:standard-deviation|desvio}} é de cerca de {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}." }
  - kind: choice
    id: m12.l1.q-ci95
    family: m12.result-range
    rules: [R-M12-001]
    prompt: "Ganha {{n:var.wr.ex}} com um {{t:standard-deviation|desvio}} de {{n:var.sd}}. Em que intervalo ficará o seu resultado após {{n:var.hands.k}} mil mãos, com cerca de {{n:var.conf95}} de certeza?"
    options:
      - { text: "De cerca de {{n:var.ci.low.bi}} a cerca de {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}", correct: true, why: "Resultado esperado de {{n:var.exp.bi}} {{t:buy-in|buy-ins}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Mesmo um jogador claramente vencedor pode estar perto do zero após {{n:var.hands.k}} mil mãos." }
      - { text: "De cerca de {{n:var.ci68.low.bi}} a cerca de {{n:var.ci68.high.bi}} {{t:buy-in|buy-ins}}", why: "Esse é o intervalo de um {{t:standard-deviation|desvio}}: abrange apenas cerca de 2 em cada 3 resultados. Para {{n:var.conf95}}, consideram-se {{n:var.z95}} {{t:standard-deviation|desvios}}: de cerca de {{n:var.ci.low.bi}} a cerca de {{n:var.ci.high.bi}}." }
      - { text: "Exatamente {{n:var.exp.bi}} {{t:buy-in|buy-ins}}", why: "Isso é apenas a média. O resultado oscila em torno dela algumas dezenas de {{t:buy-in|buy-ins}} para cada lado." }
  - kind: numeric
    id: m12.l1.n-se
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Após {{n:var.hands.k}} mil mãos ({{n:var.blocks}} blocos de 100), com um {{t:standard-deviation|desvio}} de {{n:var.sd}}: qual é o erro-padrão do seu winrate em bb/100? Considere √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Introduza um número."
    answer: var.se.wr
    explanation: "Erro-padrão = SD ÷ √(número de blocos) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. O intervalo de {{n:var.conf95}} é ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}."
  - kind: choice
    id: m12.l1.q-winrate-ci
    family: m12.winrate-sample
    rules: [R-M12-001]
    prompt: "Após {{n:var.hands.k}} mil mãos, o seu resultado é {{n:var.wr.ex}}, {{t:standard-deviation|desvio}} {{n:var.sd}}. O que sabe sobre o seu verdadeiro winrate?"
    options:
      - { text: "Com cerca de {{n:var.conf95}} de certeza, situa-se entre cerca de {{n:var.wr.ci.low}} e cerca de {{n:var.wr.ci.high}}", correct: true, why: "{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Após {{n:var.hands.k}} mil mãos, sabe apenas que provavelmente não está a perder." }
      - { text: "É {{n:var.wr.ex}}, porque a amostra é grande", why: "{{n:var.hands.k}} mil mãos parece muito, mas com um {{t:standard-deviation|desvio}} de {{n:var.sd}}, o erro continua a ser de cerca de ± {{n:var.ci.wr}}." }
      - { text: "Nada, o resultado no póquer é pura sorte", why: "Exagero. A amostra estreita o intervalo, só que devagar: o erro diminui com a raiz quadrada do número de mãos." }
  - kind: choice
    id: m12.l1.q-hands-needed
    family: m12.winrate-sample
    rules: [R-M12-003]
    prompt: "Quer conhecer o seu winrate com uma precisão de ± {{n:var.target}} e {{n:var.conf95}} de certeza. O {{t:standard-deviation|desvio}} é de {{n:var.sd}}. De quantas mãos precisa?"
    options:
      - { text: "Cerca de {{n:var.need.hands.k}} mil", correct: true, why: "Blocos = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. Isto corresponde a cerca de {{n:var.need.hands.k}} mil mãos." }
      - { text: "Cerca de {{n:var.hands.k}} mil", why: "Após {{n:var.hands.k}} mil mãos, o erro é de cerca de ± {{n:var.ci.wr}}. Para o reduzir para ± {{n:var.target}}, precisa de cerca de {{n:var.need.hands.k}} mil mãos." }
      - { text: "Cerca de {{n:var.need.blocks}} mãos", why: "Esse é o número de blocos de 100 mãos. As mãos são cem vezes mais: cerca de {{n:var.need.hands.k}} mil." }
  - kind: choice
    id: m12.l1.q-dd-100k
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Um jogador ganha {{n:var.wr.ex}} com um {{t:standard-deviation|desvio}} de {{n:var.sd}}. Com que frequência, ao longo de {{n:var.hands.k}} mil mãos, terá um {{t:downswing}} de pelo menos {{n:dd.bi.small}} {{t:buy-in|buy-ins}} a partir do ponto mais alto?"
    options:
      - { text: "Quase sempre, cerca de {{n:dd.p.small.100k}}", correct: true, why: "Uma simulação de {{n:var.hands.k}} mil mãos com estes parâmetros produz um {{t:downswing}} assim em cerca de {{n:dd.p.small.100k}} das execuções. Um {{t:downswing|downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} é uma parte normal do jogo de um jogador vencedor." }
      - { text: "Em cerca de {{n:dd.p.small.20k}} dos casos", why: "Esse é o valor para uma amostra mais curta, de {{n:dd.hands.short.k}} mil mãos. Em {{n:var.hands.k}} mil mãos, há muito mais hipóteses de um {{t:downswing}} profundo: cerca de {{n:dd.p.small.100k}}." }
      - { text: "Raramente, cerca de {{n:var.p.lose}}", why: "É com esta raridade que um jogador de {{n:var.wr.ex}} termina {{n:var.hands.k}} mil mãos no negativo. Um {{t:downswing|downswing}} pelo caminho é outra coisa: acontece quase sempre." }
  - kind: choice
    id: m12.l1.q-dd-wr-low
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Dois jogadores, {{t:standard-deviation|desvio}} {{n:var.sd}}, {{n:var.hands.k}} mil mãos. Um ganha {{n:var.wr.ex}}, o outro {{n:dd.wr-low}}. Com que frequência cada um deles sofrerá um {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}}?"
    options:
      - { text: "O primeiro em cerca de {{n:dd.p.big.100k}}, o segundo em cerca de {{n:dd.p.big.100k.wr-low}} dos casos", correct: true, why: "Um winrate mais baixo puxa o resultado para cima com menos força, por isso os {{t:downswing|downswings}} são mais profundos e mais frequentes. Com {{n:dd.wr-low}}, típico dos vencedores nos microlimites, um {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} acontece em mais de metade das amostras." }
      - { text: "Ambos com a mesma frequência, porque o {{t:standard-deviation|desvio}} é o mesmo", why: "O {{t:standard-deviation|desvio}} determina as oscilações, mas o winrate determina a rapidez com que o resultado se afasta delas. Com {{n:dd.wr-low}}, um {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} acontece em cerca de {{n:dd.p.big.100k.wr-low}} das amostras; com {{n:var.wr.ex}}, em cerca de {{n:dd.p.big.100k}}." }
      - { text: "Nenhum: um {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} só acontece a jogadores perdedores", why: "Falso. Mesmo um jogador de {{n:var.wr.ex}} sofre-o em cerca de {{n:dd.p.big.100k}} das amostras de {{n:var.hands.k}} mil mãos." }
  - kind: choice
    id: m12.l1.q-dd-meaning
    family: m12.downswing
    rules: [R-M12-002]
    prompt: "Há um mês que está {{n:dd.bi.small}} {{t:buy-in|buy-ins}} abaixo de zero. O que se conclui daí?"
    options:
      - { text: "O {{t:downswing}}, por si só, não determina nada; revê as decisões nas mãos perdidas", correct: true, why: "Um {{t:downswing|downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} ao longo de {{n:var.hands.k}} mil mãos atinge quase todos os jogadores que ganham entre {{n:dd.wr-low}} e {{n:var.wr.ex}} (simulação com SD {{n:var.sd}}). Se joga bem ou não, mostra-o a revisão das decisões, e não o resultado por si só." }
      - { text: "Está a jogar mal e tem de mudar todo o seu estilo de jogo", why: "{{t:downswing|Downswings}} desta dimensão acontecem a jogadores que ganham {{n:var.wr.ex}} (SD {{n:var.sd}}) em cerca de {{n:dd.p.small.100k}} das amostras de {{n:var.hands.k}} mil mãos. Mudar de estilo só por causa do resultado é reagir ao ruído." }
      - { text: "Certamente está com azar, não precisa de rever nada", why: "Um {{t:downswing|downswing}} também pode resultar de erros. O resultado não distingue o azar do erro, mas a revisão das mãos pode fazê-lo." }
  - kind: choice
    id: m12.l1.q-sd-typical
    family: m12.sd-concept
    rules: [R-M12-001]
    prompt: "Que {{t:standard-deviation|desvio-padrão}} é típico num cash game 6-max de No-Limit Hold'em?"
    options:
      - { text: "Cerca de {{n:var.sd.low}}–{{n:var.sd.high}}", correct: true, why: "É o que indicam as calculadoras de {{t:variance|variância}}. Como valor típico, assume-se mais frequentemente cerca de {{n:var.sd}}. Um estilo agressivo produz um {{t:standard-deviation|desvio}} mais elevado." }
      - { text: "Cerca de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "Esse é o winrate típico dos jogadores vencedores nos microlimites. O {{t:standard-deviation|desvio}} é dezenas de vezes maior do que o winrate e é por isso que os resultados oscilam tanto." }
      - { text: "Cerca de {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}} por 100 mãos", why: "Esse é o {{t:standard-deviation|desvio}} do resultado após {{n:var.hands.k}} mil mãos, e não por 100 mãos." }
---
O seu resultado no póquer é a soma de duas coisas: da qualidade do seu jogo e da sorte. Ambas as componentes podem ser medidas. O winrate indica quanto ganha em média, e o {{t:standard-deviation|desvio-padrão}} indica o quanto o resultado oscila em torno dessa média.

## Dois números em bb/100

O **winrate** é o lucro médio por 100 mãos em {{t:big-blind|big blinds}}. Os jogadores vencedores nos microlimites têm normalmente {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.

O **{{t:standard-deviation|desvio-padrão}} (SD)** é a dispersão típica do resultado por 100 mãos. Nos cash games 6-max situa-se normalmente entre {{n:var.sd.low}}–{{n:var.sd.high}}, e assume-se {{n:var.sd}} como valor típico. O {{t:standard-deviation|desvio}} é dezenas de vezes maior do que o winrate, por isso o resultado de uma {{t:session|sessão}}, ou mesmo de um mês, diz muito pouco.

## O resultado ao longo de muitas mãos

Divida o número de mãos por 100 para obter o número de blocos.

```formula
resultado esperado = winrate × número de blocos
desvio do resultado = SD × √(número de blocos)
intervalo de {{n:var.conf95}} = resultado esperado ± {{n:var.z95}} × desvio do resultado
```

Exemplo: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}} mil mãos, ou seja, {{n:var.blocks}} blocos. Espera {{n:var.exp.bb}}, ou seja, {{n:var.exp.bi}} {{t:buy-in|buy-ins}}. O {{t:standard-deviation|desvio}} do resultado é {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, ou seja, cerca de {{n:var.sd.result.bi}} {{t:buy-in|buy-ins}}. Com {{n:var.conf95}} de certeza, terminará entre cerca de **{{n:var.ci.low.bi}} e {{n:var.ci.high.bi}} {{t:buy-in|buy-ins}}**. O resultado esperado situa-se cerca de {{n:var.z.lose}} {{t:standard-deviation|desvios}} acima de zero, por isso a probabilidade de estar no negativo após {{n:var.hands.k}} mil mãos é de cerca de {{n:var.p.lose}}.

## Quantas mãos para conhecer o seu winrate

O mesmo cálculo funciona no sentido inverso. O erro da estimativa do winrate diminui com a raiz quadrada do número de mãos:

```formula
erro do winrate = SD ÷ √(número de blocos)
blocos necessários = ({{n:var.z95}} × SD ÷ precisão)²
```

Após {{n:var.hands.k}} mil mãos, o erro é de cerca de {{n:var.se.wr}}, por isso o intervalo de {{n:var.conf95}} é ± {{n:var.ci.wr}}. Um resultado de {{n:var.wr.ex}} significa então apenas que o verdadeiro winrate se situa algures entre cerca de {{n:var.wr.ci.low}} e {{n:var.wr.ci.high}}. Para conhecer o winrate com uma precisão de ± {{n:var.target}}, precisa de cerca de **{{n:var.need.hands.k}} mil mãos**.

## Os {{t:downswing|downswings}} são normais

Um {{t:downswing|downswing}} é uma descida do resultado a partir do ponto mais alto. Simulação de um jogador de {{n:var.wr.ex}} com SD {{n:var.sd}}:

| {{t:downswing|Downswing}} a partir do pico | Em {{n:dd.hands.short.k}} mil mãos | Em {{n:var.hands.k}} mil mãos | Em {{n:var.hands.k}} mil mãos com {{n:dd.wr-low}} |
|---|---|---|---|
| {{n:dd.bi.small}} {{t:buy-in|buy-ins}} | {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}} |
| {{n:dd.bi.big}} {{t:buy-in|buy-ins}} | — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}} |

:::note Origem destes números
Resultados de simulação: milhares de execuções de {{n:var.hands.k}} mil mãos cada, com um resultado aleatório para cada bloco. Os {{t:downswing|downswings}} reais podem ser um pouco mais profundos, porque o resultado muda a cada mão, e não a cada 100 mãos. Conclusão: um {{t:downswing}} de {{n:dd.bi.small}} {{t:buy-in|buy-ins}} não prova que está a jogar mal.
:::

Estas são indicações gerais, não uma garantia de resultados. Se o jogo deixar de estar sob controlo, consulte o ecrã «Ajuda».
