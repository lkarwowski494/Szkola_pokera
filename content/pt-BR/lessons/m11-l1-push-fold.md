---
id: m11.l1
module: m11
order: 1
title: "Short stack: all-in ou fold"
sub: "Quando o aumento vira all-in"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|Torneio}}. Você tem {{n:m11.depth.10}}, e todos antes de você {{t:fold|foldaram}}. Qual plano de jogo é simples e comprovado pelas fontes?"
    options:
      - { text: "All-in ou {{t:fold}}", correct: true, why: "Com cerca de {{n:m11.thr.pushfold}} ou menos, as fontes concordam em recomendar push/fold. Aumentar e dar {{t:fold}} depois de um {{t:raise|aumento}} entregaria stack demais, e o all-in arranca o máximo de {{t:fold|folds}} do adversário." }
      - { text: "Aumento para {{n:pf.open-size}} e decido depois de um {{t:raise|aumento}}", why: "Depois de um aumento assim, sobra pouco fora do {{t:pot|pote}}, então, diante de um {{t:raise|aumento}} all-in, você fica quase obrigado a {{t:call|pagar}}. O adversário não precisa {{t:fold|foldar}}, e você perde fold equity." }
      - { text: "{{t:call|Pago}} o blind (limp) e vejo o flop", why: "O limp não dá chance de levar o {{t:pot|pote}} na hora. Solvers com todas as ações disponíveis às vezes dão limp, mas essa é uma estratégia para avançados; o plano simples e seguro é all-in ou {{t:fold}}." }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "Você tem {{n:m11.thr.raise}} ou mais e {{t:open|abre}} o jogo como primeiro. O que você faz com uma mão que quer jogar?"
    options:
      - { text: "Normalmente aumento (por exemplo, o mínimo)", correct: true, why: "Acima de cerca de {{n:m11.thr.raise}}, as fontes recomendam o aumento normal: você ainda tem espaço para {{t:fold|foldar}} diante de um {{t:raise}} ou para jogar depois do flop." }
      - { text: "Sempre all-in", why: "Dar all-in com um stack tão grande arrisca muito para ganhar só os blinds. As mãos mais fracas {{t:fold|foldam}}, e as melhores pagam." }
      - { text: "Push/fold, como com {{n:m11.thr.pushfold}}", why: "Push/fold é uma ferramenta para {{t:short-stack|short stack}}: até cerca de {{n:m11.thr.pushfold}} e, para mãos mais fracas, até cerca de {{n:m11.thr.upper}}." }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "Você tem {{n:m11.m.stack}} {{t:chips|fichas}}. Os blinds são {{n:m11.m.sb}}/{{n:m11.m.bb}}, e o {{t:big-blind}} ainda coloca um ante de {{n:m11.m.ante}}. Qual é o seu M?"
    answer: m11.m.value
    explanation: "M = stack ÷ ({{t:small-blind}} + {{t:big-blind}} + ante) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}. É o número de voltas que você sobrevive sem jogar. Em {{t:big-blind|big blinds}}, são {{n:m11.m.bbs}}, mas o M também conta o ante."
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "Seu M caiu para cerca de {{n:m11.m.example}}. O que o modelo de zonas de M diz sobre isso?"
    options:
      - { text: "{{t:red-zone|Zona vermelha}}: só all-in ou {{t:fold}}, de preferência como primeiro", correct: true, why: "Com M de cerca de {{n:m11.m.red}} ou menos, só resta all-in ou {{t:fold}}. Entrar primeiro dá a chance de todos {{t:fold|foldarem}}." }
      - { text: "{{t:green-zone|Zona verde}}: você joga normalmente", why: "A {{t:green-zone|zona verde}}, em que o stack permite jogar à vontade, só começa com M de cerca de {{n:m11.m.green}}. Com M de cerca de {{n:m11.m.example}}, o stack dura {{n:m11.m.example}} voltas." }
      - { text: "Espera por ases, já que tem tempo de sobra", why: "Com M de cerca de {{n:m11.m.example}}, os blinds vão comer seu stack antes de você conseguir uma mão forte. É preciso dar all-in com um {{t:range|range}} mais amplo." }
  - kind: generated
    id: m11.l1.g-push
    family: m11.push.sb
    rules: [R-M11-002]
    generator: rangeDecision
    params: { spots: "push.sb-5,push.sb-10,push.sb-15" }
    count: 3
  - kind: paint
    id: m11.l1.p-push-10
    family: m11.paint.push
    rules: [R-M11-002]
    spot: push.sb-10
    prompt: "Você tem {{n:m11.depth.10}} no {{t:small-blind|small blind}}, e todos {{t:fold|foldaram}}. Pinte as mãos com que você dá all-in."
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|Small blind}}, todos {{t:fold|foldaram}} e você tem K2o. Com {{n:m11.depth.10}}, o solver dá all-in com essa mão. E com {{n:m11.depth.15}}?"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "{{t:fold|Folda}}", correct: true, why: "Com {{n:m11.depth.15}}, você arrisca mais em relação aos blinds, então o {{t:range}} de all-in se estreita de cerca de {{n:m11.push.10}} para cerca de {{n:m11.push.15}} mãos. K2o fica de fora." }
      - { text: "All-in, porque o rei é uma carta forte", why: "Com {{n:m11.depth.15}}, K2o encontra com frequência demais um rei melhor ou um ás no {{t:range|range}} de quem {{t:call|paga}}. O solver {{t:fold|folda}} essa mão." }
      - { text: "All-in, porque quanto mais fundo o stack, mais amplo", why: "Pelo contrário: quanto mais fundo o stack, mais estreito o {{t:range}} de all-in. É com um {{t:short-stack|short stack}} bem curto que você faz {{t:shove|push}} mais amplo." }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|Small blind}}, {{n:m11.depth.10}}, sem ante. Quantas vezes em cem o {{t:big-blind}} teria que {{t:fold|foldar}} para que um all-in com uma mão sem nenhuma chance saísse no zero a zero?"
    options:
      - { text: "Mais de {{n:m11.push.10.alpha}}", correct: true, why: "Você arrisca {{n:m11.push.10.risk}} para ganhar {{n:m11.push.10.win}}: {{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}}) dá cerca de {{n:m11.push.10.alpha}}. O adversário não {{t:fold|folda}} tanto assim, então o all-in só compensa com uma mão que também tenha equity quando o adversário {{t:call|pagar}}." }
      - { text: "Mais da metade", why: "A metade bastaria se você arriscasse o mesmo que pode ganhar. Aqui você arrisca {{n:m11.push.10.risk}} e ganha só {{n:m11.push.10.win}} blinds." }
      - { text: "Basta que ele {{t:fold|folde}} de vez em quando", why: "Cada {{t:call}} custa o stack inteiro à mão sem chances. Sem equity, você precisa de {{t:fold|folds}} muito frequentes: mais de {{n:m11.push.10.alpha}}." }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "Por que, com um {{t:short-stack|short stack}}, você prefere dar all-in primeiro em vez de esperar que outro jogador dê all-in, para então {{t:call|pagar}}?"
    options:
      - { text: "Porque o all-in ganha de duas formas", correct: true, why: "Entrando primeiro, você leva o {{t:pot|pote}} quando todos {{t:fold|foldam}} ou ganha no showdown. {{t:call|Pagando}}, você só ganha no showdown." }
      - { text: "Porque o all-in sempre tem mais equity", why: "A equity da mão não depende de quem entrou primeiro. A diferença é que o all-in dá ao adversário a chance de {{t:fold|foldar}}." }
      - { text: "Porque {{t:call|pagar}} um all-in é proibido", why: "{{t:call|Pagar}} é permitido, mas para {{t:call|pagar}} você precisa de uma mão mais forte (lição sobre como {{t:call|pagar}})." }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "O mesmo stack de {{n:m11.depth.10}} no {{t:small-blind|small blind}}, mas o jogo é com {{t:bb-ante}}: o {{t:big-blind}} colocou um ante de {{n:m11.ante}}. Como muda o {{t:range}} de all-in?"
    options:
      - { text: "Aumenta: cerca de {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} em vez de {{n:m11.push.10}}", correct: true, why: "O ante aumenta o {{t:pot|pote}} que você leva quando o adversário {{t:fold|folda}}: {{n:m11.push.10.win-ante}} em vez de {{n:m11.push.10.win}}. Uma mão sem chances agora precisa só de mais de {{n:m11.push.10.alpha-ante}} de {{t:fold|folds}}, então mais all-ins compensam." }
      - { text: "Diminui, porque o adversário tem mais no {{t:pot|pote}} e vai {{t:call|pagar}} com mais frequência", why: "O adversário de fato {{t:call|paga}} mais amplo, mas o {{t:pot}} maior a ganhar pesa mais. O equilíbrio é de cerca de {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} mãos." }
      - { text: "Não muda", why: "O ante muda a relação entre risco e recompensa. Sem ante, cerca de {{n:m11.push.10}}; com ante, cerca de {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}." }
  - kind: generated
    id: m11.l1.g-push-ante
    family: m11.ante
    rules: [R-M11-003]
    generator: rangeDecision
    params: { spots: "push.sb-10-ante" }
    count: 1
  - kind: generated
    id: m11.l1.g-push-3max
    family: m11.push.3max
    rules: [R-M11-011]
    generator: rangeDecision
    params: { spots: "push.btn-3max,push.sb-3max" }
    count: 2
---
Em um {{t:tournament|torneio}}, os blinds sobem, mas o stack não. Mais cedo ou mais tarde, ele fica tão pequeno que o aumento normal deixa de funcionar. É aí que entra a estratégia **push/fold**: com cada mão que você joga, você faz {{t:shove|push}}, ou seja, dá all-in, e {{t:fold|folda}} o resto.

## Quando é all-in ou {{t:fold}}

Você conta o stack em {{t:big-blind|big blinds}}. As fontes concordam em uma coisa: com cerca de **{{n:m11.thr.pushfold}} ou menos**, você já joga quase só all-in ou {{t:fold}}.

| Stack | O que você costuma fazer |
|---|---|
| cerca de {{n:m11.thr.pushfold}} ou menos | all-in ou {{t:fold}} |
| de {{n:m11.thr.pushfold}} a {{n:m11.thr.upper}} | push/fold com mãos mais fracas e médias |
| mais de cerca de {{n:m11.thr.raise}} | aumento normal |

Por que não aumentar? Quando você tem {{n:m11.depth.10}} e aumenta para {{n:pf.open-size}}, sobra tão pouco fora do {{t:pot|pote}} que, diante de um {{t:raise}} all-in, você quase tem que {{t:call|pagar}} de qualquer jeito. O adversário sabe que você não vai {{t:fold|foldar}}, então não precisa ter medo. O all-in direto arranca do stack o máximo de **fold equity**, ou seja, do lucro que vem de o adversário {{t:fold|foldar}}.

:::note Simplificação
Push/fold é uma simplificação. Solvers que também podem escolher limp e aumento pequeno, com {{n:m11.depth.10}}, dão limp ou aumentam o mínimo com parte das mãos. Ainda assim, all-in ou {{t:fold}} é simples, é difícil cometer um erro grande com ele, e as fontes o recomendam como ponto de partida.
:::

## M: quantas voltas você sobrevive

Um modelo popular de torneio mede o {{t:short-stack}} de outro jeito: **M** é o stack dividido pelo custo de uma volta dos jogadores na mesa.

```formula
M = stack ÷ (small blind + big blind + ante)
```

Exemplo: você tem {{n:m11.m.stack}} {{t:chips|fichas}}, blinds de {{n:m11.m.sb}}/{{n:m11.m.bb}} e {{t:bb-ante}} de {{n:m11.m.ante}}. M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**. Em {{t:big-blind|big blinds}}, são {{n:m11.m.bbs}}, mas o M também leva em conta o ante. Com M de cerca de {{n:m11.m.red}} ou menos ({{t:red-zone}}), só resta all-in ou {{t:fold}}.

## Quanto mais curto o stack, mais amplo

As grades desta lição foram calculadas pelo solver deste app para a situação mais simples: todos {{t:fold|foldaram}}, você joga do {{t:small-blind|small blind}} contra o {{t:big-blind|big blind}}, e cada um só pode dar all-in ou {{t:fold|foldar}}.

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

Com {{n:m11.depth.15}}, você dá all-in com cerca de {{n:m11.push.15}} mãos; com {{n:m11.depth.10}}, com cerca de {{n:m11.push.10}}; e com {{n:m11.depth.5}}, já com cerca de {{n:m11.nash.push.5}}–{{n:m11.push.5}}. Quanto menos você arrisca em relação aos blinds, mais mãos compensam. Para comparação, a tabela de um site de treinamento indica {{n:m11.ext.push.10}} com {{n:m11.depth.10}}; a diferença está dentro da tolerância de validação do solver, e a direção é a mesma.

## Três jogadores: quanto mais adversários atrás de você, mais estreito

Quando você joga do Button, há dois jogadores atrás de você, e não um. Cada um deles pode ter uma mão forte, então é mais raro os dois {{t:fold|foldarem}}. Com três jogadores e stacks de {{n:m11.depth.3max}} cada, o Button dá all-in com cerca de {{n:m11.3max.push.btn}} mãos, e o {{t:small-blind}}, quando o Button {{t:fold|foldou}}, com cerca de {{n:m11.3max.push.sb}}.

```range
push.btn-3max
```

```range
push.sb-3max
```

Conferimos essas duas grades com um resultado de equilíbrio publicado para a mesma situação (artigo científico de 2008: Button {{n:m11.jamfold3.btn}}). As poucas mãos em que os resultados diferem não entram nos exercícios.

## Duas formas de ganhar

O all-in ganha quando o adversário {{t:fold|folda}} ou quando ele {{t:call|paga}} e perde no showdown. Só o {{t:fold}} do adversário raramente basta: com {{n:m11.depth.10}}, você arrisca {{n:m11.push.10.risk}} para levar {{n:m11.push.10.win}} blinds, então uma mão sem chances precisaria de {{t:fold|folds}} em mais de {{n:m11.push.10.alpha}} dos casos. Por isso contam tanto a fold equity quanto a equity da mão quando o adversário {{t:call|paga}}.

## O ante amplia o {{t:range}}

O ante são {{t:chips}} extras no {{t:pot|pote}} antes da distribuição das cartas. Com {{t:bb-ante}}, o {{t:big-blind}} coloca um ante de {{n:m11.ante}}, então o all-in leva {{n:m11.push.10.win-ante}} em vez de {{n:m11.push.10.win}}, e o risco continua o mesmo. Nessa estrutura, o {{t:range|range}} cresce de cerca de {{n:m11.push.10}} para cerca de {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} mãos (o solver do app e um cálculo de equilíbrio independente diferem por uma fração de ponto).

```range
push.sb-10-ante
```
