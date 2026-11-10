---
id: m10.l3
module: m10
order: 3
title: "Afastar-se da base"
sub: "Com quais mãos e até onde"
rules: [R-M10-009, R-M10-010, R-M10-011, R-M10-012]
drills:
  - kind: choice
    id: m10.l3.q-mixed-first
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Você sabe que o rival, nesta linha, {{t:bluff|blefa}} um pouco mais do que no equilíbrio. Com quais mãos você muda a decisão primeiro?"
    options:
      - { text: "Com mãos que, na base, misturam {{t:call|pagar}} e {{t:fold|desistir}}: agora você sempre {{t:call|paga}}", correct: true, why: "No equilíbrio, essas mãos são indiferentes, porque o rival tem exatamente tantos {{t:bluff|blefes}} quantos são necessários. Já um pequeno excedente de {{t:bluff|blefes}} faz {{t:call|pagar}} lucrar mais do que {{t:fold|desistir}}." }
      - { text: "Com as mãos mais fracas, que na base sempre {{t:fold|desistem}}", why: "Essas mãos perdem até para parte dos {{t:bluff|blefes}} ou precisam de um excedente bem maior. Elas só mudam quando o rival se afasta muito do equilíbrio." }
      - { text: "Com as mãos mais fortes: agora você as {{t:raise|aumenta}}", why: "As mãos mais fortes você continua jogando de qualquer forma. A mudança começa pelas mãos no limite da decisão." }
  - kind: choice
    id: m10.l3.q-small-shift
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Em um exemplo publicado de solver, o rival no river {{t:bluff|blefa}} com cerca de {{n:overbluff.lock}} das apostas, em vez de cerca de {{n:overbluff.base}}. Como muda sua resposta à aposta dele com mãos que pegam {{t:bluff|blefes}}?"
    options:
      - { text: "Você para de {{t:fold|desistir}}: as mãos que misturavam na base agora sempre {{t:call|pagam}}", correct: true, why: "Isso bastou para que, na solução com a estratégia do rival travada, a defesa passasse a só {{t:call|pagar}}. Mãos indiferentes reagem ao menor excedente de {{t:bluff|blefes}}." }
      - { text: "Quase nada: alguns pontos são pouco para mudar algo", why: "Para mãos indiferentes, alguns pontos são muito: no equilíbrio, {{t:call|pagar}} e {{t:fold|desistir}} dão o mesmo resultado para elas, então qualquer excedente de {{t:bluff|blefes}} decide a favor de {{t:call|pagar}}." }
      - { text: "Você começa a {{t:raise|aumentar}} com mãos que pegam {{t:bluff|blefes}}", why: "{{t:raise|Aumentar}} tira da mão os {{t:bluff|blefes}} do rival, e as mãos melhores {{t:call|pagam}}. Uma mão que pega {{t:bluff|blefes}} lucra {{t:call|pagando}}." }
  - kind: choice
    id: m10.l3.q-underbluff
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Você sabe que o rival, em determinada linha, {{t:bluff|blefa}} menos do que no equilíbrio. O que você faz com uma mão que pega {{t:bluff|blefes}} e que, na base, às vezes {{t:call|paga}} e às vezes {{t:fold|desiste}}?"
    options:
      - { text: "Sempre {{t:fold|desisto}}", correct: true, why: "Quando há menos {{t:bluff|blefes}} do que o equilíbrio exige, as mãos indiferentes perdem ao {{t:call|pagar}}. Resultado do solver: com falta de {{t:bluff|blefes}}, você sempre {{t:fold|desiste}}." }
      - { text: "Sempre {{t:call|pago}}, para o rival não me explorar com {{t:bluff|blefes}}", why: "Um rival que {{t:bluff|blefa}} pouco demais não vai explorar suas {{t:fold|desistências}}. É você que explora o erro dele ao {{t:fold|desistir}}." }
      - { text: "Jogo como na base, meio a meio", why: "Misturar só faz sentido quando as duas decisões dão o mesmo resultado. Com falta de {{t:bluff|blefes}}, {{t:fold|desistir}} rende mais." }
  - kind: numeric
    id: m10.l3.n-alpha-small
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "Você {{t:bet|aposta}} um c-bet de {{n:cbet.ex.small}} em um {{t:pot|pote}} de {{n:ex.pot}}, sem mão nenhuma. Com que frequência o rival precisa {{t:fold|desistir}} para esse {{t:bluff|blefe}} sair no zero? Digite a porcentagem."
    answer: alpha.cbet.small
    explanation: "O limiar é aposta ÷ ({{t:pot|pote}} + aposta) = {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Um rival com fold to c-bet claramente acima desse número {{t:fold|desiste}} com frequência suficiente para que o c-bet lucre mesmo sem mão."
  - kind: choice
    id: m10.l3.q-alpha-hud
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "O rival tem fold to c-bet de {{n:hud.ex.fcb.high}} em {{n:hud.ex.reg.hands}} mãos. Você não acertou nada em um flop {{t:dry|seco}}. Vale a pena um c-bet de 1/3 do {{t:pot|pote}} sem mão?"
    options:
      - { text: "Sim: o rival {{t:fold|desiste}} mais vezes do que {{n:alpha.cbet.small}}, então o c-bet lucra de imediato", correct: true, why: "Um c-bet de 1/3 do {{t:pot|pote}} sai no zero com {{n:alpha.cbet.small}} de {{t:fold|desistências}}. O rival {{t:fold|desiste}} com muito mais frequência, então o c-bet lucra antes mesmo de você contar a equity da sua mão. O fold to c-bet junta todos os tamanhos e mesas, então é uma aproximação." }
      - { text: "Não: sem mão você não aposta", why: "Um {{t:bluff|blefe}} não precisa de mão, precisa de {{t:fold|desistências}}. Quando o rival {{t:fold|desiste}} mais vezes do que {{n:alpha.cbet.small}}, o c-bet lucra com qualquer mão." }
      - { text: "Só com tamanho grande, porque um pequeno não faz mãos desistirem", why: "Uma aposta maior precisa de mais {{t:fold|desistências}}: com 3/4 do {{t:pot|pote}}, chega a {{n:alpha.cbet.big}}. Quando o rival já {{t:fold|desiste}} muito, um c-bet pequeno faz isso mais barato." }
  - kind: choice
    id: m10.l3.q-alpha-low
    family: m10.base.alpha
    rules: [R-M10-010, R-M10-006]
    prompt: "O rival tem fold to c-bet de {{n:hud.ex.fcb.low}} em {{n:hud.ex.reg.hands}} mãos. Você errou o flop e não tem {{t:draw|draw}}. Está pensando em um c-bet de 3/4 do {{t:pot|pote}}. O que você faz?"
    options:
      - { text: "Dou {{t:check|check}}: esse rival {{t:fold|desiste}} menos do que um c-bet grande precisa", correct: true, why: "Um c-bet de 3/4 do {{t:pot|pote}} só sai no zero com {{n:alpha.cbet.big}} de {{t:fold|desistências}}, e o rival {{t:fold|desiste}} em {{n:hud.ex.fcb.low}} das vezes. Sem mão e sem outs, esse {{t:bluff|blefe}} perde." }
      - { text: "Aposto, porque c-bet é o padrão", why: "Um c-bet sem mão só é bom quando o rival {{t:fold|desiste}} com frequência suficiente ou quando a mão tem equity. Aqui não há nem uma coisa nem outra." }
      - { text: "Vou all-in para forçar a {{t:fold|desistência}}", why: "Quanto maior a aposta, mais {{t:fold|desistências}} ela precisa. Um rival que raramente {{t:fold|desiste}} não vai {{t:fold|desistir}} mais vezes porque você {{t:bet|apostou}} mais." }
  - kind: choice
    id: m10.l3.q-3bet-linear
    family: m10.base.3bet
    rules: [R-M10-011]
    table: { hand: "Kh Jh", position: "BTN" }
    prompt: "Um {{t:recreational|jogador recreativo}} com fold to 3-bet de {{n:mda.rec.f3b}} {{t:open|abre}} do {{t:cutoff|CO}}. Você está no Button. Na base, KJs às vezes {{t:call|paga}}, e A5s às vezes é 3-bet de {{t:bluff|blefe}}. Como você joga contra esse jogador?"
    options:
      - { text: "Dou 3-bet com KJs por {{t:value|valor}} e não dou 3-bet com A5s como {{t:bluff|blefe}}", correct: true, why: "Um jogador que raramente {{t:fold|desiste}} diante de 3-bet costuma {{t:call|pagar}} com mãos mais fracas, então as mãos mais fortes lucram com o 3-bet. Um {{t:bluff|blefe}} de 3-bet só lucra de imediato com mais de {{n:alpha.vs-3bet-ip-size}} de {{t:fold|desistências}}, e esse jogador {{t:fold|desiste}} em {{n:mda.rec.f3b}} das vezes." }
      - { text: "Dou 3-bet com A5s, porque {{t:bluff|blefe}} com {{t:blocker|blocker}} é um bom 3-bet", why: "Na base, sim, contra um rival que {{t:fold|desiste}} em cerca de metade das vezes. Este {{t:fold|desiste}} em {{n:mda.rec.f3b}}, então o {{t:bluff|blefe}} quase sempre joga um {{t:pot|pote}} grande com mão fraca." }
      - { text: "Só {{t:call|pago}} com KJs, para não espantar o rival", why: "Contra um jogador que {{t:call|paga}} 3-bets com mãos mais fracas, o 3-bet com KJs monta um {{t:pot|pote}} maior com mão melhor e com {{t:position|posição}}. Isso é melhor do que só {{t:call|pagar}}." }
  - kind: choice
    id: m10.l3.q-3bet-data
    family: m10.base.3bet
    rules: [R-M10-011]
    prompt: "Segundo dados da população de microlimites online (NL25), os {{t:regular|regulares}} {{t:fold|desistem}} diante de 3-bet em {{n:mda.reg.f3b}} das vezes, e os {{t:recreational|jogadores recreativos}}, em {{n:mda.rec.f3b}}. Um 3-bet {{t:position|em posição}} para {{n:pf.3bet.ip-total}} lucra sem mão com mais de {{n:alpha.vs-3bet-ip-size}} de {{t:fold|desistências}}. O que se conclui disso?"
    options:
      - { text: "Contra {{t:recreational|jogadores recreativos}}, você dá 3-bet quase sem {{t:bluff|blefes}}; contra {{t:regular|regulares}}, os {{t:bluff|blefes}} ficam, mas só com mãos que têm equity", correct: true, why: "Nenhum grupo {{t:fold|desiste}} com tanta frequência que o 3-bet lucre sem mão. Na base, os {{t:bluff|blefes}} de 3-bet vivem da equity pós-flop e das {{t:fold|desistências}}; contra um jogador que {{t:fold|desiste}} em {{n:mda.rec.f3b}}, sobra principalmente a equity, então você dá 3-bet com um {{t:range|range}} {{t:linear|linear}}." }
      - { text: "Você dá 3-bet em todo mundo com qualquer mão, porque todos {{t:fold|desistem}} muito", why: "Ninguém aqui {{t:fold|desiste}} mais vezes do que {{n:alpha.vs-3bet-ip-size}}. Dar 3-bet com qualquer mão daria prejuízo." }
      - { text: "Contra {{t:recreational|jogadores recreativos}}, você para de dar 3-bet de vez", why: "Pelo contrário: um jogador que {{t:call|paga}} 3-bets com mãos mais fracas paga suas mãos fortes. Você muda a composição do 3-bet, não abre mão dele." }
  - kind: choice
    id: m10.l3.q-sample-direction
    family: m10.base.mixed
    rules: [R-M10-012, R-M10-003]
    prompt: "Depois de {{n:hud.ex.mid.hands}} mãos, o rival parece solto e passivo, mas a amostra é pequena. Quanto você se afasta da base?"
    options:
      - { text: "Um pouco, na direção da leitura e só com mãos limítrofes", correct: true, why: "A direção já aparece numa amostra pequena, mas os números têm erro grande. Você desloca as mãos no limite da decisão na direção da leitura e joga o resto como na base até a amostra crescer." }
      - { text: "Totalmente: jogo contra ele logo com {{t:exploit|exploração}} máxima", why: "Com amostra pequena, a leitura pode estar errada. Um grande afastamento da base é, por si só, explorável: a base é a estratégia menos vulnerável a exploração." }
      - { text: "Nada, até eu ter mil mãos", why: "Cuidado demais. A direção da leitura com {{n:hud.ex.mid.hands}} mãos já significa algo, e você pode deslocar mãos limítrofes a baixo custo." }
---
A {{t:exploit|exploração}} não substitui a base, só a desloca. Primeiro você sabe como se joga no equilíbrio (módulos 3–9); depois, pelos dados, vê para que lado o rival se afasta dele e desloca seu próprio jogo para o mesmo lado. A pergunta é: com quais mãos e até onde.

## Primeiro, as {{t:mixed-hand|mãos mistas}}

No equilíbrio, algumas mãos jogam duas ações, por exemplo, às vezes {{t:call|pagam}} e às vezes {{t:fold|desistem}}. Fazem isso porque as duas ações dão o mesmo resultado: o rival tem exatamente os {{t:bluff|blefes}} necessários para deixar a mão indiferente. São essas mãos que reagem primeiro ao erro do rival:

- o rival {{t:bluff|blefa}} demais: as {{t:mixed-hand|mãos mistas}} sempre {{t:call|pagam}};
- o rival {{t:bluff|blefa}} de menos: as {{t:mixed-hand|mãos mistas}} sempre {{t:fold|desistem}}.

Basta pouco. Em um exemplo publicado de solver (o Button aposta no river depois da linha aposta, {{t:check|check}}, aposta), mudar os {{t:bluff|blefes}} do rival de cerca de {{n:overbluff.base}} para cerca de {{n:overbluff.lock}} fez a defesa do {{t:big-blind|big blind}} passar a só {{t:call|pagar}}. As mãos que, na base, sempre {{t:fold|desistem}} ou sempre seguem na mão só mudam de decisão quando o rival se afasta muito do equilíbrio.

## {{t:bluff|Blefe}} medido pelo limiar

Se um {{t:bluff|blefe}} sem mão compensa, quem diz é o {{t:alpha|alpha}} do módulo 6:

```formula
Um {{t:bluff|blefe}} lucra quando o rival {{t:fold|desiste}} mais vezes do que: aposta ÷ (pote + aposta)
```

Com um c-bet de 1/3 do {{t:pot|pote}}, isso dá {{n:alpha.cbet.small}}; com 3/4 do {{t:pot|pote}}, {{n:alpha.cbet.big}}. O fold to c-bet do {{t:hud|HUD}} mostra se o rival está acima ou abaixo desse limiar. É uma aproximação: a estatística junta todos os tamanhos e flops, e sua mão costuma ter ainda um pouco de equity. Em um flop que acerta o {{t:range|range}} do rival, ele {{t:fold|desiste}} menos do que a média.

Os jogadores da população de microlimites online (NL25) {{t:fold|desistem}} diante de c-bet no flop, em média, em {{n:mda.all.fcb}} das vezes. Isso não é necessariamente um erro: o solver {{t:out-of-position|fora de posição}} no flop também {{t:fold|desiste}} mais do que indica o {{t:mdf|MDF}} (módulo 6). Por isso, a média da população acima do limiar não justifica, por si só, um c-bet sem mão; você precisa de uma leitura do rival específico ou de um flop que não acerte o {{t:range|range}} dele.

## 3-bet contra um jogador que não {{t:fold|desiste}}

Um 3-bet {{t:position|em posição}} para {{n:pf.3bet.ip-total}} só lucra sem mão nenhuma quando o rival {{t:fold|desiste}} mais vezes do que {{n:alpha.vs-3bet-ip-size}} (módulo 4). Dados da população de microlimites online (NL25):

| Grupo | Fold to 3-bet |
|---|---|
| {{t:regular|Regulares}} | {{n:mda.reg.f3b}} |
| {{t:recreational|Jogadores recreativos}} | {{n:mda.rec.f3b}} |

Na base, os {{t:bluff|blefes}} de 3-bet vivem das {{t:fold|desistências}} e da equity pós-flop. Contra um jogador que {{t:fold|desiste}} em {{n:mda.rec.f3b}} das vezes, quase não há {{t:fold|desistências}}, mas ele {{t:call|paga}} com mãos mais fracas. Por isso você dá 3-bet nele com um {{t:range|range}} {{t:linear|linear}}: mais mãos fortes por {{t:value|valor}}, quase sem {{t:bluff|blefes}}. Treinadores em dois materiais de treinamento situam esse limite em fold to 3-bet de cerca de {{n:hud.f3b.low}}.

## Amostra pequena, desvio pequeno

Quanto menor a amostra, maior o erro da estatística (lição 1). Com amostra pequena, você desloca só as mãos limítrofes e só na direção da leitura. Um grande desvio, com todo o {{t:range|range}}, só faz sentido com amostra grande e um erro claro do rival. Afastar-se da base é, por si só, um erro que um bom rival pode explorar.

:::note Fontes
O princípio das {{t:mixed-hand|mãos mistas}} vem de uma análise de solver publicada, com a estratégia do rival travada (solução de solver, não dados de população). Os limiares de {{t:alpha|alpha}} são cálculo. O fold to 3-bet e o fold to c-bet da população vêm de uma base pública de estatísticas (uma grande sala online, NL25–NL100, {{n:mda.period.months}} meses antes de outubro de 2026). O limite de fold to 3-bet e o princípio “amostra pequena, desvio pequeno” são recomendações de dois materiais de treinamento.
:::
