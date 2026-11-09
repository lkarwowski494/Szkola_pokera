---
id: m3.l2
module: m3
order: 2
title: "Mãos iniciais"
sub: "Quais cartas jogar antes do flop"
rules: [R-M3-004, R-M3-005, R-M3-008]
drills:
  - kind: choice
    id: m3.l2.q1
    family: m3.suited
    rules: [R-M3-005]
    prompt: "Qual mão é mais forte?"
    options:
      - { text: "A♥ K♥ (mesmo naipe)", correct: true, why: "Os valores são os mesmos, mas a mão do mesmo naipe tem uma forma a mais de vencer: o {{t:flush}}." }
      - { text: "A♥ K♣ (naipes diferentes)", why: "Com naipes diferentes, você perde a chance de fazer um {{t:flush}}." }
      - { text: "São iguais", why: "Quase, mas não exatamente. O naipe das cartas importa." }
  - kind: choice
    id: m3.l2.q2
    family: m3.open-early
    rules: [R-M3-004, R-M3-006]
    prompt: "Ninguém entrou no pote ainda. O que você faz?"
    table: { hand: "7c 2d", position: HJ }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "7-2 de naipes diferentes é uma das mãos mais fracas: as cartas estão longe demais uma da outra para formarem juntas uma {{t:straight|sequência}}, raramente formam um {{t:flush}}, e um {{t:pair|par}} acertado tem kicker fraco. Muitas vezes é chamada de pior mão, embora, nas contas contra uma mão aleatória, algumas outras, como 3-2 de naipes diferentes, se saiam ainda pior." }
      - { text: "{{t:raise|Aumento}} para surpreender", why: "Um {{t:bluff|blefe}} (jogar uma mão fraca para que os adversários {{t:fold|desistam}} de mãos melhores) no preflop com uma das mãos mais fracas, com mais quatro jogadores depois de você, perde no longo prazo." }
      - { text: "{{t:call|Pago}}, porque está barato", why: "Cada entrada “barata” com uma mão fraca acaba somando grandes perdas." }
  - kind: choice
    id: m3.l2.q3
    family: m3.premium
    rules: [R-M3-008]
    prompt: "O jogador antes de você {{t:raise|aumentou}}. O que você faz?"
    table: { hand: "Ad Ac", position: CO }
    options:
      - { text: "{{t:raise|Aumento}} de novo (3-bet)", correct: true, why: "Você tem a melhor mão possível. Quer colocar o máximo possível no pote e reduzir o número de adversários." }
      - { text: "Só {{t:call|pago}}", why: "Jogadores avançados às vezes jogam assim para despistar, mas, como regra, você perde valor e deixa os outros entrarem barato." }
      - { text: "{{t:fold|Desisto}}", why: "Você nunca {{t:fold|desiste}} de ases no preflop. Eles são favoritos contra qualquer outra mão; por exemplo, contra KK têm cerca de {{n:pf.aa-vs-kk}}." }
  - kind: choice
    id: m3.l2.q4
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Todos {{t:fold|desistiram}} até você. O que você faz?"
    table: { hand: "Qs Js", position: BTN }
    options:
      - { text: "{{t:raise|Aumento}}", correct: true, why: "QJ do mesmo naipe é uma mão muito boa para atacar os blinds em {{t:position|posição}}: forma {{t:straight|sequências}}, flushes e {{t:pair|pares}} altos." }
      - { text: "{{t:fold|Desisto}}", why: "No Button, esta mão é boa demais para {{t:fold|desistir}}." }
      - { text: "{{t:call|Pago}}", why: "É melhor {{t:raise|aumentar}}: você tem a chance de levar os blinds na hora e joga com a {{t:initiative|iniciativa}}." }
---
Os iniciantes perdem a maior parte do dinheiro jogando mãos fracas demais. Uma boa seleção de mãos iniciais é o jeito mais rápido de parar de perder.

## Grupos de mãos

- **Mais fortes**: [[As Ah]], [[Ks Kh]], [[Qs Qh]] e AK do mesmo naipe e de naipes diferentes, por exemplo [[As Ks]] e [[As Kd]]. Você {{t:raise|aumenta}} e, quando alguém {{t:raise|aumentou}} antes de você, normalmente {{t:raise|aumenta}} de novo (3-bet) {{t:value|por valor}}, ou seja, para que o adversário {{t:call|pague}} com uma mão mais fraca.
- **Fortes**: JJ, TT, AQ, AJ do mesmo naipe, KQ do mesmo naipe.
- **Especulativas**: {{t:pair|pares}} baixos e cartas consecutivas do mesmo naipe, por exemplo [[7h 6h]]. Boas em {{t:late-position|posição tardia}}.
- **Fracas**: desconectadas, baixas, de naipes diferentes, por exemplo [[9c 3d]]. {{t:fold|Desista}}.

:::note Quantos {{t:combo|combos}} existem
Ao todo, há {{n:combos.total}} {{t:combo|combos}} de mãos iniciais, mas apenas {{n:combos.kinds}} tipos: {{n:combos.kinds.pair}} {{t:pair|pares}}, {{n:combos.kinds.suited}} mãos do mesmo naipe e {{n:combos.kinds.offsuit}} de naipes diferentes. Cada {{t:pair|par}} tem {{n:combos.pair}} {{t:combo|combos}}, uma mão do mesmo naipe tem {{n:combos.suited}} e uma de naipes diferentes, {{n:combos.offsuit}}. Por isso, AK de naipes diferentes aparece três vezes mais do que AK do mesmo naipe.
:::

Os grupos acima são uma simplificação para começar. Os {{t:range|ranges}} exatos de {{t:open|abertura}} para cada {{t:position|posição}}, em uma grade de {{t:range|ranges}}, você vai conhecer na próxima lição.
