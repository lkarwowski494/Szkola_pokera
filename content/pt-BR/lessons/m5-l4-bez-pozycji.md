---
id: m5.l4
module: m5
order: 4
title: "Fora de posição e contra vários adversários"
sub: "Quando dar check com mais frequência"
rules: [R-M5-012, R-M5-013]
drills:
  - kind: choice
    id: m5.l4.q-oop-plan
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Você {{t:open|abriu}} do {{t:cutoff|CO}}, o Button {{t:call|pagou}} e os blinds {{t:fold|desistiram}}. O flop é médio e {{t:connected|conectado}}. Você age primeiro. Que plano combina com essa situação?"
    table: { position: CO, board: "Jd 9s 8c" }
    options:
      - { text: "Dou {{t:check|check}} com mais frequência do que {{t:in-position}}", correct: true, why: "Sim: o Button {{t:call|pagou}} com {{t:position|posição}}, então tem um {{t:range}} forte, e um flop médio e {{t:connected|conectado}} acerta bem os {{t:pair|pares}} e {{t:connectors|conectores}} dele. {{t:out-of-position|Fora de posição}}, você dá {{t:check}} aqui com muita frequência, mesmo com mãos fortes." }
      - { text: "C-bet frequente e pequeno, como no Button", why: "Esse é o plano {{t:in-position}} em um flop {{t:dry|seco}} e alto. Aqui você não tem {{t:position|posição}}, e o flop não favorece o seu {{t:range}}." }
      - { text: "C-bet com todas as mãos para não perder a {{t:initiative|iniciativa}}", why: "A {{t:initiative|iniciativa}} não ganha sozinha: o {{t:range}} do Button é forte aqui, e, depois de cada {{t:bet|aposta}}, você também age primeiro no turn e no river." }
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
    prompt: "Por que você dá c-bet com menos frequência {{t:out-of-position}} do que {{t:in-position}}?"
    options:
      - { text: "Porque o adversário {{t:in-position}} vê a sua ação em cada {{t:street}}, e o {{t:range}} dele depois de {{t:call|pagar}} é forte", correct: true, why: "Sim: o jogador que {{t:call|paga}} com {{t:position|posição}} {{t:fold|desistiu}} das mãos fracas e muitas vezes {{t:raise|aumentou}} com as mais fortes. Sobram para ele mãos médias e boas, e ainda por cima ele age por último." }
      - { text: "Porque o c-bet {{t:out-of-position}} é proibido", why: "Não: as regras permitem apostar de qualquer lugar. A questão é que o c-bet {{t:out-of-position}} compensa com menos frequência." }
      - { text: "Porque {{t:out-of-position}} você sempre tem a mão mais fraca", why: "Não: a sua mão não depende da {{t:position|posição}}. O que muda é a facilidade de realizar a equity dela." }
  - kind: choice
    id: m5.l4.q-oop-strong
    family: m5.cbet.oop
    rules: [R-M5-012]
    prompt: "Você {{t:open|abriu}} do {{t:cutoff|CO}}, o Button {{t:call|pagou}} e os blinds {{t:fold|desistiram}}. Você tem {{t:top-pair}} com o melhor kicker em um flop {{t:dry|seco}}. Você age primeiro. O que você faz?"
    table: { hand: "Ah Kc", position: CO, board: "As 9h 4c" }
    options:
      - { text: "Dou {{t:check|check}} (para {{t:call|pagar}} a {{t:bet|aposta}} do Button)", correct: true, why: "Sim: o Button {{t:call|pagou}} com {{t:position|posição}}, então o {{t:range}} dele é forte, e neste flop o solver {{t:out-of-position}} dá {{t:check}} com quase todo o {{t:range}}, inclusive com {{t:top-pair}} com o melhor kicker. Depois de dar {{t:check}}, você {{t:call|paga}} a {{t:bet|aposta}} do Button." }
      - { text: "C-bet de {{n:cbet.size.small}} do {{t:pot|pote}}", why: "Frequente demais: nesta situação o solver aposta em menos de {{n:cbet.oop.a94.bet}} dos casos. Você joga {{t:top-pair}} com o melhor kicker dando {{t:check}} e {{t:call|pagando}}." }
      - { text: "C-bet de {{n:cbet.size.big}} do {{t:pot|pote}}", why: "Frequente demais: nesta situação o solver aposta em menos de {{n:cbet.oop.a94.bet}} dos casos. Você joga {{t:top-pair}} com o melhor kicker dando {{t:check}} e {{t:call|pagando}}." }
      - { text: "{{t:fold|Desisto}}", why: "Ninguém {{t:bet|apostou}} ainda, então {{t:fold|desistir}} não traz nada: você pode dar {{t:check}} de graça (regra do módulo 1). Você joga esta mão dando {{t:check}} e {{t:call|pagando}}." }
  - kind: choice
    id: m5.l4.q-multi
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "Você {{t:open|abriu}} do {{t:cutoff|CO}}, e o Button e o {{t:big-blind}} {{t:call|pagaram}}. No flop, o {{t:big-blind}} dá {{t:check}}, e o Button age depois de você. Você tem só cartas altas, sem {{t:draw}}. O que você faz?"
    table: { hand: "Ad Qc", position: CO, board: "9h 7h 4s" }
    options:
      - { text: "Dou {{t:check|check}}", correct: true, why: "Sim: contra dois adversários, uma mão sem {{t:pair|par}} e sem {{t:draw}} raramente ganha o {{t:pot|pote}} com uma {{t:bet|aposta}}. É mais provável que um dos dois tenha acertado este flop." }
      - { text: "C-bet pequeno, como no heads-up", why: "Contra dois adversários, o {{t:bluff|blefe}} precisa passar pelos dois, e os dois erram ao mesmo tempo com muito menos frequência do que um só." }
      - { text: "C-bet grande para tirar os dois da mão", why: "Um {{t:bluff|blefe}} grande contra dois adversários arrisca muito, e a chance de os dois {{t:fold|desistirem}} é pequena. Neste flop eles têm muitos {{t:pair|pares}} e {{t:draw|draws}}." }
  - kind: choice
    id: m5.l4.q-multi-value
    family: m5.cbet.multi
    rules: [R-M5-013]
    prompt: "Você {{t:open|abriu}} do {{t:cutoff|CO}}, e o Button e o {{t:big-blind}} {{t:call|pagaram}}. O {{t:big-blind|big blind}} dá {{t:check}}. Você tem {{t:top-pair}} com um bom kicker. O que você faz?"
    table: { hand: "Kd Qd", position: CO, board: "Ks 8c 3h" }
    options:
      - { text: "Dou {{t:check|check}}", correct: true, why: "Sim: em um {{t:pot|pote}} multiway em flop {{t:dry|seco}}, o solver dá {{t:check}} com muita frequência, mesmo com mãos muito fortes, porque dois jogadores que {{t:call|pagaram}}, juntos, acertaram o flop com mais frequência." }
      - { text: "Aposto por {{t:value|valor}}", why: "Contra dois adversários em flop {{t:dry|seco}}, o solver dá {{t:check}} mesmo com uma mão muito forte; você aposta raramente e pouco, principalmente quando o flop acerta bem o seu {{t:range}}." }
      - { text: "{{t:fold|Desisto}}", why: "Ninguém {{t:bet|apostou}}, então você pode dar {{t:check}} de graça. {{t:fold|Desistir}} seria entregar um {{t:pot|pote}} em que você provavelmente está na frente." }
  - kind: choice
    id: m5.l4.q-multi-math
    family: m5.cbet.multi
    rules: [R-M5-013, R-M5-006]
    prompt: "Uma mão sem {{t:pair|par}} erra o flop em cerca de {{n:flop.miss.unpaired}} dos casos. Com que frequência duas mãos assim (quatro valores diferentes) erram ao mesmo tempo?"
    options:
      - { text: "Cerca de {{n:flop.miss.two}}", correct: true, why: "Sim: a conta é a mesma que para uma mão, só que há mais cartas que formam par: {{n:pair.outs.two-hands}} entre {{n:cards.unseen.two-hands}} cartas desconhecidas (sem contar as suas). A chance de nenhuma das {{n:cards.board.flop}} cartas do flop estar entre elas é de cerca de {{n:flop.miss.two}}: os dois erram em menos da metade dos casos." }
      - { text: "Cerca de {{n:flop.miss.unpaired}}, igual a uma só", why: "Não: cada adversário a mais é mais uma chance de alguém ter acertado. A chance de todos errarem diminui a cada jogador." }
      - { text: "Cerca de {{n:flop.hit.unpaired}}", why: "Essa é a chance de uma mão sem {{t:pair|par}} formar {{t:pair|par}} no flop. A pergunta é sobre as duas errarem." }
  - kind: cbet
    id: m5.l4.c-review
    family: m5.cbet.btn-vs-bb
    rules: [R-M5-007, R-M5-009, R-M5-004]
    prompt: "Revisão {{t:in-position}}: você {{t:open|abriu}} do Button, o {{t:big-blind}} {{t:call|pagou}} e dá {{t:check}} no flop. Que plano combina com este flop?"
    position: BTN
    options:
      check: "Dou {{t:check}} com mais frequência, c-bet menos que o normal"
      small: "C-bet frequente e pequeno: {{n:cbet.size.small}} do {{t:pot|pote}} ({{n:cbet.btn.small}})"
      big: "C-bet frequente e grande: {{n:cbet.size.big}} do {{t:pot|pote}} ({{n:cbet.btn.big}})"
    cases:
      - when: { height: [high], suits: [rainbow], ranks: [disconnected, semi-connected], oesdPossible: false }
        best: small
        rule: R-M5-007
        why:
          check: "Cauteloso demais: em um flop {{t:dry|seco}} e alto, você tem {{t:range-advantage|vantagem de range}}, e o adversário geralmente errou. Ao dar {{t:check}}, você dá a ele uma carta grátis."
          small: "Sim: um flop {{t:dry|seco}} e alto favorece você. Uma {{t:bet|aposta}} pequena basta para o adversário {{t:fold|desistir}} das mãos fracas, e {{t:pair|pares}} piores ainda vão {{t:call|pagá-la}}."
          big: "Ação certa, tamanho errado: em um flop {{t:dry|seco}}, o adversário tem poucos {{t:draw|draws}}, e as mãos que erraram também vão {{t:fold|desistir}} diante de uma {{t:bet|aposta}} pequena. Uma {{t:bet|aposta}} maior não faz mais mãos {{t:fold|desistirem}}, mas arrisca mais. Aposte cerca de {{n:cbet.size.small}} do {{t:pot|pote}}."
      - when: { height: [low], suits: [rainbow, two-tone], ranks: [connected, semi-connected] }
        best: check
        rule: R-M5-004
        why:
          check: "Sim: um flop baixo com cartas próximas acerta o {{t:range|range}} do {{t:big-blind}}: ele defende muitas mãos com cartas baixas, e suas cartas altas erraram aqui. Em um flop {{t:connected|conectado}}, ele também tem {{t:straight|sequências}} e {{t:two-pair|dois pares}}, então geralmente você não tem {{t:nuts-advantage|vantagem de nuts}}. Você dá c-bet com menos frequência do que em flops altos: muitas mãos dão {{t:check}}, e apostam principalmente as mãos fortes e os {{t:draw|draws}} fortes."
          small: "Frequente demais: um flop baixo com cartas próximas acerta o {{t:range|range}} do {{t:big-blind}}, e em um flop {{t:connected|conectado}} geralmente você não tem {{t:nuts-advantage|vantagem de nuts}}. C-bets frequentes, mesmo pequenos, dão ao {{t:big-blind}} a chance de {{t:raise|aumentar}} (check-raise) com as mãos mais fortes."
          big: "Frequente e caro demais: este flop acerta o {{t:range|range}} do {{t:big-blind}}, e em um flop {{t:connected|conectado}} ele também tem {{t:straight|sequências}} e {{t:two-pair|dois pares}}. Um c-bet grande e frequente arrisca muito quando você mesmo geralmente tem só cartas altas."
    count: 3
---
Até agora você jogou {{t:in-position}} contra um adversário. {{t:out-of-position|Fora de posição}} e contra vários jogadores, você dá c-bet com menos frequência.

## {{t:out-of-position|Fora de posição}}

Quando você {{t:open|abre}} do {{t:cutoff|CO}} e o Button {{t:call|paga}}, depois do flop você age primeiro em cada {{t:street}}. Além disso, o {{t:range}} do Button é forte: ele {{t:fold|desistiu}} das mãos fracas e {{t:raise|aumentou}} com parte das mais fortes, então sobraram para ele mãos médias e boas. Um {{t:range}} assim, sem as mãos mais fortes e formado principalmente por mãos médias, é {{t:condensed|condensado}}. Por isso, {{t:out-of-position}} você dá {{t:check}} com muito mais frequência, muitas vezes com todo o {{t:range}}, inclusive com mãos fortes: você vai jogá-las {{t:call|pagando}} ou com check-raise. Você aposta principalmente em flops que favorecem muito o seu {{t:range}}, por exemplo K-Q-6. Dar {{t:check}} {{t:out-of-position}} não significa abandonar a mão: muitas dessas mãos vão {{t:call|pagar}} a {{t:bet|aposta}} do adversário.

## Contra vários adversários

Cada adversário a mais é mais uma chance de alguém ter acertado o flop. Uma mão sem {{t:pair|par}} erra o flop em cerca de {{n:flop.miss.unpaired}} dos casos, mas duas ao mesmo tempo, em apenas cerca de {{n:flop.miss.two}}. O {{t:bluff|blefe}} precisa passar por todos, então, contra vários adversários, você abre mão principalmente dos {{t:bluff|blefes}}. Você aposta raramente e pouco, principalmente em flops que acertam bem o seu {{t:range}}; em um flop {{t:dry|seco}}, você muitas vezes dá {{t:check}} mesmo com uma mão muito forte.

:::note De onde vêm estas regras
As regras desta lição vêm de resultados de solvers publicados (c-bet {{t:out-of-position}}, c-bet em flop com ás e em {{t:pot|pote}} multiway) e de materiais de treinamento ({{t:pot}} multiway). São heurísticas: o app não informa frequências em porcentagem. A chance de duas mãos errarem ao mesmo tempo é um cálculo exato para duas mãos com quatro valores diferentes; ele não considera as suas cartas, assim como o número para uma mão.
:::
