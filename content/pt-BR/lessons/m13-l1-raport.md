---
id: m13.l1
module: m13
order: 1
title: "Como ler o relatório de jogo"
sub: "Decisão, resultado e níveis de avaliação"
rules: [R-M12-004, R-M13-001, R-M13-002]
drills:
  - kind: numeric
    id: m13.l1.n-lose
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Você vai all-in com {{n:m13.eq.example}} de {{t:equity}} e perde. Em que porcentagem dessas mãos você perde apesar de uma boa decisão? Digite um número."
    answer: m13.lose.example
    explanation: "Você perde em 1 − e das mãos: o total menos {{n:m13.eq.example}} dá {{n:m13.lose.example}}. Essa derrota não diz nada sobre a decisão."
  - kind: numeric
    id: m13.l1.n-of-ten
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Você vai all-in dez vezes com {{n:m13.eq.example}} de {{t:equity}}. Quantas dessas mãos você vai perder, em média? Digite um número."
    answer: m13.lose.of-ten
    explanation: "{{n:m13.ten}} × {{n:m13.lose.example}} = {{n:m13.lose.of-ten}}. Se você perder duas vezes seguidas, isso ainda está dentro da conta."
  - kind: numeric
    id: m13.l1.n-lose2
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Você tem {{n:m13.eq.example2}} de {{t:equity}} num all-in. Em que porcentagem dessas mãos você perde? Digite um número."
    answer: m13.lose.example2
    explanation: "O total menos {{n:m13.eq.example2}} dá {{n:m13.lose.example2}}: você perde mais ou menos uma em cada três dessas mãos, e a decisão continua sendo boa."
  - kind: choice
    id: m13.l1.q-mixed
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "Neste spot, o solver joga sua mão mais ou menos meio a meio: com {{t:raise|raise}} ou com {{t:fold|fold}}. Você deu {{t:fold|fold}}. Como o relatório vai avaliar isso?"
    options:
      - { text: "Alinhada", correct: true, why: "Sim: uma ação que o solver joga em pelo menos {{n:range.mixed.low}} dos casos é alinhada. No equilíbrio, o jogador só mistura jogadas com o mesmo {{t:expected-value|valor esperado}}, então as duas estão corretas." }
      - { text: "Erro, porque era preciso dar {{t:raise|raise}}", why: "Não: numa {{t:mixed-hand|mão mista}}, as duas jogadas têm o mesmo {{t:expected-value|valor esperado}}. O relatório não pune a escolha de uma delas." }
      - { text: "Sem avaliação", why: "Não: o spot tem resultado do solver, então a decisão é avaliada. Recebe “sem avaliação” a decisão para a qual o app não tem uma regra verificável." }
  - kind: choice
    id: m13.l1.q-rare
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "O solver joga sua mão com {{t:raise|raise}} em cerca de {{n:range.mixed.high}} dos casos e com {{t:call|call}} no restante. Você deu {{t:call|call}}. Qual é o veredito?"
    options:
      - { text: "Alinhada", correct: true, why: "Sim: o {{t:call}} jogado em cerca de {{n:range.mixed.low}} dos casos não fica abaixo do limite de alinhada ({{n:range.mixed.low}}). É uma {{t:mixed-hand|mão mista}}." }
      - { text: "Aceitável", why: "Aceitável é a ação jogada em pelo menos {{n:range.mixed.min}}, mas com menos frequência do que em {{n:range.mixed.low}} dos casos. Aqui o {{t:call}} chega ao limite de alinhada." }
      - { text: "Erro", why: "Erro é uma ação que o solver não joga nunca. Uma ação jogada com menos frequência do que em {{n:range.mixed.min}} dos casos é uma imprecisão." }
  - kind: choice
    id: m13.l1.q-size
    family: m13.verdicts
    rules: []
    prompt: "Num spot em que o solver joga 3-bet, você dá 3-bet, mas num tamanho diferente do que a regra recomenda. Qual é o veredito?"
    options:
      - { text: "Imprecisão", correct: true, why: "Sim: ação boa, tamanho errado. Conta como erro e volta nas revisões, mas o relatório mostra uma explicação separada sobre o tamanho." }
      - { text: "Alinhada", why: "A ação é boa, mas o tamanho importa: um 3-bet pequeno demais dá ao adversário um bom preço, e um grande demais arrisca mais do que o necessário." }
      - { text: "Erro", why: "Erro é o que recebe uma ação errada. Uma ação boa com o tamanho errado é um nível à parte: imprecisão." }
  - kind: choice
    id: m13.l1.q-unrated
    family: m13.verdicts
    rules: []
    prompt: "Relatório: “14 de 30 decisões avaliadas”. O que significam as demais decisões?"
    options:
      - { text: "O app não tinha para elas uma regra verificável nem resultado do solver", correct: true, why: "Sim: “sem avaliação” não significa “bem jogado”. Essas decisões podem ter sido boas ou ruins; o relatório não sabe e diz isso abertamente." }
      - { text: "Foram boas, então o relatório não as mostra", why: "Não: o relatório conta as decisões boas como alinhadas. “Sem avaliação” é falta de avaliação, não elogio." }
      - { text: "Eram fáceis demais para serem avaliadas", why: "Não tem a ver com dificuldade. São avaliadas as decisões para as quais o app tem uma regra com condição ou um spot do solver." }
  - kind: choice
    id: m13.l1.q-result
    family: m13.result
    rules: [R-M12-004]
    prompt: "Depois de uma {{t:session|sessão}}, você ganhou bastantes {{t:chips|fichas}}, mas o relatório mostra cinco erros. O que diz mais sobre o seu jogo?"
    options:
      - { text: "A avaliação das decisões", correct: true, why: "Sim: algumas dezenas de mãos são poucas demais para o resultado dizer alguma coisa. Mesmo depois de milhares de mãos, o resultado é em grande parte ruído, e cada erro tem seu custo, não importa como a mão terminou." }
      - { text: "O resultado em {{t:chips|fichas}}", why: "O resultado de uma {{t:session|sessão}} curta depende principalmente das cartas. É justamente por isso que o relatório o mostra em fonte menor." }
      - { text: "Os dois igualmente", why: "Um resultado de algumas dezenas de mãos quase não diz nada sobre habilidade. Uma decisão avaliada por uma regra ou pelo solver diz muito mais." }
---
O relatório após a {{t:session|sessão}} avalia suas decisões, e não quanto você ganhou. Esta lição explica como lê-lo.

## Decisão, não resultado

No módulo sobre mental game, você conheceu o princípio: você avalia a decisão pelas informações que tinha no momento da decisão, e não pelo resultado da mão. O relatório aplica isso ao pé da letra: avalia a situação antes da sua ação e não vê as cartas dos adversários nem as cartas que saíram depois.

Perder com a mão melhor está dentro da conta. {{t:equity|Equity}} é a fração de vitórias em muitas repetições da mesma situação. Com {{n:m13.eq.example}} de {{t:equity}}, você perde em cerca de {{n:m13.lose.example}} das mãos, ou seja, em média {{n:m13.lose.of-ten}} em {{n:m13.ten}}.

```formula
chance de perder = 1 − equity
```

## Níveis de avaliação

- **Alinhada**: a ação que a regra recomenda, ou uma que o solver joga em pelo menos {{n:range.mixed.low}} dos casos (esse limite é uma configuração do app).
- **Aceitável**: o solver a joga raramente (pelo menos {{n:range.mixed.min}}, mas com menos frequência do que {{n:range.mixed.low}}), ou a regra fala de frequência (“com frequência”, “com menos frequência”) e você escolheu a opção menos frequente. Isso não é erro.
- **Imprecisão**: ação boa, tamanho errado, ou uma ação que o solver joga, mas com menos frequência do que em {{n:range.mixed.min}} dos casos. Conta como erro: isso é uma configuração do app, não teoria.
- **Erro**: uma ação que contraria uma regra formulada de modo categórico, ou uma que o solver não joga nunca.
- **Sem avaliação**: o app não tem uma regra verificável para essa decisão. Isso não significa “bem jogado”.
- **Tempo esgotado**: com o limite de tempo ativado, o app jogou por você. Essa decisão não conta para a avaliação, mas volta nas revisões.

No topo do relatório aparece a contagem “X de Y decisões avaliadas”. Depois do flop, muitas decisões ficam sem avaliação, porque a maioria das regras de turn e river fala das frequências do {{t:range|range}} inteiro, e não de uma única mão.

## {{t:mixed-hand|Mão mista}}

Quando o solver joga sua mão de duas maneiras, as duas estão corretas. A teoria do equilíbrio explica isso pelo princípio da indiferença: o jogador só mistura jogadas que têm o mesmo {{t:expected-value|valor esperado}}. Por isso o relatório não pune a escolha de uma delas e marca a jogada menos frequente como aceitável quando o solver a joga em pelo menos {{n:range.mixed.min}} dos casos; com menos frequência que isso, é imprecisão (configuração do app).

## Resultado em {{t:chips|fichas}}

O resultado fica no fim do relatório, em fonte pequena. Segundo a conta da lição sobre {{t:variance|variância}}, depois de cerca de {{n:m13.noise.hands.k}} mil mãos o intervalo de {{n:var.conf95}} do winrate é de cerca de ± {{n:m13.noise.ci}}, então o resultado é quase puro ruído: um jogador vencedor pode estar no negativo, e um perdedor, bem no positivo. Uma {{t:session|sessão}} tem algumas dezenas de mãos, então o resultado quase não diz nada sobre o seu jogo.

:::note De onde vêm esses princípios
Princípio da indiferença: materiais sobre os fundamentos da teoria do equilíbrio. O limite de jogada rara e o nome “imprecisão”: material sobre como avaliar o próprio jogo em relação ao solver. O limite de {{n:range.mixed.low}} é uma configuração do app, sem fonte. A {{t:variance|variância}} do resultado e a chance de perder são cálculo.
:::
