---
id: m4.l4
module: m4
order: 4
title: "Limpers"
sub: "Isolamento: tamanho e range"
rules: [R-M4-012, R-M4-013]
drills:
  - kind: choice
    id: m4.l4.q-one
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Um jogador antes de você só pagou o {{t:big-blind|big blind}} (limp). Você quer {{t:raise|aumentar}} do Button. Para quanto?"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "Para {{n:pf.iso.one-limper}}", correct: true, why: "Base de {{n:pf.iso.base}} mais {{n:pf.iso.per-limper}} por limper. Esse tamanho tira do limper o bom preço." }
      - { text: "Para {{n:pf.min-raise}}", why: "Um {{t:raise|aumento}} mínimo dá ao limper um ótimo preço e quase nunca ganha o {{t:pot|pote}} na hora." }
      - { text: "Para {{n:pf.open-size}}, como uma {{t:open|abertura}} normal", why: "O limper já colocou um blind, então o {{t:pot|pote}} é maior. O {{t:raise|aumento}} precisa ser maior que uma {{t:open|abertura}} normal." }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Dois jogadores antes de você só pagaram o {{t:big-blind|big blind}}. Você quer {{t:raise|aumentar}} do {{t:cutoff|CO}}. Para quanto?"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "Para {{n:pf.iso.two-limpers}}", correct: true, why: "{{n:pf.iso.base}} mais {{n:pf.iso.per-limper}} por cada um dos dois limpers." }
      - { text: "Para {{n:pf.iso.one-limper}}", why: "Esse é o tamanho contra um limper. Cada limper a mais adiciona {{n:pf.iso.per-limper}}." }
      - { text: "Só pago", why: "AQ do mesmo naipe é uma mão para {{t:raise|aumentar}} {{t:value|por valor}}. Pagar entrega a {{t:initiative|iniciativa}} e deixa todo mundo entrar barato." }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Um jogador dá limp e todos desistem até você no {{t:small-blind|small blind}}. Você quer {{t:raise|aumentar}}. Para quanto?"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "Para {{n:pf.iso.one-limper-oop}}", correct: true, why: "{{t:out-of-position|Fora de posição}} você adiciona mais {{n:pf.iso.oop-extra}}: {{n:pf.iso.base}} mais {{n:pf.iso.per-limper}} por limper mais {{n:pf.iso.oop-extra}}." }
      - { text: "Para {{n:pf.iso.one-limper}}", why: "Esse é o tamanho {{t:in-position|em posição}}. {{t:out-of-position|Fora de posição}} você {{t:raise|aumenta}} um pouco mais, para que o adversário {{t:fold|desista}} com mais frequência ou pague mais caro." }
      - { text: "Só pago", why: "Com KK você sempre constrói o {{t:pot|pote}}." }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Um jogador antes de você só pagou o {{t:big-blind|big blind}} (limp). Você está no Button. O que você faz?"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "{{t:raise|Aumento}} para {{n:pf.iso.one-limper}}", correct: true, why: "AJ é uma mão para {{t:isolation|isolar}}: domina muitas mãos com que um jogador mais fraco dá limp, e depois do flop você tem {{t:position|posição}}. Tamanho: {{n:pf.iso.base}} mais {{n:pf.iso.per-limper}} por limper." }
      - { text: "{{t:raise|Aumento}} para {{n:pf.min-raise}}", sizeError: true, why: "Boa ação, mas um {{t:raise|aumento}} mínimo dá ao limper um ótimo preço, então ele quase nunca vai {{t:fold|desistir}} e você não joga mano a mano com ele. {{t:raise|Aumente}} para {{n:pf.iso.one-limper}}." }
      - { text: "Pago", why: "Você entrega a {{t:initiative|iniciativa}} e deixa os blinds entrarem barato. Com uma mão que domina o limper, você quer construir o {{t:pot|pote}}." }
      - { text: "{{t:fold|Desisto}}", why: "Apertado demais: contra um limper, o Button {{t:isolation|isola}} cerca de {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} das mãos, e AJ cabe nesse range com folga." }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "Três jogadores antes de você só pagaram o {{t:big-blind|big blind}}. Você está no Button. O que você faz?"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "Pago", correct: true, why: "Contra muitos limpers, {{t:connectors|conectores}} do mesmo naipe são mãos especulativas: você vê o flop barato {{t:in-position|em posição}} e pode acertar uma mão grande. Uma das fontes recomenda pagar aqui; outra aconselha evitar isso, então também aceitamos {{t:fold|desistir}}." }
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Também correto: uma das fontes aconselha não pagar, e sim {{t:raise|aumentar}} ou {{t:fold|desistir}}, e 76s não serve para {{t:raise|aumentar}} {{t:value|por valor}}. Outra fonte recomenda pagar, então aceitamos as duas jogadas." }
      - { text: "{{t:raise|Aumento}} para {{n:pf.iso.two-limpers}}", why: "Com três limpers, um {{t:raise|aumento}} de {{t:bluff|blefe}} raramente leva o {{t:pot|pote}}, e o tamanho deveria ser ainda maior. 76s não serve para {{t:raise|aumentar}} {{t:value|por valor}}." }
---
Limp é entrar na mão apenas pagando o {{t:big-blind|big blind}}. Profissionais raramente dão limp como primeiros a entrar (regra do módulo 3), então os limpers nos microlimites costumam ser jogadores mais fracos. {{t:raise|Aumentar}} contra um limper se chama {{t:isolation|isolamento}}: você quer jogar mano a mano com ele, de preferência {{t:in-position|em posição}}.

:::note De onde vêm estas regras
O solver do app não joga limps, então esta lição se baseia em materiais de treinamento. As regras estão marcadas como heurísticas.
:::

## Tamanho do {{t:isolation|isolamento}}

Online, você {{t:raise|aumenta}} para {{n:pf.iso.base}} mais {{n:pf.iso.per-limper}} por limper: contra um, para {{n:pf.iso.one-limper}}; contra dois, para {{n:pf.iso.two-limpers}}. {{t:out-of-position|Fora de posição}}, você adiciona mais {{n:pf.iso.oop-extra}}. Nunca faça um aumento mínimo: o limper teria um ótimo preço e quase nunca iria {{t:fold|desistir}}.

## {{t:range|Range}} de {{t:isolation|isolamento}}

No Button, contra um limper, você {{t:isolation|isola}} com um range amplo, cerca de {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} das mãos: {{t:pair|pares}} médios e altos, ases do mesmo naipe, ases fortes de naipes diferentes, cartas altas e parte dos {{t:connectors|conectores}} do mesmo naipe. Quanto mais cedo a sua {{t:position|posição}} e quanto mais limpers, mais estreito o seu {{t:range|range}}: contra três limpers, você {{t:raise|aumenta}} principalmente {{t:value|por valor}}.

Com mãos especulativas, como {{t:pair|pares}} baixos e {{t:connectors|conectores}} do mesmo naipe, você pode pagar contra muitos limpers {{t:in-position|em posição}}. Aqui as fontes divergem: uma recomenda pagar, a outra aconselha evitar isso; nos exercícios, aceitamos as duas jogadas, pagar e {{t:fold|desistir}}.
