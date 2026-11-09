---
id: m1.l1
module: m1
order: 1
title: "Como uma mão se desenrola"
sub: "Blinds, ruas e jogadas disponíveis"
rules: [R-M1-001, R-M1-002, R-M1-003, R-M1-004]
drills:
  - kind: choice
    id: m1.l1.q1
    family: m1.actions
    rules: [R-M1-001]
    prompt: "É o flop e ninguém antes de você {{t:bet|apostou}}. O que você pode fazer?"
    options:
      - { text: "{{t:check|Passar}} ou {{t:bet|apostar}}", correct: true, why: "Sem {{t:bet|aposta}} antes de você, há duas opções: deixar passar de graça ou {{t:bet|apostar}} você mesmo." }
      - { text: "{{t:call|Pagar}}", why: "Não há o que {{t:call|pagar}}, porque ninguém {{t:bet|apostou}} nada." }
      - { text: "{{t:raise|Aumentar}}", why: "Só dá para {{t:raise|aumentar}} a {{t:bet|aposta}} de outra pessoa. A primeira {{t:bet|aposta}} da rodada é o bet." }
  - kind: choice
    id: m1.l1.q2
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Quantas {{t:community-cards|cartas comunitárias}} aparecem no flop?"
    options:
      - { text: "3", correct: true, why: "O flop são três cartas de uma vez. Depois, o turn e o river acrescentam uma cada." }
      - { text: "1", why: "O turn e o river saem com uma carta cada." }
      - { text: "5", why: "As cinco {{t:community-cards|cartas comunitárias}} só estão completas no river." }
  - kind: choice
    id: m1.l1.q3
    family: m1.actions
    rules: [R-M1-003]
    prompt: "O adversário {{t:bet|apostou}} 20 {{t:chips|fichas}}. Você tem uma mão fraca e não quer continuar jogando. O que você faz?"
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Quando há uma {{t:bet|aposta}} e você não quer pagar, você {{t:fold|desiste}}. Você perde só o que já colocou." }
      - { text: "{{t:check|Passo}}", why: "Não é possível dar check quando há uma {{t:bet|aposta}} para {{t:call|pagar}}." }
      - { text: "{{t:call|Pago}}", why: "{{t:call|Pagar}} custa 20 {{t:chips|fichas}}. Se você não quer jogar, isso é prejuízo." }
  - kind: choice
    id: m1.l1.q4
    family: m1.streets
    rules: [R-M1-004]
    prompt: "Qual {{t:betting-round|rodada de apostas}} é a última?"
    options:
      - { text: "River", correct: true, why: "O river é a quinta {{t:community-cards|carta comunitária}}. Se, depois das apostas no river, restarem pelo menos dois jogadores, eles mostram as cartas (showdown)." }
      - { text: "Turn", why: "O turn é a quarta carta. Depois dele ainda vem o river." }
      - { text: "Flop", why: "O flop é a primeira rodada com {{t:community-cards|cartas comunitárias}}." }
  - kind: choice
    id: m1.l1.q5
    family: m1.actions
    rules: [R-M1-002]
    prompt: "Você está no {{t:big-blind|big blind}}, todos {{t:fold|desistiram}} e o {{t:small-blind|small blind}} só completou. Você tem uma mão fraca. O que você faz?"
    table: { hand: "7c 2d", position: BB }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "Seu {{t:big-blind|big blind}} conta como {{t:bet|aposta}}, e o {{t:small-blind|small blind}} só o igualou. Ninguém {{t:raise|aumentou}}, então você vê o flop de graça. Mão fraca não é motivo para desistir quando não custa nada." }
      - { text: "{{t:fold|Desisto}}", why: "{{t:fold|Desistir}} quando você pode {{t:check|passar}} de graça é puro prejuízo." }
      - { text: "{{t:raise|Aumento}}", why: "Com 7-2 você não tem o que construir; {{t:check|passar}} dá um flop grátis." }
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
Toda mão segue uma ordem fixa. Primeiro, dois jogadores colocam apostas obrigatórias, os **blinds**: o {{t:small-blind|small blind}} e o {{t:big-blind|big blind}}. Assim, sempre há algo em jogo no {{t:pot|pote}}.

Antes do flop, o {{t:big-blind|big blind}} conta como {{t:bet|aposta}}: quem quiser jogar precisa pelo menos {{t:call|pagá-lo}}. O {{t:big-blind|big blind}} é o último a agir antes do flop. Se ninguém {{t:raise|aumentou}}, ele pode {{t:check|passar}} e ver o flop sem pagar mais.

## Quatro {{t:betting-round|rodadas de apostas}}

1. **Preflop**: você tem só as suas 2 cartas.
2. **Flop**: 3 {{t:community-cards|cartas comunitárias}} vão para a {{t:board|mesa}}.
3. **Turn**: a quarta carta.
4. **River**: a quinta e última carta.

Se, depois das apostas no river, ainda houver pelo menos dois jogadores na mão, eles mostram as cartas. Esse é o **showdown**: a melhor combinação ganha o {{t:pot|pote}}. Se todos menos um {{t:fold|desistirem}} antes, esse jogador ganha o {{t:pot|pote}} sem mostrar as cartas.

## Jogadas disponíveis

- **{{t:check|Passo}}**: você não coloca nada. Só quando, nesta rodada, ninguém antes de você {{t:bet|apostou}} nem {{t:raise|aumentou}} (antes do flop, o {{t:big-blind|big blind}} pode {{t:check|passar}} se ninguém {{t:raise|aumentou}}).
- **{{t:bet|Aposto}}**: a primeira {{t:bet|aposta}} da rodada. Nas fórmulas das próximas lições, escrevemos só “bet”.
- **{{t:call|Pago}}**: você iguala a {{t:bet|aposta}} do adversário.
- **{{t:raise|Aumento}}**: você aumenta a {{t:bet|aposta}} de outra pessoa.
- **{{t:fold|Desisto}}**: você descarta as cartas e perde o que já colocou.

:::note Para lembrar
Se alguém {{t:bet|apostou}}, você pode {{t:fold|desistir}}, {{t:call|pagar}} ou {{t:raise|aumentar}}. Se ninguém {{t:bet|apostou}}, você pode {{t:check|passar}} ou {{t:bet|apostar}}.
:::

:::note All-in e o {{t:side-pot|pote paralelo}}
Você não pode {{t:bet|apostar}} mais do que tem à sua frente. Quando você coloca todas as suas {{t:chips|fichas}}, fica **all-in**: não participa mais das apostas, e as {{t:community-cards|cartas comunitárias}} restantes são distribuídas até o fim. De cada adversário, você pode ganhar no máximo o quanto você mesmo colocou. Se os outros continuarem jogando por mais, o excedente vai para o **{{t:side-pot|pote paralelo}}** (side pot), que só eles disputam.
:::
