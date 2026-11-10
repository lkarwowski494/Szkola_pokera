---
id: m13.l2
module: m13
order: 2
title: "Revisões do jogo e treino direcionado"
sub: "O que acontece aos seus erros"
rules: [R-M13-003, R-M13-004, R-M10-003]
drills:
  - kind: choice
    id: m13.l2.q-swap
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "Num jogo tinha A♥ K♥ na {{t:board|mesa}} Q♥ 7♥ 2♣ e cometeu um erro. Na revisão vê A♠ K♠ na {{t:board|mesa}} Q♠ 7♠ 2♦. A decisão correta é a mesma?"
    options:
      - { text: "Sim: todos os naipes foram trocados com uma única troca", correct: true, why: "As copas passaram a espadas e os paus a ouros, em todo o lado ao mesmo tempo. Continua a ter um {{t:flush-draw|flush draw}} com ás e a mesma força de mão, por isso a decisão não muda." }
      - { text: "Não: as espadas são mais fortes do que as copas", why: "No Texas Hold'em os naipes são iguais: só conta se as cartas são do mesmo naipe, e não de qual." }
      - { text: "Não se sabe, é preciso calcular de novo", why: "Não é preciso: trocar todos os naipes ao mesmo tempo preserva cada combinação e cada {{t:draw|draw}}. É um cálculo, e não uma aproximação." }
  - kind: choice
    id: m13.l2.q-swap-wrong
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "Qual destas alterações NÃO preserva a decisão da situação: K♥ Q♥ na {{t:board|mesa}} J♥ 8♥ 3♠?"
    options:
      - { text: "K♥ Q♥ na {{t:board|mesa}} J♠ 8♠ 3♥", correct: true, why: "Aqui os naipes foram trocados apenas na {{t:board|mesa}}: as suas copas deixaram de combinar com a {{t:board|mesa}} e o {{t:flush-draw|flush draw}} desapareceu. Já é outra situação." }
      - { text: "K♠ Q♠ na {{t:board|mesa}} J♠ 8♠ 3♥", why: "É uma única troca para todas as cartas (copas ↔ espadas), por isso a decisão é a mesma." }
      - { text: "K♦ Q♦ na {{t:board|mesa}} J♦ 8♦ 3♠", why: "É uma única troca (copas → ouros) para todas as cartas, por isso a decisão é a mesma." }
  - kind: choice
    id: m13.l2.q-cards
    family: m13.cards
    rules: []
    prompt: "Que decisões do relatório entram nas revisões como cartões?"
    options:
      - { text: "Erros, imprecisões e decisões tomadas depois de esgotado o tempo", correct: true, why: "Sim. Uma decisão aceitável não é um erro, por isso não cria cartão. A mesma regra com a mesma classe de mão no mesmo spot dá um único cartão, e não vários." }
      - { text: "Todas as decisões avaliadas", why: "As decisões conformes e as aceitáveis não precisam de correção, e as revisões servem para treinar o que correu mal." }
      - { text: "Só os erros, sem as imprecisões", why: "Uma imprecisão (p. ex., ação certa, tamanho errado) conta como um erro, por isso também volta nas revisões." }
  - kind: choice
    id: m13.l2.q-family
    family: m13.cards
    rules: []
    prompt: "No espaço de {{n:game.recall.days}} dias cometeu {{n:game.recall.count}} erros na mesma família de spots (p. ex., defesa do {{t:big-blind|big blind}} contra o Button). O que fará a aplicação?"
    options:
      - { text: "Fará voltar toda a família às revisões: mãos novas deste spot", correct: true, why: "Sim: uma situação isolada é repetida pelo seu cartão, e um erro repetido numa família faz voltar tarefas de toda a família, com mãos novas." }
      - { text: "Nada, os cartões de erros bastam", why: "Um cartão repete uma situação concreta. Um erro repetido numa família significa que vale a pena praticá-la de forma mais ampla." }
      - { text: "Bloqueará a área deste módulo", why: "Uma área desbloqueada após as lições continua disponível. A aplicação apenas acrescenta revisões." }
  - kind: choice
    id: m13.l2.q-vpip
    family: m13.sample
    rules: [R-M13-004, R-M10-003]
    prompt: "Após uma {{t:session|sessão}} de algumas dezenas de mãos, conta que entrou no jogo em quase metade delas. O que se conclui daqui?"
    options:
      - { text: "Por enquanto, nada: a amostra é demasiado pequena", correct: true, why: "Até o {{t:vpip}} se lê ao fim de cerca de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mãos. Com uma só {{t:session|sessão}} avalia decisões individuais, mas não as suas frequências." }
      - { text: "Joga de forma demasiado solta e tem de mudar isso", why: "Talvez sim, talvez não: algumas dezenas de mãos são poucas para distinguir o estilo da distribuição das cartas. Observe a avaliação de cada decisão de entrar no jogo." }
      - { text: "Joga bem, porque ganhou muitas mãos", why: "O resultado não diz nada sobre a qualidade das decisões, e uma {{t:session}} não diz nada sobre frequências." }
  - kind: choice
    id: m13.l2.q-opps
    family: m13.sample
    rules: [R-M13-004]
    prompt: "Numa {{t:session|sessão}} enfrentou um 4-bet duas vezes e {{t:fold|desistiu}} das duas vezes. Já sabe que {{t:fold|desiste}} contra 4-bets com demasiada frequência?"
    options:
      - { text: "Não: contam as oportunidades, e duas são poucas", correct: true, why: "Um dos treinadores só olha para a estatística a partir de cerca de {{n:hud.opps.look}} oportunidades e ganha confiança por volta de {{n:hud.opps.sure}}. Duas oportunidades são ruído; avalie cada uma destas decisões em separado." }
      - { text: "Sim: {{t:fold|desiste}} em todas as situações", why: "Duas em duas parece «sempre», mas com duas oportunidades até uma estratégia que {{t:fold|desiste}} em metade dos casos dará muitas vezes esse resultado." }
      - { text: "Sim, se foi numa só {{t:session|sessão}}", why: "Uma {{t:session}} não acrescenta nada: o número de oportunidades continua pequeno." }
  - kind: choice
    id: m13.l2.q-area
    family: m13.cards
    rules: []
    prompt: "Quando é que se desbloqueia a área de jogo «Flop: c-bet»?"
    options:
      - { text: "Após concluir todas as lições do módulo", correct: true, why: "Sim: a área só distribui situações do módulo, por isso desbloqueia-se quando já conhece as suas regras. O jogo livre está disponível desde o início." }
      - { text: "Após ganhar algumas {{t:session|sessões}}", why: "O resultado em {{t:chips|fichas}} não desbloqueia nada: é sobretudo ruído." }
      - { text: "Imediatamente, tal como o jogo livre", why: "O jogo livre está disponível desde o primeiro dia, e as áreas só após as lições do módulo." }
---
Cada erro do relatório volta a si nas revisões. Esta lição mostra como.

## A mesma situação com outros naipes

Os erros, as imprecisões e as decisões tomadas depois de esgotado o tempo tornam-se cartões de revisão. O cartão mostra a mesma situação: as mesmas {{t:position|posições}}, ações e tamanhos, os mesmos valores das cartas. Só mudam os naipes: a aplicação troca-os com uma única troca para todas as cartas ao mesmo tempo, p. ex., copas por espadas e espadas por copas.

Uma troca assim não altera a força de nenhuma mão nem de nenhum {{t:draw|draw}}, porque só conta se as cartas são do mesmo naipe. A decisão correta é, portanto, a mesma, e aprende a reconhecer a situação em vez de memorizar uma imagem.

A mesma regra com a mesma classe de mão no mesmo spot dá um único cartão, e não vários. Os novos cartões do jogo entram nas revisões dentro do limite diário; os restantes aguardam pelos dias seguintes.

## Quando o erro se repete

Se no espaço de {{n:game.recall.days}} dias tiver pelo menos {{n:game.recall.count}} erros ou imprecisões na mesma família de spots, a aplicação faz voltar às revisões toda a família: tarefas com mãos novas deste spot. Contam os erros de decisão, e não as mãos perdidas. Estes limiares são valores iniciais, que iremos ajustar com base nos dados de utilização da aplicação.

## Treino direcionado

Uma área de jogo corresponde a um módulo do curso. Desbloqueia-se após concluir todas as lições do módulo e distribui apenas situações desse módulo, p. ex., c-bet após uma {{t:open|abertura}} do Button. A partir do relatório, passa diretamente para a área em que houve mais erros.

## Uma {{t:session|sessão}} não é uma estatística

O relatório não mostra as suas frequências, p. ex., com que frequência entra no jogo. Até o {{t:vpip}} se lê ao fim de cerca de {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} mãos, e as situações raras surgem poucas vezes numa {{t:session|sessão}}. Um dos treinadores aconselha a contar oportunidades, e não mãos: olha para a estatística a partir de cerca de {{n:hud.opps.look}} oportunidades e ganha confiança por volta de {{n:hud.opps.sure}}.

:::note De onde vêm estas regras
A troca de naipes é um cálculo: o ranking das combinações não distingue naipes. Amostras de mãos como no módulo sobre {{t:exploit|exploração}} (dois materiais de formação); número de oportunidades: material de formação sobre o tamanho da amostra para estatísticas de {{t:hud|HUD}}. Os limiares das revisões são definições da aplicação, sem fonte.
:::
