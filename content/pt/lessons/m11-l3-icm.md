---
id: m11.l3
module: m11
order: 3
title: "ICM e bubble factor"
sub: "Fichas não são dinheiro"
rules: [R-M11-008, R-M11-009, R-M11-010]
drills:
  - kind: numeric
    id: m11.l3.n-first
    family: m11.icm.first
    rules: [R-M11-008]
    prompt: "Restam três jogadores e são pagos dois lugares. Stacks: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} e {{n:m11.icm.a.s3}} {{t:chips|fichas}}. Segundo o {{t:icm}}, qual é a probabilidade de o stack mais curto ficar em 1.º lugar? Introduza o número em percentagem."
    answer: m11.icm.a.chips3
    explanation: "Probabilidade de 1.º lugar = stack ÷ todas as {{t:chips}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}."
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "Os mesmos stacks ({{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}). O stack grande ficou em 1.º lugar. Qual é agora a probabilidade de o stack mais curto ficar em 2.º lugar?"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "Restam dois jogadores com {{n:m11.icm.a.rest1}} {{t:chips|fichas}}, das quais o curto tem {{n:m11.icm.a.s3}}: {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}." }
      - { text: "{{n:m11.icm.a.chips3}}", why: "Esta é a probabilidade de 1.º lugar, calculada a partir de todas as {{t:chips}}. Quando o vencedor sai da conta, divide apenas pelas {{t:chips}} dos restantes: {{n:m11.icm.a.rest1}}." }
      - { text: "{{n:m11.icm.a.second3}}", why: "Esta é a probabilidade total do {{t:short-stack}} de ficar em 2.º lugar, considerando ambos os vencedores possíveis. A pergunta refere-se ao caso em que ganhou o stack grande." }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|Prémios}}: {{n:m11.icm.a.p1}} da {{t:prize-pool|bolsa de prémios}} pelo 1.º lugar e {{n:m11.icm.a.p2}} pelo 2.º. Stacks {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}. Segundo o {{t:icm}}, quanto vale o stack mais curto (em percentagem da {{t:prize-pool|bolsa de prémios}})? Introduza o número."
    answer: m11.icm.a.eq3
    explanation: "Probabilidade de 1.º lugar {{n:m11.icm.a.chips3}}, de 2.º lugar {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ {{n:m11.icm.a.second3}}. Equity = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{n:m11.icm.a.eq3}}, mais do que os seus {{n:m11.icm.a.chips3}} das {{t:chips|fichas}}."
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "O stack grande tem {{n:m11.icm.a.chips1}} das {{t:chips|fichas}} em jogo. Segundo o {{t:icm}}, quanto vale em dinheiro?"
    options:
      - { text: "{{n:m11.icm.a.eq1}}, ou seja, menos do que a sua quota de {{t:chips|fichas}}", correct: true, why: "O stack grande pode ganhar no máximo {{n:m11.icm.a.p1}} da {{t:prize-pool|bolsa de prémios}}, embora tenha hipótese de ganhar todas as {{t:chips}}. Por isso, as {{t:chips}} do líder valem menos do que a sua quota, e as do {{t:short-stack}} valem mais ({{n:m11.icm.a.eq3}})." }
      - { text: "{{n:m11.icm.a.chips1}}, o mesmo que a sua quota de {{t:chips|fichas}}", why: "Seria assim se o vencedor levasse toda a {{t:prize-pool|bolsa de prémios}}. Com {{t:payout|prémios}} de {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}}, cada {{t:chips|ficha}} do stack grande vale menos: {{n:m11.icm.a.eq1}}." }
      - { text: "{{n:m11.icm.a.p1}}, porque quase de certeza vai ganhar", why: "Tem apenas {{n:m11.icm.a.chips1}} de probabilidade de ficar em 1.º lugar, e o resto da sua {{t:tournament-equity|equity de torneio}} vem do 2.º lugar. No total, {{n:m11.icm.a.eq1}}." }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|Bolha}}: quatro jogadores, três lugares pagos. Ao {{t:call|pagar}} um all-in, perde {{n:m11.bf.loss}} da {{t:prize-pool|bolsa de prémios}} se perder e ganha {{n:m11.bf.gain}} se ganhar. Qual é o bubble factor? Introduza um número com duas casas decimais."
    answer: m11.bf.value
    explanation: "Bubble factor = perda ÷ ganho = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}. Perder dói quase uma vez e meia mais do que ganhar ajuda."
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "O bubble factor é {{n:m11.bf.value}}. De quanta equity precisa para que {{t:call|pagar}} o all-in compense? Introduza o número em percentagem."
    answer: m11.bf.req
    explanation: "Equity necessária = BF ÷ (BF + 1), ou seja, perda ÷ (perda + ganho) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}. Num jogo por {{t:chips|fichas}}, bastaria {{n:m11.bf.req-chips}}."
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Num jogo por {{t:chips|fichas}}, para {{t:call|pagar}} este all-in basta {{n:m11.bf.req-chips}} de equity, mas segundo o {{t:icm}} precisa de {{n:m11.bf.req}}. Como se chama a diferença?"
    options:
      - { text: "{{t:risk-premium|Prémio de risco}} ({{n:m11.bf.premium}})", correct: true, why: "O {{t:risk-premium|prémio de risco}} é a equity adicional que o {{t:icm}} exige acima do preço em {{t:chips|fichas}}: {{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}." }
      - { text: "Bubble factor", why: "O bubble factor é a razão entre a perda e o ganho ({{n:m11.bf.value}}). A partir dele calcula a equity necessária, e a diferença em relação ao jogo por {{t:chips|fichas}} é o {{t:risk-premium|prémio de risco}}." }
      - { text: "Fold equity", why: "Fold equity é o lucro obtido com as {{t:fold|desistências}} do adversário. Ao {{t:call|pagar}} um all-in, não a tem." }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|Bolha}}, o exemplo da lição. A sua mão tem cerca de {{n:m11.bf.example-eq}} de equity contra o {{t:range}} de all-in do adversário. Num jogo por {{t:chips|fichas}}, {{t:call|pagar}} compensaria, porque basta {{n:m11.bf.req-chips}}. O que faz aqui?"
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Segundo o {{t:icm}}, aqui precisa de {{n:m11.bf.req}} de equity. Uma mão que ganha menos vezes perde dinheiro, embora em {{t:chips|fichas}} estivesse a ganhar." }
      - { text: "{{t:call|Pago}}, porque em {{t:chips|fichas}} é lucro", why: "Num {{t:tournament|torneio}} com {{t:payout|prémios}}, conta o dinheiro, não as {{t:chips}}. Perder custa-lhe {{n:m11.bf.loss}} da {{t:prize-pool|bolsa de prémios}}, e ganhar dá-lhe apenas {{n:m11.bf.gain}}." }
      - { text: "{{t:call|Pago}}, porque ganho mais de metade das vezes", why: "Uma mão com {{n:m11.bf.example-eq}} ganha mais de metade das vezes e, mesmo assim, aqui é demasiado fraca: o limiar é {{n:m11.bf.req}}." }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:bubble|Bolha}} de um {{t:tournament|torneio}}. Tem o maior stack da mesa e {{t:cover|cobre}} todos. O stack médio desiste contra si muito frequentemente. O que daí resulta?"
    options:
      - { text: "Pode {{t:shove|fazer shove}} de forma mais ampla, porque os adversários {{t:call|pagam}} de forma apertada", correct: true, why: "Ao {{t:call|pagar}}, o stack médio arrisca ser eliminado mesmo antes dos prémios, por isso precisa de muita equity. Quanto a si, se perder, perde apenas parte do stack. Os adversários {{t:call|pagam}} de forma apertada, por isso ganha o {{t:pot}} sem luta com mais frequência." }
      - { text: "Joga de forma mais apertada para não perder a liderança", why: "O líder tem o menor risco da mesa. Jogar de forma apertada abdica da sua principal vantagem: a pressão sobre os stacks médios." }
      - { text: "Nada, porque o {{t:icm}} só se aplica aos {{t:short-stack|short stacks}}", why: "O {{t:icm}} aplica-se a todos: altera a equity de que cada jogador precisa para {{t:call|pagar}}, e isso depende de toda a distribuição dos stacks." }
  - kind: generated
    id: m11.l3.g-icm-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    generator: icm
    params: { mode: equity }
    count: 2
  - kind: generated
    id: m11.l3.g-icm-call
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    generator: icm
    params: { mode: call }
    count: 3
  - kind: choice
    id: m11.l3.q-limits
    family: m11.icm.limits
    rules: [R-M11-008]
    prompt: "O que pressupõe o modelo {{t:icm}}?"
    options:
      - { text: "Que todos jogam igualmente bem e só os stacks decidem os lugares", correct: true, why: "O {{t:icm}} converte apenas os stacks em probabilidades de ocupar cada lugar. Ignora a {{t:position|posição}}, o aumento dos blinds e a vantagem de habilidade." }
      - { text: "Que o melhor jogador ganha mais vezes", why: "Pelo contrário: o {{t:icm}} pressupõe habilidade igual. Não tem de todo em conta a vantagem de um jogador." }
      - { text: "Que o jogador no {{t:big-blind}} tem menores probabilidades", why: "O {{t:icm}} ignora a {{t:position|posição}} e os blinds: olha apenas para os stacks. Esta é uma das suas limitações." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
No jogo a dinheiro (cash), uma {{t:chips|ficha}} é dinheiro: a ganha e a perdida valem o mesmo. Num {{t:tournament|torneio}}, não é assim. Os prémios vão para alguns dos primeiros lugares, e o vencedor não leva toda a {{t:prize-pool|bolsa de prémios}}, embora leve todas as {{t:chips}}. Por isso, as {{t:chips}} têm de ser convertidas em dinheiro.

## {{t:icm}}: o stack em dinheiro

O Modelo Independente de {{t:chips|Fichas}} ({{t:icm}}) converte os stacks em probabilidades de ocupar cada lugar. Pressupõe que todos jogam igualmente bem, pelo que só os stacks decidem a ordem.

```formula
probabilidade de 1.º lugar = o seu stack ÷ todas as fichas
```

A probabilidade de 2.º lugar calcula-se da mesma forma, mas separadamente para cada vencedor possível: subtraem-se as {{t:chips|fichas}} dele e divide-se pelo que resta. A {{t:tournament-equity|equity de torneio}} de um stack, ou seja, a sua quota esperada da {{t:prize-pool|bolsa de prémios}}, é a soma de: probabilidade de um lugar × {{t:payout|prémio}} por esse lugar.

## Exemplo: três jogadores na {{t:bubble|bolha}}

São pagos dois lugares: {{n:m11.icm.a.p1}} e {{n:m11.icm.a.p2}} da {{t:prize-pool|bolsa de prémios}}. Stacks: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} e {{n:m11.icm.a.s3}} {{t:chips|fichas}}.

- O {{t:short-stack}} ganha o {{t:tournament|torneio}} com uma probabilidade de {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**.
- Para o 2.º lugar: se ganhar o stack grande ({{n:m11.icm.a.chips1}}), o curto fica em segundo com uma probabilidade de {{n:m11.icm.a.second3.via1}}; se ganhar o médio ({{n:m11.icm.a.chips2}}), com uma probabilidade de {{n:m11.icm.a.second3.via2}}. No total, {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ **{{n:m11.icm.a.second3}}** (as parcelas estão arredondadas).
- Equity: {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ **{{n:m11.icm.a.eq3}}** da {{t:prize-pool|bolsa de prémios}}.

| Stack | Quota de {{t:chips|fichas}} | Equity segundo o {{t:icm}} |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

O {{t:short-stack}} vale mais do que as suas {{t:chips}}, e o grande vale menos: o líder não pode receber mais do que o prémio pelo 1.º lugar.

## Bubble factor: perder dói mais

Quatro jogadores, três lugares pagos: {{n:m11.bf.p1}}, {{n:m11.bf.p2}} e {{n:m11.bf.p3}}. Stacks {{n:m11.bf.s1}}, {{n:m11.bf.s2}} (o seu), {{n:m11.bf.s3}} e {{n:m11.bf.s4}}. O jogador com {{n:m11.bf.s3}} vai all-in e {{t:cover|cobre}} esse jogador, ou seja, tem mais {{t:chips|fichas}}. Por simplicidade, ignoramos os blinds no {{t:pot}}.

- Neste momento, o seu stack vale {{n:m11.bf.eq.now}} da {{t:prize-pool|bolsa de prémios}}.
- Se ganhar: fica com {{n:m11.bf.win}}, o adversário é eliminado e todos entram nos prémios. A sua equity sobe para {{n:m11.bf.eq.win}}, ou seja, aumenta **{{n:m11.bf.gain}}**.
- Se perder: fica com {{n:m11.bf.lose}}, e a equity desce para {{n:m11.bf.eq.lose}}, ou seja, diminui **{{n:m11.bf.loss}}**.

```formula
bubble factor = perda em caso de derrota ÷ ganho em caso de vitória
```

Aqui, {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**. A aplicação usa esta definição (perda ÷ ganho): num jogo por {{t:chips|fichas}}, em que a perda é igual ao ganho, o bubble factor é um. Algumas tabelas de push/fold calculam o bubble factor de outra forma, noutra escala, por isso não compare diretamente os números delas com estes. Dele resulta a equity necessária:

```formula
equity necessária = BF ÷ (BF + 1)
```

O resultado é **{{n:m11.bf.req}}**. Num jogo por {{t:chips|fichas}}, arrisca {{n:m11.bf.s3}} para ganhar {{n:m11.bf.s3}}, por isso bastaria {{n:m11.bf.req-chips}}. A diferença, {{n:m11.bf.premium}}, é o **{{t:risk-premium|prémio de risco}}**.

A mesma tendência observa-se num equilíbrio publicado para três jogadores com stacks iguais (artigo científico de 2008): quando o Button e o {{t:small-blind}} já estão all-in, o {{t:big-blind}} {{t:call|paga}} com {{n:m11.jamfold3.overcall.single}} das mãos numa mão jogada isoladamente, mas num {{t:tournament|torneio}} com {{t:payout|prémios}} apenas com {{n:m11.jamfold3.overcall.tourn}}, ou seja, só os {{t:pocket-pair|pares de mão}} mais altos e AKs.

:::note Quem {{t:call|paga}} de forma apertada
Um stack médio na {{t:bubble|bolha}} ou na {{t:final-table|mesa final}} (a última mesa de um {{t:tournament|torneio}}, onde se joga pelos prémios mais altos) {{t:call|paga}} all-ins de forma muito mais apertada do que num jogo por {{t:chips|fichas}}. Um stack grande que {{t:cover|cobre}} os adversários arrisca menos e pode tirar partido disso: {{t:shove|fazer shove}} de forma mais ampla, porque os adversários têm de {{t:fold|desistir}}. O bubble factor depende de todos os stacks da mesa, por isso não se calcula à mesa: pratica-se com exemplos para ganhar sensibilidade.
:::

## Limitações do {{t:icm}}

O {{t:icm}} não tem em conta a {{t:position|posição}}, o aumento dos blinds nem a habilidade dos jogadores. É uma aproximação, e não uma avaliação exata de um {{t:tournament|torneio}}.
