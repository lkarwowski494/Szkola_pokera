---
id: m13.l2
module: m13
order: 2
title: "Revisões do jogo e treino direcionado"
sub: "O que acontece com os seus erros"
rules: [R-M13-003, R-M13-004, R-M10-003]
drills:
  - kind: choice
    id: m13.l2.q-swap
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "No jogo, você tinha A♥ K♥ no {{t:board|board}} Q♥ 7♥ 2♣ e cometeu um erro. Na revisão, você vê A♠ K♠ no {{t:board|board}} Q♠ 7♠ 2♦. A decisão correta é a mesma?"
    options:
      - { text: "Sim: todos os naipes foram trocados com uma única troca", correct: true, why: "Copas viraram espadas e paus viraram ouros, em todas as cartas ao mesmo tempo. Você continua com um {{t:flush-draw|flush draw}} de ás e a mesma força de mão, então a decisão não muda." }
      - { text: "Não: espadas são mais fortes que copas", why: "No Texas Hold'em, os naipes são iguais: só importa se as cartas são do mesmo naipe, e não de qual naipe." }
      - { text: "Não dá para saber, é preciso calcular de novo", why: "Não é preciso: trocar todos os naipes ao mesmo tempo preserva cada combinação e cada {{t:draw|draw}}. É uma conta exata, não uma aproximação." }
  - kind: choice
    id: m13.l2.q-swap-wrong
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "Qual destas mudanças NÃO preserva a decisão da situação: K♥ Q♥ no {{t:board|board}} J♥ 8♥ 3♠?"
    options:
      - { text: "K♥ Q♥ no {{t:board|board}} J♠ 8♠ 3♥", correct: true, why: "Aqui os naipes foram trocados só no {{t:board|board}}: suas copas deixaram de combinar com o {{t:board|board}} e o {{t:flush-draw|flush draw}} sumiu. Já é outra situação." }
      - { text: "K♠ Q♠ no {{t:board|board}} J♠ 8♠ 3♥", why: "É uma única troca para todas as cartas (copas ↔ espadas), então a decisão é a mesma." }
      - { text: "K♦ Q♦ no {{t:board|board}} J♦ 8♦ 3♠", why: "É uma única troca (copas → ouros) para todas as cartas, então a decisão é a mesma." }
  - kind: choice
    id: m13.l2.q-cards
    family: m13.cards
    rules: []
    prompt: "Quais decisões do relatório vão para as revisões como cartões?"
    options:
      - { text: "Erros, imprecisões e decisões tomadas depois de estourar o tempo", correct: true, why: "Isso. Uma decisão aceitável não é um erro, então não gera cartão. A mesma regra com a mesma classe de mão no mesmo spot gera um cartão, e não vários." }
      - { text: "Todas as decisões avaliadas", why: "Decisões alinhadas e aceitáveis não precisam de correção, e as revisões servem para treinar o que deu errado." }
      - { text: "Só os erros, sem as imprecisões", why: "Uma imprecisão (por exemplo, a ação certa com o tamanho errado) conta como erro, então também volta nas revisões." }
  - kind: choice
    id: m13.l2.q-family
    family: m13.cards
    rules: []
    prompt: "Em {{n:game.recall.days}} dias, você cometeu {{n:game.recall.count}} erros na mesma família de spots (por exemplo, defesa do {{t:big-blind|big blind}} contra o Button). O que o app vai fazer?"
    options:
      - { text: "Trazer a família inteira de volta às revisões: mãos novas desse spot", correct: true, why: "Isso: uma situação isolada é repetida pelo seu cartão, e um erro que se repete em uma família traz de volta exercícios da família inteira, com mãos novas." }
      - { text: "Nada, os cartões de erro bastam", why: "Um cartão repete uma situação específica. Um erro que se repete em uma família indica que vale a pena treiná-la de forma mais ampla." }
      - { text: "Bloquear a área desse módulo", why: "Uma área desbloqueada depois das lições continua disponível. O app só acrescenta revisões." }
  - kind: choice
    id: m13.l2.q-vpip
    family: m13.sample
    rules: [R-M13-004, R-M10-003]
    prompt: "Depois de uma {{t:session|sessão}} de algumas dezenas de mãos, você conta que entrou no pote em quase metade delas. O que isso indica?"
    options:
      - { text: "Por enquanto, nada: a amostra é pequena demais", correct: true, why: "Até o {{t:vpip}} só é lido depois de cerca de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mãos. Com uma {{t:session|sessão}}, você avalia decisões isoladas, mas não as suas frequências." }
      - { text: "Você joga solto demais e precisa mudar isso", why: "Talvez sim, talvez não: algumas dezenas de mãos são poucas demais para distinguir o seu estilo da distribuição das cartas. Olhe a avaliação de cada decisão de entrar no pote." }
      - { text: "Você joga bem, porque ganhou muitas mãos", why: "O resultado não diz nada sobre a qualidade das decisões, e uma {{t:session}} não diz nada sobre frequências." }
  - kind: choice
    id: m13.l2.q-opps
    family: m13.sample
    rules: [R-M13-004]
    prompt: "Em uma {{t:session|sessão}}, você enfrentou um 4-bet duas vezes e {{t:fold|desistiu}} nas duas. Você já sabe que {{t:fold|desiste}} diante de 4-bet com frequência demais?"
    options:
      - { text: "Não: o que conta são as oportunidades, e duas são poucas demais", correct: true, why: "Um dos treinadores só olha a estatística a partir de cerca de {{n:hud.opps.look}} oportunidades e ganha confiança com cerca de {{n:hud.opps.sure}}. Duas oportunidades são ruído; você avalia cada uma dessas decisões separadamente." }
      - { text: "Sim: você {{t:fold|desiste}} em toda situação", why: "Duas em duas parece “sempre”, mas, com duas oportunidades, até uma estratégia que {{t:fold|desiste}} em metade dos casos muitas vezes dá esse resultado." }
      - { text: "Sim, se foi em uma única {{t:session|sessão}}", why: "Uma {{t:session}} não acrescenta nada: o número de oportunidades continua pequeno." }
  - kind: choice
    id: m13.l2.q-area
    family: m13.cards
    rules: []
    prompt: "Quando a área de jogo “Flop: c-bet” é desbloqueada?"
    options:
      - { text: "Depois de concluir todas as lições do módulo", correct: true, why: "Isso: a área distribui só situações do módulo, então é desbloqueada quando você já conhece as regras dele. O jogo livre fica disponível desde o início." }
      - { text: "Depois de ganhar algumas {{t:session|sessões}}", why: "O resultado em {{t:chips|fichas}} não desbloqueia nada: é principalmente ruído." }
      - { text: "Imediatamente, como o jogo livre", why: "O jogo livre fica disponível desde o primeiro dia, e as áreas só depois das lições do módulo." }
---
Cada erro do relatório volta para você nas revisões. Esta lição mostra como.

## A mesma situação com outros naipes

Erros, imprecisões e decisões tomadas depois de estourar o tempo viram cartões de revisão. O cartão mostra a mesma situação: as mesmas {{t:position|posições}}, ações e tamanhos, os mesmos valores de carta. Só os naipes mudam: o app os troca com uma única troca para todas as cartas ao mesmo tempo, por exemplo, copas por espadas e espadas por copas.

Essa troca não muda a força de nenhuma mão nem de nenhum {{t:draw|draw}}, porque só importa se as cartas são do mesmo naipe. Por isso, a decisão correta é a mesma, e você aprende a reconhecer a situação, em vez de decorar uma imagem.

A mesma regra com a mesma classe de mão no mesmo spot gera um cartão, e não vários. Os cartões novos do jogo entram nas revisões dentro de um limite diário; o restante espera pelos próximos dias.

## Quando o erro se repete

Se, em {{n:game.recall.days}} dias, você tiver pelo menos {{n:game.recall.count}} erros ou imprecisões na mesma família de spots, o app traz a família inteira de volta às revisões: exercícios com mãos novas desse spot. O que conta são os erros de decisão, e não as mãos perdidas. Esses limites são valores iniciais, que vamos ajustar com base nos dados de uso do app.

## Treino direcionado

Uma área de jogo é um módulo do curso. Ela é desbloqueada depois que você conclui todas as lições do módulo e distribui só situações dele, por exemplo, c-bet depois de uma {{t:open|abertura}} do Button. Do relatório, você vai direto para a área em que cometeu mais erros.

## Uma {{t:session|sessão}} não é estatística

O relatório não mostra as suas frequências, por exemplo, com que frequência você entra no pote. Até o {{t:vpip}} só é lido depois de cerca de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mãos, e situações raras aparecem poucas vezes em uma {{t:session|sessão}}. Um dos treinadores recomenda contar oportunidades, e não mãos: ele olha a estatística com cerca de {{n:hud.opps.look}} oportunidades e ganha confiança com cerca de {{n:hud.opps.sure}}.

:::note De onde vêm estas regras
A troca de naipes é uma conta exata: o ranking das combinações não diferencia naipes. Amostras de mãos como no módulo sobre {{t:exploit|exploração}} (dois materiais de treinamento); número de oportunidades: material de treinamento sobre tamanho de amostra para estatísticas de {{t:hud|HUD}}. Os limites das revisões são configurações do app, sem fonte.
:::
