---
id: m9.l2
module: m9
order: 2
title: "Compromisso"
sub: "Quando joga pelo stack inteiro"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: no {{t:pot|pote}} estão {{n:ex.pot}}, stacks de {{n:commit.stack}} cada. Aposta o {{t:pot|pote}} inteiro ({{n:ex.bet.pot}}) e o adversário vai all-in. Tem de pagar mais {{n:commit.after-pot.call}}. De quanta equity precisa para {{t:call|pagar}}? Introduza o número em percentagem."
    answer: eq.commit.after-pot
    explanation: "Antes do excedente do adversário, no {{t:pot|pote}} estão {{n:ex.pot.after-pot-call}} (o {{t:pot|pote}}, a sua {{t:bet|aposta}} e o valor com que ele a iguala). Paga mais {{n:commit.after-pot.call}}, portanto a equity necessária = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}. Depois de uma {{t:bet|aposta}} assim, está comprometido: {{t:fold|desistir}} normalmente não compensa."
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: no {{t:pot|pote}} estão {{n:ex.pot}}, stacks de {{n:commit.stack}} cada. Aposta metade do {{t:pot|pote}} ({{n:ex.bet.half}}) e o adversário vai all-in. Tem de pagar mais {{n:commit.after-half.call}}. De quanta equity precisa para {{t:call|pagar}}? Introduza o número em percentagem."
    answer: eq.commit.after-half
    explanation: "Antes do excedente do adversário, no {{t:pot|pote}} estão {{n:ex.half.total}} (o {{t:pot|pote}}, a sua {{t:bet|aposta}} e o valor com que ele a iguala). Paga mais {{n:commit.after-half.call}}: {{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}. É menos do que contra um all-in imediato ({{n:eq.jam.spr2}}), porque já colocou parte do dinheiro."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}. Tem {{t:top-pair|top pair}}, aposta o {{t:pot|pote}} inteiro e o adversário vai all-in. Para {{t:call|pagar}} precisa de {{n:eq.commit.after-pot}} de equity. O que faz?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Sim: o preço é muito bom. Com um {{t:spr}} baixo, o adversário vai all-in também com {{t:draw|draws}} e damas mais fracas, por isso o {{t:top-pair|top pair}} com ás tem normalmente muito mais do que {{n:eq.commit.after-pot}} de equity. Só perde claramente contra {{t:two-pair|dois pares}} e sets." }
      - { text: "{{t:fold|Desisto}}, porque o all-in mostra uma mão forte", why: "{{t:fold|Desistir}} entrega um {{t:pot|pote}} no qual já colocou bastante. Só precisa de ganhar uma vez em cinco, ou seja, em {{n:eq.commit.after-pot}} dos casos. Se tencionava {{t:fold|desistir}} aqui, teria sido melhor não apostar o {{t:pot|pote}} inteiro." }
      - { text: "{{t:fold|Desisto}}, porque o {{t:spr}} é baixo", why: "Um {{t:spr}} baixo funciona ao contrário: com ele é mais fácil jogar pelo stack inteiro, porque o preço do all-in é melhor." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "Depois da sua {{t:bet|aposta}}, ficaria com menos no stack do que o {{t:pot|pote}} depois de essa aposta ser {{t:call|paga}}. Que plano não faz sentido?"
    options:
      - { text: "{{t:bet|Apostar}} e {{t:fold|desistir}} se o adversário for all-in", correct: true, why: "Sim, este plano é um erro: depois de uma {{t:bet|aposta}} assim, precisa de muito pouca equity para {{t:call|pagar}} o all-in (com {{t:spr}} {{n:spr.commit}} e uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}}, apenas {{n:eq.commit.after-pot}}). Se {{t:fold|desistir}} na mesma, a {{t:bet|aposta}} só oferece {{t:chips|fichas}}." }
      - { text: "All-in de imediato", why: "É um plano sensato com uma mão forte: joga pelo stack inteiro de qualquer forma, por isso coloca-o já." }
      - { text: "{{t:check|Passar}}", why: "Também é sensato quando não quer jogar pelo stack inteiro: não coloca dinheiro com o qual depois seria difícil {{t:fold|desistir}}." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pote}} depois de um 4-bet, {{t:spr}} de cerca de {{n:spr.4bet}}. Acertou {{t:top-pair|top pair}} com o melhor kicker. Qual é o plano?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "Jogo pelo stack inteiro", correct: true, why: "Sim: com {{t:spr}} de cerca de {{n:spr.4bet}}, para o all-in precisa apenas de cerca de {{n:eq.jam.4bet}} de equity, e o {{t:top-pair|top pair}} com ás é aqui muito forte. Aposta ou {{t:call|paga}} com o plano de colocar tudo." }
      - { text: "Jogo com cautela e {{t:fold|desisto}} perante uma {{t:bet|aposta}} grande", why: "Com um {{t:spr}} tão baixo, {{t:fold|desistir}} com {{t:top-pair|top pair}} entrega demasiado. Depois de um 4-bet, o adversário também tem AQ, QQ, JJ e outras mãos que perdem contra a sua." }
      - { text: "Aposto pouco e {{t:fold|desisto}} perante um all-in", why: "É um plano de {{t:bet|apostar}} e {{t:fold|desistir}} com um {{t:spr}} baixo: depois da {{t:bet|aposta}}, o preço do all-in fica ainda melhor, e {{t:fold|desistir}} entrega um {{t:pot|pote}} no qual já colocou dinheiro." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Porque é que, com {{t:spr}} de cerca de {{n:spr.commit}}, o {{t:top-pair|top pair}} normalmente joga pelo stack inteiro?"
    options:
      - { text: "Porque para o all-in precisa de cerca de {{n:eq.jam.spr2}} de equity, e duas {{t:bet|apostas}} de cerca de {{n:geo.spr2.2}} do {{t:pot|pote}} colocam o stack inteiro", correct: true, why: "Sim: o preço é bom, e para colocar o stack bastam duas {{t:value|rondas de valor}}. O {{t:top-pair|top pair}} normalmente aguenta isso. O limiar em si é uma heurística: também conta com que mãos o adversário joga." }
      - { text: "Porque o {{t:top-pair|top pair}} ganha sempre", why: "Nem sempre: por vezes o adversário tem {{t:two-pair|dois pares}} ou um set. Com um {{t:spr}} baixo, porém, mãos piores e {{t:draw|draws}} colocam dinheiro suficiente, e o preço é bom." }
      - { text: "Porque com {{t:spr}} {{n:spr.commit}} as regras não permitem {{t:fold|desistir}}", why: "Pode sempre {{t:fold|desistir}}. O que importa é que {{t:fold|desistir}} normalmente custa mais do que rende: para o all-in precisa apenas de cerca de {{n:eq.jam.spr2}} de equity." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "{{t:pot|Pote}} com uma só subida, stacks de {{n:format.stack}}, {{t:spr}} de cerca de {{n:spr.srp}}. Acertou {{t:top-pair|top pair}} com um bom kicker. Como trata esta mão?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "Como mão de valor, mas normalmente não para o stack inteiro", correct: true, why: "Sim: com {{t:spr}} de cerca de {{n:spr.srp}}, o stack inteiro só entra depois de várias {{t:bet|apostas}} maiores do que o {{t:pot|pote}}. Um adversário que coloca tanto raramente tem uma mão pior do que um {{t:pair|par}}." }
      - { text: "Jogo pelo stack inteiro, porque o {{t:top-pair|top pair}} é forte", why: "Com {{t:spr}} {{n:spr.commit}}, sim, mas aqui o {{t:spr}} é de cerca de {{n:spr.srp}}. Quando o stack inteiro está no {{t:pot|pote}}, o adversário normalmente tem {{t:two-pair|dois pares}}, um set ou um {{t:pair|par}} melhor." }
      - { text: "{{t:fold|Desisto}} perante a primeira {{t:bet|aposta}} do adversário", why: "Demasiado cauteloso: o {{t:top-pair|top pair}} com um bom kicker é uma mão forte neste flop. A ideia é não construir com ela um {{t:pot|pote}} do stack inteiro, e não {{t:fold|desistir}}." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pote}} depois de um 4-bet, {{t:spr}} de cerca de {{n:spr.4bet}}. Tem um {{t:pair|par}} de valetes, e no flop há um ás e um rei. O adversário vai all-in. E a regra «com {{t:spr}} baixo, jogo pelo stack»?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "Não abrange esta mão: é um {{t:pair|par}} mais baixo do que as duas cartas altas da {{t:board|mesa}}", correct: true, why: "Sim: a regra refere-se ao {{t:top-pair|top pair}} e a mãos melhores. Depois de um 4-bet, o adversário tem frequentemente um ás ou um rei, e os seus valetes perdem contra qualquer {{t:pair|par}} feito com uma carta alta. Aqui {{t:fold|desiste}} mais vezes, apesar do bom preço ({{n:eq.jam.4bet}})." }
      - { text: "Abrange: com {{t:spr}} baixo, {{t:call|pago}} com tudo", why: "Um {{t:spr}} baixo dá um bom preço, mas não transforma uma mão fraca numa forte. Quando o adversário tem frequentemente um {{t:pair|par}} melhor, até {{n:eq.jam.4bet}} de equity pode ser demasiado." }
      - { text: "Abrange, mas só quando tenho {{t:position|posição}}", why: "A {{t:position|posição}} não muda aquilo com que joga. A regra aplica-se ao {{t:top-pair|top pair}} e a mãos melhores." }
---
O compromisso (em inglês, commitment) é uma situação em que já há tanto dinheiro no {{t:pot|pote}} em relação ao seu stack que {{t:fold|desistir}} perante um all-in quase nunca compensa. O {{t:spr}} da lição anterior indica quão perto disso já está no início do flop.

## Depois de uma {{t:bet|aposta}}, o preço é ainda melhor

Exemplo: {{t:spr}} {{n:spr.commit}}, no {{t:pot|pote}} estão {{n:ex.pot}}, stacks de {{n:commit.stack}} cada. Se o adversário for all-in de imediato, precisa de {{n:eq.jam.spr2}} de equity. Se apostar primeiro, precisa de menos:

| A sua {{t:bet|aposta}} antes do all-in do adversário | Valor a pagar | Equity necessária |
|---|---|---|
| Nenhuma (o adversário vai all-in de imediato) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| Metade do {{t:pot|pote}} ({{n:ex.bet.half}}) | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| O {{t:pot|pote}} inteiro ({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## Não planeie {{t:bet|apostar}} e {{t:fold|desistir}}

Se depois da sua {{t:bet|aposta}} ficasse com menos no stack do que o {{t:pot|pote}} depois de essa aposta ser {{t:call|paga}}, {{t:bet|apostar}} e {{t:fold|desistir}} perante um all-in normalmente não faz sentido: para {{t:call|pagar}} o all-in precisa então de menos equity do que para {{t:call|pagar}} uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}} ({{n:eq.bet-pot}}). Tem dois caminhos sensatos: joga pelo stack inteiro (aposta ou vai all-in) ou {{t:check|passa}}.

## {{t:spr}} baixo: o {{t:top-pair|top pair}} joga pelo stack

Regra: **com um {{t:spr}} no flop inferior a cerca de {{n:spr.zone.low}}, o {{t:top-pair|top pair}} e mãos melhores normalmente jogam pelo stack inteiro** (as zonas de {{t:spr}} da lição anterior). O exemplo de {{t:spr}} {{n:spr.commit}} está nesta zona, e as contas nesse caso apoiam a regra:

- para o all-in precisa, no máximo, de cerca de {{n:eq.jam.spr2}} de equity, e depois da sua própria {{t:bet|aposta}} ainda menos,
- duas {{t:bet|apostas}} de cerca de {{n:geo.spr2.2}} do {{t:pot|pote}} colocam o stack inteiro: com um {{t:pot|pote}} de {{n:ex.pot}}, são {{n:geo.spr2.flop}} no flop e {{n:geo.spr2.turn}} no turn, no total {{n:geo.spr2.total}},
- o {{t:top-pair|top pair}} normalmente aguenta duas {{t:value|rondas de valor}} (a lição sobre o plano para três {{t:street|rondas}}).

No entanto, as contas não definem um limiar exato. Se o {{t:top-pair|top pair}} tem equity suficiente depende das mãos com que o adversário joga. Por isso, é uma heurística e não uma lei rígida. A regra aplica-se ao {{t:top-pair|top pair}} e a mãos melhores: um {{t:pair|par}} mais baixo do que as cartas altas da {{t:board|mesa}} não a cumpre.

## {{t:spr}} alto: um só {{t:pair|par}} com mais cautela

Num {{t:pot|pote}} com uma só subida, o {{t:spr}} é de cerca de {{n:spr.srp}}. Para colocar o stack inteiro até ao river, seria preciso apostar mais do que o {{t:pot|pote}} em cada {{t:street|ronda}} (a lição sobre o tamanho geométrico). Um adversário que coloca tanto dinheiro raramente tem uma mão pior do que um {{t:pair|par}}. Por isso, com um só {{t:pair|par}} num {{t:pot|pote}} assim, joga por valor, mas normalmente não planeia jogar pelo stack inteiro.

:::note De onde vêm estas regras
O limite de cerca de {{n:spr.zone.low}} provém de materiais de formação e de uma análise de solver publicada (com {{t:spr}} de cerca de {{n:spr.commit}}, qualquer {{t:top-pair|top pair}} ou mão melhor joga pelo stack). A cautela com um só {{t:pair|par}} com {{t:spr}} alto é confirmada por materiais de formação e por análises de solvers. Os números de preço e de tamanhos nesta lição são matemática pura.
:::
