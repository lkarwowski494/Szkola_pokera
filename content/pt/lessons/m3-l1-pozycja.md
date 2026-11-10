---
id: m3.l1
module: m3
order: 1
title: "A posição à mesa"
sub: "Porque é que o lugar importa"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "Qual {{t:position}} é a melhor?"
    options:
      - { text: "Button ({{t:button|BTN}})", correct: true, why: "A partir do flop, o Button fala em último lugar, por isso conhece sempre as decisões dos adversários antes de tomar a sua." }
      - { text: "{{t:big-blind|Big blind}}", why: "O {{t:big-blind|BB}} paga menos para entrar porque já pagou, mas a partir do flop fala entre os primeiros." }
      - { text: "{{t:utg|UTG}}", why: "{{t:utg|UTG}} fala em primeiro lugar no preflop e tem atrás de si todos os jogadores da mesa. É o lugar mais difícil para abrir." }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "Todos antes de si {{t:fold|desistiram}}. O que faz?"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "{{t:fold|Desisto}}", correct: true, why: "K9 de naipes diferentes está fora do {{t:range|range}} de {{t:open|abertura}} de {{t:utg|UTG}}, ou seja, fora da lista de mãos com que {{t:open|abre}} a partir desta {{t:position|posição}}. Há cinco jogadores depois de si e muitas vezes alguém tem um rei com um kicker melhor." }
      - { text: "{{t:raise|Aumento}}", why: "De {{t:utg|UTG}}, {{t:open|abre}} apenas cerca de {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} das mãos. K9o acerta facilmente um rei e perde para KQ ou AK." }
      - { text: "Pago o {{t:big-blind|big blind}}", why: "Limitar-se a pagar (limp) de {{t:utg|UTG}} é um mau hábito. Ou a mão vale um {{t:raise|aumento}}, ou {{t:fold|desiste}}." }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "A mesma mão, mas está no Button e todos antes de si {{t:fold|desistiram}}."
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "{{t:raise|Aumento}}", correct: true, why: "Restam apenas os blinds e, depois do flop, tem {{t:position|posição}}. No Button, {{t:open|abre}} cerca de {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} das mãos, e K9o está incluída." }
      - { text: "{{t:fold|Desisto}}", why: "Cautela excessiva. Contra apenas os blinds, esta mão é suficientemente boa, e a {{t:position}} acrescenta-lhe valor." }
      - { text: "Pago o {{t:big-blind|big blind}}", why: "O limp cede a {{t:initiative|iniciativa}}. Um {{t:raise|aumento}} ganha muitas vezes os blinds de imediato." }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "Porque é que falar em último lugar ajuda?"
    options:
      - { text: "Sei o que os adversários fizeram antes de decidir", correct: true, why: "Cada ação de um adversário é informação. Quem fala em último lugar tem mais informação e pode {{t:check|passar}} a baixo custo ou ficar com o {{t:pot|pote}} quando os outros mostram fraqueza." }
      - { text: "Recebo cartas melhores", why: "As cartas são aleatórias, independentemente da {{t:position|posição}}." }
      - { text: "Pago blinds mais baixos", why: "No Button não paga blinds, mas essa não é a principal vantagem. O mais importante é a informação." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
O botão do dealer (**{{t:button|BTN}}**, Button) muda de lugar a cada mão. É ele que determina a ordem de ação. A partir do flop, o Button fala **em último lugar**, e isso é uma enorme vantagem: vê o que todos os outros fizeram antes de decidir. Quem, depois do flop, age antes de um adversário joga {{t:out-of-position}}: decide sem conhecer a jogada dele.

## {{t:position|Posições}} numa mesa de 6 jogadores

| {{t:position|Posição}} | Quando fala | Com que amplitude {{t:open|abrir}} |
|---|---|---|
| {{t:utg|UTG}} | Primeiro no preflop | cerca de {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} das mãos |
| {{t:hijack|HJ}}, {{t:cutoff|CO}} | Depois de {{t:utg|UTG}}; o {{t:cutoff|CO}} imediatamente antes do Button | cada vez mais amplo |
| {{t:button|BTN}} | Último a partir do flop | cerca de {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} das mãos |
| {{t:small-blind|SB}}, {{t:big-blind|BB}} | Últimos no preflop, primeiros a partir do flop | O {{t:small-blind|SB}} {{t:open|abre}} quando todos {{t:fold|desistem}} (lição sobre {{t:range|ranges}}); defesa dos blinds no módulo M4 |

O **{{t:hijack|HJ}}** (Hijack) senta-se depois de {{t:utg|UTG}}, dois lugares antes do Button, e o **{{t:cutoff|CO}}** (Cutoff) imediatamente antes do Button. São {{t:position|posições}} intermédias: há menos jogadores depois delas do que depois de {{t:utg|UTG}}, por isso {{t:open|abre}} a partir delas de forma mais ampla, mas ainda mais restrita do que a partir do Button.

:::note Tamanho da {{t:open|abertura}}
{{t:open|Abre}} com um {{t:raise|aumento}} para {{n:pf.open-size}} a partir de qualquer {{t:position|posição}} e, a partir do {{t:small-blind|small blind}}, para {{n:pf.open-size-sb}}. Isto é uma simplificação: nas soluções dos solvers, as {{t:open|aberturas}} das {{t:early-position|posições iniciais}} são um pouco menores (p. ex., {{n:pf.open-size.solver-utg}} de {{t:utg|UTG}} e {{n:pf.open-size.solver-co}} do {{t:cutoff|CO}}), mas um único tamanho é mais fácil de aprender. Ao entrar em primeiro lugar, não se limita a pagar o blind (isso é um {{t:limp}}, ou seja, entrar apenas com um {{t:call|pagamento}} do {{t:big-blind|big blind}}): um {{t:raise}} pode ganhar o {{t:pot|pote}} de imediato e dá-lhe a {{t:initiative|iniciativa}}, porque quem {{t:raise|aumentou}} em último lugar costuma fazer a {{t:bet|aposta}} seguinte.
:::
