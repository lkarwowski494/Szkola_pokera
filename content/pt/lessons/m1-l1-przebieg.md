---
id: m1.l1
module: m1
order: 1
title: "Como decorre uma mão"
sub: "Blinds, rondas e jogadas disponíveis"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "É o flop e ninguém antes de si {{t:bet|apostou}}. O que pode fazer?"
    options:
      - { text: "{{t:check|Passar}} ou {{t:bet|apostar}}", correct: true, why: "Sem {{t:bet|aposta}} antes de si, tem duas opções: deixar seguir de graça ou ser o próprio a {{t:bet|apostar}}." }
      - { text: "{{t:call|Pagar}}", why: "Não há nada para {{t:call|pagar}}, porque ninguém {{t:bet|apostou}} nada." }
      - { text: "{{t:raise|Aumentar}}", why: "Só pode {{t:raise|aumentar}} a {{t:bet}} de outro jogador. A primeira {{t:bet}} da ronda chama-se bet." }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Quantas {{t:community-cards|cartas comunitárias}} aparecem no flop?"
    options:
      - { text: "3", correct: true, why: "O flop são três cartas de uma vez. Depois, o turn e o river acrescentam uma cada." }
      - { text: "1", why: "O turn e o river saem uma carta de cada vez." }
      - { text: "5", why: "Só no river há cinco {{t:community-cards|cartas comunitárias}}." }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "O adversário {{t:bet|apostou}} 20 {{t:chips|fichas}}. Tem uma mão fraca e não quer continuar a jogar. O que faz?"
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Quando há uma {{t:bet}} e não quer pagar, {{t:fold|desiste}}. Perde apenas o que já colocou." }
      - { text: "{{t:check|Passo}}", why: "O check não é possível quando há uma {{t:bet}} para {{t:call|pagar}}." }
      - { text: "{{t:call|Pago}}", why: "{{t:call|Pagar}} custa 20 {{t:chips|fichas}}. Como não quer jogar, é uma perda." }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Qual {{t:betting-round}} é a última?"
    options:
      - { text: "River", correct: true, why: "O river é a quinta {{t:community-cards|carta comunitária}}. Se, depois das apostas no river, restarem pelo menos dois jogadores, estes mostram as cartas (showdown)." }
      - { text: "Turn", why: "O turn é a quarta carta. Depois dele ainda vem o river." }
      - { text: "Flop", why: "O flop é a primeira ronda com {{t:community-cards|cartas comunitárias}}." }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "Está no {{t:big-blind|big blind}}, todos {{t:fold|desistiram}} e o {{t:small-blind}} apenas completou. Tem uma mão fraca. O que faz?"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "O seu {{t:big-blind}} conta como uma {{t:bet}}, e o {{t:small-blind}} apenas o igualou. Ninguém {{t:raise|aumentou}}, por isso vê o flop de graça. Uma mão fraca não é motivo para desistir quando não custa nada." }
      - { text: "{{t:fold|Desisto}}", why: "{{t:fold|Desistir}} quando pode {{t:check|passar}} de graça é uma perda pura." }
      - { text: "{{t:raise|Aumento}}", why: "Com 7-2 não tem nada sobre o que construir; {{t:check|passar}} dá-lhe um flop grátis." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar actions
  - kind: generated
    id: m1.l1.g-vocab-actions
    family: vocab.actions
    generator: vocab
    params: { area: actions, dir: both }
    count: 4
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar table
  - kind: generated
    id: m1.l1.g-vocab-table
    family: vocab.table
    generator: vocab
    params: { area: table, dir: both }
    count: 4
---
Cada mão segue uma ordem fixa. Primeiro, dois jogadores colocam apostas obrigatórias, os **blinds**: o {{t:small-blind}} e o {{t:big-blind}}. Assim, há sempre algo em jogo no {{t:pot|pote}}.

Antes do flop, o {{t:big-blind}} conta como uma {{t:bet}}: quem quiser jogar tem de, no mínimo, {{t:call|pagá-lo}}. O {{t:big-blind|big blind}} é o último a agir antes do flop. Se ninguém tiver {{t:raise|aumentado}}, pode {{t:check|passar}} e ver o flop sem pagar mais.

## Quatro {{t:betting-round|rondas de apostas}}

1. **Preflop**: tem apenas as suas 2 cartas.
2. **Flop**: 3 {{t:community-cards}} são colocadas na {{t:board|mesa}}.
3. **Turn**: a quarta carta.
4. **River**: a quinta e última carta.

Se, depois das apostas no river, ainda restarem pelo menos dois jogadores na mão, estes mostram as cartas. É o **showdown**: a melhor combinação ganha o {{t:pot|pote}}. Se todos menos um {{t:fold|desistirem}} antes, esse jogador ganha o {{t:pot|pote}} sem mostrar as cartas.

## Jogadas disponíveis

- **{{t:check|Passo}}**: não coloca nada. Apenas quando, nesta ronda, ninguém antes de si tiver {{t:bet|apostado}} nem {{t:raise|aumentado}} (antes do flop, o {{t:big-blind|big blind}} pode {{t:check|passar}} se ninguém tiver {{t:raise|aumentado}}).
- **{{t:bet|Aposto}}**: a primeira {{t:bet}} da ronda. Nas fórmulas das lições seguintes escrevemos abreviadamente «bet».
- **{{t:call|Pago}}**: iguala a {{t:bet|aposta}} do adversário.
- **{{t:raise|Aumento}}**: aumenta a {{t:bet}} de outro jogador.
- **{{t:fold|Desisto}}**: deita fora as cartas e perde o que já colocou.

:::note A reter
Se alguém {{t:bet|apostou}}, pode {{t:fold|desistir}}, {{t:call|pagar}} ou {{t:raise|aumentar}}. Se ninguém {{t:bet|apostou}}, pode {{t:check|passar}} ou {{t:bet|apostar}}.
:::

:::note All-in e o {{t:side-pot}}
Não pode {{t:bet|apostar}} mais do que tem à sua frente. Quando coloca todas as {{t:chips}}, fica **all-in**: deixa de participar nas apostas, e as {{t:community-cards}} restantes são distribuídas até ao fim. De cada adversário pode ganhar, no máximo, tanto quanto colocou. Se os outros continuarem a jogar por mais, o excedente vai para um **{{t:side-pot|pote lateral}}**, que só eles disputam.
:::
