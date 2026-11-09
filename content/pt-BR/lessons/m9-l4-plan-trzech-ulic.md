---
id: m9.l4
module: m9
order: 4
title: "Plano para três streets"
sub: "Quantas streets de valor a mão aguenta"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "Você {{t:open|abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}. Você acertou um set em um flop {{t:dry|seco}}. Quantas {{t:value|streets de valor}} esta mão aguenta?"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "Três", correct: true, why: "Um set em flop {{t:dry|seco}} é quase sempre a melhor mão. Em cada {{t:street}}, as mãos piores do adversário (p. ex. um rei, um sete, um {{t:pair}}) ainda podem pagar, então você planeja {{t:bet|apostar}} no flop, no turn e no river." }
      - { text: "Uma", why: "Pouco: com uma mão tão forte, uma única {{t:bet}} deixa na {{t:board|mesa}} a maior parte do valor. Um adversário com rei vai pagar mais de uma vez." }
      - { text: "Nenhuma: dou {{t:check}} para não assustar o adversário", why: "{{t:check|Dar check}} em todas as {{t:street|streets}} não constrói o {{t:pot}}. O set quer que o {{t:pot}} cresça, porque costuma ganhar no showdown." }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "Você {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}}, {{t:spr}} de cerca de {{n:spr.srp}}. Você tem {{t:top-pair}} com o melhor kicker. Qual é o plano?"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Geralmente duas {{t:value|streets de valor}}, sem plano de jogar pelo stack inteiro", correct: true, why: "Sim: reis e oitos piores costumam pagar uma ou duas {{t:bet|apostas}}. Quando o {{t:pot}} fica com muito dinheiro, pagam principalmente mãos melhores que um {{t:pair}}. Com {{t:spr}} de cerca de {{n:spr.srp}}, o stack inteiro só entraria com {{t:bet|apostas}} maiores que o {{t:pot}}." }
      - { text: "Três {{t:street|streets}} de {{t:bet|apostas}} grandes até o all-in", why: "Com {{t:spr}} de cerca de {{n:spr.srp}}, isso significa {{t:bet|apostas}} de cerca de {{n:geo.srp.3}} do {{t:pot}} em cada {{t:street}}. Até o river, ficarão no {{t:pot}} principalmente {{t:two-pair}} e sets, que batem um {{t:pair}}." }
      - { text: "Uma {{t:street}} ou nenhuma", why: "Cauteloso demais: {{t:top-pair}} com o melhor kicker em flop {{t:dry|seco}} bate muitas mãos do adversário. Costuma aguentar duas {{t:value|streets de valor}}." }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "Você {{t:open|abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}. Você tem o {{t:pair|par}} do meio. Quantas {{t:value|streets de valor}} esta mão aguenta?"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Uma ou nenhuma: muitas vezes basta chegar ao showdown", correct: true, why: "Sim: o {{t:pair|par}} do meio ganha de {{t:bluff|blefes}} e de {{t:pair|pares}} mais fracos, mas há poucas mãos piores que paguem várias {{t:bet|apostas}}. Plano: no máximo uma {{t:bet}} pequena, ou {{t:check}} e {{t:call|pagar}}." }
      - { text: "Duas, como {{t:top-pair}}", why: "O {{t:pair|par}} do meio perde para qualquer rei. Depois da segunda {{t:bet}}, pagam principalmente mãos que o batem." }
      - { text: "Três, para o adversário não melhorar", why: "Três {{t:bet|apostas}} com o {{t:pair|par}} do meio são pagas principalmente por mãos melhores: as mãos piores {{t:fold|desistem}} já depois da primeira ou da segunda {{t:bet}}." }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "{{t:pot|Pote}} de 4-bet, {{t:spr}} de cerca de {{n:spr.4bet}}. Você tem {{t:top-pair}} com o melhor kicker. A mão aguenta duas {{t:value|streets de valor}}. Qual é o plano?"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "Duas {{t:bet|apostas}} de cerca de {{n:geo.4bet.2}} do {{t:pot}}: o stack inteiro entra no turn", correct: true, why: "Sim: com {{t:spr}} de cerca de {{n:spr.4bet}}, duas {{t:street|streets}} bastam para colocar o stack inteiro. Aqui, duas {{t:value|streets de valor}} com {{t:top-pair}} significam jogar pelo stack inteiro." }
      - { text: "{{t:bet|Apostar}} pouco e {{t:fold|desistir}} contra o all-in", why: "Com {{t:spr}} de cerca de {{n:spr.4bet}}, {{t:fold|desistir}} com {{t:top-pair}} de ás contra o all-in entrega demais: você precisa de apenas cerca de {{n:eq.jam.4bet}} de equity, e de ainda menos depois da sua própria {{t:bet}}." }
      - { text: "Dou {{t:check}} em toda {{t:street}} para controlar o {{t:pot}}", why: "O controle do {{t:pot}} faz sentido com {{t:spr}} alto. Aqui o {{t:pot}} já é grande em relação ao stack, e mãos piores (AQ, QQ, JJ) colocam o resto de bom grado." }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "{{t:pot|Pote}} com 3-bet, você tem {{t:position|posição}}, {{t:spr}} de cerca de {{n:spr.3bet-ip}}. Você tem um set e quer colocar o stack inteiro até o river. Qual linha?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "{{t:bet|Apostar}} no flop, no turn e no river, cada vez cerca de {{n:geo.3bet-ip.3}} do {{t:pot}}", correct: true, why: "Sim: {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}} somam {{n:geo.3bet-ip.total}}, ou seja, o stack inteiro. Em cada {{t:street}}, o adversário paga uma parte razoável do {{t:pot}}." }
      - { text: "{{t:bet|Apostar}} 1/3 do {{t:pot}} em cada {{t:street}}", sizeError: true, why: "Linha boa, tamanho errado: três {{t:bet|apostas}} de 1/3 do {{t:pot}} colocam só cerca de {{n:g3b.third.total}} de {{n:spr.3bet-ip.stack}}. Um plano de stack inteiro exige cerca de {{n:geo.3bet-ip.3}} do {{t:pot}}." }
      - { text: "Dou {{t:check}} no flop e no turn e vou all-in no river", why: "No river, um all-in pelo stack inteiro seria uma {{t:bet}} várias vezes maior que o {{t:pot}}. O adversário só vai pagá-la com uma mão muito forte, e as mãos piores, que pagariam três {{t:bet|apostas}} menores, vão {{t:fold|desistir}}." }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "Por que vale a pena definir o plano para três {{t:street|streets}} já no flop?"
    options:
      - { text: "Porque o tamanho no flop decide quanto dá para colocar depois", correct: true, why: "Sim: o {{t:pot}} cresce por multiplicação. Uma {{t:bet}} pequena no flop deixa um {{t:pot}} pequeno no turn e no river, então depois fica difícil colocar o stack inteiro sem {{t:bet|apostas}} muito grandes." }
      - { text: "Porque depois não se pode mudar o plano", why: "Você muda o plano quando a situação muda (p. ex. uma carta perigosa no turn). A ideia é que a primeira {{t:bet}} combine com o objetivo: quantas {{t:value|streets de valor}} e se é pelo stack inteiro." }
      - { text: "Porque o adversário vê o seu plano", why: "O adversário não conhece o seu plano. O plano ajuda você a escolher o tamanho para que, no fim, o {{t:pot}} tenha tanto quanto a mão aguenta." }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "{{t:pot|Pote}} com um aumento, {{t:spr}} de cerca de {{n:spr.srp}}. Você tem {{t:top-pair}} com um bom kicker. Você aposta o tamanho geométrico de cerca de {{n:geo.srp.3}} do {{t:pot}}?"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "Não: é um tamanho para o stack inteiro, e esta mão costuma aguentar duas {{t:street|streets}}", correct: true, why: "Isso mesmo: o tamanho geométrico serve para colocar o stack inteiro. Com {{t:bet|apostas}} maiores que o {{t:pot}}, as mãos piores param de pagar e ficam as mãos melhores que um {{t:pair}}." }
      - { text: "Sim: sempre aposto o tamanho geométrico", why: "O tamanho geométrico combina com um plano de stack inteiro. {{t:top-pair|Top pair}} com {{t:spr}} de cerca de {{n:spr.srp}} geralmente não tem esse plano." }
      - { text: "Não: com {{t:top-pair}} sempre dou {{t:check}}", why: "{{t:top-pair|Top pair}} quer {{t:bet|apostas}} por valor, só que menores e geralmente em duas {{t:street|streets}}, e não pelo stack inteiro." }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr}} {{n:spr.commit}}: no {{t:pot}} há {{n:ex.pot}}, stacks de {{n:commit.stack}} cada. Você aposta cerca de {{n:geo.spr2.2}} do {{t:pot}} no flop e no turn, e o adversário {{t:call|paga}}. E o resto do stack?"
    options:
      - { text: "Depois do turn, o stack inteiro está no {{t:pot}}", correct: true, why: "Sim: {{n:geo.spr2.flop}} no flop e {{n:geo.spr2.turn}} no turn somam {{n:geo.spr2.total}}. Por isso, com {{t:spr}} {{n:spr.commit}}, duas {{t:value|streets de valor}} com {{t:top-pair}} bastam para jogar pelo stack inteiro." }
      - { text: "Sobra mais ou menos metade para o river", why: "O {{t:pot}} cresce por multiplicação: depois do flop ele tem cerca de {{n:geo.spr2.flop-after}}, e uma {{t:bet}} de cerca de {{n:geo.spr2.2}} no turn equivale a cerca de {{n:geo.spr2.turn}}, ou seja, o resto do stack." }
      - { text: "Sobra quase o stack inteiro", why: "Com {{t:spr}} {{n:spr.commit}}, o stack é só {{n:spr.commit}} {{t:pot|potes}}. Duas {{t:bet|apostas}} de cerca de {{n:geo.spr2.2}} do {{t:pot}} colocam todos os {{n:geo.spr2.total}}." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Um bom plano começa no flop, antes de você {{t:bet|fazer}} a sua primeira {{t:bet}}. Pergunte-se: quantas {{t:value|streets de valor}} a minha mão aguenta e eu quero jogar pelo stack inteiro? A resposta combina a força da mão com o {{t:spr}}.

## Quantas {{t:value|streets de valor}}

A cada {{t:street}}, as mãos piores do adversário {{t:fold|desistem}}, e no {{t:pot}} ficam principalmente mãos melhores que a sua. Por isso, uma mão mais forte aguenta mais {{t:bet|apostas}}:

| Mão | {{t:value|Streets de valor}} (geralmente) |
|---|---|
| Muito forte: set, {{t:straight}}, {{t:two-pair}} altos | Três |
| {{t:top-pair|Top pair}} com bom kicker, {{t:overpair}} | Duas; a terceira, quando o adversário paga com mãos mais fracas |
| {{t:pair|Par}} mais fraco (do meio, baixo) | Uma ou nenhuma |

Os números de {{t:street|streets}} na tabela são uma simplificação: muito depende da {{t:texture|textura}} da {{t:board|mesa}}, das cartas do turn e do river e do adversário.

## Combine a mão com o {{t:spr}}

- **Mão para três {{t:street|streets}}, a zona de {{t:spr}} permite jogar pelo stack e você quer o stack inteiro:** você aposta o tamanho geométrico desde o flop (num {{t:pot}} com 3-bet {{t:in-position}}, cerca de {{n:geo.3bet-ip.3}} do {{t:pot}}).
- **Mão para duas {{t:street|streets}} com {{t:spr}} baixo:** com {{t:spr}} de cerca de {{n:spr.commit}}, duas {{t:bet|apostas}} de cerca de {{n:geo.spr2.2}} do {{t:pot}} já são o stack inteiro, então você joga pelo stack.
- **Mão para duas {{t:street|streets}} com {{t:spr}} alto:** num {{t:pot}} com um aumento ({{t:spr}} de cerca de {{n:spr.srp}}), você aposta por valor, mas não planeja o stack inteiro.

Três {{t:value|streets de valor}} não é o mesmo que jogar pelo stack inteiro. {{t:two-pair|Dois pares}} altos aguentam três {{t:street|streets}}, mas num {{t:pot}} com um aumento ({{t:spr}} de cerca de {{n:spr.srp}}, acima de {{n:spr.zone.deep}}) geralmente não jogam pelo stack inteiro: nessa zona, jogam pelo stack o set, a {{t:straight}} e mãos melhores (zonas de {{t:spr}} da primeira lição).

## Linhas

Uma linha é um plano de ações nas próximas {{t:street|streets}}. Algumas básicas:

- **{{t:bet}}, {{t:bet}}, {{t:bet}}:** mão para três {{t:value|streets de valor}},
- **{{t:bet}}, {{t:bet}}, {{t:check}}:** mão para duas {{t:street|streets}}, no river você chega ao showdown,
- **{{t:bet}} ou {{t:check}}, depois {{t:check}} e {{t:call|pagar}}:** {{t:pair|par}} mais fraco que quer chegar barato ao showdown.

## O tamanho no flop define o resto

O {{t:pot}} cresce por multiplicação, então uma {{t:bet}} pequena no flop deixa um {{t:pot}} pequeno para as próximas {{t:street|streets}}. Num {{t:pot}} com 3-bet, três {{t:bet|apostas}} de 1/3 do {{t:pot}} colocam só cerca de {{n:g3b.third.total}} de um stack de {{n:spr.3bet-ip.stack}}, e três {{t:bet|apostas}} de cerca de {{n:geo.3bet-ip.3}} do {{t:pot}} colocam o stack inteiro.

:::note O plano não é definitivo
No turn e no river, você reavalia o plano: uma carta perigosa pode reduzir o número de {{t:value|streets de valor}}. Como jogar o turn e o river é o que ensinam os módulos M7 e M8. O número de {{t:value|streets de valor}} por classe de mão é uma heurística, uma síntese de vários materiais de treino: num {{t:pot}} com um aumento, o {{t:spr}} é alto demais para que muitos {{t:top-pair|top pairs}} coletem com conforto três {{t:value|streets de valor}}.
:::
