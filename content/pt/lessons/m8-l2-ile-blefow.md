---
id: m8.l2
module: m8
order: 2
title: "Quanto fazer bluff"
sub: "A proporção de bluffs face ao tamanho da aposta"
rules: [R-M8-004, R-M8-005, R-M8-006]
drills:
  - kind: numeric
    id: m8.l2.n-share-pot
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. No {{t:pot|pote}} estão {{n:ex.pot}} e aposta o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. O seu {{t:range}} é composto por mãos muito fortes e {{t:bluff|bluffs}}. Que parte das suas apostas deve ser {{t:bluff|bluffs}} para que o adversário não o possa explorar? Introduza o número em percentagem."
    answer: bluff.share.bet-pot
    explanation: "Proporção de {{t:bluff|bluffs}} = aposta ÷ ({{t:pot|pote}} + 2·aposta) = {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:bluff.share.bet-pot}}. Uma em cada três apostas é {{t:bluff}}: assim, a mão do adversário que só ganha contra {{t:bluff|bluffs}} não lucra nem a {{t:call|pagar}}, nem a {{t:fold|desistir}}."
  - kind: numeric
    id: m8.l2.n-share-half
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. No {{t:pot|pote}} estão {{n:ex.pot}} e aposta meio {{t:pot|pote}}: {{n:ex.bet.half}}. Em equilíbrio, que parte das suas apostas são {{t:bluff|bluffs}}? Introduza o número em percentagem."
    answer: bluff.share.bet-half
    explanation: "{{n:ex.bet.half}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}} + {{n:ex.bet.half}}) = {{n:bluff.share.bet-half}}. Uma aposta menor dá ao adversário um preço melhor, por isso há menos {{t:bluff|bluffs}} do que com o {{t:pot|pote}} inteiro ({{n:bluff.share.bet-pot}})."
  - kind: choice
    id: m8.l2.q-share-three-quarters
    family: m8.bluff.share
    rules: [R-M8-004]
    prompt: "River. No {{t:pot|pote}} estão {{n:ex.pot}} e aposta {{n:ex.bet.three-quarters}}. Em equilíbrio, que parte das suas apostas são {{t:bluff|bluffs}}?"
    options:
      - { text: "{{n:bluff.share.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}) = {{n:bluff.share.bet-three-quarters}}. É o mesmo número que a equity de que o adversário precisa para {{t:call|pagar}}." }
      - { text: "{{n:alpha.bet-three-quarters}}", why: "Isso é o alfa: com que frequência tem de resultar um único {{t:bluff}} sem hipóteses. A proporção de {{t:bluff|bluffs}} no {{t:range}} calcula-a com as duas apostas no denominador: {{n:bluff.share.bet-three-quarters}}." }
      - { text: "{{n:mdf.bet-three-quarters}}", why: "Isso é o {{t:mdf}}, ou seja, quanto o adversário deve defender. A proporção dos seus {{t:bluff|bluffs}} é {{n:bluff.share.bet-three-quarters}}." }
  - kind: choice
    id: m8.l2.q-share-overbet
    family: m8.bluff.share
    rules: [R-M8-004, R-M8-005]
    prompt: "River. No {{t:pot|pote}} estão {{n:ex.pot}} e aposta mais do que o {{t:pot|pote}}: {{n:ex.bet.overbet}}. Em equilíbrio, que parte das suas apostas são {{t:bluff|bluffs}}?"
    options:
      - { text: "{{n:bluff.share.bet-overbet}}", correct: true, why: "{{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}) = {{n:bluff.share.bet-overbet}}. Um {{t:overbet|overbet}}, ou seja, uma {{t:bet|aposta}} maior do que todo o {{t:pot|pote}}, dá ao adversário o pior preço, por isso pode incluir nele o maior número de {{t:bluff|bluffs}}, mas ainda assim menos de metade." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Isso é o alfa para este tamanho: com que frequência o adversário tem de {{t:fold|desistir}} para que um único {{t:bluff}} compense. A proporção de {{t:bluff|bluffs}} no {{t:range}} é {{n:bluff.share.bet-overbet}}." }
      - { text: "{{n:bluff.share.bet-pot}}", why: "Essa é a proporção de {{t:bluff|bluffs}} numa aposta do {{t:pot|pote}} inteiro. Com uma aposta de {{n:ex.bet.overbet}} há mais: {{n:bluff.share.bet-overbet}}." }
  - kind: choice
    id: m8.l2.q-compare
    family: m8.bluff.size
    rules: [R-M8-005]
    prompt: "Com que aposta no river tem mais {{t:bluff|bluffs}} no {{t:range}}: 1/3 do {{t:pot|pote}} ou o {{t:pot|pote}} inteiro?"
    options:
      - { text: "Com o {{t:pot|pote}} inteiro", correct: true, why: "Com 1/3 do {{t:pot|pote}}, os {{t:bluff|bluffs}} são cerca de {{n:bluff.share.bet-third}} das apostas; com o {{t:pot|pote}} inteiro, cerca de {{n:bluff.share.bet-pot}}. Uma aposta maior dá ao adversário um preço pior, por isso o {{t:call|pagamento}} dele precisa de mais {{t:bluff|bluffs}} para compensar." }
      - { text: "Com 1/3 do {{t:pot|pote}}", why: "É ao contrário. Uma aposta pequena dá ao adversário um bom preço: para {{t:call|pagar}}, bastam-lhe cerca de {{n:bluff.share.bet-third}} de {{t:bluff|bluffs}} nas suas apostas. Com mais {{t:bluff|bluffs}}, pagaria com lucro." }
      - { text: "O mesmo", why: "A proporção de {{t:bluff|bluffs}} depende do tamanho: cerca de {{n:bluff.share.bet-third}} com 1/3 do {{t:pot|pote}}, cerca de {{n:bluff.share.bet-pot}} com o {{t:pot|pote}} inteiro." }
  - kind: choice
    id: m8.l2.q-alpha-vs-share
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Aposta o {{t:pot|pote}} inteiro no river. O alfa é {{n:alpha.bet-pot}} e a proporção de {{t:bluff|bluffs}} é {{n:bluff.share.bet-pot}}. O que indica cada um destes números?"
    options:
      - { text: "Alfa: com que frequência o adversário tem de {{t:fold|desistir}}; proporção: que parte das apostas são {{t:bluff|bluffs}}", correct: true, why: "O alfa diz respeito a um único {{t:bluff}} sem hipóteses: fica a zero quando o adversário {{t:fold|desiste}} em {{n:alpha.bet-pot}} dos casos. A proporção de {{t:bluff|bluffs}} descreve a composição do seu {{t:range}}: uma em cada três apostas é {{t:bluff}}, para que o {{t:call|pagamento}} do adversário fique a zero." }
      - { text: "São dois nomes para a mesma coisa; um deles está mal calculado", why: "Ambos estão bem calculados: alfa = aposta ÷ ({{t:pot|pote}} + aposta), proporção de {{t:bluff|bluffs}} = aposta ÷ ({{t:pot|pote}} + 2·aposta). Respondem a perguntas diferentes." }
      - { text: "Alfa: quantos {{t:bluff|bluffs}} tem no {{t:range}}; proporção: com que frequência o adversário {{t:fold|desiste}}", why: "É ao contrário. O alfa é o limiar de {{t:fold|desistências}} do adversário para um único {{t:bluff}}, e a proporção de {{t:bluff|bluffs}} é a composição do seu {{t:range}} de apostas." }
  - kind: choice
    id: m8.l2.q-same-as-equity
    family: m8.bluff.alpha
    rules: [R-M8-004]
    prompt: "Porque é que a proporção de {{t:bluff|bluffs}} nas suas apostas se calcula com a mesma fórmula que a equity de que o adversário precisa para {{t:call|pagar}}?"
    options:
      - { text: "Porque a mão do adversário que apanha {{t:bluff|bluffs}} ganha exatamente quando há {{t:bluff}} da sua parte", correct: true, why: "A mão dele perde contra o seu valor e ganha contra os {{t:bluff|bluffs}}, por isso a equity dessa mão é a proporção de {{t:bluff|bluffs}}. Quando esta é igual à equity necessária, o {{t:call|pagamento}} fica a zero e o adversário não o pode explorar, nem a pagar, nem a desistir." }
      - { text: "É coincidência; as fórmulas só parecem semelhantes", why: "Não é coincidência. Escolhe a proporção de {{t:bluff|bluffs}} de modo a que a equity da mão que apanha {{t:bluff|bluffs}} seja igual ao seu preço." }
      - { text: "Porque o adversário tem sempre exatamente a equity necessária", why: "O adversário tem a equity que resulta das suas apostas. O número de {{t:bluff|bluffs}} é escolhido por si, de modo a ficar a zero." }
  - kind: choice
    id: m8.l2.q-too-many
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "Aposta o {{t:pot|pote}} inteiro no river, mas os seus {{t:bluff|bluffs}} são metade das apostas, e não {{n:bluff.share.bet-pot}}. O que pode fazer um adversário atento?"
    options:
      - { text: "{{t:call|Pagar}} mais vezes, mesmo com mãos fracas que apanham {{t:bluff|bluffs}}", correct: true, why: "O {{t:call|pagamento}} dele ganha em metade dos casos e só precisa de {{n:eq.bet-pot}}. Ao pagar mais, ganha com os seus {{t:bluff|bluffs}} mais do que perde contra o seu valor." }
      - { text: "{{t:fold|Desistir}} mais vezes", why: "Desistir entrega-lhe o {{t:pot|pote}} com os {{t:bluff|bluffs}}. Quando há {{t:bluff|bluffs}} a mais, o adversário lucra a {{t:call|pagar}}." }
      - { text: "Nada; a proporção não importa", why: "Importa: com {{t:bluff|bluffs}} a mais, cada {{t:call|pagamento}} com uma mão que apanha {{t:bluff|bluffs}} é lucrativo para o adversário." }
  - kind: choice
    id: m8.l2.q-too-few
    family: m8.bluff.balance
    rules: [R-M8-004]
    prompt: "No river aposta o {{t:pot|pote}} inteiro quase só {{t:value|por valor}}, quase sem {{t:bluff|bluffs}}. O que pode fazer um adversário atento?"
    options:
      - { text: "{{t:fold|Desistir}} com todas as mãos que só ganham contra {{t:bluff|bluffs}}", correct: true, why: "Quando há menos {{t:bluff|bluffs}} do que {{n:bluff.share.bet-pot}}, um {{t:call|pagamento}} com uma mão que apanha {{t:bluff|bluffs}} perde. O adversário passa então a pagar só com mãos melhores, e as suas apostas {{t:value|por valor}} são pagas menos vezes." }
      - { text: "{{t:call|Pagar}} mais vezes", why: "Ao {{t:call|pagar}}, pagaria sobretudo o seu valor. Sem {{t:bluff|bluffs}} no seu {{t:range}}, é melhor para ele {{t:fold|desistir}}." }
      - { text: "{{t:raise|Aumentar}} com todas as mãos", why: "{{t:raise|Aumentar}} contra a sua mão forte sem uma mão melhor é uma perda certa. O adversário simplesmente {{t:fold|desiste}} mais vezes." }
  - kind: choice
    id: m8.l2.q-combos
    family: m8.bluff.combos
    rules: [R-M8-004]
    prompt: "No river aposta o {{t:pot|pote}} inteiro com um {{t:range}} de {{n:bluff.ex.range}} {{t:combo|combinações}}: valor e {{t:bluff|bluffs}}. Em equilíbrio, quantas delas são {{t:bluff|bluffs}}?"
    options:
      - { text: "{{n:bluff.ex.bluffs}}", correct: true, why: "{{n:bluff.ex.range}} × {{n:bluff.share.bet-pot}} = {{n:bluff.ex.bluffs}} {{t:bluff|bluffs}} e {{n:bluff.ex.value}} {{t:combo|combinações}} {{t:value|por valor}}: um {{t:bluff}} por cada duas mãos {{t:value|por valor}}." }
      - { text: "{{n:bluff.ex.wrong-alpha}}", why: "Isso resultaria do alfa ({{n:alpha.bet-pot}}). O alfa é o limiar de {{t:fold|desistências}} para um único {{t:bluff}}, não a proporção de {{t:bluff|bluffs}} no {{t:range}}." }
      - { text: "{{n:bluff.ex.value}}", why: "Esse é o número de {{t:combo|combinações}} {{t:value|por valor}}. Os {{t:bluff|bluffs}} são metade: {{n:bluff.ex.bluffs}}." }
  - kind: choice
    id: m8.l2.q-which-hands
    family: m8.bluff.hands
    rules: [R-M8-006]
    prompt: "No river precisa de alguns {{t:bluff|bluffs}} para as apostas do {{t:pot|pote}} inteiro. Que mãos escolhe?"
    options:
      - { text: "As mais fracas, p. ex. {{t:draw|draws}} falhados de {{t:straight|sequência}} ou cartas altas sem hipóteses", correct: true, why: "Uma mão sem hipóteses no showdown não perde nada quando o {{t:bluff}} falha: depois de {{t:check|passar}} perderia na mesma. Por isso é ela que faz {{t:bluff}}." }
      - { text: "{{t:pair|Pares}} médios", why: "Um {{t:pair|par}} médio ganha muitas vezes depois de {{t:check|passar}}. Quando faz {{t:bluff}} com ele, as mãos piores {{t:fold|desistem}} e as melhores pagam: abdica de uma vitória no showdown." }
      - { text: "Quaisquer, desde que a proporção esteja certa", why: "A proporção não é tudo. Um {{t:bluff}} com uma mão que ganharia o showdown custa mais do que um {{t:bluff}} com uma mão sem hipóteses." }
---
Na primeira lição apostou {{t:value|por valor}}. Mas, se no river apostasse apenas com mãos fortes, um adversário atento desistiria com tudo exceto com mãos ainda mais fortes, e as suas apostas quase nunca seriam pagas. Os {{t:bluff|bluffs}} fazem com que valha a pena ao adversário pagar.

## {{t:range|Range}} {{t:polarized|polarizado}}

No river, {{t:in-position|em posição}}, aposta muitas vezes com um **{{t:range}} {{t:polarized|polarizado}}** (como no M7): mãos muito fortes {{t:value|por valor}} e {{t:bluff|bluffs}}, sem mãos médias (essas {{t:check|passam}}, como na primeira lição). No river, os {{t:bluff|bluffs}} são mãos sem hipóteses no showdown. O adversário tem então muitas mãos que perdem contra o seu valor, mas ganham contra os {{t:bluff|bluffs}}. São os **bluff-catchers** (mãos que apanham {{t:bluff|bluffs}}).

## Quantos {{t:bluff|bluffs}}

Escolhe o número de {{t:bluff|bluffs}} de modo a que o bluff-catcher do adversário fique a zero, quer {{t:call|pague}}, quer {{t:fold|desista}}:

```formula
proporção de bluffs = aposta ÷ (pote + 2·aposta)
```

É a mesma fórmula que a da equity necessária para {{t:call|pagar}}, do M2. Não é coincidência: o bluff-catcher ganha exatamente quando há {{t:bluff}} da sua parte, por isso a equity dele é a proporção dos seus {{t:bluff|bluffs}}. Com uma aposta do {{t:pot|pote}} inteiro: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = **{{n:bluff.share.bet-pot}}**, ou seja, uma em cada três apostas é {{t:bluff}}.

## Aposta maior, mais {{t:bluff|bluffs}}

| Aposta | Proporção de {{t:bluff|bluffs}} | Alfa (do M6) |
|---|---|---|
| 1/3 do {{t:pot|pote}} | {{n:bluff.share.bet-third}} | {{n:alpha.bet-third}} |
| 1/2 do {{t:pot|pote}} | {{n:bluff.share.bet-half}} | {{n:alpha.bet-half}} |
| 3/4 do {{t:pot|pote}} | {{n:bluff.share.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} |
| {{t:pot|Pote}} inteiro | {{n:bluff.share.bet-pot}} | {{n:alpha.bet-pot}} |
| 1,5 {{t:pot|potes}} | {{n:bluff.share.bet-overbet}} | {{n:alpha.bet-overbet}} |

Uma aposta maior dá ao adversário um preço pior, por isso pode incluir nela mais {{t:bluff|bluffs}}. Uma aposta pequena só comporta alguns.

## A proporção de {{t:bluff|bluffs}} não é o alfa

O alfa do M6 = aposta ÷ ({{t:pot|pote}} + aposta) indica com que frequência o adversário tem de {{t:fold|desistir}} para que **um único** {{t:bluff}} sem hipóteses fique a zero. A proporção de {{t:bluff|bluffs}} = aposta ÷ ({{t:pot|pote}} + 2·aposta) indica que parte de **todo o {{t:range}} de apostas** são {{t:bluff|bluffs}}. Com uma aposta do {{t:pot|pote}} inteiro, o {{t:bluff}} precisa de mais de {{n:alpha.bet-pot}} de {{t:fold|desistências}}, e no {{t:range}} tem {{n:bluff.share.bet-pot}} de {{t:bluff|bluffs}}. No segundo denominador há uma aposta adicional, porque está a calcular o preço do {{t:call|pagamento}} do adversário.

## Com que fazer {{t:bluff}}

Para os {{t:bluff|bluffs}}, escolha as **mãos mais fracas**, p. ex. {{t:draw|draws}} falhados de {{t:straight|sequência}} ou cartas altas sem hipóteses (os {{t:flush|flushes}} falhados ficam para a lição sobre {{t:blocker|bloqueadores}}): depois de {{t:check|passar}} perderiam na mesma, por isso um {{t:bluff}} falhado não lhes tira nada. As mãos com valor no showdown {{t:check|passam}}.

:::note É um ponto de equilíbrio, não uma receita para todos os adversários
Estas proporções protegem-no contra um adversário que joga bem. Contra jogadores concretos pode afastar-se delas; disso trata o módulo sobre a {{t:exploit|exploração}} dos microlimites (M10). A fórmula da proporção de {{t:bluff|bluffs}} é um cálculo num modelo simplificado: um {{t:range}} {{t:polarized|polarizado}} contra uma mão que apanha {{t:bluff|bluffs}} (um modelo de brinquedo da teoria dos jogos). A recomendação de fazer {{t:bluff}} com as mãos mais fracas provém de materiais de formação e de análises de solvers.
:::
