---
id: m9.l1
module: m9
order: 1
title: "SPR: relação entre stack e pote"
sub: "Quanto dinheiro fica atrás do pote"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Abriu}} do Button para {{n:pf.open-size}}, o {{t:big-blind}} {{t:call|pagou}}, stacks de {{n:format.stack}}. No flop, o {{t:pot|pote}} tem {{n:bb.pot-after.vs-btn}} e ficam-lhe {{n:spr.srp.stack}} atrás. Quanto é o {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Cerca de {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}. O stack atrás do {{t:pot|pote}} é mais de dez vezes maior do que o {{t:pot}}: é um {{t:spr}} típico depois de uma {{t:open|abertura}} e de um {{t:call|pagamento}}." }
      - { text: "Cerca de {{n:spr.srp.wrong-full}}", why: "É o que dá com o stack inteiro de {{n:format.stack}}. Os seus {{n:pf.open-size}} já estão no {{t:pot|pote}}, por isso conta apenas o que ficou: {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}." }
      - { text: "Cerca de {{n:spr.3bet-ip}}", why: "É o {{t:spr}} depois de um 3-bet e de um {{t:call|pagamento}}. Num {{t:pot|pote}} com uma só subida, o {{t:pot}} é muito menor, por isso o {{t:spr}} é de cerca de {{n:spr.srp}}." }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "O {{t:cutoff|CO}} {{t:open|abriu}} para {{n:pf.open-size}}. Está no Button e {{t:raise|aumentou}} (3-bet) para {{n:pf.3bet.ip-total}}, o {{t:cutoff|CO}} {{t:call|pagou}} e os blinds {{t:fold|desistiram}}. No flop, o {{t:pot|pote}} tem {{n:vs3bet.pot-after}} e ficam-lhe {{n:spr.3bet-ip.stack}} atrás. Quanto é o {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Cerca de {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}. Depois de um 3-bet, o {{t:pot}} é três vezes maior do que depois de uma {{t:open|abertura}} normal, por isso o {{t:spr}} desce de cerca de {{n:spr.srp}} para cerca de {{n:spr.3bet-ip}}." }
      - { text: "Cerca de {{n:spr.3bet-ip.wrong-full}}", why: "É o que dá com o stack inteiro de {{n:format.stack}}. O seu 3-bet de {{n:pf.3bet.ip-total}} já está no {{t:pot|pote}}, por isso divide apenas o que ficou: {{n:spr.3bet-ip.stack}}." }
      - { text: "Cerca de {{n:spr.srp}}", why: "É o {{t:spr}} num {{t:pot|pote}} com uma só subida. Depois de um 3-bet, o {{t:pot}} é muito maior e o stack atrás dele é menor, por isso o {{t:spr}} desce para cerca de {{n:spr.3bet-ip}}." }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "O Button {{t:open|abriu}}. Está no {{t:big-blind|big blind}} e {{t:raise|aumentou}} (3-bet) para {{n:pf.3bet.oop-total}}; o Button {{t:call|pagou}}. No flop, o {{t:pot|pote}} tem {{n:spr.3bet-oop.pot}} e ficam-lhe {{n:spr.3bet-oop.stack}} atrás. Quanto é o {{t:spr}}?"
    table: { position: BB }
    options:
      - { text: "Cerca de {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}. {{t:out-of-position|Fora de posição}}, o 3-bet é maior, por isso o {{t:pot}} cresce mais e o {{t:spr}} é mais baixo do que depois de um 3-bet {{t:in-position}} ({{n:spr.3bet-ip}})." }
      - { text: "Cerca de {{n:spr.3bet-ip}}", why: "É o {{t:spr}} depois de um 3-bet {{t:in-position}} para {{n:pf.3bet.ip-total}}. O seu 3-bet para {{n:pf.3bet.oop-total}} cria um {{t:pot|pote}} maior, por isso o {{t:spr}} é mais baixo: cerca de {{n:spr.3bet-oop}}." }
      - { text: "Cerca de {{n:spr.4bet}}", why: "Um {{t:spr}} tão baixo só surge com um 4-bet. Depois de um 3-bet para {{n:pf.3bet.oop-total}}, fica em cerca de {{n:spr.3bet-oop}}." }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Stacks de {{n:format.stack}}. Em que {{t:pot|pote}} o {{t:spr}} no flop é o mais baixo?"
    options:
      - { text: "Num {{t:pot|pote}} com 4-bet e {{t:call|pagamento}}", correct: true, why: "Sim: quando o Button faz 4-bet para {{n:pf.4bet.example.low}} contra o 3-bet do {{t:small-blind|small blind}}, o {{t:small-blind}} {{t:call|paga}} e o {{t:big-blind}} {{t:fold|desistiu}}, o {{t:pot|pote}} tem {{n:spr.4bet.pot}} e atrás dele ficam apenas {{n:spr.4bet.stack}}. O {{t:spr}} é de cerca de {{n:spr.4bet}}." }
      - { text: "Num {{t:pot|pote}} com 3-bet e {{t:call|pagamento}}", why: "Depois de um 3-bet, o {{t:spr}} é de cerca de {{n:spr.3bet-ip}} {{t:in-position}} e de cerca de {{n:spr.3bet-oop}} {{t:out-of-position}}. Um 4-bet baixa-o ainda mais: para cerca de {{n:spr.4bet}}." }
      - { text: "Num {{t:pot|pote}} com uma só subida", why: "Pelo contrário: aqui o {{t:spr}} é o mais alto, cerca de {{n:spr.srp}}, porque o {{t:pot}} no flop é pequeno." }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Porque é que, depois de um 3-bet, o {{t:spr}} no flop é muito mais baixo do que depois de uma {{t:open|abertura}} normal?"
    options:
      - { text: "O {{t:pot|pote}} cresce várias vezes e o stack atrás dele diminui pouco", correct: true, why: "Sim: o {{t:pot}} cresce de {{n:bb.pot-after.vs-btn}} para {{n:vs3bet.pot-after}}, enquanto o stack atrás dele desce apenas de {{n:spr.srp.stack}} para {{n:spr.3bet-ip.stack}}. O quociente desce de cerca de {{n:spr.srp}} para cerca de {{n:spr.3bet-ip}}." }
      - { text: "Porque, depois de um 3-bet, os jogadores têm stacks menores", why: "Só um pouco menores: {{n:spr.3bet-ip.stack}} em vez de {{n:spr.srp.stack}}. O que determina a descida do {{t:spr}} é o {{t:pot}} ser três vezes maior." }
      - { text: "Porque o 3-bet dá {{t:position|posição}}", why: "A {{t:position|posição}} depende do lugar à mesa, não do 3-bet. O {{t:spr}} é apenas o stack atrás do {{t:pot|pote}} dividido pelo {{t:pot|pote}}." }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Abriu}} do Button para {{n:pf.open-size}} e tem {{n:format.stack}}. O {{t:big-blind|big blind}} tem apenas {{n:spr.short.stack}} e {{t:call|paga}}. {{t:pot|Pote}} no flop: {{n:bb.pot-after.vs-btn}}. Quanto é o {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Cerca de {{n:spr.short}}", correct: true, why: "Calcula a partir do {{t:effective-stack|stack efetivo}}, ou seja, o menor dos dois: ao adversário ficaram {{n:spr.short.behind}}, por isso {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}. Além do que já está no {{t:pot|pote}}, cada um dos jogadores pode ainda pôr, no máximo, {{n:spr.short.behind}}." }
      - { text: "Cerca de {{n:spr.srp}}", why: "Assim seria se o adversário também tivesse {{n:format.stack}}. Só se pode jogar pelo stack menor, por isso o {{t:spr}} é de cerca de {{n:spr.short}}." }
      - { text: "Não é possível calcular, porque os stacks são diferentes", why: "É possível: usa o stack menor (o efetivo). Ao adversário ficaram {{n:spr.short.behind}}, por isso o {{t:spr}} ≈ {{n:spr.short}}." }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Quando calcula o {{t:spr}} que indica como jogar a mão depois do flop?"
    options:
      - { text: "No flop, antes de alguém fazer uma {{t:bet|aposta}}", correct: true, why: "Sim: o {{t:spr}} pode ser calculado em qualquer {{t:street|ronda}} (no M7 calculou-o no turn), mas para o plano da mão usa o stack atrás do {{t:pot|pote}} dividido pelo {{t:pot|pote}} no início do flop. Assim sabe quantos {{t:pot|potes}} restam para jogar em três {{t:street|rondas}}." }
      - { text: "Antes da mão, antes de alguém {{t:raise|aumentar}}", why: "Antes do flop ainda não sabe que tamanho terá o {{t:pot}}. O {{t:spr}} depende precisamente do que aconteceu antes do flop: depois de uma {{t:open|abertura}}, cerca de {{n:spr.srp}}; depois de um 3-bet, cerca de {{n:spr.3bet-ip}}." }
      - { text: "No river, antes da última {{t:bet|aposta}}", why: "No river resta apenas uma decisão. O {{t:spr}} também pode ser calculado aí, mas para o plano da mão o mais útil é o {{t:spr}} do flop, porque abrange as três {{t:street|rondas}}." }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "Do Button, {{t:raise|aumentou}} (3-bet) e o {{t:cutoff|CO}} {{t:call|pagou}}. O {{t:spr}} no flop é de cerca de {{n:spr.3bet-ip}}. Acertou um {{t:top-pair|top pair}} com um bom kicker. Como trata esta mão?"
    table: { position: BTN }
    options:
      - { text: "Como uma mão no limite: joga-a por {{t:value|valor}}, mas nem sempre {{t:call|paga}} o all-in do adversário", correct: true, why: "Um {{t:spr}} de cerca de {{n:spr.3bet-ip}} está na zona de {{n:spr.zone.low}} a {{n:spr.zone.mid}}, em que o {{t:top-pair}} é uma mão no limite. A decisão de jogar o stack inteiro depende de como o adversário joga e de como é a {{t:board|mesa}}." }
      - { text: "Joga sempre pelo stack inteiro", why: "Normalmente, isso só acontece com um {{t:spr}} abaixo de cerca de {{n:spr.zone.low}}, p. ex. depois de um 4-bet (cerca de {{n:spr.4bet}}). Com um {{t:spr}} de cerca de {{n:spr.3bet-ip}}, são precisas mais {{t:bet|apostas}} para chegar ao all-in, e até ao fim pagam sobretudo mãos mais fortes." }
      - { text: "Joga com cautela, como com um {{t:spr}} muito alto", why: "É com essa cautela que joga um {{t:top-pair|top pair}} acima de cerca de {{n:spr.zone.deep}}, p. ex. num {{t:pot|pote}} com uma só subida (cerca de {{n:spr.srp}}). Depois de um 3-bet, o {{t:spr}} é muito mais baixo." }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Flop. O {{t:pot|pote}} tem {{n:ex.pot}} e o adversário vai all-in por {{n:commit.stack}} ({{t:spr}} {{n:spr.commit}}). De quanta equity precisa para {{t:call|pagar}}? Introduza o número em percentagem."
    answer: eq.jam.spr2
    explanation: "Paga {{n:commit.stack}} e o {{t:pot}} depois do {{t:call|pagamento}} fica em {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}. Equity necessária = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}."
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "No flop, o adversário vai all-in com o stack inteiro ({{n:format.stack}} no início da mão). Em que {{t:pot|pote}} precisa de menos equity para {{t:call|pagar}}?"
    options:
      - { text: "Depois de um 4-bet: cerca de {{n:eq.jam.4bet}}", correct: true, why: "Com um {{t:spr}} de cerca de {{n:spr.4bet}}, paga {{n:spr.4bet.stack}} para ganhar o {{t:pot|pote}} de {{n:spr.4bet.pot}} e o stack do adversário. Quanto mais baixo o {{t:spr}}, melhor o preço." }
      - { text: "Depois de um 3-bet: cerca de {{n:eq.jam.3bet-ip}}", why: "Depois de um 3-bet {{t:in-position}}, precisa de cerca de {{n:eq.jam.3bet-ip}}. Depois de um 4-bet, o {{t:pot}} é maior em relação ao stack, por isso basta cerca de {{n:eq.jam.4bet}}." }
      - { text: "Depois de uma {{t:open|abertura}} e de um {{t:call|pagamento}}: cerca de {{n:eq.jam.srp}}", why: "É o pior preço dos três: com um {{t:spr}} de cerca de {{n:spr.srp}}, paga {{n:spr.srp.stack}} para ganhar o pequeno {{t:pot|pote}} de {{n:bb.pot-after.vs-btn}} e o stack do adversário." }
---
Antes do flop, decide quanto dinheiro vai para o {{t:pot|pote}}. Depois do flop, conta quanto ainda resta atrás dele. Um único número liga as duas coisas: o {{t:spr}}.

## O que é o {{t:spr}}

O {{t:spr}} (em inglês, stack-to-pot ratio) é a relação entre o stack e o {{t:pot|pote}} no início de uma {{t:street|ronda}}. Pode ser calculado em qualquer {{t:street|ronda}} (no M7 calculou-o no turn), mas para o plano da mão usa o {{t:spr}} do flop, antes de alguém fazer uma {{t:bet|aposta}}.

```formula
SPR = stack efetivo ÷ pote no flop
```

O {{t:effective-stack|stack efetivo}} é o menor dos dois stacks, sem contar o que já está no {{t:pot|pote}}. É o máximo que cada jogador ainda pode acrescentar ao {{t:pot|pote}}: além do {{t:pot|pote}}, não pode ganhar ao adversário mais do que o {{t:effective-stack}}, e é esse o máximo que ainda pode perder.

Exemplo: {{t:open|abriu}} do Button para {{n:pf.open-size}} e o {{t:big-blind}} {{t:call|pagou}}. O {{t:pot|pote}} no flop é de {{n:bb.pot-after.vs-btn}} e ficam-lhe {{n:spr.srp.stack}} atrás. {{t:spr}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**.

## O preflop define o {{t:spr}}

Cada {{t:raise}} antes do flop multiplica várias vezes o {{t:pot|pote}}, enquanto o stack atrás dele diminui muito mais devagar. Por isso, o {{t:spr}} depende muito do que aconteceu antes do flop.

| {{t:pot|Pote}} (stacks de {{n:format.stack}}) | {{t:pot|Pote}} no flop | Stack atrás do {{t:pot|pote}} | {{t:spr}} |
|---|---|---|---|
| {{t:open|Abertura}} e {{t:call}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| 3-bet {{t:in-position}} e {{t:call}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| 3-bet do {{t:big-blind|big blind}} e {{t:call}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| 4-bet do Button contra 3-bet do {{t:small-blind|small blind}} e {{t:call}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## Zonas de {{t:spr}}

As zonas de {{t:spr}} determinam-se a partir do {{t:spr}} no flop. Quanto mais alto o {{t:spr}}, mais forte tem de ser a mão para jogar pelo stack inteiro:

| {{t:spr}} | Com que mãos joga normalmente pelo stack inteiro |
|---|---|
| abaixo de {{n:spr.zone.low}} | {{t:top-pair}} e superior |
| de {{n:spr.zone.low}} a {{n:spr.zone.mid}} | {{t:top-pair}} é uma mão no limite |
| de {{n:spr.zone.mid}} a {{n:spr.zone.deep}} | {{t:two-pair}} altos e superior |
| acima de {{n:spr.zone.deep}} | set, {{t:straight}} e superior |

Depois de uma {{t:open|abertura}} e de um {{t:call|pagamento}} ({{t:spr}} de cerca de {{n:spr.srp}}), está na zona mais alta; depois de um 3-bet (cerca de {{n:spr.3bet-ip}}), na zona em que o {{t:top-pair}} está no limite; e depois de um 4-bet (cerca de {{n:spr.4bet}}), na mais baixa. Os limiares são uma simplificação. As fontes dividem as zonas de forma diferente, mas concordam que, abaixo de cerca de {{n:spr.zone.low}}, o {{t:top-pair}} joga pelo stack e, com um {{t:spr}} mais alto, um único {{t:pair}} fá-lo cada vez menos. O limite de {{n:spr.zone.mid}} é uma convenção adotada na aplicação. O limiar de {{n:spr.zone.deep}} resulta das contas: com um {{t:spr}} de {{n:spr.zone.deep}}, três {{t:bet|apostas}} do tamanho do {{t:pot|pote}} levam ao all-in.

## {{t:spr}} baixo: melhor preço para o all-in

Quando o adversário vai all-in com o stack inteiro, paga o stack para ganhar o {{t:pot|pote}} e o stack dele. Equity necessária = stack ÷ ({{t:pot}} + 2·stack). Com um {{t:spr}} de {{n:spr.commit}}, isso dá {{n:eq.jam.spr2}}; depois de um 4-bet, cerca de {{n:eq.jam.4bet}}; depois de um 3-bet, cerca de {{n:eq.jam.3bet-ip}}; e num {{t:pot|pote}} com uma só subida, já cerca de {{n:eq.jam.srp}}.

Quanto mais baixo o {{t:spr}}, menos dinheiro resta para jogar e mais fácil é pôr o stack inteiro. Quanto mais alto, mais {{t:street|rondas}} e {{t:bet|apostas}} restam até o stack ir para o {{t:pot|pote}}.

:::note De onde vêm estes números
Os {{t:pot|potes}} e os stacks vêm dos tamanhos do módulo sobre o jogo antes do flop ({{t:open}} {{n:pf.open-size}}, 3-bet para {{n:pf.3bet.ip-total}} ou {{n:pf.3bet.oop-total}}, 4-bet para {{n:pf.4bet.example.low}}). O {{t:pot|pote}} depois do 4-bet é um cenário: o Button faz 4-bet ao 3-bet do {{t:small-blind|small blind}}, o {{t:small-blind}} {{t:call|paga}} e o {{t:big-blind}} {{t:fold|desistiu}}, e o blind dele fica no {{t:pot|pote}}. Outro tamanho dá um {{t:spr}} um pouco diferente, mas a ordem é sempre a mesma: quanto mais {{t:raise|aumentos}} antes do flop, mais baixo o {{t:spr}}.
:::
