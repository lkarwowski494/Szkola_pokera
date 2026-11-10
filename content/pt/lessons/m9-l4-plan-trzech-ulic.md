---
id: m9.l4
module: m9
order: 4
title: "Plano para três rondas"
sub: "Quantas rondas de valor uma mão aguenta"
rules: [R-M9-008, R-M9-009, R-M9-005]
drills:
  - kind: choice
    id: m9.l4.q-set
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "{{t:open|Abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}. Fez set num flop {{t:dry|seco}}. Quantas {{t:value|rondas de valor}} aguenta esta mão?"
    table: { hand: "7c 7d", board: "Ks 7h 2c", position: BTN }
    options:
      - { text: "Três", correct: true, why: "Um set num flop {{t:dry|seco}} é quase sempre a melhor mão. Em cada {{t:street|ronda}}, as mãos piores do adversário (p. ex. um rei, um sete, um {{t:pair|par}}) ainda podem pagar, por isso planeia {{t:bet|apostar}} no flop, no turn e no river." }
      - { text: "Uma", why: "Demasiado pouco: com uma mão tão forte, uma só {{t:bet|aposta}} deixa na {{t:board|mesa}} a maior parte do valor. Um adversário com um rei pagará mais do que uma vez." }
      - { text: "Nenhuma: {{t:check|passo}} para não assustar o adversário", why: "{{t:check|Passar}} em todas as {{t:street|rondas}} não faz crescer o {{t:pot|pote}}. Um set quer que o {{t:pot|pote}} cresça, porque normalmente ganha no showdown." }
  - kind: choice
    id: m9.l4.q-tptk-srp
    family: m9.plan-streets
    rules: [R-M9-008, R-M9-005]
    prompt: "{{t:open|Abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}, {{t:spr}} de cerca de {{n:spr.srp}}. Tem {{t:top-pair|top pair}} com o melhor kicker. Qual é o plano?"
    table: { hand: "Ad Kc", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Normalmente duas {{t:value|rondas de valor}}, sem plano de jogar pelo stack inteiro", correct: true, why: "Sim: reis e oitos piores pagam normalmente uma ou duas {{t:bet|apostas}}. Quando há muito dinheiro no {{t:pot|pote}}, pagam sobretudo mãos melhores do que um {{t:pair|par}}. Com {{t:spr}} de cerca de {{n:spr.srp}}, o stack inteiro só entraria com {{t:bet|apostas}} maiores do que o {{t:pot|pote}}." }
      - { text: "Três {{t:street|rondas}} de {{t:bet|apostas}} grandes até ao all-in", why: "Com {{t:spr}} de cerca de {{n:spr.srp}}, isso são {{t:bet|apostas}} de cerca de {{n:geo.srp.3}} do {{t:pot|pote}} em cada {{t:street|ronda}}. Até ao river, ficarão no {{t:pot|pote}} sobretudo {{t:two-pair|dois pares}} e sets, que batem um {{t:pair|par}}." }
      - { text: "Uma {{t:street|ronda}} ou nenhuma", why: "Demasiado cauteloso: o {{t:top-pair|top pair}} com o melhor kicker num flop {{t:dry|seco}} bate muitas mãos do adversário. Normalmente aguenta duas {{t:value|rondas de valor}}." }
  - kind: choice
    id: m9.l4.q-middle-pair
    family: m9.plan-streets
    rules: [R-M9-008]
    prompt: "{{t:open|Abriu}} do Button e o {{t:big-blind}} {{t:call|pagou}}. Tem o {{t:pair|par}} do meio. Quantas {{t:value|rondas de valor}} aguenta esta mão?"
    table: { hand: "9c 8c", board: "Kh 8s 3d", position: BTN }
    options:
      - { text: "Uma ou nenhuma: muitas vezes basta chegar ao showdown", correct: true, why: "Sim: o {{t:pair|par}} do meio ganha a {{t:bluff|bluffs}} e a {{t:pair|pares}} mais fracos, mas há poucas mãos piores que paguem várias {{t:bet|apostas}}. Plano: no máximo uma {{t:bet|aposta}} pequena, ou {{t:check|passar}} e {{t:call|pagar}}." }
      - { text: "Duas, como o {{t:top-pair|top pair}}", why: "O {{t:pair|par}} do meio perde contra qualquer rei. Depois da segunda {{t:bet|aposta}}, pagam sobretudo mãos que o batem." }
      - { text: "Três, para que o adversário não melhore", why: "Três {{t:bet|apostas}} com o {{t:pair|par}} do meio são pagas sobretudo por mãos melhores: as mãos piores {{t:fold|desistem}} logo após a primeira ou a segunda {{t:bet|aposta}}." }
  - kind: choice
    id: m9.l4.q-tp-4bet
    family: m9.plan-line
    rules: [R-M9-008, R-M9-003]
    prompt: "{{t:pot|Pote}} após 4-bet, {{t:spr}} de cerca de {{n:spr.4bet}}. Tem {{t:top-pair|top pair}} com o melhor kicker. A mão aguenta duas {{t:value|rondas de valor}}. Qual é o plano?"
    table: { hand: "Ac Kh", board: "Ks 9d 4c", position: BTN }
    options:
      - { text: "Duas {{t:bet|apostas}} de cerca de {{n:geo.4bet.2}} do {{t:pot|pote}}: no turn entra o stack inteiro", correct: true, why: "Sim: com {{t:spr}} de cerca de {{n:spr.4bet}}, duas {{t:street|rondas}} bastam para colocar o stack inteiro. Aqui, duas {{t:value|rondas de valor}} com {{t:top-pair|top pair}} significam jogar pelo stack inteiro." }
      - { text: "{{t:bet|Aposta}} pequena e {{t:fold|desistência}} perante um all-in", why: "Com {{t:spr}} de cerca de {{n:spr.4bet}}, {{t:fold|desistir}} perante um all-in com {{t:top-pair|top pair}} e ás cede demasiado: basta-lhe cerca de {{n:eq.jam.4bet}} de equity, e ainda menos depois da sua própria {{t:bet|aposta}}." }
      - { text: "{{t:check|Passo}} em todas as {{t:street|rondas}} para controlar o {{t:pot|pote}}", why: "Controlar o {{t:pot|pote}} faz sentido com {{t:spr}} alto. Aqui o {{t:pot|pote}} já é grande em relação ao stack, e mãos piores (AQ, QQ, JJ) colocam de bom grado o resto." }
  - kind: choice
    id: m9.l4.q-line-3bet
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "{{t:pot|Pote}} com 3-bet, tem {{t:position|posição}}, {{t:spr}} de cerca de {{n:spr.3bet-ip}}. Tem um set e quer colocar o stack inteiro até ao river. Que linha?"
    table: { hand: "9c 9d", board: "9s 6h 2c", position: BTN }
    options:
      - { text: "{{t:bet|Aposta}} no flop, no turn e no river, de cada vez cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}", correct: true, why: "Sim: {{n:geo.3bet-ip.flop}}, {{n:geo.3bet-ip.turn}} e {{n:geo.3bet-ip.river}} somam {{n:geo.3bet-ip.total}}, ou seja, o stack inteiro. Em cada {{t:street|ronda}}, o adversário paga uma parte razoável do {{t:pot|pote}}." }
      - { text: "{{t:bet|Aposta}} de 1/3 do {{t:pot|pote}} em cada {{t:street|ronda}}", sizeError: true, why: "Boa linha, tamanho errado: três {{t:bet|apostas}} de 1/3 do {{t:pot|pote}} colocam apenas cerca de {{n:g3b.third.total}} de {{n:spr.3bet-ip.stack}}. Um plano para o stack inteiro exige cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}." }
      - { text: "{{t:check|Passo}} no flop e no turn, no river all-in", why: "No river, um all-in com o stack inteiro seria uma {{t:bet|aposta}} várias vezes maior do que o {{t:pot|pote}}. O adversário só a pagará com uma mão muito forte, e as mãos piores que teriam pago três {{t:bet|apostas}} mais pequenas vão {{t:fold|desistir}}." }
  - kind: choice
    id: m9.l4.q-plan-first
    family: m9.plan-line
    rules: [R-M9-009]
    prompt: "Porque vale a pena definir o plano para três {{t:street|rondas}} logo no flop?"
    options:
      - { text: "Porque o tamanho no flop decide quanto se consegue colocar depois", correct: true, why: "Sim: o {{t:pot|pote}} cresce por multiplicação. Uma {{t:bet|aposta}} pequena no flop deixa um {{t:pot|pote}} pequeno no turn e no river, por isso mais tarde é difícil colocar o stack inteiro sem {{t:bet|apostas}} muito grandes." }
      - { text: "Porque depois não se pode mudar o plano", why: "Muda o plano quando a situação muda (p. ex. uma carta perigosa no turn). O objetivo é que a primeira {{t:bet|aposta}} se ajuste à meta: quantas {{t:value|rondas de valor}} e se joga pelo stack inteiro." }
      - { text: "Porque o adversário vê o seu plano", why: "O adversário não conhece o seu plano. O plano ajuda-o a escolher o tamanho, para que no fim o {{t:pot|pote}} tenha tanto quanto a mão aguenta." }
  - kind: choice
    id: m9.l4.q-geo-tp
    family: m9.plan-line
    rules: [R-M9-005, R-M9-008]
    prompt: "{{t:pot|Pote}} com uma só subida, {{t:spr}} de cerca de {{n:spr.srp}}. Tem {{t:top-pair|top pair}} com um bom kicker. Aposta com o tamanho geométrico de cerca de {{n:geo.srp.3}} do {{t:pot|pote}}?"
    table: { hand: "Kd Qs", board: "Kc 7d 2h", position: BTN }
    options:
      - { text: "Não: é um tamanho para o stack inteiro, e esta mão normalmente aguenta duas {{t:street|rondas}}", correct: true, why: "Sim: o tamanho geométrico serve para colocar o stack inteiro. Com {{t:bet|apostas}} maiores do que o {{t:pot|pote}}, as mãos piores deixam de pagar e ficam as mãos melhores do que um {{t:pair|par}}." }
      - { text: "Sim: aposto sempre de forma geométrica", why: "O tamanho geométrico adequa-se a um plano para o stack inteiro. O {{t:top-pair|top pair}} com {{t:spr}} de cerca de {{n:spr.srp}} normalmente não tem esse plano." }
      - { text: "Não: com {{t:top-pair|top pair}} {{t:check|passo}} sempre", why: "O {{t:top-pair|top pair}} quer {{t:bet|apostas}} por valor, só que mais pequenas e normalmente em duas {{t:street|rondas}}, e não para o stack inteiro." }
  - kind: choice
    id: m9.l4.q-spr2-two
    family: m9.plan-streets
    rules: [R-M9-003, R-M9-008]
    prompt: "{{t:spr}} {{n:spr.commit}}: no {{t:pot|pote}} estão {{n:ex.pot}}, stacks de {{n:commit.stack}} cada. Aposta cerca de {{n:geo.spr2.2}} do {{t:pot|pote}} no flop e no turn, e o adversário {{t:call|paga}}. E o resto do stack?"
    options:
      - { text: "Depois do turn, o stack inteiro está no {{t:pot|pote}}", correct: true, why: "Sim: {{n:geo.spr2.flop}} no flop e {{n:geo.spr2.turn}} no turn somam {{n:geo.spr2.total}}. Por isso, com {{t:spr}} {{n:spr.commit}}, duas {{t:value|rondas de valor}} com {{t:top-pair|top pair}} bastam para jogar pelo stack inteiro." }
      - { text: "Fica mais ou menos metade para o river", why: "O {{t:pot|pote}} cresce por multiplicação: após o flop tem cerca de {{n:geo.spr2.flop-after}}, e uma {{t:bet|aposta}} de cerca de {{n:geo.spr2.2}} no turn são cerca de {{n:geo.spr2.turn}}, ou seja, o resto do stack." }
      - { text: "Fica quase o stack inteiro", why: "Com {{t:spr}} {{n:spr.commit}}, o stack é só {{n:spr.commit}} {{t:pot|potes}}. Duas {{t:bet|apostas}} de cerca de {{n:geo.spr2.2}} do {{t:pot|pote}} colocam os {{n:geo.spr2.total}} completos." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar strategy
  - kind: generated
    id: m9.l4.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Um bom plano começa no flop, antes de fazer a primeira {{t:bet|aposta}}. Pergunta-se: quantas {{t:value|rondas de valor}} aguenta a minha mão e quero jogar pelo stack inteiro? A resposta combina a força da mão com o {{t:spr}}.

## Quantas {{t:value|rondas de valor}}

A cada {{t:street|ronda}}, as mãos piores do adversário {{t:fold|desistem}}, e no {{t:pot|pote}} ficam sobretudo mãos melhores do que a sua. Por isso, uma mão mais forte aguenta mais {{t:bet|apostas}}:

| Mão | {{t:value|Rondas de valor}} (normalmente) |
|---|---|
| Muito forte: set, {{t:straight|sequência}}, {{t:two-pair|dois pares}} altos | Três |
| {{t:top-pair|Top pair}} com bom kicker, {{t:overpair}} | Duas; uma terceira, quando o adversário paga com mãos mais fracas |
| {{t:pair|Par}} mais fraco (do meio, baixo) | Uma ou nenhuma |

Os números de {{t:street|rondas}} na tabela são uma simplificação: muito depende da {{t:texture|textura}} da {{t:board|mesa}}, das cartas do turn e do river e do adversário.

## Combine a mão com o {{t:spr}}

- **Mão para três {{t:street|rondas}}, a zona de {{t:spr}} permite jogar pelo stack e quer o stack inteiro:** aposta com o tamanho geométrico desde o flop (num {{t:pot|pote}} com 3-bet {{t:in-position|em posição}}, cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}}).
- **Mão para duas {{t:street|rondas}} com {{t:spr}} baixo:** com {{t:spr}} de cerca de {{n:spr.commit}}, duas {{t:bet|apostas}} de cerca de {{n:geo.spr2.2}} do {{t:pot|pote}} já são o stack inteiro, por isso joga pelo stack.
- **Mão para duas {{t:street|rondas}} com {{t:spr}} alto:** num {{t:pot|pote}} com uma só subida ({{t:spr}} de cerca de {{n:spr.srp}}), aposta por valor, mas não planeia o stack inteiro.

Três {{t:value|rondas de valor}} não é o mesmo que jogar pelo stack inteiro. {{t:two-pair|Dois pares}} altos aguentam três {{t:street|rondas}}, mas num {{t:pot|pote}} com uma só subida ({{t:spr}} de cerca de {{n:spr.srp}}, acima de {{n:spr.zone.deep}}) normalmente não jogam pelo stack inteiro: nesta zona jogam pelo stack o set, a {{t:straight|sequência}} e mãos melhores (zonas de {{t:spr}} da primeira lição).

## Linhas

Uma linha é um plano de ações nas {{t:street|rondas}} seguintes. Algumas básicas:

- **{{t:bet|aposta}}, {{t:bet|aposta}}, {{t:bet|aposta}}:** mão para três {{t:value|rondas de valor}},
- **{{t:bet|aposta}}, {{t:bet|aposta}}, {{t:check|passar}}:** mão para duas {{t:street|rondas}}; no river chega ao showdown,
- **{{t:bet|aposta}} ou {{t:check|passar}}, depois {{t:check|passar}} e {{t:call|pagar}}:** {{t:pair|par}} mais fraco que quer chegar ao showdown de forma barata.

## O tamanho no flop define o resto

O {{t:pot|pote}} cresce por multiplicação, por isso uma {{t:bet|aposta}} pequena no flop deixa um {{t:pot|pote}} pequeno para as {{t:street|rondas}} seguintes. Num {{t:pot|pote}} com 3-bet, três {{t:bet|apostas}} de 1/3 do {{t:pot|pote}} colocam apenas cerca de {{n:g3b.third.total}} de um stack de {{n:spr.3bet-ip.stack}}, enquanto três {{t:bet|apostas}} de cerca de {{n:geo.3bet-ip.3}} do {{t:pot|pote}} colocam o stack inteiro.

:::note Um plano não é uma sentença
No turn e no river, volta a avaliar o plano: uma carta perigosa pode reduzir o número de {{t:value|rondas de valor}}. Como jogar o turn e o river ensinam os módulos M7 e M8. O número de {{t:value|rondas de valor}} para as classes de mãos é uma heurística, uma síntese de vários materiais de formação: num {{t:pot|pote}} com uma só subida, o {{t:spr}} é demasiado alto para que muitos {{t:top-pair|top pairs}} recolham confortavelmente três {{t:value|rondas de valor}}.
:::
