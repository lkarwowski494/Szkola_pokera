---
id: m9.l1
module: m9
order: 1
title: "SPR: relação entre stack e pote"
sub: "Quanto dinheiro resta atrás do pote"
rules: [R-M9-001, R-M9-002, R-M9-010]
drills:
  - kind: choice
    id: m9.l1.q-srp
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Você abriu}} do Button para {{n:pf.open-size}}, o {{t:big-blind}} {{t:call|pagou}}, stacks de {{n:format.stack}}. No flop há {{n:bb.pot-after.vs-btn}} no {{t:pot}}, e você ainda tem {{n:spr.srp.stack}} atrás. Qual é o {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Cerca de {{n:spr.srp}}", correct: true, why: "{{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}. O stack atrás do {{t:pot}} é mais de dez vezes maior que o {{t:pot}}: esse é um {{t:spr}} típico depois de uma {{t:open|abertura}} e um {{t:call|pagamento}}." }
      - { text: "Cerca de {{n:spr.srp.wrong-full}}", why: "Esse é o resultado com o stack inteiro de {{n:format.stack}}. Seus {{n:pf.open-size}} já estão no {{t:pot}}, então você conta só o que sobrou: {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.srp}}." }
      - { text: "Cerca de {{n:spr.3bet-ip}}", why: "Esse é o {{t:spr}} depois de um 3-bet e um {{t:call|pagamento}}. Num {{t:pot}} com um único aumento, o {{t:pot}} é bem menor, então o {{t:spr}} fica em cerca de {{n:spr.srp}}." }
  - kind: choice
    id: m9.l1.q-3bet-ip
    family: m9.spr
    rules: [R-M9-001]
    prompt: "O {{t:cutoff|CO}} {{t:open|abriu}} para {{n:pf.open-size}}, você {{t:raise|aumentou}} (3-bet) do Button para {{n:pf.3bet.ip-total}}, o {{t:cutoff|CO}} {{t:call|pagou}} e os blinds {{t:fold|desistiram}}. No flop há {{n:vs3bet.pot-after}} no {{t:pot}}, e você tem {{n:spr.3bet-ip.stack}} atrás. Qual é o {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Cerca de {{n:spr.3bet-ip}}", correct: true, why: "{{n:spr.3bet-ip.stack}} ÷ {{n:vs3bet.pot-after}} ≈ {{n:spr.3bet-ip}}. Depois de um 3-bet, o {{t:pot}} é três vezes maior do que depois de uma {{t:open|abertura}} comum, então o {{t:spr}} cai de cerca de {{n:spr.srp}} para cerca de {{n:spr.3bet-ip}}." }
      - { text: "Cerca de {{n:spr.3bet-ip.wrong-full}}", why: "Esse é o resultado com o stack inteiro de {{n:format.stack}}. Seu 3-bet de {{n:pf.3bet.ip-total}} já está no {{t:pot}}, então você divide só o que sobrou: {{n:spr.3bet-ip.stack}}." }
      - { text: "Cerca de {{n:spr.srp}}", why: "Esse é o {{t:spr}} num {{t:pot}} com um único aumento. Depois de um 3-bet, o {{t:pot}} é bem maior e o stack atrás dele é menor, então o {{t:spr}} cai para cerca de {{n:spr.3bet-ip}}." }
  - kind: choice
    id: m9.l1.q-3bet-oop
    family: m9.spr
    rules: [R-M9-001]
    prompt: "O Button {{t:open|abriu}}, você {{t:raise|aumentou}} (3-bet) do {{t:big-blind}} para {{n:pf.3bet.oop-total}} e o Button {{t:call|pagou}}. No flop há {{n:spr.3bet-oop.pot}} no {{t:pot}}, e você tem {{n:spr.3bet-oop.stack}} atrás. Qual é o {{t:spr}}?"
    table: { position: BB }
    options:
      - { text: "Cerca de {{n:spr.3bet-oop}}", correct: true, why: "{{n:spr.3bet-oop.stack}} ÷ {{n:spr.3bet-oop.pot}} ≈ {{n:spr.3bet-oop}}. {{t:out-of-position|Fora de posição}}, o 3-bet é maior, então o {{t:pot}} cresce mais e o {{t:spr}} fica menor do que depois de um 3-bet {{t:in-position|em posição}} ({{n:spr.3bet-ip}})." }
      - { text: "Cerca de {{n:spr.3bet-ip}}", why: "Esse é o {{t:spr}} depois de um 3-bet {{t:in-position|em posição}} para {{n:pf.3bet.ip-total}}. Seu 3-bet para {{n:pf.3bet.oop-total}} forma um {{t:pot}} maior, então o {{t:spr}} fica menor: cerca de {{n:spr.3bet-oop}}." }
      - { text: "Cerca de {{n:spr.4bet}}", why: "Um {{t:spr}} tão baixo só aparece depois de um 4-bet. Depois de um 3-bet para {{n:pf.3bet.oop-total}}, dá cerca de {{n:spr.3bet-oop}}." }
  - kind: choice
    id: m9.l1.q-lowest
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Stacks de {{n:format.stack}}. Em qual {{t:pot}} o {{t:spr}} no flop é o mais baixo?"
    options:
      - { text: "No {{t:pot}} com 4-bet e {{t:call|pagamento}}", correct: true, why: "Sim: quando o Button dá 4-bet para {{n:pf.4bet.example.low}} contra o 3-bet do {{t:small-blind}}, o {{t:small-blind}} {{t:call|paga}} e o {{t:big-blind}} já {{t:fold|desistiu}}, há {{n:spr.4bet.pot}} no {{t:pot}} e só {{n:spr.4bet.stack}} atrás dele. O {{t:spr}} fica em cerca de {{n:spr.4bet}}." }
      - { text: "No {{t:pot}} com 3-bet e {{t:call|pagamento}}", why: "Depois de um 3-bet, o {{t:spr}} fica em cerca de {{n:spr.3bet-ip}} {{t:in-position|em posição}} e cerca de {{n:spr.3bet-oop}} {{t:out-of-position|fora de posição}}. Um 4-bet o reduz ainda mais: para cerca de {{n:spr.4bet}}." }
      - { text: "No {{t:pot}} com um único aumento", why: "É o contrário: aqui o {{t:spr}} é o mais alto, cerca de {{n:spr.srp}}, porque o {{t:pot}} no flop é pequeno." }
  - kind: choice
    id: m9.l1.q-why-lower
    family: m9.spr-preflop
    rules: [R-M9-001]
    prompt: "Por que, depois de um 3-bet, o {{t:spr}} no flop é bem mais baixo do que depois de uma {{t:open|abertura}} comum?"
    options:
      - { text: "O {{t:pot}} fica várias vezes maior, e o stack atrás dele diminui pouco", correct: true, why: "Sim: o {{t:pot}} cresce de {{n:bb.pot-after.vs-btn}} para {{n:vs3bet.pot-after}}, e o stack atrás dele cai só de {{n:spr.srp.stack}} para {{n:spr.3bet-ip.stack}}. A razão cai de cerca de {{n:spr.srp}} para cerca de {{n:spr.3bet-ip}}." }
      - { text: "Porque depois de um 3-bet os jogadores têm stacks menores", why: "Só um pouco menores: {{n:spr.3bet-ip.stack}} em vez de {{n:spr.srp.stack}}. O que derruba o {{t:spr}} é o {{t:pot}} ser três vezes maior." }
      - { text: "Porque o 3-bet dá {{t:position|posição}}", why: "A {{t:position|posição}} depende do lugar na mesa, não do 3-bet. O {{t:spr}} é só o stack atrás do {{t:pot}} dividido pelo {{t:pot}}." }
  - kind: choice
    id: m9.l1.q-effective
    family: m9.spr
    rules: [R-M9-001]
    prompt: "{{t:open|Você abriu}} do Button para {{n:pf.open-size}} e tem {{n:format.stack}}. O {{t:big-blind}} tem só {{n:spr.short.stack}} e {{t:call|paga}}. {{t:pot|Pote}} no flop: {{n:bb.pot-after.vs-btn}}. Qual é o {{t:spr}}?"
    table: { position: BTN }
    options:
      - { text: "Cerca de {{n:spr.short}}", correct: true, why: "Você calcula a partir do {{t:effective-stack|stack efetivo}}, ou seja, o menor dos dois: o adversário ficou com {{n:spr.short.behind}}, então {{n:spr.short.behind}} ÷ {{n:bb.pot-after.vs-btn}} ≈ {{n:spr.short}}. Além do que já está no {{t:pot}}, cada um de vocês pode colocar no máximo mais {{n:spr.short.behind}}." }
      - { text: "Cerca de {{n:spr.srp}}", why: "Seria assim se o adversário também tivesse {{n:format.stack}}. Vocês só podem jogar pelo stack menor, então o {{t:spr}} fica em cerca de {{n:spr.short}}." }
      - { text: "Não dá para calcular, porque os stacks são diferentes", why: "Dá, sim: você usa o stack menor (o efetivo). O adversário ficou com {{n:spr.short.behind}}, então o {{t:spr}} ≈ {{n:spr.short}}." }
  - kind: choice
    id: m9.l1.q-when
    family: m9.spr
    rules: [R-M9-001]
    prompt: "Quando você calcula o {{t:spr}} que indica como jogar a mão depois do flop?"
    options:
      - { text: "No flop, antes que alguém faça uma {{t:bet|aposta}}", correct: true, why: "Sim: dá para calcular o {{t:spr}} em qualquer {{t:street|rodada}} (no M7 você o calculou no turn), mas para o plano da mão você usa o stack atrás do {{t:pot}} dividido pelo {{t:pot}} no início do flop. Assim você sabe quantos {{t:pot|potes}} restam para jogar nas três {{t:street|rodadas}}." }
      - { text: "Antes da mão, antes que alguém {{t:raise|aumente}}", why: "Antes do flop você ainda não sabe o tamanho do {{t:pot}}. O {{t:spr}} depende justamente do que aconteceu antes do flop: cerca de {{n:spr.srp}} depois de uma {{t:open|abertura}}, cerca de {{n:spr.3bet-ip}} depois de um 3-bet." }
      - { text: "No river, antes da última {{t:bet|aposta}}", why: "No river resta só uma decisão. Dá para calcular o {{t:spr}} ali também, mas para o plano da mão o mais útil é o {{t:spr}} do flop, porque ele abrange as três {{t:street|rodadas}}." }
  - kind: choice
    id: m9.l1.q-zone
    family: m9.spr-zone
    rules: [R-M9-010]
    prompt: "Você {{t:raise|aumentou}} do Button (3-bet) e o {{t:cutoff|CO}} {{t:call|pagou}}. O {{t:spr}} no flop é de cerca de {{n:spr.3bet-ip}}. Você acertou o {{t:top-pair|top pair}} com um bom kicker. Como você trata essa mão?"
    table: { position: BTN }
    options:
      - { text: "Como uma mão no limite: você joga {{t:value|por valor}}, mas nem sempre {{t:call|paga}} o all-in do adversário", correct: true, why: "Um {{t:spr}} de cerca de {{n:spr.3bet-ip}} está na zona de {{n:spr.zone.low}} a {{n:spr.zone.mid}}, em que o {{t:top-pair|top pair}} é uma mão no limite. A decisão sobre o stack inteiro depende de como o adversário joga e de como está a {{t:board|mesa}}." }
      - { text: "Você sempre joga pelo stack inteiro", why: "Em geral isso só acontece com {{t:spr}} abaixo de cerca de {{n:spr.zone.low}}, por exemplo depois de um 4-bet (cerca de {{n:spr.4bet}}). Com {{t:spr}} de cerca de {{n:spr.3bet-ip}}, são necessárias mais {{t:bet|apostas}} até o all-in, e quem paga até o fim são principalmente mãos mais fortes." }
      - { text: "Você joga com cautela, como num {{t:spr}} muito alto", why: "Você joga o {{t:top-pair|top pair}} com essa cautela acima de cerca de {{n:spr.zone.deep}}, por exemplo num {{t:pot}} com um único aumento (cerca de {{n:spr.srp}}). Depois de um 3-bet, o {{t:spr}} é bem mais baixo." }
  - kind: numeric
    id: m9.l1.n-jam-spr2
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "Flop. Há {{n:ex.pot}} no {{t:pot}}, e o adversário vai all-in por {{n:commit.stack}} ({{t:spr}} {{n:spr.commit}}). De quanta equity você precisa para {{t:call|pagar}}? Digite o número em porcentagem."
    answer: eq.jam.spr2
    explanation: "Você coloca {{n:commit.stack}}, e o {{t:pot}} depois do {{t:call|pagamento}} fica em {{n:ex.pot}} + {{n:commit.stack}} + {{n:commit.stack}}. Equity necessária = {{n:commit.stack}} ÷ ({{n:ex.pot}} + 2·{{n:commit.stack}}) = {{n:eq.jam.spr2}}."
  - kind: choice
    id: m9.l1.q-jam-price
    family: m9.spr-price
    rules: [R-M9-002]
    prompt: "No flop, o adversário vai all-in com o stack inteiro ({{n:format.stack}} no início da mão). Em qual {{t:pot}} você precisa de menos equity para {{t:call|pagar}}?"
    options:
      - { text: "Depois de um 4-bet: cerca de {{n:eq.jam.4bet}}", correct: true, why: "Com {{t:spr}} de cerca de {{n:spr.4bet}}, você coloca {{n:spr.4bet.stack}} para ganhar o {{t:pot}} de {{n:spr.4bet.pot}} e o stack do adversário. Quanto mais baixo o {{t:spr}}, melhor o preço." }
      - { text: "Depois de um 3-bet: cerca de {{n:eq.jam.3bet-ip}}", why: "Depois de um 3-bet {{t:in-position|em posição}}, você precisa de cerca de {{n:eq.jam.3bet-ip}}. Depois de um 4-bet, o {{t:pot}} é maior em relação ao stack, então basta cerca de {{n:eq.jam.4bet}}." }
      - { text: "Depois de uma {{t:open|abertura}} e um {{t:call|pagamento}}: cerca de {{n:eq.jam.srp}}", why: "Esse é o pior preço dos três: com {{t:spr}} de cerca de {{n:spr.srp}}, você coloca {{n:spr.srp.stack}} para ganhar um {{t:pot}} pequeno de {{n:bb.pot-after.vs-btn}} e o stack do adversário." }
---
Antes do flop, você decide quanto dinheiro vai para o {{t:pot}}. Depois do flop, o que importa é quanto ainda resta atrás dele. Um único número une as duas coisas: o {{t:spr}}.

## O que é o {{t:spr}}

O {{t:spr}} (em inglês, stack-to-pot ratio) é a relação entre o stack e o {{t:pot}} no início de uma {{t:street|rodada}}. Dá para calculá-lo em qualquer {{t:street|rodada}} (no M7 você o calculou no turn), mas para o plano da mão você usa o {{t:spr}} do flop, antes que alguém faça uma {{t:bet|aposta}}.

```formula
SPR = stack efetivo ÷ pote no flop
```

O {{t:effective-stack|stack efetivo}} é o menor dos dois stacks, sem contar o que já está no {{t:pot}}. É o máximo que cada jogador ainda pode colocar no {{t:pot}}: além do {{t:pot}}, você não ganha do adversário mais do que o {{t:effective-stack|stack efetivo}}, e esse é o máximo que você ainda pode perder.

Exemplo: {{t:open|você abriu}} do Button para {{n:pf.open-size}} e o {{t:big-blind}} {{t:call|pagou}}. O {{t:pot}} no flop é de {{n:bb.pot-after.vs-btn}}, e você ainda tem {{n:spr.srp.stack}} atrás. {{t:spr}} = {{n:spr.srp.stack}} ÷ {{n:bb.pot-after.vs-btn}} ≈ **{{n:spr.srp}}**.

## O pré-flop define o {{t:spr}}

Cada {{t:raise|aumento}} antes do flop deixa o {{t:pot}} várias vezes maior, enquanto o stack atrás dele diminui bem mais devagar. Por isso o {{t:spr}} depende muito do que aconteceu antes do flop.

| {{t:pot|Pote}} (stacks de {{n:format.stack}}) | {{t:pot|Pote}} no flop | Stack atrás do {{t:pot}} | {{t:spr}} |
|---|---|---|---|
| {{t:open|Abertura}} e {{t:call|pagamento}} | {{n:bb.pot-after.vs-btn}} | {{n:spr.srp.stack}} | {{n:spr.srp}} |
| 3-bet {{t:in-position|em posição}} e {{t:call|pagamento}} | {{n:vs3bet.pot-after}} | {{n:spr.3bet-ip.stack}} | {{n:spr.3bet-ip}} |
| 3-bet do {{t:big-blind}} e {{t:call|pagamento}} | {{n:spr.3bet-oop.pot}} | {{n:spr.3bet-oop.stack}} | {{n:spr.3bet-oop}} |
| 4-bet do Button contra 3-bet do {{t:small-blind}} e {{t:call|pagamento}} | {{n:spr.4bet.pot}} | {{n:spr.4bet.stack}} | {{n:spr.4bet}} |

## Zonas de {{t:spr}}

Você define as zonas de {{t:spr}} pelo {{t:spr}} no flop. Quanto mais alto o {{t:spr}}, mais forte precisa ser a mão para jogar pelo stack inteiro:

| {{t:spr}} | Com o que você costuma jogar pelo stack inteiro |
|---|---|
| abaixo de {{n:spr.zone.low}} | {{t:top-pair|top pair}} e mãos melhores |
| de {{n:spr.zone.low}} a {{n:spr.zone.mid}} | o {{t:top-pair|top pair}} é uma mão no limite |
| de {{n:spr.zone.mid}} a {{n:spr.zone.deep}} | {{t:two-pair|dois pares}} altos e mãos melhores |
| acima de {{n:spr.zone.deep}} | set, {{t:straight|sequência}} e mãos melhores |

Depois de uma {{t:open|abertura}} e um {{t:call|pagamento}} ({{t:spr}} de cerca de {{n:spr.srp}}), você está na zona mais alta; depois de um 3-bet (cerca de {{n:spr.3bet-ip}}), na zona em que o {{t:top-pair|top pair}} fica no limite; e depois de um 4-bet (cerca de {{n:spr.4bet}}), na mais baixa. Os limites são uma simplificação. As fontes dividem as zonas de formas diferentes, mas concordam que, abaixo de cerca de {{n:spr.zone.low}}, o {{t:top-pair|top pair}} joga pelo stack, e que, com {{t:spr}} mais alto, um único {{t:pair|par}} faz isso cada vez menos. O limite de {{n:spr.zone.mid}} é uma convenção adotada no aplicativo. O limite de {{n:spr.zone.deep}} vem da conta: com {{t:spr}} de {{n:spr.zone.deep}}, três {{t:bet|apostas}} do tamanho do {{t:pot}} levam ao all-in.

## {{t:spr}} baixo: preço melhor no all-in

Quando o adversário vai all-in com o stack inteiro, você coloca seu stack para ganhar o {{t:pot}} e o stack dele. Equity necessária = stack ÷ ({{t:pot}} + 2·stack). Com {{t:spr}} de {{n:spr.commit}}, isso dá {{n:eq.jam.spr2}}; depois de um 4-bet, cerca de {{n:eq.jam.4bet}}; depois de um 3-bet, cerca de {{n:eq.jam.3bet-ip}}; e num {{t:pot}} com um único aumento, já cerca de {{n:eq.jam.srp}}.

Quanto mais baixo o {{t:spr}}, menos dinheiro resta para jogar e mais fácil é colocar o stack inteiro. Quanto mais alto, mais {{t:street|rodadas}} e {{t:bet|apostas}} restam até o stack ir para o {{t:pot}}.

:::note De onde vêm esses números
Os {{t:pot|potes}} e stacks vêm dos tamanhos do módulo sobre o jogo pré-flop ({{t:open|abertura}} de {{n:pf.open-size}}, 3-bet para {{n:pf.3bet.ip-total}} ou {{n:pf.3bet.oop-total}}, 4-bet para {{n:pf.4bet.example.low}}). O {{t:pot}} depois do 4-bet é um cenário: o Button dá 4-bet sobre o 3-bet do {{t:small-blind}}, o {{t:small-blind}} {{t:call|paga}} e o {{t:big-blind}} já {{t:fold|desistiu}}, deixando o blind dele no {{t:pot}}. Outro tamanho gera um {{t:spr}} um pouco diferente, mas a ordem é sempre a mesma: quanto mais {{t:raise|aumentos}} antes do flop, mais baixo o {{t:spr}}.
:::
