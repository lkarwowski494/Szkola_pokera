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
    prompt: "Um jogador antes de si apenas igualou o {{t:big-blind}} (limp). Quer {{t:raise|aumentar}} do Button. Para quanto?"
    table: { hand: "As Td", position: BTN }
    options:
      - { text: "Para {{n:pf.iso.one-limper}}", correct: true, why: "Base de {{n:pf.iso.base}} mais {{n:pf.iso.per-limper}} por limper. Este tamanho retira ao limper o bom preço." }
      - { text: "Para {{n:pf.min-raise}}", why: "Um {{t:raise|aumento}} mínimo dá ao limper um preço excelente e quase nunca ganha o {{t:pot|pote}} de imediato." }
      - { text: "Para {{n:pf.open-size}}, como numa {{t:open|abertura}} normal", why: "O limper já pôs um blind, por isso o {{t:pot|pote}} é maior. O {{t:raise|aumento}} tem de ser maior do que uma {{t:open|abertura}} normal." }
  - kind: choice
    id: m4.l4.q-two
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Dois jogadores antes de si apenas igualaram o {{t:big-blind}}. Quer {{t:raise|aumentar}} do {{t:cutoff|CO}}. Para quanto?"
    table: { hand: "Ah Qh", position: CO }
    options:
      - { text: "Para {{n:pf.iso.two-limpers}}", correct: true, why: "{{n:pf.iso.base}} mais {{n:pf.iso.per-limper}} por cada um dos dois limpers." }
      - { text: "Para {{n:pf.iso.one-limper}}", why: "Esse é o tamanho contra um limper. Cada limper adicional acrescenta {{n:pf.iso.per-limper}}." }
      - { text: "Apenas pago", why: "AQ do mesmo naipe é uma mão para {{t:raise|aumentar}} {{t:value|por valor}}. Pagar entrega a {{t:initiative|iniciativa}} e deixa todos entrar barato." }
  - kind: choice
    id: m4.l4.q-oop
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Um jogador faz limp e todos desistem até si no {{t:small-blind|small blind}}. Quer {{t:raise|aumentar}}. Para quanto?"
    table: { hand: "Kd Ks", position: SB }
    options:
      - { text: "Para {{n:pf.iso.one-limper-oop}}", correct: true, why: "{{t:out-of-position|Fora de posição}} acrescenta ainda {{n:pf.iso.oop-extra}}: {{n:pf.iso.base}} mais {{n:pf.iso.per-limper}} por limper mais {{n:pf.iso.oop-extra}}." }
      - { text: "Para {{n:pf.iso.one-limper}}", why: "Esse é o tamanho {{t:in-position}}. {{t:out-of-position|Fora de posição}} {{t:raise|aumenta}} um pouco mais, para que o adversário {{t:fold|desista}} mais vezes ou pague mais caro." }
      - { text: "Apenas pago", why: "Com KK constrói sempre o {{t:pot|pote}}." }
  - kind: choice
    id: m4.l4.q-ajo
    family: m4.iso.size
    rules: [R-M4-012]
    prompt: "Um jogador antes de si apenas igualou o {{t:big-blind}} (limp). Está no Button. O que faz?"
    table: { hand: "Ad Jc", position: BTN }
    options:
      - { text: "{{t:raise|Aumento}} para {{n:pf.iso.one-limper}}", correct: true, why: "AJ é uma mão para {{t:isolation|isolamento}}: domina muitas mãos com que um jogador mais fraco faz limp, e depois do flop tem {{t:position|posição}}. Tamanho: {{n:pf.iso.base}} mais {{n:pf.iso.per-limper}} por limper." }
      - { text: "{{t:raise|Aumento}} para {{n:pf.min-raise}}", sizeError: true, why: "Boa ação, mas um {{t:raise|aumento}} mínimo dá ao limper um preço excelente, por isso quase nunca {{t:fold|desiste}} e não joga contra ele frente a frente. {{t:raise|Aumenta}} para {{n:pf.iso.one-limper}}." }
      - { text: "Pago", why: "Entrega a {{t:initiative|iniciativa}} e deixa os blinds entrar barato. Com uma mão que domina o limper, quer construir o {{t:pot|pote}}." }
      - { text: "{{t:fold|Desisto}}", why: "Demasiado apertado: contra um limper, o Button {{t:isolation|isola}} cerca de {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} das mãos, e AJ cabe aí com folga." }
  - kind: choice
    id: m4.l4.q-many
    family: m4.iso.many
    rules: [R-M4-013]
    prompt: "Três jogadores antes de si apenas igualaram o {{t:big-blind}}. Está no Button. O que faz?"
    table: { hand: "7s 6s", position: BTN }
    options:
      - { text: "Pago", correct: true, why: "Contra muitos limpers, os {{t:connectors|conectores}} do mesmo naipe são mãos especulativas: vê o flop barato {{t:in-position}} e pode acertar uma mão grande. Uma das fontes recomenda aqui pagar; outra aconselha evitá-lo, por isso aceitamos também a {{t:fold|desistência}}." }
      - { text: "{{t:fold|Desisto}}", correct: true, why: "Também correto: uma das fontes aconselha não pagar, mas sim {{t:raise|aumentar}} ou {{t:fold|desistir}}, e 76s não serve para {{t:raise|aumentar}} {{t:value|por valor}}. Outra fonte recomenda pagar, por isso aceitamos ambas as jogadas." }
      - { text: "{{t:raise|Aumento}} para {{n:pf.iso.two-limpers}}", why: "Com três limpers, um {{t:bluff}} com {{t:raise|aumento}} raramente ganha o {{t:pot|pote}}, e o tamanho deveria ser ainda maior. 76s não serve para {{t:raise|aumentar}} {{t:value|por valor}}." }
---
Limp é entrar na mão apenas igualando o {{t:big-blind|big blind}}. Os profissionais raramente fazem limp como primeiros a entrar (regra do módulo 3), por isso os limpers nas microapostas são normalmente jogadores mais fracos. O {{t:raise|aumento}} contra um limper chama-se {{t:isolation|isolamento}}: quer jogar contra ele frente a frente, de preferência {{t:in-position}}.

:::note De onde vêm estas regras
O solver da aplicação não joga limps, por isso esta lição baseia-se em materiais de formação. As regras estão assinaladas como heurísticas.
:::

## Tamanho do {{t:isolation|isolamento}}

Online {{t:raise|aumenta}} para {{n:pf.iso.base}} mais {{n:pf.iso.per-limper}} por cada limper: contra um, para {{n:pf.iso.one-limper}}; contra dois, para {{n:pf.iso.two-limpers}}. {{t:out-of-position|Fora de posição}} acrescenta ainda {{n:pf.iso.oop-extra}}. Nunca faça um aumento mínimo: o limper teria um preço excelente e quase nunca {{t:fold|desistiria}}.

## {{t:range|Range}} de {{t:isolation|isolamento}}

No Button, contra um limper, {{t:isolation|isola}} de forma ampla, cerca de {{n:pf.iso.btn.low}}–{{n:pf.iso.btn.high}} das mãos: {{t:pair|pares}} médios e altos, ases do mesmo naipe, ases fortes de naipes diferentes, cartas altas e parte dos {{t:connectors|conectores}} do mesmo naipe. Quanto mais inicial for a {{t:position|posição}} e quanto mais limpers houver, mais estreito é o {{t:range}}: contra três limpers {{t:raise|aumenta}} sobretudo {{t:value|por valor}}.

Com mãos especulativas, como {{t:pair|pares}} baixos e {{t:connectors|conectores}} do mesmo naipe, pode pagar {{t:in-position}} contra muitos limpers. Aqui as fontes divergem: uma recomenda pagar, a outra aconselha evitá-lo; nos exercícios aceitamos ambas as jogadas, pagar e {{t:fold|desistir}}.
