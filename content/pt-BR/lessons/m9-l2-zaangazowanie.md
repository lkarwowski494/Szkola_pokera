---
id: m9.l2
module: m9
order: 2
title: "Comprometimento"
sub: "Quando você joga pelo stack inteiro"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: o {{t:pot|pote}} tem {{n:ex.pot}}, e os stacks são de {{n:commit.stack}} cada. Você aposta o {{t:pot|pote}} inteiro ({{n:ex.bet.pot}}), e o adversário vai all-in. Você precisa completar {{n:commit.after-pot.call}}. De quanta equity você precisa para {{t:call|pagar}}? Digite o número em porcentagem."
    answer: eq.commit.after-pot
    explanation: "Antes do valor extra do adversário, o {{t:pot|pote}} tem {{n:ex.pot.after-pot-call}} (o {{t:pot|pote}}, a sua {{t:bet|aposta}} e o valor com que ele a igualou). Você completa {{n:commit.after-pot.call}}, então a equity necessária = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}. Depois de uma {{t:bet|aposta}} assim, você está comprometido: {{t:fold|desistir}} normalmente não compensa."
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: o {{t:pot|pote}} tem {{n:ex.pot}}, e os stacks são de {{n:commit.stack}} cada. Você aposta meio {{t:pot|pote}} ({{n:ex.bet.half}}), e o adversário vai all-in. Você precisa completar {{n:commit.after-half.call}}. De quanta equity você precisa para {{t:call|pagar}}? Digite o número em porcentagem."
    answer: eq.commit.after-half
    explanation: "Antes do valor extra do adversário, o {{t:pot|pote}} tem {{n:ex.half.total}} (o {{t:pot|pote}}, a sua {{t:bet|aposta}} e o valor com que ele a igualou). Você completa {{n:commit.after-half.call}}: {{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}. É menos do que contra um all-in imediato ({{n:eq.jam.spr2}}), porque você já colocou parte do dinheiro."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}. Você tem o {{t:top-pair|top pair}}, aposta o {{t:pot|pote}} inteiro, e o adversário vai all-in. Para {{t:call|pagar}}, você precisa de {{n:eq.commit.after-pot}} de equity. O que você faz?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "{{t:call|Pago}}", correct: true, why: "Sim: o preço é muito bom. Com {{t:spr}} baixo, o adversário vai all-in também com {{t:draw|projetos}} e damas mais fracas, então o {{t:top-pair|top pair}} com ás normalmente tem muito mais do que {{n:eq.commit.after-pot}} de equity. Ele perde claramente só para {{t:two-pair|dois pares}} e sets." }
      - { text: "{{t:fold|Desisto}}, porque o all-in mostra uma mão forte", why: "{{t:fold|Desistir}} entrega um {{t:pot|pote}} em que você já colocou bastante. Você só precisa ganhar uma vez em cinco, ou seja, em {{n:eq.commit.after-pot}} dos casos. Se você pretendia {{t:fold|desistir}} aqui, era melhor não apostar o {{t:pot|pote}} inteiro." }
      - { text: "{{t:fold|Desisto}}, porque o {{t:spr}} é baixo", why: "Um {{t:spr}} baixo funciona ao contrário: com ele fica mais fácil jogar pelo stack inteiro, porque o preço do all-in é melhor." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "Depois da sua {{t:bet|aposta}}, sobraria no seu stack menos do que o {{t:pot|pote}} terá depois que ela for {{t:call|paga}}. Qual plano não faz sentido?"
    options:
      - { text: "{{t:bet|Apostar}} e {{t:fold|desistir}} se o adversário for all-in", correct: true, why: "Sim, esse plano é um erro: depois de uma {{t:bet|aposta}} assim, você precisa de muito pouca equity para {{t:call|pagar}} o all-in (com {{t:spr}} {{n:spr.commit}} e uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}}, só {{n:eq.commit.after-pot}}). Se você vai {{t:fold|desistir}} de qualquer jeito, a {{t:bet|aposta}} só entrega {{t:chips|fichas}}." }
      - { text: "All-in de uma vez", why: "É um plano sensato com uma mão forte: você vai jogar pelo stack inteiro de qualquer forma, então coloca tudo de uma vez." }
      - { text: "{{t:check|Passar}}", why: "Também é sensato quando você não quer jogar pelo stack inteiro: você não coloca dinheiro que depois tornaria difícil {{t:fold|desistir}}." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pote}} após 4-bet, {{t:spr}} de cerca de {{n:spr.4bet}}. Você acertou o {{t:top-pair|top pair}} com o melhor kicker. Qual é o plano?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "Jogo pelo stack inteiro", correct: true, why: "Sim: com {{t:spr}} de cerca de {{n:spr.4bet}}, para o all-in você precisa de só cerca de {{n:eq.jam.4bet}} de equity, e o {{t:top-pair|top pair}} com ás é muito forte aqui. Você aposta ou {{t:call|paga}} com o plano de colocar tudo." }
      - { text: "Jogo com cautela e {{t:fold|desisto}} diante de uma {{t:bet|aposta}} grande", why: "Com um {{t:spr}} tão baixo, {{t:fold|desistir}} do {{t:top-pair|top pair}} entrega demais. Depois de um 4-bet, o adversário também tem AQ, QQ, JJ e outras mãos que perdem para a sua." }
      - { text: "Aposto pouco e {{t:fold|desisto}} diante do all-in", why: "É um plano de {{t:bet|apostar}} e {{t:fold|desistir}} com {{t:spr}} baixo: depois da {{t:bet|aposta}}, o preço do all-in fica ainda melhor, e {{t:fold|desistir}} entrega um {{t:pot|pote}} em que você já colocou dinheiro." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Por que, com {{t:spr}} de cerca de {{n:spr.commit}}, o {{t:top-pair|top pair}} normalmente joga pelo stack inteiro?"
    options:
      - { text: "Porque para o all-in você precisa de cerca de {{n:eq.jam.spr2}} de equity, e duas {{t:bet|apostas}} de cerca de {{n:geo.spr2.2}} do {{t:pot|pote}} colocam o stack inteiro", correct: true, why: "Sim: o preço é bom, e duas {{t:value|rodadas de valor}} bastam para colocar o stack. É o que o {{t:top-pair|top pair}} normalmente aguenta. O limite em si é uma heurística: também importa com o que o adversário joga." }
      - { text: "Porque o {{t:top-pair|top pair}} sempre ganha", why: "Nem sempre: às vezes o adversário tem {{t:two-pair|dois pares}} ou um set. Com {{t:spr}} baixo, porém, mãos piores e {{t:draw|projetos}} colocam dinheiro suficiente, e o preço é bom." }
      - { text: "Porque com {{t:spr}} {{n:spr.commit}} as regras não permitem {{t:fold|desistir}}", why: "Você sempre pode {{t:fold|desistir}}. A questão é que {{t:fold|desistir}} normalmente custa mais do que rende: para o all-in você precisa de só cerca de {{n:eq.jam.spr2}} de equity." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "{{t:pot|Pote}} com um único aumento, stacks de {{n:format.stack}}, {{t:spr}} de cerca de {{n:spr.srp}}. Você acertou o {{t:top-pair|top pair}} com um bom kicker. Como você trata essa mão?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "Como uma mão de valor, mas normalmente não para o stack inteiro", correct: true, why: "Sim: com {{t:spr}} de cerca de {{n:spr.srp}}, o stack inteiro só entra depois de várias {{t:bet|apostas}} maiores que o {{t:pot|pote}}. Um adversário que coloca tanto raramente tem uma mão pior que um {{t:pair|par}}." }
      - { text: "Jogo pelo stack inteiro, porque o {{t:top-pair|top pair}} é forte", why: "Com {{t:spr}} {{n:spr.commit}}, sim, mas aqui o {{t:spr}} é de cerca de {{n:spr.srp}}. Quando o stack inteiro está no {{t:pot|pote}}, o adversário normalmente tem {{t:two-pair|dois pares}}, um set ou um {{t:pair|par}} melhor." }
      - { text: "{{t:fold|Desisto}} diante da primeira {{t:bet|aposta}} do adversário", why: "Cauteloso demais: o {{t:top-pair|top pair}} com bom kicker é uma mão forte neste flop. A ideia é não montar com ela um {{t:pot|pote}} do tamanho do stack inteiro, e não {{t:fold|desistir}}." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pote}} após 4-bet, {{t:spr}} de cerca de {{n:spr.4bet}}. Você tem um {{t:pair|par}} de valetes, e no flop há um ás e um rei. O adversário vai all-in. E a regra “com {{t:spr}} baixo, jogo pelo stack”?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "Ela não cobre esta mão: é um {{t:pair|par}} menor que as duas cartas altas da {{t:board|mesa}}", correct: true, why: "Sim: a regra fala do {{t:top-pair|top pair}} e de mãos melhores. Depois de um 4-bet, o adversário muitas vezes tem um ás ou um rei, e seus valetes perdem para qualquer {{t:pair|par}} com carta alta. Aqui você {{t:fold|desiste}} com mais frequência, apesar do bom preço ({{n:eq.jam.4bet}})." }
      - { text: "Cobre: com {{t:spr}} baixo, eu {{t:call|pago}} com tudo", why: "Um {{t:spr}} baixo dá um bom preço, mas não transforma uma mão fraca em forte. Quando o adversário muitas vezes tem um {{t:pair|par}} melhor, até {{n:eq.jam.4bet}} de equity pode ser demais." }
      - { text: "Cobre, mas só quando tenho {{t:position|posição}}", why: "A {{t:position|posição}} não muda aquilo com que você joga. A regra vale para o {{t:top-pair|top pair}} e mãos melhores." }
---
Comprometimento (em inglês, commitment) é uma situação em que já há tanto dinheiro no {{t:pot|pote}} em relação ao seu stack que {{t:fold|desistir}} diante de um all-in quase nunca compensa. O {{t:spr}} da lição anterior mostra o quão perto disso você já está no início do flop.

## Depois de uma {{t:bet|aposta}}, o preço fica ainda melhor

Exemplo: {{t:spr}} {{n:spr.commit}}, o {{t:pot|pote}} tem {{n:ex.pot}}, e os stacks são de {{n:commit.stack}} cada. Se o adversário for all-in de uma vez, você precisa de {{n:eq.jam.spr2}} de equity. Se você apostar primeiro, precisa de menos:

| Sua {{t:bet|aposta}} antes do all-in do adversário | Valor a completar | Equity necessária |
|---|---|---|
| Nenhuma (adversário vai all-in de uma vez) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| Meio {{t:pot|pote}} ({{n:ex.bet.half}}) | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| {{t:pot|Pote}} inteiro ({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## Não planeje {{t:bet|apostar}} e {{t:fold|desistir}}

Se depois da sua {{t:bet|aposta}} sobrar no seu stack menos do que o {{t:pot|pote}} terá depois que ela for {{t:call|paga}}, {{t:bet|apostar}} e {{t:fold|desistir}} diante do all-in normalmente não faz sentido: para {{t:call|pagar}} o all-in, você precisa então de menos equity do que para {{t:call|pagar}} uma {{t:bet|aposta}} do tamanho do {{t:pot|pote}} ({{n:eq.bet-pot}}). Você tem dois caminhos sensatos: jogar pelo stack inteiro (apostar ou ir all-in) ou {{t:check|passar}}.

## {{t:spr}} baixo: o {{t:top-pair|top pair}} joga pelo stack

Regra: **com {{t:spr}} no flop menor que cerca de {{n:spr.zone.low}}, o {{t:top-pair|top pair}} e mãos melhores normalmente jogam pelo stack inteiro** (as zonas de {{t:spr}} da lição anterior). O exemplo de {{t:spr}} {{n:spr.commit}} está nessa zona, e a conta nele apoia a regra:

- para o all-in você precisa de no máximo cerca de {{n:eq.jam.spr2}} de equity e, depois da sua própria {{t:bet|aposta}}, de ainda menos,
- duas {{t:bet|apostas}} de cerca de {{n:geo.spr2.2}} do {{t:pot|pote}} colocam o stack inteiro: com um {{t:pot|pote}} de {{n:ex.pot}}, são {{n:geo.spr2.flop}} no flop e {{n:geo.spr2.turn}} no turn, {{n:geo.spr2.total}} no total,
- o {{t:top-pair|top pair}} normalmente aguenta duas {{t:value|rodadas de valor}} (a lição sobre o plano para três {{t:street|rodadas}}).

A conta, porém, não define um limite exato. Se o {{t:top-pair|top pair}} tem equity suficiente depende de com o que o adversário joga. Por isso, é uma heurística, e não uma lei rígida. A regra vale para o {{t:top-pair|top pair}} e mãos melhores: um {{t:pair|par}} menor que as cartas altas da {{t:board|mesa}} não se enquadra.

## {{t:spr}} alto: um {{t:pair|par}} com mais cautela

Num {{t:pot|pote}} com um único aumento, o {{t:spr}} é de cerca de {{n:spr.srp}}. Para colocar o stack inteiro até o river, seria preciso apostar mais que o {{t:pot|pote}} em cada {{t:street|rodada}} (a lição sobre tamanho geométrico). Um adversário que coloca tanto dinheiro raramente tem uma mão pior que um {{t:pair|par}}. Por isso, com um {{t:pair|par}} num {{t:pot|pote}} assim, você joga por valor, mas normalmente não planeja jogar pelo stack inteiro.

:::note De onde vêm essas regras
O limite de cerca de {{n:spr.zone.low}} vem de materiais de treinamento e de uma análise de solver publicada (com {{t:spr}} de cerca de {{n:spr.commit}}, todo {{t:top-pair|top pair}} e toda mão melhor jogam pelo stack). A cautela com um {{t:pair|par}} com {{t:spr}} alto é confirmada por materiais de treinamento e análises de solvers. Os números de preço e de tamanhos desta lição são matemática pura.
:::
