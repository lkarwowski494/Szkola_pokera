---
id: m10.l1
module: m10
order: 1
title: "Estatísticas do HUD"
sub: "O que medem o VPIP e o PFR e quantas mãos são necessárias"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Está no {{t:big-blind|big blind}}. Dois jogadores fazem limp; {{t:check|passa}} e vê o flop. Esta mão faz subir o seu {{t:vpip}}?"
    options:
      - { text: "Não: não colocou voluntariamente uma única {{t:chips|ficha}}", correct: true, why: "O {{t:vpip}} conta apenas as entradas voluntárias antes do flop: {{t:call|pagar}} ou {{t:raise|aumentar}}. O {{t:big-blind|big blind}} é uma entrada obrigatória e {{t:check|passar}} não custa nada." }
      - { text: "Sim: joga o flop, portanto a mão conta como jogada", why: "Ver o flop não basta. O {{t:vpip}} só sobe quando coloca {{t:chips|fichas}} por iniciativa própria antes do flop." }
      - { text: "Sim, e também faz subir o {{t:pfr}}", why: "O {{t:pfr}} só sobe com um {{t:raise|aumento}} antes do flop. Aqui ninguém {{t:raise|aumentou}}; quanto a si, limitou-se a {{t:check|passar}}." }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Um colega mostra-lhe uma nota: um adversário tem {{t:vpip}} {{n:hud.ex.wrong.vpip}} e {{t:pfr}} {{n:hud.ex.wrong.pfr}}. O que pensa disto?"
    options:
      - { text: "É impossível: o {{t:pfr}} não pode ser maior do que o {{t:vpip}}", correct: true, why: "Cada {{t:raise|aumento}} antes do flop é também uma entrada voluntária, por isso conta nas duas estatísticas. O {{t:pfr}} é sempre, no máximo, igual ao {{t:vpip}}; o colega trocou os números." }
      - { text: "É um jogador muito agressivo que quase nunca {{t:call|paga}}", why: "Um jogador que nunca {{t:call|paga}} tem o {{t:pfr}} igual ao {{t:vpip}}, mas não maior. Um {{t:pfr}} maior indica um erro de registo." }
      - { text: "É um jogador passivo", why: "A passividade nota-se quando o {{t:pfr}} é muito menor do que o {{t:vpip}}, e não maior." }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Um adversário tem {{t:vpip}} {{n:mda.rec.vpip}} e {{t:pfr}} {{n:mda.rec.pfr}}. O que faz com as mãos que joga, mas em que não {{t:raise|aumenta}}?"
    options:
      - { text: "{{t:call|Paga}} ou faz limp: é a diferença de {{n:mda.rec.gap}} das mãos", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}. Estas mãos entram no {{t:pot|pote}} sem {{t:raise|aumento}}: faz limp ou {{t:call|paga}} as {{t:open|aberturas}} dos outros." }
      - { text: "{{t:fold|Desiste}} delas antes do flop", why: "As mãos em que desiste antes do flop não contam de todo para o {{t:vpip}}. A diferença {{t:vpip}} − {{t:pfr}} corresponde às mãos jogadas sem {{t:raise|aumento}}." }
      - { text: "Joga-as em {{t:all-in|all-in}}", why: "Um all-in antes do flop é também um {{t:raise|aumento}}, portanto faria subir o {{t:pfr}}. A diferença são as mãos em que apenas {{t:call|pagou}} ou fez limp." }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Após {{n:hud.se.ex.n}} mãos, um adversário tem {{t:vpip}} {{n:hud.se.ex.p}}. Qual é o erro padrão deste número, em pontos percentuais? Introduza um número."
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}. Com cerca de {{n:var.conf95}} de confiança, o {{t:vpip}} real situa-se dentro de ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}}."
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Após {{n:hud.se.ex.n}} mãos, o {{t:vpip}} de um adversário é de {{n:hud.se.ex.p}}. O que sabe sobre o {{t:vpip}} real deste adversário?"
    options:
      - { text: "Com cerca de {{n:var.conf95}} de confiança, situa-se entre {{n:hud.ci.ex.low}} e {{n:hud.ci.ex.high}}", correct: true, why: "O erro padrão é de cerca de {{n:hud.se.ex}} e o intervalo de {{n:var.conf95}} corresponde a ± {{n:var.z95}} erros, ou seja, ± {{n:hud.ci.ex}}. Sabe que o adversário não é extremo, mas ainda não consegue distinguir tipos que diferem em poucos pontos." }
      - { text: "É exatamente {{n:hud.se.ex.p}}", why: "{{n:hud.se.ex.n}} mãos ainda são uma amostra pequena: o erro é de cerca de {{n:hud.se.ex}} e o intervalo de {{n:var.conf95}} é de ± {{n:hud.ci.ex}}." }
      - { text: "Nada: antes de mil mãos, as estatísticas não têm significado", why: "É um exagero. Um intervalo de {{n:hud.ci.ex.low}} a {{n:hud.ci.ex.high}} já exclui um jogador muito apertado e um jogador muito solto. Falta apenas precisão." }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "Após algumas centenas de mãos, um adversário teve {{n:hud.se.f3b.n}} oportunidades de responder a um 3-bet e {{t:fold|desistiu}} em {{n:hud.se.f3b.p}} delas. O que sabe sobre o fold to 3-bet deste adversário?"
    options:
      - { text: "Quase nada: com cerca de {{n:var.conf95}} de confiança, situa-se entre {{n:hud.ci.f3b.low}} e {{n:hud.ci.f3b.high}}", correct: true, why: "Contam as oportunidades, não as mãos. O erro é √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}} e o intervalo de {{n:var.conf95}} é de ± {{n:hud.ci.f3b}}. Neste intervalo cabe tanto um jogador que quase sempre defende como um que quase sempre {{t:fold|desiste}}." }
      - { text: "{{t:fold|Desiste}} exatamente em {{n:hud.se.f3b.p}} dos casos, porque a amostra tem algumas centenas de mãos", why: "Algumas centenas de mãos são apenas {{n:hud.se.f3b.n}} oportunidades para esta estatística. O erro calcula-se a partir das oportunidades: dá cerca de {{n:hud.se.f3b}}." }
      - { text: "{{t:fold|Desiste}} demasiadas vezes, porque acima de {{n:hud.f3b.low}} é um erro", why: "{{n:hud.se.f3b.p}} não está «acima de {{n:hud.f3b.low}}» e, com {{n:hud.se.f3b.n}} oportunidades, o erro é de cerca de {{n:hud.se.f3b}}. Com uma amostra destas não se pode tirar conclusões." }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Um adversário novo, {{n:hud.ex.few.hands}} mãos no {{t:hud|HUD}}: {{t:vpip}} {{n:hud.ex.few.vpip}}, {{t:pfr}} {{n:hud.ex.few.pfr}}. Como joga contra ele?"
    options:
      - { text: "Como contra um jogador desconhecido, segundo a estratégia base; continuo a recolher mãos", correct: true, why: "Abaixo de cerca de {{n:hud.hands.random}} mãos, as estatísticas são aleatórias: algumas boas cartas seguidas dão um {{t:vpip}} assim. O tipo de jogador vê-se aproximadamente a partir de cerca de {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} mãos, e o {{t:vpip}} e o {{t:pfr}} estabilizam a partir de cerca de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "Como contra um {{t:maniac|maníaco}}: {{t:call|pago}} com muitas mãos", why: "Um {{t:maniac|maníaco}}, ou seja, um jogador muito solto e agressivo, é apenas uma das possibilidades: após {{n:hud.ex.few.hands}} mãos, pode ser qualquer tipo. {{t:call|Pagar}} com muitas mãos com base no acaso sai caro quando o adversário se revela um {{t:regular|regular}} comum, ou seja, um frequentador habitual que joga de forma razoavelmente sólida." }
      - { text: "Como contra um {{t:nit}}, porque a maioria dos jogadores são nits", why: "Também não sabe isso: um {{t:nit}}, ou seja, um jogador muito apertado, é apenas um dos tipos. Sem amostra não há leitura, por isso volta à estratégia base." }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Que estatística precisa de mais mãos para ser fiável?"
    options:
      - { text: "Fold to 3-bet", correct: true, why: "A oportunidade para o fold to 3-bet só surge quando o adversário {{t:open|abriu}} e recebeu um 3-bet, o que é raro. Por isso, precisa de cerca de {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} mãos em vez de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "{{t:vpip}}", why: "O {{t:vpip}} tem oportunidade em todas as mãos, por isso é o que estabiliza mais depressa: a partir de cerca de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mãos." }
      - { text: "{{t:pfr}}", why: "O {{t:pfr}}, tal como o {{t:vpip}}, tem oportunidade em todas as mãos em que o jogador pode {{t:raise|aumentar}}, por isso estabiliza depressa." }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "A sua sala proíbe programas com {{t:hud|HUD}} na mesa. O que faz?"
    options:
      - { text: "Jogo sem {{t:hud|HUD}} e, depois da {{t:session|sessão}}, revejo a minha base de dados de mãos e as notas sobre adversários habituais", correct: true, why: "O regulamento da sala é vinculativo: um programa proibido pode levar ao encerramento da conta. Pode rever as estatísticas do seu próprio histórico de mãos depois de jogar, e algumas salas mostram estatísticas próprias na mesa." }
      - { text: "Uso o {{t:hud|HUD}} apesar da proibição, porque dá vantagem", why: "Por violar o regulamento, a sala pode encerrar a conta e reter os fundos. A vantagem não compensa." }
      - { text: "Desisto da {{t:exploit|exploração}}, porque sem {{t:hud|HUD}} não é possível fazê-la", why: "É possível: as leituras feitas na revisão de mãos depois da {{t:session|sessão}} e os dados sobre a população do seu {{t:stakes|limite}} também mostram em que direção se afastar da estratégia base." }
---
A {{t:exploit|exploração}} é um desvio da estratégia base dos módulos 3–9 na direção do erro do adversário. Para saber em que direção se desviar, precisa de dados. Online, fornece-os o {{t:hud}}: um programa que regista as mãos e mostra as estatísticas de cada adversário na mesa.

## {{t:vpip}} e {{t:pfr}}

Os dois números mais importantes descrevem o jogo antes do flop:

- **{{t:vpip}}**: em que percentagem das mãos o jogador coloca voluntariamente {{t:chips|fichas}} no {{t:pot|pote}} antes do flop, ou seja, {{t:call|paga}} ou {{t:raise|aumenta}}. As blinds não contam, porque são obrigatórias.
- **{{t:pfr}}**: em que percentagem das mãos o jogador {{t:raise|aumenta}} antes do flop: {{t:open|abre}}, faz 3-bet ou faz 4-bet.

Cada {{t:raise|aumento}} é também uma entrada voluntária, por isso o {{t:pfr}} nunca ultrapassa o {{t:vpip}}. A diferença {{t:vpip}} − {{t:pfr}} corresponde às mãos em que o jogador apenas {{t:call|pagou}} ou fez limp. Um jogador com {{t:vpip}} {{n:mda.rec.vpip}} e {{t:pfr}} {{n:mda.rec.pfr}} joga muitas mãos, mas em {{n:mda.rec.gap}} de todas as mãos entra no {{t:pot|pote}} sem {{t:raise|aumento}}.

## Outras estatísticas

| Estatística | O que mede | Oportunidade |
|---|---|---|
| 3-bet | com que frequência {{t:raise|aumenta}} a {{t:open|abertura}} de outro jogador | alguém antes dele {{t:open|abriu}} |
| Fold to 3-bet | com que frequência {{t:fold|desiste}} perante um 3-bet | {{t:open|abriu}} e recebeu um 3-bet |
| C-bet | com que frequência aposta no flop após o seu próprio {{t:raise|aumento}} | foi o {{t:aggressor|agressor}} antes do flop |
| Fold to c-bet | com que frequência {{t:fold|desiste}} perante um c-bet | recebeu um c-bet |
| {{t:wtsd}} | com que frequência chega ao showdown depois do flop | viu o flop |

A última coluna é importante: a estatística só muda quando o adversário tem uma oportunidade. O {{t:vpip}} tem oportunidade em todas as mãos, enquanto o fold to 3-bet só a tem quando o adversário {{t:open|abriu}} e recebeu um 3-bet.

## Quantas mãos são necessárias

Cada mão é uma amostra aleatória da estratégia do adversário, por isso a estatística tem um erro, como qualquer média de uma amostra. Calcula-se com a fórmula do erro da média de uma amostra (no módulo 12, usará a mesma fórmula para calcular o erro do {{t:winrate}}):

```formula
erro = √(p × (1 − p) ÷ n)
intervalo de {{n:var.conf95}} = p ± {{n:var.z95}} × erro
```

Aqui, p é a percentagem (p. ex., o {{t:vpip}}) e n é o número de oportunidades. Após {{n:hud.se.ex.n}} mãos com {{t:vpip}} {{n:hud.se.ex.p}}, o erro é de cerca de {{n:hud.se.ex}}, por isso, com cerca de {{n:var.conf95}} de confiança, o {{t:vpip}} real situa-se entre **{{n:hud.ci.ex.low}} e {{n:hud.ci.ex.high}}**. Um fold to 3-bet de {{n:hud.se.f3b.p}} em {{n:hud.se.f3b.n}} oportunidades dá um intervalo de {{n:hud.ci.f3b.low}} a {{n:hud.ci.f3b.high}}: quase nada.

Os treinadores indicam limiares semelhantes:

- abaixo de cerca de {{n:hud.hands.random}} mãos, as estatísticas são aleatórias; joga-se como contra um jogador desconhecido;
- o tipo de jogador vê-se aproximadamente a partir de {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} mãos, e o {{t:vpip}} e o {{t:pfr}} estabilizam a partir de cerca de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}};
- o 3-bet precisa de cerca de {{n:hud.hands.3bet.overall.low}}–{{n:hud.hands.3bet.high}} mãos, o fold to 3-bet de cerca de {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}}, e as estatísticas do turn e do river de ainda mais.

:::note Quando a sala proíbe o {{t:hud|HUD}}
Algumas salas (segundo os materiais de formação, incluindo grandes salas nos {{t:stakes|limites}} baixos) proíbem programas com {{t:hud|HUD}} na mesa. Nesse caso, revê o seu próprio histórico de mãos depois da {{t:session|sessão}}, toma notas sobre os adversários habituais e usa os dados sobre a população do seu {{t:stakes|limite}} (lição 2). Os limiares de amostra provêm de dois materiais de formação que indicam números de mãos diferentes. A fórmula do erro é um cálculo.
:::
