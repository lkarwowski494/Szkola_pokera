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
    prompt: "Restam três jogadores e duas posições são pagas. Stacks: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} e {{n:m11.icm.a.s3}} {{t:chips|fichas}}. Segundo o {{t:icm}}, qual é a chance do menor stack ficar em 1º lugar? Digite o número em porcentagem."
    answer: m11.icm.a.chips3
    explanation: "Chance de 1º lugar = stack ÷ todas as {{t:chips|fichas}} = {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = {{n:m11.icm.a.chips3}}."
  - kind: choice
    id: m11.l3.q-second
    family: m11.icm.second
    rules: [R-M11-008]
    prompt: "Os mesmos stacks ({{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}). O stack grande ficou em 1º lugar. Qual é agora a chance do menor stack ficar em 2º lugar?"
    options:
      - { text: "{{n:m11.icm.a.second3.via1}}", correct: true, why: "Restaram dois jogadores com {{n:m11.icm.a.rest1}} {{t:chips|fichas}}, das quais o stack curto tem {{n:m11.icm.a.s3}}: {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.rest1}} = {{n:m11.icm.a.second3.via1}}." }
      - { text: "{{n:m11.icm.a.chips3}}", why: "Essa é a chance de 1º lugar, calculada com todas as {{t:chips|fichas}}. Quando o vencedor sai da conta, divida só pelas {{t:chips|fichas}} dos que restam: {{n:m11.icm.a.rest1}}." }
      - { text: "{{n:m11.icm.a.second3}}", why: "Essa é a chance total do {{t:short-stack|short stack}} de ficar em 2º lugar, somando os dois vencedores possíveis. A pergunta trata do caso em que o stack grande venceu." }
  - kind: numeric
    id: m11.l3.n-equity
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "{{t:payout|Pagamentos}}: {{n:m11.icm.a.p1}} da {{t:prize-pool|premiação}} pelo 1º lugar e {{n:m11.icm.a.p2}} pelo 2º. Stacks {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}}, {{n:m11.icm.a.s3}}. Segundo o {{t:icm}}, quanto vale o menor stack (em porcentagem da {{t:prize-pool|premiação}})? Digite o número."
    answer: m11.icm.a.eq3
    explanation: "Chance de 1º lugar {{n:m11.icm.a.chips3}}, de 2º lugar {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ {{n:m11.icm.a.second3}}. Equity = {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ {{n:m11.icm.a.eq3}}, mais do que seus {{n:m11.icm.a.chips3}} das {{t:chips|fichas}}."
  - kind: choice
    id: m11.l3.q-big-stack
    family: m11.icm.equity
    rules: [R-M11-008]
    prompt: "O stack grande tem {{n:m11.icm.a.chips1}} das {{t:chips|fichas}} em jogo. Segundo o {{t:icm}}, quanto ele vale em dinheiro?"
    options:
      - { text: "{{n:m11.icm.a.eq1}}, ou seja, menos que sua participação em {{t:chips|fichas}}", correct: true, why: "O stack grande pode ganhar no máximo {{n:m11.icm.a.p1}} da {{t:prize-pool|premiação}}, embora tenha chance de ganhar todas as {{t:chips|fichas}}. Por isso as {{t:chips|fichas}} do líder valem menos que sua participação, e as do {{t:short-stack|short stack}} valem mais ({{n:m11.icm.a.eq3}})." }
      - { text: "{{n:m11.icm.a.chips1}}, o mesmo que sua participação em {{t:chips|fichas}}", why: "Seria assim se o vencedor levasse toda a {{t:prize-pool|premiação}}. Com {{t:payout|pagamentos}} de {{n:m11.icm.a.p1}}/{{n:m11.icm.a.p2}}, cada {{t:chips|ficha}} do stack grande vale menos: {{n:m11.icm.a.eq1}}." }
      - { text: "{{n:m11.icm.a.p1}}, porque quase certamente vai vencer", why: "Ele tem só {{n:m11.icm.a.chips1}} de chance de ficar em 1º lugar, e o resto da sua {{t:tournament-equity|equity de torneio}} vem do 2º lugar. No total, {{n:m11.icm.a.eq1}}." }
  - kind: numeric
    id: m11.l3.n-bf
    family: m11.bf
    rules: [R-M11-009]
    prompt: "{{t:bubble|Bolha}}: quatro jogadores, três posições pagas. Se você {{t:call|pagar}} um all-in, perde {{n:m11.bf.loss}} da {{t:prize-pool|premiação}} quando perde e ganha {{n:m11.bf.gain}} quando vence. Qual é o bubble factor? Digite um número com duas casas decimais."
    answer: m11.bf.value
    explanation: "Bubble factor = perda ÷ ganho = {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = {{n:m11.bf.value}}. Perder dói quase uma vez e meia mais do que vencer ajuda."
  - kind: numeric
    id: m11.l3.n-req
    family: m11.bf
    rules: [R-M11-009]
    prompt: "O bubble factor é {{n:m11.bf.value}}. De quanta equity você precisa para que o {{t:call}} do all-in compense? Digite o número em porcentagem."
    answer: m11.bf.req
    explanation: "Equity necessária = BF ÷ (BF + 1), ou seja, perda ÷ (perda + ganho) = {{n:m11.bf.loss}} ÷ {{n:m11.bf.range}} = {{n:m11.bf.req}}. Num jogo por {{t:chips|fichas}}, bastariam {{n:m11.bf.req-chips}}."
  - kind: choice
    id: m11.l3.q-premium
    family: m11.bf
    rules: [R-M11-009]
    prompt: "Num jogo por {{t:chips|fichas}}, {{n:m11.bf.req-chips}} de equity bastam para {{t:call|pagar}} este all-in, mas segundo o {{t:icm}} você precisa de {{n:m11.bf.req}}. Como se chama a diferença?"
    options:
      - { text: "{{t:risk-premium|Prêmio de risco}} ({{n:m11.bf.premium}})", correct: true, why: "{{t:risk-premium|Prêmio de risco}} é a equity extra que o {{t:icm}} exige além do preço em {{t:chips|fichas}}: {{n:m11.bf.req}} − {{n:m11.bf.req-chips}} = {{n:m11.bf.premium}}." }
      - { text: "Bubble factor", why: "Bubble factor é a razão entre perda e ganho ({{n:m11.bf.value}}). Com ele você calcula a equity necessária, e a diferença em relação ao jogo por {{t:chips|fichas}} é o {{t:risk-premium|prêmio de risco}}." }
      - { text: "Fold equity", why: "Fold equity é o lucro com os {{t:fold|folds}} do adversário. Ao {{t:call|pagar}} um all-in, você não tem nenhuma." }
  - kind: choice
    id: m11.l3.q-call-bubble
    family: m11.icm.call
    rules: [R-M11-009, R-M11-010]
    prompt: "{{t:bubble|Bolha}}, o exemplo da lição. Sua mão tem cerca de {{n:m11.bf.example-eq}} de equity contra o {{t:range}} de all-in do adversário. Num jogo por {{t:chips|fichas}}, o {{t:call}} compensaria, porque bastam {{n:m11.bf.req-chips}}. O que você faz aqui?"
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Segundo o {{t:icm}}, aqui você precisa de {{n:m11.bf.req}} de equity. Uma mão que vence com menos frequência perde dinheiro, embora estivesse no lucro em {{t:chips|fichas}}." }
      - { text: "{{t:call|Pago}}, porque em {{t:chips|fichas}} é lucro", why: "Num {{t:tournament|torneio}} com {{t:payout|pagamentos}}, o que conta é o dinheiro, não as {{t:chips|fichas}}. Perder custa {{n:m11.bf.loss}} da {{t:prize-pool|premiação}}, e vencer dá só {{n:m11.bf.gain}}." }
      - { text: "{{t:call|Pago}}, porque venço mais da metade das vezes", why: "Uma mão com {{n:m11.bf.example-eq}} vence mais da metade das vezes e, mesmo assim, aqui é fraca demais: o limite é {{n:m11.bf.req}}." }
  - kind: choice
    id: m11.l3.q-covering
    family: m11.icm.call
    rules: [R-M11-010]
    prompt: "{{t:bubble|Bolha}} do {{t:tournament|torneio}}. Você tem o maior stack da mesa e {{t:cover|cobre}} todos. O stack médio desiste diante de você com muita frequência. O que isso significa?"
    options:
      - { text: "Você pode fazer {{t:shove|shove}} com mais mãos, porque os adversários {{t:call|pagam}} de forma apertada", correct: true, why: "Ao {{t:call|pagar}}, o stack médio arrisca ser eliminado logo antes da premiação, então precisa de muita equity. Você, se perder, perde só parte do stack. Os adversários {{t:call|pagam}} de forma apertada, então você leva o {{t:pot|pote}} sem disputa com mais frequência." }
      - { text: "Você joga mais apertado para não perder a liderança", why: "O líder tem o menor risco da mesa. Jogar apertado abre mão da sua principal vantagem: a pressão sobre os stacks médios." }
      - { text: "Nada, porque o {{t:icm}} só se aplica a {{t:short-stack|short stacks}}", why: "O {{t:icm}} se aplica a todos: muda quanta equity cada um precisa para {{t:call|pagar}}, e isso depende de toda a distribuição dos stacks." }
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
    prompt: "O que o modelo {{t:icm}} pressupõe?"
    options:
      - { text: "Que todos jogam igualmente bem e só os stacks decidem as colocações", correct: true, why: "O {{t:icm}} converte apenas os stacks em chances de cada colocação. Não considera {{t:position|posição}}, blinds crescentes nem vantagem de habilidade." }
      - { text: "Que o jogador melhor vence com mais frequência", why: "Pelo contrário: o {{t:icm}} pressupõe habilidade igual. Ele não leva em conta a vantagem de nenhum jogador." }
      - { text: "Que o jogador no {{t:big-blind}} tem chances menores", why: "O {{t:icm}} não considera {{t:position|posição}} nem blinds: olha só para os stacks. Essa é uma de suas limitações." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar tournament
  - kind: generated
    id: m11.l3.g-vocab-tournament
    family: vocab.tournament
    generator: vocab
    params: { area: tournament, dir: both }
    count: 4
---
No jogo a dinheiro (cash), uma {{t:chips|ficha}} é dinheiro: a ganha e a perdida valem o mesmo. Num {{t:tournament|torneio}} não é assim. Os prêmios vão para as primeiras colocações, e o vencedor não leva toda a {{t:prize-pool|premiação}}, embora leve todas as {{t:chips|fichas}}. Por isso é preciso converter as {{t:chips|fichas}} em dinheiro.

## {{t:icm}}: o stack em dinheiro

O modelo de {{t:chips|fichas}} independentes ({{t:icm}}) converte os stacks em chances de cada colocação. Ele pressupõe que todos jogam igualmente bem, então só os stacks decidem a ordem.

```formula
chance de 1º lugar = seu stack ÷ todas as fichas
```

A chance de 2º lugar se calcula do mesmo jeito, mas separadamente para cada vencedor possível: subtraia as {{t:chips|fichas}} dele e divida pelo que sobrou. A {{t:tournament-equity|equity de torneio}} de um stack, ou seja, sua parte esperada da {{t:prize-pool|premiação}}, é a soma: chance da colocação × {{t:payout|pagamento}} da colocação.

## Exemplo: três jogadores na {{t:bubble|bolha}}

Duas posições são pagas: {{n:m11.icm.a.p1}} e {{n:m11.icm.a.p2}} da {{t:prize-pool|premiação}}. Stacks: {{n:m11.icm.a.s1}}, {{n:m11.icm.a.s2}} e {{n:m11.icm.a.s3}} {{t:chips|fichas}}.

- O {{t:short-stack|short stack}} vence o {{t:tournament|torneio}} com chance de {{n:m11.icm.a.s3}} ÷ {{n:m11.icm.a.total}} = **{{n:m11.icm.a.chips3}}**.
- Para o 2º lugar: se o stack grande vencer ({{n:m11.icm.a.chips1}}), o curto fica em segundo com chance de {{n:m11.icm.a.second3.via1}}; se o médio vencer ({{n:m11.icm.a.chips2}}), com chance de {{n:m11.icm.a.second3.via2}}. No total, {{n:m11.icm.a.second3.p1}} + {{n:m11.icm.a.second3.p2}} ≈ **{{n:m11.icm.a.second3}}** (as parcelas estão arredondadas).
- Equity: {{n:m11.icm.a.chips3}} × {{n:m11.icm.a.p1}} + {{n:m11.icm.a.second3}} × {{n:m11.icm.a.p2}} ≈ **{{n:m11.icm.a.eq3}}** da {{t:prize-pool|premiação}}.

| Stack | Participação em {{t:chips|fichas}} | Equity segundo o {{t:icm}} |
|---|---|---|
| {{n:m11.icm.a.s1}} | {{n:m11.icm.a.chips1}} | {{n:m11.icm.a.eq1}} |
| {{n:m11.icm.a.s2}} | {{n:m11.icm.a.chips2}} | {{n:m11.icm.a.eq2}} |
| {{n:m11.icm.a.s3}} | {{n:m11.icm.a.chips3}} | {{n:m11.icm.a.eq3}} |

O {{t:short-stack|short stack}} vale mais do que suas {{t:chips|fichas}}, e o grande vale menos: o líder não recebe mais do que o prêmio do 1º lugar.

## Bubble factor: perder dói mais

Quatro jogadores, três posições pagas: {{n:m11.bf.p1}}, {{n:m11.bf.p2}} e {{n:m11.bf.p3}}. Stacks {{n:m11.bf.s1}}, {{n:m11.bf.s2}} (você), {{n:m11.bf.s3}} e {{n:m11.bf.s4}}. O jogador com {{n:m11.bf.s3}} vai all-in, e você o {{t:cover|cobre}}, ou seja, tem mais {{t:chips|fichas}}. Para simplificar, ignoramos os blinds no {{t:pot|pote}}.

- Agora seu stack vale {{n:m11.bf.eq.now}} da {{t:prize-pool|premiação}}.
- Se você vencer: fica com {{n:m11.bf.win}}, o adversário é eliminado e todos estão na premiação. Sua equity sobe para {{n:m11.bf.eq.win}}, ou seja, **{{n:m11.bf.gain}}** a mais.
- Se você perder: sobram {{n:m11.bf.lose}}, e sua equity cai para {{n:m11.bf.eq.lose}}, ou seja, **{{n:m11.bf.loss}}** a menos.

```formula
bubble factor = perda quando você perde ÷ ganho quando você vence
```

Aqui, {{n:m11.bf.loss}} ÷ {{n:m11.bf.gain}} = **{{n:m11.bf.value}}**. O app usa esta definição (perda ÷ ganho): num jogo por {{t:chips|fichas}}, em que a perda é igual ao ganho, o bubble factor é um. Algumas tabelas de push/fold calculam o bubble factor de outro jeito, em outra escala, então não compare os números delas diretamente com estes. Dele resulta a equity necessária:

```formula
equity necessária = BF ÷ (BF + 1)
```

O resultado é **{{n:m11.bf.req}}**. Num jogo por {{t:chips|fichas}}, você arrisca {{n:m11.bf.s3}} para ganhar {{n:m11.bf.s3}}, então bastariam {{n:m11.bf.req-chips}}. A diferença, {{n:m11.bf.premium}}, é o **{{t:risk-premium|prêmio de risco}}**.

A mesma tendência aparece num equilíbrio publicado para três jogadores com stacks iguais (artigo científico de 2008): quando o Button e o {{t:small-blind}} já estão all-in, o {{t:big-blind}} {{t:call|paga}} com {{n:m11.jamfold3.overcall.single}} das mãos numa mão isolada, mas num {{t:tournament|torneio}} com {{t:payout|pagamentos}} só com {{n:m11.jamfold3.overcall.tourn}}, ou seja, apenas os {{t:pocket-pair|pares de mão}} mais altos e AKs.

:::note Quem {{t:call|paga}} de forma apertada
O stack médio na {{t:bubble|bolha}} ou na {{t:final-table|mesa final}} (a última mesa do {{t:tournament|torneio}}, onde se joga pelos maiores prêmios) {{t:call|paga}} all-ins de forma muito mais apertada do que num jogo por {{t:chips|fichas}}. O stack grande, que {{t:cover|cobre}} os adversários, arrisca menos e pode aproveitar isso: fazer {{t:shove|shove}} com mais mãos, porque os adversários precisam {{t:fold|desistir}}. O bubble factor depende de todos os stacks da mesa, por isso não é calculado durante o jogo: ele é praticado em exemplos para desenvolver a intuição.
:::

## Limitações do {{t:icm}}

O {{t:icm}} não leva em conta {{t:position|posição}}, blinds crescentes nem a habilidade dos jogadores. É uma aproximação, não uma avaliação exata do {{t:tournament|torneio}}.
