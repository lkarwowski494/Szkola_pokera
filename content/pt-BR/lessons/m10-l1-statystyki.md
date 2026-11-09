---
id: m10.l1
module: m10
order: 1
title: "Estatísticas do HUD"
sub: "O que o VPIP e o PFR medem e quantas mãos são necessárias"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Você está no {{t:big-blind|big blind}}. Dois jogadores dão limp, você dá {{t:check|check}} e vê o flop. Essa mão faz o seu {{t:vpip}} subir?"
    options:
      - { text: "Não: você não colocou voluntariamente nem uma {{t:chips|ficha}}", correct: true, why: "O {{t:vpip}} conta apenas as contribuições voluntárias antes do flop: {{t:call|pagar}} ou {{t:raise|aumentar}}. O {{t:big-blind|big blind}} é uma aposta obrigatória, e o {{t:check|check}} não custa nada." }
      - { text: "Sim: você joga o flop, então a mão conta como jogada", why: "Ver o flop não basta. O {{t:vpip}} só sobe quando você mesmo coloca {{t:chips|fichas}} antes do flop." }
      - { text: "Sim, e também faz o {{t:pfr}} subir", why: "O {{t:pfr}} só sobe com um {{t:raise|aumento}} antes do flop. Aqui ninguém {{t:raise|aumentou}}, e você só deu {{t:check|check}}." }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Um amigo mostra uma anotação: o adversário tem {{t:vpip}} {{n:hud.ex.wrong.vpip}} e {{t:pfr}} {{n:hud.ex.wrong.pfr}}. O que você acha disso?"
    options:
      - { text: "É impossível: o {{t:pfr}} não pode ser maior que o {{t:vpip}}", correct: true, why: "Todo {{t:raise|aumento}} antes do flop também é uma contribuição voluntária, então conta nas duas estatísticas. O {{t:pfr}} é sempre no máximo igual ao {{t:vpip}}; seu amigo confundiu os números." }
      - { text: "É um jogador muito agressivo, que quase nunca {{t:call|paga}}", why: "Um jogador que nunca {{t:call|paga}} tem o {{t:pfr}} igual ao {{t:vpip}}, mas não maior. Um {{t:pfr}} maior indica um erro de registro." }
      - { text: "É um jogador passivo", why: "A passividade aparece quando o {{t:pfr}} é bem menor que o {{t:vpip}}, e não maior." }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "O adversário tem {{t:vpip}} {{n:mda.rec.vpip}} e {{t:pfr}} {{n:mda.rec.pfr}}. O que ele faz com as mãos que joga, mas não {{t:raise|aumenta}}?"
    options:
      - { text: "Ele {{t:call|paga}} ou dá limp: essa é a diferença de {{n:mda.rec.gap}} das mãos", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}. Ele coloca essas mãos no {{t:pot|pote}} sem {{t:raise|aumento}}: dá limp ou {{t:call|paga}} as {{t:open|aberturas}} dos outros." }
      - { text: "Ele {{t:fold|desiste}} delas antes do flop", why: "Mãos em que ele {{t:fold|desistiu}} antes do flop não contam para o {{t:vpip}}. A diferença {{t:vpip}} − {{t:pfr}} são as mãos jogadas sem {{t:raise|aumento}}." }
      - { text: "Ele as joga de {{t:all-in|all-in}}", why: "All-in antes do flop também é um {{t:raise|aumento}}, então faria o {{t:pfr}} subir. A diferença são as mãos em que ele só {{t:call|pagou}} ou deu limp." }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Depois de {{n:hud.se.ex.n}} mãos, o adversário tem {{t:vpip}} {{n:hud.se.ex.p}}. Qual é o erro padrão desse número em pontos percentuais? Digite um número."
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}. Com cerca de {{n:var.conf95}} de confiança, o {{t:vpip}} real fica dentro de ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}}."
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Depois de {{n:hud.se.ex.n}} mãos, o {{t:vpip}} do adversário é {{n:hud.se.ex.p}}. O que você sabe sobre o {{t:vpip}} real dele?"
    options:
      - { text: "Com cerca de {{n:var.conf95}} de confiança, fica entre {{n:hud.ci.ex.low}} e {{n:hud.ci.ex.high}}", correct: true, why: "O erro padrão é de cerca de {{n:hud.se.ex}}, e o intervalo de {{n:var.conf95}} é ± {{n:var.z95}} erros, ou seja, ± {{n:hud.ci.ex}}. Você sabe que o adversário não é extremo, mas ainda não consegue distinguir tipos que diferem por poucos pontos." }
      - { text: "É exatamente {{n:hud.se.ex.p}}", why: "{{n:hud.se.ex.n}} mãos ainda são uma amostra pequena: o erro é de cerca de {{n:hud.se.ex}}, e o intervalo de {{n:var.conf95}} é ± {{n:hud.ci.ex}}." }
      - { text: "Nada: antes de mil mãos, as estatísticas não têm significado", why: "Exagero. O intervalo de {{n:hud.ci.ex.low}} a {{n:hud.ci.ex.high}} já exclui um jogador muito fechado e um muito solto. Só falta precisão." }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "Depois de algumas centenas de mãos, o adversário teve {{n:hud.se.f3b.n}} oportunidades de responder a um 3-bet e {{t:fold|desistiu}} em {{n:hud.se.f3b.p}} delas. O que você sabe sobre o fold to 3-bet dele?"
    options:
      - { text: "Quase nada: com cerca de {{n:var.conf95}} de confiança, fica entre {{n:hud.ci.f3b.low}} e {{n:hud.ci.f3b.high}}", correct: true, why: "O que conta são as oportunidades, não as mãos. O erro é √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}}, e o intervalo de {{n:var.conf95}} é ± {{n:hud.ci.f3b}}. Nesse intervalo cabem tanto um jogador que quase sempre defende quanto um que quase sempre {{t:fold|desiste}}." }
      - { text: "Ele {{t:fold|desiste}} exatamente em {{n:hud.se.f3b.p}} dos casos, porque a amostra tem algumas centenas de mãos", why: "Algumas centenas de mãos são apenas {{n:hud.se.f3b.n}} oportunidades para essa estatística. Você calcula o erro a partir das oportunidades: dá cerca de {{n:hud.se.f3b}}." }
      - { text: "Ele {{t:fold|desiste}} demais, porque acima de {{n:hud.f3b.low}} é um erro", why: "{{n:hud.se.f3b.p}} não está “acima de {{n:hud.f3b.low}}”, e com {{n:hud.se.f3b.n}} oportunidades o erro é de cerca de {{n:hud.se.f3b}}. Com uma amostra assim, você não tira conclusões." }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Adversário novo, {{n:hud.ex.few.hands}} mãos no {{t:hud|HUD}}: {{t:vpip}} {{n:hud.ex.few.vpip}}, {{t:pfr}} {{n:hud.ex.few.pfr}}. Como você joga contra ele?"
    options:
      - { text: "Como contra um jogador desconhecido, seguindo a base; continuo coletando mãos", correct: true, why: "Abaixo de cerca de {{n:hud.hands.random}} mãos, as estatísticas são aleatórias: algumas cartas boas seguidas produzem um {{t:vpip}} assim. O tipo de jogador aparece de forma aproximada depois de cerca de {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} mãos, e o {{t:vpip}} e o {{t:pfr}} se estabilizam depois de cerca de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "Como contra um {{t:maniac|maníaco}}: {{t:call|pago}} com muitas mãos", why: "O {{t:maniac|maníaco}}, ou seja, um jogador muito solto e agressivo, é só uma das possibilidades: depois de {{n:hud.ex.few.hands}} mãos, pode ser qualquer tipo. {{t:call|Pagar}} com muitas mãos com base no acaso tem um custo quando o adversário se revela um {{t:regular|regular}} comum, ou seja, um frequentador assíduo que joga de forma razoavelmente sólida." }
      - { text: "Como contra um {{t:nit|nit}}, porque a maioria dos jogadores são {{t:nit|nits}}", why: "Isso você também não sabe: o {{t:nit}}, ou seja, um jogador muito fechado, é só um dos tipos. Sem amostra não há leitura, então você volta à base." }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Qual estatística precisa de mais mãos para ser confiável?"
    options:
      - { text: "Fold to 3-bet", correct: true, why: "A oportunidade para o fold to 3-bet só aparece quando o adversário {{t:open|abriu}} e recebeu um 3-bet, ou seja, raramente. Por isso você precisa de cerca de {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} mãos em vez de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "{{t:vpip}}", why: "O {{t:vpip}} tem oportunidade em toda mão, então se estabiliza mais rápido: depois de cerca de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mãos." }
      - { text: "{{t:pfr}}", why: "O {{t:pfr}}, como o {{t:vpip}}, tem oportunidade em toda mão em que o jogador pode {{t:raise|aumentar}}, então se estabiliza rápido." }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "O seu site proíbe programas de {{t:hud|HUD}} na mesa. O que você faz?"
    options:
      - { text: "Jogo sem {{t:hud|HUD}} e, depois da {{t:session|sessão}}, reviso minha base de mãos e as anotações sobre adversários frequentes", correct: true, why: "O regulamento do site é obrigatório: um programa proibido pode levar ao fechamento da conta. Você pode revisar as estatísticas do seu próprio histórico de mãos depois de jogar, e alguns sites mostram estatísticas próprias na mesa." }
      - { text: "Uso o {{t:hud|HUD}} mesmo com a proibição, porque dá vantagem", why: "Por violar o regulamento, o site pode fechar sua conta e reter seus fundos. A vantagem não vale isso." }
      - { text: "Abro mão da {{t:exploit|exploração}}, porque sem {{t:hud|HUD}} não dá para fazê-la", why: "Dá, sim: leituras da revisão de mãos depois da {{t:session|sessão}} e dados sobre a população do seu {{t:stakes|limite}} também mostram para que lado se afastar da base." }
---
A {{t:exploit|exploração}} é o afastamento da base dos módulos 3–9 na direção do erro do adversário. Para saber para que lado se afastar, você precisa de dados. Online, quem os fornece é o {{t:hud}}: um programa que registra as mãos e mostra as estatísticas de cada adversário na mesa.

## {{t:vpip}} e {{t:pfr}}

Os dois números mais importantes descrevem o jogo antes do flop:

- **{{t:vpip}}**: em que porcentagem das mãos o jogador coloca voluntariamente {{t:chips|fichas}} no {{t:pot|pote}} antes do flop, ou seja, {{t:call|paga}} ou {{t:raise|aumenta}}. Os blinds não contam, porque são obrigatórios.
- **{{t:pfr}}**: em que porcentagem das mãos o jogador {{t:raise|aumenta}} antes do flop: {{t:open|abre}}, dá 3-bet ou dá 4-bet.

Todo {{t:raise|aumento}} também é uma contribuição voluntária, então o {{t:pfr}} nunca ultrapassa o {{t:vpip}}. A diferença {{t:vpip}} − {{t:pfr}} são as mãos em que o jogador só {{t:call|pagou}} ou deu limp. Um jogador com {{t:vpip}} {{n:mda.rec.vpip}} e {{t:pfr}} {{n:mda.rec.pfr}} joga muitas mãos, mas em {{n:mda.rec.gap}} de todas as mãos entra no {{t:pot|pote}} sem {{t:raise|aumento}}.

## Outras estatísticas

| Estatística | O que mede | Oportunidade |
|---|---|---|
| 3-bet | com que frequência ele {{t:raise|aumenta}} a {{t:open|abertura}} de outro jogador | alguém antes dele {{t:open|abriu}} |
| Fold to 3-bet | com que frequência ele {{t:fold|desiste}} diante de um 3-bet | ele {{t:open|abriu}} e recebeu um 3-bet |
| C-bet | com que frequência ele aposta no flop depois do próprio {{t:raise|aumento}} | ele foi o {{t:aggressor|agressor}} antes do flop |
| Fold to c-bet | com que frequência ele {{t:fold|desiste}} diante de um c-bet | ele recebeu um c-bet |
| {{t:wtsd}} | com que frequência ele chega ao showdown depois do flop | ele viu o flop |

A última coluna é importante: a estatística só muda quando o adversário tem uma oportunidade. O {{t:vpip}} tem oportunidade em toda mão, e o fold to 3-bet só quando o adversário {{t:open|abriu}} e recebeu um 3-bet.

## Quantas mãos são necessárias

Cada mão é uma amostra aleatória da estratégia do adversário, então a estatística tem um erro, como qualquer média de amostra. Você o calcula com a fórmula do erro da média de uma amostra (no módulo 12, você vai usar a mesma fórmula para calcular o erro do {{t:winrate}}):

```formula
erro = √(p × (1 − p) ÷ n)
intervalo de {{n:var.conf95}} = p ± {{n:var.z95}} × erro
```

Aqui p é a porcentagem (por exemplo, o {{t:vpip}}), e n é o número de oportunidades. Depois de {{n:hud.se.ex.n}} mãos com {{t:vpip}} {{n:hud.se.ex.p}}, o erro é de cerca de {{n:hud.se.ex}}, então, com cerca de {{n:var.conf95}} de confiança, o {{t:vpip}} real fica entre **{{n:hud.ci.ex.low}} e {{n:hud.ci.ex.high}}**. Um fold to 3-bet de {{n:hud.se.f3b.p}} em {{n:hud.se.f3b.n}} oportunidades dá um intervalo de {{n:hud.ci.f3b.low}} a {{n:hud.ci.f3b.high}}: quase nada.

Os treinadores indicam limiares parecidos:

- abaixo de cerca de {{n:hud.hands.random}} mãos, as estatísticas são aleatórias; você joga como contra um jogador desconhecido;
- o tipo de jogador aparece de forma aproximada depois de {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} mãos, e o {{t:vpip}} e o {{t:pfr}} se estabilizam depois de cerca de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}};
- o 3-bet precisa de cerca de {{n:hud.hands.3bet.overall.low}}–{{n:hud.hands.3bet.high}} mãos, o fold to 3-bet de cerca de {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}}, e as estatísticas de turn e river de ainda mais.

:::note Quando o site proíbe o {{t:hud|HUD}}
Alguns sites (segundo materiais de treinamento, inclusive grandes sites nos {{t:stakes|limites}} baixos) proíbem programas de {{t:hud|HUD}} na mesa. Nesse caso, você revisa o seu próprio histórico de mãos depois da {{t:session|sessão}}, faz anotações sobre adversários frequentes e usa dados sobre a população do seu {{t:stakes|limite}} (lição 2). Os limiares de amostra vêm de dois materiais de treinamento, que indicam números de mãos diferentes. A fórmula do erro é um cálculo.
:::
