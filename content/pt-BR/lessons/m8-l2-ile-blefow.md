---
id: m8.l2
module: m8
order: 2
title: "Quanto blefar"
sub: "A proporção de blefes em relação ao tamanho da aposta"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. No {{t:pot|pote}} há {{n:ex.pot}} e você aposta o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. Seu {{t:range}} tem mãos muito fortes e {{t:bluff|blefes}}. Que parte das suas apostas deve ser {{t:bluff|blefes}} para que o adversário não consiga explorar você? Digite a porcentagem."
    answer: bluff.share.bet-pot
    explanation: "Proporção de {{t:bluff|blefes}} = aposta ÷ ({{t:pot}} + 2·aposta) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}. Uma em cada três apostas é {{t:bluff}}: assim, a mão do adversário que só ganha de {{t:bluff|blefes}} não lucra nem {{t:call|pagando}}, nem {{t:fold|desistindo}}."
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. No {{t:pot|pote}} há {{n:ex.pot}} e você aposta meio {{t:pot|pote}}: {{n:ex.bet.half}}. No equilíbrio, que parte das suas apostas são {{t:bluff|blefes}}? Digite a porcentagem."
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}. Uma aposta menor dá ao adversário um preço melhor, então há menos {{t:bluff|blefes}} do que com o {{t:pot|pote}} inteiro ({{n:bluff.share.bet-pot}})."
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. No {{t:pot|pote}} há {{n:ex.pot}} e você aposta {{n:ex.bet.three-quarters}}. No equilíbrio, que parte das suas apostas são {{t:bluff|blefes}}?"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}. É o mesmo número que a equity de que o adversário precisa para {{t:call|pagar}}." }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "Isso é o alpha: com que frequência um único {{t:bluff}} sem chances precisa funcionar. A proporção de {{t:bluff|blefes}} no {{t:range}} você calcula com as duas apostas no denominador: {{n:bluff.share.bet-three-quarters}}." }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "Isso é o {{t:mdf}}, ou seja, quanto o adversário deve defender. A proporção dos seus {{t:bluff|blefes}} é {{n:bluff.share.bet-three-quarters}}." }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. No {{t:pot|pote}} há {{n:ex.pot}} e você aposta mais que o {{t:pot|pote}}: {{n:ex.bet.overbet}}. No equilíbrio, que parte das suas apostas são {{t:bluff|blefes}}?"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}. Um {{t:overbet|overbet}}, ou seja, uma {{t:bet|aposta}} maior que o {{t:pot|pote}} inteiro, dá ao adversário o pior preço, então você pode ter nele a maior quantidade de {{t:bluff|blefes}}, mas ainda menos da metade." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Isso é o alpha para esse tamanho: com que frequência o adversário precisa {{t:fold|desistir}} para que um único {{t:bluff}} compense. A proporção de {{t:bluff|blefes}} no {{t:range}} é {{n:bluff.share.bet-overbet}}." }
      - { text: "{{n:bluff.share.bet-pot}}", why: "Essa é a proporção de {{t:bluff|blefes}} numa aposta do {{t:pot|pote}} inteiro. Com uma aposta de {{n:ex.bet.overbet}}, há mais: {{n:bluff.share.bet-overbet}}." }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "Com qual aposta no river você tem mais {{t:bluff|blefes}} no {{t:range}}: 1/3 do {{t:pot|pote}} ou o {{t:pot|pote}} inteiro?"
    options:
      - { text: "Com o {{t:pot|pote}} inteiro", correct: true, why: "Com 1/3 do {{t:pot|pote}}, os {{t:bluff|blefes}} são cerca de {{n:bluff.share.bet-third}} das apostas; com o {{t:pot|pote}} inteiro, cerca de {{n:bluff.share.bet-pot}}. Uma aposta maior dá ao adversário um preço pior, então o {{t:call}} dele precisa de mais {{t:bluff|blefes}} para compensar." }
      - { text: "Com 1/3 do {{t:pot|pote}}", why: "É o contrário. Uma aposta pequena dá ao adversário um bom preço: para {{t:call|pagar}}, basta a ele cerca de {{n:bluff.share.bet-third}} de {{t:bluff|blefes}} nas suas apostas. Com mais {{t:bluff|blefes}}, ele pagaria com lucro." }
      - { text: "A mesma", why: "A proporção de {{t:bluff|blefes}} depende do tamanho: cerca de {{n:bluff.share.bet-third}} com 1/3 do {{t:pot|pote}}, cerca de {{n:bluff.share.bet-pot}} com o {{t:pot|pote}} inteiro." }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Você aposta o {{t:pot|pote}} inteiro no river. O alpha é {{n:alpha.bet-pot}} e a proporção de {{t:bluff|blefes}} é {{n:bluff.share.bet-pot}}. O que cada um desses números indica?"
    options:
      - { text: "Alpha: com que frequência o adversário precisa {{t:fold|desistir}}; proporção: que parte das apostas são {{t:bluff|blefes}}", correct: true, why: "O alpha se refere a um único {{t:bluff|blefe}} sem chances: ele empata quando o adversário {{t:fold|desiste}} em {{n:alpha.bet-pot}} das vezes. A proporção de {{t:bluff|blefes}} descreve a composição do seu {{t:range}}: uma em cada três apostas é {{t:bluff}}, para que o {{t:call}} do adversário empate." }
      - { text: "São dois nomes para a mesma coisa; um deles está calculado errado", why: "Os dois estão calculados corretamente: alpha = aposta ÷ ({{t:pot}} + aposta), proporção de {{t:bluff|blefes}} = aposta ÷ ({{t:pot}} + 2·aposta). Eles respondem a perguntas diferentes." }
      - { text: "Alpha: quantos {{t:bluff|blefes}} você tem no {{t:range}}; proporção: com que frequência o adversário {{t:fold|desiste}}", why: "É o contrário. O alpha é o limite de {{t:fold|desistências}} do adversário para um único {{t:bluff|blefe}}, e a proporção de {{t:bluff|blefes}} é a composição do seu {{t:range}} de apostas." }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Por que você calcula a proporção de {{t:bluff|blefes}} nas suas apostas com a mesma fórmula da equity de que o adversário precisa para {{t:call|pagar}}?"
    options:
      - { text: "Porque a mão do adversário que pega {{t:bluff|blefes}} ganha exatamente quando você {{t:bluff|blefa}}", correct: true, why: "A mão dele perde para o seu valor e ganha dos {{t:bluff|blefes}}, então a equity dela é a proporção de {{t:bluff|blefes}}. Quando essa proporção é igual à equity necessária, o {{t:call}} empata e o adversário não consegue explorar você nem pagando, nem desistindo." }
      - { text: "É coincidência; as fórmulas só se parecem", why: "Não é coincidência. Você escolhe a proporção de {{t:bluff|blefes}} para que a equity da mão que pega {{t:bluff|blefes}} seja igual ao preço dela." }
      - { text: "Porque o adversário sempre tem exatamente a equity necessária", why: "O adversário tem a equity que resulta das suas apostas. É você quem escolhe o número de {{t:bluff|blefes}} para que dê empate." }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Você aposta o {{t:pot|pote}} inteiro no river, mas metade das suas apostas são {{t:bluff|blefes}}, e não {{n:bluff.share.bet-pot}}. O que um adversário atento pode fazer?"
    options:
      - { text: "{{t:call|Pagar}} com mais frequência, mesmo com mãos fracas que pegam {{t:bluff|blefes}}", correct: true, why: "O {{t:call}} dele ganha na metade das vezes e precisa de apenas {{n:eq.bet-pot}}. Pagando mais, ele ganha mais com seus {{t:bluff|blefes}} do que perde para o seu valor." }
      - { text: "{{t:fold|Desistir}} com mais frequência", why: "Desistindo, ele entrega o {{t:pot|pote}} aos seus {{t:bluff|blefes}}. Quando há {{t:bluff|blefes}} demais, o adversário lucra {{t:call|pagando}}." }
      - { text: "Nada; a proporção não importa", why: "Importa: com {{t:bluff|blefes}} demais, todo {{t:call}} com uma mão que pega {{t:bluff|blefes}} é lucrativo para o adversário." }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "No river, você aposta o {{t:pot|pote}} inteiro quase só {{t:value|por valor}}, quase sem {{t:bluff|blefes}}. O que um adversário atento pode fazer?"
    options:
      - { text: "{{t:fold|Desistir}} com todas as mãos que só ganham de {{t:bluff|blefes}}", correct: true, why: "Quando há menos de {{n:bluff.share.bet-pot}} de {{t:bluff|blefes}}, o {{t:call}} com uma mão que pega {{t:bluff|blefes}} perde. Aí o adversário só paga com mãos melhores, e suas apostas {{t:value|por valor}} são pagas com menos frequência." }
      - { text: "{{t:call|Pagar}} com mais frequência", why: "{{t:call|Pagando}}, ele pagaria principalmente o seu valor. Sem {{t:bluff|blefes}} no seu {{t:range}}, é melhor para ele {{t:fold|desistir}}." }
      - { text: "{{t:raise|Aumentar}} com qualquer mão", why: "{{t:raise|Aumentar}} contra a sua mão forte sem ter uma mão melhor é prejuízo certo. O adversário simplesmente {{t:fold|desiste}} com mais frequência." }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "No river, você aposta o {{t:pot|pote}} inteiro com um {{t:range}} de {{n:bluff.ex.range}} {{t:combo|combos}}: valor e {{t:bluff|blefes}}. No equilíbrio, quantos deles são {{t:bluff|blefes}}?"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}} {{t:bluff|blefes}} e {{n:bluff.ex.value}} {{t:combo|combos}} {{t:value|por valor}}: um {{t:bluff}} para cada duas mãos {{t:value|por valor}}." }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "Isso é o que daria o alpha ({{n:alpha.bet-pot}}). O alpha é o limite de {{t:fold|desistências}} para um único {{t:bluff|blefe}}, não a proporção de {{t:bluff|blefes}} no {{t:range}}." }
      - { text: "{{n:bluff.ex.value}}", why: "Esse é o número de {{t:combo|combos}} {{t:value|por valor}}. Os {{t:bluff|blefes}} são a metade disso: {{n:bluff.ex.bluffs}}." }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "No river, você precisa de alguns {{t:bluff|blefes}} para as apostas do {{t:pot|pote}} inteiro. Quais mãos você escolhe para isso?"
    options:
      - { text: "As mais fracas, por exemplo, {{t:draw|projetos}} de {{t:straight|sequência}} perdidos ou cartas altas sem chances", correct: true, why: "Uma mão sem chances no showdown não perde nada quando o {{t:bluff}} falha: depois do {{t:check}}, ela perderia de qualquer jeito. Por isso é ela que {{t:bluff|blefa}}." }
      - { text: "{{t:pair|Pares}} médios", why: "Um {{t:pair|par}} médio muitas vezes ganha depois do {{t:check}}. Quando você {{t:bluff|blefa}} com ele, mãos piores {{t:fold|desistem}} e mãos melhores pagam: você abre mão de uma vitória no showdown." }
      - { text: "Quaisquer, desde que a proporção esteja certa", why: "A proporção não é tudo. Um {{t:bluff|blefe}} com uma mão que ganharia no showdown custa mais do que um {{t:bluff}} com uma mão sem chances." }
---
Na primeira lição, você apostou {{t:value|por valor}}. Mas, se você apostasse no river apenas com mãos fortes, um adversário atento desistiria de tudo, exceto de mãos ainda mais fortes, e suas apostas quase nunca seriam pagas. Os {{t:bluff|blefes}} fazem com que valha a pena para o adversário pagar.

## {{t:range|Range}} {{t:polarized}}

No river, {{t:in-position|em posição}}, você muitas vezes aposta com um **{{t:range}} {{t:polarized|polarizado}}** (como no M7): mãos muito fortes {{t:value|por valor}} e {{t:bluff|blefes}}, sem mãos médias (essas dão {{t:check}}, como na primeira lição). No river, os {{t:bluff|blefes}} são mãos sem chances no showdown. O adversário então tem muitas mãos que perdem para o seu valor, mas ganham dos {{t:bluff|blefes}}. Esses são os **bluff-catchers** (mãos que pegam {{t:bluff|blefes}}).

## Quantos {{t:bluff|blefes}}

Você escolhe o número de {{t:bluff|blefes}} para que o bluff-catcher do adversário empate, quer ele {{t:call|pague}}, quer {{t:fold|desista}}:

```formula
proporção de blefes = aposta ÷ (pote + 2·aposta)
```

É a mesma fórmula da equity necessária para {{t:call|pagar}}, do M2. Não é coincidência: o bluff-catcher ganha exatamente quando você {{t:bluff|blefa}}, então a equity dele é a proporção dos seus {{t:bluff|blefes}}. Com uma aposta do {{t:pot|pote}} inteiro: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**, ou seja, uma em cada três apostas é {{t:bluff}}.

## Aposta maior, mais {{t:bluff|blefes}}

| Aposta | Proporção de {{t:bluff|blefes}} | Alpha (do M6) |
|---|---|---|
| 1/3 do {{t:pot|pote}} | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| 1/2 do {{t:pot|pote}} | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| 3/4 do {{t:pot|pote}} | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| {{t:pot|Pote}} inteiro | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| 1,5 {{t:pot|pote}} | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

Uma aposta maior dá ao adversário um preço pior, então você pode ter mais {{t:bluff|blefes}} nela. Uma aposta pequena comporta só alguns.

## Proporção de {{t:bluff|blefes}} não é alpha

O alpha do M6 = aposta ÷ ({{t:pot}} + aposta) diz com que frequência o adversário precisa {{t:fold|desistir}} para que **um único** {{t:bluff}} sem chances empate. A proporção de {{t:bluff|blefes}} = aposta ÷ ({{t:pot}} + 2·aposta) diz que parte de **todo o {{t:range}} de apostas** são {{t:bluff|blefes}}. Com uma aposta do {{t:pot|pote}} inteiro, o {{t:bluff}} precisa de mais de {{n:alpha.bet-pot}} de {{t:fold|desistências}}, e no {{t:range}} você tem {{n:bluff.share.bet-pot}} de {{t:bluff|blefes}}. No segundo denominador há uma aposta a mais, porque você está calculando o preço do {{t:call}} do adversário.

## Com que {{t:bluff|blefar}}

Para os {{t:bluff|blefes}}, você escolhe as **mãos mais fracas**, por exemplo, {{t:draw|projetos}} de {{t:straight|sequência}} perdidos ou cartas altas sem chances (os {{t:flush|flushes}} perdidos ficam para a lição sobre {{t:blocker|bloqueadores}}): depois do {{t:check}}, elas perderiam de qualquer jeito, então um {{t:bluff}} fracassado não tira nada delas. Mãos com valor de showdown dão {{t:check}}.

:::note Este é um ponto de equilíbrio, não uma receita para qualquer adversário
Essas proporções protegem você contra um adversário que joga bem. Contra jogadores específicos, você pode se afastar delas; isso é tratado no módulo sobre {{t:exploit|exploração}} nos microlimites (M10). A fórmula da proporção de {{t:bluff|blefes}} é um cálculo num modelo simplificado: um {{t:range}} {{t:polarized}} contra uma mão que pega {{t:bluff|blefes}} (um modelo de brinquedo da teoria dos jogos). A recomendação de {{t:bluff|blefar}} com as mãos mais fracas vem de materiais de treinamento e de análises de solvers.
:::
