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
    prompt: "Faz all-in com {{t:equity}} de {{n:m13.eq.example}} e perde. Em que percentagem destas mãos perde, apesar de uma boa decisão? Introduza um número."
    answer: m13.lose.example
    explanation: "Perde em 1 − e das mãos: o total menos {{n:m13.eq.example}} dá {{n:m13.lose.example}}. Esta derrota não diz nada sobre a decisão."
  - kind: numeric
    id: m13.l1.n-of-ten
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Faz all-in dez vezes com {{t:equity}} de {{n:m13.eq.example}}. Quantas destas mãos perderá, em média? Introduza um número."
    answer: m13.lose.of-ten
    explanation: "{{n:m13.ten}} × {{n:m13.lose.example}} = {{n:m13.lose.of-ten}}. Se perder duas vezes seguidas, isso continua dentro das contas."
  - kind: numeric
    id: m13.l1.n-lose2
    family: m13.equity-loss
    rules: [R-M13-001]
    prompt: "Tem {{t:equity}} de {{n:m13.eq.example2}} num all-in. Em que percentagem destas mãos perde? Introduza um número."
    answer: m13.lose.example2
    explanation: "O total menos {{n:m13.eq.example2}} dá {{n:m13.lose.example2}}: perde mais ou menos uma em cada três destas mãos, e a decisão continua a ser boa."
  - kind: choice
    id: m13.l1.q-mixed
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "Neste spot, o solver joga a sua mão mais ou menos em partes iguais: {{t:raise|aumentar}} ou {{t:fold|desistir}}. {{t:fold|Desistiu}}. Como avaliará isto o relatório?"
    options:
      - { text: "Conforme", correct: true, why: "Sim: uma ação jogada pelo solver em pelo menos {{n:range.mixed.low}} dos casos é conforme. Em equilíbrio, o jogador só mistura jogadas com o mesmo {{t:expected-value|valor esperado}}, por isso ambas são corretas." }
      - { text: "Erro, porque era preciso {{t:raise|aumentar}}", why: "Não: com uma {{t:mixed-hand|mão mista}}, ambas as jogadas têm o mesmo {{t:expected-value|valor esperado}}. O relatório não penaliza a escolha de uma delas." }
      - { text: "Sem avaliação", why: "Não: o spot tem resultado do solver, por isso a decisão é avaliada. «Sem avaliação» é atribuído a uma decisão para a qual a aplicação não tem uma regra verificável." }
  - kind: choice
    id: m13.l1.q-rare
    family: m13.verdicts
    rules: [R-M13-002]
    prompt: "O solver joga a sua mão com {{t:raise|aumento}} em cerca de {{n:range.mixed.high}} dos casos e com {{t:call|pagamento}} nos restantes. {{t:call|Pagou}}. Qual é o veredicto?"
    options:
      - { text: "Conforme", correct: true, why: "Sim: o {{t:call}} jogado em cerca de {{n:range.mixed.low}} dos casos não desce abaixo do limiar de conforme ({{n:range.mixed.low}}). É uma {{t:mixed-hand|mão mista}}." }
      - { text: "Aceitável", why: "É aceitável uma ação jogada em pelo menos {{n:range.mixed.min}}, mas com menos frequência do que em {{n:range.mixed.low}} dos casos. Aqui, o {{t:call}} atinge o limiar de conforme." }
      - { text: "Erro", why: "Erro é uma ação que o solver não joga de todo. Uma ação jogada com menos frequência do que em {{n:range.mixed.min}} dos casos é uma imprecisão." }
  - kind: choice
    id: m13.l1.q-size
    family: m13.verdicts
    rules: []
    prompt: "Num spot em que o solver joga 3-bet, faz 3-bet, mas com um tamanho diferente do recomendado pela regra. Qual é o veredicto?"
    options:
      - { text: "Imprecisão", correct: true, why: "Sim: ação boa, tamanho errado. Conta como erro e volta nas revisões, mas o relatório mostra uma explicação separada do tamanho." }
      - { text: "Conforme", why: "A ação é boa, mas o tamanho importa: um 3-bet demasiado pequeno dá ao adversário um bom preço, e um demasiado grande arrisca mais do que o necessário." }
      - { text: "Erro", why: "O erro é atribuído a uma ação errada. Uma ação boa com o tamanho errado é um nível à parte: imprecisão." }
  - kind: choice
    id: m13.l1.q-unrated
    family: m13.verdicts
    rules: []
    prompt: "Relatório: «Avaliadas 14 de 30 decisões». O que significam as restantes decisões?"
    options:
      - { text: "A aplicação não tinha para elas uma regra verificável nem um resultado do solver", correct: true, why: "Sim: «sem avaliação» não significa «bem». Estas decisões podem ter sido boas ou más; o relatório não o sabe e di-lo abertamente." }
      - { text: "Foram boas, por isso o relatório não as mostra", why: "Não: o relatório conta as decisões boas como conformes. «Sem avaliação» é ausência de avaliação, não um elogio." }
      - { text: "Eram demasiado fáceis para serem avaliadas", why: "Não se trata de dificuldade. São avaliadas as decisões para as quais a aplicação tem uma regra com condição ou um spot do solver." }
  - kind: choice
    id: m13.l1.q-result
    family: m13.result
    rules: [R-M12-004]
    prompt: "Depois da {{t:session|sessão}}, ganhou muitas {{t:chips|fichas}}, mas o relatório mostra cinco erros. O que diz mais sobre o seu jogo?"
    options:
      - { text: "A avaliação das decisões", correct: true, why: "Sim: algumas dezenas de mãos são demasiado poucas para o resultado dizer alguma coisa. Mesmo após milhares de mãos, o resultado é em grande parte ruído, e cada erro tem o seu custo, independentemente de como terminou a mão." }
      - { text: "O resultado em {{t:chips|fichas}}", why: "O resultado de uma {{t:session|sessão}} curta depende sobretudo das cartas. É precisamente por isso que o relatório o mostra em letra mais pequena." }
      - { text: "Ambos por igual", why: "O resultado de algumas dezenas de mãos quase nada diz sobre a habilidade. Uma decisão avaliada por uma regra ou pelo solver diz muito mais." }
---
O relatório após a {{t:session|sessão}} avalia as suas decisões, e não quanto ganhou. Esta lição explica como o ler.

## Decisão, não resultado

No módulo sobre mental game, conheceu o princípio: avalia a decisão com base na informação que tinha no momento da decisão, e não o resultado da mão. O relatório aplica-o à letra: avalia a situação anterior à sua ação e não vê as cartas dos adversários nem as cartas que saíram depois.

Perder com a melhor mão está dentro das contas. A {{t:equity|equity}} é a proporção de vitórias em muitas repetições da mesma situação. Com {{t:equity}} de {{n:m13.eq.example}}, perde em cerca de {{n:m13.lose.example}} das mãos, ou seja, em média {{n:m13.lose.of-ten}} em cada {{n:m13.ten}}.

```formula
probabilidade de perder = 1 − equity
```

## Níveis de avaliação

- **Conforme**: ação recomendada pela regra, ou jogada pelo solver em pelo menos {{n:range.mixed.low}} dos casos (este limiar é uma definição da aplicação).
- **Aceitável**: o solver joga-a raramente (pelo menos {{n:range.mixed.min}}, mas menos do que {{n:range.mixed.low}}), ou a regra fala de frequência («muitas vezes», «menos vezes») e escolheu a opção menos frequente. Não é um erro.
- **Imprecisão**: ação boa, tamanho errado, ou ação que o solver joga, mas com menos frequência do que em {{n:range.mixed.min}} dos casos. Conta como erro: é uma definição da aplicação, não teoria.
- **Erro**: ação contrária a uma regra formulada de forma categórica, ou que o solver não joga de todo.
- **Sem avaliação**: a aplicação não tem uma regra verificável para esta decisão. Isto não significa «bem».
- **Tempo esgotado**: com o limite de tempo ativado, a aplicação jogou por si. Esta decisão não conta para a avaliação, mas volta nas revisões.

No topo do relatório está a contagem «Avaliadas X de Y decisões». Depois do flop, muitas decisões ficam sem avaliação, porque a maioria das regras de turn e river fala de frequências de todo o {{t:range|range}}, e não de uma única mão.

## {{t:mixed-hand|Mão mista}}

Quando o solver joga a sua mão de duas formas, ambas são corretas. A teoria do equilíbrio explica-o com o princípio da indiferença: o jogador só mistura jogadas que têm o mesmo {{t:expected-value|valor esperado}}. Por isso, o relatório não penaliza a escolha de uma delas e marca a jogada menos frequente como aceitável quando o solver a joga em pelo menos {{n:range.mixed.min}} dos casos; com menos frequência, é imprecisão (definição da aplicação).

## Resultado em {{t:chips|fichas}}

O resultado está no fundo do relatório, em letra pequena. Segundo as contas da lição sobre a {{t:variance|variância}}, após cerca de {{n:m13.noise.hands.k}} mil mãos o intervalo de {{n:var.conf95}} para o winrate é de cerca de ± {{n:m13.noise.ci}}, por isso o resultado é quase só ruído: um jogador vencedor pode estar a perder, e um perdedor pode estar bem a ganhar. Uma {{t:session|sessão}} tem algumas dezenas de mãos, por isso o resultado quase nada diz sobre o seu jogo.

:::note De onde vêm estes princípios
Princípio da indiferença: materiais sobre os fundamentos da teoria do equilíbrio. Limiar de jogada rara e nome «imprecisão»: material sobre a avaliação do próprio jogo face a um solver. O limiar de {{n:range.mixed.low}} é uma definição da aplicação, sem fonte. A {{t:variance|variância}} do resultado e a probabilidade de perder são cálculo.
:::
