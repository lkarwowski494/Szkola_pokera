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
    prompt: "River. O {{t:pot|pote}} tem {{n:ex.third.pot}} e o adversário {{t:bet|aposta}} {{n:ex.third.bet}}. Que parte mínima do seu {{t:range|range}} tem de defender ({{t:call|pagar}} ou {{t:raise|aumentar}}) para que o {{t:bluff}} dele, sem hipóteses, não lucre automaticamente? Introduza o número em percentagem."
    answer: mdf.bet-third
    explanation: "{{t:mdf}} = {{t:pot|pote}} ÷ ({{t:pot|pote}} + aposta) = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}}. O adversário arrisca {{n:ex.third.bet}} para ganhar {{n:ex.third.pot}}, por isso o {{t:bluff}} dele lucra quando {{t:fold|desiste}} mais vezes do que {{n:alpha.bet-third}}."
  - kind: numeric
    id: m6.l1.n-mdf-pot
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. O {{t:pot|pote}} tem {{n:ex.pot}} e o adversário {{t:bet|aposta}} o {{t:pot|pote}} inteiro: {{n:ex.bet.pot}}. Qual é o {{t:mdf}}? Introduza o número em percentagem."
    answer: mdf.bet-pot
    explanation: "{{t:mdf}} = {{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}}) = {{n:mdf.bet-pot}}. Com uma aposta do tamanho do {{t:pot|pote}}, o {{t:bluff}} arrisca tanto quanto pode ganhar, por isso basta que {{t:fold|desista}} em metade dos casos para que não dê lucro nem prejuízo."
  - kind: choice
    id: m6.l1.q-mdf-half
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. O {{t:pot|pote}} tem {{n:ex.pot}} e o adversário {{t:bet|aposta}} metade do {{t:pot|pote}}: {{n:ex.bet.half}}. Qual é o {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-half}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.half}}) = {{n:mdf.bet-half}}. É esta a parte do seu {{t:range|range}} que defende para que um {{t:bluff}} sem hipóteses não lucre." }
      - { text: "{{n:alpha.bet-half}}", why: "Isso é o alpha: a frequência com que o {{t:bluff}} do adversário tem de resultar. O {{t:mdf}} é o resto até ao total, ou seja, {{n:mdf.bet-half}}." }
      - { text: "{{n:eq.bet-half}}", why: "Isso é a equity necessária para {{t:call|pagar}} com uma mão (do M2). O {{t:mdf}} indica que parte de todo o seu {{t:range|range}} defende." }
  - kind: choice
    id: m6.l1.q-mdf-overbet
    family: m6.mdf
    rules: [R-M6-001]
    prompt: "River. O {{t:pot|pote}} tem {{n:ex.pot}} e o adversário {{t:bet|aposta}} mais do que o {{t:pot|pote}}: {{n:ex.bet.overbet}}. Qual é o {{t:mdf}}?"
    options:
      - { text: "{{n:mdf.bet-overbet}}", correct: true, why: "{{n:ex.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}}) = {{n:mdf.bet-overbet}}. Quanto maior a aposta, menor a parte do seu {{t:range|range}} que tem de defender." }
      - { text: "{{n:alpha.bet-overbet}}", why: "Isso é o alpha: é com esta frequência que tem de resultar um {{t:bluff}} de {{n:ex.bet.overbet}}. Defende o resto, ou seja, {{n:mdf.bet-overbet}}." }
      - { text: "{{n:eq.bet-overbet}}", why: "Isso é a equity necessária para {{t:call|pagar}}: {{n:ex.bet.overbet}} ÷ ({{n:ex.pot}} + {{n:ex.bet.overbet}} + {{n:ex.bet.overbet}}). Outro número, outra pergunta." }
  - kind: numeric
    id: m6.l1.n-alpha-half
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. {{t:bluff|Faz bluff}} com uma mão sem hipóteses: o {{t:pot|pote}} tem {{n:ex.pot}} e {{t:bet|aposta}} {{n:ex.bet.half}}. Com que frequência tem o adversário de {{t:fold|desistir}} para que o {{t:bluff}} não dê lucro nem prejuízo? Introduza o número em percentagem."
    answer: alpha.bet-half
    explanation: "Alpha = aposta ÷ ({{t:pot|pote}} + aposta) = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = {{n:alpha.bet-half}}. Arrisca {{n:ex.bet.half}} para ganhar {{n:ex.pot}}: se o adversário {{t:fold|desistir}} mais vezes, o {{t:bluff}} lucra."
  - kind: choice
    id: m6.l1.q-alpha-three-quarters
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "River. {{t:bluff|Faz bluff}}: o {{t:pot|pote}} tem {{n:ex.pot}} e {{t:bet|aposta}} {{n:ex.bet.three-quarters}}. Com que frequência tem o adversário de {{t:fold|desistir}} para que o {{t:bluff}} seja rentável?"
    options:
      - { text: "Mais vezes do que {{n:alpha.bet-three-quarters}}", correct: true, why: "{{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. É este o alpha para uma aposta de 3/4 do {{t:pot|pote}}." }
      - { text: "Mais vezes do que {{n:mdf.bet-three-quarters}}", why: "Isso é o {{t:mdf}}, ou seja, quanto o adversário deve defender. O alpha é a parte com que ele pode {{t:fold|desistir}} antes de o seu {{t:bluff}} começar a lucrar: {{n:alpha.bet-three-quarters}}." }
      - { text: "Mais vezes do que {{n:eq.bet-three-quarters}}", why: "Isso é a equity de que o adversário precisa para {{t:call|pagar}}. Calcula o limiar do {{t:bluff}} sem o {{t:call|pagamento}} dele no denominador: {{n:alpha.bet-three-quarters}}." }
  - kind: choice
    id: m6.l1.q-alpha-compare
    family: m6.alpha
    rules: [R-M6-002]
    prompt: "O {{t:pot|pote}} tem {{n:ex.pot}}. Que {{t:bluff}} sem hipóteses precisa de menos {{t:fold|desistências}} do adversário: o de {{n:ex.bet.quarter}} ou o de {{n:ex.bet.pot}}?"
    options:
      - { text: "O de {{n:ex.bet.quarter}}: bastam mais de {{n:alpha.bet-quarter}} de {{t:fold|desistências}}", correct: true, why: "Um {{t:bluff}} pequeno arrisca pouco: {{n:ex.bet.quarter}} ÷ ({{n:ex.pot}} + {{n:ex.bet.quarter}}) = {{n:alpha.bet-quarter}}. Um {{t:bluff}} do {{t:pot|pote}} inteiro precisa de mais de {{n:alpha.bet-pot}} de {{t:fold|desistências}}." }
      - { text: "O de {{n:ex.bet.pot}}: bastam mais de {{n:alpha.bet-quarter}} de {{t:fold|desistências}}", why: "Pelo contrário. Uma aposta maior arrisca mais, por isso o adversário tem de {{t:fold|desistir}} mais vezes: com o {{t:pot|pote}} inteiro, mais de {{n:alpha.bet-pot}}." }
      - { text: "Ambos precisam do mesmo", why: "O alpha depende do tamanho: {{n:alpha.bet-quarter}} com {{n:ex.bet.quarter}}, {{n:alpha.bet-pot}} com {{n:ex.bet.pot}}." }
  - kind: choice
    id: m6.l1.q-mdf-vs-equity
    family: m6.mdf-concept
    rules: [R-M6-001]
    prompt: "River, o adversário {{t:bet|aposta}} 1/3 do {{t:pot|pote}}. O {{t:mdf}} é {{n:mdf.bet-third}} e, para {{t:call|pagar}}, precisa de {{n:eq.bet-third}} de equity. Como conciliar estes dois números?"
    options:
      - { text: "O {{t:mdf}} refere-se a todo o {{t:range|range}}, a equity a uma só mão", correct: true, why: "O {{t:mdf}} indica que parte de todas as suas mãos defende para que o adversário não possa {{t:bluff|fazer bluff}} com quaisquer cartas. A equity necessária indica se {{t:call|pagar}} com uma mão concreta é rentável face àquilo com que o adversário realmente {{t:bet|aposta}}." }
      - { text: "Um deles está mal calculado", why: "Ambos estão corretos: {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = {{n:mdf.bet-third}} e {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Respondem a perguntas diferentes." }
      - { text: "{{t:call|Paga}} quando tem pelo menos {{n:mdf.bet-third}} de equity", why: "Confusão de conceitos. Para {{t:call|pagar}} basta {{n:eq.bet-third}} de equity. {{n:mdf.bet-third}} é uma parte do {{t:range|range}}, e não a probabilidade de uma mão." }
  - kind: choice
    id: m6.l1.q-flop-mdf
    family: m6.mdf-concept
    rules: [R-M6-003]
    prompt: "Flop. Defende o {{t:big-blind|big blind}} e o Button {{t:bet|aposta}} um c-bet de 1/3 do {{t:pot|pote}}. O {{t:mdf}} é {{n:mdf.bet-third}}. Tem de defender tantas mãos?"
    table: { position: BB }
    options:
      - { text: "Não, pode defender um pouco menos", correct: true, why: "O {{t:mdf}} pressupõe um {{t:bluff}} sem quaisquer hipóteses. No flop, os {{t:bluff|bluffs}} do Button ainda têm equity ({{t:draw|draws}}, cartas altas), e {{t:out-of-position|fora de posição}} não realizará toda a equity das mãos fracas. Por isso pode defender um pouco menos do que o {{t:mdf}}, mas não {{t:fold|desiste}} em massa perante um c-bet pequeno." }
      - { text: "Sim, caso contrário o Button lucra com qualquer mão", why: "No river seria assim. No flop, o Button não {{t:bluff|faz bluff}} com uma mão sem hipóteses: mesmo que {{t:call|pague}}, ele pode acertar. O {{t:mdf}} é um ponto de referência, não uma obrigação." }
      - { text: "Não, defende mais porque ainda é só o flop", why: "Pelo contrário. As {{t:street|rondas}} futuras favorecem quem aposta {{t:in-position|em posição}}, por isso defende menos, não mais." }
  - kind: choice
    id: m6.l1.q-exploit-river
    family: m6.exploit
    rules: [R-M6-004]
    prompt: "Sabe, por muitas mãos anteriores, que este jogador raramente {{t:bluff|faz bluff}}. No river, ele {{t:bet|aposta}} o {{t:pot|pote}} inteiro. Tem um {{t:pair|par}} de reis com um kicker fraco. O que faz?"
    table: { hand: "Kd 9d", board: "Kc 8s 4h 2c Qs", position: BB }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Sabe, por muitas mãos anteriores, que este jogador raramente {{t:bluff|faz bluff}}. Quando faltam {{t:bluff|bluffs}}, o seu {{t:pair|par}} paga sobretudo a mãos melhores (KQ, sets). Contra um jogador assim, {{t:fold|desiste}} mais vezes do que indica o {{t:mdf}}." }
      - { text: "{{t:call|Pago}}, porque o {{t:mdf}} manda defender {{n:mdf.bet-pot}}", why: "O {{t:mdf}} protege contra um jogador que {{t:bluff|faz bluff}} com frequência suficiente. Este jogador não o faz, por isso seguir o {{t:mdf}} é dar-lhe dinheiro." }
      - { text: "{{t:raise|Aumento}} all-in", why: "As mãos melhores pagarão, as piores {{t:fold|desistirão}}. Um {{t:pair|par}} com kicker fraco não é mão para {{t:raise|aumentar}}." }
---
Quando o adversário {{t:bet|aposta}}, não pergunta apenas «esta mão pode ganhar?». Também olha para todas as mãos que pode ter nesta situação, ou seja, para o seu {{t:range|range}}. Dois números indicam quantas delas defender e com que frequência o {{t:bluff}} do adversário tem de resultar.

## Alpha: com que frequência o {{t:bluff}} tem de resultar

Um {{t:bluff}} sem hipóteses só ganha quando o adversário {{t:fold|desiste}}. Arrisca a aposta para ganhar o {{t:pot|pote}}.

```formula
alpha = aposta ÷ (pote + aposta)
```

Exemplo: o {{t:pot|pote}} tem {{n:ex.pot}} e {{t:bet|aposta}} {{n:ex.bet.half}}. Alpha = {{n:ex.bet.half}} ÷ {{n:ex.half.pot-after-bet}} = **{{n:alpha.bet-half}}**. Se o adversário {{t:fold|desistir}} mais vezes, o seu {{t:bluff}} lucra mesmo sem qualquer mão.

## {{t:mdf}}: quanto tem de defender

O {{t:mdf}} (frequência mínima de defesa) é o outro lado do alpha. Se defender ({{t:call|pagar}} ou {{t:raise|aumentar}}) menos mãos, o adversário lucra a {{t:bluff|fazer bluff}} com quaisquer cartas.

```formula
MDF = pote ÷ (pote + aposta)
```

Exemplo do river: o {{t:pot|pote}} tem {{n:ex.third.pot}} e o adversário {{t:bet|aposta}} {{n:ex.third.bet}}, ou seja, 1/3 do {{t:pot|pote}}. {{t:mdf}} = {{n:ex.third.pot}} ÷ {{n:ex.third.pot-after-bet}} = **{{n:mdf.bet-third}}**.

| Aposta do adversário | {{t:mdf}} | Alpha | Equity necessária |
|---|---|---|---|
| 1/4 do {{t:pot|pote}} | {{n:mdf.bet-quarter}} | {{n:alpha.bet-quarter}} | {{n:eq.bet-quarter}} |
| 1/3 do {{t:pot|pote}} | {{n:mdf.bet-third}} | {{n:alpha.bet-third}} | {{n:eq.bet-third}} |
| 1/2 do {{t:pot|pote}} | {{n:mdf.bet-half}} | {{n:alpha.bet-half}} | {{n:eq.bet-half}} |
| 3/4 do {{t:pot|pote}} | {{n:mdf.bet-three-quarters}} | {{n:alpha.bet-three-quarters}} | {{n:eq.bet-three-quarters}} |
| {{t:pot|Pote}} inteiro | {{n:mdf.bet-pot}} | {{n:alpha.bet-pot}} | {{n:eq.bet-pot}} |

## O {{t:mdf}} não é a equity necessária

A equity necessária do M2 refere-se a **uma só mão**: se {{t:call|pagar}} com ela é rentável. O {{t:mdf}} refere-se a **todo o {{t:range|range}}**: que parte dele defende. Perante uma aposta de 1/3 do {{t:pot|pote}} no river, o {{t:mdf}} sugere defender cerca de {{n:mdf.bet-third}} das mãos, e {{t:call|pagar}} com uma mão isolada é rentável quando essa mão ganha em pelo menos {{n:eq.bet-third}} dos casos.

## No flop, {{t:out-of-position|fora de posição}}, defende menos

O {{t:mdf}} pressupõe que o {{t:bluff}} do adversário não tem quaisquer hipóteses. Isto está mais perto da verdade no river, onde os {{t:draw|draws}} já não melhoram. No flop, os {{t:bluff|bluffs}} ainda têm equity: os {{t:draw|draws}} e as cartas altas podem melhorar. Além disso, {{t:out-of-position|fora de posição}}, não realizará toda a equity das suas mãos fracas. Por isso, no flop {{t:out-of-position|fora de posição}} pode defender menos do que o {{t:mdf}} (nitidamente menos em flops maus para quem defende) e trata-o como um ponto de referência, e não como uma obrigação; ainda assim, não {{t:fold|desiste}} em massa perante c-bets pequenos. Num exemplo do turn, o solver defendeu, em média, perto do {{t:mdf}}.

:::note Quando o adversário raramente {{t:bluff|faz bluff}}
O {{t:mdf}} protege-o contra um jogador que {{t:bluff|faz bluff}} com frequência suficiente. Se sabe, por observação, que um jogador concreto {{t:bluff|faz bluff}} demasiado raramente com apostas grandes no river, contra ele {{t:fold|desiste}} mais vezes do que indica o {{t:mdf}}: {{t:call|pagar}} com um {{t:pair|par}} mais fraco paga sobretudo a mãos melhores. Isto é {{t:exploit|exploração}}, não uma estratégia contra todos (mais no módulo 10).
:::
