---
id: m5.l4
module: m5
order: 4
title: "Fora de posição e contra vários adversários"
sub: "Quando passar mais vezes"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:open|Abriu}} do {{t:cutoff|CO}}, o Button {{t:call|pagou}} e os blinds {{t:fold|desistiram}}. O flop é médio e {{t:connected|conectado}}. É o primeiro a agir. Que plano é o adequado aqui?"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "{{t:check|Passo}} mais vezes do que {{t:in-position}}", correct: true, why: "Sim: o Button {{t:call|pagou}} com {{t:position|posição}}, por isso tem um {{t:range}} forte, e um flop médio e {{t:connected|conectado}} acerta bem nos {{t:pair|pares}} e {{t:connectors|conectores}} dele. {{t:out-of-position|Fora de posição}}, {{t:check|passa}} aqui muitas vezes, também com mãos fortes." }
      - { text: "C-bet frequente e pequeno, como no Button", why: "Esse é o plano {{t:in-position}} num flop {{t:dry|seco}} e alto. Aqui não tem {{t:position|posição}} e o flop não favorece o seu {{t:range}}." }
      - { text: "C-bet com todas as mãos, para não perder a {{t:initiative|iniciativa}}", why: "A {{t:initiative|iniciativa}} não ganha sozinha: o {{t:range}} do Button é forte aqui e, depois de cada {{t:bet|aposta}}, também é o primeiro a agir no turn e no river." }
  - kind: cbet
    id: m5.l4.c-oop
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "You {{t:open|opened}} from the {{t:hijack|HJ}}, the Button {{t:call|called}}, and everyone else {{t:fold|folded}}. You act first. Which plan fits this flop?"
    position: HJ
    options:
      check: "I {{t:check}}"
      small: "Small c-bet: {{n:cbet.size.small}} of the {{t:pot}}"
      big: "Big c-bet: {{n:cbet.size.big}} of the {{t:pot}}"
    cases:
      - when: { height: [low], ranks: [connected, semi-connected, disconnected] }
        best: check
        rule: R-M5-012
        why:
          check: "Yes: on a low unpaired flop (the highest card is a nine or lower), the solver {{t:check|checks}} its whole {{t:range}} in this spot. Your wide {{t:range}} has lots of high cards that missed here, while the Button, who {{t:call|called}} with {{t:position}}, has fewer hands with no chance."
          small: "Too often: on a low unpaired flop, the solver doesn't c-bet in this spot; it {{t:check|checks}} its whole {{t:range}}, strong hands included. When the Button {{t:bet|bets}}, some of the strong hands {{t:raise}} after {{t:check|checking}} (check-raise)."
          big: "Too often and too expensive: on a low unpaired flop, the solver doesn't c-bet in this spot; it {{t:check|checks}} its whole {{t:range}}, strong hands included. When the Button {{t:bet|bets}}, some of the strong hands {{t:raise}} after {{t:check|checking}} (check-raise)."
    count: 3
  - kind: choice
    id: m5.l4.q-oop-why
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Porque faz c-bet com menos frequência {{t:out-of-position}} do que {{t:in-position}}?"
    options:
      - { text: "Porque o adversário {{t:in-position}} vê a sua ação em cada {{t:street|ronda}}, e o {{t:range}} dele depois de {{t:call|pagar}} é forte", correct: true, why: "Sim: um jogador que {{t:call|paga}} com {{t:position|posição}} {{t:fold|desistiu}} das mãos fracas e muitas vezes {{t:raise|aumentou}} com as mais fortes. Restam-lhe mãos médias e boas e, além disso, age em último lugar." }
      - { text: "Porque o c-bet {{t:out-of-position}} é proibido", why: "Não: as regras permitem apostar de qualquer lugar. A questão é que o c-bet {{t:out-of-position}} compensa menos vezes." }
      - { text: "Porque {{t:out-of-position}} tem sempre a mão mais fraca", why: "Não: a sua mão não depende da {{t:position|posição}}. O que muda é a facilidade com que realiza a equity dessa mão." }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "{{t:open|Abriu}} do {{t:cutoff|CO}}, o Button {{t:call|pagou}} e os blinds {{t:fold|desistiram}}. Tem {{t:top-pair|top pair}} com o melhor kicker num flop {{t:dry|seco}}. É o primeiro a agir. O que faz?"
    table: { hand: "Ah Kc", position: CO, board: "As 9h 4c" }
    options:
      - { text: "{{t:check|Passo}} (para {{t:call|pagar}} a {{t:bet|aposta}} do Button)", correct: true, why: "Sim: o Button {{t:call|pagou}} com {{t:position|posição}}, por isso o {{t:range}} dele é forte, e neste flop o solver {{t:out-of-position}} {{t:check|passa}} com quase todo o {{t:range}}, incluindo {{t:top-pair|top pair}} com o melhor kicker. Depois de {{t:check|passar}}, {{t:call|paga}} a {{t:bet|aposta}} do Button." }
      - { text: "C-bet de {{n:cbet.size.small}} do {{t:pot|pote}}", why: "Demasiado frequente: nesta situação o solver aposta em menos de {{n:cbet.oop.a94.bet}} dos casos. Joga o {{t:top-pair|top pair}} com o melhor kicker {{t:check|passando}} e {{t:call|pagando}}." }
      - { text: "C-bet de {{n:cbet.size.big}} do {{t:pot|pote}}", why: "Demasiado frequente: nesta situação o solver aposta em menos de {{n:cbet.oop.a94.bet}} dos casos. Joga o {{t:top-pair|top pair}} com o melhor kicker {{t:check|passando}} e {{t:call|pagando}}." }
      - { text: "{{t:fold|Desisto}}", why: "Ninguém {{t:bet|apostou}} ainda, por isso {{t:fold|desistir}} não traz nada: pode {{t:check|passar}} de graça (regra do módulo 1). Joga esta mão {{t:check|passando}} e {{t:call|pagando}}." }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:open|Abriu}} do {{t:cutoff|CO}} e o Button e o {{t:big-blind}} {{t:call|pagaram}}. No flop, o {{t:big-blind}} {{t:check|passa}} e o Button age depois de si. Tem apenas cartas altas, sem {{t:draw|draw}}. O que faz?"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "Sim: contra dois adversários, uma mão sem {{t:pair|par}} e sem {{t:draw|draw}} raramente ganha o {{t:pot|pote}} com uma {{t:bet|aposta}}. É mais provável que um dos dois tenha acertado neste flop." }
      - { text: "C-bet pequeno, como num jogo um contra um", why: "Contra dois adversários, o {{t:bluff}} tem de superar os dois, e os dois falham ao mesmo tempo muito menos vezes do que um." }
      - { text: "C-bet grande, para afastar os dois", why: "Um {{t:bluff}} grande contra dois adversários arrisca muito, e a probabilidade de ambos {{t:fold|desistirem}} é pequena. Neste flop, têm muitos {{t:pair|pares}} e {{t:draw|draws}}." }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "{{t:open|Abriu}} do {{t:cutoff|CO}} e o Button e o {{t:big-blind}} {{t:call|pagaram}}. O {{t:big-blind}} {{t:check|passa}}. Tem {{t:top-pair|top pair}} com um bom kicker. O que faz?"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "{{t:check|Passo}}", correct: true, why: "Sim: num {{t:pot|pote}} com vários jogadores, num flop {{t:dry|seco}}, o solver {{t:check|passa}} muitas vezes, mesmo com mãos muito fortes, porque dois jogadores que {{t:call|pagaram}} acertaram, em conjunto, mais vezes no flop." }
      - { text: "Aposto por {{t:value|valor}}", why: "Contra dois adversários num flop {{t:dry|seco}}, o solver {{t:check|passa}} mesmo com uma mão muito forte; aposta raramente e pouco, sobretudo quando o flop acerta bem no seu {{t:range}}." }
      - { text: "{{t:fold|Desisto}}", why: "Ninguém {{t:bet|apostou}}, por isso pode {{t:check|passar}} de graça. {{t:fold|Desistir}} seria entregar um {{t:pot|pote}} em que provavelmente vai à frente." }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "Uma mão sem {{t:pair|par}} falha o flop em cerca de {{n:flop.miss.unpaired}} dos casos. Com que frequência falham ao mesmo tempo duas mãos destas (quatro valores diferentes)?"
    options:
      - { text: "Cerca de {{n:flop.miss.two}}", correct: true, why: "Sim: calcula da mesma forma que para uma mão, só que há mais cartas que fazem par: {{n:pair.outs.two-hands}} entre {{n:cards.unseen.two-hands}} desconhecidas (sem contar as suas cartas). A probabilidade de nenhuma das {{n:cards.board.flop}} cartas do flop estar entre elas é de cerca de {{n:flop.miss.two}}: os dois falham em menos de metade dos casos." }
      - { text: "Cerca de {{n:flop.miss.unpaired}}, tal como uma", why: "Não: cada adversário a mais é mais uma probabilidade de alguém ter acertado. A probabilidade de todos falharem diminui com cada jogador." }
      - { text: "Cerca de {{n:flop.hit.unpaired}}", why: "Essa é a probabilidade de uma mão sem {{t:pair|par}} fazer {{t:pair|par}} no flop. A pergunta é sobre ambas falharem." }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Revisão {{t:in-position}}: {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e, no flop, {{t:check|passa}}. Que plano se adequa a este flop?"
    position: BTN
    options:
      check: "{{t:check|Passo}} mais vezes, c-bet menos do que o habitual"
      small: "C-bet frequente e pequeno: {{n:cbet.size.small}} do {{t:pot|pote}} ({{n:cbet.btn.small}})"
      big: "C-bet frequente e grande: {{n:cbet.size.big}} do {{t:pot|pote}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected], oesdPossible: false }
        best: small
        rule: R-M5-007
        why:
          check: "Demasiado cauteloso: num flop {{t:dry|seco}} e alto tem a {{t:range-advantage|vantagem de range}}, e o adversário normalmente falhou. Ao {{t:check|passar}}, dá-lhe uma carta grátis."
          small: "Sim: um flop {{t:dry|seco}} e alto favorece-o. Uma {{t:bet|aposta}} pequena chega para o adversário {{t:fold|desistir}} das mãos fracas, e os {{t:pair|pares}} piores continuam a {{t:call|pagá-la}}."
          big: "Boa ação, tamanho errado: num flop {{t:dry|seco}} o adversário tem poucos {{t:draw|draws}}, e as mãos que falharam também {{t:fold|desistem}} perante uma {{t:bet|aposta}} pequena. Uma {{t:bet|aposta}} maior não faz {{t:fold|desistir}} mais mãos, mas arrisca mais. Aposte cerca de {{n:cbet.size.small}} do {{t:pot|pote}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Sim: um flop baixo com cartas próximas acerta no {{t:range|range}} do {{t:big-blind}}: ele defende muitas mãos com cartas pequenas, e as suas cartas altas falharam aqui. Num flop {{t:connected|conectado}}, ele também tem {{t:straight|sequências}} e {{t:two-pair|dois pares}}, por isso a si normalmente falta {{t:nuts-advantage|vantagem de nuts}}. Faz c-bet menos vezes do que em flops altos: muitas mãos {{t:check|passam}}, e apostam sobretudo as mãos fortes e os {{t:draw|draws}} fortes."
          small: "Demasiado frequente: um flop baixo com cartas próximas acerta no {{t:range|range}} do {{t:big-blind}}, e num flop {{t:connected|conectado}} a si normalmente falta {{t:nuts-advantage|vantagem de nuts}}. C-bets frequentes, mesmo pequenos, dão ao {{t:big-blind}} a oportunidade de {{t:raise|aumentar}} (check-raise) com as mãos mais fortes."
          big: "Demasiado frequente e demasiado caro: este flop acerta no {{t:range|range}} do {{t:big-blind}}, e num flop {{t:connected|conectado}} ele também tem {{t:straight|sequências}} e {{t:two-pair|dois pares}}. Um c-bet grande e frequente arrisca muito quando normalmente só tem cartas altas."
    count: 3
---
Até agora jogou {{t:in-position}} contra um adversário. {{t:out-of-position|Fora de posição}} e contra vários jogadores, faz c-bet menos vezes.

## {{t:out-of-position|Fora de posição}}

Quando {{t:open|abre}} do {{t:cutoff|CO}} e o Button {{t:call|paga}}, depois do flop é o primeiro a agir em cada {{t:street|ronda}}. Além disso, o {{t:range}} do Button é forte: {{t:fold|desistiu}} das mãos fracas e {{t:raise|aumentou}} com parte das mais fortes, por isso restaram-lhe mãos médias e boas. Um {{t:range}} assim, sem as mãos mais fortes e composto sobretudo por mãos médias, é {{t:condensed|condensado}}. Por isso, {{t:out-of-position}} {{t:check|passa}} muito mais vezes, frequentemente com todo o {{t:range}}, também com mãos fortes: joga-as {{t:call|pagando}} ou com check-raise. Aposta sobretudo em flops que favorecem muito fortemente o seu {{t:range}}, p. ex. K-Q-6. {{t:check|Passar}} {{t:out-of-position}} não significa abdicar da mão: muitas destas mãos vão {{t:call|pagar}} a {{t:bet|aposta}} do adversário.

## Contra vários adversários

Cada adversário a mais é mais uma probabilidade de alguém ter acertado no flop. Uma mão sem {{t:pair|par}} falha o flop em cerca de {{n:flop.miss.unpaired}} dos casos, mas duas ao mesmo tempo apenas em cerca de {{n:flop.miss.two}}. O {{t:bluff}} tem de superar todos, por isso, contra vários adversários, abdica sobretudo dos {{t:bluff|bluffs}}. Aposta raramente e pouco, sobretudo em flops que acertam bem no seu {{t:range}}; num flop {{t:dry|seco}}, {{t:check|passa}} muitas vezes mesmo com uma mão muito forte.

:::note De onde vêm estas regras
As regras desta lição vêm de resultados publicados de solvers (c-bet {{t:out-of-position}}, c-bet em flops com ás e em {{t:pot|potes}} com vários jogadores) e de materiais de formação ({{t:pot|potes}} com vários jogadores). São heurísticas: a aplicação não indica frequências em percentagem. A probabilidade de duas mãos falharem ao mesmo tempo é um cálculo exato para duas mãos com quatro valores diferentes; não conta com as suas cartas, tal como o número para uma mão.
:::
