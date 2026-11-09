---
id: m13.l3
module: m13
order: 3
title: "Revisão de mãos do jogo real"
sub: "O que revisar e como"
rules: [R-M13-005, R-M13-006, R-M13-007, R-M13-008]
drills:
  - kind: choice
    id: m13.l3.q-mark
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Durante um jogo ao vivo, você joga uma mão em que não sabe o que fazer. O que você faz com ela depois?"
    options:
      - { text: "Anoto de forma breve e reviso depois da {{t:session|sessão}}", correct: true, why: "Isso: durante o jogo você só marca a mão e a analisa depois, com a cabeça fria. A avaliação sob o efeito das emoções costuma ser ruim." }
      - { text: "Analiso na hora, enquanto ainda lembro", why: "Uma anotação curta basta para não esquecer. A análise completa você faz depois, com a cabeça fria." }
      - { text: "Nada, o que importa é a próxima mão", why: "Vale a pena revisar as mãos em que você não sabia o que fazer. Marque-as e volte a elas depois da {{t:session|sessão}}." }
  - kind: choice
    id: m13.l3.q-when
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Você acabou de perder um {{t:pot|pote}} grande e está irritado. Qual é o melhor momento para revisar essa mão?"
    options:
      - { text: "Algumas horas depois ou no dia seguinte", correct: true, why: "Isso: o melhor momento para revisar é algumas horas ou dias depois da {{t:session|sessão}}, com a cabeça fria. Logo após uma derrota, é fácil considerar uma boa decisão um erro, ou o contrário." }
      - { text: "Na hora, para não esquecer os detalhes", why: "Anote os detalhes na hora, mas deixe a avaliação para depois. Sob o efeito das emoções, a avaliação fica influenciada pelo resultado." }
      - { text: "Nunca, foi azar", why: "Talvez tenha sido azar, talvez um erro. Você só vai descobrir revisando a mão quando as emoções passarem." }
  - kind: choice
    id: m13.l3.q-which
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Qual destas mãos menos vale a pena analisar por muito tempo?"
    options:
      - { text: "Um set perdeu para um set maior em uma {{t:board|mesa}} {{t:dry|seca}}; os dois colocaram o stack inteiro", correct: true, why: "Isso: é um cooler. Nenhum jogador sensato {{t:fold|largaria}} um set aqui. Coolers acontecem com todo mundo e ensinam pouco." }
      - { text: "Um {{t:pot|pote}} grande perdido em que, no river, você não sabia se devia {{t:call|pagar}}", why: "Essa é uma boa candidata à revisão: {{t:pot|pote}} grande e decisão difícil." }
      - { text: "Um {{t:pot|pote}} médio em que o adversário jogou melhor que você e você se sentiu perdido", why: "Vale a pena revisar mãos assim: você sentiu que algo deu errado, e vale ver o quê." }
  - kind: choice
    id: m13.l3.q-big
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Você perdeu um {{t:pot|pote}} grande, mas acha que jogou bem. Vale a pena revisá-lo?"
    options:
      - { text: "Sim: em um {{t:pot|pote}} grande as decisões pesam mais, mesmo que você tenha jogado bem", correct: true, why: "Isso: {{t:pot|potes}} grandes, principalmente os perdidos, são as decisões de maior peso. Mesmo que você tenha jogado bem, vale saber por quê. Você só deixa de lado os coolers óbvios." }
      - { text: "Não: se joguei bem, não há o que procurar", why: "Certeza sem revisão ainda é só uma primeira reação. Um {{t:pot|pote}} grande é um bom motivo para revisá-lo." }
      - { text: "Só se eu perdi para uma mão rara", why: "O tipo de mão do adversário não é o que decide. O que conta é se a decisão foi difícil ou se o {{t:pot|pote}} foi grande." }
  - kind: choice
    id: m13.l3.q-gut
    family: m13.review-how
    rules: [R-M13-007]
    prompt: "Você está começando a revisar uma decisão no river. O que faz primeiro?"
    options:
      - { text: "Anoto a primeira reação, por exemplo, “{{t:call|call}} fácil”, e só depois faço as contas", correct: true, why: "Isso: comparar a primeira reação com as contas mostra onde a intuição engana você. Com o tempo, a intuição melhora." }
      - { text: "Calculo a {{t:equity}} na hora", why: "As contas são necessárias, mas sem a primeira reação anotada você não vai ver onde a intuição erra." }
      - { text: "Vejo quais cartas o adversário tinha", why: "As cartas do adversário no showdown são o resultado, e não uma informação do momento da decisão. Avalie a decisão contra as mãos possíveis dele." }
  - kind: choice
    id: m13.l3.q-pessimist
    family: m13.review-how
    rules: [R-M13-008]
    prompt: "Você está revisando um {{t:call|call}} no river. Mesmo com uma suposição pessimista sobre o {{t:range|range}} do adversário (poucos {{t:bluff|blefes}}), você tem {{t:equity}} suficiente. E agora?"
    options:
      - { text: "Posso parar: a decisão é boa sob qualquer suposição razoável", correct: true, why: "Isso: as suposições extremas definem um intervalo. Se a decisão é boa mesmo sob a pessimista, a suposição realista também vai confirmá-la." }
      - { text: "Ainda preciso calcular o caso realista", why: "Não precisa: a suposição realista fica entre as extremas e, como as duas levam à mesma conclusão, o resultado não muda." }
      - { text: "Troco para uma suposição otimista, porque a pessimista é exagerada", why: "Você começa pelos extremos para definir o intervalo. Se a pessimista dá um bom resultado, a otimista dá com mais razão ainda." }
---
O app revisa para você as mãos jogadas contra bots. As mãos jogadas fora do app você revisa sozinho. Esta lição reúne dicas de treinadores.

## Marque durante o jogo, analise depois da {{t:session|sessão}}

Durante o jogo, você só marca as mãos que pareceram interessantes, difíceis ou estranhas: uma anotação curta basta. O ideal é revisar algumas horas ou dias depois da {{t:session|sessão}}, com a cabeça fria. O pior momento é logo após uma grande derrota ou quando você está cansado.

## O que revisar

- {{t:pot|Potes}} grandes, principalmente os perdidos: é ali que as decisões pesam mais.
- Mãos em que você não sabia o que fazer ou sentiu que o adversário jogou melhor que você.
- As vitórias também: um erro que deu certo custa a mesma coisa (veja a lição sobre decisão e resultado).

Não gaste muito tempo com coolers e bad beats. Cooler é uma mão em que duas mãos fortes se encontram e nenhuma poderia, de forma sensata, {{t:fold|largar}}, por exemplo, um set contra um set maior. Mãos assim acontecem com todo mundo e ensinam pouco.

## Como revisar uma decisão

1. Anote a mão: {{t:position|posições}}, stacks, ações e tamanhos em cada {{t:street|street}}.
2. Anote a primeira reação: se a decisão parece fácil ou difícil.
3. Calcule: o preço, a {{t:equity}} e o que você sabia no momento da decisão.
4. Verifique a decisão sob três suposições sobre o {{t:range|range}} do adversário: otimista, pessimista e realista. Se ela for boa mesmo sob a pessimista, você pode parar.
5. Anote a diferença entre a primeira reação e as contas. Com o tempo, a intuição melhora.

:::note De onde vêm estas regras
Três materiais de treinamento sobre revisão de mãos: quando e o que revisar; coolers e bad beats; primeira reação e três suposições sobre o adversário. São heurísticas de treinadores, não resultados de solver.
:::
