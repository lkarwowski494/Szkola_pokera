---
id: m3.l1
module: m3
order: 1
title: "Posição na mesa"
sub: "Por que o seu lugar importa"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "Qual {{t:position|posição}} é a melhor?"
    options:
      - { text: "Button ({{t:button|BTN}})", correct: true, why: "A partir do flop, o Button age por último, então sempre conhece as decisões dos rivais antes de tomar a sua." }
      - { text: "{{t:big-blind|Big blind}}", why: "O {{t:big-blind|BB}} paga menos para entrar porque já colocou fichas, mas a partir do flop age entre os primeiros." }
      - { text: "{{t:utg|UTG}}", why: "O {{t:utg|UTG}} age primeiro no preflop e tem todos os jogadores da mesa atrás de si. É o lugar mais difícil para abrir." }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "Todos antes de você {{t:fold|desistiram}}. O que você faz?"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "K9 de naipes diferentes está fora do {{t:range|range}} de {{t:open|abertura}} do {{t:utg|UTG}}, ou seja, fora da lista de mãos com as quais você {{t:open|abre}} desta {{t:position|posição}}. Há cinco jogadores atrás de você, e muitas vezes alguém tem um rei com um kicker melhor." }
      - { text: "{{t:raise|Aumento}}", why: "Do {{t:utg|UTG}} você {{t:open|abre}} só cerca de {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} das mãos. K9o acerta um rei com facilidade e perde para KQ ou AK." }
      - { text: "Pago o {{t:big-blind|big blind}}", why: "Só pagar (limp) do {{t:utg|UTG}} é um hábito ruim. Ou a mão vale um {{t:raise|aumento}}, ou você {{t:fold|desiste}}." }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "A mesma mão, mas você está no Button e todos antes de você {{t:fold|desistiram}}."
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "{{t:raise|Aumento}}", correct: true, why: "Só restam os blinds, e depois do flop você tem {{t:position|posição}}. No Button você {{t:open|abre}} cerca de {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} das mãos, e K9o está dentro disso." }
      - { text: "{{t:fold|Desisto}}", why: "Cauteloso demais. Contra apenas os blinds, esta mão é boa o suficiente, e a {{t:position|posição}} aumenta o valor dela." }
      - { text: "Pago o {{t:big-blind|big blind}}", why: "O limp abre mão da {{t:initiative|iniciativa}}. Um {{t:raise|aumento}} muitas vezes leva os blinds na hora." }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "Por que agir por último ajuda?"
    options:
      - { text: "Sei o que os rivais fizeram antes de decidir", correct: true, why: "Cada ação de um rival é informação. Quem age por último tem mais informação e pode {{t:check|passar}} a baixo custo ou tomar o {{t:pot|pote}} quando os outros mostram fraqueza." }
      - { text: "Recebo cartas melhores", why: "As cartas são aleatórias, independentemente da {{t:position|posição}}." }
      - { text: "Pago blinds menores", why: "No Button você não paga blinds, mas essa não é a principal vantagem. O mais importante é a informação." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
O botão do dealer (**{{t:button|BTN}}**, Button) se move a cada mão. Ele define a ordem de ação. A partir do flop, o Button age **por último**, e isso é uma enorme vantagem: você vê o que todos os outros fizeram antes de decidir. Quem age antes de um rival depois do flop joga {{t:out-of-position|fora de posição}}: decide sem conhecer a jogada dele.

## {{t:position|Posições}} em uma mesa de 6 jogadores

| {{t:position|Posição}} | Quando age | Com que amplitude {{t:open|abrir}} |
|---|---|---|
| {{t:utg|UTG}} | Primeiro no preflop | cerca de {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} das mãos |
| {{t:hijack|HJ}}, {{t:cutoff|CO}} | Depois do {{t:utg|UTG}}; o {{t:cutoff|CO}} logo antes do Button | cada vez mais amplo |
| {{t:button|BTN}} | Último a partir do flop | cerca de {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} das mãos |
| {{t:small-blind|SB}}, {{t:big-blind|BB}} | Últimos no preflop, primeiros a partir do flop | O {{t:small-blind|SB}} {{t:open|abre}} quando todos {{t:fold|desistirem}} (lição sobre {{t:range|ranges}}); defesa dos blinds no módulo M4 |

O **{{t:hijack|HJ}}** (Hijack) fica depois do {{t:utg|UTG}}, dois lugares antes do Button, e o **{{t:cutoff|CO}}** (Cutoff), logo antes do Button. São {{t:position|posições}} intermediárias: há menos jogadores atrás delas do que atrás do {{t:utg|UTG}}, então você {{t:open|abre}} mais amplo a partir delas, mas ainda mais fechado do que no Button.

:::note Tamanho da {{t:open|abertura}}
Você {{t:open|abre}} com um {{t:raise|aumento}} para {{n:pf.open-size}} de qualquer {{t:position|posição}}, e do {{t:small-blind|small blind}} para {{n:pf.open-size-sb}}. Isso é uma simplificação: nas soluções de solvers, as {{t:open|aberturas}} das {{t:early-position|posições iniciais}} são um pouco menores (por exemplo, {{n:pf.open-size.solver-utg}} do {{t:utg|UTG}} e {{n:pf.open-size.solver-co}} do {{t:cutoff|CO}}), mas um único tamanho é mais fácil de aprender. Ao entrar primeiro, você não paga só o blind (isso é {{t:limp|limp}}, ou seja, entrar apenas {{t:call|pagando}} o {{t:big-blind|big blind}}): um {{t:raise|aumento}} pode ganhar o {{t:pot|pote}} na hora e dá a você a {{t:initiative|iniciativa}}, porque quem {{t:raise|aumentou}} por último costuma fazer a próxima {{t:bet|aposta}}.
:::
