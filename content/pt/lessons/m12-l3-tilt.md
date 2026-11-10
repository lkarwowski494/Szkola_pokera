---
id: m12.l3
module: m12
order: 3
title: "Tilt"
sub: "Reconheça-o antes que tome conta das suas decisões"
rules: [R-M12-006, R-M12-007, R-M12-008]
drills:
  - kind: choice
    id: m12.l3.q-type-injustice
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Pela terceira vez numa hora, um adversário acerta no river uma carta que o salva. Sente que o jogo é injusto e que alguém implica consigo. Que tipo de tilt é este, segundo a classificação desta lição?"
    options:
      - { text: "Tilt de injustiça", correct: true, why: "Bad beats, coolers e acertos do adversário no river dão a sensação de que o póquer é injusto. É o desencadeador típico do tilt de injustiça." }
      - { text: "Tilt de erro", why: "O tilt de erro diz respeito aos seus próprios erros. Aqui, irrita-o a sorte, e não a sua decisão." }
      - { text: "Tilt de desespero", why: "O desespero é uma forte necessidade de recuperar o perdido ({{t:session|sessões}} longas, {{t:stakes|limites}} mais altos). Aqui, por agora, trata-se da sensação de ter sido lesado." }
  - kind: choice
    id: m12.l3.q-type-revenge
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "O mesmo adversário ataca os seus blinds pela quarta vez seguida. Decide que, da próxima vez, vai {{t:raise|aumentar}} contra ele com qualquer mão, para lhe mostrar. Que tipo de tilt é este?"
    options:
      - { text: "Tilt de vingança", correct: true, why: "A falta de respeito, a agressividade constante do adversário e a vontade de «lhe mostrar» são desencadeadores do tilt de vingança. A decisão passa a ser tomada pela vontade de retaliar, e não pelo cálculo." }
      - { text: "Tilt de merecimento", why: "Este tipo resulta da convicção de que merece ganhar por ser melhor. Aqui trata-se de retaliar contra um adversário concreto." }
      - { text: "Não é tilt, é apenas adaptação a um adversário agressivo", why: "Adaptar-se significa defender mais mãos, escolhidas com critério. «Qualquer mão, para lhe mostrar» é emoção, e não estratégia." }
  - kind: choice
    id: m12.l3.q-type-desperation
    family: m12.tilt-type
    rules: [R-M12-007]
    prompt: "Está a perder e pensa: «Mais uma hora e, se não correr bem, passo para um {{t:stakes|limite}} mais alto e recupero tudo de uma vez». Que tipo de tilt é este?"
    options:
      - { text: "Tilt de desespero", correct: true, why: "A necessidade de recuperar o perdido leva a {{t:session|sessões}} muito longas, a forçar a ação e a saltos para {{t:stakes|limites}} mais altos. É um sinal para parar de jogar." }
      - { text: "Tilt de ódio a perder", why: "Quase, mas aqui junta-se um plano para recuperar as perdas com um {{t:stakes|limite}} mais alto e mais tempo de jogo. São características do desespero." }
      - { text: "Um plano sensato, porque um {{t:stakes|limite}} mais alto recupera as perdas mais depressa", why: "Um {{t:stakes|limite}} mais alto também aumenta as oscilações, e está a decidir num mau estado. Subir depois de uma perda é exatamente o oposto de uma gestão prudente do {{t:bankroll|bankroll}} (lição sobre bankroll e risco)." }
  - kind: choice
    id: m12.l3.q-type-mistake
    family: m12.tilt-type
    rules: [R-M12-008]
    prompt: "{{t:fold|Desistiu}} da melhor mão e, desde então, não consegue deixar de pensar nisso. Está irritado consigo próprio e joga cada vez pior. Que tipo de tilt é este?"
    options:
      - { text: "Tilt de erro", correct: true, why: "A raiva pelos próprios erros é tilt de erro. A origem costuma ser a expectativa irrealista de não cometer erros enquanto aprende." }
      - { text: "Tilt de injustiça", why: "Aqui não culpa a sorte, mas a si próprio. Isto é tilt de erro." }
      - { text: "Tilt de vingança", why: "A vingança dirige-se a um adversário. Aqui a raiva diz respeito à sua decisão." }
  - kind: choice
    id: m12.l3.q-type-entitlement
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "Está a perder contra um jogador que, na sua opinião, joga muito mal, e pensa: «Eu estudo, ele não, devia ganhar-lhe». Que tipo de tilt é este?"
    options:
      - { text: "Tilt de merecimento", correct: true, why: "Acreditar que merece ganhar por algum motivo faz com que a vitória pareça sua propriedade. Quando um adversário «que não a merece» a leva, surge o tilt." }
      - { text: "Tilt de ódio a perder", why: "Este tipo diz respeito a perder em geral. Aqui, o essencial é a convicção de que a vitória lhe é devida." }
      - { text: "Tilt de erro", why: "Não se trata de um erro seu, mas da sensação de que merece ganhar." }
  - kind: choice
    id: m12.l3.q-early-signal
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Depois de um bad beat, sente a raiva a crescer, mas continua a jogar corretamente. O que faz?"
    options:
      - { text: "Reage já: respira e usa uma frase preparada, p. ex. «É {{t:variance|variância}}, continuo a jogar bem»", correct: true, why: "O tilt corrige-se enquanto é pequeno e ainda consegue pensar. Quando cresce, desliga a capacidade de pensar e o controlo torna-se impossível." }
      - { text: "Continua a jogar até notar o primeiro erro", why: "Nessa altura, o tilt já é maior e mais difícil de travar. É mais fácil reagir aos primeiros sinais." }
      - { text: "Reprime a raiva e finge que ela não existe", why: "É melhor reconhecer a emoção e responder à sua causa com um pensamento concreto. Reprimir, por si só, não elimina a causa." }
  - kind: choice
    id: m12.l3.q-quit
    family: m12.tilt-response
    rules: [R-M12-007]
    prompt: "Há meia hora que joga mãos de que normalmente {{t:fold|desiste}}, e só pensa em recuperar o perdido. O que faz?"
    options:
      - { text: "Termina a {{t:session|sessão}}", correct: true, why: "São sinais de que já não consegue recuperar a clareza de pensamento. Nesse momento, o objetivo é parar o mais depressa possível, e não recuperar o dinheiro." }
      - { text: "Continua a jogar, mas só as melhores mãos", why: "Neste estado é difícil cumprir resoluções, porque a emoção decide por si. É mais seguro parar." }
      - { text: "Sobe de {{t:stakes|limite}} para recuperar mais depressa", why: "Isto é tilt de desespero em estado puro. Um {{t:stakes|limite}} mais alto com decisões piores acelera as perdas." }
  - kind: choice
    id: m12.l3.q-profile
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "Quer detetar o tilt mais cedo. Por onde começa?"
    options:
      - { text: "Por escrever um perfil: o que o faz entrar em tilt, o que pensa e sente, como muda o seu jogo", correct: true, why: "Cada jogador entra em tilt de forma um pouco diferente e por motivos diferentes. O perfil permite reconhecer os sinais antes de o tilt crescer: não se consegue controlar aquilo que não se compreende." }
      - { text: "Por jogar em {{t:stakes|limites}} mais altos, para ganhar resistência", why: "Mais pressão não ensina a reconhecer o tilt. Primeiro precisa de saber como ele se manifesta em si." }
      - { text: "Por evitar todos os adversários que o irritam", why: "Não é possível evitar os desencadeadores, porque bad beats e adversários agressivos vão acontecer sempre. O objetivo é reconhecer a reação e responder-lhe." }
  - kind: choice
    id: m12.l3.q-c-game
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "O seu jogo tem dias bons e dias maus. Onde está o progresso duradouro mais rápido?"
    options:
      - { text: "Em melhorar o seu pior jogo (C-game)", correct: true, why: "O progresso faz lembrar o movimento de uma lagarta: um passo em frente na dianteira (um A-game melhor) e um passo na traseira (um C-game menos desastroso). Eliminar os piores erros também liberta atenção para aprender coisas novas." }
      - { text: "Apenas em aperfeiçoar o seu melhor jogo (A-game)", why: "O A-game é importante, mas é o C-game que custa mais. Sem melhorar os piores dias, o progresso na dianteira perde-se facilmente na traseira." }
      - { text: "Em lado nenhum, a forma é uma questão de sorte", why: "A dispersão da forma pode ser reduzida: os jogadores que controlam bem o tilt têm uma distribuição mais estreita do nível de jogo (revisão de 2020)." }
  - kind: choice
    id: m12.l3.q-compare
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Como verifica se o seu trabalho no {{t:mental-game|jogo mental}}, ou seja, na gestão do tilt, das emoções e da concentração, está a dar resultado?"
    options:
      - { text: "Compara as suas piores {{t:session|sessões}} com as piores anteriores", correct: true, why: "Compare o que é comparável: o pior jogo com o pior jogo anterior. O progresso também se vê quando reconhece o tilt mais depressa e termina a {{t:session|sessão}} mais cedo." }
      - { text: "Olha para o resultado da última semana", why: "Uma semana de resultados é sobretudo {{t:variance|variância}} (lição sobre {{t:variance|variância}}). A qualidade do jogo nos piores dias diz mais." }
      - { text: "Compara a sua melhor {{t:session|sessão}} com a pior", why: "Essa comparação mostra apenas a dispersão, e não o progresso. Compare o pior jogo com o pior jogo anterior." }
---
O tilt é a perda de controlo sob o efeito de emoções negativas, normalmente depois de bad beats ou de uma longa série de perdas. Termina em más decisões e numa perda muito maior do que o habitual. Não é raro: num estudo por inquérito, {{n:tilt.severe}} dos jogadores admitiram ter tido um tilt forte pelo menos uma vez nos últimos seis meses.

## Sete tipos de tilt

Um conceituado manual de psicologia do póquer descreve o tilt como um problema de raiva e distingue {{n:tilt.types}} tipos:

| Tipo | O que o desencadeia |
|---|---|
| De má fase | Os outros tipos de tilt regressam com tanta frequência que a mente não tem tempo de se reiniciar antes da {{t:session|sessão}} seguinte |
| De injustiça | Bad beats, coolers, acertos do adversário no river |
| De ódio a perder | A própria derrota, mesmo sabendo que é {{t:variance|variância}} |
| De erro | Os seus próprios erros |
| De merecimento | A convicção de que merece ganhar |
| De vingança | Falta de respeito, agressividade constante do adversário |
| De desespero | Necessidade de recuperar o perdido: maratonas, {{t:stakes|limites}} mais altos |

## Reconheça os sinais

Cada pessoa entra em tilt de forma um pouco diferente. Escreva o seu **perfil de tilt**: o que o desencadeia, o que pensa e sente nesse momento, o que faz à mesa (p. ex. {{t:call|paga}} com um range demasiado largo, {{t:raise|aumenta}} por vingança). Quanto melhor conhecer os seus sinais, mais cedo os detetará.

## Reaja enquanto consegue pensar

Quando o tilt cresce, desliga a capacidade de pensar. Por isso, reage aos primeiros sinais:

1. Uma respiração que lhe dá um momento de distância em relação à emoção.
2. Uma frase preparada que responda à causa, p. ex. «Os jogadores mais fracos têm de ganhar às vezes, é {{t:variance|variância}}. Continuo a jogar bem».
3. Se já não consegue pensar com clareza, termina a {{t:session|sessão}}. Também é progresso terminar mais cedo, por um bom motivo.

## A-game e C-game

O seu jogo tem uma dispersão: do melhor (A-game) ao pior (C-game). O progresso faz lembrar o movimento de uma lagarta: um passo em frente na dianteira, quando o melhor jogo fica melhor, e um passo na traseira, quando o pior se torna menos desastroso. O que mais custa é o C-game, por isso é por ele que começa.

:::note Quando é mais do que tilt
Se joga mais tempo do que planeia, tenta recuperar perdas ou joga com dinheiro que não pode perder, leia o cartão sobre jogo responsável na lição sobre bankroll.
:::
