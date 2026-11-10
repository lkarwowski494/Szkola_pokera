---
id: m10.l3
module: m10
order: 3
title: "Afastamento da base"
sub: "Com que mãos e até que ponto"
rules: [R-M10-009, R-M10-010, R-M10-011, R-M10-012]
drills:
  - kind: choice
    id: m10.l3.q-mixed-first
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Sabe que, nesta linha, o adversário faz {{t:bluff|bluff}} um pouco mais vezes do que em equilíbrio. Com que mãos altera primeiro a decisão?"
    options:
      - { text: "Com as mãos que na base misturam {{t:call}} e {{t:fold}}: agora {{t:call|paga}} sempre", correct: true, why: "Em equilíbrio, estas mãos são indiferentes, porque o adversário tem exatamente os {{t:bluff|bluffs}} necessários. Basta um pequeno excesso de {{t:bluff|bluffs}} para que o {{t:call}} ganhe mais do que o {{t:fold}}." }
      - { text: "Com as mãos mais fracas, que na base {{t:fold|desistem}} sempre", why: "Estas mãos perdem até contra parte dos {{t:bluff|bluffs}} ou precisam de um excesso muito maior. Só mudam quando o adversário se afasta muito do equilíbrio." }
      - { text: "Com as mãos mais fortes: agora {{t:raise|aumenta}} com elas", why: "As mãos mais fortes continua a jogá-las de qualquer forma. A mudança começa pelas mãos no limite da decisão." }
  - kind: choice
    id: m10.l3.q-small-shift
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Num exemplo publicado de solver, o adversário faz {{t:bluff|bluff}} no river em cerca de {{n:overbluff.lock}} das apostas, em vez de cerca de {{n:overbluff.base}}. Como muda a resposta à aposta dele com mãos que apanham {{t:bluff|bluffs}}?"
    options:
      - { text: "Deixa de {{t:fold|desistir}}: as mãos que na base misturavam agora {{t:call|pagam}} sempre", correct: true, why: "Isso bastou para que, na solução com a estratégia do adversário bloqueada, a defesa passasse a apenas {{t:call|pagar}}. As mãos indiferentes reagem ao mais pequeno excesso de {{t:bluff|bluffs}}." }
      - { text: "Quase nada: alguns pontos é pouco para mudar alguma coisa", why: "Para as mãos indiferentes, alguns pontos é muito: em equilíbrio, {{t:call}} e {{t:fold}} dão-lhes o mesmo, pelo que qualquer excesso de {{t:bluff|bluffs}} decide a favor de {{t:call|pagar}}." }
      - { text: "Começa a {{t:raise|aumentar}} com mãos que apanham {{t:bluff|bluffs}}", why: "O {{t:raise|aumento}} faz desistir os {{t:bluff|bluffs}} do adversário, e as mãos melhores {{t:call|pagam}}. Uma mão que apanha {{t:bluff|bluffs}} ganha ao {{t:call|pagar}}." }
  - kind: choice
    id: m10.l3.q-underbluff
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Sabe que, numa dada linha, o adversário faz {{t:bluff|bluff}} menos vezes do que em equilíbrio. O que faz com uma mão que apanha {{t:bluff|bluffs}} e que na base umas vezes {{t:call|paga}} e outras {{t:fold|desiste}}?"
    options:
      - { text: "{{t:fold|Desisto}} sempre", correct: true, why: "Quando há menos {{t:bluff|bluffs}} do que o equilíbrio exige, as mãos indiferentes perdem ao {{t:call|pagar}}. Resultado do solver: com falta de {{t:bluff|bluffs}}, {{t:fold|desiste}} sempre." }
      - { text: "{{t:call|Pago}} sempre, para o adversário não me explorar com {{t:bluff|bluffs}}", why: "Um adversário que faz {{t:bluff|bluff}} raramente demais não vai explorar as suas {{t:fold|desistências}}. É ao {{t:fold|desistir}} que explora o erro dele." }
      - { text: "Jogo como na base, meio a meio", why: "Misturar só faz sentido quando as duas decisões dão o mesmo. Com falta de {{t:bluff|bluffs}}, o {{t:fold}} dá mais." }
  - kind: numeric
    id: m10.l3.n-alpha-small
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "{{t:bet|Aposta}} {{n:cbet.ex.small}} como c-bet num {{t:pot|pote}} de {{n:ex.pot}}, sem mão nenhuma. Com que frequência tem o adversário de {{t:fold|desistir}} para este {{t:bluff}} empatar? Introduza a percentagem."
    answer: alpha.cbet.small
    explanation: "O limiar é aposta ÷ ({{t:pot}} + aposta) = {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Um adversário com fold to c-bet claramente acima deste valor {{t:fold|desiste}} com frequência suficiente para que o c-bet ganhe mesmo sem mão."
  - kind: choice
    id: m10.l3.q-alpha-hud
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "O adversário tem fold to c-bet de {{n:hud.ex.fcb.high}} em {{n:hud.ex.reg.hands}} mãos. Num flop {{t:dry|seco}} não acertou nada. Compensa um c-bet de 1/3 do {{t:pot|pote}} sem mão?"
    options:
      - { text: "Sim: o adversário {{t:fold|desiste}} mais vezes do que {{n:alpha.cbet.small}}, por isso o c-bet ganha de imediato", correct: true, why: "Um c-bet de 1/3 do {{t:pot|pote}} empata com {{n:alpha.cbet.small}} de {{t:fold|desistências}}. O adversário {{t:fold|desiste}} muito mais vezes, por isso o c-bet ganha antes mesmo de contar a equity da sua mão. O fold to c-bet junta todos os tamanhos e mesas, por isso é uma aproximação." }
      - { text: "Não: sem mão não se aposta", why: "Um {{t:bluff}} não precisa de mão, precisa de {{t:fold|desistências}}. Quando o adversário {{t:fold|desiste}} mais vezes do que {{n:alpha.cbet.small}}, o c-bet ganha com qualquer mão." }
      - { text: "Só com um tamanho grande, porque um pequeno não faz desistir mãos", why: "Uma aposta maior precisa de mais {{t:fold|desistências}}: com 3/4 do {{t:pot|pote}}, chega a {{n:alpha.cbet.big}}. Quando o adversário já {{t:fold|desiste}} muitas vezes, um c-bet pequeno consegue-o mais barato." }
  - kind: choice
    id: m10.l3.q-alpha-low
    family: m10.base.alpha
    rules: [R-M10-010, R-M10-006]
    prompt: "O adversário tem fold to c-bet de {{n:hud.ex.fcb.low}} em {{n:hud.ex.reg.hands}} mãos. Falhou o flop e não tem {{t:draw|draw}}. Pondera um c-bet de 3/4 do {{t:pot|pote}}. O que faz?"
    options:
      - { text: "{{t:check|Passo}}: este adversário {{t:fold|desiste}} menos vezes do que um c-bet grande exige", correct: true, why: "Um c-bet de 3/4 do {{t:pot|pote}} só empata com {{n:alpha.cbet.big}} de {{t:fold|desistências}}, e o adversário {{t:fold|desiste}} em {{n:hud.ex.fcb.low}}. Sem mão e sem outs, este {{t:bluff}} perde." }
      - { text: "Aposto, porque o c-bet é o padrão", why: "Um c-bet sem mão só é bom quando o adversário {{t:fold|desiste}} com frequência suficiente ou quando a mão tem equity. Aqui não há nem uma coisa nem outra." }
      - { text: "Vou all-in para forçar a {{t:fold|desistência}}", why: "Quanto maior a aposta, mais {{t:fold|desistências}} precisa. Um adversário que raramente {{t:fold|desiste}} não vai {{t:fold|desistir}} mais vezes por ter {{t:bet|apostado}} mais." }
  - kind: choice
    id: m10.l3.q-3bet-linear
    family: m10.base.3bet
    rules: [R-M10-011]
    table: { hand: "Kh Jh", position: "BTN" }
    prompt: "Um {{t:recreational|jogador recreativo}} com fold to 3-bet de {{n:mda.rec.f3b}} {{t:open|abre}} do {{t:cutoff|CO}}. Está no Button. Na base, KJs às vezes {{t:call|paga}} e A5s por vezes é um 3-bet de {{t:bluff}}. Como joga contra este jogador?"
    options:
      - { text: "Faço 3-bet com KJs por {{t:value|valor}} e não faço 3-bet com A5s como {{t:bluff}}", correct: true, why: "Um jogador que raramente {{t:fold|desiste}} perante um 3-bet {{t:call|paga}} muitas vezes com mãos mais fracas, por isso as mãos mais fortes ganham com o 3-bet. Um 3-bet de {{t:bluff}} só ganha de imediato com mais de {{n:alpha.vs-3bet-ip-size}} de {{t:fold|desistências}}, e este jogador {{t:fold|desiste}} em {{n:mda.rec.f3b}}." }
      - { text: "Faço 3-bet com A5s, porque um {{t:bluff}} com {{t:blocker|bloqueador}} é um bom 3-bet", why: "Na base sim, contra um adversário que {{t:fold|desiste}} em cerca de metade dos casos. Este {{t:fold|desiste}} em {{n:mda.rec.f3b}}, por isso o {{t:bluff}} acaba quase sempre a jogar um {{t:pot|pote}} grande com uma mão fraca." }
      - { text: "Só {{t:call|pago}} com KJs, para não afugentar o adversário", why: "Contra um jogador que {{t:call|paga}} 3-bets com mãos mais fracas, o 3-bet com KJs constrói um {{t:pot|pote}} maior com uma mão melhor e com {{t:position|posição}}. É melhor do que só o {{t:call}}." }
  - kind: choice
    id: m10.l3.q-3bet-data
    family: m10.base.3bet
    rules: [R-M10-011]
    prompt: "Segundo dados da população dos microlimites online (NL25), os {{t:regular|regulares}} {{t:fold|desistem}} perante um 3-bet em {{n:mda.reg.f3b}} e os {{t:recreational|jogadores recreativos}} em {{n:mda.rec.f3b}}. Um 3-bet em {{t:position|posição}} para {{n:pf.3bet.ip-total}} ganha sem mão com mais de {{n:alpha.vs-3bet-ip-size}} de {{t:fold|desistências}}. O que se conclui daqui?"
    options:
      - { text: "Contra {{t:recreational|jogadores recreativos}} faz 3-bet quase sem {{t:bluff|bluffs}}; contra {{t:regular|regulares}} os {{t:bluff|bluffs}} mantêm-se, mas só com mãos que têm equity", correct: true, why: "Nenhum grupo {{t:fold|desiste}} com frequência suficiente para que o 3-bet ganhe sem mão. Na base, os {{t:bluff|bluffs}} de 3-bet vivem da equity pós-flop e das {{t:fold|desistências}}; contra um jogador que {{t:fold|desiste}} em {{n:mda.rec.f3b}}, resta sobretudo a equity, por isso faz 3-bet com um {{t:range|range}} {{t:linear|linear}}." }
      - { text: "Faz 3-bet a todos com qualquer mão, porque todos {{t:fold|desistem}} muito", why: "Aqui ninguém {{t:fold|desiste}} mais vezes do que {{n:alpha.vs-3bet-ip-size}}. Fazer 3-bet com qualquer mão daria prejuízo." }
      - { text: "Contra {{t:recreational|jogadores recreativos}} deixa de fazer 3-bet de todo", why: "Pelo contrário: um jogador que {{t:call|paga}} 3-bets com mãos mais fracas paga às suas mãos fortes. Muda a composição do 3-bet, não abdica dele." }
  - kind: choice
    id: m10.l3.q-sample-direction
    family: m10.base.mixed
    rules: [R-M10-012, R-M10-003]
    prompt: "Após {{n:hud.ex.mid.hands}} mãos, o adversário parece solto e passivo, mas a amostra é pequena. Até que ponto se afasta da base?"
    options:
      - { text: "Um pouco, na direção da leitura e só com mãos-limite", correct: true, why: "A direção vê-se já numa amostra pequena, mas os números têm um erro grande. As mãos no limite da decisão desloca-as na direção da leitura e o resto joga-o como na base, até a amostra crescer." }
      - { text: "Totalmente: jogo de imediato contra ele com {{t:exploit|exploração}} máxima", why: "Com uma amostra pequena, a leitura pode estar errada. Um grande afastamento da base é, por si só, explorável: a base é a estratégia menos vulnerável a exploração." }
      - { text: "Nada, até ter mil mãos", why: "Cauteloso demais. A direção da leitura com {{n:hud.ex.mid.hands}} mãos já significa alguma coisa, e as mãos-limite podem ser deslocadas a baixo custo." }
---
A {{t:exploit|exploração}} não substitui a base: desloca-a. Primeiro sabe como se joga em equilíbrio (módulos 3–9), depois vê nos dados para que lado o adversário se afasta dele e desloca o próprio jogo para o mesmo lado. A pergunta é: com que mãos e até que ponto.

## Primeiro, as {{t:mixed-hand|mãos mistas}}

Em equilíbrio, algumas mãos jogam duas ações, p. ex. umas vezes {{t:call|pagam}} e outras {{t:fold|desistem}}. Fazem-no porque as duas ações dão o mesmo: o adversário tem exatamente os {{t:bluff|bluffs}} necessários para que a mão seja indiferente. São estas as mãos que reagem primeiro ao erro do adversário:

- o adversário faz {{t:bluff|bluff}} demasiadas vezes: as {{t:mixed-hand|mãos mistas}} {{t:call|pagam}} sempre;
- o adversário faz {{t:bluff|bluff}} raramente demais: as {{t:mixed-hand|mãos mistas}} {{t:fold|desistem}} sempre.

Basta pouco. Num exemplo publicado de solver (o Button aposta no river após a linha aposta, {{t:check}}, aposta), mudar os {{t:bluff|bluffs}} do adversário de cerca de {{n:overbluff.base}} para cerca de {{n:overbluff.lock}} fez a defesa do {{t:big-blind|big blind}} passar a apenas {{t:call|pagar}}. As mãos que na base {{t:fold|desistem}} sempre ou continuam sempre só mudam de decisão quando o adversário se afasta muito do equilíbrio.

## {{t:bluff|Bluff}} calculado com um limiar

O {{t:alpha}} do módulo 6 diz se um {{t:bluff}} sem mão compensa:

```formula
Um {{t:bluff}} ganha quando o adversário {{t:fold|desiste}} mais vezes do que: aposta ÷ (pote + aposta)
```

Com um c-bet de 1/3 do {{t:pot|pote}} é {{n:alpha.cbet.small}}; com 3/4 do {{t:pot|pote}}, {{n:alpha.cbet.big}}. O fold to c-bet do {{t:hud|HUD}} mostra se o adversário está acima ou abaixo deste limiar. É uma aproximação: a estatística junta todos os tamanhos e flops, e a sua mão costuma ter ainda alguma equity. Num flop que acerta no {{t:range}} do adversário, ele {{t:fold|desiste}} menos vezes do que a média.

Os jogadores da população dos microlimites online (NL25) {{t:fold|desistem}} perante um c-bet no flop, em média, em {{n:mda.all.fcb}} dos casos. Isso não tem de ser um erro: também o solver {{t:out-of-position}} no flop {{t:fold|desiste}} mais vezes do que indica o {{t:mdf}} (módulo 6). Por isso, uma média da população acima do limiar não justifica, por si só, um c-bet sem mão; precisa de uma leitura do adversário concreto ou de um flop que não acerte no {{t:range}} dele.

## 3-bet contra um jogador que não {{t:fold|desiste}}

Um 3-bet em {{t:position|posição}} para {{n:pf.3bet.ip-total}} só ganha sem mão nenhuma quando o adversário {{t:fold|desiste}} mais vezes do que {{n:alpha.vs-3bet-ip-size}} (módulo 4). Dados da população dos microlimites online (NL25):

| Grupo | Fold to 3-bet |
|---|---|
| {{t:regular|Regulares}} | {{n:mda.reg.f3b}} |
| {{t:recreational|Jogadores recreativos}} | {{n:mda.rec.f3b}} |

Na base, os {{t:bluff|bluffs}} de 3-bet vivem das {{t:fold|desistências}} e da equity pós-flop. Contra um jogador que {{t:fold|desiste}} em {{n:mda.rec.f3b}}, quase não há {{t:fold|desistências}}, mas, em contrapartida, ele {{t:call|paga}} com mãos mais fracas. Por isso faz-lhe 3-bet com um {{t:range|range}} {{t:linear|linear}}: mais mãos fortes por {{t:value|valor}}, quase sem {{t:bluff|bluffs}}. Treinadores em dois materiais de formação situam este limite num fold to 3-bet de cerca de {{n:hud.f3b.low}}.

## Amostra pequena, afastamento pequeno

Quanto menor a amostra, maior o erro da estatística (lição 1). Com uma amostra pequena, desloca apenas as mãos-limite e apenas na direção da leitura. Um grande afastamento, com todo o {{t:range}}, só faz sentido com uma amostra grande e um erro claro do adversário. Afastar-se da base é, em si mesmo, um erro que um bom adversário pode explorar.

:::note Fontes
O princípio das {{t:mixed-hand|mãos mistas}} provém de uma análise publicada de solver com a estratégia do adversário bloqueada (uma solução de solver, não dados da população). Os limiares de {{t:alpha}} são cálculo. O fold to 3-bet e o fold to c-bet da população provêm de uma base pública de estatísticas (uma grande sala online, NL25–NL100, {{n:mda.period.months}} meses antes de outubro de 2026). O limite de fold to 3-bet e o princípio «amostra pequena, afastamento pequeno» são recomendações de dois materiais de formação.
:::
