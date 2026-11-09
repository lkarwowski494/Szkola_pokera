---
id: m6.l1
module: m6
order: 1
title: "MDF e alpha"
sub: "Quanto defender quando o adversário aposta"
rules: [R-M6-001, R-M6-002, R-M6-003, R-M6-004]
drills:
  - kind: numeric
    id: m6.l1.n-mdf-third
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. O {{t:pot|pote}} tem {{n:ex.third.pot}}, e o adversário {{t:bet|aposta}} {{n:ex.third.bet}}. Qual é a parte mínima do seu {{t:range}} que você precisa defender ({{t:call|pagar}} ou {{t:raise|aumentar}}) para que o {{t:bluff|blefe}} dele, sem chances, não lucre automaticamente? Digite o número em porcentagem."
    answer: mdf.bet-third
    explanation: "{{t:mdf}} = {{t:pot}} ÷ ({{t:pot}} + aposta) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}. O adversário arrisca {{n:ex.third.bet}} para ganhar {{n:ex.third.pot}}, então o {{t:bluff|blefe}} dele lucra quando você {{t:fold|desiste}} com mais frequência que {{n:alpha.bet-third}}."
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. O {{t:pot|pote}} tem {{n:ex.pot}}, e o adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. Quanto é o {{t:mdf}}? Digite o número em porcentagem."
    answer: mdf.bet-pot
    explanation: "{{t:mdf}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}. Com uma aposta do tamanho do {{t:pot|pote}}, o {{t:bluff|blefe}} arrisca tanto quanto pode ganhar, então basta você {{t:fold|desistir}} em metade das vezes para ele ficar no zero a zero."
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. O {{t:pot|pote}} tem {{n:ex.pot}}, e o adversário {{t:bet|aposta}} metade do {{t:pot|pote}}: {{n:ex.bet.half}}. Quanto é o {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}. É essa parte do seu {{t:range}} que você defende para que um {{t:bluff|blefe}} sem chances não lucre." }
      - { text: "{{n:alpha.bet-half}}", why: "Esse é o alpha: com que frequência o {{t:bluff|blefe}} do adversário precisa funcionar. O {{t:mdf}} é o restante até o total, ou seja, {{n:mdf.bet-half}}." }
      - { text: "{{n:eq.bet-half}}", why: "Essa é a equity necessária para {{t:call|pagar}} com uma mão (do M2). O {{t:mdf}} diz qual parte do seu {{t:range}} inteiro você defende." }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. O {{t:pot|pote}} tem {{n:ex.pot}}, e o adversário {{t:bet|aposta}} mais que o {{t:pot|pote}}: {{n:ex.bet.overbet}}. Quanto é o {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}. Quanto maior a aposta, menor a parte do seu {{t:range}} que você precisa defender." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Esse é o alpha: é com essa frequência que um {{t:bluff|blefe}} de {{n:ex.bet.overbet}} precisa funcionar. Você defende o resto, ou seja, {{n:mdf.bet-overbet}}." }
      - { text: "{{n:eq.bet-overbet}}", why: "Essa é a equity necessária para {{t:call|pagar}}: {{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}). Outro número, outra pergunta." }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. Você {{t:bluff|blefa}} com uma mão sem chances: o {{t:pot|pote}} tem {{n:ex.pot}}, e você {{t:bet|aposta}} {{n:ex.bet.half}}. Com que frequência o adversário precisa {{t:fold|desistir}} para o {{t:bluff|blefe}} ficar no zero a zero? Digite o número em porcentagem."
    answer: alpha.bet-half
    explanation: "Alpha = aposta ÷ ({{t:pot}} + aposta) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}. Você arrisca {{n:ex.bet.half}} para ganhar {{n:ex.pot}}: quando o adversário {{t:fold|desiste}} com mais frequência, o {{t:bluff|blefe}} lucra."
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. Você {{t:bluff|blefa}}: o {{t:pot|pote}} tem {{n:ex.pot}}, e você {{t:bet|aposta}} {{n:ex.bet.three-quarters}}. Com que frequência o adversário precisa {{t:fold|desistir}} para o {{t:bluff|blefe}} valer a pena?"
    options:
      - { text: "Com mais frequência que {{n:alpha.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Esse é o alpha para uma aposta de 3/4 do {{t:pot|pote}}." }
      - { text: "Com mais frequência que {{n:mdf.bet-three-quarters}}", why: "Esse é o {{t:mdf}}, ou seja, quanto o adversário deveria defender. O alpha é a parte com que ele pode {{t:fold|desistir}} antes de o seu {{t:bluff|blefe}} começar a lucrar: {{n:alpha.bet-three-quarters}}." }
      - { text: "Com mais frequência que {{n:eq.bet-three-quarters}}", why: "Essa é a equity de que o adversário precisa para {{t:call|pagar}}. O limite para o {{t:bluff|blefe}} você calcula sem incluir no denominador o valor que ele {{t:call|pagaria}}: {{n:alpha.bet-three-quarters}}." }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "O {{t:pot|pote}} tem {{n:ex.pot}}. Qual {{t:bluff|blefe}} sem chances precisa de menos {{t:fold|desistências}} do adversário: o de {{n:ex.bet.quarter}} ou o de {{n:ex.bet.pot}}?"
    options:
      - { text: "O de {{n:ex.bet.quarter}}: basta mais de {{n:alpha.bet-quarter}} de {{t:fold|desistências}}", correct: true, why: "Um {{t:bluff|blefe}} pequeno arrisca pouco: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}. Um {{t:bluff|blefe}} do {{t:pot|pote}} inteiro precisa de mais de {{n:alpha.bet-pot}} de {{t:fold|desistências}}." }
      - { text: "O de {{n:ex.bet.pot}}: basta mais de {{n:alpha.bet-quarter}} de {{t:fold|desistências}}", why: "Ao contrário. Uma aposta maior arrisca mais, então o adversário precisa {{t:fold|desistir}} com mais frequência: com o {{t:pot|pote}} inteiro, mais de {{n:alpha.bet-pot}}." }
      - { text: "Os dois precisam do mesmo", why: "O alpha depende do tamanho: {{n:alpha.bet-quarter}} com {{n:ex.bet.quarter}}, {{n:alpha.bet-pot}} com {{n:ex.bet.pot}}." }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "River, o adversário {{t:bet|aposta}} 1/3 do {{t:pot|pote}}. O {{t:mdf}} é {{n:mdf.bet-third}}, e para {{t:call|pagar}} você precisa de {{n:eq.bet-third}} de equity. Como conciliar esses dois números?"
    options:
      - { text: "O {{t:mdf}} se refere ao {{t:range}} inteiro, a equity a uma única mão", correct: true, why: "O {{t:mdf}} diz qual parte de todas as suas mãos você defende para que o adversário não possa {{t:bluff|blefar}} com quaisquer cartas. A equity necessária diz se {{t:call|pagar}} com uma mão específica vale a pena contra aquilo com que o adversário realmente {{t:bet|aposta}}." }
      - { text: "Um deles está calculado errado", why: "Os dois estão corretos: {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}} e {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Eles respondem a perguntas diferentes." }
      - { text: "Você {{t:call|paga}} quando tem pelo menos {{n:mdf.bet-third}} de equity", why: "Isso mistura os conceitos. Para {{t:call|pagar}}, bastam {{n:eq.bet-third}} de equity. {{n:mdf.bet-third}} é uma parte do {{t:range}}, e não a chance de uma mão." }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "Flop. Você defende o {{t:big-blind}}, e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O {{t:mdf}} é {{n:mdf.bet-third}}. Você precisa defender tantas mãos assim?"
    table: { position: BB }
    options:
      - { text: "Não, você pode defender um pouco menos", correct: true, why: "O {{t:mdf}} pressupõe um {{t:bluff|blefe}} sem nenhuma chance. No flop, os {{t:bluff|blefes}} do Button ainda têm equity ({{t:draw|draws}}, cartas altas), e você, {{t:out-of-position|fora de posição}}, não vai realizar toda a equity das mãos fracas. Por isso você pode defender um pouco menos que o {{t:mdf}}, mas não {{t:fold|desiste}} em massa contra um c-bet pequeno." }
      - { text: "Sim, senão o Button lucra com qualquer mão", why: "No river seria assim. No flop, o Button não {{t:bluff|blefa}} com uma mão sem chances: mesmo que você {{t:call|pague}}, ele pode acertar. O {{t:mdf}} é um ponto de referência, não uma obrigação." }
      - { text: "Não, você defende mais porque ainda é só o flop", why: "Ao contrário. As {{t:street|ruas}} futuras favorecem quem aposta {{t:in-position|em posição}}, então você defende menos, não mais." }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "Você sabe, por muitas mãos anteriores, que este jogador raramente {{t:bluff|blefa}}. No river, ele {{t:bet|aposta}} o {{t:pot|pote}} inteiro. Você tem um {{t:pair|par}} de reis com kicker fraco. O que você faz?"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Você sabe, por muitas mãos anteriores, que este jogador raramente {{t:bluff|blefa}}. Quando faltam {{t:bluff|blefes}}, seu {{t:pair|par}} paga principalmente mãos melhores (KQ, sets). Contra um jogador assim, você {{t:fold|desiste}} com mais frequência do que o {{t:mdf}} indica." }
      - { text: "{{t:call|Pago}}, porque o {{t:mdf}} manda defender {{n:mdf.bet-pot}}", why: "O {{t:mdf}} protege contra um jogador que {{t:bluff|blefa}} com frequência suficiente. Este jogador não faz isso, então seguir o {{t:mdf}} é entregar dinheiro a ele." }
      - { text: "{{t:raise|Aumento}} all-in", why: "Mãos melhores vão pagar, e piores vão {{t:fold|desistir}}. Um {{t:pair|par}} com kicker fraco não é mão para {{t:raise|aumentar}}." }
---
Quando o adversário {{t:bet|aposta}}, você não pergunta apenas “essa mão pode ganhar?”. Você também olha para todas as mãos que pode ter nessa situação, ou seja, para o seu {{t:range}}. Dois números dizem quantas delas defender e com que frequência o {{t:bluff|blefe}} do adversário precisa funcionar.

## Alpha: com que frequência o {{t:bluff|blefe}} precisa funcionar

Um {{t:bluff|blefe}} sem chances só ganha quando o adversário {{t:fold|desiste}}. Você arrisca a aposta para ganhar o {{t:pot|pote}}.

```formula
alpha = aposta ÷ (pote + aposta)
```

Exemplo: o {{t:pot|pote}} tem {{n:ex.pot}}, e você {{t:bet|aposta}} {{n:ex.bet.half}}. Alpha = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**. Se o adversário {{t:fold|desiste}} com mais frequência, o seu {{t:bluff|blefe}} lucra mesmo sem nenhuma mão.

## {{t:mdf}}: quanto você precisa defender

O {{t:mdf}} (frequência mínima de defesa) é o outro lado do alpha. Se você defende ({{t:call|paga}} ou {{t:raise|aumenta}}) menos mãos, o adversário lucra {{t:bluff|blefando}} com quaisquer cartas.

```formula
MDF = pote ÷ (pote + aposta)
```

Exemplo do river: o {{t:pot|pote}} tem {{n:ex.third.pot}}, e o adversário {{t:bet|aposta}} {{n:ex.third.bet}}, ou seja, 1/3 do {{t:pot|pote}}. {{t:mdf}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**.

| Aposta do adversário | {{t:mdf}} | Alpha | Equity necessária |
|---|---|---|---|
| 1/4 do {{t:pot|pote}} | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3 do {{t:pot|pote}} | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2 do {{t:pot|pote}} | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4 do {{t:pot|pote}} | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| {{t:pot|Pote}} inteiro | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## {{t:mdf}} não é equity necessária

A equity necessária do M2 se refere a **uma única mão**: se {{t:call|pagar}} com ela vale a pena. O {{t:mdf}} se refere ao **{{t:range}} inteiro**: qual parte dele você defende. Diante de uma aposta de 1/3 do {{t:pot|pote}} no river, o {{t:mdf}} sugere defender cerca de {{n:mdf.bet-third}} das mãos, enquanto {{t:call|pagar}} com uma mão específica vale a pena quando ela ganha em pelo menos {{n:eq.bet-third}} dos casos.

## {{t:out-of-position|Fora de posição}} no flop, você defende menos

O {{t:mdf}} pressupõe que o {{t:bluff|blefe}} do adversário não tem nenhuma chance. Isso é mais próximo da verdade no river, onde os {{t:draw|draws}} já não melhoram. No flop, os {{t:bluff|blefes}} ainda têm equity: {{t:draw|draws}} e cartas altas podem melhorar. Além disso, {{t:out-of-position|fora de posição}} você não vai realizar toda a equity das suas mãos fracas. Por isso, no flop {{t:out-of-position|fora de posição}} você pode defender menos que o {{t:mdf}} (bem menos em flops ruins para quem defende) e tratá-lo como ponto de referência, não como obrigação; ainda assim, contra c-bets pequenos você não {{t:fold|desiste}} em massa. Em um exemplo do turn, o solver defendeu, em média, perto do {{t:mdf}}.

:::note Quando o adversário raramente {{t:bluff|blefa}}
O {{t:mdf}} protege você contra um jogador que {{t:bluff|blefa}} com frequência suficiente. Se, pela observação, você sabe que um jogador específico {{t:bluff|blefa}} raramente demais com apostas grandes no river, contra ele você {{t:fold|desiste}} com mais frequência do que o {{t:mdf}} indica: {{t:call|pagar}} com um {{t:pair|par}} mais fraco paga principalmente mãos melhores. Isso é {{t:exploit|exploração}}, não uma estratégia contra todo mundo (mais no módulo 10).
:::
