---
id: m13.l3
module: m13
order: 3
title: "Revisão de mãos do jogo real"
sub: "O que rever e como"
rules: [R-M13-005, R-M13-006, R-M13-007, R-M13-008]
drills:
  - kind: choice
    id: m13.l3.q-mark
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Durante um jogo ao vivo, joga uma mão em que não sabe o que fazer. O que faz com ela depois?"
    options:
      - { text: "Anoto-a brevemente e revejo-a depois da {{t:session|sessão}}", correct: true, why: "Sim: durante o jogo apenas marca a mão e analisa-a depois, com a cabeça fria. A avaliação sob o efeito das emoções pode ser errada." }
      - { text: "Analiso-a de imediato, enquanto me lembro", why: "Basta uma nota breve para não se esquecer. A análise completa faz-se depois, com a cabeça fria." }
      - { text: "Nada, o que conta é a mão seguinte", why: "Vale a pena rever as mãos em que não sabia o que fazer. Marque-as e volte a elas depois da {{t:session|sessão}}." }
  - kind: choice
    id: m13.l3.q-when
    family: m13.review-when
    rules: [R-M13-005]
    prompt: "Acabou de perder um {{t:pot|pote}} grande e está irritado. Qual é o melhor momento para rever esta mão?"
    options:
      - { text: "Algumas horas depois ou no dia seguinte", correct: true, why: "Sim: o melhor momento para rever é algumas horas ou dias depois da {{t:session|sessão}}, com a cabeça fria. Logo após uma derrota, é fácil tomar uma boa decisão por um erro, ou o contrário." }
      - { text: "De imediato, para não esquecer os pormenores", why: "Os pormenores anotam-se de imediato, mas a avaliação fica para depois. Sob o efeito das emoções, a avaliação é influenciada pelo resultado." }
      - { text: "Nunca, porque foi azar", why: "Pode ter sido azar, pode ter sido um erro. Só o saberá revendo a mão quando as emoções tiverem acalmado." }
  - kind: choice
    id: m13.l3.q-which
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Qual destas mãos menos vale a pena analisar demoradamente?"
    options:
      - { text: "Um set perdeu contra um set mais alto numa {{t:board|mesa}} {{t:dry|seca}}; ambos meteram o stack todo", correct: true, why: "Sim: é um cooler. Nenhum jogador razoável {{t:fold|desistiria}} aqui com um set. Os coolers acontecem a todos e ensinam pouco." }
      - { text: "Um {{t:pot|pote}} grande perdido em que, no river, não sabia se devia {{t:call|pagar}}", why: "É uma boa candidata a revisão: um {{t:pot|pote}} grande e uma decisão difícil." }
      - { text: "Um {{t:pot|pote}} médio em que o adversário o enganou e se sentiu perdido", why: "Vale a pena rever mãos destas: sentiu que algo correu mal, e vale a pena perceber o quê." }
  - kind: choice
    id: m13.l3.q-big
    family: m13.review-which
    rules: [R-M13-006]
    prompt: "Perdeu um {{t:pot|pote}} grande, mas considera que jogou bem. Vale a pena revê-lo?"
    options:
      - { text: "Sim: num {{t:pot|pote}} grande as decisões têm mais peso, mesmo que tenha jogado bem", correct: true, why: "Sim: os {{t:pot|potes}} grandes, sobretudo os perdidos, são as decisões com mais peso. Mesmo que tenha jogado bem, vale a pena saber porquê. Só se põem de parte os coolers óbvios." }
      - { text: "Não: se joguei bem, não há nada a procurar", why: "A certeza sem revisão continua a ser apenas uma primeira reação. Um {{t:pot|pote}} grande é uma boa razão para o rever." }
      - { text: "Só se perdi contra uma mão rara", why: "O tipo de mão do adversário não é o que decide. O que conta é se a decisão foi difícil ou se o {{t:pot|pote}} foi grande." }
  - kind: choice
    id: m13.l3.q-gut
    family: m13.review-how
    rules: [R-M13-007]
    prompt: "Começa a rever uma decisão no river. O que faz primeiro?"
    options:
      - { text: "Anoto a primeira reação, p. ex. «é fácil {{t:call|pagar}}», e só depois faço as contas", correct: true, why: "Sim: comparar a primeira reação com as contas mostra onde a intuição o engana. Com o tempo, a intuição melhora." }
      - { text: "Calculo logo a {{t:equity|equity}}", why: "As contas são necessárias, mas sem a primeira reação anotada não verá onde a intuição se engana." }
      - { text: "Vejo que cartas tinha o adversário", why: "As cartas do adversário no showdown são o resultado, não informação do momento da decisão. A decisão avalia-se face às mãos possíveis dele." }
  - kind: choice
    id: m13.l3.q-pessimist
    family: m13.review-how
    rules: [R-M13-008]
    prompt: "Está a rever a decisão de {{t:call|pagar}} no river. Mesmo com um pressuposto pessimista sobre o {{t:range|range}} do adversário (poucos {{t:bluff|bluffs}}), tem {{t:equity|equity}} suficiente. E agora?"
    options:
      - { text: "Posso terminar: a decisão é boa com qualquer pressuposto razoável", correct: true, why: "Sim: os pressupostos extremos definem um intervalo. Se a decisão é boa mesmo com o pessimista, o pressuposto realista também a confirmará." }
      - { text: "Ainda tenho de calcular o caso realista", why: "Não é necessário: o pressuposto realista fica entre os extremos e, como ambos levam à mesma conclusão, o resultado não muda." }
      - { text: "Mudo para um pressuposto otimista, porque o pessimista é exagerado", why: "Começa-se pelos extremos para definir o intervalo. Se o pessimista dá um bom resultado, o otimista ainda mais." }
---
A aplicação revê em seu lugar as mãos dos jogos contra bots. As mãos jogadas fora da aplicação são revistas por si próprio. Esta lição reúne conselhos de treinadores.

## Marque durante o jogo, analise depois da {{t:session|sessão}}

Durante o jogo, limita-se a marcar as mãos que lhe pareceram interessantes, difíceis ou estranhas: basta uma nota breve. O ideal é rever algumas horas ou dias depois da {{t:session|sessão}}, com a cabeça fria. O pior momento é logo a seguir a uma grande derrota ou quando está cansado.

## O que rever

- {{t:pot|Potes}} grandes, sobretudo os perdidos: é aí que as decisões têm mais peso.
- Mãos em que não sabia o que fazer ou sentiu que o adversário o enganou.
- Também as ganhas: um erro que compensou custa o mesmo (lição sobre decisão e resultado).

Não se demore com coolers e bad beats. Um cooler é uma mão em que duas mãos fortes se encontram e nenhuma podia razoavelmente {{t:fold|desistir}}, p. ex. um set contra um set mais alto. Mãos destas acontecem a todos e ensinam pouco.

## Como rever uma decisão

1. Anote a mão: {{t:position|posições}}, stacks, ações e tamanhos em cada {{t:street|ronda}}.
2. Anote a primeira reação: se a decisão parece fácil ou difícil.
3. Faça as contas: o preço, a {{t:equity|equity}} e o que sabia no momento da decisão.
4. Verifique a decisão com três pressupostos sobre o {{t:range|range}} do adversário: otimista, pessimista e realista. Se for boa mesmo com o pessimista, pode terminar.
5. Anote a diferença entre a primeira reação e as contas. Com o tempo, a intuição melhora.

:::note De onde vêm estas regras
Três materiais de formação sobre a revisão de mãos: quando e o que rever; coolers e bad beats; primeira reação e três pressupostos sobre o adversário. São heurísticas de treinadores, não resultados de solver.
:::
