---
id: m11.l1
module: m11
order: 1
title: "Short stack: all-in ou desistir"
sub: "Quando o aumento se transforma em all-in"
rules: [R-M11-001, R-M11-005, R-M11-002, R-M11-011, R-M11-003, R-M11-004]
drills:
  - kind: choice
    id: m11.l1.q-threshold
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "{{t:tournament|Torneio}}. Tem {{n:m11.depth.10}} e todos antes de si {{t:fold|desistiram}}. Que plano de jogo é simples e comprovado nas fontes?"
    options:
      - { text: "All-in ou {{t:fold|desistir}}", correct: true, why: "Com cerca de {{n:m11.thr.pushfold}} ou menos, as fontes recomendam unanimemente push/fold. Aumentar e {{t:fold|desistir}} perante um {{t:raise|aumento}} custaria demasiado do stack, e o all-in extrai dele o máximo de {{t:fold|desistências}} do adversário." }
      - { text: "Aumento para {{n:pf.open-size}} e decisão após um {{t:raise|aumento}}", why: "Depois de um aumento assim, fica-lhe pouco atrás do {{t:pot|pote}}, por isso, perante um {{t:raise|aumento}} all-in, fica praticamente obrigado a {{t:call|pagar}}. O adversário não precisa de {{t:fold|desistir}}, e a sua jogada perde a fold equity." }
      - { text: "{{t:call|Pago}} o blind (limp) e vejo o flop", why: "O limp não dá hipótese de ganhar o {{t:pot|pote}} de imediato. Os solvers com escolha completa de ações por vezes fazem limp, mas isso é uma estratégia para jogadores avançados; o plano simples e seguro é all-in ou {{t:fold|desistir}}." }
  - kind: choice
    id: m11.l1.q-threshold-deep
    family: m11.threshold
    rules: [R-M11-001]
    prompt: "Tem {{n:m11.thr.raise}} ou mais e {{t:open|abre}} o jogo em primeiro lugar. O que faz com uma mão que quer jogar?"
    options:
      - { text: "Normalmente aumento (por exemplo, o mínimo)", correct: true, why: "Acima de cerca de {{n:m11.thr.raise}}, as fontes recomendam um aumento normal: ainda tem margem para {{t:fold|desistir}} perante um {{t:raise|aumento}} ou para jogar depois do flop." }
      - { text: "Sempre all-in", why: "Ir all-in com um stack tão grande arrisca muito para ganhar apenas os blinds. As mãos mais fracas {{t:fold|desistem}} e as melhores pagam." }
      - { text: "Push/fold, como com {{n:m11.thr.pushfold}}", why: "O push/fold é uma ferramenta para o {{t:short-stack|short stack}}: até cerca de {{n:m11.thr.pushfold}} e, para mãos mais fracas, até cerca de {{n:m11.thr.upper}}." }
  - kind: numeric
    id: m11.l1.n-m
    family: m11.m
    rules: [R-M11-005]
    prompt: "Tem {{n:m11.m.stack}} {{t:chips|fichas}}. Os blinds são {{n:m11.m.sb}}/{{n:m11.m.bb}} e o {{t:big-blind|big blind}} coloca ainda um ante de {{n:m11.m.ante}}. Quanto vale o seu M?"
    answer: m11.m.value
    explanation: "M = stack ÷ ({{t:small-blind|small blind}} + {{t:big-blind|big blind}} + ante) = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = {{n:m11.m.value}}. É o número de voltas que aguenta sem jogar. Em {{t:big-blind|big blinds}} são {{n:m11.m.bbs}}, mas o M conta também o ante."
  - kind: choice
    id: m11.l1.q-m-zone
    family: m11.m
    rules: [R-M11-005]
    prompt: "O seu M desceu para cerca de {{n:m11.m.example}}. O que diz o modelo das zonas M sobre isso?"
    options:
      - { text: "{{t:red-zone|Zona vermelha}}: só all-in ou {{t:fold|desistir}}, de preferência em primeiro lugar", correct: true, why: "Com um M de cerca de {{n:m11.m.red}} ou menos, resta-lhe apenas all-in ou {{t:fold|desistir}}. Entrar em primeiro lugar dá a hipótese de todos {{t:fold|desistirem}}." }
      - { text: "{{t:green-zone|Zona verde}}: joga normalmente", why: "A {{t:green-zone|zona verde}}, em que o stack permite jogar à vontade, só começa num M de cerca de {{n:m11.m.green}}. Com um M de cerca de {{n:m11.m.example}}, o stack chega para {{n:m11.m.example}} voltas." }
      - { text: "Espera por ases, porque tem tempo de sobra", why: "Com um M de cerca de {{n:m11.m.example}}, os blinds comem o stack antes de lhe chegar uma mão forte. É preciso ir all-in com um {{t:range|range}} mais largo." }
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
    prompt: "Tem {{n:m11.depth.10}} no {{t:small-blind|small blind}} e todos {{t:fold|desistiram}}. Pinte as mãos com que vai all-in."
  - kind: choice
    id: m11.l1.q-k2o
    family: m11.push.depth
    rules: [R-M11-002]
    prompt: "{{t:small-blind|Small blind}}, todos {{t:fold|desistiram}} e tem K2o. Com {{n:m11.depth.10}}, o solver vai all-in com esta mão. E com {{n:m11.depth.15}}?"
    table: { hand: "Kd 2c", position: SB }
    options:
      - { text: "{{t:fold|Desiste}}", correct: true, why: "Com {{n:m11.depth.15}} arrisca mais em relação aos blinds, por isso o {{t:range|range}} de all-in estreita-se de cerca de {{n:m11.push.10}} para cerca de {{n:m11.push.15}} mãos. A K2o sai dela." }
      - { text: "All-in, porque o rei é uma carta forte", why: "Com {{n:m11.depth.15}}, a K2o encontra demasiadas vezes um rei melhor ou um ás no {{t:range|range}} de {{t:call|pagamento}}. O solver {{t:fold|desiste}} dela." }
      - { text: "All-in, porque quanto mais profundo o stack, mais largo", why: "Pelo contrário: quanto mais profundo o stack, mais estreito o {{t:range|range}} de all-in. O {{t:shove|shove}} mais largo faz-se com um {{t:short-stack|short stack}} muito pequeno." }
  - kind: choice
    id: m11.l1.q-fold-equity
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "{{t:small-blind|Small blind}}, {{n:m11.depth.10}}, sem ante. Quantas vezes em cada cem teria o {{t:big-blind|big blind}} de {{t:fold|desistir}} para que um all-in com uma mão sem qualquer hipótese não tivesse lucro nem prejuízo?"
    options:
      - { text: "Mais de {{n:m11.push.10.alpha}}", correct: true, why: "Arrisca {{n:m11.push.10.risk}} para ganhar {{n:m11.push.10.win}}: {{n:m11.push.10.risk}} ÷ ({{n:m11.push.10.win}} + {{n:m11.push.10.risk}}) dá cerca de {{n:m11.push.10.alpha}}. O adversário não {{t:fold|desiste}} tantas vezes, por isso o all-in só compensa com uma mão que também tenha equity quando o adversário {{t:call|paga}}." }
      - { text: "Mais de metade", why: "Metade bastaria se arriscasse tanto quanto pode ganhar. Aqui arrisca {{n:m11.push.10.risk}} e ganha apenas {{n:m11.push.10.win}} blinds." }
      - { text: "Basta que {{t:fold|desista}} de vez em quando", why: "Cada {{t:call|pagamento}} custa à mão sem hipóteses o stack inteiro. Sem equity, precisa de {{t:fold|desistências}} muito frequentes: mais de {{n:m11.push.10.alpha}}." }
  - kind: choice
    id: m11.l1.q-two-ways
    family: m11.fold-equity
    rules: [R-M11-004]
    prompt: "Porque é que, com um {{t:short-stack|short stack}}, prefere ir all-in em primeiro lugar em vez de esperar que outro jogador vá all-in e {{t:call|pagar}}?"
    options:
      - { text: "Porque o all-in ganha de duas maneiras", correct: true, why: "Ao entrar em primeiro lugar, ganha o {{t:pot|pote}} quando todos {{t:fold|desistem}} ou ganha no showdown. Ao {{t:call|pagar}}, ganha apenas no showdown." }
      - { text: "Porque o all-in tem sempre mais equity", why: "A equity de uma mão não depende de quem entrou primeiro. A diferença é que o all-in dá ao adversário a hipótese de {{t:fold|desistir}}." }
      - { text: "Porque {{t:call|pagar}} um all-in é proibido", why: "{{t:call|Pagar}} é permitido, mas para {{t:call|pagar}} precisa de uma mão mais forte (lição sobre o {{t:call|pagamento}})." }
  - kind: choice
    id: m11.l1.q-ante
    family: m11.ante
    rules: [R-M11-003]
    prompt: "O mesmo stack de {{n:m11.depth.10}} no {{t:small-blind|small blind}}, mas o jogo decorre com {{t:bb-ante|big blind ante}}: o {{t:big-blind|big blind}} colocou um ante de {{n:m11.ante}}. Como muda o {{t:range|range}} de all-in?"
    options:
      - { text: "Aumenta: cerca de {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} em vez de {{n:m11.push.10}}", correct: true, why: "O ante aumenta o {{t:pot|pote}} que ganha quando o adversário {{t:fold|desiste}}: {{n:m11.push.10.win-ante}} em vez de {{n:m11.push.10.win}}. Uma mão sem hipóteses já só precisa de mais de {{n:m11.push.10.alpha-ante}} de {{t:fold|desistências}}, por isso compensam mais all-ins." }
      - { text: "Diminui, porque o adversário tem mais no {{t:pot|pote}} e vai {{t:call|pagar}} com mais frequência", why: "O adversário de facto {{t:call|paga}} com um range mais largo, mas o {{t:pot|pote}} maior a ganhar pesa mais. O equilíbrio é de cerca de {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} mãos." }
      - { text: "Não muda", why: "O ante altera a relação entre risco e recompensa. Sem ante, cerca de {{n:m11.push.10}}; com ante, cerca de {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}}." }
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
Num {{t:tournament|torneio}}, os blinds sobem, mas o stack não. Mais cedo ou mais tarde, fica tão curto que o aumento normal deixa de funcionar. É então que entra a estratégia **push/fold**: com cada mão que joga, faz {{t:shove|shove}}, ou seja, vai all-in, e com as restantes {{t:fold|desiste}}.

## Quando ir all-in ou {{t:fold|desistir}}

O stack conta-se em {{t:big-blind|big blinds}}. As fontes concordam num ponto: com cerca de **{{n:m11.thr.pushfold}} ou menos**, joga-se quase exclusivamente all-in ou {{t:fold|desistir}}.

| Stack | O que costuma fazer |
|---|---|
| cerca de {{n:m11.thr.pushfold}} ou menos | all-in ou {{t:fold|desistir}} |
| de {{n:m11.thr.pushfold}} a {{n:m11.thr.upper}} | push/fold com mãos mais fracas e médias |
| mais de cerca de {{n:m11.thr.raise}} | aumento normal |

Porque não um aumento? Quando tem {{n:m11.depth.10}} e aumenta para {{n:pf.open-size}}, fica-lhe tão pouco atrás do {{t:pot|pote}} que, perante um {{t:raise|aumento}} all-in, praticamente tem de {{t:call|pagar}} na mesma. Como não vai {{t:fold|desistir}} e o adversário sabe-o, ele não tem nada a temer. O all-in imediato extrai do stack o máximo de **fold equity**, ou seja, do lucro obtido quando o adversário {{t:fold|desiste}}.

:::note Simplificação
O push/fold é uma simplificação. Os solvers que também podem escolher o limp e o aumento pequeno, com {{n:m11.depth.10}}, fazem limp ou aumento mínimo com parte das mãos. Ainda assim, all-in ou {{t:fold|desistir}} é simples, é difícil cometer com isso um erro grave e as fontes recomendam-no como ponto de partida.
:::

## M: quantas voltas aguenta

Um modelo de torneio popular mede o {{t:short-stack|short stack}} de outra forma: **M** é o stack dividido pelo custo de uma volta dos jogadores à mesa.

```formula
M = stack ÷ (small blind + big blind + ante)
```

Exemplo: tem {{n:m11.m.stack}} {{t:chips|fichas}}, blinds de {{n:m11.m.sb}}/{{n:m11.m.bb}} e {{t:bb-ante|big blind ante}} de {{n:m11.m.ante}}. M = {{n:m11.m.stack}} ÷ {{n:m11.m.orbit}} = **{{n:m11.m.value}}**. Em {{t:big-blind|big blinds}} são {{n:m11.m.bbs}}, mas o M tem também em conta o ante. Com um M de cerca de {{n:m11.m.red}} ou menos ({{t:red-zone|zona vermelha}}), resta-lhe apenas all-in ou {{t:fold|desistir}}.

## Quanto mais curto o stack, mais largo o range

As grelhas desta lição foram calculadas pelo solver desta aplicação para a situação mais simples: todos {{t:fold|desistiram}}, joga do {{t:small-blind|small blind}} contra o {{t:big-blind|big blind}} e cada um só pode ir all-in ou {{t:fold|desistir}}.

```range
push.sb-15
```

```range
push.sb-10
```

```range
push.sb-5
```

Com {{n:m11.depth.15}} vai all-in com cerca de {{n:m11.push.15}} mãos, com {{n:m11.depth.10}} com cerca de {{n:m11.push.10}} e com {{n:m11.depth.5}} já com cerca de {{n:m11.nash.push.5}}–{{n:m11.push.5}}. Quanto menos arrisca em relação aos blinds, mais mãos compensam. Para comparação, a tabela de um site de formação indica {{n:m11.ext.push.10}} com {{n:m11.depth.10}}; a diferença está dentro da tolerância de validação do solver e a tendência é a mesma.

## Três jogadores: quanto mais adversários atrás de si, mais estreito o range

Quando joga do Button, tem atrás de si dois jogadores, e não um. Qualquer um deles pode ter uma mão forte, por isso é mais raro {{t:fold|desistirem}} ambos. Com três jogadores e stacks de {{n:m11.depth.3max}} cada, o Button vai all-in com cerca de {{n:m11.3max.push.btn}} mãos e o {{t:small-blind|small blind}}, quando o Button {{t:fold|desistiu}}, com cerca de {{n:m11.3max.push.sb}}.

```range
push.btn-3max
```

```range
push.sb-3max
```

Comparámos estas duas grelhas com um resultado de equilíbrio publicado para a mesma situação (artigo científico de 2008: Button {{n:m11.jamfold3.btn}}). As poucas mãos em que os resultados divergem não entram nos exercícios.

## Duas maneiras de ganhar

O all-in ganha quando o adversário {{t:fold|desiste}} ou quando {{t:call|paga}} e perde no showdown. A {{t:fold|desistência}} do adversário, por si só, raramente basta: com {{n:m11.depth.10}} arrisca {{n:m11.push.10.risk}} para ganhar {{n:m11.push.10.win}} blinds, por isso uma mão sem hipóteses precisaria de {{t:fold|desistências}} em mais de {{n:m11.push.10.alpha}} dos casos. É por isso que contam tanto a fold equity como a equity da mão quando o adversário {{t:call|paga}}.

## O ante alarga o {{t:range|range}}

O ante são {{t:chips|fichas}} adicionais no {{t:pot|pote}} antes da distribuição. Com {{t:bb-ante|big blind ante}}, o {{t:big-blind|big blind}} coloca um ante de {{n:m11.ante}}, por isso o all-in ganha {{n:m11.push.10.win-ante}} em vez de {{n:m11.push.10.win}}, e o risco mantém-se o mesmo. Nesta estrutura, o {{t:range|range}} aumenta de cerca de {{n:m11.push.10}} para cerca de {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} mãos (o solver da aplicação e um cálculo de equilíbrio independente diferem numa fração de ponto).

```range
push.sb-10-ante
```
